/* ═══════════ JC · PANEL · PACIENTES / FICHA / CONSENTIMIENTOS ═══════════ */

function initials(n) { return n.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase(); }

/* ═══════════ DOCUMENTOS IMPRESOS · diseño editorial multi-clínica ═══════════
   El logo, el profesional, la clínica y la marca de agua se toman de la clínica
   ACTIVA (no hay nada fijo a JC Medical): cada clínica imprime con lo suyo. */
function jcmDocEsc(s) { return ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function jcmDocBrand(proNameOverride) {
  const D = window.JCDATA || {};
  // Multi-clínica: NO heredar el profesional/dirección de JC Medical (JCDATA). clinicPro()/clinicAddr()
  // ya respetan la clínica activa (base usa su seed; nuevas usan su config o queda en blanco).
  const proName = proNameOverride || (window.clinicPro && window.clinicPro()) || "";
  const clinName = (window.clinicName && window.clinicName()) || "Medique";
  const clinAddr = (window.clinicAddr && window.clinicAddr()) || "";
  const team = (window.CADMIN && window.CADMIN.team) || [];
  const proMember = team.find(t => t.name === proName);
  const proRole = (proMember && proMember.role) || "Medicina estética";
  // Marca / handle por clínica: usa cfg.clinic_handle si existe; si no, deriva del nombre.
  let cfg = {}; try { cfg = (window.DB && window.DB.get("cfg")) || {}; } catch (e) {}
  const handle = (cfg.clinic_handle || clinName.toLowerCase().replace(/[^a-z0-9.]/g, "")).replace(/^@/, "");
  const wm = (clinName.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("") || "jc").toLowerCase();
  return { proName, clinName, clinAddr, proRole, handle, wm, logoUrl: cfg.clinic_logo || "", markUrl: cfg.clinic_mark || "" };
}
const JCM_DOC_CSS = "@page{size:A4;margin:0}*{box-sizing:border-box;margin:0;padding:0}"
  + "html{-webkit-print-color-adjust:exact;print-color-adjust:exact}"
  + "body{font-family:'Jost',system-ui,-apple-system,'Segoe UI',sans-serif;color:#121A26;background:#fff;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}"
  + ".sheet{width:210mm;min-height:297mm;background:#fff;position:relative;overflow:hidden;padding:17mm 18mm 16mm;display:flex;flex-direction:column}"
  + ".wm{position:absolute;right:-14mm;bottom:-30mm;font-family:'Cormorant Garamond',serif;font-weight:500;font-style:italic;font-size:340px;line-height:1;color:#121A26;opacity:.030;pointer-events:none;letter-spacing:-.04em}"
  + ".masthead{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;padding-bottom:13px;border-bottom:1px solid rgba(18,26,38,.30);position:relative;z-index:1}"
  + ".brand{display:flex;flex-direction:column;gap:3px}.brand .mono{font-family:'Cormorant Garamond',serif;font-weight:500;font-style:italic;font-size:34px;line-height:.9;color:#121A26;letter-spacing:-.01em}.brand .mh-logo{height:50px;width:auto;max-width:62mm;object-fit:contain}.brand .wordmark{font-family:'Jost',sans-serif;font-weight:400;font-size:9.5px;letter-spacing:.32em;text-transform:lowercase;color:#646A72;padding-left:2px}"
  + ".clinic{text-align:right;display:flex;flex-direction:column;gap:3px;padding-top:4px}.clinic .name{font-family:'Jost',sans-serif;font-weight:500;font-size:11px;letter-spacing:.09em;color:#121A26}.clinic .line{font-family:'Jost',sans-serif;font-weight:300;font-size:9.5px;color:#646A72;line-height:1.5}.clinic .accent-tag{margin-top:2px;font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#5A748C;font-weight:500}"
  + ".titleblock{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:18px;position:relative;z-index:1}.eyebrow{font-family:'Jost',sans-serif;font-weight:500;font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:#5A748C;margin-bottom:8px}.doc-title{font-family:'Cormorant Garamond','Times New Roman',serif;font-weight:500;font-size:40px;line-height:.95;color:#121A26;letter-spacing:-.005em;margin:0}.doc-title .it{font-style:italic;font-weight:400}.folio{text-align:right;font-family:'Jost',sans-serif;flex-shrink:0}.folio .k{font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#8B9197;font-weight:500;display:block;margin-bottom:4px}.folio .v{font-size:12px;letter-spacing:.09em;color:#474D56;font-weight:400;font-variant-numeric:tabular-nums}.folio .vbig{font-family:'Jost',sans-serif;font-size:22px;font-weight:300;color:#121A26;letter-spacing:.05em;line-height:1}"
  + ".pband{margin-top:20px;background:#121A26;color:#F5F6F7;padding:18px 22px;display:flex;align-items:center;gap:26px;position:relative;z-index:1}.pband .pname{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:25px;line-height:1}.pband .pdivider{width:1px;align-self:stretch;background:rgba(245,246,247,.22)}.pband .pfields{display:flex;gap:24px;flex-wrap:wrap}.pfield .k{font-family:'Jost',sans-serif;font-size:7.5px;letter-spacing:.20em;text-transform:uppercase;color:#A4B6C6;font-weight:500;display:block;margin-bottom:4px}.pfield .v{font-family:'Jost',sans-serif;font-size:12px;font-weight:300;color:#F5F6F7;letter-spacing:.09em;font-variant-numeric:tabular-nums}.pband .status{margin-left:auto;display:flex;align-items:center;gap:7px}.pband .status .dot{width:6px;height:6px;border-radius:50%;background:#A4B6C6;box-shadow:0 0 0 3px rgba(164,182,198,.18)}.pband .status .lbl{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#F5F6F7;font-weight:400}"
  + ".body{flex:1;position:relative;z-index:1}.section{margin-top:22px}.section-head{display:flex;align-items:center;gap:12px;margin-bottom:13px}.section-head .sh-label{font-family:'Jost',sans-serif;font-weight:500;font-size:10px;letter-spacing:.20em;text-transform:uppercase;color:#121A26;white-space:nowrap}.section-head .sh-num{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:15px;color:#5A748C}.section-head .sh-rule{flex:1;height:1px;background:rgba(18,26,38,.14)}"
  + ".dgrid{display:grid;grid-template-columns:1fr 1fr;gap:0 40px}.dgrid.cols3{grid-template-columns:1fr 1fr 1fr;gap:0 32px}.drow{display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:9px 0;border-bottom:1px solid rgba(18,26,38,.14)}.drow .dk{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:.09em;text-transform:uppercase;color:#8B9197;font-weight:500;white-space:nowrap}.drow .dv{font-family:'Jost',sans-serif;font-size:12.5px;font-weight:300;color:#121A26;text-align:right;letter-spacing:.09em;min-width:30px}.drow .dv.tag{color:#5A748C;font-weight:400}"
  + ".dfull{padding:11px 0;border-bottom:1px solid rgba(18,26,38,.14);display:flex;align-items:baseline;justify-content:space-between;gap:18px}.dfull .dk{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:.09em;text-transform:uppercase;color:#8B9197;font-weight:500;white-space:nowrap}.dfull .dv{font-family:'Jost',sans-serif;font-size:12.5px;font-weight:300;color:#121A26;text-align:right}"
  + ".empty-note{border:1px solid rgba(18,26,38,.14);border-left:2px solid #6E8CA6;background:#F1F2F4;padding:14px 18px;font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:400;font-size:15px;color:#646A72}"
  + ".diag{margin-top:20px;display:flex;align-items:center;gap:18px;padding:16px 20px;border:1px solid rgba(18,26,38,.30);position:relative;z-index:1}.diag .dx-k{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#5A748C;font-weight:500}.diag .dx-v{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:23px;color:#121A26;margin-left:auto;text-align:right}.diag .dx-tick{width:3px;align-self:stretch;background:#6E8CA6;flex-shrink:0}"
  + ".indlist{list-style:none;margin:6px 0 0;padding:0;counter-reset:ind}.indlist li{display:flex;gap:18px;padding:15px 0;border-bottom:1px solid rgba(18,26,38,.14);counter-increment:ind;align-items:flex-start}.indlist li:last-child{border-bottom:none}.indlist .num{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:22px;color:#5A748C;line-height:1;min-width:26px;flex-shrink:0;font-variant-numeric:tabular-nums;padding-top:2px}.indlist .num:before{content:counter(ind)}.indlist .txt{font-family:'Jost',sans-serif;font-weight:300;font-size:13.5px;line-height:1.5;color:#121A26;padding-top:3px;flex:1}.indlist .txt strong{font-weight:500}"
  + ".control-note{margin-top:22px;background:#121A26;color:#F5F6F7;padding:18px 22px;display:flex;align-items:center;gap:18px;position:relative;z-index:1}.control-note .cn-icon{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:30px;color:#A4B6C6;line-height:1}.control-note .cn-k{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#A4B6C6;font-weight:500;display:block;margin-bottom:5px}.control-note .cn-v{font-family:'Jost',sans-serif;font-weight:300;font-size:13px;color:#F5F6F7;line-height:1.45}.control-note .cn-v b{font-weight:500}"
  + ".proc-head{margin-top:20px;display:flex;align-items:center;gap:18px;padding:16px 20px;border:1px solid rgba(18,26,38,.30);position:relative;z-index:1}.proc-head .ph-tick{width:3px;align-self:stretch;background:#6E8CA6;flex-shrink:0}.proc-head .ph-main{display:flex;flex-direction:column;gap:5px;flex:1}.proc-head .ph-k{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#5A748C;font-weight:500}.proc-head .ph-name{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:24px;color:#121A26;line-height:1}.proc-head .ph-name .z{color:#8B9197;font-style:italic;font-size:18px}.proc-head .ph-dose{margin-left:auto;text-align:right;flex-shrink:0}.proc-head .ph-dose .k{display:block;font-family:'Jost',sans-serif;font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#8B9197;font-weight:500;margin-bottom:4px}.proc-head .ph-dose .v{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:19px;color:#121A26;font-variant-numeric:tabular-nums}"
  + ".trio{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px}.trio .cell{border:1px solid rgba(18,26,38,.14);padding:12px 15px}.trio .ck{display:block;font-family:'Jost',sans-serif;font-size:8px;letter-spacing:.20em;text-transform:uppercase;color:#8B9197;font-weight:500;margin-bottom:6px}.trio .cv{font-family:'Jost',sans-serif;font-size:12.5px;font-weight:300;color:#121A26;letter-spacing:.09em}"
  + ".textbox{font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#3a414b;white-space:pre-wrap;line-height:1.7;margin-top:6px;min-height:40px}"
  + ".zgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:0 32px}.zrow{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid rgba(18,26,38,.14)}.zrow .zk{font-family:'Jost',sans-serif;font-size:11.5px;font-weight:300;color:#121A26;letter-spacing:.09em}.zrow .zv{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:600;font-size:15px;color:#5A748C;font-variant-numeric:tabular-nums}.totline{display:flex;justify-content:flex-end;align-items:baseline;gap:12px;margin-top:16px}.totline .tk{font-family:'Jost',sans-serif;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#8B9197;font-weight:500}.totline .tv{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:22px;color:#121A26;font-variant-numeric:tabular-nums}.totline .tv b{color:#5A748C;font-weight:600}"
  + ".signature{margin-top:34px;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;position:relative;z-index:1}.sign-block{min-width:230px}.sign-line{height:1px;background:rgba(18,26,38,.30);margin-bottom:9px}.sign-name{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:18px;color:#121A26}.sign-role{font-family:'Jost',sans-serif;font-weight:400;font-size:8.5px;letter-spacing:.20em;text-transform:uppercase;color:#646A72;margin-top:3px}.sign-stamp{text-align:right}.sign-stamp .mark{height:30px;width:auto;opacity:.7}.sign-stamp .mono{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:30px;color:#D3D7DC;line-height:.8;letter-spacing:-.02em}"
  + ".docfooter{margin-top:14px;padding-top:11px;border-top:1px solid rgba(18,26,38,.14);display:flex;align-items:center;justify-content:space-between;gap:16px;position:relative;z-index:1}.docfooter .f-l,.docfooter .f-r{font-family:'Jost',sans-serif;font-weight:300;font-size:8.5px;letter-spacing:.09em;color:#8B9197}.docfooter .f-r{text-transform:uppercase;letter-spacing:.20em}.docfooter .f-l .fdate{color:#646A72}"
  + ".sign-meta{font-family:'Jost',sans-serif;font-weight:300;font-size:8.5px;color:#8B9197;margin-top:3px;letter-spacing:.06em}";
function jcmMasthead(b) {
  const e = jcmDocEsc;
  const logoEl = b.logoUrl ? "<img class='mh-logo' src='" + b.logoUrl + "' alt=''>" : "<div class='mono'>" + e(b.clinName) + "</div>";
  return "<header class='masthead'><div class='brand'>" + logoEl + (b.handle ? "<div class='wordmark'>" + e(b.handle) + "</div>" : "") + "</div>"
    + "<div class='clinic'><div class='name'>" + e(b.proName || b.clinName) + "</div>"
    + (b.proRole ? "<div class='line'>" + e(b.proRole) + "</div>" : "")
    + (b.clinAddr ? "<div class='line'>" + e(b.clinAddr) + "</div>" : "")
    + (b.handle ? "<div class='accent-tag'>@" + e(b.handle) + "</div>" : "")
    + "</div></header>";
}
function jcmPband(patient, fields, estado) {
  const e = jcmDocEsc;
  const fl = (fields || []).filter(f => f[1]).map(f => "<div class='pfield'><span class='k'>" + f[0] + "</span><span class='v'>" + e(f[1]) + "</span></div>").join("");
  return "<div class='pband'><div class='pname'>" + e(patient.name || "—") + "</div><div class='pdivider'></div><div class='pfields'>" + fl + "</div>"
    + (estado ? "<div class='status'><span class='dot'></span><span class='lbl'>" + e(estado) + "</span></div>" : "") + "</div>";
}
function jcmSignFoot(b, proName, docLabel, patientName, fechaLarga, medSig) {
  const e = jcmDocEsc;
  const stamp = b.markUrl ? "<img class='mark' src='" + b.markUrl + "' alt=''>" : "<div class='mono'>" + e(b.wm) + "</div>";
  var medBlock = "";
  if (medSig) {
    var medMeta = [medSig.rut && "RUT " + medSig.rut, medSig.registro && "Reg. " + medSig.registro].filter(Boolean).join(" · ");
    medBlock = "<div class='sign-block'>"
      + (medSig.sig ? "<img src='" + medSig.sig + "' style='height:44px;width:auto;display:block;margin-bottom:6px;border-radius:2px'>" : "<div style='height:44px;margin-bottom:6px'></div>")
      + "<div class='sign-line'></div><div class='sign-name'>" + e(medSig.name) + "</div>"
      + "<div class='sign-role'>Médico responsable</div>"
      + (medMeta ? "<div class='sign-meta'>" + e(medMeta) + "</div>" : "")
      + "</div>";
  }
  return "<div class='signature'><div class='sign-block'><div class='sign-line'></div><div class='sign-name'>" + e(proName || b.clinName) + "</div>"
    + "<div class='sign-role'>" + e(b.proRole) + "</div></div>" + medBlock + "<div class='sign-stamp'>" + stamp + "</div></div>"
    + "<footer class='docfooter'><span class='f-l'>" + e(docLabel) + " · " + e(patientName) + " · Emitida <span class='fdate'>" + e(fechaLarga) + "</span></span><span class='f-r'>" + e(b.handle || b.clinName) + "</span></footer>";
}
// Envuelve el cuerpo en una hoja A4 completa y lo manda a imprimir.
// Devuelve el HTML COMPLETO del documento (para imprimir o guardar a archivo).
function jcmDocHTML(title, b, inner) {
  const e = jcmDocEsc;
  return "<!doctype html><html><head><meta charset='utf-8'><title>" + e(title) + "</title>"
    + "<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>"
    + "<link href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap' rel='stylesheet'>"
    + "<style>" + JCM_DOC_CSS + "</style></head><body><div class='sheet'><div class='wm'>" + e(b.wm) + "</div>" + inner + "</div></body></html>";
}
function jcmPrintDoc(title, b, inner) {
  const html = jcmDocHTML(title, b, inner);
  if (window.jcmPrintHTML) window.jcmPrintHTML(html);
  else { const w = window.open("", "_blank"); if (w) { w.document.write(html + "<script>window.print()<\/script>"); w.document.close(); } }
}
// Carpeta elegida por el usuario (recordada durante la sesión) para guardar indicaciones/recetas.
window._jcmDocDir = window._jcmDocDir || null;
// Guarda el documento en una carpeta que el usuario elige (File System Access API, Chrome/Edge).
// Si el navegador no lo soporta (Safari/Firefox), descarga el archivo a la carpeta de Descargas.
async function jcmSaveDocToFolder(filename, html) {
  filename = (filename || "documento").replace(/[\\/:*?"<>|]+/g, " ").trim() + ".html";
  if (window.showDirectoryPicker) {
    try {
      if (!window._jcmDocDir) window._jcmDocDir = await window.showDirectoryPicker({ mode: "readwrite", id: "medique-indicaciones", startIn: "documents" });
      const dir = window._jcmDocDir;
      if (dir.queryPermission) { let p = await dir.queryPermission({ mode: "readwrite" }); if (p !== "granted" && dir.requestPermission) p = await dir.requestPermission({ mode: "readwrite" }); if (p !== "granted") { window._jcmDocDir = null; throw new Error("sin permiso"); } }
      const fh = await dir.getFileHandle(filename, { create: true });
      const w = await fh.createWritable(); await w.write(html); await w.close();
      window.jcmToast && window.jcmToast("Guardado en tu carpeta: " + filename, "ok");
      return true;
    } catch (e) { if (e && e.name === "AbortError") return false; /* cae al fallback */ }
  }
  try {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    window.jcmToast && window.jcmToast("Descargado: " + filename + " · tu navegador no permite elegir carpeta (revisa Descargas).", "info");
    return true;
  } catch (e) { return false; }
}
if (typeof window !== "undefined") { window.jcmDocHTML = jcmDocHTML; window.jcmSaveDocToFolder = jcmSaveDocToFolder; }

function Avatar({ T, name, src, size }) {
  const s = size || 40;
  if (src) return <img src={src} alt={name} style={{ width: s, height: s, borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", flexShrink: 0 }} />;
  return <div style={{ width: s, height: s, borderRadius: "50%", background: T.surface2, border: "1px solid " + T.line, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: s * 0.4, color: T.accent, flexShrink: 0 }}>{initials(name)}</div>;
}

// ── Fase 1 del rediseño (JCDS): los componentes base consumen los tokens de window.JCDS
//    SOLO para Los Medique (flag lux, mismo gate del Dashboard). Las demás clínicas
//    conservan la UI actual hasta el push global. Misma API en ambos caminos.
function jcdsLux() {
  try { return !!(window.JCDS && typeof isLosMedique === "function" && isLosMedique()); } catch (e) { return false; }
}

function AdBtn({ T, children, onClick, primary, danger, subtle, full, small, disabled }) {
  const DS = window.JCDS;
  if (!(DS && jcdsLux())) return <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: full ? "100%" : "auto",
    fontFamily: T.sans, fontSize: small ? 10.5 : 11, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase",
    padding: small ? "9px 14px" : "13px 20px", borderRadius: 4, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .45 : 1,
    background: primary ? T.primaryBg : "transparent", color: primary ? T.primaryText : T.text, border: primary ? "none" : "1px solid " + T.chipBorder
  }}>{children}</button>;
  // 4 variantes (primary / ghost / danger / subtle) × 5 estados (hover, focus, active, disabled, normal)
  let bg, color, border;
  if (primary && danger) { bg = DS.danger; color = "#fff"; border = "none"; }
  else if (primary) { bg = T.primaryBg || T.accent; color = T.primaryText || T.onAccent || "#fff"; border = "none"; }
  else if (danger) { bg = "transparent"; color = DS.danger; border = "1px solid " + DS.dangerLine; }
  else if (subtle) { bg = T.chipBg; color = T.text; border = "1px solid transparent"; }
  else { bg = "transparent"; color = T.text; border = "1px solid " + T.line; }
  return <button onClick={disabled ? undefined : onClick} disabled={disabled}
    onMouseEnter={e => { if (disabled) return; const s = e.currentTarget.style; if (primary) s.filter = "brightness(1.07)"; else if (danger) s.background = DS.dangerBg; else { s.background = T.chipBg; s.borderColor = T.accent + "66"; } }}
    onMouseLeave={e => { const s = e.currentTarget.style; s.filter = ""; s.background = bg; if (border !== "none") s.border = border; s.transform = ""; }}
    onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = "scale(.985)"; }}
    onMouseUp={e => { e.currentTarget.style.transform = ""; }}
    onFocus={e => { e.currentTarget.style.boxShadow = DS.focus(T); }}
    onBlur={e => { e.currentTarget.style.boxShadow = ""; }}
    style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: full ? "100%" : "auto",
      height: small ? DS.h.ctlSm : DS.h.ctl, padding: small ? "0 12px" : "0 16px", boxSizing: "border-box",
      fontFamily: T.sans, fontSize: small ? 12 : DS.ft.body, fontWeight: 600, letterSpacing: ".01em", whiteSpace: "nowrap",
      borderRadius: DS.r.ctl, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? .45 : 1, outline: "none",
      background: bg, color: color, border: border,
      transition: DS.trans("background, border-color, box-shadow, transform, opacity, filter")
    }}>{children}</button>;
}

function AdField({ T, label, value, onChange, placeholder, inputMode, error }) {
  const nocap = inputMode === "email" || inputMode === "url";
  const DS = window.JCDS;
  if (!(DS && jcdsLux())) return <label style={{ display: "block" }}>
    <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>{label}</span>
    <input value={value} inputMode={inputMode} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      data-nocap={nocap ? "" : undefined}
      style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }} />
  </label>;
  return <label style={{ display: "block" }}>
    <span style={{ ...DS.text(T, "label"), display: "block", textTransform: "uppercase", marginBottom: 6 }}>{label}</span>
    <input value={value} inputMode={inputMode} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      data-nocap={nocap ? "" : undefined}
      onFocus={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.boxShadow = DS.focus(T); }}
      onBlur={e => { e.currentTarget.style.borderColor = error ? DS.danger : T.line; e.currentTarget.style.boxShadow = ""; }}
      style={{ ...DS.ctl(T), width: "100%", background: T.surface, ...(error ? { borderColor: DS.danger } : {}) }} />
    {error && typeof error === "string" && <span style={{ display: "block", marginTop: 5, fontFamily: T.sans, fontSize: DS.ft.sub, color: DS.danger }}>{error}</span>}
  </label>;
}

// Pila global de popups: ESC cierra SIEMPRE el más reciente (el de arriba), nunca el de
// abajo. Un único listener de teclado atiende toda la app. Lo usan AdModal y cualquier
// popup que llame useEscClose(onClose).
window.jcEscStack = window.jcEscStack || [];
if (!window._jcEscBound) {
  window._jcEscBound = true;
  window.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    var stack = window.jcEscStack;
    if (stack.length) { var fn = stack[stack.length - 1]; if (typeof fn === "function") { ev.stopPropagation(); fn(); } }
  }, true);
}
function useEscClose(onClose) {
  useEffect(() => {
    if (!onClose) return;
    const entry = onClose;
    window.jcEscStack.push(entry);
    return () => { const i = window.jcEscStack.lastIndexOf(entry); if (i >= 0) window.jcEscStack.splice(i, 1); };
  }, [onClose]);
}
window.useEscClose = useEscClose;

function AdModal({ T, title, onClose, children, footer, wide, huge }) {
  // El popup SIEMPRE queda entre la barra superior (≈66px) y el borde inferior, con
  // márgenes de seguridad (incluida el área segura de iOS). maxHeight:100% del área
  // disponible → el contenido largo (p. ej. "Nuevo procedimiento") hace scroll interno
  // sin salirse de pantalla ni quedar cortado.
  useEscClose(onClose); // ESC cierra este popup (el más reciente)
  const DS = window.JCDS, lux = DS && jcdsLux(); // Fase 1 JCDS: elevación overlay + título calibrado
  return (
    <div onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(4px)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", paddingTop: "calc(66px + env(safe-area-inset-top,0px))", paddingBottom: "calc(20px + env(safe-area-inset-bottom,0px))", paddingLeft: huge ? 12 : 16, paddingRight: huge ? 12 : 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: huge ? "97vw" : "100%", maxWidth: huge ? 1180 : (wide ? 720 : 460), maxHeight: "100%", background: T.bg, borderRadius: lux ? DS.r.panel : 16, border: "1px solid " + T.line, boxShadow: lux ? DS.el.overlay : undefined, display: "flex", flexDirection: "column", animation: "jcSlideUp .3s " + T.ease, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: lux ? "16px 20px" : "18px 20px", borderBottom: "1px solid " + T.line }}>
          <div style={{ fontFamily: T.serif, fontSize: lux ? 20 : 22, fontWeight: lux ? 400 : 300, letterSpacing: lux ? "-.01em" : undefined, color: T.text }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMute, display: "flex", padding: 4 }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
        </div>
        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>{children}</div>
        {footer && <div style={{ padding: "14px 20px", borderTop: "1px solid " + T.line }}>{footer}</div>}
      </div>
    </div>
  );
}

// Las imágenes clínicas (base64, pesadas) se guardan en su PROPIA clave por paciente
// (pimg_<id>), fuera del documento de pacientes. Así la ficha (sesiones, consentimientos,
// datos) se mantiene liviana y se guarda siempre, sin chocar con el límite de almacenamiento.
function patImgKey(id) { return "pimg_" + id; }
function patImages(p) {
  if (!p) return [];
  try { const v = window.DB && window.DB.get(patImgKey(p.id)); if (Array.isArray(v)) return v; } catch (e) {}
  return p.images || [];
}
// Los CONSENTIMIENTOS de cada paciente viven en su propio documento (pcons_<id>), fuera del
// documento de pacientes. Así cada uno es pequeño, SÍ sube a la nube y se ve en todos los
// dispositivos en tiempo real, sin chocar con el límite de 1 MB por documento de Firestore.
function patConsKey(id) { return "pcons_" + id; }
// Recorta el espacio en blanco de una firma (deja solo el trazo) para que se vea grande
// en el documento. Funciona con firmas ya guardadas. Async (carga la imagen en un canvas).
function cropSignatureDataUrl(dataUrl) {
  return new Promise(function (resolve) {
    if (!dataUrl || typeof dataUrl !== "string") return resolve(dataUrl);
    var img = new Image();
    img.onload = function () {
      try {
        var w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) return resolve(dataUrl);
        var c = document.createElement("canvas"); c.width = w; c.height = h;
        var ctx = c.getContext("2d"); ctx.drawImage(img, 0, 0);
        var d = ctx.getImageData(0, 0, w, h).data;
        var minX = w, minY = h, maxX = 0, maxY = 0, found = false;
        for (var y = 0; y < h; y++) { for (var x = 0; x < w; x++) { var i = (y * w + x) * 4; var br = (d[i] + d[i + 1] + d[i + 2]) / 3; if (br < 185) { found = true; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; } } }
        if (!found) return resolve(dataUrl);
        var pad = Math.round(Math.max(w, h) * 0.04);
        minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad); maxX = Math.min(w, maxX + pad); maxY = Math.min(h, maxY + pad);
        var cw = maxX - minX, ch = maxY - minY;
        if (cw < 4 || ch < 4) return resolve(dataUrl);
        var oc = document.createElement("canvas"); oc.width = cw; oc.height = ch;
        oc.getContext("2d").drawImage(img, minX, minY, cw, ch, 0, 0, cw, ch);
        resolve(oc.toDataURL("image/jpeg", 0.9));
      } catch (e) { resolve(dataUrl); }
    };
    img.onerror = function () { resolve(dataUrl); };
    img.src = dataUrl;
  });
}
// Reduce el peso de una foto subida (consentimiento en papel) antes de guardarla.
function compressImageDataUrl(dataUrl, maxW, q) {
  return new Promise(function (resolve) {
    if (!dataUrl || typeof dataUrl !== "string") return resolve(dataUrl);
    var img = new Image();
    img.onload = function () {
      try {
        var w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) return resolve(dataUrl);
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        var c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", q || 0.62));
      } catch (e) { resolve(dataUrl); }
    };
    img.onerror = function () { resolve(dataUrl); };
    img.src = dataUrl;
  });
}
function patConsents(p) {
  if (!p) return [];
  try {
    // Nuevo formato: manifest en pconsm_<id>, cada consentimiento en pcons_<id>_<ts>
    var manifest = window.DB && window.DB.get("pconsm_" + p.id);
    if (Array.isArray(manifest) && manifest.length > 0) {
      var items = [];
      manifest.forEach(function(ts) {
        try { var c = window.DB.get("pcons_" + p.id + "_" + ts); if (c) items.push(c); } catch(e2) {}
      });
      if (items.length > 0) return items.sort(function(a,b){ return (b.ts||0)-(a.ts||0); });
    }
    // Formato anterior: array completo en pcons_<id> (se migrará al abrir la ficha)
    var v = window.DB && window.DB.get(patConsKey(p.id));
    if (Array.isArray(v) && v.length > 0) return v;
  } catch(e) {}
  return p.consents || (p.consentDoc ? [p.consentDoc] : []);
}

function AdTag({ T, tone, children }) {
  const DS = window.JCDS;
  if (!(DS && jcdsLux())) {
    const c = { ok: "#1F8A5B", warn: T.gold, danger: "#C0285A", muted: T.textFaint }[tone] || T.accent;
    return <span style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: c, border: "1px solid " + c, borderRadius: 999, padding: "4px 9px", whiteSpace: "nowrap" }}>{children}</span>;
  }
  // Fase 1 JCDS: chips con fondo semántico suave (una sola fuente de verdad para ok/warn/danger)
  const m = {
    ok: [DS.ok, DS.okBg, DS.okLine],
    warn: [DS.warn, DS.warnBg, DS.warnLine],
    danger: [DS.danger, DS.dangerBg, DS.dangerLine],
    muted: [T.textMute, "transparent", T.line]
  }[tone] || [T.accent, T.chipBg, T.chipBorder];
  return <span style={{ display: "inline-flex", alignItems: "center", fontFamily: T.sans, fontSize: DS.ft.eyebrow, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: m[0], background: m[1], border: "1px solid " + m[2], borderRadius: DS.r.pill, padding: "3px 9px", whiteSpace: "nowrap", lineHeight: 1.4 }}>{children}</span>;
}

/* ─────────── PACIENTES ─────────── */
// Reglas de re-cita: SOLO para esquemas de tratamiento en curso.
//   · Toxina botulínica → refuerzo a los 3 meses.
//   · Sculptra → siguiente dosis a los 2 meses, hasta completar el esquema de 3 sesiones.
// No aplica a pacientes nuevos cuyo recordatorio recién será en algunos meses.
// Convierte una fecha (ISO "YYYY-MM-DD" o "DD-MM-AA") a timestamp; 0 si no se puede.
function _recitaTs(s) {
  if (!s) return 0;
  s = ("" + s).trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]).getTime();
  m = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})/);
  if (m) { let y = +m[3]; if (y < 100) y += 2000; return new Date(y, +m[2] - 1, +m[1]).getTime(); }
  const t = Date.parse(s); return isNaN(t) ? 0 : t;
}
// Normaliza abreviaturas de procedimiento del Excel (B3Z, BFF, Sculptra, Rino, Lipolítico…) a su precio.
var JCM_PROC_ABBR = [
  { re: /b3z\s*\+\s*lifting/i, price: 170000 },
  { re: /\bbff\b|full\s*face/i, price: 350000 },
  { re: /\bb3z\b|botox\s*3/i, price: 150000 },
  { re: /sculptra|bioestim|col[aá]g/i, price: 450000 },
  { re: /\brino\b|rinomodel/i, price: 200000 },
  { re: /lipol[ií]tic|quemador/i, price: 300000 },
  { re: /bruxismo/i, price: 240000 }
];
function jcmProcPrice(name) {
  if (!name) return 0;
  var nm = ("" + name).toLowerCase().trim();
  try { var svc = (window.clinicServiceList ? window.clinicServiceList() : []).find(x => (x.name || "").toLowerCase() === nm); if (svc && svc.price) return svc.price; } catch (e) {}
  for (var i = 0; i < JCM_PROC_ABBR.length; i++) if (JCM_PROC_ABBR[i].re.test(nm)) return JCM_PROC_ABBR[i].price;
  try { var svc2 = (window.clinicServiceList ? window.clinicServiceList() : []).find(x => (x.name || "").toLowerCase().indexOf(nm) >= 0 && x.price); if (svc2 && svc2.price) return svc2.price; } catch (e) {}
  return 0;
}
if (typeof window !== "undefined") window.jcmProcPrice = jcmProcPrice;
function recitaFor(p) {
  const fmtP = n => "$" + (n || 0).toLocaleString("es-CL");
  const tag = ((p.tags && p.tags[0]) || "").toLowerCase();
  const hist = p.history || [];
  const toxRe = /botox|toxina|botul|bruxismo|hiperhidro|gingival|nefertiti|empedrado|\bb3z\b|\bbff\b|full\s*face/i;
  const scuRe = /sculptra|bioestim|col[aá]g|estimul/i;
  // Última sesión de cada familia según el HISTORIAL CLÍNICO (no solo los tags).
  const fechado = hist.filter(h => h && _recitaTs(h.date || h.fecha)).sort((a, b) => _recitaTs(b.date || b.fecha) - _recitaTs(a.date || a.fecha));
  const ahRe = /rino|hialur|armoniz|relleno/i;
  const lastTox = fechado.find(h => toxRe.test(h.proc || h.title || ""));
  const lastScu = fechado.find(h => scuRe.test(h.proc || h.title || ""));
  const lastAh = fechado.find(h => ahRe.test(h.proc || h.title || ""));
  // Elige la familia de la sesión MÁS reciente; si no hay historial, cae al tag.
  const cand = [
    lastTox && { fam: "toxina", ts: _recitaTs(lastTox.date || lastTox.fecha) },
    lastScu && { fam: "sculptra", ts: _recitaTs(lastScu.date || lastScu.fecha) },
    lastAh && { fam: "rino", ts: _recitaTs(lastAh.date || lastAh.fecha) }
  ].filter(Boolean).sort((a, b) => b.ts - a.ts);
  let pick = cand.length ? cand[0].fam
    : (toxRe.test(tag) ? "toxina" : scuRe.test(tag) ? "sculptra" : ahRe.test(tag) ? "rino" : null);
  if (!pick) return null;
  let umbral, motivo, msg, precio, fam, refTs;
  if (pick === "toxina") {
    fam = "toxina"; umbral = 3;
    precio = jcmProcPrice((lastTox && (lastTox.proc || lastTox.title)) || tag) || 150000; // valor actual del procedimiento
    motivo = "Toxina · refuerzo a 3 meses";
    msg = "te contactamos para ver si deseas renovar tu toxina botulínica para mantener tu resultado natural";
    refTs = lastTox ? _recitaTs(lastTox.date || lastTox.fecha) : _recitaTs(p.lastVisit);
  } else if (pick === "sculptra") {
    fam = "sculptra"; umbral = 2; precio = 280000;
    const ses = hist.filter(h => scuRe.test(h.proc || h.title || "")).length || 1;
    if (ses >= 3) return null; // esquema de 3 sesiones completo
    motivo = "Sculptra · sesión " + (ses + 1) + " de 3 (a 2 meses)";
    msg = "tu siguiente sesión de Sculptra potencia y prolonga tu colágeno (vas en la sesión " + (ses + 1) + " de 3)";
    refTs = lastScu ? _recitaTs(lastScu.date || lastScu.fecha) : _recitaTs(p.lastVisit);
  } else {
    fam = "rino"; umbral = 10; precio = 0; // sin precio definido → el WhatsApp no muestra valor
    motivo = "Rinomodelación · mantención a 10 meses";
    msg = "ya es buen momento para evaluar y renovar tu rinomodelación y mantener tu resultado";
    refTs = lastAh ? _recitaTs(lastAh.date || lastAh.fecha) : _recitaTs(p.lastVisit);
  }
  if (!refTs) return null;
  const meses = (Date.now() - refTs) / (1000 * 60 * 60 * 24 * 30.44);
  const desc = precio > 20000 ? precio - 20000 : precio; // precio preferente: valor actual − $20.000
  const due = new Date(refTs + umbral * 30.44 * 24 * 60 * 60 * 1000);
  return { fam, motivo, msg, due, vence: meses >= umbral, precio, desc, precioFmt: fmtP(precio), descFmt: fmtP(desc) };
}
// Lista de pacientes cuyo plazo de re-cita ya se cumplió (para notificaciones / pendientes).
function recitaDue(patients) { return (patients || []).map(p => ({ p, r: recitaFor(p) })).filter(x => x.r && x.r.vence); }
// Mensaje de WhatsApp que muestra el precio real y luego el precio preferente (en pesos, no en %).
function recitaMsg(p, r) {
  const first = (p.name || "").split(" ")[0] || "";
  const base = "Hola " + first + ", te saludamos de " + ((window.clinicName && window.clinicName()) || "tu clínica") + ". " + (r.msg.charAt(0).toUpperCase() + r.msg.slice(1)) + ".";
  const precioTxt = r.precio ? " El valor actual es de " + r.precioFmt + " y, por ser parte de la clínica, te lo dejamos en " + r.descFmt + "." : "";
  return base + precioTxt + " ¿Te gustaría gestionar tu hora?";
}
function recitaWa(p, r) { return "https://wa.me/" + (p.phone || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(recitaMsg(p, r)); }
function PacientesView({ T, patients, appts, onOpen, updatePatient, addPatient }) {
  const [q, setQ] = useState("");
  const [nuevo, setNuevo] = useState(false);
  const [filt, setFilt] = useState("calendario");
  const [openCamp, setOpenCamp] = useState(false);
  // Mapa id→timestamp de la última vez que se abrió la ficha (para el filtro "Recientes").
  const opened = (() => { try { return (window.DB && DB.get("pat_opened")) || {}; } catch (e) { return {}; } })();
  function openPatient(id) {
    try { const m = (window.DB && DB.get("pat_opened")) || {}; m[id] = Date.now(); window.DB && DB.set("pat_opened", m); } catch (e) {}
    onOpen(id);
  }
  const ax = appts || [];
  const meta = p => { const ag = ax.some(a => a.name === p.name); const comp = (p.history || []).length > 0; return { ag, comp, inte: !comp && !ag }; };
  const ql = q.trim().toLowerCase();
  const qlNorm = ql.replace(/[^0-9k]/g, "");
  let list = patients.filter(p => {
    if (ql && !(p.name.toLowerCase().includes(ql) || (p.rut || "").toLowerCase().includes(ql) || (qlNorm.length >= 3 && (p.rut || "").replace(/[^0-9kK]/g, "").toLowerCase().includes(qlNorm)))) return false;
    const m = meta(p);
    if (filt === "agendado" && !m.ag) return false;
    if (filt === "comprado" && !m.comp) return false;
    if (filt === "interesado" && !m.inte) return false;
    return true;
  });
  // Fecha del paciente "según la agenda": la de su cita más reciente en el panel. Si no tiene
  // cita, usa la fecha guardada (Excel importado o creación). Así Calendario respeta la agenda oficial.
  const apptFechaTs = p => {
    let best = 0;
    (ax).forEach(a => {
      if (!((a.patId && a.patId === p.id) || a.name === p.name)) return;
      if (!a.fecha) return;
      const ts = new Date(a.fecha + "T00:00:00").getTime();
      if (!isNaN(ts) && ts > best) best = ts;
    });
    return best;
  };
  const calTs = p => apptFechaTs(p) || p.fechaTs || 0;
  // Modo "Calendario": ordenado por la fecha de la agenda (o Excel/creación), más reciente primero.
  if (filt === "calendario") list = list.slice().sort((a, b) => calTs(b) - calTs(a));
  // Modo "Recientes": ordenado por cuándo se abrió la ficha por última vez (sin importar la fecha de registro).
  if (filt === "recientes") list = list.slice().sort((a, b) => (opened[b.id] || 0) - (opened[a.id] || 0));
  const fmtFecha = ts => ts ? new Date(ts).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" }) : "";
  const fmtVisto = ts => ts ? new Date(ts).toLocaleDateString("es-CL", { day: "2-digit", month: "short" }) + ", " + new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }) : "Sin abrir";
  const recitas = patients.map(p => ({ p, r: recitaFor(p) })).filter(x => x.r);
  const recitasDue = recitas.filter(x => x.r.vence);
  const waLink = (p, r) => recitaWa(p, r);
  const fmtD = d => d.toLocaleDateString("es-CL", { day: "numeric", month: "short" });
  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  const chip = (k, l, set, cur) => <button key={k} onClick={() => set(k)} style={luxF
    ? { fontFamily: T.sans, fontSize: DS.ft.sub, fontWeight: cur === k ? 600 : 500, padding: "7px 13px", borderRadius: DS.r.pill, cursor: "pointer", border: "1px solid " + (cur === k ? T.accent : T.line), background: cur === k ? T.accent + "14" : "transparent", color: cur === k ? T.accent : T.textMute, transition: DS.trans("background,border-color,color") }
    : { fontFamily: T.sans, fontSize: 11, padding: "7px 12px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (cur === k ? T.accent : T.line), background: cur === k ? T.surface2 : T.surface, color: cur === k ? T.text : T.textMute }}>{l}</button>;
  return (
    <div style={{ padding: "4px 0 20px" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.6" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nombre o RUT…" style={luxF
            ? { ...DS.ctl(T), width: "100%", height: DS.h.ctl + 4, padding: "0 14px 0 38px" }
            : { width: "100%", padding: "12px 14px 12px 38px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }} />
        </div>
        <AdBtn T={T} primary onClick={() => setNuevo(true)}>+ Paciente</AdBtn>
      </div>
      {/* filtros */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        {chip("calendario", "Calendario", setFilt, filt)}{chip("recientes", "Recientes", setFilt, filt)}{chip("todos", "Todos", setFilt, filt)}{chip("agendado", "Agendado", setFilt, filt)}{chip("comprado", "Comprado", setFilt, filt)}{chip("interesado", "Interesado", setFilt, filt)}
      </div>
      {/* campañas de re-cita */}
      <button onClick={() => setOpenCamp(!openCamp)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10, marginBottom: 12, cursor: "pointer", background: recitasDue.length ? "rgba(31,138,91,.08)" : T.surface, border: "1px solid " + (recitasDue.length ? "rgba(31,138,91,.35)" : T.line) }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={recitasDue.length ? "#1F8A5B" : T.textMute} strokeWidth="1.6"><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></svg>
        <span style={{ flex: 1, textAlign: "left", fontFamily: T.sans, fontSize: 12.5, fontWeight: 500, color: T.text }}>Campañas de re-cita por WhatsApp{recitasDue.length ? " · " + recitasDue.length + " para contactar hoy" : ""}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.6" style={{ transform: openCamp ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {openCamp && (
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
          {/* Solo pacientes que YA cumplieron su plazo de re-aplicación (toxina 3 m · Sculptra 2 m).
              No se muestran proyecciones de fechas futuras: la campaña se activa cuando llega el momento. */}
          {recitasDue.length === 0 && (
            <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textFaint, padding: "12px 13px", background: T.surface, border: "1px dashed " + T.line, borderRadius: 9, lineHeight: 1.5 }}>
              Ningún paciente cumple hoy su plazo de re-aplicación. Cuando un paciente alcance su ventana
              (toxina a los 3 meses · Sculptra a los 2 meses desde su última sesión), aparecerá aquí listo para contactar.
            </div>
          )}
          {recitasDue.sort((a, b) => a.r.due - b.r.due).map(({ p, r }) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", borderRadius: 9, background: "rgba(31,138,91,.06)", border: "1px solid rgba(31,138,91,.4)" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text }}>{p.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{r.motivo} · cumplió su plazo el {fmtD(r.due)}</div>
              </div>
              <AdTag T={T} tone="ok">Contactar</AdTag>
              <a href={waLink(p, r)} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, color: "#1F8A5B", textDecoration: "none", border: "1px solid #1F8A5B", borderRadius: 7, padding: "8px 11px" }}>WhatsApp</a>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {list.map(p => (
          <button key={p.id} onClick={() => openPatient(p.id)} style={luxF
            ? { display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left", padding: "13px 10px", margin: "0 -10px", borderRadius: DS.r.ctl, cursor: "pointer", background: "none", border: "none", borderBottom: "1px solid " + T.lineSoft, transition: DS.trans("background") }
            : { display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left", padding: "14px 6px", cursor: "pointer", background: "none", border: "none", borderBottom: "1px solid " + T.lineSoft }}
            onMouseEnter={luxF ? e => { e.currentTarget.style.background = T.surface2 || T.surface; } : undefined}
            onMouseLeave={luxF ? e => { e.currentTarget.style.background = "none"; } : undefined}>
            <Avatar T={T} name={p.name} size={44} />
            {/* Nombre y RUT, uno arriba del otro */}
            <div style={{ width: 210, flexShrink: 0, minWidth: 0 }}>
              <div style={{ fontFamily: T.sans, fontSize: 14.5, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 3 }}>{p.rut}{p.age ? " · " + p.age + " años" : ""}</div>
            </div>
            {/* Teléfono y correo, horizontales, ocupando el espacio central */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", gap: 24, alignItems: "center" }}>
              {p.phone && <div style={{ width: 150, flexShrink: 0 }}>
                <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 2 }}>Teléfono</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, whiteSpace: "nowrap" }}>{p.phone}</div>
              </div>}
              {p.email && <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.sans, fontSize: 8.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 2 }}>Correo</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.email}</div>
              </div>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
              {filt === "recientes"
                ? <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: opened[p.id] ? T.accent : T.textFaint, whiteSpace: "nowrap" }}>{fmtVisto(opened[p.id])}</span>
                : (calTs(p)
                  ? <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.accent, whiteSpace: "nowrap" }}>{fmtFecha(calTs(p))}</span>
                  : (filt === "calendario" ? <span style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint, whiteSpace: "nowrap" }}>Sin fecha</span> : null))}
              {p.tags && p.tags[0] && <AdTag T={T}>{p.tags[0]}</AdTag>}
              {!p.consent && <AdTag T={T} tone="warn">Consent. pend.</AdTag>}
            </div>
          </button>
        ))}
        {list.length === 0 && <div style={{ padding: "30px 0", textAlign: "center", fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Sin resultados.</div>}
      </div>
      {nuevo && <NewPatientModal T={T} onClose={() => setNuevo(false)} onSave={p => { addPatient(p); setNuevo(false); }} />}
    </div>
  );
}

function NewPatientModal({ T, onClose, onSave }) {
  const [f, setF] = useState({ name: "", rut: "", age: "", phone: "+56 9 ", email: "" });
  const onlyLetters = v => v.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s.]/g, "");
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
  return (
    <AdModal T={T} title="Nuevo paciente" onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave({ ...f, name: f.name.trim(), age: parseInt(f.age, 10) || 0 })}>Guardar paciente</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <AdField T={T} label="Nombre completo" value={f.name} onChange={v => setF({ ...f, name: onlyLetters(v) })} placeholder="Ej: Valentina Pérez" />
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr .8fr", gap: 10 }}>
          <div>
            <AdField T={T} label="RUT" value={f.rut} onChange={v => setF({ ...f, rut: (window.jcmFmtRut ? window.jcmFmtRut(v) : v) })} placeholder="20.090.534-2" />
            {f.rut.trim() && !rutOk && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: "#C0285A", marginTop: 5 }}>RUT inválido (revisa el dígito verificador).</div>}
          </div>
          <AdField T={T} label="Edad" value={f.age} onChange={v => setF({ ...f, age: v.replace(/\D/g, "").slice(0, 3) })} inputMode="numeric" placeholder="32" />
        </div>
        <AdField T={T} label="Teléfono (WhatsApp)" value={f.phone} onChange={onPhone} inputMode="numeric" />
        <div>
          <AdField T={T} label="Correo (opcional)" value={f.email} onChange={v => setF({ ...f, email: v })} inputMode="email" placeholder="correo@ejemplo.com" />
          {f.email.trim() && !emailOk && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: "#C0285A", marginTop: 5 }}>Correo inválido.</div>}
        </div>
      </div>
    </AdModal>
  );
}

/* ─────────── FICHA MÉDICA ─────────── */
// Eliminar una sesión del historial clínico, confirmando con la clave (PIN) del profesional que la realizó.
function SesionDeleteModal({ T, sesion, onClose, onConfirm }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const team = (((window.CADMIN || {}).team) || []).filter(t => t.active !== false);
  const pro = team.find(t => t.id === sesion.proId) || team.find(t => t.name === sesion.proName);
  function go() {
    if (pro && pro.pin) { if (pin !== pro.pin) { setErr("Clave incorrecta. Solo " + (pro.name || "el profesional") + " puede eliminar su sesión."); return; } }
    else if (pin.length < 1) { setErr("Ingresa una clave para confirmar."); return; }
    onConfirm();
  }
  return (
    <AdModal T={T} title="Eliminar sesión" onClose={onClose} footer={<div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><AdBtn T={T} onClick={onClose}>Cancelar</AdBtn><AdBtn T={T} primary onClick={go}>Eliminar</AdBtn></div>}>
      <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5, marginBottom: 12 }}>
        Vas a eliminar la sesión <b style={{ color: T.text }}>{sesion.proc || "—"}</b>{sesion.date ? " del " + sesion.date : ""}. {sesion.proName ? ("Confirma con la clave de " + sesion.proName + ".") : "Confirma con la clave del profesional."}
      </div>
      <input type="password" value={pin} autoFocus onChange={e => { setPin(e.target.value.replace(/\D/g, "").slice(0, 6)); setErr(""); }} onKeyDown={e => { if (e.key === "Enter") go(); }} inputMode="numeric" placeholder="Clave del profesional"
        style={{ width: "100%", padding: "12px 13px", borderRadius: 6, border: "1px solid " + (err ? "#C0285A" : T.line), background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, letterSpacing: ".3em", textAlign: "center", outline: "none" }} />
      {err && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: "#C0285A", marginTop: 8 }}>{err}</div>}
    </AdModal>
  );
}
// Pacientes que aún necesitan consentimiento, EXCLUYENDO a quienes se marcaron "no asistió"
// en la agenda y no tienen otra cita activa (si no vinieron, no se les pide consentimiento).
function jcmConsentPending(patients, appts) {
  appts = appts || [];
  // Pacientes con cita ACTIVA próxima (hoy o futura, o pasada sin atender) cuyo procedimiento
  // NO sea evaluación. El matcheo cita↔paciente se hace por patId, nombre, RUT y teléfono para
  // no perder a los pacientes de mañana (p. ej. una cita de botox creada desde la agenda). (P10)
  const rutN = r => ("" + (r || "")).replace(/[^0-9kK]/g, "").toLowerCase();
  const telN = t => ("" + (t || "")).replace(/\D/g, "").slice(-8);
  const needId = new Set(), needNm = new Set(), needRut = new Set(), needTel = new Set();
  (appts || []).forEach(function(a) {
    const st = a.status;
    if (st === "anulada" || st === "cancelada" || st === "no_asistio" || st === "atendida") return;
    if (a.attended) return;
    if (/evaluaci/i.test(a.proc || "")) return;
    if (a.patId) needId.add(a.patId);
    const nm = (a.name || "").toLowerCase().trim(); if (nm) needNm.add(nm);
    const r = rutN(a.rut); if (r.length >= 6) needRut.add(r);
    const t = telN(a.phone); if (t.length === 8) needTel.add(t);
  });
  return (patients || []).filter(function(p) {
    if (p.consent) return false;
    if (needId.has(p.id)) return true;
    if (needNm.has((p.name || "").toLowerCase().trim())) return true;
    var r = rutN(p.rut); if (r.length >= 6 && needRut.has(r)) return true;
    var t = telN(p.phone); if (t.length === 8 && needTel.has(t)) return true;
    return false;
  });
}
if (typeof window !== "undefined") window.jcmConsentPending = jcmConsentPending;
function FichaMedica({ T, patient, updatePatient, removePatient, onBack, onAgendar, initialTab }) {
  const [tab, setTab] = useState(initialTab || "fichaclinica");
  // Al abrir la ficha: si el paciente tiene imágenes guardadas DENTRO de su registro (modelo
  // antiguo, pesado), muévelas a su propia clave (pimg_<id>) y vacía patient.images. Así el
  // documento del paciente se mantiene liviano y las sesiones/consentimientos se guardan siempre.
  useEffect(() => {
    try {
      if (patient && patient.images && patient.images.length) {
        const key = patImgKey(patient.id);
        const own = window.DB && window.DB.get(key);
        if (!Array.isArray(own)) { window.DB.set(key, patient.images); }
        if (Array.isArray(window.DB.get(key))) updatePatient(patient.id, { images: [] });
      }
    } catch (e) {}
  }, [patient.id]);
  const [newEntry, setNewEntry] = useState(false);
  const [editIdx, setEditIdx] = useState(null); // índice de la sesión a editar (null = nueva)
  const [viewMode, setViewMode] = useState(false); // abrir la sesión en solo-lectura
  const [delSession, setDelSession] = useState(null); // { h, i } sesión a eliminar (pide clave del profesional)
  const [editD, setEditD] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [delInput, setDelInput] = useState("");
  const points = patient.points || [];
  // Pestañas NUEVAS (presupuesto, esquema facial) solo para Los Medique hasta el push global.
  const _newFeat = !(window.jcmNewFeat) || window.jcmNewFeat();
  const TABS = [["fichaclinica", "Ficha Clínica"], ["mapa", "Mapa facial y antropometría"], ["procedimientos", "Procedimientos"], ["imagenes", "Imágenes"], ...(_newFeat ? [["examenes", "Exámenes"]] : []), ["consent", "Consentimientos"], ["receta", "Receta / Indicaciones"], ...(_newFeat ? [["presupuesto", "Presupuesto"]] : []), ["facturacion", "Atenciones"], ["campana", "Campaña"], ["notas", "Notas"], ["ia", "IA"]];
  const estado = patient.estado || "Activo";
  const activo = estado === "Activo";
  const wa = "https://wa.me/" + (patient.phone || "").replace(/\D/g, "");

  function savePoints(pts) { updatePatient(patient.id, { points: pts }); }

  // Imprime la ficha clínica completa en formato clínico con identidad de la clínica.
  function imprimirFicha() {
    const c = patient.clinica || {};
    const cv = k => (window.clinVal ? window.clinVal(c, k) : (c[k] || ""));
    const hist = patient.history || [];
    const e = jcmDocEsc;
    const b = jcmDocBrand((hist.find(h => h.proName) || {}).proName);
    const hoy = new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const drow = (k, v, tag) => "<div class='drow'><span class='dk'>" + k + "</span><span class='dv" + (tag ? " tag" : "") + "'>" + (v ? e(v) : "—") + "</span></div>";
    const sesion = h => "<div class='dfull' style='flex-direction:column;align-items:stretch;gap:5px'>"
      + "<div style='display:flex;justify-content:space-between;gap:14px;align-items:baseline'><span class='dk'>" + e(h.date || "") + "</span><span class='dv' style='font-weight:400'>" + e(h.proc || "") + (h.units ? " · " + e(h.units) : "") + "</span></div>"
      + (h.resumen ? "<div class='textbox' style='min-height:0;margin-top:0'>" + e(h.resumen) + "</div>" : "")
      + (h.proName ? "<div style=\"font-family:'Cormorant Garamond',serif;font-style:italic;font-size:11px;color:#8B9197\">Realizado por " + e(h.proName) + "</div>" : "")
      + "</div>";
    const inner = jcmMasthead(b)
      + "<div class='titleblock'><div><div class='eyebrow'>Documento clínico</div><h1 class='doc-title'>Ficha <span class='it'>clínica</span></h1></div>"
      + "<div class='folio'><span class='k'>Expediente</span><span class='v'>" + (e((patient.id || "").replace(/[^a-z0-9]/gi, "").slice(-8).toUpperCase()) || "—") + "</span></div></div>"
      + jcmPband(patient, [["RUT", patient.rut], ["Edad", patient.age ? patient.age + " años" : ""], ["Teléfono", patient.phone]], patient.estado || "Activo")
      + "<div class='body'>"
      + "<div class='section'><div class='section-head'><span class='sh-num'>i</span><span class='sh-label'>Antecedentes</span><span class='sh-rule'></span></div><div class='dgrid'>"
      + drow("Alergias", cv("alergias")) + drow("Antecedentes mórbidos", cv("morbidos")) + drow("Proc. estéticos previos", cv("esteticos"), true) + drow("Antecedentes quirúrgicos", cv("quirurgicos") || c.cirugias) + drow("Medicamentos", cv("medicamentos")) + drow("Correo", patient.email)
      + "</div></div>"
      + "<div class='section'><div class='section-head'><span class='sh-num'>ii</span><span class='sh-label'>Hábitos y piel</span><span class='sh-rule'></span></div><div class='dgrid cols3'>"
      + drow("Tabaco", c.tabaco ? c.tabaco + " cig/día" : "") + drow("Alcohol", c.alcohol) + drow("Actividad física", c.actividad) + drow("Consumo de agua", c.agua) + drow("Exposición solar", c.expsolar) + drow("Bloqueador", c.bloqueador) + drow("Embarazo / lactancia", c.embarazo)
      + "</div><div class='dfull'><span class='dk'>Cuidados de la piel</span><span class='dv'>" + (cv("skincare") ? e(cv("skincare")) : "—") + "</span></div></div>"
      + (patient.notes ? "<div class='section'><div class='section-head'><span class='sh-label'>Notas internas</span><span class='sh-rule'></span></div><div class='textbox'>" + e(patient.notes) + "</div></div>" : "")
      + "<div class='section'><div class='section-head'><span class='sh-num'>iii</span><span class='sh-label'>Historial de sesiones</span><span class='sh-rule'></span></div>"
      + (hist.length ? hist.map(sesion).join("") : "<div class='empty-note'>Sin sesiones registradas a la fecha.</div>") + "</div>"
      + "</div>"
      + jcmSignFoot(b, b.proName, "Ficha clínica", patient.name, hoy);
    jcmPrintDoc("Ficha clínica · " + e(patient.name), b, inner);
  }

  // Imprime UNA sesión/procedimiento en formato clínico con identidad de la clínica.
  function imprimirProc(h) {
    const e = jcmDocEsc;
    const b = jcmDocBrand(h.proName);
    const now = new Date();
    const hoy = now.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const parts = (h.date || now.toISOString().slice(0, 10)).split("-"); // [AAAA, MM, DD]
    const dotDate = (parts[2] || "—") + " · " + (parts[1] || "—") + " · " + (parts[0] || "—");
    const cell = (l, v) => "<div class='cell'><span class='ck'>" + l + "</span><span class='cv'>" + (v ? e(v) : "—") + "</span></div>";
    const inner = jcmMasthead(b)
      + "<div class='titleblock'><div><div class='eyebrow'>Registro de tratamiento</div><h1 class='doc-title'>Procedimiento <span class='it'>realizado</span></h1></div>"
      + "<div class='folio'><span class='k'>Fecha</span><span class='v vbig'>" + e(dotDate) + "</span></div></div>"
      + jcmPband(patient, [["RUT", patient.rut], ["Edad", patient.age ? patient.age + " años" : ""]])
      + "<div class='proc-head'><div class='ph-tick'></div><div class='ph-main'><span class='ph-k'>Tratamiento</span><div class='ph-name'>" + e(h.proc || "—") + "</div></div>"
      + "<div class='ph-dose'><span class='k'>Unidades / Dosis</span><span class='v'>" + e(h.units || "—") + "</span></div></div>"
      + "<div class='body'>"
      + "<div class='section'><div class='section-head'><span class='sh-num'>i</span><span class='sh-label'>Insumo</span><span class='sh-rule'></span></div>"
      + "<div class='trio'>" + cell("Lote", h.lote) + cell("Vencimiento", h.venc) + cell("Dilución", h.dilucion) + "</div>"
      + (h.temp ? "<div style=\"font-family:'Jost',sans-serif;font-size:10px;color:#8B9197;margin-top:8px\">Temperatura de conservación: " + e(h.temp) + "</div>" : "") + "</div>"
      + "<div class='section'><div class='section-head'><span class='sh-num'>ii</span><span class='sh-label'>Resumen de la aplicación</span><span class='sh-rule'></span></div>"
      + "<div class='textbox' style='min-height:60px'>" + (h.resumen ? e(h.resumen) : "—") + "</div>"
      + (h.units ? "<div class='totline'><span class='tk'>Total aplicado</span><span class='tv'>" + e(h.units) + "</span></div>" : "") + "</div>"
      + (h.note ? "<div class='section'><div class='section-head'><span class='sh-label'>Notas</span><span class='sh-rule'></span></div><div class='textbox'>" + e(h.note) + "</div></div>" : "")
      + "</div>"
      + jcmSignFoot(b, b.proName, "Procedimiento realizado", patient.name, hoy);
    jcmPrintDoc("Procedimiento · " + e(patient.name), b, inner);
  }

  const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
  return (
    <div style={{ padding: "4px 0 24px", ...(luxF ? { maxWidth: 1180, margin: "0 auto" } : {}) }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: T.textMute, fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14, padding: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>Pacientes
      </button>

      {/* header paciente */}
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <Avatar T={T} name={patient.name} size={luxF ? 56 : 52} />
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: T.serif, fontSize: luxF ? 30 : 26, fontWeight: luxF ? 400 : 300, letterSpacing: luxF ? "-.01em" : undefined, color: T.text, lineHeight: 1 }}>{patient.name}</span>
            <span style={{ fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: patient.age ? T.accent : T.textFaint, background: T.accentSoft || "rgba(84,112,127,.12)", border: "1px solid " + (T.accent + "44"), borderRadius: 999, padding: "3px 11px", whiteSpace: "nowrap" }}>{patient.age ? patient.age + " años" : "Edad —"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
            <span style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>CI {patient.rut}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: T.sans, fontSize: 11.5, color: activo ? "#1F8A5B" : T.textMute }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: activo ? "#1F8A5B" : T.textFaint }} />{estado}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <FAct T={T} href={wa} icon={<><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></>}>WhatsApp</FAct>
          <FAct T={T} href={"mailto:" + (patient.email || "")} icon={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>}>Correo</FAct>
          <FAct T={T} onClick={async () => {
            const email = (patient.email || "").trim();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { window.jcmToast && window.jcmToast("Este paciente no tiene un correo válido en su ficha.", "error"); return; }
            if (!window.mediqueEmail) { window.jcmError && window.jcmError("El correo no está disponible."); return; }
            let appts = []; try { appts = (window.DB && window.DB.get("appointments")) || []; } catch (e) {}
            const d0 = new Date(); const isoT = d0.getFullYear() + "-" + ("0" + (d0.getMonth() + 1)).slice(-2) + "-" + ("0" + d0.getDate()).slice(-2);
            const next = appts.filter(a => a.patId === patient.id && a.fecha && a.fecha >= isoT).sort((a, b) => ((a.fecha || "") + (a.time || "")).localeCompare((b.fecha || "") + (b.time || "")))[0];
            const clinic = (() => { try { return window.DB.cfg().clinic_name || "tu clínica"; } catch (e) { return "tu clínica"; } })();
            const nombre = ((patient.name || "").split(" ")[0]) || "";
            const cuando = next ? ("el " + new Date(next.fecha + "T00:00:00").toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" }) + (next.time ? " a las " + next.time : "") + (next.proc ? " (" + next.proc + ")" : "")) : "tu próxima cita";
            const text = "Hola " + nombre + ",\n\nTe recordamos " + cuando + " en " + clinic + ".\n\nSi necesitas reprogramar, respóndenos este correo.\n\n— " + clinic;
            window.jcmToast && window.jcmToast("Enviando recordatorio…", "info");
            const r = await window.mediqueEmail({ to: email, subject: "Recordatorio de tu cita · " + clinic, text: text, replyTo: window.clinicReplyTo && window.clinicReplyTo() });
            if (r && r.ok) window.jcmToast && window.jcmToast("Recordatorio enviado a " + email + ". Revisa la bandeja (y spam).", "ok");
            else if (r && r.configured === false) window.jcmError && window.jcmError("Correo no configurado en el servidor (falta RESEND_API_KEY).", r.error);
            else window.jcmError && window.jcmError("No se pudo enviar el recordatorio", (r && r.error) || r);
          }} icon={<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>}>Recordatorio</FAct>
          <FAct T={T} onClick={() => setEditD(true)} icon={<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></>}>Editar datos</FAct>
          <FAct T={T} onClick={imprimirFicha} icon={<><path d="M6 9V2h12v7" /><rect x="6" y="13" width="12" height="8" /><path d="M6 17H3v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5h-3" /></>}>Imprimir ficha</FAct>
          <FAct T={T} primary onClick={() => onAgendar && onAgendar()} icon={<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>}>Agendar cita</FAct>
          {removePatient && <FAct T={T} onClick={() => { setConfirmDel(true); setDelInput(""); }} icon={<><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></>}>Eliminar</FAct>}
        </div>
      </div>

      {/* tarjetas de datos — Teléfono y Email son clickeables para editar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: luxF ? 14 : 10, margin: luxF ? "22px 0 4px" : "16px 0 4px" }}>
        {[["Edad", (patient.age ? patient.age + " años" : "—"), true], ["Teléfono", patient.phone || "—", true], ["Email", patient.email || "—", true], ["Estado", estado, false]].map(([l, v, editable], i) => (
          <div key={l} onClick={editable ? () => setEditD(true) : undefined} title={editable ? "Haz clic para editar" : undefined}
            style={luxF
              ? { ...DS.card(T), padding: "16px 18px", minWidth: 0, cursor: editable ? "pointer" : "default", transition: DS.trans("border-color, transform"), ...DS.reveal(i) }
              : { background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px", minWidth: 0, cursor: editable ? "pointer" : "default", transition: "border-color .15s" }}
            onMouseEnter={editable ? e => { e.currentTarget.style.borderColor = T.accent + (luxF ? "66" : ""); } : undefined}
            onMouseLeave={editable ? e => { e.currentTarget.style.borderColor = T.line; } : undefined}>
            <div style={{ fontFamily: T.sans, fontSize: luxF ? DS.ft.eyebrow : 9, letterSpacing: luxF ? ".14em" : ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: luxF ? 8 : 5, display: "flex", alignItems: "center", gap: 4 }}>
              {l}
              {editable && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: luxF ? 14 : 13, fontWeight: luxF ? 500 : 400, color: editable ? T.accent : T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* barra de pestañas horizontal */}
      <div className="jc-scroll" style={luxF
        ? { display: "flex", gap: 2, overflowX: "auto", background: T.surface2 || T.surface, border: "1px solid " + T.line, borderRadius: DS.r.ctl + 2, padding: 3, margin: "22px 0 18px" }
        : { display: "flex", gap: 4, overflowX: "auto", borderBottom: "1px solid " + T.line, margin: "14px 0 18px" }}>
        {TABS.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={luxF
            ? { flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 13px", background: tab === k ? T.surface : "none", boxShadow: tab === k ? "0 1px 2px rgba(0,0,0,.06)" : "none", border: "none", borderRadius: DS.r.ctl, cursor: "pointer", fontFamily: T.sans, fontSize: DS.ft.sub, fontWeight: tab === k ? 600 : 500, color: tab === k ? T.text : T.textMute, whiteSpace: "nowrap", transition: DS.trans("background,box-shadow,color") }
            : { flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 14px", background: "none", border: "none", borderBottom: "2px solid " + (tab === k ? T.accent : "transparent"), cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, fontWeight: tab === k ? 600 : 400, color: tab === k ? T.text : T.textMute, whiteSpace: "nowrap" }}>
            {k === "ia" && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={tab === k ? T.accent : T.textMute} strokeWidth="1.6"><rect x="4.5" y="8" width="15" height="10" rx="3" /><path d="M12 4.5V8" /><circle cx="12" cy="3.4" r="1.3" /></svg>}
            {l}
          </button>
        ))}
      </div>

      {/* contenido */}
      <div style={{ minWidth: 0 }}>

      {tab === "ia" && <FichaIATab T={T} patient={patient} go={setTab} />}
      {tab === "mapa" && (
        <div>
          <FaceMap T={T} value={points} onChange={savePoints} patient={patient} updatePatient={updatePatient} readOnly={true} />
        </div>
      )}
      {tab === "fichaclinica" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: luxF ? 12 : 10, marginBottom: luxF ? 20 : 16 }}>
            {[["Notas internas", patient.notes, "#C9A227"], ["Alergias", (window.clinVal ? window.clinVal(patient.clinica || {}, "alergias") : (patient.clinica || {}).alergias), "#1F8A5B"], ["Antecedentes", (window.clinVal ? window.clinVal(patient.clinica || {}, "morbidos") : (patient.clinica || {}).morbidos), T.accent]].map(([l, v, c], i) => (
              luxF ? (
                <div key={l} style={{ ...DS.card(T), padding: "14px 16px", ...DS.reveal(i) }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: c, flexShrink: 0 }} />
                    <span style={{ fontFamily: T.sans, fontSize: DS.ft.eyebrow, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute }}>{l}</span>
                  </div>
                  <div style={{ fontFamily: T.sans, fontSize: DS.ft.sub, color: v ? T.text : T.textFaint, lineHeight: 1.5 }}>{v || "Sin registros."}</div>
                </div>
              ) : (
                <div key={l} style={{ background: T.surface, border: "1px solid " + T.line, borderLeft: "3px solid " + c, borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 }}>{l}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 12, color: v ? T.text : T.textFaint, lineHeight: 1.5 }}>{v || "Sin registros."}</div>
                </div>
              )
            ))}
          </div>
          <FichaClinicaForm T={T} patient={patient} updatePatient={updatePatient} />
        </div>
      )}
      {tab === "imagenes" && <ImagenesTab T={T} patient={patient} updatePatient={updatePatient} />}
      {tab === "consent" && <ConsentTab T={T} patient={patient} updatePatient={updatePatient} />}
      {tab === "receta" && <RecetaTab T={T} patient={patient} updatePatient={updatePatient} />}
      {tab === "presupuesto" && <PresupuestoTab T={T} patient={patient} updatePatient={updatePatient} />}
      {tab === "examenes" && <ExamenesTab T={T} patient={patient} />}
      {tab === "facturacion" && <FacturacionTab T={T} patient={patient} updatePatient={updatePatient} onOpenSession={(hi) => { setEditIdx(hi); setViewMode(true); setNewEntry(true); setTab("procedimientos"); }} />}
      {tab === "campana" && <CampanaTab T={T} patient={patient} updatePatient={updatePatient} />}

      {tab === "procedimientos" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: luxF ? 16 : 12 }}>
            <div style={luxF ? DS.text(T, "eyebrow") : { fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Historial clínico</div>
            <AdBtn T={T} small primary onClick={() => { setEditIdx(null); setViewMode(false); setNewEntry(true); }}>+ Sesión</AdBtn>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {(patient.history || []).map((h, i) => {
              const meta = [h.lote && ("Lote " + h.lote), h.venc && ("Vence " + h.venc), h.temp && ("Temp. " + h.temp), h.dilucion && ("Dilución " + h.dilucion)].filter(Boolean);
              return (
              <div key={i} style={luxF
                ? { display: "flex", gap: 14, padding: "14px 10px", margin: "0 -10px", borderRadius: DS.r.ctl, borderBottom: "1px solid " + T.lineSoft, transition: DS.trans("background") }
                : { display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid " + T.lineSoft }}
                onMouseEnter={luxF ? e => { e.currentTarget.style.background = T.surface2 || T.surface; } : undefined}
                onMouseLeave={luxF ? e => { e.currentTarget.style.background = "none"; } : undefined}>
                <div style={{ flexShrink: 0, width: 66, fontFamily: luxF ? T.serif : T.sans, fontSize: luxF ? 13 : 11, color: T.accent }}>{h.date}</div>
                <div onClick={() => { setEditIdx(i); setViewMode(true); setNewEntry(true); }} style={{ flex: 1, borderLeft: "1px solid " + T.line, paddingLeft: 14, cursor: "pointer" }} title="Ver detalle de la sesión">
                  <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{h.proc} {h.units && <span style={{ color: T.accent, fontWeight: 400 }}>· {h.units}</span>}</div>
                  {meta.length > 0 && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint, marginTop: 3 }}>{meta.join("  ·  ")}</div>}
                  {h.resumen && <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text, marginTop: 5, lineHeight: 1.5 }}>{h.resumen}</div>}
                  {h.note && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginTop: 4, lineHeight: 1.5 }}>{h.note}</div>}
                  {h.proName && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, fontStyle: "italic", marginTop: 5 }}>Realizado por {h.proName}</div>}
                </div>
                <div style={{ flexShrink: 0, alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: 6 }}>
                  <button onClick={() => { setEditIdx(i); setViewMode(false); setNewEntry(true); }} title="Editar sesión" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "5px 9px", cursor: "pointer" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>Editar
                  </button>
                  <button onClick={() => imprimirProc(h)} title="Imprimir procedimiento" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: T.sans, fontSize: 11, color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "5px 9px", cursor: "pointer" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 9V2h12v7" /><rect x="6" y="13" width="12" height="8" /><path d="M6 17H3v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5h-3" /></svg>Imprimir
                  </button>
                  <button onClick={() => setDelSession({ h, i })} title="Eliminar sesión" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: T.sans, fontSize: 11, color: "#C0285A", background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "5px 9px", cursor: "pointer" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>Eliminar
                  </button>
                </div>
              </div>
            ); })}
            {(!patient.history || patient.history.length === 0) && <div style={{ padding: "20px 0", fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Sin sesiones registradas.</div>}
          </div>
          {newEntry && <NewEntryModal T={T} patient={patient} updatePatient={updatePatient} startView={viewMode} entry={editIdx != null ? (patient.history || [])[editIdx] : null} onClose={() => { setNewEntry(false); setEditIdx(null); setViewMode(false); }} onSave={e => {
            const hist = (patient.history || []).slice();
            const editing = editIdx != null;
            if (editing) hist[editIdx] = { ...hist[editIdx], ...e }; else hist.unshift({ id: (window.jcmUid ? window.jcmUid("s") : "s" + Date.now()), ...e });
            const patch = { history: hist };
            if (!editing && patient.campaign) patch.campaign = { ...patient.campaign, meta_estado: "compro" };
            updatePatient(patient.id, patch); setNewEntry(false); setEditIdx(null); setViewMode(false);
            // Al registrar una sesión NUEVA con cobro, se suma automáticamente a Caja (ingreso por atención),
            // de modo que el procedimiento de la ficha aparece en Caja, Reportes y el Dashboard.
            if (!editing && (e.cobro || 0) > 0 && window.cashAdd) {
              // Descuenta el costo de insumos del procedimiento (config de inventario) para el líquido.
              const _cost = window.jcmInsumoCost ? window.jcmInsumoCost(e.proc) : 0;
              try { window.cashAdd({ type: "ingreso", kind: "atencion", amount: e.cobro, cost: _cost, method: e.metodo || "Efectivo", concept: (e.proc || "Atención").trim() + " · " + (patient.name || ""), patient: patient.name, prof: e.proName || "" }); } catch (e3) {}
            }
            try { window.jcmToast && window.jcmToast(editing ? "Sesión actualizada." : ((e.cobro || 0) > 0 ? "Sesión registrada · " + (window.JCDATA ? window.JCDATA.fmt(e.cobro) : "$" + e.cobro) + " a Caja." : "Sesión registrada."), "ok"); } catch (e2) {}
          }} />}
          {delSession && <SesionDeleteModal T={T} sesion={delSession.h} onClose={() => setDelSession(null)} onConfirm={() => {
            const hist = (patient.history || []).filter((x, idx) => delSession.h && delSession.h.id ? x.id !== delSession.h.id : idx !== delSession.i);
            updatePatient(patient.id, { history: hist });
            setDelSession(null);
            try { window.jcmToast && window.jcmToast("Sesión eliminada.", "ok"); } catch (e2) {}
          }} />}
        </div>
      )}

      {tab === "notas" && (
        <NotasTab T={T} patient={patient} updatePatient={updatePatient} />
      )}
      </div>
      {editD && <EditDatosModal T={T} patient={patient} onClose={() => setEditD(false)} onSave={(d) => { updatePatient(patient.id, d); setEditD(false); }} />}
      {confirmDel && (
        <AdModal T={T} title="Eliminar paciente" onClose={() => { setConfirmDel(false); setDelInput(""); }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.65 }}>
              Estás por eliminar a <b>{patient.name}</b> y toda su ficha clínica, historial y consentimientos.{" "}
              <span style={{ color: "#C0285A", fontWeight: 600 }}>Esta acción no se puede deshacer.</span>
            </div>
            <AdField T={T} label='Escribe "ELIMINAR" para confirmar' value={delInput} onChange={v => setDelInput(v.toUpperCase())} />
            <div onClick={() => { if (delInput !== "ELIMINAR") return; removePatient(patient.id); setConfirmDel(false); if (onBack) onBack(); }}
              style={{ padding: "13px", textAlign: "center", borderRadius: 7, fontFamily: T.sans, fontSize: 13, fontWeight: 600, cursor: delInput === "ELIMINAR" ? "pointer" : "not-allowed", background: delInput === "ELIMINAR" ? "#C0285A" : T.lineSoft || T.line, color: delInput === "ELIMINAR" ? "#fff" : T.textFaint, transition: "all .15s" }}>
              Eliminar definitivamente
            </div>
          </div>
        </AdModal>
      )}
    </div>
  );
}
function FAct({ T, children, icon, href, onClick, primary }) {
  const st = { display: "inline-flex", alignItems: "center", gap: 7, fontFamily: T.sans, fontSize: 11.5, fontWeight: 500, padding: "9px 13px", borderRadius: 8, cursor: "pointer", textDecoration: "none", border: "1px solid " + (primary ? T.accent : T.line), background: primary ? T.accent : T.surface, color: primary ? (T.onAccent || "#fff") : T.text };
  const ic = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>;
  return href ? <a href={href} target="_blank" rel="noopener" style={st}>{ic}{children}</a> : <button onClick={onClick} style={st}>{ic}{children}</button>;
}
function EditDatosModal({ T, patient, onClose, onSave }) {
  const PREFIX = "+56 9 ";
  const rawPhone = patient.phone || "";
  const initPhone = rawPhone.startsWith(PREFIX) ? rawPhone : (rawPhone ? PREFIX + rawPhone : PREFIX);
  const [f, setF] = useState({ name: patient.name || "", rut: patient.rut || "", age: patient.age ? "" + patient.age : "", phone: initPhone, email: patient.email || "", estado: patient.estado || "Activo" });
  const rutWarn = f.rut.trim() && !(window.jcmValidRut ? window.jcmValidRut(f.rut) : true);
  const emailOk = !f.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim());
  const phoneDigits = f.phone.replace(/\D/g, "");
  const ok = f.name.trim().length > 2 && phoneDigits.length >= 11 && emailOk;
  const sel = { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  const lblS = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
  function guardaPhone(v) { setF({ ...f, phone: v.startsWith(PREFIX) ? v : PREFIX }); }
  function phoneKeyDown(e) { if ((e.key === "Backspace" || e.key === "Delete") && e.target.selectionStart <= PREFIX.length) e.preventDefault(); }
  return (
    <AdModal T={T} title="Editar datos del paciente" onClose={onClose} footer={<AdBtn T={T} primary full onClick={() => ok && onSave({ name: f.name.trim(), rut: f.rut.trim(), age: parseInt(f.age, 10) || patient.age, phone: f.phone.trim(), email: f.email.trim(), estado: f.estado })}>Guardar cambios</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <AdField T={T} label="Nombre completo" value={f.name} onChange={v => setF({ ...f, name: v })} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><AdField T={T} label="CI / RUT" value={f.rut} onChange={v => setF({ ...f, rut: (window.jcmFmtRut ? window.jcmFmtRut(v) : v) })} />{rutWarn && <div style={{ fontFamily: T.sans, fontSize: 10.5, color: "#C9A227", marginTop: 5 }}>Revisa el dígito verificador.</div>}</div>
          <AdField T={T} label="Edad" value={f.age} onChange={v => setF({ ...f, age: v.replace(/\D/g, "").slice(0, 3) })} inputMode="numeric" />
        </div>
        <label style={{ display: "block" }}>
          <span style={lblS}>Teléfono móvil</span>
          <input value={f.phone} onChange={e => guardaPhone(e.target.value)} onKeyDown={phoneKeyDown} inputMode="tel" style={sel} />
        </label>
        <AdField T={T} label="Correo (opcional)" value={f.email} onChange={v => setF({ ...f, email: v })} inputMode="email" />
        <div><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Estado</span>
          <select value={f.estado} onChange={e => setF({ ...f, estado: e.target.value })} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}><option>Activo</option><option>Inactivo</option></select>
        </div>
      </div>
    </AdModal>
  );
}

function NotasTab({ T, patient, updatePatient }) {
  const [val, setVal] = useState(patient.notes || "");
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Notas clínicas</div>
      <textarea value={val} onChange={e => { setVal(e.target.value); setSaved(false); }} rows={7}
        style={{ width: "100%", padding: "14px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, lineHeight: 1.6, outline: "none", resize: "vertical" }} />
      <div style={{ marginTop: 10 }}>
        <AdBtn T={T} primary small onClick={() => { updatePatient(patient.id, { notes: val }); setSaved(true); }}>{saved ? "✓ Guardado" : "Guardar notas"}</AdBtn>
      </div>
    </div>
  );
}

function procMapType(proc) {
  const p = (proc || "").toLowerCase();
  if (/botox|toxina|botulín|botul|\bb3z\b|\bbff\b|full\s*face/i.test(p)) return "botox";
  if (/hialur|rino|armoniz|relleno/i.test(p)) return "ah";
  if (/bio|sculptra|col[aá]g|estimul/i.test(p)) return "bio";
  return null;
}

/* Plantillas reutilizables para el "Resumen de la aplicación" (dosis que se repiten entre pacientes). */
const SESION_TPL_SEED = [
  { id: "stpl_tox3", name: "Toxina botulínica · 3 zonas", body: "Zonas tratadas: frente, entrecejo y patas de gallo.\n16u frontal\n10u procerus\n10u corrugadores\n10u orbiculares\n\nSin incidentes, no se evidencian hematomas ni reacciones alérgicas inmediatas." }
];
function sesionTplLoad() {
  try { const v = window.DB && DB.get("sesion_resumen_tpls"); if (Array.isArray(v)) return v; } catch (e) {}
  return ((typeof clinicSeeded === "function") ? clinicSeeded() : true) ? SESION_TPL_SEED : [];
}
function sesionTplSave(v) { try { window.DB && DB.set("sesion_resumen_tpls", v); } catch (e) {} }

function NewEntryModal({ T, entry, onClose, onSave, patient, updatePatient, startView }) {
  const today = new Date().toISOString().slice(0, 10);
  const team = (((window.CADMIN || {}).team) || []).filter(t => t.active !== false);
  const isEdit = !!entry;
  const [ro, setRo] = useState(!!startView); // solo-lectura al abrir desde "ver procedimiento"
  const [f, setF] = useState(entry ? {
    date: entry.date || today, proc: entry.proc || "", units: entry.units || "", note: entry.note || "",
    proId: entry.proId || (team[0] || {}).id || "", proName: entry.proName || (team[0] || {}).name || "",
    lote: entry.lote || "", venc: entry.venc || "", temp: (entry.temp || "").replace(/\s*°C\s*/g, "").trim(), dilucion: entry.dilucion || "", resumen: entry.resumen || "",
    recomendados: entry.recomendados || "", realizados: entry.realizados || "",
    cobro: entry.cobro != null ? "" + entry.cobro : "", metodo: entry.metodo || "Efectivo",
    facePoints: entry.facePoints || []
  } : {
    date: today, proc: "", units: "", note: "",
    proId: (team[0] || {}).id || "", proName: (team[0] || {}).name || "",
    lote: "", venc: "", temp: "", dilucion: "", resumen: "", recomendados: "", realizados: "",
    cobro: "", metodo: "Efectivo", facePoints: []
  });
  // Precio sugerido del servicio (para auto-rellenar el cobro al elegir el procedimiento).
  function svcPrice(name) { try { const s = (window.clinicServiceList ? window.clinicServiceList() : []).find(x => x.name === name); return s ? (s.price || 0) : 0; } catch (e) { return 0; } }
  // En edición, el profesional que REALIZÓ el tratamiento no cambia: se confirma con su clave.
  // (Sesiones antiguas sin proId quedan asociadas al profesional mostrado, con respaldo al primero del equipo.)
  const origPro = isEdit ? (team.find(t => t.id === (entry.proId || f.proId)) || team.find(t => t.name === (entry.proName || f.proName)) || team[0]) : null;
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [sessionTool, setSessionTool] = useState("aureo");
  const [resTpls, setResTpls] = useState(sesionTplLoad); // plantillas del resumen de la aplicación
  function aplicarTpl(body) { setF(prev => ({ ...prev, resumen: prev.resumen && prev.resumen.trim() ? prev.resumen.replace(/\s*$/, "") + "\n\n" + body : body })); }
  async function guardarTpl() {
    const txt = (f.resumen || "").trim();
    if (!txt) { setErr("Escribe el resumen antes de guardarlo como plantilla."); return; }
    const nombre = await (window.jcmPrompt ? window.jcmPrompt("Nombre de la plantilla:", "") : Promise.resolve(window.prompt("Nombre de la plantilla:")));
    if (!nombre || !nombre.trim()) return;
    const next = resTpls.concat([{ id: "stpl_" + Date.now(), name: nombre.trim(), body: txt }]);
    setResTpls(next); sesionTplSave(next);
    try { window.jcmToast && window.jcmToast("Plantilla guardada.", "ok"); } catch (e) {}
  }

  function submit() {
    if (!f.proc.trim()) { setErr("Indica el procedimiento."); return; }
    if (isEdit) {
      if (!origPro || !origPro.pin) { setErr("El profesional que realizó esta sesión no tiene clave configurada. Defínela en Equipo."); return; }
      if (pin !== origPro.pin) { setErr("Clave incorrecta. Solo " + (origPro.name) + " puede confirmar cambios en su sesión."); return; }
    }
    onSave({ ...f, temp: f.temp.trim() ? f.temp.trim() + " °C" : "", cobro: parseInt(("" + (f.cobro || "")).replace(/\D/g, ""), 10) || 0 });
  }
  const setPro = id => { const p = team.find(t => t.id === id); setF({ ...f, proId: id, proName: p ? p.name : f.proName }); };
  const sel = { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  const lblS = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };

  const ta = rows => ({ width: "100%", padding: "12px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none", resize: "vertical", minHeight: rows * 24 });
  // En modo solo-lectura los textareas no pueden scrollearse (pointerEvents:none bloquea todo).
  // Se renderizan como <div> con white-space:pre-wrap para mostrar TODO el contenido sin truncar.
  const roDiv = { width: "100%", padding: "12px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word", boxSizing: "border-box" };
  // IMPORTANTE: es una FUNCIÓN que retorna JSX, NO un componente <TaF/>. Si se usa como
  // componente y se redefine en cada render, React remonta el <textarea> en cada tecla y se
  // pierde el foco. Llamada como función ({taField(...)}), el textarea conserva su identidad.
  const taField = ({ val, rows, onChange, ph }) => ro
    ? <div style={roDiv}>{val || <span style={{ color: T.textFaint }}>—</span>}</div>
    : <textarea value={val} onChange={onChange} rows={rows} placeholder={ph} style={ta(rows)} />;
  return (
    <AdModal T={T} wide title={ro ? "Detalle de la sesión" : (isEdit ? "Editar sesión" : "Nueva sesión")} onClose={onClose}
      footer={ro
        ? <AdBtn T={T} primary full onClick={() => setRo(false)}>Editar sesión</AdBtn>
        : <AdBtn T={T} primary full onClick={submit}>{isEdit ? "Confirmar cambios" : "Registrar sesión"}</AdBtn>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 13, pointerEvents: ro ? "none" : "auto", opacity: ro ? .97 : 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <AdField T={T} label="Fecha" value={f.date} onChange={v => setF({ ...f, date: v })} />
            <label style={{ display: "block" }}>
              <span style={lblS}>Dosis / cantidad</span>
              <input value={f.units} onChange={e => setF({ ...f, units: e.target.value })}
                onKeyDown={e => { if (e.key === " " && /[uU]$/.test(f.units.trim()) && !f.units.includes("/")) { e.preventDefault(); setF({ ...f, units: f.units.trim() + " / " }); } }}
                placeholder="24U / 1 ml" style={sel} />
            </label>
          </div>
          {/* Procedimiento: desplegable con los servicios de la clínica (agrupados por categoría) + opción "Otro". */}
          {(() => {
            const svcs = (window.clinicServiceList ? window.clinicServiceList() : []);
            const byCat = {}; svcs.forEach(s => { (byCat[s.cat] = byCat[s.cat] || []).push(s); });
            const cats = Object.keys(byCat);
            const known = svcs.some(s => s.name === f.proc);
            const isOther = f.proc && !known;
            if (!svcs.length) {
              return (
                <label style={{ display: "block" }}>
                  <span style={lblS}>Procedimiento</span>
                  <AdField T={T} value={f.proc} onChange={v => setF({ ...f, proc: v })} placeholder="Escríbelo o créalo en Servicios" />
                  <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 6 }}>Crea tus servicios en la sección <b>Servicios</b> para elegirlos aquí.</p>
                </label>
              );
            }
            return (
              <div>
                <label style={{ display: "block" }}>
                  <span style={lblS}>Procedimiento</span>
                  <select value={isOther ? "__other__" : f.proc} onChange={e => { const v = e.target.value; const np = v === "__other__" ? " " : v; const pr = svcPrice(np); setF(prev => ({ ...prev, proc: np, cobro: (!prev.cobro && pr) ? "" + pr : prev.cobro })); }} style={sel}>
                    <option value="">Selecciona un servicio…</option>
                    {cats.map(c => <optgroup key={c} label={c}>{byCat[c].map((s, i) => <option key={c + i} value={s.name}>{s.name}</option>)}</optgroup>)}
                    <option value="__other__">Otro (especificar)…</option>
                  </select>
                </label>
                {isOther && <div style={{ marginTop: 8 }}><AdField T={T} value={f.proc.trim()} onChange={v => setF({ ...f, proc: v })} placeholder="Nombre del procedimiento" /></div>}
              </div>
            );
          })()}

          {/* Cobro → se registra en Caja automáticamente al guardar la sesión (solo sesiones nuevas) */}
          {!isEdit && (
            <div style={{ background: "rgba(31,138,91,.06)", border: "1px solid rgba(31,138,91,.25)", borderRadius: 8, padding: "13px 14px" }}>
              <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#1F8A5B", marginBottom: 11 }}>Cobro · se suma a Caja</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label style={{ display: "block" }}>
                  <span style={lblS}>Cobro (opcional)</span>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid " + T.line, borderRadius: 4, overflow: "hidden", background: T.surface }}>
                    <span style={{ paddingLeft: 13, fontFamily: T.sans, fontSize: 13.5, color: T.textMute, userSelect: "none" }}>$</span>
                    <input value={f.cobro ? Number(("" + f.cobro).replace(/\D/g, "")).toLocaleString("es-CL") : ""} onChange={e => setF({ ...f, cobro: e.target.value.replace(/\D/g, "") })} inputMode="numeric" placeholder="0" style={{ flex: 1, padding: "12px 10px", border: "none", background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }} />
                  </div>
                </label>
                <label style={{ display: "block" }}>
                  <span style={lblS}>Método de pago</span>
                  <select value={f.metodo} onChange={e => setF({ ...f, metodo: e.target.value })} style={sel}>
                    {["Efectivo", "Transferencia", "Débito", "Crédito", "Otro"].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </label>
              </div>
              <p style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 8 }}>Si indicas un cobro, se registra como ingreso en <b>Caja</b> y aparece en Reportes y el Dashboard. Déjalo en blanco si no corresponde cobro.</p>
            </div>
          )}

          {/* Profesional que realiza */}
          <label style={{ display: "block" }}>
            <span style={lblS}>Profesional que realiza</span>
            {isEdit
              ? <div style={{ ...sel, color: T.textMute, background: T.surface2 }}>{f.proName || "—"}</div>
              : <select value={f.proId} onChange={e => setPro(e.target.value)} style={sel}>{team.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select>}
          </label>

          {/* Procedimientos recomendados / realizados */}
          {/* Nota: NO usar el wrapper TaF aquí — está definido dentro del render y React lo
              desmonta en cada keystroke perdiendo el foco. Se renderiza directamente. */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label style={{ display: "block" }}><span style={lblS}>Procedimientos recomendados</span>
              {ro
                ? <div style={roDiv}>{f.recomendados || <span style={{ color: T.textFaint }}>—</span>}</div>
                : <textarea value={f.recomendados} onChange={e => setF({ ...f, recomendados: e.target.value })} rows={3} placeholder="Lo sugerido para próximas sesiones…" style={ta(3)} />}
            </label>
            <label style={{ display: "block" }}><span style={lblS}>Procedimientos realizados</span>
              {ro
                ? <div style={roDiv}>{f.realizados || <span style={{ color: T.textFaint }}>—</span>}</div>
                : <textarea value={f.realizados} onChange={e => setF({ ...f, realizados: e.target.value })} rows={3} placeholder="Lo efectivamente realizado hoy…" style={ta(3)} />}
            </label>
          </div>

          {/* Datos del producto */}
          <div style={{ background: T.surface2, border: "1px solid " + T.line, borderRadius: 8, padding: "13px 14px" }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.accent, marginBottom: 11 }}>Producto aplicado</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <AdField T={T} label="Lote del producto" value={f.lote} onChange={v => setF({ ...f, lote: v })} placeholder="Ej. AB1234" />
              <AdField T={T} label="Fecha de vencimiento" value={f.venc} onChange={v => { let d = v.replace(/\D/g, "").slice(0, 8); let fmt = d.length > 6 ? d.slice(0,4)+"-"+d.slice(4,6)+"-"+d.slice(6) : d.length > 4 ? d.slice(0,4)+"-"+d.slice(4) : d; setF({ ...f, venc: fmt }); }} inputMode="numeric" placeholder="2027-03-15 (AAAA-MM-DD)" />
              <label style={{ display: "block" }}>
                <span style={lblS}>Temperatura conserv.</span>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid " + T.line, borderRadius: 4, overflow: "hidden" }}>
                  <input value={f.temp} onChange={e => setF({ ...f, temp: e.target.value.replace(/[^0-9.,–\-]/g, "") })} inputMode="decimal" placeholder="2–8" style={{ flex: 1, padding: "12px 13px", border: "none", background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }} />
                  <span style={{ paddingRight: 13, fontFamily: T.sans, fontSize: 13.5, color: T.textMute, userSelect: "none", background: T.surface }}>°C</span>
                </div>
              </label>
              <AdField T={T} label="Dilución / reconstitución" value={f.dilucion} onChange={v => setF({ ...f, dilucion: v })} placeholder="100U en 2,5 ml SF" />
            </div>
          </div>

          <label style={{ display: "block" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <span style={{ ...lblS, marginBottom: 0 }}>Resumen de la aplicación</span>
              {!ro && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <select value="" onChange={e => { const t = resTpls.find(x => x.id === e.target.value); if (t) aplicarTpl(t.body); e.target.value = ""; }}
                    style={{ fontFamily: T.sans, fontSize: 11, padding: "5px 8px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.textMute, outline: "none", maxWidth: 200 }}>
                    <option value="">Insertar plantilla…</option>
                    {resTpls.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                  <button type="button" onClick={guardarTpl} title="Guardar el resumen actual como plantilla" style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 6, padding: "5px 9px", cursor: "pointer", whiteSpace: "nowrap" }}>Guardar plantilla</button>
                </div>
              )}
            </div>
            {taField({ val: f.resumen, rows: 5, onChange: e => setF({ ...f, resumen: e.target.value }), ph: "Zonas tratadas, técnica, unidades por punto, tolerancia del paciente…" })}
          </label>
          <label style={{ display: "block" }}>
            <span style={lblS}>Nota / observaciones</span>
            {taField({ val: f.note, rows: 2, onChange: e => setF({ ...f, note: e.target.value }), ph: "" })}
          </label>

          {/* Mapa de punción (botox) — solo en sesiones de toxina */}
          {procMapType(f.proc) === "botox" && (
            <div style={{ border: "1px solid " + T.line, borderRadius: 10, padding: "14px", marginTop: 4 }}>
              <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Mapa de punción · Toxina botulínica</div>
              <PuncionTool T={T} value={f.facePoints || []} onChange={pts => setF(prev => ({ ...prev, facePoints: pts }))} patient={patient} updatePatient={updatePatient} lockProduct="botox" />
            </div>
          )}

          {!ro && isEdit && (
            <div style={{ background: "rgba(201,162,39,.08)", border: "1px solid rgba(201,162,39,.4)", borderRadius: 8, padding: "13px 14px" }}>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.text, marginBottom: 8, lineHeight: 1.5 }}>Para guardar cambios, ingresa la <b>clave de {f.proName || "el profesional"}</b>, quien realizó este tratamiento.</div>
              <input type="password" value={pin} onChange={e => { setPin(e.target.value.replace(/\D/g, "").slice(0, 6)); setErr(""); }} inputMode="numeric" placeholder="Clave del profesional" style={{ width: "100%", padding: "12px 13px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, letterSpacing: ".3em", outline: "none", textAlign: "center" }} />
            </div>
          )}
          {err && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#C0285A" }}>{err}</div>}
      </div>
    </AdModal>
  );
}

/* ─────────── DETALLE DE ATENCIÓN PREVIA (popup) ─────────── */
function SesionDetalle({ T, h, patient, onClose, onEditar, go }) {
  const pts = (patient.points || []);
  const ptsCount = Array.isArray(pts) ? pts.length : (pts && typeof pts === "object" ? Object.keys(pts).length : 0);
  const fotos = patImages(patient).filter(im => im.date === h.date || (im.proc && h.proc && im.proc.toLowerCase().includes((h.proc || "").toLowerCase().split(" ")[0])));
  const meta = [h.lote && ("Lote " + h.lote), h.venc && ("Vence " + h.venc), h.temp && ("Temp. " + h.temp), h.dilucion && ("Dilución " + h.dilucion)].filter(Boolean);
  const row = (k, v) => v ? <div style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid " + T.lineSoft }}><div style={{ width: 150, flexShrink: 0, fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute }}>{k}</div><div style={{ flex: 1, fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{v}</div></div> : null;
  return (
    <AdModal T={T} wide title={"Atención · " + (h.date || "")} onClose={onClose}
      footer={<div style={{ display: "flex", gap: 10 }}><AdBtn T={T} onClick={onClose}>Cerrar</AdBtn><AdBtn T={T} primary onClick={onEditar}>Editar sesión</AdBtn></div>}>
      <div>
        <div style={{ fontFamily: T.serif, fontSize: 22, color: T.text, marginBottom: 4 }}>{h.proc}{h.units ? " · " + h.units : ""}</div>
        {h.proName && <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 12 }}>Realizado por {h.proName}</div>}
        {row("Dosis / cantidad", h.units)}
        {row("Producto", meta.join("  ·  "))}
        {row("Procedimientos realizados", h.realizados)}
        {row("Procedimientos recomendados", h.recomendados)}
        {row("Resumen", h.resumen)}
        {row("Observaciones", h.note)}
        <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 0", borderBottom: "1px solid " + T.lineSoft }}>
          <div style={{ width: 150, flexShrink: 0, fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute }}>Mapa facial</div>
          <div style={{ flex: 1, fontFamily: T.sans, fontSize: 13, color: T.text }}>{ptsCount} punto(s) marcado(s)</div>
          <button onClick={() => { onClose(); go("mapa"); }} style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "7px 11px", cursor: "pointer" }}>Abrir mapa facial</button>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Fotos asociadas</div>
          {fotos.length ? <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 8 }}>
            {fotos.map(im => <figure key={im.id} style={{ margin: 0, borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line }}>{im.src ? <img src={im.src} alt={im.label} style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} /> : <div style={{ aspectRatio: "4/5", background: T.surface2 }} />}<figcaption style={{ fontFamily: T.sans, fontSize: 10, color: T.textMute, padding: "6px 8px" }}>{im.proc}</figcaption></figure>)}
          </div> : <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Sin fotos asociadas a esta fecha. <button onClick={() => { onClose(); go("imagenes"); }} style={{ color: T.accent, background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: 12, textDecoration: "underline", padding: 0 }}>Ir a Imágenes</button></div>}
        </div>
      </div>
    </AdModal>
  );
}

/* ─────────── CONSENTIMIENTOS ─────────── */
function ConsentView({ T, patients, updatePatient }) {
  const A = window.JCADMIN;
  const [signing, setSigning] = useState(null); // {patient, template}
  const pending = patients.filter(p => !p.consent);
  const signed = patients.filter(p => p.consent);

  return (
    <div style={{ padding: "4px 0 24px" }}>
      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Pendientes de firma ({pending.length})</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {pending.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line }}>
            <Avatar T={T} name={p.name} size={38} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{p.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute }}>{p.tags && p.tags[0]}</div>
            </div>
            <AdBtn T={T} small primary onClick={() => setSigning({ patient: p, template: A.consents[0] })}>Firmar</AdBtn>
          </div>
        ))}
        {pending.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textFaint }}>Todos los pacientes tienen consentimiento firmado.</div>}
      </div>

      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Firmados</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {signed.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line }}>
            <Avatar T={T} name={p.name} size={38} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: T.text }}>{p.name}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>{p.consentInfo || "Consentimiento informado"}</div>
            </div>
            <AdTag T={T} tone="ok">Firmado</AdTag>
          </div>
        ))}
      </div>

      {signing && <SignConsentModal T={T} data={signing} onClose={() => setSigning(null)}
        onSign={(r) => {
          const p = signing.patient;
          const nuevo = { kind: r.tpl.kind, title: r.tpl.title, cat: r.tpl.cat, proc: r.tpl.proc, proc4: r.tpl.proc4, vascular: r.tpl.vascular, body: r.tpl.body, paragraphs: r.tpl.paragraphs, ...r.fields, sigPac: r.sigPac, sigPro: r.sigPro, ts: Date.now() };
          try {
            var _nts = nuevo.ts || Date.now();
            window.DB.set("pcons_" + p.id + "_" + _nts, nuevo);
            var _mf = window.DB.get("pconsm_" + p.id);
            window.DB.set("pconsm_" + p.id, Array.isArray(_mf) ? [_nts].concat(_mf) : [_nts]);
          } catch(e) {}
          updatePatient(p.id, { consent: true, consentTs: Date.now(), consentInfo: r.tpl.title + " · " + r.fields.fecha, consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
          setSigning(null);
        }} />}
    </div>
  );
}

const CONSENT_EXCL = [
  "Si estoy embarazada o en período de lactancia materna (Sólo mujeres).",
  "Si tengo historial de enfermedades autoinmunes (Artritis Reumatoide, psoriasis, fiebre reumática, lupus eritematoso sistémico u otras). Si estoy recibiendo tratamiento de inmunoterapia.",
  "Si tengo antecedente de cicatrización queloide o hipertrófica, problemas de acné o rosácea o cualquier infección en la zona a tratar.",
  "Diabetes no controlada u otra enfermedad metabólica no controlada.",
  "Discrasias sanguíneas o alteraciones de la coagulación (anemia aguda, leucemia, porfiria, protrombinemia u otras).",
  "Si previamente me sometí a procedimientos con biopolímeros, puesto que puede desencadenar reacciones inflamatorias e infecciosas."
];
// Documento de consentimiento con el texto real de JC Medical (3 plantillas).
function ConsentDoc({ T, tpl, prof }) {
  const P = ({ n, children }) => <p style={{ margin: "0 0 11px", fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text }}><b>{n}</b> {children}</p>;
  const EU = prof || "____________________";
  if (tpl.kind === "custom") {
    // Consentimientos guardados antes de incluir paragraphs: los recuperamos de la plantilla por título.
    let paras = tpl.paragraphs;
    if (!paras || !paras.length) {
      try { const tmpl = ((window.JCADMIN && window.JCADMIN.consents) || []).find(c => c.title === tpl.title || c.id === tpl.id); if (tmpl) paras = tmpl.paragraphs; } catch (e) {}
    }
    const renderT = t => { const parts = t.split("{EU}"); if (parts.length === 1) return t; return parts.reduce((a, p, i) => i < parts.length - 1 ? [...a, p, <b key={i}>{EU}</b>] : [...a, p], []); };
    return <div>{(paras || []).map((p, i) => <P key={i} n={p.n}>{renderT(p.t)}</P>)}</div>;
  }
  if (tpl.kind === "extra") return (
    <div>
      {tpl.proc && <P n="">Procedimiento: <b>{tpl.proc}</b>.</P>}
      <div style={{ whiteSpace: "pre-wrap", fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text }}>{tpl.body || "—"}</div>
      <P n="">Autorizo a EU <b>{EU}</b> a realizar el procedimiento descrito, habiéndoseme explicado su naturaleza, alcances y posibles complicaciones. Doy fe de no haber omitido antecedentes clínicos.</P>
    </div>
  );
  if (tpl.kind === "toxina") return (
    <div>
      <P n="1.-">Por el presente documento, autorizo a EU <b>{EU}</b> a realizar el procedimiento conocido como “tratamiento cosmético para arrugas” mediante la aplicación de Toxina Botulínica tipo A, producto que al ser utilizado en la musculatura facial de manera adecuada, produce relajamiento de la expresión con la disminución de las arrugas de expresión. El procedimiento mencionado me ha sido totalmente explicado por el profesional, entendiendo la naturaleza y las consecuencias del mismo. Los siguientes puntos me han sido especialmente aclarados:</P>
      <p style={{ margin: "0 0 8px 16px", fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text }}><b>a)</b> En los sitios de la(s) aplicación(es) pueden quedar pequeñas marcas transitorias, enrojecimiento de la piel, hematomas, inflamación y efectos no deseados descritos en el prospecto, los mismos son comunes y reversibles.</p>
      <p style={{ margin: "0 0 11px 16px", fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text }}><b>b)</b> Todos los pacientes que estén siendo tratados con antibióticos del tipo de espectinomicina o amino glucósidos, enfermedades neuromusculares, embarazadas, mujeres en periodos de lactancia, que presenten rellenos con biopolímeros, siliconas, así como infección o signos de inflamación en los sitios de aplicación no pueden ser sometidos a la aplicación de Toxina Botulínica.</p>
      <P n="2.-">He entendido que la duración de los resultados es variable y reversible, siendo aproximadamente de entre 3 a 6 meses y me ha sido explicado que los efectos comenzarán a evidenciarse después del cuarto día de la aplicación.</P>
      <P n="3.-">Soy consciente que la práctica de la medicina no es una ciencia exacta y reconozco que a pesar de que el profesional me ha informado adecuadamente las posibilidades absolutas y relativas de lograr los objetivos indicados en el punto 1, los resultados no pueden ser predecibles.</P>
      <P n="4.-">Doy fe de no haber omitido o alterado datos al exponer mis antecedentes clínicos.</P>
      <P n="5.-">Autorizo el registro del proceso mediante fotografías, vídeos, modelos de estudios y exámenes complementarios. Los cuales pueden ser utilizados con fines académicos en beneficio del progreso y desarrollo de las Ciencias de la Salud (Congresos, cursos, demostraciones, capacitaciones).</P>
      <P n="6.-">He leído detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional nombrado a realizarme el procedimiento antes explicado.</P>
    </div>
  );
  return (
    <div>
      <P n="1.-">Por el presente documento, autorizo a EU <b>{EU}</b> a realizar el procedimiento <b>{tpl.proc}</b>, el cual me fue claramente explicado.</P>
      <P n="2.-">Reconozco que pueden existir las siguientes complicaciones temporales: hematomas (moretones), inflamación, dolor leve transitorio, cambios de sensibilidad de la piel, enrojecimiento de la piel, asimetrías leves, los cuales son comunes y totalmente reversibles.{tpl.vascular ? " Aunque el riesgo es menor al 1% existe la posibilidad de complicaciones graves como: obstrucción u oclusión vascular, en dicho caso el profesional pondrá todos los medios a su disposición para resolver el cuadro clínico de forma eficaz." : ""}</P>
      <P n="3.-">Estoy consciente que la práctica de la Medicina no es una ciencia exacta y estoy en conocimiento que los resultados del procedimiento no son totalmente predecibles.</P>
      <P n="4.-">Entiendo que no puedo ser tratada(o) con {tpl.proc4 || tpl.proc}, en los siguientes casos y confirmo que no padezco ninguno de ellos:</P>
      <ul style={{ margin: "0 0 11px", paddingLeft: 20 }}>
        {CONSENT_EXCL.map((e, i) => <li key={i} style={{ fontFamily: T.sans, fontSize: 12, lineHeight: 1.6, color: T.text, marginBottom: 5 }}>{e}</li>)}
      </ul>
      <P n="5.-">Autorizo el registro del proceso mediante fotografías, vídeos, modelos de estudios y exámenes complementarios. Los cuales pueden ser utilizados con fines académicos en beneficio del progreso y desarrollo de las Ciencias de la Salud (Demostraciones).</P>
      <P n="6.-">Doy fe de no haber omitido o alterado mis antecedentes clínicos. Leí detenidamente el acta de consentimiento, por lo que autorizo al profesional, para que realice los procedimientos antes explicados en prueba de conformidad con todo lo expuesto.</P>
    </div>
  );
}
function SignConsentModal({ T, data, onClose, onSign }) {
  const A = window.JCADMIN;
  // Plantillas PROPIAS de la clínica (módulo Consentimientos) además de las base, disponibles para firmar.
  // Se mapean a kind "extra" (texto libre + autorización), que ConsentDoc ya renderiza.
  const customTpls = (function () { try { return ((window.DB && window.DB.get("consent_templates")) || []).filter(t => t && t.active !== false && (t.title || "").trim()).map(t => ({ id: t.id, title: t.title, kind: "extra", proc: t.cat || "", body: t.body || "" })); } catch (e) { return []; } })();
  // Las plantillas PROPIAS de la clínica van primero; las predeterminadas (base) después.
  const allTpls = customTpls.concat(A.consents || []);
  const [tpl, setTpl] = useState(data.template);
  const [nombre, setNombre] = useState(data.patient.name || "");
  const [ci, setCi] = useState(data.patient.rut || "");
  const [edad, setEdad] = useState(data.patient.age ? "" + data.patient.age : "");
  const [prof, setProf] = useState((window.clinicPro && window.clinicPro()) || "");
  const [fecha, setFecha] = useState(new Date().toLocaleDateString("es-CL"));
  const [sigPac, setSigPac] = useState(null);
  const [sigPro, setSigPro] = useState(null);
  const [agree, setAgree] = useState(false);
  const ready = agree && sigPac && sigPro;
  const uline = { border: "none", borderBottom: "1px solid " + T.textMute, background: "transparent", color: T.text, fontFamily: T.sans, fontSize: 12, padding: "2px 4px", outline: "none" };
  return (
    <AdModal T={T} title="Consentimiento informado" onClose={onClose} wide
      footer={<AdBtn T={T} primary full onClick={() => ready && onSign({ tpl, sigPac, sigPro, fields: { nombre, ci, edad, prof, fecha } })}>{ready ? "Confirmar y guardar consentimiento firmado" : "Acepta y firma (paciente y enfermero) para continuar"}</AdBtn>}>
      <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
        {allTpls.map(c => <button key={c.id} onClick={() => setTpl(c)} style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".06em", padding: "8px 12px", borderRadius: 999, cursor: "pointer", background: tpl.id === c.id ? T.surface2 : T.surface, color: tpl.id === c.id ? T.text : T.textMute, border: "1px solid " + (tpl.id === c.id ? T.accent : T.line) }}>{c.title}</button>)}
      </div>
      <div style={{ background: "#fff", border: "1px solid " + T.line, borderRadius: 8, padding: "22px 24px", maxHeight: 360, overflowY: "auto", marginBottom: 16 }}>
        <div style={{ textAlign: "right", fontFamily: T.sans, fontSize: 12, color: "#111", marginBottom: 6 }}>Fecha: <input value={fecha} onChange={e => setFecha(e.target.value)} style={{ ...uline, color: "#111", borderColor: "#999", width: 100 }} /></div>
        <h2 style={{ textAlign: "center", fontFamily: T.serif, fontWeight: 400, fontSize: 22, color: "#111", margin: "4px 0 18px" }}>Consentimiento informado</h2>
        <div style={{ color: "#111" }}>
          <div style={{ marginBottom: 8, fontFamily: T.sans, fontSize: 12 }}>Yo <input value={nombre} onChange={e => setNombre(e.target.value)} style={{ ...uline, color: "#111", borderColor: "#999", width: 300 }} /></div>
          <div style={{ marginBottom: 16, fontFamily: T.sans, fontSize: 12 }}>Identificado con CI N° <input value={ci} onChange={e => setCi(e.target.value)} style={{ ...uline, color: "#111", borderColor: "#999", width: 160 }} /> &nbsp; Edad <input value={edad} onChange={e => setEdad(e.target.value)} style={{ ...uline, color: "#111", borderColor: "#999", width: 56 }} /></div>
          <div style={{ marginBottom: 14, fontFamily: T.sans, fontSize: 12 }}>Profesional (EU): <input value={prof} onChange={e => setProf(e.target.value)} style={{ ...uline, color: "#111", borderColor: "#999", width: 220 }} /></div>
          {tpl.kind === "extra" && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 }}>Procedimiento</div>
              <input value={tpl.proc || ""} onChange={e => setTpl({ ...tpl, proc: e.target.value })} placeholder="Nombre del procedimiento" style={{ width: "100%", fontFamily: T.sans, fontSize: 13, padding: "9px 11px", borderRadius: 6, border: "1px solid #bbb", color: "#111", outline: "none", marginBottom: 10, boxSizing: "border-box" }} />
              <div style={{ fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 }}>Texto del consentimiento</div>
              <textarea value={tpl.body || ""} onChange={e => setTpl({ ...tpl, body: e.target.value })} rows={6} placeholder="Redacta el consentimiento extraordinario…" style={{ width: "100%", fontFamily: T.sans, fontSize: 13, lineHeight: 1.6, padding: "10px 12px", borderRadius: 6, border: "1px solid #bbb", color: "#111", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </div>
          )}
          <div style={{ "--c": "#111" }}><ConsentDocDark T={T} tpl={tpl} prof={prof} /></div>
        </div>
      </div>
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 16 }}>
        <button onClick={() => setAgree(!agree)} style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 4, border: "1px solid " + (agree ? T.accent : T.chipBorder), background: agree ? T.accent : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {agree && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.onAccent} strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>}
        </button>
        <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text, lineHeight: 1.5 }}>El paciente declara haber leído y aceptado este consentimiento informado.</span>
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Firma paciente</div>
          <SignaturePad T={T} onChange={setSigPac} height={170} />
        </div>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Firma enfermero</div>
          <SignaturePad T={T} onChange={setSigPro} height={170} />
        </div>
      </div>
    </AdModal>
  );
}
// El documento usa texto negro sobre fondo blanco (look de impresión).
function ConsentDocDark({ T, tpl, prof }) {
  const TT = { ...T, text: "#111", sans: T.sans };
  return <ConsentDoc T={TT} tpl={tpl} prof={prof} />;
}

function ConsentTab({ T, patient, updatePatient }) {
  const [signing, setSigning] = useState(false);
  const [tpl0, setTpl0] = useState(null);
  const [openDoc, setOpenDoc] = useState(null); // consentimiento abierto en popup
  const [deleting, setDeleting] = useState(null); // { doc, idx } para eliminar con clave
  const [delPin, setDelPin] = useState("");
  const [delErr, setDelErr] = useState("");
  // Subir consentimiento ya firmado (archivo descargado o foto del consentimiento en papel).
  const [uploading, setUploading] = useState(false);     // modal abierto
  const [upDataUrl, setUpDataUrl] = useState(null);      // archivo elegido (dataURL)
  const [upIsPdf, setUpIsPdf] = useState(false);
  const [upTitle, setUpTitle] = useState("");
  const [upFecha, setUpFecha] = useState(() => { const d = new Date(); return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + String(d.getFullYear()).slice(-2); });
  const [upBusy, setUpBusy] = useState(false);
  const upInputRef = useRef(null);
  const A = window.JCADMIN;
  // Consentimientos en su propia clave (pcons_<id>) → suben a la nube y se ven en todos lados.
  const consKey = patConsKey(patient.id);
  const [consents, setConsentsState] = useState(() => patConsents(patient));
  useEffect(() => {
    setConsentsState(patConsents(patient));
    // Migración al nuevo formato (un doc por consentimiento) desde: array en pcons_<id> o dentro del paciente.
    try {
      var hasManifest = Array.isArray(window.DB && window.DB.get("pconsm_" + patient.id));
      if (!hasManifest) {
        var old = window.DB && window.DB.get(consKey);
        var legacy = patient.consents || (patient.consentDoc ? [patient.consentDoc] : []);
        var toMigrate = (Array.isArray(old) && old.length > 0) ? old : legacy;
        if (toMigrate.length > 0) {
          var mf = [];
          toMigrate.forEach(function(c, i) {
            var ts = c.ts || (Date.now() + i);
            window.DB.set("pcons_" + patient.id + "_" + ts, c);
            mf.push(ts);
          });
          window.DB.set("pconsm_" + patient.id, mf);
          if (legacy.length > 0 && Array.isArray(window.DB.get("pconsm_" + patient.id))) {
            updatePatient(patient.id, { consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
          }
        }
      }
    } catch(e) {}
  }, [patient.id]);
  function commitConsents(next) {
    try {
      var newManifest = [];
      next.forEach(function(c, i) {
        var ts = c.ts || (Date.now() + i);
        window.DB.set("pcons_" + patient.id + "_" + ts, c);
        newManifest.push(ts);
      });
      window.DB.set("pconsm_" + patient.id, newManifest);
    } catch(e) {}
    setConsentsState(next);
  }
  const printRef = useRef(null);
  function start(t) { setTpl0(t); setSigning(true); }

  // Marca el consentimiento como firmado en papel (sin archivo): quita la notificación de pendiente.
  function markPaper() {
    if (!window.confirm("Marcar el consentimiento de este paciente como firmado en papel. Se quitará de las notificaciones de \"consentimiento pendiente\". ¿Continuar?")) return;
    const d = new Date();
    const f = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + String(d.getFullYear()).slice(-2);
    updatePatient(patient.id, { consent: true, consentInfo: "Firmado en papel · " + f, paperConsent: true });
    try { window.jcmToast && window.jcmToast("Marcado como firmado en papel.", "ok"); } catch (e) {}
  }

  // ── Subir un consentimiento ya firmado (archivo descargado o foto del papel) ──
  function openUpload() { setUpDataUrl(null); setUpIsPdf(false); setUpTitle(""); setUploading(true); }
  function onUpFile(e) {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    const isPdf = f.type === "application/pdf" || /\.pdf$/i.test(f.name || "");
    const reader = new FileReader();
    reader.onload = () => { setUpIsPdf(isPdf); setUpDataUrl(reader.result); };
    reader.readAsDataURL(f);
    try { e.target.value = ""; } catch (_) {}
  }
  function saveUpload() {
    if (!upDataUrl || upBusy) return;
    setUpBusy(true);
    const ts = Date.now();
    const path = "consents/" + patient.id + "/" + ts + (upIsPdf ? ".pdf" : ".jpg");
    const prep = upIsPdf ? Promise.resolve(upDataUrl) : compressImageDataUrl(upDataUrl, 1600, 0.6);
    prep.then(data => {
      const tryStorage = (window.JCSAAS && typeof window.JCSAAS.uploadImage === "function")
        ? window.JCSAAS.uploadImage(data, path).then(url => url || data).catch(() => data)
        : Promise.resolve(data);
      return tryStorage.then(imgVal => {
        const viaStorage = typeof imgVal === "string" && !imgVal.startsWith("data:");
        const nuevo = { kind: "upload", cat: "Subido", title: (upTitle.trim() || "Consentimiento (subido)"), proc: (upTitle.trim() || "Consentimiento subido"), fecha: upFecha, img: imgVal, fileType: upIsPdf ? "pdf" : "img", uploaded: true, ts };
        const lista = patConsents(patient).slice();
        lista.unshift(nuevo);
        commitConsents(lista);
        updatePatient(patient.id, { consent: true, consentInfo: nuevo.title + " · " + upFecha });
        try { window.jcmToast && window.jcmToast(viaStorage ? "Consentimiento subido y sincronizado." : "Consentimiento subido en este dispositivo.", "ok"); } catch (e) {}
        setUploading(false); setUpDataUrl(null); setUpTitle("");
      });
    }).catch(() => { try { window.jcmToast && window.jcmToast("No se pudo subir el archivo.", "error"); } catch (e) {} })
      .then(() => setUpBusy(false));
  }

  function startDelete(doc, idx) { setDeleting({ doc, idx }); setDelPin(""); setDelErr(""); }
  function cancelDelete() { setDeleting(null); setDelPin(""); setDelErr(""); }
  function confirmDelete() {
    if (!deleting) return;
    const team = (((window.CADMIN || {}).team) || []).filter(t => t.active !== false);
    const pro = team.find(t => t.name === deleting.doc.prof);
    if (pro && pro.pin) {
      if (delPin !== pro.pin) { setDelErr("Clave incorrecta."); return; }
    } else if (delPin.length < 1) {
      setDelErr("Ingresa una clave para confirmar."); return;
    }
    const next = consents.filter((_, i) => i !== deleting.idx);
    commitConsents(next);
    if (next.length === 0) updatePatient(patient.id, { consent: false, consentInfo: "" });
    cancelDelete();
    if (window.jcmToast) window.jcmToast("Consentimiento eliminado.", "ok");
  }
  const fmtHora = ts => { try { return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } };
  // Imprime el consentimiento reutilizando el contenido ya renderizado en el popup (texto legal + firmas).
  function imprimirConsent() {
    const node = printRef.current; if (!node) return;
    const html = "<!doctype html><html><head><meta charset='utf-8'><title>Consentimiento · " + (patient.name || "") + "</title>" +
      "<style>@page{size:letter;margin:1.8cm}body{font-family:-apple-system,'Segoe UI',Arial,sans-serif;color:#111;margin:0;padding:20px}img{max-height:70px}</style></head><body>" +
      node.outerHTML + "</body></html>";
    if (window.jcmPrintHTML) window.jcmPrintHTML(html);
    else { const w = window.open("", "_blank"); if (w) { w.document.write(html + "<script>window.print()<\/script>"); w.document.close(); } }
  }

  function imprimirConsentDoc(doc, openOnly) {
    // Consentimiento subido (foto/archivo): se abre/imprime directamente el archivo.
    if (doc && doc.kind === "upload") {
      if (doc.img) {
        if (doc.fileType === "pdf") { window.open(doc.img, "_blank"); return; }
        const ih = "<!doctype html><html><head><meta charset='utf-8'><title>Consentimiento</title></head><body style='margin:0'><img src='" + doc.img + "' style='max-width:100%;display:block;margin:0 auto'/></body></html>";
        if (openOnly || !window.jcmPrintHTML) { const w = window.open("", "_blank"); if (w) { w.document.open(); w.document.write(ih); w.document.close(); } }
        else window.jcmPrintHTML(ih);
      }
      return;
    }
    const esc = s => ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const EU = esc(doc.prof || "____________________");
    const p = (n, text) => "<p style='margin:0 0 11px;font-size:12px;line-height:1.6'>" + (n ? "<b>" + n + "</b> " : "") + text + "</p>";
    let body = "";
    if (doc.kind === "custom") {
      // Plantilla con cláusulas propias (ej. Bruxismo). Respaldo a la plantilla si no se guardaron.
      let paras = doc.paragraphs;
      if (!paras || !paras.length) { try { var tmpl = ((window.JCADMIN && window.JCADMIN.consents) || []).find(function (c) { return c.title === doc.title || c.id === doc.id; }); if (tmpl) paras = tmpl.paragraphs; } catch (e) {} }
      (paras || []).forEach(function (pa) { body += p(esc(pa.n || ""), esc(pa.t || "").replace(/\{EU\}/g, "<b>" + EU + "</b>")); });
      if (!paras || !paras.length) body += p("", "Autorizo a EU <b>" + EU + "</b> a realizar el procedimiento " + esc(doc.proc || "") + ".");
    } else if (doc.kind === "extra") {
      if (doc.proc) body += p("", "Procedimiento: <b>" + esc(doc.proc) + "</b>.");
      body += "<div style='white-space:pre-wrap;font-size:12px;line-height:1.6;margin-bottom:11px'>" + esc(doc.body || "—") + "</div>";
      body += p("", "Autorizo a EU <b>" + EU + "</b> a realizar el procedimiento descrito, habiéndoseme explicado su naturaleza, alcances y posibles complicaciones. Doy fe de no haber omitido antecedentes clínicos.");
    } else if (doc.kind === "toxina") {
      body += p("1.-", "Por el presente documento, autorizo a EU <b>" + EU + "</b> a realizar el procedimiento conocido como \"tratamiento cosmético para arrugas\" mediante la aplicación de Toxina Botulínica tipo A, producto que al ser utilizado en la musculatura facial de manera adecuada, produce relajamiento de la expresión con la disminución de las arrugas de expresión. El procedimiento mencionado me ha sido totalmente explicado por el profesional, entendiendo la naturaleza y las consecuencias del mismo. Los siguientes puntos me han sido especialmente aclarados:");
      body += "<p style='margin:0 0 8px 16px;font-size:12px;line-height:1.6'><b>a)</b> En los sitios de la(s) aplicación(es) pueden quedar pequeñas marcas transitorias, enrojecimiento de la piel, hematomas, inflamación y efectos no deseados descritos en el prospecto, los mismos son comunes y reversibles.</p>";
      body += "<p style='margin:0 0 11px 16px;font-size:12px;line-height:1.6'><b>b)</b> Todos los pacientes que estén siendo tratados con antibióticos del tipo de espectinomicina o amino glucósidos, enfermedades neuromusculares, embarazadas, mujeres en periodos de lactancia, que presenten rellenos con biopolímeros, siliconas, así como infección o signos de inflamación en los sitios de aplicación no pueden ser sometidos a la aplicación de Toxina Botulínica.</p>";
      body += p("2.-", "He entendido que la duración de los resultados es variable y reversible, siendo aproximadamente de entre 3 a 6 meses y me ha sido explicado que los efectos comenzarán a evidenciarse después del cuarto día de la aplicación.");
      body += p("3.-", "Soy consciente que la práctica de la medicina no es una ciencia exacta y reconozco que a pesar de que el profesional me ha informado adecuadamente las posibilidades absolutas y relativas de lograr los objetivos indicados en el punto 1, los resultados no pueden ser predecibles.");
      body += p("4.-", "Doy fe de no haber omitido o alterado datos al exponer mis antecedentes clínicos.");
      body += p("5.-", "Autorizo el registro del proceso mediante fotografías, vídeos, modelos de estudios y exámenes complementarios. Los cuales pueden ser utilizados con fines académicos en beneficio del progreso y desarrollo de las Ciencias de la Salud (Congresos, cursos, demostraciones, capacitaciones).");
      body += p("6.-", "He leído detenidamente este consentimiento y lo he entendido totalmente, autorizando al profesional nombrado a realizarme el procedimiento antes explicado.");
    } else {
      body += p("1.-", "Por el presente documento, autorizo a EU <b>" + EU + "</b> a realizar el procedimiento <b>" + esc(doc.proc || "") + "</b>, el cual me fue claramente explicado.");
      body += p("2.-", "Reconozco que pueden existir las siguientes complicaciones temporales: hematomas (moretones), inflamación, dolor leve transitorio, cambios de sensibilidad de la piel, enrojecimiento de la piel, asimetrías leves, los cuales son comunes y totalmente reversibles." + (doc.vascular ? " Aunque el riesgo es menor al 1% existe la posibilidad de complicaciones graves como: obstrucción u oclusión vascular, en dicho caso el profesional pondrá todos los medios a su disposición para resolver el cuadro clínico de forma eficaz." : ""));
      body += p("3.-", "Estoy consciente que la práctica de la Medicina no es una ciencia exacta y estoy en conocimiento que los resultados del procedimiento no son totalmente predecibles.");
      body += p("4.-", "Entiendo que no puedo ser tratada(o) con " + esc(doc.proc4 || doc.proc || "") + ", en los siguientes casos y confirmo que no padezco ninguno de ellos:");
      body += "<ul style='margin:0 0 11px;padding-left:20px'>" + CONSENT_EXCL.map(e => "<li style='font-size:12px;line-height:1.6;margin-bottom:5px'>" + esc(e) + "</li>").join("") + "</ul>";
      body += p("5.-", "Autorizo el registro del proceso mediante fotografías, vídeos, modelos de estudios y exámenes complementarios. Los cuales pueden ser utilizados con fines académicos en beneficio del progreso y desarrollo de las Ciencias de la Salud (Demostraciones).");
      body += p("6.-", "Doy fe de no haber omitido o alterado mis antecedentes clínicos. Leí detenidamente el acta de consentimiento, por lo que autorizo al profesional, para que realice los procedimientos antes explicados en prueba de conformidad con todo lo expuesto.");
    }
    // En iOS, la pestaña debe abrirse DENTRO del gesto del usuario; se rellena al recortar las firmas.
    const winIOS = openOnly ? window.open("", "_blank") : null;
    if (winIOS) { try { winIOS.document.write("<!doctype html><meta charset='utf-8'><body style='font-family:-apple-system,sans-serif;padding:28px;color:#777'>Generando consentimiento…</body>"); } catch (e) {} }
    var medicoSig = null;
    try { var msList = window.DB.get("medic_sigs"); if (msList && msList.length) medicoSig = msList[0]; } catch (_) {}
    Promise.all([cropSignatureDataUrl(doc.sigPac), cropSignatureDataUrl(doc.sigPro)]).then(function (crops) {
      const sp = crops[0], spr = crops[1];
      const numCols = medicoSig ? 3 : 2;
      const sigH = medicoSig ? 130 : 175;
      const html = "<!doctype html><html><head><meta charset='utf-8'><title>Consentimiento · " + esc(patient.name || "") + "</title>" +
        "<style>@page{size:letter;margin:1.8cm}body{font-family:-apple-system,'Segoe UI',Arial,sans-serif;color:#111;margin:0;padding:20px}.sigs{display:grid;grid-template-columns:repeat(" + numCols + ",1fr);gap:18px;margin-top:22px}.sig-label{font-size:12px;color:#444;margin-bottom:6px}.sig-box{height:" + sigH + "px;border:1px solid #ddd;border-radius:6px;display:flex;align-items:center;justify-content:center;background:#fff;padding:10px}.sig-box img{max-height:100%;max-width:100%;object-fit:contain}</style>" +
        "</head><body>" +
        "<div style='text-align:right;font-size:11px;color:#666'>Fecha: " + esc(doc.fecha || "") + "</div>" +
        "<h2 style='text-align:center;font-family:Georgia,serif;font-weight:400;font-size:20px;color:#111;margin:2px 0 14px'>Consentimiento informado</h2>" +
        "<div style='font-size:12px;margin-bottom:6px'>Yo <b>" + esc(doc.nombre || "") + "</b></div>" +
        "<div style='font-size:12px;margin-bottom:16px'>Identificado con CI N° <b>" + esc(doc.ci || "") + "</b> · Edad <b>" + esc(doc.edad || "") + "</b></div>" +
        body +
        "<div class='sigs'>" +
          "<div><div class='sig-label'>Firma paciente</div><div class='sig-box'>" + (sp ? "<img src='" + sp + "'/>" : "") + "</div></div>" +
          "<div><div class='sig-label'>Firma profesional · " + esc(doc.prof || "") + "</div><div class='sig-box'>" + (spr ? "<img src='" + spr + "'/>" : "") + "</div></div>" +
          (medicoSig ? "<div><div class='sig-label'>Médico responsable · " + esc(medicoSig.name) + (medicoSig.rut ? " · RUT " + esc(medicoSig.rut) : "") + (medicoSig.registro ? " · Reg. " + esc(medicoSig.registro) : "") + "</div><div class='sig-box'>" + (medicoSig.sig ? "<img src='" + medicoSig.sig + "'/>" : "") + "</div></div>" : "") +
        "</div></body></html>";
      if (openOnly) {
        if (winIOS) { try { winIOS.document.open(); winIOS.document.write(html); winIOS.document.close(); } catch (e) {} }
        else { const w2 = window.open("", "_blank"); if (w2) { w2.document.open(); w2.document.write(html); w2.document.close(); } }
        return;
      }
      if (window.jcmPrintHTML) window.jcmPrintHTML(html);
      else { const w = window.open("", "_blank"); if (w) { w.document.write(html + "<script>window.print()<\/script>"); w.document.close(); } }
    });
  }

  return (
    <div>
      {/* Crear consentimiento (4 plantillas, incl. extraordinario) */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Crear consentimiento</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {A.consents.map(c => <AdBtn key={c.id} T={T} small primary onClick={() => start(c)}>{c.title}</AdBtn>)}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 18 }}>
        <AdBtn T={T} small onClick={openUpload}>↑ Subir consentimiento (foto o archivo)</AdBtn>
        {!patient.consent && <AdBtn T={T} small onClick={markPaper}>✓ Consentimiento firmado en papel</AdBtn>}
        <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textFaint }}>Para consentimientos firmados en papel o respaldados.</span>
      </div>

      {/* Listado compacto · clickeable */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Consentimientos firmados ({consents.length})</div>
      {consents.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "8px 0" }}>Aún no hay consentimientos firmados.</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {consents.map((doc, i) => (
          <div key={doc.ts || i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 9, background: T.surface, border: "1px solid " + T.line, cursor: "pointer" }} onClick={() => setOpenDoc(doc)}>
            <span style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, border: "1px solid " + T.accent, borderRadius: 999, padding: "4px 9px", whiteSpace: "nowrap", flexShrink: 0 }}>{doc.cat || "Consent."}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.proc || doc.title}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2 }}>{doc.fecha}{doc.ts ? " · " + fmtHora(doc.ts) : ""}{doc.prof ? " · " + doc.prof : ""}</div>
            </div>
            <AdTag T={T} tone="ok">Firmado</AdTag>
            <button onClick={e => { e.stopPropagation(); imprimirConsentDoc(doc); }} title="Imprimir consentimiento" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
            </button>
            <button onClick={e => { e.stopPropagation(); startDelete(doc, i); }} title="Eliminar consentimiento" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 4, display: "flex", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.6" style={{ flexShrink: 0, pointerEvents: "none" }}><path d="M9 18l6-6-6-6" /></svg>
          </div>
        ))}
      </div>

      {/* Modal: subir un consentimiento (foto / archivo) */}
      {uploading && (
        <AdModal T={T} title="Subir consentimiento" onClose={() => !upBusy && setUploading(false)}
          footer={<div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><AdBtn T={T} onClick={() => !upBusy && setUploading(false)}>Cancelar</AdBtn><AdBtn T={T} primary onClick={saveUpload}>{upBusy ? "Subiendo…" : "Guardar consentimiento"}</AdBtn></div>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, lineHeight: 1.5 }}>
              Sube una <b>foto</b> del consentimiento firmado en papel o un <b>archivo</b> (imagen o PDF) que tengas respaldado. Queda guardado en la ficha del paciente y se sincroniza.
            </div>
            <div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 5 }}>Procedimiento / título (opcional)</div>
              <input value={upTitle} onChange={e => setUpTitle(e.target.value)} placeholder="Ej.: Toxina botulínica"
                style={{ width: "100%", padding: "11px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 14, outline: "none" }} />
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 130 }}>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginBottom: 5 }}>Fecha</div>
                <input value={upFecha} onChange={e => setUpFecha(e.target.value)} placeholder="DD-MM-AA"
                  style={{ width: "100%", padding: "11px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 14, outline: "none" }} />
              </div>
            </div>
            <input ref={upInputRef} type="file" accept="image/*,application/pdf" onChange={onUpFile} style={{ display: "none" }} />
            <AdBtn T={T} onClick={() => upInputRef.current && upInputRef.current.click()}>{upDataUrl ? "Cambiar archivo / foto" : "Elegir foto o archivo"}</AdBtn>
            {upDataUrl && (upIsPdf
              ? <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.text, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "12px 14px" }}>📄 Archivo PDF listo para subir.</div>
              : <img src={upDataUrl} alt="vista previa" style={{ width: "100%", maxHeight: 320, objectFit: "contain", background: "#fff", border: "1px solid " + T.line, borderRadius: 8 }} />)}
          </div>
        </AdModal>
      )}

      {/* Modal: eliminar consentimiento con clave del profesional */}
      {deleting && (
        <AdModal T={T} title="Eliminar consentimiento" onClose={cancelDelete}
          footer={<div style={{ display: "flex", gap: 10 }}><AdBtn T={T} onClick={cancelDelete}>Cancelar</AdBtn><AdBtn T={T} primary onClick={confirmDelete}>Eliminar</AdBtn></div>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: T.sans, fontSize: 13, color: T.text, lineHeight: 1.5 }}>
              Vas a eliminar el consentimiento <b>{deleting.doc.proc || deleting.doc.title}</b> del <b>{deleting.doc.fecha}</b>. Esta acción no se puede deshacer.
            </div>
            <div style={{ background: "rgba(192,40,90,.07)", border: "1px solid rgba(192,40,90,.3)", borderRadius: 8, padding: "13px 14px" }}>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: T.text, marginBottom: 8 }}>
                Ingresa la clave de <b>{deleting.doc.prof || "el profesional"}</b> para confirmar:
              </div>
              <input type="password" value={delPin} onChange={e => { setDelPin(e.target.value.replace(/\D/g, "").slice(0, 6)); setDelErr(""); }}
                onKeyDown={e => e.key === "Enter" && confirmDelete()}
                inputMode="numeric" placeholder="Clave del profesional"
                style={{ width: "100%", padding: "12px 13px", borderRadius: 6, border: "1px solid " + (delErr ? "#C0285A" : T.line), background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 15, letterSpacing: ".3em", outline: "none", textAlign: "center" }} />
              {delErr && <div style={{ fontFamily: T.sans, fontSize: 12, color: "#C0285A", marginTop: 6 }}>{delErr}</div>}
            </div>
          </div>
        </AdModal>
      )}

      {/* Popup con el consentimiento completo */}
      {openDoc && (
        <AdModal T={T} title={openDoc.title || "Consentimiento"} onClose={() => setOpenDoc(null)} wide footer={<div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><AdBtn T={T} onClick={() => setOpenDoc(null)}>Cerrar</AdBtn>{openDoc.kind === "upload" ? <AdBtn T={T} primary onClick={() => { if (openDoc.img) window.open(openDoc.img, "_blank"); }}>Abrir / descargar</AdBtn> : <AdBtn T={T} primary onClick={imprimirConsent}>Imprimir</AdBtn>}</div>}>
          {openDoc.kind === "upload" ? (
            <div style={{ background: "#fff", border: "1px solid " + T.line, borderRadius: 8, padding: "16px" }}>
              <div style={{ fontFamily: T.sans, fontSize: 12, color: "#444", marginBottom: 10 }}>Consentimiento subido · {openDoc.fecha}{openDoc.fileType === "pdf" ? " · PDF" : ""}</div>
              {openDoc.fileType === "pdf"
                ? <a href={openDoc.img} target="_blank" rel="noopener" style={{ fontFamily: T.sans, fontSize: 14, color: T.accent }}>📄 Abrir el PDF del consentimiento</a>
                : <img src={openDoc.img} alt="consentimiento subido" style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", display: "block" }} />}
            </div>
          ) : (
          <div ref={printRef} style={{ background: "#fff", border: "1px solid " + T.line, borderRadius: 8, padding: "22px 24px" }}>
            <div style={{ textAlign: "right", fontFamily: T.sans, fontSize: 11, color: "#444" }}>Fecha: {openDoc.fecha}</div>
            <h2 style={{ textAlign: "center", fontFamily: T.serif, fontWeight: 400, fontSize: 20, color: "#111", margin: "2px 0 14px" }}>Consentimiento informado</h2>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: "#111", marginBottom: 6 }}>Yo <b>{openDoc.nombre}</b></div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: "#111", marginBottom: 14 }}>Identificado con CI N° <b>{openDoc.ci}</b> · Edad <b>{openDoc.edad}</b></div>
            <ConsentDocDark T={T} tpl={openDoc} prof={openDoc.prof} />
            {(() => {
              var medSigModal = null;
              try { var mM = window.DB.get("medic_sigs"); if (mM && mM.length) medSigModal = mM[0]; } catch (_) {}
              const cols = medSigModal ? "1fr 1fr 1fr" : "1fr 1fr";
              const h = medSigModal ? 90 : 120;
              return (
                <div style={{ display: "grid", gridTemplateColumns: cols, gap: 16, marginTop: 16 }}>
                  <div><div style={{ fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 }}>Firma paciente</div>{openDoc.sigPac && <img src={openDoc.sigPac} alt="firma paciente" style={{ width: "100%", height: h, objectFit: "contain", background: "#fff", border: "1px solid #ddd", borderRadius: 6 }} />}</div>
                  <div><div style={{ fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 }}>Firma profesional · {openDoc.prof}</div>{openDoc.sigPro && <img src={openDoc.sigPro} alt="firma profesional" style={{ width: "100%", height: h, objectFit: "contain", background: "#fff", border: "1px solid #ddd", borderRadius: 6 }} />}</div>
                  {medSigModal && <div><div style={{ fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 }}>Médico responsable · {medSigModal.name}{medSigModal.rut ? " · RUT " + medSigModal.rut : ""}{medSigModal.registro ? " · Reg. " + medSigModal.registro : ""}</div>{medSigModal.sig && <img src={medSigModal.sig} alt="firma médico" style={{ width: "100%", height: h, objectFit: "contain", background: "#fff", border: "1px solid #ddd", borderRadius: 6 }} />}</div>}
                </div>
              );
            })()}
          </div>
          )}
        </AdModal>
      )}

      {signing && <SignConsentModal T={T} data={{ patient: patient, template: tpl0 || A.consents[0] }} onClose={() => setSigning(false)} onSign={(r) => {
        const nuevo = { kind: r.tpl.kind, title: r.tpl.title, cat: r.tpl.cat, proc: r.tpl.proc, proc4: r.tpl.proc4, vascular: r.tpl.vascular, body: r.tpl.body, paragraphs: r.tpl.paragraphs, ...r.fields, sigPac: r.sigPac, sigPro: r.sigPro, ts: Date.now() };
        const lista = patConsents(patient).slice();
        lista.unshift(nuevo);
        commitConsents(lista); // guarda el consentimiento en su propia clave (sube a la nube)
        // En el paciente solo queda la marca liviana (sin firmas) para que el documento sea pequeño.
        // La edad se sincroniza con la ficha: si el consentimiento la trae y la ficha no la tenía, la guarda.
        const _age = parseInt(r.fields && r.fields.edad, 10);
        const _agePatch = (_age && !patient.age) ? { age: _age } : {};
        updatePatient(patient.id, { consent: true, consentTs: Date.now(), consentInfo: r.tpl.title + " · " + r.fields.fecha, ..._agePatch, consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
        setSigning(false);
        try { window.jcmToast && window.jcmToast("Consentimiento guardado. Se abrió en una pestaña para tu respaldo.", "ok"); } catch (e) {}
        // Abre el consentimiento firmado en una PESTAÑA NUEVA (sin lanzar la impresión).
        // Se abre dentro del mismo gesto del usuario para que iOS no bloquee la pestaña.
        try { imprimirConsentDoc(nuevo, true); } catch (e) {}
      }} />}
    </div>
  );
}

/* ─────────── IMÁGENES Y DOCUMENTOS (agrupadas por fecha + procedimiento) ─────────── */
// Lee un archivo de imagen y lo redimensiona (máx 900px) para no saturar el almacenamiento local.
function readImageResized(file, cb) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const max = 800; let { width: w, height: h } = img;
      if (w > max || h > max) { const r = Math.min(max / w, max / h); w = Math.round(w * r); h = Math.round(h * r); }
      const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(img, 0, 0, w, h);
      cb(cv.toDataURL("image/jpeg", 0.72));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
const IMG_PROCS_BASE = ["Botox", "Rinomodelación", "Sculptra", "Radiesse", "Mesoterapia", "Limpieza facial"];
const IMG_PROCS_FIXED = ["Evaluación inicial", "Antes / después", "Otro"];
// Usa todos los servicios del catálogo de la clínica si están disponibles; fallback a lista base.
function getImgProcs() {
  const svcs = (typeof window !== "undefined" && window.clinicServiceList) ? window.clinicServiceList() : [];
  const names = svcs.map(s => s.name).filter(Boolean);
  const base = names.length > 0 ? names : IMG_PROCS_BASE;
  const seen = new Set(base);
  return [...base, ...IMG_PROCS_FIXED.filter(f => !seen.has(f))];
}
function ImagenesTab({ T, patient, updatePatient }) {
  const imgKey = patImgKey(patient.id);
  const [imgs, setImgsState] = useState(() => patImages(patient));
  const [adding, setAdding] = useState(false);
  const [proc, setProc] = useState(() => getImgProcs()[0]);
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [src, setSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [viewer, setViewer] = useState(null); // imagen abierta a pantalla completa
  const fileRef = useRef(null);

  // Al abrir la ficha: migra imágenes antiguas (que estaban dentro del paciente) a su
  // propia clave y vacía patient.images, SOLO si la copia a la clave nueva fue exitosa.
  useEffect(() => {
    setImgsState(patImages(patient));
    try {
      const own = window.DB && window.DB.get(imgKey);
      if (patient.images && patient.images.length && !Array.isArray(own)) {
        window.DB.set(imgKey, patient.images);
        if (Array.isArray(window.DB.get(imgKey))) updatePatient(patient.id, { images: [] });
      }
    } catch (e) {}
  }, [patient.id]);

  // Guarda las imágenes SOLO en su clave propia (nunca dentro del paciente).
  function commitImgs(next) {
    let ok = false;
    try { window.DB.set(imgKey, next); ok = Array.isArray(window.DB.get(imgKey)); } catch (e) {}
    if (!ok) { if (window.jcmError) window.jcmError("No se pudo guardar la imagen (espacio del dispositivo lleno)."); return; }
    setImgsState(next);
    if (patient.images && patient.images.length) { try { updatePatient(patient.id, { images: [] }); } catch (e) {} }
  }

  function resetForm() { setAdding(false); setSrc(null); setProc(getImgProcs()[0]); setFecha(new Date().toISOString().slice(0, 10)); }

  function save() {
    if (!src) { if (window.jcmError) window.jcmError("Selecciona una imagen."); return; }
    const id = "im" + Date.now();
    const item = { id, proc, date: fecha, label: proc };
    const canUpload = window.JCSAAS && typeof window.JCSAAS.uploadImage === "function";
    if (canUpload) {
      const storPath = patient.id + "/" + id + ".jpg";
      setUploading(true);
      window.JCSAAS.uploadImage(src, storPath)
        .then(url => { setUploading(false); commitImgs([{ ...item, src: url, storPath }, ...imgs]); resetForm(); })
        .catch(() => { setUploading(false); commitImgs([{ ...item, src }, ...imgs]); resetForm(); });
    } else {
      commitImgs([{ ...item, src }, ...imgs]);
      resetForm();
    }
  }

  function deleteImg(im) {
    commitImgs(imgs.filter(x => x.id !== im.id));
    if (im.storPath && window.JCSAAS && window.JCSAAS.deleteImage) window.JCSAAS.deleteImage(im.storPath);
  }
  // Agrupa por procedimiento y, dentro, ordena por fecha (más reciente primero).
  const groups = {};
  imgs.forEach(im => { const k = im.proc || im.label || "Sin clasificar"; (groups[k] = groups[k] || []).push(im); });
  Object.keys(groups).forEach(k => groups[k].sort((a, b) => (b.date || "").localeCompare(a.date || "")));
  const fmtDate = d => { try { return new Date(d + (d.length === 10 ? "T00:00:00" : "")).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return d; } };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Imágenes · por fecha y procedimiento</div>
        <AdBtn T={T} small primary onClick={() => setAdding(true)}>+ Subir imagen</AdBtn>
      </div>

      {Object.keys(groups).length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "20px 0" }}>Aún no hay imágenes. Sube la primera y clasifícala por procedimiento.</div>}

      {Object.keys(groups).map(proc => (
        <div key={proc} style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent }} />
            <span style={{ fontFamily: T.serif, fontSize: 16, color: T.text }}>{proc}</span>
            <span style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>· {groups[proc].length} imagen(es)</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10 }}>
            {groups[proc].map(im => (
              <figure key={im.id} style={{ margin: 0, borderRadius: 8, overflow: "hidden", border: "1px solid " + T.line, background: T.surface }}>
                {im.src
                  ? <img src={im.src} alt={im.label} onClick={() => setViewer(im)} title="Ver imagen completa" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block", cursor: "zoom-in" }} />
                  : <div style={{ aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", background: T.surface2 }}><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg></div>}
                <figcaption style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                  <span>{fmtDate(im.date)}</span>
                  <button onClick={() => deleteImg(im)} title="Eliminar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 0 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}

      {adding && (
        <AdModal T={T} title="Subir imagen clínica" onClose={() => { setAdding(false); setSrc(null); }} footer={<AdBtn T={T} primary full onClick={save} disabled={uploading}>{uploading ? "Subiendo…" : "Guardar imagen"}</AdBtn>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input ref={fileRef} type="file" accept="image/*" onChange={e => { const f = e.target.files && e.target.files[0]; if (f) readImageResized(f, setSrc); }} style={{ display: "none" }} />
            <button onClick={() => fileRef.current && fileRef.current.click()} style={{ aspectRatio: src ? "auto" : "16/9", border: "1px dashed " + T.chipBorder, borderRadius: 10, background: T.surface, cursor: "pointer", color: T.textMute, fontFamily: T.sans, fontSize: 12.5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 14, overflow: "hidden" }}>
              {src ? <img src={src} alt="preview" style={{ maxWidth: "100%", maxHeight: 240, borderRadius: 6 }} /> : <><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 16V4M7 9l5-5 5 5M5 20h14" /></svg>Toca para seleccionar una foto</>}
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label style={{ display: "block" }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Procedimiento</span>
                <select value={proc} onChange={e => setProc(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }}>{getImgProcs().map(p => <option key={p}>{p}</option>)}</select>
              </label>
              <label style={{ display: "block" }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Fecha</span>
                <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }} />
              </label>
            </div>
          </div>
        </AdModal>
      )}

      {/* Visor de imagen a pantalla completa (clic en cualquier foto) */}
      {viewer && (
        <div onMouseDown={e => { if (e.target === e.currentTarget) setViewer(null); }} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(8,8,6,.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px", boxSizing: "border-box" }}>
          <div style={{ position: "absolute", top: "calc(14px + env(safe-area-inset-top,0px))", left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
            <span style={{ fontFamily: T.sans, fontSize: 12.5, color: "#fff" }}>{viewer.proc || viewer.label || "Imagen"}{viewer.date ? " · " + fmtDate(viewer.date) : ""}</span>
            <button onClick={() => setViewer(null)} style={{ background: "rgba(255,255,255,.14)", border: "none", borderRadius: 999, width: 40, height: 40, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
          </div>
          <img src={viewer.src} alt={viewer.label || "Imagen"} onClick={e => e.stopPropagation()} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 }} />
          <a href={viewer.src} download={"imagen-" + (viewer.proc || "clinica") + "-" + (viewer.date || "") + ".jpg"} onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: "calc(18px + env(safe-area-inset-bottom,0px))", fontFamily: T.sans, fontSize: 12.5, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,.16)", borderRadius: 10, padding: "11px 20px", textDecoration: "none" }}>↓ Descargar</a>
        </div>
      )}
    </div>
  );
}

/* ─────────── FACTURACIÓN ─────────── */
function FacturacionTab({ T, patient, updatePatient, onOpenSession }) {
  const D = window.JCDATA;
  const [editAt, setEditAt] = useState(null); // { idx: -1 (nuevo) | n, item: {...} }
  const [delAt, setDelAt] = useState(null); // atención a eliminar (pide clave de admin)
  const metodos = ["Transferencia", "Efectivo", "Tarjeta débito", "Tarjeta crédito", "Otro"];

  // Atenciones = los pagos registrados en cada SESIÓN (pestaña Procedimientos). Fuente única.
  // Guardamos hi = índice en patient.history para poder quitar el cobro de esa sesión.
  const items = (patient.history || [])
    .map((h, hi) => ({ h, hi }))
    .filter(x => (x.h.cobro || 0) > 0)
    .map(({ h, hi }) => ({ concept: (h.proc || "Atención"), metodo: h.metodo || "—", amount: h.cobro || 0, date: h.date || "", hi }));

  // Eliminar una atención = quitar el cobro de esa sesión (protegido con clave de admin).
  // La sesión clínica (procedimiento) se conserva; se borra aparte en Procedimientos con el PIN del profesional.
  function removeAtencion(hi) {
    const hist = (patient.history || []).map((h, i) => i === hi ? { ...h, cobro: 0, metodo: "", comprobante: "" } : h);
    updatePatient(patient.id, { history: hist });
    setDelAt(null);
  }
  const total = items.reduce((s, i) => s + (i.amount || 0), 0);

  function addNew() {
    setEditAt({ idx: -1, item: { id: "b" + Date.now(), concept: "", date: new Date().toLocaleDateString("es-CL"), amount: 0, paid: false, metodo: "Transferencia", comprobante: "" } });
  }
  function saveEdit() {
    const updated = [...items];
    if (editAt.idx === -1) updated.unshift(editAt.item);
    else updated[editAt.idx] = editAt.item;
    updatePatient(patient.id, { billing: updated });
    setEditAt(null);
  }
  function setF(k, v) { setEditAt(prev => ({ ...prev, item: { ...prev.item, [k]: v } })); }

  const iconEdit = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>;
  const iconDel = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Atenciones y pagos</div>
        {items.length > 0 && <div style={{ fontFamily: T.serif, fontSize: 17, color: T.text }}>Total {D.fmt(total)}</div>}
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 }}>
        Historial de atenciones cobradas. <b style={{ color: T.text }}>Toca una atención</b> para abrir la sesión con su detalle de pago.
      </div>
      {items.length === 0 && (
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, textAlign: "center", padding: "24px 0" }}>
          Aún no hay pagos. Registra el cobro al crear una sesión en <b>Procedimientos</b>.
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((b, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 4px", borderBottom: "1px solid " + T.lineSoft }}>
            <div onClick={() => onOpenSession && onOpenSession(b.hi)} title="Abrir la sesión y su detalle de pago"
              style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 10, cursor: onOpenSession ? "pointer" : "default", borderRadius: 8, padding: "2px 4px", margin: "-2px -4px" }}
              onMouseEnter={e => { if (onOpenSession) e.currentTarget.style.background = T.lineSoft; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.text }}>{b.concept}</div>
                <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{b.metodo}{b.date ? " · " + b.date : ""}</div>
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text, flexShrink: 0 }}>{D.fmt(b.amount || 0)}</div>
              {onOpenSession && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.7" style={{ flexShrink: 0 }}><path d="m9 18 6-6-6-6" /></svg>}
            </div>
            <button type="button" title="Eliminar atención (requiere clave de admin)" onClick={() => setDelAt(b)}
              style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 7, border: "1px solid " + T.line, background: T.surface, color: T.textMute, cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#C0285A"; e.currentTarget.style.borderColor = "#C0285A"; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.textMute; e.currentTarget.style.borderColor = T.line; }}>
              {iconDel}
            </button>
          </div>
        ))}
      </div>

      {editAt && (
        <AdModal T={T} title={editAt.idx === -1 ? "Nueva atención" : "Editar atención"} onClose={() => setEditAt(null)}
          footer={<div style={{ display: "flex", gap: 10 }}><AdBtn T={T} onClick={() => setEditAt(null)}>Cancelar</AdBtn><AdBtn T={T} primary onClick={saveEdit}>Guardar</AdBtn></div>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {(() => {
              const svcs = (window.clinicServiceList ? window.clinicServiceList() : []);
              const byCat = {}; svcs.forEach(s => { (byCat[s.cat] = byCat[s.cat] || []).push(s); });
              const cats = Object.keys(byCat);
              const known = svcs.some(s => s.name === editAt.item.concept);
              const isOther = editAt.item.concept && !known;
              const sel2 = { width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" };
              const lbl2 = { display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 };
              if (!svcs.length) return <AdField T={T} label="Procedimiento / Concepto" value={editAt.item.concept} onChange={v => setF("concept", v)} placeholder="Ej: Toxina botulínica" />;
              return (
                <div>
                  <label style={{ display: "block" }}>
                    <span style={lbl2}>Procedimiento / Concepto</span>
                    <select value={isOther ? "__other__" : (editAt.item.concept || "")} onChange={e => { const v = e.target.value; setF("concept", v === "__other__" ? " " : v); }} style={sel2}>
                      <option value="">Selecciona un servicio…</option>
                      {cats.map(c => <optgroup key={c} label={c}>{byCat[c].map((s, i) => <option key={c+i} value={s.name}>{s.name}</option>)}</optgroup>)}
                      <option value="__other__">Otro (especificar)…</option>
                    </select>
                  </label>
                  {isOther && <div style={{ marginTop: 8 }}><AdField T={T} value={editAt.item.concept.trim()} onChange={v => setF("concept", v)} placeholder="Concepto o procedimiento" /></div>}
                </div>
              );
            })()}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Monto ($)</span>
                <input data-nocap data-only="num" value={editAt.item.amount || ""} onChange={e => setF("amount", parseInt(e.target.value.replace(/\D/g, ""), 10) || 0)} placeholder="0" style={{ width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none", boxSizing: "border-box" }} />
              </div>
              <AdField T={T} label="Fecha" value={editAt.item.date} onChange={v => setF("date", v)} placeholder={new Date().toLocaleDateString("es-CL")} />
            </div>
            <div>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Método de pago</span>
              <select value={editAt.item.metodo || "Transferencia"} onChange={e => setF("metodo", e.target.value)} style={{ width: "100%", padding: "11px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}>
                {metodos.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Estado de pago</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[["Pagado", true], ["Pendiente", false]].map(([l, v]) => (
                  <button key={l} onClick={() => setF("paid", v)} style={{ flex: 1, padding: "11px", borderRadius: 6, cursor: "pointer", background: editAt.item.paid === v ? T.accent : T.surface, color: editAt.item.paid === v ? (T.onAccent || "#fff") : T.textMute, border: "1px solid " + (editAt.item.paid === v ? T.accent : T.line), fontFamily: T.sans, fontSize: 13 }}>{l}</button>
                ))}
              </div>
            </div>
            <AdField T={T} label="Comprobante / N° transferencia (opcional)" value={editAt.item.comprobante || ""} onChange={v => setF("comprobante", v)} placeholder="Ej: 0012345" />
          </div>
        </AdModal>
      )}

      {delAt && window.AdminKeyModal && (
        <window.AdminKeyModal T={T} title="Eliminar atención"
          message={"Vas a eliminar la atención \"" + (delAt.concept || "atención") + "\" (" + D.fmt(delAt.amount || 0) + "). Se quita el cobro y deja de contar en las ventas. La sesión clínica se conserva; para borrarla usa Procedimientos. Ingresa la clave de admin (PIN de admin o contraseña de la cuenta) para confirmar."}
          confirmLabel="Eliminar atención" onClose={() => setDelAt(null)} onOk={() => removeAtencion(delAt.hi)} />
      )}
    </div>
  );
}

/* ─────────── INFORMACIÓN DE CAMPAÑA ─────────── */
const ORIGEN_ORG = ["Paciente antiguo / fidelizado", "Orgánico · Instagram", "Orgánico · Facebook", "Orgánico · TikTok", "Referido de paciente", "Pasó por la clínica (walk-in)", "Búsqueda en Google"];
const ORIGEN_ADS = ["Meta Ads · general", "Meta Ads · Instagram", "Meta Ads · Facebook", "Google Ads", "Otra pauta…"];
// Mapeo de valores legacy a la nueva nomenclatura granular
function normOrigen(v) {
  if (!v || v === "organico") return "Orgánico · Instagram";
  if (v === "referido") return "Referido de paciente";
  if (v === "campana") return "Meta Ads · general";
  return v;
}
function isAdsOrigen(v) { return ORIGEN_ADS.some(o => v && v.startsWith(o.split("·")[0].trim())); }
function CampanaTab({ T, patient, updatePatient }) {
  const c = patient.campaign || {};
  const origen = normOrigen(c.origen);
  function set(patch) { updatePatient(patient.id, { campaign: { ...c, ...patch } }); }
  const selS = { width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" };
  const metaCamps = ((window.CADMIN || { campaigns: [] }).campaigns || []).filter(ca => ca.active);
  return (
    <div>
      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Información de captación</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <div>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Origen</span>
          <select value={origen} onChange={e => set({ origen: e.target.value })} style={selS}>
            <optgroup label="Orgánico / directo">
              {ORIGEN_ORG.map(o => <option key={o}>{o}</option>)}
            </optgroup>
            <optgroup label="Publicidad · Ads">
              {metaCamps.length > 0 && metaCamps.map(ca => <option key={ca.id}>{ca.name}</option>)}
              {ORIGEN_ADS.map(o => <option key={o}>{o}</option>)}
            </optgroup>
          </select>
        </div>
        {isAdsOrigen(origen) && <AdField T={T} label="Campaña específica" value={c.campana || ""} onChange={v => set({ campana: v })} placeholder="Ej: Botox · invierno 2026" />}
        <AdField T={T} label="Detalle / referente" value={c.detalle || ""} onChange={v => set({ detalle: v })} placeholder="Ej: recomendada por María G." />
      </div>
    </div>
  );
}

/* ─────────── IA (Resumen clínico + Auditoría, en un solo tab) ─────────── */
function FichaIATab({ T, patient, go }) {
  const [sub, setSub] = useState("resumen");
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[["resumen", "Resumen clínico"], ["auditoria", "Auditoría"]].map(([k, l]) => (
          <button key={k} type="button" onClick={() => setSub(k)} style={{ fontFamily: T.sans, fontSize: 11.5, fontWeight: sub === k ? 600 : 500, padding: "7px 14px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (sub === k ? T.accent : T.line), background: sub === k ? T.accent : "transparent", color: sub === k ? (T.onAccent || "#fff") : T.textMute }}>{l}</button>
        ))}
      </div>
      {sub === "resumen" ? <ResumenIA T={T} patient={patient} /> : <AuditoriaIA T={T} patient={patient} go={go} />}
    </div>
  );
}

/* ─────────── AUDITORÍA IA ─────────── */
function AuditoriaIA({ T, patient, go }) {
  const issues = [];
  if (!patient.consent) issues.push({ tone: "danger", t: "Falta consentimiento firmado", d: "El paciente no tiene consentimiento informado registrado.", action: ["Ir a Consentimientos", () => go("consent")] });
  if (!patient.clinica || Object.keys(patient.clinica || {}).length < 3) issues.push({ tone: "warn", t: "Antecedentes incompletos", d: "Faltan datos de antecedentes médicos, alergias o hábitos.", action: ["Completar antecedentes", () => go("fichaclinica")] });
  if (!patient.campaign) issues.push({ tone: "warn", t: "Sin información de captación", d: "No se registró cómo llegó el paciente (campaña / orgánico / medio).", action: ["Registrar origen", () => go("campana")] });
  const bill = patient.billing;
  const saldo = bill ? bill.filter(b => !b.paid).reduce((s, b) => s + b.amount, 0) : 0;
  if (saldo > 0) issues.push({ tone: "warn", t: "Pago pendiente", d: "Hay saldo por cobrar en la facturación del paciente.", action: ["Ver facturación", () => go("facturacion")] });
  if (!patient.points || patient.points.length === 0) issues.push({ tone: "info", t: "Mapeo facial vacío", d: "Aún no se registran punciones en la ficha de tratamiento.", action: ["Abrir mapeo", () => go("mapa")] });
  const toneC = { danger: "#C0285A", warn: T.gold, info: T.accent };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6"><rect x="4.5" y="8" width="15" height="10" rx="3" /><path d="M12 4.5V8" /><circle cx="12" cy="3.4" r="1.3" /><circle cx="9" cy="13" r="1.2" fill={T.accent} stroke="none" /><circle cx="15" cy="13" r="1.2" fill={T.accent} stroke="none" /></svg>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Auditoría IA · sugerencias</div>
      </div>
      <p style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, marginBottom: 16, lineHeight: 1.6 }}>Revisión automática de la ficha: documentos, datos faltantes, consentimiento y pagos.</p>
      {issues.length === 0
        ? <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px", borderRadius: 8, background: "rgba(31,138,91,.08)", border: "1px solid rgba(31,138,91,.35)" }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#1F8A5B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg></span>
            <span style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>Ficha completa. Sin observaciones pendientes.</span>
          </div>
        : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {issues.map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 11, padding: "14px", borderRadius: 8, background: T.surface, border: "1px solid " + T.line, borderLeft: "3px solid " + toneC[it.tone] }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.text }}>{it.t}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginTop: 3, lineHeight: 1.5 }}>{it.d}</div>
                  <button onClick={it.action[1]} style={{ marginTop: 9, fontFamily: T.sans, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, background: "none", border: "1px solid " + T.chipBorder, borderRadius: 999, padding: "7px 13px", cursor: "pointer" }}>{it.action[0]} →</button>
                </div>
              </div>
            ))}
          </div>}
    </div>
  );
}

/* ─────────── RESUMEN CLÍNICO IA ─────────── */
function ResumenIA({ T, patient }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [ans, setAns] = useState([]);
  const [asking, setAsking] = useState(false);

  function ctx() {
    const c = patient.clinica || {};
    const hist = (patient.history || []).map(h => [h.date, h.proc, h.units && ("(" + h.units + ")"), h.proName && ("por " + h.proName), h.note].filter(Boolean).join(" ")).join("; ");
    const billing = (patient.billing || []).map(b => (b.date || "") + " " + (b.concept || "") + " $" + (b.amount || 0) + " " + (b.paid ? "pagado" : "pendiente")).join("; ");
    const clinFields = [
      c.alergias && ("Alergias: " + c.alergias),
      c.morbidos && ("Antecedentes mórbidos: " + c.morbidos),
      c.medicamentos && ("Medicamentos: " + c.medicamentos),
      c.esteticos && ("Procedimientos estéticos previos: " + c.esteticos),
      c.quirurgicos && ("Antecedentes quirúrgicos: " + c.quirurgicos),
      c.tabaco && ("Tabaco: " + c.tabaco + " cigarros/día"),
      c.alcohol && ("Alcohol: " + c.alcohol),
      c.actividad && ("Actividad física: " + c.actividad),
      c.embarazo && ("Embarazo/lactancia: " + c.embarazo),
      c.skincare && ("Skincare: " + c.skincare),
    ].filter(Boolean).join(". ");
    return [
      "Paciente: " + patient.name + (patient.age ? ", " + patient.age + " años" : "") + (patient.rut ? ", RUT " + patient.rut : ""),
      patient.phone && ("Teléfono: " + patient.phone),
      patient.email && ("Correo: " + patient.email),
      "Tratamientos etiquetados: " + ((patient.tags || []).join(", ") || "ninguno"),
      clinFields && ("Clínica: " + clinFields),
      "Historial de sesiones (" + (patient.history || []).length + "): " + (hist || "sin sesiones"),
      billing && ("Facturación: " + billing),
      patient.notes && ("Notas internas: " + patient.notes),
      "Consentimiento: " + (patient.consent ? "firmado" : "PENDIENTE"),
    ].filter(Boolean).join(". ");
  }
  // ── Resumen clínico LOCAL (sin servidor): redacta a partir de los datos del paciente.
  // Funciona siempre; si hay IA conectada (window.claude) se usa esa en su lugar.
  function localSummary() {
    const hist = (patient.history || []);
    const nombre = patient.name || "El paciente";
    const edad = patient.age ? (", " + patient.age + " años") : "";
    const tags = (patient.tags || []).filter(Boolean);
    const lines = [];
    lines.push(nombre + edad + ". " + (tags.length ? "Tratamientos asociados: " + tags.join(", ") + "." : "Sin tratamientos etiquetados aún."));
    if (hist.length) {
      const ultima = hist[0];
      const procs = {};
      hist.forEach(h => { const k = (h.proc || "").trim(); if (k) procs[k] = (procs[k] || 0) + 1; });
      const detalle = Object.entries(procs).map(([p, n]) => p + (n > 1 ? " ×" + n : "")).join(", ");
      lines.push("Registra " + hist.length + " sesión" + (hist.length === 1 ? "" : "es") + ": " + detalle + ".");
      lines.push("Última sesión: " + (ultima.date || "—") + " · " + (ultima.proc || "—") + (ultima.units ? " (" + ultima.units + ")" : "") + (ultima.note ? ". Nota: " + ultima.note : "") + ".");
    } else {
      lines.push("Aún no hay sesiones registradas en la ficha.");
    }
    if (patient.notes) lines.push("Antecedentes/notas: " + patient.notes + ".");
    lines.push("A vigilar: " + (patient.consent ? "consentimiento firmado; " : "⚠ consentimiento PENDIENTE de firma; ") + "confirmar evolución y reacciones en el control de seguimiento.");
    return lines.join("\n");
  }
  function localAnswer(text) {
    const t = text.toLowerCase();
    const hist = patient.history || [];
    const c = patient.clinica || {};
    if (/consent/.test(t)) return patient.consent ? "El consentimiento está firmado." : "El consentimiento está PENDIENTE de firma.";
    if (/tel[eé]fono|fono|celular|whatsapp|contacto/.test(t)) return patient.phone ? "Teléfono: " + patient.phone : "No hay teléfono registrado en la ficha.";
    if (/correo|email|mail/.test(t)) return patient.email ? "Correo: " + patient.email : "No hay correo registrado en la ficha.";
    if (/\brut\b|c[eé]dula/.test(t)) return patient.rut ? "RUT: " + patient.rut : "RUT no registrado.";
    if (/edad|años|anos/.test(t)) return patient.age ? "Edad: " + patient.age + " años." : "Edad no registrada.";
    if (/alerg/.test(t)) return c.alergias ? "Alergias: " + c.alergias : "Sin alergias registradas en la ficha.";
    if (/antecedente|m[oó]rbido|enfermedad|patolog/.test(t)) return c.morbidos ? "Antecedentes mórbidos: " + c.morbidos : "Sin antecedentes mórbidos registrados.";
    if (/medicamento|f[aá]rmaco/.test(t)) return c.medicamentos ? "Medicamentos: " + c.medicamentos : "Sin medicamentos registrados.";
    if (/tabaco|cigarro|fum/.test(t)) return c.tabaco ? "Tabaco: " + c.tabaco + " cigarros/día." : "No se registra consumo de tabaco.";
    if (/alcohol|bebi/.test(t)) return c.alcohol ? "Alcohol: " + c.alcohol : "No se registra consumo de alcohol.";
    if (/embaraz|lactan/.test(t)) return c.embarazo ? "Embarazo/lactancia: " + c.embarazo : "No registra embarazo ni lactancia.";
    if (/quirúrg|cirugía|operaci/.test(t)) return c.quirurgicos || c.cirugias ? "Antecedentes quirúrgicos: " + (c.quirurgicos || c.cirugias) : "Sin antecedentes quirúrgicos.";
    if (/est[eé]tico|prev[io]*|antes/.test(t)) return c.esteticos ? "Procedimientos estéticos previos: " + c.esteticos : "Sin procedimientos estéticos previos registrados.";
    if (/última|ultima|reciente/.test(t) && hist[0]) return "Última sesión: " + (hist[0].date || "—") + " · " + (hist[0].proc || "—") + (hist[0].units ? " (" + hist[0].units + ")" : "") + (hist[0].proName ? " · " + hist[0].proName : "") + (hist[0].note ? ". " + hist[0].note : "");
    if (/cu[aá]nt|sesion|histor/.test(t)) return hist.length ? "Tiene " + hist.length + " sesión(es): " + hist.map(h => (h.date || "") + " " + (h.proc || "")).join("; ") : "Sin sesiones registradas.";
    if (/tratamiento|procedimiento|qu[eé] se|que le/.test(t)) { const ps = Array.from(new Set(hist.map(h => h.proc).filter(Boolean))); return ps.length ? "Tratamientos realizados: " + ps.join(", ") + "." : "Sin tratamientos registrados."; }
    if (/pag|cobr|factur|deuda|balan/.test(t)) { const bl = patient.billing || []; const pend = bl.filter(b => !b.paid); return bl.length ? "Facturación: " + bl.length + " registro(s). " + (pend.length ? pend.length + " pendiente(s) de pago." : "Todos pagados.") : "Sin registros de facturación."; }
    if (/nota|observ|intern/.test(t)) return patient.notes ? "Notas internas: " + patient.notes : "Sin notas internas registradas.";
    return localSummary();
  }
  async function gen() {
    setLoading(true);
    try {
      if (window.mediqueAI) {
        const system = "Eres asistente clínico de una consulta de medicina estética en Chile. Redacta en español un resumen clínico breve (4-6 líneas) del paciente, basado SOLO en estos datos. Indica tratamientos realizados, evolución y puntos a vigilar. No inventes datos.";
        const res = await window.mediqueAI([{ role: "user", content: "DATOS: " + ctx() + "\n\nGenera el resumen clínico." }], {}, { system: system, max_tokens: 500 });
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
    const text = q.trim(); if (!text || asking) return;
    setQ(""); setAns(a => [...a, { role: "user", content: text }]); setAsking(true);
    try {
      if (window.mediqueAI) {
        const system = "Responde en español, breve y clínico, SOLO con base en los datos del paciente que te dan. Si no hay dato, dilo.";
        const res = await window.mediqueAI([{ role: "user", content: "DATOS: " + ctx() + "\n\nPREGUNTA: " + text }], {}, { system: system, max_tokens: 500 });
        setAns(a => [...a, { role: "ai", content: (res && res.ok && res.reply ? res.reply.trim() : "") || localAnswer(text) }]);
      } else {
        setAns(a => [...a, { role: "ai", content: localAnswer(text) }]);
      }
    } catch (e) { setAns(a => [...a, { role: "ai", content: localAnswer(text) }]); }
    setAsking(false);
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Resumen clínico · IA</div>
        <AdBtn T={T} small primary onClick={gen}>{loading ? "Generando…" : (summary ? "Regenerar" : "Generar resumen")}</AdBtn>
      </div>
      <div style={{ background: "rgba(106,130,150,.10)", border: "1px solid " + T.line, borderRadius: 8, padding: "12px 14px", fontFamily: T.sans, fontSize: 11, color: T.textMute, lineHeight: 1.5, marginBottom: 14 }}>
        El resumen se genera con IA a partir del historial del paciente y debe ser verificado por un profesional de la salud.
      </div>
      {(() => {
        const DS = window.JCDS, luxF = DS && (typeof jcdsLux === "function" ? jcdsLux() : false);
        if (loading && luxF) return (
          <div style={{ minHeight: 80, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px", display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={DS.skel(T, { height: 12, width: "92%" })} />
            <div style={DS.skel(T, { height: 12, width: "78%" })} />
            <div style={DS.skel(T, { height: 12, width: "85%" })} />
            <div style={DS.skel(T, { height: 12, width: "60%" })} />
          </div>
        );
        return (
          <div style={{ minHeight: 80, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px", fontFamily: T.sans, fontSize: 13, color: summary ? T.text : T.textFaint, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
            {loading ? "Analizando historial del paciente…" : (summary || "Toca «Generar resumen» para que la IA redacte un resumen clínico de este paciente.")}
          </div>
        );
      })()}
      {/* asistente inline */}
      <div style={{ marginTop: 16, background: "rgba(106,130,150,.08)", border: "1px solid " + T.line, borderRadius: 10, padding: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.6"><rect x="4.5" y="8" width="15" height="10" rx="3" /><path d="M12 4.5V8" /><circle cx="12" cy="3.4" r="1.3" /></svg>
          <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text }}>Asistente IA</span>
        </div>
        {ans.map((m, i) => <div key={i} style={{ fontFamily: T.sans, fontSize: 12.5, lineHeight: 1.55, color: m.role === "user" ? T.accent : T.text, padding: "5px 0", whiteSpace: "pre-wrap" }}>{m.role === "user" ? "› " : ""}{m.content}</div>)}
        {asking && <div style={{ fontFamily: T.sans, fontSize: 12, color: T.textMute, padding: "4px 0" }}>Pensando…</div>}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === "Enter") ask(); }} placeholder="Pregúntame sobre el paciente…" style={{ flex: 1, padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.bg, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }} />
          <button onClick={ask} style={{ width: 40, borderRadius: 8, border: "none", cursor: "pointer", background: T.primaryBg, color: T.primaryText, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg></button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── RECETA MÉDICA / INDICACIONES POST TRATAMIENTO ─────────── */
/* ── N3 · Panel resumen estilo Medilink (signos vitales + preexistencias + atenciones) ── */
/* ── N7/ficha · Exámenes: subir PDF/foto de exámenes ya existentes (clave aparte) ── */
function patExamKey(id) { return "pexam_" + id; }
function ExamenesTab({ T, patient }) {
  const [files, setFiles] = useState(() => { try { const v = window.DB && window.DB.get(patExamKey(patient.id)); return Array.isArray(v) ? v : []; } catch (e) { return []; } });
  const fileRef = useRef(null);
  let ordenes = []; try { ordenes = ((window.DB && window.DB.get("lab_orders")) || []).filter(o => o.patId === patient.id); } catch (e) {}
  function persist(n) { setFiles(n); try { window.DB && window.DB.set(patExamKey(patient.id), n); } catch (e) {} }
  function onPick(e) {
    const fs = Array.from(e.target.files || []); e.target.value = "";
    fs.forEach(file => {
      if (file.size > 3 * 1024 * 1024) { window.jcmToast && window.jcmToast("\"" + file.name + "\" supera 3 MB. Usa un archivo más liviano.", "info"); return; }
      const rd = new FileReader();
      rd.onload = () => persist([{ id: "ex" + Date.now() + Math.random().toString(36).slice(2, 5), name: file.name, type: /pdf/i.test(file.type) ? "pdf" : "img", data: rd.result, ts: Date.now() }, ...(window.DB && window.DB.get(patExamKey(patient.id)) || files)]);
      rd.readAsDataURL(file);
    });
  }
  function ver(f) { try { const parts = ("" + f.data).split(","); const bin = atob(parts[1] || ""); const arr = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i); const mime = (parts[0].match(/:(.*?);/) || [, f.type === "pdf" ? "application/pdf" : "image/jpeg"])[1]; const url = URL.createObjectURL(new Blob([arr], { type: mime })); window.open(url, "_blank"); setTimeout(() => URL.revokeObjectURL(url), 20000); } catch (e) { window.open(f.data, "_blank"); } }
  async function del(id) { if (await (window.jcmConfirm || window.confirm)("¿Eliminar este examen?", { danger: true })) persist(files.filter(x => x.id !== id)); }
  const hora = ts => { try { return new Date(ts).toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit", year: "numeric" }); } catch (e) { return ""; } };
  return (
    <div>
      <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 }}>Carga los <b style={{ color: T.text }}>exámenes ya existentes</b> del paciente (PDF o foto) para tenerlos siempre a mano en su ficha.</div>
      <AdBtn T={T} primary onClick={() => fileRef.current && fileRef.current.click()}>+ Subir examen (PDF o foto)</AdBtn>
      <input ref={fileRef} type="file" accept=".pdf,application/pdf,image/*" multiple onChange={onPick} style={{ display: "none" }} />
      {ordenes.length > 0 && <div style={{ marginTop: 18 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 8 }}>Órdenes solicitadas</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{ordenes.map(o => (
          <div key={o.id} style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "9px 12px", fontFamily: T.sans, fontSize: 12.5, color: T.text }}>{o.examenes} <span style={{ color: T.textFaint, fontSize: 11 }}>· {o.tipo} · {o.estado} · {o.fecha}</span></div>))}</div>
      </div>}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Exámenes cargados ({files.length})</div>
        {files.length === 0 ? <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint }}>Aún no hay exámenes cargados.</div>
          : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>{files.map(f => (
              <div key={f.id} style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 10, overflow: "hidden" }}>
                <div onClick={() => ver(f)} title="Ver" style={{ height: 120, background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden" }}>
                  {f.type === "img" ? <img src={f.data} alt={f.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }} /> : <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#C0285A" strokeWidth="1.4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 15h6M9 18h4" /></svg>}
                </div>
                <div style={{ padding: "9px 11px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.sans, fontSize: 12, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div><div style={{ fontFamily: T.sans, fontSize: 10, color: T.textFaint }}>{hora(f.ts)}</div></div>
                  <button onClick={() => ver(f)} title="Ver" style={{ background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 8px", cursor: "pointer", color: T.accent, fontFamily: T.sans, fontSize: 11 }}>Ver</button>
                  <button onClick={() => del(f.id)} title="Eliminar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 3, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
                </div>
              </div>))}</div>}
      </div>
    </div>
  );
}

/* ── N1 · Presupuestos (misma línea gráfica de las indicaciones) ── */
function PresupuestoTab({ T, patient, updatePatient }) {
  const D = window.JCDATA;
  const fmt = n => (D && D.fmt) ? D.fmt(n) : ("$" + (n || 0).toLocaleString("es-CL"));
  const servicios = (() => { try { return (window.clinicServiceList ? window.clinicServiceList() : []) || []; } catch (e) { return []; } })();
  const [items, setItems] = useState([]);
  const [pick, setPick] = useState("");
  const [descuento, setDescuento] = useState("");
  const [validez, setValidez] = useState("15");
  const [nota, setNota] = useState("");
  const presupuestos = patient.presupuestos || [];
  function addSvc() { const s = servicios.find(x => x.name === pick); if (!s) return; const ex = items.find(i => i.name === s.name); if (ex) setItems(items.map(i => i.name === s.name ? { ...i, qty: i.qty + 1 } : i)); else setItems([...items, { name: s.name, price: s.price || 0, qty: 1 }]); setPick(""); }
  function addCustom() { setItems([...items, { name: "", price: 0, qty: 1 }]); }
  function upd(i, patch) { setItems(items.map((it, j) => j === i ? { ...it, ...patch } : it)); }
  function del(i) { setItems(items.filter((_, j) => j !== i)); }
  const subtotal = items.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  const desc = Math.min(subtotal, parseInt(descuento, 10) || 0);
  const total = subtotal - desc;
  const inp = { width: "100%", fontFamily: T.sans, fontSize: 13.5, padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" };
  function docInner() {
    const e = jcmDocEsc; const b = jcmDocBrand(); const now = new Date();
    const hoy = now.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const dot = String(now.getDate()).padStart(2, "0") + " · " + String(now.getMonth() + 1).padStart(2, "0") + " · " + now.getFullYear();
    const rows = items.filter(i => (i.name || "").trim()).map(i => "<tr><td style='padding:8px 4px;border-bottom:1px solid #eee'>" + e(i.name) + "</td><td style='padding:8px 4px;border-bottom:1px solid #eee;text-align:center'>" + (i.qty || 1) + "</td><td style='padding:8px 4px;border-bottom:1px solid #eee;text-align:right'>" + fmt(i.price) + "</td><td style='padding:8px 4px;border-bottom:1px solid #eee;text-align:right'>" + fmt((i.price || 0) * (i.qty || 1)) + "</td></tr>").join("");
    const inner = jcmMasthead(b)
      + "<div class='titleblock'><div><div class='eyebrow'>Cotización</div><h1 class='doc-title'>Presupuesto <span class='it'>de tratamiento</span></h1></div><div class='folio'><span class='k'>Fecha</span><span class='v vbig'>" + e(dot) + "</span></div></div>"
      + jcmPband(patient, [["RUT", patient.rut], ["Vigencia", (parseInt(validez, 10) || 15) + " días"]])
      + "<div class='body'><div class='section' style='margin-top:20px'><div class='section-head'><span class='sh-label'>Detalle</span><span class='sh-rule'></span></div>"
      + "<table style=\"width:100%;border-collapse:collapse;font-family:'Jost',sans-serif;font-size:13px;color:#121A26\"><thead><tr><th style='text-align:left;padding:6px 4px;border-bottom:2px solid #121A26'>Tratamiento</th><th style='text-align:center;padding:6px 4px;border-bottom:2px solid #121A26'>Cant.</th><th style='text-align:right;padding:6px 4px;border-bottom:2px solid #121A26'>Valor</th><th style='text-align:right;padding:6px 4px;border-bottom:2px solid #121A26'>Total</th></tr></thead><tbody>" + rows + "</tbody></table>"
      + "<div style=\"margin-top:14px;text-align:right;font-family:'Jost',sans-serif;font-size:13px;color:#121A26\">Subtotal: " + fmt(subtotal) + (desc ? "<br>Descuento: − " + fmt(desc) : "") + "<br><span style='font-size:20px;font-weight:600'>Total: " + fmt(total) + "</span></div></div>"
      + (nota.trim() ? "<div class='section'><div class='section-head'><span class='sh-label'>Notas</span><span class='sh-rule'></span></div><div class='textbox'>" + e(nota).replace(/\n/g, "<br>") + "</div></div>" : "")
      + "</div>" + jcmSignFoot(b, b.proName, "Presupuesto", patient.name || "", hoy, null);
    return { title: "Presupuesto · " + e(patient.name || ""), inner: inner, b: b };
  }
  function imprimir(save) { if (!items.length) { window.jcmToast && window.jcmToast("Agrega al menos un tratamiento.", "info"); return; } const d = docInner(); if (save) { window.jcmSaveDocToFolder && window.jcmSaveDocToFolder("Presupuesto - " + (patient.name || "Paciente") + " - " + new Date().toISOString().slice(0, 10), window.jcmDocHTML(d.title, d.b, d.inner)); } else { jcmPrintDoc(d.title, d.b, d.inner); } }
  function guardar() { if (!items.length) { window.jcmToast && window.jcmToast("Agrega al menos un tratamiento.", "info"); return; } const p = { id: "pp" + Date.now(), fecha: new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" }), items: items.filter(i => (i.name || "").trim()), subtotal, desc, total, validez: parseInt(validez, 10) || 15, nota: nota.trim() }; updatePatient(patient.id, { presupuestos: [p, ...presupuestos] }); setItems([]); setDescuento(""); setNota(""); window.jcmToast && window.jcmToast("Presupuesto guardado.", "ok"); try { window.jcmAudit && window.jcmAudit("Presupuesto creado · " + patient.name + " · " + fmt(total)); } catch (e) {} }
  function waLink() { const ph = (patient.phone || "").replace(/\D/g, ""); if (ph.length < 8) { window.jcmToast && window.jcmToast("El paciente no tiene teléfono.", "info"); return; } const clin = (window.clinicName && window.clinicName()) || "Medique"; const L = ["*Presupuesto · " + clin + "*", "Hola " + (patient.name || "") + " 👋 Te compartimos tu presupuesto:", ""]; items.filter(i => (i.name || "").trim()).forEach(i => L.push("• " + i.name + (i.qty > 1 ? " x" + i.qty : "") + " — " + fmt((i.price || 0) * (i.qty || 1)))); if (desc) L.push("Descuento: − " + fmt(desc)); L.push("*Total: " + fmt(total) + "*", "Válido por " + (parseInt(validez, 10) || 15) + " días."); window.open("https://wa.me/" + ph + "?text=" + encodeURIComponent(L.join("\n")), "_blank", "noopener"); }
  async function enviarCorreo() { const to = (patient.email || "").trim(); if (!to) { window.jcmToast && window.jcmToast("El paciente no tiene correo.", "info"); return; } if (!window.mediqueEmail) { window.jcmToast && window.jcmToast("El correo no está disponible.", "info"); return; } const clin = (window.clinicName && window.clinicName()) || "Medique"; const L = ["Hola " + (patient.name || "") + ",", "", "Te compartimos tu presupuesto en " + clin + ":", ""]; items.filter(i => (i.name || "").trim()).forEach(i => L.push("- " + i.name + (i.qty > 1 ? " x" + i.qty : "") + ": " + fmt((i.price || 0) * (i.qty || 1)))); if (desc) L.push("Descuento: -" + fmt(desc)); L.push("Total: " + fmt(total), "Válido por " + (parseInt(validez, 10) || 15) + " días."); try { const r = await window.mediqueEmail({ to: to, subject: "Presupuesto · " + clin, text: L.join("\n"), replyTo: window.clinicReplyTo && window.clinicReplyTo() }); window.jcmToast && window.jcmToast(r && r.ok ? "Presupuesto enviado a " + to : "No se pudo enviar el correo.", r && r.ok ? "ok" : "error"); } catch (e) { window.jcmToast && window.jcmToast("No se pudo enviar el correo.", "error"); } }
  // N8.1 · Esquema Facial: documento con esquema del rostro + zonas marcadas + tabla de prestaciones.
  const FACE_POS = { "frente": [100, 46], "frontal": [100, 46], "entrecejo": [100, 74], "glabela": [100, 74], "patas de gallo": [150, 88], "ojeras": [124, 100], "nariz": [100, 108], "dorso nasal": [100, 108], "pómulos": [140, 120], "pomulos": [140, 120], "surcos nasogenianos": [122, 138], "código de barras": [100, 150], "labios": [100, 168], "mentón": [100, 192], "menton": [100, 192], "línea mandibular": [58, 172], "mandíbula": [58, 172], "cuello": [100, 224] };
  function zonaDe(nombre) { const n = (nombre || "").toLowerCase(); for (const k in FACE_POS) if (n.indexOf(k) >= 0) return { k: k, p: FACE_POS[k] }; return null; }
  function esquemaFacial() {
    const e = jcmDocEsc; const b = jcmDocBrand(); const now = new Date();
    const hoy = now.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const withZone = items.filter(i => (i.name || "").trim());
    const marks = withZone.map(i => zonaDe(i.name)).filter(Boolean);
    const dots = marks.map(m => "<circle cx='" + m.p[0] + "' cy='" + m.p[1] + "' r='9' fill='none' stroke='#C0285A' stroke-width='1.5' stroke-dasharray='3 2'/><circle cx='" + m.p[0] + "' cy='" + m.p[1] + "' r='2' fill='#C0285A'/>").join("");
    const face = "<svg viewBox='0 0 200 250' width='230' height='288' xmlns='http://www.w3.org/2000/svg'>"
      + "<ellipse cx='100' cy='120' rx='62' ry='84' fill='#F7EFE9' stroke='#D8C7BB' stroke-width='1.5'/>"
      + "<path d='M66 96q30 -18 68 0' fill='none' stroke='#C9B4A6' stroke-width='1.5'/>"
      + "<path d='M92 100 L92 128 Q100 134 108 128' fill='none' stroke='#C9B4A6' stroke-width='1.5'/>"
      + "<path d='M86 154 q14 10 28 0' fill='none' stroke='#C9B4A6' stroke-width='1.5'/>"
      + "<circle cx='80' cy='108' r='3' fill='#7C6A5E'/><circle cx='120' cy='108' r='3' fill='#7C6A5E'/>"
      + dots + "</svg>";
    const rows = withZone.map(i => "<tr><td style='padding:8px 4px;border-bottom:1px solid #eee'>" + e(hoy) + "</td><td style='padding:8px 4px;border-bottom:1px solid #eee'>" + e((zonaDe(i.name) ? zonaDe(i.name).k : "—")) + "</td><td style='padding:8px 4px;border-bottom:1px solid #eee'>" + e(i.name) + (i.qty > 1 ? " x" + i.qty : "") + "</td></tr>").join("");
    const inner = "<h1 class='doc-title' style='text-align:center;margin:0 0 10px'>Esquema <span class='it'>Facial</span></h1>"
      + jcmPband(patient, [["RUT", patient.rut], ["Fecha", hoy]])
      + "<div style='text-align:center;margin:18px 0'>" + face + "</div>"
      + "<div class='section'><div class='section-head'><span class='sh-label'>Prestaciones por zona</span><span class='sh-rule'></span></div>"
      + "<table style=\"width:100%;border-collapse:collapse;font-family:'Jost',sans-serif;font-size:13px;color:#121A26\"><thead><tr><th style='text-align:left;padding:6px 4px;border-bottom:2px solid #121A26'>Fecha</th><th style='text-align:left;padding:6px 4px;border-bottom:2px solid #121A26'>Zona</th><th style='text-align:left;padding:6px 4px;border-bottom:2px solid #121A26'>Prestación</th></tr></thead><tbody>" + rows + "</tbody></table></div>"
      + jcmSignFoot(b, b.proName, "Esquema Facial", patient.name || "", hoy, null);
    if (!withZone.length) { window.jcmToast && window.jcmToast("Agrega tratamientos para armar el esquema.", "info"); return; }
    jcmPrintDoc("Esquema Facial · " + e(patient.name || ""), b, inner);
  }
  return (
    <div>
      <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 14, lineHeight: 1.5 }}>Arma un presupuesto para el paciente y compártelo. Sale con el <b style={{ color: T.text }}>mismo diseño</b> que tus indicaciones.</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <select value={pick} onChange={e => setPick(e.target.value)} style={{ ...inp, flex: 1, minWidth: 200 }}><option value="">Agregar tratamiento…</option>{servicios.map(s => <option key={s.name} value={s.name}>{s.name} · {fmt(s.price)}</option>)}</select>
        <AdBtn T={T} onClick={addSvc}>+ Agregar</AdBtn>
        <AdBtn T={T} onClick={addCustom}>+ Ítem libre</AdBtn>
      </div>
      {items.length === 0 ? <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, padding: "14px 0" }}>Aún sin ítems. Agrega tratamientos arriba.</div>
        : <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>{items.map((i, idx) => (
            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 70px 120px 40px", gap: 8, alignItems: "center" }}>
              <input value={i.name} onChange={e => upd(idx, { name: e.target.value })} placeholder="Tratamiento" style={inp} />
              <input value={i.qty} onChange={e => upd(idx, { qty: parseInt(e.target.value.replace(/\D/g, ""), 10) || 1 })} inputMode="numeric" style={{ ...inp, textAlign: "center" }} />
              <input value={i.price} onChange={e => upd(idx, { price: parseInt(e.target.value.replace(/\D/g, ""), 10) || 0 })} inputMode="numeric" placeholder="Valor" style={{ ...inp, textAlign: "right" }} />
              <button onClick={() => del(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", justifyContent: "center" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
            </div>))}</div>}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 12 }}>
        <label style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>Descuento $<br /><input value={descuento} onChange={e => setDescuento(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="0" style={{ ...inp, width: 120, marginTop: 3 }} /></label>
        <label style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute }}>Vigencia (días)<br /><input value={validez} onChange={e => setValidez(e.target.value.replace(/\D/g, ""))} inputMode="numeric" style={{ ...inp, width: 100, marginTop: 3 }} /></label>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute }}>Subtotal {fmt(subtotal)}{desc ? " · Dcto − " + fmt(desc) : ""}</div>
          <div style={{ fontFamily: T.serif, fontSize: 26, color: T.accent }}>Total {fmt(total)}</div>
        </div>
      </div>
      <textarea value={nota} onChange={e => setNota(e.target.value)} rows={2} placeholder="Notas del presupuesto (opcional)…" style={{ ...inp, resize: "vertical", marginBottom: 12 }} />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <AdBtn T={T} primary onClick={guardar}>Guardar presupuesto</AdBtn>
        <AdBtn T={T} onClick={() => imprimir(false)}>Imprimir</AdBtn>
        <AdBtn T={T} onClick={esquemaFacial}>Esquema facial</AdBtn>
        <AdBtn T={T} onClick={() => imprimir(true)}>Guardar en carpeta</AdBtn>
        <button onClick={waLink} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#1F8A5B", background: "none", border: "1px solid #1F8A5B", borderRadius: 4, padding: "12px 16px", cursor: "pointer" }}>WhatsApp</button>
        <button onClick={enviarCorreo} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.accent, background: "none", border: "1px solid " + T.accent, borderRadius: 4, padding: "12px 16px", cursor: "pointer" }}>Correo</button>
      </div>
      {presupuestos.length > 0 && <div style={{ marginTop: 22 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Presupuestos guardados ({presupuestos.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>{presupuestos.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "11px 14px" }}>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: T.sans, fontSize: 13, color: T.text }}>{(p.items || []).length} tratamiento(s) · {fmt(p.total)}</div><div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>{p.fecha} · vigencia {p.validez} días</div></div>
            <button onClick={() => { setItems(p.items || []); setDescuento(String(p.desc || "")); setValidez(String(p.validez || 15)); setNota(p.nota || ""); }} style={{ fontFamily: T.sans, fontSize: 11, color: T.accent, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }}>Reabrir</button>
            <button onClick={() => updatePatient(patient.id, { presupuestos: presupuestos.filter(x => x.id !== p.id) })} style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, padding: 2, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
          </div>))}</div>
      </div>}
    </div>
  );
}

function RecetaTab({ T, patient, updatePatient }) {
  const D = window.JCDATA;
  const hoy = new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
  // tipo: "receta" (médico / dentista) | "indicaciones" (enfermería)
  const [tipo, setTipo] = useState("receta");
  const [diag, setDiag] = useState("");
  const [rp, setRp] = useState("");
  const [ind, setInd] = useState("");
  const [ctrl, setCtrl] = useState(""); // fecha de control (solo indicaciones)
  const [preview, setPreview] = useState(null); // documento abierto en popup
  const [sigMedId, setSigMedId] = useState("auto");
  // N5 · Vademécum: constructor de medicamento con posología estructurada.
  const [vadeOpen, setVadeOpen] = useState(false);
  const [med, setMed] = useState({ nombre: "", dosis: "1", forma: "comprimido", cada: "8", unidad: "horas", via: "Oral", indic: "" });
  function addMed() {
    if (!med.nombre.trim()) { window.jcmToast && window.jcmToast("Escribe el medicamento.", "info"); return; }
    const linea = med.nombre.trim() + " — " + med.dosis + " " + med.forma + (parseInt(med.dosis, 10) > 1 ? "s" : "") + " cada " + med.cada + " " + med.unidad + " · vía " + med.via + (med.indic.trim() ? " (" + med.indic.trim() + ")" : "");
    setRp(rp ? rp + "\n" + linea : linea);
    setMed({ nombre: "", dosis: "1", forma: "comprimido", cada: "8", unidad: "horas", via: "Oral", indic: "" });
  }
  // Formatea "YYYY-MM-DD" a fecha larga en español para el documento.
  const fmtCtrl = s => { if (!s) return ""; const m = ("" + s).match(/^(\d{4})-(\d{2})-(\d{2})/); if (!m) return s; const d = new Date(+m[1], +m[2] - 1, +m[3]); return isNaN(d) ? s : d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" }); };
  const recetas = patient.recetas || [];
  const titleOf = t => t === "indicaciones" ? "Indicaciones post tratamiento" : "Receta médica";
  const rpLabelOf = t => t === "indicaciones" ? "Indicaciones / cuidados" : "Rp. (medicamentos)";

  function guardar() {
    if (!rp.trim()) return;
    const r = { id: "rx" + Date.now(), tipo, fecha: hoy, diag: diag.trim(), rp: rp.trim(), ind: ind.trim(), ctrl: tipo === "indicaciones" ? ctrl : "" };
    updatePatient(patient.id, { recetas: [r, ...recetas] });
    setDiag(""); setRp(""); setInd(""); setCtrl("");
  }
  function imprimir(r, save) {
    const e = jcmDocEsc;
    const b = jcmDocBrand();
    const now = new Date();
    const hoy = now.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
    const dotDate = String(now.getDate()).padStart(2, "0") + " · " + String(now.getMonth() + 1).padStart(2, "0") + " · " + now.getFullYear();
    const isInd = r.tipo === "indicaciones";
    const lines = r.rp.split("\n").map(l => l.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean);
    const indHtml = lines.map(l => "<li><span class='num'></span><span class='txt'>" + e(l) + "</span></li>").join("");
    const eyebrow = isInd ? "Cuidados posteriores" : "Prescripción médica";
    const titleHtml = isInd ? "Indicaciones <span class='it'>post tratamiento</span>" : "Receta <span class='it'>médica</span>";
    const inner = jcmMasthead(b)
      + "<div class='titleblock'><div><div class='eyebrow'>" + eyebrow + "</div><h1 class='doc-title'>" + titleHtml + "</h1></div>"
      + "<div class='folio'><span class='k'>Fecha</span><span class='v vbig'>" + e(dotDate) + "</span></div></div>"
      + jcmPband(patient, [["RUT", patient.rut], ["Edad", patient.age ? patient.age + " años" : ""]])
      + (r.diag ? "<div class='diag'><div class='dx-tick'></div><div><span class='dx-k'>Diagnóstico / Procedimiento</span></div><div class='dx-v'>" + e(r.diag) + "</div></div>" : "")
      + "<div class='body'>"
      + "<div class='section' style='margin-top:24px'><div class='section-head'><span class='sh-label'>" + (isInd ? "Indicaciones" : "Prescripción") + "</span><span class='sh-rule'></span></div>"
      + (isInd
        ? "<ol class='indlist'>" + (lines.length ? indHtml : "<li><span class='num'></span><span class='txt' style='color:#8B9197'>Sin indicaciones registradas.</span></li>") + "</ol>"
        : "<div style=\"font-family:'Cormorant Garamond',serif;font-style:italic;font-size:34px;color:#121A26;line-height:1;margin:8px 0 6px\">Rp.</div><div class='textbox'>" + e(r.rp).replace(/\n/g, "<br>") + "</div>")
      + "</div>"
      + (r.ind ? "<div class='section'><div class='section-head'><span class='sh-label'>Notas adicionales</span><span class='sh-rule'></span></div><div class='textbox'>" + e(r.ind).replace(/\n/g, "<br>") + "</div></div>" : "")
      + (isInd ? "<div class='control-note'><span class='cn-icon'>+</span><div><span class='cn-k'>Control de evaluación</span><span class='cn-v'>" + (r.ctrl ? "Tu control está agendado para el <b>" + e(fmtCtrl(r.ctrl)) + "</b>. Asiste para evaluar el resultado y realizar los ajustes que sean necesarios." : "Agenda tu control para evaluar el resultado y realizar los ajustes que sean necesarios.") + "</span></div></div>" : "")
      + "</div>"
      + jcmSignFoot(b, b.proName, titleOf(r.tipo), patient.name || "", hoy, (function() {
        try { var ms = window.DB.get("medic_sigs"); if (!ms || !ms.length) return null; return sigMedId === "none" ? null : (ms.find(function(s) { return s.id === sigMedId; }) || ms[0]); } catch (_) { return null; }
      })());
    const docTitle = titleOf(r.tipo) + " · " + e(patient.name || "");
    if (save) {
      const fname = titleOf(r.tipo) + " - " + (patient.name || "Paciente") + " - " + (r.fecha || hoy);
      window.jcmSaveDocToFolder && window.jcmSaveDocToFolder(fname, jcmDocHTML(docTitle, b, inner));
    } else {
      jcmPrintDoc(docTitle, b, inner);
    }
  }
  function enviarWa(r) {
    // Mensaje de WhatsApp con el MISMO formato del PDF (encabezado, datos, secciones, control,
    // firma) y el link de reseñas propio de la clínica al final. (P21)
    const clin = (window.clinicName && window.clinicName()) || "Medique";
    const pro = (window.clinicPro && window.clinicPro()) || "";
    const isInd = r.tipo === "indicaciones";
    const L = ["*" + titleOf(r.tipo).toUpperCase() + "*", "_" + clin + "_", "",
               "Fecha: " + r.fecha, "Paciente: " + (patient.name || "") + (patient.age ? " · " + patient.age + " años" : "")];
    if (r.diag) L.push((isInd ? "Procedimiento" : "Diagnóstico") + ": " + r.diag);
    L.push("", "*" + (isInd ? "Indicaciones y cuidados" : "Prescripción (Rp.)") + "*");
    const lines = r.rp.split("\n").map(l => l.replace(/^[•\-\*]\s*/, "").trim()).filter(Boolean);
    if (isInd) lines.forEach(l => L.push("• " + l)); else L.push(r.rp);
    if (r.ind) { L.push("", "*Notas adicionales*", r.ind); }
    if (r.ctrl) { L.push("", "Control de evaluación: " + fmtCtrl(r.ctrl)); }
    L.push("", "— " + [pro, clin].filter(Boolean).join(" · "));
    const reviewUrl = (window.JCSAAS && window.JCSAAS.enabled && window.JCSAAS.reviewLink) ? window.JCSAAS.reviewLink() : "";
    if (reviewUrl) L.push("", "¿Cómo fue tu experiencia? Responde nuestra encuesta: " + reviewUrl);
    window.open("https://wa.me/" + (patient.phone || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(L.join("\n")), "_blank", "noopener");
  }

  const inp = { width: "100%", fontFamily: T.sans, fontSize: 13.5, padding: "11px 13px", borderRadius: 8, border: "1px solid " + T.line, background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" };
  const seg = active => ({ flex: 1, fontFamily: T.sans, fontSize: 12.5, fontWeight: active ? 600 : 500, padding: "12px", borderRadius: 8, cursor: "pointer", background: active ? T.accent : T.surface, color: active ? (T.onAccent || "#fff") : T.textMute, border: "1px solid " + (active ? T.accent : T.line) });
  return (
    <div>
      <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginBottom: 12, lineHeight: 1.5 }}>
        Elige el tipo de documento según tu rol. Al imprimir (tamaño carta) incluye el espacio para la <b style={{ color: T.text }}>firma del profesional</b>.
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setTipo("receta")} style={seg(tipo === "receta")}>Receta médica<div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, opacity: .85 }}>Médico / dentista</div></button>
        <button onClick={() => setTipo("indicaciones")} style={seg(tipo === "indicaciones")}>Indicaciones post tratamiento<div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, opacity: .85 }}>Enfermería</div></button>
      </div>
      <div style={{ background: T.surface, border: "1px solid " + T.line, borderRadius: 12, padding: 18, marginBottom: 18 }}>
        <label style={{ display: "block" }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Diagnóstico (opcional)</span>
          {(() => {
            const DIAG_OPTS = ["Neuromodulación con Toxina botulínica", "Bioestimulación de colágeno", "Armonización facial"];
            const isOther = diag && !DIAG_OPTS.includes(diag);
            return (
              <div>
                <select value={isOther ? "__other__" : diag} onChange={e => { const v = e.target.value; setDiag(v === "__other__" ? " " : v); }} style={inp}>
                  <option value="">Selecciona un diagnóstico…</option>
                  {DIAG_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                  <option value="__other__">Otro (escribir)…</option>
                </select>
                {isOther && <div style={{ marginTop: 8 }}><input style={inp} value={diag.trim()} onChange={e => setDiag(e.target.value)} placeholder="Escribe el diagnóstico" autoFocus /></div>}
              </div>
            );
          })()}</label>
        <label style={{ display: "block", marginTop: 13 }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>{rpLabelOf(tipo)}</span>
          {tipo === "indicaciones" && (() => { const tpls = (window.getIndTemplates ? window.getIndTemplates() : []); return tpls.length ? (
            <select value="" onChange={e => { const t = tpls.find(x => x.id === e.target.value); if (t) setRp(rp ? rp + "\n" + t.body : t.body); e.target.value = ""; }} style={{ ...inp, marginBottom: 8, cursor: "pointer" }}>
              <option value="">+ Insertar plantilla de indicaciones…</option>
              {tpls.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          ) : null; })()}
          {tipo === "receta" && (
            <div style={{ marginBottom: 8, border: "1px solid " + T.line, borderRadius: 10, overflow: "hidden" }}>
              <button type="button" onClick={() => setVadeOpen(o => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 13px", background: T.surface2 || T.surface, border: "none", cursor: "pointer", textAlign: "left", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.text }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.7"><path d="M9 2v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 17l-5-9V2M8 2h8" /></svg>
                Vademécum · agregar medicamento con posología
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMute} strokeWidth="1.8" style={{ marginLeft: "auto", transform: vadeOpen ? "rotate(180deg)" : "none", transition: ".2s" }}><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {vadeOpen && (
                <div style={{ padding: "12px 13px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <input value={med.nombre} onChange={e => setMed({ ...med, nombre: e.target.value })} list="jcm-vademecum" placeholder="Medicamento (ej: Paracetamol 500 mg)" style={{ ...inp }} />
                  <datalist id="jcm-vademecum">{["Paracetamol 500 mg","Ibuprofeno 400 mg","Amoxicilina 500 mg","Ácido tranexámico 500 mg","Diclofenaco 50 mg","Cetirizina 10 mg","Omeprazol 20 mg","Clorfenamina 4 mg","Metamizol 300 mg","Ketoprofeno 100 mg","Betametasona crema","Mupirocina 2% ungüento","Árnica tópica","Vitamina C 1 g"].map(m => <option key={m} value={m} />)}</datalist>
                  <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 70px 1fr", gap: 6, alignItems: "center" }}>
                    <input value={med.dosis} onChange={e => setMed({ ...med, dosis: e.target.value.replace(/[^0-9.]/g, "") })} inputMode="decimal" style={{ ...inp, textAlign: "center" }} />
                    <select value={med.forma} onChange={e => setMed({ ...med, forma: e.target.value })} style={inp}>{["comprimido","cápsula","ml","gota","aplicación","sobre","puff"].map(o => <option key={o}>{o}</option>)}</select>
                    <div style={{ textAlign: "center", fontFamily: T.sans, fontSize: 12, color: T.textMute }}>cada</div>
                    <div style={{ display: "flex", gap: 6 }}><input value={med.cada} onChange={e => setMed({ ...med, cada: e.target.value.replace(/\D/g, "") })} inputMode="numeric" style={{ ...inp, width: 60, textAlign: "center" }} /><select value={med.unidad} onChange={e => setMed({ ...med, unidad: e.target.value })} style={inp}>{["horas","días"].map(o => <option key={o}>{o}</option>)}</select></div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <select value={med.via} onChange={e => setMed({ ...med, via: e.target.value })} style={{ ...inp, flex: "0 0 150px" }}>{["Oral","Tópica","Subcutánea","Intramuscular","Sublingual","Oftálmica"].map(o => <option key={o}>{o}</option>)}</select>
                    <input value={med.indic} onChange={e => setMed({ ...med, indic: e.target.value })} placeholder="Indicaciones (ej: con comidas, por 5 días)" style={{ ...inp, flex: 1 }} />
                  </div>
                  <div><AdBtn T={T} small primary onClick={addMed}>+ Agregar a la receta</AdBtn></div>
                  <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textFaint }}>Vademécum de medicamentos genéricos. Al agregar, la línea se suma abajo con su posología.</div>
                </div>
              )}
            </div>
          )}
          <textarea style={{ ...inp, minHeight: 120, resize: "vertical" }} value={rp} onChange={e => setRp(e.target.value)} placeholder={tipo === "indicaciones" ? "Elige una plantilla arriba o escribe aquí…" : "Ej.\nParacetamol 500 mg — 1 comprimido cada 8 h por 3 días\nÁrnica tópica — aplicar 2 veces al día"} /></label>
        <label style={{ display: "block", marginTop: 13 }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Notas adicionales (opcional)</span>
          <textarea style={{ ...inp, minHeight: 60, resize: "vertical" }} value={ind} onChange={e => setInd(e.target.value)} placeholder="Reposo relativo, control en 7 días…" /></label>
        {tipo === "indicaciones" && (
          <label style={{ display: "block", marginTop: 13 }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Fecha de control (opcional)</span>
            <input type="date" style={{ ...inp, maxWidth: 260 }} value={ctrl} onChange={e => setCtrl(e.target.value)} />
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 10.5, color: T.textFaint, marginTop: 5 }}>Si la indicas, aparece en la sección "Control de evaluación" del documento.</span>
          </label>
        )}
        {(() => { try { var ms = window.DB.get("medic_sigs"); if (!ms || ms.length < 2) return null; return (
          <label style={{ display: "block", marginTop: 14 }}>
            <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Firma del médico en este documento</span>
            <select value={sigMedId} onChange={e => setSigMedId(e.target.value)} style={{ ...inp, cursor: "pointer" }}>
              {ms.map(function(s) { return <option key={s.id} value={s.id}>{s.name}</option>; })}
              <option value="none">Sin firma del médico</option>
            </select>
          </label>
        ); } catch (_) { return null; } })()}
        <div style={{ marginTop: 16, textAlign: "right" }}><AdBtn T={T} primary onClick={guardar}>Guardar {tipo === "indicaciones" ? "indicaciones" : "receta"}</AdBtn></div>
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>Documentos del paciente ({recetas.length})</div>
      {recetas.length === 0 && <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint }}>Aún no hay documentos. Crea el primero arriba.</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {recetas.map(r => (
          <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, background: T.surface, border: "1px solid " + T.line, borderRadius: 10, padding: "12px 14px" }}>
            <div onClick={() => setPreview(r)} title="Ver indicaciones" style={{ flex: 1, minWidth: 0, cursor: "pointer" }}>
              <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.accent }}>{titleOf(r.tipo)}{r.diag ? " · " + r.diag : ""}</div>
              <div style={{ fontFamily: T.sans, fontSize: 11, color: T.textMute, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.fecha} · {r.rp.split("\n")[0]}</div>
            </div>
            <AdBtn T={T} small onClick={() => imprimir(r)}>Imprimir</AdBtn>
            <button onClick={() => imprimir(r, true)} title="Guardar el documento en una carpeta que elijas" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.textMute, background: "none", border: "1px solid " + T.line, borderRadius: 7, padding: "8px 11px", cursor: "pointer" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>Guardar</button>
            <button onClick={() => enviarWa(r)} title="Enviar por WhatsApp" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#1F8A5B", background: "none", border: "1px solid #1F8A5B", borderRadius: 7, padding: "8px 11px", cursor: "pointer" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></svg>WhatsApp</button>
            <button onClick={() => updatePatient(patient.id, { recetas: recetas.filter(x => x.id !== r.id) })} title="Eliminar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 2 }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
          </div>
        ))}
      </div>
      {/* Popup de visualización del documento (sin imprimir) */}
      {preview && (
        <AdModal T={T} title={titleOf(preview.tipo)} onClose={() => setPreview(null)} footer={
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <AdBtn T={T} onClick={() => imprimir(preview)}>Imprimir</AdBtn>
            <AdBtn T={T} onClick={() => imprimir(preview, true)}>Guardar en carpeta</AdBtn>
            <AdBtn T={T} primary onClick={() => enviarWa(preview)}>WhatsApp</AdBtn>
          </div>}>
          <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.textMute, marginBottom: 14 }}>{preview.fecha} · {patient.name}{patient.age ? " · " + patient.age + " años" : ""}</div>
          {preview.diag && <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 }}>Diagnóstico</div>
            <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.text }}>{preview.diag}</div>
          </div>}
          <div style={{ marginBottom: preview.ind ? 14 : 0 }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 }}>{preview.tipo === "indicaciones" ? "Indicaciones / cuidados" : "Rp. (medicamentos)"}</div>
            <div style={{ fontFamily: T.sans, fontSize: 14, color: T.text, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{preview.rp}</div>
          </div>
          {preview.ind && <div>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 }}>Notas adicionales</div>
            <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.text, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{preview.ind}</div>
          </div>}
          {preview.ctrl && <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 }}>Control de evaluación</div>
            <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.text, textTransform: "capitalize" }}>{fmtCtrl(preview.ctrl)}</div>
          </div>}
        </AdModal>
      )}
    </div>
  );
}

Object.assign(window, { initials, Avatar, AdBtn, AdField, AdModal, AdTag, PacientesView, NewPatientModal, FichaMedica, NotasTab, NewEntryModal, ConsentView, SignConsentModal, ConsentTab, RecetaTab, ImagenesTab, FacturacionTab, CampanaTab, AuditoriaIA, ResumenIA, recitaFor, recitaDue, recitaMsg, recitaWa });
