/* ═══════════ JC · ANTES-DESPUÉS / FEED / CONTACTO ═══════════ */

/* ─────────── ANTES / DESPUÉS ─────────── */
function resultFilterFor(name) {
  name = (name || "").toLowerCase();
  if (/toxina|botox|bruxismo|hiperhidro|gingival|nefertiti|empedrado/.test(name)) return "Toxina botulínica";
  if (/sculptra|bioestim|col[áa]geno/.test(name)) return "Sculptra";
  if (/rino|hialur|relleno|labio|p[óo]mulo|mand[íi]bula|ment[óo]n|armoniz/.test(name)) return "Rinomodelación";
  return "Todos";
}
function AntesScreen({ T, D, go, openBooking, proc, onBack }) {
  const opts = ["Todos"].concat([...new Set(D.beforeAfter.map(b => b.t))]);
  const initial = proc ? resultFilterFor(proc.name || proc) : "Todos";
  const [filter, setFilter] = useState(opts.indexOf(initial) >= 0 ? initial : "Todos");
  const list = D.beforeAfter.filter(b => filter === "Todos" || b.t === filter);
  return (
    <div>
      <ScreenTop T={T} eyebrow="Casos reales" title="Antes y después" onBack={onBack || (() => go("back"))} />
      <div style={{ display: "flex", gap: 8, padding: "0 20px 8px", overflowX: "auto" }}>
        {opts.map(o => <Chip key={o} T={T} active={filter === o} onClick={() => setFilter(o)}>{o}</Chip>)}
      </div>
      <div style={{ padding: "12px 20px 20px", display: "flex", flexDirection: "column", gap: 18 }}>
        {list.map(b => (
          <div key={b.id} style={{ borderRadius: 4, overflow: "hidden", border: "1px solid " + T.line, background: T.surface }}>
            <img src={b.img} alt={b.t} style={{ width: "100%", display: "block" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 18px" }}>
              <div>
                <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text }}>{b.t}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 4 }}>{b.note}</div>
              </div>
              <button onClick={() => openBooking({ name: b.proc || b.t, price: b.price })} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: T.text, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "9px 14px", background: "transparent", cursor: "pointer" }}>Agendar</button>
            </div>
          </div>
        ))}
      </div>
      <p style={{ padding: "0 20px 30px", fontFamily: T.sans, fontSize: 11, color: T.textFaint, lineHeight: 1.7 }}>
        Casos reales de pacientes atendidos en consulta, publicados con su consentimiento. Los resultados pueden variar según cada paciente y su evaluación clínica.
      </p>
    </div>
  );
}

/* ─────────── FEED ─────────── */
function FeedScreen({ T, D, go, openBooking }) {
  return (
    <div>
      <ScreenTop T={T} eyebrow="@medique.cl" title="Feed" />
      <div style={{ padding: "0 20px 10px" }}>
        <a href="https://instagram.com/medique.cl" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: T.text, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "11px 18px", textDecoration: "none" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
          Ir a Instagram
        </a>
      </div>
      <div style={{ padding: "8px 16px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        {D.feed.map(p => <FeedCard key={p.id} T={T} p={p} openBooking={openBooking} />)}
      </div>
    </div>
  );
}

function FeedCard({ T, p, openBooking }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(p.likes);
  function toggle() { setLiked(l => { setLikes(n => n + (l ? -1 : 1)); return !l; }); }
  const navy = "#0a0f1c";
  const isDarkPost = p.dark;
  const postBg = isDarkPost ? navy : T.surface;
  const postText = isDarkPost ? "#F2EDE6" : T.text;
  const postMute = isDarkPost ? "rgba(242,237,230,.5)" : T.textMute;
  return (
    <div style={{ borderRadius: 6, overflow: "hidden", border: "1px solid " + T.line, background: T.surface }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="assets/logo-jc-mark-white.png" alt="" style={{ height: 16 }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text }}>medique.cl</div>
          <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute }}>Talca · Medicina estética</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={T.textMute}><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
      </div>
      {/* media */}
      {p.kind === "photo" && (
        <div style={{ position: "relative" }}>
          <img src={p.img} alt="" style={{ width: "100%", display: "block", aspectRatio: "1/1", objectFit: "cover" }} />
          <div style={{ position: "absolute", left: 12, top: 12, fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#F2EDE6", background: "rgba(10,10,10,.5)", backdropFilter: "blur(6px)", border: "1px solid rgba(242,237,230,.2)", borderRadius: 999, padding: "6px 10px" }}>{p.tag}</div>
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 14 }}>
            <div style={{ fontFamily: T.serif, fontSize: 22, color: "#F2EDE6", lineHeight: 1.1, textShadow: "0 2px 14px rgba(0,0,0,.6)" }}>{p.title}</div>
            {p.swipe && <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(242,237,230,.85)", marginTop: 8 }}>Desliza →</div>}
          </div>
        </div>
      )}
      {(p.kind === "statement" || p.kind === "promo") && (
        <div style={{ position: "relative", aspectRatio: "1/1", background: navy, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 26px", overflow: "hidden" }}>
          <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .14 }}>
            <path d="M60 320 Q120 180 200 200 T340 120" fill="none" stroke="#F2EDE6" strokeWidth="1" />
            <path d="M40 360 Q160 240 240 260 T380 180" fill="none" stroke="#F2EDE6" strokeWidth="1" />
          </svg>
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".24em", textTransform: "uppercase", color: "#8B9EB0", marginBottom: 16 }}>{p.tag}</div>
            {p.big && <div style={{ fontFamily: T.serif, fontSize: 92, fontWeight: 300, color: "#F2EDE6", lineHeight: .9 }}>{p.big}</div>}
            <div style={{ fontFamily: T.serif, fontSize: p.big ? 26 : 30, fontStyle: p.kind === "statement" ? "italic" : "normal", color: "#F2EDE6", lineHeight: 1.15, marginTop: p.big ? 6 : 0 }}>{p.title}</div>
            {p.sub && <div style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(242,237,230,.6)", marginTop: 12 }}>{p.sub}</div>}
            {p.kind === "promo" && <button onClick={() => openBooking(null)} style={{ marginTop: 20, fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: navy, background: "#F2EDE6", border: "none", borderRadius: 999, padding: "10px 18px", cursor: "pointer" }}>Agenda tu evaluación</button>}
          </div>
        </div>
      )}
      {/* actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 14px 6px" }}>
        <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? "#c0285a" : "none"} stroke={liked ? "#c0285a" : T.text} strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
        </button>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="1.5"><path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z" /></svg>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="1.5"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
        <div style={{ flex: 1 }} />
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
      </div>
      <div style={{ padding: "0 14px 14px" }}>
        <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text }}>{likes.toLocaleString("es-CL")} me gusta</div>
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 4, lineHeight: 1.5 }}>
          <span style={{ fontWeight: 600, color: T.text }}>medique.cl</span> {p.title}
        </div>
      </div>
    </div>
  );
}

/* ─────────── CONTACTO ─────────── */
function ContactScreen({ T, D, go, openBooking, onBack }) {
  const waLink = "https://wa.me/" + D.wa;
  const mapSrc = "https://www.google.com/maps?q=" + encodeURIComponent(D.contact.address) + "&z=15&output=embed";
  return (
    <div>
      <ScreenTop T={T} eyebrow="Visítanos" title="Contacto" onBack={onBack} />
      <div style={{ padding: "0 20px 24px" }}>
        {/* Empresa / profesional */}
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 4, padding: "20px 18px", marginBottom: 14 }}>
          <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, lineHeight: 1.05 }}>JC Medical <span style={{ color: T.accent }}>|</span> <span style={{ fontStyle: "italic", color: T.accent, fontSize: 20 }}>Medicina estética facial y corporal</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, paddingTop: 14, borderTop: "1px solid " + T.lineSoft }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Profesional</div>
              <div style={{ fontFamily: T.sans, fontSize: 14, color: T.text, marginTop: 4 }}>{D.contact.pro}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>{D.contact.role}</div>
            </div>
          </div>
        </div>

        {/* 1 · WhatsApp */}
        <a href={waLink} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 18px", borderRadius: 4, background: "#1F8A5B", textDecoration: "none", marginBottom: 14 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" /></svg>
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: ".02em" }}>Escríbenos por WhatsApp</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(255,255,255,.85)", marginTop: 2 }}>Respuesta directa · +56 9 9788 0877</div>
          </div>
        </a>

        {/* 2 · Mapa */}
        <div style={{ marginBottom: 14, borderRadius: 4, overflow: "hidden", border: "1px solid " + T.line }}>
          <iframe src={mapSrc} title="Ubicación" style={{ width: "100%", height: 220, border: 0, display: "block", filter: T.dark ? "invert(.9) hue-rotate(180deg)" : "none" }} loading="lazy"></iframe>
        </div>

        {/* 3 · Resto de info */}
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 4, overflow: "hidden" }}>
          <InfoRow T={T} k="Dirección" v={D.contact.address + " · " + D.contact.region} />
          <InfoRow T={T} k="Instagram" v={D.contact.ig} />
        </div>

        <div style={{ marginTop: 14, background: T.surface, border: "1px solid " + T.line, borderRadius: 4, padding: "18px 18px" }}>
          <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Horario de atención</div>
          {D.contact.hours.map((h, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i ? "1px solid " + T.lineSoft : "none", fontFamily: T.sans, fontSize: 13 }}>
              <span style={{ color: T.textMute }}>{h[0]}</span>
              <span style={{ color: T.text }}>{h[1]}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <PrimaryBtn T={T} full icon={cardIcon} onClick={() => openBooking(null)}>Agendar evaluación</PrimaryBtn>
        </div>

        <a href="JC Panel.html" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12, fontFamily: T.sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.textFaint, textDecoration: "none" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
          Panel profesional
        </a>
      </div>
    </div>
  );
}

function InfoRow({ T, k, v }) {
  return (
    <div style={{ padding: "16px 18px", borderTop: "1px solid " + T.lineSoft }}>
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>{k}</div>
      <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.text, marginTop: 5 }}>{v}</div>
    </div>
  );
}

Object.assign(window, { AntesScreen, FeedScreen, FeedCard, ContactScreen, InfoRow });
