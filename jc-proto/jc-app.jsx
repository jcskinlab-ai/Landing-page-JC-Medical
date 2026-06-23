/* ═══════════════ JC MEDICAL · APP SHELL ═══════════════ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "clinico",
  "accent": "default",
  "bookingFlow": "guiado",
  "copyTone": "calido",
  "animations": true
}/*EDITMODE-END*/;

const ACCENTS = {
  default: null,
  oro: "#B9C2CB",
  vino: "#C0285A",
  pizarra: "#6A8296"
};

function navIcon(name, stroke) {
  const p = {
    home: <path d="M3 11l9-8 9 8M5 10v10h14V10" />,
    cat: <path d="M4 6h16M4 12h16M4 18h10" />,
    feed: <><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="3.4" /><circle cx="17.5" cy="6.5" r="1" fill={stroke} /></>,
    contact: <path d="M21 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
    panel: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
    asistente: <><path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z" /><circle cx="9" cy="11.5" r=".8" fill={stroke} /><circle cx="12" cy="11.5" r=".8" fill={stroke} /><circle cx="15" cy="11.5" r=".8" fill={stroke} /></>,
    juegos: <><rect x="2" y="6" width="20" height="12" rx="4" /><path d="M7 10v4M5 12h4" /><circle cx="16" cy="11" r="1" fill={stroke} /><circle cx="18.5" cy="14" r="1" fill={stroke} /></>,
    perfil: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20a7 7 0 0 1 14 0" /></>
  }[name];
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
}

const TABS = [
  { k: "home", l: "Inicio", icon: "home" },
  { k: "catalogo", l: "Catálogo", icon: "cat" },
  { k: "feed", l: "Feed", icon: "feed" },
  { k: "asistente", l: "Asistente", icon: "asistente" },
  { k: "juegos", l: "Juegos", icon: "juegos" }
];

function App() {
  const t = { theme: "clinico", bookingFlow: "guiado", copyTone: "calido", animations: true };
  const T = JCTHEME[t.theme] || JCTHEME.editorial;
  const D = window.JCDATA;
  const anim = t.animations;

  const [tab, setTab] = useState("home");
  const [sub, setSub] = useState(null); // {type:'ficha'|'antes', proc}
  const [booking, setBooking] = useState(null); // {proc} or false
  const [feedNonce, setFeedNonce] = useState(0);
  const scrollRef = useRef(null);
  const prevTab = useRef("home"); // pestaña anterior para "volver"
  const [evalForm, setEvalForm] = useState(false); // formulario simple de evaluación → WhatsApp
  const [scrolled, setScrolled] = useState(false); // ¿se pasó el hero? → barra/dashboard pasan a paleta clara
  const scrollMem = useRef({});   // recuerda el scroll de cada pantalla
  const curKey = useRef("home");
  const progRef = useRef(null);   // barra de progreso de lectura (firma "Marfil Clínico")
  function saveScroll() { if (scrollRef.current) scrollMem.current[curKey.current] = scrollRef.current.scrollTop; }
  function onScroll(e) {
    const el = e.currentTarget, max = el.scrollHeight - el.clientHeight;
    if (progRef.current) progRef.current.style.transform = "scaleX(" + (max > 0 ? el.scrollTop / max : 0) + ")";
    const sc = el.scrollTop > el.clientHeight * 0.62;
    setScrolled(prev => prev === sc ? prev : sc);
  }

  function go(name, payload) {
    if (name === "back") { saveScroll(); setSub(null); return; }
    saveScroll();
    if (name === "ficha") { setSub({ type: "ficha", proc: payload }); }
    else if (name === "antes") { setSub({ type: "antes", proc: payload || null }); }
    else { if (name !== tab) prevTab.current = tab; setTab(name); setSub(null); }
  }
  function openBooking(proc) { setBooking({ proc: proc }); }
  function smoothTop() {
    const el = scrollRef.current; if (!el) return;
    const start = el.scrollTop, t0 = performance.now(), dur = 420;
    if ((window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) || start <= 0) { el.scrollTop = 0; return; }
    const step = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.scrollTop = Math.round(start * (1 - e)); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  function goTab(k) {
    // Si ya estás en esa pestaña (sin detalle abierto), un segundo toque sube al inicio con scroll automático.
    if (k === tab && !sub) { smoothTop(); scrollMem.current[k] = 0; setScrolled(false); return; }
    saveScroll(); if (k !== tab) prevTab.current = tab; if (k === "feed") setFeedNonce(n => n + 1); setTab(k); setSub(null);
  }
  function goBack() { goTab(prevTab.current || "home"); }

  let screen;
  if (sub && sub.type === "ficha") screen = <FichaScreen T={T} D={D} proc={sub.proc} go={go} openBooking={openBooking} />;
  else if (sub && sub.type === "antes") screen = <AntesScreen T={T} D={D} go={go} openBooking={openBooking} proc={sub.proc} />;
  else if (tab === "home") screen = <HomeScreen T={T} D={D} go={go} openBooking={openBooking} tone={t.copyTone} />;
  else if (tab === "catalogo") screen = <CatalogScreen T={T} D={D} go={go} openBooking={openBooking} onBack={goBack} />;
  else if (tab === "feed") screen = <FeedHubScreen T={T} D={D} go={go} openBooking={openBooking} onBack={goBack} />;
  else if (tab === "contacto") screen = <ContactScreen T={T} D={D} go={go} openBooking={openBooking} onBack={goBack} />;
  else if (tab === "asistente") screen = <AssistantScreen T={T} D={D} openBooking={openBooking} onBack={goBack} />;
  else if (tab === "juegos") screen = <GamesScreen T={T} go={go} onBack={goBack} />;
  else if (tab === "perfil") screen = <ProfileScreen T={T} D={D} go={go} onBack={goBack} />;
  else if (tab === "panel") screen = <PanelScreen T={T} D={D} />;

  const screenKey = sub ? sub.type + (sub.proc ? sub.proc.id || sub.proc.name : "") : (tab === "feed" ? "feed" + feedNonce : tab);
  // Restaura el scroll de la pantalla a la que se entra (al volver, regresa donde estabas).
  useEffect(() => { const el = scrollRef.current; if (!el) return; el.scrollTop = (scrollMem.current[screenKey] != null ? scrollMem.current[screenKey] : 0); curKey.current = screenKey; if (progRef.current) { const max = el.scrollHeight - el.clientHeight; progRef.current.style.transform = "scaleX(" + (max > 0 ? el.scrollTop / max : 0) + ")"; } setScrolled(el.scrollTop > el.clientHeight * 0.62); }, [screenKey]);

  const onHome = tab === "home" && !sub;
  const heroMode = onHome && !scrolled;        // hero oscuro visible → barra/dashboard oscuros
  const navDark = heroMode || T.dark;          // dashboard inferior oscuro mientras el hero domina
  const navIdx = sub ? -1 : TABS.findIndex(t => t.k === tab);  // índice para el indicador deslizante
  const padTop = onHome ? 0 : "calc(52px + env(safe-area-inset-top))";
  return (
    <div className="jc-stage" style={{ background: T.dark ? "#070707" : "#DCD7CC" }}>
      <div className="jc-app-frame" style={{ background: T.bg, boxShadow: T.shadow, color: T.text }}>
        {/* barra de progreso de lectura (acento → oro) */}
        <div ref={progRef} style={{ position: "absolute", top: 0, left: 0, height: 2, width: "100%", transform: "scaleX(0)", transformOrigin: "left", zIndex: 40, background: "linear-gradient(90deg," + T.accent + "," + T.gold + ")", transition: "transform .08s linear", pointerEvents: "none" }} />
        {/* top bar fino (overlay con fade) */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 8, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "calc(11px + env(safe-area-inset-top)) 16px 11px",
          background: heroMode ? "linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,0))" : T.navBg,
          borderBottom: heroMode ? "1px solid transparent" : "1px solid " + T.line, backdropFilter: heroMode ? "none" : "blur(14px)", WebkitBackdropFilter: heroMode ? "none" : "blur(14px)", transition: "background .35s " + T.ease + ", border-color .35s " + T.ease }}>
          <a href={"https://instagram.com/jcmedical.cl"} target="_blank" rel="noopener" title="Instagram" aria-label="Instagram de JC Medical" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 999, border: "1px solid " + (heroMode ? "rgba(242,237,230,.4)" : T.chipBorder), color: heroMode ? "#F2EDE6" : T.text, textDecoration: "none", transition: "color .35s " + T.ease + ", border-color .35s " + T.ease }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
          </a>
          <button onClick={() => goTab("perfil")} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 10, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: heroMode ? "#F2EDE6" : T.text, background: heroMode ? "rgba(0,0,0,.3)" : T.chipBg, border: "1px solid " + (heroMode ? "rgba(242,237,230,.35)" : T.chipBorder), borderRadius: 999, padding: "10px 14px", minHeight: 44, cursor: "pointer", transition: "color .35s " + T.ease + ", background .35s " + T.ease + ", border-color .35s " + T.ease }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
            {tab === "perfil" ? "Mi cuenta" : "Ingresar a mi cuenta"}
          </button>
        </div>

        {tab === "asistente" && !sub ? (
          /* El asistente es un chat con scroll propio: ocupa la altura disponible y desplaza su conversación internamente (no usa el scroll general) */
          <div style={{ flex: 1, minHeight: 0, paddingTop: padTop, paddingBottom: "calc(72px + env(safe-area-inset-bottom))" }}>{screen}</div>
        ) : (
          /* scroll area · deja aire abajo para que la barra glass flote sobre el contenido sin taparlo */
          <div ref={scrollRef} onScroll={onScroll} className="jc-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingTop: padTop }}>
            <div key={screenKey} style={{ ...(onHome ? { height: "100%" } : null), ...(anim ? { animation: "jcFade .34s " + T.ease } : null) }}>{screen}</div>
            <div style={{ height: 78 }} />
          </div>
        )}

        {/* Botón flotante · glass. Abre el formulario de agenda con carrito. Oculto en el Asistente para no tapar el enviar. */}
        {!booking && !evalForm && tab !== "asistente" && (
          <button onClick={() => openBooking(null)} title="Agendar — carrito y formulario" aria-label="Agendar"
            style={{ position: "absolute", right: 16, bottom: 90, zIndex: 30, width: 52, height: 52, borderRadius: "50%", background: "rgba(31,138,91,.16)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.35)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,.22)", cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.92)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4"/></svg>
          </button>
        )}

        {/* bottom tabs · barra glass flotante sobre el contenido (estilo IG): solo íconos, activo con highlight */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 20, padding: "0 12px", paddingBottom: "calc(9px + env(safe-area-inset-bottom))", pointerEvents: "none" }}>
          <div style={{ pointerEvents: "auto", position: "relative", display: "flex", alignItems: "center", gap: 0, background: navDark ? "rgba(16,19,26,.5)" : "rgba(255,255,255,.5)", backdropFilter: "blur(22px) saturate(1.3)", WebkitBackdropFilter: "blur(22px) saturate(1.3)", border: "1px solid " + (navDark ? "rgba(255,255,255,.10)" : "rgba(20,20,15,.07)"), borderRadius: 30, padding: "5px 7px", boxShadow: "0 10px 30px -10px rgba(0,0,0,.5)", transition: "background .35s " + T.ease + ", border-color .35s " + T.ease }}>
            {/* indicador deslizante bajo la pestaña activa */}
            <div style={{ position: "absolute", top: 5, bottom: 5, left: 7, width: "calc((100% - 14px) / " + TABS.length + ")", borderRadius: 20, background: navDark ? "rgba(242,237,230,.14)" : "rgba(20,20,15,.08)", transform: "translateX(" + (Math.max(0, navIdx) * 100) + "%)", opacity: navIdx < 0 ? 0 : 1, transition: "transform .42s " + T.ease + ", opacity .3s, background .35s " + T.ease, zIndex: 0, pointerEvents: "none" }} />
            {TABS.map(tb => {
              const active = tab === tb.k && !sub;
              const isJuegos = tb.k === "juegos";
              const iconColor = active ? (navDark ? "#F2EDE6" : T.text) : (isJuegos ? T.gold : (navDark ? "rgba(242,237,230,.5)" : T.textFaint));
              return (
                <button key={tb.k} onClick={() => goTab(tb.k)} title={tb.l} aria-label={tb.l} aria-current={active ? "page" : undefined} style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, padding: "9px 0 7px", borderRadius: 20, border: "none", cursor: "pointer", background: "transparent", transition: "transform .15s " + T.ease }}>
                  {navIcon(tb.icon, iconColor)}
                  <span style={{ fontFamily: T.sans, fontSize: 8, letterSpacing: ".05em", textTransform: "uppercase", color: iconColor, lineHeight: 1, transition: "color .35s " + T.ease, pointerEvents: "none" }}>{tb.l}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* formulario simple de evaluación → WhatsApp */}
        {evalForm && <EvalForm T={T} D={D} onClose={() => setEvalForm(false)} />}
        {/* booking overlay */}
        {booking && <BookingFlow T={T} D={D} initialProc={booking.proc} mode={t.bookingFlow} onClose={() => setBooking(null)} onAskAssistant={() => { setBooking(null); goTab("asistente"); }} />}
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
