# Design — front_articulos_maestro_migration

---

## Modelo de datos relevante

```
ArticuloMaestro {
  id, descripcion, codigo, url_foto, activo,
  sector_id, familia_id, subfamilia_id,
  articulosPrecios: [
    {
      id, precio1,
      medida: { descripcion },
      articulos: [
        { id_articulo, codigo, color: { descripcion, color_hexa } }
      ]
    }
  ]
}
```

El carrito sigue recibiendo exactamente:
```
{ id_articulo, codigo, descripcion, color_nombre, color_hexa,
  medida_nombre, url_foto, id_articulo_precio, precio_unitario,
  cantidad, subtotal }
```

---

## Archivos a MODIFICAR

### `src/services/ArticuloService.js`
- Corregir `getArticulosMaestros` para usar `pageNumber` y `pageSize` (en lugar de `pagina`/`size`).
- Añadir `getArticuloMaestroById(id)` → `GET /articulos/maestros/:id`. Devuelve el objeto completo o `null` en error.
- Eliminar `console.group`/`console.log`/emojis de debug existentes en `getSugerencias`.

### `src/pages/CategoryPage.jsx`
- Reemplazar todas las llamadas a `ArticuloService.getArticulosPrecios` por `ArticuloService.getArticulosMaestros`.
- Renombrar los parámetros de paginación internos a `pageNumber`/`pageSize` para que coincidan con el servicio.
- El resto de la lógica (filtros, paginación, carga) no cambia.

### `src/components/ArticuloCard.jsx`
- Desestructurar `{ id, url_foto, descripcion, codigo }` desde `ArticuloMaestro`. La forma del objeto es la misma; no hay cambio de API del componente, pero `id` ahora es el ID del maestro.
- La función `irAlDetalle` navega a `/articulo/${id}` — sin cambio en la línea, pero el ID es ahora de tipo maestro.

### `src/routes/AppRoutes.jsx`
- La ruta `/articulo/:id` ya existe. No se cambia el path (`:id` pasa a ser `idArticuloMaestro` semánticamente). Verificar que el wildcard `*` siga presente para el caso 404 (R21).

### `src/pages/DetalleArticuloPage.jsx`
- Reemplazar uso de `getDetalleArticulo` por `getArticuloMaestroById(id)`.
- Manejar estado de carga y error (`loading`, `error`, `maestro`).
- Si `maestro` es `null`, renderizar la página 404 genérica existente (componente `<div>Página no encontrada</div>` o el que provea la ruta `*`).
- Extraer lógica de selección de medida y color a un custom hook `useDetalleArticuloMaestro` (ver abajo) cuando supere ~40 líneas.
- Pasar al componente presentacional solo las props necesarias.

### `src/components/DetalleArticulo.jsx`
- Refactorizar para aceptar la nueva API de props:
  ```
  DetalleArticulo({
    maestro,            // ArticuloMaestro completo
    articuloPrecioActivo,  // ArticuloPrecio seleccionado
    articuloSeleccionado,  // Articulo (color) seleccionado | null
    onSeleccionarMedida,   // (articuloPrecio) => void
    onSeleccionarColor,    // (articulo) => void
    cantidad,
    onCantidadChange,
    onAgregarAlCarrito,
    agregado,
  })
  ```
- Mostrar selector de medida solo cuando `maestro.articulosPrecios.length > 1` (R12/R13).
- Mostrar selector de color solo cuando `articuloPrecioActivo.articulos.length > 1` (R15/R16).
- Deshabilitar botón cuando `articuloSeleccionado === null` (R17/R18).
- Construir el payload del carrito en `onAgregarAlCarrito` (en el hook o en la página) (R19).

---

## Archivos a CREAR

### `src/hooks/useDetalleArticuloMaestro.js`
Hook que encapsula toda la lógica de estado del detalle:

```js
// Firma pública
const {
  maestro,
  loading,
  error,
  articuloPrecioActivo,
  articuloSeleccionado,
  cantidad,
  agregado,
  seleccionarMedida,   // (articuloPrecio) => void
  seleccionarColor,    // (articulo) => void
  setCantidad,
  agregarAlCarrito,    // () => void — construye payload y llama addToCart
} = useDetalleArticuloMaestro(idMaestro);
```

Responsabilidades:
- Llama a `getArticuloMaestroById`.
- Auto-selecciona medida si `articulosPrecios.length === 1` (R12).
- Auto-selecciona color si `articulosPrecios[activo].articulos.length === 1` (R15).
- Resetea `articuloSeleccionado` a `null` cuando cambia la medida, a menos que la auto-selección aplique.
- Construye y llama a `addToCart` con el payload correcto (R19).
- No importa `apiClient` directamente — delega en `ArticuloService` (principio de capas).

---

## Restricciones de arquitectura

- `DetalleArticuloPage` NO DEBE hacer fetch directamente; delega en `useDetalleArticuloMaestro` que a su vez usa `ArticuloService`.
- `DetalleArticulo` (componente) NO DEBE tener estado propio ni llamar a servicios — es puramente presentacional.
- `CartContext` NO DEBE modificarse (R20).
- No agregar nuevos contextos globales para estado del detalle.
- Todas las URLs de la API viven exclusivamente en `ArticuloService.js`.

---

## Guia de estilo visual (Zara)

El componente `DetalleArticulo` ya sigue en gran medida el estilo correcto. Las reglas a preservar y extender a los selectores nuevos:

| Elemento | Clase(s) Tailwind |
|---|---|
| Nombre del producto | `font-serif uppercase tracking-tight text-stone-900` |
| Datos secundarios (ref, medida) | `font-sans text-[10px] uppercase tracking-widest text-stone-400` |
| Selector de medida (cada opción) | `border border-stone-300 px-4 py-2 text-[11px] uppercase tracking-widest` activo: `border-stone-900 text-stone-900` |
| Selector de color (círculo) | `w-8 h-8 rounded-full border` activo: `border-stone-900 ring-2 ring-stone-200` |
| Botón "Añadir al presupuesto" | `w-full h-14 bg-[#1a1a1a] text-white text-[11px] uppercase tracking-[0.25em] font-bold` |
| Fondo general | `bg-white text-stone-800` sin gradientes |

Sin emojis, sin colores de acento saturados, sin sombras `shadow-lg` en selectores. Whitespace generoso entre secciones (`gap-6`, `space-y-6`).

---

## Alternativa descartada

**Alternativa: mantener `DetalleArticulo.jsx` con estado interno propio**

Se consideró no extraer el hook y dejar toda la lógica de selección dentro de `DetalleArticulo.jsx`. Se descartó porque:
1. El componente ya tiene ~180 líneas. Con los dos nuevos selectores (medida + color) y la lógica de auto-selección superaría las 100 líneas de JSX+lógica, violando la regla de arquitectura "separar en hook + componente presentacional si supera 100 líneas".
2. El hook `useDetalleArticuloMaestro` hace el componente testeable de forma aislada: se puede probar la lógica de selección/auto-selección sin montar el DOM, y el componente presentacional se prueba con props estáticas, lo que reduce la complejidad de los tests.
3. `DetalleArticuloPage` necesita acceso al estado `error`/`loading` para decidir si renderizar 404 o `PantallaCarga`, lógica que no puede vivir dentro del componente hijo.
