# Review — fix_navbar_familias

## Veredicto: CHANGES_REQUESTED

---

## 1. Trazabilidad R<n> <-> test

| Req | Test | Estado |
|-----|------|--------|
| R1  | T7 (componente monta sin ReferenceError, indirecto) | OK |
| R2  | T9 (loadingFamilias usado sin error, indirecto) | OK |
| R3  | NavBar.test.jsx > T7: click chevron llama getPorSector(10) | OK |
| R4  | SIN COBERTURA AFIRMATIVA — ningun test afirma que el spinner ES visible mientras loadingFamilias es true | FALLA |
| R5  | NavBar.test.jsx > T8: expand->collapse->expand llama al servicio 1 sola vez | OK |
| R6  | NavBar.test.jsx > T9: rechazo del servicio, spinner ausente al resolverse | OK |

---

## 2. Tasks

Todas marcadas [x] en tasks.md. Sin tareas pendientes sin justificacion documentada.

---

## 3. Arquitectura y convenciones

- NavBar.jsx no importa apiClient directamente. Cumple Principio 3 de architecture.md.
- Estado local con useState, no en Context global. Cumple Principio 2 de architecture.md.
- FamiliaService importado; carga lazy desde handler, no desde useEffect global. Cumple restriccion del design.md.
- Imports ordenados externos->internos. Cumple conventions.md.
- Componente funcional con hooks al tope, handlers en body, JSX en return. Cumple conventions.md.
- No hay TODOs sin contexto.
- No hay console.log ni console.group. Cumple regla dura de architecture.md.
- console.error(error) en NavBar.jsx linea 51: prohibido con emojis; este uso no tiene emoji. No es violacion de reglas duras.

---

## 4. Checkpoints CHECKPOINTS.md

- C1 [x]: Archivos base presentes, init.ps1 verde (exit 0).
- C2 [x]: 1 sola feature in_progress (fix_navbar_familias).
- C3 [x]: Sin apiClient en componentes. Sin console.log/group. Sin TODOs.
- C4 [ ]: npm test verde 5/5 pero R4 sin test afirmativo. PARCIAL.
- C5 [ ]: No evaluable en esta revision.
- C6 [ ]: Specs presentes, tasks todas [x], pero R4 sin test directo. PARCIAL.

---

## 5. Hallazgo critico — R4 sin test afirmativo

Archivo: src/__tests__/NavBar.test.jsx
Lineas: 107-122 (test T9)

T9 solo verifica (linea 120):
  expect(screen.queryByLabelText("Cargando familias")).not.toBeInTheDocument();
...DESPUES de que la promesa rechaza. Nunca afirma que el spinner ES visible
mientras loadingFamilias es true (promesa en vuelo).

El mapa de impl_fix_navbar_familias.md dice R4->T9 con nota spinner aparece y desaparece
pero la assertion de APARICION no existe en el test.

R4 exige: MIENTRAS loadingFamilias sea true, el sistema DEBE renderizar un
indicador de carga visible. Falta al menos:
  expect(screen.getByLabelText("Cargando familias")).toBeInTheDocument();
ejecutada antes de que la promesa se resuelva.

---

## 6. Cambios requeridos para el implementer

1. src/__tests__/NavBar.test.jsx
   Modificar T9 o anadir un caso para afirmar que aria-label=Cargando familias
   ES visible mientras getPorSector esta pendiente.
   Patron: promesa controlada (deferred), fireEvent.click, afirmar
   getByLabelText en el DOM, luego rechazar/resolver y afirmar que ya no esta.
   Esto cubre R4 de forma directa.

---

## Resultado de init.ps1

Exit code 0. Tests: 2 archivos, 5 tests, todos verdes.
Regla dura activa (R4 sin test afirmativo): CHANGES_REQUESTED.
