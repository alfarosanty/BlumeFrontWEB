# Arquitectura — blume-front

> Los revisores evalúan el código contra este archivo. Si no está aquí,
> no es un requisito.

## Principios

1. **Capas claras.** La aplicación sigue un flujo unidireccional:
   `pages → components → services → apiClient`. Ninguna capa llama
   directamente a la capa que la contiene. Los componentes no hacen
   fetch directo: eso es responsabilidad exclusiva de los servicios.

2. **Estado global mínimo.** Solo `AuthContext` (sesión/token JWT) y
   `CartContext` (carrito de presupuesto) son globales. El resto del
   estado vive en el componente o página que lo necesita.

3. **Servicios por dominio.** Cada entidad de negocio tiene su propio
   servicio que centraliza las llamadas a la API. Nunca se llama a
   `apiClient` directamente desde páginas o componentes.

4. **Sin lógica de negocio en JSX.** Los handlers y efectos se definen en
   el body del componente. Cuando la lógica crece más allá de 30–40
   líneas, se extrae a un custom hook en la misma carpeta o en `hooks/`.

5. **Invariantes del dominio.** Un artículo identificado por
   `id_articulo` puede aparecer múltiples veces con distintos precios
   (`articuloPrecio`). El carrito almacena `articuloPrecio`, no el
   artículo maestro. Los presupuestos se crean desde el carrito y son
   inmutables una vez enviados.

## Capas del proyecto

```
src/
├── pages/          Vistas de ruta. Orquestan datos y componen componentes.
│                   Pueden tener estado y efectos. No hacen fetch directo.
├── components/     Componentes reutilizables. Reciben props, no fetchen.
│                   Pueden consumir Context (Cart, Auth).
├── context/        Estado global compartido: AuthContext, CartContext.
│                   Solo lo que realmente necesita vivir globalmente.
├── routes/         Configuración de rutas (AppRoutes, ProtectedRoute).
│                   Sin lógica de negocio.
├── services/       Clientes de API, uno por dominio de negocio.
│                   Importan apiClient; gestionan errores y devuelven datos.
├── data/           Datos estáticos de referencia (forma de objetos, mocks).
│                   No es estado ni hace fetch.
└── assets/         Imágenes y recursos estáticos.
```

## Servicios disponibles

| Servicio | Dominio | Endpoint base |
|---|---|---|
| `apiClient` | Base HTTP (token JWT, manejo 401) | `http://localhost:8000` |
| `AuthService` | Login, validación de token | `/auth` |
| `ArticuloService` | Catálogo de artículos y precios | `/articulos` |
| `PresupuestoService` | Creación y consulta de presupuestos | `/presupuestos` |
| `FamiliaService` | Familias de producto por sector | `/familias` |
| `SubFamiliaService` | Subfamilias de producto | `/subfamilias` |
| `SectorService` | Sectores/categorías visibles en web | `/sectores` |
| `HomeService` | Configuración de la home (hero, contacto) | `/config` |
| `UsuarioService` | Registro y datos de usuario | `/usuarios` |

## Flujo de datos principal

```
Usuario
  │
  ▼
Page (estado local, useEffect, handlers)
  │          │
  │          ▼
  │      Service (getArticulosPrecios, crear, etc.)
  │          │
  │          ▼
  │      apiClient (inyecta Bearer token, redirige en 401)
  │          │
  │          ▼
  │      Backend REST (localhost:8000)
  │
  ├── CartContext  (carrito en localStorage)
  └── AuthContext  (token JWT en localStorage)
```

## Qué NO hacer

- No importar `apiClient` desde componentes ni páginas.
- No meter estado del servidor (artículos, presupuestos) en Context global.
- No usar `useEffect` para derivar estado calculable (ej. `totalItems` ya se computa en CartContext).
- No hardcodear URLs de la API fuera de los archivos de servicio.
- No pasar más de 4 props a un componente sin evaluar composición o Context.
- No dejar `console.log`, `console.group` ni emojis de debug en código de producción.
- No crear componentes que hagan tanto la lógica como la presentación si supera 100 líneas — separar en hook + componente presentacional.
