# Brief de diseño — Medique (panel clínico SaaS)
### Contexto para generar un prompt maestro de refinamiento visual con Fable

> **Objetivo:** subir la línea visual del panel a nivel "SaaS top mundial" **evolucionando** el sistema actual (no reescribiéndolo). Prioridad: consistencia de ritmo, densidad bien resuelta, estados reales (vacío/carga/error) y microinteracciones. No agregar decoración por decorar.

---

## 1. Producto

- **Qué es:** Medique — SaaS multi-tenant para clínicas de **medicina estética** (agenda, ficha clínica, ventas/caja, marketing, IA, cumplimiento legal chileno Ley 20.584). Producto en venta a clínicas; el tenant piloto es "Los Medique" / JC Medical (Talca, Chile).
- **Superficies:** (1) **Panel de escritorio** `JC_Admin.html` (el foco de este rediseño), (2) **Panel móvil** `JC_Mobile.html`, (3) **App del paciente** `JC_App.html`, (4) **Landing/marketing** (`medique-home`, `marfil-home`, catálogo), (5) **Reserva pública** (`agendar`).
- **Usuario del panel:** dueña/o de clínica y profesionales (uso diario intensivo, escritorio, español de Chile).

---

## 2. Stack y constraints técnicos ⚠️ (leer con atención)

**NO es Next / Supabase / Tailwind.** El stack real:

- **React 18 vía UMD** (script global, sin framework). **Sin JSX en runtime:** el `.jsx` se **precompila con esbuild** (`node build.mjs`) a `dist/*.js`. El HTML carga los bundles con `?v=N` para cache-busting.
- **Estilado 100% inline** mediante un objeto de tokens `T` (`style={{ ... }}`). **No hay Tailwind, ni CSS classes, ni `className`, ni CSS Modules.** Todo color/tipografía/espaciado sale de `T`.
- **Temas:** objeto global `window.JCTHEME` con **15 paletas** (claras y oscuras) que comparten la misma estructura de tokens. El componente raíz hace `const T = JCTHEME[themeKey]`. Cualquier propuesta visual **debe funcionar con cualquier tema** (no hardcodear hex; usar `T.*`).
- **Datos:** Firebase/Firestore + `localStorage` vía `window.DB.get/set` (límite 1MB/doc). **No Supabase, no Prisma, no REST propia de datos.**
- **Backend:** funciones serverless en `api/*.js` (Node en Vercel). **Límite del plan Hobby: máx. 12 funciones** por deploy.
- **Deploy:** `git push` → Vercel. Dominios: `portal.medique.cl` (panel), `movil.medique.cl`, `medique.cl` (marketing).
- **Regla de oro de código:** cualquier componente/patrón que proponga Fable debe entregarse como **React + estilos inline con tokens `T`**, listo para pegar en un `.jsx` que compila con esbuild. Nada de dependencias nuevas de UI (no shadcn, no MUI, no styled-components) salvo que se justifique y sea vendored.

---

## 3. Design system vigente

### Tokens de color (estructura idéntica en los 15 temas)
Cada tema expone: `bg, bg2, surface, surface2, line, lineSoft, text, textMute, textFaint, accent, accentDeep, accentSoft, gold, onAccent, chipBg, chipBorder, navBg, primaryBg, primaryText, shadow, dark`.

**Tema marca "Marfil Clínico" (claro, default de marca):**
```
bg #F5F2EC · bg2 #ECE8DF · surface #FFFFFF · surface2 #F3EFE8
text #1A1A14 · textMute #5C5A50 · textFaint rgba(26,26,20,.42)
line rgba(20,20,15,.12) · lineSoft rgba(20,20,15,.06)
accent #54707F (pizarra) · accentDeep #3F5663 · accentSoft rgba(84,112,127,.12)
gold/silver #8A929B · onAccent #FFF · shadow 0 18px 50px -22px rgba(40,38,30,.4)
```
**Tema "Editorial" (oscuro, actual default del panel):**
```
bg #0D0D0D · surface #141414 · surface2 #1B1B1B
text #F2EDE6 · textMute rgba(242,237,230,.52) · accent #8B9EB0 · gold #B9C2CB
```
> Nota: hay una **incoherencia de marca** — la identidad es Marfil claro, pero el panel arranca en Editorial oscuro. Definir postura (default claro Marfil vs. oscuro) es parte del encargo.

### Tipografía
```
serif  'Marcellus', Georgia, serif            → títulos H1–H3, nombres de tratamiento
ital   'Cormorant Garamond', Georgia, serif   → énfasis editorial (flourish), no UI
sans   'Jost', -apple-system, ...             → todo el texto funcional (body, labels, botones)
```
Reglas: eyebrows/labels en `letter-spacing:.16–.3em; text-transform:uppercase; 9–11px`. Títulos de sección Marcellus 400. Pesos de Jost: 300/400/500/600.

### Spacing / layout
- Radios: tarjetas `10–14px`, pills/chips `999px`, **botón primario `4px`** (cuadrado, editorial).
- Ease global: `cubic-bezier(.22,1,.36,1)` (expo-out).
- Gaps de sección `12–16px`; padding horizontal `16–20px`.
- Sombra tarjeta: `0 10px 30px -20px rgba(40,38,30,.35)` / `T.shadow`.

### Componentes base (reutilizar, no reinventar)
`AdBtn` (primary/ghost/small), `AdModal`, `AdField`, `AdSwitch`, `SecHead` (cabecera de sección con eyebrow), `CajaCard` (KPI), `Avatar`, `AdminKeyModal` (confirmación con clave de admin), `Empty2` (estado vacío), `Row`/`ToggleRow`/`ClinCard`, `MiniCalendar`, `FichaZoneMap` (mapa SVG facial/corporal), `FlujoCajaChart`, `JC-Sign` (firma). Iconos: **SVG inline** (stroke, 1.6–1.8), no icon-font.

### Motion
Reveal `opacity 0→1 + translateY(26→0)` ~0.8s; hero `heroRise`; siempre con `@media (prefers-reduced-motion: reduce)`.

---

## 4. Inventario de pantallas / rutas clave (panel)

**Navegación superior (pestañas fijas + grupos desplegables):**
- Fijas: **Dashboard · Agenda · Pacientes · Sala de espera · Pendientes · Registro de Ventas · Inventario · Tratamientos · Equipo · Sucursales**
- Grupos: **Marketing** (Difusiones, CRM/Embudo, Automatizaciones, Integraciones) · **IA** (Asistente IA, Resumen Clínico, Notas Clínicas, Reportes IA, Contralor IA, Contact Center + Copilot flotante) · **Análisis** (Reportes, Panel de desempeño, Encuestas, Flujo de caja) · **Herramientas** · **Sistema** (Configuración, Tutoriales, Administración, Laboratorios, Convenios, Remuneraciones, Pagos y Gastos, Pagos online, Boletas, Chat interno)

**Ficha del paciente (pestañas):** Ficha Clínica · Mapa facial y antropometría · Procedimientos · Imágenes · Exámenes · Consentimientos · Receta/Indicaciones · Presupuesto · Atenciones · Campaña · Notas · Resumen IA · Auditoría IA.

**Pantallas faro sugeridas para el rediseño (north-star):** **Dashboard**, **Ficha del paciente**, **Agenda** (vista semana + popup de cita). Son las de mayor uso y las que fijan el listón.

---

## 5. Puntos de dolor visuales actuales

1. **Densidad inconsistente:** conviven vistas muy densas (Agenda, Registro de Ventas) con otras vacías; falta un sistema de densidad coherente.
2. **Tokens vs. valores ad-hoc:** hay tamaños de fuente (10.5/11.5/12.5/13) y gaps (6/10/12/14/16) sembrados a mano; falta una **escala tipográfica y de espaciado estricta**.
3. **Estados de interacción parciales:** al ser estilos inline, muchos elementos no tienen `hover/focus/active` sistemáticos ni foco accesible visible.
4. **Estados vacío/carga/error irregulares:** algunos usan `Empty2`, otros no; casi no hay skeletons de carga.
5. **Patrón "fila de KPIs" repetido** y a veces redundante con el Dashboard.
6. **Identidad dividida:** marca Marfil claro vs. panel Editorial oscuro; el acento pizarra `#54707F` es discreto y el sistema se siente monocromo.
7. **Listas/tablas planas:** filas simples sin jerarquía fuerte, sin zebra ni agrupación visual.
8. **Navegación muy cargada** (muchas pestañas + dropdowns): oportunidad de jerarquía/estructura.
9. **Tarjetas por todos lados** como respuesta por defecto; falta variedad de superficies.

---

## 6. Qué pedirle a Fable (para acotar el prompt maestro)

- **Entregable:** (a) un **"visual language upgrade"** expresado como refinamiento de los tokens `T` y de los componentes base (`AdBtn`, `CajaCard`, `SecHead`, tablas, chips, modales) — **sin cambiar la estructura de tokens** para no romper los 15 temas; (b) el **rediseño de 3 pantallas faro** (Dashboard, Ficha, Agenda) a ese nuevo listón, en **React + estilos inline con `T`**, listo para compilar con esbuild.
- **Reglas de oro:** usar SIEMPRE `T.*` (nunca hex fijos); funcionar en tema claro y oscuro; sin Tailwind/Next/Supabase/dependencias nuevas; iconos SVG inline; incluir estados hover/focus accesibles, vacío/carga/error, y `prefers-reduced-motion`.
- **Norte estético:** lujo clínico sobrio y editorial (Marcellus + Jost), plateado/pizarra como acentos, mucho aire, jerarquía tipográfica fuerte, microinteracciones discretas. Referencia de listón: Linear, Stripe, Vercel, Arc — pero con alma editorial-clínica, no "SaaS-cream" genérico.
- **No hacer:** reescritura total, migración de framework, cambiar el modelo de datos, romper la conmutación de temas, ni proponer un stack distinto.

---

*Archivo generado como contexto para el prompt maestro de Fable. Stack verificado contra el código a 2026-07-01.*
