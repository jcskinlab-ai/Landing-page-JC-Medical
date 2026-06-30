function fmtTime(d) {
  return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
}
function mins(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function nIcon(name, c) {
  const p = {
    resumen: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1.5" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1.5" }), /* @__PURE__ */ React.createElement("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1.5" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1.5" })),
    agenda: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4" })),
    pacientes: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "8", r: "3.2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 20a6 6 0 0 1 12 0M16 11h5M18.5 8.5v5" })),
    pendientes: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M9 11l3 3 8-8" }), /* @__PURE__ */ React.createElement("path", { d: "M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" })),
    servicios: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 7h16M4 12h16M4 17h10" })),
    equipo: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "8", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M2 20a6 6 0 0 1 11 0M16 6a3 3 0 0 1 0 6M22 20a6 6 0 0 0-5-5.9" })),
    fidelidad: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8z" })),
    marketing: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 11v3a1 1 0 0 0 1 1h3l4 4V7L7 11H4a1 1 0 0 0-1 0z" }), /* @__PURE__ */ React.createElement("path", { d: "M16 9a3 3 0 0 1 0 6" })),
    integraciones: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "8", height: "8", rx: "2" }), /* @__PURE__ */ React.createElement("rect", { x: "13", y: "3", width: "8", height: "8", rx: "2" }), /* @__PURE__ */ React.createElement("rect", { x: "3", y: "13", width: "8", height: "8", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M17 13v8M21 17h-8" })),
    reportes: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 20V10M10 20V4M16 20v-7M22 20H2" })),
    colaboracion: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M16 4h2a2 2 0 0 1 2 2v14l-4-3H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }), /* @__PURE__ */ React.createElement("path", { d: "M9 4h6v4H9z" })),
    administracion: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 21h18M5 21V7l8-4 8 4v14M9 9h2M9 13h2M9 17h2M15 9h2M15 13h2M15 17h2" })),
    inventario: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" })),
    caja: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "2.5", y: "6", width: "19", height: "13", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M2.5 10h19M6 15h4" })),
    config: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5a7 7 0 0 0 .1-1z" })),
    appjcm: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "6", y: "2", width: "12", height: "20", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M10.5 18h3" })),
    dashboard: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "8", height: "5", rx: "1.5" }), /* @__PURE__ */ React.createElement("rect", { x: "3", y: "11", width: "8", height: "10", rx: "1.5" }), /* @__PURE__ */ React.createElement("rect", { x: "13", y: "3", width: "8", height: "10", rx: "1.5" }), /* @__PURE__ */ React.createElement("rect", { x: "13", y: "16", width: "8", height: "5", rx: "1.5" })),
    salaespera: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M12 7v5l3 2" })),
    automatizaciones: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3a4 4 0 0 0-4 4v1H6a3 3 0 0 0 0 6h.5M12 3a4 4 0 0 1 4 4v1h2a3 3 0 0 1 0 6h-.5M9 21l3-3 3 3M12 11v7" })),
    agenteia: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "4", y: "8", width: "16", height: "11", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M12 8V5M9 13h.01M15 13h.01M2 13h2M20 13h2" })),
    sucursales: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5M9 11h.01M15 11h.01" })),
    crm: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 4h18M6 4v6l4 4v6l4-2v-4l4-4V4" })),
    tutoriales: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M10 8.5l5 3.5-5 3.5z" })),
    consentimientos: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ React.createElement("path", { d: "M14 2v6h6M9 14l2 2 4-4" })),
    difusiones: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 11l16-6v14L3 13zM3 11v4M9 13v4a2 2 0 0 0 3 1.7" })),
    copilot: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" }))
  }[name];
  return /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, p);
}
function PatientSearch({ T, patients, onOpen }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const res = q.trim() ? (patients || []).filter((p) => (p.name || "").toLowerCase().includes(q.toLowerCase()) || (p.rut || "").toLowerCase().includes(q.toLowerCase()) || (p.email || "").toLowerCase().includes(q.toLowerCase()) || (p.phone || "").includes(q)).slice(0, 7) : [];
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", flex: 1, maxWidth: 320, minWidth: 140 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.7", style: { position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4.3-4.3" })), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: q,
      onChange: (e) => {
        setQ(e.target.value);
        setOpen(true);
      },
      onFocus: () => setOpen(true),
      onBlur: () => setTimeout(() => setOpen(false), 150),
      placeholder: "Buscar pacientes\u2026",
      style: { width: "100%", fontFamily: T.sans, fontSize: 12.5, padding: "8px 12px 8px 32px", borderRadius: 999, border: "1px solid " + T.chipBorder, background: T.chipBg, color: T.text, outline: "none" }
    }
  ), open && res.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, boxShadow: T.shadow, zIndex: 40, overflow: "hidden" } }, res.map((p) => /* @__PURE__ */ React.createElement("button", { key: p.id, onMouseDown: () => {
    onOpen(p.id);
    setQ("");
    setOpen(false);
  }, style: { width: "100%", textAlign: "left", display: "block", padding: "9px 13px", border: "none", borderBottom: "1px solid " + T.line, background: "transparent", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, p.rut || p.phone || "Paciente")))));
}
const ADMIN_NAV = [
  { k: "dashboard", l: "Dashboard" },
  { k: "appjcm", l: "App JC Medical" },
  { k: "agenda", l: "Agenda" },
  { k: "pacientes", l: "Pacientes" },
  { k: "salaespera", l: "Sala de espera" },
  { k: "pendientes", l: "Pendientes" },
  { k: "caja", l: "Registro de Ventas" },
  { k: "inventario", l: "Inventario" },
  { k: "servicios", l: "Tratamientos" },
  { k: "equipo", l: "Equipo" },
  { k: "sucursales", l: "Sucursales" },
  { k: "marketing", l: "Marketing" },
  { k: "crm", l: "CRM \xB7 Embudo" },
  { k: "difusiones", l: "Difusiones" },
  { k: "agenteia", l: "Agente IA" },
  { k: "copilot", l: "Asistente IA" },
  { k: "automatizaciones", l: "Automatizaciones" },
  { k: "resumen", l: "Resumen" },
  { k: "colaboracion", l: "Colaboraciones" },
  { k: "fidelidad", l: "Fidelidad" },
  { k: "integraciones", l: "Integraciones" },
  { k: "reportes", l: "Reportes" },
  { k: "administracion", l: "Administraci\xF3n" },
  { k: "consentimientos", l: "Consentimientos" },
  { k: "tutoriales", l: "Tutoriales" },
  { k: "config", l: "Configuraci\xF3n" }
];
const SIDE_GROUP_HEAD = { dashboard: "Inicio", agenda: "Cl\xEDnica", marketing: "Marketing & Ventas", resumen: "An\xE1lisis", administracion: "Sistema" };
function adminNavItems() {
  var showJcApp = !(window.JCSAAS && window.JCSAAS.enabled) || (window.JCSAAS.currentClinic && window.JCSAAS.currentClinic() || {}).jcApp === true;
  return ADMIN_NAV.filter(function(n) {
    return n.k !== "appjcm" || showJcApp;
  });
}
function scopeClinicData() {
  if (!(window.JCSAAS && window.JCSAAS.enabled)) return;
  var clinic = window.JCSAAS.currentClinic && window.JCSAAS.currentClinic() || {};
  var isBase = clinic.isBase === true || (clinic.ownerEmail || "").toLowerCase() === "jc.skinlab@gmail.com";
  window.JCM_BASE = isBase;
  var D = window.JCDATA || {}, A = window.JCADMIN || {}, C = window.CADMIN || {};
  try {
    if (window.DB) {
      var cfg = window.DB.get("config") || {};
      if (isBase) {
        if (!cfg.clinic_addr) cfg.clinic_addr = "1 Poniente 1258, Edificio Plaza Poniente, Talca";
        if (!cfg.clinic_hours) cfg.clinic_hours = "Lun, Mi\xE9 y Vie 10:00\u201319:00 \xB7 S\xE1b 10:30\u201314:30";
        if (!cfg.wa_number) cfg.wa_number = "56997880877";
      }
      if (!cfg.clinic_name) cfg.clinic_name = clinic.name || "";
      window.DB.set("config", cfg);
    }
  } catch (e) {
  }
  A.patients = [];
  D.appointments = [];
  C.campaigns = [];
  C.integrations = [];
  C.waMessages = [];
  C.bizComments = [];
  C.fidelity = [];
  var savedTeam = window.DB && window.DB.get("team");
  C.team = Array.isArray(savedTeam) ? savedTeam : isBase ? C.team || [] : [];
  if (!isBase && D.catalog) D.catalog = [];
}
function clinicDisplayName() {
  var c = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic() || null;
  return c && c.name || "Juan Claudio Parra";
}
function clinicAvatarSrc(pic) {
  if (pic) return pic;
  if (window.JCM_BASE || !(window.JCSAAS && window.JCSAAS.enabled)) return (window.JCADMIN || {}).pro;
  return null;
}
function clinicSeeded() {
  return window.JCM_BASE === true || !(window.JCSAAS && window.JCSAAS.enabled);
}
window.clinicSeeded = clinicSeeded;
function clinicName() {
  try {
    var n = window.DB && DB.cfg().clinic_name;
    if (n) return n;
  } catch (e) {
  }
  return clinicSeeded() ? (window.JCDATA || {}).brand || "Medique" : "Medique";
}
function clinicAddr() {
  try {
    var a = window.DB && DB.cfg().clinic_addr;
    if (a) return a;
  } catch (e) {
  }
  return clinicSeeded() ? ((window.JCDATA || {}).contact || {}).address || "" : "";
}
function clinicPro() {
  try {
    var p = window.DB && DB.cfg().professional;
    if (p) return p;
  } catch (e) {
  }
  return clinicSeeded() ? ((window.JCDATA || {}).contact || {}).pro || "" : "";
}
window.clinicName = clinicName;
window.clinicAddr = clinicAddr;
window.clinicPro = clinicPro;
function clinicReplyTo() {
  var ok = function(e2) {
    return e2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e2 + "").trim());
  };
  try {
    var e = window.DB && DB.cfg().clinic_email;
    if (ok(e)) return (e + "").trim().toLowerCase();
  } catch (x) {
  }
  try {
    var c = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic();
    if (c && ok(c.ownerEmail)) return (c.ownerEmail + "").trim().toLowerCase();
  } catch (x) {
  }
  try {
    var rc = ((window.JCDATA || {}).contact || {}).email;
    if (ok(rc)) return (rc + "").trim().toLowerCase();
  } catch (x) {
  }
  return void 0;
}
window.clinicReplyTo = clinicReplyTo;
function importAllWeb() {
  if (!(window.JCSAAS && window.JCSAAS.enabled)) return Promise.resolve(0);
  var p = window.JCSAAS.importWebBookings ? window.JCSAAS.importWebBookings() : Promise.resolve(0);
  try {
    window.JCSAAS.importWebCollabs && window.JCSAAS.importWebCollabs();
  } catch (e) {
  }
  try {
    window.JCSAAS.importWebReviews && window.JCSAAS.importWebReviews();
  } catch (e) {
  }
  return p;
}
const PANEL_SECTIONS = { dashboard: 1, agenda: 1, pacientes: 1, salaespera: 1, pendientes: 1, caja: 1, inventario: 1, servicios: 1, equipo: 1, sucursales: 1, marketing: 1, crm: 1, difusiones: 1, agenteia: 1, copilot: 1, automatizaciones: 1, resumen: 1, colaboracion: 1, fidelidad: 1, integraciones: 1, reportes: 1, administracion: 1, consentimientos: 1, tutoriales: 1, config: 1, appjcm: 1 };
function panelParseRoute() {
  try {
    var parts = (location.pathname || "").replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
    if (parts[0] === "panel") parts.shift();
    var sec = parts[0] || "dashboard";
    if (!PANEL_SECTIONS[sec]) sec = "dashboard";
    var pid = sec === "pacientes" && parts[1] ? decodeURIComponent(parts[1]) : null;
    return { section: sec, pid };
  } catch (e) {
    return { section: "dashboard", pid: null };
  }
}
function panelRoutePath(sec, pid) {
  if (sec === "pacientes" && pid) return "/pacientes/" + encodeURIComponent(pid);
  if (!sec || sec === "dashboard") return "/";
  return "/" + sec;
}
const DASH_IC = {
  pacientes: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "8", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M3 20a6 6 0 0 1 12 0" }), /* @__PURE__ */ React.createElement("path", { d: "M16 8a3 3 0 0 1 0 6" }), /* @__PURE__ */ React.createElement("path", { d: "M21 20a6 6 0 0 0-4-5.5" })),
  citas: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4" })),
  nuevos: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "8", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M3 20a6 6 0 0 1 11-3.4" }), /* @__PURE__ */ React.createElement("path", { d: "M19 8v6M16 11h6" })),
  ingresos: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ React.createElement("path", { d: "M12 7v10M14.5 9.2A2.4 2.4 0 0 0 12 8.4c-1.4 0-2.4.8-2.4 1.9 0 2.6 4.8 1.4 4.8 4 0 1.1-1 1.9-2.4 1.9a2.4 2.4 0 0 1-2.5-.8" })),
  crear: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "8", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M3 20a6 6 0 0 1 11-3.4" }), /* @__PURE__ */ React.createElement("path", { d: "M19 8v6M16 11h6" })),
  cita: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4M12 13v4M10 15h4" })),
  puntos: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3l2.6 5.6L20.5 9l-4.3 4.1 1 6-5.2-3-5.2 3 1-6L3.5 9l5.9-.4z" })),
  stock: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" })),
  whatsapp: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" })),
  campana: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" })),
  alerta: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" }))
};
function DashIcon({ name, c, size }) {
  return /* @__PURE__ */ React.createElement("svg", { width: size || 20, height: size || 20, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, DASH_IC[name]);
}
function MovimientosCajaModal({ T, onClose }) {
  const D = window.JCDATA || {};
  const fmt = D.fmt ? D.fmt : (n) => "$" + (n || 0).toLocaleString("es-CL");
  const green = "#1F8A5B", red = "#C0285A";
  const [period, setPeriod] = useState("mes");
  const [, force] = useState(0);
  useEffect(() => {
    const tick = () => force((x) => x + 1);
    window.addEventListener("jcm:cash", tick);
    window.addEventListener("focus", tick);
    return () => {
      window.removeEventListener("jcm:cash", tick);
      window.removeEventListener("focus", tick);
    };
  }, []);
  let all = [];
  try {
    all = typeof window.cashMovimientos === "function" ? window.cashMovimientos() || [] : typeof window.cashAll === "function" ? window.cashAll() || [] : window.DB && DB.get("cash_moves") || [];
  } catch (e) {
  }
  const dayOf = (ts) => typeof window._localDay === "function" ? window._localDay(ts) : (ts || "").slice(0, 10);
  const asc = all.slice().sort((a, b) => (a.ts || "").localeCompare(b.ts || ""));
  let run = 0;
  const withBal = asc.map((m) => {
    const delta = m.type === "egreso" ? -(m.amount || 0) : m.amount || 0;
    const antes = run;
    run += delta;
    return { ...m, _antes: antes, _despues: run, _day: dayOf(m.ts) };
  });
  const saldoActual = run;
  const now = /* @__PURE__ */ new Date();
  const hoyKey = dayOf(now);
  const mesKey = hoyKey.slice(0, 7);
  const lunes = (() => {
    const d = new Date(now);
    const dow = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - dow);
    d.setHours(0, 0, 0, 0);
    return dayOf(d);
  })();
  const inPeriod = (m) => {
    const day = m._day;
    if (period === "dia") return day === hoyKey;
    if (period === "semana") return day >= lunes;
    return day.slice(0, 7) === mesKey;
  };
  const moves = withBal.filter(inPeriod).reverse();
  const ingP = moves.filter((m) => m.type !== "egreso").reduce((s, m) => s + (m.amount || 0), 0);
  const egrP = moves.filter((m) => m.type === "egreso").reduce((s, m) => s + (m.amount || 0), 0);
  const byDay = {};
  moves.forEach((m) => {
    const d = m._day;
    (byDay[d] = byDay[d] || []).push(m);
  });
  const days = Object.keys(byDay).sort((a, b) => b.localeCompare(a));
  const hora = (ts) => {
    try {
      return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };
  const diaTxt = (d) => {
    try {
      return (/* @__PURE__ */ new Date(d + "T00:00:00")).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
    } catch (e) {
      return d;
    }
  };
  const periodLbl = period === "dia" ? "hoy" : period === "semana" ? "esta semana" : "este mes";
  const del = async (id) => {
    if (await (window.jcmConfirm || window.confirm)("\xBFEliminar este movimiento de caja?", { danger: true }) && window.cashDelete) {
      window.cashDelete(id);
      force((x) => x + 1);
    }
  };
  const segBtn = (k, l) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setPeriod(k), style: { flex: 1, fontFamily: T.sans, fontSize: 12, fontWeight: period === k ? 600 : 500, padding: "9px 6px", borderRadius: 8, cursor: "pointer", border: "1px solid " + (period === k ? T.accent : T.line), background: period === k ? T.accent : "transparent", color: period === k ? T.onAccent || "#fff" : T.textMute } }, l);
  return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", paddingTop: "calc(66px + env(safe-area-inset-top,0px))", paddingBottom: "calc(20px + env(safe-area-inset-bottom,0px))", paddingLeft: 16, paddingRight: 16 } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: "100%", maxWidth: 520, maxHeight: "100%", background: T.bg, border: "1px solid " + T.line, borderRadius: 16, display: "flex", flexDirection: "column", animation: "jcSlideUp .25s ease", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid " + T.line, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, fontWeight: 300, color: T.text } }, "Movimientos de caja"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 2 } }, "Saldo actual: ", /* @__PURE__ */ React.createElement("b", { style: { color: saldoActual >= 0 ? green : red } }, fmt(saldoActual)))), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 4 } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 20px 0", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 12 } }, segBtn("dia", "D\xEDa"), segBtn("semana", "Semana"), segBtn("mes", "Mes")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 6 } }, [["Ingresos", ingP, green], ["Egresos", egrP, red], ["Neto", ingP - egrP, T.accent]].map(([l, v, c]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: "8px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, l), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: c, marginTop: 2 } }, fmt(v)))))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { padding: "8px 20px 18px", overflowY: "auto", flex: 1 } }, !moves.length ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "20px 0", textAlign: "center", lineHeight: 1.6 } }, "No hay movimientos ", periodLbl, ".", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: T.textFaint } }, "Se registran al cobrar atenciones, agregar procedimientos con cobro en una ficha o crear movimientos en Caja.")) : days.map((day) => /* @__PURE__ */ React.createElement("div", { key: day }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "12px 0 4px", paddingBottom: 4, borderBottom: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent } }, diaTxt(day))), byDay[day].map((m) => {
    const esEgreso = m.type === "egreso";
    return /* @__PURE__ */ React.createElement("div", { key: m.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, m.concept || (esEgreso ? "Egreso" : "Ingreso")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, hora(m.ts), m.method ? " \xB7 " + m.method : "", m.kind === "atencion" ? " \xB7 atenci\xF3n" : ""), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 3 } }, "Saldo: ", fmt(m._antes), " ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, "\u2192"), " ", /* @__PURE__ */ React.createElement("b", { style: { color: T.textMute } }, fmt(m._despues)))), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 15, color: esEgreso ? red : green, whiteSpace: "nowrap" } }, esEgreso ? "\u2212 " : "+ ", fmt(m.amount || 0)), m._src !== "billing" && /* @__PURE__ */ React.createElement("button", { onClick: () => del(m.id), title: "Eliminar movimiento", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" }))));
  }))))));
}
function DashboardView({ T, D, A, appts, patients, go }) {
  const [tab, setTab] = useState("general");
  const [kpiPopup, setKpiPopup] = useState(null);
  const [movCaja, setMovCaja] = useState(false);
  const fmt = D && D.fmt ? D.fmt : (n) => "$" + (n || 0).toLocaleString("es-CL");
  const hoy = appts.filter((a) => apptDayOff(a) === 0 && a.status !== "anulada");
  const ingresosHoy = typeof window.cashToday === "function" ? (window.cashToday() || []).filter((m) => m.type !== "egreso").reduce((s, m) => s + (m.amount || 0), 0) : 0;
  const nuevosMes = patients.length;
  const green = "#1F8A5B";
  const dias = ["Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b", "Dom"];
  const serie = window.JCSAAS && window.JCSAAS.enabled ? [0, 0, 0, 0, 0, 0, 0] : [38e4, 42e4, 51e4, 47e4, 54e4, 61e4, 74e4];
  const totalSemana = serie.reduce((a, b) => a + b, 0);
  const growth = serie[0] ? Math.round((serie[serie.length - 1] / serie[0] - 1) * 100) : 0;
  const ord = appts.filter((a) => a.status !== "anulada").sort((a, b) => apptDayOff(a) - apptDayOff(b) || (a.time || "").localeCompare(b.time || ""));
  const prox5 = ord.slice(0, 5);
  const wa = (window.CADMIN || {}).waMessages || [];
  const biz = (window.CADMIN || {}).bizComments || [];
  const sinConsent = window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter((p) => !p.consent);
  const recitas = window.recitaDue ? window.recitaDue(patients) : [];
  const TABS = [["general", "Visi\xF3n General"], ["citas", "Pr\xF3ximas Citas"], ["notif", "Notificaciones"]];
  const [metaEdit, setMetaEdit] = useState(false);
  const [, bumpRev] = useState(0);
  const spendRef = useRef(null), leadsRef = useRef(null), msgsRef = useRef(null), soldRef = useRef(null);
  function saveMeta() {
    try {
      const cfg = window.DB && DB.get("config") || {};
      cfg.meta_spend_mes = +(spendRef.current && spendRef.current.value) || 0;
      const lv = leadsRef.current && leadsRef.current.value;
      if (lv !== "" && lv != null) cfg.meta_leads_mes = +lv || 0;
      const mv = msgsRef.current && msgsRef.current.value;
      cfg.meta_msgs_mes = mv !== "" && mv != null ? +mv || 0 : 0;
      const sv = soldRef.current && soldRef.current.value;
      cfg.meta_sold_mes = sv !== "" && sv != null ? +sv || 0 : 0;
      window.DB && DB.set("config", cfg);
    } catch (e) {
    }
    setMetaEdit(false);
    bumpRev((r) => r + 1);
  }
  const [liveMeta, setLiveMeta] = useState(null);
  useEffect(() => {
    if (!(window.JCSAAS && window.JCSAAS.enabled)) return;
    let creds = null;
    try {
      creds = window.DB && DB.get("meta_creds") || null;
    } catch (e) {
    }
    const hasOwn = !!(creds && creds.token && creds.account);
    const isBase = window.JCM_BASE === true;
    if (!hasOwn && !isBase) return;
    const bodyObj = hasOwn ? { token: creds.token, account: creds.account } : {};
    const tokP = window.JCSAAS && window.JCSAAS.idToken ? window.JCSAAS.idToken() : Promise.resolve(null);
    tokP.then((tok) => {
      const headers = { "Content-Type": "application/json" };
      if (tok) headers["Authorization"] = "Bearer " + tok;
      return fetch("/api/meta", { method: "POST", headers, body: JSON.stringify(bodyObj) });
    }).then((r) => r.json()).then((d) => {
      if (d && d.ok) setLiveMeta(d);
    }).catch(() => {
    });
  }, []);
  const funnel = function() {
    const mes = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
    const inMonth = (ts) => (ts || "").slice(0, 7) === mes;
    let cash = [];
    try {
      cash = typeof window.cashAll === "function" ? window.cashAll() || [] : window.DB && DB.get("cash_moves") || [];
    } catch (e) {
    }
    let ingresos = cash.filter((m) => m.type === "ingreso" && inMonth(m.ts)).reduce((s, m) => s + (m.amount || 0), 0);
    let compras = cash.filter((m) => m.kind === "atencion" && inMonth(m.ts)).length;
    let allAppts = [];
    try {
      allAppts = window.DB && DB.get("appts") || appts || [];
    } catch (e) {
      allAppts = appts || [];
    }
    let reservas = allAppts.length;
    let asistieron = allAppts.filter((a) => a.attended || a.status === "atendida" || a.status === "confirmada").length;
    let spend = 0, leads = 0, mensajes = 0, soldManual = null;
    try {
      const cfg = window.DB && DB.get("config") || {};
      spend = +cfg.meta_spend_mes || 0;
      leads = +cfg.meta_leads_mes || 0;
      mensajes = +cfg.meta_msgs_mes || 0;
      if (cfg.meta_sold_mes != null && cfg.meta_sold_mes !== "") soldManual = +cfg.meta_sold_mes || 0;
    } catch (e) {
    }
    if (liveMeta && liveMeta.ok) {
      spend = liveMeta.spend || 0;
      if (liveMeta.leads) leads = liveMeta.leads;
    }
    const demo = !spend && !(window.JCSAAS && window.JCSAAS.enabled);
    if (demo) {
      spend = 5e5;
      leads = 120;
      mensajes = 80;
      reservas = 35;
      asistieron = 22;
      compras = 18;
      ingresos = 68e5;
    } else if (!leads) {
      leads = reservas;
    }
    if (soldManual != null) compras = soldManual;
    const roas = spend > 0 ? ingresos / spend : 0;
    return { spend, leads, mensajes, reservas, asistieron, compras, ingresos, roas, demo, live: !!(liveMeta && liveMeta.ok) };
  }();
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
    return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 14, padding: "16px 18px 18px", marginBottom: 16, boxShadow: "0 14px 40px -30px rgba(0,0,0,.4)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, fontWeight: 600 } }, "Embudo de marketing \xB7 este mes"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: funnel.live ? "#1F8A5B" : T.textFaint } }, funnel.demo ? "Datos de ejemplo \u2014 carga tu gasto de Meta para verlo real" : funnel.live ? "\u25CF Conectado a Meta \xB7 en vivo" : "Datos reales de tu mes")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, metaEdit ? /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12, paddingBottom: 11, borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 3, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, "Gasto Meta $", /* @__PURE__ */ React.createElement("input", { ref: spendRef, type: "number", defaultValue: funnel.demo ? "" : funnel.spend, placeholder: "0", style: inp })), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 3, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, "Leads", /* @__PURE__ */ React.createElement("input", { ref: leadsRef, type: "number", defaultValue: funnel.demo ? "" : funnel.leads, placeholder: "0", style: { ...inp, width: 90 } })), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 3, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, "Mensajes recibidos", /* @__PURE__ */ React.createElement("input", { ref: msgsRef, type: "number", defaultValue: funnel.demo ? "" : funnel.mensajes, placeholder: "0", style: { ...inp, width: 110 } })), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 3, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, "Vendidos", /* @__PURE__ */ React.createElement("input", { ref: soldRef, type: "number", defaultValue: funnel.demo ? "" : funnel.compras, placeholder: "0", style: { ...inp, width: 90 } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: saveMeta, style: { fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: T.onAccent || "#fff", background: T.accent, border: "none", borderRadius: 8, padding: "9px 14px", cursor: "pointer" } }, "Guardar"), /* @__PURE__ */ React.createElement("button", { onClick: () => setMetaEdit(false), style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, background: "transparent", border: "1px solid " + T.line, borderRadius: 8, padding: "9px 12px", cursor: "pointer" } }, "Cancelar"))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingBottom: 11, borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Gasto en Meta"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 20, color: T.text } }, fmt(funnel.spend)), /* @__PURE__ */ React.createElement("button", { onClick: () => setMetaEdit(true), title: "Editar gasto de Meta del mes", style: { display: "inline-flex", width: 28, height: 28, alignItems: "center", justifyContent: "center", background: T.chipBg, border: "1px solid " + T.chipBorder, borderRadius: 8, color: T.textMute, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 20h9" }), /* @__PURE__ */ React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" }))))), stages.map((st, i) => {
      const pct = Math.max(6, Math.round(st.n / top * 100));
      const conv = i > 0 && stages[i - 1].n ? Math.round(st.n / stages[i - 1].n * 100) : null;
      return /* @__PURE__ */ React.createElement("div", { key: st.k, style: { marginBottom: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, st.k), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.text } }, st.n, conv != null && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 400, color: T.textMute, marginLeft: 7 } }, conv, "%"))), /* @__PURE__ */ React.createElement("div", { style: { height: 8, borderRadius: 999, background: T.lineSoft, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: pct + "%", background: st.c, borderRadius: 999, transition: "width .6s " + T.ease } })));
    })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("div", { onClick: () => setMovCaja(true), title: "Ver los movimientos de caja (d\xEDa, semana, mes) con saldo", style: { background: T.surface2, border: "1px solid " + T.line, borderRadius: 12, padding: "13px 15px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute } }, "Facturaste este mes"), /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: T.text, lineHeight: 1.1, marginTop: 4 } }, fmt(funnel.ingresos)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.accent, marginTop: 3 } }, "Ver movimientos del mes \u2192")), /* @__PURE__ */ React.createElement("div", { style: { background: green + "12", border: "1px solid " + green + "44", borderRadius: 12, padding: "16px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: green } }, "ROAS real"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 40, color: green, lineHeight: 1.05 } }, funnel.roas.toFixed(1), "x"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, "por cada $1 en Meta")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 6, lineHeight: 1.5 } }, "Invertiste ", fmt(funnel.spend), " y facturaste ", fmt(funnel.ingresos), ".")))));
  }
  const KpiPopup = () => {
    if (!kpiPopup) return null;
    let title = "", rows = [];
    const rowStyle = { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + T.lineSoft };
    if (kpiPopup === "pacientes") {
      title = "Pacientes totales";
      rows = patients.slice(0, 20).map((p, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: rowStyle }, Avatar({ T, name: p.name, size: 32 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, p.phone || p.rut || "Sin datos")), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: p.consent ? green : "#C0285A", border: "1px solid " + (p.consent ? green : "#C0285A"), borderRadius: 999, padding: "2px 8px" } }, p.consent ? "Consiente" : "Pendiente")));
    } else if (kpiPopup === "citas") {
      title = "Citas de hoy";
      if (!hoy.length) rows = [/* @__PURE__ */ React.createElement("div", { key: "0", style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "16px 0" } }, "No hay citas agendadas para hoy.")];
      else rows = hoy.map((a, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: rowStyle }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 9, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, color: T.accent } }, a.time || "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.proc)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: a.status === "confirmada" ? green : T.textMute, border: "1px solid " + (a.status === "confirmada" ? green : T.line), borderRadius: 999, padding: "2px 8px" } }, a.status || "pendiente")));
    } else if (kpiPopup === "nuevos") {
      title = "Pacientes este mes";
      const mesActual = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
      const nuevos = patients.filter((p) => p.id && p.id.startsWith("p") && p.id.slice(1, 8).length > 0);
      if (!nuevos.length) rows = [/* @__PURE__ */ React.createElement("div", { key: "0", style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "16px 0" } }, "No hay pacientes registrados este mes.")];
      else rows = nuevos.slice(0, 15).map((p, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: rowStyle }, Avatar({ T, name: p.name, size: 32 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, p.phone || "\u2014"))));
    } else if (kpiPopup === "ingresos") {
      title = "Ingresos de hoy";
      const pagadas = hoy.filter((a) => a.paid);
      if (!pagadas.length) rows = [/* @__PURE__ */ React.createElement("div", { key: "0", style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "16px 0" } }, "No hay pagos registrados hoy.")];
      else rows = pagadas.map((a, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: rowStyle }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, a.proc, " \xB7 ", a.time || "\u2014")), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 15, color: green } }, "Pagado")));
      rows.push(
        /* @__PURE__ */ React.createElement("div", { key: "total", style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0 4px", marginTop: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, "Total hoy"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 20, color: T.text } }, fmt(ingresosHoy)))
      );
    } else if (kpiPopup === "mes") {
      const MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const now = /* @__PURE__ */ new Date();
      const mesKey = now.toISOString().slice(0, 7);
      title = "Movimientos \xB7 " + MES[now.getMonth()];
      let cash = [];
      try {
        cash = typeof window.cashAll === "function" ? window.cashAll() || [] : window.DB && DB.get("cash_moves") || [];
      } catch (e) {
      }
      const mov = cash.filter((m) => (m.ts || "").slice(0, 7) === mesKey);
      const ingM = mov.filter((m) => m.type !== "egreso").reduce((s, m) => s + (m.amount || 0), 0);
      const egrM = mov.filter((m) => m.type === "egreso").reduce((s, m) => s + (m.amount || 0), 0);
      const hora = (ts) => {
        try {
          return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
        } catch (e) {
          return "";
        }
      };
      const diaTxt = (d) => {
        try {
          return (/* @__PURE__ */ new Date(d + "T00:00:00")).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
        } catch (e) {
          return d;
        }
      };
      rows.push(
        /* @__PURE__ */ React.createElement("div", { key: "resumen", style: { display: "flex", gap: 8, marginBottom: 12 } }, [["Ingresos", ingM, green], ["Egresos", egrM, "#C0285A"], ["Neto", ingM - egrM, T.accent]].map(([l, v, c]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: "9px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, l), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: c, marginTop: 2 } }, fmt(v)))))
      );
      if (!mov.length) {
        rows.push(/* @__PURE__ */ React.createElement("div", { key: "vacio", style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, padding: "12px 0" } }, "No hay movimientos de caja este mes. Se registran al cobrar atenciones, agregar procedimientos en una ficha o crear movimientos en Caja."));
      } else {
        const byDay = {};
        mov.forEach((m) => {
          const d = (m.ts || "").slice(0, 10);
          (byDay[d] = byDay[d] || []).push(m);
        });
        Object.keys(byDay).sort((a, b) => b.localeCompare(a)).forEach((day) => {
          const dayMov = byDay[day].sort((a, b) => (b.ts || "").localeCompare(a.ts || ""));
          const dayNet = dayMov.reduce((s, m) => s + (m.type === "egreso" ? -(m.amount || 0) : m.amount || 0), 0);
          rows.push(
            /* @__PURE__ */ React.createElement("div", { key: "h" + day, style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "14px 0 4px", paddingBottom: 4, borderBottom: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent } }, diaTxt(day)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, fmt(dayNet)))
          );
          dayMov.forEach((m) => {
            const esEgreso = m.type === "egreso";
            rows.push(
              /* @__PURE__ */ React.createElement("div", { key: m.id, style: rowStyle }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, m.concept || (esEgreso ? "Egreso" : "Ingreso")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, hora(m.ts), m.method ? " \xB7 " + m.method : "", m.kind === "atencion" ? " \xB7 atenci\xF3n" : "")), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 15, color: esEgreso ? "#C0285A" : green, whiteSpace: "nowrap" } }, esEgreso ? "\u2212 " : "", fmt(m.amount || 0)), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
                if (await (window.jcmConfirm || window.confirm)("\xBFEliminar este movimiento de caja?", { danger: true }) && window.cashDelete) {
                  window.cashDelete(m.id);
                  bumpRev((r) => r + 1);
                }
              }, title: "Eliminar movimiento", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" }))))
            );
          });
        });
      }
    }
    return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
      if (e.target === e.currentTarget) setKpiPopup(null);
    }, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: "100%", maxWidth: 460, maxHeight: "80vh", background: T.bg, border: "1px solid " + T.line, borderRadius: 16, display: "flex", flexDirection: "column", animation: "jcSlideUp .25s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid " + T.line, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 20, fontWeight: 300, color: T.text } }, title), /* @__PURE__ */ React.createElement("button", { onClick: () => setKpiPopup(null), style: { background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 4 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 20px 16px", overflowY: "auto" } }, rows)));
  };
  const Kpi = ({ ic, label, value, sub, popup }) => /* @__PURE__ */ React.createElement("div", { onClick: () => popup && setKpiPopup(popup), title: popup ? "Ver detalle" : void 0, style: { position: "relative", cursor: popup ? "pointer" : "default", background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 11 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, color: T.text, lineHeight: 1.05, marginTop: 2 } }, value), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, sub)), /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 38, borderRadius: 10, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement(DashIcon, { name: ic, c: T.accent, size: 18 })));
  function Chart() {
    const W = 720, H = 150, padL = 16, padR = 16, padT = 14, padB = 24;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const maxY = (Math.max.apply(null, serie) || 1) * 1.18;
    const n = serie.length;
    const X = (i) => padL + i * innerW / (n - 1);
    const Y = (v) => padT + (1 - (v || 0) / maxY) * innerH;
    const pts = serie.map((v, i) => X(i).toFixed(1) + " " + Y(v).toFixed(1));
    const line = "M " + pts.join(" L ");
    const area = line + " L " + X(n - 1).toFixed(1) + " " + (padT + innerH) + " L " + padL + " " + (padT + innerH) + " Z";
    const grid = [0, 1, 2, 3].map((g) => padT + g * innerH / 3);
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 " + W + " " + H, style: { width: "100%", height: "auto", display: "block" }, preserveAspectRatio: "xMidYMid meet" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "dashGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: T.accent, stopOpacity: "0.22" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: T.accent, stopOpacity: "0" }))), grid.map((y, i) => /* @__PURE__ */ React.createElement("line", { key: i, x1: padL, y1: y, x2: padL + innerW, y2: y, stroke: T.line, strokeWidth: "1" })), /* @__PURE__ */ React.createElement("path", { d: area, fill: "url(#dashGrad)" }), /* @__PURE__ */ React.createElement("path", { d: line, fill: "none", stroke: T.accent, strokeWidth: "2.4", strokeLinejoin: "round", strokeLinecap: "round" }), serie.map((v, i) => /* @__PURE__ */ React.createElement("circle", { key: i, cx: X(i), cy: Y(v), r: "3.4", fill: T.surface, stroke: T.accent, strokeWidth: "2" })), dias.map((d, i) => {
      const anchor = i === 0 ? "start" : i === n - 1 ? "end" : "middle";
      const tx = i === 0 ? padL : i === n - 1 ? padL + innerW : X(i);
      return /* @__PURE__ */ React.createElement("text", { key: d, x: tx, y: H - 7, textAnchor: anchor, fontSize: "11", fontFamily: T.sans, fill: T.textMute }, d);
    }));
  }
  const citaRow = (a) => /* @__PURE__ */ React.createElement("div", { key: a.id, style: { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: a.name, size: 38 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.proc)), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text } }, apptDayOff(a) === 0 ? "Hoy, " + (a.time || "\u2014") : a.when || a.time || "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint } }, (a.dur || 60) + " min")), /* @__PURE__ */ React.createElement("button", { onClick: () => go("agenda"), style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "6px 12px", cursor: "pointer" } }, "Ver"));
  const acceso = (ic, title, sub, to) => /* @__PURE__ */ React.createElement("button", { onClick: () => go(to), style: { display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 15px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: 10, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement(DashIcon, { name: ic, c: T.accent })), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 1 } }, sub)));
  const notif = (ic, color, title, sub, action, fn) => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 9, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement(DashIcon, { name: ic, c: color, size: 17 })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, sub)), action && /* @__PURE__ */ React.createElement("button", { onClick: fn, style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 8, padding: "6px 11px", cursor: "pointer" } }, action));
  const _h = (/* @__PURE__ */ new Date()).getHours();
  const _greet = _h < 13 ? "Buenos d\xEDas" : _h < 20 ? "Buenas tardes" : "Buenas noches";
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 28, letterSpacing: "-.02em", color: T.text, lineHeight: 1.1 } }, _greet, clinicDisplayName() ? ", " + clinicDisplayName().split(" ")[0] : "", "."), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 5 } }, hoy.length === 0 ? "No tienes citas para hoy." : "Tienes " + hoy.length + " cita" + (hoy.length === 1 ? "" : "s") + " hoy.", " ", ingresosHoy > 0 && "\xB7 " + fmt(ingresosHoy) + " en caja hoy.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", gap: 4, background: T.surface, border: "1px solid " + T.line, borderRadius: 999, padding: 4 } }, TABS.map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTab(k), style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: tab === k ? 600 : 500, padding: "8px 18px", borderRadius: 999, cursor: "pointer", border: "none", background: tab === k ? T.accent : "transparent", color: tab === k ? T.onAccent || "#fff" : T.textMute } }, l)))), tab === "general" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(FunnelBlock, null), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 9 } }, "Indicadores Principales"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px,1fr))", gap: 11, marginBottom: 14 } }, /* @__PURE__ */ React.createElement(Kpi, { ic: "pacientes", label: "Pacientes totales", value: patients.length, sub: "Pacientes activos", popup: "pacientes" }), /* @__PURE__ */ React.createElement(Kpi, { ic: "citas", label: "Citas hoy", value: hoy.length, sub: "Agendadas para hoy", popup: "citas" }), /* @__PURE__ */ React.createElement(Kpi, { ic: "nuevos", label: "Nuevos pacientes", value: nuevosMes, sub: "A\xF1adidos este mes", popup: "nuevos" }), /* @__PURE__ */ React.createElement(Kpi, { ic: "ingresos", label: "Ingresos hoy", value: fmt(ingresosHoy), sub: "Generado hoy", popup: "ingresos" })), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: "13px 16px", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 32, borderRadius: 9, background: T.accent + "14", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 17l5-5 4 4 8-8M21 8h-4M21 8v4" }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, "Evoluci\xF3n de ingresos"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, "Estimado de la semana"))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.text, lineHeight: 1 } }, fmt(totalSemana)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: green, marginTop: 3 } }, "\u2197 +", growth, "% en la semana"))), /* @__PURE__ */ React.createElement(Chart, null)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 12 } }, "Pr\xF3ximas 5 citas"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, prox5.length ? prox5.map(citaRow) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0" } }, "No hay citas pr\xF3ximas."))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 12 } }, "Accesos r\xE1pidos"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, acceso("crear", "Crear paciente", "A\xF1adir nueva ficha m\xE9dica", "pacientes"), acceso("cita", "Nueva cita", "Agendar una atenci\xF3n", "agenda"), acceso("puntos", "Otorgar puntos", "Programa de fidelidad", "fidelidad"), acceso("stock", "Inventario", "Stock e insumos", "inventario"))))), tab === "citas" && /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 720 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 12 } }, "Pr\xF3ximas citas (", ord.length, ")"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, ord.length ? ord.map(citaRow) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0" } }, "No hay citas registradas."))), tab === "notif" && /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 720 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.text, fontWeight: 600, marginBottom: 12 } }, "Notificaciones"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, wa.map((m) => notif("whatsapp", green, m.name + " escribi\xF3 por WhatsApp", "\u201C" + m.msg + "\u201D \xB7 " + m.ago, "Responder", () => go("pendientes"))), biz.map((b) => notif("campana", T.accent, b.name + " coment\xF3 en " + b.net, "\u201C" + b.msg + "\u201D \xB7 " + b.ago, "Ver", () => go("marketing"))), sinConsent.length > 0 && notif("alerta", "#C9A227", sinConsent.length + " consentimiento(s) por firmar", "Revisa las fichas pendientes", "Ver", () => go("pendientes")), recitas.length > 0 && notif("whatsapp", green, recitas.length + " paciente(s) para re-citar", "Cumplieron el plazo de su pr\xF3xima aplicaci\xF3n", "Ver", () => go("pacientes")), wa.length + biz.length + sinConsent.length + recitas.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0" } }, "Todo al d\xEDa. Sin notificaciones."))), /* @__PURE__ */ React.createElement(KpiPopup, null), movCaja && /* @__PURE__ */ React.createElement(MovimientosCajaModal, { T, onClose: () => setMovCaja(false) }));
}
function apptDayOff(a) {
  if (a && a.fecha) {
    var t = /* @__PURE__ */ new Date(a.fecha + "T00:00:00");
    if (!isNaN(t.getTime())) {
      var base = /* @__PURE__ */ new Date();
      base.setHours(0, 0, 0, 0);
      return Math.round((t.getTime() - base.getTime()) / 864e5);
    }
  }
  return a && typeof a.day === "number" ? a.day : 0;
}
function AdminApp() {
  const autoTheme = () => {
    const h = (/* @__PURE__ */ new Date()).getHours();
    return h >= 8 && h < 18 ? "cielo" : "azul";
  };
  const autoPeriod = () => {
    const h = (/* @__PURE__ */ new Date()).getHours();
    return h >= 8 && h < 18 ? "day" : "night";
  };
  const loadTheme = () => {
    try {
      const s = JSON.parse(localStorage.getItem("jcm_theme_pref") || "null");
      if (s && s.key && s.period === autoPeriod()) return s.key;
    } catch (e) {
    }
    return autoTheme();
  };
  const [themeKey, setThemeKey] = useState(loadTheme);
  const themeForced = useRef(loadTheme() !== autoTheme());
  useEffect(() => {
    const id = setInterval(() => {
      const curr = autoPeriod();
      try {
        const s = JSON.parse(localStorage.getItem("jcm_theme_pref") || "null");
        if (s && s.period !== curr) {
          localStorage.removeItem("jcm_theme_pref");
          themeForced.current = false;
        }
      } catch (e) {
      }
      if (!themeForced.current) setThemeKey(autoTheme());
    }, 3e5);
    return () => clearInterval(id);
  }, []);
  const _T0 = JCTHEME[themeKey];
  const T = Object.assign({}, _T0, { serif: "'Fraunces', Georgia, serif", ital: "'Fraunces', Georgia, serif" });
  const D = window.JCDATA, A = window.JCADMIN;
  const _initRoute = panelParseRoute();
  const [section, setSection] = useState(_initRoute.section);
  const [showTour, setShowTour] = useState(() => {
    try {
      return !(window.DB && window.DB.get("tour_done_v1"));
    } catch (e) {
      return false;
    }
  });
  function closeTour() {
    try {
      window.DB && window.DB.set("tour_done_v1", true);
    } catch (e) {
    }
    setShowTour(false);
  }
  const [darCita, setDarCita] = useState(null);
  const [patients, setPatients] = useState(() => {
    var raw = window.DB && window.DB.get("patients");
    var arr = Array.isArray(raw) ? window.jcmLoadPatientsFull ? window.jcmLoadPatientsFull() : raw : A.patients;
    return arr.map((p) => ({ ...p, points: p.points || [], history: Array.isArray(p.history) ? p.history : [] }));
  });
  const [openPatient, setOpenPatient] = useState(_initRoute.pid);
  const [openPatientTab, setOpenPatientTab] = useState(null);
  const [appts, setAppts] = useState(() => {
    var saved = window.DB && window.DB.get("appointments");
    if (Array.isArray(saved)) return saved.map((a) => ({ ...a }));
    const base = D.appointments.map((a) => ({ ...a }));
    try {
      const online = window.DB && window.DB.get("bookings") || [];
      online.forEach((b) => base.push({
        id: b.id,
        name: b.name,
        phone: b.phone,
        proc: (b.items || []).map((i) => ((i.qty || 1) > 1 ? i.qty + "\xD7 " : "") + i.name).join(" + ") || "Reserva online",
        time: b.time || "\u2014",
        when: b.day || "Por coordinar",
        status: "pendiente",
        paid: !!b.pay,
        day: 0,
        online: true
      }));
    } catch (e) {
    }
    return base;
  });
  function savePatients(list) {
    try {
      if (window.jcmSavePatientsLight) window.jcmSavePatientsLight(list);
      else if (window.DB) window.DB.set("patients", list);
    } catch (e) {
    }
    return list;
  }
  function saveAppts(list) {
    try {
      window.DB && window.DB.set("appointments", list);
    } catch (e) {
    }
    return list;
  }
  useEffect(() => {
    try {
      if (window.jcmSavePatientsLight) window.jcmSavePatientsLight(patients);
      if (window.optimizePatientsBlock) window.optimizePatientsBlock();
      if (window.JCSAAS && window.JCSAAS.retrySync) setTimeout(() => {
        try {
          window.JCSAAS.retrySync();
        } catch (e) {
        }
      }, 1500);
    } catch (e) {
    }
  }, []);
  useEffect(() => {
    function onData() {
      try {
        var raw = window.DB && window.DB.get("patients");
        if (Array.isArray(raw)) {
          var full = window.jcmLoadPatientsFull ? window.jcmLoadPatientsFull() : raw;
          setPatients(full.map((p) => ({ ...p, points: p.points || [], history: Array.isArray(p.history) ? p.history : [] })));
        }
        var fa = window.DB && window.DB.get("appointments");
        if (Array.isArray(fa)) setAppts(fa.map((a) => ({ ...a })));
      } catch (e) {
      }
    }
    window.addEventListener("jcsaas:data", onData);
    return () => window.removeEventListener("jcsaas:data", onData);
  }, []);
  const [navOpen, setNavOpen] = useState(false);
  const [stripOpen, setStripOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifVer, setNotifVer] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(() => {
    try {
      return localStorage.getItem("jcm_admin_photo") || null;
    } catch (e) {
      return null;
    }
  });
  const profileRef = useRef(null);
  const profilePhotoInput = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => {
    const reload = () => {
      try {
        var s = window.DB && window.DB.get("appointments");
        if (Array.isArray(s)) setAppts(s.map((a) => ({ ...a })));
      } catch (e) {
      }
    };
    window.addEventListener("jcm:appts", reload);
    return () => window.removeEventListener("jcm:appts", reload);
  }, []);
  const lastWebPull = useRef(0);
  useEffect(() => {
    let alive = true;
    function pull() {
      if (!(window.JCSAAS && window.JCSAAS.enabled)) return;
      const now = Date.now();
      if (now - lastWebPull.current < 2e4) return;
      lastWebPull.current = now;
      try {
        importAllWeb().then(() => {
          if (!alive) return;
          try {
            const fresh = window.DB && window.DB.get("appointments");
            if (Array.isArray(fresh)) setAppts(fresh.map((a) => ({ ...a })));
          } catch (e) {
          }
        });
      } catch (e) {
      }
    }
    pull();
    const onFocus = () => pull();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      alive = false;
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, []);
  function updatePatient(id, patch) {
    setPatients((ps) => savePatients(ps.map((p) => p.id === id ? { ...p, ...patch } : p)));
  }
  function markAllPaperConsent() {
    let n = 0;
    setPatients((ps) => savePatients(ps.map((p) => {
      if (!p.consent) {
        n++;
        return { ...p, consent: true, consentInfo: "Consentimiento firmado en papel" };
      }
      return p;
    })));
    return n;
  }
  function addPatient(p) {
    const rutClean = (r) => (r || "").replace(/[.\-\s]/g, "").toLowerCase();
    const pRut = rutClean(p.rut);
    const pName = (p.name || "").toLowerCase().trim();
    const existing = patients.find((x) => {
      if (!p.imported) {
        if (pRut.length >= 6 && rutClean(x.rut) === pRut) return true;
        if (pName.length >= 4 && (x.name || "").toLowerCase().trim() === pName) return true;
      }
      return false;
    });
    if (existing) {
      try {
        window.jcmToast && window.jcmToast('Ya existe una ficha para "' + existing.name + '" (RUT o nombre duplicado).', "error");
      } catch (e) {
      }
      return existing;
    }
    const np = { ...p, id: window.jcmUid ? window.jcmUid("p") : "p" + Date.now(), tags: p.tags || [], consent: p.consent === true, points: p.points || [], history: p.history || [] };
    if (np.fechaTs == null && !np.imported) np.fechaTs = Date.now();
    setPatients((ps) => savePatients([np, ...ps]));
    try {
      window.jcmToast && window.jcmToast('Paciente "' + (np.name || "") + '" guardado.', "ok");
    } catch (e) {
    }
    return np;
  }
  function removePatient(id) {
    setPatients((ps) => savePatients(ps.filter((p) => p.id !== id)));
    try {
      window.jcmToast && window.jcmToast("Paciente eliminado.", "info");
    } catch (e) {
    }
  }
  function addAppt(a) {
    setAppts((as) => saveAppts([...as, { ...a, id: window.jcmUid ? window.jcmUid("a") : "a" + Date.now() }]));
    try {
      window.jcmToast && window.jcmToast("Cita agendada.", "ok");
    } catch (e) {
    }
  }
  function updateAppt(id, patch) {
    setAppts((as) => {
      if (patch.status === "confirmada") {
        const prev = as.find((a) => a.id === id);
        if (prev && prev.status === "pendiente_pago" && prev.fecha && prev.time) {
          try {
            const map = window.DB && window.DB.get("horarios_dates") || {};
            const cur = Array.isArray(map[prev.fecha]) ? map[prev.fecha] : [];
            map[prev.fecha] = cur.filter((s) => s !== prev.time);
            if (window.DB) window.DB.set("horarios_dates", map);
          } catch (e) {
          }
        }
      }
      return saveAppts(as.map((a) => a.id === id ? { ...a, ...patch } : a));
    });
  }
  function removeAppt(id) {
    const appt = appts.find((a) => a.id === id);
    if (appt && appt.fecha && appt.time) {
      try {
        const map = window.DB && window.DB.get("horarios_dates") || {};
        const cur = Array.isArray(map[appt.fecha]) ? map[appt.fecha] : [];
        if (!cur.includes(appt.time)) {
          cur.push(appt.time);
          cur.sort();
          map[appt.fecha] = cur;
        }
        if (window.DB) window.DB.set("horarios_dates", map);
      } catch (e) {
      }
    }
    setAppts((as) => saveAppts(as.filter((a) => a.id !== id)));
  }
  function syncWebBookings() {
    if (!(window.JCSAAS && window.JCSAAS.enabled)) return Promise.resolve({ ok: false, reason: "Este panel no est\xE1 conectado a la nube." });
    var fetchP = window.JCSAAS.fetchBookings ? window.JCSAAS.fetchBookings() : Promise.resolve([]);
    return fetchP.then(function(pending) {
      var impP = window.JCSAAS.importWebBookings ? window.JCSAAS.importWebBookings() : Promise.resolve(0);
      return impP.then(function(added) {
        try {
          var fresh = window.DB && window.DB.get("appointments");
          if (Array.isArray(fresh)) setAppts(fresh.map((a) => ({ ...a })));
        } catch (e) {
        }
        return { ok: true, pending: (pending || []).length, added: added || 0, clinicId: window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId() || "" };
      });
    }).catch(function(err) {
      return { ok: false, reason: err && (err.code || err.message) || "error" };
    });
  }
  function nav(k) {
    setSection(k);
    setOpenPatient(null);
    setNavOpen(false);
  }
  useEffect(() => {
    try {
      var target = panelRoutePath(section, openPatient);
      if (location.pathname !== target) window.history.pushState({ s: section, p: openPatient }, "", target);
    } catch (e) {
    }
  }, [section, openPatient]);
  useEffect(() => {
    function onPop() {
      var r = panelParseRoute();
      setSection(r.section);
      setOpenPatient(r.pid);
      setNavOpen(false);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    try {
      var iso = function(d) {
        return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
      };
      var hoy = /* @__PURE__ */ new Date(), hoyISO = iso(hoy);
      var lastRun = "";
      try {
        lastRun = DB.get("auto_email_lastrun");
      } catch (e) {
      }
      if (lastRun === hoyISO) return;
      if (!window.mediqueEmail) return;
      var rules = {};
      try {
        (DB.get("automations") || []).forEach(function(r) {
          rules[r.id] = r.on;
        });
      } catch (e) {
      }
      var r24on = rules.r24 !== false, rmornOn = rules.rmorning !== false;
      if (!r24on && !rmornOn) {
        try {
          DB.set("auto_email_lastrun", hoyISO);
        } catch (e) {
        }
        return;
      }
      var manana = new Date(hoy);
      manana.setDate(hoy.getDate() + 1);
      var manISO = iso(manana);
      var clinic = function() {
        try {
          return DB.cfg().clinic_name || "tu cl\xEDnica";
        } catch (e) {
          return "tu cl\xEDnica";
        }
      }();
      var valido = function(e) {
        return e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
      };
      var sent = {};
      try {
        sent = DB.get("auto_email_sent") || {};
      } catch (e) {
      }
      var timer = setTimeout(function() {
        var jobs = [];
        (appts || []).forEach(function(a) {
          if (a.status === "anulada" || a.status === "cancelada" || a.status === "no_asistio") return;
          var esMan = a.fecha === manISO, esHoy = a.fecha === hoyISO;
          if (!(r24on && esMan) && !(rmornOn && esHoy)) return;
          var p = patients.find(function(x) {
            return x.id === a.patId;
          });
          var email = p && p.email || a.email;
          if (!valido(email)) return;
          var ruleId = esMan ? "r24" : "rmorning";
          var key = ruleId + ":" + (a.id || a.patId + "" + a.fecha + a.time) + ":" + a.fecha;
          if (sent[key]) return;
          var nombre = (p && p.name || a.name || "").split(" ")[0] || "";
          var cuando = esMan ? "ma\xF1ana" : "hoy";
          var text = "Hola " + nombre + ",\n\nTe recordamos tu cita en " + clinic + " " + cuando + (a.time ? " a las " + a.time : "") + (a.proc ? " (" + a.proc + ")" : "") + ".\n\nSi necesitas reprogramar, resp\xF3ndenos este correo.\n\n\u2014 " + clinic;
          jobs.push({ key, email, text });
        });
        if (!jobs.length) {
          try {
            DB.set("auto_email_lastrun", hoyISO);
          } catch (e) {
          }
          return;
        }
        var ok = 0;
        var run = function(i) {
          if (i >= jobs.length) {
            try {
              DB.set("auto_email_sent", sent);
              DB.set("auto_email_lastrun", hoyISO);
            } catch (e) {
            }
            if (ok) {
              try {
                window.jcmToast && window.jcmToast(ok + " recordatorio(s) de cita enviado(s) por correo.", "ok");
              } catch (e) {
              }
            }
            return;
          }
          var j = jobs[i];
          window.mediqueEmail({ to: j.email, subject: "Recordatorio de tu cita \xB7 " + clinic, text: j.text, replyTo: window.clinicReplyTo && window.clinicReplyTo() }).then(function(r) {
            if (r && r.ok) {
              sent[j.key] = true;
              ok++;
            }
            run(i + 1);
          }).catch(function() {
            run(i + 1);
          });
        };
        run(0);
      }, 5e3);
      return function() {
        clearTimeout(timer);
      };
    } catch (e) {
    }
  }, []);
  useEffect(function() {
    try {
      if (!window.jcmEmailBackup) return;
      var to = window.clinicReplyTo && window.clinicReplyTo() || "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return;
      var last = "";
      try {
        last = DB.get("auto_backup_lastrun") || "";
      } catch (e) {
      }
      var now = /* @__PURE__ */ new Date();
      now.setHours(0, 0, 0, 0);
      if (last) {
        var ld = /* @__PURE__ */ new Date(last + "T00:00:00");
        if (!isNaN(ld.getTime()) && now - ld < 7 * 864e5) return;
      }
      var iso = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
      var timer = setTimeout(function() {
        window.jcmEmailBackup({ silent: true }).then(function(r) {
          if (r && r.ok) {
            try {
              DB.set("auto_backup_lastrun", iso);
            } catch (e) {
            }
            try {
              window.jcmToast && window.jcmToast("Respaldo semanal enviado a tu correo.", "ok");
            } catch (e) {
            }
          }
        });
      }, 11e3);
      return function() {
        clearTimeout(timer);
      };
    } catch (e) {
    }
  }, []);
  const current = patients.find((p) => p.id === openPatient);
  const _sinCons = window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter((p) => !p.consent);
  const pendCount = _sinCons.length + ((window.CADMIN || {}).waMessages || []).length + ((window.CADMIN || {}).bizComments || []).length;
  const notifCount = (notifVer, unreadNotifCount(patients, appts));
  let body;
  if (section === "dashboard") body = /* @__PURE__ */ React.createElement(DashboardView, { T, D, A, appts, patients, go: nav });
  else if (section === "appjcm") body = /* @__PURE__ */ React.createElement(AppJCMView, { T });
  else if (section === "resumen") body = /* @__PURE__ */ React.createElement(Resumen, { T, D, A, appts, patients, go: nav, updateAppt, removeAppt, themeKey, setThemeKey });
  else if (section === "agenda") body = /* @__PURE__ */ React.createElement(Agenda, { T, appts, patients, addAppt, addPatient, updateAppt, removeAppt, onSyncWeb: syncWebBookings, onOpenPatient: (id) => {
    setOpenPatient(id);
    setSection("pacientes");
  } });
  else if (section === "pacientes") body = current ? /* @__PURE__ */ React.createElement(FichaMedica, { T, patient: current, updatePatient, removePatient, onBack: () => {
    setOpenPatient(null);
    setOpenPatientTab(null);
  }, onAgendar: () => nav("agenda"), initialTab: openPatientTab }) : /* @__PURE__ */ React.createElement(PacientesView, { T, patients, appts, onOpen: setOpenPatient, updatePatient, addPatient });
  else if (section === "salaespera") body = /* @__PURE__ */ React.createElement(SalaEsperaView, { T, appts, patients, updatePatient });
  else if (section === "automatizaciones") body = /* @__PURE__ */ React.createElement(AutomatizacionesView, { T });
  else if (section === "agenteia") body = /* @__PURE__ */ React.createElement(AgenteIAView, { T, patients, addAppt });
  else if (section === "pendientes") body = /* @__PURE__ */ React.createElement(PendientesView, { T, patients, appts, go: nav, openP: (id, tab) => {
    setOpenPatient(id);
    setOpenPatientTab(tab || null);
    setSection("pacientes");
  }, updatePatient });
  else if (section === "servicios") body = /* @__PURE__ */ React.createElement(ServiciosView, { T });
  else if (section === "equipo") body = /* @__PURE__ */ React.createElement(EquipoView, { T });
  else if (section === "sucursales") body = /* @__PURE__ */ React.createElement(SucursalesView, { T });
  else if (section === "crm") body = /* @__PURE__ */ React.createElement(CrmView, { T });
  else if (section === "tutoriales") body = /* @__PURE__ */ React.createElement(TutorialesView, { T, go: nav });
  else if (section === "consentimientos") body = /* @__PURE__ */ React.createElement(ConsentimientosView, { T });
  else if (section === "difusiones") body = /* @__PURE__ */ React.createElement(DifusionesView, { T });
  else if (section === "copilot") body = /* @__PURE__ */ React.createElement(CopilotConfigView, { T });
  else if (section === "fidelidad") body = /* @__PURE__ */ React.createElement(FidelidadView, { T });
  else if (section === "marketing") body = /* @__PURE__ */ React.createElement(MarketingView, { T, go: nav });
  else if (section === "administracion") body = /* @__PURE__ */ React.createElement(AdministracionView, { T, go: nav, patients, appts, addPatient, updatePatient, markAllPaperConsent });
  else if (section === "inventario") body = /* @__PURE__ */ React.createElement(InventarioView, { T });
  else if (section === "caja") body = /* @__PURE__ */ React.createElement(CajaView, { T });
  else if (section === "integraciones") body = /* @__PURE__ */ React.createElement(IntegracionesView, { T });
  else if (section === "reportes") body = /* @__PURE__ */ React.createElement(ReportesView, { T, patients, appts });
  else if (section === "colaboracion") body = /* @__PURE__ */ React.createElement(ColaboracionView, { T });
  else if (section === "config") body = /* @__PURE__ */ React.createElement(ConfigView, { T });
  const RAIL = 60, EXP = 212;
  const SIDE_BG = T.dark ? "#0E131B" : "#FFFFFF", SIDE_TX = T.dark ? "#EFEAE0" : "#1A1A14", SIDE_MUTE = T.dark ? "rgba(239,234,224,.55)" : "#5C5A50", SIDE_LINE = T.dark ? "rgba(239,234,224,.10)" : "rgba(20,20,15,.10)", SIDE_ACT = T.dark ? "rgba(239,234,224,.10)" : T.accentSoft || "rgba(84,112,127,.12)";
  const SIDE_LOGO = "/assets/medique-logo.png";
  return /* @__PURE__ */ React.createElement("div", { className: "jc-stage", style: { background: T.dark ? "#070707" : "#DCD7CC" } }, /* @__PURE__ */ React.createElement("div", { className: "jc-admin-frame", style: { background: T.bg, boxShadow: T.shadow, color: T.text, display: "flex", flexDirection: "row" } }, /* @__PURE__ */ React.createElement(
    "div",
    {
      onMouseEnter: () => setNavOpen(true),
      onMouseLeave: () => setNavOpen(false),
      style: { width: RAIL, flexShrink: 0, background: SIDE_BG, position: "relative", zIndex: 20 }
    },
    /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 0, left: 0, bottom: 0, width: navOpen ? EXP : RAIL, background: SIDE_BG, borderRight: "1px solid " + SIDE_LINE, transition: "width .22s " + T.ease, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: navOpen ? "8px 0 30px -10px rgba(0,0,0,.5)" : "none" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => nav("dashboard"), title: "Ir al Dashboard", style: { display: "flex", alignItems: "center", justifyContent: navOpen ? "flex-start" : "center", gap: 12, padding: navOpen ? "16px 18px" : "16px 0", background: "none", border: "none", cursor: "pointer", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 34, height: 34, borderRadius: 9, background: "#F2EDE6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px -2px rgba(0,0,0,.4)" } }, /* @__PURE__ */ React.createElement("img", { src: SIDE_LOGO, alt: "Medique", style: { width: 30, height: 30, objectFit: "contain" } })), navOpen && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, letterSpacing: ".34em", textTransform: "lowercase", color: SIDE_MUTE, whiteSpace: "nowrap" } }, "medique")), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", overflowX: "hidden", padding: "6px 0" } }, adminNavItems().map((n) => {
      const active = section === n.k;
      const head = SIDE_GROUP_HEAD[n.k];
      return /* @__PURE__ */ React.createElement(React.Fragment, { key: n.k }, navOpen && head && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".18em", textTransform: "uppercase", color: SIDE_MUTE, opacity: 0.7, padding: "14px 19px 5px" } }, head), !navOpen && head && n.k !== "dashboard" && /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: SIDE_LINE, margin: "7px 14px" } }), /* @__PURE__ */ React.createElement("button", { onClick: () => nav(n.k), title: n.l, style: {
        display: "flex",
        alignItems: "center",
        justifyContent: navOpen ? "flex-start" : "center",
        gap: 14,
        width: "100%",
        padding: navOpen ? "12px 19px" : "12px 0",
        background: active ? SIDE_ACT : "none",
        border: "none",
        borderLeft: "3px solid " + (active ? T.accent : "transparent"),
        cursor: "pointer",
        whiteSpace: "nowrap",
        position: "relative"
      } }, nIcon(n.k, active ? SIDE_TX : SIDE_MUTE), navOpen && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, letterSpacing: ".02em", color: active ? SIDE_TX : SIDE_MUTE } }, n.l), n.k === "pendientes" && pendCount > 0 && (navOpen ? /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", fontFamily: T.sans, fontSize: 10, background: "#C0285A", color: "#fff", borderRadius: 999, padding: "2px 7px" } }, pendCount) : /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 7, right: 11, width: 7, height: 7, borderRadius: "50%", background: "#C0285A" } }))));
    })))
  ), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "13px 18px 10px", borderBottom: "1px solid " + T.line, background: T.navBg, backdropFilter: "blur(14px)", position: "relative", zIndex: 6, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(PatientSearch, { T, patients, onOpen: (id) => {
    setOpenPatient(id);
    setSection("pacientes");
  } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement("div", { ref: profileRef, style: { position: "relative" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setProfileOpen((o) => !o), style: { display: "flex", alignItems: "center", gap: 9, background: profileOpen ? T.chipBg || "rgba(0,0,0,.06)" : "none", border: "1px solid " + (profileOpen ? T.chipBorder : "transparent"), cursor: "pointer", padding: "5px 10px 5px 6px", borderRadius: 10, transition: "all .15s" } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: clinicDisplayName(), src: clinicAvatarSrc(profilePic), size: 32 }), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0, textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text, lineHeight: 1.1, whiteSpace: "nowrap" } }, clinicDisplayName()), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, lineHeight: 1.1 } }, "Mi perfil")), /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "2.2", style: { flexShrink: 0, transform: profileOpen ? "rotate(180deg)" : "none", transition: "transform .2s" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), profileOpen && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "calc(100% + 8px)", right: 0, minWidth: 230, background: T.bg, border: "1px solid " + T.line, borderRadius: 14, boxShadow: "0 12px 40px -10px rgba(0,0,0,.4)", zIndex: 200, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "16px 18px 14px", borderBottom: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: clinicDisplayName(), src: clinicAvatarSrc(profilePic), size: 42 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text, lineHeight: 1.2 } }, clinicDisplayName()), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, "Administrador"))), [
    { label: "Cambiar foto", action: "photo", icon: /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "13", r: "4" })) },
    { label: "Configuraci\xF3n", action: "config", icon: /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })) },
    { label: "Cerrar sesi\xF3n", action: "logout", danger: true, icon: /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" })) }
  ].map((item) => /* @__PURE__ */ React.createElement("button", { key: item.action, onClick: () => {
    if (item.action === "photo") {
      profilePhotoInput.current && profilePhotoInput.current.click();
    } else if (item.action === "config") {
      nav("config");
      setProfileOpen(false);
    } else if (item.action === "logout") {
      if (window.JCSAAS && window.JCSAAS.enabled) {
        window.JCSAAS.logout().then(function() {
          location.reload();
        });
      } else {
        if (window.jcmAdminEndSession) window.jcmAdminEndSession();
        location.reload();
      }
    }
  }, style: { display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 18px", background: "none", border: "none", borderTop: "1px solid " + T.lineSoft, cursor: "pointer", color: item.danger ? "#C0285A" : T.text, fontFamily: T.sans, fontSize: 13, textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { color: item.danger ? "#C0285A" : T.textMute, display: "flex" } }, item.icon), item.label))), /* @__PURE__ */ React.createElement("input", { ref: profilePhotoInput, type: "file", accept: "image/*", style: { display: "none" }, onChange: (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        localStorage.setItem("jcm_admin_photo", ev.target.result);
        setProfilePic(ev.target.result);
      } catch (e2) {
      }
      setProfileOpen(false);
    };
    r.readAsDataURL(f);
  } })), /* @__PURE__ */ React.createElement("button", { onClick: () => window.jcmHardRefresh && window.jcmHardRefresh(), title: "Actualizar panel", style: { width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.chipBorder, background: T.chipBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M8 16H3v5" }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setNotifOpen(true), title: "Notificaciones", style: { position: "relative", width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.chipBorder, background: T.chipBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" })), notifCount > 0 && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: -2, right: -2, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 999, background: "#C0285A", color: "#fff", fontFamily: T.sans, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" } }, notifCount)), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    const nk = T.dark ? "cielo" : "azul";
    themeForced.current = true;
    setThemeKey(nk);
    try {
      localStorage.setItem("jcm_theme_pref", JSON.stringify({ key: nk, period: autoPeriod() }));
    } catch (e) {
    }
  }, title: T.dark ? "Modo d\xEDa" : "Modo noche", style: { width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.chipBorder, background: T.chipBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, T.dark ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4.5" }), /* @__PURE__ */ React.createElement("path", { d: "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" })) : /* @__PURE__ */ React.createElement("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" })))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { display: "flex", gap: 5, overflowX: "auto", padding: "5px 16px", borderBottom: "1px solid " + T.line, background: T.navBg, position: "relative", zIndex: 5, flexShrink: 0 } }, adminNavItems().map((n) => {
    const active = section === n.k;
    return /* @__PURE__ */ React.createElement("button", { key: n.k, onClick: () => nav(n.k), style: { flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 13px", borderRadius: 10, cursor: "pointer", border: "1px solid " + (active ? T.accent : T.line), background: active ? T.accent : T.chipBg, color: active ? T.onAccent || "#fff" : T.textMute, fontFamily: T.sans, fontSize: 11.5, fontWeight: active ? 600 : 500, whiteSpace: "nowrap", boxShadow: active ? "0 3px 10px -4px " + T.accent : "none", transition: "all .2s " + T.ease } }, n.k === "pendientes" && pendCount > 0 && /* @__PURE__ */ React.createElement("span", { style: { width: 5, height: 5, borderRadius: "50%", background: active ? T.onAccent || "#fff" : "#C0285A" } }), n.l);
  })), /* @__PURE__ */ React.createElement("div", { id: "jcm-main-scroll", className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "18px 20px" } }, /* @__PURE__ */ React.createElement("div", { key: section + (openPatient || ""), style: { animation: "jcFade .3s " + T.ease, maxWidth: 1500, margin: "0 auto" } }, body))), /* @__PURE__ */ React.createElement(Copilot, { T, patients, appts, addAppt, onDarCita: (pf) => setDarCita(pf) }), darCita && /* @__PURE__ */ React.createElement(NewCitaModal, { T, patients, addPatient, appts, time: darCita.time, day: darCita.day, prefill: darCita, onClose: () => setDarCita(null), onSave: (a) => {
    addAppt(a);
    setDarCita(null);
  }, onOpenPatient: (id) => {
    setOpenPatient(id);
    setSection("pacientes");
  } }), notifOpen && /* @__PURE__ */ React.createElement(NotifPopup, { T, patients, appts, onClose: () => setNotifOpen(false), onChanged: () => setNotifVer((v) => v + 1), go: (k) => {
    setNotifOpen(false);
    nav(k);
  }, openP: (id) => {
    setNotifOpen(false);
    setOpenPatient(id);
    setSection("pacientes");
  } }), showTour && /* @__PURE__ */ React.createElement(WelcomeTour, { T, go: (k) => nav(k), onClose: closeTour })));
}
function notifReadList() {
  try {
    var v = window.DB && DB.get("notif_read");
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}
function notifMarkAllRead(keys) {
  try {
    var set = {};
    notifReadList().forEach(function(k) {
      set[k] = 1;
    });
    (keys || []).forEach(function(k) {
      set[k] = 1;
    });
    window.DB && DB.set("notif_read", Object.keys(set));
  } catch (e) {
  }
}
function unreadNotifCount(patients, appts) {
  var read = {};
  notifReadList().forEach(function(k) {
    read[k] = 1;
  });
  var n = 0;
  var sc = window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : (patients || []).filter(function(p) {
    return !p.consent;
  });
  sc.forEach(function(p) {
    if (!read["c" + p.id]) n++;
  });
  ((window.CADMIN || {}).waMessages || []).forEach(function(m) {
    if (!read["w" + m.id]) n++;
  });
  ((window.CADMIN || {}).bizComments || []).forEach(function(b) {
    if (!read["b" + b.id]) n++;
  });
  var recitas = window.recitaDue ? window.recitaDue(patients) : [];
  recitas.forEach(function(x) {
    if (!read["re" + x.p.id]) n++;
  });
  var tasks = [];
  try {
    tasks = (window.DB && DB.get("admin_tasks") || []).filter(function(t) {
      return !t.done;
    });
  } catch (e) {
  }
  tasks.forEach(function(t) {
    if (!read["t" + t.id]) n++;
  });
  return n;
}
function NotifPopup({ T, patients, appts, onClose, go, openP, onChanged }) {
  const D = window.JCDATA;
  const [tab, setTab] = useState("todo");
  const read = {};
  notifReadList().forEach((k) => {
    read[k] = 1;
  });
  const wa = ((window.CADMIN || {}).waMessages || []).filter((m) => !read["w" + m.id]);
  const biz = ((window.CADMIN || {}).bizComments || []).filter((b) => !read["b" + b.id]);
  const sinConsent = (window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter((p) => !p.consent)).filter((p) => !read["c" + p.id]);
  const recitas = (window.recitaDue ? window.recitaDue(patients) : []).filter((x) => !read["re" + x.p.id]);
  let tasks = [];
  try {
    tasks = (window.DB && DB.get("admin_tasks") || []).filter((t) => !t.done && !read["t" + t.id]);
  } catch (e) {
  }
  const otros = [...wa, ...biz, ...tasks];
  const total = sinConsent.length + recitas.length + otros.length;
  function leerTodas() {
    const keys = [].concat(
      sinConsent.map((p) => "c" + p.id),
      recitas.map((x) => "re" + x.p.id),
      wa.map((m) => "w" + m.id),
      biz.map((b) => "b" + b.id),
      tasks.map((t) => "t" + t.id)
    );
    notifMarkAllRead(keys);
    if (onChanged) onChanged();
    onClose();
  }
  function leerUna(key) {
    notifMarkAllRead([key]);
    if (onChanged) onChanged();
  }
  const row = (key, color, ic, title, sub, action, fn) => /* @__PURE__ */ React.createElement("div", { key, style: { display: "flex", alignItems: "flex-start", gap: 11, padding: "11px 14px", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: color + "1A", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, ic)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, lineHeight: 1.35 } }, title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, sub)), action && /* @__PURE__ */ React.createElement("button", { onClick: fn, style: { flexShrink: 0, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" } }, action), /* @__PURE__ */ React.createElement("button", { onClick: () => leerUna(key), title: "Descartar esta notificaci\xF3n", style: { flexShrink: 0, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
  const ICb = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" }));
  const ICa = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" }));
  const ICc = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" }));
  const ICk = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M9 11l3 3 8-8" }), /* @__PURE__ */ React.createElement("path", { d: "M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" }));
  const tabs = [
    { id: "todo", label: "Todo", n: total },
    { id: "consents", label: "Consentimientos", n: sinConsent.length },
    { id: "recita", label: "Re-cita", n: recitas.length },
    { id: "otros", label: "Otros", n: otros.length }
  ].filter((t) => t.id === "todo" || t.n > 0);
  const activeTab = tabs.find((t) => t.id === tab) ? tab : "todo";
  const tabBtn = (t) => {
    const active = t.id === activeTab;
    return /* @__PURE__ */ React.createElement("button", { key: t.id, onClick: () => setTab(t.id), style: { display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 999, border: active ? "1px solid " + T.accent : "1px solid " + T.lineSoft, background: active ? T.accent + "18" : "transparent", fontFamily: T.sans, fontSize: 11, fontWeight: active ? 600 : 400, color: active ? T.accent : T.textMute, cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s" } }, t.label, t.n > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, fontWeight: 700, background: active ? T.accent : T.lineSoft, color: active ? "#fff" : T.textMute, borderRadius: 999, padding: "1px 6px", lineHeight: 1.6 } }, t.n));
  };
  const showConsents = activeTab === "todo" || activeTab === "consents";
  const showRecitas = activeTab === "todo" || activeTab === "recita";
  const showOtros = activeTab === "todo" || activeTab === "otros";
  const visibleCount = (showConsents ? sinConsent.length : 0) + (showRecitas ? recitas.length : 0) + (showOtros ? otros.length : 0);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { onClick: onClose, style: { position: "fixed", inset: 0, zIndex: 70 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: 60, right: 20, zIndex: 71, width: 372, maxWidth: "calc(100vw - 32px)", maxHeight: "78vh", display: "flex", flexDirection: "column", background: T.bg, border: "1px solid " + T.line, borderRadius: 14, boxShadow: "0 24px 60px -18px rgba(0,0,0,.55)", overflow: "hidden", animation: "jcSlideUp .25s " + T.ease } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 18, color: T.text } }, "Notificaciones"), total > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, fontWeight: 600, background: "#C0285A", color: "#fff", borderRadius: 999, padding: "2px 8px" } }, total)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, total > 0 && /* @__PURE__ */ React.createElement("button", { onClick: leerTodas, style: { fontFamily: T.sans, fontSize: 11, fontWeight: 500, color: T.accent, background: "none", border: "none", cursor: "pointer", padding: "4px 6px" } }, "Leer todas"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, title: "Cerrar", style: { background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 2 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))))), tabs.length > 1 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, padding: "10px 14px", borderBottom: "1px solid " + T.lineSoft, overflowX: "auto", flexShrink: 0 } }, tabs.map(tabBtn)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto" } }, total === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "34px 18px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textFaint } }, "Todo al d\xEDa. Sin notificaciones."), visibleCount === 0 && total > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "28px 18px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textFaint } }, "Sin notificaciones en esta categor\xEDa."), showConsents && sinConsent.map((p) => row("c" + p.id, "#C9A227", ICa, "Consentimiento por firmar", p.name, "Abrir ficha", () => openP(p.id))), showRecitas && recitas.map(({ p, r }) => row("re" + p.id, "#1F8A5B", ICb, "Toca re-citar \xB7 " + p.name, r.motivo, "WhatsApp", () => window.open(window.recitaWa ? window.recitaWa(p, r) : "https://wa.me/" + (p.phone || "").replace(/\D/g, ""), "_blank", "noopener"))), showOtros && wa.map((m) => row("w" + m.id, "#1F8A5B", ICb, m.name + " escribi\xF3 por WhatsApp", "\u201C" + m.msg + "\u201D \xB7 " + m.ago, "Responder", () => window.open("https://wa.me/" + (D ? D.wa : ""), "_blank", "noopener"))), showOtros && biz.map((b) => row("b" + b.id, T.accent, ICc, b.name + " coment\xF3 en " + b.net, "\u201C" + b.msg + "\u201D \xB7 " + b.ago, "Ver", () => go("marketing"))), showOtros && tasks.map((t) => row("t" + t.id, T.accent, ICk, "Pendiente del equipo", t.text, null, null))), /* @__PURE__ */ React.createElement("button", { onClick: () => go("pendientes"), style: { flexShrink: 0, padding: "13px", textAlign: "center", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.accent, background: T.surface, border: "none", borderTop: "1px solid " + T.line, cursor: "pointer" } }, "Abrir Pendientes \u2192")));
}
function Resumen({ T, D, A, appts, patients, go, updateAppt, removeAppt, themeKey, setThemeKey }) {
  const now = /* @__PURE__ */ new Date();
  const [edit, setEdit] = useState(null);
  const metaConn = (() => {
    try {
      const c = window.DB && window.DB.get("meta_creds") || {};
      return !!(c.token && c.account);
    } catch (e) {
      return false;
    }
  })();
  const [resModal, setResModal] = useState(null);
  const hoy = appts.filter((a) => apptDayOff(a) === 0 && a.status !== "anulada").sort((a, b) => a.time.localeCompare(b.time));
  const next3 = appts.slice().sort((a, b) => a.day - b.day || a.time.localeCompare(b.time)).slice(0, 3);
  const camps = (() => {
    try {
      const s = window.DB && window.DB.get("campaigns");
      if (Array.isArray(s)) return s.filter((c) => c.real);
    } catch (e) {
    }
    return [];
  })();
  const reach = camps.reduce((s, c) => s + c.reach, 0), leads = camps.reduce((s, c) => s + c.leads, 0), spend = camps.reduce((s, c) => s + c.spend, 0);
  const wd = ["L", "M", "M", "J", "V", "S", "D"];
  const _wkBase = /* @__PURE__ */ new Date();
  _wkBase.setHours(0, 0, 0, 0);
  const _todayIdx = (_wkBase.getDay() + 6) % 7;
  const _wkMon = new Date(_wkBase);
  _wkMon.setDate(_wkBase.getDate() - _todayIdx);
  const _dk = (dt) => dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2);
  const _apptDayIdx = (a) => {
    let d = null;
    try {
      d = a.fecha ? /* @__PURE__ */ new Date(a.fecha + "T00:00:00") : null;
    } catch (e) {
      d = null;
    }
    if (!d || isNaN(d)) {
      d = new Date(_wkBase);
      d.setDate(_wkBase.getDate() + (apptDayOff(a) || 0));
    }
    d.setHours(0, 0, 0, 0);
    return Math.round((d - _wkMon) / 864e5);
  };
  const week = [0, 0, 0, 0, 0, 0, 0];
  let wkCitas = 0;
  (appts || []).forEach((a) => {
    if (a.status === "anulada" || a.status === "cancelada") return;
    const di = _apptDayIdx(a);
    if (di >= 0 && di < 7) {
      week[di]++;
      wkCitas++;
    }
  });
  let wkMonto = 0;
  try {
    const _wkSun = new Date(_wkMon);
    _wkSun.setDate(_wkMon.getDate() + 6);
    const _mon = _dk(_wkMon), _sun = _dk(_wkSun);
    (window.cashMovimientos ? window.cashMovimientos() : []).forEach((m) => {
      if (m.type === "ingreso" && m._day && m._day >= _mon && m._day <= _sun) wkMonto += m.amount || 0;
    });
  } catch (e) {
  }
  const maxw = Math.max(1, week[0], week[1], week[2], week[3], week[4], week[5], week[6]);
  const sinCons = window.jcmConsentPending ? window.jcmConsentPending(patients, appts) : patients.filter((p) => !p.consent);
  const greet = now.getHours() < 13 ? "Buenos d\xEDas" : now.getHours() < 20 ? "Buenas tardes" : "Buenas noches";
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent } }, greet, ", ", clinicDisplayName()), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 32, letterSpacing: "-.02em", color: T.text, marginTop: 8, lineHeight: 1.05 } }, now.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" })), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "18px 18px", marginTop: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Resumen semanal"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, wkCitas, " ", wkCitas === 1 ? "cita" : "citas", wkMonto > 0 ? " \xB7 " + D.fmt(wkMonto) + " cobrado" : "")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 8, height: 84 } }, week.map((v, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 26, height: v / maxw * 60 + 4 + "px", background: i === _todayIdx ? T.accent : T.dark ? "rgba(242,237,230,.18)" : "rgba(20,20,15,.14)", borderRadius: 4 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, color: T.textMute } }, wd[i])))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16, paddingTop: 16, borderTop: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setResModal("pacientes"), style: { background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: patients.length, l: "Pacientes" })), /* @__PURE__ */ React.createElement("button", { onClick: () => setResModal("citas"), style: { background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: appts.length, l: "Citas semana" })), /* @__PURE__ */ React.createElement("button", { onClick: () => setResModal("consent"), style: { background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: sinCons.length, l: "Consent. pend.", accent: sinCons.length > 0 })))), resModal && (() => {
    const cfg = {
      pacientes: { title: "Pacientes", rows: patients.map((p) => ({ k: p.id, a: p.name, b: p.rut || p.phone || "" })) },
      citas: { title: "Citas de la semana", rows: appts.slice().sort((a, b) => apptDayOff(a) - apptDayOff(b) || (a.time || "").localeCompare(b.time || "")).map((a) => ({ k: a.id, a: a.name, b: (apptDayOff(a) === 0 ? "Hoy " : "") + (a.time || "") + " \xB7 " + (a.proc || "") })) },
      consent: { title: "Consentimientos pendientes", rows: sinCons.map((p) => ({ k: p.id, a: p.name, b: p.tags && p.tags[0] || "Paciente" })) }
    }[resModal];
    return /* @__PURE__ */ React.createElement(AdModal, { T, title: cfg.title + " (" + cfg.rows.length + ")", onClose: () => setResModal(null), footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => {
      setResModal(null);
      go(resModal === "citas" ? "agenda" : resModal === "consent" ? "pendientes" : "pacientes");
    } }, "Ir a la secci\xF3n") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, cfg.rows.length ? cfg.rows.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.k, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 2px", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: r.a, size: 36 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, r.a), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, r.b)))) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "16px 0" } }, "Sin registros.")));
  })(), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", margin: "24px 0 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Pr\xF3ximas " + next3.length + " cita" + (next3.length !== 1 ? "s" : "")), /* @__PURE__ */ React.createElement("button", { onClick: () => go("agenda"), style: linkBtn(T) }, "Ver agenda \u2192")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, next3.map((a) => /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => setEdit(a), style: { display: "flex", alignItems: "center", gap: 13, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer", textAlign: "left", width: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: T.text, lineHeight: 1 } }, a.time), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, marginTop: 3 } }, apptDayOff(a) === 0 ? "Hoy" : "Ma\xF1ana")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid " + T.line, paddingLeft: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, a.proc)), a.comentario ? /* @__PURE__ */ React.createElement(AdTag, { T, tone: "warn" }, a.comentario) : null, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.6", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" }))))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, margin: "24px 0 10px" } }, "Agenda de hoy"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, hoy.map((a) => /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => setEdit(a), style: { display: "flex", gap: 14, padding: "11px 0", borderBottom: "1px solid " + T.lineSoft, background: "none", border: "none", borderBottom: "1px solid " + T.lineSoft, cursor: "pointer", textAlign: "left", width: "100%", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 46, fontFamily: T.serif, fontSize: 16, color: T.text } }, a.time), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, borderLeft: "1px solid " + T.line, paddingLeft: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, a.proc)), /* @__PURE__ */ React.createElement(AdTag, { T, tone: a.status === "confirmada" ? "ok" : "warn" }, a.status === "confirmada" ? "OK" : "Pend."), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.6", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })))), hoy.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint, padding: "10px 0" } }, "Sin citas hoy.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", margin: "26px 0 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Resumen de Meta \xB7 Anuncios"), /* @__PURE__ */ React.createElement("button", { onClick: () => go("marketing"), style: linkBtn(T) }, "Marketing \u2192")), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 28, height: 28, borderRadius: 7, background: "#1877F2", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: 16 } }, "f"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text } }, "Meta Ads \xB7 ", camps.filter((c) => c.active).length, " campa\xF1as activas"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: metaConn ? "#1F8A5B" : T.textMute, marginTop: 2 } }, metaConn ? "\u25CF Conectado a Meta Ads" : "Sin conectar \xB7 conecta tu cuenta para ver datos reales")), /* @__PURE__ */ React.createElement("button", { onClick: () => go("integraciones"), style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", padding: "8px 12px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", background: metaConn ? "transparent" : "#1877F2", color: metaConn ? "#1F8A5B" : "#fff", border: metaConn ? "1px solid #1F8A5B" : "none" } }, metaConn ? "Administrar" : "Conectar")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement(AdStat, { T, n: (reach / 1e3).toFixed(1) + "k", l: "Alcance" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: leads, l: "Leads" }), /* @__PURE__ */ React.createElement(AdStat, { T, n: D.fmt(spend), l: "Inversi\xF3n" })), camps.slice(0, 3).map((c) => /* @__PURE__ */ React.createElement("div", { key: c.id, style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderTop: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text } }, c.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute } }, c.net, " \xB7 ", c.leads, " leads")), /* @__PURE__ */ React.createElement(AdTag, { T, tone: c.active ? "ok" : "muted" }, c.active ? "Activa" : "Pausada")))), edit && /* @__PURE__ */ React.createElement(CitaEditModal, { T, appt: edit, patients, onClose: () => setEdit(null), onSave: (patch) => {
    updateAppt(edit.id, patch);
    setEdit(null);
  }, onCancel: () => {
    removeAppt(edit.id);
    setEdit(null);
  } }));
}
function linkBtn(T) {
  return { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, background: "none", border: "none", cursor: "pointer", padding: 0 };
}
function AdStat({ T, n, l, accent }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: accent ? "rgba(192,40,90,.08)" : T.dark ? "rgba(242,237,230,.03)" : "rgba(20,20,15,.02)", border: "1px solid " + (accent ? "rgba(192,40,90,.4)" : T.line), borderRadius: 8, padding: "14px 8px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, color: accent ? "#C0285A" : T.text, lineHeight: 1 } }, n), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, marginTop: 7 } }, l));
}
const HPX = 70, OPEN = 480, CLOSE = 1200;
const OWNER_WA = "56997880877";
const wdN = ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"];
function notifyCita(appt, patient, D) {
  const fecha = appt.fecha || "";
  const cli = patient && patient.phone ? patient.phone : appt.phone || "";
  const lines = [];
  lines.push("\u{1F4F1} WhatsApp al paciente" + (cli ? " (" + cli + ")" : ""));
  lines.push("\u{1F4F1} WhatsApp a ti (+" + OWNER_WA + ")");
  lines.push("\u2709\uFE0F Correo de confirmaci\xF3n" + (appt.email ? " (" + appt.email + ")" : ""));
  return { lines, cli };
}
function Toast({ T, data, onClose }) {
  useEffect(() => {
    const id = setTimeout(onClose, 6e3);
    return () => clearTimeout(id);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: "50%", bottom: 22, transform: "translateX(-50%)", zIndex: 55, width: "min(360px, calc(100% - 32px))", background: T.dark ? "#16170f" : "#fff", border: "1px solid " + T.line, borderRadius: 12, boxShadow: "0 18px 50px -16px rgba(0,0,0,.5)", padding: "16px 18px", animation: "jcSlideUp .3s " + T.ease } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 24, height: 24, borderRadius: "50%", background: "#1F8A5B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2.4" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, "Cita creada \xB7 notificaciones enviadas")), data.lines.map((l, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, padding: "3px 0" } }, l)), data.cli && /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/" + data.cli.replace(/\D/g, ""), target: "_blank", rel: "noopener", style: { display: "inline-block", marginTop: 10, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#1F8A5B", textDecoration: "none", border: "1px solid #1F8A5B", borderRadius: 999, padding: "8px 14px" } }, "Abrir WhatsApp del paciente \u2192"));
}
function procInitial(proc) {
  if (!proc) return "";
  const n = proc.toLowerCase();
  if (/botox|toxina|btx|tox\b/.test(n)) return "B";
  if (/rino/.test(n)) return "R";
  if (/sculptra|bioestim|col[aá]geno/.test(n)) return "S";
  if (/lipol[ií]t|disolver|lipolisis/.test(n)) return "L";
  if (/evaluac/.test(n)) return "Ev";
  if (/mesoterap|vitamina|nctf|rejuran|salm[oó]n/.test(n)) return "M";
  if (/hialur|armoniz|juv[eé]derm/.test(n)) return "H";
  if (/quemador|grasa/.test(n)) return "Q";
  if (/plasma|prp/.test(n)) return "P";
  if (/control/.test(n)) return "C";
  return proc.trim().charAt(0).toUpperCase();
}
function ApptBlock({ T, a, onClick, compact }) {
  const st = jcmApptState(a, T);
  const ini = procInitial(a.proc);
  const nameLabel = ini ? a.name + " \u2022 " + ini : a.name;
  return /* @__PURE__ */ React.createElement("div", { "data-appt": true, onClick: (e) => {
    e.stopPropagation();
    onClick(a);
  }, style: { cursor: "pointer", background: T.surface2, border: "1px solid " + st.color + "66", borderLeft: "3px solid " + st.color, borderRadius: 6, padding: compact ? "5px 7px" : "8px 11px", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: compact ? 10.5 : 12.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, nameLabel), !compact && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: st.color, flexShrink: 0 } }, a.time)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: compact ? 9 : 10.5, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, compact ? a.time + " \xB7 " + a.proc : a.proc), !compact && st.key !== "pendiente" && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, display: "inline-block", fontFamily: T.sans, fontSize: 9, fontWeight: 600, letterSpacing: ".04em", color: st.color, background: st.color + "1a", borderRadius: 5, padding: "2px 6px" } }, st.label));
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
    events.sort(function(a, b) {
      return (a.dtstart || "").localeCompare(b.dtstart || "");
    });
    return events;
  }
  function parseDate(dtStr) {
    if (!dtStr) return { fecha: "", hora: "10:00" };
    const clean = dtStr.replace(/Z$/, "").replace(/[^0-9T]/g, "");
    const parts = clean.split("T");
    const dp = parts[0] || "";
    const tp = parts[1] || "";
    const fecha = dp.length >= 8 ? dp.slice(0, 4) + "-" + dp.slice(4, 6) + "-" + dp.slice(6, 8) : "";
    const hora = tp.length >= 4 ? tp.slice(0, 2) + ":" + tp.slice(2, 4) : "10:00";
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
      if (!evs.length) {
        window.jcmToast && window.jcmToast("No se encontraron eventos en el archivo.", "error");
        return;
      }
      setRows(evs.map(function(ev) {
        const { fecha, hora } = parseDate(ev.dtstart);
        return { sel: true, fecha, hora, name: ev.summary || "", proc: "", nota: ev.description || "", _src: ev.summary || "" };
      }));
      setStep(2);
    };
    reader.readAsText(file, "UTF-8");
  }
  function upd(i, field, val) {
    setRows(function(rs) {
      return rs.map(function(r, idx) {
        return idx === i ? Object.assign({}, r, { [field]: val }) : r;
      });
    });
  }
  function doImport() {
    const sel = rows.filter(function(r) {
      return r.sel && r.fecha;
    });
    if (!sel.length) {
      window.jcmToast && window.jcmToast("Selecciona al menos una cita.", "error");
      return;
    }
    sel.forEach(function(r) {
      onImport({ name: r.name || "Sin nombre", proc: r.proc || r._src || "Cita importada", fecha: r.fecha, time: r.hora || "10:00", comentario: r.nota || "", status: "pendiente", importadoICS: true });
    });
    window.jcmToast && window.jcmToast(sel.length + " cita(s) importadas desde el calendario.", "ok");
    onClose();
  }
  const selCount = rows.filter(function(r) {
    return r.sel;
  }).length;
  const inp = { fontFamily: T.sans, fontSize: 12, color: T.text, background: T.bg, border: "1px solid " + T.line, borderRadius: 6, padding: "4px 7px" };
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 1200, background: "rgba(0,0,0,.65)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, borderRadius: 20, width: "100%", maxWidth: step === 2 ? 720 : 440, maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 28px 70px rgba(0,0,0,.55)" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "22px 22px 16px", display: "flex", alignItems: "flex-start", gap: 12, borderBottom: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text } }, "Importar desde calendario"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 3 } }, step === 1 ? "Sube un archivo .ics exportado desde iPhone, iCloud, Google Calendar u otro." : rows.length + " evento(s) encontrados \u2014 revisa y confirma cuales importar")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { flexShrink: 0, width: 34, height: 34, borderRadius: 9, border: "1px solid " + T.line, background: "none", color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), step === 1 && /* @__PURE__ */ React.createElement("div", { style: { padding: "22px" } }, /* @__PURE__ */ React.createElement("div", { style: { background: T.bg, border: "1px solid " + T.line, borderRadius: 12, padding: "14px 16px", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text, marginBottom: 6 } }, "Como exportar desde iPhone"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.65 } }, "1. Abre ", /* @__PURE__ */ React.createElement("strong", null, "iCloud.com"), " en Safari o Chrome", /* @__PURE__ */ React.createElement("br", null), "2. Ve a ", /* @__PURE__ */ React.createElement("strong", null, "Calendario"), " y selecciona tu calendario", /* @__PURE__ */ React.createElement("br", null), "3. Toca el icono de compartir y elige ", /* @__PURE__ */ React.createElement("strong", null, "Exportar .ics"), /* @__PURE__ */ React.createElement("br", null), "4. Descarga el archivo y subelo aqui")), /* @__PURE__ */ React.createElement(
    "div",
    {
      onDragOver: function(e) {
        e.preventDefault();
        setDrag(true);
      },
      onDragLeave: function() {
        setDrag(false);
      },
      onDrop: function(e) {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files[0];
        if (f) handleFile(f);
      },
      onClick: function() {
        document.getElementById("jcm-ics-input").click();
      },
      style: { border: "2px dashed " + (drag ? T.accent : T.line), borderRadius: 14, padding: "40px 20px", textAlign: "center", cursor: "pointer", transition: "border-color .2s, background .2s", background: drag ? T.accent + "0c" : "transparent" }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "30", height: "30", viewBox: "0 0 24 24", fill: "none", stroke: drag ? T.accent : T.textMute, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), /* @__PURE__ */ React.createElement("polyline", { points: "17 8 12 3 7 8" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "3", x2: "12", y2: "15" })),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text } }, "Arrastra el archivo .ics aqui"),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 4 } }, "o haz clic para seleccionarlo")
  ), /* @__PURE__ */ React.createElement("input", { id: "jcm-ics-input", type: "file", accept: ".ics", style: { display: "none" }, onChange: function(e) {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  } })), step === 2 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 22px 8px", display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 12, color: T.textMute, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: selCount === rows.length, onChange: function(e) {
    setRows(function(rs) {
      return rs.map(function(r) {
        return Object.assign({}, r, { sel: e.target.checked });
      });
    });
  } }), "Seleccionar todas"), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", fontFamily: T.sans, fontSize: 12, color: T.accent, fontWeight: 600 } }, selCount, " seleccionadas")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "0 22px" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, ["", "Fecha", "Hora", "Nombre paciente", "Procedimiento", "Nota"].map(function(h, i) {
    return /* @__PURE__ */ React.createElement("th", { key: i, style: { fontFamily: T.sans, fontSize: 10, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: T.textFaint, padding: "8px 5px", textAlign: "left", borderBottom: "1px solid " + T.line, whiteSpace: "nowrap" } }, h);
  }))), /* @__PURE__ */ React.createElement("tbody", null, rows.map(function(r, i) {
    return /* @__PURE__ */ React.createElement("tr", { key: i, style: { opacity: r.sel ? 1 : 0.4, borderBottom: "1px solid " + T.line + "55" } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 5px" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: r.sel, onChange: function(e) {
      upd(i, "sel", e.target.checked);
    } })), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 5px" } }, /* @__PURE__ */ React.createElement("input", { type: "date", value: r.fecha, onChange: function(e) {
      upd(i, "fecha", e.target.value);
    }, style: Object.assign({}, inp, { width: 130 }) })), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 5px" } }, /* @__PURE__ */ React.createElement("input", { type: "time", value: r.hora, onChange: function(e) {
      upd(i, "hora", e.target.value);
    }, style: Object.assign({}, inp, { width: 82 }) })), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 5px" } }, /* @__PURE__ */ React.createElement("input", { value: r.name, onChange: function(e) {
      upd(i, "name", e.target.value);
    }, placeholder: "Nombre del paciente", style: Object.assign({}, inp, { width: 160 }) })), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 5px" } }, /* @__PURE__ */ React.createElement("input", { value: r.proc, onChange: function(e) {
      upd(i, "proc", e.target.value);
    }, placeholder: r._src || "Procedimiento", style: Object.assign({}, inp, { width: 150 }) })), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 5px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, display: "block", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, title: r.nota }, r.nota || "\u2014")));
  })))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 22px", borderTop: "1px solid " + T.line, display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: function() {
    setStep(1);
  } }, "Otro archivo"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: doImport }, "Importar ", selCount, " cita(s)")))));
}
function Agenda({ T, appts, patients, addAppt, addPatient, updateAppt, removeAppt, onOpenPatient, onSyncWeb }) {
  const [webBusy, setWebBusy] = useState(false);
  function traerWeb() {
    if (webBusy || !onSyncWeb) return;
    setWebBusy(true);
    Promise.resolve(onSyncWeb()).then(function(r) {
      if (!r || !r.ok) {
        window.jcmToast && window.jcmToast("No se pudieron traer las reservas: " + (r && r.reason || "error") + ".", "error");
      } else if (r.added > 0) window.jcmToast && window.jcmToast(r.added + " reserva(s) web tra\xEDda(s) a la agenda.", "ok");
      else if (r.pending > 0) window.jcmToast && window.jcmToast(r.pending + " reserva(s) en la nube, ya estaban en la agenda.", "info");
      else window.jcmToast && window.jcmToast("No hay reservas web nuevas en la nube. Si acabas de agendar y no llega, es la escritura desde el link p\xFAblico (App Check / dominio).", "info");
    }).catch(function() {
      window.jcmToast && window.jcmToast("Error al traer las reservas.", "error");
    }).then(function() {
      setWebBusy(false);
    });
  }
  const [view, setView] = useState("semana");
  const [day, setDay] = useState(0);
  const [nueva, setNueva] = useState(null);
  const [edit, setEdit] = useState(null);
  const [toast, setToast] = useState(null);
  const [hoverA, setHoverA] = useState(null);
  const [fichaConfirm, setFichaConfirm] = useState(null);
  const [now, setNow] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const el = document.getElementById("jcm-main-scroll");
    if (el) el.scrollTop = 0;
  }, []);
  const D = window.JCDATA;
  const list = appts.filter((a) => apptDayOff(a) === day && a.status !== "anulada");
  const anuladas = appts.filter((a) => a.status === "anulada").sort((a, b) => (b.anuladaAt || 0) - (a.anuladaAt || 0));
  const anuladasByDay = anuladas.reduce((acc, a) => {
    const k = a.fecha || "sin-fecha";
    (acc[k] = acc[k] || []).push(a);
    return acc;
  }, {});
  const anuladaDayKeys = Object.keys(anuladasByDay).sort().reverse();
  const [openADays, setOpenADays] = useState(() => new Set(anuladaDayKeys.slice(0, 1)));
  function toggleADay(k) {
    setOpenADays((prev) => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  }
  function fmtADay(fechaStr) {
    if (!fechaStr || fechaStr === "sin-fecha") return "Sin fecha";
    try {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const d = /* @__PURE__ */ new Date(fechaStr + "T00:00:00");
      d.setHours(0, 0, 0, 0);
      const diff = Math.round((d - today) / 864e5);
      if (diff === 0) return "Hoy, " + d.toLocaleDateString("es-CL", { day: "numeric", month: "short" });
      if (diff === -1) return "Ayer, " + d.toLocaleDateString("es-CL", { day: "numeric", month: "short" });
      return d.toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "short", year: d.getFullYear() !== today.getFullYear() ? "numeric" : void 0 });
    } catch (e) {
      return fechaStr;
    }
  }
  const listStacked = (() => {
    const sorted = [...list].sort((a, b) => mins(a.time) - mins(b.time));
    let cur = -1;
    return sorted.map((a) => {
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
  const hours = [];
  for (let h = OPEN / 60; h < CLOSE / 60; h++) hours.push(h);
  const week = [];
  const b0 = /* @__PURE__ */ new Date();
  for (let off = 0; off < 7; off++) {
    const dt = new Date(b0);
    dt.setDate(b0.getDate() + off);
    week.push({ off, dd: dt.getDate(), wd: wdN[dt.getDay()], lbl: off === 0 ? "Hoy" : off === 1 ? "Ma\xF1ana" : wdN[dt.getDay()], count: appts.filter((a) => apptDayOff(a) === off && a.status !== "anulada").length });
  }
  function clickTimeline(e) {
    if (e.target.closest("[data-appt]")) return;
    const r = e.currentTarget.getBoundingClientRect();
    let m = OPEN + Math.round((e.clientY - r.top) / HPX * 60 / 15) * 15;
    m = Math.max(OPEN, Math.min(CLOSE - 30, m));
    setNueva({ time: Math.floor(m / 60).toString().padStart(2, "0") + ":" + (m % 60).toString().padStart(2, "0"), day, fromSlot: true });
  }
  function onCreate(a) {
    addAppt(a);
  }
  const tabBtn = (k, l) => /* @__PURE__ */ React.createElement("button", { onClick: () => setView(k), style: { flex: 1, fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", padding: "10px", borderRadius: 7, cursor: "pointer", background: view === k ? T.text : "transparent", color: view === k ? T.bg : T.textMute, border: "none" } }, l);
  const isBase = true;
  const viewToggleNode = /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", gap: 4, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: 4 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setView("dia"), title: "Vista lista / d\xEDa", style: { display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 32, borderRadius: 7, cursor: "pointer", border: "none", background: view === "dia" ? T.accent : "transparent", color: view === "dia" ? T.onAccent || "#fff" : T.textMute } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setView("semana"), title: "Vista calendario / semana", style: { display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 32, borderRadius: 7, cursor: "pointer", border: "none", background: view === "semana" ? T.accent : "transparent", color: view === "semana" ? T.onAccent || "#fff" : T.textMute } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4" }))));
  const [icsMod, setIcsMod] = useState(false);
  const nuevaBtnNode = /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setNueva({ time: "10:00", day: view === "dia" ? day : 0 }) }, "+ Nueva Cita");
  const icsBtnNode = /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIcsMod(true),
      title: "Importar citas desde archivo de calendario (.ics)",
      style: { display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 13px", border: "1px solid " + T.line, background: T.surface, borderRadius: 9, fontFamily: T.sans, fontSize: 12, color: T.textMute, cursor: "pointer", whiteSpace: "nowrap" }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4M12 14l-2 2 2 2M12 14h4" })),
    "Importar .ics"
  );
  return /* @__PURE__ */ React.createElement("div", null, !isBase && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: 12, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 200 } }, /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 28, letterSpacing: "-.02em", color: T.text, margin: 0 } }, "Reservas y Citas"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 2 } }, "Gestiona la agenda de la cl\xEDnica, confirma asistencias y asigna puntos.")), viewToggleNode, onSyncWeb && /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: traerWeb }, webBusy ? "Trayendo\u2026" : "\u21BB Traer reservas web"), nuevaBtnNode), isBase && view === "dia" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontFamily: T.serif, fontSize: 18, color: T.text } }, "Reservas y Citas"), viewToggleNode, icsBtnNode, nuevaBtnNode), view === "semana" ? /* @__PURE__ */ React.createElement(SemanaGrid, { T, week, appts, viewToggle: viewToggleNode, nuevaBtn: nuevaBtnNode, icsBtn: icsBtnNode, onNew: (off, time) => setNueva({ time, day: off, fromSlot: true }), onEdit: setEdit, updateAppt, removeAppt, onDay: (off) => {
    setDay(off);
    setView("dia");
  }, onVerFicha: (appt) => {
    const clean = (s) => (s || "").replace(/\D/g, "");
    const ap = clean(appt.phone || "");
    let found = null;
    if (ap.length >= 8) found = (patients || []).find((x) => {
      const xp = clean(x.phone || "");
      return xp.length >= 8 && xp.slice(-8) === ap.slice(-8);
    });
    if (!found) {
      const an = (appt.name || "").toLowerCase().trim();
      found = (patients || []).find((x) => {
        const xn = (x.name || "").toLowerCase();
        return xn === an || an.length >= 4 && (xn.startsWith(an.split(" ")[0]) || an.startsWith(xn.split(" ")[0]));
      });
    }
    setFichaConfirm({ appt, patient: found || null });
  } }) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 } }, week.map((d) => /* @__PURE__ */ React.createElement("button", { key: d.off, onClick: () => setDay(d.off), style: { flexShrink: 0, minWidth: 62, padding: "10px 10px", borderRadius: 10, cursor: "pointer", textAlign: "center", background: day === d.off ? T.accent : T.surface, border: "1px solid " + (day === d.off ? T.accent : T.line) } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase", color: day === d.off ? T.onAccent : T.textMute } }, d.lbl), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: day === d.off ? T.onAccent : T.text, marginTop: 2 } }, d.dd), /* @__PURE__ */ React.createElement("div", { style: { height: 5, marginTop: 5, display: "flex", justifyContent: "center", gap: 2 } }, d.count > 0 && Array.from({ length: Math.min(d.count, 3) }).map((_, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { width: 4, height: 4, borderRadius: "50%", background: day === d.off ? T.onAccent : T.accent } })))))), /* @__PURE__ */ React.createElement("div", { onClick: clickTimeline, style: { position: "relative", height: hours.length * HPX, borderTop: "1px solid " + T.line, cursor: "copy" } }, hours.map((h, i) => /* @__PURE__ */ React.createElement("div", { key: h, style: { position: "absolute", top: i * HPX, left: 0, right: 0, height: HPX, borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, top: -8, fontFamily: T.sans, fontSize: 10, color: T.textFaint, width: 42 } }, h, ":00"))), listStacked.map((a) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: a.id,
      style: { position: "absolute", left: 48, right: 4, top: a._top, height: a._h },
      onMouseEnter: (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setHoverA({ a, x: Math.min(r.right + 8, window.innerWidth - 250), y: Math.min(r.top, window.innerHeight - 180) });
      },
      onMouseLeave: () => setHoverA(null)
    },
    /* @__PURE__ */ React.createElement(ApptBlock, { T, a, onClick: (x) => {
      setHoverA(null);
      setEdit(x);
    } })
  )), showNow && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 42, right: 0, top: (nowMin - OPEN) * HPX / 60, height: 0, borderTop: "2px solid #C0285A", zIndex: 5, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 0, top: -7, width: 8, height: 8, borderRadius: "50%", background: "#C0285A" } }), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", right: 2, top: -16, fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", color: "#C0285A", textTransform: "uppercase" } }, "Ahora ", fmtTime(now)))), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 12 } }, "Toca un espacio libre para crear una cita \xB7 toca una cita para editarla.")), anuladas.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 22, background: T.surface, border: "1px solid " + T.line, borderRadius: 12, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "14px 18px 10px" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "#9AA0A6", flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.textMute } }, "Citas anuladas (", anuladas.length, ")"), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", fontFamily: T.sans, fontSize: 11, color: T.textFaint } }, "Restaura si fue un error")), anuladaDayKeys.map((k, ki) => {
    const group = anuladasByDay[k];
    const isOpen = openADays.has(k);
    return /* @__PURE__ */ React.createElement("div", { key: k, style: { borderTop: ki === 0 ? "1px solid " + T.lineSoft : "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleADay(k), style: { width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#9AA0A6", strokeWidth: "2", strokeLinecap: "round", style: { flexShrink: 0, transition: "transform .2s", transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.textMute, flex: 1 } }, fmtADay(k)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, background: T.lineSoft, borderRadius: 999, padding: "2px 8px" } }, group.length, " cita", group.length !== 1 ? "s" : "")), isOpen && /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid " + T.lineSoft } }, group.map((a, ai) => /* @__PURE__ */ React.createElement("div", { key: a.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 18px", borderBottom: ai < group.length - 1 ? "1px solid " + T.lineSoft : "none", background: T.bg } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.textMute, textDecoration: "line-through", textDecorationColor: "#9AA0A6" } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, [a.proc, a.time && a.time + " h"].filter(Boolean).join("  \xB7  "), a.phone ? "  \xB7  " + a.phone : ""), a.anuladaAt && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 2 } }, "Anulada el ", new Date(a.anuladaAt).toLocaleDateString("es-CL", { day: "numeric", month: "short" }), " \xB7 ", new Date(a.anuladaAt).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }))), /* @__PURE__ */ React.createElement("button", { onClick: () => updateAppt(a.id, { status: "pendiente", anuladaAt: null }), style: { flexShrink: 0, fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 11px", cursor: "pointer" } }, "Restaurar")))));
  })), icsMod && /* @__PURE__ */ React.createElement(ICSImportModal, { T, onClose: () => setIcsMod(false), onImport: addAppt }), nueva && /* @__PURE__ */ React.createElement(NewCitaModal, { T, patients, addPatient, appts, time: nueva.time, day: nueva.day, prefill: nueva.fromSlot ? { time: nueva.time, day: nueva.day } : void 0, onClose: () => setNueva(null), onSave: onCreate, onOpenPatient }), edit && /* @__PURE__ */ React.createElement(CitaEditModal, { T, appt: edit, patients, onClose: () => setEdit(null), onSave: (patch) => {
    updateAppt(edit.id, patch);
    setEdit(null);
  }, onCancel: () => {
    removeAppt(edit.id);
    setEdit(null);
  } }), toast && /* @__PURE__ */ React.createElement(Toast, { T, data: toast, onClose: () => setToast(null) }), fichaConfirm && /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
    if (e.target === e.currentTarget) setFichaConfirm(null);
  }, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.48)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { background: T.bg, borderRadius: 16, padding: 24, maxWidth: 390, width: "100%", boxShadow: "0 24px 60px -18px rgba(0,0,0,.5)", border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent, marginBottom: 12 } }, "Ir a ficha del paciente"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14, padding: "12px 14px", background: T.surface, borderRadius: 10, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 3 } }, "Cita agendada"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, fichaConfirm.appt.name), fichaConfirm.appt.phone && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, fichaConfirm.appt.phone), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, fichaConfirm.appt.proc)), fichaConfirm.patient ? /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18, padding: "12px 14px", background: "rgba(31,138,91,.08)", borderRadius: 10, border: "1px solid rgba(31,138,91,.28)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: "#1F8A5B", marginBottom: 4 } }, "\u2713 Paciente encontrado"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, fichaConfirm.patient.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, [fichaConfirm.patient.phone, fichaConfirm.patient.rut].filter(Boolean).join(" \xB7 "))) : /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18, padding: "12px 14px", background: "rgba(192,40,90,.07)", borderRadius: 10, border: "1px solid rgba(192,40,90,.22)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: "#C0285A", marginBottom: 3 } }, "Sin ficha registrada"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, marginBottom: 0 } }, "No existe una ficha para este paciente. Puedes crearla ahora con los datos de la cita.")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setFichaConfirm(null), style: { flex: 1, fontFamily: T.sans, fontSize: 13, fontWeight: 500, padding: "11px", borderRadius: 8, cursor: "pointer", background: T.surface, color: T.textMute, border: "1px solid " + T.line } }, "Cancelar"), fichaConfirm.patient ? /* @__PURE__ */ React.createElement("button", { onClick: () => {
    if (onOpenPatient) onOpenPatient(fichaConfirm.patient.id);
    setFichaConfirm(null);
  }, style: { flex: 1, fontFamily: T.sans, fontSize: 13, fontWeight: 600, padding: "11px", borderRadius: 8, cursor: "pointer", background: T.accent, color: T.onAccent || "#fff", border: "none" } }, "Ir a ficha") : /* @__PURE__ */ React.createElement("button", { onClick: () => {
    const a = fichaConfirm.appt;
    const np = addPatient({ name: (a.name || "").trim(), phone: (a.phone || "").trim(), rut: (a.rut || "").trim(), email: (a.email || "").trim(), age: 0 });
    if (np && np.id && onOpenPatient) onOpenPatient(np.id);
    setFichaConfirm(null);
  }, style: { flex: 2, fontFamily: T.sans, fontSize: 13, fontWeight: 600, padding: "11px", borderRadius: 8, cursor: "pointer", background: T.accent, color: T.onAccent || "#fff", border: "none" } }, "Crear ficha ahora")))), hoverA && hoverA.a && !edit && (() => {
    const a = hoverA.a, isPP = a.status === "pendiente_pago";
    const _hs2 = jcmApptState(a, T);
    const ac = _hs2.color, estado = _hs2.label;
    return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", left: hoverA.x, top: hoverA.y, zIndex: 90, width: 232, background: T.bg, border: "1px solid " + T.line, borderLeft: "3px solid " + ac, borderRadius: 10, boxShadow: "0 18px 44px -14px rgba(0,0,0,.5)", padding: "12px 14px", pointerEvents: "none", animation: "jcFade .14s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.text, marginBottom: 8 } }, a.name), [["Hora", a.time], ["Duraci\xF3n", (parseInt(a.dur) || 60) + " min"], ["Procedimiento", a.proc || "\u2014"], ["Estado", estado]].map(([k, v]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", justifyContent: "space-between", gap: 10, padding: "3px 0", fontFamily: T.sans, fontSize: 11.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, k), /* @__PURE__ */ React.createElement("span", { style: { color: T.text, fontWeight: 500, textAlign: "right" } }, v))));
  })());
}
const PROC_LIST = () => {
  const D = window.JCDATA;
  const p = [];
  D.catalog.forEach((s) => s.groups.forEach((g) => g.items.forEach((it) => p.push(it.n))));
  return p;
};
function procOptionsByCat(names) {
  const catOf = {};
  try {
    (window.clinicServiceList ? window.clinicServiceList() : []).forEach((s) => {
      if (s && s.name) catOf[s.name] = s.cat || "Otros";
    });
  } catch (e) {
  }
  const byCat = {};
  (names || []).forEach((n) => {
    const c = catOf[n] || "Otros";
    (byCat[c] = byCat[c] || []).push(n);
  });
  return Object.keys(byCat).sort().map((c) => React.createElement("optgroup", { key: c, label: c }, byCat[c].map((n) => React.createElement("option", { key: n, value: n }, n))));
}
const selS = (T) => ({ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" });
const lblS = (T) => ({ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 });
const ADMIN_HALF_HOURS = (() => {
  const s = [];
  for (let h = 8; h <= 20; h++) {
    s.push((h < 10 ? "0" : "") + h + ":00");
    s.push((h < 10 ? "0" : "") + h + ":30");
  }
  return s;
})();
const ADMIN_QUARTER_HOURS = (() => {
  const s = [];
  for (let h = 8; h <= 20; h++) {
    ["00", "15", "30", "45"].forEach((m) => s.push((h < 10 ? "0" : "") + h + ":" + m));
  }
  return s;
})();
function adminSlotMins() {
  try {
    return typeof clinicSeeded === "function" && clinicSeeded() ? 15 : 30;
  } catch (e) {
    return 30;
  }
}
function adminSlots() {
  return adminSlotMins() === 15 ? ADMIN_QUARTER_HOURS : ADMIN_HALF_HOURS;
}
function jcmApptState(a, T) {
  a = a || {};
  if (a.status === "anulada" || a.status === "cancelada") return { key: "anulada", label: "Anulada", color: "#9AA0A6" };
  if (a.status === "no_asistio") return { key: "no_asistio", label: "No asisti\xF3", color: "#C0285A" };
  if (a.status === "atendiendose") return { key: "atendiendose", label: "Atendi\xE9ndose", color: "#1F8A5B" };
  if (a.attended || a.status === "atendida") return { key: "atendida", label: "Atendida", color: "#1A50A3" };
  if (a.status === "en_sala") return { key: "en_sala", label: "En sala de espera", color: "#0E7490" };
  if (a.status === "pendiente_pago") return { key: "pendiente_pago", label: "\u23F3 Pago pendiente", color: "#B8860B" };
  if (a.status === "confirmada") return { key: "confirmada", label: "Confirmada", color: "#16A34A" };
  return { key: "pendiente", label: "Pendiente", color: T && T.accent || "#8A7E6B" };
}
if (typeof window !== "undefined") window.jcmApptState = jcmApptState;
function ComentarioPopup({ T, appt, updateAppt, onClose }) {
  const [txt, setTxt] = useState(appt.comentario || "");
  const save = () => {
    updateAppt(appt.id, { comentario: txt.trim() });
    onClose();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { onClick: onClose, style: { position: "fixed", inset: 0, zIndex: 94, background: "rgba(0,0,0,.38)" } }), /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { position: "fixed", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 95, width: 340, background: T.bg, border: "1px solid " + T.line, borderRadius: 14, boxShadow: "0 24px 60px -16px rgba(0,0,0,.6)", padding: "22px 20px 18px", animation: "jcFade .16s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text, marginBottom: 4 } }, appt.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 14 } }, appt.time, " \xB7 ", appt.proc || "Procedimiento"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Comentario"), /* @__PURE__ */ React.createElement("textarea", { value: txt, onChange: (e) => setTxt(e.target.value), placeholder: "Ej. Abona el d\xEDa de la atenci\xF3n", rows: 3, style: { width: "100%", boxSizing: "border-box", background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "9px 11px", fontFamily: T.sans, fontSize: 13, color: T.text, resize: "vertical", outline: "none" }, autoFocus: true }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { flex: 1, height: 36, borderRadius: 8, border: "1px solid " + T.line, background: "transparent", color: T.textMute, fontFamily: T.sans, fontSize: 12.5, cursor: "pointer" } }, "Cancelar"), /* @__PURE__ */ React.createElement("button", { onClick: save, style: { flex: 2, height: 36, borderRadius: 8, border: "none", background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, cursor: "pointer" } }, "Guardar comentario"))));
}
function SemanaGrid({ T, week, appts, onNew, onEdit, updateAppt, removeAppt, onDay, onVerFicha, viewToggle, nuevaBtn, icsBtn }) {
  const D = window.JCDATA;
  const [wkOff, setWkOff] = useState(0);
  const [menu, setMenu] = useState(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [menuDayOff, setMenuDayOff] = useState(null);
  const [hover, setHover] = useState(null);
  const [editCom, setEditCom] = useState(null);
  const hideT = useRef(null);
  const v2 = true;
  const activeAppt = menu ? appts.find((a) => a.id === menu) : null;
  const team = (() => {
    try {
      var t = window.DB && DB.get("team");
      if (Array.isArray(t) && t.length) return t;
    } catch (e) {
    }
    try {
      if (window.CADMIN && Array.isArray(CADMIN.team) && CADMIN.team.length) return CADMIN.team;
    } catch (e) {
    }
    return [];
  })();
  const multiProf = team.length >= 2;
  const firstProf = team[0] ? team[0].name : "";
  const [selProf, setSelProf] = useState(firstProf);
  const [profOpen, setProfOpen] = useState(false);
  const profMatch = (a) => !multiProf || ((a.prof || "").trim() ? (a.prof || "").trim() === selProf : selProf === firstProf);
  const selProfColor = (() => {
    const m = team.find((x) => x.name === selProf);
    return m && m.color || T.accent;
  })();
  const DOWS = ["DOM", "LUN", "MAR", "MI\xC9", "JUE", "VIE", "S\xC1B"];
  const DOWS_FULL = ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "S\xE1bado"];
  const MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - (v2 ? (today.getDay() + 6) % 7 : today.getDay()) + wkOff * 7);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const dt = new Date(start);
    dt.setDate(start.getDate() + i);
    days.push({ date: dt, dd: dt.getDate(), dow: DOWS[dt.getDay()], off: Math.round((dt - today) / 864e5), isToday: dt.getTime() === today.getTime() });
  }
  const last = days[6].date;
  const hours = [];
  for (let h = 8; h <= 20; h++) hours.push(h);
  const hourOf = (t) => parseInt((t || "0").split(":")[0], 10);
  const atCell = (off, h) => appts.filter((a) => apptDayOff(a) === off && hourOf(a.time) === h);
  const navBtn = { width: 34, height: 34, borderRadius: 9, border: "1px solid " + T.line, background: T.surface, color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
  const WPX = 70, WK_OPEN = 8, WK_CLOSE = 20;
  const wkGridH = (WK_CLOSE - WK_OPEN + 1) * WPX;
  const slots = adminSlots(), slotPx = WPX * adminSlotMins() / 60;
  const topW = (t) => (mins(t) - WK_OPEN * 60) * WPX / 60;
  const stackAppts = (list) => {
    if (!list.length) return [];
    const sorted = [...list].sort((a, b) => mins(a.time) - mins(b.time));
    let cursor = -1;
    return sorted.map((a) => {
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
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" } }, v2 && /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: 9, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 160, fontFamily: T.serif, fontSize: v2 ? 18 : 21, color: T.text } }, days[0].dd, " de ", /* @__PURE__ */ React.createElement("span", { style: { fontStyle: "italic", color: T.accent } }, cap(MES[start.getMonth()])), " \u2013 ", last.getDate(), " de ", /* @__PURE__ */ React.createElement("span", { style: { fontStyle: "italic", color: T.accent } }, cap(MES[last.getMonth()]))), v2 && viewToggle, v2 && icsBtn, v2 && nuevaBtn, v2 && team.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setProfOpen((o) => !o), title: "Ver agenda de un profesional", style: { display: "flex", alignItems: "center", gap: 8, height: 34, padding: "0 13px", border: "1px solid " + T.line, background: T.surface, borderRadius: 9, color: T.text, fontFamily: T.sans, fontSize: 12.5, cursor: "pointer", maxWidth: 220 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: selProfColor, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, selProf || "Profesional"), /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "2", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), profOpen && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { onClick: () => setProfOpen(false), style: { position: "fixed", inset: 0, zIndex: 60 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", right: 0, top: "calc(100% + 6px)", minWidth: 224, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, boxShadow: T.shadow, overflow: "hidden", zIndex: 61 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "9px 14px 6px", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint } }, "Agenda por profesional"), team.map((m) => /* @__PURE__ */ React.createElement("button", { key: m.id || m.name, onClick: () => {
    setSelProf(m.name);
    setProfOpen(false);
  }, style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "10px 14px", background: m.name === selProf ? T.accent + "14" : "transparent", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, color: m.name === selProf ? T.accent : T.textMute } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: m.color || T.accent, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, m.name), m.name === selProf && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10 } }, "\u2713")))))), /* @__PURE__ */ React.createElement("button", { onClick: () => setWkOff(0), style: { fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: wkOff === 0 ? T.textMute : T.text, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: "8px 16px", cursor: "pointer" } }, "Hoy"), /* @__PURE__ */ React.createElement("button", { onClick: () => setWkOff(wkOff - 1), title: "Semana anterior", style: navBtn }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setWkOff(wkOff + 1), title: "Semana siguiente", style: navBtn }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { overflowX: "auto", overflowY: "auto", maxHeight: v2 ? "76vh" : "74vh", margin: v2 ? "0 10px" : 0, border: "1px solid " + T.line, borderRadius: v2 ? 16 : 12, boxShadow: v2 ? T.shadow : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { minWidth: 900 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: v2 ? "52px repeat(7, minmax(112px,1fr)) 52px" : "52px repeat(7, minmax(112px,1fr))", position: "sticky", top: 0, zIndex: 3, background: T.navBg, backdropFilter: "blur(8px)" } }, /* @__PURE__ */ React.createElement("div", { style: { borderBottom: "1px solid " + T.line } }), days.map((d, i) => v2 ? (
    /* Encabezado horizontal en una línea (ahorra espacio): "Lunes 22 jun" */
    /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "11px 6px", textAlign: "center", borderBottom: "1px solid " + T.line, borderLeft: "1px solid " + T.lineSoft, background: d.isToday ? T.accent + "12" : "transparent", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 15.5, color: d.isToday ? T.accent : T.text } }, DOWS_FULL[d.date.getDay()], " ", d.dd), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: d.isToday ? T.accent : T.textMute, marginLeft: 5 } }, MES[d.date.getMonth()].slice(0, 3)))
  ) : /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "12px 4px 10px", textAlign: "center", borderBottom: "1px solid " + T.line, borderLeft: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", color: d.isToday ? T.accent : T.textMute } }, d.dow), d.isToday ? /* @__PURE__ */ React.createElement("div", { style: { margin: "3px auto 0", width: 30, height: 30, borderRadius: "50%", background: T.accent, color: T.onAccent || "#fff", fontFamily: T.serif, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" } }, d.dd) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: T.text, marginTop: 2 } }, d.dd))), v2 && /* @__PURE__ */ React.createElement("div", { style: { borderBottom: "1px solid " + T.line, borderLeft: "1px solid " + T.lineSoft } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 52, flexShrink: 0, position: "relative", height: wkGridH, borderRight: "1px solid " + T.lineSoft, overflow: "hidden" } }, ADMIN_HALF_HOURS.map((hhmm, i) => {
    const half = hhmm.endsWith(":30");
    return /* @__PURE__ */ React.createElement("div", { key: hhmm, style: { position: "absolute", top: i * (WPX / 2) + 2, right: 6, fontFamily: T.sans, fontSize: half ? 9 : v2 ? 10.5 : 10, fontWeight: v2 && !half ? 600 : 400, color: v2 ? half ? T.textFaint : T.textMute : T.textFaint, opacity: half ? v2 ? 0.8 : 0.5 : 1, pointerEvents: "none", userSelect: "none" } }, hhmm);
  })), days.map((d, ci) => {
    const da = appts.filter((a) => apptDayOff(a) === d.off && a.status !== "anulada" && mins(a.time) >= WK_OPEN * 60 && mins(a.time) < (WK_CLOSE + 1) * 60 && (!v2 || profMatch(a)));
    return /* @__PURE__ */ React.createElement("div", { key: ci, style: { flex: "1 1 0", minWidth: 112, position: "relative", height: wkGridH, borderLeft: "1px solid " + T.lineSoft, background: d.isToday ? T.accent + "08" : "transparent" } }, slots.map((hhmm, i) => {
      const isHourLine = hhmm.endsWith(":00");
      const isHalfLine = hhmm.endsWith(":30");
      const blocked = v2 ? da.some((a) => {
        const as = mins(a.time), ad = parseInt(a.dur) || 60, ts = mins(hhmm);
        return ts >= as && ts < as + ad;
      }) : appts.some((a) => {
        if (a.day !== d.off) return false;
        const as = mins(a.time), ad = parseInt(a.dur) || 60, ts = mins(hhmm);
        return ts >= as && ts < as + ad;
      });
      return /* @__PURE__ */ React.createElement("div", { key: hhmm, style: { position: "absolute", left: 0, right: 0, top: i * slotPx, height: slotPx, borderBottom: isHourLine || isHalfLine ? "1px solid " + T.lineSoft : "none" } }, !blocked && /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "jc-cell",
          onClick: () => onNew(d.off, hhmm),
          title: "Agendar " + hhmm,
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }
        },
        /* @__PURE__ */ React.createElement("span", { className: "jc-cell-add", style: { width: 15, height: 15, borderRadius: "50%", border: "1px solid " + T.line, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })))
      ));
    }), stackAppts(da).map((a) => {
      const isPendPago = a.status === "pendiente_pago";
      const accentColor = jcmApptState(a, T).color;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: a.id,
          className: "jc-appt",
          style: { position: "absolute", left: 1, right: 1, top: a._top, height: a._h, zIndex: 2 },
          onMouseEnter: (e) => {
            if (hideT.current) clearTimeout(hideT.current);
            const r = e.currentTarget.getBoundingClientRect();
            if (v2) {
              let x = r.right + 8;
              if (x + 280 > window.innerWidth) x = r.left - 288;
              setHover({ a, x: Math.max(8, x), y: Math.min(r.top, window.innerHeight - 360) });
            } else {
              setHover({ a, x: Math.min(r.right + 8, window.innerWidth - 250), y: Math.min(r.top, window.innerHeight - 180) });
            }
          },
          onMouseLeave: () => {
            if (v2) {
              if (hideT.current) clearTimeout(hideT.current);
              hideT.current = setTimeout(() => setHover(null), 160);
            } else setHover(null);
          },
          onClick: (e) => {
            e.stopPropagation();
            setHover(null);
            const r = e.currentTarget.getBoundingClientRect();
            setMenuPos({ x: Math.min(r.left, window.innerWidth - 210), y: Math.min(r.bottom + 4, window.innerHeight - 290) });
            setMenuDayOff(d.off);
            setMenu(menu === a.id ? null : a.id);
          }
        },
        v2 ? (
          /* Estilo "Medilink barra": barra lateral del color del estado + tinte leve + solo el nombre (el detalle va en el hover) */
          /* @__PURE__ */ React.createElement("div", { style: { height: "100%", cursor: "pointer", background: isPendPago ? "#B8860B" + (T.dark ? "22" : "16") : accentColor + (T.dark ? "26" : "1c"), border: "1px solid " + accentColor + "33", borderLeft: "4px solid " + accentColor, borderRadius: 6, padding: "0 6px 0 5px", overflow: "hidden", display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name), a.proc && /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, width: 15, height: 15, borderRadius: 3, background: accentColor + "33", color: accentColor, fontFamily: T.sans, fontSize: 8.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: 0 } }, a.proc[0].toUpperCase()))
        ) : /* @__PURE__ */ React.createElement("div", { style: { height: "100%", cursor: "pointer", background: isPendPago ? "#FFF8E122" : T.surface, border: "1px solid " + (isPendPago ? "#B8860B44" : T.line), borderLeft: "3px solid " + accentColor, borderRadius: 6, padding: "4px 6px", overflow: "hidden", boxShadow: "0 2px 6px rgba(40,38,30,.08)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: accentColor, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.name)), a._h > 26 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.time, " \xB7 ", parseInt(a.dur) || 60, " min", a.proc ? " \xB7 " + (isPendPago ? "\u23F3 Pago pendiente" : a.proc) : ""))
      );
    }));
  }), v2 && /* @__PURE__ */ React.createElement("div", { style: { width: 52, flexShrink: 0, position: "relative", height: wkGridH, borderLeft: "1px solid " + T.lineSoft, overflow: "hidden" } }, ADMIN_HALF_HOURS.map((hhmm, i) => {
    const half = hhmm.endsWith(":30");
    return /* @__PURE__ */ React.createElement("div", { key: hhmm, style: { position: "absolute", top: i * (WPX / 2) + 2, left: 6, fontFamily: T.sans, fontSize: half ? 9 : 10.5, fontWeight: half ? 400 : 600, color: half ? T.textFaint : T.textMute, opacity: half ? 0.8 : 1, pointerEvents: "none", userSelect: "none" } }, hhmm);
  }))))), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 12 } }, "Pasa el mouse por un horario libre y toca el ", /* @__PURE__ */ React.createElement("b", { style: { color: T.accent } }, "+"), " para agendar \xB7 pasa el cursor por una cita para ver el detalle y acciones."), hover && hover.a && !menu && (() => {
    const a = hover.a, isPP = a.status === "pendiente_pago";
    const _hs = jcmApptState(a, T);
    const ac = _hs.color, estado = _hs.label;
    const ini = (a.name || "").split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
    const rows = [["Hora", a.time], ["Duraci\xF3n", (parseInt(a.dur) || 60) + " min"], ["Procedimiento", a.proc || "\u2014"], ["Estado", estado, ac]];
    if ((a.prof || "").trim()) rows.push(["Profesional", a.prof, (team.find((x) => x.name === a.prof) || {}).color || T.accent]);
    return v2 ? /* @__PURE__ */ React.createElement(
      "div",
      {
        onMouseEnter: () => {
          if (hideT.current) clearTimeout(hideT.current);
        },
        onMouseLeave: () => setHover(null),
        style: { position: "fixed", left: hover.x, top: hover.y, zIndex: 90, width: 280, background: T.bg, border: "1px solid " + T.line, borderRadius: 12, boxShadow: "0 20px 50px -16px rgba(0,0,0,.55)", overflow: "hidden", animation: "jcFade .14s ease" }
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "13px 15px 11px", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: 9, background: ac, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, flexShrink: 0 } }, ini), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 16, color: T.text, lineHeight: 1.15 } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: ac, marginTop: 3 } }, estado))),
      /* @__PURE__ */ React.createElement("div", { style: { padding: "6px 15px 11px" } }, rows.map(([k, v, c], i) => /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, padding: "7px 0", borderBottom: i < rows.length - 1 ? "1px solid " + T.lineSoft : "none" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, flexShrink: 0 } }, k), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: c || T.text, textAlign: "right", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, v)))),
      a.comentario && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 15px 11px" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "9px 11px", background: T.surface, borderRadius: 8, fontFamily: T.sans, fontSize: 11.5, color: T.text, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" } }, a.comentario)),
      /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, padding: "0 15px 13px" } }, [
        ["Confirmar", () => updateAppt(a.id, { status: "confirmada", attended: false }), "#16A34A", false],
        ["Atendido", () => updateAppt(a.id, { status: "atendida", attended: true }), "#C9A227", false],
        ["No asisti\xF3", () => updateAppt(a.id, { status: "no_asistio", attended: false }), "#C0285A", false],
        ["Cancelar", () => updateAppt(a.id, { status: "anulada", attended: false, anuladaAt: Date.now() }), "#C0285A", true],
        ["Ficha", () => {
          if (onVerFicha) onVerFicha(a);
        }, T.textMute, false],
        ["Comentario", () => {
          setEditCom(a);
        }, T.textMute, false]
      ].map(([lbl, fn, col, filled]) => /* @__PURE__ */ React.createElement("button", { key: lbl, onClick: () => {
        fn();
        setHover(null);
      }, style: { height: 30, borderRadius: 7, border: "1px solid " + (filled ? "#C0285A" : T.line), background: filled ? "#C0285A" : T.surface, color: filled ? "#fff" : col, fontFamily: T.sans, fontSize: 10.5, fontWeight: filled ? 600 : 500, cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", padding: "0 4px" } }, lbl)))
    ) : (
      /* Vista clásica (otras clínicas): tabla simple, sin acciones */
      /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", left: hover.x, top: hover.y, zIndex: 90, width: 232, background: T.bg, border: "1px solid " + T.line, borderLeft: "3px solid " + ac, borderRadius: 10, boxShadow: "0 18px 44px -14px rgba(0,0,0,.5)", padding: "12px 14px", pointerEvents: "none", animation: "jcFade .14s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.text, marginBottom: 8 } }, a.name), [["Hora", a.time], ["Duraci\xF3n", (parseInt(a.dur) || 60) + " min"], ["Procedimiento", a.proc || "\u2014"], ["Estado", estado]].map(([k, v]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", justifyContent: "space-between", gap: 10, padding: "3px 0", fontFamily: T.sans, fontSize: 11.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute } }, k), /* @__PURE__ */ React.createElement("span", { style: { color: T.text, fontWeight: 500, textAlign: "right" } }, v))), a.comentario && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, paddingTop: 8, borderTop: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginBottom: 3 } }, "Comentario"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.text, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" } }, a.comentario)))
    );
  })(), menu && activeAppt && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { onClick: () => setMenu(null), style: { position: "fixed", inset: 0, zIndex: 79 } }), /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { position: "fixed", left: menuPos.x, top: menuPos.y, zIndex: 80, minWidth: 210, background: T.bg, border: "1px solid " + T.line, borderRadius: 8, boxShadow: "0 16px 40px -12px rgba(0,0,0,.5)", overflow: "hidden", padding: "4px 0", animation: "jcSlideUp .2s ease" } }, [
    ["Ver ficha del paciente", () => {
      if (onVerFicha) onVerFicha(activeAppt);
      setMenu(null);
    }],
    ["Cambiar fecha / hora", () => {
      onEdit(activeAppt);
      setMenu(null);
    }],
    ["Modificar duraci\xF3n", () => {
      onEdit(activeAppt);
      setMenu(null);
    }],
    ["Agregar comentario", () => {
      setEditCom(activeAppt);
      setMenu(null);
    }],
    ["__sep", null],
    ...activeAppt.status === "pendiente_pago" ? [["\u2713 Confirmar transferencia", () => {
      updateAppt(activeAppt.id, { status: "confirmada" });
      setMenu(null);
    }, "#1F8A5B"]] : [],
    ["Confirmar cita", () => {
      updateAppt(activeAppt.id, { status: "confirmada", attended: false });
      setMenu(null);
    }, "#16A34A"],
    ["Marcar como atendido", () => {
      updateAppt(activeAppt.id, { status: "atendida", attended: true });
      setMenu(null);
    }],
    ["No asisti\xF3", () => {
      updateAppt(activeAppt.id, { status: "no_asistio", attended: false });
      setMenu(null);
    }, "#C0285A"],
    ["__sep", null],
    ["Anular cita", () => {
      updateAppt(activeAppt.id, { status: "anulada", attended: false, anuladaAt: Date.now() });
      setMenu(null);
    }, "#C0285A"]
  ].map((it, i) => it[0] === "__sep" ? /* @__PURE__ */ React.createElement("div", { key: i, style: { height: 1, background: T.lineSoft, margin: "4px 0" } }) : /* @__PURE__ */ React.createElement("button", { key: i, onClick: it[1], style: { display: "block", width: "100%", textAlign: "left", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, color: it[2] || T.text } }, it[0])))), editCom && /* @__PURE__ */ React.createElement(ComentarioPopup, { T, appt: editCom, updateAppt, onClose: () => setEditCom(null) }));
}
function Summ({ T, k, v }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute } }, k), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, textAlign: "right" } }, v));
}
function NewCitaModal({ T, patients, addPatient, time, day, onClose, onSave, prefill, appts, onOpenPatient }) {
  const D = window.JCDATA;
  const A = window.JCADMIN;
  const [savedPatId, setSavedPatId] = useState("");
  const team = (window.CADMIN || { team: [] }).team;
  const especialidades = D.catalog.map((s) => s.sec);
  const pf = prefill || {};
  const [step, setStep] = useState(pf.time ? 2 : 1);
  const [esp, setEsp] = useState("Todas");
  const [proc, setProc] = useState(pf.proc || "Evaluaci\xF3n general");
  const [prof, setProf] = useState(team[0] ? team[0].name : clinicDisplayName());
  const [recurso, setRecurso] = useState("No especificado");
  const [camilla, setCamilla] = useState("Box 1");
  const [dur, setDur] = useState("30 minutos");
  let sucursalesList = [];
  try {
    sucursalesList = (window.DB && window.DB.get("sucursales") || []).map((s) => s.name).filter(Boolean);
  } catch (e) {
  }
  const [sucursal, setSucursal] = useState(pf.sucursal || (sucursalesList[0] || ""));
  const [notas, setNotas] = useState(pf.notas || "");
  const [pick, setPick] = useState(pf.time ? { dayOff: pf.day || 0, time: pf.time } : null);
  const [tipo, setTipo] = useState(pf.patName && !pf.patId ? "nuevo" : "existente");
  const [pid, setPid] = useState(pf.patId || "");
  const [patQ, setPatQ] = useState("");
  const [nombre, setNombre] = useState(pf.patName && !pf.patId ? pf.patName : "");
  const [rut, setRut] = useState("");
  const [phone, setPhone] = useState("+56 9 ");
  const [email, setEmail] = useState("");
  const [sendMail, setSendMail] = useState(true);
  const ORIGEN_ORG = ["Paciente antiguo / fidelizado", "Org\xE1nico \xB7 Instagram", "Org\xE1nico \xB7 Facebook", "Org\xE1nico \xB7 TikTok", "Referido de paciente", "Pas\xF3 por la cl\xEDnica (walk-in)", "B\xFAsqueda en Google"];
  const metaCamps = ((window.CADMIN || { campaigns: [] }).campaigns || []).filter((c) => c.active);
  const metaConn = (((window.CADMIN || { integrations: [] }).integrations || []).find((i) => /meta/i.test(i.name)) || {}).connected;
  const [origen, setOrigen] = useState("");
  const allClinicProcs = window.clinicServiceList ? Array.from(new Set(window.clinicServiceList().map((s) => s.name))) : PROC_LIST();
  const procsByEsp = esp === "Todas" ? allClinicProcs : (D.catalog.find((s) => s.sec === esp) || { groups: [] }).groups.reduce((a, g) => a.concat(g.items.map((i) => i.n)), []);
  const wdN2 = ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"];
  const b0 = /* @__PURE__ */ new Date();
  const week = [];
  for (let off = 0; off < 7; off++) {
    const dt = new Date(b0);
    dt.setDate(b0.getDate() + off);
    week.push({ off, dd: dt.getDate(), mm: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][dt.getMonth()], wd: wdN2[dt.getDay()], wday: dt.getDay() });
  }
  const dayInfo = (off) => {
    const dt = new Date(b0);
    dt.setDate(b0.getDate() + off);
    return { wd: wdN2[dt.getDay()], dd: dt.getDate(), mm: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][dt.getMonth()] };
  };
  const pat = patients.find((p) => p.id === pid);
  const finalName = tipo === "existente" ? pat ? pat.name : "" : nombre;
  const finalPhone = pat ? pat.phone : phone;
  const finalEmail = pat ? pat.email : email;
  const selStyle = selS(T), lbl = lblS(T);
  function confirm() {
    try {
      const apptFecha = new Date(b0.getFullYear(), b0.getMonth(), b0.getDate() + pick.dayOff).toISOString().slice(0, 10);
      let resolvedPatId = pat ? pat.id : "";
      if (tipo === "nuevo" && typeof addPatient === "function") {
        try {
          const np = addPatient({ name: nombre.trim(), rut: rut.trim(), phone: phone.trim(), email: email.trim(), age: 0, fechaTs: (/* @__PURE__ */ new Date(apptFecha + "T00:00:00")).getTime() });
          if (np && np.id) resolvedPatId = np.id;
        } catch (e) {
        }
      }
      setSavedPatId(resolvedPatId || "");
      onSave({ name: finalName, patId: resolvedPatId, rut: pat ? pat.rut : rut, phone: finalPhone, email: finalEmail, proc, prof, sucursal, recurso, camilla, dur, origen, comentario: notas, time: pick.time, day: pick.dayOff, fecha: apptFecha, status: "pendiente", paid: false });
      try {
        const dt = /* @__PURE__ */ new Date(apptFecha + "T00:00:00");
        const curr = D.availability(dt.getDay());
        D.saveDateSlots(apptFecha, (curr.slots || []).filter((s) => s !== pick.time));
      } catch (e) {
      }
      if (sendMail) {
        const waP = (finalPhone || "").replace(/[^0-9]/g, "");
        if (waP.length >= 8) {
          const wk2 = dayInfo(pick.dayOff);
          const msg2 = encodeURIComponent("Hola " + finalName + " \u{1F44B}\n\nTu cita en " + clinicDisplayName() + " qued\xF3 confirmada:\n\n\u{1F4C5} " + wk2.wd + " " + wk2.dd + " " + wk2.mm + "\n\u{1F550} " + pick.time + " hrs\n\u{1F489} " + proc + "\n\u{1F468}\u200D\u2695\uFE0F " + prof + "\n\nRecuerda llegar 5 min antes. Si necesitas reagendar, av\xEDsanos con 24 h de anticipaci\xF3n.\n\n\xA1Nos vemos pronto! \u{1F33F}");
          setTimeout(() => window.open("https://api.whatsapp.com/send?phone=" + waP + "&text=" + msg2, "_blank", "noopener"), 400);
        }
      }
      setStep(3);
    } catch (e) {
      console.error("Error al confirmar cita:", e);
    }
  }
  if (step === 3) {
    let addToCalendar2 = function() {
      try {
        const pad = (n) => String(n).padStart(2, "0");
        const durMin = parseInt(dur, 10) || 60;
        const start = /* @__PURE__ */ new Date(apptFecha + "T" + pick.time + ":00");
        const end = new Date(start.getTime() + durMin * 6e4);
        const fmt = (d) => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00";
        const now = /* @__PURE__ */ new Date();
        const stamp = now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) + "T" + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + pad(now.getUTCSeconds()) + "Z";
        const esc = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
        const ics = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//Medique//Agenda//ES",
          "CALSCALE:GREGORIAN",
          "METHOD:PUBLISH",
          "BEGIN:VEVENT",
          "UID:cita-" + Date.now() + "@medique",
          "DTSTAMP:" + stamp,
          "DTSTART:" + fmt(start),
          "DTEND:" + fmt(end),
          "SUMMARY:" + esc("Cita " + clinicDisplayName() + " \xB7 " + proc),
          "DESCRIPTION:" + esc("Paciente: " + (finalName || "\u2014") + "\nProfesional: " + prof + "\nProcedimiento: " + proc),
          "LOCATION:" + esc(clinicDisplayName()),
          "BEGIN:VALARM",
          "TRIGGER:-PT24H",
          "ACTION:DISPLAY",
          "DESCRIPTION:" + esc("Recordatorio: cita en " + clinicDisplayName() + " ma\xF1ana"),
          "END:VALARM",
          "END:VEVENT",
          "END:VCALENDAR"
        ].join("\r\n");
        const ua = navigator.userAgent || "";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
        if (isMobile) {
          window.location.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
          return;
        }
        const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cita-" + apptFecha + ".ics";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 4e3);
      } catch (e) {
        console.error("Error al crear evento de calendario:", e);
      }
    };
    var addToCalendar = addToCalendar2;
    const wk = dayInfo(pick.dayOff);
    const apptFecha = new Date(b0.getFullYear(), b0.getMonth(), b0.getDate() + pick.dayOff).toISOString().slice(0, 10);
    const waPhone = (finalPhone || "").replace(/[^0-9]/g, "");
    const waMsg = encodeURIComponent("Hola " + finalName + " \u{1F44B}\n\nTu cita en " + clinicDisplayName() + " qued\xF3 confirmada:\n\n\u{1F4C5} " + wk.wd + " " + wk.dd + " " + wk.mm + "\n\u{1F550} " + pick.time + " hrs\n\u{1F489} " + proc + "\n\u{1F468}\u200D\u2695\uFE0F " + prof + "\n\nRecuerda llegar 5 min antes. Si necesitas reagendar, av\xEDsanos con 24 h de anticipaci\xF3n.\n\n\xA1Nos vemos pronto! \u{1F33F}");
    const waUrl = "https://api.whatsapp.com/send?phone=" + waPhone + "&text=" + waMsg;
    const daySlots = D ? D.availability((/* @__PURE__ */ new Date(apptFecha + "T00:00:00")).getDay()).slots || [] : [];
    return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Cita agendada", onClose, wide: true, footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: onClose }, "Cerrar"), savedPatId && onOpenPatient && /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => {
      onOpenPatient(savedPatId);
      onClose();
    } }, "\u{1F464} Ir a la ficha"), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: addToCalendar2 }, "\u{1F4C5} Agregar al calendario"), waPhone && /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => window.open(waUrl, "_blank") }, "\u{1F4F1} Notificar por WhatsApp")) }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "10px 0 4px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 60, height: 60, borderRadius: "50%", background: "rgba(31,138,91,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" } }, /* @__PURE__ */ React.createElement("svg", { width: "30", height: "30", viewBox: "0 0 24 24", fill: "none", stroke: "#1F8A5B", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 26, color: T.text } }, "\xA1Cita agendada con \xE9xito!"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 6 } }, "El horario fue bloqueado en el sistema")), /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(31,138,91,.07)", border: "1px solid rgba(31,138,91,.28)", borderRadius: 10, padding: "14px 16px", marginTop: 14 } }, /* @__PURE__ */ React.createElement(Summ, { T, k: "Paciente", v: finalName || "\u2014" }), /* @__PURE__ */ React.createElement(Summ, { T, k: "Procedimiento", v: proc }), /* @__PURE__ */ React.createElement(Summ, { T, k: "Profesional", v: prof }), sucursal && /* @__PURE__ */ React.createElement(Summ, { T, k: "Sucursal", v: sucursal }), /* @__PURE__ */ React.createElement(Summ, { T, k: "Fecha", v: wk.wd + " " + wk.dd + " " + wk.mm }), /* @__PURE__ */ React.createElement(Summ, { T, k: "Hora", v: pick.time })), daySlots.length > 0 && (() => {
      const takenByOthers = new Set(
        (appts || []).filter((a) => (a.fecha === apptFecha || a.day === pick.dayOff) && a.time && a.time !== pick.time).map((a) => a.time)
      );
      return /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Horarios del d\xEDa"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } }, daySlots.map((s) => {
        const sel = s === pick.time;
        const taken = takenByOthers.has(s);
        return /* @__PURE__ */ React.createElement("span", { key: s, style: {
          fontFamily: T.sans,
          fontSize: 11,
          padding: "5px 9px",
          borderRadius: 6,
          background: sel ? T.accent : taken ? T.surface : T.chipBg,
          color: sel ? T.onAccent || "#fff" : taken ? T.textFaint : T.text,
          border: "1px solid " + (sel ? T.accent : taken ? T.lineSoft : T.chipBorder),
          fontWeight: sel ? 600 : 400,
          textDecoration: taken ? "line-through" : "none"
        } }, s);
      })), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 } }, "Solo el horario agendado qued\xF3 bloqueado \xB7 los dem\xE1s siguen disponibles"));
    })());
  }
  if (step === 2) {
    const wk = dayInfo(pick.dayOff);
    const ok = (finalName || "").trim();
    return /* @__PURE__ */ React.createElement(
      AdModal,
      {
        T,
        title: "Dar cita \xB7 datos del paciente",
        onClose,
        wide: true,
        footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flex: 1 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: sendMail, onChange: (e) => setSendMail(e.target.checked) }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, "Notificar por WhatsApp")), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => setStep(1) }, "Atr\xE1s"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => ok && confirm() }, "Continuar"))
      },
      /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(31,138,91,.08)", border: "1px solid rgba(31,138,91,.3)", borderRadius: 8, padding: "12px 14px", marginBottom: 16, fontFamily: T.sans, fontSize: 12.5, color: T.text } }, "Cita seleccionada \xB7 ", /* @__PURE__ */ React.createElement("b", null, wk.wd, " ", wk.dd, " ", wk.mm), " a las ", /* @__PURE__ */ React.createElement("b", null, pick.time), " \xB7 ", prof),
      /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Tratamiento"), /* @__PURE__ */ React.createElement("select", { value: proc, onChange: (e) => setProc(e.target.value), style: selStyle }, /* @__PURE__ */ React.createElement("option", { value: "Evaluaci\xF3n general" }, "Evaluaci\xF3n general"), (window.JCDATA && window.JCDATA.catalog ? window.JCDATA.catalog : []).map((sec) => /* @__PURE__ */ React.createElement("optgroup", { key: sec.sec, label: sec.sec }, sec.groups.flatMap((g) => g.items).map((it) => /* @__PURE__ */ React.createElement("option", { key: it.n, value: it.n }, it.n)))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Duraci\xF3n"), /* @__PURE__ */ React.createElement("select", { value: dur, onChange: (e) => setDur(e.target.value), style: selStyle }, /* @__PURE__ */ React.createElement("option", null, "15 minutos"), /* @__PURE__ */ React.createElement("option", null, "30 minutos"), /* @__PURE__ */ React.createElement("option", null, "45 minutos"), /* @__PURE__ */ React.createElement("option", null, "60 minutos"), /* @__PURE__ */ React.createElement("option", null, "90 minutos")))),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } }, [["existente", "Paciente existente"], ["nuevo", "Paciente nuevo"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setTipo(k), style: { flex: 1, fontFamily: T.sans, fontSize: 11.5, fontWeight: 500, padding: "12px", borderRadius: 7, cursor: "pointer", background: tipo === k ? T.surface2 : T.surface, color: tipo === k ? T.text : T.textMute, border: "1px solid " + (tipo === k ? T.accent : T.line) } }, l))),
      tipo === "existente" ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Paciente"), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.7", style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4.3-4.3" })), /* @__PURE__ */ React.createElement("input", { value: patQ, onChange: (e) => setPatQ(e.target.value), placeholder: "Buscar por nombre o RUT\u2026", style: { ...selStyle, paddingLeft: 34 } })), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { maxHeight: 230, overflowY: "auto", border: "1px solid " + T.line, borderRadius: 8 } }, (() => {
        const q = patQ.trim().toLowerCase();
        const qNorm = q.replace(/[^0-9k]/g, "");
        const fl = q ? patients.filter((p) => (p.name || "").toLowerCase().includes(q) || (p.rut || "").toLowerCase().includes(q) || qNorm.length >= 3 && (p.rut || "").replace(/[^0-9kK]/g, "").toLowerCase().includes(qNorm)) : patients;
        return fl.length ? fl.map((p) => /* @__PURE__ */ React.createElement("button", { key: p.id, onClick: () => setPid(p.id), style: { display: "block", width: "100%", textAlign: "left", padding: "10px 13px", background: pid === p.id ? T.surface2 || T.accent + "14" : "transparent", border: "none", borderBottom: "1px solid " + T.lineSoft, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, p.rut || p.phone || "Paciente"))) : /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 13px", fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, 'Sin resultados para "', patQ, '".');
      })())) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre completo", value: nombre, onChange: setNombre, placeholder: "Ej: Paciente nuevo" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "RUT", value: rut, onChange: (v) => setRut(window.jcmFmtRut ? window.jcmFmtRut(v) : v), placeholder: "12.345.678-9" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Tel\xE9fono m\xF3vil (WhatsApp)", value: phone, onChange: (v) => {
        const pfx = "+56 9 ";
        const digits = v.startsWith(pfx) ? v.slice(pfx.length).replace(/\D/g, "") : v.replace(/\D/g, "");
        setPhone(pfx + digits);
      }, inputMode: "tel", placeholder: "+56 9 1234 5678" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Correo", value: email, onChange: setEmail, inputMode: "email", placeholder: "correo@ejemplo.com" })),
      /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, paddingTop: 16, borderTop: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Notas de la cita ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute, textTransform: "none", letterSpacing: 0, fontWeight: 400 } }, "\xB7 opcional")), /* @__PURE__ */ React.createElement("textarea", { value: notas, onChange: (e) => setNotas(e.target.value), rows: 2, placeholder: "Observaciones, indicaciones o excepciones de pago\u2026", style: { width: "100%", padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 4 } })),
      /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, paddingTop: 16, borderTop: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Campa\xF1a / Origen ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute, textTransform: "none", letterSpacing: 0, fontWeight: 400 } }, "\xB7 para estad\xEDstica")), /* @__PURE__ */ React.createElement("select", { value: origen, onChange: (e) => setOrigen(e.target.value), style: selStyle }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Seleccionar origen\u2026"), /* @__PURE__ */ React.createElement("optgroup", { label: "Org\xE1nico / directo" }, ORIGEN_ORG.map((o) => /* @__PURE__ */ React.createElement("option", { key: o, value: o }, o))), /* @__PURE__ */ React.createElement("optgroup", { label: "Publicidad \xB7 Meta Ads" + (metaConn ? " (campa\xF1as activas)" : "") }, metaCamps.length ? metaCamps.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.id, value: "Meta \xB7 " + c.name }, c.name, c.net ? " \xB7 " + c.net : "")) : /* @__PURE__ */ React.createElement("option", { value: "Meta \xB7 campa\xF1a activa" }, "Conecta Meta para ver tus campa\xF1as"), /* @__PURE__ */ React.createElement("option", { value: "Meta \xB7 otra campa\xF1a" }, "Otra campa\xF1a de Meta\u2026"))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 7, lineHeight: 1.5 } }, metaConn ? "Las campa\xF1as pagadas se sincronizan desde Meta Ads. Se guarda en la cita para medir de d\xF3nde llega cada paciente." : "Conecta Meta Ads en Integraciones para listar tus campa\xF1as activas autom\xE1ticamente."))
    );
  }
  return /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      title: "Dar cita (agendar)",
      onClose,
      wide: true,
      footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontFamily: T.sans, fontSize: 12, color: T.textMute } }, pick ? "1 hora seleccionada \xB7 " + pick.time : "0 horas seleccionadas"), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: onClose }, "Cerrar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => pick && setStep(2) }, "Continuar"))
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "200px 1fr", gap: 18, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Especialidad"), /* @__PURE__ */ React.createElement("select", { value: esp, onChange: (e) => {
      setEsp(e.target.value);
    }, style: selStyle }, /* @__PURE__ */ React.createElement("option", null, "Todas"), especialidades.map((s) => /* @__PURE__ */ React.createElement("option", { key: s }, s)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Procedimiento"), /* @__PURE__ */ React.createElement("select", { value: proc, onChange: (e) => setProc(e.target.value), style: selStyle }, /* @__PURE__ */ React.createElement("option", { value: "Evaluaci\xF3n general" }, "Evaluaci\xF3n general"), procOptionsByCat(procsByEsp))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Profesional"), /* @__PURE__ */ React.createElement("select", { value: prof, onChange: (e) => setProf(e.target.value), style: selStyle }, team.map((t) => /* @__PURE__ */ React.createElement("option", { key: t.id, value: t.name }, t.name)))), sucursalesList.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Sucursal"), /* @__PURE__ */ React.createElement("select", { value: sucursal, onChange: (e) => setSucursal(e.target.value), style: selStyle }, sucursalesList.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Recurso"), /* @__PURE__ */ React.createElement("select", { value: recurso, onChange: (e) => setRecurso(e.target.value), style: selStyle }, /* @__PURE__ */ React.createElement("option", null, "No especificado"), /* @__PURE__ */ React.createElement("option", null, "Sala de procedimientos"), /* @__PURE__ */ React.createElement("option", null, "Sala de evaluaci\xF3n"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Box / Camilla"), /* @__PURE__ */ React.createElement("select", { value: camilla, onChange: (e) => setCamilla(e.target.value), style: selStyle }, /* @__PURE__ */ React.createElement("option", null, "Box 1"), /* @__PURE__ */ React.createElement("option", null, "Box 2"), /* @__PURE__ */ React.createElement("option", null, "Camilla 1"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lbl }, "Duraci\xF3n"), /* @__PURE__ */ React.createElement("select", { value: dur, onChange: (e) => setDur(e.target.value), style: selStyle }, /* @__PURE__ */ React.createElement("option", null, "15 minutos"), /* @__PURE__ */ React.createElement("option", null, "30 minutos"), /* @__PURE__ */ React.createElement("option", null, "45 minutos"), /* @__PURE__ */ React.createElement("option", null, "60 minutos")))), /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, minmax(80px,1fr))", gap: 6, minWidth: 620 } }, week.map((w) => /* @__PURE__ */ React.createElement("div", { key: w.off, style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: T.textMute, paddingBottom: 4 } }, w.wd), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.text, paddingBottom: 8 } }, w.dd, " ", w.mm), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4 } }, adminSlots().map((h) => {
      const sel = pick && pick.dayOff === w.off && pick.time === h;
      const blk = (appts || []).some((a) => {
        if (a.status === "anulada" || a.status === "cancelada") return false;
        if (apptDayOff(a) !== w.off) return false;
        const as = mins(a.time), ad = parseInt(a.dur) || 60, ts = mins(h);
        return ts >= as && ts < as + ad;
      });
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: h,
          disabled: blk,
          onClick: () => !blk && setPick({ dayOff: w.off, time: h }),
          style: {
            fontFamily: T.sans,
            fontSize: 10.5,
            padding: "6px 2px",
            borderRadius: 5,
            cursor: blk ? "not-allowed" : "pointer",
            background: sel ? T.accent : blk ? T.lineSoft : "transparent",
            color: sel ? T.onAccent : blk ? T.textFaint : T.accent,
            border: "1px solid " + (sel ? T.accent : blk ? T.lineSoft : T.line),
            opacity: blk ? 0.55 : 1
          }
        },
        h
      );
    })))))))
  );
}
function CitaEditModal({ T, appt, patients, onClose, onSave, onCancel }) {
  const D = window.JCDATA;
  const procs = window.clinicServiceList ? Array.from(new Set(window.clinicServiceList().map((s) => s.name))) : PROC_LIST();
  const [proc, setProc] = useState(appt.proc);
  const [fecha, setFecha] = useState(appt.fecha || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [t, setT] = useState(appt.time);
  const [status, setStatus] = useState(appt.status || "pendiente");
  const [dur, setDur] = useState(appt.dur || "30 minutos");
  const [comentario, setComentario] = useState(appt.comentario || "");
  const [origen, setOrigen] = useState(appt.origen || "Org\xE1nico \xB7 Instagram");
  const [confirmCancel, setConfirmCancel] = useState(false);
  const ORIGEN_ORG = ["Org\xE1nico \xB7 Instagram", "Org\xE1nico \xB7 Facebook", "Org\xE1nico \xB7 TikTok", "Referido de paciente", "Pas\xF3 por la cl\xEDnica (walk-in)", "B\xFAsqueda en Google"];
  const metaCamps = ((window.CADMIN || { campaigns: [] }).campaigns || []).filter((c) => c.active);
  const horas = D.availability((/* @__PURE__ */ new Date(fecha + "T00:00:00")).getDay()).slots;
  const pat = patients.find((p) => p.name === appt.name);
  function buildPatch(extra) {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const day = Math.round((/* @__PURE__ */ new Date(fecha + "T00:00:00") - today) / 864e5);
    return Object.assign({ proc, fecha, time: t, status, comentario, origen, dur, day }, extra || {});
  }
  return /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      title: "Editar cita",
      onClose,
      footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, appt.status === "pendiente_pago" && /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => onSave(buildPatch({ status: "confirmada" })),
          style: { width: "100%", fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "14px", borderRadius: 4, border: "none", background: "#1F8A5B", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }
        },
        /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2.2" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" })),
        "Confirmar transferencia \xB7 bloquear hora"
      ), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => onSave(buildPatch()) }, "Guardar cambios"), confirmCancel ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setConfirmCancel(false), style: { flex: 1, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px", borderRadius: 4, border: "1px solid " + T.chipBorder, background: "transparent", color: T.textMute, cursor: "pointer" } }, "Volver"), /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: { flex: 1, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px", borderRadius: 4, border: "none", background: "#C0285A", color: "#fff", cursor: "pointer" } }, "S\xED, cancelar cita")) : /* @__PURE__ */ React.createElement("button", { onClick: () => setConfirmCancel(true), style: { width: "100%", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", padding: "13px", borderRadius: 4, border: "1px solid #C0285A", background: "transparent", color: "#C0285A", cursor: "pointer" } }, "Cancelar cita"))
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: appt.name, size: 44 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 15, fontWeight: 500, color: T.text } }, appt.name), pat && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, pat.phone))),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lblS(T) }, "Procedimiento"), /* @__PURE__ */ React.createElement("select", { value: proc, onChange: (e) => setProc(e.target.value), style: selS(T) }, /* @__PURE__ */ React.createElement("option", { value: "Evaluaci\xF3n general" }, "Evaluaci\xF3n general"), procOptionsByCat(procs))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lblS(T) }, "Fecha"), /* @__PURE__ */ React.createElement(MiniCalendar, { T, selected: fecha, onSelect: setFecha })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lblS(T) }, "Hora"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "time",
        value: t,
        onChange: (e) => setT(e.target.value),
        step: adminSlotMins() * 60,
        list: "jcm-edit-hour-list",
        style: { ...selS(T), cursor: "pointer" }
      }
    ), /* @__PURE__ */ React.createElement("datalist", { id: "jcm-edit-hour-list" }, adminSlots().map((h) => /* @__PURE__ */ React.createElement("option", { key: h, value: h })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: lblS(T) }, "Estado"), /* @__PURE__ */ React.createElement("select", { value: status, onChange: (e) => setStatus(e.target.value), style: selS(T) }, /* @__PURE__ */ React.createElement("option", { value: "pendiente" }, "Pendiente"), /* @__PURE__ */ React.createElement("option", { value: "confirmada" }, "Confirmada"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: lblS(T) }, "Duraci\xF3n"), /* @__PURE__ */ React.createElement("select", { value: dur, onChange: (e) => setDur(e.target.value), style: selS(T) }, /* @__PURE__ */ React.createElement("option", null, "15 minutos"), /* @__PURE__ */ React.createElement("option", null, "30 minutos"), /* @__PURE__ */ React.createElement("option", null, "45 minutos"), /* @__PURE__ */ React.createElement("option", null, "60 minutos"), /* @__PURE__ */ React.createElement("option", null, "90 minutos")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lblS(T) }, "Comentario de la cita ", /* @__PURE__ */ React.createElement("span", { style: { textTransform: "none", letterSpacing: 0, color: T.textFaint } }, "\xB7 excepciones de pago u observaciones")), /* @__PURE__ */ React.createElement("input", { value: comentario, onChange: (e) => setComentario(e.target.value), placeholder: "Ej. Abona el d\xEDa de la atenci\xF3n", style: selS(T) })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: lblS(T) }, "Campa\xF1a / Origen"), /* @__PURE__ */ React.createElement("select", { value: origen, onChange: (e) => setOrigen(e.target.value), style: selS(T) }, ORIGEN_ORG.indexOf(origen) === -1 && metaCamps.every((c) => "Meta \xB7 " + c.name !== origen) && /* @__PURE__ */ React.createElement("option", { value: origen }, origen), /* @__PURE__ */ React.createElement("optgroup", { label: "Org\xE1nico / directo" }, ORIGEN_ORG.map((o) => /* @__PURE__ */ React.createElement("option", { key: o, value: o }, o))), /* @__PURE__ */ React.createElement("optgroup", { label: "Publicidad \xB7 Meta Ads" }, metaCamps.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.id, value: "Meta \xB7 " + c.name }, c.name, c.net ? " \xB7 " + c.net : "")), /* @__PURE__ */ React.createElement("option", { value: "Meta \xB7 otra campa\xF1a" }, "Otra campa\xF1a de Meta\u2026")))), pat && /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/" + (pat.phone || "").replace(/\D/g, ""), target: "_blank", rel: "noopener", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#1F8A5B", textDecoration: "none", border: "1px solid #1F8A5B", borderRadius: 4, padding: "12px" } }, "Escribir por WhatsApp"))
  );
}
Object.assign(window, { AdminApp, Resumen, AdStat, Agenda, NewCitaModal, CitaEditModal, Toast, ApptBlock, notifyCita, fmtTime, mins, nIcon, linkBtn });
function AdminGate() {
  const T = window.JCTHEME && window.JCTHEME.editorial || { bg: "#070707", surface: "#141414", line: "rgba(255,255,255,.14)", text: "#F2EDE6", textMute: "rgba(242,237,230,.6)", accent: "#B9C2CB", gold: "#B9C2CB", serif: "Cormorant Garamond, serif", sans: "Jost, sans-serif", primaryBg: "#F2EDE6", primaryText: "#070707" };
  const setup = !window.jcmAdminHasPass || !window.jcmAdminHasPass();
  const [authed, setAuthed] = useState(() => !setup && window.jcmAdminHasSession && window.jcmAdminHasSession());
  const [view, setView] = useState("main");
  const [u, setU] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rWa, setRWa] = useState("");
  const [np1, setNp1] = useState("");
  const [np2, setNp2] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const D = window.JCDATA || {};
  const regEmail = (D.contact && D.contact.email || "").trim().toLowerCase();
  const regWa = ((D.wa || "") + "").replace(/\D/g, "");
  const dig = (s) => (s || "").replace(/\D/g, "");
  const maskEmail = (e) => {
    const i = e.indexOf("@");
    return i > 2 ? e.slice(0, 2) + "\u2022\u2022\u2022" + e.slice(i) : e;
  };
  const maskWa = (w) => w.length >= 4 ? "+\u2022\u2022 \u2022 \u2022\u2022\u2022\u2022 " + w.slice(-4) : w;
  async function submit() {
    setErr("");
    setBusy(true);
    try {
      if (setup) {
        if (p1 !== p2) {
          setErr("Las contrase\xF1as no coinciden.");
          setBusy(false);
          return;
        }
        const r = await window.jcmAdminSetPass(p1, u);
        if (!r.ok) {
          setErr(r.msg);
          setBusy(false);
          return;
        }
      } else {
        const r = await window.jcmAdminCheck(u, p1);
        if (!r.ok) {
          setErr(r.msg);
          setBusy(false);
          return;
        }
      }
      setAuthed(true);
    } catch (e) {
      setErr("Error. Intenta nuevamente.");
    }
    setBusy(false);
  }
  function verifyIdentity() {
    setErr("");
    const okMail = !!regEmail && rEmail.trim().toLowerCase() === regEmail;
    const okWa = !!regWa && dig(rWa).slice(-8) === regWa.slice(-8);
    if (!okMail || !okWa) {
      setErr("El correo o el WhatsApp no coinciden con los registrados de la cl\xEDnica.");
      return;
    }
    setView("reset");
  }
  async function doReset() {
    setErr("");
    if ((np1 || "").length < 8) {
      setErr("La contrase\xF1a debe tener al menos 8 caracteres.");
      return;
    }
    if (np1 !== np2) {
      setErr("Las contrase\xF1as no coinciden.");
      return;
    }
    setBusy(true);
    try {
      const r = await window.jcmAdminSetPass(np1, window.jcmAdminUser && window.jcmAdminUser() || "admin");
      if (!r.ok) {
        setErr(r.msg);
        setBusy(false);
        return;
      }
      setAuthed(true);
    } catch (e) {
      setErr("Error. Intenta nuevamente.");
    }
    setBusy(false);
  }
  if (authed) return /* @__PURE__ */ React.createElement(AdminApp, null);
  const inp = { width: "100%", padding: "13px 14px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 14, outline: "none", boxSizing: "border-box" };
  const primaryBtn = (label, onClick, disabled) => /* @__PURE__ */ React.createElement("button", { onClick, disabled, style: { marginTop: 4, padding: "14px", borderRadius: 6, border: "none", background: T.primaryBg, color: T.primaryText, fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1 } }, label);
  const linkBtn2 = (label, onClick) => /* @__PURE__ */ React.createElement("button", { onClick, style: { background: "none", border: "none", cursor: "pointer", color: T.accent, fontFamily: T.sans, fontSize: 12, textDecoration: "underline", padding: 6 } }, label);
  let title, subtitle, body, footer;
  if (view === "recover") {
    title = "Recuperar acceso";
    subtitle = "Verifica tu identidad con el correo y el WhatsApp registrados de la cl\xEDnica. Si coinciden, podr\xE1s crear una contrase\xF1a nueva.";
    body = /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { value: rEmail, autoFocus: true, onChange: (e) => setREmail(e.target.value), placeholder: "Correo registrado", inputMode: "email", style: inp }), regEmail && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: -4 } }, "Pista: ", maskEmail(regEmail)), /* @__PURE__ */ React.createElement("input", { value: rWa, onChange: (e) => setRWa(e.target.value), onKeyDown: (e) => {
      if (e.key === "Enter") verifyIdentity();
    }, placeholder: "WhatsApp registrado (+56 9 \u2026)", inputMode: "tel", style: inp }), regWa && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: -4 } }, "Pista: ", maskWa(regWa)), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A" } }, err), primaryBtn("Verificar", verifyIdentity, !rEmail || !rWa));
    footer = linkBtn2("\u2190 Volver al inicio de sesi\xF3n", () => {
      setView("main");
      setErr("");
    });
  } else if (view === "reset") {
    title = "Crea una contrase\xF1a nueva";
    subtitle = "Identidad verificada. Define tu nueva contrase\xF1a (m\xEDnimo 8 caracteres).";
    body = /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { type: "password", value: np1, autoFocus: true, onChange: (e) => setNp1(e.target.value), placeholder: "Nueva contrase\xF1a", style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", value: np2, onChange: (e) => setNp2(e.target.value), onKeyDown: (e) => {
      if (e.key === "Enter") doReset();
    }, placeholder: "Repite la contrase\xF1a", style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A" } }, err), primaryBtn(busy ? "Guardando\u2026" : "Guardar y entrar", doReset, busy || !np1));
  } else {
    title = setup ? "Crea tu usuario" : "Acceso privado";
    subtitle = setup ? "Es la primera vez que abres el panel. Crea tu usuario y contrase\xF1a (m\xEDnimo 8 caracteres). Solo se guardan cifrados en este dispositivo." : "Ingresa tu usuario y contrase\xF1a para continuar.";
    body = /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { value: u, autoFocus: true, onChange: (e) => setU(e.target.value), onKeyDown: (e) => {
      if (e.key === "Enter" && !setup) submit();
    }, placeholder: "Usuario", autoComplete: "username", style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", value: p1, onChange: (e) => setP1(e.target.value), onKeyDown: (e) => {
      if (e.key === "Enter" && !setup) submit();
    }, placeholder: setup ? "Contrase\xF1a (m\xEDn. 8)" : "Contrase\xF1a", autoComplete: setup ? "new-password" : "current-password", style: inp }), setup && /* @__PURE__ */ React.createElement("input", { type: "password", value: p2, onChange: (e) => setP2(e.target.value), onKeyDown: (e) => {
      if (e.key === "Enter") submit();
    }, placeholder: "Repite la contrase\xF1a", autoComplete: "new-password", style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A" } }, err), primaryBtn(busy ? "Procesando\u2026" : setup ? "Crear y entrar" : "Entrar", submit, busy || !u || !p1));
    footer = !setup ? linkBtn2("\xBFOlvidaste tu contrase\xF1a?", () => {
      setView("recover");
      setErr("");
    }) : null;
  }
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 360 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent, textAlign: "center" } }, "Medique \xB7 Panel cl\xEDnico"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 36, color: T.text, textAlign: "center", margin: "12px 0 6px", lineHeight: 1.05 } }, title), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, textAlign: "center", lineHeight: 1.6, margin: "0 0 22px" } }, subtitle), body, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 14 } }, footer), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, textAlign: "center", marginTop: 10, lineHeight: 1.6 } }, "Sesi\xF3n protegida \xB7 expira en 4 horas de inactividad.")));
}
function WelcomeTour({ T, go, onClose }) {
  const cfg0 = (() => {
    try {
      return window.DB && DB.get("config") || {};
    } catch (e) {
      return {};
    }
  })();
  const biz0 = (() => {
    try {
      return window.DB && DB.get("clinic_biz") || {};
    } catch (e) {
      return {};
    }
  })();
  const clinicNm = (() => {
    try {
      return window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.currentClinic && (window.JCSAAS.currentClinic() || {}).name || "";
    } catch (e) {
      return "";
    }
  })();
  const STEPS = ["intro", "clinica", "rut", "equipo", "servicios", "inventario", "listo"];
  const [step, setStep] = useState(0);
  const [name, setName] = useState(cfg0.clinic_name || clinicNm || "");
  const [addr, setAddr] = useState(cfg0.clinic_addr || "");
  const [wa, setWa] = useState((cfg0.wa_number || "").replace(/^569/, "").replace(/^56/, ""));
  const [rut, setRut] = useState(biz0.rut || "");
  const [team, setTeam] = useState(() => {
    try {
      return DB.get("team") || [];
    } catch (e) {
      return [];
    }
  });
  const [svcs, setSvcs] = useState(() => {
    try {
      return DB.get("services_custom") || [];
    } catch (e) {
      return [];
    }
  });
  const [inv, setInv] = useState(() => {
    try {
      return DB.get("inv_items") || [];
    } catch (e) {
      return [];
    }
  });
  const [tN, setTN] = useState(""), [tR, setTR] = useState("");
  const SVC_CATS = ["Toxina botul\xEDnica", "\xC1cido hialur\xF3nico", "Bioestimulaci\xF3n de col\xE1geno", "Mesoterapia", "Lipol\xEDticos inyectables"];
  const [sN, setSN] = useState(""), [sP, setSP] = useState(""), [sD, setSD] = useState("30"), [sC, setSC] = useState(SVC_CATS[0]), [sCustom, setSCustom] = useState("");
  const [iN, setIN] = useState(""), [iS, setIS] = useState(""), [iU, setIU] = useState("unidades"), [iP, setIP] = useState("");
  const uid = (pre) => window.jcmUid ? window.jcmUid(pre) : pre + Date.now();
  function saveClinic() {
    try {
      var c = DB.get("config") || {};
      c.clinic_name = name.trim();
      c.clinic_addr = addr.trim();
      c.wa_number = wa ? "569" + wa : "";
      DB.set("config", c);
    } catch (e) {
    }
  }
  function saveRut() {
    try {
      var b = DB.get("clinic_biz") || { razon: "", rut: "", plan: "" };
      b.rut = rut.trim();
      DB.set("clinic_biz", b);
    } catch (e) {
    }
  }
  function freshList(key, fallback) {
    try {
      var v = DB.get(key);
      return Array.isArray(v) ? v : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function addTeam() {
    if (tN.trim().length < 2) return;
    var n = freshList("team", team).concat([{ id: uid("t"), name: tN.trim(), role: tR.trim() || "Profesional", active: true, color: "#8B9EB0" }]);
    setTeam(n);
    try {
      DB.set("team", n);
    } catch (e) {
    }
    if (window.CADMIN) window.CADMIN.team = n;
    setTN("");
    setTR("");
  }
  function addSvc() {
    if (sN.trim().length < 2) return;
    var catVal = sC === "__other__" ? sCustom.trim() || "Otro" : sC;
    var n = [{ id: uid("svc"), name: sN.trim(), cat: catVal, price: parseInt((sP + "").replace(/\D/g, ""), 10) || 0, dur: parseInt(sD, 10) || 30, pts: 0, desc: "" }].concat(freshList("services_custom", svcs));
    setSvcs(n);
    try {
      DB.set("services_custom", n);
    } catch (e) {
    }
    setSN("");
    setSP("");
    setSD("30");
  }
  function addInv() {
    if (iN.trim().length < 2) return;
    var n = freshList("inv_items", inv).concat([{ id: uid("i"), name: iN.trim(), cat: "Insumo cl\xEDnico", stock: parseInt((iS + "").replace(/\D/g, ""), 10) || 0, min: 0, unit: iU || "unidades", price: parseInt((iP + "").replace(/\D/g, ""), 10) || 0 }]);
    setInv(n);
    try {
      DB.set("inv_items", n);
    } catch (e) {
    }
    setIN("");
    setIS("");
    setIP("");
  }
  function onWa(v) {
    var d = (v || "").replace(/\D/g, "");
    if (d.indexOf("56") === 0) d = d.slice(2);
    if (d.charAt(0) === "9") d = d.slice(1);
    setWa(d.slice(0, 8));
  }
  function rmFrom(list, setList, key, id) {
    var n = list.filter((x) => x.id !== id);
    setList(n);
    try {
      DB.set(key, n);
    } catch (e) {
    }
    if (key === "team" && window.CADMIN) window.CADMIN.team = n;
  }
  const kind = STEPS[step];
  function next() {
    if (kind === "clinica") saveClinic();
    if (kind === "rut") saveRut();
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }
  const inp = { width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid " + T.line, borderRadius: 9, padding: "11px 13px", fontFamily: T.sans, fontSize: 14, color: T.text, outline: "none", boxSizing: "border-box" };
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const titleS = { fontFamily: T.serif, fontSize: 22, color: T.text, marginBottom: 6 };
  const subS = { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5, marginBottom: 16 };
  const field = (label, node) => /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: lbl }, label), node);
  const chip = (txt, onDel) => /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, background: T.surface, border: "1px solid " + T.line, borderRadius: 999, padding: "5px 6px 5px 11px", fontFamily: T.sans, fontSize: 12, color: T.text, margin: "0 6px 6px 0" } }, txt, /* @__PURE__ */ React.createElement("button", { onClick: onDel, style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 1 } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))));
  const addBtn = (onClick) => /* @__PURE__ */ React.createElement("button", { onClick, style: { flexShrink: 0, fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.primaryText || "#fff", background: T.primaryBg || T.accent, border: "none", borderRadius: 9, padding: "0 16px", cursor: "pointer" } }, "Agregar");
  const delBtn = (onClick) => /* @__PURE__ */ React.createElement("button", { onClick, style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })));
  const rowItem = (main, meta, onDel) => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: "8px 11px" } }, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 13, color: T.text } }, main), meta && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, meta), delBtn(onDel));
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 90, background: "rgba(8,12,20,.62)", backdropFilter: "blur(7px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 480, maxHeight: "88vh", display: "flex", flexDirection: "column", background: T.bg, border: "1px solid " + T.line, borderRadius: 18, padding: "22px 22px 18px", animation: "jcSlideUp .4s cubic-bezier(.22,1,.36,1) both", boxShadow: "0 30px 80px -30px rgba(0,0,0,.6)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 11, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 38, height: 38, borderRadius: 10, background: "#F2EDE6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 10px -3px rgba(0,0,0,.5)" } }, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 33, height: 33, objectFit: "contain" } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 18, color: T.text, lineHeight: 1 } }, "Configura tu cl\xEDnica"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 3 } }, "Paso ", step + 1, " de ", STEPS.length)), /* @__PURE__ */ React.createElement("button", { onClick: onClose, title: "Cerrar", style: { background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 4 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { key: step, className: "jc-scroll", style: { animation: "jcFade .3s ease both", overflowY: "auto", flex: 1, minHeight: 200, paddingRight: 2 } }, kind === "intro" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", paddingTop: 6 } }, /* @__PURE__ */ React.createElement("div", { style: titleS }, "\xA1Bienvenido a Medique!"), /* @__PURE__ */ React.createElement("div", { style: { ...subS, textAlign: "center", maxWidth: 360, margin: "0 auto" } }, "Vamos a dejar tu cl\xEDnica lista en unos pasos. Completa lo b\xE1sico aqu\xED mismo \u2014 toma un par de minutos y puedes saltar lo que quieras."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 18, textAlign: "left" } }, [["Datos de tu cl\xEDnica", "Nombre, direcci\xF3n y WhatsApp"], ["RUT de la cl\xEDnica", "Para tus documentos"], ["Profesionales", "Qui\xE9n atiende"], ["Servicios", "Tus procedimientos y precios"], ["Inventario", "Tus insumos"]].map((c, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, style: { display: "flex", alignItems: "center", gap: 11, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "10px 13px" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: T.accent + "1c", color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 11, fontWeight: 700 } }, idx + 1), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, c[0]), /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 11, color: T.textMute } }, c[1])))))), kind === "clinica" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: titleS }, "Datos de tu cl\xEDnica"), /* @__PURE__ */ React.createElement("div", { style: subS }, "Aparecen en tu p\xE1gina de reserva y en los mensajes a tus pacientes."), field("Nombre de la cl\xEDnica", /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Ej: Cl\xEDnica Aurora", style: inp })), field("Direcci\xF3n", /* @__PURE__ */ React.createElement("input", { value: addr, onChange: (e) => setAddr(e.target.value), placeholder: "Calle, n\xFAmero, ciudad", style: inp })), field("WhatsApp de contacto", /* @__PURE__ */ React.createElement("input", { value: "+56 9 " + wa, onChange: (e) => onWa(e.target.value), inputMode: "numeric", style: inp }))), kind === "rut" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: titleS }, "RUT de la cl\xEDnica"), /* @__PURE__ */ React.createElement("div", { style: subS }, "El RUT de tu empresa (o el tuyo), para los documentos y la facturaci\xF3n."), field("RUT", /* @__PURE__ */ React.createElement("input", { value: rut, onChange: (e) => setRut(window.jcmFmtRut ? window.jcmFmtRut(e.target.value) : e.target.value), placeholder: "xx.xxx.xxx-x", style: inp })), rut.trim() && window.jcmValidRut && !window.jcmValidRut(rut) && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#C0285A", marginTop: -6 } }, "Revisa el d\xEDgito verificador.")), kind === "equipo" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: titleS }, "Profesionales"), /* @__PURE__ */ React.createElement("div", { style: subS }, "Qui\xE9n realiza las atenciones. Agrega al menos uno (puedes sumar m\xE1s despu\xE9s en Equipo)."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", marginBottom: team.length ? 12 : 0 } }, team.map((m) => /* @__PURE__ */ React.createElement("span", { key: m.id }, chip(m.name, () => rmFrom(team, setTeam, "team", m.id))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: tN, onChange: (e) => setTN(e.target.value), placeholder: "Nombre", style: inp }), /* @__PURE__ */ React.createElement("input", { value: tR, onChange: (e) => setTR(e.target.value), placeholder: "Rol (ej. M\xE9dico)", style: inp })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, display: "flex", justifyContent: "flex-end" } }, addBtn(addTeam))), kind === "servicios" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: titleS }, "Servicios"), /* @__PURE__ */ React.createElement("div", { style: subS }, "Tus procedimientos con categor\xEDa, precio y duraci\xF3n. Aparecen en la agenda y en tu reserva online."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: svcs.length ? 12 : 0 } }, svcs.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id }, rowItem(s.name, [s.cat, s.price ? "$" + s.price.toLocaleString("es-CL") : "", s.dur + "min"].filter(Boolean).join(" \xB7 "), () => rmFrom(svcs, setSvcs, "services_custom", s.id))))), /* @__PURE__ */ React.createElement("input", { value: sN, onChange: (e) => setSN(e.target.value), placeholder: "Nombre del servicio", style: { ...inp, marginBottom: 8 } }), /* @__PURE__ */ React.createElement("select", { value: sC, onChange: (e) => setSC(e.target.value), style: { ...inp, marginBottom: 8 } }, SVC_CATS.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c)), /* @__PURE__ */ React.createElement("option", { value: "__other__" }, "Otra categor\xEDa (escribir)\u2026")), sC === "__other__" && /* @__PURE__ */ React.createElement("input", { value: sCustom, onChange: (e) => setSCustom(e.target.value), placeholder: "Nombre de la categor\xEDa", style: { ...inp, marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: sP, onChange: (e) => setSP(e.target.value.replace(/\D/g, "")), inputMode: "numeric", placeholder: "Precio $", style: inp }), /* @__PURE__ */ React.createElement("select", { value: sD, onChange: (e) => setSD(e.target.value), style: { ...inp, width: 100 } }, [15, 30, 45, 60, 90].map((d) => /* @__PURE__ */ React.createElement("option", { key: d, value: String(d) }, d, " min"))), addBtn(addSvc))), kind === "inventario" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: titleS }, "Inventario"), /* @__PURE__ */ React.createElement("div", { style: subS }, "Tus insumos y su stock. Opcional, pero te ayuda a controlar lo que usas."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: inv.length ? 12 : 0 } }, inv.map((it) => /* @__PURE__ */ React.createElement("div", { key: it.id }, rowItem(it.name, it.stock + " " + it.unit + (it.price ? " \xB7 $" + Number(it.price).toLocaleString("es-CL") : ""), () => rmFrom(inv, setInv, "inv_items", it.id))))), /* @__PURE__ */ React.createElement("input", { value: iN, onChange: (e) => setIN(e.target.value), placeholder: "Nombre del insumo", style: { ...inp, marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("input", { value: iS, onChange: (e) => setIS(e.target.value.replace(/\D/g, "")), inputMode: "numeric", placeholder: "Stock", style: inp }), /* @__PURE__ */ React.createElement("select", { value: iU, onChange: (e) => setIU(e.target.value), style: { ...inp, width: 120 } }, ["unidades", "viales", "jeringas", "tubos", "cajas", "paquetes", "rollos"].map((u) => /* @__PURE__ */ React.createElement("option", { key: u, value: u }, u)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: iP ? Number(iP).toLocaleString("es-CL") : "", onChange: (e) => setIP(e.target.value.replace(/\D/g, "")), inputMode: "numeric", placeholder: "Costo por unidad $", style: inp }), addBtn(addInv))), kind === "listo" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", paddingTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 64, height: 64, borderRadius: "50%", background: "rgba(31,138,91,.14)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" } }, /* @__PURE__ */ React.createElement("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "#1F8A5B", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("div", { style: titleS }, "Tu cl\xEDnica est\xE1 configurada y puedes usarla"), /* @__PURE__ */ React.createElement("div", { style: { ...subS, textAlign: "center", maxWidth: 360, margin: "0 auto" } }, "Todo qued\xF3 guardado. Puedes ajustar cualquier dato cuando quieras desde cada secci\xF3n del panel."))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 6, margin: "16px 0 14px" } }, STEPS.map((_, idx) => /* @__PURE__ */ React.createElement("span", { key: idx, style: { width: idx === step ? 18 : 7, height: 7, borderRadius: 999, background: idx === step ? T.accent : T.line, transition: "width .25s, background .25s" } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, kind === "listo" ? /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { flex: 1, fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.primaryText || "#fff", background: T.primaryBg || T.accent, border: "none", borderRadius: 9, padding: "13px", cursor: "pointer" } }, "Empezar a usar Medique") : /* @__PURE__ */ React.createElement(React.Fragment, null, step > 0 ? /* @__PURE__ */ React.createElement("button", { onClick: back, style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, background: "transparent", border: "1px solid " + T.line, borderRadius: 9, padding: "11px 16px", cursor: "pointer" } }, "Anterior") : /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, background: "transparent", border: "none", padding: "11px 6px", cursor: "pointer" } }, "Saltar"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement("button", { onClick: next, style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.primaryText || "#fff", background: T.primaryBg || T.accent, border: "none", borderRadius: 9, padding: "12px 22px", cursor: "pointer" } }, kind === "intro" ? "Comenzar" : "Guardar y seguir")))));
}
function OnboardingWizard({ T, onDone }) {
  const clinic = window.JCSAAS && window.JCSAAS.currentClinic && window.JCSAAS.currentClinic() || {};
  const cfg0 = window.DB && window.DB.get("config") || {};
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(clinic.name || cfg0.clinic_name || "");
  const [addr, setAddr] = useState(cfg0.clinic_addr || "");
  const [wa, setWa] = useState(cfg0.wa_number || "");
  const OB_DAYS = [["Lun", 1], ["Mar", 2], ["Mi\xE9", 3], ["Jue", 4], ["Vie", 5], ["S\xE1b", 6], ["Dom", 0]];
  const OB_TIMES = (() => {
    const a = [];
    for (let h = 7; h <= 22; h++) {
      a.push((h < 10 ? "0" : "") + h + ":00");
      if (h < 22) a.push((h < 10 ? "0" : "") + h + ":30");
    }
    return a;
  })();
  const [sched, setSched] = useState(() => {
    if (cfg0.clinic_hours_struct) return cfg0.clinic_hours_struct;
    var def = {};
    OB_DAYS.forEach(function(d) {
      def[d[1]] = { on: d[1] >= 1 && d[1] <= 5, from: "10:00", to: "19:00" };
    });
    return def;
  });
  function buildHoursStr(sc) {
    var groups = {};
    OB_DAYS.forEach(function(d) {
      var s = sc[d[1]];
      if (s && s.on) {
        var k = s.from + "\u2013" + s.to;
        (groups[k] = groups[k] || []).push(d[0]);
      }
    });
    return Object.keys(groups).map(function(k) {
      return groups[k].join(", ") + " " + k;
    }).join(" \xB7 ");
  }
  function onWaOb(v) {
    var dgt = (v || "").replace(/\D/g, "");
    if (dgt.indexOf("56") === 0) dgt = dgt.slice(2);
    if (dgt.charAt(0) === "9") dgt = dgt.slice(1);
    dgt = dgt.slice(0, 8);
    setWa("569" + dgt);
  }
  var waObDisplay = "+56 9 " + (wa || "").replace(/^569/, "").replace(/^56/, "");
  const [memName, setMemName] = useState("");
  const [memRole, setMemRole] = useState("");
  const [meta, setMeta] = useState("");
  const steps = [
    { k: "clinica", n: "Tu cl\xEDnica", t: "Cu\xE9ntanos de tu cl\xEDnica", s: "Estos datos aparecen en tu p\xE1gina de reserva y en las confirmaciones a tus pacientes. Puedes editarlos cuando quieras desde Configuraci\xF3n." },
    { k: "equipo", n: "Tu equipo", t: "Agrega tu primer profesional", s: "Qui\xE9n realiza las atenciones. Podr\xE1s sumar m\xE1s miembros y permisos desde la secci\xF3n Equipo." },
    { k: "marketing", n: "Marketing", t: "Conecta tu inversi\xF3n (opcional)", s: "Si haces campa\xF1as en Meta, registra tu gasto mensual para ver tu retorno real. Tambi\xE9n puedes hacerlo m\xE1s tarde." }
  ];
  const cur = steps[step];
  const last = step === steps.length - 1;
  function finish() {
    setSaving(true);
    try {
      var cfg = window.DB && window.DB.get("config") || {};
      cfg.clinic_name = name.trim();
      cfg.clinic_addr = addr.trim();
      cfg.wa_number = (wa || "").replace(/\D/g, "");
      cfg.clinic_hours_struct = sched;
      cfg.clinic_hours = buildHoursStr(sched);
      if ((meta || "").replace(/\D/g, "")) cfg.meta_spend_mes = parseInt(meta.replace(/\D/g, ""), 10) || 0;
      window.DB && window.DB.set("config", cfg);
      if (memName.trim()) {
        var team = window.DB && window.DB.get("team") || [];
        team.push({ id: "t" + Date.now(), name: memName.trim(), role: memRole.trim() || "Profesional", active: true, color: "#8B9EB0" });
        window.DB && window.DB.set("team", team);
        if (window.CADMIN) window.CADMIN.team = team;
      }
      window.DB && window.DB.set("onboarded_v1", true);
    } catch (e) {
    }
    onDone();
  }
  function next() {
    if (last) finish();
    else setStep(step + 1);
  }
  const canNext = step !== 0 || name.trim().length > 1;
  const field = (label, value, set, opts) => {
    opts = opts || {};
    return /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginBottom: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
      "input",
      {
        value,
        onChange: (e) => set(e.target.value),
        type: opts.type || "text",
        inputMode: opts.inputMode,
        "data-only": opts.only,
        placeholder: opts.ph,
        style: { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", fontFamily: T.sans, fontSize: 14, color: T.text, outline: "none" }
      }
    ));
  };
  return /* @__PURE__ */ React.createElement("div", { className: "jc-stage", style: { background: T.bg, minHeight: "100dvh", padding: "24px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 460, animation: "jcSlideUp .5s cubic-bezier(.22,1,.36,1) both" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 11, marginBottom: 22 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 42, height: 42, borderRadius: 11, background: "#F2EDE6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 10px -3px rgba(0,0,0,.5)" } }, /* @__PURE__ */ React.createElement("img", { src: "/assets/medique-logo.png", alt: "Medique", style: { width: 37, height: 37, objectFit: "contain" } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, lineHeight: 1 } }, "Bienvenido a Medique"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3 } }, "Configuremos tu cl\xEDnica en 3 pasos"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7, marginBottom: 24 } }, steps.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: s.k, style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { height: 4, borderRadius: 4, background: i <= step ? T.primaryBg : "rgba(255,255,255,.12)", transition: "background .3s ease" } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: i <= step ? T.text : T.textMute, marginTop: 7 } }, s.n)))), /* @__PURE__ */ React.createElement("div", { key: cur.k, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 16, padding: "22px 20px", animation: "jcFade .35s ease both" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.text, marginBottom: 6 } }, cur.t), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.55, marginBottom: 20 } }, cur.s), step === 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, field("Nombre de la cl\xEDnica", name, setName, { ph: "Ej. Cl\xEDnica Aurora" }), field("Direcci\xF3n", addr, setAddr, { ph: "Calle, n\xFAmero, ciudad" }), /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginBottom: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "WhatsApp de contacto"), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: waObDisplay,
      onChange: (e) => onWaOb(e.target.value),
      inputMode: "numeric",
      placeholder: "+56 9 1234 5678",
      style: { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", fontFamily: T.sans, fontSize: 14, color: T.text, outline: "none" }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Horario de atenci\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, OB_DAYS.map(([lbl, v]) => {
    const s = sched[v] || { on: false, from: "10:00", to: "19:00" };
    const setDay = (patch) => setSched({ ...sched, [v]: { ...s, ...patch } });
    const wrap = { position: "relative", display: "inline-flex", alignItems: "center" };
    const selTime = { appearance: "none", WebkitAppearance: "none", MozAppearance: "none", background: "rgba(255,255,255,.05)", border: "1px solid " + T.line, borderRadius: 9, padding: "8px 26px 8px 11px", fontFamily: T.sans, fontSize: 13, color: T.text, outline: "none", cursor: "pointer", width: 92 };
    const caret = /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "2.4", style: { position: "absolute", right: 9, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }));
    const timeSel = (val, key) => /* @__PURE__ */ React.createElement("span", { style: wrap }, /* @__PURE__ */ React.createElement("select", { value: val, onChange: (e) => setDay({ [key]: e.target.value }), style: selTime }, OB_TIMES.map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, t))), caret);
    return /* @__PURE__ */ React.createElement("div", { key: v, style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setDay({ on: !s.on }), style: { width: 54, flexShrink: 0, fontFamily: T.sans, fontSize: 11.5, fontWeight: 600, padding: "9px 0", borderRadius: 9, cursor: "pointer", background: s.on ? T.primaryBg : "transparent", color: s.on ? T.primaryText : T.textMute, border: "1px solid " + (s.on ? T.primaryBg : T.line) } }, lbl), s.on ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flex: 1 } }, timeSel(s.from, "from"), /* @__PURE__ */ React.createElement("span", { style: { color: T.textMute, fontSize: 12 } }, "a"), timeSel(s.to, "to")) : /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Cerrado"));
  })))), step === 1 && /* @__PURE__ */ React.createElement(React.Fragment, null, field("Nombre del profesional", memName, setMemName, { ph: "Ej. Dra. Camila Soto" }), field("Rol o especialidad", memRole, setMemRole, { ph: "Ej. M\xE9dico cirujano" }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 4 } }, "\xBFTrabajas sola/o? Puedes dejarlo en blanco y configurarlo despu\xE9s.")), step === 2 && /* @__PURE__ */ React.createElement(React.Fragment, null, field("Gasto mensual en Meta Ads (CLP)", meta, setMeta, { type: "tel", inputMode: "numeric", only: "num", ph: "Ej. 300000" }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.55, marginTop: 4 } }, "Esto activa tu embudo de retorno (ROAS) en el panel. La conexi\xF3n completa con tu cuenta de Meta la haces desde ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "Marketing"), " cuando quieras."))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 18 } }, step > 0 ? /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(step - 1), style: { background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 13, color: T.textMute } }, "\u2190 Atr\xE1s") : /* @__PURE__ */ React.createElement("button", { onClick: finish, style: { background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Saltar por ahora"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: next,
      disabled: !canNext || saving,
      style: { background: canNext ? T.primaryBg : "rgba(255,255,255,.12)", color: canNext ? T.primaryText : T.textMute, border: "none", borderRadius: 11, padding: "13px 26px", fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, cursor: canNext ? "pointer" : "default", letterSpacing: ".01em" }
    },
    last ? "Entrar al panel" : "Siguiente"
  ))));
}
function SaasGate() {
  const T = window.JCTHEME && window.JCTHEME.editorial || { bg: "#070707", surface: "#141414", line: "rgba(255,255,255,.14)", text: "#F2EDE6", textMute: "rgba(242,237,230,.6)", accent: "#B9C2CB", gold: "#B9C2CB", serif: "Cormorant Garamond, serif", sans: "Jost, sans-serif", primaryBg: "#F2EDE6", primaryText: "#070707" };
  const [phase, setPhase] = useState("loading");
  const [view, setView] = useState("login");
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [otpInfo, setOtpInfo] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const MFA_ON = !!(window.JCSAAS_CONFIG && window.JCSAAS_CONFIG.mfa === true);
  function devKey() {
    try {
      return "jcm_2fadev_" + (window.JCSAAS.currentClinicId() || "");
    } catch (e) {
      return "jcm_2fadev_";
    }
  }
  function proceed() {
    if (window.JCSAAS.isFreshClinic() && window.JCSAAS.hasLegacyData()) {
      setPhase("migrate");
      return;
    }
    scopeClinicData();
    if (!window.JCM_BASE && !(window.DB && window.DB.get("onboarded_v1"))) {
      setPhase("onboarding");
      return;
    }
    importAllWeb().finally(function() {
      setPhase("app");
    });
  }
  function otpSend() {
    setOtpErr("");
    setOtpCode("");
    window.mediqueOtp("send", {}).then(function(r) {
      if (r && r.ok) setOtpInfo(r);
      else setOtpErr(r && r.error || "No se pudo enviar el c\xF3digo.");
    });
  }
  function otpVerify() {
    if (!otpInfo) return;
    setOtpErr("");
    window.mediqueOtp("verify", { code: otpCode.trim(), exp: otpInfo.exp, sig: otpInfo.sig }).then(function(r) {
      if (r && r.ok && r.device) {
        try {
          localStorage.setItem(devKey(), r.device);
        } catch (e) {
        }
        proceed();
      } else setOtpErr(r && r.error || "C\xF3digo incorrecto.");
    });
  }
  useEffect(() => {
    window.JCSAAS.onAuth((payload) => {
      if (!payload || payload.incomplete) {
        setPhase("auth");
        return;
      }
      const a = window.JCSAAS.access();
      if (!a.ok) {
        setPhase("blocked");
        return;
      }
      if (MFA_ON) {
        let dev = "";
        try {
          dev = localStorage.getItem(devKey()) || "";
        } catch (e) {
        }
        window.mediqueOtp("check", { device: dev }).then(function(r) {
          if (r && r.ok && r.trusted) {
            proceed();
          } else if (r && r.ok) {
            setPhase("otp");
            otpSend();
          } else {
            proceed();
          }
        }).catch(function() {
          proceed();
        });
        return;
      }
      proceed();
    });
    const t = setTimeout(() => setPhase((p) => p === "loading" ? "auth" : p), 9e3);
    return () => clearTimeout(t);
  }, []);
  async function doLogin() {
    setErr("");
    setBusy(true);
    try {
      await window.JCSAAS.login(email, pass);
    } catch (e) {
      setErr(authMsg(e));
      setBusy(false);
    }
  }
  async function doRegister() {
    setErr("");
    setBusy(true);
    try {
      await window.JCSAAS.register({ clinicName: clinic, email, password: pass });
    } catch (e) {
      setErr(e && e.msg ? e.msg : authMsg(e));
      setBusy(false);
    }
  }
  async function doRecover() {
    setErr("");
    setMsg("");
    setBusy(true);
    try {
      await window.JCSAAS.resetPassword(email);
      setMsg("Te enviamos un correo para restablecer tu contrase\xF1a.");
    } catch (e) {
      setErr(authMsg(e));
    }
    setBusy(false);
  }
  async function doMigrate(importing) {
    setBusy(true);
    if (importing) {
      try {
        await window.JCSAAS.migrateLocal();
      } catch (e) {
      }
    }
    setBusy(false);
    scopeClinicData();
    importAllWeb().finally(function() {
      setPhase("app");
    });
  }
  function authMsg(e) {
    const c = e && e.code || "";
    if (c.indexOf("email-already-in-use") >= 0) return "Ese correo ya tiene una cuenta. Inicia sesi\xF3n.";
    if (c.indexOf("invalid-credential") >= 0 || c.indexOf("wrong-password") >= 0 || c.indexOf("user-not-found") >= 0) return "Correo o contrase\xF1a incorrectos.";
    if (c.indexOf("invalid-email") >= 0) return "El correo no es v\xE1lido.";
    if (c.indexOf("weak-password") >= 0) return "La contrase\xF1a debe tener al menos 6 caracteres.";
    if (c.indexOf("too-many-requests") >= 0) return "Demasiados intentos. Espera unos minutos.";
    if (c.indexOf("network") >= 0) return "Sin conexi\xF3n. Revisa tu internet.";
    if (c.indexOf("configuration-not-found") >= 0) return "Falta habilitar Correo/contrase\xF1a en Firebase.";
    return "No se pudo completar. Intenta nuevamente.";
  }
  if (phase === "app") return /* @__PURE__ */ React.createElement(AdminApp, null);
  if (phase === "onboarding") return /* @__PURE__ */ React.createElement(OnboardingWizard, { T, onDone: () => {
    try {
      importAllWeb();
    } catch (e) {
    }
    setPhase("app");
  } });
  const inp = { width: "100%", padding: "13px 14px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 14, outline: "none", boxSizing: "border-box" };
  const pBtn = (label, onClick, disabled) => /* @__PURE__ */ React.createElement("button", { onClick, disabled, style: { marginTop: 4, padding: "14px", borderRadius: 6, border: "none", background: T.primaryBg, color: T.primaryText, fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1 } }, label);
  const gBtn = (label, onClick) => /* @__PURE__ */ React.createElement("button", { onClick, style: { marginTop: 4, padding: "13px", borderRadius: 6, border: "1px solid " + T.line, background: "transparent", color: T.text, fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer" } }, label);
  const link = (label, onClick) => /* @__PURE__ */ React.createElement("button", { onClick, style: { background: "none", border: "none", cursor: "pointer", color: T.accent, fontFamily: T.sans, fontSize: 12, textDecoration: "underline", padding: 6 } }, label);
  const wrap = (title, subtitle, body, footer) => /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 380 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent, textAlign: "center" } }, "Medique \xB7 Panel cl\xEDnico"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 34, color: T.text, textAlign: "center", margin: "12px 0 6px", lineHeight: 1.05 } }, title), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, textAlign: "center", lineHeight: 1.6, margin: "0 0 22px" } }, subtitle), body, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 14 } }, footer)));
  if (phase === "loading") return wrap("Conectando\u2026", "Verificando tu sesi\xF3n.", /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: T.textMute, fontFamily: T.sans, fontSize: 12 } }, "Un momento\u2026"), null);
  if (phase === "otp") {
    return wrap(
      "Verifica que eres t\xFA",
      otpInfo ? "Es la primera vez que entras desde este dispositivo. Te enviamos un c\xF3digo de 6 d\xEDgitos a " + (otpInfo.email || "tu correo") + "." : "Enviando un c\xF3digo de verificaci\xF3n a tu correo\u2026",
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement(
        "input",
        {
          value: otpCode,
          autoFocus: true,
          onChange: (e) => {
            setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setOtpErr("");
          },
          onKeyDown: (e) => {
            if (e.key === "Enter" && otpCode.length === 6) otpVerify();
          },
          inputMode: "numeric",
          placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7",
          "data-nocap": "",
          style: { ...inp, textAlign: "center", letterSpacing: ".5em", fontSize: 22 }
        }
      ), otpErr && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A" } }, otpErr), pBtn("Verificar y entrar", otpVerify, otpCode.length !== 6), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, link("Reenviar c\xF3digo", otpSend))),
      link("Cerrar sesi\xF3n", () => window.JCSAAS.logout())
    );
  }
  if (phase === "migrate") {
    const cn = (window.JCSAAS.currentClinic() || {}).name || "tu cl\xEDnica";
    return wrap(
      "Importar tus datos",
      "Detectamos datos de una cl\xEDnica guardados en este equipo. \xBFQuieres importarlos a " + cn + "? (agenda, pacientes, caja, inventario, configuraci\xF3n\u2026)",
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, pBtn(busy ? "Importando\u2026" : "S\xED, importar mis datos", () => doMigrate(true), busy), gBtn("Empezar desde cero", () => doMigrate(false))),
      null
    );
  }
  if (phase === "blocked") {
    const a = window.JCSAAS.access();
    if (a.status === "pending") {
      return wrap(
        "Cuenta en revisi\xF3n",
        "\xA1Gracias por registrar tu cl\xEDnica! Tu cuenta qued\xF3 creada y est\xE1 pendiente de aprobaci\xF3n. Te avisaremos apenas la activemos (suele ser muy r\xE1pido).",
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/56997880877?text=" + encodeURIComponent("Hola, acabo de registrar mi cl\xEDnica en Medique y quiero solicitar acceso a mi cuenta."), target: "_blank", rel: "noopener", style: { textDecoration: "none", display: "block", textAlign: "center" } }, pBtn("Solicitar acceso por WhatsApp", () => {
        }, false)), link("Cerrar sesi\xF3n", () => window.JCSAAS.logout())),
        null
      );
    }
    if (a.status === "rejected") {
      return wrap(
        "Solicitud no aprobada",
        "Tu solicitud de cuenta no fue aprobada. Si crees que es un error, cont\xE1ctanos por WhatsApp.",
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/56997880877?text=" + encodeURIComponent("Hola, mi solicitud de cuenta en Medique no fue aprobada y quiero consultar."), target: "_blank", rel: "noopener", style: { textDecoration: "none" } }, pBtn("Contactar por WhatsApp", () => {
        }, false)), link("Cerrar sesi\xF3n", () => window.JCSAAS.logout())),
        null
      );
    }
    const txt = a.status === "trial_expired" ? "Tu prueba gratuita de 14 d\xEDas termin\xF3." : a.status === "suspended" ? "Tu cuenta est\xE1 suspendida." : "Tu plan no est\xE1 activo.";
    return wrap(
      "Plan inactivo",
      txt + " Para reactivar el acceso, escr\xEDbenos por WhatsApp y activamos tu plan.",
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/56997880877?text=" + encodeURIComponent("Hola, quiero activar el plan de mi cl\xEDnica en el panel."), target: "_blank", rel: "noopener", style: { textDecoration: "none" } }, pBtn("Activar por WhatsApp", () => {
      }, false)), link("Cerrar sesi\xF3n", () => window.JCSAAS.logout())),
      null
    );
  }
  if (view === "register") {
    return wrap(
      "Crea tu cl\xEDnica",
      "Tu cuenta queda en revisi\xF3n y la aprobamos a la brevedad. Luego tienes 14 d\xEDas de prueba gratis, sin tarjeta.",
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { value: clinic, autoFocus: true, onChange: (e) => setClinic(e.target.value), placeholder: "Nombre de la cl\xEDnica", style: inp }), /* @__PURE__ */ React.createElement("input", { value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Correo", inputMode: "email", autoComplete: "email", "data-nocap": "", style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter") doRegister();
      }, placeholder: "Contrase\xF1a (m\xEDn. 6)", autoComplete: "new-password", style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A" } }, err), pBtn(busy ? "Creando\u2026" : "Crear cuenta y empezar", doRegister, busy || !clinic || !email || !pass), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, lineHeight: 1.5, textAlign: "center", marginTop: 2 } }, "Al crear tu cuenta aceptas los ", /* @__PURE__ */ React.createElement("a", { href: "/terminos", target: "_blank", rel: "noopener", style: { color: T.accent, textDecoration: "underline" } }, "T\xE9rminos de Servicio"), " y la ", /* @__PURE__ */ React.createElement("a", { href: "/privacidad", target: "_blank", rel: "noopener", style: { color: T.accent, textDecoration: "underline" } }, "Pol\xEDtica de Privacidad"), ".")),
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "\xBFYa tienes cuenta? ", link("Inicia sesi\xF3n", () => {
        setView("login");
        setErr("");
      }))
    );
  }
  if (view === "recover") {
    return wrap(
      "Recuperar contrase\xF1a",
      "Te enviaremos un enlace a tu correo para restablecerla.",
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { value: email, autoFocus: true, onChange: (e) => setEmail(e.target.value), placeholder: "Correo de tu cuenta", inputMode: "email", "data-nocap": "", style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A" } }, err), msg && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#56b58b" } }, msg), pBtn(busy ? "Enviando\u2026" : "Enviar enlace", doRecover, busy || !email)),
      link("\u2190 Volver", () => {
        setView("login");
        setErr("");
        setMsg("");
      })
    );
  }
  return wrap(
    "Iniciar sesi\xF3n",
    "Entra al panel de tu cl\xEDnica.",
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, /* @__PURE__ */ React.createElement("input", { value: email, autoFocus: true, onChange: (e) => setEmail(e.target.value), placeholder: "Correo", inputMode: "email", autoComplete: "email", "data-nocap": "", style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => {
      if (e.key === "Enter") doLogin();
    }, placeholder: "Contrase\xF1a", autoComplete: "current-password", style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#E0607A" } }, err), pBtn(busy ? "Entrando\u2026" : "Entrar", doLogin, busy || !email || !pass), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, link("\xBFOlvidaste tu contrase\xF1a?", () => {
      setView("recover");
      setErr("");
    }))),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "\xBFCl\xEDnica nueva? ", link("Crear cuenta (14 d\xEDas gratis)", () => {
      setView("register");
      setErr("");
    }))
  );
}
Object.assign(window, { AdminGate, SaasGate });
ReactDOM.createRoot(document.getElementById("root")).render(
  window.JCSAAS && window.JCSAAS.enabled ? /* @__PURE__ */ React.createElement(SaasGate, null) : /* @__PURE__ */ React.createElement(AdminGate, null)
);
