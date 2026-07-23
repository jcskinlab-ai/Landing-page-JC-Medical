# Resumen de sesión — Seguridad, bugs y errores del panel Medique

**Fecha:** 2026-07-14 · **Rama base:** `main` (al día con `origin/main`) · **Estado:** ✅ TODO EN LOCAL — **0 commits, 0 push, 0 deploy.**

Este documento resume **todos** los cambios de la sesión para revisión del socio antes de armar el PR. Los arreglos se basan en la auditoría interna (`MEDIQUE-AUDITORIA.md`); los códigos (C-01, ALTO-07, etc.) corresponden a esa auditoría.

> **Regla de trabajo:** nada se desplegó. Se acumuló un lote y se recompiló `dist`. El deploy lo autoriza el dueño (merge del PR + publicar reglas + envs).

---

## 1. Qué se arregló (por categoría)

### 🔒 Seguridad — aislamiento entre clínicas (lo más urgente)
| Código | Problema | Arreglo | Archivo |
|--------|----------|---------|---------|
| **C-01** | El `create` de `users/{uid}` aceptaba cualquier `clinicId` → un usuario se auto-asignaba la clínica de otro y leía sus datos. | Ahora exige ser **dueño** de esa clínica (`clinics/{id}.ownerUid == auth.uid`). Verificado que no rompe el registro (clinics se crea antes que users). | `firestore.rules` |
| **C-02** | `appusers` se podía crear **y actualizar sin login** en cualquier clínica → sobrescribir/spamear usuarios ajenos. | Alta pública acotada (shape + `createdAt` ±5 min + clínica activa); **update ya no es público**. | `firestore.rules` |
| **ALTO-01** | Reservas/colaboraciones/reseñas se creaban en clínicas inexistentes o suspendidas (spam). | Ahora exigen **clínica activa** (`clinicActive`). | `firestore.rules` |
| **C-03** | `/api/calendar` firmaba el token de suscripción con el `clinicId` **del body** → cualquiera pedía la agenda `.ics` (paciente, teléfono, procedimiento) de otra clínica. | Resuelve la clínica del **llamante** en el servidor (`users/{uid}.clinicId`); ignora el body. | `api/calendar.js` |
| **ALTO-03** | Un profesional sin permiso de Pacientes igual veía las fichas escribiendo la URL (escape `\|\| section === 'pacientes'`). | Quitado el escape → Pacientes se gatea por permiso como el resto. | `jc-admin/jc-admin.jsx` |
| **M** | `/api/cron` quedaba **público** si faltaba `CRON_SECRET`. | `CRON_SECRET` **obligatorio**: 503 si falta, 401 si no coincide. | `api/cron.js` |
| **M** | `.gitignore` no ignoraba `.env`. | Agregados `.env` y `.env.*`. | `.gitignore` |

### 🩺 Integridad de datos médicos
| Código | Problema | Arreglo | Archivo |
|--------|----------|---------|---------|
| **C-06** | `DB.set` fallaba en silencio: tras el 1er error todo guardado siguiente era mudo y el "✓ Guardado" salía igual (dato perdido). | Se avisa en **cada** fallo (throttle), sin `throw` para no romper flujos. | `jcm_shared.js` |
| **C-07** | `optimizePatientsBlock` borraba las firmas del consentimiento **sin verificar** que se guardaron → si el write fallaba, se perdía la firma. | Solo borra las firmas inline si `DB.get` confirma el guardado (como el bloque de imágenes). | `jc-admin/jc-admin-c.jsx` |
| **C-05** | El médico responsable (nombre/RUT/registro MINSAL) se leía en vivo → editar la lista de médicos **falseaba retroactivamente** consentimientos ya firmados. | Se **congela** el médico dentro del consentimiento al firmar; al imprimir usa el congelado. | `jc-admin/jc-admin-b.jsx` |

### 💥 Errores y robustez
| Código | Problema | Arreglo | Archivo |
|--------|----------|---------|---------|
| **ALTO-08** | Una excepción en render dejaba **pantalla en blanco** sin recuperación. | `ErrorBoundary` global + captura de errores → aviso con botón "Recargar". | `jc-admin/jc-admin.jsx` |
| **ALTO-07** | Ninguna llamada a Groq tenía timeout → Copiloto colgado "Pensando…". | `fetchWithTimeout` (AbortController) en las 2 llamadas. | `api/ai.js` |
| **ALTO-11 / blindaje** | Cada sección se guarda como **un blob**; al llenar 1 MiB el guardado en la nube fallaba **en silencio**. | **Guard de 1 MiB**: mide el tamaño y avisa al 75% y al límite, nombrando la sección. | `jcm_saas.js` |

### 🐛 Bugs de datos
| Código | Problema | Arreglo | Archivo |
|--------|----------|---------|---------|
| **ALTO-09** | Reservas web fusionadas perdían la fecha ISO y caían todas en "hoy". | Se copia `fecha: b.fecha`. | `jc-admin/jc-admin.jsx` |
| **M** | `DB.get("appts")` leía una clave inexistente (la real es `"appointments"`). | Corregidas las 2 llamadas vivas. | `jc-admin.jsx`, `jc-admin-c.jsx` |
| **ALTO-10** | `wa_conversations` se truncaba por caracteres → JSON roto → la bandeja "Agente IA" dejaba de sincronizar. | Poda por **cantidad** (JSON siempre válido). | `api/wa-webhook.js`, `api/meta-webhook.js` |

---

## 2. Archivos modificados y versiones

**16 archivos** (11 fuente + `JC_Admin.html` + `.gitignore` + 3 `dist` recompilados). `dist` recompilado con esbuild; `node --check` OK en todo; smoke test de login OK.

**Cache-busting `?v` (subidos):**

| Script | Versión |
|--------|---------|
| `jcm_shared.js` | **92** |
| `jcm_saas.js` | **33** |
| `dist/jc-admin.js` | **180** |
| `dist/jc-admin-b.js` | **66** |
| `dist/jc-admin-c.js` | **96** |

---

## 3. Lo que FALTA — antes y después del push

### 🅰 Para que los arreglos QUEDEN ACTIVOS (acciones del dueño, no son código)
1. **Publicar `firestore.rules`** en Firebase Console → Firestore → Reglas (¡el archivo NO se auto-despliega!). **Antes de publicar, verificar que el campo `plan` de la clínica sea `active`/`comp`/`trial`**, o las reservas nuevas se bloquean por `clinicActive`.
2. **Setear `CRON_SECRET`** en Vercel (con el fix nuevo, sin esa env el cron responde 503).

### 🅱 Checklist del git push (por el flujo con el socio en `main`)
1. `git fetch origin` + `git merge origin/main` (el socio suele ir adelante; conflicto típico = `JC_Admin.html` por los `?v`).
2. Si el socio tocó algún `.jsx`, **recompilar su `dist`** (el auto-merge de los `.js` compilados **no** es confiable).
3. Dejar los `?v` **por encima** de los del socio.
4. `git add` selectivo, commit, push, abrir **PR**.
5. **El dueño autoriza el merge a `main`** (el deploy en vivo lo aprieta él en el PR).
6. Hacer 🅰 (publicar reglas + `CRON_SECRET`).

### 🅲 Diferido — su propio proyecto (NO en este lote)
| Código | Qué falta | Por qué se difirió |
|--------|-----------|--------------------|
| **C-04** | Permisos por sección aplicados en el servidor | Arquitectónico: el panel baja todo el `kv` de una; gatear por-clave rompe la carga. |
| **ALTO-02** | `/api/email` limitado al destinatario de la clínica del llamante | Requiere resolver clínica + validar contacto server-side. |
| **ALTO-04** | URLs firmadas de corta duración para fotos/consentimientos | Requiere Storage + firma server-side. |
| **M** | Firma HMAC de los webhooks sobre el body crudo | Delicado (raw body); el bot Meta aún no está activo. |
| **Rebuild** | Datos **por-registro** (cada cita/paciente su propio documento) | Es el fix real de concurrencia y del límite de 1 MiB → track `jcmedi-app` (Next + Supabase). |

---

## 4. Nota de escala (para planificar, no bloquea el push)

- **10 clínicas de un operador cada una:** el modelo **aguanta** (están aisladas). Solo faltan planes de pago cuando el volumen lo pida.
- **Varias personas editando DENTRO de una clínica:** **no aguanta** — el guardado por bloque (last-write-wins) puede perder una cita o un pago. Eso lo resuelve el rebuild por-registro (🅲).
- **Muros de los planes gratis** (aparecen antes de 10): **Resend** (~100 correos/día) se topa a ~3-5 clínicas activas — es el primero a pagar (US$20). **Firebase** (50k lecturas/día) a ~3-5 con equipos. **Vercel** es tema de términos comerciales al primer cliente que paga.

---

*Generado por Claude Code · sesión de seguridad/bugs del panel Medique · 2026-07-14.*
