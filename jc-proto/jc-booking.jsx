/* ═══════════ JC · FLUJO DE AGENDA (multi-paso) ═══════════ */

function allProcs(D) {
  const out = [{ name: "Evaluación general", price: 10000, note: "Diagnóstico y plan personalizado" }];
  D.catalog.forEach(s => s.groups.forEach(g => g.items.forEach(it => out.push({ name: it.n, price: it.price, note: g.cat }))));
  return out;
}
// Agrupa cada procedimiento por familia para mostrarlo por categorías en el carrito.
const PROC_GROUP_ORDER = ["Evaluación", "Toxina botulínica (Botox)", "Ácido hialurónico", "Bioestimulación de colágeno", "Mesoterapia y regeneración", "Corporal", "Promociones", "Otros"];
function procGroupOf(p) {
  const s = ((p.note || "") + " " + (p.name || "")).toLowerCase();
  if (/evaluaci/.test(s)) return "Evaluación";
  if (/pack|promo|2 personas|compartir/.test(s)) return "Promociones";
  if (/bioestim|sculptra|col[áa]geno/.test(s)) return "Bioestimulación de colágeno";
  if (/armoniz|hialur|rinomodel|rino|p[óo]mulo|ment[óo]n|mand[íi]bula|labio|barras con ácido/.test(s)) return "Ácido hialurónico";
  if (/toxina|botox|bruxismo|hiperhidro|gingival|nefertiti|empedrado|barras, trat/.test(s)) return "Toxina botulínica (Botox)";
  if (/mesoterapia|nctf|salm[óo]n|rejuran|vitamina|regenera/.test(s)) return "Mesoterapia y regeneración";
  if (/quemador|lipol|grasa|corporal|manos/.test(s)) return "Corporal";
  return "Otros";
}

function validate(form) {
  const e = {};
  if (!form.name.trim() || form.name.trim().length < 3) e.name = "Ingresa tu nombre completo";
  const age = parseInt(form.age, 10);
  if (!form.age || isNaN(age) || age < 14 || age > 99) e.age = "Edad entre 14 y 99";
  const digits = (form.phone || "").replace(/\D/g, "");
  if (digits.length < 11) e.phone = "Teléfono incompleto (+56 9 ...)";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || "")) e.email = "Correo no válido";
  return e;
}

// Abono por ítem (eval = precio completo; resto 20% con mínimo $25.000)
function abonoOf(p) { return (/Evaluaci/.test(p.name) ? (p.price || 10000) : (p.price > 0 ? Math.round(p.price * 0.2) : 25000)); }

// Resumen de la reserva en texto plano — sirve para WhatsApp y para el correo.
function bookingText(D, cart, day, time, form, pay) {
  const fmt = D.fmt || (n => "$" + n);
  const L = [];
  L.push("NUEVA RESERVA · JC Medical");
  L.push("");
  L.push("Paciente: " + (form.name || "—"));
  if (form.age) L.push("Edad: " + form.age);
  L.push("Teléfono: " + (form.phone || "—"));
  if (form.email) L.push("Correo: " + form.email);
  L.push("");
  L.push("Tratamientos:");
  (cart || []).forEach(p => L.push("• " + ((p.qty || 1) > 1 ? (p.qty + "× ") : "") + p.name + (p.price > 0 ? (" — " + fmt(p.price * (p.qty || 1))) : "")));
  L.push("");
  L.push("Fecha: " + (day ? (day.wd + " " + day.dd + " " + day.mm) : "Por coordinar") + (time ? (" · " + time + " h") : ""));
  L.push("Abono de reserva: " + fmt(15000));
  L.push("Forma de pago: Transferencia bancaria");
  L.push("Adjunto el comprobante de la transferencia.");
  return L.join("\n");
}

// ── Borrador del carro (persistencia) ──
// Guarda carro + datos para que no se pierdan si el paciente cierra o sale por error.
var BOOKING_DRAFT_KEY = "jcm_booking_draft";
function loadBookingDraft() {
  try {
    var d = JSON.parse(localStorage.getItem(BOOKING_DRAFT_KEY) || "null");
    if (!d) return null;
    if (d.ts && Date.now() - d.ts > 14 * 86400000) { localStorage.removeItem(BOOKING_DRAFT_KEY); return null; } // expira a 14 días
    return d;
  } catch (e) { return null; }
}
function saveBookingDraft(d) { try { localStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(Object.assign({ ts: Date.now() }, d))); } catch (e) {} }
function clearBookingCartDraft() { // tras agendar: limpia carro/fecha, conserva el contacto para la próxima
  try { var d = loadBookingDraft() || {}; saveBookingDraft({ form: d.form || null }); } catch (e) {}
}

function BookingFlow({ T, D, initialProc, mode, onClose, onAskAssistant }) {
  const guided = mode !== "rapido";
  const procs = allProcs(D);
  // initialProc puede ser un string (nombre) o un objeto {name, price, note}.
  const initName = typeof initialProc === "string" ? initialProc : (initialProc && initialProc.name) || null;
  const initPrice = (initialProc && typeof initialProc === "object" && initialProc.price) || 0;
  const initNote = (initialProc && typeof initialProc === "object" && initialProc.note) || "";
  // Si no está en el catálogo, usa el precio recibido (evita que el carrito muestre $0).
  const startProc = initName ? (procs.find(p => p.name === initName) || { name: initName, price: initPrice, note: initNote }) : null;
  // Borrador guardado (si el paciente salió antes de terminar).
  const draft = loadBookingDraft();
  const [step, setStep] = useState(() => {
    if (startProc) return 0; // si entró desde un tratamiento, parte en Servicio
    if (draft && draft.cart && draft.cart.length && typeof draft.step === "number") return Math.min(draft.step, 4);
    return 0;
  });
  const [cart, setCart] = useState(() => {
    const base = (draft && draft.cart) ? draft.cart.slice() : [];
    if (startProc && !base.find(c => c.name === startProc.name)) base.unshift({ ...startProc, qty: 1 });
    return base;
  });
  const [promo2, setPromo2] = useState(false);
  function qtyOf(p) { const c = cart.find(c => c.name === p.name); return c ? c.qty : 0; }
  function setQty(p, q) {
    q = Math.max(0, Math.min(9, q));
    // Al elegir el PRIMER procedimiento (no evaluación), invita a un 2º con 15% off.
    if (q > 0 && !cart.find(c => c.name === p.name) && cart.length === 0 && !/Evaluaci/.test(p.name)) setPromo2(true);
    setCart(cs => {
      const has = cs.find(c => c.name === p.name);
      if (q === 0) return cs.filter(c => c.name !== p.name);
      if (has) return cs.map(c => c.name === p.name ? { ...c, qty: q } : c);
      return cs.concat([{ ...p, qty: q }]);
    });
  }
  const [day, setDay] = useState((draft && draft.day) || null);
  const [time, setTime] = useState((draft && draft.time) || null);
  const [form, setForm] = useState((draft && draft.form) || { name: "", age: "", phone: "+56 9 ", email: "" });
  const [touched, setTouched] = useState(false);
  const [pay, setPay] = useState(null);
  const [done, setDone] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const errs = validate(form);
  const formOk = Object.keys(errs).length === 0;
  const scrollRef = useRef(null);

  // Guarda el borrador en cada cambio (para no perder datos si cierra o sale por error).
  useEffect(() => { if (!done) saveBookingDraft({ cart, day, time, form, step }); }, [cart, day, time, form, step, done]);
  // Si entró desde un tratamiento/resultado (comprar) con 1 procedimiento pagado, ofrece el 2º al 15%.
  useEffect(() => { if (startProc && !/Evaluaci/.test(startProc.name || "") && (startProc.price || 0) > 0 && cart.length === 1) setPromo2(true); }, []);

  const steps = ["Servicio", "Fecha", "Hora", "Datos", "Pago"];
  function go(n) { setStep(n); if (scrollRef.current) scrollRef.current.scrollTop = 0; }
  function next() { go(Math.min(step + 1, steps.length - 1)); }
  function back() { if (step === 0) onClose(); else go(step - 1); }

  const canNext = [cart.length > 0, !!day, !!time, formOk, true][step];
  const amount = 15000; // abono de reserva fijo: siempre $15.000 (previo al tratamiento)
  // Descuento 2º procedimiento: 15% sobre el de menor valor cuando hay ≥2 procedimientos pagados
  // (cuenta unidades, así aplica también si son 2 iguales, ej. 2× Botox 3 zonas).
  const paidItems = cart.filter(c => !/Evaluaci/.test(c.name) && (c.price || 0) > 0);
  const paidUnits = paidItems.reduce((s, c) => s + (c.qty || 1), 0);
  const secondOff = paidUnits >= 2 ? Math.round(Math.min.apply(null, paidItems.map(c => c.price)) * 0.15) : 0;
  const cartTotal = cart.reduce((s, p) => s + (p.price || 0) * (p.qty || 1), 0) - secondOff;

  // Registra la reserva en la base local (la ve el panel máster) y abre el resumen.
  function submitBooking(payMethod) {
    const isTransfer = payMethod === "transfer";
    const appt = {
      id: Date.now().toString(36),
      name: form.name, phone: form.phone, email: form.email, age: form.age,
      items: cart.map(p => ({ name: p.name, qty: p.qty || 1, price: p.price || 0 })),
      day: day ? (day.wd + " " + day.dd + " " + day.mm) : null,
      fecha: day ? day.date : null, // formato YYYY-MM-DD para el panel
      time: time,
      pay: payMethod, abono: 15000, total: cartTotal,
      createdAt: new Date().toISOString(),
      // Transferencias quedan pendientes hasta que el doctor confirme; el resto se registra directo
      status: isTransfer ? "pendiente_pago" : "nueva",
      source: "app"
    };
    try { const b = (window.DB && window.DB.get("bookings")) || []; b.push(appt); window.DB.set("bookings", b); } catch (e) {}
    // Multi-clínica: además del guardado local, deja la reserva en Firebase de la clínica
    // (así llega al panel). Solo si la app está enlazada a una clínica (?c o dominio configurado).
    try {
      if (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.submitBooking && window.JCSAAS.currentClinicId && window.JCSAAS.currentClinicId()) {
        window.JCSAAS.submitBooking({
          name: form.name, phone: form.phone, email: form.email,
          proc: cart.map(function (p) { return (p.qty > 1 ? p.qty + "× " : "") + p.name; }).join(" + "),
          procs: cart.map(function (p) { return p.name + (p.qty > 1 ? " x" + p.qty : ""); }),
          fecha: appt.fecha || "", time: time || "", source: "app"
        });
      }
    } catch (e) {}
    // El slot solo se bloquea inmediatamente en pagos no-transferencia
    // Para transferencias el doctor confirma en el panel y el slot se bloquea en ese momento
    if (!isTransfer) {
      try {
        if (day && day.date && time) {
          const map = JSON.parse(localStorage.getItem("jcm_horarios_dates") || "{}");
          const cur = map[day.date];
          const base = Array.isArray(cur) ? cur : (window.JCDATA ? window.JCDATA.availability(new Date(day.date + "T00:00:00").getDay()).slots : []);
          map[day.date] = base.filter(s => s !== time);
          localStorage.setItem("jcm_horarios_dates", JSON.stringify(map));
        }
      } catch (e) {}
    }
    clearBookingCartDraft();
    setPay(payMethod); setDone(true);
  }

  if (done) return <BookingDone T={T} D={D} cart={cart} day={day} time={time} form={form} pay={pay} onClose={onClose} />;

  /* ── header ── */
  const header = (
    <div style={{ padding: "16px 18px 14px", borderBottom: "1px solid " + T.line, background: T.navBg, backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 5 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 300, color: T.text }}>Agendar</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href={"https://wa.me/" + D.wa + "?text=" + encodeURIComponent("Hola, vengo desde la app y quiero agendar mi evaluación.")} target="_blank" rel="noopener" title="Escríbenos por WhatsApp"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10, letterSpacing: ".06em", color: "#1F8A5B", border: "1px solid rgba(31,138,91,.45)", borderRadius: 999, padding: "6px 11px", textDecoration: "none" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#1F8A5B"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" /></svg>
            WhatsApp
          </a>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
      {guided && (
        <div style={{ display: "flex", gap: 5, marginTop: 14 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{ height: 3, borderRadius: 2, background: i <= step ? T.accent : T.line, transition: "background .3s" }} />
              <div style={{ fontFamily: T.sans, fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", color: i === step ? T.text : T.textFaint, marginTop: 6, textAlign: "center" }}>{s}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ── sections ── */
  const SecServicio = (
    <Section T={T} title="¿Qué te gustaría agendar?" hint="Puedes elegir uno o más tratamientos. Empieza por una evaluación si tienes dudas.">
      {onAskAssistant && (
        <button onClick={onAskAssistant} style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, textAlign: "left", marginBottom: 28, padding: "13px 15px", borderRadius: 8, background: T.surface2, border: "1px solid " + T.accent, cursor: "pointer" }}>
          <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 9, background: T.accent + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7"><path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z" /><circle cx="9" cy="11.5" r=".9" fill={T.accent} /><circle cx="12" cy="11.5" r=".9" fill={T.accent} /><circle cx="15" cy="11.5" r=".9" fill={T.accent} /></svg>
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text, lineHeight: 1.35 }}>Resuelve tus dudas con nuestro agente virtual especializado en medicina estética</span>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 10.5, color: T.accent, letterSpacing: ".06em", textTransform: "uppercase", marginTop: 4 }}>Preguntar antes de agendar →</span>
          </span>
        </button>
      )}
      <div style={{ paddingBottom: 8 }}>
        {PROC_GROUP_ORDER.map(grp => {
          const items = procs.filter(p => procGroupOf(p) === grp);
          if (!items.length) return null;
          return (
            <div key={grp} style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, margin: "2px 2px 9px" }}>{grp}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map(p => {
                  const q = qtyOf(p);
                  const stepBtn = (label, fn) => <button onClick={fn} style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid " + T.chipBorder, background: T.surface, color: T.text, cursor: "pointer", fontFamily: T.sans, fontSize: 16, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>{label}</button>;
                  return (
                    <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "13px 16px", background: q ? T.surface2 : T.surface, border: "1px solid " + (q ? T.accent : T.line), borderRadius: 4, transition: "all .2s" }}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{p.name}</div>
                        <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 3 }}>{p.note}{p.price > 0 ? " · " + D.fmt(p.price) : ""}</div>
                      </div>
                      {q === 0
                        ? <button onClick={() => setQty(p, 1)} style={{ flexShrink: 0, fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.text, background: "transparent", border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "8px 13px", cursor: "pointer" }}>Agregar</button>
                        : <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>{stepBtn("−", () => setQty(p, q - 1))}<span style={{ fontFamily: T.serif, fontSize: 18, color: T.text, minWidth: 16, textAlign: "center" }}>{q}</span>{stepBtn("+", () => setQty(p, q + 1))}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {cart.length > 0 && (
        <div style={{ position: "sticky", bottom: 0, marginTop: 12, padding: "12px 16px 14px", background: T.surface2, border: "1px solid " + T.accent, borderRadius: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: secondOff ? 4 : 8 }}>
            <span style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent }}>Tu selección · {cart.reduce((s, c) => s + c.qty, 0)}</span>
            <span style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>{D.fmt(cartTotal)}</span>
          </div>
          {secondOff > 0 && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: "#1F8A5B", marginBottom: 8 }}>✓ Incluye −15% en tu 2º procedimiento (−{D.fmt(secondOff)})</div>}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {cart.map(c => (
              <span key={c.name} onClick={() => setQty(c, 0)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 11, color: T.text, background: T.surface, border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "6px 10px", cursor: "pointer" }}>
                {c.qty}× {c.name}<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </span>
            ))}
          </div>
        </div>
      )}
    </Section>
  );

  const SecFecha = (
    <Section T={T} title="Elige un día" hint="Lun a Vie 10–19h · Sábado 10–14h">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
        {D.schedule.map(dd => (
          <button key={dd.date} onClick={() => { setDay(dd); setTime(null); }} style={{
            padding: "12px 4px", borderRadius: 4, cursor: "pointer", textAlign: "center",
            background: day && day.date === dd.date ? T.accent : T.surface, border: "1px solid " + (day && day.date === dd.date ? T.accent : T.line), transition: "all .2s"
          }}>
            <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: day && day.date === dd.date ? T.onAccent : T.textMute }}>{dd.wd}</div>
            <div style={{ fontFamily: T.serif, fontSize: 22, color: day && day.date === dd.date ? T.onAccent : T.text, marginTop: 2 }}>{dd.dd}</div>
            <div style={{ fontFamily: T.sans, fontSize: 8.5, color: day && day.date === dd.date ? T.onAccent : T.textFaint }}>{dd.mm}</div>
          </button>
        ))}
      </div>
    </Section>
  );

  const SecHora = (
    <Section T={T} title="Hora disponible" hint={day ? day.wd + " " + day.dd + " " + day.mm : "Selecciona un día primero"}>
      {!day ? <Empty T={T}>Primero elige un día.</Empty> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {day.slots.map(s => (
            <button key={s.time} disabled={s.taken} onClick={() => setTime(s.time)} style={{
              padding: "12px 4px", borderRadius: 4, cursor: s.taken ? "not-allowed" : "pointer", fontFamily: T.sans, fontSize: 13, letterSpacing: ".04em",
              background: time === s.time ? T.accent : T.surface, color: s.taken ? T.textFaint : (time === s.time ? T.onAccent : T.text),
              border: "1px solid " + (time === s.time ? T.accent : T.line), textDecoration: s.taken ? "line-through" : "none", opacity: s.taken ? .5 : 1, transition: "all .2s"
            }}>{s.time}</button>
          ))}
        </div>
      )}
    </Section>
  );

  const SecDatos = (
    <Section T={T} title="Tus datos" hint="Para confirmar tu hora y enviarte el recordatorio.">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Field T={T} label="Nombre completo" value={form.name} err={touched && errs.name} onChange={v => setForm({ ...form, name: v.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, "") })} placeholder="Ej: María González" />
        <Field T={T} label="Edad" value={form.age} err={touched && errs.age} onChange={v => setForm({ ...form, age: v.replace(/\D/g, "").slice(0, 2) })} placeholder="Ej: 32" inputMode="numeric" />
        <Field T={T} label="Teléfono (WhatsApp)" value={form.phone} err={touched && errs.phone} onChange={v => setForm({ ...form, phone: v.replace(/[^\d+\s]/g, "") })} placeholder="+56 9 XXXX XXXX" inputMode="tel" />
        <Field T={T} label="Correo electrónico" value={form.email} err={touched && errs.email} onChange={v => setForm({ ...form, email: v })} placeholder="tucorreo@ejemplo.com" inputMode="email" />
      </div>
    </Section>
  );

  const pago = D.pago || {};
  const SecPago = (
    <Section T={T} title="Confirmar reserva" hint="Para asegurar tu hora se paga un abono de reserva por transferencia. Confirmamos por WhatsApp al recibir el comprobante.">
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 4, padding: "16px 18px", marginBottom: 14 }}>
        {cart.map(c => <Summ key={c.name} T={T} k={(c.qty > 1 ? c.qty + "× " : "") + c.name} v={c.price > 0 ? D.fmt(c.price * c.qty) : "—"} />)}
        <Summ T={T} k="Fecha" v={day ? (day.wd + " " + day.dd + " " + day.mm) : "—"} />
        <Summ T={T} k="Hora" v={time || "—"} />
        <Summ T={T} k="A nombre de" v={form.name || "—"} />
        <div style={{ borderTop: "1px solid " + T.line, marginTop: 10, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: T.accent }}>Abono reserva</span>
          <span style={{ fontFamily: T.serif, fontSize: 26, color: T.text }}>{D.fmt(amount)}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Botón acordeón: Pagar por transferencia */}
        <button onClick={() => setShowTransfer(v => !v)} style={{ ...payBtn(T, true), justifyContent: "space-between" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
            Pagar por transferencia
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: "transform .2s", transform: showTransfer ? "rotate(180deg)" : "none", opacity: .7 }}><path d="M6 9l6 6 6-6" /></svg>
        </button>

        {/* Datos de transferencia + confirmación (se despliegan al tocar el botón) */}
        {showTransfer && (
          <div style={{ background: T.surface2, border: "1px solid " + T.line, borderRadius: 4, padding: "16px 18px", animation: "jcSlideUp .2s ease" }}>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Datos para transferir</div>
            <Summ T={T} k="Banco" v={pago.banco} />
            <Summ T={T} k="Tipo de cuenta" v={pago.tipo} />
            <Summ T={T} k="N° de cuenta" v={pago.numero} />
            <Summ T={T} k="RUT" v={pago.rut} />
            <Summ T={T} k="Titular" v={pago.titular} />
            <Summ T={T} k="Correo" v={pago.email} />
            <button onClick={() => submitBooking("transfer")} style={{ ...payBtn(T, true), marginTop: 14, background: "#1F8A5B", width: "100%" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" /></svg>
              Ya transferí · enviar comprobante
            </button>
          </div>
        )}

        {/* Pago con banco (próximamente) */}
        {!pago.cardEnabled && (
          <div style={{ ...payBtn(T, false), opacity: .45, cursor: "not-allowed", justifyContent: "space-between" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Pagar con banco
            </span>
            <span style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase" }}>Disponible pronto</span>
          </div>
        )}
      </div>
    </Section>
  );

  const sections = [SecServicio, SecFecha, SecHora, SecDatos, SecPago];

  return (
    <div style={{ position: "absolute", inset: 0, background: T.bg, display: "flex", flexDirection: "column", zIndex: 40 }}>
      {header}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto" }}>
        {guided ? <div key={step} style={{ animation: "jcSlideUp .35s " + T.ease }}>{sections[step]}</div>
          : <div>{sections.map((s, i) => <div key={i}>{s}</div>)}</div>}
        <div style={{ height: 20 }} />
      </div>
      {/* footer */}
      <div style={{ padding: "14px 18px", borderTop: "1px solid " + T.line, background: T.navBg, backdropFilter: "blur(14px)", display: "flex", gap: 10, alignItems: "center" }}>
        {guided && step < 4 && (
          <>
            <button onClick={back} style={{ fontFamily: T.sans, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, background: "none", border: "1px solid " + T.chipBorder, borderRadius: 3, padding: "14px 18px", cursor: "pointer" }}>{step === 0 ? "Cerrar" : "Atrás"}</button>
            <button onClick={() => { if (step === 3) { setTouched(true); if (!formOk) return; } if (canNext) next(); }} disabled={step !== 3 && !canNext} style={{
              flex: 1, fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", padding: "15px 18px", borderRadius: 3, cursor: (step === 3 || canNext) ? "pointer" : "not-allowed",
              background: (step === 3 || canNext) ? T.primaryBg : T.surface2, color: (step === 3 || canNext) ? T.primaryText : T.textFaint, border: "none", transition: "all .25s"
            }}>Continuar</button>
          </>
        )}
        {guided && step === 4 && (
          <button onClick={back} style={{ flex: 1, fontFamily: T.sans, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, background: "none", border: "1px solid " + T.chipBorder, borderRadius: 3, padding: "14px 18px", cursor: "pointer" }}>Atrás</button>
        )}
        {!guided && (
          <button onClick={() => { setTouched(true); if (formOk && day && time) go(4); }} style={{
            flex: 1, fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", padding: "15px 18px", borderRadius: 3,
            background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer"
          }}>Revisar y pagar</button>
        )}
      </div>
      {promo2 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 60, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: T.bg, border: "1px solid " + T.line, borderRadius: 16, padding: "26px 22px", maxWidth: 360, textAlign: "center", animation: "jcPop .4s " + T.ease }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: T.gold + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.7"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7C12 7 12 2 8.5 2 5 2 5 7 12 7zM12 7s0-5 3.5-5S19 7 12 7z" /></svg>
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: T.gold, marginBottom: 6 }}>Beneficio exclusivo</div>
            <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 24, color: T.text, lineHeight: 1.15 }}>Selecciona tu segundo procedimiento con un 15% de descuento</h2>
            <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 10, lineHeight: 1.55 }}>Agrega otro tratamiento a tu sesión y el de menor valor lleva un 15% de descuento automático.</p>
            <button onClick={() => setPromo2(false)} style={{ marginTop: 18, width: "100%", fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", padding: "14px", borderRadius: 6, background: T.primaryBg, color: T.primaryText, border: "none", cursor: "pointer" }}>Elegir segundo procedimiento</button>
            <button onClick={() => setPromo2(false)} style={{ marginTop: 9, width: "100%", fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", padding: "12px", borderRadius: 6, background: "none", color: T.textMute, border: "1px solid " + T.chipBorder, cursor: "pointer" }}>Ahora no</button>
          </div>
        </div>
      )}
    </div>
  );
}

function payBtn(T, primary) {
  return { display: "flex", alignItems: "center", justifyContent: "center", gap: 9, width: "100%", fontFamily: T.sans, fontSize: 11.5, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", padding: "15px 16px", borderRadius: 3, cursor: "pointer", background: primary ? "#1F8A5B" : "transparent", color: primary ? "#fff" : T.text, border: primary ? "none" : "1px solid " + T.chipBorder };
}

function Section({ T, title, hint, children }) {
  return (
    <div style={{ padding: "22px 20px 4px" }}>
      <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 26, letterSpacing: "-.015em", color: T.text }}>{title}</h2>
      {hint && <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 6, marginBottom: 16, lineHeight: 1.5 }}>{hint}</p>}
      {children}
    </div>
  );
}
function Empty({ T, children }) { return <div style={{ padding: "30px 0", textAlign: "center", fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>{children}</div>; }
function Summ({ T, k, v }) {
  return <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "5px 0", fontFamily: T.sans, fontSize: 13 }}><span style={{ color: T.textMute }}>{k}</span><span style={{ color: T.text, textAlign: "right" }}>{v}</span></div>;
}
function Field({ T, label, value, onChange, placeholder, err, inputMode, type }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontFamily: T.sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>{label}</span>
      <input value={value} type={type || "text"} inputMode={inputMode} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
        width: "100%", padding: "13px 14px", borderRadius: 3, border: "1px solid " + (err ? "#c0285a" : T.line), background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 16, outline: "none"
      }} />
      {err && <span style={{ display: "block", fontFamily: T.sans, fontSize: 10.5, color: "#c0285a", marginTop: 5 }}>{err}</span>}
    </label>
  );
}

function BookingDone({ T, D, cart, day, time, form, pay, onClose }) {
  const txt = bookingText(D, cart, day, time, form, pay);
  const waUrl = "https://wa.me/" + D.wa + "?text=" + encodeURIComponent(txt);
  const clinicMail = (D.contact && D.contact.email) || "jc.skinlab@gmail.com";
  const mailUrl = "mailto:" + clinicMail + "?subject=" + encodeURIComponent("Nueva reserva — " + (form.name || "paciente")) + "&body=" + encodeURIComponent(txt);
  const [sent, setSent] = useState(false);
  return (
    <div style={{ position: "absolute", inset: 0, background: T.bg, zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 26px", textAlign: "center", overflowY: "auto" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#1F8A5B", display: "flex", alignItems: "center", justifyContent: "center", animation: "jcPop .5s " + T.ease, flexShrink: 0 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
      </div>
      <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 32, color: T.text, marginTop: 20, lineHeight: 1.1 }}>Reserva registrada</h2>
      <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 10, lineHeight: 1.6, maxWidth: 330 }}>
        {(form.name ? form.name.split(" ")[0] + ", " : "")}
        {pay === "clinica"
          ? <>envíanos tu reserva por <b style={{ color: "#1F8A5B" }}>WhatsApp</b>. Pagas <b style={{ color: T.text }}>directo en la clínica</b> el día de tu atención y te confirmamos la hora.</>
          : <>envíanos el <b style={{ color: "#1F8A5B" }}>comprobante por WhatsApp</b>. Revisaremos la transferencia y confirmaremos tu hora en <b style={{ color: T.text }}>máximo 15 minutos</b>.</>}
      </p>
      <div style={{ marginTop: 20, width: "100%", maxWidth: 340, background: T.surface, border: "1px solid " + T.line, borderRadius: 4, padding: "16px 20px", textAlign: "left" }}>
        {(cart || []).map(c => <Summ key={c.name} T={T} k={((c.qty || 1) > 1 ? c.qty + "× " : "") + c.name} v={c.price > 0 ? D.fmt(c.price * (c.qty || 1)) : "—"} />)}
        <Summ T={T} k="Fecha" v={day ? (day.wd + " " + day.dd + " " + day.mm) : "Por coordinar"} />
        <Summ T={T} k="Hora" v={time || "Por coordinar"} />
        <Summ T={T} k="Estado" v={pay === "transfer" ? "Por confirmar · con abono" : pay === "clinica" ? "Por confirmar · paga en clínica" : "Por confirmar"} />
      </div>
      <div style={{ marginTop: 22, width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 10 }}>
        <a href={waUrl} target="_blank" rel="noopener" onClick={() => setSent(true)}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, background: "#1F8A5B", color: "#fff", fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", borderRadius: 4, padding: "15px 18px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" /></svg>
          {pay === "transfer" ? "Enviar comprobante por WhatsApp" : "Confirmar por WhatsApp"}
        </a>
        <a href={mailUrl} onClick={() => setSent(true)}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, background: "none", color: T.text, border: "1px solid " + T.chipBorder, fontFamily: T.sans, fontSize: 12, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", borderRadius: 4, padding: "14px 18px", textDecoration: "none" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 6 10 7L22 6" /></svg>
          Enviar por correo
        </a>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, fontFamily: T.sans, fontSize: 11.5, letterSpacing: ".08em", textTransform: "uppercase", padding: "8px" }}>
          {sent ? "Listo · volver al inicio" : "Volver al inicio"}
        </button>
      </div>
    </div>
  );
}

/* ─────────── FORMULARIO SIMPLE DE EVALUACIÓN (solo evaluar → WhatsApp) ─────────── */
function EvalForm({ T, D, onClose }) {
  const [f, setF] = useState({ name: "", age: "", phone: "+56 9 ", goal: "" });
  const [sent, setSent] = useState(false);
  const ok = f.name.trim().length > 1 && f.phone.replace(/\D/g, "").length >= 9;
  const GOALS = ["Arrugas / líneas de expresión", "Flacidez / firmeza", "Manchas / luminosidad", "Perfil / armonización", "Solo quiero orientarme"];
  function submit() {
    const msg = "Hola, quiero agendar mi *evaluación* en JC Medical.\n\n• Nombre: " + f.name + (f.age ? "\n• Edad: " + f.age : "") + "\n• Teléfono: " + f.phone + (f.goal ? "\n• Me gustaría mejorar: " + f.goal : "");
    try { const all = window.DB.get("bookings") || []; all.push({ id: "ev" + Date.now(), kind: "evaluacion", name: f.name, age: f.age, phone: f.phone, goal: f.goal, t: new Date().toISOString() }); window.DB.set("bookings", all); } catch (e) {}
    setSent(true);
    window.open("https://wa.me/" + D.wa + "?text=" + encodeURIComponent(msg), "_blank");
  }
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 45, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} className="jc-scroll" style={{ width: "100%", maxHeight: "94%", overflowY: "auto", background: T.bg, borderRadius: "18px 18px 0 0", border: "1px solid " + T.line, padding: "20px 20px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
          <div>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: "#1F8A5B" }}>Evaluación por WhatsApp</div>
            <h2 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 27, color: T.text, lineHeight: 1.1, marginTop: 6 }}>Conversemos tu evaluación</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.textMute, cursor: "pointer", padding: 2 }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>
        {sent ? (
          <div style={{ padding: "26px 0", textAlign: "center" }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#1F8A5B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M20 6 9 17l-5-5" /></svg></div>
            <h3 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 22, color: T.text }}>¡Te abrimos WhatsApp!</h3>
            <p style={{ fontFamily: T.sans, fontSize: 13, color: T.textMute, marginTop: 8, lineHeight: 1.6 }}>Envíanos el mensaje y coordinamos tu evaluación. Si no se abrió, escríbenos directo.</p>
            <a href={"https://wa.me/" + D.wa} target="_blank" rel="noopener" style={{ display: "inline-block", marginTop: 16, fontFamily: T.sans, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#fff", background: "#1F8A5B", borderRadius: 6, padding: "13px 22px", textDecoration: "none" }}>Abrir WhatsApp</a>
          </div>
        ) : (
          <div>
            <p style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.6, marginBottom: 16 }}>Déjanos tus datos y te llevamos directo a WhatsApp para coordinar tu evaluación. La evaluación define tu diagnóstico y plan personalizado.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Field T={T} label="Nombre" value={f.name} onChange={v => setF({ ...f, name: v.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, "") })} placeholder="Tu nombre" />
              <Field T={T} label="Edad (opcional)" value={f.age} onChange={v => setF({ ...f, age: v.replace(/\D/g, "").slice(0, 2) })} placeholder="Ej: 32" inputMode="numeric" />
              <Field T={T} label="Teléfono (WhatsApp)" value={f.phone} onChange={v => setF({ ...f, phone: v.replace(/[^\d+\s]/g, "") })} placeholder="+56 9 XXXX XXXX" inputMode="tel" />
              <div>
                <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>¿Qué te gustaría mejorar? (opcional)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {GOALS.map(g => { const on = f.goal === g; return <button key={g} onClick={() => setF({ ...f, goal: on ? "" : g })} style={{ fontFamily: T.sans, fontSize: 11.5, color: on ? (T.onAccent || "#fff") : T.text, background: on ? T.accent : T.surface, border: "1px solid " + (on ? T.accent : T.line), borderRadius: 999, padding: "9px 13px", cursor: "pointer" }}>{g}</button>; })}
                </div>
              </div>
              <button onClick={() => ok && submit()} disabled={!ok} style={{ marginTop: 4, width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, fontFamily: T.sans, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: "15px", borderRadius: 6, background: ok ? "#1F8A5B" : T.surface2, color: ok ? "#fff" : T.textFaint, border: "none", cursor: ok ? "pointer" : "default" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02z" /></svg>
                Enviar y abrir WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { BookingFlow, BookingDone, Section, Field, Summ, Empty, EvalForm });
