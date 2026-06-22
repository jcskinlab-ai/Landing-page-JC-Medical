/* ============================================================================
 * Triage — Glow Clinic by JC Medical
 * Juego de criterio estilo "Papers, Please" para una clínica de medicina
 * estética facial. Llegan pacientes con una solicitud y una ficha; el jugador
 * decide Aprobar / Sugerir alternativa / Rechazar según un protocolo visible.
 * Sin librerías, sin imágenes, sin módulos: funciona con file://.
 * ==========================================================================*/
(() => {
  'use strict';

  // ----- Configuración del día -----
  const PACIENTES_DIA = 10;   // pacientes por jornada
  const REP_INICIAL   = 5;    // reputación (0 a 5)
  const SEG_PACIENTE  = 16;   // segundos por paciente (presión leve)

  const BEST_KEY = 'triage_best';

  // ----- Catálogo de tratamientos -----
  // inyectable: aplica regla de alergia a lidocaína.
  // edadMin: regla por edad (Sculptra / Rinomodelación).
  // alt: alternativa más económica a sugerir si no alcanza el presupuesto.
  const TRATAMIENTOS = {
    labios:    { nombre:'relleno de labios',     precio: 220000, inyectable:true,  edadMin:18, alt:'hidratación con skinbooster' },
    botox:     { nombre:'bótox de entrecejo',    precio: 180000, inyectable:true,  edadMin:18, alt:'protocolo de skincare' },
    surcos:    { nombre:'relleno de surcos',     precio: 260000, inyectable:true,  edadMin:18, alt:'radiofrecuencia facial' },
    sculptra:  { nombre:'Sculptra (bioestimulador)', precio: 380000, inyectable:true, edadMin:30, alt:'mesoterapia facial' },
    rino:      { nombre:'rinomodelación',        precio: 320000, inyectable:true,  edadMin:30, alt:'maquillaje correctivo' },
    peeling:   { nombre:'peeling químico',       precio: 90000,  inyectable:false, edadMin:18, alt:'limpieza facial profunda' },
    laser:     { nombre:'láser facial',          precio: 150000, inyectable:false, edadMin:18, alt:'peeling suave' },
  };
  const CLAVES_TRAT = Object.keys(TRATAMIENTOS);

  // Frases de solicitud por tratamiento (sabor, no afectan la regla)
  const SOLICITUDES = {
    labios:   ['Quiero relleno en los labios.', 'Me gustaría darle más volumen a mis labios.'],
    botox:    ['Quiero bótox para el entrecejo.', 'Vengo a que me apliquen bótox.'],
    surcos:   ['Quiero rellenar los surcos nasogenianos.', 'Me molestan mucho los surcos de la sonrisa.'],
    sculptra: ['Quiero Sculptra para verme más firme.', 'Me recomendaron un bioestimulador de colágeno.'],
    rino:     ['Quiero una rinomodelación.', 'Me gustaría afinar la nariz sin cirugía.'],
    peeling:  ['Quiero un peeling para las manchas.', 'Vengo por un peeling químico.'],
    laser:    ['Quiero láser para el rostro.', 'Me interesa un tratamiento con láser.'],
  };

  // Expectativas: las "irreales" siempre obligan a Rechazar.
  const EXP_REALISTA = ['Quiere una mejora natural.', 'Busca un resultado sutil.', 'Tiene expectativas razonables.'];
  const EXP_IRREAL   = ['Quiere verse 20 años menor en una sesión.', 'Exige resultados de cirugía sin operarse.', 'Pide una transformación total garantizada hoy.'];

  // Nombres y rasgos para variar el retrato
  const NOMBRES = ['Camila Rojas','Javiera Soto','Matías Pérez','Fernanda Díaz','Ignacio Muñoz',
                   'Antonia Vera','Sebastián Lagos','Valentina Ríos','Constanza Pino','Tomás Araya',
                   'Josefa Bravo','Diego Fuentes','Catalina Reyes','Martín Salinas'];
  const PIELES = ['#f1c9a5','#e8b48c','#d99e76','#c98a5f','#a9714a'];
  const PELOS  = ['#2b2118','#4a3526','#6b4a2e','#1c1c22','#7a6a55','#b8943f'];
  const ACCS   = ['👓','💄','','🧣','','✨',''];

  // ----- Estado de la partida -----
  let estado = null;

  // Atajo querySelector
  const $ = (s) => document.querySelector(s);

  // Refs DOM
  const el = {
    rep:      $('#hudRep'),
    money:    $('#hudMoney'),
    hits:     $('#hudHits'),
    prog:     $('#hudProg'),
    timerbar: $('#timerbar'),
    timerfill:$('#timerfill'),
    portrait: $('#portrait'),
    name:     $('#patName'),
    sub:      $('#patSub'),
    request:  $('#patRequest'),
    chart:    $('#patChart'),
    feedback: $('#feedback'),
    btnApprove: $('#btnApprove'),
    btnAlt:     $('#btnAlt'),
    btnReject:  $('#btnReject'),
    restart:    $('#restartBtn'),
    overlay:  $('#overlay'),
    modal:    $('#modal'),
    toast:    $('#toast'),
    mute:     $('#muteBtn'),
  };

  // ----- Utilidades -----
  const rnd  = (n) => Math.floor(Math.random() * n);
  const pick = (a) => a[rnd(a.length)];
  const clp  = (n) => '$' + n.toLocaleString('es-CL');

  function toast(msg){
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.toast.classList.remove('show'), 1600);
  }

  // ====================================================================
  // GENERACIÓN DE PACIENTES
  // Se construye un paciente y luego se calcula la decisión correcta con
  // las MISMAS reglas que muestra el protocolo, para que el feedback cuadre.
  // ====================================================================
  function generarPaciente(){
    const clave = pick(CLAVES_TRAT);
    const trat  = TRATAMIENTOS[clave];

    // Edad: a veces forzamos < 30 para activar la regla de edad.
    let edad;
    if (trat.edadMin >= 30 && Math.random() < 0.5) edad = 22 + rnd(7);     // 22..28 (menor al mínimo)
    else edad = 24 + rnd(36);                                             // 24..59

    // Alergia a lidocaína (bandera para inyectables)
    const alergiaLido = Math.random() < 0.32;
    const alergia = alergiaLido ? 'Lidocaína' : pick(['Ninguna conocida','Ninguna conocida','Penicilina','Ninguna conocida']);

    // Expectativa
    const irreal = Math.random() < 0.28;
    const expectativaTxt = irreal ? pick(EXP_IRREAL) : pick(EXP_REALISTA);

    // Presupuesto: a veces por debajo del precio (regla de alternativa)
    let presupuesto;
    if (Math.random() < 0.32) presupuesto = Math.round((trat.precio * (0.4 + Math.random()*0.4)) / 10000) * 10000; // insuficiente
    else presupuesto = trat.precio + Math.round((Math.random()*250000) / 10000) * 10000;                          // suficiente

    const paciente = {
      nombre: pick(NOMBRES),
      edad,
      alergia,
      alergiaLido: alergia === 'Lidocaína',
      expectativaTxt,
      irreal,
      presupuesto,
      claveTrat: clave,
      trat,
      solicitud: pick(SOLICITUDES[clave]),
      // rasgos de retrato
      piel: pick(PIELES),
      pelo: pick(PELOS),
      acc:  pick(ACCS),
    };

    paciente.correcta = decisionCorrecta(paciente);
    return paciente;
  }

  // ====================================================================
  // REGLAS — orden de prioridad determinista.
  // Devuelve { accion, motivo, regla } donde accion ∈ aprobar|alternativa|rechazar
  // El orden importa: las banderas de seguridad mandan sobre el presupuesto.
  // ====================================================================
  function decisionCorrecta(p){
    const t = p.trat;

    // Regla 1: alergia a lidocaína + tratamiento inyectable → Rechazar
    if (t.inyectable && p.alergiaLido){
      return { accion:'rechazar', regla:1,
        motivo:`${cap(t.nombre)} es inyectable con lidocaína y la paciente es alérgica a la lidocaína.` };
    }

    // Regla 2: expectativa irreal → Rechazar
    if (p.irreal){
      return { accion:'rechazar', regla:2,
        motivo:'La expectativa es irreal: no se debe operar para evitar una demanda.' };
    }

    // Regla 3: tratamiento con edad mínima ≥ 30 y paciente menor → Rechazar
    if (p.edad < t.edadMin){
      return { accion:'rechazar', regla:3,
        motivo:`${cap(t.nombre)} requiere edad ≥ ${t.edadMin} y la paciente tiene ${p.edad}.` };
    }

    // Regla 4: presupuesto insuficiente → Sugerir alternativa
    if (p.presupuesto < t.precio){
      return { accion:'alternativa', regla:4,
        motivo:`El presupuesto (${clp(p.presupuesto)}) no alcanza para ${t.nombre} (${clp(t.precio)}); se ofrece ${t.alt}.` };
    }

    // Regla 5: sin banderas → Aprobar
    return { accion:'aprobar', regla:5,
      motivo:`Sin banderas de riesgo: se puede aprobar ${t.nombre}.` };
  }

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // ====================================================================
  // RENDER del paciente actual
  // ====================================================================
  function pintarPaciente(p){
    // Retrato dibujado con formas
    el.portrait.querySelector('.face').style.background = p.piel;
    el.portrait.querySelector('.hair').style.background = p.pelo;
    el.portrait.querySelector('.acc').textContent = p.acc;
    // Expresión según expectativa (sutil)
    el.portrait.querySelector('.mouth').textContent = p.irreal ? '◡' : '‿';

    el.name.textContent = p.nombre;
    el.sub.textContent  = `${p.edad} años · Glow Clinic, Talca`;
    el.request.textContent = p.solicitud;

    // Ficha con atributos; resalta banderas de riesgo
    const campos = [
      { b:'Edad', s:`${p.edad} años`, warn: p.edad < p.trat.edadMin },
      { b:'Alergias', s:p.alergia, warn: p.alergiaLido },
      { b:'Expectativa', s: p.irreal ? 'Irreal' : 'Realista', warn: p.irreal },
      { b:'Presupuesto', s:clp(p.presupuesto), warn: p.presupuesto < p.trat.precio },
      { b:'Tratamiento pedido', s:cap(p.trat.nombre), warn:false },
      { b:'Costo', s:clp(p.trat.precio), warn:false },
    ];
    el.chart.innerHTML = campos.map(c =>
      `<div class="field${c.warn?' warn':''}"><b>${c.b}</b><span>${c.s}</span></div>`
    ).join('');
  }

  // ====================================================================
  // FLUJO DEL JUEGO
  // ====================================================================
  function nuevoJuego(){
    estado = {
      idx: 0,
      rep: REP_INICIAL,
      money: 0,
      hits: 0,
      actual: null,
      bloqueado: false,
      timer: null,
      tRestante: 0,
    };
    el.feedback.className = 'feedback';
    el.feedback.textContent = '';
    actualizarHUD();
    siguientePaciente();
  }

  function siguientePaciente(){
    detenerTimer();
    if (estado.idx >= PACIENTES_DIA){ return finDia(true); }
    estado.idx++;
    estado.actual = generarPaciente();
    estado.bloqueado = false;
    pintarPaciente(estado.actual);
    el.feedback.className = 'feedback';
    el.feedback.textContent = '';
    setBotones(true);
    actualizarHUD();
    iniciarTimer();
  }

  function iniciarTimer(){
    estado.tRestante = SEG_PACIENTE;
    el.timerbar.classList.remove('low');
    el.timerfill.style.width = '100%';
    const t0 = Date.now();
    estado.timer = setInterval(() => {
      const transcurrido = (Date.now() - t0) / 1000;
      const restante = Math.max(0, SEG_PACIENTE - transcurrido);
      estado.tRestante = restante;
      const pct = (restante / SEG_PACIENTE) * 100;
      el.timerfill.style.width = pct + '%';
      el.timerbar.classList.toggle('low', pct < 30);
      if (restante <= 0){
        // Se acabó el tiempo: cuenta como error (indecisión).
        detenerTimer();
        if (!estado.bloqueado) resolver(null, true);
      }
    }, 100);
  }
  function detenerTimer(){ if (estado && estado.timer){ clearInterval(estado.timer); estado.timer = null; } }

  // Resuelve la decisión del jugador (o el timeout)
  function resolver(accion, timeout){
    if (estado.bloqueado) return;
    estado.bloqueado = true;
    detenerTimer();
    setBotones(false);

    const p = estado.actual;
    const correcta = p.correcta;
    const acierto = !timeout && accion === correcta.accion;

    if (acierto){
      // Recompensa: dinero proporcional + reputación parcial
      let pago;
      if (correcta.accion === 'aprobar')      pago = p.trat.precio;                 // cobra el tratamiento
      else if (correcta.accion === 'alternativa') pago = TRATAMIENTOS[p.claveTrat].precio; // valor referencial alt
      else                                    pago = 25000;                          // honorario de consulta
      // Pequeño bono por reputación alta
      pago = Math.round(pago * (0.5 + estado.rep/10));

      estado.money += pago;
      estado.hits++;
      estado.rep = Math.min(5, +(estado.rep + 0.25).toFixed(2));

      el.feedback.className = 'feedback ok';
      el.feedback.textContent = `✔ Correcto. ${correcta.motivo}  (+${clp(pago)})`;
      Sound.good(); Sound.cash();
    } else {
      // Error: complicación/demanda. Reputación baja; a veces multa.
      const motivoTxt = timeout
        ? `⏱ Se acabó el tiempo. Lo correcto era ${nombreAccion(correcta.accion)}: ${correcta.motivo}`
        : `✘ Incorrecto. Lo correcto era ${nombreAccion(correcta.accion)}: ${correcta.motivo}`;

      let baja = 1;
      let multa = 0;
      // Errores graves (aplicar pese a alergia/irreal/edad) penalizan más + multa
      const grave = (accion === 'aprobar' && correcta.accion === 'rechazar');
      if (grave){ baja = 1.5; multa = 50000; estado.money = Math.max(0, estado.money - multa); }

      estado.rep = Math.max(0, +(estado.rep - baja).toFixed(2));

      el.feedback.className = 'feedback err';
      el.feedback.textContent = multa
        ? `${motivoTxt}  (−reputación, multa ${clp(multa)})`
        : `${motivoTxt}  (−reputación)`;
      Sound.bad();
      if (grave) Sound.error();
    }

    actualizarHUD();

    // Fin por reputación a 0
    if (estado.rep <= 0){
      setTimeout(() => finDia(false), 900);
      return;
    }
    // Avanza tras una breve pausa para leer el feedback
    setTimeout(() => siguientePaciente(), acierto ? 1100 : 2200);
  }

  function nombreAccion(a){
    return a === 'aprobar' ? 'Aprobar'
         : a === 'alternativa' ? 'Sugerir alternativa'
         : 'Rechazar';
  }

  function setBotones(on){
    el.btnApprove.disabled = !on;
    el.btnAlt.disabled = !on;
    el.btnReject.disabled = !on;
  }

  function actualizarHUD(){
    const r = Math.round(estado.rep);
    el.rep.textContent = '★'.repeat(r) + '☆'.repeat(5 - r);
    el.money.textContent = clp(estado.money);
    el.hits.textContent = estado.hits;
    el.prog.textContent = `${estado.idx} / ${PACIENTES_DIA}`;
  }

  // ====================================================================
  // FIN DEL DÍA / DERROTA
  // ====================================================================
  function finDia(completado){
    detenerTimer();
    setBotones(false);

    // Puntaje compuesto: dinero + bonos por aciertos y reputación
    const score = estado.money + estado.hits * 20000 + Math.round(estado.rep * 50000);
    const best = +(localStorage.getItem(BEST_KEY) || 0);
    const record = score > best;
    if (record) localStorage.setItem(BEST_KEY, score);

    const rFinal = Math.round(estado.rep);
    const titulo = completado ? '🏁 Jornada completada' : '💔 Clínica cerrada';
    const sub = completado
      ? `Atendiste a los ${PACIENTES_DIA} pacientes del día.`
      : 'La reputación llegó a cero. Los errores tienen consecuencias.';

    el.modal.innerHTML = `
      <h1>${titulo}</h1>
      <p>${sub}</p>
      <div class="big">${clp(estado.money)}</div>
      <ul>
        <li>Aciertos: <b>${estado.hits} / ${estado.idx}</b></li>
        <li>Reputación final: <b>${'★'.repeat(rFinal)}${'☆'.repeat(5-rFinal)}</b></li>
        <li>Puntaje: <b>${score.toLocaleString('es-CL')}</b></li>
        <li>Mejor puntaje: <b>${Math.max(best, score).toLocaleString('es-CL')}</b>${record ? ' 🎉 ¡Nuevo récord!' : ''}</li>
      </ul>
      <div class="row">
        <button class="btn btn-gold" id="playAgain">Jugar de nuevo</button>
        <a class="btn btn-ghost" href="../../index.html">← Menú</a>
      </div>`;
    el.overlay.classList.add('show');
    if (completado) Sound.win(); else Sound.bad();

    $('#playAgain').addEventListener('click', () => {
      Sound.click();
      el.overlay.classList.remove('show');
      nuevoJuego();
    });
  }

  // ====================================================================
  // OVERLAY INICIAL (instrucciones + protocolo resumido)
  // ====================================================================
  function mostrarInicio(){
    const best = +(localStorage.getItem(BEST_KEY) || 0);
    el.modal.innerHTML = `
      <h1>Triage — Glow Clinic</h1>
      <p>Eres quien decide en la recepción médica. Llegan ${PACIENTES_DIA} pacientes:
      revisa la <b>solicitud</b>, la <b>ficha</b> y aplica el <b>protocolo</b>.</p>
      <ul>
        <li><b>Aprobar</b> si no hay banderas de riesgo.</li>
        <li><b>Sugerir alternativa</b> si el presupuesto no alcanza.</li>
        <li><b>Rechazar</b> si hay alergia a lidocaína, expectativa irreal o edad insuficiente.</li>
        <li>Acertar suma <b>caja</b> y <b>reputación</b>; errar te resta reputación (y a veces multa).</li>
        <li>Tienes ${SEG_PACIENTE}s por paciente. Si la reputación llega a 0, cierra la clínica.</li>
      </ul>
      <p style="font-size:12px;color:#7a869a">Mejor puntaje: <b>${best.toLocaleString('es-CL')}</b></p>
      <div class="row">
        <button class="btn btn-gold" id="startBtn">Empezar</button>
      </div>`;
    el.overlay.classList.add('show');
    $('#startBtn').addEventListener('click', () => {
      Sound.unlock(); Sound.click();
      el.overlay.classList.remove('show');
      nuevoJuego();
    });
  }

  // ====================================================================
  // EVENTOS
  // ====================================================================
  el.btnApprove.addEventListener('click', () => { Sound.click(); resolver('aprobar'); });
  el.btnAlt.addEventListener('click',     () => { Sound.click(); resolver('alternativa'); });
  el.btnReject.addEventListener('click',  () => { Sound.click(); resolver('rechazar'); });

  el.restart.addEventListener('click', () => {
    Sound.unlock(); Sound.click();
    el.overlay.classList.remove('show');
    nuevoJuego();
    toast('Día reiniciado');
  });

  // Botón mute
  el.mute.addEventListener('click', () => {
    Sound.unlock();
    const m = !Sound.isMuted();
    Sound.setMuted(m);
    el.mute.textContent = m ? '🔇' : '🔊';
    if (!m) Sound.click();
  });

  // Desbloqueo de audio en la primera interacción
  window.addEventListener('pointerdown', () => Sound.unlock(), { once:true });

  // Atajos de teclado: 1 Aprobar, 2 Alternativa, 3 Rechazar
  window.addEventListener('keydown', (e) => {
    if (el.overlay.classList.contains('show')) return;
    if (e.key === '1'){ Sound.click(); resolver('aprobar'); }
    else if (e.key === '2'){ Sound.click(); resolver('alternativa'); }
    else if (e.key === '3'){ Sound.click(); resolver('rechazar'); }
  });

  // Arranque
  mostrarInicio();
})();
