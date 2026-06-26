/* ═══════════ JC · PANEL · PACIENTES / FICHA / CONSENTIMIENTOS ═══════════ */

function initials(n) { return n.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase(); }

/* ═══════════ DOCUMENTOS IMPRESOS · diseño editorial multi-clínica ═══════════
   El logo, el profesional, la clínica y la marca de agua se toman de la clínica
   ACTIVA (no hay nada fijo a JC Medical): cada clínica imprime con lo suyo. */
function jcmDocEsc(s) { return ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function jcmDocBrand(proNameOverride) {
  const D = window.JCDATA || {};
  const proName = proNameOverride || (window.clinicPro && window.clinicPro()) || (D.contact && D.contact.pro) || "";
  const clinName = (window.clinicName && window.clinicName()) || D.brand || "Medique";
  const clinAddr = (window.clinicAddr && window.clinicAddr()) || (D.contact && D.contact.address) || "";
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
  + ".docfooter{margin-top:14px;padding-top:11px;border-top:1px solid rgba(18,26,38,.14);display:flex;align-items:center;justify-content:space-between;gap:16px;position:relative;z-index:1}.docfooter .f-l,.docfooter .f-r{font-family:'Jost',sans-serif;font-weight:300;font-size:8.5px;letter-spacing:.09em;color:#8B9197}.docfooter .f-r{text-transform:uppercase;letter-spacing:.20em}.docfooter .f-l .fdate{color:#646A72}";
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
function jcmSignFoot(b, proName, docLabel, patientName, fechaLarga) {
  const e = jcmDocEsc;
  const stamp = b.markUrl ? "<img class='mark' src='" + b.markUrl + "' alt=''>" : "<div class='mono'>" + e(b.wm) + "</div>";
  return "<div class='signature'><div class='sign-block'><div class='sign-line'></div><div class='sign-name'>" + e(proName || b.clinName) + "</div>"
    + "<div class='sign-role'>" + e(b.proRole) + "</div></div><div class='sign-stamp'>" + stamp + "</div></div>"
    + "<footer class='docfooter'><span class='f-l'>" + e(docLabel) + " · " + e(patientName) + " · Emitida <span class='fdate'>" + e(fechaLarga) + "</span></span><span class='f-r'>" + e(b.handle || b.clinName) + "</span></footer>";
}
// Envuelve el cuerpo en una hoja A4 completa y lo manda a imprimir.
function jcmPrintDoc(title, b, inner) {
  const e = jcmDocEsc;
  const html = "<!doctype html><html><head><meta charset='utf-8'><title>" + e(title) + "</title>"
    + "<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>"
    + "<link href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap' rel='stylesheet'>"
    + "<style>" + JCM_DOC_CSS + "</style></head><body><div class='sheet'><div class='wm'>" + e(b.wm) + "</div>" + inner + "</div></body></html>";
  if (window.jcmPrintHTML) window.jcmPrintHTML(html);
  else { const w = window.open("", "_blank"); if (w) { w.document.write(html + "<script>window.print()<\/script>"); w.document.close(); } }
}

function Avatar({ T, name, src, size }) {
  const s = size || 40;
  if (src) return <img src={src} alt={name} style={{ width: s, height: s, borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", flexShrink: 0 }} />;
  return <div style={{ width: s, height: s, borderRadius: "50%", background: T.surface2, border: "1px solid " + T.line, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.serif, fontSize: s * 0.4, color: T.accent, flexShrink: 0 }}>{initials(name)}</div>;
}

function AdBtn({ T, children, onClick, primary, full, small }) {
  return <button onClick={onClick} style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: full ? "100%" : "auto",
    fontFamily: T.sans, fontSize: small ? 10.5 : 11, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase",
    padding: small ? "9px 14px" : "13px 20px", borderRadius: 4, cursor: "pointer",
    background: primary ? T.primaryBg : "transparent", color: primary ? T.primaryText : T.text, border: primary ? "none" : "1px solid " + T.chipBorder
  }}>{children}</button>;
}

function AdField({ T, label, value, onChange, placeholder, inputMode }) {
  const nocap = inputMode === "email" || inputMode === "url";
  return <label style={{ display: "block" }}>
    <span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>{label}</span>
    <input value={value} inputMode={inputMode} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      data-nocap={nocap ? "" : undefined}
      style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }} />
  </label>;
}

function AdModal({ T, title, onClose, children, footer, wide, huge }) {
  // El popup SIEMPRE queda entre la barra superior (≈66px) y el borde inferior, con
  // márgenes de seguridad (incluida el área segura de iOS). maxHeight:100% del área
  // disponible → el contenido largo (p. ej. "Nuevo procedimiento") hace scroll interno
  // sin salirse de pantalla ni quedar cortado.
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(4px)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box", paddingTop: "calc(66px + env(safe-area-inset-top,0px))", paddingBottom: "calc(20px + env(safe-area-inset-bottom,0px))", paddingLeft: huge ? 12 : 16, paddingRight: huge ? 12 : 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: huge ? "97vw" : "100%", maxWidth: huge ? 1180 : (wide ? 720 : 460), maxHeight: "100%", background: T.bg, borderRadius: 16, border: "1px solid " + T.line, display: "flex", flexDirection: "column", animation: "jcSlideUp .3s " + T.ease, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid " + T.line }}>
          <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 300, color: T.text }}>{title}</div>
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
function patConsents(p) {
  if (!p) return [];
  try { const v = window.DB && window.DB.get(patConsKey(p.id)); if (Array.isArray(v)) return v; } catch (e) {}
  return p.consents || (p.consentDoc ? [p.consentDoc] : []);
}

function AdTag({ T, tone, children }) {
  const c = { ok: "#1F8A5B", warn: T.gold, danger: "#C0285A", muted: T.textFaint }[tone] || T.accent;
  return <span style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: c, border: "1px solid " + c, borderRadius: 999, padding: "4px 9px", whiteSpace: "nowrap" }}>{children}</span>;
}

/* ─────────── PACIENTES ─────────── */
// Reglas de re-cita: SOLO para esquemas de tratamiento en curso.
//   · Toxina botulínica → refuerzo a los 3 meses.
//   · Sculptra → siguiente dosis a los 2 meses, hasta completar el esquema de 3 sesiones.
// No aplica a pacientes nuevos cuyo recordatorio recién será en algunos meses.
function recitaFor(p) {
  const tag = ((p.tags && p.tags[0]) || "").toLowerCase();
  const lv = p.lastVisit ? new Date(p.lastVisit + "T00:00:00") : null;
  if (!lv || isNaN(lv)) return null;
  const meses = (Date.now() - lv.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  const fmtP = n => "$" + (n || 0).toLocaleString("es-CL");
  // Nº de sesiones ya realizadas de esa familia (para el esquema de Sculptra).
  const hist = p.history || [];
  let umbral, motivo, msg, precio, fam;
  if (/botox|toxina|bruxismo|hiperhidro|gingival|nefertiti|empedrado/.test(tag)) {
    fam = "toxina"; umbral = 3; precio = 150000;
    motivo = "Toxina · refuerzo a 3 meses";
    msg = "ya es momento de renovar tu toxina botulínica para mantener tu resultado natural";
  } else if (/sculptra|bioestim|colágeno|colageno/.test(tag)) {
    fam = "sculptra"; umbral = 2; precio = 280000;
    const ses = hist.filter(h => /sculptra|bioestim|colágeno|colageno/i.test(h.proc || "")).length || 1;
    if (ses >= 3) return null; // esquema de 3 sesiones completo
    motivo = "Sculptra · sesión " + (ses + 1) + " de 3 (a 2 meses)";
    msg = "tu siguiente sesión de Sculptra potencia y prolonga tu colágeno (vas en la sesión " + (ses + 1) + " de 3)";
  } else return null;
  const desc = Math.round(precio * 0.9 / 1000) * 1000; // 10% pero comunicado en pesos
  const due = new Date(lv.getTime() + umbral * 30.44 * 24 * 60 * 60 * 1000);
  return { fam, motivo, msg, due, vence: meses >= umbral, precio, desc, precioFmt: fmtP(precio), descFmt: fmtP(desc) };
}
// Lista de pacientes cuyo plazo de re-cita ya se cumplió (para notificaciones / pendientes).
function recitaDue(patients) { return (patients || []).map(p => ({ p, r: recitaFor(p) })).filter(x => x.r && x.r.vence); }
// Mensaje de WhatsApp que muestra el precio real y luego el precio preferente (en pesos, no en %).
function recitaMsg(p, r) {
  const first = (p.name || "").split(" ")[0] || "";
  return "Hola " + first + ", te saludamos de " + ((window.clinicName && window.clinicName()) || "tu clínica") + ". " + (r.msg.charAt(0).toUpperCase() + r.msg.slice(1)) +
    ". El valor actual es de " + r.precioFmt + " y, por ser parte de la clínica, te lo dejamos en " + r.descFmt + ". ¿Te agendamos tu hora?";
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
  const chip = (k, l, set, cur) => <button onClick={() => set(k)} style={{ fontFamily: T.sans, fontSize: 11, padding: "7px 12px", borderRadius: 999, cursor: "pointer", border: "1px solid " + (cur === k ? T.accent : T.line), background: cur === k ? T.surface2 : T.surface, color: cur === k ? T.text : T.textMute }}>{l}</button>;
  return (
    <div style={{ padding: "4px 0 20px" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textFaint} strokeWidth="1.6" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nombre o RUT…" style={{ width: "100%", padding: "12px 14px 12px 38px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }} />
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
          <button key={p.id} onClick={() => openPatient(p.id)} style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left", padding: "14px 6px", cursor: "pointer", background: "none", border: "none", borderBottom: "1px solid " + T.lineSoft }}>
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
  const [editD, setEditD] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [delInput, setDelInput] = useState("");
  const points = patient.points || [];
  const TABS = [["fichaclinica", "Ficha Clínica"], ["mapa", "Mapa facial y antropometría"], ["procedimientos", "Procedimientos"], ["imagenes", "Imágenes"], ["consent", "Consentimientos"], ["receta", "Receta / Indicaciones"], ["facturacion", "Atenciones"], ["campana", "Campaña"], ["notas", "Notas"], ["resumen", "Resumen IA"], ["auditoria", "Auditoría IA"]];
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

  return (
    <div style={{ padding: "4px 0 24px" }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", color: T.textMute, fontFamily: T.sans, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14, padding: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>Pacientes
      </button>

      {/* header paciente */}
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <Avatar T={T} name={patient.name} size={52} />
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 300, color: T.text, lineHeight: 1 }}>{patient.name}</span>
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
          <FAct T={T} onClick={() => setEditD(true)} icon={<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></>}>Editar datos</FAct>
          <FAct T={T} onClick={imprimirFicha} icon={<><path d="M6 9V2h12v7" /><rect x="6" y="13" width="12" height="8" /><path d="M6 17H3v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5h-3" /></>}>Imprimir ficha</FAct>
          <FAct T={T} primary onClick={() => onAgendar && onAgendar()} icon={<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>}>Agendar cita</FAct>
          {removePatient && <FAct T={T} onClick={() => { setConfirmDel(true); setDelInput(""); }} icon={<><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></>}>Eliminar</FAct>}
        </div>
      </div>

      {/* tarjetas de datos — Teléfono y Email son clickeables para editar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, margin: "16px 0 4px" }}>
        {[["Edad", (patient.age ? patient.age + " años" : "—"), true], ["Teléfono", patient.phone || "—", true], ["Email", patient.email || "—", true], ["Estado", estado, false]].map(([l, v, editable]) => (
          <div key={l} onClick={editable ? () => setEditD(true) : undefined} title={editable ? "Haz clic para editar" : undefined}
            style={{ background: T.surface, border: "1px solid " + (editable ? T.line : T.line), borderRadius: 10, padding: "12px 14px", minWidth: 0, cursor: editable ? "pointer" : "default", transition: "border-color .15s" }}
            onMouseEnter={editable ? e => e.currentTarget.style.borderColor = T.accent : undefined}
            onMouseLeave={editable ? e => e.currentTarget.style.borderColor = T.line : undefined}>
            <div style={{ fontFamily: T.sans, fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 5, display: "flex", alignItems: "center", gap: 4 }}>
              {l}
              {editable && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>}
            </div>
            <div style={{ fontFamily: T.sans, fontSize: 13, color: editable ? T.accent : T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* barra de pestañas horizontal */}
      <div className="jc-scroll" style={{ display: "flex", gap: 4, overflowX: "auto", borderBottom: "1px solid " + T.line, margin: "14px 0 18px" }}>
        {TABS.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 14px", background: "none", border: "none", borderBottom: "2px solid " + (tab === k ? T.accent : "transparent"), cursor: "pointer", fontFamily: T.sans, fontSize: 12.5, fontWeight: tab === k ? 600 : 400, color: tab === k ? T.text : T.textMute, whiteSpace: "nowrap" }}>
            {(k === "resumen" || k === "auditoria") && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={tab === k ? T.accent : T.textMute} strokeWidth="1.6"><rect x="4.5" y="8" width="15" height="10" rx="3" /><path d="M12 4.5V8" /><circle cx="12" cy="3.4" r="1.3" /></svg>}
            {l}
          </button>
        ))}
      </div>

      {/* contenido */}
      <div style={{ minWidth: 0 }}>

      {tab === "resumen" && <ResumenIA T={T} patient={patient} />}
      {tab === "auditoria" && <AuditoriaIA T={T} patient={patient} go={setTab} />}
      {tab === "mapa" && (
        <div>
          <FaceMap T={T} value={points} onChange={savePoints} patient={patient} updatePatient={updatePatient} readOnly={true} />
        </div>
      )}
      {tab === "fichaclinica" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
            {[["Notas internas", patient.notes, "#C9A227"], ["Alergias", (window.clinVal ? window.clinVal(patient.clinica || {}, "alergias") : (patient.clinica || {}).alergias), "#1F8A5B"], ["Antecedentes", (window.clinVal ? window.clinVal(patient.clinica || {}, "morbidos") : (patient.clinica || {}).morbidos), T.accent]].map(([l, v, c]) => (
              <div key={l} style={{ background: T.surface, border: "1px solid " + T.line, borderLeft: "3px solid " + c, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: T.textMute, marginBottom: 5 }}>{l}</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: v ? T.text : T.textFaint, lineHeight: 1.5 }}>{v || "Sin registros."}</div>
              </div>
            ))}
          </div>
          <FichaClinicaForm T={T} patient={patient} updatePatient={updatePatient} />
        </div>
      )}
      {tab === "imagenes" && <ImagenesTab T={T} patient={patient} updatePatient={updatePatient} />}
      {tab === "consent" && <ConsentTab T={T} patient={patient} updatePatient={updatePatient} />}
      {tab === "receta" && <RecetaTab T={T} patient={patient} updatePatient={updatePatient} />}
      {tab === "facturacion" && <FacturacionTab T={T} patient={patient} updatePatient={updatePatient} />}
      {tab === "campana" && <CampanaTab T={T} patient={patient} updatePatient={updatePatient} />}

      {tab === "procedimientos" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Historial clínico</div>
            <AdBtn T={T} small primary onClick={() => { setEditIdx(null); setViewMode(false); setNewEntry(true); }}>+ Sesión</AdBtn>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {(patient.history || []).map((h, i) => {
              const meta = [h.lote && ("Lote " + h.lote), h.venc && ("Vence " + h.venc), h.temp && ("Temp. " + h.temp), h.dilucion && ("Dilución " + h.dilucion)].filter(Boolean);
              return (
              <div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid " + T.lineSoft }}>
                <div style={{ flexShrink: 0, width: 66, fontFamily: T.sans, fontSize: 11, color: T.accent }}>{h.date}</div>
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
              try { window.cashAdd({ type: "ingreso", kind: "atencion", amount: e.cobro, method: e.metodo || "Efectivo", concept: (e.proc || "Atención").trim() + " · " + (patient.name || ""), patient: patient.name }); } catch (e3) {}
            }
            try { window.jcmToast && window.jcmToast(editing ? "Sesión actualizada." : ((e.cobro || 0) > 0 ? "Sesión registrada · " + (window.JCDATA ? window.JCDATA.fmt(e.cobro) : "$" + e.cobro) + " a Caja." : "Sesión registrada."), "ok"); } catch (e2) {}
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
  if (/botox|toxina|botulín|botul/i.test(p)) return "botox";
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
          const nuevo = { kind: r.tpl.kind, title: r.tpl.title, proc: r.tpl.proc, proc4: r.tpl.proc4, vascular: r.tpl.vascular, ...r.fields, sigPac: r.sigPac, sigPro: r.sigPro, ts: Date.now() };
          const lista = patConsents(p).slice(); lista.unshift(nuevo);
          try { window.DB.set(patConsKey(p.id), lista); } catch (e) {}
          updatePatient(p.id, { consent: true, consentInfo: r.tpl.title + " · " + r.fields.fecha, consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
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
    const renderT = t => { const parts = t.split("{EU}"); if (parts.length === 1) return t; return parts.reduce((a, p, i) => i < parts.length - 1 ? [...a, p, <b key={i}>{EU}</b>] : [...a, p], []); };
    return <div>{(tpl.paragraphs || []).map((p, i) => <P key={i} n={p.n}>{renderT(p.t)}</P>)}</div>;
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
        {A.consents.map(c => <button key={c.id} onClick={() => setTpl(c)} style={{ fontFamily: T.sans, fontSize: 10.5, letterSpacing: ".06em", padding: "8px 12px", borderRadius: 999, cursor: "pointer", background: tpl.id === c.id ? T.surface2 : T.surface, color: tpl.id === c.id ? T.text : T.textMute, border: "1px solid " + (tpl.id === c.id ? T.accent : T.line) }}>{c.title}</button>)}
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
  const A = window.JCADMIN;
  // Consentimientos en su propia clave (pcons_<id>) → suben a la nube y se ven en todos lados.
  const consKey = patConsKey(patient.id);
  const [consents, setConsentsState] = useState(() => patConsents(patient));
  useEffect(() => {
    setConsentsState(patConsents(patient));
    // Migración del modelo antiguo (consentimientos dentro del paciente) → su clave propia.
    try {
      const legacy = patient.consents || (patient.consentDoc ? [patient.consentDoc] : []);
      const own = window.DB && window.DB.get(consKey);
      if (legacy.length && !Array.isArray(own)) {
        window.DB.set(consKey, legacy);
        if (Array.isArray(window.DB.get(consKey))) updatePatient(patient.id, { consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
      }
    } catch (e) {}
  }, [patient.id]);
  function commitConsents(next) { try { window.DB.set(consKey, next); } catch (e) {} setConsentsState(next); }
  const printRef = useRef(null);
  function start(t) { setTpl0(t); setSigning(true); }

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
    const esc = s => ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const EU = esc(doc.prof || "____________________");
    const p = (n, text) => "<p style='margin:0 0 11px;font-size:12px;line-height:1.6'>" + (n ? "<b>" + n + "</b> " : "") + text + "</p>";
    let body = "";
    if (doc.kind === "extra") {
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
    const html = "<!doctype html><html><head><meta charset='utf-8'><title>Consentimiento · " + esc(patient.name || "") + "</title>" +
      "<style>@page{size:letter;margin:1.8cm}body{font-family:-apple-system,'Segoe UI',Arial,sans-serif;color:#111;margin:0;padding:20px}.sigs{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px}.sig-label{font-size:12px;color:#444;margin-bottom:6px}.sig-box{height:150px;border:1px solid #ddd;border-radius:6px;display:flex;align-items:center;justify-content:center;background:#fff}.sig-box img{max-height:142px;max-width:96%}</style>" +
      "</head><body>" +
      "<div style='text-align:right;font-size:11px;color:#666'>Fecha: " + esc(doc.fecha || "") + "</div>" +
      "<h2 style='text-align:center;font-family:Georgia,serif;font-weight:400;font-size:20px;color:#111;margin:2px 0 14px'>Consentimiento informado</h2>" +
      "<div style='font-size:12px;margin-bottom:6px'>Yo <b>" + esc(doc.nombre || "") + "</b></div>" +
      "<div style='font-size:12px;margin-bottom:16px'>Identificado con CI N° <b>" + esc(doc.ci || "") + "</b> · Edad <b>" + esc(doc.edad || "") + "</b></div>" +
      body +
      "<div class='sigs'>" +
        "<div><div class='sig-label'>Firma paciente</div><div class='sig-box'>" + (doc.sigPac ? "<img src='" + doc.sigPac + "'/>" : "") + "</div></div>" +
        "<div><div class='sig-label'>Firma profesional · " + esc(doc.prof || "") + "</div><div class='sig-box'>" + (doc.sigPro ? "<img src='" + doc.sigPro + "'/>" : "") + "</div></div>" +
      "</div></body></html>";
    if (openOnly) {
      // Solo ABRIR el consentimiento en una pestaña nueva (sin lanzar el diálogo de impresión).
      const w = window.open("", "_blank"); if (w) { w.document.open(); w.document.write(html); w.document.close(); }
      return;
    }
    if (window.jcmPrintHTML) window.jcmPrintHTML(html);
    else { const w = window.open("", "_blank"); if (w) { w.document.write(html + "<script>window.print()<\/script>"); w.document.close(); } }
  }

  return (
    <div>
      {/* Crear consentimiento (4 plantillas, incl. extraordinario) */}
      <div style={{ fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 8 }}>Crear consentimiento</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {A.consents.map(c => <AdBtn key={c.id} T={T} small primary onClick={() => start(c)}>{c.title}</AdBtn>)}
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
        <AdModal T={T} title={openDoc.title || "Consentimiento"} onClose={() => setOpenDoc(null)} wide footer={<div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}><AdBtn T={T} onClick={() => setOpenDoc(null)}>Cerrar</AdBtn><AdBtn T={T} primary onClick={imprimirConsent}>Imprimir</AdBtn></div>}>
          <div ref={printRef} style={{ background: "#fff", border: "1px solid " + T.line, borderRadius: 8, padding: "22px 24px" }}>
            <div style={{ textAlign: "right", fontFamily: T.sans, fontSize: 11, color: "#444" }}>Fecha: {openDoc.fecha}</div>
            <h2 style={{ textAlign: "center", fontFamily: T.serif, fontWeight: 400, fontSize: 20, color: "#111", margin: "2px 0 14px" }}>Consentimiento informado</h2>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: "#111", marginBottom: 6 }}>Yo <b>{openDoc.nombre}</b></div>
            <div style={{ fontFamily: T.sans, fontSize: 12, color: "#111", marginBottom: 14 }}>Identificado con CI N° <b>{openDoc.ci}</b> · Edad <b>{openDoc.edad}</b></div>
            <ConsentDocDark T={T} tpl={openDoc} prof={openDoc.prof} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <div><div style={{ fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 }}>Firma paciente</div>{openDoc.sigPac && <img src={openDoc.sigPac} alt="firma paciente" style={{ height: 60, background: "#fff", border: "1px solid #ddd", borderRadius: 6 }} />}</div>
              <div><div style={{ fontFamily: T.sans, fontSize: 11, color: "#444", marginBottom: 4 }}>Firma profesional · {openDoc.prof}</div>{openDoc.sigPro && <img src={openDoc.sigPro} alt="firma profesional" style={{ height: 60, background: "#fff", border: "1px solid #ddd", borderRadius: 6 }} />}</div>
            </div>
          </div>
        </AdModal>
      )}

      {signing && <SignConsentModal T={T} data={{ patient: patient, template: tpl0 || A.consents[0] }} onClose={() => setSigning(false)} onSign={(r) => {
        const nuevo = { kind: r.tpl.kind, title: r.tpl.title, cat: r.tpl.cat, proc: r.tpl.proc, proc4: r.tpl.proc4, vascular: r.tpl.vascular, body: r.tpl.body, ...r.fields, sigPac: r.sigPac, sigPro: r.sigPro, ts: Date.now() };
        const lista = patConsents(patient).slice();
        lista.unshift(nuevo);
        commitConsents(lista); // guarda el consentimiento en su propia clave (sube a la nube)
        // En el paciente solo queda la marca liviana (sin firmas) para que el documento sea pequeño.
        updatePatient(patient.id, { consent: true, consentInfo: r.tpl.title + " · " + r.fields.fecha, consents: null, consentDoc: null, consentSig: null, consentSigPro: null });
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
      const max = 900; let { width: w, height: h } = img;
      if (w > max || h > max) { const r = Math.min(max / w, max / h); w = Math.round(w * r); h = Math.round(h * r); }
      const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(img, 0, 0, w, h);
      cb(cv.toDataURL("image/jpeg", 0.82));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
const IMG_PROCS = ["Botox", "Rinomodelación", "Sculptra", "Radiesse", "Mesoterapia", "Limpieza facial", "Evaluación inicial", "Antes / después", "Otro"];
function ImagenesTab({ T, patient, updatePatient }) {
  const imgKey = patImgKey(patient.id);
  const [imgs, setImgsState] = useState(() => patImages(patient));
  const [adding, setAdding] = useState(false);
  const [proc, setProc] = useState(IMG_PROCS[0]);
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

  function resetForm() { setAdding(false); setSrc(null); setProc(IMG_PROCS[0]); setFecha(new Date().toISOString().slice(0, 10)); }

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
                <select value={proc} onChange={e => setProc(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 6, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13, outline: "none" }}>{IMG_PROCS.map(p => <option key={p}>{p}</option>)}</select>
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
        <div onClick={() => setViewer(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(8,8,6,.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px", boxSizing: "border-box" }}>
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
function FacturacionTab({ T, patient, updatePatient }) {
  const D = window.JCDATA;
  const [editAt, setEditAt] = useState(null); // { idx: -1 (nuevo) | n, item: {...} }
  const [delIdx, setDelIdx] = useState(null);
  const metodos = ["Transferencia", "Efectivo", "Tarjeta débito", "Tarjeta crédito", "Otro"];

  const items = patient.billing || [];
  const total = items.reduce((s, i) => s + (i.amount || 0), 0);
  const pagado = items.filter(i => i.paid).reduce((s, i) => s + (i.amount || 0), 0);
  const saldo = total - pagado;

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
  function deleteAt(idx) {
    updatePatient(patient.id, { billing: items.filter((_, i) => i !== idx) });
    setDelIdx(null);
  }
  function setF(k, v) { setEditAt(prev => ({ ...prev, item: { ...prev.item, [k]: v } })); }

  const iconEdit = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>;
  const iconDel = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent }}>Atenciones y pagos</div>
        <AdBtn T={T} small primary onClick={addNew}>+ Atención</AdBtn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
        <AdStat T={T} n={D.fmt(total)} l="Total" />
        <AdStat T={T} n={D.fmt(pagado)} l="Pagado" />
        <AdStat T={T} n={D.fmt(saldo)} l="Saldo" accent={saldo > 0} />
      </div>
      {items.length === 0 && (
        <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textFaint, textAlign: "center", padding: "24px 0" }}>
          No hay atenciones registradas. Presiona "+ Atención" para agregar una.
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((b, idx) => (
          <div key={b.id || idx} style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 4px", borderBottom: "1px solid " + T.lineSoft }}>
            <div style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => setEditAt({ idx, item: { ...b } })}>
              <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.text }}>{b.concept || "Sin descripción"}</div>
              <div style={{ fontFamily: T.sans, fontSize: 10.5, color: T.textMute, marginTop: 2 }}>{b.date}{b.metodo ? " · " + b.metodo : ""}</div>
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 15, color: T.text, flexShrink: 0 }}>{D.fmt(b.amount || 0)}</div>
            <AdTag T={T} tone={b.paid ? "ok" : "warn"}>{b.paid ? "Pagado" : "Pendiente"}</AdTag>
            <button onClick={() => setEditAt({ idx, item: { ...b } })} title="Editar" style={{ background: "none", border: "none", cursor: "pointer", padding: 5, color: T.textMute, flexShrink: 0 }}>{iconEdit}</button>
            <button onClick={() => setDelIdx(idx)} title="Eliminar" style={{ background: "none", border: "none", cursor: "pointer", padding: 5, color: T.textFaint, flexShrink: 0 }}>{iconDel}</button>
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

      {delIdx !== null && (
        <AdModal T={T} title="Eliminar atención" onClose={() => setDelIdx(null)}
          footer={<div style={{ display: "flex", gap: 10 }}><AdBtn T={T} onClick={() => setDelIdx(null)}>Cancelar</AdBtn><AdBtn T={T} primary onClick={() => deleteAt(delIdx)} style={{ background: "#b23535" }}>Eliminar</AdBtn></div>}>
          <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.text }}>
            ¿Eliminar <b>{items[delIdx] && (items[delIdx].concept || "esta atención")}</b>?
          </div>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.textMute, marginTop: 6 }}>
            {items[delIdx] && D.fmt(items[delIdx].amount || 0)} — Esta acción no se puede deshacer.
          </div>
        </AdModal>
      )}
    </div>
  );
}

/* ─────────── INFORMACIÓN DE CAMPAÑA ─────────── */
function CampanaTab({ T, patient, updatePatient }) {
  const c = patient.campaign || { origen: "organico", medio: "Instagram", campana: "", detalle: "" };
  function set(patch) { updatePatient(patient.id, { campaign: { ...c, ...patch } }); }
  const origenes = [["campana", "Llegó por campaña"], ["organico", "Orgánico"], ["referido", "Referido"]];
  const medios = ["Instagram", "Facebook / Meta Ads", "Google", "Recomendación", "WhatsApp", "Pasó por fuera", "Otro"];
  return (
    <div>
      <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 12 }}>Información de captación</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {origenes.map(([k, l]) => (
          <button key={k} onClick={() => set({ origen: k })} style={{ display: "flex", alignItems: "center", gap: 11, textAlign: "left", padding: "13px 14px", borderRadius: 8, cursor: "pointer", background: c.origen === k ? T.surface2 : T.surface, border: "1px solid " + (c.origen === k ? T.accent : T.line) }}>
            <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, border: "2px solid " + (c.origen === k ? T.accent : T.chipBorder), background: c.origen === k ? T.accent : "transparent" }} />
            <span style={{ fontFamily: T.sans, fontSize: 13.5, color: T.text }}>{l}</span>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <div><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 7 }}>Medio</span>
          <select value={c.medio} onChange={e => set({ medio: e.target.value })} style={{ width: "100%", padding: "12px 13px", borderRadius: 4, border: "1px solid " + T.line, background: T.surface, color: T.text, fontFamily: T.sans, fontSize: 13.5, outline: "none" }}>
            {medios.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        {c.origen === "campana" && <AdField T={T} label="Campaña específica" value={c.campana} onChange={v => set({ campana: v })} placeholder="Ej: Botox · invierno" />}
        <AdField T={T} label="Detalle / referente" value={c.detalle} onChange={v => set({ detalle: v })} placeholder="Ej: recomendada por María G." />
      </div>
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
      <div style={{ minHeight: 80, background: T.surface, border: "1px solid " + T.line, borderRadius: 8, padding: "16px", fontFamily: T.sans, fontSize: 13, color: summary ? T.text : T.textFaint, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
        {loading ? "Analizando historial del paciente…" : (summary || "Toca «Generar resumen» para que la IA redacte un resumen clínico de este paciente.")}
      </div>
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
function RecetaTab({ T, patient, updatePatient }) {
  const D = window.JCDATA;
  const hoy = new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
  // tipo: "receta" (médico / dentista) | "indicaciones" (enfermería)
  const [tipo, setTipo] = useState("receta");
  const [diag, setDiag] = useState("");
  const [rp, setRp] = useState("");
  const [ind, setInd] = useState("");
  const [preview, setPreview] = useState(null); // documento abierto en popup
  const recetas = patient.recetas || [];
  const titleOf = t => t === "indicaciones" ? "Indicaciones post tratamiento" : "Receta médica";
  const rpLabelOf = t => t === "indicaciones" ? "Indicaciones / cuidados" : "Rp. (medicamentos)";

  function guardar() {
    if (!rp.trim()) return;
    const r = { id: "rx" + Date.now(), tipo, fecha: hoy, diag: diag.trim(), rp: rp.trim(), ind: ind.trim() };
    updatePatient(patient.id, { recetas: [r, ...recetas] });
    setDiag(""); setRp(""); setInd("");
  }
  function imprimir(r) {
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
      + (isInd ? "<div class='control-note'><span class='cn-icon'>+</span><div><span class='cn-k'>Control de evaluación</span><span class='cn-v'>Agenda tu control para evaluar el resultado y realizar los ajustes que sean necesarios.</span></div></div>" : "")
      + "</div>"
      + jcmSignFoot(b, b.proName, titleOf(r.tipo), patient.name || "", hoy);
    jcmPrintDoc(titleOf(r.tipo) + " · " + e(patient.name || ""), b, inner);
  }
  function enviarWa(r) {
    const pro = (window.clinicPro && window.clinicPro()) || (D.contact && D.contact.pro) || "";
    const L = ["*" + titleOf(r.tipo) + " — " + ((window.clinicName && window.clinicName()) || D.brand || "Medique") + "*", r.fecha, "Paciente: " + (patient.name || "") + (patient.age ? " (" + patient.age + " años)" : "")];
    if (r.diag) L.push("Diagnóstico: " + r.diag);
    L.push((r.tipo === "indicaciones" ? "Indicaciones:" : "Rp.:"), r.rp);
    if (r.ind) L.push("Notas: " + r.ind);
    L.push("— " + pro);
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
          <textarea style={{ ...inp, minHeight: 120, resize: "vertical" }} value={rp} onChange={e => setRp(e.target.value)} placeholder={tipo === "indicaciones" ? "Elige una plantilla arriba o escribe aquí…" : "Ej.\nParacetamol 500 mg — 1 comprimido cada 8 h por 3 días\nÁrnica tópica — aplicar 2 veces al día"} /></label>
        <label style={{ display: "block", marginTop: 13 }}><span style={{ display: "block", fontFamily: T.sans, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: T.textMute, marginBottom: 6 }}>Notas adicionales (opcional)</span>
          <textarea style={{ ...inp, minHeight: 60, resize: "vertical" }} value={ind} onChange={e => setInd(e.target.value)} placeholder="Reposo relativo, control en 7 días…" /></label>
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
            <button onClick={() => enviarWa(r)} title="Enviar por WhatsApp" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: T.sans, fontSize: 10.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#1F8A5B", background: "none", border: "1px solid #1F8A5B", borderRadius: 7, padding: "8px 11px", cursor: "pointer" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1-5A8.5 8.5 0 1 1 21 11.5z" /></svg>WhatsApp</button>
            <button onClick={() => updatePatient(patient.id, { recetas: recetas.filter(x => x.id !== r.id) })} title="Eliminar" style={{ background: "none", border: "none", cursor: "pointer", color: T.textFaint, display: "flex", padding: 2 }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
          </div>
        ))}
      </div>
      {/* Popup de visualización del documento (sin imprimir) */}
      {preview && (
        <AdModal T={T} title={titleOf(preview.tipo)} onClose={() => setPreview(null)} footer={
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <AdBtn T={T} onClick={() => imprimir(preview)}>Imprimir</AdBtn>
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
        </AdModal>
      )}
    </div>
  );
}

Object.assign(window, { initials, Avatar, AdBtn, AdField, AdModal, AdTag, PacientesView, NewPatientModal, FichaMedica, NotasTab, NewEntryModal, ConsentView, SignConsentModal, ConsentTab, RecetaTab, ImagenesTab, FacturacionTab, CampanaTab, AuditoriaIA, ResumenIA, recitaFor, recitaDue, recitaMsg, recitaWa });
