# CHECKPOINTS — Evaluación del estado final

> No se evalúa el camino, se evalúa el destino. Un juez (humano o IA)
> usa estos checkpoints para decidir si el proyecto está sano.

## C1 — El arnés está completo
- [ ] Existen los archivos base: `AGENTS.md`, `init.ps1`,
      `feature_list.json`, `progress/current.md`.
- [ ] Existen los docs: `architecture.md`, `conventions.md`,
      `verification.md`, `specs.md`.
- [ ] `.\init.ps1` termina con exit code 0.

## C2 — El estado es coherente
- [ ] Como mucho una feature en `in_progress`.
- [ ] Toda feature `done` tiene tests que pasan.
- [ ] `progress/current.md` vacío o describe la sesión activa.

## C3 — El código respeta la arquitectura
- [ ] Ningún componente ni página importa `apiClient` directamente (solo los servicios).
- [ ] No hay lógica de negocio en el JSX del return.
- [ ] No hay dependencias externas no justificadas en `package.json`.
- [ ] Sin `console.log`, `console.group` ni emojis de debug sueltos.
- [ ] Sin TODOs sin contexto.

## C4 — La verificación es real
- [ ] Al menos un test por módulo/componente con lógica.
- [ ] Tests con mocks a nivel de servicio, no de `apiClient` directamente.
- [ ] `npm test -- --run` muestra > 0 tests y todos verdes.
- [ ] `npm run build` finaliza sin errores.

## C5 — La sesión se cerró bien
- [ ] `node_modules/`, `dist/`, `coverage/` están en `.gitignore`.
- [ ] `progress/history.md` tiene una entrada por la última sesión.
- [ ] La última feature está en su estado correcto.

## C6 — Spec Driven Development
- [ ] Toda feature `"sdd": true` en `spec_ready`/`in_progress`/`done`
      tiene `specs/<name>/` con los 3 archivos.
- [ ] `requirements.md` usa EARS estricto.
- [ ] Toda feature `done` con `"sdd": true` tiene todas sus tasks `[x]`.
- [ ] Cada `R<n>` cubierto por ≥1 test concreto.

---

**Uso:** el `reviewer` recorre cada checkbox, marca `[x]`/`[ ]`, y
rechaza el cierre si quedan boxes vacíos en C1–C6.
