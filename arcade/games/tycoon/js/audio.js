/* ============================================================================
 * audio.js — Sonidos sintetizados con WebAudio (sin archivos externos)
 * ----------------------------------------------------------------------------
 * Expone `Sound` global con métodos cortos para cada evento del juego y un
 * toggle de silencio. El AudioContext se crea/reanuda con el primer gesto del
 * usuario (requisito de los navegadores).
 * ==========================================================================*/

const Sound = (() => {
  let ctx = null;
  let muted = false;

  function ensure() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { ctx = null; }
    }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // Genera un tono simple con envolvente para que no suene "plano".
  function tone(freq, dur, type = 'sine', gain = 0.18, when = 0) {
    if (muted) return;
    const ac = ensure();
    if (!ac) return;
    const t0 = ac.currentTime + when;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  return {
    setMuted(m) { muted = m; if (!muted) ensure(); },
    isMuted() { return muted; },
    unlock() { ensure(); },

    // Eventos del juego --------------------------------------------------
    select()  { tone(520, 0.08, 'triangle', 0.12); },
    assign()  { tone(440, 0.07, 'sine', 0.12); tone(660, 0.09, 'sine', 0.12, 0.06); },
    cash()    { // "cha-ching" ascendente
      tone(880, 0.10, 'square', 0.10);
      tone(1175, 0.12, 'square', 0.10, 0.08);
      tone(1568, 0.16, 'square', 0.09, 0.16);
    },
    levelUp() { // arpegio alegre
      [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', 0.12, i * 0.09));
    },
    angry()   { tone(220, 0.18, 'sawtooth', 0.12); tone(160, 0.22, 'sawtooth', 0.12, 0.1); },
    error()   { tone(180, 0.12, 'square', 0.10); },
    buy()     { tone(660, 0.10, 'triangle', 0.12); tone(990, 0.14, 'triangle', 0.11, 0.08); },
  };
})();
