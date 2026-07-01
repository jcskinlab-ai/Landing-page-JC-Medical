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
function SignaturePad({ T, onChange, height, maxW }) {
  const canRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [hasInk, setHasInk] = useState(false);
  const [big, setBig] = useState(false);
  const H = height || 200;
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
  return /* @__PURE__ */ React.createElement("div", { style: maxW ? { maxWidth: maxW } : void 0 }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid " + T.line, background: "#fff", boxShadow: "inset 0 1px 3px rgba(20,20,15,.05)" } }, /* @__PURE__ */ React.createElement(
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
  ), !hasInk && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", fontFamily: T.sans, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "#B8B2A4" } }, "Firma aqu\xED"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 22, right: 22, bottom: 26, height: 1, background: "rgba(20,20,15,.18)", pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "rgba(20,20,15,.28)", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", style: { position: "absolute", left: 22, bottom: 30, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("path", { d: "m12 19 7-7 3 3-7 7-3-3z" }), /* @__PURE__ */ React.createElement("path", { d: "m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" }), /* @__PURE__ */ React.createElement("path", { d: "m2 2 7.586 7.586" }), /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "2" }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: clear, style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, background: "none", border: "1px solid " + T.chipBorder, borderRadius: 4, padding: "8px 14px", cursor: "pointer" } }, "Borrar"), /* @__PURE__ */ React.createElement("button", { onClick: () => setBig(true), style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, background: "none", border: "1px solid " + T.accent + "66", borderRadius: 4, padding: "8px 14px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" })), "Firmar en grande")), big && /* @__PURE__ */ React.createElement(SignatureFullscreen, { T, onCancel: () => setBig(false), onCapture: applyBig }));
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
    const entry = () => {
      onCancel && onCancel();
    };
    let usedStack = false;
    if (window.jcEscStack) {
      window.jcEscStack.push(entry);
      usedStack = true;
    }
    const onKey = (ev) => {
      if (ev.key === "Escape") {
        ev.stopPropagation();
        onCancel && onCancel();
      }
    };
    if (!usedStack) window.addEventListener("keydown", onKey, true);
    return () => {
      document.body.style.overflow = prev;
      if (usedStack) {
        const i = window.jcEscStack.lastIndexOf(entry);
        if (i >= 0) window.jcEscStack.splice(i, 1);
      } else window.removeEventListener("keydown", onKey, true);
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
  const btn = (extra) => ({ fontFamily: T.sans, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", borderRadius: 12, padding: "15px 24px", cursor: "pointer", border: "none", transition: "transform .12s ease, opacity .12s ease", ...extra });
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onMouseDown: (e) => {
        if (e.target === e.currentTarget) onCancel && onCancel();
      },
      style: { position: "fixed", inset: 0, zIndex: 9999, background: "rgba(14,13,10,.72)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,48px)", boxSizing: "border-box", animation: "jcFade .2s ease" }
    },
    /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 940, maxHeight: "100%", display: "flex", flexDirection: "column", background: T.bg || "#F7F4ED", borderRadius: 20, boxShadow: "0 40px 90px -30px rgba(10,10,8,.6)", overflow: "hidden", border: "1px solid " + (T.line || "rgba(0,0,0,.08)") } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 14px" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.text || "#26251f", lineHeight: 1.1 } }, "Firma aqu\xED"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute || "#8a8578", marginTop: 3 } }, "Usa tu l\xE1piz \xF3ptico o el mouse \xB7 gira el tel\xE9fono para m\xE1s espacio")), /* @__PURE__ */ React.createElement("button", { onClick: onCancel, title: "Cerrar (Esc)", style: { background: "none", border: "1px solid " + (T.chipBorder || "rgba(0,0,0,.12)"), borderRadius: 999, width: 38, height: 38, color: T.textMute || "#8a8578", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 24px" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: "min(46vh, 380px)", borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid " + (T.line || "rgba(0,0,0,.08)"), boxShadow: "inset 0 1px 4px rgba(20,20,15,.05)" } }, /* @__PURE__ */ React.createElement(
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
    ), !hasInk && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", fontFamily: T.serif, fontSize: 24, color: "#C9C3B5" } }, "Firma aqu\xED"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: "8%", right: "8%", bottom: "26%", height: 1, background: "rgba(20,20,15,.16)", pointerEvents: "none" } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, padding: "16px 24px 22px" } }, /* @__PURE__ */ React.createElement("button", { onClick: clear, style: btn({ flex: "0 0 auto", background: "transparent", color: T.textMute || "#8a8578", border: "1px solid " + (T.chipBorder || "rgba(0,0,0,.14)") }) }, "Borrar"), /* @__PURE__ */ React.createElement("button", { onClick: done, style: btn({ flex: 1, background: T.accent, color: T.onAccent || "#fff", boxShadow: "0 8px 20px -8px " + (T.accent || "#4e8a72") }) }, "Listo")))
  );
}
Object.assign(window, { SignaturePad, SignatureFullscreen, jcExportSignature });
