// Medique · Operaciones privilegiadas de super-admin (Vercel Serverless Function)
// Usa Firebase Admin SDK para operaciones que el cliente no puede hacer:
//   - Eliminar usuario de Firebase Auth + toda su data de Firestore (incluyendo subcolecciones)
//   - Cambiar el correo de ingreso de una clínica
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   FIREBASE_SERVICE_ACCOUNT_JSON  = JSON completo de la cuenta de servicio
//                                    (Firebase Console → Project Settings → Service accounts → Generate new key)
//   FIREBASE_PROJECT_ID            = (opcional) por defecto 'medique-8dbf6'
//   RESEND_API_KEY                 = (ya debe estar) para enviar notificaciones de correo

import crypto from "node:crypto";

const SUPER_EMAIL  = "medique.cl@gmail.com";
const PROJECT_ID   = process.env.FIREBASE_PROJECT_ID || "medique-8dbf6";
const RESEND_URL   = "https://api.resend.com/emails";
const ALLOWED_ORIGINS = [
  "https://admin.medique.cl",
  "https://medique.cl",
  "https://portal.medique.cl",
];

// ── Firebase Admin SDK (lazy init, se reutiliza entre invocaciones calientes) ──
let _svc = null;
async function getAdminServices() {
  if (_svc) return _svc;
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!svcJson) throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_JSON no está configurado. Agrégalo en Vercel → Settings → Environment Variables."
  );
  const { initializeApp, cert, getApps, getApp } = await import("firebase-admin/app");
  const { getAuth }      = await import("firebase-admin/auth");
  const { getFirestore } = await import("firebase-admin/firestore");
  const credential = cert(JSON.parse(svcJson));
  const appName = "super-ops";
  const app = getApps().find(a => a.name === appName) || initializeApp({ credential }, appName);
  _svc = { auth: getAuth(app), db: getFirestore(app) };
  return _svc;
}

// ── Verificación del ID token de Firebase (sin Admin SDK, igual que otros endpoints) ──
const CERTS_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
let _certCache = { at: 0, certs: null };
async function googleCerts() {
  const now = Date.now();
  if (_certCache.certs && now - _certCache.at < 3600000) return _certCache.certs;
  const r = await fetch(CERTS_URL);
  _certCache = { at: now, certs: await r.json() };
  return _certCache.certs;
}
function b64buf(s) { s = String(s).replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return Buffer.from(s, "base64"); }
async function verifyFirebaseToken(token) {
  const parts = (token || "").split(".");
  if (parts.length !== 3) throw new Error("token mal formado");
  const header = JSON.parse(b64buf(parts[0]).toString("utf8"));
  if (header.alg !== "RS256" || !header.kid) throw new Error("alg/kid inválido");
  const certs = await googleCerts();
  const pem = certs[header.kid];
  if (!pem) throw new Error("kid desconocido");
  const pub = new crypto.X509Certificate(pem).publicKey;
  const ok  = crypto.createVerify("RSA-SHA256").update(parts[0] + "." + parts[1]).verify(pub, b64buf(parts[2]));
  if (!ok) throw new Error("firma inválida");
  const p   = JSON.parse(b64buf(parts[1]).toString("utf8"));
  const now = Math.floor(Date.now() / 1000);
  if (!p.exp || p.exp <= now) throw new Error("token expirado");
  if (p.aud !== PROJECT_ID)   throw new Error("aud inválido");
  return p;
}

// ── Borrar todos los docs de una colección, paginando ──
async function purgeCollection(db, colRef, pageSize = 100) {
  const snap = await colRef.limit(pageSize).get();
  if (snap.empty) return;
  const batch = db.batch();
  snap.docs.forEach(d => batch.delete(d.ref));
  await batch.commit();
  if (snap.size >= pageSize) return purgeCollection(db, colRef, pageSize);
}

// ── Borrar un doc + todas sus subcolecciones ──
async function purgeDoc(db, docRef) {
  try {
    const subcols = await docRef.listCollections();
    await Promise.all(subcols.map(col => purgeCollection(db, col)));
  } catch (_) {}
  await docRef.delete().catch(() => {});
}

// ── Enviar email de notificación (usa RESEND_API_KEY ya configurado) ──
async function sendNotification(to, subject, html) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const from = process.env.MAIL_FROM || "Medique <noreply@medique.cl>";
  await fetch(RESEND_URL, {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  }).catch(() => {});
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const safeOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin",  safeOrigin);
  res.setHeader("Vary",                         "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")   return res.status(405).json({ error: "Método no permitido" });

  try {
    // Verificar token y que el llamante sea el super-admin
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!token) return res.status(401).json({ error: "Sin token de autenticación" });
    const payload = await verifyFirebaseToken(token);
    if ((payload.email || "").toLowerCase() !== SUPER_EMAIL.toLowerCase()) {
      return res.status(403).json({ error: "Solo el super-admin puede ejecutar estas operaciones" });
    }

    const body = req.body || {};
    const { action, clinicId, ownerUid, ownerEmail, newEmail, clinicName } = body;
    const { auth, db } = await getAdminServices();

    // ════════════════════════════════════
    // Eliminar clínica completa
    // ════════════════════════════════════
    if (action === "deleteClinic") {
      if (!clinicId) return res.status(400).json({ error: "clinicId requerido" });

      await Promise.all([
        // Toda la data de la clínica (kv, bookings, public, reviews, appusers, collabs…)
        purgeDoc(db, db.collection("tenants").doc(clinicId)),
        // Perfil de la clínica
        db.collection("clinics").doc(clinicId).delete().catch(() => {}),
        // Mapeo usuario → clínica
        ownerUid ? db.collection("users").doc(ownerUid).delete().catch(() => {}) : null,
        // Cuenta de Firebase Auth (el usuario ya no puede entrar con ese correo)
        ownerUid ? auth.deleteUser(ownerUid).catch(() => {}) : null,
      ].filter(Boolean));

      return res.json({ ok: true, message: `Clínica "${clinicName || clinicId}" eliminada completamente.` });
    }

    // ════════════════════════════════════
    // Reiniciar datos de una clínica (mantiene la cuenta de acceso)
    // Borra TODA la data operativa (tenants/{clinicId}: kv, bookings, public,
    // reviews, appusers, collabs…) pero NO toca clinics/{id}, users/{uid} ni la
    // cuenta de Firebase Auth — el mismo correo/contraseña sigue sirviendo para
    // entrar, y el panel arranca vacío (onboarding incluido, porque onboarded_v1
    // vive dentro de kv y se borra con el resto).
    // ════════════════════════════════════
    if (action === "resetClinicData") {
      if (!clinicId) return res.status(400).json({ error: "clinicId requerido" });

      await purgeDoc(db, db.collection("tenants").doc(clinicId));

      return res.json({ ok: true, message: `Datos de "${clinicName || clinicId}" reiniciados. La cuenta de acceso sigue funcionando igual.` });
    }

    // ════════════════════════════════════
    // Cambiar correo de ingreso
    // ════════════════════════════════════
    if (action === "changeEmail") {
      if (!ownerUid || !clinicId || !newEmail) {
        return res.status(400).json({ error: "Faltan datos: ownerUid, clinicId y newEmail son requeridos" });
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(newEmail)) return res.status(400).json({ error: "El nuevo correo no tiene un formato válido" });
      if (newEmail.toLowerCase() === (ownerEmail || "").toLowerCase()) {
        return res.status(400).json({ error: "El nuevo correo es igual al actual" });
      }

      // 1. Cambiar en Firebase Auth
      await auth.updateUser(ownerUid, { email: newEmail });

      // 2. Actualizar en Firestore
      await Promise.all([
        db.collection("clinics").doc(clinicId).update({ ownerEmail: newEmail }),
        db.collection("users").doc(ownerUid).update({ email: newEmail }).catch(() => {}),
      ]);

      // 3. Notificar al correo anterior (aviso de seguridad)
      if (ownerEmail && ownerEmail.toLowerCase() !== newEmail.toLowerCase()) {
        const nameLabel = clinicName || clinicId;
        await sendNotification(
          ownerEmail,
          "Tu correo de acceso a Medique ha cambiado",
          `<div style="font-family:sans-serif;max-width:480px;margin:auto">
            <h2 style="color:#222">Cambio de correo — ${nameLabel}</h2>
            <p>El correo de ingreso a tu panel Medique ha sido actualizado por el administrador de la plataforma.</p>
            <p><b>Nuevo correo de acceso:</b> ${newEmail}</p>
            <p>Desde ahora ingresa en <a href="https://portal.medique.cl">portal.medique.cl</a> con ese correo y tu contraseña habitual.</p>
            <p style="color:#c0285a">Si no reconoces este cambio, responde este correo de inmediato.</p>
            <p style="color:#888;font-size:11px">Medique · admin.medique.cl</p>
          </div>`
        );
      }
      // 4. Notificar al nuevo correo
      await sendNotification(
        newEmail,
        "Acceso a Medique configurado con este correo",
        `<div style="font-family:sans-serif;max-width:480px;margin:auto">
          <h2 style="color:#222">Correo de acceso actualizado</h2>
          <p>Este correo (<b>${newEmail}</b>) es ahora el correo de ingreso para el panel de <b>${clinicName || clinicId}</b> en Medique.</p>
          <p>Ingresa en <a href="https://portal.medique.cl">portal.medique.cl</a> con esta dirección y tu contraseña habitual.</p>
          <p style="color:#888;font-size:11px">Medique · admin.medique.cl</p>
        </div>`
      );

      return res.json({ ok: true, message: `Correo actualizado a ${newEmail}. Se enviaron notificaciones a ambas direcciones.` });
    }

    return res.status(400).json({ error: "Acción desconocida: " + action });

  } catch (e) {
    console.error("[super-ops]", e.message || e);
    const msg = e.message || "Error interno";
    // Mensajes de Auth más amigables
    const friendly = msg.includes("no user record") ? "No se encontró el usuario en Firebase Auth (puede que ya estuviera eliminado)."
      : msg.includes("email-already-exists") ? "Ese correo ya está en uso por otra cuenta de Firebase."
      : msg.includes("invalid-email") ? "El correo no es válido para Firebase Auth."
      : msg;
    return res.status(500).json({ error: friendly });
  }
}
