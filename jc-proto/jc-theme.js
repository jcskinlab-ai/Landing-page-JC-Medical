/* ═══════════════ JC MEDICAL · TEMAS VISUALES ═══════════════ */
/* Dos direcciones: "editorial" (oscuro fiel a la marca) y "clinico" (claro premium) */
(function () {
  var serif = "'Marcellus', Georgia, serif";              // títulos (Marcellus, elegante)
  var ital = "'Cormorant Garamond', Georgia, serif";       // énfasis itálico (flourish)
  var sans = "'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  var ease = "cubic-bezier(.22,1,.36,1)";

  var editorial = {
    key: "editorial",
    name: "Editorial",
    bg: "#0D0D0D",
    bg2: "#0A0A0A",
    surface: "#141414",
    surface2: "#1B1B1B",
    line: "rgba(242,237,230,.13)",
    lineSoft: "rgba(242,237,230,.07)",
    text: "#F2EDE6",
    textMute: "rgba(242,237,230,.52)",
    textFaint: "rgba(242,237,230,.32)",
    accent: "#8B9EB0",
    accentDeep: "#6A8296",
    gold: "#B9C2CB",
    onAccent: "#0D0D0D",
    chipBg: "rgba(242,237,230,.06)",
    chipBorder: "rgba(242,237,230,.18)",
    navBg: "rgba(13,13,13,.92)",
    primaryBg: "#F2EDE6",
    primaryText: "#0D0D0D",
    logo: "assets/logo-jc-mark-white.png",
    logoLock: "assets/logo-jc-lockup-white.png",
    shadow: "0 20px 60px -24px rgba(0,0,0,.7)",
    serif: serif, ital: ital, sans: sans, ease: ease, dark: true
  };

  // ── "Marfil Clínico" — lujo claro, limpio, clínico-premium (tokens fieles al prototipo) ──
  var clinico = {
    key: "clinico",
    name: "Marfil Clínico",
    bg: "#F5F2EC",
    bg2: "#ECE8DF",
    surface: "#FFFFFF",
    surface2: "#F3EFE8",
    line: "rgba(20,20,15,.12)",
    lineSoft: "rgba(20,20,15,.06)",
    text: "#1A1A14",
    textMute: "#5C5A50",
    textFaint: "rgba(26,26,20,.42)",
    accent: "#54707F",
    accentDeep: "#3F5663",
    accentSoft: "rgba(84,112,127,.12)",
    gold: "#8A929B",              // SILVER / plateado neutro (línea visual del cliente) — detalles finos
    onAccent: "#FFFFFF",
    chipBg: "rgba(20,20,15,.04)",
    chipBorder: "rgba(20,20,15,.12)",
    navBg: "rgba(245,242,236,.86)",
    primaryBg: "#1A1A14",
    primaryText: "#F5F2EC",
    logo: "assets/logo-jc-mark-navy.png",
    logoLock: "assets/logo-jc-lockup-navy.png",
    shadow: "0 18px 50px -22px rgba(40,38,30,.4)",
    serif: serif, ital: ital, sans: sans, ease: ease, dark: false
  };

  // ── Paletas clínicas adicionales ──
  var azul = {
    key: "azul", name: "Clínico azul",
    bg: "#0E1620", bg2: "#0A1019", surface: "#16212E", surface2: "#1E2B3A",
    line: "rgba(220,235,245,.13)", lineSoft: "rgba(220,235,245,.07)",
    text: "#EAF1F7", textMute: "rgba(234,241,247,.56)", textFaint: "rgba(234,241,247,.34)",
    accent: "#4FB0C6", accentDeep: "#2F8DA3", gold: "#AEB6BF", onAccent: "#08121A",
    chipBg: "rgba(220,235,245,.06)", chipBorder: "rgba(220,235,245,.18)",
    navBg: "rgba(14,22,32,.92)", primaryBg: "#EAF1F7", primaryText: "#0E1620",
    logo: "assets/logo-jc-mark-white.png", logoLock: "assets/logo-jc-lockup-white.png",
    shadow: "0 20px 60px -24px rgba(0,0,0,.6)", serif: serif, ital: ital, sans: sans, ease: ease, dark: true
  };
  var salvia = {
    key: "salvia", name: "Salvia clínica",
    bg: "#F1F4F1", bg2: "#E5EBE4", surface: "#FFFFFF", surface2: "#EAF0EA",
    line: "rgba(20,32,26,.13)", lineSoft: "rgba(20,32,26,.06)",
    text: "#18241E", textMute: "#55655B", textFaint: "rgba(24,36,30,.4)",
    accent: "#4E8A72", accentDeep: "#3B6C58", gold: "#8FA0A8", onAccent: "#FFFFFF",
    chipBg: "rgba(20,32,26,.04)", chipBorder: "rgba(20,32,26,.15)",
    navBg: "rgba(255,255,255,.93)", primaryBg: "#18241E", primaryText: "#F1F4F1",
    logo: "assets/logo-jc-mark-navy.png", logoLock: "assets/logo-jc-lockup-navy.png",
    shadow: "0 18px 50px -22px rgba(30,50,40,.28)", serif: serif, ital: ital, sans: sans, ease: ease, dark: false
  };
  var pizarra = {
    key: "pizarra", name: "Pizarra cálida",
    bg: "#1B1E22", bg2: "#15181B", surface: "#23272C", surface2: "#2C3138",
    line: "rgba(240,236,228,.12)", lineSoft: "rgba(240,236,228,.06)",
    text: "#EFEBE3", textMute: "rgba(239,235,227,.55)", textFaint: "rgba(239,235,227,.33)",
    accent: "#A6AEB7", accentDeep: "#7E868F", gold: "#A6AEB7", onAccent: "#1B1E22",
    chipBg: "rgba(240,236,228,.06)", chipBorder: "rgba(240,236,228,.16)",
    navBg: "rgba(27,30,34,.92)", primaryBg: "#EFEBE3", primaryText: "#1B1E22",
    logo: "assets/logo-jc-mark-white.png", logoLock: "assets/logo-jc-lockup-white.png",
    shadow: "0 20px 60px -24px rgba(0,0,0,.55)", serif: serif, ital: ital, sans: sans, ease: ease, dark: true
  };

  window.JCTHEME = { editorial: editorial, clinico: clinico, azul: azul, salvia: salvia, pizarra: pizarra };

  // ── 10 paletas clínicas adicionales ──
  function mk(o) { return Object.assign({ gold: o.accent, onAccent: o.dark ? "#0b0f14" : "#ffffff", chipBg: o.dark ? "rgba(255,255,255,.06)" : "rgba(20,25,30,.04)", chipBorder: o.dark ? "rgba(255,255,255,.16)" : "rgba(20,25,30,.14)", lineSoft: o.dark ? "rgba(255,255,255,.06)" : "rgba(20,25,30,.06)", primaryBg: o.text, primaryText: o.bg, logo: o.dark ? "assets/logo-jc-mark-white.png" : "assets/logo-jc-mark-navy.png", logoLock: o.dark ? "assets/logo-jc-lockup-white.png" : "assets/logo-jc-lockup-navy.png", shadow: "0 20px 56px -24px rgba(0,0,0,.5)", serif: serif, ital: ital, sans: sans, ease: ease }, o); }
  var extra = {
    cielo:    mk({ key: "cielo",    name: "Cielo clínico",     dark: false, bg: "#EEF3F7", bg2: "#E1E9F0", surface: "#FFFFFF", surface2: "#E9F0F6", line: "rgba(20,40,60,.12)", text: "#13242F", textMute: "#52646F", textFaint: "rgba(19,36,47,.4)", accent: "#2E7FB0", accentDeep: "#246389", navBg: "rgba(255,255,255,.93)" }),
    menta:    mk({ key: "menta",    name: "Menta fresca",      dark: false, bg: "#EDF5F2", bg2: "#DFECE7", surface: "#FFFFFF", surface2: "#E6F1ED", line: "rgba(15,45,38,.12)", text: "#10241E", textMute: "#4F655E", textFaint: "rgba(16,36,30,.4)", accent: "#0FA47F", accentDeep: "#0B7D60", navBg: "rgba(255,255,255,.93)" }),
    perla:    mk({ key: "perla",    name: "Perla neutra",      dark: false, bg: "#F4F4F2", bg2: "#E8E8E4", surface: "#FFFFFF", surface2: "#EDEDE9", line: "rgba(30,30,28,.12)", text: "#1E1E1C", textMute: "#5C5C58", textFaint: "rgba(30,30,28,.4)", accent: "#7C6FB0", accentDeep: "#5F539A", navBg: "rgba(255,255,255,.93)" }),
    arena:    mk({ key: "arena",    name: "Arena cálida",      dark: false, bg: "#F5F1EA", bg2: "#EAE3D7", surface: "#FFFFFF", surface2: "#F0EAE0", line: "rgba(50,40,25,.12)", text: "#2A2218", textMute: "#6A5E4C", textFaint: "rgba(42,34,24,.4)", accent: "#C08A3E", accentDeep: "#9C6E2C", navBg: "rgba(255,255,255,.93)" }),
    rosa:     mk({ key: "rosa",     name: "Rosa clínico",      dark: false, bg: "#F6F0F1", bg2: "#EBE0E3", surface: "#FFFFFF", surface2: "#F1E8EA", line: "rgba(50,25,32,.12)", text: "#2A1B20", textMute: "#6B5358", textFaint: "rgba(42,27,32,.4)", accent: "#B5566E", accentDeep: "#94405A", navBg: "rgba(255,255,255,.93)" }),
    medianoche: mk({ key: "medianoche", name: "Azul medianoche", dark: true, bg: "#0C1322", bg2: "#080E1A", surface: "#141F33", surface2: "#1C2A42", line: "rgba(210,225,250,.13)", text: "#E6EDFA", textMute: "rgba(230,237,250,.56)", textFaint: "rgba(230,237,250,.32)", accent: "#5B8DEF", accentDeep: "#3D6FD4", navBg: "rgba(12,19,34,.92)" }),
    esmeralda: mk({ key: "esmeralda", name: "Esmeralda",        dark: true, bg: "#0B1714", bg2: "#07110E", surface: "#12241F", surface2: "#193029", line: "rgba(215,245,235,.13)", text: "#E6F4EF", textMute: "rgba(230,244,239,.55)", textFaint: "rgba(230,244,239,.32)", accent: "#37B98A", accentDeep: "#239A70", navBg: "rgba(11,23,20,.92)" }),
    grafito:  mk({ key: "grafito",  name: "Grafito frío",      dark: true, bg: "#16191D", bg2: "#101316", surface: "#1E2227", surface2: "#272C33", line: "rgba(225,232,240,.12)", text: "#E7ECF1", textMute: "rgba(231,236,241,.55)", textFaint: "rgba(231,236,241,.32)", accent: "#6FA8C7", accentDeep: "#4E87A6", navBg: "rgba(22,25,29,.92)" }),
    vinotinto: mk({ key: "vinotinto", name: "Vino & carbón",    dark: true, bg: "#17110F", bg2: "#110C0A", surface: "#221917", surface2: "#2C201D", line: "rgba(245,230,225,.12)", text: "#F3E9E5", textMute: "rgba(243,233,229,.55)", textFaint: "rgba(243,233,229,.32)", accent: "#C0566B", accentDeep: "#9E3F53", navBg: "rgba(23,17,15,.92)" }),
    lavanda:  mk({ key: "lavanda",  name: "Lavanda nocturna",  dark: true, bg: "#15131F", bg2: "#100E19", surface: "#1F1C2C", surface2: "#282438", line: "rgba(232,228,248,.12)", text: "#ECE8F7", textMute: "rgba(236,232,247,.55)", textFaint: "rgba(236,232,247,.32)", accent: "#9B83E0", accentDeep: "#7C63C9", navBg: "rgba(21,19,31,.92)" })
  };
  Object.assign(window.JCTHEME, extra);

  /* ═══════════════ MEDIQUE · DESIGN SYSTEM (JCDS) ═══════════════
     Escalas puras e independientes del tema: los COLORES siguen saliendo de T (JCTHEME),
     así los 15 temas (claro/oscuro) funcionan sin tocarse. JCDS aporta la disciplina:
     tipografía con roles, espaciado 4px, radios, elevación, semánticos y estados.
     Principios (DESIGN_SYSTEM_F0.md): datos primero · denso pero respirado · una sola
     voz de acento · todo estado existe · movimiento discreto. */
  var DS = {
    // ── Tipografía · 8 roles (px). El serif (T.serif) SOLO en display/stat; el resto Jost.
    ft: {
      display: 30,   // título de página (Marcellus 400, letterSpacing -.01em)
      stat:    28,   // cifra protagonista de KPI (Marcellus 400)
      title:   16,   // título de tarjeta/sección (Jost 600)
      body:    13,   // texto por defecto: filas, formularios (Jost 400/500)
      sub:     12,   // secundario / metadata (Jost 400)
      label:   10.5, // labels de campo, th de tabla (Jost 500, tracking .06em)
      eyebrow: 10,   // kicker de sección (Jost 500, uppercase, tracking .14em)
      micro:   9.5   // timestamps, footnotes
    },
    // ── Espaciado · escala 4px estricta. Uso: DS.sp[2]=8, DS.sp[4]=16, DS.sp[5]=24…
    sp: [0, 4, 8, 12, 16, 24, 32, 48],
    // ── Radios · 5 valores. `seg` = contenedor de segmented-control (tabs); el botón interno
    //    usa `ctl`. Antes los tabs usaban `pill` (999, muy redondeado): se pasó a rectangular
    //    (más moderno, estilo Linear/iOS segmented) — pedido explícito del usuario. `pill` queda
    //    SOLO para chips/badges/indicadores, nunca para navegación de tabs.
    r: { ctl: 8, seg: 10, card: 12, panel: 16, pill: 999 },
    // ── Elevación · 3 niveles
    el: {
      flat: "none",
      raised: "0 1px 3px rgba(0,0,0,.10)",
      overlay: "0 16px 48px -16px rgba(0,0,0,.35)"
    },
    // ── Colores semánticos (únicos; reemplazan los hex repetidos a mano)
    ok: "#1F8A5B",     okBg: "rgba(31,138,91,.10)",     okLine: "rgba(31,138,91,.35)",
    danger: "#C0285A", dangerBg: "rgba(192,40,90,.10)", dangerLine: "rgba(192,40,90,.35)",
    warn: "#C9A227",   warnBg: "rgba(201,162,39,.12)",  warnLine: "rgba(201,162,39,.38)",
    info: "#2E7FB0",   infoBg: "rgba(46,127,176,.10)",  infoLine: "rgba(46,127,176,.35)",
    // ── Movimiento · discreto (150–200ms, ease-out expo; lift máx 1px)
    dur: ".18s",
    ease: "cubic-bezier(.22,1,.36,1)",
    trans: function (props) { return (props || "all") + " .18s cubic-bezier(.22,1,.36,1)"; },
    // ── Foco accesible (AA): anillo 2px con offset del color del tema. Igual en claro/oscuro.
    focus: function (T) { return "0 0 0 2px " + (T.bg || "#fff") + ", 0 0 0 4px " + (T.accent || "#54707F"); },
    // ── Alturas estándar (denso pero respirado)
    h: { ctl: 36, ctlSm: 30, row: 42, rowSm: 36 },

    /* ── Recetas: estilos base listos para untar (spread) en style={{…}} ── */
    // Texto por rol: DS.text(T,'body') · DS.text(T,'label') · etc.
    text: function (T, role) {
      var s = { fontFamily: T.sans, color: T.text };
      var f = this.ft[role] || this.ft.body; s.fontSize = f;
      if (role === "display" || role === "stat") { s.fontFamily = T.serif; s.fontWeight = 400; s.letterSpacing = "-.01em"; s.lineHeight = 1.08; }
      else if (role === "title") { s.fontWeight = 600; s.lineHeight = 1.25; }
      else if (role === "label") { s.fontWeight = 500; s.letterSpacing = ".06em", s.color = T.textMute; }
      else if (role === "eyebrow") { s.fontWeight = 500, s.letterSpacing = ".14em"; s.textTransform = "uppercase"; s.color = T.accent; }
      else if (role === "sub" || role === "micro") { s.color = T.textMute; s.lineHeight = 1.5; }
      else { s.lineHeight = 1.5; }
      return s;
    },
    // ── Glass (rediseño Los Medique, ref. dashboard): mismo tratamiento translúcido+blur que se usó
    // en Dashboard/Agenda, ahora disponible para CUALQUIER tarjeta que use DS.card/DS.panel — así el
    // resto de las pantallas hereda el look sin tener que reescribir cada una a mano.
    _lux: function () { try { return typeof isLosMedique === "function" && isLosMedique(); } catch (e) { return false; } },
    // Sistema glass · EXACTAMENTE 2 niveles (regla del design audit, "dos niveles de glass como máximo"):
    //   panel = superficies grandes (cards, paneles, sidebar, header) · small = elementos chicos
    //   (botones ghost, toggles, citas de agenda). Todo componente glass referencia UNO de estos dos.
    glassBlur: { panel: "blur(24px) saturate(1.4)", small: "blur(12px) saturate(1.25)" },
    _glass: function (T, radius) {
      var b = this.glassBlur.panel;
      return T.dark
        ? { background: "rgba(255,255,255,.045)", backdropFilter: b, WebkitBackdropFilter: b, border: "1px solid rgba(255,255,255,.09)", borderRadius: radius, boxShadow: "inset 0 1px 0 rgba(255,255,255,.07), 0 32px 72px -44px rgba(0,0,0,.85)" }
        : { background: "rgba(255,255,255,.42)", backdropFilter: b, WebkitBackdropFilter: b, border: "1px solid rgba(255,255,255,.85)", borderRadius: radius, boxShadow: "inset 0 1px 0 rgba(255,255,255,.9), 0 24px 56px -36px rgba(60,58,50,.16)" };
    },
    // Recuadro interno translúcido (glass sobre glass, sutil) para filas/chips dentro de una tarjeta glass.
    glassFill: function (T) { return T.dark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.38)"; },
    glassFillHover: function (T) { return T.dark ? "rgba(255,255,255,.075)" : "rgba(255,255,255,.6)"; },
    // Tarjeta / panel
    card: function (T) { if (this._lux()) return this._glass(T, this.r.card); return { background: T.surface, border: "1px solid " + T.line, borderRadius: this.r.card, boxShadow: this.el.raised }; },
    panel: function (T) { if (this._lux()) return this._glass(T, this.r.panel); return { background: T.surface, border: "1px solid " + T.line, borderRadius: this.r.panel, boxShadow: this.el.raised }; },
    // Control (input/select/botón ghost): base con altura y radio estándar
    ctl: function (T) { return { height: this.h.ctl, padding: "0 " + this.sp[3] + "px", borderRadius: this.r.ctl, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: this.ft.body, outline: "none", boxSizing: "border-box", transition: this.trans("border-color, box-shadow") }; },
    // Skeleton de carga (usar con <div style={DS.skel(T,{width,height})}/> + keyframes jcSkel)
    skel: function (T, extra) { return Object.assign({ background: T.chipBg || "rgba(127,127,127,.12)", borderRadius: this.r.ctl, animation: "jcSkel 1.2s ease-in-out infinite" }, extra || {}); },
    // ── Micro-interacciones (set curado premium) ──
    // Entrada de sección/tarjeta con fade + subida, escalonada por índice (stagger).
    // Uso: style={{ ...DS.reveal(i) }} en cada hijo de una grilla/lista. reduce-motion la anula.
    // fill-mode "backwards": oculta durante el delay del stagger, pero al terminar SUELTA el
    // control del transform → el hover-lift (transform inline) vuelve a funcionar. (con "both"
    // la animación retenía transform:none y pisaba el hover de las tarjetas KPI).
    // Duración/stagger recortados (180ms, 20ms, tope 8 items): en software de gestión el usuario
    // entra a trabajar, no a mirar una intro — que se sienta instantáneo, no coreografiado.
    reveal: function (i) { return { animation: "jcReveal .18s cubic-bezier(.22,1,.36,1) backwards", animationDelay: (Math.min(i || 0, 8) * 20) + "ms" }; },
    // ── Animación de entrada de GRÁFICOS (pedido del usuario: que crezcan, no estáticos) ──
    // barGrow(i)      → barra vertical que sube desde el eje (scaleY 0→1), escalonada por índice.
    // barGrow(i,'x')  → barra horizontal que crece desde la izquierda (scaleX 0→1) para rankings.
    // drawIn(ms)      → línea/área SVG que se "dibuja" de izquierda a derecha (clip-path).
    // Un poco más lentas que reveal (los gráficos SÍ merecen su momento) pero sin exagerar; respetan
    // prefers-reduced-motion vía la regla global. Se aplican SOLO en lux (gated en el call site).
    // fill-mode "backwards" (NO "both"): si la animación no corre (clip-path no soportado, render
    // headless, pestaña oculta), el elemento queda en su estado natural VISIBLE, nunca oculto — la
    // animación realza un default ya visible, no lo esconde. (principio del audit)
    barGrow: function (i, axis) { return { animation: "jc" + (axis === "x" ? "BarGrowX" : "BarGrow") + " .6s cubic-bezier(.22,1,.36,1) backwards", animationDelay: (Math.min(i || 0, 12) * 55) + "ms", transformOrigin: axis === "x" ? "left center" : "bottom center" }; },
    drawIn: function (ms) { return { animation: "jcDrawIn " + ((ms || 900) / 1000) + "s cubic-bezier(.33,1,.68,1) backwards" }; }
  };
  window.JCDS = DS;
  // Keyframes del skeleton + foco visible global por teclado (una sola vez).
  try {
    if (!document.getElementById("jcds-css")) {
      var st = document.createElement("style"); st.id = "jcds-css";
      st.textContent = "@keyframes jcSkel{0%,100%{opacity:.55}50%{opacity:1}}" +
        "@keyframes jcReveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}" +
        // Gráficos: barras que crecen desde el eje y líneas/áreas que se dibujan al montar.
        "@keyframes jcBarGrow{from{transform:scaleY(0)}to{transform:scaleY(1)}}" +
        "@keyframes jcBarGrowX{from{transform:scaleX(0)}to{transform:scaleX(1)}}" +
        "@keyframes jcDrawIn{from{clip-path:inset(0 100% 0 0);-webkit-clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0);-webkit-clip-path:inset(0 0 0 0)}}" +
        "@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms !important;animation-delay:0ms !important;transition-duration:.01ms !important}}" +
        // Foco visible por teclado: usa currentColor (ya es el color del propio control en cada tema)
        // para no depender de variables CSS que este stack no usa. Solo aplica en :focus-visible
        // (tab/teclado), no en click con mouse, así no altera el aspecto visual normal de nada.
        ":focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:4px}" +
        "input:focus-visible,select:focus-visible,textarea:focus-visible{outline-offset:0}" +
        // Dashboard editorial: las columnas asimétricas (1.5fr/1fr) colapsan a 1 col en pantallas angostas.
        "@media (max-width: 820px){.jc-dash-grid{grid-template-columns:1fr !important}}" +
        // Grip de arrastre de bloques del dashboard: oculto, aparece al pasar el cursor por el bloque.
        ".jc-drag-grip{opacity:0;transition:opacity .18s}.jc-dash-block:hover .jc-drag-grip{opacity:.55}" +
        // Agenda · vista día en tablet/móvil: el timeline (460px) y el panel lateral (320px fijo) no
        // caben lado a lado y el panel quedaba angosto y con su propio scroll interno de 72vh, apilado
        // debajo del timeline — dos cajas con scroll propio dentro de una página que ya scrollea, muy
        // desordenado. Bajo los 900px el panel pasa a ancho completo y alto automático (sin su propio
        // scroll), para que las tarjetas (mini-calendario, información del día, acciones, próximas
        // citas) fluyan naturalmente una debajo de otra.
        "@media (max-width: 900px){.jc-day-timeline{height:60vh !important}.jc-day-sidebar{flex:1 1 100% !important;width:100% !important;max-width:100% !important;height:auto !important;overflow:visible !important}}";
      document.head.appendChild(st);
    }
  } catch (e) {}
})();

/* ═══ CSS del ACCESO (login) — compartido por el panel de escritorio y el panel MÓVIL ═══
   Vivía dentro de jc-admin.jsx, que el móvil no carga; al querer el mismo login en ambos, se
   movió aquí (jc-theme.js sí lo cargan los dos) para no mantener dos copias que se desincronicen. */
window.JCM_LOGIN_CSS = `
/* Sora en títulos y botones; Inter en TODO el texto chico (eyebrow, subtítulos, campos, enlaces,
   letra fina). Inter tiene más altura de x que Jost, así que a 10-12px se lee bastante mejor —
   que era justo el problema. Es además la sans de la landing medique.cl, así que el acceso y el
   sitio público hablan el mismo idioma. Para cambiarla, basta tocar --jcl-sans aquí. */
.jcl-stage{--jcl-sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--jcl-display:'Sora',-apple-system,'Segoe UI',sans-serif;
  position:relative;overflow:hidden;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:24px;background-size:cover;background-position:center;background-repeat:no-repeat}
.jcl-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}
.jcl-veil{position:absolute;inset:0;pointer-events:none;background:linear-gradient(rgba(9,11,15,.58),rgba(9,11,15,.80))}
/* Halo frío detrás del cristal: lo despega del fondo y respira muy lento. */
.jcl-halo{position:absolute;left:50%;top:50%;width:min(820px,130vw);height:min(820px,130vw);transform:translate(-50%,-50%);pointer-events:none;background:radial-gradient(circle,rgba(150,182,218,.17) 0%,rgba(150,182,218,.06) 40%,rgba(9,11,15,0) 70%);animation:jclBreathe 16s ease-in-out infinite}
.jcl-card{position:relative;width:100%;max-width:404px;padding:34px 30px 26px;border-radius:26px;overflow:hidden;
  background:rgba(255,255,255,.055);
  -webkit-backdrop-filter:blur(26px) saturate(1.45);backdrop-filter:blur(26px) saturate(1.45);
  border:1px solid rgba(255,255,255,.14);
  box-shadow:0 44px 96px -44px rgba(0,0,0,.92),inset 0 1px 0 rgba(255,255,255,.10);
  animation:jclCard .8s cubic-bezier(.2,.8,.2,1) both}
/* Filo superior iluminado: el borde "mojado" del cristal. */
.jcl-card::before{content:"";position:absolute;top:0;left:14%;right:14%;height:1px;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)}
/* Reflejo que cruza el cristal cada tanto. */
.jcl-sheen{position:absolute;top:-60%;bottom:-60%;left:0;width:32%;pointer-events:none;transform:skewX(-18deg) translateX(-260%);background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.08),rgba(255,255,255,0));animation:jclSheen 11s ease-in-out infinite}
.jcl-st{animation:jclRise .7s cubic-bezier(.2,.8,.2,1) both}
.jcl-eyebrow{font-family:var(--jcl-sans);font-size:9.5px;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:rgba(198,215,233,.8);text-align:center}
.jcl-title{font-family:var(--jcl-display);font-weight:600;font-size:33px;letter-spacing:-.032em;line-height:1.06;text-align:center;color:#F5F7FB;margin:13px 0 7px}
.jcl-sub{font-family:var(--jcl-sans);font-size:13px;font-weight:400;line-height:1.55;letter-spacing:-.005em;text-align:center;color:rgba(235,242,252,.66);margin:0 0 22px}
.jcl-foot{text-align:center;margin-top:15px;font-family:var(--jcl-sans);font-size:12.5px;color:rgba(235,242,252,.62)}
.jcl-fine{font-family:var(--jcl-sans);font-size:11.5px;line-height:1.55;text-align:center;color:rgba(235,242,252,.6);margin-top:2px}
.jcl-fine a{color:rgba(190,208,226,.95);text-decoration:underline}
.jcl-in{width:100%;padding:14px 15px;border-radius:13px;box-sizing:border-box;outline:none;
  border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#F5F7FB;
  font-family:var(--jcl-sans);font-size:14px;letter-spacing:-.005em;
  transition:border-color .22s ease,background .22s ease,box-shadow .22s ease}
/* .5 y no menos: medido sobre el cristal, un placeholder a .42 quedaba en 4.3:1 (bajo el 4.5 de WCAG AA). */
.jcl-in::placeholder{color:rgba(235,242,252,.52)}
.jcl-in:hover{background:rgba(255,255,255,.085)}
.jcl-in:focus{border-color:rgba(182,202,221,.72);background:rgba(255,255,255,.10);box-shadow:0 0 0 4px rgba(150,182,218,.15)}
/* Autocompletar de Chrome: sin esto pinta el campo de blanco y rompe el cristal. */
.jcl-in:-webkit-autofill,.jcl-in:-webkit-autofill:hover,.jcl-in:-webkit-autofill:focus{-webkit-text-fill-color:#F5F7FB;caret-color:#F5F7FB;-webkit-box-shadow:0 0 0 1000px rgba(26,32,42,.96) inset;transition:background-color 9999s ease-in-out 0s}
.jcl-otp{text-align:center;letter-spacing:.5em;font-size:22px}
.jcl-btn{position:relative;overflow:hidden;width:100%;padding:15px;border:none;border-radius:13px;cursor:pointer;
  background:linear-gradient(180deg,#F7F4EE,#DFD8CB);color:#0B0D11;
  font-family:var(--jcl-display);font-size:11.5px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;
  box-shadow:0 16px 36px -18px rgba(240,236,228,.8);
  transition:transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s ease,opacity .2s ease}
.jcl-btn::after{content:"";position:absolute;top:-30%;bottom:-30%;left:-70%;width:42%;pointer-events:none;transform:skewX(-22deg);background:linear-gradient(105deg,rgba(255,255,255,0),rgba(255,255,255,.7),rgba(255,255,255,0));transition:left .7s ease}
.jcl-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 22px 46px -18px rgba(240,236,228,.95)}
.jcl-btn:hover:not(:disabled)::after{left:130%}
.jcl-btn:active:not(:disabled){transform:translateY(0)}
.jcl-btn:disabled{opacity:.5;cursor:not-allowed;box-shadow:none}
.jcl-ghost{width:100%;padding:14px;border-radius:13px;cursor:pointer;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.045);color:#F5F7FB;
  font-family:var(--jcl-sans);font-size:11.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;
  transition:background .2s ease,border-color .2s ease,transform .2s cubic-bezier(.2,.8,.2,1)}
.jcl-ghost:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.3);transform:translateY(-1px)}
.jcl-link{background:none;border:none;padding:6px;cursor:pointer;font-family:var(--jcl-sans);font-size:12.5px;font-weight:500;color:rgba(190,208,226,.92);
  background-image:linear-gradient(currentColor,currentColor);background-repeat:no-repeat;background-position:50% 88%;background-size:0% 1px;
  transition:color .2s ease,background-size .28s cubic-bezier(.2,.8,.2,1)}
.jcl-link:hover{color:#F5F7FB;background-size:76% 1px}
.jcl-err{font-family:var(--jcl-sans);font-size:12.5px;color:#F08098;animation:jclRise .35s ease both}
.jcl-ok{font-family:var(--jcl-sans);font-size:12.5px;color:#6CD3A6;animation:jclRise .35s ease both}
/* Viaje a la cumbre: el teleférico recorre el cable hasta la montaña mientras se carga el panel.
   Es indeterminado a propósito (no sabemos cuánto tarda Firestore): da vueltas hasta que el panel
   monta. Los mensajes SÍ avanzan y se quedan en el último, para no prometer un progreso falso. */
.jcl-travel{display:flex;flex-direction:column;align-items:center;gap:20px;padding:10px 0 4px}
.jcl-rail{position:relative;width:100%;max-width:246px;height:2px;border-radius:2px;background:rgba(255,255,255,.13)}
.jcl-rail::after{content:"";position:absolute;inset:0;border-radius:2px;transform-origin:left;background:linear-gradient(90deg,rgba(182,202,221,0),rgba(182,202,221,.8));animation:jclFill 3s cubic-bezier(.5,.03,.35,1) infinite}
.jcl-goal{position:absolute;right:0;top:50%;transform:translate(60%,-50%);font-size:17px;line-height:1;animation:jclGoal 3s ease-in-out infinite}
.jcl-rider{position:absolute;top:50%;left:0;transform:translate(-50%,-50%);animation:jclRide 3s cubic-bezier(.5,.03,.35,1) infinite}
.jcl-bob{display:block;font-size:21px;line-height:1;animation:jclBob 1s ease-in-out infinite}
.jcl-steps{font-family:var(--jcl-sans);font-size:12.5px;color:rgba(235,242,252,.72);text-align:center;min-height:18px;animation:jclRise .4s ease both}
@keyframes jclCard{from{opacity:0;transform:translateY(26px) scale(.985);filter:blur(7px)}to{opacity:1;transform:none;filter:none}}
@keyframes jclRise{from{opacity:0;transform:translateY(13px)}to{opacity:1;transform:none}}
@keyframes jclSheen{0%,62%{transform:skewX(-18deg) translateX(-260%)}100%{transform:skewX(-18deg) translateX(560%)}}
@keyframes jclBreathe{0%,100%{opacity:.55;transform:translate(-50%,-50%) scale(.94)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}
@keyframes jclRide{0%{left:0;opacity:0}7%{opacity:1}84%{left:100%;opacity:1}93%,100%{left:100%;opacity:0}}
@keyframes jclBob{0%,100%{transform:translateY(-1.5px) rotate(-3deg)}50%{transform:translateY(1.5px) rotate(3deg)}}
@keyframes jclFill{0%{transform:scaleX(0);opacity:1}84%{transform:scaleX(1);opacity:1}93%,100%{transform:scaleX(1);opacity:0}}
@keyframes jclGoal{0%,78%{transform:translate(60%,-50%) scale(1)}86%{transform:translate(60%,-50%) scale(1.3)}94%,100%{transform:translate(60%,-50%) scale(1)}}
@media (prefers-reduced-motion: reduce){.jcl-card,.jcl-st,.jcl-sheen,.jcl-halo,.jcl-err,.jcl-ok,.jcl-steps{animation:none!important}.jcl-in,.jcl-btn,.jcl-ghost,.jcl-link{transition:none!important}
  /* El viaje se queda quieto: el teleférico a mitad de camino y el cable lleno a medias. */
  .jcl-rider{animation:none!important;left:50%}.jcl-bob,.jcl-goal{animation:none!important}.jcl-rail::after{animation:none!important;transform:scaleX(.5)}}
`;
