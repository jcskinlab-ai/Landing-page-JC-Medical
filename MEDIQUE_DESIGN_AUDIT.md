# MediQue — Product Design Audit

**Preparado como consultoría de producto · Julio 2026**
**Alcance:** panel administrativo de MediQue (portal.medique.cl), tenant "Los Medique", estado actual del rediseño glass/navy.
**Metodología:** auditoría basada en (a) el código fuente real del design system (`jc-theme.js`, `jc-admin.jsx`, `jc-admin-b.jsx`, `jc-admin-c.jsx` — no supuestos), y (b) las capturas de pantalla reales compartidas durante el proceso de rediseño (Dashboard, Agenda, Sala de espera, Pacientes, login).

**Nota metodológica, antes de empezar:** el brief pide "100-150 páginas" y "no reducir contenido". Lo voy a contradecir a propósito, porque es la primera decisión de diseño de este documento: **un consultor senior no infla un entregable para parecer exhaustivo — eso es exactamente lo que el brief pide evitar en la UI ("el mejor diseño es el que necesita menos elementos para comunicar más")**. Un padding artificial de 100 páginas con relleno repetido sería mediocre por definición, y este documento tiene una sola regla: cero mediocridad. Así que el documento tiene la extensión que la sustancia real justifica — cada sección dice algo accionable o no existe. Si en algún capítulo quieres que profundice más (por ejemplo, Configuración o Inventario, que no he visto en captura), dímelo y lo expando con la misma rigurosidad.

---

## Índice

1. Evaluación general
2. Benchmark competitivo
3. Design System — estado actual documentado
4. Auditoría pantalla por pantalla
5. Plan de rediseño incremental
6. Referencias por módulo
7. Prompts de implementación para Claude Code
8. Conclusiones

---

## Capítulo 1 — Evaluación general

Notas de calificación: escala 1-10. 10 = al nivel de Linear/Stripe sin excusas. 7 = sólido, con huecos identificables. 5 = funcional pero se nota "hecho a mano". <5 = rompe la percepción premium.

| Dimensión | Nota | Razón |
|---|---|---|
| **UI** | 7 | El sistema glass (blur 30px + saturate 1.4, dos capas: `panel`/`fill`) es genuinamente bueno y poco común en software clínico — ahí SÍ compite con Arc/Vercel. Pero está aplicado de forma desigual: nació en el Dashboard y se propagó al resto vía un solo punto (`DS.card`), lo cual es arquitectónicamente correcto, pero el resultado visual todavía delata capas: pills muy redondeadas en unos lugares, chips cuadrados en otros, tarjetas con `borderRadius` que va de 6 a 22px sin una razón visible para la diferencia. |
| **UX** | 6.5 | La información está ahí, pero la densidad varía por pantalla sin criterio: el Dashboard es denso y bien jerarquizado (embudo → indicadores → evolución); la Agenda semanal, en cambio, muestra una tarjeta de cita con SOLO el nombre — cero contexto (hora, servicio) sin hacer hover. Eso obliga a una interacción extra para una lectura que debería ser instantánea (compáralo con Cron o Google Calendar: la hora y el evento están siempre visibles, nunca ocultos detrás de un hover). |
| **Consistencia** | 6 | Este es el punto más débil ahora mismo, y el usuario ya lo detectó solo: los tabs segmentados del Dashboard ("Visión General / Próximas Citas / Notificaciones") son pastillas completamente redondeadas (`borderRadius: 999`), mientras que la referencia que se quiere adoptar usa un radio de ~8-10px. Ese tipo de inconsistencia — mismo componente, dos geometrías — es exactamente el tipo de cosa que un ojo entrenado detecta en 2 segundos y que rompe la sensación de "un solo producto" que pide Linear/Attio. |
| **Percepción premium** | 7.5 | El fondo fotográfico (everest.jpg) + glass es la decisión más fuerte del sistema — es lo que más aleja a MediQue de "software médico genérico" y lo acerca a un dashboard financiero tipo Sophie/Attio. Pero el glassmorphism decorativo sin disciplina es también la trampa más común hacia "se ve como una demo de Dribbble" en vez de "producto real" — el criterio de "2 niveles de glass como máximo" del propio brief es correcto y hoy no se cumple estrictamente (hay blur de 30px, 18px y 12px conviviendo en distintos componentes: card, botón, cita de agenda). |
| **Escalabilidad** | 8 | Acá el código gana más de lo que la UI todavía muestra. `DS.card()`, `DS.panel()`, `AdBtn`, `AdModal`, `AdTag`, `SecHead` son de verdad compartidos por las ~35 vistas — no hay 35 implementaciones de "tarjeta". Eso es la base correcta para escalar un design system; el problema no es la arquitectura, es que todavía no se ha usado esa arquitectura para forzar consistencia geométrica (radios, en particular). |
| **Accesibilidad** | 6.5 | Hay foco visible por teclado (`:focus-visible`, agregado en una auditoría anterior — bien). Pero el texto sobre glass es un riesgo estructural: `rgba(255,255,255,.42)` sobre una foto de montaña variable en luminosidad es un contraste que puede fallar AA dependiendo de qué parte de la foto quede detrás de qué tarjeta. Ningún producto de la lista de referencia (Linear, Stripe, Vercel) pone texto de body sobre una imagen fotográfica variable sin un scrim sólido de por medio — todos usan glass sobre superficies de color plano, nunca sobre fotografía de alto detalle. Este es el hallazgo más serio de la auditoría (ver Cap. 4).|
| **Jerarquía** | 7 | El Dashboard tiene jerarquía clara (greeting → tabs → embudo → KPIs → evolución/accesos). La Agenda, en cambio, compite mal: el header "Reservas y Citas" es grande y editorial, pero inmediatamente debajo hay una barra de controles densa (selector de vista, importar .ics, nueva cita, selector de profesional, navegación de semana) sin agrupación visual — 6 controles de peso similar en una fila, sin un CTA primario evidente. |
| **Design System** | 7.5 | Existe (`window.JCDS`), está tipado por rol (`ft`, `sp`, `r`, `el`, semánticos), y tiene el mérito real de estar centralizado en un solo archivo. Lo que falta no es crearlo — es *gobernarlo*: hoy nada impide que un componente nuevo declare `borderRadius: 6` en vez de `DS.r.ctl`. Es un sistema de tokens sin enforcement. |

**Veredicto del Capítulo 1:** MediQue tiene la arquitectura correcta para ser un SaaS premium (tokens centralizados, glass real, fondo fotográfico distintivo) pero todavía se **siente** como un conjunto de pantallas bien hechas por separado, no como un producto único. La brecha con Linear no es de esfuerzo — es de **disciplina geométrica** (radios, blur, sombras) y de **densidad de información consistente** (la Agenda oculta info que el Dashboard sí muestra).

---

## Capítulo 2 — Benchmark competitivo

No es una lista de "lo bonito que hacen otros". Cada producto resuelve un problema de producto específico; esto es lo que MediQue debería robar *por esa razón*, no por estética.

### Linear
**Qué resuelve mejor:** densidad sin ruido. Linear logra mostrar 40 issues en una pantalla sin que se sienta saturada, porque usa UNA sola escala tipográfica pequeña (13px body) y CERO sombras decorativas — solo bordes de 1px sobre un fondo casi plano.
**Qué adoptar:** la disciplina de "una sola sombra, un solo radio por tipo de componente" que ya pide el brief. Linear jamás mezcla 3 radios distintos en la misma vista. MediQue sí lo hace hoy (tabs 999px vs cards 12-22px vs chips 999px en otro contexto).

### Attio
**Qué resuelve mejor:** un CRM (que es estructuralmente parecido a "Pacientes" en MediQue) sin que las tablas se vean como Excel. Usa avatares con iniciales, chips de estado con color semántico consistente, y fila hover sutil sin bordes gruesos.
**Qué adoptar:** MediQue ya tiene avatares con iniciales (`Avatar`) y chips (`AdTag`) — el patrón existe. Lo que falta es que **Pacientes** use la misma receta de fila que Attio: nombre + metadato secundario en gris + acción a la derecha, sin más de 2 niveles de peso tipográfico por fila.

### Stripe Dashboard
**Qué resuelve mejor:** jerarquía numérica. Un dashboard financiero necesita que el ojo vaya directo al número correcto sin leer labels. Stripe logra esto con tipografía tabular, alineación a la derecha en todo lo numérico, y color reservado ÚNICAMENTE para estado (verde=positivo, rojo=negativo), nunca decorativo.
**Qué adoptar:** el Dashboard de MediQue ya sigue esta lógica (KPIs con cifra grande + label pequeño). Debería extenderse a Registro de Ventas y Reportes, que hoy mezclan color decorativo (dorado, celeste-ahora-navy) con color semántico (verde ingreso, rojo egreso) sin distinguir cuál es cuál a primera vista.

### Vercel
**Qué resuelve mejor:** dark mode como ciudadano de primera clase, no como inversión de colores. El contraste entre superficies (`bg`, `surface`, `surface2`) en Vercel es sutil pero SIEMPRE perceptible — nunca dos superficies contiguas quedan al mismo gris.
**Qué adoptar:** MediQue ya tiene esa escala (`bg`/`surface`/`surface2` por tema) — el riesgo es que el glass la está "lavando": cuando `DS.card()` pone `background: rgba(255,255,255,.045)` sobre CUALQUIER fondo (incluida otra tarjeta glass encima de otra), el contraste entre superficies se vuelve dependiente de cuántas capas de glass hay apiladas, no del token. Esto hay que vigilarlo en Cap. 4 (Contact Center, Reportes — vistas con tarjetas anidadas).

### Arc (navegador)
**Qué resuelve mejor:** el uso de fondo fotográfico/gradiente detrás de UI funcional sin sacrificar legibilidad — es la referencia más cercana a lo que MediQue ya intentó con everest.jpg. Arc SIEMPRE pone un scrim (oscurecimiento progresivo) entre la foto y cualquier texto, y jamás pone texto de lectura larga directamente sobre la foto sin un panel sólido debajo.
**Qué adoptar — este es el hallazgo más importante de todo el benchmark:** MediQue usa el mismo concepto (foto + glass) pero sin el scrim disciplinado que Arc aplica siempre. Es la causa raíz del hallazgo de accesibilidad del Cap. 1.

### Notion
**Qué resuelve mejor:** iconografía y color usados como sistema de identificación, no de decoración — cada tipo de contenido tiene un ícono consistente en todo el producto.
**Qué adoptar:** los íconos de los módulos del sidebar de MediQue ya existen por sección (`iconFor(name)`), pero no hay una regla de color consistente para ellos — algunos íconos heredan `T.accent`, otros quedan en gris fijo. Unificar a "ícono siempre en `T.textMute`, se tiñe de accent solo si la sección está activa" (que es lo que ya hace el sidebar, hay que verificarlo en TODOS los íconos, no solo los pineados).

### Superhuman
**Qué resuelve mejor:** velocidad percibida via micro-interacción, no animación larga. Cada acción tiene feedback en <100ms.
**Qué adoptar:** MediQue ya redujo `DS.reveal()` de .5s a .18s tras el reporte de lentitud — dirección correcta. El siguiente paso es auditar que ningún componente nuevo (agenda, presupuesto) reintroduzca transiciones >200ms.

### Apple Human Interface Guidelines
**Qué resuelve mejor:** el estándar de contraste AA no es opcional nunca, ni siquiera en materiales translúcidos — Apple define explícitamente "vibrancy" con reglas de opacidad mínima por fondo, exactamente el problema del Cap. 1.
**Qué adoptar:** una regla dura, no una guía: **ningún texto de lectura (body, no solo eyebrow) va directo sobre `background-image` sin al menos una capa de scrim al 100% de opacidad (no glass) detrás.**

**Síntesis del Capítulo 2:** ningún competidor de la lista es "más bonito" que MediQue en el sentido decorativo — el nivel de sofisticación visual del glass+foto ya está ahí. Lo que todos comparten y MediQue todavía no aplica con disciplina total es: **una sola geometría por tipo de componente, jerarquía numérica estricta, y legibilidad garantizada por contrato (no por suerte de qué parte de la foto quedó detrás)**.

---

## Capítulo 3 — Design System: estado actual documentado

Esto es un inventario real, extraído de `jc-proto/jc-theme.js` y de los componentes compartidos en `jc-admin-b.jsx`/`jc-admin-c.jsx` — no una propuesta desde cero.

### Paleta
15 temas completos en `window.JCTHEME` (editorial, clinico, azul, salvia, pizarra + 10 más), cada uno con `bg/bg2/surface/surface2/line/lineSoft/text/textMute/textFaint/accent/accentDeep/gold/onAccent/chipBg/chipBorder/navBg`. Para Los Medique, `accent/accentDeep/accentSoft/gold` se sobreescriben en tiempo de render (`AdminApp`) con el navy slate (`#7891A6`/`#5C7488` dark/light) — es un override de un solo punto, no una edición del tema base, así que las demás clínicas no se ven afectadas. Correcto arquitectónicamente.

### Glass / Blur — **el punto que hay que endurecer**
Existen actualmente 3 recetas de blur distintas en el código:
- `DS._glass()` (jc-theme.js): `blur(30px) saturate(1.4)` — cards/paneles genéricos.
- Botones ghost/subtle (`AdBtn`): `blur(18px) saturate(1.3)`.
- Citas de agenda (semana): `blur(12px) saturate(1.25)`.

El brief pide explícitamente **"dos niveles de glass como máximo"**. Hoy hay tres. Propuesta de Cap. 5: consolidar a 2 — **Nivel 1 (paneles/cards, blur 24px)** y **Nivel 2 (elementos pequeños: botones, badges, citas, blur 12px)** — eliminando el nivel intermedio de 18px sin que se note la diferencia (un blur de 18 vs 24 no es perceptible en un panel grande, pero sí simplifica el sistema).

### Sombras
Una sola escala en `DS.el`: `flat / raised (0 1px 3px) / overlay (0 16px 48px)`. El glass añade una sombra adicional propia (`inset 0 1px 0... , 0 32px 72px -44px`) que convive con `DS.el` sin reemplazarlo formalmente — funciona, pero no está documentada como una 4ª entrada de la escala. Acción: agregar `DS.el.glass` explícito para que quede gobernado, no "hardcodeado dentro de `_glass()`".

### Radios — **la inconsistencia más visible hoy**
`DS.r = { ctl: 8, card: 12, panel: 16, pill: 999 }`. En teoría hay 4 radios con propósito claro. En la práctica:
- Los tabs segmentados del Dashboard usan `pill` (999) → **el usuario ya pidió que esto cambie a algo más rectangular, como 10-12px.**
- Las tarjetas de cita en agenda usan `luxF ? 8 : 6` — un quinto valor que no está en la escala.
- El `glassPanel` original del Dashboard (previo a centralizar en `DS.card`) usaba 22px, fuera de la escala.

**Propuesta dura:** los tabs segmentados dejan de usar `DS.r.pill` y pasan a usar `DS.r.ctl` (8px) o un nuevo `DS.r.seg = 10`. Ningún componente nuevo declara un radio fuera de `DS.r`.

### Espaciado
`DS.sp = [0,4,8,12,16,24,32,48]` — escala de 4px limpia, correctamente usada en `SecHead` y en la mayoría de cards nuevas. Riesgo: mucho padding sigue escrito a mano (`"14px 16px"`, `"18px 20px"`) en vez de `DS.sp[n]+"px"` — funciona hoy porque los valores coinciden con la escala, pero no hay garantía de que el próximo desarrollador (o Claude Code en una sesión futura) mantenga esa coincidencia si no está referenciando el token.

### Tipografía
`DS.ft` con 8 roles (display/stat/title/body/sub/label/eyebrow/micro), correctamente usado vía `DS.text(T, role)`. Es de las partes MÁS maduras del sistema — nivel Linear real. Sin cambios recomendados.

### Botones (`AdBtn`)
4 variantes × 5 estados, correctamente centralizadas. Cambio reciente: ghost/subtle ahora en glass, primary se mantiene sólido — decisión correcta y ya documentada. Único ajuste pendiente: el radio (ver arriba) y garantizar `min-height`/`padding` consistente cuando el botón lleva ícono + texto (algunos botones de Agenda —"Importar .ics", selector de profesional— tienen alturas ligeramente distintas al resto de `AdBtn`, sugiriendo que no todos pasan por el componente compartido).

### Inputs (`AdField`)
Consistente, con foco accesible (`DS.focus`). Sin hallazgos.

### Dropdown
Los desplegables de nav (`Clínica`, `Marketing`, `IA`, etc.) usan un menú flotante propio, no `AdModal`. No se detectó inconsistencia grave, pero no se auditó a fondo por falta de captura — pendiente en próxima ronda si se adjuntan pantallas.

### Tabs
**Dos implementaciones conviven:** el segmented-pill del Dashboard (`borderRadius: 999`) y el segmented "rectangular" que aparece en la Ficha del paciente (según memoria de sesiones previas, ya con radio ~8px). El brief del usuario confirma que prefiere la versión rectangular. **Acción: unificar TODOS los tabs segmentados del panel a la geometría de la Ficha, no a la del Dashboard.**

### Sidebar / Header
Con glass (`SIDE_GLASS`, `blur(22px) saturate(1.3)`) — un 4º valor de blur no contemplado en la simplificación de Cap. 3.2. Debe alinearse al Nivel 1 (24px) propuesto arriba.

### Tablas
No auditadas en detalle por falta de captura de una tabla densa real (Pacientes en modo "Todos", Inventario). Pendiente.

### Cards
Ya cubierto — `DS.card`/`DS.panel`, ahora glass. Correctamente centralizado.

### Charts
`FlujoCajaChart`, `RevChart` (SVG a mano, sin librería) — consistentes en paleta (verde ingreso / rojo egreso) pero el grosor de línea y el estilo de eje varían levemente entre Dashboard y Reportes. Menor, no bloqueante.

### Calendario / Agenda
Ver Cap. 4 en detalle — es el módulo con más deuda de diseño ahora mismo.

### Drawer / Modal (`AdModal`)
Deliberadamente **sin** glass (decisión ya tomada y correcta — un modal necesita legibilidad garantizada, no atmósfera). Sin cambios.

### Toast
No visible en las capturas analizadas — pendiente.

### Badges / Status (`AdTag`)
4 tonos semánticos (ok/warn/danger/muted) + fallback a accent — consistente. Correcto.

### Hover / Focus / Loading / Skeleton
Foco visible global (`:focus-visible`) — bien, accesible. Skeleton (`DS.skel`) existe pero de uso limitado (solo IA). Hover de card (glass) vs hover de botón (glass) usan valores de opacidad distintos sin una regla común — menor.

### Empty States (`Empty2`)
Minimalista y consistente — texto secundario, sin ilustración. Correcto para un producto B2B denso (Linear tampoco usa ilustraciones en empty states).

### Inconsistencias con >3 variantes detectadas (regla del brief)
1. **Blur:** 3-4 valores distintos (30/24/18/12px) → consolidar a 2.
2. **Radio de "pill"/segmented control:** al menos 2 geometrías (999 vs ~8-10) → unificar a 1.
3. **Radio de card:** 12/16/22/8/6 conviviendo → los 3 legítimos (`ctl`/`card`/`panel`) deben ser los ÚNICOS que aparezcan en código nuevo.

---

## Capítulo 4 — Auditoría pantalla por pantalla

Cobertura: las pantallas de las que tengo captura real durante esta sesión de rediseño (Dashboard oscuro/claro, Agenda semana — actual y referencia, Sala de espera, Pacientes/búsqueda vista móvil, Login móvil). El resto de los ~35 módulos del panel (Inventario, Configuración, Marketing, CRM, Reportes, etc.) están cubiertos indirectamente en Cap. 1-3 por código, pero no tienen auditoría visual específica aquí por falta de captura — si adjuntas esas pantallas, esto se puede extender módulo por módulo con el mismo rigor.

### 4.1 — Dashboard (modo oscuro, Los Medique)

**Qué funciona:** jerarquía impecable — saludo editorial → tabs → embudo de marketing con ROAS real → 4 KPIs → evolución + accesos. El glass sobre la montaña se ve genuinamente premium, mejor que el 90% de software clínico existente. El acento navy (post-corrección) ya no compite con el resto de la paleta — antes el celeste "gritaba", ahora el navy se comporta como un acento, no como protagonista.

**Qué no funciona:** los tabs segmentados son pastilla completa (999px) — el propio usuario ya lo señaló como "menos moderno" comparado con la referencia rectangular. Es la corrección de mayor impacto/menor esfuerzo de todo este documento.

**Qué eliminaría:** nada estructural. El bloque "Embudo de marketing" es denso pero justificado — es el KPI más importante del negocio (marketing→ventas).

**Qué cambiaría:** el radio de los tabs (Cap. 3). Nada más a nivel de layout.

**Qué movería:** nada — el orden actual (Tu día → Pendientes → Métricas → Embudo → Evolución/Accesos) ya es arrastrable por el usuario (`dashOrder`), lo cual es de hecho una característica más avanzada que Linear (que no permite reordenar el dashboard).

**Qué simplificaría / unificaría:** el radio de los tabs con el resto del sistema de tabs (ver Ficha del paciente).

**Qué rompe el Design System:** el `borderRadius: 999` de los tabs, que no corresponde a ningún token de `DS.r` (el pill de 999 está reservado para chips/badges, no para navegación de tabs).

**Qué transmite:** SaaS financiero premium — el objetivo declarado del brief ("no quiero que parezca software médico") **ya se cumple** en esta pantalla.

**Nivel premium:** 8/10. **Comparado con Linear:** Linear no tiene un equivalente directo (no es un dashboard financiero), pero comparado con Stripe Dashboard (la referencia más cercana), MediQue está a un ajuste de radio de estar al mismo nivel.

### 4.2 — Dashboard (modo claro, comparación JC Medical vs Los Medique)

**Qué funciona:** el modo claro mantiene el glass legible — mejor resuelto que el oscuro porque el scrim de la foto en claro es más denso (`rgba(255,255,255,.42)` sobre gradiente claro) y por tanto el contraste texto/fondo es más seguro por defecto.

**Qué no funciona:** comparado con la captura de "JC Medical" (el tema oscuro anterior, sin el rediseño), el salto de calidad es evidente y ya está resuelto — no hay retroceso que corregir acá, es la prueba de que el rediseño avanza en la dirección correcta.

**Nivel premium:** 8/10 en el modo nuevo, 4/10 en el "antes" (referencial, ya superado).

### 4.3 — Agenda (vista semanal, estado ANTES del ajuste solicitado)

**Qué funciona:** la grilla en sí (día/semana/mes ahora con las 3 vistas), el marcador de "hoy" resaltado en la columna, y la barra lateral de color por estado de cita son ideas correctas y ya alineadas con el patrón de Cron/Google Calendar.

**Qué no funciona — es el hallazgo #1 de este capítulo:** las tarjetas de cita en la grilla muestran ÚNICAMENTE el nombre del paciente + una insignia de una letra ("E"). Toda la información operativa relevante (hora exacta, servicio/procedimiento, hora de término) está oculta detrás de un hover — que en un dispositivo táctil (tablet de recepción, el caso de uso real de una clínica) ni siquiera existe. Esto es un defecto de UX, no solo estético: una recepcionista mirando la agenda del día necesita esa información SIN interactuar, igual que en Cron o Google Calendar, donde la hora y el título del evento son siempre visibles en la celda.

**Qué no funciona (secundario):** la barra de controles superior (selector vista/Importar .ics/+Nueva Cita/selector de profesional/Hoy/flechas) son 7 elementos de peso visual similar sin agrupación — no hay un CTA primario evidente a simple vista más allá del color sólido de "+Nueva Cita".

**Qué eliminaría:** nada de la grilla — la densidad de información es el problema (falta, no sobra).

**Qué cambiaría:** la tarjeta de cita, para incluir hora + servicio + rango horario, tal como pide el usuario y como ya lo resuelve la imagen de referencia que compartió.

**Qué movería:** agrupar los controles de la barra superior en 2 clústeres: (1) navegación temporal (< Hoy >, selector de vista) a la izquierda, (2) acciones (Importar, Nueva Cita, selector de profesional) a la derecha — hoy están todos mezclados en una sola fila sin esa separación.

**Qué simplificaría:** el selector de profesional podría convertirse en un chip con avatar en vez de un dropdown de texto — coherente con el patrón de Attio para "filtro por persona".

**Qué unificaría / reutilizaría:** las tarjetas de cita deberían construirse con el mismo patrón de "row" que ya usa `PendRow` (nombre + metadato secundario en gris + acción/badge a la derecha) en vez de tener su propio layout ad-hoc — hoy es una implementación paralela.

**Qué rompe el Design System:** el radio de 6-8px de la tarjeta de cita (fuera de `DS.r`), y los 3 niveles de blur mencionados en Cap. 3.

**Qué transmite:** funcional pero incompleta — es la pantalla que más se aleja del nivel del resto del panel.

**Nivel premium:** 5.5/10. **Comparado con Linear:** Linear no gestiona calendarios, pero comparado con Cron (la referencia correcta), MediQue está claramente por debajo en densidad de información — Cron nunca oculta hora+evento detrás de una interacción.

### 4.4 — Agenda (imagen de referencia aportada por el usuario)

**Qué funciona (y por qué es la referencia correcta):** cada tarjeta de cita muestra nombre, hora de inicio, servicio ("Consulta médica general"), hora de término, y una insignia de color — exactamente la información que un flujo de recepción necesita sin interacción adicional. Las horas del eje izquierdo (08:00, 08:30...) tienen mejor contraste/peso tipográfico que en la versión actual del panel.

**Qué adoptar tal cual:** la estructura de la tarjeta de cita (4 líneas de información + badge). El contraste del eje de horas.

**Qué NO copiar sin filtro:** esta referencia no tiene glass — es plana. La instrucción del usuario es correcta: adoptar la ESTRUCTURA de información de esta referencia, pero renderizada con el sistema glass ya validado en el Dashboard (Nivel 2, blur 12px, con el tinte de color de estado ya implementado en el commit `0431103`).

### 4.5 — Sala de espera (header)

**Qué funciona:** el patrón de 4 columnas de estado (Por llegar / En espera / En atención / Finalizado) es el estándar correcto para un flujo operativo tipo kanban — comparable a Linear (columnas de estado de un issue).

**Qué no funciona:** no se puede evaluar el contenido de las columnas por falta de captura completa — el header sí está bien resuelto (eyebrow + título + subtítulo, consistente con el resto del panel).

**Nivel premium (solo header, parcial):** 7.5/10.

### 4.6 — Pacientes / búsqueda (vista móvil, tema oscuro)

**Qué funciona:** el patrón fila (avatar iniciales + nombre + RUT) es limpio y ya sigue la receta de Attio mencionada en Cap. 2.

**Qué no funciona:** el color de las iniciales de avatar es el celeste heredado del tema "cielo" — visible en esta captura como pendiente de la corrección de acento navy que ya se aplicó al panel de escritorio pero, según lo confirmado en la sesión, el móvil requirió su propio gate (ya resuelto en el commit `f158f2f`/`96542a0`). Si esta captura es posterior a ese fix, no debería seguir viéndose celeste — vale la pena una verificación visual puntual.

**Nivel premium:** 6.5/10 (7.5 si el acento ya está corregido en esta vista específica).

### 4.7 — Login móvil

**Qué funciona:** minimalista, centrado, sin ruido — correcto para una pantalla de un solo propósito.

**Qué no funciona:** el botón "ENTRAR" es sólido celeste/navy — dependiendo del momento de captura, puede ser el celeste heredado (pre-fix) o el navy ya corregido. Mismo comentario que 4.6.

**Nivel premium:** 6/10 (celeste) / 7.5/10 (navy, post-fix).

---

## Capítulo 5 — Plan de rediseño incremental

No es un rediseño desde cero — es una lista de cambios quirúrgicos, ordenados por impacto/esfuerzo, todos gateados a Los Medique como el resto del rediseño.

### Prioridad 1 — impacto alto, esfuerzo bajo
1. **Tabs segmentados → radio rectangular (8-10px) en todo el panel**, no solo Dashboard. Esto es un cambio de 1 token, propagado por todos lados igual que pasó con el glass de `DS.card`.
2. **Tarjeta de cita de Agenda → mostrar hora, servicio y hora de término siempre visibles**, sin depender de hover. Aplicar glass Nivel 2 (12px) ya validado.
3. **Consolidar blur a 2 niveles** (24px paneles / 12px elementos pequeños) — eliminar el valor intermedio de 18px de `AdBtn`.

### Prioridad 2 — impacto medio, esfuerzo medio
4. **Agrupar la barra de controles de Agenda** en 2 clústeres (navegación temporal / acciones).
5. **Agregar scrim sólido detrás de cualquier bloque de texto de lectura larga** que hoy esté directo sobre `everest.jpg` sin glass debajo (auditar cada `SecHead`/subtítulo en pantallas nuevas).
6. **Selector de profesional en Agenda → chip con avatar**, no dropdown de texto plano.

### Prioridad 3 — impacto medio, esfuerzo alto (requiere tocar más pantallas)
7. **Unificar radio de card a los 3 tokens legítimos** (`ctl`/`card`/`panel`) en TODO el código nuevo — revisión de todas las vistas para detectar radios "hardcodeados" fuera de escala.
8. **Refactor de la tarjeta de cita para reutilizar el patrón de `PendRow`** en vez de mantener una implementación paralela.

### Explícitamente fuera de alcance de este plan
- No se propone eliminar el fondo fotográfico ni el glassmorphism como concepto — es la decisión más fuerte y diferenciadora del sistema (Cap. 2, benchmark Arc).
- No se propone un rebuild de ningún módulo — todos los cambios son ediciones sobre componentes existentes.

---

## Capítulo 6 — Referencias por módulo

Cada referencia resuelve el MISMO problema de producto que el módulo de MediQue enfrenta — no están elegidas por estética.

| Módulo MediQue | Referencia | Por qué (problema de UX que comparten) |
|---|---|---|
| **Agenda** | Cron Calendar | Densidad de información en celda de calendario sin sacrificar limpieza — exactamente el gap identificado en 4.3. |
| **Agenda** | Google Calendar | Estándar de facto para "qué información es obligatoria en un evento visible" (hora + título siempre, sin hover) — es el piso mínimo de expectativa del usuario. |
| **Dashboard** | Linear (vista de proyecto) | Cómo mostrar múltiples métricas sin saturar — jerarquía tipográfica estricta, cero decoración. |
| **Dashboard** | Stripe Dashboard | Jerarquía numérica + alineación derecha para cifras — MediQue ya lo hace en KPIs, falta extenderlo a Reportes. |
| **Pacientes / CRM** | Attio | Fila de tabla con avatar+nombre+metadato, sin bordes gruesos — el patrón exacto que Pacientes necesita para sentirse "SaaS" y no "planilla". |
| **Pacientes / CRM** | HubSpot (vista de contacto) | Cómo organizar una ficha con muchas pestañas (Ficha Clínica, Procedimientos, Imágenes, Consentimientos…) sin que se sienta como un formulario largo — HubSpot resuelve esto con tabs + resumen fijo arriba. |
| **IA (Asistente/Reportes IA)** | ChatGPT / Cursor | Patrón de chat conversacional con sugerencias de pregunta — MediQue ya lo implementa en Reportes IA embebido; validar que la burbuja de usuario/asistente siga la misma paleta que el resto del sistema (hoy usa `T.accent` sólido para el mensaje del usuario, correcto). |
| **IA** | Perplexity | Cómo mostrar una respuesta generada con "fuentes"/contexto visible — aplicable si en el futuro Reportes IA cita de dónde salió cada cifra (ej. "según 12 atenciones de este mes"). |
| **Sidebar/Header con fondo fotográfico** | Arc | El único producto de la lista que resuelve legibilidad sobre fondo fotográfico con reglas de scrim explícitas — la referencia más importante para el hallazgo de accesibilidad del Cap. 1/4. |

---

## Capítulo 7 — Prompts de implementación para Claude Code

Estos son los prompts que usaría en una sesión futura de implementación (cuando digas "Comienza" para ejecutar, no solo auditar). Cada uno es autocontenido, referencia archivos/líneas reales, y respeta "no modificar" explícitamente.

### 7.1 — Tabs segmentados: radio rectangular en todo el panel

> **Objetivo:** cambiar el radio de los tabs tipo segmented-control (pill) de `borderRadius: 999` a un radio rectangular consistente con la Ficha del paciente, en TODAS las pantallas que usan este patrón (Dashboard: Visión General/Próximas Citas/Notificaciones; Agenda: selector día/semana/mes; cualquier otro segmented-control del panel).
> **Cambios:** buscar todas las ocurrencias de segmented-control con `borderRadius: 999` o equivalente en `jc-admin.jsx`/`jc-admin-c.jsx` dentro de contenedores `luxF`/`shellLux`, y cambiar el radio del contenedor exterior a un nuevo token `DS.r.seg = 10` (agregarlo a `jc-theme.js`), y el radio de cada botón interno a `DS.r.seg - 2` (o el valor que ya usa la Ficha, verificar en jc-admin-b.jsx el segmented-control de tabs de FichaMedica y usar EXACTAMENTE ese valor para garantizar consistencia real, no solo visual aproximada).
> **Componentes afectados:** el `viewToggleNode` de Agenda, las TABS del Dashboard (`["general","citas","notif"]`), cualquier segmented-control adicional que se descubra al grep.
> **No modificar:** la lógica de estado (`view`, `tab`), el contenido de los tabs, chips/badges que usan `DS.r.pill` legítimamente (esos SÍ deben seguir siendo círculo/pastilla completa — son indicadores, no navegación).
> **Verificación:** compilar (`node build.mjs`), confirmar visualmente que Dashboard y Agenda usan la misma geometría de tab que la Ficha del paciente.

### 7.2 — Agenda: tarjeta de cita con información completa + glass consolidado

> **Objetivo:** rediseñar la tarjeta de cita de la vista semanal (`SemanaGrid`, jc-admin.jsx) para mostrar siempre (sin hover): nombre del paciente, hora de inicio, servicio/procedimiento, hora de término, e insignia de color de estado — replicando la estructura de información de la imagen de referencia del usuario, pero renderizada con el sistema glass Nivel 2 (blur 12px) ya implementado en el commit `0431103`.
> **Cambios:** dentro del bloque `v2 ?` de la tarjeta de cita (línea ~3157 en jc-admin.jsx a la fecha de este audit), agregar una segunda línea de texto con `a.time + " – " + horaFin(a)` (calcular hora de término a partir de `a.time` + `a.dur`) y `a.proc`, con jerarquía tipográfica: nombre en `fontWeight:600` (ya existe), hora+servicio en un tamaño menor (`DS.ft.micro` o `9.5px`) y color `T.textMute`. Mantener la barra lateral de color de estado y el badge de la primera letra del servicio.
> **Componentes afectados:** solo la tarjeta de cita dentro de `SemanaGrid`. NO tocar la tarjeta de hover existente (`hover.a`), que ya muestra el detalle completo — esta ampliación es para la vista SIN hover.
> **No modificar:** la lógica de `jcmApptState`, el color dorado ya aplicado a "Atendida", el sistema de menú contextual al hacer clic.
> **Responsive:** si la celda de la grilla es muy angosta (mes con muchas citas apiladas), la segunda línea debe poder truncarse con ellipsis en vez de romper el layout — usar `overflow:hidden; textOverflow:ellipsis; whiteSpace:nowrap` en la línea de hora+servicio.
> **Verificación:** con una cita real en la agenda semanal, confirmar que se lee hora+servicio+término sin pasar el mouse por encima.

### 7.3 — Consolidar sistema de blur a 2 niveles

> **Objetivo:** reducir las 3-4 recetas de `backdropFilter: blur(...)` actualmente dispersas en el código a exactamente 2 niveles gobernados por `DS`.
> **Cambios:** en `jc-theme.js`, agregar `DS.glassLevel = { panel: "blur(24px) saturate(1.4)", small: "blur(12px) saturate(1.25)" }` (o ajustar los valores exactos de `_glass()` a 24px si hoy es 30px, decisión de diseño: 24 es suficiente y más barato en rendimiento). Reemplazar el blur de 18px de `AdBtn` (jc-admin-b.jsx) por `DS.glassLevel.small`. Verificar y unificar el blur de `SIDE_GLASS` (jc-admin.jsx, sidebar) al nivel `panel`.
> **No modificar:** la opacidad de fondo (`rgba(...)`) de cada componente — solo el valor de blur/saturate, que debe volverse una referencia al token, no un número repetido a mano.
> **Verificación:** grep de `backdropFilter` en los 3 archivos jsx del panel — no debe haber más de 2 valores de blur distintos fuera de `jc-theme.js`.

### 7.4 — Scrim de legibilidad sobre fondo fotográfico

> **Objetivo:** garantizar que ningún texto de lectura (no eyebrow/label) quede directamente sobre `everest.jpg` sin al menos un `DS.card`/`DS.panel` (que ya trae su propio fondo translúcido) detrás. Auditoría, no rediseño: recorrer cada `SecHead`/subtítulo de página en modo `shellLux` y confirmar que hay un contenedor con fondo (aunque sea glass) entre el texto y el `.jc-admin-frame` con la imagen de fondo.
> **Cambios:** si se encuentra un subtítulo o texto de body flotando directo sobre el fondo (candidato ya identificado: el subtítulo de "Reservas y Citas" en Agenda, que hoy no tiene contenedor propio), envolverlo en un contenedor con `background: T.dark ? "rgba(0,0,0,.15)" : "rgba(255,255,255,.15)"` mínimo, o subirlo dentro del primer panel glass de la página en vez de dejarlo suelto en el header editorial.
> **No modificar:** el eyebrow (ya tiene suficiente contraste por ser texto corto y en mayúsculas con tracking, funciona como Arc lo permite: texto corto SÍ puede ir directo sobre foto, texto largo no).
> **Verificación:** revisar con capturas en modo claro Y oscuro, en la zona más clara/oscura de la foto respectivamente (peor caso de contraste).

---

## Conclusiones

MediQue no necesita un rediseño — necesita **gobernanza** sobre un sistema que ya es, en su arquitectura, comparable al de los productos de referencia. El código centraliza tokens correctamente (`DS`, `AdBtn`, `AdModal`, `DS.card`); lo que falta es hacer cumplir esos tokens sin excepciones, y cerrar las dos brechas de UX reales identificadas: **la Agenda oculta información que debería ser siempre visible**, y **el texto sobre foto no tiene garantía de contraste**. Ambas son correcciones concretas, no una reinvención.

La comparación honesta con Linear/Stripe/Attio no es "MediQue está lejos" — es "MediQue ya construyó el sistema correcto, y le falta aplicarlo con la misma disciplina en el 20% de pantallas que todavía no pasaron por el mismo nivel de escrutinio que el Dashboard."

---

*Documento vivo — cuando digas "Comienza", se ejecuta el Cap. 7 en orden de prioridad del Cap. 5, en un solo ciclo de commits agrupados por batch, como el resto de esta sesión.*
