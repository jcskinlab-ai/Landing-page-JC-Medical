/* ============================================================================
 * Glow Empire — Idle / incremental (clicker)
 * Glow Clinic — by JC Medical · Talca, Chile
 * Autocontenido: sin librerías, sin imágenes, sin módulos ES. Funciona con file://
 * ==========================================================================*/
(() => {
  'use strict';

  // --- Constantes de balance --------------------------------------------------
  const SAVE_KEY   = 'glow_empire_save';   // clave de localStorage
  const TICK_MS    = 100;                   // bucle económico ~10 veces/seg
  const AUTOSAVE_MS = 5000;                 // autoguardado cada 5 seg
  const COST_GROWTH = 1.15;                 // costo crece x1.15 por compra
  const OFFLINE_CAP_MS = 2 * 60 * 60 * 1000;// tope de progreso offline: 2 horas
  const PRESTIGE_BASE = 1_000_000;          // dinero mínimo para renovar marca
  const TOKEN_BONUS = 0.05;                 // cada token Glow = +5% producción

  // --- Definición de generadores ---------------------------------------------
  // baseCost: costo del primer ejemplar · baseProd: $/seg que produce cada uno
  const GENERATORS = [
    { id:'cabina',    icon:'✦',     name:'Cabina facial',   baseCost:15,         baseProd:0.2 },
    { id:'esteticista',icon:'👩‍⚕️', name:'Esteticista',     baseCost:120,        baseProd:1.5 },
    { id:'botox',     icon:'⊹',     name:'Dr. Botox',       baseCost:1_400,      baseProd:9 },
    { id:'vip',       icon:'◆',     name:'Sala VIP',        baseCost:18_000,     baseProd:55 },
    { id:'sucursal',  icon:'🏥',    name:'Sucursal Talca',  baseCost:230_000,    baseProd:400 },
    { id:'franquicia',icon:'✷',     name:'Franquicia',      baseCost:3_200_000,  baseProd:3_000 },
  ];

  // --- Estado del juego -------------------------------------------------------
  const state = {
    money: 0,             // dinero actual
    owned: {},            // cantidad poseída por generador { id: n }
    tokens: 0,            // tokens Glow acumulados (prestige)
    buys: 0,              // total de compras realizadas
    rouletteDone: false,  // ¿ya giró la ruleta de bienvenida?
    lastSave: Date.now(), // timestamp del último guardado (para offline)
  };
  GENERATORS.forEach(g => state.owned[g.id] = 0);

  // Poder de clic base. Crece un poco con los tokens para que el clic siga útil.
  function clickPower(){
    return Math.max(1, Math.floor((1 + state.tokens * 2) * prestigeMult()));
  }

  // Multiplicador permanente por prestige (1 + tokens*5%)
  function prestigeMult(){
    return 1 + state.tokens * TOKEN_BONUS;
  }

  // Producción total $/seg de todos los generadores (con multiplicador prestige)
  function totalRate(){
    let r = 0;
    for(const g of GENERATORS) r += state.owned[g.id] * g.baseProd;
    return r * prestigeMult();
  }

  // Costo del próximo ejemplar — curva de enganche:
  // primeras compras MUY baratas (adquisición rápida), luego se encarece más.
  function stepGrowth(i){
    if(i < 5)  return 1.07;   // arranque veloz: engancha
    if(i < 12) return 1.12;   // ritmo medio
    if(i < 25) return 1.16;   // se pone exigente
    return 1.20;              // late game: lento
  }
  function genCost(g){
    let cost = g.baseCost;
    const n = state.owned[g.id];
    for(let i = 0; i < n; i++) cost *= stepGrowth(i);
    return Math.ceil(cost);
  }

  // Tokens que se obtendrían al renovar la marca ahora.
  // Escala con la raíz del dinero relativo al umbral base.
  function tokensOnPrestige(){
    if(state.money < PRESTIGE_BASE) return 0;
    return Math.floor(Math.sqrt(state.money / PRESTIGE_BASE));
  }

  // --- Formato de números -----------------------------------------------------
  // Sufijos K/M/B/T para números grandes; CLP con símbolo $
  function fmt(n){
    n = Math.floor(n);
    const sign = n < 0 ? '-' : '';
    n = Math.abs(n);
    let out;
    if(n < 1000)            out = String(n);
    else if(n < 1e6)        out = trim(n / 1e3)  + 'K';
    else if(n < 1e9)        out = trim(n / 1e6)  + 'M';
    else if(n < 1e12)       out = trim(n / 1e9)  + 'B';
    else                    out = trim(n / 1e12) + 'T';
    return sign + out;
  }
  function trim(x){
    // 1 o 2 decimales según magnitud, sin ceros sobrantes
    const s = x >= 100 ? x.toFixed(0) : x.toFixed(2);
    return s.replace(/\.?0+$/, '');
  }
  function money(n){ return '$' + fmt(n); }

  // --- Persistencia (localStorage) -------------------------------------------
  function save(){
    state.lastSave = Date.now();
    try{
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        money: state.money,
        owned: state.owned,
        tokens: state.tokens,
        buys: state.buys,
        rouletteDone: state.rouletteDone,
        lastSave: state.lastSave,
      }));
    }catch(e){ /* localStorage no disponible: se ignora */ }
  }

  function load(){
    let raw;
    try{ raw = localStorage.getItem(SAVE_KEY); }catch(e){ raw = null; }
    if(!raw) return false;
    try{
      const d = JSON.parse(raw);
      state.money  = Number(d.money)  || 0;
      state.tokens = Number(d.tokens) || 0;
      state.buys   = Number(d.buys)   || 0;
      state.rouletteDone = !!d.rouletteDone;
      state.lastSave = Number(d.lastSave) || Date.now();
      if(d.owned) for(const g of GENERATORS) state.owned[g.id] = Number(d.owned[g.id]) || 0;
      return true;
    }catch(e){ return false; }
  }

  // Calcula y otorga producción acumulada mientras la pestaña estuvo cerrada
  function applyOffline(){
    const rate = totalRate();
    if(rate <= 0) return;
    const elapsed = Math.min(Date.now() - state.lastSave, OFFLINE_CAP_MS);
    if(elapsed < 1000) return; // menos de 1 seg: irrelevante
    const earned = rate * (elapsed / 1000);
    if(earned < 1) return;
    state.money += earned;
    const mins = Math.round(elapsed / 60000);
    toast('Mientras no estabas ganaste ' + money(earned) + ' (' + mins + ' min)');
  }

  // --- Referencias del DOM ----------------------------------------------------
  const $ = id => document.getElementById(id);
  const els = {
    money: $('money'), rate: $('rate'), tapBtn: $('tapBtn'), tapPwr: $('tapPwr'),
    tapZone: $('tapZone'), gens: $('gens'), tokens: $('tokens'), mult: $('mult'),
    prestigeBtn: $('prestigeBtn'), prestigeHint: $('prestigeHint'),
    muteBtn: $('muteBtn'), toast: $('toast'),
    startOverlay: $('startOverlay'), startBtn: $('startBtn'),
    resetBtn: $('resetBtn'),
  };

  // --- Construcción de la lista de generadores (una sola vez) ------------------
  const genRows = {}; // cache de nodos por id para refresco rápido
  function buildGens(){
    els.gens.innerHTML = '';
    for(const g of GENERATORS){
      const row = document.createElement('div');
      row.className = 'gen';
      row.innerHTML =
        '<div class="icon">' + g.icon + '</div>' +
        '<div class="info">' +
          '<span class="name">' + g.name + '</span>' +
          '<span class="desc">' + money(g.baseProd) + '/seg c/u</span>' +
          '<span class="own">Tienes: <b>0</b></span>' +
        '</div>' +
        '<div class="buy">' +
          '<span class="cost">' + money(g.baseCost) + '</span>' +
          '<button class="btn btn-gold">Comprar</button>' +
        '</div>';
      const btn = row.querySelector('.buy .btn');
      btn.addEventListener('click', () => buy(g));
      els.gens.appendChild(row);
      genRows[g.id] = {
        row,
        own: row.querySelector('.own b'),
        cost: row.querySelector('.cost'),
        btn,
      };
    }
  }

  // --- Acciones del jugador ---------------------------------------------------
  function tap(ev){
    const gain = clickPower();
    state.money += gain;
    spawnFloat('+' + money(gain), ev);
    Sound.click();
    refresh();
  }

  function buy(g){
    const cost = genCost(g);
    if(state.money < cost) { Sound.error(); return; }
    state.money -= cost;
    state.owned[g.id]++;
    state.buys++;
    Sound.cash();
    refresh();
    // Ruleta de bono: se dispara tras la PRIMERA compra de cualquier item.
    if(state.buys === 1 && !state.rouletteDone){
      state.rouletteDone = true;
      setTimeout(showRoulette, 350);
    }
  }

  // --- Ruleta de bono de créditos (enganche tras la 1ª compra) ----------------
  const ROULETTE_PRIZES = [
    {label:'+$200',  v:200},
    {label:'+$1.000',v:1000},
    {label:'+$400',  v:400},
    {label:'+$3.000',v:3000},
    {label:'+$600',  v:600},
    {label:'+$1.500',v:1500},
    {label:'+$800',  v:800},
    {label:'¡JACKPOT! +$5.000', v:5000}
  ];
  function showRoulette(){
    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;background:rgba(13,13,13,.55);backdrop-filter:blur(3px)';
    const card = document.createElement('div');
    card.style.cssText = 'width:88%;max-width:340px;background:#fff;border-radius:18px;padding:22px 18px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.4)';
    card.innerHTML =
      '<div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#B9C2CB;font-weight:800">Bono de bienvenida</div>'+
      '<h3 style="color:#2A3B52;font-size:20px;margin:6px 0 4px">¡Gira y gana créditos!</h3>'+
      '<p style="color:#5a6678;font-size:13px;margin-bottom:14px">Tu primera compra desbloqueó un giro gratis.</p>'+
      '<div id="rlStrip" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px"></div>'+
      '<button id="rlSpin" class="btn btn-gold" style="width:100%;padding:12px;font-weight:800">Girar 🎰</button>';
    ov.appendChild(card); document.body.appendChild(ov);
    const strip = card.querySelector('#rlStrip');
    const cells = ROULETTE_PRIZES.map(function(p){
      const c = document.createElement('div');
      c.textContent = p.label;
      c.style.cssText = 'padding:11px 6px;border-radius:10px;background:#f1f3f7;color:#2A3B52;font-weight:700;font-size:12px;border:2px solid transparent;transition:background .1s,border-color .1s';
      strip.appendChild(c); return c;
    });
    const spinBtn = card.querySelector('#rlSpin');
    let spinning = false;
    spinBtn.addEventListener('click', function(){
      if(spinning) return; spinning = true; spinBtn.disabled = true;
      try{ Sound.click(); }catch(e){}
      const win = Math.floor(Math.random()*ROULETTE_PRIZES.length);
      let i = 0, ticks = 0;
      const total = ROULETTE_PRIZES.length*3 + win; // varias vueltas y aterriza en win
      const step = function(){
        cells.forEach(function(c){c.style.background='#f1f3f7';c.style.borderColor='transparent';});
        const idx = i % ROULETTE_PRIZES.length;
        cells[idx].style.background = '#FBF3DF'; cells[idx].style.borderColor = '#B9C2CB';
        try{ Sound.click(); }catch(e){}
        i++; ticks++;
        if(ticks <= total){
          setTimeout(step, 60 + Math.pow(ticks/total,3)*220); // desacelera
        }else{
          const prize = ROULETTE_PRIZES[win];
          state.money += prize.v;
          try{ Sound.win(); }catch(e){}
          toast('¡Ganaste ' + prize.label.replace('¡JACKPOT! ','') + ' en créditos!');
          refresh(); save();
          spinBtn.textContent = '¡' + prize.label + '! · Seguir';
          spinBtn.disabled = false; spinning = false;
          spinBtn.onclick = function(){ ov.remove(); };
        }
      };
      step();
    });
  }

  function doPrestige(){
    const gained = tokensOnPrestige();
    if(gained <= 0){ Sound.error(); return; }
    state.tokens += gained;
    // Reinicia dinero y generadores; conserva tokens/multiplicador
    state.money = 0;
    GENERATORS.forEach(g => state.owned[g.id] = 0);
    Sound.win();
    toast('¡Marca renovada! +' + gained + ' tokens Glow (+' + (gained*TOKEN_BONUS*100) + '% producción)');
    save();
    refresh();
  }

  function resetProgress(){
    if(!confirm('¿Reiniciar TODO el progreso? Perderás dinero, generadores y tokens Glow.')) return;
    try{ localStorage.removeItem(SAVE_KEY); }catch(e){}
    state.money = 0; state.tokens = 0;
    GENERATORS.forEach(g => state.owned[g.id] = 0);
    state.lastSave = Date.now();
    Sound.bad();
    toast('Progreso reiniciado.');
    refresh();
  }

  // --- Efecto "+$" flotante en el botón de atender ----------------------------
  function spawnFloat(text, ev){
    const f = document.createElement('div');
    f.className = 'float';
    f.textContent = text;
    // Posición relativa a la zona del botón (centrada con leve dispersión)
    const zone = els.tapZone.getBoundingClientRect();
    let x = zone.width / 2, y = zone.height / 2;
    if(ev && ev.clientX != null){
      x = ev.clientX - zone.left;
      y = ev.clientY - zone.top;
    }
    x += (Math.random() - 0.5) * 40;
    f.style.left = x + 'px';
    f.style.top  = y + 'px';
    f.style.transform = 'translate(-50%,-50%)';
    els.tapZone.appendChild(f);
    setTimeout(() => f.remove(), 1000);
  }

  // --- Toast (usa la clase compartida) ---------------------------------------
  let toastTimer = null;
  function toast(msg){
    els.toast.textContent = msg;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('show'), 3200);
  }

  // --- Refresco de la interfaz (números, botones, estados) --------------------
  function refresh(){
    els.money.textContent = money(state.money);
    els.rate.textContent  = money(totalRate()) + '/seg';
    els.tapPwr.textContent = '+' + money(clickPower());

    // Generadores: cantidad poseída, costo siguiente, habilitado/deshabilitado
    for(const g of GENERATORS){
      const r = genRows[g.id];
      const cost = genCost(g);
      const can = state.money >= cost;
      r.own.textContent = state.owned[g.id];
      r.cost.textContent = money(cost);
      r.btn.disabled = !can;
      r.row.classList.toggle('afford', can);
    }

    // Prestige: tokens, multiplicador y disponibilidad
    els.tokens.textContent = state.tokens;
    els.mult.textContent = '+' + Math.round((prestigeMult() - 1) * 100) + '%';
    const gain = tokensOnPrestige();
    if(gain > 0){
      els.prestigeBtn.disabled = false;
      els.prestigeBtn.textContent = 'Renovar marca ✦ (+' + gain + ' tokens)';
      els.prestigeHint.textContent = 'Renovar reinicia clínica, pero da multiplicador permanente.';
    }else{
      els.prestigeBtn.disabled = true;
      els.prestigeBtn.textContent = 'Renovar marca ✦';
      els.prestigeHint.textContent = 'Reúne ' + money(PRESTIGE_BASE) + ' para poder renovar la marca.';
    }
  }

  // --- Bucle económico (tick) -------------------------------------------------
  let lastTick = Date.now();
  function tick(){
    const now = Date.now();
    const dt = (now - lastTick) / 1000; // segundos transcurridos
    lastTick = now;
    state.money += totalRate() * dt;
    refresh();
  }

  // --- Botón mute -------------------------------------------------------------
  function updateMute(){
    els.muteBtn.textContent = Sound.isMuted() ? '🔇' : '🔊';
  }
  els.muteBtn.addEventListener('click', () => {
    Sound.setMuted(!Sound.isMuted());
    updateMute();
  });

  // --- Desbloqueo de audio en la primera interacción --------------------------
  let unlocked = false;
  function unlockAudio(){
    if(unlocked) return;
    unlocked = true;
    Sound.unlock();
  }
  document.addEventListener('pointerdown', unlockAudio, { once:true });

  // --- Enlace de eventos ------------------------------------------------------
  els.tapBtn.addEventListener('click', tap);
  els.prestigeBtn.addEventListener('click', doPrestige);
  els.resetBtn.addEventListener('click', resetProgress);
  els.startBtn.addEventListener('click', () => {
    unlockAudio();
    els.startOverlay.classList.remove('show');
  });

  // Autoguardado periódico y al cerrar la pestaña
  setInterval(save, AUTOSAVE_MS);
  window.addEventListener('beforeunload', save);

  // --- Arranque ---------------------------------------------------------------
  function init(){
    buildGens();
    const had = load();
    if(had) applyOffline(); // otorga producción acumulada offline
    updateMute();
    refresh();
    // Mostrar overlay de instrucciones siempre al abrir
    els.startOverlay.classList.add('show');
    // Iniciar bucle económico
    lastTick = Date.now();
    setInterval(tick, TICK_MS);
  }

  init();
})();
