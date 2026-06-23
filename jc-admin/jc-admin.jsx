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
    agenteia: <><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V5M9 13h.01M15 13h.01M2 13h2M20 13h2" /></>
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
  { k: "agenda", l: "Agenda" }, { k: "pacientes", l: "Pacientes" }, { k: "salaespera", l: "Sala de espera" }, { k: "pendientes", l: "Pendientes" }, { k: "caja", l: "Caja" },
  { k: "inventario", l: "Inventario" }, { k: "servicios", l: "Servicios" }, { k: "equipo", l: "Equipo" }, { k: "marketing", l: "Marketing" },
  { k: "agenteia", l: "Agente IA" }, { k: "automatizaciones", l: "Automatizaciones" },
  { k: "resumen", l: "Resumen" }, { k: "colaboracion", l: "Colaboraciones" }, { k: "fidelidad", l: "Fidelidad" },
  { k: "integraciones", l: "Integraciones" }, { k: "reportes", l: "Reportes" }, { k: "administracion", l: "Administración" }, { k: "config", l: "Configuración" }
];

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

function DashboardView({ T, D, A, appts, patients, go }) {
  const [tab, setTab] = useState("general");
  const [kpiPopup, setKpiPopup] = useState(null); // "pacientes" | "citas" | "nuevos" | "ingresos"
  const fmt = (D && D.fmt) ? D.fmt : (n => "$" + (n || 0).toLocaleString("es-CL"));
  const hoy = appts.filter(a => a.day === 0);
  const ingresosHoy = (typeof window.cashToday === "function") ? (window.cashToday() || 0) : 0;
  const nuevosMes = patients.length;
  const green = "#1F8A5B";

  // Evolución de ingresos — estimación semanal (demo)
  const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const serie = [380000, 420000, 510000, 470000, 540000, 610000, 740000];
  const totalSemana = serie.reduce((a, b) => a + b, 0);
  const growth = Math.round((serie[serie.length - 1] / serie[0] - 1) * 100);

  // próximas citas (hoy primero por hora, luego el resto)
  const ord = appts.slice().sort((a, b) => (a.day || 0) - (b.day || 0) || (a.time || "").localeCompare(b.time || ""));
  const prox5 = ord.slice(0, 5);

  // notificaciones
  const wa = ((window.CADMIN || {}).waMessages) || [];
  const biz = ((window.CADMIN || {}).bizComments) || [];
  const sinConsent = patients.filter(p => !p.consent);
  const recitas = (window.recitaDue ? window.recitaDue(patients) : []);

  const TABS = [["general", "Visión General"], ["citas", "Próximas Citas"], ["notif", "Notificaciones"]];

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
    }
    return (
      <div onClick={() => setKpiPopup(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
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
    const W = 720, H = 150, padL = 6, padR = 6, padT = 14, padB = 22;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const maxY = Math.max.apply(null, serie) * 1.18;
    const n = serie.length;
    const X = i => padL + i * innerW / (n - 1);
    const Y = v => padT + (1 - v / maxY) * innerH;
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
        {dias.map((d, i) => <text key={d} x={X(i)} y={H - 6} textAnchor="middle" fontSize="11" fontFamily={T.sans} fill={T.textMute}>{d}</text>)}
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
        <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text }}>{a.day === 0 ? "Hoy, " + (a.time || "—") : (a.when || a.time || "—")}</div>
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

  return (
    <div>
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
            {wa.map(m => notif("whatsapp", green, m.name + " escribió por WhatsApp", "“" + m.msg + "” · " + m.ago, "Responder", () => go("pendientes")))}
            {biz.map(b => notif("campana", T.accent, b.name + " comentó en " + b.net, "“" + b.msg + "” · " + b.ago, "Ver", () => go("marketing")))}
            {sinConsent.length > 0 && notif("alerta", "#C9A227", sinConsent.length + " consentimiento(s) por firmar", "Revisa las fichas pendientes", "Ver", () => go("pendientes"))}
            {recitas.length > 0 && notif("whatsapp", green, recitas.length + " paciente(s) para re-citar", "Cumplieron el plazo de su próxima aplicación", "Ver", () => go("pacientes"))}
            {(wa.length + biz.length + sinConsent.length + recitas.length) === 0 && <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0" }}>Todo al día. Sin notificaciones.</div>}
          </div>
        </div>
      )}
      <KpiPopup />
    </div>
  );
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
  const T = JCTHEME[themeKey];
  const D = window.JCDATA, A = window.JCADMIN;

  const [section, setSection] = useState("dashboard");
  const [darCita, setDarCita] = useState(null); // prellenado del copiloto → abre modal "Dar cita"
  const [patients, setPatients] = useState(() => A.patients.map(p => ({ ...p, points: p.points || [] })));
  const [openPatient, setOpenPatient] = useState(null);
  const [appts, setAppts] = useState(() => {
    const base = D.appointments.map(a => ({ ...a }));
    // Reservas hechas desde el sitio/app (DB 'bookings') → entran como pendientes por confirmar.
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
  const [navOpen, setNavOpen] = useState(false);
  const [stripOpen, setStripOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(() => { try { return localStorage.getItem("jcm_admin_photo") || null; } catch (e) { return null; } });
  const profileRef = useRef(null);
  const profilePhotoInput = useRef(null);
  useEffect(() => {
    const h = e => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  function updatePatient(id, patch) { setPatients(ps => ps.map(p => p.id === id ? { ...p, ...patch } : p)); }
  function addPatient(p) { const np = { ...p, id: "p" + Date.now(), tags: [], consent: false, points: [], history: [] }; setPatients(ps => [np, ...ps]); return np; }
  function addAppt(a) { setAppts(as => [...as, { ...a, id: "a" + Date.now() }]); }
  function updateAppt(id, patch) {
    setAppts(as => {
      // Si se confirma una cita que estaba pendiente de pago, bloquear el slot ahora
      if (patch.status === "confirmada") {
        const prev = as.find(a => a.id === id);
        if (prev && prev.status === "pendiente_pago" && prev.fecha && prev.time) {
          try {
            const map = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
            const cur = Array.isArray(map[prev.fecha]) ? map[prev.fecha] : [];
            map[prev.fecha] = cur.filter(s => s !== prev.time);
            localStorage.setItem("jcm_horarios_dates", JSON.stringify(map));
          } catch(e) {}
        }
      }
      return as.map(a => a.id === id ? { ...a, ...patch } : a);
    });
  }
  function removeAppt(id) {
    const appt = appts.find(a => a.id === id);
    if (appt && appt.fecha && appt.time) {
      try {
        const map = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
        const cur = Array.isArray(map[appt.fecha]) ? map[appt.fecha] : [];
        if (!cur.includes(appt.time)) { cur.push(appt.time); cur.sort(); map[appt.fecha] = cur; }
        localStorage.setItem("jcm_horarios_dates", JSON.stringify(map));
      } catch(e) {}
    }
    setAppts(as => as.filter(a => a.id !== id));
  }
  function nav(k) { setSection(k); setOpenPatient(null); setNavOpen(false); }

  const current = patients.find(p => p.id === openPatient);
  const pendCount = patients.filter(p => !p.consent).length + ((window.CADMIN || {}).waMessages || []).length + ((window.CADMIN || {}).bizComments || []).length;

  let body;
  if (section === "dashboard") body = <DashboardView T={T} D={D} A={A} appts={appts} patients={patients} go={nav} />;
  else if (section === "appjcm") body = <AppJCMView T={T} />;
  else if (section === "resumen") body = <Resumen T={T} D={D} A={A} appts={appts} patients={patients} go={nav} updateAppt={updateAppt} removeAppt={removeAppt} themeKey={themeKey} setThemeKey={setThemeKey} />;
  else if (section === "agenda") body = <Agenda T={T} appts={appts} patients={patients} addAppt={addAppt} addPatient={addPatient} updateAppt={updateAppt} removeAppt={removeAppt} onOpenPatient={(id) => { setOpenPatient(id); setSection("pacientes"); }} />;
  else if (section === "pacientes") body = current
    ? <FichaMedica T={T} patient={current} updatePatient={updatePatient} onBack={() => setOpenPatient(null)} onAgendar={() => nav("agenda")} />
    : <PacientesView T={T} patients={patients} appts={appts} onOpen={setOpenPatient} updatePatient={updatePatient} addPatient={addPatient} />;
  else if (section === "salaespera") body = <SalaEsperaView T={T} appts={appts} patients={patients} />;
  else if (section === "automatizaciones") body = <AutomatizacionesView T={T} />;
  else if (section === "agenteia") body = <AgenteIAView T={T} patients={patients} addAppt={addAppt} />;
  else if (section === "pendientes") body = <PendientesView T={T} patients={patients} appts={appts} go={nav} openP={(id) => { setOpenPatient(id); setSection("pacientes"); }} updatePatient={updatePatient} />;
  else if (section === "servicios") body = <ServiciosView T={T} />;
  else if (section === "equipo") body = <EquipoView T={T} />;
  else if (section === "fidelidad") body = <FidelidadView T={T} />;
  else if (section === "marketing") body = <MarketingView T={T} go={nav} />;
  else if (section === "administracion") body = <AdministracionView T={T} go={nav} patients={patients} appts={appts} addPatient={addPatient} />;
  else if (section === "inventario") body = <InventarioView T={T} />;
  else if (section === "caja") body = <CajaView T={T} />;
  else if (section === "integraciones") body = <IntegracionesView T={T} />;
  else if (section === "reportes") body = <ReportesView T={T} />;
  else if (section === "colaboracion") body = <ColaboracionView T={T} />;
  else if (section === "config") body = <ConfigView T={T} />;

  const RAIL = 60, EXP = 212;
  // Barra izquierda oscura (color de la pestaña seleccionada): única navegación del panel.
  // Sidebar: claro en día (estilo Medique), oscuro en noche.
  const SIDE_BG = T.dark ? "#0E131B" : "#FFFFFF",
    SIDE_TX = T.dark ? "#EFEAE0" : "#1A1A14",
    SIDE_MUTE = T.dark ? "rgba(239,234,224,.55)" : "#5C5A50",
    SIDE_LINE = T.dark ? "rgba(239,234,224,.10)" : "rgba(20,20,15,.10)",
    SIDE_ACT = T.dark ? "rgba(239,234,224,.10)" : (T.accentSoft || "rgba(84,112,127,.12)");
  const SIDE_LOGO = T.dark ? "assets/logo-jc-mark-white.png" : "assets/logo-jc-mark-navy.png";
  return (
    <div className="jc-stage" style={{ background: T.dark ? "#070707" : "#DCD7CC" }}>
      <div className="jc-admin-frame" style={{ background: T.bg, boxShadow: T.shadow, color: T.text, display: "flex", flexDirection: "row" }}>
        {/* SIDEBAR — única navegación */}
        <div onMouseEnter={() => setNavOpen(true)} onMouseLeave={() => setNavOpen(false)}
          style={{ width: RAIL, flexShrink: 0, background: SIDE_BG, position: "relative", zIndex: 20 }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: navOpen ? EXP : RAIL, background: SIDE_BG, borderRight: "1px solid " + SIDE_LINE, transition: "width .22s " + T.ease, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: navOpen ? "8px 0 30px -10px rgba(0,0,0,.5)" : "none" }}>
            <button onClick={() => nav("dashboard")} title="Ir al Dashboard" style={{ display: "flex", alignItems: "center", justifyContent: navOpen ? "flex-start" : "center", gap: 12, padding: navOpen ? "16px 18px" : "16px 0", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
              <img src={SIDE_LOGO} alt="JC" style={{ height: 22, flexShrink: 0 }} />
              {navOpen && <span style={{ fontFamily: T.sans, fontSize: 13, letterSpacing: ".34em", textTransform: "lowercase", color: SIDE_MUTE, whiteSpace: "nowrap" }}>medical</span>}
            </button>
            <div className="jc-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "6px 0" }}>
              {ADMIN_NAV.map(n => {
                const active = section === n.k;
                return (
                  <button key={n.k} onClick={() => nav(n.k)} title={n.l} style={{
                    display: "flex", alignItems: "center", justifyContent: navOpen ? "flex-start" : "center", gap: 14, width: "100%", padding: navOpen ? "12px 19px" : "12px 0", background: active ? SIDE_ACT : "none",
                    border: "none", borderLeft: "3px solid " + (active ? T.accent : "transparent"), cursor: "pointer", whiteSpace: "nowrap", position: "relative"
                  }}>
                    {nIcon(n.k, active ? SIDE_TX : SIDE_MUTE)}
                    {navOpen && <span style={{ fontFamily: T.sans, fontSize: 12.5, letterSpacing: ".02em", color: active ? SIDE_TX : SIDE_MUTE }}>{n.l}</span>}
                    {n.k === "pendientes" && pendCount > 0 && (navOpen
                      ? <span style={{ marginLeft: "auto", fontFamily: T.sans, fontSize: 10, background: "#C0285A", color: "#fff", borderRadius: 999, padding: "2px 7px" }}>{pendCount}</span>
                      : <span style={{ position: "absolute", top: 7, right: 11, width: 7, height: 7, borderRadius: "50%", background: "#C0285A" }} />)}
                  </button>
                );
              })}
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
                <Avatar T={T} name="Juan Claudio" src={profilePic || A.pro} size={32} />
                <div style={{ minWidth: 0, textAlign: "left" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text, lineHeight: 1.1, whiteSpace: "nowrap" }}>Juan Claudio Parra</div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, lineHeight: 1.1 }}>Mi perfil</div>
                </div>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="2.2" style={{ flexShrink: 0, transform: profileOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {profileOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, minWidth: 230, background: T.bg, border: "1px solid " + T.line, borderRadius: 14, boxShadow: "0 12px 40px -10px rgba(0,0,0,.4)", zIndex: 200, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px 14px", borderBottom: "1px solid " + T.line }}>
                    <Avatar T={T} name="Juan Claudio" src={profilePic || A.pro} size={42} />
                    <div>
                      <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.text, lineHeight: 1.2 }}>Juan Claudio Parra</div>
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
                      else if (item.action === "config") { nav("equipo"); setProfileOpen(false); }
                      else if (item.action === "logout") { if (window.jcmAdminEndSession) window.jcmAdminEndSession(); location.reload(); }
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
            <button onClick={() => setNotifOpen(true)} title="Notificaciones" style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.chipBorder, background: T.chipBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></svg>
              {pendCount > 0 && <span style={{ position: "absolute", top: -2, right: -2, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 999, background: "#C0285A", color: "#fff", fontFamily: T.sans, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>{pendCount}</span>}
            </button>
            <button onClick={() => { const nk = T.dark ? "cielo" : "azul"; themeForced.current = true; setThemeKey(nk); try { localStorage.setItem("jcm_theme_pref", JSON.stringify({ key: nk, period: autoPeriod() })); } catch (e) {} }} title={T.dark ? "Modo día" : "Modo noche"} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.chipBorder, background: T.chipBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: T.textMute }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{T.dark ? <><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></> : <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />}</svg>
            </button>
          </div>

          {/* barra dashboard horizontal (pestañas superiores) · estilo moderno */}
          <div className="jc-scroll" style={{ display: "flex", gap: 5, overflowX: "auto", padding: "5px 16px", borderBottom: "1px solid " + T.line, background: T.navBg, position: "relative", zIndex: 5, flexShrink: 0 }}>
            {ADMIN_NAV.map(n => {
              const active = section === n.k;
              return (
                <button key={n.k} onClick={() => nav(n.k)} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 13px", borderRadius: 10, cursor: "pointer", border: "1px solid " + (active ? T.accent : T.line), background: active ? T.accent : T.chipBg, color: active ? (T.onAccent || "#fff") : T.textMute, fontFamily: T.sans, fontSize: 11.5, fontWeight: active ? 600 : 500, whiteSpace: "nowrap", boxShadow: active ? "0 3px 10px -4px " + T.accent : "none", transition: "all .2s " + T.ease }}>
                  {n.k === "pendientes" && pendCount > 0 && <span style={{ width: 5, height: 5, borderRadius: "50%", background: active ? (T.onAccent || "#fff") : "#C0285A" }} />}
                  {n.l}
                </button>
              );
            })}
          </div>

          <div className="jc-scroll" style={{ flex: 1, overflowY: "auto", padding: "18px 20px" }}>
            <div key={section + (openPatient || "")} style={{ animation: "jcFade .3s " + T.ease, maxWidth: 1500, margin: "0 auto" }}>{body}</div>
          </div>
        </div>
        <Copilot T={T} patients={patients} appts={appts} addAppt={addAppt} onDarCita={(pf) => setDarCita(pf)} />
        {darCita && <NewCitaModal T={T} patients={patients} appts={appts} time={darCita.time} day={darCita.day} prefill={darCita} onClose={() => setDarCita(null)} onSave={(a) => { addAppt(a); setDarCita(null); }} />}
        {notifOpen && <NotifPopup T={T} patients={patients} appts={appts} onClose={() => setNotifOpen(false)} go={(k) => { setNotifOpen(false); nav(k); }} openP={(id) => { setNotifOpen(false); setOpenPatient(id); setSection("pacientes"); }} />}
      </div>
    </div>
  );
}

/* ─────────── NOTIFICACIONES (popup desde la campana) ─────────── */
function NotifPopup({ T, patients, appts, onClose, go, openP }) {
  const D = window.JCDATA;
  const wa = ((window.CADMIN || {}).waMessages) || [];
  const biz = ((window.CADMIN || {}).bizComments) || [];
  const sinConsent = patients.filter(p => !p.consent);
  // Pacientes que ya cumplieron el plazo para su próxima aplicación (re-cita).
  const recitas = (window.recitaDue ? window.recitaDue(patients) : []);
  let tasks = []; try { tasks = ((window.DB && DB.get("admin_tasks")) || []).filter(t => !t.done); } catch (e) {}
  const total = wa.length + biz.length + sinConsent.length + recitas.length + tasks.length;
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
    </div>
  );
  const ICb = <><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></>;
  const ICa = <><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></>;
  const ICc = <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></>;
  const ICk = <><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></>;
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 70 }} />
      <div style={{ position: "fixed", top: 60, right: 20, zIndex: 71, width: 372, maxWidth: "calc(100vw - 32px)", maxHeight: "78vh", display: "flex", flexDirection: "column", background: T.bg, border: "1px solid " + T.line, borderRadius: 14, boxShadow: "0 24px 60px -18px rgba(0,0,0,.55)", overflow: "hidden", animation: "jcSlideUp .25s " + T.ease }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid " + T.line }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: T.serif, fontSize: 18, color: T.text }}>Notificaciones</span>
            {total > 0 && <span style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 600, background: "#C0285A", color: "#fff", borderRadius: 999, padding: "2px 8px" }}>{total}</span>}
          </div>
          <button onClick={onClose} title="Cerrar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 2 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {total === 0 && <div style={{ padding: "34px 18px", textAlign: "center", fontFamily: T.sans, fontSize: 12.5, color: T.textFaint }}>Todo al día. Sin notificaciones.</div>}
          {sinConsent.map(p => row("c" + p.id, "#C9A227", ICa, "Consentimiento por firmar", p.name, "Abrir ficha", () => openP(p.id)))}
          {recitas.map(({ p, r }) => row("re" + p.id, "#1F8A5B", ICb, "Toca re-citar · " + p.name, r.motivo, "WhatsApp", () => window.open(window.recitaWa ? window.recitaWa(p, r) : ("https://wa.me/" + (p.phone || "").replace(/\D/g, "")), "_blank", "noopener")))}
          {wa.map(m => row("w" + m.id, "#1F8A5B", ICb, m.name + " escribió por WhatsApp", "“" + m.msg + "” · " + m.ago, "Responder", () => window.open("https://wa.me/" + (D ? D.wa : ""), "_blank", "noopener")))}
          {biz.map(b => row("b" + b.id, T.accent, ICc, b.name + " comentó en " + b.net, "“" + b.msg + "” · " + b.ago, "Ver", () => go("marketing")))}
          {tasks.map(t => row("t" + t.id, T.accent, ICk, "Pendiente del equipo", t.text, null, null))}
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
  const [metaConn, setMetaConn] = useState(true);
  const [resModal, setResModal] = useState(null);
  const hoy = appts.filter(a => a.day === 0).sort((a, b) => a.time.localeCompare(b.time));
  const next3 = appts.slice().sort((a, b) => (a.day - b.day) || a.time.localeCompare(b.time)).slice(0, 3);
  const camps = (window.CADMIN || { campaigns: [] }).campaigns;
  const reach = camps.reduce((s, c) => s + c.reach, 0), leads = camps.reduce((s, c) => s + c.leads, 0), spend = camps.reduce((s, c) => s + c.spend, 0);
  const week = [4, 6, 3, 7, 5, 2, 0];
  const wd = ["L", "M", "M", "J", "V", "S", "D"], maxw = Math.max(...week);
  const greet = now.getHours() < 13 ? "Buenos días" : now.getHours() < 20 ? "Buenas tardes" : "Buenas noches";
  return (
    <div>
      <div style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent }}>{greet}, Juan Claudio</div>
      <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 32, letterSpacing: "-.02em", color: T.text, marginTop: 8, lineHeight: 1.05 }}>{now.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" })}</h1>

      {/* Resumen semanal */}
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "18px 18px", marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Resumen semanal</div>
          <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>27 citas · {D.fmt(3940000)}</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 84 }}>
          {week.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
              <div style={{ width: "100%", maxWidth: 26, height: (v / maxw * 60 + 4) + "px", background: i === now.getDay() - 1 ? T.accent : (T.dark ? "rgba(242,237,230,.18)" : "rgba(20,20,15,.14)"), borderRadius: 4 }} />
              <span style={{ fontFamily: T.sans, fontSize: 9.5, color: T.textMute }}>{wd[i]}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16, paddingTop: 16, borderTop: "1px solid " + T.lineSoft }}>
          <button onClick={() => setResModal("pacientes")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}><AdStat T={T} n={patients.length} l="Pacientes" /></button>
          <button onClick={() => setResModal("citas")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}><AdStat T={T} n={appts.length} l="Citas semana" /></button>
          <button onClick={() => setResModal("consent")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}><AdStat T={T} n={patients.filter(p => !p.consent).length} l="Consent. pend." accent={patients.some(p => !p.consent)} /></button>
        </div>
      </div>

      {resModal && (() => {
        const cfg = {
          pacientes: { title: "Pacientes", rows: patients.map(p => ({ k: p.id, a: p.name, b: p.rut || p.phone || "" })) },
          citas: { title: "Citas de la semana", rows: appts.slice().sort((a, b) => (a.day || 0) - (b.day || 0) || (a.time || "").localeCompare(b.time || "")).map(a => ({ k: a.id, a: a.name, b: (a.day === 0 ? "Hoy " : "") + (a.time || "") + " · " + (a.proc || "") })) },
          consent: { title: "Consentimientos pendientes", rows: patients.filter(p => !p.consent).map(p => ({ k: p.id, a: p.name, b: (p.tags && p.tags[0]) || "Paciente" })) }
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
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Próximas 3 citas</div>
        <button onClick={() => go("agenda")} style={linkBtn(T)}>Ver agenda →</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {next3.map(a => (
          <button key={a.id} onClick={() => setEdit(a)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, cursor: "pointer", textAlign: "left", width: "100%" }}>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontFamily: T.serif, fontSize: 19, color: T.text, lineHeight: 1 }}>{a.time}</div>
              <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, marginTop: 3 }}>{a.day === 0 ? "Hoy" : "Mañana"}</div>
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
            <div style={{ fontFamily: T.sans, fontSize: 10, color: metaConn ? "#1F8A5B" : T.textMute, marginTop: 2 }}>{metaConn ? "● Conectado a JC Medical · Business Suite" : "Cuenta desconectada"}</div>
          </div>
          <button onClick={() => setMetaConn(!metaConn)} style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", padding: "8px 12px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", background: metaConn ? "transparent" : "#1877F2", color: metaConn ? "#1F8A5B" : "#fff", border: metaConn ? "1px solid #1F8A5B" : "none" }}>{metaConn ? "✓ Conectado" : "Conectar"}</button>
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

function ApptBlock({ T, a, onClick, compact }) {
  return (
    <div data-appt onClick={e => { e.stopPropagation(); onClick(a); }} style={{ cursor: "pointer", background: T.surface2, border: "1px solid " + T.accent, borderLeft: "3px solid " + T.accent, borderRadius: 6, padding: compact ? "5px 7px" : "8px 11px", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
        <span style={{ fontFamily: T.sans, fontSize: compact ? 10.5 : 12.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</span>
        {!compact && <span style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, flexShrink: 0 }}>{a.time}</span>}
      </div>
      <div style={{ fontFamily: T.sans, fontSize: compact ? 9 : 10.5, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{compact ? a.time + " · " + a.proc : a.proc}</div>
    </div>
  );
}

function Agenda({ T, appts, patients, addAppt, addPatient, updateAppt, removeAppt, onOpenPatient }) {
  const [view, setView] = useState("semana");
  const [day, setDay] = useState(0);
  const [nueva, setNueva] = useState(null);
  const [edit, setEdit] = useState(null);
  const [toast, setToast] = useState(null);
  const [hoverA, setHoverA] = useState(null); // { a, x, y } · vista previa al pasar el cursor (vista día/lista)
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(id); }, []);
  const D = window.JCDATA;
  const list = appts.filter(a => a.day === day);
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
  const week = []; const b0 = new Date(); for (let off = 0; off < 7; off++) { const dt = new Date(b0); dt.setDate(b0.getDate() + off); week.push({ off, dd: dt.getDate(), wd: wdN[dt.getDay()], lbl: off === 0 ? "Hoy" : off === 1 ? "Mañana" : wdN[dt.getDay()], count: appts.filter(a => a.day === off).length }); }

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

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: T.accent + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 28, letterSpacing: "-.02em", color: T.text, margin: 0 }}>Reservas y Citas</h1>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 2 }}>Gestiona la agenda de la clínica, confirma asistencias y asigna puntos.</div>
        </div>
        {/* toggle de vista (lista / calendario) */}
        <div style={{ display: "inline-flex", gap: 4, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: 4 }}>
          <button onClick={() => setView("dia")} title="Vista lista / día" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 32, borderRadius: 7, cursor: "pointer", border: "none", background: view === "dia" ? T.accent : "transparent", color: view === "dia" ? (T.onAccent || "#fff") : T.textMute }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
          </button>
          <button onClick={() => setView("semana")} title="Vista calendario / semana" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 32, borderRadius: 7, cursor: "pointer", border: "none", background: view === "semana" ? T.accent : "transparent", color: view === "semana" ? (T.onAccent || "#fff") : T.textMute }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
          </button>
        </div>
        <AdBtn T={T} primary onClick={() => setNueva({ time: "10:00", day: view === "dia" ? day : 0 })}>+ Nueva Cita</AdBtn>
      </div>

      {view === "semana" ? (
        <SemanaGrid T={T} week={week} appts={appts} onNew={(off, time) => setNueva({ time, day: off, fromSlot: true })} onEdit={setEdit} updateAppt={updateAppt} removeAppt={removeAppt} onDay={(off) => { setDay(off); setView("dia"); }} onVerFicha={(appt) => { const p = (patients || []).find(x => x.name === appt.name); if (p && onOpenPatient) onOpenPatient(p.id); }} />
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

      {nueva && <NewCitaModal T={T} patients={patients} addPatient={addPatient} appts={appts} time={nueva.time} day={nueva.day} prefill={nueva.fromSlot ? { time: nueva.time, day: nueva.day } : undefined} onClose={() => setNueva(null)} onSave={onCreate} />}
      {edit && <CitaEditModal T={T} appt={edit} patients={patients} onClose={() => setEdit(null)} onSave={(patch) => { updateAppt(edit.id, patch); setEdit(null); }} onCancel={() => { removeAppt(edit.id); setEdit(null); }} />}
      {toast && <Toast T={T} data={toast} onClose={() => setToast(null)} />}
      {/* Vista previa momentánea al pasar el cursor sobre una cita (vista día/lista) */}
      {hoverA && hoverA.a && !edit && (() => {
        const a = hoverA.a, isPP = a.status === "pendiente_pago";
        const ac = a.attended ? "#1F8A5B" : (isPP ? "#B8860B" : T.accent);
        const estado = a.attended ? "Atendida" : (isPP ? "⏳ Pago pendiente" : (a.status === "confirmada" ? "Confirmada" : "Pendiente"));
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
const selS = T => ({ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" });
const lblS = T => ({ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 });
// Slots de 30 min usados en el panel (8:00–19:30)
const ADMIN_HALF_HOURS = (() => { const s = []; for (let h = 8; h < 20; h++) { s.push((h<10?"0":"")+h+":00"); s.push((h<10?"0":"")+h+":30"); } return s; })();

function SemanaGrid({ T, week, appts, onNew, onEdit, updateAppt, removeAppt, onDay, onVerFicha }) {
  const D = window.JCDATA;
  const [wkOff, setWkOff] = useState(0);
  const [menu, setMenu] = useState(null); // appt id abierto
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [menuDayOff, setMenuDayOff] = useState(null);
  const [hover, setHover] = useState(null); // { a, x, y } · vista previa momentánea al pasar el cursor
  const activeAppt = menu ? appts.find(a => a.id === menu) : null;
  const DOWS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  const MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start = new Date(today); start.setDate(today.getDate() - today.getDay() + wkOff * 7); // domingo de la semana mostrada
  const days = []; for (let i = 0; i < 7; i++) { const dt = new Date(start); dt.setDate(start.getDate() + i); days.push({ date: dt, dd: dt.getDate(), dow: DOWS[dt.getDay()], off: Math.round((dt - today) / 86400000), isToday: dt.getTime() === today.getTime() }); }
  const last = days[6].date;
  const hours = []; for (let h = 8; h <= 20; h++) hours.push(h);
  const hourOf = t => parseInt((t || "0").split(":")[0], 10);
  const atCell = (off, h) => appts.filter(a => a.day === off && hourOf(a.time) === h);
  const navBtn = { width: 34, height: 34, borderRadius: 9, border: "1px solid " + T.line, background: T.surface, color: T.textMute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
  const WPX = 70, WK_OPEN = 8, WK_CLOSE = 20;
  const wkHours = []; for (let h = WK_OPEN; h < WK_CLOSE; h++) wkHours.push(h);
  const wkGridH = (WK_CLOSE - WK_OPEN) * WPX;
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
      {/* navegación de semana */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 180, fontFamily: T.serif, fontSize: 21, color: T.text }}>
          {days[0].dd} de <span style={{ fontStyle: "italic", color: T.accent }}>{cap(MES[start.getMonth()])}</span> – {last.getDate()} de <span style={{ fontStyle: "italic", color: T.accent }}>{cap(MES[last.getMonth()])}</span>
        </div>
        <button onClick={() => setWkOff(0)} style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: wkOff === 0 ? T.textMute : T.text, background: T.surface, border: "1px solid " + T.line, borderRadius: 9, padding: "8px 16px", cursor: "pointer" }}>Hoy</button>
        <button onClick={() => setWkOff(wkOff - 1)} title="Semana anterior" style={navBtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg></button>
        <button onClick={() => setWkOff(wkOff + 1)} title="Semana siguiente" style={navBtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg></button>
      </div>

      <div className="jc-scroll" style={{ overflowX: "auto", overflowY: "auto", maxHeight: "74vh", border: "1px solid " + T.line, borderRadius: 12 }}>
        <div style={{ minWidth: 900 }}>
          {/* Encabezado días */}
          <div style={{ display: "grid", gridTemplateColumns: "52px repeat(7, minmax(112px,1fr))", position: "sticky", top: 0, zIndex: 3, background: T.navBg, backdropFilter: "blur(8px)" }}>
            <div style={{ borderBottom: "1px solid " + T.line }} />
            {days.map((d, i) => (
              <div key={i} style={{ padding: "12px 4px 10px", textAlign: "center", borderBottom: "1px solid " + T.line, borderLeft: "1px solid " + T.lineSoft }}>
                <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".1em", color: d.isToday ? T.accent : T.textMute }}>{d.dow}</div>
                {d.isToday
                  ? <div style={{ margin: "3px auto 0", width: 30, height: 30, borderRadius: "50%", background: T.accent, color: T.onAccent || "#fff", fontFamily: T.serif, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>{d.dd}</div>
                  : <div style={{ fontFamily: T.serif, fontSize: 19, color: T.text, marginTop: 2 }}>{d.dd}</div>}
              </div>
            ))}
          </div>
          {/* Timeline continuo por columna */}
          <div style={{ display: "flex", position: "relative" }}>
            {/* Etiquetas de hora */}
            <div style={{ width: 52, flexShrink: 0, position: "relative", height: wkGridH, borderRight: "1px solid " + T.lineSoft, overflow: "hidden" }}>
              {wkHours.map((h, i) => (
                <div key={h} style={{ position: "absolute", top: Math.max(2, i * WPX - 8), right: 6, fontFamily: T.sans, fontSize: 10, color: T.textFaint, pointerEvents: "none", userSelect: "none" }}>
                  {(h < 10 ? "0" : "") + h}:00
                </div>
              ))}
            </div>
            {/* Columnas de días */}
            {days.map((d, ci) => {
              const da = appts.filter(a => a.day === d.off && mins(a.time) >= WK_OPEN * 60 && mins(a.time) < WK_CLOSE * 60);
              return (
                <div key={ci} style={{ flex: "1 1 0", minWidth: 112, position: "relative", height: wkGridH, borderLeft: "1px solid " + T.lineSoft, background: d.isToday ? T.accent + "08" : "transparent" }}>
                  {/* Líneas de 30 min + zonas clicables; bloqueadas si hay cita que cubre ese slot */}
                  {ADMIN_HALF_HOURS.map((hhmm, i) => {
                    const isHour = hhmm.endsWith(":00");
                    const blocked = appts.some(a => { if (a.day !== d.off) return false; const as = mins(a.time), ad = parseInt(a.dur)||60, ts = mins(hhmm); return ts >= as && ts < as + ad; });
                    return (
                      <div key={hhmm} style={{ position: "absolute", left: 0, right: 0, top: i * (WPX/2), height: WPX/2, borderBottom: "1px solid " + (isHour ? T.lineSoft : T.lineSoft + "55") }}>
                        {!blocked && <button className="jc-cell" onClick={() => onNew(d.off, hhmm)} title={"Agendar " + hhmm}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                          <span className="jc-cell-add" style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid " + T.line, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                          </span>
                        </button>}
                      </div>
                    );
                  })}
                  {/* Bloques de citas apilados verticalmente */}
                  {stackAppts(da).map(a => {
                    const isPendPago = a.status === "pendiente_pago";
                    const accentColor = a.attended ? "#1F8A5B" : (isPendPago ? "#B8860B" : T.accent);
                    return (
                      <div key={a.id} className="jc-appt" style={{ position: "absolute", left: 1, right: 1, top: a._top, height: a._h, zIndex: 2 }}
                        onMouseEnter={e => { const r = e.currentTarget.getBoundingClientRect(); setHover({ a, x: Math.min(r.right + 8, window.innerWidth - 250), y: Math.min(r.top, window.innerHeight - 180) }); }}
                        onMouseLeave={() => setHover(null)}
                        onClick={e => { e.stopPropagation(); setHover(null); const r = e.currentTarget.getBoundingClientRect(); setMenuPos({ x: Math.min(r.left, window.innerWidth - 210), y: Math.min(r.bottom + 4, window.innerHeight - 290) }); setMenuDayOff(d.off); setMenu(menu === a.id ? null : a.id); }}>
                        <div style={{ height: "100%", cursor: "pointer", background: isPendPago ? "#FFF8E1" + "22" : T.surface, border: "1px solid " + (isPendPago ? "#B8860B44" : T.line), borderLeft: "3px solid " + accentColor, borderRadius: 6, padding: "4px 6px", overflow: "hidden", boxShadow: "0 2px 6px rgba(40,38,30,.08)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
                            <span style={{ flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</span>
                          </div>
                          {a._h > 26 && <div style={{ fontFamily: T.sans, fontSize: 9.5, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.time} · {(parseInt(a.dur) || 60)} min</div>}
                          {a._h > 42 && <div style={{ fontFamily: T.sans, fontSize: 9, color: T.textFaint, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{isPendPago ? "⏳ Pago pendiente" : a.proc}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 12 }}>Pasa el mouse por un horario libre y toca el <b style={{ color: T.accent }}>+</b> para agendar · toca una cita para ver opciones (atender, reprogramar, anular).</p>
      {/* Vista previa momentánea al pasar el cursor sobre una cita */}
      {hover && hover.a && !menu && (() => {
        const a = hover.a, isPP = a.status === "pendiente_pago";
        const ac = a.attended ? "#1F8A5B" : (isPP ? "#B8860B" : T.accent);
        const estado = a.attended ? "Atendida" : (isPP ? "⏳ Pago pendiente" : (a.status === "confirmada" ? "Confirmada" : "Pendiente"));
        return (
          <div style={{ position: "fixed", left: hover.x, top: hover.y, zIndex: 90, width: 232, background: T.bg, border: "1px solid " + T.line, borderLeft: "3px solid " + ac, borderRadius: 10, boxShadow: "0 18px 44px -14px rgba(0,0,0,.5)", padding: "12px 14px", pointerEvents: "none", animation: "jcFade .14s ease" }}>
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
      {menu && activeAppt && (
        <>
          <div onClick={() => setMenu(null)} style={{ position: "fixed", inset: 0, zIndex: 79 }} />
          <div onClick={e => e.stopPropagation()} style={{ position: "fixed", left: menuPos.x, top: menuPos.y, zIndex: 80, minWidth: 210, background: T.bg, border: "1px solid " + T.line, borderRadius: 8, boxShadow: "0 16px 40px -12px rgba(0,0,0,.5)", overflow: "hidden", padding: "4px 0", animation: "jcSlideUp .2s ease" }}>
            {[
              ["Ver ficha del paciente", () => { if (onVerFicha) onVerFicha(activeAppt); setMenu(null); }],
              ["Cambiar fecha / hora", () => { onEdit(activeAppt); setMenu(null); }],
              ["Modificar duración", () => { onEdit(activeAppt); setMenu(null); }],
              ["Agregar comentario", () => { onEdit(activeAppt); setMenu(null); }],
              ["__sep", null],
              ...(activeAppt.status === "pendiente_pago" ? [["✓ Confirmar transferencia", () => { updateAppt(activeAppt.id, { status: "confirmada" }); setMenu(null); }, "#1F8A5B"]] : []),
              ["Marcar como atendido", () => { updateAppt(activeAppt.id, { status: "confirmada", attended: true }); setMenu(null); }],
              ["Anular", () => { removeAppt(activeAppt.id); setMenu(null); }]
            ].map((it, i) => it[0] === "__sep"
              ? <div key={i} style={{ height: 1, background: T.lineSoft, margin: "4px 0" }} />
              : <button key={i} onClick={it[1]} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, color: it[0] === "Anular" ? "#C0285A" : (it[2] || T.text) }}>{it[0]}</button>)}
          </div>
        </>
      )}
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

function NewCitaModal({ T, patients, addPatient, time, day, onClose, onSave, prefill, appts }) {
  const D = window.JCDATA;
  const A = window.JCADMIN;
  const team = (window.CADMIN || { team: [] }).team;
  const especialidades = D.catalog.map(s => s.sec);
  // Prellenado por el copiloto (voz/texto): salta al paso 2 con la hora ya elegida.
  const pf = prefill || {};
  const [step, setStep] = useState(pf.time ? 2 : 1);
  // parámetros
  const [esp, setEsp] = useState("Todas");
  const [proc, setProc] = useState(pf.proc || "Evaluación general");
  const [prof, setProf] = useState(team[0] ? team[0].name : "Juan Claudio Parra");
  const [recurso, setRecurso] = useState("No especificado");
  const [camilla, setCamilla] = useState("Box 1");
  const [dur, setDur] = useState("30 minutos");
  // selección
  const [pick, setPick] = useState(pf.time ? { dayOff: pf.day || 0, time: pf.time } : null); // {dayOff, time}
  // paciente
  const [tipo, setTipo] = useState(pf.patName && !pf.patId ? "nuevo" : "existente");
  const [pid, setPid] = useState(pf.patId || "");
  const [patQ, setPatQ] = useState("");
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

  const procsByEsp = esp === "Todas" ? PROC_LIST() : (D.catalog.find(s => s.sec === esp) || { groups: [] }).groups.reduce((a, g) => a.concat(g.items.map(i => i.n)), []);
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
          const np = addPatient({ name: nombre.trim(), rut: rut.trim(), phone: phone.trim(), email: email.trim(), age: 0 });
          if (np && np.id) resolvedPatId = np.id;
        } catch (e) {}
      }
      onSave({ name: finalName, patId: resolvedPatId, rut: pat ? pat.rut : rut, phone: finalPhone, email: finalEmail, proc, prof, recurso, camilla, dur, origen, time: pick.time, day: pick.dayOff, fecha: apptFecha, status: "pendiente", paid: false });
      // Bloquear el slot en jcm_horarios_dates para que no aparezca disponible en la app del paciente
      try {
        const dt = new Date(apptFecha + "T00:00:00");
        const curr = D.availability(dt.getDay());
        D.saveDateSlots(apptFecha, (curr.slots || []).filter(s => s !== pick.time));
      } catch (e) {}
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
    const waMsg = encodeURIComponent("Hola " + finalName + " 👋\n\nTu cita en JC Medical quedó confirmada:\n\n📅 " + wk.wd + " " + wk.dd + " " + wk.mm + "\n🕐 " + pick.time + " hrs\n💉 " + proc + "\n👨‍⚕️ " + prof + "\n\nRecuerda llegar 5 min antes. Si necesitas reagendar, avísanos con 24 h de anticipación.\n\n¡Nos vemos pronto! 🌿");
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
          "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//JC Medical//Agenda//ES", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
          "BEGIN:VEVENT",
          "UID:cita-" + Date.now() + "@jcmedical",
          "DTSTAMP:" + stamp,
          "DTSTART:" + fmt(start),
          "DTEND:" + fmt(end),
          "SUMMARY:" + esc("Cita JC Medical · " + proc),
          "DESCRIPTION:" + esc("Paciente: " + (finalName || "—") + "\nProfesional: " + prof + "\nProcedimiento: " + proc),
          "LOCATION:" + esc("JC Medical · SKINLAB Talca"),
          "BEGIN:VALARM", "TRIGGER:-PT24H", "ACTION:DISPLAY", "DESCRIPTION:" + esc("Recordatorio: cita en JC Medical mañana"), "END:VALARM",
          "END:VEVENT", "END:VCALENDAR"
        ].join("\r\n");
        const ua = navigator.userAgent || "";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
        if (isMobile) {
          // Móvil: abrir el .ics directamente → iOS/Android abren el calendario nativo
          // con la hoja "Agregar evento", sin pasar por el gestor de descargas.
          window.location.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
          return;
        }
        // Escritorio: abrir Google Calendar prellenado en pestaña nueva (sin descarga).
        // Si el navegador lo bloquea, caemos al .ics descargable.
        const gFmt = d => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00";
        const gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE"
          + "&text=" + encodeURIComponent("Cita JC Medical · " + proc)
          + "&dates=" + gFmt(start) + "/" + gFmt(end)
          + "&details=" + encodeURIComponent("Paciente: " + (finalName || "—") + "\nProfesional: " + prof + "\nProcedimiento: " + proc)
          + "&location=" + encodeURIComponent("JC Medical · SKINLAB Talca")
          + "&ctz=America/Santiago";
        const win = window.open(gcal, "_blank");
        if (!win) {
          const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "cita-jcmedical-" + apptFecha + ".ics";
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 4000);
        }
      } catch (e) { console.error("Error al crear evento de calendario:", e); }
    }
    return (
      <AdModal T={T} title="Cita agendada" onClose={onClose} wide footer={<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <AdBtn T={T} onClick={onClose}>Cerrar</AdBtn>
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
        <div style={{ background: "rgba(31,138,91,.08)", border: "1px solid rgba(31,138,91,.3)", borderRadius: 8, padding: "12px 14px", marginBottom: 16, fontFamily: T.sans, fontSize: 12.5, color: T.text }}>
          Cita seleccionada · <b>{wk.wd} {wk.dd} {wk.mm}</b> a las <b>{pick.time}</b> · {prof}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <div>
            <span style={lbl}>Tratamiento</span>
            <select value={proc} onChange={e => setProc(e.target.value)} style={selStyle}>
              <option value="Evaluación general">Evaluación general</option>
              {PROC_LIST().map(p => <option key={p} value={p}>{p}</option>)}
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
                {(() => { const q = patQ.trim().toLowerCase(); const fl = q ? patients.filter(p => (p.name || "").toLowerCase().includes(q) || (p.rut || "").toLowerCase().includes(q)) : patients; return fl.length ? fl.map(p => (
                  <button key={p.id} onClick={() => setPid(p.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 13px", background: pid === p.id ? (T.surface2 || T.accent + "14") : "transparent", border: "none", borderBottom: "1px solid " + T.lineSoft, cursor: "pointer" }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{p.name}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{p.rut || p.phone || "Paciente"}</div>
                  </button>
                )) : <div style={{ padding: "16px 13px", fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Sin resultados para “{patQ}”.</div>; })()}
              </div>
            </div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <AdField T={T} label="Nombre completo" value={nombre} onChange={setNombre} placeholder="Ej: Paciente nuevo" />
              <AdField T={T} label="RUT" value={rut} onChange={setRut} placeholder="12.345.678-9" />
              <AdField T={T} label="Teléfono móvil (WhatsApp)" value={phone} onChange={setPhone} inputMode="tel" />
              <AdField T={T} label="Correo" value={email} onChange={setEmail} inputMode="email" placeholder="correo@ejemplo.com" />
            </div>}
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid " + T.line }}>
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
          <div><span style={lbl}>Procedimiento</span><select value={proc} onChange={e => setProc(e.target.value)} style={selStyle}><option value="Evaluación general">Evaluación general</option>{procsByEsp.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
          <div><span style={lbl}>Profesional</span><select value={prof} onChange={e => setProf(e.target.value)} style={selStyle}>{team.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}</select></div>
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
                  {ADMIN_HALF_HOURS.map(h => {
                    const sel = pick && pick.dayOff === w.off && pick.time === h;
                    const blk = (appts || []).some(a => { if (a.day !== w.off) return false; const as = mins(a.time), ad = parseInt(a.dur)||60, ts = mins(h); return ts >= as && ts < as + ad; });
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
  const procs = PROC_LIST();
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
  return (
    <AdModal T={T} title="Editar cita" onClose={onClose}
      footer={
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {appt.status === "pendiente_pago" && (
            <button onClick={() => onSave({ proc, fecha, time: t, status: "confirmada", comentario, origen, dur })}
              style={{ width: "100%", fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "14px", borderRadius: 4, border: "none", background: "#1F8A5B", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg>
              Confirmar transferencia · bloquear hora
            </button>
          )}
          <AdBtn T={T} primary full onClick={() => onSave({ proc, fecha, time: t, status, comentario, origen, dur })}>Guardar cambios</AdBtn>
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
            {procs.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div><span style={lblS(T)}>Fecha</span><MiniCalendar T={T} selected={fecha} onSelect={setFecha} /></div>
        <div><span style={lblS(T)}>Hora</span>
          <input type="time" value={t} onChange={e => setT(e.target.value)} step="1800"
            list="jcm-edit-hour-list" style={{ ...selS(T), cursor: "pointer" }} />
          <datalist id="jcm-edit-hour-list">
            {ADMIN_HALF_HOURS.map(h => <option key={h} value={h} />)}
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
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: T.accent, textAlign: "center" }}>JC Medical · Panel clínico</div>
        <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 36, color: T.text, textAlign: "center", margin: "12px 0 6px", lineHeight: 1.05 }}>{title}</h1>
        <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, textAlign: "center", lineHeight: 1.6, margin: "0 0 22px" }}>{subtitle}</p>
        {body}
        <div style={{ textAlign: "center", marginTop: 14 }}>{footer}</div>
        <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, textAlign: "center", marginTop: 10, lineHeight: 1.6 }}>Sesión protegida · expira en 4 horas de inactividad.</p>
      </div>
    </div>
  );
}
Object.assign(window, { AdminGate });
ReactDOM.createRoot(document.getElementById("root")).render(<AdminGate />);
