function Eyebrow({ T, children, center }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 10, justifyContent: center ? "center" : "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 22, height: 1, background: T.gold } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, fontWeight: 400, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent } }, children));
}
function Chip({ T, children, active, onClick }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, style: {
    fontFamily: T.sans,
    fontSize: 10.5,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    fontWeight: 500,
    padding: "9px 15px",
    borderRadius: 999,
    cursor: "pointer",
    whiteSpace: "nowrap",
    minHeight: 44,
    background: active ? T.text : T.chipBg,
    color: active ? T.bg : T.textMute,
    border: "1px solid " + (active ? T.text : T.chipBorder),
    transition: "all .25s " + T.ease
  } }, children);
}
function PrimaryBtn({ T, children, onClick, full, icon }) {
  const [h, setH] = useState(false);
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        width: full ? "100%" : "auto",
        fontFamily: T.sans,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        padding: "15px 26px",
        borderRadius: 3,
        cursor: "pointer",
        minHeight: 44,
        background: h ? "transparent" : T.primaryBg,
        color: h ? T.text : T.primaryText,
        border: "1px solid " + (T.dark ? T.primaryBg : T.primaryBg),
        transition: "all .28s " + T.ease
      }
    },
    icon,
    children
  );
}
function GhostBtn({ T, children, onClick, full }) {
  const [h, setH] = useState(false);
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: full ? "100%" : "auto",
        fontFamily: T.sans,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        padding: "15px 26px",
        borderRadius: 3,
        cursor: "pointer",
        minHeight: 44,
        background: "transparent",
        color: h ? T.text : T.textMute,
        border: "1px solid " + (h ? T.text : T.chipBorder),
        transition: "all .28s " + T.ease
      }
    },
    children
  );
}
function Reveal({ children, delay, style }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const ease = "cubic-bezier(.22,1,.36,1)";
  return /* @__PURE__ */ React.createElement("div", { ref, style: { ...style || {}, opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(24px)", transition: "opacity .75s " + ease + " " + (delay || 0) + "s, transform .75s " + ease + " " + (delay || 0) + "s" } }, children);
}
function ScreenTop({ T, title, eyebrow, onBack }) {
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "22px 20px 14px" } }, onBack && /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { display: "flex", width: "fit-content", alignItems: "center", gap: 6, background: T.dark ? "rgba(255,255,255,.08)" : "rgba(20,20,15,.05)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid " + T.line, cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 16, padding: "12px 14px 12px 12px", minHeight: 44, borderRadius: 999 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), "Volver"), eyebrow && /* @__PURE__ */ React.createElement(Eyebrow, { T }, eyebrow), title && /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 38, lineHeight: 1.02, letterSpacing: "-.02em", color: T.text, marginTop: eyebrow ? 12 : 0 } }, title));
}
function StickyBack({ T, onBack, label }) {
  return /* @__PURE__ */ React.createElement("div", { style: { position: "sticky", top: 8, zIndex: 14, padding: "8px 16px 4px", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { pointerEvents: "auto", display: "inline-flex", width: "fit-content", alignItems: "center", gap: 6, background: T.dark ? "rgba(16,19,26,.62)" : "rgba(255,255,255,.62)", backdropFilter: "blur(16px) saturate(1.3)", WebkitBackdropFilter: "blur(16px) saturate(1.3)", border: "1px solid " + (T.dark ? "rgba(255,255,255,.12)" : "rgba(20,20,15,.1)"), cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", padding: "12px 15px 12px 13px", minHeight: 44, borderRadius: 999, boxShadow: "0 6px 18px -8px rgba(0,0,0,.4)" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), label || "Volver"));
}
const cardIcon = /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M2 10h20" }));
function totalProcs(D) {
  try {
    const seen = /* @__PURE__ */ new Set();
    (D.catalog || []).forEach((s) => {
      if (s.sec === "Promociones") return;
      (s.groups || []).forEach((g) => (g.items || []).forEach((it) => {
        if (!it.promo && it.n) seen.add(it.n);
      }));
    });
    return seen.size || 22;
  } catch (e) {
    return 22;
  }
}
function HomeScreen({ T, D, go, openBooking, tone }) {
  const nProcs = totalProcs(D);
  const [prodSheet, setProdSheet] = useState(null);
  const [baLight, setBaLight] = useState(null);
  const lead = tone === "clinico" ? "Rejuvenecimiento y armonizaci\xF3n facial con criterio cl\xEDnico. Resultados sutiles que se notan, pero no se delatan." : "Vuelve a verte como te sientes: descansada, fresca y natural. Sin exageraciones, con la seguridad de un enfermero especialista que cuida cada detalle.";
  const ctaText = tone === "clinico" ? "Tu primera evaluaci\xF3n define un diagn\xF3stico claro y un plan a tu medida. Cupos limitados cada semana." : "Reserva tu evaluaci\xF3n y conversemos sobre lo que te gustar\xEDa mejorar. Sin compromiso y con un plan pensado solo para ti.";
  const heroT = window.JCTHEME && window.JCTHEME.editorial || T;
  return /* @__PURE__ */ React.createElement("div", { style: { height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", overflow: "hidden", height: "100%", minHeight: 520, display: "flex", flexDirection: "column", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("img", { src: "assets/jc-hero-v2.png", alt: "", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,13,13,.58) 0%, rgba(13,13,13,.34) 28%, rgba(13,13,13,.66) 56%, rgba(13,13,13,.97) 100%)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", padding: "0 22px 96px" } }, /* @__PURE__ */ React.createElement(Eyebrow, { T: heroT }, "Medicina est\xE9tica \xB7 Talca"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: heroT.serif, fontWeight: 300, fontSize: 50, lineHeight: 0.98, letterSpacing: "-.025em", color: "#F5F2EC", marginTop: 12, textShadow: "0 2px 18px rgba(0,0,0,.6)" } }, "La naturalidad", /* @__PURE__ */ React.createElement("br", null), "tambi\xE9n es una", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: heroT.ital, fontStyle: "italic", color: "#DCE3E8", textShadow: "0 2px 18px rgba(0,0,0,.65)" } }, "t\xE9cnica.")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: heroT.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "rgba(245,242,236,.94)", marginTop: 16, maxWidth: 360, textShadow: "0 1px 10px rgba(0,0,0,.6)" } }, lead), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(PrimaryBtn, { T: heroT, onClick: () => openBooking(null) }, "Agendar evaluaci\xF3n"), /* @__PURE__ */ React.createElement(GhostBtn, { T: heroT, onClick: () => go("catalogo") }, "Ver tratamientos")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: heroT.sans, fontSize: 10, color: "rgba(245,242,236,.5)", marginTop: 6, textAlign: "center" } }, "Reserva con abono de $15.000 \xB7 resto se paga en cl\xEDnica"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 26, color: "rgba(245,242,236,.6)", animation: "jcBounce 1.8s infinite" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: heroT.sans, fontSize: 9, letterSpacing: ".24em", textTransform: "uppercase" } }, "Desliza"), /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, padding: "26px 20px 6px" } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 400, fontSize: 30, lineHeight: 1.05, letterSpacing: "-.01em", color: T.text } }, "Tratamientos destacados"), /* @__PURE__ */ React.createElement("button", { onClick: () => go("catalogo"), style: { flexShrink: 0, background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.accent, whiteSpace: "nowrap" } }, "Ver cat\xE1logo")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: "16px 20px 0" } }, D.featured.map((f, i) => /* @__PURE__ */ React.createElement(Reveal, { key: f.id, delay: i * 0.07 }, /* @__PURE__ */ React.createElement(FeaturedCard, { T, f, onClick: () => go("ficha", f), D, openBooking })))), /* @__PURE__ */ React.createElement("div", { style: { padding: "22px 20px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 4, animation: "jcAttn 2.2s " + T.ease + " infinite" } }, /* @__PURE__ */ React.createElement(GhostBtn, { T, full: true, onClick: () => go("catalogo") }, "Ver cat\xE1logo completo \u2014 " + nProcs + " procedimientos \u2192"))), /* @__PURE__ */ React.createElement("div", { style: { padding: "48px 20px 14px" } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 32, letterSpacing: "-.02em", color: T.text } }, "Casos reales, ", /* @__PURE__ */ React.createElement("em", { style: { fontFamily: T.ital, fontStyle: "italic", color: T.accent } }, "sin retoque."))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: "0 20px", overflowX: "auto", scrollSnapType: "x mandatory" } }, D.beforeAfter.map((b) => /* @__PURE__ */ React.createElement("button", { key: b.id, onClick: () => setBaLight(b), title: "Ver foto completa", style: { flex: "0 0 30%", scrollSnapAlign: "start", padding: 0, background: T.surface2, cursor: "pointer", borderRadius: 12, overflow: "hidden", position: "relative", border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("img", { src: b.img, alt: b.t, style: { width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" } })))), baLight && /* @__PURE__ */ React.createElement("div", { onClick: () => setBaLight(null), style: { position: "absolute", inset: 0, zIndex: 70, background: "rgba(8,8,8,.92)", backdropFilter: "blur(4px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 18 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setBaLight(null), "aria-label": "Cerrar", style: { position: "absolute", top: 16, right: 16, width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.3)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))), /* @__PURE__ */ React.createElement("img", { src: baLight.img, alt: baLight.t, style: { maxWidth: "100%", maxHeight: "82%", objectFit: "contain", borderRadius: 12, boxShadow: "0 30px 70px -20px rgba(0,0,0,.8)" } }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: "#fff" } }, baLight.t), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: "rgba(255,255,255,.7)", marginTop: 3 } }, baLight.note || "Caso real con consentimiento"))), /* @__PURE__ */ React.createElement(Reveal, { style: { margin: "48px 20px 0", padding: "40px 26px", background: T.surface, border: "1px solid " + T.line, borderRadius: 14, textAlign: "center", boxShadow: "0 18px 44px -26px rgba(40,38,30,.4)" } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 34, letterSpacing: "-.02em", color: T.text, lineHeight: 1.05 } }, "Tu evaluaci\xF3n", /* @__PURE__ */ React.createElement("br", null), "comienza ", /* @__PURE__ */ React.createElement("em", { style: { fontFamily: T.ital, fontStyle: "italic", color: T.accent } }, "aqu\xED.")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.textMute, marginTop: 14, lineHeight: 1.7 } }, ctaText), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 22 } }, /* @__PURE__ */ React.createElement(PrimaryBtn, { T, full: true, icon: cardIcon, onClick: () => openBooking(null) }, "Agendar evaluaci\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 6, textAlign: "center" } }, "Reserva con abono de $15.000 \xB7 resto se paga en cl\xEDnica")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 26, borderRadius: 10, overflow: "hidden", border: "1px solid " + T.line, textAlign: "left" } }, /* @__PURE__ */ React.createElement("iframe", { title: "Ubicaci\xF3n JC Medical", src: D.contact.mapsEmbed, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", style: { width: "100%", height: 150, border: 0, display: "block", filter: T.dark ? "invert(.92) hue-rotate(180deg)" : "none" } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", background: T.bg } }, /* @__PURE__ */ React.createElement("a", { href: D.contact.mapsLink, target: "_blank", rel: "noopener", style: { display: "block", textDecoration: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, D.contact.address), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 } }, D.contact.region, " \xB7 Ver en Google Maps \u2197")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, display: "flex", flexDirection: "column", gap: 3 } }, D.contact.hours.map((h, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 11.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, h[0]), /* @__PURE__ */ React.createElement("span", { style: { color: T.text } }, h[1])))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 14 } }, /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/" + D.wa + "?text=" + encodeURIComponent("Hola, quiero agendar mi evaluaci\xF3n en JC Medical."), target: "_blank", rel: "noopener", style: { flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: "#1F8A5B", background: "transparent", border: "1px solid rgba(31,138,91,.5)", borderRadius: 8, padding: "10px", textDecoration: "none" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "#1F8A5B" }, /* @__PURE__ */ React.createElement("path", { d: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" })), "WhatsApp"), /* @__PURE__ */ React.createElement("a", { href: "https://instagram.com/" + (D.contact.ig || "").replace(/^@/, ""), target: "_blank", rel: "noopener", style: { flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: T.text, background: "transparent", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "10px", textDecoration: "none" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4" }), /* @__PURE__ */ React.createElement("circle", { cx: "17.5", cy: "6.5", r: "1", fill: "currentColor", stroke: "none" })), "Instagram"))))), /* @__PURE__ */ React.createElement(Reveal, { style: { display: "flex", alignItems: "center", gap: 12, margin: "20px 20px 0", padding: "16px 18px", background: T.surface2, border: "1px solid " + T.lineSoft, borderRadius: 14 } }, /* @__PURE__ */ React.createElement("img", { src: "assets/jc-pro.jpg", alt: D.contact.pro, onError: (e) => {
    e.target.style.display = "none";
  }, style: { width: 46, height: 46, borderRadius: "50%", objectFit: "cover", flexShrink: 0, background: T.bg } }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, D.contact.pro), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, D.contact.role))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "26px 30px 0", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".04em", color: T.textFaint, lineHeight: 1.6 } }, "Casos reales publicados con consentimiento. Los resultados var\xEDan seg\xFAn cada paciente y su evaluaci\xF3n cl\xEDnica."), prodSheet && /* @__PURE__ */ React.createElement(ProductSheet, { T, D, p: prodSheet, onClose: () => setProdSheet(null), openBooking }));
}
function proceduresForProduct(p, D) {
  const tipo = (p.tipo || "").toLowerCase();
  let cats;
  if (tipo.indexOf("toxina") >= 0) cats = ["toxina"];
  else if (tipo.indexOf("bioestim") >= 0 || tipo.indexOf("col\xE1g") >= 0 || tipo.indexOf("colag") >= 0 || tipo.indexOf("plla") >= 0) cats = ["bioestim"];
  else cats = ["armoniz", "mesoterap", "regener"];
  const out = [];
  (D && D.catalog || []).forEach((sec) => {
    if (sec.sec === "Promociones") return;
    (sec.groups || []).forEach((g) => {
      const gc = (g.cat || "").toLowerCase();
      if (cats.some((c) => gc.indexOf(c) >= 0)) (g.items || []).forEach((it) => out.push(it));
    });
  });
  return out;
}
function ProductSheet({ T, p, onClose, openBooking, D }) {
  const [view, setView] = useState("info");
  const procs = view === "procs" ? proceduresForProduct(p, D) : [];
  const Row = ({ label, children }) => /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 5 } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.6 } }, children));
  const closeBtn = /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,.5)", border: "1px solid rgba(242,237,230,.35)", color: "#F2EDE6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })));
  return /* @__PURE__ */ React.createElement("div", { onClick: onClose, style: { position: "absolute", inset: 0, zIndex: 60, background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), className: "jc-scroll", style: { width: "100%", maxHeight: "92%", overflowY: "auto", background: T.bg, borderRadius: "18px 18px 0 0", border: "1px solid " + T.line } }, view === "info" ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement("img", { src: p.img, alt: p.brand, onError: (e) => {
    e.target.style.display = "none";
  }, style: { width: "100%", height: 200, objectFit: "cover", display: "block", borderRadius: "18px 18px 0 0" } }), closeBtn), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 22px 26px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent } }, p.tipo), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 400, fontSize: 28, color: T.text, lineHeight: 1.1, margin: "6px 0 14px" } }, p.brand), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.7, marginBottom: 18 } }, p.desc), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "11px 13px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 3 } }, "Origen"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, p.origen)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "11px 13px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 3 } }, "Fabricante"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, p.fabricante))), /* @__PURE__ */ React.createElement(Row, { label: "Modo de uso" }, p.uso), /* @__PURE__ */ React.createElement(Row, { label: "Beneficios" }, p.beneficios), /* @__PURE__ */ React.createElement(Row, { label: "Efectos secundarios" }, p.efectos), /* @__PURE__ */ React.createElement(PrimaryBtn, { T, full: true, onClick: () => setView("procs") }, "Ver procedimientos disponibles"))) : /* @__PURE__ */ React.createElement("div", { style: { position: "relative", padding: "18px 22px 26px" } }, closeBtn, /* @__PURE__ */ React.createElement("button", { onClick: () => setView("info"), style: { display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.textMute, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", padding: 0, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), p.brand), /* @__PURE__ */ React.createElement(Eyebrow, { T }, "Procedimientos con ", p.tipo.split(" ")[0]), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 400, fontSize: 26, color: T.text, lineHeight: 1.1, margin: "8px 0 4px" } }, "Qu\xE9 puedes ", /* @__PURE__ */ React.createElement("em", { style: { fontFamily: T.ital, fontStyle: "italic", color: T.accent } }, "realizar.")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 300, color: T.textMute, lineHeight: 1.6, marginBottom: 8 } }, "Todos los tratamientos que realizamos con ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text, fontWeight: 500 } }, p.brand), ". Toca uno para agendarlo."), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, procs.map((it) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: it.n,
      onClick: () => {
        onClose();
        openBooking && openBooking({ name: it.n, price: it.price });
      },
      style: { display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "13px 2px", cursor: "pointer", background: "transparent", border: "none", borderBottom: "1px solid " + T.lineSoft }
    },
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text, lineHeight: 1.25 } }, it.n), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 3 } }, it.t, " \xB7 ", it.d)),
    /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.text } }, D.fmt(it.price)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, marginTop: 2 } }, "Agendar \u2192"))
  ))), /* @__PURE__ */ React.createElement(PrimaryBtn, { T, full: true, icon: cardIcon, onClick: () => {
    onClose();
    openBooking && openBooking(null);
  } }, "Agendar con carrito"))));
}
function FeaturedCard({ T, f, onClick, D, openBooking }) {
  const [h, setH] = useState(false);
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: { display: "block", width: "100%", textAlign: "left", padding: 0, cursor: "pointer", background: T.surface, border: "1px solid " + T.line, borderRadius: 14, overflow: "hidden", boxShadow: h ? "0 26px 50px -26px rgba(40,38,30,.45)" : "0 14px 36px -24px rgba(40,38,30,.4)", transform: h ? "translateY(-4px)" : "none", transition: "transform .45s " + T.ease + ", box-shadow .45s " + T.ease }
    },
    /* @__PURE__ */ React.createElement("div", { style: { position: "relative", aspectRatio: "1/1", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("img", { src: f.img, alt: f.name, style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transform: h ? "scale(1.05)" : "scale(1)", transition: "transform .9s " + T.ease } }), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", right: 14, top: 14, fontFamily: T.sans, fontSize: 9.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#1A1A14", background: "#fff", borderRadius: 999, padding: "7px 14px", boxShadow: "0 4px 14px -4px rgba(0,0,0,.3)" } }, f.chip)),
    /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 20px 20px" } }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: T.serif, fontWeight: 400, fontSize: 27, letterSpacing: "-.01em", color: T.text } }, f.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 5 } }, f.sub, " \xB7 ", (f.zone || "").toLowerCase()), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.text } }, f.priceLabel), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.accent } }, "Ver ficha", /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 6l6 6-6 6" })))))
  );
}
function catPhoto(name, cat) {
  const s = ((name || "") + " " + (cat || "")).toLowerCase();
  const P = (n) => "assets/cat/page" + n + ".jpg";
  if (s.indexOf("c\xF3digo de barras") >= 0 || s.indexOf("codigo de barras") >= 0) return P(24);
  if (s.indexOf("bruxismo") >= 0) return P(12);
  if (s.indexOf("hiperhidrosis") >= 0) return P(13);
  if (s.indexOf("sonrisa gingival") >= 0) return P(20);
  if (s.indexOf("empedrado") >= 0) return P(21);
  if (s.indexOf("nefertiti") >= 0 || s.indexOf("rejuvenecimiento de cuello") >= 0) return P(19);
  if (s.indexOf("arco mandibular") >= 0) return P(17);
  if (s.indexOf("p\xF3mulos") >= 0 || s.indexOf("pomulos") >= 0) return P(18);
  if (s.indexOf("surcos") >= 0 || s.indexOf("marioneta") >= 0) return P(23);
  if (s.indexOf("proyecci\xF3n de ment\xF3n") >= 0 || s.indexOf("proyeccion de menton") >= 0 || s.indexOf("ment\xF3n") >= 0 || s.indexOf("menton") >= 0) return P(22);
  if (s.indexOf("rinomodel") >= 0 || s.indexOf("rinolips") >= 0) return P(9);
  if (s.indexOf("nctf") >= 0) return P(6);
  if (s.indexOf("salm\xF3n") >= 0 || s.indexOf("salmon") >= 0 || s.indexOf("rejuran") >= 0) return P(7);
  if (s.indexOf("quemador") >= 0 || s.indexOf("grasa") >= 0 || s.indexOf("lipol\xEDt") >= 0) return P(8);
  if (s.indexOf("manos") >= 0) return P(5);
  if (s.indexOf("bioestim") >= 0 || s.indexOf("sculptra") >= 0 || s.indexOf("col\xE1geno") >= 0 || s.indexOf("colageno") >= 0) return P(5);
  if (s.indexOf("mesoterap") >= 0 || s.indexOf("pink glow") >= 0) return P(4);
  if (s.indexOf("botox") >= 0 || s.indexOf("toxina") >= 0 || s.indexOf("zonas") >= 0 || s.indexOf("full face") >= 0) return P(3);
  if (s.indexOf("armoniz") >= 0 || s.indexOf("\xE1cido hialur\xF3nico") >= 0 || s.indexOf("acido hialuronico") >= 0) return P(9);
  return P(3);
}
function CatalogScreen({ T, D, go, openBooking, onBack }) {
  const [sec, setSec] = useState("Facial");
  const [q, setQ] = useState("");
  const [prodSheet, setProdSheet] = useState(null);
  const block = D.catalog.find((s) => s.sec === sec);
  const ql = q.trim().toLowerCase();
  const nProcs = totalProcs(D);
  const openFicha = (it, cat, ph) => go("ficha", { id: it.n, name: it.n, sub: it.t, priceLabel: D.fmt(it.price), price: it.price, desc: it.x, dur: it.d, img: ph, catalog: true });
  const searchGroups = ql ? (() => {
    const out = [];
    D.catalog.forEach((s) => (s.groups || []).forEach((g) => {
      const items = (g.items || []).filter((it) => it.n.toLowerCase().includes(ql) || (it.t || "").toLowerCase().includes(ql));
      if (items.length) out.push({ cat: s.sec === "Promociones" ? g.cat : g.cat + " \xB7 " + s.sec, g, items });
    }));
    return out;
  })() : [];
  const noResults = ql && searchGroups.length === 0;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ScreenTop, { T, eyebrow: "Cat\xE1logo completo \xB7 " + nProcs + " procedimientos", title: "Procedimientos", onBack }), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 20px" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.6", style: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" } }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4.3-4.3" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar tratamiento\u2026", style: {
    width: "100%",
    padding: "13px 14px 13px 40px",
    borderRadius: 10,
    border: "1px solid " + T.line,
    background: T.surface,
    color: T.text,
    fontFamily: T.sans,
    fontSize: 16,
    outline: "none"
  } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 4, flexWrap: "wrap" } }, D.catalog.map((s) => /* @__PURE__ */ React.createElement(Chip, { key: s.sec, T, active: sec === s.sec, onClick: () => setSec(s.sec) }, s.sec)), /* @__PURE__ */ React.createElement(Chip, { T, active: sec === "Productos", onClick: () => setSec("Productos") }, "Productos"))), ql ? noResults ? (
    /* clarify: estado vacío de búsqueda — explica qué pasó y ofrece la salida */
    /* @__PURE__ */ React.createElement("div", { style: { padding: "56px 30px 40px", textAlign: "center", animation: "jcFade .4s " + T.ease } }, /* @__PURE__ */ React.createElement("div", { style: { width: 54, height: 54, margin: "0 auto", borderRadius: "50%", background: T.surface2, border: "1px solid " + T.line, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.5" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4.3-4.3" }))), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: T.serif, fontWeight: 400, fontSize: 23, color: T.text, marginTop: 18, lineHeight: 1.15 } }, "Sin resultados"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.textMute, marginTop: 8, lineHeight: 1.6 } }, "No encontramos \u201C", q.trim(), "\u201D. Prueba con otro nombre o agenda una evaluaci\xF3n y lo vemos en consulta."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9, marginTop: 22 } }, /* @__PURE__ */ React.createElement(GhostBtn, { T, full: true, onClick: () => setQ("") }, "Limpiar b\xFAsqueda"), /* @__PURE__ */ React.createElement(PrimaryBtn, { T, full: true, onClick: () => openBooking && openBooking(null) }, "Agendar evaluaci\xF3n")))
  ) : /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 20px 20px" } }, searchGroups.map(({ cat, g, items }) => /* @__PURE__ */ React.createElement(Reveal, { key: cat, style: { marginTop: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, paddingBottom: 8, borderBottom: "1px solid " + T.line } }, cat), items.map((it) => {
    const ph = catPhoto(it.n, g.cat);
    return it.promo ? /* @__PURE__ */ React.createElement(PromoRow, { key: it.n, T, it, D, photo: ph, onClick: () => openFicha(it, g.cat, ph) }) : /* @__PURE__ */ React.createElement(CatRow, { key: it.n, T, it, D, photo: ph, onClick: () => openFicha(it, g.cat, ph), onAdd: () => openBooking && openBooking({ name: it.n, price: it.price }) });
  })))) : sec === "Productos" ? /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 20px 20px" } }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, paddingBottom: 8, borderBottom: "1px solid " + T.line } }, "Insumos certificados"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 300, color: T.textMute, lineHeight: 1.6, margin: "10px 0 2px" } }, "Con qu\xE9 trabajamos. Toca un producto para ver los procedimientos que se realizan con \xE9l."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginTop: 12 } }, (D.products || []).map((p, i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => setProdSheet(p), style: { textAlign: "left", padding: 0, cursor: "pointer", borderRadius: 14, overflow: "hidden", border: "1px solid " + T.line, background: T.surface, boxShadow: "0 10px 26px -18px rgba(40,38,30,.35)" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", aspectRatio: "4/3", background: T.surface2 } }, /* @__PURE__ */ React.createElement("img", { src: p.img, alt: p.brand, loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, onError: (e) => {
    e.target.style.display = "none";
  } }), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 8, top: 8, fontFamily: T.sans, fontSize: 7.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#fff", background: "rgba(20,20,15,.5)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 999, padding: "4px 8px" } }, p.origen)), /* @__PURE__ */ React.createElement("div", { style: { padding: "11px 13px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.text, lineHeight: 1.2 } }, p.brand), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, color: T.textMute, marginTop: 3 } }, p.tipo), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 9, fontFamily: T.sans, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent } }, "Ver procedimientos \u2192"))))))) : /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 20px 20px" } }, (block ? block.groups : []).map((g) => {
    const items = g.items.filter((it) => !ql || it.n.toLowerCase().includes(ql) || it.t.toLowerCase().includes(ql));
    if (!items.length) return null;
    return /* @__PURE__ */ React.createElement(Reveal, { key: g.cat, style: { marginTop: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, paddingBottom: 8, borderBottom: "1px solid " + T.line } }, g.cat), items.map((it) => {
      const ph = catPhoto(it.n, g.cat);
      return it.promo ? /* @__PURE__ */ React.createElement(PromoRow, { key: it.n, T, it, D, photo: ph, onClick: () => openFicha(it, g.cat, ph) }) : /* @__PURE__ */ React.createElement(CatRow, { key: it.n, T, it, D, photo: ph, onClick: () => openFicha(it, g.cat, ph), onAdd: () => openBooking && openBooking({ name: it.n, price: it.price }) });
    }));
  })), prodSheet && /* @__PURE__ */ React.createElement(ProductSheet, { T, D, p: prodSheet, onClose: () => setProdSheet(null), openBooking }));
}
function CatRow({ T, it, onClick, D, photo, onAdd }) {
  const [h, setH] = useState(false);
  const [added, setAdded] = useState(false);
  const tRef = useRef(null);
  useEffect(() => () => {
    if (tRef.current) clearTimeout(tRef.current);
  }, []);
  function handleAdd(e) {
    e.stopPropagation();
    setAdded(true);
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setAdded(false), 700);
    onAdd && onAdd();
  }
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: { display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", padding: "14px 4px", cursor: "pointer", background: h ? T.surface : "transparent", border: "none", borderBottom: "1px solid " + T.lineSoft, transition: "background .2s" }
    },
    /* @__PURE__ */ React.createElement("div", { style: { width: 58, height: 58, flexShrink: 0, borderRadius: 10, overflow: "hidden", border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("img", { src: photo, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, loading: "lazy" })),
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text } }, it.n), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".04em", color: T.textMute, marginTop: 4 } }, it.t, " \xB7 ", it.d)),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, D.fmt(it.price)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent, marginTop: 2 } }, "Ver ficha \u2192")), /* @__PURE__ */ React.createElement(
      "span",
      {
        role: "button",
        title: added ? "Agregado" : "Agregar al carrito",
        "aria-label": added ? "Agregado al carrito" : "Agregar al carrito",
        onClick: handleAdd,
        style: {
          width: 44,
          height: 44,
          borderRadius: 13,
          flexShrink: 0,
          background: added ? T.gold : T.accentSoft || T.chipBg,
          border: "1px solid " + (added ? T.gold : T.chipBorder),
          color: added ? T.onAccent || "#fff" : T.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transform: added ? "scale(1.12)" : "scale(1)",
          transition: "transform .35s cubic-bezier(.22,1,.36,1), background .25s, color .25s, border-color .25s"
        }
      },
      added ? /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" })) : /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "21", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "18", cy: "21", r: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" }), /* @__PURE__ */ React.createElement("path", { d: "M16 5v4M14 7h4" }))
    ))
  );
}
function PromoRow({ T, it, onClick, D, photo }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, style: { display: "block", width: "100%", textAlign: "left", padding: "4px 12px", cursor: "pointer", marginTop: 8, background: "linear-gradient(180deg, " + (T.accentSoft || "rgba(84,112,127,.12)") + ", transparent)", border: "1px solid rgba(84,112,127,.25)", borderRadius: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13, padding: "10px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 58, height: 58, flexShrink: 0, borderRadius: 10, overflow: "hidden", border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("img", { src: photo, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, loading: "lazy" })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.25 } }, it.n), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 4 } }, it.t), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", background: "linear-gradient(90deg,#b88a3e,#e3c372 55%,#b88a3e)", borderRadius: 999, padding: "3px 9px", marginTop: 6 } }, "Ahorra ", D.fmt(it.save))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, D.fmt(it.price)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent, marginTop: 3 } }, "Ver ficha \u2192"))));
}
function FichaScreen({ T, D, proc, go, openBooking }) {
  const featured = D.featured.find((f) => f.id === proc.id);
  const data = featured || proc;
  const rf = window.resultFilterFor ? window.resultFilterFor(data.name) : "Todos";
  const resultBA = D.beforeAfter.find((b) => b.t === rf) || D.beforeAfter.find((b) => ((b.proc || "") + " " + (b.t || "")).toLowerCase().indexOf((data.name || "").toLowerCase().split(" ")[0]) >= 0);
  const hasResults = !!resultBA;
  const photo = resultBA && resultBA.img || featured && featured.photo || featured && featured.img || proc.img || null;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 20px 0" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => go("back"), style: { display: "inline-flex", alignItems: "center", gap: 6, background: T.dark ? "rgba(255,255,255,.08)" : "rgba(20,20,15,.05)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid " + T.line, cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", padding: "12px 14px 12px 12px", minHeight: 44, borderRadius: 999 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), "Volver")), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 20px 0" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, fontWeight: 400, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent } }, data.sub), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 42, letterSpacing: "-.02em", color: T.text, marginTop: 10, lineHeight: 1 } }, data.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 24, color: T.text } }, data.priceLabel), /* @__PURE__ */ React.createElement("button", { onClick: () => openBooking({ name: data.name, price: data.price }), title: "Agregar al carrito y agendar", style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.onAccent, background: T.gold, border: "none", borderRadius: 999, padding: "8px 13px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "21", r: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "18", cy: "21", r: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" }), /* @__PURE__ */ React.createElement("path", { d: "M16 5v4M14 7h4" })), "Agregar")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.8, color: T.textMute, marginTop: 16 } }, data.desc), data.facts && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", marginTop: 26, paddingTop: 20, borderTop: "1px solid " + T.line } }, data.facts.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, paddingRight: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text } }, f[0]), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, marginTop: 4 } }, f[1])))), data.dur && !data.facts && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 22, paddingTop: 18, borderTop: "1px solid " + T.line, fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Duraci\xF3n estimada \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: T.text } }, data.dur)), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 22, lineHeight: 1.6 } }, "Caso real publicado con consentimiento. Los resultados var\xEDan seg\xFAn cada paciente y su evaluaci\xF3n cl\xEDnica.")), photo && /* @__PURE__ */ React.createElement("div", { style: { margin: "20px 20px 0", borderRadius: 14, overflow: "hidden", border: "1px solid " + T.line, position: "relative" } }, /* @__PURE__ */ React.createElement("img", { src: photo, alt: data.name, style: { width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" } }), hasResults && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", right: 12, top: 12, fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "#F2EDE6", background: "rgba(10,10,10,.6)", border: "1px solid rgba(242,237,230,.25)", borderRadius: 999, padding: "6px 11px" } }, "Resultado real")), /* @__PURE__ */ React.createElement("div", { style: { position: "sticky", bottom: 0, padding: "16px 20px", marginTop: 24, background: T.navBg, backdropFilter: "blur(14px)", borderTop: "1px solid " + T.line, display: "flex", flexDirection: "column", gap: 9 } }, /* @__PURE__ */ React.createElement(PrimaryBtn, { T, full: true, icon: cardIcon, onClick: () => openBooking({ name: data.name, price: data.price }) }, "Agendar este tratamiento"), hasResults && /* @__PURE__ */ React.createElement(GhostBtn, { T, full: true, onClick: () => go("antes", { name: data.name }) }, "Ver m\xE1s resultados \u2192")));
}
Object.assign(window, { Eyebrow, Chip, PrimaryBtn, GhostBtn, Reveal, ScreenTop, StickyBack, cardIcon, HomeScreen, FeaturedCard, CatalogScreen, CatRow, PromoRow, FichaScreen, ProductSheet });
