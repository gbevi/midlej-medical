# Reverse proxy + CORS — VPS deploy notes

This LP (Pleno Med, Next.js) talks to the existing IVY backend at
`/api/pleno-med/leads`. Server actions run server-side, so the LP →
backend call is **server → server**, not browser → backend. That means
**CORS is not strictly required on the backend for the LP to work**.
You should still configure CORS in case you later add browser-side
fetches.

Below: the four spots that need updating when deploying.

---

## 1. Backend env (ivysolutions/backend/.env)

Add the new vars on the production server:

```env
# Already present; just append the new origin if you want browser-side calls allowed
CORS_ORIGIN=http://localhost:5173,https://plenomed.com.br,https://www.plenomed.com.br

# New: dedicated inbox for Pleno Med leads. Falls back to LEAD_TO_EMAIL if empty.
PLENO_MED_LEAD_TO_EMAIL=mesa@plenomed.com.br
```

Then run migrations and restart the backend:

```bash
cd /path/to/ivysolutions/backend
pnpm install            # picks up no new deps, just to be safe
pnpm build              # tsc → dist/
# the server applies migrations on boot automatically (see db.ts);
# 022_pleno_med_leads.sql will be applied on next start
pm2 restart ivy-backend # or whatever your process manager is
```

Verify the new table exists:

```bash
psql "$DATABASE_URL" -c "\d pleno_med_leads"
```

---

## 2. LP env (.env on the Vercel project or the VPS)

The LP needs to know where the backend is. **Server-side only**, so use
`BACKEND_API_URL` (no `NEXT_PUBLIC_` prefix — keeps the URL out of the
client bundle).

### If you deploy the LP on Vercel

In the Vercel project settings, add an environment variable:

```
BACKEND_API_URL=https://api.midlej.com.br   # or whatever public hostname Ivy uses
```

### If you deploy the LP on the same VPS as Ivy

```env
# /etc/systemd/system/plenomed-lp.service env, or pm2 ecosystem.config.js
BACKEND_API_URL=http://localhost:3002   # talk to Ivy directly, bypass the reverse proxy
```

Talking to `localhost:3002` directly is cleanest when both services
live on the same box — no proxy hop, no CORS, no TLS overhead.

---

## 3. Caddy (recommended) — single Caddyfile for both sites

Two scenarios, depending on whether the LP is on the same VPS:

### Scenario A — LP on Vercel, only the backend on the VPS

Nothing to change in Caddy. The backend already serves at whatever
hostname you've configured (e.g. `api.midlej.com.br`). Vercel calls
that URL from server actions; the call is plain HTTPS, server → server.

### Scenario B — LP and backend both on the VPS

```caddyfile
# LP — the Next.js app
plenomed.com.br, www.plenomed.com.br {
    encode zstd gzip
    reverse_proxy localhost:3000
}

# Backend — API for Ivy and Pleno Med
api.midlej.com.br {
    encode zstd gzip
    reverse_proxy localhost:3002

    # Rate limiting is already applied inside Fastify, but a top-layer
    # IP-based limit at Caddy is cheap insurance:
    # rate_limit {
    #     zone leads {
    #         key {client_ip}
    #         events 60
    #         window 1m
    #     }
    # }
}
```

Reload Caddy:

```bash
sudo caddy reload --config /etc/caddy/Caddyfile
```

---

## 4. Nginx — if you use Nginx instead of Caddy

Two server blocks. TLS via certbot or your existing setup.

```nginx
# LP — Next.js
server {
    listen 443 ssl http2;
    server_name plenomed.com.br www.plenomed.com.br;

    ssl_certificate     /etc/letsencrypt/live/plenomed.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/plenomed.com.br/privkey.pem;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}

# Backend — Fastify
server {
    listen 443 ssl http2;
    server_name api.midlej.com.br;

    ssl_certificate     /etc/letsencrypt/live/api.midlej.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.midlej.com.br/privkey.pem;

    location / {
        proxy_pass         http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

Test and reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## 5. Process manager for the LP (pm2 example)

```js
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'plenomed-lp',
      cwd: '/srv/plenomed-lp',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        BACKEND_API_URL: 'http://localhost:3002',
      },
    },
  ],
};
```

```bash
cd /srv/plenomed-lp
pnpm install --prod
pnpm build
pm2 start ecosystem.config.js
pm2 save
```

---

## Sanity checklist before flipping DNS

- [ ] Backend started after pulling latest; migration `022_pleno_med_leads.sql` applied (check `_schema_migrations` table)
- [ ] `PLENO_MED_LEAD_TO_EMAIL` set in backend env (or you've confirmed `LEAD_TO_EMAIL` is the right fallback inbox)
- [ ] `BACKEND_API_URL` set in LP env to the right backend hostname
- [ ] LP responds at `https://plenomed.com.br` (200, correct content)
- [ ] Form submission test: fill the form, submit, verify (a) backend log shows insert, (b) email arrives in the target inbox, (c) row in `pleno_med_leads`
- [ ] Replace the `CVM nº TODO` and `CNPJ TODO` placeholders in `app/page.tsx` (search for "TODO" in the file)
- [ ] Replace the worked-example numbers in `app/page.tsx` with your real numbers if/when the rate is finalized (or keep "exemplo ilustrativo" microcopy)
- [ ] Replace the privacy and terms stubs (`app/privacidade/page.tsx`, `app/termos/page.tsx`) with the real legal text from the Midlej Capital jurídico

---

## What is NOT here

- Real domain DNS, certificate issuance, or VPS provisioning — those are environment-specific and you mentioned you already have Caddy/Nginx set up.
- A WAF / Cloudflare config — add separately if the backend ever takes browser-side traffic.
- Analytics (GA4, Plausible, etc.) — add to `app/layout.tsx` once chosen.
