/* ============================================================================
 * shared/sound.js — Sonidos sintetizados con WebAudio (sin archivos externos)
 * Global `Sound`. Reutilizable por todos los mini-juegos del hub.
 * ==========================================================================*/
/* Si el juego está embebido dentro de la app (iframe), ocultamos el botón
 * "← Menú" para que el único "atrás" sea el de la app y vuelva a la grilla. */
try { if (window.top !== window.self) document.documentElement.classList.add('jcm-embedded'); }
catch (e) { try { document.documentElement.classList.add('jcm-embedded'); } catch (e2) {} }
const Sound = (() => {
  let ctx = null, muted = false;
  function ensure(){
    if(!ctx){ try{ ctx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ ctx=null; } }
    if(ctx && ctx.state==='suspended') ctx.resume();
    return ctx;
  }
  function tone(freq,dur,type='sine',gain=0.16,when=0){
    if(muted) return;
    const ac=ensure(); if(!ac) return;
    const t0=ac.currentTime+when;
    const o=ac.createOscillator(), g=ac.createGain();
    o.type=type; o.frequency.setValueAtTime(freq,t0);
    g.gain.setValueAtTime(0.0001,t0);
    g.gain.exponentialRampToValueAtTime(gain,t0+0.012);
    g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    o.connect(g).connect(ac.destination);
    o.start(t0); o.stop(t0+dur+0.02);
  }
  return {
    setMuted(m){ muted=m; if(!muted) ensure(); },
    isMuted(){ return muted; },
    unlock(){ ensure(); },
    tone,
    click(){ tone(520,0.07,'triangle',0.12); },
    good(){ tone(660,0.08,'sine',0.12); tone(990,0.1,'sine',0.12,0.06); },
    cash(){ tone(880,0.1,'square',0.1); tone(1175,0.12,'square',0.1,0.08); tone(1568,0.16,'square',0.09,0.16); },
    win(){ [523,659,784,1047].forEach((f,i)=>tone(f,0.18,'triangle',0.12,i*0.09)); },
    bad(){ tone(220,0.18,'sawtooth',0.12); tone(160,0.22,'sawtooth',0.12,0.1); },
    error(){ tone(180,0.12,'square',0.1); },
  };
})();
