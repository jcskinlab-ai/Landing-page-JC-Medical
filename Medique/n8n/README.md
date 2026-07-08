# Automatizaciones n8n — JC Medical

Flujos listos para importar en [n8n](https://n8n.io) (Cloud o self-hosted).
Aplican patrones del skill **n8n-workflow-patterns**: *webhook → validar → notificar* y *programado → obtener → filtrar → enviar*.

## Flujos

| Archivo | Disparador | Qué hace |
|---|---|---|
| `01-nueva-reserva-whatsapp.json` | Webhook `POST /jcm-reserva` | Al recibir una reserva, avisa por WhatsApp a la clínica **y** confirma al paciente. |
| `02-recordatorio-24h.json` | Programado (cada hora) | Busca las citas de mañana y envía recordatorio por WhatsApp 24 h antes. |
| `03-resena-post-visita.json` | Programado (19:00 diario) | A quienes se atendieron hoy, les pide una reseña en Google. |

## Cómo importarlos
1. En n8n: **Workflows → Import from File** y elige cada `.json`.
2. Crea una credencial **HTTP Header Auth** con `Authorization: Bearer <TOKEN>` de la WhatsApp Cloud API (o usa el nodo de Twilio si prefieres) y asígnala a los nodos HTTP.
3. Reemplaza los marcadores:
   - `PHONE_NUMBER_ID` → tu Phone Number ID de WhatsApp Cloud API.
   - `56997880877` → número de la clínica (ya configurado).
   - `https://TU-FUENTE-DE-CITAS/...` → endpoint que devuelva las citas (ver más abajo).
   - `TU-ID-DE-GOOGLE` → enlace de reseña de tu ficha de Google.
4. Activa el workflow (toggle **Active**).

## Conectar con el sitio
- **Reservas:** que `agendar.html` (o la API `/api/reserva`) haga `POST` al webhook de n8n con
  `{ nombre, telefono, proc, fecha, hora }`. Ver `../BACKEND.md`.
- **Recordatorios/reseñas:** exponer un endpoint que lea las citas (desde Firebase/Sheets/tu API)
  y devuelva `{ data: [{ nombre, telefono, fecha, hora, recordatorioEnviado }] }`.

> Los flujos vienen **inactivos** (`active: false`) para que los revises antes de encender.
