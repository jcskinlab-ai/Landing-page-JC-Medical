function initials(n) {
  return n.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function jcmDocEsc(s) {
  return ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function jcmDocBrand(proNameOverride) {
  const D = window.JCDATA || {};
  const proName = proNameOverride || window.clinicPro && window.clinicPro() || "";
  const clinName = window.clinicName && window.clinicName() || "Medique";
  const clinAddr = window.clinicAddr && window.clinicAddr() || "";
  const team = window.CADMIN && window.CADMIN.team || [];
  const proMember = team.find((t) => t.name === proName);
  const proRole = proMember && proMember.role || "Medicina est\xE9tica";
  let cfg = {};
  try {
    cfg = window.DB && window.DB.get("cfg") || {};
  } catch (e) {
  }
  const handle = (cfg.clinic_handle || clinName.toLowerCase().replace(/[^a-z0-9.]/g, "")).replace(/^@/, "");
  const wm = (clinName.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("") || "jc").toLowerCase();
  return { proName, clinName, clinAddr, proRole, handle, wm, logoUrl: cfg.clinic_logo || "", markUrl: cfg.clinic_mark || "" };
}
const JCM_DOC_CSS = "@page{size:A4;margin:0}*{box-sizing:border-box;margin:0;padding:0}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}body{font-family:'Jost',system-ui,-apple-system,'Segoe UI',sans-serif;color:#121A26;background:#fff;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}.sheet{width:210mm;min-height:297mm;background:#fff;position:relative;overflow:hidden;padding:17mm 18mm 16mm;display:flex;flex-direction:column}.wm{position:absolute;right:-14mm;bottom:-30mm;font-family:'Cormorant Garamond',serif;font-weight:500;font-style:italic;font-size:340px;line-height:1;color:#121A26;opacity:.030;pointer-events:none;letter-spacing:-.04em}.masthead{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding-bottom:13px;border-bottom:1px solid rgba(18,26,38,.30);position:relative;z-index:1}.brand{display:flex;flex-direction:column;gap:3px}.brand .mono{font-family:'Cormorant Garamond',serif;font-weight:500;font-style:italic;font-size:34px;line-height:.9;color:#121A26;letter-spacing:-.01em}.brand .mh-logo{height:50px;width:auto;max-width:62mm;object-fit:contain}.brand .wordmark{font-family:'Jost',sans-serif;font-weight:400;font-size:9.5px;letter-spacing:.32em;text-transform:lowercase;color:#646A72;padding-left:2px}.clinic{text-align:right;display:flex;flex-direction:column;gap:3px;padding-top:4px}.clinic .name{font-family:'Jost',sans-serif;font-weight:500;font-size:11px;letter-spacing:.09em;color:#121A26}.clinic .line{font-family:'Jost',sans-serif;font-weight:300;font-size:9.5px;color:#646A72;line-height:1.5}.clinic .accent-tag{margin-top:2px;font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#5A748C;font-weight:500}.titleblock{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:18px;position:relative;z-index:1}.eyebrow{font-family:'Jost',sans-serif;font-weight:500;font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:#5A748C;margin-bottom:8px}.doc-title{font-family:'Cormorant Garamond','Times New Roman',serif;font-weight:500;font-size:40px;line-height:.95;color:#121A26;letter-spacing:-.005em;margin:0}.doc-title .it{font-style:italic;font-weight:400}.folio{text-align:right;font-family:'Jost',sans-serif;flex-shrink:0}.folio .k{font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#8B9197;font-weight:500;display:block;margin-bottom:4px}.folio .v{font-size:12px;letter-spacing:.09em;color:#474D56;font-weight:400;font-variant-numeric:tabular-nums}.folio .vbig{font-family:'Jost',sans-serif;font-size:22px;font-weight:300;color:#121A26;letter-spacing:.05em;line-height:1}.pband{margin-top:20px;background:#121A26;color:#F5F6F7;padding:18px 22px;display:flex;align-items:center;gap:26px;position:relative;z-index:1}.pband .pname{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:25px;line-height:1}.pband .pdivider{width:1px;align-self:stretch;background:rgba(245,246,247,.22)}.pband .pfields{display:flex;gap:24px;flex-wrap:wrap}.pfield .k{font-family:'Jost',sans-serif;font-size:7.5px;letter-spacing:.20em;text-transform:uppercase;color:#A4B6C6;font-weight:500;display:block;margin-bottom:4px}.pfield .v{font-family:'Jost',sans-serif;font-size:12px;font-weight:300;color:#F5F6F7;letter-spacing:.09em;font-variant-numeric:tabular-nums}.pband .status{margin-left:auto;display:flex;align-items:center;gap:7px}.pband .status .dot{width:6px;height:6px;border-radius:50%;background:#A4B6C6;box-shadow:0 0 0 3px rgba(164,182,198,.18)}.pband .status .lbl{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#F5F6F7;font-weight:400}.body{flex:1;position:relative;z-index:1}.section{margin-top:22px}.section-head{display:flex;align-items:center;gap:12px;margin-bottom:13px}.section-head .sh-label{font-family:'Jost',sans-serif;font-weight:500;font-size:10px;letter-spacing:.20em;text-transform:uppercase;color:#121A26;white-space:nowrap}.section-head .sh-num{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:15px;color:#5A748C}.section-head .sh-rule{flex:1;height:1px;background:rgba(18,26,38,.14)}.dgrid{display:grid;grid-template-columns:1fr 1fr;gap:0 40px}.dgrid.cols3{grid-template-columns:1fr 1fr 1fr;gap:0 32px}.drow{display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:9px 0;border-bottom:1px solid rgba(18,26,38,.14)}.drow .dk{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:.09em;text-transform:uppercase;color:#8B9197;font-weight:500;white-space:nowrap}.drow .dv{font-family:'Jost',sans-serif;font-size:12.5px;font-weight:300;color:#121A26;text-align:right;letter-spacing:.09em;min-width:30px}.drow .dv.tag{color:#5A748C;font-weight:400}.dfull{padding:11px 0;border-bottom:1px solid rgba(18,26,38,.14);display:flex;align-items:baseline;justify-content:space-between;gap:18px}.dfull .dk{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:.09em;text-transform:uppercase;color:#8B9197;font-weight:500;white-space:nowrap}.dfull .dv{font-family:'Jost',sans-serif;font-size:12.5px;font-weight:300;color:#121A26;text-align:right}.empty-note{border:1px solid rgba(18,26,38,.14);border-left:2px solid #6E8CA6;background:#F1F2F4;padding:14px 18px;font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:15px;color:#646A72}.diag{margin-top:20px;display:flex;align-items:center;gap:18px;padding:16px 20px;border:1px solid rgba(18,26,38,.30);position:relative;z-index:1}.diag .dx-k{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#5A748C;font-weight:500}.diag .dx-v{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:23px;color:#121A26;margin-left:auto;text-align:right}.diag .dx-tick{width:3px;align-self:stretch;background:#6E8CA6;flex-shrink:0}.indlist{list-style:none;margin:6px 0 0;padding:0;counter-reset:ind}.indlist li{display:flex;gap:18px;padding:15px 0;border-bottom:1px solid rgba(18,26,38,.14);counter-increment:ind;align-items:flex-start}.indlist li:last-child{border-bottom:none}.indlist .num{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:22px;color:#5A748C;line-height:1;min-width:26px;flex-shrink:0;font-variant-numeric:tabular-nums;padding-top:2px}.indlist .num:before{content:counter(ind)}.indlist .txt{font-family:'Jost',sans-serif;font-weight:300;font-size:13.5px;line-height:1.5;color:#121A26;padding-top:3px;flex:1}.indlist .txt strong{font-weight:500}.control-note{margin-top:22px;background:#121A26;color:#F5F6F7;padding:18px 22px;display:flex;align-items:center;gap:18px;position:relative;z-index:1}.control-note .cn-icon{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:30px;color:#A4B6C6;line-height:1}.control-note .cn-k{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#A4B6C6;font-weight:500;display:block;margin-bottom:5px}.control-note .cn-v{font-family:'Jost',sans-serif;font-weight:300;font-size:13px;color:#F5F6F7;line-height:1.45}.control-note .cn-v b{font-weight:500}.proc-head{margin-top:20px;display:flex;align-items:center;gap:18px;padding:16px 20px;border:1px solid rgba(18,26,38,.30);position:relative;z-index:1}.proc-head .ph-tick{width:3px;align-self:stretch;background:#6E8CA6;flex-shrink:0}.proc-head .ph-main{display:flex;flex-direction:column;gap:5px;flex:1}.proc-head .ph-k{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#5A748C;font-weight:500}.proc-head .ph-name{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:24px;color:#121A26;line-height:1}.proc-head .ph-name .z{color:#8B9197;font-style:italic;font-size:18px}.proc-head .ph-dose{margin-left:auto;text-align:right;flex-shrink:0}.proc-head .ph-dose .k{display:block;font-family:'Jost',sans-serif;font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#8B9197;font-weight:500;margin-bottom:4px}.proc-head .ph-dose .v{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:19px;color:#121A26;font-variant-numeric:tabular-nums}.trio{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px}.trio .cell{border:1px solid rgba(18,26,38,.14);padding:12px 15px}.trio .ck{display:block;font-family:'Jost',sans-serif;font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#8B9197;font-weight:500;margin-bottom:6px}.trio .cv{font-family:'Jost',sans-serif;font-size:12.5px;font-weight:300;color:#121A26;letter-spacing:.09em}.textbox{font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#3a414b;white-space:pre-wrap;line-height:1.7;margin-top:6px;min-height:40px}.zgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:0 32px}.zrow{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid rgba(18,26,38,.14)}.zrow .zk{font-family:'Jost',sans-serif;font-size:11.5px;font-weight:300;color:#121A26;letter-spacing:.09em}.zrow .zv{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:600;font-size:15px;color:#5A748C;font-variant-numeric:tabular-nums}.totline{display:flex;justify-content:flex-end;align-items:baseline;gap:12px;margin-top:16px}.totline .tk{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#8B9197;font-weight:500}.totline .tv{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:22px;color:#121A26;font-variant-numeric:tabular-nums}.totline .tv b{color:#5A748C;font-weight:600}.signature{margin-top:34px;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;position:relative;z-index:1}.sign-block{min-width:230px}.sign-line{height:1px;background:rgba(18,26,38,.30);margin-bottom:9px}.sign-name{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:18px;color:#121A26}.sign-role{font-family:'Jost',sans-serif;font-weight:400;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#646A72;margin-top:3px}.sign-stamp{text-align:right}.sign-stamp .mark{height:30px;width:auto;opacity:.7}.sign-stamp .mono{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:30px;color:#D3D7DC;line-height:.8;letter-spacing:-.02em}.docfooter{margin-top:14px;padding-top:11px;border-top:1px solid rgba(18,26,38,.14);display:flex;align-items:center;justify-content:space-between;gap:16px;position:relative;z-index:1}.docfooter .f-l,.docfooter .f-r{font-family:'Jost',sans-serif;font-weight:300;font-size:8.5px;letter-spacing:.09em;color:#8B9197}.docfooter .f-r{text-transform:uppercase;letter-spacing:.20em}.docfooter .f-l .fdate{color:#646A72}.sign-meta{font-family:'Jost',sans-serif;font-weight:300;font-size:8.5px;color:#8B9197;margin-top:3px;letter-spacing:.06em}";
function jcmMasthead(b) {
  const e = jcmDocEsc;
  const logoEl = b.logoUrl ? "<img class='mh-logo' src='" + b.logoUrl + "' alt=''>" : "<div class='mono'>" + e(b.clinName) + "</div>";
  return "<header class='masthead'><div class='brand'>" + logoEl + (b.handle ? "<div class='wordmark'>" + e(b.handle) + "</div>" : "") + "</div><div class='clinic'><div class='name'>" + e(b.proName || b.clinName) + "</div>" + (b.proRole ? "<div class='line'>" + e(b.proRole) + "</div>" : "") + (b.clinAddr ? "<div class='line'>" + e(b.clinAddr) + "</div>" : "") + (b.handle ? "<div class='accent-tag'>@" + e(b.handle) + "</div>" : "") + "</div></header>";
}
function jcmPband(patient, fields, estado) {
  const e = jcmDocEsc;
  const fl = (fields || []).filter((f) => f[1]).map((f) => "<div class='pfield'><span class='k'>" + f[0] + "</span><span class='v'>" + e(f[1]) + "</span></div>").join("");
  return "<div class='pband'><div class='pname'>" + e(patient.name || "\u2014") + "</div><div class='pdivider'></div><div class='pfields'>" + fl + "</div>" + (estado ? "<div class='status'><span class='dot'></span><span class='lbl'>" + e(estado) + "</span></div>" : "") + "</div>";
}
function jcmSignFoot(b, proName, docLabel, patientName, fechaLarga, medSig) {
  const e = jcmDocEsc;
  const stamp = b.markUrl ? "<img class='mark' src='" + b.markUrl + "' alt=''>" : "<div class='mono'>" + e(b.wm) + "</div>";
  var medBlock = "";
  if (medSig) {
    var medMeta = [medSig.rut && "RUT " + medSig.rut, medSig.registro && "Reg. " + medSig.registro].filter(Boolean).join(" \xB7 ");
    medBlock = "<div class='sign-block'>" + (medSig.sig ? "<img src='" + medSig.sig + "' style='height:44px;width:auto;display:block;margin-bottom:6px;border-radius:2px'>" : "<div style='height:44px;margin-bottom:6px'></div>") + "<div class='sign-line'></div><div class='sign-name'>" + e(medSig.name) + "</div><div class='sign-role'>M\xE9dico responsable</div>" + (medMeta ? "<div class='sign-meta'>" + e(medMeta) + "</div>" : "") + "</div>";
  }
  return "<div class='signature'><div class='sign-block'><div class='sign-line'></div><div class='sign-name'>" + e(proName || b.clinName) + "</div><div class='sign-role'>" + e(b.proRole) + "</div></div>" + medBlock + "<div class='sign-stamp'>" + stamp + "</div></div><footer class='docfooter'><span class='f-l'>" + e(docLabel) + " \xB7 " + e(patientName) + " \xB7 Emitida <span class='fdate'>" + e(fechaLarga) + "</span></span><span class='f-r'>" + e(b.handle || b.clinName) + "</span></footer>";
}
function jcmDocHTML(title, b, inner) {
  const e = jcmDocEsc;
  return "<!doctype html><html><head><meta charset='utf-8'><title>" + e(title) + "</title><link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap' rel='stylesheet'><style>" + JCM_DOC_CSS + "</style></head><body><div class='sheet'><div class='wm'>" + e(b.wm) + "</div>" + inner + "</div></body></html>";
}
function jcmPrintDoc(title, b, inner) {
  const html = jcmDocHTML(title, b, inner);
  if (window.jcmPrintHTML) window.jcmPrintHTML(html);
  else {
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html + "<script>window.print()<\/script>");
      w.document.close();
    }
  }
}
window._jcmDocDir = window._jcmDocDir || null;
async function jcmSaveDocToFolder(filename, html) {
  filename = (filename || "documento").replace(/[\\/:*?"<>|]+/g, " ").trim() + ".html";
  if (window.showDirectoryPicker) {
    try {
      if (!window._jcmDocDir) window._jcmDocDir = await window.showDirectoryPicker({ mode: "readwrite", id: "medique-indicaciones", startIn: "documents" });
      const dir = window._jcmDocDir;
      if (dir.queryPermission) {
        let p = await dir.queryPermission({ mode: "readwrite" });
        if (p !== "granted" && dir.requestPermission) p = await dir.requestPermission({ mode: "readwrite" });
        if (p !== "granted") {
          window._jcmDocDir = null;
          throw new Error("sin permiso");
        }
      }
      const fh = await dir.getFileHandle(filename, { create: true });
      const w = await fh.createWritable();
      await w.write(html);
      await w.close();
      window.jcmToast && window.jcmToast("Guardado en tu carpeta: " + filename, "ok");
      return true;
    } catch (e) {
      if (e && e.name === "AbortError") return false;
    }
  }
  try {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4e3);
    window.jcmToast && window.jcmToast("Descargado: " + filename + " \xB7 tu navegador no permite elegir carpeta (revisa Descargas).", "info");
    return true;
  } catch (e) {
    return false;
  }
}
if (typeof window !== "undefined") {
  window.jcmDocHTML = jcmDocHTML;
  window.jcmSaveDocToFolder = jcmSaveDocToFolder;
}
var JCM_AVATAR_COLORS = ["#5C7488", "#5E7D6B", "#7C6D9E", "#A06757", "#67768C", "#87734D", "#577B8D", "#996680", "#567C6F", "#896C8C"];
function jcmAvatarColor(name) {
  var s = "" + (name || "?"), h = 0;
  for (var i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
  return JCM_AVATAR_COLORS[h % JCM_AVATAR_COLORS.length];
}
if (typeof window !== "undefined") {
  window.jcmAvatarColor = jcmAvatarColor;
}
function Avatar({ T, name, src, size }) {
  const s = size || 40;
  if (src) return /* @__PURE__ */ React.createElement("img", { src, alt: name, style: { width: s, height: s, borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", flexShrink: 0 } });
  const lux = typeof jcdsLux === "function" && jcdsLux();
  if (lux) {
    const c = jcmAvatarColor(name);
    return /* @__PURE__ */ React.createElement("div", { style: { width: s, height: s, borderRadius: "50%", background: c, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: s * 0.4, color: "#fff", flexShrink: 0, boxShadow: "inset 0 1px 0 rgba(255,255,255,.18)" } }, initials(name));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { width: s, height: s, borderRadius: "50%", background: T.surface2, border: "1px solid " + T.line, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: s * 0.4, color: T.accent, flexShrink: 0 } }, initials(name));
}
function jcdsLux() {
  try {
    return !!(window.JCDS && typeof isLosMedique === "function" && isLosMedique());
  } catch (e) {
    return false;
  }
}
function AdBtn({ T, children, onClick, primary, danger, subtle, full, small, disabled }) {
  const DS = window.JCDS;
  if (!(DS && jcdsLux())) return /* @__PURE__ */ React.createElement("button", { onClick: disabled ? void 0 : onClick, disabled, style: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: full ? "100%" : "auto",
    fontFamily: T.sans,
    fontSize: small ? 10.5 : 11,
    fontWeight: 500,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    padding: small ? "9px 14px" : "13px 20px",
    borderRadius: 4,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    background: primary ? T.primaryBg : "transparent",
    color: primary ? T.primaryText : T.text,
    border: primary ? "none" : "1px solid " + T.chipBorder
  } }, children);
  const glassOn = T.dark ? "rgba(255,255,255,.075)" : "rgba(255,255,255,.55)";
  const glassOff = T.dark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.34)";
  const glassBorder = T.dark ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.7)";
  const glassBlur = { backdropFilter: DS.glassBlur.small, WebkitBackdropFilter: DS.glassBlur.small };
  let bg, color, border, extra = {};
  if (primary && danger) {
    bg = DS.danger;
    color = "#fff";
    border = "none";
  } else if (primary) {
    bg = T.primaryBg || T.accent;
    color = T.primaryText || T.onAccent || "#fff";
    border = "none";
  } else if (danger) {
    bg = "transparent";
    color = DS.danger;
    border = "1px solid " + DS.dangerLine;
  } else if (subtle) {
    bg = glassOff;
    color = T.text;
    border = "1px solid " + glassBorder;
    extra = glassBlur;
  } else {
    bg = glassOff;
    color = T.text;
    border = "1px solid " + glassBorder;
    extra = glassBlur;
  }
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: disabled ? void 0 : onClick,
      disabled,
      onMouseEnter: (e) => {
        if (disabled) return;
        const s = e.currentTarget.style;
        if (primary) {
          s.filter = "brightness(1.07)";
          s.transform = "translateY(-1px)";
          s.boxShadow = "0 6px 16px -6px " + (T.accent || "#000") + "66";
        } else if (danger) s.background = DS.dangerBg;
        else {
          s.background = glassOn;
          s.borderColor = T.accent + "66";
        }
      },
      onMouseLeave: (e) => {
        const s = e.currentTarget.style;
        s.filter = "";
        s.background = bg;
        if (border !== "none") s.border = border;
        s.transform = "";
        if (primary) s.boxShadow = "";
      },
      onMouseDown: (e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(.985)";
      },
      onMouseUp: (e) => {
        e.currentTarget.style.transform = "";
      },
      onFocus: (e) => {
        e.currentTarget.style.boxShadow = DS.focus(T);
      },
      onBlur: (e) => {
        e.currentTarget.style.boxShadow = "";
      },
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: full ? "100%" : "auto",
        height: small ? DS.h.ctlSm : DS.h.ctl,
        padding: small ? "0 12px" : "0 16px",
        boxSizing: "border-box",
        fontFamily: T.sans,
        fontSize: small ? 12 : DS.ft.body,
        fontWeight: 600,
        letterSpacing: ".01em",
        whiteSpace: "nowrap",
        borderRadius: DS.r.ctl,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        outline: "none",
        background: bg,
        color,
        border,
        ...extra,
        transition: DS.trans("background, border-color, box-shadow, transform, opacity, filter")
      }
    },
    children
  );
}
function AdField({ T, label, value, onChange, placeholder, inputMode, error }) {
  const nocap = inputMode === "email" || inputMode === "url";
  const DS = window.JCDS;
  if (!(DS && jcdsLux())) return /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      value,
      inputMode,
      onChange: (e) => onChange(e.target.value),
      placeholder,
      "data-nocap": nocap ? "" : void 0,
      style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }
    }
  ));
  return /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { ...DS.text(T, "label"), display: "block", textTransform: "uppercase", marginBottom: 6 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      value,
      inputMode,
      onChange: (e) => onChange(e.target.value),
      placeholder,
      "data-nocap": nocap ? "" : void 0,
      onFocus: (e) => {
        e.currentTarget.style.borderColor = T.accent;
        e.currentTarget.style.boxShadow = DS.focus(T);
      },
      onBlur: (e) => {
        e.currentTarget.style.borderColor = error ? DS.danger : T.line;
        e.currentTarget.style.boxShadow = "";
      },
      style: { ...DS.ctl(T), width: "100%", background: T.surface, ...error ? { borderColor: DS.danger } : {} }
    }
  ), error && typeof error === "string" && /* @__PURE__ */ React.createElement("span", { style: { display: "block", marginTop: 5, fontFamily: T.sans, fontSize: DS.ft.sub, color: DS.danger } }, error));
}
window.jcEscStack = window.jcEscStack || [];
if (!window._jcEscBound) {
  window._jcEscBound = true;
  window.addEventListener("keydown", function(ev) {
    if (ev.key !== "Escape") return;
    var stack = window.jcEscStack;
    if (stack.length) {
      var fn = stack[stack.length - 1];
      if (typeof fn === "function") {
        ev.stopPropagation();
        fn();
      }
    }
  }, true);
}
function useEscClose(onClose) {
  useEffect(() => {
    if (!onClose) return;
    const entry = onClose;
    window.jcEscStack.push(entry);
    return () => {
      const i = window.jcEscStack.lastIndexOf(entry);
      if (i >= 0) window.jcEscStack.splice(i, 1);
    };
  }, [onClose]);
}
window.useEscClose = useEscClose;
function AdModal({ T, title, onClose, children, footer, wide, huge }) {
  useEscClose(onClose);
  const DS = window.JCDS, lux = DS && jcdsLux();
  return /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(4px)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", paddingTop: "calc(66px + env(safe-area-inset-top,0px))", paddingBottom: "calc(20px + env(safe-area-inset-bottom,0px))", paddingLeft: huge ? 12 : 16, paddingRight: huge ? 12 : 16 } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { width: huge ? "97vw" : "100%", maxWidth: huge ? 1180 : wide ? 720 : 460, maxHeight: "100%", background: T.bg, borderRadius: lux ? DS.r.panel : 16, border: "1px solid " + T.line, boxShadow: lux ? DS.el.overlay : void 0, display: "flex", flexDirection: "column", animation: "jcSlideUp .3s " + T.ease, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: lux ? "16px 20px" : "18px 20px", borderBottom: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: lux ? 20 : 22, fontWeight: lux ? 400 : 300, letterSpacing: lux ? "-.01em" : void 0, color: T.text } }, title), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 4 } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px", overflowY: "auto", flex: 1 } }, children), footer && /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 20px", borderTop: "1px solid " + T.line } }, footer)));
}
function patImgKey(id) {
  return "pimg_" + id;
}
function patImages(p) {
  if (!p) return [];
  try {
    const v = window.DB && window.DB.get(patImgKey(p.id));
    if (Array.isArray(v)) return v;
  } catch (e) {
  }
  return p.images || [];
}
function patConsKey(id) {
  return "pcons_" + id;
}
function cropSignatureDataUrl(dataUrl) {
  return new Promise(function(resolve) {
    if (!dataUrl || typeof dataUrl !== "string") return resolve(dataUrl);
    var img = new Image();
    img.onload = function() {
      try {
        var w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) return resolve(dataUrl);
        var c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        var ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var d = ctx.getImageData(0, 0, w, h).data;
        var minX = w, minY = h, maxX = 0, maxY = 0, found = false;
        for (var y = 0; y < h; y++) {
          for (var x = 0; x < w; x++) {
            var i = (y * w + x) * 4;
            var br = (d[i] + d[i + 1] + d[i + 2]) / 3;
            if (br < 185) {
              found = true;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        if (!found) return resolve(dataUrl);
        var pad = Math.round(Math.max(w, h) * 0.04);
        minX = Math.max(0, minX - pad);
        minY = Math.max(0, minY - pad);
        maxX = Math.min(w, maxX + pad);
        maxY = Math.min(h, maxY + pad);
        var cw = maxX - minX, ch = maxY - minY;
        if (cw < 4 || ch < 4) return resolve(dataUrl);
        var oc = document.createElement("canvas");
        oc.width = cw;
        oc.height = ch;
        oc.getContext("2d").drawImage(img, minX, minY, cw, ch, 0, 0, cw, ch);
        resolve(oc.toDataURL("image/jpeg", 0.9));
      } catch (e) {
        resolve(dataUrl);
      }
    };
    img.onerror = function() {
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
}
function compressImageDataUrl(dataUrl, maxW, q) {
  return new Promise(function(resolve) {
    if (!dataUrl || typeof dataUrl !== "string") return resolve(dataUrl);
    var img = new Image();
    img.onload = function() {
      try {
        var w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) return resolve(dataUrl);
        if (w > maxW) {
          h = Math.round(h * maxW / w);
          w = maxW;
        }
        var c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", q || 0.62));
      } catch (e) {
        resolve(dataUrl);
      }
    };
    img.onerror = function() {
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
}
function patConsents(p) {
  if (!p) return [];
  try {
    var manifest = window.DB && window.DB.get("pconsm_" + p.id);
    if (Array.isArray(manifest) && manifest.length > 0) {
      var items = [];
      manifest.forEach(function(ts) {
        try {
          var c = window.DB.get("pcons_" + p.id + "_" + ts);
          if (c) items.push(c);
        } catch (e2) {
        }
      });
      if (items.length > 0) return items.sort(function(a, b) {
        return (b.ts || 0) - (a.ts || 0);
      });
    }
    var v = window.DB && window.DB.get(patConsKey(p.id));
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
  }
  return p.consents || (p.consentDoc ? [p.consentDoc] : []);
}
function AdTag({ T, tone, children }) {
  const DS = window.JCDS;
  if (!(DS && jcdsLux())) {
    const c = { ok: "#1F8A5B", warn: T.gold, danger: "#C0285A", muted: T.textFaint }[tone] || T.accent;
    return /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: c, border: "1px solid " + c, borderRadius: 999, padding: "4px 9px", whiteSpace: "nowrap" } }, children);
  }
  const m = {
    ok: [DS.ok, DS.okBg, DS.okLine],
    warn: [DS.warn, DS.warnBg, DS.warnLine],
    danger: [DS.danger, DS.dangerBg, DS.dangerLine],
    muted: [T.textMute, "transparent", T.line]
  }[tone] || [T.accent, T.chipBg, T.chipBorder];
  return /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", fontFamily: T.sans, fontSize: DS.ft.eyebrow, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: m[0], background: m[1], border: "1px solid " + m[2], borderRadius: DS.r.pill, padding: "3px 9px", whiteSpace: "nowrap", lineHeight: 1.4 } }, children);
}
function _recitaTs(s) {
  if (!s) return 0;
  s = ("" + s).trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]).getTime();
  m = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})/);
  if (m) {
    let y = +m[3];
    if (y < 100) y += 2e3;
    return new Date(y, +m[2] - 1, +m[1]).getTime();
  }
  const t = Date.parse(s);
  return isNaN(t) ? 0 : t;
}
var JCM_PROC_ABBR = [
  { re: /b3z\s*\+\s*lifting/i, price: 17e4 },
  { re: /\bbff\b|full\s*face/i, price: 35e4 },
  { re: /\bb3z\b|botox\s*3/i, price: 15e4 },
  { re: /sculptra|bioestim|col[aá]g/i, price: 45e4 },
  { re: /\brino\b|rinomodel/i, price: 2e5 },
  { re: /lipol[ií]tic|quemador/i, price: 3e5 },
  { re: /bruxismo/i, price: 24e4 }
];
function jcmProcPrice(name) {
  if (!name) return 0;
  var nm = ("" + name).toLowerCase().trim();
  try {
    var svc = (window.clinicServiceList ? window.clinicServiceList() : []).find((x) => (x.name || "").toLowerCase() === nm);
    if (svc && svc.price) return svc.price;
  } catch (e) {
  }
  for (var i = 0; i < JCM_PROC_ABBR.length; i++) if (JCM_PROC_ABBR[i].re.test(nm)) return JCM_PROC_ABBR[i].price;
  try {
    var svc2 = (window.clinicServiceList ? window.clinicServiceList() : []).find((x) => (x.name || "").toLowerCase().indexOf(nm) >= 0 && x.price);
    if (svc2 && svc2.price) return svc2.price;
  } catch (e) {
  }
  return 0;
}
if (typeof window !== "undefined") window.jcmProcPrice = jcmProcPrice;
function recitaFor(p) {
  const fmtP = (n) => "$" + (n || 0).toLocaleString("es-CL");
  const tag = (p.tags && p.tags[0] || "").toLowerCase();
  const hist = p.history || [];
  const toxRe = /botox|toxina|botul|bruxismo|hiperhidro|gingival|nefertiti|empedrado|\bb3z\b|\bbff\b|full\s*face/i;
  const scuRe = /sculptra|bioestim|col[aá]g|estimul/i;
  const fechado = hist.filter((h) => h && _recitaTs(h.date || h.fecha)).sort((a, b) => _recitaTs(b.date || b.fecha) - _recitaTs(a.date || a.fecha));
  const ahRe = /rino|hialur|armoniz|relleno/i;
  const lastTox = fechado.find((h) => toxRe.test(h.proc || h.title || ""));
  const lastScu = fechado.find((h) => scuRe.test(h.proc || h.title || ""));
  const lastAh = fechado.find((h) => ahRe.test(h.proc || h.title || ""));
  const cand = [
    lastTox && { fam: "toxina", ts: _recitaTs(lastTox.date || lastTox.fecha) },
    lastScu && { fam: "sculptra", ts: _recitaTs(lastScu.date || lastScu.fecha) },
    lastAh && { fam: "rino", ts: _recitaTs(lastAh.date || lastAh.fecha) }
  ].filter(Boolean).sort((a, b) => b.ts - a.ts);
  let pick = cand.length ? cand[0].fam : toxRe.test(tag) ? "toxina" : scuRe.test(tag) ? "sculptra" : ahRe.test(tag) ? "rino" : null;
  if (!pick) return null;
  let umbral, motivo, msg, precio, fam, refTs;
  if (pick === "toxina") {
    fam = "toxina";
    umbral = 3;
    precio = jcmProcPrice(lastTox && (lastTox.proc || lastTox.title) || tag) || 15e4;
    motivo = "Toxina \xB7 refuerzo a 3 meses";
    msg = "te contactamos para ver si deseas renovar tu toxina botul\xEDnica para mantener tu resultado natural";
    refTs = lastTox ? _recitaTs(lastTox.date || lastTox.fecha) : _recitaTs(p.lastVisit);
  } else if (pick === "sculptra") {
    fam = "sculptra";
    umbral = 2;
    precio = jcmProcPrice(lastScu && (lastScu.proc || lastScu.title) || tag) || 45e4;
    const ses = hist.filter((h) => scuRe.test(h.proc || h.title || "")).length || 1;
    if (ses >= 3) return null;
    motivo = "Sculptra \xB7 sesi\xF3n " + (ses + 1) + " de 3 (a 2 meses)";
    msg = "tu siguiente sesi\xF3n de Sculptra potencia y prolonga tu col\xE1geno (vas en la sesi\xF3n " + (ses + 1) + " de 3)";
    refTs = lastScu ? _recitaTs(lastScu.date || lastScu.fecha) : _recitaTs(p.lastVisit);
  } else {
    fam = "rino";
    umbral = 10;
    precio = 0;
    motivo = "Rinomodelaci\xF3n \xB7 mantenci\xF3n a 10 meses";
    msg = "ya es buen momento para evaluar y renovar tu rinomodelaci\xF3n y mantener tu resultado";
    refTs = lastAh ? _recitaTs(lastAh.date || lastAh.fecha) : _recitaTs(p.lastVisit);
  }
  if (!refTs) return null;
  const meses = (Date.now() - refTs) / (1e3 * 60 * 60 * 24 * 30.44);
  const descCfg = (() => {
    try {
      return window.DB && DB.cfg() || {};
    } catch (e) {
      return {};
    }
  })();
  const desc = descCfg.recita_desc_val ? descCfg.recita_desc_tipo === "pct" ? Math.max(0, Math.round(precio * (1 - descCfg.recita_desc_val / 100) / 1e3) * 1e3) : Math.max(0, precio - descCfg.recita_desc_val) : precio > 2e4 ? precio - 2e4 : precio;
  const due = new Date(refTs + umbral * 30.44 * 24 * 60 * 60 * 1e3);
  return { fam, motivo, msg, due, vence: meses >= umbral, precio, desc, precioFmt: fmtP(precio), descFmt: fmtP(desc) };
}
function recitaDue(patients) {
  return (patients || []).map((p) => ({ p, r: recitaFor(p) })).filter((x) => x.r && x.r.vence);
}
function recitaMsg(p, r) {
  let tpl = "";
  try {
    tpl = window.DB && DB.cfg().msg_tpl_recita;
  } catch (e) {
  }
  tpl = tpl && ("" + tpl).trim() || window.DEFAULT_TPL_RECITA;
  const mensaje = r.msg.charAt(0).toUpperCase() + r.msg.slice(1);
  const precio_linea = r.precio ? " El valor actual es de " + r.precioFmt + " y, por ser parte de la cl\xEDnica, te lo dejamos en " + r.descFmt + "." : "";
  return window.fillMsgTpl(tpl, { primernombre: window.jcmFirstName ? window.jcmFirstName(p.name) : (p.name || "").split(" ")[0] || "", clinica: window.clinicName && window.clinicName() || "tu cl\xEDnica", mensaje, precio_linea });
}
function recitaWa(p, r) {
  return "https://wa.me/" + (p.phone || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(recitaMsg(p, r));
}
function PacientesView({ T, patients, appts, onOpen, updatePatient, addPatient }) {
  const [q, setQ] = useState("");
  const [nuevo, setNuevo] = useState(false);
  const [filt, setFilt] = useState("recientes");
  const [openCamp, setOpenCamp] = useState(false);
  const [recitaSent, setRecitaSent] = useState(() => {
    try {
      return window.DB && DB.get("recita_sent") || {};
    } catch (e) {
      return {};
    }
  });
  function recitaSentKey(p, r) {
    return p.id + "_" + (r && r.due ? r.due.getTime() : 0);
  }
  function markRecitaSent(p, r) {
    const key = recitaSentKey(p, r);
    const m = { ...recitaSent, [key]: Date.now() };
    setRecitaSent(m);
    try {
      window.DB && DB.set("recita_sent", m);
    } catch (e) {
    }
  }
  const opened = (() => {
    try {
      return window.DB && DB.get("pat_opened") || {};
    } catch (e) {
      return {};
    }
  })();
  function openPatient(id) {
    try {
      const m = window.DB && DB.get("pat_opened") || {};
      m[id] = Date.now();
      window.DB && DB.set("pat_opened", m);
    } catch (e) {
    }
    onOpen(id);
  }
  const ax = appts || [];
  const meta = (p) => {
    const ag = ax.some((a) => a.name === p.name);
    const comp = (p.history || []).length > 0;
    return { ag, comp, inte: !comp && !ag };
  };
  const ql = q.trim().toLowerCase();
  const qlNorm = ql.replace(/[^0-9k]/g, "");
  let list = patients.filter((p) => {
    if (ql && !(p.name.toLowerCase().includes(ql) || (p.rut || "").toLowerCase().includes(ql) || qlNorm.length >= 3 && (p.rut || "").replace(/[^0-9kK]/g, "").toLowerCase().includes(qlNorm))) return false;
    const m = meta(p);
    if (filt === "agendado" && !m.ag) return false;
    if (filt === "comprado" && !m.comp) return false;
    if (filt === "interesado" && !m.inte) return false;
    return true;
  });
  const apptFechaTs = (p) => {
    let best = 0;
    ax.forEach((a) => {
      if (!(a.patId && a.patId === p.id || a.name === p.name)) return;
      if (!a.fecha) return;
      const ts = (/* @__PURE__ */ new Date(a.fecha + "T00:00:00")).getTime();
      if (!isNaN(ts) && ts > best) best = ts;
    });
    return best;
  };
  const calTs = (p) => apptFechaTs(p) || p.fechaTs || 0;
  if (filt === "calendario") list = list.slice().sort((a, b) => calTs(b) - calTs(a));
  if (filt === "recientes") list = list.slice().sort((a, b) => (opened[b.id] || 0) - (opened[a.id] || 0));
  const fmtFecha = (ts) => ts ? new Date(ts).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" }) : "";
  const fmtVisto = (ts) => ts ? new Date(ts).toLocaleDateString("es-CL", { day: "2-digit", month: "short" }) + ", " + new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }) : "Sin abrir";
  const recitas = patients.map((p) => ({ p, r: recitaFor(p) })).filter((x) => x.r);
  const recitasDue = recitas.filter((x) => x.r.vence);
  const waLink = (p, r) => recitaWa(p, r);
  const fmtD = (d) => d.toLocaleDateString("es-CL", { day: "numeric", month: "short" });
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const chip = (k, l, set, cur) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => set(k), style: luxF ? { fontFamily: T.sans, fontSize: DS.ft.sub, fontWeight: cur === k ? 600 : 500, padding: "8px 14px", borderRadius: DS.r.ctl, cursor: "pointer", border: "none", background: cur === k ? T.surface : "transparent", boxShadow: cur === k ? "0 1px 2px rgba(0,0,0,.08)" : "none", color: cur === k ? T.accent : T.textMute, whiteSpace: "nowrap", transition: DS.trans("background,color,box-shadow") } : { fontFamily: T.sans, fontSize: 11, padding: "7px 12px", borderRadius: 8, cursor: "pointer", border: "1px solid " + (cur === k ? T.accent : T.line), background: cur === k ? T.surface2 : T.surface, color: cur === k ? T.text : T.textMute } }, l);
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 0 20px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", flex: 1 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.6", style: { position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" } }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "M21 21l-4.3-4.3" })), /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nombre o RUT\u2026", style: luxF ? { ...DS.ctl(T), width: "100%", height: DS.h.ctl + 4, padding: "0 14px 0 38px" } : { width: "100%", padding: "12px 14px 12px 38px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" } })), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => setNuevo(true) }, "+ Paciente")), /* @__PURE__ */ React.createElement("div", { style: luxF ? { display: "inline-flex", gap: 2, marginBottom: 10, background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: DS.r.seg, padding: 3, maxWidth: "100%", flexWrap: "wrap" } : { display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", alignItems: "center" } }, chip("recientes", "Recientes", setFilt, filt), chip("calendario", "Calendario", setFilt, filt), chip("todos", "Todos", setFilt, filt), chip("agendado", "Agendado", setFilt, filt), chip("comprado", "Comprado", setFilt, filt), chip("interesado", "Interesado", setFilt, filt)), /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenCamp(!openCamp), style: { width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10, marginBottom: 12, cursor: "pointer", background: recitasDue.length ? "rgba(31,138,91,.08)" : T.surface, border: "1px solid " + (recitasDue.length ? "rgba(31,138,91,.35)" : T.line) } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: recitasDue.length ? "#1F8A5B" : T.textMute, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" })), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, textAlign: "left", fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.text } }, "Campa\xF1as de re-cita por WhatsApp", recitasDue.length ? " \xB7 " + recitasDue.length + " para contactar hoy" : ""), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.6", style: { transform: openCamp ? "rotate(180deg)" : "none", transition: "transform .2s" } }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" }))), openCamp && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 } }, recitasDue.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, padding: "12px 13px", background: T.surface, border: "1px dashed " + T.line, borderRadius: 9, lineHeight: 1.5 } }, "Ning\xFAn paciente cumple hoy su plazo de re-aplicaci\xF3n. Cuando un paciente alcance su ventana (toxina a los 3 meses \xB7 Sculptra a los 2 meses desde su \xFAltima sesi\xF3n), aparecer\xE1 aqu\xED listo para contactar."), recitasDue.sort((a, b) => a.r.due - b.r.due).map(({ p, r }) => {
    const sent = !!recitaSent[recitaSentKey(p, r)];
    return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", borderRadius: 9, background: "rgba(31,138,91,.06)", border: "1px solid rgba(31,138,91,.4)" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, r.motivo, " \xB7 cumpli\xF3 su plazo el ", fmtD(r.due))), /* @__PURE__ */ React.createElement(AdTag, { T, tone: sent ? "ok" : "warn" }, sent ? "Enviado" : "Pendiente"), /* @__PURE__ */ React.createElement("a", { href: waLink(p, r), target: "_blank", rel: "noopener", onClick: () => markRecitaSent(p, r), style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, color: "#1F8A5B", textDecoration: "none", border: "1px solid #1F8A5B", borderRadius: 7, padding: "8px 11px" } }, "WhatsApp"));
  })), luxF && list.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "0 10px 9px", borderBottom: "1px solid " + T.line, marginBottom: 2 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { width: 210, flexShrink: 0, fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint } }, "Paciente \xB7 ", list.length), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint } }, "Contacto"), /* @__PURE__ */ React.createElement("div", { style: { width: 158, flexShrink: 0, fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint } }, "Procedimiento"), /* @__PURE__ */ React.createElement("div", { style: { width: 92, flexShrink: 0, textAlign: "right", fontFamily: T.sans, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint } }, filt === "recientes" ? "Visto" : "\xDAltima cita")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, list.map((p, pi) => {
    const m = meta(p);
    const _hist = p.history || [];
    const lastProc = _hist.length ? (_hist.slice().sort((a, b) => ("" + (b.date || "")).localeCompare("" + (a.date || "")))[0] || {}).proc || "" : "";
    const pill = (text, o) => /* @__PURE__ */ React.createElement("span", { title: o.title || text, style: { display: "inline-flex", alignItems: "center", maxWidth: "100%", fontFamily: T.sans, fontSize: 10, fontWeight: 600, letterSpacing: ".05em", textTransform: o.upper ? "uppercase" : "none", color: o.fg, background: o.bg, border: "1px solid " + o.bd, borderRadius: DS.r.pill, padding: "3px 9px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.5 } }, text);
    const procChip = lastProc ? pill(lastProc, { fg: T.accent, bg: T.chipBg, bd: T.chipBorder, upper: false }) : m.ag ? pill("Agendado", { fg: T.accent, bg: T.chipBg, bd: T.chipBorder, upper: true }) : pill("Interesado", { fg: T.textMute, bg: "transparent", bd: T.line, upper: true });
    const icoPhone = /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.7", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" }));
    const icoMail = /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.7", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "m3 7 9 6 9-6" }));
    if (luxF) return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: p.id,
        onClick: () => openPatient(p.id),
        style: { display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left", padding: "12px 10px", margin: "0 -10px", borderRadius: DS.r.ctl, cursor: "pointer", background: "none", border: "none", borderBottom: "1px solid " + T.lineSoft, transition: DS.trans("background"), ...DS.reveal(pi) },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = T.surface2 || T.surface;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "none";
        }
      },
      /* @__PURE__ */ React.createElement(Avatar, { T, name: p.name, size: 44 }),
      /* @__PURE__ */ React.createElement("div", { style: { width: 210, flexShrink: 0, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 3 } }, p.rut || "Sin RUT", p.age ? " \xB7 " + p.age + " a\xF1os" : "")),
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 } }, p.phone && /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 12, color: T.textMute, whiteSpace: "nowrap" } }, icoPhone, p.phone), p.email && /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 12, color: T.textMute, minWidth: 0 } }, icoMail, /* @__PURE__ */ React.createElement("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, p.email)), !p.phone && !p.email && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, fontStyle: "italic" } }, "Sin contacto")),
      /* @__PURE__ */ React.createElement("div", { style: { width: 158, flexShrink: 0, minWidth: 0, display: "flex", flexWrap: "wrap", gap: 5 } }, procChip, !p.consent && pill("Consent.", { fg: DS.warn, bg: DS.warn + "14", bd: DS.warn + "33", upper: true })),
      /* @__PURE__ */ React.createElement("div", { style: { width: 92, flexShrink: 0, textAlign: "right" } }, filt === "recientes" ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: opened[p.id] ? T.accent : T.textFaint, whiteSpace: "nowrap" } }, fmtVisto(opened[p.id])) : calTs(p) ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.accent, whiteSpace: "nowrap" } }, fmtFecha(calTs(p))) : /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint, whiteSpace: "nowrap" } }, "\u2014"))
    );
    return /* @__PURE__ */ React.createElement("button", { key: p.id, onClick: () => openPatient(p.id), style: { display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left", padding: "14px 6px", cursor: "pointer", background: "none", border: "none", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: p.name, size: 44 }), /* @__PURE__ */ React.createElement("div", { style: { width: 210, flexShrink: 0, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 3 } }, p.rut, p.age ? " \xB7 " + p.age + " a\xF1os" : "")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", gap: 24, alignItems: "center" } }, p.phone && /* @__PURE__ */ React.createElement("div", { style: { width: 150, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 2 } }, "Tel\xE9fono"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, whiteSpace: "nowrap" } }, p.phone)), p.email && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 2 } }, "Correo"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, p.email))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 } }, filt === "recientes" ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: opened[p.id] ? T.accent : T.textFaint, whiteSpace: "nowrap" } }, fmtVisto(opened[p.id])) : calTs(p) ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.accent, whiteSpace: "nowrap" } }, fmtFecha(calTs(p))) : filt === "calendario" ? /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint, whiteSpace: "nowrap" } }, "Sin fecha") : null, p.tags && p.tags[0] && /* @__PURE__ */ React.createElement(AdTag, { T }, p.tags[0]), !p.consent && /* @__PURE__ */ React.createElement(AdTag, { T, tone: "warn" }, "Consent. pend.")));
  }), list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "30px 0", textAlign: "center", fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Sin resultados.")), nuevo && /* @__PURE__ */ React.createElement(NewPatientModal, { T, onClose: () => setNuevo(false), onSave: (p) => {
    addPatient(p);
    setNuevo(false);
  } }));
}
function NewPatientModal({ T, onClose, onSave }) {
  const [f, setF] = useState({ name: "", rut: "", age: "", phone: "+56 9 ", email: "" });
  const onlyLetters = (v) => v.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s.]/g, "");
  function onPhone(v) {
    let d = (v || "").replace(/\D/g, "");
    if (d.indexOf("56") === 0) d = d.slice(2);
    if (d.charAt(0) === "9") d = d.slice(1);
    d = d.slice(0, 8);
    setF({ ...f, phone: "+56 9 " + d });
  }
  const phoneDigits = f.phone.replace(/\D/g, "");
  const rutOk = !f.rut.trim() || (window.jcmValidRut ? window.jcmValidRut(f.rut) : true);
  const emailOk = !f.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim());
  const ok = f.name.trim().length > 2 && phoneDigits.length >= 11 && rutOk && emailOk;
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Nuevo paciente", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave({ ...f, name: f.name.trim(), age: parseInt(f.age, 10) || 0 }) }, "Guardar paciente") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre completo", value: f.name, onChange: (v) => setF({ ...f, name: onlyLetters(v) }), placeholder: "Ej: Valentina P\xE9rez" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.4fr .8fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AdField, { T, label: "RUT", value: f.rut, onChange: (v) => setF({ ...f, rut: window.jcmFmtRut ? window.jcmFmtRut(v) : v }), placeholder: "20.090.534-2" }), f.rut.trim() && !rutOk && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: "#C0285A", marginTop: 5 } }, "RUT inv\xE1lido (revisa el d\xEDgito verificador).")), /* @__PURE__ */ React.createElement(AdField, { T, label: "Edad", value: f.age, onChange: (v) => setF({ ...f, age: v.replace(/\D/g, "").slice(0, 3) }), inputMode: "numeric", placeholder: "32" })), /* @__PURE__ */ React.createElement(AdField, { T, label: "Tel\xE9fono (WhatsApp)", value: f.phone, onChange: onPhone, inputMode: "numeric" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AdField, { T, label: "Correo (opcional)", value: f.email, onChange: (v) => setF({ ...f, email: v }), inputMode: "email", placeholder: "correo@ejemplo.com" }), f.email.trim() && !emailOk && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: "#C0285A", marginTop: 5 } }, "Correo inv\xE1lido."))));
}
function SesionDeleteModal({ T, sesion, onClose, onConfirm }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const team = ((window.CADMIN || {}).team || []).filter((t) => t.active !== false);
  const pro = team.find((t) => t.id === sesion.proId) || team.find((t) => t.name === sesion.proName);
  const cashMatch = (() => {
    try {
      return (window.cashAll ? window.cashAll() : []).find((m) => m.sessionId === sesion.id) || null;
    } catch (e) {
      return null;
    }
  })();
  const [alsoCash, setAlsoCash] = useState(true);
  function go() {
    if (pro && pro.pin) {
      if (pin !== pro.pin) {
        setErr("Clave incorrecta. Solo " + (pro.name || "el profesional") + " puede eliminar su sesi\xF3n.");
        return;
      }
    } else if (pin.length < 1) {
      setErr("Ingresa una clave para confirmar.");
      return;
    }
    if (cashMatch && alsoCash && window.cashDelete) {
      try {
        window.cashDelete(cashMatch.id);
      } catch (e) {
      }
    }
    onConfirm();
  }
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Eliminar sesi\xF3n", onClose, footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: onClose }, "Cancelar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: go }, "Eliminar")) }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5, marginBottom: 12 } }, "Vas a eliminar la sesi\xF3n ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, sesion.proc || "\u2014"), sesion.date ? " del " + sesion.date : "", ". ", sesion.proName ? "Confirma con la clave de " + sesion.proName + "." : "Confirma con la clave del profesional."), cashMatch && /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 12, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: alsoCash, onChange: (e) => setAlsoCash(e.target.checked), style: { marginTop: 2 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, color: T.text, lineHeight: 1.45 } }, "Esta sesi\xF3n gener\xF3 un ingreso de ", /* @__PURE__ */ React.createElement("b", null, window.JCDATA ? window.JCDATA.fmt(cashMatch.amount) : "$" + cashMatch.amount), " en Caja. Tambi\xE9n eliminarlo (si lo desmarcas, el movimiento se queda en Caja sin sesi\xF3n asociada).")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "password",
      value: pin,
      autoFocus: true,
      onChange: (e) => {
        setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
        setErr("");
      },
      onKeyDown: (e) => {
        if (e.key === "Enter") go();
      },
      inputMode: "numeric",
      placeholder: "Clave del profesional",
      style: { width: "100%", padding: "12px 13px", borderRadius: 6, border: "1px solid " + (err ? "#C0285A" : T.line), background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, letterSpacing: ".3em", textAlign: "center", outline: "none" }
    }
  ), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", marginTop: 8 } }, err));
}
function jcmConsentPending(patients, appts) {
  appts = appts || [];
  const rutN = (r) => ("" + (r || "")).replace(/[^0-9kK]/g, "").toLowerCase();
  const telN = (t) => ("" + (t || "")).replace(/\D/g, "").slice(-8);
  const needId = /* @__PURE__ */ new Set(), needNm = /* @__PURE__ */ new Set(), needRut = /* @__PURE__ */ new Set(), needTel = /* @__PURE__ */ new Set();
  (appts || []).forEach(function(a) {
    const st = a.status;
    if (st === "anulada" || st === "cancelada" || st === "no_asistio" || st === "atendida") return;
    if (a.attended) return;
    if (/evaluaci/i.test(a.proc || "")) return;
    if (a.patId) needId.add(a.patId);
    const nm = (a.name || "").toLowerCase().trim();
    if (nm) needNm.add(nm);
    const r = rutN(a.rut);
    if (r.length >= 6) needRut.add(r);
    const t = telN(a.phone);
    if (t.length === 8) needTel.add(t);
  });
  return (patients || []).filter(function(p) {
    if (p.consent) return false;
    if (needId.has(p.id)) return true;
    if (needNm.has((p.name || "").toLowerCase().trim())) return true;
    var r = rutN(p.rut);
    if (r.length >= 6 && needRut.has(r)) return true;
    var t = telN(p.phone);
    if (t.length === 8 && needTel.has(t)) return true;
    return false;
  });
}
if (typeof window !== "undefined") window.jcmConsentPending = jcmConsentPending;
function FichaMedica({ T, patient, updatePatient, removePatient, onBack, onAgendar, initialTab, appts, updateAppt }) {
  const [tab, setTab] = useState(initialTab || "fichaclinica");
  const goTab = (k) => {
    setTab(k);
    try {
      window.jcmSetPatientTab && window.jcmSetPatientTab(patient.id, k);
    } catch (e) {
    }
  };
  useEffect(() => {
    if (tab && tab !== "fichaclinica") {
      try {
        window.jcmSetPatientTab && window.jcmSetPatientTab(patient.id, tab);
      } catch (e) {
      }
    }
  }, []);
  useEffect(() => {
    try {
      if (patient && patient.images && patient.images.length) {
        const key = patImgKey(patient.id);
        const own = window.DB && window.DB.get(key);
        if (!Array.isArray(own)) {
          window.DB.set(key, patient.images);
        }
        if (Array.isArray(window.DB.get(key))) updatePatient(patient.id, { images: [] });
      }
    } catch (e) {
    }
  }, [patient.id]);
  const [newEntry, setNewEntry] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [delSession, setDelSession] = useState(null);
  const [editD, setEditD] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [printPick, setPrintPick] = useState(null);
  const [delInput, setDelInput] = useState("");
  const [portalMod, setPortalMod] = useState(false);
  const points = patient.points || [];
  const _newFeat = !window.jcmNewFeat || window.jcmNewFeat();
  const TABS = [["fichaclinica", "Ficha Cl\xEDnica"], ["mapa", "Mapa facial y antropometr\xEDa"], ["procedimientos", "Procedimientos"], ["imagenes", "Im\xE1genes"], ["consent", "Consentimientos"], ["receta", "Receta / Indicaciones"], ..._newFeat ? [["presupuesto", "Presupuesto"]] : [], ["facturacion", "Atenciones"], ..._newFeat ? [["examenes", "Ex\xE1menes"]] : [], ["campana", "Campa\xF1a"], ["notas", "Notas"], ["ia", "IA"]];
  const estado = patient.estado || "Activo";
  const activo = estado === "Activo";
  const wa = "https://wa.me/" + (patient.phone || "").replace(/\D/g, "");
  function savePoints(pts) {
    updatePatient(patient.id, { points: pts });
  }
  async function imprimirFicha(consentDoc) {
    const c = patient.clinica || {};
    const cv = (k) => window.clinVal ? window.clinVal(c, k) : c[k] || "";
    const hist = patient.history || [];
    const e = jcmDocEsc;
    const b = jcmDocBrand((hist.find((h) => h.proName) || {}).proName);
    const hoy = (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const drow = (k, v, tag) => "<div class='drow'><span class='dk'>" + k + "</span><span class='dv" + (tag ? " tag" : "") + "'>" + (v ? e(v) : "\u2014") + "</span></div>";
    const textBlock = (label, v) => "<div class='dfull' style='flex-direction:column;align-items:stretch;gap:5px'><span class='dk'>" + label + "</span><div class='textbox' style='min-height:0;margin-top:0'>" + (v ? e(v) : "\u2014") + "</div></div>";
    const sesion = (h) => "<div class='dfull' style='flex-direction:column;align-items:stretch;gap:5px'><div style='display:flex;justify-content:space-between;gap:14px;align-items:baseline'><span class='dk'>" + e(h.date || "") + "</span><span class='dv' style='font-weight:400'>" + e(h.proc || "") + (h.units ? " \xB7 " + e(h.units) : "") + "</span></div>" + (h.resumen ? "<div class='textbox' style='min-height:0;margin-top:0'>" + e(h.resumen) + "</div>" : "") + (h.proName ? `<div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:11px;color:#8B9197">Realizado por ` + e(h.proName) + "</div>" : "") + "</div>";
    const _pk = parseFloat(c.peso), _tm = parseFloat(c.talla) / 100;
    const imcTxt = _pk && _tm ? (_pk / (_tm * _tm)).toFixed(1) : "";
    let _n = 0;
    const _R = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
    const N = () => _R[_n++] || String(_n);
    const secHead = (label) => "<div class='section-head'><span class='sh-num'>" + N() + "</span><span class='sh-label'>" + label + "</span><span class='sh-rule'></span></div>";
    let body = "";
    body += "<div class='section'>" + secHead("Antecedentes") + "<div class='dgrid'>" + drow("Alergias", cv("alergias")) + drow("Antecedentes m\xF3rbidos", cv("morbidos")) + drow("Proc. est\xE9ticos previos", cv("esteticos"), true) + drow("Antecedentes quir\xFArgicos", cv("quirurgicos") || c.cirugias) + drow("Medicamentos", cv("medicamentos")) + drow("Correo", patient.email) + "</div></div>";
    if (c.peso || c.talla || imcTxt) body += "<div class='section'>" + secHead("Signos vitales") + "<div class='dgrid cols3'>" + drow("Peso", c.peso ? c.peso + " kg" : "") + drow("Talla", c.talla ? c.talla + " cm" : "") + drow("IMC", imcTxt) + "</div></div>";
    body += "<div class='section'>" + secHead("H\xE1bitos y piel") + "<div class='dgrid cols3'>" + drow("Tabaco", c.tabaco ? c.tabaco + " cig/d\xEDa" : "") + drow("Alcohol", c.alcohol) + drow("Actividad f\xEDsica", c.actividad) + drow("Consumo de agua", c.agua) + drow("Exposici\xF3n solar", c.expsolar) + drow("Bloqueador", c.bloqueador) + drow("Embarazo / lactancia", c.embarazo) + "</div><div class='dfull'><span class='dk'>Cuidados de la piel</span><span class='dv'>" + (cv("skincare") ? e(cv("skincare")) : "\u2014") + "</span></div></div>";
    if ((c.evaluacion || "").trim() || (c.plan || "").trim()) body += "<div class='section'>" + secHead("Evaluaci\xF3n y plan") + textBlock("Evaluaci\xF3n", c.evaluacion) + textBlock("Plan \xB7 tratamientos recomendados", c.plan) + "</div>";
    if (patient.notes) body += "<div class='section'><div class='section-head'><span class='sh-label'>Notas internas</span><span class='sh-rule'></span></div><div class='textbox'>" + e(patient.notes) + "</div></div>";
    body += "<div class='section'>" + secHead("Procedimientos realizados") + (hist.length ? hist.map(sesion).join("") : "<div class='empty-note'>Sin procedimientos registrados a la fecha.</div>") + "</div>";
    let inner = jcmMasthead(b) + "<div class='titleblock'><div><div class='eyebrow'>Documento cl\xEDnico</div><h1 class='doc-title'>Ficha <span class='it'>cl\xEDnica</span></h1></div><div class='folio'><span class='k'>Expediente</span><span class='v'>" + (e((patient.id || "").replace(/[^a-z0-9]/gi, "").slice(-8).toUpperCase()) || "\u2014") + "</span></div></div>" + jcmPband(patient, [["RUT", patient.rut], ["Edad", patient.age ? patient.age + " a\xF1os" : ""], ["Tel\xE9fono", patient.phone]], patient.estado || "Activo") + "<div class='body'>" + body + "</div>" + jcmSignFoot(b, b.proName, "Ficha cl\xEDnica", patient.name, hoy);
    if (consentDoc) {
      const cInner = await jcmConsentInnerHTML(consentDoc, patient);
      inner += "<div style='page-break-before:always;padding-top:4px'><div class='section-head' style='margin-bottom:16px'><span class='sh-label'>Consentimiento informado" + (consentDoc.title ? " \xB7 " + e(consentDoc.title) : "") + "</span><span class='sh-rule'></span></div>" + cInner + "</div>";
    }
    jcmPrintDoc("Ficha cl\xEDnica \xB7 " + e(patient.name), b, inner);
  }
  function startPrintFicha() {
    const consList = (typeof patConsents === "function" ? patConsents(patient) : patient.consents || []) || [];
    if (!consList.length) {
      imprimirFicha(null);
      return;
    }
    setPrintPick(consList);
  }
  function imprimirProc(h) {
    const e = jcmDocEsc;
    const b = jcmDocBrand(h.proName);
    const now = /* @__PURE__ */ new Date();
    const hoy = now.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const parts = (h.date || now.toISOString().slice(0, 10)).split("-");
    const dotDate = (parts[2] || "\u2014") + " \xB7 " + (parts[1] || "\u2014") + " \xB7 " + (parts[0] || "\u2014");
    const cell = (l, v) => "<div class='cell'><span class='ck'>" + l + "</span><span class='cv'>" + (v ? e(v) : "\u2014") + "</span></div>";
    const inner = jcmMasthead(b) + "<div class='titleblock'><div><div class='eyebrow'>Registro de tratamiento</div><h1 class='doc-title'>Procedimiento <span class='it'>realizado</span></h1></div><div class='folio'><span class='k'>Fecha</span><span class='v vbig'>" + e(dotDate) + "</span></div></div>" + jcmPband(patient, [["RUT", patient.rut], ["Edad", patient.age ? patient.age + " a\xF1os" : ""]]) + "<div class='proc-head'><div class='ph-tick'></div><div class='ph-main'><span class='ph-k'>Tratamiento</span><div class='ph-name'>" + e(h.proc || "\u2014") + "</div></div><div class='ph-dose'><span class='k'>Unidades / Dosis</span><span class='v'>" + e(h.units || "\u2014") + "</span></div></div><div class='body'><div class='section'><div class='section-head'><span class='sh-num'>i</span><span class='sh-label'>Insumo</span><span class='sh-rule'></span></div><div class='trio'>" + cell("Lote", h.lote) + cell("Vencimiento", h.venc) + cell("Diluci\xF3n", h.dilucion) + "</div>" + (h.temp ? `<div style="font-family:'Jost',sans-serif;font-size:10px;color:#8B9197;margin-top:8px">Temperatura de conservaci\xF3n: ` + e(h.temp) + "</div>" : "") + "</div><div class='section'><div class='section-head'><span class='sh-num'>ii</span><span class='sh-label'>Resumen de la aplicaci\xF3n</span><span class='sh-rule'></span></div><div class='textbox' style='min-height:60px'>" + (h.resumen ? e(h.resumen) : "\u2014") + "</div>" + (h.units ? "<div class='totline'><span class='tk'>Total aplicado</span><span class='tv'>" + e(h.units) + "</span></div>" : "") + "</div>" + (h.note ? "<div class='section'><div class='section-head'><span class='sh-label'>Notas</span><span class='sh-rule'></span></div><div class='textbox'>" + e(h.note) + "</div></div>" : "") + "</div>" + jcmSignFoot(b, b.proName, "Procedimiento realizado", patient.name, hoy);
    jcmPrintDoc("Procedimiento \xB7 " + e(patient.name), b, inner);
  }
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 0 24px", ...luxF ? { maxWidth: 1180, margin: "0 auto" } : {} } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: T.textMute, fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14, padding: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" })), "Pacientes"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: patient.name, size: luxF ? 56 : 52 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 160 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: luxF ? 30 : 26, fontWeight: luxF ? 400 : 300, letterSpacing: luxF ? "-.01em" : void 0, color: T.text, lineHeight: 1 } }, patient.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: patient.age ? T.accent : T.textFaint, background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + (T.accent + "44"), borderRadius: 999, padding: "3px 11px", whiteSpace: "nowrap" } }, patient.age ? patient.age + " a\xF1os" : "Edad \u2014")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, "CI ", patient.rut), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 11.5, color: activo ? "#1F8A5B" : T.textMute } }, /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: activo ? "#1F8A5B" : T.textFaint } }), estado))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(FAct, { T, href: wa, icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" })) }, "WhatsApp"), /* @__PURE__ */ React.createElement(FAct, { T, href: "mailto:" + (patient.email || ""), icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "m3 7 9 6 9-6" })) }, "Correo"), /* @__PURE__ */ React.createElement(FAct, { T, onClick: async () => {
    const email = (patient.email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      window.jcmToast && window.jcmToast("Este paciente no tiene un correo v\xE1lido en su ficha.", "error");
      return;
    }
    if (!window.mediqueEmail) {
      window.jcmError && window.jcmError("El correo no est\xE1 disponible.");
      return;
    }
    let appts2 = [];
    try {
      appts2 = window.DB && window.DB.get("appointments") || [];
    } catch (e) {
    }
    const d0 = /* @__PURE__ */ new Date();
    const isoT = d0.getFullYear() + "-" + ("0" + (d0.getMonth() + 1)).slice(-2) + "-" + ("0" + d0.getDate()).slice(-2);
    const next = appts2.filter((a) => a.patId === patient.id && a.fecha && a.fecha >= isoT).sort((a, b) => ((a.fecha || "") + (a.time || "")).localeCompare((b.fecha || "") + (b.time || "")))[0];
    const clinic = (() => {
      try {
        return window.DB.cfg().clinic_name || "tu cl\xEDnica";
      } catch (e) {
        return "tu cl\xEDnica";
      }
    })();
    const nombre = (patient.name || "").split(" ")[0] || "";
    const cuando = next ? "el " + (/* @__PURE__ */ new Date(next.fecha + "T00:00:00")).toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" }) + (next.time ? " a las " + next.time : "") + (next.proc ? " (" + next.proc + ")" : "") : "tu pr\xF3xima cita";
    const text = "Hola " + nombre + ",\n\nTe recordamos " + cuando + " en " + clinic + ".\n\nSi necesitas reprogramar, resp\xF3ndenos este correo.\n\n\u2014 " + clinic;
    window.jcmToast && window.jcmToast("Enviando recordatorio\u2026", "info");
    const r = await window.mediqueEmail({ to: email, subject: "Recordatorio de tu cita \xB7 " + clinic, text, replyTo: window.clinicReplyTo && window.clinicReplyTo() });
    if (r && r.ok) window.jcmToast && window.jcmToast("Recordatorio enviado a " + email + ". Revisa la bandeja (y spam).", "ok");
    else if (r && r.configured === false) window.jcmError && window.jcmError("Correo no configurado en el servidor (falta RESEND_API_KEY).", r.error);
    else window.jcmError && window.jcmError("No se pudo enviar el recordatorio", r && r.error || r);
  }, icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" }), /* @__PURE__ */ React.createElement("path", { d: "M13.7 21a2 2 0 0 1-3.4 0" })) }, "Recordatorio"), /* @__PURE__ */ React.createElement(FAct, { T, onClick: () => setEditD(true), icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 20h9" }), /* @__PURE__ */ React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" })) }, "Editar datos"), /* @__PURE__ */ React.createElement(FAct, { T, onClick: () => setPortalMod(true), icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "11", width: "18", height: "10", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V8a5 5 0 0 1 10 0v3" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "16", r: "1.4" })) }, "Portal paciente"), /* @__PURE__ */ React.createElement(FAct, { T, onClick: startPrintFicha, icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M6 9V2h12v7" }), /* @__PURE__ */ React.createElement("rect", { x: "6", y: "13", width: "12", height: "8" }), /* @__PURE__ */ React.createElement("path", { d: "M6 17H3v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5h-3" })) }, "Imprimir ficha"), /* @__PURE__ */ React.createElement(FAct, { T, primary: true, onClick: () => onAgendar && onAgendar(), icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "17", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 9h18M8 2v4M16 2v4" })) }, "Agendar cita"), removePatient && /* @__PURE__ */ React.createElement(FAct, { T, onClick: () => {
    setConfirmDel(true);
    setDelInput("");
  }, icon: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" })) }, "Eliminar"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: luxF ? 14 : 10, margin: luxF ? "22px 0 4px" : "16px 0 4px" } }, [["Edad", patient.age ? patient.age + " a\xF1os" : "\u2014", true], ["Tel\xE9fono", patient.phone || "\u2014", true], ["Email", patient.email || "\u2014", true], ["Estado", estado, false]].map(([l, v, editable], i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: l,
      onClick: editable ? () => setEditD(true) : void 0,
      title: editable ? "Haz clic para editar" : void 0,
      style: luxF ? { ...DS.card(T), padding: "16px 18px", minWidth: 0, cursor: editable ? "pointer" : "default", transition: DS.trans("border-color, transform"), ...DS.reveal(i) } : { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", minWidth: 0, cursor: editable ? "pointer" : "default", transition: "border-color .15s" },
      onMouseEnter: editable ? (e) => {
        e.currentTarget.style.borderColor = T.accent + (luxF ? "66" : "");
      } : void 0,
      onMouseLeave: editable ? (e) => {
        e.currentTarget.style.borderColor = T.line;
      } : void 0
    },
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: luxF ? DS.ft.eyebrow : 9, letterSpacing: luxF ? ".14em" : ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: luxF ? 8 : 5, display: "flex", alignItems: "center", gap: 4 } }, l, editable && /* @__PURE__ */ React.createElement("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" }))),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: luxF ? 14 : 13, fontWeight: luxF ? 500 : 400, color: editable ? T.accent : T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, v)
  ))), /* @__PURE__ */ React.createElement("div", { className: "jc-scroll", style: luxF ? { display: "flex", gap: 2, overflowX: "auto", background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: DS.r.seg, padding: 3, margin: "22px 0 18px" } : { display: "flex", gap: 4, overflowX: "auto", borderBottom: "1px solid " + T.line, margin: "14px 0 18px" } }, TABS.map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => goTab(k), style: luxF ? { flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 13px", background: tab === k ? T.surface : "none", boxShadow: tab === k ? "0 1px 2px rgba(0,0,0,.06)" : "none", border: "none", borderRadius: DS.r.ctl, cursor: "pointer", fontFamily: T.sans, fontSize: DS.ft.sub, fontWeight: tab === k ? 600 : 500, color: tab === k ? T.text : T.textMute, whiteSpace: "nowrap", transition: DS.trans("background,box-shadow,color") } : { flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 14px", background: "none", border: "none", borderBottom: "2px solid " + (tab === k ? T.accent : "transparent"), cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, fontWeight: tab === k ? 600 : 400, color: tab === k ? T.text : T.textMute, whiteSpace: "nowrap" } }, k === "ia" && /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: tab === k ? T.accent : T.textMute, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "4.5", y: "8", width: "15", height: "10", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M12 4.5V8" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "3.4", r: "1.3" })), l))), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, tab === "ia" && /* @__PURE__ */ React.createElement(FichaIATab, { T, patient, go: setTab }), tab === "mapa" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(FaceMap, { T, value: points, onChange: savePoints, patient, updatePatient, readOnly: true })), tab === "fichaclinica" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: luxF ? 12 : 10, marginBottom: luxF ? 20 : 16 } }, [["Notas internas", patient.notes, "#C9A227"], ["Alergias", window.clinVal ? window.clinVal(patient.clinica || {}, "alergias") : (patient.clinica || {}).alergias, "#1F8A5B"], ["Antecedentes", window.clinVal ? window.clinVal(patient.clinica || {}, "morbidos") : (patient.clinica || {}).morbidos, T.accent]].map(([l, v, c], i) => luxF ? /* @__PURE__ */ React.createElement("div", { key: l, style: { ...DS.card(T), padding: "14px 16px", ...DS.reveal(i) } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: 999, background: c, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: DS.ft.eyebrow, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute } }, l)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: DS.ft.sub, color: v ? T.text : T.textFaint, lineHeight: 1.5 } }, v || "Sin registros.")) : /* @__PURE__ */ React.createElement("div", { key: l, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: 999, background: c, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute } }, l)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: v ? T.text : T.textFaint, lineHeight: 1.5 } }, v || "Sin registros.")))), /* @__PURE__ */ React.createElement(FichaClinicaForm, { T, patient, updatePatient })), tab === "imagenes" && /* @__PURE__ */ React.createElement(ImagenesTab, { T, patient, updatePatient }), tab === "consent" && /* @__PURE__ */ React.createElement(ConsentTab, { T, patient, updatePatient }), tab === "receta" && /* @__PURE__ */ React.createElement(RecetaTab, { T, patient, updatePatient }), tab === "presupuesto" && /* @__PURE__ */ React.createElement(PresupuestoTab, { T, patient, updatePatient }), tab === "examenes" && /* @__PURE__ */ React.createElement(ExamenesTab, { T, patient }), tab === "facturacion" && /* @__PURE__ */ React.createElement(FacturacionTab, { T, patient, updatePatient, onOpenSession: (hi) => {
    setEditIdx(hi);
    setViewMode(true);
    setNewEntry(true);
    setTab("procedimientos");
  } }), tab === "campana" && /* @__PURE__ */ React.createElement(CampanaTab, { T, patient, updatePatient }), tab === "procedimientos" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: luxF ? 16 : 12 } }, /* @__PURE__ */ React.createElement("div", { style: luxF ? DS.text(T, "eyebrow") : { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Historial cl\xEDnico"), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: () => {
    setEditIdx(null);
    setViewMode(false);
    setNewEntry(true);
  } }, "+ Sesi\xF3n")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, (patient.history || []).map((h, i) => {
    const meta = [h.lote && "Lote " + h.lote, h.venc && "Vence " + h.venc, h.temp && "Temp. " + h.temp, h.dilucion && "Diluci\xF3n " + h.dilucion].filter(Boolean);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: i,
        style: luxF ? { display: "flex", gap: 14, padding: "14px 10px", margin: "0 -10px", borderRadius: DS.r.ctl, borderBottom: "1px solid " + T.lineSoft, transition: DS.trans("background") } : { display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid " + T.lineSoft },
        onMouseEnter: luxF ? (e) => {
          e.currentTarget.style.background = T.surface2 || T.surface;
        } : void 0,
        onMouseLeave: luxF ? (e) => {
          e.currentTarget.style.background = "none";
        } : void 0
      },
      /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, width: 66, fontFamily: luxF ? T.serif : T.sans, fontSize: luxF ? 13 : 11, color: T.accent } }, h.date),
      /* @__PURE__ */ React.createElement("div", { onClick: () => {
        setEditIdx(i);
        setViewMode(true);
        setNewEntry(true);
      }, style: { flex: 1, borderLeft: "1px solid " + T.line, paddingLeft: 14, cursor: "pointer" }, title: "Ver detalle de la sesi\xF3n" }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, h.proc, " ", h.units && /* @__PURE__ */ React.createElement("span", { style: { color: T.accent, fontWeight: 400 } }, "\xB7 ", h.units)), meta.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 3 } }, meta.join("  \xB7  ")), h.resumen && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, marginTop: 5, lineHeight: 1.5 } }, h.resumen), h.note && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 4, lineHeight: 1.5 } }, h.note), h.proName && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, fontStyle: "italic", marginTop: 5 } }, "Realizado por ", h.proName)),
      /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0, alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
        setEditIdx(i);
        setViewMode(false);
        setNewEntry(true);
      }, title: "Editar sesi\xF3n", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "5px 9px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M12 20h9" }), /* @__PURE__ */ React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" })), "Editar"), /* @__PURE__ */ React.createElement("button", { onClick: () => imprimirProc(h), title: "Imprimir procedimiento", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: T.sans, fontSize: 11, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "5px 9px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M6 9V2h12v7" }), /* @__PURE__ */ React.createElement("rect", { x: "6", y: "13", width: "12", height: "8" }), /* @__PURE__ */ React.createElement("path", { d: "M6 17H3v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5h-3" })), "Imprimir"), /* @__PURE__ */ React.createElement("button", { onClick: () => setDelSession({ h, i }), title: "Eliminar sesi\xF3n", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: T.sans, fontSize: 11, color: "#C0285A", background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "5px 9px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" })), "Eliminar"))
    );
  }), (!patient.history || patient.history.length === 0) && /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 0", fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Sin sesiones registradas.")), newEntry && /* @__PURE__ */ React.createElement(NewEntryModal, { T, patient, updatePatient, startView: viewMode, entry: editIdx != null ? (patient.history || [])[editIdx] : null, onClose: () => {
    setNewEntry(false);
    setEditIdx(null);
    setViewMode(false);
  }, onSave: (e) => {
    const hist = (patient.history || []).slice();
    const editing = editIdx != null;
    const newSessionId = window.jcmUid ? window.jcmUid("s") : "s" + Date.now();
    if (editing) hist[editIdx] = { ...hist[editIdx], ...e };
    else hist.unshift({ id: newSessionId, ...e });
    const patch = { history: hist };
    if (!editing && patient.campaign) patch.campaign = { ...patient.campaign, meta_estado: "compro" };
    updatePatient(patient.id, patch);
    setNewEntry(false);
    setEditIdx(null);
    setViewMode(false);
    if (!editing && (e.cobro || 0) > 0 && window.cashAdd) {
      const _cost = window.jcmInsumoCost ? window.jcmInsumoCost(e.proc) : 0;
      try {
        window.cashAdd({ type: "ingreso", kind: "atencion", amount: e.cobro, cost: _cost, method: e.metodo || "Efectivo", concept: (e.proc || "Atenci\xF3n").trim() + " \xB7 " + (patient.name || ""), patient: patient.name, prof: e.proName || "", sessionId: newSessionId });
      } catch (e3) {
      }
    }
    if (!editing && updateAppt) {
      try {
        const d0 = /* @__PURE__ */ new Date();
        const isoHoy = d0.getFullYear() + "-" + ("0" + (d0.getMonth() + 1)).slice(-2) + "-" + ("0" + d0.getDate()).slice(-2);
        const apptHoy = (appts || []).find((a) => a.patId === patient.id && a.fecha === isoHoy && a.status !== "anulada" && a.status !== "cancelada" && !a.attended && a.status !== "atendida");
        if (apptHoy) updateAppt(apptHoy.id, { status: "atendida", attended: true });
      } catch (e5) {
      }
    }
    try {
      window.jcmToast && window.jcmToast(editing ? "Sesi\xF3n actualizada." : (e.cobro || 0) > 0 ? "Sesi\xF3n registrada \xB7 " + (window.JCDATA ? window.JCDATA.fmt(e.cobro) : "$" + e.cobro) + " a Caja." : "Sesi\xF3n registrada.", "ok");
    } catch (e2) {
    }
  } }), delSession && /* @__PURE__ */ React.createElement(SesionDeleteModal, { T, sesion: delSession.h, onClose: () => setDelSession(null), onConfirm: () => {
    const hist = (patient.history || []).filter((x, idx) => delSession.h && delSession.h.id ? x.id !== delSession.h.id : idx !== delSession.i);
    updatePatient(patient.id, { history: hist });
    setDelSession(null);
    try {
      window.jcmToast && window.jcmToast("Sesi\xF3n eliminada.", "ok");
    } catch (e2) {
    }
  } })), tab === "notas" && /* @__PURE__ */ React.createElement(NotasTab, { T, patient, updatePatient })), editD && /* @__PURE__ */ React.createElement(EditDatosModal, { T, patient, onClose: () => setEditD(false), onSave: (d) => {
    updatePatient(patient.id, d);
    setEditD(false);
  } }), portalMod && /* @__PURE__ */ React.createElement(PortalAdminModal, { T, patient, onClose: () => setPortalMod(false) }), printPick && /* @__PURE__ */ React.createElement(AdModal, { T, title: "Imprimir ficha", onClose: () => setPrintPick(null) }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.55, marginBottom: 14 } }, "Elige un consentimiento para anexarlo ", /* @__PURE__ */ React.createElement("b", null, "completo"), " (texto legal y firmas) al final de la ficha, o imprime solo la ficha."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, printPick.map((doc, i) => {
    const fecha = doc.fecha || (doc.ts ? new Date(doc.ts).toLocaleDateString("es-CL") : "");
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: doc.ts || i,
        onClick: () => {
          setPrintPick(null);
          imprimirFicha(doc);
        },
        style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: T.surface, border: "1px solid " + T.line, cursor: "pointer", textAlign: "left", width: "100%" },
        onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = T.accent + "88";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = T.line;
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, border: "1px solid " + T.accent, borderRadius: 999, padding: "4px 9px", whiteSpace: "nowrap", flexShrink: 0 } }, doc.cat || "Consent."),
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, doc.title || doc.proc || "Consentimiento"), fecha && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, fecha)),
      /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.8", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M9 6l6 6-6 6" }))
    );
  }), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setPrintPick(null);
    imprimirFicha(null);
  }, style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10, background: "transparent", border: "1px dashed " + T.line, cursor: "pointer", textAlign: "left", width: "100%", marginTop: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.textMute } }, "Solo la ficha (sin consentimiento)")))), confirmDel && /* @__PURE__ */ React.createElement(AdModal, { T, title: "Eliminar paciente", onClose: () => {
    setConfirmDel(false);
    setDelInput("");
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.65 } }, "Est\xE1s por eliminar a ", /* @__PURE__ */ React.createElement("b", null, patient.name), " y toda su ficha cl\xEDnica, historial y consentimientos.", " ", /* @__PURE__ */ React.createElement("span", { style: { color: "#C0285A", fontWeight: 600 } }, "Esta acci\xF3n no se puede deshacer.")), /* @__PURE__ */ React.createElement(AdField, { T, label: 'Escribe "ELIMINAR" para confirmar', value: delInput, onChange: (v) => setDelInput(v.toUpperCase()) }), /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => {
        if (delInput !== "ELIMINAR") return;
        removePatient(patient.id);
        setConfirmDel(false);
        if (onBack) onBack();
      },
      style: { padding: "13px", textAlign: "center", borderRadius: 7, fontFamily: T.sans, fontSize: 13, fontWeight: 600, cursor: delInput === "ELIMINAR" ? "pointer" : "not-allowed", background: delInput === "ELIMINAR" ? "#C0285A" : T.lineSoft || T.line, color: delInput === "ELIMINAR" ? "#fff" : T.textFaint, transition: "all .15s" }
    },
    "Eliminar definitivamente"
  ))));
}
function FAct({ T, children, icon, href, onClick, primary }) {
  const st = { display: "inline-flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 11.5, fontWeight: 500, padding: "9px 13px", borderRadius: 8, cursor: "pointer", textDecoration: "none", border: "1px solid " + (primary ? T.accent : T.line), background: primary ? T.accent : T.surface, color: primary ? T.onAccent || "#fff" : T.text };
  const ic = /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, icon);
  return href ? /* @__PURE__ */ React.createElement("a", { href, target: "_blank", rel: "noopener", style: st }, ic, children) : /* @__PURE__ */ React.createElement("button", { onClick, style: st }, ic, children);
}
function EditDatosModal({ T, patient, onClose, onSave }) {
  const PREFIX = "+56 9 ";
  const rawDigits = (patient.phone || "").replace(/\D/g, "");
  let localDigits = rawDigits;
  if (localDigits.indexOf("56") === 0) localDigits = localDigits.slice(2);
  if (localDigits.charAt(0) === "9") localDigits = localDigits.slice(1);
  localDigits = localDigits.slice(0, 8);
  const initPhone = PREFIX + localDigits;
  const [f, setF] = useState({ name: patient.name || "", rut: patient.rut || "", age: patient.age ? "" + patient.age : "", phone: initPhone, email: patient.email || "", estado: patient.estado || "Activo" });
  const rutWarn = f.rut.trim() && !(window.jcmValidRut ? window.jcmValidRut(f.rut) : true);
  const emailOk = !f.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim());
  const phoneDigits = f.phone.replace(/\D/g, "");
  const phoneEmpty = phoneDigits.length <= 3;
  const phoneWarn = !phoneEmpty && phoneDigits.length < 11;
  const ok = f.name.trim().length > 2 && (phoneEmpty || phoneDigits.length >= 11) && emailOk;
  const sel = { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  const lblS = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  function guardaPhone(v) {
    setF({ ...f, phone: v.startsWith(PREFIX) ? v : PREFIX });
  }
  function phoneKeyDown(e) {
    if ((e.key === "Backspace" || e.key === "Delete") && e.target.selectionStart <= PREFIX.length) e.preventDefault();
  }
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Editar datos del paciente", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ok && onSave({ name: f.name.trim(), rut: f.rut.trim(), age: parseInt(f.age, 10) || patient.age, phone: phoneEmpty ? "" : f.phone.trim(), email: f.email.trim(), estado: f.estado }) }, "Guardar cambios") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Nombre completo", value: f.name, onChange: (v) => setF({ ...f, name: v }) }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AdField, { T, label: "CI / RUT", value: f.rut, onChange: (v) => setF({ ...f, rut: window.jcmFmtRut ? window.jcmFmtRut(v) : v }) }), rutWarn && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: "#C9A227", marginTop: 5 } }, "Revisa el d\xEDgito verificador.")), /* @__PURE__ */ React.createElement(AdField, { T, label: "Edad", value: f.age, onChange: (v) => setF({ ...f, age: v.replace(/\D/g, "").slice(0, 3) }), inputMode: "numeric" })), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "Tel\xE9fono m\xF3vil"), /* @__PURE__ */ React.createElement("input", { value: f.phone, onChange: (e) => guardaPhone(e.target.value), onKeyDown: phoneKeyDown, inputMode: "tel", style: sel }), phoneWarn && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: "#C9A227", marginTop: 5 } }, "Falta completar el tel\xE9fono (8 d\xEDgitos) o b\xF3rralo para dejarlo vac\xEDo.")), /* @__PURE__ */ React.createElement(AdField, { T, label: "Correo (opcional)", value: f.email, onChange: (v) => setF({ ...f, email: v }), inputMode: "email" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "Estado"), /* @__PURE__ */ React.createElement("select", { value: f.estado, onChange: (e) => setF({ ...f, estado: e.target.value }), style: { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }, /* @__PURE__ */ React.createElement("option", null, "Activo"), /* @__PURE__ */ React.createElement("option", null, "Inactivo")))));
}
function PortalAdminModal({ T, patient, onClose }) {
  const [state, setState] = useState({ loading: true, status: null, error: "" });
  const [busy, setBusy] = useState(false);
  const [link, setLink] = useState("");
  const [sent, setSent] = useState(null);
  const [copied, setCopied] = useState(false);
  const cloud = !!(window.JCSAAS && window.JCSAAS.enabled);
  const rut = (patient.rut || "").trim();
  function loadStatus() {
    if (!cloud) {
      setState({ loading: false, status: null, error: "" });
      return;
    }
    setState((s) => ({ ...s, loading: true, error: "" }));
    window.mediquePortal("status", { patientId: patient.id }).then((r) => {
      if (r && r.ok) setState({ loading: false, status: r.status, error: "" });
      else setState({ loading: false, status: null, error: r && r.error || "No se pudo consultar el estado." });
    });
  }
  useEffect(() => {
    loadStatus();
  }, []);
  function activate() {
    setBusy(true);
    setLink("");
    setSent(null);
    window.mediquePortal("activate", { patientId: patient.id }).then((r) => {
      setBusy(false);
      if (r && r.ok) {
        setLink(r.link || "");
        setSent(!!r.sent);
        setState((s) => ({ ...s, status: "pending" }));
        try {
          window.jcmToast && window.jcmToast(r.sent ? "Link de acceso enviado por WhatsApp a " + (r.phone || "el paciente") + "." : "Acceso activado. Copia el link y env\xEDalo al paciente.", "ok");
        } catch (e) {
        }
      } else {
        try {
          (window.jcmError || window.jcmToast)(r && r.error || "No se pudo activar el portal.", "error");
        } catch (e) {
        }
      }
    });
  }
  function revoke() {
    setBusy(true);
    window.mediquePortal("revoke", { patientId: patient.id }).then((r) => {
      setBusy(false);
      if (r && r.ok) {
        setState((s) => ({ ...s, status: "revoked" }));
        setLink("");
        setSent(null);
        try {
          window.jcmToast && window.jcmToast("Acceso al portal revocado.", "ok");
        } catch (e) {
        }
      } else try {
        (window.jcmError || window.jcmToast)(r && r.error || "No se pudo revocar.", "error");
      } catch (e) {
      }
    });
  }
  function copyLink() {
    try {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
    }
  }
  const STATUS_META = {
    inactive: { label: "Sin acceso", color: T.textMute, desc: "El paciente a\xFAn no tiene acceso a su ficha." },
    pending: { label: "Pendiente", color: T.gold || "#C9A227", desc: "Acceso autorizado. Falta que el paciente cree su clave desde el link." },
    active: { label: "Activo", color: "#1F8A5B", desc: "El paciente puede entrar con su RUT y su clave a ver su ficha." },
    revoked: { label: "Revocado", color: "#C0285A", desc: "El acceso fue revocado. Puedes volver a activarlo." },
    no_rut: { label: "Falta RUT", color: "#C0285A", desc: "Agrega el RUT del paciente en \u201CEditar datos\u201D antes de activar el portal." }
  };
  const st = state.status && STATUS_META[state.status] ? STATUS_META[state.status] : STATUS_META.inactive;
  const canActivate = cloud && state.status !== "no_rut" && !!rut;
  const boxStyle = { fontFamily: T.sans, fontSize: 12, color: T.text, background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", lineHeight: 1.55 };
  return /* @__PURE__ */ React.createElement(AdModal, { T, title: "Portal del paciente", onClose, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, full: true, onClick: onClose }, "Cerrar") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, lineHeight: 1.55 } }, "Da acceso al paciente para que vea ", /* @__PURE__ */ React.createElement("b", null, "su propia ficha"), " (solo sus procedimientos) desde ", /* @__PURE__ */ React.createElement("b", null, "pacientes.medique.cl"), ", entrando con su ", /* @__PURE__ */ React.createElement("b", null, "RUT"), " y una ", /* @__PURE__ */ React.createElement("b", null, "clave que \xE9l mismo crea"), ". El acceso lo autorizas t\xFA aqu\xED; el paciente recibe un enlace por WhatsApp para crear su clave."), !cloud && /* @__PURE__ */ React.createElement("div", { style: { ...boxStyle, borderColor: "rgba(201,162,39,.4)", background: "rgba(201,162,39,.10)" } }, "El portal del paciente requiere tu cl\xEDnica en la nube (con sesi\xF3n iniciada). En modo local no est\xE1 disponible."), cloud && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, ...boxStyle } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: st.color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, color: st.color } }, state.loading ? "Consultando\u2026" : st.label)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 4 } }, state.loading ? "" : st.desc))), state.error && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: "#C0285A" } }, state.error), link && /* @__PURE__ */ React.createElement("div", { style: { ...boxStyle, borderColor: "rgba(31,138,91,.35)", background: "rgba(31,138,91,.07)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 6 } }, sent ? "Enviado por WhatsApp \xB7 respaldo" : "Env\xEDa este link al paciente"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.text, wordBreak: "break-all", marginBottom: 9 } }, link), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, onClick: copyLink }, copied ? "\u2713 Copiado" : "Copiar link")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, (state.status === "inactive" || state.status === "revoked" || !state.status) && /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, disabled: busy || !canActivate, onClick: activate }, busy ? "Activando\u2026" : "Activar acceso"), (state.status === "pending" || state.status === "active") && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AdBtn, { T, disabled: busy, onClick: activate }, busy ? "Reenviando\u2026" : "Reenviar enlace"), /* @__PURE__ */ React.createElement(AdBtn, { T, danger: true, disabled: busy, onClick: revoke }, "Revocar acceso"))), !rut && state.status !== "no_rut" && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#C0285A" } }, "Agrega el RUT del paciente en \u201CEditar datos\u201D antes de activar el portal."))));
}
function NotasTab({ T, patient, updatePatient }) {
  const [val, setVal] = useState(patient.notes || "");
  const [saved, setSaved] = useState(false);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Notas cl\xEDnicas"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: val,
      onChange: (e) => {
        setVal(e.target.value);
        setSaved(false);
      },
      rows: 7,
      style: { width: "100%", padding: "14px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, lineHeight: 1.6, outline: "none", resize: "vertical" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, small: true, onClick: () => {
    updatePatient(patient.id, { notes: val });
    setSaved(true);
  } }, saved ? "\u2713 Guardado" : "Guardar notas")));
}
function procMapType(proc) {
  const p = (proc || "").toLowerCase();
  if (/botox|toxina|botulín|botul|\bb3z\b|\bbff\b|full\s*face/i.test(p)) return "botox";
  if (/hialur|rino|armoniz|relleno/i.test(p)) return "ah";
  if (/bio|sculptra|col[aá]g|estimul/i.test(p)) return "bio";
  return null;
}
const SESION_TPL_SEED = [
  { id: "stpl_tox3", name: "Toxina botul\xEDnica \xB7 3 zonas", body: "Zonas tratadas: frente, entrecejo y patas de gallo.\n16u frontal\n10u procerus\n10u corrugadores\n10u orbiculares\n\nSin incidentes, no se evidencian hematomas ni reacciones al\xE9rgicas inmediatas." },
  { id: "stpl_eval", name: "Evaluaci\xF3n de control", body: "Se eval\xFAan los procedimientos realizados previamente.\nZona revisada: \nHallazgos: evoluci\xF3n adecuada, sin complicaciones.\nRecomendaci\xF3n: continuar esquema actual / reforzar en la pr\xF3xima sesi\xF3n.\n\nSe conversan expectativas y se resuelven dudas del paciente." }
];
function isEvalSession(proc) {
  return /^evaluaci[oó]n/i.test((proc || "").trim());
}
function sesionTplLoad() {
  try {
    const v = window.DB && DB.get("sesion_resumen_tpls");
    if (Array.isArray(v)) return v;
  } catch (e) {
  }
  return (typeof clinicSeeded === "function" ? clinicSeeded() : true) ? SESION_TPL_SEED : [];
}
function sesionTplSave(v) {
  try {
    window.DB && DB.set("sesion_resumen_tpls", v);
  } catch (e) {
  }
}
function NewEntryModal({ T, entry, onClose, onSave, patient, updatePatient, startView }) {
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const team = ((window.CADMIN || {}).team || []).filter((t) => t.active !== false);
  const isEdit = !!entry;
  const [ro, setRo] = useState(!!startView);
  const [f, setF] = useState(entry ? {
    date: entry.date || today,
    proc: entry.proc || "",
    units: entry.units || "",
    note: entry.note || "",
    proId: entry.proId || (team[0] || {}).id || "",
    proName: entry.proName || (team[0] || {}).name || "",
    lote: entry.lote || "",
    venc: entry.venc || "",
    temp: (entry.temp || "").replace(/\s*°C\s*/g, "").trim(),
    dilucion: entry.dilucion || "",
    resumen: entry.resumen || "",
    recomendados: entry.recomendados || "",
    realizados: entry.realizados || "",
    cobro: entry.cobro != null ? "" + entry.cobro : "",
    metodo: entry.metodo || "Efectivo",
    facePoints: entry.facePoints || []
  } : {
    date: today,
    proc: "",
    units: "",
    note: "",
    proId: (team[0] || {}).id || "",
    proName: (team[0] || {}).name || "",
    lote: "",
    venc: "",
    temp: "",
    dilucion: "",
    resumen: "",
    recomendados: "",
    realizados: "",
    cobro: "",
    metodo: "Efectivo",
    facePoints: []
  });
  function svcPrice(name) {
    try {
      const s = (window.clinicServiceList ? window.clinicServiceList() : []).find((x) => x.name === name);
      return s ? s.price || 0 : 0;
    } catch (e) {
      return 0;
    }
  }
  const origPro = isEdit ? team.find((t) => t.id === (entry.proId || f.proId)) || team.find((t) => t.name === (entry.proName || f.proName)) || team[0] : null;
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [sessionTool, setSessionTool] = useState("aureo");
  const [resTpls, setResTpls] = useState(sesionTplLoad);
  function aplicarTpl(body) {
    setF((prev) => ({ ...prev, resumen: prev.resumen && prev.resumen.trim() ? prev.resumen.replace(/\s*$/, "") + "\n\n" + body : body }));
  }
  async function guardarTpl() {
    const txt = (f.resumen || "").trim();
    if (!txt) {
      setErr("Escribe el resumen antes de guardarlo como plantilla.");
      return;
    }
    const nombre = await (window.jcmPrompt ? window.jcmPrompt("Nombre de la plantilla:", "") : Promise.resolve(window.prompt("Nombre de la plantilla:")));
    if (!nombre || !nombre.trim()) return;
    const next = resTpls.concat([{ id: "stpl_" + Date.now(), name: nombre.trim(), body: txt }]);
    setResTpls(next);
    sesionTplSave(next);
    try {
      window.jcmToast && window.jcmToast("Plantilla guardada.", "ok");
    } catch (e) {
    }
  }
  function submit() {
    if (!f.proc.trim()) {
      setErr("Indica el procedimiento.");
      return;
    }
    if (isEdit) {
      if (!origPro || !origPro.pin) {
        setErr("El profesional que realiz\xF3 esta sesi\xF3n no tiene clave configurada. Def\xEDnela en Equipo.");
        return;
      }
      if (pin !== origPro.pin) {
        setErr("Clave incorrecta. Solo " + origPro.name + " puede confirmar cambios en su sesi\xF3n.");
        return;
      }
    }
    onSave({ ...f, proc: f.proc.trim(), temp: f.temp.trim() ? f.temp.trim() + " \xB0C" : "", cobro: parseInt(("" + (f.cobro || "")).replace(/\D/g, ""), 10) || 0 });
  }
  const setPro = (id) => {
    const p = team.find((t) => t.id === id);
    setF({ ...f, proId: id, proName: p ? p.name : f.proName });
  };
  const sel = { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  const lblS = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  const ta = (rows) => ({ width: "100%", padding: "12px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", resize: "vertical", minHeight: rows * 24 });
  const roDiv = { width: "100%", padding: "12px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word", boxSizing: "border-box" };
  const taField = ({ val, rows, onChange, ph }) => ro ? /* @__PURE__ */ React.createElement("div", { style: roDiv }, val || /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, "\u2014")) : /* @__PURE__ */ React.createElement("textarea", { value: val, onChange, rows, placeholder: ph, style: ta(rows) });
  return /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      wide: true,
      title: ro ? "Detalle de la sesi\xF3n" : isEdit ? "Editar sesi\xF3n" : "Nueva sesi\xF3n",
      onClose,
      footer: ro ? /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => setRo(false) }, "Editar sesi\xF3n") : /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: submit }, isEdit ? "Confirmar cambios" : "Registrar sesi\xF3n")
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13, pointerEvents: ro ? "none" : "auto", opacity: ro ? 0.97 : 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Fecha", value: f.date, onChange: (v) => setF({ ...f, date: v }) }), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "Dosis / cantidad"), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: f.units,
        onChange: (e) => setF({ ...f, units: e.target.value }),
        onKeyDown: (e) => {
          if (e.key === " " && /[uU]$/.test(f.units.trim()) && !f.units.includes("/")) {
            e.preventDefault();
            setF({ ...f, units: f.units.trim() + " / " });
          }
        },
        placeholder: "24U / 1 ml",
        style: sel
      }
    ))), (() => {
      const EVAL_PROC = "Evaluaci\xF3n";
      const svcs = window.clinicServiceList ? window.clinicServiceList() : [];
      const byCat = {};
      svcs.forEach((s) => {
        (byCat[s.cat] = byCat[s.cat] || []).push(s);
      });
      const cats = Object.keys(byCat);
      const known = f.proc === EVAL_PROC || svcs.some((s) => s.name === f.proc);
      const isOther = f.proc && !known;
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "Procedimiento"), /* @__PURE__ */ React.createElement("select", { value: isOther ? "__other__" : f.proc, onChange: (e) => {
        const v = e.target.value;
        const np = v === "__other__" ? " " : v;
        const pr = svcPrice(np);
        setF((prev) => ({ ...prev, proc: np, cobro: !prev.cobro && pr ? "" + pr : prev.cobro }));
      }, style: sel }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecciona un servicio\u2026"), /* @__PURE__ */ React.createElement("option", { value: EVAL_PROC }, "Evaluaci\xF3n / control (sin producto)"), cats.map((c) => /* @__PURE__ */ React.createElement("optgroup", { key: c, label: c }, byCat[c].map((s, i) => /* @__PURE__ */ React.createElement("option", { key: c + i, value: s.name }, s.name)))), /* @__PURE__ */ React.createElement("option", { value: "__other__" }, "Otro (especificar)\u2026"))), isOther && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement(AdField, { T, value: f.proc, onChange: (v) => setF({ ...f, proc: v }), placeholder: "Nombre del procedimiento" })), !svcs.length && /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 } }, "Crea tus tratamientos en la secci\xF3n ", /* @__PURE__ */ React.createElement("b", null, "Servicios"), ' para elegirlos aqu\xED, o usa "Evaluaci\xF3n / control" para sesiones sin producto.'));
    })(), !isEdit && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(31,138,91,.06)", border: "1px solid rgba(31,138,91,.25)", borderRadius: 8, padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 11 } }, "Cobro \xB7 se suma a Caja"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "Cobro (opcional)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", border: "1px solid " + T.line, borderRadius: 4, overflow: "hidden", background: T.surface } }, /* @__PURE__ */ React.createElement("span", { style: { paddingLeft: 13, fontFamily: T.sans, fontSize: 13.5, color: T.textMute, userSelect: "none" } }, "$"), /* @__PURE__ */ React.createElement("input", { value: f.cobro ? Number(("" + f.cobro).replace(/\D/g, "")).toLocaleString("es-CL") : "", onChange: (e) => setF({ ...f, cobro: e.target.value.replace(/\D/g, "") }), inputMode: "numeric", placeholder: "0", style: { flex: 1, padding: "12px 10px", border: "none", background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }))), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "M\xE9todo de pago"), /* @__PURE__ */ React.createElement("select", { value: f.metodo, onChange: (e) => setF({ ...f, metodo: e.target.value }), style: sel }, ["Efectivo", "Transferencia", "D\xE9bito", "Cr\xE9dito", "Otro"].map((m) => /* @__PURE__ */ React.createElement("option", { key: m, value: m }, m))))), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 8 } }, "Si indicas un cobro, se registra como ingreso en ", /* @__PURE__ */ React.createElement("b", null, "Caja"), " y aparece en Reportes y el Dashboard. D\xE9jalo en blanco si no corresponde cobro.")), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "Profesional que realiza"), isEdit ? /* @__PURE__ */ React.createElement("div", { style: { ...sel, color: T.textMute, background: T.surface2 } }, f.proName || "\u2014") : /* @__PURE__ */ React.createElement("select", { value: f.proId, onChange: (e) => setPro(e.target.value), style: sel }, team.map((t) => /* @__PURE__ */ React.createElement("option", { key: t.id, value: t.id }, t.name)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "Procedimiento recomendado"), ro ? /* @__PURE__ */ React.createElement("div", { style: roDiv }, f.recomendados || /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, "\u2014")) : (() => {
      const svcs = window.clinicServiceList ? window.clinicServiceList() : [];
      const byCat = {};
      svcs.forEach((s) => {
        (byCat[s.cat] = byCat[s.cat] || []).push(s);
      });
      const cats = Object.keys(byCat);
      const known = !f.recomendados || f.recomendados === "Evaluaci\xF3n" || svcs.some((s) => s.name === f.recomendados);
      return /* @__PURE__ */ React.createElement("select", { value: f.recomendados, onChange: (e) => setF({ ...f, recomendados: e.target.value }), style: sel }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Sin recomendaci\xF3n"), /* @__PURE__ */ React.createElement("option", { value: "Evaluaci\xF3n" }, "Evaluaci\xF3n / control"), !known && /* @__PURE__ */ React.createElement("option", { value: f.recomendados }, f.recomendados), cats.map((c) => /* @__PURE__ */ React.createElement("optgroup", { key: c, label: c }, byCat[c].map((s, i) => /* @__PURE__ */ React.createElement("option", { key: c + i, value: s.name }, s.name)))));
    })()), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "Procedimientos realizados"), ro ? /* @__PURE__ */ React.createElement("div", { style: roDiv }, f.realizados || /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint } }, "\u2014")) : /* @__PURE__ */ React.createElement("textarea", { value: f.realizados, onChange: (e) => setF({ ...f, realizados: e.target.value }), rows: 3, placeholder: "Lo efectivamente realizado hoy\u2026", style: ta(3) }))), !isEvalSession(f.proc) && /* @__PURE__ */ React.createElement("div", { style: { background: T.surface2, border: "1px solid " + T.line, borderRadius: 8, padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 11 } }, "Producto aplicado"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(AdField, { T, label: "Lote del producto", value: f.lote, onChange: (v) => setF({ ...f, lote: v }), placeholder: "Ej. AB1234" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Fecha de vencimiento", value: f.venc, onChange: (v) => {
      let d = v.replace(/\D/g, "").slice(0, 8);
      let fmt = d.length > 6 ? d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6) : d.length > 4 ? d.slice(0, 4) + "-" + d.slice(4) : d;
      setF({ ...f, venc: fmt });
    }, inputMode: "numeric", placeholder: "2027-03-15 (AAAA-MM-DD)" }), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "Temperatura conserv."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", border: "1px solid " + T.line, borderRadius: 4, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("input", { value: f.temp, onChange: (e) => setF({ ...f, temp: e.target.value.replace(/[^0-9.,–\-]/g, "") }), inputMode: "decimal", placeholder: "2\u20138", style: { flex: 1, padding: "12px 13px", border: "none", background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }), /* @__PURE__ */ React.createElement("span", { style: { paddingRight: 13, fontFamily: T.sans, fontSize: 13.5, color: T.textMute, userSelect: "none", background: T.surface } }, "\xB0C"))), /* @__PURE__ */ React.createElement(AdField, { T, label: "Diluci\xF3n / reconstituci\xF3n", value: f.dilucion, onChange: (v) => setF({ ...f, dilucion: v }), placeholder: "100U en 2,5 ml SF" }))), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { ...lblS, marginBottom: 0 } }, isEvalSession(f.proc) ? "Resumen de la evaluaci\xF3n" : "Resumen de la aplicaci\xF3n"), !ro && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement(
      "select",
      {
        value: "",
        onChange: (e) => {
          const t = resTpls.find((x) => x.id === e.target.value);
          if (t) aplicarTpl(t.body);
          e.target.value = "";
        },
        style: { fontFamily: T.sans, fontSize: 11, padding: "5px 8px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.textMute, outline: "none", maxWidth: 200 }
      },
      /* @__PURE__ */ React.createElement("option", { value: "" }, "Insertar plantilla\u2026"),
      resTpls.map((t) => /* @__PURE__ */ React.createElement("option", { key: t.id, value: t.id }, t.name))
    ), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: guardarTpl, title: "Guardar el resumen actual como plantilla", style: { fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 6, padding: "5px 9px", cursor: "pointer", whiteSpace: "nowrap" } }, "Guardar plantilla"))), taField({ val: f.resumen, rows: 5, onChange: (e) => setF({ ...f, resumen: e.target.value }), ph: isEvalSession(f.proc) ? "Procedimientos revisados, evoluci\xF3n, hallazgos y recomendaci\xF3n\u2026" : "Zonas tratadas, t\xE9cnica, unidades por punto, tolerancia del paciente\u2026" })), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lblS }, "Nota / observaciones"), taField({ val: f.note, rows: 2, onChange: (e) => setF({ ...f, note: e.target.value }), ph: "" })), procMapType(f.proc) === "botox" && /* @__PURE__ */ React.createElement("div", { style: { border: "1px solid " + T.line, borderRadius: 10, padding: "14px", marginTop: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, marginBottom: 12 } }, "Mapa de punci\xF3n \xB7 Toxina botul\xEDnica"), /* @__PURE__ */ React.createElement(PuncionTool, { T, value: f.facePoints || [], onChange: (pts) => setF((prev) => ({ ...prev, facePoints: pts })), patient, updatePatient, lockProduct: "botox" })), !ro && isEdit && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(201,162,39,.08)", border: "1px solid rgba(201,162,39,.4)", borderRadius: 8, padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.text, marginBottom: 8, lineHeight: 1.5 } }, "Para guardar cambios, ingresa la ", /* @__PURE__ */ React.createElement("b", null, "clave de ", f.proName || "el profesional"), ", quien realiz\xF3 este tratamiento."), /* @__PURE__ */ React.createElement("input", { type: "password", value: pin, onChange: (e) => {
      setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
      setErr("");
    }, inputMode: "numeric", placeholder: "Clave del profesional", style: { width: "100%", padding: "12px 13px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, letterSpacing: ".3em", outline: "none", textAlign: "center" } })), err && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#C0285A" } }, err))
  );
}
function SesionDetalle({ T, h, patient, onClose, onEditar, go }) {
  const pts = patient.points || [];
  const ptsCount = Array.isArray(pts) ? pts.length : pts && typeof pts === "object" ? Object.keys(pts).length : 0;
  const fotos = patImages(patient).filter((im) => im.date === h.date || im.proc && h.proc && im.proc.toLowerCase().includes((h.proc || "").toLowerCase().split(" ")[0]));
  const meta = [h.lote && "Lote " + h.lote, h.venc && "Vence " + h.venc, h.temp && "Temp. " + h.temp, h.dilucion && "Diluci\xF3n " + h.dilucion].filter(Boolean);
  const row = (k, v) => v ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { width: 150, flexShrink: 0, fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute } }, k), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.5, whiteSpace: "pre-wrap" } }, v)) : null;
  return /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      wide: true,
      title: "Atenci\xF3n \xB7 " + (h.date || ""),
      onClose,
      footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: onClose }, "Cerrar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: onEditar }, "Editar sesi\xF3n"))
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 22, color: T.text, marginBottom: 4 } }, h.proc, h.units ? " \xB7 " + h.units : ""), h.proName && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12 } }, "Realizado por ", h.proName), row("Dosis / cantidad", h.units), row("Producto", meta.join("  \xB7  ")), row("Procedimientos realizados", h.realizados), row("Procedimientos recomendados", h.recomendados), row("Resumen", h.resumen), row("Observaciones", h.note), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center", padding: "12px 0", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement("div", { style: { width: 150, flexShrink: 0, fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute } }, "Mapa facial"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontFamily: T.sans, fontSize: 13, color: T.text } }, ptsCount, " punto(s) marcado(s)"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      onClose();
      go("mapa");
    }, style: { fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "7px 11px", cursor: "pointer" } }, "Abrir mapa facial")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Fotos asociadas"), fotos.length ? /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 8 } }, fotos.map((im) => /* @__PURE__ */ React.createElement("figure", { key: im.id, style: { margin: 0, borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line } }, im.src ? /* @__PURE__ */ React.createElement("img", { src: im.src, alt: im.label, style: { width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" } }) : /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "4/5", background: T.surface2 } }), /* @__PURE__ */ React.createElement("figcaption", { style: { fontFamily: T.sans, fontSize: 10, color: T.textMute, padding: "6px 8px" } }, im.proc)))) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Sin fotos asociadas a esta fecha. ", /* @__PURE__ */ React.createElement("button", { onClick: () => {
      onClose();
      go("imagenes");
    }, style: { color: T.accent, background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12, textDecoration: "underline", padding: 0 } }, "Ir a Im\xE1genes"))))
  );
}
function ConsentView({ T, patients, updatePatient }) {
  const A = window.JCADMIN;
  const [signing, setSigning] = useState(null);
  const pending = patients.filter((p) => !p.consent);
  const signed = patients.filter((p) => p.consent);
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 0 24px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 } }, "Pendientes de firma (", pending.length, ")"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 } }, pending.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: p.name, size: 38 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute } }, p.tags && p.tags[0])), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: () => setSigning({ patient: p, template: A.consents[0] }) }, "Firmar"))), pending.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textFaint } }, "Todos los pacientes tienen consentimiento firmado.")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 } }, "Firmados"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, signed.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement(Avatar, { T, name: p.name, size: 38 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, p.consentInfo || "Consentimiento informado")), /* @__PURE__ */ React.createElement(AdTag, { T, tone: "ok" }, "Firmado")))), signing && /* @__PURE__ */ React.createElement(
    SignConsentModal,
    {
      T,
      data: signing,
      onClose: () => setSigning(null),
      onSign: (r) => {
        const p = signing.patient;
        const nuevo = { kind: r.tpl.kind, title: r.tpl.title, cat: r.tpl.cat, proc: r.tpl.proc, proc4: r.tpl.proc4, vascular: r.tpl.vascular, body: r.tpl.body, paragraphs: r.tpl.paragraphs, ...r.fields, sigPac: r.sigPac, sigPro: r.sigPro, ts: Date.now() };
        try {
          var _nts = nuevo.ts || Date.now();
          window.DB.set("pcons_" + p.id + "_" + _nts, nuevo);
          var _mf = window.DB.get("pconsm_" + p.id);
          window.DB.set("pconsm_" + p.id, Array.isArray(_mf) ? [_nts].concat(_mf) : [_nts]);
        } catch (e) {
        }
        updatePatient(p.id, { consent: true, consentTs: Date.now(), consentInfo: r.tpl.title + " \xB7 " + r.fields.fecha, aiPhotoConsent: !!r.fields.aiPhotos, consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
        setSigning(null);
      }
    }
  ));
}
const CONSENT_EXCL = [
  "Si estoy embarazada o en per\xEDodo de lactancia materna (S\xF3lo mujeres).",
  "Si tengo historial de enfermedades autoinmunes (Artritis Reumatoide, psoriasis, fiebre reum\xE1tica, lupus eritematoso sist\xE9mico u otras). Si estoy recibiendo tratamiento de inmunoterapia.",
  "Si tengo antecedente de cicatrizaci\xF3n queloide o hipertr\xF3fica, problemas de acn\xE9 o ros\xE1cea o cualquier infecci\xF3n en la zona a tratar.",
  "Diabetes no controlada u otra enfermedad metab\xF3lica no controlada.",
  "Discrasias sangu\xEDneas o alteraciones de la coagulaci\xF3n (anemia aguda, leucemia, porfiria, protrombinemia u otras).",
  "Si previamente me somet\xED a procedimientos con biopol\xEDmeros, puesto que puede desencadenar reacciones inflamatorias e infecciosas."
];
function jcmConsentLegalBody(doc) {
  const esc = (s) => ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const EU = esc(doc.prof || "____________________");
  const p = (n, text) => "<p style='margin:0 0 11px;font-size:12px;line-height:1.6'>" + (n ? "<b>" + n + "</b> " : "") + text + "</p>";
  let body = "";
  if (doc.kind === "custom") {
    let paras = doc.paragraphs;
    if (!paras || !paras.length) {
      try {
        var tmpl = (window.JCADMIN && window.JCADMIN.consents || []).find(function(c) {
          return c.title === doc.title || c.id === doc.id;
        });
        if (tmpl) paras = tmpl.paragraphs;
      } catch (e) {
      }
    }
    (paras || []).forEach(function(pa) {
      body += p(esc(pa.n || ""), esc(pa.t || "").replace(/\{EU\}/g, "<b>" + EU + "</b>"));
    });
    if (!paras || !paras.length) body += p("", "Autorizo a EU <b>" + EU + "</b> a realizar el procedimiento " + esc(doc.proc || "") + ".");
  } else if (doc.kind === "extra") {
    if (doc.proc) body += p("", "Procedimiento: <b>" + esc(doc.proc) + "</b>.");
    body += "<div style='white-space:pre-wrap;font-size:12px;line-height:1.6;margin-bottom:11px'>" + esc(doc.body || "\u2014") + "</div>";
    body += p("", "Autorizo a EU <b>" + EU + "</b> a realizar el procedimiento descrito, habi\xE9ndoseme explicado su naturaleza, alcances y posibles complicaciones. Doy fe de no haber omitido antecedentes cl\xEDnicos.");
  } else if (doc.kind === "toxina") {
    body += p("1.-", "Por el presente documento, autorizo a EU <b>" + EU + '</b> a realizar el procedimiento conocido como "tratamiento cosm\xE9tico para arrugas" mediante la aplicaci\xF3n de Toxina Botul\xEDnica tipo A, producto que al ser utilizado en la musculatura facial de manera adecuada, produce relajamiento de la expresi\xF3n con la disminuci\xF3n de las arrugas de expresi\xF3n. El procedimiento mencionado me ha sido totalmente explicado por el profesional, entendiendo la naturaleza y las consecuencias del mismo. Los siguientes puntos me han sido especialmente aclarados:');
    body += "<p style='margin:0 0 8px 16px;font-size:12px;line-height:1.6'><b>a)</b> En los sitios de la(s) aplicaci\xF3n(es) pueden quedar peque\xF1as marcas transitorias, enrojecimiento de la piel, hematomas, inflamaci\xF3n y efectos no deseados descritos en el prospecto, los mismos son comunes y reversibles.</p>";
    body += "<p style='margin:0 0 11px 16px;font-size:12px;line-height:1.6'><b>b)</b> Todos los pacientes que est\xE9n siendo tratados con antibi\xF3ticos del tipo de espectinomicina o amino gluc\xF3sidos, enfermedades neuromusculares, embarazadas, mujeres en periodos de lactancia, que presenten rellenos con biopol\xEDmeros, siliconas, as\xED como infecci\xF3n o signos de inflamaci\xF3n en los sitios de aplicaci\xF3n no pueden ser sometidos a la aplicaci\xF3n de Toxina Botul\xEDnica.</p>";
    body += p("2.-", "He entendido que la duraci\xF3n de los resultados es variable y reversible, siendo aproximadamente de entre 3 a 6 meses y me ha sido explicado que los efectos comenzar\xE1n a evidenciarse despu\xE9s del cuarto d\xEDa de la aplicaci\xF3n.");
    body += p("3.-", "Soy consciente que la pr\xE1ctica de la medicina no es una ciencia exacta y reconozco que a pesar de que el profesional me ha informado adecuadamente las posibilidades absolutas y relativas de lograr los objetivos indicados en el punto 1, los resultados no pueden ser predecibles.");
    body += p("4.-", "Doy fe de no haber omitido o alterado datos al exponer mis antecedentes cl\xEDnicos.");
    body += p("5.-", "Autorizo el registro del proceso mediante fotograf\xEDas, v\xEDdeos, modelos de estudios y ex\xE1menes complementarios. Los cuales pueden ser utilizados con fines acad\xE9micos en beneficio del progreso y desarrollo de las Ciencias de la Salud (Congresos, cursos, demostraciones, capacitaciones).");
    body += p("6.-", "He le\xEDdo detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional nombrado a realizarme el procedimiento antes explicado.");
  } else {
    body += p("1.-", "Por el presente documento, autorizo a EU <b>" + EU + "</b> a realizar el procedimiento <b>" + esc(doc.proc || "") + "</b>, el cual me fue claramente explicado.");
    body += p("2.-", "Reconozco que pueden existir las siguientes complicaciones temporales: hematomas (moretones), inflamaci\xF3n, dolor leve transitorio, cambios de sensibilidad de la piel, enrojecimiento de la piel, asimetr\xEDas leves, los cuales son comunes y totalmente reversibles." + (doc.vascular ? " Aunque el riesgo es menor al 1% existe la posibilidad de complicaciones graves como: obstrucci\xF3n u oclusi\xF3n vascular, en dicho caso el profesional pondr\xE1 todos los medios a su disposici\xF3n para resolver el cuadro cl\xEDnico de forma eficaz." : ""));
    body += p("3.-", "Estoy consciente que la pr\xE1ctica de la Medicina no es una ciencia exacta y estoy en conocimiento que los resultados del procedimiento no son totalmente predecibles.");
    body += p("4.-", "Entiendo que no puedo ser tratada(o) con " + esc(doc.proc4 || doc.proc || "") + ", en los siguientes casos y confirmo que no padezco ninguno de ellos:");
    body += "<ul style='margin:0 0 11px;padding-left:20px'>" + CONSENT_EXCL.map((e) => "<li style='font-size:12px;line-height:1.6;margin-bottom:5px'>" + esc(e) + "</li>").join("") + "</ul>";
    body += p("5.-", "Autorizo el registro del proceso mediante fotograf\xEDas, v\xEDdeos, modelos de estudios y ex\xE1menes complementarios. Los cuales pueden ser utilizados con fines acad\xE9micos en beneficio del progreso y desarrollo de las Ciencias de la Salud (Demostraciones).");
    body += p("6.-", "Doy fe de no haber omitido o alterado mis antecedentes cl\xEDnicos. Le\xED detenidamente el acta de consentimiento, por lo que autorizo al profesional, para que realice los procedimientos antes explicados en prueba de conformidad con todo lo expuesto.");
  }
  return body;
}
function jcmConsentInnerHTML(doc, patient) {
  const esc = (s) => ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  if (doc && doc.kind === "upload") {
    if (doc.img && doc.fileType !== "pdf") return Promise.resolve("<div style='text-align:center'><img src='" + doc.img + "' style='max-width:100%;max-height:940px;object-fit:contain'/></div>");
    return Promise.resolve("<p style='font-size:12px;color:#444;line-height:1.6'>Consentimiento adjunto como archivo PDF (<b>" + esc(doc.title || "documento") + "</b>). Impr\xEDmelo por separado desde la pesta\xF1a Consentimientos.</p>");
  }
  const body = jcmConsentLegalBody(doc);
  var medicoSig = null;
  try {
    var msList = window.DB.get("medic_sigs");
    if (msList && msList.length) medicoSig = msList[0];
  } catch (_) {
  }
  return Promise.all([cropSignatureDataUrl(doc.sigPac), cropSignatureDataUrl(doc.sigPro)]).then(function(crops) {
    const sp = crops[0], spr = crops[1];
    const numCols = medicoSig ? 3 : 2;
    const sigH = medicoSig ? 130 : 175;
    const cell = (label, img) => "<div><div style='font-size:12px;color:#444;margin-bottom:6px'>" + label + "</div><div style='height:" + sigH + "px;border:1px solid #ddd;border-radius:6px;display:flex;align-items:center;justify-content:center;background:#fff;padding:10px'>" + (img ? "<img src='" + img + "' style='max-height:100%;max-width:100%;object-fit:contain'/>" : "") + "</div></div>";
    return "<div style='color:#111'><div style='text-align:right;font-size:11px;color:#666'>Fecha: " + esc(doc.fecha || "") + "</div><div style='font-size:12px;margin-bottom:6px'>Yo <b>" + esc(doc.nombre || patient && patient.name || "") + "</b></div><div style='font-size:12px;margin-bottom:16px'>Identificado con CI N\xB0 <b>" + esc(doc.ci || patient && patient.rut || "") + "</b> \xB7 Edad <b>" + esc(doc.edad || patient && patient.age || "") + "</b></div>" + body + "<div style='display:grid;grid-template-columns:repeat(" + numCols + ",1fr);gap:18px;margin-top:22px'>" + cell("Firma paciente", sp) + cell("Firma profesional \xB7 " + esc(doc.prof || ""), spr) + (medicoSig ? cell("M\xE9dico responsable \xB7 " + esc(medicoSig.name) + (medicoSig.rut ? " \xB7 RUT " + esc(medicoSig.rut) : "") + (medicoSig.registro ? " \xB7 Reg. " + esc(medicoSig.registro) : ""), medicoSig.sig) : "") + "</div></div>";
  });
}
function ConsentDoc({ T, tpl, prof }) {
  const P = ({ n, children }) => /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 11px", fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text } }, /* @__PURE__ */ React.createElement("b", null, n), " ", children);
  const EU = prof || "____________________";
  if (tpl.kind === "custom") {
    let paras = tpl.paragraphs;
    if (!paras || !paras.length) {
      try {
        const tmpl = (window.JCADMIN && window.JCADMIN.consents || []).find((c) => c.title === tpl.title || c.id === tpl.id);
        if (tmpl) paras = tmpl.paragraphs;
      } catch (e) {
      }
    }
    const renderT = (t) => {
      const parts = t.split("{EU}");
      if (parts.length === 1) return t;
      return parts.reduce((a, p, i) => i < parts.length - 1 ? [...a, p, /* @__PURE__ */ React.createElement("b", { key: i }, EU)] : [...a, p], []);
    };
    return /* @__PURE__ */ React.createElement("div", null, (paras || []).map((p, i) => /* @__PURE__ */ React.createElement(P, { key: i, n: p.n }, renderT(p.t))));
  }
  if (tpl.kind === "extra") return /* @__PURE__ */ React.createElement("div", null, tpl.proc && /* @__PURE__ */ React.createElement(P, { n: "" }, "Procedimiento: ", /* @__PURE__ */ React.createElement("b", null, tpl.proc), "."), /* @__PURE__ */ React.createElement("div", { style: { whiteSpace: "pre-wrap", fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text } }, tpl.body || "\u2014"), /* @__PURE__ */ React.createElement(P, { n: "" }, "Autorizo a EU ", /* @__PURE__ */ React.createElement("b", null, EU), " a realizar el procedimiento descrito, habi\xE9ndoseme explicado su naturaleza, alcances y posibles complicaciones. Doy fe de no haber omitido antecedentes cl\xEDnicos."));
  if (tpl.kind === "toxina") return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(P, { n: "1.-" }, "Por el presente documento, autorizo a EU ", /* @__PURE__ */ React.createElement("b", null, EU), " a realizar el procedimiento conocido como \u201Ctratamiento cosm\xE9tico para arrugas\u201D mediante la aplicaci\xF3n de Toxina Botul\xEDnica tipo A, producto que al ser utilizado en la musculatura facial de manera adecuada, produce relajamiento de la expresi\xF3n con la disminuci\xF3n de las arrugas de expresi\xF3n. El procedimiento mencionado me ha sido totalmente explicado por el profesional, entendiendo la naturaleza y las consecuencias del mismo. Los siguientes puntos me han sido especialmente aclarados:"), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 8px 16px", fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text } }, /* @__PURE__ */ React.createElement("b", null, "a)"), " En los sitios de la(s) aplicaci\xF3n(es) pueden quedar peque\xF1as marcas transitorias, enrojecimiento de la piel, hematomas, inflamaci\xF3n y efectos no deseados descritos en el prospecto, los mismos son comunes y reversibles."), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 11px 16px", fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text } }, /* @__PURE__ */ React.createElement("b", null, "b)"), " Todos los pacientes que est\xE9n siendo tratados con antibi\xF3ticos del tipo de espectinomicina o amino gluc\xF3sidos, enfermedades neuromusculares, embarazadas, mujeres en periodos de lactancia, que presenten rellenos con biopol\xEDmeros, siliconas, as\xED como infecci\xF3n o signos de inflamaci\xF3n en los sitios de aplicaci\xF3n no pueden ser sometidos a la aplicaci\xF3n de Toxina Botul\xEDnica."), /* @__PURE__ */ React.createElement(P, { n: "2.-" }, "He entendido que la duraci\xF3n de los resultados es variable y reversible, siendo aproximadamente de entre 3 a 6 meses y me ha sido explicado que los efectos comenzar\xE1n a evidenciarse despu\xE9s del cuarto d\xEDa de la aplicaci\xF3n."), /* @__PURE__ */ React.createElement(P, { n: "3.-" }, "Soy consciente que la pr\xE1ctica de la medicina no es una ciencia exacta y reconozco que a pesar de que el profesional me ha informado adecuadamente las posibilidades absolutas y relativas de lograr los objetivos indicados en el punto 1, los resultados no pueden ser predecibles."), /* @__PURE__ */ React.createElement(P, { n: "4.-" }, "Doy fe de no haber omitido o alterado datos al exponer mis antecedentes cl\xEDnicos."), /* @__PURE__ */ React.createElement(P, { n: "5.-" }, "Autorizo el registro del proceso mediante fotograf\xEDas, v\xEDdeos, modelos de estudios y ex\xE1menes complementarios. Los cuales pueden ser utilizados con fines acad\xE9micos en beneficio del progreso y desarrollo de las Ciencias de la Salud (Congresos, cursos, demostraciones, capacitaciones)."), /* @__PURE__ */ React.createElement(P, { n: "6.-" }, "He le\xEDdo detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional nombrado a realizarme el procedimiento antes explicado."));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(P, { n: "1.-" }, "Por el presente documento, autorizo a EU ", /* @__PURE__ */ React.createElement("b", null, EU), " a realizar el procedimiento ", /* @__PURE__ */ React.createElement("b", null, tpl.proc), ", el cual me fue claramente explicado."), /* @__PURE__ */ React.createElement(P, { n: "2.-" }, "Reconozco que pueden existir las siguientes complicaciones temporales: hematomas (moretones), inflamaci\xF3n, dolor leve transitorio, cambios de sensibilidad de la piel, enrojecimiento de la piel, asimetr\xEDas leves, los cuales son comunes y totalmente reversibles.", tpl.vascular ? " Aunque el riesgo es menor al 1% existe la posibilidad de complicaciones graves como: obstrucci\xF3n u oclusi\xF3n vascular, en dicho caso el profesional pondr\xE1 todos los medios a su disposici\xF3n para resolver el cuadro cl\xEDnico de forma eficaz." : ""), /* @__PURE__ */ React.createElement(P, { n: "3.-" }, "Estoy consciente que la pr\xE1ctica de la Medicina no es una ciencia exacta y estoy en conocimiento que los resultados del procedimiento no son totalmente predecibles."), /* @__PURE__ */ React.createElement(P, { n: "4.-" }, "Entiendo que no puedo ser tratada(o) con ", tpl.proc4 || tpl.proc, ", en los siguientes casos y confirmo que no padezco ninguno de ellos:"), /* @__PURE__ */ React.createElement("ul", { style: { margin: "0 0 11px", paddingLeft: 20 } }, CONSENT_EXCL.map((e, i) => /* @__PURE__ */ React.createElement("li", { key: i, style: { fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text, marginBottom: 5 } }, e))), /* @__PURE__ */ React.createElement(P, { n: "5.-" }, "Autorizo el registro del proceso mediante fotograf\xEDas, v\xEDdeos, modelos de estudios y ex\xE1menes complementarios. Los cuales pueden ser utilizados con fines acad\xE9micos en beneficio del progreso y desarrollo de las Ciencias de la Salud (Demostraciones)."), /* @__PURE__ */ React.createElement(P, { n: "6.-" }, "Doy fe de no haber omitido o alterado mis antecedentes cl\xEDnicos. Le\xED detenidamente el acta de consentimiento, por lo que autorizo al profesional, para que realice los procedimientos antes explicados en prueba de conformidad con todo lo expuesto."));
}
function SignConsentModal({ T, data, onClose, onSign }) {
  const A = window.JCADMIN;
  const customTpls = function() {
    try {
      return (window.DB && window.DB.get("consent_templates") || []).filter((t) => t && t.active !== false && (t.title || "").trim()).map((t) => ({ id: t.id, title: t.title, kind: "extra", proc: t.cat || "", body: t.body || "" }));
    } catch (e) {
      return [];
    }
  }();
  const allTpls = customTpls.concat(A.consents || []);
  const [tpl, setTpl] = useState(data.template);
  const [nombre, setNombre] = useState(data.patient.name || "");
  const [ci, setCi] = useState(data.patient.rut || "");
  const [edad, setEdad] = useState(data.patient.age ? "" + data.patient.age : "");
  const [prof, setProf] = useState(window.clinicPro && window.clinicPro() || "");
  const [fecha, setFecha] = useState((/* @__PURE__ */ new Date()).toLocaleDateString("es-CL"));
  const [sigPac, setSigPac] = useState(null);
  const [sigPro, setSigPro] = useState(null);
  const [agree, setAgree] = useState(false);
  const [aiPhotos, setAiPhotos] = useState(false);
  const ready = agree && sigPac && sigPro;
  const uline = { border: "none", borderBottom: "1px solid " + T.textMute, background: "transparent", color: T.text, fontFamily: T.sans, fontSize: 12, padding: "2px 4px", outline: "none" };
  return /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      title: "Consentimiento informado",
      onClose,
      wide: true,
      footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: () => ready && onSign({ tpl, sigPac, sigPro, fields: { nombre, ci, edad, prof, fecha, aiPhotos } }) }, ready ? "Confirmar y guardar consentimiento firmado" : "Acepta y firma (paciente y enfermero) para continuar")
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" } }, allTpls.map((c) => /* @__PURE__ */ React.createElement("button", { key: c.id, onClick: () => setTpl(c), style: { fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".06em", padding: "8px 12px", borderRadius: 8, cursor: "pointer", background: tpl.id === c.id ? T.surface2 : T.surface, color: tpl.id === c.id ? T.text : T.textMute, border: "1px solid " + (tpl.id === c.id ? T.accent : T.line) } }, c.title))),
    /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", border: "1px solid " + T.line, borderRadius: 8, padding: "22px 24px", maxHeight: 360, overflowY: "auto", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", fontFamily: T.sans, fontSize: 12, color: "#111", marginBottom: 6 } }, "Fecha: ", /* @__PURE__ */ React.createElement("input", { value: fecha, onChange: (e) => setFecha(e.target.value), style: { ...uline, color: "#111", borderColor: "#999", width: 100 } })), /* @__PURE__ */ React.createElement("h2", { style: { textAlign: "center", fontFamily: T.serif, fontWeight: 400, fontSize: 22, color: "#111", margin: "4px 0 18px" } }, "Consentimiento informado"), /* @__PURE__ */ React.createElement("div", { style: { color: "#111" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8, fontFamily: T.sans, fontSize: 12 } }, "Yo ", /* @__PURE__ */ React.createElement("input", { value: nombre, onChange: (e) => setNombre(e.target.value), style: { ...uline, color: "#111", borderColor: "#999", width: 300 } })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16, fontFamily: T.sans, fontSize: 12 } }, "Identificado con CI N\xB0 ", /* @__PURE__ */ React.createElement("input", { value: ci, onChange: (e) => setCi(e.target.value), style: { ...uline, color: "#111", borderColor: "#999", width: 160 } }), " \xA0 Edad ", /* @__PURE__ */ React.createElement("input", { value: edad, onChange: (e) => setEdad(e.target.value), style: { ...uline, color: "#111", borderColor: "#999", width: 56 } })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14, fontFamily: T.sans, fontSize: 12 } }, "Profesional (EU): ", /* @__PURE__ */ React.createElement("input", { value: prof, onChange: (e) => setProf(e.target.value), style: { ...uline, color: "#111", borderColor: "#999", width: 220 } })), tpl.kind === "extra" && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 } }, "Procedimiento"), /* @__PURE__ */ React.createElement("input", { value: tpl.proc || "", onChange: (e) => setTpl({ ...tpl, proc: e.target.value }), placeholder: "Nombre del procedimiento", style: { width: "100%", fontFamily: T.sans, fontSize: 13, padding: "9px 11px", borderRadius: 6, border: "1px solid #bbb", color: "#111", outline: "none", marginBottom: 10, boxSizing: "border-box" } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 } }, "Texto del consentimiento"), /* @__PURE__ */ React.createElement("textarea", { value: tpl.body || "", onChange: (e) => setTpl({ ...tpl, body: e.target.value }), rows: 6, placeholder: "Redacta el consentimiento extraordinario\u2026", style: { width: "100%", fontFamily: T.sans, fontSize: 13, lineHeight: 1.6, padding: "10px 12px", borderRadius: 6, border: "1px solid #bbb", color: "#111", outline: "none", resize: "vertical", boxSizing: "border-box" } })), /* @__PURE__ */ React.createElement("div", { style: { "--c": "#111" } }, /* @__PURE__ */ React.createElement(ConsentDocDark, { T, tpl, prof })))),
    /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setAgree(!agree), style: { flexShrink: 0, width: 20, height: 20, borderRadius: 4, border: "1px solid " + (agree ? T.accent : T.chipBorder), background: agree ? T.accent : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, agree && /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: T.onAccent, strokeWidth: "2.4" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, lineHeight: 1.5 } }, "El paciente declara haber le\xEDdo y aceptado este consentimiento informado.")),
    /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setAiPhotos(!aiPhotos), style: { flexShrink: 0, width: 20, height: 20, borderRadius: 4, border: "1px solid " + (aiPhotos ? T.accent : T.chipBorder), background: aiPhotos ? T.accent : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" } }, aiPhotos && /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: T.onAccent, strokeWidth: "2.4" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, lineHeight: 1.5 } }, "Adem\xE1s, ", /* @__PURE__ */ React.createElement("strong", null, "autorizo"), " (opcional, no es requisito para atenderme) el uso de mis fotograf\xEDas cl\xEDnicas con fines de an\xE1lisis asistido por inteligencia artificial. Puedo cambiar esta decisi\xF3n cuando quiera, avisando a la cl\xEDnica.")),
    /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Firma paciente"), /* @__PURE__ */ React.createElement(SignaturePad, { T, onChange: setSigPac, height: 170 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Firma enfermero"), /* @__PURE__ */ React.createElement(SignaturePad, { T, onChange: setSigPro, height: 170 })))
  );
}
function ConsentDocDark({ T, tpl, prof }) {
  const TT = { ...T, text: "#111", sans: T.sans };
  return /* @__PURE__ */ React.createElement(ConsentDoc, { T: TT, tpl, prof });
}
function ConsentTab({ T, patient, updatePatient }) {
  const [signing, setSigning] = useState(false);
  const [tpl0, setTpl0] = useState(null);
  const [openDoc, setOpenDoc] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [delPin, setDelPin] = useState("");
  const [delErr, setDelErr] = useState("");
  const [uploading, setUploading] = useState(false);
  const [upDataUrl, setUpDataUrl] = useState(null);
  const [upIsPdf, setUpIsPdf] = useState(false);
  const [upTitle, setUpTitle] = useState("");
  const [upFecha, setUpFecha] = useState(() => {
    const d = /* @__PURE__ */ new Date();
    return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + String(d.getFullYear()).slice(-2);
  });
  const [upBusy, setUpBusy] = useState(false);
  const upInputRef = useRef(null);
  const A = window.JCADMIN;
  const consKey = patConsKey(patient.id);
  const [consents, setConsentsState] = useState(() => patConsents(patient));
  useEffect(() => {
    setConsentsState(patConsents(patient));
    try {
      var hasManifest = Array.isArray(window.DB && window.DB.get("pconsm_" + patient.id));
      if (!hasManifest) {
        var old = window.DB && window.DB.get(consKey);
        var legacy = patient.consents || (patient.consentDoc ? [patient.consentDoc] : []);
        var toMigrate = Array.isArray(old) && old.length > 0 ? old : legacy;
        if (toMigrate.length > 0) {
          var mf = [];
          toMigrate.forEach(function(c, i) {
            var ts = c.ts || Date.now() + i;
            window.DB.set("pcons_" + patient.id + "_" + ts, c);
            mf.push(ts);
          });
          window.DB.set("pconsm_" + patient.id, mf);
          if (legacy.length > 0 && Array.isArray(window.DB.get("pconsm_" + patient.id))) {
            updatePatient(patient.id, { consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
          }
        }
      }
    } catch (e) {
    }
  }, [patient.id]);
  function commitConsents(next) {
    try {
      var newManifest = [];
      next.forEach(function(c, i) {
        var ts = c.ts || Date.now() + i;
        window.DB.set("pcons_" + patient.id + "_" + ts, c);
        newManifest.push(ts);
      });
      window.DB.set("pconsm_" + patient.id, newManifest);
    } catch (e) {
    }
    setConsentsState(next);
  }
  const printRef = useRef(null);
  function start(t) {
    setTpl0(t);
    setSigning(true);
  }
  function markPaper() {
    if (!window.confirm('Marcar el consentimiento de este paciente como firmado en papel. Se quitar\xE1 de las notificaciones de "consentimiento pendiente". \xBFContinuar?')) return;
    const d = /* @__PURE__ */ new Date();
    const f = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + String(d.getFullYear()).slice(-2);
    updatePatient(patient.id, { consent: true, consentInfo: "Firmado en papel \xB7 " + f, paperConsent: true });
    try {
      window.jcmToast && window.jcmToast("Marcado como firmado en papel.", "ok");
    } catch (e) {
    }
  }
  function openUpload() {
    setUpDataUrl(null);
    setUpIsPdf(false);
    setUpTitle("");
    setUploading(true);
  }
  function onUpFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const isPdf = f.type === "application/pdf" || /\.pdf$/i.test(f.name || "");
    const reader = new FileReader();
    reader.onload = () => {
      setUpIsPdf(isPdf);
      setUpDataUrl(reader.result);
    };
    reader.readAsDataURL(f);
    try {
      e.target.value = "";
    } catch (_) {
    }
  }
  function saveUpload() {
    if (!upDataUrl || upBusy) return;
    setUpBusy(true);
    const ts = Date.now();
    const path = "consents/" + patient.id + "/" + ts + (upIsPdf ? ".pdf" : ".jpg");
    const prep = upIsPdf ? Promise.resolve(upDataUrl) : compressImageDataUrl(upDataUrl, 1600, 0.6);
    prep.then((data) => {
      const tryStorage = window.JCSAAS && typeof window.JCSAAS.uploadImage === "function" ? window.JCSAAS.uploadImage(data, path).then((url) => url || data).catch(() => data) : Promise.resolve(data);
      return tryStorage.then((imgVal) => {
        const viaStorage = typeof imgVal === "string" && !imgVal.startsWith("data:");
        const nuevo = { kind: "upload", cat: "Subido", title: upTitle.trim() || "Consentimiento (subido)", proc: upTitle.trim() || "Consentimiento subido", fecha: upFecha, img: imgVal, fileType: upIsPdf ? "pdf" : "img", uploaded: true, ts };
        const lista = patConsents(patient).slice();
        lista.unshift(nuevo);
        commitConsents(lista);
        updatePatient(patient.id, { consent: true, consentInfo: nuevo.title + " \xB7 " + upFecha });
        try {
          window.jcmToast && window.jcmToast(viaStorage ? "Consentimiento subido y sincronizado." : "Consentimiento subido en este dispositivo.", "ok");
        } catch (e) {
        }
        setUploading(false);
        setUpDataUrl(null);
        setUpTitle("");
      });
    }).catch(() => {
      try {
        window.jcmToast && window.jcmToast("No se pudo subir el archivo.", "error");
      } catch (e) {
      }
    }).then(() => setUpBusy(false));
  }
  function startDelete(doc, idx) {
    setDeleting({ doc, idx });
    setDelPin("");
    setDelErr("");
  }
  function cancelDelete() {
    setDeleting(null);
    setDelPin("");
    setDelErr("");
  }
  function confirmDelete() {
    if (!deleting) return;
    const team = ((window.CADMIN || {}).team || []).filter((t) => t.active !== false);
    const pro = team.find((t) => t.name === deleting.doc.prof);
    if (pro && pro.pin) {
      if (delPin !== pro.pin) {
        setDelErr("Clave incorrecta.");
        return;
      }
    } else if (delPin.length < 1) {
      setDelErr("Ingresa una clave para confirmar.");
      return;
    }
    const next = consents.filter((_, i) => i !== deleting.idx);
    commitConsents(next);
    if (next.length === 0) updatePatient(patient.id, { consent: false, consentInfo: "" });
    cancelDelete();
    if (window.jcmToast) window.jcmToast("Consentimiento eliminado.", "ok");
  }
  const fmtHora = (ts) => {
    try {
      return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };
  function imprimirConsent() {
    const node = printRef.current;
    if (!node) return;
    const html = "<!doctype html><html><head><meta charset='utf-8'><title>Consentimiento \xB7 " + (patient.name || "") + "</title><style>@page{size:letter;margin:1.8cm}body{font-family:-apple-system,'Segoe UI',Arial,sans-serif;color:#111;margin:0;padding:20px}img{max-height:70px}</style></head><body>" + node.outerHTML + "</body></html>";
    if (window.jcmPrintHTML) window.jcmPrintHTML(html);
    else {
      const w = window.open("", "_blank");
      if (w) {
        w.document.write(html + "<script>window.print()<\/script>");
        w.document.close();
      }
    }
  }
  function imprimirConsentDoc(doc, openOnly) {
    if (doc && doc.kind === "upload") {
      if (doc.img) {
        if (doc.fileType === "pdf") {
          window.open(doc.img, "_blank");
          return;
        }
        const ih = "<!doctype html><html><head><meta charset='utf-8'><title>Consentimiento</title></head><body style='margin:0'><img src='" + doc.img + "' style='max-width:100%;display:block;margin:0 auto'/></body></html>";
        if (openOnly || !window.jcmPrintHTML) {
          const w = window.open("", "_blank");
          if (w) {
            w.document.open();
            w.document.write(ih);
            w.document.close();
          }
        } else window.jcmPrintHTML(ih);
      }
      return;
    }
    const esc = (s) => ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const body = jcmConsentLegalBody(doc);
    const winIOS = openOnly ? window.open("", "_blank") : null;
    if (winIOS) {
      try {
        winIOS.document.write("<!doctype html><meta charset='utf-8'><body style='font-family:-apple-system,sans-serif;padding:28px;color:#777'>Generando consentimiento\u2026</body>");
      } catch (e) {
      }
    }
    var medicoSig = null;
    try {
      var msList = window.DB.get("medic_sigs");
      if (msList && msList.length) medicoSig = msList[0];
    } catch (_) {
    }
    Promise.all([cropSignatureDataUrl(doc.sigPac), cropSignatureDataUrl(doc.sigPro)]).then(function(crops) {
      const sp = crops[0], spr = crops[1];
      const numCols = medicoSig ? 3 : 2;
      const sigH = medicoSig ? 130 : 175;
      const html = "<!doctype html><html><head><meta charset='utf-8'><title>Consentimiento \xB7 " + esc(patient.name || "") + "</title><style>@page{size:letter;margin:1.8cm}body{font-family:-apple-system,'Segoe UI',Arial,sans-serif;color:#111;margin:0;padding:20px}.sigs{display:grid;grid-template-columns:repeat(" + numCols + ",1fr);gap:18px;margin-top:22px}.sig-label{font-size:12px;color:#444;margin-bottom:6px}.sig-box{height:" + sigH + "px;border:1px solid #ddd;border-radius:6px;display:flex;align-items:center;justify-content:center;background:#fff;padding:10px}.sig-box img{max-height:100%;max-width:100%;object-fit:contain}</style></head><body><div style='text-align:right;font-size:11px;color:#666'>Fecha: " + esc(doc.fecha || "") + "</div><h2 style='text-align:center;font-family:Georgia,serif;font-weight:400;font-size:20px;color:#111;margin:2px 0 14px'>Consentimiento informado</h2><div style='font-size:12px;margin-bottom:6px'>Yo <b>" + esc(doc.nombre || "") + "</b></div><div style='font-size:12px;margin-bottom:16px'>Identificado con CI N\xB0 <b>" + esc(doc.ci || "") + "</b> \xB7 Edad <b>" + esc(doc.edad || "") + "</b></div>" + body + "<div class='sigs'><div><div class='sig-label'>Firma paciente</div><div class='sig-box'>" + (sp ? "<img src='" + sp + "'/>" : "") + "</div></div><div><div class='sig-label'>Firma profesional \xB7 " + esc(doc.prof || "") + "</div><div class='sig-box'>" + (spr ? "<img src='" + spr + "'/>" : "") + "</div></div>" + (medicoSig ? "<div><div class='sig-label'>M\xE9dico responsable \xB7 " + esc(medicoSig.name) + (medicoSig.rut ? " \xB7 RUT " + esc(medicoSig.rut) : "") + (medicoSig.registro ? " \xB7 Reg. " + esc(medicoSig.registro) : "") + "</div><div class='sig-box'>" + (medicoSig.sig ? "<img src='" + medicoSig.sig + "'/>" : "") + "</div></div>" : "") + "</div></body></html>";
      if (openOnly) {
        if (winIOS) {
          try {
            winIOS.document.open();
            winIOS.document.write(html);
            winIOS.document.close();
          } catch (e) {
          }
        } else {
          const w2 = window.open("", "_blank");
          if (w2) {
            w2.document.open();
            w2.document.write(html);
            w2.document.close();
          }
        }
        return;
      }
      if (window.jcmPrintHTML) window.jcmPrintHTML(html);
      else {
        const w = window.open("", "_blank");
        if (w) {
          w.document.write(html + "<script>window.print()<\/script>");
          w.document.close();
        }
      }
    });
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Crear consentimiento"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 } }, A.consents.map((c) => /* @__PURE__ */ React.createElement(AdBtn, { key: c.id, T, small: true, primary: true, onClick: () => start(c) }, c.title))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 18 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, onClick: openUpload }, "\u2191 Subir consentimiento (foto o archivo)"), !patient.consent && /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, onClick: markPaper }, "\u2713 Consentimiento firmado en papel"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 11, color: T.textFaint } }, "Para consentimientos firmados en papel o respaldados.")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Consentimientos firmados (", consents.length, ")"), consents.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "8px 0" } }, "A\xFAn no hay consentimientos firmados."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, consents.map((doc, i) => /* @__PURE__ */ React.createElement("div", { key: doc.ts || i, style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 9, background: T.surface, border: "1px solid " + T.line, cursor: "pointer" }, onClick: () => setOpenDoc(doc) }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, border: "1px solid " + T.accent, borderRadius: 999, padding: "4px 9px", whiteSpace: "nowrap", flexShrink: 0 } }, doc.cat || "Consent."), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, doc.proc || doc.title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 } }, doc.fecha, doc.ts ? " \xB7 " + fmtHora(doc.ts) : "", doc.prof ? " \xB7 " + doc.prof : "")), /* @__PURE__ */ React.createElement(AdTag, { T, tone: "ok" }, "Firmado"), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    imprimirConsentDoc(doc);
  }, title: "Imprimir consentimiento", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M6 9V2h12v7" }), /* @__PURE__ */ React.createElement("path", { d: "M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" }), /* @__PURE__ */ React.createElement("path", { d: "M6 14h12v8H6z" }))), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    startDelete(doc, i);
  }, title: "Eliminar consentimiento", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ React.createElement("path", { d: "M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" }), /* @__PURE__ */ React.createElement("path", { d: "M10 11v6M14 11v6" }), /* @__PURE__ */ React.createElement("path", { d: "M9 6V4h6v2" }))), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.6", style: { flexShrink: 0, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" }))))), uploading && /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      title: "Subir consentimiento",
      onClose: () => !upBusy && setUploading(false),
      footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => !upBusy && setUploading(false) }, "Cancelar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: saveUpload }, upBusy ? "Subiendo\u2026" : "Guardar consentimiento"))
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5 } }, "Sube una ", /* @__PURE__ */ React.createElement("b", null, "foto"), " del consentimiento firmado en papel o un ", /* @__PURE__ */ React.createElement("b", null, "archivo"), " (imagen o PDF) que tengas respaldado. Queda guardado en la ficha del paciente y se sincroniza."), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 5 } }, "Procedimiento / t\xEDtulo (opcional)"), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: upTitle,
        onChange: (e) => setUpTitle(e.target.value),
        placeholder: "Ej.: Toxina botul\xEDnica",
        style: { width: "100%", padding: "11px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 14, outline: "none" }
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 130 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 5 } }, "Fecha"), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: upFecha,
        onChange: (e) => setUpFecha(e.target.value),
        placeholder: "DD-MM-AA",
        style: { width: "100%", padding: "11px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 14, outline: "none" }
      }
    ))), /* @__PURE__ */ React.createElement("input", { ref: upInputRef, type: "file", accept: "image/*,application/pdf", onChange: onUpFile, style: { display: "none" } }), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => upInputRef.current && upInputRef.current.click() }, upDataUrl ? "Cambiar archivo / foto" : "Elegir foto o archivo"), upDataUrl && (upIsPdf ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.text, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "12px 14px" } }, "\u{1F4C4} Archivo PDF listo para subir.") : /* @__PURE__ */ React.createElement("img", { src: upDataUrl, alt: "vista previa", style: { width: "100%", maxHeight: 320, objectFit: "contain", background: "#fff", border: "1px solid " + T.line, borderRadius: 8 } })))
  ), deleting && /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      title: "Eliminar consentimiento",
      onClose: cancelDelete,
      footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: cancelDelete }, "Cancelar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: confirmDelete }, "Eliminar"))
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.5 } }, "Vas a eliminar el consentimiento ", /* @__PURE__ */ React.createElement("b", null, deleting.doc.proc || deleting.doc.title), " del ", /* @__PURE__ */ React.createElement("b", null, deleting.doc.fecha), ". Esta acci\xF3n no se puede deshacer."), /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(192,40,90,.07)", border: "1px solid rgba(192,40,90,.3)", borderRadius: 8, padding: "13px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.text, marginBottom: 8 } }, "Ingresa la clave de ", /* @__PURE__ */ React.createElement("b", null, deleting.doc.prof || "el profesional"), " para confirmar:"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "password",
        value: delPin,
        onChange: (e) => {
          setDelPin(e.target.value.replace(/\D/g, "").slice(0, 6));
          setDelErr("");
        },
        onKeyDown: (e) => e.key === "Enter" && confirmDelete(),
        inputMode: "numeric",
        placeholder: "Clave del profesional",
        style: { width: "100%", padding: "12px 13px", borderRadius: 6, border: "1px solid " + (delErr ? "#C0285A" : T.line), background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, letterSpacing: ".3em", outline: "none", textAlign: "center" }
      }
    ), delErr && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#C0285A", marginTop: 6 } }, delErr)))
  ), openDoc && /* @__PURE__ */ React.createElement(AdModal, { T, title: openDoc.title || "Consentimiento", onClose: () => setOpenDoc(null), wide: true, footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => setOpenDoc(null) }, "Cerrar"), openDoc.kind === "upload" ? /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => {
    if (openDoc.img) window.open(openDoc.img, "_blank");
  } }, "Abrir / descargar") : /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: imprimirConsent }, "Imprimir")) }, openDoc.kind === "upload" ? /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", border: "1px solid " + T.line, borderRadius: 8, padding: "16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#444", marginBottom: 10 } }, "Consentimiento subido \xB7 ", openDoc.fecha, openDoc.fileType === "pdf" ? " \xB7 PDF" : ""), openDoc.fileType === "pdf" ? /* @__PURE__ */ React.createElement("a", { href: openDoc.img, target: "_blank", rel: "noopener", style: { fontFamily: T.sans, fontSize: 14, color: T.accent } }, "\u{1F4C4} Abrir el PDF del consentimiento") : /* @__PURE__ */ React.createElement("img", { src: openDoc.img, alt: "consentimiento subido", style: { width: "100%", maxHeight: "70vh", objectFit: "contain", display: "block" } })) : /* @__PURE__ */ React.createElement("div", { ref: printRef, style: { background: "#fff", border: "1px solid " + T.line, borderRadius: 8, padding: "22px 24px" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", fontFamily: T.sans, fontSize: 11, color: "#444" } }, "Fecha: ", openDoc.fecha), /* @__PURE__ */ React.createElement("h2", { style: { textAlign: "center", fontFamily: T.serif, fontWeight: 400, fontSize: 20, color: "#111", margin: "2px 0 14px" } }, "Consentimiento informado"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#111", marginBottom: 6 } }, "Yo ", /* @__PURE__ */ React.createElement("b", null, openDoc.nombre)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: "#111", marginBottom: 14 } }, "Identificado con CI N\xB0 ", /* @__PURE__ */ React.createElement("b", null, openDoc.ci), " \xB7 Edad ", /* @__PURE__ */ React.createElement("b", null, openDoc.edad)), /* @__PURE__ */ React.createElement(ConsentDocDark, { T, tpl: openDoc, prof: openDoc.prof }), (() => {
    var medSigModal = null;
    try {
      var mM = window.DB.get("medic_sigs");
      if (mM && mM.length) medSigModal = mM[0];
    } catch (_) {
    }
    const cols = medSigModal ? "1fr 1fr 1fr" : "1fr 1fr";
    const h = medSigModal ? 90 : 120;
    return /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: cols, gap: 16, marginTop: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 } }, "Firma paciente"), openDoc.sigPac && /* @__PURE__ */ React.createElement("img", { src: openDoc.sigPac, alt: "firma paciente", style: { width: "100%", height: h, objectFit: "contain", background: "#fff", border: "1px solid #ddd", borderRadius: 6 } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 } }, "Firma profesional \xB7 ", openDoc.prof), openDoc.sigPro && /* @__PURE__ */ React.createElement("img", { src: openDoc.sigPro, alt: "firma profesional", style: { width: "100%", height: h, objectFit: "contain", background: "#fff", border: "1px solid #ddd", borderRadius: 6 } })), medSigModal && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 } }, "M\xE9dico responsable \xB7 ", medSigModal.name, medSigModal.rut ? " \xB7 RUT " + medSigModal.rut : "", medSigModal.registro ? " \xB7 Reg. " + medSigModal.registro : ""), medSigModal.sig && /* @__PURE__ */ React.createElement("img", { src: medSigModal.sig, alt: "firma m\xE9dico", style: { width: "100%", height: h, objectFit: "contain", background: "#fff", border: "1px solid #ddd", borderRadius: 6 } })));
  })())), signing && /* @__PURE__ */ React.createElement(SignConsentModal, { T, data: { patient, template: tpl0 || A.consents[0] }, onClose: () => setSigning(false), onSign: (r) => {
    const nuevo = { kind: r.tpl.kind, title: r.tpl.title, cat: r.tpl.cat, proc: r.tpl.proc, proc4: r.tpl.proc4, vascular: r.tpl.vascular, body: r.tpl.body, paragraphs: r.tpl.paragraphs, ...r.fields, sigPac: r.sigPac, sigPro: r.sigPro, ts: Date.now() };
    const lista = patConsents(patient).slice();
    lista.unshift(nuevo);
    commitConsents(lista);
    const _age = parseInt(r.fields && r.fields.edad, 10);
    const _agePatch = _age && !patient.age ? { age: _age } : {};
    updatePatient(patient.id, { consent: true, consentTs: Date.now(), consentInfo: r.tpl.title + " \xB7 " + r.fields.fecha, aiPhotoConsent: !!r.fields.aiPhotos, ..._agePatch, consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
    setSigning(false);
    try {
      window.jcmToast && window.jcmToast("Consentimiento guardado. Se abri\xF3 en una pesta\xF1a para tu respaldo.", "ok");
    } catch (e) {
    }
    try {
      imprimirConsentDoc(nuevo, true);
    } catch (e) {
    }
  } }));
}
function readImageResized(file, cb) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const max = 800;
      let { width: w, height: h } = img;
      if (w > max || h > max) {
        const r = Math.min(max / w, max / h);
        w = Math.round(w * r);
        h = Math.round(h * r);
      }
      const cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      cv.getContext("2d").drawImage(img, 0, 0, w, h);
      cb(cv.toDataURL("image/jpeg", 0.72));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
const IMG_PROCS_BASE = ["Botox", "Rinomodelaci\xF3n", "Sculptra", "Radiesse", "Mesoterapia", "Limpieza facial"];
const IMG_PROCS_FIXED = ["Evaluaci\xF3n inicial", "Antes / despu\xE9s", "Otro"];
function getImgProcs() {
  const svcs = typeof window !== "undefined" && window.clinicServiceList ? window.clinicServiceList() : [];
  const names = svcs.map((s) => s.name).filter(Boolean);
  const base = names.length > 0 ? names : IMG_PROCS_BASE;
  const seen = new Set(base);
  return [...base, ...IMG_PROCS_FIXED.filter((f) => !seen.has(f))];
}
function ImagenesTab({ T, patient, updatePatient }) {
  const imgKey = patImgKey(patient.id);
  const [imgs, setImgsState] = useState(() => patImages(patient));
  const [adding, setAdding] = useState(false);
  const [proc, setProc] = useState(() => getImgProcs()[0]);
  const [fecha, setFecha] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [src, setSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  function onDropImg(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (file && file.type && file.type.indexOf("image/") === 0) readImageResized(file, setSrc);
  }
  useEffect(() => {
    setImgsState(patImages(patient));
    try {
      const own = window.DB && window.DB.get(imgKey);
      if (patient.images && patient.images.length && !Array.isArray(own)) {
        window.DB.set(imgKey, patient.images);
        if (Array.isArray(window.DB.get(imgKey))) updatePatient(patient.id, { images: [] });
      }
    } catch (e) {
    }
  }, [patient.id]);
  function commitImgs(next) {
    let ok = false;
    try {
      window.DB.set(imgKey, next);
      ok = Array.isArray(window.DB.get(imgKey));
    } catch (e) {
    }
    if (!ok) {
      if (window.jcmError) window.jcmError("No se pudo guardar la imagen (espacio del dispositivo lleno).");
      return;
    }
    setImgsState(next);
    if (patient.images && patient.images.length) {
      try {
        updatePatient(patient.id, { images: [] });
      } catch (e) {
      }
    }
  }
  function resetForm() {
    setAdding(false);
    setSrc(null);
    setProc(getImgProcs()[0]);
    setFecha((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  }
  function save() {
    if (!src) {
      if (window.jcmError) window.jcmError("Selecciona una imagen.");
      return;
    }
    const id = "im" + Date.now();
    const item = { id, proc, date: fecha, label: proc };
    const canUpload = window.JCSAAS && typeof window.JCSAAS.uploadImage === "function";
    if (canUpload) {
      const storPath = patient.id + "/" + id + ".jpg";
      setUploading(true);
      window.JCSAAS.uploadImage(src, storPath).then((url) => {
        setUploading(false);
        commitImgs([{ ...item, src: url, storPath }, ...imgs]);
        resetForm();
      }).catch(() => {
        setUploading(false);
        commitImgs([{ ...item, src }, ...imgs]);
        resetForm();
      });
    } else {
      commitImgs([{ ...item, src }, ...imgs]);
      resetForm();
    }
  }
  function deleteImg(im) {
    commitImgs(imgs.filter((x) => x.id !== im.id));
    if (im.storPath && window.JCSAAS && window.JCSAAS.deleteImage) window.JCSAAS.deleteImage(im.storPath);
  }
  const groups = {};
  imgs.forEach((im) => {
    const k = im.proc || im.label || "Sin clasificar";
    (groups[k] = groups[k] || []).push(im);
  });
  Object.keys(groups).forEach((k) => groups[k].sort((a, b) => (b.date || "").localeCompare(a.date || "")));
  const fmtDate = (d) => {
    try {
      return (/* @__PURE__ */ new Date(d + (d.length === 10 ? "T00:00:00" : ""))).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return d;
    }
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Im\xE1genes \xB7 por fecha y procedimiento"), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: () => setAdding(true) }, "+ Subir imagen")), Object.keys(groups).length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0" } }, "A\xFAn no hay im\xE1genes. Sube la primera y clasif\xEDcala por procedimiento."), Object.keys(groups).map((proc2) => /* @__PURE__ */ React.createElement("div", { key: proc2, style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: T.accent } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.serif, fontSize: 16, color: T.text } }, proc2), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint } }, "\xB7 ", groups[proc2].length, " imagen(es)")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10 } }, groups[proc2].map((im) => /* @__PURE__ */ React.createElement("figure", { key: im.id, style: { margin: 0, borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line, background: T.surface } }, im.src ? /* @__PURE__ */ React.createElement("img", { src: im.src, alt: im.label, onClick: () => setViewer(im), title: "Ver imagen completa", style: { width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block", cursor: "zoom-in" } }) : /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", background: T.surface2 } }, /* @__PURE__ */ React.createElement("svg", { width: "34", height: "34", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.4" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "8.5", cy: "8.5", r: "1.5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 15l-5-5L5 21" }))), /* @__PURE__ */ React.createElement("figcaption", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", null, fmtDate(im.date)), /* @__PURE__ */ React.createElement("button", { onClick: () => deleteImg(im), title: "Eliminar", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))))))))), adding && /* @__PURE__ */ React.createElement(AdModal, { T, title: "Subir imagen cl\xEDnica", onClose: () => {
    setAdding(false);
    setSrc(null);
  }, footer: /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, full: true, onClick: save, disabled: uploading }, uploading ? "Subiendo\u2026" : "Guardar imagen") }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) readImageResized(f, setSrc);
  }, style: { display: "none" } }), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => fileRef.current && fileRef.current.click(),
      onDragOver: (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
      },
      onDragLeave: (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
      },
      onDrop: onDropImg,
      style: { aspectRatio: src ? "auto" : "16/9", border: "1px dashed " + (dragOver ? T.accent : T.chipBorder), borderRadius: 10, background: dragOver ? T.accentSoft || "rgba(84,112,127,.1)" : T.surface, cursor: "pointer", color: dragOver ? T.accent : T.textMute, fontFamily: T.sans, fontSize: 12.5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 14, overflow: "hidden", transition: "background .15s, border-color .15s, color .15s" }
    },
    src ? /* @__PURE__ */ React.createElement("img", { src, alt: "preview", style: { maxWidth: "100%", maxHeight: 240, borderRadius: 6 } }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("svg", { width: "30", height: "30", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }, /* @__PURE__ */ React.createElement("path", { d: "M12 16V4M7 9l5-5 5 5M5 20h14" })), dragOver ? "Suelta la foto aqu\xED" : "Toca o arrastra una foto aqu\xED")
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Procedimiento"), /* @__PURE__ */ React.createElement("select", { value: proc, onChange: (e) => setProc(e.target.value), style: { width: "100%", padding: "11px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" } }, getImgProcs().map((p) => /* @__PURE__ */ React.createElement("option", { key: p }, p)))), /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Fecha"), /* @__PURE__ */ React.createElement("input", { type: "date", value: fecha, onChange: (e) => setFecha(e.target.value), style: { width: "100%", padding: "11px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" } }))))), viewer && /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => {
    if (e.target === e.currentTarget) setViewer(null);
  }, style: { position: "fixed", inset: 0, zIndex: 9999, background: "rgba(8,8,6,.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "calc(14px + env(safe-area-inset-top,0px))", left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12.5, color: "#fff" } }, viewer.proc || viewer.label || "Imagen", viewer.date ? " \xB7 " + fmtDate(viewer.date) : ""), /* @__PURE__ */ React.createElement("button", { onClick: () => setViewer(null), style: { background: "rgba(255,255,255,.14)", border: "none", borderRadius: 999, width: 40, height: 40, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))), /* @__PURE__ */ React.createElement("img", { src: viewer.src, alt: viewer.label || "Imagen", onClick: (e) => e.stopPropagation(), style: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 } }), /* @__PURE__ */ React.createElement("a", { href: viewer.src, download: "imagen-" + (viewer.proc || "clinica") + "-" + (viewer.date || "") + ".jpg", onClick: (e) => e.stopPropagation(), style: { position: "absolute", bottom: "calc(18px + env(safe-area-inset-bottom,0px))", fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,.16)", borderRadius: 10, padding: "11px 20px", textDecoration: "none" } }, "\u2193 Descargar")));
}
function FacturacionTab({ T, patient, updatePatient, onOpenSession }) {
  const D = window.JCDATA;
  const [editAt, setEditAt] = useState(null);
  const [delAt, setDelAt] = useState(null);
  const metodos = ["Transferencia", "Efectivo", "Tarjeta d\xE9bito", "Tarjeta cr\xE9dito", "Otro"];
  const items = (patient.history || []).map((h, hi) => ({ h, hi })).filter((x) => (x.h.cobro || 0) > 0).map(({ h, hi }) => ({ concept: h.proc || "Atenci\xF3n", metodo: h.metodo || "\u2014", amount: h.cobro || 0, date: h.date || "", hi }));
  function removeAtencion(hi) {
    const hist = (patient.history || []).map((h, i) => i === hi ? { ...h, cobro: 0, metodo: "", comprobante: "" } : h);
    updatePatient(patient.id, { history: hist });
    setDelAt(null);
  }
  const total = items.reduce((s, i) => s + (i.amount || 0), 0);
  function addNew() {
    setEditAt({ idx: -1, item: { id: "b" + Date.now(), concept: "", date: (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL"), amount: 0, paid: false, metodo: "Transferencia", comprobante: "" } });
  }
  function saveEdit() {
    const updated = [...items];
    if (editAt.idx === -1) updated.unshift(editAt.item);
    else updated[editAt.idx] = editAt.item;
    updatePatient(patient.id, { billing: updated });
    setEditAt(null);
  }
  function setF(k, v) {
    setEditAt((prev) => ({ ...prev, item: { ...prev.item, [k]: v } }));
  }
  const iconEdit = /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), /* @__PURE__ */ React.createElement("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" }));
  const iconDel = /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ React.createElement("path", { d: "M19 6l-1 14H6L5 6" }), /* @__PURE__ */ React.createElement("path", { d: "M10 11v6M14 11v6" }), /* @__PURE__ */ React.createElement("path", { d: "M9 6V4h6v2" }));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Atenciones y pagos"), items.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 17, color: T.text } }, "Total ", D.fmt(total))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 } }, "Historial de atenciones cobradas. ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "Toca una atenci\xF3n"), " para abrir la sesi\xF3n con su detalle de pago."), items.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, textAlign: "center", padding: "24px 0" } }, "A\xFAn no hay pagos. Registra el cobro al crear una sesi\xF3n en ", /* @__PURE__ */ React.createElement("b", null, "Procedimientos"), "."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, items.map((b, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, style: { display: "flex", alignItems: "center", gap: 10, padding: "13px 4px", borderBottom: "1px solid " + T.lineSoft } }, /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => onOpenSession && onOpenSession(b.hi),
      title: "Abrir la sesi\xF3n y su detalle de pago",
      style: { flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 10, cursor: onOpenSession ? "pointer" : "default", borderRadius: 8, padding: "2px 4px", margin: "-2px -4px" },
      onMouseEnter: (e) => {
        if (onOpenSession) e.currentTarget.style.background = T.lineSoft;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.background = "transparent";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, color: T.text } }, b.concept), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 } }, b.metodo, b.date ? " \xB7 " + b.date : "")),
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 15, color: T.text, flexShrink: 0 } }, D.fmt(b.amount || 0)),
    onOpenSession && /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: T.textFaint, strokeWidth: "1.7", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "m9 18 6-6-6-6" }))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      title: "Eliminar atenci\xF3n (requiere clave de admin)",
      onClick: () => setDelAt(b),
      style: { flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 7, border: "1px solid " + T.line, background: T.surface, color: T.textMute, cursor: "pointer" },
      onMouseEnter: (e) => {
        e.currentTarget.style.color = "#C0285A";
        e.currentTarget.style.borderColor = "#C0285A";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.color = T.textMute;
        e.currentTarget.style.borderColor = T.line;
      }
    },
    iconDel
  )))), editAt && /* @__PURE__ */ React.createElement(
    AdModal,
    {
      T,
      title: editAt.idx === -1 ? "Nueva atenci\xF3n" : "Editar atenci\xF3n",
      onClose: () => setEditAt(null),
      footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => setEditAt(null) }, "Cancelar"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: saveEdit }, "Guardar"))
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, (() => {
      const svcs = window.clinicServiceList ? window.clinicServiceList() : [];
      const byCat = {};
      svcs.forEach((s) => {
        (byCat[s.cat] = byCat[s.cat] || []).push(s);
      });
      const cats = Object.keys(byCat);
      const known = svcs.some((s) => s.name === editAt.item.concept);
      const isOther = editAt.item.concept && !known;
      const sel2 = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
      const lbl2 = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
      if (!svcs.length) return /* @__PURE__ */ React.createElement(AdField, { T, label: "Procedimiento / Concepto", value: editAt.item.concept, onChange: (v) => setF("concept", v), placeholder: "Ej: Toxina botul\xEDnica" });
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: lbl2 }, "Procedimiento / Concepto"), /* @__PURE__ */ React.createElement("select", { value: isOther ? "__other__" : editAt.item.concept || "", onChange: (e) => {
        const v = e.target.value;
        setF("concept", v === "__other__" ? " " : v);
      }, style: sel2 }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecciona un servicio\u2026"), cats.map((c) => /* @__PURE__ */ React.createElement("optgroup", { key: c, label: c }, byCat[c].map((s, i) => /* @__PURE__ */ React.createElement("option", { key: c + i, value: s.name }, s.name)))), /* @__PURE__ */ React.createElement("option", { value: "__other__" }, "Otro (especificar)\u2026"))), isOther && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement(AdField, { T, value: editAt.item.concept.trim(), onChange: (v) => setF("concept", v), placeholder: "Concepto o procedimiento" })));
    })(), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Monto ($)"), /* @__PURE__ */ React.createElement("input", { "data-nocap": true, "data-only": "num", value: editAt.item.amount || "", onChange: (e) => setF("amount", parseInt(e.target.value.replace(/\D/g, ""), 10) || 0), placeholder: "0", style: { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" } })), /* @__PURE__ */ React.createElement(AdField, { T, label: "Fecha", value: editAt.item.date, onChange: (v) => setF("date", v), placeholder: (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL") })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "M\xE9todo de pago"), /* @__PURE__ */ React.createElement("select", { value: editAt.item.metodo || "Transferencia", onChange: (e) => setF("metodo", e.target.value), style: { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" } }, metodos.map((m) => /* @__PURE__ */ React.createElement("option", { key: m }, m)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 } }, "Estado de pago"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["Pagado", true], ["Pendiente", false]].map(([l, v]) => /* @__PURE__ */ React.createElement("button", { key: l, onClick: () => setF("paid", v), style: { flex: 1, padding: "11px", borderRadius: 6, cursor: "pointer", background: editAt.item.paid === v ? T.accent : T.surface, color: editAt.item.paid === v ? T.onAccent || "#fff" : T.textMute, border: "1px solid " + (editAt.item.paid === v ? T.accent : T.line), fontFamily: T.sans, fontSize: 13 } }, l)))), /* @__PURE__ */ React.createElement(AdField, { T, label: "Comprobante / N\xB0 transferencia (opcional)", value: editAt.item.comprobante || "", onChange: (v) => setF("comprobante", v), placeholder: "Ej: 0012345" }))
  ), delAt && window.AdminKeyModal && /* @__PURE__ */ React.createElement(
    window.AdminKeyModal,
    {
      T,
      title: "Eliminar atenci\xF3n",
      message: 'Vas a eliminar la atenci\xF3n "' + (delAt.concept || "atenci\xF3n") + '" (' + D.fmt(delAt.amount || 0) + "). Se quita el cobro y deja de contar en las ventas. La sesi\xF3n cl\xEDnica se conserva; para borrarla usa Procedimientos. Ingresa la clave de admin (PIN de admin o contrase\xF1a de la cuenta) para confirmar.",
      confirmLabel: "Eliminar atenci\xF3n",
      onClose: () => setDelAt(null),
      onOk: () => removeAtencion(delAt.hi)
    }
  ));
}
const ORIGEN_ORG = ["Paciente antiguo / fidelizado", "Org\xE1nico \xB7 Instagram", "Org\xE1nico \xB7 Facebook", "Org\xE1nico \xB7 TikTok", "Referido de paciente", "Pas\xF3 por la cl\xEDnica (walk-in)", "B\xFAsqueda en Google"];
const ORIGEN_ADS = ["Meta Ads \xB7 general", "Meta Ads \xB7 Instagram", "Meta Ads \xB7 Facebook", "Google Ads", "Otra pauta\u2026"];
function normOrigen(v) {
  if (!v || v === "organico") return "Org\xE1nico \xB7 Instagram";
  if (v === "referido") return "Referido de paciente";
  if (v === "campana") return "Meta Ads \xB7 general";
  return v;
}
function isAdsOrigen(v) {
  return ORIGEN_ADS.some((o) => v && v.startsWith(o.split("\xB7")[0].trim()));
}
function CampanaTab({ T, patient, updatePatient }) {
  const c = patient.campaign || {};
  const origen = normOrigen(c.origen);
  function set(patch) {
    updatePatient(patient.id, { campaign: { ...c, ...patch } });
  }
  const selS = { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  const metaCamps = ((window.CADMIN || { campaigns: [] }).campaigns || []).filter((ca) => ca.active);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 } }, "Informaci\xF3n de captaci\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 } }, "Origen"), /* @__PURE__ */ React.createElement("select", { value: origen, onChange: (e) => set({ origen: e.target.value }), style: selS }, /* @__PURE__ */ React.createElement("optgroup", { label: "Org\xE1nico / directo" }, ORIGEN_ORG.map((o) => /* @__PURE__ */ React.createElement("option", { key: o }, o))), /* @__PURE__ */ React.createElement("optgroup", { label: "Publicidad \xB7 Ads" }, metaCamps.length > 0 && metaCamps.map((ca) => /* @__PURE__ */ React.createElement("option", { key: ca.id }, ca.name)), ORIGEN_ADS.map((o) => /* @__PURE__ */ React.createElement("option", { key: o }, o))))), isAdsOrigen(origen) && /* @__PURE__ */ React.createElement(AdField, { T, label: "Campa\xF1a espec\xEDfica", value: c.campana || "", onChange: (v) => set({ campana: v }), placeholder: "Ej: Botox \xB7 invierno 2026" }), /* @__PURE__ */ React.createElement(AdField, { T, label: "Detalle / referente", value: c.detalle || "", onChange: (v) => set({ detalle: v }), placeholder: "Ej: recomendada por Mar\xEDa G." })));
}
function FichaIATab({ T, patient, go }) {
  const [sub, setSub] = useState("resumen");
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 16 } }, [["resumen", "Resumen cl\xEDnico"], ["auditoria", "Auditor\xEDa"]].map(([k, l]) => /* @__PURE__ */ React.createElement("button", { key: k, type: "button", onClick: () => setSub(k), style: { fontFamily: T.sans, fontSize: 11.5, fontWeight: sub === k ? 600 : 500, padding: "7px 14px", borderRadius: 8, cursor: "pointer", border: "1px solid " + (sub === k ? T.accent : T.line), background: sub === k ? T.accent : "transparent", color: sub === k ? T.onAccent || "#fff" : T.textMute } }, l))), sub === "resumen" ? /* @__PURE__ */ React.createElement(ResumenIA, { T, patient }) : /* @__PURE__ */ React.createElement(AuditoriaIA, { T, patient, go }));
}
function AuditoriaIA({ T, patient, go }) {
  const issues = [];
  if (!patient.consent) issues.push({ tone: "danger", t: "Falta consentimiento firmado", d: "El paciente no tiene consentimiento informado registrado.", action: ["Ir a Consentimientos", () => go("consent")] });
  if (!patient.clinica || Object.keys(patient.clinica || {}).length < 3) issues.push({ tone: "warn", t: "Antecedentes incompletos", d: "Faltan datos de antecedentes m\xE9dicos, alergias o h\xE1bitos.", action: ["Completar antecedentes", () => go("fichaclinica")] });
  if (!patient.campaign) issues.push({ tone: "warn", t: "Sin informaci\xF3n de captaci\xF3n", d: "No se registr\xF3 c\xF3mo lleg\xF3 el paciente (campa\xF1a / org\xE1nico / medio).", action: ["Registrar origen", () => go("campana")] });
  const bill = patient.billing;
  const saldo = bill ? bill.filter((b) => !b.paid).reduce((s, b) => s + b.amount, 0) : 0;
  if (saldo > 0) issues.push({ tone: "warn", t: "Pago pendiente", d: "Hay saldo por cobrar en la facturaci\xF3n del paciente.", action: ["Ver facturaci\xF3n", () => go("facturacion")] });
  if (!patient.points || patient.points.length === 0) issues.push({ tone: "info", t: "Mapeo facial vac\xEDo", d: "A\xFAn no se registran punciones en la ficha de tratamiento.", action: ["Abrir mapeo", () => go("mapa")] });
  const toneC = { danger: "#C0285A", warn: T.gold, info: T.accent };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "4.5", y: "8", width: "15", height: "10", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M12 4.5V8" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "3.4", r: "1.3" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "13", r: "1.2", fill: T.accent, stroke: "none" }), /* @__PURE__ */ React.createElement("circle", { cx: "15", cy: "13", r: "1.2", fill: T.accent, stroke: "none" })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Auditor\xEDa IA \xB7 sugerencias")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 16, lineHeight: 1.6 } }, "Revisi\xF3n autom\xE1tica de la ficha: documentos, datos faltantes, consentimiento y pagos."), issues.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "16px", borderRadius: 8, background: "rgba(31,138,91,.08)", border: "1px solid rgba(31,138,91,.35)" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 24, height: 24, borderRadius: "50%", background: "#1F8A5B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2.4" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6 9 17l-5-5" }))), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, "Ficha completa. Sin observaciones pendientes.")) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, issues.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 11, padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line } }, /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", style: { width: 7, height: 7, borderRadius: "50%", background: toneC[it.tone], flexShrink: 0, marginTop: 6 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text } }, it.t), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3, lineHeight: 1.5 } }, it.d), /* @__PURE__ */ React.createElement("button", { onClick: it.action[1], style: { marginTop: 9, fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, background: "none", border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "7px 13px", cursor: "pointer" } }, it.action[0], " \u2192"))))));
}
function ResumenIA({ T, patient }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [ans, setAns] = useState([]);
  const [asking, setAsking] = useState(false);
  function ctx() {
    const c = patient.clinica || {};
    const hist = (patient.history || []).map((h) => [h.date, h.proc, h.units && "(" + h.units + ")", h.proName && "por " + h.proName, h.note].filter(Boolean).join(" ")).join("; ");
    const billing = (patient.billing || []).map((b) => (b.date || "") + " " + (b.concept || "") + " $" + (b.amount || 0) + " " + (b.paid ? "pagado" : "pendiente")).join("; ");
    const clinFields = [
      c.alergias && "Alergias: " + c.alergias,
      c.morbidos && "Antecedentes m\xF3rbidos: " + c.morbidos,
      c.medicamentos && "Medicamentos: " + c.medicamentos,
      c.esteticos && "Procedimientos est\xE9ticos previos: " + c.esteticos,
      c.quirurgicos && "Antecedentes quir\xFArgicos: " + c.quirurgicos,
      c.tabaco && "Tabaco: " + c.tabaco + " cigarros/d\xEDa",
      c.alcohol && "Alcohol: " + c.alcohol,
      c.actividad && "Actividad f\xEDsica: " + c.actividad,
      c.embarazo && "Embarazo/lactancia: " + c.embarazo,
      c.skincare && "Skincare: " + c.skincare
    ].filter(Boolean).join(". ");
    return [
      "Paciente" + (patient.age ? " de " + patient.age + " a\xF1os" : ""),
      "Tratamientos etiquetados: " + ((patient.tags || []).join(", ") || "ninguno"),
      clinFields && "Cl\xEDnica: " + clinFields,
      "Historial de sesiones (" + (patient.history || []).length + "): " + (hist || "sin sesiones"),
      billing && "Facturaci\xF3n: " + billing,
      patient.notes && "Notas internas: " + patient.notes,
      "Consentimiento: " + (patient.consent ? "firmado" : "PENDIENTE")
    ].filter(Boolean).join(". ");
  }
  function localSummary() {
    const hist = patient.history || [];
    const nombre = patient.name || "El paciente";
    const edad = patient.age ? ", " + patient.age + " a\xF1os" : "";
    const tags = (patient.tags || []).filter(Boolean);
    const lines = [];
    lines.push(nombre + edad + ". " + (tags.length ? "Tratamientos asociados: " + tags.join(", ") + "." : "Sin tratamientos etiquetados a\xFAn."));
    if (hist.length) {
      const ultima = hist[0];
      const procs = {};
      hist.forEach((h) => {
        const k = (h.proc || "").trim();
        if (k) procs[k] = (procs[k] || 0) + 1;
      });
      const detalle = Object.entries(procs).map(([p, n]) => p + (n > 1 ? " \xD7" + n : "")).join(", ");
      lines.push("Registra " + hist.length + " sesi\xF3n" + (hist.length === 1 ? "" : "es") + ": " + detalle + ".");
      lines.push("\xDAltima sesi\xF3n: " + (ultima.date || "\u2014") + " \xB7 " + (ultima.proc || "\u2014") + (ultima.units ? " (" + ultima.units + ")" : "") + (ultima.note ? ". Nota: " + ultima.note : "") + ".");
    } else {
      lines.push("A\xFAn no hay sesiones registradas en la ficha.");
    }
    if (patient.notes) lines.push("Antecedentes/notas: " + patient.notes + ".");
    lines.push("A vigilar: " + (patient.consent ? "consentimiento firmado; " : "\u26A0 consentimiento PENDIENTE de firma; ") + "confirmar evoluci\xF3n y reacciones en el control de seguimiento.");
    return lines.join("\n");
  }
  function localAnswer(text) {
    const t = text.toLowerCase();
    const hist = patient.history || [];
    const c = patient.clinica || {};
    if (/consent/.test(t)) return patient.consent ? "El consentimiento est\xE1 firmado." : "El consentimiento est\xE1 PENDIENTE de firma.";
    if (/tel[eé]fono|fono|celular|whatsapp|contacto/.test(t)) return patient.phone ? "Tel\xE9fono: " + patient.phone : "No hay tel\xE9fono registrado en la ficha.";
    if (/correo|email|mail/.test(t)) return patient.email ? "Correo: " + patient.email : "No hay correo registrado en la ficha.";
    if (/\brut\b|c[eé]dula/.test(t)) return patient.rut ? "RUT: " + patient.rut : "RUT no registrado.";
    if (/edad|años|anos/.test(t)) return patient.age ? "Edad: " + patient.age + " a\xF1os." : "Edad no registrada.";
    if (/alerg/.test(t)) return c.alergias ? "Alergias: " + c.alergias : "Sin alergias registradas en la ficha.";
    if (/antecedente|m[oó]rbido|enfermedad|patolog/.test(t)) return c.morbidos ? "Antecedentes m\xF3rbidos: " + c.morbidos : "Sin antecedentes m\xF3rbidos registrados.";
    if (/medicamento|f[aá]rmaco/.test(t)) return c.medicamentos ? "Medicamentos: " + c.medicamentos : "Sin medicamentos registrados.";
    if (/tabaco|cigarro|fum/.test(t)) return c.tabaco ? "Tabaco: " + c.tabaco + " cigarros/d\xEDa." : "No se registra consumo de tabaco.";
    if (/alcohol|bebi/.test(t)) return c.alcohol ? "Alcohol: " + c.alcohol : "No se registra consumo de alcohol.";
    if (/embaraz|lactan/.test(t)) return c.embarazo ? "Embarazo/lactancia: " + c.embarazo : "No registra embarazo ni lactancia.";
    if (/quirúrg|cirugía|operaci/.test(t)) return c.quirurgicos || c.cirugias ? "Antecedentes quir\xFArgicos: " + (c.quirurgicos || c.cirugias) : "Sin antecedentes quir\xFArgicos.";
    if (/est[eé]tico|prev[io]*|antes/.test(t)) return c.esteticos ? "Procedimientos est\xE9ticos previos: " + c.esteticos : "Sin procedimientos est\xE9ticos previos registrados.";
    if (/última|ultima|reciente/.test(t) && hist[0]) return "\xDAltima sesi\xF3n: " + (hist[0].date || "\u2014") + " \xB7 " + (hist[0].proc || "\u2014") + (hist[0].units ? " (" + hist[0].units + ")" : "") + (hist[0].proName ? " \xB7 " + hist[0].proName : "") + (hist[0].note ? ". " + hist[0].note : "");
    if (/cu[aá]nt|sesion|histor/.test(t)) return hist.length ? "Tiene " + hist.length + " sesi\xF3n(es): " + hist.map((h) => (h.date || "") + " " + (h.proc || "")).join("; ") : "Sin sesiones registradas.";
    if (/tratamiento|procedimiento|qu[eé] se|que le/.test(t)) {
      const ps = Array.from(new Set(hist.map((h) => h.proc).filter(Boolean)));
      return ps.length ? "Tratamientos realizados: " + ps.join(", ") + "." : "Sin tratamientos registrados.";
    }
    if (/pag|cobr|factur|deuda|balan/.test(t)) {
      const bl = patient.billing || [];
      const pend = bl.filter((b) => !b.paid);
      return bl.length ? "Facturaci\xF3n: " + bl.length + " registro(s). " + (pend.length ? pend.length + " pendiente(s) de pago." : "Todos pagados.") : "Sin registros de facturaci\xF3n.";
    }
    if (/nota|observ|intern/.test(t)) return patient.notes ? "Notas internas: " + patient.notes : "Sin notas internas registradas.";
    return localSummary();
  }
  async function gen() {
    setLoading(true);
    try {
      if (window.mediqueAI) {
        const system = "Eres asistente cl\xEDnico de una consulta de medicina est\xE9tica en Chile. Redacta en espa\xF1ol un resumen cl\xEDnico breve (4-6 l\xEDneas) del paciente, basado SOLO en estos datos. Indica tratamientos realizados, evoluci\xF3n y puntos a vigilar. No inventes datos.";
        const res = await window.mediqueAI([{ role: "user", content: "DATOS: " + ctx() + "\n\nGenera el resumen cl\xEDnico." }], {}, { system, max_tokens: 500 });
        setSummary((res && res.ok && res.reply ? res.reply.trim() : "") || localSummary());
      } else {
        setSummary(localSummary());
      }
    } catch (e) {
      setSummary(localSummary());
    }
    setLoading(false);
  }
  async function ask() {
    const text = q.trim();
    if (!text || asking) return;
    setQ("");
    setAns((a) => [...a, { role: "user", content: text }]);
    setAsking(true);
    try {
      if (window.mediqueAI) {
        const system = "Responde en espa\xF1ol, breve y cl\xEDnico, SOLO con base en los datos del paciente que te dan. Si no hay dato, dilo.";
        const res = await window.mediqueAI([{ role: "user", content: "DATOS: " + ctx() + "\n\nPREGUNTA: " + text }], {}, { system, max_tokens: 500 });
        setAns((a) => [...a, { role: "ai", content: (res && res.ok && res.reply ? res.reply.trim() : "") || localAnswer(text) }]);
      } else {
        setAns((a) => [...a, { role: "ai", content: localAnswer(text) }]);
      }
    } catch (e) {
      setAns((a) => [...a, { role: "ai", content: localAnswer(text) }]);
    }
    setAsking(false);
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent } }, "Resumen cl\xEDnico \xB7 IA"), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: gen }, loading ? "Generando\u2026" : summary ? "Regenerar" : "Generar resumen")), /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(106,130,150,.10)", border: "1px solid " + T.line, borderRadius: 8, padding: "12px 14px", fontFamily: T.sans, fontSize: 11, color: T.textMute, lineHeight: 1.5, marginBottom: 14 } }, "El resumen se genera con IA a partir del historial del paciente y debe ser verificado por un profesional de la salud."), (() => {
    const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
    if (loading && luxF) return /* @__PURE__ */ React.createElement("div", { style: { minHeight: 80, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px", display: "flex", flexDirection: "column", gap: 9 } }, /* @__PURE__ */ React.createElement("div", { style: DS.skel(T, { height: 12, width: "92%" }) }), /* @__PURE__ */ React.createElement("div", { style: DS.skel(T, { height: 12, width: "78%" }) }), /* @__PURE__ */ React.createElement("div", { style: DS.skel(T, { height: 12, width: "85%" }) }), /* @__PURE__ */ React.createElement("div", { style: DS.skel(T, { height: 12, width: "60%" }) }));
    return /* @__PURE__ */ React.createElement("div", { style: { minHeight: 80, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px", fontFamily: T.sans, fontSize: 13, color: summary ? T.text : T.textFaint, lineHeight: 1.7, whiteSpace: "pre-wrap" } }, loading ? "Analizando historial del paciente\u2026" : summary || "Toca \xABGenerar resumen\xBB para que la IA redacte un resumen cl\xEDnico de este paciente.");
  })(), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, background: "rgba(106,130,150,.08)", border: "1px solid " + T.line, borderRadius: 10, padding: "14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.6" }, /* @__PURE__ */ React.createElement("rect", { x: "4.5", y: "8", width: "15", height: "10", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M12 4.5V8" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "3.4", r: "1.3" })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text } }, "Asistente IA")), ans.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontFamily: T.sans, fontSize: 12.5, lineHeight: 1.55, color: m.role === "user" ? T.accent : T.text, padding: "5px 0", whiteSpace: "pre-wrap" } }, m.role === "user" ? "\u203A " : "", m.content)), asking && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.textMute, padding: "4px 0" } }, "Pensando\u2026"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 8 } }, /* @__PURE__ */ React.createElement("input", { value: q, onChange: (e) => setQ(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter") ask();
  }, placeholder: "Preg\xFAntame sobre el paciente\u2026", style: { flex: 1, padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" } }), /* @__PURE__ */ React.createElement("button", { onClick: ask, style: { width: 40, borderRadius: 8, border: "none", cursor: "pointer", background: T.primaryBg, color: T.primaryText, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M22 2 11 13M22 2l-7 20-4-9-9-4z" }))))));
}
function patExamKey(id) {
  return "pexam_" + id;
}
function ExamenesTab({ T, patient }) {
  const [files, setFiles] = useState(() => {
    try {
      const v = window.DB && window.DB.get(patExamKey(patient.id));
      return Array.isArray(v) ? v : [];
    } catch (e) {
      return [];
    }
  });
  const fileRef = useRef(null);
  const [ordenes, setOrdenes] = useState(() => {
    try {
      return (window.DB && window.DB.get("lab_orders") || []).filter((o) => o.patId === patient.id);
    } catch (e) {
      return [];
    }
  });
  const canOrderExams = window.jcmCanPrescribeNow ? window.jcmCanPrescribeNow() : true;
  const [selExams, setSelExams] = useState([]);
  const [extraExam, setExtraExam] = useState("");
  const [tipoOrden, setTipoOrden] = useState("Interno");
  function toggleExam(ex) {
    setSelExams((s) => s.indexOf(ex) >= 0 ? s.filter((x) => x !== ex) : [...s, ex]);
  }
  function crearOrden() {
    const lista = [...selExams, ...extraExam.trim() ? [extraExam.trim()] : []];
    if (!lista.length) {
      window.jcmToast && window.jcmToast("Elige al menos un examen.", "info");
      return;
    }
    const o = { id: "lo" + Date.now(), patId: patient.id, patName: patient.name, examenes: lista.join(", "), tipo: tipoOrden, estado: "Solicitado", fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) };
    let all = [];
    try {
      all = window.DB && window.DB.get("lab_orders") || [];
    } catch (e) {
    }
    const next = [o, ...all];
    try {
      window.DB && window.DB.set("lab_orders", next);
    } catch (e) {
    }
    setOrdenes(next.filter((x) => x.patId === patient.id));
    setSelExams([]);
    setExtraExam("");
    window.jcmToast && window.jcmToast("Orden de examen creada.", "ok");
  }
  function persist(n) {
    setFiles(n);
    try {
      window.DB && window.DB.set(patExamKey(patient.id), n);
    } catch (e) {
    }
  }
  function onPick(e) {
    const fs = Array.from(e.target.files || []);
    e.target.value = "";
    fs.forEach((file) => {
      if (file.size > 3 * 1024 * 1024) {
        window.jcmToast && window.jcmToast('"' + file.name + '" supera 3 MB. Usa un archivo m\xE1s liviano.', "info");
        return;
      }
      const rd = new FileReader();
      rd.onload = () => persist([{ id: "ex" + Date.now() + Math.random().toString(36).slice(2, 5), name: file.name, type: /pdf/i.test(file.type) ? "pdf" : "img", data: rd.result, ts: Date.now() }, ...window.DB && window.DB.get(patExamKey(patient.id)) || files]);
      rd.readAsDataURL(file);
    });
  }
  function ver(f) {
    try {
      const parts = ("" + f.data).split(",");
      const bin = atob(parts[1] || "");
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const mime = (parts[0].match(/:(.*?);/) || [, f.type === "pdf" ? "application/pdf" : "image/jpeg"])[1];
      const url = URL.createObjectURL(new Blob([arr], { type: mime }));
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 2e4);
    } catch (e) {
      window.open(f.data, "_blank");
    }
  }
  async function del(id) {
    if (await (window.jcmConfirm || window.confirm)("\xBFEliminar este examen?", { danger: true })) persist(files.filter((x) => x.id !== id));
  }
  const hora = (ts) => {
    try {
      return new Date(ts).toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch (e) {
      return "";
    }
  };
  const inp = { padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", boxSizing: "border-box" };
  const EXAMS = window.EXAM_COMUNES || [];
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 } }, "Carga los ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "ex\xE1menes ya existentes"), " del paciente (PDF o foto) para tenerlos siempre a mano en su ficha."), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => fileRef.current && fileRef.current.click() }, "+ Subir examen (PDF o foto)"), /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: ".pdf,application/pdf,image/*", multiple: true, onChange: onPick, style: { display: "none" } }), canOrderExams ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Crear orden de examen"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 10 } }, EXAMS.map((ex) => {
    const on = selExams.indexOf(ex) >= 0;
    return /* @__PURE__ */ React.createElement("button", { key: ex, type: "button", onClick: () => toggleExam(ex), style: { fontFamily: T.sans, fontSize: 11, padding: "7px 11px", borderRadius: 999, cursor: "pointer", background: on ? T.accent : "transparent", color: on ? T.onAccent || "#fff" : T.textMute, border: "1px solid " + (on ? T.accent : T.line) } }, on ? "\u2713 " : "", ex);
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("input", { value: extraExam, onChange: (e) => setExtraExam(e.target.value), placeholder: "Otro examen (opcional)\u2026", style: { ...inp, flex: 1, minWidth: 180 } }), /* @__PURE__ */ React.createElement("select", { value: tipoOrden, onChange: (e) => setTipoOrden(e.target.value), style: inp }, /* @__PURE__ */ React.createElement("option", null, "Interno"), /* @__PURE__ */ React.createElement("option", null, "Externo")), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: crearOrden }, "+ Crear orden"))) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, fontFamily: T.sans, fontSize: 11.5, color: T.textFaint } }, "Solo M\xE9dico o Dentista pueden crear \xF3rdenes de examen. T\xFA puedes ver y cargar los ex\xE1menes de este paciente."), ordenes.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 8 } }, "\xD3rdenes solicitadas"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, ordenes.map((o) => /* @__PURE__ */ React.createElement("div", { key: o.id, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "9px 12px", fontFamily: T.sans, fontSize: 12.5, color: T.text } }, o.examenes, " ", /* @__PURE__ */ React.createElement("span", { style: { color: T.textFaint, fontSize: 11 } }, "\xB7 ", o.tipo, " \xB7 ", o.estado, " \xB7 ", o.fecha))))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Ex\xE1menes cargados (", files.length, ")"), files.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint } }, "A\xFAn no hay ex\xE1menes cargados.") : /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 } }, files.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.id, style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { onClick: () => ver(f), title: "Ver", style: { height: 120, background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden" } }, f.type === "img" ? /* @__PURE__ */ React.createElement("img", { src: f.data, alt: f.name, style: { maxWidth: "100%", maxHeight: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("svg", { width: "42", height: "42", viewBox: "0 0 24 24", fill: "none", stroke: "#C0285A", strokeWidth: "1.4" }, /* @__PURE__ */ React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ React.createElement("path", { d: "M14 2v6h6M9 15h6M9 18h4" }))), /* @__PURE__ */ React.createElement("div", { style: { padding: "9px 11px", display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, f.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, color: T.textFaint } }, hora(f.ts))), /* @__PURE__ */ React.createElement("button", { onClick: () => ver(f), title: "Ver", style: { background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.accent, fontFamily: T.sans, fontSize: 11 } }, "Ver"), /* @__PURE__ */ React.createElement("button", { onClick: () => del(f.id), title: "Eliminar", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 3, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))))))));
}
function PresupuestoTab({ T, patient, updatePatient }) {
  const D = window.JCDATA;
  const fmt = (n) => D && D.fmt ? D.fmt(n) : "$" + (n || 0).toLocaleString("es-CL");
  const servicios = (() => {
    try {
      return (window.clinicServiceList ? window.clinicServiceList() : []) || [];
    } catch (e) {
      return [];
    }
  })();
  const [items, setItems] = useState([]);
  const [pick, setPick] = useState("");
  const [descuento, setDescuento] = useState("");
  const [descModo, setDescModo] = useState("monto");
  const [validez, setValidez] = useState("15");
  const [nota, setNota] = useState("");
  const presupuestos = patient.presupuestos || [];
  function addSvc() {
    const s = servicios.find((x) => x.name === pick);
    if (!s) return;
    const ex = items.find((i) => i.name === s.name);
    if (ex) setItems(items.map((i) => i.name === s.name ? { ...i, qty: i.qty + 1 } : i));
    else setItems([...items, { name: s.name, price: s.price || 0, qty: 1 }]);
    setPick("");
  }
  function addCustom() {
    setItems([...items, { name: "", price: 0, qty: 1 }]);
  }
  function upd(i, patch) {
    setItems(items.map((it, j) => j === i ? { ...it, ...patch } : it));
  }
  function del(i) {
    setItems(items.filter((_, j) => j !== i));
  }
  const subtotal = items.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  const minItem = items.length ? items.reduce((min, it) => (it.price || 0) < (min.price || 0) ? it : min, items[0]) : null;
  const desc = descModo === "pct" ? Math.round((minItem ? (minItem.price || 0) * (minItem.qty || 1) : 0) * (Math.min(100, parseInt(descuento, 10) || 0) / 100)) : Math.min(subtotal, parseInt(descuento, 10) || 0);
  const total = subtotal - desc;
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 13.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" };
  function docInner(saved) {
    const src = saved || { items, subtotal, desc, total, validez, nota };
    const e = jcmDocEsc;
    const b = jcmDocBrand();
    const now = /* @__PURE__ */ new Date();
    const hoy = now.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const dot = String(now.getDate()).padStart(2, "0") + " \xB7 " + String(now.getMonth() + 1).padStart(2, "0") + " \xB7 " + now.getFullYear();
    const rows = (src.items || []).filter((i) => (i.name || "").trim()).map((i) => "<tr><td style='padding:8px 4px;border-bottom:1px solid #eee'>" + e(i.name) + "</td><td style='padding:8px 4px;border-bottom:1px solid #eee;text-align:center'>" + (i.qty || 1) + "</td><td style='padding:8px 4px;border-bottom:1px solid #eee;text-align:right'>" + fmt(i.price) + "</td><td style='padding:8px 4px;border-bottom:1px solid #eee;text-align:right'>" + fmt((i.price || 0) * (i.qty || 1)) + "</td></tr>").join("");
    const inner = jcmMasthead(b) + "<div class='titleblock'><div><div class='eyebrow'>Cotizaci\xF3n</div><h1 class='doc-title'>Presupuesto <span class='it'>de tratamiento</span></h1></div><div class='folio'><span class='k'>Fecha</span><span class='v vbig'>" + e(dot) + "</span></div></div>" + jcmPband(patient, [["RUT", patient.rut], ["Vigencia", (parseInt(src.validez, 10) || 15) + " d\xEDas"]]) + `<div class='body'><div class='section' style='margin-top:20px'><div class='section-head'><span class='sh-label'>Detalle</span><span class='sh-rule'></span></div><table style="width:100%;border-collapse:collapse;font-family:'Jost',sans-serif;font-size:13px;color:#121A26"><thead><tr><th style='text-align:left;padding:6px 4px;border-bottom:2px solid #121A26'>Tratamiento</th><th style='text-align:center;padding:6px 4px;border-bottom:2px solid #121A26'>Cant.</th><th style='text-align:right;padding:6px 4px;border-bottom:2px solid #121A26'>Valor</th><th style='text-align:right;padding:6px 4px;border-bottom:2px solid #121A26'>Total</th></tr></thead><tbody>` + rows + `</tbody></table><div style="margin-top:14px;text-align:right;font-family:'Jost',sans-serif;font-size:13px;color:#121A26">Subtotal: ` + fmt(src.subtotal) + (src.desc ? "<br>Descuento: \u2212 " + fmt(src.desc) : "") + "<br><span style='font-size:20px;font-weight:600'>Total: " + fmt(src.total) + "</span></div></div>" + ((src.nota || "").trim() ? "<div class='section'><div class='section-head'><span class='sh-label'>Notas</span><span class='sh-rule'></span></div><div class='textbox'>" + e(src.nota).replace(/\n/g, "<br>") + "</div></div>" : "") + "</div>" + jcmSignFoot(b, b.proName, "Presupuesto", patient.name || "", hoy, null);
    return { title: "Presupuesto \xB7 " + e(patient.name || ""), inner, b };
  }
  function imprimir(save, saved) {
    const list = saved ? saved.items || [] : items;
    if (!list.length) {
      window.jcmToast && window.jcmToast("Agrega al menos un tratamiento.", "info");
      return;
    }
    const d = docInner(saved);
    if (save) {
      window.jcmSaveDocToFolder && window.jcmSaveDocToFolder("Presupuesto - " + (patient.name || "Paciente") + " - " + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), window.jcmDocHTML(d.title, d.b, d.inner));
    } else {
      jcmPrintDoc(d.title, d.b, d.inner);
    }
  }
  function guardar() {
    if (!items.length) {
      window.jcmToast && window.jcmToast("Agrega al menos un tratamiento.", "info");
      return;
    }
    const p = { id: "pp" + Date.now(), fecha: (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" }), items: items.filter((i) => (i.name || "").trim()), subtotal, desc, total, validez: parseInt(validez, 10) || 15, nota: nota.trim() };
    updatePatient(patient.id, { presupuestos: [p, ...presupuestos] });
    setItems([]);
    setDescuento("");
    setNota("");
    window.jcmToast && window.jcmToast("Presupuesto guardado.", "ok");
    try {
      window.jcmAudit && window.jcmAudit("Presupuesto creado \xB7 " + patient.name + " \xB7 " + fmt(total));
    } catch (e) {
    }
  }
  function waLink(saved) {
    const src = saved || { items, desc, total, validez };
    const ph = (patient.phone || "").replace(/\D/g, "");
    if (ph.length < 8) {
      window.jcmToast && window.jcmToast("El paciente no tiene tel\xE9fono.", "info");
      return;
    }
    const clin = window.clinicName && window.clinicName() || "Medique";
    const L = ["*Presupuesto \xB7 " + clin + "*", "Hola " + (patient.name || "") + " \u{1F44B} Te compartimos tu presupuesto:", ""];
    (src.items || []).filter((i) => (i.name || "").trim()).forEach((i) => L.push("\u2022 " + i.name + (i.qty > 1 ? " x" + i.qty : "") + " \u2014 " + fmt((i.price || 0) * (i.qty || 1))));
    if (src.desc) L.push("Descuento: \u2212 " + fmt(src.desc));
    L.push("*Total: " + fmt(src.total) + "*", "V\xE1lido por " + (parseInt(src.validez, 10) || 15) + " d\xEDas.");
    window.open("https://wa.me/" + ph + "?text=" + encodeURIComponent(L.join("\n")), "_blank", "noopener");
  }
  async function enviarCorreo(saved) {
    const src = saved || { items, desc, total, validez };
    const to = (patient.email || "").trim();
    if (!to) {
      window.jcmToast && window.jcmToast("El paciente no tiene correo.", "info");
      return;
    }
    if (!window.mediqueEmail) {
      window.jcmToast && window.jcmToast("El correo no est\xE1 disponible.", "info");
      return;
    }
    const clin = window.clinicName && window.clinicName() || "Medique";
    const L = ["Hola " + (patient.name || "") + ",", "", "Te compartimos tu presupuesto en " + clin + ":", ""];
    (src.items || []).filter((i) => (i.name || "").trim()).forEach((i) => L.push("- " + i.name + (i.qty > 1 ? " x" + i.qty : "") + ": " + fmt((i.price || 0) * (i.qty || 1))));
    if (src.desc) L.push("Descuento: -" + fmt(src.desc));
    L.push("Total: " + fmt(src.total), "V\xE1lido por " + (parseInt(src.validez, 10) || 15) + " d\xEDas.");
    try {
      const r = await window.mediqueEmail({ to, subject: "Presupuesto \xB7 " + clin, text: L.join("\n"), replyTo: window.clinicReplyTo && window.clinicReplyTo() });
      window.jcmToast && window.jcmToast(r && r.ok ? "Presupuesto enviado a " + to : "No se pudo enviar el correo.", r && r.ok ? "ok" : "error");
    } catch (e) {
      window.jcmToast && window.jcmToast("No se pudo enviar el correo.", "error");
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 } }, "Arma un presupuesto para el paciente y comp\xE1rtelo. Sale con el ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "mismo dise\xF1o"), " que tus indicaciones."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("select", { value: pick, onChange: (e) => setPick(e.target.value), style: { ...inp, flex: 1, minWidth: 200 } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Agregar tratamiento\u2026"), servicios.map((s) => /* @__PURE__ */ React.createElement("option", { key: s.name, value: s.name }, s.name, " \xB7 ", fmt(s.price)))), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: addSvc }, "+ Agregar"), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: addCustom }, "+ \xCDtem libre")), items.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "14px 0" } }, "A\xFAn sin \xEDtems. Agrega tratamientos arriba.") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 } }, items.map((i, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, style: { display: "grid", gridTemplateColumns: "1fr 70px 120px 40px", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { value: i.name, onChange: (e) => upd(idx, { name: e.target.value }), placeholder: "Tratamiento", style: inp }), /* @__PURE__ */ React.createElement("input", { value: i.qty, onChange: (e) => upd(idx, { qty: parseInt(e.target.value.replace(/\D/g, ""), 10) || 1 }), inputMode: "numeric", style: { ...inp, textAlign: "center" } }), /* @__PURE__ */ React.createElement("input", { value: i.price, onChange: (e) => upd(idx, { price: parseInt(e.target.value.replace(/\D/g, ""), 10) || 0 }), inputMode: "numeric", placeholder: "Valor", style: { ...inp, textAlign: "right" } }), /* @__PURE__ */ React.createElement("button", { onClick: () => del(idx), style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, "Descuento ", descModo === "pct" ? "%" : "$", items.length >= 2 && /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", marginLeft: 8, borderRadius: 6, overflow: "hidden", border: "1px solid " + T.line, verticalAlign: "middle" } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setDescModo("monto"), style: { fontFamily: T.sans, fontSize: 9.5, padding: "3px 7px", border: "none", cursor: "pointer", background: descModo === "monto" ? T.accent : "transparent", color: descModo === "monto" ? T.onAccent || "#fff" : T.textMute } }, "$"), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setDescModo("pct"), style: { fontFamily: T.sans, fontSize: 9.5, padding: "3px 7px", border: "none", cursor: "pointer", background: descModo === "pct" ? T.accent : "transparent", color: descModo === "pct" ? T.onAccent || "#fff" : T.textMute } }, "%")), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", { value: descuento, onChange: (e) => setDescuento(e.target.value.replace(/\D/g, "")), inputMode: "numeric", placeholder: "0", style: { ...inp, width: 120, marginTop: 3 } }), descModo === "pct" && items.length >= 2 && /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontSize: 9.5, color: T.textFaint, marginTop: 3, maxWidth: 160 } }, "Se aplica al procedimiento de menor valor (", minItem ? minItem.name || "sin nombre" : "\u2014", ").")), /* @__PURE__ */ React.createElement("label", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textMute } }, "Vigencia (d\xEDas)", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", { value: validez, onChange: (e) => setValidez(e.target.value.replace(/\D/g, "")), inputMode: "numeric", style: { ...inp, width: 100, marginTop: 3 } })), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute } }, "Subtotal ", fmt(subtotal), desc ? " \xB7 Dcto \u2212 " + fmt(desc) : ""), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.serif, fontSize: 26, color: T.accent } }, "Total ", fmt(total)))), /* @__PURE__ */ React.createElement("textarea", { value: nota, onChange: (e) => setNota(e.target.value), rows: 2, placeholder: "Notas del presupuesto (opcional)\u2026", style: { ...inp, resize: "vertical", marginBottom: 12 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: guardar }, "Guardar presupuesto"), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => imprimir(false) }, "Imprimir"), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => imprimir(true) }, "Guardar en carpeta"), /* @__PURE__ */ React.createElement("button", { onClick: () => waLink(), style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#1F8A5B", background: "none", border: "1px solid #1F8A5B", borderRadius: 4, padding: "12px 16px", cursor: "pointer" } }, "WhatsApp"), /* @__PURE__ */ React.createElement("button", { onClick: () => enviarCorreo(), style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.accent, background: "none", border: "1px solid " + T.accent, borderRadius: 4, padding: "12px 16px", cursor: "pointer" } }, "Correo")), presupuestos.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Presupuestos guardados (", presupuestos.length, ")"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7 } }, presupuestos.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "11px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 160 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, color: T.text } }, (p.items || []).length, " tratamiento(s) \xB7 ", fmt(p.total)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint } }, p.fecha, " \xB7 vigencia ", p.validez, " d\xEDas")), /* @__PURE__ */ React.createElement("button", { onClick: () => imprimir(false, p), title: "Imprimir", style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" } }, "Imprimir"), /* @__PURE__ */ React.createElement("button", { onClick: () => waLink(p), title: "Enviar por WhatsApp", style: { fontFamily: T.sans, fontSize: 11, color: "#1F8A5B", background: "none", border: "1px solid #1F8A5B55", borderRadius: 7, padding: "6px 10px", cursor: "pointer" } }, "WhatsApp"), /* @__PURE__ */ React.createElement("button", { onClick: () => enviarCorreo(p), title: "Enviar por correo", style: { fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.accent + "55", borderRadius: 7, padding: "6px 10px", cursor: "pointer" } }, "Correo"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setItems(p.items || []);
    setDescuento(String(p.desc || ""));
    setDescModo("monto");
    setValidez(String(p.validez || 15));
    setNota(p.nota || "");
  }, title: "Reabrir para editar", style: { fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" } }, "Reabrir"), /* @__PURE__ */ React.createElement("button", { onClick: () => updatePatient(patient.id, { presupuestos: presupuestos.filter((x) => x.id !== p.id) }), style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 2, display: "flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" }))))))));
}
function RecetaTab({ T, patient, updatePatient }) {
  const D = window.JCDATA;
  const hoy = (/* @__PURE__ */ new Date()).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
  const canPrescribe = window.jcmCanPrescribeNow ? window.jcmCanPrescribeNow() : true;
  const [tipo, setTipo] = useState(canPrescribe ? "receta" : "indicaciones");
  const [diag, setDiag] = useState("");
  const [rp, setRp] = useState("");
  const [ind, setInd] = useState("");
  const [ctrl, setCtrl] = useState("");
  const [ctrlTime, setCtrlTime] = useState("");
  const [preview, setPreview] = useState(null);
  const [sigMedId, setSigMedId] = useState("auto");
  const [vadeOpen, setVadeOpen] = useState(false);
  const [med, setMed] = useState({ nombre: "", dosis: "1", forma: "comprimido", cada: "8", unidad: "horas", via: "Oral", indic: "" });
  function addMed() {
    if (!med.nombre.trim()) {
      window.jcmToast && window.jcmToast("Escribe el medicamento.", "info");
      return;
    }
    const linea = med.nombre.trim() + " \u2014 " + med.dosis + " " + med.forma + (parseInt(med.dosis, 10) > 1 ? "s" : "") + " cada " + med.cada + " " + med.unidad + " \xB7 v\xEDa " + med.via + (med.indic.trim() ? " (" + med.indic.trim() + ")" : "");
    setRp(rp ? rp + "\n" + linea : linea);
    setMed({ nombre: "", dosis: "1", forma: "comprimido", cada: "8", unidad: "horas", via: "Oral", indic: "" });
  }
  const fmtCtrl = (s) => {
    if (!s) return "";
    const m = ("" + s).match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
    if (!m) return s;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    if (isNaN(d)) return s;
    const base = d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    return m[4] ? base + " a las " + m[4] + ":" + m[5] + " hrs" : base;
  };
  const recetas = patient.recetas || [];
  const titleOf = (t) => t === "indicaciones" ? "Indicaciones post tratamiento" : "Receta m\xE9dica";
  const rpLabelOf = (t) => t === "indicaciones" ? "Indicaciones / cuidados" : "Rp. (medicamentos)";
  function guardar() {
    if (!rp.trim()) return;
    const ctrlVal = tipo === "indicaciones" && ctrl ? ctrl + (ctrlTime ? "T" + ctrlTime : "") : "";
    const r = { id: "rx" + Date.now(), tipo, fecha: hoy, diag: diag.trim(), rp: rp.trim(), ind: ind.trim(), ctrl: ctrlVal };
    updatePatient(patient.id, { recetas: [r, ...recetas] });
    setDiag("");
    setRp("");
    setInd("");
    setCtrl("");
    setCtrlTime("");
  }
  function imprimir(r, save) {
    const e = jcmDocEsc;
    const b = jcmDocBrand();
    const now = /* @__PURE__ */ new Date();
    const hoy2 = now.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const dotDate = String(now.getDate()).padStart(2, "0") + " \xB7 " + String(now.getMonth() + 1).padStart(2, "0") + " \xB7 " + now.getFullYear();
    const isInd = r.tipo === "indicaciones";
    const lines = r.rp.split("\n").map((l) => l.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean);
    const indHtml = lines.map((l) => "<li><span class='num'></span><span class='txt'>" + e(l) + "</span></li>").join("");
    const eyebrow = isInd ? "Cuidados posteriores" : "Prescripci\xF3n m\xE9dica";
    const titleHtml = isInd ? "Indicaciones <span class='it'>post tratamiento</span>" : "Receta <span class='it'>m\xE9dica</span>";
    const inner = jcmMasthead(b) + "<div class='titleblock'><div><div class='eyebrow'>" + eyebrow + "</div><h1 class='doc-title'>" + titleHtml + "</h1></div><div class='folio'><span class='k'>Fecha</span><span class='v vbig'>" + e(dotDate) + "</span></div></div>" + jcmPband(patient, [["RUT", patient.rut], ["Edad", patient.age ? patient.age + " a\xF1os" : ""]]) + (r.diag ? "<div class='diag'><div class='dx-tick'></div><div><span class='dx-k'>Diagn\xF3stico / Procedimiento</span></div><div class='dx-v'>" + e(r.diag) + "</div></div>" : "") + "<div class='body'><div class='section' style='margin-top:24px'><div class='section-head'><span class='sh-label'>" + (isInd ? "Indicaciones" : "Prescripci\xF3n") + "</span><span class='sh-rule'></span></div>" + (isInd ? "<ol class='indlist'>" + (lines.length ? indHtml : "<li><span class='num'></span><span class='txt' style='color:#8B9197'>Sin indicaciones registradas.</span></li>") + "</ol>" : `<div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:34px;color:#121A26;line-height:1;margin:8px 0 6px">Rp.</div><div class='textbox'>` + e(r.rp).replace(/\n/g, "<br>") + "</div>") + "</div>" + (r.ind ? "<div class='section'><div class='section-head'><span class='sh-label'>Notas adicionales</span><span class='sh-rule'></span></div><div class='textbox'>" + e(r.ind).replace(/\n/g, "<br>") + "</div></div>" : "") + (isInd ? "<div class='control-note'><span class='cn-icon'>+</span><div><span class='cn-k'>Control de evaluaci\xF3n</span><span class='cn-v'>" + (r.ctrl ? "Tu control est\xE1 agendado para el <b>" + e(fmtCtrl(r.ctrl)) + "</b>. Asiste para evaluar el resultado y realizar los ajustes que sean necesarios." : "Agenda tu control para evaluar el resultado y realizar los ajustes que sean necesarios.") + "</span></div></div>" : "") + "</div>" + jcmSignFoot(b, b.proName, titleOf(r.tipo), patient.name || "", hoy2, function() {
      try {
        var ms = window.DB.get("medic_sigs");
        if (!ms || !ms.length) return null;
        return sigMedId === "none" ? null : ms.find(function(s) {
          return s.id === sigMedId;
        }) || ms[0];
      } catch (_) {
        return null;
      }
    }());
    const docTitle = titleOf(r.tipo) + " \xB7 " + e(patient.name || "");
    if (save) {
      const fname = titleOf(r.tipo) + " - " + (patient.name || "Paciente") + " - " + (r.fecha || hoy2);
      window.jcmSaveDocToFolder && window.jcmSaveDocToFolder(fname, jcmDocHTML(docTitle, b, inner));
    } else {
      jcmPrintDoc(docTitle, b, inner);
    }
  }
  function enviarWa(r) {
    const clin = window.clinicName && window.clinicName() || "Medique";
    const pro = window.clinicPro && window.clinicPro() || "";
    const isInd = r.tipo === "indicaciones";
    const L = [
      "*" + titleOf(r.tipo).toUpperCase() + "*",
      "_" + clin + "_",
      "",
      "Fecha: " + r.fecha,
      "Paciente: " + (patient.name || "") + (patient.age ? " \xB7 " + patient.age + " a\xF1os" : "")
    ];
    if (r.diag) L.push((isInd ? "Procedimiento" : "Diagn\xF3stico") + ": " + r.diag);
    L.push("", "*" + (isInd ? "Indicaciones y cuidados" : "Prescripci\xF3n (Rp.)") + "*");
    const lines = r.rp.split("\n").map((l) => l.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean);
    if (isInd) lines.forEach((l) => L.push("\u2022 " + l));
    else L.push(r.rp);
    if (r.ind) {
      L.push("", "*Notas adicionales*", r.ind);
    }
    if (r.ctrl) {
      L.push("", "Control de evaluaci\xF3n: " + fmtCtrl(r.ctrl));
    }
    L.push("", "\u2014 " + [pro, clin].filter(Boolean).join(" \xB7 "));
    const reviewUrl = window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.reviewLink ? window.JCSAAS.reviewLink() : "";
    if (reviewUrl) L.push("", "\xBFC\xF3mo fue tu experiencia? Responde nuestra encuesta: " + reviewUrl);
    window.open("https://wa.me/" + (patient.phone || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(L.join("\n")), "_blank", "noopener");
  }
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 13.5, padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" };
  const seg = (active) => ({ flex: 1, fontFamily: T.sans, fontSize: 12.5, fontWeight: active ? 600 : 500, padding: "12px", borderRadius: 8, cursor: "pointer", background: active ? T.accent : T.surface, color: active ? T.onAccent || "#fff" : T.textMute, border: "1px solid " + (active ? T.accent : T.line) });
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 12, lineHeight: 1.5 } }, "Elige el tipo de documento seg\xFAn tu rol. Al imprimir (tama\xF1o carta) incluye el espacio para la ", /* @__PURE__ */ React.createElement("b", { style: { color: T.text } }, "firma del profesional"), "."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } }, canPrescribe && /* @__PURE__ */ React.createElement("button", { onClick: () => setTipo("receta"), style: seg(tipo === "receta") }, "Receta m\xE9dica", /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 400, marginTop: 2, opacity: 0.85 } }, "M\xE9dico / dentista")), /* @__PURE__ */ React.createElement("button", { onClick: () => setTipo("indicaciones"), style: seg(tipo === "indicaciones") }, "Indicaciones post tratamiento", /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 400, marginTop: 2, opacity: 0.85 } }, "Enfermer\xEDa")), !canPrescribe && /* @__PURE__ */ React.createElement("div", { style: { flexBasis: "100%", fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: -4 } }, "Solo M\xE9dico o Dentista pueden crear recetas m\xE9dicas.")), /* @__PURE__ */ React.createElement("div", { style: { background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 18, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Diagn\xF3stico (opcional)"), (() => {
    const DIAG_OPTS = ["Neuromodulaci\xF3n con Toxina botul\xEDnica", "Sculptra de col\xE1geno", "Armonizaci\xF3n facial"];
    const isOther = diag && !DIAG_OPTS.includes(diag);
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("select", { value: isOther ? "__other__" : diag, onChange: (e) => {
      const v = e.target.value;
      setDiag(v === "__other__" ? " " : v);
    }, style: inp }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecciona un diagn\xF3stico\u2026"), DIAG_OPTS.map((o) => /* @__PURE__ */ React.createElement("option", { key: o, value: o }, o)), /* @__PURE__ */ React.createElement("option", { value: "__other__" }, "Otro (escribir)\u2026")), isOther && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement("input", { style: inp, value: diag.trim(), onChange: (e) => setDiag(e.target.value), placeholder: "Escribe el diagn\xF3stico", autoFocus: true })));
  })()), /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginTop: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, rpLabelOf(tipo)), tipo === "indicaciones" && (() => {
    const tpls = window.getIndTemplates ? window.getIndTemplates() : [];
    return tpls.length ? /* @__PURE__ */ React.createElement("select", { value: "", onChange: (e) => {
      const t = tpls.find((x) => x.id === e.target.value);
      if (t) setRp(rp ? rp + "\n" + t.body : t.body);
      e.target.value = "";
    }, style: { ...inp, marginBottom: 8, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "+ Insertar plantilla de indicaciones\u2026"), tpls.map((t) => /* @__PURE__ */ React.createElement("option", { key: t.id, value: t.id }, t.name))) : null;
  })(), tipo === "receta" && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8, border: "1px solid " + T.line, borderRadius: 10, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setVadeOpen((o) => !o), style: { width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 13px", background: T.surface2 || T.surface, border: "none", cursor: "pointer", textAlign: "left", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: T.accent, strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M9 2v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 17l-5-9V2M8 2h8" })), "Vadem\xE9cum \xB7 agregar medicamento con posolog\xEDa", /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.textMute, strokeWidth: "1.8", style: { marginLeft: "auto", transform: vadeOpen ? "rotate(180deg)" : "none", transition: ".2s" } }, /* @__PURE__ */ React.createElement("path", { d: "m6 9 6 6 6-6" }))), vadeOpen && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 13px", display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: med.nombre, onChange: (e) => setMed({ ...med, nombre: e.target.value }), list: "jcm-vademecum", placeholder: "Medicamento (ej: Paracetamol 500 mg)", style: { ...inp } }), /* @__PURE__ */ React.createElement("datalist", { id: "jcm-vademecum" }, ["Paracetamol 500 mg", "Ibuprofeno 400 mg", "Amoxicilina 500 mg", "\xC1cido tranex\xE1mico 500 mg", "Diclofenaco 50 mg", "Cetirizina 10 mg", "Omeprazol 20 mg", "Clorfenamina 4 mg", "Metamizol 300 mg", "Ketoprofeno 100 mg", "Betametasona crema", "Mupirocina 2% ung\xFCento", "\xC1rnica t\xF3pica", "Vitamina C 1 g"].map((m) => /* @__PURE__ */ React.createElement("option", { key: m, value: m }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "70px 1fr 70px 1fr", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("input", { value: med.dosis, onChange: (e) => setMed({ ...med, dosis: e.target.value.replace(/[^0-9.]/g, "") }), inputMode: "decimal", style: { ...inp, textAlign: "center" } }), /* @__PURE__ */ React.createElement("select", { value: med.forma, onChange: (e) => setMed({ ...med, forma: e.target.value }), style: inp }, ["comprimido", "c\xE1psula", "ml", "gota", "aplicaci\xF3n", "sobre", "puff"].map((o) => /* @__PURE__ */ React.createElement("option", { key: o }, o))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", fontFamily: T.sans, fontSize: 12, color: T.textMute } }, "cada"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("input", { value: med.cada, onChange: (e) => setMed({ ...med, cada: e.target.value.replace(/\D/g, "") }), inputMode: "numeric", style: { ...inp, width: 60, textAlign: "center" } }), /* @__PURE__ */ React.createElement("select", { value: med.unidad, onChange: (e) => setMed({ ...med, unidad: e.target.value }), style: inp }, ["horas", "d\xEDas"].map((o) => /* @__PURE__ */ React.createElement("option", { key: o }, o))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement("select", { value: med.via, onChange: (e) => setMed({ ...med, via: e.target.value }), style: { ...inp, flex: "0 0 150px" } }, ["Oral", "T\xF3pica", "Subcut\xE1nea", "Intramuscular", "Sublingual", "Oft\xE1lmica"].map((o) => /* @__PURE__ */ React.createElement("option", { key: o }, o))), /* @__PURE__ */ React.createElement("input", { value: med.indic, onChange: (e) => setMed({ ...med, indic: e.target.value }), placeholder: "Indicaciones (ej: con comidas, por 5 d\xEDas)", style: { ...inp, flex: 1 } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, primary: true, onClick: addMed }, "+ Agregar a la receta")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10.5, color: T.textFaint } }, "Vadem\xE9cum de medicamentos gen\xE9ricos. Al agregar, la l\xEDnea se suma abajo con su posolog\xEDa."))), /* @__PURE__ */ React.createElement("textarea", { style: { ...inp, minHeight: 120, resize: "vertical" }, value: rp, onChange: (e) => setRp(e.target.value), placeholder: tipo === "indicaciones" ? "Elige una plantilla arriba o escribe aqu\xED\u2026" : "Ej.\nParacetamol 500 mg \u2014 1 comprimido cada 8 h por 3 d\xEDas\n\xC1rnica t\xF3pica \u2014 aplicar 2 veces al d\xEDa" })), /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginTop: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Notas adicionales (opcional)"), /* @__PURE__ */ React.createElement("textarea", { style: { ...inp, minHeight: 60, resize: "vertical" }, value: ind, onChange: (e) => setInd(e.target.value), placeholder: "Reposo relativo, control en 7 d\xEDas\u2026" })), tipo === "indicaciones" && /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginTop: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Fecha de control (opcional)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { type: "date", style: { ...inp, maxWidth: 200 }, value: ctrl, onChange: (e) => setCtrl(e.target.value) }), /* @__PURE__ */ React.createElement("input", { type: "time", style: { ...inp, maxWidth: 130 }, value: ctrlTime, onChange: (e) => setCtrlTime(e.target.value), disabled: !ctrl, title: ctrl ? "Hora del control (opcional)" : "Elige primero la fecha" })), /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 5 } }, 'Si la indicas, aparece en la secci\xF3n "Control de evaluaci\xF3n" del documento.')), (() => {
    try {
      var ms = window.DB.get("medic_sigs");
      if (!ms || ms.length < 2) return null;
      return /* @__PURE__ */ React.createElement("label", { style: { display: "block", marginTop: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 } }, "Firma del m\xE9dico en este documento"), /* @__PURE__ */ React.createElement("select", { value: sigMedId, onChange: (e) => setSigMedId(e.target.value), style: { ...inp, cursor: "pointer" } }, ms.map(function(s) {
        return /* @__PURE__ */ React.createElement("option", { key: s.id, value: s.id }, s.name);
      }), /* @__PURE__ */ React.createElement("option", { value: "none" }, "Sin firma del m\xE9dico")));
    } catch (_) {
      return null;
    }
  })(), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, textAlign: "right" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: guardar }, "Guardar ", tipo === "indicaciones" ? "indicaciones" : "receta"))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 } }, "Documentos del paciente (", recetas.length, ")"), recetas.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 12.5, color: T.textFaint } }, "A\xFAn no hay documentos. Crea el primero arriba."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, recetas.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.id, style: { display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { onClick: () => setPreview(r), title: "Ver indicaciones", style: { flex: 1, minWidth: 0, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.accent } }, titleOf(r.tipo), r.diag ? " \xB7 " + r.diag : ""), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, r.fecha, " \xB7 ", r.rp.split("\n")[0])), /* @__PURE__ */ React.createElement(AdBtn, { T, small: true, onClick: () => imprimir(r) }, "Imprimir"), /* @__PURE__ */ React.createElement("button", { onClick: () => imprimir(r, true), title: "Guardar el documento en una carpeta que elijas", style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "8px 11px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }), /* @__PURE__ */ React.createElement("path", { d: "M17 21v-8H7v8M7 3v5h8" })), "Guardar"), /* @__PURE__ */ React.createElement("button", { onClick: () => enviarWa(r), title: "Enviar por WhatsApp", style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#1F8A5B", background: "none", border: "1px solid #1F8A5B", borderRadius: 7, padding: "8px 11px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" }, /* @__PURE__ */ React.createElement("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" })), "WhatsApp"), /* @__PURE__ */ React.createElement("button", { onClick: () => updatePatient(patient.id, { recetas: recetas.filter((x) => x.id !== r.id) }), title: "Eliminar", style: { background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 2 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18M6 6l12 12" })))))), preview && /* @__PURE__ */ React.createElement(AdModal, { T, title: titleOf(preview.tipo), onClose: () => setPreview(null), footer: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => imprimir(preview) }, "Imprimir"), /* @__PURE__ */ React.createElement(AdBtn, { T, onClick: () => imprimir(preview, true) }, "Guardar en carpeta"), /* @__PURE__ */ React.createElement(AdBtn, { T, primary: true, onClick: () => enviarWa(preview) }, "WhatsApp")) }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 14 } }, preview.fecha, " \xB7 ", patient.name, patient.age ? " \xB7 " + patient.age + " a\xF1os" : ""), preview.diag && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 } }, "Diagn\xF3stico"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, color: T.text } }, preview.diag)), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: preview.ind ? 14 : 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 } }, preview.tipo === "indicaciones" ? "Indicaciones / cuidados" : "Rp. (medicamentos)"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 14, color: T.text, lineHeight: 1.7, whiteSpace: "pre-wrap" } }, preview.rp)), preview.ind && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 } }, "Notas adicionales"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, color: T.text, lineHeight: 1.6, whiteSpace: "pre-wrap" } }, preview.ind)), preview.ctrl && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 } }, "Control de evaluaci\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: T.sans, fontSize: 13.5, color: T.text, textTransform: "capitalize" } }, fmtCtrl(preview.ctrl)))));
}
Object.assign(window, { initials, Avatar, AdBtn, AdField, AdModal, AdTag, PacientesView, NewPatientModal, FichaMedica, NotasTab, NewEntryModal, ConsentView, SignConsentModal, ConsentTab, RecetaTab, ImagenesTab, FacturacionTab, CampanaTab, AuditoriaIA, ResumenIA, recitaFor, recitaDue, recitaMsg, recitaWa });
