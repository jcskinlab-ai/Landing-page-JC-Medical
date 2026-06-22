/* ============================================================================
 * state.js — Estado del juego, economía y persistencia (localStorage)
 * ----------------------------------------------------------------------------
 * `GameState` concentra los números del jugador (dinero, XP, nivel, reputación,
 * camillas) y la economía. Lee balance/contenido desde data.js (CONFIG,
 * TREATMENTS, xpForLevel, levelUpReward). No conoce el render: así el core se
 * puede ampliar luego (personal, decoración) sin reescribir esto.
 * ==========================================================================*/

class GameState {
  constructor() {
    this.money = CONFIG.startMoney;
    this.xp = 0;
    this.level = CONFIG.startLevel;
    this.reputation = CONFIG.startReputation;
    this.beds = CONFIG.startBeds;
    this.muted = false;

    // Estadísticas de sesión (útiles para feedback y futuras misiones).
    this.served = 0;
    this.lost = 0;

    // Enganche: racha de pacientes felices y mejor racha histórica.
    this.combo = 0;
    this.bestCombo = 0;
    // Marca de tiempo del último guardado (para ingreso pasivo al volver).
    this.lastTs = Date.now();

    // Callbacks que el juego engancha para reaccionar a la economía.
    this.onLevelUp = null;       // (newLevel, unlockedTreatment|null, reward) => void
    this.onMoneyChange = null;   // () => void
  }

  // --- Tratamientos desbloqueados según nivel ------------------------------
  unlockedTreatments() {
    return TREATMENTS.filter(t => t.unlockLvl <= this.level);
  }

  isUnlocked(treatment) {
    return treatment.unlockLvl <= this.level;
  }

  // --- XP / niveles --------------------------------------------------------
  xpForNext() { return xpForLevel(this.level + 1); }
  xpForCurrent() { return xpForLevel(this.level); }

  // Progreso 0..1 dentro del nivel actual (para la barra de XP).
  levelProgress() {
    const next = this.xpForNext();
    const cur = this.xpForCurrent();
    if (next <= cur) return 1;
    return Math.max(0, Math.min(1, (this.xp - cur) / (next - cur)));
  }

  addXp(amount) {
    this.xp += amount;
    // Puede subir varios niveles de golpe.
    while (this.xp >= xpForLevel(this.level + 1)) {
      const before = this.unlockedTreatments();
      this.level += 1;
      const after = this.unlockedTreatments();
      const unlocked = after.find(t => !before.includes(t)) || null;
      const reward = levelUpReward(this.level);
      this.money += reward; // regalo por subir de nivel
      if (this.onLevelUp) this.onLevelUp(this.level, unlocked, reward);
    }
  }

  // --- Dinero --------------------------------------------------------------
  addMoney(amount) {
    this.money += amount;
    if (this.onMoneyChange) this.onMoneyChange();
  }

  canAfford(cost) { return this.money >= cost; }

  spend(cost) {
    if (!this.canAfford(cost)) return false;
    this.money -= cost;
    if (this.onMoneyChange) this.onMoneyChange();
    return true;
  }

  // --- Reputación ----------------------------------------------------------
  patientHappy() {
    this.reputation = Math.min(CONFIG.repMax, this.reputation + CONFIG.repGainHappy);
    this.served += 1;
    this.combo += 1;
    if (this.combo > this.bestCombo) this.bestCombo = this.combo;
  }

  patientAngry() {
    this.reputation = Math.max(CONFIG.repMin, this.reputation - CONFIG.repLossAngry);
    this.lost += 1;
    this.combo = 0; // perder un paciente corta la racha
  }

  // Multiplicador de pago por la racha actual (1ª atención = x1).
  comboMult() {
    const lvl = Math.min(Math.max(this.combo - 1, 0), CONFIG.comboMax);
    return 1 + lvl * CONFIG.comboStep;
  }

  // El intervalo de spawn baja (más rápido) cuanta más reputación hay:
  // intervalo = lerp(base, min, reputacion/repMax).
  spawnInterval() {
    const t = Math.max(0, Math.min(1, this.reputation / CONFIG.repMax));
    return CONFIG.spawnIntervalBase + (CONFIG.spawnIntervalMin - CONFIG.spawnIntervalBase) * t;
  }

  // --- Camillas ------------------------------------------------------------
  nextBedCost() {
    if (this.beds >= CONFIG.maxBeds) return null;
    const bought = this.beds - CONFIG.startBeds; // cuántas extra ya compradas
    return Math.round(CONFIG.bedCostBase * Math.pow(CONFIG.bedCostGrowth, bought));
  }

  buyBed() {
    const cost = this.nextBedCost();
    if (cost === null) return false;
    if (!this.spend(cost)) return false;
    this.beds += 1;
    return true;
  }

  // --- Persistencia --------------------------------------------------------
  save() {
    const data = {
      money: this.money, xp: this.xp, level: this.level,
      reputation: this.reputation, beds: this.beds, muted: this.muted,
      served: this.served, lost: this.lost,
      bestCombo: this.bestCombo, ts: Date.now(),
    };
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); }
    catch (e) { /* almacenamiento no disponible: el juego sigue sin guardar */ }
  }

  load() {
    let raw = null;
    try { raw = localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
    if (!raw) return false;
    try {
      const d = JSON.parse(raw);
      if (typeof d.money === 'number') this.money = d.money;
      if (typeof d.xp === 'number') this.xp = d.xp;
      if (typeof d.level === 'number') this.level = d.level;
      if (typeof d.reputation === 'number') this.reputation = d.reputation;
      if (typeof d.beds === 'number') this.beds = d.beds;
      if (typeof d.muted === 'boolean') this.muted = d.muted;
      if (typeof d.served === 'number') this.served = d.served;
      if (typeof d.lost === 'number') this.lost = d.lost;
      if (typeof d.bestCombo === 'number') this.bestCombo = d.bestCombo;
      if (typeof d.ts === 'number') this.lastTs = d.ts;
      return true;
    } catch (e) { return false; }
  }

  reset() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  }
}
