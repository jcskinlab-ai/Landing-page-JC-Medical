function jcExportSignature(srcCanvas) {
  try {
    var tw = 720;
    var ratio = srcCanvas.height / srcCanvas.width || 0.4;
    var th = Math.max(120, Math.round(tw * ratio));
    var out = document.createElement("canvas");
    out.width = tw;
    out.height = th;
    var o = out.getContext("2d");
    o.fillStyle = "#ffffff";
    o.fillRect(0, 0, tw, th);
    o.drawImage(srcCanvas, 0, 0, tw, th);
    return out.toDataURL("image/jpeg", 0.6);
  } catch (e) {
    try {
      return srcCanvas.toDataURL("image/jpeg", 0.6);
    } catch (_) {
      return srcCanvas.toDataURL();
    }
  }
}
function jcSetupCanvas(c) {
  var ratio = window.devicePixelRatio || 1;
  var rect = c.getBoundingClientRect();
  c.width = rect.width * ratio;
  c.height = rect.height * ratio;
  var ctx = c.getContext("2d");
  ctx.scale(ratio, ratio);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 1.3;
  ctx.strokeStyle = "#1a1914";
  c._ctx = ctx;
}
function jcPos(c, e) {
  var r = c.getBoundingClientRect();
  var t = e.touches ? e.touches[0] : e;
  return { x: t.clientX - r.left, y: t.clientY - r.top };
}
function SignaturePad({ T, onChange, height }) {
  const canRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [hasInk, setHasInk] = useState(false);
  const [big, setBig] = useState(false);
  const H = height || 180;
  useEffect(() => {
    if (canRef.current) jcSetupCanvas(canRef.current);
  }, []);
  function start(e) {
    e.preventDefault();
    drawing.current = true;
    last.current = jcPos(canRef.current, e);
  }
  function move(e) {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canRef.current._ctx;
    const p = jcPos(canRef.current, e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (!hasInk) setHasInk(true);
  }
  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    if (onChange) onChange(jcExportSignature(canRef.current));
  }
  function clear() {
    const c = canRef.current;
    c._ctx.clearRect(0, 0, c.width, c.height);
    setHasInk(false);
    if (onChange) onChange(null);
  }
  function applyBig(data) {
    setBig(false);
    if (!data) return;
    const c = canRef.current;
    const img = new Image();
    img.onload = () => {
      const r = c.getBoundingClientRect();
      c._ctx.clearRect(0, 0, c.width, c.height);
      c._ctx.drawImage(img, 0, 0, r.width, r.height);
      setHasInk(true);
    };
    img.src = data;
    if (onChange) onChange(data);
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line, background: "#fff" } }, /* @__PURE__ */ React.createElement(
    "canvas",
    {
      ref: canRef,
      onMouseDown: start,
      onMouseMove: move,
      onMouseUp: end,
      onMouseLeave: end,
      onTouchStart: start,
      onTouchMove: move,
      onTouchEnd: end,
      style: { width: "100%", height: H + "px", display: "block", touchAction: "none", cursor: "crosshair" }
    }
  ), !hasInk && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", fontFamily: T.sans, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "#B8B2A4" } }, "Firma aqu\xED"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 16, right: 16, bottom: 22, height: 1, background: "rgba(20,20,15,.18)", pointerEvents: "none" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: clear, style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, background: "none", border: "1px solid " + T.chipBorder, borderRadius: 4, padding: "8px 14px", cursor: "pointer" } }, "Borrar"), /* @__PURE__ */ React.createElement("button", { onClick: () => setBig(true), style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, background: "none", border: "1px solid " + T.accent + "66", borderRadius: 4, padding: "8px 14px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" })), "Firmar en grande")), big && /* @__PURE__ */ React.createElement(SignatureFullscreen, { T, onCancel: () => setBig(false), onCapture: applyBig }));
}
function SignatureFullscreen({ T, onCancel, onCapture }) {
  const canRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [hasInk, setHasInk] = useState(false);
  useEffect(() => {
    const c = canRef.current;
    if (c) jcSetupCanvas(c);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  function start(e) {
    e.preventDefault();
    drawing.current = true;
    last.current = jcPos(canRef.current, e);
  }
  function move(e) {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canRef.current._ctx;
    const p = jcPos(canRef.current, e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (!hasInk) setHasInk(true);
  }
  function end() {
    drawing.current = false;
  }
  function clear() {
    const c = canRef.current;
    c._ctx.clearRect(0, 0, c.width, c.height);
    setHasInk(false);
  }
  function done() {
    onCapture(hasInk ? jcExportSignature(canRef.current) : null);
  }
  const btn = (extra) => ({ fontFamily: T.sans, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", borderRadius: 10, padding: "14px 20px", cursor: "pointer", border: "none", ...extra });
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 9999, background: "rgba(10,10,8,.92)", display: "flex", flexDirection: "column", padding: "16px", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff" } }, "Firma aqu\xED \xB7 gira el tel\xE9fono para m\xE1s espacio"), /* @__PURE__ */ React.createElement("button", { onClick: onCancel, style: { background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", padding: 4 } }, /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", flex: 1, borderRadius: 12, overflow: "hidden", background: "#fff" } }, /* @__PURE__ */ React.createElement(
    "canvas",
    {
      ref: canRef,
      onMouseDown: start,
      onMouseMove: move,
      onMouseUp: end,
      onMouseLeave: end,
      onTouchStart: start,
      onTouchMove: move,
      onTouchEnd: end,
      style: { width: "100%", height: "100%", display: "block", touchAction: "none", cursor: "crosshair" }
    }
  ), !hasInk && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", fontFamily: T.serif, fontSize: 22, color: "#C9C3B5" } }, "Firma con el dedo"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 40, right: 40, bottom: "30%", height: 1, background: "rgba(20,20,15,.18)", pointerEvents: "none" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: clear, style: btn({ flex: "0 0 auto", background: "rgba(255,255,255,.14)", color: "#fff" }) }, "Borrar"), /* @__PURE__ */ React.createElement("button", { onClick: done, style: btn({ flex: 1, background: T.accent, color: T.onAccent || "#fff" }) }, "Listo")));
}
Object.assign(window, { SignaturePad, SignatureFullscreen, jcExportSignature });
