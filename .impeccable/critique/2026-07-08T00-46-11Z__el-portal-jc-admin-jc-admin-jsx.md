---
target: el portal (jc-admin.jsx, jc-admin-b.jsx, jc-admin-c.jsx)
total_score: 20
p0_count: 2
p1_count: 2
timestamp: 2026-07-08T00-46-11Z
slug: el-portal-jc-admin-jc-admin-jsx
---
# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "en vivo" badge en Reportes está bien; sin loading/skeleton states observados |
| 2 | Match System / Real World | 3 | Términos en español naturales; nombres truncados ("Marí…") rompen el flujo |
| 3 | User Control and Freedom | 2 | No se verificó undo en acciones destructivas de pacientes/citas |
| 4 | Consistency and Standards | 2 | Serif itálica ("Julio") mezclada en un control que debería ser 100% Jost (regla propia de DESIGN.md) |
| 5 | Error Prevention | 2 | Bug de colisión de texto en Pacientes (confirmado por ambas evaluaciones) induce a error de lectura |
| 6 | Recognition Rather Than Recall | 2 | Sidebar de ~30 ítems solo-ícono, con `title` (tooltip) en vez de `aria-label` |
| 7 | Flexibility and Efficiency | 1 | Sin atajos de teclado, sin acciones masivas en Pacientes |
| 8 | Aesthetic and Minimalist Design | 2 | Reportes duplica "Ingresos Hoy" como métrica propia Y dentro de la grilla de 4 |
| 9 | Error Recovery | 1 | No se pudo probar en vivo (sin datos de error), sin patrón de validación inline visible |
| 10 | Help and Documentation | 2 | "Tutoriales" existe como concepto pero no se verificó si es task-focused |
| **Total** | | **20/40** | **Aceptable — al borde inferior. Mejoras significativas necesarias.** |

# Veredicto de Anti-Patrones — ¿Se ve hecho por IA?

**Evaluación de diseño (Assessment A)**: Sí, alguien familiarizado con Linear/Notion/Stripe lo notaría en segundos. El patrón de eyebrow "—— MEDIQUE" se repite idéntico en Dashboard, Agenda, Reportes y Configuración (4/5 secciones revisadas) — el caso de manual de "gramática de IA" que describe el ban. Sumado al hero-metric template en Reportes (tarjeta grande con número arriba-derecha, luego 4 tarjetas idénticas repitiendo el mismo dato) y las franjas de color lateral usadas como indicador de estado, se lee como scaffoleado, no dirigido.

**Escaneo determinístico (Assessment B)**: exit code 2 (con hallazgos). **15 hallazgos totales** en los 3 archivos del portal:

- **`side-tab` (franja de acento lateral) — 10 hallazgos**: `jc-admin.jsx:2044,2651,3206,3664,3988,4002,4099` · `jc-admin-b.jsx:933,2324` · `jc-admin-c.jsx:3950,6078`
- **`layout-transition` (animación de propiedad de layout) — 5 hallazgos**: `jc-admin.jsx:824,2018,2397,4940` · `jc-admin-c.jsx:1144`

**Resolución de un desacuerdo entre ambas evaluaciones**: Assessment B, al inspeccionar manualmente, clasificó los 10 hallazgos de `side-tab` como "probable falso positivo" porque el color siempre lleva significado semántico (estado de cita, severidad de alerta), no es un acento decorativo suelto. Assessment A, de forma independiente, los marcó como violación real del ban. **Resuelvo a favor de Assessment A**: el ban de impeccable ("Side-stripe borders... Never intentional") es precisamente sobre usar `border-left` como portador del color semántico — que el color SÍ signifique algo no lo exime del ban, es justamente el caso que describe. Ya se corrigió el mismo patrón exacto en el panel móvil esta sesión (franja de 3px → punto de estado con halo), sin perder el significado. Aplica el mismo arreglo aquí: 10 ocurrencias reales, no 2.

Sobre `layout-transition`: Assessment B hizo un triage útil — de los 5 hallazgos, solo **`jc-admin.jsx:2018`** (ancho del riel del sidebar, `RAIL`→`EXP`) es real y confirmado en vivo (afecta el reflow de todo el contenido principal al pasar el mouse). Los otros 4 (`824`, `2397`, `4940`, `jc-admin-c.jsx:1144`) animan elementos aislados y pequeños (barra de progreso, barra de gráfico, punto de wizard) sin causar el problema de cascada que el rule apunta — bajo severidad / posible falso positivo.

**Evidencia visual (Assessment B, inyección de detector en 5 páginas)**: además de los `side-tab` y `layout-transition` ya cubiertos, el detector encontró en vivo: `clipped-overflow-container` (Dashboard), `low-contrast` (4.4:1, necesita 4.5:1 — en Dashboard, Pacientes, Reportes, Configuración), `all-caps-body` (texto en mayúsculas en Dashboard y Configuración), `hero-eyebrow-chip` (Dashboard y Agenda), `overused-font` y `flat type hierarchy` (Pacientes: 12 tamaños de fuente distintos, ratio 2.0:1). El overlay corrió en la pestaña de prueba del sub-agente (puerto 8761), no en tu navegador — puedo volver a mostrarlo en vivo si quieres verlo tú mismo.

# Impresión General

El portal tiene una base sólida (Configuración es genuinamente buena en su redacción y ayuda contextual, el toggle claro/oscuro funciona sin huecos, la vista semanal de Agenda es densa de forma correcta). Pero el puntaje de 20/40 y los dos bugs de layout confirmados por ambas evaluaciones de forma independiente dicen que hay trabajo real pendiente antes de que se sienta "impecable": franjas de color que violan un ban absoluto en 10 lugares, dos colisiones visuales que confunden al usuario en pleno flujo de trabajo, y un sidebar de 30 íconos sin etiquetas que obliga a memorizar en vez de reconocer.

# Qué Funciona

1. **Configuración** es la sección más disciplinada: vocabulario de formulario consistente, texto de ayuda bajo cada campo explicando la consecuencia ("Si lo dejas vacío, se genera automáticamente…"), contraste real en oscuro (`rgb(234,241,247)` sobre `rgb(22,33,46)` pasa AA con holgura).
2. **El toggle claro/oscuro** funciona limpio en todo el shell — sin elementos huérfanos exclusivos de un tema.
3. **La vista semanal de Agenda** es una vista de calendario densa y con información real, apropiada para el flujo de una clínica — densidad bien hecha, a diferencia de las tarjetas infladas de Reportes.

# Problemas Prioritarios

**[P0] Colisión de texto en Pacientes.** Confirmado de forma independiente por AMBAS evaluaciones (sin verse entre sí): en la fila de "Antonia Vera", la etiqueta de procedimiento "Sculptra · sesión 2" se superpone/recorta contra el teléfono "+56 9 9013 4456" justo arriba. Induce a error de lectura durante el trabajo clínico real. Las cabeceras de columna "PACIENTE"/"CONTACTO"/"PROCEDIMIENTO" también se superponen independientemente del bug de datos — sugiere un ancho fijo que se rompe con contenido real.
**Comando sugerido**: `/impeccable layout`

**[P0] Configuración: contenido tapado detrás del riel del sidebar.** Hallazgo nuevo de Assessment B, no visto por Assessment A (que evaluó el CONTENIDO de esta sección como el más fuerte del portal — la contradicción es real y vale la pena verificarla: el copy es bueno, pero el render tiene un bug). Etiquetas y encabezados de formulario aparecen cortados a la izquierda ("...ación de la clínica", "...ICA", "...RGO"), reproducible en 2+ capturas con el mouse ya lejos del sidebar (descarta que sea un estado hover transitorio) — parece que el riel expandido se queda "pegado" sobre el contenido en vez de empujarlo.
**Comando sugerido**: `/impeccable layout`

**[P1] Franjas de color lateral como indicador de estado — 10 ocurrencias confirmadas, no 2.** `jc-admin.jsx` (7 lugares: nav activo, tarjeta de cita en agenda, bloque día/mes, tooltip de cita) + `jc-admin-b.jsx` (2: tarjeta de resumen, lista de incidencias) + `jc-admin-c.jsx` (2, ya conocidos: lista de actividad, alertas de severidad). Ban absoluto de impeccable ("el tell más reconocible de UI generada por IA"). Ya existe el patrón de reemplazo funcionando en este mismo repo (panel móvil: punto de estado con halo).
**Comando sugerido**: `/impeccable polish`

**[P1] Sidebar de ~30 ítems solo-ícono + sin foco visible al navegar por teclado.** `title` (tooltip nativo) en vez de `aria-label`; `button[title="Dashboard"]:focus` → `outline:none`, `box-shadow:none` confirmado. Falla el heurístico #6 (reconocimiento vs. recall) y bloquea completamente la navegación por teclado (persona Sam). Dos pares de contraste específicos también fallan AA por poco (4.4:1, se necesita 4.5:1): texto blanco sobre `#8c6e8f`, y `#7891a6` sobre `#1e2b3a`.
**Comando sugerido**: `/impeccable audit` (foco, aria-label, contraste) + `/impeccable clarify` (etiquetas visibles para el sidebar)

**[P2] Eyebrow repetido + hero-metric duplicado.** "—— MEDIQUE" idéntico en cada encabezado de sección (4/5 revisadas); Reportes muestra "Ingresos Hoy" dos veces (como métrica propia y dentro de la grilla de 4 tarjetas).
**Comando sugerido**: `/impeccable distill`

**[P2] Escala tipográfica fragmentada en Pacientes.** 12 tamaños de fuente distintos en la misma vista, ratio 2.0:1 entre pasos — genera jerarquía difusa en vez de clara.
**Comando sugerido**: `/impeccable typeset`

**[P2] Onboarding de 7 pasos antes de ver datos reales; 5 de 8 ítems de carga cognitiva fallan** (chunking, jerarquía visual, ≤4 opciones por decisión, memoria de trabajo, disclosure progresivo). Contradice el propio principio de PRODUCT.md ("la tecnología se muestra, no se anuncia").
**Comando sugerido**: `/impeccable onboard`

# Red Flags por Persona

**Alex (Power User)**: cero atajos de teclado en todo el portal. El modal de onboarding antepone 7 pasos antes de mostrar datos reales (mitigado por "Saltar", pero sigue siendo fricción de primer uso). Pacientes no tiene selección/acción masiva pese a ser una tabla de datos. Nombres truncados en Agenda ("Marí…", "Ferna…") fuerzan clics extra para identificar pacientes que Alex ya reconoce a simple vista.

**Sam (Accessibility-Dependent User)**: sin anillo de foco visible en la navegación — el teclado es efectivamente invisible. El sidebar usa `title` en vez de `aria-label` — anuncio inconsistente en lector de pantalla. El estado se comunica solo por color (franjas verde/azul en citas) sin equivalente textual — falla "significado solo por color". El bug de colisión de texto en Pacientes también desordenaría el orden de lectura de un lector de pantalla (nodos superpuestos).

# Observaciones Menores

- Serif itálica ("Julio") mezclada en el control de rango de fecha de Agenda — rompe la regla propia de DESIGN.md ("Jost exclusivo" en JC_Admin.html).
- Badge de notificaciones muestra "6" estático, sin diferenciar leído/no-leído.
- FAB del copiloto se superpone con la tarjeta "Pendientes de hoy" en Dashboard en algunos tamaños de viewport. Sugerido: `/impeccable adapt`.
- `clipped-overflow-container` en Dashboard (`div.jc-admin-frame` recorta un hijo posicionado) — hallazgo del detector, severidad baja.
- Reportes mostró una captura en blanco justo al navegar, pero el DOM ya tenía el contenido correcto en ese momento (verificado con el snapshot de accesibilidad simultáneo) — parece demora de pintado, no un bug real.

# Preguntas para Considerar

1. Si Configuración es tan disciplinada, ¿por qué Reportes regresa a tarjetas-plantilla repetidas — se construyó en otra pasada, con más presión de tiempo?
2. ¿El sidebar realmente necesita 30 destinos planos, o una estructura agrupada/colapsable serviría mejor al perfil de PRODUCT.md ("uso intensivo durante jornada clínica, necesitan velocidad")?
3. El wizard de onboarding antepone RUT, profesionales, servicios e inventario antes de mostrar funcionalidad real — ¿un modelo "configura sobre la marcha" convertiría mejor, en línea con el principio de diseño "la tecnología se muestra, no se anuncia"?
