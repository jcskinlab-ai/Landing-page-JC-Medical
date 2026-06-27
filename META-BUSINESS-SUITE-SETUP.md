# Bandeja social (Meta Business Suite) en el panel — Scope del build real

Objetivo: ver y responder **DMs y comentarios de Instagram y Facebook** dentro del panel de Medique,
por clínica. Hoy el botón "Conectar" es cosmético. Esto es un **proyecto grande** (como WhatsApp),
porque Meta exige OAuth + Webhooks + **revisión de la app (App Review)**.

> ⚠️ Es del mismo tipo que WhatsApp y Google Drive: el código lo hacemos nosotros, pero **encender
> los permisos depende de Meta** (verificación del negocio + App Review), que tarda **semanas**.

---

## Qué hace, una vez listo
- **Bandeja unificada** en el panel: DMs de Instagram, mensajes de Facebook Messenger y comentarios de IG/FB.
- **Responder** desde el panel (sin entrar a la app de Meta).
- Multi-clínica: cada clínica conecta **su** página de Facebook + cuenta de Instagram Business.

---

## Lo que exige Meta (la parte que no se puede automatizar)

### Permisos (todos de "Acceso avanzado" → requieren App Review)
| Permiso | Para qué |
|---|---|
| `pages_messaging` | Mensajes de Facebook Messenger |
| `instagram_manage_messages` | DMs de Instagram |
| `pages_read_engagement` + `pages_manage_engagement` | Leer/responder comentarios de FB |
| `instagram_manage_comments` | Leer/responder comentarios de IG |
| `pages_show_list`, `instagram_basic`, `business_management` | Listar páginas/cuentas y vincularlas |

### Requisitos previos del dueño
1. **App de Meta** en developers.facebook.com (puede ser la MISMA que se use para WhatsApp).
2. **Cuenta de Instagram Business** vinculada a una **Página de Facebook**.
3. **Verificación del negocio** (Business Verification) — puede tardar días.
4. **App Review**: justificar cada permiso + a veces **video demo** del flujo. Semanas, puede rechazar y reintentar.

### Límite de 24 horas
Como WhatsApp: fuera de las 24 h desde el último mensaje del usuario, no se puede iniciar conversación
libre (solo respuestas dentro de la ventana). Esto NO se puede saltar.

---

## Arquitectura (lo que construimos nosotros)

1. **Conexión OAuth** (nuevo) — `api/meta-oauth.js`
   - El usuario pulsa "Conectar" → diálogo de Facebook Login con los permisos.
   - Callback: intercambia el código → **token de página de larga duración** + `page_id` + `ig_id`.
   - Se guarda por clínica en `tenants/{cid}` (token sensible → cifrado/seguro).
   - Necesita `META_APP_ID` + `META_APP_SECRET` (de la app de Meta).

2. **Webhook receptor** (nuevo) — `api/meta-social-webhook.js`
   - `GET` = verificación de Meta; `POST` = eventos (`messages`, `messaging_postbacks`, `feed`, `comments`).
   - Mapea `page_id` entrante → clínica.
   - **Persiste** cada mensaje/comentario en Firestore (`tenants/{cid}/social_inbox`) — esto es lo que lee la bandeja.
   - Requiere una **regla de `firestore.rules`** para esa colección (la publica el dueño).

3. **Envío de respuestas** (nuevo) — `api/meta-social-send.js`
   - Autenticado (sesión del panel) → envía DM/comentario vía el token de la página. Respeta la ventana de 24 h.

4. **UI de bandeja** (nuevo/reutiliza) — vista "Bandeja social"
   - Lista de conversaciones (IG/FB) + hilo + caja de respuesta. Se puede reusar el componente del inbox del Agente IA.

5. **Mantenimiento de tokens** — re-autenticar cuando un token de página expira/se invalida.

---

## Esfuerzo y tiempos (realista)
- **Código:** ~1–2 semanas (OAuth, webhook, envío, persistencia, mapeo página→clínica, UI, reglas).
- **Meta (verificación + App Review):** ~1–4 semanas de espera/idas y vueltas (externo, impredecible).
- **Total:** ~**3–6 semanas** de calendario, mandado mayormente por la aprobación de Meta.

## Riesgos / consideraciones
- App Review puede **rechazar** → reenviar con ajustes.
- Tokens de página expiran → hay que manejar re-conexión.
- Guardar mensajes de pacientes = **datos sensibles de salud** → cuidar privacidad/almacenamiento.
- Ventana de 24 h limita los mensajes proactivos.

---

## Plan por fases (recomendado)

**Fase 0 — Prueba real sin esperar a Meta (modo desarrollo, SOLO la página del dueño).**
En "modo desarrollo" la app puede usar estos permisos en las páginas de los **admins/testers** sin App Review.
→ Construimos OAuth + webhook + bandeja y lo probamos **end-to-end en la clínica del dueño**. Demuestra que
todo el pipeline funciona y el dueño ya la usa para su propia clínica.

**Fase 1 — Verificación del negocio + App Review** (para que CUALQUIER clínica pueda conectar su página).

**Fase 2 — Despliegue multi-clínica** (tras la aprobación): cada clínica conecta su FB/IG desde el panel.

> 💡 **Sinergia:** la app de Meta + verificación del negocio también se necesitan para **WhatsApp**.
> Conviene hacer una sola vez el setup de Meta (app + verificación) y cubrir las dos integraciones.

---

## Decisión para el dueño
- ¿Vamos por la **Fase 0** ya (bandeja real funcionando en la clínica del dueño, sin esperar a Meta)?
- ¿O primero arrancamos la **verificación del negocio + App Review** (porque es lo que más tarda) y mientras
  construimos el código?

La recomendación: **arrancar la verificación/App Review YA** (es lo lento) y en paralelo construir la Fase 0.
