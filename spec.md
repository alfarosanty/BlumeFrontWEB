# Project Specification: Blume Textil Frontend

## 1. Visión General
Este proyecto es el frontend (SPA) construido en React que actúa como interfaz para la API de un sistema ERP. Su propósito es permitir que clientes mayoristas o minoristas (previamente aprobados) naveguen por el catálogo, consulten stock/precios y generen presupuestos de compra.

## 2. Requerimientos de Negocio
- **Acceso Restringido:** El usuario debe estar autenticado y su cuenta aprobada para realizar acciones críticas (ver precios específicos, añadir al carrito, crear presupuestos).
- **Catálogo Dinámico:** Los productos se organizan jerárquicamente: `Sector -> Familia -> Subfamilia`.
- **Flujo de Presupuesto:** El usuario agrega artículos con variantes (color/medida) al carrito y finaliza la sesión generando un "Presupuesto", el cual queda registrado en el ERP para su posterior procesamiento administrativo.
- **Historial:** El cliente puede consultar sus presupuestos anteriores y el estado de los mismos.

## 3. Identidad Visual (Estilo "Zara")
- **Estética:** Sobria, elegante, minimalista y de corte editorial.
- **Paleta de Colores:** Predominio de blancos, grises (`stone-100` a `stone-900`) y acentos en dorado/marrón sutil (`#be9e70`).
- **Tipografía:** 
    - Títulos: Serif (ej. `font-serif`), con tracking amplio (`tracking-widest`).
    - Cuerpo/Datos: Sans-serif limpia, priorizando legibilidad y mayúsculas para elementos de navegación.
- **Componentes:** 
    - Imágenes de producto en formato vertical (aspect ratio 3:4 o 4:5).
    - Espaciado generoso (whitespace) para transmitir lujo y orden.
    - Botones con transiciones suaves y bordes mínimos.

## 4. Arquitectura Técnica
- **Framework:** React con Vite.
- **Estilos:** Tailwind CSS.
- **Iconografía:** Lucide React.
- **Gestión de API:** 
    - Centralizada en `src/services/apiClient.js`.
    - Base URL: `http://localhost:8000`.
    - Autenticación vía JWT (Bearer Token) almacenado en `localStorage` (`blume_token`).
    - Manejo de sesión expirada (401) con redirección automática al login.

## 5. Estructura de Datos Clave
- **Articulo:** Posee un `id`, `codigo`, `descripcion` y está vinculado a un `ArticuloPrecio`.
- **Variantes:** Un producto se define por la combinación de `Color` (nombre y hexa) y `Medida`.
- **Presupuesto:** Contiene una lista de items con `cantidad`, `precio_unitario` y `subtotal`.

## 6. Restricciones y Reglas de Implementación
- **Consumo de API:** 
    - Usar siempre el `apiClient` para peticiones que requieran token.
    - Las peticiones de catálogo deben soportar paginación (`pagina`, `size`).
- **Estado Global:** 
    - `AuthContext`: Maneja el usuario actual y el estado de autenticación.
    - `CartContext`: Maneja la persistencia temporal de los artículos seleccionados antes de convertirlos en presupuesto.
- **Manejo de Imágenes:** Si un artículo no tiene imagen, mostrar el placeholder: `<https://placehold.co/600x800?text=NO+IMAGE>`.
- **Validaciones:** Uso de Zod para validación de esquemas (opcional, pero recomendado para formularios de registro).

## 7. Endpoints Principales (Consumidos)
- `/auth/login`: Autenticación con `username` (email) y `password`.
- `/sectores/web`: Obtiene los sectores visibles en la web.
- `/articulos/precios`: Listado de productos con precios y filtros.
- `/presupuestos`: GET para historial, POST para crear uno nuevo.

## 8. Consideraciones de UX
- **Carga:** Implementar `PantallaCarga` (skeletons o spinners minimalistas) en todas las transiciones de datos.
- **Feedback:** Mostrar estados de "Añadido" en los botones de compra de forma temporal (1-2 segundos).
- **Responsive:** La experiencia debe ser excelente en móviles, dado que muchos clientes consultan el catálogo desde sus depósitos o tiendas.
```

### Consultas para profundizar en el proyecto:

Para que el `spec.md` sea aún más preciso y las futuras asistencias sean perfectas, me gustaría consultarte un par de cosas:

1.  **Aprobación de Usuarios:** ¿El flujo de "aprobación" es manual en el backend o hay algún estado que el frontend deba mostrar (ej: "Tu cuenta está pendiente de revisión")?
2.  **Precios Dinámicos:** ¿Existen diferentes listas de precios según el tipo de cliente, o el ERP devuelve un precio único por artículo para la web?
3.  **Stock Real-Time:** ¿Debo bloquear la compra si el ERP devuelve stock 0, o se permite "vender" y luego se gestiona el faltante como un pedido a producir?

¡Quedo atento a tus comentarios para seguir puliendo la herramienta!

<!--
[PROMPT_SUGGESTION]Agrega una sección de "Flujos de Usuario" al spec.md detallando el paso a paso desde el registro hasta el presupuesto.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]¿Cómo podríamos mejorar el manejo de errores en los servicios para que el spec.md defina un estándar de notificaciones al usuario?[/PROMPT_SUGGESTION]
