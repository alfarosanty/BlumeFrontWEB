# Requirements — front_articulos_maestro_migration

Feature: Migración del front de ArticuloPrecio a ArticuloMaestro

---

## Listing (CategoryPage)

**R1**
CUANDO `CategoryPage` inicializa o cambia de categoría, el sistema DEBE llamar a `ArticuloService.getArticulosMaestros` con los parámetros `{ pageNumber, pageSize, sector_id }` en lugar de `getArticulosPrecios`.

**R2**
CUANDO el usuario aplica un filtro de familia o subfamilia, el sistema DEBE llamar a `ArticuloService.getArticulosMaestros` con los parámetros correspondientes `{ sector_id, familia_id? , subfamilia_id? }`.

**R3**
El sistema DEBE usar `pageNumber` y `pageSize` como nombres de query params al llamar a `GET /articulos/maestros`, en lugar de `pagina` y `size`.

**R4**
MIENTRAS `getArticulosMaestros` está en curso, el sistema DEBE mantener visible el estado de carga existente (spinner/overlay de opacidad en la grilla).

**R5**
El sistema DEBE renderizar cada `ArticuloCard` pasando un objeto `ArticuloMaestro` como prop `articulo`, donde `articulo.id` es el ID del maestro.

---

## ArticuloCard

**R6**
CUANDO se hace clic en un `ArticuloCard`, el sistema DEBE navegar a `/articulo/:idArticuloMaestro` usando el campo `id` del `ArticuloMaestro`.

**R7**
El sistema DEBE renderizar `ArticuloCard` con los campos `id`, `url_foto`, `descripcion` y `codigo` provenientes del `ArticuloMaestro`.

---

## Ruta y servicio de detalle

**R8**
El sistema DEBE registrar la ruta `/articulo/:idArticuloMaestro` en `AppRoutes` y eliminar cualquier dependencia de `idArticuloPrecio` en ese segmento de ruta.

**R9**
`ArticuloService` DEBE exponer una función `getArticuloMaestroById(id)` que llame a `GET /articulos/maestros/:id` y retorne el objeto `ArticuloMaestro` completo con su árbol `articulosPrecios[].articulos[]`.

**R10**
SI `getArticuloMaestroById` falla o el ID no existe, ENTONCES el sistema DEBE devolver `null` y la página de detalle DEBE mostrar un estado de error o redirigir a 404.

---

## Página de detalle — selección de medida

**R11**
CUANDO `DetalleArticuloPage` carga el maestro, el sistema DEBE construir la lista de medidas a partir de `maestro.articulosPrecios[].medida.descripcion`.

**R12**
CUANDO el maestro tiene exactamente un `ArticuloPrecio`, el sistema DEBE seleccionar automáticamente esa medida sin mostrar el selector al usuario.

**R13**
CUANDO el maestro tiene más de un `ArticuloPrecio`, el sistema DEBE mostrar el selector de medida antes de mostrar el selector de color.

**R14**
CUANDO el usuario selecciona una medida, el sistema DEBE actualizar el `ArticuloPrecio` activo y mostrar los `articulos` (colores) correspondientes a ese precio.

---

## Página de detalle — selección de color

**R15**
CUANDO el `ArticuloPrecio` activo tiene exactamente un `Articulo`, el sistema DEBE seleccionar automáticamente ese color sin mostrarlo como opción interactiva.

**R16**
CUANDO el `ArticuloPrecio` activo tiene más de un `Articulo`, el sistema DEBE mostrar los círculos de color para que el usuario elija.

**R17**
MIENTRAS no se ha seleccionado un color (state de `articuloSeleccionado` es `null`), el sistema DEBE mantener deshabilitado el botón "Añadir al presupuesto".

**R18**
CUANDO el usuario selecciona un color, el sistema DEBE habilitar el botón "Añadir al presupuesto".

---

## Agregar al carrito

**R19**
CUANDO el usuario pulsa "Añadir al presupuesto", el sistema DEBE llamar a `addToCart` con el objeto `{ id_articulo, codigo, descripcion, color_nombre, color_hexa, medida_nombre, url_foto, id_articulo_precio, precio_unitario, cantidad, subtotal }` construido a partir del `Articulo` y el `ArticuloPrecio` seleccionados.

**R20**
El sistema NO DEBE modificar la firma ni la lógica interna de `addToCart` en `CartContext`.

---

## Compatibilidad con rutas antiguas

**R21**
SI el usuario navega a una ruta `/articulo/:id` donde `:id` no corresponde a ningún `ArticuloMaestro`, ENTONCES el sistema DEBE mostrar la página 404 genérica existente sin producir un error no capturado en consola.

---

## Estilo visual

**R22**
El sistema DEBE aplicar en `DetalleArticuloPage` y en cualquier componente nuevo del detalle una paleta monocromática (negro, blanco, grises Tailwind `stone`/`neutral`), sin colores de acento saturados, sin gradientes y sin sombras pesadas.

**R23**
El sistema DEBE usar tipografía `font-serif` para el nombre del producto y `font-sans` sin decoración para datos secundarios, siguiendo el estilo existente de `DetalleArticulo.jsx`.

**R24**
El selector de medida DEBE mostrarse como texto con borde, sin fondos de color, y el selector de color DEBE mostrarse como círculos pequeños con borde cuando están seleccionados, sin sombras adicionales.

**R25**
El botón "Añadir al presupuesto" DEBE tener ancho completo, fondo negro (`bg-[#1a1a1a]`), texto blanco y sin `border-radius` exagerado, consistente con el estilo actual de `DetalleArticulo.jsx`.
