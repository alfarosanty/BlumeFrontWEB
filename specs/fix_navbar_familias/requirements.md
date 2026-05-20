# Requirements — fix_navbar_familias

Feature: Corregir menú desplegable de familias en NavBar  
ID: 1  
Estado: spec_ready

---

## Requisitos

**R1**  
El sistema DEBE declarar `familiasPorSector` como estado React con `useState({})` en el componente `Navbar`, de forma que su lectura y escritura no produzcan `ReferenceError` en runtime.

**R2**  
El sistema DEBE declarar `loadingFamilias` como estado React con `useState(false)` en el componente `Navbar`, de forma que su escritura no produzca `ReferenceError` en runtime.

**R3**  
CUANDO el usuario pulsa un sector en el menú mobile, el sistema DEBE invocar `FamiliaService.getPorSector(sectorId)` y mostrar la lista de familias asociadas a ese sector sin errores en consola.

**R4**  
MIENTRAS `loadingFamilias` sea `true`, el sistema DEBE renderizar un indicador de carga visible dentro del panel del menú mobile del sector en expansión.

**R5**  
SI `familiasPorSector[sectorId]` ya existe (el sector fue cargado previamente), ENTONCES el sistema DEBE omitir la llamada a `FamiliaService.getPorSector` y expandir directamente el sector con los datos en caché.

**R6**  
SI la llamada a `FamiliaService.getPorSector` lanza un error, ENTONCES el sistema DEBE capturar la excepción, establecer `loadingFamilias` a `false` y NO dejar el indicador de carga activo de forma indefinida.
