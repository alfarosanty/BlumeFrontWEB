# Convenciones — blume-front

## Runtime y herramientas

- **Node.js:** ≥ 18 (LTS). Usa `npm` (no yarn ni pnpm).
- **React 19.** Componentes funcionales con hooks. Sin class components.
- **Vite 8** como bundler/dev server. Sin CRA ni webpack.
- **Tailwind CSS 4** para estilos. Sin CSS-in-JS, sin módulos CSS salvo casos aislados.
- **ESLint 9** (flat config en `eslint.config.js`). Debe pasar sin errores.
- **Vitest 2+** + **React Testing Library** para tests.
  Tests en `src/__tests__/`. Archivos: `<Nombre>.test.jsx` o `<nombre>.test.js`.

## Naming

| Concepto | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase + `.jsx` | `ArticuloCard.jsx` |
| Páginas | PascalCase + `Page.jsx` o nombre descriptivo | `CategoryPage.jsx` |
| Servicios | PascalCase + `Service.js` | `ArticuloService.js` |
| Custom hooks | `use` + PascalCase + `.js` | `useCart.js`, `useToast.js` |
| Contextos | PascalCase + `Context.jsx` | `CartContext.jsx` |
| Archivos de test | `<Nombre>.test.jsx` / `.test.js` | `ArticuloCard.test.jsx` |
| Variables / funciones | camelCase | `articulosPrecios`, `cargarData` |
| Constantes de módulo | UPPER_SNAKE | `BASE_URL`, `ENDPOINT`, `LIMITE` |
| Rutas de React Router | kebab-case | `/mis-presupuestos`, `/detalle-articulo` |

## Estructura de un componente funcional

```jsx
// 1. Imports de librerías externas
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 2. Imports internos (services, context, components)
import { ArticuloService } from '../services/ArticuloService';
import ArticuloCard from '../components/ArticuloCard';

// 3. Declaración del componente
const MiComponente = ({ prop1, prop2 }) => {
  // 4. Hooks al tope
  const [estado, setEstado] = useState(null);

  // 5. Efectos
  useEffect(() => { /* ... */ }, []);

  // 6. Handlers y funciones auxiliares
  const handleClick = () => { /* ... */ };

  // 7. Return JSX (sin lógica de negocio)
  return <div>...</div>;
};

// 8. Export default al final
export default MiComponente;
```

## Manejo de errores

- Los servicios capturan errores con `try/catch` y lanzan `Error` con
  mensaje legible o devuelven un default seguro (`[]`, `null`, `{}`).
- Los componentes muestran estados de carga y error explícitos.
- Nunca usar `console.error` con emojis en producción.
- El `apiClient` redirige automáticamente a `/login` en 401.
- No suprimir errores con `.catch(() => {})` silencioso sin motivo.

## Tests (Vitest + React Testing Library)

```
src/__tests__/
├── setup.js              # Configuración global (jest-dom matchers)
├── smoke.test.js         # Smoke test del entorno
├── ArticuloCard.test.jsx # Tests de componentes
├── ArticuloService.test.js
└── ...
```

- Describe el componente o función en `describe(...)`.
- Nombra los casos con `it('hace X cuando Y', ...)`.
- Camino feliz + al menos un caso de error por función con lógica.
- Mockea a nivel de servicio (mock del módulo del servicio), no de `apiClient`.
- Usa `vi.mock('../services/ArticuloService')` para aislar componentes.
- No mockear comportamientos de React Router — usa `MemoryRouter` en tests.

## Tailwind

- Usa clases de utilidad directamente en JSX. Sin `@apply` salvo casos
  muy justificados en `index.css`.
- Responsive: mobile-first. Breakpoints estándar: `sm:`, `md:`, `lg:`.
- Animaciones: prefiere `transition-*` y `duration-*` de Tailwind antes
  que CSS custom.

## Gestión de imports

- Usa imports relativos para módulos internos.
- El orden es: externos → internos → estilos.
- No usar alias de path (`@/`) salvo que se configure en `vite.config.js`.
