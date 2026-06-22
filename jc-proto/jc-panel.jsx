/* ═══════════ JC · PANEL DEL PROFESIONAL ═══════════ */

function PanelScreen({ T, D }) {
  const [tab, setTab] = useState("citas");
  return (
    <div>
      <div style={{ padding: "22px 20px 6px" }}>
        <Eyebrow T={T}>Panel · Juan Claudio</Eyebrow>
        <h1 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 36, letterSpacing: "-.02em", color: T.text, marginTop: 12 }}>Tu agenda</h1>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "10px 20px", position: "sticky", top: 0, background: T.navBg, backdropFilter: "blur(12px)", zIndex: 4 }}>
        {[["citas", "Citas"], ["horarios", "Horarios"], ["recordatorios", "Recordatorios"]].map(([k, l]) => (
          <Chip key={k} T={T} active={tab === k} onClick={() => setTab(k)}>{l}</Chip>
        ))}
      </div>
      {tab === "citas" && <CitasTab T={T} D={D} />}
      {tab === "horarios" && <HorariosTab T={T} D={D} />}
      {tab === "recordatorios" && <RecordatoriosTab T={T} D={D} />}
    </div>
  );
}

/* ── Citas ── */
function CitasTab({ T, D }) {
  const [day, setDay] = useState(0);
  const [appts, setAppts] = useState(D.appointments);
  const dayLabel = day === 0 ? "Hoy" : "Mañana";
  const list = appts.filter(a => a.day === day).sort((a, b) => a.time.localeCompare(b.time));
  function setStatus(id, status) { setAppts(appts.map(a => a.id === id ? { ...a, status } : a)); }

  const confirmed = list.filter(a => a.status === "confirmada").length;
  return (
    <div style={{ padding: "12px 20px 20px" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[[0, "Hoy"], [1, "Mañana"]].map(([d, l]) => (
          <button key={d} onClick={() => setDay(d)} style={{
            flex: 1, padding: "12px", borderRadius: 4, cursor: "pointer", fontFamily: T.sans, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase",
            background: day === d ? T.surface2 : T.surface, color: day === d ? T.text : T.textMute, border: "1px solid " + (day === d ? T.accent : T.line)
          }}>{l}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <Stat T={T} n={list.length} l="Citas" />
        <Stat T={T} n={confirmed} l="Confirmadas" />
        <Stat T={T} n={list.filter(a => a.status === "pendiente").length} l="Pendientes" />
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 4 }}>{dayLabel}</div>
      {list.length === 0 && <Empty T={T}>Sin citas para este día.</Empty>}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {list.map(a => (
          <div key={a.id} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid " + T.lineSoft }}>
            <div style={{ flexShrink: 0, width: 52, textAlign: "center" }}>
              <div style={{ fontFamily: T.serif, fontSize: 19, color: T.text }}>{a.time}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0, borderLeft: "1px solid " + T.line, paddingLeft: 14 }}>
              <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text }}>{a.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3 }}>{a.proc}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                <Tag T={T} tone={a.status === "confirmada" ? "ok" : "warn"}>{a.status === "confirmada" ? "Confirmada" : "Pendiente"}</Tag>
                <Tag T={T} tone={a.paid ? "ok" : "muted"}>{a.paid ? "Abonada" : "Sin abono"}</Tag>
                <div style={{ flex: 1 }} />
                {a.status === "pendiente"
                  ? <MiniBtn T={T} onClick={() => setStatus(a.id, "confirmada")} primary>Confirmar</MiniBtn>
                  : <MiniBtn T={T} onClick={() => setStatus(a.id, "pendiente")}>Reabrir</MiniBtn>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Horarios ── */
function HorariosTab({ T, D }) {
  const base = [
    { d: "Lunes", on: true, h: "10:00 – 19:00" }, { d: "Martes", on: true, h: "10:00 – 19:00" },
    { d: "Miércoles", on: true, h: "10:00 – 19:00" }, { d: "Jueves", on: true, h: "10:00 – 19:00" },
    { d: "Viernes", on: true, h: "10:00 – 19:00" }, { d: "Sábado", on: true, h: "10:00 – 14:00" }, { d: "Domingo", on: false, h: "Cerrado" }
  ];
  const [rows, setRows] = useState(base);
  function toggle(i) { setRows(rows.map((r, j) => j === i ? { ...r, on: !r.on } : r)); }
  return (
    <div style={{ padding: "12px 20px 20px" }}>
      <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 14, lineHeight: 1.6 }}>Activa o pausa los días de atención. Los pacientes solo verán horas disponibles en los días activos.</p>
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 4, overflow: "hidden" }}>
        {rows.map((r, i) => (
          <div key={r.d} style={{ display: "flex", alignItems: "center", gap: 12, padding: "15px 16px", borderTop: i ? "1px solid " + T.lineSoft : "none" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, color: r.on ? T.text : T.textFaint }}>{r.d}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: r.on ? T.textMute : T.textFaint, marginTop: 2 }}>{r.on ? r.h : "Cerrado"}</div>
            </div>
            <Switch T={T} on={r.on} onClick={() => toggle(i)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Recordatorios ── */
function RecordatoriosTab({ T, D }) {
  const [sent, setSent] = useState({});
  const toneColor = { control: T.accent, sesion: T.gold, seguimiento: "#6A8296", vencido: "#c0285a" };
  return (
    <div style={{ padding: "12px 20px 20px" }}>
      <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 14, lineHeight: 1.6 }}>Seguimiento post-tratamiento. Envía recordatorios de control, sesiones pendientes o mantención.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {D.reminders.map(r => (
          <div key={r.id} style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 4, padding: "16px 16px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: toneColor[r.tone], marginTop: 6, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.text }}>{r.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3 }}>{r.type} · {r.proc}</div>
                <div style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".06em", color: r.tone === "vencido" ? "#c0285a" : T.accent, marginTop: 6, textTransform: "uppercase" }}>{r.due}</div>
              </div>
            </div>
            <button onClick={() => setSent({ ...sent, [r.id]: true })} disabled={sent[r.id]} style={{
              width: "100%", marginTop: 14, fontFamily: T.sans, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", padding: "12px", borderRadius: 3, cursor: sent[r.id] ? "default" : "pointer",
              background: sent[r.id] ? "transparent" : "#1F8A5B", color: sent[r.id] ? T.textMute : "#fff", border: sent[r.id] ? "1px solid " + T.line : "none", transition: "all .25s"
            }}>{sent[r.id] ? "✓ Recordatorio enviado" : "Enviar por WhatsApp"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── small ── */
function Stat({ T, n, l }) {
  return <div style={{ flex: 1, background: T.surface, border: "1px solid " + T.line, borderRadius: 4, padding: "14px 12px", textAlign: "center" }}>
    <div style={{ fontFamily: T.serif, fontSize: 28, color: T.text, lineHeight: 1 }}>{n}</div>
    <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent, marginTop: 6 }}>{l}</div>
  </div>;
}
function Tag({ T, tone, children }) {
  const c = { ok: "#1F8A5B", warn: T.gold, muted: T.textFaint }[tone];
  return <span style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: c, border: "1px solid " + c, borderRadius: 999, padding: "4px 9px" }}>{children}</span>;
}
function MiniBtn({ T, children, onClick, primary }) {
  return <button onClick={onClick} style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", padding: "8px 14px", borderRadius: 3, cursor: "pointer", background: primary ? T.primaryBg : "transparent", color: primary ? T.primaryText : T.textMute, border: primary ? "none" : "1px solid " + T.chipBorder }}>{children}</button>;
}
function Switch({ T, on, onClick }) {
  return <button onClick={onClick} style={{ width: 44, height: 26, borderRadius: 999, border: "none", cursor: "pointer", background: on ? "#1F8A5B" : T.surface2, position: "relative", transition: "background .25s", flexShrink: 0 }}>
    <span style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .25s " + T.ease, boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
  </button>;
}

Object.assign(window, { PanelScreen, CitasTab, HorariosTab, RecordatoriosTab, Stat, Tag, MiniBtn, Switch });
