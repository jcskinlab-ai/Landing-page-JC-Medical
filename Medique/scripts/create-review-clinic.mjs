// Medique · Crea una clínica NUEVA y la vincula a una cuenta de Firebase Auth ya existente
// (p. ej. medique.cl@gmail.com, que hoy solo tiene el claim superAdmin para /super pero
// no tiene un documento users/{uid} → clinicId, por eso el login normal se queda pegado
// en "Entrando..." para siempre).
//
// Uso:
//   node create-review-clinic.mjs ./serviceAccount.json medique.cl@gmail.com "Revisión Medique"

import admin from "firebase-admin";
import { readFileSync } from "node:fs";

const svcPath = process.argv[2] || "./serviceAccount.json";
const email = (process.argv[3] || "medique.cl@gmail.com").trim().toLowerCase();
const clinicName = (process.argv[4] || "Revisión Medique").trim();

let svc;
try {
  svc = JSON.parse(readFileSync(svcPath, "utf8"));
} catch (e) {
  console.error("No pude leer el service account en:", svcPath, "\n", e.message);
  process.exit(1);
}

admin.initializeApp({ credential: admin.credential.cert(svc) });
const db = admin.firestore();

function slug(s) {
  return (s || "clinica").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 28) || "clinica";
}

try {
  const user = await admin.auth().getUserByEmail(email);
  const uid = user.uid;

  const existing = await db.collection("users").doc(uid).get();
  if (existing.exists) {
    console.log("Este usuario YA tiene un users/{uid} doc:", JSON.stringify(existing.data()));
    console.log("No se creó nada nuevo (para no pisar una clínica existente).");
    process.exit(0);
  }

  const clinicId = slug(clinicName) + "-" + uid.slice(0, 6);
  const now = Date.now();
  const clinic = {
    id: clinicId,
    name: clinicName,
    ownerUid: uid,
    ownerEmail: email,
    plan: "active", // activa de inmediato, sin esperar aprobación (es la cuenta del propio super-admin)
    trialEnds: 0,
    createdAt: now,
    branding: { name: clinicName }
  };

  await db.collection("clinics").doc(clinicId).set(clinic);
  await db.collection("users").doc(uid).set({ clinicId, role: "owner", email, createdAt: now });

  console.log("✓ Clínica creada:", clinicId);
  console.log("✓ Vinculada a", email, "(uid:", uid + ") como owner");
  console.log("  Ya puede iniciar sesión normalmente en portal.medique.cl");
  process.exit(0);
} catch (e) {
  console.error("Error:", e.message);
  process.exit(1);
}
