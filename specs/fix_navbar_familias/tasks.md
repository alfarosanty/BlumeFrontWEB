# Tasks — fix_navbar_familias

El implementer marca `[x]` al completar cada paso. El reviewer rechaza si queda `[ ]` sin justificación escrita.

---

- [x] T1 — En `src/components/NavBar.jsx`, añadir `const [familiasPorSector, setFamiliasPorSector] = useState({})` junto al bloque de hooks existente. Cubre: R1.

- [x] T2 — En `src/components/NavBar.jsx`, añadir `const [loadingFamilias, setLoadingFamilias] = useState(false)` junto al bloque de hooks existente. Cubre: R2.

- [x] T3 — En el JSX del menú mobile (`categorias.map`), conectar el chevron al handler `handleToggleSector(cat.id)` y mostrar `familiasPorSector[cat.id]` como lista de familias cuando el sector está expandido (`openCatId === cat.id`). Cubre: R3.

- [x] T4 — En el mismo bloque mobile, renderizar un indicador de carga (ej. `<span className="animate-spin ...">`) condicionado a `loadingFamilias && openCatId === cat.id`. Cubre: R4.

- [x] T5 — Verificar que `handleToggleSector` ya contiene la guarda `if (!familiasPorSector[sectorId])` antes de llamar al servicio. Si no está, añadirla. Cubre: R5.

- [x] T6 — Verificar que el bloque `finally` de `handleToggleSector` llama `setLoadingFamilias(false)` para cubrir el caso de error. Si no está, añadirlo. Cubre: R6.

- [x] T7 — Crear `src/__tests__/NavBar.test.jsx`. Escribir un test que mockee `FamiliaService` con `vi.mock`, renderice `<Navbar>` dentro de `MemoryRouter` con usuario autenticado, simule el click sobre un sector en el menú mobile y verifique que `FamiliaService.getPorSector` fue llamado con el `id` correcto. Cubre: R3.

- [x] T8 — En el mismo archivo de test, añadir un caso que simule que `familiasPorSector` ya tiene datos para el sector y verifique que `FamiliaService.getPorSector` NO es llamado una segunda vez. Cubre: R5.

- [x] T9 — En el mismo archivo de test, añadir un caso que haga que `FamiliaService.getPorSector` rechace con un `Error` y verifique que el indicador de carga no permanece activo (el componente no queda en estado de carga indefinida). Cubre: R6.
