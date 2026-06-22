/* ============================================================================
 * Precision Clinic — Glow Clinic by JC Medical
 * Juego de habilidad/timing: detén el marcador en el punto exacto de la
 * zona dorada para ejecutar cada procedimiento estético con precisión.
 * Sin librerías, sin imágenes, sin módulos ES. Funciona con file://.
 * ==========================================================================*/
(() => {
  'use strict';

  // ---- Referencias al DOM -------------------------------------------------
  const cv       = document.getElementById('game');
  const ctx      = cv.getContext('2d');
  const W = cv.width, H = cv.height;              // resolución interna fija
  const elMoney    = document.getElementById('hudMoney');
  const elCombo    = document.getElementById('hudCombo');
  const elLives    = document.getElementById('hudLives');
  const elProc     = document.getElementById('hudProc');
  const elFeedback = document.getElementById('feedback');
  const overlay    = document.getElementById('overlay');
  const modal      = document.getElementById('modal');
  const toast      = document.getElementById('toast');
  const muteBtn    = document.getElementById('muteBtn');
  const restartBtn = document.getElementById('restartBtn');

  const BEST_KEY = 'precision_best';             // clave de mejor puntaje

  // ---- Catálogo de procedimientos ----------------------------------------
  // base   = pago base CLP, speed = velocidad del marcador (px/s aprox),
  // zone   = mitad del ancho de la zona dorada (fracción de la barra),
  // core   = mitad del centro "perfecto" (fracción de la barra).
  const PROCS = [
    { name:'Limpieza facial', icon:'✦', base:18000, speed:0.55, zone:0.115, core:0.030, color:'#4caf7d' },
    { name:'Peeling',         icon:'◈', base:28000, speed:0.70, zone:0.095, core:0.026, color:'#9c6ade' },
    { name:'Botox',           icon:'⊹', base:55000, speed:0.95, zone:0.070, core:0.020, color:'#e8b84b' },
    { name:'Rinomodelación',  icon:'◆', base:72000, speed:1.05, zone:0.062, core:0.018, color:'#3c5174' },
    { name:'Sculptra',        icon:'✷', base:95000, speed:1.20, zone:0.052, core:0.015, color:'#B9C2CB' },
  ];

  // ---- Estado de la partida ----------------------------------------------
  let state = {
    playing:false,
    money:0,
    combo:0,           // aciertos consecutivos
    lives:3,
    round:0,
    proc:null,         // procedimiento actual
    targetCenter:0.5,  // posición (0..1) del centro de la zona dorada
    markerPos:0,       // posición (0..1) del marcador
    markerDir:1,       // dirección del marcador (+1 / -1)
    speed:0,           // velocidad efectiva en fracción/seg
    locked:false,      // true mientras se resuelve un intento (pausa)
    flash:0,           // intensidad del destello (0..1)
    flashColor:'#B9C2CB',
    coins:[],          // partículas de monedas/destellos
    lastPct:0,
    lastTime:performance.now(),
  };

  // ---- Geometría de la barra dentro del canvas ---------------------------
  const BAR = { x:80, w:600, y:H*0.5 - 26, h:52 };  // barra horizontal central

  // ---- Utilidades ---------------------------------------------------------
  const clp  = n => '$' + Math.round(n).toLocaleString('es-CL');   // formato CLP
  const rnd  = (a,b) => a + Math.random()*(b-a);
  function showToast(msg){
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=>toast.classList.remove('show'), 1400);
  }

  // ---- Mute ---------------------------------------------------------------
  function syncMute(){ muteBtn.textContent = Sound.isMuted() ? '🔇' : '🔊'; }
  muteBtn.addEventListener('click', () => {
    Sound.unlock();
    Sound.setMuted(!Sound.isMuted());
    syncMute();
    Sound.click();
  });

  // ---- HUD ----------------------------------------------------------------
  function multiplier(){
    // multiplicador creciente por combo: 1,1,1.2,1.5,2,2.5...
    if(state.combo <= 1) return 1;
    return 1 + (state.combo - 1) * 0.5;
  }
  function renderHUD(){
    elMoney.textContent = clp(state.money);
    elCombo.textContent = 'x' + multiplier().toFixed(multiplier()%1?1:0);
    elLives.textContent = state.lives>0 ? '●'.repeat(state.lives) : '—';
    elProc.textContent  = state.proc ? state.proc.icon + ' ' + state.proc.name : '—';
  }

  // ---- Preparar una nueva ronda ------------------------------------------
  function nextRound(){
    state.round++;
    // procedimiento ponderado: rondas avanzadas favorecen los más valiosos
    let maxIdx = Math.min(PROCS.length - 1, 1 + Math.floor(state.round/2));
    let idx = Math.floor(Math.random() * (maxIdx + 1));
    state.proc = PROCS[idx];
    // escalado de dificultad: la velocidad sube con la ronda
    const diff = 1 + state.round * 0.04;
    state.speed = state.proc.speed * diff;
    // zona objetivo nunca pegada a los bordes
    state.targetCenter = rnd(0.18, 0.82);
    state.markerPos = 0;
    state.markerDir = 1;
    state.locked = false;
    renderHUD();
  }

  // ---- Resolver un intento (cuando el jugador detiene el marcador) --------
  function attempt(){
    if(!state.playing || state.locked) return;
    state.locked = true;
    const p = state.proc;
    const dist = Math.abs(state.markerPos - state.targetCenter); // distancia al centro

    // precisión 0..100% relativa al borde de la zona dorada
    const pct = Math.max(0, Math.min(100, Math.round((1 - dist / p.zone) * 100)));
    state.lastPct = pct;

    if(dist <= p.core){
      // ====== PERFECTO ======
      const pay = Math.round(p.base * 2 * multiplier());
      state.combo++;
      state.money += pay;
      feedback('perfect', '¡PERFECTO! ' + pct + '%  +' + clp(pay));
      spawnCoins(true);
      flash('#B9C2CB', 1);
      Sound.cash();
      Sound.tone(1320, 0.18, 'triangle', 0.12, 0.02); // brillo extra "perfect"
      Sound.tone(1760, 0.22, 'triangle', 0.10, 0.10);
    } else if(dist <= p.zone){
      // ====== BIEN ======
      const pay = Math.round(p.base * multiplier());
      state.combo++;
      state.money += pay;
      feedback('good', 'Bien ' + pct + '%  +' + clp(pay));
      spawnCoins(false);
      flash('#4caf7d', 0.7);
      Sound.good();
    } else {
      // ====== FALLA ======
      state.combo = 0;
      state.lives--;
      feedback('miss', 'Falla ' + pct + '%  −1 vida');
      flash('#e05b5b', 0.9);
      Sound.bad();
    }
    renderHUD();

    // pequeña pausa para apreciar el resultado, luego siguiente ronda o fin
    setTimeout(() => {
      if(state.lives <= 0){ endGame(); }
      else { nextRound(); }
    }, 620);
  }

  function feedback(cls, text){
    elFeedback.className = 'feedback ' + cls;
    elFeedback.textContent = text;
  }

  // ---- Destello de color del canvas --------------------------------------
  function flash(color, amount){ state.flash = amount; state.flashColor = color; }

  // ---- Partículas de monedas / destello ----------------------------------
  function spawnCoins(perfect){
    const cx = BAR.x + state.targetCenter * BAR.w;
    const cy = BAR.y + BAR.h/2;
    const n = perfect ? 22 : 12;
    for(let i=0;i<n;i++){
      const a = rnd(-Math.PI, 0);            // hacia arriba
      const sp = rnd(120, 320);
      state.coins.push({
        x:cx, y:cy,
        vx:Math.cos(a)*sp, vy:Math.sin(a)*sp - 80,
        life:1, gold:perfect || Math.random()<0.6,
        r:rnd(3,6),
      });
    }
  }

  // ---- Bucle de juego (timing real con dt) -------------------------------
  function loop(now){
    const dt = Math.min(0.05, (now - state.lastTime)/1000); // delta seg (clamp)
    state.lastTime = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  function update(dt){
    // mover el marcador en ida y vuelta dentro de [0,1]
    if(state.playing && !state.locked){
      state.markerPos += state.markerDir * state.speed * dt;
      if(state.markerPos >= 1){ state.markerPos = 1; state.markerDir = -1; }
      if(state.markerPos <= 0){ state.markerPos = 0; state.markerDir =  1; }
    }
    // decaer destello
    if(state.flash > 0) state.flash = Math.max(0, state.flash - dt*2.2);
    // actualizar partículas
    for(let i=state.coins.length-1;i>=0;i--){
      const c = state.coins[i];
      c.vy += 520*dt;              // gravedad
      c.x += c.vx*dt; c.y += c.vy*dt;
      c.life -= dt*1.1;
      if(c.life <= 0) state.coins.splice(i,1);
    }
  }

  // ---- Dibujo -------------------------------------------------------------
  function draw(){
    ctx.clearRect(0,0,W,H);

    // fondo suave
    ctx.fillStyle = '#e7ecf2'; ctx.fillRect(0,0,W,H);

    // título del procedimiento centrado arriba
    if(state.proc){
      ctx.textAlign='center';
      ctx.fillStyle = '#2a3b52';
      ctx.font = '700 24px system-ui,sans-serif';
      ctx.fillText(state.proc.icon + '  ' + state.proc.name, W/2, 78);
      ctx.fillStyle = '#7a869a';
      ctx.font = '600 13px system-ui,sans-serif';
      ctx.fillText('Pago base ' + clp(state.proc.base) + ' · Ronda ' + state.round, W/2, 102);
    }

    drawBar();
    drawCoins();

    // destello de pantalla
    if(state.flash > 0){
      ctx.save();
      ctx.globalAlpha = state.flash * 0.30;
      ctx.fillStyle = state.flashColor;
      ctx.fillRect(0,0,W,H);
      ctx.restore();
    }
  }

  function drawBar(){
    const {x,y,w,h} = BAR;

    // riel de la barra
    roundRect(x, y, w, h, 14);
    ctx.fillStyle = '#d9dee6'; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = '#c3cad6'; ctx.stroke();

    if(state.proc){
      const p = state.proc;
      // zona dorada (objetivo)
      const zw = p.zone * 2 * w;
      const zx = x + state.targetCenter*w - zw/2;
      roundRect(zx, y+4, zw, h-8, 10);
      const g = ctx.createLinearGradient(zx, 0, zx+zw, 0);
      g.addColorStop(0,'#d8c290'); g.addColorStop(0.5,'#B9C2CB'); g.addColorStop(1,'#d8c290');
      ctx.fillStyle = g; ctx.fill();

      // centro "perfecto"
      const cw = p.core * 2 * w;
      const cx = x + state.targetCenter*w - cw/2;
      roundRect(cx, y+2, Math.max(4,cw), h-4, 6);
      ctx.fillStyle = '#fff7e0'; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = '#b08f45'; ctx.stroke();

      // marcador (aguja)
      const mx = x + state.markerPos*w;
      ctx.save();
      ctx.shadowColor = 'rgba(42,59,82,.4)'; ctx.shadowBlur = 8;
      ctx.fillStyle = state.locked ? '#7a869a' : '#2a3b52';
      ctx.fillRect(mx-3, y-14, 6, h+28);
      // cabeza triangular superior
      ctx.beginPath();
      ctx.moveTo(mx-9, y-14); ctx.lineTo(mx+9, y-14); ctx.lineTo(mx, y-2);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    // etiquetas extremos
    ctx.textAlign='center'; ctx.fillStyle='#9aa4b4'; ctx.font='600 11px system-ui';
    ctx.fillText('inicio', x, y+h+22);
    ctx.fillText('fin', x+w, y+h+22);

    // última precisión
    if(state.playing){
      ctx.textAlign='center'; ctx.font='800 14px system-ui';
      ctx.fillStyle = '#7a869a';
      ctx.fillText('Precisión último intento: ' + state.lastPct + '%', W/2, y+h+58);
    }
  }

  function drawCoins(){
    for(const c of state.coins){
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, c.life));
      ctx.fillStyle = c.gold ? '#B9C2CB' : '#fff7e0';
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  // helper: rectángulo redondeado como path
  function roundRect(x,y,w,h,r){
    r = Math.min(r, w/2, h/2);
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.closePath();
  }

  // ---- Inicio / fin de partida -------------------------------------------
  function startGame(){
    Sound.unlock();
    state.playing = true;
    state.money = 0;
    state.combo = 0;
    state.lives = 3;
    state.round = 0;
    state.coins = [];
    state.lastPct = 0;
    overlay.classList.remove('show');
    feedback('', 'Detén el marcador en el punto exacto');
    nextRound();
    Sound.click();
  }

  function endGame(){
    state.playing = false;
    state.proc = null;
    renderHUD();

    const prevBest = parseInt(localStorage.getItem(BEST_KEY) || '0', 10);
    const isRecord = state.money > prevBest;
    if(isRecord) localStorage.setItem(BEST_KEY, String(state.money));
    const best = Math.max(prevBest, state.money);

    Sound.win();
    feedback('', 'Clínica cerrada');

    modal.innerHTML =
      '<h1>Fin de la jornada</h1>' +
      '<p>Tu clínica facturó hoy:</p>' +
      '<div class="big">' + clp(state.money) + '</div>' +
      (isRecord ? '<p style="color:var(--gold);font-weight:800">🏆 ¡Nuevo récord!</p>'
                : '<p>Mejor puntaje: <b>' + clp(best) + '</b></p>') +
      '<div class="row">' +
        '<button class="btn btn-gold" id="againBtn">Jugar de nuevo</button>' +
        '<a class="btn btn-ghost" href="../../index.html">← Menú</a>' +
      '</div>';
    overlay.classList.add('show');
    document.getElementById('againBtn').addEventListener('click', startGame);
  }

  // ---- Overlay inicial con instrucciones ---------------------------------
  function showIntro(){
    const best = parseInt(localStorage.getItem(BEST_KEY) || '0', 10);
    modal.innerHTML =
      '<h1>✨ Precision Clinic</h1>' +
      '<p>Cada paciente necesita un procedimiento exacto. Detén el marcador justo en la <b>zona dorada</b>.</p>' +
      '<ul>' +
        '<li><b>ESPACIO</b> o <b>clic/tap</b> para detener.</li>' +
        '<li>Centro blanco = <b>¡Perfecto!</b> (pago doble).</li>' +
        '<li>Zona dorada = <b>Bien</b>. Fuera = <b>Falla</b> (−1 vida).</li>' +
        '<li>Aciertos seguidos suben el <b>combo</b> y el pago.</li>' +
        '<li>Procedimientos premium pagan más, pero van más rápidos.</li>' +
      '</ul>' +
      (best>0 ? '<p>Mejor puntaje: <b>' + clp(best) + '</b></p>' : '') +
      '<div class="row"><button class="btn btn-gold" id="startBtn">Empezar</button></div>';
    overlay.classList.add('show');
    document.getElementById('startBtn').addEventListener('click', startGame);
  }

  // ---- Entradas (teclado / puntero) --------------------------------------
  document.addEventListener('keydown', (e) => {
    if(e.code === 'Space' || e.key === ' '){
      e.preventDefault();
      Sound.unlock();
      if(state.playing) attempt();
    }
  });
  cv.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    Sound.unlock();
    if(state.playing) attempt();
  });

  restartBtn.addEventListener('click', () => {
    Sound.click();
    if(state.playing){ showToast('Partida reiniciada'); startGame(); }
    else { showIntro(); }
  });

  // ---- Arranque -----------------------------------------------------------
  syncMute();
  renderHUD();
  showIntro();
  state.lastTime = performance.now();
  requestAnimationFrame(loop);
})();
