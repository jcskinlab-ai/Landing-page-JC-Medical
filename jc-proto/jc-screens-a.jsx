/* ═══════════ JC · ATOMS + HOME / CATÁLOGO / FICHA ═══════════ */

/* ─────────── Atoms ─────────── */
function Eyebrow({ T, children, center }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, justifyContent: center ? "center" : "flex-start" }}>
      <span style={{ width: 22, height: 1, background: T.gold }}></span>
      <span style={{ fontFamily: T.sans, fontSize: 9.5, fontWeight: 400, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent }}>{children}</span>
    </div>
  );
}

function Chip({ T, children, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 500,
      padding: "9px 15px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", minHeight: 44,
      background: active ? T.text : T.chipBg, color: active ? T.bg : T.textMute,
      border: "1px solid " + (active ? T.text : T.chipBorder), transition: "all .25s " + T.ease
    }}>{children}</button>
  );
}

function PrimaryBtn({ T, children, onClick, full, icon }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, width: full ? "100%" : "auto",
        fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase",
        padding: "15px 26px", borderRadius: 3, cursor: "pointer", minHeight: 44,
        background: h ? "transparent" : T.primaryBg, color: h ? T.text : T.primaryText,
        border: "1px solid " + (T.dark ? T.primaryBg : T.primaryBg), transition: "all .28s " + T.ease
      }}>{icon}{children}</button>
  );
}

function GhostBtn({ T, children, onClick, full }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: full ? "100%" : "auto",
        fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase",
        padding: "15px 26px", borderRadius: 3, cursor: "pointer", minHeight: 44, background: "transparent",
        color: h ? T.text : T.textMute, border: "1px solid " + (h ? T.text : T.chipBorder), transition: "all .28s " + T.ease
      }}>{children}</button>
  );
}

// Aparición por scroll (fade + subida). Reutilizable; respeta prefers-reduced-motion.
function Reveal({ children, delay, style }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (typeof IntersectionObserver === "undefined" || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) { setSeen(true); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }), { threshold: .12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const ease = "cubic-bezier(.22,1,.36,1)";
  return (
    <div ref={ref} style={{ ...(style || {}), opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(24px)", transition: "opacity .75s " + ease + " " + (delay || 0) + "s, transform .75s " + ease + " " + (delay || 0) + "s" }}>{children}</div>
  );
}

function ScreenTop({ T, title, eyebrow, onBack }) {
  return (
    <div style={{ padding: "22px 20px 14px" }}>
      {onBack && (
        <button onClick={onBack} style={{ display: "flex", width: "fit-content", alignItems: "center", gap: 6, background: T.dark ? "rgba(255,255,255,.08)" : "rgba(20,20,15,.05)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid " + T.line, cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 16, padding: "12px 14px 12px 12px", minHeight: 44, borderRadius: 999 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 18l-6-6 6-6" /></svg>
          Volver
        </button>
      )}
      {eyebrow && <Eyebrow T={T}>{eyebrow}</Eyebrow>}
      {title && <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 38, lineHeight: 1.02, letterSpacing: "-.02em", color: T.text, marginTop: eyebrow ? 12 : 0 }}>{title}</h1>}
    </div>
  );
}

// Botón "Volver" que queda fijo arriba al hacer scroll (glass). Para feeds largos (noticias/videos).
function StickyBack({ T, onBack, label }) {
  return (
    <div style={{ position: "sticky", top: 8, zIndex: 14, padding: "8px 16px 4px", pointerEvents: "none" }}>
      <button onClick={onBack} style={{ pointerEvents: "auto", display: "inline-flex", width: "fit-content", alignItems: "center", gap: 6, background: T.dark ? "rgba(16,19,26,.62)" : "rgba(255,255,255,.62)", backdropFilter: "blur(16px) saturate(1.3)", WebkitBackdropFilter: "blur(16px) saturate(1.3)", border: "1px solid " + (T.dark ? "rgba(255,255,255,.12)" : "rgba(20,20,15,.1)"), cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", padding: "12px 15px 12px 13px", minHeight: 44, borderRadius: 999, boxShadow: "0 6px 18px -8px rgba(0,0,0,.4)" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>{label || "Volver"}
      </button>
    </div>
  );
}

const cardIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
);

/* clarify: cuenta real de procedimientos del catálogo (sin "22" escrito a mano).
   Excluye Promociones (son combos, no procedimientos nuevos) y deduplica por nombre. */
function totalProcs(D) {
  try {
    const seen = new Set();
    (D.catalog || []).forEach(s => {
      if (s.sec === "Promociones") return;
      (s.groups || []).forEach(g => (g.items || []).forEach(it => { if (!it.promo && it.n) seen.add(it.n); }));
    });
    return seen.size || 22;
  } catch (e) { return 22; }
}

/* ─────────── HOME ─────────── */
function HomeScreen({ T, D, go, openBooking, tone }) {
  const nProcs = totalProcs(D);
  const [prodSheet, setProdSheet] = useState(null);
  const [baLight, setBaLight] = useState(null); // lightbox de caso real (foto completa al click)
  const lead = tone === "clinico"
    ? "Rejuvenecimiento y armonización facial con criterio clínico. Resultados sutiles que se notan, pero no se delatan."
    : "Vuelve a verte como te sientes: descansada, fresca y natural. Sin exageraciones, con la seguridad de un enfermero especialista que cuida cada detalle.";
  const ctaText = tone === "clinico"
    ? "Tu primera evaluación define un diagnóstico claro y un plan a tu medida. Cupos limitados cada semana."
    : "Reserva tu evaluación y conversemos sobre lo que te gustaría mejorar. Sin compromiso y con un plan pensado solo para ti.";
  // El hero se mantiene oscuro/inmersivo (paleta editorial); al desplazar, el resto de la página usa la paleta clara.
  const heroT = (window.JCTHEME && window.JCTHEME.editorial) || T;
  return (
    <div style={{ height: "100%" }}>
      {/* Hero — ocupa exactamente el alto del marco; al desplazar pasa de inmediato a tratamientos */}
      <div style={{ position: "relative", overflow: "hidden", height: "100%", minHeight: 520, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <img src="assets/jc-hero-v2.png" alt="" fetchpriority="high" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,13,13,.58) 0%, rgba(13,13,13,.34) 28%, rgba(13,13,13,.66) 56%, rgba(13,13,13,.97) 100%)" }} />
        <div style={{ position: "relative", padding: "0 22px 96px" }}>
          <Eyebrow T={heroT}>Medicina estética · Talca</Eyebrow>
          <h1 style={{ fontFamily: heroT.serif, fontWeight: 300, fontSize: 50, lineHeight: .98, letterSpacing: "-.025em", color: "#F5F2EC", marginTop: 12, textShadow: "0 2px 18px rgba(0,0,0,.6)" }}>
            La naturalidad<br />también es una<br /><em style={{ fontFamily: heroT.ital, fontStyle: "italic", color: "#DCE3E8", textShadow: "0 2px 18px rgba(0,0,0,.65)" }}>técnica.</em>
          </h1>
          <p style={{ fontFamily: heroT.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "rgba(245,242,236,.94)", marginTop: 16, maxWidth: 360, textShadow: "0 1px 10px rgba(0,0,0,.6)" }}>
            {lead}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <PrimaryBtn T={heroT} onClick={() => openBooking(null)}>Agendar evaluación</PrimaryBtn>
            <GhostBtn T={heroT} onClick={() => go("catalogo")}>Ver tratamientos</GhostBtn>
          </div>
          <div style={{ fontFamily: heroT.sans, fontSize: 10, color: "rgba(245,242,236,.5)", marginTop: 6, textAlign: "center" }}>Reserva con abono de $15.000 · resto se paga en clínica</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 26, color: "rgba(245,242,236,.6)", animation: "jcBounce 1.8s infinite" }}>
            <span style={{ fontFamily: heroT.sans, fontSize: 9, letterSpacing: ".24em", textTransform: "uppercase" }}>Desliza</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>
      </div>

      {/* Tratamientos destacados (encabezado estilo imagen 2) */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, padding: "26px 20px 6px" }}>
        <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 30, lineHeight: 1.05, letterSpacing: "-.01em", color: T.text }}>Tratamientos destacados</h2>
        <button onClick={() => go("catalogo")} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.accent, whiteSpace: "nowrap" }}>Ver catálogo</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "16px 20px 0" }}>
        {D.featured.map((f, i) => <Reveal key={f.id} delay={i * 0.07}><FeaturedCard T={T} f={f} onClick={() => go("ficha", f)} D={D} openBooking={openBooking} /></Reveal>)}
      </div>
      <div style={{ padding: "22px 20px 0" }}>
        <div style={{ borderRadius: 4, animation: "jcAttn 2.2s " + T.ease + " infinite" }}>
          <GhostBtn T={T} full onClick={() => go("catalogo")}>{"Ver catálogo completo — " + nProcs + " procedimientos →"}</GhostBtn>
        </div>
      </div>

      {/* Antes/después preview */}
      <div style={{ padding: "48px 20px 14px" }}>
        <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 32, letterSpacing: "-.02em", color: T.text }}>
          Casos reales, <em style={{ fontFamily: T.ital, fontStyle: "italic", color: T.accent }}>sin retoque.</em>
        </h2>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "0 20px", overflowX: "auto", scrollSnapType: "x mandatory" }}>
        {D.beforeAfter.map(b => (
          <button key={b.id} onClick={() => setBaLight(b)} title={"Ver resultado: " + b.t} aria-label={"Ver resultado real: " + b.t}
            style={{ flex: "0 0 30%", scrollSnapAlign: "start", padding: 0, background: T.surface2, cursor: "pointer", borderRadius: 12, overflow: "hidden", position: "relative", border: "1px solid " + T.line }}>
            <img src={b.img} alt={b.t} loading="lazy" decoding="async" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
          </button>
        ))}
      </div>
      {baLight && (
        <div onClick={() => setBaLight(null)} style={{ position: "absolute", inset: 0, zIndex: 70, background: "rgba(8,8,8,.92)", backdropFilter: "blur(4px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 18 }}>
          <button onClick={() => setBaLight(null)} aria-label="Cerrar" style={{ position: "absolute", top: 16, right: 16, width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.3)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
          <img src={baLight.img} alt={baLight.t} style={{ maxWidth: "100%", maxHeight: "82%", objectFit: "contain", borderRadius: 12, boxShadow: "0 30px 70px -20px rgba(0,0,0,.8)" }} />
          <div style={{ marginTop: 14, textAlign: "center" }}>
            <div style={{ fontFamily: T.serif, fontSize: 18, color: "#fff" }}>{baLight.t}</div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: "rgba(255,255,255,.7)", marginTop: 3 }}>{baLight.note || "Caso real con consentimiento"}</div>
          </div>
        </div>
      )}

      {/* Contacto CTA · "Tu evaluación comienza aquí" */}
      <Reveal style={{ margin: "48px 20px 0", padding: "40px 26px", background: T.surface, border: "1px solid " + T.line, borderRadius: 14, textAlign: "center", boxShadow: "0 18px 44px -26px rgba(40,38,30,.4)" }}>
        <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 34, letterSpacing: "-.02em", color: T.text, lineHeight: 1.05 }}>
          Tu evaluación<br />comienza <em style={{ fontFamily: T.ital, fontStyle: "italic", color: T.accent }}>aquí.</em>
        </h2>
        <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.textMute, marginTop: 14, lineHeight: 1.7 }}>
          {ctaText}
        </p>
        <div style={{ marginTop: 22 }}>
          <PrimaryBtn T={T} full icon={cardIcon} onClick={() => openBooking(null)}>Agendar evaluación</PrimaryBtn>
          <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 6, textAlign: "center" }}>Reserva con abono de $15.000 · resto se paga en clínica</div>
        </div>

        {/* Ubicación + contacto */}
        <div style={{ marginTop: 26, borderRadius: 10, overflow: "hidden", border: "1px solid " + T.line, textAlign: "left" }}>
          <iframe title="Ubicación JC Medical" src={D.contact.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ width: "100%", height: 150, border: 0, display: "block", filter: T.dark ? "invert(.92) hue-rotate(180deg)" : "none" }} />
          <div style={{ padding: "14px 16px", background: T.bg }}>
            <a href={D.contact.mapsLink} target="_blank" rel="noopener" style={{ display: "block", textDecoration: "none" }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{D.contact.address}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>{D.contact.region} · Ver en Google Maps ↗</div>
            </a>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 3 }}>
              {D.contact.hours.map((h, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 11.5 }}>
                  <span style={{ color: T.textMute }}>{h[0]}</span><span style={{ color: T.text }}>{h[1]}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <a href={"https://wa.me/" + D.wa + "?text=" + encodeURIComponent("Hola, quiero agendar mi evaluación en JC Medical.")} target="_blank" rel="noopener" style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: "#1F8A5B", background: "transparent", border: "1px solid rgba(31,138,91,.5)", borderRadius: 8, padding: "10px", textDecoration: "none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1F8A5B"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" /></svg>WhatsApp
              </a>
              <a href={"https://instagram.com/" + (D.contact.ig || "").replace(/^@/, "")} target="_blank" rel="noopener" style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: T.text, background: "transparent", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "10px", textDecoration: "none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>Instagram
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Profesional + disclaimer (cierre de la zona de evaluación) */}
      <Reveal style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 20px 0", padding: "16px 18px", background: T.surface2, border: "1px solid " + T.lineSoft, borderRadius: 14 }}>
        <img src="assets/jc-pro.jpg" alt={D.contact.pro} onError={e => { e.target.style.display = "none"; }} style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", flexShrink: 0, background: T.bg }} />
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{D.contact.pro}</div>
          <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{D.contact.role}</div>
        </div>
      </Reveal>
      <div style={{ textAlign: "center", padding: "26px 30px 0", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".04em", color: T.textFaint, lineHeight: 1.6 }}>
        Casos reales publicados con consentimiento. Los resultados varían según cada paciente y su evaluación clínica.
      </div>

      {prodSheet && <ProductSheet T={T} D={D} p={prodSheet} onClose={() => setProdSheet(null)} openBooking={openBooking} />}
    </div>
  );
}

/* Procedimientos del catálogo que se realizan con un producto/marca dado. */
function proceduresForProduct(p, D) {
  const tipo = (p.tipo || "").toLowerCase();
  let cats;
  if (tipo.indexOf("toxina") >= 0) cats = ["toxina"];
  else if (tipo.indexOf("bioestim") >= 0 || tipo.indexOf("colág") >= 0 || tipo.indexOf("colag") >= 0 || tipo.indexOf("plla") >= 0) cats = ["bioestim"];
  else cats = ["armoniz", "mesoterap", "regener"]; // ácido hialurónico → armonización + meso/regeneración
  const out = [];
  ((D && D.catalog) || []).forEach(sec => {
    if (sec.sec === "Promociones") return;
    (sec.groups || []).forEach(g => {
      const gc = (g.cat || "").toLowerCase();
      if (cats.some(c => gc.indexOf(c) >= 0)) (g.items || []).forEach(it => out.push(it));
    });
  });
  return out;
}

/* Ficha de producto (marca) + procedimientos disponibles con ese producto. */
function ProductSheet({ T, p, onClose, openBooking, D }) {
  const [view, setView] = useState("info");
  const procs = view === "procs" ? proceduresForProduct(p, D) : [];
  const Row = ({ label, children }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 5 }}>{label}</div>
      <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
  const closeBtn = (
    <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,.5)", border: "1px solid rgba(242,237,230,.35)", color: "#F2EDE6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
  );
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 60, background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} className="jc-scroll" style={{ width: "100%", maxHeight: "92%", overflowY: "auto", background: T.bg, borderRadius: "18px 18px 0 0", border: "1px solid " + T.line }}>
        {view === "info" ? (
          <div>
            <div style={{ position: "relative" }}>
              <img src={p.img} alt={p.brand} onError={e => { e.target.style.display = "none"; }} style={{ width: "100%", height: 200, objectFit: "cover", display: "block", borderRadius: "18px 18px 0 0" }} />
              {closeBtn}
            </div>
            <div style={{ padding: "20px 22px 26px" }}>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent }}>{p.tipo}</div>
              <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 28, color: T.text, lineHeight: 1.1, margin: "6px 0 14px" }}>{p.brand}</h2>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                <div style={{ flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "11px 13px" }}><div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 3 }}>Origen</div><div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{p.origen}</div></div>
                <div style={{ flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "11px 13px" }}><div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 3 }}>Fabricante</div><div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{p.fabricante}</div></div>
              </div>
              <Row label="Modo de uso">{p.uso}</Row>
              <Row label="Beneficios">{p.beneficios}</Row>
              <Row label="Efectos secundarios">{p.efectos}</Row>
              <PrimaryBtn T={T} full onClick={() => setView("procs")}>Ver procedimientos disponibles</PrimaryBtn>
            </div>
          </div>
        ) : (
          <div style={{ position: "relative", padding: "18px 22px 26px" }}>
            {closeBtn}
            <button onClick={() => setView("info")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.textMute, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", padding: 0, marginBottom: 12 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 18l-6-6 6-6" /></svg>{p.brand}
            </button>
            <Eyebrow T={T}>Procedimientos con {p.tipo.split(" ")[0]}</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 26, color: T.text, lineHeight: 1.1, margin: "8px 0 4px" }}>
              Qué puedes <em style={{ fontFamily: T.ital, fontStyle: "italic", color: T.accent }}>realizar.</em>
            </h2>
            <p style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 300, color: T.textMute, lineHeight: 1.6, marginBottom: 8 }}>Todos los tratamientos que realizamos con <b style={{ color: T.text, fontWeight: 500 }}>{p.brand}</b>. Toca uno para agendarlo.</p>
            <div style={{ marginBottom: 16 }}>
              {procs.map(it => (
                <button key={it.n} onClick={() => { onClose(); openBooking && openBooking({ name: it.n, price: it.price }); }}
                  style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "13px 2px", cursor: "pointer", background: "transparent", border: "none", borderBottom: "1px solid " + T.lineSoft }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text, lineHeight: 1.25 }}>{it.n}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 3 }}>{it.t} · {it.d}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text }}>{D.fmt(it.price)}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, marginTop: 2 }}>Agendar →</div>
                  </div>
                </button>
              ))}
            </div>
            <PrimaryBtn T={T} full icon={cardIcon} onClick={() => { onClose(); openBooking && openBooking(null); }}>Agendar con carrito</PrimaryBtn>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedCard({ T, f, onClick, D, openBooking }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "block", width: "100%", textAlign: "left", padding: 0, cursor: "pointer", background: T.surface, border: "1px solid " + T.line, borderRadius: 14, overflow: "hidden", boxShadow: h ? "0 26px 50px -26px rgba(40,38,30,.45)" : "0 14px 36px -24px rgba(40,38,30,.4)", transform: h ? "translateY(-4px)" : "none", transition: "transform .45s " + T.ease + ", box-shadow .45s " + T.ease }}>
      {/* Media — banner del resultado (ANTES/DESPUÉS) anclado arriba; recorta la franja inferior con título/logo de la imagen. Chip arriba-izquierda (estilo imagen 2). */}
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
        <img src={f.img} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transform: h ? "scale(1.05)" : "scale(1)", transition: "transform .9s " + T.ease }} />
        <span style={{ position: "absolute", right: 14, top: 14, fontFamily: T.sans, fontSize: 9.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#1A1A14", background: "#fff", borderRadius: 999, padding: "7px 14px", boxShadow: "0 4px 14px -4px rgba(0,0,0,.3)" }}>{f.chip}</span>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <h3 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 27, letterSpacing: "-.01em", color: T.text }}>{f.name}</h3>
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 5 }}>{f.sub} · {(f.zone || "").toLowerCase()}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 14 }}>
          <div style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.text }}>{f.priceLabel}</div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.accent }}>
            Ver ficha
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
      </div>
    </button>
  );
}

/* Foto real por procedimiento — extraída del catálogo PDF (assets/cat/pageN.jpg).
   Recibe el nombre del tratamiento y, de respaldo, la categoría. */
function catPhoto(name, cat) {
  const s = ((name || "") + " " + (cat || "")).toLowerCase();
  const P = n => "assets/cat/page" + n + ".jpg";
  // — específicos por tratamiento —
  if (s.indexOf("código de barras") >= 0 || s.indexOf("codigo de barras") >= 0) return P(24);
  if (s.indexOf("bruxismo") >= 0) return P(12);
  if (s.indexOf("hiperhidrosis") >= 0) return P(13);
  if (s.indexOf("sonrisa gingival") >= 0) return P(20);
  if (s.indexOf("empedrado") >= 0) return P(21);
  if (s.indexOf("nefertiti") >= 0 || (s.indexOf("rejuvenecimiento de cuello") >= 0)) return P(19);
  if (s.indexOf("arco mandibular") >= 0) return P(17);
  if (s.indexOf("pómulos") >= 0 || s.indexOf("pomulos") >= 0) return P(18);
  if (s.indexOf("surcos") >= 0 || s.indexOf("marioneta") >= 0) return P(23);
  if (s.indexOf("proyección de mentón") >= 0 || s.indexOf("proyeccion de menton") >= 0 || s.indexOf("mentón") >= 0 || s.indexOf("menton") >= 0) return P(22);
  if (s.indexOf("rinomodel") >= 0 || s.indexOf("rinolips") >= 0) return P(9);
  if (s.indexOf("nctf") >= 0) return P(6);
  if (s.indexOf("salmón") >= 0 || s.indexOf("salmon") >= 0 || s.indexOf("rejuran") >= 0) return P(7);
  if (s.indexOf("quemador") >= 0 || s.indexOf("grasa") >= 0 || s.indexOf("lipolít") >= 0) return P(8);
  if (s.indexOf("manos") >= 0) return P(5);
  if (s.indexOf("bioestim") >= 0 || s.indexOf("sculptra") >= 0 || s.indexOf("colágeno") >= 0 || s.indexOf("colageno") >= 0) return P(5);
  if (s.indexOf("mesoterap") >= 0 || s.indexOf("pink glow") >= 0) return P(4);
  // — por categoría / fallback —
  if (s.indexOf("botox") >= 0 || s.indexOf("toxina") >= 0 || s.indexOf("zonas") >= 0 || s.indexOf("full face") >= 0) return P(3);
  if (s.indexOf("armoniz") >= 0 || s.indexOf("ácido hialurónico") >= 0 || s.indexOf("acido hialuronico") >= 0) return P(9);
  return P(3);
}

/* ─────────── CATÁLOGO ─────────── */
function CatalogScreen({ T, D, go, openBooking, onBack }) {
  const [sec, setSec] = useState("Facial");
  const [q, setQ] = useState("");
  const [prodSheet, setProdSheet] = useState(null);
  const block = D.catalog.find(s => s.sec === sec);
  const ql = q.trim().toLowerCase();
  const nProcs = totalProcs(D);
  const openFicha = (it, cat, ph) => go("ficha", { id: it.n, name: it.n, sub: it.t, priceLabel: D.fmt(it.price), price: it.price, desc: it.x, dur: it.d, img: ph, catalog: true });

  // clarify: con búsqueda activa, busca en TODO el catálogo (no solo la categoría visible).
  // Agrupa los resultados por categoría y marca de qué sección viene cada uno.
  const searchGroups = ql ? (() => {
    const out = [];
    D.catalog.forEach(s => (s.groups || []).forEach(g => {
      const items = (g.items || []).filter(it => it.n.toLowerCase().includes(ql) || (it.t || "").toLowerCase().includes(ql));
      if (items.length) out.push({ cat: s.sec === "Promociones" ? g.cat : g.cat + " · " + s.sec, g, items });
    }));
    return out;
  })() : [];
  const noResults = ql && searchGroups.length === 0;

  return (
    <div>
      <ScreenTop T={T} eyebrow={"Catálogo completo · " + nProcs + " procedimientos"} title="Procedimientos" onBack={onBack} />

      {/* Búsqueda + chips (los procedimientos tienen el protagonismo; "Productos" es un chip más) */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ position: "relative", marginBottom: 14 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.6" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar tratamiento…" style={{
            width: "100%", padding: "13px 14px 13px 40px", borderRadius: 10, border: "1px solid " + T.line, background: T.surface, color: T.text,
            fontFamily: T.sans, fontSize: 16, outline: "none"
          }} />
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          {D.catalog.map(s => <Chip key={s.sec} T={T} active={sec === s.sec} onClick={() => setSec(s.sec)}>{s.sec}</Chip>)}
          <Chip T={T} active={sec === "Productos"} onClick={() => setSec("Productos")}>Productos</Chip>
        </div>
      </div>

      {ql ? (
        noResults ? (
          /* clarify: estado vacío de búsqueda — explica qué pasó y ofrece la salida */
          <div style={{ padding: "56px 30px 40px", textAlign: "center", animation: "jcFade .4s " + T.ease }}>
            <div style={{ width: 54, height: 54, margin: "0 auto", borderRadius: "50%", background: T.surface2, border: "1px solid " + T.line, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.5"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            </div>
            <h3 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 23, color: T.text, marginTop: 18, lineHeight: 1.15 }}>Sin resultados</h3>
            <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.textMute, marginTop: 8, lineHeight: 1.6 }}>
              No encontramos “{q.trim()}”. Prueba con otro nombre o agenda una evaluación y lo vemos en consulta.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 22 }}>
              <GhostBtn T={T} full onClick={() => setQ("")}>Limpiar búsqueda</GhostBtn>
              <PrimaryBtn T={T} full onClick={() => openBooking && openBooking(null)}>Agendar evaluación</PrimaryBtn>
            </div>
          </div>
        ) : (
          <div style={{ padding: "8px 20px 20px" }}>
            {searchGroups.map(({ cat, g, items }) => (
              <Reveal key={cat} style={{ marginTop: 22 }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, paddingBottom: 8, borderBottom: "1px solid " + T.line }}>{cat}</div>
                {items.map((it, idx) => { const ph = catPhoto(it.n, g.cat); return it.promo
                  ? <div key={it.n} style={{ animation: "jcFade .32s ease both", animationDelay: (idx * 0.045) + "s" }}><PromoRow T={T} it={it} D={D} photo={ph} onClick={() => openFicha(it, g.cat, ph)} /></div>
                  : <div key={it.n} style={{ animation: "jcFade .32s ease both", animationDelay: (idx * 0.045) + "s" }}><CatRow T={T} it={it} D={D} photo={ph} onClick={() => openFicha(it, g.cat, ph)} onAdd={() => openBooking && openBooking({ name: it.n, price: it.price })} /></div>; })}
              </Reveal>
            ))}
          </div>
        )
      ) : sec === "Productos" ? (
        <div style={{ padding: "14px 20px 20px" }}>
          <Reveal>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, paddingBottom: 8, borderBottom: "1px solid " + T.line }}>Insumos certificados</div>
            <p style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 300, color: T.textMute, lineHeight: 1.6, margin: "10px 0 2px" }}>Con qué trabajamos. Toca un producto para ver los procedimientos que se realizan con él.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginTop: 12 }}>
              {(D.products || []).map((p, i) => (
                <button key={i} onClick={() => setProdSheet(p)} style={{ textAlign: "left", padding: 0, cursor: "pointer", borderRadius: 14, overflow: "hidden", border: "1px solid " + T.line, background: T.surface, boxShadow: "0 10px 26px -18px rgba(40,38,30,.35)" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3", background: T.surface2 }}>
                    <img src={p.img} alt={p.brand} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.style.display = "none"; }} />
                    <span style={{ position: "absolute", left: 8, top: 8, fontFamily: T.sans, fontSize: 7.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#fff", background: "rgba(20,20,15,.5)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 999, padding: "4px 8px" }}>{p.origen}</span>
                  </div>
                  <div style={{ padding: "11px 13px" }}>
                    <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.text, lineHeight: 1.2 }}>{p.brand}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 9.5, color: T.textMute, marginTop: 3 }}>{p.tipo}</div>
                    <div style={{ marginTop: 9, fontFamily: T.sans, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent }}>Ver procedimientos →</div>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      ) : (
        <div style={{ padding: "8px 20px 20px" }}>
          {(block ? block.groups : []).map(g => {
            const items = g.items.filter(it => !ql || it.n.toLowerCase().includes(ql) || it.t.toLowerCase().includes(ql));
            if (!items.length) return null;
            return (
              <Reveal key={g.cat} style={{ marginTop: 22 }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, paddingBottom: 8, borderBottom: "1px solid " + T.line }}>{g.cat}</div>
                {items.map((it, idx) => { const ph = catPhoto(it.n, g.cat); return it.promo
                  ? <div key={it.n} style={{ animation: "jcFade .32s ease both", animationDelay: (idx * 0.045) + "s" }}><PromoRow T={T} it={it} D={D} photo={ph} onClick={() => openFicha(it, g.cat, ph)} /></div>
                  : <div key={it.n} style={{ animation: "jcFade .32s ease both", animationDelay: (idx * 0.045) + "s" }}><CatRow T={T} it={it} D={D} photo={ph} onClick={() => openFicha(it, g.cat, ph)} onAdd={() => openBooking && openBooking({ name: it.n, price: it.price })} /></div>; })}
              </Reveal>
            );
          })}
        </div>
      )}
      {prodSheet && <ProductSheet T={T} D={D} p={prodSheet} onClose={() => setProdSheet(null)} openBooking={openBooking} />}
    </div>
  );
}

function CatRow({ T, it, onClick, D, photo, onAdd }) {
  const [h, setH] = useState(false);
  // delight: confirmación visual al agregar (check + rebote breve), luego vuelve al carrito.
  const [added, setAdded] = useState(false);
  const tRef = useRef(null);
  useEffect(() => () => { if (tRef.current) clearTimeout(tRef.current); }, []);
  function handleAdd(e) {
    e.stopPropagation();
    setAdded(true);
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setAdded(false), 700);
    if (navigator.vibrate) navigator.vibrate(8);
    onAdd && onAdd();
  }
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", padding: "14px 4px", cursor: "pointer", background: h ? T.surface : "transparent", border: "none", borderBottom: "1px solid " + T.lineSoft, transition: "background .2s" }}>
      <div style={{ width: 58, height: 58, flexShrink: 0, borderRadius: 10, overflow: "hidden", border: "1px solid " + T.line }}>
        <img src={photo} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text }}>{it.n}</div>
        <div style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".04em", color: T.textMute, marginTop: 4 }}>{it.t} · {it.d}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>{D.fmt(it.price)}</div>
          <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent, marginTop: 2 }}>Ver ficha →</div>
        </div>
        <span role="button" title={added ? "Agregado" : "Agregar al carrito"} aria-label={added ? "Agregado al carrito" : "Agregar al carrito"} onClick={handleAdd}
          style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0,
            background: added ? T.gold : (T.accentSoft || T.chipBg),
            border: "1px solid " + (added ? T.gold : T.chipBorder),
            color: added ? (T.onAccent || "#fff") : T.accent,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            transform: added ? "scale(1.12)" : "scale(1)",
            transition: "transform .35s cubic-bezier(.22,1,.36,1), background .25s, color .25s, border-color .25s" }}>
          {added
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>
            : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" /><path d="M16 5v4M14 7h4" /></svg>}
        </span>
      </div>
    </button>
  );
}

/* Fila de promoción — tarjeta con leve degradado de acento + badge dorado "Ahorra $…" */
function PromoRow({ T, it, onClick, D, photo }) {
  return (
    <button onClick={onClick} style={{ display: "block", width: "100%", textAlign: "left", padding: "4px 12px", cursor: "pointer", marginTop: 8, background: "linear-gradient(180deg, " + (T.accentSoft || "rgba(84,112,127,.12)") + ", transparent)", border: "1px solid rgba(84,112,127,.25)", borderRadius: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "10px 0" }}>
        <div style={{ width: 58, height: 58, flexShrink: 0, borderRadius: 10, overflow: "hidden", border: "1px solid " + T.line }}>
          <img src={photo} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.25 }}>{it.n}</div>
          <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 4 }}>{it.t}</div>
          <span style={{ display: "inline-block", fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", background: "linear-gradient(90deg,#b88a3e,#e3c372 55%,#b88a3e)", borderRadius: 999, padding: "3px 9px", marginTop: 6 }}>Ahorra {D.fmt(it.save)}</span>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>{D.fmt(it.price)}</div>
          <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent, marginTop: 3 }}>Ver ficha →</div>
        </div>
      </div>
    </button>
  );
}

/* ─────────── FICHA ─────────── */
function FichaScreen({ T, D, proc, go, openBooking }) {
  const featured = D.featured.find(f => f.id === proc.id);
  const data = featured || proc;
  // Mostrar SIEMPRE la foto de resultado (antes/después) del procedimiento, no la del catálogo.
  const rf = (window.resultFilterFor ? window.resultFilterFor(data.name) : "Todos");
  const resultBA = D.beforeAfter.find(b => b.t === rf) || D.beforeAfter.find(b => ((b.proc || "") + " " + (b.t || "")).toLowerCase().indexOf((data.name || "").toLowerCase().split(" ")[0]) >= 0);
  const hasResults = !!resultBA;
  const photo = (resultBA && resultBA.img) || (featured && featured.photo) || (featured && featured.img) || proc.img || null;
  return (
    <div>
      <div style={{ padding: "18px 20px 0" }}>
        <button onClick={() => go("back")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.dark ? "rgba(255,255,255,.08)" : "rgba(20,20,15,.05)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid " + T.line, cursor: "pointer", color: T.text, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", padding: "12px 14px 12px 12px", minHeight: 44, borderRadius: 999 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 18l-6-6 6-6" /></svg>
          Volver
        </button>
      </div>
      <div style={{ padding: "20px 20px 0" }}>
        <span style={{ fontFamily: T.sans, fontSize: 9.5, fontWeight: 400, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent }}>{data.sub}</span>
        <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 42, letterSpacing: "-.02em", color: T.text, marginTop: 10, lineHeight: 1 }}>{data.name}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
          <div style={{ fontFamily: T.serif, fontSize: 24, color: T.text }}>{data.priceLabel}</div>
          <button onClick={() => openBooking({ name: data.name, price: data.price })} title="Agregar al carrito y agendar" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.onAccent, background: T.gold, border: "none", borderRadius: 999, padding: "8px 13px", cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" /><path d="M16 5v4M14 7h4" /></svg>
            Agregar
          </button>
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.8, color: T.textMute, marginTop: 16 }}>{data.desc}</p>

        {data.facts && (
          <div style={{ display: "flex", marginTop: 26, paddingTop: 20, borderTop: "1px solid " + T.line }}>
            {data.facts.map((f, i) => (
              <div key={i} style={{ flex: 1, paddingRight: 12 }}>
                <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text }}>{f[0]}</div>
                <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, marginTop: 4 }}>{f[1]}</div>
              </div>
            ))}
          </div>
        )}
        {data.dur && !data.facts && (
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid " + T.line, fontFamily: T.sans, fontSize: 12, color: T.textMute }}>
            Duración estimada · <span style={{ color: T.text }}>{data.dur}</span>
          </div>
        )}
        <p style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 22, lineHeight: 1.6 }}>Caso real publicado con consentimiento. Los resultados varían según cada paciente y su evaluación clínica.</p>
      </div>
      {/* Foto (catálogo / resultado) — debajo de la info */}
      {photo && (
        <div style={{ margin: "20px 20px 0", borderRadius: 14, overflow: "hidden", border: "1px solid " + T.line, position: "relative" }}>
          <img src={photo} alt={data.name} style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} />
          {hasResults && <span style={{ position: "absolute", right: 12, top: 12, fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "#F2EDE6", background: "rgba(10,10,10,.6)", border: "1px solid rgba(242,237,230,.25)", borderRadius: 999, padding: "6px 11px" }}>Resultado real</span>}
        </div>
      )}
      <div style={{ position: "sticky", bottom: 0, padding: "16px 20px", marginTop: 24, background: T.navBg, backdropFilter: "blur(14px)", borderTop: "1px solid " + T.line, display: "flex", flexDirection: "column", gap: 9 }}>
        <PrimaryBtn T={T} full icon={cardIcon} onClick={() => openBooking({ name: data.name, price: data.price })}>Agendar este tratamiento</PrimaryBtn>
        {hasResults && <GhostBtn T={T} full onClick={() => go("antes", { name: data.name })}>Ver más resultados →</GhostBtn>}
      </div>
    </div>
  );
}

Object.assign(window, { Eyebrow, Chip, PrimaryBtn, GhostBtn, Reveal, ScreenTop, StickyBack, cardIcon, HomeScreen, FeaturedCard, CatalogScreen, CatRow, PromoRow, FichaScreen, ProductSheet });
