# Verificación — blume-front

> Regla de oro: el agente no dice que funciona, lo demuestra.

## Prerequisito: dependencias de test instaladas

Si no están instaladas:
```powershell
npm install
```

Comprueba que `vitest` esté en `node_modules/.bin/`:
```powershell
npx vitest --version
```

## N1 — Tests unitarios (obligatorio)

```powershell
npm test -- --run
```

Esperado: todos los tests verdes. Exit code 0.

Cada función de servicio con lógica propia y cada componente con
comportamiento relevante debe tener:
- Test del camino feliz (datos válidos → resultado correcto).
- Test de error (fallo de red/API → comportamiento esperado: devuelve `[]` o lanza).

## N2 — Build de producción (obligatorio antes de `done`)

```powershell
npm run build
```

Esperado: sin errores de compilación. Carpeta `dist/` generada.
Si hay imports rotos o errores de tipos en JSX, el build lo detecta.

## N3 — Lint (obligatorio)

```powershell
npm run lint
```

Esperado: sin errores. Warnings son aceptables si están justificados.

## N4 — Trazabilidad R<n> ↔ test (obligatorio para features `sdd: true`)

Para cada requirement `R<n>` en `specs/<feature>/requirements.md`:
- Debe existir ≥1 test en `src/__tests__/` que lo verifique.
- El implementer documenta el mapa completo en `progress/impl_<feature>.md`.

Formato del mapa:
```
R1 → src/__tests__/MiComponente.test.jsx — describe 'MiComponente' > it 'hace X'
R2 → src/__tests__/MiServicio.test.js — describe 'getMiDato' > it 'retorna [] en error'
```

## Comando usado por init.ps1

```powershell
npm test -- --run
```

Si el comando retorna exit code distinto de 0, el entorno NO está listo.
El `init.ps1` fallará y bloqueará el avance.
