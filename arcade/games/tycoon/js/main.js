/* ============================================================================
 * main.js — Game loop, entrada del jugador y pegamento de todo el juego
 * ----------------------------------------------------------------------------
 * Mantiene la lógica (update) separada del dibujo (Renderer.draw) y orquesta
 * spawn de pacientes, economía, HUD, guardado y feedback ("juice").
 * ==========================================================================*/

(function () {
  'use strict';

  // --- Elementos del DOM ---------------------------------------------------
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const L = LAYOUT;
  canvas.width = L.canvas.w;
  canvas.height = L.canvas.h;

  const el = {
    money: document.getElementById('money'),
    level: document.getElementById('level'),
    xpFill: document.getElementById('xpFill'),
    stars: document.getElementById('stars'),
    served: document.getElementById('served'),
    buyBed: document.getElementById('buyBed'),
    muteBtn: document.getElementById('muteBtn'),
    toast: document.getElementById('toast'),
    tutorial: document.getElementById('tutorial'),
    tutorialClose: document.getElementById('tutorialClose'),
    treatList: document.getElementById('treatList'),
    hint: document.getElementById('hint'),
  };

  // --- Estado global del juego --------------------------------------------
  const game = {
    state: new GameState(),
    renderer: new Renderer(ctx),
    beds: [],
    patients: [],
    particles: [],
    selected: null,        // paciente seleccionado
    spawnTimer: 0,
    time: 0,
    showBedHint: false,    // resaltar dónde irá la próxima camilla
    started: false,
  };

  // --- Inicialización ------------------------------------------------------
  function init() {
    const loaded = game.state.load();
    Sound.setMuted(game.state.muted);
    rebuildBeds();
    wireEconomyCallbacks();
    bindUI();
    refreshHUD();
    refreshTreatList();
    game.spawnTimer = loaded ? 2.5 : 1.2;
    if (loaded) grantIdleBonus();
    if (CONFIG.showTutorial && !loaded) showTutorial();
    requestAnimationFrame(loop);
  }

  function rebuildBeds() {
    game.beds = [];
    for (let i = 0; i < game.state.beds; i++) {
      const bed = new Bed(L.bedSlots[i], i);
      bed.appearT = 1;
      game.beds.push(bed);
    }
  }

  function wireEconomyCallbacks() {
    game.state.onMoneyChange = refreshHUD;
    game.state.onLevelUp = (lvl, unlocked, reward) => {
      Sound.levelUp();
      FX.confetti(game.particles, L.canvas.w / 2, 120, 90);
      FX.floatText(game.particles, L.canvas.w / 2, 150, '+' + fmtMoney(reward), PALETTE.gold);
      refreshTreatList();
      if (unlocked) {
        toast(`¡Nivel ${lvl}! Desbloqueado: ${unlocked.name} · +${fmtMoney(reward)} 🎉`);
      } else {
        toast(`¡Subiste a nivel ${lvl}! +${fmtMoney(reward)} 🎉`);
      }
      refreshHUD();
    };
  }

  // --- Ingreso pasivo al volver (idle) ------------------------------------
  function grantIdleBonus() {
    const away = (Date.now() - (game.state.lastTs || Date.now())) / 60000; // minutos
    if (away < 1) return;
    const mins = Math.min(away, CONFIG.idleCapMinutes);
    const bonus = Math.round(mins * CONFIG.idlePerMinPerLevel * game.state.level);
    if (bonus < 1000) return;
    game.state.addMoney(bonus);
    refreshHUD();
    setTimeout(() => {
      toast(`Mientras no estabas, tu clínica ganó ${fmtMoney(bonus)} 💰`);
      FX.floatText(game.particles, L.canvas.w / 2, 140, '+' + fmtMoney(bonus), PALETTE.gold);
    }, 700);
  }

  // --- Bucle principal -----------------------------------------------------
  let last = performance.now();
  function loop(now) {
    let dt = (now - last) / 1000;
    last = now;
    if (dt > 0.05) dt = 0.05;
    update(dt);
    game.renderer.draw(game);
    requestAnimationFrame(loop);
  }

  // --- Update (lógica) -----------------------------------------------------
  let saveAcc = 0;
  function update(dt) {
    game.time += dt;

    game.spawnTimer -= dt;
    if (game.spawnTimer <= 0) {
      trySpawn();
      game.spawnTimer = game.state.spawnInterval();
    }

    for (const bed of game.beds) {
      if (bed.appearT < 1) bed.appearT = Math.min(1, bed.appearT + dt * 2.2);
    }

    for (const p of game.patients) {
      const wasWaiting = p.state === 'waiting';
      p.update(dt, L.door);

      if (p.state === 'treating' && p.treatLeft <= 0 && !p._paid) {
        payout(p);
      }
      if (wasWaiting && p.state === 'leaving' && !p.happy && !p._counted) {
        p._counted = true;
        game.state.patientAngry();
        Sound.angry();
        FX.floatText(game.particles, p.x, p.y - 30, '−reputación', PALETTE.red);
        refreshHUD();
      }
    }

    if (game.patients.some(p => p.done)) {
      game.patients = game.patients.filter(p => !p.done);
      if (game.selected && game.selected.done) game.selected = null;
    }

    for (const pt of game.particles) pt.update(dt);
    if (game.particles.some(p => p.done)) {
      game.particles = game.particles.filter(p => !p.done);
    }

    saveAcc += dt;
    if (saveAcc >= CONFIG.autosaveSeconds) { saveAcc = 0; persist(); }
  }

  // --- Spawn ---------------------------------------------------------------
  function trySpawn() {
    const occupied = new Set(game.patients.filter(p => p.chairIndex != null).map(p => p.chairIndex));
    // La sala de espera admite como máximo CONFIG.waitingSeats pacientes.
    const seats = Math.min(CONFIG.waitingSeats, L.chairs.length);
    const freeChairs = [];
    for (let i = 0; i < seats; i++) if (!occupied.has(i)) freeChairs.push(i);
    if (freeChairs.length === 0) return; // sala llena: cliente perdido

    const chairIndex = freeChairs[Math.floor(Math.random() * freeChairs.length)];
    const unlocked = game.state.unlockedTreatments();
    const treatment = unlocked[Math.floor(Math.random() * unlocked.length)];
    const p = new Patient(treatment, L.chairs[chairIndex], chairIndex, L.door);
    // Paciente VIP: paga mucho más (desde cierto nivel). Enganche por sorpresa.
    if (game.state.level >= CONFIG.vipMinLevel && Math.random() < CONFIG.vipChance) {
      p.vip = true;
    }
    game.patients.push(p);
  }

  // --- Cobro de un tratamiento terminado ----------------------------------
  function payout(p) {
    p._paid = true;
    game.state.patientHappy();                 // sube la racha primero
    const combo = game.state.combo;
    const comboMult = game.state.comboMult();
    const vipMult = p.vip ? CONFIG.vipMult : 1;
    const total = Math.round(p.treatment.price * comboMult * vipMult);
    game.state.addMoney(total);
    game.state.addXp(p.treatment.xp);
    Sound.cash();
    const bx = p.bed ? p.bed.x : p.x;
    const by = p.bed ? p.bed.y - 20 : p.y - 20;
    FX.coins(game.particles, bx, by, p.vip ? 12 : 8);
    FX.floatText(game.particles, bx, by - 18, '+' + fmtMoney(total), PALETTE.gold);
    if (p.vip) FX.floatText(game.particles, bx, by - 36, '⭐ VIP x' + CONFIG.vipMult, PALETTE.gold);
    else if (combo >= 2) FX.floatText(game.particles, bx, by - 36, 'Racha x' + combo, PALETTE.blue);
    // Hitos de racha: feedback fuerte para enganchar.
    if (combo === 5 || combo === 10 || (combo > 0 && combo % 15 === 0)) {
      FX.confetti(game.particles, bx, by - 10, 40);
      toast(`🔥 ¡Racha de ${combo}! Pagos x${comboMult.toFixed(2)}`);
    }
    p.startLeaving(true);
    refreshHUD();
  }

  // --- Entrada del jugador -------------------------------------------------
  function canvasPos(evt) {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const src = evt.touches ? evt.touches[0] : evt;
    return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy };
  }

  function handleClick(evt) {
    Sound.unlock();
    game.started = true;
    const pos = canvasPos(evt);

    // 1) ¿Clic sobre una camilla con paciente seleccionado?
    const bed = bedAt(pos.x, pos.y);
    if (bed && game.selected) {
      if (!bed.isFree) { Sound.error(); return; }
      const t = game.selected.treatment;
      // Cobro de insumos al iniciar el tratamiento.
      if (!game.state.canAfford(t.cost)) {
        Sound.error();
        toast(`Necesitas ${fmtMoney(t.cost)} en insumos para ${t.name}. 💸`);
        return;
      }
      game.state.spend(t.cost);
      const sel = game.selected;
      sel.assignBed(bed);
      Sound.assign();
      if (t.cost > 0) FX.floatText(game.particles, bed.x, bed.y - 8, '−' + fmtMoney(t.cost), PALETTE.red);
      game.selected = null;
      updateHint();
      return;
    }

    // 2) ¿Clic sobre un paciente en espera?
    const patient = patientAt(pos.x, pos.y);
    if (patient && patient.isClickable()) {
      if (game.selected === patient) {
        patient.selected = false;
        game.selected = null;
      } else {
        if (game.selected) game.selected.selected = false;
        patient.selected = true;
        game.selected = patient;
        Sound.select();
        if (!game.beds.some(b => b.isFree)) {
          toast('No hay camillas libres. Compra una o espera. 🛏️');
        }
      }
      updateHint();
      return;
    }

    // 3) Clic en vacío: deseleccionar.
    if (game.selected) {
      game.selected.selected = false;
      game.selected = null;
      updateHint();
    }
  }

  function patientAt(x, y) {
    for (let i = game.patients.length - 1; i >= 0; i--) {
      const p = game.patients[i];
      if (!p.isClickable()) continue;
      if (Math.hypot(p.x - x, p.y - y) <= 24) return p;
    }
    return null;
  }

  function bedAt(x, y) {
    for (const b of game.beds) {
      if (x >= b.x - 60 && x <= b.x + 60 && y >= b.y - 38 && y <= b.y + 40) return b;
    }
    return null;
  }

  // --- HUD / UI ------------------------------------------------------------
  function refreshHUD() {
    el.money.textContent = fmtMoney(game.state.money);
    el.level.textContent = game.state.level;
    el.xpFill.style.width = (game.state.levelProgress() * 100).toFixed(1) + '%';
    el.served.textContent = game.state.served;
    el.stars.innerHTML = renderStars(game.state.reputation);
    refreshBuyButton();
  }

  function renderStars(rep) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (rep >= i) html += '<span class="star full">★</span>';
      else if (rep >= i - 0.5) html += '<span class="star half">★</span>';
      else html += '<span class="star">★</span>';
    }
    html += `<span class="rep-num">${rep.toFixed(1)}</span>`;
    return html;
  }

  function refreshBuyButton() {
    const cost = game.state.nextBedCost();
    if (cost === null) {
      el.buyBed.textContent = '🛏️ Camillas al máximo';
      el.buyBed.disabled = true;
      el.buyBed.classList.add('maxed');
      return;
    }
    el.buyBed.classList.remove('maxed');
    el.buyBed.innerHTML = `🛏️ Comprar camilla <b>${fmtMoney(cost)}</b>`;
    el.buyBed.disabled = !game.state.canAfford(cost);
  }

  function refreshTreatList() {
    el.treatList.innerHTML = '';
    TREATMENTS.forEach(t => {
      const unlocked = game.state.isUnlocked(t);
      const div = document.createElement('div');
      div.className = 'treat' + (unlocked ? '' : ' locked');
      div.title = t.desc || '';
      const right = unlocked
        ? `${fmtMoney(t.price)} · ${t.time}s`
        : `🔒 Nivel ${t.unlockLvl}`;
      div.innerHTML = `
        <span class="dot" style="background:${t.color}">${t.icon}</span>
        <span class="tname">${t.name}</span>
        <span class="tinfo">${right}</span>`;
      el.treatList.appendChild(div);
    });
  }

  function updateHint() {
    if (game.selected) {
      el.hint.textContent = '👉 Ahora haz clic en una camilla LIBRE para atender.';
      el.hint.classList.add('active');
    } else {
      el.hint.textContent = 'Haz clic en un paciente que espera, luego en una camilla libre.';
      el.hint.classList.remove('active');
    }
  }

  // --- Botones / eventos ---------------------------------------------------
  function bindUI() {
    canvas.addEventListener('mousedown', handleClick);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleClick(e); }, { passive: false });

    el.buyBed.addEventListener('click', () => {
      const cost = game.state.nextBedCost();
      if (cost === null) return;
      if (game.state.buyBed()) {
        const slot = L.bedSlots[game.state.beds - 1];
        const bed = new Bed(slot, game.state.beds - 1);
        bed.appearT = 0;
        game.beds.push(bed);
        Sound.buy();
        FX.coins(game.particles, slot.x, slot.y - 20, 5);
        toast('¡Nueva camilla lista! Más pacientes en paralelo. 🛏️');
        refreshHUD();
        persist();
      }
    });

    el.buyBed.addEventListener('mouseenter', () => { game.showBedHint = true; });
    el.buyBed.addEventListener('mouseleave', () => { game.showBedHint = false; });

    el.muteBtn.addEventListener('click', () => {
      Sound.setMuted(!Sound.isMuted());
      game.state.muted = Sound.isMuted();
      el.muteBtn.textContent = Sound.isMuted() ? '🔇' : '🔊';
      persist();
    });
    el.muteBtn.textContent = Sound.isMuted() ? '🔇' : '🔊';

    el.tutorialClose.addEventListener('click', hideTutorial);
    el.tutorial.addEventListener('click', (e) => { if (e.target === el.tutorial) hideTutorial(); });

    window.addEventListener('beforeunload', persist);
    document.addEventListener('visibilitychange', () => { if (document.hidden) persist(); });
  }

  function persist() {
    game.state.muted = Sound.isMuted();
    game.state.save();
  }

  // --- Tutorial + toasts ---------------------------------------------------
  function showTutorial() { el.tutorial.classList.add('show'); }
  function hideTutorial() { el.tutorial.classList.remove('show'); Sound.unlock(); }

  let toastTimer = null;
  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove('show'), 3400);
  }

  window.CLINIC = game;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
