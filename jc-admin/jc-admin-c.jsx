/* ═══════════ JC · PANEL · MÓDULOS AMPLIADOS ═══════════ */

/* datos extra (inline para no tocar el data file) */
const CADMIN = {
  team: [
    { id: "t1", name: "Juan Claudio Parra", role: "Enfermero · Medicina estética", email: "jc.skinlab@gmail.com", phone: "+56 9 9788 0877", color: "#6A8296", active: true, access: true, pin: "1234", perms: { Agenda: true, Pacientes: true, Inventario: true, Servicios: true, Reportes: true, Marketing: true, Configuración: true } },
    { id: "t2", name: "Recepción", role: "Agenda y atención", email: "recepcion@medique.cl", phone: "+56 9 0000 0000", color: "#B9C2CB", active: true, access: true, pin: "0000", perms: { Agenda: true, Pacientes: true } }
  ],
  waMessages: [
    { id: "w1", name: "Valentina Pérez", msg: "Hola, ¿tienen hora para botox esta semana?", ago: "hace 12 min" },
    { id: "w2", name: "Josefa Muñoz", msg: "¿Cuánto cuesta la rinomodelación?", ago: "hace 40 min" },
    { id: "w3", name: "Número nuevo", msg: "Quiero agendar una evaluación 🙌", ago: "hace 2 h" }
  ],
  bizComments: [
    { id: "b1", name: "@cami.rojas", msg: "¿Esto sirve para las líneas de la frente?", net: "Instagram", ago: "hace 25 min" },
    { id: "b2", name: "@fer_estetica", msg: "Hermoso resultado 😍 ¿precio?", net: "Instagram", ago: "hace 1 h" }
  ],
  fidelity: [
    { id: "p1", name: "María González", pts: 320, tier: "Oro" },
    { id: "p2", name: "Camila Soto", pts: 180, tier: "Plata" },
    { id: "p3", name: "Antonia Vera", pts: 540, tier: "Oro" }
  ],
  campaigns: [
    { id: "c1", name: "Botox · invierno", net: "Meta Ads", reach: 18420, leads: 42, spend: 120000, active: true },
    { id: "c2", name: "Bioestimulación 20%", net: "Meta Ads", reach: 9650, leads: 23, spend: 80000, active: true },
    { id: "c3", name: "Rinomodelación", net: "Instagram", reach: 12100, leads: 17, spend: 60000, active: false }
  ],
  integrations: [
    { id: "metaads", name: "Meta Ads", desc: "Campañas de Facebook e Instagram Ads", letter: "f", color: "#1877F2", connected: true, stat: "2 campañas activas" },
    { id: "metabiz", name: "Meta Business Suite", desc: "Bandeja de Instagram y Facebook", letter: "B", color: "#0866FF", connected: true, stat: "DM y comentarios" },
    { id: "gmail", name: "Gmail", desc: "Recordatorios y confirmaciones por correo", letter: "M", color: "#EA4335", connected: true, stat: "jcmedical@gmail.com" },
    { id: "drive", name: "Google Drive", desc: "Respaldo de fichas y consentimientos", letter: "▲", color: "#1FA463", connected: false, stat: "Respaldo automático" },
    { id: "gcal", name: "Google Calendar", desc: "Sincroniza tu agenda", letter: "31", color: "#4285F4", connected: false, stat: "Sync bidireccional" },
    { id: "gemini", name: "Gemini IA", desc: "Asistente clínico: resúmenes y notas", letter: "✦", color: "#8B6FE0", connected: true, stat: "Asistente activo" },
    { id: "wa", name: "WhatsApp Business", desc: "Recordatorios y agenda por WhatsApp", letter: "✆", color: "#1F8A5B", connected: true, stat: "+56 9 9788 0877" },
    { id: "landing", name: "Landing medique.cl", desc: "Reservas online conectadas al sitio", letter: "jc", color: "#0a0f1c", connected: true, stat: "Reservas en vivo" }
  ]
};
// Exponer CADMIN en window para que scopeClinicData() (jc-admin.jsx) pueda aislar/vaciar los datos
// demo por clínica. Sin esto, las mutaciones de scopeClinicData eran un no-op (CADMIN era solo léxico).
if (typeof window !== "undefined") window.CADMIN = CADMIN;

// Catálogo FIJO de herramientas conectables (no es dato demo: nunca se vacía por clínica).
// El estado de conexión se guarda por clínica en DB 'integrations_state'. Cada clínica conecta las suyas.
const INTEGRATIONS_CATALOG = [
  { id: "metaads", name: "Meta Ads", desc: "Campañas de Facebook e Instagram Ads", letter: "f", color: "#1877F2", stat: "Campañas conectadas" },
  { id: "metabiz", name: "Meta Business Suite", desc: "Bandeja de Instagram y Facebook", letter: "B", color: "#0866FF", stat: "DM y comentarios" },
  { id: "gmail", name: "Gmail", desc: "Recordatorios y confirmaciones por correo", letter: "M", color: "#EA4335", stat: "Correo conectado" },
  { id: "drive", name: "Google Drive", desc: "Respaldo de fichas y consentimientos", letter: "▲", color: "#1FA463", stat: "Respaldo automático" },
  { id: "gcal", name: "Google Calendar", desc: "Sincroniza tu agenda", letter: "31", color: "#4285F4", stat: "Sync bidireccional" },
  { id: "groq", name: "Groq (Agente IA)", desc: "Asistente que responde por WhatsApp", letter: "✦", color: "#8B6FE0", stat: "Asistente activo" },
  { id: "wa", name: "WhatsApp Business", desc: "Recordatorios y agenda por WhatsApp", letter: "✆", color: "#1F8A5B", stat: "WhatsApp conectado" },
  { id: "landing", name: "Reserva online Medique", desc: "Reservas online conectadas a tu link", letter: "M", color: "#0a0f1c", stat: "Reservas en vivo" }
];

/* ─────────── MINI CALENDARIO (mensual) ─────────── */
function MiniCalendar({ T, selected, onSelect }) {
  const [base, setBase] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const MES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const DOW = ["L", "M", "M", "J", "V", "S", "D"];
  const y = base.getFullYear(), m = base.getMonth();
  const first = new Date(y, m, 1); let startDow = (first.getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const todayStr = new Date().toISOString().slice(0, 10);
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  function pick(d) { const ds = new Date(y, m, d); onSelect(ds.toISOString().slice(0, 10)); }
  return (
    <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button onClick={() => setBase(new Date(y, m - 1, 1))} style={navBtn(T)}>‹</button>
        <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>{MES[m]} {y}</div>
        <button onClick={() => setBase(new Date(y, m + 1, 1))} style={navBtn(T)}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
        {DOW.map((d, i) => <div key={i} style={{ textAlign: "center", fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", color: T.textFaint, paddingBottom: 4 }}>{d}</div>)}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const ds = new Date(y, m, d).toISOString().slice(0, 10);
          const isSel = selected === ds, isToday = todayStr === ds;
          return (
            <button key={i} onClick={() => pick(d)} style={{
              aspectRatio: "1", borderRadius: 6, cursor: "pointer", fontFamily: T.sans, fontSize: 12.5,
              background: isSel ? T.accent : "transparent", color: isSel ? T.onAccent : T.text,
              border: "1px solid " + (isToday && !isSel ? T.accent : "transparent")
            }}>{d}</button>
          );
        })}
      </div>
    </div>
  );
}
function navBtn(T) { return { width: 30, height: 30, borderRadius: 6, border: "1px solid " + T.line, background: "transparent", color: T.text, cursor: "pointer", fontSize: 16, lineHeight: 1 }; }

/* ─────────── SERVICIOS ─────────── */
const SVC_CAT_LABEL = {
  "Toxina botulínica": "Toxina botulínica",
  "Bioestimulación de colágeno con Sculptra": "Bioestimulación de colágeno",
  "Armonización facial": "Ácido hialurónico",
  "Mesoterapia · vitaminas faciales": "Mesoterapia",
  "Quemadores de grasa": "Lipolíticos inyectables",
  "Bioestimulación": "Bioestimulación de manos",
  "Packs de temporada · por tiempo limitado": "Packs de temporada",
};
const SVC_ZONE = {
  "Botox 3 zonas": "Frente, entrecejo y patas de gallo",
  "Botox tercio superior (4 zonas)": "Frente, entrecejo, patas de gallo y nariz",
  "Botox Full Face (8 zonas)": "Frente, entrecejo, patas de gallo, nariz, código de barras, mentón, DAO y borde mandibular",
  "Tratamiento de bruxismo con toxina botulínica": "Músculo masetero bilateral",
  "Hiperhidrosis facial": "Frente y cuero cabelludo",
  "Tratamiento sonrisa gingival": "Labio superior y elevadores del labio",
  "Mentón empedrado": "Músculo mentoniano",
  "Rejuvenecimiento de cuello - Nefertiti": "Platisma y borde mandibular inferior",
  "Código de barras, tratamiento de arrugas": "Labio superior peribucal",
  "Bioestimulación de colágeno facial": "Tercio medio, tercio inferior y óvalo facial",
  "Bioestimulación de surcos nasogenianos y marionetas": "Surco nasogeniano y comisuras labiales",
  "Bioestimulación de cuello": "Cara anterior y lateral del cuello",
  "Rinomodelación": "Dorso nasal, punta y columela",
  "Proyección de mentón": "Mentón y arco mandibular anterior",
  "Definición de arco mandibular": "Borde mandibular lateral y ángulo mandibular",
  "Realce de pómulos": "Arco malar y surco nasogeniano",
  "Código de barras con ácido hialurónico": "Labio superior y filtrum",
  "Quemadores de grasa localizada": "Papada, brazos, abdomen, flancos, muslos y glúteos",
  "Bioestimulación de manos": "Dorso de las manos",
  "NCTF 135 · revitalización facial": "Cara completa",
  "Vitaminas · iluminador": "Cara completa y escote",
  "Vitaminas · antiacné": "Zona T y mejillas",
};
/* Categorías disponibles al crear un servicio nuevo (editable: cualquiera puede tipear la suya). */
const SVC_CATS = ["Toxina botulínica", "Ácido hialurónico", "Bioestimulación de colágeno", "Mesoterapia", "Lipolíticos inyectables", "Corporal", "Evaluación", "Otro"];
/* Servicios propios de la clínica (persisten en DB, por clínica). */
function customServices() { try { const v = window.DB && DB.get("services_custom"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function saveCustomServices(v) { try { if (window.DB) DB.set("services_custom", v); } catch (e) {} }
/* Lista PLANA de todos los servicios de la clínica (catálogo base si aplica + propios). Fuente única para el desplegable de Nueva sesión. */
function clinicServiceList() {
  const D = window.JCDATA || {};
  const out = [];
  try {
    (D.catalog || []).filter(s => s.sec !== "Promociones").forEach(sec => {
      (sec.groups || []).forEach(g => {
        (g.items || []).forEach(it => out.push({ name: it.n, cat: SVC_CAT_LABEL[g.cat] || g.cat, price: it.price || 0, dur: it.dur || 60 }));
      });
    });
  } catch (e) {}
  customServices().forEach(s => out.push({ name: s.name, cat: s.cat || "Otro", price: s.price || 0, dur: s.dur || 30 }));
  return out;
}
if (typeof window !== "undefined") window.clinicServiceList = clinicServiceList;

/* Modal para crear / editar un servicio propio. */
function NewServiceModal({ T, initial, onClose, onSave }) {
  const [f, setF] = useState(initial || { name: "", cat: "Toxina botulínica", price: "", dur: "30", pts: "", desc: "" });
  const ok = (f.name || "").trim().length > 1;
  return (
    <AdModal T={T} title={initial ? "Editar servicio" : "Nuevo servicio"} onClose={onClose} footer={
      <AdBtn T={T} primary full onClick={() => ok && onSave({
        id: (initial && initial.id) || (window.jcmUid ? window.jcmUid("svc") : "svc" + Date.now()),
        name: f.name.trim(), cat: f.cat, desc: (f.desc || "").trim(),
        price: parseInt((f.price + "").replace(/\D/g, ""), 10) || 0,
        dur: parseInt((f.dur + "").replace(/\D/g, ""), 10) || 30,
        pts: parseInt((f.pts + "").replace(/\D/g, ""), 10) || 0
      })}>{initial ? "Guardar cambios" : "Crear servicio"}</AdBtn>
    }>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <AdField T={T} label="Nombre del servicio" value={f.name} onChange={v => setF({ ...f, name: v })} placeholder="Ej: Botox 3 zonas" />
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Categoría</span>
          <select value={f.cat} onChange={e => setF({ ...f, cat: e.target.value })} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}>
            {SVC_CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Descripción / zonas (opcional)</span>
          <textarea value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} rows={2} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Duración</span>
            <select value={f.dur} onChange={e => setF({ ...f, dur: e.target.value })} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}>
              {[15, 30, 45, 60, 90, 120].map(d => <option key={d} value={String(d)}>{d} min</option>)}
            </select>
          </label>
          <AdField T={T} label="Puntos que otorga" value={f.pts} onChange={v => setF({ ...f, pts: v.replace(/\D/g, "") })} inputMode="numeric" placeholder="0" />
        </div>
        <AdField T={T} label="Precio (CLP)" value={f.price} onChange={v => setF({ ...f, price: v.replace(/\D/g, "") })} inputMode="numeric" placeholder="150000" />
      </div>
    </AdModal>
  );
}

function ServiciosView({ T }) {
  const D = window.JCDATA;
  const [custom, setCustom] = useState(customServices);
  const [newSvc, setNewSvc] = useState(null); // objeto en edición o "new"
  function saveSvc(s) {
    const exists = custom.find(x => x.id === s.id);
    const n = exists ? custom.map(x => x.id === s.id ? s : x) : [s, ...custom];
    setCustom(n); saveCustomServices(n); setNewSvc(null);
    try { window.jcmToast && window.jcmToast("Servicio \"" + s.name + "\" " + (exists ? "actualizado" : "creado") + ".", "ok"); } catch (e) {}
  }
  function delSvc(id) { const n = custom.filter(x => x.id !== id); setCustom(n); saveCustomServices(n); try { window.jcmToast && window.jcmToast("Servicio eliminado.", "info"); } catch (e) {} }
  const [active, setActive] = useState({});
  const [over, setOver] = useState({});
  const [editing, setEditing] = useState(null);
  const [hover, setHover] = useState(null);
  const [q, setQ] = useState("");
  function val(it) {
    const o = over[it.n] || {};
    const price = o.price != null ? o.price : it.price;
    const baseDesc = SVC_ZONE[it.n] || it.x || it.d || "";
    return { name: o.name != null ? o.name : it.n, desc: o.desc != null ? o.desc : baseDesc, price, dur: o.dur != null ? o.dur : (it.dur || 60), pts: o.pts != null ? o.pts : (it.pts != null ? it.pts : Math.round(price / 15000)) };
  }
  const sections = (D.catalog || []).filter(s => s.sec !== "Promociones");
  const totalItems = sections.reduce((s, sec) => s + sec.groups.reduce((s2, g) => s2 + g.items.length, 0), 0);
  const ql = q.trim().toLowerCase();
  const matchItem = it => { if (!ql) return true; const v = val(it); return v.name.toLowerCase().includes(ql) || (v.desc || "").toLowerCase().includes(ql); };
  const hits = ql ? sections.reduce((s, sec) => s + sec.groups.reduce((s2, g) => s2 + g.items.filter(matchItem).length, 0), 0) : totalItems;
  const totalAll = totalItems + custom.length;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Servicios" sub={totalAll + " procedimiento" + (totalAll === 1 ? "" : "s") + " · crea los tuyos o edita los existentes"} />
        <AdBtn T={T} primary onClick={() => setNewSvc("new")}>+ Nuevo servicio</AdBtn>
      </div>
      <div style={{ position: "relative", marginBottom: 22 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.6" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar procedimiento por nombre…" style={{ width: "100%", padding: "12px 14px 12px 38px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        {ql && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 6 }}>{hits + custom.filter(s => s.name.toLowerCase().includes(ql)).length} resultado{(hits + custom.filter(s => s.name.toLowerCase().includes(ql)).length) === 1 ? "" : "s"}</div>}
      </div>
      {/* Servicios propios de la clínica (creados aquí). */}
      {(() => {
        const cv = custom.filter(s => !ql || s.name.toLowerCase().includes(ql) || (s.desc || "").toLowerCase().includes(ql));
        if (!cv.length) return totalItems === 0 && !ql ? (
          <div style={{ background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "40px 24px", textAlign: "center", marginBottom: 22 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 420, margin: "0 auto 16px" }}>Aún no tienes servicios. Crea tu primer procedimiento con su nombre, precio, duración y categoría — aparecerá en la agenda y en la reserva online.</div>
            <AdBtn T={T} primary onClick={() => setNewSvc("new")}>+ Crear primer servicio</AdBtn>
          </div>
        ) : null;
        return (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, fontWeight: 600 }}>Servicios de la clínica</div>
              <div style={{ flex: 1, height: 1, background: T.line }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {cv.map(s => (
                <div key={s.id} onClick={() => setNewSvc(s)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{s.name}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{s.cat}{s.desc ? " · " + s.desc : ""}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 3 }}>{s.dur} min{s.pts ? " · " + s.pts + " pts" : ""}</div>
                  </div>
                  <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text, flexShrink: 0 }}>{D.fmt(s.price || 0)}</div>
                  <button onClick={e => { e.stopPropagation(); if (window.confirm("¿Eliminar el servicio “" + s.name + "”?")) delSvc(s.id); }} title="Eliminar" style={{ flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "7px 9px", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
      {ql && hits === 0 && custom.filter(s => s.name.toLowerCase().includes(ql)).length === 0 && <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textFaint, padding: "12px 2px" }}>Sin procedimientos que coincidan con "{q}".</div>}
      {sections.map(section => {
        const vg = section.groups.filter(g => g.items.some(matchItem));
        if (!vg.length) return null;
        return (
        <div key={section.sec} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, fontWeight: 600 }}>{section.sec}</div>
            <div style={{ flex: 1, height: 1, background: T.line }} />
          </div>
          {vg.map(group => {
            const gi = group.items.filter(matchItem);
            return (
            <div key={group.cat} style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 7, paddingLeft: 2 }}>{SVC_CAT_LABEL[group.cat] || group.cat}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {gi.map((it, i) => {
                  const on = active[it.n] !== false;
                  const v = val(it);
                  const hk = section.sec + group.cat + i;
                  return (
                    <div key={i} onClick={() => setEditing({ key: it.n, name: v.name, desc: v.desc, price: String(v.price), dur: String(v.dur), pts: String(v.pts) })}
                      onMouseEnter={() => setHover(hk)} onMouseLeave={() => setHover(null)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + (hover === hk ? T.accent : T.line), cursor: "pointer", transition: "border-color .15s" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{v.name}</div>
                        {v.desc && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.desc}</div>}
                        <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 3, display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{v.dur} min</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: T.gold }}><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" /></svg>{v.pts} pts</span>
                        </div>
                      </div>
                      <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text, flexShrink: 0 }}>{D.fmt(v.price)}</div>
                      <div onClick={e => { e.stopPropagation(); setActive({ ...active, [it.n]: !on }); }}>
                        <AdSwitch T={T} on={on} onClick={() => {}} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );})}
        </div>
        );
      })}
      {editing && (
        <AdModal T={T} title="Editar servicio" onClose={() => setEditing(null)} footer={
          <AdBtn T={T} primary full onClick={() => { setOver({ ...over, [editing.key]: { name: editing.name.trim() || editing.key, desc: editing.desc, price: parseInt((editing.price + "").replace(/\D/g, ""), 10) || 0, dur: parseInt((editing.dur + "").replace(/\D/g, ""), 10) || 60, pts: parseInt((editing.pts + "").replace(/\D/g, ""), 10) || 0 } }); setEditing(null); }}>Guardar cambios</AdBtn>
        }>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <AdField T={T} label="Nombre" value={editing.name} onChange={v => setEditing({ ...editing, name: v })} />
            <label style={{ display: "block" }}>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Descripción / zonas que cubre</span>
              <textarea value={editing.desc} onChange={e => setEditing({ ...editing, desc: e.target.value })} rows={2} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
              <label style={{ display: "block" }}>
                <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Duración</span>
                <select value={editing.dur} onChange={e => setEditing({ ...editing, dur: e.target.value })} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}>
                  {[15, 30, 45, 60, 90].map(d => <option key={d} value={String(d)}>{d} min</option>)}
                </select>
              </label>
              <AdField T={T} label="Puntos que otorga" value={editing.pts} onChange={v => setEditing({ ...editing, pts: v.replace(/\D/g, "") })} inputMode="numeric" />
            </div>
            <AdField T={T} label="Precio (CLP)" value={editing.price} onChange={v => setEditing({ ...editing, price: v.replace(/\D/g, "") })} inputMode="numeric" />
          </div>
        </AdModal>
      )}
      {newSvc && <NewServiceModal T={T} initial={newSvc === "new" ? null : newSvc} onClose={() => setNewSvc(null)} onSave={saveSvc} />}
    </div>
  );
}

/* ─────────── EQUIPO ─────────── */
const PERM_SECCIONES = ["Agenda", "Pacientes", "Servicios", "Inventario", "Reportes", "Marketing", "Configuración"];
function EquipoView({ T }) {
  const [team, setTeam] = useState(() => { try { const t = window.DB && DB.get("team"); if (Array.isArray(t)) return t; } catch (e) {} return ((typeof clinicSeeded === "function") ? clinicSeeded() : true) ? (CADMIN.team || []) : []; });
  const [editing, setEditing] = useState(null); // miembro a editar o "new"
  function save(m) {
    CADMIN.team = (m.id && team.find(x => x.id === m.id)) ? team.map(x => x.id === m.id ? m : x) : [...team, { ...m, id: "t" + Date.now(), color: m.color || "#8B9EB0" }];
    try { window.DB && window.DB.set("team", CADMIN.team); } catch (e) {} // persiste por clínica
    setTeam(CADMIN.team); setEditing(null);
  }
  return (
    <div>
      <SecHead T={T} title="Equipo" sub="Profesionales y permisos" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {team.map(t => (
          <button key={t.id} onClick={() => setEditing(t)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, width: "100%", textAlign: "left", cursor: "pointer" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, flexShrink: 0 }}>{t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text }}>{t.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{t.role}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[t.phone, t.email].filter(Boolean).join("  ·  ")}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7, flexShrink: 0 }}>
              <AdTag T={T} tone={t.active ? "ok" : "muted"}>{t.active ? "Activo" : "Inactivo"}</AdTag>
              <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent }}>Editar →</span>
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 14 }}><AdBtn T={T} primary onClick={() => setEditing("new")}>+ Añadir miembro</AdBtn></div>
      {editing && <ProfesionalForm T={T} member={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}

function ProfesionalForm({ T, member, onClose, onSave }) {
  const [f, setF] = useState(() => member ? { ...member, perms: member.perms || {} } : { name: "", role: "", email: "", phone: "+56 9 ", active: true, access: false, perms: {} });
  const ok = f.name.trim().length > 2;
  function tperm(p) { setF(s => ({ ...s, perms: { ...s.perms, [p]: !s.perms[p] } })); }
  const togRow = (label, on, onClick) => (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer" }}>
      <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{label}</span>
      <AdSwitch T={T} on={on} onClick={onClick} />
    </div>
  );
  return (
    <AdModal T={T} title={member ? "Editar profesional" : "Nuevo profesional"} onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave(f)}>Guardar profesional</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <AdField T={T} label="Nombre completo" value={f.name} onChange={v => setF({ ...f, name: v })} placeholder="Ej: Dra. María Pérez" />
        <AdField T={T} label="Especialidad" value={f.role} onChange={v => setF({ ...f, role: v })} placeholder="Ej: Médico estético" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AdField T={T} label="Email" value={f.email} onChange={v => setF({ ...f, email: v })} inputMode="email" placeholder="correo@ejemplo.com" />
          <AdField T={T} label="Teléfono" value={f.phone} onChange={v => setF({ ...f, phone: v })} inputMode="tel" />
        </div>
        <div>
          <AdField T={T} label="Clave de confirmación (4–6 dígitos)" value={f.pin || ""} onChange={v => setF({ ...f, pin: v.replace(/\D/g, "").slice(0, 6) })} inputMode="numeric" placeholder="••••" />
          <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 7, lineHeight: 1.5 }}>Clave personal del profesional. Se pide para confirmar cambios en las sesiones que él/ella realizó.</p>
        </div>
        {togRow("Profesional activo", f.active, () => setF({ ...f, active: !f.active }))}
        {togRow("Crear cuenta de acceso al sistema", f.access, () => setF({ ...f, access: !f.access }))}
        {f.access && (
          <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "13px 14px" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Permisos · ¿Qué secciones puede usar?</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {PERM_SECCIONES.map(p => { const on = !!f.perms[p]; return (
                <button key={p} onClick={() => tperm(p)} style={{ fontFamily: T.sans, fontSize: 11.5, padding: "8px 12px", borderRadius: 999, cursor: "pointer", background: on ? T.accent : "transparent", color: on ? T.onAccent : T.textMute, border: "1px solid " + (on ? T.accent : T.chipBorder) }}>{p}</button>
              ); })}
            </div>
            <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 }}>El administrador define a qué áreas del panel puede entrar este profesional.</p>
          </div>
        )}
      </div>
    </AdModal>
  );
}

/* ─────────── FIDELIDAD ─────────── */
function FidelidadView({ T }) {
  const seeded = (typeof clinicSeeded === "function") ? clinicSeeded() : true;
  // Sistema de fidelidad encendido/apagado por clínica (persiste en DB).
  const [on, setOn] = useState(() => { try { const v = window.DB && DB.get("fidelity_on"); return v == null ? seeded : !!v; } catch (e) { return seeded; } });
  function setFid(v) { setOn(v); try { if (window.DB) DB.set("fidelity_on", v); } catch (e) {} }
  // Miembros: demo solo para la base/local; las clínicas nuevas parten sin miembros.
  const members = seeded ? CADMIN.fidelity : [];
  const oro = members.filter(m => m.tier === "Oro").length;
  const ptsActivos = members.reduce((s, m) => s + (m.pts || 0), 0);
  return (
    <div>
      <SecHead T={T} title="Fidelidad" sub="Programa de puntos y retención" />
      {/* Interruptor del sistema */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: T.surface, border: "1px solid " + (on ? T.accent + "55" : T.line), borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>Programa de fidelidad</div>
          <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>{on ? "Activo · los pacientes acumulan puntos por cada atención." : "Apagado · enciéndelo para empezar a acumular puntos."}</div>
        </div>
        <AdSwitch T={T} on={on} onClick={() => setFid(!on)} />
      </div>
      {on ? <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
          <AdStat T={T} n={members.length} l="Miembros" />
          <AdStat T={T} n={ptsActivos.toLocaleString("es-CL")} l="Puntos activos" />
          <AdStat T={T} n={oro} l="Miembros Oro" />
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 14, lineHeight: 1.5 }}>
          Los puntos que otorga cada procedimiento se configuran en <b>Servicios</b> (campo “Puntos que otorga” al editar un servicio).
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Pacientes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {members.length === 0 && <Empty2 T={T}>Aún no hay pacientes con puntos. A medida que registres atenciones, aparecerán aquí.</Empty2>}
          {members.map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line }}>
              <Avatar T={T} name={p.name} size={38} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{p.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{p.pts} puntos</div>
              </div>
              <AdTag T={T} tone={p.tier === "Oro" ? "warn" : "muted"}>{p.tier}</AdTag>
            </div>
          ))}
        </div>
      </> : (
        <div style={{ background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "40px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>El programa de fidelidad está apagado. Actívalo arriba para que tus pacientes acumulen puntos por cada procedimiento y puedas premiar su preferencia.</div>
        </div>
      )}
    </div>
  );
}

/* ─────────── MARKETING ─────────── */
function MarketingView({ T, go }) {
  const D = window.JCDATA;
  const [camps, setCamps] = useState(() => ((typeof clinicSeeded === "function") ? clinicSeeded() : true) ? (CADMIN.campaigns || []) : []);
  const totLeads = camps.reduce((a, c) => a + c.leads, 0);
  const totSpend = camps.reduce((a, c) => a + c.spend, 0);
  return (
    <div>
      <SecHead T={T} title="Marketing" sub="Campañas conectadas a Meta Ads e Instagram" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
        <AdStat T={T} n={totLeads} l="Leads (mes)" />
        <AdStat T={T} n={D.fmt(totSpend)} l="Inversión" />
        <AdStat T={T} n={totLeads ? (Math.round(totSpend / totLeads / 100) / 10 + "k") : "—"} l="Costo/lead" />
      </div>
      <a href="https://adsmanager.facebook.com/adsmanager" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 10, marginBottom: 16, textDecoration: "none", background: "#1877F2", border: "1px solid #1877F2" }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,.18)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, flexShrink: 0 }}>f</span>
        <span style={{ flex: 1, fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: "#fff" }}>Ir a Meta Ads Manager</span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
      </a>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Campañas</div>
        <AdBtn T={T} small primary onClick={() => setCamps([{ id: "c" + Date.now(), name: "Nueva campaña", net: "Meta Ads", reach: 0, leads: 0, spend: 0, active: true }, ...camps])}>+ Campaña</AdBtn>
      </div>
      {/* Campañas activas */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1F8A5B" }} />Activas ({camps.filter(c => c.active).length})
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {camps.filter(c => c.active).map(c => (
          <div key={c.id} style={{ padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid rgba(31,138,91,.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{c.name}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <AdTag T={T} tone="ok">Activa</AdTag>
                <button onClick={() => setCamps(camps.map(x => x.id === c.id ? { ...x, active: false } : x))} style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 6, padding: "4px 9px", cursor: "pointer" }}>Pausar</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 18, marginTop: 10 }}>
              <Mini T={T} k="Alcance" v={c.reach.toLocaleString("es-CL")} />
              <Mini T={T} k="Leads" v={c.leads} />
              <Mini T={T} k="Inversión" v={D.fmt(c.spend)} />
              <Mini T={T} k="Red" v={c.net} />
            </div>
          </div>
        ))}
        {!camps.filter(c => c.active).length && <Empty2 T={T}>Sin campañas activas.</Empty2>}
      </div>
      {/* Campañas pausadas */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.textFaint }} />Pausadas ({camps.filter(c => !c.active).length})
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
        {camps.filter(c => !c.active).map(c => (
          <div key={c.id} style={{ padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, opacity: .8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{c.name}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <AdTag T={T} tone="muted">Pausada</AdTag>
                <button onClick={() => setCamps(camps.map(x => x.id === c.id ? { ...x, active: true } : x))} style={{ fontFamily: T.sans, fontSize: 10, color: T.accent, background: "none", border: "1px solid " + T.accent, borderRadius: 6, padding: "4px 9px", cursor: "pointer" }}>Activar</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 18, marginTop: 10 }}>
              <Mini T={T} k="Alcance" v={c.reach.toLocaleString("es-CL")} />
              <Mini T={T} k="Leads" v={c.leads} />
              <Mini T={T} k="Inversión" v={D.fmt(c.spend)} />
              <Mini T={T} k="Red" v={c.net} />
            </div>
          </div>
        ))}
        {!camps.filter(c => !c.active).length && <Empty2 T={T}>Sin campañas pausadas.</Empty2>}
      </div>
      <AdBtn T={T} full onClick={() => go("integraciones")}>Gestionar integraciones</AdBtn>
    </div>
  );
}
function Mini({ T, k, v }) { return <div><div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent }}>{k}</div><div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, marginTop: 3 }}>{v}</div></div>; }

/* ─────────── INTEGRACIONES ─────────── */
function IntegracionesView({ T }) {
  const seeded = (typeof clinicSeeded === "function") ? clinicSeeded() : true;
  // Las clínicas nuevas ven todas las herramientas SIN conexión (cada una conecta las suyas).
  // El estado de conexión se guarda por clínica.
  const [list, setList] = useState(() => {
    let saved = {};
    try { const s = window.DB && DB.get("integrations_state"); if (s) saved = s; } catch (e) {}
    // Catálogo fijo de herramientas; conexión por clínica (todas inician desconectadas).
    return INTEGRATIONS_CATALOG.map(i => ({ ...i, connected: (i.id in saved) ? saved[i.id] : false }));
  });
  function toggle(id) {
    const n = list.map(i => i.id === id ? { ...i, connected: !i.connected } : i);
    setList(n);
    try { if (window.DB) { const map = {}; n.forEach(i => { map[i.id] = i.connected; }); DB.set("integrations_state", map); } } catch (e) {}
  }
  return (
    <div>
      <SecHead T={T} title="Integraciones" sub="Conecta tus herramientas a Medique" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map(it => (
          <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + (it.connected ? T.line : T.lineSoft) }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: it.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, fontWeight: 500, flexShrink: 0 }}>{it.letter}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{it.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{it.connected ? it.stat : it.desc}</div>
            </div>
            <button onClick={() => toggle(it.id)} style={{
              fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", padding: "9px 14px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap",
              background: it.connected ? "transparent" : T.primaryBg, color: it.connected ? "#1F8A5B" : T.primaryText, border: it.connected ? "1px solid #1F8A5B" : "none"
            }}>{it.connected ? "✓ Conectado" : "Conectar"}</button>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 14, lineHeight: 1.6 }}>Cada herramienta se conecta con el inicio de sesión oficial (OAuth) de la plataforma. Conecta solo las que uses en tu clínica.</p>
    </div>
  );
}

/* ─────────── REPORTES ─────────── */
function ReportesView({ T, patients, appts }) {
  const D = window.JCDATA;
  // ── Reportes con datos REALES de la clínica (caja, pacientes, citas). Sin demo: 0 hasta que haya movimientos. ──
  const moves = (() => { try { return (window.DB && window.DB.get("cash_moves")) || []; } catch (e) { return []; } })();
  const ingresos = moves.filter(m => m.type === "ingreso");
  const MES_ABBR = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  // Últimos 6 meses (incluido el actual), ingresos en MM CLP.
  const now = new Date();
  const rev = [];
  for (let k = 5; k >= 0; k--) {
    const d = new Date(now.getFullYear(), now.getMonth() - k, 1);
    const key = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2);
    const sum = ingresos.filter(m => (m.ts || "").slice(0, 7) === key).reduce((s, m) => s + (m.amount || 0), 0);
    rev.push({ m: MES_ABBR[d.getMonth()], v: Math.round(sum / 100000) / 10 }); // MM CLP, 1 decimal
  }
  const serie = rev.map(r => r.v);
  const totalAnual = serie.reduce((a, b) => a + b, 0);
  const growth = serie[0] > 0 ? Math.round((serie[serie.length - 1] / serie[0] - 1) * 100) : 0;
  // Servicios más populares: por número de citas registradas por procedimiento.
  const procCount = {};
  (appts || []).forEach(a => { const k = (a.proc || "").trim(); if (k) procCount[k] = (procCount[k] || 0) + 1; });
  const totalCitas = Object.values(procCount).reduce((a, b) => a + b, 0);
  const pop = Object.entries(procCount).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([n, c]) => [n, totalCitas ? c / totalCitas : 0]);
  // Ticket promedio real (ingresos / nº de ingresos).
  const ticketProm = ingresos.length ? Math.round(ingresos.reduce((s, m) => s + (m.amount || 0), 0) / ingresos.length) : 0;
  const t0 = new Date().toISOString().slice(0, 10);
  const cashToday2 = ingresos.filter(m => (m.ts || "").slice(0, 10) === t0).reduce((s, m) => s + (m.amount || 0), 0);
  // No-show real (citas marcadas no asistió / total con estado).
  const conEstado = (appts || []).filter(a => a.status);
  const noShow = conEstado.length ? Math.round(conEstado.filter(a => a.status === "no_show" || a.status === "ausente").length / conEstado.length * 100) : 0;
  const green = "#1F8A5B";
  // Gráfico de área con curva suave (mismo estilo que el dashboard).
  function RevChart() {
    const W = 720, H = 210, padL = 8, padR = 8, padT = 14, padB = 26;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const maxY = Math.max.apply(null, serie) * 1.18, n = serie.length;
    const X = i => padL + i * innerW / (n - 1);
    const Y = v => padT + (1 - v / maxY) * innerH;
    const line = "M " + serie.map((v, i) => X(i).toFixed(1) + " " + Y(v).toFixed(1)).join(" L ");
    const area = line + " L " + X(n - 1).toFixed(1) + " " + (padT + innerH) + " L " + padL + " " + (padT + innerH) + " Z";
    const grid = [0, 1, 2, 3].map(g => padT + g * innerH / 3);
    return (
      <svg viewBox={"0 0 " + W + " " + H} style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="xMidYMid meet">
        <defs><linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.accent} stopOpacity="0.22" /><stop offset="100%" stopColor={T.accent} stopOpacity="0" /></linearGradient></defs>
        {grid.map((y, i) => <line key={i} x1={padL} y1={y} x2={padL + innerW} y2={y} stroke={T.line} strokeWidth="1" />)}
        <path d={area} fill="url(#repGrad)" />
        <path d={line} fill="none" stroke={T.accent} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        {serie.map((v, i) => <circle key={i} cx={X(i)} cy={Y(v)} r="3.6" fill={T.surface} stroke={T.accent} strokeWidth="2" />)}
        {rev.map((r, i) => <text key={r.m} x={X(i)} y={H - 7} textAnchor="middle" fontSize="11" fontFamily={T.sans} fill={T.textMute}>{r.m}</text>)}
      </svg>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Reportes y estadísticas" sub="Análisis detallado del rendimiento de tu clínica." />
        <select defaultValue="anio" style={{ fontFamily: T.sans, fontSize: 12, padding: "8px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none" }}>
          <option value="anio">Este año</option><option value="mes">Este mes</option><option value="sem">Esta semana</option>
        </select>
      </div>
      {/* Evolución de ingresos — tarjeta moderna con curva de área */}
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "16px 18px", marginBottom: 14, boxShadow: T.shadow ? "0 10px 30px -18px rgba(0,0,0,.25)" : "none" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5-5 4 4 8-8M21 8h-4M21 8v4" /></svg></div>
            <div><div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>Evolución de ingresos</div><div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>Acumulado del año · MM CLP</div></div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: T.serif, fontSize: 22, color: T.text, lineHeight: 1 }}>${totalAnual.toFixed(1)}MM</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: green, marginTop: 3 }}>↗ +{growth}% vs. inicio de año</div>
          </div>
        </div>
        <RevChart />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
        <AdStat T={T} n={D.fmt(ticketProm)} l="Ticket promedio" />
        <AdStat T={T} n={(patients || []).length} l="Pacientes" />
        <AdStat T={T} n={noShow + "%"} l="No-show rate" />
        <AdStat T={T} n={D.fmt(cashToday2)} l="Ingresos hoy" />
      </div>
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "16px 18px", boxShadow: T.shadow ? "0 10px 30px -18px rgba(0,0,0,.25)" : "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg></div>
          <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>Servicios más populares</div>
        </div>
        {pop.length === 0 && <Empty2 T={T}>Aún sin citas registradas. El ranking aparecerá cuando agendes procedimientos.</Empty2>}
        {pop.map(([n, p]) => (
          <div key={n} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 12.5, color: T.text, marginBottom: 5 }}><span>{n}</span><span style={{ color: T.accent, fontWeight: 600 }}>{Math.round(p * 100)}%</span></div>
            <div style={{ height: 7, background: T.surface2, borderRadius: 999, overflow: "hidden" }}><div style={{ height: "100%", width: (p * 100) + "%", background: "linear-gradient(90deg," + T.accent + "," + T.accentDeep + ")", borderRadius: 999 }} /></div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14 }}><AdBtn T={T} full onClick={() => { const csv = "Mes,Ingresos(MM CLP)\n" + rev.map(r => r.m + "," + r.v).join("\n"); const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv); a.download = "reporte-ingresos.csv"; a.click(); }}>Exportar CSV</AdBtn></div>
    </div>
  );
}

/* ─────────── INDICACIONES POST TRATAMIENTO · plantillas ─────────── */
const IND_TPL_SEED = [
  { id: "tpl_tox", name: "Neuromodulación con Toxina botulínica", body: "• No tocar ni masajear la zona tratada por 6 horas.\n• Mantente en posición vertical las primeras 4 horas (no agacharte ni acostarte).\n• Gesticula suavemente la zona tratada durante la primera hora.\n• Evita ejercicio intenso, sauna, sol directo y alcohol por 24 h.\n• No realices masajes faciales ni otros tratamientos en la zona por 2 semanas.\n• El efecto se evidencia entre el día 4 y 14. Control a los 21 días." },
  { id: "tpl_bio", name: "Bioestimulación de colágeno", body: "• Realiza masajes en la zona 5 minutos, 5 veces al día, por 5 días (regla del 5).\n• Aplica frío local las primeras 24 h si hay inflamación.\n• Evita sol directo, sauna y ejercicio intenso por 48 h.\n• Puede haber leve inflamación o pequeños hematomas que ceden en pocos días.\n• Los resultados son progresivos durante las semanas siguientes.\n• Asiste a tus sesiones de control según el plan indicado." },
  { id: "tpl_arm", name: "Armonización facial", body: "• Aplica frío local 10 min cada 2 h durante las primeras 24 h.\n• No manipules ni masajees la zona salvo indicación.\n• Evita ejercicio intenso, sauna, calor y alcohol por 24–48 h.\n• Duerme boca arriba las primeras noches.\n• Pueden aparecer inflamación o hematomas leves que ceden en días.\n• Ante dolor intenso, palidez o cambio de color de la piel, contáctanos de inmediato." }
];
function getIndTemplates() {
  try { const c = (window.DB && DB.cfg().ind_templates); if (c && c.length) return c; } catch (e) {}
  // Solo la clínica base (JC Medical) o el modo local heredan las plantillas de ejemplo; las nuevas parten en blanco.
  return ((typeof clinicSeeded === "function") ? clinicSeeded() : true) ? IND_TPL_SEED : [];
}
// Diagnósticos sugeridos (desplegable en Receta / Indicaciones).
const DIAG_OPTS = ["Neuromodulación con Toxina botulínica", "Bioestimulación de colágeno", "Armonización facial"];
function IndTemplatesEditor({ T }) {
  const [tpls, setTpls] = useState(getIndTemplates);
  const [saved, setSaved] = useState(false);
  function save(n) { setTpls(n); try { DB.set("config", Object.assign({}, DB.cfg(), { ind_templates: n })); setSaved(true); setTimeout(() => setSaved(false), 1800); } catch (e) {} }
  function upd(i, patch) { save(tpls.map((t, j) => j === i ? { ...t, ...patch } : t)); }
  function add() { save([...tpls, { id: "tpl_" + Date.now(), name: "Nueva plantilla", body: "" }]); }
  function del(i) { save(tpls.filter((_, j) => j !== i)); }
  const inp = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" };
  return (
    <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
      <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6"><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></svg>
        Indicaciones post tratamiento
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "5px 0 14px" }}>Plantillas que podrás seleccionar al registrar indicaciones, sin tipear a mano. {saved && <span style={{ color: "#1F8A5B" }}>✓ Guardado</span>}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tpls.map((t, i) => (
          <div key={t.id} style={{ border: "1px solid " + T.line, borderRadius: 10, padding: "12px 13px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <input value={t.name} onChange={e => upd(i, { name: e.target.value })} style={{ ...inp, fontWeight: 600 }} placeholder="Nombre de la plantilla" />
              <button onClick={() => del(i)} title="Eliminar" style={{ flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
            </div>
            <textarea value={t.body} onChange={e => upd(i, { body: e.target.value })} rows={5} placeholder="Indicaciones / cuidados…" style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}><AdBtn T={T} onClick={add}>+ Añadir plantilla</AdBtn></div>
    </div>
  );
}

/* ─────────── CONFIGURACIÓN ─────────── */
function ConfigView({ T }) {
  const D = window.JCDATA;
  // Link de RESERVA DIRECTA, propio de cada clínica (no la app de pacientes).
  const bookUrl = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.bookingLink)
    ? window.JCSAAS.bookingLink()
    : ((typeof window !== "undefined" ? window.location.origin : "") + "/reservar");
  const qr = "https://api.qrserver.com/v1/create-qr-code/?size=170x170&margin=0&data=" + encodeURIComponent(bookUrl);
  const [copied, setCopied] = useState(false);
  function copyLink() { try { navigator.clipboard.writeText(bookUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) {} }
  return (
    <div>
      <SecHead T={T} title="Configuración de la clínica" sub="Administra la información pública y los detalles de tu clínica." />
      {/* Reserva online — comparte tu link */}
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px", marginBottom: 14 }}>
        <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
          Reserva online — comparte tu link
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "5px 0 14px" }}>Comparte este enlace o código QR en Instagram, WhatsApp o tu web para que tus pacientes agenden solos. Es tu página de reserva directa.</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Enlace público</span>
            <div style={{ display: "flex", gap: 8 }}>
              <input readOnly value={bookUrl} onFocus={e => e.target.select()} style={{ flex: 1, fontFamily: T.sans, fontSize: 12.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, outline: "none" }} />
              <button onClick={copyLink} title="Copiar" style={{ flexShrink: 0, padding: "0 13px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 }}>{copied ? "✓" : "Copiar"}</button>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <a href={bookUrl} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, color: T.text, textDecoration: "none", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "9px 13px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>Abrir</a>
              <a href={qr} download="qr-reserva.png" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, color: T.text, textDecoration: "none", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "9px 13px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 16V4M7 11l5 5 5-5M5 20h14" /></svg>Descargar QR</a>
            </div>
          </div>
          <div style={{ flexShrink: 0, background: "#fff", border: "1px solid " + T.line, borderRadius: 12, padding: 10 }}>
            {/* eslint-disable-next-line */}
            <img src={qr} alt="QR de reserva" width="150" height="150" style={{ display: "block" }} />
          </div>
        </div>
      </div>
      <ClinicDataCard T={T} />
      <div style={{ marginBottom: 14 }}><HorariosEditor T={T} /></div>
      <IndTemplatesEditor T={T} />
      <ClinCard T={T} title="Notificaciones">
        <ToggleRow T={T} label="Recordatorio 24 h antes (WhatsApp)" def={true} />
        <ToggleRow T={T} label="Recordatorio el día del tratamiento · 08:30 (WhatsApp)" def={true} />
        <ToggleRow T={T} label="Confirmación por correo (Gmail)" def={true} />
        <ToggleRow T={T} label="Resumen diario con Gemini" def={false} />
      </ClinCard>
    </div>
  );
}
function ClinCard({ T, title, children }) {
  return <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 }}>
    <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>{title}</div>{children}
  </div>;
}
/* Datos de la clínica — propios de cada clínica, editables. Vacíos para clínicas nuevas. */
function ClinicDataCard({ T }) {
  const cfg0 = (() => { try { return (window.DB && DB.cfg()) || {}; } catch (e) { return {}; } })();
  const clinicName = (() => { try { return (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && (window.JCSAAS.currentClinic() || {}).name); } catch (e) { return ""; } })();
  const [f, setF] = useState({
    clinic_name: cfg0.clinic_name || clinicName || "",
    clinic_addr: cfg0.clinic_addr || "",
    professional: cfg0.professional || "",
    wa_number: cfg0.wa_number || ""
  });
  const [saved, setSaved] = useState(false);
  function onWa(v) {
    // Prefijo +569 fijo, solo dígitos.
    let d = (v || "").replace(/\D/g, "");
    if (d.indexOf("569") === 0) d = d.slice(3); else if (d.indexOf("56") === 0) d = d.slice(2);
    d = d.replace(/^9/, "").slice(0, 8);
    setF({ ...f, wa_number: "569" + d }); setSaved(false);
  }
  const waDisplay = "+569 " + ((f.wa_number || "").replace(/^569/, ""));
  function save() {
    try { DB.set("config", Object.assign({}, DB.cfg(), { clinic_name: f.clinic_name.trim(), clinic_addr: f.clinic_addr.trim(), professional: f.professional.trim(), wa_number: (f.wa_number || "").replace(/\D/g, "") })); setSaved(true); setTimeout(() => setSaved(false), 1800); } catch (e) {}
  }
  return (
    <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Datos de la clínica</div>
        <AdBtn T={T} small primary onClick={save}>{saved ? "✓ Guardado" : "Guardar"}</AdBtn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AdField T={T} label="Nombre de la clínica" value={f.clinic_name} onChange={v => { setF({ ...f, clinic_name: v }); setSaved(false); }} placeholder="Ej: Clínica Karenina" />
        <AdField T={T} label="Dirección" value={f.clinic_addr} onChange={v => { setF({ ...f, clinic_addr: v }); setSaved(false); }} placeholder="Ej: 1 Norte 123, oficina 4, Talca" />
        <AdField T={T} label="Profesional a cargo" value={f.professional} onChange={v => { setF({ ...f, professional: v.replace(/[0-9]/g, "") }); setSaved(false); }} placeholder="Ej: Dra. Karenina Soto" />
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>WhatsApp</span>
          <input value={waDisplay} onChange={e => onWa(e.target.value)} inputMode="numeric" placeholder="+569 1234 5678" style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" }} />
        </label>
      </div>
    </div>
  );
}
function Row({ T, k, v }) { return <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 0", fontFamily: T.sans, fontSize: 13 }}><span style={{ color: T.textMute }}>{k}</span><span style={{ color: T.text, textAlign: "right" }}>{v}</span></div>; }
function ToggleRow({ T, label, def }) { const [on, setOn] = useState(def); return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0" }}><span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{label}</span><AdSwitch T={T} on={on} onClick={() => setOn(!on)} /></div>; }

/* ─────────── COLABORACIÓN (Google Form) ─────────── */
function ColaboracionView({ T }) {
  const D = window.JCDATA;
  const [reqs, setReqs] = useState(() => { try { return (window.DB && DB.get("collabs")) || []; } catch (e) { return []; } });
  const [openId, setOpenId] = useState(null);
  const [verRech, setVerRech] = useState(false);
  const [statList, setStatList] = useState(null); // "all" | "nueva" | "aprobada" | "rechazada"
  function setStatus(id, st) { const nx = reqs.map(r => r.id === id ? { ...r, status: st } : r); setReqs(nx); try { if (window.DB) DB.set("collabs", nx); } catch (e) {} }
  const openR = reqs.find(r => r.id === openId);
  const pend = reqs.filter(r => (r.status || "nueva") === "nueva");
  const rech = reqs.filter(r => r.status === "rechazada");        // registro histórico
  const activas = reqs.filter(r => r.status !== "rechazada");      // nuevas + aprobadas
  const reqRow = r => (
    <div key={r.id} style={{ background: T.surface, border: "1px solid " + ((r.status || "nueva") === "nueva" ? T.accent : T.line), borderRadius: 10, padding: "13px 15px", opacity: r.status === "rechazada" ? 0.78 : 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text }}>{r.name}</span>
            <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "2px 8px" }}>{r.kind || "Influencer"}</span>
            {(r.status || "nueva") === "nueva" && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C0285A" }} />}
            {r.status === "aprobada" && <AdTag T={T} tone="ok">Aprobada</AdTag>}
            {r.status === "rechazada" && <AdTag T={T} tone="danger">Rechazada</AdTag>}
          </div>
          <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3 }}>{[r.ig && ("IG " + r.ig), r.reach && (r.reach + " seguidores"), r.phone].filter(Boolean).join("  ·  ")}</div>
        </div>
        <button onClick={() => setOpenId(r.id)} style={{ background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "7px 13px", cursor: "pointer", fontFamily: T.sans, fontSize: 11, color: T.textMute }}>Ver</button>
      </div>
    </div>
  );
  return (
    <div>
      <SecHead T={T} title="Colaboraciones" sub="Postulaciones de gente que quiere colaborar con la clínica, recibidas desde el formulario público." />
      {/* Link del formulario público, propio de cada clínica (las solicitudes llegan a este panel) */}
      {(() => {
        const url = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.collabLink)
          ? window.JCSAAS.collabLink()
          : ((typeof window !== "undefined" ? window.location.origin : "") + "/colaborar.html");
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "13px 15px", marginBottom: 16 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 4 }}>Link del formulario público</div>
              <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text, wordBreak: "break-all" }}>{url}</div>
            </div>
            <button onClick={() => { try { navigator.clipboard.writeText(url); } catch (e) {} }} style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, border: "1px solid " + T.chipBorder, background: T.chipBg, borderRadius: 8, padding: "9px 13px", cursor: "pointer" }}>Copiar</button>
            <a href={url} target="_blank" rel="noopener" style={{ fontFamily: T.sans, fontSize: 11.5, color: T.text, textDecoration: "none", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "9px 13px" }}>Abrir ↗</a>
          </div>
        );
      })()}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
        <div onClick={() => reqs.length && setStatList("all")} style={{ cursor: reqs.length ? "pointer" : "default" }}><AdStat T={T} n={reqs.length} l="Solicitudes" /></div>
        <div onClick={() => pend.length && setStatList("nueva")} style={{ cursor: pend.length ? "pointer" : "default" }}><AdStat T={T} n={pend.length} l="Sin revisar" accent={pend.length > 0} /></div>
        <div onClick={() => reqs.some(r => r.status === "aprobada") && setStatList("aprobada")} style={{ cursor: reqs.some(r => r.status === "aprobada") ? "pointer" : "default" }}><AdStat T={T} n={reqs.filter(r => r.status === "aprobada").length} l="Aprobadas" /></div>
        <div onClick={() => rech.length && setStatList("rechazada")} style={{ cursor: rech.length ? "pointer" : "default" }}><AdStat T={T} n={rech.length} l="Rechazadas" /></div>
      </div>
      {reqs.length === 0 && (
        <div style={{ background: T.surface, border: "1px dashed " + T.line, borderRadius: 10, padding: "40px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>Aún no hay solicitudes. Las solicitudes que envían influencers y marcas desde la app (Mi cuenta → <b>Colabora con nosotros</b>) aparecerán aquí para que las revises.</div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {activas.map(reqRow)}
      </div>
      {/* Registro histórico de rechazadas (por si se necesita el contacto en el futuro) */}
      {rech.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <button onClick={() => setVerRech(v => !v)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", background: "none", border: "none", cursor: "pointer", padding: "4px 0", textAlign: "left" }}>
            <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute }}>Rechazadas · registro ({rech.length})</span>
            <span style={{ flex: 1, height: 1, background: T.line }} />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" style={{ transform: verRech ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M6 9l6 6 6-6" /></svg>
          </button>
          {verRech && <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
            <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginBottom: 2 }}>Solicitudes no concretadas, guardadas para contactarlas en futuras campañas.</div>
            {rech.map(reqRow)}
          </div>}
        </div>
      )}
      {statList && (() => {
        const titulos = { all: "Todas las solicitudes", nueva: "Sin revisar", aprobada: "Aprobadas", rechazada: "Rechazadas" };
        const lista = statList === "all" ? reqs : statList === "nueva" ? pend : statList === "aprobada" ? reqs.filter(r => r.status === "aprobada") : rech;
        return (
          <AdModal T={T} title={titulos[statList] + " (" + lista.length + ")"} onClose={() => setStatList(null)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {lista.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "10px 0" }}>Sin solicitudes en esta categoría.</div>}
              {lista.map(reqRow)}
            </div>
          </AdModal>
        );
      })()}
      {openR && <CollabModal T={T} D={D} r={openR} onClose={() => setOpenId(null)} onStatus={st => setStatus(openR.id, st)} />}
    </div>
  );
}

/* ─────────── COLABORACIÓN · detalle (popup) ─────────── */
function CollabModal({ T, D, r, onClose, onStatus }) {
  const clinic = (window.clinicName && window.clinicName()) || (D && D.brand) || "la clínica";
  const saludo = "Hola " + (r.name || "") + ", ¡gracias por tu interés en colaborar con " + clinic + "!";
  const msgOk = saludo + " Revisamos tu perfil y nos encantaría avanzar contigo. Como los procedimientos de medicina estética son actos médicos, el siguiente paso es una evaluación clínica previa para definir el tratamiento y la fecha. ¿Qué día te acomoda para ver disponibilidad?";
  const msgNo = saludo + " Agradecemos mucho tu propuesta y el tiempo que dedicaste. Por ahora no podremos concretar esta colaboración, pero guardamos tus datos para futuras campañas. ¡Te deseamos mucho éxito!";
  function wa(text) { const p = (r.phone || "").replace(/\D/g, ""); window.open("https://wa.me/" + p + "?text=" + encodeURIComponent(text), "_blank", "noopener"); }
  const igUrl = r.ig ? ("https://instagram.com/" + (r.ig || "").replace(/^@/, "")) : null;
  const rows = [["Correo", r.email], ["Teléfono / WhatsApp", r.phone], ["Ciudad o comuna", r.ciudad], ["Instagram", r.ig], ["TikTok", r.tiktok], ["Red principal", r.redPrincipal], ["Seguidores", r.reach], ["Visualizaciones (30 días)", r.views], ["Audiencia", r.audiencia], ["Procedimiento de interés", r.proc]].filter(x => x[1]);
  const lblS2 = { fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 4 };
  const cBtn = (bg, bd, col) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: T.sans, fontSize: 12, fontWeight: 600, textDecoration: "none", border: "1px solid " + bd, background: bg, color: col, borderRadius: 9, padding: "11px 14px", cursor: "pointer" });
  const waSvg = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></svg>;
  const igSvg = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  const tpl = (titulo, texto, col, onClick) => (
    <div style={{ border: "1px solid " + T.line, borderRadius: 11, padding: 13, background: T.surface, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: col }} />
        <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text }}>{titulo}</span>
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, marginBottom: 11, flex: 1 }}>{texto}</div>
      <button onClick={onClick} style={cBtn(col, col, "#fff")}>{waSvg} Enviar por WhatsApp</button>
    </div>
  );
  return (
    <AdModal T={T} wide title={r.name || "Colaboración"} onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "3px 9px" }}>{r.kind || "Colaboración"}</span>
        {(r.status || "nueva") === "nueva" ? <AdTag T={T} tone="warn">Sin revisar</AdTag> : r.status === "aprobada" ? <AdTag T={T} tone="ok">Aprobada</AdTag> : <AdTag T={T} tone="danger">Rechazada</AdTag>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 18px", marginBottom: 16 }}>
        {rows.map(([k, v]) => <div key={k} style={{ minWidth: 0 }}><div style={lblS2}>{k}</div><div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, wordBreak: "break-word" }}>{v}</div></div>)}
      </div>
      {r.ofrece && (
        <div style={{ marginBottom: 18 }}>
          <div style={lblS2}>Qué ofrece a cambio</div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.6 }}>{r.ofrece}</div>
        </div>
      )}
      <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 20 }}>
        {igUrl && <a href={igUrl} target="_blank" rel="noopener" style={cBtn(T.surface, T.line, T.accent)}>{igSvg} Ver Instagram</a>}
        <button onClick={() => wa(saludo)} style={cBtn(T.surface, "#1F8A5B", "#1F8A5B")}>{waSvg} Contactar por WhatsApp</button>
      </div>
      <div style={{ borderTop: "1px solid " + T.line, paddingTop: 16 }}>
        <div style={lblS2}>Mensajes predeterminados</div>
        <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, fontStyle: "italic", lineHeight: 1.5, margin: "6px 0 13px" }}>Saludo base: “{saludo}”</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {tpl("Solicitud aceptada", msgOk, "#1F8A5B", () => { onStatus("aprobada"); wa(msgOk); })}
          {tpl("Solicitud rechazada", msgNo, "#C0285A", () => { onStatus("rechazada"); wa(msgNo); })}
        </div>
        <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 12, lineHeight: 1.5 }}>Al enviar se abre WhatsApp con el mensaje listo y la solicitud queda marcada como aceptada o rechazada. Si la persona no dejó teléfono, WhatsApp te dejará elegir el contacto con el texto ya escrito.</p>
      </div>
    </AdModal>
  );
}

/* ─────────── FICHA CLÍNICA (antecedentes) ─────────── */
// Valor combinado (chips seleccionados + texto libre) para impresión / resumen / auditoría.
function clinVal(c, key) { if (!c) return ""; const sel = c[key + "Sel"] || []; const txt = c[key] || ""; return [sel.join(", "), txt].filter(Boolean).join(sel.length && txt ? " · " : ""); }

// Suma las unidades escritas en el texto (ej: "20u frontal, 10u procerus" → 30).
// Ignora lo que venga tras "Total U:" para no contar el propio total.
function sumUnits(txt) {
  if (!txt) return 0;
  const body = String(txt).replace(/total\s*u\s*:?.*$/is, "");
  let sum = 0, m; const re = /(\d+)\s*u\b/gi;
  while ((m = re.exec(body))) sum += parseInt(m[1], 10);
  return sum;
}
function FichaClinicaForm({ T, patient, updatePatient }) {
  const [f, setF] = useState(patient.clinica || {});
  const [saved, setSaved] = useState(false);
  const setVal = (k, v) => { setF(prev => ({ ...prev, [k]: v })); setSaved(false); };
  // Al tocar un chip, su texto se escribe (o se quita) en la barra del propio parámetro.
  const tokenToggle = (k, tok) => { setF(prev => { const cur = (prev[k] || "").split(",").map(s => s.trim()).filter(Boolean); const i = cur.indexOf(tok); if (i >= 0) cur.splice(i, 1); else cur.push(tok); return { ...prev, [k]: cur.join(", ") }; }); setSaved(false); };
  const chipActive = (k, tok) => (f[k] || "").split(",").map(s => s.trim()).includes(tok);

  const lbl = { display: "block", fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = extra => ({ width: "100%", padding: "10px 11px", borderRadius: 4, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none", ...(extra || {}) });
  const card = { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px", marginBottom: 14 };
  const head = { fontFamily: T.serif, fontSize: 18, color: T.text, marginBottom: 14 };
  const chipBtn = on => ({ fontFamily: T.sans, fontSize: 11.5, padding: "7px 12px", borderRadius: 999, cursor: "pointer", background: on ? T.accent : T.bg, color: on ? (T.onAccent || "#fff") : T.textMute, border: "1px solid " + (on ? T.accent : T.line) });

  // Helpers invocados como FUNCIONES (no como <Componentes/>) para no remontar inputs y perder el foco al escribir.
  const text = (k, ph, only) => <input value={f[k] || ""} onChange={e => setVal(k, e.target.value)} placeholder={ph || "Escribe aquí…"} data-only={only} style={inp()} />;
  const sel = (k, options, ph) => <select value={f[k] || ""} onChange={e => setVal(k, e.target.value)} style={inp()}><option value="">{ph || "— Selecciona —"}</option>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>;
  const chips = (k, options) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{options.map(o => <button key={o} type="button" onClick={() => tokenToggle(k, o)} style={chipBtn(chipActive(k, o))}>{o}</button>)}</div>;
  const field = (label, node) => <label style={{ display: "block" }}><span style={lbl}>{label}</span>{node}</label>;
  // Barra primero (alineada entre columnas) y los botones debajo, dentro del mismo parámetro.
  const chipField = (label, k, options, ph) => <div><span style={lbl}>{label}</span>{text(k, ph)}{chips(k, options)}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Ficha clínica</div>
        <AdBtn T={T} small primary onClick={() => { updatePatient(patient.id, { clinica: f }); setSaved(true); }}>{saved ? "✓ Guardada" : "Guardar ficha"}</AdBtn>
      </div>

      {/* Antecedentes médicos */}
      <div style={card}>
        <div style={head}>Antecedentes médicos</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          {chipField("Antecedentes mórbidos", "morbidos", ["Hipertensión", "Hipotiroidismo", "Diabetes", "Asma", "Rosácea"], "Otro antecedente…")}
          {field("Alergias", text("alergias", "Ej. Penicilina, AINEs…", "alpha"))}
          {field("Antecedentes quirúrgicos", text("quirurgicos", "Cirugías previas…"))}
          {chipField("Procedimientos estéticos previos", "esteticos", ["Botox", "Rinomodelación", "Sculptra", "Radiesse", "Mesoterapia", "Quemadores de grasa"], "Producto / detalle (ej. mesoterapia con…)")}
          {field("Hospitalizaciones", text("hospital", "—"))}
          {field("Medicamentos de uso diario", text("medicamentos", "—"))}
        </div>
      </div>

      {/* Piel y factores de riesgo */}
      <div style={card}>
        <div style={head}>Piel y factores de riesgo</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          {field("Cicatriz hipertrófica / queloides", text("cicatriz", "—"))}
          {field("Patología dérmica", text("dermica", "—"))}
          {field("Problemas de coagulación", text("coagulacion", "—"))}
          {field("Enfermedades autoinmunes", text("autoinmune", "—"))}
          {field("Historial de herpes labial", text("herpes", "—"))}
          {field("Exposición solar", sel("expsolar", ["Alta", "Media", "Baja"]))}
          {field("Uso de bloqueador", sel("bloqueador", ["Diario", "2 veces al día", "Cada 4 horas"]))}
        </div>
      </div>

      {/* Hábitos */}
      <div style={card}>
        <div style={head}>Hábitos</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          {field("Tabaco", <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input value={f.tabaco || ""} onChange={e => setVal("tabaco", e.target.value.replace(/\D/g, "").slice(0, 3))} data-only="num" inputMode="numeric" placeholder="0" style={inp({ width: 70, textAlign: "center" })} />
            <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, whiteSpace: "nowrap" }}>cigarros al día</span>
          </div>)}
          {field("Alcohol", sel("alcohol", ["Diario", "Fines de semana", "Social", "Nunca"]))}
          {field("Drogas", sel("drogas", ["Ninguna", "Marihuana", "Cocaína", "Benzodiacepinas", "Otra"]))}
          {field("Nivel de consumo (drogas)", sel("drogasNivel", ["Recreativo", "3x semana", "Diario"]))}
          {field("Consumo de agua diario", sel("agua", ["1 lt", "1–2 lt", "+2 lt"]))}
          {field("Actividad física", sel("actividad", ["Sedentario", "1–3x semana", "3–5x semana", "Diario"]))}
          {field("Embarazo / lactancia", <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => setVal("embarazo", f.embarazo === "Niega" ? "" : "Niega")} style={chipBtn(f.embarazo === "Niega")}>Niega</button>
            <input value={f.embarazo === "Niega" ? "" : (f.embarazo || "")} onChange={e => setVal("embarazo", e.target.value)} placeholder="Semanas / detalle si aplica…" style={inp({ flex: 1 })} />
          </div>)}
          {field("Alimentación", sel("alimentacion", ["Balanceada", "No balanceada", "Hipocalórica", "Hipercalórica", "Hiperproteica"]))}
        </div>
        <div style={{ marginTop: 14 }}>
          <span style={lbl}>Cuidados de la piel en casa</span>
          {chips("skincare", ["Bloqueador", "Sérum", "Crema", "Contorno de ojos", "Vitamina C"])}
          <div style={{ marginTop: 10 }}>{text("skincare", "Otros productos…")}</div>
        </div>
      </div>

      {/* Evaluación y plan */}
      <div style={card}>
        <div style={head}>Evaluación y plan</div>
        {[["evaluacion", "Evaluación facial"], ["plan", "Tratamientos recomendados"]].map(([k, label]) => {
          const isPlan = k === "plan";
          const totalU = isPlan ? sumUnits(f.plan) : 0;
          // En "Tratamientos recomendados", al escribir "Total U:" el número se completa solo
          // con la suma de las unidades escritas antes (ej: 20u + 10u + 5u → Total U: 35).
          const onCh = isPlan
            ? e => { let v = e.target.value; v = v.replace(/(total\s*u\s*:?[ \t]*)(\d*)([ \t]*)$/i, (_m, pre) => pre + sumUnits(v)); setVal(k, v); }
            : e => setVal(k, e.target.value);
          return (
            <label key={k} style={{ display: "block", marginBottom: 12 }}>
              <span style={lbl}>{label}</span>
              <textarea value={f[k] || ""} onChange={onCh} rows={3} placeholder={isPlan ? 'Ej: 20u frontal, 10u procerus… escribe "Total U:" y se suma solo' : "—"} style={inp({ resize: "vertical" })} />
              {isPlan && totalU > 0 && <span style={{ display: "inline-block", marginTop: 7, fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: T.accent, background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + (T.accent + "44"), borderRadius: 999, padding: "4px 11px" }}>Σ Total detectado: {totalU} U</span>}
            </label>
          );
        })}
      </div>
    </div>
  );
}

/* helpers compartidos */
function SecHead({ T, title, sub }) {
  return <div style={{ marginBottom: 18 }}>
    <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 32, letterSpacing: "-.02em", color: T.text, lineHeight: 1 }}>{title}</h1>
    {sub && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 6 }}>{sub}</div>}
  </div>;
}
function AdSwitch({ T, on, onClick }) {
  return <button onClick={onClick} style={{ width: 42, height: 25, borderRadius: 999, border: "none", cursor: "pointer", background: on ? "#1F8A5B" : T.surface2, position: "relative", transition: "background .25s", flexShrink: 0 }}>
    <span style={{ position: "absolute", top: 3, left: on ? 20 : 3, width: 19, height: 19, borderRadius: "50%", background: "#fff", transition: "left .25s " + T.ease, boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
  </button>;
}

/* ─────────── HORARIOS POR DÍA (editable) ─────────── */
function HorariosEditor({ T }) {
  const D = window.JCDATA;
  const DOW = [["Lunes", 1], ["Martes", 2], ["Miércoles", 3], ["Jueves", 4], ["Viernes", 5], ["Sábado", 6], ["Domingo", 0]];
  const [wd, setWd] = useState(1);
  const [open, setOpen] = useState(true);
  const [slots, setSlots] = useState([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => { const a = D.availability(wd); setOpen(a.open); setSlots(a.slots.slice()); setSaved(false); }, [wd]);
  const grid = D.defaultSlots(1);
  function toggle(s) { setSlots(slots.includes(s) ? slots.filter(x => x !== s) : [...slots, s].sort()); setSaved(false); }
  const allOn = grid.length > 0 && grid.every(s => slots.includes(s));
  function toggleAll() { setSlots(allOn ? [] : grid.slice()); setSaved(false); }
  function save() { D.saveHorarios(wd, { open: open, slots: slots }); if (D.rebuildSchedule) D.rebuildSchedule(); setSaved(true); }
  return (
    <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px", marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Horarios disponibles por día</div>
        <AdBtn T={T} small primary onClick={save}>{saved ? "✓ Guardado" : "Guardar día"}</AdBtn>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {DOW.map(([l, v]) => <button key={v} onClick={() => setWd(v)} style={{ fontFamily: T.sans, fontSize: 11, padding: "8px 12px", borderRadius: 999, cursor: "pointer", background: wd === v ? T.text : T.surface, color: wd === v ? T.bg : T.textMute, border: "1px solid " + (wd === v ? T.text : T.line) }}>{l}</button>)}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0 14px", borderBottom: "1px solid " + T.lineSoft, marginBottom: 14 }}>
        <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{open ? "Día abierto" : "Día cerrado"}</span>
        <AdSwitch T={T} on={open} onClick={() => { setOpen(!open); setSaved(false); }} />
      </div>
      {open && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>{slots.length} de {grid.length} horas activas</span>
          <button onClick={toggleAll} style={{ fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 999, padding: "6px 13px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">{allOn ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M20 6 9 17l-5-5" />}</svg>
            {allOn ? "Quitar todas" : "Seleccionar todas"}
          </button>
        </div>
      )}
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7 }}>
          {grid.map(s => { const on = slots.includes(s); return (
            <button key={s} onClick={() => toggle(s)} style={{ padding: "9px 4px", borderRadius: 5, cursor: "pointer", fontFamily: T.sans, fontSize: 12, background: on ? T.accent : T.bg, color: on ? T.onAccent : T.textMute, border: "1px solid " + (on ? T.accent : T.line) }}>{s}</button>
          ); })}
        </div>
      )}
      <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 12, lineHeight: 1.5 }}>Activa o desactiva cada hora. Los cambios se reflejan en las reservas del sitio al recargar la landing.</p>
    </div>
  );
}

/* ─────────── PENDIENTES ─────────── */
function PendientesView({ T, patients, appts, go, openP, updatePatient }) {
  const D = window.JCDATA;
  const [tasks, setTasks] = useState(() => { try { return DB.get("admin_tasks") || []; } catch (e) { return []; } });
  const [draft, setDraft] = useState("");
  function saveTasks(n) { setTasks(n); try { DB.set("admin_tasks", n); } catch (e) {} }
  function addTask() { if (!draft.trim()) return; saveTasks([{ id: "t" + Date.now(), text: draft.trim(), done: false }, ...tasks]); setDraft(""); }
  function toggleTask(id) { saveTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)); }
  function delTask(id) { saveTasks(tasks.filter(t => t.id !== id)); }
  const tPend = tasks.filter(t => !t.done), tDone = tasks.filter(t => t.done);
  const taskCard = t => (
    <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "10px 12px" }}>
      <button onClick={() => toggleTask(t.id)} title={t.done ? "Reabrir" : "Completar"} style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 5, border: "1.5px solid " + (t.done ? "#4E8A72" : T.chipBorder), background: t.done ? "#4E8A72" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>{t.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>}</button>
      <span style={{ flex: 1, fontFamily: T.sans, fontSize: 13, color: t.done ? T.textFaint : T.text, textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
      <button onClick={() => delTask(t.id)} title="Eliminar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 2 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
    </div>
  );
  const seeded = (typeof clinicSeeded === "function") ? clinicSeeded() : true;
  const sinConsent = patients.filter(p => !p.consent);
  const recitas = (window.recitaDue ? window.recitaDue(patients) : []);
  // WhatsApp/Business/seguimientos de ejemplo: solo la clínica base o el modo local. Las nuevas parten vacías.
  const waMsgs = seeded ? (CADMIN.waMessages || []) : [];
  const bizC = seeded ? (CADMIN.bizComments || []) : [];
  const segs = seeded ? (D.reminders || []) : [];
  return (
    <div>
      <SecHead T={T} title="Pendientes" sub="Tareas generales del equipo y seguimientos clínicos." />
      {/* Tareas del equipo: agregar + dos columnas (Pendientes / Completadas) */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder="Nuevo pendiente…" style={{ flex: 1, fontFamily: T.sans, fontSize: 13, padding: "11px 14px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none" }} />
        <button onClick={addTask} style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "0 18px", cursor: "pointer", whiteSpace: "nowrap" }}>+ Agregar</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
        <div style={{ background: T.surface2, border: "1px solid " + T.line, borderRadius: 10, padding: 14 }}>
          <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text, marginBottom: 10 }}>Pendientes ({tPend.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{tPend.length ? tPend.map(taskCard) : <Empty2 T={T}>Nada pendiente. 🎉</Empty2>}</div>
        </div>
        <div style={{ background: T.surface2, border: "1px solid " + T.line, borderRadius: 10, padding: 14 }}>
          <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text, marginBottom: 10 }}>Completadas ({tDone.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{tDone.length ? tDone.map(taskCard) : <Empty2 T={T}>Aún nada completado.</Empty2>}</div>
        </div>
      </div>
      <Group T={T} title={"Consentimientos por firmar (" + sinConsent.length + ")"}>
        {sinConsent.map(p => <PendRow key={p.id} T={T} name={p.name} desc={(p.tags && p.tags[0]) || "Paciente"} action="Abrir ficha" onClick={() => openP(p.id)} />)}
        {!sinConsent.length && <Empty2 T={T}>Todo firmado.</Empty2>}
      </Group>
      <Group T={T} title={"Re-citar · esquema en curso (" + recitas.length + ")"}>
        {recitas.map(({ p, r }) => <PendRow key={p.id} T={T} name={p.name} desc={r.motivo + " · " + r.precioFmt + " → " + r.descFmt} action="WhatsApp" href={window.recitaWa ? window.recitaWa(p, r) : ("https://wa.me/" + (p.phone || "").replace(/\D/g, ""))} />)}
        {!recitas.length && <Empty2 T={T}>Sin re-citas por contactar hoy.</Empty2>}
      </Group>
      <Group T={T} title={"Mensajes de WhatsApp por responder (" + waMsgs.length + ")"}>
        {waMsgs.map(m => <PendRow key={m.id} T={T} name={m.name} desc={'“' + m.msg + '” · ' + m.ago} action="Responder" href={"https://wa.me/" + D.wa} />)}
        {!waMsgs.length && <Empty2 T={T}>Bandeja al día.</Empty2>}
      </Group>
      <Group T={T} title={"Comentarios en Business Manager (" + bizC.length + ")"}>
        {bizC.map(c => <PendRow key={c.id} T={T} name={c.name + " · " + c.net} desc={'“' + c.msg + '” · ' + c.ago} action="Responder" href="https://business.facebook.com/latest/inbox" />)}
        {!bizC.length && <Empty2 T={T}>Sin comentarios pendientes.</Empty2>}
      </Group>
      <Group T={T} title={"Seguimientos (" + segs.length + ")"}>
        {segs.map(r => <PendRow key={r.id} T={T} name={r.name} desc={r.type + " · " + r.due} action="WhatsApp" href={"https://wa.me/" + D.wa} />)}
      </Group>
    </div>
  );
}
function Group({ T, title, children }) { return <div style={{ marginBottom: 20 }}><div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>{title}</div><div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div></div>; }
function Empty2({ T, children }) { return <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint, padding: "4px 0" }}>{children}</div>; }
function PendRow({ T, name, desc, action, onClick, href }) {
  const inner = [
    React.createElement("div", { key: "a", style: { flex: 1, minWidth: 0 } },
      React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, name),
      React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, desc)),
    React.createElement("span", { key: "b", style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, whiteSpace: "nowrap" } }, action + " →")
  ];
  const st = { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer", textDecoration: "none" };
  return href
    ? React.createElement("a", { href: href, target: "_blank", rel: "noopener", style: st }, inner)
    : React.createElement("button", { onClick: onClick, style: { ...st, width: "100%", textAlign: "left" } }, inner);
}

/* ─────────── SALA DE ESPERA (kanban) ─────────── */
const WAIT_COLS = [["porllegar", "Por llegar"], ["espera", "En espera"], ["atencion", "En atención"], ["fin", "Finalizado"]];
function SalaEsperaView({ T, appts, patients }) {
  const hoy = appts.filter(a => a.day === 0);
  const [status, setStatus] = useState(() => { try { return DB.get("waiting_status") || {}; } catch (e) { return {}; } });
  function setS(id, st) { const n = { ...status, [id]: st }; setStatus(n); try { DB.set("waiting_status", n); } catch (e) {} }
  const stOf = a => status[a.id] || "espera";
  const next = st => ({ porllegar: "espera", espera: "atencion", atencion: "fin" })[st];
  const lbl = { porllegar: "Marcar llegada", espera: "Pasar a atención", atencion: "Finalizar" };
  const today = new Date().toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
  return (
    <div>
      <SecHead T={T} title="Sala de espera" sub={"Pacientes de hoy, " + today + ". Actualiza el estado a medida que llegan y se atienden."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {WAIT_COLS.map(([k, l]) => {
          const items = hoy.filter(a => stOf(a) === k);
          return (
            <div key={k} style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: 12, minHeight: 200 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent }}>{l}</span>
                <span style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>{items.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map(a => (
                  <div key={a.id} style={{ background: T.bg, border: "1px solid " + T.line, borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{a.name}</span>
                      <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{a.time}</span>
                    </div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{a.proc}</div>
                    {next(k) && <button onClick={() => setS(a.id, next(k))} style={{ marginTop: 8, width: "100%", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.accent, background: T.accentSoft || "rgba(84,112,127,.12)", border: "none", borderRadius: 6, padding: "7px", cursor: "pointer" }}>{lbl[k]} →</button>}
                  </div>
                ))}
                {!items.length && <Empty2 T={T}>—</Empty2>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────── AUTOMATIZACIONES ─────────── */
const AUTO_SEED = [
  { id: "r24", t: "Recordatorio de cita (24 h antes)", d: "Envía un mensaje a los pacientes 24 horas antes de su cita para confirmar asistencia.", on: true, ch: "WhatsApp", ic: "clock" },
  { id: "rmorning", t: "Recordatorio el día del tratamiento (08:30)", d: "Mensaje por WhatsApp a las 08:30 del día del tratamiento para recordar la hora.", on: true, ch: "WhatsApp", ic: "sun" },
  { id: "rind", t: "Indicaciones post tratamiento", d: "Al finalizar la atención, envía por WhatsApp las indicaciones y cuidados del procedimiento realizado.", on: true, ch: "WhatsApp", ic: "chat" },
  { id: "rpost", t: "Seguimiento de tratamiento (14 días)", d: "Mensaje automático a los 14 días para control de resultados.", on: false, ch: "WhatsApp", ic: "chat" },
  { id: "rbday", t: "Saludo de cumpleaños", d: "Envía un mensaje felicitando al paciente en su cumpleaños.", on: false, ch: "Email", ic: "gift" },
  { id: "rreview", t: "Solicitud de reseña", d: "Se envía por WhatsApp junto con las indicaciones post tratamiento: al final del mensaje se incluye tu enlace de Google para dejar reseña.", on: false, ch: "WhatsApp", ic: "star", bundle: "indicaciones" },
  { id: "rreact", t: "Reactivación (90 días sin venir)", d: "Invitación a reagendar para pacientes inactivos.", on: false, ch: "WhatsApp", ic: "refresh" }
];
const AUTO_IC = {
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  sun: <><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" /></>,
  chat: <><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z" /></>,
  gift: <><rect x="3" y="8" width="18" height="13" rx="1.5" /><path d="M3 12h18M12 8v13M12 8S10 3 7.5 4.5 9.5 8 12 8zM12 8s2-5 4.5-3.5S14.5 8 12 8z" /></>,
  star: <><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" /></>,
  refresh: <><path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" /></>
};
const AUTO_CH_COLOR = { WhatsApp: "#1F8A5B", Email: "#caa86a", SMS: "#9C8AB5" };
function AutomatizacionesView({ T }) {
  // Fusiona el estado guardado (solo on/off) con los metadatos del código, para que
  // textos/canales nuevos siempre se reflejen aunque haya reglas guardadas antes.
  const [rules, setRules] = useState(() => {
    let saved = {};
    try { const s = DB.get("automations"); if (s && s.length) s.forEach(r => { saved[r.id] = r.on; }); } catch (e) {}
    return AUTO_SEED.map(r => ({ ...r, on: r.id in saved ? saved[r.id] : r.on }));
  });
  function toggle(id) { const n = rules.map(r => r.id === id ? { ...r, on: !r.on } : r); setRules(n); try { DB.set("automations", n); } catch (e) {} }
  // Enlace de reseña PROPIO de la clínica (formulario Medique): medique.cl/review?c=clinicId
  const reviewUrl = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.reviewLink)
    ? window.JCSAAS.reviewLink()
    : ((typeof window !== "undefined" ? window.location.origin : "") + "/review.html");
  const [copiedRev, setCopiedRev] = useState(false);
  function copyReview() { try { navigator.clipboard.writeText(reviewUrl); setCopiedRev(true); setTimeout(() => setCopiedRev(false), 1800); } catch (e) {} }
  // Reseñas recibidas (importadas al panel desde el formulario público).
  const reviews = (() => { try { return (window.DB && DB.get("reviews")) || []; } catch (e) { return []; } })();
  const avg = reviews.length ? (reviews.reduce((s, r) => s + (r.stars || 0), 0) / reviews.length) : 0;
  const stars = n => "★★★★★☆☆☆☆☆".slice(5 - Math.round(n), 10 - Math.round(n));
  return (
    <div>
      <SecHead T={T} title="Automatizaciones" sub="Configura recordatorios y mensajes automáticos para tus pacientes." />
      <div style={{ background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>
        El envío real de WhatsApp/Email/SMS se ejecuta desde el servidor (Medique). Aquí configuras y visualizas las reglas.
      </div>
      {/* Formulario de reseñas propio de la clínica (Medique). Se comparte con los pacientes; las reseñas llegan al panel. */}
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>Formulario de reseñas de tu clínica</div>
          {reviews.length > 0 && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.gold }}>{stars(avg)} <span style={{ color: T.textMute }}>{avg.toFixed(1)} · {reviews.length} reseña{reviews.length === 1 ? "" : "s"}</span></div>}
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12, lineHeight: 1.5 }}>Comparte este enlace con tus pacientes (se incluye al final del mensaje de indicaciones cuando "Solicitud de reseña" está activa). Las reseñas que dejen llegan a este panel.</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input readOnly value={reviewUrl} onFocus={e => e.target.select()} style={{ flex: 1, minWidth: 220, padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" }} />
          <button onClick={copyReview} style={{ padding: "0 14px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 }}>{copiedRev ? "✓" : "Copiar"}</button>
          <a href={reviewUrl} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", padding: "0 14px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.text, textDecoration: "none", fontFamily: T.sans, fontSize: 11.5 }}>Abrir ↗</a>
        </div>
        {/* Últimas reseñas recibidas */}
        {reviews.length > 0 && (
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {reviews.slice(0, 5).map(r => (
              <div key={r.id} style={{ background: T.surface2, border: "1px solid " + T.line, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text }}>{r.name || "Anónimo"}</span>
                  <span style={{ fontFamily: T.sans, fontSize: 12, color: T.gold }}>{stars(r.stars || 0)}</span>
                </div>
                {r.comment && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 3, lineHeight: 1.5 }}>{r.comment}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
        {rules.map(r => {
          const cc = AUTO_CH_COLOR[r.ch] || T.accent;
          return (
            <div key={r.id} style={{ background: T.surface, border: "1px solid " + (r.on ? T.accent + "55" : T.line), borderRadius: 14, padding: "18px 18px 16px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 11, background: cc + "1c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={cc} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{AUTO_IC[r.ic]}</svg>
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.serif, fontSize: 16.5, color: T.text, lineHeight: 1.2 }}>{r.t}</div>
                  <span style={{ display: "inline-block", marginTop: 5, fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", color: T.textMute, background: T.surface2, border: "1px solid " + T.line, borderRadius: 6, padding: "2px 7px" }}>{r.ch}</span>
                </div>
                <button onClick={() => toggle(r.id)} title={r.on ? "Activado" : "Desactivado"} style={{ flexShrink: 0, width: 44, height: 25, borderRadius: 999, border: "none", cursor: "pointer", background: r.on ? T.accent : T.line, position: "relative", transition: "background .2s" }}>
                  <span style={{ position: "absolute", top: 3, left: r.on ? 22 : 3, width: 19, height: 19, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
                </button>
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 12, lineHeight: 1.5 }}>{r.d}</p>
              {r.on && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 10, borderTop: "1px solid " + T.lineSoft }}>
                <span style={{ fontFamily: T.sans, fontSize: 10.5, color: "#1F8A5B", display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1F8A5B" }} /> Activo y funcionando</span>
                <span style={{ fontFamily: T.sans, fontSize: 11, color: T.accent }}>Editar mensaje</span>
              </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────── AGENTE IA (bandeja WhatsApp) ─────────── */
const WA_SEED = [
  { id: "c1", name: "Camila Rojas", phone: "+56 9 1111 1111", msgs: [{ f: "in", t: "Hola, ¿tienen hora para botox esta semana?", h: "09:12" }, { f: "out", t: "¡Hola Camila! Sí 😊 Tenemos el jueves a las 16:00. ¿Te sirve?", h: "09:13" }, { f: "in", t: "Perfecto, agéndame ahí", h: "09:15" }] },
  { id: "c2", name: "María Soto", phone: "+56 9 2222 2222", msgs: [{ f: "in", t: "¿Cuánto cuesta la rinomodelación?", h: "Ayer" }, { f: "out", t: "Tiene un valor de $170.000 e incluye evaluación. ¿Quieres agendar?", h: "Ayer" }] },
  { id: "c3", name: "Javier Díaz", phone: "+56 9 3333 3333", msgs: [{ f: "in", t: "Necesito reagendar mi cita del viernes", h: "08:40" }] }
];
/* Popup de cita agendada con éxito: muestra hora reservada + slots del día */
function CitaAgendadaOkPopup({ T, cita, appts, onClose }) {
  const D = window.JCDATA;
  const slots = (D.defaultSlots ? D.defaultSlots(1) : []);
  const ocupados = (appts || []).filter(a => a.day === (cita.day || 0)).map(a => a.time);
  const citaTime = cita.time || "";
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 460, background: T.bg, border: "1px solid " + T.line, borderRadius: 16, padding: "26px 24px", animation: "jcSlideUp .28s " + T.ease }}>
        {/* check de éxito */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(31,138,91,.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F8A5B" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 22, color: T.text, marginBottom: 4 }}>Cita agendada</div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, textAlign: "center" }}>
            <b style={{ color: T.text }}>{cita.name}</b> · {cita.proc}<br />
            <span style={{ color: T.accent }}>{cita.time} · {cita.day === 0 ? "hoy" : cita.day === 1 ? "mañana" : "en " + cita.day + " días"}</span>
          </div>
          {/* notificación WA */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 10, background: "rgba(31,138,91,.08)", border: "1px solid rgba(31,138,91,.25)", borderRadius: 8, padding: "8px 14px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1F8A5B" strokeWidth="1.8"><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></svg>
            <span style={{ fontFamily: T.sans, fontSize: 11.5, color: "#1F8A5B" }}>Notificación enviada al paciente por WhatsApp</span>
          </div>
        </div>
        {/* mini calendario del día */}
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "14px 16px", marginBottom: 18 }}>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>
            {cita.day === 0 ? "Agenda de hoy" : cita.day === 1 ? "Agenda de mañana" : "Agenda del día"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 5 }}>
            {slots.slice(0, 12).map(s => {
              const isNew = s === citaTime;
              const isBusy = ocupados.includes(s);
              return (
                <div key={s} style={{ padding: "7px 4px", borderRadius: 5, textAlign: "center", fontFamily: T.sans, fontSize: 11.5, fontWeight: isNew ? 700 : 400, background: isNew ? "#1F8A5B" : isBusy ? T.surface2 : T.bg, color: isNew ? "#fff" : isBusy ? T.textFaint : T.text, border: "1px solid " + (isNew ? "#1F8A5B" : T.line), textDecoration: isBusy && !isNew ? "line-through" : "none" }}>{s}</div>
              );
            })}
          </div>
        </div>
        <button onClick={onClose} style={{ width: "100%", fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "13px", cursor: "pointer" }}>Entendido</button>
      </div>
    </div>
  );
}
function AgenteIAView({ T, patients, addAppt }) {
  const seeded = (typeof clinicSeeded === "function") ? clinicSeeded() : true;
  const [convs, setConvs] = useState(() => { try { const s = DB.get("wa_conversations"); if (s) return s; } catch (e) {} return seeded ? WA_SEED : []; });
  const [appts, setAppts] = useState(() => { try { return DB.get("appts") || []; } catch (e) { return []; } });
  const [sel, setSel] = useState(convs[0] ? convs[0].id : null);
  const [draft, setDraft] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [darCita, setDarCita] = useState(null); // {name, phone}
  const [citaOk, setCitaOk] = useState(null);   // cita recién creada
  const conv = convs.find(c => c.id === sel);
  function send() {
    if (!draft.trim() || !conv) return;
    const n = convs.map(c => c.id === sel ? { ...c, msgs: [...c.msgs, { f: "out", t: draft.trim(), h: "ahora" }] } : c);
    setConvs(n); try { DB.set("wa_conversations", n); } catch (e) {} setDraft("");
  }
  // Sugerir respuesta con IA (Groq vía /api/ai). La key vive en el servidor; si no está
  // configurada, avisa sin romper. Rellena el borrador para que el equipo lo revise y envíe.
  function aiSuggest() {
    if (!conv || aiBusy || !window.mediqueAI) return;
    setAiBusy(true);
    const clinic = {
      name: (window.clinicName && window.clinicName()) || "",
      address: (window.clinicAddr && window.clinicAddr()) || "",
      hours: (() => { try { return DB.cfg().clinic_hours || ""; } catch (e) { return ""; } })(),
      services: (window.clinicServiceList ? window.clinicServiceList() : []).slice(0, 30)
    };
    const msgs = conv.msgs.map(m => ({ role: m.f === "out" ? "assistant" : "user", content: m.t }));
    window.mediqueAI(msgs, clinic).then(res => {
      setAiBusy(false);
      if (res && res.ok && res.reply) { setDraft(res.reply); }
      else if (res && res.configured === false) { window.jcmToast && window.jcmToast("Conecta tu API Key de Groq (GROQ_API_KEY) en el servidor para activar el agente.", "info"); }
      else { window.jcmError && window.jcmError("El agente no pudo responder", res && res.error); }
    });
  }
  function handleSaveCita(a) {
    const newA = { ...a, id: (window.jcmUid ? window.jcmUid("a") : "a" + Date.now()) };
    setAppts(prev => [...prev, newA]);
    if (addAppt) addAppt(a);
    setDarCita(null);
    setCitaOk(newA);
    // marcar en la conversación
    if (conv) {
      const n = convs.map(c => c.id === sel ? { ...c, msgs: [...c.msgs, { f: "out", t: "¡Listo! Tu cita quedó agendada para " + a.time + ". Te llegará la confirmación pronto 📅", h: "ahora" }] } : c);
      setConvs(n); try { DB.set("wa_conversations", n); } catch (e) {}
    }
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Agente IA · WhatsApp" sub="Bandeja con un asistente que responde con el contexto de tu clínica." />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.gold, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "5px 11px", display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: T.gold }} /> Prototipo</span>
          <span style={{ fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, borderRadius: 8, padding: "8px 14px" }}>Conectar WhatsApp</span>
        </div>
      </div>
      <div style={{ background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>
        {seeded
          ? "Conversaciones de ejemplo. El envío real de WhatsApp y las respuestas con IA corren en el servidor (Medique)."
          : "Conecta tu WhatsApp Business para que el asistente responda a tus pacientes con el contexto de tu clínica. Hasta entonces, esta bandeja está vacía."}
      </div>
      {/* KPIs del agente */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
        <AdStat T={T} n={convs.length} l="Contactos" />
        <AdStat T={T} n={convs.reduce((s, c) => s + c.msgs.length, 0)} l="Mensajes (30d)" />
        <AdStat T={T} n={0} l="Citas por IA" />
        <AdStat T={T} n="0%" l="Tasa respuesta" />
      </div>
      {/* Modelo de IA */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
        <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent }}>Modelo de IA</span>
        <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text }}>Llama 3.3 70B · Groq</span>
        <span style={{ fontFamily: T.sans, fontSize: 9.5, color: "#1F8A5B", background: "rgba(31,138,91,.1)", borderRadius: 6, padding: "2px 7px" }}>Gratis</span>
        <span style={{ marginLeft: "auto", fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>Auto-respuesta · Bot activo</span>
      </div>
      {convs.length === 0 ? (
        <div style={{ background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "44px 28px", textAlign: "center" }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(31,138,91,.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1F8A5B" strokeWidth="1.7"><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></svg>
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 6 }}>Conecta tu agente de WhatsApp</div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 440, margin: "0 auto 18px" }}>Aún no hay conversaciones. Vincula tu WhatsApp Business y el asistente responderá a tus pacientes, agendará citas y resolverá dudas con el contexto de tu clínica.</div>
          <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, borderRadius: 8, padding: "11px 20px", display: "inline-block" }}>Conectar WhatsApp</span>
        </div>
      ) : (
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 12, height: 460 }}>
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, overflowY: "auto" }}>
          {convs.map(c => (
            <button key={c.id} onClick={() => setSel(c.id)} style={{ width: "100%", textAlign: "left", display: "block", padding: "12px 14px", border: "none", borderBottom: "1px solid " + T.line, background: c.id === sel ? (T.accentSoft || "rgba(84,112,127,.12)") : "transparent", cursor: "pointer" }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{c.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.msgs[c.msgs.length - 1].t}</div>
            </button>
          ))}
        </div>
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, display: "flex", flexDirection: "column" }}>
          {conv ? <>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid " + T.line, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text }}>{conv.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{conv.phone}</div>
              </div>
              <button onClick={() => setDarCita({ name: conv.name, phone: conv.phone })}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4M12 13v4M10 15h4" /></svg>
                Agendar cita
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {conv.msgs.map((m, i) => (
                <div key={i} style={{ alignSelf: m.f === "out" ? "flex-end" : "flex-start", maxWidth: "75%", background: m.f === "out" ? T.accent : T.bg, color: m.f === "out" ? "#fff" : T.text, border: m.f === "out" ? "none" : "1px solid " + T.line, borderRadius: 12, padding: "8px 12px", fontFamily: T.sans, fontSize: 12.5 }}>
                  {m.t}<div style={{ fontSize: 9.5, opacity: .7, marginTop: 3, textAlign: "right" }}>{m.h}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid " + T.line }}>
              <button onClick={aiSuggest} disabled={aiBusy} title="Sugerir respuesta con IA (Groq)" style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: aiBusy ? T.textFaint : "#8B6FE0", background: "transparent", border: "1px solid " + (aiBusy ? T.line : "#8B6FE0"), borderRadius: 8, padding: "0 12px", cursor: aiBusy ? "default" : "pointer", whiteSpace: "nowrap" }}>{aiBusy ? "…" : "✦ IA"}</button>
              <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Escribe una respuesta…" style={{ flex: 1, fontFamily: T.sans, fontSize: 13, padding: "9px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text }} />
              <button onClick={send} style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "0 16px", cursor: "pointer" }}>Enviar</button>
            </div>
          </> : <Empty2 T={T}>Selecciona una conversación.</Empty2>}
        </div>
      </div>
      )}
      {darCita && (
        <NewCitaModal T={T} patients={patients || []} prefill={{ name: darCita.name, phone: darCita.phone }} onClose={() => setDarCita(null)} onSave={handleSaveCita} />
      )}
      {citaOk && <CitaAgendadaOkPopup T={T} cita={citaOk} appts={appts} onClose={() => setCitaOk(null)} />}
    </div>
  );
}

/* ─────────── INVENTARIO ─────────── */
// boxSize: unidades por caja/paquete (permite ingresar stock "por caja"). Cánulas y productos sin boxSize → solo por unidad.
const INV_SEED = [
  { id: "i1", name: "Toxina botulínica 100U", cat: "Insumo clínico", stock: 6, min: 4, unit: "viales", price: 95000 },
  { id: "i2", name: "Ácido hialurónico (jeringa)", cat: "Insumo clínico", stock: 3, min: 5, unit: "jeringas", price: 70000 },
  { id: "i3", name: "Sculptra (PLLA)", cat: "Insumo clínico", stock: 8, min: 3, unit: "viales", price: 120000 },
  { id: "i4", name: "Aguja 30G x 13mm", cat: "Fungible", stock: 100, min: 100, unit: "unidades", price: 130, boxSize: 100 },
  { id: "i4b", name: "Aguja 32G x 4mm", cat: "Fungible", stock: 100, min: 100, unit: "unidades", price: 150, boxSize: 100 },
  { id: "i9", name: "Jeringas", cat: "Fungible", stock: 100, min: 100, unit: "unidades", price: 90, boxSize: 100 },
  { id: "i5", name: "Guantes nitrilo (caja)", cat: "Fungible", stock: 2, min: 4, unit: "cajas", price: 9000 },
  { id: "i6", name: "Cánulas 25G", cat: "Fungible", stock: 14, min: 10, unit: "unidades", price: 2500 },
  { id: "i7", name: "Anestesia tópica", cat: "Insumo clínico", stock: 5, min: 3, unit: "tubos", price: 8000 },
  { id: "i8", name: "Gasas (caja 50u)", cat: "Fungible", stock: 100, min: 50, unit: "unidades", price: 30, boxSize: 50 },
  { id: "i10", name: "Repuestos Dermapen", cat: "Fungible", stock: 20, min: 10, unit: "unidades", price: 4000 },
  { id: "i11", name: "Lápiz marcador", cat: "Fungible", stock: 10, min: 5, unit: "unidades", price: 1200 },
  { id: "i12", name: "Cinta de piel (microporo)", cat: "Fungible", stock: 8, min: 4, unit: "unidades", price: 1500 },
  { id: "i13", name: "Corchetes", cat: "Fungible", stock: 5, min: 2, unit: "unidades", price: 2500 },
  { id: "i14", name: "Sacapuntas", cat: "Fungible", stock: 4, min: 2, unit: "unidades", price: 1500 },
  { id: "i15", name: "Mascarillas (caja)", cat: "Fungible", stock: 100, min: 50, unit: "unidades", price: 60, boxSize: 100 },
  { id: "i16", name: "Baja lenguas (caja 100u)", cat: "Fungible", stock: 100, min: 50, unit: "unidades", price: 25, boxSize: 100 },
  { id: "i17", name: "Cofias (paquete 100u)", cat: "Fungible", stock: 100, min: 50, unit: "unidades", price: 40, boxSize: 100 },
  { id: "i18", name: "Alusa plast (film para anestesia)", cat: "Fungible", stock: 3, min: 2, unit: "rollos", price: 2000 },
  { id: "i19", name: "Lápices de pasta", cat: "Fungible", stock: 12, min: 5, unit: "unidades", price: 500 }
];
const PROC_SEED = [
  { id: "pr1", name: "Botox 3 zonas", cobro: 150000, method: "Transferencia", uses: [["i1", 1], ["i4", 3], ["i7", 1], ["i8", 1]] },
  { id: "pr2", name: "Rinomodelación", cobro: 170000, method: "Transferencia", uses: [["i2", 1], ["i6", 1], ["i4", 2], ["i8", 4]] },
  { id: "pr3", name: "Bioestimulación (Sculptra)", cobro: 450000, method: "Transferencia", uses: [["i3", 2], ["i4", 2], ["i8", 5]] }
];
/* ─────────── Caja: helpers compartidos (persisten en DB) ─────────── */
function cashAll() { try { return (window.DB && DB.get("cash_moves")) || []; } catch (e) { return []; } }
function cashSave(v) { try { if (window.DB) DB.set("cash_moves", v); } catch (e) {} }
function cashAdd(mv) { const all = cashAll(); all.push({ id: "cm" + Date.now() + Math.random().toString(36).slice(2, 5), ts: new Date().toISOString(), ...mv }); cashSave(all); }
function cashToday() { const t = new Date().toISOString().slice(0, 10); return cashAll().filter(m => (m.ts || "").slice(0, 10) === t); }
/* inventario persistente — el seed (INV_SEED/PROC_SEED) solo aplica a la clínica base o modo local; las nuevas parten vacías */
function invSeed() { return (window.JCM_BASE || !(window.JCSAAS && window.JCSAAS.enabled)) ? INV_SEED : []; }
function procSeed() { return (window.JCM_BASE || !(window.JCSAAS && window.JCSAAS.enabled)) ? PROC_SEED : []; }
function invLoad() { try { var v = window.DB && DB.get("inv_items"); return Array.isArray(v) ? v : invSeed(); } catch (e) { return invSeed(); } }
function invSave(v) { try { if (window.DB) DB.set("inv_items", v); } catch (e) {} }
function procLoad() { try { var v = window.DB && DB.get("inv_procs"); return Array.isArray(v) ? v : procSeed(); } catch (e) { return procSeed(); } }
function procSave(v) { try { if (window.DB) DB.set("inv_procs", v); } catch (e) {} }
function procCost(p, items) { return (p.uses || []).reduce((s, u) => { const it = items.find(x => x.id === u[0]); return s + (it ? it.price * u[1] : 0); }, 0); }

function InvKpiModal({ T, title, items, onClose }) {
  const D = window.JCDATA;
  return (
    <AdModal T={T} title={title + " (" + items.length + ")"} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textFaint, padding: "12px 0" }}>Sin productos en esta categoría.</div>}
        {items.map(i => {
          const lo = i.stock > 0 && i.stock <= i.min;
          const out = i.stock <= 0;
          return (
            <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid " + T.lineSoft }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{i.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{i.cat} · mín {i.min} {i.unit}{i.venc ? " · vence " + new Date(i.venc).toLocaleDateString("es-CL") : ""}</div>
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 20, color: out ? "#C0285A" : lo ? "#C9A227" : T.text }}>{i.stock}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute }}>{i.unit}</div>
              <AdTag T={T} tone={out ? "danger" : lo ? "warn" : "ok"}>{out ? "Agotado" : lo ? "Bajo" : "OK"}</AdTag>
            </div>
          );
        })}
      </div>
    </AdModal>
  );
}
function InventarioView({ T }) {
  const D = window.JCDATA;
  const [items, setItemsR] = useState(invLoad());
  const [procs, setProcsR] = useState(procLoad());
  const [q, setQ] = useState("");
  const [nuevo, setNuevo] = useState(false);
  const [edit, setEdit] = useState(null);     // item en edición
  const [nuevoProc, setNuevoProc] = useState(false);
  const [editProc, setEditProc] = useState(null);
  const [scan, setScan] = useState(false);
  const [catFilter, setCatFilter] = useState("Todas");
  const [msg, setMsg] = useState("");
  const [invKpi, setInvKpi] = useState(null); // "all" | "low" | "out" | "vencer"
  // Aplica los productos de una factura escaneada: suma al stock si ya existe, o crea el producto.
  function applyInvoice(rows) {
    setItems(its => {
      const next = its.slice();
      rows.forEach(r => {
        const qty = Math.max(0, parseInt(r.qty, 10) || 0);
        if (!r.name.trim() || !qty) return;
        const i = next.findIndex(x => x.name.trim().toLowerCase() === r.name.trim().toLowerCase());
        if (i >= 0) next[i] = { ...next[i], stock: next[i].stock + qty, price: parseInt(r.price, 10) || next[i].price };
        else next.push({ id: "i" + Date.now() + Math.floor(Math.random() * 999), name: r.name.trim(), cat: r.cat || "Insumo clínico", stock: qty, min: 3, unit: r.unit || "unidades", price: parseInt(r.price, 10) || 0 });
      });
      return next;
    });
    setScan(false);
    setMsg("Factura aplicada: stock actualizado.");
    setTimeout(() => setMsg(""), 3200);
  }
  const setItems = v => { const nv = typeof v === "function" ? v(items) : v; setItemsR(nv); invSave(nv); };
  const setProcs = v => { const nv = typeof v === "function" ? v(procs) : v; setProcsR(nv); procSave(nv); };
  const low = items.filter(i => i.stock > 0 && i.stock <= i.min);
  const out = items.filter(i => i.stock <= 0);
  // Por vencer: insumos con fecha de vencimiento dentro de los próximos 60 días.
  const _hoy0 = new Date(); _hoy0.setHours(0, 0, 0, 0);
  const porVencer = items.filter(i => { if (!i.venc) return false; const d = new Date(i.venc); if (isNaN(d)) return false; const dias = (d - _hoy0) / 86400000; return dias >= 0 && dias <= 60; });
  const cats = Array.from(new Set(items.map(i => i.cat || "Sin categoría"))).sort();
  const ql = q.trim().toLowerCase();
  const list = items
    .filter(i => catFilter === "Todas" || (i.cat || "Sin categoría") === catFilter)
    .filter(i => !ql || i.name.toLowerCase().includes(ql) || (i.cat || "").toLowerCase().includes(ql));
  const valor = items.reduce((s, i) => s + i.stock * i.price, 0);
  function adjust(id, d) { setItems(items.map(i => i.id === id ? { ...i, stock: Math.max(0, i.stock + d) } : i)); }
  const invName = id => { const it = items.find(x => x.id === id); return it ? it.name : id; };
  // Descuenta del stock los insumos del procedimiento y registra el cobro en Caja.
  function aplicarProc(p) {
    setItems(its => its.map(i => { const u = p.uses.find(x => x[0] === i.id); return u ? { ...i, stock: Math.max(0, i.stock - u[1]) } : i; }));
    const costo = procCost(p, items);
    cashAdd({ type: "ingreso", kind: "atencion", amount: p.cobro || 0, cost: costo, method: p.method || "Efectivo", concept: p.name });
    setMsg("Registrado: " + p.name + (p.cobro ? " · cobro " + D.fmt(p.cobro) : "") + " · insumos descontados");
    setTimeout(() => setMsg(""), 3200);
  }
  return (
    <div>
      <SecHead T={T} title="Inventario" sub="Stock de insumos y fungibles" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginBottom: 16 }}>
        <div onClick={() => setInvKpi("all")} style={{ cursor: "pointer" }}><AdStat T={T} n={items.length} l="Productos" /></div>
        <div onClick={() => low.length && setInvKpi("low")} style={{ cursor: low.length ? "pointer" : "default" }}><AdStat T={T} n={low.length} l="Stock bajo" accent={low.length > 0} /></div>
        <div onClick={() => setInvKpi("out")} style={{ cursor: "pointer" }}><AdStat T={T} n={out.length} l="Agotados" accent={out.length > 0} /></div>
        <div onClick={() => setInvKpi("vencer")} style={{ cursor: "pointer" }}><AdStat T={T} n={porVencer.length} l="Por vencer" accent={porVencer.length > 0} /></div>
        <div style={{ cursor: "default" }}><AdStat T={T} n={D.fmt(valor)} l="Valor inventario" /></div>
      </div>
      {invKpi === "all" && <InvKpiModal T={T} title="Todos los productos" items={items} onClose={() => setInvKpi(null)} />}
      {invKpi === "low" && <InvKpiModal T={T} title="Stock bajo" items={low} onClose={() => setInvKpi(null)} />}
      {invKpi === "out" && <InvKpiModal T={T} title="Agotados" items={out} onClose={() => setInvKpi(null)} />}
      {invKpi === "vencer" && <InvKpiModal T={T} title="Por vencer" items={porVencer} onClose={() => setInvKpi(null)} />}
      {low.length > 0 && (
        <div style={{ background: "rgba(192,40,90,.08)", border: "1px solid rgba(192,40,90,.35)", borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: "#C0285A", marginBottom: 4 }}>⚠ Reponer pronto</div>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute }}>{low.map(i => i.name + " (" + i.stock + ")").join(" · ")}</div>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar insumo…" style={{ flex: 1, padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }} />
        <AdBtn T={T} onClick={() => setScan(true)}>Escanear factura/boleta</AdBtn>
        <AdBtn T={T} primary onClick={() => setNuevo(true)}>+ Producto</AdBtn>
      </div>
      {/* Chips de categoría */}
      <div className="jc-scroll" style={{ display: "flex", gap: 7, overflowX: "auto", marginBottom: 14, paddingBottom: 2 }}>
        {["Todas", ...cats].map(c => (
          <button key={c} onClick={() => setCatFilter(c)} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, fontWeight: 500, padding: "6px 13px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", border: "1px solid " + (catFilter === c ? T.accent : T.chipBorder), background: catFilter === c ? T.accent : T.chipBg, color: catFilter === c ? (T.onAccent || "#fff") : T.textMute }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {list.map(i => {
          const lo = i.stock <= i.min;
          return (
            <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 4px", borderBottom: "1px solid " + T.lineSoft }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{i.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{i.cat} · mín {i.min} {i.unit} · costo {D.fmt(i.price)}</div>
              </div>
              <button onClick={() => setEdit(i)} title="Editar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <button onClick={() => adjust(i.id, -1)} style={invAdj(T)}>−</button>
                <span style={{ fontFamily: T.serif, fontSize: 18, color: lo ? "#C0285A" : T.text, minWidth: 30, textAlign: "center" }}>{i.stock}</span>
                <button onClick={() => adjust(i.id, 1)} style={invAdj(T)}>+</button>
              </div>
              {i.stock <= 0 ? <AdTag T={T} tone="danger">Agotado</AdTag> : lo ? <AdTag T={T} tone="warn">Bajo</AdTag> : <AdTag T={T} tone="ok">OK</AdTag>}
            </div>
          );
        })}
      </div>
      {/* Procedimientos y consumo automático */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "26px 0 12px" }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Procedimientos · consumo automático</div>
        <AdBtn T={T} small primary onClick={() => setNuevoProc(true)}>+ Procedimiento</AdBtn>
      </div>
      {msg && <div style={{ background: "rgba(31,138,91,.10)", border: "1px solid rgba(31,138,91,.4)", borderRadius: 8, padding: "10px 13px", marginBottom: 12, fontFamily: T.sans, fontSize: 12, color: "#1F8A5B" }}>✓ {msg}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {procs.map(p => {
          const costo = procCost(p, items); const liquido = (p.cobro || 0) - costo;
          return (
          <div key={p.id} style={{ padding: "13px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{p.name}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button onClick={() => setEditProc(p)} title="Editar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
                </button>
                <AdBtn T={T} small primary onClick={() => aplicarProc(p)}>Registrar realizado</AdBtn>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 8, fontFamily: T.sans, fontSize: 11 }}>
              <span style={{ color: T.textMute }}>Cobro <b style={{ color: T.text }}>{D.fmt(p.cobro || 0)}</b></span>
              <span style={{ color: T.textMute }}>Costo insumos <b style={{ color: T.text }}>{D.fmt(costo)}</b></span>
              <span style={{ color: T.textMute }}>Líquido <b style={{ color: liquido >= 0 ? "#1F8A5B" : "#C0285A" }}>{D.fmt(liquido)}</b></span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 9 }}>
              {p.uses.map((u, k) => (
                <span key={k} style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, background: T.bg, border: "1px solid " + T.lineSoft, borderRadius: 999, padding: "4px 9px" }}>{invName(u[0])} × {u[1]}</span>
              ))}
            </div>
          </div>
          );
        })}
      </div>
      <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 }}>Define qué insumos consume cada procedimiento. Al tocar “Registrar realizado”, se descuentan automáticamente del stock.</p>
      {scan && <InvScanModal T={T} onClose={() => setScan(false)} onApply={applyInvoice} />}
      {nuevo && <NewInvModal T={T} onClose={() => setNuevo(false)} onSave={it => { setItems([{ ...it, id: "i" + Date.now() }, ...items]); setNuevo(false); }} />}
      {edit && <NewInvModal T={T} initial={edit} onClose={() => setEdit(null)} onSave={it => { setItems(items.map(x => x.id === edit.id ? { ...x, ...it } : x)); setEdit(null); }} />}
      {nuevoProc && <NewProcModal T={T} items={items} onClose={() => setNuevoProc(false)} onSave={pr => { setProcs([...procs, { ...pr, id: "pr" + Date.now() }]); setNuevoProc(false); }} />}
      {editProc && <NewProcModal T={T} items={items} initial={editProc} onClose={() => setEditProc(null)} onSave={pr => { setProcs(procs.map(x => x.id === editProc.id ? { ...x, ...pr } : x)); setEditProc(null); }} />}
    </div>
  );
}
function invAdj(T) { return { width: 28, height: 28, borderRadius: 6, border: "1px solid " + T.chipBorder, background: T.surface, color: T.text, cursor: "pointer", fontSize: 16, lineHeight: 1 }; }
/* Escanear factura → revisar/editar productos → aplicar al stock.
   Demo local: la lectura real con IA (Llama Scout visión) corre en el servidor (Medique).
   Aquí se sube la factura y se confirman los productos manualmente. */
const INVSCAN_DEMO = [
  { name: "Toxina botulínica 100U", cat: "Insumo clínico", qty: "5", price: "95000", unit: "viales" },
  { name: "Ácido hialurónico (jeringa)", cat: "Insumo clínico", qty: "10", price: "70000", unit: "jeringas" },
  { name: "Agujas 30G", cat: "Fungible", qty: "100", price: "120", unit: "unidades" }
];
function InvScanModal({ T, onClose, onApply }) {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const fileRef = useRef(null);
  function onFile(e) { const f = e.target.files[0]; if (!f) return; setFile(f.name); setRows(INVSCAN_DEMO.map(r => ({ ...r }))); e.target.value = ""; }
  function setRow(i, k, v) { setRows(rows.map((r, j) => j === i ? { ...r, [k]: v } : r)); }
  function addRow() { setRows([...rows, { name: "", cat: "Insumo clínico", qty: "1", price: "0", unit: "unidades" }]); }
  function delRow(i) { setRows(rows.filter((_, j) => j !== i)); }
  const inp = { fontFamily: T.sans, fontSize: 12.5, padding: "8px 10px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", width: "100%" };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,.5)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 680, maxHeight: "88vh", overflowY: "auto", background: T.bg, border: "1px solid " + T.line, borderRadius: 14, padding: "22px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 24, color: T.text, margin: 0 }}>Escanear factura o boleta</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>
        <div style={{ background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 13px", marginBottom: 16, fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>
          Sube la foto o PDF de la boleta/factura. La <b>lectura automática con IA</b> corre en el servidor (Medique); aquí revisas y confirmas los productos antes de sumarlos al stock.
        </div>
        {!file ? (
          <button onClick={() => fileRef.current.click()} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "40px 20px", border: "1.5px dashed " + T.chipBorder, borderRadius: 12, background: T.surface, cursor: "pointer" }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.5"><path d="M12 16V4M7 9l5-5 5 5M5 20h14" /></svg>
            <span style={{ fontFamily: T.serif, fontSize: 18, color: T.text }}>Subir factura o boleta (foto o PDF)</span>
            <span style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>JPG, PNG o PDF de la compra · arrastra el archivo o haz clic</span>
          </button>
        ) : (
          <>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.accent, marginBottom: 10 }}>📄 {file} · productos detectados (edítalos si es necesario):</div>
            <div style={{ display: "grid", gridTemplateColumns: "2.4fr 1.4fr .8fr 1fr 28px", gap: 6, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>
              <span>Producto</span><span>Categoría</span><span>Cant.</span><span>Costo c/u</span><span /></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {rows.map((r, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "2.4fr 1.4fr .8fr 1fr 28px", gap: 6, alignItems: "center" }}>
                  <input style={inp} value={r.name} onChange={e => setRow(i, "name", e.target.value)} placeholder="Producto" />
                  <input style={inp} value={r.cat} onChange={e => setRow(i, "cat", e.target.value)} />
                  <input style={inp} value={r.qty} onChange={e => setRow(i, "qty", e.target.value.replace(/[^\d]/g, ""))} />
                  <input style={inp} value={r.price} onChange={e => setRow(i, "price", e.target.value.replace(/[^\d]/g, ""))} />
                  <button onClick={() => delRow(i)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
                </div>
              ))}
            </div>
            <button onClick={addRow} style={{ marginTop: 10, fontFamily: T.sans, fontSize: 11.5, color: T.accent, background: "none", border: "1px dashed " + T.chipBorder, borderRadius: 7, padding: "8px 12px", cursor: "pointer" }}>+ Agregar línea</button>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
              <button onClick={onClose} style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.text, background: "transparent", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "10px 16px", cursor: "pointer" }}>Cancelar</button>
              <button onClick={() => onApply(rows)} style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer" }}>Agregar al stock ({rows.length})</button>
            </div>
          </>
        )}
        <input ref={fileRef} type="file" accept="image/*,application/pdf" onChange={onFile} style={{ display: "none" }} />
      </div>
    </div>
  );
}
function NewInvModal({ T, onClose, onSave, initial }) {
  const [f, setF] = useState(initial ? { name: initial.name, cat: initial.cat, stock: "" + initial.stock, min: "" + initial.min, unit: initial.unit, price: "" + (initial.price || ""), boxSize: initial.boxSize ? "" + initial.boxSize : "", venc: initial.venc || "" } : { name: "", cat: "Insumo clínico", stock: "", min: "", unit: "unidades", price: "", boxSize: "", venc: "" });
  const [modo, setModo] = useState("unidad"); // unidad | caja
  const ok = f.name.trim();
  const bs = parseInt(f.boxSize, 10) || 0;
  const entered = parseInt(f.stock, 10) || 0;
  // Si el ingreso es por caja, multiplica por las unidades por caja.
  const stockTotal = (modo === "caja" && bs) ? entered * bs : entered;
  const sel = { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  return (
    <AdModal T={T} title={initial ? "Editar producto" : "Nuevo producto"} onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave({ name: f.name, cat: f.cat, stock: stockTotal, min: parseInt(f.min, 10) || 0, unit: f.unit, price: parseInt(f.price, 10) || 0, boxSize: bs || undefined, venc: f.venc || undefined })}>{initial ? "Guardar cambios" : "Guardar producto"}</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <AdField T={T} label="Nombre" value={f.name} onChange={v => setF({ ...f, name: v })} placeholder="Ej: Ácido hialurónico" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <label style={{ display: "block" }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Unidad de stock</span>
            <select value={f.unit} onChange={e => setF({ ...f, unit: e.target.value })} style={sel}><option>unidades</option><option>viales</option><option>jeringas</option><option>tubos</option><option>cajas</option><option>paquetes</option><option>rollos</option></select>
          </label>
          <AdField T={T} label="Unidades por caja (opcional)" value={f.boxSize} onChange={v => setF({ ...f, boxSize: v.replace(/\D/g, "") })} inputMode="numeric" placeholder="Ej. 100" />
        </div>
        {/* Ingreso por caja o por unidad (cada caja trae N unidades). Las cánulas u otros sin "unidades por caja" sólo se ingresan por unidad. */}
        <div>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Ingresar stock por</span>
          <div style={{ display: "flex", gap: 8 }}>
            {[["unidad", "Unidad"], ["caja", bs ? "Caja (×" + bs + ")" : "Caja"]].map(([k, l]) => (
              <button key={k} type="button" disabled={k === "caja" && !bs} onClick={() => setModo(k)} style={{ flex: 1, fontFamily: T.sans, fontSize: 12, padding: "10px", borderRadius: 7, cursor: (k === "caja" && !bs) ? "not-allowed" : "pointer", opacity: (k === "caja" && !bs) ? .45 : 1, background: modo === k ? T.accent : T.surface, color: modo === k ? (T.onAccent || "#fff") : T.textMute, border: "1px solid " + (modo === k ? T.accent : T.line) }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AdField T={T} label={modo === "caja" ? "Cajas a ingresar" : "Stock actual"} value={f.stock} onChange={v => setF({ ...f, stock: v.replace(/\D/g, "") })} inputMode="numeric" />
          <AdField T={T} label="Stock mínimo (unidades)" value={f.min} onChange={v => setF({ ...f, min: v.replace(/\D/g, "") })} inputMode="numeric" />
        </div>
        {modo === "caja" && bs > 0 && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.accent }}>Total a registrar: <b>{stockTotal} unidades</b> ({entered} caja(s) × {bs}).</div>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AdField T={T} label="Costo por unidad (CLP)" value={f.price} onChange={v => setF({ ...f, price: v.replace(/\D/g, "") })} inputMode="numeric" />
          <label style={{ display: "block" }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Fecha de vencimiento</span>
            <input type="date" value={f.venc} onChange={e => setF({ ...f, venc: e.target.value })} style={sel} /></label>
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>El insumo aparecerá en "Por vencer" cuando falten 60 días o menos para su vencimiento.</div>
      </div>
    </AdModal>
  );
}
// Crear procedimiento: nombre + insumos que consume (con cantidad).
function NewProcModal({ T, items, onClose, onSave, initial }) {
  const [name, setName] = useState(initial ? initial.name : "");
  const [cobro, setCobro] = useState(initial && initial.cobro ? "" + initial.cobro : "");
  const [method, setMethod] = useState(initial && initial.method ? initial.method : "Efectivo");
  const [uses, setUses] = useState(initial ? (initial.uses || []).reduce((a, u) => (a[u[0]] = u[1], a), {}) : {}); // { invId: qty }
  function setQty(id, q) { q = Math.max(0, q); setUses(u => { const n = { ...u }; if (q === 0) delete n[id]; else n[id] = q; return n; }); }
  const ok = name.trim().length > 1 && Object.keys(uses).length > 0;
  const costo = Object.keys(uses).reduce((s, id) => { const it = items.find(x => x.id === id); return s + (it ? it.price * uses[id] : 0); }, 0);
  return (
    <AdModal T={T} title={initial ? "Editar procedimiento" : "Nuevo procedimiento"} onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave({ name: name.trim(), cobro: parseInt(cobro, 10) || 0, method, uses: Object.keys(uses).map(id => [id, uses[id]]) })}>{initial ? "Guardar cambios" : "Guardar procedimiento"}</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <AdField T={T} label="Nombre del procedimiento" value={name} onChange={setName} placeholder="Ej: Relleno de labios" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <AdField T={T} label="Cobro al paciente (CLP)" value={cobro} onChange={v => setCobro(v.replace(/\D/g, ""))} inputMode="numeric" placeholder="150000" />
          <div><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Método de pago</span><select value={method} onChange={e => setMethod(e.target.value)} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}><option>Efectivo</option><option>Débito</option><option>Crédito</option><option>Transferencia</option></select></div>
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>Costo insumos seleccionados: <b style={{ color: T.text }}>{(window.JCDATA).fmt(costo)}</b> · líquido estimado <b style={{ color: (parseInt(cobro, 10) || 0) - costo >= 0 ? "#1F8A5B" : "#C0285A" }}>{(window.JCDATA).fmt((parseInt(cobro, 10) || 0) - costo)}</b></div>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Insumos que consume</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, maxHeight: 280, overflowY: "auto" }}>
            {items.map(i => { const q = uses[i.id] || 0; return (
              <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 8, background: q ? T.surface2 : T.surface, border: "1px solid " + (q ? T.accent : T.line) }}>
                <span style={{ flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 12.5, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{i.name}</span>
                <button onClick={() => setQty(i.id, q - 1)} style={invAdj(T)}>−</button>
                <span style={{ fontFamily: T.serif, fontSize: 16, color: T.text, minWidth: 22, textAlign: "center" }}>{q}</span>
                <button onClick={() => setQty(i.id, q + 1)} style={invAdj(T)}>+</button>
              </div>
            ); })}
          </div>
        </div>
      </div>
    </AdModal>
  );
}

/* ─────────── ADMINISTRACIÓN (hub) ─────────── */
const ADMIN_GROUPS = [
  { title: "Administración", items: ["Convenios", "Gastos", "Gestión de profesionales", "Gestión de recursos", "Gestión de especialidades", "Inventario", "Laboratorios", "Liquidaciones", "Planificación de Box/Sillones", "Usuarios", "Pago Online"] },
  { title: "Configuración", items: ["Agenda Online", "Arancel de precios", "Bancos y entidades financieras", "Documentos clínicos", "Consentimientos Informados", "Estados de agenda", "Logotipo", "Opciones de pago", "Pagos anulados y pendientes", "Configuraciones especiales"] }
];
/* CSV: descarga y parseo (soporta archivos exportados de Excel/Numbers) */
function csvDownload(name, rows) {
  const csv = rows.map(r => r.map(c => { const s = c == null ? "" : String(c); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(",")).join("\n");
  const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encodeURIComponent("﻿" + csv); a.download = name; a.click();
}
function csvParse(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter(l => l.trim());
  if (!lines.length) return [];
  const split = l => { const out = []; let cur = "", q = false; for (let i = 0; i < l.length; i++) { const ch = l[i]; if (ch === '"') { if (q && l[i + 1] === '"') { cur += '"'; i++; } else q = !q; } else if ((ch === "," || ch === ";") && !q) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out; };
  const headers = split(lines[0]).map(h => h.trim().toLowerCase());
  return lines.slice(1).map(l => { const c = split(l); const o = {}; headers.forEach((h, i) => o[h] = (c[i] || "").trim()); return o; });
}

const ADMIN_TABS = [["datos", "Datos / facturación"], ["registro", "Registro de actividad"], ["equipo", "Equipo y permisos"], ["respaldo", "Respaldo / exportar"]];
function AdministracionView({ T, go, patients, appts, addPatient }) {
  const D = window.JCDATA;
  const [tab, setTab] = useState("datos");
  // Plan/suscripción se autocompleta desde la clínica del SaaS (trial → "Demo").
  const autoPlan = (() => {
    try {
      const c = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || null;
      if (!c) return "";
      const p = (c.plan || "").toLowerCase();
      if (p === "trial" || p === "demo" || !p) return "Demo";
      return c.plan.charAt(0).toUpperCase() + c.plan.slice(1);
    } catch (e) { return ""; }
  })();
  const [biz, setBiz] = useState(() => { try { return DB.get("clinic_biz") || { razon: "", rut: "", plan: "" }; } catch (e) { return { razon: "", rut: "", plan: "" }; } });
  const [msg, setMsg] = useState("");
  const fileRef = useRef(null);
  function flash(t) { setMsg(t); setTimeout(() => setMsg(""), 3000); }
  function saveBiz() { try { DB.set("clinic_biz", biz); } catch (e) {} flash("Datos de facturación guardados."); }
  function expPac() { csvDownload("pacientes.csv", [["Nombre", "RUT", "Teléfono", "Correo", "Estado"], ...(patients || []).map(p => [p.name, p.rut || "", p.phone || "", p.email || "", p.consent ? "Con consentimiento" : "Pendiente"])]); }
  function expCitas() { csvDownload("citas.csv", [["Fecha", "Hora", "Paciente", "Servicio", "Estado", "Precio"], ...(appts || []).map(a => [a.fecha || ("día " + a.day), a.time, a.name, a.proc, a.status || "pendiente", a.price || ""])]); }
  function expCaja() { let mv = []; try { mv = DB.get("cash_moves") || []; } catch (e) {} csvDownload("caja.csv", [["Fecha", "Tipo", "Concepto", "Monto", "Método"], ...mv.map(m => [(m.ts || "").slice(0, 10), m.type, m.concept || m.kind || "", m.amount || 0, m.method || ""])]); }
  function onImport(e) {
    const f = e.target.files[0]; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const rows = csvParse(rd.result); let added = 0, dup = 0;
        rows.forEach(r => {
          const name = (r.nombre || r.name || r["nombre completo"] || r["nombre y apellido"] || "").trim(); if (!name) return;
          const rut = r.rut || r.dni || ""; const phone = r["teléfono"] || r.telefono || r.phone || r.celular || r.whatsapp || r.fono || ""; const email = r.correo || r.email || r["e-mail"] || "";
          const exists = (patients || []).find(p => (rut && p.rut === rut) || (p.name || "").toLowerCase() === name.toLowerCase());
          if (exists) dup++; else { if (addPatient) addPatient({ name, rut, phone, email }); added++; }
        });
        flash("Importación: " + added + " paciente(s) nuevo(s)" + (dup ? " · " + dup + " ya existían" : "") + ".");
      } catch (err) { flash("No se pudo leer el archivo. Exporta desde Numbers/Excel a CSV e inténtalo."); }
    };
    rd.readAsText(f); e.target.value = "";
  }
  const expCard = (title, sub, fn) => (
    <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px" }}>
      <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>{title}</div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 14px" }}>{sub}</div>
      <AdBtn T={T} primary onClick={fn}>↓ Descargar CSV</AdBtn>
    </div>
  );
  return (
    <div>
      <SecHead T={T} title="Administración" sub="Equipo y permisos, registro de actividad, datos de la clínica y respaldo de información." />
      {/* pestañas */}
      <div className="jc-scroll" style={{ display: "flex", gap: 7, overflowX: "auto", marginBottom: 18, paddingBottom: 2 }}>
        {ADMIN_TABS.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 12, fontWeight: 500, padding: "9px 15px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", border: "1px solid " + (tab === k ? T.accent : T.chipBorder), background: tab === k ? T.accent : T.chipBg, color: tab === k ? (T.onAccent || "#fff") : T.textMute }}>{l}</button>
        ))}
      </div>
      {msg && <div style={{ background: "rgba(31,138,91,.10)", border: "1px solid rgba(31,138,91,.4)", borderRadius: 8, padding: "10px 13px", marginBottom: 14, fontFamily: T.sans, fontSize: 12, color: "#1F8A5B" }}>✓ {msg}</div>}

      {tab === "datos" && (
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 18, maxWidth: 560 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
            <AdField T={T} label="Razón social" value={biz.razon} onChange={v => setBiz({ ...biz, razon: v })} placeholder="Ej: Nombre SpA" />
            <AdField T={T} label="RUT empresa" value={biz.rut} onChange={v => setBiz({ ...biz, rut: (window.jcmFmtRut ? window.jcmFmtRut(v) : v) })} placeholder="xx.xxx.xxx-x" />
          </div>
          <div style={{ marginTop: 13 }}>
            <label style={{ display: "block" }}>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Plan / suscripción</span>
              <div style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface2, color: T.textMute, fontFamily: T.sans, fontSize: 13.5, boxSizing: "border-box" }}>{autoPlan || biz.plan || "—"}</div>
              <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 }}>Se asigna automáticamente según tu suscripción en Medique.</p>
            </label>
          </div>
          <div style={{ marginTop: 16, textAlign: "right" }}><AdBtn T={T} primary onClick={saveBiz}>Guardar</AdBtn></div>
        </div>
      )}

      {tab === "respaldo" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 14 }}>
            {expCard("Pacientes", "Nombre, RUT, contacto y estado.", expPac)}
            {expCard("Citas", "Fecha, paciente, servicio, estado y precio.", expCitas)}
            {expCard("Caja", "Movimientos de ingreso y egreso.", expCaja)}
          </div>
          {/* Importar base de pacientes */}
          <div style={{ marginTop: 18, background: T.surface, border: "1px dashed " + T.chipBorder, borderRadius: 12, padding: "18px 18px" }}>
            <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>Importar base de pacientes</div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 14px", lineHeight: 1.5 }}>Sube un archivo <b>Excel o CSV</b> (en Numbers: Archivo → Exportar → CSV). Columnas reconocidas: nombre, RUT, teléfono, correo. Si el RUT ya existe, no se duplica.</div>
            <AdBtn T={T} onClick={() => fileRef.current.click()}>Subir archivo (CSV / Excel)</AdBtn>
            <input ref={fileRef} type="file" accept=".csv,text/csv,application/vnd.ms-excel,.xlsx,.numbers" onChange={onImport} style={{ display: "none" }} />
          </div>
        </div>
      )}

      {tab === "equipo" && (
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "24px 20px", textAlign: "center" }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 420, margin: "0 auto 16px" }}>Gestiona los profesionales, sus datos y permisos por sección desde el módulo Equipo.</div>
          <AdBtn T={T} primary onClick={() => go("equipo")}>Ir a Equipo</AdBtn>
        </div>
      )}

      {tab === "registro" && (() => {
        let log = []; try { log = (DB.get("audit_log") || []).slice(0, 30); } catch (e) {}
        return (
          <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 16 }}>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Actividad reciente</div>
            {log.length ? log.map((e, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid " + T.lineSoft, fontFamily: T.sans, fontSize: 12.5 }}>
                <span style={{ color: T.text }}>{e.action || e.msg || "Acción"}</span><span style={{ color: T.textFaint, fontSize: 11 }}>{(e.ts || "").slice(0, 16).replace("T", " ")}</span>
              </div>
            )) : <Empty2 T={T}>Aún no hay actividad registrada en este dispositivo.</Empty2>}
          </div>
        );
      })()}
    </div>
  );
}

/* ─────────── CAJA ─────────── */
function CajaView({ T }) {
  const D = window.JCDATA;
  const [tick, setTick] = useState(0);
  const [mov, setMov] = useState(false);
  const [cierre, setCierre] = useState(false);
  const today = cashToday();
  const ingresos = today.filter(m => m.type === "ingreso").reduce((s, m) => s + (m.amount || 0), 0);
  const egresos = today.filter(m => m.type === "egreso").reduce((s, m) => s + (m.amount || 0), 0);
  const costoIns = today.reduce((s, m) => s + (m.cost || 0), 0);
  const neto = ingresos - egresos - costoIns;
  const atenciones = today.filter(m => m.kind === "atencion");
  const manuales = today.filter(m => m.kind !== "atencion");
  const porMetodo = {};
  today.filter(m => m.type === "ingreso").forEach(m => { const k = m.method || "Otro"; porMetodo[k] = (porMetodo[k] || 0) + (m.amount || 0); });
  const hora = ts => { try { return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } }
  const fechaTxt = new Date().toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <SecHead T={T} title="Caja" sub={"Resumen de caja de hoy · " + fechaTxt} />
        <div style={{ display: "flex", gap: 8 }}>
          <AdBtn T={T} onClick={() => setCierre(true)}>Cierre del día</AdBtn>
          <AdBtn T={T} primary onClick={() => setMov(true)}>+ Movimiento</AdBtn>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
        <CajaCard T={T} l="Ingresos (bruto)" v={D.fmt(ingresos)} c="#1F8A5B" />
        <CajaCard T={T} l="Costo insumos" v={D.fmt(costoIns)} c={T.gold || "#C9A227"} />
        <CajaCard T={T} l="Egresos" v={D.fmt(egresos)} c="#C0285A" />
        <CajaCard T={T} l="Neto (ganancia)" v={D.fmt(neto)} c={T.accent} strong />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "start" }}>
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 }}>Atenciones cobradas hoy</div>
          {atenciones.length === 0 ? <Empty2 T={T}>Aún no hay atenciones cobradas hoy.</Empty2>
            : atenciones.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + T.lineSoft }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{m.concept}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{hora(m.ts)} · {m.method} · insumos {D.fmt(m.cost || 0)}</div>
                </div>
                <div style={{ fontFamily: T.serif, fontSize: 16, color: "#1F8A5B" }}>{D.fmt(m.amount || 0)}</div>
              </div>
            ))}
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, margin: "20px 0 12px" }}>Movimientos manuales</div>
          {manuales.length === 0 ? <Empty2 T={T}>Sin movimientos manuales hoy.</Empty2>
            : manuales.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + T.lineSoft }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{m.concept || (m.type === "ingreso" ? "Ingreso" : "Egreso")}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{hora(m.ts)} · {m.method}</div>
                </div>
                <div style={{ fontFamily: T.serif, fontSize: 16, color: m.type === "ingreso" ? "#1F8A5B" : "#C0285A" }}>{m.type === "ingreso" ? "" : "− "}{D.fmt(m.amount || 0)}</div>
              </div>
            ))}
        </div>
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 }}>Ingresos por método</div>
          {Object.keys(porMetodo).length === 0 ? <Empty2 T={T}>Sin ingresos aún.</Empty2>
            : Object.keys(porMetodo).map(k => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontFamily: T.sans, fontSize: 12.5 }}>
                <span style={{ color: T.textMute }}>{k}</span><span style={{ color: T.text }}>{D.fmt(porMetodo[k])}</span>
              </div>
            ))}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "1px solid " + T.line }}>
            <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text }}>Total ingresos</span>
            <span style={{ fontFamily: T.serif, fontSize: 18, color: T.accent }}>{D.fmt(ingresos)}</span>
          </div>
        </div>
      </div>
      {mov && <NuevoMovModal T={T} onClose={() => setMov(false)} onSave={mv => { cashAdd({ ...mv, kind: "manual" }); setMov(false); setTick(tick + 1); }} />}
      {cierre && <CierreModal T={T} ingresos={ingresos} egresos={egresos} costoIns={costoIns} neto={neto} fecha={fechaTxt} onClose={() => setCierre(false)} />}
    </div>
  );
}
function CajaCard({ T, l, v, c, strong }) {
  return (
    <div style={{ background: strong ? T.surface2 : T.surface, border: "1px solid " + (strong ? T.accent : T.line), borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: c }} /><span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute }}>{l}</span></div>
      <div style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 300, color: T.text }}>{v}</div>
    </div>
  );
}
function NuevoMovModal({ T, onClose, onSave }) {
  const [type, setType] = useState("ingreso");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Efectivo");
  const [concept, setConcept] = useState("");
  const ok = (parseInt(amount, 10) || 0) > 0;
  return (
    <AdModal T={T} title="Nuevo movimiento" onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave({ type, amount: parseInt(amount, 10) || 0, method, concept: concept.trim() })}>Registrar</AdBtn>}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["ingreso", "Ingreso"], ["egreso", "Egreso"]].map(([k, l]) => (
          <button key={k} onClick={() => setType(k)} style={{ flex: 1, fontFamily: T.sans, fontSize: 12, fontWeight: 500, padding: "12px", borderRadius: 7, cursor: "pointer", background: type === k ? T.surface2 : T.surface, color: type === k ? T.text : T.textMute, border: "1px solid " + (type === k ? T.accent : T.line) }}>{l}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <AdField T={T} label="Monto (CLP)" value={amount} onChange={v => setAmount(v.replace(/\D/g, ""))} inputMode="numeric" placeholder="0" />
        <div><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Método</span><select value={method} onChange={e => setMethod(e.target.value)} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}><option>Efectivo</option><option>Débito</option><option>Crédito</option><option>Transferencia</option></select></div>
        <AdField T={T} label="Concepto" value={concept} onChange={setConcept} placeholder="Venta de producto, retiro, etc." />
      </div>
    </AdModal>
  );
}
function CierreModal({ T, ingresos, egresos, costoIns, neto, fecha, onClose }) {
  const D = window.JCDATA;
  return (
    <AdModal T={T} title="Cierre del día" onClose={onClose} footer={<AdBtn T={T} primary full onClick={onClose}>Cerrar</AdBtn>}>
      <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 14, textTransform: "capitalize" }}>{fecha}</div>
      {[["Ingresos (bruto)", ingresos, "#1F8A5B", ""], ["Costo insumos", costoIns, T.gold || "#C9A227", "− "], ["Egresos", egresos, "#C0285A", "− "]].map(([l, v, c, s]) => (
        <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid " + T.lineSoft, fontFamily: T.sans, fontSize: 13 }}>
          <span style={{ color: T.textMute }}>{l}</span><span style={{ color: c }}>{s}{D.fmt(v)}</span>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontFamily: T.sans, fontSize: 15, fontWeight: 600 }}>
        <span style={{ color: T.text }}>Neto (ganancia)</span><span style={{ color: T.accent }}>{D.fmt(neto)}</span>
      </div>
    </AdModal>
  );
}

Object.assign(window, { CADMIN, clinVal, MiniCalendar, ServiciosView, EquipoView, ProfesionalForm, PERM_SECCIONES, FidelidadView, MarketingView, Mini, IntegracionesView, ReportesView, ConfigView, ClinCard, Row, ToggleRow, ColaboracionView, FichaClinicaForm, SecHead, AdSwitch, HorariosEditor, IndTemplatesEditor, getIndTemplates, PendientesView, Group, Empty2, PendRow, InventarioView, NewInvModal, NewProcModal, invAdj, AdministracionView, INV_SEED, PROC_SEED, CajaView, cashAdd, cashToday });
