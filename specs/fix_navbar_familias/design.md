# Design — fix_navbar_familias

## Archivos a modificar

| Archivo | Tipo de cambio |
|---|---|
| `src/components/NavBar.jsx` | Añadir dos `useState`, completar JSX mobile |

No se crean archivos nuevos. El bug es exclusivamente una omisión de declaraciones de estado en un componente existente.

## Cambios en NavBar.jsx

### 1. Declaraciones de estado faltantes

Añadir junto al bloque de `useState` existente (líneas 15-19):

```jsx
const [familiasPorSector, setFamiliasPorSector] = useState({});
const [loadingFamilias, setLoadingFamilias] = useState(false);
```

Esto resuelve el `ReferenceError` sin alterar ninguna otra lógica del componente.

### 2. Indicador de carga en el menú mobile

La función `handleToggleSector` ya existe y su lógica es correcta. El JSX del panel mobile (bloque `categorias.map`) actualmente solo renderiza un `<Link>` por sector y no consume `familiasPorSector` ni `loadingFamilias`. Hay que ampliar ese bloque para:

- Mostrar un spinner/texto de carga cuando `loadingFamilias && openCatId === cat.id`.
- Mostrar la lista de familias (`familiasPorSector[cat.id]`) cuando existen.
- Conectar el botón `<ChevronDown>` (ya importado pero sin uso mobile) al handler `handleToggleSector`.

El spinner puede ser un `<span>` con clases Tailwind (`animate-spin` o texto simple), sin dependencias externas, respetando la paleta `stone`.

## Restricciones de arquitectura relevantes

- El componente NO debe llamar a `FamiliaService` directamente en un `useEffect` global; la carga se dispara solo desde `handleToggleSector` (lazy loading bajo demanda). Esto cumple el principio de estado local mínimo y evita llamadas innecesarias a la API.
- `FamiliaService` ya existe en `src/services/FamiliaService.js` y ya está importado en `NavBar.jsx`. No se modifica ningún servicio.

## Alternativa descartada

**Extraer la lógica a un custom hook `useNavbarFamilias`.**

Justificación del descarte: la arquitectura indica que la extracción a hook solo se justifica cuando la lógica supera 30-40 líneas. El estado nuevo son dos `useState` y un handler de ~15 líneas ya existente. Extraerlo añadiría indirección sin beneficio real y crearía un archivo nuevo que el reviewer tendría que rastrear para un cambio mínimo. El fix más seguro y revisable es in-place en el componente.
