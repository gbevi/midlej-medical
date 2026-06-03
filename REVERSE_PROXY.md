# Deploy — Pleno Med LP (Vercel) → Ivy backend (VPS)

A LP roda em **Vercel**. O backend roda em **VPS** (`ivysolutions/`) atrás
de Caddy + nginx, e **não é exposto diretamente** — só responde via o
nginx do frontend ivysolutions, que faz proxy interno de `/api/*` pro
container `backend:3002`.

Arranjo escolhido (Opção B): a LP fala com o backend através do hostname
público do ivysolutions, reusando o proxy nginx existente. Zero mudança
em Caddyfile, DNS, ou firewall.

```
Vercel (plenomed.com.br)
  └─ server action: fetch(`${BACKEND_API_URL}/api/pleno-med/leads`)
                                ↓
VPS Caddy 443
  └─ www.ivysolutions.com.br → frontend:8080 (nginx)
                                  └─ location /api/* → backend:3002
                                                          ↓
                                                        POST /api/pleno-med/leads
                                                          → INSERT pleno_med_leads
                                                          → notifyPlenoMedLead()
```

Server action = chamada **server → server**. CORS não bloqueia. O
`CORS_ORIGIN` no backend continua restrito ao próprio ivy; não precisa
adicionar o domínio da LP a menos que algum dia você queira browser fetch
direto do cliente.

**Auth da rota**: a LP envia em todo POST um header
`x-pleno-med-key: <shared secret>`. O backend exige match em produção
(`config.PLENO_MED_INGEST_KEY` em `src/config.ts` faz `exit(1)` se a var
não estiver setada quando `NODE_ENV=production`). Sem esse secret a rota
ficaria aberta — qualquer pessoa que descobrisse a URL poderia criar
leads via `curl`.

---

## 1. Vercel — env vars do projeto

Em **Settings → Environment Variables** do projeto `midlej-medical` na
Vercel, adicionar:

| Var | Valor | Environments |
|---|---|---|
| `BACKEND_API_URL` | `https://www.ivysolutions.com.br` | Production, Preview, Development |
| `PLENO_MED_INGEST_KEY` | `<output de openssl rand -hex 32>` | Production, Preview |

Nenhuma com prefixo `NEXT_PUBLIC_` — são server-side only e ficam fora
do bundle do cliente. A path `/api/pleno-med/leads` é concatenada em
`lib/actions.ts`, não inclui aqui.

**O mesmo valor de `PLENO_MED_INGEST_KEY` precisa estar setado no `.env`
da VPS** (próxima seção). Sem match, backend devolve 401.

Após salvar, **Redeploy** (ou aguardar o próximo push pra `main`).

---

## 2. VPS — env do backend

Edita `/path/to/ivysolutions/infra/.env` (ou onde fica o env de prod):

```env
# OBRIGATÓRIO em prod. Sem isso o backend faz exit(1) no boot.
# MESMO valor que está em PLENO_MED_INGEST_KEY na Vercel.
# Gera com: openssl rand -hex 32
PLENO_MED_INGEST_KEY=<cole o mesmo secret da Vercel>

# Opcional. Caixa dedicada pra leads Pleno Med.
# Se vazio, leads caem em LEAD_TO_EMAIL junto com os do ivy.
PLENO_MED_LEAD_TO_EMAIL=mesa@plenomed.com.br
```

Sobe o backend pra pegar as novas vars:

```bash
cd /path/to/ivysolutions/infra
docker compose -f docker-compose.prod.yml up -d backend
```

O backend aplica a migration `022_pleno_med_leads.sql` automaticamente
no boot (via `runMigrations()` em `src/server.ts`). Verifica que a tabela
existe:

```bash
docker compose -f docker-compose.prod.yml exec db \
  psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\d pleno_med_leads"
```

Verifica que o backend rejeita request sem o header:

```bash
curl -i -X POST https://www.ivysolutions.com.br/api/pleno-med/leads \
  -H 'content-type: application/json' \
  -d '{"name":"Teste","estado":"SP","whatsapp":"11999999999","consentText":"x".repeat(20)}'
# Esperado: HTTP/1.1 401 Unauthorized  {"error":"unauthorized"}
```

---

## 3. Sanity checklist antes de apontar o DNS de `plenomed.com.br` pra Vercel

- [ ] Backend pulled e reiniciado; migration 022 aplicada
- [ ] `PLENO_MED_INGEST_KEY` setada no env da VPS (mesmo valor que na Vercel)
- [ ] (Opcional) `PLENO_MED_LEAD_TO_EMAIL` setada no env da VPS
- [ ] `BACKEND_API_URL` + `PLENO_MED_INGEST_KEY` setadas na Vercel
- [ ] Build da LP passa na Vercel
- [ ] `curl` sem header retorna 401 (rota travada)
- [ ] Teste end-to-end de submissão:
      - submit pelo form da LP em produção (ou preview da Vercel)
      - confere log do backend (`docker compose logs -f backend`)
      - confere insert: `SELECT * FROM pleno_med_leads ORDER BY id DESC LIMIT 5`
      - confere chegada do email na caixa configurada

---

## Quando migrar pra Opção A (subdomínio dedicado pra API)

Faz sentido se:
- O hostname `ivysolutions.com.br` aparecer em logs / Network tab da LP
  começar a incomodar do ponto de vista de branding
- O backend ganhar outros consumidores (outro LP, app mobile) e ficar
  estranho rotear tudo pelo nginx do frontend ivy
- Você quiser políticas de rate-limit / WAF / CORS independentes da app
  ivy

Quando esse momento chegar, é adicionar um bloco no Caddyfile do ivy
(`api.ivysolutions.com.br { reverse_proxy backend:3002 }`), criar o
registro DNS, e trocar a env var na Vercel.
