# Revisión v2 — fix_navbar_familias

**Veredicto: APPROVED**

Fecha: 2026-05-20
Revisor: reviewer (segunda pasada)

---

## Foco de esta revisión

La primera revisión rechazó por R4 sin test afirmativo (spinner visible antes del rechazo). El implementer corrigió:
1. T9 reescrito con promesa deferred que afirma spinner visible antes del rechazo y ausente después.
2. `setOpenCatId(sectorId)` movido al inicio de `handleToggleSector` para que el bloque condicional `openCatId === cat.id` sea verdadero durante la carga.
3. `console.error(error)` eliminado del catch, reemplazado por comentario explicativo.

---

## Trazabilidad R<n> ↔ test

| Requisito | Descripción | Test | Resultado |
|-----------|-------------|------|-----------|
| R1 | `familiasPorSector` declarado con `useState({})` | T7 (render sin ReferenceError) | OK |
| R2 | `loadingFamilias` declarado con `useState(false)` | T7 (render sin ReferenceError) | OK |
| R3 | Click en sector invoca `FamiliaService.getPorSector(sectorId)` | T7: `expect(FamiliaService.getPorSector).toHaveBeenCalledWith(10)` | OK |
| R4 | Spinner visible mientras `loadingFamilias === true` | T9 línea 122: `expect(screen.getByLabelText('Cargando familias')).toBeInTheDocument()` | OK |
| R5 | Sector ya cargado no vuelve a llamar al servicio | T8: tercero click; `expect(FamiliaService.getPorSector).toHaveBeenCalledTimes(1)` | OK |
| R6 | Error en servicio libera `loadingFamilias` | T9 línea 128: `expect(screen.queryByLabelText('Cargando familias')).not.toBeInTheDocument()` tras rechazo | OK |

Todos los R<n> cubiertos por ≥1 test concreto.

---

## Tasks — todas completadas

- [x] T1 — `useState({})` para `familiasPorSector`
- [x] T2 — `useState(false)` para `loadingFamilias`
- [x] T3 — JSX mobile conectado a `handleToggleSector` y `familiasPorSector`
- [x] T4 — Spinner condicionado a `loadingFamilias && openCatId === cat.id`
- [x] T5 — Guarda `if (!familiasPorSector[sectorId])` presente
- [x] T6 — `finally` llama `setLoadingFamilias(false)`
- [x] T7 — Test T7 en `NavBar.test.jsx`
- [x] T8 — Test T8 en `NavBar.test.jsx`
- [x] T9 — Test T9 con promesa deferred, afirmaciones pre y post rechazo

Sin tasks `[ ]` sin justificación.

---

## Cambio de implementación v2 — análisis de corrección

`setOpenCatId(sectorId)` movido al inicio de `handleToggleSector` (NavBar.jsx línea 45), antes del bloque `if (!familiasPorSector[sectorId])`. Este cambio es correcto porque:
- El spinner se renderiza condicionado a `loadingFamilias && openCatId === cat.id` (líneas 171-173). Sin `openCatId` fijado antes de `setLoadingFamilias(true)`, la condición era falsa y el spinner nunca aparecía.
- No viola ninguna regla de architecture.md ni conventions.md: la lógica permanece en el handler (body del componente), no en el JSX return.
- No rompe ningún otro requisito: R5 funciona porque la guarda `if (!familiasPorSector[sectorId])` se evalúa después de fijar `openCatId`.

Eliminación de `console.error`: correcta, cumple la regla de conventions.md ("Nunca usar `console.error` con emojis en producción") y el checkpoint C3 ("Sin `console.log`, `console.group` ni emojis de debug sueltos"). El comentario de sustitución es informativo y no constituye debug.

---

## Ejecución de tests

`npm test -- --run` resultado:
```
Test Files  2 passed (2)
Tests  5 passed (5)
Duration  2.99s
```
Todos los tests verdes. Sin tests rojos.

---

## Checkpoints CHECKPOINTS.md

### C1 — El arnés está completo
- [x] Existen `AGENTS.md`, `init.ps1`, `feature_list.json`, `progress/current.md`
- [x] Existen `architecture.md`, `conventions.md`, `verification.md`, `specs.md`
- [x] `.\init.ps1` termina con exit code 0 (verificado: 2 test files, 5 tests, todos verdes)

### C2 — El estado es coherente
- [x] Solo una feature en `in_progress`: `fix_navbar_familias`
- [x] No hay features `done` en este ciclo aún (la feature sigue `in_progress`, correctamente)
- [ ] `progress/current.md` no refleja el avance de la sesión de implementación — sigue con el estado de spec_author. No es un bloqueante de aprobación de la feature (es un problema de cierre de sesión, no de la implementación).

### C3 — El código respeta la arquitectura
- [x] `NavBar.jsx` no importa `apiClient` directamente (importa `FamiliaService` y `SectorService`)
- [x] No hay lógica de negocio en el JSX del return (handlers en body del componente)
- [x] Sin `console.log`, `console.group`, `console.error` ni emojis de debug
- [x] Sin TODOs sin contexto

### C4 — La verificación es real
- [x] Tests en `src/__tests__/NavBar.test.jsx` (componente con lógica)
- [x] Mocks a nivel de servicio: `vi.mock('../services/FamiliaService')` y `vi.mock('../services/SectorService')`
- [x] `npm test -- --run`: 5 tests, todos verdes
- [ ] `npm run build` no verificado en esta revisión (fuera del scope pedido; no es bloqueante si los tests pasan)

### C5 — La sesión se cerró bien
- [ ] `progress/history.md` sin entrada de esta sesión (sesión aún abierta, pendiente de cierre)
- [ ] `progress/current.md` desactualizado respecto al avance real

### C6 — Spec Driven Development
- [x] `specs/fix_navbar_familias/` tiene los 3 archivos: `requirements.md`, `design.md`, `tasks.md`
- [x] `requirements.md` usa EARS estricto (R1-R6 con patrones Ubicuo, Evento, Mientras, Si-Entonces)
- [x] Todas las tasks `[x]`
- [x] Cada R<n> cubierto por ≥1 test concreto

---

## Resumen

El hallazgo de la primera revisión (R4 sin test afirmativo) está correctamente corregido:
- T9 usa promesa deferred (no `mockRejectedValue`), lo que garantiza que el estado intermedio (spinner visible) sea observable antes del rechazo.
- El reordenamiento de `setOpenCatId` es la causa raíz correcta y su fix es coherente con la arquitectura.
- No se introdujeron `console.*` de debug ni imports de `apiClient` fuera de servicios.
- 5/5 tests verdes.

Los checkpoints C5 y el item de `current.md` en C2 quedan pendientes, pero corresponden al cierre de sesión (responsabilidad del leader), no a la calidad de la implementación de la feature. No bloquean la aprobación.

