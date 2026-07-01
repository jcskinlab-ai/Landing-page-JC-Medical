const CADMIN = {
  team: [
    { id: "t1", name: "Juan Claudio Parra", role: "Enfermero \xB7 Medicina est\xE9tica", email: "jc.skinlab@gmail.com", phone: "+56 9 9788 0877", color: "#6A8296", active: true, access: true, pin: "1234", perms: { Agenda: true, Pacientes: true, Inventario: true, Servicios: true, Reportes: true, Marketing: true, Configuraci\u00F3n: true } },
    { id: "t2", name: "Recepci\xF3n", role: "Agenda y atenci\xF3n", email: "recepcion@medique.cl", phone: "+56 9 0000 0000", color: "#B9C2CB", active: true, access: true, pin: "0000", perms: { Agenda: true, Pacientes: true } }
  ],
  waMessages: [
    { id: "w1", name: "Valentina P\xE9rez", msg: "Hola, \xBFtienen hora para botox esta semana?", ago: "hace 12 min" },
    { id: "w2", name: "Josefa Mu\xF1oz", msg: "\xBFCu\xE1nto cuesta la rinomodelaci\xF3n?", ago: "hace 40 min" },
    { id: "w3", name: "N\xFAmero nuevo", msg: "Quiero agendar una evaluaci\xF3n \u{1F64C}", ago: "hace 2 h" }
  ],
  bizComments: [
    { id: "b1", name: "@cami.rojas", msg: "\xBFEsto sirve para las l\xEDneas de la frente?", net: "Instagram", ago: "hace 25 min" },
    { id: "b2", name: "@fer_estetica", msg: "Hermoso resultado \u{1F60D} \xBFprecio?", net: "Instagram", ago: "hace 1 h" }
  ],
  fidelity: [
    { id: "p1", name: "Mar\xEDa Gonz\xE1lez", pts: 320, tier: "Oro" },
    { id: "p2", name: "Camila Soto", pts: 180, tier: "Plata" },
    { id: "p3", name: "Antonia Vera", pts: 540, tier: "Oro" }
  ],
  campaigns: [
    { id: "c1", name: "Botox \xB7 invierno", net: "Meta Ads", reach: 18420, leads: 42, spend: 12e4, active: true },
    { id: "c2", name: "Bioestimulaci\xF3n 20%", net: "Meta Ads", reach: 9650, leads: 23, spend: 8e4, active: true },
    { id: "c3", name: "Rinomodelaci\xF3n", net: "Instagram", reach: 12100, leads: 17, spend: 6e4, active: false }
  ],
  integrations: [
    { id: "metaads", name: "Meta Ads", desc: "Campa\xF1as de Facebook e Instagram Ads", letter: "f", color: "#1877F2", connected: true, stat: "2 campa\xF1as activas" },
    { id: "metabiz", name: "Meta Business Suite", desc: "Bandeja de Instagram y Facebook", letter: "B", color: "#0866FF", connected: true, stat: "DM y comentarios" },
    { id: "gmail", name: "Gmail", desc: "Recordatorios y confirmaciones por correo", letter: "M", color: "#EA4335", connected: true, stat: "jcmedical@gmail.com" },
    { id: "drive", name: "Google Drive", desc: "Respaldo de fichas y consentimientos", letter: "\u25B2", color: "#1FA463", connected: false, stat: "Respaldo autom\xE1tico" },
    { id: "gcal", name: "Google Calendar", desc: "Sincroniza tu agenda", letter: "31", color: "#4285F4", connected: false, stat: "Sync bidireccional" },
    { id: "gemini", name: "Gemini IA", desc: "Asistente cl\xEDnico: res\xFAmenes y notas", letter: "\u2726", color: "#8B6FE0", connected: true, stat: "Asistente activo" },
    { id: "wa", name: "WhatsApp Business", desc: "Recordatorios y agenda por WhatsApp", letter: "\u2706", color: "#1F8A5B", connected: true, stat: "+56 9 9788 0877" },
    { id: "landing", name: "Landing medique.cl", desc: "Reservas online conectadas al sitio", letter: "jc", color: "#0a0f1c", connected: true, stat: "Reservas en vivo" }
  ]
};
if (typeof window !== "undefined") window.CADMIN = CADMIN;
const INTEGRATIONS_CATALOG = [
  { id: "metaads", name: "Meta Ads", desc: "Campa\xF1as de Facebook e Instagram Ads", letter: "f", color: "#1877F2", stat: "Campa\xF1as conectadas", info: "Conecta tu cuenta de Meta Ads para ver tu inversi\xF3n, leads y ROAS directamente en el panel de Medique. Requiere un token de lectura (ads_read) generado desde Meta Business Suite." },
  { id: "metabiz", name: "Meta Business Suite", desc: "Bandeja de Instagram y Facebook", letter: "B", color: "#0866FF", stat: "DM y comentarios", info: "Centraliza los mensajes directos y comentarios de Instagram y Facebook en el panel. Responde y gestiona tu bandeja social sin salir de Medique." },
  { id: "gmail", name: "Gmail", desc: "Recordatorios y confirmaciones por correo", letter: "M", color: "#EA4335", stat: "Correo conectado", info: "Env\xEDa recordatorios de cita, confirmaciones y seguimientos post-tratamiento autom\xE1ticamente por correo electr\xF3nico a tus pacientes." },
  { id: "drive", name: "Respaldo de fichas", desc: "Respaldo autom\xE1tico de fichas y citas a tu correo", letter: "\u25B2", color: "#1FA463", stat: "Respaldo autom\xE1tico", info: "Cada semana te enviamos autom\xE1ticamente un respaldo (.json) de todas tus fichas y citas al correo de la cl\xEDnica. Gu\xE1rdalo donde quieras (por ejemplo, s\xFAbelo a tu Google Drive)." },
  { id: "gcal", name: "Google Calendar", desc: "Sincroniza tu agenda", letter: "31", color: "#4285F4", stat: "Sync bidireccional", info: "Sincroniza la agenda del panel con Google Calendar en tiempo real. Las citas agendadas en Medique aparecen en tu calendario de Google y viceversa." },
  { id: "groq", name: "Groq (Agente IA)", desc: "Asistente IA del panel \xB7 WhatsApp pendiente", letter: "\u2726", color: "#8B6FE0", stat: "Asistente activo", info: "La IA ya est\xE1 activa en el panel: potencia el Copiloto y los res\xFAmenes de fichas. Que responda autom\xE1ticamente a tus pacientes por WhatsApp se activa cuando conectes WhatsApp." },
  { id: "wa", name: "WhatsApp Business", desc: "Recordatorios y agenda por WhatsApp", letter: "\u2706", color: "#1F8A5B", stat: "WhatsApp conectado", info: "Conecta tu n\xFAmero de WhatsApp Business para enviar recordatorios de cita, indicaciones post-tratamiento, campa\xF1as de re-cita y permitir que los pacientes agenden directamente por WhatsApp." },
  { id: "landing", name: "Reserva online Medique", desc: "Reservas online conectadas a tu link", letter: "M", color: "#0a0f1c", stat: "Reservas en vivo", info: "Activa la integraci\xF3n con tu p\xE1gina de reservas en medique.cl. Las reservas que hagan tus pacientes desde el link p\xFAblico entran autom\xE1ticamente a tu agenda del panel." }
];
function MiniCalendar({ T, selected, onSelect }) {
  const [base, setBase] = useState(() => {
    const d = /* @__PURE__ */ new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const MES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const DOW = ["L", "M", "M", "J", "V", "S", "D"];
  const y = base.getFullYear(), m = base.getMonth();
  const first = new Date(y, m, 1);
  let startDow = (first.getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  function pick(d) {
    const ds = new Date(y, m, d);
    onSelect(ds.toISOString().slice(0, 10));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setBase(new Date(y, m - 1, 1)), style: navBtn(T) }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, MES[m], " ", y), /* @__PURE__ */ React.createElement("button", { onClick: () => setBase(new Date(y, m + 1, 1)), style: navBtn(T) }, "\u203A")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 } }, DOW.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { textAlign: "center", fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", color: T.textFaint, paddingBottom: 4 } }, d)), cells.map((d, i) => {
    if (!d) return /* @__PURE__ */ React.createElement("div", { key: i });
    const ds = new Date(y, m, d).toISOString().slice(0, 10);
    const isSel = selected === ds, isToday = todayStr === ds;
    return /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => pick(d), style: {
      aspectRatio: "1",
      borderRadius: 6,
      cursor: "pointer",
      fontFamily: T.sans,
      fontSize: 12.5,
      background: isSel ? T.accent : "transparent",
      color: isSel ? T.onAccent : T.text,
      border: "1px solid " + (isToday && !isSel ? T.accent : "transparent")
    } }, d);
  })));
}
function navBtn(T) {
  return { width: 30, height: 30, borderRadius: 6, border: "1px solid " + T.line, background: "transparent", color: T.text, cursor: "pointer", fontSize: 16, lineHeight: 1 };
}
const SVC_CAT_LABEL = {
  "Toxina botul\xEDnica": "Toxina botul\xEDnica",
  "Bioestimulaci\xF3n de col\xE1geno con Sculptra": "Bioestimulaci\xF3n de col\xE1geno",
  "Armonizaci\xF3n facial": "\xC1cido hialur\xF3nico",
  "Mesoterapia \xB7 vitaminas faciales": "Mesoterapia",
  "Quemadores de grasa": "Lipol\xEDticos inyectables",
  "Bioestimulaci\xF3n": "Bioestimulaci\xF3n de manos",
  "Packs de temporada \xB7 por tiempo limitado": "Packs de temporada"
};
const SVC_ZONE = {
  "Botox 3 zonas": "Frente, entrecejo y patas de gallo",
  "Botox tercio superior (4 zonas)": "Frente, entrecejo, patas de gallo y nariz",
  "Botox Full Face (8 zonas)": "Frente, entrecejo, patas de gallo, nariz, c\xF3digo de barras, ment\xF3n, DAO y borde mandibular",
  "Tratamiento de bruxismo con toxina botul\xEDnica": "M\xFAsculo masetero bilateral",
  "Hiperhidrosis facial": "Frente y cuero cabelludo",
  "Tratamiento sonrisa gingival": "Labio superior y elevadores del labio",
  "Ment\xF3n empedrado": "M\xFAsculo mentoniano",
  "Rejuvenecimiento de cuello - Nefertiti": "Platisma y borde mandibular inferior",
  "C\xF3digo de barras, tratamiento de arrugas": "Labio superior peribucal",
  "Bioestimulaci\xF3n de col\xE1geno facial": "Tercio medio, tercio inferior y \xF3valo facial",
  "Bioestimulaci\xF3n de surcos nasogenianos y marionetas": "Surco nasogeniano y comisuras labiales",
  "Bioestimulaci\xF3n de cuello": "Cara anterior y lateral del cuello",
  "Rinomodelaci\xF3n": "Dorso nasal, punta y columela",
  "Proyecci\xF3n de ment\xF3n": "Ment\xF3n y arco mandibular anterior",
  "Definici\xF3n de arco mandibular": "Borde mandibular lateral y \xE1ngulo mandibular",
  "Realce de p\xF3mulos": "Arco malar y surco nasogeniano",
  "C\xF3digo de barras con \xE1cido hialur\xF3nico": "Labio superior y filtrum",
  "Quemadores de grasa localizada": "Papada, brazos, abdomen, flancos, muslos y gl\xFAteos",
  "Bioestimulaci\xF3n de manos": "Dorso de las manos",
  "NCTF 135 \xB7 revitalizaci\xF3n facial": "Cara completa",
  "Vitaminas \xB7 iluminador": "Cara completa y escote",
  "Vitaminas \xB7 antiacn\xE9": "Zona T y mejillas"
};
const SVC_CATS = ["Toxina botul\xEDnica", "\xC1cido hialur\xF3nico", "Bioestimulaci\xF3n de col\xE1geno", "Mesoterapia", "Lipol\xEDticos inyectables", "Corporal", "Evaluaci\xF3n", "Otro"];
function customServices() {
  try {
    const v = window.DB && DB.get("services_custom");
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}
function saveCustomServices(v) {
  try {
    if (window.DB) DB.set("services_custom", v);
  } catch (e) {
  }
}
function clinicServiceList() {
  const D = window.JCDATA || {};
  const out = [];
  try {
    (D.catalog || []).filter((s) => s.sec !== "Promociones").forEach((sec) => {
      (sec.groups || []).forEach((g) => {
        (g.items || []).forEach((it) => out.push({ name: it.n, cat: SVC_CAT_LABEL[g.cat] || g.cat, price: it.price || 0, dur: it.dur || 60 }));
      });
    });
  } catch (e) {
  }
  customServices().forEach((s) => out.push({ name: s.name, cat: s.cat || "Otro", price: s.price || 0, dur: s.dur || 30 }));
  return out;
}
if (typeof window !== "undefined") window.clinicServiceList = clinicServiceList;
function NewServiceModal({ T, initial, onClose, onSave }) {
  const [f, setF] = useState(initial || { name: "", cat: "Toxina botul\xEDnica", price: "", dur: "30", ses: "1", pts: "", desc: "" });
  const ok = (f.name || "").trim().length > 1;
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: initial ? "Editar servicio" : "Nuevo servicio", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave({
    id: initial && initial.id || (window.jcmUid ? window.jcmUid("svc") : "svc" + Date.now()),
    name: f.name.trim(),
    cat: f.cat,
    desc: (f.desc || "").trim(),
    price: parseInt((f.price + "").replace(/\D/g, ""), 10) || 0,
    dur: parseInt((f.dur + "").replace(/\D/g, ""), 10) || 30,
    ses: parseInt((f.ses + "").replace(/\D/g, ""), 10) || 1,
    pts: parseInt((f.pts + "").replace(/\D/g, ""), 10) || 0
  }) }, initial ? "Guardar cambios" : "Crear servicio") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre del servicio", value: f.name, onChange: (v) => setF({ ...f, name: v }), placeholder: "Ej: Botox 3 zonas" }), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Categor\xEDa"), /* @__PURE__ */ React.createElement("select", { value: f.cat, onChange: (e) => setF({ ...f, cat: e.target.value }), style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }, SVC_CATS.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c)))), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Descripci\xF3n / zonas (opcional)"), /* @__PURE__ */ React.createElement("textarea", { value: f.desc, onChange: (e) => setF({ ...f, desc: e.target.value }), rows: 2, style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", resize: "vertical", boxSizing: "border-box" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 11 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Duraci\xF3n"), /* @__PURE__ */ React.createElement("select", { value: f.dur, onChange: (e) => setF({ ...f, dur: e.target.value }), style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }, [15, 30, 45, 60, 90, 120].map((d) => /* @__PURE__ */ React.createElement("option", { key: d, value: String(d) }, d, " min")))), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Sesiones"), /* @__PURE__ */ React.createElement("select", { value: f.ses || "1", onChange: (e) => setF({ ...f, ses: e.target.value }), style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }, [1, 2, 3, 4, 5, 6, 8, 10, 12].map((d) => /* @__PURE__ */ React.createElement("option", { key: d, value: String(d) }, d)))), /* @__PURE__ */ React.createElement(AdField, { T, label: "Puntos", value: f.pts, onChange: (v) => setF({ ...f, pts: v.replace(/\D/g, "") }), inputMode: "numeric", placeholder: "0" })), /* @__PURE__ */ React.createElement(AdField, { T, label: "Precio (CLP)", value: f.price, onChange: (v) => setF({ ...f, price: v.replace(/\D/g, "") }), inputMode: "numeric", placeholder: "150000" })));
}
function clinicEspecialidades() {
  try {
    var v = window.DB && window.DB.get("especialidades");
    if (Array.isArray(v)) return v;
  } catch (e) {
  }
  return typeof PROF_ESPECIALIDADES !== "undefined" ? PROF_ESPECIALIDADES.slice() : [];
}
function saveEspecialidades(v) {
  try {
    if (window.DB) window.DB.set("especialidades", v);
  } catch (e) {
  }
}
function EspecialidadesTab({ T }) {
  const [list, setList] = useState(clinicEspecialidades);
  const [nueva, setNueva] = useState("");
  let team = [];
  try {
    team = window.DB && window.DB.get("team") || [];
  } catch (e) {
  }
  function add() {
    const v = nueva.trim();
    if (!v || list.indexOf(v) >= 0) {
      setNueva("");
      return;
    }
    const n = [...list, v];
    setList(n);
    saveEspecialidades(n);
    setNueva("");
    try {
      window.jcmToast && window.jcmToast("Especialidad agregada.", "ok");
    } catch (e) {
    }
  }
  async function del(e) {
    if (!await (window.jcmConfirm || window.confirm)('\xBFEliminar la especialidad "' + e + '"?', { danger: true })) return;
    const n = list.filter((x) => x !== e);
    setList(n);
    saveEspecialidades(n);
  }
  const profCount = (e) => team.filter((m) => (m.especialidades || []).indexOf(e) >= 0).length;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 6, lineHeight: 1.5 } }, "Define las especialidades que ofrece tu cl\xEDnica. Se asignan a cada profesional en su ficha (secci\xF3n Especialidades)."), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 14, lineHeight: 1.5, background: T.accentSoft || "rgba(84,112,127,.08)", border: "1px solid " + T.lineSoft, borderRadius: 8, padding: "9px 12px" } }, "\u{1F4A1} ", /* @__PURE__ */ React.createElement("b", { style: { color: T.textMute } }, "Toxina botul\xEDnica, \xC1cido hialur\xF3nico, Bioestimuladores\u2026"), " son ", /* @__PURE__ */ React.createElement("b", { style: { color: T.textMute } }, "procedimientos"), ", no especialidades: se administran en la pesta\xF1a ", /* @__PURE__ */ React.createElement("b", { style: { color: T.textMute } }, "Tratamientos"), "."), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, ESPECIALIDAD_CATS.map(([cat, sugs]) => /* @__PURE__ */ React.createElement("div", { key: cat, style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent, marginBottom: 6 } }, cat), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, sugs.map((s) => {
    const yes = list.indexOf(s) >= 0;
    return /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => {
      if (yes) return;
      const n = [...list, s];
      setList(n);
      saveEspecialidades(n);
    }, disabled: yes, style: { fontFamily: T.sans, fontSize: 11.5, padding: "6px 12px", borderRadius: 999, cursor: yes ? "default" : "pointer", border: "1px solid " + (yes ? T.accent : T.line), background: yes ? T.accent + "16" : "transparent", color: yes ? T.accent : T.textMute } }, yes ? "\u2713 " : "+ ", s);
  }))))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "O agrega una propia"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("input", { value: nueva, onChange: (e) => setNueva(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  }, placeholder: "Nueva especialidad\u2026", style: { flex: 1, minWidth: 0, padding: "12px 14px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" } }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: add }, "+ Agregar")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Especialidades de tu cl\xEDnica"), list.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn no hay especialidades. Agrega la primera arriba.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5 } }, list.map((e) => {
    const n = profCount(e);
    return /* @__PURE__ */ React.createElement("div", { key: e, style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, e), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, n === 0 ? "Sin profesionales asignados" : n + " profesional" + (n === 1 ? "" : "es"))), /* @__PURE__ */ React.createElement("button", { onClick: () => del(e), title: "Eliminar", style: { flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "7px 9px", cursor: "pointer", color: T.textFaint, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
  })));
}
function ServiciosView({ T }) {
  const D = window.JCDATA;
  const [tab, setTab] = useState("tratamientos");
  const [custom, setCustom] = useState(customServices);
  const [newSvc, setNewSvc] = useState(null);
  function saveSvc(s) {
    const exists = custom.find((x) => x.id === s.id);
    const n = exists ? custom.map((x) => x.id === s.id ? s : x) : [s, ...custom];
    setCustom(n);
    saveCustomServices(n);
    setNewSvc(null);
    try {
      window.jcmToast && window.jcmToast('Servicio "' + s.name + '" ' + (exists ? "actualizado" : "creado") + ".", "ok");
    } catch (e) {
    }
  }
  function delSvc(id) {
    const n = custom.filter((x) => x.id !== id);
    setCustom(n);
    saveCustomServices(n);
    try {
      window.jcmToast && window.jcmToast("Servicio eliminado.", "info");
    } catch (e) {
    }
  }
  const [active, setActive] = useState(() => {
    try {
      return window.DB && window.DB.get("services_active") || {};
    } catch (e) {
      return {};
    }
  });
  const [over, setOver] = useState(() => {
    try {
      return window.DB && window.DB.get("services_over") || {};
    } catch (e) {
      return {};
    }
  });
  function saveActive(n) {
    setActive(n);
    try {
      window.DB && window.DB.set("services_active", n);
    } catch (e) {
    }
  }
  function saveOver(n) {
    setOver(n);
    try {
      window.DB && window.DB.set("services_over", n);
    } catch (e) {
    }
  }
  const [editing, setEditing] = useState(null);
  const [hover, setHover] = useState(null);
  const [q, setQ] = useState("");
  let _team = [];
  try {
    _team = window.DB && window.DB.get("team") || [];
  } catch (e) {
  }
  const profsForSvc = (nm) => _team.filter((m) => (m.tratamientos || []).indexOf(nm) >= 0).length;
  const svcFileRef = useRef(null);
  function importSvcRows(rows) {
    if (!rows || rows.length < 2) {
      try {
        window.jcmError && window.jcmError("El archivo no tiene filas de datos.");
      } catch (e) {
      }
      return;
    }
    const head = (rows[0] || []).map((h) => ("" + h).toLowerCase().trim());
    const col = (...names) => {
      for (const n2 of names) {
        const i = head.findIndex((h) => h.indexOf(n2) >= 0);
        if (i >= 0) return i;
      }
      return -1;
    };
    const ci = { name: col("nombre", "name", "servicio", "tratamiento"), price: col("precio", "price", "valor"), dur: col("duraci", "dur"), ses: col("sesion", "sesi\xF3n", "sesiones"), cat: col("categor", "cat") };
    if (ci.name < 0) {
      try {
        window.jcmError && window.jcmError("Falta la columna 'Nombre' en el encabezado.");
      } catch (e) {
      }
      return;
    }
    const nuevos = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i] || [];
      const nm = ("" + (r[ci.name] || "")).trim();
      if (!nm) continue;
      nuevos.push({ id: "svc" + Date.now() + i, name: nm, cat: ci.cat >= 0 ? ("" + (r[ci.cat] || "Otro")).trim() || "Otro" : "Otro", price: parseInt(("" + (r[ci.price] || "")).replace(/\D/g, ""), 10) || 0, dur: parseInt(("" + (r[ci.dur] || "")).replace(/\D/g, ""), 10) || 30, ses: parseInt(("" + (r[ci.ses] || "")).replace(/\D/g, ""), 10) || 1, pts: 0, desc: "" });
    }
    if (!nuevos.length) {
      try {
        window.jcmError && window.jcmError("No se encontraron servicios v\xE1lidos.");
      } catch (e) {
      }
      return;
    }
    const n = [...nuevos, ...custom];
    setCustom(n);
    saveCustomServices(n);
    try {
      window.jcmToast && window.jcmToast(nuevos.length + " servicio" + (nuevos.length === 1 ? "" : "s") + " importado" + (nuevos.length === 1 ? "" : "s") + ".", "ok");
    } catch (e) {
    }
  }
  function onSvcFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const ext = (file.name.split(".").pop() || "").toLowerCase();
    e.target.value = "";
    const splitLine = (l) => {
      const out = [];
      let cur = "", q2 = false;
      for (let i = 0; i < l.length; i++) {
        const ch = l[i];
        if (ch === '"') {
          if (q2 && l[i + 1] === '"') {
            cur += '"';
            i++;
          } else q2 = !q2;
        } else if ((ch === "," || ch === ";") && !q2) {
          out.push(cur.trim());
          cur = "";
        } else cur += ch;
      }
      out.push(cur.trim());
      return out;
    };
    if (ext === "xlsx" || ext === "xls") {
      const load = () => new Promise((res, rej) => {
        if (window.XLSX) return res(window.XLSX);
        const s = document.createElement("script");
        s.src = "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js";
        s.onload = () => res(window.XLSX);
        s.onerror = () => rej();
        document.head.appendChild(s);
      });
      load().then((XLSX) => {
        const rd2 = new FileReader();
        rd2.onload = () => {
          try {
            const wb = XLSX.read(rd2.result, { type: "array" });
            const ws = wb.Sheets[wb.SheetNames[0]];
            importSvcRows(XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false, defval: "" }));
          } catch (err) {
            try {
              window.jcmError && window.jcmError("No se pudo leer el Excel.");
            } catch (e2) {
            }
          }
        };
        rd2.readAsArrayBuffer(file);
      }).catch(() => {
        try {
          window.jcmError && window.jcmError("No se pudo cargar el lector de Excel. Exporta a CSV e int\xE9ntalo.");
        } catch (e2) {
        }
      });
      return;
    }
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const rows = ("" + rd.result).replace(/\r/g, "").split("\n").map((l) => l.trim() ? splitLine(l.trim()) : []).filter((r) => r.length);
        importSvcRows(rows);
      } catch (err) {
        try {
          window.jcmError && window.jcmError("No se pudo leer el archivo.");
        } catch (e2) {
        }
      }
    };
    rd.readAsText(file, "utf-8");
  }
  function val(it) {
    const o = over[it.n] || {};
    const price = o.price != null ? o.price : it.price;
    const baseDesc = SVC_ZONE[it.n] || it.x || it.d || "";
    return { name: o.name != null ? o.name : it.n, desc: o.desc != null ? o.desc : baseDesc, price, dur: o.dur != null ? o.dur : it.dur || 60, pts: o.pts != null ? o.pts : it.pts != null ? it.pts : Math.round(price / 15e3) };
  }
  const sections = (D.catalog || []).filter((s) => s.sec !== "Promociones");
  const totalItems = sections.reduce((s, sec) => s + sec.groups.reduce((s2, g) => s2 + g.items.length, 0), 0);
  const ql = q.trim().toLowerCase();
  const matchItem = (it) => {
    if (!ql) return true;
    const v = val(it);
    return v.name.toLowerCase().includes(ql) || (v.desc || "").toLowerCase().includes(ql);
  };
  const hits = ql ? sections.reduce((s, sec) => s + sec.groups.reduce((s2, g) => s2 + g.items.filter(matchItem).length, 0), 0) : totalItems;
  const totalAll = totalItems + custom.length;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Tratamientos y Especialidades", sub: tab === "especialidades" ? "Especialidades de la cl\xEDnica" : totalAll + " procedimiento" + (totalAll === 1 ? "" : "s") + " \xB7 crea los tuyos o edita los existentes" }), tab === "tratamientos" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { ref: svcFileRef, type: "file", accept: ".csv,.xlsx,.xls,text/csv", style: { display: "none" }, onChange: onSvcFile }), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => svcFileRef.current && svcFileRef.current.click() }, "Importar Excel"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setNewSvc("new") }, "+ Nuevo servicio"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, margin: "4px 0 18px" } }, [["tratamientos", "Tratamientos"], ["especialidades", "Especialidades"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTab(k), style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: tab === k ? 600 : 500, padding: "8px 18px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (tab === k ? T.accent : T.line), background: tab === k ? T.accent : "transparent", color: tab === k ? T.onAccent || "#fff" : T.textMute } }, l))), tab === "especialidades" ? /* @__PURE__ */ React.createElement(EspecialidadesTab, { T }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.6", style: { position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" } }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4.3-4.3" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar procedimiento por nombre\u2026", style: { width: "100%", padding: "12px 14px 12px 38px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" } }), ql && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 6 } }, hits + custom.filter((s) => s.name.toLowerCase().includes(ql)).length, " resultado", hits + custom.filter((s) => s.name.toLowerCase().includes(ql)).length === 1 ? "" : "s")), (() => {
    const cv = custom.filter((s) => !ql || s.name.toLowerCase().includes(ql) || (s.desc || "").toLowerCase().includes(ql));
    if (!cv.length) return totalItems === 0 && !ql ? /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "40px 24px", textAlign: "center", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 420, margin: "0 auto 16px" } }, "A\xFAn no tienes servicios. Crea tu primer procedimiento con su nombre, precio, duraci\xF3n y categor\xEDa \u2014 aparecer\xE1 en la agenda y en la reserva online."), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setNewSvc("new") }, "+ Crear primer servicio")) : null;
    return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, fontWeight: 600 } }, "Servicios de la cl\xEDnica"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: T.line } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5 } }, cv.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id, onClick: () => setNewSvc(s), style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, s.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, s.cat, s.desc ? " \xB7 " + s.desc : ""), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 3 } }, s.dur, " min", s.ses > 1 ? " \xB7 " + s.ses + " sesiones" : "", s.pts ? " \xB7 " + s.pts + " pts" : "", profsForSvc(s.name) ? " \xB7 " + profsForSvc(s.name) + " prof." : "")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text, flexShrink: 0 } }, D.fmt(s.price || 0)), /* @__PURE__ */ React.createElement("button", { onClick: async (e) => {
      e.stopPropagation();
      if (await (window.jcmConfirm || window.confirm)(`\xBFEliminar el servicio "${s.name}"?`, { danger: true })) delSvc(s.id);
    }, title: "Eliminar", style: { flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "7px 9px", cursor: "pointer", color: T.textFaint, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))))));
  })(), ql && hits === 0 && custom.filter((s) => s.name.toLowerCase().includes(ql)).length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textFaint, padding: "12px 2px" } }, 'Sin procedimientos que coincidan con "', q, '".'), sections.map((section) => {
    const vg = section.groups.filter((g) => g.items.some(matchItem));
    if (!vg.length) return null;
    return /* @__PURE__ */ React.createElement("div", { key: section.sec, style: { marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, fontWeight: 600 } }, section.sec), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: T.line } })), vg.map((group) => {
      const gi = group.items.filter(matchItem);
      return /* @__PURE__ */ React.createElement("div", { key: group.cat, style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 7, paddingLeft: 2 } }, SVC_CAT_LABEL[group.cat] || group.cat), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5 } }, gi.map((it, i) => {
        const on = active[it.n] !== false;
        const v = val(it);
        const hk = section.sec + group.cat + i;
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: i,
            onClick: () => setEditing({ key: it.n, name: v.name, desc: v.desc, price: String(v.price), dur: String(v.dur), pts: String(v.pts) }),
            onMouseEnter: () => setHover(hk),
            onMouseLeave: () => setHover(null),
            style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + (hover === hk ? T.accent : T.line), cursor: "pointer", transition: "border-color .15s" }
          },
          /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, v.name), v.desc && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, v.desc), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 3, display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 3 } }, /* @__PURE__ */ React.createElement("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M12 7v5l3 2" })), v.dur, " min"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 3, color: T.gold } }, /* @__PURE__ */ React.createElement("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "currentColor", stroke: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" })), v.pts, " pts"))),
          /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text, flexShrink: 0 } }, D.fmt(v.price)),
          /* @__PURE__ */ React.createElement("div", { onClick: (e) => {
            e.stopPropagation();
            saveActive({ ...active, [it.n]: !on });
          } }, /* @__PURE__ */ React.createElement(AdSwitch, { T, on, onClick: () => {
          } }))
        );
      })));
    }));
  })), editing && /* @__PURE__ */ React.createElement(AdModal, { T, title: "Editar servicio", onClose: () => setEditing(null), footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => {
    const n = { ...over, [editing.key]: { name: editing.name.trim() || editing.key, desc: editing.desc, price: parseInt((editing.price + "").replace(/\D/g, ""), 10) || 0, dur: parseInt((editing.dur + "").replace(/\D/g, ""), 10) || 60, pts: parseInt((editing.pts + "").replace(/\D/g, ""), 10) || 0 } };
    saveOver(n);
    setEditing(null);
  } }, "Guardar cambios") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre", value: editing.name, onChange: (v) => setEditing({ ...editing, name: v }) }), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Descripci\xF3n / zonas que cubre"), /* @__PURE__ */ React.createElement("textarea", { value: editing.desc, onChange: (e) => setEditing({ ...editing, desc: e.target.value }), rows: 2, style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", resize: "vertical", boxSizing: "border-box" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Duraci\xF3n"), /* @__PURE__ */ React.createElement("select", { value: editing.dur, onChange: (e) => setEditing({ ...editing, dur: e.target.value }), style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }, [15, 30, 45, 60, 90].map((d) => /* @__PURE__ */ React.createElement("option", { key: d, value: String(d) }, d, " min")))), /* @__PURE__ */ React.createElement(AdField, { T, label: "Puntos que otorga", value: editing.pts, onChange: (v) => setEditing({ ...editing, pts: v.replace(/\D/g, "") }), inputMode: "numeric" })), /* @__PURE__ */ React.createElement(AdField, { T, label: "Precio (CLP)", value: editing.price, onChange: (v) => setEditing({ ...editing, price: v.replace(/\D/g, "") }), inputMode: "numeric" }))), newSvc && /* @__PURE__ */ React.createElement(NewServiceModal, { T, initial: newSvc === "new" ? null : newSvc, onClose: () => setNewSvc(null), onSave: saveSvc }));
}
const PERM_SECCIONES = ["Agenda", "Pacientes", "Servicios", "Inventario", "Reportes", "Marketing", "Configuraci\xF3n"];
function jcmDefaultTeam() {
  var name = "";
  try {
    name = window.clinicPro && window.clinicPro() || window.DB && DB.cfg().professional || "";
  } catch (e) {
  }
  if (!name || name.trim().length < 2) {
    try {
      name = window.DB && DB.cfg().clinic_name || "";
    } catch (e) {
    }
  }
  if (!name || name.trim().length < 2) return [];
  var email = "", phone = "";
  try {
    var c = window.JCSAAS && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic() || {};
    email = c.ownerEmail || "";
  } catch (e) {
  }
  try {
    if (!email) email = window.DB && DB.cfg().reply_email || "";
  } catch (e) {
  }
  try {
    phone = window.DB && DB.cfg().wa_number || "";
  } catch (e) {
  }
  if (phone && !/^\+/.test(phone)) phone = "+" + phone.replace(/[^0-9]/g, "");
  return [{ id: "t_owner", name: name.trim(), role: "Profesional a cargo", email, phone, color: "#6A8296", active: true, access: true, pin: "1234", perms: { Agenda: true, Pacientes: true, Inventario: true, Servicios: true, Reportes: true, Marketing: true, Configuraci\u00F3n: true } }];
}
function EquipoView({ T }) {
  const [team, setTeam] = useState(() => {
    try {
      const t = window.DB && DB.get("team");
      if (Array.isArray(t) && t.length) return t;
    } catch (e) {
    }
    const seed = (typeof clinicSeeded === "function" ? clinicSeeded() : true) ? CADMIN.team || [] : [];
    return seed.length ? seed : jcmDefaultTeam();
  });
  useEffect(() => {
    if (team && team.length) {
      if (window.CADMIN) window.CADMIN.team = team;
      try {
        const saved = window.DB && DB.get("team");
        if (!Array.isArray(saved) || !saved.length) window.DB && window.DB.set("team", team);
      } catch (e) {
      }
    }
  }, []);
  const [editing, setEditing] = useState(null);
  function save(m) {
    CADMIN.team = m.id && team.find((x) => x.id === m.id) ? team.map((x) => x.id === m.id ? m : x) : [...team, { ...m, id: "t" + Date.now(), color: m.color || "#8B9EB0" }];
    try {
      window.DB && window.DB.set("team", CADMIN.team);
    } catch (e) {
    }
    setTeam(CADMIN.team);
    setEditing(null);
  }
  async function remove(id) {
    if (team.length <= 1) {
      window.jcmToast && window.jcmToast("Debe quedar al menos un profesional en el equipo.", "info");
      return;
    }
    const m = team.find((x) => x.id === id);
    if (!await (window.jcmConfirm || window.confirm)("\xBFEliminar a " + (m && m.name || "este profesional") + " del equipo? Sus citas y fichas no se borran.", { danger: true })) return;
    CADMIN.team = team.filter((x) => x.id !== id);
    try {
      window.DB && window.DB.set("team", CADMIN.team);
    } catch (e) {
    }
    setTeam(CADMIN.team);
    setEditing(null);
    window.jcmToast && window.jcmToast("Profesional eliminado.", "ok");
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Equipo", sub: "Profesionales y permisos" }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, team.map((t) => /* @__PURE__ */ React.createElement("button", { key: t.id, onClick: () => setEditing(t), style: { display: "flex", alignItems: "center", gap: 13, padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, width: "100%", textAlign: "left", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: "50%", background: t.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, flexShrink: 0 } }, t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text } }, t.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, t.role), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, [t.phone, t.email].filter(Boolean).join("  \xB7  "))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(AdTag, { T, tone: t.active ? "ok" : "muted" }, t.active ? "Activo" : "Inactivo"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent } }, "Editar \u2192"))))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setEditing("new") }, "+ A\xF1adir miembro")), editing && /* @__PURE__ */ React.createElement(ProfesionalForm, { T, member: editing === "new" ? null : editing, onClose: () => setEditing(null), onSave: save, onDelete: editing !== "new" && editing.id ? () => remove(editing.id) : null }));
}
const PROF_PAISES = [["+56", "\u{1F1E8}\u{1F1F1} Chile"], ["+54", "\u{1F1E6}\u{1F1F7} Argentina"], ["+51", "\u{1F1F5}\u{1F1EA} Per\xFA"], ["+57", "\u{1F1E8}\u{1F1F4} Colombia"], ["+58", "\u{1F1FB}\u{1F1EA} Venezuela"], ["+593", "\u{1F1EA}\u{1F1E8} Ecuador"], ["+591", "\u{1F1E7}\u{1F1F4} Bolivia"], ["+598", "\u{1F1FA}\u{1F1FE} Uruguay"], ["+595", "\u{1F1F5}\u{1F1FE} Paraguay"], ["+52", "\u{1F1F2}\u{1F1FD} M\xE9xico"], ["+34", "\u{1F1EA}\u{1F1F8} Espa\xF1a"], ["+1", "\u{1F1FA}\u{1F1F8} EE.UU."]];
const ESPECIALIDAD_CATS = [
  ["Facial", ["Medicina est\xE9tica facial", "Armonizaci\xF3n orofacial", "Dermatolog\xEDa"]],
  ["Corporal", ["Medicina est\xE9tica corporal", "Kinesiolog\xEDa est\xE9tica", "Nutrici\xF3n y control de peso"]],
  ["Est\xE9tica", ["Medicina est\xE9tica", "Enfermer\xEDa est\xE9tica", "Tricolog\xEDa"]],
  ["Cosmetolog\xEDa", ["Cosmetolog\xEDa", "Cosmiatr\xEDa", "Dermopigmentaci\xF3n / micropigmentaci\xF3n"]]
];
const PROF_ESPECIALIDADES = ESPECIALIDAD_CATS.reduce((a, c) => a.concat(c[1]), []);
function ProfSec({ T, n, title, sub, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "15px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: sub ? 4 : 12 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 20, height: 20, borderRadius: "50%", background: T.accent, color: T.onAccent || "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 11, fontWeight: 700, flexShrink: 0 } }, n), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600 } }, title)), sub && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, margin: "0 0 12px 29px", lineHeight: 1.5 } }, sub), children);
}
function ProfChips({ T, options, selected, onToggle, empty }) {
  if (!options || !options.length) return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textFaint, lineHeight: 1.5 } }, empty);
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } }, options.map((o) => {
    const on = selected.indexOf(o) >= 0;
    return /* @__PURE__ */ React.createElement("button", { key: o, type: "button", onClick: () => onToggle(o), style: { fontFamily: T.sans, fontSize: 11.5, padding: "8px 12px", borderRadius: 999, cursor: "pointer", background: on ? T.accent : "transparent", color: on ? T.onAccent : T.textMute, border: "1px solid " + (on ? T.accent : T.chipBorder) } }, on ? "\u2713 " : "", o);
  }));
}
function ProfesionalForm({ T, member, onClose, onSave, onDelete }) {
  const [f, setF] = useState(() => member ? { ...member, perms: member.perms || {}, especialidades: member.especialidades || (member.role ? [member.role] : []), tratamientos: member.tratamientos || [], sucursales: member.sucursales || [], horario: member.horario || sucHorarioDefault() } : { name: "", role: "", email: "", phone: "+56 9 ", active: true, access: false, perms: {}, especialidades: [], tratamientos: [], sucursales: [], horario: sucHorarioDefault() });
  const [nuevaEsp, setNuevaEsp] = useState("");
  const [accPass, setAccPass] = useState("");
  const [accBusy, setAccBusy] = useState(false);
  const [accMsg, setAccMsg] = useState("");
  const [accErr, setAccErr] = useState("");
  async function crearAcceso() {
    setAccErr("");
    setAccMsg("");
    const email = (f.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAccErr("Ingresa un correo v\xE1lido para el profesional.");
      return;
    }
    if ((accPass || "").length < 6) {
      setAccErr("La clave debe tener al menos 6 caracteres.");
      return;
    }
    if (!(window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.idToken)) {
      setAccErr("Disponible solo con sesi\xF3n en la nube.");
      return;
    }
    setAccBusy(true);
    try {
      const tok = await window.JCSAAS.idToken();
      const r = await fetch("/api/team-access", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tok }, body: JSON.stringify({ action: "create", email, password: accPass, name: f.name, perms: f.perms }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) {
        setF((s) => ({ ...s, authUid: d.uid }));
        setAccMsg((d.updated ? "Acceso actualizado. " : "Acceso creado. ") + "El profesional ingresa en medique.cl con " + email + " y la clave que definiste.");
        setAccPass("");
      } else {
        setAccErr(d.error || "No se pudo crear el acceso.");
      }
    } catch (e) {
      setAccErr("No se pudo contactar el servidor.");
    }
    setAccBusy(false);
  }
  function setDiaH(k, patch) {
    setF((s) => ({ ...s, horario: { ...s.horario || {}, [k]: { ...(s.horario || {})[k] || { on: false, from: "10:00", to: "19:00" }, ...patch } } }));
  }
  const ok = f.name.trim().length > 2;
  function tperm(p) {
    setF((s) => ({ ...s, perms: { ...s.perms, [p]: !s.perms[p] } }));
  }
  function toggleArr(key, val) {
    setF((s) => {
      const arr = s[key] || [];
      return { ...s, [key]: arr.indexOf(val) >= 0 ? arr.filter((x) => x !== val) : [...arr, val] };
    });
  }
  function addEsp() {
    const v = nuevaEsp.trim();
    if (!v) return;
    setF((s) => ({ ...s, especialidades: (s.especialidades || []).indexOf(v) >= 0 ? s.especialidades : [...s.especialidades || [], v] }));
    setNuevaEsp("");
  }
  const curCC = ((f.phone || "").match(/^(\+\d+)/) || [])[1] || "+56";
  function setCC(cc) {
    setF((s) => {
      const num = (s.phone || "").replace(/^\+\d+\s*/, "").trim();
      return { ...s, phone: (cc + " " + num).trim() };
    });
  }
  let svcList = [];
  try {
    svcList = (typeof window.clinicServiceList === "function" ? window.clinicServiceList() : []).map((s) => s.name || s).filter(Boolean);
  } catch (e) {
  }
  let sucList = [];
  try {
    sucList = (window.DB && window.DB.get("sucursales") || []).map((s) => s.name || s).filter(Boolean);
  } catch (e) {
  }
  const togRow = (label, on, onClick) => /* @__PURE__ */ React.createElement("div", { onClick, style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 8, background: T.surface2 || T.surface, border: "1px solid " + T.line, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, label), /* @__PURE__ */ React.createElement(AdSwitch, { T, on, onClick }));
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: member ? "Editar profesional" : "Nuevo profesional", onClose, footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, onDelete && /* @__PURE__ */ React.createElement("button", { onClick: onDelete, title: "Eliminar profesional", style: { flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "0 14px", height: 44, borderRadius: 8, border: "1px solid #C0285A55", background: "transparent", color: "#C0285A", fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" })), "Eliminar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave({ ...f, role: f.role || (f.especialidades || [])[0] || "" }) }, "Guardar profesional")) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(ProfSec, { T, n: "1", title: "Informaci\xF3n b\xE1sica" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre completo", value: f.name, onChange: (v) => setF({ ...f, name: v }), placeholder: "Ej: Dra. Mar\xEDa P\xE9rez" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "T\xEDtulo / cargo", value: f.role, onChange: (v) => setF({ ...f, role: v }), placeholder: "Ej: M\xE9dico est\xE9tico" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Email", value: f.email, onChange: (v) => setF({ ...f, email: v }), inputMode: "email", placeholder: "correo@ejemplo.com" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "Tel\xE9fono"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("select", { value: curCC, onChange: (e) => setCC(e.target.value), style: { flexShrink: 0, width: 130, padding: "12px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" } }, PROF_PAISES.map(([code, name]) => /* @__PURE__ */ React.createElement("option", { key: code, value: code }, name, " ", code))), /* @__PURE__ */ React.createElement("input", { value: (f.phone || "").replace(/^\+\d+\s*/, ""), onChange: (e) => setF({ ...f, phone: (curCC + " " + e.target.value).trim() }), inputMode: "tel", placeholder: "9 1234 5678", style: { flex: 1, minWidth: 0, padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AdField, { T, label: "Clave de confirmaci\xF3n (4\u20136 d\xEDgitos)", value: f.pin || "", onChange: (v) => setF({ ...f, pin: v.replace(/\D/g, "").slice(0, 6) }), inputMode: "numeric", placeholder: "\u2022\u2022\u2022\u2022" }), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 7, lineHeight: 1.5 } }, "Clave personal del profesional. Se pide para confirmar cambios en las sesiones que \xE9l/ella realiz\xF3.")), togRow("Profesional activo", f.active, () => setF({ ...f, active: !f.active })), togRow("Crear cuenta de acceso al sistema", f.access, () => setF({ ...f, access: !f.access })), f.access && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Permisos \xB7 \xBFQu\xE9 secciones puede usar?"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } }, PERM_SECCIONES.map((p) => {
    const on = !!f.perms[p];
    return /* @__PURE__ */ React.createElement("button", { key: p, type: "button", onClick: () => tperm(p), style: { fontFamily: T.sans, fontSize: 11.5, padding: "8px 12px", borderRadius: 999, cursor: "pointer", background: on ? T.accent : "transparent", color: on ? T.onAccent : T.textMute, border: "1px solid " + (on ? T.accent : T.chipBorder) } }, p);
  })), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 } }, "El administrador define a qu\xE9 \xE1reas del panel puede entrar este profesional."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, paddingTop: 12, borderTop: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 8 } }, "Cuenta de login"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginBottom: 10, lineHeight: 1.5 } }, "Crea el acceso para que el profesional inicie sesi\xF3n con ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "su propio correo"), " (", f.email || "agrega el correo arriba", ") y vea solo las secciones permitidas."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("input", { type: "text", value: accPass, onChange: (e) => setAccPass(e.target.value), placeholder: "Clave de acceso (m\xEDn. 6)", "data-nocap": true, style: { flex: 1, minWidth: 160, padding: "10px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" } }), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: crearAcceso }, accBusy ? "Creando\u2026" : f.authUid ? "Actualizar acceso" : "Crear acceso")), accMsg && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#1F8A5B", marginTop: 8, lineHeight: 1.5 } }, accMsg), accErr && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#C0285A", marginTop: 8, lineHeight: 1.5 } }, accErr))))), /* @__PURE__ */ React.createElement(ProfSec, { T, n: "2", title: "Especialidades", sub: "Marca las que ejerce este profesional. Puedes agregar las tuyas." }, /* @__PURE__ */ React.createElement(ProfChips, { T, options: Array.from(/* @__PURE__ */ new Set([...PROF_ESPECIALIDADES, ...f.especialidades || []])), selected: f.especialidades || [], onToggle: (v) => toggleArr("especialidades", v), empty: "" }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 11 } }, /* @__PURE__ */ React.createElement("input", { value: nuevaEsp, onChange: (e) => setNuevaEsp(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEsp();
    }
  }, placeholder: "Agregar especialidad\u2026", style: { flex: 1, minWidth: 0, padding: "10px 12px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" } }), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: addEsp }, "Agregar"))), /* @__PURE__ */ React.createElement(ProfSec, { T, n: "3", title: "Tratamientos asignados", sub: "Procedimientos que este profesional puede realizar (del cat\xE1logo de la cl\xEDnica)." }, /* @__PURE__ */ React.createElement(ProfChips, { T, options: svcList, selected: f.tratamientos || [], onToggle: (v) => toggleArr("tratamientos", v), empty: "A\xFAn no hay servicios en el cat\xE1logo. Cr\xE9alos en Tratamientos y vuelve a asignarlos aqu\xED." })), /* @__PURE__ */ React.createElement(ProfSec, { T, n: "4", title: "Sucursales", sub: "\xBFEn qu\xE9 sucursales atiende este profesional?" }, /* @__PURE__ */ React.createElement(ProfChips, { T, options: sucList, selected: f.sucursales || [], onToggle: (v) => toggleArr("sucursales", v), empty: "A\xFAn no hay sucursales. Cr\xE9alas en el m\xF3dulo Sucursales y vuelve a asignarlas aqu\xED." })), /* @__PURE__ */ React.createElement(ProfSec, { T, n: "5", title: "Horario de atenci\xF3n", sub: "D\xEDas y horas en que atiende este profesional." }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, SUC_DIAS.map(([k, l]) => {
    const d = (f.horario || {})[k] || { on: false, from: "10:00", to: "19:00" };
    return /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: d.on ? T.surface2 || T.surface : T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { width: 92, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(AdSwitch, { T, on: d.on, onClick: () => setDiaH(k, { on: !d.on }) }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.text, marginLeft: 8 } }, l.slice(0, 3))), d.on ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, flex: 1 } }, /* @__PURE__ */ React.createElement("input", { type: "time", value: d.from, onChange: (e) => setDiaH(k, { from: e.target.value }), style: { padding: "9px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" } }), /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute, fontFamily: T.sans, fontSize: 12 } }, "a"), /* @__PURE__ */ React.createElement("input", { type: "time", value: d.to, onChange: (e) => setDiaH(k, { to: e.target.value }), style: { padding: "9px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" } })) : /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 11.5, color: T.textFaint } }, "No atiende"));
  })))));
}
const SUC_DIAS = [["lun", "Lunes"], ["mar", "Martes"], ["mie", "Mi\xE9rcoles"], ["jue", "Jueves"], ["vie", "Viernes"], ["sab", "S\xE1bado"], ["dom", "Domingo"]];
function sucHorarioDefault() {
  const h = {};
  SUC_DIAS.forEach(([k]) => {
    h[k] = { on: ["lun", "mar", "mie", "jue", "vie"].indexOf(k) >= 0, from: "10:00", to: "19:00" };
  });
  return h;
}
function loadSucursales() {
  try {
    const v = window.DB && window.DB.get("sucursales");
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}
function saveSucursalesDB(v) {
  try {
    if (window.DB) window.DB.set("sucursales", v);
  } catch (e) {
  }
}
function SucursalesView({ T }) {
  const [list, setList] = useState(loadSucursales);
  const [editing, setEditing] = useState(null);
  let team = [];
  try {
    team = window.DB && window.DB.get("team") || [];
  } catch (e) {
  }
  const profsForSuc = (nm) => team.filter((m) => (m.sucursales || []).indexOf(nm) >= 0).length;
  function save(s) {
    const exists = s.id && list.find((x) => x.id === s.id);
    const n = exists ? list.map((x) => x.id === s.id ? s : x) : [...list, { ...s, id: "suc" + Date.now() }];
    setList(n);
    saveSucursalesDB(n);
    setEditing(null);
    try {
      window.jcmToast && window.jcmToast("Sucursal " + (exists ? "actualizada" : "creada") + ".", "ok");
    } catch (e) {
    }
  }
  async function del(id) {
    if (!await (window.jcmConfirm || window.confirm)("\xBFEliminar esta sucursal?", { danger: true })) return;
    const n = list.filter((x) => x.id !== id);
    setList(n);
    saveSucursalesDB(n);
  }
  const diasTxt = (h) => SUC_DIAS.filter(([k]) => h && h[k] && h[k].on).map(([k, l]) => l.slice(0, 3)).join(", ") || "Sin horario";
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Sucursales", sub: (list.length || "Sin") + " sucursal" + (list.length === 1 ? "" : "es") + " \xB7 direcci\xF3n, contacto y horario de atenci\xF3n" }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setEditing("new") }, "+ Nueva sucursal")), list.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "40px 24px", textAlign: "center", marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 440, margin: "0 auto 16px" } }, "A\xFAn no tienes sucursales. Crea la primera con su direcci\xF3n, contacto y horario \u2014 luego podr\xE1s asignar profesionales a cada una desde su ficha."), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setEditing("new") }, "+ Crear primera sucursal")) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginTop: 4 } }, list.map((s) => {
    const np = profsForSuc(s.name);
    return /* @__PURE__ */ React.createElement("div", { key: s.id, onClick: () => setEditing(s), title: "Editar sucursal", style: { display: "flex", alignItems: "flex-start", gap: 13, padding: "15px 16px", borderRadius: 10, background: T.surface, border: "1px solid " + T.line, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 42, height: 42, borderRadius: 10, background: T.accentSoft || T.surface2, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5M9 11h.01M15 11h.01" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text } }, s.name), s.addr && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 } }, s.addr), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 3 } }, [s.phone, s.email].filter(Boolean).join("  \xB7  ")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 5, display: "flex", flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F552} ", diasTxt(s.horario)), /* @__PURE__ */ React.createElement("span", null, "\xB7 ", np === 0 ? "Sin profesionales" : np + " profesional" + (np === 1 ? "" : "es")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent } }, "Editar \u2192"), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
      e.stopPropagation();
      del(s.id);
    }, title: "Eliminar", style: { background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.textFaint, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))));
  })), editing && /* @__PURE__ */ React.createElement(SucursalModal, { T, suc: editing === "new" ? null : editing, onClose: () => setEditing(null), onSave: save }));
}
function SucursalModal({ T, suc, onClose, onSave }) {
  const [f, setF] = useState(() => suc ? { ...suc, horario: suc.horario || sucHorarioDefault() } : { name: "", addr: "", phone: "+56 9 ", email: "", horario: sucHorarioDefault() });
  const ok = (f.name || "").trim().length > 1;
  const curCC = ((f.phone || "").match(/^(\+\d+)/) || [])[1] || "+56";
  function setCC(cc) {
    setF((s) => {
      const num = (s.phone || "").replace(/^\+\d+\s*/, "").trim();
      return { ...s, phone: (cc + " " + num).trim() };
    });
  }
  function setDia(k, patch) {
    setF((s) => ({ ...s, horario: { ...s.horario, [k]: { ...s.horario[k], ...patch } } }));
  }
  function aplicarATodos() {
    const base = f.horario.lun;
    setF((s) => {
      const h = {};
      SUC_DIAS.forEach(([k]) => {
        h[k] = { ...s.horario[k], from: base.from, to: base.to };
      });
      return { ...s, horario: h };
    });
    try {
      window.jcmToast && window.jcmToast("Horario de lunes copiado a todos los d\xEDas activos.", "info");
    } catch (e) {
    }
  }
  const inp = { padding: "9px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" };
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: suc ? "Editar sucursal" : "Nueva sucursal", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave(f) }, "Guardar sucursal") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(ProfSec, { T, n: "1", title: "Datos de la sucursal" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre", value: f.name, onChange: (v) => setF({ ...f, name: v }), placeholder: "Ej: Medique Centro" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Direcci\xF3n", value: f.addr, onChange: (v) => setF({ ...f, addr: v }), placeholder: "Calle, n\xFAmero, ciudad" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Email", value: f.email, onChange: (v) => setF({ ...f, email: v }), inputMode: "email", placeholder: "sucursal@clinica.cl" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "Tel\xE9fono"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("select", { value: curCC, onChange: (e) => setCC(e.target.value), style: { flexShrink: 0, width: 130, padding: "12px 10px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" } }, PROF_PAISES.map(([code, name]) => /* @__PURE__ */ React.createElement("option", { key: code, value: code }, name, " ", code))), /* @__PURE__ */ React.createElement("input", { value: (f.phone || "").replace(/^\+\d+\s*/, ""), onChange: (e) => setF({ ...f, phone: (curCC + " " + e.target.value).trim() }), inputMode: "tel", placeholder: "9 1234 5678", style: { flex: 1, minWidth: 0, padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }))))), /* @__PURE__ */ React.createElement(ProfSec, { T, n: "2", title: "Horario de atenci\xF3n", sub: "Activa los d\xEDas y define el rango. Usa \xABAplicar a todos\xBB para copiar el horario del lunes." }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, SUC_DIAS.map(([k, l]) => {
    const d = f.horario[k] || { on: false, from: "10:00", to: "19:00" };
    return /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: d.on ? T.surface2 || T.surface : T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { width: 92, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(AdSwitch, { T, on: d.on, onClick: () => setDia(k, { on: !d.on }) }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.text, marginLeft: 8 } }, l.slice(0, 3))), d.on ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, flex: 1 } }, /* @__PURE__ */ React.createElement("input", { type: "time", value: d.from, onChange: (e) => setDia(k, { from: e.target.value }), style: inp }), /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute, fontFamily: T.sans, fontSize: 12 } }, "a"), /* @__PURE__ */ React.createElement("input", { type: "time", value: d.to, onChange: (e) => setDia(k, { to: e.target.value }), style: inp })) : /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 11.5, color: T.textFaint } }, "Cerrado"));
  })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: aplicarATodos }, "Aplicar horario del lunes a todos")))));
}
function loadConsentTpls() {
  try {
    const v = window.DB && window.DB.get("consent_templates");
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}
function saveConsentTplsDB(v) {
  try {
    if (window.DB) window.DB.set("consent_templates", v);
  } catch (e) {
  }
}
function ConsentimientosView({ T }) {
  const [tpls, setTpls] = useState(loadConsentTpls);
  const [active, setActive] = useState(() => {
    try {
      return window.DB && window.DB.get("consent_active") || {};
    } catch (e) {
      return {};
    }
  });
  const [editing, setEditing] = useState(null);
  let patients = [];
  try {
    patients = window.DB && window.DB.get("patients") || window.JCADMIN && window.JCADMIN.patients || [];
  } catch (e) {
  }
  const firmados = patients.filter((p) => p.consent).length;
  const pendientes = patients.filter((p) => !p.consent).length;
  const base = window.JCADMIN && window.JCADMIN.consents || [];
  function setActiveKey(k, on) {
    const n = { ...active, [k]: on };
    setActive(n);
    try {
      window.DB && window.DB.set("consent_active", n);
    } catch (e) {
    }
  }
  function persist(n) {
    setTpls(n);
    saveConsentTplsDB(n);
  }
  function save(t) {
    const exists = t.id && tpls.find((x) => x.id === t.id);
    persist(exists ? tpls.map((x) => x.id === t.id ? t : x) : [...tpls, { ...t, id: "ctpl" + Date.now() }]);
    setEditing(null);
    try {
      window.jcmToast && window.jcmToast("Plantilla " + (exists ? "actualizada" : "creada") + ".", "ok");
    } catch (e) {
    }
  }
  async function del(id) {
    if (!await (window.jcmConfirm || window.confirm)("\xBFEliminar esta plantilla?", { danger: true })) return;
    persist(tpls.filter((x) => x.id !== id));
  }
  function baseBodyText(b) {
    return b.body || (Array.isArray(b.paragraphs) ? b.paragraphs.join("\n\n") : "") || "";
  }
  function personalizar(b) {
    const copia = { id: "ctpl" + Date.now(), title: (b.title || "Consentimiento") + " (personalizada)", cat: b.cat || "", body: baseBodyText(b), active: true, fromBase: b.title || "" };
    persist([...tpls, copia]);
    setEditing(copia);
    try {
      window.jcmToast && window.jcmToast("Copia editable creada en tus plantillas propias.", "ok");
    } catch (e) {
    }
  }
  const activasCount = base.filter((b) => active[b.title] !== false).length + tpls.filter((t) => t.active !== false).length;
  const card = { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "13px 15px", display: "flex", alignItems: "center", gap: 12 };
  const row = (titulo, cat, on, onTog, onEdit, onDel) => /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, titulo), cat && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, cat)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: on ? "#1F8A5B" : T.textFaint } }, on ? "Activa" : "Inactiva"), /* @__PURE__ */ React.createElement(AdSwitch, { T, on, onClick: onTog }), onEdit && /* @__PURE__ */ React.createElement("button", { onClick: onEdit, style: { fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" } }, "Editar"), onDel && /* @__PURE__ */ React.createElement("button", { onClick: onDel, title: "Eliminar", style: { background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.textFaint, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
  const baseRow = (b, on) => /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, b.title), b.cat && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, b.cat)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: on ? "#1F8A5B" : T.textFaint } }, on ? "Activa" : "Inactiva"), /* @__PURE__ */ React.createElement(AdSwitch, { T, on, onClick: () => setActiveKey(b.title, !on) }), /* @__PURE__ */ React.createElement("button", { onClick: () => personalizar(b), title: "Crear copia editable para tu cl\xEDnica", style: { fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer", whiteSpace: "nowrap" } }, "Personalizar"));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Consentimientos", sub: "Plantillas, estado de firma y firma digital JC-Sign" }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setEditing("new") }, "+ Nueva plantilla")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, margin: "4px 0 20px" } }, /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Firmados", v: firmados, c: "#1F8A5B" }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Pendientes de firma", v: pendientes, c: "#B8860B" }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Plantillas activas", v: activasCount, c: T.accent })), /* @__PURE__ */ React.createElement("div", { style: { background: T.accentSoft || "rgba(84,112,127,.10)", border: "1px solid " + T.line, borderRadius: 10, padding: "14px 16px", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: ".04em", color: T.text } }, "Cumplimiento \xB7 Ley 20.584 (derechos y deberes del paciente)")), /* @__PURE__ */ React.createElement("ul", { style: { margin: 0, paddingLeft: 18, fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.7 } }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "Consentimiento informado:"), " debe firmarse antes de todo procedimiento, explicando alcances, riesgos y alternativas."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "Confidencialidad:"), " la ficha cl\xEDnica es reservada; solo acceden el paciente, el profesional tratante y quien la ley autorice."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "Conservaci\xF3n:"), " la ficha y consentimientos se conservan como m\xEDnimo ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "15 a\xF1os"), "."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "Derecho de acceso:"), " el paciente puede solicitar copia \xEDntegra de su ficha cuando lo requiera."))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 10 } }, "Plantillas propias"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 24 } }, tpls.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "A\xFAn no creas plantillas propias. Usa \u201C+ Nueva plantilla\u201D o \u201CPersonalizar\u201D una plantilla base.") : tpls.map((t) => {
    const on = t.active !== false;
    return /* @__PURE__ */ React.createElement("div", { key: t.id }, row(t.title, t.cat, on, () => save({ ...t, active: !on }), () => setEditing(t), () => del(t.id)));
  })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 4 } }, "Plantillas cl\xEDnicas (predeterminadas)"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 10, lineHeight: 1.5 } }, "Las predeterminadas no se modifican. Usa ", /* @__PURE__ */ React.createElement("b", { style: { color: T.textMute } }, "Personalizar"), " para crear una copia editable para tu cl\xEDnica sin alterar el documento maestro."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 24 } }, base.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Sin plantillas base en esta cl\xEDnica.") : base.map((b, i) => {
    const on = active[b.title] !== false;
    return /* @__PURE__ */ React.createElement("div", { key: b.title || i }, baseRow(b, on));
  })), editing && /* @__PURE__ */ React.createElement(ConsentTplModal, { T, tpl: editing === "new" ? null : editing, onClose: () => setEditing(null), onSave: save }));
}
function ConsentTplModal({ T, tpl, onClose, onSave }) {
  const [f, setF] = useState(() => tpl ? { ...tpl } : { title: "", cat: "", body: "", active: true });
  const ok = (f.title || "").trim().length > 1;
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: tpl ? "Editar plantilla" : "Nueva plantilla de consentimiento", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave(f) }, "Guardar plantilla") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "T\xEDtulo", value: f.title, onChange: (v) => setF({ ...f, title: v }), placeholder: "Ej: Consentimiento toxina botul\xEDnica" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Categor\xEDa / procedimiento", value: f.cat, onChange: (v) => setF({ ...f, cat: v }), placeholder: "Ej: Toxina botul\xEDnica" }), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Texto del consentimiento"), /* @__PURE__ */ React.createElement("textarea", { value: f.body, onChange: (e) => setF({ ...f, body: e.target.value }), rows: 8, placeholder: "Redacta el consentimiento. Cada p\xE1rrafo en una l\xEDnea.", style: { ...inp, resize: "vertical", lineHeight: 1.5 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "11px 14px", borderRadius: 8, background: T.surface2 || T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, "Plantilla activa"), /* @__PURE__ */ React.createElement(AdSwitch, { T, on: f.active !== false, onClick: () => setF({ ...f, active: !(f.active !== false) }) })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 } }, "La firma se captura con JC-Sign al momento de firmar con el paciente. Esta plantilla ya aparece disponible en el flujo de firma.")));
}
const TUTO_PASOS = [
  ["config", "Configura tu cl\xEDnica", "Nombre, direcci\xF3n, horario y datos de contacto.", "config"],
  ["servicios", "Crea tus tratamientos", "Carga tus procedimientos con precio, duraci\xF3n y sesiones.", "servicios"],
  ["equipo", "Agrega tu equipo", "Registra profesionales con especialidades y permisos.", "equipo"],
  ["sucursales", "Define tus sucursales", "Direcci\xF3n, contacto y horario de atenci\xF3n por sucursal.", "sucursales"],
  ["agenda", "Agenda tu primera cita", "Da una cita desde la agenda o el bot\xF3n Nueva cita.", "agenda"],
  ["crm", "Organiza tus leads", "Lleva tus prospectos por el embudo de ventas.", "crm"],
  ["integraciones", "Conecta WhatsApp y Meta", "Activa la mensajer\xEDa y la publicidad de tu cl\xEDnica.", "integraciones"]
];
const TUTO_NOVEDADES = [
  ["Registro de Ventas", "Caja se transform\xF3 en Registro de Ventas: N\xB0 de ventas, total cobrado, pendiente de cobro y ranking de tratamientos m\xE1s vendidos."],
  ["Fichas por tipo", "Nueva ficha por tipo: General, Facial, Corporal y Medicina General con signos vitales e IMC autom\xE1tico."],
  ["Sucursales", "M\xF3dulo nuevo de sucursales con direcci\xF3n, contacto y horario semanal de atenci\xF3n."],
  ["CRM \xB7 Embudo", "Gestiona tus leads por etapas (de nuevo lead hasta venta), listo para Meta."],
  ["Profesionales y especialidades", "Ficha de profesional en secciones: especialidades, tratamientos y sucursales asignadas."]
];
function TutorialesView({ T, go }) {
  const [done, setDone] = useState(() => {
    try {
      return window.DB && window.DB.get("tutorial_done") || {};
    } catch (e) {
      return {};
    }
  });
  function toggle(k) {
    const n = { ...done, [k]: !done[k] };
    setDone(n);
    try {
      window.DB && window.DB.set("tutorial_done", n);
    } catch (e) {
    }
  }
  const [videos, setVideos] = useState(() => {
    try {
      return window.DB && window.DB.get("tutorial_videos") || {};
    } catch (e) {
      return {};
    }
  });
  async function setVid(k) {
    const cur = videos[k] || "";
    const url = await Promise.resolve(window.jcmPrompt ? window.jcmPrompt("Pega el link del video para este paso (YouTube, Drive, Loom, etc.):", cur) : window.prompt("Link del video:", cur));
    if (url == null) return;
    const n = { ...videos, [k]: ("" + url).trim() };
    if (!n[k]) delete n[k];
    setVideos(n);
    try {
      window.DB && window.DB.set("tutorial_videos", n);
    } catch (e) {
    }
  }
  const completados = TUTO_PASOS.filter(([k]) => done[k]).length;
  const pct = Math.round(completados / TUTO_PASOS.length * 100);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Centro de Tutoriales", sub: "Pon en marcha tu cl\xEDnica paso a paso y descubre lo nuevo de Medique" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text } }, "Puesta en marcha"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 18, color: T.accent } }, completados, "/", TUTO_PASOS.length)), /* @__PURE__ */ React.createElement("div", { style: { height: 7, borderRadius: 999, background: T.lineSoft, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: pct + "%", background: T.accent, borderRadius: 999, transition: "width .3s" } })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 8 } }, pct === 100 ? "\u{1F389} \xA1Tu cl\xEDnica est\xE1 lista!" : "Completa los pasos para sacarle todo el provecho a Medique.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, TUTO_PASOS.map(([k, title, desc, sec], i) => {
    const ok = !!done[k];
    return /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 14px", borderRadius: 10, background: T.surface, border: "1px solid " + (ok ? T.accent + "55" : T.line) } }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(k), title: ok ? "Marcar como pendiente" : "Marcar como completado", style: { width: 24, height: 24, borderRadius: "50%", flexShrink: 0, cursor: "pointer", border: "1.5px solid " + (ok ? T.accent : T.line), background: ok ? T.accent : "transparent", color: ok ? T.onAccent || "#fff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, i + 1, "."), " ", title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2, lineHeight: 1.4 } }, desc)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, flexShrink: 0 } }, videos[k] && /* @__PURE__ */ React.createElement("a", { href: videos[k], target: "_blank", rel: "noopener", title: "Ver video", style: { display: "inline-flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: "#fff", background: "#C0285A", borderRadius: 7, padding: "6px 10px", textDecoration: "none" } }, /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" })), "Video"), window.JCM_BASE === true && /* @__PURE__ */ React.createElement("button", { onClick: () => setVid(k), title: videos[k] ? "Cambiar video (super admin)" : "Agregar video (super admin)", style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 9px", cursor: "pointer", whiteSpace: "nowrap" } }, videos[k] ? "\u270E" : "+ video"), /* @__PURE__ */ React.createElement("button", { onClick: () => go && go(sec), style: { fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 11px", cursor: "pointer", whiteSpace: "nowrap" } }, "Ir \u2192")));
  }))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "#1F8A5B" } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text } }, "Novedades de Medique")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, TUTO_NOVEDADES.map(([title, desc], i) => /* @__PURE__ */ React.createElement("div", { key: title, style: { position: "relative", paddingLeft: 18, paddingBottom: i === TUTO_NOVEDADES.length - 1 ? 0 : 16 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 0, top: 4, width: 8, height: 8, borderRadius: "50%", background: T.accent } }), i < TUTO_NOVEDADES.length - 1 && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 3.5, top: 12, bottom: 0, width: 1, background: T.line } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text } }, title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2, lineHeight: 1.5 } }, desc)))))));
}
const CRM_STAGES = [["nuevo", "Nuevo lead", "#6A8296"], ["proceso", "En proceso", "#B8860B"], ["interesado", "Interesado", "#4E8A72"], ["agendado", "Agendado", "#54707F"], ["nocalifica", "No califica", "#9A8C7A"], ["compro", "Compr\xF3", "#1F8A5B"]];
const CRM_ORIGENES = ["Instagram", "Facebook", "TikTok", "WhatsApp", "Meta Ads", "Google", "Referido", "Walk-in"];
function loadLeads() {
  try {
    const v = window.DB && window.DB.get("crm_leads");
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}
function saveLeadsDB(v) {
  try {
    if (window.DB) window.DB.set("crm_leads", v);
  } catch (e) {
  }
}
function CrmView({ T }) {
  const [leads, setLeads] = useState(loadLeads);
  const [editing, setEditing] = useState(null);
  function persist(n) {
    setLeads(n);
    saveLeadsDB(n);
  }
  function save(l) {
    const exists = l.id && leads.find((x) => x.id === l.id);
    persist(exists ? leads.map((x) => x.id === l.id ? l : x) : [...leads, { ...l, id: "lead" + Date.now(), ts: Date.now() }]);
    setEditing(null);
    try {
      window.jcmToast && window.jcmToast("Lead " + (exists ? "actualizado" : "agregado") + ".", "ok");
    } catch (e) {
    }
  }
  function moveLead(id, stage) {
    persist(leads.map((x) => x.id === id ? { ...x, stage } : x));
  }
  async function del(id) {
    if (!await (window.jcmConfirm || window.confirm)("\xBFEliminar este lead?", { danger: true })) return;
    persist(leads.filter((x) => x.id !== id));
  }
  const byStage = (st) => leads.filter((l) => (l.stage || "nuevo") === st);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "CRM \xB7 Embudo de leads", sub: leads.length + " lead" + (leads.length === 1 ? "" : "s") + " \xB7 listo para Meta API" }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setEditing("new") }, "+ Nuevo lead")), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, marginTop: 4 } }, CRM_STAGES.map(([k, label, col]) => {
    const items = byStage(k);
    return /* @__PURE__ */ React.createElement("div", { key: k, style: { flexShrink: 0, width: 230, background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "12px 11px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: col, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text } }, label), /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", fontFamily: T.sans, fontSize: 11, color: T.textMute, background: T.surface2 || T.bg, borderRadius: 999, padding: "1px 8px" } }, items.length)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, items.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, padding: "10px 2px", textAlign: "center" } }, "\u2014"), items.map((l) => /* @__PURE__ */ React.createElement("div", { key: l.id, style: { background: T.bg, border: "1px solid " + T.line, borderRadius: 9, padding: "10px 11px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, cursor: "pointer" }, onClick: () => setEditing(l) }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text } }, l.name), l.proc && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, l.proc), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 2 } }, [l.phone, l.origen].filter(Boolean).join(" \xB7 "))), /* @__PURE__ */ React.createElement("button", { onClick: () => del(l.id), title: "Eliminar", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 2, display: "flex", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("select", { value: l.stage || "nuevo", onChange: (e) => moveLead(l.id, e.target.value), style: { width: "100%", marginTop: 8, padding: "5px 7px", borderRadius: 5, border: "1px solid " + T.line, background: T.surface, color: T.textMute, fontFamily: T.sans, fontSize: 10.5, outline: "none", cursor: "pointer" } }, CRM_STAGES.map(([sk, sl]) => /* @__PURE__ */ React.createElement("option", { key: sk, value: sk }, sl)))))));
  })), editing && /* @__PURE__ */ React.createElement(CrmLeadModal, { T, lead: editing === "new" ? null : editing, onClose: () => setEditing(null), onSave: save }));
}
function CrmLeadModal({ T, lead, onClose, onSave }) {
  const [f, setF] = useState(() => lead ? { ...lead } : { name: "", phone: "+56 9 ", proc: "", origen: "Instagram", stage: "nuevo", note: "" });
  const ok = (f.name || "").trim().length > 1;
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: lead ? "Editar lead" : "Nuevo lead", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave(f) }, "Guardar lead") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre", value: f.name, onChange: (v) => setF({ ...f, name: v }), placeholder: "Nombre del lead" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Tel\xE9fono / WhatsApp", value: f.phone, onChange: (v) => setF({ ...f, phone: v }), inputMode: "tel" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Tratamiento de inter\xE9s", value: f.proc, onChange: (v) => setF({ ...f, proc: v }), placeholder: "Ej: Botox, \xE1cido hialur\xF3nico\u2026" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Origen"), /* @__PURE__ */ React.createElement("select", { value: f.origen, onChange: (e) => setF({ ...f, origen: e.target.value }), style: inp }, CRM_ORIGENES.map((o) => /* @__PURE__ */ React.createElement("option", { key: o, value: o }, o)))), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Etapa"), /* @__PURE__ */ React.createElement("select", { value: f.stage, onChange: (e) => setF({ ...f, stage: e.target.value }), style: inp }, CRM_STAGES.map(([sk, sl]) => /* @__PURE__ */ React.createElement("option", { key: sk, value: sk }, sl))))), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Nota"), /* @__PURE__ */ React.createElement("textarea", { value: f.note, onChange: (e) => setF({ ...f, note: e.target.value }), rows: 2, placeholder: "Seguimiento, observaciones\u2026", style: { ...inp, resize: "vertical" } }))));
}
function FidelidadView({ T }) {
  const seeded = typeof clinicSeeded === "function" ? clinicSeeded() : true;
  const [on, setOn] = useState(() => {
    try {
      const v = window.DB && DB.get("fidelity_on");
      return v == null ? seeded : !!v;
    } catch (e) {
      return seeded;
    }
  });
  function setFid(v) {
    setOn(v);
    try {
      if (window.DB) DB.set("fidelity_on", v);
    } catch (e) {
    }
  }
  const [cfg, setCfg] = useState(() => {
    try {
      return DB.get("fidelity_cfg") || { ptsProc: 10, ptsCanje: 100, premio: "" };
    } catch (e) {
      return { ptsProc: 10, ptsCanje: 100, premio: "" };
    }
  });
  const [editCfg, setEditCfg] = useState(false);
  const [tmpCfg, setTmpCfg] = useState(cfg);
  function saveCfg() {
    setCfg(tmpCfg);
    try {
      DB.set("fidelity_cfg", tmpCfg);
    } catch (e) {
    }
    setEditCfg(false);
    try {
      window.jcmToast && window.jcmToast("Configuraci\xF3n guardada.", "ok");
    } catch (e) {
    }
  }
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return !DB.get("fidelity_seen");
    } catch (e) {
      return true;
    }
  });
  function closeWelcome() {
    setShowWelcome(false);
    try {
      DB.set("fidelity_seen", true);
    } catch (e) {
    }
  }
  const members = seeded ? CADMIN.fidelity : [];
  const oro = members.filter((m) => m.tier === "Oro").length;
  const ptsActivos = members.reduce((s, m) => s + (m.pts || 0), 0);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Fidelidad", sub: "Programa de puntos y retenci\xF3n" }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: T.surface, border: "1px solid " + (on ? T.accent + "55" : T.line), borderRadius: 12, padding: "14px 16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, "Programa de fidelidad"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 } }, on ? "Activo \xB7 los pacientes acumulan puntos por cada atenci\xF3n." : "Apagado \xB7 enci\xE9ndelo para empezar a acumular puntos.")), /* @__PURE__ */ React.createElement(AdSwitch, { T, on, onClick: () => setFid(!on) })), on && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "14px 16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text } }, "Configuraci\xF3n de puntos"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setTmpCfg(cfg);
    setEditCfg(!editCfg);
  }, style: { background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 11, color: T.accent, padding: 0 } }, editCfg ? "Cancelar" : "Editar")), editCfg ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Puntos por procedimiento (default por sesi\xF3n)", value: String(tmpCfg.ptsProc), onChange: (v) => setTmpCfg((c) => ({ ...c, ptsProc: parseInt(v) || 0 })) }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Puntos necesarios para canjear un beneficio", value: String(tmpCfg.ptsCanje), onChange: (v) => setTmpCfg((c) => ({ ...c, ptsCanje: parseInt(v) || 0 })) }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Premio al canjear (qu\xE9 recibe el paciente)", value: tmpCfg.premio || "", onChange: (v) => setTmpCfg((c) => ({ ...c, premio: v })), placeholder: "Ej: 20% de descuento \xB7 sesi\xF3n de limpieza facial \xB7 masaje gratis" }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: saveCfg }, "Guardar configuraci\xF3n")) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, display: "flex", gap: 24, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Por procedimiento: "), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text } }, cfg.ptsProc, " pts")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Para canjear: "), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text } }, cfg.ptsCanje, " pts")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Premio: "), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: cfg.premio ? T.text : T.textFaint } }, cfg.premio || "Sin definir")))), on ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: members.length, l: "Miembros" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: ptsActivos.toLocaleString("es-CL"), l: "Puntos activos" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: oro, l: "Miembros Oro" })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 14, lineHeight: 1.5 } }, "Los puntos por procedimiento espec\xEDfico se pueden ajustar en ", /* @__PURE__ */ React.createElement("b", null, "Servicios"), ' (campo "Puntos que otorga" al editar un servicio). El valor por defecto es ', /* @__PURE__ */ React.createElement("b", null, cfg.ptsProc, " puntos"), "."), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Pacientes"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, members.length === 0 && /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn no hay pacientes con puntos. A medida que registres atenciones, aparecer\xE1n aqu\xED."), members.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: p.name, size: 38 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, p.pts, " pts \xB7 canje a los ", cfg.ptsCanje, " pts")), /* @__PURE__ */ React.createElement(AdTag, { T, tone: p.tier === "Oro" ? "warn" : "muted" }, p.tier))))) : /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "40px 24px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 420, margin: "0 auto" } }, "El programa de fidelidad est\xE1 apagado. Act\xEDvalo arriba para que tus pacientes acumulen puntos por cada procedimiento y puedas premiar su preferencia.")), showWelcome && /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      title: "Programa de Fidelidad",
      onClose: closeWelcome,
      footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, width: "100%" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, full: true, onClick: closeWelcome }, "Cerrar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => {
        setFid(true);
        closeWelcome();
      } }, "Activar ahora"))
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 48, height: 48, borderRadius: 12, background: T.accent, color: T.onAccent || "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 } }, "\u2605"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.55 } }, "Ret\xE9n y premia a tus pacientes m\xE1s fieles con un sistema de puntos integrado en tu panel.")), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2 || T.lineSoft, borderRadius: 8, padding: "14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text, marginBottom: 8 } }, "\xBFC\xF3mo funciona?"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, [
      ["1", "Cada vez que registres una sesi\xF3n, el paciente acumula puntos autom\xE1ticamente."],
      ["2", "T\xFA defines cu\xE1ntos puntos otorga cada procedimiento (por defecto: 10 pts)."],
      ["3", "Cuando un paciente alcanza el m\xEDnimo para canjear (por defecto: 100 pts), puede recibir un beneficio o descuento que t\xFA elijas."],
      ["4", "Los pacientes m\xE1s activos suben al nivel Oro y pueden recibir beneficios especiales."]
    ].map(([n, t]) => /* @__PURE__ */ React.createElement("div", { key: n, style: { display: "flex", gap: 9, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 20, height: 20, borderRadius: "50%", background: T.accent, color: T.onAccent || "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 } }, n), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 } }, t))))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, lineHeight: 1.5 } }, "Puedes cambiar los puntos por procedimiento y el umbral de canje en cualquier momento desde esta misma pantalla."))
  ));
}
const MSG_VARS = ["{nombre}", "{tratamiento}", "{fecha}", "{clinica}"];
function loadMsgTpls() {
  try {
    const v = window.DB && window.DB.get("msg_templates");
    if (Array.isArray(v) && v.length) return v;
  } catch (e) {
  }
  return [
    { id: "m1", name: "Recordatorio de cita", channel: "whatsapp", body: "Hola {nombre} \u{1F44B} Te recordamos tu cita en {clinica}. \xA1Te esperamos! \u{1F33F}" },
    { id: "m2", name: "Promoci\xF3n del mes", channel: "whatsapp", body: "Hola {nombre} \u2728 Este mes tenemos una promoci\xF3n especial en {tratamiento}. \xBFTe agendamos? \u{1F489}" }
  ];
}
function saveMsgTplsDB(v) {
  try {
    if (window.DB) window.DB.set("msg_templates", v);
  } catch (e) {
  }
}
function applyVars(body, vars) {
  return (body || "").replace(/\{(\w+)\}/g, (m, k) => vars[k] != null && vars[k] !== "" ? vars[k] : m);
}
function DifusionesView({ T }) {
  const [tab, setTab] = useState("difusiones");
  const [tpls, setTpls] = useState(loadMsgTpls);
  const [editing, setEditing] = useState(null);
  const [selTpl, setSelTpl] = useState(null);
  const [aud, setAud] = useState("pacientes");
  function persist(n) {
    setTpls(n);
    saveMsgTplsDB(n);
  }
  function save(t) {
    const exists = t.id && tpls.find((x) => x.id === t.id);
    persist(exists ? tpls.map((x) => x.id === t.id ? t : x) : [...tpls, { ...t, id: "mtpl" + Date.now() }]);
    setEditing(null);
    try {
      window.jcmToast && window.jcmToast("Plantilla guardada.", "ok");
    } catch (e) {
    }
  }
  async function del(id) {
    if (!await (window.jcmConfirm || window.confirm)("\xBFEliminar esta plantilla?", { danger: true })) return;
    persist(tpls.filter((x) => x.id !== id));
  }
  let pacientes = [], leads = [];
  try {
    pacientes = window.DB && window.DB.get("patients") || [];
  } catch (e) {
  }
  try {
    leads = window.DB && window.DB.get("crm_leads") || [];
  } catch (e) {
  }
  const clinica = typeof window.clinicName === "function" ? window.clinicName() : "la cl\xEDnica";
  const hoy = (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL", { day: "numeric", month: "long" });
  const recipients = (aud === "leads" ? leads : pacientes).map((r) => ({ name: r.name || "Paciente", phone: (r.phone || "").replace(/[^0-9]/g, ""), proc: r.proc || r.procInteres || "" })).filter((r) => r.name);
  const conTel = recipients.filter((r) => r.phone.length >= 8);
  const tplObj = tpls.find((t) => t.id === selTpl) || null;
  const tabBtn = (k, l) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTab(k), style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: tab === k ? 600 : 500, padding: "8px 18px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (tab === k ? T.accent : T.line), background: tab === k ? T.accent : "transparent", color: tab === k ? T.onAccent || "#fff" : T.textMute } }, l);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Difusiones", sub: "Env\xEDa mensajes masivos por WhatsApp con plantillas y variables" }), tab === "plantillas" && /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setEditing("new") }, "+ Nueva plantilla")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, background: "linear-gradient(135deg," + T.accent + "14, " + (T.surface2 || T.surface) + ")", border: "1px solid " + T.line, borderRadius: 16, padding: "16px 18px", margin: "6px 0 16px", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 48, height: 48, borderRadius: 14, background: T.accent + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 180 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.text, lineHeight: 1.15 } }, "Llega a tus pacientes en un clic"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 3, lineHeight: 1.5 } }, "Elige una audiencia y una plantilla con variables (", "{nombre}", ", ", "{tratamiento}", "\u2026) y env\xEDa por WhatsApp uno a uno, listo para personalizar.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 18, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 24, color: T.accent, lineHeight: 1 } }, pacientes.length), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginTop: 3 } }, "Pacientes")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 24, color: T.accent, lineHeight: 1 } }, tpls.length), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginTop: 3 } }, "Plantillas")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, margin: "0 0 18px" } }, tabBtn("difusiones", "Difusiones"), tabBtn("plantillas", "Plantillas")), tab === "plantillas" ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, tpls.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.id, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "13px 15px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: t.channel === "email" ? "#54707F" : "#1F8A5B", border: "1px solid " + T.line, borderRadius: 999, padding: "2px 8px" } }, t.channel === "email" ? "Email" : "WhatsApp"), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, t.name), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditing(t), style: { fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" } }, "Editar"), /* @__PURE__ */ React.createElement("button", { onClick: () => del(t.id), title: "Eliminar", style: { background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.textFaint, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 8, lineHeight: 1.5, whiteSpace: "pre-wrap" } }, t.body)))) : /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 12 } }, "1 \xB7 Arma tu difusi\xF3n"), /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Audiencia"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 14 } }, [["pacientes", "Pacientes (" + pacientes.length + ")"], ["leads", "Leads CRM (" + leads.length + ")"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setAud(k), style: { flex: 1, fontFamily: T.sans, fontSize: 11.5, padding: "9px", borderRadius: 8, cursor: "pointer", border: "1px solid " + (aud === k ? T.accent : T.line), background: aud === k ? T.surface2 || T.surface : "transparent", color: aud === k ? T.text : T.textMute } }, l))), /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Plantilla"), /* @__PURE__ */ React.createElement("select", { value: selTpl || "", onChange: (e) => setSelTpl(e.target.value), style: { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Elige una plantilla \u2014"), tpls.map((t) => /* @__PURE__ */ React.createElement("option", { key: t.id, value: t.id }, t.name))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 } }, "Variables: ", MSG_VARS.join("  "), ". Se reemplazan por cada destinatario. ", conTel.length, " de ", recipients.length, " tienen tel\xE9fono v\xE1lido.")), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 12 } }, "2 \xB7 Env\xEDa uno por uno por WhatsApp"), !tplObj ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Elige una plantilla para previsualizar y enviar.") : conTel.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Esta audiencia no tiene tel\xE9fonos v\xE1lidos.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, maxHeight: 360, overflowY: "auto" }, className: "jc-scroll" }, conTel.map((r, i) => {
    const msg = applyVars(tplObj.body, { nombre: r.name.split(" ")[0], tratamiento: r.proc || "tu tratamiento", fecha: hoy, clinica });
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: T.bg, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, r.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, msg)), /* @__PURE__ */ React.createElement("a", { href: "https://api.whatsapp.com/send?phone=" + r.phone + "&text=" + encodeURIComponent(msg), target: "_blank", rel: "noopener", style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: "#fff", background: "#25D366", borderRadius: 7, padding: "7px 12px", textDecoration: "none" } }, "WhatsApp \u2192"));
  })))), editing && /* @__PURE__ */ React.createElement(MsgTplModal, { T, tpl: editing === "new" ? null : editing, onClose: () => setEditing(null), onSave: save }));
}
function MsgTplModal({ T, tpl, onClose, onSave }) {
  const [f, setF] = useState(() => tpl ? { ...tpl } : { name: "", channel: "whatsapp", subject: "", body: "" });
  const ok = (f.name || "").trim().length > 1 && (f.body || "").trim().length > 1;
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  function addVar(v) {
    setF((s) => ({ ...s, body: (s.body || "") + v }));
  }
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: tpl ? "Editar plantilla" : "Nueva plantilla de mensaje", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave(f) }, "Guardar plantilla") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre", value: f.name, onChange: (v) => setF({ ...f, name: v }), placeholder: "Ej: Recordatorio de cita" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Canal"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, [["whatsapp", "WhatsApp"], ["email", "Email"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, type: "button", onClick: () => setF({ ...f, channel: k }), style: { flex: 1, fontFamily: T.sans, fontSize: 12, padding: "10px", borderRadius: 7, cursor: "pointer", border: "1px solid " + (f.channel === k ? T.accent : T.line), background: f.channel === k ? T.surface2 || T.surface : "transparent", color: f.channel === k ? T.text : T.textMute } }, l)))), f.channel === "email" && /* @__PURE__ */ React.createElement(AdField, { T, label: "Asunto", value: f.subject, onChange: (v) => setF({ ...f, subject: v }), placeholder: "Asunto del correo" }), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Mensaje"), /* @__PURE__ */ React.createElement("textarea", { value: f.body, onChange: (e) => setF({ ...f, body: e.target.value }), rows: 5, placeholder: "Escribe el mensaje. Usa variables como {nombre}.", style: { ...inp, resize: "vertical", lineHeight: 1.5 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, MSG_VARS.map((v) => /* @__PURE__ */ React.createElement("button", { key: v, type: "button", onClick: () => addVar(v), style: { fontFamily: T.sans, fontSize: 11, padding: "5px 10px", borderRadius: 999, cursor: "pointer", border: "1px solid " + T.line, background: "transparent", color: T.accent } }, "+ ", v)))));
}
function MarketingView({ T, go }) {
  const D = window.JCDATA;
  const connected = typeof metaConnected === "function" && metaConnected();
  const [camps, setCamps] = useState(() => {
    try {
      const saved = window.DB && window.DB.get("campaigns");
      if (saved && saved.length) return saved.filter((c) => c.real);
    } catch (e) {
    }
    return [];
  });
  const [tot, setTot] = useState({ spend: 0, leads: 0, reach: 0 });
  const [loading, setLoading] = useState(connected);
  const [err, setErr] = useState("");
  function saveCamps(n) {
    setCamps(n);
    try {
      window.DB && window.DB.set("campaigns", n);
    } catch (e) {
    }
  }
  useEffect(() => {
    if (!connected || !window.mediqueMeta) {
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    setErr("");
    window.mediqueMeta({ campaigns: true }).then((d) => {
      if (!alive) return;
      setLoading(false);
      if (d && d.ok) {
        setTot({ spend: d.spend || 0, leads: d.leads || 0, reach: d.reach || 0 });
        const list = (d.campaigns || []).map((c) => ({ id: c.id, name: c.name, reach: c.reach || 0, leads: c.leads || 0, spend: c.spend || 0, net: "Meta Ads", active: !!c.active, real: true }));
        saveCamps(list);
      } else if (d && d.configured === false) {
        setErr("Meta Ads no est\xE1 configurado en el servidor.");
      } else {
        setErr(d && d.error || "No se pudieron leer tus campa\xF1as de Meta.");
      }
    });
    return () => {
      alive = false;
    };
  }, [connected]);
  const totLeads = tot.leads || camps.reduce((a, c) => a + c.leads, 0);
  const totSpend = tot.spend || camps.reduce((a, c) => a + c.spend, 0);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Marketing", sub: "Campa\xF1as conectadas a Meta Ads e Instagram" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: totLeads, l: "Leads (mes)" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: D.fmt(totSpend), l: "Inversi\xF3n" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: totLeads ? Math.round(totSpend / totLeads / 100) / 10 + "k" : "\u2014", l: "Costo/lead" })), !connected && /* @__PURE__ */ React.createElement("div", { onClick: () => go("integraciones"), style: { cursor: "pointer", background: T.accentSoft || "rgba(84,112,127,.10)", border: "1px solid " + T.accent, borderRadius: 10, padding: "14px 16px", marginBottom: 16, fontFamily: T.sans, fontSize: 12.5, color: T.text, lineHeight: 1.5 } }, /* @__PURE__ */ React.createElement("b", null, "Conecta tu cuenta de Meta Ads"), " para ver aqu\xED tus campa\xF1as reales con su gasto, leads y alcance. ", /* @__PURE__ */ React.createElement("span", { style: { color: T.accent } }, "Ir a Integraciones \u2192")), connected && loading && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Cargando tus campa\xF1as de Meta Ads\u2026"), connected && !loading && err && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(224,106,106,.08)", border: "1px solid rgba(224,106,106,.4)", borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontFamily: T.sans, fontSize: 12, color: "#e06a6a" } }, err), /* @__PURE__ */ React.createElement("a", { href: "https://adsmanager.facebook.com/adsmanager", target: "_blank", rel: "noopener", style: { display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 10, marginBottom: 16, textDecoration: "none", background: "#1877F2", border: "1px solid #1877F2" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,.18)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, flexShrink: 0 } }, "f"), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: "#fff" } }, "Ir a Meta Ads Manager"), /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M7 17 17 7M9 7h8v8" }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Campa\xF1as"), /* @__PURE__ */ React.createElement("a", { href: "https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=create", target: "_blank", rel: "noopener", title: "Las campa\xF1as se crean en Meta Ads Manager y se sincronizan aqu\xED", style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 8, textDecoration: "none", background: T.accent, color: T.onAccent || "#fff" } }, "+ Crear en Meta Ads", /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M7 17 17 7M9 7h8v8" })))), /* @__PURE__ */ React.createElement("div", { style: { background: T.accentSoft || "rgba(84,112,127,.10)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 13px", marginBottom: 12, fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5 } }, "Las campa\xF1as se crean y administran directamente en ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "Meta Ads Manager"), ". ", connected ? "Aqu\xED ves tus campa\xF1as reales con su alcance, leads e inversi\xF3n del mes." : "Cuando conectes tu cuenta, las campa\xF1as reales aparecer\xE1n aqu\xED autom\xE1ticamente con su alcance, leads e inversi\xF3n."), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "#1F8A5B" } }), "Activas (", camps.filter((c) => c.active).length, ")"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 } }, camps.filter((c) => c.active).map((c) => /* @__PURE__ */ React.createElement("div", { key: c.id, style: { padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid rgba(31,138,91,.3)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, c.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement(AdTag, { T, tone: "ok" }, "Activa"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 18, marginTop: 10 } }, /* @__PURE__ */ React.createElement(Mini, { T, k: "Alcance", v: c.reach.toLocaleString("es-CL") }), /* @__PURE__ */ React.createElement(Mini, { T, k: "Leads", v: c.leads }), /* @__PURE__ */ React.createElement(Mini, { T, k: "Inversi\xF3n", v: D.fmt(c.spend) }), /* @__PURE__ */ React.createElement(Mini, { T, k: "Red", v: c.net })))), !camps.filter((c) => c.active).length && /* @__PURE__ */ React.createElement(Empty2, { T }, "Sin campa\xF1as activas.")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: T.textFaint } }), "Pausadas (", camps.filter((c) => !c.active).length, ")"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 } }, camps.filter((c) => !c.active).map((c) => /* @__PURE__ */ React.createElement("div", { key: c.id, style: { padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, opacity: 0.8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, c.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement(AdTag, { T, tone: "muted" }, "Pausada"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 18, marginTop: 10 } }, /* @__PURE__ */ React.createElement(Mini, { T, k: "Alcance", v: c.reach.toLocaleString("es-CL") }), /* @__PURE__ */ React.createElement(Mini, { T, k: "Leads", v: c.leads }), /* @__PURE__ */ React.createElement(Mini, { T, k: "Inversi\xF3n", v: D.fmt(c.spend) }), /* @__PURE__ */ React.createElement(Mini, { T, k: "Red", v: c.net })))), !camps.filter((c) => !c.active).length && /* @__PURE__ */ React.createElement(Empty2, { T }, "Sin campa\xF1as pausadas.")), /* @__PURE__ */ React.createElement(AdBtn, { T, full: true, onClick: () => go("integraciones") }, "Gestionar integraciones"));
}
function Mini({ T, k, v }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent } }, k), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, marginTop: 3 } }, v));
}
function metaCreds() {
  try {
    return window.DB && DB.get("meta_creds") || {};
  } catch (e) {
    return {};
  }
}
function metaConnected() {
  const c = metaCreds();
  return !!(c.token && c.account);
}
function MetaConnectModal({ T, onClose, onSaved }) {
  const c0 = metaCreds();
  const [account, setAccount] = useState(c0.account || "");
  const [token, setToken] = useState(c0.token || "");
  const [busy, setBusy] = useState(false);
  function fmtAcct(v) {
    v = (v || "").trim();
    return v && !/^act_/.test(v) ? "act_" + v.replace(/[^0-9,act_]/g, "") : v;
  }
  function save() {
    const acc = fmtAcct(account), tk = token.trim();
    if (!acc || !tk) {
      window.jcmToast && window.jcmToast("Completa la cuenta y el token.", "error");
      return;
    }
    setBusy(true);
    const tokP = window.JCSAAS && window.JCSAAS.idToken ? window.JCSAAS.idToken() : Promise.resolve(null);
    tokP.then((idt) => {
      const headers = { "Content-Type": "application/json" };
      if (idt) headers["Authorization"] = "Bearer " + idt;
      return fetch("/api/meta", { method: "POST", headers, body: JSON.stringify({ token: tk, account: acc }) });
    }).then((r) => r.json()).then((d) => {
      setBusy(false);
      if (d && d.ok) {
        try {
          DB.set("meta_creds", { account: acc, token: tk });
        } catch (e) {
        }
        window.jcmToast && window.jcmToast("Meta Ads conectado \xB7 gasto del mes: " + (window.JCDATA ? window.JCDATA.fmt(d.spend || 0) : d.spend), "ok");
        onSaved && onSaved();
      } else {
        window.jcmError && window.jcmError("No se pudo conectar Meta", d && d.error || d);
      }
    }).catch((e) => {
      setBusy(false);
      window.jcmError && window.jcmError("No se pudo conectar Meta", e);
    });
  }
  function disconnect() {
    try {
      DB.del("meta_creds");
    } catch (e) {
    }
    window.jcmToast && window.jcmToast("Meta Ads desconectado.", "info");
    onSaved && onSaved();
  }
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Conectar Meta Ads", onClose, footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, width: "100%" } }, metaConnected() && /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: disconnect }, "Desconectar"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: save }, busy ? "Verificando\u2026" : "Conectar y verificar"))) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 } }, "Conecta tu cuenta de Meta Ads para ver tu gasto, leads y campa\xF1as reales en el panel. Usa un token de ", /* @__PURE__ */ React.createElement("b", null, "solo lectura"), " (", /* @__PURE__ */ React.createElement("code", null, "ads_read"), "): no permite gastar ni modificar nada, solo leer tus estad\xEDsticas."), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "14px 15px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "\xBFPrimera vez? Con\xE9ctalo en 3 pasos"), /* @__PURE__ */ React.createElement("ol", { style: { margin: 0, paddingLeft: 18, fontFamily: T.sans, fontSize: 12, color: T.text, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("li", null, "En Meta, abre ", /* @__PURE__ */ React.createElement("b", null, "Configuraci\xF3n del negocio \u2192 Usuarios \u2192 Usuarios del sistema"), ".", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "https://business.facebook.com/settings/system-users", target: "_blank", rel: "noopener", style: { color: T.accent, fontSize: 11.5, textDecoration: "underline" } }, "Abrir Usuarios del sistema \u2197")), /* @__PURE__ */ React.createElement("li", null, "Elige (o crea) un usuario del sistema \u2192 ", /* @__PURE__ */ React.createElement("b", null, "Generar nuevo token"), " \u2192 selecciona tu app \u2192 marca el permiso ", /* @__PURE__ */ React.createElement("b", null, "ads_read"), " \u2192 ", /* @__PURE__ */ React.createElement("b", null, "copia"), " el token y p\xE9galo abajo."), /* @__PURE__ */ React.createElement("li", null, "Tu ", /* @__PURE__ */ React.createElement("b", null, "ID de cuenta"), " empieza con ", /* @__PURE__ */ React.createElement("code", null, "act_"), " (lo ves en Ads Manager o en Cuentas publicitarias) y va en el primer campo.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "https://business.facebook.com/settings/ad-accounts", target: "_blank", rel: "noopener", style: { color: T.accent, fontSize: 11.5, textDecoration: "underline" } }, "Ver mis cuentas publicitarias \u2197")))), /* @__PURE__ */ React.createElement(AdField, { T, label: "1 \xB7 ID de cuenta publicitaria", value: account, onChange: setAccount, placeholder: "act_1234567890" }), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "2 \xB7 Token de acceso (ads_read)"), /* @__PURE__ */ React.createElement("input", { type: "password", value: token, onChange: (e) => setToken(e.target.value), placeholder: "EAAB\u2026", autoComplete: "off", style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" } })), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 } }, "El token se guarda solo en los datos privados de tu cl\xEDnica y puedes desconectarlo cuando quieras. Al pulsar \u201CConectar y verificar\u201D comprobamos contra Meta que el token funcione antes de guardarlo.")));
}
function CorreoConnectModal({ T, onClose, onConnected }) {
  const [dest, setDest] = useState(() => {
    try {
      return window.JCSAAS && window.JCSAAS.user && window.JCSAAS.user.email || "";
    } catch (e) {
      return "";
    }
  });
  const [busy, setBusy] = useState(false);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((dest || "").trim());
  function enviarPrueba() {
    if (!emailOk) {
      window.jcmToast && window.jcmToast("Escribe un correo v\xE1lido para la prueba.", "error");
      return;
    }
    setBusy(true);
    const clinic = (() => {
      try {
        return DB.cfg().clinic_name || "tu cl\xEDnica";
      } catch (e) {
        return "tu cl\xEDnica";
      }
    })();
    window.mediqueEmail({
      to: dest.trim(),
      subject: "Prueba de correo \xB7 Medique",
      text: "\xA1Hola!\n\nEste es un correo de prueba enviado desde el panel de " + clinic + " con Medique.\n\nSi lo recibiste, el env\xEDo de correos qued\xF3 funcionando: ya puedes mandar confirmaciones y recordatorios a tus pacientes.\n\n\u2014 El equipo de Medique"
    }).then((r) => {
      setBusy(false);
      if (r && r.ok) {
        window.jcmToast && window.jcmToast("Correo de prueba enviado a " + dest.trim() + ". Revisa tu bandeja (y spam).", "ok");
        onConnected && onConnected();
      } else if (r && r.configured === false) {
        window.jcmError && window.jcmError("Correo a\xFAn no configurado en el servidor (falta RESEND_API_KEY). P\xEDdelo al administrador.", r.error);
      } else {
        window.jcmError && window.jcmError("No se pudo enviar el correo de prueba", r && r.error || r);
      }
    }).catch((e) => {
      setBusy(false);
      window.jcmError && window.jcmError("No se pudo enviar el correo de prueba", e);
    });
  }
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Conectar Correo", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: enviarPrueba }, busy ? "Enviando\u2026" : "Enviar correo de prueba") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 } }, "Env\xEDa un correo de prueba para confirmar que el canal funciona. Una vez verificado, podr\xE1s mandar confirmaciones y recordatorios a tus pacientes desde su ficha."), /* @__PURE__ */ React.createElement(AdField, { T, label: "Enviar prueba a", value: dest, onChange: setDest, placeholder: "tucorreo@ejemplo.com", inputMode: "email" }), dest.trim() && !emailOk && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: "#C0285A" } }, "Correo inv\xE1lido."), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 } }, "Los correos se env\xEDan de forma segura desde el servidor de Medique. Si no llega, revisa la carpeta de spam.")));
}
function jcmDownloadFile(name, content, mime) {
  try {
    var blob = new Blob([content], { type: mime || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      try {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (e) {
      }
    }, 600);
    return true;
  } catch (e) {
    return false;
  }
}
function jcmClinicName() {
  try {
    return window.DB && DB.cfg().clinic_name || "Medique";
  } catch (e) {
    return "Medique";
  }
}
function jcmSlug(s) {
  return (s || "medique").toLowerCase().replace(/[^a-z0-9]/g, "");
}
function jcmBackupData() {
  var patients = [], appts = [];
  try {
    patients = (window.jcmLoadPatientsFull ? window.jcmLoadPatientsFull() : window.DB && DB.get("patients") || []) || [];
  } catch (e) {
  }
  try {
    appts = window.DB && DB.get("appointments") || [];
  } catch (e) {
  }
  var clinica = jcmClinicName(), now = /* @__PURE__ */ new Date();
  var fecha = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
  var data = { clinica, generado: now.toISOString(), total_pacientes: patients.length, total_citas: appts.length, pacientes: patients, citas: appts };
  return { clinica, fecha, nPac: patients.length, nCitas: appts.length, json: JSON.stringify(data, null, 2) };
}
function jcmBackupFichas() {
  var b = jcmBackupData();
  var ok = jcmDownloadFile("respaldo-" + jcmSlug(b.clinica) + "-" + b.fecha + ".json", b.json, "application/json");
  try {
    window.jcmToast && window.jcmToast(ok ? "Respaldo descargado \xB7 " + b.nPac + " paciente(s)." : "No se pudo generar el respaldo.", ok ? "ok" : "error");
  } catch (e) {
  }
}
function jcmEmailBackup(opts) {
  opts = opts || {};
  var toast = function(m, k) {
    if (!opts.silent) {
      try {
        (k === "error" ? window.jcmError || window.jcmToast : window.jcmToast)(m, k);
      } catch (e) {
      }
    }
  };
  if (!window.mediqueEmail) {
    toast("El correo no est\xE1 disponible.", "error");
    return Promise.resolve({ ok: false });
  }
  var to = window.clinicReplyTo && window.clinicReplyTo() || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    toast("Agrega un correo en Configuraci\xF3n \u2192 Datos de la cl\xEDnica para recibir el respaldo.", "info");
    return Promise.resolve({ ok: false, error: "sin correo" });
  }
  var b = jcmBackupData();
  if (!b.nPac && !b.nCitas) {
    toast("Todav\xEDa no hay fichas ni citas para respaldar.", "info");
    return Promise.resolve({ ok: false, error: "vac\xEDo" });
  }
  var b64;
  try {
    b64 = btoa(unescape(encodeURIComponent(b.json)));
  } catch (e) {
    toast("No se pudo preparar el respaldo.", "error");
    return Promise.resolve({ ok: false, error: "encode" });
  }
  if (b64.length > 74e5) {
    toast("El respaldo es muy grande para enviarlo por correo; usa \u201CDescargar respaldo\u201D.", "info");
    return Promise.resolve({ ok: false, error: "grande" });
  }
  var fname = "respaldo-" + jcmSlug(b.clinica) + "-" + b.fecha + ".json";
  var text = "Adjuntamos el respaldo de " + b.clinica + " (" + b.nPac + " paciente(s) \xB7 " + b.nCitas + " cita(s)) generado el " + b.fecha + ".\n\nGu\xE1rdalo en un lugar seguro (por ejemplo, s\xFAbelo a tu Google Drive). Este respaldo se env\xEDa autom\xE1ticamente cada semana.\n\n\u2014 Medique";
  toast("Enviando respaldo a tu correo\u2026", "info");
  return window.mediqueEmail({ to, subject: "Respaldo de tus fichas \xB7 " + b.clinica, text, attachments: [{ filename: fname, content: b64 }] }).then(function(r) {
    if (r && r.ok) toast("Respaldo enviado a " + to + ". Revisa tu bandeja (y spam).", "ok");
    else if (r && r.configured === false) toast("Correo no configurado en el servidor (falta RESEND_API_KEY).", "error");
    else toast("No se pudo enviar el respaldo: " + (r && r.error || ""), "error");
    return r;
  });
}
if (typeof window !== "undefined") {
  window.jcmEmailBackup = jcmEmailBackup;
  window.jcmBackupData = jcmBackupData;
}
function jcmExportICS() {
  var appts = [];
  try {
    appts = window.DB && DB.get("appointments") || [];
  } catch (e) {
  }
  var clinica = jcmClinicName();
  var pad = function(n) {
    return ("0" + n).slice(-2);
  };
  var esc = function(s) {
    return ("" + (s == null ? "" : s)).replace(/([\\;,])/g, "\\$1").replace(/\n/g, "\\n");
  };
  var fmt = function(fecha, time) {
    var t = (time || "09:00").split(":");
    return (fecha || "").replace(/-/g, "") + "T" + pad(parseInt(t[0] || 9, 10)) + pad(parseInt(t[1] || 0, 10)) + "00";
  };
  var fmtEnd = function(fecha, time, min) {
    try {
      var d = /* @__PURE__ */ new Date(fecha + "T" + (time || "09:00") + ":00");
      d.setMinutes(d.getMinutes() + (min || 30));
      return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00";
    } catch (e) {
      return fmt(fecha, time);
    }
  };
  var hoy = /* @__PURE__ */ new Date();
  hoy.setHours(0, 0, 0, 0);
  var fut = appts.filter(function(a) {
    return a.fecha && /* @__PURE__ */ new Date(a.fecha + "T00:00:00") >= hoy;
  });
  var stamp = (/* @__PURE__ */ new Date()).getFullYear() + pad((/* @__PURE__ */ new Date()).getMonth() + 1) + pad((/* @__PURE__ */ new Date()).getDate()) + "T000000";
  var ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Medique//Agenda//ES\r\nCALSCALE:GREGORIAN\r\n";
  fut.forEach(function(a, i) {
    var dur = parseInt(a.dur, 10) || a.durMin || 30;
    ics += "BEGIN:VEVENT\r\nUID:" + (a.id || "apt" + i) + "@medique.cl\r\nDTSTAMP:" + stamp + "\r\nDTSTART:" + fmt(a.fecha, a.time) + "\r\nDTEND:" + fmtEnd(a.fecha, a.time, dur) + "\r\nSUMMARY:" + esc((a.proc || "Cita") + (a.name ? " \xB7 " + a.name : "")) + "\r\nDESCRIPTION:" + esc("Cita en " + clinica + (a.phone ? " \xB7 " + a.phone : "")) + "\r\nEND:VEVENT\r\n";
  });
  ics += "END:VCALENDAR\r\n";
  var ok = jcmDownloadFile("agenda-" + jcmSlug(clinica) + ".ics", ics, "text/calendar;charset=utf-8");
  try {
    window.jcmToast && window.jcmToast(ok ? fut.length + " cita(s) exportada(s). Imp\xF3rtalo en Google Calendar." : "No hay citas o no se pudo exportar.", ok && fut.length ? "ok" : "info");
  } catch (e) {
  }
}
function jcmImportReservas() {
  var S = window.JCSAAS;
  if (!(S && S.enabled && S.importWebBookings)) {
    try {
      window.jcmToast && window.jcmToast("Las reservas online se activan con tu cl\xEDnica en la nube.", "info");
    } catch (e) {
    }
    return;
  }
  try {
    window.jcmToast && window.jcmToast("Buscando reservas nuevas\u2026", "info");
  } catch (e) {
  }
  S.importWebBookings().then(function(n) {
    if (n > 0) {
      try {
        window.jcmToast && window.jcmToast(n + " reserva(s) nueva(s) importada(s) a tu agenda.", "ok");
      } catch (e) {
      }
      try {
        window.dispatchEvent(new Event("jcm:appts"));
      } catch (e) {
      }
    } else {
      try {
        window.jcmToast && window.jcmToast("No hay reservas nuevas. Ya est\xE1n todas en tu agenda.", "info");
      } catch (e) {
      }
    }
  }).catch(function() {
    try {
      (window.jcmError || window.jcmToast)("No se pudieron traer las reservas.", "error");
    } catch (e) {
    }
  });
}
if (typeof window !== "undefined") window.jcmImportReservas = jcmImportReservas;
function jcmTestIA() {
  if (!window.mediqueAI) {
    try {
      window.jcmToast && window.jcmToast("La IA no est\xE1 disponible.", "error");
    } catch (e) {
    }
    return;
  }
  var clinic = function() {
    try {
      return { name: DB.cfg().clinic_name || "" };
    } catch (e) {
      return {};
    }
  }();
  try {
    window.jcmToast && window.jcmToast("Probando la IA\u2026", "info");
  } catch (e) {
  }
  window.mediqueAI([{ role: "user", content: "Responde solo con: OK, asistente activo." }], clinic, { max_tokens: 30 }).then(function(r) {
    if (r && r.ok) {
      try {
        window.jcmToast && window.jcmToast("\u2713 La IA est\xE1 activa y respondi\xF3 correctamente.", "ok");
      } catch (e) {
      }
    } else if (r && r.configured === false) {
      try {
        (window.jcmError || window.jcmToast)("La IA no est\xE1 configurada en el servidor (falta GROQ_API_KEY).", "error");
      } catch (e) {
      }
    } else {
      try {
        (window.jcmError || window.jcmToast)("La IA no respondi\xF3: " + (r && r.error || "sin respuesta"), "error");
      } catch (e) {
      }
    }
  }).catch(function() {
    try {
      (window.jcmError || window.jcmToast)("No se pudo contactar la IA.", "error");
    } catch (e) {
    }
  });
}
if (typeof window !== "undefined") window.jcmTestIA = jcmTestIA;
function WhatsAppSetupModal({ T, onClose }) {
  const linkS = { color: T.accent, fontSize: 11.5, textDecoration: "underline" };
  const stepBox = { background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" };
  const stepNum = { fontFamily: T.sans, fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: T.accent, marginBottom: 5 };
  const stepTxt = { fontFamily: T.sans, fontSize: 12, color: T.text, lineHeight: 1.6 };
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Activar WhatsApp \xB7 paso a paso", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: onClose }, "Entendido") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 } }, "El asistente ya est\xE1 programado: recibe los mensajes, responde con IA y agenda la cita. Solo falta ", /* @__PURE__ */ React.createElement("b", null, "encender el canal de WhatsApp en Meta"), " y pegar unos datos. Lo hace el ", /* @__PURE__ */ React.createElement("b", null, "due\xF1o de la cuenta"), "."), /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(214,158,46,.10)", border: "1px solid rgba(214,158,46,.4)", borderRadius: 8, padding: "9px 12px", fontFamily: T.sans, fontSize: 11.5, color: T.gold || "#b08400", lineHeight: 1.5 } }, "\u23F3 Lo que m\xE1s demora es la ", /* @__PURE__ */ React.createElement("b", null, "verificaci\xF3n del negocio"), " en Meta (puede tardar d\xEDas). Conviene empezar por ah\xED."), /* @__PURE__ */ React.createElement("div", { style: stepBox }, /* @__PURE__ */ React.createElement("div", { style: stepNum }, "PASO 1 \xB7 CREAR LA APP"), /* @__PURE__ */ React.createElement("div", { style: stepTxt }, "En ", /* @__PURE__ */ React.createElement("b", null, "developers.facebook.com \u2192 My Apps \u2192 Create App"), " (tipo Business), agrega el producto ", /* @__PURE__ */ React.createElement("b", null, "WhatsApp"), ". Meta te da un n\xFAmero de prueba y un ", /* @__PURE__ */ React.createElement("b", null, "Phone Number ID"), ".", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "https://developers.facebook.com/apps", target: "_blank", rel: "noopener", style: linkS }, "Abrir Meta for Developers \u2197"))), /* @__PURE__ */ React.createElement("div", { style: stepBox }, /* @__PURE__ */ React.createElement("div", { style: stepNum }, "PASO 2 \xB7 TOKEN PERMANENTE"), /* @__PURE__ */ React.createElement("div", { style: stepTxt }, "En ", /* @__PURE__ */ React.createElement("b", null, "Configuraci\xF3n del negocio \u2192 Usuarios del sistema"), ", crea un usuario Admin y ", /* @__PURE__ */ React.createElement("b", null, "genera un token"), " con permisos ", /* @__PURE__ */ React.createElement("b", null, "whatsapp_business_messaging"), " y ", /* @__PURE__ */ React.createElement("b", null, "whatsapp_business_management"), ". Guarda ese token y el Phone Number ID.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "https://business.facebook.com/settings/system-users", target: "_blank", rel: "noopener", style: linkS }, "Abrir Usuarios del sistema \u2197"))), /* @__PURE__ */ React.createElement("div", { style: stepBox }, /* @__PURE__ */ React.createElement("div", { style: stepNum }, "PASO 3 \xB7 CONECTAR EL WEBHOOK"), /* @__PURE__ */ React.createElement("div", { style: stepTxt }, "En la app: ", /* @__PURE__ */ React.createElement("b", null, "WhatsApp \u2192 Configuration \u2192 Webhook"), ". URL: ", /* @__PURE__ */ React.createElement("code", null, "https://medique.cl/api/wa-webhook"), ". Inventa una palabra secreta como ", /* @__PURE__ */ React.createElement("b", null, "Verify token"), " (ej. ", /* @__PURE__ */ React.createElement("code", null, "medique-wa-2026"), "), pulsa ", /* @__PURE__ */ React.createElement("b", null, "Verify and save"), " y suscr\xEDbete al campo ", /* @__PURE__ */ React.createElement("b", null, "messages"), ".")), /* @__PURE__ */ React.createElement("div", { style: stepBox }, /* @__PURE__ */ React.createElement("div", { style: stepNum }, "PASO 4 \xB7 DATOS EN VERCEL"), /* @__PURE__ */ React.createElement("div", { style: stepTxt }, "En Vercel \u2192 Settings \u2192 Environment Variables (Production) pega ", /* @__PURE__ */ React.createElement("b", null, "WHATSAPP_TOKEN"), ", ", /* @__PURE__ */ React.createElement("b", null, "WHATSAPP_PHONE_ID"), " y ", /* @__PURE__ */ React.createElement("b", null, "WHATSAPP_VERIFY_TOKEN"), " (la misma palabra secreta del paso 3). Luego haz ", /* @__PURE__ */ React.createElement("b", null, "Redeploy"), ".")), /* @__PURE__ */ React.createElement("div", { style: stepBox }, /* @__PURE__ */ React.createElement("div", { style: stepNum }, "PASO 5 \xB7 VERIFICAR EL NEGOCIO"), /* @__PURE__ */ React.createElement("div", { style: stepTxt }, "Para responder a ", /* @__PURE__ */ React.createElement("b", null, "cualquier"), " paciente (no solo n\xFAmeros de prueba), Meta exige ", /* @__PURE__ */ React.createElement("b", null, "verificar el negocio"), " en ", /* @__PURE__ */ React.createElement("b", null, "Configuraci\xF3n del negocio \u2192 Seguridad"), ". Puede tardar d\xEDas.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "https://business.facebook.com/settings/security", target: "_blank", rel: "noopener", style: linkS }, "Abrir Verificaci\xF3n del negocio \u2197"))), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 } }, "\u{1F4AC} Costo: si el ", /* @__PURE__ */ React.createElement("b", null, "paciente escribe primero"), " es gratis dentro de 24 h; si la cl\xEDnica inicia (recordatorios) son centavos por mensaje. Apenas quede activo, las conversaciones aparecer\xE1n solas en esta bandeja.")));
}
if (typeof window !== "undefined") window.WhatsAppSetupModal = WhatsAppSetupModal;
function MetaBizGuideModal({ T, onClose }) {
  const stepBox = { background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" };
  const stepNum = { fontFamily: T.sans, fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: T.accent, marginBottom: 5 };
  const stepTxt = { fontFamily: T.sans, fontSize: 12, color: T.text, lineHeight: 1.6 };
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Bandeja de Instagram y Facebook", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: onClose }, "Entendido") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 } }, "Ver y responder tus ", /* @__PURE__ */ React.createElement("b", null, "DMs y comentarios de Instagram y Facebook"), " dentro del panel es una integraci\xF3n ", /* @__PURE__ */ React.createElement("b", null, "grande"), " (parecida a WhatsApp): Meta exige conectar tu cuenta y ", /* @__PURE__ */ React.createElement("b", null, "aprobar la app"), ", lo que tarda semanas. Por eso todav\xEDa no est\xE1 activa."), /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(214,158,46,.10)", border: "1px solid rgba(214,158,46,.4)", borderRadius: 8, padding: "9px 12px", fontFamily: T.sans, fontSize: 11.5, color: T.gold || "#b08400", lineHeight: 1.5 } }, "\u23F3 Lo que m\xE1s demora es la ", /* @__PURE__ */ React.createElement("b", null, "verificaci\xF3n del negocio + revisi\xF3n de la app (App Review)"), " en Meta. Conviene arrancarlo cuanto antes."), /* @__PURE__ */ React.createElement("div", { style: stepBox }, /* @__PURE__ */ React.createElement("div", { style: stepNum }, "QU\xC9 REQUIERE"), /* @__PURE__ */ React.createElement("div", { style: stepTxt }, "1) Conectar tu ", /* @__PURE__ */ React.createElement("b", null, "P\xE1gina de Facebook + Instagram Business"), " con login de Meta (OAuth). 2) Permisos avanzados de mensajer\xEDa/comentarios. 3) ", /* @__PURE__ */ React.createElement("b", null, "Verificaci\xF3n del negocio"), " y ", /* @__PURE__ */ React.createElement("b", null, "App Review"), " de Meta.")), /* @__PURE__ */ React.createElement("div", { style: stepBox }, /* @__PURE__ */ React.createElement("div", { style: stepNum }, "QUI\xC9N LO HACE"), /* @__PURE__ */ React.createElement("div", { style: stepTxt }, "El ", /* @__PURE__ */ React.createElement("b", null, "due\xF1o de la cuenta"), " arranca la verificaci\xF3n y la revisi\xF3n en Meta (lo lento); nosotros construimos la conexi\xF3n, el webhook y la bandeja en el panel.")), /* @__PURE__ */ React.createElement("div", { style: stepBox }, /* @__PURE__ */ React.createElement("div", { style: stepNum }, "BUENA NOTICIA"), /* @__PURE__ */ React.createElement("div", { style: stepTxt }, "Es la ", /* @__PURE__ */ React.createElement("b", null, "misma app de Meta"), " que necesita ", /* @__PURE__ */ React.createElement("b", null, "WhatsApp"), ". Haciendo el setup una vez, sirve para las dos. ", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", { href: "https://business.facebook.com/settings/security", target: "_blank", rel: "noopener", style: { color: T.accent, fontSize: 11.5, textDecoration: "underline" } }, "Abrir Verificaci\xF3n del negocio \u2197"))), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, lineHeight: 1.5 } }, "\u{1F4C4} El plan t\xE9cnico completo (fases, endpoints, tiempos) est\xE1 en ", /* @__PURE__ */ React.createElement("b", null, "META-BUSINESS-SUITE-SETUP.md"), ".")));
}
if (typeof window !== "undefined") window.MetaBizGuideModal = MetaBizGuideModal;
function CalSubModal({ T, onClose }) {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!window.mediqueCalendarLink) {
      setBusy(false);
      setErr("No disponible en este momento.");
      return;
    }
    let alive = true;
    window.mediqueCalendarLink().then((r) => {
      if (!alive) return;
      setBusy(false);
      if (r && r.ok && r.url) setUrl(r.url);
      else if (r && r.configured === false) setErr("A\xFAn no est\xE1 activo: falta la clave de servicio de Firebase en el servidor (p\xEDdeselo al administrador).");
      else setErr(r && r.error || "No se pudo generar el link del calendario.");
    });
    return () => {
      alive = false;
    };
  }, []);
  function copy() {
    try {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
    }
  }
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Google Calendar \xB7 que se actualiza solo", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: onClose }, "Listo") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 } }, "Suscrib\xED este calendario ", /* @__PURE__ */ React.createElement("b", null, "una sola vez"), " y tus reservas aparecen solas en tu Google Calendar (PC y celu) y se mantienen al d\xEDa. ", /* @__PURE__ */ React.createElement("b", null, "No hay que descargar nada.")), busy && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Generando tu link\u2026"), !busy && err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#e06a6a", lineHeight: 1.5 } }, err), !busy && url && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "Tu link de suscripci\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { readOnly: true, value: url, onFocus: (e) => e.target.select(), style: { flex: 1, fontFamily: T.sans, fontSize: 12.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2 || T.surface, color: T.text, outline: "none" } }), /* @__PURE__ */ React.createElement("button", { onClick: copy, style: { flexShrink: 0, padding: "0 13px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 } }, copied ? "\u2713" : "Copiar")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 10, lineHeight: 1.6 } }, /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "C\xF3mo suscribirlo:"), " abr\xED ", /* @__PURE__ */ React.createElement("a", { href: "https://calendar.google.com/calendar/u/0/r/settings/addbyurl", target: "_blank", rel: "noopener", style: { color: T.accent, textDecoration: "underline" } }, "Google Calendar \u2192 Agregar desde URL \u2197"), ', peg\xE1 el link de arriba y "Agregar calendario". En el celular aparece solo (sincroniza tu Google). Google lo revisa cada varias horas.'))));
}
function IntegracionesView({ T }) {
  const [list, setList] = useState(() => {
    let saved = {};
    try {
      const s = window.DB && DB.get("integrations_state");
      if (s) saved = s;
    } catch (e) {
    }
    return INTEGRATIONS_CATALOG.map((i) => ({ ...i, connected: i.id in saved ? saved[i.id] : false }));
  });
  const [metaModal, setMetaModal] = useState(false);
  const [metaOn, setMetaOn] = useState(metaConnected());
  const [correoModal, setCorreoModal] = useState(false);
  const [previewInteg, setPreviewInteg] = useState(null);
  const [waGuide, setWaGuide] = useState(false);
  const [bizGuide, setBizGuide] = useState(false);
  const [calModal, setCalModal] = useState(false);
  function toggle(id) {
    const n = list.map((i) => i.id === id ? { ...i, connected: !i.connected } : i);
    setList(n);
    try {
      if (window.DB) {
        const map = {};
        n.forEach((i) => {
          map[i.id] = i.connected;
        });
        DB.set("integrations_state", map);
      }
    } catch (e) {
    }
  }
  function markConnected(id, val) {
    const n = list.map((i) => i.id === id ? { ...i, connected: val } : i);
    setList(n);
    try {
      if (window.DB) {
        const map = {};
        n.forEach((i) => {
          map[i.id] = i.connected;
        });
        DB.set("integrations_state", map);
      }
    } catch (e) {
    }
  }
  function handleConnectClick(it, connected) {
    if (it.id === "metaads") {
      setMetaModal(true);
      return;
    }
    if (it.id === "gmail") {
      if (connected) toggle("gmail");
      else setCorreoModal(true);
      return;
    }
    if (it.id === "drive") {
      window.jcmEmailBackup ? window.jcmEmailBackup({}) : jcmBackupFichas();
      return;
    }
    if (it.id === "gcal") {
      setCalModal(true);
      return;
    }
    if (it.id === "landing") {
      jcmImportReservas();
      return;
    }
    if (it.id === "groq") {
      jcmTestIA();
      return;
    }
    if (it.id === "wa") {
      setWaGuide(true);
      return;
    }
    if (it.id === "metabiz") {
      setBizGuide(true);
      return;
    }
    if (!connected) {
      setPreviewInteg(it);
      return;
    }
    toggle(it.id);
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Integraciones", sub: "Conecta tus herramientas a Medique" }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, list.map((it) => {
    const isMeta = it.id === "metaads";
    const connected = isMeta ? metaOn : it.connected;
    const action = it.id === "drive" ? { label: "Enviar a mi correo", desc: "Cada semana te llega solo a tu correo un respaldo (.json) de fichas y citas. \xBFLo quieres ahora? Env\xEDalo." } : it.id === "gcal" ? { label: "Suscribir", desc: "Suscribe tus reservas a Google Calendar (se actualizan solas en PC y celu, sin descargar nada)." } : it.id === "landing" ? { label: "Importar reservas", desc: "Las reservas de tu link p\xFAblico entran solas a la agenda al abrir el panel. Tu link est\xE1 en Configuraci\xF3n. \xBFTraer las nuevas ahora?" } : it.id === "groq" ? { label: "Probar IA", desc: "La IA ya potencia el Copiloto y los res\xFAmenes del panel. Responder a pacientes por WhatsApp se activa al conectar WhatsApp. Probar que la IA responde:" } : it.id === "wa" ? { label: "Ver pasos", desc: "Pendiente de activar. El asistente responde a tus pacientes por WhatsApp una vez que se enciende WhatsApp Cloud API en Meta. Mira los pasos:" } : it.id === "metabiz" ? { label: "Ver requisitos", desc: "Pendiente. Ver tus DMs y comentarios de IG/FB en el panel requiere conexi\xF3n y revisi\xF3n de Meta (proyecto grande). Mira qu\xE9 hace falta:" } : null;
    return /* @__PURE__ */ React.createElement("div", { key: it.id, style: { display: "flex", alignItems: "center", gap: 13, padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + (connected ? T.line : T.lineSoft) } }, /* @__PURE__ */ React.createElement("div", { style: { width: 42, height: 42, borderRadius: 10, background: it.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, fontWeight: 500, flexShrink: 0 } }, it.letter), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, it.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, action ? action.desc : isMeta ? connected ? "\u2713 Conectada \xB7 leyendo tu gasto real" : "Conecta tu cuenta para ver gasto y ROAS reales" : connected ? "\u2713 " + it.stat : it.desc)), /* @__PURE__ */ React.createElement("button", { onClick: () => handleConnectClick(it, connected), style: {
      fontFamily: T.sans,
      fontSize: 10,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      padding: "9px 14px",
      borderRadius: 999,
      cursor: "pointer",
      whiteSpace: "nowrap",
      background: action || !connected ? T.accent : "transparent",
      color: action || !connected ? T.onAccent || "#fff" : "#1F8A5B",
      border: action || !connected ? "none" : "1px solid #1F8A5B"
    } }, action ? action.label : connected ? isMeta ? "Administrar" : "Conectado \u2713" : "Conectar"));
  })), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 14, lineHeight: 1.6 } }, "Cada herramienta se conecta con el inicio de sesi\xF3n oficial (OAuth) de la plataforma. Conecta solo las que uses en tu cl\xEDnica."), metaModal && /* @__PURE__ */ React.createElement(MetaConnectModal, { T, onClose: () => setMetaModal(false), onSaved: () => {
    setMetaOn(metaConnected());
    setMetaModal(false);
  } }), correoModal && /* @__PURE__ */ React.createElement(CorreoConnectModal, { T, onClose: () => setCorreoModal(false), onConnected: () => {
    markConnected("gmail", true);
    setCorreoModal(false);
  } }), waGuide && /* @__PURE__ */ React.createElement(WhatsAppSetupModal, { T, onClose: () => setWaGuide(false) }), bizGuide && /* @__PURE__ */ React.createElement(MetaBizGuideModal, { T, onClose: () => setBizGuide(false) }), calModal && /* @__PURE__ */ React.createElement(CalSubModal, { T, onClose: () => setCalModal(false) }), previewInteg && /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      title: "Conectar " + previewInteg.name,
      onClose: () => setPreviewInteg(null),
      footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, width: "100%" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, full: true, onClick: () => setPreviewInteg(null) }, "Cancelar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => {
        toggle(previewInteg.id);
        setPreviewInteg(null);
        try {
          window.jcmToast && window.jcmToast(previewInteg.name + " conectado.", "ok");
        } catch (e) {
        }
      } }, "Confirmar conexi\xF3n"))
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 48, height: 48, borderRadius: 12, background: previewInteg.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 20, fontWeight: 500, flexShrink: 0 } }, previewInteg.letter), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text } }, previewInteg.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, previewInteg.desc))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2, borderRadius: 8, padding: "14px", fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.65 } }, previewInteg.info))
  ));
}
function ReportesView({ T, patients, appts }) {
  const D = window.JCDATA;
  const [period, setPeriod] = useState("anio");
  const [, force] = useState(0);
  useEffect(() => {
    const tick = () => force((x) => x + 1);
    window.addEventListener("focus", tick);
    window.addEventListener("jcm:cash", tick);
    window.addEventListener("storage", tick);
    const id = setInterval(tick, 4e3);
    return () => {
      window.removeEventListener("focus", tick);
      window.removeEventListener("jcm:cash", tick);
      window.removeEventListener("storage", tick);
      clearInterval(id);
    };
  }, []);
  const moves = (() => {
    try {
      return window.DB && window.DB.get("cash_moves") || [];
    } catch (e) {
      return [];
    }
  })();
  const now = /* @__PURE__ */ new Date();
  const periodStart = (() => {
    if (period === "sem") {
      const d = new Date(now);
      d.setDate(now.getDate() - now.getDay());
      d.setHours(0, 0, 0, 0);
      return d.toISOString().slice(0, 10);
    }
    if (period === "mes") return now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-01";
    return now.getFullYear() + "-01-01";
  })();
  const ingresos = moves.filter((m) => m.type === "ingreso" && (period === "anio" || (m.ts || "") >= periodStart));
  const MES_ABBR = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const rev = [];
  for (let k = 5; k >= 0; k--) {
    const d = new Date(now.getFullYear(), now.getMonth() - k, 1);
    const key = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2);
    const sum = moves.filter((m) => m.type === "ingreso" && (m.ts || "").slice(0, 7) === key).reduce((s, m) => s + (m.amount || 0), 0);
    rev.push({ m: MES_ABBR[d.getMonth()], v: Math.round(sum / 1e5) / 10 });
  }
  const serie = rev.map((r) => r.v);
  const totalAnual = serie.reduce((a, b) => a + b, 0);
  const growth = serie[0] > 0 ? Math.round((serie[serie.length - 1] / serie[0] - 1) * 100) : 0;
  const procCount = {};
  (appts || []).forEach((a) => {
    const k = (a.proc || "").trim();
    if (k) procCount[k] = (procCount[k] || 0) + 1;
  });
  const totalCitas = Object.values(procCount).reduce((a, b) => a + b, 0);
  const pop = Object.entries(procCount).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([n, c]) => [n, totalCitas ? c / totalCitas : 0]);
  const ticketProm = ingresos.length ? Math.round(ingresos.reduce((s, m) => s + (m.amount || 0), 0) / ingresos.length) : 0;
  const t0 = typeof _localDay === "function" ? _localDay() : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const _dayOf = (ts) => typeof _localDay === "function" ? _localDay(ts) : (ts || "").slice(0, 10);
  const cashToday2 = moves.filter((m) => m.type === "ingreso" && _dayOf(m.ts) === t0).reduce((s, m) => s + (m.amount || 0), 0);
  const m0 = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2);
  const cashMonth = moves.filter((m) => m.type === "ingreso" && _dayOf(m.ts).slice(0, 7) === m0).reduce((s, m) => s + (m.amount || 0), 0);
  const MES_NOMBRE = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][now.getMonth()];
  const conEstado = (appts || []).filter((a) => a.status);
  const noShow = conEstado.length ? Math.round(conEstado.filter((a) => a.status === "no_show" || a.status === "ausente").length / conEstado.length * 100) : 0;
  const green = "#1F8A5B";
  function RevChart() {
    const W = 720, H = 150, padL = 8, padR = 8, padT = 12, padB = 24;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const maxY = (Math.max.apply(null, serie) || 1) * 1.18, n = serie.length;
    const X = (i) => padL + i * innerW / (n - 1);
    const Y = (v) => padT + (1 - (v || 0) / maxY) * innerH;
    const line = "M " + serie.map((v, i) => X(i).toFixed(1) + " " + Y(v).toFixed(1)).join(" L ");
    const area = line + " L " + X(n - 1).toFixed(1) + " " + (padT + innerH) + " L " + padL + " " + (padT + innerH) + " Z";
    const grid = [0, 1, 2, 3].map((g) => padT + g * innerH / 3);
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 " + W + " " + H, style: { width: "100%", height: "auto", display: "block" }, preserveAspectRatio: "xMidYMid meet" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "repGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: T.accent, stopOpacity: "0.22" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: T.accent, stopOpacity: "0" }))), grid.map((y, i) => /* @__PURE__ */ React.createElement("line", { key: i, x1: padL, y1: y, x2: padL + innerW, y2: y, stroke: T.line, strokeWidth: "1" })), /* @__PURE__ */ React.createElement("path", { d: area, fill: "url(#repGrad)" }), /* @__PURE__ */ React.createElement("path", { d: line, fill: "none", stroke: T.accent, strokeWidth: "2.4", strokeLinejoin: "round", strokeLinecap: "round" }), serie.map((v, i) => /* @__PURE__ */ React.createElement("circle", { key: i, cx: X(i), cy: Y(v), r: "3.6", fill: T.surface, stroke: T.accent, strokeWidth: "2" })), rev.map((r, i) => /* @__PURE__ */ React.createElement("text", { key: r.m, x: X(i), y: H - 7, textAnchor: "middle", fontSize: "11", fontFamily: T.sans, fill: T.textMute }, r.m)));
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Reportes y estad\xEDsticas", sub: "An\xE1lisis detallado del rendimiento de tu cl\xEDnica." }), /* @__PURE__ */ React.createElement("select", { value: period, onChange: (e) => setPeriod(e.target.value), style: { fontFamily: T.sans, fontSize: 12, padding: "8px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none" } }, /* @__PURE__ */ React.createElement("option", { value: "anio" }, "Este a\xF1o"), /* @__PURE__ */ React.createElement("option", { value: "mes" }, "Este mes"), /* @__PURE__ */ React.createElement("option", { value: "sem" }, "Esta semana"))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "16px 18px", marginBottom: 14, boxShadow: T.shadow ? "0 10px 30px -18px rgba(0,0,0,.25)" : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 32, borderRadius: 9, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 17l5-5 4 4 8-8M21 8h-4M21 8v4" }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, "Evoluci\xF3n de ingresos"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, "Acumulado del a\xF1o \xB7 MM CLP"))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.text, lineHeight: 1 } }, "$", totalAnual.toFixed(1), "MM"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: green, marginTop: 3 } }, "\u2197 +", growth, "% vs. inicio de a\xF1o"))), /* @__PURE__ */ React.createElement(RevChart, null)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "16px 18px", boxShadow: T.shadow ? "0 10px 30px -18px rgba(0,0,0,.25)" : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute } }, "Ingresos hoy"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, color: green, display: "inline-flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: green } }), "en vivo")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, color: T.text, marginTop: 6 } }, D.fmt(cashToday2))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "16px 18px", boxShadow: T.shadow ? "0 10px 30px -18px rgba(0,0,0,.25)" : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute } }, "Ingresos del mes"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute, textTransform: "capitalize" } }, MES_NOMBRE)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, color: T.text, marginTop: 6 } }, D.fmt(cashMonth)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: D.fmt(ticketProm), l: "Ticket promedio" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: (patients || []).length, l: "Pacientes" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: noShow + "%", l: "No-show rate" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: D.fmt(cashToday2), l: "Ingresos hoy" })), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "16px 18px", boxShadow: T.shadow ? "0 10px 30px -18px rgba(0,0,0,.25)" : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 32, borderRadius: 9, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 20V10M10 20V4M16 20v-7M22 20H2" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, "Servicios m\xE1s populares")), pop.length === 0 && /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn sin citas registradas. El ranking aparecer\xE1 cuando agendes procedimientos."), pop.map(([n, p]) => /* @__PURE__ */ React.createElement("div", { key: n, style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 12.5, color: T.text, marginBottom: 5 } }, /* @__PURE__ */ React.createElement("span", null, n), /* @__PURE__ */ React.createElement("span", { style: { color: T.accent, fontWeight: 600 } }, Math.round(p * 100), "%")), /* @__PURE__ */ React.createElement("div", { style: { height: 7, background: T.surface2, borderRadius: 999, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: p * 100 + "%", background: "linear-gradient(90deg," + T.accent + "," + T.accentDeep + ")", borderRadius: 999 } }))))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, full: true, onClick: () => {
    const csv = "Mes,Ingresos(MM CLP)\n" + rev.map((r) => r.m + "," + r.v).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "reporte-ingresos.csv";
    a.click();
  } }, "Exportar CSV")));
}
const IND_TPL_SEED = [
  { id: "tpl_tox", name: "Neuromodulaci\xF3n con Toxina botul\xEDnica", body: "\u2022 No tocar ni masajear la zona tratada por 6 horas.\n\u2022 Mantente en posici\xF3n vertical las primeras 4 horas (no agacharte ni acostarte).\n\u2022 Gesticula suavemente la zona tratada durante la primera hora.\n\u2022 Evita ejercicio intenso, sauna, sol directo y alcohol por 24 h.\n\u2022 No realices masajes faciales ni otros tratamientos en la zona por 2 semanas.\n\u2022 El efecto se evidencia entre el d\xEDa 4 y 14. Control a los 21 d\xEDas." },
  { id: "tpl_bio", name: "Bioestimulaci\xF3n de col\xE1geno", body: "\u2022 Realiza masajes en la zona 5 minutos, 5 veces al d\xEDa, por 5 d\xEDas (regla del 5).\n\u2022 Aplica fr\xEDo local las primeras 24 h si hay inflamaci\xF3n.\n\u2022 Evita sol directo, sauna y ejercicio intenso por 48 h.\n\u2022 Puede haber leve inflamaci\xF3n o peque\xF1os hematomas que ceden en pocos d\xEDas.\n\u2022 Los resultados son progresivos durante las semanas siguientes.\n\u2022 Asiste a tus sesiones de control seg\xFAn el plan indicado." },
  { id: "tpl_arm", name: "Armonizaci\xF3n facial", body: "\u2022 Aplica fr\xEDo local 10 min cada 2 h durante las primeras 24 h.\n\u2022 No manipules ni masajees la zona salvo indicaci\xF3n.\n\u2022 Evita ejercicio intenso, sauna, calor y alcohol por 24\u201348 h.\n\u2022 Duerme boca arriba las primeras noches.\n\u2022 Pueden aparecer inflamaci\xF3n o hematomas leves que ceden en d\xEDas.\n\u2022 Ante dolor intenso, palidez o cambio de color de la piel, cont\xE1ctanos de inmediato." }
];
function getIndTemplates() {
  try {
    const c = window.DB && DB.cfg().ind_templates;
    if (c && c.length) return c;
  } catch (e) {
  }
  return (typeof clinicSeeded === "function" ? clinicSeeded() : true) ? IND_TPL_SEED : [];
}
function FirmasMedicasEditor({ T }) {
  const SignPad = window.SignaturePad;
  const [sigs, setSigs] = useState(function() {
    try {
      return window.DB.get("medic_sigs") || [];
    } catch (e) {
      return [];
    }
  });
  const [adding, setAdding] = useState(false);
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [registro, setRegistro] = useState("");
  const [sig, setSig] = useState(null);
  const [saved, setSaved] = useState(false);
  function guardar() {
    if (!nombre.trim() || !sig) return;
    var ns = sigs.concat([{ id: "ms" + Date.now(), name: nombre.trim(), rut: rut.trim(), registro: registro.trim(), sig }]);
    setSigs(ns);
    try {
      window.DB.set("medic_sigs", ns);
    } catch (e) {
    }
    setSaved(true);
    setTimeout(function() {
      setSaved(false);
    }, 2e3);
    setAdding(false);
    setNombre("");
    setRut("");
    setRegistro("");
    setSig(null);
  }
  async function eliminar(id, name) {
    if (!await (window.jcmConfirm || window.confirm)("\xBFEliminar la firma de " + name + "?", { danger: true })) return;
    var ns = sigs.filter(function(s) {
      return s.id !== id;
    });
    setSigs(ns);
    try {
      window.DB.set("medic_sigs", ns);
    } catch (e) {
    }
  }
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 13.5, padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 8 } }, "Firmas de m\xE9dicos"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 12, lineHeight: 1.5 } }, "Las firmas aqu\xED configuradas se insertan autom\xE1ticamente en las recetas e indicaciones al imprimir, y aparecen como ", /* @__PURE__ */ React.createElement("em", null, "M\xE9dico responsable"), " en los consentimientos firmados."), sigs.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 } }, sigs.map(function(s) {
    return /* @__PURE__ */ React.createElement("div", { key: s.id, style: { display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", borderRadius: 8, background: T.surface2, border: "1px solid " + T.line } }, s.sig ? /* @__PURE__ */ React.createElement("img", { src: s.sig, alt: "firma", style: { height: 38, width: "auto", maxWidth: 100, objectFit: "contain", background: "#fff", borderRadius: 4, padding: "3px 6px", border: "1px solid " + T.line, flexShrink: 0 } }) : /* @__PURE__ */ React.createElement("div", { style: { width: 80, height: 38, background: T.surface, borderRadius: 4, border: "1px solid " + T.line, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, s.name), (s.rut || s.registro) && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, [s.rut && "RUT " + s.rut, s.registro && "Reg. " + s.registro].filter(Boolean).join(" \xB7 "))), /* @__PURE__ */ React.createElement("button", { onClick: function() {
      eliminar(s.id, s.name);
    }, title: "Eliminar firma", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 6, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ React.createElement("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4h6v2" }))));
  })), adding ? /* @__PURE__ */ React.createElement("div", { style: { border: "1px solid " + T.line, borderRadius: 8, padding: "14px 14px", background: T.surface2 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Nombre del m\xE9dico"), /* @__PURE__ */ React.createElement("input", { style: inp, value: nombre, onChange: function(e) {
    setNombre(e.target.value);
  }, placeholder: "Dr. Juan P\xE9rez", autoFocus: true })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "RUT"), /* @__PURE__ */ React.createElement("input", { style: inp, value: rut, onChange: function(e) {
    setRut(e.target.value);
  }, placeholder: "12.345.678-9" })), /* @__PURE__ */ React.createElement("label", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "N\xB0 Registro MINSAL / SIS"), /* @__PURE__ */ React.createElement("input", { style: inp, value: registro, onChange: function(e) {
    setRegistro(e.target.value);
  }, placeholder: "12345" }))), /* @__PURE__ */ React.createElement("span", { style: lbl }, "Firma digital"), SignPad ? /* @__PURE__ */ React.createElement(SignPad, { T, onChange: setSig, height: 150 }) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Componente de firma no disponible."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 14 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: function() {
        setAdding(false);
        setNombre("");
        setRut("");
        setRegistro("");
        setSig(null);
      },
      style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "12px 18px", borderRadius: 6, border: "1px solid " + T.line, background: "none", color: T.textMute, cursor: "pointer" }
    },
    "Cancelar"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: guardar,
      disabled: !nombre.trim() || !sig,
      style: { flex: 1, fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "12px 18px", borderRadius: 6, border: "none", background: nombre.trim() && sig ? T.accent : T.surface, color: nombre.trim() && sig ? T.onAccent || "#fff" : T.textFaint, cursor: nombre.trim() && sig ? "pointer" : "default" }
    },
    "Guardar firma"
  ))) : /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: function() {
        setAdding(true);
      },
      style: { display: "inline-flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "11px 16px", borderRadius: 6, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer" }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })),
    "Agregar firma",
    saved && /* @__PURE__ */ React.createElement("span", { style: { color: "#4caf73", fontWeight: 600, marginLeft: 4 } }, "\u2713 guardada")
  ));
}
const DIAG_OPTS = ["Neuromodulaci\xF3n con Toxina botul\xEDnica", "Bioestimulaci\xF3n de col\xE1geno", "Armonizaci\xF3n facial"];
function IndTemplatesEditor({ T }) {
  const SA = window.JCSAAS;
  const me = SA && SA.userEmail && SA.userEmail() || "";
  const myName = SA && SA.currentUserName && SA.currentUserName() || "";
  const isProf = !!(SA && SA.currentRole && SA.currentRole() === "professional");
  const isAdmin = !isProf;
  const [tpls, setTpls] = useState(getIndTemplates);
  const [saved, setSaved] = useState(false);
  function save(n) {
    setTpls(n);
    try {
      DB.set("config", Object.assign({}, DB.cfg(), { ind_templates: n }));
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (e) {
    }
  }
  function updId(id, patch) {
    save(tpls.map((t) => t.id === id ? { ...t, ...patch } : t));
  }
  function add() {
    save([...tpls, { id: "tpl_" + Date.now(), name: "Nueva plantilla", body: "", owner: me, ownerName: myName || (isAdmin ? "Cl\xEDnica" : "") }]);
  }
  async function delId(id) {
    const t = tpls.find((x) => x.id === id);
    if (await (window.jcmConfirm || window.confirm)(`\xBFEliminar la plantilla "${t && t.name}"?`, { danger: true })) save(tpls.filter((x) => x.id !== id));
  }
  const canEdit = (t) => t.owner ? !!me && t.owner === me : isAdmin;
  const visible = isAdmin ? tpls : tpls.filter((t) => t.owner === me || !t.owner);
  const inp = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" };
  const inpRO = { ...inp, background: T.surface2, color: T.textMute, cursor: "default" };
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M9 11l3 3 8-8" }), /* @__PURE__ */ React.createElement("path", { d: "M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" })), "Indicaciones post tratamiento"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "5px 0 4px" } }, "Plantillas que podr\xE1s seleccionar al registrar indicaciones, sin tipear a mano. ", saved && /* @__PURE__ */ React.createElement("span", { style: { color: "#1F8A5B" } }, "\u2713 Guardado")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 14, lineHeight: 1.5 } }, isAdmin ? "Ves las plantillas de todo el equipo. Cada profesional edita solo las suyas desde su cuenta; las de otros aparecen de solo lectura." : "Estas son tus plantillas. Solo t\xFA puedes editarlas desde tu cuenta."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, visible.map((t) => {
    const editable = canEdit(t);
    return /* @__PURE__ */ React.createElement("div", { key: t.id, style: { border: "1px solid " + (editable ? T.line : T.lineSoft), borderRadius: 10, padding: "12px 13px", background: editable ? "transparent" : T.surface2 + "80" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("input", { value: t.name, readOnly: !editable, onChange: editable ? (e) => updId(t.id, { name: e.target.value }) : void 0, style: { ...editable ? inp : inpRO, fontWeight: 600 }, placeholder: "Nombre de la plantilla" }), editable ? /* @__PURE__ */ React.createElement("button", { onClick: () => delId(t.id), title: "Eliminar", style: { flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: T.textFaint, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))) : /* @__PURE__ */ React.createElement("span", { title: "Solo el profesional creador puede editarla", style: { flexShrink: 0, display: "flex", alignItems: "center", color: T.textFaint, padding: "8px 6px" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })))), /* @__PURE__ */ React.createElement("textarea", { value: t.body, readOnly: !editable, onChange: editable ? (e) => updId(t.id, { body: e.target.value }) : void 0, rows: 5, placeholder: "Indicaciones / cuidados\u2026", style: { ...editable ? inp : inpRO, resize: "vertical", lineHeight: 1.5 } }), t.owner && t.owner !== me && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 } }, "Creada por ", t.ownerName || "otro profesional", " \xB7 solo lectura"));
  }), visible.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint, padding: "8px 2px" } }, "A\xFAn no tienes plantillas. Crea la primera con el bot\xF3n de abajo.")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: add }, "+ A\xF1adir plantilla")));
}
const CFG_TABS = [["datos", "Datos de la cl\xEDnica"], ["reserva", "Reserva y enlaces"], ["horarios", "Horarios"], ["plantillas", "Plantillas y firmas"]];
function ConfigView({ T }) {
  const D = window.JCDATA;
  const [cfgTab, setCfgTab] = useState(() => {
    try {
      var t = window.jcmConfigTab;
      if (t) {
        window.jcmConfigTab = null;
        return t;
      }
    } catch (e) {
    }
    return "datos";
  });
  const bookUrl = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.bookingLink ? window.JCSAAS.bookingLink() : (typeof window !== "undefined" ? window.jcmPubBase ? window.jcmPubBase() : window.location.origin : "") + "/reservar";
  const mobileUrl = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.mobileLink ? window.JCSAAS.mobileLink() : (typeof window !== "undefined" ? window.location.origin : "") + "/movil";
  const qr = "https://api.qrserver.com/v1/create-qr-code/?size=170x170&margin=0&data=" + encodeURIComponent(bookUrl);
  const [copied, setCopied] = useState(false);
  const [copiedMob, setCopiedMob] = useState(false);
  function copyLink() {
    try {
      navigator.clipboard.writeText(bookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
    }
  }
  function copyMobile() {
    try {
      navigator.clipboard.writeText(mobileUrl);
      setCopiedMob(true);
      setTimeout(() => setCopiedMob(false), 1800);
    } catch (e) {
    }
  }
  const [calUrl, setCalUrl] = useState("");
  const [calBusy, setCalBusy] = useState(false);
  const [calErr, setCalErr] = useState("");
  const [calCopied, setCalCopied] = useState(false);
  function genCal() {
    if (!window.mediqueCalendarLink) {
      setCalErr("No disponible en este momento.");
      return;
    }
    setCalBusy(true);
    setCalErr("");
    window.mediqueCalendarLink().then((r) => {
      setCalBusy(false);
      if (r && r.ok && r.url) setCalUrl(r.url);
      else if (r && r.configured === false) setCalErr("A\xFAn no est\xE1 activo: falta que el administrador agregue la clave de servicio de Firebase en el servidor.");
      else setCalErr(r && r.error || "No se pudo generar el link del calendario.");
    });
  }
  function copyCal() {
    try {
      navigator.clipboard.writeText(calUrl);
      setCalCopied(true);
      setTimeout(() => setCalCopied(false), 1800);
    } catch (e) {
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Configuraci\xF3n de la cl\xEDnica", sub: "Administra la informaci\xF3n p\xFAblica y los detalles de tu cl\xEDnica." }), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 } }, CFG_TABS.map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setCfgTab(k), style: { fontFamily: T.sans, fontSize: 12, fontWeight: cfgTab === k ? 600 : 500, padding: "8px 15px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (cfgTab === k ? T.accent : T.line), background: cfgTab === k ? T.accent : "transparent", color: cfgTab === k ? T.onAccent || "#fff" : T.textMute, whiteSpace: "nowrap" } }, l))), cfgTab === "reserva" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "6", y: "2", width: "12", height: "20", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M11 18h2" })), "Panel m\xF3vil del equipo"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "5px 0 14px" } }, "P\xE1gina m\xF3vil para que t\xFA o tu equipo ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "confirmen y creen citas directas"), " desde el tel\xE9fono. Inicia sesi\xF3n con tu cuenta del panel."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("input", { readOnly: true, value: mobileUrl, onFocus: (e) => e.target.select(), style: { flex: 1, minWidth: 220, fontFamily: T.sans, fontSize: 12.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, outline: "none" } }), /* @__PURE__ */ React.createElement("button", { onClick: copyMobile, title: "Copiar", style: { flexShrink: 0, padding: "0 13px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 } }, copiedMob ? "\u2713" : "Copiar"), /* @__PURE__ */ React.createElement("a", { href: mobileUrl, target: "_blank", rel: "noopener", style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, color: T.text, textDecoration: "none", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "9px 13px" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" })), "Abrir"))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4" })), "Reserva online \u2014 comparte tu link"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "5px 0 14px" } }, "Comparte este enlace o c\xF3digo QR en Instagram, WhatsApp o tu web para que tus pacientes agenden solos. Es tu p\xE1gina de reserva directa."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 240 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "Enlace p\xFAblico"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { readOnly: true, value: bookUrl, onFocus: (e) => e.target.select(), style: { flex: 1, fontFamily: T.sans, fontSize: 12.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, outline: "none" } }), /* @__PURE__ */ React.createElement("button", { onClick: copyLink, title: "Copiar", style: { flexShrink: 0, padding: "0 13px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 } }, copied ? "\u2713" : "Copiar")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement("a", { href: bookUrl, target: "_blank", rel: "noopener", style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, color: T.text, textDecoration: "none", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "9px 13px" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" })), "Abrir"), /* @__PURE__ */ React.createElement("a", { href: qr, download: "qr-reserva.png", style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, color: T.text, textDecoration: "none", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "9px 13px" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M12 16V4M7 11l5 5 5-5M5 20h14" })), "Descargar QR"))), /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, background: "#fff", border: "1px solid " + T.line, borderRadius: 12, padding: 10 } }, /* @__PURE__ */ React.createElement("img", { src: qr, alt: "QR de reserva", width: "150", height: "150", style: { display: "block" } })))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4M9 16l2 2 4-4" })), "Calendario que se actualiza solo"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "5px 0 14px", lineHeight: 1.5 } }, "Suscribe este calendario UNA vez en Google Calendar (o Apple/Outlook) y tus reservas aparecen solas en tu tel\xE9fono y PC, sin descargar nada. Google lo revisa cada varias horas (no es instant\xE1neo)."), !calUrl ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: genCal }, calBusy ? "Generando\u2026" : "Generar mi link de calendario"), calErr && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#e06a6a", marginTop: 10, lineHeight: 1.5 } }, calErr)) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "Tu link de suscripci\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { readOnly: true, value: calUrl, onFocus: (e) => e.target.select(), style: { flex: 1, fontFamily: T.sans, fontSize: 12.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, outline: "none" } }), /* @__PURE__ */ React.createElement("button", { onClick: copyCal, title: "Copiar", style: { flexShrink: 0, padding: "0 13px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 } }, calCopied ? "\u2713" : "Copiar")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 10, lineHeight: 1.6 } }, /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "C\xF3mo suscribirlo en Google Calendar:"), " abre ", /* @__PURE__ */ React.createElement("a", { href: "https://calendar.google.com/calendar/u/0/r/settings/addbyurl", target: "_blank", rel: "noopener", style: { color: T.accent, textDecoration: "underline" } }, "Agregar desde URL \u2197"), ", pega el link de arriba y pulsa \u201CAgregar calendario\u201D. (En el celular ya lo ver\xE1s porque sincroniza tu Google).")))), cfgTab === "datos" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 14, alignItems: "start" } }, /* @__PURE__ */ React.createElement(ClinicDataCard, { T }), /* @__PURE__ */ React.createElement(PaymentDataCard, { T })), /* @__PURE__ */ React.createElement(AccountEmailCard, { T }), /* @__PURE__ */ React.createElement(AdminPinCard, { T })), cfgTab === "horarios" && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement(HorariosEditor, { T })), cfgTab === "plantillas" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IndTemplatesEditor, { T }), /* @__PURE__ */ React.createElement(FirmasMedicasEditor, { T }), /* @__PURE__ */ React.createElement(RecitaDescCard, { T })));
}
function ClinCard({ T, title, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, title), children);
}
function NotificacionesCard({ T }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, marginBottom: 16, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen((o) => !o), style: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 40, height: 40, borderRadius: 11, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }), /* @__PURE__ */ React.createElement("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, "Notificaciones autom\xE1ticas"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 } }, "Confirmaci\xF3n por correo 24 h antes \xB7 recordatorios por WhatsApp")), /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", style: { transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "m6 9 6 6 6-6" }))), open && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 18px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 8, lineHeight: 1.5, paddingTop: 4, borderTop: "1px solid " + T.lineSoft } }, "La confirmaci\xF3n por correo se env\xEDa ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "24 horas antes"), " de la cita. Los avisos por WhatsApp quedar\xE1n activos al conectar el permiso de Meta."), /* @__PURE__ */ React.createElement(ToggleRow, { T, label: "Confirmaci\xF3n por correo \xB7 24 h antes (Gmail)", def: true }), /* @__PURE__ */ React.createElement(ToggleRow, { T, label: "Recordatorio 24 h antes (WhatsApp)", def: true, badge: "Requiere Meta" }), /* @__PURE__ */ React.createElement(ToggleRow, { T, label: "Recordatorio el d\xEDa del tratamiento \xB7 08:30 (WhatsApp)", def: true, badge: "Requiere Meta" }), /* @__PURE__ */ React.createElement(ToggleRow, { T, label: "Resumen diario con Gemini", def: false })));
}
function RecitaDescCard({ T }) {
  const DB2 = _db();
  const cfg0 = (() => {
    try {
      return window.DB && DB2.cfg() || {};
    } catch (e) {
      return {};
    }
  })();
  const [tipo, setTipo] = useState(cfg0.recita_desc_tipo || "fijo");
  const [val, setVal] = useState(cfg0.recita_desc_val != null ? String(cfg0.recita_desc_val) : "");
  const [saved, setSaved] = useState(false);
  function save() {
    const n = parseInt(val, 10);
    if (!n || n <= 0) return;
    try {
      DB2.set("config", Object.assign({}, DB2.cfg(), { recita_desc_tipo: tipo, recita_desc_val: n }));
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
      window.jcmToast && window.jcmToast("Descuento de re-cita guardado.", "ok");
    } catch (e) {
    }
  }
  const preview = (() => {
    const n = parseInt(val, 10) || 0;
    if (!n) return "";
    const ejemplo = 15e4;
    const desc = tipo === "pct" ? Math.round(ejemplo * (1 - n / 100) / 1e3) * 1e3 : Math.max(0, ejemplo - n);
    return "Ej. Botox $150.000 \u2192 precio preferente $" + desc.toLocaleString("es-CL");
  })();
  const inp = { fontFamily: T.sans, fontSize: 13, padding: "9px 11px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, outline: "none", width: "100%", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8, marginBottom: 5 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" }), /* @__PURE__ */ React.createElement("line", { x1: "7", y1: "7", x2: "7.01", y2: "7" })), "Campa\xF1a re-cita \xB7 Descuento preferente"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 } }, "Define cu\xE1nto se descuenta al precio del procedimiento en el mensaje de WhatsApp de re-cita. Puedes usar un monto fijo (ej. $20.000 menos) o un porcentaje."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10 } }, [["fijo", "Monto fijo (CLP)"], ["pct", "Porcentaje (%)"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTipo(k), style: { flex: 1, padding: "9px 0", borderRadius: 8, border: "1px solid " + (tipo === k ? T.accent : T.line), background: tipo === k ? T.accent + "14" : T.bg, color: tipo === k ? T.accent : T.textMute, fontFamily: T.sans, fontSize: 12, fontWeight: tipo === k ? 600 : 400, cursor: "pointer" } }, l))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", flex: 1 } }, /* @__PURE__ */ React.createElement("input", { value: val, onChange: (e) => setVal(e.target.value.replace(/\D/g, "")), placeholder: tipo === "pct" ? "Ej. 10" : "Ej. 20000", style: inp }), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", fontFamily: T.sans, fontSize: 12, color: T.textFaint, pointerEvents: "none" } }, tipo === "pct" ? "%" : "CLP")), /* @__PURE__ */ React.createElement("button", { onClick: save, style: { flexShrink: 0, padding: "9px 18px", borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" } }, saved ? "\u2713 Guardado" : "Guardar")), preview && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 8, fontStyle: "italic" } }, preview));
}
function ClinicDataCard({ T }) {
  const cfg0 = (() => {
    try {
      return window.DB && DB.cfg() || {};
    } catch (e) {
      return {};
    }
  })();
  const clinicName = (() => {
    try {
      return window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && (window.JCSAAS.currentClinic() || {}).name;
    } catch (e) {
      return "";
    }
  })();
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
    let d = (v || "").replace(/\D/g, "");
    if (d.indexOf("56") === 0) d = d.slice(2);
    if (d.charAt(0) === "9") d = d.slice(1);
    d = d.slice(0, 8);
    setF({ ...f, wa_number: "569" + d });
    setSaved(false);
  }
  const waDisplay = "+569 " + (f.wa_number || "").replace(/^569/, "");
  function save() {
    if (!emailReplyOk) {
      window.jcmToast && window.jcmToast("El correo para respuestas no es v\xE1lido.", "error");
      return;
    }
    try {
      DB.set("config", Object.assign({}, DB.cfg(), { clinic_name: f.clinic_name.trim(), clinic_addr: f.clinic_addr.trim(), clinic_maps: (f.clinic_maps || "").trim(), professional: f.professional.trim(), clinic_email: f.clinic_email.trim().toLowerCase(), wa_number: (f.wa_number || "").replace(/\D/g, "") }));
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (e) {
    }
  }
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Datos de la cl\xEDnica"), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: save }, saved ? "\u2713 Guardado" : "Guardar")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre de la cl\xEDnica", value: f.clinic_name, onChange: (v) => {
    setF({ ...f, clinic_name: v });
    setSaved(false);
  }, placeholder: "Ej: Cl\xEDnica Karenina" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Direcci\xF3n", value: f.clinic_addr, onChange: (v) => {
    setF({ ...f, clinic_addr: v });
    setSaved(false);
  }, placeholder: "Ej: 1 Norte 123, oficina 4, Talca" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AdField, { T, label: "Link de Google Maps (opcional)", value: f.clinic_maps, onChange: (v) => {
    setF({ ...f, clinic_maps: v });
    setSaved(false);
  }, placeholder: "Pega el enlace de tu ficha en Google Maps" }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, lineHeight: 1.5, marginTop: 5 } }, "Se env\xEDa como \u201CC\xF3mo llegar\u201D en el WhatsApp de confirmaci\xF3n. Si lo dejas vac\xEDo, se genera autom\xE1ticamente desde la direcci\xF3n. Abre la app de mapas en el tel\xE9fono del paciente.")), /* @__PURE__ */ React.createElement(AdField, { T, label: "Profesional a cargo", value: f.professional, onChange: (v) => {
    setF({ ...f, professional: v.replace(/[0-9]/g, "") });
    setSaved(false);
  }, placeholder: "Ej: Dra. Karenina Soto" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AdField, { T, label: "Correo para respuestas de pacientes", value: f.clinic_email, onChange: (v) => {
    setF({ ...f, clinic_email: v });
    setSaved(false);
  }, placeholder: "Ej: contacto@tuclinica.cl" }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: emailReplyOk ? T.textMute : "#e06a6a", lineHeight: 1.5, marginTop: 5 } }, emailReplyOk ? "Cuando un paciente responda un recordatorio, su respuesta llegar\xE1 a este correo. Si lo dejas vac\xEDo, se usa el correo con que iniciaste sesi\xF3n." : "Correo no v\xE1lido.")), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "WhatsApp"), /* @__PURE__ */ React.createElement("input", { value: waDisplay, onChange: (e) => onWa(e.target.value), inputMode: "numeric", placeholder: "+569 1234 5678", style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" } }))));
}
function AdminPinCard({ T }) {
  const [pin, setPin] = useState(() => {
    try {
      return String(window.DB && window.DB.get("admin_pin") || "");
    } catch (e) {
      return "";
    }
  });
  const [pin2, setPin2] = useState("");
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");
  function save() {
    setErr("");
    if (!pin.trim()) {
      setErr("Ingresa un PIN de al menos 4 d\xEDgitos.");
      return;
    }
    if (pin.trim().length < 4) {
      setErr("El PIN debe tener al menos 4 caracteres.");
      return;
    }
    if (pin.trim() !== pin2.trim()) {
      setErr("Los PINs no coinciden.");
      return;
    }
    try {
      window.DB && window.DB.set("admin_pin", pin.trim());
      setSaved(true);
      setPin2("");
      setTimeout(() => setSaved(false), 1800);
    } catch (e) {
      setErr("No se pudo guardar.");
    }
  }
  const hasSaved = (() => {
    try {
      return !!(window.DB && window.DB.get("admin_pin"));
    } catch (e) {
      return false;
    }
  })();
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "PIN de seguridad"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 3 } }, "Requerido para borrar movimientos de Caja y otras acciones sensibles.")), hasSaved && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: "#1F8A5B", background: "#1F8A5B18", borderRadius: 6, padding: "3px 9px" } }, "PIN activo")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, hasSaved ? "Nuevo PIN" : "PIN de admin"), /* @__PURE__ */ React.createElement("input", { type: "password", value: pin, "data-nocap": "1", onChange: (e) => {
    setPin(e.target.value);
    setSaved(false);
    setErr("");
  }, placeholder: "M\xEDnimo 4 caracteres", style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, outline: "none", boxSizing: "border-box" } })), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Confirmar PIN"), /* @__PURE__ */ React.createElement("input", { type: "password", value: pin2, "data-nocap": "1", onChange: (e) => {
    setPin2(e.target.value);
    setSaved(false);
    setErr("");
  }, placeholder: "Repite el PIN", style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, outline: "none", boxSizing: "border-box" } })), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#C0285A" } }, err), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: save }, saved ? "\u2713 PIN guardado" : hasSaved ? "Cambiar PIN" : "Guardar PIN")));
}
function AccountEmailCard({ T }) {
  const SA = window.JCSAAS;
  const enabled = !!(SA && SA.enabled);
  const isProf = !!(SA && SA.currentRole && SA.currentRole() === "professional");
  const current = enabled && SA.userEmail && SA.userEmail() || "";
  const [nuevo, setNuevo] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  if (!enabled || isProf || !current) return null;
  const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevo.trim());
  async function cambiar() {
    if (busy) return;
    setMsg(null);
    if (!okMail) {
      setMsg({ ok: false, text: "Escribe un correo nuevo v\xE1lido." });
      return;
    }
    if (!pass) {
      setMsg({ ok: false, text: "Ingresa tu contrase\xF1a actual para confirmar." });
      return;
    }
    setBusy(true);
    try {
      const r = await SA.changeEmail(nuevo.trim(), pass);
      if (r && r.ok && r.verify) {
        setMsg({ ok: true, text: "Te enviamos un enlace a " + nuevo.trim() + ". \xC1brelo para confirmar el cambio de correo." });
        setPass("");
      } else if (r && r.ok) {
        setMsg({ ok: true, text: "Correo actualizado a " + nuevo.trim() + "." });
        setNuevo("");
        setPass("");
        try {
          window.jcmAudit && window.jcmAudit("Correo de la cuenta cambiado a " + nuevo.trim());
        } catch (e) {
        }
      } else {
        setMsg({ ok: false, text: r && r.error || "No se pudo cambiar el correo." });
      }
    } catch (e) {
      setMsg({ ok: false, text: "No se pudo cambiar el correo." });
    }
    setBusy(false);
  }
  const inp = { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 4 } }, "Correo de la cuenta"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12, lineHeight: 1.5 } }, "Correo con el que inicias sesi\xF3n. Cambiarlo requiere ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "tu contrase\xF1a actual"), ". Correo actual: ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, current), "."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Nuevo correo"), /* @__PURE__ */ React.createElement("input", { type: "email", value: nuevo, "data-nocap": "", onChange: (e) => {
    setNuevo(e.target.value);
    setMsg(null);
  }, placeholder: "nuevo@correo.cl", style: inp })), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Tu contrase\xF1a actual"), /* @__PURE__ */ React.createElement("input", { type: "password", value: pass, onChange: (e) => {
    setPass(e.target.value);
    setMsg(null);
  }, onKeyDown: (e) => {
    if (e.key === "Enter") cambiar();
  }, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", style: inp })), msg && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: msg.ok ? "#1F8A5B" : "#C0285A", lineHeight: 1.5 } }, msg.ok ? "\u2713 " : "\u26A0 ", msg.text), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: cambiar }, busy ? "Verificando\u2026" : "Cambiar correo"))));
}
function PaymentDataCard({ T }) {
  const cfg0 = (() => {
    try {
      return window.DB && DB.cfg() || {};
    } catch (e) {
      return {};
    }
  })();
  const [f, setF] = useState({
    pay_banco: cfg0.pay_banco || "",
    pay_titular: cfg0.pay_titular || "",
    pay_rut: cfg0.pay_rut || "",
    pay_tipo: cfg0.pay_tipo || "Cuenta corriente",
    pay_numero: cfg0.pay_numero || "",
    pay_email: cfg0.pay_email || ""
  });
  const [saved, setSaved] = useState(false);
  const up = (k, v) => {
    setF((prev) => ({ ...prev, [k]: v }));
    setSaved(false);
  };
  const rutOk = (() => {
    const r = (f.pay_rut || "").replace(/[^0-9kK]/g, "");
    if (r.length < 2) return null;
    const body = r.slice(0, -1), dvIn = r.slice(-1).toUpperCase();
    if (!/^\d+$/.test(body)) return false;
    let s = 0, m = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      s += parseInt(body[i], 10) * m;
      m = m === 7 ? 2 : m + 1;
    }
    let dv = 11 - s % 11;
    dv = dv === 11 ? "0" : dv === 10 ? "K" : "" + dv;
    return dv === dvIn;
  })();
  function save() {
    try {
      DB.set("config", Object.assign({}, DB.cfg(), {
        pay_banco: (f.pay_banco || "").trim(),
        pay_titular: (f.pay_titular || "").trim(),
        pay_rut: (f.pay_rut || "").trim(),
        pay_tipo: f.pay_tipo,
        pay_numero: (f.pay_numero || "").trim(),
        pay_email: (f.pay_email || "").trim()
      }));
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
      try {
        window.JCSAAS && window.JCSAAS.publishProfile && window.JCSAAS.publishProfile();
      } catch (e) {
      }
    } catch (e) {
    }
  }
  const tipos = ["Cuenta corriente", "Cuenta vista", "Cuenta de ahorro", "Cuenta RUT", "Chequera electr\xF3nica"];
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Datos de pago (transferencia)"), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: save }, saved ? "\u2713 Guardado" : "Guardar")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "0 0 14px", lineHeight: 1.5 } }, "Estos datos aparecen en tu ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "p\xE1gina de reservas"), " para que los pacientes te transfieran. Solo t\xFA, con tu sesi\xF3n iniciada, puedes editarlos. D\xE9jalos en blanco si prefieres coordinar el pago por WhatsApp."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Banco", value: f.pay_banco, onChange: (v) => up("pay_banco", v), placeholder: "Ej: Banco de Chile" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Titular de la cuenta", value: f.pay_titular, onChange: (v) => up("pay_titular", v), placeholder: "Ej: Cl\xEDnica Karenina SpA" }), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "RUT del titular"), /* @__PURE__ */ React.createElement("input", { value: f.pay_rut, onChange: (e) => up("pay_rut", window.jcmFmtRut ? window.jcmFmtRut(e.target.value) : e.target.value), placeholder: "Ej: 76.123.456-7", style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + (rutOk === false ? "#C0285A" : T.line), background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" } }), rutOk === false && /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 11, color: "#C0285A", marginTop: 5 } }, "El d\xEDgito verificador no calza \u2014 revisa que el RUT est\xE9 correcto."), rutOk === true && /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 11, color: "#1F8A5B", marginTop: 5 } }, "RUT v\xE1lido \u2713")), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Tipo de cuenta"), /* @__PURE__ */ React.createElement("select", { value: f.pay_tipo, onChange: (e) => up("pay_tipo", e.target.value), style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" } }, tipos.map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, t)))), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "N\xB0 de cuenta"), /* @__PURE__ */ React.createElement("input", { value: f.pay_numero, onChange: (e) => up("pay_numero", e.target.value), inputMode: "numeric", placeholder: "Ej: 00-123-45678-90", style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" } })), /* @__PURE__ */ React.createElement(AdField, { T, label: "Correo (para el comprobante)", value: f.pay_email, onChange: (v) => up("pay_email", v), placeholder: "Ej: pagos@tuclinica.cl" })));
}
function Row({ T, k, v }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 0", fontFamily: T.sans, fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, k), /* @__PURE__ */ React.createElement("span", { style: { color: T.text, textAlign: "right" } }, v));
}
function ToggleRow({ T, label, def, badge }) {
  const [on, setOn] = useState(def);
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" } }, label, badge && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.accent, background: T.accent + "18", border: "1px solid " + T.accent + "40", borderRadius: 999, padding: "2px 8px" } }, badge)), /* @__PURE__ */ React.createElement(AdSwitch, { T, on, onClick: () => setOn(!on) }));
}
const COLLAB_MSG_DEFAULT = {
  ok: "Hola {nombre}, \xA1gracias por tu inter\xE9s en colaborar con {clinica}! Revisamos tu perfil y nos encantar\xEDa avanzar contigo. Como los procedimientos de medicina est\xE9tica son actos m\xE9dicos, el siguiente paso es una evaluaci\xF3n cl\xEDnica previa para definir el tratamiento y la fecha. \xBFQu\xE9 d\xEDa te acomoda para ver disponibilidad?",
  no: "Hola {nombre}, \xA1gracias por tu inter\xE9s en colaborar con {clinica}! Agradecemos mucho tu propuesta y el tiempo que dedicaste. Por ahora no podremos concretar esta colaboraci\xF3n, pero guardamos tus datos para futuras campa\xF1as. \xA1Te deseamos mucho \xE9xito!"
};
function collabMsg(which) {
  try {
    const v = window.DB && DB.get(which === "ok" ? "collab_msg_ok" : "collab_msg_no");
    if (v != null && v !== "") return v;
  } catch (e) {
  }
  return COLLAB_MSG_DEFAULT[which];
}
const COLLAB_FORM_DEFAULT = {
  title: "Colabora con nosotros",
  intro: "\xBFTe gustar\xEDa colaborar con nuestra cl\xEDnica? Cu\xE9ntanos de ti y de tu comunidad. Revisamos cada propuesta seg\xFAn el perfil, la audiencia y la disponibilidad."
};
function collabForm() {
  try {
    const v = window.DB && DB.get("collab_form");
    if (v && (v.title || v.intro)) return { title: v.title || COLLAB_FORM_DEFAULT.title, intro: v.intro || COLLAB_FORM_DEFAULT.intro };
  } catch (e) {
  }
  return COLLAB_FORM_DEFAULT;
}
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
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
      window.jcmToast && window.jcmToast("Formulario y mensajes guardados.", "ok");
    } catch (e) {
      window.jcmError && window.jcmError("No se pudo guardar", e);
    }
  }
  function reset() {
    setTitle(COLLAB_FORM_DEFAULT.title);
    setIntro(COLLAB_FORM_DEFAULT.intro);
    setOkMsg(COLLAB_MSG_DEFAULT.ok);
    setNoMsg(COLLAB_MSG_DEFAULT.no);
  }
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen((o) => !o), style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "14px 16px", textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, "Personalizar formulario y mensajes"), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", style: { transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), open && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent } }, "Formulario p\xFAblico"), /* @__PURE__ */ React.createElement(AdField, { T, label: "T\xEDtulo del formulario", value: title, onChange: setTitle, placeholder: "Colabora con nosotros" }), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Texto de introducci\xF3n"), /* @__PURE__ */ React.createElement("textarea", { value: intro, onChange: (e) => setIntro(e.target.value), rows: 3, style: ta })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginTop: 4 } }, "Mensajes de respuesta"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, lineHeight: 1.5 } }, "Usa ", /* @__PURE__ */ React.createElement("b", null, "{nombre}"), " y ", /* @__PURE__ */ React.createElement("b", null, "{clinica}"), " donde quieras que aparezca el nombre de la persona o de tu cl\xEDnica."), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 6 } }, "Solicitud aceptada"), /* @__PURE__ */ React.createElement("textarea", { value: okMsg, onChange: (e) => setOkMsg(e.target.value), rows: 4, style: ta })), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#C0285A", marginBottom: 6 } }, "Solicitud rechazada"), /* @__PURE__ */ React.createElement("textarea", { value: noMsg, onChange: (e) => setNoMsg(e.target.value), rows: 4, style: ta })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: reset, style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "9px 13px", cursor: "pointer" } }, "Restaurar plantilla"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: save }, saved ? "\u2713 Guardado" : "Guardar"))));
}
function ColaboracionView({ T }) {
  const D = window.JCDATA;
  const [reqs, setReqs] = useState(() => {
    try {
      return window.DB && DB.get("collabs") || [];
    } catch (e) {
      return [];
    }
  });
  const [openId, setOpenId] = useState(null);
  const [verRech, setVerRech] = useState(false);
  const [statList, setStatList] = useState(null);
  function setStatus(id, st) {
    const nx = reqs.map((r) => r.id === id ? { ...r, status: st } : r);
    setReqs(nx);
    try {
      if (window.DB) DB.set("collabs", nx);
    } catch (e) {
    }
  }
  const openR = reqs.find((r) => r.id === openId);
  const pend = reqs.filter((r) => (r.status || "nueva") === "nueva");
  const rech = reqs.filter((r) => r.status === "rechazada");
  const activas = reqs.filter((r) => r.status !== "rechazada");
  const reqRow = (r) => /* @__PURE__ */ React.createElement("div", { key: r.id, style: { background: T.surface, border: "1px solid " + ((r.status || "nueva") === "nueva" ? T.accent : T.line), borderRadius: 10, padding: "13px 15px", opacity: r.status === "rechazada" ? 0.78 : 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text } }, r.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "2px 8px" } }, r.kind || "Influencer"), (r.status || "nueva") === "nueva" && /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#C0285A" } }), r.status === "aprobada" && /* @__PURE__ */ React.createElement(AdTag, { T, tone: "ok" }, "Aprobada"), r.status === "rechazada" && /* @__PURE__ */ React.createElement(AdTag, { T, tone: "danger" }, "Rechazada")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3 } }, [r.ig && "IG " + r.ig, r.reach && r.reach + " seguidores", r.phone].filter(Boolean).join("  \xB7  "))), /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenId(r.id), style: { background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "7px 13px", cursor: "pointer", fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Ver")));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Colaboraciones", sub: "Postulaciones de gente que quiere colaborar con la cl\xEDnica, recibidas desde el formulario p\xFAblico." }), (() => {
    const url = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.collabLink ? window.JCSAAS.collabLink() : (typeof window !== "undefined" ? window.jcmPubBase ? window.jcmPubBase() : window.location.origin : "") + "/colaborar.html";
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "13px 15px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 200 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 4 } }, "Link del formulario p\xFAblico"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, wordBreak: "break-all" } }, url)), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      try {
        navigator.clipboard.writeText(url);
      } catch (e) {
      }
    }, style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, border: "1px solid " + T.chipBorder, background: T.chipBg, borderRadius: 8, padding: "9px 13px", cursor: "pointer" } }, "Copiar"), /* @__PURE__ */ React.createElement("a", { href: url, target: "_blank", rel: "noopener", style: { fontFamily: T.sans, fontSize: 11.5, color: T.text, textDecoration: "none", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "9px 13px" } }, "Abrir \u2197"));
  })(), /* @__PURE__ */ React.createElement(ColabFormEditor, { T }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { onClick: () => reqs.length && setStatList("all"), style: { cursor: reqs.length ? "pointer" : "default" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: reqs.length, l: "Solicitudes" })), /* @__PURE__ */ React.createElement("div", { onClick: () => pend.length && setStatList("nueva"), style: { cursor: pend.length ? "pointer" : "default" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: pend.length, l: "Sin revisar", accent: pend.length > 0 })), /* @__PURE__ */ React.createElement("div", { onClick: () => reqs.some((r) => r.status === "aprobada") && setStatList("aprobada"), style: { cursor: reqs.some((r) => r.status === "aprobada") ? "pointer" : "default" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: reqs.filter((r) => r.status === "aprobada").length, l: "Aprobadas" })), /* @__PURE__ */ React.createElement("div", { onClick: () => rech.length && setStatList("rechazada"), style: { cursor: rech.length ? "pointer" : "default" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: rech.length, l: "Rechazadas" }))), reqs.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px dashed " + T.line, borderRadius: 10, padding: "40px 24px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 420, margin: "0 auto" } }, "A\xFAn no hay solicitudes. Las solicitudes que env\xEDan influencers y marcas desde la app (Mi cuenta \u2192 ", /* @__PURE__ */ React.createElement("b", null, "Colabora con nosotros"), ") aparecer\xE1n aqu\xED para que las revises.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, activas.map(reqRow)), rech.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 22 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setVerRech((v) => !v), style: { display: "flex", alignItems: "center", gap: 8, width: "100%", background: "none", border: "none", cursor: "pointer", padding: "4px 0", textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute } }, "Rechazadas \xB7 registro (", rech.length, ")"), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, height: 1, background: T.line } }), /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", style: { transform: verRech ? "rotate(180deg)" : "none", transition: "transform .2s" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), verRech && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginBottom: 2 } }, "Solicitudes no concretadas, guardadas para contactarlas en futuras campa\xF1as."), rech.map(reqRow))), statList && (() => {
    const titulos = { all: "Todas las solicitudes", nueva: "Sin revisar", aprobada: "Aprobadas", rechazada: "Rechazadas" };
    const lista = statList === "all" ? reqs : statList === "nueva" ? pend : statList === "aprobada" ? reqs.filter((r) => r.status === "aprobada") : rech;
    return /* @__PURE__ */ React.createElement(AdModal, { T, title: titulos[statList] + " (" + lista.length + ")", onClose: () => setStatList(null) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, lista.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "10px 0" } }, "Sin solicitudes en esta categor\xEDa."), lista.map(reqRow)));
  })(), openR && /* @__PURE__ */ React.createElement(CollabModal, { T, D, r: openR, onClose: () => setOpenId(null), onStatus: (st) => setStatus(openR.id, st) }));
}
function CollabModal({ T, D, r, onClose, onStatus }) {
  const clinic = window.clinicName && window.clinicName() || D && D.brand || "la cl\xEDnica";
  const saludo = "Hola " + (r.name || "") + ", \xA1gracias por tu inter\xE9s en colaborar con " + clinic + "!";
  const fill = (t) => (t || "").replace(/\{nombre\}/g, r.name || "").replace(/\{clinica\}/g, clinic);
  const msgOk = fill(collabMsg("ok"));
  const msgNo = fill(collabMsg("no"));
  function wa(text) {
    const p = (r.phone || "").replace(/\D/g, "");
    window.open("https://wa.me/" + p + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  }
  const igUrl = r.ig ? "https://instagram.com/" + (r.ig || "").replace(/^@/, "") : null;
  const rows = [["Correo", r.email], ["Tel\xE9fono / WhatsApp", r.phone], ["Ciudad o comuna", r.ciudad], ["Instagram", r.ig], ["TikTok", r.tiktok], ["Red principal", r.redPrincipal], ["Seguidores", r.reach], ["Visualizaciones (30 d\xEDas)", r.views], ["Audiencia", r.audiencia], ["Procedimiento de inter\xE9s", r.proc]].filter((x) => x[1]);
  const lblS2 = { fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 4 };
  const cBtn = (bg, bd, col) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: T.sans, fontSize: 12, fontWeight: 600, textDecoration: "none", border: "1px solid " + bd, background: bg, color: col, borderRadius: 9, padding: "11px 14px", cursor: "pointer" });
  const waSvg = /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" }));
  const igSvg = /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4" }), /* @__PURE__ */ React.createElement("circle", { cx: "17.5", cy: "6.5", r: "1", fill: "currentColor", stroke: "none" }));
  const tpl = (titulo, texto, col, onClick) => /* @__PURE__ */ React.createElement("div", { style: { border: "1px solid " + T.line, borderRadius: 11, padding: 13, background: T.surface, display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 7 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: col } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text } }, titulo)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, marginBottom: 11, flex: 1 } }, texto), /* @__PURE__ */ React.createElement("button", { onClick, style: cBtn(col, col, "#fff") }, waSvg, " Enviar por WhatsApp"));
  return /* @__PURE__ */ React.createElement(AdModal, { T, wide: true, title: r.name || "Colaboraci\xF3n", onClose }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "3px 9px" } }, r.kind || "Colaboraci\xF3n"), (r.status || "nueva") === "nueva" ? /* @__PURE__ */ React.createElement(AdTag, { T, tone: "warn" }, "Sin revisar") : r.status === "aprobada" ? /* @__PURE__ */ React.createElement(AdTag, { T, tone: "ok" }, "Aprobada") : /* @__PURE__ */ React.createElement(AdTag, { T, tone: "danger" }, "Rechazada")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 18px", marginBottom: 16 } }, rows.map(([k, v]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: lblS2 }, k), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, wordBreak: "break-word" } }, v)))), r.ofrece && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: lblS2 }, "Qu\xE9 ofrece a cambio"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.6 } }, r.ofrece)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 20 } }, igUrl && /* @__PURE__ */ React.createElement("a", { href: igUrl, target: "_blank", rel: "noopener", style: cBtn(T.surface, T.line, T.accent) }, igSvg, " Ver Instagram"), /* @__PURE__ */ React.createElement("button", { onClick: () => wa(saludo), style: cBtn(T.surface, "#1F8A5B", "#1F8A5B") }, waSvg, " Contactar por WhatsApp")), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid " + T.line, paddingTop: 16 } }, /* @__PURE__ */ React.createElement("div", { style: lblS2 }, "Mensajes predeterminados"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, fontStyle: "italic", lineHeight: 1.5, margin: "6px 0 13px" } }, 'Saludo base: "', saludo, '"'), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, tpl("Solicitud aceptada", msgOk, "#1F8A5B", () => {
    onStatus("aprobada");
    wa(msgOk);
  }), tpl("Solicitud rechazada", msgNo, "#C0285A", () => {
    onStatus("rechazada");
    wa(msgNo);
  })), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 12, lineHeight: 1.5 } }, "Al enviar se abre WhatsApp con el mensaje listo y la solicitud queda marcada como aceptada o rechazada. Si la persona no dej\xF3 tel\xE9fono, WhatsApp te dejar\xE1 elegir el contacto con el texto ya escrito.")));
}
function clinVal(c, key) {
  if (!c) return "";
  const sel = c[key + "Sel"] || [];
  const txt = c[key] || "";
  return [sel.join(", "), txt].filter(Boolean).join(sel.length && txt ? " \xB7 " : "");
}
function sumUnits(txt) {
  if (!txt) return 0;
  const body = String(txt).replace(/total\s*u\s*:?.*$/is, "");
  let sum = 0, m;
  const re = /(\d+)\s*u\b/gi;
  while (m = re.exec(body)) sum += parseInt(m[1], 10);
  return sum;
}
const FE_TIPOS = [["texto", "Texto corto", "Una l\xEDnea: nombre, RUT\u2026"], ["area", "Texto largo", "Varias l\xEDneas: anamnesis, notas\u2026"], ["numero", "N\xFAmero", "Edad, peso, dosis\u2026"], ["selector", "Selector", "Elegir de una lista"], ["fecha", "Fecha", "Selector de calendario"], ["email", "Email", "Correo electr\xF3nico"], ["imagen", "Imagen", "Subir foto cl\xEDnica"], ["pdf", "PDF", "Adjuntar documento"]];
const FE_ICON = {
  texto: "M4 7h16M4 12h9",
  area: "M4 6h16M4 11h16M4 16h10",
  numero: "M9 7v10M15 7v10M6 10h12M6 14h12",
  selector: "M4 6h16M4 12h16M4 18h10M20 15l-3 3-3-3",
  fecha: "M3 5h18v16H3zM3 10h18M8 3v4M16 3v4",
  email: "M3 6h18v12H3zM3 7l9 6 9-6",
  imagen: "M3 5h18v14H3zM7 11l2.5 2.5L13 10l6 7",
  pdf: "M6 2h9l4 4v16H6zM14 2v4h4"
};
function FeIcon({ t, c, s }) {
  return /* @__PURE__ */ React.createElement("svg", { width: s || 15, height: s || 15, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: FE_ICON[t] || FE_ICON.texto }));
}
function loadFichaTpls() {
  try {
    const v = window.DB && window.DB.get("ficha_templates");
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}
function saveFichaTplsDB(v) {
  try {
    if (window.DB) window.DB.set("ficha_templates", v);
  } catch (e) {
  }
}
function FichaEditorView({ T }) {
  const [tpls, setTpls] = useState(loadFichaTpls);
  const [selId, setSelId] = useState(tpls[0] ? tpls[0].id : null);
  const [dragI, setDragI] = useState(null);
  const [expandId, setExpandId] = useState(null);
  function persist(n) {
    setTpls(n);
    saveFichaTplsDB(n);
  }
  function addTpl() {
    const t = { id: "ft" + Date.now(), name: "Nueva plantilla", fields: [] };
    const n = [...tpls, t];
    persist(n);
    setSelId(t.id);
  }
  async function delTpl(id) {
    if (!await (window.jcmConfirm || window.confirm)("\xBFEliminar esta plantilla de ficha?", { danger: true })) return;
    const n = tpls.filter((t) => t.id !== id);
    persist(n);
    if (selId === id) setSelId(n[0] ? n[0].id : null);
  }
  const sel = tpls.find((t) => t.id === selId) || null;
  function updSel(patch) {
    persist(tpls.map((t) => t.id === selId ? { ...t, ...patch } : t));
  }
  function addField(type) {
    const nf = { id: "f" + Date.now(), type, label: "", required: false, options: "", placeholder: "" };
    updSel({ fields: [...sel.fields || [], nf] });
    setExpandId(nf.id);
  }
  function updField(fid, patch) {
    updSel({ fields: sel.fields.map((f) => f.id === fid ? { ...f, ...patch } : f) });
  }
  function delField(fid) {
    updSel({ fields: sel.fields.filter((f) => f.id !== fid) });
  }
  function moveField(i, dir) {
    const a = sel.fields.slice();
    const j = i + dir;
    if (j < 0 || j >= a.length) return;
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
    updSel({ fields: a });
  }
  function moveFieldTo(from, to) {
    if (from == null || to == null || from === to) return;
    const a = sel.fields.slice();
    const m = a.splice(from, 1)[0];
    a.splice(to, 0, m);
    updSel({ fields: a });
  }
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 };
  const inp = { width: "100%", padding: "9px 11px", borderRadius: 6, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none", boxSizing: "border-box" };
  const tipoLabel = (t) => (FE_TIPOS.find((x) => x[0] === t) || [, t])[1];
  const previewInput = (f) => {
    const pInp = { ...inp, background: T.surface, cursor: "default" };
    const opts = (f.options || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (f.type === "area") return /* @__PURE__ */ React.createElement("div", { style: { ...pInp, minHeight: 46, color: T.textFaint, display: "flex", alignItems: "flex-start" } }, f.placeholder || "Escribe aqu\xED\u2026");
    if (f.type === "selector") return /* @__PURE__ */ React.createElement("div", { style: { ...pInp, display: "flex", justifyContent: "space-between", alignItems: "center", color: opts[0] ? T.text : T.textFaint } }, opts[0] || "Elegir\u2026", /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" })));
    if (f.type === "imagen" || f.type === "pdf") return /* @__PURE__ */ React.createElement("div", { style: { ...pInp, border: "1px dashed " + T.line, color: T.textFaint, display: "flex", alignItems: "center", gap: 8, padding: "14px 11px" } }, /* @__PURE__ */ React.createElement(FeIcon, { t: f.type, c: T.accent, s: 16 }), f.type === "imagen" ? "Subir imagen" : "Adjuntar PDF");
    if (f.type === "fecha") return /* @__PURE__ */ React.createElement("div", { style: { ...pInp, display: "flex", justifyContent: "space-between", alignItems: "center", color: T.textFaint } }, "dd / mm / aaaa", /* @__PURE__ */ React.createElement(FeIcon, { t: "fecha", c: T.textMute, s: 15 }));
    return /* @__PURE__ */ React.createElement("div", { style: { ...pInp, color: T.textFaint } }, f.placeholder || (f.type === "email" ? "correo@ejemplo.com" : f.type === "numero" ? "0" : "Escribe aqu\xED\u2026"));
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Editor de Fichas", sub: "Arma tu plantilla a la izquierda y m\xEDrala en vivo a la derecha" }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: addTpl }, "+ Nueva plantilla")), tpls.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px dashed " + T.line, borderRadius: 14, padding: "44px 24px", textAlign: "center", marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 54, height: 54, borderRadius: 15, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ React.createElement("path", { d: "M14 2v6h6M9 13h6M9 17h4" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: T.text, marginBottom: 6 } }, "Crea tu primera plantilla de ficha"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 460, margin: "0 auto 18px" } }, "Agrega campos (texto, n\xFAmero, selector, imagen, PDF\u2026) y mira c\xF3mo queda la ficha en tiempo real, lista para usar con tus pacientes."), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: addTpl }, "+ Crear primera plantilla")) : /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, alignItems: "start", marginTop: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, margin: "2px 2px 4px" } }, "Mis plantillas"), tpls.map((t) => /* @__PURE__ */ React.createElement("button", { key: t.id, onClick: () => setSelId(t.id), style: { textAlign: "left", padding: "10px 12px", borderRadius: 9, cursor: "pointer", border: "1px solid " + (selId === t.id ? T.accent : T.line), background: selId === t.id ? T.accent + "12" : T.surface, color: T.text, fontFamily: T.sans, fontSize: 12.5 } }, t.name || "Sin nombre", /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 2 } }, (t.fields || []).length, " campo", (t.fields || []).length === 1 ? "" : "s")))), sel && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 16, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "15px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, fontWeight: 600, marginBottom: 10 } }, "\u270F\uFE0F Editas aqu\xED"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("input", { value: sel.name, onChange: (e) => updSel({ name: e.target.value }), placeholder: "Nombre de la plantilla", style: { ...inp, fontWeight: 600 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => delTpl(sel.id), title: "Eliminar plantilla", style: { background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "0 10px", cursor: "pointer", color: T.textFaint, display: "flex", alignItems: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, (sel.fields || []).length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint, textAlign: "center", padding: "14px 0", border: "1px dashed " + T.line, borderRadius: 9 } }, "A\xFAn sin campos. Agrega el primero abajo. \u{1F447}"), (sel.fields || []).map((f, i) => {
    const openOpts = expandId === f.id;
    return /* @__PURE__ */ React.createElement("div", { key: f.id, onDragOver: (e) => e.preventDefault(), onDrop: () => {
      moveFieldTo(dragI, i);
      setDragI(null);
    }, style: { background: T.bg, border: "1px solid " + (dragI != null && dragI !== i ? T.accent + "88" : T.line), borderRadius: 9, padding: "10px 11px", transition: "border-color .15s" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { draggable: true, onDragStart: () => setDragI(i), onDragEnd: () => setDragI(null), title: "Arrastra para reordenar", style: { cursor: "grab", color: T.textFaint, fontSize: 15, lineHeight: 1, userSelect: "none", padding: "0 2px" } }, "\u283F"), /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 26, height: 26, borderRadius: 7, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(FeIcon, { t: f.type, c: T.accent, s: 14 })), /* @__PURE__ */ React.createElement("input", { value: f.label, onChange: (e) => updField(f.id, { label: e.target.value }), placeholder: "Etiqueta (" + tipoLabel(f.type) + ")", style: { ...inp, flex: 1, marginBottom: 0, border: "none", background: "transparent", padding: "4px 2px", fontWeight: 600 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => setExpandId(openOpts ? null : f.id), title: "Opciones del campo", style: { background: "none", border: "none", cursor: "pointer", color: openOpts ? T.accent : T.textMute, padding: 3, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M12 3v3M12 18v3M3 12h3M18 12h3" }))), /* @__PURE__ */ React.createElement("button", { onClick: () => moveField(i, -1), disabled: i === 0, title: "Subir", style: { background: "none", border: "none", cursor: i === 0 ? "default" : "pointer", color: i === 0 ? T.textFaint : T.textMute, padding: 2, opacity: i === 0 ? 0.4 : 1 } }, "\u25B2"), /* @__PURE__ */ React.createElement("button", { onClick: () => moveField(i, 1), disabled: i === sel.fields.length - 1, title: "Bajar", style: { background: "none", border: "none", cursor: i === sel.fields.length - 1 ? "default" : "pointer", color: T.textMute, padding: 2, opacity: i === sel.fields.length - 1 ? 0.4 : 1 } }, "\u25BC"), /* @__PURE__ */ React.createElement("button", { onClick: () => delField(f.id), title: "Eliminar campo", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 2, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), openOpts && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 9, paddingTop: 9, borderTop: "1px solid " + T.lineSoft, display: "flex", flexDirection: "column", gap: 7 } }, f.type === "selector" && /* @__PURE__ */ React.createElement("input", { value: f.options, onChange: (e) => updField(f.id, { options: e.target.value }), placeholder: "Opciones separadas por coma (ej: S\xED, No, A veces)", style: inp }), (f.type === "texto" || f.type === "area" || f.type === "numero" || f.type === "email") && /* @__PURE__ */ React.createElement("input", { value: f.placeholder, onChange: (e) => updField(f.id, { placeholder: e.target.value }), placeholder: "Texto de ejemplo (placeholder)", style: inp }), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: !!f.required, onChange: (e) => updField(f.id, { required: e.target.checked }) }), " Campo obligatorio")));
  })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Agregar campo"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } }, FE_TIPOS.map(([k, l, d]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => addField(k), title: d, style: { display: "flex", alignItems: "center", gap: 8, fontFamily: T.sans, fontSize: 11.5, padding: "9px 11px", borderRadius: 9, cursor: "pointer", border: "1px solid " + T.line, background: "transparent", color: T.text, textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 24, height: 24, borderRadius: 6, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(FeIcon, { t: k, c: T.accent, s: 13 })), /* @__PURE__ */ React.createElement("span", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, l), /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontSize: 9.5, color: T.textFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, d))))))), /* @__PURE__ */ React.createElement("div", { style: { position: "sticky", top: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, fontWeight: 600, marginBottom: 8 } }, "\u{1F441}\uFE0F As\xED se ver\xE1 \xB7 en vivo"), /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(180deg," + (T.surface2 || T.surface) + ", " + T.surface + ")", border: "1px solid " + T.line, borderRadius: 14, padding: "20px 20px", boxShadow: "0 14px 40px -28px rgba(0,0,0,.4)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, marginBottom: 4 } }, "Ficha cl\xEDnica"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 21, color: T.text, marginBottom: 2 } }, sel.name || "Plantilla de ficha"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid " + T.lineSoft } }, "Paciente \xB7 Fecha de atenci\xF3n"), (sel.fields || []).length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0", textAlign: "center" } }, "Los campos que agregues aparecer\xE1n aqu\xED al instante.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, (sel.fields || []).map((f) => /* @__PURE__ */ React.createElement("div", { key: f.id }, /* @__PURE__ */ React.createElement("span", { style: lbl }, f.label || /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint, textTransform: "none", letterSpacing: 0 } }, "Campo sin nombre"), f.required && /* @__PURE__ */ React.createElement("span", { style: { color: "#C0285A" } }, " *")), previewInput(f)))))))));
}
const FICHA_TIPOS = [["general", "Ficha general"], ["facial", "Facial"], ["corporal", "Corporal"]];
const FICHA_ZONAS_FACIAL = ["Frente", "Entrecejo", "Patas de gallo", "Ojeras", "P\xF3mulos", "Surcos nasogenianos", "Labios", "C\xF3digo de barras", "Ment\xF3n", "L\xEDnea mandibular", "Cuello"];
const FICHA_ZONAS_CORPORAL = ["Abdomen", "Flancos", "Espalda", "Brazos", "Muslos", "Gl\xFAteos", "Papada", "Rodillas", "Pantorrillas", "Dorso de manos"];
const FICHA_FACE_POS = { "Frente": [100, 42], "Entrecejo": [100, 74], "Patas de gallo": [150, 86], "Ojeras": [124, 100], "P\xF3mulos": [142, 120], "Surcos nasogenianos": [120, 138], "C\xF3digo de barras": [100, 150], "Labios": [100, 166], "Ment\xF3n": [100, 190], "L\xEDnea mandibular": [58, 172], "Cuello": [100, 222] };
const FICHA_BODY_POS = { "Papada": [80, 40], "Espalda": [80, 96], "Brazos": [34, 116], "Flancos": [54, 130], "Abdomen": [80, 134], "Gl\xFAteos": [100, 170], "Muslos": [62, 196], "Dorso de manos": [27, 166], "Rodillas": [64, 232], "Pantorrillas": [64, 256] };
function FichaZoneMap({ T, kind, active, onToggle }) {
  const facial = kind === "facial";
  const pos = facial ? FICHA_FACE_POS : FICHA_BODY_POS;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("svg", { viewBox: facial ? "0 0 200 240" : "0 0 160 280", style: { width: facial ? 170 : 130, maxWidth: "100%", height: "auto" } }, facial ? /* @__PURE__ */ React.createElement("g", { fill: "none", stroke: T.line, strokeWidth: "1.5" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "100", cy: "115", rx: "62", ry: "82", fill: T.surface2 || T.surface }), /* @__PURE__ */ React.createElement("path", { d: "M68 92q30 -20 64 0" }), /* @__PURE__ */ React.createElement("path", { d: "M88 150q12 10 24 0" }), /* @__PURE__ */ React.createElement("line", { x1: "100", y1: "196", x2: "100", y2: "232" })) : /* @__PURE__ */ React.createElement("g", { fill: T.surface2 || T.surface, stroke: T.line, strokeWidth: "1.5" }, /* @__PURE__ */ React.createElement("circle", { cx: "80", cy: "26", r: "17" }), /* @__PURE__ */ React.createElement("path", { d: "M56 48h48l9 70-13 6 -5 58 4 62h-17l-6-58h-4l-6 58H53l4-62-5-58-13-6z" })), Object.keys(pos).map((z) => {
    const p = pos[z];
    const on = active(z);
    return /* @__PURE__ */ React.createElement("g", { key: z, style: { cursor: "pointer" }, onClick: () => onToggle(z) }, /* @__PURE__ */ React.createElement("circle", { cx: p[0], cy: p[1], r: "8.5", fill: on ? T.accent : T.surface, stroke: on ? T.accent : T.textMute, strokeWidth: "1.5", opacity: on ? 1 : 0.85 }), on && /* @__PURE__ */ React.createElement("path", { d: "M" + (p[0] - 3.5) + " " + p[1] + "l2.5 2.5 4.5 -5", fill: "none", stroke: T.onAccent || "#fff", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ React.createElement("title", null, z));
  })));
}
function calcIMC(peso, talla) {
  const p = parseFloat(peso), t = parseFloat(talla) / 100;
  if (!p || !t || t <= 0) return null;
  const imc = p / (t * t);
  let cat = "Normal", col = "#1F8A5B";
  if (imc < 18.5) {
    cat = "Bajo peso";
    col = "#B8860B";
  } else if (imc < 25) {
    cat = "Normal";
    col = "#1F8A5B";
  } else if (imc < 30) {
    cat = "Sobrepeso";
    col = "#B8860B";
  } else {
    cat = "Obesidad";
    col = "#C0285A";
  }
  return { v: imc.toFixed(1), cat, col };
}
function FichaClinicaForm({ T, patient, updatePatient }) {
  const [f, setF] = useState(patient.clinica || {});
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setF(patient.clinica || {});
    setSaved(false);
  }, [patient.id]);
  const setVal = (k, v) => {
    setF((prev) => ({ ...prev, [k]: v }));
    setSaved(false);
  };
  const tokenToggle = (k, tok) => {
    setF((prev) => {
      const cur = (prev[k] || "").split(",").map((s) => s.trim()).filter(Boolean);
      const i = cur.indexOf(tok);
      if (i >= 0) cur.splice(i, 1);
      else cur.push(tok);
      return { ...prev, [k]: cur.join(", ") };
    });
    setSaved(false);
  };
  const chipActive = (k, tok) => (f[k] || "").split(",").map((s) => s.trim()).includes(tok);
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = (extra) => ({ width: "100%", padding: "10px 11px", borderRadius: 4, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none", ...extra || {} });
  const card = { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px", marginBottom: 14 };
  const head = { fontFamily: T.serif, fontSize: 18, color: T.text, marginBottom: 14 };
  const chipBtn = (on) => ({ fontFamily: T.sans, fontSize: 11.5, padding: "7px 12px", borderRadius: 999, cursor: "pointer", background: on ? T.accent : T.bg, color: on ? T.onAccent || "#fff" : T.textMute, border: "1px solid " + (on ? T.accent : T.line) });
  const onNoRefiere = (k) => (e) => {
    if (e.key === " " && (f[k] || "").trim().toLowerCase() === "n") {
      e.preventDefault();
      setVal(k, "No refiere");
    }
  };
  const text = (k, ph, only) => /* @__PURE__ */ React.createElement("input", { value: f[k] || "", onChange: (e) => setVal(k, e.target.value), onKeyDown: onNoRefiere(k), placeholder: ph || "Escribe aqu\xED\u2026", "data-only": only, style: inp() });
  const sel = (k, options, ph) => /* @__PURE__ */ React.createElement("select", { value: f[k] || "", onChange: (e) => setVal(k, e.target.value), style: inp() }, /* @__PURE__ */ React.createElement("option", { value: "" }, ph || "\u2014 Selecciona \u2014"), options.map((o) => /* @__PURE__ */ React.createElement("option", { key: o, value: o }, o)));
  const chips = (k, options) => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 } }, options.map((o) => /* @__PURE__ */ React.createElement("button", { key: o, type: "button", onClick: () => tokenToggle(k, o), style: chipBtn(chipActive(k, o)) }, o)), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setVal(k, "No refiere"), style: chipBtn((f[k] || "").trim().toLowerCase() === "no refiere") }, "No refiere"));
  const field = (label, node) => /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, label), node);
  const nrBtn = (k) => /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setVal(k, "No refiere"), style: { ...chipBtn((f[k] || "").trim().toLowerCase() === "no refiere"), fontSize: 10.5, padding: "5px 11px", marginTop: 8 } }, "No refiere");
  const nrField = (label, k, ph, only) => /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, label), text(k, ph, only), nrBtn(k));
  const chipField = (label, k, options, ph) => /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, label), text(k, ph), chips(k, options));
  const tipo = f.tipo || "general";
  const imc = calcIMC(f.peso, f.talla);
  const showEstetica = tipo === "general" || tipo === "facial";
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Ficha cl\xEDnica"), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: () => {
    try {
      updatePatient(patient.id, { clinica: f });
      setSaved(true);
    } catch (e) {
      if (window.jcmError) window.jcmError("Error al guardar la ficha. Intenta de nuevo.");
    }
  } }, saved ? "\u2713 Guardada" : "Guardar ficha")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 } }, FICHA_TIPOS.map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, type: "button", onClick: () => setVal("tipo", k), style: { fontFamily: T.sans, fontSize: 12, fontWeight: tipo === k ? 600 : 500, padding: "8px 14px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (tipo === k ? T.accent : T.line), background: tipo === k ? T.accent : "transparent", color: tipo === k ? T.onAccent || "#fff" : T.textMute } }, l))), (tipo === "medgeneral" || tipo === "corporal") && /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: head }, "Signos vitales y antropometr\xEDa"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 } }, field("Peso (kg)", /* @__PURE__ */ React.createElement("input", { value: f.peso || "", onChange: (e) => setVal("peso", e.target.value.replace(/[^0-9.]/g, "")), inputMode: "decimal", placeholder: "0", style: inp() })), field("Talla (cm)", /* @__PURE__ */ React.createElement("input", { value: f.talla || "", onChange: (e) => setVal("talla", e.target.value.replace(/[^0-9.]/g, "")), inputMode: "decimal", placeholder: "0", style: inp() })), field("IMC (autom\xE1tico)", /* @__PURE__ */ React.createElement("div", { style: inp({ display: "flex", alignItems: "center", justifyContent: "space-between", background: T.surface2 || T.bg }) }, imc ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { color: T.text, fontWeight: 600 } }, imc.v), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: imc.col } }, imc.cat)) : /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, "\u2014"))), field("Presi\xF3n arterial", /* @__PURE__ */ React.createElement("input", { value: f.presion || "", onChange: (e) => setVal("presion", e.target.value), placeholder: "120/80 mmHg", style: inp() })), field("Frec. card\xEDaca (lpm)", /* @__PURE__ */ React.createElement("input", { value: f.fc || "", onChange: (e) => setVal("fc", e.target.value.replace(/\D/g, "")), inputMode: "numeric", placeholder: "0", style: inp() })), field("Frec. respiratoria (rpm)", /* @__PURE__ */ React.createElement("input", { value: f.fr || "", onChange: (e) => setVal("fr", e.target.value.replace(/\D/g, "")), inputMode: "numeric", placeholder: "0", style: inp() })), field("Temperatura (\xB0C)", /* @__PURE__ */ React.createElement("input", { value: f.temp || "", onChange: (e) => setVal("temp", e.target.value.replace(/[^0-9.]/g, "")), inputMode: "decimal", placeholder: "36.5", style: inp() })), field("Saturaci\xF3n O\u2082 (%)", /* @__PURE__ */ React.createElement("input", { value: f.sato2 || "", onChange: (e) => setVal("sato2", e.target.value.replace(/\D/g, "")), inputMode: "numeric", placeholder: "98", style: inp() })), field("Glicemia (mg/dL)", /* @__PURE__ */ React.createElement("input", { value: f.glicemia || "", onChange: (e) => setVal("glicemia", e.target.value.replace(/\D/g, "")), inputMode: "numeric", placeholder: "\u2014", style: inp() }))), tipo === "medgeneral" && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Motivo de consulta"), /* @__PURE__ */ React.createElement("textarea", { value: f.motivo || "", onChange: (e) => setVal("motivo", e.target.value), rows: 2, placeholder: "\u2014", style: inp({ resize: "vertical" }) })), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Diagn\xF3stico / indicaciones"), /* @__PURE__ */ React.createElement("textarea", { value: f.diagnostico || "", onChange: (e) => setVal("diagnostico", e.target.value), rows: 2, placeholder: "\u2014", style: inp({ resize: "vertical" }) })))), tipo === "facial" && /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: head }, "Zonas faciales a tratar"), /* @__PURE__ */ React.createElement(FichaZoneMap, { T, kind: "facial", active: (t) => chipActive("zonasFacial", t), onToggle: (t) => tokenToggle("zonasFacial", t) }), chips("zonasFacial", FICHA_ZONAS_FACIAL), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Observaciones de zonas"), text("zonasFacialNota", "Detalle por zona\u2026"))), tipo === "corporal" && /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: head }, "Zonas corporales a tratar"), /* @__PURE__ */ React.createElement(FichaZoneMap, { T, kind: "corporal", active: (t) => chipActive("zonasCorporal", t), onToggle: (t) => tokenToggle("zonasCorporal", t) }), chips("zonasCorporal", FICHA_ZONAS_CORPORAL), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Observaciones de zonas"), text("zonasCorporalNota", "Detalle por zona\u2026"))), /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: head }, "Antecedentes m\xE9dicos"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 } }, chipField("Antecedentes m\xF3rbidos", "morbidos", ["Hipertensi\xF3n", "Hipotiroidismo", "Diabetes", "Asma", "Ros\xE1cea"], "Otro antecedente\u2026"), nrField("Alergias", "alergias", "Ej. Penicilina, AINEs\u2026", "alpha"), nrField("Antecedentes quir\xFArgicos", "quirurgicos", "Cirug\xEDas previas\u2026"), chipField("Procedimientos est\xE9ticos previos", "esteticos", ["Toxina botul\xEDnica", "Rinomodelaci\xF3n", "Sculptra", "Radiesse", "Mesoterapia", "Quemadores de grasa"], "Producto / detalle (ej. mesoterapia con\u2026)"), nrField("Hospitalizaciones", "hospital", "\u2014"), nrField("Medicamentos de uso diario", "medicamentos", "\u2014"))), showEstetica && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: head }, "Piel y factores de riesgo"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 } }, nrField("Cicatriz hipertr\xF3fica / queloides", "cicatriz", "\u2014"), chipField("Patolog\xEDa d\xE9rmica", "dermica", ["Dermatitis at\xF3pica", "Ros\xE1cea", "Sensibilidad indeterminada"], "Otra patolog\xEDa\u2026"), nrField("Problemas de coagulaci\xF3n", "coagulacion", "\u2014"), nrField("Enfermedades autoinmunes", "autoinmune", "\u2014"), nrField("Historial de herpes labial", "herpes", "\u2014"), field("Exposici\xF3n solar", sel("expsolar", ["Alta", "Media", "Baja", "No refiere"])), field("Uso de bloqueador", sel("bloqueador", ["Diario", "2 veces al d\xEDa", "Cada 4 horas", "No uso", "No refiere"])))), /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: head }, "H\xE1bitos"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 } }, field("Tabaco", /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: f.tabaco || "", onChange: (e) => setVal("tabaco", e.target.value.replace(/\D/g, "").slice(0, 3)), "data-only": "num", inputMode: "numeric", placeholder: "0", style: inp({ width: 70, textAlign: "center" }) }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, whiteSpace: "nowrap" } }, "cigarros al d\xEDa"))), field("Alcohol", sel("alcohol", ["Diario", "Fines de semana", "Social", "Nunca"])), field("Drogas", sel("drogas", ["Ninguna", "Marihuana", "Coca\xEDna", "Benzodiacepinas", "Otra"])), field("Nivel de consumo (drogas)", sel("drogasNivel", ["Recreativo", "3x semana", "Diario"])), field("Consumo de agua diario", sel("agua", ["1 lt", "1\u20132 lt", "+2 lt"])), field("Actividad f\xEDsica", sel("actividad", ["Sedentario", "1\u20133x semana", "3\u20135x semana", "Diario"])), field("Embarazo / lactancia", /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setVal("embarazo", f.embarazo === "Niega" ? "" : "Niega"), style: chipBtn(f.embarazo === "Niega") }, "Niega"), /* @__PURE__ */ React.createElement("input", { value: f.embarazo === "Niega" ? "" : f.embarazo || "", onChange: (e) => setVal("embarazo", e.target.value), placeholder: "Semanas / detalle si aplica\u2026", style: inp({ flex: 1 }) }))), field("Alimentaci\xF3n", sel("alimentacion", ["Balanceada", "No balanceada", "Hipocal\xF3rica", "Hipercal\xF3rica", "Hiperproteica"]))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Cuidados de la piel en casa"), chips("skincare", ["Bloqueador", "S\xE9rum", "Crema", "Contorno de ojos", "Vitamina C"]), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, text("skincare", "Otros productos\u2026")))), /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: head }, "Evaluaci\xF3n y plan"), [["evaluacion", "Evaluaci\xF3n facial"], ["plan", "Tratamientos recomendados"]].map(([k, label]) => {
    const isPlan = k === "plan";
    const totalU = isPlan ? sumUnits(f.plan) : 0;
    const onCh = isPlan ? (e) => {
      let v = e.target.value;
      v = v.replace(/(total\s*u\s*:?[ \t]*)(\d*)([ \t]*)$/i, (_m, pre) => pre + sumUnits(v));
      setVal(k, v);
    } : (e) => setVal(k, e.target.value);
    return /* @__PURE__ */ React.createElement("label", { key: k, style: { display: "block", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, label), /* @__PURE__ */ React.createElement("textarea", { value: f[k] || "", onChange: onCh, rows: 3, placeholder: isPlan ? 'Ej: 20u frontal, 10u procerus\u2026 escribe "Total U:" y se suma solo' : "\u2014", style: inp({ resize: "vertical" }) }), isPlan && totalU > 0 && /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", marginTop: 7, fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: T.accent, background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + (T.accent + "44"), borderRadius: 999, padding: "4px 11px" } }, "\u03A3 Total detectado: ", totalU, " U"));
  }))), (() => {
    const fts = typeof loadFichaTpls === "function" ? loadFichaTpls() : [];
    if (!fts.length) return null;
    const selT = f.cfTpl || fts[0].id;
    const tpl = fts.find((t) => t.id === selT) || fts[0];
    const fieldInput = (fld) => {
      const key = "cf_" + fld.id;
      const opts = (fld.options || "").split(",").map((s) => s.trim()).filter(Boolean);
      if (fld.type === "area") return /* @__PURE__ */ React.createElement("textarea", { value: f[key] || "", onChange: (e) => setVal(key, e.target.value), rows: 2, placeholder: fld.placeholder, style: inp({ resize: "vertical" }) });
      if (fld.type === "selector") return /* @__PURE__ */ React.createElement("select", { value: f[key] || "", onChange: (e) => setVal(key, e.target.value), style: inp() }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Selecciona \u2014"), opts.map((o) => /* @__PURE__ */ React.createElement("option", { key: o, value: o }, o)));
      if (fld.type === "imagen" || fld.type === "pdf") return /* @__PURE__ */ React.createElement("div", { style: inp({ color: T.textFaint }) }, fld.type === "imagen" ? "\u{1F4F7} Adjuntar imagen (pr\xF3ximamente)" : "\u{1F4C4} Adjuntar PDF (pr\xF3ximamente)");
      return /* @__PURE__ */ React.createElement("input", { value: f[key] || "", onChange: (e) => setVal(key, e.target.value), type: fld.type === "numero" ? "number" : fld.type === "fecha" ? "date" : fld.type === "email" ? "email" : "text", placeholder: fld.placeholder, style: inp() });
    };
    return /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: head }, "Campos personalizados"), fts.length > 1 && /* @__PURE__ */ React.createElement("select", { value: selT, onChange: (e) => setVal("cfTpl", e.target.value), style: inp({ marginBottom: 14 }) }, fts.map((t) => /* @__PURE__ */ React.createElement("option", { key: t.id, value: t.id }, t.name))), (tpl.fields || []).length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Esta plantilla no tiene campos. Agr\xE9galos en Editor de Fichas.") : /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 } }, (tpl.fields || []).map((fld) => /* @__PURE__ */ React.createElement("label", { key: fld.id, style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, fld.label || "Campo", fld.required && /* @__PURE__ */ React.createElement("span", { style: { color: "#C0285A" } }, " *")), fieldInput(fld)))));
  })(), patient.history && patient.history.length > 0 && /* @__PURE__ */ React.createElement("div", { style: card }, /* @__PURE__ */ React.createElement("div", { style: head }, "Historial de la ficha \xB7 ", patient.history.length, " sesi\xF3n", patient.history.length === 1 ? "" : "es"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, patient.history.map((h, i) => {
    const ver = patient.history.length - i;
    const last = i === patient.history.length - 1;
    return /* @__PURE__ */ React.createElement("div", { key: h.id || i, style: { position: "relative", paddingLeft: 24, paddingBottom: last ? 0 : 16 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 0, top: 3, width: 11, height: 11, borderRadius: "50%", background: T.accent, border: "2px solid " + T.surface } }), !last && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 5, top: 14, bottom: 0, width: 1.5, background: T.line } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9, fontWeight: 600, letterSpacing: ".06em", color: T.accent, background: T.accentSoft || "rgba(84,112,127,.12)", borderRadius: 999, padding: "2px 8px" } }, "v", ver), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, h.proc || "Sesi\xF3n"), h.cobro > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: "#1F8A5B" } }, window.JCDATA ? window.JCDATA.fmt(h.cobro) : "$" + h.cobro)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, h.date || "", h.prof ? " \xB7 " + h.prof : ""));
  }))));
}
function SecHead({ T, title, sub }) {
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 32, letterSpacing: "-.02em", color: T.text, lineHeight: 1 } }, title), sub && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 6 } }, sub));
}
function AdSwitch({ T, on, onClick }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, style: { width: 42, height: 25, borderRadius: 999, border: "none", cursor: "pointer", background: on ? "#1F8A5B" : T.surface2, position: "relative", transition: "background .25s", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 3, left: on ? 20 : 3, width: 19, height: 19, borderRadius: "50%", background: "#fff", transition: "left .25s " + T.ease, boxShadow: "0 1px 3px rgba(0,0,0,.3)" } }));
}
function _allSlots() {
  const s = [];
  for (let h = 8; h < 20; h++) ["00", "30"].forEach((m) => s.push((h < 10 ? "0" : "") + h + ":" + m));
  return s;
}
const _FULL_GRID = _allSlots();
function HorariosEditor({ T }) {
  const D = window.JCDATA;
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(today);
    dt.setDate(today.getDate() + i);
    return {
      iso: dt.toISOString().slice(0, 10),
      dt,
      dow: dt.getDay(),
      label: ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"][dt.getDay()],
      dd: dt.getDate(),
      mm: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][dt.getMonth()]
    };
  });
  const [selIdx, setSelIdx] = useState(0);
  const [slots, setSlots] = useState([]);
  const [open, setOpen] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPlantilla, setShowPlantilla] = useState(false);
  const [tmplWd, setTmplWd] = useState(1);
  const [tmplSlots, setTmplSlots] = useState([]);
  const [tmplOpen, setTmplOpen] = useState(true);
  const [tmplSaved, setTmplSaved] = useState(false);
  const day = days[selIdx];
  useEffect(() => {
    const avail = D.availForDate ? D.availForDate(day.dt) : D.availability(day.dow);
    setOpen(avail.open !== false);
    setSlots((avail.slots || []).slice());
    setSaved(false);
  }, [selIdx]);
  useEffect(() => {
    const a = D.availability(tmplWd);
    setTmplOpen(a.open !== false);
    setTmplSlots((a.slots || []).slice());
    setTmplSaved(false);
  }, [tmplWd]);
  const appts = (() => {
    try {
      const a = window.DB && window.DB.get("appointments") || [];
      return Array.isArray(a) ? a : [];
    } catch (e) {
      return [];
    }
  })();
  const dayAppts = appts.filter((a) => a.fecha === day.iso && a.status !== "anulada" && a.status !== "cancelada");
  const bookedSet = /* @__PURE__ */ new Set();
  {
    const _m = (t) => {
      const [h, m] = (t || "0:0").split(":").map(Number);
      return h * 60 + (m || 0);
    };
    dayAppts.forEach((a) => {
      if (!a.time) return;
      const st = _m(a.time), dur = parseInt(a.dur) || 30;
      _FULL_GRID.forEach((s) => {
        if (_m(s) >= st && _m(s) < st + dur) bookedSet.add(s);
      });
    });
  }
  function toggle(s) {
    if (bookedSet.has(s)) return;
    setSlots(slots.includes(s) ? slots.filter((x) => x !== s) : [...slots, s].sort());
    setSaved(false);
  }
  function openAll() {
    setSlots(_FULL_GRID.slice());
    setSaved(false);
  }
  function closeAll() {
    setSlots([]);
    setSaved(false);
  }
  async function save() {
    setSaving(true);
    D.saveDateSlots(day.iso, open ? slots : []);
    if (D.rebuildSchedule) D.rebuildSchedule();
    try {
      window.JCSAAS && window.JCSAAS.publishProfile && await window.JCSAAS.publishProfile();
    } catch (e) {
    }
    setSaved(true);
    setSaving(false);
  }
  function saveTemplate() {
    D.saveHorarios(tmplWd, { open: tmplOpen, slots: tmplSlots });
    if (D.rebuildSchedule) D.rebuildSchedule();
    setTmplSaved(true);
  }
  const disp = open ? slots.filter((s) => !bookedSet.has(s)).length : 0;
  const bloq = open ? _FULL_GRID.filter((s) => !slots.includes(s) && !bookedSet.has(s)).length : _FULL_GRID.length;
  const DOT = (c) => /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 } });
  const btnBase = { fontFamily: T.sans, fontSize: 11, padding: "6px 12px", borderRadius: 999, cursor: "pointer", border: "1px solid " + T.line, background: T.chipBg || T.surface, color: T.textMute };
  const DOW7 = [["Lunes", 1], ["Martes", 2], ["Mi\xE9rcoles", 3], ["Jueves", 4], ["Viernes", 5], ["S\xE1bado", 6], ["Domingo", 0]];
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Horarios disponibles por d\xEDa"), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: save }, saving ? "Publicando\u2026" : saved ? "\u2713 Publicado" : "Guardar y publicar")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 } }, days.map((d, i) => /* @__PURE__ */ React.createElement("button", { key: d.iso, onClick: () => {
    setSelIdx(i);
    setSaved(false);
  }, style: {
    fontFamily: T.sans,
    fontSize: 11,
    padding: "7px 11px",
    borderRadius: 999,
    cursor: "pointer",
    background: selIdx === i ? T.text : T.surface,
    color: selIdx === i ? T.bg : T.textMute,
    border: "1px solid " + (selIdx === i ? T.text : T.line)
  } }, i === 0 ? "Hoy" : d.label, " ", d.dd))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, DOT("#1F8A5B"), "\xA0", disp, " disponibles"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, DOT("#C0285A"), "\xA0", bloq, " bloqueadas"), dayAppts.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, DOT("#C49A6A"), "\xA0", dayAppts.length, " con cita"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement("button", { onClick: openAll, style: btnBase }, "Abrir todo"), /* @__PURE__ */ React.createElement("button", { onClick: closeAll, style: { ...btnBase, color: "#C0285A", borderColor: "#C0285A44" } }, "Bloquear todo")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0 14px", borderBottom: "1px solid " + T.lineSoft, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, open ? "D\xEDa abierto" : "D\xEDa cerrado"), /* @__PURE__ */ React.createElement(AdSwitch, { T, on: open, onClick: () => {
    setOpen(!open);
    setSaved(false);
  } })), open && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7 } }, _FULL_GRID.map((s) => {
    const isBooked = bookedSet.has(s);
    const isOpen = slots.includes(s);
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: s,
        onClick: () => toggle(s),
        disabled: isBooked,
        style: {
          padding: "9px 4px",
          borderRadius: 5,
          cursor: isBooked ? "default" : "pointer",
          fontFamily: T.sans,
          fontSize: 12,
          lineHeight: 1.3,
          fontWeight: 500,
          background: isBooked ? "rgba(196,154,106,.15)" : isOpen ? "#1F8A5B" : "rgba(192,40,90,.10)",
          color: isBooked ? "#C49A6A" : isOpen ? "#fff" : "#C0285A",
          border: "1px solid " + (isBooked ? "rgba(196,154,106,.5)" : isOpen ? "#1F8A5B" : "rgba(192,40,90,.35)")
        }
      },
      s,
      isBooked && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, opacity: 0.8 } }, "cita")
    );
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginTop: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, /* @__PURE__ */ React.createElement("span", { style: { width: 11, height: 11, borderRadius: 3, background: "#1F8A5B" } }), "Hora abierta"), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, /* @__PURE__ */ React.createElement("span", { style: { width: 11, height: 11, borderRadius: 3, background: "rgba(192,40,90,.10)", border: "1px solid rgba(192,40,90,.35)" } }), "Hora cerrada"), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, /* @__PURE__ */ React.createElement("span", { style: { width: 11, height: 11, borderRadius: 3, background: "rgba(196,154,106,.15)", border: "1px solid rgba(196,154,106,.5)" } }), "Con cita")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 } }, 'Toca cada hora para abrirla (verde) o cerrarla (rojo). "Guardar y publicar" lo sincroniza con la app de pacientes y el link de reserva.'));
}
function PendientesView({ T, patients, appts, go, openP, updatePatient }) {
  const D = window.JCDATA;
  const [tasks, setTasks] = useState(() => {
    try {
      return DB.get("admin_tasks") || [];
    } catch (e) {
      return [];
    }
  });
  const [draft, setDraft] = useState("");
  function saveTasks(n) {
    setTasks(n);
    try {
      DB.set("admin_tasks", n);
    } catch (e) {
    }
  }
  function addTask() {
    if (!draft.trim()) return;
    saveTasks([{ id: "t" + Date.now(), text: draft.trim(), done: false }, ...tasks]);
    setDraft("");
  }
  function toggleTask(id) {
    saveTasks(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  }
  async function delTask(id) {
    if (await (window.jcmConfirm || window.confirm)("\xBFEliminar esta tarea?", { danger: true })) saveTasks(tasks.filter((t) => t.id !== id));
  }
  const tPend = tasks.filter((t) => !t.done), tDone = tasks.filter((t) => t.done);
  const taskCard = (t) => /* @__PURE__ */ React.createElement("div", { key: t.id, style: { display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleTask(t.id), title: t.done ? "Reabrir" : "Completar", style: { flexShrink: 0, width: 18, height: 18, borderRadius: 5, border: "1.5px solid " + (t.done ? "#4E8A72" : T.chipBorder), background: t.done ? "#4E8A72" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 } }, t.done && /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "3" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 13, color: t.done ? T.textFaint : T.text, textDecoration: t.done ? "line-through" : "none" } }, t.text), /* @__PURE__ */ React.createElement("button", { onClick: () => delTask(t.id), title: "Eliminar", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 2 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
  const sinConsent = window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter((p) => !p.consent);
  const recitas = window.recitaDue ? window.recitaDue(patients) : [];
  const oneYear = Date.now() - 365 * 24 * 3600 * 1e3;
  const porRenovar = patients.filter((p) => p.consent && p.consentTs && p.consentTs < oneYear);
  const waMsgs = [];
  const bizC = [];
  const segs = [];
  const otrosPend = sinConsent.length + recitas.length + porRenovar.length + waMsgs.length + bizC.length + segs.length;
  const totalPend = tPend.length + otrosPend;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Pendientes", sub: "Tareas generales del equipo y seguimientos cl\xEDnicos." }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("input", { value: draft, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => e.key === "Enter" && addTask(), placeholder: "Nuevo pendiente\u2026", style: { flex: 1, fontFamily: T.sans, fontSize: 13, padding: "11px 14px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none" } }), /* @__PURE__ */ React.createElement("button", { onClick: addTask, style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "0 18px", cursor: "pointer", whiteSpace: "nowrap" } }, "+ Agregar")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2, border: "1px solid " + T.line, borderRadius: 10, padding: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.text, marginBottom: 10 } }, "Pendientes (", totalPend, ")"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, tPend.length ? tPend.map(taskCard) : otrosPend > 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "Sin tareas manuales. Abajo tienes ", sinConsent.length, " consentimiento(s) y ", recitas.length, " re-cita(s) por gestionar.") : /* @__PURE__ */ React.createElement(Empty2, { T }, "Nada pendiente. \u{1F389}"))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2, border: "1px solid " + T.line, borderRadius: 10, padding: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.text, marginBottom: 10 } }, "Completadas (", tDone.length, ")"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, tDone.length ? tDone.map(taskCard) : /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn nada completado.")))), /* @__PURE__ */ React.createElement(Group, { T, title: "Consentimientos por firmar (" + sinConsent.length + ")" }, sinConsent.map((p) => /* @__PURE__ */ React.createElement(PendRow, { key: p.id, T, name: p.name, desc: p.tags && p.tags[0] || "Paciente", action: "Ir a consentimientos", onClick: () => openP(p.id, "consent"), onDelete: () => updatePatient(p.id, { consent: true, consentInfo: "Marcado como firmado", consentTs: Date.now() }) })), !sinConsent.length && /* @__PURE__ */ React.createElement(Empty2, { T }, "Todo firmado.")), /* @__PURE__ */ React.createElement(Group, { T, title: "Consentimientos por renovar \xB7 +1 a\xF1o (" + porRenovar.length + ")" }, porRenovar.map((p) => {
    const meses = Math.floor((Date.now() - p.consentTs) / (30 * 24 * 3600 * 1e3));
    return /* @__PURE__ */ React.createElement(PendRow, { key: p.id, T, name: p.name, desc: "Firmado hace " + meses + " meses \xB7 " + (p.consentInfo || "Consentimiento"), action: "Renovar", onClick: () => openP(p.id, "consent") });
  }), !porRenovar.length && /* @__PURE__ */ React.createElement(Empty2, { T }, "Todos los consentimientos est\xE1n vigentes.")), /* @__PURE__ */ React.createElement(Group, { T, title: "Re-citar \xB7 esquema en curso (" + recitas.length + ")" }, recitas.map(({ p, r }) => /* @__PURE__ */ React.createElement(PendRow, { key: p.id, T, name: p.name, desc: r.motivo + " \xB7 " + r.precioFmt + " \u2192 " + r.descFmt, action: "WhatsApp", href: window.recitaWa ? window.recitaWa(p, r) : "https://wa.me/" + (p.phone || "").replace(/\D/g, "") })), !recitas.length && /* @__PURE__ */ React.createElement(Empty2, { T }, "Sin re-citas por contactar hoy.")), /* @__PURE__ */ React.createElement(Group, { T, title: "Mensajes de WhatsApp por responder (" + waMsgs.length + ")" }, waMsgs.map((m) => /* @__PURE__ */ React.createElement(PendRow, { key: m.id, T, name: m.name, desc: '"' + m.msg + '" \xB7 ' + m.ago, action: "Responder", href: "https://wa.me/" + D.wa })), !waMsgs.length && /* @__PURE__ */ React.createElement(Empty2, { T }, "Bandeja al d\xEDa.")), /* @__PURE__ */ React.createElement(Group, { T, title: "Comentarios en Business Manager (" + bizC.length + ")" }, bizC.map((c) => /* @__PURE__ */ React.createElement(PendRow, { key: c.id, T, name: c.name + " \xB7 " + c.net, desc: '"' + c.msg + '" \xB7 ' + c.ago, action: "Responder", href: "https://business.facebook.com/latest/inbox" })), !bizC.length && /* @__PURE__ */ React.createElement(Empty2, { T }, "Sin comentarios pendientes.")), /* @__PURE__ */ React.createElement(Group, { T, title: "Seguimientos (" + segs.length + ")" }, segs.map((r) => /* @__PURE__ */ React.createElement(PendRow, { key: r.id, T, name: r.name, desc: r.type + " \xB7 " + r.due, action: "WhatsApp", href: "https://wa.me/" + D.wa })), !segs.length && /* @__PURE__ */ React.createElement(Empty2, { T }, "Sin seguimientos pendientes.")));
}
function Group({ T, title, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, title), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, children));
}
function Empty2({ T, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint, padding: "4px 0" } }, children);
}
function PendRow({ T, name, desc, action, onClick, href, onDelete }) {
  const xBtn = onDelete ? React.createElement("button", {
    key: "x",
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      onDelete();
    },
    title: "Marcar como hecho",
    style: { flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: "4px 6px", display: "flex", alignItems: "center", borderRadius: 4 }
  }, React.createElement(
    "svg",
    { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 },
    React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })
  )) : null;
  const inner = [
    React.createElement(
      "div",
      { key: "a", style: { flex: 1, minWidth: 0 } },
      React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, name),
      React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, desc)
    ),
    React.createElement("span", { key: "b", style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, whiteSpace: "nowrap" } }, action + " \u2192"),
    xBtn
  ].filter(Boolean);
  const st = { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer", textDecoration: "none" };
  return href ? React.createElement("a", { href, target: "_blank", rel: "noopener", style: st }, inner) : React.createElement("button", { onClick, style: { ...st, width: "100%", textAlign: "left" } }, inner);
}
const WAIT_COLS = [["porllegar", "Por llegar"], ["espera", "En espera"], ["atencion", "En atenci\xF3n"], ["fin", "Finalizado"]];
function SalaEsperaView({ T, appts, patients, updatePatient }) {
  const _t0 = /* @__PURE__ */ new Date();
  _t0.setHours(0, 0, 0, 0);
  const esHoy = (a) => {
    if (a.fecha) {
      const t = /* @__PURE__ */ new Date(a.fecha + "T00:00:00");
      return !isNaN(t.getTime()) && t.getTime() === _t0.getTime();
    }
    return a.day === 0;
  };
  const hoy = appts.filter((a) => esHoy(a) && a.status !== "anulada" && a.status !== "cancelada" && a.status !== "no_asistio");
  const [status, setStatus] = useState(() => {
    try {
      return DB.get("waiting_status") || {};
    } catch (e) {
      return {};
    }
  });
  function setS(id, st) {
    const n = { ...status, [id]: st };
    setStatus(n);
    try {
      DB.set("waiting_status", n);
    } catch (e) {
    }
  }
  const stOf = (a) => status[a.id] || "porllegar";
  const next = (st) => ({ porllegar: "espera", espera: "atencion", atencion: "fin" })[st];
  const lbl = { porllegar: "Marcar llegada", espera: "Pasar a atenci\xF3n", atencion: "Finalizar" };
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
  function eliminarDeSala(a) {
    const st = stOf(a);
    const n = { ...status, [a.id]: "eliminado" };
    setStatus(n);
    try {
      DB.set("waiting_status", n);
    } catch (e) {
    }
    if (updatePatient && st !== "fin") {
      const pat = patients && patients.find((p) => p.name === a.name);
      if (pat && pat.campaign) {
        const meta_estado = st === "porllegar" ? "no_asistio" : "no_compro";
        updatePatient(pat.id, { campaign: { ...pat.campaign, meta_estado } });
      }
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Sala de espera", sub: "Pacientes de hoy, " + today + ". Actualiza el estado a medida que llegan y se atienden." }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 } }, WAIT_COLS.map(([k, l]) => {
    const items = hoy.filter((a) => stOf(a) === k && status[a.id] !== "eliminado");
    return /* @__PURE__ */ React.createElement("div", { key: k, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: 12, minHeight: 200 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent } }, l), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, items.length)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, items.map((a) => /* @__PURE__ */ React.createElement("div", { key: a.id, style: { background: T.bg, border: "1px solid " + T.line, borderRadius: 8, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, a.time)), /* @__PURE__ */ React.createElement("button", { onClick: () => eliminarDeSala(a), title: "Quitar de sala de espera", style: { flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: "2px 3px", display: "flex", borderRadius: 4, marginTop: -1 } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 4 } }, a.proc), next(k) && /* @__PURE__ */ React.createElement("button", { onClick: () => setS(a.id, next(k)), style: { marginTop: 8, width: "100%", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.accent, background: T.accentSoft || "rgba(84,112,127,.12)", border: "none", borderRadius: 6, padding: "7px", cursor: "pointer" } }, lbl[k], " \u2192"))), !items.length && /* @__PURE__ */ React.createElement(Empty2, { T }, "\u2014")));
  })));
}
const AUTO_SEED = [
  { id: "r24", t: "Recordatorio de cita (24 h antes)", d: "Env\xEDa un correo a los pacientes (con email) 24 h antes de su cita para confirmar asistencia. WhatsApp pr\xF3ximamente.", on: true, ch: "Email", ic: "clock", email: true },
  { id: "rmorning", t: "Recordatorio el d\xEDa de la cita", d: "El d\xEDa de la cita, env\xEDa un correo recordando la hora a los pacientes con email. WhatsApp pr\xF3ximamente.", on: true, ch: "Email", ic: "sun", email: true },
  { id: "rind", t: "Indicaciones post tratamiento", d: "Al finalizar la atenci\xF3n, env\xEDa por WhatsApp las indicaciones y cuidados del procedimiento realizado.", on: true, ch: "WhatsApp", ic: "chat" },
  { id: "rpost", t: "Seguimiento de tratamiento (14 d\xEDas)", d: "Mensaje autom\xE1tico a los 14 d\xEDas para control de resultados.", on: false, ch: "WhatsApp", ic: "chat" },
  { id: "rbday", t: "Saludo de cumplea\xF1os", d: "Env\xEDa un mensaje felicitando al paciente en su cumplea\xF1os.", on: false, ch: "Email", ic: "gift" },
  { id: "rreview", t: "Solicitud de rese\xF1a", d: "Se env\xEDa por WhatsApp junto con las indicaciones post tratamiento: al final del mensaje se incluye tu enlace de Google para dejar rese\xF1a.", on: false, ch: "WhatsApp", ic: "star", bundle: "indicaciones" },
  { id: "rreact", t: "Reactivaci\xF3n (90 d\xEDas sin venir)", d: "Invitaci\xF3n a reagendar para pacientes inactivos.", on: false, ch: "WhatsApp", ic: "refresh" }
];
const AUTO_IC = {
  clock: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M12 7v5l3 2" })),
  sun: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4.5" }), /* @__PURE__ */ React.createElement("path", { d: "M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" })),
  chat: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z" })),
  gift: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "8", width: "18", height: "13", rx: "1.5" }), /* @__PURE__ */ React.createElement("path", { d: "M3 12h18M12 8v13M12 8S10 3 7.5 4.5 9.5 8 12 8zM12 8s2-5 4.5-3.5S14.5 8 12 8z" })),
  star: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" })),
  refresh: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" }))
};
const AUTO_CH_COLOR = { WhatsApp: "#1F8A5B", Email: "#caa86a", SMS: "#9C8AB5" };
function ReviewsModal({ T, reviews, stars, onClose }) {
  const top = reviews.filter((r) => (r.stars || 0) >= 4);
  const low = reviews.filter((r) => (r.stars || 0) <= 3);
  const fmtDate = (ts) => {
    try {
      return ts ? new Date(ts).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" }) : "";
    } catch (e) {
      return "";
    }
  };
  const Card = ({ r, tone }) => /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2, border: "1px solid " + (tone === "low" ? "rgba(192,40,90,.28)" : "rgba(31,138,91,.25)"), borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, r.name || "An\xF3nimo"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.gold, whiteSpace: "nowrap" } }, stars(r.stars || 0))), r.comment && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 5, lineHeight: 1.55 } }, r.comment), (r.ts || r.proc) && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 } }, [r.proc, fmtDate(r.ts)].filter(Boolean).join(" \xB7 ")));
  const Col = ({ title, sub, color, list, tone }) => /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 240 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: color } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: T.text, fontWeight: 600 } }, title), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "(", list.length, ")")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 10 } }, sub), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, list.length ? list.map((r) => /* @__PURE__ */ React.createElement(Card, { key: r.id, r, tone })) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint, padding: "10px 0" } }, "Sin rese\xF1as en este grupo.")));
  return /* @__PURE__ */ React.createElement(AdModal, { T, wide: true, title: "Rese\xF1as de pacientes", onClose }, reviews.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textFaint, padding: "16px 0" } }, "A\xFAn no has recibido rese\xF1as. Comparte tu enlace para empezar a recibirlas.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 18, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Col, { title: "Potenciar", sub: "4 y 5 estrellas \u2014 lo que m\xE1s valoran tus pacientes.", color: "#1F8A5B", list: top, tone: "top" }), /* @__PURE__ */ React.createElement(Col, { title: "Mejorar", sub: "3 estrellas o menos \u2014 oportunidades de mejora.", color: "#C0285A", list: low, tone: "low" })));
}
function AutomatizacionesView({ T }) {
  const [rules, setRules] = useState(() => {
    let saved = {};
    try {
      const s = DB.get("automations");
      if (s && s.length) s.forEach((r) => {
        saved[r.id] = r.on;
      });
    } catch (e) {
    }
    return AUTO_SEED.map((r) => ({ ...r, on: r.id in saved ? saved[r.id] : r.on }));
  });
  function toggle(id) {
    const n = rules.map((r) => r.id === id ? { ...r, on: !r.on } : r);
    setRules(n);
    try {
      DB.set("automations", n);
    } catch (e) {
    }
  }
  const [autos, setAutos] = useState(() => {
    try {
      return window.DB && window.DB.get("custom_automations") || [];
    } catch (e) {
      return [];
    }
  });
  const [editAuto, setEditAuto] = useState(null);
  function persistAutos(n) {
    setAutos(n);
    try {
      window.DB && window.DB.set("custom_automations", n);
    } catch (e) {
    }
  }
  function saveAuto(a) {
    const exists = a.id && autos.find((x) => x.id === a.id);
    persistAutos(exists ? autos.map((x) => x.id === a.id ? a : x) : [...autos, { ...a, id: "auto" + Date.now() }]);
    setEditAuto(null);
    try {
      window.jcmToast && window.jcmToast("Automatizaci\xF3n guardada.", "ok");
    } catch (e) {
    }
  }
  async function delAuto(id) {
    if (!await (window.jcmConfirm || window.confirm)("\xBFEliminar esta automatizaci\xF3n?", { danger: true })) return;
    persistAutos(autos.filter((x) => x.id !== id));
  }
  function toggleAuto(id) {
    persistAutos(autos.map((x) => x.id === id ? { ...x, on: !x.on } : x));
  }
  const autoWhen = (a) => a.dir === "after" ? a.days + " d\xEDa" + (a.days === 1 ? "" : "s") + " despu\xE9s" : a.days === 0 ? "el d\xEDa de la cita" : a.days + " d\xEDa" + (a.days === 1 ? "" : "s") + " antes";
  const reviewUrl = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.reviewLink ? window.JCSAAS.reviewLink() : (typeof window !== "undefined" ? window.jcmPubBase ? window.jcmPubBase() : window.location.origin : "") + "/review.html";
  const [copiedRev, setCopiedRev] = useState(false);
  function copyReview() {
    try {
      navigator.clipboard.writeText(reviewUrl);
      setCopiedRev(true);
      setTimeout(() => setCopiedRev(false), 1800);
    } catch (e) {
    }
  }
  const reviews = (() => {
    try {
      return window.DB && DB.get("reviews") || [];
    } catch (e) {
      return [];
    }
  })();
  const avg = reviews.length ? reviews.reduce((s, r) => s + (r.stars || 0), 0) / reviews.length : 0;
  const stars = (n) => "\u2605\u2605\u2605\u2605\u2605\u2606\u2606\u2606\u2606\u2606".slice(5 - Math.round(n), 10 - Math.round(n));
  const [showReviews, setShowReviews] = useState(false);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Automatizaciones", sub: "Configura recordatorios y mensajes autom\xE1ticos para tus pacientes." }), /* @__PURE__ */ React.createElement("div", { style: { background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, "El env\xEDo real de WhatsApp/Email/SMS se ejecuta desde el servidor (Medique). Aqu\xED configuras y visualizas las reglas."), /* @__PURE__ */ React.createElement(NotificacionesCard, { T }), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, "Formulario de rese\xF1as de tu cl\xEDnica"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } }, reviews.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.gold } }, stars(avg), " ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, avg.toFixed(1), " \xB7 ", reviews.length, " rese\xF1a", reviews.length === 1 ? "" : "s")), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowReviews(true), style: { fontFamily: T.sans, fontSize: 11.5, fontWeight: 500, padding: "7px 13px", borderRadius: 8, cursor: "pointer", border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.text } }, "Ver rese\xF1as", reviews.length ? " (" + reviews.length + ")" : ""))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12, lineHeight: 1.5 } }, 'Comparte este enlace con tus pacientes (se incluye al final del mensaje de indicaciones cuando "Solicitud de rese\xF1a" est\xE1 activa). Las rese\xF1as que dejen llegan a este panel.'), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("input", { readOnly: true, value: reviewUrl, onFocus: (e) => e.target.select(), style: { flex: 1, minWidth: 220, padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none" } }), /* @__PURE__ */ React.createElement("button", { onClick: copyReview, style: { padding: "0 14px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.textMute, cursor: "pointer", fontFamily: T.sans, fontSize: 11.5 } }, copiedRev ? "\u2713" : "Copiar"), /* @__PURE__ */ React.createElement("a", { href: reviewUrl, target: "_blank", rel: "noopener", style: { display: "inline-flex", alignItems: "center", padding: "0 14px", borderRadius: 8, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.text, textDecoration: "none", fontFamily: T.sans, fontSize: 11.5 } }, "Abrir \u2197")), reviews.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, display: "flex", flexDirection: "column", gap: 8 } }, reviews.slice(0, 5).map((r) => /* @__PURE__ */ React.createElement("div", { key: r.id, style: { background: T.surface2, border: "1px solid " + T.line, borderRadius: 8, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text } }, r.name || "An\xF3nimo"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.gold } }, stars(r.stars || 0))), r.comment && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 3, lineHeight: 1.5 } }, r.comment))))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text, marginBottom: 10 } }, "Recordatorios autom\xE1ticos"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 } }, rules.map((r) => {
    const cc = AUTO_CH_COLOR[r.ch] || T.accent;
    return /* @__PURE__ */ React.createElement("div", { key: r.id, style: { background: T.surface, border: "1px solid " + (r.on ? T.accent + "55" : T.line), borderRadius: 14, padding: "18px 18px 16px", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 42, height: 42, borderRadius: 11, background: cc + "1c", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: cc, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, AUTO_IC[r.ic])), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16.5, color: T.text, lineHeight: 1.2 } }, r.t), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", marginTop: 5, fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", color: T.textMute, background: T.surface2, border: "1px solid " + T.line, borderRadius: 6, padding: "2px 7px" } }, r.ch)), /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(r.id), title: r.on ? "Activado" : "Desactivado", style: { flexShrink: 0, width: 44, height: 25, borderRadius: 999, border: "none", cursor: "pointer", background: r.on ? T.accent : T.line, position: "relative", transition: "background .2s" } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 3, left: r.on ? 22 : 3, width: 19, height: 19, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.3)" } }))), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 12, lineHeight: 1.5 } }, r.d), r.on && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-start", alignItems: "center", marginTop: 12, paddingTop: 10, borderTop: "1px solid " + T.lineSoft } }, r.email ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: "#1F8A5B", display: "inline-flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "#1F8A5B" } }), " Activo \xB7 por correo") : /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, display: "inline-flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "#caa86a" } }), " Pendiente \xB7 requiere WhatsApp")));
  })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, "Mis automatizaciones de correo"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setEditAuto("new") }, "+ Nueva automatizaci\xF3n")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12, lineHeight: 1.5 } }, "Crea recordatorios o seguimientos por correo a tu medida. El servidor los env\xEDa solo (1\xD7/d\xEDa) a los pacientes con cita en la fecha que definas. Las anuladas se saltan. (WhatsApp a medida requiere conectar Meta.)"), autos.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, 'A\xFAn no creaste automatizaciones propias. Usa "+ Nueva automatizaci\xF3n".') : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, autos.map((a) => /* @__PURE__ */ React.createElement("div", { key: a.id, style: { display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + (a.on !== false ? T.accent + "55" : T.line), borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, a.name || "Sin nombre"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, "\u{1F4E7} ", autoWhen(a), ' \xB7 "', a.subject || "(sin asunto)", '"')), /* @__PURE__ */ React.createElement(AdSwitch, { T, on: a.on !== false, onClick: () => toggleAuto(a.id) }), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditAuto(a), style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" } }, "Editar"), /* @__PURE__ */ React.createElement("button", { onClick: () => delAuto(a.id), title: "Eliminar", style: { flexShrink: 0, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.textFaint, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))))))), editAuto && /* @__PURE__ */ React.createElement(AutoBuilderModal, { T, auto: editAuto === "new" ? null : editAuto, onClose: () => setEditAuto(null), onSave: saveAuto }), showReviews && /* @__PURE__ */ React.createElement(ReviewsModal, { T, reviews, stars, onClose: () => setShowReviews(false) }));
}
const AUTO_VARS = ["{nombre}", "{fecha}", "{hora}", "{tratamiento}", "{clinica}"];
function AutoBuilderModal({ T, auto, onClose, onSave }) {
  const [f, setF] = useState(() => auto ? { ...auto } : { name: "", dir: "before", days: 1, subject: "", body: "", on: true });
  const ok = (f.name || "").trim().length > 1 && (f.subject || "").trim().length > 0 && (f.body || "").trim().length > 0;
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  const dayOpts = f.dir === "before" ? [0, 1, 2, 3, 5, 7] : [1, 2, 3, 7, 14, 30];
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: auto ? "Editar automatizaci\xF3n" : "Nueva automatizaci\xF3n de correo", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave({ ...f, days: parseInt(f.days, 10) || 0 }) }, "Guardar automatizaci\xF3n") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre (interno)", value: f.name, onChange: (v) => setF({ ...f, name: v }), placeholder: "Ej: Seguimiento post-tratamiento" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Disparador"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("select", { value: f.dir, onChange: (e) => setF({ ...f, dir: e.target.value }), style: inp }, /* @__PURE__ */ React.createElement("option", { value: "before" }, "Antes de la cita"), /* @__PURE__ */ React.createElement("option", { value: "after" }, "Despu\xE9s de la cita")), /* @__PURE__ */ React.createElement("select", { value: f.days, onChange: (e) => setF({ ...f, days: parseInt(e.target.value, 10) }), style: inp }, dayOpts.map((d) => /* @__PURE__ */ React.createElement("option", { key: d, value: d }, d === 0 ? "El mismo d\xEDa" : d + " d\xEDa" + (d === 1 ? "" : "s")))))), /* @__PURE__ */ React.createElement(AdField, { T, label: "Asunto del correo", value: f.subject, onChange: (v) => setF({ ...f, subject: v }), placeholder: "Ej: \xBFC\xF3mo te fue con tu tratamiento?" }), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Mensaje"), /* @__PURE__ */ React.createElement("textarea", { value: f.body, onChange: (e) => setF({ ...f, body: e.target.value }), rows: 5, placeholder: "Hola {nombre}, \u2026", style: { ...inp, resize: "vertical", lineHeight: 1.5 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, AUTO_VARS.map((v) => /* @__PURE__ */ React.createElement("button", { key: v, type: "button", onClick: () => setF((s) => ({ ...s, body: (s.body || "") + v })), style: { fontFamily: T.sans, fontSize: 11, padding: "5px 10px", borderRadius: 999, cursor: "pointer", border: "1px solid " + T.line, background: "transparent", color: T.accent } }, "+ ", v))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "11px 14px", borderRadius: 8, background: T.surface2 || T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, "Automatizaci\xF3n activa"), /* @__PURE__ */ React.createElement(AdSwitch, { T, on: f.on !== false, onClick: () => setF({ ...f, on: !(f.on !== false) }) }))));
}
const WA_SEED = [
  { id: "c1", name: "Camila Rojas", phone: "+56 9 1111 1111", msgs: [{ f: "in", t: "Hola, \xBFtienen hora para botox esta semana?", h: "09:12" }, { f: "out", t: "\xA1Hola Camila! S\xED \u{1F60A} Tenemos el jueves a las 16:00. \xBFTe sirve?", h: "09:13" }, { f: "in", t: "Perfecto, ag\xE9ndame ah\xED", h: "09:15" }] },
  { id: "c2", name: "Mar\xEDa Soto", phone: "+56 9 2222 2222", msgs: [{ f: "in", t: "\xBFCu\xE1nto cuesta la rinomodelaci\xF3n?", h: "Ayer" }, { f: "out", t: "Tiene un valor de $170.000 e incluye evaluaci\xF3n. \xBFQuieres agendar?", h: "Ayer" }] },
  { id: "c3", name: "Javier D\xEDaz", phone: "+56 9 3333 3333", msgs: [{ f: "in", t: "Necesito reagendar mi cita del viernes", h: "08:40" }] }
];
function CitaAgendadaOkPopup({ T, cita, appts, onClose }) {
  const D = window.JCDATA;
  const slots = D.defaultSlots ? D.defaultSlots(1) : [];
  const ocupados = (appts || []).filter((a) => a.day === (cita.day || 0)).map((a) => a.time);
  const citaTime = cita.time || "";
  return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, style: { position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: "100%", maxWidth: 460, background: T.bg, border: "1px solid " + T.line, borderRadius: 16, padding: "26px 24px", animation: "jcSlideUp .28s " + T.ease } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 56, height: 56, borderRadius: "50%", background: "rgba(31,138,91,.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "#1F8A5B", strokeWidth: "2.5", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.text, marginBottom: 4 } }, "Cita agendada"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, textAlign: "center" } }, /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, cita.name), " \xB7 ", cita.proc, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: T.accent } }, cita.time, " \xB7 ", cita.day === 0 ? "hoy" : cita.day === 1 ? "ma\xF1ana" : "en " + cita.day + " d\xEDas")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginTop: 10, background: "rgba(31,138,91,.08)", border: "1px solid rgba(31,138,91,.25)", borderRadius: 8, padding: "8px 14px" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "#1F8A5B", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#1F8A5B" } }, "Notificaci\xF3n enviada al paciente por WhatsApp"))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "14px 16px", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, cita.day === 0 ? "Agenda de hoy" : cita.day === 1 ? "Agenda de ma\xF1ana" : "Agenda del d\xEDa"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 5 } }, slots.slice(0, 12).map((s) => {
    const isNew = s === citaTime;
    const isBusy = ocupados.includes(s);
    return /* @__PURE__ */ React.createElement("div", { key: s, style: { padding: "7px 4px", borderRadius: 5, textAlign: "center", fontFamily: T.sans, fontSize: 11.5, fontWeight: isNew ? 700 : 400, background: isNew ? "#1F8A5B" : isBusy ? T.surface2 : T.bg, color: isNew ? "#fff" : isBusy ? T.textFaint : T.text, border: "1px solid " + (isNew ? "#1F8A5B" : T.line), textDecoration: isBusy && !isNew ? "line-through" : "none" } }, s);
  }))), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { width: "100%", fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "13px", cursor: "pointer" } }, "Entendido")));
}
const INBOX_CHANNELS = [
  { id: "whatsapp", name: "WhatsApp", color: "#1F8A5B", desc: "Mensajes y recordatorios por WhatsApp" },
  { id: "instagram", name: "Instagram", color: "#E1306C", desc: "DMs y comentarios de Instagram" },
  { id: "facebook", name: "Facebook", color: "#1877F2", desc: "Mensajes de Messenger y comentarios de Facebook" }
];
function chanOf(c) {
  return c && c.channel || "whatsapp";
}
function chanMeta(id) {
  return INBOX_CHANNELS.find((x) => x.id === id) || INBOX_CHANNELS[0];
}
const COPILOT_TONOS = ["Cercano", "Profesional", "Formal", "Divertido"];
const COPILOT_ACCIONES = [["agendar", "Agendar y reagendar citas"], ["buscar", "Buscar pacientes y fichas"], ["venta", "Registrar ventas en caja"], ["stats", "Consultar estad\xEDsticas"], ["dudas", "Responder dudas de tratamientos"]];
function loadAgentCfg() {
  try {
    const v = window.DB && window.DB.get("agent_cfg");
    if (v && typeof v === "object") return v;
  } catch (e) {
  }
  return { name: "Medi", tono: "Cercano", prompt: "Eres el asistente virtual de {clinica}. Atiendes con calidez y criterio cl\xEDnico, resuelves dudas de tratamientos est\xE9ticos y ayudas a agendar. Nunca das diagn\xF3sticos m\xE9dicos definitivos; ante dudas cl\xEDnicas, derivas al profesional.", acciones: { agendar: true, buscar: true, venta: false, stats: true, dudas: true } };
}
function CopilotConfigView({ T }) {
  const [cfg, setCfg] = useState(loadAgentCfg);
  const [saved, setSaved] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  function up(patch) {
    setCfg((c) => ({ ...c, ...patch }));
    setSaved(false);
  }
  function save() {
    try {
      window.DB && window.DB.set("agent_cfg", cfg);
    } catch (e) {
    }
    setSaved(true);
    try {
      window.jcmToast && window.jcmToast("Asistente guardado.", "ok");
    } catch (e) {
    }
  }
  function send() {
    const t = draft.trim();
    if (!t || busy) return;
    const next = [...msgs, { role: "user", content: t }];
    setMsgs(next);
    setDraft("");
    if (!window.mediqueAI) {
      setMsgs([...next, { role: "assistant", content: "(Demo) Conecta GROQ_API_KEY en el servidor para que el asistente responda de verdad. Con la configuraci\xF3n actual, " + cfg.name + " responder\xEDa en tono " + cfg.tono.toLowerCase() + "." }]);
      return;
    }
    setBusy(true);
    const clinica = window.clinicName && window.clinicName() || "la cl\xEDnica";
    const clinic = {
      name: clinica,
      address: window.clinicAddr && window.clinicAddr() || "",
      hours: (() => {
        try {
          return DB.cfg().clinic_hours || "";
        } catch (e) {
          return "";
        }
      })(),
      services: (window.clinicServiceList ? window.clinicServiceList() : []).slice(0, 30),
      branches: (window.DB && window.DB.get("sucursales") || []).map((s) => s.addr ? s.name + " (" + s.addr + ")" : s.name).filter(Boolean),
      agentName: cfg.name,
      agentTone: cfg.tono,
      agentPrompt: (cfg.prompt || "").replace(/\{clinica\}/g, clinica)
    };
    window.mediqueAI(next, clinic).then((res) => {
      setBusy(false);
      if (res && res.ok && res.reply) setMsgs((m) => [...m, { role: "assistant", content: res.reply }]);
      else if (res && res.configured === false) setMsgs((m) => [...m, { role: "assistant", content: "Conecta tu API Key (GROQ_API_KEY) en el servidor para activar el asistente." }]);
      else setMsgs((m) => [...m, { role: "assistant", content: "No pude responder ahora. Intenta de nuevo." }]);
    });
  }
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Asistente IA", sub: "Personaliza tu copiloto: nombre, personalidad, tono y qu\xE9 puede hacer" }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: save }, saved ? "\u2713 Guardado" : "Guardar asistente")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 16, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 14 } }, "Personalidad"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Nombre del asistente"), /* @__PURE__ */ React.createElement("input", { value: cfg.name, onChange: (e) => up({ name: e.target.value }), placeholder: "Ej: Medi", style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Tono"), /* @__PURE__ */ React.createElement("select", { value: cfg.tono, onChange: (e) => up({ tono: e.target.value }), style: inp }, COPILOT_TONOS.map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, t))))), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Instrucciones / personalidad (prompt)"), /* @__PURE__ */ React.createElement("textarea", { value: cfg.prompt, onChange: (e) => up({ prompt: e.target.value }), rows: 5, placeholder: "Describe c\xF3mo debe comportarse\u2026", style: { ...inp, resize: "vertical", lineHeight: 1.5 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, display: "block", marginTop: 6 } }, "Usa ", "{clinica}", " para insertar el nombre de tu cl\xEDnica.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Acciones que puede ejecutar"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginTop: 4 } }, COPILOT_ACCIONES.map(([k, l]) => {
    const on = !!(cfg.acciones || {})[k];
    return /* @__PURE__ */ React.createElement("div", { key: k, onClick: () => up({ acciones: { ...cfg.acciones, [k]: !on } }), style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px", borderRadius: 8, background: T.surface2 || T.bg, border: "1px solid " + T.line, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, l), /* @__PURE__ */ React.createElement(AdSwitch, { T, on, onClick: () => up({ acciones: { ...cfg.acciones, [k]: !on } }) }));
  }))))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column", minHeight: 420 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 14 } }, "Playground \xB7 prueba a ", cfg.name || "tu asistente"), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 } }, msgs.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint, lineHeight: 1.5, margin: "auto 0", textAlign: "center", padding: "0 16px" } }, "Escr\xEDbele como si fueras un paciente y prueba c\xF3mo responde con la personalidad y tono que configuraste."), msgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", background: m.role === "user" ? T.accent : T.surface2 || T.bg, color: m.role === "user" ? T.onAccent || "#fff" : T.text, border: "1px solid " + (m.role === "user" ? T.accent : T.line), borderRadius: 12, padding: "9px 13px", fontFamily: T.sans, fontSize: 12.5, lineHeight: 1.5, whiteSpace: "pre-wrap" } }, m.content)), busy && /* @__PURE__ */ React.createElement("div", { style: { alignSelf: "flex-start", fontFamily: T.sans, fontSize: 12, color: T.textMute, padding: "4px 6px" } }, cfg.name, " est\xE1 escribiendo\u2026")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: draft, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }, placeholder: "Escribe un mensaje de prueba\u2026", style: { ...inp, flex: 1 } }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: send }, "Enviar")))));
}
function AgenteIAView({ T, patients, addAppt }) {
  const seeded = typeof clinicSeeded === "function" ? clinicSeeded() : true;
  const [convs, setConvs] = useState(() => {
    try {
      const s = DB.get("wa_conversations");
      if (s) return s;
    } catch (e) {
    }
    return seeded ? WA_SEED : [];
  });
  const [appts, setAppts] = useState(() => {
    try {
      return DB.get("appts") || [];
    } catch (e) {
      return [];
    }
  });
  const [sel, setSel] = useState(convs[0] ? convs[0].id : null);
  const [draft, setDraft] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [darCita, setDarCita] = useState(null);
  const [citaOk, setCitaOk] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [showMetaGuide, setShowMetaGuide] = useState(false);
  const [chan, setChan] = useState("todos");
  const shown = chan === "todos" ? convs : convs.filter((c) => chanOf(c) === chan);
  const conv = convs.find((c) => c.id === sel);
  function openGuideFor(ch) {
    if (ch === "whatsapp") setShowGuide(true);
    else setShowMetaGuide(true);
  }
  function send() {
    if (!draft.trim() || !conv) return;
    const n = convs.map((c) => c.id === sel ? { ...c, msgs: [...c.msgs, { f: "out", t: draft.trim(), h: "ahora" }] } : c);
    setConvs(n);
    try {
      DB.set("wa_conversations", n);
    } catch (e) {
    }
    setDraft("");
  }
  function aiSuggest() {
    if (!conv || aiBusy || !window.mediqueAI) return;
    setAiBusy(true);
    const _ac = (() => {
      try {
        return window.DB && window.DB.get("agent_cfg") || {};
      } catch (e) {
        return {};
      }
    })();
    const _cn = window.clinicName && window.clinicName() || "";
    const clinic = {
      name: _cn,
      address: window.clinicAddr && window.clinicAddr() || "",
      hours: (() => {
        try {
          return DB.cfg().clinic_hours || "";
        } catch (e) {
          return "";
        }
      })(),
      services: (window.clinicServiceList ? window.clinicServiceList() : []).slice(0, 30),
      branches: (window.DB && window.DB.get("sucursales") || []).map((s) => s.addr ? s.name + " (" + s.addr + ")" : s.name).filter(Boolean),
      agentName: _ac.name || "",
      agentTone: _ac.tono || "",
      agentPrompt: (_ac.prompt || "").replace(/\{clinica\}/g, _cn)
    };
    const msgs = conv.msgs.map((m) => ({ role: m.f === "out" ? "assistant" : "user", content: m.t }));
    window.mediqueAI(msgs, clinic).then((res) => {
      setAiBusy(false);
      if (res && res.ok && res.reply) {
        setDraft(res.reply);
      } else if (res && res.configured === false) {
        window.jcmToast && window.jcmToast("Conecta tu API Key de Groq (GROQ_API_KEY) en el servidor para activar el agente.", "info");
      } else {
        window.jcmError && window.jcmError("El agente no pudo responder", res && res.error);
      }
    });
  }
  function handleSaveCita(a) {
    const newA = { ...a, id: window.jcmUid ? window.jcmUid("a") : "a" + Date.now() };
    setAppts((prev) => [...prev, newA]);
    if (addAppt) addAppt(a);
    setDarCita(null);
    setCitaOk(newA);
    if (conv) {
      const n = convs.map((c) => c.id === sel ? { ...c, msgs: [...c.msgs, { f: "out", t: "\xA1Listo! Tu cita qued\xF3 agendada para " + a.time + ". Te llegar\xE1 la confirmaci\xF3n pronto \u{1F4C5}", h: "ahora" }] } : c);
      setConvs(n);
      try {
        DB.set("wa_conversations", n);
      } catch (e) {
      }
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Agente IA \xB7 Bandeja unificada", sub: "WhatsApp, Instagram y Facebook en un solo lugar, con respuestas asistidas por IA." }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.gold, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "5px 11px", display: "inline-flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: T.gold } }), " Pendiente \xB7 conecta tus canales"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0 4px" } }, [{ id: "todos", name: "Todos", color: T.accent }].concat(INBOX_CHANNELS).map((ch) => {
    const on = chan === ch.id;
    const n = ch.id === "todos" ? convs.length : convs.filter((c) => chanOf(c) === ch.id).length;
    return /* @__PURE__ */ React.createElement("button", { key: ch.id, onClick: () => setChan(ch.id), style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 12, fontWeight: 500, padding: "7px 13px", borderRadius: 999, cursor: "pointer", background: on ? ch.color : "transparent", color: on ? "#fff" : T.textMute, border: "1px solid " + (on ? ch.color : T.line) } }, ch.id !== "todos" && /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: on ? "#fff" : ch.color } }), ch.name, /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.7, fontSize: 11 } }, n));
  })), /* @__PURE__ */ React.createElement("div", { style: { background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 14px", margin: "8px 0 14px", fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5 } }, seeded ? "Conversaciones de ejemplo. El env\xEDo real y las respuestas con IA corren en el servidor (Medique)." : "Conecta tus canales (WhatsApp, Instagram y Facebook) para que tus mensajes lleguen a esta bandeja y el asistente responda con el contexto de tu cl\xEDnica. Cada conexi\xF3n se activa en Meta."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: convs.length, l: "Contactos" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: convs.reduce((s, c) => s + c.msgs.length, 0), l: "Mensajes (30d)" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: 0, l: "Citas por IA" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: "0%", l: "Tasa respuesta" })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "10px 14px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent } }, "Modelo de IA"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text } }, "Groq \xB7 gpt-oss-120b"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, color: "#1F8A5B", background: "rgba(31,138,91,.1)", borderRadius: 6, padding: "2px 7px" } }, "Activo en el panel"), /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, "Auto-respuesta por WhatsApp \xB7 pendiente de activar")), convs.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px dashed " + T.line, borderRadius: 12, padding: "32px 24px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 4, textAlign: "center" } }, "Conecta tus canales de mensajes"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, lineHeight: 1.6, maxWidth: 460, margin: "0 auto 20px", textAlign: "center" } }, "Cuando conectes cada canal en Meta, los mensajes de tus pacientes entran ac\xE1 y el asistente responde con el contexto de tu cl\xEDnica."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 10, maxWidth: 620, margin: "0 auto" } }, INBOX_CHANNELS.map((ch) => /* @__PURE__ */ React.createElement("div", { key: ch.id, style: { background: T.bg, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 14px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: 10, background: ch.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, margin: "0 auto 10px" } }, ch.name[0]), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text } }, ch.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, margin: "4px 0 12px", lineHeight: 1.4, minHeight: 28 } }, ch.desc), /* @__PURE__ */ React.createElement("button", { onClick: () => openGuideFor(ch.id), style: { width: "100%", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: "#fff", background: ch.color, border: "none", borderRadius: 8, padding: "9px", cursor: "pointer" } }, "Conectar"))))) : /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "260px 1fr", gap: 12, height: 460 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, overflowY: "auto" } }, shown.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 14px", fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Sin conversaciones en este canal."), shown.map((c) => /* @__PURE__ */ React.createElement("button", { key: c.id, onClick: () => setSel(c.id), style: { width: "100%", textAlign: "left", display: "block", padding: "12px 14px", border: "none", borderBottom: "1px solid " + T.line, background: c.id === sel ? T.accentSoft || "rgba(84,112,127,.12)" : "transparent", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: chanMeta(chanOf(c)).color, flexShrink: 0 }, title: chanMeta(chanOf(c)).name }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, c.name)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, c.msgs && c.msgs.length ? c.msgs[c.msgs.length - 1].t : "")))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, display: "flex", flexDirection: "column" } }, conv ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + T.line, display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text } }, conv.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "#fff", background: chanMeta(chanOf(conv)).color, borderRadius: 5, padding: "2px 6px" } }, chanMeta(chanOf(conv)).name)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, conv.phone || conv.handle || "")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setDarCita({ name: conv.name, phone: conv.phone }),
      style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer" }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4M12 13v4M10 15h4" })),
    "Agendar cita"
  )), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8 } }, conv.msgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { alignSelf: m.f === "out" ? "flex-end" : "flex-start", maxWidth: "75%", background: m.f === "out" ? T.accent : T.bg, color: m.f === "out" ? "#fff" : T.text, border: m.f === "out" ? "none" : "1px solid " + T.line, borderRadius: 12, padding: "8px 12px", fontFamily: T.sans, fontSize: 12.5 } }, m.t, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, opacity: 0.7, marginTop: 3, textAlign: "right" } }, m.h)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: 12, borderTop: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("button", { onClick: aiSuggest, disabled: aiBusy, title: "Sugerir respuesta con IA (Groq)", style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: aiBusy ? T.textFaint : "#8B6FE0", background: "transparent", border: "1px solid " + (aiBusy ? T.line : "#8B6FE0"), borderRadius: 8, padding: "0 12px", cursor: aiBusy ? "default" : "pointer", whiteSpace: "nowrap" } }, aiBusy ? "\u2026" : "\u2726 IA"), /* @__PURE__ */ React.createElement("input", { value: draft, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => e.key === "Enter" && send(), placeholder: "Escribe una respuesta\u2026", style: { flex: 1, fontFamily: T.sans, fontSize: 13, padding: "9px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text } }), /* @__PURE__ */ React.createElement("button", { onClick: send, style: { fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "0 16px", cursor: "pointer" } }, "Enviar"))) : /* @__PURE__ */ React.createElement(Empty2, { T }, "Selecciona una conversaci\xF3n."))), darCita && /* @__PURE__ */ React.createElement(NewCitaModal, { T, patients: patients || [], prefill: { patName: darCita.name, phone: darCita.phone }, onClose: () => setDarCita(null), onSave: handleSaveCita }), citaOk && /* @__PURE__ */ React.createElement(CitaAgendadaOkPopup, { T, cita: citaOk, appts, onClose: () => setCitaOk(null) }), showGuide && /* @__PURE__ */ React.createElement(WhatsAppSetupModal, { T, onClose: () => setShowGuide(false) }), showMetaGuide && /* @__PURE__ */ React.createElement(MetaBizGuideModal, { T, onClose: () => setShowMetaGuide(false) }));
}
const INV_SEED = [
  { id: "i1", name: "Toxina botul\xEDnica 100U", cat: "Insumo cl\xEDnico", stock: 6, min: 4, unit: "viales", price: 95e3 },
  { id: "i2", name: "\xC1cido hialur\xF3nico (jeringa)", cat: "Insumo cl\xEDnico", stock: 3, min: 5, unit: "jeringas", price: 7e4 },
  { id: "i3", name: "Sculptra (PLLA)", cat: "Insumo cl\xEDnico", stock: 8, min: 3, unit: "viales", price: 12e4 },
  { id: "i4", name: "Aguja 30G x 13mm", cat: "Fungible", stock: 100, min: 100, unit: "unidades", price: 130, boxSize: 100 },
  { id: "i4b", name: "Aguja 32G x 4mm", cat: "Fungible", stock: 100, min: 100, unit: "unidades", price: 150, boxSize: 100 },
  { id: "i9", name: "Jeringas", cat: "Fungible", stock: 100, min: 100, unit: "unidades", price: 90, boxSize: 100 },
  { id: "i5", name: "Guantes nitrilo (caja)", cat: "Fungible", stock: 2, min: 4, unit: "cajas", price: 9e3 },
  { id: "i6", name: "C\xE1nulas 25G", cat: "Fungible", stock: 14, min: 10, unit: "unidades", price: 2500 },
  { id: "i7", name: "Anestesia t\xF3pica", cat: "Insumo cl\xEDnico", stock: 5, min: 3, unit: "tubos", price: 8e3 },
  { id: "i8", name: "Gasas (caja 50u)", cat: "Fungible", stock: 100, min: 50, unit: "unidades", price: 30, boxSize: 50 },
  { id: "i10", name: "Repuestos Dermapen", cat: "Fungible", stock: 20, min: 10, unit: "unidades", price: 4e3 },
  { id: "i11", name: "L\xE1piz marcador", cat: "Fungible", stock: 10, min: 5, unit: "unidades", price: 1200 },
  { id: "i12", name: "Cinta de piel (microporo)", cat: "Fungible", stock: 8, min: 4, unit: "unidades", price: 1500 },
  { id: "i13", name: "Corchetes", cat: "Fungible", stock: 5, min: 2, unit: "unidades", price: 2500 },
  { id: "i14", name: "Sacapuntas", cat: "Fungible", stock: 4, min: 2, unit: "unidades", price: 1500 },
  { id: "i15", name: "Mascarillas (caja)", cat: "Fungible", stock: 100, min: 50, unit: "unidades", price: 60, boxSize: 100 },
  { id: "i16", name: "Baja lenguas (caja 100u)", cat: "Fungible", stock: 100, min: 50, unit: "unidades", price: 25, boxSize: 100 },
  { id: "i17", name: "Cofias (paquete 100u)", cat: "Fungible", stock: 100, min: 50, unit: "unidades", price: 40, boxSize: 100 },
  { id: "i18", name: "Alusa plast (film para anestesia)", cat: "Fungible", stock: 3, min: 2, unit: "rollos", price: 2e3 },
  { id: "i19", name: "L\xE1pices de pasta", cat: "Fungible", stock: 12, min: 5, unit: "unidades", price: 500 }
];
const PROC_SEED = [
  { id: "pr1", name: "Botox 3 zonas", cobro: 15e4, method: "Transferencia", uses: [["i1", 0.5], ["i4", 3], ["i7", 1], ["i8", 1]] },
  { id: "pr2", name: "Rinomodelaci\xF3n", cobro: 17e4, method: "Transferencia", uses: [["i2", 1], ["i6", 1], ["i4", 2], ["i8", 4]] },
  { id: "pr3", name: "Bioestimulaci\xF3n (Sculptra)", cobro: 45e4, method: "Transferencia", uses: [["i3", 2], ["i4", 2], ["i8", 5]] }
];
function cashAll() {
  try {
    return window.DB && DB.get("cash_moves") || [];
  } catch (e) {
    return [];
  }
}
function cashNotify() {
  try {
    window.dispatchEvent(new Event("jcm:cash"));
  } catch (e) {
  }
}
function cashSave(v) {
  try {
    if (window.DB) DB.set("cash_moves", v);
  } catch (e) {
  }
  cashNotify();
}
function cashAdd(mv) {
  const all = cashAll();
  all.push({ id: "cm" + Date.now() + Math.random().toString(36).slice(2, 5), ts: (/* @__PURE__ */ new Date()).toISOString(), ...mv });
  cashSave(all);
  try {
    if (window.jcmAudit) {
      const D = window.JCDATA;
      const monto = D && D.fmt ? D.fmt(mv.amount || 0) : "$" + (mv.amount || 0);
      window.jcmAudit((mv.type === "egreso" ? "Egreso" : "Cobro") + " " + monto + (mv.concept ? " \xB7 " + mv.concept : "") + (mv.method ? " \xB7 " + mv.method : ""));
    }
  } catch (e) {
  }
}
function cashDelete(id) {
  cashSave(cashAll().filter((m) => m.id !== id));
}
function _localDay(d) {
  d = d ? new Date(d) : /* @__PURE__ */ new Date();
  if (isNaN(d)) return "";
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function cashToday() {
  const t = _localDay();
  return cashAll().filter((m) => _localDay(m.ts) === t);
}
function _billDay(dateStr) {
  const s = ("" + (dateStr || "")).trim().replace(/[.\s]+$/, "");
  const m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (m) {
    let yy = +m[3];
    if (yy < 100) yy += 2e3;
    return yy + "-" + String(+m[2]).padStart(2, "0") + "-" + String(+m[1]).padStart(2, "0");
  }
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return iso[1] + "-" + iso[2] + "-" + iso[3];
  const t = Date.parse(s);
  return isNaN(t) ? "" : _localDay(t);
}
function cashUpdate(id, patch) {
  cashSave(cashAll().map((m) => m.id === id ? { ...m, ...patch } : m));
}
function billingUpdateMethod(patId, billId, metodo) {
  try {
    const pts = window.DB && DB.get("patients") || [];
    DB.set("patients", pts.map((p) => p.id === patId ? { ...p, billing: (p.billing || []).map((b) => b.id === billId ? { ...b, metodo } : b) } : p));
    cashNotify();
  } catch (e) {
  }
}
function billingDelete(patId, billId) {
  try {
    const pts = window.DB && DB.get("patients") || [];
    DB.set("patients", pts.map((p) => p.id === patId ? { ...p, billing: (p.billing || []).filter((b) => b.id !== billId) } : p));
    cashNotify();
  } catch (e) {
  }
}
function cashMovimientos() {
  const cashMoves = cashAll().map((m) => ({ ...m, _day: _localDay(m.ts), _src: "caja" }));
  const seen = {};
  cashMoves.forEach((m) => {
    if (m.kind === "atencion") seen[(m.patient || "").toLowerCase().trim() + "|" + (m.amount || 0) + "|" + m._day] = true;
  });
  const out = cashMoves.slice();
  let pts = [];
  try {
    pts = window.DB && DB.get("patients") || [];
  } catch (e) {
  }
  (pts || []).forEach((p) => {
    (p.billing || []).forEach((b) => {
      if (!b.paid || !(b.amount > 0)) return;
      const day = _billDay(b.date);
      if (seen[(p.name || "").toLowerCase().trim() + "|" + (b.amount || 0) + "|" + day]) return;
      out.push({
        id: "bill_" + p.id + "_" + (b.id || ""),
        type: "ingreso",
        kind: "atencion",
        amount: b.amount || 0,
        cost: 0,
        method: b.metodo || "Otro",
        concept: (b.concept || "Atenci\xF3n") + " \xB7 " + (p.name || ""),
        _day: day,
        ts: (day || _localDay()) + "T12:00:00",
        _src: "billing",
        _patId: p.id,
        _billId: b.id
      });
    });
  });
  return out;
}
function invSeed() {
  return window.JCM_BASE || !(window.JCSAAS && window.JCSAAS.enabled) ? INV_SEED : [];
}
function procSeed() {
  return window.JCM_BASE || !(window.JCSAAS && window.JCSAAS.enabled) ? PROC_SEED : [];
}
function invLoad() {
  try {
    var v = window.DB && DB.get("inv_items");
    return Array.isArray(v) ? v : invSeed();
  } catch (e) {
    return invSeed();
  }
}
function invSave(v) {
  try {
    if (window.DB) DB.set("inv_items", v);
  } catch (e) {
  }
}
function procLoad() {
  try {
    var v = window.DB && DB.get("inv_procs");
    return Array.isArray(v) ? v : procSeed();
  } catch (e) {
    return procSeed();
  }
}
function procSave(v) {
  try {
    if (window.DB) DB.set("inv_procs", v);
  } catch (e) {
  }
}
function procCost(p, items) {
  return (p.uses || []).reduce((s, u) => {
    const it = items.find((x) => x.id === u[0]);
    return s + (it ? it.price * u[1] : 0);
  }, 0);
}
function jcmInsumoCost(procName) {
  try {
    if (!(typeof clinicSeeded === "function" && clinicSeeded())) return 0;
    const n = (procName || "").toLowerCase().trim();
    if (!n) return 0;
    const procs = procLoad();
    const items = invLoad();
    const p = procs.find((x) => (x.name || "").toLowerCase().trim() === n);
    return p ? procCost(p, items) : 0;
  } catch (e) {
    return 0;
  }
}
function jcmAdCostPerPatient() {
  try {
    return typeof clinicSeeded === "function" && clinicSeeded() ? 5e3 : 0;
  } catch (e) {
    return 0;
  }
}
function InvKpiModal({ T, title, items, onClose, onAdjust }) {
  const D = window.JCDATA;
  const [, forceUpdate] = useState(0);
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: title + " (" + items.length + ")", onClose }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, items.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textFaint, padding: "12px 0" } }, "Sin productos en esta categor\xEDa."), items.map((i) => {
    const lo = i.stock > 0 && i.stock <= i.min;
    const out = i.stock <= 0;
    return /* @__PURE__ */ React.createElement("div", { key: i.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, i.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, i.cat, " \xB7 m\xEDn ", i.min, " ", i.unit, i.venc ? " \xB7 vence " + new Date(i.venc).toLocaleDateString("es-CL") : "")), onAdjust && /* @__PURE__ */ React.createElement("button", { onClick: () => {
      onAdjust(i.id, -1);
      forceUpdate((n) => n + 1);
    }, style: invAdj(T) }, "\u2212"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: out ? "#C0285A" : lo ? "#C9A227" : T.text, minWidth: 28, textAlign: "center" } }, i.stock), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute } }, i.unit), onAdjust && /* @__PURE__ */ React.createElement("button", { onClick: () => {
      onAdjust(i.id, 1);
      forceUpdate((n) => n + 1);
    }, style: invAdj(T) }, "+"), /* @__PURE__ */ React.createElement(AdTag, { T, tone: out ? "danger" : lo ? "warn" : "ok" }, out ? "Agotado" : lo ? "Bajo" : "OK"));
  })));
}
function InventarioView({ T }) {
  const D = window.JCDATA;
  const [items, setItemsR] = useState(invLoad());
  const [procs, setProcsR] = useState(procLoad());
  const [q, setQ] = useState("");
  const [nuevo, setNuevo] = useState(false);
  const [edit, setEdit] = useState(null);
  const [nuevoProc, setNuevoProc] = useState(false);
  const [editProc, setEditProc] = useState(null);
  const [scan, setScan] = useState(false);
  const [catFilter, setCatFilter] = useState("Todas");
  const [msg, setMsg] = useState("");
  const [invKpi, setInvKpi] = useState(null);
  function applyInvoice(rows) {
    setItems((its) => {
      const next = its.slice();
      rows.forEach((r) => {
        const qty = Math.max(0, parseInt(r.qty, 10) || 0);
        if (!r.name.trim() || !qty) return;
        const i = next.findIndex((x) => x.name.trim().toLowerCase() === r.name.trim().toLowerCase());
        if (i >= 0) next[i] = { ...next[i], stock: next[i].stock + qty, price: parseInt(r.price, 10) || next[i].price };
        else next.push({ id: "i" + Date.now() + Math.floor(Math.random() * 999), name: r.name.trim(), cat: r.cat || "Insumo cl\xEDnico", stock: qty, min: 3, unit: r.unit || "unidades", price: parseInt(r.price, 10) || 0 });
      });
      return next;
    });
    setScan(false);
    setMsg("Factura aplicada: stock actualizado.");
    setTimeout(() => setMsg(""), 3200);
  }
  const setItems = (v) => {
    const nv = typeof v === "function" ? v(items) : v;
    setItemsR(nv);
    invSave(nv);
  };
  const setProcs = (v) => {
    const nv = typeof v === "function" ? v(procs) : v;
    setProcsR(nv);
    procSave(nv);
  };
  const low = items.filter((i) => i.stock > 0 && i.stock <= i.min);
  const out = items.filter((i) => i.stock <= 0);
  const _hoy0 = /* @__PURE__ */ new Date();
  _hoy0.setHours(0, 0, 0, 0);
  const porVencer = items.filter((i) => {
    if (!i.venc) return false;
    const d = new Date(i.venc);
    if (isNaN(d)) return false;
    const dias = (d - _hoy0) / 864e5;
    return dias >= 0 && dias <= 60;
  });
  const cats = Array.from(new Set(items.map((i) => i.cat || "Sin categor\xEDa"))).sort();
  const ql = q.trim().toLowerCase();
  const list = items.filter((i) => catFilter === "Todas" || (i.cat || "Sin categor\xEDa") === catFilter).filter((i) => !ql || i.name.toLowerCase().includes(ql) || (i.cat || "").toLowerCase().includes(ql));
  const valor = items.reduce((s, i) => s + i.stock * i.price, 0);
  function adjust(id, d) {
    setItems(items.map((i) => i.id === id ? { ...i, stock: Math.max(0, i.stock + d) } : i));
  }
  async function delItem(it) {
    const ok = await (window.jcmConfirm ? window.jcmConfirm('\xBFEliminar "' + it.name + '" del inventario? Esta acci\xF3n no se puede deshacer.', { danger: true }) : Promise.resolve(window.confirm('\xBFEliminar "' + it.name + '" del inventario?')));
    if (!ok) return;
    setItems(items.filter((x) => x.id !== it.id));
    setMsg('"' + it.name + '" eliminado del inventario.');
    setTimeout(() => setMsg(""), 3e3);
  }
  const invName = (id) => {
    const it = items.find((x) => x.id === id);
    return it ? it.name : id;
  };
  function aplicarProc(p) {
    setItems((its) => its.map((i) => {
      const u = p.uses.find((x) => x[0] === i.id);
      return u ? { ...i, stock: Math.max(0, i.stock - u[1]) } : i;
    }));
    const costo = procCost(p, items);
    cashAdd({ type: "ingreso", kind: "atencion", amount: p.cobro || 0, cost: costo, method: p.method || "Efectivo", concept: p.name });
    setMsg("Registrado: " + p.name + (p.cobro ? " \xB7 cobro " + D.fmt(p.cobro) : "") + " \xB7 insumos descontados");
    setTimeout(() => setMsg(""), 3200);
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Inventario", sub: "Stock de insumos y fungibles" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { onClick: () => setInvKpi("all"), style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: items.length, l: "Productos" })), /* @__PURE__ */ React.createElement("div", { onClick: () => low.length && setInvKpi("low"), style: { cursor: low.length ? "pointer" : "default" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: low.length, l: "Stock bajo", accent: low.length > 0 })), /* @__PURE__ */ React.createElement("div", { onClick: () => setInvKpi("out"), style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: out.length, l: "Agotados", accent: out.length > 0 })), /* @__PURE__ */ React.createElement("div", { onClick: () => setInvKpi("vencer"), style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: porVencer.length, l: "Por vencer", accent: porVencer.length > 0 })), /* @__PURE__ */ React.createElement("div", { style: { cursor: "default" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: D.fmt(valor), l: "Valor inventario" }))), invKpi === "all" && /* @__PURE__ */ React.createElement(InvKpiModal, { T, title: "Todos los productos", items, onClose: () => setInvKpi(null), onAdjust: adjust }), invKpi === "low" && /* @__PURE__ */ React.createElement(InvKpiModal, { T, title: "Stock bajo", items: low, onClose: () => setInvKpi(null), onAdjust: adjust }), invKpi === "out" && /* @__PURE__ */ React.createElement(InvKpiModal, { T, title: "Agotados", items: out, onClose: () => setInvKpi(null), onAdjust: adjust }), invKpi === "vencer" && /* @__PURE__ */ React.createElement(InvKpiModal, { T, title: "Por vencer", items: porVencer, onClose: () => setInvKpi(null), onAdjust: adjust }), low.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(192,40,90,.08)", border: "1px solid rgba(192,40,90,.35)", borderRadius: 8, padding: "12px 14px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: "#C0285A", marginBottom: 4 } }, "\u26A0 Reponer pronto"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, low.map((i) => i.name + " (" + i.stock + ")").join(" \xB7 "))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar insumo\u2026", style: { flex: 1, padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" } }), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => setScan(true) }, "Escanear factura/boleta"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setNuevo(true) }, "+ Producto")), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { display: "flex", gap: 7, overflowX: "auto", marginBottom: 14, paddingBottom: 2 } }, ["Todas", ...cats].map((c) => /* @__PURE__ */ React.createElement("button", { key: c, onClick: () => setCatFilter(c), style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, fontWeight: 500, padding: "6px 13px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", border: "1px solid " + (catFilter === c ? T.accent : T.chipBorder), background: catFilter === c ? T.accent : T.chipBg, color: catFilter === c ? T.onAccent || "#fff" : T.textMute } }, c))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, list.map((i) => {
    const lo = i.stock <= i.min;
    return /* @__PURE__ */ React.createElement("div", { key: i.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "13px 4px", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, i.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, i.cat, " \xB7 m\xEDn ", i.min, " ", i.unit, " \xB7 costo ", D.fmt(i.price))), /* @__PURE__ */ React.createElement("button", { onClick: () => setEdit(i), title: "Editar", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M12 20h9" }), /* @__PURE__ */ React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => adjust(i.id, -1), style: invAdj(T) }, "\u2212"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 18, color: lo ? "#C0285A" : T.text, minWidth: 30, textAlign: "center" } }, i.stock), /* @__PURE__ */ React.createElement("button", { onClick: () => adjust(i.id, 1), style: invAdj(T) }, "+")), i.stock <= 0 ? /* @__PURE__ */ React.createElement(AdTag, { T, tone: "danger" }, "Agotado") : lo ? /* @__PURE__ */ React.createElement(AdTag, { T, tone: "warn" }, "Bajo") : /* @__PURE__ */ React.createElement(AdTag, { T, tone: "ok" }, "OK"), /* @__PURE__ */ React.createElement("button", { onClick: () => delItem(i), title: "Eliminar producto", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ React.createElement("path", { d: "M19 6l-1 14H6L5 6" }), /* @__PURE__ */ React.createElement("path", { d: "M10 11v6M14 11v6" }), /* @__PURE__ */ React.createElement("path", { d: "M9 6V4h6v2" }))));
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", margin: "26px 0 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Procedimientos \xB7 consumo autom\xE1tico"), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: () => setNuevoProc(true) }, "+ Procedimiento")), msg && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(31,138,91,.10)", border: "1px solid rgba(31,138,91,.4)", borderRadius: 8, padding: "10px 13px", marginBottom: 12, fontFamily: T.sans, fontSize: 12, color: "#1F8A5B" } }, "\u2713 ", msg), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, procs.map((p) => {
    const costo = procCost(p, items);
    const liquido = (p.cobro || 0) - costo;
    return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { padding: "13px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setEditProc(p), title: "Editar", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M12 20h9" }), /* @__PURE__ */ React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" }))), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: () => aplicarProc(p) }, "Registrar realizado"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 14, marginTop: 8, fontFamily: T.sans, fontSize: 11 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, "Cobro ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, D.fmt(p.cobro || 0))), /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, "Costo insumos ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, D.fmt(costo))), /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, "L\xEDquido ", /* @__PURE__ */ React.createElement("b", { style: { color: liquido >= 0 ? "#1F8A5B" : "#C0285A" } }, D.fmt(liquido)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 9 } }, p.uses.map((u, k) => /* @__PURE__ */ React.createElement("span", { key: k, style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, background: T.bg, border: "1px solid " + T.lineSoft, borderRadius: 999, padding: "4px 9px" } }, invName(u[0]), " \xD7 ", u[1] % 1 === 0 ? u[1] : ("" + u[1]).replace(".", ",") + " vial"))));
  })), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 } }, 'Define qu\xE9 insumos consume cada procedimiento. Al tocar "Registrar realizado", se descuentan autom\xE1ticamente del stock.'), scan && /* @__PURE__ */ React.createElement(InvScanModal, { T, onClose: () => setScan(false), onApply: applyInvoice }), nuevo && /* @__PURE__ */ React.createElement(NewInvModal, { T, onClose: () => setNuevo(false), onSave: (it) => {
    setItems([{ ...it, id: "i" + Date.now() }, ...items]);
    setNuevo(false);
  } }), edit && /* @__PURE__ */ React.createElement(NewInvModal, { T, initial: edit, onClose: () => setEdit(null), onSave: (it) => {
    setItems(items.map((x) => x.id === edit.id ? { ...x, ...it } : x));
    setEdit(null);
  } }), nuevoProc && /* @__PURE__ */ React.createElement(NewProcModal, { T, items, onClose: () => setNuevoProc(false), onSave: (pr) => {
    setProcs([...procs, { ...pr, id: "pr" + Date.now() }]);
    setNuevoProc(false);
  } }), editProc && /* @__PURE__ */ React.createElement(NewProcModal, { T, items, initial: editProc, onClose: () => setEditProc(null), onSave: (pr) => {
    setProcs(procs.map((x) => x.id === editProc.id ? { ...x, ...pr } : x));
    setEditProc(null);
  } }));
}
function invAdj(T) {
  return { width: 28, height: 28, borderRadius: 6, border: "1px solid " + T.chipBorder, background: T.surface, color: T.text, cursor: "pointer", fontSize: 16, lineHeight: 1 };
}
function invFileToDataURL(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w >= h) {
            h = Math.round(h * maxDim / w);
            w = maxDim;
          } else {
            w = Math.round(w * maxDim / h);
            h = maxDim;
          }
        }
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
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
  const oneEmpty = () => [{ name: "", cat: "Insumo cl\xEDnico", qty: "1", price: "0", unit: "unidades" }];
  async function onFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    e.target.value = "";
    setFile(f.name);
    setErr("");
    if (f.type === "application/pdf" || /\.pdf$/i.test(f.name)) {
      setErr("La lectura autom\xE1tica funciona con FOTOS (JPG/PNG). Para un PDF, toma una captura de pantalla de la factura y s\xFAbela, o agrega los productos a mano abajo.");
      setRows(oneEmpty());
      return;
    }
    setBusy(true);
    setRows([]);
    try {
      const dataUrl = await invFileToDataURL(f, 1600, 0.82);
      const idt = window.JCSAAS && window.JCSAAS.idToken ? await window.JCSAAS.idToken() : null;
      const headers = { "Content-Type": "application/json" };
      if (idt) headers["Authorization"] = "Bearer " + idt;
      const resp = await fetch("/api/ai", { method: "POST", headers, body: JSON.stringify({ task: "scan_invoice", image: dataUrl }) });
      const d = await resp.json().catch(() => ({}));
      setBusy(false);
      if (d && d.ok && Array.isArray(d.items) && d.items.length) {
        setRows(d.items.map((it) => ({ name: it.name || "", cat: it.cat || "Insumo cl\xEDnico", qty: String(it.qty || 1), price: String(it.price || 0), unit: "unidades" })));
      } else if (d && d.ok) {
        setErr("No detect\xE9 productos en la imagen. Revisa que se vea el detalle de la factura, o agr\xE9galos a mano abajo.");
        setRows(oneEmpty());
      } else {
        setErr(d && d.error || "No se pudo leer la factura. Agrega los productos a mano abajo.");
        setRows(oneEmpty());
      }
    } catch (e2) {
      setBusy(false);
      setErr("No se pudo procesar la imagen. Agrega los productos a mano abajo.");
      setRows(oneEmpty());
    }
  }
  function setRow(i, k, v) {
    setRows(rows.map((r, j) => j === i ? { ...r, [k]: v } : r));
  }
  function addRow() {
    setRows([...rows, { name: "", cat: "Insumo cl\xEDnico", qty: "1", price: "0", unit: "unidades" }]);
  }
  function delRow(i) {
    setRows(rows.filter((_, j) => j !== i));
  }
  const inp = { fontFamily: T.sans, fontSize: 12.5, padding: "8px 10px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", width: "100%" };
  return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, style: { position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,.5)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: "100%", maxWidth: 680, maxHeight: "88vh", overflowY: "auto", background: T.bg, border: "1px solid " + T.line, borderRadius: 14, padding: "22px 22px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 24, color: T.text, margin: 0 } }, "Escanear factura o boleta"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { style: { background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + T.line, borderRadius: 8, padding: "10px 13px", marginBottom: 16, fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, "Sube una ", /* @__PURE__ */ React.createElement("b", null, "foto n\xEDtida"), " de la boleta/factura. La ", /* @__PURE__ */ React.createElement("b", null, "lectura autom\xE1tica con IA"), " lee el nombre, la cantidad y el costo con IVA de cada producto; aqu\xED los revisas antes de sumarlos al stock."), !file ? /* @__PURE__ */ React.createElement("button", { onClick: () => fileRef.current.click(), style: { width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "40px 20px", border: "1.5px dashed " + T.chipBorder, borderRadius: 12, background: T.surface, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "34", height: "34", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.5" }, /* @__PURE__ */ React.createElement("path", { d: "M12 16V4M7 9l5-5 5 5M5 20h14" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 18, color: T.text } }, "Subir factura o boleta (foto)"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, "JPG o PNG de la compra \xB7 arrastra el archivo o haz clic")) : busy ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "44px 20px" } }, /* @__PURE__ */ React.createElement("svg", { width: "30", height: "30", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "2", style: { animation: "jcSpin 1s linear infinite" } }, /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 1 1-6.2-8.6" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, "Leyendo la factura con IA\u2026"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "\u{1F4C4} ", file)) : /* @__PURE__ */ React.createElement(React.Fragment, null, err && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(192,40,90,.08)", border: "1px solid rgba(192,40,90,.35)", borderRadius: 8, padding: "10px 13px", marginBottom: 12, fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", lineHeight: 1.5 } }, err), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.accent } }, "\u{1F4C4} ", file, " \xB7 productos detectados (ed\xEDtalos si es necesario):"), /* @__PURE__ */ React.createElement("button", { onClick: () => fileRef.current.click(), style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" } }, "Otra foto")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "2.4fr 1.4fr .8fr 1fr 28px", gap: 6, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", null, "Producto"), /* @__PURE__ */ React.createElement("span", null, "Categor\xEDa"), /* @__PURE__ */ React.createElement("span", null, "Cant."), /* @__PURE__ */ React.createElement("span", null, "Costo c/u"), /* @__PURE__ */ React.createElement("span", null)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, rows.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "grid", gridTemplateColumns: "2.4fr 1.4fr .8fr 1fr 28px", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { style: inp, value: r.name, onChange: (e) => setRow(i, "name", e.target.value), placeholder: "Producto" }), /* @__PURE__ */ React.createElement("input", { style: inp, value: r.cat, onChange: (e) => setRow(i, "cat", e.target.value) }), /* @__PURE__ */ React.createElement("input", { style: inp, value: r.qty, onChange: (e) => setRow(i, "qty", e.target.value.replace(/[^\d]/g, "")) }), /* @__PURE__ */ React.createElement("input", { style: inp, value: r.price, onChange: (e) => setRow(i, "price", e.target.value.replace(/[^\d]/g, "")) }), /* @__PURE__ */ React.createElement("button", { onClick: () => delRow(i), style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))))), /* @__PURE__ */ React.createElement("button", { onClick: addRow, style: { marginTop: 10, fontFamily: T.sans, fontSize: 11.5, color: T.accent, background: "none", border: "1px dashed " + T.chipBorder, borderRadius: 7, padding: "8px 12px", cursor: "pointer" } }, "+ Agregar l\xEDnea"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.text, background: "transparent", border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "10px 16px", cursor: "pointer" } }, "Cancelar"), /* @__PURE__ */ React.createElement("button", { onClick: () => onApply(rows), style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer" } }, "Agregar al stock (", rows.length, ")"))), /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*,application/pdf", onChange: onFile, style: { display: "none" } })));
}
function NewInvModal({ T, onClose, onSave, initial }) {
  const [f, setF] = useState(initial ? { name: initial.name, cat: initial.cat, stock: "" + initial.stock, min: "" + initial.min, unit: initial.unit, price: "" + (initial.price || ""), boxSize: initial.boxSize ? "" + initial.boxSize : "", venc: initial.venc || "" } : { name: "", cat: "Insumo cl\xEDnico", stock: "", min: "", unit: "unidades", price: "", boxSize: "", venc: "" });
  const [modo, setModo] = useState("unidad");
  const ok = f.name.trim();
  const bs = parseInt(f.boxSize, 10) || 0;
  const entered = parseInt(f.stock, 10) || 0;
  const stockTotal = modo === "caja" && bs ? entered * bs : entered;
  const sel = { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: initial ? "Editar producto" : "Nuevo producto", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave({ name: f.name, cat: f.cat, stock: stockTotal, min: parseInt(f.min, 10) || 0, unit: f.unit, price: parseInt(f.price, 10) || 0, boxSize: bs || void 0, venc: f.venc || void 0 }) }, initial ? "Guardar cambios" : "Guardar producto") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre", value: f.name, onChange: (v) => setF({ ...f, name: v }), placeholder: "Ej: \xC1cido hialur\xF3nico" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Unidad de stock"), /* @__PURE__ */ React.createElement("select", { value: f.unit, onChange: (e) => setF({ ...f, unit: e.target.value }), style: sel }, /* @__PURE__ */ React.createElement("option", null, "unidades"), /* @__PURE__ */ React.createElement("option", null, "viales"), /* @__PURE__ */ React.createElement("option", null, "jeringas"), /* @__PURE__ */ React.createElement("option", null, "tubos"), /* @__PURE__ */ React.createElement("option", null, "cajas"), /* @__PURE__ */ React.createElement("option", null, "paquetes"), /* @__PURE__ */ React.createElement("option", null, "rollos"))), /* @__PURE__ */ React.createElement(AdField, { T, label: "Unidades por caja (opcional)", value: f.boxSize, onChange: (v) => setF({ ...f, boxSize: v.replace(/\D/g, "") }), inputMode: "numeric", placeholder: "Ej. 100" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Ingresar stock por"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["unidad", "Unidad"], ["caja", bs ? "Caja (\xD7" + bs + ")" : "Caja"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, type: "button", disabled: k === "caja" && !bs, onClick: () => setModo(k), style: { flex: 1, fontFamily: T.sans, fontSize: 12, padding: "10px", borderRadius: 7, cursor: k === "caja" && !bs ? "not-allowed" : "pointer", opacity: k === "caja" && !bs ? 0.45 : 1, background: modo === k ? T.accent : T.surface, color: modo === k ? T.onAccent || "#fff" : T.textMute, border: "1px solid " + (modo === k ? T.accent : T.line) } }, l)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: modo === "caja" ? "Cajas a ingresar" : "Stock actual", value: f.stock, onChange: (v) => setF({ ...f, stock: v.replace(/\D/g, "") }), inputMode: "numeric" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Stock m\xEDnimo (unidades)", value: f.min, onChange: (v) => setF({ ...f, min: v.replace(/\D/g, "") }), inputMode: "numeric" })), modo === "caja" && bs > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.accent } }, "Total a registrar: ", /* @__PURE__ */ React.createElement("b", null, stockTotal, " unidades"), " (", entered, " caja(s) \xD7 ", bs, ")."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Costo por unidad (CLP)", value: f.price, onChange: (v) => setF({ ...f, price: v.replace(/\D/g, "") }), inputMode: "numeric" }), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Fecha de vencimiento"), /* @__PURE__ */ React.createElement("input", { type: "date", value: f.venc, onChange: (e) => setF({ ...f, venc: e.target.value }), style: sel }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint } }, 'El insumo aparecer\xE1 en "Por vencer" cuando falten 60 d\xEDas o menos para su vencimiento.')));
}
function NewProcModal({ T, items, onClose, onSave, initial }) {
  const [name, setName] = useState(initial ? initial.name : "");
  const [cobro, setCobro] = useState(initial && initial.cobro ? "" + initial.cobro : "");
  const [method, setMethod] = useState(initial && initial.method ? initial.method : "Efectivo");
  const [uses, setUses] = useState(initial ? (initial.uses || []).reduce((a, u) => (a[u[0]] = u[1], a), {}) : {});
  const stepFor = (it) => /vial/i.test(it && it.unit || "") ? 0.5 : 1;
  function setQty(id, q, step) {
    step = step || 1;
    q = Math.max(0, Math.round(q / step) * step);
    q = Math.round(q * 100) / 100;
    setUses((u) => {
      const n = { ...u };
      if (q === 0) delete n[id];
      else n[id] = q;
      return n;
    });
  }
  const ok = name.trim().length > 1 && Object.keys(uses).length > 0;
  const costo = Object.keys(uses).reduce((s, id) => {
    const it = items.find((x) => x.id === id);
    return s + (it ? it.price * uses[id] : 0);
  }, 0);
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: initial ? "Editar procedimiento" : "Nuevo procedimiento", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave({ name: name.trim(), cobro: parseInt(cobro, 10) || 0, method, uses: Object.keys(uses).map((id) => [id, uses[id]]) }) }, initial ? "Guardar cambios" : "Guardar procedimiento") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre del procedimiento", value: name, onChange: setName, placeholder: "Ej: Relleno de labios" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Cobro al paciente (CLP)", value: cobro, onChange: (v) => setCobro(v.replace(/\D/g, "")), inputMode: "numeric", placeholder: "150000" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "M\xE9todo de pago"), /* @__PURE__ */ React.createElement("select", { value: method, onChange: (e) => setMethod(e.target.value), style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }, /* @__PURE__ */ React.createElement("option", null, "Efectivo"), /* @__PURE__ */ React.createElement("option", null, "D\xE9bito"), /* @__PURE__ */ React.createElement("option", null, "Cr\xE9dito"), /* @__PURE__ */ React.createElement("option", null, "Transferencia")))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Costo insumos seleccionados: ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, window.JCDATA.fmt(costo)), " \xB7 l\xEDquido estimado ", /* @__PURE__ */ React.createElement("b", { style: { color: (parseInt(cobro, 10) || 0) - costo >= 0 ? "#1F8A5B" : "#C0285A" } }, window.JCDATA.fmt((parseInt(cobro, 10) || 0) - costo))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 4 } }, "Insumos que consume"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginBottom: 8, lineHeight: 1.5 } }, "Los insumos en ", /* @__PURE__ */ React.createElement("b", { style: { color: T.textMute } }, "viales"), " (ej. toxina botul\xEDnica) se descuentan por ", /* @__PURE__ */ React.createElement("b", { style: { color: T.textMute } }, "medio vial"), " (0,5) o vial completo, ya que un vial rinde para varios pacientes."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7, maxHeight: 280, overflowY: "auto" } }, items.map((i) => {
    const q = uses[i.id] || 0;
    const step = stepFor(i);
    const isVial = step < 1;
    return /* @__PURE__ */ React.createElement("div", { key: i.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 8, background: q ? T.surface2 : T.surface, border: "1px solid " + (q ? T.accent : T.line) } }, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 12.5, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, i.name, isVial && /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint, fontSize: 10.5 } }, " \xB7 por vial")), /* @__PURE__ */ React.createElement("button", { onClick: () => setQty(i.id, q - step, step), style: invAdj(T) }, "\u2212"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, color: T.text, minWidth: isVial ? 46 : 22, textAlign: "center" } }, isVial ? (q % 1 === 0 ? q : q.toString().replace(".", ",")) + (q ? " v" : "") : q), /* @__PURE__ */ React.createElement("button", { onClick: () => setQty(i.id, q + step, step), style: invAdj(T) }, "+"));
  })))));
}
const ADMIN_GROUPS = [
  { title: "Administraci\xF3n", items: ["Convenios", "Gastos", "Gesti\xF3n de profesionales", "Gesti\xF3n de recursos", "Gesti\xF3n de especialidades", "Inventario", "Laboratorios", "Liquidaciones", "Planificaci\xF3n de Box/Sillones", "Usuarios", "Pago Online"] },
  { title: "Configuraci\xF3n", items: ["Agenda Online", "Arancel de precios", "Bancos y entidades financieras", "Documentos cl\xEDnicos", "Consentimientos Informados", "Estados de agenda", "Logotipo", "Opciones de pago", "Pagos anulados y pendientes", "Configuraciones especiales"] }
];
function csvDownload(name, rows) {
  const csv = rows.map((r) => r.map((c) => {
    const s = c == null ? "" : String(c);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent("\uFEFF" + csv);
  a.download = name;
  a.click();
}
function csvParse(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim());
  if (!lines.length) return [];
  const split = (l) => {
    const out = [];
    let cur = "", q = false;
    for (let i = 0; i < l.length; i++) {
      const ch = l[i];
      if (ch === '"') {
        if (q && l[i + 1] === '"') {
          cur += '"';
          i++;
        } else q = !q;
      } else if ((ch === "," || ch === ";") && !q) {
        out.push(cur);
        cur = "";
      } else cur += ch;
    }
    out.push(cur);
    return out;
  };
  const headers = split(lines[0]).map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((l) => {
    const c = split(l);
    const o = {};
    headers.forEach((h, i) => o[h] = (c[i] || "").trim());
    return o;
  });
}
const ADMIN_TABS = [["datos", "Datos / facturaci\xF3n"], ["registro", "Registro de actividad"], ["equipo", "Equipo y permisos"], ["respaldo", "Respaldo / exportar"]];
function optimizePatientsBlock() {
  const DB2 = window.DB;
  if (!DB2) return { ok: false, movedImg: 0, movedCons: 0 };
  let list;
  try {
    list = DB2.get("patients");
  } catch (e) {
    return { ok: false, movedImg: 0, movedCons: 0 };
  }
  if (!Array.isArray(list)) return { ok: false, movedImg: 0, movedCons: 0 };
  let movedImg = 0, movedCons = 0, changed = false;
  const next = list.map((p) => {
    if (!p || p.id == null) return p;
    let np = p;
    if (Array.isArray(p.images) && p.images.length) {
      try {
        const key = "pimg_" + p.id;
        const own = DB2.get(key);
        let merged;
        if (Array.isArray(own)) {
          merged = own.slice();
          p.images.forEach((im) => {
            if (im && (im.id == null || !own.some((o) => o && o.id === im.id))) merged.push(im);
          });
        } else {
          merged = p.images;
        }
        DB2.set(key, merged);
        if (Array.isArray(DB2.get(key))) {
          np = Object.assign({}, np, { images: [] });
          movedImg++;
          changed = true;
        }
      } catch (e) {
      }
    }
    let legacy = p.consents || (p.consentDoc ? [p.consentDoc] : []);
    if ((!legacy || !legacy.length) && (p.consentSig || p.consentSigPro)) {
      legacy = [{ title: p.consentInfo || "Consentimiento", sigPac: p.consentSig || null, sigPro: p.consentSigPro || null, ts: Date.now(), recovered: true }];
    }
    const hasHeavy = legacy && legacy.length || p.consentSig || p.consentSigPro || p.consentDoc || p.consents;
    if (hasHeavy) {
      try {
        const key = "pcons_" + p.id;
        const own = DB2.get(key);
        let target = Array.isArray(own) ? own.slice() : [];
        (legacy || []).forEach((d) => {
          if (d && !target.some((t) => t && t.ts === d.ts)) target.push(d);
        });
        if (target.length) DB2.set(key, target);
        np = Object.assign({}, np, { consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
        movedCons++;
        changed = true;
      } catch (e) {
      }
    }
    try {
      const own = DB2.get("pcons_" + p.id);
      if (Array.isArray(own) && own.length && !np.consent) {
        np = Object.assign({}, np, { consent: true, consentInfo: np.consentInfo || (own[own.length - 1] && own[own.length - 1].title || "Consentimiento firmado") });
        changed = true;
      }
    } catch (e) {
    }
    return np;
  });
  if (changed) {
    try {
      DB2.set("patients", next);
    } catch (e) {
      return { ok: false, movedImg, movedCons };
    }
  }
  return { ok: true, movedImg, movedCons };
}
function patHistKey(id) {
  return "phist_" + id;
}
var _histCache = {};
function _sesKey(s) {
  return s && (s.id || s.ts || (s.date || s.fecha || "") + "|" + (s.proc || s.title || "")) || null;
}
function unionHist(a, b) {
  var out = Array.isArray(a) ? a.slice() : [];
  var seen = {};
  out.forEach(function(s) {
    var k = _sesKey(s);
    if (k) seen[k] = 1;
  });
  (Array.isArray(b) ? b : []).forEach(function(s) {
    var k = _sesKey(s);
    if (!k || !seen[k]) {
      out.push(s);
      if (k) seen[k] = 1;
    }
  });
  return out;
}
function loadPatientsFull() {
  var DB2 = window.DB;
  if (!DB2) return [];
  var idx;
  try {
    idx = DB2.get("patients");
  } catch (e) {
    return [];
  }
  if (!Array.isArray(idx)) return [];
  return idx.map(function(p) {
    if (!p || p.id == null) return p;
    var remote = null;
    try {
      var h = DB2.get(patHistKey(p.id));
      if (Array.isArray(h)) remote = h;
    } catch (e) {
    }
    if (Array.isArray(p.history)) {
      return Object.assign({}, p, { history: remote ? unionHist(p.history, remote) : p.history });
    }
    var hist = remote || [];
    try {
      _histCache[p.id] = JSON.stringify(hist);
    } catch (e) {
    }
    return Object.assign({}, p, { history: hist });
  });
}
function savePatientsLight(list) {
  var DB2 = window.DB;
  if (!DB2) return list;
  var light = (list || []).map(function(p) {
    if (!p || p.id == null) return p;
    if (Array.isArray(p.history)) {
      var js = null;
      try {
        js = JSON.stringify(p.history);
      } catch (e) {
      }
      if (js != null && _histCache[p.id] !== js) {
        try {
          DB2.set(patHistKey(p.id), p.history);
        } catch (e) {
        }
        _histCache[p.id] = js;
      }
      var rest = Object.assign({}, p);
      delete rest.history;
      return rest;
    }
    return p;
  });
  try {
    DB2.set("patients", light);
  } catch (e) {
  }
  return list;
}
if (typeof window !== "undefined") {
  window.optimizePatientsBlock = optimizePatientsBlock;
  window.jcmLoadPatientsFull = loadPatientsFull;
  window.jcmSavePatientsLight = savePatientsLight;
}
function SyncStatusCard({ T, compact }) {
  const [, force] = useState(0);
  const [open, setOpen] = useState(!compact);
  const s = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.syncStatus ? window.JCSAAS.syncStatus() : null;
  if (!s) return null;
  if (compact && !open) {
    const pendC = (s.dirty || []).length;
    return /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(true), style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: pendC ? "rgba(192,40,90,.06)" : T.surface, border: "1px solid " + (pendC ? "#C0285A55" : T.line), borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 9 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: pendC ? "#C0285A" : "#1F8A5B", flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, "Estado de sincronizaci\xF3n"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, pendC === 0 ? "todo sincronizado \u2713" : pendC + " pendiente(s)")), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.accent } }, "Ver detalle \u2193"));
  }
  const fmtSize = (b) => b >= 1048576 ? (b / 1048576).toFixed(2) + " MB" : Math.round(b / 1024) + " KB";
  const dirtySet = {};
  (s.dirty || []).forEach((k) => {
    dirtySet[k] = true;
  });
  const labelOf = (k) => k.indexOf("pcons_") === 0 ? "Consentimientos \xB7 un paciente" : { patients: "Pacientes", appointments: "Agenda", cash_moves: "Caja", inv_items: "Inventario", inv_procs: "Procedimientos", config: "Configuraci\xF3n", team: "Equipo", services_custom: "Servicios", horarios_v1: "Horarios", bookings: "Reservas web", admin_tasks: "Pendientes" }[k] || k;
  const errMsg = { "resource-exhausted": "Supera 1 MB (l\xEDmite de la nube) \u2014 no puede subir.", "permission-denied": "Permiso denegado (reglas o plan).", "unavailable": "Sin conexi\xF3n con la nube.", "unauthenticated": "Sesi\xF3n sin autenticar.", "failed-precondition": "Verificaci\xF3n (App Check) fall\xF3.", "invalid-argument": "Documento demasiado grande (supera 1 MB)." };
  const keys = Object.keys(s.sizes).sort((a, b) => s.sizes[b] - s.sizes[a]);
  const shown = keys.filter((k) => dirtySet[k] || s.sizes[k] > 700 * 1024).slice(0, 14);
  const pend = (s.dirty || []).length;
  const hace = s.lastOk ? Math.round((Date.now() - s.lastOk) / 1e3) : null;
  const patErr = s.errors && s.errors.patients ? s.errors.patients.code : null;
  const patHeavy = (s.sizes.patients || 0) > 920 * 1024 || patErr === "resource-exhausted" || patErr === "invalid-argument";
  return /* @__PURE__ */ React.createElement("div", { style: { background: pend ? "rgba(192,40,90,.06)" : T.surface, border: "1px solid " + (pend ? "#C0285A55" : T.line), borderRadius: 12, padding: "18px 18px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, "Estado de sincronizaci\xF3n"), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, onClick: () => {
    try {
      window.JCSAAS.retrySync();
    } catch (e) {
    }
    window.jcmToast && window.jcmToast("Reintentando subir lo pendiente\u2026", "info");
    setTimeout(() => force((x) => x + 1), 3500);
  } }, "Reintentar ahora")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 12px", lineHeight: 1.5 } }, s.online ? "En l\xEDnea" : "Sin conexi\xF3n", " \xB7 ", pend === 0 ? "todo sincronizado \u2713" : pend + " bloque(s) pendientes de subir", hace != null ? " \xB7 \xFAltima subida hace " + (hace < 60 ? hace + " s" : Math.round(hace / 60) + " min") : "", "."), patHeavy && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(192,40,90,.07)", border: "1px solid #C0285A44", borderRadius: 10, padding: "14px 14px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, fontWeight: 600, marginBottom: 4 } }, 'El bloque "Pacientes" no sube porque pesa demasiado'), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, marginBottom: 12 } }, "Hay im\xE1genes y firmas guardadas dentro de los pacientes que lo inflan. Esto las mueve a su propio espacio (sin perder nada) para que el bloque baje de 1 MB y vuelva a sincronizar. Ten tu respaldo descargado antes de continuar."), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => {
    if (!window.confirm("Se mover\xE1n las im\xE1genes y firmas que est\xE1n dentro de los pacientes a su propio espacio, para que la sincronizaci\xF3n vuelva a funcionar. No se borra ning\xFAn dato. \xBFContinuar?")) return;
    const before = s.sizes.patients || 0;
    const r = optimizePatientsBlock();
    try {
      window.JCSAAS.retrySync();
    } catch (e) {
    }
    setTimeout(() => {
      const ns = window.JCSAAS && window.JCSAAS.syncStatus ? window.JCSAAS.syncStatus() : null;
      const after = ns && ns.sizes ? ns.sizes.patients || 0 : before;
      const kb = (b) => Math.round(b / 1024) + " KB";
      window.jcmToast && window.jcmToast(r.ok ? "Listo: bloque de " + kb(before) + " \u2192 " + kb(after) + ". Subiendo a la nube\u2026" : "No se pudo optimizar; revisa el respaldo.", r.ok ? "ok" : "error");
      force((x) => x + 1);
    }, 2500);
  } }, "Optimizar pacientes ahora")), shown.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint } }, "Todo al d\xEDa, sin bloques pesados.") : shown.map((k) => /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, labelOf(k), dirtySet[k] ? " \xB7 pendiente" : ""), s.errors[k] && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: "#C0285A", marginTop: 2 } }, errMsg[s.errors[k].code] || "Error: " + s.errors[k].code)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: s.sizes[k] > 1048576 ? "#C0285A" : s.sizes[k] > 900 * 1024 ? T.gold || "#C9A227" : T.textMute, fontWeight: s.sizes[k] > 900 * 1024 ? 600 : 400, whiteSpace: "nowrap" } }, fmtSize(s.sizes[k])))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 10, lineHeight: 1.5 } }, "Un bloque en ", /* @__PURE__ */ React.createElement("b", { style: { color: "#C0285A" } }, "rojo"), " cerca o sobre 1 MB es el que no logra subir a la nube. Abre esta pantalla en cada dispositivo para comparar."));
}
function AdministracionView({ T, go, patients, appts, addPatient, updatePatient, markAllPaperConsent }) {
  const D = window.JCDATA;
  const [tab, setTab] = useState("datos");
  const autoPlan = (() => {
    try {
      const c = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic() || null;
      if (!c) return "";
      const p = (c.plan || "").toLowerCase();
      if (p === "trial" || p === "demo" || !p) return "Demo";
      return c.plan.charAt(0).toUpperCase() + c.plan.slice(1);
    } catch (e) {
      return "";
    }
  })();
  const [biz, setBiz] = useState(() => {
    try {
      return DB.get("clinic_biz") || { razon: "", rut: "", plan: "" };
    } catch (e) {
      return { razon: "", rut: "", plan: "" };
    }
  });
  const [msg, setMsg] = useState("");
  const fileRef = useRef(null);
  function flash(t) {
    setMsg(t);
    setTimeout(() => setMsg(""), 3e3);
  }
  function saveBiz() {
    try {
      DB.set("clinic_biz", biz);
    } catch (e) {
    }
    flash("Datos de facturaci\xF3n guardados.");
  }
  function expPac() {
    csvDownload("pacientes.csv", [["Nombre", "RUT", "Tel\xE9fono", "Correo", "Estado"], ...(patients || []).map((p) => [p.name, p.rut || "", p.phone || "", p.email || "", p.consent ? "Con consentimiento" : "Pendiente"])]);
  }
  function expCitas() {
    csvDownload("citas.csv", [["Fecha", "Hora", "Paciente", "Servicio", "Estado", "Precio"], ...(appts || []).map((a) => [a.fecha || "d\xEDa " + a.day, a.time, a.name, a.proc, a.status || "pendiente", a.price || ""])]);
  }
  function expCaja() {
    let mv = [];
    try {
      mv = DB.get("cash_moves") || [];
    } catch (e) {
    }
    csvDownload("caja.csv", [["Fecha", "Tipo", "Concepto", "Monto", "M\xE9todo"], ...mv.map((m) => [(m.ts || "").slice(0, 10), m.type, m.concept || m.kind || "", m.amount || 0, m.method || ""])]);
  }
  function expFull() {
    try {
      var data = {}, prefix = "";
      try {
        var cid = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId() || "";
        prefix = "jcm_" + (cid ? cid + "_" : "");
      } catch (e) {
        prefix = "jcm_";
      }
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(prefix) === 0) {
          var clave = k.slice(prefix.length);
          if (clave === "session" || clave === "admin_pass") continue;
          try {
            data[clave] = JSON.parse(localStorage.getItem(k));
          } catch (e) {
            data[clave] = localStorage.getItem(k);
          }
        }
      }
      var payload = { clinica: window.clinicName ? window.clinicName() : "", exportadoEl: (/* @__PURE__ */ new Date()).toISOString(), datos: data };
      var a = document.createElement("a");
      a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
      a.download = "respaldo-medique-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".json";
      a.click();
      window.jcmToast && window.jcmToast("Respaldo completo descargado.", "ok");
    } catch (e) {
      window.jcmError && window.jcmError("No se pudo generar el respaldo", e);
    }
  }
  function parseFechaImp(s) {
    s = ("" + (s == null ? "" : s)).trim();
    s = s.replace(/[.\s]+$/, "").trim();
    if (!s) return null;
    if (/^\d{5}$/.test(s)) {
      const d = new Date(Date.UTC(1899, 11, 30) + parseInt(s, 10) * 864e5);
      return isNaN(d) ? null : d.getTime();
    }
    const m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})\.?$/);
    if (m) {
      let yy = +m[3];
      if (yy < 100) yy += 2e3;
      const d = new Date(yy, +m[2] - 1, +m[1]);
      return isNaN(d) ? null : d.getTime();
    }
    const t = Date.parse(s);
    return isNaN(t) ? null : t;
  }
  function ingestRows(rows) {
    let headers = null, added = 0, dup = 0, updated = 0;
    const cell = (v) => ("" + (v == null ? "" : v)).trim();
    const isoFromTs = (ts) => {
      if (!ts) return "";
      const d = new Date(ts);
      return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    };
    const newSid = () => window.jcmUid ? window.jcmUid("s") : "s" + Date.now() + Math.random().toString(36).slice(2, 6);
    const seen = new Set((patients || []).map((p) => (p.rut || "").replace(/[^0-9kK]/g, "").toLowerCase()).filter(Boolean));
    for (const fields of rows) {
      const lower = fields.map((v) => cell(v).toLowerCase());
      if (lower.includes("nombre") || lower.some((v) => v === "nombre completo")) {
        headers = lower;
        continue;
      }
      if (!headers) continue;
      if (fields.every((v) => !cell(v))) continue;
      const r = {};
      headers.forEach((h, i) => {
        r[h] = cell(fields[i]);
      });
      const name = (r["nombre"] || r["nombre completo"] || r["nombre y apellido"] || r["name"] || "").trim();
      if (!name || name.length < 2) continue;
      const rut = (r["rut"] || r["dni"] || "").trim();
      const rutNorm = rut.replace(/[^0-9kK]/g, "").toLowerCase();
      const phone = (r["tel\xE9fono"] || r["telefono"] || r["phone"] || r["celular"] || r["whatsapp"] || r["fono"] || "").trim();
      const email = (r["correo"] || r["email"] || r["e-mail"] || "").trim();
      const fechaRaw = (r["fecha"] || r["fecha de ingreso"] || r["fecha ingreso"] || r["fecha primera consulta"] || r["fecha de registro"] || r["fecha de atenci\xF3n"] || r["fecha atencion"] || r["ingreso"] || r["date"] || "").trim();
      const fechaTs = parseFechaImp(fechaRaw);
      const fechaISO = isoFromTs(fechaTs);
      const proc = (r["procedimiento realizado"] || r["procedimiento"] || r["procedimientos"] || r["tratamiento"] || r["tratamientos"] || r["servicio"] || r["proc"] || "").trim();
      const importHist = proc ? [{ id: newSid(), date: fechaISO || isoFromTs(Date.now()), proc, note: "Importado del Excel", imported: true }] : null;
      const existing = (patients || []).find((p) => rutNorm.length >= 5 && (p.rut || "").replace(/[^0-9kK]/g, "").toLowerCase() === rutNorm || (p.name || "").toLowerCase() === name.toLowerCase());
      if (existing) {
        dup++;
        const patch = {};
        if (fechaTs && !existing.fechaTs) {
          patch.fechaImport = fechaRaw;
          patch.fechaTs = fechaTs;
        }
        if (phone && !existing.phone) patch.phone = phone;
        if (email && !existing.email) patch.email = email;
        if (importHist && importHist[0]) {
          const newH = importHist[0];
          const eh = existing.history || [];
          const yaEsta = eh.some((h) => (h.proc || "").toLowerCase().trim() === (newH.proc || "").toLowerCase().trim() && (h.date || "") === (newH.date || ""));
          if (!yaEsta) patch.history = [newH, ...eh];
          if (proc && (!existing.tags || !existing.tags.length)) patch.tags = [proc];
          if (fechaISO && (!existing.lastVisit || existing.lastVisit < fechaISO)) patch.lastVisit = fechaISO;
        }
        if (Object.keys(patch).length && updatePatient) {
          updatePatient(existing.id, patch);
          updated++;
        }
        continue;
      }
      if (rutNorm.length >= 5) seen.add(rutNorm);
      if (addPatient) addPatient({ name, rut, phone, email, consent: true, consentInfo: "Consentimiento firmado en papel (importado)", imported: true, fechaImport: fechaRaw, fechaTs, history: importHist || [], tags: importHist ? [proc] : [], lastVisit: importHist && fechaISO ? fechaISO : void 0 });
      added++;
    }
    if (!headers) {
      flash("No encontr\xE9 la fila de encabezados. Aseg\xFArate de que una fila tenga la columna 'Nombre' (y opcional RUT, Tel\xE9fono, Correo, Fecha, Procedimiento).");
      return;
    }
    flash("Importaci\xF3n: " + added + " nuevo(s)" + (updated ? " \xB7 " + updated + " actualizados (fecha/procedimiento)" : "") + (dup ? " \xB7 " + dup + " ya exist\xEDan" : "") + ".");
  }
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
    const f = e.target.files[0];
    if (!f) return;
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    e.target.value = "";
    if (ext === "numbers") {
      flash("Los archivos .numbers no se leen directo. En Numbers: Archivo \u2192 Exportar a \u2192 Excel (o CSV) y sube ese archivo.");
      return;
    }
    if (ext === "xlsx" || ext === "xls") {
      flash("Leyendo Excel\u2026");
      loadXLSX().then((XLSX) => {
        const rd2 = new FileReader();
        rd2.onload = () => {
          try {
            const wb = XLSX.read(rd2.result, { type: "array" });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false, defval: "" });
            ingestRows(rows);
          } catch (err) {
            flash("No se pudo leer el Excel. Verifica que tenga una fila de encabezado con 'Nombre'.");
          }
        };
        rd2.onerror = () => flash("No se pudo leer el archivo.");
        rd2.readAsArrayBuffer(f);
      }).catch(() => flash("No se pudo cargar el lector de Excel. Revisa tu conexi\xF3n, o exporta a CSV e int\xE9ntalo."));
      return;
    }
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const text = rd.result;
        const splitLine = (l) => {
          const out = [];
          let cur = "", q = false;
          for (let i = 0; i < l.length; i++) {
            const ch = l[i];
            if (ch === '"') {
              if (q && l[i + 1] === '"') {
                cur += '"';
                i++;
              } else q = !q;
            } else if ((ch === "," || ch === ";") && !q) {
              out.push(cur.trim());
              cur = "";
            } else cur += ch;
          }
          out.push(cur.trim());
          return out;
        };
        const rows = text.replace(/\r/g, "").split("\n").map((l) => l.trim() ? splitLine(l.trim()) : []).filter((r) => r.length);
        ingestRows(rows);
      } catch (err) {
        flash("No se pudo leer el archivo. Exporta desde Numbers o Excel a CSV e int\xE9ntalo.");
      }
    };
    rd.readAsText(f, "utf-8");
  }
  const expCard = (title, sub, fn) => /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 14px" } }, sub), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: fn }, "\u2193 Descargar CSV"));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Administraci\xF3n", sub: "Equipo y permisos, registro de actividad, datos de la cl\xEDnica y respaldo de informaci\xF3n." }), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { display: "flex", gap: 7, overflowX: "auto", marginBottom: 18, paddingBottom: 2 } }, ADMIN_TABS.map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTab(k), style: { flexShrink: 0, fontFamily: T.sans, fontSize: 12, fontWeight: 500, padding: "9px 15px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", border: "1px solid " + (tab === k ? T.accent : T.chipBorder), background: tab === k ? T.accent : T.chipBg, color: tab === k ? T.onAccent || "#fff" : T.textMute } }, l))), msg && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(31,138,91,.10)", border: "1px solid rgba(31,138,91,.4)", borderRadius: 8, padding: "10px 13px", marginBottom: 14, fontFamily: T.sans, fontSize: 12, color: "#1F8A5B" } }, "\u2713 ", msg), tab === "datos" && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 18, maxWidth: 560 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Raz\xF3n social", value: biz.razon, onChange: (v) => setBiz({ ...biz, razon: v }), placeholder: "Ej: Nombre SpA" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "RUT empresa", value: biz.rut, onChange: (v) => setBiz({ ...biz, rut: window.jcmFmtRut ? window.jcmFmtRut(v) : v }), placeholder: "xx.xxx.xxx-x" })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 13 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Plan / suscripci\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface2, color: T.textMute, fontFamily: T.sans, fontSize: 13.5, boxSizing: "border-box" } }, autoPlan || biz.plan || "\u2014"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 } }, "Se asigna autom\xE1ticamente seg\xFAn tu suscripci\xF3n en Medique."))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, textAlign: "right" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: saveBiz }, "Guardar"))), tab === "respaldo" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 14 } }, expCard("Pacientes", "Nombre, RUT, contacto y estado.", expPac), expCard("Citas", "Fecha, paciente, servicio, estado y precio.", expCitas), expCard("Caja", "Movimientos de ingreso y egreso.", expCaja)), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, background: T.surface, border: "1px solid " + T.accent + "55", borderRadius: 12, padding: "18px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, "Respaldo completo"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 14px", lineHeight: 1.5 } }, "Descarga ", /* @__PURE__ */ React.createElement("b", null, "todos los datos de tu cl\xEDnica"), " (pacientes, agenda, caja, inventario, servicios, configuraci\xF3n\u2026) en un solo archivo JSON. Gu\xE1rdalo en un lugar seguro como respaldo peri\xF3dico."), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: expFull }, "\u2193 Descargar respaldo completo (JSON)")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, background: T.surface, border: "1px dashed " + T.chipBorder, borderRadius: 12, padding: "18px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, "Importar base de pacientes"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 14px", lineHeight: 1.5 } }, "Sube un archivo ", /* @__PURE__ */ React.createElement("b", null, "Excel (.xlsx) o CSV"), ". La primera fila debe tener los ", /* @__PURE__ */ React.createElement("b", null, "encabezados"), " y una columna llamada ", /* @__PURE__ */ React.createElement("b", null, "Nombre"), " (opcionales: RUT, Tel\xE9fono, Correo, ", /* @__PURE__ */ React.createElement("b", null, "Fecha"), " y ", /* @__PURE__ */ React.createElement("b", null, "Procedimiento"), "). Si agregas ", /* @__PURE__ */ React.createElement("b", null, "Fecha"), " y ", /* @__PURE__ */ React.createElement("b", null, "Procedimiento"), ", se crea la sesi\xF3n en el historial y se ", /* @__PURE__ */ React.createElement("b", null, "reactiva la campa\xF1a de re-cita"), " autom\xE1ticamente. Si el RUT ya existe, no se duplica (y se le completa el procedimiento si le faltaba). ", /* @__PURE__ */ React.createElement("i", null, "(.numbers: en Numbers usa Archivo \u2192 Exportar a \u2192 Excel.)")), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => fileRef.current.click() }, "Subir archivo (Excel / CSV)"), /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: ".csv,text/csv,application/vnd.ms-excel,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.numbers", onChange: onImport, style: { display: "none" } }), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, margin: "12px 0 0", lineHeight: 1.5 } }, "Los pacientes importados quedan con ", /* @__PURE__ */ React.createElement("b", null, "consentimiento firmado en papel"), " (no aparecen como pendientes de firma). Si tu Excel trae una columna ", /* @__PURE__ */ React.createElement("b", null, "Fecha"), ", podr\xE1s ordenarlos por fecha con el filtro ", /* @__PURE__ */ React.createElement("b", null, "Calendario"), " en Pacientes.")), markAllPaperConsent && (patients || []).some((p) => !p.consent) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.text } }, "Consentimientos en papel"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 12px", lineHeight: 1.5 } }, "Tienes ", /* @__PURE__ */ React.createElement("b", null, (patients || []).filter((p) => !p.consent).length), ' paciente(s) marcados como "consentimiento pendiente". Si ya tienen su consentimiento firmado en papel (p. ej. tu base importada), m\xE1rcalos todos como firmados para quitarlos de las notificaciones.'), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: async () => {
    const n = (patients || []).filter((p) => !p.consent).length;
    const ok = await (window.jcmConfirm ? window.jcmConfirm("\xBFMarcar " + n + ' paciente(s) sin consentimiento como "firmado en papel"? \xDAsalo solo si efectivamente tienen el consentimiento f\xEDsico.') : Promise.resolve(window.confirm("\xBFMarcar " + n + " paciente(s) como consentimiento en papel?")));
    if (!ok) return;
    markAllPaperConsent();
    flash(n + " paciente(s) marcados con consentimiento en papel.");
  } }, "Marcar pacientes existentes como consentimiento en papel")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18 } }, /* @__PURE__ */ React.createElement(SyncStatusCard, { T, compact: true }))), tab === "equipo" && (() => {
    let team = [];
    try {
      team = window.DB && DB.get("team") || window.CADMIN && CADMIN.team || [];
    } catch (e) {
    }
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, maxWidth: 520 } }, "Integrantes del equipo y sus permisos por secci\xF3n. Para editar datos, permisos o crear la cuenta de login, entra a cada profesional en Equipo."), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => go("equipo") }, "Gestionar en Equipo")), team.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn no hay profesionales en el equipo.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, team.map((m) => {
      const perms = m.perms || {};
      const activos = PERM_SECCIONES.filter((p) => perms[p]);
      const owner = m.role && /a cargo|dueñ|owner|admin/i.test(m.role);
      return /* @__PURE__ */ React.createElement("div", { key: m.id || m.name, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "13px 15px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: "50%", background: m.color || T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 16, flexShrink: 0 } }, (m.name || "?").split(" ").map((w) => w[0]).slice(0, 2).join("")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text } }, m.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, [m.role, m.email].filter(Boolean).join("  \xB7  "))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(AdTag, { T, tone: m.active ? "ok" : "muted" }, m.active ? "Activo" : "Inactivo"), m.access && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, color: "#1F8A5B" } }, "\u25CF con login"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 } }, owner ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.accent, background: T.accent + "16", border: "1px solid " + T.accent + "40", borderRadius: 999, padding: "3px 10px" } }, "Acceso total (due\xF1o)") : activos.length ? activos.map((p) => /* @__PURE__ */ React.createElement("span", { key: p, style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, background: T.bg, border: "1px solid " + T.lineSoft, borderRadius: 999, padding: "3px 10px" } }, p)) : /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint } }, "Sin permisos asignados")));
    })));
  })(), tab === "registro" && (() => {
    let log = [];
    try {
      log = (DB.get("audit_log") || []).slice(0, 60);
    } catch (e) {
    }
    const cuando = (ts) => {
      try {
        return new Date(ts).toLocaleString("es-CL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
      } catch (e) {
        return (ts || "").slice(0, 16).replace("T", " ");
      }
    };
    return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 4 } }, "Actividad reciente"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginBottom: 12, lineHeight: 1.5 } }, "Cada cita agendada, cambio de estado, paciente creado y cobro queda registrado con la fecha y qui\xE9n lo hizo."), log.length ? log.map((e, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "9px 0", borderBottom: "1px solid " + T.lineSoft, fontFamily: T.sans, fontSize: 12.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.text, minWidth: 0 } }, e.action || e.msg || "Acci\xF3n", e.user ? /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint, fontSize: 11 } }, " \xB7 ", e.user) : null), /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint, fontSize: 11, whiteSpace: "nowrap", flexShrink: 0 } }, cuando(e.ts)))) : /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn no hay actividad registrada. Se ir\xE1 llenando a medida que uses el panel (citas, pacientes, cobros)."));
  })());
}
function jcmVerifyAdminKey(pass) {
  try {
    var storedPin = window.DB && window.DB.get("admin_pin");
    if (storedPin) return Promise.resolve(String(pass) === String(storedPin));
  } catch (e) {
  }
  try {
    if (window.JCSAAS && window.JCSAAS.enabled && typeof window.JCSAAS.verifyPassword === "function") return window.JCSAAS.verifyPassword(pass);
  } catch (e) {
  }
  try {
    if (typeof jcmAdminCheck === "function") return jcmAdminCheck(typeof jcmAdminUser === "function" ? jcmAdminUser() : "", pass).then((r) => !!(r && r.ok));
  } catch (e) {
  }
  return Promise.resolve(false);
}
function AdminKeyModal({ T, title, message, confirmLabel, onClose, onOk }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function go() {
    if (busy || !pass) return;
    setBusy(true);
    setErr("");
    let ok = false;
    try {
      ok = await jcmVerifyAdminKey(pass);
    } catch (e) {
      ok = false;
    }
    if (ok) {
      onOk();
    } else {
      setErr("Clave incorrecta.");
      setBusy(false);
    }
  }
  return /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      title: title || "Confirmar con tu clave",
      onClose,
      footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: onClose }, "Cancelar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: go }, busy ? "Verificando\u2026" : confirmLabel || "Eliminar"))
    },
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5, marginBottom: 12 } }, message || "Ingresa el PIN de admin de la cl\xEDnica para confirmar."),
    /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "password",
        value: pass,
        autoFocus: true,
        onChange: (e) => {
          setPass(e.target.value);
          setErr("");
        },
        onKeyDown: (e) => {
          if (e.key === "Enter") go();
        },
        placeholder: "PIN de admin",
        style: { width: "100%", padding: "12px 13px", borderRadius: 6, border: "1px solid " + (err ? "#C0285A" : T.line), background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, outline: "none" }
      }
    ),
    err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", marginTop: 8 } }, err)
  );
}
function CajaView({ T }) {
  const D = window.JCDATA;
  const [tick, setTick] = useState(0);
  const [delMov, setDelMov] = useState(null);
  const [mov, setMov] = useState(false);
  const [editMov, setEditMov] = useState(null);
  const [cierre, setCierre] = useState(false);
  const [periodo, setPeriodo] = useState("hoy");
  const [payQ, setPayQ] = useState("");
  const [tratScope, setTratScope] = useState("mes");
  const now = /* @__PURE__ */ new Date();
  const hoyDay = _localDay(now);
  const dow = (now.getDay() + 6) % 7;
  const lun = new Date(now);
  lun.setDate(now.getDate() - dow);
  const dom = new Date(lun);
  dom.setDate(lun.getDate() + 6);
  const wkStart = _localDay(lun), wkEnd = _localDay(dom);
  const inPeriodo = (day) => {
    if (!day) return false;
    if (periodo === "hoy") return day === hoyDay;
    if (periodo === "mes") return day.slice(0, 7) === hoyDay.slice(0, 7);
    return day >= wkStart && day <= wkEnd;
  };
  const movs = cashMovimientos().filter((m) => inPeriodo(m._day)).sort((a, b) => a.ts < b.ts ? 1 : -1);
  const ingresos = movs.filter((m) => m.type === "ingreso").reduce((s, m) => s + (m.amount || 0), 0);
  const egresos = movs.filter((m) => m.type === "egreso").reduce((s, m) => s + (m.amount || 0), 0);
  const costoIns = movs.reduce((s, m) => s + (m.cost || 0), 0);
  const atenciones = movs.filter((m) => m.kind === "atencion");
  const manuales = movs.filter((m) => m.kind !== "atencion");
  const payMatch = (m) => {
    const q = payQ.trim().toLowerCase();
    if (!q) return true;
    return ((m.concept || "") + " " + (m.method || "") + " " + (m.patient || "") + " " + (m.prof || "")).toLowerCase().includes(q);
  };
  const atencionesF = atenciones.filter(payMatch);
  const manualesF = manuales.filter(payMatch);
  const adCost = typeof jcmAdCostPerPatient === "function" ? jcmAdCostPerPatient() : 0;
  const costoPub = atenciones.length * adCost;
  const liqDe = (m) => (m.amount || 0) - (m.kind === "atencion" ? adCost : 0);
  const neto = ingresos - egresos - costoPub;
  const porMetodo = {};
  movs.filter((m) => m.type === "ingreso").forEach((m) => {
    const k = m.method || "Otro";
    porMetodo[k] = (porMetodo[k] || 0) + (m.amount || 0);
  });
  const ventasCount = atenciones.length;
  const porTrat = {};
  atenciones.forEach((m) => {
    const nombre = ((m.concept || "Atenci\xF3n").split(" \xB7 ")[0] || "Atenci\xF3n").trim();
    if (!porTrat[nombre]) porTrat[nombre] = { n: 0, total: 0 };
    porTrat[nombre].n += 1;
    porTrat[nombre].total += m.amount || 0;
  });
  const mesKeyCaja = hoyDay.slice(0, 7);
  const allAtenc = cashMovimientos().filter((m) => m.kind === "atencion");
  const atencTrat = tratScope === "mes" ? allAtenc.filter((m) => (m._day || "").slice(0, 7) === mesKeyCaja) : allAtenc;
  const porTratR = {};
  atencTrat.forEach((m) => {
    const nombre = ((m.concept || "Atenci\xF3n").split(" \xB7 ")[0] || "Atenci\xF3n").trim();
    if (!porTratR[nombre]) porTratR[nombre] = { n: 0, total: 0 };
    porTratR[nombre].n += 1;
    porTratR[nombre].total += m.amount || 0;
  });
  const topTrat = Object.keys(porTratR).map((k) => ({ name: k, n: porTratR[k].n, total: porTratR[k].total })).sort((a, b) => b.total - a.total).slice(0, 5);
  const porProf = {};
  atenciones.forEach((m) => {
    const p = (m.prof || "").trim() || "Sin asignar";
    if (!porProf[p]) porProf[p] = { n: 0, total: 0 };
    porProf[p].n += 1;
    porProf[p].total += m.amount || 0;
  });
  const topProf = Object.keys(porProf).map((k) => ({ name: k, n: porProf[k].n, total: porProf[k].total })).sort((a, b) => b.total - a.total);
  let pendienteCobro = 0;
  try {
    const _pts = window.DB && window.DB.get("patients") || [];
    _pts.forEach((p) => (p.billing || []).forEach((b) => {
      if (!b.paid && b.amount > 0) pendienteCobro += b.amount || 0;
    }));
  } catch (e) {
  }
  const hora = (ts) => {
    try {
      return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };
  const fechaTxt = now.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
  const periodoLbl = periodo === "hoy" ? "de hoy \xB7 " + fechaTxt : periodo === "semana" ? "de esta semana" : "de este mes";
  const subLbl = periodo === "hoy" ? "hoy" : periodo === "semana" ? "esta semana" : "este mes";
  const cuando = (m) => (periodo !== "hoy" && m._day ? m._day.slice(8) + "/" + m._day.slice(5, 7) + " \xB7 " : "") + hora(m.ts);
  const chip = (k, l) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setPeriodo(k), style: { fontFamily: T.sans, fontSize: 11.5, padding: "7px 14px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (periodo === k ? T.accent : T.line), background: periodo === k ? T.surface2 : T.surface, color: periodo === k ? T.text : T.textMute } }, l);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Registro de Ventas", sub: ventasCount + " venta" + (ventasCount === 1 ? "" : "s") + " " + periodoLbl }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => setCierre(true) }, "Cierre del d\xEDa"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setMov(true) }, "+ Movimiento"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" } }, chip("hoy", "Hoy"), chip("semana", "Esta semana"), chip("mes", "Este mes")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Ventas"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(CajaCard, { T, l: "N\xB0 de ventas \xB7 " + subLbl, v: ventasCount, c: T.accent }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Total cobrado \xB7 " + subLbl, v: D.fmt(ingresos), c: "#1F8A5B" }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Pendiente de cobro", v: D.fmt(pendienteCobro), c: "#B8860B" })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Caja"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(" + (adCost > 0 ? 4 : 3) + ",1fr)", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Ingresos (bruto)", v: D.fmt(ingresos), c: "#1F8A5B" }), adCost > 0 && /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Publicidad", v: D.fmt(costoPub), c: "#B8860B" }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Egresos", v: D.fmt(egresos), c: "#C0285A" }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: adCost > 0 ? "L\xEDquido (ganancia)" : "Neto (ganancia)", v: D.fmt(neto), c: T.accent, strong: true })), /* @__PURE__ */ React.createElement(FlujoCajaChart, { T }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, "Atenciones cobradas ", subLbl)), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.7", style: { position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4.3-4.3" })), /* @__PURE__ */ React.createElement("input", { value: payQ, onChange: (e) => setPayQ(e.target.value), placeholder: "Buscar pago (concepto, m\xE9todo, paciente\u2026)", style: { width: "100%", padding: "9px 12px 9px 32px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 12.5, outline: "none", boxSizing: "border-box" } })), atencionesF.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, payQ.trim() ? "Sin pagos que coincidan con la b\xFAsqueda." : "Sin atenciones cobradas " + subLbl + ".") : atencionesF.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { onClick: () => setEditMov(m), title: "Cambiar m\xE9todo de pago", style: { flex: 1, minWidth: 0, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, m.concept), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, cuando(m), " \xB7 ", m.method, adCost > 0 ? " \xB7 publicidad " + D.fmt(adCost) : "")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: "#1F8A5B" } }, D.fmt(m.amount || 0)), adCost > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute, marginTop: 1 } }, "l\xEDquido ", D.fmt(liqDe(m)))), /* @__PURE__ */ React.createElement("button", { onClick: () => setDelMov(m), title: "Eliminar de Caja (no toca la sesi\xF3n)", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" }))))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, margin: "20px 0 12px" } }, "Movimientos manuales"), manualesF.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, payQ.trim() ? "Sin movimientos que coincidan." : "Sin movimientos manuales " + subLbl + ".") : manualesF.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.id, onClick: () => setEditMov(m), title: "Cambiar m\xE9todo de pago", style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + T.lineSoft, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, m.concept || (m.type === "ingreso" ? "Ingreso" : "Egreso")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, cuando(m), " \xB7 ", m.method)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: m.type === "ingreso" ? "#1F8A5B" : "#C0285A" } }, m.type === "ingreso" ? "" : "\u2212 ", D.fmt(m.amount || 0)), m._src === "caja" && /* @__PURE__ */ React.createElement("button", { onClick: (ev) => {
    ev.stopPropagation();
    setDelMov(m);
  }, title: "Eliminar movimiento", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" })))))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 } }, "Ingresos por m\xE9todo"), Object.keys(porMetodo).length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "Sin ingresos a\xFAn.") : Object.keys(porMetodo).map((k) => /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", justifyContent: "space-between", padding: "7px 0", fontFamily: T.sans, fontSize: 12.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, k), /* @__PURE__ */ React.createElement("span", { style: { color: T.text } }, D.fmt(porMetodo[k])))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, "Total ingresos"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 18, color: T.accent } }, D.fmt(ingresos))))), allAtenc.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px", marginTop: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, "Tratamientos que m\xE1s venden \xB7 ", tratScope === "mes" ? "este mes" : "hist\xF3rico"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, [["mes", "Este mes"], ["hist", "Hist\xF3rico"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTratScope(k), style: { fontFamily: T.sans, fontSize: 11, padding: "6px 12px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (tratScope === k ? T.accent : T.line), background: tratScope === k ? T.surface2 : T.surface, color: tratScope === k ? T.text : T.textMute } }, l)))), topTrat.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "A\xFAn no hay ventas ", tratScope === "mes" ? "este mes" : "registradas", ". Aparecer\xE1 cuando cobres atenciones desde la ficha del paciente."), topTrat.map((t, i) => {
    const max = topTrat[0].total || 1;
    return /* @__PURE__ */ React.createElement("div", { key: t.name, style: { padding: "9px 0", borderBottom: i === topTrat.length - 1 ? "none" : "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, t.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap" } }, t.n, " venta", t.n === 1 ? "" : "s", " \xB7 ", /* @__PURE__ */ React.createElement("b", { style: { color: "#1F8A5B" } }, D.fmt(t.total)))), /* @__PURE__ */ React.createElement("div", { style: { height: 5, borderRadius: 999, background: T.lineSoft, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: Math.max(6, Math.round(t.total / max * 100)) + "%", background: T.accent, borderRadius: 999 } })));
  })), movs.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px", marginTop: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 } }, "Ventas por profesional \xB7 ", subLbl), topProf.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Aparecer\xE1 cuando cobres atenciones con un profesional asignado desde la ficha del paciente."), topProf.map((p, i) => {
    const max = topProf[0].total || 1;
    return /* @__PURE__ */ React.createElement("div", { key: p.name, style: { padding: "9px 0", borderBottom: i === topProf.length - 1 ? "none" : "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap" } }, p.n, " atenci\xF3n", p.n === 1 ? "" : "es", " \xB7 ", /* @__PURE__ */ React.createElement("b", { style: { color: "#1F8A5B" } }, D.fmt(p.total)))), /* @__PURE__ */ React.createElement("div", { style: { height: 5, borderRadius: 999, background: T.lineSoft, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: Math.max(6, Math.round(p.total / max * 100)) + "%", background: T.accent, borderRadius: 999 } })));
  })), delMov && /* @__PURE__ */ React.createElement(
    AdminKeyModal,
    {
      T,
      title: "Eliminar movimiento de Caja",
      message: 'Vas a quitar "' + (delMov.concept || "este movimiento") + '" de Caja. Esto NO borra la sesi\xF3n del paciente, solo el registro en Caja. Ingresa el PIN de admin (se configura en Configuraci\xF3n \u2192 PIN de seguridad).',
      onClose: () => setDelMov(null),
      onOk: () => {
        if (delMov._src === "billing") billingDelete(delMov._patId, delMov._billId);
        else cashDelete(delMov.id);
        setDelMov(null);
        setTick((t) => t + 1);
      }
    }
  ), mov && /* @__PURE__ */ React.createElement(NuevoMovModal, { T, onClose: () => setMov(false), onSave: (mv) => {
    cashAdd({ ...mv, kind: "manual" });
    setMov(false);
    setTick(tick + 1);
  } }), cierre && /* @__PURE__ */ React.createElement(CierreModal, { T, ingresos, egresos, costoIns, neto, fecha: fechaTxt, onClose: () => setCierre(false) }), editMov && /* @__PURE__ */ React.createElement(MetodoPagoModal, { T, mov: editMov, onClose: () => setEditMov(null), onSave: (metodo) => {
    if (editMov._src === "billing") billingUpdateMethod(editMov._patId, editMov._billId, metodo);
    else cashUpdate(editMov.id, { method: metodo });
    setEditMov(null);
    setTick((t) => t + 1);
  } }));
}
function MetodoPagoModal({ T, mov, onClose, onSave }) {
  const METODOS = ["Efectivo", "Transferencia", "D\xE9bito", "Cr\xE9dito", "Otro"];
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "M\xE9todo de pago", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: onClose }, "Cerrar") }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 } }, mov.concept, " \xB7 ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, window.JCDATA ? window.JCDATA.fmt(mov.amount || 0) : "$" + (mov.amount || 0)), /* @__PURE__ */ React.createElement("br", null), "Elige el m\xE9todo de pago correcto:"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, METODOS.map((mt) => /* @__PURE__ */ React.createElement("button", { key: mt, onClick: () => onSave(mt), style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 8, cursor: "pointer", fontFamily: T.sans, fontSize: 13.5, background: mov.method === mt ? T.surface2 : T.surface, border: "1px solid " + (mov.method === mt ? T.accent : T.line), color: T.text } }, mt, mov.method === mt && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.accent, letterSpacing: ".1em", textTransform: "uppercase" } }, "Actual")))));
}
function CajaCard({ T, l, v, c, strong }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: strong ? T.surface2 : T.surface, border: "1px solid " + (strong ? T.accent : T.line), borderRadius: 10, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: c } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute } }, l)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, fontWeight: 300, color: T.text } }, v));
}
function NuevoMovModal({ T, onClose, onSave }) {
  const [type, setType] = useState("ingreso");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Efectivo");
  const [concept, setConcept] = useState("");
  const ok = (parseInt(amount, 10) || 0) > 0 && (type === "ingreso" || concept.trim().length > 0);
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Nuevo movimiento", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave({ type, amount: parseInt(amount, 10) || 0, method, concept: concept.trim() }) }, "Registrar") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } }, [["ingreso", "Ingreso"], ["egreso", "Egreso"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setType(k), style: { flex: 1, fontFamily: T.sans, fontSize: 12, fontWeight: 500, padding: "12px", borderRadius: 7, cursor: "pointer", background: type === k ? T.surface2 : T.surface, color: type === k ? T.text : T.textMute, border: "1px solid " + (type === k ? T.accent : T.line) } }, l))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Monto (CLP)", value: amount, onChange: (v) => setAmount(v.replace(/\D/g, "")), inputMode: "numeric", placeholder: "0" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "M\xE9todo"), /* @__PURE__ */ React.createElement("select", { value: method, onChange: (e) => setMethod(e.target.value), style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }, /* @__PURE__ */ React.createElement("option", null, "Efectivo"), /* @__PURE__ */ React.createElement("option", null, "D\xE9bito"), /* @__PURE__ */ React.createElement("option", null, "Cr\xE9dito"), /* @__PURE__ */ React.createElement("option", null, "Transferencia"))), /* @__PURE__ */ React.createElement(AdField, { T, label: "Concepto", value: concept, onChange: setConcept, placeholder: "Venta de producto, retiro, etc." })));
}
function CierreModal({ T, ingresos, egresos, costoIns, neto, fecha, onClose }) {
  const D = window.JCDATA;
  const [done, setDone] = useState(false);
  function confirmarCierre() {
    try {
      const cierres = window.DB && window.DB.get("cierres_caja") || [];
      cierres.unshift({ fecha, ingresos, egresos, costoIns, neto, ts: (/* @__PURE__ */ new Date()).toISOString() });
      window.DB && window.DB.set("cierres_caja", cierres.slice(0, 90));
      setDone(true);
      try {
        window.jcmToast && window.jcmToast("Cierre del d\xEDa registrado.", "ok");
      } catch (e2) {
      }
    } catch (e) {
      try {
        window.jcmError && window.jcmError("Error al registrar el cierre.");
      } catch (e2) {
      }
    }
  }
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Cierre del d\xEDa", onClose, footer: done ? /* @__PURE__ */ React.createElement(AdBtn, { T, full: true, onClick: onClose }, "Cerrar") : /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: confirmarCierre }, "Confirmar cierre del d\xEDa") }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 14, textTransform: "capitalize" } }, fecha), [["Ingresos (bruto)", ingresos, "#1F8A5B", ""], ["Egresos", egresos, "#C0285A", "\u2212 "]].map(([l, v, c, s]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid " + T.lineSoft, fontFamily: T.sans, fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, l), /* @__PURE__ */ React.createElement("span", { style: { color: c } }, s, D.fmt(v)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 12, fontFamily: T.sans, fontSize: 15, fontWeight: 600 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.text } }, "Neto (ganancia)"), /* @__PURE__ */ React.createElement("span", { style: { color: T.accent } }, D.fmt(neto))));
}
function jcmClinicCtx() {
  try {
    return window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic() || {};
  } catch (e) {
    return {};
  }
}
function jcmAIReply(r) {
  if (r && r.ok && r.reply) return ("" + r.reply).trim();
  if (r && typeof r.reply === "string") return r.reply.trim();
  return "";
}
function jcmAIError(r) {
  return r && r.error ? "" + r.error : "";
}
function IAHero({ T, icon, color, title, sub }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, background: "linear-gradient(135deg," + color + "18, " + (T.surface2 || T.surface) + ")", border: "1px solid " + T.line, borderRadius: 16, padding: "18px 20px", marginBottom: 18, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 52, height: 52, borderRadius: 14, background: color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, icon)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 200 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.text, lineHeight: 1.1 } }, title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 4, lineHeight: 1.5 } }, sub)));
}
function NotasClinicasView({ T, patients, updatePatient }) {
  const [pid, setPid] = useState("");
  const [txt, setTxt] = useState("");
  const [rec, setRec] = useState(false);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const recRef = useRef(null);
  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const pat = patients.find((p) => p.id === pid);
  function toggleRec() {
    if (!SR) {
      window.jcmToast && window.jcmToast("Tu navegador no permite dictado por voz. Usa Chrome/Edge o escribe la nota.", "info");
      return;
    }
    if (rec) {
      try {
        recRef.current && recRef.current.stop();
      } catch (e) {
      }
      setRec(false);
      return;
    }
    const r = new SR();
    r.lang = "es-CL";
    r.continuous = true;
    r.interimResults = true;
    let base = txt ? txt + " " : "";
    r.onresult = (e) => {
      let s = "";
      for (let i = e.resultIndex; i < e.results.length; i++) s += e.results[i][0].transcript;
      setTxt(base + s);
    };
    r.onend = () => setRec(false);
    r.onerror = (ev) => {
      setRec(false);
      const c = ev && ev.error;
      const m = c === "not-allowed" || c === "service-not-allowed" ? "Permite el micr\xF3fono para dictar (no funciona en modo inc\xF3gnito)." : c === "no-speech" ? "No se detect\xF3 voz. Intenta de nuevo." : "No se pudo iniciar el dictado.";
      window.jcmToast && window.jcmToast(m, "info");
    };
    recRef.current = r;
    try {
      r.start();
      setRec(true);
    } catch (e) {
      window.jcmToast && window.jcmToast("No se pudo iniciar el dictado por voz.", "info");
    }
  }
  async function formatear() {
    if (!txt.trim() || busy || !window.mediqueAI) {
      if (!window.mediqueAI) window.jcmToast && window.jcmToast("La IA no est\xE1 disponible (falta GROQ_API_KEY en el servidor).", "info");
      return;
    }
    setBusy(true);
    try {
      const msg = [{ role: "user", content: "Convierte el siguiente dictado en una NOTA CL\xCDNICA ordenada en formato SOAP (Subjetivo, Objetivo, An\xE1lisis, Plan), en espa\xF1ol de Chile, concisa y profesional. Solo la nota, sin comentarios:\n\n" + txt }];
      const r = await window.mediqueAI(msg, jcmClinicCtx(), { max_tokens: 600 });
      const out = jcmAIReply(r);
      if (out) setTxt(out);
      else window.jcmToast && window.jcmToast(jcmAIError(r) || "La IA no respondi\xF3, intenta de nuevo.", "info");
    } catch (e) {
      window.jcmToast && window.jcmToast("No se pudo formatear la nota.", "error");
    }
    setBusy(false);
  }
  function guardar() {
    if (!pat || !txt.trim()) {
      window.jcmToast && window.jcmToast(pat ? "Escribe o dicta la nota primero." : "Elige un paciente.", "info");
      return;
    }
    const nota = { id: "rx" + Date.now(), tipo: "indicaciones", fecha: (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" }), diag: "Nota cl\xEDnica", rp: txt.trim(), ind: "", ctrl: "" };
    updatePatient(pat.id, { recetas: [nota, ...pat.recetas || []] });
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
    setTxt("");
    try {
      window.jcmAudit && window.jcmAudit("Nota cl\xEDnica guardada \xB7 " + pat.name);
    } catch (e) {
    }
  }
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Notas Cl\xEDnicas", sub: "Dicta por voz y la IA arma la nota en formato cl\xEDnico" }), /* @__PURE__ */ React.createElement(IAHero, { T, color: "#8B5CF6", title: "Registrar deja de ser una carga", sub: "Transcripci\xF3n de voz en tiempo real \xB7 formato cl\xEDnico autom\xE1tico \xB7 notas completas y precisas.", icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" }), /* @__PURE__ */ React.createElement("path", { d: "M5 11a7 7 0 0 0 14 0M12 18v3" })) }), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", maxWidth: 760 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Paciente"), /* @__PURE__ */ React.createElement("select", { value: pid, onChange: (e) => setPid(e.target.value), style: inp }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Elegir paciente\u2026"), patients.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: toggleRec, style: { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: T.sans, fontSize: 12, fontWeight: 600, padding: "10px 16px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (rec ? "#C0285A" : T.line), background: rec ? "#C0285A" : "transparent", color: rec ? "#fff" : T.text } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: rec ? "#fff" : "#C0285A", ...rec ? { animation: "jcFade 1s infinite alternate" } : {} } }), rec ? "Detener dictado" : "Dictar por voz"), /* @__PURE__ */ React.createElement("button", { onClick: formatear, disabled: busy || !txt.trim(), style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, padding: "10px 16px", borderRadius: 999, cursor: txt.trim() ? "pointer" : "default", border: "1px solid " + T.accent, background: "transparent", color: T.accent, opacity: txt.trim() ? 1 : 0.5 } }, busy ? "Formateando\u2026" : "\u2726 Formatear con IA (SOAP)")), /* @__PURE__ */ React.createElement("textarea", { value: txt, onChange: (e) => setTxt(e.target.value), rows: 9, placeholder: "Dicta o escribe la nota cl\xEDnica aqu\xED\u2026", style: { ...inp, resize: "vertical", lineHeight: 1.6 } }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: guardar }, saved ? "\u2713 Guardada en la ficha" : "Guardar en la ficha del paciente")), !SR && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 8 } }, 'El dictado por voz funciona en Chrome/Edge. En otros navegadores, escribe la nota y usa "Formatear con IA".')));
}
function ResumenClinicoView({ T, patients, appts }) {
  const [pid, setPid] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  const pat = patients.find((p) => p.id === pid);
  const alergias = pat ? (pat.alergias || pat.allergies || "").toString() : "";
  async function generar() {
    if (!pat || busy) return;
    if (!window.mediqueAI) {
      window.jcmToast && window.jcmToast("La IA no est\xE1 disponible (falta GROQ_API_KEY).", "info");
      return;
    }
    setBusy(true);
    setOut("");
    const hist = (pat.recetas || []).slice(0, 12).map((r) => "- " + r.fecha + ": " + (r.diag || r.tipo) + " \xB7 " + (r.rp || "").slice(0, 120)).join("\n");
    const cxt = "Paciente: " + (pat.name || "") + (pat.age ? " (" + pat.age + " a\xF1os)" : "") + "\nRUT: " + (pat.rut || "\u2014") + "\nAlergias/condiciones: " + (alergias || "no registradas") + "\nEtiquetas: " + ((pat.tags || []).join(", ") || "\u2014") + "\nHistorial:\n" + (hist || "sin registros");
    try {
      const r = await window.mediqueAI([{ role: "user", content: "Eres asistente cl\xEDnico. Resume la historia del paciente en 5-8 vi\xF1etas claras (condiciones activas, tratamientos en curso, alertas de alergias, y pr\xF3ximos controles sugeridos). Espa\xF1ol de Chile. Datos:\n\n" + cxt }], jcmClinicCtx(), { max_tokens: 550 });
      setOut(jcmAIReply(r) || "No pude generar el resumen" + (jcmAIError(r) ? ": " + jcmAIError(r) : ". Intenta de nuevo."));
    } catch (e) {
      setOut("No se pudo generar el resumen ahora.");
    }
    setBusy(false);
  }
  const inp = { width: "100%", padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box", maxWidth: 420 };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Resumen Cl\xEDnico", sub: "La historia deja de acumularse: se organiza y se vuelve accionable" }), /* @__PURE__ */ React.createElement(IAHero, { T, color: "#3AAE8C", title: "Historial resumido por IA", sub: "Alertas de alergias y condiciones \xB7 acceso r\xE1pido a tratamientos activos.", icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ React.createElement("path", { d: "M14 2v6h6M8 13h8M8 17h5" })) }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { flex: 1, minWidth: 220 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Paciente"), /* @__PURE__ */ React.createElement("select", { value: pid, onChange: (e) => {
    setPid(e.target.value);
    setOut("");
  }, style: inp }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Elegir paciente\u2026"), patients.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name)))), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: generar }, busy ? "Generando\u2026" : "\u2726 Generar resumen")), pat && alergias && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(192,40,90,.08)", border: "1px solid #C0285A44", borderRadius: 10, padding: "12px 14px", marginBottom: 14, fontFamily: T.sans, fontSize: 12.5, color: T.text } }, "\u26A0 ", /* @__PURE__ */ React.createElement("b", null, "Alergias / condiciones:"), " ", alergias), out ? /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "18px 20px", maxWidth: 760, fontFamily: T.sans, fontSize: 13.5, color: T.text, lineHeight: 1.7, whiteSpace: "pre-wrap" } }, out) : pat ? /* @__PURE__ */ React.createElement(Empty2, { T }, 'Toca "Generar resumen" para que la IA resuma la historia de ', pat.name, ".") : /* @__PURE__ */ React.createElement(Empty2, { T }, "Elige un paciente para generar su resumen cl\xEDnico."));
}
function ContactCenterView({ T, patients }) {
  const waMsgs = (() => {
    try {
      return (window.CADMIN || {}).waMessages || [];
    } catch (e) {
      return [];
    }
  })();
  const metaOn = (() => {
    try {
      return !!(window.DB && window.DB.get("wa_connected"));
    } catch (e) {
      return false;
    }
  })();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Contact Center", sub: "Atenci\xF3n conversacional centralizada" }), /* @__PURE__ */ React.createElement(IAHero, { T, color: "#3AAE8C", title: "Todas tus conversaciones en un lugar", sub: "WhatsApp, correo e Instagram en una sola bandeja, con respuestas sugeridas por IA.", icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" })) }), !metaOn && /* @__PURE__ */ React.createElement("div", { style: { background: T.accentSoft || "rgba(84,112,127,.10)", border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 16, display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 40, height: 40, borderRadius: 11, background: "#25D36622", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "#25D366" }, /* @__PURE__ */ React.createElement("path", { d: "M19 4.9A9.8 9.8 0 0 0 12 2C6.6 2 2.1 6.4 2.1 11.9c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4a9.9 9.9 0 0 0 4.8 1.2c5.5 0 9.9-4.4 9.9-9.9 0-2.6-1-5.1-2.9-7z" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 220 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, "Conecta WhatsApp para activar el Contact Center"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 4, lineHeight: 1.5 } }, "El bot de WhatsApp ya est\xE1 programado (responde y agenda con IA). Falta conectar tu cuenta de Meta (WhatsApp Cloud API). Cuando est\xE9, las conversaciones aparecen aqu\xED y podr\xE1s responder con ayuda de la IA.")), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "#B8860B", border: "1px solid #B8860B55", borderRadius: 999, padding: "5px 11px", alignSelf: "center" } }, "Pendiente Meta")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Conversaciones recientes"), waMsgs.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn no hay conversaciones. Aparecer\xE1n aqu\xED al conectar WhatsApp.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, maxWidth: 760 } }, waMsgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 12, alignItems: "center", background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: m.name, size: 38 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, m.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, m.msg)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, flexShrink: 0 } }, m.ago)))));
}
function ReportesIAView({ T, patients, appts }) {
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [busy, setBusy] = useState(false);
  const ctx = (() => {
    let cash = [];
    try {
      cash = window.cashAll && window.cashAll() || [];
    } catch (e) {
    }
    const mes = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
    const inM = (ts) => (ts || "").slice(0, 7) === mes;
    const ingresosMes = cash.filter((m) => m.type === "ingreso" && inM(m.ts)).reduce((s, m) => s + (m.amount || 0), 0);
    const atMes = cash.filter((m) => m.kind === "atencion" && inM(m.ts));
    const porTrat = {};
    atMes.forEach((m) => {
      const k = (m.concept || "").split(" \xB7 ")[0];
      porTrat[k] = (porTrat[k] || 0) + 1;
    });
    const top = Object.keys(porTrat).sort((a, b) => porTrat[b] - porTrat[a]).slice(0, 5).map((k) => k + " (" + porTrat[k] + ")").join(", ");
    const citasMes = (appts || []).filter((a) => (a.fecha || "").slice(0, 7) === mes && a.status !== "anulada").length;
    return "Datos de la cl\xEDnica (este mes):\n- Pacientes totales: " + patients.length + "\n- Citas del mes: " + citasMes + "\n- Ingresos del mes: $" + ingresosMes.toLocaleString("es-CL") + "\n- Atenciones cobradas del mes: " + atMes.length + "\n- Tratamientos m\xE1s hechos: " + (top || "\u2014");
  })();
  async function pregunta(texto) {
    const pregunta2 = (texto || q).trim();
    if (!pregunta2 || busy) return;
    setQ("");
    const next = [...msgs, { role: "user", content: pregunta2 }];
    setMsgs(next);
    if (!window.mediqueAI) {
      setMsgs([...next, { role: "assistant", content: "(La IA no est\xE1 disponible: falta GROQ_API_KEY en el servidor.)" }]);
      return;
    }
    setBusy(true);
    try {
      const r = await window.mediqueAI([{ role: "user", content: "Eres analista de una cl\xEDnica est\xE9tica. Responde en espa\xF1ol de Chile, breve y accionable, usando SOLO estos datos:\n\n" + ctx + "\n\nPregunta: " + pregunta2 }], jcmClinicCtx(), { max_tokens: 500 });
      setMsgs([...next, { role: "assistant", content: jcmAIReply(r) || (jcmAIError(r) || "No pude responder ahora, intenta de nuevo.") }]);
    } catch (e) {
      setMsgs([...next, { role: "assistant", content: "No pude responder ahora, intenta de nuevo." }]);
    }
    setBusy(false);
  }
  const sug = ["\xBFC\xF3mo va el mes vs. lo esperado?", "\xBFQu\xE9 tratamiento conviene promocionar?", "\xBFD\xF3nde estoy perdiendo ingresos?"];
  const inp = { flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Reportes IA", sub: "Los datos dejan de ser n\xFAmeros: se convierten en decisiones" }), /* @__PURE__ */ React.createElement(IAHero, { T, color: "#E8952A", title: "Reportes conversacionales", sub: "Pregunta en lenguaje natural \xB7 visualizaciones autom\xE1ticas \xB7 insights accionables.", icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3a9 9 0 1 0 9 9h-9z" }), /* @__PURE__ */ React.createElement("path", { d: "M12 3v9l6.4-6.4" })) }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 780 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 16, minHeight: 220, marginBottom: 12, display: "flex", flexDirection: "column", gap: 10 } }, msgs.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { margin: "auto", textAlign: "center", maxWidth: 420 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 12 } }, "Preg\xFAntale a la IA sobre el rendimiento de tu cl\xEDnica."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" } }, sug.map((s) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => pregunta(s), style: { fontFamily: T.sans, fontSize: 11.5, padding: "8px 12px", borderRadius: 999, cursor: "pointer", border: "1px solid " + T.line, background: "transparent", color: T.accent } }, s)))), msgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", background: m.role === "user" ? T.accent : T.surface2, color: m.role === "user" ? T.onAccent || "#fff" : T.text, border: m.role === "user" ? "none" : "1px solid " + T.line, borderRadius: 12, padding: "11px 14px", fontFamily: T.sans, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" } }, m.content)), busy && /* @__PURE__ */ React.createElement("div", { style: { alignSelf: "flex-start", fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "Analizando\u2026")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter") pregunta();
  }, placeholder: "Escribe tu pregunta\u2026", style: inp }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => pregunta() }, "Preguntar"))));
}
function ContraloriaView({ T, patients, appts }) {
  const alertas = (() => {
    const A = [];
    const sinConsent = (window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : []).length;
    if (sinConsent) A.push({ t: "Consentimientos pendientes", n: sinConsent, d: sinConsent + " paciente(s) con cita de procedimiento sin consentimiento firmado.", to: "pendientes", c: "#C9A227" });
    const sinRut = patients.filter((p) => !(p.rut || "").trim()).length;
    if (sinRut) A.push({ t: "Fichas sin RUT", n: sinRut, d: sinRut + " paciente(s) sin RUT registrado (dificulta boletas y trazabilidad).", to: "pacientes", c: "#C0285A" });
    const sinTel = patients.filter((p) => !(p.phone || "").replace(/\D/g, "")).length;
    if (sinTel) A.push({ t: "Fichas sin tel\xE9fono", n: sinTel, d: sinTel + " paciente(s) sin tel\xE9fono (no reciben recordatorios).", to: "pacientes", c: "#C9A227" });
    const citasSinProf = (appts || []).filter((a) => a.status !== "anulada" && !(a.prof || "").trim() && (a.fecha || "") >= (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).length;
    if (citasSinProf) A.push({ t: "Citas sin profesional", n: citasSinProf, d: citasSinProf + " cita(s) futura(s) sin profesional asignado.", to: "agenda", c: "#C0285A" });
    let cash = [];
    try {
      cash = window.cashAll && window.cashAll() || [];
    } catch (e) {
    }
    let pend = 0;
    try {
      patients.forEach((p) => (p.billing || []).forEach((b) => {
        if (!b.paid && b.amount > 0) pend++;
      }));
    } catch (e) {
    }
    if (pend) A.push({ t: "Cobros pendientes", n: pend, d: pend + " atenci\xF3n(es) registrada(s) sin pago.", to: "caja", c: "#C9A227" });
    return A;
  })();
  const ok = alertas.length === 0;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Contralor IA", sub: "Gestionar deja de ser reaccionar: la inteligencia anticipa y alerta" }), /* @__PURE__ */ React.createElement(IAHero, { T, color: "#8B5CF6", title: "Control de calidad continuo", sub: "Verificaci\xF3n autom\xE1tica de registros \xB7 alertas de inconsistencias \xB7 control de calidad continuo.", icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }), /* @__PURE__ */ React.createElement("path", { d: "M9 12l2 2 4-4" })) }), ok ? /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(31,138,91,.08)", border: "1px solid #1F8A5B44", borderRadius: 12, padding: "24px", textAlign: "center", maxWidth: 760 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: "#1F8A5B" } }, "\u2713 Todo en orden"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 6 } }, "No se detectaron inconsistencias en los registros.")) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, maxWidth: 780 } }, alertas.map((a, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 14, background: T.surface, border: "1px solid " + T.line, borderLeft: "4px solid " + a.c, borderRadius: 10, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 40, height: 40, borderRadius: 10, background: a.c + "1c", color: a.c, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 18, fontWeight: 600 } }, a.n), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text } }, a.t), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 2 } }, a.d)), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    try {
      window.jcmNav ? window.jcmNav(a.to) : location.href = "/" + a.to;
    } catch (e) {
    }
  }, style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "8px 12px", cursor: "pointer" } }, "Revisar \u2192")))));
}
const GASTO_CATS = ["Arriendo", "Sueldos", "Insumos", "Marketing", "Servicios b\xE1sicos", "Equipamiento", "Impuestos", "Otros"];
function PagosGastosView({ T }) {
  const D = window.JCDATA;
  const [items, setItems] = useState(() => {
    try {
      return window.DB && window.DB.get("expenses") || [];
    } catch (e) {
      return [];
    }
  });
  const [f, setF] = useState({ categoria: GASTO_CATS[0], concepto: "", monto: "", recurrente: false });
  function persist(n) {
    setItems(n);
    try {
      window.DB && window.DB.set("expenses", n);
    } catch (e) {
    }
  }
  function add() {
    const m = parseInt(f.monto, 10) || 0;
    if (!f.concepto.trim() || !m) {
      window.jcmToast && window.jcmToast("Completa concepto y monto.", "info");
      return;
    }
    persist([{ id: "g" + Date.now(), fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), categoria: f.categoria, concepto: f.concepto.trim(), monto: m, recurrente: f.recurrente }, ...items]);
    setF({ ...f, concepto: "", monto: "" });
  }
  async function del(id) {
    if (await (window.jcmConfirm || window.confirm)("\xBFEliminar este gasto?", { danger: true })) persist(items.filter((x) => x.id !== id));
  }
  const mes = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  const mesItems = items.filter((g) => (g.fecha || "").slice(0, 7) === mes);
  const totalMes = mesItems.reduce((s, g) => s + (g.monto || 0), 0);
  const porCat = {};
  mesItems.forEach((g) => {
    porCat[g.categoria] = (porCat[g.categoria] || 0) + g.monto;
  });
  const cats = Object.keys(porCat).sort((a, b) => porCat[b] - porCat[a]);
  const inp = { padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Pagos y Gastos", sub: "Identifica y registra el detalle de tus gastos" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Gasto del mes", v: D.fmt(totalMes), c: "#C0285A" }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "N\xB0 de gastos", v: mesItems.length, c: T.accent }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Recurrentes", v: items.filter((g) => g.recurrente).length, c: "#C9A227" })), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "grid", gridTemplateColumns: "160px 1fr 130px auto", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("select", { value: f.categoria, onChange: (e) => setF({ ...f, categoria: e.target.value }), style: inp }, GASTO_CATS.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c))), /* @__PURE__ */ React.createElement("input", { value: f.concepto, onChange: (e) => setF({ ...f, concepto: e.target.value }), placeholder: "Concepto del gasto", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.monto, onChange: (e) => setF({ ...f, monto: e.target.value.replace(/\D/g, "") }), inputMode: "numeric", placeholder: "Monto $", style: inp }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: add }, "+ Registrar")), cats.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 } }, cats.map((c) => /* @__PURE__ */ React.createElement("span", { key: c, style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, background: T.surface, border: "1px solid " + T.line, borderRadius: 999, padding: "6px 12px" } }, c, ": ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, D.fmt(porCat[c]))))), mesItems.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn no registras gastos este mes.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, mesItems.map((g) => /* @__PURE__ */ React.createElement("div", { key: g.id, style: { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "11px 14px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", color: T.accent, background: T.accent + "12", borderRadius: 6, padding: "3px 8px", flexShrink: 0 } }, g.categoria), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, g.concepto), g.recurrente && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint } }, " \xB7 recurrente"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint } }, g.fecha)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, color: "#C0285A" } }, "\u2212 ", D.fmt(g.monto)), /* @__PURE__ */ React.createElement("button", { onClick: () => del(g.id), style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" })))))));
}
function RemuneracionesView({ T }) {
  const D = window.JCDATA;
  let team = [];
  try {
    team = window.DB && window.DB.get("team") || [];
  } catch (e) {
  }
  const [cfg, setCfg] = useState(() => {
    try {
      return window.DB && window.DB.get("remun_cfg") || {};
    } catch (e) {
      return {};
    }
  });
  function setC(id, patch) {
    const n = { ...cfg, [id]: { ...cfg[id] || { base: 0, comision: 0 }, ...patch } };
    setCfg(n);
    try {
      window.DB && window.DB.set("remun_cfg", n);
    } catch (e) {
    }
  }
  const mes = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  let cash = [];
  try {
    cash = window.cashAll && window.cashAll() || [];
  } catch (e) {
  }
  const ventasProf = {};
  cash.filter((m) => m.kind === "atencion" && (m.ts || "").slice(0, 7) === mes).forEach((m) => {
    const p = (m.prof || "").trim();
    if (p) ventasProf[p] = (ventasProf[p] || 0) + (m.amount || 0);
  });
  const inp = { width: 110, padding: "8px 10px", borderRadius: 7, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Remuneraciones", sub: "Sueldo base + comisi\xF3n sobre las ventas del mes de cada profesional" }), team.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "Agrega profesionales en Equipo para calcular remuneraciones.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 } }, team.map((m) => {
    const c = cfg[m.id] || { base: 0, comision: 0 };
    const ventas = ventasProf[m.name] || 0;
    const comMonto = Math.round(ventas * (parseFloat(c.comision) || 0) / 100);
    const total = (parseInt(c.base, 10) || 0) + comMonto;
    return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: "50%", background: m.color || T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 16, flexShrink: 0 } }, (m.name || "?").split(" ").map((w) => w[0]).slice(0, 2).join("")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 140 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text } }, m.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Ventas del mes: ", D.fmt(ventas))), /* @__PURE__ */ React.createElement("label", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, "Sueldo base", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", { value: c.base || "", onChange: (e) => setC(m.id, { base: e.target.value.replace(/\D/g, "") }), inputMode: "numeric", placeholder: "0", style: { ...inp, marginTop: 3 } })), /* @__PURE__ */ React.createElement("label", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, "Comisi\xF3n %", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", { value: c.comision || "", onChange: (e) => setC(m.id, { comision: e.target.value.replace(/[^0-9.]/g, "") }), inputMode: "decimal", placeholder: "0", style: { ...inp, width: 70, marginTop: 3 } })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", minWidth: 120 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute } }, "Liquidaci\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.accent } }, D.fmt(total)), comMonto > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint } }, "incl. comisi\xF3n ", D.fmt(comMonto)))));
  })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 14, maxWidth: 760, lineHeight: 1.5 } }, "C\xE1lculo referencial (base + % sobre ventas cobradas del mes con ese profesional). No incluye leyes sociales ni impuestos; para liquidaci\xF3n legal formal se puede integrar un m\xF3dulo previsional m\xE1s adelante."));
}
const EXAM_COMUNES = ["Hemograma completo", "Perfil bioqu\xEDmico", "Perfil lip\xEDdico", "Perfil hep\xE1tico", "Glicemia en ayunas", "Hemoglobina glicosilada (HbA1c)", "Creatinina", "Nitr\xF3geno ureico (BUN)", "\xC1cido \xFArico", "Electrolitos plasm\xE1ticos (ELP)", "TSH", "T4 libre", "Perfil tiroideo", "Orina completa", "Urocultivo", "VHS", "Prote\xEDna C reactiva (PCR)", "VDRL / RPR", "VIH (Elisa)", "Ferritina", "Perfil de fierro", "Vitamina D", "Vitamina B12", "\xC1cido f\xF3lico", "Grupo y Rh", "Sub-unidad \u03B2-HCG (embarazo)", "Pruebas de coagulaci\xF3n (TP/TTPA/INR)", "Calcio / F\xF3sforo / Magnesio", "Bilirrubina total y directa", "Transaminasas (GOT/GPT)"];
function LaboratoriosView({ T, patients }) {
  const [orders, setOrders] = useState(() => {
    try {
      return window.DB && window.DB.get("lab_orders") || [];
    } catch (e) {
      return [];
    }
  });
  const [f, setF] = useState({ patId: "", sel: [], extra: "", tipo: "Interno" });
  function persist(n) {
    setOrders(n);
    try {
      window.DB && window.DB.set("lab_orders", n);
    } catch (e) {
    }
  }
  function toggleEx(ex) {
    setF((s) => ({ ...s, sel: s.sel.indexOf(ex) >= 0 ? s.sel.filter((x) => x !== ex) : [...s.sel, ex] }));
  }
  function add() {
    const p = patients.find((x) => x.id === f.patId);
    const lista = [...f.sel, ...f.extra.trim() ? [f.extra.trim()] : []];
    if (!p || !lista.length) {
      window.jcmToast && window.jcmToast("Elige paciente y al menos un examen.", "info");
      return;
    }
    persist([{ id: "lo" + Date.now(), patId: p.id, patName: p.name, examenes: lista.join(", "), tipo: f.tipo, estado: "Solicitado", fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) }, ...orders]);
    setF({ ...f, sel: [], extra: "" });
  }
  const EST = ["Solicitado", "En proceso", "Listo", "Entregado"];
  const estColor = (e) => ({ "Solicitado": "#C9A227", "En proceso": "#2AA5C9", "Listo": "#1F8A5B", "Entregado": T.textMute })[e] || T.textMute;
  function nextEst(o) {
    const i = EST.indexOf(o.estado);
    const ne = EST[(i + 1) % EST.length];
    persist(orders.map((x) => x.id === o.id ? { ...x, estado: ne } : x));
  }
  async function del(id) {
    if (await (window.jcmConfirm || window.confirm)("\xBFEliminar esta orden?", { danger: true })) persist(orders.filter((x) => x.id !== id));
  }
  const inp = { padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Laboratorios y ex\xE1menes", sub: "Gestiona solicitudes de ex\xE1menes internas y externas" }), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("select", { value: f.patId, onChange: (e) => setF({ ...f, patId: e.target.value }), style: { ...inp, flex: 1, minWidth: 180 } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Paciente\u2026"), patients.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))), /* @__PURE__ */ React.createElement("select", { value: f.tipo, onChange: (e) => setF({ ...f, tipo: e.target.value }), style: { ...inp, flex: "0 0 140px" } }, /* @__PURE__ */ React.createElement("option", null, "Interno"), /* @__PURE__ */ React.createElement("option", null, "Externo"))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Ex\xE1menes (elige los que necesites)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, maxHeight: 168, overflowY: "auto" } }, EXAM_COMUNES.map((ex) => {
    const on = f.sel.indexOf(ex) >= 0;
    return /* @__PURE__ */ React.createElement("button", { key: ex, onClick: () => toggleEx(ex), style: { fontFamily: T.sans, fontSize: 11.5, padding: "6px 12px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (on ? T.accent : T.line), background: on ? T.accent + "16" : "transparent", color: on ? T.accent : T.textMute } }, on ? "\u2713 " : "", ex);
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { value: f.extra, onChange: (e) => setF({ ...f, extra: e.target.value }), placeholder: "Otro examen (opcional)\u2026", style: { ...inp, flex: 1, minWidth: 200 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, f.sel.length, " seleccionado(s)"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: add }, "+ Crear orden"))), orders.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn no hay \xF3rdenes de laboratorio.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, orders.map((o) => /* @__PURE__ */ React.createElement("div", { key: o.id, style: { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 200 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text } }, o.patName, " ", /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, fontWeight: 400 } }, "\xB7 ", o.tipo, " \xB7 ", o.fecha)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 2 } }, o.examenes)), /* @__PURE__ */ React.createElement("button", { onClick: () => nextEst(o), title: "Cambiar estado", style: { fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: estColor(o.estado), background: estColor(o.estado) + "18", border: "1px solid " + estColor(o.estado) + "55", borderRadius: 999, padding: "6px 12px", cursor: "pointer" } }, o.estado, " \u21BB"), /* @__PURE__ */ React.createElement("button", { onClick: () => del(o.id), style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))))));
}
function ConveniosView({ T }) {
  const [items, setItems] = useState(() => {
    try {
      return window.DB && window.DB.get("convenios") || [];
    } catch (e) {
      return [];
    }
  });
  const [f, setF] = useState({ empresa: "", contacto: "", descuento: "", notas: "" });
  function persist(n) {
    setItems(n);
    try {
      window.DB && window.DB.set("convenios", n);
    } catch (e) {
    }
  }
  function add() {
    if (!f.empresa.trim()) {
      window.jcmToast && window.jcmToast("Escribe el nombre de la empresa/entidad.", "info");
      return;
    }
    persist([{ id: "cv" + Date.now(), ...f, empresa: f.empresa.trim(), descuento: parseInt(f.descuento, 10) || 0 }, ...items]);
    setF({ empresa: "", contacto: "", descuento: "", notas: "" });
  }
  async function del(id) {
    if (await (window.jcmConfirm || window.confirm)("\xBFEliminar este convenio?", { danger: true })) persist(items.filter((x) => x.id !== id));
  }
  const inp = { padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Convenios", sub: "Gestiona los convenios con empresas y otras entidades" }), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr 120px auto", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { value: f.empresa, onChange: (e) => setF({ ...f, empresa: e.target.value }), placeholder: "Empresa / entidad", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.contacto, onChange: (e) => setF({ ...f, contacto: e.target.value }), placeholder: "Contacto (tel\xE9fono/correo)", style: inp }), /* @__PURE__ */ React.createElement("input", { value: f.descuento, onChange: (e) => setF({ ...f, descuento: e.target.value.replace(/\D/g, "") }), inputMode: "numeric", placeholder: "Dcto %", style: inp }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: add }, "+ Agregar")), items.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "A\xFAn no tienes convenios registrados.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, items.map((c) => /* @__PURE__ */ React.createElement("div", { key: c.id, style: { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 180 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text } }, c.empresa), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 } }, [c.contacto, c.notas].filter(Boolean).join(" \xB7 "))), c.descuento > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.accent, background: T.accent + "14", borderRadius: 999, padding: "5px 12px" } }, c.descuento, "% dcto"), /* @__PURE__ */ React.createElement("button", { onClick: () => del(c.id), style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))))));
}
function ChatInternoView({ T }) {
  const yo = (() => {
    try {
      return window.JCSAAS && window.JCSAAS.currentUserName && window.JCSAAS.currentUserName() || window.JCSAAS && window.JCSAAS.userEmail && window.JCSAAS.userEmail() || "Yo";
    } catch (e) {
      return "Yo";
    }
  })();
  const [msgs, setMsgs] = useState(() => {
    try {
      return window.DB && window.DB.get("team_chat") || [];
    } catch (e) {
      return [];
    }
  });
  const [txt, setTxt] = useState("");
  const endRef = useRef(null);
  useEffect(() => {
    function reload() {
      try {
        setMsgs(window.DB && window.DB.get("team_chat") || []);
      } catch (e) {
      }
    }
    window.addEventListener("jcsaas:data", reload);
    return () => window.removeEventListener("jcsaas:data", reload);
  }, []);
  useEffect(() => {
    if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight;
  }, [msgs]);
  function send() {
    const t = txt.trim();
    if (!t) return;
    const n = [...msgs, { id: "m" + Date.now(), author: yo, text: t, ts: Date.now() }].slice(-300);
    setMsgs(n);
    try {
      window.DB && window.DB.set("team_chat", n);
    } catch (e) {
    }
    setTxt("");
  }
  const hora = (ts) => {
    try {
      return new Date(ts).toLocaleString("es-CL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Chat interno", sub: "Conversa con tu equipo dentro del panel" }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 760, background: T.surface, border: "1px solid " + T.line, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", height: "62vh" } }, /* @__PURE__ */ React.createElement("div", { ref: endRef, className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 } }, msgs.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { margin: "auto", fontFamily: T.sans, fontSize: 12.5, color: T.textFaint } }, "Sin mensajes a\xFAn. Escribe el primero \u{1F447}"), msgs.map((m) => {
    const mine = m.author === yo;
    return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "80%" } }, !mine && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, margin: "0 4px 3px" } }, m.author), /* @__PURE__ */ React.createElement("div", { style: { background: mine ? T.accent : T.surface2, color: mine ? T.onAccent || "#fff" : T.text, border: mine ? "none" : "1px solid " + T.line, borderRadius: 12, padding: "9px 13px", fontFamily: T.sans, fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" } }, m.text), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, color: T.textFaint, margin: "3px 4px 0", textAlign: mine ? "right" : "left" } }, hora(m.ts)));
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: "12px 14px", borderTop: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("input", { value: txt, onChange: (e) => setTxt(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }, placeholder: "Escribe un mensaje\u2026", style: { flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: send }, "Enviar"))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 10 } }, "Los mensajes se sincronizan con todo el equipo de la cl\xEDnica."));
}
function FlujoCajaChart({ T, title }) {
  const D = window.JCDATA;
  let cash = [];
  try {
    cash = window.cashMovimientos && window.cashMovimientos() || window.cashAll && window.cashAll() || [];
  } catch (e) {
  }
  const now = /* @__PURE__ */ new Date();
  const meses = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    meses.push({ key: d.toISOString().slice(0, 7), lbl: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][d.getMonth()] });
  }
  const data = meses.map((m) => {
    const ms = cash.filter((x) => (x._day || x.ts || "").slice(0, 7) === m.key);
    const ing = ms.filter((x) => x.type !== "egreso").reduce((s, x) => s + (x.amount || 0), 0);
    const egr = ms.filter((x) => x.type === "egreso").reduce((s, x) => s + (x.amount || 0), 0);
    return { ...m, ing, egr, neto: ing - egr };
  });
  const maxV = Math.max(1, ...data.map((d) => Math.max(d.ing, d.egr)));
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "18px 20px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text, marginBottom: 16 } }, title || "Flujo de caja \xB7 \xFAltimos 6 meses"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 14, height: 180 } }, data.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.key, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("div", { title: "Ingresos " + D.fmt(m.ing), style: { width: "40%", height: Math.round(m.ing / maxV * 140) + "px", minHeight: 2, background: "#1F8A5B", borderRadius: "4px 4px 0 0" } }), /* @__PURE__ */ React.createElement("div", { title: "Egresos " + D.fmt(m.egr), style: { width: "40%", height: Math.round(m.egr / maxV * 140) + "px", minHeight: 2, background: "#C0285A", borderRadius: "4px 4px 0 0" } })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, m.lbl)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, marginTop: 14, justifyContent: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, /* @__PURE__ */ React.createElement("span", { style: { width: 11, height: 11, borderRadius: 3, background: "#1F8A5B" } }), "Ingresos"), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, /* @__PURE__ */ React.createElement("span", { style: { width: 11, height: 11, borderRadius: 3, background: "#C0285A" } }), "Egresos")));
}
function FlujoCajaView({ T }) {
  const D = window.JCDATA;
  let cash = [];
  try {
    cash = window.cashMovimientos && window.cashMovimientos() || window.cashAll && window.cashAll() || [];
  } catch (e) {
  }
  const cm = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  const ms = cash.filter((x) => (x._day || x.ts || "").slice(0, 7) === cm);
  const ing = ms.filter((x) => x.type !== "egreso").reduce((s, x) => s + (x.amount || 0), 0);
  const egr = ms.filter((x) => x.type === "egreso").reduce((s, x) => s + (x.amount || 0), 0);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Flujo de caja", sub: "Visualiza tus movimientos de dinero" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Ingresos del mes", v: D.fmt(ing), c: "#1F8A5B" }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Egresos del mes", v: D.fmt(egr), c: "#C0285A" }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Neto del mes", v: D.fmt(ing - egr), c: T.accent, strong: true })), /* @__PURE__ */ React.createElement(FlujoCajaChart, { T }));
}
const SII_FACTURADORES = [
  { k: "LibreDTE", link: "https://libredte.cl/", desc: "Gratuito/open source \xB7 boleta y factura electr\xF3nica" },
  { k: "Bsale", link: "https://www.bsale.cl/", desc: "Boletas, facturas y POS" },
  { k: "Nubox", link: "https://www.nubox.com/", desc: "Facturaci\xF3n y contabilidad" },
  { k: "Facturaci\xF3n gratuita SII", link: "https://www.sii.cl/servicios_online/1039-.html", desc: "Sistema gratuito del propio SII" }
];
function BoletasView({ T, patients }) {
  const D = window.JCDATA;
  const [sii, setSii] = useState(() => {
    try {
      return window.DB && window.DB.get("sii_cfg") || { facturador: "" };
    } catch (e) {
      return { facturador: "" };
    }
  });
  function saveSii(n) {
    setSii(n);
    try {
      window.DB && window.DB.set("sii_cfg", n);
    } catch (e) {
    }
  }
  const connected = !!sii.facturador;
  let cash = [];
  try {
    cash = window.cashMovimientos && window.cashMovimientos() || window.cashAll && window.cashAll() || [];
  } catch (e) {
  }
  const mes = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  const atenc = cash.filter((m) => m.kind === "atencion" && (m._day || m.ts || "").slice(0, 7) === mes);
  const [emitidas, setEmitidas] = useState(() => {
    try {
      return window.DB && window.DB.get("boletas_emitidas") || {};
    } catch (e) {
      return {};
    }
  });
  function emitir(m) {
    const b = { wm: window.clinicName && window.clinicName() || "Medique" };
    const num = "B-" + Date.now().toString().slice(-6);
    const inner = "<div class='titleblock'><div><div class='eyebrow'>Comprobante</div><h1 class='doc-title'>Boleta <span class='it'>de atenci\xF3n</span></h1></div><div class='folio'><span class='k'>N\xB0</span><span class='v vbig'>" + num + "</span></div></div><div class='body'><div class='section'><div class='section-head'><span class='sh-label'>Detalle</span><span class='sh-rule'></span></div><div class='textbox'>" + (m.concept || "Atenci\xF3n") + "<br>Fecha: " + (m.ts || "").slice(0, 10) + "<br>M\xE9todo: " + (m.method || "\u2014") + "<br><br><b>Total: " + D.fmt(m.amount || 0) + "</b></div></div></div>";
    try {
      if (window.jcmDocHTML && window.jcmPrintHTML) window.jcmPrintHTML(window.jcmDocHTML("Boleta " + num, b, inner));
    } catch (e) {
    }
    const n = { ...emitidas, [m.id]: num };
    setEmitidas(n);
    try {
      window.DB && window.DB.set("boletas_emitidas", n);
    } catch (e) {
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Boletas", sub: "Emite comprobantes de tus atenciones cobradas" }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Boleta electr\xF3nica (SII)"), /* @__PURE__ */ React.createElement("div", { style: { background: connected ? "rgba(31,138,91,.08)" : T.accentSoft || "rgba(84,112,127,.10)", border: "1px solid " + (connected ? "#1F8A5B44" : T.line), borderRadius: 12, padding: "14px 16px", marginBottom: 14, fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.5 } }, connected ? /* @__PURE__ */ React.createElement("span", null, "Facturador conectado: ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, sii.facturador), ". Las credenciales/certificado SII se cargan en el servidor para emitir boletas con folio v\xE1lido.") : /* @__PURE__ */ React.createElement("span", null, "Puedes ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "imprimir/guardar"), " el comprobante ahora mismo. Para ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "boleta electr\xF3nica con folio v\xE1lido"), ", conecta un facturador autorizado por el SII:")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 10, marginBottom: 22 } }, SII_FACTURADORES.map((fz) => {
    const sel = sii.facturador === fz.k;
    return /* @__PURE__ */ React.createElement("div", { key: fz.k, style: { background: T.surface, border: "1px solid " + (sel ? T.accent : T.line), borderRadius: 12, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, fz.k), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "4px 0 12px", lineHeight: 1.5 } }, fz.desc), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: fz.link, target: "_blank", rel: "noopener", style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: "#fff", background: T.accent, borderRadius: 8, padding: "8px 13px", textDecoration: "none" } }, "Conectar \u2197"), /* @__PURE__ */ React.createElement("button", { onClick: () => saveSii({ ...sii, facturador: sel ? "" : fz.k }), style: { fontFamily: T.sans, fontSize: 11.5, color: sel ? T.accent : T.textMute, background: "none", border: "1px solid " + (sel ? T.accent : T.line), borderRadius: 8, padding: "8px 13px", cursor: "pointer" } }, sel ? "\u2713 En uso" : "Usar este")));
  })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Atenciones cobradas este mes"), atenc.length === 0 ? /* @__PURE__ */ React.createElement(Empty2, { T }, "Sin atenciones cobradas este mes.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, atenc.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.id, style: { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "11px 14px", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 180 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, m.concept), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint } }, (m.ts || "").slice(0, 10), " \xB7 ", m.method)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, color: "#1F8A5B" } }, D.fmt(m.amount || 0)), emitidas[m.id] ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Boleta ", emitidas[m.id]) : null, /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, onClick: () => emitir(m) }, emitidas[m.id] ? "Reimprimir" : "Emitir boleta")))));
}
function DesempenoView({ T, patients, appts }) {
  const D = window.JCDATA;
  const mes = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
  const A = (appts || []).filter((a) => a.status !== "anulada");
  const citasMes = A.filter((a) => (a.fecha || "").slice(0, 7) === mes);
  const noShow = A.filter((a) => a.status === "no_asistio").length;
  const atendidas = A.filter((a) => a.status === "atendida" || a.attended).length;
  const totalCerradas = noShow + atendidas;
  const noShowPct = totalCerradas ? Math.round(noShow / totalCerradas * 100) : 0;
  const recurrentes = patients.filter((p) => (p.recetas || []).length + (p.history || []).length >= 2).length;
  const retencion = patients.length ? Math.round(recurrentes / patients.length * 100) : 0;
  let cash = [];
  try {
    cash = window.cashAll && window.cashAll() || [];
  } catch (e) {
  }
  const atMes = cash.filter((m) => m.kind === "atencion" && (m.ts || "").slice(0, 7) === mes);
  const ingMes = atMes.reduce((s, m) => s + (m.amount || 0), 0);
  const ticket = atMes.length ? Math.round(ingMes / atMes.length) : 0;
  const nuevosMes = patients.filter((p) => {
    const t = p.fechaTs || 0;
    if (!t) return false;
    return new Date(t).toISOString().slice(0, 7) === mes;
  }).length;
  const card = (l, v, c, sub) => /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute } }, l), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 30, color: c || T.text, lineHeight: 1.1, marginTop: 4 } }, v), sub && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 3 } }, sub));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Panel de desempe\xF1o", sub: "El diagn\xF3stico oportuno para tu centro de salud" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginBottom: 14 } }, card("Citas del mes", citasMes.length, T.accent, "agendadas"), card("Atendidas", atendidas, "#1F8A5B", "en total"), card("Inasistencia", noShowPct + "%", noShowPct > 20 ? "#C0285A" : "#C9A227", noShow + " no asisti\xF3"), card("Retenci\xF3n", retencion + "%", "#1F8A5B", recurrentes + " con 2+ atenciones"), card("Ticket promedio", D.fmt(ticket), T.accent, "por atenci\xF3n"), card("Pacientes nuevos", nuevosMes, "#2AA5C9", "este mes")), /* @__PURE__ */ React.createElement("div", { style: { background: T.accentSoft || "rgba(84,112,127,.08)", border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px", maxWidth: 760, fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.6 } }, noShowPct > 20 ? "\u26A0 Tu inasistencia est\xE1 alta (" + noShowPct + "%). Activa recordatorios y confirmaci\xF3n de citas para bajarla." : "\u2713 Tu inasistencia est\xE1 controlada.", " ", retencion < 30 ? " La retenci\xF3n es baja: considera campa\xF1as de re-cita y fidelidad." : " Buena retenci\xF3n de pacientes."));
}
function EncuestasView({ T, patients }) {
  const [cfg, setCfg] = useState(() => {
    try {
      return window.DB && window.DB.get("survey_cfg") || { pregunta: "\xBFQu\xE9 tan satisfecho quedaste con tu atenci\xF3n?", activa: true };
    } catch (e) {
      return { pregunta: "\xBFQu\xE9 tan satisfecho quedaste con tu atenci\xF3n?", activa: true };
    }
  });
  const [resp, setResp] = useState(() => {
    try {
      return window.DB && window.DB.get("survey_responses") || [];
    } catch (e) {
      return [];
    }
  });
  function saveCfg(n) {
    setCfg(n);
    try {
      window.DB && window.DB.set("survey_cfg", n);
    } catch (e) {
    }
  }
  function addResp(nota) {
    const n = [{ id: "s" + Date.now(), nota, ts: Date.now() }, ...resp].slice(0, 500);
    setResp(n);
    try {
      window.DB && window.DB.set("survey_responses", n);
    } catch (e) {
    }
  }
  const prom = resp.length ? resp.reduce((s, r) => s + (r.nota || 0), 0) / resp.length : 0;
  const promotores = resp.filter((r) => r.nota >= 9).length, detractores = resp.filter((r) => r.nota <= 6).length;
  const nps = resp.length ? Math.round((promotores - detractores) / resp.length * 100) : 0;
  const reviewUrl = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.reviewLink ? window.JCSAAS.reviewLink() : "";
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Encuestas de satisfacci\xF3n", sub: "Conoce la opini\xF3n de tus pacientes y potencia tu atenci\xF3n" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Respuestas", v: resp.length, c: T.accent }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "Promedio (0\u201310)", v: prom.toFixed(1), c: "#1F8A5B" }), /* @__PURE__ */ React.createElement(CajaCard, { T, l: "NPS", v: nps, c: nps >= 50 ? "#1F8A5B" : nps >= 0 ? "#C9A227" : "#C0285A" })), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", marginBottom: 16, maxWidth: 760 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 8 } }, "Pregunta de la encuesta"), /* @__PURE__ */ React.createElement("input", { value: cfg.pregunta, onChange: (e) => saveCfg({ ...cfg, pregunta: e.target.value }), style: { width: "100%", padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" } }), reviewUrl && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 10, lineHeight: 1.5 } }, "Comp\xE1rtela junto a tu enlace de rese\xF1as: ", /* @__PURE__ */ React.createElement("a", { href: reviewUrl, target: "_blank", rel: "noopener", style: { color: T.accent } }, reviewUrl))), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", maxWidth: 760 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, marginBottom: 10 } }, "Registrar respuesta (0 = malo, 10 = excelente):"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => /* @__PURE__ */ React.createElement("button", { key: n, onClick: () => addResp(n), style: { width: 40, height: 40, borderRadius: 9, cursor: "pointer", border: "1px solid " + (n <= 6 ? "#C0285A55" : n <= 8 ? "#C9A22755" : "#1F8A5B55"), background: "transparent", color: n <= 6 ? "#C0285A" : n <= 8 ? "#C9A227" : "#1F8A5B", fontFamily: T.sans, fontSize: 14, fontWeight: 600 } }, n))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 10 } }, "Cuando conectemos WhatsApp/Meta, estas respuestas podr\xE1n llegar solas tras cada atenci\xF3n.")));
}
const PAY_PROVIDERS = [
  { k: "Mercado Pago", link: "https://www.mercadopago.cl/developers/panel/app", env: "MP_ACCESS_TOKEN", ready: true, desc: "Access Token de producci\xF3n" },
  { k: "Flow", link: "https://www.flow.cl/app/web/misDatos.php", env: "FLOW_API_KEY + FLOW_SECRET", ready: true, desc: "API Key y Secret Key" },
  { k: "Transbank (Webpay)", link: "https://www.transbankdevelopers.cl/", env: "TBK_API_KEY + TBK_COMMERCE_CODE", ready: false, desc: "C\xF3digo de comercio y API key" },
  { k: "Khipu", link: "https://khipu.com/page/inicio", env: "KHIPU_RECEIVER_ID + KHIPU_SECRET", ready: false, desc: "Receiver ID y Secret" }
];
function PagosOnlineView({ T, patients }) {
  const [cfg, setCfg] = useState(() => {
    try {
      return window.DB && window.DB.get("pay_cfg") || { provider: "Mercado Pago", anticipado: false };
    } catch (e) {
      return { provider: "Mercado Pago", anticipado: false };
    }
  });
  function saveCfg(n) {
    setCfg(n);
    try {
      window.DB && window.DB.set("pay_cfg", n);
    } catch (e) {
    }
  }
  const [pid, setPid] = useState("");
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const [busy, setBusy] = useState(false);
  const [link, setLink] = useState("");
  const [err, setErr] = useState("");
  const pat = patients.find((p) => p.id === pid);
  async function generar() {
    setErr("");
    setLink("");
    const amt = parseInt(monto, 10) || 0;
    if (!cfg.provider) {
      setErr("Elige un proveedor.");
      return;
    }
    if (amt < 100) {
      setErr("Ingresa un monto v\xE1lido.");
      return;
    }
    setBusy(true);
    try {
      const tok = window.JCSAAS && window.JCSAAS.idToken ? await window.JCSAAS.idToken() : null;
      const r = await fetch("/api/pay-link", { method: "POST", headers: { "Content-Type": "application/json", ...tok ? { Authorization: "Bearer " + tok } : {} }, body: JSON.stringify({ provider: cfg.provider, amount: amt, desc: (concepto.trim() || "Atenci\xF3n") + (pat ? " \xB7 " + pat.name : "") }) }).then((x) => x.json());
      if (r && r.ok && r.url) setLink(r.url);
      else if (r && r.configured === false) setErr("A\xFAn no est\xE1 activo: el administrador debe cargar las credenciales del proveedor en el servidor.");
      else setErr(r && r.error || "No se pudo generar el link.");
    } catch (e) {
      setErr("No se pudo contactar el servidor de pagos.");
    }
    setBusy(false);
  }
  function waLink() {
    if (!pat || !link) return;
    const ph = (pat.phone || "").replace(/\D/g, "");
    if (ph.length < 8) {
      window.jcmToast && window.jcmToast("El paciente no tiene tel\xE9fono.", "info");
      return;
    }
    const clin = window.clinicName && window.clinicName() || "Medique";
    const msg = "Hola " + (pat.name || "") + " \u{1F44B} Aqu\xED tu link de pago para " + (concepto.trim() || "tu atenci\xF3n") + " en " + clin + ":\n" + link;
    window.open("https://wa.me/" + ph + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  }
  const inp = { padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SecHead, { T, title: "Pagos online", sub: "Cobra en l\xEDnea, asegura asistencia y concilia autom\xE1tico" }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "1 \xB7 Conecta tu cuenta"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 12, marginBottom: 22 } }, PAY_PROVIDERS.map((p) => {
    const sel = cfg.provider === p.k;
    return /* @__PURE__ */ React.createElement("div", { key: p.k, style: { background: T.surface, border: "1px solid " + (sel ? T.accent : T.line), borderRadius: 12, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, p.k), p.ready ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: "#1F8A5B", border: "1px solid #1F8A5B55", borderRadius: 999, padding: "3px 9px" } }, "Listo para conectar") : /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.textMute, border: "1px solid " + T.line, borderRadius: 999, padding: "3px 9px" } }, "A pedido")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, margin: "6px 0 12px", lineHeight: 1.5 } }, "Credenciales: ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, p.desc)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: p.link, target: "_blank", rel: "noopener", style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: "#fff", background: T.accent, borderRadius: 8, padding: "9px 14px", textDecoration: "none" } }, "Conectar / crear cuenta \u2197"), /* @__PURE__ */ React.createElement("button", { onClick: () => saveCfg({ ...cfg, provider: p.k }), style: { fontFamily: T.sans, fontSize: 11.5, color: sel ? T.accent : T.textMute, background: "none", border: "1px solid " + (sel ? T.accent : T.line), borderRadius: 8, padding: "9px 14px", cursor: "pointer" } }, sel ? "\u2713 Elegido" : "Usar este")));
  })), /* @__PURE__ */ React.createElement("div", { style: { background: T.accentSoft || "rgba(84,112,127,.08)", border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", marginBottom: 22, fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.6 } }, "\u{1F512} Por seguridad, las ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "credenciales secretas"), " se cargan en el servidor (Vercel \u2192 Variables de entorno: ", /* @__PURE__ */ React.createElement("code", null, (PAY_PROVIDERS.find((p) => p.k === cfg.provider) || {}).env || "\u2026"), "), nunca en el navegador. Una vez cargadas, el bot\xF3n de abajo genera links reales."), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "2 \xB7 Genera un link de pago"), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "16px 18px", maxWidth: 720 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 140px", gap: 8, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("select", { value: pid, onChange: (e) => setPid(e.target.value), style: inp }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Paciente (opcional)\u2026"), patients.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.name))), /* @__PURE__ */ React.createElement("input", { value: monto, onChange: (e) => setMonto(e.target.value.replace(/\D/g, "")), inputMode: "numeric", placeholder: "Monto $", style: inp })), /* @__PURE__ */ React.createElement("input", { value: concepto, onChange: (e) => setConcepto(e.target.value), placeholder: "Concepto (ej: Botox 3 zonas)", style: { ...inp, width: "100%", marginBottom: 10 } }), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: generar }, busy ? "Generando\u2026" : "Generar link de pago (" + (cfg.provider || "\u2014") + ")"), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", marginTop: 10, lineHeight: 1.5 } }, err), link && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, padding: "12px 14px", background: T.bg, border: "1px solid " + T.line, borderRadius: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 6 } }, "Link generado"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("input", { readOnly: true, value: link, onFocus: (e) => e.target.select(), style: { ...inp, flex: 1, minWidth: 220, fontSize: 12 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    try {
      navigator.clipboard.writeText(link);
      window.jcmToast && window.jcmToast("Link copiado.", "ok");
    } catch (e) {
    }
  }, style: { fontFamily: T.sans, fontSize: 11.5, color: T.text, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "0 13px", cursor: "pointer" } }, "Copiar"), /* @__PURE__ */ React.createElement("a", { href: link, target: "_blank", rel: "noopener", style: { display: "inline-flex", alignItems: "center", fontFamily: T.sans, fontSize: 11.5, color: T.text, background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 8, padding: "0 13px", textDecoration: "none" } }, "Abrir"), pat && /* @__PURE__ */ React.createElement("button", { onClick: waLink, style: { fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: "#1F8A5B", background: "none", border: "1px solid #1F8A5B", borderRadius: 8, padding: "9px 13px", cursor: "pointer" } }, "WhatsApp")))));
}
Object.assign(window, { CADMIN, clinVal, MiniCalendar, ServiciosView, EquipoView, ProfesionalForm, SucursalesView, CrmView, TutorialesView, ConsentimientosView, DifusionesView, CopilotConfigView, FichaEditorView, PERM_SECCIONES, FidelidadView, MarketingView, Mini, IntegracionesView, ReportesView, ConfigView, ClinCard, Row, ToggleRow, ColaboracionView, FichaClinicaForm, SecHead, AdSwitch, HorariosEditor, IndTemplatesEditor, getIndTemplates, PendientesView, Group, Empty2, PendRow, InventarioView, NewInvModal, NewProcModal, invAdj, AdministracionView, INV_SEED, PROC_SEED, CajaView, cashAdd, cashDelete, cashToday, cashMovimientos, _localDay, jcmInsumoCost, jcmAdCostPerPatient, NotasClinicasView, ResumenClinicoView, ContactCenterView, ReportesIAView, ContraloriaView, PagosGastosView, RemuneracionesView, LaboratoriosView, ConveniosView, ChatInternoView, FlujoCajaView, BoletasView, DesempenoView, EncuestasView, PagosOnlineView });
