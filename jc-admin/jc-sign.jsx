/* ═══════════ JC · PAD DE FIRMA DIGITAL ═══════════ */

// Exporta la firma COMPRIMIDA (JPEG sobre blanco, reescalada a ~720px). Así pesa
// pocos KB y no infla la ficha del paciente — evita superar el límite de Firestore
// (1 MB/documento) que hacía fallar la sincronización y perder el consentimiento.
function jcExportSignature(srcCanvas) {
  try {
    var tw = 720;
    var ratio = (srcCanvas.height / srcCanvas.width) || 0.4;
    var th = Math.max(120, Math.round(tw * ratio));
    var out = document.createElement("canvas"); out.width = tw; out.height = th;
    var o = out.getContext("2d");
    o.fillStyle = "#ffffff"; o.fillRect(0, 0, tw, th);
    o.drawImage(srcCanvas, 0, 0, tw, th);
    return out.toDataURL("image/jpeg", 0.6);
  } catch (e) {
    try { return srcCanvas.toDataURL("image/jpeg", 0.6); } catch (_) { return srcCanvas.toDataURL(); }
  }
}

// Lógica de dibujo común (fondo blanco, trazo oscuro → siempre legible y exportable).
function jcSetupCanvas(c) {
  var ratio = window.devicePixelRatio || 1;
  var rect = c.getBoundingClientRect();
  c.width = rect.width * ratio; c.height = rect.height * ratio;
  var ctx = c.getContext("2d");
  ctx.scale(ratio, ratio);
  ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 2.4;
  ctx.strokeStyle = "#17170F";
  c._ctx = ctx;
}
function jcPos(c, e) { var r = c.getBoundingClientRect(); var t = e.touches ? e.touches[0] : e; return { x: t.clientX - r.left, y: t.clientY - r.top }; }

function SignaturePad({ T, onChange, height }) {
  const canRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [hasInk, setHasInk] = useState(false);
  const [big, setBig] = useState(false);
  const H = height || 180;

  useEffect(() => { if (canRef.current) jcSetupCanvas(canRef.current); }, []);

  function start(e) { e.preventDefault(); drawing.current = true; last.current = jcPos(canRef.current, e); }
  function move(e) {
    if (!drawing.current) return; e.preventDefault();
    const ctx = canRef.current._ctx; const p = jcPos(canRef.current, e);
    ctx.beginPath(); ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    last.current = p; if (!hasInk) setHasInk(true);
  }
  function end() { if (!drawing.current) return; drawing.current = false; if (onChange) onChange(jcExportSignature(canRef.current)); }
  function clear() { const c = canRef.current; c._ctx.clearRect(0, 0, c.width, c.height); setHasInk(false); if (onChange) onChange(null); }

  // Recibe la firma hecha en pantalla completa: la dibuja en el pad pequeño y la entrega.
  function applyBig(data) {
    setBig(false);
    if (!data) return;
    const c = canRef.current; const img = new Image();
    img.onload = () => { const r = c.getBoundingClientRect(); c._ctx.clearRect(0, 0, c.width, c.height); c._ctx.drawImage(img, 0, 0, r.width, r.height); setHasInk(true); };
    img.src = data;
    if (onChange) onChange(data);
  }

  return (
    <div>
      <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line, background: "#fff" }}>
        <canvas ref={canRef}
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
          style={{ width: "100%", height: H + "px", display: "block", touchAction: "none", cursor: "crosshair" }} />
        {!hasInk && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", fontFamily: T.sans, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "#B8B2A4" }}>Firma aquí</div>}
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 22, height: 1, background: "rgba(20,20,15,.18)", pointerEvents: "none" }} />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={clear} style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, background: "none", border: "1px solid " + T.chipBorder, borderRadius: 4, padding: "8px 14px", cursor: "pointer" }}>Borrar</button>
        <button onClick={() => setBig(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, background: "none", border: "1px solid " + T.accent + "66", borderRadius: 4, padding: "8px 14px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
          Firmar en grande
        </button>
      </div>
      {big && <SignatureFullscreen T={T} onCancel={() => setBig(false)} onCapture={applyBig} />}
    </div>
  );
}

// Pantalla completa para firmar cómodo (sin zoom). En el teléfono se aprovecha el ancho;
// si se gira a horizontal, el área de firma se hace enorme.
function SignatureFullscreen({ T, onCancel, onCapture }) {
  const canRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const c = canRef.current; if (c) jcSetupCanvas(c);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  function start(e) { e.preventDefault(); drawing.current = true; last.current = jcPos(canRef.current, e); }
  function move(e) {
    if (!drawing.current) return; e.preventDefault();
    const ctx = canRef.current._ctx; const p = jcPos(canRef.current, e);
    ctx.beginPath(); ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    last.current = p; if (!hasInk) setHasInk(true);
  }
  function end() { drawing.current = false; }
  function clear() { const c = canRef.current; c._ctx.clearRect(0, 0, c.width, c.height); setHasInk(false); }
  function done() { onCapture(hasInk ? jcExportSignature(canRef.current) : null); }

  const btn = (extra) => ({ fontFamily: T.sans, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", borderRadius: 10, padding: "14px 20px", cursor: "pointer", border: "none", ...extra });
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(10,10,8,.92)", display: "flex", flexDirection: "column", padding: "16px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff" }}>Firma aquí · gira el teléfono para más espacio</span>
        <button onClick={onCancel} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", padding: 4 }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
      </div>
      <div style={{ position: "relative", flex: 1, borderRadius: 12, overflow: "hidden", background: "#fff" }}>
        <canvas ref={canRef}
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
          style={{ width: "100%", height: "100%", display: "block", touchAction: "none", cursor: "crosshair" }} />
        {!hasInk && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", fontFamily: T.serif, fontSize: 22, color: "#C9C3B5" }}>Firma con el dedo</div>}
        <div style={{ position: "absolute", left: 40, right: 40, bottom: "30%", height: 1, background: "rgba(20,20,15,.18)", pointerEvents: "none" }} />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button onClick={clear} style={btn({ flex: "0 0 auto", background: "rgba(255,255,255,.14)", color: "#fff" })}>Borrar</button>
        <button onClick={done} style={btn({ flex: 1, background: T.accent, color: T.onAccent || "#fff" })}>Listo</button>
      </div>
    </div>
  );
}

Object.assign(window, { SignaturePad, SignatureFullscreen, jcExportSignature });
