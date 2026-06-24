/* ════════════════════════════════════════════════════════════════════════
 * jcm_saas_config.js — Configuración del proyecto Firebase del SaaS (UN solo
 * proyecto que sirve a TODAS las clínicas).
 *
 * ⚠️ ESTO NO ES UN SECRETO: la "config web" de Firebase (apiKey, projectId…)
 * es pública por diseño y va en el código del navegador. La seguridad NO
 * depende de esta clave, sino del login (Auth) y de las Reglas de Firestore.
 *
 * CÓMO OBTENERLA (una sola vez, ~5 min): ver FIREBASE_SETUP.md.
 * Mientras esté vacía, la app funciona en modo local (mono-clínica) como hoy.
 * ════════════════════════════════════════════════════════════════════════ */
window.JCSAAS_CONFIG = {
  // Pega aquí el objeto firebaseConfig que te da la consola de Firebase:
  // apiKey: "…", authDomain: "…", projectId: "…", appId: "…", etc.
};
