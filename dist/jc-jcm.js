function _db() {
  return window.DB;
}
function JcmCard({ T, children, style }) {
  return /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "16px 16px", ...style || {} } }, children);
}
function JcmLabel({ T, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 6, marginTop: 4 } }, children);
}
function JcmInput({ T, value, onChange, placeholder, type }) {
  return /* @__PURE__ */ React.createElement(
    "input",
    {
      value,
      type: type || "text",
      onChange: (e) => onChange(e.target.value),
      placeholder,
      style: { width: "100%", padding: "11px 13px", borderRadius: 6, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", marginBottom: 8 }
    }
  );
}
function JcmBtn({ T, children, onClick, ghost }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, style: { fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", padding: "11px 16px", borderRadius: 6, cursor: "pointer", background: ghost ? "transparent" : T.primaryBg, color: ghost ? T.text : T.primaryText, border: "1px solid " + (ghost ? T.chipBorder : T.primaryBg) } }, children);
}
function JcmTabsBar({ T, tabs, sel, onSel }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 } }, tabs.map((t) => /* @__PURE__ */ React.createElement("button", { key: t.k, onClick: () => onSel(t.k), style: { fontFamily: T.sans, fontSize: 11.5, letterSpacing: ".08em", textTransform: "uppercase", padding: "9px 14px", borderRadius: 999, cursor: "pointer", background: sel === t.k ? T.text : T.chipBg, color: sel === t.k ? T.bg : T.textMute, border: "1px solid " + (sel === t.k ? T.text : T.chipBorder) } }, t.l)));
}
function AppJCMView({ T }) {
  const [sub, setSub] = useState("usuarios");
  return /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: { flex: 1, overflowY: "auto", padding: "18px 20px 40px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: T.accent } }, "Gesti\xF3n de la app de usuario"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: T.serif, fontWeight: 300, fontSize: 34, letterSpacing: "-.02em", color: T.text, margin: "8px 0 18px" } }, "App JC Medical"), /* @__PURE__ */ React.createElement(JcmTabsBar, { T, sel: sub, onSel: setSub, tabs: [
    { k: "usuarios", l: "Usuarios registrados" },
    { k: "fidelidad", l: "Glow Points" },
    { k: "integraciones", l: "Integraciones" }
  ] }), sub === "usuarios" && /* @__PURE__ */ React.createElement(UsuariosApp, { T }), sub === "fidelidad" && /* @__PURE__ */ React.createElement(FidelidadApp, { T }), sub === "integraciones" && /* @__PURE__ */ React.createElement(IntegracionesApp, { T }));
}
function UsuariosApp({ T }) {
  const DB = _db();
  const [users, setUsers] = useState(() => DB.get("users") || []);
  const [reds] = useState(() => DB.get("redeems") || []);
  const [q, setQ] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [showRules, setShowRules] = useState(false);
  useEffect(() => {
    pull();
  }, []);
  function pull() {
    if (!window.JCSAAS || !window.JCSAAS.importWebAppUsers) return;
    setSyncing(true);
    window.JCSAAS.importWebAppUsers().then(() => {
      setSyncing(false);
      setUsers(DB.get("users") || []);
    }).catch(() => {
      setSyncing(false);
      setUsers(DB.get("users") || []);
    });
  }
  const ticketsByUser = {};
  reds.forEach((r) => {
    if (r.done) ticketsByUser[r.user] = (ticketsByUser[r.user] || 0) + 1;
  });
  const filtered = q.trim() ? users.filter((u) => (u.name || "").toLowerCase().includes(q.toLowerCase()) || (u.email || "").toLowerCase().includes(q.toLowerCase()) || (u.phone || "").includes(q)) : users;
  function expUsers() {
    const rows = [["Nombre", "Tel\xE9fono", "Correo", "Glow Points", "Tickets canjeados", "Registrado"], ...filtered.map((u) => [u.name || "", u.phone || "", u.email || "", u.points || 0, ticketsByUser[u.name] || 0, u.createdAt ? new Date(u.createdAt).toLocaleDateString("es-CL") : ""])];
    const csv = rows.map((r) => r.map((c) => {
      const s = String(c);
      return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }).join(";")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csv);
    a.download = "usuarios-app.csv";
    a.click();
  }
  const rulesCode = `match /tenants/{clinicId}/appusers/{doc} {
  allow create, update: if request.resource.data.keys().hasOnly(
    ['name','phone','email','points','created','createdAt']
  ) && request.resource.data.size() < 1000;
  allow read, delete: if request.auth != null;
}`;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text } }, "Usuarios registrados ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: T.textMute } }, "\xB7 ", users.length)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(JcmBtn, { T, ghost: true, onClick: pull }, syncing ? "Sincronizando\u2026" : "\u21BB Traer usuarios web"), users.length > 0 && /* @__PURE__ */ React.createElement(JcmBtn, { T, ghost: true, onClick: expUsers }, "\u2193 CSV"))), users.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2, border: "1px solid " + T.line, borderRadius: 8, padding: "12px 14px", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, marginBottom: 6 } }, "Para que los registros de la app lleguen al panel, agrega esta regla en ", /* @__PURE__ */ React.createElement("b", null, "Firestore \u2192 Reglas"), ":"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowRules((r) => !r), style: { fontFamily: T.sans, fontSize: 11.5, color: T.accent, background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline" } }, showRules ? "Ocultar regla" : "Ver regla de Firestore"), showRules && /* @__PURE__ */ React.createElement("pre", { style: { marginTop: 10, fontFamily: "monospace", fontSize: 11, color: T.text, background: T.bg, border: "1px solid " + T.line, borderRadius: 6, padding: "10px 12px", overflowX: "auto", whiteSpace: "pre-wrap" } }, rulesCode)), users.length > 0 && /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nombre, correo o tel\xE9fono\u2026", style: { width: "100%", padding: "10px 13px", borderRadius: 6, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", marginBottom: 12 } }), users.length === 0 && !syncing && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 6 } }, 'A\xFAn no hay usuarios. Agrega la regla de Firestore y luego toca "\u21BB Traer usuarios web".'), syncing && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute } }, "Buscando usuarios en la nube\u2026"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 0 } }, filtered.map((u, i) => {
    const tickets = ticketsByUser[u.name] || 0;
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, paddingTop: i === 0 ? 0 : 10, marginTop: i === 0 ? 0 : 10, borderTop: i === 0 ? "none" : "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { width: 38, height: 38, borderRadius: "50%", background: T.accent + "22", color: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontSize: 15, fontWeight: 600, flexShrink: 0 } }, (u.name || "?")[0].toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text } }, u.name || "Sin nombre"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 1 } }, u.phone && /* @__PURE__ */ React.createElement("span", null, u.phone), u.phone && u.email && /* @__PURE__ */ React.createElement("span", { style: { margin: "0 5px", opacity: 0.4 } }, "\xB7"), u.email && /* @__PURE__ */ React.createElement("span", null, u.email))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.gold || "#C4A96A" } }, (u.points || 0).toLocaleString("es-CL"), " pts"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: tickets > 0 ? "#1F8A5B" : T.textFaint, marginTop: 1 } }, tickets > 0 ? tickets + " ticket" + (tickets !== 1 ? "s" : "") + " canjeado" + (tickets !== 1 ? "s" : "") : "Sin canjes")));
  })), filtered.length === 0 && q && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 8 } }, 'No hay resultados para "', q, '".')), users.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 } }, [
    { n: users.length, l: "Cuentas creadas" },
    { n: users.reduce((s, u) => s + (u.points || 0), 0).toLocaleString("es-CL"), l: "Puntos totales" },
    { n: reds.filter((r) => r.done).length, l: "Tickets canjeados" }
  ].map(({ n, l }) => /* @__PURE__ */ React.createElement("div", { key: l, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "12px 14px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.text } }, n), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.textMute, marginTop: 3 } }, l)))));
}
function HorariosApp({ T }) {
  const D = window.JCDATA;
  const [week, setWeek] = useState(0);
  const [tick, setTick] = useState(0);
  const base = /* @__PURE__ */ new Date();
  base.setHours(0, 0, 0, 0);
  const days = [];
  for (let i = 0; i <= 13; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push(d);
  }
  const weekDays = days.slice(week * 7, week * 7 + 7);
  const [selKey, setSelKey] = useState(D.dKey(days[0]));
  const selDate = days.find((d) => D.dKey(d) === selKey) || weekDays[0];
  const wd = selDate.getDay();
  const grid = D.slotGrid(wd);
  const override = D.getDateSlots(selKey);
  const effective = override != null ? override : D.availForDate(selDate).slots;
  const isClosed = override != null && override.length === 0;
  const has = (t) => effective.indexOf(t) >= 0;
  function syncDates() {
    try {
      if (window.DB && D.loadHorariosDates) window.DB.set("horarios_dates", D.loadHorariosDates());
    } catch (e) {
    }
  }
  function toggle(t) {
    let next = override != null ? override.slice() : D.availForDate(selDate).slots.slice();
    if (next.indexOf(t) >= 0) next = next.filter((x) => x !== t);
    else {
      next.push(t);
      next.sort();
    }
    D.saveDateSlots(selKey, next);
    syncDates();
    setTick(tick + 1);
  }
  function closeDay() {
    D.saveDateSlots(selKey, []);
    syncDates();
    setTick(tick + 1);
  }
  function toggleAll() {
    const allOn = grid.every((t) => has(t));
    D.saveDateSlots(selKey, allOn ? [] : grid.slice());
    syncDates();
    setTick(tick + 1);
  }
  function resetDay() {
    D.resetDate(selKey);
    syncDates();
    setTick(tick + 1);
  }
  const cnt = (key) => {
    const ov = D.getDateSlots(key);
    if (ov != null) return ov.length;
    const dd = days.find((x) => D.dKey(x) === key);
    return dd ? D.availForDate(dd).slots.length : 0;
  };
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 4 } }, "Horarios disponibles para tus pacientes"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.55, marginBottom: 14 } }, "Activa el d\xEDa y las horas exactas en que atiendes. Lo que marques aqu\xED es lo \xFAnico que tus pacientes podr\xE1n reservar en la app. Puedes planificar las pr\xF3ximas ", /* @__PURE__ */ React.createElement("b", null, "2 semanas"), "."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 14 } }, [0, 1].map((w) => /* @__PURE__ */ React.createElement("button", { key: w, onClick: () => {
    setWeek(w);
    setSelKey(D.dKey(days[w * 7]));
  }, style: { flex: 1, fontFamily: T.sans, fontSize: 12, fontWeight: 600, letterSpacing: ".04em", padding: "11px", borderRadius: 8, cursor: "pointer", background: week === w ? T.primaryBg : T.chipBg, color: week === w ? T.primaryText : T.textMute, border: "1px solid " + (week === w ? T.primaryBg : T.chipBorder) } }, "Semana ", w + 1, " ", /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.7, fontWeight: 400 } }, "\xB7 ", days[w * 7].getDate(), " ", D.MONTHS_ES[days[w * 7].getMonth()], " \u2013 ", days[w * 7 + 6].getDate(), " ", D.MONTHS_ES[days[w * 7 + 6].getMonth()])))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginBottom: 16 } }, weekDays.map((d) => {
    const k = D.dKey(d);
    const c = cnt(k);
    const sel = k === selKey;
    const closed = D.getDateSlots(k) != null && D.getDateSlots(k).length === 0;
    return /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => setSelKey(k), style: { textAlign: "center", padding: "9px 2px", borderRadius: 8, cursor: "pointer", background: sel ? T.primaryBg : T.surface, border: "1px solid " + (sel ? T.primaryBg : T.line) } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".08em", textTransform: "uppercase", color: sel ? T.primaryText : T.textMute } }, D.DAYS_ES[d.getDay()]), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 19, color: sel ? T.primaryText : T.text, marginTop: 1 } }, d.getDate()), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, marginTop: 2, color: sel ? T.primaryText : closed ? "#C0285A" : c ? "#1F8A5B" : T.textFaint } }, closed ? "cerrado" : c ? c + "h" : "\u2014"));
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: T.text } }, D.DAYS_ES[wd], " ", selDate.getDate(), " de ", D.MONTHS_ES[selDate.getMonth()], " ", isClosed ? "\xB7 cerrado" : "\xB7 " + effective.length + " horas"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: toggleAll, style: miniBtn(T) }, grid.every((t) => has(t)) ? "Ninguna" : "Todas"), /* @__PURE__ */ React.createElement("button", { onClick: closeDay, style: miniBtn(T) }, "Cerrar d\xEDa"), /* @__PURE__ */ React.createElement("button", { onClick: resetDay, style: miniBtn(T) }, "Reiniciar"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7 } }, grid.map((t) => {
    const on = has(t);
    return /* @__PURE__ */ React.createElement("button", { key: t, onClick: () => toggle(t), style: { fontFamily: T.sans, fontSize: 12.5, padding: "10px 4px", borderRadius: 7, cursor: "pointer", background: on ? T.accent : T.surface, color: on ? T.onAccent || "#fff" : T.textMute, border: "1px solid " + (on ? T.accent : T.line) } }, t);
  })), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 12, lineHeight: 1.5 } }, "Toca una hora para activarla o desactivarla. Los cambios se reflejan al instante en la app de tus pacientes. Cada cl\xEDnica gestiona su propia disponibilidad.")));
}
function miniBtn(T) {
  return { fontFamily: T.sans, fontSize: 10.5, padding: "7px 10px", borderRadius: 6, cursor: "pointer", background: T.chipBg, color: T.textMute, border: "1px solid " + T.chipBorder };
}
function ContenidoApp({ T }) {
  const DB = _db();
  const [arts, setArts] = useState(() => DB.get("articles") || []);
  const [vids, setVids] = useState(() => DB.get("videos") || []);
  const [na, setNa] = useState({ tag: "", h: "", sub: "", link: "", img: "", cat: "Novedades" });
  const [nv, setNv] = useState({ title: "", url: "", sub: "", likes: "", views: "" });
  function saveArts(list) {
    setArts(list);
    DB.set("articles", list);
  }
  function saveVids(list) {
    setVids(list);
    DB.set("videos", list);
  }
  function addArt() {
    if (!na.h.trim()) return;
    saveArts([{ ...na, eyb: na.tag, meta: "Nuevo" }, ...arts]);
    setNa({ tag: "", h: "", sub: "", link: "", img: "", cat: "Novedades" });
  }
  function addVid() {
    if (!nv.url.trim()) return;
    saveVids([{ title: nv.title || "Video", url: nv.url, sub: nv.sub, src: "JC Medical", likes: parseInt(nv.likes) || 0, views: parseInt(nv.views) || 0 }, ...vids]);
    setNv({ title: "", url: "", sub: "", likes: "", views: "" });
  }
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 10 } }, "Art\xEDculos del feed"), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Etiqueta"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: na.tag, onChange: (v) => setNa({ ...na, tag: v }), placeholder: "Ej: Tendencias" }), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "T\xEDtulo"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: na.h, onChange: (v) => setNa({ ...na, h: v }), placeholder: "T\xEDtulo del art\xEDculo" }), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Bajada"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: na.sub, onChange: (v) => setNa({ ...na, sub: v }), placeholder: "Resumen breve" }), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Enlace (URL fuente)"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: na.link, onChange: (v) => setNa({ ...na, link: v }), placeholder: "https://\u2026" }), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Imagen (URL)"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: na.img, onChange: (v) => setNa({ ...na, img: v }), placeholder: "https://\u2026jpg" }), /* @__PURE__ */ React.createElement(JcmBtn, { T, onClick: addArt }, "+ Agregar art\xEDculo"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, display: "flex", flexDirection: "column", gap: 8 } }, arts.map((a, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, paddingTop: 8, borderTop: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.h), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, a.tag || a.cat)), /* @__PURE__ */ React.createElement("button", { onClick: () => saveArts(arts.filter((_, j) => j !== i)), style: { color: "#C0285A", background: "none", border: "1px solid " + T.chipBorder, borderRadius: 6, padding: "5px 9px", fontSize: 11, cursor: "pointer" } }, "Eliminar"))))), /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 10 } }, "Videos (YouTube)"), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "URL de YouTube"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: nv.url, onChange: (v) => setNv({ ...nv, url: v }), placeholder: "https://youtube.com/\u2026" }), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "T\xEDtulo"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: nv.title, onChange: (v) => setNv({ ...nv, title: v }), placeholder: "T\xEDtulo del video" }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Me gusta"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: nv.likes, onChange: (v) => setNv({ ...nv, likes: v }), placeholder: "12000", type: "number" })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Reproducciones"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: nv.views, onChange: (v) => setNv({ ...nv, views: v }), placeholder: "250000", type: "number" }))), /* @__PURE__ */ React.createElement(JcmBtn, { T, onClick: addVid }, "+ Agregar video"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 8, lineHeight: 1.5 } }, "La app solo muestra videos con m\xE1s de 10.000 me gusta y 10.000 reproducciones. Con API key de YouTube, las cifras se actualizan solas."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, display: "flex", flexDirection: "column", gap: 8 } }, vids.map((v, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, paddingTop: 8, borderTop: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, v.title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, v.likes || 0, " me gusta \xB7 ", v.views || 0, " reproducciones")), /* @__PURE__ */ React.createElement("button", { onClick: () => saveVids(vids.filter((_, j) => j !== i)), style: { color: "#C0285A", background: "none", border: "1px solid " + T.chipBorder, borderRadius: 6, padding: "5px 9px", fontSize: 11, cursor: "pointer" } }, "Eliminar"))))));
}
function FidelidadApp({ T }) {
  const DB = _db();
  const cfg = DB.cfg();
  const [start, setStart] = useState(cfg.pts_start);
  const [reward, setReward] = useState(cfg.reward_cost);
  const [cap, setCap] = useState(cfg.pts_daily_cap);
  const [users] = useState(() => DB.get("users") || []);
  const [reds, setReds] = useState(() => DB.get("redeems") || []);
  const [note, setNote] = useState("");
  function save() {
    DB.set("config", Object.assign({}, DB.cfg(), { pts_start: parseInt(start) || 500, reward_cost: parseInt(reward) || 6e4, pts_daily_cap: parseInt(cap) || 2e3 }));
    setNote("Configuraci\xF3n guardada \u2713");
    setTimeout(() => setNote(""), 2e3);
  }
  function markDone(id) {
    const list = reds.map((r) => r.id === id ? { ...r, done: true } : r);
    setReds(list);
    DB.set("redeems", list);
  }
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 10 } }, "Glow Points \xB7 configuraci\xF3n"), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Puntos de regalo al registrarse"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: start, onChange: setStart, type: "number" }), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Costo de canje por sesi\xF3n (pts)"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: reward, onChange: setReward, type: "number" }), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Tope diario por juegos (pts)"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: cap, onChange: setCap, type: "number" }), /* @__PURE__ */ React.createElement(JcmBtn, { T, onClick: save }, "Guardar configuraci\xF3n"), note && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 12, color: "#1F8A5B", fontSize: 12 } }, note)), /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 4 } }, "Usuarios registrados ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: T.textMute } }, "\xB7 ", users.length)), users.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 6 } }, "A\xFAn no hay usuarios registrados en la app."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 } }, users.map((u, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, paddingTop: 8, borderTop: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, u.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, u.email)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, color: T.gold } }, (u.points || 0).toLocaleString("es-CL"), " pts"))))), /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 4 } }, "Canjes"), reds.length === 0 && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 6 } }, "No hay canjes solicitados."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 } }, reds.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.id, style: { display: "flex", alignItems: "center", gap: 10, paddingTop: 8, borderTop: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, r.user, " \xB7 ", (r.cost || 0).toLocaleString("es-CL"), " pts"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, r.done ? "Entregado" : "Pendiente")), !r.done && /* @__PURE__ */ React.createElement("button", { onClick: () => markDone(r.id), style: { background: T.primaryBg, color: T.primaryText, border: "none", borderRadius: 6, padding: "7px 12px", fontSize: 11, cursor: "pointer" } }, "Marcar entregado"))))));
}
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
    if (fbClean) {
      try {
        JSON.parse(fbClean);
      } catch (e) {
        setNote("\u26A0\uFE0F La config de Firebase no es un JSON v\xE1lido");
        setTimeout(() => setNote(""), 3500);
        return;
      }
    }
    DB.set("config", Object.assign({}, DB.cfg(), { yt_api_key: yt.trim(), pay_link: pay.trim(), wa_number: wa.replace(/\D/g, ""), firebase_config: fbClean }));
    DB.del("yt_stats");
    setNote("Guardado \u2713 \u2014 recarga para conectar la nube");
    setTimeout(() => setNote(""), 3500);
  }
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 6 } }, "YouTube Data API"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 10, lineHeight: 1.5 } }, "Estad\xEDsticas reales (views/likes) de los videos. Crea una key gratis en Google Cloud \u2192 \xABYouTube Data API v3\xBB."), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "API key"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: yt, onChange: setYt, placeholder: "AIza\u2026 (vac\xEDo = cifras curadas)" })), /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text } }, "Base de datos en la nube"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".06em", padding: "4px 9px", borderRadius: 999, color: cloudOn ? "#1F8A5B" : T.textMute, border: "1px solid " + (cloudOn ? "#1F8A5B" : T.chipBorder) } }, cloudOn ? "\u25CF Conectada" : "\u25CB Local (sin sincronizar)")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 10, lineHeight: 1.5 } }, "Comparte reservas, usuarios, Glow Points y r\xE9cords entre todos los dispositivos. Pega tu configuraci\xF3n web de Firebase (Firestore). Vac\xEDo = solo este dispositivo."), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Firebase config (JSON)"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: fbc,
      onChange: (e) => setFbc(e.target.value),
      placeholder: '{ "apiKey": "...", "authDomain": "...", "projectId": "...", "appId": "..." }',
      rows: 5,
      style: { width: "100%", padding: "11px 13px", borderRadius: 6, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: "monospace", fontSize: 12, outline: "none", marginBottom: 8, resize: "vertical" }
    }
  )), /* @__PURE__ */ React.createElement(JcmCard, { T }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 20, color: T.text, marginBottom: 6 } }, "Pago \xB7 Banco de Chile"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 10, lineHeight: 1.5 } }, "Link general de compra con notificaci\xF3n autom\xE1tica (el del banco). El agendamiento ya usa los links por servicio."), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "Link de pago (general)"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: pay, onChange: setPay, placeholder: "https://micrositios.banchilepagos.cl/\u2026" }), /* @__PURE__ */ React.createElement(JcmLabel, { T }, "WhatsApp (sin +)"), /* @__PURE__ */ React.createElement(JcmInput, { T, value: wa, onChange: setWa, placeholder: "56997880877" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(JcmBtn, { T, onClick: save }, "Guardar integraciones"), note && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 12, color: "#1F8A5B", fontSize: 12 } }, note)));
}
Object.assign(window, { AppJCMView, UsuariosApp, HorariosApp, ContenidoApp, FidelidadApp, IntegracionesApp });
