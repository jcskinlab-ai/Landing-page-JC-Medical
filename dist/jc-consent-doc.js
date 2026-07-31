const CONSENT_EXCL = [
  "Si estoy embarazada o en per\xEDodo de lactancia materna (S\xF3lo mujeres).",
  "Si tengo historial de enfermedades autoinmunes (Artritis Reumatoide, psoriasis, fiebre reum\xE1tica, lupus eritematoso sist\xE9mico u otras). Si estoy recibiendo tratamiento de inmunoterapia.",
  "Si tengo antecedente de cicatrizaci\xF3n queloide o hipertr\xF3fica, problemas de acn\xE9 o ros\xE1cea o cualquier infecci\xF3n en la zona a tratar.",
  "Diabetes no controlada u otra enfermedad metab\xF3lica no controlada.",
  "Discrasias sangu\xEDneas o alteraciones de la coagulaci\xF3n (anemia aguda, leucemia, porfiria, protrombinemia u otras).",
  "Si previamente me somet\xED a procedimientos con biopol\xEDmeros, puesto que puede desencadenar reacciones inflamatorias e infecciosas."
];
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
function ConsentDocDark({ T, tpl, prof }) {
  const TT = { ...T, text: "#111", sans: T.sans };
  return /* @__PURE__ */ React.createElement(ConsentDoc, { T: TT, tpl, prof });
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
  var medicoSig = doc && doc.medico || null;
  if (!medicoSig) {
    try {
      var msList = window.DB.get("medic_sigs");
      if (msList && msList.length) medicoSig = msList[0];
    } catch (_) {
    }
  }
  return Promise.all([cropSignatureDataUrl(doc.sigPac), cropSignatureDataUrl(doc.sigPro)]).then(function(crops) {
    const sp = crops[0], spr = crops[1];
    const numCols = medicoSig ? 3 : 2;
    const sigH = medicoSig ? 130 : 175;
    const cell = (label, img) => "<div><div style='font-size:12px;color:#444;margin-bottom:6px'>" + label + "</div><div style='height:" + sigH + "px;border:1px solid #ddd;border-radius:6px;display:flex;align-items:center;justify-content:center;background:#fff;padding:10px'>" + (img ? "<img src='" + img + "' style='max-height:100%;max-width:100%;object-fit:contain'/>" : "") + "</div></div>";
    return "<div style='color:#111'><div style='text-align:right;font-size:11px;color:#666'>Fecha: " + esc(doc.fecha || "") + "</div><div style='font-size:12px;margin-bottom:6px'>Yo <b>" + esc(doc.nombre || patient && patient.name || "") + "</b></div><div style='font-size:12px;margin-bottom:16px'>Identificado con CI N\xB0 <b>" + esc(doc.ci || patient && patient.rut || "") + "</b> \xB7 Edad <b>" + esc(doc.edad || patient && patient.age || "") + "</b></div>" + body + "<div style='display:grid;grid-template-columns:repeat(" + numCols + ",1fr);gap:18px;margin-top:22px'>" + cell("Firma paciente", sp) + cell("Firma profesional \xB7 " + esc(doc.prof || ""), spr) + (medicoSig ? cell("M\xE9dico responsable \xB7 " + esc(medicoSig.name) + (medicoSig.rut ? " \xB7 RUT " + esc(medicoSig.rut) : "") + (medicoSig.registro ? " \xB7 Reg. " + esc(medicoSig.registro) : ""), medicoSig.sig) : "") + "</div></div>";
  });
}
if (typeof window !== "undefined") Object.assign(window, { CONSENT_EXCL, ConsentDoc, ConsentDocDark, cropSignatureDataUrl, jcmConsentLegalBody, jcmConsentInnerHTML });
