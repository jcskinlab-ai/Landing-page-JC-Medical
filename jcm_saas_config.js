/* ════════════════════════════════════════════════════════════════════════
 * jcm_saas_config.js — Configuración del proyecto Firebase del SaaS (UN solo
 * proyecto que sirve a TODAS las clínicas).
 *
 * ⚠️ ESTO NO ES UN SECRETO: la "config web" de Firebase (apiKey, projectId…)
 * es pública por diseño y va en el código del navegador. La seguridad NO
 * depende de esta clave, sino del login (Auth) y de las Reglas de Firestore.
 *
 * Mientras esté vacía, la app funciona en modo local (mono-clínica) como hoy.
 * ════════════════════════════════════════════════════════════════════════ */
window.JCSAAS_CONFIG = {
  apiKey: "AIzaSyCIG19u0_T6rldljMq_St-WJ-XX8JkAsM4",
  authDomain: "medique-8dbf6.firebaseapp.com",
  projectId: "medique-8dbf6",
  storageBucket: "medique-8dbf6.firebasestorage.app",
  messagingSenderId: "881482942178",
  appId: "1:881482942178:web:4890bca82cc82625fe40bb",
  measurementId: "G-GT15YYTP0S",
  // App Check (anti-abuso) — SITE KEY de reCAPTCHA v3 (es público). Activo.
  appCheckKey: "6Lf3xzItAAAAAIsYLwPl-HbuV_yUC4mMY4u1OEXR",

  // 2FA por email en dispositivo nuevo. ACTIVO. Requiere en Vercel: OTP_SECRET + (RESEND_API_KEY
  // o N8N_OTP_URL). Si esas variables faltan, el endpoint responde 503 y el 2FA FALLA-ABIERTO
  // (no bloquea el login) — así no deja a nadie afuera mientras configuras el canal de email.
  mfa: true
};

/* Mapa dominio → clínica: en estos dominios la app de pacientes y la reserva
 * (sin ?c en la URL) quedan enlazadas a esta clínica en Firebase.
 * jcmedical.cl es el dominio propio de JC Medical → su clinicId.
 * (Pega el clinicId de JC Medical; lo obtienes en /admin con el botón "Link reserva".) */
window.JCSAAS_HOSTS = {
  "jcmedical.cl": "jc-medical-qI9deP",
  "www.jcmedical.cl": "jc-medical-qI9deP"
};
