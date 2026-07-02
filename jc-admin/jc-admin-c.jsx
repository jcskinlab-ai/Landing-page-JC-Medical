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
  { id: "metaads", name: "Meta Ads", desc: "Campañas de Facebook e Instagram Ads", letter: "f", color: "#1877F2", stat: "Campañas conectadas", info: "Conecta tu cuenta de Meta Ads para ver tu inversión, leads y ROAS directamente en el panel de Medique. Requiere un token de lectura (ads_read) generado desde Meta Business Suite." },
  { id: "metabiz", name: "Meta Business Suite", desc: "Bandeja de Instagram y Facebook", letter: "B", color: "#0866FF", stat: "DM y comentarios", info: "Centraliza los mensajes directos y comentarios de Instagram y Facebook en el panel. Responde y gestiona tu bandeja social sin salir de Medique." },
  { id: "gmail", name: "Gmail", desc: "Recordatorios y confirmaciones por correo", letter: "M", color: "#EA4335", stat: "Correo conectado", info: "Envía recordatorios de cita, confirmaciones y seguimientos post-tratamiento automáticamente por correo electrónico a tus pacientes." },
  { id: "drive", name: "Respaldo de fichas", desc: "Respaldo automático de fichas y citas a tu correo", letter: "▲", color: "#1FA463", stat: "Respaldo automático", info: "Cada semana te enviamos automáticamente un respaldo (.json) de todas tus fichas y citas al correo de la clínica. Guárdalo donde quieras (por ejemplo, súbelo a tu Google Drive)." },
  { id: "gcal", name: "Google Calendar", desc: "Sincroniza tu agenda", letter: "31", color: "#4285F4", stat: "Sync bidireccional", info: "Sincroniza la agenda del panel con Google Calendar en tiempo real. Las citas agendadas en Medique aparecen en tu calendario de Google y viceversa." },
  { id: "groq", name: "Groq (Agente IA)", desc: "Asistente IA del panel · WhatsApp pendiente", letter: "✦", color: "#8B6FE0", stat: "Asistente activo", info: "La IA ya está activa en el panel: potencia el Copiloto y los resúmenes de fichas. Que responda automáticamente a tus pacientes por WhatsApp se activa cuando conectes WhatsApp." },
  { id: "wa", name: "WhatsApp Business", desc: "Recordatorios y agenda por WhatsApp", letter: "✆", color: "#1F8A5B", stat: "WhatsApp conectado", info: "Conecta tu número de WhatsApp Business para enviar recordatorios de cita, indicaciones post-tratamiento, campañas de re-cita y permitir que los pacientes agenden directamente por WhatsApp." },
  { id: "landing", name: "Reserva online Medique", desc: "Reservas online conectadas a tu link", letter: "M", color: "#0a0f1c", stat: "Reservas en vivo", info: "Activa la integración con tu página de reservas en medique.cl. Las reservas que hagan tus pacientes desde el link público entran automáticamente a tu agenda del panel." }
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
  const [f, setF] = useState(initial || { name: "", cat: "Toxina botulínica", price: "", dur: "30", ses: "1", pts: "", desc: "" });
  const ok = (f.name || "").trim().length > 1;
  return (
    <AdModal T={T} title={initial ? "Editar servicio" : "Nuevo servicio"} onClose={onClose} footer={
      <AdBtn T={T} primary full onClick={() => ok && onSave({
        id: (initial && initial.id) || (window.jcmUid ? window.jcmUid("svc") : "svc" + Date.now()),
        name: f.name.trim(), cat: f.cat, desc: (f.desc || "").trim(),
        price: parseInt((f.price + "").replace(/\D/g, ""), 10) || 0,
        dur: parseInt((f.dur + "").replace(/\D/g, ""), 10) || 30,
        ses: parseInt((f.ses + "").replace(/\D/g, ""), 10) || 1,
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 11 }}>
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Duración</span>
            <select value={f.dur} onChange={e => setF({ ...f, dur: e.target.value })} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}>
              {[15, 30, 45, 60, 90, 120].map(d => <option key={d} value={String(d)}>{d} min</option>)}
            </select>
          </label>
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Sesiones</span>
            <select value={f.ses || "1"} onChange={e => setF({ ...f, ses: e.target.value })} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}>
              {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(d => <option key={d} value={String(d)}>{d}</option>)}
            </select>
          </label>
          <AdField T={T} label="Puntos" value={f.pts} onChange={v => setF({ ...f, pts: v.replace(/\D/g, "") })} inputMode="numeric" placeholder="0" />
        </div>
        <AdField T={T} label="Precio (CLP)" value={f.price} onChange={v => setF({ ...f, price: v.replace(/\D/g, "") })} inputMode="numeric" placeholder="150000" />
      </div>
    </AdModal>
  );
}

/* Especialidades de la clínica (persisten en DB). Seed desde las sugeridas de medicina estética. */
function clinicEspecialidades() { try { var v = window.DB && window.DB.get("especialidades"); if (Array.isArray(v)) return v; } catch (e) {} return (typeof PROF_ESPECIALIDADES !== "undefined" ? PROF_ESPECIALIDADES.slice() : []); }
function saveEspecialidades(v) { try { if (window.DB) window.DB.set("especialidades", v); } catch (e) {} }
/* Tab de Especialidades dentro de Tratamientos & Especialidades (Área 4). */
function EspecialidadesTab({ T }) {
  const [list, setList] = useState(clinicEspecialidades);
  const [nueva, setNueva] = useState("");
  const [showSug, setShowSug] = useState(false);
  // Equipo en estado para poder asignar/desasignar profesionales a cada especialidad desde aquí.
  const [team, setTeam] = useState(() => { try { return (window.DB && window.DB.get("team")) || []; } catch (e) { return []; } });
  const [assignTo, setAssignTo] = useState(null); // especialidad para la que se asignan profesionales
  function saveTeam(n) { setTeam(n); try { window.DB && window.DB.set("team", n); if (window.CADMIN) window.CADMIN.team = n; } catch (e) {} }
  function toggleMemberSpec(memberId, spec) {
    const n = team.map(m => { if (m.id !== memberId && m.name !== memberId) return m; const cur = m.especialidades || []; const has = cur.indexOf(spec) >= 0; return { ...m, especialidades: has ? cur.filter(x => x !== spec) : [...cur, spec] }; });
    saveTeam(n);
  }
  function add() { const v = nueva.trim(); if (!v || list.indexOf(v) >= 0) { setNueva(""); return; } const n = [...list, v]; setList(n); saveEspecialidades(n); setNueva(""); try { window.jcmToast && window.jcmToast("Especialidad agregada.", "ok"); } catch (e) {} }
  async function del(e) { if (!(await (window.jcmConfirm || window.confirm)("¿Eliminar la especialidad \"" + e + "\"?", { danger: true }))) return; const n = list.filter(x => x !== e); setList(n); saveEspecialidades(n); }
  const profCount = e => team.filter(m => (m.especialidades || []).indexOf(e) >= 0).length;
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" && jcdsLux());
  // Cuántas de las sugeridas por área faltan por agregar (para el contador del panel colapsable).
  const sugRestantes = ESPECIALIDAD_CATS.reduce((acc, c) => acc + c[1].filter(s => list.indexOf(s) < 0).length, 0);
  return (
    <div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 6, lineHeight: 1.5 }}>Define las especialidades que ofrece tu clínica y asigna qué profesionales las realizan.</div>
      <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 18, lineHeight: 1.5, background: T.accentSoft || "rgba(84,112,127,.08)", border: "1px solid " + T.lineSoft, borderRadius: 8, padding: "9px 12px" }}>💡 <b style={{ color: T.textMute }}>Toxina botulínica, Ácido hialurónico, Bioestimuladores…</b> son <b style={{ color: T.textMute }}>procedimientos</b>, no especialidades: se administran en la pestaña <b style={{ color: T.textMute }}>Tratamientos</b>.</div>

      {/* Agregar una propia — arriba, antes de las especialidades ya definidas. */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, margin: "0 0 8px" }}>Agregar especialidad</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input value={nueva} onChange={e => setNueva(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder="Nueva especialidad…" style={{ flex: 1, minWidth: 0, padding: "12px 14px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        <AdBtn T={T} primary onClick={add}>+ Agregar</AdBtn>
      </div>

      {/* PRIMARIO: las especialidades de la clínica. Cada una es clicable para asignar profesionales. */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
        <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute }}>Especialidades de tu clínica</span>
        {list.length > 0 && <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>{list.length}</span>}
      </div>
      {list.length === 0
        ? <div style={luxF ? { ...DS.card(T), padding: "22px 20px", textAlign: "center" } : { background: T.surface, border: "1px dashed " + T.line, borderRadius: 10, padding: "22px 20px", textAlign: "center" }}>
            <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5 }}>Aún no hay especialidades. Agrega una arriba o elígelas desde las sugeridas por área.</div>
          </div>
        : (
          <div style={{ display: "flex", flexDirection: "column", gap: luxF ? 7 : 5 }}>
            {list.map((e, ei) => { const n = profCount(e); const ec = window.jcmAvatarColor ? window.jcmAvatarColor(e) : T.accent; return (
              <div key={e} onClick={() => setAssignTo(e)} title={"Asignar profesionales a " + e}
                style={luxF ? { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer", ...DS.card(T), ...DS.reveal(ei), transition: DS.trans("border-color,background") } : { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer" }}
                onMouseEnter={ev => { ev.currentTarget.style.borderColor = T.accent + (luxF ? "66" : "99"); }}
                onMouseLeave={ev => { ev.currentTarget.style.borderColor = luxF ? "" : T.line; }}>
                {luxF && <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 9, background: ec + "22", color: ec, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 14, fontWeight: 600 }}>{(e || "?").trim()[0].toUpperCase()}</span>}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{e}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: n === 0 ? T.textFaint : T.textMute, marginTop: 2 }}>{n === 0 ? "Sin profesionales · toca para asignar" : n + " profesional" + (n === 1 ? "" : "es")}</div>
                </div>
                <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, color: T.accent, padding: "5px 9px", borderRadius: DS ? DS.r.pill : 999, background: T.accent + "12", border: "1px solid " + (T.chipBorder || T.line) }}>Asignar<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg></span>
                <button onClick={ev => { ev.stopPropagation(); del(e); }} title="Eliminar" style={{ flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "7px 9px", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
              </div>
            ); })}
          </div>
        )}

      {/* SECUNDARIO: sugeridas por área, contenidas en un panel colapsable (no botones sueltos). */}
      {sugRestantes > 0 && (
        <div style={luxF ? { ...DS.card(T), overflow: "hidden", marginTop: 18 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, overflow: "hidden", marginTop: 18 }}>
          <button onClick={() => setShowSug(v => !v)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "13px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" style={{ flexShrink: 0 }}><path d="M12 5v14M5 12h14" /></svg>
            <span style={{ flex: 1, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text }}>Agregar desde especialidades sugeridas</span>
            <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>{sugRestantes} disponibles</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" style={{ flexShrink: 0, transform: showSug ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M6 9l6 6 6-6" /></svg>
          </button>
          {showSug && (
            <div style={{ padding: "4px 16px 16px", borderTop: "1px solid " + T.lineSoft }}>
              {ESPECIALIDAD_CATS.map(([cat, sugs]) => {
                const pend = sugs.filter(s => list.indexOf(s) < 0);
                if (!pend.length) return null;
                return (
                  <div key={cat} style={{ marginTop: 12 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 7 }}>{cat}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {pend.map(s => (
                        <button key={s} onClick={() => { const n = [...list, s]; setList(n); saveEspecialidades(n); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 11.5, padding: "7px 12px", borderRadius: DS.r.pill, cursor: "pointer", border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.text, transition: DS.trans("background,border-color") }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent + "88"; e.currentTarget.style.background = T.accent + "12"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = T.chipBorder; e.currentTarget.style.background = T.chipBg; }}>
                          <span style={{ color: T.accent, fontWeight: 700, fontSize: 13, lineHeight: 1 }}>+</span>{s}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal: asignar profesionales a una especialidad. */}
      {assignTo != null && (() => {
        const ec = window.jcmAvatarColor ? window.jcmAvatarColor(assignTo) : T.accent;
        const asignados = team.filter(m => (m.especialidades || []).indexOf(assignTo) >= 0).length;
        return (
          <div onClick={() => setAssignTo(null)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(6,8,10,.58)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
            <div onClick={ev => ev.stopPropagation()} style={{ width: "100%", maxWidth: 460, maxHeight: "82vh", display: "flex", flexDirection: "column", background: T.card || T.surface, border: "1px solid " + T.line, borderRadius: 16, boxShadow: "0 24px 60px rgba(0,0,0,.4)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderBottom: "1px solid " + T.lineSoft }}>
                <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 9, background: ec + "22", color: ec, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 15, fontWeight: 600 }}>{(assignTo || "?").trim()[0].toUpperCase()}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text, lineHeight: 1.2 }}>{assignTo}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 2 }}>{asignados === 0 ? "Sin profesionales asignados" : asignados + " asignado" + (asignados === 1 ? "" : "s") + " de " + team.length}</div>
                </div>
                <button onClick={() => setAssignTo(null)} title="Cerrar" style={{ flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "7px 9px", cursor: "pointer", color: T.textMute, display: "flex" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
              </div>
              <div style={{ padding: "8px 12px", overflowY: "auto" }}>
                {team.length === 0
                  ? <div style={{ padding: "26px 18px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5 }}>Aún no tienes profesionales en tu equipo.<br />Agrégalos en <b style={{ color: T.text }}>Clínica › Equipo</b>.</div>
                  : team.map(m => {
                      const has = (m.especialidades || []).indexOf(assignTo) >= 0;
                      const mc = window.jcmAvatarColor ? window.jcmAvatarColor(m.name || "") : T.accent;
                      const ini = (m.name || "?").trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
                      return (
                        <button key={m.id || m.name} onClick={() => toggleMemberSpec(m.id || m.name, assignTo)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, padding: "10px 10px", background: has ? T.accent + "0e" : "none", border: "1px solid " + (has ? T.accent + "3a" : "transparent"), borderRadius: 10, cursor: "pointer", textAlign: "left", marginBottom: 3, transition: DS ? DS.trans("background,border-color") : "all .15s" }}>
                          <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 999, background: mc, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 12, fontWeight: 600 }}>{ini}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name || "—"}</div>
                            {(m.role || m.cargo) && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 1 }}>{m.role || m.cargo}</div>}
                          </div>
                          <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, border: "2px solid " + (has ? T.accent : T.line), background: has ? T.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: DS ? DS.trans("background,border-color") : "all .15s" }}>
                            {has && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12l5 5L20 6" /></svg>}
                          </span>
                        </button>
                      );
                    })}
              </div>
              <div style={{ padding: "12px 18px", borderTop: "1px solid " + T.lineSoft, display: "flex", justifyContent: "flex-end" }}>
                <AdBtn T={T} primary onClick={() => setAssignTo(null)}>Listo</AdBtn>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function ServiciosView({ T }) {
  const D = window.JCDATA;
  const [tab, setTab] = useState("tratamientos");
  const [custom, setCustom] = useState(customServices);
  const [newSvc, setNewSvc] = useState(null); // objeto en edición o "new"
  function saveSvc(s) {
    const exists = custom.find(x => x.id === s.id);
    const n = exists ? custom.map(x => x.id === s.id ? s : x) : [s, ...custom];
    setCustom(n); saveCustomServices(n); setNewSvc(null);
    try { window.jcmToast && window.jcmToast("Servicio \"" + s.name + "\" " + (exists ? "actualizado" : "creado") + ".", "ok"); } catch (e) {}
  }
  function delSvc(id) { const n = custom.filter(x => x.id !== id); setCustom(n); saveCustomServices(n); try { window.jcmToast && window.jcmToast("Servicio eliminado.", "info"); } catch (e) {} }
  const [active, setActive] = useState(() => { try { return (window.DB && window.DB.get("services_active")) || {}; } catch (e) { return {}; } });
  const [over, setOver] = useState(() => { try { return (window.DB && window.DB.get("services_over")) || {}; } catch (e) { return {}; } });
  function saveActive(n) { setActive(n); try { window.DB && window.DB.set("services_active", n); } catch (e) {} }
  function saveOver(n) { setOver(n); try { window.DB && window.DB.set("services_over", n); } catch (e) {} }
  const [editing, setEditing] = useState(null);
  const [hover, setHover] = useState(null);
  const [q, setQ] = useState("");
  // Profesionales asignados a un tratamiento (desde el campo tratamientos[] del equipo).
  let _team = []; try { _team = (window.DB && window.DB.get("team")) || []; } catch (e) {}
  const profsForSvc = nm => _team.filter(m => (m.tratamientos || []).indexOf(nm) >= 0).length;
  // Importar servicios desde Excel/CSV (columnas: Nombre, Precio, Duración, Sesiones, Categoría).
  const svcFileRef = useRef(null);
  function importSvcRows(rows) {
    if (!rows || rows.length < 2) { try { window.jcmError && window.jcmError("El archivo no tiene filas de datos."); } catch (e) {} return; }
    const head = (rows[0] || []).map(h => ("" + h).toLowerCase().trim());
    const col = (...names) => { for (const n of names) { const i = head.findIndex(h => h.indexOf(n) >= 0); if (i >= 0) return i; } return -1; };
    const ci = { name: col("nombre", "name", "servicio", "tratamiento"), price: col("precio", "price", "valor"), dur: col("duraci", "dur"), ses: col("sesion", "sesión", "sesiones"), cat: col("categor", "cat") };
    if (ci.name < 0) { try { window.jcmError && window.jcmError("Falta la columna 'Nombre' en el encabezado."); } catch (e) {} return; }
    const nuevos = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i] || []; const nm = ("" + (r[ci.name] || "")).trim(); if (!nm) continue;
      nuevos.push({ id: "svc" + Date.now() + i, name: nm, cat: ci.cat >= 0 ? (("" + (r[ci.cat] || "Otro")).trim() || "Otro") : "Otro", price: parseInt(("" + (r[ci.price] || "")).replace(/\D/g, ""), 10) || 0, dur: parseInt(("" + (r[ci.dur] || "")).replace(/\D/g, ""), 10) || 30, ses: parseInt(("" + (r[ci.ses] || "")).replace(/\D/g, ""), 10) || 1, pts: 0, desc: "" });
    }
    if (!nuevos.length) { try { window.jcmError && window.jcmError("No se encontraron servicios válidos."); } catch (e) {} return; }
    const n = [...nuevos, ...custom]; setCustom(n); saveCustomServices(n);
    try { window.jcmToast && window.jcmToast(nuevos.length + " servicio" + (nuevos.length === 1 ? "" : "s") + " importado" + (nuevos.length === 1 ? "" : "s") + ".", "ok"); } catch (e) {}
  }
  function onSvcFile(e) {
    const file = e.target.files[0]; if (!file) return; const ext = (file.name.split(".").pop() || "").toLowerCase(); e.target.value = "";
    const splitLine = l => { const out = []; let cur = "", q = false; for (let i = 0; i < l.length; i++) { const ch = l[i]; if (ch === '"') { if (q && l[i + 1] === '"') { cur += '"'; i++; } else q = !q; } else if ((ch === "," || ch === ";") && !q) { out.push(cur.trim()); cur = ""; } else cur += ch; } out.push(cur.trim()); return out; };
    if (ext === "xlsx" || ext === "xls") {
      const load = () => new Promise((res, rej) => { if (window.XLSX) return res(window.XLSX); const s = document.createElement("script"); s.src = "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"; s.onload = () => res(window.XLSX); s.onerror = () => rej(); document.head.appendChild(s); });
      load().then(XLSX => { const rd = new FileReader(); rd.onload = () => { try { const wb = XLSX.read(rd.result, { type: "array" }); const ws = wb.Sheets[wb.SheetNames[0]]; importSvcRows(XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false, defval: "" })); } catch (err) { try { window.jcmError && window.jcmError("No se pudo leer el Excel."); } catch (e) {} } }; rd.readAsArrayBuffer(file); }).catch(() => { try { window.jcmError && window.jcmError("No se pudo cargar el lector de Excel. Exporta a CSV e inténtalo."); } catch (e) {} });
      return;
    }
    const rd = new FileReader(); rd.onload = () => { try { const rows = ("" + rd.result).replace(/\r/g, "").split("\n").map(l => l.trim() ? splitLine(l.trim()) : []).filter(r => r.length); importSvcRows(rows); } catch (err) { try { window.jcmError && window.jcmError("No se pudo leer el archivo."); } catch (e) {} } }; rd.readAsText(file, "utf-8");
  }
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
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Tratamientos y Especialidades" sub={tab === "especialidades" ? "Especialidades de la clínica" : totalAll + " procedimiento" + (totalAll === 1 ? "" : "s") + " · crea los tuyos o edita los existentes"} />
        {tab === "tratamientos" && <div style={{ display: "flex", gap: 8 }}>
          <input ref={svcFileRef} type="file" accept=".csv,.xlsx,.xls,text/csv" style={{ display: "none" }} onChange={onSvcFile} />
          <AdBtn T={T} onClick={() => svcFileRef.current && svcFileRef.current.click()}>Importar Excel</AdBtn>
          <AdBtn T={T} primary onClick={() => setNewSvc("new")}>+ Nuevo servicio</AdBtn>
        </div>}
      </div>
      <div style={luxF
        ? { display: "inline-flex", gap: 2, background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: DS.r.seg, padding: 3, margin: "4px 0 18px" }
        : { display: "flex", gap: 6, margin: "4px 0 18px" }}>
        {[["tratamientos", "Tratamientos"], ["especialidades", "Especialidades"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={luxF
            ? { fontFamily: T.sans, fontSize: DS.ft.sub, fontWeight: tab === k ? 600 : 500, padding: "8px 16px", borderRadius: DS.r.ctl, cursor: "pointer", border: "none", background: tab === k ? T.surface : "transparent", boxShadow: tab === k ? "0 1px 2px rgba(0,0,0,.06)" : "none", color: tab === k ? T.accent : T.textMute, transition: DS.trans("background,box-shadow,color") }
            : { fontFamily: T.sans, fontSize: 12.5, fontWeight: tab === k ? 600 : 500, padding: "8px 18px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (tab === k ? T.accent : T.line), background: tab === k ? T.accent : "transparent", color: tab === k ? (T.onAccent || "#fff") : T.textMute }}>{l}</button>
        ))}
      </div>
      {tab === "especialidades" ? <EspecialidadesTab T={T} /> : <>
      <div style={{ position: "relative", marginBottom: 22 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.6" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar procedimiento por nombre…" style={luxF
          ? { ...DS.ctl(T), width: "100%", height: DS.h.ctl + 4, padding: "0 14px 0 38px" }
          : { width: "100%", padding: "12px 14px 12px 38px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
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
                <div key={s.id} onClick={() => setNewSvc(s)} style={luxF ? { ...DS.card(T), display: "flex", alignItems: "center", gap: 10, padding: "12px 15px", cursor: "pointer" } : { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{s.name}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{s.cat}{s.desc ? " · " + s.desc : ""}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 3 }}>{s.dur} min{s.ses > 1 ? " · " + s.ses + " sesiones" : ""}{s.pts ? " · " + s.pts + " pts" : ""}{profsForSvc(s.name) ? " · " + profsForSvc(s.name) + " prof." : ""}</div>
                  </div>
                  <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text, flexShrink: 0 }}>{D.fmt(s.price || 0)}</div>
                  <button onClick={async e => { e.stopPropagation(); if (await (window.jcmConfirm || window.confirm)(`¿Eliminar el servicio "${s.name}"?`, {danger: true})) delSvc(s.id); }} title="Eliminar" style={{ flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "7px 9px", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
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
                      style={luxF
                        ? { ...DS.card(T), display: "flex", alignItems: "center", gap: 10, padding: "12px 15px", cursor: "pointer", borderColor: hover === hk ? T.accent + "88" : T.line, transition: DS.trans("border-color") }
                        : { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + (hover === hk ? T.accent : T.line), cursor: "pointer", transition: "border-color .15s" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{v.name}</div>
                        {v.desc && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.desc}</div>}
                        <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 3, display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{v.dur} min</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: T.gold }}><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" /></svg>{v.pts} pts</span>
                        </div>
                      </div>
                      <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text, flexShrink: 0 }}>{D.fmt(v.price)}</div>
                      <div onClick={e => { e.stopPropagation(); saveActive({ ...active, [it.n]: !on }); }}>
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
      </>}
      {editing && (
        <AdModal T={T} title="Editar servicio" onClose={() => setEditing(null)} footer={
          <AdBtn T={T} primary full onClick={() => { const n = { ...over, [editing.key]: { name: editing.name.trim() || editing.key, desc: editing.desc, price: parseInt((editing.price + "").replace(/\D/g, ""), 10) || 0, dur: parseInt((editing.dur + "").replace(/\D/g, ""), 10) || 60, pts: parseInt((editing.pts + "").replace(/\D/g, ""), 10) || 0 } }; saveOver(n); setEditing(null); }}>Guardar cambios</AdBtn>
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
// Equipo por defecto: si una clínica aún no tiene profesionales, parte con el "profesional a cargo"
// (de Configuración) para que el módulo Equipo nunca aparezca vacío.
function jcmDefaultTeam() {
  var name = "";
  try { name = (window.clinicPro && window.clinicPro()) || (window.DB && DB.cfg().professional) || ""; } catch (e) {}
  if (!name || name.trim().length < 2) { try { name = (window.DB && DB.cfg().clinic_name) || ""; } catch (e) {} }
  if (!name || name.trim().length < 2) return [];
  var email = "", phone = "";
  try { var c = (window.JCSAAS && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || {}; email = c.ownerEmail || ""; } catch (e) {}
  try { if (!email) email = (window.DB && DB.cfg().reply_email) || ""; } catch (e) {}
  try { phone = (window.DB && DB.cfg().wa_number) || ""; } catch (e) {}
  if (phone && !/^\+/.test(phone)) phone = "+" + phone.replace(/[^0-9]/g, "");
  return [{ id: "t_owner", name: name.trim(), role: "Profesional a cargo", email: email, phone: phone, color: "#6A8296", active: true, access: true, pin: "1234", perms: { Agenda: true, Pacientes: true, Inventario: true, Servicios: true, Reportes: true, Marketing: true, Configuración: true } }];
}
function EquipoView({ T }) {
  const [team, setTeam] = useState(() => {
    try { const t = window.DB && DB.get("team"); if (Array.isArray(t) && t.length) return t; } catch (e) {}
    const seed = ((typeof clinicSeeded === "function") ? clinicSeeded() : true) ? (CADMIN.team || []) : [];
    return seed.length ? seed : jcmDefaultTeam();
  });
  // Asegura que el resto del panel vea el equipo y persiste el default la primera vez (para que no quede vacío).
  useEffect(() => {
    if (team && team.length) {
      if (window.CADMIN) window.CADMIN.team = team;
      try { const saved = window.DB && DB.get("team"); if (!Array.isArray(saved) || !saved.length) window.DB && window.DB.set("team", team); } catch (e) {}
    }
  }, []);
  const [editing, setEditing] = useState(null); // miembro a editar o "new"
  function save(m) {
    CADMIN.team = (m.id && team.find(x => x.id === m.id)) ? team.map(x => x.id === m.id ? m : x) : [...team, { ...m, id: "t" + Date.now(), color: m.color || "#8B9EB0" }];
    try { window.DB && window.DB.set("team", CADMIN.team); } catch (e) {} // persiste por clínica
    setTeam(CADMIN.team); setEditing(null);
  }
  // Eliminar profesional (P6). El equipo nunca queda vacío: se bloquea borrar al último.
  async function remove(id) {
    if (team.length <= 1) { window.jcmToast && window.jcmToast("Debe quedar al menos un profesional en el equipo.", "info"); return; }
    const m = team.find(x => x.id === id);
    if (!(await (window.jcmConfirm || window.confirm)("¿Eliminar a " + ((m && m.name) || "este profesional") + " del equipo? Sus citas y fichas no se borran.", { danger: true }))) return;
    CADMIN.team = team.filter(x => x.id !== id);
    try { window.DB && window.DB.set("team", CADMIN.team); } catch (e) {}
    setTeam(CADMIN.team); setEditing(null);
    window.jcmToast && window.jcmToast("Profesional eliminado.", "ok");
  }
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <SecHead T={T} title="Equipo" sub="Profesionales y permisos" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {team.map((t, i) => {
          // "Admin" = sin cuenta de login propia (lo gestiona el dueño directamente) o con TODOS los
          // permisos de sección activados; el resto (login propio + permisos acotados) es "Usuario".
          const isAdminMember = !t.access || PERM_SECCIONES.every(p => t.perms && t.perms[p]);
          return (
          <button key={t.id} onClick={() => setEditing(t)} style={luxF
            ? { display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", ...DS.card(T), width: "100%", textAlign: "left", cursor: "pointer", transition: DS.trans("border-color,transform"), ...DS.reveal(i) }
            : { display: "flex", alignItems: "center", gap: 13, padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, width: "100%", textAlign: "left", cursor: "pointer" }}
            onMouseEnter={luxF ? e => { e.currentTarget.style.borderColor = T.accent + "66"; } : undefined}
            onMouseLeave={luxF ? e => { e.currentTarget.style.borderColor = T.line; } : undefined}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, flexShrink: 0 }}>{t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={luxF ? { ...DS.text(T, "body"), fontWeight: 500, color: T.text } : { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text }}>{t.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{t.role}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[t.phone, t.email].filter(Boolean).join("  ·  ")}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7, flexShrink: 0 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <AdTag T={T} tone={isAdminMember ? "accent" : "muted"}>{isAdminMember ? "Admin" : "Usuario"}</AdTag>
                <AdTag T={T} tone={t.active ? "ok" : "muted"}>{t.active ? "Activo" : "Inactivo"}</AdTag>
              </div>
              <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent }}>Editar →</span>
            </div>
          </button>
          );
        })}
      </div>
      <div style={{ marginTop: 14 }}><AdBtn T={T} primary onClick={() => setEditing("new")}>+ Añadir miembro</AdBtn></div>
      {editing && <ProfesionalForm T={T} member={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={save} onDelete={editing !== "new" && editing.id ? () => remove(editing.id) : null} />}
    </div>
  );
}

// Códigos de país para el teléfono del profesional (Chile primero).
const PROF_PAISES = [["+56", "🇨🇱 Chile"], ["+54", "🇦🇷 Argentina"], ["+51", "🇵🇪 Perú"], ["+57", "🇨🇴 Colombia"], ["+58", "🇻🇪 Venezuela"], ["+593", "🇪🇨 Ecuador"], ["+591", "🇧🇴 Bolivia"], ["+598", "🇺🇾 Uruguay"], ["+595", "🇵🇾 Paraguay"], ["+52", "🇲🇽 México"], ["+34", "🇪🇸 España"], ["+1", "🇺🇸 EE.UU."]];
// Tipo de profesional: define qué puede crear (recetas y órdenes de examen = solo Médico/Dentista;
// Enfermero solo indicaciones post-tratamiento, puede ver/cargar exámenes pero no ordenarlos).
const TIPO_PROF_OPTS = ["Médico", "Dentista", "Enfermero", "Otro"];
function jcmCanPrescribe(tipoProf) { return tipoProf === "Médico" || tipoProf === "Dentista"; }
// Tipo de profesional de la sesión activa (null si es el dueño/staff, que no tiene restricción).
function jcmCurrentProType() {
  try {
    if (!(window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentRole && window.JCSAAS.currentRole() === "professional")) return null;
    var name = ((window.JCSAAS.currentUserName && window.JCSAAS.currentUserName()) || "").trim().toLowerCase();
    var team = (window.DB && window.DB.get("team")) || [];
    var m = team.find(function (t) { return (t.name || "").trim().toLowerCase() === name; });
    return (m && m.tipoProf) || "Enfermero"; // sin tipo definido → el más restrictivo, no asumir permiso clínico
  } catch (e) { return null; }
}
// true si la sesión activa puede crear recetas/órdenes de examen: el dueño/staff (sin restricción
// de tipo) siempre puede; un profesional logueado solo si es Médico o Dentista.
function jcmCanPrescribeNow() { var t = jcmCurrentProType(); return t == null || jcmCanPrescribe(t); }
if (typeof window !== "undefined") { window.jcmCanPrescribe = jcmCanPrescribe; window.jcmCurrentProType = jcmCurrentProType; window.jcmCanPrescribeNow = jcmCanPrescribeNow; }
// Especialidades sugeridas en medicina estética (toggle + se pueden agregar propias).
// Especialidades por ÁREA (P14). Son especialidades reales del profesional, NO procedimientos:
// Toxina botulínica, Ácido hialurónico, etc. son categorías de PROCEDIMIENTOS y viven en Tratamientos.
const ESPECIALIDAD_CATS = [
  ["Facial", ["Medicina estética facial", "Armonización orofacial", "Dermatología"]],
  ["Corporal", ["Medicina estética corporal", "Kinesiología estética", "Nutrición y control de peso"]],
  ["Estética", ["Medicina estética", "Enfermería estética", "Tricología"]],
  ["Cosmetología", ["Cosmetología", "Cosmiatría", "Dermopigmentación / micropigmentación"]]
];
const PROF_ESPECIALIDADES = ESPECIALIDAD_CATS.reduce((a, c) => a.concat(c[1]), []);
// Encabezado de sección dentro del formulario de profesional.
function ProfSec({ T, n, title, sub, children }) {
  return (
    <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "15px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: sub ? 4 : 12 }}>
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: T.accent, color: T.onAccent || "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{n}</span>
        <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600 }}>{title}</span>
      </div>
      {sub && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, margin: "0 0 12px 29px", lineHeight: 1.5 }}>{sub}</div>}
      {children}
    </div>
  );
}
// Grupo de chips multi-selección reutilizable (especialidades, tratamientos, sucursales).
function ProfChips({ T, options, selected, onToggle, empty }) {
  if (!options || !options.length) return <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textFaint, lineHeight: 1.5 }}>{empty}</div>;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {options.map(o => { const on = selected.indexOf(o) >= 0; return (
        <button key={o} type="button" onClick={() => onToggle(o)} style={{ fontFamily: T.sans, fontSize: 11.5, padding: "8px 12px", borderRadius: 999, cursor: "pointer", background: on ? T.accent : "transparent", color: on ? T.onAccent : T.textMute, border: "1px solid " + (on ? T.accent : T.chipBorder) }}>{on ? "✓ " : ""}{o}</button>
      ); })}
    </div>
  );
}
function ProfesionalForm({ T, member, onClose, onSave, onDelete }) {
  const [f, setF] = useState(() => member
    ? { ...member, perms: member.perms || {}, especialidades: member.especialidades || (member.role ? [member.role] : []), tratamientos: member.tratamientos || [], sucursales: member.sucursales || [], horario: member.horario || sucHorarioDefault() }
    : { name: "", role: "", email: "", phone: "+56 9 ", active: true, access: false, perms: {}, especialidades: [], tratamientos: [], sucursales: [], horario: sucHorarioDefault() });
  const [nuevaEsp, setNuevaEsp] = useState("");
  const [showAllEsp, setShowAllEsp] = useState(false);
  const [showAllTrat, setShowAllTrat] = useState(false);
  const [tipoOtro, setTipoOtro] = useState(() => !!(member && member.tipoProf && TIPO_PROF_OPTS.indexOf(member.tipoProf) < 0));
  // Acceso de login del profesional (multiusuario por clínica).
  const [accPass, setAccPass] = useState("");
  const [accBusy, setAccBusy] = useState(false);
  const [accMsg, setAccMsg] = useState("");
  const [accErr, setAccErr] = useState("");
  async function crearAcceso() {
    setAccErr(""); setAccMsg("");
    const email = (f.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setAccErr("Ingresa un correo válido para el profesional."); return; }
    if ((accPass || "").length < 6) { setAccErr("La clave debe tener al menos 6 caracteres."); return; }
    if (!(window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.idToken)) { setAccErr("Disponible solo con sesión en la nube."); return; }
    setAccBusy(true);
    try {
      const tok = await window.JCSAAS.idToken();
      const r = await fetch("/api/team-access", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tok }, body: JSON.stringify({ action: "create", email: email, password: accPass, name: f.name, perms: f.perms }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) {
        setF(s => ({ ...s, authUid: d.uid }));
        setAccMsg((d.updated ? "Acceso actualizado. " : "Acceso creado. ") + "El profesional ingresa en medique.cl con " + email + " y la clave que definiste.");
        setAccPass("");
      } else { setAccErr(d.error || "No se pudo crear el acceso."); }
    } catch (e) { setAccErr("No se pudo contactar el servidor."); }
    setAccBusy(false);
  }
  function setDiaH(k, patch) { setF(s => ({ ...s, horario: { ...(s.horario || {}), [k]: { ...((s.horario || {})[k] || { on: false, from: "10:00", to: "19:00" }), ...patch } } })); }
  const ok = f.name.trim().length > 2;
  function tperm(p) { setF(s => ({ ...s, perms: { ...s.perms, [p]: !s.perms[p] } })); }
  function toggleArr(key, val) { setF(s => { const arr = s[key] || []; return { ...s, [key]: arr.indexOf(val) >= 0 ? arr.filter(x => x !== val) : [...arr, val] }; }); }
  function addEsp() { const v = nuevaEsp.trim(); if (!v) return; setF(s => ({ ...s, especialidades: (s.especialidades || []).indexOf(v) >= 0 ? s.especialidades : [...(s.especialidades || []), v] })); setNuevaEsp(""); }
  // Código de país actual a partir del teléfono.
  const curCC = ((f.phone || "").match(/^(\+\d+)/) || [])[1] || "+56";
  function setCC(cc) { setF(s => { const num = (s.phone || "").replace(/^\+\d+\s*/, "").trim(); return { ...s, phone: (cc + " " + num).trim() }; }); }
  // Tratamientos del catálogo real de la clínica.
  let svcList = [];
  try { svcList = (typeof window.clinicServiceList === "function" ? window.clinicServiceList() : []).map(s => s.name || s).filter(Boolean); } catch (e) {}
  // Sucursales (módulo propio, Área 2). Vacío hasta crearlas.
  let sucList = [];
  try { sucList = ((window.DB && window.DB.get("sucursales")) || []).map(s => s.name || s).filter(Boolean); } catch (e) {}
  const togRow = (label, on, onClick) => (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 8, background: T.surface2 || T.surface, border: "1px solid " + T.line, cursor: "pointer" }}>
      <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{label}</span>
      <AdSwitch T={T} on={on} onClick={onClick} />
    </div>
  );
  // Colapsa una lista larga de chips a solo 3 (priorizando los ya seleccionados, para no
  // "esconder" una selección existente) + botón "ver más" para desplegar el resto.
  function collapse3(options, selected, expanded) {
    if (expanded || options.length <= 3) return options;
    const shown = new Set(), out = [];
    options.forEach(o => { if (selected.indexOf(o) >= 0 && out.length < 3) { out.push(o); shown.add(o); } });
    for (const o of options) { if (out.length >= 3) break; if (!shown.has(o)) { out.push(o); shown.add(o); } }
    return out;
  }
  return (
    <AdModal T={T} wide title={member ? "Editar profesional" : "Nuevo profesional"} onClose={onClose} footer={<div style={{ display: "flex", gap: 10, alignItems: "center" }}>{onDelete && <button onClick={onDelete} title="Eliminar profesional" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "0 14px", height: 44, borderRadius: 8, border: "1px solid #C0285A55", background: "transparent", color: "#C0285A", fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" /></svg>Eliminar</button>}<AdBtn T={T} primary full onClick={() => ok && onSave({ ...f, role: f.role || (f.especialidades || [])[0] || "" })}>Guardar profesional</AdBtn></div>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* 1 · Información básica */}
        <ProfSec T={T} n="1" title="Información básica">
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <AdField T={T} label="Nombre completo" value={f.name} onChange={v => setF({ ...f, name: v })} placeholder="Ej: Dra. María Pérez" />
            <AdField T={T} label="Título / cargo" value={f.role} onChange={v => setF({ ...f, role: v })} placeholder="Ej: Médico estético" />
            <div>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Tipo de profesional</span>
              <div style={{ display: "flex", gap: 8 }}>
                <select value={tipoOtro ? "Otro" : (f.tipoProf || "")} onChange={e => { const v = e.target.value; if (v === "Otro") { setTipoOtro(true); } else { setTipoOtro(false); setF({ ...f, tipoProf: v }); } }} style={{ flex: 1, padding: "12px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", cursor: "pointer" }}>
                  <option value="">Elegir…</option>
                  {TIPO_PROF_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {tipoOtro && <input value={f.tipoProf || ""} onChange={e => setF({ ...f, tipoProf: e.target.value })} placeholder="Especifica el tipo" style={{ flex: 1, padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }} />}
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 7, lineHeight: 1.5 }}>Médico y Dentista pueden crear recetas y órdenes de examen. Enfermero solo indicaciones post-tratamiento (puede ver y cargar exámenes, no crear órdenes).</p>
            </div>
            <AdField T={T} label="Email" value={f.email} onChange={v => setF({ ...f, email: v })} inputMode="email" placeholder="correo@ejemplo.com" />
            <div>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Teléfono</span>
              <div style={{ display: "flex", gap: 8 }}>
                <select value={curCC} onChange={e => setCC(e.target.value)} style={{ flexShrink: 0, width: 130, padding: "12px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }}>
                  {PROF_PAISES.map(([code, name]) => <option key={code} value={code}>{name} {code}</option>)}
                </select>
                <input value={(f.phone || "").replace(/^\+\d+\s*/, "")} onChange={e => setF({ ...f, phone: (curCC + " " + e.target.value).trim() })} inputMode="tel" placeholder="9 1234 5678" style={{ flex: 1, minWidth: 0, padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }} />
              </div>
            </div>
            <div>
              <AdField T={T} label="Clave de confirmación (4–6 dígitos)" value={f.pin || ""} onChange={v => setF({ ...f, pin: v.replace(/\D/g, "").slice(0, 6) })} inputMode="numeric" placeholder="••••" />
              <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 7, lineHeight: 1.5 }}>Clave personal del profesional. Se pide para confirmar cambios en las sesiones que él/ella realizó.</p>
            </div>
            {togRow("Profesional activo", f.active, () => setF({ ...f, active: !f.active }))}
            {togRow("Crear cuenta de acceso al sistema", f.access, () => setF({ ...f, access: !f.access }))}
            {f.access && (
              <div style={{ background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "13px 14px" }}>
                <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Permisos · ¿Qué secciones puede usar?</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {PERM_SECCIONES.map(p => { const on = !!f.perms[p]; return (
                    <button key={p} type="button" onClick={() => tperm(p)} style={{ fontFamily: T.sans, fontSize: 11.5, padding: "8px 12px", borderRadius: 999, cursor: "pointer", background: on ? T.accent : "transparent", color: on ? T.onAccent : T.textMute, border: "1px solid " + (on ? T.accent : T.chipBorder) }}>{p}</button>
                  ); })}
                </div>
                <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 }}>El administrador define a qué áreas del panel puede entrar este profesional.</p>
                {/* Crear cuenta de login (multiusuario) */}
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid " + T.line }}>
                  <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 8 }}>Cuenta de login</div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginBottom: 10, lineHeight: 1.5 }}>Crea el acceso para que el profesional inicie sesión con <b style={{ color: T.text }}>su propio correo</b> ({f.email || "agrega el correo arriba"}) y vea solo las secciones permitidas.</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <input type="text" value={accPass} onChange={e => setAccPass(e.target.value)} placeholder="Clave de acceso (mín. 6)" data-nocap style={{ flex: 1, minWidth: 160, padding: "10px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" }} />
                    <AdBtn T={T} onClick={crearAcceso}>{accBusy ? "Creando…" : (f.authUid ? "Actualizar acceso" : "Crear acceso")}</AdBtn>
                  </div>
                  {accMsg && <div style={{ fontFamily: T.sans, fontSize: 11, color: "#1F8A5B", marginTop: 8, lineHeight: 1.5 }}>{accMsg}</div>}
                  {accErr && <div style={{ fontFamily: T.sans, fontSize: 11, color: "#C0285A", marginTop: 8, lineHeight: 1.5 }}>{accErr}</div>}
                </div>
              </div>
            )}
          </div>
        </ProfSec>
        {/* 2 · Especialidades */}
        <ProfSec T={T} n="2" title="Especialidades" sub="Marca las que ejerce este profesional. Puedes agregar las tuyas.">
          {(() => { const all = Array.from(new Set([...PROF_ESPECIALIDADES, ...(f.especialidades || [])])); const sel = f.especialidades || []; return (
            <>
              <ProfChips T={T} options={collapse3(all, sel, showAllEsp)} selected={sel} onToggle={v => toggleArr("especialidades", v)} empty="" />
              {all.length > 3 && <button type="button" onClick={() => setShowAllEsp(v => !v)} style={{ marginTop: 8, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: T.sans, fontSize: 11, color: T.accent }}>{showAllEsp ? "Ver menos" : "Ver más (+" + (all.length - collapse3(all, sel, false).length) + ")"}</button>}
            </>
          ); })()}
          <div style={{ display: "flex", gap: 8, marginTop: 11 }}>
            <input value={nuevaEsp} onChange={e => setNuevaEsp(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addEsp(); } }} placeholder="Agregar especialidad…" style={{ flex: 1, minWidth: 0, padding: "10px 12px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" }} />
            <AdBtn T={T} onClick={addEsp}>Agregar</AdBtn>
          </div>
        </ProfSec>
        {/* 3 · Tratamientos asignados */}
        <ProfSec T={T} n="3" title="Tratamientos asignados" sub="Procedimientos que este profesional puede realizar (del catálogo de la clínica).">
          <ProfChips T={T} options={collapse3(svcList, f.tratamientos || [], showAllTrat)} selected={f.tratamientos || []} onToggle={v => toggleArr("tratamientos", v)} empty="Aún no hay servicios en el catálogo. Créalos en Tratamientos y vuelve a asignarlos aquí." />
          {svcList.length > 3 && <button type="button" onClick={() => setShowAllTrat(v => !v)} style={{ marginTop: 8, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: T.sans, fontSize: 11, color: T.accent }}>{showAllTrat ? "Ver menos" : "Ver más (+" + (svcList.length - collapse3(svcList, f.tratamientos || [], false).length) + ")"}</button>}
        </ProfSec>
        {/* 4 · Sucursales */}
        <ProfSec T={T} n="4" title="Sucursales" sub="¿En qué sucursales atiende este profesional?">
          <ProfChips T={T} options={sucList} selected={f.sucursales || []} onToggle={v => toggleArr("sucursales", v)} empty="Aún no hay sucursales. Créalas en el módulo Sucursales y vuelve a asignarlas aquí." />
        </ProfSec>
        {/* 5 · Horario de atención */}
        <ProfSec T={T} n="5" title="Horario de atención" sub="Días y horas en que atiende este profesional.">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {SUC_DIAS.map(([k, l]) => { const d = (f.horario || {})[k] || { on: false, from: "10:00", to: "19:00" }; return (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: d.on ? (T.surface2 || T.surface) : T.surface, border: "1px solid " + T.line }}>
                <div style={{ width: 92, flexShrink: 0 }}><AdSwitch T={T} on={d.on} onClick={() => setDiaH(k, { on: !d.on })} /><span style={{ fontFamily: T.sans, fontSize: 12, color: T.text, marginLeft: 8 }}>{l.slice(0, 3)}</span></div>
                {d.on ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flex: 1 }}>
                    <input type="time" value={d.from} onChange={e => setDiaH(k, { from: e.target.value })} style={{ padding: "9px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" }} />
                    <span style={{ color: T.textMute, fontFamily: T.sans, fontSize: 12 }}>a</span>
                    <input type="time" value={d.to} onChange={e => setDiaH(k, { to: e.target.value })} style={{ padding: "9px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" }} />
                  </div>
                ) : <span style={{ flex: 1, fontFamily: T.sans, fontSize: 11.5, color: T.textFaint }}>No atiende</span>}
              </div>
            ); })}
          </div>
        </ProfSec>
      </div>
    </AdModal>
  );
}

/* ─────────── SUCURSALES (Área 2) ─────────── */
const SUC_DIAS = [["lun", "Lunes"], ["mar", "Martes"], ["mie", "Miércoles"], ["jue", "Jueves"], ["vie", "Viernes"], ["sab", "Sábado"], ["dom", "Domingo"]];
function sucHorarioDefault() {
  const h = {};
  SUC_DIAS.forEach(([k]) => { h[k] = { on: ["lun", "mar", "mie", "jue", "vie"].indexOf(k) >= 0, from: "10:00", to: "19:00" }; });
  return h;
}
function loadSucursales() { try { const v = window.DB && window.DB.get("sucursales"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function saveSucursalesDB(v) { try { if (window.DB) window.DB.set("sucursales", v); } catch (e) {} }
function SucursalesView({ T }) {
  const [list, setList] = useState(loadSucursales);
  const [editing, setEditing] = useState(null); // sucursal o "new"
  let team = []; try { team = (window.DB && window.DB.get("team")) || []; } catch (e) {}
  const profsForSuc = nm => team.filter(m => (m.sucursales || []).indexOf(nm) >= 0).length;
  function save(s) {
    const exists = s.id && list.find(x => x.id === s.id);
    const n = exists ? list.map(x => x.id === s.id ? s : x) : [...list, { ...s, id: "suc" + Date.now() }];
    setList(n); saveSucursalesDB(n); setEditing(null);
    try { window.jcmToast && window.jcmToast("Sucursal " + (exists ? "actualizada" : "creada") + ".", "ok"); } catch (e) {}
  }
  async function del(id) {
    if (!(await (window.jcmConfirm || window.confirm)("¿Eliminar esta sucursal?", { danger: true }))) return;
    const n = list.filter(x => x.id !== id); setList(n); saveSucursalesDB(n);
  }
  const diasTxt = h => SUC_DIAS.filter(([k]) => h && h[k] && h[k].on).map(([k, l]) => l.slice(0, 3)).join(", ") || "Sin horario";
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Sucursales" sub={(list.length || "Sin") + " sucursal" + (list.length === 1 ? "" : "es") + " · dirección, contacto y horario de atención"} />
        <AdBtn T={T} primary onClick={() => setEditing("new")}>+ Nueva sucursal</AdBtn>
      </div>
      {list.length === 0 ? (
        <div style={{ background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "40px 24px", textAlign: "center", marginTop: 12 }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 440, margin: "0 auto 16px" }}>Aún no tienes sucursales. Crea la primera con su dirección, contacto y horario — luego podrás asignar profesionales a cada una desde su ficha.</div>
          <AdBtn T={T} primary onClick={() => setEditing("new")}>+ Crear primera sucursal</AdBtn>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
          {list.map((s, i) => { const np = profsForSuc(s.name); return (
            <div key={s.id} onClick={() => setEditing(s)} title="Editar sucursal" style={luxF
              ? { display: "flex", alignItems: "flex-start", gap: 13, padding: "15px 16px", ...DS.card(T), cursor: "pointer", ...DS.reveal(i) }
              : { display: "flex", alignItems: "flex-start", gap: 13, padding: "15px 16px", borderRadius: 10, background: T.surface, border: "1px solid " + T.line, cursor: "pointer" }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: T.accentSoft || T.surface2, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5M9 11h.01M15 11h.01" /></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text }}>{s.name}</div>
                {s.addr && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>{s.addr}</div>}
                <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 3 }}>{[s.phone, s.email].filter(Boolean).join("  ·  ")}</div>
                <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 5, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span>🕒 {diasTxt(s.horario)}</span>
                  <span>· {np === 0 ? "Sin profesionales" : np + " profesional" + (np === 1 ? "" : "es")}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent }}>Editar →</span>
                <button onClick={(e) => { e.stopPropagation(); del(s.id); }} title="Eliminar" style={{ background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
              </div>
            </div>
          ); })}
        </div>
      )}
      {editing && <SucursalModal T={T} suc={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}
function SucursalModal({ T, suc, onClose, onSave }) {
  const [f, setF] = useState(() => suc ? { ...suc, horario: suc.horario || sucHorarioDefault() } : { name: "", addr: "", phone: "+56 9 ", email: "", horario: sucHorarioDefault() });
  const ok = (f.name || "").trim().length > 1;
  const curCC = ((f.phone || "").match(/^(\+\d+)/) || [])[1] || "+56";
  function setCC(cc) { setF(s => { const num = (s.phone || "").replace(/^\+\d+\s*/, "").trim(); return { ...s, phone: (cc + " " + num).trim() }; }); }
  function setDia(k, patch) { setF(s => ({ ...s, horario: { ...s.horario, [k]: { ...s.horario[k], ...patch } } })); }
  function aplicarATodos() { const base = f.horario.lun; setF(s => { const h = {}; SUC_DIAS.forEach(([k]) => { h[k] = { ...s.horario[k], from: base.from, to: base.to }; }); return { ...s, horario: h }; }); try { window.jcmToast && window.jcmToast("Horario de lunes copiado a todos los días activos.", "info"); } catch (e) {} }
  const inp = { padding: "9px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" };
  return (
    <AdModal T={T} title={suc ? "Editar sucursal" : "Nueva sucursal"} onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave(f)}>Guardar sucursal</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ProfSec T={T} n="1" title="Datos de la sucursal">
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <AdField T={T} label="Nombre" value={f.name} onChange={v => setF({ ...f, name: v })} placeholder="Ej: Medique Centro" />
            <AdField T={T} label="Dirección" value={f.addr} onChange={v => setF({ ...f, addr: v })} placeholder="Calle, número, ciudad" />
            <AdField T={T} label="Email" value={f.email} onChange={v => setF({ ...f, email: v })} inputMode="email" placeholder="sucursal@clinica.cl" />
            <div>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Teléfono</span>
              <div style={{ display: "flex", gap: 8 }}>
                <select value={curCC} onChange={e => setCC(e.target.value)} style={{ flexShrink: 0, width: 130, padding: "12px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }}>
                  {PROF_PAISES.map(([code, name]) => <option key={code} value={code}>{name} {code}</option>)}
                </select>
                <input value={(f.phone || "").replace(/^\+\d+\s*/, "")} onChange={e => setF({ ...f, phone: (curCC + " " + e.target.value).trim() })} inputMode="tel" placeholder="9 1234 5678" style={{ flex: 1, minWidth: 0, padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }} />
              </div>
            </div>
          </div>
        </ProfSec>
        <ProfSec T={T} n="2" title="Horario de atención" sub="Activa los días y define el rango. Usa «Aplicar a todos» para copiar el horario del lunes.">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {SUC_DIAS.map(([k, l]) => { const d = f.horario[k] || { on: false, from: "10:00", to: "19:00" }; return (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: d.on ? (T.surface2 || T.surface) : T.surface, border: "1px solid " + T.line }}>
                <div style={{ width: 92, flexShrink: 0 }}><AdSwitch T={T} on={d.on} onClick={() => setDia(k, { on: !d.on })} /><span style={{ fontFamily: T.sans, fontSize: 12, color: T.text, marginLeft: 8 }}>{l.slice(0, 3)}</span></div>
                {d.on ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flex: 1 }}>
                    <input type="time" value={d.from} onChange={e => setDia(k, { from: e.target.value })} style={inp} />
                    <span style={{ color: T.textMute, fontFamily: T.sans, fontSize: 12 }}>a</span>
                    <input type="time" value={d.to} onChange={e => setDia(k, { to: e.target.value })} style={inp} />
                  </div>
                ) : <span style={{ flex: 1, fontFamily: T.sans, fontSize: 11.5, color: T.textFaint }}>Cerrado</span>}
              </div>
            ); })}
          </div>
          <div style={{ marginTop: 10 }}><AdBtn T={T} onClick={aplicarATodos}>Aplicar horario del lunes a todos</AdBtn></div>
        </ProfSec>
      </div>
    </AdModal>
  );
}

/* ─────────── CONSENTIMIENTOS · plantillas (Área 6) ─────────── */
function loadConsentTpls() { try { const v = window.DB && window.DB.get("consent_templates"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function saveConsentTplsDB(v) { try { if (window.DB) window.DB.set("consent_templates", v); } catch (e) {} }
function ConsentimientosView({ T }) {
  const [tpls, setTpls] = useState(loadConsentTpls);
  const [active, setActive] = useState(() => { try { return (window.DB && window.DB.get("consent_active")) || {}; } catch (e) { return {}; } });
  const [editing, setEditing] = useState(null);
  let patients = []; try { patients = (window.DB && window.DB.get("patients")) || (window.JCADMIN && window.JCADMIN.patients) || []; } catch (e) {}
  const firmados = patients.filter(p => p.consent).length;
  const pendientes = patients.filter(p => !p.consent).length;
  const base = (window.JCADMIN && window.JCADMIN.consents) || [];
  function setActiveKey(k, on) { const n = { ...active, [k]: on }; setActive(n); try { window.DB && window.DB.set("consent_active", n); } catch (e) {} }
  function persist(n) { setTpls(n); saveConsentTplsDB(n); }
  function save(t) {
    const exists = t.id && tpls.find(x => x.id === t.id);
    persist(exists ? tpls.map(x => x.id === t.id ? t : x) : [...tpls, { ...t, id: "ctpl" + Date.now() }]);
    setEditing(null);
    try { window.jcmToast && window.jcmToast("Plantilla " + (exists ? "actualizada" : "creada") + ".", "ok"); } catch (e) {}
  }
  async function del(id) { if (!(await (window.jcmConfirm || window.confirm)("¿Eliminar esta plantilla?", { danger: true }))) return; persist(tpls.filter(x => x.id !== id)); }
  // "Personalizar" una plantilla predeterminada: crea una COPIA editable en las plantillas
  // propias de la clínica (el documento maestro base no se toca nunca) y abre el editor.
  function baseBodyText(b) { return b.body || (Array.isArray(b.paragraphs) ? b.paragraphs.join("\n\n") : "") || ""; }
  function personalizar(b) {
    const copia = { id: "ctpl" + Date.now(), title: (b.title || "Consentimiento") + " (personalizada)", cat: b.cat || "", body: baseBodyText(b), active: true, fromBase: b.title || "" };
    persist([...tpls, copia]);
    setEditing(copia);
    try { window.jcmToast && window.jcmToast("Copia editable creada en tus plantillas propias.", "ok"); } catch (e) {}
  }
  const activasCount = base.filter(b => active[b.title] !== false).length + tpls.filter(t => t.active !== false).length;
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const card = luxF ? { ...DS.card(T), padding: "13px 16px", display: "flex", alignItems: "center", gap: 12 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "13px 15px", display: "flex", alignItems: "center", gap: 12 };
  const row = (titulo, cat, on, onTog, onEdit, onDel) => (
    <div style={card}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{titulo}</div>
        {cat && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{cat}</div>}
      </div>
      <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: on ? "#1F8A5B" : T.textFaint }}>{on ? "Activa" : "Inactiva"}</span>
      <AdSwitch T={T} on={on} onClick={onTog} />
      {onEdit && <button onClick={onEdit} style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }}>Editar</button>}
      {onDel && <button onClick={onDel} title="Eliminar" style={{ background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>}
    </div>
  );
  const baseRow = (b, on) => (
    <div style={card}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{b.title}</div>
        {b.cat && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{b.cat}</div>}
      </div>
      <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: on ? "#1F8A5B" : T.textFaint }}>{on ? "Activa" : "Inactiva"}</span>
      <AdSwitch T={T} on={on} onClick={() => setActiveKey(b.title, !on)} />
      <button onClick={() => personalizar(b)} title="Crear copia editable para tu clínica" style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer", whiteSpace: "nowrap" }}>Personalizar</button>
    </div>
  );
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Consentimientos" sub="Plantillas, estado de firma y firma digital JC-Sign" />
        <AdBtn T={T} primary onClick={() => setEditing("new")}>+ Nueva plantilla</AdBtn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, margin: "4px 0 20px" }}>
        <CajaCard T={T} l="Firmados" v={firmados} c="#1F8A5B" />
        <CajaCard T={T} l="Pendientes de firma" v={pendientes} c="#B8860B" />
        <CajaCard T={T} l="Plantillas activas" v={activasCount} c={T.accent} />
      </div>
      {/* Cumplimiento legal — Ley 20.584 / Ficha Clínica Electrónica (Área 13) */}
      <div style={{ background: T.accentSoft || "rgba(84,112,127,.10)", border: "1px solid " + T.line, borderRadius: 10, padding: "14px 16px", marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: ".04em", color: T.text }}>Cumplimiento · Ley 20.584 (derechos y deberes del paciente)</span>
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.7 }}>
          <li><b style={{ color: T.text }}>Consentimiento informado:</b> debe firmarse antes de todo procedimiento, explicando alcances, riesgos y alternativas.</li>
          <li><b style={{ color: T.text }}>Confidencialidad:</b> la ficha clínica es reservada; solo acceden el paciente, el profesional tratante y quien la ley autorice.</li>
          <li><b style={{ color: T.text }}>Conservación:</b> la ficha y consentimientos se conservan como mínimo <b style={{ color: T.text }}>15 años</b>.</li>
          <li><b style={{ color: T.text }}>Derecho de acceso:</b> el paciente puede solicitar copia íntegra de su ficha cuando lo requiera.</li>
        </ul>
      </div>
      {/* Plantillas PROPIAS primero (las que la clínica usa a diario), luego las base. */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 10 }}>Plantillas propias</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 24 }}>
        {tpls.length === 0 ? <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Aún no creas plantillas propias. Usa “+ Nueva plantilla” o “Personalizar” una plantilla base.</div>
          : tpls.map(t => { const on = t.active !== false; return <div key={t.id}>{row(t.title, t.cat, on, () => save({ ...t, active: !on }), () => setEditing(t), () => del(t.id))}</div>; })}
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 4 }}>Plantillas clínicas (predeterminadas)</div>
      <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 10, lineHeight: 1.5 }}>Las predeterminadas no se modifican. Usa <b style={{ color: T.textMute }}>Personalizar</b> para crear una copia editable para tu clínica sin alterar el documento maestro.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 24 }}>
        {base.length === 0 ? <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Sin plantillas base en esta clínica.</div>
          : base.map((b, i) => { const on = active[b.title] !== false; return <div key={b.title || i}>{baseRow(b, on)}</div>; })}
      </div>
      {editing && <ConsentTplModal T={T} tpl={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}
function ConsentTplModal({ T, tpl, onClose, onSave }) {
  const [f, setF] = useState(() => tpl ? { ...tpl } : { title: "", cat: "", body: "", active: true });
  const ok = (f.title || "").trim().length > 1;
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return (
    <AdModal T={T} title={tpl ? "Editar plantilla" : "Nueva plantilla de consentimiento"} onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave(f)}>Guardar plantilla</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AdField T={T} label="Título" value={f.title} onChange={v => setF({ ...f, title: v })} placeholder="Ej: Consentimiento toxina botulínica" />
        <AdField T={T} label="Categoría / procedimiento" value={f.cat} onChange={v => setF({ ...f, cat: v })} placeholder="Ej: Toxina botulínica" />
        <label><span style={lbl}>Texto del consentimiento</span><textarea value={f.body} onChange={e => setF({ ...f, body: e.target.value })} rows={8} placeholder="Redacta el consentimiento. Cada párrafo en una línea." style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} /></label>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "11px 14px", borderRadius: 8, background: T.surface2 || T.surface, border: "1px solid " + T.line }}>
          <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>Plantilla activa</span>
          <AdSwitch T={T} on={f.active !== false} onClick={() => setF({ ...f, active: !(f.active !== false) })} />
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 }}>La firma se captura con JC-Sign al momento de firmar con el paciente. Esta plantilla ya aparece disponible en el flujo de firma.</div>
      </div>
    </AdModal>
  );
}

/* ─────────── CENTRO DE TUTORIALES (Área 7) ─────────── */
const TUTO_PASOS = [
  ["config", "Configura tu clínica", "Nombre, dirección, horario y datos de contacto.", "config"],
  ["servicios", "Crea tus tratamientos", "Carga tus procedimientos con precio, duración y sesiones.", "servicios"],
  ["equipo", "Agrega tu equipo", "Registra profesionales con especialidades y permisos.", "equipo"],
  ["sucursales", "Define tus sucursales", "Dirección, contacto y horario de atención por sucursal.", "sucursales"],
  ["agenda", "Agenda tu primera cita", "Da una cita desde la agenda o el botón Nueva cita.", "agenda"],
  ["crm", "Organiza tus leads", "Lleva tus prospectos por el embudo de ventas.", "crm"],
  ["integraciones", "Conecta WhatsApp y Meta", "Activa la mensajería y la publicidad de tu clínica.", "integraciones"]
];
const TUTO_NOVEDADES = [
  ["Registro de Ventas", "Caja se transformó en Registro de Ventas: N° de ventas, total cobrado, pendiente de cobro y ranking de tratamientos más vendidos."],
  ["Fichas por tipo", "Nueva ficha por tipo: General, Facial, Corporal y Medicina General con signos vitales e IMC automático."],
  ["Sucursales", "Módulo nuevo de sucursales con dirección, contacto y horario semanal de atención."],
  ["CRM · Embudo", "Gestiona tus leads por etapas (de nuevo lead hasta venta), listo para Meta."],
  ["Profesionales y especialidades", "Ficha de profesional en secciones: especialidades, tratamientos y sucursales asignadas."]
];
function TutorialesView({ T, go }) {
  const [done, setDone] = useState(() => { try { return (window.DB && window.DB.get("tutorial_done")) || {}; } catch (e) { return {}; } });
  function toggle(k) { const n = { ...done, [k]: !done[k] }; setDone(n); try { window.DB && window.DB.set("tutorial_done", n); } catch (e) {} }
  // Videos propios por paso (los pega la clínica). Persisten en DB.tutorial_videos.
  const [videos, setVideos] = useState(() => { try { return (window.DB && window.DB.get("tutorial_videos")) || {}; } catch (e) { return {}; } });
  async function setVid(k) {
    const cur = videos[k] || "";
    const url = await Promise.resolve(window.jcmPrompt ? window.jcmPrompt("Pega el link del video para este paso (YouTube, Drive, Loom, etc.):", cur) : window.prompt("Link del video:", cur));
    if (url == null) return;
    const n = { ...videos, [k]: ("" + url).trim() }; if (!n[k]) delete n[k];
    setVideos(n); try { window.DB && window.DB.set("tutorial_videos", n); } catch (e) {}
  }
  const completados = TUTO_PASOS.filter(([k]) => done[k]).length;
  const pct = Math.round(completados / TUTO_PASOS.length * 100);
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <SecHead T={T} title="Centro de Tutoriales" sub="Pon en marcha tu clínica paso a paso y descubre lo nuevo de Medique" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, alignItems: "start" }}>
        {/* Wizard de puesta en marcha */}
        <div>
          <div style={luxF ? { ...DS.card(T), padding: "18px 20px", marginBottom: 14 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text }}>Puesta en marcha</span>
              <span style={{ fontFamily: T.serif, fontSize: 18, color: T.accent }}>{completados}/{TUTO_PASOS.length}</span>
            </div>
            <div style={{ height: 7, borderRadius: 999, background: T.lineSoft, overflow: "hidden" }}>
              <div style={{ height: "100%", width: pct + "%", background: T.accent, borderRadius: 999, transition: "width .3s" }} />
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 8 }}>{pct === 100 ? "🎉 ¡Tu clínica está lista!" : "Completa los pasos para sacarle todo el provecho a Medique."}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TUTO_PASOS.map(([k, title, desc, sec], i) => { const ok = !!done[k]; return (
              <div key={k} style={luxF ? { display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 15px", ...DS.card(T), borderColor: ok ? T.accent + "55" : T.line } : { display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 14px", borderRadius: 10, background: T.surface, border: "1px solid " + (ok ? T.accent + "55" : T.line) }}>
                <button onClick={() => toggle(k)} title={ok ? "Marcar como pendiente" : "Marcar como completado"} style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, cursor: "pointer", border: "1.5px solid " + (ok ? T.accent : T.line), background: ok ? T.accent : "transparent", color: ok ? (T.onAccent || "#fff") : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}><span style={{ color: T.textFaint }}>{i + 1}.</span> {title}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  {videos[k] && <a href={videos[k]} target="_blank" rel="noopener" title="Ver video" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: "#fff", background: "#C0285A", borderRadius: 7, padding: "6px 10px", textDecoration: "none" }}><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>Video</a>}
                  {/* Agregar/cambiar el video solo lo puede el SUPER ADMIN (Medique/JC Medical), no las clínicas. (P30) */}
                  {window.JCM_BASE === true && <button onClick={() => setVid(k)} title={videos[k] ? "Cambiar video (super admin)" : "Agregar video (super admin)"} style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 9px", cursor: "pointer", whiteSpace: "nowrap" }}>{videos[k] ? "✎" : "+ video"}</button>}
                  <button onClick={() => go && go(sec)} style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 11px", cursor: "pointer", whiteSpace: "nowrap" }}>Ir →</button>
                </div>
              </div>
            ); })}
          </div>
        </div>
        {/* Novedades / changelog */}
        <div style={luxF ? { ...DS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1F8A5B" }} />
            <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text }}>Novedades de Medique</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {TUTO_NOVEDADES.map(([title, desc], i) => (
              <div key={title} style={{ position: "relative", paddingLeft: 18, paddingBottom: i === TUTO_NOVEDADES.length - 1 ? 0 : 16 }}>
                <span style={{ position: "absolute", left: 0, top: 4, width: 8, height: 8, borderRadius: "50%", background: T.accent }} />
                {i < TUTO_NOVEDADES.length - 1 && <span style={{ position: "absolute", left: 3.5, top: 12, bottom: 0, width: 1, background: T.line }} />}
                <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text }}>{title}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── CRM · EMBUDO DE LEADS (Área 11) ─────────── */
const CRM_STAGES = [["nuevo", "Nuevo lead", "#6A8296"], ["proceso", "En proceso", "#B8860B"], ["interesado", "Interesado", "#4E8A72"], ["agendado", "Agendado", "#54707F"], ["nocalifica", "No califica", "#9A8C7A"], ["compro", "Compró", "#1F8A5B"]];
const CRM_ORIGENES = ["Instagram", "Facebook", "TikTok", "WhatsApp", "Meta Ads", "Google", "Referido", "Walk-in"];
function loadLeads() { try { const v = window.DB && window.DB.get("crm_leads"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function saveLeadsDB(v) { try { if (window.DB) window.DB.set("crm_leads", v); } catch (e) {} }
function CrmView({ T }) {
  const [leads, setLeads] = useState(loadLeads);
  const [editing, setEditing] = useState(null);
  function persist(n) { setLeads(n); saveLeadsDB(n); }
  function save(l) {
    const exists = l.id && leads.find(x => x.id === l.id);
    persist(exists ? leads.map(x => x.id === l.id ? l : x) : [...leads, { ...l, id: "lead" + Date.now(), ts: Date.now() }]);
    setEditing(null);
    try { window.jcmToast && window.jcmToast("Lead " + (exists ? "actualizado" : "agregado") + ".", "ok"); } catch (e) {}
  }
  function moveLead(id, stage) { persist(leads.map(x => x.id === id ? { ...x, stage } : x)); }
  async function del(id) { if (!(await (window.jcmConfirm || window.confirm)("¿Eliminar este lead?", { danger: true }))) return; persist(leads.filter(x => x.id !== id)); }
  const byStage = st => leads.filter(l => (l.stage || "nuevo") === st);
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="CRM · Embudo de leads" sub={leads.length + " lead" + (leads.length === 1 ? "" : "s") + " · listo para Meta API"} />
        <AdBtn T={T} primary onClick={() => setEditing("new")}>+ Nuevo lead</AdBtn>
      </div>
      <div className="jc-scroll" style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, marginTop: 4 }}>
        {CRM_STAGES.map(([k, label, col], ci) => { const items = byStage(k); return (
          <div key={k} style={luxF ? { flexShrink: 0, width: 230, ...DS.card(T), padding: "12px 11px", ...DS.reveal(ci) } : { flexShrink: 0, width: 230, background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "12px 11px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: col, flexShrink: 0 }} />
              <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text }}>{label}</span>
              <span style={{ marginLeft: "auto", fontFamily: T.sans, fontSize: 11, color: T.textMute, background: T.surface2 || T.bg, borderRadius: 999, padding: "1px 8px" }}>{items.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {items.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, padding: "10px 2px", textAlign: "center" }}>—</div>}
              {items.map(l => (
                <div key={l.id} style={luxF ? { background: T.bg, border: "1px solid " + T.line, borderRadius: DS.r.ctl, padding: "10px 11px" } : { background: T.bg, border: "1px solid " + T.line, borderRadius: 9, padding: "10px 11px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                    <div style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => setEditing(l)}>
                      <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text }}>{l.name}</div>
                      {l.proc && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{l.proc}</div>}
                      <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 2 }}>{[l.phone, l.origen].filter(Boolean).join(" · ")}</div>
                    </div>
                    <button onClick={() => del(l.id)} title="Eliminar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 2, display: "flex", flexShrink: 0 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
                  </div>
                  <select value={l.stage || "nuevo"} onChange={e => moveLead(l.id, e.target.value)} style={{ width: "100%", marginTop: 8, padding: "5px 7px", borderRadius: 5, border: "1px solid " + T.line, background: T.surface, color: T.textMute, fontFamily: T.sans, fontSize: 10.5, outline: "none", cursor: "pointer" }}>
                    {CRM_STAGES.map(([sk, sl]) => <option key={sk} value={sk}>{sl}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ); })}
      </div>
      {editing && <CrmLeadModal T={T} lead={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}
function CrmLeadModal({ T, lead, onClose, onSave }) {
  const [f, setF] = useState(() => lead ? { ...lead } : { name: "", phone: "+56 9 ", proc: "", origen: "Instagram", stage: "nuevo", note: "" });
  const ok = (f.name || "").trim().length > 1;
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return (
    <AdModal T={T} title={lead ? "Editar lead" : "Nuevo lead"} onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave(f)}>Guardar lead</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AdField T={T} label="Nombre" value={f.name} onChange={v => setF({ ...f, name: v })} placeholder="Nombre del lead" />
        <AdField T={T} label="Teléfono / WhatsApp" value={f.phone} onChange={v => setF({ ...f, phone: v })} inputMode="tel" />
        <AdField T={T} label="Tratamiento de interés" value={f.proc} onChange={v => setF({ ...f, proc: v })} placeholder="Ej: Botox, ácido hialurónico…" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <label><span style={lbl}>Origen</span><select value={f.origen} onChange={e => setF({ ...f, origen: e.target.value })} style={inp}>{CRM_ORIGENES.map(o => <option key={o} value={o}>{o}</option>)}</select></label>
          <label><span style={lbl}>Etapa</span><select value={f.stage} onChange={e => setF({ ...f, stage: e.target.value })} style={inp}>{CRM_STAGES.map(([sk, sl]) => <option key={sk} value={sk}>{sl}</option>)}</select></label>
        </div>
        <label><span style={lbl}>Nota</span><textarea value={f.note} onChange={e => setF({ ...f, note: e.target.value })} rows={2} placeholder="Seguimiento, observaciones…" style={{ ...inp, resize: "vertical" }} /></label>
      </div>
    </AdModal>
  );
}

/* ─────────── FIDELIDAD ─────────── */
function FidelidadView({ T }) {
  const seeded = (typeof clinicSeeded === "function") ? clinicSeeded() : true;
  const [on, setOn] = useState(() => { try { const v = window.DB && DB.get("fidelity_on"); return v == null ? seeded : !!v; } catch (e) { return seeded; } });
  function setFid(v) { setOn(v); try { if (window.DB) DB.set("fidelity_on", v); } catch (e) {} }
  // Config de puntos: puntos por procedimiento y puntos para canjear
  const [cfg, setCfg] = useState(() => { try { return DB.get("fidelity_cfg") || { ptsProc: 10, ptsCanje: 100, premio: "" }; } catch (e) { return { ptsProc: 10, ptsCanje: 100, premio: "" }; } });
  const [editCfg, setEditCfg] = useState(false);
  const [tmpCfg, setTmpCfg] = useState(cfg);
  function saveCfg() { setCfg(tmpCfg); try { DB.set("fidelity_cfg", tmpCfg); } catch (e) {} setEditCfg(false); try { window.jcmToast && window.jcmToast("Configuración guardada.", "ok"); } catch(e){} }
  // Popup primera visita
  const [showWelcome, setShowWelcome] = useState(() => { try { return !DB.get("fidelity_seen"); } catch (e) { return true; } });
  function closeWelcome() { setShowWelcome(false); try { DB.set("fidelity_seen", true); } catch (e) {} }
  const members = seeded ? CADMIN.fidelity : [];
  const oro = members.filter(m => m.tier === "Oro").length;
  const ptsActivos = members.reduce((s, m) => s + (m.pts || 0), 0);
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <SecHead T={T} title="Fidelidad" sub="Programa de puntos y retención" />
      {/* Interruptor del sistema */}
      <div style={luxF ? { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, ...DS.card(T), padding: "14px 16px", borderColor: on ? T.accent + "55" : T.line, marginBottom: 16 } : { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: T.surface, border: "1px solid " + (on ? T.accent + "55" : T.line), borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>Programa de fidelidad</div>
          <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>{on ? "Activo · los pacientes acumulan puntos por cada atención." : "Apagado · enciéndelo para empezar a acumular puntos."}</div>
        </div>
        <AdSwitch T={T} on={on} onClick={() => setFid(!on)} />
      </div>
      {/* Config de puntos */}
      {on && <div style={luxF ? { ...DS.card(T), padding: "14px 16px", marginBottom: 16 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text }}>Configuración de puntos</div>
          <button onClick={() => { setTmpCfg(cfg); setEditCfg(!editCfg); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 11, color: T.accent, padding: 0 }}>{editCfg ? "Cancelar" : "Editar"}</button>
        </div>
        {editCfg ? (
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            <AdField T={T} label="Puntos por procedimiento (default por sesión)" value={String(tmpCfg.ptsProc)} onChange={v => setTmpCfg(c => ({ ...c, ptsProc: parseInt(v) || 0 }))} />
            <AdField T={T} label="Puntos necesarios para canjear un beneficio" value={String(tmpCfg.ptsCanje)} onChange={v => setTmpCfg(c => ({ ...c, ptsCanje: parseInt(v) || 0 }))} />
            <AdField T={T} label="Premio al canjear (qué recibe el paciente)" value={tmpCfg.premio || ""} onChange={v => setTmpCfg(c => ({ ...c, premio: v }))} placeholder="Ej: 20% de descuento · sesión de limpieza facial · masaje gratis" />
            <AdBtn T={T} primary onClick={saveCfg}>Guardar configuración</AdBtn>
          </div>
        ) : (
          <div style={{ marginTop: 8, display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div><span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>Por procedimiento: </span><span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text }}>{cfg.ptsProc} pts</span></div>
            <div><span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>Para canjear: </span><span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text }}>{cfg.ptsCanje} pts</span></div>
            <div><span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>Premio: </span><span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: cfg.premio ? T.text : T.textFaint }}>{cfg.premio || "Sin definir"}</span></div>
          </div>
        )}
      </div>}
      {on ? <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
          <AdStat T={T} n={members.length} l="Miembros" />
          <AdStat T={T} n={ptsActivos.toLocaleString("es-CL")} l="Puntos activos" />
          <AdStat T={T} n={oro} l="Miembros Oro" />
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 14, lineHeight: 1.5 }}>
          Los puntos por procedimiento específico se pueden ajustar en <b>Servicios</b> (campo "Puntos que otorga" al editar un servicio). El valor por defecto es <b>{cfg.ptsProc} puntos</b>.
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Pacientes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {members.length === 0 && <Empty2 T={T}>Aún no hay pacientes con puntos. A medida que registres atenciones, aparecerán aquí.</Empty2>}
          {members.map(p => (
            <div key={p.id} style={luxF ? { display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", ...DS.card(T) } : { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line }}>
              <Avatar T={T} name={p.name} size={38} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{p.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{p.pts} pts · canje a los {cfg.ptsCanje} pts</div>
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
      {/* Popup de bienvenida — primera visita */}
      {showWelcome && (
        <AdModal T={T} title="Programa de Fidelidad" onClose={closeWelcome}
          footer={<div style={{ display: "flex", gap: 10, width: "100%" }}>
            <AdBtn T={T} full onClick={closeWelcome}>Cerrar</AdBtn>
            <AdBtn T={T} primary full onClick={() => { setFid(true); closeWelcome(); }}>Activar ahora</AdBtn>
          </div>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: T.accent, color: T.onAccent || "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>★</div>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.55 }}>Retén y premia a tus pacientes más fieles con un sistema de puntos integrado en tu panel.</div>
            </div>
            <div style={{ background: T.surface2 || T.lineSoft, borderRadius: 8, padding: "14px" }}>
              <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text, marginBottom: 8 }}>¿Cómo funciona?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  ["1", "Cada vez que registres una sesión, el paciente acumula puntos automáticamente."],
                  ["2", "Tú defines cuántos puntos otorga cada procedimiento (por defecto: 10 pts)."],
                  ["3", "Cuando un paciente alcanza el mínimo para canjear (por defecto: 100 pts), puede recibir un beneficio o descuento que tú elijas."],
                  ["4", "Los pacientes más activos suben al nivel Oro y pueden recibir beneficios especiales."]
                ].map(([n, t]) => (
                  <div key={n} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.accent, color: T.onAccent || "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{n}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, lineHeight: 1.5 }}>Puedes cambiar los puntos por procedimiento y el umbral de canje en cualquier momento desde esta misma pantalla.</div>
          </div>
        </AdModal>
      )}
    </div>
  );
}

/* ─────────── MARKETING ─────────── */
/* ─────────── DIFUSIONES + PLANTILLAS (Área 10) ─────────── */
const MSG_VARS = ["{nombre}", "{tratamiento}", "{fecha}", "{clinica}"];
function loadMsgTpls() {
  try { const v = window.DB && window.DB.get("msg_templates"); if (Array.isArray(v) && v.length) return v; } catch (e) {}
  return [
    { id: "m1", name: "Recordatorio de cita", channel: "whatsapp", body: "Hola {nombre} 👋 Te recordamos tu cita en {clinica}. ¡Te esperamos! 🌿" },
    { id: "m2", name: "Promoción del mes", channel: "whatsapp", body: "Hola {nombre} ✨ Este mes tenemos una promoción especial en {tratamiento}. ¿Te agendamos? 💉" }
  ];
}
function saveMsgTplsDB(v) { try { if (window.DB) window.DB.set("msg_templates", v); } catch (e) {} }
function applyVars(body, vars) { return (body || "").replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null && vars[k] !== "") ? vars[k] : m); }
function DifusionesView({ T }) {
  const [tab, setTab] = useState("difusiones");
  const [tpls, setTpls] = useState(loadMsgTpls);
  const [editing, setEditing] = useState(null);
  const [selTpl, setSelTpl] = useState(null);
  const [aud, setAud] = useState("pacientes");
  function persist(n) { setTpls(n); saveMsgTplsDB(n); }
  function save(t) { const exists = t.id && tpls.find(x => x.id === t.id); persist(exists ? tpls.map(x => x.id === t.id ? t : x) : [...tpls, { ...t, id: "mtpl" + Date.now() }]); setEditing(null); try { window.jcmToast && window.jcmToast("Plantilla guardada.", "ok"); } catch (e) {} }
  async function del(id) { if (!(await (window.jcmConfirm || window.confirm)("¿Eliminar esta plantilla?", { danger: true }))) return; persist(tpls.filter(x => x.id !== id)); }
  let pacientes = [], leads = [];
  try { pacientes = (window.DB && window.DB.get("patients")) || []; } catch (e) {}
  try { leads = (window.DB && window.DB.get("crm_leads")) || []; } catch (e) {}
  const clinica = (typeof window.clinicName === "function") ? window.clinicName() : "la clínica";
  const hoy = new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long" });
  const recipients = (aud === "leads" ? leads : pacientes).map(r => ({ name: r.name || "Paciente", phone: (r.phone || "").replace(/[^0-9]/g, ""), proc: r.proc || r.procInteres || "" })).filter(r => r.name);
  const conTel = recipients.filter(r => r.phone.length >= 8);
  const tplObj = tpls.find(t => t.id === selTpl) || null;
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const tabBtn = (k, l) => <button key={k} onClick={() => setTab(k)} style={luxF
    ? { fontFamily: T.sans, fontSize: DS.ft.sub, fontWeight: tab === k ? 600 : 500, padding: "8px 16px", borderRadius: DS.r.ctl, cursor: "pointer", border: "none", background: tab === k ? T.surface : "transparent", boxShadow: tab === k ? "0 1px 2px rgba(0,0,0,.06)" : "none", color: tab === k ? T.accent : T.textMute, transition: DS.trans("background,box-shadow,color") }
    : { fontFamily: T.sans, fontSize: 12.5, fontWeight: tab === k ? 600 : 500, padding: "8px 18px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (tab === k ? T.accent : T.line), background: tab === k ? T.accent : "transparent", color: tab === k ? (T.onAccent || "#fff") : T.textMute }}>{l}</button>;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Difusiones" sub="Envía mensajes masivos por WhatsApp con plantillas y variables" />
        {tab === "plantillas" && <AdBtn T={T} primary onClick={() => setEditing("new")}>+ Nueva plantilla</AdBtn>}
      </div>
      {/* Encabezado con degradado suave Marfil + resumen de audiencia (P16). */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, background: "linear-gradient(135deg," + T.accent + "14, " + (T.surface2 || T.surface) + ")", border: "1px solid " + T.line, borderRadius: 16, padding: "16px 18px", margin: "6px 0 16px", flexWrap: "wrap" }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: T.accent + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text, lineHeight: 1.15 }}>Llega a tus pacientes en un clic</div>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 3, lineHeight: 1.5 }}>Elige una audiencia y una plantilla con variables ({"{nombre}"}, {"{tratamiento}"}…) y envía por WhatsApp uno a uno, listo para personalizar.</div>
        </div>
        <div style={{ display: "flex", gap: 18, flexShrink: 0 }}>
          <div style={{ textAlign: "center" }}><div style={{ fontFamily: T.serif, fontSize: 24, color: T.accent, lineHeight: 1 }}>{pacientes.length}</div><div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginTop: 3 }}>Pacientes</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontFamily: T.serif, fontSize: 24, color: T.accent, lineHeight: 1 }}>{tpls.length}</div><div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginTop: 3 }}>Plantillas</div></div>
        </div>
      </div>
      <div style={luxF
        ? { display: "inline-flex", gap: 2, background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: DS.r.seg, padding: 3, margin: "0 0 18px" }
        : { display: "flex", gap: 6, margin: "0 0 18px" }}>{tabBtn("difusiones", "Difusiones")}{tabBtn("plantillas", "Plantillas")}</div>
      {tab === "plantillas" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tpls.map(t => (
            <div key={t.id} style={luxF ? { ...DS.card(T), padding: "13px 16px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "13px 15px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: t.channel === "email" ? "#54707F" : "#1F8A5B", border: "1px solid " + T.line, borderRadius: 999, padding: "2px 8px" }}>{t.channel === "email" ? "Email" : "WhatsApp"}</span>
                <span style={{ flex: 1, fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{t.name}</span>
                <button onClick={() => setEditing(t)} style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }}>Editar</button>
                <button onClick={() => del(t.id)} title="Eliminar" style={{ background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 8, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{t.body}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16, alignItems: "start" }}>
          <div style={luxF ? { ...DS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 12 }}>1 · Arma tu difusión</div>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Audiencia</span>
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {[["pacientes", "Pacientes (" + pacientes.length + ")"], ["leads", "Leads CRM (" + leads.length + ")"]].map(([k, l]) => <button key={k} onClick={() => setAud(k)} style={{ flex: 1, fontFamily: T.sans, fontSize: 11.5, padding: "9px", borderRadius: 8, cursor: "pointer", border: "1px solid " + (aud === k ? T.accent : T.line), background: aud === k ? T.surface2 || T.surface : "transparent", color: aud === k ? T.text : T.textMute }}>{l}</button>)}
            </div>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Plantilla</span>
            <select value={selTpl || ""} onChange={e => setSelTpl(e.target.value)} style={{ width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }}>
              <option value="">— Elige una plantilla —</option>
              {tpls.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 }}>Variables: {MSG_VARS.join("  ")}. Se reemplazan por cada destinatario. {conTel.length} de {recipients.length} tienen teléfono válido.</div>
          </div>
          <div style={luxF ? { ...DS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 12 }}>2 · Envía uno por uno por WhatsApp</div>
            {!tplObj ? <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Elige una plantilla para previsualizar y enviar.</div>
              : conTel.length === 0 ? <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Esta audiencia no tiene teléfonos válidos.</div>
              : <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 360, overflowY: "auto" }} className="jc-scroll">
                  {conTel.map((r, i) => { const msg = applyVars(tplObj.body, { nombre: r.name.split(" ")[0], tratamiento: r.proc || "tu tratamiento", fecha: hoy, clinica }); return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: T.bg, border: "1px solid " + T.line }}>
                      <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{r.name}</div><div style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg}</div></div>
                      <a href={"https://api.whatsapp.com/send?phone=" + r.phone + "&text=" + encodeURIComponent(msg)} target="_blank" rel="noopener" style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: "#fff", background: "#25D366", borderRadius: 7, padding: "7px 12px", textDecoration: "none" }}>WhatsApp →</a>
                    </div>
                  ); })}
                </div>}
          </div>
        </div>
      )}
      {editing && <MsgTplModal T={T} tpl={editing === "new" ? null : editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}
function MsgTplModal({ T, tpl, onClose, onSave }) {
  const [f, setF] = useState(() => tpl ? { ...tpl } : { name: "", channel: "whatsapp", subject: "", body: "" });
  const ok = (f.name || "").trim().length > 1 && (f.body || "").trim().length > 1;
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  function addVar(v) { setF(s => ({ ...s, body: (s.body || "") + v })); }
  return (
    <AdModal T={T} title={tpl ? "Editar plantilla" : "Nueva plantilla de mensaje"} onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave(f)}>Guardar plantilla</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AdField T={T} label="Nombre" value={f.name} onChange={v => setF({ ...f, name: v })} placeholder="Ej: Recordatorio de cita" />
        <div>
          <span style={lbl}>Canal</span>
          <div style={{ display: "flex", gap: 6 }}>
            {[["whatsapp", "WhatsApp"], ["email", "Email"]].map(([k, l]) => <button key={k} type="button" onClick={() => setF({ ...f, channel: k })} style={{ flex: 1, fontFamily: T.sans, fontSize: 12, padding: "10px", borderRadius: 7, cursor: "pointer", border: "1px solid " + (f.channel === k ? T.accent : T.line), background: f.channel === k ? T.surface2 || T.surface : "transparent", color: f.channel === k ? T.text : T.textMute }}>{l}</button>)}
          </div>
        </div>
        {f.channel === "email" && <AdField T={T} label="Asunto" value={f.subject} onChange={v => setF({ ...f, subject: v })} placeholder="Asunto del correo" />}
        <label><span style={lbl}>Mensaje</span><textarea value={f.body} onChange={e => setF({ ...f, body: e.target.value })} rows={5} placeholder="Escribe el mensaje. Usa variables como {nombre}." style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} /></label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {MSG_VARS.map(v => <button key={v} type="button" onClick={() => addVar(v)} style={{ fontFamily: T.sans, fontSize: 11, padding: "5px 10px", borderRadius: 999, cursor: "pointer", border: "1px solid " + T.line, background: "transparent", color: T.accent }}>+ {v}</button>)}
        </div>
      </div>
    </AdModal>
  );
}

function MarketingView({ T, go }) {
  const D = window.JCDATA;
  const connected = (typeof metaConnected === "function") && metaConnected();
  const [camps, setCamps] = useState(() => {
    // Campañas REALES cacheadas desde Meta Ads (se refrescan al entrar). Sin datos ficticios.
    try { const saved = window.DB && window.DB.get("campaigns"); if (saved && saved.length) return saved.filter(c => c.real); } catch (e) {}
    return [];
  });
  const [tot, setTot] = useState({ spend: 0, leads: 0, reach: 0 });
  const [loading, setLoading] = useState(connected);
  const [err, setErr] = useState("");
  function saveCamps(n) { setCamps(n); try { window.DB && window.DB.set("campaigns", n); } catch (e) {} }
  // Al entrar: si Meta Ads está conectado, lee gasto/leads/campañas REALES desde la Graph API.
  useEffect(() => {
    if (!connected || !window.mediqueMeta) { setLoading(false); return; }
    let alive = true; setLoading(true); setErr("");
    window.mediqueMeta({ campaigns: true }).then(d => {
      if (!alive) return;
      setLoading(false);
      if (d && d.ok) {
        setTot({ spend: d.spend || 0, leads: d.leads || 0, reach: d.reach || 0 });
        const list = (d.campaigns || []).map(c => ({ id: c.id, name: c.name, reach: c.reach || 0, leads: c.leads || 0, spend: c.spend || 0, net: "Meta Ads", active: !!c.active, real: true }));
        saveCamps(list);
      } else if (d && d.configured === false) {
        setErr("Meta Ads no está configurado en el servidor.");
      } else {
        setErr((d && d.error) || "No se pudieron leer tus campañas de Meta.");
      }
    });
    return () => { alive = false; };
  }, [connected]);
  const totLeads = tot.leads || camps.reduce((a, c) => a + c.leads, 0);
  const totSpend = tot.spend || camps.reduce((a, c) => a + c.spend, 0);
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <SecHead T={T} title="Marketing" sub="Campañas conectadas a Meta Ads e Instagram" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
        <AdStat T={T} n={totLeads} l="Leads (mes)" />
        <AdStat T={T} n={D.fmt(totSpend)} l="Inversión" />
        <AdStat T={T} n={totLeads ? (Math.round(totSpend / totLeads / 100) / 10 + "k") : "—"} l="Costo/lead" />
      </div>
      {!connected && (
        <div onClick={() => go("integraciones")} style={{ cursor: "pointer", background: T.accentSoft || "rgba(84,112,127,.10)", border: "1px solid " + T.accent, borderRadius: 10, padding: "14px 16px", marginBottom: 16, fontFamily: T.sans, fontSize: 12.5, color: T.text, lineHeight: 1.5 }}>
          <b>Conecta tu cuenta de Meta Ads</b> para ver aquí tus campañas reales con su gasto, leads y alcance. <span style={{ color: T.accent }}>Ir a Integraciones →</span>
        </div>
      )}
      {connected && loading && <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontFamily: T.sans, fontSize: 12, color: T.textMute }}>Cargando tus campañas de Meta Ads…</div>}
      {connected && !loading && err && <div style={{ background: "rgba(224,106,106,.08)", border: "1px solid rgba(224,106,106,.4)", borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontFamily: T.sans, fontSize: 12, color: "#e06a6a" }}>{err}</div>}
      <a href="https://adsmanager.facebook.com/adsmanager" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 10, marginBottom: 16, textDecoration: "none", background: "#1877F2", border: "1px solid #1877F2" }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,.18)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, flexShrink: 0 }}>f</span>
        <span style={{ flex: 1, fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: "#fff" }}>Ir a Meta Ads Manager</span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
      </a>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Campañas</div>
        {/* Sólo se crean campañas REALES desde Meta Ads (no ficticias). El botón abre Meta Ads Manager. */}
        <a href="https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=create" target="_blank" rel="noopener" title="Las campañas se crean en Meta Ads Manager y se sincronizan aquí" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 8, textDecoration: "none", background: T.accent, color: T.onAccent || "#fff" }}>
          + Crear en Meta Ads
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
        </a>
      </div>
      <div style={{ background: T.accentSoft || "rgba(84,112,127,.10)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 13px", marginBottom: 12, fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5 }}>
        Las campañas se crean y administran directamente en <b style={{ color: T.text }}>Meta Ads Manager</b>. {connected ? "Aquí ves tus campañas reales con su alcance, leads e inversión del mes." : "Cuando conectes tu cuenta, las campañas reales aparecerán aquí automáticamente con su alcance, leads e inversión."}
      </div>
      {/* Campañas activas */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1F8A5B" }} />Activas ({camps.filter(c => c.active).length})
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {camps.filter(c => c.active).map(c => (
          <div key={c.id} style={luxF ? { ...DS.card(T), padding: "14px 16px", borderColor: "rgba(31,138,91,.4)" } : { padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid rgba(31,138,91,.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{c.name}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <AdTag T={T} tone="ok">Activa</AdTag>
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
          <div key={c.id} style={luxF ? { ...DS.card(T), padding: "14px 16px", opacity: .8 } : { padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, opacity: .8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{c.name}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <AdTag T={T} tone="muted">Pausada</AdTag>
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
/* Credenciales de Meta por clínica (token de solo lectura + cuenta), aisladas en DB 'meta_creds'. */
function metaCreds() { try { return (window.DB && DB.get("meta_creds")) || {}; } catch (e) { return {}; } }
function metaConnected() { const c = metaCreds(); return !!(c.token && c.account); }
/* Modal para conectar Meta Ads con el token propio de la clínica. */
function MetaConnectModal({ T, onClose, onSaved }) {
  const c0 = metaCreds();
  const [account, setAccount] = useState(c0.account || "");
  const [token, setToken] = useState(c0.token || "");
  const [busy, setBusy] = useState(false);
  function fmtAcct(v) { v = (v || "").trim(); return v && !/^act_/.test(v) ? "act_" + v.replace(/[^0-9,act_]/g, "") : v; }
  function save() {
    const acc = fmtAcct(account), tk = token.trim();
    if (!acc || !tk) { window.jcmToast && window.jcmToast("Completa la cuenta y el token.", "error"); return; }
    setBusy(true);
    // Verifica contra /api/meta antes de guardar (así la clínica sabe al instante si quedó bien).
    // /api/meta exige el ID token de Firebase del usuario logueado, además del token de Meta.
    const tokP = (window.JCSAAS && window.JCSAAS.idToken) ? window.JCSAAS.idToken() : Promise.resolve(null);
    tokP.then(idt => {
      const headers = { "Content-Type": "application/json" };
      if (idt) headers["Authorization"] = "Bearer " + idt;
      return fetch("/api/meta", { method: "POST", headers: headers, body: JSON.stringify({ token: tk, account: acc }) });
    })
      .then(r => r.json()).then(d => {
        setBusy(false);
        if (d && d.ok) {
          try { DB.set("meta_creds", { account: acc, token: tk }); } catch (e) {}
          window.jcmToast && window.jcmToast("Meta Ads conectado · gasto del mes: " + (window.JCDATA ? window.JCDATA.fmt(d.spend || 0) : d.spend), "ok");
          onSaved && onSaved();
        } else {
          window.jcmError && window.jcmError("No se pudo conectar Meta", (d && d.error) || d);
        }
      }).catch(e => { setBusy(false); window.jcmError && window.jcmError("No se pudo conectar Meta", e); });
  }
  function disconnect() { try { DB.del("meta_creds"); } catch (e) {} window.jcmToast && window.jcmToast("Meta Ads desconectado.", "info"); onSaved && onSaved(); }
  return (
    <AdModal T={T} title="Conectar Meta Ads" onClose={onClose} footer={
      <div style={{ display: "flex", gap: 10, width: "100%" }}>
        {metaConnected() && <AdBtn T={T} onClick={disconnect}>Desconectar</AdBtn>}
        <div style={{ flex: 1 }}><AdBtn T={T} primary full onClick={save}>{busy ? "Verificando…" : "Conectar y verificar"}</AdBtn></div>
      </div>
    }>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 }}>Conecta tu cuenta de Meta Ads para ver tu gasto, leads y campañas reales en el panel. Usa un token de <b>solo lectura</b> (<code>ads_read</code>): no permite gastar ni modificar nada, solo leer tus estadísticas.</p>
        {/* TUTORIAL paso a paso para cliente nuevo (genera el token + encuentra el ID de cuenta). */}
        <div style={{ background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "14px 15px" }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>¿Primera vez? Conéctalo en 3 pasos</div>
          <ol style={{ margin: 0, paddingLeft: 18, fontFamily: T.sans, fontSize: 12, color: T.text, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 8 }}>
            <li>En Meta, abre <b>Configuración del negocio → Usuarios → Usuarios del sistema</b>.<br />
              <a href="https://business.facebook.com/settings/system-users" target="_blank" rel="noopener" style={{ color: T.accent, fontSize: 11.5, textDecoration: "underline" }}>Abrir Usuarios del sistema ↗</a>
            </li>
            <li>Elige (o crea) un usuario del sistema → <b>Generar nuevo token</b> → selecciona tu app → marca el permiso <b>ads_read</b> → <b>copia</b> el token y pégalo abajo.</li>
            <li>Tu <b>ID de cuenta</b> empieza con <code>act_</code> (lo ves en Ads Manager o en Cuentas publicitarias) y va en el primer campo.<br />
              <a href="https://business.facebook.com/settings/ad-accounts" target="_blank" rel="noopener" style={{ color: T.accent, fontSize: 11.5, textDecoration: "underline" }}>Ver mis cuentas publicitarias ↗</a>
            </li>
          </ol>
        </div>
        <AdField T={T} label="1 · ID de cuenta publicitaria" value={account} onChange={setAccount} placeholder="act_1234567890" />
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>2 · Token de acceso (ads_read)</span>
          <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="EAAB…" autoComplete="off" style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" }} />
        </label>
        <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 }}>El token se guarda solo en los datos privados de tu clínica y puedes desconectarlo cuando quieras. Al pulsar “Conectar y verificar” comprobamos contra Meta que el token funcione antes de guardarlo.</p>
      </div>
    </AdModal>
  );
}

/* Modal para conectar el Correo: envía un correo de prueba REAL vía /api/email (Resend).
   La conexión se marca solo si el envío funcionó de verdad (no es un toggle cosmético). */
function CorreoConnectModal({ T, onClose, onConnected }) {
  const [dest, setDest] = useState(() => {
    try { return (window.JCSAAS && window.JCSAAS.user && window.JCSAAS.user.email) || ""; } catch (e) { return ""; }
  });
  const [busy, setBusy] = useState(false);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((dest || "").trim());
  function enviarPrueba() {
    if (!emailOk) { window.jcmToast && window.jcmToast("Escribe un correo válido para la prueba.", "error"); return; }
    setBusy(true);
    const clinic = (() => { try { return DB.cfg().clinic_name || "tu clínica"; } catch (e) { return "tu clínica"; } })();
    window.mediqueEmail({
      to: dest.trim(),
      subject: "Prueba de correo · Medique",
      text: "¡Hola!\n\nEste es un correo de prueba enviado desde el panel de " + clinic + " con Medique.\n\nSi lo recibiste, el envío de correos quedó funcionando: ya puedes mandar confirmaciones y recordatorios a tus pacientes.\n\n— El equipo de Medique"
    }).then(r => {
      setBusy(false);
      if (r && r.ok) {
        window.jcmToast && window.jcmToast("Correo de prueba enviado a " + dest.trim() + ". Revisa tu bandeja (y spam).", "ok");
        onConnected && onConnected();
      } else if (r && r.configured === false) {
        window.jcmError && window.jcmError("Correo aún no configurado en el servidor (falta RESEND_API_KEY). Pídelo al administrador.", r.error);
      } else {
        window.jcmError && window.jcmError("No se pudo enviar el correo de prueba", (r && r.error) || r);
      }
    }).catch(e => { setBusy(false); window.jcmError && window.jcmError("No se pudo enviar el correo de prueba", e); });
  }
  return (
    <AdModal T={T} title="Conectar Correo" onClose={onClose} footer={
      <AdBtn T={T} primary full onClick={enviarPrueba}>{busy ? "Enviando…" : "Enviar correo de prueba"}</AdBtn>
    }>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 }}>Envía un correo de prueba para confirmar que el canal funciona. Una vez verificado, podrás mandar confirmaciones y recordatorios a tus pacientes desde su ficha.</p>
        <AdField T={T} label="Enviar prueba a" value={dest} onChange={setDest} placeholder="tucorreo@ejemplo.com" inputMode="email" />
        {dest.trim() && !emailOk && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: "#C0285A" }}>Correo inválido.</div>}
        <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 }}>Los correos se envían de forma segura desde el servidor de Medique. Si no llega, revisa la carpeta de spam.</p>
      </div>
    </AdModal>
  );
}

/* ─── Respaldo descargable + export .ics (alternativas reales sin OAuth de Google) ─── */
function jcmDownloadFile(name, content, mime) {
  try {
    var blob = new Blob([content], { type: mime || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a"); a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { try { document.body.removeChild(a); URL.revokeObjectURL(url); } catch (e) {} }, 600);
    return true;
  } catch (e) { return false; }
}
function jcmClinicName() { try { return (window.DB && DB.cfg().clinic_name) || "Medique"; } catch (e) { return "Medique"; } }
function jcmSlug(s) { return (s || "medique").toLowerCase().replace(/[^a-z0-9]/g, ""); }
// Arma el contenido del respaldo (fichas/pacientes/citas) sin descargar ni enviar.
function jcmBackupData() {
  var patients = [], appts = [];
  // Respaldo con el historial COMPLETO: rehidrata phist_<id> en cada paciente.
  try { patients = (window.jcmLoadPatientsFull ? window.jcmLoadPatientsFull() : ((window.DB && DB.get("patients")) || [])) || []; } catch (e) {}
  try { appts = (window.DB && DB.get("appointments")) || []; } catch (e) {}
  var clinica = jcmClinicName(), now = new Date();
  var fecha = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
  var data = { clinica: clinica, generado: now.toISOString(), total_pacientes: patients.length, total_citas: appts.length, pacientes: patients, citas: appts };
  return { clinica: clinica, fecha: fecha, nPac: patients.length, nCitas: appts.length, json: JSON.stringify(data, null, 2) };
}
// Respaldo de todas las fichas/pacientes/citas en un JSON descargable.
function jcmBackupFichas() {
  var b = jcmBackupData();
  var ok = jcmDownloadFile("respaldo-" + jcmSlug(b.clinica) + "-" + b.fecha + ".json", b.json, "application/json");
  try { window.jcmToast && window.jcmToast(ok ? ("Respaldo descargado · " + b.nPac + " paciente(s).") : "No se pudo generar el respaldo.", ok ? "ok" : "error"); } catch (e) {}
}
// Envía el respaldo como ADJUNTO al correo de la clínica (clinicReplyTo). Lo usa el botón
// "Enviar a mi correo" y el motor semanal automático. opts.silent → sin toasts (modo automático).
function jcmEmailBackup(opts) {
  opts = opts || {};
  var toast = function (m, k) { if (!opts.silent) { try { (k === "error" ? (window.jcmError || window.jcmToast) : window.jcmToast)(m, k); } catch (e) {} } };
  if (!window.mediqueEmail) { toast("El correo no está disponible.", "error"); return Promise.resolve({ ok: false }); }
  var to = (window.clinicReplyTo && window.clinicReplyTo()) || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) { toast("Agrega un correo en Configuración → Datos de la clínica para recibir el respaldo.", "info"); return Promise.resolve({ ok: false, error: "sin correo" }); }
  var b = jcmBackupData();
  if (!b.nPac && !b.nCitas) { toast("Todavía no hay fichas ni citas para respaldar.", "info"); return Promise.resolve({ ok: false, error: "vacío" }); }
  var b64; try { b64 = btoa(unescape(encodeURIComponent(b.json))); } catch (e) { toast("No se pudo preparar el respaldo.", "error"); return Promise.resolve({ ok: false, error: "encode" }); }
  if (b64.length > 7400000) { toast("El respaldo es muy grande para enviarlo por correo; usa “Descargar respaldo”.", "info"); return Promise.resolve({ ok: false, error: "grande" }); }
  var fname = "respaldo-" + jcmSlug(b.clinica) + "-" + b.fecha + ".json";
  var text = "Adjuntamos el respaldo de " + b.clinica + " (" + b.nPac + " paciente(s) · " + b.nCitas + " cita(s)) generado el " + b.fecha + ".\n\nGuárdalo en un lugar seguro (por ejemplo, súbelo a tu Google Drive). Este respaldo se envía automáticamente cada semana.\n\n— Medique";
  toast("Enviando respaldo a tu correo…", "info");
  return window.mediqueEmail({ to: to, subject: "Respaldo de tus fichas · " + b.clinica, text: text, attachments: [{ filename: fname, content: b64 }] }).then(function (r) {
    if (r && r.ok) toast("Respaldo enviado a " + to + ". Revisa tu bandeja (y spam).", "ok");
    else if (r && r.configured === false) toast("Correo no configurado en el servidor (falta RESEND_API_KEY).", "error");
    else toast("No se pudo enviar el respaldo: " + ((r && r.error) || ""), "error");
    return r;
  });
}
if (typeof window !== "undefined") { window.jcmEmailBackup = jcmEmailBackup; window.jcmBackupData = jcmBackupData; }
// Exporta las citas futuras a un archivo .ics (se importa en Google Calendar, Apple Calendar, Outlook).
function jcmExportICS() {
  var appts = [];
  try { appts = (window.DB && DB.get("appointments")) || []; } catch (e) {}
  var clinica = jcmClinicName();
  var pad = function (n) { return ("0" + n).slice(-2); };
  var esc = function (s) { return ("" + (s == null ? "" : s)).replace(/([\\;,])/g, "\\$1").replace(/\n/g, "\\n"); };
  var fmt = function (fecha, time) { var t = (time || "09:00").split(":"); return (fecha || "").replace(/-/g, "") + "T" + pad(parseInt(t[0] || 9, 10)) + pad(parseInt(t[1] || 0, 10)) + "00"; };
  var fmtEnd = function (fecha, time, min) { try { var d = new Date(fecha + "T" + (time || "09:00") + ":00"); d.setMinutes(d.getMinutes() + (min || 30)); return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00"; } catch (e) { return fmt(fecha, time); } };
  var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  var fut = appts.filter(function (a) { return a.fecha && new Date(a.fecha + "T00:00:00") >= hoy; });
  var stamp = new Date().getFullYear() + pad(new Date().getMonth() + 1) + pad(new Date().getDate()) + "T000000";
  var ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Medique//Agenda//ES\r\nCALSCALE:GREGORIAN\r\n";
  fut.forEach(function (a, i) {
    var dur = parseInt(a.dur, 10) || a.durMin || 30;
    ics += "BEGIN:VEVENT\r\nUID:" + (a.id || ("apt" + i)) + "@medique.cl\r\nDTSTAMP:" + stamp + "\r\nDTSTART:" + fmt(a.fecha, a.time) + "\r\nDTEND:" + fmtEnd(a.fecha, a.time, dur) +
      "\r\nSUMMARY:" + esc((a.proc || "Cita") + (a.name ? " · " + a.name : "")) + "\r\nDESCRIPTION:" + esc("Cita en " + clinica + (a.phone ? " · " + a.phone : "")) + "\r\nEND:VEVENT\r\n";
  });
  ics += "END:VCALENDAR\r\n";
  var ok = jcmDownloadFile("agenda-" + jcmSlug(clinica) + ".ics", ics, "text/calendar;charset=utf-8");
  try { window.jcmToast && window.jcmToast(ok ? (fut.length + " cita(s) exportada(s). Impórtalo en Google Calendar.") : "No hay citas o no se pudo exportar.", ok && fut.length ? "ok" : "info"); } catch (e) {}
}

// Reserva online: trae las reservas del link público a la agenda AHORA (además del import
// automático al abrir el panel). Es la acción REAL de la integración (no un toggle cosmético).
function jcmImportReservas() {
  var S = window.JCSAAS;
  if (!(S && S.enabled && S.importWebBookings)) {
    try { window.jcmToast && window.jcmToast("Las reservas online se activan con tu clínica en la nube.", "info"); } catch (e) {}
    return;
  }
  try { window.jcmToast && window.jcmToast("Buscando reservas nuevas…", "info"); } catch (e) {}
  S.importWebBookings().then(function (n) {
    if (n > 0) {
      try { window.jcmToast && window.jcmToast(n + " reserva(s) nueva(s) importada(s) a tu agenda.", "ok"); } catch (e) {}
      try { window.dispatchEvent(new Event("jcm:appts")); } catch (e) {} // refresca la agenda sin recargar
    } else {
      try { window.jcmToast && window.jcmToast("No hay reservas nuevas. Ya están todas en tu agenda.", "info"); } catch (e) {}
    }
  }).catch(function () { try { (window.jcmError || window.jcmToast)("No se pudieron traer las reservas.", "error"); } catch (e) {} });
}
if (typeof window !== "undefined") window.jcmImportReservas = jcmImportReservas;

// Agente IA (Groq): prueba REAL de conexión. Le pregunta a /api/ai (Groq) y confirma que responde.
// La IA ya potencia el Copiloto y los resúmenes del panel; responder por WhatsApp es aparte (Meta).
function jcmTestIA() {
  if (!window.mediqueAI) { try { window.jcmToast && window.jcmToast("La IA no está disponible.", "error"); } catch (e) {} return; }
  var clinic = (function () { try { return { name: DB.cfg().clinic_name || "" }; } catch (e) { return {}; } })();
  try { window.jcmToast && window.jcmToast("Probando la IA…", "info"); } catch (e) {}
  window.mediqueAI([{ role: "user", content: "Responde solo con: OK, asistente activo." }], clinic, { max_tokens: 30 }).then(function (r) {
    if (r && r.ok) { try { window.jcmToast && window.jcmToast("✓ La IA está activa y respondió correctamente.", "ok"); } catch (e) {} }
    else if (r && r.configured === false) { try { (window.jcmError || window.jcmToast)("La IA no está configurada en el servidor (falta GROQ_API_KEY).", "error"); } catch (e) {} }
    else { try { (window.jcmError || window.jcmToast)("La IA no respondió: " + ((r && r.error) || "sin respuesta"), "error"); } catch (e) {} }
  }).catch(function () { try { (window.jcmError || window.jcmToast)("No se pudo contactar la IA.", "error"); } catch (e) {} });
}
if (typeof window !== "undefined") window.jcmTestIA = jcmTestIA;

// Guía paso a paso para ACTIVAR WhatsApp Cloud API (la hace el dueño en Meta). Reutilizada por
// el card de Integraciones y la pantalla Agente IA. Resume WHATSAPP-SETUP.md con links directos.
function WhatsAppSetupModal({ T, onClose }) {
  const linkS = { color: T.accent, fontSize: 11.5, textDecoration: "underline" };
  const stepBox = { background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" };
  const stepNum = { fontFamily: T.sans, fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: T.accent, marginBottom: 5 };
  const stepTxt = { fontFamily: T.sans, fontSize: 12, color: T.text, lineHeight: 1.6 };
  return (
    <AdModal T={T} title="Activar WhatsApp · paso a paso" onClose={onClose} footer={<AdBtn T={T} primary full onClick={onClose}>Entendido</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 }}>El asistente ya está programado: recibe los mensajes, responde con IA y agenda la cita. Solo falta <b>encender el canal de WhatsApp en Meta</b> y pegar unos datos. Lo hace el <b>dueño de la cuenta</b>.</p>
        <div style={{ background: "rgba(214,158,46,.10)", border: "1px solid rgba(214,158,46,.4)", borderRadius: 8, padding: "9px 12px", fontFamily: T.sans, fontSize: 11.5, color: T.gold || "#b08400", lineHeight: 1.5 }}>⏳ Lo que más demora es la <b>verificación del negocio</b> en Meta (puede tardar días). Conviene empezar por ahí.</div>
        <div style={stepBox}><div style={stepNum}>PASO 1 · CREAR LA APP</div><div style={stepTxt}>En <b>developers.facebook.com → My Apps → Create App</b> (tipo Business), agrega el producto <b>WhatsApp</b>. Meta te da un número de prueba y un <b>Phone Number ID</b>.<br /><a href="https://developers.facebook.com/apps" target="_blank" rel="noopener" style={linkS}>Abrir Meta for Developers ↗</a></div></div>
        <div style={stepBox}><div style={stepNum}>PASO 2 · TOKEN PERMANENTE</div><div style={stepTxt}>En <b>Configuración del negocio → Usuarios del sistema</b>, crea un usuario Admin y <b>genera un token</b> con permisos <b>whatsapp_business_messaging</b> y <b>whatsapp_business_management</b>. Guarda ese token y el Phone Number ID.<br /><a href="https://business.facebook.com/settings/system-users" target="_blank" rel="noopener" style={linkS}>Abrir Usuarios del sistema ↗</a></div></div>
        <div style={stepBox}><div style={stepNum}>PASO 3 · CONECTAR EL WEBHOOK</div><div style={stepTxt}>En la app: <b>WhatsApp → Configuration → Webhook</b>. URL: <code>https://medique.cl/api/wa-webhook</code>. Inventa una palabra secreta como <b>Verify token</b> (ej. <code>medique-wa-2026</code>), pulsa <b>Verify and save</b> y suscríbete al campo <b>messages</b>.</div></div>
        <div style={stepBox}><div style={stepNum}>PASO 4 · DATOS EN VERCEL</div><div style={stepTxt}>En Vercel → Settings → Environment Variables (Production) pega <b>WHATSAPP_TOKEN</b>, <b>WHATSAPP_PHONE_ID</b> y <b>WHATSAPP_VERIFY_TOKEN</b> (la misma palabra secreta del paso 3). Luego haz <b>Redeploy</b>.</div></div>
        <div style={stepBox}><div style={stepNum}>PASO 5 · VERIFICAR EL NEGOCIO</div><div style={stepTxt}>Para responder a <b>cualquier</b> paciente (no solo números de prueba), Meta exige <b>verificar el negocio</b> en <b>Configuración del negocio → Seguridad</b>. Puede tardar días.<br /><a href="https://business.facebook.com/settings/security" target="_blank" rel="noopener" style={linkS}>Abrir Verificación del negocio ↗</a></div></div>
        <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 }}>💬 Costo: si el <b>paciente escribe primero</b> es gratis dentro de 24 h; si la clínica inicia (recordatorios) son centavos por mensaje. Apenas quede activo, las conversaciones aparecerán solas en esta bandeja.</p>
      </div>
    </AdModal>
  );
}
if (typeof window !== "undefined") window.WhatsAppSetupModal = WhatsAppSetupModal;

// Guía honesta para Meta Business Suite (bandeja IG/FB en el panel). Es un proyecto grande
// (OAuth + Webhooks + App Review de Meta). Aquí solo se explica qué requiere; el build es aparte.
function MetaBizGuideModal({ T, onClose }) {
  const stepBox = { background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" };
  const stepNum = { fontFamily: T.sans, fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: T.accent, marginBottom: 5 };
  const stepTxt = { fontFamily: T.sans, fontSize: 12, color: T.text, lineHeight: 1.6 };
  return (
    <AdModal T={T} title="Bandeja de Instagram y Facebook" onClose={onClose} footer={<AdBtn T={T} primary full onClick={onClose}>Entendido</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 }}>Ver y responder tus <b>DMs y comentarios de Instagram y Facebook</b> dentro del panel es una integración <b>grande</b> (parecida a WhatsApp): Meta exige conectar tu cuenta y <b>aprobar la app</b>, lo que tarda semanas. Por eso todavía no está activa.</p>
        <div style={{ background: "rgba(214,158,46,.10)", border: "1px solid rgba(214,158,46,.4)", borderRadius: 8, padding: "9px 12px", fontFamily: T.sans, fontSize: 11.5, color: T.gold || "#b08400", lineHeight: 1.5 }}>⏳ Lo que más demora es la <b>verificación del negocio + revisión de la app (App Review)</b> en Meta. Conviene arrancarlo cuanto antes.</div>
        <div style={stepBox}><div style={stepNum}>QUÉ REQUIERE</div><div style={stepTxt}>1) Conectar tu <b>Página de Facebook + Instagram Business</b> con login de Meta (OAuth). 2) Permisos avanzados de mensajería/comentarios. 3) <b>Verificación del negocio</b> y <b>App Review</b> de Meta.</div></div>
        <div style={stepBox}><div style={stepNum}>QUIÉN LO HACE</div><div style={stepTxt}>El <b>dueño de la cuenta</b> arranca la verificación y la revisión en Meta (lo lento); nosotros construimos la conexión, el webhook y la bandeja en el panel.</div></div>
        <div style={stepBox}><div style={stepNum}>BUENA NOTICIA</div><div style={stepTxt}>Es la <b>misma app de Meta</b> que necesita <b>WhatsApp</b>. Haciendo el setup una vez, sirve para las dos. <br /><a href="https://business.facebook.com/settings/security" target="_blank" rel="noopener" style={{ color: T.accent, fontSize: 11.5, textDecoration: "underline" }}>Abrir Verificación del negocio ↗</a></div></div>
        <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 }}>📄 El plan técnico completo (fases, endpoints, tiempos) está en <b>META-BUSINESS-SUITE-SETUP.md</b>.</p>
      </div>
    </AdModal>
  );
}
if (typeof window !== "undefined") window.MetaBizGuideModal = MetaBizGuideModal;

// Modal de SUSCRIPCIÓN a Google Calendar (reemplaza la descarga .ics): genera el link vivo
// que se actualiza solo. Es la versión buena (la misma de Configuración), acá en Integraciones.
function CalSubModal({ T, onClose }) {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!window.mediqueCalendarLink) { setBusy(false); setErr("No disponible en este momento."); return; }
    let alive = true;
    window.mediqueCalendarLink().then(r => {
      if (!alive) return; setBusy(false);
      if (r && r.ok && r.url) setUrl(r.url);
      else if (r && r.configured === false) setErr("Aún no está activo: falta la clave de servicio de Firebase en el servidor (pídeselo al administrador).");
      else setErr((r && r.error) || "No se pudo generar el link del calendario.");
    });
    return () => { alive = false; };
  }, []);
  function copy() { try { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) {} }
  return (
    <AdModal T={T} title="Google Calendar · que se actualiza solo" onClose={onClose} footer={<AdBtn T={T} primary full onClick={onClose}>Listo</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 }}>Suscribí este calendario <b>una sola vez</b> y tus reservas aparecen solas en tu Google Calendar (PC y celu) y se mantienen al día. <b>No hay que descargar nada.</b></p>
        {busy && <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute }}>Generando tu link…</div>}
        {!busy && err && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#e06a6a", lineHeight: 1.5 }}>{err}</div>}
        {!busy && url && (
          <div>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Tu link de suscripción</span>
            <div style={{ display: "flex", gap: 8 }}>
              <input readOnly value={url} onFocus={e => e.target.select()} style={{ flex: 1, fontFamily: T.sans, fontSize: 12.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2 || T.surface, color: T.text, outline: "none" }} />
              <button onClick={copy} style={{ flexShrink: 0, padding: "0 13px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 }}>{copied ? "✓" : "Copiar"}</button>
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 10, lineHeight: 1.6 }}>
              <b style={{ color: T.text }}>Cómo suscribirlo:</b> abrí <a href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl" target="_blank" rel="noopener" style={{ color: T.accent, textDecoration: "underline" }}>Google Calendar → Agregar desde URL ↗</a>, pegá el link de arriba y "Agregar calendario". En el celular aparece solo (sincroniza tu Google). Google lo revisa cada varias horas.
            </div>
          </div>
        )}
      </div>
    </AdModal>
  );
}

function IntegracionesView({ T }) {
  const [list, setList] = useState(() => {
    let saved = {};
    try { const s = window.DB && DB.get("integrations_state"); if (s) saved = s; } catch (e) {}
    return INTEGRATIONS_CATALOG.map(i => ({ ...i, connected: (i.id in saved) ? saved[i.id] : false }));
  });
  const [metaModal, setMetaModal] = useState(false);
  const [metaOn, setMetaOn] = useState(metaConnected());
  const [correoModal, setCorreoModal] = useState(false); // conexión REAL de correo (envío de prueba)
  const [previewInteg, setPreviewInteg] = useState(null); // integración a previsualizar antes de conectar
  const [waGuide, setWaGuide] = useState(false); // guía paso a paso para activar WhatsApp
  const [bizGuide, setBizGuide] = useState(false); // guía/requisitos de Meta Business Suite
  const [calModal, setCalModal] = useState(false); // suscripción a Google Calendar (se actualiza solo)
  function toggle(id) {
    const n = list.map(i => i.id === id ? { ...i, connected: !i.connected } : i);
    setList(n);
    try { if (window.DB) { const map = {}; n.forEach(i => { map[i.id] = i.connected; }); DB.set("integrations_state", map); } } catch (e) {}
  }
  function markConnected(id, val) {
    const n = list.map(i => i.id === id ? { ...i, connected: val } : i);
    setList(n);
    try { if (window.DB) { const map = {}; n.forEach(i => { map[i.id] = i.connected; }); DB.set("integrations_state", map); } } catch (e) {}
  }
  function handleConnectClick(it, connected) {
    if (it.id === "metaads") { setMetaModal(true); return; }
    // Correo: conexión REAL (envía un correo de prueba). Desconectar es directo.
    if (it.id === "gmail") { if (connected) toggle("gmail"); else setCorreoModal(true); return; }
    // Drive / Calendar: alternativas reales sin OAuth.
    // Drive → envía el respaldo al correo de la clínica (además del envío semanal automático).
    if (it.id === "drive") { window.jcmEmailBackup ? window.jcmEmailBackup({}) : jcmBackupFichas(); return; }
    if (it.id === "gcal") { setCalModal(true); return; }
    // Reserva online: acción REAL → importa las reservas del link público a la agenda ahora.
    if (it.id === "landing") { jcmImportReservas(); return; }
    // Agente IA: acción REAL → prueba que Groq responde (la IA del panel ya está activa).
    if (it.id === "groq") { jcmTestIA(); return; }
    // WhatsApp Business: abre la guía paso a paso de activación (Meta Cloud API), no un toggle falso.
    if (it.id === "wa") { setWaGuide(true); return; }
    // Meta Business Suite: abre los requisitos (build grande con App Review), no un toggle falso.
    if (it.id === "metabiz") { setBizGuide(true); return; }
    if (!connected) { setPreviewInteg(it); return; } // mostrar popup antes de conectar
    toggle(it.id); // desconectar directo sin popup
  }
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <SecHead T={T} title="Integraciones" sub="Conecta tus herramientas a Medique" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map((it, ii) => {
          const isMeta = it.id === "metaads";
          const connected = isMeta ? metaOn : it.connected;
          // Drive/Calendar son ACCIONES de descarga reales (no "conexión" OAuth).
          const action = it.id === "drive" ? { label: "Enviar a mi correo", desc: "Cada semana te llega solo a tu correo un respaldo (.json) de fichas y citas. ¿Lo quieres ahora? Envíalo." }
            : it.id === "gcal" ? { label: "Suscribir", desc: "Suscribe tus reservas a Google Calendar (se actualizan solas en PC y celu, sin descargar nada)." }
            : it.id === "landing" ? { label: "Importar reservas", desc: "Las reservas de tu link público entran solas a la agenda al abrir el panel. Tu link está en Configuración. ¿Traer las nuevas ahora?" }
            : it.id === "groq" ? { label: "Probar IA", desc: "La IA ya potencia el Copiloto y los resúmenes del panel. Responder a pacientes por WhatsApp se activa al conectar WhatsApp. Probar que la IA responde:" }
            : it.id === "wa" ? { label: "Ver pasos", desc: "Pendiente de activar. El asistente responde a tus pacientes por WhatsApp una vez que se enciende WhatsApp Cloud API en Meta. Mira los pasos:" }
            : it.id === "metabiz" ? { label: "Ver requisitos", desc: "Pendiente. Ver tus DMs y comentarios de IG/FB en el panel requiere conexión y revisión de Meta (proyecto grande). Mira qué hace falta:" } : null;
          return (
          <div key={it.id} style={luxF ? { display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", ...DS.card(T), borderColor: connected ? T.line : T.lineSoft, ...DS.reveal(ii) } : { display: "flex", alignItems: "center", gap: 13, padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + (connected ? T.line : T.lineSoft) }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: it.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, fontWeight: 500, flexShrink: 0 }}>{it.letter}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{it.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{action ? action.desc : (isMeta ? (connected ? "✓ Conectada · leyendo tu gasto real" : "Conecta tu cuenta para ver gasto y ROAS reales") : (connected ? "✓ " + it.stat : it.desc))}</div>
            </div>
            <button onClick={() => handleConnectClick(it, connected)} style={{
              fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", padding: "9px 14px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap",
              background: (action || !connected) ? T.accent : "transparent", color: (action || !connected) ? (T.onAccent || "#fff") : "#1F8A5B", border: (action || !connected) ? "none" : "1px solid #1F8A5B"
            }}>{action ? action.label : (connected ? (isMeta ? "Administrar" : "Conectado ✓") : "Conectar")}</button>
          </div>
          );
        })}
      </div>
      <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 14, lineHeight: 1.6 }}>Cada herramienta se conecta con el inicio de sesión oficial (OAuth) de la plataforma. Conecta solo las que uses en tu clínica.</p>
      {metaModal && <MetaConnectModal T={T} onClose={() => setMetaModal(false)} onSaved={() => { setMetaOn(metaConnected()); setMetaModal(false); }} />}
      {correoModal && <CorreoConnectModal T={T} onClose={() => setCorreoModal(false)} onConnected={() => { markConnected("gmail", true); setCorreoModal(false); }} />}
      {waGuide && <WhatsAppSetupModal T={T} onClose={() => setWaGuide(false)} />}
      {bizGuide && <MetaBizGuideModal T={T} onClose={() => setBizGuide(false)} />}
      {calModal && <CalSubModal T={T} onClose={() => setCalModal(false)} />}
      {previewInteg && (
        <AdModal T={T} title={"Conectar " + previewInteg.name} onClose={() => setPreviewInteg(null)}
          footer={<div style={{ display: "flex", gap: 10, width: "100%" }}>
            <AdBtn T={T} full onClick={() => setPreviewInteg(null)}>Cancelar</AdBtn>
            <AdBtn T={T} primary full onClick={() => { toggle(previewInteg.id); setPreviewInteg(null); try { window.jcmToast && window.jcmToast(previewInteg.name + " conectado.", "ok"); } catch(e){} }}>Confirmar conexión</AdBtn>
          </div>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: previewInteg.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 20, fontWeight: 500, flexShrink: 0 }}>{previewInteg.letter}</div>
              <div>
                <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text }}>{previewInteg.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{previewInteg.desc}</div>
              </div>
            </div>
            <div style={{ background: T.surface2, borderRadius: 8, padding: "14px", fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.65 }}>{previewInteg.info}</div>
          </div>
        </AdModal>
      )}
    </div>
  );
}

/* ─────────── REPORTES ─────────── */
function ReportesView({ T, patients, appts }) {
  const D = window.JCDATA;
  const [period, setPeriod] = useState("anio");
  // Refresco en TIEMPO REAL: se vuelve a leer la caja al volver a la pestaña, al cambiar
  // el almacenamiento y cada vez que se registra un movimiento (evento "jcm:cash").
  const [, force] = useState(0);
  useEffect(() => {
    const tick = () => force(x => x + 1);
    window.addEventListener("focus", tick);
    window.addEventListener("jcm:cash", tick);
    window.addEventListener("storage", tick);
    const id = setInterval(tick, 4000);
    return () => { window.removeEventListener("focus", tick); window.removeEventListener("jcm:cash", tick); window.removeEventListener("storage", tick); clearInterval(id); };
  }, []);
  // ── Reportes con datos REALES de la clínica (caja, pacientes, citas). Sin demo: 0 hasta que haya movimientos. ──
  const moves = (() => { try { return (window.DB && window.DB.get("cash_moves")) || []; } catch (e) { return []; } })();
  const now = new Date();
  // Filtrar ingresos según el período elegido
  const periodStart = (() => {
    if (period === "sem") { const d = new Date(now); d.setDate(now.getDate() - now.getDay()); d.setHours(0,0,0,0); return d.toISOString().slice(0,10); }
    if (period === "mes") return now.getFullYear() + "-" + ("0"+(now.getMonth()+1)).slice(-2) + "-01";
    return now.getFullYear() + "-01-01";
  })();
  const ingresos = moves.filter(m => m.type === "ingreso" && (period === "anio" || (m.ts || "") >= periodStart));
  const MES_ABBR = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  // Últimos 6 meses (incluido el actual), ingresos en MM CLP — siempre se muestra el gráfico de los 6 meses.
  const rev = [];
  for (let k = 5; k >= 0; k--) {
    const d = new Date(now.getFullYear(), now.getMonth() - k, 1);
    const key = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2);
    const sum = moves.filter(m => m.type === "ingreso" && (m.ts || "").slice(0, 7) === key).reduce((s, m) => s + (m.amount || 0), 0);
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
  const t0 = (typeof _localDay === "function") ? _localDay() : new Date().toISOString().slice(0, 10);
  const _dayOf = ts => (typeof _localDay === "function") ? _localDay(ts) : (ts || "").slice(0, 10);
  // Ingresos de HOY y del MES en curso (en tiempo real con la caja; independientes del filtro de período).
  const cashToday2 = moves.filter(m => m.type === "ingreso" && _dayOf(m.ts) === t0).reduce((s, m) => s + (m.amount || 0), 0);
  const m0 = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2);
  const cashMonth = moves.filter(m => m.type === "ingreso" && _dayOf(m.ts).slice(0, 7) === m0).reduce((s, m) => s + (m.amount || 0), 0);
  const MES_NOMBRE = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][now.getMonth()];
  // No-show real (citas marcadas no asistió / total con estado).
  const conEstado = (appts || []).filter(a => a.status);
  const noShow = conEstado.length ? Math.round(conEstado.filter(a => a.status === "no_show" || a.status === "ausente").length / conEstado.length * 100) : 0;
  const green = "#1F8A5B";
  // Gráfico de área con curva suave (mismo estilo que el dashboard).
  function RevChart() {
    // Gráfico más compacto (P24): así la información de abajo se ve sin tanto scroll.
    const W = 720, H = 150, padL = 8, padR = 8, padT = 12, padB = 24;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const maxY = (Math.max.apply(null, serie) || 1) * 1.18, n = serie.length; // evita 0/0 cuando no hay ingresos
    const X = i => padL + i * innerW / (n - 1);
    const Y = v => padT + (1 - (v || 0) / maxY) * innerH;
    const line = "M " + serie.map((v, i) => X(i).toFixed(1) + " " + Y(v).toFixed(1)).join(" L ");
    const area = line + " L " + X(n - 1).toFixed(1) + " " + (padT + innerH) + " L " + padL + " " + (padT + innerH) + " Z";
    const grid = [0, 1, 2, 3].map(g => padT + g * innerH / 3);
    return (
      <svg viewBox={"0 0 " + W + " " + H} style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="xMidYMid meet">
        <defs><linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.accent} stopOpacity="0.22" /><stop offset="100%" stopColor={T.accent} stopOpacity="0" /></linearGradient></defs>
        {grid.map((y, i) => <line key={i} x1={padL} y1={y} x2={padL + innerW} y2={y} stroke={T.line} strokeWidth="1" />)}
        <g style={(window.JCDS && (typeof jcdsLux === "function" && jcdsLux())) ? window.JCDS.drawIn(1100) : undefined}>
          <path d={area} fill="url(#repGrad)" />
          <path d={line} fill="none" stroke={T.accent} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
          {serie.map((v, i) => <circle key={i} cx={X(i)} cy={Y(v)} r="3.6" fill={T.surface} stroke={T.accent} strokeWidth="2" />)}
        </g>
        {rev.map((r, i) => <text key={r.m} x={X(i)} y={H - 7} textAnchor="middle" fontSize="11" fontFamily={T.sans} fill={T.textMute}>{r.m}</text>)}
      </svg>
    );
  }
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const repCard = luxF ? { ...DS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "16px 18px", boxShadow: T.shadow ? "0 10px 30px -18px rgba(0,0,0,.25)" : "none" };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Reportes y estadísticas" sub="Análisis detallado del rendimiento de tu clínica." />
        <select value={period} onChange={e => setPeriod(e.target.value)} style={luxF ? { ...DS.ctl(T) } : { fontFamily: T.sans, fontSize: 12, padding: "8px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none" }}>
          <option value="anio">Este año</option><option value="mes">Este mes</option><option value="sem">Esta semana</option>
        </select>
      </div>
      {/* Evolución de ingresos — tarjeta moderna con curva de área */}
      <div style={{ ...repCard, marginBottom: 14 }}>
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
      {/* Ingresos en tiempo real con la caja: HOY y MES en curso */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div style={repCard}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute }}>Ingresos hoy</span>
            <span style={{ fontFamily: T.sans, fontSize: 9.5, color: green, display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: green }} />en vivo</span>
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginTop: 6 }}>{D.fmt(cashToday2)}</div>
        </div>
        <div style={repCard}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute }}>Ingresos del mes</span>
            <span style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute, textTransform: "capitalize" }}>{MES_NOMBRE}</span>
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginTop: 6 }}>{D.fmt(cashMonth)}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
        <AdStat T={T} n={D.fmt(ticketProm)} l="Ticket promedio" />
        <AdStat T={T} n={(patients || []).length} l="Pacientes" />
        <AdStat T={T} n={noShow + "%"} l="No-show rate" />
        <AdStat T={T} n={D.fmt(cashToday2)} l="Ingresos hoy" />
      </div>
      <div style={repCard}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg></div>
          <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>Servicios más populares</div>
        </div>
        {pop.length === 0 && <Empty2 T={T}>Aún sin citas registradas. El ranking aparecerá cuando agendes procedimientos.</Empty2>}
        {pop.map(([n, p], pi) => (
          <div key={n} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 12.5, color: T.text, marginBottom: 5 }}><span>{n}</span><span style={{ color: T.accent, fontWeight: 600 }}>{Math.round(p * 100)}%</span></div>
            <div style={{ height: 7, background: T.surface2, borderRadius: 999, overflow: "hidden" }}><div style={{ height: "100%", width: (p * 100) + "%", background: "linear-gradient(90deg," + T.accent + "," + T.accentDeep + ")", borderRadius: 999, ...(luxF ? DS.barGrow(pi, "x") : {}) }} /></div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, marginBottom: 22 }}><AdBtn T={T} full onClick={() => { const csv = "Mes,Ingresos(MM CLP)\n" + rev.map(r => r.m + "," + r.v).join("\n"); const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv); a.download = "reporte-ingresos.csv"; a.click(); }}>Exportar CSV</AdBtn></div>
      {/* Reportes IA fusionado aquí (antes era una sección de nav aparte). */}
      <div style={repCard}>
        <ReportesIAView T={T} patients={patients} appts={appts} embedded />
      </div>
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
/* ─────────── FIRMAS DE MÉDICOS ─────────── */
function FirmasMedicasEditor({ T }) {
  const SignPad = window.SignaturePad;
  const [sigs, setSigs] = useState(function() {
    try { return window.DB.get("medic_sigs") || []; } catch (e) { return []; }
  });
  const [adding, setAdding] = useState(false);
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [registro, setRegistro] = useState("");
  const [sig, setSig] = useState(null);
  const [saved, setSaved] = useState(false);

  function guardar() {
    if (!nombre.trim() || !sig) return;
    var ns = sigs.concat([{ id: "ms" + Date.now(), name: nombre.trim(), rut: rut.trim(), registro: registro.trim(), sig: sig }]);
    setSigs(ns);
    try { window.DB.set("medic_sigs", ns); } catch (e) {}
    setSaved(true); setTimeout(function() { setSaved(false); }, 2000);
    setAdding(false); setNombre(""); setRut(""); setRegistro(""); setSig(null);
  }

  async function eliminar(id, name) {
    if (!(await (window.jcmConfirm || window.confirm)("¿Eliminar la firma de " + name + "?", { danger: true }))) return;
    var ns = sigs.filter(function(s) { return s.id !== id; });
    setSigs(ns);
    try { window.DB.set("medic_sigs", ns); } catch (e) {}
  }

  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const inp = luxF ? { ...DS.ctl(T), width: "100%", height: DS.h.ctl + 4 } : { width: "100%", fontFamily: T.sans, fontSize: 13.5, padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, outline: "none", boxSizing: "border-box" };

  return (
    <div style={luxF ? { ...DS.card(T), padding: "18px 20px", marginBottom: 14 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 }}>
      <div style={luxF ? { ...DS.text(T, "eyebrow"), marginBottom: 8 } : { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 8 }}>Firmas de médicos</div>
      <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 12, lineHeight: 1.5 }}>
        Las firmas aquí configuradas se insertan automáticamente en las recetas e indicaciones al imprimir, y aparecen como <em>Médico responsable</em> en los consentimientos firmados.
      </div>

      {sigs.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
          {sigs.map(function(s) {
            return (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", borderRadius: 8, background: T.surface2, border: "1px solid " + T.line }}>
                {s.sig
                  ? <img src={s.sig} alt="firma" style={{ height: 38, width: "auto", maxWidth: 100, objectFit: "contain", background: "#fff", borderRadius: 4, padding: "3px 6px", border: "1px solid " + T.line, flexShrink: 0 }} />
                  : <div style={{ width: 80, height: 38, background: T.surface, borderRadius: 4, border: "1px solid " + T.line, flexShrink: 0 }} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{s.name}</div>
                  {(s.rut || s.registro) && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{[s.rut && "RUT " + s.rut, s.registro && "Reg. " + s.registro].filter(Boolean).join(" · ")}</div>}
                </div>
                <button onClick={function() { eliminar(s.id, s.name); }} title="Eliminar firma" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 6, display: "flex" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4h6v2"/></svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {adding ? (
        <div style={{ border: "1px solid " + T.line, borderRadius: 8, padding: "14px 14px", background: T.surface2 }}>
          <label style={{ display: "block", marginBottom: 12 }}>
            <span style={lbl}>Nombre del médico</span>
            <input style={inp} value={nombre} onChange={function(e) { setNombre(e.target.value); }} placeholder="Dr. Juan Pérez" autoFocus />
          </label>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <label style={{ flex: 1 }}>
              <span style={lbl}>RUT</span>
              <input style={inp} value={rut} onChange={function(e) { setRut(e.target.value); }} placeholder="12.345.678-9" />
            </label>
            <label style={{ flex: 1 }}>
              <span style={lbl}>N° Registro MINSAL / SIS</span>
              <input style={inp} value={registro} onChange={function(e) { setRegistro(e.target.value); }} placeholder="12345" />
            </label>
          </div>
          <span style={lbl}>Firma digital</span>
          {SignPad ? <SignPad T={T} onChange={setSig} height={150} /> : <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Componente de firma no disponible.</div>}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button onClick={function() { setAdding(false); setNombre(""); setRut(""); setRegistro(""); setSig(null); }}
              style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "12px 18px", borderRadius: 6, border: "1px solid " + T.line, background: "none", color: T.textMute, cursor: "pointer" }}>
              Cancelar
            </button>
            <button onClick={guardar} disabled={!nombre.trim() || !sig}
              style={{ flex: 1, fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "12px 18px", borderRadius: 6, border: "none", background: nombre.trim() && sig ? T.accent : T.surface, color: nombre.trim() && sig ? (T.onAccent || "#fff") : T.textFaint, cursor: nombre.trim() && sig ? "pointer" : "default" }}>
              Guardar firma
            </button>
          </div>
        </div>
      ) : (
        <button onClick={function() { setAdding(true); }}
          style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "11px 16px", borderRadius: 6, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          Agregar firma
          {saved && <span style={{ color: "#4caf73", fontWeight: 600, marginLeft: 4 }}>✓ guardada</span>}
        </button>
      )}
    </div>
  );
}

// Diagnósticos sugeridos (desplegable en Receta / Indicaciones).
const DIAG_OPTS = ["Neuromodulación con Toxina botulínica", "Bioestimulación de colágeno", "Armonización facial"];
function IndTemplatesEditor({ T }) {
  // Cada plantilla tiene dueño (owner = correo del profesional que la creó). El profesional
  // edita SOLO las suyas desde su cuenta; el admin/dueño VE todas pero solo edita las suyas
  // (las de otros profesionales quedan de solo lectura). Las heredadas sin dueño las
  // administra el dueño de la clínica.
  const SA = window.JCSAAS;
  const me = (SA && SA.userEmail && SA.userEmail()) || "";
  const myName = (SA && SA.currentUserName && SA.currentUserName()) || "";
  const isProf = !!(SA && SA.currentRole && SA.currentRole() === "professional");
  const isAdmin = !isProf; // dueño / administrador de la clínica
  const [tpls, setTpls] = useState(getIndTemplates);
  const [saved, setSaved] = useState(false);
  function save(n) { setTpls(n); try { DB.set("config", Object.assign({}, DB.cfg(), { ind_templates: n })); setSaved(true); setTimeout(() => setSaved(false), 1800); } catch (e) {} }
  function updId(id, patch) { save(tpls.map(t => t.id === id ? { ...t, ...patch } : t)); }
  function add() { save([...tpls, { id: "tpl_" + Date.now(), name: "Nueva plantilla", body: "", owner: me, ownerName: myName || (isAdmin ? "Clínica" : "") }]); }
  async function delId(id) { const t = tpls.find(x => x.id === id); if (await (window.jcmConfirm || window.confirm)(`¿Eliminar la plantilla "${t && t.name}"?`, { danger: true })) save(tpls.filter(x => x.id !== id)); }
  // Puedo editar: si tiene dueño, solo si soy ese dueño; si es heredada (sin dueño), solo el admin.
  const canEdit = (t) => t.owner ? (!!me && t.owner === me) : isAdmin;
  // Qué veo: el admin ve todas; el profesional ve las suyas + las heredadas (referencia).
  const visible = isAdmin ? tpls : tpls.filter(t => (t.owner === me) || !t.owner);
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const inp = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" };
  const inpRO = { ...inp, background: T.surface2, color: T.textMute, cursor: "default" };
  return (
    <div style={luxF ? { ...DS.card(T), padding: "18px 20px", marginBottom: 14 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
      <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6"><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></svg>
        Indicaciones post tratamiento
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "5px 0 4px" }}>Plantillas que podrás seleccionar al registrar indicaciones, sin tipear a mano. {saved && <span style={{ color: "#1F8A5B" }}>✓ Guardado</span>}</div>
      <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 14, lineHeight: 1.5 }}>{isAdmin ? "Ves las plantillas de todo el equipo. Cada profesional edita solo las suyas desde su cuenta; las de otros aparecen de solo lectura." : "Estas son tus plantillas. Solo tú puedes editarlas desde tu cuenta."}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {visible.map(t => {
          const editable = canEdit(t);
          return (
            <div key={t.id} style={{ border: "1px solid " + (editable ? T.line : T.lineSoft), borderRadius: 10, padding: "12px 13px", background: editable ? "transparent" : T.surface2 + "80" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <input value={t.name} readOnly={!editable} onChange={editable ? (e => updId(t.id, { name: e.target.value })) : undefined} style={{ ...(editable ? inp : inpRO), fontWeight: 600 }} placeholder="Nombre de la plantilla" />
                {editable
                  ? <button onClick={() => delId(t.id)} title="Eliminar" style={{ flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
                  : <span title="Solo el profesional creador puede editarla" style={{ flexShrink: 0, display: "flex", alignItems: "center", color: T.textFaint, padding: "8px 6px" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></span>}
              </div>
              <textarea value={t.body} readOnly={!editable} onChange={editable ? (e => updId(t.id, { body: e.target.value })) : undefined} rows={5} placeholder="Indicaciones / cuidados…" style={{ ...(editable ? inp : inpRO), resize: "vertical", lineHeight: 1.5 }} />
              {t.owner && t.owner !== me && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 }}>Creada por {t.ownerName || "otro profesional"} · solo lectura</div>}
            </div>
          );
        })}
        {visible.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint, padding: "8px 2px" }}>Aún no tienes plantillas. Crea la primera con el botón de abajo.</div>}
      </div>
      <div style={{ marginTop: 12 }}><AdBtn T={T} onClick={add}>+ Añadir plantilla</AdBtn></div>
    </div>
  );
}

/* ─────────── CONFIGURACIÓN ─────────── */
const CFG_TABS = [["datos", "Datos de la clínica"], ["reserva", "Reserva y enlaces"], ["horarios", "Horarios"], ["plantillas", "Plantillas y firmas"]];
function ConfigView({ T }) {
  const D = window.JCDATA;
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const [cfgTab, setCfgTab] = useState(() => { try { var t = window.jcmConfigTab; if (t) { window.jcmConfigTab = null; return t; } } catch (e) {} return "datos"; });
  // Link de RESERVA DIRECTA, propio de cada clínica (no la app de pacientes).
  const bookUrl = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.bookingLink)
    ? window.JCSAAS.bookingLink()
    : ((typeof window !== "undefined" ? (window.jcmPubBase ? window.jcmPubBase() : window.location.origin) : "") + "/reservar");
  // Panel móvil del equipo: mismo dominio del admin (donde ya hay sesión y App Check).
  const mobileUrl = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.mobileLink)
    ? window.JCSAAS.mobileLink()
    : ((typeof window !== "undefined" ? window.location.origin : "") + "/movil");
  const qr = "https://api.qrserver.com/v1/create-qr-code/?size=170x170&margin=0&data=" + encodeURIComponent(bookUrl);
  const [copied, setCopied] = useState(false);
  const [copiedMob, setCopiedMob] = useState(false);
  function copyLink() { try { navigator.clipboard.writeText(bookUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) {} }
  function copyMobile() { try { navigator.clipboard.writeText(mobileUrl); setCopiedMob(true); setTimeout(() => setCopiedMob(false), 1800); } catch (e) {} }
  // Calendario suscribible: las citas aparecen solas en Google/Apple Calendar (no descargar .ics).
  const [calUrl, setCalUrl] = useState("");
  const [calBusy, setCalBusy] = useState(false);
  const [calErr, setCalErr] = useState("");
  const [calCopied, setCalCopied] = useState(false);
  function genCal() {
    if (!window.mediqueCalendarLink) { setCalErr("No disponible en este momento."); return; }
    setCalBusy(true); setCalErr("");
    window.mediqueCalendarLink().then(r => {
      setCalBusy(false);
      if (r && r.ok && r.url) setCalUrl(r.url);
      else if (r && r.configured === false) setCalErr("Aún no está activo: falta que el administrador agregue la clave de servicio de Firebase en el servidor.");
      else setCalErr((r && r.error) || "No se pudo generar el link del calendario.");
    });
  }
  function copyCal() { try { navigator.clipboard.writeText(calUrl); setCalCopied(true); setTimeout(() => setCalCopied(false), 1800); } catch (e) {} }
  return (
    <div>
      <SecHead T={T} title="Configuración de la clínica" sub="Administra la información pública y los detalles de tu clínica." />
      <div className="jc-scroll" style={luxF
        ? { display: "inline-flex", gap: 2, flexWrap: "wrap", background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: DS.r.seg, padding: 3, marginBottom: 18 }
        : { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {CFG_TABS.map(([k, l]) => <button key={k} onClick={() => setCfgTab(k)} style={luxF
          ? { fontFamily: T.sans, fontSize: DS.ft.sub, fontWeight: cfgTab === k ? 600 : 500, padding: "8px 14px", borderRadius: DS.r.ctl, cursor: "pointer", border: "none", background: cfgTab === k ? T.surface : "transparent", boxShadow: cfgTab === k ? "0 1px 2px rgba(0,0,0,.06)" : "none", color: cfgTab === k ? T.accent : T.textMute, whiteSpace: "nowrap", transition: DS.trans("background,box-shadow,color") }
          : { fontFamily: T.sans, fontSize: 12, fontWeight: cfgTab === k ? 600 : 500, padding: "8px 15px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (cfgTab === k ? T.accent : T.line), background: cfgTab === k ? T.accent : "transparent", color: cfgTab === k ? (T.onAccent || "#fff") : T.textMute, whiteSpace: "nowrap" }}>{l}</button>)}
      </div>
      {cfgTab === "reserva" && <>
      {/* Panel móvil del equipo — ARRIBA (P32): confirmar y crear citas desde el teléfono */}
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px", marginBottom: 14 }}>
        <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg>
          Panel móvil del equipo
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "5px 0 14px" }}>Página móvil para que tú o tu equipo <b style={{ color: T.text }}>confirmen y creen citas directas</b> desde el teléfono. Inicia sesión con tu cuenta del panel.</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input readOnly value={mobileUrl} onFocus={e => e.target.select()} style={{ flex: 1, minWidth: 220, fontFamily: T.sans, fontSize: 12.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, outline: "none" }} />
          <button onClick={copyMobile} title="Copiar" style={{ flexShrink: 0, padding: "0 13px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 }}>{copiedMob ? "✓" : "Copiar"}</button>
          <a href={mobileUrl} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, color: T.text, textDecoration: "none", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "9px 13px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>Abrir</a>
        </div>
      </div>
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
      {/* Calendario que se actualiza solo — suscripción por URL (no descargar .ics) */}
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px", marginBottom: 14 }}>
        <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4M9 16l2 2 4-4" /></svg>
          Calendario que se actualiza solo
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "5px 0 14px", lineHeight: 1.5 }}>Suscribe este calendario UNA vez en Google Calendar (o Apple/Outlook) y tus reservas aparecen solas en tu teléfono y PC, sin descargar nada. Google lo revisa cada varias horas (no es instantáneo).</div>
        {!calUrl ? (
          <div>
            <AdBtn T={T} primary onClick={genCal}>{calBusy ? "Generando…" : "Generar mi link de calendario"}</AdBtn>
            {calErr && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: "#e06a6a", marginTop: 10, lineHeight: 1.5 }}>{calErr}</div>}
          </div>
        ) : (
          <div>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Tu link de suscripción</span>
            <div style={{ display: "flex", gap: 8 }}>
              <input readOnly value={calUrl} onFocus={e => e.target.select()} style={{ flex: 1, fontFamily: T.sans, fontSize: 12.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, outline: "none" }} />
              <button onClick={copyCal} title="Copiar" style={{ flexShrink: 0, padding: "0 13px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 }}>{calCopied ? "✓" : "Copiar"}</button>
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 10, lineHeight: 1.6 }}>
              <b style={{ color: T.text }}>Cómo suscribirlo en Google Calendar:</b> abre <a href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl" target="_blank" rel="noopener" style={{ color: T.accent, textDecoration: "underline" }}>Agregar desde URL ↗</a>, pega el link de arriba y pulsa “Agregar calendario”. (En el celular ya lo verás porque sincroniza tu Google).
            </div>
          </div>
        )}
      </div>
      </>}
      {cfgTab === "datos" && <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 14, alignItems: "start" }}>
          <ClinicDataCard T={T} />
          <PaymentDataCard T={T} />
        </div>
        <AccountEmailCard T={T} />
        <AdminPinCard T={T} />
      </>}
      {cfgTab === "horarios" && <div style={{ marginBottom: 14 }}><HorariosEditor T={T} /></div>}
      {cfgTab === "plantillas" && <>
        <IndTemplatesEditor T={T} />
        <FirmasMedicasEditor T={T} />
        <RecitaDescCard T={T} />
      </>}
    </div>
  );
}
function ClinCard({ T, title, children }) {
  return <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 }}>
    <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>{title}</div>{children}
  </div>;
}
// Notificaciones automáticas. Vive DENTRO de Automatizaciones (no en Configuración), como
// un botón desplegable. Las de WhatsApp quedan listas para activarse al conectar Meta.
function NotificacionesCard({ T }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 11, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>Notificaciones automáticas</div>
          <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>Confirmación por correo 24 h antes · recordatorios por WhatsApp</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && <div style={{ padding: "0 18px 16px" }}>
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 8, lineHeight: 1.5, paddingTop: 4, borderTop: "1px solid " + T.lineSoft }}>La confirmación por correo se envía <b style={{ color: T.text }}>24 horas antes</b> de la cita. Los avisos por WhatsApp quedarán activos al conectar el permiso de Meta.</div>
        <ToggleRow T={T} label="Confirmación por correo · 24 h antes (Gmail)" def={true} />
        <ToggleRow T={T} label="Recordatorio 24 h antes (WhatsApp)" def={true} badge="Requiere Meta" />
        <ToggleRow T={T} label="Recordatorio el día del tratamiento · 08:30 (WhatsApp)" def={true} badge="Requiere Meta" />
        <ToggleRow T={T} label="Resumen diario con Gemini" def={false} />
      </div>}
    </div>
  );
}
function RecitaDescCard({ T }) {
  const DB = _db();
  const cfg0 = (() => { try { return (window.DB && DB.cfg()) || {}; } catch (e) { return {}; } })();
  const [tipo, setTipo] = useState(cfg0.recita_desc_tipo || "fijo");
  // Sin valor guardado, el campo queda VACÍO y muestra un ejemplo como placeholder (no un
  // valor prellenado que parezca fijo). Al escribir, es totalmente editable.
  const [val, setVal]   = useState(cfg0.recita_desc_val != null ? String(cfg0.recita_desc_val) : "");
  const [saved, setSaved] = useState(false);
  function save() {
    const n = parseInt(val, 10);
    if (!n || n <= 0) return;
    try { DB.set("config", Object.assign({}, DB.cfg(), { recita_desc_tipo: tipo, recita_desc_val: n })); setSaved(true); setTimeout(() => setSaved(false), 1800); window.jcmToast && window.jcmToast("Descuento de re-cita guardado.", "ok"); } catch (e) {}
  }
  const preview = (() => {
    const n = parseInt(val, 10) || 0;
    if (!n) return "";
    const ejemplo = 150000;
    const desc = tipo === "pct" ? Math.round(ejemplo * (1 - n / 100) / 1000) * 1000 : Math.max(0, ejemplo - n);
    return "Ej. Botox $150.000 → precio preferente $" + desc.toLocaleString("es-CL");
  })();
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const inp = luxF ? { ...DS.ctl(T), width: "100%" } : { fontFamily: T.sans, fontSize: 13, padding: "9px 11px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, outline: "none", width: "100%", boxSizing: "border-box" };
  return (
    <div style={luxF ? { ...DS.card(T), padding: "18px 20px", marginBottom: 14 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px", marginBottom: 14 }}>
      <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        Campaña re-cita · Descuento preferente
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 }}>Define cuánto se descuenta al precio del procedimiento en el mensaje de WhatsApp de re-cita. Puedes usar un monto fijo (ej. $20.000 menos) o un porcentaje.</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {[["fijo", "Monto fijo (CLP)"], ["pct", "Porcentaje (%)"]].map(([k, l]) => (
          <button key={k} onClick={() => setTipo(k)} style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: "1px solid " + (tipo === k ? T.accent : T.line), background: tipo === k ? T.accent + "14" : T.bg, color: tipo === k ? T.accent : T.textMute, fontFamily: T.sans, fontSize: 12, fontWeight: tipo === k ? 600 : 400, cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input value={val} onChange={e => setVal(e.target.value.replace(/\D/g, ""))} placeholder={tipo === "pct" ? "Ej. 10" : "Ej. 20000"} style={inp} />
          <span style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", fontFamily: T.sans, fontSize: 12, color: T.textFaint, pointerEvents: "none" }}>{tipo === "pct" ? "%" : "CLP"}</span>
        </div>
        <button onClick={save} style={{ flexShrink: 0, padding: "9px 18px", borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{saved ? "✓ Guardado" : "Guardar"}</button>
      </div>
      {preview && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 8, fontStyle: "italic" }}>{preview}</div>}
    </div>
  );
}
/* Datos de la clínica — propios de cada clínica, editables. Vacíos para clínicas nuevas. */
function ClinicDataCard({ T }) {
  const cfg0 = (() => { try { return (window.DB && DB.cfg()) || {}; } catch (e) { return {}; } })();
  const clinicName = (() => { try { return (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && (window.JCSAAS.currentClinic() || {}).name); } catch (e) { return ""; } })();
  const [f, setF] = useState({
    clinic_name: cfg0.clinic_name || clinicName || "",
    clinic_addr: cfg0.clinic_addr || "",
    clinic_maps: cfg0.clinic_maps || "",
    professional: cfg0.professional || "",
    clinic_email: cfg0.clinic_email || "",
    wa_number: cfg0.wa_number || ""
  });
  const emailReplyOk = !f.clinic_email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.clinic_email.trim());
  const [saved, setSaved] = useState(false);
  function onWa(v) {
    // Prefijo +56 9 fijo, solo dígitos. Se quita el país y el 9 móvil del prefijo visible (una sola vez).
    let d = (v || "").replace(/\D/g, "");
    if (d.indexOf("56") === 0) d = d.slice(2);
    if (d.charAt(0) === "9") d = d.slice(1);
    d = d.slice(0, 8);
    setF({ ...f, wa_number: "569" + d }); setSaved(false);
  }
  const waDisplay = "+569 " + ((f.wa_number || "").replace(/^569/, ""));
  function save() {
    if (!emailReplyOk) { window.jcmToast && window.jcmToast("El correo para respuestas no es válido.", "error"); return; }
    try { DB.set("config", Object.assign({}, DB.cfg(), { clinic_name: f.clinic_name.trim(), clinic_addr: f.clinic_addr.trim(), clinic_maps: (f.clinic_maps || "").trim(), professional: f.professional.trim(), clinic_email: f.clinic_email.trim().toLowerCase(), wa_number: (f.wa_number || "").replace(/\D/g, "") })); setSaved(true); setTimeout(() => setSaved(false), 1800); } catch (e) {}
  }
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div style={luxF ? { ...DS.card(T), padding: "18px 20px", marginBottom: 14 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={luxF ? DS.text(T, "eyebrow") : { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Datos de la clínica</div>
        <AdBtn T={T} small primary onClick={save}>{saved ? "✓ Guardado" : "Guardar"}</AdBtn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AdField T={T} label="Nombre de la clínica" value={f.clinic_name} onChange={v => { setF({ ...f, clinic_name: v }); setSaved(false); }} placeholder="Ej: Clínica Karenina" />
        <AdField T={T} label="Dirección" value={f.clinic_addr} onChange={v => { setF({ ...f, clinic_addr: v }); setSaved(false); }} placeholder="Ej: 1 Norte 123, oficina 4, Talca" />
        <div>
          <AdField T={T} label="Link de Google Maps (opcional)" value={f.clinic_maps} onChange={v => { setF({ ...f, clinic_maps: v }); setSaved(false); }} placeholder="Pega el enlace de tu ficha en Google Maps" />
          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, lineHeight: 1.5, marginTop: 5 }}>Se envía como “Cómo llegar” en el WhatsApp de confirmación. Si lo dejas vacío, se genera automáticamente desde la dirección. Abre la app de mapas en el teléfono del paciente.</div>
        </div>
        <AdField T={T} label="Profesional a cargo" value={f.professional} onChange={v => { setF({ ...f, professional: v.replace(/[0-9]/g, "") }); setSaved(false); }} placeholder="Ej: Dra. Karenina Soto" />
        <div>
          <AdField T={T} label="Correo para respuestas de pacientes" value={f.clinic_email} onChange={v => { setF({ ...f, clinic_email: v }); setSaved(false); }} placeholder="Ej: contacto@tuclinica.cl" />
          <div style={{ fontFamily: T.sans, fontSize: 11, color: emailReplyOk ? T.textMute : "#e06a6a", lineHeight: 1.5, marginTop: 5 }}>
            {emailReplyOk ? "Cuando un paciente responda un recordatorio, su respuesta llegará a este correo. Si lo dejas vacío, se usa el correo con que iniciaste sesión." : "Correo no válido."}
          </div>
        </div>
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>WhatsApp</span>
          <input value={waDisplay} onChange={e => onWa(e.target.value)} inputMode="numeric" placeholder="+569 1234 5678" style={luxF ? { ...DS.ctl(T), width: "100%", height: DS.h.ctl + 4 } : { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" }} />
        </label>
      </div>
    </div>
  );
}
/* PIN de admin — protege acciones sensibles (borrar movimientos de Caja, etc.).
   Se guarda en DB separado del config; nunca sale al servidor. */
function AdminPinCard({ T }) {
  const [pin, setPin] = useState(() => { try { return String(window.DB && window.DB.get("admin_pin") || ""); } catch (e) { return ""; } });
  const [pin2, setPin2] = useState("");
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");
  function save() {
    setErr("");
    if (!pin.trim()) { setErr("Ingresa un PIN de al menos 4 dígitos."); return; }
    if (pin.trim().length < 4) { setErr("El PIN debe tener al menos 4 caracteres."); return; }
    if (pin.trim() !== pin2.trim()) { setErr("Los PINs no coinciden."); return; }
    try { window.DB && window.DB.set("admin_pin", pin.trim()); setSaved(true); setPin2(""); setTimeout(() => setSaved(false), 1800); } catch (e) { setErr("No se pudo guardar."); }
  }
  const hasSaved = (() => { try { return !!(window.DB && window.DB.get("admin_pin")); } catch (e) { return false; } })();
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const pinInp = luxF ? { ...DS.ctl(T), width: "100%", height: DS.h.ctl + 4 } : { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, outline: "none", boxSizing: "border-box" };
  return (
    <div style={luxF ? { ...DS.card(T), padding: "18px 20px", marginBottom: 14 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={luxF ? DS.text(T, "eyebrow") : { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>PIN de seguridad</div>
          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 3 }}>Requerido para borrar movimientos de Caja y otras acciones sensibles.</div>
        </div>
        {hasSaved && <span style={{ fontFamily: T.sans, fontSize: 10.5, color: "#1F8A5B", background: "#1F8A5B18", borderRadius: 6, padding: "3px 9px" }}>PIN activo</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>{hasSaved ? "Nuevo PIN" : "PIN de admin"}</span>
          <input type="password" value={pin} data-nocap="1" onChange={e => { setPin(e.target.value); setSaved(false); setErr(""); }} placeholder="Mínimo 4 caracteres" style={pinInp} />
        </label>
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Confirmar PIN</span>
          <input type="password" value={pin2} data-nocap="1" onChange={e => { setPin2(e.target.value); setSaved(false); setErr(""); }} placeholder="Repite el PIN" style={pinInp} />
        </label>
        {err && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: "#C0285A" }}>{err}</div>}
        <AdBtn T={T} small primary onClick={save}>{saved ? "✓ PIN guardado" : (hasSaved ? "Cambiar PIN" : "Guardar PIN")}</AdBtn>
      </div>
    </div>
  );
}

/* Correo de la cuenta (login) — el dueño lo cambia re-autenticándose con su contraseña. (P26)
   Solo se muestra en modo nube y para el dueño (no profesionales). */
function AccountEmailCard({ T }) {
  const SA = window.JCSAAS;
  const enabled = !!(SA && SA.enabled);
  const isProf = !!(SA && SA.currentRole && SA.currentRole() === "professional");
  const current = (enabled && SA.userEmail && SA.userEmail()) || "";
  const [nuevo, setNuevo] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null); // {ok, text}
  if (!enabled || isProf || !current) return null;
  const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevo.trim());
  async function cambiar() {
    if (busy) return; setMsg(null);
    if (!okMail) { setMsg({ ok: false, text: "Escribe un correo nuevo válido." }); return; }
    if (!pass) { setMsg({ ok: false, text: "Ingresa tu contraseña actual para confirmar." }); return; }
    setBusy(true);
    try {
      const r = await SA.changeEmail(nuevo.trim(), pass);
      if (r && r.ok && r.verify) { setMsg({ ok: true, text: "Te enviamos un enlace a " + nuevo.trim() + ". Ábrelo para confirmar el cambio de correo." }); setPass(""); }
      else if (r && r.ok) { setMsg({ ok: true, text: "Correo actualizado a " + nuevo.trim() + "." }); setNuevo(""); setPass(""); try { window.jcmAudit && window.jcmAudit("Correo de la cuenta cambiado a " + nuevo.trim()); } catch (e) {} }
      else { setMsg({ ok: false, text: (r && r.error) || "No se pudo cambiar el correo." }); }
    } catch (e) { setMsg({ ok: false, text: "No se pudo cambiar el correo." }); }
    setBusy(false);
  }
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const inp = luxF ? { ...DS.ctl(T), width: "100%", height: DS.h.ctl + 4 } : { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  return (
    <div style={luxF ? { ...DS.card(T), padding: "18px 20px", marginBottom: 14 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 }}>
      <div style={luxF ? { ...DS.text(T, "eyebrow"), marginBottom: 4 } : { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 4 }}>Correo de la cuenta</div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12, lineHeight: 1.5 }}>Correo con el que inicias sesión. Cambiarlo requiere <b style={{ color: T.text }}>tu contraseña actual</b>. Correo actual: <b style={{ color: T.text }}>{current}</b>.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label><span style={lbl}>Nuevo correo</span><input type="email" value={nuevo} data-nocap="" onChange={e => { setNuevo(e.target.value); setMsg(null); }} placeholder="nuevo@correo.cl" style={inp} /></label>
        <label><span style={lbl}>Tu contraseña actual</span><input type="password" value={pass} onChange={e => { setPass(e.target.value); setMsg(null); }} onKeyDown={e => { if (e.key === "Enter") cambiar(); }} placeholder="••••••••" style={inp} /></label>
        {msg && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: msg.ok ? "#1F8A5B" : "#C0285A", lineHeight: 1.5 }}>{msg.ok ? "✓ " : "⚠ "}{msg.text}</div>}
        <div style={{ textAlign: "right" }}><AdBtn T={T} small primary onClick={cambiar}>{busy ? "Verificando…" : "Cambiar correo"}</AdBtn></div>
      </div>
    </div>
  );
}

/* Datos de pago (transferencia) — propios de cada clínica. Se muestran en la página de
   reservas. Solo el dueño con sesión iniciada los edita (no están en el código). */
function PaymentDataCard({ T }) {
  const cfg0 = (() => { try { return (window.DB && DB.cfg()) || {}; } catch (e) { return {}; } })();
  const [f, setF] = useState({
    pay_banco: cfg0.pay_banco || "",
    pay_titular: cfg0.pay_titular || "",
    pay_rut: cfg0.pay_rut || "",
    pay_tipo: cfg0.pay_tipo || "Cuenta corriente",
    pay_numero: cfg0.pay_numero || "",
    pay_email: cfg0.pay_email || ""
  });
  const [saved, setSaved] = useState(false);
  const up = (k, v) => { setF(prev => ({ ...prev, [k]: v })); setSaved(false); };
  // Valida el dígito verificador del RUT (módulo 11) — solo aviso, no bloquea.
  const rutOk = (() => {
    const r = (f.pay_rut || "").replace(/[^0-9kK]/g, "");
    if (r.length < 2) return null;
    const body = r.slice(0, -1), dvIn = r.slice(-1).toUpperCase();
    if (!/^\d+$/.test(body)) return false;
    let s = 0, m = 2;
    for (let i = body.length - 1; i >= 0; i--) { s += parseInt(body[i], 10) * m; m = m === 7 ? 2 : m + 1; }
    let dv = 11 - (s % 11); dv = dv === 11 ? "0" : dv === 10 ? "K" : "" + dv;
    return dv === dvIn;
  })();
  function save() {
    try {
      DB.set("config", Object.assign({}, DB.cfg(), {
        pay_banco: (f.pay_banco || "").trim(), pay_titular: (f.pay_titular || "").trim(),
        pay_rut: (f.pay_rut || "").trim(), pay_tipo: f.pay_tipo,
        pay_numero: (f.pay_numero || "").trim(), pay_email: (f.pay_email || "").trim()
      }));
      setSaved(true); setTimeout(() => setSaved(false), 1800);
      try { window.JCSAAS && window.JCSAAS.publishProfile && window.JCSAAS.publishProfile(); } catch (e) {}
    } catch (e) {}
  }
  const tipos = ["Cuenta corriente", "Cuenta vista", "Cuenta de ahorro", "Cuenta RUT", "Chequera electrónica"];
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const inpBase = luxF ? { ...DS.ctl(T), width: "100%", height: DS.h.ctl + 4 } : { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return (
    <div style={luxF ? { ...DS.card(T), padding: "18px 20px", marginBottom: 14 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={luxF ? DS.text(T, "eyebrow") : { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Datos de pago (transferencia)</div>
        <AdBtn T={T} small primary onClick={save}>{saved ? "✓ Guardado" : "Guardar"}</AdBtn>
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "0 0 14px", lineHeight: 1.5 }}>
        Estos datos aparecen en tu <b style={{ color: T.text }}>página de reservas</b> para que los pacientes te transfieran. Solo tú, con tu sesión iniciada, puedes editarlos. Déjalos en blanco si prefieres coordinar el pago por WhatsApp.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AdField T={T} label="Banco" value={f.pay_banco} onChange={v => up("pay_banco", v)} placeholder="Ej: Banco de Chile" />
        <AdField T={T} label="Titular de la cuenta" value={f.pay_titular} onChange={v => up("pay_titular", v)} placeholder="Ej: Clínica Karenina SpA" />
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>RUT del titular</span>
          <input value={f.pay_rut} onChange={e => up("pay_rut", window.jcmFmtRut ? window.jcmFmtRut(e.target.value) : e.target.value)} placeholder="Ej: 76.123.456-7" style={{ ...inpBase, border: (luxF ? inpBase.border : "1px solid " + T.line), borderColor: rutOk === false ? "#C0285A" : (luxF ? T.line : undefined) }} />
          {rutOk === false && <span style={{ display: "block", fontFamily: T.sans, fontSize: 11, color: "#C0285A", marginTop: 5 }}>El dígito verificador no calza — revisa que el RUT esté correcto.</span>}
          {rutOk === true && <span style={{ display: "block", fontFamily: T.sans, fontSize: 11, color: "#1F8A5B", marginTop: 5 }}>RUT válido ✓</span>}
        </label>
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Tipo de cuenta</span>
          <select value={f.pay_tipo} onChange={e => up("pay_tipo", e.target.value)} style={inpBase}>
            {tipos.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>N° de cuenta</span>
          <input value={f.pay_numero} onChange={e => up("pay_numero", e.target.value)} inputMode="numeric" placeholder="Ej: 00-123-45678-90" style={inpBase} />
        </label>
        <AdField T={T} label="Correo (para el comprobante)" value={f.pay_email} onChange={v => up("pay_email", v)} placeholder="Ej: pagos@tuclinica.cl" />
      </div>
    </div>
  );
}
function Row({ T, k, v }) { return <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 0", fontFamily: T.sans, fontSize: 13 }}><span style={{ color: T.textMute }}>{k}</span><span style={{ color: T.text, textAlign: "right" }}>{v}</span></div>; }
function ToggleRow({ T, label, def, badge }) { const [on, setOn] = useState(def); return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", gap: 10 }}><span style={{ fontFamily: T.sans, fontSize: 13, color: T.text, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>{label}{badge && <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.accent, background: T.accent + "18", border: "1px solid " + T.accent + "40", borderRadius: 999, padding: "2px 8px" }}>{badge}</span>}</span><AdSwitch T={T} on={on} onClick={() => setOn(!on)} /></div>; }

/* ─────────── COLABORACIÓN ─────────── */
// Mensajes de respuesta (aceptada/rechazada), editables por clínica. {nombre} y {clinica} se reemplazan al enviar.
const COLLAB_MSG_DEFAULT = {
  ok: "Hola {nombre}, ¡gracias por tu interés en colaborar con {clinica}! Revisamos tu perfil y nos encantaría avanzar contigo. Como los procedimientos de medicina estética son actos médicos, el siguiente paso es una evaluación clínica previa para definir el tratamiento y la fecha. ¿Qué día te acomoda para ver disponibilidad?",
  no: "Hola {nombre}, ¡gracias por tu interés en colaborar con {clinica}! Agradecemos mucho tu propuesta y el tiempo que dedicaste. Por ahora no podremos concretar esta colaboración, pero guardamos tus datos para futuras campañas. ¡Te deseamos mucho éxito!"
};
function collabMsg(which) {
  try { const v = window.DB && DB.get(which === "ok" ? "collab_msg_ok" : "collab_msg_no"); if (v != null && v !== "") return v; } catch (e) {}
  return COLLAB_MSG_DEFAULT[which];
}
// Encabezado del formulario público (título + intro), editable por clínica. La plantilla por defecto
// es la que ya tiene colaborar.html; cada clínica puede personalizarla.
const COLLAB_FORM_DEFAULT = {
  title: "Colabora con nosotros",
  intro: "¿Te gustaría colaborar con nuestra clínica? Cuéntanos de ti y de tu comunidad. Revisamos cada propuesta según el perfil, la audiencia y la disponibilidad."
};
function collabForm() {
  try { const v = window.DB && DB.get("collab_form"); if (v && (v.title || v.intro)) return { title: v.title || COLLAB_FORM_DEFAULT.title, intro: v.intro || COLLAB_FORM_DEFAULT.intro }; } catch (e) {}
  return COLLAB_FORM_DEFAULT;
}
// Editor del formulario + mensajes (se muestra arriba de las solicitudes).
function ColabFormEditor({ T }) {
  const [open, setOpen] = useState(false);
  const f0 = collabForm();
  const [title, setTitle] = useState(f0.title);
  const [intro, setIntro] = useState(f0.intro);
  const [okMsg, setOkMsg] = useState(collabMsg("ok"));
  const [noMsg, setNoMsg] = useState(collabMsg("no"));
  const [saved, setSaved] = useState(false);
  const ta = { width: "100%", padding: "11px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", resize: "vertical", lineHeight: 1.5, boxSizing: "border-box" };
  function save() {
    try {
      DB.set("collab_form", { title: title.trim() || COLLAB_FORM_DEFAULT.title, intro: intro.trim() });
      DB.set("collab_msg_ok", okMsg.trim());
      DB.set("collab_msg_no", noMsg.trim());
      setSaved(true); setTimeout(() => setSaved(false), 1800);
      window.jcmToast && window.jcmToast("Formulario y mensajes guardados.", "ok");
    } catch (e) { window.jcmError && window.jcmError("No se pudo guardar", e); }
  }
  function reset() {
    setTitle(COLLAB_FORM_DEFAULT.title); setIntro(COLLAB_FORM_DEFAULT.intro);
    setOkMsg(COLLAB_MSG_DEFAULT.ok); setNoMsg(COLLAB_MSG_DEFAULT.no);
  }
  return (
    <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, marginBottom: 16 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "14px 16px", textAlign: "left" }}>
        <span style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>Personalizar formulario y mensajes</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent }}>Formulario público</div>
          <AdField T={T} label="Título del formulario" value={title} onChange={setTitle} placeholder="Colabora con nosotros" />
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Texto de introducción</span>
            <textarea value={intro} onChange={e => setIntro(e.target.value)} rows={3} style={ta} />
          </label>
          <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginTop: 4 }}>Mensajes de respuesta</div>
          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, lineHeight: 1.5 }}>Usa <b>{"{nombre}"}</b> y <b>{"{clinica}"}</b> donde quieras que aparezca el nombre de la persona o de tu clínica.</div>
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 6 }}>Solicitud aceptada</span>
            <textarea value={okMsg} onChange={e => setOkMsg(e.target.value)} rows={4} style={ta} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#C0285A", marginBottom: 6 }}>Solicitud rechazada</span>
            <textarea value={noMsg} onChange={e => setNoMsg(e.target.value)} rows={4} style={ta} />
          </label>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "center" }}>
            <button onClick={reset} style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "9px 13px", cursor: "pointer" }}>Restaurar plantilla</button>
            <AdBtn T={T} primary onClick={save}>{saved ? "✓ Guardado" : "Guardar"}</AdBtn>
          </div>
        </div>
      )}
    </div>
  );
}
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
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const reqRow = r => (
    <div key={r.id} style={luxF ? { ...DS.card(T), padding: "13px 16px", borderColor: (r.status || "nueva") === "nueva" ? T.accent + "88" : T.line, opacity: r.status === "rechazada" ? 0.78 : 1 } : { background: T.surface, border: "1px solid " + ((r.status || "nueva") === "nueva" ? T.accent : T.line), borderRadius: 10, padding: "13px 15px", opacity: r.status === "rechazada" ? 0.78 : 1 }}>
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
          : ((typeof window !== "undefined" ? (window.jcmPubBase ? window.jcmPubBase() : window.location.origin) : "") + "/colaborar.html");
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
      <ColabFormEditor T={T} />
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
  // Mensajes editables por clínica (con marcadores {nombre} y {clinica}). Si no hay, usa los por defecto.
  const fill = t => (t || "").replace(/\{nombre\}/g, r.name || "").replace(/\{clinica\}/g, clinic);
  const msgOk = fill(collabMsg("ok"));
  const msgNo = fill(collabMsg("no"));
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
        <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, fontStyle: "italic", lineHeight: 1.5, margin: "6px 0 13px" }}>Saludo base: "{saludo}"</div>
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
/* ─────────── EDITOR DE FICHAS · constructor de plantillas (Área 5) ─────────── */
const FE_TIPOS = [["texto", "Texto corto", "Una línea: nombre, RUT…"], ["area", "Texto largo", "Varias líneas: anamnesis, notas…"], ["numero", "Número", "Edad, peso, dosis…"], ["selector", "Selector", "Elegir de una lista"], ["fecha", "Fecha", "Selector de calendario"], ["email", "Email", "Correo electrónico"], ["imagen", "Imagen", "Subir foto clínica"], ["pdf", "PDF", "Adjuntar documento"]];
const FE_ICON = {
  texto: "M4 7h16M4 12h9", area: "M4 6h16M4 11h16M4 16h10", numero: "M9 7v10M15 7v10M6 10h12M6 14h12",
  selector: "M4 6h16M4 12h16M4 18h10M20 15l-3 3-3-3", fecha: "M3 5h18v16H3zM3 10h18M8 3v4M16 3v4",
  email: "M3 6h18v12H3zM3 7l9 6 9-6", imagen: "M3 5h18v14H3zM7 11l2.5 2.5L13 10l6 7", pdf: "M6 2h9l4 4v16H6zM14 2v4h4"
};
function FeIcon({ t, c, s }) { return <svg width={s || 15} height={s || 15} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={FE_ICON[t] || FE_ICON.texto} /></svg>; }
function loadFichaTpls() { try { const v = window.DB && window.DB.get("ficha_templates"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function saveFichaTplsDB(v) { try { if (window.DB) window.DB.set("ficha_templates", v); } catch (e) {} }
function FichaEditorView({ T }) {
  const [tpls, setTpls] = useState(loadFichaTpls);
  const [selId, setSelId] = useState(tpls[0] ? tpls[0].id : null);
  const [dragI, setDragI] = useState(null);
  const [expandId, setExpandId] = useState(null); // campo con opciones abiertas
  function persist(n) { setTpls(n); saveFichaTplsDB(n); }
  function addTpl() { const t = { id: "ft" + Date.now(), name: "Nueva plantilla", fields: [] }; const n = [...tpls, t]; persist(n); setSelId(t.id); }
  async function delTpl(id) { if (!(await (window.jcmConfirm || window.confirm)("¿Eliminar esta plantilla de ficha?", { danger: true }))) return; const n = tpls.filter(t => t.id !== id); persist(n); if (selId === id) setSelId(n[0] ? n[0].id : null); }
  const sel = tpls.find(t => t.id === selId) || null;
  function updSel(patch) { persist(tpls.map(t => t.id === selId ? { ...t, ...patch } : t)); }
  function addField(type) { const nf = { id: "f" + Date.now(), type, label: "", required: false, options: "", placeholder: "" }; updSel({ fields: [...(sel.fields || []), nf] }); setExpandId(nf.id); }
  function updField(fid, patch) { updSel({ fields: sel.fields.map(f => f.id === fid ? { ...f, ...patch } : f) }); }
  function delField(fid) { updSel({ fields: sel.fields.filter(f => f.id !== fid) }); }
  function moveField(i, dir) { const a = sel.fields.slice(); const j = i + dir; if (j < 0 || j >= a.length) return; const t = a[i]; a[i] = a[j]; a[j] = t; updSel({ fields: a }); }
  function moveFieldTo(from, to) { if (from == null || to == null || from === to) return; const a = sel.fields.slice(); const m = a.splice(from, 1)[0]; a.splice(to, 0, m); updSel({ fields: a }); }
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 };
  const inp = { width: "100%", padding: "9px 11px", borderRadius: 6, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none", boxSizing: "border-box" };
  const tipoLabel = t => (FE_TIPOS.find(x => x[0] === t) || [, t])[1];
  // Renderiza el campo como se verá en la ficha real (con estilo, no solo un input gris).
  const previewInput = f => {
    const pInp = { ...inp, background: T.surface, cursor: "default" };
    const opts = (f.options || "").split(",").map(s => s.trim()).filter(Boolean);
    if (f.type === "area") return <div style={{ ...pInp, minHeight: 46, color: T.textFaint, display: "flex", alignItems: "flex-start" }}>{f.placeholder || "Escribe aquí…"}</div>;
    if (f.type === "selector") return <div style={{ ...pInp, display: "flex", justifyContent: "space-between", alignItems: "center", color: opts[0] ? T.text : T.textFaint }}>{opts[0] || "Elegir…"}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8"><path d="M6 9l6 6 6-6" /></svg></div>;
    if (f.type === "imagen" || f.type === "pdf") return <div style={{ ...pInp, border: "1px dashed " + T.line, color: T.textFaint, display: "flex", alignItems: "center", gap: 8, padding: "14px 11px" }}><FeIcon t={f.type} c={T.accent} s={16} />{f.type === "imagen" ? "Subir imagen" : "Adjuntar PDF"}</div>;
    if (f.type === "fecha") return <div style={{ ...pInp, display: "flex", justifyContent: "space-between", alignItems: "center", color: T.textFaint }}>dd / mm / aaaa<FeIcon t="fecha" c={T.textMute} s={15} /></div>;
    return <div style={{ ...pInp, color: T.textFaint }}>{f.placeholder || (f.type === "email" ? "correo@ejemplo.com" : f.type === "numero" ? "0" : "Escribe aquí…")}</div>;
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Editor de Fichas" sub="Arma tu plantilla a la izquierda y mírala en vivo a la derecha" />
        <AdBtn T={T} primary onClick={addTpl}>+ Nueva plantilla</AdBtn>
      </div>
      {tpls.length === 0 ? (
        <div style={{ background: T.surface, border: "1px dashed " + T.line, borderRadius: 14, padding: "44px 24px", textAlign: "center", marginTop: 12 }}>
          <div style={{ width: 54, height: 54, borderRadius: 15, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></svg></div>
          <div style={{ fontFamily: T.serif, fontSize: 19, color: T.text, marginBottom: 6 }}>Crea tu primera plantilla de ficha</div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 460, margin: "0 auto 18px" }}>Agrega campos (texto, número, selector, imagen, PDF…) y mira cómo queda la ficha en tiempo real, lista para usar con tus pacientes.</div>
          <AdBtn T={T} primary onClick={addTpl}>+ Crear primera plantilla</AdBtn>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, alignItems: "start", marginTop: 4 }}>
          {/* Lista de plantillas */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, margin: "2px 2px 4px" }}>Mis plantillas</div>
            {tpls.map(t => (
              <button key={t.id} onClick={() => setSelId(t.id)} style={{ textAlign: "left", padding: "10px 12px", borderRadius: 9, cursor: "pointer", border: "1px solid " + (selId === t.id ? T.accent : T.line), background: selId === t.id ? T.accent + "12" : T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5 }}>
                {t.name || "Sin nombre"}<div style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 2 }}>{(t.fields || []).length} campo{(t.fields || []).length === 1 ? "" : "s"}</div>
              </button>
            ))}
          </div>
          {/* Constructor + preview en vivo */}
          {sel && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 16, alignItems: "start" }}>
              {/* Constructor */}
              <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "15px 16px" }}>
                <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, fontWeight: 600, marginBottom: 10 }}>✏️ Editas aquí</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  <input value={sel.name} onChange={e => updSel({ name: e.target.value })} placeholder="Nombre de la plantilla" style={{ ...inp, fontWeight: 600 }} />
                  <button onClick={() => delTpl(sel.id)} title="Eliminar plantilla" style={{ background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "0 10px", cursor: "pointer", color: T.textFaint, display: "flex", alignItems: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg></button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {(sel.fields || []).length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint, textAlign: "center", padding: "14px 0", border: "1px dashed " + T.line, borderRadius: 9 }}>Aún sin campos. Agrega el primero abajo. 👇</div>}
                  {(sel.fields || []).map((f, i) => {
                    const openOpts = expandId === f.id;
                    return (
                    <div key={f.id} onDragOver={e => e.preventDefault()} onDrop={() => { moveFieldTo(dragI, i); setDragI(null); }} style={{ background: T.bg, border: "1px solid " + (dragI != null && dragI !== i ? (T.accent + "88") : T.line), borderRadius: 9, padding: "10px 11px", transition: "border-color .15s" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span draggable onDragStart={() => setDragI(i)} onDragEnd={() => setDragI(null)} title="Arrastra para reordenar" style={{ cursor: "grab", color: T.textFaint, fontSize: 15, lineHeight: 1, userSelect: "none", padding: "0 2px" }}>⠿</span>
                        <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 7, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><FeIcon t={f.type} c={T.accent} s={14} /></span>
                        <input value={f.label} onChange={e => updField(f.id, { label: e.target.value })} placeholder={"Etiqueta (" + tipoLabel(f.type) + ")"} style={{ ...inp, flex: 1, marginBottom: 0, border: "none", background: "transparent", padding: "4px 2px", fontWeight: 600 }} />
                        <button onClick={() => setExpandId(openOpts ? null : f.id)} title="Opciones del campo" style={{ background: "none", border: "none", cursor: "pointer", color: openOpts ? T.accent : T.textMute, padding: 3, display: "flex" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg></button>
                        <button onClick={() => moveField(i, -1)} disabled={i === 0} title="Subir" style={{ background: "none", border: "none", cursor: i === 0 ? "default" : "pointer", color: i === 0 ? T.textFaint : T.textMute, padding: 2, opacity: i === 0 ? .4 : 1 }}>▲</button>
                        <button onClick={() => moveField(i, 1)} disabled={i === sel.fields.length - 1} title="Bajar" style={{ background: "none", border: "none", cursor: i === sel.fields.length - 1 ? "default" : "pointer", color: T.textMute, padding: 2, opacity: i === sel.fields.length - 1 ? .4 : 1 }}>▼</button>
                        <button onClick={() => delField(f.id)} title="Eliminar campo" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 2, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
                      </div>
                      {openOpts && (
                        <div style={{ marginTop: 9, paddingTop: 9, borderTop: "1px solid " + T.lineSoft, display: "flex", flexDirection: "column", gap: 7 }}>
                          {f.type === "selector" && <input value={f.options} onChange={e => updField(f.id, { options: e.target.value })} placeholder="Opciones separadas por coma (ej: Sí, No, A veces)" style={inp} />}
                          {(f.type === "texto" || f.type === "area" || f.type === "numero" || f.type === "email") && <input value={f.placeholder} onChange={e => updField(f.id, { placeholder: e.target.value })} placeholder="Texto de ejemplo (placeholder)" style={inp} />}
                          <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>
                            <input type="checkbox" checked={!!f.required} onChange={e => updField(f.id, { required: e.target.checked })} /> Campo obligatorio
                          </label>
                        </div>
                      )}
                    </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 14 }}>
                  <span style={lbl}>Agregar campo</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {FE_TIPOS.map(([k, l, d]) => <button key={k} onClick={() => addField(k)} title={d} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: T.sans, fontSize: 11.5, padding: "9px 11px", borderRadius: 9, cursor: "pointer", border: "1px solid " + T.line, background: "transparent", color: T.text, textAlign: "left" }}>
                      <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 6, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><FeIcon t={k} c={T.accent} s={13} /></span>
                      <span style={{ minWidth: 0 }}><span style={{ display: "block", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l}</span><span style={{ display: "block", fontSize: 9.5, color: T.textFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d}</span></span>
                    </button>)}
                  </div>
                </div>
              </div>
              {/* Vista previa EN VIVO — se ve como la ficha real, sticky mientras editas */}
              <div style={{ position: "sticky", top: 8 }}>
                <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, fontWeight: 600, marginBottom: 8 }}>👁️ Así se verá · en vivo</div>
                <div style={{ background: "linear-gradient(180deg," + (T.surface2 || T.surface) + ", " + T.surface + ")", border: "1px solid " + T.line, borderRadius: 14, padding: "20px 20px", boxShadow: "0 14px 40px -28px rgba(0,0,0,.4)" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, marginBottom: 4 }}>Ficha clínica</div>
                  <div style={{ fontFamily: T.serif, fontSize: 21, color: T.text, marginBottom: 2 }}>{sel.name || "Plantilla de ficha"}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid " + T.lineSoft }}>Paciente · Fecha de atención</div>
                  {(sel.fields || []).length === 0 ? <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0", textAlign: "center" }}>Los campos que agregues aparecerán aquí al instante.</div>
                    : <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>{(sel.fields || []).map(f => (
                        <div key={f.id}>
                          <span style={lbl}>{f.label || <span style={{ color: T.textFaint, textTransform: "none", letterSpacing: 0 }}>Campo sin nombre</span>}{f.required && <span style={{ color: "#C0285A" }}> *</span>}</span>
                          {previewInput(f)}
                        </div>
                      ))}</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Tipos de ficha clínica (Área 5) + zonas e IMC.
// Solo estética: se quitó "Medicina general" (queda para un futuro software médico general).
const FICHA_TIPOS = [["general", "Ficha general"], ["facial", "Facial"], ["corporal", "Corporal"]];
const FICHA_ZONAS_FACIAL = ["Frente", "Entrecejo", "Patas de gallo", "Ojeras", "Pómulos", "Surcos nasogenianos", "Labios", "Código de barras", "Mentón", "Línea mandibular", "Cuello"];
const FICHA_ZONAS_CORPORAL = ["Abdomen", "Flancos", "Espalda", "Brazos", "Muslos", "Glúteos", "Papada", "Rodillas", "Pantorrillas", "Dorso de manos"];
// Posiciones aproximadas de cada zona sobre el mapa (Área 5: mapa interactivo).
const FICHA_FACE_POS = { "Frente": [100, 42], "Entrecejo": [100, 74], "Patas de gallo": [150, 86], "Ojeras": [124, 100], "Pómulos": [142, 120], "Surcos nasogenianos": [120, 138], "Código de barras": [100, 150], "Labios": [100, 166], "Mentón": [100, 190], "Línea mandibular": [58, 172], "Cuello": [100, 222] };
const FICHA_BODY_POS = { "Papada": [80, 40], "Espalda": [80, 96], "Brazos": [34, 116], "Flancos": [54, 130], "Abdomen": [80, 134], "Glúteos": [100, 170], "Muslos": [62, 196], "Dorso de manos": [27, 166], "Rodillas": [64, 232], "Pantorrillas": [64, 256] };
// Mapa anatómico interactivo (facial / corporal): hotspots clicables que sincronizan con las zonas de la ficha.
function FichaZoneMap({ T, kind, active, onToggle }) {
  const facial = kind === "facial";
  const pos = facial ? FICHA_FACE_POS : FICHA_BODY_POS;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
      <svg viewBox={facial ? "0 0 200 240" : "0 0 160 280"} style={{ width: facial ? 170 : 130, maxWidth: "100%", height: "auto" }}>
        {facial ? (
          <g fill="none" stroke={T.line} strokeWidth="1.5">
            <ellipse cx="100" cy="115" rx="62" ry="82" fill={T.surface2 || T.surface} />
            <path d="M68 92q30 -20 64 0" />
            <path d="M88 150q12 10 24 0" />
            <line x1="100" y1="196" x2="100" y2="232" />
          </g>
        ) : (
          <g fill={T.surface2 || T.surface} stroke={T.line} strokeWidth="1.5">
            <circle cx="80" cy="26" r="17" />
            <path d="M56 48h48l9 70-13 6 -5 58 4 62h-17l-6-58h-4l-6 58H53l4-62-5-58-13-6z" />
          </g>
        )}
        {Object.keys(pos).map(z => { const p = pos[z]; const on = active(z); return (
          <g key={z} style={{ cursor: "pointer" }} onClick={() => onToggle(z)}>
            <circle cx={p[0]} cy={p[1]} r="8.5" fill={on ? T.accent : T.surface} stroke={on ? T.accent : T.textMute} strokeWidth="1.5" opacity={on ? 1 : .85} />
            {on && <path d={"M" + (p[0] - 3.5) + " " + p[1] + "l2.5 2.5 4.5 -5"} fill="none" stroke={T.onAccent || "#fff"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
            <title>{z}</title>
          </g>
        ); })}
      </svg>
    </div>
  );
}
function calcIMC(peso, talla) {
  const p = parseFloat(peso), t = parseFloat(talla) / 100;
  if (!p || !t || t <= 0) return null;
  const imc = p / (t * t);
  let cat = "Normal", col = "#1F8A5B";
  if (imc < 18.5) { cat = "Bajo peso"; col = "#B8860B"; }
  else if (imc < 25) { cat = "Normal"; col = "#1F8A5B"; }
  else if (imc < 30) { cat = "Sobrepeso"; col = "#B8860B"; }
  else { cat = "Obesidad"; col = "#C0285A"; }
  return { v: imc.toFixed(1), cat, col };
}
function FichaClinicaForm({ T, patient, updatePatient }) {
  const [f, setF] = useState(patient.clinica || {});
  const [saved, setSaved] = useState(false);
  const [showAnt, setShowAnt] = useState(false); // antecedentes: colapsados en facial/corporal
  const [showVit, setShowVit] = useState(false); // signos vitales: colapsados (corporal)
  // Piel / Hábitos / Evaluación: en facial se colapsan (mismos datos que la general). Colapsados por defecto.
  const [showPiel, setShowPiel] = useState(false);
  const [showHabitos, setShowHabitos] = useState(false);
  const [showEval, setShowEval] = useState(false);
  // Dictado por voz (Evaluación y plan): reemplaza la sección aparte de "Notas Clínicas".
  const dictRef = useRef(null);
  const [recField, setRecField] = useState(null);
  useEffect(() => { setF(patient.clinica || {}); setSaved(false); }, [patient.id]);
  const SRDICT = (typeof window !== "undefined") && (window.SpeechRecognition || window.webkitSpeechRecognition);
  function dictar(k) {
    if (!SRDICT) { window.jcmToast && window.jcmToast("Tu navegador no permite dictado por voz. Usa Chrome/Edge o escribe.", "info"); return; }
    if (recField === k) { try { dictRef.current && dictRef.current.stop(); } catch (e) {} setRecField(null); return; }
    try { dictRef.current && dictRef.current.stop(); } catch (e) {}
    const r = new SRDICT(); r.lang = "es-CL"; r.continuous = true; r.interimResults = true;
    const base = (f[k] || "") ? (f[k] + " ") : "";
    r.onresult = e => { let s = ""; for (let i = e.resultIndex; i < e.results.length; i++) s += e.results[i][0].transcript; setVal(k, base + s); };
    r.onend = () => setRecField(null);
    r.onerror = ev => { setRecField(null); const c = ev && ev.error; const m = (c === "not-allowed" || c === "service-not-allowed") ? "Permite el micrófono para dictar (no funciona en modo incógnito)." : c === "no-speech" ? "No se detectó voz. Intenta de nuevo." : "No se pudo iniciar el dictado."; window.jcmToast && window.jcmToast(m, "info"); };
    dictRef.current = r; try { r.start(); setRecField(k); } catch (e) { window.jcmToast && window.jcmToast("No se pudo iniciar el dictado.", "info"); }
  }
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
  // Atajo: escribe "N" y pulsa ESPACIO → se completa "No refiere" (sin escribirlo a mano).
  const onNoRefiere = k => e => { if (e.key === " " && (f[k] || "").trim().toLowerCase() === "n") { e.preventDefault(); setVal(k, "No refiere"); } };
  const text = (k, ph, only) => <input value={f[k] || ""} onChange={e => setVal(k, e.target.value)} onKeyDown={onNoRefiere(k)} placeholder={ph || "Escribe aquí…"} data-only={only} style={inp()} />;
  const sel = (k, options, ph) => <select value={f[k] || ""} onChange={e => setVal(k, e.target.value)} style={inp()}><option value="">{ph || "— Selecciona —"}</option>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>;
  const chips = (k, options) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{options.map(o => <button key={o} type="button" onClick={() => tokenToggle(k, o)} style={chipBtn(chipActive(k, o))}>{o}</button>)}<button type="button" onClick={() => setVal(k, "No refiere")} style={chipBtn((f[k] || "").trim().toLowerCase() === "no refiere")}>No refiere</button></div>;
  const field = (label, node) => <label style={{ display: "block" }}><span style={lbl}>{label}</span>{node}</label>;
  // Botón rápido "No refiere" para campos de texto libre (alergias, quirúrgicos, etc.).
  const nrBtn = k => <button type="button" onClick={() => setVal(k, "No refiere")} style={{ ...chipBtn((f[k] || "").trim().toLowerCase() === "no refiere"), fontSize: 10.5, padding: "5px 11px", marginTop: 8 }}>No refiere</button>;
  const nrField = (label, k, ph, only) => <div><span style={lbl}>{label}</span>{text(k, ph, only)}{nrBtn(k)}</div>;
  // Barra primero (alineada entre columnas) y los botones debajo, dentro del mismo parámetro.
  const chipField = (label, k, options, ph) => <div><span style={lbl}>{label}</span>{text(k, ph)}{chips(k, options)}</div>;
  // Al seleccionar una zona (mapa o chip) se abre una casilla propia para anotarla.
  const zoneNotes = (zoneKey) => {
    const zs = (f[zoneKey] || "").split(",").map(s => s.trim()).filter(Boolean).filter(z => z.toLowerCase() !== "no refiere");
    if (!zs.length) return <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textFaint, marginTop: 12, padding: "10px 12px", border: "1px dashed " + T.line, borderRadius: 8 }}>Selecciona una zona en el mapa o los chips para abrir su casilla de anotaciones. 👆</div>;
    return <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>{zs.map(z => { const key = "zn_" + zoneKey + "_" + z; return (
      <div key={z} style={{ background: T.bg, border: "1px solid " + T.line, borderRadius: 8, padding: "10px 12px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.accent, marginBottom: 6 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent }} />{z}</span>
        <textarea value={f[key] || ""} onChange={e => setVal(key, e.target.value)} rows={2} placeholder={"Anotaciones de " + z.toLowerCase() + " (producto, unidades, técnica, observación)…"} style={inp({ resize: "vertical" })} />
      </div>
    ); })}</div>;
  };
  const tipo = f.tipo || "general";
  const imc = calcIMC(f.peso, f.talla);
  // Secciones estéticas (piel/hábitos/evaluación facial) solo aplican a ficha General y Facial.
  // Los antecedentes médicos son compartidos y se muestran siempre (misma data clinica.*).
  const showEstetica = tipo === "general" || tipo === "facial";
  // En facial estas secciones se muestran como encabezado desplegable (mismos datos que la general);
  // en general se muestran normales. Evita repetir data ya vista y deja el foco en las zonas.
  const collapsibleCard = (open, setOpen, title, inner) => (
    <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
      <button type="button" onClick={() => setOpen(v => !v)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontFamily: T.serif, fontSize: 16, color: T.text, flex: 1 }}>{title}</span>
        <span style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint }}>{open ? "Ocultar" : "Ver / editar"}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" style={{ transform: open ? "rotate(180deg)" : "none", transition: ".2s" }}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && <div style={{ padding: "0 16px 16px" }}>{inner}</div>}
    </div>
  );
  const sect = (title, inner, open, setOpen) => tipo === "facial"
    ? collapsibleCard(open, setOpen, title, inner)
    : <div style={card}><div style={head}>{title}</div>{inner}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Ficha clínica</div>
        <AdBtn T={T} small primary onClick={() => { try { updatePatient(patient.id, { clinica: f }); setSaved(true); } catch(e) { if(window.jcmError) window.jcmError("Error al guardar la ficha. Intenta de nuevo."); } }}>{saved ? "✓ Guardada" : "Guardar ficha"}</AdBtn>
      </div>
      {/* Selector de tipo de ficha */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {FICHA_TIPOS.map(([k, l]) => <button key={k} type="button" onClick={() => setVal("tipo", k)} style={{ fontFamily: T.sans, fontSize: 12, fontWeight: tipo === k ? 600 : 500, padding: "8px 14px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (tipo === k ? T.accent : T.line), background: tipo === k ? T.accent : "transparent", color: tipo === k ? (T.onAccent || "#fff") : T.textMute }}>{l}</button>)}
      </div>
      {/* Antropometría (Corporal) — compacta y colapsable: peso/talla/IMC en una fila. */}
      {tipo === "corporal" && (
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
          <button type="button" onClick={() => setShowVit(v => !v)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <span style={{ fontFamily: T.serif, fontSize: 16, color: T.text, flex: 1 }}>Peso, talla e IMC {(f.peso && f.talla) ? "· " + f.peso + " kg / " + f.talla + " cm" + (imc ? " · IMC " + imc.v : "") : ""}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" style={{ transform: showVit ? "rotate(180deg)" : "none", transition: ".2s" }}><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {showVit && (
            <div style={{ padding: "0 16px 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {field("Peso (kg)", <input value={f.peso || ""} onChange={e => setVal("peso", e.target.value.replace(/[^0-9.]/g, ""))} inputMode="decimal" placeholder="0" style={inp()} />)}
              {field("Talla (cm)", <input value={f.talla || ""} onChange={e => setVal("talla", e.target.value.replace(/[^0-9.]/g, ""))} inputMode="decimal" placeholder="0" style={inp()} />)}
              {field("IMC (automático)", <div style={inp({ display: "flex", alignItems: "center", justifyContent: "space-between", background: T.surface2 || T.bg })}>{imc ? <><span style={{ color: T.text, fontWeight: 600 }}>{imc.v}</span><span style={{ fontFamily: T.sans, fontSize: 10, color: imc.col }}>{imc.cat}</span></> : <span style={{ color: T.textFaint }}>—</span>}</div>)}
            </div>
          )}
        </div>
      )}
      {/* Zonas faciales (Facial) */}
      {tipo === "facial" && (
        <div style={card}>
          <div style={head}>Zonas faciales a tratar</div>
          <FichaZoneMap T={T} kind="facial" active={t => chipActive("zonasFacial", t)} onToggle={t => tokenToggle("zonasFacial", t)} />
          {chips("zonasFacial", FICHA_ZONAS_FACIAL)}
          {zoneNotes("zonasFacial")}
        </div>
      )}
      {/* Zonas corporales (Corporal) */}
      {tipo === "corporal" && (
        <div style={card}>
          <div style={head}>Zonas corporales a tratar</div>
          <FichaZoneMap T={T} kind="corporal" active={t => chipActive("zonasCorporal", t)} onToggle={t => tokenToggle("zonasCorporal", t)} />
          {chips("zonasCorporal", FICHA_ZONAS_CORPORAL)}
          {zoneNotes("zonasCorporal")}
        </div>
      )}

      {/* Antecedentes médicos — compartidos entre fichas. En facial/corporal se colapsan (ya vistos en la general). */}
      {(() => {
        const grid = (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
            {chipField("Antecedentes mórbidos", "morbidos", ["Hipertensión", "Hipotiroidismo", "Diabetes", "Asma", "Rosácea"], "Otro antecedente…")}
            {nrField("Alergias", "alergias", "Ej. Penicilina, AINEs…", "alpha")}
            {nrField("Antecedentes quirúrgicos", "quirurgicos", "Cirugías previas…")}
            {chipField("Procedimientos estéticos previos", "esteticos", ["Toxina botulínica", "Rinomodelación", "Sculptra", "Radiesse", "Mesoterapia", "Quemadores de grasa"], "Producto / detalle (ej. mesoterapia con…)")}
            {nrField("Hospitalizaciones", "hospital", "—")}
            {nrField("Medicamentos de uso diario", "medicamentos", "—")}
          </div>
        );
        if (tipo === "general") return <div style={card}><div style={head}>Antecedentes médicos</div>{grid}</div>;
        // Facial / Corporal: encabezado desplegable, oculto por defecto.
        return (
          <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
            <button type="button" onClick={() => setShowAnt(v => !v)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontFamily: T.serif, fontSize: 16, color: T.text, flex: 1 }}>Antecedentes médicos</span>
              <span style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint }}>{showAnt ? "Ocultar" : "Ver / editar"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" style={{ transform: showAnt ? "rotate(180deg)" : "none", transition: ".2s" }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {showAnt && <div style={{ padding: "0 16px 16px" }}>{grid}</div>}
          </div>
        );
      })()}

      {showEstetica && <>
      {/* Piel y factores de riesgo — desplegable en facial (mismos datos que la general) */}
      {sect("Piel y factores de riesgo", (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          {nrField("Cicatriz hipertrófica / queloides", "cicatriz", "—")}
          {chipField("Patología dérmica", "dermica", ["Dermatitis atópica", "Rosácea", "Sensibilidad indeterminada"], "Otra patología…")}
          {nrField("Problemas de coagulación", "coagulacion", "—")}
          {nrField("Enfermedades autoinmunes", "autoinmune", "—")}
          {nrField("Historial de herpes labial", "herpes", "—")}
          {field("Exposición solar", sel("expsolar", ["Alta", "Media", "Baja", "No refiere"]))}
          {field("Uso de bloqueador", sel("bloqueador", ["Diario", "2 veces al día", "Cada 4 horas", "No uso", "No refiere"]))}
        </div>
      ), showPiel, setShowPiel)}

      {/* Hábitos — desplegable en facial (mismos datos que la general) */}
      {sect("Hábitos", (<>
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
      </>), showHabitos, setShowHabitos)}

      {/* Evaluación y plan — desplegable en facial (es lo que sí cambia por tipo de ficha) */}
      {sect("Evaluación y plan", (<>
        {[["evaluacion", "Evaluación facial"], ["plan", "Tratamientos recomendados"]].map(([k, label]) => {
          const isPlan = k === "plan";
          const totalU = isPlan ? sumUnits(f.plan) : 0;
          // En "Tratamientos recomendados", al escribir "Total U:" el número se completa solo
          // con la suma de las unidades escritas antes (ej: 20u + 10u + 5u → Total U: 35).
          const onCh = isPlan
            ? e => { let v = e.target.value; v = v.replace(/(total\s*u\s*:?[ \t]*)(\d*)([ \t]*)$/i, (_m, pre) => pre + sumUnits(v)); setVal(k, v); }
            : e => setVal(k, e.target.value);
          const grabando = recField === k;
          return (
            <div key={k} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                <span style={{ ...lbl, marginBottom: 0 }}>{label}</span>
                <button type="button" onClick={() => dictar(k)} title={grabando ? "Detener dictado" : "Dictar por voz"} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, padding: "5px 11px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (grabando ? "#C0285A" : T.line), background: grabando ? "#C0285A" : "transparent", color: grabando ? "#fff" : T.textMute }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
                  {grabando ? "Detener" : "Dictar"}
                </button>
              </div>
              <textarea value={f[k] || ""} onChange={onCh} rows={3} placeholder={isPlan ? 'Ej: 20u frontal, 10u procerus… escribe "Total U:" y se suma solo' : "Escribe o dicta la evaluación…"} style={inp({ resize: "vertical" })} />
              {isPlan && totalU > 0 && <span style={{ display: "inline-block", marginTop: 7, fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: T.accent, background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + (T.accent + "44"), borderRadius: 999, padding: "4px 11px" }}>Σ Total detectado: {totalU} U</span>}
            </div>
          );
        })}
      </>), showEval, setShowEval)}
      </>}
      {/* Historial · timeline con versionado (Área 5) */}
      {(patient.history && patient.history.length > 0) && (
        <div style={card}>
          <div style={head}>Historial de la ficha · {patient.history.length} sesión{patient.history.length === 1 ? "" : "es"}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {patient.history.map((h, i) => {
              const ver = patient.history.length - i; // historia newest-first → versión mayor arriba
              const last = i === patient.history.length - 1;
              return (
                <div key={h.id || i} style={{ position: "relative", paddingLeft: 24, paddingBottom: last ? 0 : 16 }}>
                  <span style={{ position: "absolute", left: 0, top: 3, width: 11, height: 11, borderRadius: "50%", background: T.accent, border: "2px solid " + T.surface }} />
                  {!last && <span style={{ position: "absolute", left: 5, top: 14, bottom: 0, width: 1.5, background: T.line }} />}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 9, fontWeight: 600, letterSpacing: ".06em", color: T.accent, background: T.accentSoft || "rgba(84,112,127,.12)", borderRadius: 999, padding: "2px 8px" }}>v{ver}</span>
                    <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{h.proc || "Sesión"}</span>
                    {h.cobro > 0 && <span style={{ fontFamily: T.sans, fontSize: 11, color: "#1F8A5B" }}>{window.JCDATA ? window.JCDATA.fmt(h.cobro) : "$" + h.cobro}</span>}
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{h.date || ""}{h.prof ? " · " + h.prof : ""}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* helpers compartidos */
function SecHead({ T, title, sub }) {
  const DS = window.JCDS, lux = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  // Scrim de legibilidad (design audit 7.4): todos los títulos de página flotan sobre la foto everest.
  // Un halo suave (oscuro en dark / claro en light) garantiza contraste en cualquier zona de la montaña
  // sin agregar una caja opaca. Al vivir en SecHead, cubre de una a las ~30 vistas del panel.
  const heroShadow = T.dark ? "0 1px 14px rgba(0,0,0,.55)" : "0 1px 14px rgba(255,255,255,.7)";
  if (lux) return <div style={{ marginBottom: DS.sp[6] }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <span style={{ display: "inline-block", width: 26, height: 1, background: T.gold || T.accent }} />
      <span style={{ fontFamily: T.sans, fontSize: DS.ft.eyebrow, fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, textShadow: heroShadow }}>Medique</span>
    </div>
    <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: DS.ft.display, letterSpacing: "-.01em", color: T.text, lineHeight: 1.05, textShadow: heroShadow }}>{title}</h1>
    {sub && <div style={{ ...DS.text(T, "sub"), marginTop: 8, textShadow: heroShadow }}>{sub}</div>}
  </div>;
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

/* ─────────── HORARIOS POR DÍA (editable, sincronizado) ─────────── */
// Genera la grilla de slots posibles (08:00–19:30 cada 30 min, siempre el rango completo).
function _allSlots() { const s=[]; for(let h=8;h<20;h++) ["00","30"].forEach(m=>s.push((h<10?"0":"")+h+":"+m)); return s; }
const _FULL_GRID = _allSlots();

function HorariosEditor({ T }) {
  const D = window.JCDATA;
  // 7 días: hoy + 6 siguientes (igual que el panel móvil).
  const today = new Date(); today.setHours(0,0,0,0);
  const days = Array.from({length:7},(_,i)=>{
    const dt=new Date(today); dt.setDate(today.getDate()+i);
    return { iso:dt.toISOString().slice(0,10), dt, dow:dt.getDay(),
      label:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"][dt.getDay()],
      dd:dt.getDate(), mm:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"][dt.getMonth()] };
  });

  const [selIdx, setSelIdx] = useState(0);
  const [slots, setSlots] = useState([]);
  const [open, setOpen] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  // Sección plantilla semanal colapsable.
  const [showPlantilla, setShowPlantilla] = useState(false);
  const [tmplWd, setTmplWd] = useState(1);
  const [tmplSlots, setTmplSlots] = useState([]);
  const [tmplOpen, setTmplOpen] = useState(true);
  const [tmplSaved, setTmplSaved] = useState(false);

  const day = days[selIdx];

  // Leer slots para el día seleccionado (horarios_dates primero, luego plantilla).
  useEffect(() => {
    const avail = D.availForDate ? D.availForDate(day.dt) : D.availability(day.dow);
    setOpen(avail.open !== false);
    setSlots((avail.slots || []).slice());
    setSaved(false);
  }, [selIdx]);

  // Leer plantilla cuando cambia el día de la semana.
  useEffect(() => {
    const a = D.availability(tmplWd); setTmplOpen(a.open !== false); setTmplSlots((a.slots||[]).slice()); setTmplSaved(false);
  }, [tmplWd]);

  // Citas del día seleccionado (para marcar con cita y no permitir desbloquear).
  const appts = (() => { try { const a=(window.DB&&window.DB.get("appointments"))||[]; return Array.isArray(a)?a:[]; } catch(e){return[];} })();
  const dayAppts = appts.filter(a => a.fecha===day.iso && a.status!=="anulada" && a.status!=="cancelada");
  const bookedSet = new Set();
  { const _m = t => { const [h,m]=(t||"0:0").split(":").map(Number); return h*60+(m||0); };
    dayAppts.forEach(a => { if(!a.time) return; const st=_m(a.time), dur=parseInt(a.dur)||30; _FULL_GRID.forEach(s=>{ if(_m(s)>=st&&_m(s)<st+dur) bookedSet.add(s); }); }); }

  function toggle(s) {
    if (bookedSet.has(s)) return;
    setSlots(slots.includes(s)?slots.filter(x=>x!==s):[...slots,s].sort());
    setSaved(false);
  }
  function openAll() { setSlots(_FULL_GRID.slice()); setSaved(false); }
  function closeAll() { setSlots([]); setSaved(false); }

  // Guarda como override por fecha Y publica a Firebase para sincronizar todo.
  async function save() {
    setSaving(true);
    D.saveDateSlots(day.iso, open ? slots : []);
    if (D.rebuildSchedule) D.rebuildSchedule();
    try { window.JCSAAS && window.JCSAAS.publishProfile && await window.JCSAAS.publishProfile(); } catch(e) {}
    setSaved(true); setSaving(false);
  }

  function saveTemplate() {
    D.saveHorarios(tmplWd, { open: tmplOpen, slots: tmplSlots });
    if (D.rebuildSchedule) D.rebuildSchedule();
    setTmplSaved(true);
  }

  const disp = open ? slots.filter(s=>!bookedSet.has(s)).length : 0;
  const bloq  = open ? _FULL_GRID.filter(s=>!slots.includes(s)&&!bookedSet.has(s)).length : _FULL_GRID.length;
  const DOT = (c) => <span style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:c,flexShrink:0}} />;
  const btnBase = { fontFamily:T.sans,fontSize:11,padding:"6px 12px",borderRadius:999,cursor:"pointer",border:"1px solid "+T.line,background:T.chipBg||T.surface,color:T.textMute };
  const DOW7=[["Lunes",1],["Martes",2],["Miércoles",3],["Jueves",4],["Viernes",5],["Sábado",6],["Domingo",0]];

  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div style={luxF ? { ...DS.card(T), padding: "18px 20px", marginBottom: 14 } : { background:T.surface,border:"1px solid "+T.line,borderRadius:8,padding:"16px",marginBottom:14 }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
        <div style={luxF ? DS.text(T, "eyebrow") : { fontFamily:T.sans,fontSize:10,letterSpacing:".2em",textTransform:"uppercase",color:T.accent }}>Horarios disponibles por día</div>
        <AdBtn T={T} small primary onClick={save}>{saving?"Publicando…":saved?"✓ Publicado":"Guardar y publicar"}</AdBtn>
      </div>

      {/* Tabs de fecha */}
      <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginBottom:12 }}>
        {days.map((d,i)=>(
          <button key={d.iso} onClick={()=>{setSelIdx(i);setSaved(false);}} style={{
            fontFamily:T.sans,fontSize:11,padding:"7px 11px",borderRadius:999,cursor:"pointer",
            background:selIdx===i?T.text:T.surface,color:selIdx===i?T.bg:T.textMute,
            border:"1px solid "+(selIdx===i?T.text:T.line)
          }}>{i===0?"Hoy":d.label} {d.dd}</button>
        ))}
      </div>

      {/* Stats + acciones globales */}
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12,flexWrap:"wrap" }}>
        <div style={{ display:"flex",alignItems:"center",gap:5,fontFamily:T.sans,fontSize:11,color:T.textMute }}>
          {DOT("#1F8A5B")}&nbsp;{disp} disponibles
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:5,fontFamily:T.sans,fontSize:11,color:T.textMute }}>
          {DOT("#C0285A")}&nbsp;{bloq} bloqueadas
        </div>
        {dayAppts.length>0&&<div style={{ display:"flex",alignItems:"center",gap:5,fontFamily:T.sans,fontSize:11,color:T.textMute }}>
          {DOT("#C49A6A")}&nbsp;{dayAppts.length} con cita
        </div>}
        <div style={{ flex:1 }} />
        <button onClick={openAll} style={btnBase}>Abrir todo</button>
        <button onClick={closeAll} style={{...btnBase,color:"#C0285A",borderColor:"#C0285A44"}}>Bloquear todo</button>
      </div>

      {/* Toggle día abierto/cerrado */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0 14px",borderBottom:"1px solid "+T.lineSoft,marginBottom:14 }}>
        <span style={{ fontFamily:T.sans,fontSize:13,color:T.text }}>{open?"Día abierto":"Día cerrado"}</span>
        <AdSwitch T={T} on={open} onClick={()=>{setOpen(!open);setSaved(false);}} />
      </div>

      {/* Grilla de slots */}
      {open && (
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7 }}>
          {_FULL_GRID.map(s=>{
            const isBooked = bookedSet.has(s);
            const isOpen   = slots.includes(s);
            return (
              <button key={s} onClick={()=>toggle(s)} disabled={isBooked}
                style={{ padding:"9px 4px",borderRadius:5,cursor:isBooked?"default":"pointer",
                  fontFamily:T.sans,fontSize:12,lineHeight:1.3,fontWeight:500,
                  background:isBooked?"rgba(196,154,106,.15)":(isOpen?"#1F8A5B":"rgba(192,40,90,.10)"),
                  color:isBooked?"#C49A6A":(isOpen?"#fff":"#C0285A"),
                  border:"1px solid "+(isBooked?"rgba(196,154,106,.5)":(isOpen?"#1F8A5B":"rgba(192,40,90,.35)")) }}>
                {s}{isBooked&&<div style={{fontSize:9,opacity:.8}}>cita</div>}
              </button>
            );
          })}
        </div>
      )}

      <div style={{ display:"flex",alignItems:"center",gap:14,marginTop:12,flexWrap:"wrap" }}>
        <span style={{ display:"flex",alignItems:"center",gap:6,fontFamily:T.sans,fontSize:10.5,color:T.textMute }}><span style={{width:11,height:11,borderRadius:3,background:"#1F8A5B"}} />Hora abierta</span>
        <span style={{ display:"flex",alignItems:"center",gap:6,fontFamily:T.sans,fontSize:10.5,color:T.textMute }}><span style={{width:11,height:11,borderRadius:3,background:"rgba(192,40,90,.10)",border:"1px solid rgba(192,40,90,.35)"}} />Hora cerrada</span>
        <span style={{ display:"flex",alignItems:"center",gap:6,fontFamily:T.sans,fontSize:10.5,color:T.textMute }}><span style={{width:11,height:11,borderRadius:3,background:"rgba(196,154,106,.15)",border:"1px solid rgba(196,154,106,.5)"}} />Con cita</span>
      </div>
      <p style={{ fontFamily:T.sans,fontSize:10.5,color:T.textFaint,marginTop:10,lineHeight:1.5 }}>
        Toca cada hora para abrirla (verde) o cerrarla (rojo). "Guardar y publicar" lo sincroniza con la app de pacientes y el link de reserva.
      </p>
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
  async function delTask(id) { if (await (window.jcmConfirm || window.confirm)("¿Eliminar esta tarea?", {danger: true})) saveTasks(tasks.filter(t => t.id !== id)); }
  const tPend = tasks.filter(t => !t.done), tDone = tasks.filter(t => t.done);
  const taskCard = t => (
    <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "10px 12px" }}>
      <button onClick={() => toggleTask(t.id)} title={t.done ? "Reabrir" : "Completar"} style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 5, border: "1.5px solid " + (t.done ? "#4E8A72" : T.chipBorder), background: t.done ? "#4E8A72" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>{t.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>}</button>
      <span style={{ flex: 1, fontFamily: T.sans, fontSize: 13, color: t.done ? T.textFaint : T.text, textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
      <button onClick={() => delTask(t.id)} title="Eliminar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 2 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
    </div>
  );
  const sinConsent = (window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter(p => !p.consent));
  const recitas = (window.recitaDue ? window.recitaDue(patients) : []);
  // Consentimientos firmados hace más de 1 año → sugerir renovación
  const oneYear = Date.now() - 365 * 24 * 3600 * 1000;
  const porRenovar = patients.filter(p => p.consent && p.consentTs && p.consentTs < oneYear);
  const otrosPend = sinConsent.length + recitas.length + porRenovar.length;
  const totalPend = tPend.length + otrosPend;
  return (
    <div>
      <SecHead T={T} title="Pendientes" sub="Tareas generales del equipo y seguimientos clínicos." />
      {/* Tareas del equipo: agregar + dos columnas (Pendientes / Completadas) */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder="Nuevo pendiente…" style={{ flex: 1, fontFamily: T.sans, fontSize: 13, padding: "11px 14px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none" }} />
        <button onClick={addTask} style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "0 18px", cursor: "pointer", whiteSpace: "nowrap" }}>+ Agregar</button>
      </div>
      {(() => {
        const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
        const panel = luxF ? { ...DS.card(T), padding: "16px 18px" } : { background: T.surface2, border: "1px solid " + T.line, borderRadius: 10, padding: 14 };
        const heading = luxF ? DS.text(T, "title") : { fontFamily: T.serif, fontSize: 15, color: T.text, marginBottom: 10 };
        return (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
            <div style={panel}>
              <div style={{ ...heading, marginBottom: 10 }}>Pendientes ({totalPend})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{tPend.length ? tPend.map(taskCard) : (otrosPend > 0 ? <Empty2 T={T}>Sin tareas manuales. Abajo tienes {sinConsent.length} consentimiento(s) y {recitas.length} re-cita(s) por gestionar.</Empty2> : <Empty2 T={T}>Nada pendiente. 🎉</Empty2>)}</div>
            </div>
            <div style={panel}>
              <div style={{ ...heading, marginBottom: 10 }}>Completadas ({tDone.length})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{tDone.length ? tDone.map(taskCard) : <Empty2 T={T}>Aún nada completado.</Empty2>}</div>
            </div>
          </div>
        );
      })()}
      <Group T={T} title={"Consentimientos por firmar (" + sinConsent.length + ")"}>
        {sinConsent.map(p => <PendRow key={p.id} T={T} name={p.name} desc={(p.tags && p.tags[0]) || "Paciente"} action="Ir a consentimientos" onClick={() => openP(p.id, "consent")} onDelete={() => updatePatient(p.id, { consent: true, consentInfo: "Marcado como firmado", consentTs: Date.now() })} />)}
        {!sinConsent.length && <Empty2 T={T}>Todo firmado.</Empty2>}
      </Group>
      <Group T={T} title={"Consentimientos por renovar · +1 año (" + porRenovar.length + ")"}>
        {porRenovar.map(p => { const meses = Math.floor((Date.now() - p.consentTs) / (30 * 24 * 3600 * 1000)); return <PendRow key={p.id} T={T} name={p.name} desc={"Firmado hace " + meses + " meses · " + (p.consentInfo || "Consentimiento")} action="Renovar" onClick={() => openP(p.id, "consent")} />; })}
        {!porRenovar.length && <Empty2 T={T}>Todos los consentimientos están vigentes.</Empty2>}
      </Group>
      <Group T={T} title={"Re-citar · esquema en curso (" + recitas.length + ")"}>
        {recitas.map(({ p, r }) => <PendRow key={p.id} T={T} name={p.name} desc={r.motivo + " · " + r.precioFmt + " → " + r.descFmt} action="WhatsApp" href={window.recitaWa ? window.recitaWa(p, r) : ("https://wa.me/" + (p.phone || "").replace(/\D/g, ""))} />)}
        {!recitas.length && <Empty2 T={T}>Sin re-citas por contactar hoy.</Empty2>}
      </Group>
      {/* Se quitaron las secciones "Mensajes de WhatsApp por responder", "Comentarios en Business
          Manager" y "Seguimientos": eran listas SIEMPRE vacías (hardcodeadas a []), nunca se
          poblaban, y solo agregaban ruido de secciones permanentemente vacías. Prefiere eliminar
          antes que mostrar bandejas muertas. */}
    </div>
  );
}
function Group({ T, title, children }) { return <div style={{ marginBottom: 20 }}><div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>{title}</div><div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div></div>; }
function Empty2({ T, children }) {
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return <div style={luxF ? { ...DS.text(T, "sub"), color: T.textFaint, padding: "4px 0", lineHeight: 1.5 } : { fontFamily: T.sans, fontSize: 12, color: T.textFaint, padding: "4px 0" }}>{children}</div>;
}
function PendRow({ T, name, desc, action, onClick, href, onDelete }) {
  const xBtn = onDelete ? React.createElement("button", {
    key: "x", onClick: e => { e.stopPropagation(); e.preventDefault(); onDelete(); },
    title: "Marcar como hecho",
    style: { flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: "4px 6px", display: "flex", alignItems: "center", borderRadius: 4 }
  }, React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 },
    React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))) : null;
  const inner = [
    React.createElement("div", { key: "a", style: { flex: 1, minWidth: 0 } },
      React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, name),
      React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, desc)),
    React.createElement("span", { key: "b", style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, whiteSpace: "nowrap" } }, action + " →"),
    xBtn
  ].filter(Boolean);
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const st = luxF ? { ...DS.card(T), display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", cursor: "pointer", textDecoration: "none" } : { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer", textDecoration: "none" };
  return href
    ? React.createElement("a", { href: href, target: "_blank", rel: "noopener", style: st }, inner)
    : React.createElement("button", { onClick: onClick, style: { ...st, width: "100%", textAlign: "left" } }, inner);
}

/* ─────────── SALA DE ESPERA (kanban) ─────────── */
const WAIT_COLS = [["porllegar", "Por llegar"], ["espera", "En espera"], ["atencion", "En atención"], ["fin", "Finalizado"]];
function SalaEsperaView({ T, appts, patients, updatePatient }) {
  // "Hoy" se determina por la FECHA real de la cita (a.fecha), no por a.day (que es relativo y
  // queda desfasado). Se excluyen anuladas y no-asistió.
  const _t0 = new Date(); _t0.setHours(0, 0, 0, 0);
  const esHoy = a => { if (a.fecha) { const t = new Date(a.fecha + "T00:00:00"); return !isNaN(t.getTime()) && t.getTime() === _t0.getTime(); } return a.day === 0; };
  const hoy = appts.filter(a => esHoy(a) && a.status !== "anulada" && a.status !== "cancelada" && a.status !== "no_asistio");
  const [status, setStatus] = useState(() => { try { return DB.get("waiting_status") || {}; } catch (e) { return {}; } });
  function setS(id, st) { const n = { ...status, [id]: st }; setStatus(n); try { DB.set("waiting_status", n); } catch (e) {} }
  // Por defecto, una cita agendada de hoy aparece en "Por llegar" (aún no llega el paciente).
  const stOf = a => status[a.id] || "porllegar";
  const next = st => ({ porllegar: "espera", espera: "atencion", atencion: "fin" })[st];
  const lbl = { porllegar: "Marcar llegada", espera: "Pasar a atención", atencion: "Finalizar" };
  const today = new Date().toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  // Color por estado del flujo (mismo criterio que la agenda): por llegar = ámbar (esperando), en
  // espera = navy, en atención = verde, finalizado = apagado. Hace el kanban escaneable de un vistazo.
  const colOf = k => ({ porllegar: "#C9A227", espera: T.accent, atencion: "#1F8A5B", fin: T.textFaint })[k] || T.accent;
  function eliminarDeSala(a) {
    const st = stOf(a);
    const n = { ...status, [a.id]: "eliminado" };
    setStatus(n);
    try { DB.set("waiting_status", n); } catch (e) {}
    if (updatePatient && st !== "fin") {
      const pat = patients && patients.find(p => p.name === a.name);
      if (pat && pat.campaign) {
        const meta_estado = st === "porllegar" ? "no_asistio" : "no_compro";
        updatePatient(pat.id, { campaign: { ...pat.campaign, meta_estado } });
      }
    }
  }
  return (
    <div>
      <SecHead T={T} title="Sala de espera" sub={"Pacientes de hoy, " + today + ". Actualiza el estado a medida que llegan y se atienden."} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {WAIT_COLS.map(([k, l]) => {
          const items = hoy.filter(a => stOf(a) === k && status[a.id] !== "eliminado");
          const cc = colOf(k);
          return (
            <div key={k} style={luxF ? { ...DS.card(T), padding: 12, minHeight: 200 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: 12, minHeight: 200 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: cc }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: cc, flexShrink: 0 }} />{l}
                </span>
                <span style={{ fontFamily: T.serif, fontSize: 16, color: items.length ? cc : T.textFaint }}>{items.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map(a => (
                  <div key={a.id} style={luxF ? { background: T.bg, border: "1px solid " + T.line, borderLeft: "3px solid " + cc, borderRadius: DS.r.ctl, padding: "10px 12px" } : { background: T.bg, border: "1px solid " + T.line, borderLeft: "3px solid " + cc, borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <Avatar T={T} name={a.name} size={30} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{a.time}{a.proc ? " · " + a.proc : ""}</div>
                      </div>
                      <button onClick={() => eliminarDeSala(a)} title="Quitar de sala de espera" style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: "2px 3px", display: "flex", borderRadius: 4, marginTop: -1 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                    {next(k) && <button onClick={() => setS(a.id, next(k))} style={{ marginTop: 8, width: "100%", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: cc, background: cc + "1c", border: "none", borderRadius: 6, padding: "7px", cursor: "pointer" }}>{lbl[k]} →</button>}
                  </div>
                ))}
                {!items.length && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, fontStyle: "italic", padding: "6px 2px" }}>Sin pacientes</div>}
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
  { id: "r24", t: "Recordatorio de cita (24 h antes)", d: "Envía un correo a los pacientes (con email) 24 h antes de su cita para confirmar asistencia. WhatsApp próximamente.", on: true, ch: "Email", ic: "clock", email: true },
  { id: "rmorning", t: "Recordatorio el día de la cita", d: "El día de la cita, envía un correo recordando la hora a los pacientes con email. WhatsApp próximamente.", on: true, ch: "Email", ic: "sun", email: true },
  { id: "rind", t: "Indicaciones post tratamiento", d: "Al finalizar la atención, envía por WhatsApp las indicaciones y cuidados del procedimiento realizado.", on: true, ch: "WhatsApp", ic: "chat" },
  { id: "rpost", t: "Seguimiento de tratamiento (14 días)", d: "Mensaje automático a los 14 días para control de resultados.", on: false, ch: "WhatsApp", ic: "chat" },
  { id: "rbday", t: "Saludo de cumpleaños", d: "Envía un mensaje felicitando al paciente en su cumpleaños.", on: false, ch: "Email", ic: "gift" },
  { id: "rreview", t: "Solicitud de encuesta", d: "Se envía por WhatsApp junto con las indicaciones post tratamiento: al final del mensaje se incluye tu enlace para responder la encuesta de satisfacción.", on: false, ch: "WhatsApp", ic: "star", bundle: "indicaciones" },
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
  // Automatizaciones de correo PROPIAS (las ejecuta el cron diario). Persisten en DB.custom_automations.
  const [autos, setAutos] = useState(() => { try { return (window.DB && window.DB.get("custom_automations")) || []; } catch (e) { return []; } });
  const [editAuto, setEditAuto] = useState(null);
  function persistAutos(n) { setAutos(n); try { window.DB && window.DB.set("custom_automations", n); } catch (e) {} }
  function saveAuto(a) { const exists = a.id && autos.find(x => x.id === a.id); persistAutos(exists ? autos.map(x => x.id === a.id ? a : x) : [...autos, { ...a, id: "auto" + Date.now() }]); setEditAuto(null); try { window.jcmToast && window.jcmToast("Automatización guardada.", "ok"); } catch (e) {} }
  async function delAuto(id) { if (!(await (window.jcmConfirm || window.confirm)("¿Eliminar esta automatización?", { danger: true }))) return; persistAutos(autos.filter(x => x.id !== id)); }
  function toggleAuto(id) { persistAutos(autos.map(x => x.id === id ? { ...x, on: !x.on } : x)); }
  const autoWhen = a => (a.dir === "after" ? (a.days + " día" + (a.days === 1 ? "" : "s") + " después") : (a.days === 0 ? "el día de la cita" : a.days + " día" + (a.days === 1 ? "" : "s") + " antes"));
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <SecHead T={T} title="Automatizaciones" sub="Configura recordatorios y mensajes automáticos para tus pacientes." />
      <div style={{ background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>
        El envío real de WhatsApp/Email/SMS se ejecuta desde el servidor (Medique). Aquí configuras y visualizas las reglas.
      </div>
      {/* Automatizaciones de correo propias (las ejecuta el cron diario) — arriba, con su botón "+ Nueva automatización" siempre a la vista, sin scrollear al final. */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
          <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>Mis automatizaciones de correo</div>
          <AdBtn T={T} primary onClick={() => setEditAuto("new")}>+ Nueva automatización</AdBtn>
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12, lineHeight: 1.5 }}>Crea recordatorios o seguimientos por correo a tu medida. El servidor los envía solo (1×/día) a los pacientes con cita en la fecha que definas. Las anuladas se saltan. (WhatsApp a medida requiere conectar Meta.)</div>
        {autos.length === 0
          ? <Empty2 T={T}>Aún no creaste automatizaciones propias. Usa "+ Nueva automatización".</Empty2>
          : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {autos.map(a => (
                <div key={a.id} style={luxF ? { display: "flex", alignItems: "center", gap: 10, ...DS.card(T), padding: "12px 15px", borderColor: a.on !== false ? T.accent + "55" : T.line } : { display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + (a.on !== false ? T.accent + "55" : T.line), borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text }}>{a.name || "Sin nombre"}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>📧 {autoWhen(a)} · "{a.subject || "(sin asunto)"}"</div>
                  </div>
                  <AdSwitch T={T} on={a.on !== false} onClick={() => toggleAuto(a.id)} />
                  <button onClick={() => setEditAuto(a)} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }}>Editar</button>
                  <button onClick={() => delAuto(a.id)} title="Eliminar" style={{ flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
                </div>
              ))}
            </div>}
      </div>
      <NotificacionesCard T={T} />
      <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text, marginBottom: 10 }}>Recordatorios automáticos</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
        {rules.map((r, ri) => {
          const cc = AUTO_CH_COLOR[r.ch] || T.accent;
          return (
            <div key={r.id} style={luxF
              ? { ...DS.card(T), padding: "18px 18px 16px", position: "relative", borderColor: r.on ? T.accent + "55" : T.line, ...DS.reveal(ri) }
              : { background: T.surface, border: "1px solid " + (r.on ? T.accent + "55" : T.line), borderRadius: 14, padding: "18px 18px 16px", position: "relative" }}>
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
              {r.on && <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginTop: 12, paddingTop: 10, borderTop: "1px solid " + T.lineSoft }}>
                {r.email
                  ? <span style={{ fontFamily: T.sans, fontSize: 10.5, color: "#1F8A5B", display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1F8A5B" }} /> Activo · por correo</span>
                  : <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#caa86a" }} /> Pendiente · requiere WhatsApp</span>}
              </div>}
            </div>
          );
        })}
      </div>
      {editAuto && <AutoBuilderModal T={T} auto={editAuto === "new" ? null : editAuto} onClose={() => setEditAuto(null)} onSave={saveAuto} />}
    </div>
  );
}

const AUTO_VARS = ["{nombre}", "{fecha}", "{hora}", "{tratamiento}", "{clinica}"];
function AutoBuilderModal({ T, auto, onClose, onSave }) {
  const [f, setF] = useState(() => auto ? { ...auto } : { name: "", dir: "before", days: 1, subject: "", body: "", on: true });
  const ok = (f.name || "").trim().length > 1 && (f.subject || "").trim().length > 0 && (f.body || "").trim().length > 0;
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  const dayOpts = f.dir === "before" ? [0, 1, 2, 3, 5, 7] : [1, 2, 3, 7, 14, 30];
  return (
    <AdModal T={T} title={auto ? "Editar automatización" : "Nueva automatización de correo"} onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave({ ...f, days: parseInt(f.days, 10) || 0 })}>Guardar automatización</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AdField T={T} label="Nombre (interno)" value={f.name} onChange={v => setF({ ...f, name: v })} placeholder="Ej: Seguimiento post-tratamiento" />
        <div>
          <span style={lbl}>Disparador</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <select value={f.dir} onChange={e => setF({ ...f, dir: e.target.value })} style={inp}><option value="before">Antes de la cita</option><option value="after">Después de la cita</option></select>
            <select value={f.days} onChange={e => setF({ ...f, days: parseInt(e.target.value, 10) })} style={inp}>{dayOpts.map(d => <option key={d} value={d}>{d === 0 ? "El mismo día" : d + " día" + (d === 1 ? "" : "s")}</option>)}</select>
          </div>
        </div>
        <AdField T={T} label="Asunto del correo" value={f.subject} onChange={v => setF({ ...f, subject: v })} placeholder="Ej: ¿Cómo te fue con tu tratamiento?" />
        <label><span style={lbl}>Mensaje</span><textarea value={f.body} onChange={e => setF({ ...f, body: e.target.value })} rows={5} placeholder="Hola {nombre}, …" style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} /></label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {AUTO_VARS.map(v => <button key={v} type="button" onClick={() => setF(s => ({ ...s, body: (s.body || "") + v }))} style={{ fontFamily: T.sans, fontSize: 11, padding: "5px 10px", borderRadius: 999, cursor: "pointer", border: "1px solid " + T.line, background: "transparent", color: T.accent }}>+ {v}</button>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "11px 14px", borderRadius: 8, background: T.surface2 || T.surface, border: "1px solid " + T.line }}>
          <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>Automatización activa</span>
          <AdSwitch T={T} on={f.on !== false} onClick={() => setF({ ...f, on: !(f.on !== false) })} />
        </div>
      </div>
    </AdModal>
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
    <div onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
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
// Canales de la bandeja unificada (Agente IA). Cada conversación trae c.channel ("whatsapp" por defecto).
const INBOX_CHANNELS = [
  { id: "whatsapp", name: "WhatsApp", color: "#1F8A5B", desc: "Mensajes y recordatorios por WhatsApp" },
  { id: "instagram", name: "Instagram", color: "#E1306C", desc: "DMs y comentarios de Instagram" },
  { id: "facebook", name: "Facebook", color: "#1877F2", desc: "Mensajes de Messenger y comentarios de Facebook" }
];
function chanOf(c) { return (c && c.channel) || "whatsapp"; }
function chanMeta(id) { return INBOX_CHANNELS.find(x => x.id === id) || INBOX_CHANNELS[0]; }

/* ─────────── ASISTENTE IA · configuración + playground (Área 12) ─────────── */
const COPILOT_TONOS = ["Cercano", "Profesional", "Formal", "Divertido"];
const COPILOT_ACCIONES = [["agendar", "Agendar y reagendar citas"], ["buscar", "Buscar pacientes y fichas"], ["venta", "Registrar ventas en caja"], ["stats", "Consultar estadísticas"], ["dudas", "Responder dudas de tratamientos"]];
function loadAgentCfg() {
  try { const v = window.DB && window.DB.get("agent_cfg"); if (v && typeof v === "object") return v; } catch (e) {}
  return { name: "Medi", tono: "Cercano", prompt: "Eres el asistente virtual de {clinica}. Atiendes con calidez y criterio clínico, resuelves dudas de tratamientos estéticos y ayudas a agendar. Nunca das diagnósticos médicos definitivos; ante dudas clínicas, derivas al profesional.", acciones: { agendar: true, buscar: true, venta: false, stats: true, dudas: true } };
}
function CopilotConfigView({ T }) {
  // Configuración exclusiva de la cuenta super-admin de la plataforma (medique.cl@gmail.com), que
  // lo configura para el resto de las clínicas. Doble resguardo: el nav ya lo oculta, esto cubre
  // el acceso directo por URL/atrás del navegador.
  if (!(window.jcmIsSuperAdmin ? window.jcmIsSuperAdmin() : true)) {
    return (
      <div>
        <SecHead T={T} title="Asistente IA" sub="Personaliza tu copiloto: nombre, personalidad, tono y qué puede hacer" />
        <div style={{ background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "32px 24px", textAlign: "center", maxWidth: 520 }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6 }}>La configuración del Asistente IA la administra el equipo de Medique de forma centralizada para todas las clínicas. Si necesitas ajustar algo, escríbenos.</div>
        </div>
      </div>
    );
  }
  const [cfg, setCfg] = useState(loadAgentCfg);
  const [saved, setSaved] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  function up(patch) { setCfg(c => ({ ...c, ...patch })); setSaved(false); }
  function save() { try { window.DB && window.DB.set("agent_cfg", cfg); } catch (e) {} setSaved(true); try { window.jcmToast && window.jcmToast("Asistente guardado.", "ok"); } catch (e) {} }
  function send() {
    const t = draft.trim(); if (!t || busy) return;
    const next = [...msgs, { role: "user", content: t }];
    setMsgs(next); setDraft("");
    if (!window.mediqueAI) { setMsgs([...next, { role: "assistant", content: "(Demo) Conecta GROQ_API_KEY en el servidor para que el asistente responda de verdad. Con la configuración actual, " + cfg.name + " respondería en tono " + cfg.tono.toLowerCase() + "." }]); return; }
    setBusy(true);
    const clinica = (window.clinicName && window.clinicName()) || "la clínica";
    const clinic = {
      name: clinica, address: (window.clinicAddr && window.clinicAddr()) || "",
      hours: (() => { try { return DB.cfg().clinic_hours || ""; } catch (e) { return ""; } })(),
      services: (window.clinicServiceList ? window.clinicServiceList() : []).slice(0, 30),
      branches: ((window.DB && window.DB.get("sucursales")) || []).map(s => s.addr ? (s.name + " (" + s.addr + ")") : s.name).filter(Boolean),
      agentName: cfg.name, agentTone: cfg.tono, agentPrompt: (cfg.prompt || "").replace(/\{clinica\}/g, clinica)
    };
    window.mediqueAI(next, clinic).then(res => {
      setBusy(false);
      if (res && res.ok && res.reply) setMsgs(m => [...m, { role: "assistant", content: res.reply }]);
      else if (res && res.configured === false) setMsgs(m => [...m, { role: "assistant", content: "Conecta tu API Key (GROQ_API_KEY) en el servidor para activar el asistente." }]);
      else setMsgs(m => [...m, { role: "assistant", content: "No pude responder ahora. Intenta de nuevo." }]);
    });
  }
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const copCard = luxF ? { ...DS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <SecHead T={T} title="Asistente IA" sub="Personaliza tu copiloto: nombre, personalidad, tono y qué puede hacer" />
        <AdBtn T={T} primary onClick={save}>{saved ? "✓ Guardado" : "Guardar asistente"}</AdBtn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 16, alignItems: "start" }}>
        {/* Configuración */}
        <div style={copCard}>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 14 }}>Personalidad</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div><span style={lbl}>Nombre del asistente</span><input value={cfg.name} onChange={e => up({ name: e.target.value })} placeholder="Ej: Medi" style={inp} /></div>
              <div><span style={lbl}>Tono</span><select value={cfg.tono} onChange={e => up({ tono: e.target.value })} style={inp}>{COPILOT_TONOS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            </div>
            <label><span style={lbl}>Instrucciones / personalidad (prompt)</span><textarea value={cfg.prompt} onChange={e => up({ prompt: e.target.value })} rows={5} placeholder="Describe cómo debe comportarse…" style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} /><span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, display: "block", marginTop: 6 }}>Usa {"{clinica}"} para insertar el nombre de tu clínica.</span></label>
            <div>
              <span style={lbl}>Acciones que puede ejecutar</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                {COPILOT_ACCIONES.map(([k, l]) => { const on = !!(cfg.acciones || {})[k]; return (
                  <div key={k} onClick={() => up({ acciones: { ...cfg.acciones, [k]: !on } })} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px", borderRadius: 8, background: T.surface2 || T.bg, border: "1px solid " + T.line, cursor: "pointer" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{l}</span>
                    <AdSwitch T={T} on={on} onClick={() => up({ acciones: { ...cfg.acciones, [k]: !on } })} />
                  </div>
                ); })}
              </div>
            </div>
          </div>
        </div>
        {/* Playground */}
        <div style={{ ...copCard, display: "flex", flexDirection: "column", minHeight: 420 }}>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 14 }}>Playground · prueba a {cfg.name || "tu asistente"}</div>
          <div className="jc-scroll" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {msgs.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint, lineHeight: 1.5, margin: "auto 0", textAlign: "center", padding: "0 16px" }}>Escríbele como si fueras un paciente y prueba cómo responde con la personalidad y tono que configuraste.</div>}
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", background: m.role === "user" ? T.accent : (T.surface2 || T.bg), color: m.role === "user" ? (T.onAccent || "#fff") : T.text, border: "1px solid " + (m.role === "user" ? T.accent : T.line), borderRadius: 12, padding: "9px 13px", fontFamily: T.sans, fontSize: 12.5, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{m.content}</div>
            ))}
            {busy && <div style={{ alignSelf: "flex-start", fontFamily: T.sans, fontSize: 12, color: T.textMute, padding: "4px 6px" }}>{cfg.name} está escribiendo…</div>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); send(); } }} placeholder="Escribe un mensaje de prueba…" style={{ ...inp, flex: 1 }} />
            <AdBtn T={T} primary onClick={send}>Enviar</AdBtn>
          </div>
        </div>
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
  const [showGuide, setShowGuide] = useState(false); // guía de activación de WhatsApp
  const [showMetaGuide, setShowMetaGuide] = useState(false); // guía de Instagram/Facebook (Meta)
  const [chan, setChan] = useState("todos"); // filtro de canal
  const shown = chan === "todos" ? convs : convs.filter(c => chanOf(c) === chan);
  const conv = convs.find(c => c.id === sel);
  function openGuideFor(ch) { if (ch === "whatsapp") setShowGuide(true); else setShowMetaGuide(true); }
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
    const _ac = (() => { try { return (window.DB && window.DB.get("agent_cfg")) || {}; } catch (e) { return {}; } })();
    const _cn = (window.clinicName && window.clinicName()) || "";
    const clinic = {
      name: _cn,
      address: (window.clinicAddr && window.clinicAddr()) || "",
      hours: (() => { try { return DB.cfg().clinic_hours || ""; } catch (e) { return ""; } })(),
      services: (window.clinicServiceList ? window.clinicServiceList() : []).slice(0, 30),
      branches: ((window.DB && window.DB.get("sucursales")) || []).map(s => s.addr ? (s.name + " (" + s.addr + ")") : s.name).filter(Boolean),
      agentName: _ac.name || "", agentTone: _ac.tono || "", agentPrompt: (_ac.prompt || "").replace(/\{clinica\}/g, _cn)
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
        <SecHead T={T} title="Agente IA · Bandeja unificada" sub="WhatsApp, Instagram y Facebook en un solo lugar, con respuestas asistidas por IA." />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.gold, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "5px 11px", display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: T.gold }} /> Pendiente · conecta tus canales</span>
        </div>
      </div>
      {/* Filtro por canal */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0 4px" }}>
        {[{ id: "todos", name: "Todos", color: T.accent }].concat(INBOX_CHANNELS).map(ch => {
          const on = chan === ch.id;
          const n = ch.id === "todos" ? convs.length : convs.filter(c => chanOf(c) === ch.id).length;
          return (
            <button key={ch.id} onClick={() => setChan(ch.id)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 12, fontWeight: 500, padding: "7px 13px", borderRadius: 999, cursor: "pointer", background: on ? ch.color : "transparent", color: on ? "#fff" : T.textMute, border: "1px solid " + (on ? ch.color : T.line) }}>
              {ch.id !== "todos" && <span style={{ width: 7, height: 7, borderRadius: "50%", background: on ? "#fff" : ch.color }} />}
              {ch.name}<span style={{ opacity: .7, fontSize: 11 }}>{n}</span>
            </button>
          );
        })}
      </div>
      <div style={{ background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 14px", margin: "8px 0 14px", fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5 }}>
        {seeded
          ? "Conversaciones de ejemplo. El envío real y las respuestas con IA corren en el servidor (Medique)."
          : "Conecta tus canales (WhatsApp, Instagram y Facebook) para que tus mensajes lleguen a esta bandeja y el asistente responda con el contexto de tu clínica. Cada conexión se activa en Meta."}
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
        <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text }}>Groq · gpt-oss-120b</span>
        <span style={{ fontFamily: T.sans, fontSize: 9.5, color: "#1F8A5B", background: "rgba(31,138,91,.1)", borderRadius: 6, padding: "2px 7px" }}>Activo en el panel</span>
        <span style={{ marginLeft: "auto", fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>Auto-respuesta por WhatsApp · pendiente de activar</span>
      </div>
      {convs.length === 0 ? (
        <div style={{ background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "32px 24px" }}>
          <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 4, textAlign: "center" }}>Conecta tus canales de mensajes</div>
          <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 460, margin: "0 auto 20px", textAlign: "center" }}>Cuando conectes cada canal en Meta, los mensajes de tus pacientes entran acá y el asistente responde con el contexto de tu clínica.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 10, maxWidth: 620, margin: "0 auto" }}>
            {INBOX_CHANNELS.map(ch => (
              <div key={ch.id} style={{ background: T.bg, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 14px", textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: ch.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, margin: "0 auto 10px" }}>{ch.name[0]}</div>
                <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text }}>{ch.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, margin: "4px 0 12px", lineHeight: 1.4, minHeight: 28 }}>{ch.desc}</div>
                <button onClick={() => openGuideFor(ch.id)} style={{ width: "100%", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: "#fff", background: ch.color, border: "none", borderRadius: 8, padding: "9px", cursor: "pointer" }}>Conectar</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 12, height: 460 }}>
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, overflowY: "auto" }}>
          {shown.length === 0 && <div style={{ padding: "16px 14px", fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Sin conversaciones en este canal.</div>}
          {shown.map(c => (
            <button key={c.id} onClick={() => setSel(c.id)} style={{ width: "100%", textAlign: "left", display: "block", padding: "12px 14px", border: "none", borderBottom: "1px solid " + T.line, background: c.id === sel ? (T.accentSoft || "rgba(84,112,127,.12)") : "transparent", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: chanMeta(chanOf(c)).color, flexShrink: 0 }} title={chanMeta(chanOf(c)).name} />
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{(c.msgs && c.msgs.length) ? c.msgs[c.msgs.length - 1].t : ""}</div>
            </button>
          ))}
        </div>
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, display: "flex", flexDirection: "column" }}>
          {conv ? <>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid " + T.line, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text }}>{conv.name}</div>
                  <span style={{ fontFamily: T.sans, fontSize: 9, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "#fff", background: chanMeta(chanOf(conv)).color, borderRadius: 5, padding: "2px 6px" }}>{chanMeta(chanOf(conv)).name}</span>
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{conv.phone || conv.handle || ""}</div>
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
        <NewCitaModal T={T} patients={patients || []} prefill={{ patName: darCita.name, phone: darCita.phone }} onClose={() => setDarCita(null)} onSave={handleSaveCita} />
      )}
      {citaOk && <CitaAgendadaOkPopup T={T} cita={citaOk} appts={appts} onClose={() => setCitaOk(null)} />}
      {showGuide && <WhatsAppSetupModal T={T} onClose={() => setShowGuide(false)} />}
      {showMetaGuide && <MetaBizGuideModal T={T} onClose={() => setShowMetaGuide(false)} />}
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
  { id: "pr1", name: "Botox 3 zonas", cobro: 150000, method: "Transferencia", uses: [["i1", 0.5], ["i4", 3], ["i7", 1], ["i8", 1]] },
  { id: "pr2", name: "Rinomodelación", cobro: 170000, method: "Transferencia", uses: [["i2", 1], ["i6", 1], ["i4", 2], ["i8", 4]] },
  { id: "pr3", name: "Bioestimulación (Sculptra)", cobro: 450000, method: "Transferencia", uses: [["i3", 2], ["i4", 2], ["i8", 5]] }
];
/* ─────────── Caja: helpers compartidos (persisten en DB) ─────────── */
function cashAll() { try { return (window.DB && DB.get("cash_moves")) || []; } catch (e) { return []; } }
function cashNotify() { try { window.dispatchEvent(new Event("jcm:cash")); } catch (e) {} }
function cashSave(v) { try { if (window.DB) DB.set("cash_moves", v); } catch (e) {} cashNotify(); }
function cashAdd(mv) { const all = cashAll(); all.push({ id: "cm" + Date.now() + Math.random().toString(36).slice(2, 5), ts: new Date().toISOString(), ...mv }); cashSave(all); try { if (window.jcmAudit) { const D = window.JCDATA; const monto = D && D.fmt ? D.fmt(mv.amount || 0) : ("$" + (mv.amount || 0)); window.jcmAudit((mv.type === "egreso" ? "Egreso" : "Cobro") + " " + monto + (mv.concept ? " · " + mv.concept : "") + (mv.method ? " · " + mv.method : "")); } } catch (e) {} }
function cashDelete(id) { cashSave(cashAll().filter(m => m.id !== id)); }
// Día LOCAL (no UTC): evita que un cobro de las 23:00 de Chile cuente como del día siguiente.
function _localDay(d) { d = d ? new Date(d) : new Date(); if (isNaN(d)) return ""; return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function cashToday() { const t = _localDay(); return cashAll().filter(m => _localDay(m.ts) === t); }
// Día (YYYY-MM-DD) de una atención de la ficha (patient.billing): acepta DD-MM-AAAA, DD/MM/AAAA o ISO.
function _billDay(dateStr) {
  const s = ("" + (dateStr || "")).trim().replace(/[.\s]+$/, "");
  const m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (m) { let yy = +m[3]; if (yy < 100) yy += 2000; return yy + "-" + String(+m[2]).padStart(2, "0") + "-" + String(+m[1]).padStart(2, "0"); }
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/); if (iso) return iso[1] + "-" + iso[2] + "-" + iso[3];
  const t = Date.parse(s); return isNaN(t) ? "" : _localDay(t);
}
// Actualiza un movimiento de caja (p.ej. cambiar el método de pago).
function cashUpdate(id, patch) { cashSave(cashAll().map(m => m.id === id ? { ...m, ...patch } : m)); }
// Cambia el método de pago de una atención de la ficha (patient.billing) desde Caja.
function billingUpdateMethod(patId, billId, metodo) {
  try {
    const pts = (window.DB && DB.get("patients")) || [];
    DB.set("patients", pts.map(p => p.id === patId ? { ...p, billing: (p.billing || []).map(b => b.id === billId ? { ...b, metodo: metodo } : b) } : p));
    cashNotify();
  } catch (e) {}
}
// Quita una atención del registro de Caja (p.billing). NO toca la sesión del historial clínico.
function billingDelete(patId, billId) {
  try {
    const pts = (window.DB && DB.get("patients")) || [];
    DB.set("patients", pts.map(p => p.id === patId ? { ...p, billing: (p.billing || []).filter(b => b.id !== billId) } : p));
    cashNotify();
  } catch (e) {}
}
// Movimientos de caja del período + las atenciones PAGADAS de las fichas (que no pasan por "sesión con cobro").
// Deduplica: si una atención de ficha ya está cobrada en caja (misma persona, monto y día), no se repite.
function cashMovimientos() {
  const cashMoves = cashAll().map(m => ({ ...m, _day: _localDay(m.ts), _src: "caja" }));
  const seen = {};
  cashMoves.forEach(m => { if (m.kind === "atencion") seen[(m.patient || "").toLowerCase().trim() + "|" + (m.amount || 0) + "|" + m._day] = true; });
  const out = cashMoves.slice();
  let pts = []; try { pts = (window.DB && DB.get("patients")) || []; } catch (e) {}
  (pts || []).forEach(p => {
    (p.billing || []).forEach(b => {
      if (!b.paid || !(b.amount > 0)) return; // solo pagadas con monto
      const day = _billDay(b.date);
      if (seen[(p.name || "").toLowerCase().trim() + "|" + (b.amount || 0) + "|" + day]) return; // ya registrado en caja (sesión)
      out.push({ id: "bill_" + p.id + "_" + (b.id || ""), type: "ingreso", kind: "atencion", amount: b.amount || 0, cost: 0,
        method: b.metodo || "Otro", concept: (b.concept || "Atención") + " · " + (p.name || ""), _day: day,
        ts: (day || _localDay()) + "T12:00:00", _src: "billing", _patId: p.id, _billId: b.id });
    });
  });
  return out;
}
/* inventario persistente — el seed (INV_SEED/PROC_SEED) solo aplica a la clínica base o modo local; las nuevas parten vacías */
function invSeed() { return (window.JCM_BASE || !(window.JCSAAS && window.JCSAAS.enabled)) ? INV_SEED : []; }
function procSeed() { return (window.JCM_BASE || !(window.JCSAAS && window.JCSAAS.enabled)) ? PROC_SEED : []; }
function invLoad() { try { var v = window.DB && DB.get("inv_items"); return Array.isArray(v) ? v : invSeed(); } catch (e) { return invSeed(); } }
function invSave(v) { try { if (window.DB) DB.set("inv_items", v); } catch (e) {} }
function procLoad() { try { var v = window.DB && DB.get("inv_procs"); return Array.isArray(v) ? v : procSeed(); } catch (e) { return procSeed(); } }
function procSave(v) { try { if (window.DB) DB.set("inv_procs", v); } catch (e) {} }
function procCost(p, items) { return (p.uses || []).reduce((s, u) => { const it = items.find(x => x.id === u[0]); return s + (it ? it.price * u[1] : 0); }, 0); }
// Costo de insumos de un procedimiento por su NOMBRE (según la config de inventario).
// Se descuenta automáticamente al cobrar para obtener el líquido. Solo JC Medical (clínica base).
function jcmInsumoCost(procName) {
  try {
    if (!(typeof clinicSeeded === "function" && clinicSeeded())) return 0; // solo mi clínica
    const n = (procName || "").toLowerCase().trim(); if (!n) return 0;
    const procs = procLoad(); const items = invLoad();
    const p = procs.find(x => (x.name || "").toLowerCase().trim() === n);
    return p ? procCost(p, items) : 0;
  } catch (e) { return 0; }
}
// Costo de publicidad por paciente atendido (solo JC Medical). Editable a futuro; por ahora fijo.
function jcmAdCostPerPatient() { try { return (typeof clinicSeeded === "function" && clinicSeeded()) ? 5000 : 0; } catch (e) { return 0; } }

function InvKpiModal({ T, title, items, onClose, onAdjust }) {
  const D = window.JCDATA;
  const [, forceUpdate] = useState(0);
  return (
    <AdModal T={T} title={title + " (" + items.length + ")"} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textFaint, padding: "12px 0" }}>Sin productos en esta categoría.</div>}
        {items.map(i => {
          const lo = i.stock > 0 && i.stock <= i.min;
          const out = i.stock <= 0;
          return (
            <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid " + T.lineSoft }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{i.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{i.cat} · mín {i.min} {i.unit}{i.venc ? " · vence " + new Date(i.venc).toLocaleDateString("es-CL") : ""}</div>
              </div>
              {onAdjust && <button onClick={() => { onAdjust(i.id, -1); forceUpdate(n => n + 1); }} style={invAdj(T)}>−</button>}
              <div style={{ fontFamily: T.serif, fontSize: 20, color: out ? "#C0285A" : lo ? "#C9A227" : T.text, minWidth: 28, textAlign: "center" }}>{i.stock}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute }}>{i.unit}</div>
              {onAdjust && <button onClick={() => { onAdjust(i.id, 1); forceUpdate(n => n + 1); }} style={invAdj(T)}>+</button>}
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
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
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
  async function delItem(it) {
    const ok = await (window.jcmConfirm ? window.jcmConfirm('¿Eliminar "' + it.name + '" del inventario? Esta acción no se puede deshacer.', { danger: true }) : Promise.resolve(window.confirm('¿Eliminar "' + it.name + '" del inventario?')));
    if (!ok) return;
    setItems(items.filter(x => x.id !== it.id));
    setMsg('"' + it.name + '" eliminado del inventario.'); setTimeout(() => setMsg(""), 3000);
  }
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
      {invKpi === "all" && <InvKpiModal T={T} title="Todos los productos" items={items} onClose={() => setInvKpi(null)} onAdjust={adjust} />}
      {invKpi === "low" && <InvKpiModal T={T} title="Stock bajo" items={low} onClose={() => setInvKpi(null)} onAdjust={adjust} />}
      {invKpi === "out" && <InvKpiModal T={T} title="Agotados" items={out} onClose={() => setInvKpi(null)} onAdjust={adjust} />}
      {invKpi === "vencer" && <InvKpiModal T={T} title="Por vencer" items={porVencer} onClose={() => setInvKpi(null)} onAdjust={adjust} />}
      {low.length > 0 && (
        <div style={{ background: "rgba(192,40,90,.08)", border: "1px solid rgba(192,40,90,.35)", borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: "#C0285A", marginBottom: 4 }}>⚠ Reponer pronto</div>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute }}>{low.map(i => i.name + " (" + i.stock + ")").join(" · ")}</div>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar insumo…" style={luxF
          ? { ...DS.ctl(T), flex: 1, height: DS.h.ctl + 4 }
          : { flex: 1, padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }} />
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
            <div key={i.id} style={luxF
              ? { display: "flex", alignItems: "center", gap: 12, padding: "13px 10px", margin: "0 -10px", borderRadius: DS.r.ctl, borderBottom: "1px solid " + T.lineSoft, transition: DS.trans("background") }
              : { display: "flex", alignItems: "center", gap: 12, padding: "13px 4px", borderBottom: "1px solid " + T.lineSoft }}
              onMouseEnter={luxF ? e => { e.currentTarget.style.background = T.surface2 || T.surface; } : undefined}
              onMouseLeave={luxF ? e => { e.currentTarget.style.background = "none"; } : undefined}>
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
              <button onClick={() => delItem(i)} title="Eliminar producto" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
              </button>
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
                <span key={k} style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, background: T.bg, border: "1px solid " + T.lineSoft, borderRadius: 999, padding: "4px 9px" }}>{invName(u[0])} × {u[1] % 1 === 0 ? u[1] : ("" + u[1]).replace(".", ",") + " vial"}</span>
              ))}
            </div>
          </div>
          );
        })}
      </div>
      <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 }}>Define qué insumos consume cada procedimiento. Al tocar "Registrar realizado", se descuentan automáticamente del stock.</p>
      {scan && <InvScanModal T={T} onClose={() => setScan(false)} onApply={applyInvoice} />}
      {nuevo && <NewInvModal T={T} onClose={() => setNuevo(false)} onSave={it => { setItems([{ ...it, id: "i" + Date.now() }, ...items]); setNuevo(false); }} />}
      {edit && <NewInvModal T={T} initial={edit} onClose={() => setEdit(null)} onSave={it => { setItems(items.map(x => x.id === edit.id ? { ...x, ...it } : x)); setEdit(null); }} />}
      {nuevoProc && <NewProcModal T={T} items={items} onClose={() => setNuevoProc(false)} onSave={pr => { setProcs([...procs, { ...pr, id: "pr" + Date.now() }]); setNuevoProc(false); }} />}
      {editProc && <NewProcModal T={T} items={items} initial={editProc} onClose={() => setEditProc(null)} onSave={pr => { setProcs(procs.map(x => x.id === editProc.id ? { ...x, ...pr } : x)); setEditProc(null); }} />}
    </div>
  );
}
function invAdj(T) { return { width: 28, height: 28, borderRadius: 6, border: "1px solid " + T.chipBorder, background: T.surface, color: T.text, cursor: "pointer", fontSize: 16, lineHeight: 1 }; }
/* Escanear factura → leer con IA (visión, en el servidor) → revisar/editar → aplicar al stock. */
// Reduce la foto a un JPEG pequeño (máx ~1600px) para que quepa en el límite de subida y la IA la lea bien.
function invFileToDataURL(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) { if (w >= h) { h = Math.round(h * maxDim / w); w = maxDim; } else { w = Math.round(w * maxDim / h); h = maxDim; } }
        const c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", quality || 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
function InvScanModal({ T, onClose, onApply }) {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef(null);
  const oneEmpty = () => [{ name: "", cat: "Insumo clínico", qty: "1", price: "0", unit: "unidades" }];
  async function onFile(e) {
    const f = e.target.files[0]; if (!f) return; e.target.value = "";
    setFile(f.name); setErr("");
    // La visión de IA lee imágenes; un PDF hay que fotografiarlo o capturarlo.
    if (f.type === "application/pdf" || /\.pdf$/i.test(f.name)) {
      setErr("La lectura automática funciona con FOTOS (JPG/PNG). Para un PDF, toma una captura de pantalla de la factura y súbela, o agrega los productos a mano abajo.");
      setRows(oneEmpty()); return;
    }
    setBusy(true); setRows([]);
    try {
      const dataUrl = await invFileToDataURL(f, 1600, 0.82);
      const idt = (window.JCSAAS && window.JCSAAS.idToken) ? await window.JCSAAS.idToken() : null;
      const headers = { "Content-Type": "application/json" };
      if (idt) headers["Authorization"] = "Bearer " + idt;
      const resp = await fetch("/api/ai", { method: "POST", headers: headers, body: JSON.stringify({ task: "scan_invoice", image: dataUrl }) });
      const d = await resp.json().catch(() => ({}));
      setBusy(false);
      if (d && d.ok && Array.isArray(d.items) && d.items.length) {
        setRows(d.items.map(it => ({ name: it.name || "", cat: it.cat || "Insumo clínico", qty: String(it.qty || 1), price: String(it.price || 0), unit: "unidades" })));
      } else if (d && d.ok) {
        setErr("No detecté productos en la imagen. Revisa que se vea el detalle de la factura, o agrégalos a mano abajo.");
        setRows(oneEmpty());
      } else {
        setErr((d && d.error) || "No se pudo leer la factura. Agrega los productos a mano abajo.");
        setRows(oneEmpty());
      }
    } catch (e2) {
      setBusy(false);
      setErr("No se pudo procesar la imagen. Agrega los productos a mano abajo.");
      setRows(oneEmpty());
    }
  }
  function setRow(i, k, v) { setRows(rows.map((r, j) => j === i ? { ...r, [k]: v } : r)); }
  function addRow() { setRows([...rows, { name: "", cat: "Insumo clínico", qty: "1", price: "0", unit: "unidades" }]); }
  function delRow(i) { setRows(rows.filter((_, j) => j !== i)); }
  const inp = { fontFamily: T.sans, fontSize: 12.5, padding: "8px 10px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", width: "100%" };
  return (
    <div onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,.5)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 680, maxHeight: "88vh", overflowY: "auto", background: T.bg, border: "1px solid " + T.line, borderRadius: 14, padding: "22px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 24, color: T.text, margin: 0 }}>Escanear factura o boleta</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>
        <div style={{ background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 13px", marginBottom: 16, fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>
          Sube una <b>foto nítida</b> de la boleta/factura. La <b>lectura automática con IA</b> lee el nombre, la cantidad y el costo con IVA de cada producto; aquí los revisas antes de sumarlos al stock.
        </div>
        {!file ? (
          <button onClick={() => fileRef.current.click()} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "40px 20px", border: "1.5px dashed " + T.chipBorder, borderRadius: 12, background: T.surface, cursor: "pointer" }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.5"><path d="M12 16V4M7 9l5-5 5 5M5 20h14" /></svg>
            <span style={{ fontFamily: T.serif, fontSize: 18, color: T.text }}>Subir factura o boleta (foto)</span>
            <span style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>JPG o PNG de la compra · arrastra el archivo o haz clic</span>
          </button>
        ) : busy ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "44px 20px" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2" style={{ animation: "jcSpin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.2-8.6" /></svg>
            <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>Leyendo la factura con IA…</span>
            <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>📄 {file}</span>
          </div>
        ) : (
          <>
            {err && <div style={{ background: "rgba(192,40,90,.08)", border: "1px solid rgba(192,40,90,.35)", borderRadius: 8, padding: "10px 13px", marginBottom: 12, fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", lineHeight: 1.5 }}>{err}</div>}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontFamily: T.sans, fontSize: 11.5, color: T.accent }}>📄 {file} · productos detectados (edítalos si es necesario):</span>
              <button onClick={() => fileRef.current.click()} style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }}>Otra foto</button>
            </div>
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
  // Insumos medidos en "viales" (ej. Toxina botulínica 100U que rinde para 2 pacientes) se
  // pueden consumir por MEDIO vial (paso 0,5); el resto por unidad entera. (P13)
  const stepFor = it => (/vial/i.test((it && it.unit) || "") ? 0.5 : 1);
  function setQty(id, q, step) { step = step || 1; q = Math.max(0, Math.round(q / step) * step); q = Math.round(q * 100) / 100; setUses(u => { const n = { ...u }; if (q === 0) delete n[id]; else n[id] = q; return n; }); }
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
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 4 }}>Insumos que consume</div>
          <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginBottom: 8, lineHeight: 1.5 }}>Los insumos en <b style={{ color: T.textMute }}>viales</b> (ej. toxina botulínica) se descuentan por <b style={{ color: T.textMute }}>medio vial</b> (0,5) o vial completo, ya que un vial rinde para varios pacientes.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, maxHeight: 280, overflowY: "auto" }}>
            {items.map(i => { const q = uses[i.id] || 0; const step = stepFor(i); const isVial = step < 1; return (
              <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 8, background: q ? T.surface2 : T.surface, border: "1px solid " + (q ? T.accent : T.line) }}>
                <span style={{ flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 12.5, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{i.name}{isVial && <span style={{ color: T.textFaint, fontSize: 10.5 }}> · por vial</span>}</span>
                <button onClick={() => setQty(i.id, q - step, step)} style={invAdj(T)}>−</button>
                <span style={{ fontFamily: T.serif, fontSize: 16, color: T.text, minWidth: isVial ? 46 : 22, textAlign: "center" }}>{isVial ? (q % 1 === 0 ? q : q.toString().replace(".", ",")) + (q ? " v" : "") : q}</span>
                <button onClick={() => setQty(i.id, q + step, step)} style={invAdj(T)}>+</button>
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
// Migra imágenes (base64) y consentimientos que aún viven DENTRO del registro del paciente
// a sus propias claves (pimg_<id> / pcons_<id>). Así el bloque "patients" se aliviana y baja
// del límite de 1 MB. No pierde nada: une por id/ts con lo que ya exista en cada clave propia.
function optimizePatientsBlock() {
  const DB = window.DB; if (!DB) return { ok: false, movedImg: 0, movedCons: 0 };
  let list; try { list = DB.get("patients"); } catch (e) { return { ok: false, movedImg: 0, movedCons: 0 }; }
  if (!Array.isArray(list)) return { ok: false, movedImg: 0, movedCons: 0 };
  let movedImg = 0, movedCons = 0, changed = false;
  const next = list.map(p => {
    if (!p || p.id == null) return p;
    let np = p;
    // 1) Imágenes clínicas → pimg_<id>
    if (Array.isArray(p.images) && p.images.length) {
      try {
        const key = "pimg_" + p.id;
        const own = DB.get(key);
        let merged;
        if (Array.isArray(own)) {
          merged = own.slice();
          p.images.forEach(im => { if (im && (im.id == null || !own.some(o => o && o.id === im.id))) merged.push(im); });
        } else { merged = p.images; }
        DB.set(key, merged);
        if (Array.isArray(DB.get(key))) { np = Object.assign({}, np, { images: [] }); movedImg++; changed = true; }
      } catch (e) {}
    }
    // 2) Consentimientos (con firmas base64) → pcons_<id>, y se quita el base64 del paciente
    let legacy = p.consents || (p.consentDoc ? [p.consentDoc] : []);
    if ((!legacy || !legacy.length) && (p.consentSig || p.consentSigPro)) {
      // Firma huérfana sin documento: la conservamos como un consentimiento mínimo.
      legacy = [{ title: p.consentInfo || "Consentimiento", sigPac: p.consentSig || null, sigPro: p.consentSigPro || null, ts: Date.now(), recovered: true }];
    }
    const hasHeavy = (legacy && legacy.length) || p.consentSig || p.consentSigPro || p.consentDoc || p.consents;
    if (hasHeavy) {
      try {
        const key = "pcons_" + p.id;
        const own = DB.get(key);
        let target = Array.isArray(own) ? own.slice() : [];
        (legacy || []).forEach(d => { if (d && !target.some(t => t && t.ts === d.ts)) target.push(d); });
        if (target.length) DB.set(key, target);
        np = Object.assign({}, np, { consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
        movedCons++; changed = true;
      } catch (e) {}
    }
    // 3) Reconcilia el flag: si el paciente tiene consentimientos en su bloque propio, marca consent:true.
    try {
      const own = DB.get("pcons_" + p.id);
      if (Array.isArray(own) && own.length && !np.consent) {
        np = Object.assign({}, np, { consent: true, consentInfo: np.consentInfo || ((own[own.length - 1] && own[own.length - 1].title) || "Consentimiento firmado") });
        changed = true;
      }
    } catch (e) {}
    return np;
  });
  if (changed) { try { DB.set("patients", next); } catch (e) { return { ok: false, movedImg, movedCons }; } }
  return { ok: true, movedImg, movedCons };
}

// ── Historial por paciente en su propia clave (phist_<id>) ────────────────────
// El bloque "patients" guarda solo el ÍNDICE liviano (datos, etiquetas, flags, billing).
// El historial de sesiones de cada paciente vive en phist_<id>, un documento aparte
// y pequeño. Así "patients" nunca crece sin control ni topa el límite de 1 MB de la
// nube por más sesiones que se registren. Cada phist_<id> sincroniza solo (como pimg_/pcons_).
function patHistKey(id) { return "phist_" + id; }
// Caché de la última versión persistida del historial de cada paciente (evita reescrituras).
var _histCache = {};
// Clave estable de una sesión para deduplicar al unir historiales divergentes.
function _sesKey(s) { return (s && (s.id || s.ts || ((s.date || s.fecha || "") + "|" + (s.proc || s.title || "")))) || null; }
// Une dos historiales SIN perder sesiones (por si dos equipos divergieron antes de migrar):
// conserva el orden de `a` (local) y agrega de `b` (otro equipo) solo lo que no esté ya.
function unionHist(a, b) {
  var out = Array.isArray(a) ? a.slice() : [];
  var seen = {}; out.forEach(function (s) { var k = _sesKey(s); if (k) seen[k] = 1; });
  (Array.isArray(b) ? b : []).forEach(function (s) { var k = _sesKey(s); if (!k || !seen[k]) { out.push(s); if (k) seen[k] = 1; } });
  return out;
}
// Lee el índice liviano y RE-HIDRATA el historial de cada paciente desde su clave propia,
// dejando los objetos exactamente como el resto del panel los espera (con .history poblado).
function loadPatientsFull() {
  var DB = window.DB; if (!DB) return [];
  var idx; try { idx = DB.get("patients"); } catch (e) { return []; }
  if (!Array.isArray(idx)) return [];
  return idx.map(function (p) {
    if (!p || p.id == null) return p;
    var remote = null; try { var h = DB.get(patHistKey(p.id)); if (Array.isArray(h)) remote = h; } catch (e) {}
    // Formato ANTIGUO: el historial está inline. Si además ya existe phist_<id> (porque otro
    // equipo migró antes), UNE ambos para no perder sesiones divergentes. No sembramos la caché,
    // para que el próximo guardado escriba la unión a su clave propia (migración sin pérdida).
    if (Array.isArray(p.history)) {
      return Object.assign({}, p, { history: remote ? unionHist(p.history, remote) : p.history });
    }
    // Formato nuevo: el historial ya vive en phist_<id> (ya persistido) → siembra la caché.
    var hist = remote || [];
    try { _histCache[p.id] = JSON.stringify(hist); } catch (e) {}
    return Object.assign({}, p, { history: hist });
  });
}
// Punto ÚNICO de persistencia: guarda cada historial en phist_<id> (solo si cambió) y
// el índice "patients" SIN historial inline. No pierde nada y mantiene el índice liviano.
function savePatientsLight(list) {
  var DB = window.DB; if (!DB) return list;
  var light = (list || []).map(function (p) {
    if (!p || p.id == null) return p;
    if (Array.isArray(p.history)) {
      var js = null; try { js = JSON.stringify(p.history); } catch (e) {}
      if (js != null && _histCache[p.id] !== js) { try { DB.set(patHistKey(p.id), p.history); } catch (e) {} _histCache[p.id] = js; }
      var rest = Object.assign({}, p); delete rest.history; return rest;
    }
    return p;
  });
  try { DB.set("patients", light); } catch (e) {}
  return list;
}
if (typeof window !== "undefined") {
  window.optimizePatientsBlock = optimizePatientsBlock;
  window.jcmLoadPatientsFull = loadPatientsFull;
  window.jcmSavePatientsLight = savePatientsLight;
}

// Diagnóstico de sincronización con la nube: tamaño de cada bloque, qué falta subir y por qué.
function SyncStatusCard({ T, compact }) {
  const [, force] = useState(0);
  const [open, setOpen] = useState(!compact);
  const s = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.syncStatus) ? window.JCSAAS.syncStatus() : null;
  if (!s) return null; // solo en modo nube
  // Modo compacto (P27): una barra delgada; se despliega al tocar "Ver detalle".
  if (compact && !open) {
    const pendC = (s.dirty || []).length;
    return (
      <button onClick={() => setOpen(true)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: pendC ? "rgba(192,40,90,.06)" : T.surface, border: "1px solid " + (pendC ? "#C0285A55" : T.line), borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: pendC ? "#C0285A" : "#1F8A5B", flexShrink: 0 }} />
          <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>Estado de sincronización</span>
          <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{pendC === 0 ? "todo sincronizado ✓" : pendC + " pendiente(s)"}</span>
        </span>
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.accent }}>Ver detalle ↓</span>
      </button>
    );
  }
  const fmtSize = b => b >= 1048576 ? (b / 1048576).toFixed(2) + " MB" : Math.round(b / 1024) + " KB";
  const dirtySet = {}; (s.dirty || []).forEach(k => { dirtySet[k] = true; });
  const labelOf = k => k.indexOf("pcons_") === 0 ? "Consentimientos · un paciente" : ({ patients: "Pacientes", appointments: "Agenda", cash_moves: "Caja", inv_items: "Inventario", inv_procs: "Procedimientos", config: "Configuración", team: "Equipo", services_custom: "Servicios", horarios_v1: "Horarios", bookings: "Reservas web", admin_tasks: "Pendientes" })[k] || k;
  const errMsg = { "resource-exhausted": "Supera 1 MB (límite de la nube) — no puede subir.", "permission-denied": "Permiso denegado (reglas o plan).", "unavailable": "Sin conexión con la nube.", "unauthenticated": "Sesión sin autenticar.", "failed-precondition": "Verificación (App Check) falló.", "invalid-argument": "Documento demasiado grande (supera 1 MB)." };
  const keys = Object.keys(s.sizes).sort((a, b) => s.sizes[b] - s.sizes[a]);
  const shown = keys.filter(k => dirtySet[k] || s.sizes[k] > 700 * 1024).slice(0, 14);
  const pend = (s.dirty || []).length;
  const hace = s.lastOk ? Math.round((Date.now() - s.lastOk) / 1000) : null;
  const patErr = s.errors && s.errors.patients ? s.errors.patients.code : null;
  const patHeavy = (s.sizes.patients || 0) > 920 * 1024 || patErr === "resource-exhausted" || patErr === "invalid-argument";
  return (
    <div style={{ background: pend ? "rgba(192,40,90,.06)" : T.surface, border: "1px solid " + (pend ? "#C0285A55" : T.line), borderRadius: 12, padding: "18px 18px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>Estado de sincronización</div>
        <AdBtn T={T} small onClick={() => { try { window.JCSAAS.retrySync(); } catch (e) {} window.jcmToast && window.jcmToast("Reintentando subir lo pendiente…", "info"); setTimeout(() => force(x => x + 1), 3500); }}>Reintentar ahora</AdBtn>
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 12px", lineHeight: 1.5 }}>
        {s.online ? "En línea" : "Sin conexión"} · {pend === 0 ? "todo sincronizado ✓" : pend + " bloque(s) pendientes de subir"}{hace != null ? " · última subida hace " + (hace < 60 ? hace + " s" : Math.round(hace / 60) + " min") : ""}.
      </div>
      {patHeavy && (
        <div style={{ background: "rgba(192,40,90,.07)", border: "1px solid #C0285A44", borderRadius: 10, padding: "14px 14px", marginBottom: 14 }}>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text, fontWeight: 600, marginBottom: 4 }}>El bloque "Pacientes" no sube porque pesa demasiado</div>
          <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, marginBottom: 12 }}>
            Hay imágenes y firmas guardadas dentro de los pacientes que lo inflan. Esto las mueve a su propio espacio (sin perder nada) para que el bloque baje de 1 MB y vuelva a sincronizar. Ten tu respaldo descargado antes de continuar.
          </div>
          <AdBtn T={T} primary onClick={() => {
            if (!window.confirm("Se moverán las imágenes y firmas que están dentro de los pacientes a su propio espacio, para que la sincronización vuelva a funcionar. No se borra ningún dato. ¿Continuar?")) return;
            const before = s.sizes.patients || 0;
            const r = optimizePatientsBlock();
            try { window.JCSAAS.retrySync(); } catch (e) {}
            setTimeout(() => {
              const ns = (window.JCSAAS && window.JCSAAS.syncStatus) ? window.JCSAAS.syncStatus() : null;
              const after = ns && ns.sizes ? (ns.sizes.patients || 0) : before;
              const kb = b => Math.round(b / 1024) + " KB";
              window.jcmToast && window.jcmToast(r.ok ? ("Listo: bloque de " + kb(before) + " → " + kb(after) + ". Subiendo a la nube…") : "No se pudo optimizar; revisa el respaldo.", r.ok ? "ok" : "error");
              force(x => x + 1);
            }, 2500);
          }}>Optimizar pacientes ahora</AdBtn>
        </div>
      )}
      {shown.length === 0 ? <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint }}>Todo al día, sin bloques pesados.</div>
        : shown.map(k => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid " + T.lineSoft }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{labelOf(k)}{dirtySet[k] ? " · pendiente" : ""}</div>
              {s.errors[k] && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: "#C0285A", marginTop: 2 }}>{errMsg[s.errors[k].code] || ("Error: " + s.errors[k].code)}</div>}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: s.sizes[k] > 1048576 ? "#C0285A" : (s.sizes[k] > 900 * 1024 ? (T.gold || "#C9A227") : T.textMute), fontWeight: s.sizes[k] > 900 * 1024 ? 600 : 400, whiteSpace: "nowrap" }}>{fmtSize(s.sizes[k])}</div>
          </div>
        ))}
      <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 }}>Un bloque en <b style={{ color: "#C0285A" }}>rojo</b> cerca o sobre 1 MB es el que no logra subir a la nube. Abre esta pantalla en cada dispositivo para comparar.</div>
    </div>
  );
}
function AdministracionView({ T, go, patients, appts, addPatient, updatePatient, markAllPaperConsent }) {
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
  // Respaldo COMPLETO: descarga todos los datos de la clínica (todas las claves de la BD) en un JSON.
  function expFull() {
    try {
      var data = {}, prefix = "";
      try { var cid = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId()) || ""; prefix = "jcm_" + (cid ? cid + "_" : ""); } catch (e) { prefix = "jcm_"; }
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(prefix) === 0) {
          var clave = k.slice(prefix.length);
          if (clave === "session" || clave === "admin_pass") continue; // no exportar sesión/credenciales
          try { data[clave] = JSON.parse(localStorage.getItem(k)); } catch (e) { data[clave] = localStorage.getItem(k); }
        }
      }
      var payload = { clinica: (window.clinicName ? window.clinicName() : ""), exportadoEl: new Date().toISOString(), datos: data };
      var a = document.createElement("a");
      a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
      a.download = "respaldo-medique-" + new Date().toISOString().slice(0, 10) + ".json";
      a.click();
      window.jcmToast && window.jcmToast("Respaldo completo descargado.", "ok");
    } catch (e) { window.jcmError && window.jcmError("No se pudo generar el respaldo", e); }
  }
  // Convierte un valor de fecha del Excel/CSV (serial Excel, DD-MM-AA, DD/MM/AAAA, ISO…) a timestamp.
  function parseFechaImp(s) {
    s = ("" + (s == null ? "" : s)).trim();
    s = s.replace(/[.\s]+$/, "").trim(); // quita el punto/espacios finales (formato "01-06-26.")
    if (!s) return null;
    if (/^\d{5}$/.test(s)) { const d = new Date(Date.UTC(1899, 11, 30) + parseInt(s, 10) * 86400000); return isNaN(d) ? null : d.getTime(); } // serial Excel
    // DD-MM-AA · DD/MM/AAAA · DD.MM.AA (formato chileno: día, mes, año). Tolera punto final.
    const m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})\.?$/);
    if (m) { let yy = +m[3]; if (yy < 100) yy += 2000; const d = new Date(yy, +m[2] - 1, +m[1]); return isNaN(d) ? null : d.getTime(); }
    const t = Date.parse(s); return isNaN(t) ? null : t; // ISO u otros
  }
  // Toma filas (arrays de celdas) ya parseadas y crea los pacientes nuevos. Sirve para CSV y Excel.
  function ingestRows(rows) {
    let headers = null, added = 0, dup = 0, updated = 0;
    const cell = v => ("" + (v == null ? "" : v)).trim();
    const isoFromTs = ts => { if (!ts) return ""; const d = new Date(ts); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); };
    const newSid = () => (window.jcmUid ? window.jcmUid("s") : "s" + Date.now() + Math.random().toString(36).slice(2, 6));
    const seen = new Set((patients || []).map(p => (p.rut || "").replace(/[^0-9kK]/g, "").toLowerCase()).filter(Boolean));
    for (const fields of rows) {
      const lower = fields.map(v => cell(v).toLowerCase());
      // Detectar fila de encabezados: contiene "nombre" entre sus campos
      if (lower.includes("nombre") || lower.some(v => v === "nombre completo")) { headers = lower; continue; }
      if (!headers) continue; // títulos de sección antes del encabezado → saltar
      if (fields.every(v => !cell(v))) continue; // fila vacía
      const r = {};
      headers.forEach((h, i) => { r[h] = cell(fields[i]); });
      const name = (r["nombre"] || r["nombre completo"] || r["nombre y apellido"] || r["name"] || "").trim();
      if (!name || name.length < 2) continue;
      const rut = (r["rut"] || r["dni"] || "").trim();
      const rutNorm = rut.replace(/[^0-9kK]/g, "").toLowerCase();
      const phone = (r["teléfono"] || r["telefono"] || r["phone"] || r["celular"] || r["whatsapp"] || r["fono"] || "").trim();
      const email = (r["correo"] || r["email"] || r["e-mail"] || "").trim();
      // Fecha del paciente en el Excel (ingreso / primera consulta / atención). Para ordenar en "Calendario".
      const fechaRaw = (r["fecha"] || r["fecha de ingreso"] || r["fecha ingreso"] || r["fecha primera consulta"] || r["fecha de registro"] || r["fecha de atención"] || r["fecha atencion"] || r["ingreso"] || r["date"] || "").trim();
      const fechaTs = parseFechaImp(fechaRaw);
      const fechaISO = isoFromTs(fechaTs);
      // Procedimiento realizado (para crear la sesión y reactivar la campaña de re-cita).
      const proc = (r["procedimiento realizado"] || r["procedimiento"] || r["procedimientos"] || r["tratamiento"] || r["tratamientos"] || r["servicio"] || r["proc"] || "").trim();
      // Sesión de historial a partir del Excel (solo si trae procedimiento).
      const importHist = proc ? [{ id: newSid(), date: fechaISO || isoFromTs(Date.now()), proc: proc, note: "Importado del Excel", imported: true }] : null;
      // ¿Ya existe? (por RUT o por nombre). Conserva el registro, pero le completa la fecha si le falta.
      const existing = (patients || []).find(p =>
        (rutNorm.length >= 5 && (p.rut || "").replace(/[^0-9kK]/g, "").toLowerCase() === rutNorm) ||
        (p.name || "").toLowerCase() === name.toLowerCase());
      if (existing) {
        dup++;
        // Re-importar para arreglar bases antiguas: completa fecha y AGREGA el procedimiento si no está
        // (así, al resubir el Excel, la campaña de re-cita se reactiva aunque el paciente ya existiera).
        const patch = {};
        if (fechaTs && !existing.fechaTs) { patch.fechaImport = fechaRaw; patch.fechaTs = fechaTs; }
        // Completar teléfono y email si el registro existente los tiene vacíos
        if (phone && !existing.phone) patch.phone = phone;
        if (email && !existing.email) patch.email = email;
        if (importHist && importHist[0]) {
          const newH = importHist[0];
          const eh = existing.history || [];
          const yaEsta = eh.some(h => (h.proc || "").toLowerCase().trim() === (newH.proc || "").toLowerCase().trim() && (h.date || "") === (newH.date || ""));
          if (!yaEsta) patch.history = [newH, ...eh]; // agrega la sesión del Excel (dedup por procedimiento + fecha)
          if (proc && (!existing.tags || !existing.tags.length)) patch.tags = [proc];           // tag → la re-cita lo detecta
          if (fechaISO && (!existing.lastVisit || existing.lastVisit < fechaISO)) patch.lastVisit = fechaISO;
        }
        if (Object.keys(patch).length && updatePatient) { updatePatient(existing.id, patch); updated++; }
        continue;
      }
      if (rutNorm.length >= 5) seen.add(rutNorm);
      // Importados: consentimiento ya firmado en papel → consent:true (no entran a "Consent. pend.").
      if (addPatient) addPatient({ name, rut, phone, email, consent: true, consentInfo: "Consentimiento firmado en papel (importado)", imported: true, fechaImport: fechaRaw, fechaTs: fechaTs, history: importHist || [], tags: importHist ? [proc] : [], lastVisit: (importHist && fechaISO) ? fechaISO : undefined });
      added++;
    }
    if (!headers) { flash("No encontré la fila de encabezados. Asegúrate de que una fila tenga la columna 'Nombre' (y opcional RUT, Teléfono, Correo, Fecha, Procedimiento)."); return; }
    flash("Importación: " + added + " nuevo(s)" + (updated ? " · " + updated + " actualizados (fecha/procedimiento)" : "") + (dup ? " · " + dup + " ya existían" : "") + ".");
  }
  // Carga el lector de Excel (SheetJS) bajo demanda, solo cuando se importa un .xlsx/.xls.
  function loadXLSX() {
    return new Promise((res, rej) => {
      if (window.XLSX) return res(window.XLSX);
      const s = document.createElement("script");
      s.src = "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js";
      s.onload = () => res(window.XLSX);
      s.onerror = () => rej(new Error("xlsx load failed"));
      document.head.appendChild(s);
    });
  }
  function onImport(e) {
    const f = e.target.files[0]; if (!f) return;
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    e.target.value = "";
    // .numbers es un paquete propietario de Apple: no se puede leer directo.
    if (ext === "numbers") { flash("Los archivos .numbers no se leen directo. En Numbers: Archivo → Exportar a → Excel (o CSV) y sube ese archivo."); return; }
    // Excel real (.xlsx/.xls): binario; se lee con SheetJS, no como texto.
    if (ext === "xlsx" || ext === "xls") {
      flash("Leyendo Excel…");
      loadXLSX().then(XLSX => {
        const rd = new FileReader();
        rd.onload = () => {
          try {
            const wb = XLSX.read(rd.result, { type: "array" });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false, defval: "" });
            ingestRows(rows);
          } catch (err) { flash("No se pudo leer el Excel. Verifica que tenga una fila de encabezado con 'Nombre'."); }
        };
        rd.onerror = () => flash("No se pudo leer el archivo.");
        rd.readAsArrayBuffer(f);
      }).catch(() => flash("No se pudo cargar el lector de Excel. Revisa tu conexión, o exporta a CSV e inténtalo."));
      return;
    }
    // CSV / texto plano.
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const text = rd.result;
        const splitLine = l => {
          const out = []; let cur = "", q = false;
          for (let i = 0; i < l.length; i++) {
            const ch = l[i];
            if (ch === '"') { if (q && l[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
            else if ((ch === "," || ch === ";") && !q) { out.push(cur.trim()); cur = ""; }
            else cur += ch;
          }
          out.push(cur.trim()); return out;
        };
        const rows = text.replace(/\r/g, "").split("\n").map(l => l.trim() ? splitLine(l.trim()) : []).filter(r => r.length);
        ingestRows(rows);
      } catch (err) { flash("No se pudo leer el archivo. Exporta desde Numbers o Excel a CSV e inténtalo."); }
    };
    rd.readAsText(f, "utf-8");
  }
  const expCard = (title, sub, fn) => (
    <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px" }}>
      <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>{title}</div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 14px" }}>{sub}</div>
      <AdBtn T={T} primary onClick={fn}>↓ Descargar CSV</AdBtn>
    </div>
  );
  return (
    <div>
      <SecHead T={T} title="Administración" sub="Equipo y permisos, registro de actividad, datos de la clínica y respaldo de información." />
      {/* pestañas */}
      <div className="jc-scroll" style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux())
        ? { display: "inline-flex", gap: 2, overflowX: "auto", background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: window.JCDS.r.seg, padding: 3, marginBottom: 18 }
        : { display: "flex", gap: 7, overflowX: "auto", marginBottom: 18, paddingBottom: 2 }}>
        {ADMIN_TABS.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux())
            ? { flexShrink: 0, fontFamily: T.sans, fontSize: window.JCDS.ft.sub, fontWeight: tab === k ? 600 : 500, padding: "8px 14px", borderRadius: window.JCDS.r.ctl, cursor: "pointer", whiteSpace: "nowrap", border: "none", background: tab === k ? T.surface : "transparent", boxShadow: tab === k ? "0 1px 2px rgba(0,0,0,.06)" : "none", color: tab === k ? T.accent : T.textMute, transition: window.JCDS.trans("background,box-shadow,color") }
            : { flexShrink: 0, fontFamily: T.sans, fontSize: 12, fontWeight: 500, padding: "9px 15px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", border: "1px solid " + (tab === k ? T.accent : T.chipBorder), background: tab === k ? T.accent : T.chipBg, color: tab === k ? (T.onAccent || "#fff") : T.textMute }}>{l}</button>
        ))}
      </div>
      {msg && <div style={{ background: "rgba(31,138,91,.10)", border: "1px solid rgba(31,138,91,.4)", borderRadius: 8, padding: "10px 13px", marginBottom: 14, fontFamily: T.sans, fontSize: 12, color: "#1F8A5B" }}>✓ {msg}</div>}

      {tab === "datos" && (
        <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "18px 20px", maxWidth: 560 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 18, maxWidth: 560 }}>
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
          {/* P27: 1) exportar, 2) respaldo completo, 3) importar pacientes; el estado de
              sincronización pasa al final y ocupa menos espacio. */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 14 }}>
            {expCard("Pacientes", "Nombre, RUT, contacto y estado.", expPac)}
            {expCard("Citas", "Fecha, paciente, servicio, estado y precio.", expCitas)}
            {expCard("Caja", "Movimientos de ingreso y egreso.", expCaja)}
          </div>
          {/* Respaldo completo de toda la clínica en un solo archivo */}
          <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), marginTop: 14, borderColor: T.accent + "55", padding: "18px 20px" } : { marginTop: 14, background: T.surface, border: "1px solid " + T.accent + "55", borderRadius: 12, padding: "18px 18px" }}>
            <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>Respaldo completo</div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 14px", lineHeight: 1.5 }}>Descarga <b>todos los datos de tu clínica</b> (pacientes, agenda, caja, inventario, servicios, configuración…) en un solo archivo JSON. Guárdalo en un lugar seguro como respaldo periódico.</div>
            <AdBtn T={T} primary onClick={expFull}>↓ Descargar respaldo completo (JSON)</AdBtn>
          </div>
          {/* Importar base de pacientes */}
          <div style={{ marginTop: 18, background: T.surface, border: "1px dashed " + T.chipBorder, borderRadius: 12, padding: "18px 18px" }}>
            <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>Importar base de pacientes</div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 14px", lineHeight: 1.5 }}>Sube un archivo <b>Excel (.xlsx) o CSV</b>. La primera fila debe tener los <b>encabezados</b> y una columna llamada <b>Nombre</b> (opcionales: RUT, Teléfono, Correo, <b>Fecha</b> y <b>Procedimiento</b>). Si agregas <b>Fecha</b> y <b>Procedimiento</b>, se crea la sesión en el historial y se <b>reactiva la campaña de re-cita</b> automáticamente. Si el RUT ya existe, no se duplica (y se le completa el procedimiento si le faltaba). <i>(.numbers: en Numbers usa Archivo → Exportar a → Excel.)</i></div>
            <AdBtn T={T} onClick={() => fileRef.current.click()}>Subir archivo (Excel / CSV)</AdBtn>
            <input ref={fileRef} type="file" accept=".csv,text/csv,application/vnd.ms-excel,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.numbers" onChange={onImport} style={{ display: "none" }} />
            <p style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, margin: "12px 0 0", lineHeight: 1.5 }}>Los pacientes importados quedan con <b>consentimiento firmado en papel</b> (no aparecen como pendientes de firma). Si tu Excel trae una columna <b>Fecha</b>, podrás ordenarlos por fecha con el filtro <b>Calendario</b> en Pacientes.</p>
          </div>
          {/* Arreglo para bases importadas antes de esta mejora: marcar lo ya cargado como consentimiento en papel */}
          {markAllPaperConsent && (patients || []).some(p => !p.consent) && (
            <div style={{ marginTop: 14, background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text }}>Consentimientos en papel</div>
              <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 12px", lineHeight: 1.5 }}>Tienes <b>{(patients || []).filter(p => !p.consent).length}</b> paciente(s) marcados como "consentimiento pendiente". Si ya tienen su consentimiento firmado en papel (p. ej. tu base importada), márcalos todos como firmados para quitarlos de las notificaciones.</div>
              <AdBtn T={T} onClick={async () => {
                const n = (patients || []).filter(p => !p.consent).length;
                const ok = await (window.jcmConfirm ? window.jcmConfirm("¿Marcar " + n + " paciente(s) sin consentimiento como \"firmado en papel\"? Úsalo solo si efectivamente tienen el consentimiento físico.") : Promise.resolve(window.confirm("¿Marcar " + n + " paciente(s) como consentimiento en papel?")));
                if (!ok) return;
                markAllPaperConsent();
                flash(n + " paciente(s) marcados con consentimiento en papel.");
              }}>Marcar pacientes existentes como consentimiento en papel</AdBtn>
            </div>
          )}
          {/* Estado de sincronización — al final y compacto (P27). */}
          <div style={{ marginTop: 18 }}><SyncStatusCard T={T} compact /></div>
        </div>
      )}

      {tab === "equipo" && (() => {
        let team = []; try { team = (window.DB && DB.get("team")) || (window.CADMIN && CADMIN.team) || []; } catch (e) {}
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, maxWidth: 520 }}>Integrantes del equipo y sus permisos por sección. Para editar datos, permisos o crear la cuenta de login, entra a cada profesional en Equipo.</div>
              <AdBtn T={T} primary onClick={() => go("equipo")}>Gestionar en Equipo</AdBtn>
            </div>
            {team.length === 0 ? <Empty2 T={T}>Aún no hay profesionales en el equipo.</Empty2>
              : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {team.map(m => {
                    const perms = m.perms || {};
                    const activos = PERM_SECCIONES.filter(p => perms[p]);
                    const owner = m.role && /a cargo|dueñ|owner|admin/i.test(m.role);
                    return (
                      <div key={m.id || m.name} style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "13px 15px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: "50%", background: m.color || T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 16, flexShrink: 0 }}>{(m.name || "?").split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text }}>{m.name}</div>
                            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[m.role, m.email].filter(Boolean).join("  ·  ")}</div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
                            <AdTag T={T} tone={m.active ? "ok" : "muted"}>{m.active ? "Activo" : "Inactivo"}</AdTag>
                            {m.access && <span style={{ fontFamily: T.sans, fontSize: 9.5, color: "#1F8A5B" }}>● con login</span>}
                          </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                          {owner
                            ? <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.accent, background: T.accent + "16", border: "1px solid " + T.accent + "40", borderRadius: 999, padding: "3px 10px" }}>Acceso total (dueño)</span>
                            : (activos.length ? activos.map(p => <span key={p} style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, background: T.bg, border: "1px solid " + T.lineSoft, borderRadius: 999, padding: "3px 10px" }}>{p}</span>)
                              : <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>Sin permisos asignados</span>)}
                        </div>
                      </div>
                    );
                  })}
                </div>}
          </div>
        );
      })()}

      {tab === "registro" && (() => {
        let log = []; try { log = (DB.get("audit_log") || []).slice(0, 60); } catch (e) {}
        const cuando = ts => { try { return new Date(ts).toLocaleString("es-CL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }); } catch (e) { return (ts || "").slice(0, 16).replace("T", " "); } };
        return (
          <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 16 }}>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 4 }}>Actividad reciente</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 12, lineHeight: 1.5 }}>Cada cita agendada, cambio de estado, paciente creado y cobro queda registrado con la fecha y quién lo hizo.</div>
            {log.length ? log.map((e, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "9px 0", borderBottom: "1px solid " + T.lineSoft, fontFamily: T.sans, fontSize: 12.5 }}>
                <span style={{ color: T.text, minWidth: 0 }}>{e.action || e.msg || "Acción"}{e.user ? <span style={{ color: T.textFaint, fontSize: 11 }}> · {e.user}</span> : null}</span>
                <span style={{ color: T.textFaint, fontSize: 11, whiteSpace: "nowrap", flexShrink: 0 }}>{cuando(e.ts)}</span>
              </div>
            )) : <Empty2 T={T}>Aún no hay actividad registrada. Se irá llenando a medida que uses el panel (citas, pacientes, cobros).</Empty2>}
          </div>
        );
      })()}
    </div>
  );
}

/* ─────────── CAJA ─────────── */
// Verifica la "clave del admin de la clínica": en modo nube = contraseña de la cuenta (re-auth);
// en modo local = la clave del panel (admin_pass). Devuelve Promise<bool>.
function jcmVerifyAdminKey(pass) {
  try {
    var storedPin = window.DB && window.DB.get("admin_pin");
    if (storedPin) return Promise.resolve(String(pass) === String(storedPin));
  } catch (e) {}
  try {
    if (window.JCSAAS && window.JCSAAS.enabled && typeof window.JCSAAS.verifyPassword === "function") return window.JCSAAS.verifyPassword(pass);
  } catch (e) {}
  try {
    if (typeof jcmAdminCheck === "function") return jcmAdminCheck((typeof jcmAdminUser === "function" ? jcmAdminUser() : ""), pass).then(r => !!(r && r.ok));
  } catch (e) {}
  return Promise.resolve(false);
}
// Modal: pide la clave del admin y confirma una acción sensible (p. ej. borrar un movimiento de Caja).
function AdminKeyModal({ T, title, message, confirmLabel, onClose, onOk }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function go() {
    if (busy || !pass) return; setBusy(true); setErr("");
    let ok = false;
    try { ok = await jcmVerifyAdminKey(pass); } catch (e) { ok = false; }
    if (ok) { onOk(); } else { setErr("Clave incorrecta."); setBusy(false); }
  }
  return (
    <AdModal T={T} title={title || "Confirmar con tu clave"} onClose={onClose}
      footer={<><AdBtn T={T} onClick={onClose}>Cancelar</AdBtn><AdBtn T={T} primary onClick={go}>{busy ? "Verificando…" : (confirmLabel || "Eliminar")}</AdBtn></>}>
      <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5, marginBottom: 12 }}>{message || "Ingresa el PIN de admin de la clínica para confirmar."}</div>
      <input type="password" value={pass} autoFocus onChange={e => { setPass(e.target.value); setErr(""); }}
        onKeyDown={e => { if (e.key === "Enter") go(); }} placeholder="PIN de admin"
        style={{ width: "100%", padding: "12px 13px", borderRadius: 6, border: "1px solid " + (err ? "#C0285A" : T.line), background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, outline: "none" }} />
      {err && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", marginTop: 8 }}>{err}</div>}
    </AdModal>
  );
}
function CajaView({ T }) {
  const D = window.JCDATA;
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const [tick, setTick] = useState(0);
  const [delMov, setDelMov] = useState(null); // movimiento a eliminar (pide clave admin)
  const [mov, setMov] = useState(false);
  const [editMov, setEditMov] = useState(null); // movimiento al que se le cambia el método de pago
  const [cierre, setCierre] = useState(false);
  const [periodo, setPeriodo] = useState("hoy"); // hoy | semana | mes
  const [payQ, setPayQ] = useState(""); // P12: buscador de pagos
  const [tratScope, setTratScope] = useState("mes"); // P12: ranking mensual | histórico (no diario)
  const now = new Date();
  const hoyDay = _localDay(now);
  // Rango de la semana actual (lunes a domingo, en hora local).
  const dow = (now.getDay() + 6) % 7;
  const lun = new Date(now); lun.setDate(now.getDate() - dow);
  const dom = new Date(lun); dom.setDate(lun.getDate() + 6);
  const wkStart = _localDay(lun), wkEnd = _localDay(dom);
  const inPeriodo = day => {
    if (!day) return false;
    if (periodo === "hoy") return day === hoyDay;
    if (periodo === "mes") return day.slice(0, 7) === hoyDay.slice(0, 7);
    return day >= wkStart && day <= wkEnd; // semana
  };
  const movs = cashMovimientos().filter(m => inPeriodo(m._day)).sort((a, b) => (a.ts < b.ts ? 1 : -1));
  const ingresos = movs.filter(m => m.type === "ingreso").reduce((s, m) => s + (m.amount || 0), 0);
  const egresos = movs.filter(m => m.type === "egreso").reduce((s, m) => s + (m.amount || 0), 0);
  const costoIns = movs.reduce((s, m) => s + (m.cost || 0), 0);
  const atenciones = movs.filter(m => m.kind === "atencion");
  const manuales = movs.filter(m => m.kind !== "atencion");
  // Filtro del buscador de pagos (P12).
  const payMatch = m => { const q = payQ.trim().toLowerCase(); if (!q) return true; return (((m.concept || "") + " " + (m.method || "") + " " + (m.patient || "") + " " + (m.prof || "")).toLowerCase().includes(q)); };
  const atencionesF = atenciones.filter(payMatch);
  const manualesF = manuales.filter(payMatch);
  // Costo de publicidad por paciente atendido (solo JC Medical: $5.000 c/u). El líquido lo descuenta.
  const adCost = (typeof jcmAdCostPerPatient === "function") ? jcmAdCostPerPatient() : 0;
  const costoPub = atenciones.length * adCost;
  // El líquido NO descuenta insumos (a pedido: en Caja se muestra el pago completo).
  const liqDe = m => (m.amount || 0) - (m.kind === "atencion" ? adCost : 0); // líquido de un movimiento
  const neto = ingresos - egresos - costoPub;
  const porMetodo = {};
  movs.filter(m => m.type === "ingreso").forEach(m => { const k = m.method || "Otro"; porMetodo[k] = (porMetodo[k] || 0) + (m.amount || 0); });
  // ── Registro de Ventas ──
  // Cada atención cobrada es una venta del período.
  const ventasCount = atenciones.length;
  // Tratamiento que más vende: agrupa atenciones por nombre de procedimiento (parte antes de " · ").
  const porTrat = {};
  atenciones.forEach(m => {
    const nombre = (((m.concept || "Atención").split(" · ")[0]) || "Atención").trim();
    if (!porTrat[nombre]) porTrat[nombre] = { n: 0, total: 0 };
    porTrat[nombre].n += 1; porTrat[nombre].total += (m.amount || 0);
  });
  // El ranking de "más vendidos" NO usa el filtro diario: se calcula por MES actual o HISTÓRICO
  // completo (toggle tratScope), como pidió el usuario. (P12)
  const mesKeyCaja = hoyDay.slice(0, 7);
  const allAtenc = cashMovimientos().filter(m => m.kind === "atencion");
  const atencTrat = tratScope === "mes" ? allAtenc.filter(m => (m._day || "").slice(0, 7) === mesKeyCaja) : allAtenc;
  const porTratR = {};
  atencTrat.forEach(m => { const nombre = (((m.concept || "Atención").split(" · ")[0]) || "Atención").trim(); if (!porTratR[nombre]) porTratR[nombre] = { n: 0, total: 0 }; porTratR[nombre].n += 1; porTratR[nombre].total += (m.amount || 0); });
  const topTrat = Object.keys(porTratR).map(k => ({ name: k, n: porTratR[k].n, total: porTratR[k].total })).sort((a, b) => b.total - a.total).slice(0, 5);
  // Ventas por profesional (desde el campo prof del movimiento de atención).
  const porProf = {};
  atenciones.forEach(m => { const p = (m.prof || "").trim() || "Sin asignar"; if (!porProf[p]) porProf[p] = { n: 0, total: 0 }; porProf[p].n += 1; porProf[p].total += (m.amount || 0); });
  const topProf = Object.keys(porProf).map(k => ({ name: k, n: porProf[k].n, total: porProf[k].total })).sort((a, b) => b.total - a.total);
  // Pendiente de cobro: saldo del billing de pacientes que aún no se paga (total por cobrar).
  let pendienteCobro = 0;
  try {
    const _pts = (window.DB && window.DB.get("patients")) || [];
    _pts.forEach(p => (p.billing || []).forEach(b => { if (!b.paid && (b.amount > 0)) pendienteCobro += (b.amount || 0); }));
  } catch (e) {}
  const hora = ts => { try { return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } };
  const fechaTxt = now.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
  const periodoLbl = periodo === "hoy" ? ("de hoy · " + fechaTxt) : periodo === "semana" ? "de esta semana" : "de este mes";
  const subLbl = periodo === "hoy" ? "hoy" : periodo === "semana" ? "esta semana" : "este mes";
  // En semana/mes, antepone la fecha (día/mes) a la hora para distinguir entre días.
  const cuando = m => (periodo !== "hoy" && m._day ? m._day.slice(8) + "/" + m._day.slice(5, 7) + " · " : "") + hora(m.ts);
  const chip = (k, l) => <button key={k} onClick={() => setPeriodo(k)} style={{ fontFamily: T.sans, fontSize: 11.5, padding: "7px 14px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (periodo === k ? T.accent : T.line), background: periodo === k ? T.surface2 : T.surface, color: periodo === k ? T.text : T.textMute }}>{l}</button>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <SecHead T={T} title="Registro de Ventas" sub={ventasCount + " venta" + (ventasCount === 1 ? "" : "s") + " " + periodoLbl} />
        <div style={{ display: "flex", gap: 8 }}>
          <AdBtn T={T} onClick={() => setCierre(true)}>Cierre del día</AdBtn>
          <AdBtn T={T} primary onClick={() => setMov(true)}>+ Movimiento</AdBtn>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>{chip("hoy", "Hoy")}{chip("semana", "Esta semana")}{chip("mes", "Este mes")}</div>
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Caja</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(" + (adCost > 0 ? 4 : 3) + ",1fr)", gap: 10, marginBottom: 18 }}>
        <CajaCard T={T} l="Ingresos (bruto)" v={D.fmt(ingresos)} c="#1F8A5B" />
        {adCost > 0 && <CajaCard T={T} l="Publicidad" v={D.fmt(costoPub)} c="#B8860B" />}
        <CajaCard T={T} l="Egresos" v={D.fmt(egresos)} c="#C0285A" />
        <CajaCard T={T} l={adCost > 0 ? "Líquido (ganancia)" : "Neto (ganancia)"} v={D.fmt(neto)} c={T.accent} strong />
      </div>
      {/* Flujo de caja (6 meses) integrado en Registro de Ventas. */}
      <FlujoCajaChart T={T} />
      {/* Ranking de tratamientos que más venden: debajo del flujo/tráfico (a pedido). */}
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text }}>Tratamientos que más venden · {tratScope === "mes" ? "este mes" : "histórico"}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[["mes", "Este mes"], ["hist", "Histórico"]].map(([k, l]) => (
              <button key={k} onClick={() => setTratScope(k)} style={{ fontFamily: T.sans, fontSize: 11, padding: "6px 12px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (tratScope === k ? T.accent : T.line), background: tratScope === k ? T.surface2 : T.surface, color: tratScope === k ? T.text : T.textMute }}>{l}</button>
            ))}
          </div>
        </div>
        {topTrat.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Aún no hay ventas {tratScope === "mes" ? "este mes" : "registradas"}. Aparecerá cuando cobres atenciones desde la ficha del paciente.</div>}
        {topTrat.map((t, i) => {
          const max = topTrat[0].total || 1;
          return (
            <div key={t.name} style={{ padding: "9px 0", borderBottom: i === topTrat.length - 1 ? "none" : "1px solid " + T.lineSoft }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{t.name}</span>
                <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap" }}>{t.n} venta{t.n === 1 ? "" : "s"} · <b style={{ color: "#1F8A5B" }}>{D.fmt(t.total)}</b></span>
              </div>
              <div style={{ height: 5, borderRadius: 999, background: T.lineSoft, overflow: "hidden" }}>
                <div style={{ height: "100%", width: Math.max(6, Math.round(t.total / max * 100)) + "%", background: T.accent, borderRadius: 999, ...(luxF ? DS.barGrow(i, "x") : {}) }} />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, alignItems: "start" }}>
        <div style={luxF ? { ...DS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <div style={luxF ? DS.text(T, "title") : { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text }}>Atenciones cobradas {subLbl}</div>
          </div>
          {/* Buscador de pagos (P12): filtra atenciones y movimientos por concepto, método, paciente o profesional. */}
          <div style={{ position: "relative", marginBottom: 12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.7" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            <input value={payQ} onChange={e => setPayQ(e.target.value)} placeholder="Buscar pago (concepto, método, paciente…)" style={luxF
              ? { ...DS.ctl(T), width: "100%", padding: "0 12px 0 32px" }
              : { width: "100%", padding: "9px 12px 9px 32px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none", boxSizing: "border-box" }} />
          </div>
          {atencionesF.length === 0 ? <Empty2 T={T}>{payQ.trim() ? "Sin pagos que coincidan con la búsqueda." : "Sin atenciones cobradas " + subLbl + "."}</Empty2>
            : atencionesF.map(m => (
              <div key={m.id} style={luxF
                ? { display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", margin: "0 -8px", borderRadius: DS.r.ctl, borderBottom: "1px solid " + T.lineSoft, transition: DS.trans("background") }
                : { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + T.lineSoft }}
                onMouseEnter={luxF ? e => { e.currentTarget.style.background = T.surface2 || T.surface; } : undefined}
                onMouseLeave={luxF ? e => { e.currentTarget.style.background = "none"; } : undefined}>
                <div onClick={() => setEditMov(m)} title="Cambiar método de pago" style={{ flex: 1, minWidth: 0, cursor: "pointer" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{m.concept}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{cuando(m)} · {m.method}{adCost > 0 ? " · publicidad " + D.fmt(adCost) : ""}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: T.serif, fontSize: 16, color: "#1F8A5B" }}>{D.fmt(m.amount || 0)}</div>
                  {adCost > 0 && <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 1 }}>líquido {D.fmt(liqDe(m))}</div>}
                </div>
                <button onClick={() => setDelMov(m)} title="Eliminar de Caja (no toca la sesión)" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                </button>
              </div>
            ))}
          <div style={luxF ? { ...DS.text(T, "title"), margin: "20px 0 12px" } : { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, margin: "20px 0 12px" }}>Movimientos manuales</div>
          {manualesF.length === 0 ? <Empty2 T={T}>{payQ.trim() ? "Sin movimientos que coincidan." : "Sin movimientos manuales " + subLbl + "."}</Empty2>
            : manualesF.map(m => (
              <div key={m.id} onClick={() => setEditMov(m)} title="Cambiar método de pago" style={luxF
                ? { display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", margin: "0 -8px", borderRadius: DS.r.ctl, borderBottom: "1px solid " + T.lineSoft, cursor: "pointer", transition: DS.trans("background") }
                : { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + T.lineSoft, cursor: "pointer" }}
                onMouseEnter={luxF ? e => { e.currentTarget.style.background = T.surface2 || T.surface; } : undefined}
                onMouseLeave={luxF ? e => { e.currentTarget.style.background = "none"; } : undefined}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{m.concept || (m.type === "ingreso" ? "Ingreso" : "Egreso")}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{cuando(m)} · {m.method}</div>
                </div>
                <div style={{ fontFamily: T.serif, fontSize: 16, color: m.type === "ingreso" ? "#1F8A5B" : "#C0285A" }}>{m.type === "ingreso" ? "" : "− "}{D.fmt(m.amount || 0)}</div>
                {m._src === "caja" && <button onClick={(ev) => { ev.stopPropagation(); setDelMov(m); }} title="Eliminar movimiento" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                </button>}
              </div>
            ))}
        </div>
        <div style={luxF ? { ...DS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px" }}>
          <div style={luxF ? DS.text(T, "title") : { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 }}>Ingresos por método</div>
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
      {movs.length > 0 && (
        <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px", marginTop: 16 }}>
          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 }}>Ventas por profesional · {subLbl}</div>
          {topProf.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Aparecerá cuando cobres atenciones con un profesional asignado desde la ficha del paciente.</div>}
          {topProf.map((p, i) => {
            const max = topProf[0].total || 1;
            return (
              <div key={p.name} style={{ padding: "9px 0", borderBottom: i === topProf.length - 1 ? "none" : "1px solid " + T.lineSoft }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{p.name}</span>
                  <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap" }}>{p.n} atención{p.n === 1 ? "" : "es"} · <b style={{ color: "#1F8A5B" }}>{D.fmt(p.total)}</b></span>
                </div>
                <div style={{ height: 5, borderRadius: 999, background: T.lineSoft, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: Math.max(6, Math.round(p.total / max * 100)) + "%", background: T.accent, borderRadius: 999, ...(luxF ? DS.barGrow(i, "x") : {}) }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {delMov && <AdminKeyModal T={T} title="Eliminar movimiento de Caja"
        message={"Vas a quitar \"" + (delMov.concept || "este movimiento") + "\" de Caja. Esto NO borra la sesión del paciente, solo el registro en Caja. Ingresa el PIN de admin (se configura en Configuración → PIN de seguridad)."}
        onClose={() => setDelMov(null)}
        onOk={() => { if (delMov._src === "billing") billingDelete(delMov._patId, delMov._billId); else cashDelete(delMov.id); setDelMov(null); setTick(t => t + 1); }} />}
      {mov && <NuevoMovModal T={T} onClose={() => setMov(false)} onSave={mv => { cashAdd({ ...mv, kind: "manual" }); setMov(false); setTick(tick + 1); }} />}
      {cierre && <CierreModal T={T} ingresos={ingresos} egresos={egresos} costoIns={costoIns} neto={neto} fecha={fechaTxt} onClose={() => setCierre(false)} />}
      {editMov && <MetodoPagoModal T={T} mov={editMov} onClose={() => setEditMov(null)} onSave={metodo => {
        if (editMov._src === "billing") billingUpdateMethod(editMov._patId, editMov._billId, metodo);
        else cashUpdate(editMov.id, { method: metodo });
        setEditMov(null); setTick(t => t + 1);
      }} />}
    </div>
  );
}
function MetodoPagoModal({ T, mov, onClose, onSave }) {
  const METODOS = ["Efectivo", "Transferencia", "Débito", "Crédito", "Otro"];
  return (
    <AdModal T={T} title="Método de pago" onClose={onClose} footer={<AdBtn T={T} onClick={onClose}>Cerrar</AdBtn>}>
      <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 }}>{mov.concept} · <b style={{ color: T.text }}>{(window.JCDATA ? window.JCDATA.fmt(mov.amount || 0) : "$" + (mov.amount || 0))}</b><br />Elige el método de pago correcto:</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {METODOS.map(mt => (
          <button key={mt} onClick={() => onSave(mt)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 8, cursor: "pointer", fontFamily: T.sans, fontSize: 13.5, background: mov.method === mt ? T.surface2 : T.surface, border: "1px solid " + (mov.method === mt ? T.accent : T.line), color: T.text }}>
            {mt}{mov.method === mt && <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.accent, letterSpacing: ".1em", textTransform: "uppercase" }}>Actual</span>}
          </button>
        ))}
      </div>
    </AdModal>
  );
}
function CajaCard({ T, l, v, c, strong }) {
  const DS = window.JCDS, lux = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  if (lux) return (
    <div style={{ ...DS.card(T), padding: "18px 20px", borderColor: strong ? T.accent + "88" : T.line }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: c || T.accent }} />
        <span style={{ fontFamily: T.sans, fontSize: DS.ft.eyebrow, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute }}>{l}</span>
      </div>
      <div style={{ ...DS.text(T, "stat"), color: T.text }}>{v}</div>
    </div>
  );
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
  const ok = (parseInt(amount, 10) || 0) > 0 && (type === "ingreso" || concept.trim().length > 0);
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
  const [done, setDone] = useState(false);
  function confirmarCierre() {
    try {
      const cierres = (window.DB && window.DB.get("cierres_caja")) || [];
      cierres.unshift({ fecha, ingresos, egresos, costoIns, neto, ts: new Date().toISOString() });
      window.DB && window.DB.set("cierres_caja", cierres.slice(0, 90));
      setDone(true);
      try { window.jcmToast && window.jcmToast("Cierre del día registrado.", "ok"); } catch (e2) {}
    } catch (e) {
      try { window.jcmError && window.jcmError("Error al registrar el cierre."); } catch (e2) {}
    }
  }
  return (
    <AdModal T={T} title="Cierre del día" onClose={onClose} footer={done ? <AdBtn T={T} full onClick={onClose}>Cerrar</AdBtn> : <AdBtn T={T} primary full onClick={confirmarCierre}>Confirmar cierre del día</AdBtn>}>
      <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 14, textTransform: "capitalize" }}>{fecha}</div>
      {[["Ingresos (bruto)", ingresos, "#1F8A5B", ""], ["Egresos", egresos, "#C0285A", "− "]].map(([l, v, c, s]) => (
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

/* ═══════════════════ SUITE NUEVA (N1–N10) — gateada a Los Medique ═══════════════════ */
// Contexto de clínica para la IA (nombre, sucursales, etc.).
function jcmClinicCtx() { try { return (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || {}; } catch (e) { return {}; } }
// mediqueAI devuelve { ok, reply, error }. Extrae el texto de forma robusta.
function jcmAIReply(r) { if (r && r.ok && r.reply) return ("" + r.reply).trim(); if (r && typeof r.reply === "string") return r.reply.trim(); return ""; }
function jcmAIError(r) { return (r && r.error) ? ("" + r.error) : ""; }
// Encabezado con degradado para las soluciones IA.
function IAHero({ T, icon, color, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, background: "linear-gradient(135deg," + color + "18, " + (T.surface2 || T.surface) + ")", border: "1px solid " + T.line, borderRadius: 16, padding: "18px 20px", marginBottom: 18, flexWrap: "wrap" }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ fontFamily: T.serif, fontSize: 22, color: T.text, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 4, lineHeight: 1.5 }}>{sub}</div>
      </div>
    </div>
  );
}

/* ── N2 · Notas Clínicas (voz → nota clínica) ── */
function NotasClinicasView({ T, patients, updatePatient }) {
  const [pid, setPid] = useState("");
  const [txt, setTxt] = useState("");
  const [rec, setRec] = useState(false);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const recRef = useRef(null);
  const SR = (typeof window !== "undefined") && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const pat = patients.find(p => p.id === pid);
  function toggleRec() {
    if (!SR) { window.jcmToast && window.jcmToast("Tu navegador no permite dictado por voz. Usa Chrome/Edge o escribe la nota.", "info"); return; }
    if (rec) { try { recRef.current && recRef.current.stop(); } catch (e) {} setRec(false); return; }
    const r = new SR(); r.lang = "es-CL"; r.continuous = true; r.interimResults = true;
    let base = txt ? txt + " " : "";
    r.onresult = e => { let s = ""; for (let i = e.resultIndex; i < e.results.length; i++) s += e.results[i][0].transcript; setTxt(base + s); };
    r.onend = () => setRec(false);
    r.onerror = ev => { setRec(false); const c = ev && ev.error; const m = c === "not-allowed" || c === "service-not-allowed" ? "Permite el micrófono para dictar (no funciona en modo incógnito)." : c === "no-speech" ? "No se detectó voz. Intenta de nuevo." : "No se pudo iniciar el dictado."; window.jcmToast && window.jcmToast(m, "info"); };
    recRef.current = r; try { r.start(); setRec(true); } catch (e) { window.jcmToast && window.jcmToast("No se pudo iniciar el dictado por voz.", "info"); }
  }
  async function formatear() {
    if (!txt.trim() || busy || !window.mediqueAI) { if (!window.mediqueAI) window.jcmToast && window.jcmToast("La IA no está disponible (falta GROQ_API_KEY en el servidor).", "info"); return; }
    setBusy(true);
    try {
      const msg = [{ role: "user", content: "Convierte el siguiente dictado en una NOTA CLÍNICA ordenada en formato SOAP (Subjetivo, Objetivo, Análisis, Plan), en español de Chile, concisa y profesional. Solo la nota, sin comentarios:\n\n" + txt }];
      const r = await window.mediqueAI(msg, jcmClinicCtx(), { max_tokens: 600 });
      const out = jcmAIReply(r);
      if (out) setTxt(out); else window.jcmToast && window.jcmToast(jcmAIError(r) || "La IA no respondió, intenta de nuevo.", "info");
    } catch (e) { window.jcmToast && window.jcmToast("No se pudo formatear la nota.", "error"); }
    setBusy(false);
  }
  function guardar() {
    if (!pat || !txt.trim()) { window.jcmToast && window.jcmToast(pat ? "Escribe o dicta la nota primero." : "Elige un paciente.", "info"); return; }
    const nota = { id: "rx" + Date.now(), tipo: "indicaciones", fecha: new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" }), diag: "Nota clínica", rp: txt.trim(), ind: "", ctrl: "" };
    updatePatient(pat.id, { recetas: [nota, ...(pat.recetas || [])] });
    setSaved(true); setTimeout(() => setSaved(false), 2000); setTxt("");
    try { window.jcmAudit && window.jcmAudit("Nota clínica guardada · " + pat.name); } catch (e) {}
  }
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div>
      <SecHead T={T} title="Notas Clínicas" sub="Dicta por voz y la IA arma la nota en formato clínico" />
      <IAHero T={T} color="#8B5CF6" title="Registrar deja de ser una carga" sub="Transcripción de voz en tiempo real · formato clínico automático · notas completas y precisas." icon={<><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>} />
      <div style={luxF ? { ...DS.card(T), padding: "18px 20px", maxWidth: 760 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", maxWidth: 760 }}>
        <label style={{ display: "block", marginBottom: 12 }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Paciente</span>
          <select value={pid} onChange={e => setPid(e.target.value)} style={inp}><option value="">Elegir paciente…</option>{patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
          <button onClick={toggleRec} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: T.sans, fontSize: 12, fontWeight: 600, padding: "10px 16px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (rec ? "#C0285A" : T.line), background: rec ? "#C0285A" : "transparent", color: rec ? "#fff" : T.text }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: rec ? "#fff" : "#C0285A", ...(rec ? { animation: "jcFade 1s infinite alternate" } : {}) }} />{rec ? "Detener dictado" : "Dictar por voz"}</button>
          <button onClick={formatear} disabled={busy || !txt.trim()} style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, padding: "10px 16px", borderRadius: 999, cursor: txt.trim() ? "pointer" : "default", border: "1px solid " + T.accent, background: "transparent", color: T.accent, opacity: txt.trim() ? 1 : .5 }}>{busy ? "Formateando…" : "✦ Formatear con IA (SOAP)"}</button>
        </div>
        <textarea value={txt} onChange={e => setTxt(e.target.value)} rows={9} placeholder="Dicta o escribe la nota clínica aquí…" style={{ ...inp, resize: "vertical", lineHeight: 1.6 }} />
        <div style={{ marginTop: 12 }}><AdBtn T={T} primary onClick={guardar}>{saved ? "✓ Guardada en la ficha" : "Guardar en la ficha del paciente"}</AdBtn></div>
        {!SR && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 8 }}>El dictado por voz funciona en Chrome/Edge. En otros navegadores, escribe la nota y usa "Formatear con IA".</div>}
      </div>
    </div>
  );
}

/* ── N2 · Resumen Clínico (IA resume la historia del paciente) ── */
function ResumenClinicoView({ T, patients, appts }) {
  const [pid, setPid] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  const pat = patients.find(p => p.id === pid);
  const alergias = pat ? (pat.alergias || pat.allergies || "").toString() : "";
  async function generar() {
    if (!pat || busy) return;
    if (!window.mediqueAI) { window.jcmToast && window.jcmToast("La IA no está disponible (falta GROQ_API_KEY).", "info"); return; }
    setBusy(true); setOut("");
    const hist = (pat.recetas || []).slice(0, 12).map(r => "- " + r.fecha + ": " + (r.diag || r.tipo) + " · " + (r.rp || "").slice(0, 120)).join("\n");
    const cxt = "Paciente: " + (pat.name || "") + (pat.age ? " (" + pat.age + " años)" : "") + "\nRUT: " + (pat.rut || "—") + "\nAlergias/condiciones: " + (alergias || "no registradas") + "\nEtiquetas: " + ((pat.tags || []).join(", ") || "—") + "\nHistorial:\n" + (hist || "sin registros");
    try {
      const r = await window.mediqueAI([{ role: "user", content: "Eres asistente clínico. Resume la historia del paciente en 5-8 viñetas claras (condiciones activas, tratamientos en curso, alertas de alergias, y próximos controles sugeridos). Español de Chile. Datos:\n\n" + cxt }], jcmClinicCtx(), { max_tokens: 550 });
      setOut(jcmAIReply(r) || ("No pude generar el resumen" + (jcmAIError(r) ? ": " + jcmAIError(r) : ". Intenta de nuevo.")));
    } catch (e) { setOut("No se pudo generar el resumen ahora."); }
    setBusy(false);
  }
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box", maxWidth: 420 };
  return (
    <div>
      <SecHead T={T} title="Resumen Clínico" sub="La historia deja de acumularse: se organiza y se vuelve accionable" />
      <IAHero T={T} color="#3AAE8C" title="Historial resumido por IA" sub="Alertas de alergias y condiciones · acceso rápido a tratamientos activos." icon={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>} />
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 16 }}>
        <label style={{ flex: 1, minWidth: 220 }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Paciente</span>
          <select value={pid} onChange={e => { setPid(e.target.value); setOut(""); }} style={inp}><option value="">Elegir paciente…</option>{patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
        <AdBtn T={T} primary onClick={generar}>{busy ? "Generando…" : "✦ Generar resumen"}</AdBtn>
      </div>
      {pat && alergias && <div style={{ background: "rgba(192,40,90,.08)", border: "1px solid #C0285A44", borderRadius: 10, padding: "12px 14px", marginBottom: 14, fontFamily: T.sans, fontSize: 12.5, color: T.text }}>⚠ <b>Alergias / condiciones:</b> {alergias}</div>}
      {(() => {
        const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
        if (busy && luxF) return (
          <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 20px", maxWidth: 760, display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={DS.skel(T, { height: 12, width: "88%" })} />
            <div style={DS.skel(T, { height: 12, width: "70%" })} />
            <div style={DS.skel(T, { height: 12, width: "80%" })} />
          </div>
        );
        return out ? <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 20px", maxWidth: 760, fontFamily: T.sans, fontSize: 13.5, color: T.text, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{out}</div>
          : pat ? <Empty2 T={T}>Toca "Generar resumen" para que la IA resuma la historia de {pat.name}.</Empty2> : <Empty2 T={T}>Elige un paciente para generar su resumen clínico.</Empty2>;
      })()}
    </div>
  );
}

/* ── N2 · Reportes IA (pregunta en lenguaje natural sobre tu clínica) ──
   Fusionado dentro de Análisis → Reportes (ya no es una sección de nav aparte); `embedded` oculta
   el título/hero propios cuando se renderiza incrustado en ReportesView. */
function ReportesIAView({ T, patients, appts, embedded }) {
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [busy, setBusy] = useState(false);
  const ctx = (() => {
    let cash = []; try { cash = (window.cashAll && window.cashAll()) || []; } catch (e) {}
    const mes = new Date().toISOString().slice(0, 7);
    const inM = ts => (ts || "").slice(0, 7) === mes;
    const ingresosMes = cash.filter(m => m.type === "ingreso" && inM(m.ts)).reduce((s, m) => s + (m.amount || 0), 0);
    const atMes = cash.filter(m => m.kind === "atencion" && inM(m.ts));
    const porTrat = {}; atMes.forEach(m => { const k = (m.concept || "").split(" · ")[0]; porTrat[k] = (porTrat[k] || 0) + 1; });
    const top = Object.keys(porTrat).sort((a, b) => porTrat[b] - porTrat[a]).slice(0, 5).map(k => k + " (" + porTrat[k] + ")").join(", ");
    const citasMes = (appts || []).filter(a => (a.fecha || "").slice(0, 7) === mes && a.status !== "anulada").length;
    return "Datos de la clínica (este mes):\n- Pacientes totales: " + patients.length + "\n- Citas del mes: " + citasMes + "\n- Ingresos del mes: $" + ingresosMes.toLocaleString("es-CL") + "\n- Atenciones cobradas del mes: " + atMes.length + "\n- Tratamientos más hechos: " + (top || "—");
  })();
  async function pregunta(texto) {
    const pregunta = (texto || q).trim(); if (!pregunta || busy) return;
    setQ(""); const next = [...msgs, { role: "user", content: pregunta }]; setMsgs(next);
    if (!window.mediqueAI) { setMsgs([...next, { role: "assistant", content: "(La IA no está disponible: falta GROQ_API_KEY en el servidor.)" }]); return; }
    setBusy(true);
    try {
      const r = await window.mediqueAI([{ role: "user", content: "Eres analista de una clínica estética. Responde en español de Chile, breve y accionable, usando SOLO estos datos:\n\n" + ctx + "\n\nPregunta: " + pregunta }], jcmClinicCtx(), { max_tokens: 500 });
      setMsgs([...next, { role: "assistant", content: jcmAIReply(r) || (jcmAIError(r) || "No pude responder ahora, intenta de nuevo.") }]);
    } catch (e) { setMsgs([...next, { role: "assistant", content: "No pude responder ahora, intenta de nuevo." }]); }
    setBusy(false);
  }
  const sug = ["¿Cómo va el mes vs. lo esperado?", "¿Qué tratamiento conviene promocionar?", "¿Dónde estoy perdiendo ingresos?"];
  const inp = { flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  return (
    <div>
      {embedded ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#E8952A14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E8952A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9h-9z" /><path d="M12 3v9l6.4-6.4" /></svg></div>
          <div><div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>Pregúntale a la IA</div><div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>Lenguaje natural sobre el rendimiento de tu clínica</div></div>
        </div>
      ) : (
        <>
          <SecHead T={T} title="Reportes IA" sub="Los datos dejan de ser números: se convierten en decisiones" />
          <IAHero T={T} color="#E8952A" title="Reportes conversacionales" sub="Pregunta en lenguaje natural · visualizaciones automáticas · insights accionables." icon={<><path d="M12 3a9 9 0 1 0 9 9h-9z" /><path d="M12 3v9l6.4-6.4" /></>} />
        </>
      )}
      <div style={{ maxWidth: 780 }}>
        <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: 18, minHeight: 220, marginBottom: 12, display: "flex", flexDirection: "column", gap: 10 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 16, minHeight: 220, marginBottom: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          {msgs.length === 0 && <div style={{ margin: "auto", textAlign: "center", maxWidth: 420 }}><div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 12 }}>Pregúntale a la IA sobre el rendimiento de tu clínica.</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>{sug.map(s => <button key={s} onClick={() => pregunta(s)} style={{ fontFamily: T.sans, fontSize: 11.5, padding: "8px 12px", borderRadius: 999, cursor: "pointer", border: "1px solid " + T.line, background: "transparent", color: T.accent }}>{s}</button>)}</div></div>}
          {msgs.map((m, i) => <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", background: m.role === "user" ? T.accent : T.surface2, color: m.role === "user" ? (T.onAccent || "#fff") : T.text, border: m.role === "user" ? "none" : "1px solid " + T.line, borderRadius: 12, padding: "11px 14px", fontFamily: T.sans, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{m.content}</div>)}
          {busy && <div style={{ alignSelf: "flex-start", fontFamily: T.sans, fontSize: 12, color: T.textMute }}>Analizando…</div>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === "Enter") pregunta(); }} placeholder="Escribe tu pregunta…" style={inp} />
          <AdBtn T={T} primary onClick={() => pregunta()}>Preguntar</AdBtn>
        </div>
      </div>
    </div>
  );
}

/* ── N2 · Contralor IA (verificación automática de registros) ── */
function ContraloriaView({ T, patients, appts, openP, goApt, go }) {
  const hoyISO = new Date().toISOString().slice(0, 10);
  const citasSinProfList = (appts || []).filter(a => a.status !== "anulada" && !(a.prof || "").trim() && (a.fecha || "") >= hoyISO);
  const sinRutList = patients.filter(p => !(p.rut || "").trim());
  const sinTelList = patients.filter(p => !(p.phone || "").replace(/\D/g, ""));
  const sinConsentList = (window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : []);
  const cobrosPendList = (() => {
    const L = [];
    try { patients.forEach(p => (p.billing || []).forEach(b => { if (!b.paid && b.amount > 0) L.push({ p, b }); })); } catch (e) {}
    return L;
  })();
  const alertas = (() => {
    const A = [];
    if (sinConsentList.length) A.push({ t: "Consentimientos pendientes", n: sinConsentList.length, d: sinConsentList.length + " paciente(s) con cita de procedimiento sin consentimiento firmado.", to: "pendientes", c: "#C9A227", kind: "patients", list: sinConsentList, tab: "consent" });
    if (sinRutList.length) A.push({ t: "Fichas sin RUT", n: sinRutList.length, d: sinRutList.length + " paciente(s) sin RUT registrado (dificulta boletas y trazabilidad).", to: "pacientes", c: "#C0285A", kind: "patients", list: sinRutList, tab: "fichaclinica" });
    if (sinTelList.length) A.push({ t: "Fichas sin teléfono", n: sinTelList.length, d: sinTelList.length + " paciente(s) sin teléfono (no reciben recordatorios).", to: "pacientes", c: "#C9A227", kind: "patients", list: sinTelList, tab: "fichaclinica" });
    if (citasSinProfList.length) A.push({ t: "Citas sin profesional", n: citasSinProfList.length, d: citasSinProfList.length + " cita(s) futura(s) sin profesional asignado.", to: "agenda", c: "#C0285A", kind: "appts", list: citasSinProfList });
    if (cobrosPendList.length) A.push({ t: "Cobros pendientes", n: cobrosPendList.length, d: cobrosPendList.length + " atención(es) registrada(s) sin pago.", to: "caja", c: "#C9A227", kind: "cobros", list: cobrosPendList, tab: "facturacion" });
    return A;
  })();
  const [openAlert, setOpenAlert] = useState(null); // alerta con popup abierto
  const ok = alertas.length === 0;
  function revisar(a) {
    // Un solo elemento accionable: ir directo, sin popup intermedio.
    if (a.list.length === 1) {
      if (a.kind === "appts") { if (goApt) { goApt(a.list[0].id); return; } }
      else if (a.kind === "cobros") { if (openP) { openP(a.list[0].p.id, a.tab); return; } }
      else if (openP) { openP(a.list[0].id, a.tab); return; }
    }
    setOpenAlert(a);
  }
  const rowStyle = { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, color: T.text };
  return (
    <div>
      <SecHead T={T} title="Contralor IA" sub="Gestionar deja de ser reaccionar: la inteligencia anticipa y alerta" />
      <IAHero T={T} color="#8B5CF6" title="Control de calidad continuo" sub="Verificación automática de registros · alertas de inconsistencias · control de calidad continuo." icon={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>} />
      {ok ? <div style={{ background: "rgba(31,138,91,.08)", border: "1px solid #1F8A5B44", borderRadius: 12, padding: "24px", textAlign: "center", maxWidth: 760 }}><div style={{ fontFamily: T.serif, fontSize: 19, color: "#1F8A5B" }}>✓ Todo en orden</div><div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 6 }}>No se detectaron inconsistencias en los registros.</div></div>
        : <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 780 }}>{alertas.map((a, i) => (
            <div key={i} style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { display: "flex", alignItems: "center", gap: 14, ...window.JCDS.card(T), borderLeft: "4px solid " + a.c, padding: "14px 16px", ...window.JCDS.reveal(i) } : { display: "flex", alignItems: "center", gap: 14, background: T.surface, border: "1px solid " + T.line, borderLeft: "4px solid " + a.c, borderRadius: 10, padding: "14px 16px" }}>
              <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, background: a.c + "1c", color: a.c, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, fontWeight: 600 }}>{a.n}</span>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text }}>{a.t}</div><div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 2 }}>{a.d}</div></div>
              {/* Botón "Revisar" tintado con el color de la alerta → refuerza la severidad de un vistazo. */}
              <button onClick={() => revisar(a)} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: a.c, background: a.c + "16", border: "1px solid " + a.c + "44", borderRadius: 8, padding: "8px 13px", cursor: "pointer" }}>Revisar →</button>
            </div>))}</div>}
      {openAlert && (
        <AdModal T={T} title={openAlert.t + " (" + openAlert.n + ")"} onClose={() => setOpenAlert(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {openAlert.kind === "appts" && openAlert.list.map(a => (
              <button key={a.id} style={rowStyle} onClick={() => { setOpenAlert(null); if (goApt) goApt(a.id); }}>
                <span style={{ flex: 1, minWidth: 0 }}>{a.name || "Paciente"} <span style={{ color: T.textMute }}>· {a.fecha}{a.time ? " " + a.time : ""}{a.proc ? " · " + a.proc : ""}</span></span>
                <span style={{ color: T.accent, fontSize: 11, flexShrink: 0 }}>Ir a la cita →</span>
              </button>
            ))}
            {openAlert.kind === "cobros" && openAlert.list.map(({ p, b }, idx) => (
              <button key={p.id + "_" + idx} style={rowStyle} onClick={() => { setOpenAlert(null); if (openP) openP(p.id, openAlert.tab); }}>
                <span style={{ flex: 1, minWidth: 0 }}>{p.name} <span style={{ color: T.textMute }}>· {b.proc || "Atención"}{b.amount ? " · " + (window.JCDATA ? window.JCDATA.fmt(b.amount) : b.amount) : ""}</span></span>
                <span style={{ color: T.accent, fontSize: 11, flexShrink: 0 }}>Ir a la ficha →</span>
              </button>
            ))}
            {openAlert.kind === "patients" && openAlert.list.map(p => (
              <button key={p.id} style={rowStyle} onClick={() => { setOpenAlert(null); if (openP) openP(p.id, openAlert.tab); }}>
                <span style={{ flex: 1, minWidth: 0 }}>{p.name}{p.rut ? <span style={{ color: T.textMute }}> · {p.rut}</span> : null}</span>
                <span style={{ color: T.accent, fontSize: 11, flexShrink: 0 }}>Ir a la ficha →</span>
              </button>
            ))}
          </div>
        </AdModal>
      )}
    </div>
  );
}

/* ── N4 · Telemedicina (videoconsulta con sala Jitsi) ── */
/* ── N7 · Pagos y Gastos ── */
const GASTO_CATS = ["Arriendo", "Sueldos", "Insumos", "Marketing", "Servicios básicos", "Equipamiento", "Impuestos", "Otros"];
function PagosGastosView({ T }) {
  const D = window.JCDATA;
  const [items, setItems] = useState(() => { try { return (window.DB && window.DB.get("expenses")) || []; } catch (e) { return []; } });
  const [f, setF] = useState({ categoria: GASTO_CATS[0], concepto: "", monto: "", recurrente: false });
  function persist(n) { setItems(n); try { window.DB && window.DB.set("expenses", n); } catch (e) {} }
  function add() { const m = parseInt(f.monto, 10) || 0; if (!f.concepto.trim() || !m) { window.jcmToast && window.jcmToast("Completa concepto y monto.", "info"); return; } persist([{ id: "g" + Date.now(), fecha: new Date().toISOString().slice(0, 10), categoria: f.categoria, concepto: f.concepto.trim(), monto: m, recurrente: f.recurrente }, ...items]); setF({ ...f, concepto: "", monto: "" }); }
  async function del(id) { if (await (window.jcmConfirm || window.confirm)("¿Eliminar este gasto?", { danger: true })) persist(items.filter(x => x.id !== id)); }
  const mes = new Date().toISOString().slice(0, 7);
  const mesItems = items.filter(g => (g.fecha || "").slice(0, 7) === mes);
  const totalMes = mesItems.reduce((s, g) => s + (g.monto || 0), 0);
  const porCat = {}; mesItems.forEach(g => { porCat[g.categoria] = (porCat[g.categoria] || 0) + g.monto; });
  const cats = Object.keys(porCat).sort((a, b) => porCat[b] - porCat[a]);
  const inp = { padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return (
    <div>
      <SecHead T={T} title="Pagos y Gastos" sub="Identifica y registra el detalle de tus gastos" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginBottom: 16 }}>
        <CajaCard T={T} l="Gasto del mes" v={D.fmt(totalMes)} c="#C0285A" />
        <CajaCard T={T} l="N° de gastos" v={mesItems.length} c={T.accent} />
        <CajaCard T={T} l="Recurrentes" v={items.filter(g => g.recurrente).length} c="#C9A227" />
      </div>
      <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "14px 16px", marginBottom: 16, display: "grid", gridTemplateColumns: "160px 1fr 130px auto", gap: 8, alignItems: "center" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "grid", gridTemplateColumns: "160px 1fr 130px auto", gap: 8, alignItems: "center" }}>
        <select value={f.categoria} onChange={e => setF({ ...f, categoria: e.target.value })} style={inp}>{GASTO_CATS.map(c => <option key={c}>{c}</option>)}</select>
        <input value={f.concepto} onChange={e => setF({ ...f, concepto: e.target.value })} placeholder="Concepto del gasto" style={inp} />
        <input value={f.monto} onChange={e => setF({ ...f, monto: e.target.value.replace(/\D/g, "") })} inputMode="numeric" placeholder="Monto $" style={inp} />
        <AdBtn T={T} primary onClick={add}>+ Registrar</AdBtn>
      </div>
      {cats.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>{cats.map(c => <span key={c} style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, background: T.surface, border: "1px solid " + T.line, borderRadius: 999, padding: "6px 12px" }}>{c}: <b style={{ color: T.text }}>{D.fmt(porCat[c])}</b></span>)}</div>}
      {mesItems.length === 0 ? <Empty2 T={T}>Aún no registras gastos este mes.</Empty2>
        : <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>{mesItems.map(g => (
            <div key={g.id} style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { display: "flex", alignItems: "center", gap: 12, ...window.JCDS.card(T), padding: "11px 15px" } : { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "11px 14px" }}>
              <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", color: T.accent, background: T.accent + "12", borderRadius: 6, padding: "3px 8px", flexShrink: 0 }}>{g.categoria}</span>
              <div style={{ flex: 1, minWidth: 0 }}><span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{g.concepto}</span>{g.recurrente && <span style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint }}> · recurrente</span>}<div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>{g.fecha}</div></div>
              <span style={{ fontFamily: T.serif, fontSize: 16, color: "#C0285A" }}>− {D.fmt(g.monto)}</span>
              <button onClick={() => del(g.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg></button>
            </div>))}</div>}
    </div>
  );
}

/* ── N7 · Remuneraciones (sueldo base + comisión sobre ventas del mes) ── */
function RemuneracionesView({ T }) {
  const D = window.JCDATA;
  let team = []; try { team = (window.DB && window.DB.get("team")) || []; } catch (e) {}
  const [cfg, setCfg] = useState(() => { try { return (window.DB && window.DB.get("remun_cfg")) || {}; } catch (e) { return {}; } });
  function setC(id, patch) { const n = { ...cfg, [id]: { ...(cfg[id] || { base: 0, comision: 0 }), ...patch } }; setCfg(n); try { window.DB && window.DB.set("remun_cfg", n); } catch (e) {} }
  const mes = new Date().toISOString().slice(0, 7);
  let cash = []; try { cash = (window.cashAll && window.cashAll()) || []; } catch (e) {}
  const ventasProf = {}; cash.filter(m => m.kind === "atencion" && (m.ts || "").slice(0, 7) === mes).forEach(m => { const p = (m.prof || "").trim(); if (p) ventasProf[p] = (ventasProf[p] || 0) + (m.amount || 0); });
  const inp = { width: 110, padding: "8px 10px", borderRadius: 7, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" };
  return (
    <div>
      <SecHead T={T} title="Remuneraciones" sub="Sueldo base + comisión sobre las ventas del mes de cada profesional" />
      {team.length === 0 ? <Empty2 T={T}>Agrega profesionales en Equipo para calcular remuneraciones.</Empty2>
        : <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>{team.map(m => {
            const c = cfg[m.id] || { base: 0, comision: 0 };
            const ventas = ventasProf[m.name] || 0;
            const comMonto = Math.round(ventas * (parseFloat(c.comision) || 0) / 100);
            const total = (parseInt(c.base, 10) || 0) + comMonto;
            return (
              <div key={m.id} style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "14px 16px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: m.color || T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 16, flexShrink: 0 }}>{(m.name || "?").split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
                  <div style={{ flex: 1, minWidth: 140 }}><div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text }}>{m.name}</div><div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>Ventas del mes: {D.fmt(ventas)}</div></div>
                  <label style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>Sueldo base<br /><input value={c.base || ""} onChange={e => setC(m.id, { base: e.target.value.replace(/\D/g, "") })} inputMode="numeric" placeholder="0" style={{ ...inp, marginTop: 3 }} /></label>
                  <label style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>Comisión %<br /><input value={c.comision || ""} onChange={e => setC(m.id, { comision: e.target.value.replace(/[^0-9.]/g, "") })} inputMode="decimal" placeholder="0" style={{ ...inp, width: 70, marginTop: 3 }} /></label>
                  <div style={{ textAlign: "right", minWidth: 120 }}><div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute }}>Liquidación</div><div style={{ fontFamily: T.serif, fontSize: 20, color: T.accent }}>{D.fmt(total)}</div>{comMonto > 0 && <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint }}>incl. comisión {D.fmt(comMonto)}</div>}</div>
                </div>
              </div>);
          })}</div>}
      <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 14, maxWidth: 760, lineHeight: 1.5 }}>Cálculo referencial (base + % sobre ventas cobradas del mes con ese profesional). No incluye leyes sociales ni impuestos; para liquidación legal formal se puede integrar un módulo previsional más adelante.</div>
    </div>
  );
}

/* ── N7 · Laboratorios y exámenes ── */
// Exámenes más solicitados en Chile (para elegir con un clic).
const EXAM_COMUNES = ["Hemograma completo", "Perfil bioquímico", "Perfil lipídico", "Perfil hepático", "Glicemia en ayunas", "Hemoglobina glicosilada (HbA1c)", "Creatinina", "Nitrógeno ureico (BUN)", "Ácido úrico", "Electrolitos plasmáticos (ELP)", "TSH", "T4 libre", "Perfil tiroideo", "Orina completa", "Urocultivo", "VHS", "Proteína C reactiva (PCR)", "VDRL / RPR", "VIH (Elisa)", "Ferritina", "Perfil de fierro", "Vitamina D", "Vitamina B12", "Ácido fólico", "Grupo y Rh", "Sub-unidad β-HCG (embarazo)", "Pruebas de coagulación (TP/TTPA/INR)", "Calcio / Fósforo / Magnesio", "Bilirrubina total y directa", "Transaminasas (GOT/GPT)"];
if (typeof window !== "undefined") window.EXAM_COMUNES = EXAM_COMUNES;
function LaboratoriosView({ T, patients }) {
  const [orders, setOrders] = useState(() => { try { return (window.DB && window.DB.get("lab_orders")) || []; } catch (e) { return []; } });
  const [f, setF] = useState({ patId: "", sel: [], extra: "", tipo: "Interno" });
  function persist(n) { setOrders(n); try { window.DB && window.DB.set("lab_orders", n); } catch (e) {} }
  function toggleEx(ex) { setF(s => ({ ...s, sel: s.sel.indexOf(ex) >= 0 ? s.sel.filter(x => x !== ex) : [...s.sel, ex] })); }
  function add() {
    const p = patients.find(x => x.id === f.patId);
    const lista = [...f.sel, ...(f.extra.trim() ? [f.extra.trim()] : [])];
    if (!p || !lista.length) { window.jcmToast && window.jcmToast("Elige paciente y al menos un examen.", "info"); return; }
    persist([{ id: "lo" + Date.now(), patId: p.id, patName: p.name, examenes: lista.join(", "), tipo: f.tipo, estado: "Solicitado", fecha: new Date().toISOString().slice(0, 10) }, ...orders]);
    setF({ ...f, sel: [], extra: "" });
  }
  const EST = ["Solicitado", "En proceso", "Listo", "Entregado"];
  const estColor = e => ({ "Solicitado": "#C9A227", "En proceso": "#2AA5C9", "Listo": "#1F8A5B", "Entregado": T.textMute })[e] || T.textMute;
  function nextEst(o) { const i = EST.indexOf(o.estado); const ne = EST[(i + 1) % EST.length]; persist(orders.map(x => x.id === o.id ? { ...x, estado: ne } : x)); }
  async function del(id) { if (await (window.jcmConfirm || window.confirm)("¿Eliminar esta orden?", { danger: true })) persist(orders.filter(x => x.id !== id)); }
  const inp = { padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return (
    <div>
      <SecHead T={T} title="Laboratorios y exámenes" sub="Gestiona solicitudes de exámenes internas y externas" />
      <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "18px 20px", marginBottom: 16 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <select value={f.patId} onChange={e => setF({ ...f, patId: e.target.value })} style={{ ...inp, flex: 1, minWidth: 180 }}><option value="">Paciente…</option>{patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
          <select value={f.tipo} onChange={e => setF({ ...f, tipo: e.target.value })} style={{ ...inp, flex: "0 0 140px" }}><option>Interno</option><option>Externo</option></select>
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Exámenes (elige los que necesites)</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, maxHeight: 168, overflowY: "auto" }}>
          {EXAM_COMUNES.map(ex => { const on = f.sel.indexOf(ex) >= 0; return (
            <button key={ex} onClick={() => toggleEx(ex)} style={{ fontFamily: T.sans, fontSize: 11.5, padding: "6px 12px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (on ? T.accent : T.line), background: on ? T.accent + "16" : "transparent", color: on ? T.accent : T.textMute }}>{on ? "✓ " : ""}{ex}</button>
          ); })}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <input value={f.extra} onChange={e => setF({ ...f, extra: e.target.value })} placeholder="Otro examen (opcional)…" style={{ ...inp, flex: 1, minWidth: 200 }} />
          <span style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>{f.sel.length} seleccionado(s)</span>
          <AdBtn T={T} primary onClick={add}>+ Crear orden</AdBtn>
        </div>
      </div>
      {orders.length === 0 ? <Empty2 T={T}>Aún no hay órdenes de laboratorio.</Empty2>
        : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{orders.map(o => (
            <div key={o.id} style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { display: "flex", alignItems: "center", gap: 12, ...window.JCDS.card(T), padding: "12px 15px", flexWrap: "wrap" } : { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}><div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text }}>{o.patName} <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, fontWeight: 400 }}>· {o.tipo} · {o.fecha}</span></div><div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 2 }}>{o.examenes}</div></div>
              <button onClick={() => nextEst(o)} title="Cambiar estado" style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: estColor(o.estado), background: estColor(o.estado) + "18", border: "1px solid " + estColor(o.estado) + "55", borderRadius: 999, padding: "6px 12px", cursor: "pointer" }}>{o.estado} ↻</button>
              <button onClick={() => del(o.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
            </div>))}</div>}
    </div>
  );
}

/* ── N7 · Convenios ── */
function ConveniosView({ T }) {
  const [items, setItems] = useState(() => { try { return (window.DB && window.DB.get("convenios")) || []; } catch (e) { return []; } });
  const [f, setF] = useState({ empresa: "", contacto: "", descuento: "", notas: "" });
  function persist(n) { setItems(n); try { window.DB && window.DB.set("convenios", n); } catch (e) {} }
  function add() { if (!f.empresa.trim()) { window.jcmToast && window.jcmToast("Escribe el nombre de la empresa/entidad.", "info"); return; } persist([{ id: "cv" + Date.now(), ...f, empresa: f.empresa.trim(), descuento: parseInt(f.descuento, 10) || 0 }, ...items]); setF({ empresa: "", contacto: "", descuento: "", notas: "" }); }
  async function del(id) { if (await (window.jcmConfirm || window.confirm)("¿Eliminar este convenio?", { danger: true })) persist(items.filter(x => x.id !== id)); }
  const inp = { padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return (
    <div>
      <SecHead T={T} title="Convenios" sub="Gestiona los convenios con empresas y otras entidades" />
      <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "14px 16px", marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr 120px auto", gap: 8, alignItems: "center" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr 120px auto", gap: 8, alignItems: "center" }}>
        <input value={f.empresa} onChange={e => setF({ ...f, empresa: e.target.value })} placeholder="Empresa / entidad" style={inp} />
        <input value={f.contacto} onChange={e => setF({ ...f, contacto: e.target.value })} placeholder="Contacto (teléfono/correo)" style={inp} />
        <input value={f.descuento} onChange={e => setF({ ...f, descuento: e.target.value.replace(/\D/g, "") })} inputMode="numeric" placeholder="Dcto %" style={inp} />
        <AdBtn T={T} primary onClick={add}>+ Agregar</AdBtn>
      </div>
      {items.length === 0 ? <Empty2 T={T}>Aún no tienes convenios registrados.</Empty2>
        : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{items.map(c => (
            <div key={c.id} style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { display: "flex", alignItems: "center", gap: 12, ...window.JCDS.card(T), padding: "12px 15px", flexWrap: "wrap" } : { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 180 }}><div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text }}>{c.empresa}</div><div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>{[c.contacto, c.notas].filter(Boolean).join(" · ")}</div></div>
              {c.descuento > 0 && <span style={{ fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.accent, background: T.accent + "14", borderRadius: 999, padding: "5px 12px" }}>{c.descuento}% dcto</span>}
              <button onClick={() => del(c.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
            </div>))}</div>}
    </div>
  );
}

/* ── N9 · Chat interno del equipo ── */
function ChatInternoView({ T }) {
  const yo = (() => { try { return (window.JCSAAS && window.JCSAAS.currentUserName && window.JCSAAS.currentUserName()) || (window.JCSAAS && window.JCSAAS.userEmail && window.JCSAAS.userEmail()) || "Yo"; } catch (e) { return "Yo"; } })();
  const [msgs, setMsgs] = useState(() => { try { return (window.DB && window.DB.get("team_chat")) || []; } catch (e) { return []; } });
  const [txt, setTxt] = useState("");
  const endRef = useRef(null);
  useEffect(() => { function reload() { try { setMsgs((window.DB && window.DB.get("team_chat")) || []); } catch (e) {} } window.addEventListener("jcsaas:data", reload); return () => window.removeEventListener("jcsaas:data", reload); }, []);
  useEffect(() => { if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight; }, [msgs]);
  function send() { const t = txt.trim(); if (!t) return; const n = [...msgs, { id: "m" + Date.now(), author: yo, text: t, ts: Date.now() }].slice(-300); setMsgs(n); try { window.DB && window.DB.set("team_chat", n); } catch (e) {} setTxt(""); }
  const hora = ts => { try { return new Date(ts).toLocaleString("es-CL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } };
  return (
    <div>
      <SecHead T={T} title="Chat interno" sub="Conversa con tu equipo dentro del panel" />
      <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { maxWidth: 760, ...window.JCDS.card(T), overflow: "hidden", display: "flex", flexDirection: "column", height: "62vh" } : { maxWidth: 760, background: T.surface, border: "1px solid " + T.line, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", height: "62vh" }}>
        <div ref={endRef} className="jc-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {msgs.length === 0 && <div style={{ margin: "auto", fontFamily: T.sans, fontSize: 12.5, color: T.textFaint }}>Sin mensajes aún. Escribe el primero 👇</div>}
          {msgs.map(m => { const mine = m.author === yo; return (
            <div key={m.id} style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "80%" }}>
              {!mine && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, margin: "0 4px 3px" }}>{m.author}</div>}
              <div style={{ background: mine ? T.accent : T.surface2, color: mine ? (T.onAccent || "#fff") : T.text, border: mine ? "none" : "1px solid " + T.line, borderRadius: 12, padding: "9px 13px", fontFamily: T.sans, fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{m.text}</div>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, color: T.textFaint, margin: "3px 4px 0", textAlign: mine ? "right" : "left" }}>{hora(m.ts)}</div>
            </div>); })}
        </div>
        <div style={{ display: "flex", gap: 8, padding: "12px 14px", borderTop: "1px solid " + T.line }}>
          <input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Escribe un mensaje…" style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }} />
          <AdBtn T={T} primary onClick={send}>Enviar</AdBtn>
        </div>
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 10 }}>Los mensajes se sincronizan con todo el equipo de la clínica.</div>
    </div>
  );
}

/* ── N9 · Flujo de caja (ingresos vs egresos por mes) ── */
// Gráfico de flujo de caja (6 meses) reutilizable — se usa en Flujo de caja y en Registro de Ventas.
function FlujoCajaChart({ T, title }) {
  const D = window.JCDATA;
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" && jcdsLux());
  let cash = []; try { cash = (window.cashMovimientos && window.cashMovimientos()) || (window.cashAll && window.cashAll()) || []; } catch (e) {}
  const now = new Date();
  const meses = []; for (let i = 5; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); meses.push({ key: d.toISOString().slice(0, 7), lbl: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][d.getMonth()] }); }
  const data = meses.map(m => { const ms = cash.filter(x => ((x._day || x.ts || "")).slice(0, 7) === m.key); const ing = ms.filter(x => x.type !== "egreso").reduce((s, x) => s + (x.amount || 0), 0); const egr = ms.filter(x => x.type === "egreso").reduce((s, x) => s + (x.amount || 0), 0); return { ...m, ing, egr, neto: ing - egr }; });
  const maxV = Math.max(1, ...data.map(d => Math.max(d.ing, d.egr)));
  return (
    <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "18px 20px", marginBottom: 16 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>
      <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text, marginBottom: 16 }}>{title || "Flujo de caja · últimos 6 meses"}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 180 }}>
        {data.map((m, mi) => (
          <div key={m.key} title={"Ganancia de " + m.lbl + ": " + D.fmt(m.neto)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "default" }}>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4 }}>
              <div title={"Ingresos " + D.fmt(m.ing)} style={{ width: "40%", height: Math.round(m.ing / maxV * 140) + "px", minHeight: 2, background: "#1F8A5B", borderRadius: "4px 4px 0 0", ...(luxF ? DS.barGrow(mi) : {}) }} />
              <div title={"Egresos " + D.fmt(m.egr)} style={{ width: "40%", height: Math.round(m.egr / maxV * 140) + "px", minHeight: 2, background: "#C0285A", borderRadius: "4px 4px 0 0", ...(luxF ? DS.barGrow(mi) : {}) }} />
            </div>
            <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>{m.lbl}</span>
          </div>))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 14, justifyContent: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11, color: T.textMute }}><span style={{ width: 11, height: 11, borderRadius: 3, background: "#1F8A5B" }} />Ingresos</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11, color: T.textMute }}><span style={{ width: 11, height: 11, borderRadius: 3, background: "#C0285A" }} />Egresos</span>
      </div>
    </div>
  );
}
/* ── N9 · Boletas (emisión / registro; scaffold SII) ── */
const SII_FACTURADORES = [
  { k: "LibreDTE", link: "https://libredte.cl/", desc: "Gratuito/open source · boleta y factura electrónica" },
  { k: "Bsale", link: "https://www.bsale.cl/", desc: "Boletas, facturas y POS" },
  { k: "Nubox", link: "https://www.nubox.com/", desc: "Facturación y contabilidad" },
  { k: "Facturación gratuita SII", link: "https://www.sii.cl/servicios_online/1039-.html", desc: "Sistema gratuito del propio SII" }
];
function BoletasView({ T, patients }) {
  const D = window.JCDATA;
  const [sii, setSii] = useState(() => { try { return (window.DB && window.DB.get("sii_cfg")) || { facturador: "" }; } catch (e) { return { facturador: "" }; } });
  function saveSii(n) { setSii(n); try { window.DB && window.DB.set("sii_cfg", n); } catch (e) {} }
  const connected = !!sii.facturador;
  let cash = []; try { cash = (window.cashMovimientos && window.cashMovimientos()) || (window.cashAll && window.cashAll()) || []; } catch (e) {}
  const mes = new Date().toISOString().slice(0, 7);
  const atenc = cash.filter(m => m.kind === "atencion" && ((m._day || m.ts || "")).slice(0, 7) === mes);
  const [emitidas, setEmitidas] = useState(() => { try { return (window.DB && window.DB.get("boletas_emitidas")) || {}; } catch (e) { return {}; } });
  function emitir(m) {
    // Documento de boleta (mismo motor de documentos). La e-boleta al SII requiere facturador conectado.
    const b = { wm: (window.clinicName && window.clinicName()) || "Medique" };
    const num = "B-" + Date.now().toString().slice(-6);
    const inner = "<div class='titleblock'><div><div class='eyebrow'>Comprobante</div><h1 class='doc-title'>Boleta <span class='it'>de atención</span></h1></div><div class='folio'><span class='k'>N°</span><span class='v vbig'>" + num + "</span></div></div>"
      + "<div class='body'><div class='section'><div class='section-head'><span class='sh-label'>Detalle</span><span class='sh-rule'></span></div>"
      + "<div class='textbox'>" + (m.concept || "Atención") + "<br>Fecha: " + ((m.ts || "").slice(0, 10)) + "<br>Método: " + (m.method || "—") + "<br><br><b>Total: " + (D.fmt(m.amount || 0)) + "</b></div></div></div>";
    try { if (window.jcmDocHTML && window.jcmPrintHTML) window.jcmPrintHTML(window.jcmDocHTML("Boleta " + num, b, inner)); } catch (e) {}
    const n = { ...emitidas, [m.id]: num }; setEmitidas(n); try { window.DB && window.DB.set("boletas_emitidas", n); } catch (e) {}
  }
  return (
    <div>
      <SecHead T={T} title="Boletas" sub="Emite comprobantes de tus atenciones cobradas" />
      {/* Conexión al SII / facturador electrónico */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Boleta electrónica (SII)</div>
      <div style={{ background: connected ? "rgba(31,138,91,.08)" : (T.accentSoft || "rgba(84,112,127,.10)"), border: "1px solid " + (connected ? "#1F8A5B44" : T.line), borderRadius: 12, padding: "14px 16px", marginBottom: 14, fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.5 }}>
        {connected ? <span>Facturador conectado: <b style={{ color: T.text }}>{sii.facturador}</b>. Las credenciales/certificado SII se cargan en el servidor para emitir boletas con folio válido.</span>
          : <span>Puedes <b style={{ color: T.text }}>imprimir/guardar</b> el comprobante ahora mismo. Para <b style={{ color: T.text }}>boleta electrónica con folio válido</b>, conecta un facturador autorizado por el SII:</span>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 10, marginBottom: 22 }}>
        {SII_FACTURADORES.map(fz => { const sel = sii.facturador === fz.k; return (
          <div key={fz.k} style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "14px 16px", borderColor: sel ? T.accent + "88" : T.line } : { background: T.surface, border: "1px solid " + (sel ? T.accent : T.line), borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>{fz.k}</div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 12px", lineHeight: 1.5 }}>{fz.desc}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <a href={fz.link} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: "#fff", background: T.accent, borderRadius: 8, padding: "8px 13px", textDecoration: "none" }}>Conectar ↗</a>
              <button onClick={() => saveSii({ ...sii, facturador: sel ? "" : fz.k })} style={{ fontFamily: T.sans, fontSize: 11.5, color: sel ? T.accent : T.textMute, background: "none", border: "1px solid " + (sel ? T.accent : T.line), borderRadius: 8, padding: "8px 13px", cursor: "pointer" }}>{sel ? "✓ En uso" : "Usar este"}</button>
            </div>
          </div>); })}
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Atenciones cobradas este mes</div>
      {atenc.length === 0 ? <Empty2 T={T}>Sin atenciones cobradas este mes.</Empty2>
        : <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>{atenc.map(m => (
            <div key={m.id} style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { display: "flex", alignItems: "center", gap: 12, ...window.JCDS.card(T), padding: "11px 15px", flexWrap: "wrap" } : { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "11px 14px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 180 }}><div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{m.concept}</div><div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>{(m.ts || "").slice(0, 10)} · {m.method}</div></div>
              <span style={{ fontFamily: T.serif, fontSize: 16, color: "#1F8A5B" }}>{D.fmt(m.amount || 0)}</span>
              {emitidas[m.id] ? <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>Boleta {emitidas[m.id]}</span> : null}
              <AdBtn T={T} small onClick={() => emitir(m)}>{emitidas[m.id] ? "Reimprimir" : "Emitir boleta"}</AdBtn>
            </div>))}</div>}
    </div>
  );
}

/* ── N10 · Panel de desempeño ── */
function DesempenoView({ T, patients, appts }) {
  const D = window.JCDATA;
  const mes = new Date().toISOString().slice(0, 7);
  const A = (appts || []).filter(a => a.status !== "anulada");
  const citasMes = A.filter(a => (a.fecha || "").slice(0, 7) === mes);
  const noShow = citasMes.filter(a => a.status === "no_asistio").length;
  const atendidas = citasMes.filter(a => a.status === "atendida" || a.attended).length;
  const totalCerradas = noShow + atendidas;
  const noShowPct = totalCerradas ? Math.round(noShow / totalCerradas * 100) : 0;
  // Retención: pacientes con 2+ atenciones registradas.
  const recurrentes = patients.filter(p => (p.recetas || []).length + (p.history || []).length >= 2).length;
  const retencion = patients.length ? Math.round(recurrentes / patients.length * 100) : 0;
  let cash = []; try { cash = (window.cashAll && window.cashAll()) || []; } catch (e) {}
  const atMes = cash.filter(m => m.kind === "atencion" && (m.ts || "").slice(0, 7) === mes);
  const ingMes = atMes.reduce((s, m) => s + (m.amount || 0), 0);
  const ticket = atMes.length ? Math.round(ingMes / atMes.length) : 0;
  const nuevosMes = patients.filter(p => { const t = p.fechaTs || 0; if (!t) return false; return new Date(t).toISOString().slice(0, 7) === mes; }).length;
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const card = (l, v, c, sub) => <div style={luxF ? { ...DS.card(T), padding: "18px 20px" } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" }}><div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute }}>{l}</div><div style={{ fontFamily: T.serif, fontSize: 30, color: c || T.text, lineHeight: 1.1, marginTop: 4 }}>{v}</div>{sub && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 3 }}>{sub}</div>}</div>;
  return (
    <div>
      <SecHead T={T} title="Panel de desempeño" sub="El diagnóstico oportuno para tu centro de salud" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginBottom: 14 }}>
        {card("Citas del mes", citasMes.length, T.accent, "agendadas")}
        {card("Atendidas", atendidas, "#1F8A5B", "este mes")}
        {card("Inasistencia", noShowPct + "%", noShowPct > 20 ? "#C0285A" : "#C9A227", noShow + " no asistió")}
        {card("Retención", retencion + "%", "#1F8A5B", recurrentes + " con 2+ atenciones")}
        {card("Ticket promedio", D.fmt(ticket), T.accent, "por atención")}
        {card("Pacientes nuevos", nuevosMes, "#2AA5C9", "este mes")}
      </div>
      <div style={{ background: T.accentSoft || "rgba(84,112,127,.08)", border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px", maxWidth: 760, fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.6 }}>
        {noShowPct > 20 ? "⚠ Tu inasistencia está alta (" + noShowPct + "%). Activa recordatorios y confirmación de citas para bajarla." : "✓ Tu inasistencia está controlada."} {retencion < 30 ? " La retención es baja: considera campañas de re-cita y fidelidad." : " Buena retención de pacientes."}
      </div>
    </div>
  );
}

/* ── N10 · Encuestas de satisfacción ── */
// Las respuestas SOLO las escriben los pacientes desde el link público (review.html, campo
// "stars" reutilizado como nota 0-10) → Firestore tenants/{cid}/reviews. El panel es de solo
// lectura: nunca se agregan respuestas manualmente aquí (evita ensuciar las estadísticas).
function EncuestasView({ T, patients }) {
  const [cfg, setCfg] = useState(() => { try { return (window.DB && window.DB.get("survey_cfg")) || { pregunta: "¿Qué tan satisfecho quedaste con tu atención?" }; } catch (e) { return { pregunta: "¿Qué tan satisfecho quedaste con tu atención?" }; } });
  const [resp, setResp] = useState(() => { try { return (window.DB && window.DB.get("reviews")) || []; } catch (e) { return []; } });
  const [importing, setImporting] = useState(false);
  function saveCfg(n) { setCfg(n); try { window.DB && window.DB.set("survey_cfg", n); } catch (e) {} }
  async function traer() {
    if (importing || !(window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.importWebReviews)) return;
    setImporting(true);
    try { await window.JCSAAS.importWebReviews(); setResp((window.DB && window.DB.get("reviews")) || []); } catch (e) {}
    setImporting(false);
  }
  const prom = resp.length ? (resp.reduce((s, r) => s + (r.stars || 0), 0) / resp.length) : 0;
  const promotores = resp.filter(r => (r.stars || 0) >= 9).length, detractores = resp.filter(r => (r.stars || 0) <= 6).length;
  const nps = resp.length ? Math.round((promotores - detractores) / resp.length * 100) : 0;
  const reviewUrl = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.reviewLink) ? window.JCSAAS.reviewLink() : "";
  return (
    <div>
      <SecHead T={T} title="Encuestas de satisfacción" sub="Conoce la opinión de tus pacientes y potencia tu atención" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginBottom: 16 }}>
        <CajaCard T={T} l="Respuestas" v={resp.length} c={T.accent} />
        <CajaCard T={T} l="Promedio (0–10)" v={prom.toFixed(1)} c="#1F8A5B" />
        <CajaCard T={T} l="NPS" v={nps} c={nps >= 50 ? "#1F8A5B" : nps >= 0 ? "#C9A227" : "#C0285A"} />
      </div>
      <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "18px 20px", marginBottom: 16, maxWidth: 760 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 16, maxWidth: 760 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent }}>Pregunta de la encuesta</div>
          <AdBtn T={T} small onClick={traer}>{importing ? "Trayendo…" : "Traer respuestas"}</AdBtn>
        </div>
        <input value={cfg.pregunta} onChange={e => saveCfg({ ...cfg, pregunta: e.target.value })} style={{ width: "100%", padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" }} />
        {reviewUrl && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 10, lineHeight: 1.5 }}>Este es el link que reciben tus pacientes (se incluye solo al final de las Indicaciones enviadas por WhatsApp): <a href={reviewUrl} target="_blank" rel="noopener" style={{ color: T.accent }}>{reviewUrl}</a></div>}
      </div>
      <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "18px 20px", maxWidth: 760 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", maxWidth: 760 }}>
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text, marginBottom: 12 }}>Respuestas recientes</div>
        {resp.length === 0
          ? <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Aún no hay respuestas. Se llenan solas cuando un paciente responde la encuesta desde su link.</div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{resp.slice(0, 20).map((r, i) => (
              <div key={r.id || i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: i === resp.length - 1 ? "none" : "1px solid " + T.lineSoft }}>
                <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 12.5, fontWeight: 700, color: "#fff", background: (r.stars || 0) <= 6 ? "#C0285A" : (r.stars || 0) <= 8 ? "#C9A227" : "#1F8A5B" }}>{r.stars || 0}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text }}>{r.name || "Anónimo"}</div>
                  {r.comment && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 2 }}>{r.comment}</div>}
                </div>
              </div>
            ))}</div>}
      </div>
    </div>
  );
}

/* ── N6 · Pagos online (UI + conectar proveedor) ── */
// Proveedores de pago: link para crear/configurar la cuenta + variables que el servidor necesita.
const PAY_PROVIDERS = [
  { k: "Mercado Pago", link: "https://www.mercadopago.cl/developers/panel/app", env: "MP_ACCESS_TOKEN", ready: true, desc: "Access Token de producción" },
  { k: "Flow", link: "https://www.flow.cl/app/web/misDatos.php", env: "FLOW_API_KEY + FLOW_SECRET", ready: true, desc: "API Key y Secret Key" },
  { k: "Transbank (Webpay)", link: "https://www.transbankdevelopers.cl/", env: "TBK_API_KEY + TBK_COMMERCE_CODE", ready: false, desc: "Código de comercio y API key" },
  { k: "Khipu", link: "https://khipu.com/page/inicio", env: "KHIPU_RECEIVER_ID + KHIPU_SECRET", ready: false, desc: "Receiver ID y Secret" }
];
function PagosOnlineView({ T, patients }) {
  const [cfg, setCfg] = useState(() => { try { return (window.DB && window.DB.get("pay_cfg")) || { provider: "Mercado Pago", anticipado: false }; } catch (e) { return { provider: "Mercado Pago", anticipado: false }; } });
  function saveCfg(n) { setCfg(n); try { window.DB && window.DB.set("pay_cfg", n); } catch (e) {} }
  const [pid, setPid] = useState(""); const [monto, setMonto] = useState(""); const [concepto, setConcepto] = useState("");
  const [busy, setBusy] = useState(false); const [link, setLink] = useState(""); const [err, setErr] = useState("");
  const pat = patients.find(p => p.id === pid);
  async function generar() {
    setErr(""); setLink(""); const amt = parseInt(monto, 10) || 0;
    if (!cfg.provider) { setErr("Elige un proveedor."); return; }
    if (amt < 100) { setErr("Ingresa un monto válido."); return; }
    setBusy(true);
    try {
      const tok = (window.JCSAAS && window.JCSAAS.idToken) ? await window.JCSAAS.idToken() : null;
      const r = await fetch("/api/team-access", { method: "POST", headers: { "Content-Type": "application/json", ...(tok ? { Authorization: "Bearer " + tok } : {}) }, body: JSON.stringify({ action: "pay-link", provider: cfg.provider, amount: amt, desc: (concepto.trim() || "Atención") + (pat ? " · " + pat.name : "") }) }).then(x => x.json());
      if (r && r.ok && r.url) setLink(r.url);
      else if (r && r.configured === false) setErr("Aún no está activo: el administrador debe cargar las credenciales del proveedor en el servidor.");
      else setErr((r && r.error) || "No se pudo generar el link.");
    } catch (e) { setErr("No se pudo contactar el servidor de pagos."); }
    setBusy(false);
  }
  function waLink() { if (!pat || !link) return; const ph = (pat.phone || "").replace(/\D/g, ""); if (ph.length < 8) { window.jcmToast && window.jcmToast("El paciente no tiene teléfono.", "info"); return; } const clin = (window.clinicName && window.clinicName()) || "Medique"; const msg = "Hola " + (pat.name || "") + " 👋 Aquí tu link de pago para " + (concepto.trim() || "tu atención") + " en " + clin + ":\n" + link; window.open("https://wa.me/" + ph + "?text=" + encodeURIComponent(msg), "_blank", "noopener"); }
  const inp = { padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return (
    <div>
      <SecHead T={T} title="Pagos online" sub="Cobra en línea, asegura asistencia y concilia automático" />
      {/* 1 · Conectar proveedor */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>1 · Conecta tu cuenta</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 12, marginBottom: 22 }}>
        {PAY_PROVIDERS.map(p => { const sel = cfg.provider === p.k; return (
          <div key={p.k} style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "16px 18px", borderColor: sel ? T.accent + "88" : T.line } : { background: T.surface, border: "1px solid " + (sel ? T.accent : T.line), borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>{p.k}</div>
              {p.ready ? <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: "#1F8A5B", border: "1px solid #1F8A5B55", borderRadius: 999, padding: "3px 9px" }}>Listo para conectar</span>
                : <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.textMute, border: "1px solid " + T.line, borderRadius: 999, padding: "3px 9px" }}>A pedido</span>}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "6px 0 12px", lineHeight: 1.5 }}>Credenciales: <b style={{ color: T.text }}>{p.desc}</b></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <a href={p.link} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: "#fff", background: T.accent, borderRadius: 8, padding: "9px 14px", textDecoration: "none" }}>Conectar / crear cuenta ↗</a>
              <button onClick={() => saveCfg({ ...cfg, provider: p.k })} style={{ fontFamily: T.sans, fontSize: 11.5, color: sel ? T.accent : T.textMute, background: "none", border: "1px solid " + (sel ? T.accent : T.line), borderRadius: 8, padding: "9px 14px", cursor: "pointer" }}>{sel ? "✓ Elegido" : "Usar este"}</button>
            </div>
          </div>); })}
      </div>
      <div style={{ background: T.accentSoft || "rgba(84,112,127,.08)", border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", marginBottom: 22, fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.6 }}>
        🔒 Por seguridad, las <b style={{ color: T.text }}>credenciales secretas</b> se cargan en el servidor (Vercel → Variables de entorno: <code>{(PAY_PROVIDERS.find(p => p.k === cfg.provider) || {}).env || "…"}</code>), nunca en el navegador. Una vez cargadas, el botón de abajo genera links reales.
      </div>
      {/* 2 · Generar link de pago */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>2 · Genera un link de pago</div>
      <div style={window.JCDS && (typeof jcdsLux === "function" && jcdsLux()) ? { ...window.JCDS.card(T), padding: "18px 20px", maxWidth: 720 } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", maxWidth: 720 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 8, marginBottom: 8 }}>
          <select value={pid} onChange={e => setPid(e.target.value)} style={inp}><option value="">Paciente (opcional)…</option>{patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
          <input value={monto} onChange={e => setMonto(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Monto $" style={inp} />
        </div>
        <input value={concepto} onChange={e => setConcepto(e.target.value)} placeholder="Concepto (ej: Botox 3 zonas)" style={{ ...inp, width: "100%", marginBottom: 10 }} />
        <AdBtn T={T} primary onClick={generar}>{busy ? "Generando…" : "Generar link de pago (" + (cfg.provider || "—") + ")"}</AdBtn>
        {err && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", marginTop: 10, lineHeight: 1.5 }}>{err}</div>}
        {link && <div style={{ marginTop: 12, padding: "12px 14px", background: T.bg, border: "1px solid " + T.line, borderRadius: 10 }}>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 6 }}>Link generado</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input readOnly value={link} onFocus={e => e.target.select()} style={{ ...inp, flex: 1, minWidth: 220, fontSize: 12 }} />
            <button onClick={() => { try { navigator.clipboard.writeText(link); window.jcmToast && window.jcmToast("Link copiado.", "ok"); } catch (e) {} }} style={{ fontFamily: T.sans, fontSize: 11.5, color: T.text, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "0 13px", cursor: "pointer" }}>Copiar</button>
            <a href={link} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", fontFamily: T.sans, fontSize: 11.5, color: T.text, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "0 13px", textDecoration: "none" }}>Abrir</a>
            {pat && <button onClick={waLink} style={{ fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: "#1F8A5B", background: "none", border: "1px solid #1F8A5B", borderRadius: 8, padding: "9px 13px", cursor: "pointer" }}>WhatsApp</button>}
          </div>
        </div>}
      </div>
    </div>
  );
}

Object.assign(window, { AdminKeyModal, jcmVerifyAdminKey, CADMIN, clinVal, MiniCalendar, ServiciosView, EquipoView, ProfesionalForm, SucursalesView, CrmView, TutorialesView, ConsentimientosView, DifusionesView, CopilotConfigView, FichaEditorView, PERM_SECCIONES, FidelidadView, MarketingView, Mini, IntegracionesView, ReportesView, ConfigView, ClinCard, Row, ToggleRow, ColaboracionView, FichaClinicaForm, SecHead, AdSwitch, HorariosEditor, IndTemplatesEditor, getIndTemplates, PendientesView, Group, Empty2, PendRow, InventarioView, NewInvModal, NewProcModal, invAdj, AdministracionView, INV_SEED, PROC_SEED, CajaView, cashAdd, cashDelete, cashToday, cashMovimientos, _localDay, jcmInsumoCost, jcmAdCostPerPatient, NotasClinicasView, ResumenClinicoView, ReportesIAView, ContraloriaView, PagosGastosView, RemuneracionesView, LaboratoriosView, ConveniosView, ChatInternoView, BoletasView, DesempenoView, EncuestasView, PagosOnlineView });
