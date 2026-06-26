function PanelScreen({ T, D }) {
  const [tab, setTab] = useState("citas");
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { padding: "22px 20px 6px" } }, /* @__PURE__ */ React.createElement(Eyebrow, { T }, "Panel \xB7 Juan Claudio"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 36, letterSpacing: "-.02em", color: T.text, marginTop: 12 } }, "Tu agenda")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: "10px 20px", position: "sticky", top: 0, background: T.navBg, backdropFilter: "blur(12px)", zIndex: 4 } }, [["citas", "Citas"], ["horarios", "Horarios"], ["recordatorios", "Recordatorios"]].map(([k, l]) => /* @__PURE__ */ React.createElement(Chip, { key: k, T, active: tab === k, onClick: () => setTab(k) }, l))), tab === "citas" && /* @__PURE__ */ React.createElement(CitasTab, { T, D }), tab === "horarios" && /* @__PURE__ */ React.createElement(HorariosTab, { T, D }), tab === "recordatorios" && /* @__PURE__ */ React.createElement(RecordatoriosTab, { T, D }));
}
function CitasTab({ T, D }) {
  const [day, setDay] = useState(0);
  const [appts, setAppts] = useState(D.appointments);
  const dayLabel = day === 0 ? "Hoy" : "Ma\xF1ana";
  const list = appts.filter((a) => a.day === day).sort((a, b) => a.time.localeCompare(b.time));
  function setStatus(id, status) {
    setAppts(appts.map((a) => a.id === id ? { ...a, status } : a));
  }
  const confirmed = list.filter((a) => a.status === "confirmada").length;
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 20px 20px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 14 } }, [[0, "Hoy"], [1, "Ma\xF1ana"]].map(([d, l]) => /* @__PURE__ */ React.createElement("button", { key: d, onClick: () => setDay(d), style: {
    flex: 1,
    padding: "12px",
    borderRadius: 4,
    cursor: "pointer",
    fontFamily: T.sans,
    fontSize: 12,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    background: day === d ? T.surface2 : T.surface,
    color: day === d ? T.text : T.textMute,
    border: "1px solid " + (day === d ? T.accent : T.line)
  } }, l))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(Stat, { T, n: list.length, l: "Citas" }), /* @__PURE__ */ React.createElement(Stat, { T, n: confirmed, l: "Confirmadas" }), /* @__PURE__ */ React.createElement(Stat, { T, n: list.filter((a) => a.status === "pendiente").length, l: "Pendientes" })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 4 } }, dayLabel), list.length === 0 && /* @__PURE__ */ React.createElement(Empty, { T }, "Sin citas para este d\xEDa."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, list.map((a) => /* @__PURE__ */ React.createElement("div", { key: a.id, style: { display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, width: 52, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: T.text } }, a.time)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid " + T.line, paddingLeft: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text } }, a.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3 } }, a.proc), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement(Tag, { T, tone: a.status === "confirmada" ? "ok" : "warn" }, a.status === "confirmada" ? "Confirmada" : "Pendiente"), /* @__PURE__ */ React.createElement(Tag, { T, tone: a.paid ? "ok" : "muted" }, a.paid ? "Abonada" : "Sin abono"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), a.status === "pendiente" ? /* @__PURE__ */ React.createElement(MiniBtn, { T, onClick: () => setStatus(a.id, "confirmada"), primary: true }, "Confirmar") : /* @__PURE__ */ React.createElement(MiniBtn, { T, onClick: () => setStatus(a.id, "pendiente") }, "Reabrir")))))));
}
function HorariosTab({ T, D }) {
  const base = [
    { d: "Lunes", on: true, h: "10:00 \u2013 19:00" },
    { d: "Martes", on: true, h: "10:00 \u2013 19:00" },
    { d: "Mi\xE9rcoles", on: true, h: "10:00 \u2013 19:00" },
    { d: "Jueves", on: true, h: "10:00 \u2013 19:00" },
    { d: "Viernes", on: true, h: "10:00 \u2013 19:00" },
    { d: "S\xE1bado", on: true, h: "10:00 \u2013 14:00" },
    { d: "Domingo", on: false, h: "Cerrado" }
  ];
  const [rows, setRows] = useState(base);
  function toggle(i) {
    setRows(rows.map((r, j) => j === i ? { ...r, on: !r.on } : r));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 20px 20px" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 14, lineHeight: 1.6 } }, "Activa o pausa los d\xEDas de atenci\xF3n. Los pacientes solo ver\xE1n horas disponibles en los d\xEDas activos."), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 4, overflow: "hidden" } }, rows.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: r.d, style: { display: "flex", alignItems: "center", gap: 12, padding: "15px 16px", borderTop: i ? "1px solid " + T.lineSoft : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, color: r.on ? T.text : T.textFaint } }, r.d), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: r.on ? T.textMute : T.textFaint, marginTop: 2 } }, r.on ? r.h : "Cerrado")), /* @__PURE__ */ React.createElement(Switch, { T, on: r.on, onClick: () => toggle(i) })))));
}
function RecordatoriosTab({ T, D }) {
  const [sent, setSent] = useState({});
  const toneColor = { control: T.accent, sesion: T.gold, seguimiento: "#6A8296", vencido: "#c0285a" };
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 20px 20px" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 14, lineHeight: 1.6 } }, "Seguimiento post-tratamiento. Env\xEDa recordatorios de control, sesiones pendientes o mantenci\xF3n."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, D.reminders.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.id, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 4, padding: "16px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: toneColor[r.tone], marginTop: 6, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text } }, r.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3 } }, r.type, " \xB7 ", r.proc), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".06em", color: r.tone === "vencido" ? "#c0285a" : T.accent, marginTop: 6, textTransform: "uppercase" } }, r.due))), /* @__PURE__ */ React.createElement("button", { onClick: () => setSent({ ...sent, [r.id]: true }), disabled: sent[r.id], style: {
    width: "100%",
    marginTop: 14,
    fontFamily: T.sans,
    fontSize: 11,
    letterSpacing: ".14em",
    textTransform: "uppercase",
    padding: "12px",
    borderRadius: 3,
    cursor: sent[r.id] ? "default" : "pointer",
    background: sent[r.id] ? "transparent" : "#1F8A5B",
    color: sent[r.id] ? T.textMute : "#fff",
    border: sent[r.id] ? "1px solid " + T.line : "none",
    transition: "all .25s"
  } }, sent[r.id] ? "\u2713 Recordatorio enviado" : "Enviar por WhatsApp")))));
}
function Stat({ T, n, l }) {
  return /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 4, padding: "14px 12px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 28, color: T.text, lineHeight: 1 } }, n), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent, marginTop: 6 } }, l));
}
function Tag({ T, tone, children }) {
  const c = { ok: "#1F8A5B", warn: T.gold, muted: T.textFaint }[tone];
  return /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: c, border: "1px solid " + c, borderRadius: 999, padding: "4px 9px" } }, children);
}
function MiniBtn({ T, children, onClick, primary }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", padding: "8px 14px", borderRadius: 3, cursor: "pointer", background: primary ? T.primaryBg : "transparent", color: primary ? T.primaryText : T.textMute, border: primary ? "none" : "1px solid " + T.chipBorder } }, children);
}
function Switch({ T, on, onClick }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, style: { width: 44, height: 26, borderRadius: 999, border: "none", cursor: "pointer", background: on ? "#1F8A5B" : T.surface2, position: "relative", transition: "background .25s", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .25s " + T.ease, boxShadow: "0 1px 3px rgba(0,0,0,.3)" } }));
}
Object.assign(window, { PanelScreen, CitasTab, HorariosTab, RecordatoriosTab, Stat, Tag, MiniBtn, Switch });
