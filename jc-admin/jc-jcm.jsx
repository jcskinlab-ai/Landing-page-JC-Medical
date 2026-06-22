/* ═══════════ JC · PANEL MÁSTER — MÓDULO APP (contenido, fidelidad, integraciones) ═══════════
   Conecta el panel clínico (prototipo) con la app de usuario vía localStorage (jcm_shared / window.DB). */

function _db() { return window.DB; }
function JcmCard({ T, children, style }) {
  return <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 16px", ...(style || {}) }}>{children}</div>;
}
function JcmLabel({ T, children }) {
  return <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6, marginTop: 4 }}>{children}</div>;
}
function JcmInput({ T, value, onChange, placeholder, type }) {
  return <input value={value} type={type || "text"} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: "100%", padding: "11px 13px", borderRadius: 6, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", marginBottom: 8 }} />;
}
function JcmBtn({ T, children, onClick, ghost }) {
  return <button onClick={onClick} style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", padding: "11px 16px", borderRadius: 6, cursor: "pointer", background: ghost ? "transparent" : T.primaryBg, color: ghost ? T.text : T.primaryText, border: "1px solid " + (ghost ? T.chipBorder : T.primaryBg) }}>{children}</button>;
}
function JcmTabsBar({ T, tabs, sel, onSel }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
      {tabs.map(t => (
        <button key={t.k} onClick={() => onSel(t.k)} style={{ fontFamily: T.sans, fontSize: 11.5, letterSpacing: ".08em", textTransform: "uppercase", padding: "9px 14px", borderRadius: 999, cursor: "pointer", background: sel === t.k ? T.text : T.chipBg, color: sel === t.k ? T.bg : T.textMute, border: "1px solid " + (sel === t.k ? T.text : T.chipBorder) }}>{t.l}</button>
      ))}
    </div>
  );
}

function AppJCMView({ T }) {
  const [sub, setSub] = useState("horarios");
  return (
    <div className="jc-scroll" style={{ flex: 1, overflowY: "auto", padding: "18px 20px 40px" }}>
      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: T.accent }}>Gestión de la app de usuario</div>
      <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 34, letterSpacing: "-.02em", color: T.text, margin: "8px 0 18px" }}>App JC Medical</h1>
      <JcmTabsBar T={T} sel={sub} onSel={setSub} tabs={[
        { k: "horarios", l: "Horarios disponibles" }, { k: "contenido", l: "Contenido" }, { k: "fidelidad", l: "Fidelidad · Glow Points" }, { k: "integraciones", l: "Integraciones" }
      ]} />
      {sub === "horarios" && <HorariosApp T={T} />}
      {sub === "contenido" && <ContenidoApp T={T} />}
      {sub === "fidelidad" && <FidelidadApp T={T} />}
      {sub === "integraciones" && <IntegracionesApp T={T} />}
    </div>
  );
}

/* ── HORARIOS DISPONIBLES: la clínica define día y hora exactos (2 semanas) ── */
function HorariosApp({ T }) {
  const D = window.JCDATA;
  const [week, setWeek] = useState(0);     // 0 = semana 1, 1 = semana 2
  const [tick, setTick] = useState(0);     // refresca tras guardar
  // 14 días desde mañana
  const base = new Date(); base.setHours(0, 0, 0, 0);
  const days = [];
  for (let i = 1; i <= 14; i++) { const d = new Date(base); d.setDate(base.getDate() + i); days.push(d); }
  const weekDays = days.slice(week * 7, week * 7 + 7);
  const [selKey, setSelKey] = useState(D.dKey(weekDays[0]));
  const selDate = days.find(d => D.dKey(d) === selKey) || weekDays[0];
  const wd = selDate.getDay();
  const grid = D.slotGrid(wd);
  const override = D.getDateSlots(selKey);
  const effective = override != null ? override : D.availForDate(selDate).slots;
  const isClosed = override != null && override.length === 0;
  const has = t => effective.indexOf(t) >= 0;
  function toggle(t) {
    let next = override != null ? override.slice() : D.availForDate(selDate).slots.slice();
    if (next.indexOf(t) >= 0) next = next.filter(x => x !== t); else { next.push(t); next.sort(); }
    D.saveDateSlots(selKey, next); setTick(tick + 1);
  }
  function closeDay() { D.saveDateSlots(selKey, []); setTick(tick + 1); }
  function toggleAll() { const allOn = grid.every(t => has(t)); D.saveDateSlots(selKey, allOn ? [] : grid.slice()); setTick(tick + 1); }
  function resetDay() { D.resetDate(selKey); setTick(tick + 1); }
  const cnt = key => { const ov = D.getDateSlots(key); if (ov != null) return ov.length; const dd = days.find(x => D.dKey(x) === key); return dd ? D.availForDate(dd).slots.length : 0; };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <JcmCard T={T}>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 4 }}>Horarios disponibles para tus pacientes</div>
        <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.55, marginBottom: 14 }}>Activa el día y las horas exactas en que atiendes. Lo que marques aquí es lo único que tus pacientes podrán reservar en la app. Puedes planificar las próximas <b>2 semanas</b>.</p>
        {/* tabs semana */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {[0, 1].map(w => (
            <button key={w} onClick={() => { setWeek(w); setSelKey(D.dKey(days[w * 7])); }} style={{ flex: 1, fontFamily: T.sans, fontSize: 12, fontWeight: 600, letterSpacing: ".04em", padding: "11px", borderRadius: 8, cursor: "pointer", background: week === w ? T.primaryBg : T.chipBg, color: week === w ? T.primaryText : T.textMute, border: "1px solid " + (week === w ? T.primaryBg : T.chipBorder) }}>
              Semana {w + 1} <span style={{ opacity: .7, fontWeight: 400 }}>· {days[w * 7].getDate()} {D.MONTHS_ES[days[w * 7].getMonth()]} – {days[w * 7 + 6].getDate()} {D.MONTHS_ES[days[w * 7 + 6].getMonth()]}</span>
            </button>
          ))}
        </div>
        {/* días de la semana */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginBottom: 16 }}>
          {weekDays.map(d => { const k = D.dKey(d); const c = cnt(k); const sel = k === selKey; const closed = D.getDateSlots(k) != null && D.getDateSlots(k).length === 0; return (
            <button key={k} onClick={() => setSelKey(k)} style={{ textAlign: "center", padding: "9px 2px", borderRadius: 8, cursor: "pointer", background: sel ? T.primaryBg : T.surface, border: "1px solid " + (sel ? T.primaryBg : T.line) }}>
              <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".08em", textTransform: "uppercase", color: sel ? T.primaryText : T.textMute }}>{D.DAYS_ES[d.getDay()]}</div>
              <div style={{ fontFamily: T.serif, fontSize: 19, color: sel ? T.primaryText : T.text, marginTop: 1 }}>{d.getDate()}</div>
              <div style={{ fontFamily: T.sans, fontSize: 8.5, marginTop: 2, color: sel ? T.primaryText : (closed ? "#C0285A" : (c ? "#1F8A5B" : T.textFaint)) }}>{closed ? "cerrado" : (c ? c + "h" : "—")}</div>
            </button>
          ); })}
        </div>
        {/* grilla de horas del día seleccionado */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text }}>{D.DAYS_ES[wd]} {selDate.getDate()} de {D.MONTHS_ES[selDate.getMonth()]} {isClosed ? "· cerrado" : "· " + effective.length + " horas"}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={toggleAll} style={miniBtn(T)}>{grid.every(t => has(t)) ? "Ninguna" : "Todas"}</button>
            <button onClick={closeDay} style={miniBtn(T)}>Cerrar día</button>
            <button onClick={resetDay} style={miniBtn(T)}>Reiniciar</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7 }}>
          {grid.map(t => { const on = has(t); return (
            <button key={t} onClick={() => toggle(t)} style={{ fontFamily: T.sans, fontSize: 12.5, padding: "10px 4px", borderRadius: 7, cursor: "pointer", background: on ? T.accent : T.surface, color: on ? (T.onAccent || "#fff") : T.textMute, border: "1px solid " + (on ? T.accent : T.line) }}>{t}</button>
          ); })}
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 12, lineHeight: 1.5 }}>Toca una hora para activarla o desactivarla. Los cambios se reflejan al instante en la app de tus pacientes. Cada clínica gestiona su propia disponibilidad.</p>
      </JcmCard>
    </div>
  );
}
function miniBtn(T) { return { fontFamily: T.sans, fontSize: 10.5, padding: "7px 10px", borderRadius: 6, cursor: "pointer", background: T.chipBg, color: T.textMute, border: "1px solid " + T.chipBorder }; }

/* ── CONTENIDO: artículos + videos del feed de la app ── */
function ContenidoApp({ T }) {
  const DB = _db();
  const [arts, setArts] = useState(() => DB.get("articles") || []);
  const [vids, setVids] = useState(() => DB.get("videos") || []);
  const [na, setNa] = useState({ tag: "", h: "", sub: "", link: "", img: "", cat: "Novedades" });
  const [nv, setNv] = useState({ title: "", url: "", sub: "", likes: "", views: "" });
  function saveArts(list) { setArts(list); DB.set("articles", list); }
  function saveVids(list) { setVids(list); DB.set("videos", list); }
  function addArt() { if (!na.h.trim()) return; saveArts([{ ...na, eyb: na.tag, meta: "Nuevo" }, ...arts]); setNa({ tag: "", h: "", sub: "", link: "", img: "", cat: "Novedades" }); }
  function addVid() { if (!nv.url.trim()) return; saveVids([{ title: nv.title || "Video", url: nv.url, sub: nv.sub, src: "JC Medical", likes: parseInt(nv.likes) || 0, views: parseInt(nv.views) || 0 }, ...vids]); setNv({ title: "", url: "", sub: "", likes: "", views: "" }); }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <JcmCard T={T}>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 10 }}>Artículos del feed</div>
        <JcmLabel T={T}>Etiqueta</JcmLabel><JcmInput T={T} value={na.tag} onChange={v => setNa({ ...na, tag: v })} placeholder="Ej: Tendencias" />
        <JcmLabel T={T}>Título</JcmLabel><JcmInput T={T} value={na.h} onChange={v => setNa({ ...na, h: v })} placeholder="Título del artículo" />
        <JcmLabel T={T}>Bajada</JcmLabel><JcmInput T={T} value={na.sub} onChange={v => setNa({ ...na, sub: v })} placeholder="Resumen breve" />
        <JcmLabel T={T}>Enlace (URL fuente)</JcmLabel><JcmInput T={T} value={na.link} onChange={v => setNa({ ...na, link: v })} placeholder="https://…" />
        <JcmLabel T={T}>Imagen (URL)</JcmLabel><JcmInput T={T} value={na.img} onChange={v => setNa({ ...na, img: v })} placeholder="https://…jpg" />
        <JcmBtn T={T} onClick={addArt}>+ Agregar artículo</JcmBtn>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {arts.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 8, borderTop: "1px solid " + T.lineSoft }}>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.h}</div><div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>{a.tag || a.cat}</div></div>
              <button onClick={() => saveArts(arts.filter((_, j) => j !== i))} style={{ color: "#C0285A", background: "none", border: "1px solid " + T.chipBorder, borderRadius: 6, padding: "5px 9px", fontSize: 11, cursor: "pointer" }}>Eliminar</button>
            </div>
          ))}
        </div>
      </JcmCard>

      <JcmCard T={T}>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 10 }}>Videos (YouTube)</div>
        <JcmLabel T={T}>URL de YouTube</JcmLabel><JcmInput T={T} value={nv.url} onChange={v => setNv({ ...nv, url: v })} placeholder="https://youtube.com/…" />
        <JcmLabel T={T}>Título</JcmLabel><JcmInput T={T} value={nv.title} onChange={v => setNv({ ...nv, title: v })} placeholder="Título del video" />
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}><JcmLabel T={T}>Me gusta</JcmLabel><JcmInput T={T} value={nv.likes} onChange={v => setNv({ ...nv, likes: v })} placeholder="12000" type="number" /></div>
          <div style={{ flex: 1 }}><JcmLabel T={T}>Reproducciones</JcmLabel><JcmInput T={T} value={nv.views} onChange={v => setNv({ ...nv, views: v })} placeholder="250000" type="number" /></div>
        </div>
        <JcmBtn T={T} onClick={addVid}>+ Agregar video</JcmBtn>
        <p style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 8, lineHeight: 1.5 }}>La app solo muestra videos con más de 10.000 me gusta y 10.000 reproducciones. Con API key de YouTube, las cifras se actualizan solas.</p>
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {vids.map((v, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 8, borderTop: "1px solid " + T.lineSoft }}>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.title}</div><div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>{v.likes || 0} me gusta · {v.views || 0} reproducciones</div></div>
              <button onClick={() => saveVids(vids.filter((_, j) => j !== i))} style={{ color: "#C0285A", background: "none", border: "1px solid " + T.chipBorder, borderRadius: 6, padding: "5px 9px", fontSize: 11, cursor: "pointer" }}>Eliminar</button>
            </div>
          ))}
        </div>
      </JcmCard>
    </div>
  );
}

/* ── FIDELIDAD: Glow Points (config, usuarios, canjes) ── */
function FidelidadApp({ T }) {
  const DB = _db();
  const cfg = DB.cfg();
  const [start, setStart] = useState(cfg.pts_start);
  const [reward, setReward] = useState(cfg.reward_cost);
  const [cap, setCap] = useState(cfg.pts_daily_cap);
  const [users] = useState(() => DB.get("users") || []);
  const [reds, setReds] = useState(() => DB.get("redeems") || []);
  const [note, setNote] = useState("");
  function save() { DB.set("config", Object.assign({}, DB.cfg(), { pts_start: parseInt(start) || 500, reward_cost: parseInt(reward) || 60000, pts_daily_cap: parseInt(cap) || 2000 })); setNote("Configuración guardada ✓"); setTimeout(() => setNote(""), 2000); }
  function markDone(id) { const list = reds.map(r => r.id === id ? { ...r, done: true } : r); setReds(list); DB.set("redeems", list); }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <JcmCard T={T}>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 10 }}>Glow Points · configuración</div>
        <JcmLabel T={T}>Puntos de regalo al registrarse</JcmLabel><JcmInput T={T} value={start} onChange={setStart} type="number" />
        <JcmLabel T={T}>Costo de canje por sesión (pts)</JcmLabel><JcmInput T={T} value={reward} onChange={setReward} type="number" />
        <JcmLabel T={T}>Tope diario por juegos (pts)</JcmLabel><JcmInput T={T} value={cap} onChange={setCap} type="number" />
        <JcmBtn T={T} onClick={save}>Guardar configuración</JcmBtn>
        {note && <span style={{ marginLeft: 12, color: "#1F8A5B", fontSize: 12 }}>{note}</span>}
      </JcmCard>

      <JcmCard T={T}>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 4 }}>Usuarios registrados <span style={{ fontSize: 13, color: T.textMute }}>· {users.length}</span></div>
        {users.length === 0 && <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 6 }}>Aún no hay usuarios registrados en la app.</p>}
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          {users.map((u, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 8, borderTop: "1px solid " + T.lineSoft }}>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{u.name}</div><div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>{u.email}</div></div>
              <span style={{ fontFamily: T.serif, fontSize: 16, color: T.gold }}>{(u.points || 0).toLocaleString("es-CL")} pts</span>
            </div>
          ))}
        </div>
      </JcmCard>

      <JcmCard T={T}>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 4 }}>Canjes</div>
        {reds.length === 0 && <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 6 }}>No hay canjes solicitados.</p>}
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          {reds.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 8, borderTop: "1px solid " + T.lineSoft }}>
              <div style={{ flex: 1 }}><div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{r.user} · {(r.cost || 0).toLocaleString("es-CL")} pts</div><div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>{r.done ? "Entregado" : "Pendiente"}</div></div>
              {!r.done && <button onClick={() => markDone(r.id)} style={{ background: T.primaryBg, color: T.primaryText, border: "none", borderRadius: 6, padding: "7px 12px", fontSize: 11, cursor: "pointer" }}>Marcar entregado</button>}
            </div>
          ))}
        </div>
      </JcmCard>
    </div>
  );
}

/* ── INTEGRACIONES: YouTube API + link de pago ── */
function IntegracionesApp({ T }) {
  const DB = _db();
  const cfg = DB.cfg();
  const [yt, setYt] = useState(cfg.yt_api_key || "");
  const [pay, setPay] = useState(cfg.pay_link || "");
  const [wa, setWa] = useState(cfg.wa_number || "56997880877");
  const [fbc, setFbc] = useState(cfg.firebase_config || "");
  const [note, setNote] = useState("");
  const cloudOn = !!(window.JCM_CLOUD && window.JCM_CLOUD.on);
  function save() {
    let fbClean = fbc.trim();
    if (fbClean) { try { JSON.parse(fbClean); } catch (e) { setNote("⚠️ La config de Firebase no es un JSON válido"); setTimeout(() => setNote(""), 3500); return; } }
    DB.set("config", Object.assign({}, DB.cfg(), { yt_api_key: yt.trim(), pay_link: pay.trim(), wa_number: wa.replace(/\D/g, ""), firebase_config: fbClean }));
    DB.del("yt_stats"); setNote("Guardado ✓ — recarga para conectar la nube"); setTimeout(() => setNote(""), 3500);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <JcmCard T={T}>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 6 }}>YouTube Data API</div>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 10, lineHeight: 1.5 }}>Estadísticas reales (views/likes) de los videos. Crea una key gratis en Google Cloud → «YouTube Data API v3».</p>
        <JcmLabel T={T}>API key</JcmLabel><JcmInput T={T} value={yt} onChange={setYt} placeholder="AIza… (vacío = cifras curadas)" />
      </JcmCard>
      <JcmCard T={T}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text }}>Base de datos en la nube</div>
          <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".06em", padding: "4px 9px", borderRadius: 999, color: cloudOn ? "#1F8A5B" : T.textMute, border: "1px solid " + (cloudOn ? "#1F8A5B" : T.chipBorder) }}>{cloudOn ? "● Conectada" : "○ Local (sin sincronizar)"}</span>
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 10, lineHeight: 1.5 }}>Comparte reservas, usuarios, Glow Points y récords entre todos los dispositivos. Pega tu configuración web de Firebase (Firestore). Vacío = solo este dispositivo.</p>
        <JcmLabel T={T}>Firebase config (JSON)</JcmLabel>
        <textarea value={fbc} onChange={e => setFbc(e.target.value)} placeholder={'{ "apiKey": "...", "authDomain": "...", "projectId": "...", "appId": "..." }'} rows={5}
          style={{ width: "100%", padding: "11px 13px", borderRadius: 6, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: "monospace", fontSize: 12, outline: "none", marginBottom: 8, resize: "vertical" }} />
      </JcmCard>
      <JcmCard T={T}>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 6 }}>Pago · Banco de Chile</div>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 10, lineHeight: 1.5 }}>Link general de compra con notificación automática (el del banco). El agendamiento ya usa los links por servicio.</p>
        <JcmLabel T={T}>Link de pago (general)</JcmLabel><JcmInput T={T} value={pay} onChange={setPay} placeholder="https://micrositios.banchilepagos.cl/…" />
        <JcmLabel T={T}>WhatsApp (sin +)</JcmLabel><JcmInput T={T} value={wa} onChange={setWa} placeholder="56997880877" />
      </JcmCard>
      <div><JcmBtn T={T} onClick={save}>Guardar integraciones</JcmBtn>{note && <span style={{ marginLeft: 12, color: "#1F8A5B", fontSize: 12 }}>{note}</span>}</div>
    </div>
  );
}

Object.assign(window, { AppJCMView, HorariosApp, ContenidoApp, FidelidadApp, IntegracionesApp });
