---
target: el portal (post-fixes P1+P2+onboarding)
total_score: 27
p0_count: 0
p1_count: 1
timestamp: 2026-07-08T03-36-35Z
slug: el-portal-jc-admin-jc-admin-jsx
---
# Re-crítica del portal (post-fixes) — 27/40

Segunda corrida de `/impeccable critique` sobre `impeccable-portal-prueba` tras el pase P1+P2+onboarding. Assessment A (diseño) y B (detector) en paralelo, aislados.

## Puntaje: 20 → 27 (+7). Detector: 15 → 6 hallazgos (−9).

Ambas evaluaciones coinciden en que la mejora es real y ganada, no cosmética.

## Verificación de los 6 arreglos (los dos agentes, en vivo)

| # | Fix | A (diseño) | B (detector) |
|---|-----|-----------|--------------|
| 1 | Franjas de estado → punto/tinte | Verificado (sin border-left ≥3px en tarjetas) | side-tab 10→1 (el 1 = nav activo, excepción legítima) |
| 2 | aria-label + aria-current sidebar | Verificado (~30 botones) | — |
| 3 | Contraste de avatares AA | Verificado (10/10 pasan) | — (nota: pasan justo, 4.54–4.87) |
| 4 | Eyebrow "Medique"/"Agenda" quitado | Verificado, sin headers pelados | Configuración/Reportes/Agenda con título limpio |
| 5 | "Ingresos hoy" duplicado en Reportes | Verificado (grilla 3-up) | 3 columnas alineadas, sin clipping |
| 6 | Salida persistente en onboarding | Verificado ("Terminar después" en cada paso) | — |

Sin regresiones: puntos/badges legibles, spacing intacto, headers no quedaron pelados, dots visibles en Agenda.

## Heurísticos (Nielsen, re-score)
Total 27/40 — "Aceptable", tope de banda (antes 20). Subieron: #3 control (+1, onboarding con salida), #7 flexibilidad, #8 minimalista (+1, eyebrow+duplicado quitados), con #1/#6 empujando arriba.

## Lo que sigue en pie (real, no inventado)
- **[P1] Navegación doble**: top bar (5 tabs + 5 dropdowns) Y un sidebar de 34 íconos exponen los mismos destinos dos veces. El "smell" más grande que queda; un producto seguro elige UNA nav primaria.
- **[P2] Sin aceleradores de power-user**: cero atajos de teclado / command palette (⌘K) en una herramienta de uso diario. Alex (power user) busca ⌘K y no hay nada.
- **[P2] Tipografía de Pacientes**: el detector volvió a marcar jerarquía plana (muchos tamaños 9–17px). Mismo hallazgo de la primera vuelta; sigue siendo mayormente derivado (avatares) — bajo valor/alto riesgo tocarlo.
- **[P3] Contraste de avatares al límite**: pasan AA pero con ~0.1 de margen; dejar documentado que son valores bloqueados para que un futuro "aclarar avatares" no rompa AA en silencio.

## Decisiones deliberadas que el detector sigue marcando (no son bugs)
- **Eyebrow de saludo del Dashboard** ("Buenas noches, <nombre>"): B lo vuelve a marcar como `hero-eyebrow-chip`. Se dejó a propósito — es personal y cambia por hora (voz, no scaffolding de marca). Si prefieres quitarlo también, es un cambio de una línea.
- **Acento de marca Los Medique** (#7891A6, 4.4:1): B lo marca como `low-contrast`. Es color de cliente deliberado; no se toca sin tu decisión.
- **5 de los 6 hallazgos del detector** (layout-transition en barras de progreso, barras de gráfico, punto del wizard, riel del sidebar) son animaciones aisladas que no causan reflow — B las clasificó como falsos positivos efectivos. El único con impacto real (riel del sidebar, jc-admin.jsx:2018) está mitigado por ser overlay `position:absolute`.

## Nota de viewport
B vio una colisión en Pacientes a 448px de ancho que **desaparece a 1280px** — artefacto de ancho angosto, no un defecto de escritorio.

**Tendencia `el-portal-jc-admin-jc-admin-jsx`: 20 → 27**
