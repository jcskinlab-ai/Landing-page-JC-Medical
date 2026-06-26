# Cambios pendientes — Acciones para el dueño de Firebase + Vercel

Hola 👋 Hicimos una auditoría completa del panel (`medique.cl/panel`) y arreglamos varios bugs de seguridad y de pérdida de datos. **El código ya está en la rama `JORCEB`** lista para revisar/mergear.

Pero hay **3 cosas que solo tú puedes hacer**, porque requieren acceso a las consolas de Firebase y Vercel (que están en tu cuenta). Sin estos pasos, algunos de los arreglos de seguridad **no se activan**.

---

## ⚠️ IMPORTANTE — Orden recomendado

Hacé los pasos **en este orden** para no bloquearte a vos mismo del panel:

1. Primero **el Paso 2** (asignar super-admin) → así no perdés acceso.
2. Después **el Paso 1** (publicar reglas).
3. Después **el Paso 3** (variables de entorno).

---

## Paso 1 — Publicar las reglas de seguridad de Firestore 🔒

**Qué hace:** Hoy cualquier clínica con sesión iniciada podría (técnicamente) leer datos de otra clínica o auto-activarse el plan gratis para siempre. Las nuevas reglas **aíslan los datos por clínica** y mueven la validación del plan al servidor (antes estaba solo en el navegador, o sea, se podía saltar).

**Cómo:**

1. Entrá a [Firebase Console](https://console.firebase.google.com/) → proyecto **medique-8dbf6**.
2. Menú lateral → **Firestore Database** → pestaña **"Reglas" (Rules)**.
3. Borrá todo lo que haya y pegá el contenido completo del archivo **`firestore.rules`** (está en la raíz del repo).
4. Clic en **"Publicar" (Publish)**.

> 📄 El archivo está acá: `firestore.rules` — copialo tal cual, completo.

---

## Paso 2 — Marcarte como Super-Admin 👑

**Qué hace:** Antes, el super-admin se identificaba por un **email hardcodeado en el código** (`medique.cl@gmail.com`) — un riesgo de seguridad. Lo quitamos. Ahora el super-admin se define con un **"custom claim"** de Firebase, que es la forma correcta y segura.

**⚠️ Si no hacés este paso ANTES de publicar las reglas, vas a perder el acceso de super-admin al panel `/admin`.**

**Cómo (necesitás Node.js instalado):**

1. En Firebase Console → ⚙️ **Configuración del proyecto** → pestaña **"Cuentas de servicio"** → **"Generar nueva clave privada"**. Te descarga un archivo `.json` (guardalo, es secreto).

2. Averiguá tu **UID**: Firebase Console → **Authentication** → buscá tu usuario (`jorgeceballossegura@gmail.com` o el que uses de super-admin) → copiá el **User UID**.

3. Creá un archivo `set-super.js` con esto (cambiá las 2 líneas marcadas):

```javascript
const admin = require("firebase-admin");
const serviceAccount = require("./TU-ARCHIVO-DESCARGADO.json"); // ← nombre del .json del paso 1

admin.initializeApp({ credential: admin.cert(serviceAccount) });

const UID = "PEGA-AQUI-TU-UID"; // ← el UID del paso 2

admin.auth().setCustomUserClaims(UID, { superAdmin: true })
  .then(() => { console.log("✅ Listo. Ya sos super-admin."); process.exit(0); })
  .catch(e => { console.error("❌ Error:", e); process.exit(1); });
```

4. En la terminal, en esa carpeta:

```bash
npm install firebase-admin
node set-super.js
```

5. **Cerrá sesión y volvé a entrar** al panel para que tome el nuevo permiso.

> 💡 Borrá el `.json` y el `set-super.js` cuando termines — no deben subirse a git.

---

## Paso 3 — Variables de entorno en Vercel ⚙️

**Qué hace:** Las claves de las APIs (IA, Meta Ads, reservas) deben vivir en el **servidor**, no en el código. Configurá estas en Vercel para que las funciones funcionen.

**Cómo:** Vercel → tu proyecto → **Settings** → **Environment Variables** → agregá cada una (Environment: **Production**):

| Variable | Para qué sirve | ¿Obligatoria? |
|----------|----------------|----------------|
| `FIREBASE_PROJECT_ID` | Verifica el login en las APIs. Poné: `medique-8dbf6` | ✅ Sí |
| `GROQ_API_KEY` | Bot de IA (WhatsApp). La generás en [console.groq.com/keys](https://console.groq.com/keys) | ✅ Sí (si usan IA) |
| `GROQ_MODEL` | Modelo de IA. Default: `llama-3.3-70b-versatile` | ⬜ Opcional |
| `N8N_WEBHOOK_URL` | Recibe las reservas de pacientes (formulario público) | ✅ Sí (si usan reservas) |
| `META_ACCESS_TOKEN` | Métricas de Meta Ads (Facebook/Instagram) | ⬜ Solo si usan Meta Ads |
| `META_AD_ACCOUNT_ID` | ID de la cuenta publicitaria de Meta | ⬜ Solo si usan Meta Ads |
| `RESEND_API_KEY` | **Envío de correos** (confirmaciones/recordatorios). Gratis 3.000/mes en [resend.com/api-keys](https://resend.com/api-keys) | ✅ Sí (si usan Correo) |
| `MAIL_FROM` | Remitente de los correos, ej. `Medique <hola@medique.cl>`. Si no se pone, usa `onboarding@resend.dev` (funciona para pruebas sin verificar dominio) | ⬜ Opcional |
| `JCM_API_KEY` | Clave interna extra (capa de seguridad opcional) | ⬜ Opcional |

> Después de agregar las variables, hacé un **redeploy** en Vercel para que tomen efecto.

**Sobre el Correo (nuevo):** con solo `RESEND_API_KEY` ya envía correos reales (desde `onboarding@resend.dev`, ideal para probar). Para que salgan **desde tu dominio** (`@medique.cl`) y no caigan en spam: en Resend → **Domains** → agregá `medique.cl`, copiá los registros DNS que te da (SPF/DKIM) donde tengas el dominio, y una vez verificado poné `MAIL_FROM = Medique <hola@medique.cl>`. En el panel, **Integraciones → Correo → Conectar** envía un correo de prueba para confirmar que quedó andando.

---

## 💬 Nota sobre el bot de IA (Groq)

Hoy **todas las clínicas comparten la misma clave de Groq** (`GROQ_API_KEY`). Eso significa que si una clínica usa mucho el bot, **consume el cupo de todas** y puede dejar a las demás sin servicio.

Ya pusimos un **límite de uso por clínica** (30 mensajes/min, 500/día) como parche temporal. Pero la solución ideal a futuro es que **cada clínica ponga su propia clave de Groq** (es gratis de generar). Eso lo podemos conversar y dejar implementado más adelante si te parece.

---

## ✅ Resumen de lo que YA está hecho (en la rama `JORCEB`)

- 🔒 Aislamiento de datos entre clínicas + validación de plan en servidor (reglas Firestore)
- 🔒 CORS y verificación de sesión en las APIs de IA y Meta Ads
- 🔒 Límite de uso del bot de IA por clínica
- 🐛 Arreglada la **pantalla negra** al iniciar sesión (error de compilación)
- 🐛 Arreglados varios bugs de **pérdida de datos** (fichas, servicios, marketing, reportes, caja no se guardaban bien)
- 🐛 Confirmaciones antes de borrar (paciente, servicio, plantilla, tarea) con un modal lindo
- 🐛 Validaciones de RUT, email y teléfono al editar pacientes
- ✨ Botón para **eliminar pacientes** (no existía)

**Falta (lo seguimos nosotros):** ajustar unos KPIs del Agente IA, conectar botones de WhatsApp, y métrica de "no-show" en reportes.

---

¿Dudas con algún paso? Avisame y lo vemos juntos. 🙌
