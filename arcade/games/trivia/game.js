/* ============================================================================
 * Consultorio Trivia — preguntas de medicina estética (Glow Clinic · JC Medical)
 * Responde antes de que baje el tiempo. Rachas multiplican el puntaje; 3 vidas.
 * Contenido educativo y de marca (orientación general, no reemplaza evaluación).
 * ==========================================================================*/
(() => {
  'use strict';
  const BEST_KEY = 'trivia_best';
  const QTIME = 14;       // segundos por pregunta
  const LIVES = 3;

  // Banco de preguntas: {cat, q, opts, a (índice correcto)}
  const BANK = [
    { cat:'Bótox', q:'¿Cuánto dura, en promedio, el efecto del bótox?', opts:['Para siempre','3 a 6 meses','1 semana','24 horas'], a:1 },
    { cat:'Bótox', q:'Un buen resultado de bótox se caracteriza por…', opts:['Cara sin expresión','Aspecto natural','Piel más oscura','Hinchazón'], a:1 },
    { cat:'Bótox', q:'¿Qué pasa si dejas de aplicarte bótox?', opts:['La cara "se cae"','Vuelve poco a poco a como estaba','Empeora para siempre','Nada cambia nunca'], a:1 },
    { cat:'Ácido hialurónico', q:'El ácido hialurónico se usa principalmente para…', opts:['Relajar músculos','Dar volumen y contorno','Blanquear dientes','Quemar grasa'], a:1 },
    { cat:'Ácido hialurónico', q:'Una ventaja clave del ácido hialurónico es que…', opts:['Es permanente','Es reversible','No se puede ajustar','Cambia el ADN'], a:1 },
    { cat:'Regeneración', q:'El "ADN de salmón" (polinucleótidos) sirve para…', opts:['Regenerar la piel','Bajar de peso','Aclarar el pelo','Relajar músculos'], a:0 },
    { cat:'Regeneración', q:'Los exosomas se asocian a…', opts:['Terapia regenerativa de la piel','Depilación','Ortodoncia','Anestesia'], a:0 },
    { cat:'Colágeno', q:'Sculptra es un bioestimulador que estimula…', opts:['Melanina','Colágeno propio','Grasa','Queratina'], a:1 },
    { cat:'Colágeno', q:'A diferencia de un relleno, un bioestimulador…', opts:['Da volumen inmediato','Mejora la piel de forma progresiva','No hace nada','Es un maquillaje'], a:1 },
    { cat:'Rinomodelación', q:'La rinomodelación perfila la nariz usando…', opts:['Cirugía','Ácido hialurónico','Láser','Hilos'], a:1 },
    { cat:'Skincare', q:'¿Cuál es el activo más subestimado de una rutina diaria?', opts:['Protector solar','Perfume','Agua termal','Exfoliante diario'], a:0 },
    { cat:'Skincare', q:'En la rutina facial, el protector solar va…', opts:['Primero','Último en la mañana','No se usa','Solo en la playa'], a:1 },
    { cat:'Seguridad', q:'Durante el embarazo, los tratamientos inyectables…', opts:['Se recomiendan','Se posponen por precaución','Son obligatorios','No importan'], a:1 },
    { cat:'Seguridad', q:'¿Desde qué edad se realizan tratamientos estéticos inyectables?', opts:['Desde los 12','Mayores de 18','Sin límite','Solo +60'], a:1 },
    { cat:'Hiperhidrosis', q:'La toxina botulínica también trata…', opts:['La sudoración excesiva','Las caries','La miopía','La caspa'], a:0 },
    { cat:'Clínica', q:'En JC Medical, todo tratamiento parte por…', opts:['Una evaluación','Una cirugía','Una radiografía','Un examen de sangre'], a:0 },
    { cat:'Cuidados', q:'Tras un inyectable, las primeras 24-48 h conviene evitar…', opts:['Tomar agua','Ejercicio intenso y calor','Dormir','Caminar'], a:1 },
    { cat:'Cuidados', q:'¿Qué ayuda a que los resultados duren más?', opts:['Fumar','Protección solar y buenos hábitos','Saltarse el agua','Sol sin protección'], a:1 },
    { cat:'Zonas', q:'Las "patas de gallo" se tratan típicamente con…', opts:['Bótox','Peeling','Láser capilar','Hilos'], a:0 },
    { cat:'Zonas', q:'El surco de las ojeras marcadas se mejora con…', opts:['Ácido hialurónico','Bótox','Depilación','Nada'], a:0 },
    { cat:'Tendencias', q:'La tendencia actual en estética apunta a resultados…', opts:['Exagerados','Naturales','Idénticos para todos','Temporales de 1 día'], a:1 },
    { cat:'Mito o dato', q:'"El bótox es tóxico y peligroso": esto es…', opts:['Un mito si lo aplica un profesional','Totalmente cierto','Comprobado dañino','Magia'], a:0 },
    { cat:'Peeling', q:'Un peeling químico sirve para…', opts:['Renovar la piel','Aumentar volumen','Relajar músculos','Depilar'], a:0 },
    { cat:'Labios', q:'El perfilado de labios busca un resultado…', opts:['Desproporcionado','Natural y armónico','Permanente','Sin sensibilidad'], a:1 },
    // ── Sobre JC Medical (el negocio) ──
    { cat:'JC Medical', q:'¿En qué ciudad está JC Medical?', opts:['Santiago','Talca','Concepción','Viña del Mar'], a:1 },
    { cat:'JC Medical', q:'¿En qué región se ubica la clínica?', opts:['Maule','Biobío','Metropolitana','Valparaíso'], a:0 },
    { cat:'JC Medical', q:'El profesional a cargo de JC Medical es…', opts:['Juan Claudio Parra','Juan Pérez','Carlos Soto','Andrés Díaz'], a:0 },
    { cat:'JC Medical', q:'¿Cuál es la profesión del especialista de JC Medical?', opts:['Dermatólogo','Enfermero Universitario','Kinesiólogo','Odontólogo'], a:1 },
    { cat:'JC Medical', q:'El Instagram oficial de la clínica es…', opts:['@jcmedical.cl','@jc.clinic','@medical.jc','@jcmedicina'], a:0 },
    { cat:'JC Medical', q:'La dirección de JC Medical es…', opts:['1 Poniente 1258, Talca','Av. Apoquindo 100','2 Sur 500, Talca','Alameda 340'], a:0 },
    { cat:'JC Medical', q:'De lunes a viernes, JC Medical atiende…', opts:['10:00 a 19:00','08:00 a 14:00','12:00 a 20:00','24 horas'], a:0 },
    { cat:'JC Medical', q:'¿Atiende JC Medical los domingos?', opts:['Sí, todo el día','No, está cerrado','Solo con cita','Solo en la mañana'], a:1 },
    { cat:'JC Medical', q:'El sábado, la clínica atiende hasta las…', opts:['14:00','19:00','12:00','18:00'], a:0 },
    { cat:'JC Medical', q:'Para agendar tu hora en JC Medical puedes escribir por…', opts:['WhatsApp','Fax','Carta','Telegrama'], a:0 },
    { cat:'JC Medical', q:'JC Medical se especializa en…', opts:['Medicina estética','Cirugía mayor','Odontología','Oftalmología'], a:0 },
    { cat:'JC Medical', q:'En JC Medical, todo tratamiento comienza con…', opts:['Una evaluación','Una cirugía','Un examen de sangre','Una radiografía'], a:0 },
    { cat:'JC Medical', q:'¿Cuál de estos tratamientos ofrece JC Medical?', opts:['Bioestimulación con Sculptra','Implante capilar','Blanqueamiento dental','Cirugía láser ocular'], a:0 },
    { cat:'JC Medical', q:'El tratamiento que regenera la piel con ADN de salmón es…', opts:['Rejuran','Botox','Peeling','Depilación'], a:0 },
  ];

  const el = {
    score: document.getElementById('score'),
    lives: document.getElementById('lives'),
    streak: document.getElementById('streak'),
    best: document.getElementById('best'),
    timerFill: document.getElementById('timerFill'),
    qcat: document.getElementById('qcat'),
    qtext: document.getElementById('qtext'),
    opts: document.getElementById('opts'),
    streakMsg: document.getElementById('streakMsg'),
    muteBtn: document.getElementById('muteBtn'),
    overlay: document.getElementById('overlay'),
    ovTitle: document.getElementById('ovTitle'),
    ovText: document.getElementById('ovText'),
    ovBtn: document.getElementById('ovBtn'),
    toast: document.getElementById('toast'),
  };

  let order, idx, score, lives, streak, running, tRemain, raf, lastTs, locked;

  function getBest(){ return parseInt(localStorage.getItem(BEST_KEY)||'0',10)||0; }
  function setBest(v){ if (v>getBest()) localStorage.setItem(BEST_KEY,String(v)); }
  function hearts(n){ return '●'.repeat(Math.max(0,n)) + '○'.repeat(Math.max(0,LIVES-n)); }
  let toastTimer; function toast(m){ el.toast.textContent=m; el.toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.toast.classList.remove('show'),1400); }

  function start(){
    order = BANK.map((_,i)=>i).sort(()=>Math.random()-0.5);
    idx=0; score=0; lives=LIVES; streak=0; running=true; locked=false;
    el.best.textContent=getBest();
    refreshHUD(); nextQ();
    cancelAnimationFrame(raf); lastTs=performance.now(); raf=requestAnimationFrame(tick);
  }

  function refreshHUD(){ el.score.textContent=score; el.lives.textContent=hearts(lives); el.streak.textContent=streak; }

  function nextQ(){
    if (idx >= order.length){ // recicla barajando de nuevo
      order = BANK.map((_,i)=>i).sort(()=>Math.random()-0.5); idx=0;
    }
    const q = BANK[order[idx]];
    locked=false; tRemain=QTIME;
    el.qcat.textContent = q.cat;
    el.qtext.textContent = q.q;
    el.streakMsg.textContent = streak>=2 ? `🔥 Racha de ${streak} · multiplicador x${(1+streak*0.2).toFixed(1)}` : '';
    el.opts.innerHTML='';
    q.opts.forEach((t,i)=>{
      const b=document.createElement('button');
      b.className='opt'; b.textContent=t;
      b.addEventListener('click',()=>answer(i,b,q));
      el.opts.appendChild(b);
    });
  }

  function answer(i,btn,q){
    if (locked) return; locked=true;
    Sound.unlock();
    const buttons = Array.from(el.opts.children);
    buttons.forEach(b=>b.disabled=true);
    if (i === q.a){
      btn.classList.add('ok');
      streak++;
      const mult = 1 + (streak-1)*0.2;
      const gain = Math.round((100 + Math.round(tRemain*8)) * mult);
      score += gain;
      Sound.good();
      el.streakMsg.textContent = `+${gain} ${streak>=2?'· racha x'+mult.toFixed(1):''}`;
    } else {
      btn.classList.add('no');
      buttons[q.a].classList.add('ok');
      streak=0; lives--;
      Sound.bad();
      el.streakMsg.textContent = 'Respuesta correcta marcada en verde.';
    }
    refreshHUD();
    setTimeout(()=>{
      if (lives<=0){ return end(); }
      idx++; nextQ();
    }, 950);
  }

  function tick(ts){
    if (!running) return;
    if (!locked){
      const dt=(ts-lastTs)/1000; tRemain-=dt;
      if (tRemain<=0){ tRemain=0; el.timerFill.style.width='0%'; timeout(); }
      else el.timerFill.style.width = (tRemain/QTIME*100)+'%';
    }
    lastTs=ts; raf=requestAnimationFrame(tick);
  }
  function timeout(){
    if (locked) return; locked=true;
    const q=BANK[order[idx]];
    Array.from(el.opts.children).forEach((b,j)=>{ b.disabled=true; if(j===q.a)b.classList.add('ok'); });
    streak=0; lives--; Sound.bad(); el.streakMsg.textContent='⏱ Se acabó el tiempo'; refreshHUD();
    setTimeout(()=>{ if(lives<=0) return end(); idx++; nextQ(); }, 950);
  }

  function end(){
    running=false; cancelAnimationFrame(raf); setBest(score);
    el.ovTitle.textContent='Fin de la consulta';
    el.ovText.innerHTML=`Sumaste <b>${score}</b> puntos.<br>Récord: <b>${getBest()}</b>`;
    el.ovBtn.textContent='Jugar de nuevo';
    el.overlay.classList.add('show');
  }

  el.muteBtn.addEventListener('click', ()=>{ Sound.unlock(); const m=!Sound.isMuted(); Sound.setMuted(m); el.muteBtn.textContent=m?'🔇':'🔊'; });
  el.ovBtn.addEventListener('click', ()=>{ Sound.unlock(); el.overlay.classList.remove('show'); start(); });

  // Intro
  el.best.textContent=getBest();
  el.ovTitle.textContent='Consultorio Trivia';
  el.ovText.innerHTML='Pon a prueba tus conocimientos de medicina estética. Responde antes de que baje el tiempo: las <b>rachas multiplican</b> tu puntaje. Tienes <b>3 vidas</b>.';
  el.overlay.classList.add('show');
})();
