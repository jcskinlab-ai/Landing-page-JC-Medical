const TWEAK_DEFAULTS = { "theme": "clinico", "accent": "default", "bookingFlow": "guiado", "copyTone": "calido", "animations": true };
const ACCENTS = { default: null, oro: "#B9C2CB", vino: "#C0285A", pizarra: "#6A8296" };
function navIcon(name, stroke) {
  const p = {
    home: /* @__PURE__ */ React.createElement("path", { d: "M3 11l9-8 9 8M5 10v10h14V10" }),
    cat: /* @__PURE__ */ React.createElement("path", { d: "M4 6h16M4 12h16M4 18h10" }),
    feed: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "4" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "17.5", cy: "6.5", r: "1", fill: stroke })),
    contact: /* @__PURE__ */ React.createElement("path", { d: "M21 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" }),
    panel: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M9 21V9" })),
    asistente: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "11.5", r: ".8", fill: stroke }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "11.5", r: ".8", fill: stroke }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "11.5", r: ".8", fill: stroke })),
    juegos: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "2", y: "6", width: "20", height: "12", rx: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M7 10v4M5 12h4" }), /* @__PURE__ */ React.createElement("circle", { cx: "16", cy: "11", r: "1", fill: stroke }), /* @__PURE__ */ React.createElement("circle", { cx: "18.5", cy: "14", r: "1", fill: stroke })),
    perfil: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "3.6" }), /* @__PURE__ */ React.createElement("path", { d: "M5 20a7 7 0 0 1 14 0" }))
  }[name];
  return /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, p);
}
const TABS = [
  { k: "home", l: "Inicio", icon: "home" },
  { k: "catalogo", l: "Cat\xE1logo", icon: "cat" },
  { k: "perfil", l: "Mi Perfil", icon: "perfil" },
  { k: "asistente", l: "Asistente", icon: "asistente" },
  { k: "juegos", l: "Juegos", icon: "juegos" }
];
const ONBOARD_STEPS = [
  {
    emoji: "\u{1F33F}",
    title: "Tratamientos reales",
    body: "Explora el cat\xE1logo completo con fotos reales, precios claros y fichas detalladas de cada procedimiento."
  },
  {
    emoji: "\u2B50",
    title: "Puntos Glow",
    body: "Juega en la secci\xF3n Juegos y acumula puntos. Cada 3.000 puntos equivalen a 1 ticket para el sorteo mensual."
  },
  {
    emoji: "\u{1F4C5}",
    title: "Agenda en segundos",
    body: "Reserva con abono de $15.000 directamente desde la app. El saldo se paga el d\xEDa de tu cita en cl\xEDnica."
  }
];
function OnboardOverlay({ T, onDone }) {
  const [step, setStep] = useState(0);
  const cur = ONBOARD_STEPS[step];
  const isLast = step === ONBOARD_STEPS.length - 1;
  const ease = "cubic-bezier(.22,1,.36,1)";
  return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, zIndex: 100, background: "rgba(0,0,0,.72)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 20px 90px" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: "100%", background: T.bg, borderRadius: 22, padding: "28px 26px 24px", boxShadow: "0 -30px 60px -20px rgba(0,0,0,.45)", animation: "jcSlideUp .45s " + ease + " both" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, marginBottom: 26, justifyContent: "center" } }, ONBOARD_STEPS.map((_, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { height: 3, borderRadius: 99, flex: i === step ? 2.5 : 1, background: i <= step ? T.accent : T.line, transition: "flex .4s " + ease + ", background .3s" } }))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 26 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 42, lineHeight: 1, marginBottom: 16 } }, cur.emoji), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 400, fontSize: 27, letterSpacing: "-.01em", color: T.text, marginBottom: 12 } }, cur.title), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 300, color: T.textMute, lineHeight: 1.75 } }, cur.body)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: onDone, style: { flex: 1, fontFamily: T.sans, fontSize: 10, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, background: "transparent", border: "1px solid " + T.line, borderRadius: 4, padding: "14px 10px", cursor: "pointer", minHeight: 44 } }, "Omitir"), /* @__PURE__ */ React.createElement("button", { onClick: () => isLast ? onDone() : setStep((s) => s + 1), style: { flex: 2, fontFamily: T.sans, fontSize: 10, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: T.primaryText, background: T.primaryBg, border: "none", borderRadius: 4, padding: "14px 10px", cursor: "pointer", minHeight: 44 } }, isLast ? "Comenzar" : "Siguiente"))));
}
function DesktopSidePanel({ T }) {
  return /* @__PURE__ */ React.createElement("div", { className: "jc-desktop-side" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 20, height: 1, background: T.gold, display: "inline-block", flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent } }, "SKINLAB \xB7 TALCA")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontWeight: 400, fontSize: 40, letterSpacing: "-.02em", color: T.text, lineHeight: 1, marginBottom: 22 } }, "JC", " ", /* @__PURE__ */ React.createElement("em", { style: { fontFamily: T.ital, fontStyle: "italic", color: T.accent } }, "Medical")), /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 1, background: T.line, marginBottom: 22 } }), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.textMute, lineHeight: 1.75, marginBottom: 30 } }, "Medicina est\xE9tica con criterio cl\xEDnico. Rejuvenecimiento y armonizaci\xF3n facial en Talca, Chile."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14, marginBottom: 30 } }, [
    ["22 procedimientos", "cat\xE1logo completo"],
    ["Galderma \xB7 AbbVie", "insumos certificados"],
    ["Evaluaci\xF3n $10.000", "se descuenta del tratamiento"]
  ].map(([v, l]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { display: "flex", flexDirection: "column", gap: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text } }, v), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, color: T.textMute, letterSpacing: ".04em" } }, l)))), /* @__PURE__ */ React.createElement("div", { style: { width: 28, height: 1, background: T.line, marginBottom: 20 } }), /* @__PURE__ */ React.createElement("a", { href: "https://www.instagram.com/jcskinlab", target: "_blank", rel: "noopener", style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, textDecoration: "none", display: "flex", alignItems: "center", gap: 9, marginBottom: 10, transition: "color .2s" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4" }), /* @__PURE__ */ React.createElement("circle", { cx: "17.5", cy: "6.5", r: "1", fill: "currentColor", stroke: "none" })), "@jcskinlab"), /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/56997880877", target: "_blank", rel: "noopener", style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, textDecoration: "none", display: "flex", alignItems: "center", gap: 9, transition: "color .2s" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" })), "+56 9 9788 0877"));
}
function App() {
  const t = { theme: "clinico", bookingFlow: "guiado", copyTone: "calido", animations: true };
  const T = JCTHEME[t.theme] || JCTHEME.editorial;
  const D = window.JCDATA;
  const anim = t.animations;
  const [tab, setTab] = useState("home");
  const [sub, setSub] = useState(null);
  const [booking, setBooking] = useState(null);
  const [feedNonce, setFeedNonce] = useState(0);
  const scrollRef = useRef(null);
  const prevTab = useRef("home");
  const [evalForm, setEvalForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollMem = useRef({});
  const [session, setSession] = useState(() => window.jcmGetSession ? window.jcmGetSession() : null);
  const curKey = useRef("home");
  const progRef = useRef(null);
  const transDirRef = useRef(0);
  const [onboarded, setOnboarded] = useState(() => {
    try {
      return !!localStorage.getItem("jcm_onboarded_v1");
    } catch (e) {
      return true;
    }
  });
  function dismissOnboard() {
    try {
      localStorage.setItem("jcm_onboarded_v1", "1");
    } catch (e) {
    }
    setOnboarded(true);
  }
  function saveScroll() {
    if (scrollRef.current) scrollMem.current[curKey.current] = scrollRef.current.scrollTop;
  }
  function onScroll(e) {
    const el = e.currentTarget, max = el.scrollHeight - el.clientHeight;
    if (progRef.current) progRef.current.style.transform = "scaleX(" + (max > 0 ? el.scrollTop / max : 0) + ")";
    const sc = el.scrollTop > el.clientHeight * 0.62;
    setScrolled((prev) => prev === sc ? prev : sc);
  }
  function go(name, payload) {
    if (name === "back") {
      transDirRef.current = -1;
      saveScroll();
      setSub(null);
      return;
    }
    saveScroll();
    if (name === "ficha") {
      transDirRef.current = 1;
      setSub({ type: "ficha", proc: payload });
    } else if (name === "antes") {
      transDirRef.current = 1;
      setSub({ type: "antes", proc: payload || null });
    } else {
      transDirRef.current = 0;
      if (name !== tab) prevTab.current = tab;
      setTab(name);
      setSub(null);
    }
  }
  function openBooking(proc) {
    setBooking({ proc });
  }
  function smoothTop() {
    const el = scrollRef.current;
    if (!el) return;
    const start = el.scrollTop, t0 = performance.now(), dur = 420;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches || start <= 0) {
      el.scrollTop = 0;
      return;
    }
    const step = (t2) => {
      const k = Math.min(1, (t2 - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.scrollTop = Math.round(start * (1 - e));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function goTab(k) {
    if (k === tab && !sub) {
      smoothTop();
      scrollMem.current[k] = 0;
      setScrolled(false);
      return;
    }
    const curIdx = TABS.findIndex((x) => x.k === tab);
    const nextIdx = TABS.findIndex((x) => x.k === k);
    transDirRef.current = sub ? -1 : nextIdx > curIdx ? 1 : nextIdx < curIdx ? -1 : 0;
    if (window.jcmGetSession) setSession(window.jcmGetSession());
    saveScroll();
    if (k !== tab) prevTab.current = tab;
    setTab(k);
    setSub(null);
  }
  function goBack() {
    goTab(prevTab.current || "home");
  }
  let screen;
  if (sub && sub.type === "ficha") screen = /* @__PURE__ */ React.createElement(FichaScreen, { T, D, proc: sub.proc, go, openBooking });
  else if (sub && sub.type === "antes") screen = /* @__PURE__ */ React.createElement(AntesScreen, { T, D, go, openBooking, proc: sub.proc });
  else if (tab === "home") screen = /* @__PURE__ */ React.createElement(HomeScreen, { T, D, go, openBooking, tone: t.copyTone });
  else if (tab === "catalogo") screen = /* @__PURE__ */ React.createElement(CatalogScreen, { T, D, go, openBooking, onBack: goBack });
  else if (tab === "feed") screen = /* @__PURE__ */ React.createElement(FeedHubScreen, { T, D, go, openBooking, onBack: goBack });
  else if (tab === "contacto") screen = /* @__PURE__ */ React.createElement(ContactScreen, { T, D, go, openBooking, onBack: goBack });
  else if (tab === "asistente") screen = /* @__PURE__ */ React.createElement(AssistantScreen, { T, D, openBooking, onBack: goBack });
  else if (tab === "juegos") screen = /* @__PURE__ */ React.createElement(GamesScreen, { T, go, onBack: goBack });
  else if (tab === "perfil") screen = /* @__PURE__ */ React.createElement(ProfileScreen, { T, D, go, openBooking, onBack: goBack, onSessionChange: (s) => setSession(s) });
  else if (tab === "panel") screen = /* @__PURE__ */ React.createElement(PanelScreen, { T, D });
  const screenKey = sub ? sub.type + (sub.proc ? sub.proc.id || sub.proc.name : "") : tab;
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = scrollMem.current[screenKey] != null ? scrollMem.current[screenKey] : 0;
    curKey.current = screenKey;
    if (progRef.current) {
      const max = el.scrollHeight - el.clientHeight;
      progRef.current.style.transform = "scaleX(" + (max > 0 ? el.scrollTop / max : 0) + ")";
    }
    setScrolled(el.scrollTop > el.clientHeight * 0.62);
  }, [screenKey]);
  const onHome = tab === "home" && !sub;
  const heroMode = onHome && !scrolled;
  const navDark = heroMode || T.dark;
  const navIdx = sub ? -1 : TABS.findIndex((t2) => t2.k === tab);
  const padTop = onHome ? 0 : "calc(52px + env(safe-area-inset-top))";
  const dir = transDirRef.current;
  const slideAnim = !anim ? void 0 : dir === 1 ? "jcSlideFromRight .3s " + T.ease + " both" : dir === -1 ? "jcSlideFromLeft .3s " + T.ease + " both" : "jcFade .34s " + T.ease;
  return /* @__PURE__ */ React.createElement("div", { className: "jc-stage", style: { background: T.dark ? "#070707" : "#DCD7CC" } }, /* @__PURE__ */ React.createElement(DesktopSidePanel, { T }), /* @__PURE__ */ React.createElement("div", { className: "jc-app-frame", style: { background: T.bg, boxShadow: T.shadow, color: T.text } }, /* @__PURE__ */ React.createElement("div", { ref: progRef, style: { position: "absolute", top: 0, left: 0, height: 2, width: "100%", transform: "scaleX(0)", transformOrigin: "left", zIndex: 40, background: "linear-gradient(90deg," + T.accent + "," + T.gold + ")", transition: "transform .08s linear", pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "calc(11px + env(safe-area-inset-top)) 16px 11px",
    background: heroMode ? "linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,0))" : T.navBg,
    borderBottom: heroMode ? "1px solid transparent" : "1px solid " + T.line,
    backdropFilter: heroMode ? "none" : "blur(14px)",
    WebkitBackdropFilter: heroMode ? "none" : "blur(14px)",
    transition: "background .35s " + T.ease + ", border-color .35s " + T.ease
  } }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://instagram.com/jcskinlab",
      target: "_blank",
      rel: "noopener",
      title: "@jcskinlab en Instagram",
      "aria-label": "Instagram de JC Medical",
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: 999,
        border: "1px solid " + (heroMode ? "rgba(242,237,230,.4)" : T.chipBorder),
        color: heroMode ? "#F2EDE6" : T.text,
        textDecoration: "none",
        transition: "color .35s " + T.ease + ", border-color .35s " + T.ease
      }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3.6" }), /* @__PURE__ */ React.createElement("circle", { cx: "17.5", cy: "6.5", r: "1", fill: "currentColor" }))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => goTab("perfil"),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: T.sans,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        color: heroMode ? "#F2EDE6" : T.text,
        background: session ? heroMode ? "rgba(255,255,255,.15)" : T.accent + "18" : heroMode ? "rgba(0,0,0,.3)" : T.chipBg,
        border: "1px solid " + (session ? heroMode ? "rgba(242,237,230,.5)" : T.accent + "55" : heroMode ? "rgba(242,237,230,.35)" : T.chipBorder),
        borderRadius: 999,
        padding: "10px 14px",
        minHeight: 44,
        cursor: "pointer",
        transition: "color .35s " + T.ease + ", background .35s " + T.ease + ", border-color .35s " + T.ease
      }
    },
    session ? /* @__PURE__ */ React.createElement("span", { style: { width: 20, height: 20, borderRadius: "50%", background: T.accent, color: T.onAccent || "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 } }, (session.name || "?")[0].toUpperCase()) : /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "3.4" }), /* @__PURE__ */ React.createElement("path", { d: "M5 20a7 7 0 0 1 14 0" })),
    session ? (session.name || "Mi cuenta").split(" ")[0] : tab === "perfil" ? "Mi cuenta" : "Ingresar"
  )), tab === "asistente" && !sub ? /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, paddingTop: padTop, paddingBottom: "calc(72px + env(safe-area-inset-bottom))" } }, screen) : /* @__PURE__ */ React.createElement("div", { ref: scrollRef, onScroll, className: "jc-scroll", style: { flex: 1, overflowY: "auto", overflowX: "hidden", paddingTop: padTop } }, /* @__PURE__ */ React.createElement("div", { key: screenKey, style: { ...onHome ? { height: "100%" } : null, ...anim ? { animation: slideAnim } : null } }, screen), /* @__PURE__ */ React.createElement("div", { style: { height: 78 } })), !booking && !evalForm && tab !== "asistente" && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => openBooking(null),
      title: "Agendar",
      "aria-label": "Agendar",
      style: {
        position: "absolute",
        right: 16,
        bottom: 90,
        zIndex: 30,
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "rgba(31,138,91,.16)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        animation: "jcFabPulse 3.2s cubic-bezier(.22,1,.36,1) infinite"
      }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "rgba(255,255,255,.92)", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" }))
  ), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 20, padding: "0 12px", paddingBottom: "calc(9px + env(safe-area-inset-bottom))", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { style: {
    pointerEvents: "auto",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 0,
    background: navDark ? "rgba(16,19,26,.5)" : "rgba(255,255,255,.5)",
    backdropFilter: "blur(22px) saturate(1.3)",
    WebkitBackdropFilter: "blur(22px) saturate(1.3)",
    border: "1px solid " + (navDark ? "rgba(255,255,255,.10)" : "rgba(20,20,15,.07)"),
    borderRadius: 30,
    padding: "5px 7px",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,.5)",
    transition: "background .35s " + T.ease + ", border-color .35s " + T.ease
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: 5,
    bottom: 5,
    left: 7,
    width: "calc((100% - 14px) / " + TABS.length + ")",
    borderRadius: 20,
    background: navDark ? "rgba(242,237,230,.14)" : "rgba(20,20,15,.08)",
    transform: "translateX(" + Math.max(0, navIdx) * 100 + "%)",
    opacity: navIdx < 0 ? 0 : 1,
    transition: "transform .42s " + T.ease + ", opacity .3s, background .35s " + T.ease,
    zIndex: 0,
    pointerEvents: "none"
  } }), TABS.map((tb) => {
    const active = tab === tb.k && !sub;
    const isJuegos = tb.k === "juegos";
    const iconColor = active ? navDark ? "#F2EDE6" : T.text : isJuegos ? T.gold : navDark ? "rgba(242,237,230,.5)" : T.textFaint;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tb.k,
        onClick: () => goTab(tb.k),
        title: tb.l,
        "aria-label": tb.l,
        "aria-current": active ? "page" : void 0,
        style: {
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          padding: "9px 0 7px",
          borderRadius: 20,
          border: "none",
          cursor: "pointer",
          background: "transparent",
          transition: "transform .15s " + T.ease
        }
      },
      navIcon(tb.icon, iconColor),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 8, letterSpacing: ".05em", textTransform: "uppercase", color: iconColor, lineHeight: 1, transition: "color .35s " + T.ease, pointerEvents: "none" } }, tb.l)
    );
  }))), evalForm && /* @__PURE__ */ React.createElement(EvalForm, { T, D, onClose: () => setEvalForm(false) }), booking && /* @__PURE__ */ React.createElement(BookingFlow, { T, D, initialProc: booking.proc, mode: t.bookingFlow, onClose: () => setBooking(null), onAskAssistant: () => {
    setBooking(null);
    goTab("asistente");
  } }), !onboarded && !booking && !evalForm && /* @__PURE__ */ React.createElement(OnboardOverlay, { T, onDone: dismissOnboard })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
