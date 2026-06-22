/* ═══════════ JC · PAD DE FIRMA DIGITAL ═══════════ */
function SignaturePad({ T, onChange, height }) {
  const canRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const c = canRef.current;
    const ratio = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * ratio; c.height = rect.height * ratio;
    const ctx = c.getContext("2d");
    ctx.scale(ratio, ratio);
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 2.2;
    ctx.strokeStyle = T.dark ? "#F2EDE6" : "#17170F";
    c._ctx = ctx; c._rect = rect;
  }, [T.dark]);

  function pos(e) {
    const c = canRef.current; const r = c.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  }
  function start(e) { e.preventDefault(); drawing.current = true; last.current = pos(e); }
  function move(e) {
    if (!drawing.current) return; e.preventDefault();
    const ctx = canRef.current._ctx; const p = pos(e);
    ctx.beginPath(); ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    last.current = p; if (!hasInk) setHasInk(true);
  }
  function end() { if (!drawing.current) return; drawing.current = false; if (onChange) onChange(canRef.current.toDataURL()); }
  function clear() { const c = canRef.current; c._ctx.clearRect(0, 0, c.width, c.height); setHasInk(false); if (onChange) onChange(null); }

  return (
    <div>
      <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line, background: T.surface }}>
        <canvas ref={canRef}
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
          style={{ width: "100%", height: (height || 150) + "px", display: "block", touchAction: "none", cursor: "crosshair" }} />
        {!hasInk && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", fontFamily: T.sans, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: T.textFaint }}>Firma aquí</div>}
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 22, height: 1, background: T.line, pointerEvents: "none" }} />
      </div>
      <button onClick={clear} style={{ marginTop: 8, fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, background: "none", border: "1px solid " + T.chipBorder, borderRadius: 4, padding: "8px 14px", cursor: "pointer" }}>Borrar</button>
    </div>
  );
}
Object.assign(window, { SignaturePad });
