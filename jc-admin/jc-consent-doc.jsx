// Cuerpo legal del CONSENTIMIENTO INFORMADO, en un archivo aparte porque lo comparten el panel de
// escritorio (JC_Admin) y el panel MÓVIL (JC_Mobile). Antes vivía dentro de jc-admin-b.jsx, que el
// móvil no carga: sacarlo aquí evita tener el texto médico-legal duplicado en dos bundles, que es
// exactamente el tipo de divergencia que no puede pasar en un documento que el paciente firma.
// Se compila a dist/jc-consent-doc.js y se carga ANTES que jc-admin-b.js / jc-mobile.js.

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
// El documento usa texto negro sobre fondo blanco (look de impresión).
function ConsentDocDark({ T, tpl, prof }) {
  const TT = { ...T, text: "#111", sans: T.sans };
  return <ConsentDoc T={TT} tpl={tpl} prof={prof} />;
}


/* ── El MISMO documento como HTML, para verlo/imprimirlo. Vive aquí y no en jc-admin-b.jsx
   porque el panel móvil también abre el consentimiento firmado. ── */
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

// Cuerpo legal del consentimiento (párrafos) según la plantilla firmada. Reutilizable por la impresión
// del consentimiento suelto y por la impresión combinada con la ficha.
function jcmConsentLegalBody(doc) {
  const esc = s => ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const EU = esc(doc.prof || "____________________");
  const p = (n, text) => "<p style='margin:0 0 11px;font-size:12px;line-height:1.6'>" + (n ? "<b>" + n + "</b> " : "") + text + "</p>";
  let body = "";
  if (doc.kind === "custom") {
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
  return body;
}

// Consentimiento como HTML embebible (estilos inline, sin CSS externo) para anexarlo a la ficha.
// Resuelve las firmas (recorte async). Los "subidos" imagen se incrustan; el PDF va como nota.
function jcmConsentInnerHTML(doc, patient) {
  const esc = s => ("" + (s == null ? "" : s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  if (doc && doc.kind === "upload") {
    if (doc.img && doc.fileType !== "pdf") return Promise.resolve("<div style='text-align:center'><img src='" + doc.img + "' style='max-width:100%;max-height:940px;object-fit:contain'/></div>");
    return Promise.resolve("<p style='font-size:12px;color:#444;line-height:1.6'>Consentimiento adjunto como archivo PDF (<b>" + esc(doc.title || "documento") + "</b>). Imprímelo por separado desde la pestaña Consentimientos.</p>");
  }
  const body = jcmConsentLegalBody(doc);
  // C-05: usa el médico CONGELADO en el consentimiento (doc.medico); medic_sigs[0] solo como
  // respaldo para consentimientos antiguos firmados antes de congelarlo.
  var medicoSig = (doc && doc.medico) || null;
  if (!medicoSig) { try { var msList = window.DB.get("medic_sigs"); if (msList && msList.length) medicoSig = msList[0]; } catch (_) {} }
  return Promise.all([cropSignatureDataUrl(doc.sigPac), cropSignatureDataUrl(doc.sigPro)]).then(function (crops) {
    const sp = crops[0], spr = crops[1];
    const numCols = medicoSig ? 3 : 2;
    const sigH = medicoSig ? 130 : 175;
    const cell = (label, img) => "<div><div style='font-size:12px;color:#444;margin-bottom:6px'>" + label + "</div><div style='height:" + sigH + "px;border:1px solid #ddd;border-radius:6px;display:flex;align-items:center;justify-content:center;background:#fff;padding:10px'>" + (img ? "<img src='" + img + "' style='max-height:100%;max-width:100%;object-fit:contain'/>" : "") + "</div></div>";
    return "<div style='color:#111'>"
      + "<div style='text-align:right;font-size:11px;color:#666'>Fecha: " + esc(doc.fecha || "") + "</div>"
      + "<div style='font-size:12px;margin-bottom:6px'>Yo <b>" + esc(doc.nombre || (patient && patient.name) || "") + "</b></div>"
      + "<div style='font-size:12px;margin-bottom:16px'>Identificado con CI N° <b>" + esc(doc.ci || (patient && patient.rut) || "") + "</b> · Edad <b>" + esc(doc.edad || (patient && patient.age) || "") + "</b></div>"
      + body
      + "<div style='display:grid;grid-template-columns:repeat(" + numCols + ",1fr);gap:18px;margin-top:22px'>"
      + cell("Firma paciente", sp)
      + cell("Firma profesional · " + esc(doc.prof || ""), spr)
      + (medicoSig ? cell("Médico responsable · " + esc(medicoSig.name) + (medicoSig.rut ? " · RUT " + esc(medicoSig.rut) : "") + (medicoSig.registro ? " · Reg. " + esc(medicoSig.registro) : ""), medicoSig.sig) : "")
      + "</div></div>";
  });
}

if (typeof window !== "undefined") Object.assign(window, { CONSENT_EXCL, ConsentDoc, ConsentDocDark, cropSignatureDataUrl, jcmConsentLegalBody, jcmConsentInnerHTML });
