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

if (typeof window !== "undefined") Object.assign(window, { CONSENT_EXCL, ConsentDoc, ConsentDocDark });
