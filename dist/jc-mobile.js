const HALF_HOURS = (() => {
  const s = [];
  for (let h = 8; h < 20; h++) {
    s.push((h < 10 ? "0" : "") + h + ":00");
    s.push((h < 10 ? "0" : "") + h + ":30");
  }
  return s;
})();
const WDS = ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"];
const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
function minsM(t) {
  if (!t) return 0;
  const [h, m] = t.split(":");
  return parseInt(h) * 60 + parseInt(m || 0);
}
function todayISO() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function offToISO(off) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + off);
  return d.toISOString().slice(0, 10);
}
function isoToDayOff(iso) {
  const d = /* @__PURE__ */ new Date(iso + "T00:00:00"), t = /* @__PURE__ */ new Date();
  t.setHours(0, 0, 0, 0);
  return Math.round((d - t) / 864e5);
}
function procList() {
  try {
    return window.JCDATA.catalog.reduce((a, s) => {
      s.groups.forEach((g) => g.items.forEach((it) => a.push(it.n)));
      return a;
    }, []);
  } catch (e) {
    return [];
  }
}
function LoginScreen({ T, onAuth }) {
  const setup = !window.jcmAdminHasPass || !window.jcmAdminHasPass();
  const [user, setUser] = useState(setup ? "admin" : "");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit() {
    if (!pass.trim()) return;
    setBusy(true);
    setErr("");
    try {
      const storedUser = window.jcmAdminUser && window.jcmAdminUser() || user || "admin";
      const r = setup ? await window.jcmAdminSetPass(pass, user || "admin") : await window.jcmAdminCheck(storedUser, pass);
      if (!r.ok) {
        setErr(r.msg);
        setBusy(false);
        return;
      }
      window.jcmAdminStartSession && window.jcmAdminStartSession();
      onAuth();
    } catch (e) {
      setErr("Error de conexi\xF3n");
      setBusy(false);
    }
  }
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 16, padding: "14px 16px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" };
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 24px", background: T.bg } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 32, fontWeight: 300, color: T.text, marginBottom: 6 } }, "JC Medical"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.textMute, marginBottom: 44 } }, "Panel m\xF3vil \xB7 Acceso privado"), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 12 } }, setup && /* @__PURE__ */ React.createElement("input", { placeholder: "Usuario", value: user, onChange: (e) => setUser(e.target.value), style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: "Contrase\xF1a del panel", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => e.key === "Enter" && submit(), style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#C0285A", textAlign: "center" } }, err), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: submit,
      disabled: busy,
      style: { background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", border: "none", borderRadius: 6, padding: "16px", cursor: "pointer", opacity: busy ? 0.6 : 1, marginTop: 4 }
    },
    busy ? "\u2026" : setup ? "Crear acceso" : "Entrar"
  )));
}
function MobileShell({ T, D, onLogout }) {
  const [tab, setTab] = useState("citas");
  const [appts, setAppts] = useState(() => window.DB && window.DB.get("appointments") || []);
  function saveAppts(updated) {
    window.DB && window.DB.set("appointments", updated);
    setAppts(updated);
  }
  function confirmPago(id) {
    const all = window.DB && window.DB.get("appointments") || [];
    const a = all.find((x) => x.id === id);
    if (a && a.fecha && a.time) {
      try {
        const map = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
        const cur = Array.isArray(map[a.fecha]) ? map[a.fecha] : [];
        map[a.fecha] = cur.filter((s) => s !== a.time);
        localStorage.setItem("jcm_horarios_dates", JSON.stringify(map));
      } catch (e) {
      }
    }
    saveAppts(all.map((x) => x.id === id ? { ...x, status: "confirmada" } : x));
  }
  function cancelAppt(id) {
    const all = window.DB && window.DB.get("appointments") || [];
    const a = all.find((x) => x.id === id);
    if (a && a.fecha && a.time) {
      try {
        const map = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
        const cur = Array.isArray(map[a.fecha]) ? map[a.fecha] : [];
        if (!cur.includes(a.time)) {
          cur.push(a.time);
          cur.sort();
          map[a.fecha] = cur;
        }
        localStorage.setItem("jcm_horarios_dates", JSON.stringify(map));
      } catch (e) {
      }
    }
    saveAppts(all.filter((x) => x.id !== id));
  }
  function addAppt(appt) {
    const all = window.DB && window.DB.get("appointments") || [];
    if (appt.fecha && appt.time) {
      try {
        const map = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
        const cur = Array.isArray(map[appt.fecha]) ? map[appt.fecha] : HALF_HOURS.slice();
        map[appt.fecha] = cur.filter((s) => s !== appt.time);
        localStorage.setItem("jcm_horarios_dates", JSON.stringify(map));
      } catch (e) {
      }
    }
    saveAppts([...all, appt]);
  }
  const pendPago = appts.filter((a) => a.status === "pendiente_pago");
  const tabs = [
    { id: "citas", lbl: "Citas", icon: /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M16 2v4M8 2v4M3 10h18" })) },
    { id: "horarios", lbl: "Horarios", icon: /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 6v6l4 2" })) },
    { id: "nueva", lbl: "Nueva", icon: /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })) }
  ];
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100dvh", background: T.bg, display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 18px 12px", borderBottom: "1px solid " + T.line, display: "flex", justifyContent: "space-between", alignItems: "center", background: T.navBg, backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 20, fontWeight: 300, color: T.text } }, "JC Medical"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, display: "block" } }, "Panel m\xF3vil")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, pendPago.length > 0 && /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("citas"), style: { background: "#B8860B", color: "#fff", fontFamily: T.sans, fontSize: 11, fontWeight: 600, border: "none", borderRadius: 999, padding: "5px 12px", cursor: "pointer" } }, pendPago.length, " pendiente", pendPago.length > 1 ? "s" : ""), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onLogout,
      title: "Cerrar sesi\xF3n",
      "aria-label": "Cerrar sesi\xF3n",
      style: { display: "inline-flex", alignItems: "center", gap: 6, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 10.5, fontWeight: 500, letterSpacing: ".06em", border: "1px solid " + T.line, borderRadius: 999, padding: "7px 12px", minHeight: 36, cursor: "pointer" }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ React.createElement("path", { d: "M16 17l5-5-5-5M21 12H9" })),
    "Salir"
  ))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto" } }, tab === "citas" && /* @__PURE__ */ React.createElement(CitasTab, { T, D, appts, confirmPago, cancelAppt }), tab === "horarios" && /* @__PURE__ */ React.createElement(HorariosTab, { T, appts }), tab === "nueva" && /* @__PURE__ */ React.createElement(NuevaTab, { T, D, appts, addAppt: (a) => {
    addAppt(a);
    setTab("citas");
  } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", borderTop: "1px solid " + T.line, background: T.navBg, backdropFilter: "blur(12px)", paddingBottom: "env(safe-area-inset-bottom,8px)", position: "sticky", bottom: 0 } }, tabs.map(({ id, lbl, icon }) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: id,
      onClick: () => setTab(id),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: "11px 4px 9px",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: tab === id ? T.accent : T.textFaint,
        fontFamily: T.sans,
        fontSize: 9,
        letterSpacing: ".07em",
        textTransform: "uppercase"
      }
    },
    icon,
    lbl
  ))));
}
function CitasTab({ T, D, appts, confirmPago, cancelAppt }) {
  const today = todayISO();
  const upcoming = appts.filter((a) => {
    const f = a.fecha || offToISO(a.day || 0);
    return f >= today;
  }).sort((a, b) => {
    const fa = a.fecha || offToISO(a.day || 0), fb = b.fecha || offToISO(b.day || 0);
    return fa < fb ? -1 : fa > fb ? 1 : minsM(a.time) - minsM(b.time);
  });
  if (!upcoming.length) return /* @__PURE__ */ React.createElement("div", { style: { padding: "60px 24px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.textMute, marginBottom: 10 } }, "Sin citas pr\xF3ximas"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textFaint } }, 'Usa "Nueva" para agregar una cita desde el panel'));
  const pendPago = upcoming.filter((a) => a.status === "pendiente_pago");
  const byDate = {};
  upcoming.forEach((a) => {
    const k = a.fecha || offToISO(a.day || 0);
    if (!byDate[k]) byDate[k] = [];
    byDate[k].push(a);
  });
  return /* @__PURE__ */ React.createElement("div", { style: { paddingBottom: 24 } }, pendPago.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { margin: "14px 14px 6px", background: "#B8860B18", border: "1px solid #B8860B44", borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "#B8860B", marginBottom: 4 } }, "\u23F3 ", pendPago.length, " transferencia", pendPago.length > 1 ? "s" : "", " por confirmar"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Revisa el comprobante y toca la cita para confirmar")), Object.entries(byDate).map(([fecha, dayAppts]) => {
    const dt = /* @__PURE__ */ new Date(fecha + "T00:00:00");
    const isToday = fecha === today;
    const label = isToday ? "Hoy" : WDS[dt.getDay()] + " " + dt.getDate() + " " + MESES[dt.getMonth()];
    return /* @__PURE__ */ React.createElement("div", { key: fecha, style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "0 16px 6px", fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: isToday ? T.accent : T.textMute } }, label), dayAppts.map((a) => /* @__PURE__ */ React.createElement(ApptCard, { key: a.id, T, D, appt: a, confirmPago, cancelAppt })));
  }));
}
function ApptCard({ T, D, appt: a, confirmPago, cancelAppt }) {
  const isPend = a.status === "pendiente_pago";
  const [open, setOpen] = useState(isPend);
  const [confirmDel, setConfirmDel] = useState(false);
  const ac = a.attended ? "#1F8A5B" : isPend ? "#B8860B" : T.accent;
  const rawPhone = (a.phone || "").replace(/\D/g, "");
  const waPhone = rawPhone.length >= 8 ? rawPhone : "";
  return /* @__PURE__ */ React.createElement("div", { style: { margin: "0 12px 8px", borderRadius: 10, border: "1px solid " + (isPend ? "#B8860B44" : T.line), background: T.surface, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen((v) => !v), style: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: ac, flexShrink: 0 }, "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 15, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, a.name)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 2 } }, a.time, " \xB7 ", a.proc || "\u2014", " \xB7 ", a.dur || "60 min")), /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".09em", textTransform: "uppercase", color: ac, border: "1px solid " + ac + "66", borderRadius: 999, padding: "3px 8px" } }, isPend ? "\u23F3 Transferencia" : a.attended ? "Atendida" : a.status || "pendiente"))), open && /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid " + T.lineSoft, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 9 } }, isPend && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => confirmPago(a.id),
      style: { width: "100%", background: "#1F8A5B", color: "#fff", fontFamily: T.sans, fontSize: 12.5, letterSpacing: ".1em", textTransform: "uppercase", border: "none", borderRadius: 8, padding: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2.5" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" })),
    "Confirmar transferencia"
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, waPhone && /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://wa.me/56" + waPhone.replace(/^(56|0)/, "") + "?text=" + encodeURIComponent("Hola " + a.name + ", confirmamos tu cita en JC Medical:\n\u{1F4C5} " + (a.fecha || "") + " \xB7 " + a.time + " hrs\n\u{1F4CD} Direcci\xF3n 1 poniente 1258, edificio plaza poniente, oficina 101. A media cuadra de la plaza de armas de Talca.\n\u{1F489} " + (a.proc || "") + " (" + (a.dur || (window.JCDATA && window.JCDATA.procMin && window.JCDATA.procMin(a.proc) + " min" || "30 min")) + ")\n\u23F0 La espera m\xE1xima para su atenci\xF3n es de 15 minutos, para no retrasar las atenciones siguientes"),
      target: "_blank",
      rel: "noopener",
      style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#1F8A5B22", border: "1px solid #1F8A5B55", borderRadius: 8, padding: "12px", textDecoration: "none", color: "#1F8A5B", fontFamily: T.sans, fontSize: 12, fontWeight: 500 }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "#1F8A5B" }, /* @__PURE__ */ React.createElement("path", { d: "M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" })),
    "WhatsApp"
  ), confirmDel ? /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setConfirmDel(false), style: { flex: 1, background: "transparent", border: "1px solid " + T.line, borderRadius: 8, padding: "12px", cursor: "pointer", fontFamily: T.sans, fontSize: 11, color: T.textMute } }, "Volver"), /* @__PURE__ */ React.createElement("button", { onClick: () => cancelAppt(a.id), style: { flex: 1, background: "#C0285A", border: "none", borderRadius: 8, padding: "12px", cursor: "pointer", fontFamily: T.sans, fontSize: 11, color: "#fff" } }, "S\xED, anular")) : /* @__PURE__ */ React.createElement("button", { onClick: () => setConfirmDel(true), style: { flex: 1, background: "transparent", border: "1px solid #C0285A44", borderRadius: 8, padding: "12px", cursor: "pointer", color: "#C0285A", fontFamily: T.sans, fontSize: 12, fontWeight: 500 } }, "Anular cita"))));
}
function HorariosTab({ T, appts }) {
  const [selOff, setSelOff] = useState(0);
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + i);
    return { off: i, iso: d.toISOString().slice(0, 10), wd: WDS[d.getDay()], dd: d.getDate() };
  });
  const selDay = days[selOff];
  const [slotsMap, setSlotsMap] = useState(() => JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}"));
  const avail = slotsMap[selDay.iso] != null ? slotsMap[selDay.iso] : HALF_HOURS.slice();
  const occupied = new Set(appts.filter((a) => a.fecha === selDay.iso || a.day === selOff).map((a) => a.time).filter(Boolean));
  function saveMap(map) {
    localStorage.setItem("jcm_horarios_dates", JSON.stringify(map));
    setSlotsMap({ ...map });
  }
  function toggle(slot) {
    if (occupied.has(slot)) return;
    const map = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
    const cur = map[selDay.iso] != null ? [...map[selDay.iso]] : HALF_HOURS.slice();
    map[selDay.iso] = cur.includes(slot) ? cur.filter((s) => s !== slot) : [...cur, slot].sort();
    saveMap(map);
  }
  function blockAll() {
    const m = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
    m[selDay.iso] = [];
    saveMap(m);
  }
  function openAll() {
    const m = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
    delete m[selDay.iso];
    saveMap(m);
  }
  const availCount = avail.filter((s) => !occupied.has(s)).length;
  const blockedCount = HALF_HOURS.filter((s) => !avail.includes(s) && !occupied.has(s)).length;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto", borderBottom: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: "12px 14px", minWidth: "max-content" } }, days.map((d, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: i,
      onClick: () => setSelOff(i),
      style: { display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 10px", borderRadius: 8, minWidth: 50, background: selOff === i ? T.accent : T.surface, border: "1px solid " + (selOff === i ? T.accent : T.line), cursor: "pointer" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".06em", textTransform: "uppercase", color: selOff === i ? T.onAccent : T.textMute } }, i === 0 ? "Hoy" : d.wd),
    /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 20, color: selOff === i ? T.onAccent : T.text, marginTop: 2 } }, d.dd)
  )))), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontFamily: T.sans, fontSize: 11, color: T.textMute } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#1F8A5B", fontWeight: 600 } }, availCount), " disponibles \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, blockedCount), " bloqueadas \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: "#B8860B", fontWeight: 600 } }, occupied.size), " con cita"), /* @__PURE__ */ React.createElement("button", { onClick: openAll, style: { background: "#1F8A5B18", border: "1px solid #1F8A5B44", color: "#1F8A5B", borderRadius: 6, padding: "8px 12px", fontFamily: T.sans, fontSize: 10.5, cursor: "pointer" } }, "Abrir todo"), /* @__PURE__ */ React.createElement("button", { onClick: blockAll, style: { background: "#C0285A18", border: "1px solid #C0285A44", color: "#C0285A", borderRadius: 6, padding: "8px 12px", fontFamily: T.sans, fontSize: 10.5, cursor: "pointer" } }, "Bloquear todo")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, padding: "10px 14px 6px" } }, [["#1F8A5B", "Disponible"], ["#C0285A", "Bloqueado"], ["#B8860B", "Con cita"]].map(([c, l]) => /* @__PURE__ */ React.createElement("div", { key: l, style: { display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 9, height: 9, borderRadius: 3, background: c } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute } }, l)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7, padding: "6px 12px 30px" } }, HALF_HOURS.map((slot) => {
    const isOcc = occupied.has(slot);
    const isAvail = avail.includes(slot);
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: slot,
        onClick: () => toggle(slot),
        disabled: isOcc,
        style: {
          padding: "11px 4px",
          borderRadius: 8,
          border: "1px solid",
          fontFamily: T.sans,
          fontSize: 12.5,
          fontWeight: 500,
          cursor: isOcc ? "default" : "pointer",
          background: isOcc ? "#B8860B18" : isAvail ? "#1F8A5B15" : T.surface,
          borderColor: isOcc ? "#B8860B55" : isAvail ? "#1F8A5B55" : T.lineSoft,
          color: isOcc ? "#B8860B" : isAvail ? "#1F8A5B" : T.textFaint
        }
      },
      slot,
      isOcc && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8, marginTop: 1, opacity: 0.7 } }, "cita")
    );
  })));
}
function NuevaTab({ T, D, appts, addAppt }) {
  const procs = procList();
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState(todayISO());
  const [time, setTime] = useState("10:00");
  const [dur, setDur] = useState("30 minutos");
  const [proc, setProc] = useState(procs[0] || "Evaluaci\xF3n general");
  const [saved, setSaved] = useState(false);
  const slotsMap = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
  const avail = slotsMap[fecha] != null ? slotsMap[fecha] : HALF_HOURS.slice();
  const occupied = new Set(appts.filter((a) => a.fecha === fecha).map((a) => a.time));
  const freeSlots = avail.filter((s) => !occupied.has(s));
  const valid = name.trim() && phone.trim();
  function save() {
    if (!valid) return;
    addAppt({ id: Date.now().toString(36), name: name.trim(), rut: rut.trim(), phone: phone.trim(), email: email.trim(), proc, dur, time, fecha, day: isoToDayOff(fecha), status: "confirmada", source: "movil", createdAt: (/* @__PURE__ */ new Date()).toISOString() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
    setName("");
    setRut("");
    setPhone("");
    setEmail("");
    setTime(freeSlots[0] || "10:00");
  }
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 15, padding: "13px 15px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" };
  const lbl = { display: "block", fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 };
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 50px", display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, fontWeight: 300, color: T.text } }, "Nueva cita"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Paciente"), /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Nombre completo", style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "RUT"), /* @__PURE__ */ React.createElement("input", { value: rut, onChange: (e) => setRut(e.target.value), placeholder: "12.345.678-9", style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Tel\xE9fono"), /* @__PURE__ */ React.createElement("input", { type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+56 9 \xB7\xB7\xB7", style: { ...inp, borderColor: phone.trim() ? T.line : "#C0285A55" } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Correo (opcional)"), /* @__PURE__ */ React.createElement("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "correo@ejemplo.com", style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Procedimiento"), /* @__PURE__ */ React.createElement("select", { value: proc, onChange: (e) => setProc(e.target.value), style: { ...inp, appearance: "none" } }, /* @__PURE__ */ React.createElement("option", null, "Evaluaci\xF3n general"), procs.map((p) => /* @__PURE__ */ React.createElement("option", { key: p, value: p }, p)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Fecha"), /* @__PURE__ */ React.createElement("input", { type: "date", value: fecha, onChange: (e) => setFecha(e.target.value), style: inp })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Hora"), /* @__PURE__ */ React.createElement("input", { type: "time", value: time, step: "1800", list: "jcm-mob-times", onChange: (e) => setTime(e.target.value), style: inp }), /* @__PURE__ */ React.createElement("datalist", { id: "jcm-mob-times" }, freeSlots.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }))), freeSlots.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#C0285A", marginTop: 5 } }, "Sin horas disponibles \u2014 puedes escribir una hora manualmente")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: lbl }, "Duraci\xF3n"), /* @__PURE__ */ React.createElement("select", { value: dur, onChange: (e) => setDur(e.target.value), style: { ...inp, appearance: "none" } }, ["15 minutos", "30 minutos", "45 minutos", "60 minutos", "90 minutos"].map((d) => /* @__PURE__ */ React.createElement("option", { key: d }, d)))), !valid && (name.trim() && !phone.trim()) && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", marginTop: -4 } }, "El tel\xE9fono es obligatorio."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: save,
      disabled: !valid,
      style: { background: saved ? "#1F8A5B" : T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", border: "none", borderRadius: 8, padding: "17px", cursor: valid ? "pointer" : "not-allowed", opacity: valid ? 1 : 0.5, marginTop: 4, transition: "background .3s" }
    },
    saved ? "\u2713 Cita guardada" : "Confirmar cita"
  ));
}
function MobileAdmin() {
  const TK = window.JCTHEME;
  const T = TK && (TK.marfil || TK.cielo || TK.editorial) || {
    bg: "#F5F2EC",
    surface: "#fff",
    text: "#1A1A14",
    textMute: "#5C5A50",
    textFaint: "#8A8674",
    line: "rgba(20,20,15,.12)",
    lineSoft: "rgba(20,20,15,.08)",
    accent: "#54707F",
    onAccent: "#fff",
    sans: "'Jost',sans-serif",
    serif: "'Marcellus',serif",
    navBg: "rgba(245,242,236,.96)"
  };
  const D = window.JCDATA;
  const authed0 = !!(window.jcmAdminHasPass && window.jcmAdminHasPass() && window.jcmAdminHasSession && window.jcmAdminHasSession());
  const [authed, setAuthed] = useState(authed0);
  if (!authed) return /* @__PURE__ */ React.createElement(LoginScreen, { T, onAuth: () => setAuthed(true) });
  return /* @__PURE__ */ React.createElement(MobileShell, { T, D, onLogout: () => {
    try {
      window.jcmAdminEndSession && window.jcmAdminEndSession();
    } catch (e) {
    }
    setAuthed(false);
  } });
}
function MobileSaasGate() {
  const TK = window.JCTHEME;
  const T = TK && (TK.marfil || TK.cielo || TK.editorial) || {
    bg: "#F5F2EC",
    surface: "#fff",
    text: "#1A1A14",
    textMute: "#5C5A50",
    textFaint: "#8A8674",
    line: "rgba(20,20,15,.12)",
    lineSoft: "rgba(20,20,15,.08)",
    accent: "#54707F",
    onAccent: "#fff",
    sans: "'Jost',sans-serif",
    serif: "'Marcellus',serif",
    navBg: "rgba(245,242,236,.96)"
  };
  const D = window.JCDATA;
  const [phase, setPhase] = useState("loading");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    window.JCSAAS.onAuth((p) => {
      if (!p || p.incomplete) {
        setPhase("login");
        return;
      }
      const a = window.JCSAAS.access();
      setPhase(a.ok ? "app" : "blocked");
    });
    const t = setTimeout(() => setPhase((x) => x === "loading" ? "login" : x), 9e3);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!busy) return;
    const t = setTimeout(() => {
      setBusy(false);
      setErr("La conexi\xF3n est\xE1 tardando demasiado. Revisa tu internet e int\xE9ntalo de nuevo.");
    }, 13e3);
    return () => clearTimeout(t);
  }, [busy]);
  async function doLogin() {
    if (!email.trim() || !pass) return;
    setErr("");
    setBusy(true);
    try {
      await window.JCSAAS.login(email, pass);
    } catch (e) {
      setErr("Correo o contrase\xF1a incorrectos.");
      setBusy(false);
    }
  }
  if (phase === "app") return /* @__PURE__ */ React.createElement(MobileShell, { T, D, onLogout: () => window.JCSAAS.logout() });
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 16, padding: "14px 16px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" };
  const center = (kids) => /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 24px", background: T.bg } }, kids);
  if (phase === "loading") return center(/* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute } }, "Conectando\u2026"));
  if (phase === "blocked") return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, color: T.text, marginBottom: 8 } }, "Plan inactivo"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.textMute, textAlign: "center", maxWidth: 300, marginBottom: 18 } }, "El acceso de tu cl\xEDnica no est\xE1 activo. Escr\xEDbenos para reactivarlo."), /* @__PURE__ */ React.createElement("button", { onClick: () => window.JCSAAS.logout(), style: { background: "none", border: "1px solid " + T.line, color: T.text, fontFamily: T.sans, fontSize: 12, borderRadius: 6, padding: "12px 18px", cursor: "pointer" } }, "Cerrar sesi\xF3n")));
  return center(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 32, fontWeight: 300, color: T.text, marginBottom: 6 } }, "Confirmar citas"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.textMute, marginBottom: 44 } }, "Panel m\xF3vil \xB7 Acceso de tu cl\xEDnica"), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("input", { placeholder: "Correo de tu cl\xEDnica", inputMode: "email", "data-nocap": "", value: email, onChange: (e) => setEmail(e.target.value), style: inp }), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: "Contrase\xF1a", value: pass, onChange: (e) => setPass(e.target.value), onKeyDown: (e) => e.key === "Enter" && doLogin(), style: inp }), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#C0285A", textAlign: "center" } }, err), /* @__PURE__ */ React.createElement("button", { onClick: doLogin, disabled: busy, style: { background: T.accent, color: T.onAccent, fontFamily: T.sans, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", border: "none", borderRadius: 6, padding: "16px", cursor: "pointer", opacity: busy ? 0.6 : 1, marginTop: 4 } }, busy ? "\u2026" : "Entrar"))));
}
ReactDOM.createRoot(document.getElementById("root")).render(
  window.JCSAAS && window.JCSAAS.enabled ? /* @__PURE__ */ React.createElement(MobileSaasGate, null) : /* @__PURE__ */ React.createElement(MobileAdmin, null)
);
