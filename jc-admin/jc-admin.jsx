/* ═══════════════ JC MEDICAL · PANEL CLÍNICO (shell) ═══════════════ */

function fmtTime(d) { return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0"); }
function mins(t) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }

function nIcon(name, c) {
  const p = {
    resumen: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    agenda: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>,
    pacientes: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0M16 11h5M18.5 8.5v5" /></>,
    pendientes: <><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></>,
    servicios: <><path d="M4 7h16M4 12h16M4 17h10" /></>,
    equipo: <><circle cx="9" cy="8" r="3" /><path d="M2 20a6 6 0 0 1 11 0M16 6a3 3 0 0 1 0 6M22 20a6 6 0 0 0-5-5.9" /></>,
    fidelidad: <><path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8z" /></>,
    marketing: <><path d="M3 11v3a1 1 0 0 0 1 1h3l4 4V7L7 11H4a1 1 0 0 0-1 0z" /><path d="M16 9a3 3 0 0 1 0 6" /></>,
    integraciones: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><path d="M17 13v8M21 17h-8" /></>,
    reportes: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    colaboracion: <><path d="M16 4h2a2 2 0 0 1 2 2v14l-4-3H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M9 4h6v4H9z" /></>,
    administracion: <><path d="M3 21h18M5 21V7l8-4 8 4v14M9 9h2M9 13h2M9 17h2M15 9h2M15 13h2M15 17h2" /></>,
    inventario: <><path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" /></>,
    caja: <><rect x="2.5" y="6" width="19" height="13" rx="2" /><path d="M2.5 10h19M6 15h4" /></>,
    config: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5a7 7 0 0 0 .1-1z" /></>,
    appjcm: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10.5 18h3" /></>,
    dashboard: <><rect x="3" y="3" width="8" height="5" rx="1.5" /><rect x="3" y="11" width="8" height="10" rx="1.5" /><rect x="13" y="3" width="8" height="10" rx="1.5" /><rect x="13" y="16" width="8" height="5" rx="1.5" /></>,
    salaespera: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    automatizaciones: <><path d="M12 3a4 4 0 0 0-4 4v1H6a3 3 0 0 0 0 6h.5M12 3a4 4 0 0 1 4 4v1h2a3 3 0 0 1 0 6h-.5M9 21l3-3 3 3M12 11v7" /></>,
    agenteia: <><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V5M9 13h.01M15 13h.01M2 13h2M20 13h2" /></>,
    sucursales: <><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5M9 11h.01M15 11h.01" /></>,
    crm: <><path d="M3 4h18M6 4v6l4 4v6l4-2v-4l4-4V4" /></>,
    tutoriales: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5l5 3.5-5 3.5z" /></>,
    consentimientos: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 14l2 2 4-4" /></>,
    difusiones: <><path d="M3 11l16-6v14L3 13zM3 11v4M9 13v4a2 2 0 0 0 3 1.7" /></>,
    copilot: <><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" /></>,
    fichaeditor: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    // ── Secciones nuevas (suite N1–N10) ──
    notasia: <><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
    resumenia: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5M9 3h4v3H9z" /></>,
    contactcenter: <><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    reportesia: <><path d="M12 3a9 9 0 1 0 9 9h-9z" /><path d="M12 3v9l6.4-6.4" /></>,
    contraloria: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
    desempeno: <><path d="M4 20V4M4 20h16M8 20v-6M12 20V9M16 20v-9M20 20v-4" /></>,
    encuestas: <><path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8z" /></>,
    chatinterno: <><path d="M8 10h8M8 14h5" /><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></>,
    pagosgastos: <><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 3v9h9" /><path d="M12 12l6-6" /></>,
    remuneraciones: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h2M12 10h4M8 14h2M12 14h4M8 18h4" /></>,
    laboratorios: <><path d="M9 2v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 17l-5-9V2M8 2h8M7 14h10" /></>,
    convenios: <><path d="M8 12l2 2 4-4" /><path d="M2 12l4-4 3 2 3-3 3 3 3-2 4 4-4 4-3-2-3 3-3-3-3 2z" /></>,
    flujocaja: <><path d="M3 17l6-6 4 4 8-8M21 7h-4M21 7v4" /></>,
    boletas: <><path d="M6 2h12v20l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4" /></>,
    pagosonline: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 9h19M6 15h4" /></>
  }[name];
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
}

/* Buscador directo de pacientes (barra superior, estilo Medique) */
function PatientSearch({ T, patients, onOpen }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const res = q.trim() ? (patients || []).filter(p =>
    (p.name || "").toLowerCase().includes(q.toLowerCase()) ||
    (p.rut || "").toLowerCase().includes(q.toLowerCase()) ||
    (p.email || "").toLowerCase().includes(q.toLowerCase()) ||
    (p.phone || "").includes(q)).slice(0, 7) : [];
  return (
    <div style={{ position: "relative", flex: 1, maxWidth: 320, minWidth: 140 }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.7" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
      <input value={q} onChange={e => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Buscar pacientes…" style={{ width: "100%", fontFamily: T.sans, fontSize: 12.5, padding: "8px 12px 8px 32px", borderRadius: 999, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.text, outline: "none" }} />
      {open && res.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, boxShadow: T.shadow, zIndex: 40, overflow: "hidden" }}>
          {res.map(p => (
            <button key={p.id} onMouseDown={() => { onOpen(p.id); setQ(""); setOpen(false); }} style={{ width: "100%", textAlign: "left", display: "block", padding: "9px 13px", border: "none", borderBottom: "1px solid " + T.line, background: "transparent", cursor: "pointer" }}>
              <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text }}>{p.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>{p.rut || p.phone || "Paciente"}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const ADMIN_NAV = [
  { k: "dashboard", l: "Dashboard" },
  { k: "appjcm", l: "App JC Medical" },
  { k: "agenda", l: "Agenda" }, { k: "pacientes", l: "Pacientes" }, { k: "salaespera", l: "Sala de espera" }, { k: "pendientes", l: "Pendientes" }, { k: "caja", l: "Registro de Ventas" },
  { k: "inventario", l: "Inventario" }, { k: "servicios", l: "Tratamientos" }, { k: "equipo", l: "Equipo" }, { k: "sucursales", l: "Sucursales" }, { k: "marketing", l: "Marketing" },
  { k: "crm", l: "CRM · Embudo" }, { k: "difusiones", l: "Difusiones" }, { k: "agenteia", l: "Agente IA" }, { k: "copilot", l: "Asistente IA" }, { k: "automatizaciones", l: "Automatizaciones" },
  { k: "resumen", l: "Resumen" }, { k: "colaboracion", l: "Colaboraciones" }, { k: "fidelidad", l: "Fidelidad" },
  { k: "integraciones", l: "Integraciones" }, { k: "reportes", l: "Reportes" }, { k: "administracion", l: "Administración" }, { k: "consentimientos", l: "Consentimientos" }, { k: "fichaeditor", l: "Editor de Fichas" }, { k: "tutoriales", l: "Tutoriales" }, { k: "config", l: "Configuración" },
  // ── Suite nueva (N1–N10), gateada a Los Medique hasta aprobación ──
  { k: "notasia", l: "Notas Clínicas" }, { k: "resumenia", l: "Resumen Clínico" }, { k: "contactcenter", l: "Contact Center" }, { k: "reportesia", l: "Reportes IA" }, { k: "contraloria", l: "Contralor IA" },
  { k: "desempeno", l: "Panel de desempeño" }, { k: "encuestas", l: "Encuestas" }, { k: "chatinterno", l: "Chat interno" },
  { k: "pagosgastos", l: "Pagos y Gastos" }, { k: "remuneraciones", l: "Remuneraciones" }, { k: "laboratorios", l: "Laboratorios" }, { k: "convenios", l: "Convenios" }, { k: "flujocaja", l: "Flujo de caja" }, { k: "boletas", l: "Boletas" }, { k: "pagosonline", l: "Pagos online" }
];
// Secciones NUEVAS (suite N1–N10): visibles SOLO para Los Medique (preview) hasta el push global.
var NEW_SECT = { notasia: 1, resumenia: 1, contactcenter: 1, reportesia: 1, contraloria: 1, desempeno: 1, encuestas: 1, chatinterno: 1, pagosgastos: 1, remuneraciones: 1, laboratorios: 1, convenios: 1, flujocaja: 1, boletas: 1, pagosonline: 1 };
// Encabezado de grupo del sidebar: la clave donde COMIENZA un grupo → su etiqueta (Área 1).
const SIDE_GROUP_HEAD = { dashboard: "Inicio", agenda: "Clínica", marketing: "Marketing & Ventas", resumen: "Análisis", administracion: "Sistema" };
// Grupos de la barra superior (F8): juntar apartados similares en menús desplegables. IA en su propio grupo.
const NAV_TOP_GROUPS = [
  // "App JC Medical" ya no va en desplegable: es botón directo (2º) y solo aparece en la
  // clínica de JC Medical (gateado por showJcApp en adminNavItems). El grupo "Inicio" se quita.
  { l: "Clínica", keys: ["agenda", "pacientes", "salaespera", "pendientes", "caja", "inventario", "servicios", "equipo", "sucursales"] },
  { l: "Marketing", keys: ["marketing", "crm", "difusiones", "encuestas"] },
  { l: "IA", keys: ["agenteia", "copilot", "automatizaciones", "notasia", "resumenia", "contactcenter", "reportesia", "contraloria"] },
  // "Análisis" ahora solo agrupa lo analítico (Resumen IA + Reportes). Fidelidad, Colaboración
  // e Integraciones pasan a su propio menú "Herramientas". (P22)
  { l: "Análisis", keys: ["resumen", "reportes", "desempeno"] },
  { l: "Herramientas", keys: ["fidelidad", "colaboracion", "integraciones", "chatinterno"] },
  { l: "Gestión", keys: ["pagosgastos", "remuneraciones", "laboratorios", "convenios", "flujocaja", "boletas", "pagosonline"] },
  { l: "Sistema", keys: ["administracion", "consentimientos", "fichaeditor", "tutoriales", "config"] }
];
// Pestañas FIJAS de acceso rápido en la barra superior (siempre visibles, no dentro de un grupo).
// Incluye todo el grupo Clínica (a pedido): el desplegable "Clínica" desaparece.
const NAV_PINNED = ["dashboard", "appjcm", "agenda", "pacientes", "salaespera", "pendientes", "caja", "inventario", "servicios", "equipo", "sucursales"];

// Al anular una cita: avisar al paciente por correo que quedó cancelada (si tiene email y la cita es
// de hoy o futura). Así el recordatorio previo queda "anulado" para el paciente. Best-effort, no bloquea.
function jcmCancelNotice(a) {
  try {
    if (!a || !window.mediqueEmail) return;
    var todayISO = new Date().toISOString().slice(0, 10);
    if (a.fecha && a.fecha < todayISO) return; // no avisar de citas pasadas
    var email = a.email;
    if (!email) { try { var pts = (window.DB && window.DB.get("patients")) || []; var p = pts.find(function (x) { return x.id === a.patId; }); email = p && p.email; } catch (e) {} }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    var clinic = (function () { try { return (window.clinicName && window.clinicName()) || (window.DB && window.DB.cfg && window.DB.cfg().clinic_name) || "tu clínica"; } catch (e) { return "tu clínica"; } })();
    var nombre = (((a.name || "") + "").split(" ")[0]) || "";
    var cuando = (a.fecha || "") + (a.time ? " a las " + a.time : "");
    var text = "Hola " + nombre + ",\n\nTe informamos que tu cita en " + clinic + (cuando ? " (" + cuando + ")" : "") + " fue cancelada. Si deseas reagendar, responde este correo y coordinamos una nueva hora.\n\n— " + clinic;
    window.mediqueEmail({ to: ("" + email).trim(), subject: "Tu cita en " + clinic + " fue cancelada", text: text })
      .then(function (r) { try { if (r && r.ok) window.jcmToast && window.jcmToast("Se avisó al paciente por correo de la cancelación.", "ok"); } catch (e) {} }, function () {});
  } catch (e) {}
}

// La pestaña "App JC Medical" es exclusiva: solo se muestra en modo local (sin SaaS)
// o en clínicas con el flag jcApp activado (lo activa el super-admin). Las demás no la ven.
// ¿La clínica activa es Los Medique? (cuenta de pruebas del backlog Medique vs Clinera)
// Robusto: reconoce por ownerEmail de la clínica O por el correo de la sesión activa.
var LOS_MEDIQUE_EMAIL = "makikarenina06@gmail.com";
function isLosMedique() {
  try {
    if (!(window.JCSAAS && window.JCSAAS.enabled)) return false;
    var owner = (((window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || {}).ownerEmail || "").toString().trim().toLowerCase();
    var sess = (window.JCSAAS.userEmail && window.JCSAAS.userEmail()) || "";
    return owner === LOS_MEDIQUE_EMAIL || sess === LOS_MEDIQUE_EMAIL;
  } catch (e) { return false; }
}
// Gate de la SUITE NUEVA (N1–N10): solo Los Medique (o modo local) hasta el push global.
// Se expone para gatear también features dentro de la ficha (presupuesto, esquema facial, vademécum).
function jcmNewFeat() { return !(window.JCSAAS && window.JCSAAS.enabled) || isLosMedique(); }
if (typeof window !== "undefined") window.jcmNewFeat = jcmNewFeat;
// Secciones NUEVAS del backlog: en SaaS solo visibles para Los Medique; en modo local, siempre (para probar).
var ADMIN_BETA_SECTIONS = { sucursales: 1, crm: 1, difusiones: 1, copilot: 1, consentimientos: 1, fichaeditor: 1, tutoriales: 1 };
// Permiso (PERM_SECCIONES de la ficha del profesional) → claves de sección que desbloquea.
var PERM_NAV = {
  "Agenda": ["agenda", "salaespera", "pendientes"],
  "Pacientes": ["pacientes"],
  "Servicios": ["servicios", "equipo", "sucursales"],
  "Inventario": ["inventario"],
  "Reportes": ["reportes", "resumen", "caja"],
  "Marketing": ["marketing", "crm", "difusiones", "agenteia", "copilot", "automatizaciones", "fidelidad", "colaboracion"],
  "Configuración": ["config", "administracion", "consentimientos", "fichaeditor", "tutoriales", "integraciones"]
};
function adminNavItems() {
  var showJcApp = !(window.JCSAAS && window.JCSAAS.enabled)
    || (((window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || {}).jcApp === true);
  // Las secciones nuevas del backlog YA están liberadas para TODAS las clínicas (antes eran
  // beta solo para Los Medique). El push es global: quien tenga el código nuevo las ve.
  var beta = true;
  // Multiusuario: si el que inició sesión es PROFESIONAL, limita las secciones a sus permisos.
  // Solo se activa con role === 'professional'; el dueño (owner/staff) ve todo, sin cambios.
  var allowed = null;
  try {
    var role = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentRole) ? window.JCSAAS.currentRole() : 'owner';
    if (role === 'professional') {
      var perms = (window.JCSAAS.currentPerms && window.JCSAAS.currentPerms()) || {};
      allowed = { dashboard: 1, appjcm: 1 };
      Object.keys(PERM_NAV).forEach(function (p) { if (perms[p]) PERM_NAV[p].forEach(function (k) { allowed[k] = 1; }); });
    }
  } catch (e) { allowed = null; }
  // Suite nueva: solo Los Medique (o modo local) hasta el push global.
  var newBeta = !(window.JCSAAS && window.JCSAAS.enabled) || isLosMedique();
  return ADMIN_NAV.filter(function (n) {
    if (n.k === "appjcm" && !showJcApp) return false;
    if (ADMIN_BETA_SECTIONS[n.k] && !beta) return false;
    if (NEW_SECT[n.k] && !newBeta) return false;
    if (allowed && !allowed[n.k]) return false;
    return true;
  });
}

// Aísla los datos por clínica. En SaaS, las clínicas parten VACÍAS (operacional);
// solo la clínica BASE (JC Medical) conserva sus servicios/equipo/inventario reales.
// Se ejecuta antes de montar el panel, así los seeds en memoria quedan neutralizados.
function scopeClinicData() {
  if (!(window.JCSAAS && window.JCSAAS.enabled)) return; // modo local → sin cambios
  var clinic = (window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || {};
  var isBase = clinic.isBase === true || ((clinic.ownerEmail || "").toLowerCase() === "jc.skinlab@gmail.com");
  window.JCM_BASE = isBase;
  var D = window.JCDATA || {}, A = window.JCADMIN || {}, C = window.CADMIN || {};
  // Datos de la clínica (nombre/dirección/WhatsApp/horario): cada clínica tiene los suyos.
  // La base (JC Medical) recibe sus datos reales si aún no los tiene; las nuevas, solo su nombre.
  try {
    if (window.DB) {
      var cfg = window.DB.get("config") || {};
      if (isBase) {
        if (!cfg.clinic_addr) cfg.clinic_addr = "1 Poniente 1258, Edificio Plaza Poniente, Talca";
        if (!cfg.clinic_hours) cfg.clinic_hours = "Lun, Mié y Vie 10:00–19:00 · Sáb 10:30–14:30";
        if (!cfg.wa_number) cfg.wa_number = "56997880877";
      }
      if (!cfg.clinic_name) cfg.clinic_name = clinic.name || "";
      window.DB.set("config", cfg);
    }
  } catch (e) {}
  // Operacional → vacío para TODAS las clínicas (incl. JC Medical): pacientes, citas demo, campañas, integraciones, etc.
  A.patients = []; D.appointments = [];
  C.campaigns = []; C.integrations = []; C.waMessages = []; C.bizComments = []; C.fidelity = [];
  // Equipo por clínica: desde la BD si ya lo guardaron; si no, la base usa su equipo real y las nuevas parten vacías.
  var savedTeam = (window.DB && window.DB.get("team"));
  C.team = Array.isArray(savedTeam) ? savedTeam : (isBase ? (C.team || []) : []);
  // Servicios: solo la base conserva su catálogo real; las nuevas parten sin servicios.
  if (!isBase && D.catalog) D.catalog = [];
}
// Nombre que se muestra en el perfil/saludo: el de la clínica activa (no "Juan Claudio" para otras).
function clinicDisplayName() {
  var c = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || null;
  return (c && c.name) || "Juan Claudio Parra";
}
// Foto de perfil: solo la base (JC Medical) o el modo local usan la foto por defecto; las nuevas, vacía.
function clinicAvatarSrc(pic) {
  if (pic) return pic;
  if (window.JCM_BASE || !(window.JCSAAS && window.JCSAAS.enabled)) return (window.JCADMIN || {}).pro;
  return null;
}
// ¿Esta clínica conserva los datos de ejemplo (demo)? Solo la base (JC Medical) o el modo local (sin SaaS).
// Las clínicas nuevas del SaaS parten SIEMPRE vacías (sin pacientes/conversaciones/campañas/etc. de ejemplo).
function clinicSeeded() { return window.JCM_BASE === true || !(window.JCSAAS && window.JCSAAS.enabled); }
window.clinicSeeded = clinicSeeded;
// Identidad para impresiones/mensajes: datos propios de la clínica activa (config), con respaldo al catálogo base.
// IMPORTANTE (multi-clínica): el respaldo a los datos sembrados (JCDATA = JC Medical) SOLO aplica a la
// clínica base. Una clínica nueva que no configuró su dato NO debe heredar el nombre/dirección/profesional
// de JC Medical en consentimientos e impresiones — usa su propia config, o queda en blanco/genérico.
function clinicName() { try { var n = window.DB && DB.cfg().clinic_name; if (n) return n; } catch (e) {} return clinicSeeded() ? (((window.JCDATA || {}).brand) || "Medique") : "Medique"; }
function clinicAddr() { try { var a = window.DB && DB.cfg().clinic_addr; if (a) return a; } catch (e) {} return clinicSeeded() ? ((((window.JCDATA || {}).contact) || {}).address || "") : ""; }
function clinicPro() { try { var p = window.DB && DB.cfg().professional; if (p) return p; } catch (e) {} return clinicSeeded() ? ((((window.JCDATA || {}).contact) || {}).pro || "") : ""; }
// Link "inteligente" de mapa: si la clínica guardó su propio link (Google Business), se usa;
// si no, se arma desde la dirección con el formato universal de Google Maps, que en iPhone/
// Android abre la app nativa de Maps y en PC abre la web. (P11 · link inteligente)
function clinicMapsLink() {
  try { var m = window.DB && DB.cfg().clinic_maps; if (m && ("" + m).trim()) return ("" + m).trim(); } catch (e) {}
  var a = clinicAddr();
  return a ? ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(a)) : "";
}
// Mensaje único de confirmación de cita por WhatsApp: incluye dirección y "Cómo llegar" con
// el link inteligente de mapa. Devuelve el texto SIN codificar (el llamador hace encodeURIComponent).
function jcmCitaConfirmMsg(name, wk, time, proc, prof) {
  var addr = clinicAddr(), maps = clinicMapsLink();
  var L = ["Hola " + name + " 👋", "", "Tu cita en " + clinicDisplayName() + " quedó confirmada:", "",
           "📅 " + wk.wd + " " + wk.dd + " " + wk.mm, "🕐 " + time + " hrs", "💉 " + proc, "👨‍⚕️ " + prof];
  if (addr) L.push("📍 " + addr);
  if (maps) L.push("🗺️ Cómo llegar: " + maps);
  L.push("", "Recuerda llegar 5 min antes. Si necesitas reagendar, avísanos con 24 h de anticipación.", "", "¡Nos vemos pronto! 🌿");
  return L.join("\n");
}
// Recordatorio manual para pedir al paciente que confirme su asistencia (P4). Texto sin codificar.
function jcmRecordatorioMsg(a) {
  var addr = clinicAddr(), maps = clinicMapsLink();
  var when = (a.fecha ? "" : "") + (a.time ? ("a las " + a.time + " hrs") : "");
  var L = ["Hola " + (a.name || "") + " 👋", "", "Te recordamos tu cita en " + clinicDisplayName() + (when ? " " + when : "") + (a.proc ? " (" + a.proc + ")" : "") + ".", "", "¿Nos confirmas tu asistencia? Responde *SÍ* para confirmar 🙌"];
  if (maps) L.push("", "🗺️ Cómo llegar: " + maps);
  L.push("", "¡Te esperamos! 🌿");
  return L.join("\n");
}
window.clinicName = clinicName; window.clinicAddr = clinicAddr; window.clinicPro = clinicPro; window.clinicMapsLink = clinicMapsLink; window.jcmCitaConfirmMsg = jcmCitaConfirmMsg; window.jcmRecordatorioMsg = jcmRecordatorioMsg;
// Registro de actividad real del sistema (P25): guarda cada acción importante en DB.audit_log
// (máx. 200, más reciente primero) con quién y cuándo. La vista Administración → Registro lo muestra.
function jcmAudit(action) {
  try {
    if (!window.DB || !action) return;
    var who = "";
    try { who = (window.JCSAAS && window.JCSAAS.currentUserName && window.JCSAAS.currentUserName()) || (window.JCSAAS && window.JCSAAS.userEmail && window.JCSAAS.userEmail()) || ""; } catch (e) {}
    var log = window.DB.get("audit_log"); if (!Array.isArray(log)) log = [];
    log.unshift({ ts: new Date().toISOString(), action: "" + action, user: who });
    if (log.length > 200) log = log.slice(0, 200);
    window.DB.set("audit_log", log);
  } catch (e) {}
}
window.jcmAudit = jcmAudit;
// Correo al que responde el paciente los recordatorios/correos (reply-to). Si NO se setea, las
// respuestas se van a noreply@medique.cl y se pierden. Orden: campo de config "clinic_email" (lo
// setea la clínica en Configuración) → correo dueño de la clínica (con el que inicia sesión) →
// correo de contacto de la base. undefined si no hay ninguno (sale sin reply-to, como antes).
function clinicReplyTo() {
  var ok = function (e) { return e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e + "").trim()); };
  try { var e = window.DB && DB.cfg().clinic_email; if (ok(e)) return (e + "").trim().toLowerCase(); } catch (x) {}
  try { var c = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic(); if (c && ok(c.ownerEmail)) return (c.ownerEmail + "").trim().toLowerCase(); } catch (x) {}
  try { var rc = (((window.JCDATA || {}).contact) || {}).email; if (ok(rc)) return (rc + "").trim().toLowerCase(); } catch (x) {}
  return undefined;
}
window.clinicReplyTo = clinicReplyTo;
// Importa TODAS las bandejas web (reservas + colaboraciones + reseñas) al panel de la clínica.
function importAllWeb() {
  if (!(window.JCSAAS && window.JCSAAS.enabled)) return Promise.resolve(0);
  var p = window.JCSAAS.importWebBookings ? window.JCSAAS.importWebBookings() : Promise.resolve(0);
  try { window.JCSAAS.importWebCollabs && window.JCSAAS.importWebCollabs(); } catch (e) {}
  try { window.JCSAAS.importWebReviews && window.JCSAAS.importWebReviews(); } catch (e) {}
  return p;
}

/* ─────────── ENRUTAMIENTO DEL PANEL (URLs por sección y por paciente) ─────────── */
// Cada apartado tiene su URL: /panel/inventario, /panel/agenda, etc.; y cada paciente /panel/pacientes/<id>.
const PANEL_SECTIONS = { dashboard: 1, agenda: 1, pacientes: 1, salaespera: 1, pendientes: 1, caja: 1, inventario: 1, servicios: 1, equipo: 1, sucursales: 1, marketing: 1, crm: 1, difusiones: 1, agenteia: 1, copilot: 1, automatizaciones: 1, resumen: 1, colaboracion: 1, fidelidad: 1, integraciones: 1, reportes: 1, administracion: 1, consentimientos: 1, fichaeditor: 1, tutoriales: 1, config: 1, appjcm: 1, notasia: 1, resumenia: 1, contactcenter: 1, reportesia: 1, contraloria: 1, desempeno: 1, encuestas: 1, chatinterno: 1, pagosgastos: 1, remuneraciones: 1, laboratorios: 1, convenios: 1, flujocaja: 1, boletas: 1, pagosonline: 1 };
function panelParseRoute() {
  try {
    var parts = (location.pathname || "").replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
    if (parts[0] === "panel") parts.shift(); // compat: enlaces/bookmarks antiguos /panel/<seccion>
    var sec = parts[0] || "dashboard";
    if (!PANEL_SECTIONS[sec]) sec = "dashboard";
    var pid = (sec === "pacientes" && parts[1]) ? decodeURIComponent(parts[1]) : null;
    return { section: sec, pid: pid };
  } catch (e) { return { section: "dashboard", pid: null }; }
}
// URLs limpias en portal.medique.cl: /inventario, /pacientes/<id> (sin el prefijo /panel).
function panelRoutePath(sec, pid) {
  if (sec === "pacientes" && pid) return "/pacientes/" + encodeURIComponent(pid);
  if (!sec || sec === "dashboard") return "/";
  return "/" + sec;
}

/* ─────────── DASHBOARD (estilo Medique: indicadores + evolución + accesos) ─────────── */
const DASH_IC = {
  pacientes: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 8a3 3 0 0 1 0 6" /><path d="M21 20a6 6 0 0 0-4-5.5" /></>,
  citas: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>,
  nuevos: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 11-3.4" /><path d="M19 8v6M16 11h6" /></>,
  ingresos: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M14.5 9.2A2.4 2.4 0 0 0 12 8.4c-1.4 0-2.4.8-2.4 1.9 0 2.6 4.8 1.4 4.8 4 0 1.1-1 1.9-2.4 1.9a2.4 2.4 0 0 1-2.5-.8" /></>,
  crear: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 11-3.4" /><path d="M19 8v6M16 11h6" /></>,
  cita: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4M12 13v4M10 15h4" /></>,
  puntos: <><path d="M12 3l2.6 5.6L20.5 9l-4.3 4.1 1 6-5.2-3-5.2 3 1-6L3.5 9l5.9-.4z" /></>,
  stock: <><path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" /></>,
  whatsapp: <><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></>,
  campana: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></>,
  alerta: <><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></>
};
function DashIcon({ name, c, size }) { return <svg width={size || 20} height={size || 20} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{DASH_IC[name]}</svg>; }

/* ── Historial de movimientos de caja (estilo banco): día / semana / mes + saldo antes→después ── */
function MovimientosCajaModal({ T, onClose }) {
  const D = window.JCDATA || {};
  const fmt = D.fmt ? D.fmt : (n => "$" + (n || 0).toLocaleString("es-CL"));
  const green = "#1F8A5B", red = "#C0285A";
  const [period, setPeriod] = useState("mes"); // dia | semana | mes
  const [, force] = useState(0);
  // Refresco en vivo (al registrar/eliminar un movimiento en cualquier parte).
  useEffect(() => {
    const tick = () => force(x => x + 1);
    window.addEventListener("jcm:cash", tick); window.addEventListener("focus", tick);
    return () => { window.removeEventListener("jcm:cash", tick); window.removeEventListener("focus", tick); };
  }, []);
  // Incluye los movimientos de caja Y las atenciones pagadas de las fichas (igual que la vista Caja).
  let all = []; try { all = (typeof window.cashMovimientos === "function") ? (window.cashMovimientos() || []) : ((typeof window.cashAll === "function") ? (window.cashAll() || []) : ((window.DB && DB.get("cash_moves")) || [])); } catch (e) {}
  // Día LOCAL (no UTC): un cobro de las 23:00 cuenta en su día real, no en el siguiente.
  const dayOf = ts => (typeof window._localDay === "function") ? window._localDay(ts) : (ts || "").slice(0, 10);
  // Saldo corrido cronológico (más antiguo → más nuevo): cada movimiento guarda saldo antes y después.
  const asc = all.slice().sort((a, b) => (a.ts || "").localeCompare(b.ts || ""));
  let run = 0;
  const withBal = asc.map(m => { const delta = m.type === "egreso" ? -(m.amount || 0) : (m.amount || 0); const antes = run; run += delta; return { ...m, _antes: antes, _despues: run, _day: dayOf(m.ts) }; });
  const saldoActual = run;
  // Rango del período seleccionado.
  const now = new Date();
  const hoyKey = dayOf(now);
  const mesKey = hoyKey.slice(0, 7);
  const lunes = (() => { const d = new Date(now); const dow = (d.getDay() + 6) % 7; d.setDate(d.getDate() - dow); d.setHours(0, 0, 0, 0); return dayOf(d); })();
  const inPeriod = m => { const day = m._day; if (period === "dia") return day === hoyKey; if (period === "semana") return day >= lunes; return day.slice(0, 7) === mesKey; };
  const moves = withBal.filter(inPeriod).reverse(); // más nuevo primero para mostrar
  const ingP = moves.filter(m => m.type !== "egreso").reduce((s, m) => s + (m.amount || 0), 0);
  const egrP = moves.filter(m => m.type === "egreso").reduce((s, m) => s + (m.amount || 0), 0);
  const byDay = {}; moves.forEach(m => { const d = m._day; (byDay[d] = byDay[d] || []).push(m); });
  const days = Object.keys(byDay).sort((a, b) => b.localeCompare(a));
  const hora = ts => { try { return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } };
  const diaTxt = d => { try { return new Date(d + "T00:00:00").toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" }); } catch (e) { return d; } };
  const periodLbl = period === "dia" ? "hoy" : period === "semana" ? "esta semana" : "este mes";
  const del = async (id) => { if (await (window.jcmConfirm || window.confirm)("¿Eliminar este movimiento de caja?", { danger: true }) && window.cashDelete) { window.cashDelete(id); force(x => x + 1); } };
  const segBtn = (k, l) => <button key={k} onClick={() => setPeriod(k)} style={{ flex: 1, fontFamily: T.sans, fontSize: 12, fontWeight: period === k ? 600 : 500, padding: "9px 6px", borderRadius: 8, cursor: "pointer", border: "1px solid " + (period === k ? T.accent : T.line), background: period === k ? T.accent : "transparent", color: period === k ? (T.onAccent || "#fff") : T.textMute }}>{l}</button>;
  return (
    <div onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", paddingTop: "calc(66px + env(safe-area-inset-top,0px))", paddingBottom: "calc(20px + env(safe-area-inset-bottom,0px))", paddingLeft: 16, paddingRight: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 520, maxHeight: "100%", background: T.bg, border: "1px solid " + T.line, borderRadius: 16, display: "flex", flexDirection: "column", animation: "jcSlideUp .25s ease", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid " + T.line, flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 300, color: T.text }}>Movimientos de caja</div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 }}>Saldo actual: <b style={{ color: saldoActual >= 0 ? green : red }}>{fmt(saldoActual)}</b></div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 4 }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>
        <div style={{ padding: "14px 20px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>{segBtn("dia", "Día")}{segBtn("semana", "Semana")}{segBtn("mes", "Mes")}</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            {[["Ingresos", ingP, green], ["Egresos", egrP, red], ["Neto", ingP - egrP, T.accent]].map(([l, v, c]) => (
              <div key={l} style={{ flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: "8px 10px" }}>
                <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute }}>{l}</div>
                <div style={{ fontFamily: T.serif, fontSize: 15, color: c, marginTop: 2 }}>{fmt(v)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="jc-scroll" style={{ padding: "8px 20px 18px", overflowY: "auto", flex: 1 }}>
          {!moves.length ? (
            <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "20px 0", textAlign: "center", lineHeight: 1.6 }}>No hay movimientos {periodLbl}.<br /><span style={{ fontSize: 11.5, color: T.textFaint }}>Se registran al cobrar atenciones, agregar procedimientos con cobro en una ficha o crear movimientos en Caja.</span></div>
          ) : days.map(day => (
            <div key={day}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "12px 0 4px", paddingBottom: 4, borderBottom: "1px solid " + T.line }}>
                <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent }}>{diaTxt(day)}</span>
              </div>
              {byDay[day].map(m => {
                const esEgreso = m.type === "egreso";
                return (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid " + T.lineSoft }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.concept || (esEgreso ? "Egreso" : "Ingreso")}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{hora(m.ts)}{m.method ? " · " + m.method : ""}{m.kind === "atencion" ? " · atención" : ""}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 3 }}>Saldo: {fmt(m._antes)} <span style={{ color: T.textMute }}>→</span> <b style={{ color: T.textMute }}>{fmt(m._despues)}</b></div>
                    </div>
                    <span style={{ fontFamily: T.serif, fontSize: 15, color: esEgreso ? red : green, whiteSpace: "nowrap" }}>{esEgreso ? "− " : "+ "}{fmt(m.amount || 0)}</span>
                    {m._src !== "billing" && <button onClick={() => del(m.id)} title="Eliminar movimiento" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                    </button>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardView({ T, D, A, appts, patients, go }) {
  const [tab, setTab] = useState("general");
  const [kpiPopup, setKpiPopup] = useState(null); // "pacientes" | "citas" | "nuevos" | "ingresos"
  const [movCaja, setMovCaja] = useState(false); // historial de movimientos de caja (día/semana/mes)
  const fmt = (D && D.fmt) ? D.fmt : (n => "$" + (n || 0).toLocaleString("es-CL"));
  const hoy = appts.filter(a => apptDayOff(a) === 0 && a.status !== "anulada");
// Ingresos de hoy = suma de los movimientos de caja tipo "ingreso" (los egresos no cuentan como ingreso).
  const ingresosHoy = (typeof window.cashToday === "function") ? (window.cashToday() || []).filter(m => m.type !== "egreso").reduce((s, m) => s + (m.amount || 0), 0) : 0;
  const nuevosMes = patients.length;
  const green = "#1F8A5B";
  // ESC cierra los popups del dashboard (KPI / movimientos de caja) para que nunca queden
  // "pegados" tapando la vista. Se apoya en la pila global de popups. (P19 · robustez)
  useEffect(() => {
    if (!kpiPopup && !movCaja) return;
    const close = () => { setKpiPopup(null); setMovCaja(false); };
    if (window.jcEscStack) { window.jcEscStack.push(close); return () => { const i = window.jcEscStack.lastIndexOf(close); if (i >= 0) window.jcEscStack.splice(i, 1); }; }
    const onKey = e => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [kpiPopup, movCaja]);

  // Evolución de ingresos — en SaaS parte en 0 (cada clínica acumula lo suyo); demo solo en modo local.
  const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const serie = (window.JCSAAS && window.JCSAAS.enabled) ? [0, 0, 0, 0, 0, 0, 0] : [380000, 420000, 510000, 470000, 540000, 610000, 740000];
  const totalSemana = serie.reduce((a, b) => a + b, 0);
  const growth = serie[0] ? Math.round((serie[serie.length - 1] / serie[0] - 1) * 100) : 0;

  // próximas citas (hoy primero por hora, luego el resto)
  const ord = appts.filter(a => a.status !== "anulada").sort((a, b) => apptDayOff(a) - apptDayOff(b) || (a.time || "").localeCompare(b.time || ""));
  const prox5 = ord.slice(0, 5);

  // notificaciones
  const wa = ((window.CADMIN || {}).waMessages) || [];
  const biz = ((window.CADMIN || {}).bizComments) || [];
  const sinConsent = (window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter(p => !p.consent));
  const recitas = (window.recitaDue ? window.recitaDue(patients) : []);

  const TABS = [["general", "Visión General"], ["citas", "Próximas Citas"], ["notif", "Notificaciones"]];

  /* ── Embudo de marketing con ROAS real (vista principal) ── */
  const [metaEdit, setMetaEdit] = useState(false);
  const [, bumpRev] = useState(0);
  const spendRef = useRef(null), leadsRef = useRef(null), msgsRef = useRef(null), soldRef = useRef(null);
  function saveMeta() {
    try {
      const cfg = (window.DB && DB.get("config")) || {};
      cfg.meta_spend_mes = +(spendRef.current && spendRef.current.value) || 0;
      const lv = leadsRef.current && leadsRef.current.value;
      if (lv !== "" && lv != null) cfg.meta_leads_mes = +lv || 0;
      // Mensajes recibidos y vendidos (cargados a mano para completar el embudo).
      const mv = msgsRef.current && msgsRef.current.value;
      cfg.meta_msgs_mes = (mv !== "" && mv != null) ? (+mv || 0) : 0;
      const sv = soldRef.current && soldRef.current.value;
      cfg.meta_sold_mes = (sv !== "" && sv != null) ? (+sv || 0) : 0;
      window.DB && DB.set("config", cfg);
    } catch (e) {}
    setMetaEdit(false); bumpRev(r => r + 1);
  }
  // Gasto/leads REALES de Meta (Opción B): cada clínica usa SU propio token (guardado en
  // 'meta_creds', aislado). La clínica base usa las variables de entorno del servidor.
  // Una clínica nueva sin Meta propio NO consulta /api/meta (evita ver el gasto de JC).
  const [liveMeta, setLiveMeta] = useState(null);
  useEffect(() => {
    if (!(window.JCSAAS && window.JCSAAS.enabled)) return; // modo local: sin fetch
    let creds = null; try { creds = (window.DB && DB.get("meta_creds")) || null; } catch (e) {}
    const hasOwn = !!(creds && creds.token && creds.account);
    const isBase = window.JCM_BASE === true;
    if (!hasOwn && !isBase) return; // clínica nueva sin Meta propio → solo carga manual
    // Pedimos también el desglose por campaña (con nombre) para mostrarlas en el embudo. (P8)
    const bodyObj = hasOwn ? { token: creds.token, account: creds.account, campaigns: true } : { campaigns: true };
    // /api/meta exige el ID token de Firebase del usuario logueado (verificación RS256 en el server).
    const tokP = (window.JCSAAS && window.JCSAAS.idToken) ? window.JCSAAS.idToken() : Promise.resolve(null);
    tokP.then(tok => {
      const headers = { "Content-Type": "application/json" };
      if (tok) headers["Authorization"] = "Bearer " + tok;
      return fetch("/api/meta", { method: "POST", headers: headers, body: JSON.stringify(bodyObj) });
    }).then(r => r.json()).then(d => { if (d && d.ok) setLiveMeta(d); }).catch(() => {});
  }, []);
  const funnel = (function () {
    const mes = new Date().toISOString().slice(0, 7);
    const inMonth = ts => (ts || "").slice(0, 7) === mes;
    let cash = []; try { cash = (typeof window.cashAll === "function") ? (window.cashAll() || []) : ((window.DB && DB.get("cash_moves")) || []); } catch (e) {}
    // Un procedimiento NO es una evaluación (se filtran del embudo).
    const esProc = s => !/evaluaci/i.test(s || "");
    let ingresos = cash.filter(m => m.type === "ingreso" && inMonth(m.ts)).reduce((s, m) => s + (m.amount || 0), 0);
    // Vendidos: sesiones cobradas ESTE MES en procedimientos (movimiento de caja "atencion" con pago),
    // excluyendo evaluaciones.
    let compras = cash.filter(m => m.kind === "atencion" && inMonth(m.ts) && esProc(m.concept)).length;
    let allAppts = []; try { allAppts = (window.DB && DB.get("appts")) || appts || []; } catch (e) { allAppts = appts || []; }
    // Reservaron: citas de ESTE MES (por su fecha real), procedimientos (no evaluaciones) y no anuladas.
    const apptMes = allAppts.filter(a => (a.fecha || "").slice(0, 7) === mes && a.status !== "anulada" && a.status !== "cancelada" && esProc(a.proc));
    let reservas = apptMes.length;
    let asistieron = apptMes.filter(a => a.attended || a.status === "atendida" || a.status === "confirmada").length;
    let spend = 0, leads = 0, mensajes = 0, soldManual = null;
    try {
      const cfg = (window.DB && DB.get("config")) || {};
      spend = +cfg.meta_spend_mes || 0; leads = +cfg.meta_leads_mes || 0;
      mensajes = +cfg.meta_msgs_mes || 0; // mensajes recibidos (manual)
      if (cfg.meta_sold_mes != null && cfg.meta_sold_mes !== "") soldManual = +cfg.meta_sold_mes || 0; // vendidos (manual)
    } catch (e) {}
    // Si hay datos en vivo de Meta (token de la clínica o env de la base), tienen prioridad sobre la carga manual.
    if (liveMeta && liveMeta.ok) { spend = liveMeta.spend || 0; if (liveMeta.leads) leads = liveMeta.leads; }
    // En SaaS no se muestran datos de ejemplo: cada clínica ve sus cifras reales (0 hasta conectar Meta).
    const demo = !spend && !(window.JCSAAS && window.JCSAAS.enabled);
    if (demo) { spend = 500000; leads = 120; mensajes = 80; reservas = 35; asistieron = 22; compras = 18; ingresos = 6800000; }
    else if (!leads) { leads = reservas; } // sin Meta conectado, los leads = reservas reales (0 si no hay)
    // Vendidos cargados a mano tienen prioridad sobre el conteo automático de atenciones de caja.
    if (soldManual != null) compras = soldManual;
    const roas = spend > 0 ? (ingresos / spend) : 0;
    const campaigns = (liveMeta && Array.isArray(liveMeta.campaigns)) ? liveMeta.campaigns : [];
    return { spend, leads, mensajes, reservas, asistieron, compras, ingresos, roas, demo, live: !!(liveMeta && liveMeta.ok), campaigns };
  })();

  function FunnelBlock() {
    const stages = [
      { k: "Leads", n: funnel.leads, c: T.accent },
      { k: "Mensajes recibidos", n: funnel.mensajes, c: T.accent },
      { k: "Reservaron", n: funnel.reservas, c: T.accent },
      { k: "Asistieron", n: funnel.asistieron, c: T.accent },
      { k: "Vendidos", n: funnel.compras, c: green }
    ];
    const top = stages[0].n || 1;
    const inp = { width: 120, fontFamily: T.sans, fontSize: 13, padding: "8px 10px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface2, color: T.text, outline: "none" };
    return (
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "16px 18px 18px", marginBottom: 16, boxShadow: "0 14px 40px -30px rgba(0,0,0,.4)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          <div style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600 }}>Embudo de marketing · este mes</div>
          <span style={{ fontFamily: T.sans, fontSize: 10, color: funnel.live ? "#1F8A5B" : T.textFaint }}>{funnel.demo ? "Datos de ejemplo — carga tu gasto de Meta para verlo real" : (funnel.live ? "● Conectado a Meta · en vivo" : "Datos reales de tu mes")}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, alignItems: "start" }}>
          {/* Embudo */}
          <div>
            {metaEdit ? (
              <div style={{ marginBottom: 12, paddingBottom: 11, borderBottom: "1px solid " + T.lineSoft }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <label style={{ display: "flex", flexDirection: "column", gap: 3, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute }}>Gasto Meta $
                    <input ref={spendRef} type="number" defaultValue={funnel.demo ? "" : funnel.spend} placeholder="0" style={inp} /></label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 3, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute }}>Leads
                    <input ref={leadsRef} type="number" defaultValue={funnel.demo ? "" : funnel.leads} placeholder="0" style={{ ...inp, width: 90 }} /></label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 3, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute }}>Mensajes recibidos
                    <input ref={msgsRef} type="number" defaultValue={funnel.demo ? "" : funnel.mensajes} placeholder="0" style={{ ...inp, width: 110 }} /></label>
                  <label style={{ display: "flex", flexDirection: "column", gap: 3, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute }}>Vendidos
                    <input ref={soldRef} type="number" defaultValue={funnel.demo ? "" : funnel.compras} placeholder="0" style={{ ...inp, width: 90 }} /></label>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={saveMeta} style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "9px 14px", cursor: "pointer" }}>Guardar</button>
                  <button onClick={() => setMetaEdit(false)} style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, background: "transparent", border: "1px solid " + T.line, borderRadius: 8, padding: "9px 12px", cursor: "pointer" }}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingBottom: 11, borderBottom: "1px solid " + T.lineSoft }}>
                <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute }}>Gasto en Meta</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: T.serif, fontSize: 20, color: T.text }}>{fmt(funnel.spend)}</span>
                  <button onClick={() => setMetaEdit(true)} title="Editar gasto de Meta del mes" style={{ display: "inline-flex", width: 28, height: 28, alignItems: "center", justifyContent: "center", background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 8, color: T.textMute, cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
                  </button>
                </span>
              </div>
            )}
            {stages.map((st, i) => {
              const pct = Math.max(6, Math.round(st.n / top * 100));
              const conv = i > 0 && stages[i - 1].n ? Math.round(st.n / stages[i - 1].n * 100) : null;
              return (
                <div key={st.k} style={{ marginBottom: 11 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                    <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{st.k}</span>
                    <span style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text }}>{st.n}{conv != null && <span style={{ fontSize: 10.5, fontWeight: 400, color: T.textMute, marginLeft: 7 }}>{conv}%</span>}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 999, background: T.lineSoft, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: pct + "%", background: st.c, borderRadius: 999, transition: "width .6s " + T.ease }} />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Resultado + ROAS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <div onClick={() => setMovCaja(true)} title="Ver los movimientos de caja (día, semana, mes) con saldo" style={{ background: T.surface2, border: "1px solid " + T.line, borderRadius: 12, padding: "13px 15px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute }}>Facturaste este mes</div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 19, color: T.text, lineHeight: 1.1, marginTop: 4 }}>{fmt(funnel.ingresos)}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10, color: T.accent, marginTop: 3 }}>Ver movimientos del mes →</div>
            </div>
            <div title={"ROAS (Return On Ad Spend) = ingresos ÷ inversión en publicidad.\n" + funnel.roas.toFixed(1) + "x significa que por cada $1 invertido en Meta recuperaste $" + funnel.roas.toFixed(1) + " en facturación.\nSobre 3x se considera muy bueno; bajo 1x estás perdiendo dinero."} style={{ background: green + "12", border: "1px solid " + green + "44", borderRadius: 12, padding: "16px 16px", cursor: "help" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: green }}>ROAS real</span>
                <span title="Retorno de la inversión publicitaria: ingresos ÷ gasto en Meta." style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", border: "1px solid " + green + "88", color: green, fontFamily: T.sans, fontSize: 9, fontWeight: 700, cursor: "help" }}>?</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: T.serif, fontSize: 40, color: green, lineHeight: 1.05 }}>{funnel.roas.toFixed(1)}x</span>
                <span style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>por cada $1 en Meta</span>
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 6, lineHeight: 1.5 }}>Invertiste {fmt(funnel.spend)} y facturaste {fmt(funnel.ingresos)}.</div>
            </div>
            {/* Campañas activas por nombre (cuando Meta está conectado). (P8) */}
            {funnel.campaigns.length > 0 && (
              <div style={{ background: T.surface2, border: "1px solid " + T.line, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Campañas activas</div>
                {funnel.campaigns.slice(0, 5).map((c, i) => (
                  <div key={c.id || i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, padding: "5px 0", borderBottom: i < Math.min(funnel.campaigns.length, 5) - 1 ? "1px solid " + T.lineSoft : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 12, color: T.text, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name || "Campaña"}</span>
                    <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", flexShrink: 0 }}>{fmt(c.spend || 0)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── KPI popup overlay ── */
  const KpiPopup = () => {
    if (!kpiPopup) return null;
    let title = "", rows = [];
    const rowStyle = { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + T.lineSoft };
    if (kpiPopup === "pacientes") {
      title = "Pacientes totales";
      rows = patients.slice(0, 20).map((p, i) => (
        <div key={i} style={rowStyle}>
          {Avatar({ T, name: p.name, size: 32 })}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{p.phone || p.rut || "Sin datos"}</div>
          </div>
          <span style={{ fontFamily: T.sans, fontSize: 10, color: p.consent ? green : "#C0285A", border: "1px solid " + (p.consent ? green : "#C0285A"), borderRadius: 999, padding: "2px 8px" }}>{p.consent ? "Consiente" : "Pendiente"}</span>
        </div>
      ));
    } else if (kpiPopup === "citas") {
      title = "Citas de hoy";
      if (!hoy.length) rows = [<div key="0" style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "16px 0" }}>No hay citas agendadas para hoy.</div>];
      else rows = hoy.map((a, i) => (
        <div key={i} style={rowStyle}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.accent }}>{a.time || "—"}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.proc}</div>
          </div>
          <span style={{ fontFamily: T.sans, fontSize: 10, color: a.status === "confirmada" ? green : T.textMute, border: "1px solid " + (a.status === "confirmada" ? green : T.line), borderRadius: 999, padding: "2px 8px" }}>{a.status || "pendiente"}</span>
        </div>
      ));
    } else if (kpiPopup === "nuevos") {
      title = "Pacientes este mes";
      const mesActual = new Date().toISOString().slice(0, 7);
      const nuevos = patients.filter(p => p.id && p.id.startsWith("p") && p.id.slice(1, 8).length > 0);
      if (!nuevos.length) rows = [<div key="0" style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "16px 0" }}>No hay pacientes registrados este mes.</div>];
      else rows = nuevos.slice(0, 15).map((p, i) => (
        <div key={i} style={rowStyle}>
          {Avatar({ T, name: p.name, size: 32 })}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{p.name}</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{p.phone || "—"}</div>
          </div>
        </div>
      ));
    } else if (kpiPopup === "ingresos") {
      title = "Ingresos de hoy";
      const pagadas = hoy.filter(a => a.paid);
      if (!pagadas.length) rows = [<div key="0" style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "16px 0" }}>No hay pagos registrados hoy.</div>];
      else rows = pagadas.map((a, i) => (
        <div key={i} style={rowStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{a.name}</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{a.proc} · {a.time || "—"}</div>
          </div>
          <span style={{ fontFamily: T.serif, fontSize: 15, color: green }}>Pagado</span>
        </div>
      ));
      rows.push(
        <div key="total" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0 4px", marginTop: 4 }}>
          <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute }}>Total hoy</span>
          <span style={{ fontFamily: T.serif, fontSize: 20, color: T.text }}>{fmt(ingresosHoy)}</span>
        </div>
      );
    } else if (kpiPopup === "mes") {
      // Movimientos de caja del MES en curso, agrupados por día, con su origen y opción de eliminar.
      const MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const now = new Date();
      const mesKey = now.toISOString().slice(0, 7);
      title = "Movimientos · " + MES[now.getMonth()];
      let cash = []; try { cash = (typeof window.cashAll === "function") ? (window.cashAll() || []) : ((window.DB && DB.get("cash_moves")) || []); } catch (e) {}
      const mov = cash.filter(m => (m.ts || "").slice(0, 7) === mesKey);
      const ingM = mov.filter(m => m.type !== "egreso").reduce((s, m) => s + (m.amount || 0), 0);
      const egrM = mov.filter(m => m.type === "egreso").reduce((s, m) => s + (m.amount || 0), 0);
      const hora = ts => { try { return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } };
      const diaTxt = d => { try { return new Date(d + "T00:00:00").toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" }); } catch (e) { return d; } };
      // Resumen ingresos / egresos / neto
      rows.push(
        <div key="resumen" style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {[["Ingresos", ingM, green], ["Egresos", egrM, "#C0285A"], ["Neto", ingM - egrM, T.accent]].map(([l, v, c]) => (
            <div key={l} style={{ flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: "9px 10px" }}>
              <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute }}>{l}</div>
              <div style={{ fontFamily: T.serif, fontSize: 16, color: c, marginTop: 2 }}>{fmt(v)}</div>
            </div>
          ))}
        </div>
      );
      if (!mov.length) {
        rows.push(<div key="vacio" style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "12px 0" }}>No hay movimientos de caja este mes. Se registran al cobrar atenciones, agregar procedimientos en una ficha o crear movimientos en Caja.</div>);
      } else {
        const byDay = {};
        mov.forEach(m => { const d = (m.ts || "").slice(0, 10); (byDay[d] = byDay[d] || []).push(m); });
        Object.keys(byDay).sort((a, b) => b.localeCompare(a)).forEach(day => {
          const dayMov = byDay[day].sort((a, b) => (b.ts || "").localeCompare(a.ts || ""));
          const dayNet = dayMov.reduce((s, m) => s + (m.type === "egreso" ? -(m.amount || 0) : (m.amount || 0)), 0);
          rows.push(
            <div key={"h" + day} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "14px 0 4px", paddingBottom: 4, borderBottom: "1px solid " + T.line }}>
              <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent }}>{diaTxt(day)}</span>
              <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{fmt(dayNet)}</span>
            </div>
          );
          dayMov.forEach(m => {
            const esEgreso = m.type === "egreso";
            rows.push(
              <div key={m.id} style={rowStyle}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.concept || (esEgreso ? "Egreso" : "Ingreso")}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{hora(m.ts)}{m.method ? " · " + m.method : ""}{m.kind === "atencion" ? " · atención" : ""}</div>
                </div>
                <span style={{ fontFamily: T.serif, fontSize: 15, color: esEgreso ? "#C0285A" : green, whiteSpace: "nowrap" }}>{esEgreso ? "− " : ""}{fmt(m.amount || 0)}</span>
                <button onClick={async () => { if (await (window.jcmConfirm || window.confirm)("¿Eliminar este movimiento de caja?", { danger: true }) && window.cashDelete) { window.cashDelete(m.id); bumpRev(r => r + 1); } }} title="Eliminar movimiento" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                </button>
              </div>
            );
          });
        });
      }
    }
    return (
      <div onMouseDown={e => { if (e.target === e.currentTarget) setKpiPopup(null); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 460, maxHeight: "80vh", background: T.bg, border: "1px solid " + T.line, borderRadius: 16, display: "flex", flexDirection: "column", animation: "jcSlideUp .25s ease" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid " + T.line, flexShrink: 0 }}>
            <span style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 300, color: T.text }}>{title}</span>
            <button onClick={() => setKpiPopup(null)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 4 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
          </div>
          <div style={{ padding: "4px 20px 16px", overflowY: "auto" }}>{rows}</div>
        </div>
      </div>
    );
  };

  /* ── KPI card (compacta, icono a la derecha, abre popup) ── */
  const Kpi = ({ ic, label, value, sub, popup }) => (
    <div onClick={() => popup && setKpiPopup(popup)} title={popup ? "Ver detalle" : undefined} style={{ position: "relative", cursor: popup ? "pointer" : "default", background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 11 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute }}>{label}</div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, lineHeight: 1.05, marginTop: 2 }}>{value}</div>
        <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>
      </div>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><DashIcon name={ic} c={T.accent} size={18} /></div>
    </div>
  );

  /* ── gráfico de evolución ── */
  function Chart() {
    const W = 720, H = 150, padL = 16, padR = 16, padT = 14, padB = 24;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const maxY = (Math.max.apply(null, serie) || 1) * 1.18; // evita dividir por 0 cuando todo es 0
    const n = serie.length;
    const X = i => padL + i * innerW / (n - 1);
    const Y = v => padT + (1 - (v || 0) / maxY) * innerH;
    const pts = serie.map((v, i) => X(i).toFixed(1) + " " + Y(v).toFixed(1));
    const line = "M " + pts.join(" L ");
    const area = line + " L " + X(n - 1).toFixed(1) + " " + (padT + innerH) + " L " + padL + " " + (padT + innerH) + " Z";
    const grid = [0, 1, 2, 3].map(g => padT + g * innerH / 3);
    return (
      <svg viewBox={"0 0 " + W + " " + H} style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="xMidYMid meet">
        <defs><linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.accent} stopOpacity="0.22" /><stop offset="100%" stopColor={T.accent} stopOpacity="0" /></linearGradient></defs>
        {grid.map((y, i) => <line key={i} x1={padL} y1={y} x2={padL + innerW} y2={y} stroke={T.line} strokeWidth="1" />)}
        <path d={area} fill="url(#dashGrad)" />
        <path d={line} fill="none" stroke={T.accent} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        {serie.map((v, i) => <circle key={i} cx={X(i)} cy={Y(v)} r="3.4" fill={T.surface} stroke={T.accent} strokeWidth="2" />)}
        {dias.map((d, i) => {
          const anchor = i === 0 ? "start" : (i === n - 1 ? "end" : "middle");
          const tx = i === 0 ? padL : (i === n - 1 ? padL + innerW : X(i));
          return <text key={d} x={tx} y={H - 7} textAnchor={anchor} fontSize="11" fontFamily={T.sans} fill={T.textMute}>{d}</text>;
        })}
      </svg>
    );
  }

  /* ── fila de cita ── */
  const citaRow = a => (
    <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" }}>
      <Avatar T={T} name={a.name} size={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.proc}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text }}>{apptDayOff(a) === 0 ? "Hoy, " + (a.time || "—") : (a.when || a.time || "—")}</div>
        <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>{(a.dur || 60) + " min"}</div>
      </div>
      <button onClick={() => go("agenda")} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>Ver</button>
    </div>
  );

  /* ── acceso rápido ── */
  const acceso = (ic, title, sub, to) => (
    <button onClick={() => go(to)} style={{ display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 15px", cursor: "pointer" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><DashIcon name={ic} c={T.accent} /></div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text }}>{title}</div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 1 }}>{sub}</div>
      </div>
    </button>
  );

  /* ── notificación ── */
  const notif = (ic, color, title, sub, action, fn) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><DashIcon name={ic} c={color} size={17} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{title}</div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>
      </div>
      {action && <button onClick={fn} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "6px 11px", cursor: "pointer" }}>{action}</button>}
    </div>
  );

  const _h = new Date().getHours();
  const _greet = _h < 13 ? "Buenos días" : _h < 20 ? "Buenas tardes" : "Buenas noches";
  return (
    <div>
      {/* Saludo personalizado */}
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 28, letterSpacing: "-.02em", color: T.text, lineHeight: 1.1 }}>{_greet}{clinicDisplayName() ? ", " + clinicDisplayName().split(" ")[0] : ""}.</h1>
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 5 }}>{hoy.length === 0 ? "No tienes citas para hoy." : "Tienes " + hoy.length + " cita" + (hoy.length === 1 ? "" : "s") + " hoy."} {ingresosHoy > 0 && "· " + fmt(ingresosHoy) + " en caja hoy."}</div>
      </div>
      {/* pestañas tipo Medique */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
        <div style={{ display: "inline-flex", gap: 4, background: T.surface, border: "1px solid " + T.line, borderRadius: 999, padding: 4 }}>
          {TABS.map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: tab === k ? 600 : 500, padding: "8px 18px", borderRadius: 999, cursor: "pointer", border: "none", background: tab === k ? T.accent : "transparent", color: tab === k ? (T.onAccent || "#fff") : T.textMute }}>{l}</button>
          ))}
        </div>
      </div>

      {tab === "general" && (
        <div>
          {/* Embudo de marketing con ROAS — vista principal */}
          <FunnelBlock />
          {/* Indicadores Principales */}
          <div style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 9 }}>Indicadores Principales</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px,1fr))", gap: 11, marginBottom: 14 }}>
            <Kpi ic="pacientes" label="Pacientes totales" value={patients.length} sub="Pacientes activos" popup="pacientes" />
            <Kpi ic="citas" label="Citas hoy" value={hoy.length} sub="Agendadas para hoy" popup="citas" />
            <Kpi ic="nuevos" label="Nuevos pacientes" value={nuevosMes} sub="Añadidos este mes" popup="nuevos" />
            <Kpi ic="ingresos" label="Ingresos hoy" value={fmt(ingresosHoy)} sub="Generado hoy" popup="ingresos" />
          </div>

          {/* Evolución de ingresos (compacta) */}
          <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "13px 16px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5-5 4 4 8-8M21 8h-4M21 8v4" /></svg></div>
                <div><div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>Evolución de ingresos</div><div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>Estimado de la semana</div></div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: T.serif, fontSize: 22, color: T.text, lineHeight: 1 }}>{fmt(totalSemana)}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: green, marginTop: 3 }}>↗ +{growth}% en la semana</div>
              </div>
            </div>
            <Chart />
          </div>

          {/* Próximas 5 citas + Accesos rápidos */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18, alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 12 }}>Próximas 5 citas</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {prox5.length ? prox5.map(citaRow) : <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0" }}>No hay citas próximas.</div>}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 12 }}>Accesos rápidos</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {acceso("crear", "Crear paciente", "Añadir nueva ficha médica", "pacientes")}
                {acceso("cita", "Nueva cita", "Agendar una atención", "agenda")}
                {acceso("puntos", "Otorgar puntos", "Programa de fidelidad", "fidelidad")}
                {acceso("stock", "Inventario", "Stock e insumos", "inventario")}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "citas" && (
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 12 }}>Próximas citas ({ord.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {ord.length ? ord.map(citaRow) : <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0" }}>No hay citas registradas.</div>}
          </div>
        </div>
      )}

      {tab === "notif" && (
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 12 }}>Notificaciones</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {wa.map(m => notif("whatsapp", green, m.name + " escribió por WhatsApp", "\u201c" + m.msg + "\u201d · " + m.ago, "Responder", () => go("pendientes")))}
            {biz.map(b => notif("campana", T.accent, b.name + " comentó en " + b.net, "\u201c" + b.msg + "\u201d · " + b.ago, "Ver", () => go("marketing")))}
            {sinConsent.length > 0 && notif("alerta", "#C9A227", sinConsent.length + " consentimiento(s) por firmar", "Revisa las fichas pendientes", "Ver", () => go("pendientes"))}
            {recitas.length > 0 && notif("whatsapp", green, recitas.length + " paciente(s) para re-citar", "Cumplieron el plazo de su próxima aplicación", "Ver", () => go("pacientes"))}
            {(wa.length + biz.length + sinConsent.length + recitas.length) === 0 && <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0" }}>Todo al día. Sin notificaciones.</div>}
          </div>
        </div>
      )}
      <KpiPopup />
      {movCaja && <MovimientosCajaModal T={T} onClose={() => setMovCaja(false)} />}
    </div>
  );
}

// Offset de día (0=hoy, 1=mañana, -1=ayer) de una cita, DERIVADO de su fecha real
// (a.fecha, absoluta y permanente). Solo LEE — nunca modifica ni guarda la cita.
// Así la grilla ubica cada cita por la fecha que se agendó, y nunca se corre al
// cambiar el día. Si la cita no tiene fecha (demo/online antiguas), usa su `day`.
function apptDayOff(a) {
  if (a && a.fecha) {
    var t = new Date(a.fecha + "T00:00:00");
    if (!isNaN(t.getTime())) {
      var base = new Date(); base.setHours(0, 0, 0, 0);
      return Math.round((t.getTime() - base.getTime()) / 86400000);
    }
  }
  return (a && typeof a.day === "number") ? a.day : 0;
}

function AdminApp() {
  // Modo día automático 08:00–18:00; modo noche 18:00–08:00.
  const autoTheme = () => { const h = new Date().getHours(); return (h >= 8 && h < 18) ? "cielo" : "azul"; };
  const autoPeriod = () => { const h = new Date().getHours(); return h >= 8 && h < 18 ? "day" : "night"; };
  // Carga desde localStorage si el usuario forzó el tema en el mismo período del día
  const loadTheme = () => {
    try { const s = JSON.parse(localStorage.getItem("jcm_theme_pref") || "null"); if (s && s.key && s.period === autoPeriod()) return s.key; } catch (e) {}
    return autoTheme();
  };
  const [themeKey, setThemeKey] = useState(loadTheme);
  const themeForced = useRef(loadTheme() !== autoTheme());
  // Re-evalúa el tema cada 5 min; si cambió el período, borra el forzado y aplica auto.
  useEffect(() => {
    const id = setInterval(() => {
      const curr = autoPeriod();
      try { const s = JSON.parse(localStorage.getItem("jcm_theme_pref") || "null"); if (s && s.period !== curr) { localStorage.removeItem("jcm_theme_pref"); themeForced.current = false; } } catch (e) {}
      if (!themeForced.current) setThemeKey(autoTheme());
    }, 300000);
    return () => clearInterval(id);
  }, []);
  // Tipografía unificada para TODAS las clínicas: Fraunces como serif/itálica (cuerpo en Jost).
  const _T0 = JCTHEME[themeKey];
  const T = Object.assign({}, _T0, { serif: "'Fraunces', Georgia, serif", ital: "'Fraunces', Georgia, serif" });
  const D = window.JCDATA, A = window.JCADMIN;

  const _initRoute = panelParseRoute(); // sección/paciente inicial según la URL (/panel/<seccion>[/<id>])
  const [section, setSection] = useState(_initRoute.section);
  // Tour de bienvenida: se muestra una vez por clínica al entrar al panel (se marca tour_done_v1).
  const [showTour, setShowTour] = useState(() => { try { return !(window.DB && window.DB.get("tour_done_v1")); } catch (e) { return false; } });
  function closeTour() { try { window.DB && window.DB.set("tour_done_v1", true); } catch (e) {} setShowTour(false); }
  const [darCita, setDarCita] = useState(null); // prellenado del copiloto → abre modal "Dar cita"
  const [patients, setPatients] = useState(() => {
    // Carga hidratada: el índice "patients" es liviano y el historial vive en phist_<id>.
    var raw = (window.DB && window.DB.get("patients"));
    var arr = Array.isArray(raw)
      ? (window.jcmLoadPatientsFull ? window.jcmLoadPatientsFull() : raw)
      : A.patients;
    return arr.map(p => ({ ...p, points: p.points || [], history: Array.isArray(p.history) ? p.history : [] }));
  });
  const [openPatient, setOpenPatient] = useState(_initRoute.pid);
  const [openPatientTab, setOpenPatientTab] = useState(null);
  const [appts, setAppts] = useState(() => {
    // Citas por clínica desde la BD (Firebase). Las reservas web ya entran aquí vía importWebBookings.
    var saved = (window.DB && window.DB.get("appointments"));
    if (Array.isArray(saved)) return saved.map(a => ({ ...a }));
    const base = D.appointments.map(a => ({ ...a }));
    try {
      const online = (window.DB && window.DB.get("bookings")) || [];
      online.forEach(b => base.push({
        id: b.id, name: b.name, phone: b.phone,
        proc: (b.items || []).map(i => ((i.qty || 1) > 1 ? i.qty + "× " : "") + i.name).join(" + ") || "Reserva online",
        time: b.time || "—", when: b.day || "Por coordinar",
        status: "pendiente", paid: !!b.pay, day: 0, online: true
      }));
    } catch (e) {}
    return base;
  });
  // Persistencia por clínica. Punto ÚNICO: el historial se guarda en phist_<id> y el
  // índice "patients" queda liviano (no topa el límite de 1 MB de la nube → sincroniza siempre).
  function savePatients(list) {
    try {
      if (window.jcmSavePatientsLight) window.jcmSavePatientsLight(list);
      else if (window.DB) window.DB.set("patients", list);
    } catch (e) {}
    return list;
  }
  function saveAppts(list) { try { window.DB && window.DB.set("appointments", list); } catch (e) {} return list; }

  // ── Sincronización robusta entre dispositivos ────────────────────────────────
  // (A+C) Al entrar: migra el historial inline → phist_<id> y saca las imágenes/firmas
  // base64 del bloque "patients" (reusa la optimización ya probada). Así el índice queda
  // liviano, baja del límite de 1 MB y vuelve a subir a la nube. No se pierde ningún dato.
  useEffect(() => {
    try {
      if (window.jcmSavePatientsLight) window.jcmSavePatientsLight(patients); // C: separa el historial
      if (window.optimizePatientsBlock) window.optimizePatientsBlock();        // A: separa imágenes/firmas
      if (window.JCSAAS && window.JCSAAS.retrySync) setTimeout(() => { try { window.JCSAAS.retrySync(); } catch (e) {} }, 1500);
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // (B) Refresco en vivo: cuando otro dispositivo de la clínica sube un cambio, la nube
  // actualiza el almacenamiento local y emite 'jcsaas:data'. Aquí re-leemos pacientes y
  // agenda para que aparezcan SIN tener que recargar la página.
  useEffect(() => {
    function onData() {
      try {
        var raw = window.DB && window.DB.get("patients");
        if (Array.isArray(raw)) {
          var full = window.jcmLoadPatientsFull ? window.jcmLoadPatientsFull() : raw;
          setPatients(full.map(p => ({ ...p, points: p.points || [], history: Array.isArray(p.history) ? p.history : [] })));
        }
        var fa = window.DB && window.DB.get("appointments");
        if (Array.isArray(fa)) setAppts(fa.map(a => ({ ...a })));
      } catch (e) {}
    }
    window.addEventListener("jcsaas:data", onData);
    return () => window.removeEventListener("jcsaas:data", onData);
  }, []);

  const [navOpen, setNavOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  function toggleGroup(g) { setCollapsedGroups(s => ({ ...s, [g]: !s[g] })); }
  const [topGrp, setTopGrp] = useState(null); // menú de grupo abierto en la barra superior
  const [stripOpen, setStripOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifVer, setNotifVer] = useState(0); // se incrementa al marcar notificaciones como leídas
  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(() => { try { return localStorage.getItem("jcm_admin_photo") || null; } catch (e) { return null; } });
  const profileRef = useRef(null);
  const profilePhotoInput = useRef(null);
  useEffect(() => {
    const h = e => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  // Refresca la agenda sin recargar cuando se importan reservas web a mitad de sesión
  // (lo dispara jcmImportReservas en Integraciones → "Importar reservas").
  useEffect(() => {
    const reload = () => { try { var s = window.DB && window.DB.get("appointments"); if (Array.isArray(s)) setAppts(s.map(a => ({ ...a }))); } catch (e) {} };
    window.addEventListener("jcm:appts", reload);
    return () => window.removeEventListener("jcm:appts", reload);
  }, []);
  // Trae las reservas web a la agenda SOLAS: al abrir el panel y al volver a la pestaña
  // (con tope de 20 s para no leer Firestore de más). Refresca el estado para que aparezcan
  // sin tener que tocar el botón. importWebBookings es idempotente (marca importadas, dedup).
  const lastWebPull = useRef(0);
  useEffect(() => {
    let alive = true;
    function pull() {
      if (!(window.JCSAAS && window.JCSAAS.enabled)) return;
      const now = Date.now();
      if (now - lastWebPull.current < 20000) return;
      lastWebPull.current = now;
      try {
        importAllWeb().then(() => {
          if (!alive) return;
          try { const fresh = window.DB && window.DB.get("appointments"); if (Array.isArray(fresh)) setAppts(fresh.map(a => ({ ...a }))); } catch (e) {}
        });
      } catch (e) {}
    }
    pull();
    const onFocus = () => pull();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => { alive = false; window.removeEventListener("focus", onFocus); document.removeEventListener("visibilitychange", onFocus); };
  }, []);

  function updatePatient(id, patch) { setPatients(ps => savePatients(ps.map(p => p.id === id ? { ...p, ...patch } : p))); }
  // Marca de una sola vez todos los pacientes sin consentimiento como "firmado en papel"
  // (para la base importada de Excel, que ya tiene el consentimiento físico). Devuelve cuántos cambió.
  function markAllPaperConsent() {
    let n = 0;
    setPatients(ps => savePatients(ps.map(p => { if (!p.consent) { n++; return { ...p, consent: true, consentInfo: "Consentimiento firmado en papel" }; } return p; })));
    return n;
  }
  function addPatient(p) {
    // Bloquear duplicados por RUT o por nombre exacto (case-insensitive).
    const rutClean = (r) => (r || "").replace(/[.\-\s]/g, "").toLowerCase();
    const pRut = rutClean(p.rut);
    const pName = (p.name || "").toLowerCase().trim();
    const existing = patients.find(x => {
      if (!p.imported) { // importación masiva omite el chequeo para no bloquear el Excel
        if (pRut.length >= 6 && rutClean(x.rut) === pRut) return true;
        if (pName.length >= 4 && (x.name || "").toLowerCase().trim() === pName) return true;
      }
      return false;
    });
    if (existing) {
      try { window.jcmToast && window.jcmToast("Ya existe una ficha para \"" + existing.name + "\" (RUT o nombre duplicado).", "error"); } catch (e) {}
      return existing; // retorna el existente para que la cita quede ligada a él
    }
    // consent/tags/points/history por defecto vacíos, pero la importación puede traerlos
    // (p.ej. pacientes de Excel con consentimiento ya firmado en papel → consent:true).
    const np = { ...p, id: (window.jcmUid ? window.jcmUid("p") : "p" + Date.now()), tags: p.tags || [], consent: p.consent === true, points: p.points || [], history: p.history || [] };
    // Pacientes creados manualmente (Agenda / "+ Paciente") reciben la fecha de hoy para que
    // aparezcan ordenados en el filtro "Calendario". Los importados conservan la del Excel.
    if (np.fechaTs == null && !np.imported) np.fechaTs = Date.now();
    setPatients(ps => savePatients([np, ...ps]));
    if (!np.imported) jcmAudit("Paciente creado: " + (np.name || "—"));
    try { window.jcmToast && window.jcmToast("Paciente \"" + (np.name || "") + "\" guardado.", "ok"); } catch (e) {}
    return np;
  }
  function removePatient(id) {
    setPatients(ps => savePatients(ps.filter(p => p.id !== id)));
    try { window.jcmToast && window.jcmToast("Paciente eliminado.", "info"); } catch (e) {}
  }
  function addAppt(a) {
    setAppts(as => saveAppts([...as, { ...a, id: (window.jcmUid ? window.jcmUid("a") : "a" + Date.now()) }]));
    jcmAudit("Cita agendada: " + (a.name || "—") + (a.fecha ? " · " + a.fecha : "") + (a.time ? " " + a.time : "") + (a.proc ? " · " + a.proc : ""));
    try { window.jcmToast && window.jcmToast("Cita agendada.", "ok"); } catch (e) {}
  }
  function updateAppt(id, patch) {
    // Registro de actividad para cambios de estado de una cita (P25).
    if (patch && patch.status) {
      try {
        const prevA = appts.find(a => a.id === id);
        const lbl = { confirmada: "confirmada", atendida: "marcada como atendida", no_asistio: "marcada como no asistió", anulada: "anulada", pendiente: "vuelta a agendada" }[patch.status] || ("→ " + patch.status);
        if (prevA) jcmAudit("Cita " + lbl + ": " + (prevA.name || "—") + (prevA.time ? " " + prevA.time : ""));
      } catch (e) {}
    }
    setAppts(as => {
      // Si se confirma una cita que estaba pendiente de pago, bloquear el slot ahora
      if (patch.status === "confirmada") {
        const prev = as.find(a => a.id === id);
        if (prev && prev.status === "pendiente_pago" && prev.fecha && prev.time) {
          try {
            const map = (window.DB && window.DB.get('horarios_dates')) || {};
            const cur = Array.isArray(map[prev.fecha]) ? map[prev.fecha] : [];
            map[prev.fecha] = cur.filter(s => s !== prev.time);
            if (window.DB) window.DB.set('horarios_dates', map);
          } catch(e) {}
        }
      }
      return saveAppts(as.map(a => a.id === id ? { ...a, ...patch } : a));
    });
  }
  function removeAppt(id) {
    const appt = appts.find(a => a.id === id);
    if (appt && appt.fecha && appt.time) {
      try {
        const map = (window.DB && window.DB.get('horarios_dates')) || {};
        const cur = Array.isArray(map[appt.fecha]) ? map[appt.fecha] : [];
        if (!cur.includes(appt.time)) { cur.push(appt.time); cur.sort(); map[appt.fecha] = cur; }
        if (window.DB) window.DB.set('horarios_dates', map);
      } catch(e) {}
    }
    setAppts(as => saveAppts(as.filter(a => a.id !== id)));
  }
  // Trae las reservas hechas en la web (link público) a la agenda, AHORA y a demanda.
  // Lee directo Firestore (diagnóstico: cuántas hay), las importa y refresca la agenda.
  function syncWebBookings() {
    if (!(window.JCSAAS && window.JCSAAS.enabled)) return Promise.resolve({ ok: false, reason: "Este panel no está conectado a la nube." });
    var fetchP = window.JCSAAS.fetchBookings ? window.JCSAAS.fetchBookings() : Promise.resolve([]);
    return fetchP.then(function (pending) {
      var impP = window.JCSAAS.importWebBookings ? window.JCSAAS.importWebBookings() : Promise.resolve(0);
      return impP.then(function (added) {
        try { var fresh = window.DB && window.DB.get("appointments"); if (Array.isArray(fresh)) setAppts(fresh.map(a => ({ ...a }))); } catch (e) {}
        return { ok: true, pending: (pending || []).length, added: added || 0, clinicId: (window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId()) || "" };
      });
    }).catch(function (err) { return { ok: false, reason: (err && (err.code || err.message)) || "error" }; });
  }
  function nav(k) { setSection(k); setOpenPatient(null); setNavOpen(false); }

  // Multiusuario: si un PROFESIONAL llega (por URL/atrás) a una sección que sus permisos no incluyen,
  // se le redirige al Dashboard. Solo aplica a role 'professional'; al dueño no lo afecta.
  useEffect(() => {
    try {
      var role = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentRole) ? window.JCSAAS.currentRole() : 'owner';
      if (role !== 'professional') return;
      if (section === 'dashboard' || openPatient) return;
      var ok = adminNavItems().some(function (n) { return n.k === section; }) || section === 'pacientes';
      if (!ok) setSection('dashboard');
    } catch (e) {}
  }, [section, openPatient]);

  // Mantiene la URL sincronizada con la sección/paciente (deep-linking): /panel/inventario, /panel/pacientes/<id>…
  useEffect(() => {
    try { var target = panelRoutePath(section, openPatient); if (location.pathname !== target) window.history.pushState({ s: section, p: openPatient }, "", target); } catch (e) {}
  }, [section, openPatient]);
  // Botón atrás/adelante del navegador → vuelve a la sección/paciente correspondiente.
  useEffect(() => {
    function onPop() { var r = panelParseRoute(); setSection(r.section); setOpenPatient(r.pid); setNavOpen(false); }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // ── Motor de recordatorios por CORREO ─────────────────────────────────────
  // Se ejecuta al abrir el panel (1 vez al día). Manda el recordatorio de cita por correo a los
  // pacientes que tengan email: r24 = cita de mañana, rmorning = cita de hoy. Dedup por cita+fecha
  // (sincronizado por DB→Firestore) para no reenviar. WhatsApp queda pendiente del canal Cloud API.
  useEffect(() => {
    try {
      var iso = function (d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); };
      var hoy = new Date(), hoyISO = iso(hoy);
      var lastRun = ""; try { lastRun = DB.get("auto_email_lastrun"); } catch (e) {}
      if (lastRun === hoyISO) return;
      if (!window.mediqueEmail) return;
      var rules = {}; try { (DB.get("automations") || []).forEach(function (r) { rules[r.id] = r.on; }); } catch (e) {}
      var r24on = rules.r24 !== false, rmornOn = rules.rmorning !== false;
      if (!r24on && !rmornOn) { try { DB.set("auto_email_lastrun", hoyISO); } catch (e) {} return; }
      var manana = new Date(hoy); manana.setDate(hoy.getDate() + 1); var manISO = iso(manana);
      var clinic = (function () { try { return DB.cfg().clinic_name || "tu clínica"; } catch (e) { return "tu clínica"; } })();
      var valido = function (e) { return e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); };
      var sent = {}; try { sent = DB.get("auto_email_sent") || {}; } catch (e) {}
      var timer = setTimeout(function () {
        var jobs = [];
        (appts || []).forEach(function (a) {
          // No recordar citas canceladas/anuladas ni no-show (si se canceló, no sale el correo automático).
          if (a.status === "anulada" || a.status === "cancelada" || a.status === "no_asistio") return;
          var esMan = a.fecha === manISO, esHoy = a.fecha === hoyISO;
          if (!(r24on && esMan) && !(rmornOn && esHoy)) return;
          var p = patients.find(function (x) { return x.id === a.patId; });
          var email = (p && p.email) || a.email; if (!valido(email)) return;
          var ruleId = esMan ? "r24" : "rmorning";
          var key = ruleId + ":" + (a.id || (a.patId + "" + a.fecha + a.time)) + ":" + a.fecha;
          if (sent[key]) return;
          var nombre = (((p && p.name) || a.name || "").split(" ")[0]) || "";
          var cuando = esMan ? "mañana" : "hoy";
          var text = "Hola " + nombre + ",\n\nTe recordamos tu cita en " + clinic + " " + cuando + (a.time ? " a las " + a.time : "") + (a.proc ? " (" + a.proc + ")" : "") + ".\n\nSi necesitas reprogramar, respóndenos este correo.\n\n— " + clinic;
          jobs.push({ key: key, email: email, text: text });
        });
        if (!jobs.length) { try { DB.set("auto_email_lastrun", hoyISO); } catch (e) {} return; }
        var ok = 0;
        var run = function (i) {
          if (i >= jobs.length) {
            try { DB.set("auto_email_sent", sent); DB.set("auto_email_lastrun", hoyISO); } catch (e) {}
            if (ok) { try { window.jcmToast && window.jcmToast(ok + " recordatorio(s) de cita enviado(s) por correo.", "ok"); } catch (e) {} }
            return;
          }
          var j = jobs[i];
          window.mediqueEmail({ to: j.email, subject: "Recordatorio de tu cita · " + clinic, text: j.text, replyTo: window.clinicReplyTo && window.clinicReplyTo() })
            .then(function (r) { if (r && r.ok) { sent[j.key] = true; ok++; } run(i + 1); })
            .catch(function () { run(i + 1); });
        };
        run(0);
      }, 5000);
      return function () { clearTimeout(timer); };
    } catch (e) {}
  }, []);

  // ── Motor de RESPALDO automático por correo (1×/semana, al abrir el panel) ──
  // Envía el respaldo .json de fichas+citas como adjunto al correo de la clínica. Reemplaza el
  // "descargar a mano". Dedup por fecha: solo si pasaron ≥7 días desde el último envío confirmado.
  useEffect(function () {
    try {
      if (!window.jcmEmailBackup) return;
      var to = (window.clinicReplyTo && window.clinicReplyTo()) || "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return; // sin correo configurado → no hay a dónde enviarlo
      var last = ""; try { last = DB.get("auto_backup_lastrun") || ""; } catch (e) {}
      var now = new Date(); now.setHours(0, 0, 0, 0);
      if (last) { var ld = new Date(last + "T00:00:00"); if (!isNaN(ld.getTime()) && (now - ld) < 7 * 86400000) return; }
      var iso = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
      // Después de los recordatorios (5s) para no encimar dos envíos al abrir.
      var timer = setTimeout(function () {
        window.jcmEmailBackup({ silent: true }).then(function (r) {
          if (r && r.ok) {
            try { DB.set("auto_backup_lastrun", iso); } catch (e) {}
            try { window.jcmToast && window.jcmToast("Respaldo semanal enviado a tu correo.", "ok"); } catch (e) {}
          }
        });
      }, 11000);
      return function () { clearTimeout(timer); };
    } catch (e) {}
  }, []);

  const current = patients.find(p => p.id === openPatient);
  const _sinCons = (window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter(p => !p.consent));
  const pendCount = _sinCons.length + ((window.CADMIN || {}).waMessages || []).length + ((window.CADMIN || {}).bizComments || []).length;
  // La campana cuenta solo lo NO leído (se actualiza al pulsar "Leer todas"); notifVer fuerza el recálculo.
  const notifCount = (notifVer, unreadNotifCount(patients, appts));

  let body;
  if (section === "dashboard") body = <DashboardView T={T} D={D} A={A} appts={appts} patients={patients} go={nav} />;
  else if (section === "appjcm") body = <AppJCMView T={T} />;
  else if (section === "resumen") body = <Resumen T={T} D={D} A={A} appts={appts} patients={patients} go={nav} updateAppt={updateAppt} removeAppt={removeAppt} themeKey={themeKey} setThemeKey={setThemeKey} />;
  else if (section === "agenda") body = <Agenda T={T} appts={appts} patients={patients} addAppt={addAppt} addPatient={addPatient} updateAppt={updateAppt} removeAppt={removeAppt} onSyncWeb={syncWebBookings} onOpenPatient={(id) => { setOpenPatient(id); setSection("pacientes"); }} />;
  else if (section === "pacientes") body = current
    ? <FichaMedica T={T} patient={current} updatePatient={updatePatient} removePatient={removePatient} onBack={() => { setOpenPatient(null); setOpenPatientTab(null); }} onAgendar={() => nav("agenda")} initialTab={openPatientTab} />
    : <PacientesView T={T} patients={patients} appts={appts} onOpen={setOpenPatient} updatePatient={updatePatient} addPatient={addPatient} />;
  else if (section === "salaespera") body = <SalaEsperaView T={T} appts={appts} patients={patients} updatePatient={updatePatient} />;
  else if (section === "automatizaciones") body = <AutomatizacionesView T={T} />;
  else if (section === "agenteia") body = <AgenteIAView T={T} patients={patients} addAppt={addAppt} />;
  else if (section === "pendientes") body = <PendientesView T={T} patients={patients} appts={appts} go={nav} openP={(id, tab) => { setOpenPatient(id); setOpenPatientTab(tab || null); setSection("pacientes"); }} updatePatient={updatePatient} />;
  else if (section === "servicios") body = <ServiciosView T={T} />;
  else if (section === "equipo") body = <EquipoView T={T} />;
  else if (section === "sucursales") body = <SucursalesView T={T} />;
  else if (section === "crm") body = <CrmView T={T} />;
  else if (section === "tutoriales") body = <TutorialesView T={T} go={nav} />;
  else if (section === "consentimientos") body = <ConsentimientosView T={T} />;
  else if (section === "fichaeditor") body = <FichaEditorView T={T} />;
  else if (section === "difusiones") body = <DifusionesView T={T} />;
  else if (section === "copilot") body = <CopilotConfigView T={T} />;
  else if (section === "fidelidad") body = <FidelidadView T={T} />;
  else if (section === "marketing") body = <MarketingView T={T} go={nav} />;
  else if (section === "administracion") body = <AdministracionView T={T} go={nav} patients={patients} appts={appts} addPatient={addPatient} updatePatient={updatePatient} markAllPaperConsent={markAllPaperConsent} />;
  else if (section === "inventario") body = <InventarioView T={T} />;
  else if (section === "caja") body = <CajaView T={T} />;
  else if (section === "integraciones") body = <IntegracionesView T={T} />;
  else if (section === "reportes") body = <ReportesView T={T} patients={patients} appts={appts} />;
  else if (section === "colaboracion") body = <ColaboracionView T={T} />;
  else if (section === "config") body = <ConfigView T={T} />;
  // ── Suite nueva (N1–N10) ──
  else if (section === "notasia") body = <NotasClinicasView T={T} patients={patients} updatePatient={updatePatient} />;
  else if (section === "resumenia") body = <ResumenClinicoView T={T} patients={patients} appts={appts} />;
  else if (section === "contactcenter") body = <ContactCenterView T={T} patients={patients} />;
  else if (section === "reportesia") body = <ReportesIAView T={T} patients={patients} appts={appts} />;
  else if (section === "contraloria") body = <ContraloriaView T={T} patients={patients} appts={appts} />;
  else if (section === "desempeno") body = <DesempenoView T={T} patients={patients} appts={appts} />;
  else if (section === "encuestas") body = <EncuestasView T={T} patients={patients} />;
  else if (section === "chatinterno") body = <ChatInternoView T={T} />;
  else if (section === "pagosgastos") body = <PagosGastosView T={T} />;
  else if (section === "remuneraciones") body = <RemuneracionesView T={T} />;
  else if (section === "laboratorios") body = <LaboratoriosView T={T} patients={patients} />;
  else if (section === "convenios") body = <ConveniosView T={T} />;
  else if (section === "flujocaja") body = <FlujoCajaView T={T} />;
  else if (section === "boletas") body = <BoletasView T={T} patients={patients} />;
  else if (section === "pagosonline") body = <PagosOnlineView T={T} patients={patients} />;

  const RAIL = 60, EXP = 212;
  // Barra izquierda oscura (color de la pestaña seleccionada): única navegación del panel.
  // Sidebar: claro en día (estilo Medique), oscuro en noche.
  const SIDE_BG = T.dark ? "#0E131B" : "#FFFFFF",
    SIDE_TX = T.dark ? "#EFEAE0" : "#1A1A14",
    SIDE_MUTE = T.dark ? "rgba(239,234,224,.55)" : "#5C5A50",
    SIDE_LINE = T.dark ? "rgba(239,234,224,.10)" : "rgba(20,20,15,.10)",
    SIDE_ACT = T.dark ? "rgba(239,234,224,.10)" : (T.accentSoft || "rgba(84,112,127,.12)");
  const SIDE_LOGO = "/assets/medique-logo.png";
  return (
    <div className="jc-stage" style={{ background: T.dark ? "#070707" : "#DCD7CC" }}>
      <div className="jc-admin-frame" style={{ background: T.bg, boxShadow: T.shadow, color: T.text, display: "flex", flexDirection: "row" }}>
        {/* SIDEBAR — única navegación */}
        <div onMouseEnter={() => setNavOpen(true)} onMouseLeave={() => setNavOpen(false)}
          style={{ width: RAIL, flexShrink: 0, background: SIDE_BG, position: "relative", zIndex: 20 }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: navOpen ? EXP : RAIL, background: SIDE_BG, borderRight: "1px solid " + SIDE_LINE, transition: "width .22s " + T.ease, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: navOpen ? "8px 0 30px -10px rgba(0,0,0,.5)" : "none" }}>
            <button onClick={() => nav("dashboard")} title="Ir al Dashboard" style={{ display: "flex", alignItems: "center", justifyContent: navOpen ? "flex-start" : "center", gap: 12, padding: navOpen ? "16px 18px" : "16px 0", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: "#F2EDE6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px -2px rgba(0,0,0,.4)" }}>
                <img src={SIDE_LOGO} alt="Medique" style={{ width: 30, height: 30, objectFit: "contain" }} />
              </span>
              {navOpen && <span style={{ fontFamily: T.sans, fontSize: 13, letterSpacing: ".34em", textTransform: "lowercase", color: SIDE_MUTE, whiteSpace: "nowrap" }}>medique</span>}
            </button>
            <div className="jc-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "6px 0" }}>
              {(() => { let curGroup = null; return adminNavItems().map(n => {
                if (SIDE_GROUP_HEAD[n.k]) curGroup = SIDE_GROUP_HEAD[n.k];
                const grp = curGroup;
                const collapsed = navOpen && !!collapsedGroups[grp];
                const active = section === n.k;
                const head = SIDE_GROUP_HEAD[n.k];
                return (
                  <React.Fragment key={n.k}>
                    {navOpen && head && <button onClick={() => toggleGroup(grp)} title={collapsedGroups[grp] ? "Mostrar" : "Ocultar"} style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".18em", textTransform: "uppercase", color: SIDE_MUTE, opacity: .7, padding: "14px 19px 5px", textAlign: "left" }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: collapsedGroups[grp] ? "rotate(-90deg)" : "none", transition: "transform .18s", flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                      {head}
                    </button>}
                    {!navOpen && head && n.k !== "dashboard" && <div style={{ height: 1, background: SIDE_LINE, margin: "7px 14px" }} />}
                    {!collapsed && <button onClick={() => nav(n.k)} title={n.l} style={{
                      display: "flex", alignItems: "center", justifyContent: navOpen ? "flex-start" : "center", gap: 14, width: "100%", padding: navOpen ? "12px 19px" : "12px 0", background: active ? SIDE_ACT : "none",
                      border: "none", borderLeft: "3px solid " + (active ? T.accent : "transparent"), cursor: "pointer", whiteSpace: "nowrap", position: "relative"
                    }}>
                      {nIcon(n.k, active ? SIDE_TX : SIDE_MUTE)}
                      {navOpen && <span style={{ fontFamily: T.sans, fontSize: 12.5, letterSpacing: ".02em", color: active ? SIDE_TX : SIDE_MUTE }}>{n.l}</span>}
                      {n.k === "pendientes" && pendCount > 0 && (navOpen
                        ? <span style={{ marginLeft: "auto", fontFamily: T.sans, fontSize: 10, background: "#C0285A", color: "#fff", borderRadius: 999, padding: "2px 7px" }}>{pendCount}</span>
                        : <span style={{ position: "absolute", top: 7, right: 11, width: 7, height: 7, borderRadius: "50%", background: "#C0285A" }} />)}
                    </button>}
                  </React.Fragment>
                );
              }); })()}
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px 10px", borderBottom: "1px solid " + T.line, background: T.navBg, backdropFilter: "blur(14px)", position: "relative", zIndex: 6, flexWrap: "wrap" }}>
            {/* Izquierda: solo el buscador de pacientes (nombre, RUT, teléfono o correo) */}
            <PatientSearch T={T} patients={patients} onOpen={(id) => { setOpenPatient(id); setSection("pacientes"); }} />
            <div style={{ flex: 1 }} />
            {/* Derecha: dropdown de perfil */}
            <div ref={profileRef} style={{ position: "relative" }}>
              <button onClick={() => setProfileOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 9, background: profileOpen ? (T.chipBg || "rgba(0,0,0,.06)") : "none", border: "1px solid " + (profileOpen ? T.chipBorder : "transparent"), cursor: "pointer", padding: "5px 10px 5px 6px", borderRadius: 10, transition: "all .15s" }}>
                <Avatar T={T} name={clinicDisplayName()} src={clinicAvatarSrc(profilePic)} size={32} />
                <div style={{ minWidth: 0, textAlign: "left" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text, lineHeight: 1.1, whiteSpace: "nowrap" }}>{clinicDisplayName()}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, lineHeight: 1.1 }}>Mi perfil</div>
                </div>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="2.2" style={{ flexShrink: 0, transform: profileOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {profileOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, minWidth: 230, background: T.bg, border: "1px solid " + T.line, borderRadius: 14, boxShadow: "0 12px 40px -10px rgba(0,0,0,.4)", zIndex: 200, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px 14px", borderBottom: "1px solid " + T.line }}>
                    <Avatar T={T} name={clinicDisplayName()} src={clinicAvatarSrc(profilePic)} size={42} />
                    <div>
                      <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text, lineHeight: 1.2 }}>{clinicDisplayName()}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>Administrador</div>
                    </div>
                  </div>
                  {[
                    { label: "Cambiar foto", action: "photo", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> },
                    { label: "Configuración", action: "config", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
                    { label: "Cerrar sesión", action: "logout", danger: true, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg> }
                  ].map(item => (
                    <button key={item.action} onClick={() => {
                      if (item.action === "photo") { profilePhotoInput.current && profilePhotoInput.current.click(); }
                      else if (item.action === "config") { nav("config"); setProfileOpen(false); }
                      else if (item.action === "logout") { if (window.JCSAAS && window.JCSAAS.enabled) { window.JCSAAS.logout().then(function () { location.reload(); }); } else { if (window.jcmAdminEndSession) window.jcmAdminEndSession(); location.reload(); } }
                    }} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 18px", background: "none", border: "none", borderTop: "1px solid " + T.lineSoft, cursor: "pointer", color: item.danger ? "#C0285A" : T.text, fontFamily: T.sans, fontSize: 13, textAlign: "left" }}>
                      <span style={{ color: item.danger ? "#C0285A" : T.textMute, display: "flex" }}>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
              <input ref={profilePhotoInput} type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                const f = e.target.files && e.target.files[0]; if (!f) return;
                const r = new FileReader();
                r.onload = ev => { try { localStorage.setItem("jcm_admin_photo", ev.target.result); setProfilePic(ev.target.result); } catch (e) {} setProfileOpen(false); };
                r.readAsDataURL(f);
              }} />
            </div>
            <button onClick={() => window.jcmHardRefresh && window.jcmHardRefresh()} title="Actualizar panel" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.chipBorder, background: T.chipBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M8 16H3v5"/>
              </svg>
            </button>
            <button onClick={() => setNotifOpen(true)} title="Notificaciones" style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.chipBorder, background: T.chipBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></svg>
              {notifCount > 0 && <span style={{ position: "absolute", top: -2, right: -2, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 999, background: "#C0285A", color: "#fff", fontFamily: T.sans, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>{notifCount}</span>}
            </button>
            <button onClick={() => { const nk = T.dark ? "cielo" : "azul"; themeForced.current = true; setThemeKey(nk); try { localStorage.setItem("jcm_theme_pref", JSON.stringify({ key: nk, period: autoPeriod() })); } catch (e) {} }} title={T.dark ? "Modo día" : "Modo noche"} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.chipBorder, background: T.chipBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{T.dark ? <><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></> : <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />}</svg>
            </button>
          </div>

          {/* barra dashboard horizontal · grupos desplegables (F8) */}
          <div className="jc-scroll" style={{ display: "flex", gap: 6, overflowX: "auto", padding: "7px 16px", borderBottom: "1px solid " + T.line, background: T.navBg, position: "relative", zIndex: 5, flexShrink: 0 }}>
            {(() => {
              const items = adminNavItems(); const byKey = {}; items.forEach(n => { byKey[n.k] = n.l; });
              // Pestañas fijas (acceso rápido) primero.
              const pins = NAV_PINNED.filter(k => byKey[k]).map(k => {
                const active = section === k;
                return (
                  <button key={"pin-" + k} onClick={() => nav(k)} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 10, cursor: "pointer", border: "1px solid " + (active ? T.accent : T.line), background: active ? T.accent : T.chipBg, color: active ? (T.onAccent || "#fff") : T.textMute, fontFamily: T.sans, fontSize: 11.5, fontWeight: active ? 600 : 500, whiteSpace: "nowrap", transition: "all .2s " + T.ease }}>
                    {k === "pendientes" && pendCount > 0 && <span style={{ width: 5, height: 5, borderRadius: "50%", background: active ? (T.onAccent || "#fff") : "#C0285A" }} />}
                    {byKey[k]}
                  </button>
                );
              });
              // Grupos desplegables con el resto (sin las fijas).
              const grps = NAV_TOP_GROUPS.map(g => {
                const keys = g.keys.filter(k => byKey[k] && NAV_PINNED.indexOf(k) < 0); if (!keys.length) return null;
                const activeInGroup = keys.indexOf(section) >= 0;
                return (
                  <button key={g.l} onClick={e => { const r = e.currentTarget.getBoundingClientRect(); const MENU_W = 210; const rightAlign = r.left + MENU_W > window.innerWidth - 8; setTopGrp(topGrp && topGrp.l === g.l ? null : { l: g.l, x: r.left, right: rightAlign ? Math.max(8, window.innerWidth - r.right) : null, y: r.bottom + 5, keys: keys, byKey: byKey }); }}
                    style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 10, cursor: "pointer", border: "1px solid " + (activeInGroup ? T.accent : T.line), background: activeInGroup ? T.accent : T.chipBg, color: activeInGroup ? (T.onAccent || "#fff") : T.textMute, fontFamily: T.sans, fontSize: 11.5, fontWeight: activeInGroup ? 600 : 500, whiteSpace: "nowrap", transition: "all .2s " + T.ease }}>
                    {activeInGroup ? g.l + " · " + byKey[section] : g.l}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                );
              });
              return pins.concat(<span key="nav-div" style={{ flexShrink: 0, width: 1, alignSelf: "stretch", background: T.line, margin: "2px 4px" }} />).concat(grps);
            })()}
          </div>
          {topGrp && (<>
            <div onClick={() => setTopGrp(null)} style={{ position: "fixed", inset: 0, zIndex: 50 }} />
            <div className="jc-scroll" style={{ position: "fixed", top: topGrp.y, zIndex: 51, background: T.bg, border: "1px solid " + T.line, borderRadius: 10, boxShadow: T.shadow, padding: 5, minWidth: 190, maxHeight: "70vh", overflowY: "auto", ...(topGrp.right != null ? { right: topGrp.right } : { left: topGrp.x }) }}>
              {topGrp.keys.map(k => (
                <button key={k} onClick={() => { nav(k); setTopGrp(null); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "9px 13px", borderRadius: 7, border: "none", background: section === k ? T.accent : "transparent", color: section === k ? (T.onAccent || "#fff") : T.text, cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, whiteSpace: "nowrap" }}>
                  {k === "pendientes" && pendCount > 0 && <span style={{ width: 6, height: 6, borderRadius: "50%", background: section === k ? (T.onAccent || "#fff") : "#C0285A" }} />}
                  {topGrp.byKey[k]}
                </button>
              ))}
            </div>
          </>)}

          <div id="jcm-main-scroll" className="jc-scroll" style={{ flex: 1, overflowY: "auto", padding: "18px 20px" }}>
            <div key={section + (openPatient || "")} style={{ animation: "jcFade .3s " + T.ease, maxWidth: 1500, margin: "0 auto" }}>{body}</div>
          </div>
        </div>
        <Copilot T={T} patients={patients} appts={appts} addAppt={addAppt} onDarCita={(pf) => setDarCita(pf)} />
        {darCita && <NewCitaModal T={T} patients={patients} addPatient={addPatient} appts={appts} time={darCita.time} day={darCita.day} prefill={darCita} onClose={() => setDarCita(null)} onSave={(a) => { addAppt(a); setDarCita(null); }} onOpenPatient={(id) => { setOpenPatient(id); setSection("pacientes"); }} addAppt={addAppt} />}
        {notifOpen && <NotifPopup T={T} patients={patients} appts={appts} onClose={() => setNotifOpen(false)} onChanged={() => setNotifVer(v => v + 1)} go={(k) => { setNotifOpen(false); nav(k); }} openP={(id) => { setNotifOpen(false); setOpenPatient(id); setSection("pacientes"); }} />}
        {showTour && <WelcomeTour T={T} go={(k) => nav(k)} onClose={closeTour} />}
      </div>
    </div>
  );
}

/* ─────────── NOTIFICACIONES (popup desde la campana) ─────────── */
// Las notificaciones se derivan del estado (pacientes sin consentimiento, etc.).
// "Leer todas" guarda las claves vistas en notif_read para que no reaparezcan en la campana.
function notifReadList() { try { var v = window.DB && DB.get("notif_read"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function notifMarkAllRead(keys) { try { var set = {}; notifReadList().forEach(function (k) { set[k] = 1; }); (keys || []).forEach(function (k) { set[k] = 1; }); window.DB && DB.set("notif_read", Object.keys(set)); } catch (e) {} }
function unreadNotifCount(patients, appts) {
  var read = {}; notifReadList().forEach(function (k) { read[k] = 1; });
  var n = 0;
  var sc = (window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : (patients || []).filter(function (p) { return !p.consent; }));
  sc.forEach(function (p) { if (!read["c" + p.id]) n++; });
  (((window.CADMIN || {}).waMessages) || []).forEach(function (m) { if (!read["w" + m.id]) n++; });
  (((window.CADMIN || {}).bizComments) || []).forEach(function (b) { if (!read["b" + b.id]) n++; });
  var recitas = (window.recitaDue ? window.recitaDue(patients) : []);
  recitas.forEach(function (x) { if (!read["re" + x.p.id]) n++; });
  var tasks = []; try { tasks = ((window.DB && DB.get("admin_tasks")) || []).filter(function (t) { return !t.done; }); } catch (e) {}
  tasks.forEach(function (t) { if (!read["t" + t.id]) n++; });
  return n;
}
function NotifPopup({ T, patients, appts, onClose, go, openP, onChanged }) {
  const D = window.JCDATA;
  const [tab, setTab] = useState("todo");
  // Excluye las notificaciones ya marcadas como leídas (botón "Leer todas").
  const read = {}; notifReadList().forEach(k => { read[k] = 1; });
  const wa = (((window.CADMIN || {}).waMessages) || []).filter(m => !read["w" + m.id]);
  const biz = (((window.CADMIN || {}).bizComments) || []).filter(b => !read["b" + b.id]);
  // Los consentimientos pendientes: se pueden descartar con X en el popup (se marcan como leídos),
  // pero siguen visibles en Pendientes hasta que se firmen realmente.
  const sinConsent = (window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter(p => !p.consent)).filter(p => !read["c" + p.id]);
  // Pacientes que ya cumplieron el plazo para su próxima aplicación (re-cita).
  const recitas = (window.recitaDue ? window.recitaDue(patients) : []).filter(x => !read["re" + x.p.id]);
  let tasks = []; try { tasks = ((window.DB && DB.get("admin_tasks")) || []).filter(t => !t.done && !read["t" + t.id]); } catch (e) {}
  const otros = [...wa, ...biz, ...tasks];
  const total = sinConsent.length + recitas.length + otros.length;
  function leerTodas() {
    const keys = [].concat(
      sinConsent.map(p => "c" + p.id), recitas.map(x => "re" + x.p.id),
      wa.map(m => "w" + m.id), biz.map(b => "b" + b.id), tasks.map(t => "t" + t.id)
    );
    notifMarkAllRead(keys);
    if (onChanged) onChanged();
    onClose();
  }
  // Descarta UNA notificación: la marca como leída y refresca, sin cerrar el panel.
  function leerUna(key) { notifMarkAllRead([key]); if (onChanged) onChanged(); }
  const row = (key, color, ic, title, sub, action, fn) => (
    <div key={key} style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "11px 14px", borderBottom: "1px solid " + T.lineSoft }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: color + "1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ic}</svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text, lineHeight: 1.35 }}>{title}</div>
        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>
      </div>
      {action && <button onClick={fn} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }}>{action}</button>}
      <button onClick={() => leerUna(key)} title="Descartar esta notificación" style={{ flexShrink: 0, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
    </div>
  );
  const ICb = <><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></>;
  const ICa = <><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></>;
  const ICc = <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></>;
  const ICk = <><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></>;
  // Tabs de categoría — solo las que tienen elementos
  const tabs = [
    { id: "todo",        label: "Todo",           n: total },
    { id: "consents",   label: "Consentimientos", n: sinConsent.length },
    { id: "recita",     label: "Re-cita",         n: recitas.length },
    { id: "otros",      label: "Otros",           n: otros.length },
  ].filter(t => t.id === "todo" || t.n > 0);
  const activeTab = tabs.find(t => t.id === tab) ? tab : "todo";
  const tabBtn = (t) => {
    const active = t.id === activeTab;
    return (
      <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 999, border: active ? "1px solid " + T.accent : "1px solid " + T.lineSoft, background: active ? T.accent + "18" : "transparent", fontFamily: T.sans, fontSize: 11, fontWeight: active ? 600 : 400, color: active ? T.accent : T.textMute, cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s" }}>
        {t.label}
        {t.n > 0 && <span style={{ fontFamily: T.sans, fontSize: 9.5, fontWeight: 700, background: active ? T.accent : T.lineSoft, color: active ? "#fff" : T.textMute, borderRadius: 999, padding: "1px 6px", lineHeight: 1.6 }}>{t.n}</span>}
      </button>
    );
  };
  // Filas visibles según tab activo
  const showConsents = activeTab === "todo" || activeTab === "consents";
  const showRecitas  = activeTab === "todo" || activeTab === "recita";
  const showOtros    = activeTab === "todo" || activeTab === "otros";
  const visibleCount = (showConsents ? sinConsent.length : 0) + (showRecitas ? recitas.length : 0) + (showOtros ? otros.length : 0);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 70 }} />
      <div style={{ position: "fixed", top: 60, right: 20, zIndex: 71, width: 372, maxWidth: "calc(100vw - 32px)", maxHeight: "78vh", display: "flex", flexDirection: "column", background: T.bg, border: "1px solid " + T.line, borderRadius: 14, boxShadow: "0 24px 60px -18px rgba(0,0,0,.55)", overflow: "hidden", animation: "jcSlideUp .25s " + T.ease }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid " + T.line }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: T.serif, fontSize: 18, color: T.text }}>Notificaciones</span>
            {total > 0 && <span style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, background: "#C0285A", color: "#fff", borderRadius: 999, padding: "2px 8px" }}>{total}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {total > 0 && <button onClick={leerTodas} style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: T.accent, background: "none", border: "none", cursor: "pointer", padding: "4px 6px" }}>Leer todas</button>}
            <button onClick={onClose} title="Cerrar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 2 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
          </div>
        </div>
        {/* Tabs de categoría (solo si hay más de una categoría con elementos) */}
        {tabs.length > 1 && (
          <div style={{ display: "flex", gap: 6, padding: "10px 14px", borderBottom: "1px solid " + T.lineSoft, overflowX: "auto", flexShrink: 0 }}>
            {tabs.map(tabBtn)}
          </div>
        )}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {total === 0 && <div style={{ padding: "34px 18px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textFaint }}>Todo al día. Sin notificaciones.</div>}
          {visibleCount === 0 && total > 0 && <div style={{ padding: "28px 18px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textFaint }}>Sin notificaciones en esta categoría.</div>}
          {showConsents && sinConsent.map(p => row("c" + p.id, "#C9A227", ICa, "Consentimiento por firmar", p.name, "Abrir ficha", () => openP(p.id)))}
          {showRecitas && recitas.map(({ p, r }) => row("re" + p.id, "#1F8A5B", ICb, "Toca re-citar · " + p.name, r.motivo, "WhatsApp", () => window.open(window.recitaWa ? window.recitaWa(p, r) : ("https://wa.me/" + (p.phone || "").replace(/\D/g, "")), "_blank", "noopener")))}
          {showOtros && wa.map(m => row("w" + m.id, "#1F8A5B", ICb, m.name + " escribió por WhatsApp", "\u201c" + m.msg + "\u201d · " + m.ago, "Responder", () => window.open("https://wa.me/" + (D ? D.wa : ""), "_blank", "noopener")))}
          {showOtros && biz.map(b => row("b" + b.id, T.accent, ICc, b.name + " comentó en " + b.net, "\u201c" + b.msg + "\u201d · " + b.ago, "Ver", () => go("marketing")))}
          {showOtros && tasks.map(t => row("t" + t.id, T.accent, ICk, "Pendiente del equipo", t.text, null, null))}
        </div>
        <button onClick={() => go("pendientes")} style={{ flexShrink: 0, padding: "13px", textAlign: "center", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.accent, background: T.surface, border: "none", borderTop: "1px solid " + T.line, cursor: "pointer" }}>Abrir Pendientes →</button>
      </div>
    </>
  );
}

/* ─────────── RESUMEN ─────────── */
function Resumen({ T, D, A, appts, patients, go, updateAppt, removeAppt, themeKey, setThemeKey }) {
  const now = new Date();
  const [edit, setEdit] = useState(null);
  // Estado REAL de Meta Ads: hay credenciales (token + cuenta) guardadas por la clínica.
  const metaConn = (() => { try { const c = (window.DB && window.DB.get("meta_creds")) || {}; return !!(c.token && c.account); } catch (e) { return false; } })();
  const [resModal, setResModal] = useState(null);
  const hoy = appts.filter(a => apptDayOff(a) === 0 && a.status !== "anulada").sort((a, b) => a.time.localeCompare(b.time));
  const next3 = appts.slice().sort((a, b) => (a.day - b.day) || a.time.localeCompare(b.time)).slice(0, 3);
  // Campañas REALES cacheadas desde Meta Ads (las llena Marketing). Sin demo.
  const camps = (() => { try { const s = window.DB && window.DB.get("campaigns"); if (Array.isArray(s)) return s.filter(c => c.real); } catch (e) {} return []; })();
  const reach = camps.reduce((s, c) => s + c.reach, 0), leads = camps.reduce((s, c) => s + c.leads, 0), spend = camps.reduce((s, c) => s + c.spend, 0);
  // Resumen semanal REAL: citas por día (lun→dom de la semana actual) y dinero cobrado. Sin demo.
  const wd = ["L", "M", "M", "J", "V", "S", "D"];
  const _wkBase = new Date(); _wkBase.setHours(0, 0, 0, 0);
  const _todayIdx = (_wkBase.getDay() + 6) % 7; // 0 = lunes
  const _wkMon = new Date(_wkBase); _wkMon.setDate(_wkBase.getDate() - _todayIdx);
  const _dk = dt => dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2);
  const _apptDayIdx = a => {
    let d = null; try { d = a.fecha ? new Date(a.fecha + "T00:00:00") : null; } catch (e) { d = null; }
    if (!d || isNaN(d)) { d = new Date(_wkBase); d.setDate(_wkBase.getDate() + (apptDayOff(a) || 0)); }
    d.setHours(0, 0, 0, 0); return Math.round((d - _wkMon) / 86400000);
  };
  const week = [0, 0, 0, 0, 0, 0, 0];
  let wkCitas = 0;
  (appts || []).forEach(a => {
    if (a.status === "anulada" || a.status === "cancelada") return;
    const di = _apptDayIdx(a);
    if (di >= 0 && di < 7) { week[di]++; wkCitas++; }
  });
  // Dinero REALMENTE cobrado esta semana (Caja: ingresos del lun→dom actual). Cifra real, no estimada.
  let wkMonto = 0;
  try {
    const _wkSun = new Date(_wkMon); _wkSun.setDate(_wkMon.getDate() + 6);
    const _mon = _dk(_wkMon), _sun = _dk(_wkSun);
    (window.cashMovimientos ? window.cashMovimientos() : []).forEach(m => {
      if (m.type === "ingreso" && m._day && m._day >= _mon && m._day <= _sun) wkMonto += (m.amount || 0);
    });
  } catch (e) {}
  const maxw = Math.max(1, week[0], week[1], week[2], week[3], week[4], week[5], week[6]);
  const sinCons = (window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter(p => !p.consent));
  const greet = now.getHours() < 13 ? "Buenos días" : now.getHours() < 20 ? "Buenas tardes" : "Buenas noches";
  return (
    <div>
      <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent }}>{greet}, {clinicDisplayName()}</div>
      <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 32, letterSpacing: "-.02em", color: T.text, marginTop: 8, lineHeight: 1.05 }}>{now.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" })}</h1>

      {/* Resumen semanal */}
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "18px 18px", marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Resumen semanal</div>
          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{wkCitas} {wkCitas === 1 ? "cita" : "citas"}{wkMonto > 0 ? " · " + D.fmt(wkMonto) + " cobrado" : ""}</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 84 }}>
          {week.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
              <div style={{ width: "100%", maxWidth: 26, height: (v / maxw * 60 + 4) + "px", background: i === _todayIdx ? T.accent : (T.dark ? "rgba(242,237,230,.18)" : "rgba(20,20,15,.14)"), borderRadius: 4 }} />
              <span style={{ fontFamily: T.sans, fontSize: 9.5, color: T.textMute }}>{wd[i]}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16, paddingTop: 16, borderTop: "1px solid " + T.lineSoft }}>
          <button onClick={() => setResModal("pacientes")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}><AdStat T={T} n={patients.length} l="Pacientes" /></button>
          <button onClick={() => setResModal("citas")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}><AdStat T={T} n={appts.length} l="Citas semana" /></button>
          <button onClick={() => setResModal("consent")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}><AdStat T={T} n={sinCons.length} l="Consent. pend." accent={sinCons.length > 0} /></button>
        </div>
      </div>

      {resModal && (() => {
        const cfg = {
          pacientes: { title: "Pacientes", rows: patients.map(p => ({ k: p.id, a: p.name, b: p.rut || p.phone || "" })) },
          citas: { title: "Citas de la semana", rows: appts.slice().sort((a, b) => apptDayOff(a) - apptDayOff(b) || (a.time || "").localeCompare(b.time || "")).map(a => ({ k: a.id, a: a.name, b: (apptDayOff(a) === 0 ? "Hoy " : "") + (a.time || "") + " · " + (a.proc || "") })) },
          consent: { title: "Consentimientos pendientes", rows: sinCons.map(p => ({ k: p.id, a: p.name, b: (p.tags && p.tags[0]) || "Paciente" })) }
        }[resModal];
        return (
          <AdModal T={T} title={cfg.title + " (" + cfg.rows.length + ")"} onClose={() => setResModal(null)} footer={<AdBtn T={T} primary full onClick={() => { setResModal(null); go(resModal === "citas" ? "agenda" : resModal === "consent" ? "pendientes" : "pacientes"); }}>Ir a la sección</AdBtn>}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {cfg.rows.length ? cfg.rows.map(r => (
                <div key={r.k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 2px", borderBottom: "1px solid " + T.lineSoft }}>
                  <Avatar T={T} name={r.a} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{r.a}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{r.b}</div>
                  </div>
                </div>
              )) : <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "16px 0" }}>Sin registros.</div>}
            </div>
          </AdModal>
        );
      })()}

      {/* Próximas 3 citas */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "24px 0 10px" }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>{"Próximas " + next3.length + " cita" + (next3.length !== 1 ? "s" : "")}</div>
        <button onClick={() => go("agenda")} style={linkBtn(T)}>Ver agenda →</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {next3.map(a => (
          <button key={a.id} onClick={() => setEdit(a)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer", textAlign: "left", width: "100%" }}>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontFamily: T.serif, fontSize: 19, color: T.text, lineHeight: 1 }}>{a.time}</div>
              <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, marginTop: 3 }}>{apptDayOff(a) === 0 ? "Hoy" : "Mañana"}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0, borderLeft: "1px solid " + T.line, paddingLeft: 13 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{a.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{a.proc}</div>
            </div>
            {a.comentario ? <AdTag T={T} tone="warn">{a.comentario}</AdTag> : null}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.6" style={{ flexShrink: 0 }}><path d="M9 18l6-6-6-6" /></svg>
          </button>
        ))}
      </div>

      {/* Agenda de hoy */}
      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, margin: "24px 0 10px" }}>Agenda de hoy</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {hoy.map(a => (
          <button key={a.id} onClick={() => setEdit(a)} style={{ display: "flex", gap: 14, padding: "11px 0", borderBottom: "1px solid " + T.lineSoft, background: "none", border: "none", borderBottom: "1px solid " + T.lineSoft, cursor: "pointer", textAlign: "left", width: "100%", alignItems: "center" }}>
            <div style={{ width: 46, fontFamily: T.serif, fontSize: 16, color: T.text }}>{a.time}</div>
            <div style={{ flex: 1, borderLeft: "1px solid " + T.line, paddingLeft: 13 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{a.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{a.proc}</div>
            </div>
            <AdTag T={T} tone={a.status === "confirmada" ? "ok" : "warn"}>{a.status === "confirmada" ? "OK" : "Pend."}</AdTag>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.6" style={{ flexShrink: 0 }}><path d="M9 18l6-6-6-6" /></svg>
          </button>
        ))}
        {hoy.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint, padding: "10px 0" }}>Sin citas hoy.</div>}
      </div>

      {/* Resumen Meta / anuncios */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "26px 0 10px" }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Resumen de Meta · Anuncios</div>
        <button onClick={() => go("marketing")} style={linkBtn(T)}>Marketing →</button>
      </div>
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: "#1877F2", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 16 }}>f</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text }}>Meta Ads · {camps.filter(c => c.active).length} campañas activas</div>
            <div style={{ fontFamily: T.sans, fontSize: 10, color: metaConn ? "#1F8A5B" : T.textMute, marginTop: 2 }}>{metaConn ? "● Conectado a Meta Ads" : "Sin conectar · conecta tu cuenta para ver datos reales"}</div>
          </div>
          <button onClick={() => go("integraciones")} style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", padding: "8px 12px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", background: metaConn ? "transparent" : "#1877F2", color: metaConn ? "#1F8A5B" : "#fff", border: metaConn ? "1px solid #1F8A5B" : "none" }}>{metaConn ? "Administrar" : "Conectar"}</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
          <AdStat T={T} n={(reach / 1000).toFixed(1) + "k"} l="Alcance" />
          <AdStat T={T} n={leads} l="Leads" />
          <AdStat T={T} n={D.fmt(spend)} l="Inversión" />
        </div>
        {camps.slice(0, 3).map(c => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderTop: "1px solid " + T.lineSoft }}>
            <div>
              <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{c.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute }}>{c.net} · {c.leads} leads</div>
            </div>
            <AdTag T={T} tone={c.active ? "ok" : "muted"}>{c.active ? "Activa" : "Pausada"}</AdTag>
          </div>
        ))}
      </div>
      {edit && <CitaEditModal T={T} appt={edit} patients={patients} onClose={() => setEdit(null)} onSave={(patch) => { updateAppt(edit.id, patch); setEdit(null); }} onCancel={() => { removeAppt(edit.id); setEdit(null); }} />}
    </div>
  );
}
function linkBtn(T) { return { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, background: "none", border: "none", cursor: "pointer", padding: 0 }; }

function AdStat({ T, n, l, accent }) {
  return <div style={{ background: accent ? "rgba(192,40,90,.08)" : (T.dark ? "rgba(242,237,230,.03)" : "rgba(20,20,15,.02)"), border: "1px solid " + (accent ? "rgba(192,40,90,.4)" : T.line), borderRadius: 8, padding: "14px 8px", textAlign: "center" }}>
    <div style={{ fontFamily: T.serif, fontSize: 26, color: accent ? "#C0285A" : T.text, lineHeight: 1 }}>{n}</div>
    <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, marginTop: 7 }}>{l}</div>
  </div>;
}

/* ─────────── AGENDA (tiempo real) ─────────── */
const HPX = 70, OPEN = 480, CLOSE = 1200;
const OWNER_WA = "56997880877";
const wdN = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function notifyCita(appt, patient, D) {
  const fecha = appt.fecha || "";
  const cli = (patient && patient.phone) ? patient.phone : (appt.phone || "");
  const lines = [];
  lines.push("📱 WhatsApp al paciente" + (cli ? " (" + cli + ")" : ""));
  lines.push("📱 WhatsApp a ti (+" + OWNER_WA + ")");
  lines.push("✉️ Correo de confirmación" + (appt.email ? " (" + appt.email + ")" : ""));
  return { lines, cli };
}

function Toast({ T, data, onClose }) {
  useEffect(() => { const id = setTimeout(onClose, 6000); return () => clearTimeout(id); }, []);
  return (
    <div style={{ position: "absolute", left: "50%", bottom: 22, transform: "translateX(-50%)", zIndex: 55, width: "min(360px, calc(100% - 32px))", background: T.dark ? "#16170f" : "#fff", border: "1px solid " + T.line, borderRadius: 12, boxShadow: "0 18px 50px -16px rgba(0,0,0,.5)", padding: "16px 18px", animation: "jcSlideUp .3s " + T.ease }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#1F8A5B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text }}>Cita creada · notificaciones enviadas</div>
      </div>
      {data.lines.map((l, i) => <div key={i} style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, padding: "3px 0" }}>{l}</div>)}
      {data.cli && <a href={"https://wa.me/" + data.cli.replace(/\D/g, "")} target="_blank" rel="noopener" style={{ display: "inline-block", marginTop: 10, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#1F8A5B", textDecoration: "none", border: "1px solid #1F8A5B", borderRadius: 999, padding: "8px 14px" }}>Abrir WhatsApp del paciente →</a>}
    </div>
  );
}

function procInitial(proc) {
  if (!proc) return "";
  const n = proc.toLowerCase();
  if (/botox|toxina|btx|tox\b/.test(n))              return "B";
  if (/rino/.test(n))                                  return "R";
  if (/sculptra|bioestim|col[aá]geno/.test(n))         return "S";
  if (/lipol[ií]t|disolver|lipolisis/.test(n))         return "L";
  if (/evaluac/.test(n))                               return "Ev";
  if (/mesoterap|vitamina|nctf|rejuran|salm[oó]n/.test(n)) return "M";
  if (/hialur|armoniz|juv[eé]derm/.test(n))            return "H";
  if (/quemador|grasa/.test(n))                         return "Q";
  if (/plasma|prp/.test(n))                             return "P";
  if (/control/.test(n))                                return "C";
  return proc.trim().charAt(0).toUpperCase();
}

function ApptBlock({ T, a, onClick, compact }) {
  const st = jcmApptState(a, T);
  const ini = procInitial(a.proc);
  const nameLabel = ini ? a.name + " • " + ini : a.name;
  return (
    <div data-appt onClick={e => { e.stopPropagation(); onClick(a); }} style={{ cursor: "pointer", background: T.surface2, border: "1px solid " + st.color + "66", borderLeft: "3px solid " + st.color, borderRadius: 6, padding: compact ? "5px 7px" : "8px 11px", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
        <span style={{ fontFamily: T.sans, fontSize: compact ? 10.5 : 12.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nameLabel}</span>
        {!compact && <span style={{ fontFamily: T.sans, fontSize: 11, color: st.color, flexShrink: 0 }}>{a.time}</span>}
      </div>
      <div style={{ fontFamily: T.sans, fontSize: compact ? 9 : 10.5, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{compact ? a.time + " · " + a.proc : a.proc}</div>
      {!compact && st.key !== "pendiente" && <div style={{ marginTop: 4, display: "inline-block", fontFamily: T.sans, fontSize: 9, fontWeight: 600, letterSpacing: ".04em", color: st.color, background: st.color + "1a", borderRadius: 5, padding: "2px 6px" }}>{st.label}</div>}
    </div>
  );
}

function ICSImportModal({ T, onClose, onImport }) {
  const [step, setStep] = useState(1);
  const [rows, setRows] = useState([]);
  const [drag, setDrag] = useState(false);

  function parseICS(text) {
    const unfolded = text.replace(/\r\n[ \t]/g, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const events = [];
    const blocks = unfolded.split(/BEGIN:VEVENT/i);
    blocks.slice(1).forEach(function(block) {
      const endIdx = block.search(/END:VEVENT/i);
      if (endIdx < 0) return;
      const ev = {};
      block.substring(0, endIdx).split("\n").forEach(function(line) {
        const ci = line.indexOf(":");
        if (ci < 0) return;
        const key = line.substring(0, ci).split(";")[0].toUpperCase();
        const val = line.substring(ci + 1).trim();
        if (key === "DTSTART") ev.dtstart = val;
        else if (key === "DTEND") ev.dtend = val;
        else if (key === "SUMMARY") ev.summary = val.replace(/\\,/g, ",").replace(/\\n/g, " ").replace(/\\/g, "");
        else if (key === "DESCRIPTION") ev.description = val.replace(/\\n/g, " ").replace(/\\,/g, ",").replace(/\\/g, "");
      });
      if (ev.dtstart && ev.summary) events.push(ev);
    });
    events.sort(function(a, b) { return (a.dtstart || "").localeCompare(b.dtstart || ""); });
    return events;
  }

  function parseDate(dtStr) {
    if (!dtStr) return { fecha: "", hora: "10:00" };
    const clean = dtStr.replace(/Z$/, "").replace(/[^0-9T]/g, "");
    const parts = clean.split("T");
    const dp = parts[0] || "";
    const tp = parts[1] || "";
    const fecha = dp.length >= 8 ? dp.slice(0,4) + "-" + dp.slice(4,6) + "-" + dp.slice(6,8) : "";
    const hora = tp.length >= 4 ? tp.slice(0,2) + ":" + tp.slice(2,4) : "10:00";
    return { fecha, hora };
  }

  function handleFile(file) {
    if (!file || !/\.ics$/i.test(file.name)) {
      window.jcmToast && window.jcmToast("Selecciona un archivo .ics del calendario.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      const evs = parseICS(e.target.result);
      if (!evs.length) { window.jcmToast && window.jcmToast("No se encontraron eventos en el archivo.", "error"); return; }
      setRows(evs.map(function(ev) {
        const { fecha, hora } = parseDate(ev.dtstart);
        return { sel: true, fecha, hora, name: ev.summary || "", proc: "", nota: ev.description || "", _src: ev.summary || "" };
      }));
      setStep(2);
    };
    reader.readAsText(file, "UTF-8");
  }

  function upd(i, field, val) {
    setRows(function(rs) { return rs.map(function(r, idx) { return idx === i ? Object.assign({}, r, { [field]: val }) : r; }); });
  }

  function doImport() {
    const sel = rows.filter(function(r) { return r.sel && r.fecha; });
    if (!sel.length) { window.jcmToast && window.jcmToast("Selecciona al menos una cita.", "error"); return; }
    sel.forEach(function(r) {
      onImport({ name: r.name || "Sin nombre", proc: r.proc || r._src || "Cita importada", fecha: r.fecha, time: r.hora || "10:00", comentario: r.nota || "", status: "pendiente", importadoICS: true });
    });
    window.jcmToast && window.jcmToast(sel.length + " cita(s) importadas desde el calendario.", "ok");
    onClose();
  }

  const selCount = rows.filter(function(r) { return r.sel; }).length;
  const inp = { fontFamily: T.sans, fontSize: 12, color: T.text, background: T.bg, border: "1px solid " + T.line, borderRadius: 6, padding: "4px 7px" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(0,0,0,.65)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: T.surface, borderRadius: 20, width: "100%", maxWidth: step === 2 ? 720 : 440, maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 28px 70px rgba(0,0,0,.55)" }}>
        <div style={{ padding: "22px 22px 16px", display: "flex", alignItems: "flex-start", gap: 12, borderBottom: "1px solid " + T.line }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text }}>Importar desde calendario</div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 3 }}>
              {step === 1 ? "Sube un archivo .ics exportado desde iPhone, iCloud, Google Calendar u otro." : rows.length + " evento(s) encontrados — revisa y confirma cuales importar"}
            </div>
          </div>
          <button onClick={onClose} style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 9, border: "1px solid " + T.line, background: "none", color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {step === 1 && (
          <div style={{ padding: "22px" }}>
            <div style={{ background: T.bg, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px", marginBottom: 18 }}>
              <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text, marginBottom: 6 }}>Como exportar desde iPhone</div>
              <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.65 }}>
                1. Abre <strong>iCloud.com</strong> en Safari o Chrome<br />
                2. Ve a <strong>Calendario</strong> y selecciona tu calendario<br />
                3. Toca el icono de compartir y elige <strong>Exportar .ics</strong><br />
                4. Descarga el archivo y subelo aqui
              </div>
            </div>
            <div
              onDragOver={function(e) { e.preventDefault(); setDrag(true); }}
              onDragLeave={function() { setDrag(false); }}
              onDrop={function(e) { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              onClick={function() { document.getElementById("jcm-ics-input").click(); }}
              style={{ border: "2px dashed " + (drag ? T.accent : T.line), borderRadius: 14, padding: "40px 20px", textAlign: "center", cursor: "pointer", transition: "border-color .2s, background .2s", background: drag ? T.accent + "0c" : "transparent" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={drag ? T.accent : T.textMute} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text }}>Arrastra el archivo .ics aqui</div>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 4 }}>o haz clic para seleccionarlo</div>
            </div>
            <input id="jcm-ics-input" type="file" accept=".ics" style={{ display: "none" }} onChange={function(e) { if (e.target.files[0]) handleFile(e.target.files[0]); }} />
          </div>
        )}

        {step === 2 && (
          <>
            <div style={{ padding: "12px 22px 8px", display: "flex", alignItems: "center", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 12, color: T.textMute, cursor: "pointer" }}>
                <input type="checkbox" checked={selCount === rows.length} onChange={function(e) { setRows(function(rs) { return rs.map(function(r) { return Object.assign({}, r, { sel: e.target.checked }); }); }); }} />
                Seleccionar todas
              </label>
              <div style={{ marginLeft: "auto", fontFamily: T.sans, fontSize: 12, color: T.accent, fontWeight: 600 }}>{selCount} seleccionadas</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 22px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>{["", "Fecha", "Hora", "Nombre paciente", "Procedimiento", "Nota"].map(function(h, i) {
                    return <th key={i} style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: T.textFaint, padding: "8px 5px", textAlign: "left", borderBottom: "1px solid " + T.line, whiteSpace: "nowrap" }}>{h}</th>;
                  })}</tr>
                </thead>
                <tbody>
                  {rows.map(function(r, i) {
                    return (
                      <tr key={i} style={{ opacity: r.sel ? 1 : 0.4, borderBottom: "1px solid " + T.line + "55" }}>
                        <td style={{ padding: "8px 5px" }}><input type="checkbox" checked={r.sel} onChange={function(e) { upd(i, "sel", e.target.checked); }} /></td>
                        <td style={{ padding: "8px 5px" }}><input type="date" value={r.fecha} onChange={function(e) { upd(i, "fecha", e.target.value); }} style={Object.assign({}, inp, { width: 130 })} /></td>
                        <td style={{ padding: "8px 5px" }}><input type="time" value={r.hora} onChange={function(e) { upd(i, "hora", e.target.value); }} style={Object.assign({}, inp, { width: 82 })} /></td>
                        <td style={{ padding: "8px 5px" }}><input value={r.name} onChange={function(e) { upd(i, "name", e.target.value); }} placeholder="Nombre del paciente" style={Object.assign({}, inp, { width: 160 })} /></td>
                        <td style={{ padding: "8px 5px" }}><input value={r.proc} onChange={function(e) { upd(i, "proc", e.target.value); }} placeholder={r._src || "Procedimiento"} style={Object.assign({}, inp, { width: 150 })} /></td>
                        <td style={{ padding: "8px 5px" }}><span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, display: "block", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={r.nota}>{r.nota || "—"}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "14px 22px", borderTop: "1px solid " + T.line, display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <AdBtn T={T} onClick={function() { setStep(1); }}>Otro archivo</AdBtn>
              <AdBtn T={T} primary onClick={doImport}>Importar {selCount} cita(s)</AdBtn>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Agenda({ T, appts, patients, addAppt, addPatient, updateAppt, removeAppt, onOpenPatient, onSyncWeb }) {
  const [webBusy, setWebBusy] = useState(false);
  function traerWeb() {
    if (webBusy || !onSyncWeb) return;
    setWebBusy(true);
    Promise.resolve(onSyncWeb()).then(function (r) {
      if (!r || !r.ok) { window.jcmToast && window.jcmToast("No se pudieron traer las reservas: " + ((r && r.reason) || "error") + ".", "error"); }
      else if (r.added > 0) window.jcmToast && window.jcmToast(r.added + " reserva(s) web traída(s) a la agenda.", "ok");
      else if (r.pending > 0) window.jcmToast && window.jcmToast(r.pending + " reserva(s) en la nube, ya estaban en la agenda.", "info");
      else window.jcmToast && window.jcmToast("No hay reservas web nuevas en la nube. Si acabas de agendar y no llega, es la escritura desde el link público (App Check / dominio).", "info");
    }).catch(function () { window.jcmToast && window.jcmToast("Error al traer las reservas.", "error"); })
      .then(function () { setWebBusy(false); });
  }
  const [view, setView] = useState("semana");
  const [day, setDay] = useState(0);
  const [nueva, setNueva] = useState(null);
  const [edit, setEdit] = useState(null);
  const [toast, setToast] = useState(null);
  const [hoverA, setHoverA] = useState(null); // { a, x, y } · vista previa al pasar el cursor (vista día/lista)
  const [fichaConfirm, setFichaConfirm] = useState(null); // { appt, patient|null }
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(id); }, []);
  // Scroll al tope al montar (evita que al navegar se quede en la posición anterior).
  useEffect(() => { const el = document.getElementById("jcm-main-scroll"); if (el) el.scrollTop = 0; }, []);
  const D = window.JCDATA;
  const list = appts.filter(a => apptDayOff(a) === day && a.status !== "anulada");
  // Citas anuladas agrupadas por fecha de cita (no por fecha de anulación).
  const anuladas = appts.filter(a => a.status === "anulada").sort((a, b) => (b.anuladaAt || 0) - (a.anuladaAt || 0));
  const anuladasByDay = anuladas.reduce((acc, a) => { const k = a.fecha || "sin-fecha"; (acc[k] = acc[k] || []).push(a); return acc; }, {});
  const anuladaDayKeys = Object.keys(anuladasByDay).sort().reverse();
  const [openADays, setOpenADays] = useState(() => new Set(anuladaDayKeys.slice(0, 1)));
  function toggleADay(k) { setOpenADays(prev => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n; }); }
  function fmtADay(fechaStr) {
    if (!fechaStr || fechaStr === "sin-fecha") return "Sin fecha";
    try {
      const today = new Date(); today.setHours(0,0,0,0);
      const d = new Date(fechaStr + "T00:00:00"); d.setHours(0,0,0,0);
      const diff = Math.round((d - today) / 86400000);
      if (diff === 0) return "Hoy, " + d.toLocaleDateString("es-CL", { day: "numeric", month: "short" });
      if (diff === -1) return "Ayer, " + d.toLocaleDateString("es-CL", { day: "numeric", month: "short" });
      return d.toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "short", year: d.getFullYear() !== today.getFullYear() ? "numeric" : undefined });
    } catch (e) { return fechaStr; }
  }
  // Apila citas solapadas en la vista lista
  const listStacked = (() => {
    const sorted = [...list].sort((a, b) => mins(a.time) - mins(b.time));
    let cur = -1;
    return sorted.map(a => {
      const dur = parseInt(a.dur) || 60;
      const fullH = Math.max(28, dur * HPX / 60);
      const nat = (mins(a.time) - OPEN) * HPX / 60;
      const pushed = cur >= 0 && nat < cur;
      const top = pushed ? cur + 2 : nat;
      const h = pushed ? Math.max(28, Math.min(fullH, 36)) : fullH;
      cur = top + h;
      return { ...a, _top: top, _h: h };
    });
  })();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const showNow = day === 0 && nowMin >= OPEN && nowMin <= CLOSE;
  const hours = []; for (let h = OPEN / 60; h < CLOSE / 60; h++) hours.push(h);
  const week = []; const b0 = new Date(); for (let off = 0; off < 7; off++) { const dt = new Date(b0); dt.setDate(b0.getDate() + off); week.push({ off, dd: dt.getDate(), wd: wdN[dt.getDay()], lbl: off === 0 ? "Hoy" : off === 1 ? "Mañana" : wdN[dt.getDay()], count: appts.filter(a => apptDayOff(a) === off && a.status !== "anulada").length }); }

  function clickTimeline(e) {
    if (e.target.closest("[data-appt]")) return;
    const r = e.currentTarget.getBoundingClientRect();
    let m = OPEN + Math.round(((e.clientY - r.top) / HPX * 60) / 15) * 15;
    m = Math.max(OPEN, Math.min(CLOSE - 30, m));
    setNueva({ time: Math.floor(m / 60).toString().padStart(2, "0") + ":" + (m % 60).toString().padStart(2, "0"), day, fromSlot: true });
  }
  function onCreate(a) {
    addAppt(a);
  }
  const tabBtn = (k, l) => <button onClick={() => setView(k)} style={{ flex: 1, fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", padding: "10px", borderRadius: 7, cursor: "pointer", background: view === k ? T.text : "transparent", color: view === k ? T.bg : T.textMute, border: "none" }}>{l}</button>;

  // Cabecera colapsada a una sola línea para TODAS las clínicas (el toggle de vista y
  // "+ Nueva Cita" se inyectan dentro de la barra de la semana, SemanaGrid).
  const isBase = true;
  const viewToggleNode = (
    <div style={{ display: "inline-flex", gap: 4, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: 4 }}>
      <button onClick={() => setView("dia")} title="Vista lista / día" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 32, borderRadius: 7, cursor: "pointer", border: "none", background: view === "dia" ? T.accent : "transparent", color: view === "dia" ? (T.onAccent || "#fff") : T.textMute }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
      </button>
      <button onClick={() => setView("semana")} title="Vista calendario / semana" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 32, borderRadius: 7, cursor: "pointer", border: "none", background: view === "semana" ? T.accent : "transparent", color: view === "semana" ? (T.onAccent || "#fff") : T.textMute }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
      </button>
    </div>
  );
  const [icsMod, setIcsMod] = useState(false);
  const nuevaBtnNode = <AdBtn T={T} primary onClick={() => setNueva({ time: "10:00", day: view === "dia" ? day : 0 })}>+ Nueva Cita</AdBtn>;
  const icsBtnNode = (
    <button onClick={() => setIcsMod(true)} title="Importar citas desde archivo de calendario (.ics)"
      style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 13px", border: "1px solid " + T.line, background: T.surface, borderRadius: 9, fontFamily: T.sans, fontSize: 12, color: T.textMute, cursor: "pointer", whiteSpace: "nowrap" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4M12 14l-2 2 2 2M12 14h4" /></svg>
      Importar .ics
    </button>
  );

  return (
    <div>
      {/* Cabecera grande: solo en clínicas que NO son la base (v2 la colapsa a una línea en SemanaGrid). */}
      {!isBase && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 28, letterSpacing: "-.02em", color: T.text, margin: 0 }}>Reservas y Citas</h1>
            <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 2 }}>Gestiona la agenda de la clínica, confirma asistencias y asigna puntos.</div>
          </div>
          {viewToggleNode}
          {onSyncWeb && <AdBtn T={T} onClick={traerWeb}>{webBusy ? "Trayendo…" : "↻ Traer reservas web"}</AdBtn>}
          {nuevaBtnNode}
        </div>
      )}
      {/* En v2 (lista), una mini-barra superior con el toggle + Nueva cita (la semana ya los lleva inline). */}
      {isBase && view === "dia" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, fontFamily: T.serif, fontSize: 18, color: T.text }}>Reservas y Citas</div>
          {viewToggleNode}
          {icsBtnNode}
          {nuevaBtnNode}
        </div>
      )}

      {view === "semana" ? (
        <SemanaGrid T={T} week={week} appts={appts} viewToggle={viewToggleNode} nuevaBtn={nuevaBtnNode} icsBtn={icsBtnNode} onNew={(off, time) => setNueva({ time, day: off, fromSlot: true })} onEdit={setEdit} updateAppt={updateAppt} removeAppt={removeAppt} onDay={(off) => { setDay(off); setView("dia"); }} onVerFicha={(appt) => {
          const clean = s => (s || "").replace(/\D/g, "");
          const ap = clean(appt.phone || "");
          let found = null;
          if (ap.length >= 8) found = (patients || []).find(x => { const xp = clean(x.phone || ""); return xp.length >= 8 && (xp.slice(-8) === ap.slice(-8)); });
          if (!found) { const an = (appt.name || "").toLowerCase().trim(); found = (patients || []).find(x => { const xn = (x.name || "").toLowerCase(); return xn === an || (an.length >= 4 && (xn.startsWith(an.split(" ")[0]) || an.startsWith(xn.split(" ")[0]))); }); }
          setFichaConfirm({ appt, patient: found || null });
        }} />
      ) : (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
            {week.map(d => (
              <button key={d.off} onClick={() => setDay(d.off)} style={{ flexShrink: 0, minWidth: 62, padding: "10px 10px", borderRadius: 10, cursor: "pointer", textAlign: "center", background: day === d.off ? T.accent : T.surface, border: "1px solid " + (day === d.off ? T.accent : T.line) }}>
                <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase", color: day === d.off ? T.onAccent : T.textMute }}>{d.lbl}</div>
                <div style={{ fontFamily: T.serif, fontSize: 20, color: day === d.off ? T.onAccent : T.text, marginTop: 2 }}>{d.dd}</div>
                <div style={{ height: 5, marginTop: 5, display: "flex", justifyContent: "center", gap: 2 }}>
                  {d.count > 0 && Array.from({ length: Math.min(d.count, 3) }).map((_, i) => <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: day === d.off ? T.onAccent : T.accent }} />)}
                </div>
              </button>
            ))}
          </div>
          <div onClick={clickTimeline} style={{ position: "relative", height: hours.length * HPX, borderTop: "1px solid " + T.line, cursor: "copy" }}>
            {hours.map((h, i) => (
              <div key={h} style={{ position: "absolute", top: i * HPX, left: 0, right: 0, height: HPX, borderBottom: "1px solid " + T.lineSoft }}>
                <div style={{ position: "absolute", left: 0, top: -8, fontFamily: T.sans, fontSize: 10, color: T.textFaint, width: 42 }}>{h}:00</div>
              </div>
            ))}
            {listStacked.map(a => (
              <div key={a.id} style={{ position: "absolute", left: 48, right: 4, top: a._top, height: a._h }}
                onMouseEnter={e => { const r = e.currentTarget.getBoundingClientRect(); setHoverA({ a, x: Math.min(r.right + 8, window.innerWidth - 250), y: Math.min(r.top, window.innerHeight - 180) }); }}
                onMouseLeave={() => setHoverA(null)}>
                <ApptBlock T={T} a={a} onClick={(x) => { setHoverA(null); setEdit(x); }} />
              </div>
            ))}
            {showNow && (
              <div style={{ position: "absolute", left: 42, right: 0, top: (nowMin - OPEN) * HPX / 60, height: 0, borderTop: "2px solid #C0285A", zIndex: 5, pointerEvents: "none" }}>
                <span style={{ position: "absolute", left: 0, top: -7, width: 8, height: 8, borderRadius: "50%", background: "#C0285A" }} />
                <span style={{ position: "absolute", right: 2, top: -16, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", color: "#C0285A", textTransform: "uppercase" }}>Ahora {fmtTime(now)}</span>
              </div>
            )}
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 12 }}>Toca un espacio libre para crear una cita · toca una cita para editarla.</p>
        </div>
      )}

      {/* Citas anuladas: agrupadas por día, desplegables. */}
      {anuladas.length > 0 && (
        <div style={{ marginTop: 22, background: T.surface, border: "1px solid " + T.line, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px 10px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#9AA0A6", flexShrink: 0 }} />
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.textMute }}>Citas anuladas ({anuladas.length})</div>
            <div style={{ marginLeft: "auto", fontFamily: T.sans, fontSize: 11, color: T.textFaint }}>Restaura si fue un error</div>
          </div>
          {anuladaDayKeys.map((k, ki) => {
            const group = anuladasByDay[k];
            const isOpen = openADays.has(k);
            return (
              <div key={k} style={{ borderTop: ki === 0 ? "1px solid " + T.lineSoft : "1px solid " + T.lineSoft }}>
                {/* Cabecera del día — clic para desplegar/colapsar */}
                <button onClick={() => toggleADay(k)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, transition: "transform .2s", transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}><path d="M6 9l6 6 6-6" /></svg>
                  <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.textMute, flex: 1 }}>{fmtADay(k)}</span>
                  <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, background: T.lineSoft, borderRadius: 999, padding: "2px 8px" }}>{group.length} cita{group.length !== 1 ? "s" : ""}</span>
                </button>
                {/* Lista de citas del día */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid " + T.lineSoft }}>
                    {group.map((a, ai) => (
                      <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px", borderBottom: ai < group.length - 1 ? "1px solid " + T.lineSoft : "none", background: T.bg }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.textMute, textDecoration: "line-through", textDecorationColor: "#9AA0A6" }}>{a.name}</div>
                          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{[a.proc, a.time && (a.time + " h")].filter(Boolean).join("  ·  ")}{a.phone ? "  ·  " + a.phone : ""}</div>
                          {a.anuladaAt && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 2 }}>Anulada el {new Date(a.anuladaAt).toLocaleDateString("es-CL", { day: "numeric", month: "short" })} · {new Date(a.anuladaAt).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}</div>}
                        </div>
                        <button onClick={() => updateAppt(a.id, { status: "pendiente", anuladaAt: null })} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 11px", cursor: "pointer" }}>Restaurar</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {icsMod && <ICSImportModal T={T} onClose={() => setIcsMod(false)} onImport={addAppt} />}
      {nueva && <NewCitaModal T={T} patients={patients} addPatient={addPatient} appts={appts} time={nueva.time} day={nueva.day} prefill={nueva.fromSlot ? { time: nueva.time, day: nueva.day } : undefined} onClose={() => setNueva(null)} onSave={onCreate} onOpenPatient={onOpenPatient} addAppt={addAppt} />}
      {edit && <CitaEditModal T={T} appt={edit} patients={patients} onClose={() => setEdit(null)} onSave={(patch) => { updateAppt(edit.id, patch); setEdit(null); }} onCancel={() => { removeAppt(edit.id); setEdit(null); }} />}
      {toast && <Toast T={T} data={toast} onClose={() => setToast(null)} />}
      {fichaConfirm && (
        <div onMouseDown={e => { if (e.target === e.currentTarget) setFichaConfirm(null); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.48)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: T.bg, borderRadius: 16, padding: 24, maxWidth: 390, width: "100%", boxShadow: "0 24px 60px -18px rgba(0,0,0,.5)", border: "1px solid " + T.line }}>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Ir a ficha del paciente</div>
            <div style={{ marginBottom: 14, padding: "12px 14px", background: T.surface, borderRadius: 10, border: "1px solid " + T.line }}>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 3 }}>Cita agendada</div>
              <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>{fichaConfirm.appt.name}</div>
              {fichaConfirm.appt.phone && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute }}>{fichaConfirm.appt.phone}</div>}
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute }}>{fichaConfirm.appt.proc}</div>
            </div>
            {fichaConfirm.patient ? (
              <div style={{ marginBottom: 18, padding: "12px 14px", background: "rgba(31,138,91,.08)", borderRadius: 10, border: "1px solid rgba(31,138,91,.28)" }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, color: "#1F8A5B", marginBottom: 4 }}>✓ Paciente encontrado</div>
                <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>{fichaConfirm.patient.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>{[fichaConfirm.patient.phone, fichaConfirm.patient.rut].filter(Boolean).join(" · ")}</div>
              </div>
            ) : (
              <div style={{ marginBottom: 18, padding: "12px 14px", background: "rgba(192,40,90,.07)", borderRadius: 10, border: "1px solid rgba(192,40,90,.22)" }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, color: "#C0285A", marginBottom: 3 }}>Sin ficha registrada</div>
                <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text, marginBottom: 0 }}>No existe una ficha para este paciente. Puedes crearla ahora con los datos de la cita.</div>
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setFichaConfirm(null)} style={{ flex: 1, fontFamily: T.sans, fontSize: 13, fontWeight: 500, padding: "11px", borderRadius: 8, cursor: "pointer", background: T.surface, color: T.textMute, border: "1px solid " + T.line }}>Cancelar</button>
              {fichaConfirm.patient
                ? <button onClick={() => { if (onOpenPatient) onOpenPatient(fichaConfirm.patient.id); setFichaConfirm(null); }} style={{ flex: 1, fontFamily: T.sans, fontSize: 13, fontWeight: 600, padding: "11px", borderRadius: 8, cursor: "pointer", background: T.accent, color: T.onAccent || "#fff", border: "none" }}>Ir a ficha</button>
                : <button onClick={() => {
                    const a = fichaConfirm.appt;
                    const np = addPatient({ name: (a.name || "").trim(), phone: (a.phone || "").trim(), rut: (a.rut || "").trim(), email: (a.email || "").trim(), age: 0 });
                    if (np && np.id && onOpenPatient) onOpenPatient(np.id);
                    setFichaConfirm(null);
                  }} style={{ flex: 2, fontFamily: T.sans, fontSize: 13, fontWeight: 600, padding: "11px", borderRadius: 8, cursor: "pointer", background: T.accent, color: T.onAccent || "#fff", border: "none" }}>Crear ficha ahora</button>
              }
            </div>
          </div>
        </div>
      )}
      {/* Vista previa momentánea al pasar el cursor sobre una cita (vista día/lista) */}
      {hoverA && hoverA.a && !edit && (() => {
        const a = hoverA.a, isPP = a.status === "pendiente_pago";
        const _hs2 = jcmApptState(a, T); const ac = _hs2.color, estado = _hs2.label;
        return (
          <div style={{ position: "fixed", left: hoverA.x, top: hoverA.y, zIndex: 90, width: 232, background: T.bg, border: "1px solid " + T.line, borderLeft: "3px solid " + ac, borderRadius: 10, boxShadow: "0 18px 44px -14px rgba(0,0,0,.5)", padding: "12px 14px", pointerEvents: "none", animation: "jcFade .14s ease" }}>
            <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text, marginBottom: 8 }}>{a.name}</div>
            {[["Hora", a.time], ["Duración", (parseInt(a.dur) || 60) + " min"], ["Procedimiento", a.proc || "—"], ["Estado", estado]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "3px 0", fontFamily: T.sans, fontSize: 11.5 }}>
                <span style={{ color: T.textMute }}>{k}</span>
                <span style={{ color: T.text, fontWeight: 500, textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

const PROC_LIST = () => { const D = window.JCDATA; const p = []; D.catalog.forEach(s => s.groups.forEach(g => g.items.forEach(it => p.push(it.n)))); return p; };
// Genera <optgroup> agrupando los procedimientos por su categoría (desde los servicios de la clínica).
function procOptionsByCat(names) {
  const catOf = {};
  try { (window.clinicServiceList ? window.clinicServiceList() : []).forEach(s => { if (s && s.name) catOf[s.name] = s.cat || "Otros"; }); } catch (e) {}
  const byCat = {};
  (names || []).forEach(n => { const c = catOf[n] || "Otros"; (byCat[c] = byCat[c] || []).push(n); });
  return Object.keys(byCat).sort().map(c => React.createElement("optgroup", { key: c, label: c }, byCat[c].map(n => React.createElement("option", { key: n, value: n }, n))));
}
const selS = T => ({ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" });
const lblS = T => ({ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 });
// Slots de 30 min usados en el panel (8:00–19:30)
const ADMIN_HALF_HOURS = (() => { const s = []; for (let h = 8; h <= 20; h++) { s.push((h<10?"0":"")+h+":00"); s.push((h<10?"0":"")+h+":30"); } return s; })();
// Slots cada 15 min para agendar (permite citas de 15/45 min: p.ej. agendar a las 17:15 tras una de 15 min).
const ADMIN_QUARTER_HOURS = (() => { const s = []; for (let h = 8; h <= 20; h++) { ["00", "15", "30", "45"].forEach(m => s.push((h < 10 ? "0" : "") + h + ":" + m)); } return s; })();
// Granularidad de la agenda: 15 min solo para JC Medical (clínica base / modo local); 30 min para el resto.
function adminSlotMins() { try { return (typeof clinicSeeded === "function" && clinicSeeded()) ? 15 : 30; } catch (e) { return 30; } }
function adminSlots() { return adminSlotMins() === 15 ? ADMIN_QUARTER_HOURS : ADMIN_HALF_HOURS; }

// Estado de una cita → etiqueta + color (estilo Medilink). "pendiente" usa el acento del tema.
function jcmApptState(a, T) {
  a = a || {};
  if (a.status === "anulada" || a.status === "cancelada") return { key: "anulada", label: "Anulada", color: "#9AA0A6" };
  if (a.status === "no_asistio") return { key: "no_asistio", label: "No asistió", color: "#C0285A" };
  if (a.status === "atendiendose") return { key: "atendiendose", label: "Atendiéndose", color: "#1F8A5B" };
  if (a.attended || a.status === "atendida") return { key: "atendida", label: "Atendida", color: "#1A50A3" };
  if (a.status === "en_sala") return { key: "en_sala", label: "En sala de espera", color: "#0E7490" };
  if (a.status === "pendiente_pago") return { key: "pendiente_pago", label: "⏳ Pago pendiente", color: "#B8860B" };
  if (a.status === "confirmada") return { key: "confirmada", label: "Confirmada", color: "#16A34A" };
  return { key: "pendiente", label: "Pendiente", color: (T && T.accent) || "#8A7E6B" };
}
if (typeof window !== "undefined") window.jcmApptState = jcmApptState;
function ComentarioPopup({ T, appt, updateAppt, onClose }) {
  const [txt, setTxt] = useState(appt.comentario || "");
  const save = () => { updateAppt(appt.id, { comentario: txt.trim() }); onClose(); };
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 94, background: "rgba(0,0,0,.38)" }} />
      <div onClick={e => e.stopPropagation()} style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 95, width: 340, background: T.bg, border: "1px solid " + T.line, borderRadius: 14, boxShadow: "0 24px 60px -16px rgba(0,0,0,.6)", padding: "22px 20px 18px", animation: "jcFade .16s ease" }}>
        <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text, marginBottom: 4 }}>{appt.name}</div>
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 14 }}>{appt.time} · {appt.proc || "Procedimiento"}</div>
        <div style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Comentario</div>
        <textarea value={txt} onChange={e => setTxt(e.target.value)} placeholder="Ej. Abona el día de la atención" rows={3} style={{ width: "100%", boxSizing: "border-box", background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "9px 11px", fontFamily: T.sans, fontSize: 13, color: T.text, resize: "vertical", outline: "none" }} autoFocus />
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={onClose} style={{ flex: 1, height: 36, borderRadius: 8, border: "1px solid " + T.line, background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 12.5, cursor: "pointer" }}>Cancelar</button>
          <button onClick={save} style={{ flex: 2, height: 36, borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Guardar comentario</button>
        </div>
      </div>
    </>
  );
}
function SemanaGrid({ T, week, appts, onNew, onEdit, updateAppt, removeAppt, onDay, onVerFicha, viewToggle, nuevaBtn, icsBtn }) {
  const D = window.JCDATA;
  const [wkOff, setWkOff] = useState(0);
  const [menu, setMenu] = useState(null); // appt id abierto
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [menuDayOff, setMenuDayOff] = useState(null);
  const [hover, setHover] = useState(null); // { a, x, y } · vista previa momentánea al pasar el cursor
  const [editCom, setEditCom] = useState(null); // appt para popup de comentario rápido
  const hideT = useRef(null); // retardo para poder mover el cursor de la cita al tooltip (acciones)
  // ── Nueva agenda (estilo Medilink barra) — ACTIVA PARA TODAS LAS CLÍNICAS ──
  // Semana lun→dom, profesional desplegable, hora a ambos lados, cabecera en una línea,
  // tarjeta hover con acciones. La única diferencia por clínica es la granularidad de la
  // agenda (15 min en JC Medical / 30 min en clínicas cliente), que la maneja adminSlotMins().
  const v2 = true;
  const activeAppt = menu ? appts.find(a => a.id === menu) : null;
  // Equipo de la clínica → desplegable de profesional (ver una agenda a la vez, sin "Todos").
  const team = (() => { try { var t = window.DB && DB.get("team"); if (Array.isArray(t) && t.length) return t; } catch (e) {} try { if (window.CADMIN && Array.isArray(CADMIN.team) && CADMIN.team.length) return CADMIN.team; } catch (e) {} return []; })();
  const multiProf = team.length >= 2; // solo se filtra cuando hay 2+ profesionales
  const firstProf = team[0] ? team[0].name : "";
  const [selProf, setSelProf] = useState(firstProf);
  const [profOpen, setProfOpen] = useState(false);
  // Una cita pertenece al profesional seleccionado por su nombre; las sin profesional asignado
  // se muestran bajo el primero (así no desaparece ninguna cita antigua o de reserva web).
  const profMatch = a => !multiProf || ((a.prof || "").trim() ? (a.prof || "").trim() === selProf : selProf === firstProf);
  const selProfColor = (() => { const m = team.find(x => x.name === selProf); return (m && m.color) || T.accent; })();
  const DOWS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  const DOWS_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start = new Date(today); start.setDate(today.getDate() - (v2 ? ((today.getDay() + 6) % 7) : today.getDay()) + wkOff * 7); // v2: lunes→domingo · clásico: domingo→sábado
  const days = []; for (let i = 0; i < 7; i++) { const dt = new Date(start); dt.setDate(start.getDate() + i); days.push({ date: dt, dd: dt.getDate(), dow: DOWS[dt.getDay()], off: Math.round((dt - today) / 86400000), isToday: dt.getTime() === today.getTime() }); }
  const last = days[6].date;
  const hours = []; for (let h = 8; h <= 20; h++) hours.push(h);
  const hourOf = t => parseInt((t || "0").split(":")[0], 10);
  const atCell = (off, h) => appts.filter(a => apptDayOff(a) === off && hourOf(a.time) === h);
  const navBtn = { width: 34, height: 34, borderRadius: 9, border: "1px solid " + T.line, background: T.surface, color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
  const WPX = 70, WK_OPEN = 8, WK_CLOSE = 20; // jornada 08:00–20:00; cada hora (incl. 20:00) es una casilla completa
  const wkGridH = (WK_CLOSE - WK_OPEN + 1) * WPX; // +1 hora para que las 20:00 tengan casilla completa (cierre 21:00 sin etiqueta)
  const slots = adminSlots(), slotPx = WPX * adminSlotMins() / 60; // 15 min (JC Medical) o 30 min (otras clínicas)
  const topW = t => (mins(t) - WK_OPEN * 60) * WPX / 60;

  // Apila citas solapadas verticalmente (ancho completo, empuja las siguientes hacia abajo)
  const stackAppts = list => {
    if (!list.length) return [];
    const sorted = [...list].sort((a, b) => mins(a.time) - mins(b.time));
    let cursor = -1;
    return sorted.map(a => {
      const dur = parseInt(a.dur) || 60;
      const fullH = Math.max(20, dur * WPX / 60);
      const natural = topW(a.time);
      const pushed = cursor >= 0 && natural < cursor;
      const top = pushed ? cursor + 2 : natural;
      const h = pushed ? Math.max(20, Math.min(fullH, 26)) : fullH;
      cursor = top + h;
      return { ...a, _top: top, _h: h };
    });
  };

  return (
    <div>
      {/* navegación de semana (v2: una sola línea con icono + semana + toggle + Nueva cita + profesional + Hoy/nav) */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        {v2 && (
          <div style={{ width: 34, height: 34, borderRadius: 9, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
          </div>
        )}
        <div style={{ flex: 1, minWidth: 160, fontFamily: T.serif, fontSize: v2 ? 18 : 21, color: T.text }}>
          {days[0].dd} de <span style={{ fontStyle: "italic", color: T.accent }}>{cap(MES[start.getMonth()])}</span> – {last.getDate()} de <span style={{ fontStyle: "italic", color: T.accent }}>{cap(MES[last.getMonth()])}</span>
        </div>
        {v2 && viewToggle}
        {v2 && icsBtn}
        {v2 && nuevaBtn}
        {v2 && team.length > 0 && (
          <div style={{ position: "relative" }}>
            <button onClick={() => setProfOpen(o => !o)} title="Ver agenda de un profesional" style={{ display: "flex", alignItems: "center", gap: 8, height: 34, padding: "0 13px", border: "1px solid " + T.line, background: T.surface, borderRadius: 9, color: T.text, fontFamily: T.sans, fontSize: 12.5, cursor: "pointer", maxWidth: 220 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: selProfColor, flexShrink: 0 }} />
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{selProf || "Profesional"}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="2" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {profOpen && (
              <>
                <div onClick={() => setProfOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 60 }} />
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", minWidth: 224, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, boxShadow: T.shadow, overflow: "hidden", zIndex: 61 }}>
                  <div style={{ padding: "9px 14px 6px", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint }}>Agenda por profesional</div>
                  {team.map(m => {
                    // Si el profesional trabaja en más de una sucursal, se muestra debajo del
                    // nombre para distinguir su agenda (P5).
                    const sucs = Array.isArray(m.sucursales) ? m.sucursales.filter(Boolean) : [];
                    const showSuc = sucs.length > 1;
                    return (
                    <button key={m.id || m.name} onClick={() => { setSelProf(m.name); setProfOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "10px 14px", background: m.name === selProf ? T.accent + "14" : "transparent", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, color: m.name === selProf ? T.accent : T.textMute }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: m.color || T.accent, flexShrink: 0 }} />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</span>
                        {showSuc && <span style={{ display: "block", fontSize: 10, color: T.textFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 }}>{sucs.join(" · ")}</span>}
                      </span>
                      {m.name === selProf && <span style={{ fontSize: 10 }}>✓</span>}
                    </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
        <button onClick={() => setWkOff(0)} style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: wkOff === 0 ? T.textMute : T.text, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: "8px 16px", cursor: "pointer" }}>Hoy</button>
        <button onClick={() => setWkOff(wkOff - 1)} title="Semana anterior" style={navBtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg></button>
        <button onClick={() => setWkOff(wkOff + 1)} title="Semana siguiente" style={navBtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg></button>
      </div>

      <div className="jc-scroll" style={{ overflowX: "auto", overflowY: "auto", maxHeight: v2 ? "76vh" : "74vh", margin: v2 ? "0 10px" : 0, border: "1px solid " + T.line, borderRadius: v2 ? 16 : 12, boxShadow: v2 ? T.shadow : "none" }}>
        <div style={{ minWidth: 900 }}>
          {/* Encabezado días (en v2: hora a ambos lados) */}
          <div style={{ display: "grid", gridTemplateColumns: v2 ? "52px repeat(7, minmax(112px,1fr)) 52px" : "52px repeat(7, minmax(112px,1fr))", position: "sticky", top: 0, zIndex: 3, background: T.navBg, backdropFilter: "blur(8px)" }}>
            <div style={{ borderBottom: "1px solid " + T.line }} />
            {days.map((d, i) => (
              v2 ? (
                /* Encabezado horizontal en una línea (ahorra espacio): "Lunes 22 jun" */
                <div key={i} style={{ padding: "11px 6px", textAlign: "center", borderBottom: "1px solid " + T.line, borderLeft: "1px solid " + T.lineSoft, background: d.isToday ? T.accent + "12" : "transparent", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  <span style={{ fontFamily: T.serif, fontSize: 15.5, color: d.isToday ? T.accent : T.text }}>{DOWS_FULL[d.date.getDay()]} {d.dd}</span>
                  <span style={{ fontFamily: T.sans, fontSize: 10, color: d.isToday ? T.accent : T.textMute, marginLeft: 5 }}>{MES[d.date.getMonth()].slice(0, 3)}</span>
                </div>
              ) : (
                <div key={i} style={{ padding: "12px 4px 10px", textAlign: "center", borderBottom: "1px solid " + T.line, borderLeft: "1px solid " + T.lineSoft }}>
                  <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", color: d.isToday ? T.accent : T.textMute }}>{d.dow}</div>
                  {d.isToday
                    ? <div style={{ margin: "3px auto 0", width: 30, height: 30, borderRadius: "50%", background: T.accent, color: T.onAccent || "#fff", fontFamily: T.serif, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>{d.dd}</div>
                    : <div style={{ fontFamily: T.serif, fontSize: 19, color: T.text, marginTop: 2 }}>{d.dd}</div>}
                </div>
              )
            ))}
            {v2 && <div style={{ borderBottom: "1px solid " + T.line, borderLeft: "1px solid " + T.lineSoft }} />}
          </div>
          {/* Timeline continuo por columna */}
          <div style={{ display: "flex", position: "relative" }}>
            {/* Etiquetas de hora (en punto y media hora) */}
            <div style={{ width: 52, flexShrink: 0, position: "relative", height: wkGridH, borderRight: "1px solid " + T.lineSoft, overflow: "hidden" }}>
              {ADMIN_HALF_HOURS.map((hhmm, i) => {
                const half = hhmm.endsWith(":30"); // las medias horas, más pequeñas y tenues
                return (
                  <div key={hhmm} style={{ position: "absolute", top: i * (WPX / 2) + 2, right: 6, fontFamily: T.sans, fontSize: half ? 9 : (v2 ? 10.5 : 10), fontWeight: (v2 && !half) ? 600 : 400, color: v2 ? (half ? T.textFaint : T.textMute) : T.textFaint, opacity: half ? (v2 ? 0.8 : 0.5) : 1, pointerEvents: "none", userSelect: "none" }}>
                    {hhmm}
                  </div>
                );
              })}
            </div>
            {/* Columnas de días */}
            {days.map((d, ci) => {
              const da = appts.filter(a => apptDayOff(a) === d.off && a.status !== "anulada" && mins(a.time) >= WK_OPEN * 60 && mins(a.time) < (WK_CLOSE + 1) * 60 && (!v2 || profMatch(a)));
              return (
                <div key={ci} style={{ flex: "1 1 0", minWidth: 112, position: "relative", height: wkGridH, borderLeft: "1px solid " + T.lineSoft, background: d.isToday ? T.accent + "08" : "transparent" }}>
                  {/* Zonas clicables (15 o 30 min según la clínica); bloqueadas si hay una cita que cubre ese tramo */}
                  {slots.map((hhmm, i) => {
                    const isHourLine = hhmm.endsWith(":00"); // borde marcado en la hora en punto
                    const isHalfLine = hhmm.endsWith(":30"); // borde sutil en la media hora
                    // v2: el "+" no se dibuja donde hay una cita visible (sin ruido detrás de las citas).
                    const blocked = v2
                      ? da.some(a => { const as = mins(a.time), ad = parseInt(a.dur) || 60, ts = mins(hhmm); return ts >= as && ts < as + ad; })
                      : appts.some(a => { if (a.day !== d.off) return false; const as = mins(a.time), ad = parseInt(a.dur) || 60, ts = mins(hhmm); return ts >= as && ts < as + ad; });
                    return (
                      <div key={hhmm} style={{ position: "absolute", left: 0, right: 0, top: i * slotPx, height: slotPx, borderBottom: (isHourLine || isHalfLine) ? "1px solid " + T.lineSoft : "none" }}>
                        {!blocked && <button className="jc-cell" onClick={() => onNew(d.off, hhmm)} title={"Agendar " + hhmm}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                          <span className="jc-cell-add" style={{ width: 15, height: 15, borderRadius: "50%", border: "1px solid " + T.line, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                          </span>
                        </button>}
                      </div>
                    );
                  })}
                  {/* Bloques de citas apilados verticalmente */}
                  {stackAppts(da).map(a => {
                    const isPendPago = a.status === "pendiente_pago";
                    const accentColor = jcmApptState(a, T).color;
                    return (
                      <div key={a.id} className="jc-appt" style={{ position: "absolute", left: 1, right: 1, top: a._top, height: a._h, zIndex: 2 }}
                        onMouseEnter={e => { if (hideT.current) clearTimeout(hideT.current); const r = e.currentTarget.getBoundingClientRect(); if (v2) { let x = r.right + 8; if (x + 280 > window.innerWidth) x = r.left - 288; setHover({ a, x: Math.max(8, x), y: Math.min(r.top, window.innerHeight - 360) }); } else { setHover({ a, x: Math.min(r.right + 8, window.innerWidth - 250), y: Math.min(r.top, window.innerHeight - 180) }); } }}
                        onMouseLeave={() => { if (v2) { if (hideT.current) clearTimeout(hideT.current); hideT.current = setTimeout(() => setHover(null), 160); } else setHover(null); }}
                        onClick={e => { e.stopPropagation(); setHover(null); const r = e.currentTarget.getBoundingClientRect(); setMenuPos({ x: Math.min(r.left, window.innerWidth - 210), y: Math.min(r.bottom + 4, window.innerHeight - 290) }); setMenuDayOff(d.off); setMenu(menu === a.id ? null : a.id); }}>
                        {v2 ? (
                          /* Estilo "Medilink barra": barra lateral del color del estado + tinte leve + solo el nombre (el detalle va en el hover) */
                          <div style={{ height: "100%", cursor: "pointer", background: isPendPago ? "#B8860B" + (T.dark ? "22" : "16") : accentColor + (T.dark ? "26" : "1c"), border: "1px solid " + accentColor + "33", borderLeft: "4px solid " + accentColor, borderRadius: 6, padding: "0 6px 0 5px", overflow: "hidden", display: "flex", alignItems: "center", gap: 5 }}>
                            <span style={{ flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</span>
                            {a.proc && <span style={{ flexShrink: 0, width: 15, height: 15, borderRadius: 3, background: accentColor + "33", color: accentColor, fontFamily: T.sans, fontSize: 8.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: 0 }}>{a.proc[0].toUpperCase()}</span>}
                          </div>
                        ) : (
                          <div style={{ height: "100%", cursor: "pointer", background: isPendPago ? "#FFF8E1" + "22" : T.surface, border: "1px solid " + (isPendPago ? "#B8860B44" : T.line), borderLeft: "3px solid " + accentColor, borderRadius: 6, padding: "4px 6px", overflow: "hidden", boxShadow: "0 2px 6px rgba(40,38,30,.08)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
                              <span style={{ flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</span>
                            </div>
                            {a._h > 26 && <div style={{ fontFamily: T.sans, fontSize: 9.5, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.time} · {(parseInt(a.dur) || 60)} min{a.proc ? " · " + (isPendPago ? "⏳ Pago pendiente" : a.proc) : ""}</div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {/* Etiquetas de hora del lado derecho (solo v2: hora a ambos lados, estilo Medilink) */}
            {v2 && (
              <div style={{ width: 52, flexShrink: 0, position: "relative", height: wkGridH, borderLeft: "1px solid " + T.lineSoft, overflow: "hidden" }}>
                {ADMIN_HALF_HOURS.map((hhmm, i) => {
                  const half = hhmm.endsWith(":30");
                  return (
                    <div key={hhmm} style={{ position: "absolute", top: i * (WPX / 2) + 2, left: 6, fontFamily: T.sans, fontSize: half ? 9 : 10.5, fontWeight: half ? 400 : 600, color: half ? T.textFaint : T.textMute, opacity: half ? 0.8 : 1, pointerEvents: "none", userSelect: "none" }}>
                      {hhmm}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 12 }}>Pasa el mouse por un horario libre y toca el <b style={{ color: T.accent }}>+</b> para agendar · pasa el cursor por una cita para ver el detalle y acciones.</p>
      {/* Tarjeta al pasar el cursor: avatar + estado + tabla (Hora/Duración/Procedimiento/Estado/Profesional) + acciones rápidas.
          Interactiva: el retardo de cierre permite mover el cursor de la cita a la tarjeta para tocar un botón. */}
      {hover && hover.a && !menu && (() => {
        const a = hover.a, isPP = a.status === "pendiente_pago";
        const _hs = jcmApptState(a, T); const ac = _hs.color, estado = _hs.label;
        const ini = (a.name || "").split(" ").slice(0, 2).map(w => (w[0] || "")).join("").toUpperCase();
        const rows = [["Hora", a.time], ["Duración", (parseInt(a.dur) || 60) + " min"], ["Procedimiento", a.proc || "—"], ["Estado", estado, ac]];
        if ((a.prof || "").trim()) rows.push(["Profesional", a.prof, (team.find(x => x.name === a.prof) || {}).color || T.accent]);
        return v2 ? (
          <div onMouseEnter={() => { if (hideT.current) clearTimeout(hideT.current); }} onMouseLeave={() => setHover(null)}
            style={{ position: "fixed", left: hover.x, top: hover.y, zIndex: 90, width: 280, background: T.bg, border: "1px solid " + T.line, borderRadius: 12, boxShadow: "0 20px 50px -16px rgba(0,0,0,.55)", overflow: "hidden", animation: "jcFade .14s ease" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "13px 15px 11px", borderBottom: "1px solid " + T.lineSoft }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: ac, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>{ini}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: T.serif, fontSize: 16, color: T.text, lineHeight: 1.15 }}>{a.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: ac, marginTop: 3 }}>{estado}</div>
              </div>
            </div>
            <div style={{ padding: "6px 15px 11px" }}>
              {rows.map(([k, v, c], i) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, padding: "7px 0", borderBottom: i < rows.length - 1 ? "1px solid " + T.lineSoft : "none" }}>
                  <span style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: c || T.text, textAlign: "right", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v}</span>
                </div>
              ))}
            </div>
            {a.comentario && <div style={{ padding: "0 15px 11px" }}><div style={{ padding: "9px 11px", background: T.surface, borderRadius: 8, fontFamily: T.sans, fontSize: 11.5, color: T.text, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{a.comentario}</div></div>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, padding: "0 15px 13px" }}>
              {(() => {
                const isConf = a.status === "confirmada";
                const recordar = () => { const ph = (a.phone || "").replace(/\D/g, ""); if (ph.length >= 8) window.open("https://wa.me/" + ph + "?text=" + encodeURIComponent(jcmRecordatorioMsg(a)), "_blank", "noopener"); else window.jcmToast && window.jcmToast("Este paciente no tiene teléfono registrado.", "info"); };
                // [label, fn, color, style]  style: "" normal · "red" cancelar · "green" confirmado activo
                return [
                  // Confirmar es un TOGGLE: si ya está confirmada, vuelve a "agendado" (pendiente). (P1)
                  [isConf ? "Confirmada ✓" : "Confirmar", () => updateAppt(a.id, { status: isConf ? "pendiente" : "confirmada", attended: false }), "#16A34A", isConf ? "green" : ""],
                  ["Recordar",   recordar,                                                                                "#1F8A5B",  ""],
                  ["Atendido",   () => updateAppt(a.id, { status: "atendida",   attended: true }),                        "#C9A227",  ""],
                  ["No asistió", () => updateAppt(a.id, { status: "no_asistio", attended: false }),                       "#C0285A",  ""],
                  ["Cancelar",   () => { updateAppt(a.id, { status: "anulada", attended: false, anuladaAt: Date.now() }); jcmCancelNotice(a); }, "#C0285A",  "red"],
                  ["Ficha",      () => { if (onVerFicha) onVerFicha(a); },                                                T.textMute, ""],
                  ["Comentario", () => { setEditCom(a); },                                                                T.textMute, ""]
                ].map(([lbl, fn, col, st]) => {
                  const filledRed = st === "red", filledGreen = st === "green";
                  const bg = filledRed ? "#C0285A" : filledGreen ? "#16A34A" : T.surface;
                  const brd = filledRed ? "#C0285A" : filledGreen ? "#16A34A" : T.line;
                  const fg = (filledRed || filledGreen) ? "#fff" : col;
                  return <button key={lbl} onClick={() => { fn(); if (lbl !== "Recordar") setHover(null); }} style={{ height: 30, borderRadius: 7, border: "1px solid " + brd, background: bg, color: fg, fontFamily: T.sans, fontSize: 10.5, fontWeight: (filledRed || filledGreen) ? 600 : 500, cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", padding: "0 4px" }}>{lbl}</button>;
                });
              })()}
            </div>
          </div>
        ) : (
          /* Vista clásica (otras clínicas): tabla simple, sin acciones */
          <div style={{ position: "fixed", left: hover.x, top: hover.y, zIndex: 90, width: 232, background: T.bg, border: "1px solid " + T.line, borderLeft: "3px solid " + ac, borderRadius: 10, boxShadow: "0 18px 44px -14px rgba(0,0,0,.5)", padding: "12px 14px", pointerEvents: "none", animation: "jcFade .14s ease" }}>
            <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text, marginBottom: 8 }}>{a.name}</div>
            {[["Hora", a.time], ["Duración", (parseInt(a.dur) || 60) + " min"], ["Procedimiento", a.proc || "—"], ["Estado", estado]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "3px 0", fontFamily: T.sans, fontSize: 11.5 }}>
                <span style={{ color: T.textMute }}>{k}</span>
                <span style={{ color: T.text, fontWeight: 500, textAlign: "right" }}>{v}</span>
              </div>
            ))}
            {a.comentario && (
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid " + T.lineSoft }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 3 }}>Comentario</div>
                <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.text, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{a.comentario}</div>
              </div>
            )}
          </div>
        );
      })()}
      {menu && activeAppt && (
        <>
          <div onClick={() => setMenu(null)} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
          <div onClick={e => e.stopPropagation()} style={{ position: "fixed", left: menuPos.x, top: menuPos.y, zIndex: 80, minWidth: 210, background: T.bg, border: "1px solid " + T.line, borderRadius: 8, boxShadow: "0 16px 40px -12px rgba(0,0,0,.5)", overflow: "hidden", padding: "4px 0", animation: "jcSlideUp .2s ease" }}>
            {[
              ["✎ Editar cita (fecha, hora, duración, procedimiento)", () => { onEdit(activeAppt); setMenu(null); }, T.accent],
              ["Ver ficha del paciente", () => { if (onVerFicha) onVerFicha(activeAppt); setMenu(null); }],
              ["Agregar comentario", () => { setEditCom(activeAppt); setMenu(null); }],
              ["__sep", null],
              ...(activeAppt.status === "pendiente_pago" ? [["✓ Confirmar transferencia", () => { updateAppt(activeAppt.id, { status: "confirmada" }); setMenu(null); }, "#1F8A5B"]] : []),
              ["Confirmar cita", () => { updateAppt(activeAppt.id, { status: "confirmada", attended: false }); setMenu(null); }, "#16A34A"],
              ["Marcar como atendido", () => { updateAppt(activeAppt.id, { status: "atendida", attended: true }); setMenu(null); }],
              ["No asistió", () => { updateAppt(activeAppt.id, { status: "no_asistio", attended: false }); setMenu(null); }, "#C0285A"],
              ["__sep", null],
              ["Anular cita", () => { updateAppt(activeAppt.id, { status: "anulada", attended: false, anuladaAt: Date.now() }); jcmCancelNotice(activeAppt); setMenu(null); }, "#C0285A"]
            ].map((it, i) => it[0] === "__sep"
              ? <div key={i} style={{ height: 1, background: T.lineSoft, margin: "4px 0" }} />
              : <button key={i} onClick={it[1]} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, color: it[2] || T.text }}>{it[0]}</button>)}
          </div>
        </>
      )}
      {editCom && <ComentarioPopup T={T} appt={editCom} updateAppt={updateAppt} onClose={() => setEditCom(null)} />}
    </div>
  );
}

function Summ({ T, k, v }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid " + T.lineSoft }}>
      <span style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute }}>{k}</span>
      <span style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, textAlign: "right" }}>{v}</span>
    </div>
  );
}

function NewCitaModal({ T, patients, addPatient, time, day, onClose, onSave, prefill, appts, onOpenPatient, addAppt }) {
  const D = window.JCDATA;
  const A = window.JCADMIN;
  const [savedPatId, setSavedPatId] = useState(""); // ficha del paciente recién agendado (para "Ir a la ficha")
  const team = (window.CADMIN || { team: [] }).team;
  const especialidades = D.catalog.map(s => s.sec);
  // Prellenado por el copiloto (voz/texto): salta al paso 2 con la hora ya elegida.
  const pf = prefill || {};
  const [step, setStep] = useState(pf.time ? 2 : 1);
  // parámetros
  const [esp, setEsp] = useState("Todas");
  const [proc, setProc] = useState(pf.proc || "Evaluación general");
  const [prof, setProf] = useState(team[0] ? team[0].name : clinicDisplayName());
  const [recurso, setRecurso] = useState("No especificado");
  const [camilla, setCamilla] = useState("Box 1");
  const [dur, setDur] = useState("30 minutos");
  // Sucursal (Área 2) y notas de la cita (Área 9).
  let sucursalesList = []; try { sucursalesList = ((window.DB && window.DB.get("sucursales")) || []).map(s => s.name).filter(Boolean); } catch (e) {}
  const [sucursal, setSucursal] = useState(pf.sucursal || (sucursalesList[0] || ""));
  const [notas, setNotas] = useState(pf.notas || "");
  const [repetir, setRepetir] = useState(0); // repeticiones semanales adicionales
  // selección
  const [pick, setPick] = useState(pf.time ? { dayOff: pf.day || 0, time: pf.time } : null); // {dayOff, time}
  // paciente
  const [tipo, setTipo] = useState(pf.patName && !pf.patId ? "nuevo" : "existente");
  const [pid, setPid] = useState(pf.patId || "");
  const [patQ, setPatQ] = useState("");
  const [showAllPat, setShowAllPat] = useState(false); // P9: por defecto solo 2 pacientes recientes
  const [nombre, setNombre] = useState(pf.patName && !pf.patId ? pf.patName : "");
  const [rut, setRut] = useState("");
  const [phone, setPhone] = useState("+56 9 ");
  const [email, setEmail] = useState("");
  const [sendMail, setSendMail] = useState(true);
  // origen / campaña — para estadística y conexión con Meta Ads
  const ORIGEN_ORG = ["Paciente antiguo / fidelizado", "Orgánico · Instagram", "Orgánico · Facebook", "Orgánico · TikTok", "Referido de paciente", "Pasó por la clínica (walk-in)", "Búsqueda en Google"];
  const metaCamps = ((window.CADMIN || { campaigns: [] }).campaigns || []).filter(c => c.active);
  const metaConn = (((window.CADMIN || { integrations: [] }).integrations || []).find(i => /meta/i.test(i.name)) || {}).connected;
  const [origen, setOrigen] = useState("");

  // "Todas" usa la lista completa de servicios de la clínica (catálogo base + servicios propios creados en Servicios).
  const allClinicProcs = (window.clinicServiceList ? Array.from(new Set(window.clinicServiceList().map(s => s.name))) : PROC_LIST());
  const procsByEsp = esp === "Todas" ? allClinicProcs : (D.catalog.find(s => s.sec === esp) || { groups: [] }).groups.reduce((a, g) => a.concat(g.items.map(i => i.n)), []);
  const wdN = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const b0 = new Date();
  const week = []; for (let off = 0; off < 7; off++) { const dt = new Date(b0); dt.setDate(b0.getDate() + off); week.push({ off, dd: dt.getDate(), mm: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][dt.getMonth()], wd: wdN[dt.getDay()], wday: dt.getDay() }); }
  // Info de fecha para cualquier offset (también semanas distintas a la actual, desde el calendario)
  const dayInfo = off => { const dt = new Date(b0); dt.setDate(b0.getDate() + off); return { wd: wdN[dt.getDay()], dd: dt.getDate(), mm: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][dt.getMonth()] }; };
  const pat = patients.find(p => p.id === pid);
  const finalName = tipo === "existente" ? (pat ? pat.name : "") : nombre;
  const finalPhone = pat ? pat.phone : phone;
  const finalEmail = pat ? pat.email : email;
  const selStyle = selS(T), lbl = lblS(T);

  function confirm() {
    try {
      const apptFecha = new Date(b0.getFullYear(), b0.getMonth(), b0.getDate() + pick.dayOff).toISOString().slice(0, 10);
      // Para paciente nuevo: guardarlo en la lista de pacientes si addPatient está disponible
      let resolvedPatId = pat ? pat.id : "";
      if (tipo === "nuevo" && typeof addPatient === "function") {
        try {
          // La fecha del paciente nuevo = la fecha de la cita que se está agendando (no la de hoy).
          const np = addPatient({ name: nombre.trim(), rut: rut.trim(), phone: phone.trim(), email: email.trim(), age: 0, fechaTs: new Date(apptFecha + "T00:00:00").getTime() });
          if (np && np.id) resolvedPatId = np.id;
        } catch (e) {}
      }
      setSavedPatId(resolvedPatId || "");
      // Repetir cita: copias semanales adicionales a la misma hora (solo si hay addAppt).
      if (repetir > 0 && typeof addAppt === "function") {
        for (var _i = 1; _i <= repetir; _i++) {
          var _rf = new Date(b0.getFullYear(), b0.getMonth(), b0.getDate() + pick.dayOff + 7 * _i).toISOString().slice(0, 10);
          addAppt({ name: finalName, patId: resolvedPatId, rut: pat ? pat.rut : rut, phone: finalPhone, email: finalEmail, proc, prof, sucursal, recurso, camilla, dur, origen, comentario: notas, time: pick.time, day: pick.dayOff + 7 * _i, fecha: _rf, status: "pendiente", paid: false });
        }
      }
      onSave({ name: finalName, patId: resolvedPatId, rut: pat ? pat.rut : rut, phone: finalPhone, email: finalEmail, proc, prof, sucursal, recurso, camilla, dur, origen, comentario: notas, time: pick.time, day: pick.dayOff, fecha: apptFecha, status: "pendiente", paid: false });
      // Bloquear el slot en jcm_horarios_dates para que no aparezca disponible en la app del paciente
      try {
        const dt = new Date(apptFecha + "T00:00:00");
        const curr = D.availability(dt.getDay());
        D.saveDateSlots(apptFecha, (curr.slots || []).filter(s => s !== pick.time));
      } catch (e) {}
      // Auto-abrir WhatsApp si el checkbox estaba marcado y hay teléfono
      if (sendMail) {
        const waP = (finalPhone || "").replace(/[^0-9]/g, "");
        if (waP.length >= 8) {
          const wk2 = dayInfo(pick.dayOff);
          const msg2 = encodeURIComponent(jcmCitaConfirmMsg(finalName, wk2, pick.time, proc, prof));
          setTimeout(() => window.open("https://api.whatsapp.com/send?phone=" + waP + "&text=" + msg2, "_blank", "noopener"), 400);
        }
      }
      setStep(3);
    } catch (e) {
      console.error("Error al confirmar cita:", e);
    }
  }

  // STEP 3 — éxito
  if (step === 3) {
    const wk = dayInfo(pick.dayOff);
    const apptFecha = new Date(b0.getFullYear(), b0.getMonth(), b0.getDate() + pick.dayOff).toISOString().slice(0, 10);
    const waPhone = (finalPhone || "").replace(/[^0-9]/g, "");
    const waMsg = encodeURIComponent(jcmCitaConfirmMsg(finalName, wk, pick.time, proc, prof));
    const waUrl = "https://api.whatsapp.com/send?phone=" + waPhone + "&text=" + waMsg;
    const daySlots = D ? (D.availability(new Date(apptFecha + "T00:00:00").getDay()).slots || []) : [];
    // Generar y descargar un evento .ics para el calendario nativo, con recordatorio 24 h antes
    function addToCalendar() {
      try {
        const pad = n => String(n).padStart(2, "0");
        const durMin = parseInt(dur, 10) || 60;
        const start = new Date(apptFecha + "T" + pick.time + ":00");
        const end = new Date(start.getTime() + durMin * 60000);
        const fmt = d => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00";
        const now = new Date();
        const stamp = now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) + "T" + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + pad(now.getUTCSeconds()) + "Z";
        const esc = s => String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
        const ics = [
          "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Medique//Agenda//ES", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
          "BEGIN:VEVENT",
          "UID:cita-" + Date.now() + "@medique",
          "DTSTAMP:" + stamp,
          "DTSTART:" + fmt(start),
          "DTEND:" + fmt(end),
          "SUMMARY:" + esc("Cita " + clinicDisplayName() + " · " + proc),
          "DESCRIPTION:" + esc("Paciente: " + (finalName || "—") + "\nProfesional: " + prof + "\nProcedimiento: " + proc),
          "LOCATION:" + esc(clinicDisplayName()),
          "BEGIN:VALARM", "TRIGGER:-PT24H", "ACTION:DISPLAY", "DESCRIPTION:" + esc("Recordatorio: cita en " + clinicDisplayName() + " mañana"), "END:VALARM",
          "END:VEVENT", "END:VCALENDAR"
        ].join("\r\n");
        // Calendario NATIVO del dispositivo (Apple Calendar en Mac/iPhone/iPad, o el
        // calendario por defecto en otros equipos) mediante un archivo .ics estándar.
        const ua = navigator.userAgent || "";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
        if (isMobile) {
          // Móvil: abrir el .ics directamente → iOS/Android muestran la hoja "Agregar evento".
          window.location.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
          return;
        }
        // Escritorio (Mac, etc.): descargar el .ics → se abre en el calendario nativo (Apple Calendar).
        const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "cita-" + apptFecha + ".ics";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      } catch (e) { console.error("Error al crear evento de calendario:", e); }
    }
    return (
      <AdModal T={T} title="Cita agendada" onClose={onClose} wide footer={<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <AdBtn T={T} onClick={onClose}>Cerrar</AdBtn>
        {savedPatId && onOpenPatient && <AdBtn T={T} onClick={() => { onOpenPatient(savedPatId); onClose(); }}>👤 Ir a la ficha</AdBtn>}
        <AdBtn T={T} onClick={addToCalendar}>📅 Agregar al calendario</AdBtn>
        {waPhone && <AdBtn T={T} primary onClick={() => window.open(waUrl, "_blank")}>📱 Notificar por WhatsApp</AdBtn>}
      </div>}>
        <div style={{ textAlign: "center", padding: "10px 0 4px" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(31,138,91,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1F8A5B" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 26, color: T.text }}>¡Cita agendada con éxito!</h2>
          <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 6 }}>El horario fue bloqueado en el sistema</p>
        </div>
        <div style={{ background: "rgba(31,138,91,.07)", border: "1px solid rgba(31,138,91,.28)", borderRadius: 10, padding: "14px 16px", marginTop: 14 }}>
          <Summ T={T} k="Paciente" v={finalName || "—"} />
          <Summ T={T} k="Procedimiento" v={proc} />
          <Summ T={T} k="Profesional" v={prof} />
          {sucursal && <Summ T={T} k="Sucursal" v={sucursal} />}
          <Summ T={T} k="Fecha" v={wk.wd + " " + wk.dd + " " + wk.mm} />
          <Summ T={T} k="Hora" v={pick.time} />
        </div>
        {daySlots.length > 0 && (() => {
          // Horarios ocupados por OTRAS citas del mismo día (no el recién agendado).
          const takenByOthers = new Set(
            (appts || [])
              .filter(a => (a.fecha === apptFecha || a.day === pick.dayOff) && a.time && a.time !== pick.time)
              .map(a => a.time)
          );
          return (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Horarios del día</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {daySlots.map(s => {
                const sel = s === pick.time;          // recién agendado → bloqueado
                const taken = takenByOthers.has(s);   // ocupado por otra cita
                return <span key={s} style={{
                  fontFamily: T.sans, fontSize: 11, padding: "5px 9px", borderRadius: 6,
                  background: sel ? T.accent : (taken ? T.surface : T.chipBg),
                  color: sel ? (T.onAccent || "#fff") : (taken ? T.textFaint : T.text),
                  border: "1px solid " + (sel ? T.accent : (taken ? T.lineSoft : T.chipBorder)),
                  fontWeight: sel ? 600 : 400,
                  textDecoration: taken ? "line-through" : "none"
                }}>{s}</span>;
              })}
            </div>
            <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 }}>Solo el horario agendado quedó bloqueado · los demás siguen disponibles</p>
          </div>
          );
        })()}
      </AdModal>
    );
  }

  // STEP 2 — paciente
  if (step === 2) {
    const wk = dayInfo(pick.dayOff);
    const ok = (finalName || "").trim();
    return (
      <AdModal T={T} title="Dar cita · datos del paciente" onClose={onClose} wide
        footer={<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flex: 1 }}>
            <input type="checkbox" checked={sendMail} onChange={e => setSendMail(e.target.checked)} />
            <span style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>Notificar por WhatsApp</span>
          </label>
          <AdBtn T={T} onClick={() => setStep(1)}>Atrás</AdBtn>
          <AdBtn T={T} primary onClick={() => ok && confirm()}>Continuar</AdBtn>
        </div>}>
        <div style={{ background: "rgba(31,138,91,.08)", border: "1px solid rgba(31,138,91,.3)", borderRadius: 8, padding: "12px 14px", marginBottom: 12, fontFamily: T.sans, fontSize: 12.5, color: T.text }}>
          Cita seleccionada · <b>{wk.wd} {wk.dd} {wk.mm}</b> a las <b>{pick.time}</b> · {prof}{sucursalesList.length > 0 && sucursal ? " · " + sucursal : ""}
        </div>
        {(() => {
          const _sv = (window.clinicServiceList ? (window.clinicServiceList().find(s => s.name === proc) || {}) : {});
          const _price = _sv.price || 0;
          if (!_price) return null;
          return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "11px 14px", marginBottom: 16 }}>
              <span style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute }}>Valor del tratamiento</span>
              <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: T.serif, fontSize: 18, color: T.accent }}>{(window.JCDATA ? window.JCDATA.fmt(_price) : "$" + _price)}</span>
                <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>se cobra al atender</span>
              </span>
            </div>
          );
        })()}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <div>
            <span style={lbl}>Tratamiento</span>
            <select value={proc} onChange={e => setProc(e.target.value)} style={selStyle}>
              <option value="Evaluación general">Evaluación general</option>
              {(window.JCDATA && window.JCDATA.catalog ? window.JCDATA.catalog : []).map(sec => (
                <optgroup key={sec.sec} label={sec.sec}>
                  {sec.groups.flatMap(g => g.items).map(it => <option key={it.n} value={it.n}>{it.n}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <span style={lbl}>Duración</span>
            <select value={dur} onChange={e => setDur(e.target.value)} style={selStyle}>
              <option>15 minutos</option>
              <option>30 minutos</option>
              <option>45 minutos</option>
              <option>60 minutos</option>
              <option>90 minutos</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[["existente", "Paciente existente"], ["nuevo", "Paciente nuevo"]].map(([k, l]) => (
            <button key={k} onClick={() => setTipo(k)} style={{ flex: 1, fontFamily: T.sans, fontSize: 11.5, fontWeight: 500, padding: "12px", borderRadius: 7, cursor: "pointer", background: tipo === k ? T.surface2 : T.surface, color: tipo === k ? T.text : T.textMute, border: "1px solid " + (tipo === k ? T.accent : T.line) }}>{l}</button>
          ))}
        </div>
        {tipo === "existente"
          ? <div><span style={lbl}>Paciente</span>
              <div style={{ position: "relative", marginBottom: 8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.7" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                <input value={patQ} onChange={e => setPatQ(e.target.value)} placeholder="Buscar por nombre o RUT…" style={{ ...selStyle, paddingLeft: 34 }} />
              </div>
              <div className="jc-scroll" style={{ maxHeight: 230, overflowY: "auto", border: "1px solid " + T.line, borderRadius: 8 }}>
                {(() => {
                  const q = patQ.trim().toLowerCase(); const qNorm = q.replace(/[^0-9k]/g, "");
                  const recency = p => p.updatedAt || p.created || p.lastVisit || p.ts || 0;
                  const btn = p => (
                    <button key={p.id} onClick={() => setPid(p.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 13px", background: pid === p.id ? (T.surface2 || T.accent + "14") : "transparent", border: "none", borderBottom: "1px solid " + T.lineSoft, cursor: "pointer" }}>
                      <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{p.name}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{p.rut || p.phone || "Paciente"}</div>
                    </button>
                  );
                  if (q) {
                    const fl = patients.filter(p => (p.name || "").toLowerCase().includes(q) || (p.rut || "").toLowerCase().includes(q) || (qNorm.length >= 3 && (p.rut || "").replace(/[^0-9kK]/g, "").toLowerCase().includes(qNorm)));
                    return fl.length ? fl.map(btn) : <div style={{ padding: "16px 13px", fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Sin resultados para "{patQ}".</div>;
                  }
                  // Sin búsqueda: solo los 2 pacientes más recientes; el resto queda desplegable. (P9)
                  const ord = [...patients].sort((a, b) => recency(b) - recency(a));
                  const shown = showAllPat ? ord : ord.slice(0, 2);
                  return <>
                    {shown.length ? shown.map(btn) : <div style={{ padding: "16px 13px", fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Aún no hay pacientes. Usa "Paciente nuevo" o busca por nombre.</div>}
                    {patients.length > 2 && <button onClick={() => setShowAllPat(s => !s)} style={{ display: "block", width: "100%", textAlign: "center", padding: "10px 13px", background: "transparent", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.accent }}>{showAllPat ? "Ver menos" : "Ver todos los pacientes (" + patients.length + ")"}</button>}
                  </>;
                })()}
              </div>
            </div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <AdField T={T} label="Nombre completo" value={nombre} onChange={setNombre} placeholder="Ej: Paciente nuevo" />
              <AdField T={T} label="RUT" value={rut} onChange={v => setRut(window.jcmFmtRut ? window.jcmFmtRut(v) : v)} placeholder="12.345.678-9" />
              <AdField T={T} label="Teléfono móvil (WhatsApp)" value={phone} onChange={v => { const pfx = "+56 9 "; const digits = v.startsWith(pfx) ? v.slice(pfx.length).replace(/\D/g,"") : v.replace(/\D/g,""); setPhone(pfx + digits); }} inputMode="tel" placeholder="+56 9 1234 5678" />
              <AdField T={T} label="Correo" value={email} onChange={setEmail} inputMode="email" placeholder="correo@ejemplo.com" />
            </div>}
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid " + T.line }}>
          <span style={lbl}>Notas de la cita <span style={{ color: T.textMute, textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>· opcional</span></span>
          <textarea value={notas} onChange={e => setNotas(e.target.value)} rows={2} placeholder="Observaciones, indicaciones o excepciones de pago…" style={{ width: "100%", padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 4 }} />
        </div>
        {addAppt && <div style={{ marginTop: 14, paddingTop: 16, borderTop: "1px solid " + T.line }}>
          <span style={lbl}>Repetir esta cita</span>
          <select value={repetir} onChange={e => setRepetir(parseInt(e.target.value, 10) || 0)} style={selStyle}>
            <option value={0}>No repetir</option>
            <option value={1}>Semanal · 1 cita extra</option>
            <option value={3}>Semanal · 3 citas extra (4 sesiones)</option>
            <option value={5}>Semanal · 5 citas extra (6 sesiones)</option>
            <option value={7}>Semanal · 7 citas extra (8 sesiones)</option>
          </select>
          {repetir > 0 && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 7, lineHeight: 1.5 }}>Se crearán {repetir} cita{repetir === 1 ? "" : "s"} más, una por semana a la misma hora.</div>}
        </div>}
        <div style={{ marginTop: 14, paddingTop: 16, borderTop: "1px solid " + T.line }}>
          <span style={lbl}>Campaña / Origen <span style={{ color: T.textMute, textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>· para estadística</span></span>
          <select value={origen} onChange={e => setOrigen(e.target.value)} style={selStyle}>
            <option value="">Seleccionar origen…</option>
            <optgroup label="Orgánico / directo">
              {ORIGEN_ORG.map(o => <option key={o} value={o}>{o}</option>)}
            </optgroup>
            <optgroup label={"Publicidad · Meta Ads" + (metaConn ? " (campañas activas)" : "")}>
              {metaCamps.length
                ? metaCamps.map(c => <option key={c.id} value={"Meta · " + c.name}>{c.name}{c.net ? " · " + c.net : ""}</option>)
                : <option value="Meta · campaña activa">Conecta Meta para ver tus campañas</option>}
              <option value="Meta · otra campaña">Otra campaña de Meta…</option>
            </optgroup>
          </select>
          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 7, lineHeight: 1.5 }}>
            {metaConn
              ? "Las campañas pagadas se sincronizan desde Meta Ads. Se guarda en la cita para medir de dónde llega cada paciente."
              : "Conecta Meta Ads en Integraciones para listar tus campañas activas automáticamente."}
          </div>
        </div>
      </AdModal>
    );
  }

  // STEP 1 — parámetros + grilla semanal
  return (
    <AdModal T={T} title="Dar cita (agendar)" onClose={onClose} wide
      footer={<div style={{ display: "flex", gap: 10, alignItems: "center" }}><div style={{ flex: 1, fontFamily: T.sans, fontSize: 12, color: T.textMute }}>{pick ? "1 hora seleccionada · " + pick.time : "0 horas seleccionadas"}</div><AdBtn T={T} onClick={onClose}>Cerrar</AdBtn><AdBtn T={T} primary onClick={() => pick && setStep(2)}>Continuar</AdBtn></div>}>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 18, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <div><span style={lbl}>Especialidad</span><select value={esp} onChange={e => { setEsp(e.target.value); }} style={selStyle}><option>Todas</option>{especialidades.map(s => <option key={s}>{s}</option>)}</select></div>
          <div><span style={lbl}>Procedimiento</span><select value={proc} onChange={e => setProc(e.target.value)} style={selStyle}><option value="Evaluación general">Evaluación general</option>{procOptionsByCat(procsByEsp)}</select></div>
          <div><span style={lbl}>Profesional</span><select value={prof} onChange={e => setProf(e.target.value)} style={selStyle}>{team.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}</select></div>
          {sucursalesList.length > 0 && <div><span style={lbl}>Sucursal</span><select value={sucursal} onChange={e => setSucursal(e.target.value)} style={selStyle}>{sucursalesList.map(s => <option key={s} value={s}>{s}</option>)}</select></div>}
          <div><span style={lbl}>Recurso</span><select value={recurso} onChange={e => setRecurso(e.target.value)} style={selStyle}><option>No especificado</option><option>Sala de procedimientos</option><option>Sala de evaluación</option></select></div>
          <div><span style={lbl}>Box / Camilla</span><select value={camilla} onChange={e => setCamilla(e.target.value)} style={selStyle}><option>Box 1</option><option>Box 2</option><option>Camilla 1</option></select></div>
          <div><span style={lbl}>Duración</span><select value={dur} onChange={e => setDur(e.target.value)} style={selStyle}><option>15 minutos</option><option>30 minutos</option><option>45 minutos</option><option>60 minutos</option></select></div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(80px,1fr))", gap: 6, minWidth: 620 }}>
            {week.map(w => (
              <div key={w.off} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: T.textMute, paddingBottom: 4 }}>{w.wd}</div>
                <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text, paddingBottom: 8 }}>{w.dd} {w.mm}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {adminSlots().map(h => {
                    const sel = pick && pick.dayOff === w.off && pick.time === h;
                    const blk = (appts || []).some(a => { if (a.status === "anulada" || a.status === "cancelada") return false; if (apptDayOff(a) !== w.off) return false; const as = mins(a.time), ad = parseInt(a.dur)||60, ts = mins(h); return ts >= as && ts < as + ad; });
                    return <button key={h} disabled={blk} onClick={() => !blk && setPick({ dayOff: w.off, time: h })}
                      style={{ fontFamily: T.sans, fontSize: 10.5, padding: "6px 2px", borderRadius: 5,
                        cursor: blk ? "not-allowed" : "pointer",
                        background: sel ? T.accent : (blk ? T.lineSoft : "transparent"),
                        color: sel ? T.onAccent : (blk ? T.textFaint : T.accent),
                        border: "1px solid " + (sel ? T.accent : (blk ? T.lineSoft : T.line)),
                        opacity: blk ? 0.55 : 1 }}>{h}</button>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdModal>
  );
}

function CitaEditModal({ T, appt, patients, onClose, onSave, onCancel }) {
  const D = window.JCDATA;
  const procs = (window.clinicServiceList ? Array.from(new Set(window.clinicServiceList().map(s => s.name))) : PROC_LIST());
  const [proc, setProc] = useState(appt.proc);
  const [fecha, setFecha] = useState(appt.fecha || new Date().toISOString().slice(0, 10));
  const [t, setT] = useState(appt.time);
  const [status, setStatus] = useState(appt.status || "pendiente");
  const [dur, setDur] = useState(appt.dur || "30 minutos");
  const [comentario, setComentario] = useState(appt.comentario || "");
  const [origen, setOrigen] = useState(appt.origen || "Orgánico · Instagram");
  const [confirmCancel, setConfirmCancel] = useState(false);
  const ORIGEN_ORG = ["Orgánico · Instagram", "Orgánico · Facebook", "Orgánico · TikTok", "Referido de paciente", "Pasó por la clínica (walk-in)", "Búsqueda en Google"];
  const metaCamps = ((window.CADMIN || { campaigns: [] }).campaigns || []).filter(c => c.active);
  const horas = D.availability(new Date(fecha + "T00:00:00").getDay()).slots;
  const pat = patients.find(p => p.name === appt.name);
  // La agenda ubica las citas por "day" (offset de días respecto a hoy), no por "fecha".
  // Al reprogramar hay que recalcular ese offset desde la fecha elegida, o la cita no se mueve.
  function buildPatch(extra) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const day = Math.round((new Date(fecha + "T00:00:00") - today) / 86400000);
    return Object.assign({ proc, fecha, time: t, status, comentario, origen, dur, day }, extra || {});
  }
  return (
    <AdModal T={T} title="Editar cita" onClose={onClose}
      footer={
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {appt.status === "pendiente_pago" && (
            <button onClick={() => onSave(buildPatch({ status: "confirmada" }))}
              style={{ width: "100%", fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "14px", borderRadius: 4, border: "none", background: "#1F8A5B", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>
              Confirmar transferencia · bloquear hora
            </button>
          )}
          <AdBtn T={T} primary full onClick={() => onSave(buildPatch())}>Guardar cambios</AdBtn>
          {confirmCancel
            ? <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setConfirmCancel(false)} style={{ flex: 1, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px", borderRadius: 4, border: "1px solid " + T.chipBorder, background: "transparent", color: T.textMute, cursor: "pointer" }}>Volver</button>
                <button onClick={onCancel} style={{ flex: 1, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px", borderRadius: 4, border: "none", background: "#C0285A", color: "#fff", cursor: "pointer" }}>Sí, cancelar cita</button>
              </div>
            : <button onClick={() => setConfirmCancel(true)} style={{ width: "100%", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px", borderRadius: 4, border: "1px solid #C0285A", background: "transparent", color: "#C0285A", cursor: "pointer" }}>Cancelar cita</button>}
        </div>
      }>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <Avatar T={T} name={appt.name} size={44} />
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 500, color: T.text }}>{appt.name}</div>
          {pat && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{pat.phone}</div>}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div><span style={lblS(T)}>Procedimiento</span>
          <select value={proc} onChange={e => setProc(e.target.value)} style={selS(T)}>
            <option value="Evaluación general">Evaluación general</option>
            {procOptionsByCat(procs)}
          </select>
        </div>
        <div><span style={lblS(T)}>Fecha</span><MiniCalendar T={T} selected={fecha} onSelect={setFecha} /></div>
        <div><span style={lblS(T)}>Hora</span>
          <input type="time" value={t} onChange={e => setT(e.target.value)} step={adminSlotMins() * 60}
            list="jcm-edit-hour-list" style={{ ...selS(T), cursor: "pointer" }} />
          <datalist id="jcm-edit-hour-list">
            {adminSlots().map(h => <option key={h} value={h} />)}
          </datalist>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><span style={lblS(T)}>Estado</span>
            <select value={status} onChange={e => setStatus(e.target.value)} style={selS(T)}>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
            </select>
          </div>
          <div style={{ flex: 1 }}><span style={lblS(T)}>Duración</span>
            <select value={dur} onChange={e => setDur(e.target.value)} style={selS(T)}>
              <option>15 minutos</option>
              <option>30 minutos</option>
              <option>45 minutos</option>
              <option>60 minutos</option>
              <option>90 minutos</option>
            </select>
          </div>
        </div>
        <div><span style={lblS(T)}>Comentario de la cita <span style={{ textTransform: "none", letterSpacing: 0, color: T.textFaint }}>· excepciones de pago u observaciones</span></span>
          <input value={comentario} onChange={e => setComentario(e.target.value)} placeholder="Ej. Abona el día de la atención" style={selS(T)} />
        </div>
        <div><span style={lblS(T)}>Campaña / Origen</span>
          <select value={origen} onChange={e => setOrigen(e.target.value)} style={selS(T)}>
            {ORIGEN_ORG.indexOf(origen) === -1 && metaCamps.every(c => "Meta · " + c.name !== origen) && <option value={origen}>{origen}</option>}
            <optgroup label="Orgánico / directo">
              {ORIGEN_ORG.map(o => <option key={o} value={o}>{o}</option>)}
            </optgroup>
            <optgroup label="Publicidad · Meta Ads">
              {metaCamps.map(c => <option key={c.id} value={"Meta · " + c.name}>{c.name}{c.net ? " · " + c.net : ""}</option>)}
              <option value="Meta · otra campaña">Otra campaña de Meta…</option>
            </optgroup>
          </select>
        </div>
        {pat && <a href={"https://wa.me/" + (pat.phone || "").replace(/\D/g, "")} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#1F8A5B", textDecoration: "none", border: "1px solid #1F8A5B", borderRadius: 4, padding: "12px" }}>Escribir por WhatsApp</a>}
      </div>
    </AdModal>
  );
}

Object.assign(window, { AdminApp, Resumen, AdStat, Agenda, NewCitaModal, CitaEditModal, Toast, ApptBlock, notifyCita, fmtTime, mins, nIcon, linkBtn });

/* ─────────── ACCESO AL PANEL (gate con contraseña) ─────────── */
function AdminGate() {
  const T = (window.JCTHEME && window.JCTHEME.editorial) || { bg: "#070707", surface: "#141414", line: "rgba(255,255,255,.14)", text: "#F2EDE6", textMute: "rgba(242,237,230,.6)", accent: "#B9C2CB", gold: "#B9C2CB", serif: "Cormorant Garamond, serif", sans: "Jost, sans-serif", primaryBg: "#F2EDE6", primaryText: "#070707" };
  const setup = !window.jcmAdminHasPass || !window.jcmAdminHasPass();
  const [authed, setAuthed] = useState(() => !setup && window.jcmAdminHasSession && window.jcmAdminHasSession());
  const [view, setView] = useState("main"); // main | recover | reset
  const [u, setU] = useState(""); // usuario (crear / iniciar sesión)
  const [p1, setP1] = useState(""); const [p2, setP2] = useState("");
  const [rEmail, setREmail] = useState(""); const [rWa, setRWa] = useState("");
  const [np1, setNp1] = useState(""); const [np2, setNp2] = useState("");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);

  const D = window.JCDATA || {};
  const regEmail = (((D.contact && D.contact.email) || "")).trim().toLowerCase();
  const regWa = ((D.wa || "") + "").replace(/\D/g, "");
  const dig = s => (s || "").replace(/\D/g, "");
  const maskEmail = e => { const i = e.indexOf("@"); return i > 2 ? e.slice(0, 2) + "•••" + e.slice(i) : e; };
  const maskWa = w => w.length >= 4 ? "+•• • •••• " + w.slice(-4) : w;

  async function submit() {
    setErr(""); setBusy(true);
    try {
      if (setup) {
        if (p1 !== p2) { setErr("Las contraseñas no coinciden."); setBusy(false); return; }
        const r = await window.jcmAdminSetPass(p1, u);
        if (!r.ok) { setErr(r.msg); setBusy(false); return; }
      } else {
        const r = await window.jcmAdminCheck(u, p1);
        if (!r.ok) { setErr(r.msg); setBusy(false); return; }
      }
      setAuthed(true);
    } catch (e) { setErr("Error. Intenta nuevamente."); }
    setBusy(false);
  }

  // Verifica identidad con el correo + WhatsApp registrados de la clínica.
  function verifyIdentity() {
    setErr("");
    const okMail = !!regEmail && rEmail.trim().toLowerCase() === regEmail;
    const okWa = !!regWa && dig(rWa).slice(-8) === regWa.slice(-8);
    if (!okMail || !okWa) { setErr("El correo o el WhatsApp no coinciden con los registrados de la clínica."); return; }
    setView("reset");
  }
  async function doReset() {
    setErr("");
    if ((np1 || "").length < 8) { setErr("La contraseña debe tener al menos 8 caracteres."); return; }
    if (np1 !== np2) { setErr("Las contraseñas no coinciden."); return; }
    setBusy(true);
    try { const r = await window.jcmAdminSetPass(np1, (window.jcmAdminUser && window.jcmAdminUser()) || "admin"); if (!r.ok) { setErr(r.msg); setBusy(false); return; } setAuthed(true); }
    catch (e) { setErr("Error. Intenta nuevamente."); }
    setBusy(false);
  }

  if (authed) return <AdminApp />;

  const inp = { width: "100%", padding: "13px 14px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 14, outline: "none", boxSizing: "border-box" };
  const primaryBtn = (label, onClick, disabled) => (
    <button onClick={onClick} disabled={disabled} style={{ marginTop: 4, padding: "14px", borderRadius: 6, border: "none", background: T.primaryBg, color: T.primaryText, fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1 }}>{label}</button>
  );
  const linkBtn = (label, onClick) => (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", color: T.accent, fontFamily: T.sans, fontSize: 12, textDecoration: "underline", padding: 6 }}>{label}</button>
  );

  let title, subtitle, body, footer;

  if (view === "recover") {
    title = "Recuperar acceso";
    subtitle = "Verifica tu identidad con el correo y el WhatsApp registrados de la clínica. Si coinciden, podrás crear una contraseña nueva.";
    body = (
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <input value={rEmail} autoFocus onChange={e => setREmail(e.target.value)} placeholder="Correo registrado" inputMode="email" style={inp} />
        {regEmail && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: -4 }}>Pista: {maskEmail(regEmail)}</div>}
        <input value={rWa} onChange={e => setRWa(e.target.value)} onKeyDown={e => { if (e.key === "Enter") verifyIdentity(); }} placeholder="WhatsApp registrado (+56 9 …)" inputMode="tel" style={inp} />
        {regWa && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: -4 }}>Pista: {maskWa(regWa)}</div>}
        {err && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#E0607A" }}>{err}</div>}
        {primaryBtn("Verificar", verifyIdentity, !rEmail || !rWa)}
      </div>
    );
    footer = linkBtn("← Volver al inicio de sesión", () => { setView("main"); setErr(""); });
  } else if (view === "reset") {
    title = "Crea una contraseña nueva";
    subtitle = "Identidad verificada. Define tu nueva contraseña (mínimo 8 caracteres).";
    body = (
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <input type="password" value={np1} autoFocus onChange={e => setNp1(e.target.value)} placeholder="Nueva contraseña" style={inp} />
        <input type="password" value={np2} onChange={e => setNp2(e.target.value)} onKeyDown={e => { if (e.key === "Enter") doReset(); }} placeholder="Repite la contraseña" style={inp} />
        {err && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#E0607A" }}>{err}</div>}
        {primaryBtn(busy ? "Guardando…" : "Guardar y entrar", doReset, busy || !np1)}
      </div>
    );
  } else {
    title = setup ? "Crea tu usuario" : "Acceso privado";
    subtitle = setup ? "Es la primera vez que abres el panel. Crea tu usuario y contraseña (mínimo 8 caracteres). Solo se guardan cifrados en este dispositivo." : "Ingresa tu usuario y contraseña para continuar.";
    body = (
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <input value={u} autoFocus onChange={e => setU(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !setup) submit(); }} placeholder="Usuario" autoComplete="username" style={inp} />
        <input type="password" value={p1} onChange={e => setP1(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !setup) submit(); }} placeholder={setup ? "Contraseña (mín. 8)" : "Contraseña"} autoComplete={setup ? "new-password" : "current-password"} style={inp} />
        {setup && <input type="password" value={p2} onChange={e => setP2(e.target.value)} onKeyDown={e => { if (e.key === "Enter") submit(); }} placeholder="Repite la contraseña" autoComplete="new-password" style={inp} />}
        {err && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#E0607A" }}>{err}</div>}
        {primaryBtn(busy ? "Procesando…" : (setup ? "Crear y entrar" : "Entrar"), submit, busy || !u || !p1)}
      </div>
    );
    footer = !setup ? linkBtn("¿Olvidaste tu contraseña?", () => { setView("recover"); setErr(""); }) : null;
  }

  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent, textAlign: "center" }}>Medique · Panel clínico</div>
        <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 36, color: T.text, textAlign: "center", margin: "12px 0 6px", lineHeight: 1.05 }}>{title}</h1>
        <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, textAlign: "center", lineHeight: 1.6, margin: "0 0 22px" }}>{subtitle}</p>
        {body}
        <div style={{ textAlign: "center", marginTop: 14 }}>{footer}</div>
        <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, textAlign: "center", marginTop: 10, lineHeight: 1.6 }}>Sesión protegida · expira en 4 horas de inactividad.</p>
      </div>
    </div>
  );
}
/* ─────────── TOUR DE BIENVENIDA · primer ingreso al panel (slides guiados) ─────────── */
function WelcomeTour({ T, go, onClose }) {
  const cfg0 = (() => { try { return (window.DB && DB.get("config")) || {}; } catch (e) { return {}; } })();
  const biz0 = (() => { try { return (window.DB && DB.get("clinic_biz")) || {}; } catch (e) { return {}; } })();
  const clinicNm = (() => { try { return (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && (window.JCSAAS.currentClinic() || {}).name) || ""; } catch (e) { return ""; } })();
  const STEPS = ["intro", "clinica", "rut", "equipo", "servicios", "inventario", "listo"];
  const [step, setStep] = useState(0);
  const [name, setName] = useState(cfg0.clinic_name || clinicNm || "");
  const [addr, setAddr] = useState(cfg0.clinic_addr || "");
  const [wa, setWa] = useState((cfg0.wa_number || "").replace(/^569/, "").replace(/^56/, ""));
  const [rut, setRut] = useState(biz0.rut || "");
  const [team, setTeam] = useState(() => { try { return DB.get("team") || []; } catch (e) { return []; } });
  const [svcs, setSvcs] = useState(() => { try { return DB.get("services_custom") || []; } catch (e) { return []; } });
  const [inv, setInv] = useState(() => { try { return DB.get("inv_items") || []; } catch (e) { return []; } });
  const [tN, setTN] = useState(""), [tR, setTR] = useState("");
  const SVC_CATS = ["Toxina botulínica", "Ácido hialurónico", "Bioestimulación de colágeno", "Mesoterapia", "Lipolíticos inyectables"];
  const [sN, setSN] = useState(""), [sP, setSP] = useState(""), [sD, setSD] = useState("30"), [sC, setSC] = useState(SVC_CATS[0]), [sCustom, setSCustom] = useState("");
  const [iN, setIN] = useState(""), [iS, setIS] = useState(""), [iU, setIU] = useState("unidades"), [iP, setIP] = useState("");
  const uid = pre => (window.jcmUid ? window.jcmUid(pre) : pre + Date.now());
  function saveClinic() { try { var c = DB.get("config") || {}; c.clinic_name = name.trim(); c.clinic_addr = addr.trim(); c.wa_number = wa ? ("569" + wa) : ""; DB.set("config", c); } catch (e) {} }
  function saveRut() { try { var b = DB.get("clinic_biz") || { razon: "", rut: "", plan: "" }; b.rut = rut.trim(); DB.set("clinic_biz", b); } catch (e) {} }
  // Lee el valor más reciente desde la BD (no el estado capturado al montar): evita pisar
  // miembros/servicios agregados por el onboarding previo o por clics rápidos.
  function freshList(key, fallback) { try { var v = DB.get(key); return Array.isArray(v) ? v : fallback; } catch (e) { return fallback; } }
  function addTeam() {
    if (tN.trim().length < 2) return;
    var n = freshList("team", team).concat([{ id: uid("t"), name: tN.trim(), role: tR.trim() || "Profesional", active: true, color: "#8B9EB0" }]);
    setTeam(n); try { DB.set("team", n); } catch (e) {}
    if (window.CADMIN) window.CADMIN.team = n; // fuente en vivo que lee el resto del panel
    setTN(""); setTR("");
  }
  function addSvc() {
    if (sN.trim().length < 2) return;
    var catVal = (sC === "__other__") ? (sCustom.trim() || "Otro") : sC;
    var n = [{ id: uid("svc"), name: sN.trim(), cat: catVal, price: parseInt((sP + "").replace(/\D/g, ""), 10) || 0, dur: parseInt(sD, 10) || 30, pts: 0, desc: "" }].concat(freshList("services_custom", svcs));
    setSvcs(n); try { DB.set("services_custom", n); } catch (e) {}
    setSN(""); setSP(""); setSD("30"); // se mantiene la categoría para agregar varios de la misma
  }
  function addInv() { if (iN.trim().length < 2) return; var n = freshList("inv_items", inv).concat([{ id: uid("i"), name: iN.trim(), cat: "Insumo clínico", stock: parseInt((iS + "").replace(/\D/g, ""), 10) || 0, min: 0, unit: iU || "unidades", price: parseInt((iP + "").replace(/\D/g, ""), 10) || 0 }]); setInv(n); try { DB.set("inv_items", n); } catch (e) {} setIN(""); setIS(""); setIP(""); }
  function onWa(v) { var d = (v || "").replace(/\D/g, ""); if (d.indexOf("56") === 0) d = d.slice(2); if (d.charAt(0) === "9") d = d.slice(1); setWa(d.slice(0, 8)); }
  function rmFrom(list, setList, key, id) { var n = list.filter(x => x.id !== id); setList(n); try { DB.set(key, n); } catch (e) {} if (key === "team" && window.CADMIN) window.CADMIN.team = n; }
  const kind = STEPS[step];
  function next() { if (kind === "clinica") saveClinic(); if (kind === "rut") saveRut(); setStep(s => Math.min(s + 1, STEPS.length - 1)); }
  function back() { setStep(s => Math.max(s - 1, 0)); }
  const inp = { width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid " + T.line, borderRadius: 9, padding: "11px 13px", fontFamily: T.sans, fontSize: 14, color: T.text, outline: "none", boxSizing: "border-box" };
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const titleS = { fontFamily: T.serif, fontSize: 22, color: T.text, marginBottom: 6 };
  const subS = { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5, marginBottom: 16 };
  const field = (label, node) => <label style={{ display: "block", marginBottom: 12 }}><span style={lbl}>{label}</span>{node}</label>;
  const chip = (txt, onDel) => <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.surface, border: "1px solid " + T.line, borderRadius: 999, padding: "5px 6px 5px 11px", fontFamily: T.sans, fontSize: 12, color: T.text, margin: "0 6px 6px 0" }}>{txt}<button onClick={onDel} style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 1 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg></button></span>;
  const addBtn = onClick => <button onClick={onClick} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.primaryText || "#fff", background: T.primaryBg || T.accent, border: "none", borderRadius: 9, padding: "0 16px", cursor: "pointer" }}>Agregar</button>;
  const delBtn = onClick => <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg></button>;
  const rowItem = (main, meta, onDel) => <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: "8px 11px" }}><span style={{ flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 13, color: T.text }}>{main}</span>{meta && <span style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute }}>{meta}</span>}{delBtn(onDel)}</div>;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(8,12,20,.62)", backdropFilter: "blur(7px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 480, maxHeight: "88vh", display: "flex", flexDirection: "column", background: T.bg, border: "1px solid " + T.line, borderRadius: 18, padding: "22px 22px 18px", animation: "jcSlideUp .4s cubic-bezier(.22,1,.36,1) both", boxShadow: "0 30px 80px -30px rgba(0,0,0,.6)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
          <span style={{ width: 38, height: 38, borderRadius: 10, background: "#F2EDE6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 10px -3px rgba(0,0,0,.5)" }}>
            <img src="/assets/medique-logo.png" alt="Medique" style={{ width: 33, height: 33, objectFit: "contain" }} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text, lineHeight: 1 }}>Configura tu clínica</div>
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 3 }}>Paso {step + 1} de {STEPS.length}</div>
          </div>
          <button onClick={onClose} title="Cerrar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 4 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>

        <div key={step} className="jc-scroll" style={{ animation: "jcFade .3s ease both", overflowY: "auto", flex: 1, minHeight: 200, paddingRight: 2 }}>
          {kind === "intro" && (
            <div style={{ textAlign: "center", paddingTop: 6 }}>
              <div style={titleS}>¡Bienvenido a Medique!</div>
              <div style={{ ...subS, textAlign: "center", maxWidth: 360, margin: "0 auto" }}>Vamos a dejar tu clínica lista en unos pasos. Completa lo básico aquí mismo — toma un par de minutos y puedes saltar lo que quieras.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 18, textAlign: "left" }}>
                {[["Datos de tu clínica", "Nombre, dirección y WhatsApp"], ["RUT de la clínica", "Para tus documentos"], ["Profesionales", "Quién atiende"], ["Servicios", "Tus procedimientos y precios"], ["Inventario", "Tus insumos"]].map((c, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 11, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "10px 13px" }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: T.accent + "1c", color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 11, fontWeight: 700 }}>{idx + 1}</span>
                    <span style={{ flex: 1 }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{c[0]}</span><span style={{ display: "block", fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{c[1]}</span></span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {kind === "clinica" && (<>
            <div style={titleS}>Datos de tu clínica</div>
            <div style={subS}>Aparecen en tu página de reserva y en los mensajes a tus pacientes.</div>
            {field("Nombre de la clínica", <input value={name} onChange={e => setName(e.target.value)} placeholder="Ej: Clínica Aurora" style={inp} />)}
            {field("Dirección", <input value={addr} onChange={e => setAddr(e.target.value)} placeholder="Calle, número, ciudad" style={inp} />)}
            {field("WhatsApp de contacto", <input value={"+56 9 " + wa} onChange={e => onWa(e.target.value)} inputMode="numeric" style={inp} />)}
          </>)}
          {kind === "rut" && (<>
            <div style={titleS}>RUT de la clínica</div>
            <div style={subS}>El RUT de tu empresa (o el tuyo), para los documentos y la facturación.</div>
            {field("RUT", <input value={rut} onChange={e => setRut(window.jcmFmtRut ? window.jcmFmtRut(e.target.value) : e.target.value)} placeholder="xx.xxx.xxx-x" style={inp} />)}
            {rut.trim() && window.jcmValidRut && !window.jcmValidRut(rut) && <div style={{ fontFamily: T.sans, fontSize: 11, color: "#C0285A", marginTop: -6 }}>Revisa el dígito verificador.</div>}
          </>)}
          {kind === "equipo" && (<>
            <div style={titleS}>Profesionales</div>
            <div style={subS}>Quién realiza las atenciones. Agrega al menos uno (puedes sumar más después en Equipo).</div>
            <div style={{ display: "flex", flexWrap: "wrap", marginBottom: team.length ? 12 : 0 }}>{team.map(m => <span key={m.id}>{chip(m.name, () => rmFrom(team, setTeam, "team", m.id))}</span>)}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <input value={tN} onChange={e => setTN(e.target.value)} placeholder="Nombre" style={inp} />
              <input value={tR} onChange={e => setTR(e.target.value)} placeholder="Rol (ej. Médico)" style={inp} />
            </div>
            <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>{addBtn(addTeam)}</div>
          </>)}
          {kind === "servicios" && (<>
            <div style={titleS}>Servicios</div>
            <div style={subS}>Tus procedimientos con categoría, precio y duración. Aparecen en la agenda y en tu reserva online.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: svcs.length ? 12 : 0 }}>{svcs.map(s => <div key={s.id}>{rowItem(s.name, [s.cat, (s.price ? "$" + s.price.toLocaleString("es-CL") : ""), s.dur + "min"].filter(Boolean).join(" · "), () => rmFrom(svcs, setSvcs, "services_custom", s.id))}</div>)}</div>
            <input value={sN} onChange={e => setSN(e.target.value)} placeholder="Nombre del servicio" style={{ ...inp, marginBottom: 8 }} />
            <select value={sC} onChange={e => setSC(e.target.value)} style={{ ...inp, marginBottom: 8 }}>
              {SVC_CATS.map(c => <option key={c} value={c}>{c}</option>)}
              <option value="__other__">Otra categoría (escribir)…</option>
            </select>
            {sC === "__other__" && <input value={sCustom} onChange={e => setSCustom(e.target.value)} placeholder="Nombre de la categoría" style={{ ...inp, marginBottom: 8 }} />}
            <div style={{ display: "flex", gap: 8 }}>
              <input value={sP} onChange={e => setSP(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Precio $" style={inp} />
              <select value={sD} onChange={e => setSD(e.target.value)} style={{ ...inp, width: 100 }}>{[15, 30, 45, 60, 90].map(d => <option key={d} value={String(d)}>{d} min</option>)}</select>
              {addBtn(addSvc)}
            </div>
          </>)}
          {kind === "inventario" && (<>
            <div style={titleS}>Inventario</div>
            <div style={subS}>Tus insumos y su stock. Opcional, pero te ayuda a controlar lo que usas.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: inv.length ? 12 : 0 }}>{inv.map(it => <div key={it.id}>{rowItem(it.name, it.stock + " " + it.unit + (it.price ? " · $" + Number(it.price).toLocaleString("es-CL") : ""), () => rmFrom(inv, setInv, "inv_items", it.id))}</div>)}</div>
            <input value={iN} onChange={e => setIN(e.target.value)} placeholder="Nombre del insumo" style={{ ...inp, marginBottom: 8 }} />
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input value={iS} onChange={e => setIS(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Stock" style={inp} />
              <select value={iU} onChange={e => setIU(e.target.value)} style={{ ...inp, width: 120 }}>
                {["unidades", "viales", "jeringas", "tubos", "cajas", "paquetes", "rollos"].map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={iP ? Number(iP).toLocaleString("es-CL") : ""} onChange={e => setIP(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Costo por unidad $" style={inp} />
              {addBtn(addInv)}
            </div>
          </>)}
          {kind === "listo" && (
            <div style={{ textAlign: "center", paddingTop: 10 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(31,138,91,.14)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1F8A5B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </div>
              <div style={titleS}>Tu clínica está configurada y puedes usarla</div>
              <div style={{ ...subS, textAlign: "center", maxWidth: 360, margin: "0 auto" }}>Todo quedó guardado. Puedes ajustar cualquier dato cuando quieras desde cada sección del panel.</div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "16px 0 14px" }}>
          {STEPS.map((_, idx) => <span key={idx} style={{ width: idx === step ? 18 : 7, height: 7, borderRadius: 999, background: idx === step ? T.accent : T.line, transition: "width .25s, background .25s" }} />)}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {kind === "listo" ? (
            <button onClick={onClose} style={{ flex: 1, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.primaryText || "#fff", background: T.primaryBg || T.accent, border: "none", borderRadius: 9, padding: "13px", cursor: "pointer" }}>Empezar a usar Medique</button>
          ) : (<>
            {step > 0
              ? <button onClick={back} style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, background: "transparent", border: "1px solid " + T.line, borderRadius: 9, padding: "11px 16px", cursor: "pointer" }}>Anterior</button>
              : <button onClick={onClose} style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, background: "transparent", border: "none", padding: "11px 6px", cursor: "pointer" }}>Saltar</button>}
            <div style={{ flex: 1 }} />
            <button onClick={next} style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.primaryText || "#fff", background: T.primaryBg || T.accent, border: "none", borderRadius: 9, padding: "12px 22px", cursor: "pointer" }}>{kind === "intro" ? "Comenzar" : "Guardar y seguir"}</button>
          </>)}
        </div>
      </div>
    </div>
  );
}
/* ─────────── ONBOARDING · primer ingreso de una clínica nueva ─────────── */
function OnboardingWizard({ T, onDone }) {
  const clinic = (window.JCSAAS && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic()) || {};
  const cfg0 = (window.DB && window.DB.get("config")) || {};
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(clinic.name || cfg0.clinic_name || "");
  const [addr, setAddr] = useState(cfg0.clinic_addr || "");
  const [wa, setWa] = useState(cfg0.wa_number || "");
  const OB_DAYS = [["Lun", 1], ["Mar", 2], ["Mié", 3], ["Jue", 4], ["Vie", 5], ["Sáb", 6], ["Dom", 0]];
  const OB_TIMES = (() => { const a = []; for (let h = 7; h <= 22; h++) { a.push((h < 10 ? "0" : "") + h + ":00"); if (h < 22) a.push((h < 10 ? "0" : "") + h + ":30"); } return a; })();
  const [sched, setSched] = useState(() => {
    if (cfg0.clinic_hours_struct) return cfg0.clinic_hours_struct;
    var def = {}; OB_DAYS.forEach(function (d) { def[d[1]] = { on: d[1] >= 1 && d[1] <= 5, from: "10:00", to: "19:00" }; }); return def;
  });
  // Resumen legible a partir del horario estructurado (agrupa días con el mismo rango).
  function buildHoursStr(sc) {
    var groups = {};
    OB_DAYS.forEach(function (d) { var s = sc[d[1]]; if (s && s.on) { var k = s.from + "–" + s.to; (groups[k] = groups[k] || []).push(d[0]); } });
    return Object.keys(groups).map(function (k) { return groups[k].join(", ") + " " + k; }).join(" · ");
  }
  function onWaOb(v) {
    var dgt = (v || "").replace(/\D/g, "");
    if (dgt.indexOf("56") === 0) dgt = dgt.slice(2);  // código de país
    if (dgt.charAt(0) === "9") dgt = dgt.slice(1);    // el 9 móvil del prefijo visible (+56 9); el resto es el número
    dgt = dgt.slice(0, 8);
    setWa("569" + dgt);
  }
  var waObDisplay = "+56 9 " + ((wa || "").replace(/^569/, "").replace(/^56/, ""));
  const [memName, setMemName] = useState("");
  const [memRole, setMemRole] = useState("");
  const [meta, setMeta] = useState("");

  const steps = [
    { k: "clinica", n: "Tu clínica", t: "Cuéntanos de tu clínica", s: "Estos datos aparecen en tu página de reserva y en las confirmaciones a tus pacientes. Puedes editarlos cuando quieras desde Configuración." },
    { k: "equipo", n: "Tu equipo", t: "Agrega tu primer profesional", s: "Quién realiza las atenciones. Podrás sumar más miembros y permisos desde la sección Equipo." },
    { k: "marketing", n: "Marketing", t: "Conecta tu inversión (opcional)", s: "Si haces campañas en Meta, registra tu gasto mensual para ver tu retorno real. También puedes hacerlo más tarde." }
  ];
  const cur = steps[step];
  const last = step === steps.length - 1;

  function finish() {
    setSaving(true);
    try {
      var cfg = (window.DB && window.DB.get("config")) || {};
      cfg.clinic_name = name.trim();
      cfg.clinic_addr = addr.trim();
      cfg.wa_number = (wa || "").replace(/\D/g, "");
      cfg.clinic_hours_struct = sched;
      cfg.clinic_hours = buildHoursStr(sched);
      if ((meta || "").replace(/\D/g, "")) cfg.meta_spend_mes = parseInt(meta.replace(/\D/g, ""), 10) || 0;
      window.DB && window.DB.set("config", cfg);
      if (memName.trim()) {
        var team = (window.DB && window.DB.get("team")) || [];
        team.push({ id: "t" + Date.now(), name: memName.trim(), role: (memRole.trim() || "Profesional"), active: true, color: "#8B9EB0" });
        window.DB && window.DB.set("team", team);
        if (window.CADMIN) window.CADMIN.team = team;
      }
      window.DB && window.DB.set("onboarded_v1", true);
    } catch (e) {}
    onDone();
  }
  function next() { if (last) finish(); else setStep(step + 1); }
  // En el paso 1 exigimos el nombre de la clínica; el resto es opcional.
  const canNext = step !== 0 || name.trim().length > 1;

  const field = (label, value, set, opts) => {
    opts = opts || {};
    return (
      <label style={{ display: "block", marginBottom: 13 }}>
        <span style={{ display: "block", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>{label}</span>
        <input value={value} onChange={e => set(e.target.value)} type={opts.type || "text"} inputMode={opts.inputMode} data-only={opts.only} placeholder={opts.ph}
          style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", fontFamily: T.sans, fontSize: 14, color: T.text, outline: "none" }} />
      </label>
    );
  };

  return (
    <div className="jc-stage" style={{ background: T.bg, minHeight: "100dvh", padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 460, animation: "jcSlideUp .5s cubic-bezier(.22,1,.36,1) both" }}>
        {/* Encabezado */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 22 }}>
          <span style={{ width: 42, height: 42, borderRadius: 11, background: "#F2EDE6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 10px -3px rgba(0,0,0,.5)" }}>
            <img src="/assets/medique-logo.png" alt="Medique" style={{ width: 37, height: 37, objectFit: "contain" }} />
          </span>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: 20, color: T.text, lineHeight: 1 }}>Bienvenido a Medique</div>
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3 }}>Configuremos tu clínica en 3 pasos</div>
          </div>
        </div>

        {/* Progreso */}
        <div style={{ display: "flex", gap: 7, marginBottom: 24 }}>
          {steps.map((s, i) => (
            <div key={s.k} style={{ flex: 1 }}>
              <div style={{ height: 4, borderRadius: 4, background: i <= step ? T.primaryBg : "rgba(255,255,255,.12)", transition: "background .3s ease" }} />
              <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: i <= step ? T.text : T.textMute, marginTop: 7 }}>{s.n}</div>
            </div>
          ))}
        </div>

        {/* Tarjeta del paso */}
        <div key={cur.k} style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 16, padding: "22px 20px", animation: "jcFade .35s ease both" }}>
          <div style={{ fontFamily: T.serif, fontSize: 22, color: T.text, marginBottom: 6 }}>{cur.t}</div>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.55, marginBottom: 20 }}>{cur.s}</div>

          {step === 0 && (<>
            {field("Nombre de la clínica", name, setName, { ph: "Ej. Clínica Aurora" })}
            {field("Dirección", addr, setAddr, { ph: "Calle, número, ciudad" })}
            {/* WhatsApp con prefijo +56 9 fijo (no se borra), solo números */}
            <label style={{ display: "block", marginBottom: 13 }}>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>WhatsApp de contacto</span>
              <input value={waObDisplay} onChange={e => onWaOb(e.target.value)} inputMode="numeric" placeholder="+56 9 1234 5678"
                style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", fontFamily: T.sans, fontSize: 14, color: T.text, outline: "none" }} />
            </label>
            {/* Horario de atención: días seleccionables + rango horario por día */}
            <div style={{ marginBottom: 4 }}>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Horario de atención</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {OB_DAYS.map(([lbl, v]) => {
                  const s = sched[v] || { on: false, from: "10:00", to: "19:00" };
                  const setDay = patch => setSched({ ...sched, [v]: { ...s, ...patch } });
                  // Desplegables on-brand (en vez del selector nativo de hora, que se ve anticuado).
                  const wrap = { position: "relative", display: "inline-flex", alignItems: "center" };
                  const selTime = { appearance: "none", WebkitAppearance: "none", MozAppearance: "none", background: "rgba(255,255,255,.05)", border: "1px solid " + T.line, borderRadius: 9, padding: "8px 26px 8px 11px", fontFamily: T.sans, fontSize: 13, color: T.text, outline: "none", cursor: "pointer", width: 92 };
                  const caret = <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="2.4" style={{ position: "absolute", right: 9, pointerEvents: "none" }}><path d="M6 9l6 6 6-6" /></svg>;
                  const timeSel = (val, key) => (
                    <span style={wrap}>
                      <select value={val} onChange={e => setDay({ [key]: e.target.value })} style={selTime}>
                        {OB_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>{caret}
                    </span>
                  );
                  return (
                    <div key={v} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => setDay({ on: !s.on })} style={{ width: 54, flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, padding: "9px 0", borderRadius: 9, cursor: "pointer", background: s.on ? T.primaryBg : "transparent", color: s.on ? T.primaryText : T.textMute, border: "1px solid " + (s.on ? T.primaryBg : T.line) }}>{lbl}</button>
                      {s.on ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                          {timeSel(s.from, "from")}
                          <span style={{ color: T.textMute, fontSize: 12 }}>a</span>
                          {timeSel(s.to, "to")}
                        </div>
                      ) : <span style={{ flex: 1, fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Cerrado</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </>)}

          {step === 1 && (<>
            {field("Nombre del profesional", memName, setMemName, { ph: "Ej. Dra. Camila Soto" })}
            {field("Rol o especialidad", memRole, setMemRole, { ph: "Ej. Médico cirujano" })}
            <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 4 }}>¿Trabajas sola/o? Puedes dejarlo en blanco y configurarlo después.</div>
          </>)}

          {step === 2 && (<>
            {field("Gasto mensual en Meta Ads (CLP)", meta, setMeta, { type: "tel", inputMode: "numeric", only: "num", ph: "Ej. 300000" })}
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.55, marginTop: 4 }}>Esto activa tu embudo de retorno (ROAS) en el panel. La conexión completa con tu cuenta de Meta la haces desde <b style={{ color: T.text }}>Marketing</b> cuando quieras.</div>
          </>)}
        </div>

        {/* Acciones */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
          {step > 0
            ? <button onClick={() => setStep(step - 1)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 13, color: T.textMute }}>← Atrás</button>
            : <button onClick={finish} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, color: T.textMute }}>Saltar por ahora</button>}
          <div style={{ flex: 1 }} />
          <button onClick={next} disabled={!canNext || saving}
            style={{ background: canNext ? T.primaryBg : "rgba(255,255,255,.12)", color: canNext ? T.primaryText : T.textMute, border: "none", borderRadius: 11, padding: "13px 26px", fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, cursor: canNext ? "pointer" : "default", letterSpacing: ".01em" }}>
            {last ? "Entrar al panel" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── ACCESO SaaS (multi-clínica · Firebase) ─────────── */
function SaasGate() {
  const T = (window.JCTHEME && window.JCTHEME.editorial) || { bg: "#070707", surface: "#141414", line: "rgba(255,255,255,.14)", text: "#F2EDE6", textMute: "rgba(242,237,230,.6)", accent: "#B9C2CB", gold: "#B9C2CB", serif: "Cormorant Garamond, serif", sans: "Jost, sans-serif", primaryBg: "#F2EDE6", primaryText: "#070707" };
  const [phase, setPhase] = useState("loading"); // loading | auth | blocked | otp | migrate | onboarding | app
  const [view, setView] = useState("login");      // login | register | recover
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(""); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  // 2FA por email (solo si JCSAAS_CONFIG.mfa === true): código en dispositivo nuevo.
  const [otpInfo, setOtpInfo] = useState(null); const [otpCode, setOtpCode] = useState(""); const [otpErr, setOtpErr] = useState("");
  const MFA_ON = !!(window.JCSAAS_CONFIG && window.JCSAAS_CONFIG.mfa === true);
  function devKey() { try { return "jcm_2fadev_" + (window.JCSAAS.currentClinicId() || ""); } catch (e) { return "jcm_2fadev_"; } }
  function proceed() {
    if (window.JCSAAS.isFreshClinic() && window.JCSAAS.hasLegacyData()) { setPhase("migrate"); return; }
    scopeClinicData();
    if (!window.JCM_BASE && !(window.DB && window.DB.get("onboarded_v1"))) { setPhase("onboarding"); return; }
    importAllWeb().finally(function () { setPhase("app"); });
  }
  function otpSend() {
    setOtpErr(""); setOtpCode("");
    window.mediqueOtp("send", {}).then(function (r) {
      if (r && r.ok) setOtpInfo(r);
      else setOtpErr((r && r.error) || "No se pudo enviar el código.");
    });
  }
  function otpVerify() {
    if (!otpInfo) return;
    setOtpErr("");
    window.mediqueOtp("verify", { code: otpCode.trim(), exp: otpInfo.exp, sig: otpInfo.sig }).then(function (r) {
      if (r && r.ok && r.device) { try { localStorage.setItem(devKey(), r.device); } catch (e) {} proceed(); }
      else setOtpErr((r && r.error) || "Código incorrecto.");
    });
  }

  useEffect(() => {
    window.JCSAAS.onAuth(payload => {
      if (!payload || payload.incomplete) { setPhase("auth"); return; }
      const a = window.JCSAAS.access();
      if (!a.ok) { setPhase("blocked"); return; }
      // 2FA: si está activa y este dispositivo no es de confianza, pedir código por email.
      if (MFA_ON) {
        let dev = ""; try { dev = localStorage.getItem(devKey()) || ""; } catch (e) {}
        window.mediqueOtp("check", { device: dev }).then(function (r) {
          if (r && r.ok && r.trusted) { proceed(); }
          else if (r && r.ok) { setPhase("otp"); otpSend(); }   // configurado pero dispositivo nuevo
          else { proceed(); }                                    // endpoint no configurado/falla → no bloquear
        }).catch(function () { proceed(); });
        return;
      }
      proceed();
    });
    const t = setTimeout(() => setPhase(p => p === "loading" ? "auth" : p), 9000);
    return () => clearTimeout(t);
  }, []);

  async function doLogin() { setErr(""); setBusy(true); try { await window.JCSAAS.login(email, pass); } catch (e) { setErr(authMsg(e)); setBusy(false); } }
  async function doRegister() { setErr(""); setBusy(true); try { await window.JCSAAS.register({ clinicName: clinic, email, password: pass }); } catch (e) { setErr(e && e.msg ? e.msg : authMsg(e)); setBusy(false); } }
  async function doRecover() { setErr(""); setMsg(""); setBusy(true); try { await window.JCSAAS.resetPassword(email); setMsg("Te enviamos un correo para restablecer tu contraseña."); } catch (e) { setErr(authMsg(e)); } setBusy(false); }
  async function doMigrate(importing) {
    setBusy(true);
    if (importing) { try { await window.JCSAAS.migrateLocal(); } catch (e) {} }
    setBusy(false); scopeClinicData(); importAllWeb().finally(function () { setPhase("app"); });
  }
  function authMsg(e) {
    const c = (e && e.code) || "";
    if (c.indexOf("email-already-in-use") >= 0) return "Ese correo ya tiene una cuenta. Inicia sesión.";
    if (c.indexOf("invalid-credential") >= 0 || c.indexOf("wrong-password") >= 0 || c.indexOf("user-not-found") >= 0) return "Correo o contraseña incorrectos.";
    if (c.indexOf("invalid-email") >= 0) return "El correo no es válido.";
    if (c.indexOf("weak-password") >= 0) return "La contraseña debe tener al menos 6 caracteres.";
    if (c.indexOf("too-many-requests") >= 0) return "Demasiados intentos. Espera unos minutos.";
    if (c.indexOf("network") >= 0) return "Sin conexión. Revisa tu internet.";
    if (c.indexOf("configuration-not-found") >= 0) return "Falta habilitar Correo/contraseña en Firebase.";
    return "No se pudo completar. Intenta nuevamente.";
  }

  if (phase === "app") return <AdminApp />;
  if (phase === "onboarding") return <OnboardingWizard T={T} onDone={() => { try { importAllWeb(); } catch (e) {} setPhase("app"); }} />;

  const inp = { width: "100%", padding: "13px 14px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 14, outline: "none", boxSizing: "border-box" };
  const pBtn = (label, onClick, disabled) => (<button onClick={onClick} disabled={disabled} style={{ marginTop: 4, padding: "14px", borderRadius: 6, border: "none", background: T.primaryBg, color: T.primaryText, fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1 }}>{label}</button>);
  const gBtn = (label, onClick) => (<button onClick={onClick} style={{ marginTop: 4, padding: "13px", borderRadius: 6, border: "1px solid " + T.line, background: "transparent", color: T.text, fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer" }}>{label}</button>);
  const link = (label, onClick) => (<button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", color: T.accent, fontFamily: T.sans, fontSize: 12, textDecoration: "underline", padding: 6 }}>{label}</button>);
  const wrap = (title, subtitle, body, footer) => (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent, textAlign: "center" }}>Medique · Panel clínico</div>
        <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 34, color: T.text, textAlign: "center", margin: "12px 0 6px", lineHeight: 1.05 }}>{title}</h1>
        <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, textAlign: "center", lineHeight: 1.6, margin: "0 0 22px" }}>{subtitle}</p>
        {body}
        <div style={{ textAlign: "center", marginTop: 14 }}>{footer}</div>
      </div>
    </div>
  );

  if (phase === "loading") return wrap("Conectando…", "Verificando tu sesión.", <div style={{ textAlign: "center", color: T.textMute, fontFamily: T.sans, fontSize: 12 }}>Un momento…</div>, null);

  if (phase === "otp") {
    return wrap("Verifica que eres tú", otpInfo
      ? ("Es la primera vez que entras desde este dispositivo. Te enviamos un código de 6 dígitos a " + (otpInfo.email || "tu correo") + ".")
      : "Enviando un código de verificación a tu correo…",
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <input value={otpCode} autoFocus onChange={e => { setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setOtpErr(""); }}
          onKeyDown={e => { if (e.key === "Enter" && otpCode.length === 6) otpVerify(); }} inputMode="numeric" placeholder="······"
          data-nocap="" style={{ ...inp, textAlign: "center", letterSpacing: ".5em", fontSize: 22 }} />
        {otpErr && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#E0607A" }}>{otpErr}</div>}
        {pBtn("Verificar y entrar", otpVerify, otpCode.length !== 6)}
        <div style={{ textAlign: "center" }}>{link("Reenviar código", otpSend)}</div>
      </div>,
      link("Cerrar sesión", () => window.JCSAAS.logout()));
  }

  if (phase === "migrate") {
    const cn = (window.JCSAAS.currentClinic() || {}).name || "tu clínica";
    return wrap("Importar tus datos", "Detectamos datos de una clínica guardados en este equipo. ¿Quieres importarlos a " + cn + "? (agenda, pacientes, caja, inventario, configuración…)",
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {pBtn(busy ? "Importando…" : "Sí, importar mis datos", () => doMigrate(true), busy)}
        {gBtn("Empezar desde cero", () => doMigrate(false))}
      </div>, null);
  }

  if (phase === "blocked") {
    const a = window.JCSAAS.access();
    // Cuenta recién creada: en revisión hasta que el super-admin la apruebe en /admin.
    if (a.status === "pending") {
      return wrap("Cuenta en revisión", "¡Gracias por registrar tu clínica! Tu cuenta quedó creada y está pendiente de aprobación. Te avisaremos apenas la activemos (suele ser muy rápido).",
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <a href={"https://wa.me/56997880877?text=" + encodeURIComponent("Hola, acabo de registrar mi clínica en Medique y quiero solicitar acceso a mi cuenta.")} target="_blank" rel="noopener" style={{ textDecoration: "none", display: "block", textAlign: "center" }}>{pBtn("Solicitar acceso por WhatsApp", () => {}, false)}</a>
          {link("Cerrar sesión", () => window.JCSAAS.logout())}
        </div>, null);
    }
    if (a.status === "rejected") {
      return wrap("Solicitud no aprobada", "Tu solicitud de cuenta no fue aprobada. Si crees que es un error, contáctanos por WhatsApp.",
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          <a href={"https://wa.me/56997880877?text=" + encodeURIComponent("Hola, mi solicitud de cuenta en Medique no fue aprobada y quiero consultar.")} target="_blank" rel="noopener" style={{ textDecoration: "none" }}>{pBtn("Contactar por WhatsApp", () => {}, false)}</a>
          {link("Cerrar sesión", () => window.JCSAAS.logout())}
        </div>, null);
    }
    const txt = a.status === "trial_expired" ? "Tu prueba gratuita de 14 días terminó." : (a.status === "suspended" ? "Tu cuenta está suspendida." : "Tu plan no está activo.");
    return wrap("Plan inactivo", txt + " Para reactivar el acceso, escríbenos por WhatsApp y activamos tu plan.",
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <a href={"https://wa.me/56997880877?text=" + encodeURIComponent("Hola, quiero activar el plan de mi clínica en el panel.")} target="_blank" rel="noopener" style={{ textDecoration: "none" }}>{pBtn("Activar por WhatsApp", () => {}, false)}</a>
        {link("Cerrar sesión", () => window.JCSAAS.logout())}
      </div>, null);
  }

  if (view === "register") {
    return wrap("Crea tu clínica", "Tu cuenta queda en revisión y la aprobamos a la brevedad. Luego tienes 14 días de prueba gratis, sin tarjeta.",
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <input value={clinic} autoFocus onChange={e => setClinic(e.target.value)} placeholder="Nombre de la clínica" style={inp} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" inputMode="email" autoComplete="email" data-nocap="" style={inp} />
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => { if (e.key === "Enter") doRegister(); }} placeholder="Contraseña (mín. 6)" autoComplete="new-password" style={inp} />
        {err && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#E0607A" }}>{err}</div>}
        {pBtn(busy ? "Creando…" : "Crear cuenta y empezar", doRegister, busy || !clinic || !email || !pass)}
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, textAlign: "center", marginTop: 2 }}>
          Al crear tu cuenta aceptas los <a href="/terminos" target="_blank" rel="noopener" style={{ color: T.accent, textDecoration: "underline" }}>Términos de Servicio</a> y la <a href="/privacidad" target="_blank" rel="noopener" style={{ color: T.accent, textDecoration: "underline" }}>Política de Privacidad</a>.
        </div>
      </div>,
      <span style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute }}>¿Ya tienes cuenta? {link("Inicia sesión", () => { setView("login"); setErr(""); })}</span>);
  }
  if (view === "recover") {
    return wrap("Recuperar contraseña", "Te enviaremos un enlace a tu correo para restablecerla.",
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <input value={email} autoFocus onChange={e => setEmail(e.target.value)} placeholder="Correo de tu cuenta" inputMode="email" data-nocap="" style={inp} />
        {err && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#E0607A" }}>{err}</div>}
        {msg && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#56b58b" }}>{msg}</div>}
        {pBtn(busy ? "Enviando…" : "Enviar enlace", doRecover, busy || !email)}
      </div>,
      link("← Volver", () => { setView("login"); setErr(""); setMsg(""); }));
  }
  return wrap("Iniciar sesión", "Entra al panel de tu clínica.",
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      <input value={email} autoFocus onChange={e => setEmail(e.target.value)} placeholder="Correo" inputMode="email" autoComplete="email" data-nocap="" style={inp} />
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => { if (e.key === "Enter") doLogin(); }} placeholder="Contraseña" autoComplete="current-password" style={inp} />
      {err && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#E0607A" }}>{err}</div>}
      {pBtn(busy ? "Entrando…" : "Entrar", doLogin, busy || !email || !pass)}
      <div style={{ textAlign: "center" }}>{link("¿Olvidaste tu contraseña?", () => { setView("recover"); setErr(""); })}</div>
    </div>,
    <span style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute }}>¿Clínica nueva? {link("Crear cuenta (14 días gratis)", () => { setView("register"); setErr(""); })}</span>);
}

Object.assign(window, { AdminGate, SaasGate });
ReactDOM.createRoot(document.getElementById("root")).render(
  (window.JCSAAS && window.JCSAAS.enabled) ? <SaasGate /> : <AdminGate />
);
