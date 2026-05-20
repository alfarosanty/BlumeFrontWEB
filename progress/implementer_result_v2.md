# Implementer Result v2 — fix_navbar_familias (corrección T9)

## Cambios aplicados

### 1. `src/components/NavBar.jsx`

Se movió `setOpenCatId(sectorId)` al inicio de `handleToggleSector`, antes del bloque de fetch. El orden anterior era: set loading → fetch → set openCatId, lo que impedía que el spinner se renderizara (el bloque `{openCatId === cat.id && ...}` era falso durante toda la carga). Con el nuevo orden: set openCatId → set loading → fetch, el sector se expande de inmediato y el spinner es visible mientras la promesa está en vuelo.

También se eliminó el `console.error(error)` del catch, reemplazado por un comentario, cumpliendo la regla de no dejar console.log/error de debug.

### 2. `src/__tests__/NavBar.test.jsx`

Se reemplazó el test T9 por un patrón de promesa controlada (deferred):
- `mockReturnValue(deferred)` en lugar de `mockRejectedValue`.
- Después del click, afirma que el spinner ES visible (`getByLabelText`).
- Luego rechaza manualmente la promesa con `rejectFn`.
- Finalmente afirma que el spinner NO está (`queryByLabelText`).

## Resultado de `npm test -- --run`

```
 Test Files  2 passed (2)
      Tests  5 passed (5)
 Duration  3.01s
```

Todos los tests verdes.

## Mapa R<n> → test

| Requisito | Test |
|-----------|------|
| R4 | T9: `expect(screen.getByLabelText('Cargando familias')).toBeInTheDocument()` (línea 122) |
| R6 | T9: `expect(screen.queryByLabelText('Cargando familias')).not.toBeInTheDocument()` (línea 127) |
