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
    // ── Radios · 4 valores
    r: { ctl: 8, card: 12, panel: 16, pill: 999 },
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
    // Tarjeta / panel
    card: function (T) { return { background: T.surface, border: "1px solid " + T.line, borderRadius: this.r.card, boxShadow: this.el.raised }; },
    panel: function (T) { return { background: T.surface, border: "1px solid " + T.line, borderRadius: this.r.panel, boxShadow: this.el.raised }; },
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
    reveal: function (i) { return { animation: "jcReveal .18s cubic-bezier(.22,1,.36,1) backwards", animationDelay: (Math.min(i || 0, 8) * 20) + "ms" }; }
  };
  window.JCDS = DS;
  // Keyframes del skeleton + foco visible global por teclado (una sola vez).
  try {
    if (!document.getElementById("jcds-css")) {
      var st = document.createElement("style"); st.id = "jcds-css";
      st.textContent = "@keyframes jcSkel{0%,100%{opacity:.55}50%{opacity:1}}" +
        "@keyframes jcReveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}" +
        "@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms !important;animation-delay:0ms !important;transition-duration:.01ms !important}}" +
        // Foco visible por teclado: usa currentColor (ya es el color del propio control en cada tema)
        // para no depender de variables CSS que este stack no usa. Solo aplica en :focus-visible
        // (tab/teclado), no en click con mouse, así no altera el aspecto visual normal de nada.
        ":focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:4px}" +
        "input:focus-visible,select:focus-visible,textarea:focus-visible{outline-offset:0}" +
        // Dashboard editorial: las columnas asimétricas (1.5fr/1fr) colapsan a 1 col en pantallas angostas.
        "@media (max-width: 820px){.jc-dash-grid{grid-template-columns:1fr !important}}";
      document.head.appendChild(st);
    }
  } catch (e) {}
})();
