# Activar el agente IA en WhatsApp (Meta Cloud API)

Esta guía es para el **dueño de la cuenta** (la parte que no se puede automatizar). El "cerebro" ya está
programado en `api/wa-webhook.js`: recibe los mensajes, responde con IA y **crea la reserva en la agenda**.
Solo falta **encender el canal de WhatsApp en Meta** y pegar 4 datos en Vercel.

> ⚠️ Lo que más demora es la **verificación del negocio** en Meta (puede tardar días). Empieza por eso.

---

## Qué necesitas antes de partir
- Una cuenta de **Facebook / Meta Business** (business.facebook.com).
- Un **número de teléfono dedicado** para el bot (NO uses uno que ya tenga la app normal de WhatsApp instalada; Meta lo "toma" para la API).
- El proyecto desplegado en Vercel (ya lo está).

---

## Paso 1 — Crear la app de WhatsApp en Meta
1. Entra a **developers.facebook.com** → **My Apps** → **Create App** → tipo **Business**.
2. En la app, agrega el producto **WhatsApp** → **Set up**.
3. Meta te da un **número de prueba** y un **Phone Number ID**. Para producción, en **API Setup** agregas tu número real (te llega un código por SMS/llamada para verificarlo).

## Paso 2 — Conseguir el token permanente
El token que se ve al principio es **temporal (24 h)**. Para uno permanente:
1. business.facebook.com → **Configuración del negocio** → **Usuarios → Usuarios del sistema** → **Agregar** (rol Admin).
2. **Generar token** para ese usuario, con permisos **`whatsapp_business_messaging`** y **`whatsapp_business_management`**.
3. Guarda ese token → será `WHATSAPP_TOKEN`.
4. En **API Setup** copia el **Phone Number ID** → será `WHATSAPP_PHONE_ID`.

## Paso 3 — Conectar el webhook (esto enlaza WhatsApp con Medique)
1. En la app → **WhatsApp → Configuration → Webhook → Edit**.
2. **Callback URL:** `https://medique.cl/api/wa-webhook`
   *(si ese dominio no resuelve, usa la URL de Vercel del proyecto: `https://TU-PROYECTO.vercel.app/api/wa-webhook`)*
3. **Verify token:** inventa una palabra secreta (ej. `medique-wa-2026`). **La misma** la pones en Vercel como `WHATSAPP_VERIFY_TOKEN`.
4. Clic en **Verify and save** → debe quedar verificado (el webhook responde el "challenge" automáticamente).
5. En **Webhook fields**, suscríbete a **`messages`**. ✅

## Paso 4 — Variables en Vercel
Vercel → tu proyecto → **Settings → Environment Variables** (Production):

| Variable | Valor |
|---|---|
| `WHATSAPP_TOKEN` | el token permanente del Paso 2 |
| `WHATSAPP_PHONE_ID` | el Phone Number ID del Paso 2 |
| `WHATSAPP_VERIFY_TOKEN` | la palabra secreta que inventaste (la misma del Paso 3) |
| `GROQ_API_KEY` | la clave de Groq (el cerebro IA) |
| `WA_CLINIC_ID` | *(opcional)* la clínica a la que entran las reservas. Por defecto: `jc-medical-qI9deP` |
| `WA_CLINIC_NAME` | *(opcional)* nombre de la clínica para el saludo del bot |

Después de agregarlas, haz **Redeploy** en Vercel.

## Paso 5 — Verificación del negocio (para salir del modo prueba)
- En modo prueba, el bot solo responde a números que agregues a mano.
- Para responder a **cualquier** paciente, Meta exige **verificar el negocio** (Business Verification): subir datos de la empresa. Puede tardar días. Hazlo desde **Configuración del negocio → Seguridad → Verificación del negocio**.

---

## Cómo probar
1. Con el modo prueba: agrega tu propio número en **API Setup → To**.
2. Escríbele al número del bot por WhatsApp: *"Hola, quiero agendar botox"*.
3. El bot debería responder, pedirte nombre/fecha/hora y, al confirmar, **crear la reserva** → aparece sola en la **agenda del panel**.

## Costo (recordatorio)
- 🟢 Si el **paciente escribe primero** (caso reserva) → **gratis** dentro de las 24 h.
- 🟡 Si **tú inicias** (recordatorios) → unos centavos por mensaje (plantilla aprobada).
- El costo del cerebro IA (Groq) es aparte y muy bajo.

---

## Notas técnicas (para quien mantenga el código)
- Endpoint: `api/wa-webhook.js`. `GET` = verificación de Meta; `POST` = mensajes entrantes.
- La reserva se crea en `tenants/{WA_CLINIC_ID}/bookings` vía Firestore REST (regla pública de `bookings`),
  con `source: "whatsapp"` — idéntica a la reserva del sitio, por eso aparece en la agenda sin más.
- La memoria de conversación es **en RAM** (se reinicia en cold starts). Suficiente para una reserva corta;
  si se quiere persistente, mover la sesión a Firestore.
- v1 mono-número (un número → una clínica vía `WA_CLINIC_ID`). Para multi-clínica con varios números,
  mapear el `phone_number_id` entrante → clínica.
