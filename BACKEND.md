# JC Medical · Backend & Deploy (fullstack-developer)

Guía para publicar el sitio y conectar las notificaciones reales. **Todo esto es opcional**:
el sitio funciona hoy como estático (React en navegador + `localStorage`). Esta capa añade
backend para reservas y automatizaciones, sin romper lo existente.

## Arquitectura

```
Visitante ─▶ index.html / agendar.html  (estático, landing pública)
                     │ POST /api/reserva  { nombre, telefono, proc, fecha, hora }
                     ▼
        api/reserva.js  (Vercel Serverless Function)
                     │ POST  N8N_WEBHOOK_URL
                     ▼
        n8n  (flujos en /n8n)  ─▶ WhatsApp Cloud API ─▶ clínica + paciente
```

## Deploy en Vercel (recomendado, gratis para este tamaño)
1. Sube el proyecto a un repo (GitHub) o usa `vercel` CLI.
2. En Vercel: **New Project → Import**. Framework preset: **Other** (es estático + funciones en `/api`).
3. Variables de entorno:
   - `N8N_WEBHOOK_URL` = URL del webhook `jcm-reserva` de tu n8n.
4. Deploy. La raíz `/` sirve `index.html` (la web app pública) y `/api/reserva` queda disponible.
5. Apunta tu dominio (`medique.cl`) en **Settings → Domains**.

> Alternativas: Netlify (mueve `api/` a `netlify/functions/`) o Cloudflare Pages (usa `functions/`).

## Conectar el formulario de reserva (cuando quieras notificaciones reales)
En `agendar.html`, además de guardar en `localStorage`, hacer:
```js
fetch('/api/reserva', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre, telefono, proc, fecha, hora })
}).catch(() => {}); // no bloquea la reserva si falla
```

## Pendiente de configurar (claves/datos, no es código)
- **WhatsApp Cloud API**: token + `PHONE_NUMBER_ID` (Meta for Developers).
- **Dominio final**: reemplazar `https://medique.cl` en `index.html`, `agendar.html`, `sitemap.xml`, `robots.txt` si fuera otro.
- **Google Business**: enlace de reseña para el flujo 03.
- **Fuente de citas** para recordatorios (Firebase/Sheets/API) → endpoint que devuelva las citas.

## SEO incluido (seo-specialist)
- `index.html` / `agendar.html`: meta description, Open Graph, Twitter Card, JSON-LD `MedicalClinic` (NAP Talca, horarios, geo), canonical.
- `robots.txt` (excluye el panel privado), `sitemap.xml`, `manifest.webmanifest` + íconos PWA.
- Tras publicar: dar de alta el sitio en **Google Search Console** y enviar el `sitemap.xml`.
