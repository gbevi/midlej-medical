---
name: Midlej Capital
description: Hub privado de planejamento financeiro. Sistema de marca aplicado a /, /investimentos, /mentoria/* e (em breve) /plenomed/*.
colors:
  ink:               "#233853"
  ink-2:             "#4a6b8c"
  paper:             "oklch(96.8% 0.010 78)"
  bone:              "oklch(94.5% 0.014 78)"
  bone-2:            "oklch(91% 0.018 78)"
  ink-soft:          "oklch(48% 0.040 240)"
  ink-mute:          "oklch(62% 0.020 240)"
  emphasis-oxblood:  "oklch(46% 0.115 30)"
  line:              "oklch(20% 0.04 240 / 0.14)"
  line-soft:         "oklch(20% 0.04 240 / 0.07)"
  line-strong:       "oklch(20% 0.04 240 / 0.28)"
  on-ink-strong:     "oklch(96.8% 0.010 78)"
  on-ink-soft:       "oklch(96.8% 0.010 78 / 0.68)"
  on-ink-mute:       "oklch(96.8% 0.010 78 / 0.62)"
  line-on-ink:       "oklch(96.8% 0.010 78 / 0.18)"
typography:
  family:            "Bricolage Grotesque (variable, axes: opsz + wdth)"
  fallback:          "ui-sans-serif, system-ui, sans-serif"
  display:           "wdth 92, opsz 96, weight 600, line-height 0.96, tracking -0.028em"
  display-light:     "wdth 100, opsz 96, weight 300, line-height 1.02, tracking -0.022em"
  quote:             "wdth 100, opsz 48, weight 300, line-height 1.18, tracking -0.012em"
  lede:              "wdth 100, opsz 36, weight 400, line-height 1.45, tracking -0.005em"
  body:              "wdth 100, opsz 16, weight 400, line-height 1.6, tracking 0"
  mono:              "wdth 100, opsz 14, weight 500, tnum + lnum, tracking 0.01em"
  caps:              "weight 500, tracking 0.14em, uppercase, 0.7rem"
rounded:
  default:           "0px (square)"
  rare-corner:       "2px (cards SVG internos apenas)"
spacing:
  hairline:          "1px"
  micro:             "8px"
  sm:                "16px"
  md:                "24px"
  lg:                "40px"
  xl:                "64px"
  section:           "clamp(96px, 12vw, 160px) — vertical de seção"
  reading-max:       "1400px"
buttons:
  shape:             "Quadrado, padding 1rem × 1.5rem, sem border-radius"
  primary:           "bg ink + text paper"
  primary-inverse:   "bg paper + text ink (sobre ink)"
  ghost:             "border-bottom 1px ink, transparente"
  ghost-inverse:     "border-bottom 1px paper, transparente"
hairlines:
  on-body:           "1px var(--color-line)"
  on-ink:            "1px var(--color-line-on-ink)"
emphasis:
  asterisk:          "oxblood, antes de quotes/aspas pra abertura editorial"
  link-underline:    "currentColor, scaleX transition (left-to-right)"
  focus-ring:        "2px oxblood + 3px offset, escopo [data-brand]"
---

# Design System: Midlej Capital

## 1. North Star

**"Banca privada-discreta, não fintech."**

A marca opera no registro de uma banca privada de planejamento financeiro: instrumentos editoriais, tipografia carregando autoridade, números falando alto, oxblood usado raramente como pontuação. A interface deve sentir-se como um instrumento financeiro materializado, não como um produto SaaS.

Recusas explícitas:
- Fintech teal/cyan, gradientes coloridos, botões arredondados >4px
- Stock-photo de "consultor sorrindo" ou prédios corporativos
- SaaS scaffolding (4-up benefit cards, kicker eyebrows decorativos, prosa "transform your X")
- Gold + navy banca-tradicional, texturas mármore, ornamentos
- Ícones genéricos sem contexto

A página deve ser inadivinhável a partir da categoria. Um usuário que abrir `/` ou `/investimentos` deve sentir que aterrissou num documento curado, não num template.

## 2. Cores

A paleta é drenched ink ancorada no navy. Uma única superfície profunda (ink), duas superfícies claras (paper + bone), um acento raro de oxblood.

### Primárias

- **Ink** (`#233853`): o navy oficial da marca. Carrega ~40–50% da superfície visível em qualquer rota. Header fixed, hero, seções de prova (depoimentos, CTA final), footer institucional. Tom escolhido pra ter melhor contraste com paper sem virar preto puro.
- **Ink-2** (`#4a6b8c`): secundário do diamante do logo. Não usar em texto.

### Claras

- **Paper** (`oklch(96.8% 0.010 78)`): off-white warm com tilt navy. Background base de seções editorial (`bg-paper`). Texto sobre ink usa esta cor.
- **Bone** (`oklch(94.5% 0.014 78)`): paper rebaixado um passo, para seções que precisam de variação rítmica sem virar branco-cinza. Usado uma vez por página como "respiração intermediária".
- **Bone-2** (`oklch(91% 0.018 78)`): hover de cards de bone, raro.

### Emphasis: Oxblood

- **Emphasis** (`oklch(46% 0.115 30)`): vermelho-vinho. **<1% da superfície da página**. Usado em:
  - Asterisco `*` antes de quotes
  - Numerais romanos de etapas (I, II, III) em seções editoriais
  - Tag/eyebrow de seções (`Manifesto`, `Como conduzimos`)
  - Hairline sob link no hover
  - Focus ring (`focus-visible`)
  - Acentos em viz SVG (cursor da timeline, borda highlight da matrix, shells dos nós 3D)

Nunca usar oxblood em:
- Backgrounds de seção (jamais como fill grande)
- Texto de corpo
- Botões (botões são sempre ink ou inverse, nunca oxblood)

### Texto

- **Ink** (`#233853`): texto principal sobre paper/bone
- **Ink-soft** (`oklch(48% 0.040 240)`): secundário sobre paper
- **Ink-mute** (`oklch(62% 0.020 240)`): terciário sobre paper (eyebrows mono, captions)
- **On-ink-strong** (`oklch(96.8% 0.010 78)`): texto principal sobre ink
- **On-ink-soft** (`/ 0.68`): secundário sobre ink
- **On-ink-mute** (`/ 0.62`): terciário sobre ink

### Hairlines

- **Line** (`oklch(20% 0.04 240 / 0.14)`): hairline padrão em paper/bone
- **Line-strong** (`/ 0.28`): hairline com mais peso (raro)
- **Line-on-ink** (`oklch(96.8% 0.010 78 / 0.18)`): hairline sobre ink, paper-color translúcido

### Named Rules

**The Ink-or-Paper Rule.** Toda seção é ou ink ou paper (ou bone como variação editorial). Nenhuma terceira surface intermediária. Sem gradientes entre seções. A transição é por borda hairline ou por hard cut.

**The One-Percent-of-Oxblood Rule.** Se você puser oxblood em mais de 1% da área visível da seção, você errou. Use ink para tudo que não for asterisco, numeral romano, hover de link, ou viz accent. Oxblood é pontuação, não pintura.

**The No-Tinted-Card Rule.** Cards com background tintado (gray-blue, paper-elevated, etc) são proibidos. Para separar conteúdo, use hairlines + espaço. Para escalar separação, inverta superfície (paper ↔ ink).

## 3. Tipografia

**Fonte única:** Bricolage Grotesque (variable, axes `opsz` + `wdth`). Carregada via `next/font/google` com variável `--font-brand`.

Toda hierarquia tipográfica vem de **peso × largura × tamanho ótico × escala**. Sem mistura serif/sans. Sem itálico (Bricolage não tem axis slant; itálico sintético deforma o glifo).

### Classes de utilidade (em `globals.css`)

| Classe | Uso |
|---|---|
| `.t-display` | wdth 92 + opsz 96, weight 600, `letter-spacing: -0.028em`, `line-height: 0.96`. H1, H2 dominantes. |
| `.t-display-light` | wdth 100 + opsz 96, weight 300, `letter-spacing: -0.022em`, `line-height: 1.02`. Subtítulos display, números editoriais. |
| `.t-quote` | wdth 100 + opsz 48, weight 300, `letter-spacing: -0.012em`, `line-height: 1.18`. Quotes editoriais, manifesto. |
| `.t-lede` | wdth 100 + opsz 36, weight 400. Parágrafo introdutório de seção. |
| `.t-body` | wdth 100 + opsz 16, weight 400, `line-height: 1.6`. Texto corrido. **Mínimo 16px**. |
| `.t-mono` | weight 500, `lnum` + `tnum`, `letter-spacing: 0.01em`. Eyebrows tracked-uppercase, números. |
| `.t-caps` | weight 500, `tracking: 0.14em`, uppercase, 0.7rem. Tags pequenas. |

### Tamanhos (`clamp` por convenção)

| Slot | Range |
|---|---|
| Hero H1 | `clamp(2.4rem, 6vw, 5.25rem)` |
| H2 grande | `clamp(2rem, 4.5vw, 3.75rem)` |
| H2 médio | `clamp(1.875rem, 3.6vw, 3rem)` |
| H3 | `clamp(1.25rem, 2vw, 1.625rem)` |
| Quote dominante | `clamp(1.5rem, 3.2vw, 2.625rem)` |
| Lede | `1.0625rem – 1.2rem` |
| Body | `1rem – 1.0625rem` |
| Mono / eyebrow | `0.66rem – 0.72rem` |

### Regras

**Sem itálico real ou sintético.** Bricolage não tem axis slant; `font-style: italic` rende glyphs torcidos. Emphasis no `<em>` global = `font-weight: 600` + `color: var(--color-emphasis)` (oxblood). Discreto, baseado em peso.

**Tracking inverso pra display.** `letter-spacing` negativo (-0.022em a -0.028em) em headings — Bricolage tem letras largas e o tracking apertado evita "espaço de Manrope".

**Numerais sempre `tabular-nums`.** Use `.t-mono`, `.t-display-light` com `tabular-nums` class, ou `font-variant-numeric: lining-nums tabular-nums` direto.

**16px é o piso de texto.** `.t-body` em 1rem mínimo. Nunca cair pra 14/15 — copy financeira em <16px lê como letra miúda jurídica.

## 4. Botões e CTAs

**Sempre quadrado** (border-radius 0). Square buttons reforçam o registro de banca/instrumento. Pills arredondadas são SaaS.

| Classe | Contexto | Aparência |
|---|---|---|
| `.btn-primary` | Sobre paper/bone | bg ink, text paper, padding 1rem × 1.5rem |
| `.btn-primary-inverse` | Sobre ink | bg paper, text ink |
| `.btn-ghost` | Sobre paper | border-bottom 1px ink, transparente |
| `.btn-ghost-inverse` | Sobre ink | border-bottom 1px paper, transparente |

Hover: translateY(-1px) + transition de bg (`260ms cubic-bezier(.2,.7,.2,1)`). Seta `→` translada 3px no hover.

### Anchor links e formulários

Todos os CTAs apontando pra `#contato` (ou outras âncoras) devem ser interceptados pelo `<SmoothAnchor />` no topo da página (client component). Ele:
- `preventDefault()` no clique
- `scrollIntoView({behavior:'smooth'})` no alvo
- Mantém URL limpa (não escreve `#contato` na barra)
- Faz o CTA funcionar N vezes seguidas

`scroll-padding-top: 80px` no html garante que o destino aterrisse abaixo do header fixed.

## 5. Surfaces e Composição

### Pattern de página

Padrão de header → hero → manifesto/marcos → seções alternadas (ink/paper/bone) → contato → footer. Ritmo geral:

```
HEADER (fixed, tone-aware)
HERO ink
MANIFESTO paper
SEÇÃO ink
SEÇÃO paper
SEÇÃO ink
SEÇÃO paper
SEÇÃO ink
SEÇÃO bone (1× por página, variação)
SEÇÃO paper
SEÇÃO ink
CONTATO ink (form)
FOOTER ink
```

O header fixed lê a `data-tone="dark"|"light"` de cada `<section>` via `getBoundingClientRect` em rAF e flipa **bg + texto + logo** com transição 300ms.

### Grid

12-col grid via Tailwind. `max-w-[1400px]` (reading-max). Padding horizontal: `px-6 md:px-12 lg:px-16`.

Composições preferidas:
- **12-col, asymmetric**: copy 7/12 + viz 5/12, ou vice-versa
- **Full-width centered**: hero, marcos editoriais, manifesto quote
- **2-col 50/50**: contato (texto + form)

Evite: 3-col cards iguais (SaaS). Se precisar de 3 elementos paralelos (proof row, depoimentos), divide hairline-on-top + col-span-4.

## 6. Motion

**Restrained.** Quatro tipos de movimento no sistema:

### Reveal on load

Hero entrance via `.reveal` + `.r-1` a `.r-6` (delays 80ms staggered). Slide-up `translateY(8px)` + fade. Failsafe: conteúdo é visível por default; animação roda apenas se classe `.reveal` estiver presente.

### Scroll-driven (3D scenes + FullTimeline)

`useScrollProgress(containerRef)` hook em `app/_hub/lib/useScrollProgress.ts` escreve `0..1` em `progressRef.current` via rAF. As cenas three.js (Globe, AltLayers, PrevidenciaStack, WorkshopRoom) consomem o ref dentro de `useFrame` para mapear scroll → rotação, separação, ou ativação progressiva. A FullTimeline SVG usa o mesmo padrão com CSS custom property `--ft-p` e `calc()`.

### Tone-aware header

Detecção via `getBoundingClientRect` em rAF a cada scroll. Última seção `[data-tone]` cujo top cruzou a linha do header define a tone. Bg + texto + logo transitam em 300ms.

### Reduced motion

`prefers-reduced-motion: reduce` → todas as cenas 3D caem para SVG estático. Reveal pula direto pro estado final. Smooth-scroll vira jump.

### O que NÃO fazemos

- Parallax de imagens (não usamos imagens grandes)
- Scroll-jacking
- Loaders / spinners (estado vazio é "Carregando…" texto)
- Hover lift em cards
- Bouncing/elastic easings (`cubic-bezier(.2,.7,.2,1)` é o padrão — ease-out claro)

## 7. Componentes-chave

### `HubHeader` (`app/_hub/HubHeader.tsx`)
Header fixed client-component. Lê data-tone das seções, flipa estilo, contém logo + CTA "Pedir conversa". **NÃO duplicar em cada rota** — importar e usar uma vez por página.

### `HubLeadForm` (`app/_hub/HubLeadForm.tsx`)
Formulário canônico de 3 campos (nome, estado, WhatsApp). Posta em `/api/pleno-med/leads` via `submitLeadForm`. Aceita `tone="dark"|"light"`. Reusável em qualquer seção de captura.

### `SmoothAnchor` (`app/_hub/SmoothAnchor.tsx`)
Client component que delega cliques em `<a href="#…">`, faz scroll programático sem alterar URL. Plugar uma vez por página, antes do Header. Sem ele, CTAs funcionam apenas 1× por sessão.

### `Logo` (`app/components/Logo.tsx`)
SVG vetorizado com prop `tone` e `subText`. Variantes: "" (só MIDLEJ), "CAPITAL" (lockup completo do hub), "EDUCATION" (mentoria), "PLENOMED" (Pleno Med).

### Cenas 3D (`app/_hub/scenes/`)
Globe, AltLayers, PrevidenciaStack, WorkshopRoom. Exportadas como dynamic-loaded clients via `app/_hub/scenes/clients.tsx`. Cada uma:
- `meshBasicMaterial` (sem lights)
- Cor paper `#F6F2EA` ou branco `#FFFFFF`
- Wireframe shell oxblood `#9B3221`
- `frameloop={inView ? "always" : "never"}` pausa fora da viewport
- SVG fallback para reduced-motion
- Mouse parallax via `useThree().pointer`
- Scroll-driven rotation via `useScrollProgress`

### Viz SVG (`app/_hub/svg/`)
FullTimeline (scroll-driven), PocketRing, SeguroCompare, SaudeMatrix. Pure SVG/CSS, IntersectionObserver para reveal one-shot, exceto FullTimeline que é scroll-progress.

## 8. Anti-patterns explícitos

| ❌ Não | ✅ Sim |
|---|---|
| Card com background tintado e drop shadow | Hairline separator + espaço |
| Botão pill rounded-full | Square 4px max |
| Texto em itálico (synthetic) | Weight 600 + cor oxblood |
| `text-[var(--color-xxx)]` arbitrary value | `text-on-ink-strong` named class (Tailwind v4 expõe via @theme) |
| Header transparente sem awareness do bg | Header detecta data-tone e adapta |
| Numeração 01/02/03 sempre presente | Mark = só régua + eyebrow tracked |
| 3 colunas paralelas iguais (SaaS triptych) | Lista hairline-divided ou grid asymmetric |
| `href="#anchor"` direto sem interceptor | Mesmo `href` + SmoothAnchor no topo da página |
| Imagem de "consultor sorrindo" | Sem imagens humanas — anônimo + cidade |
| Cores hex hardcoded em componentes | CSS vars `var(--color-…)` |
| `font-style: italic` em qualquer lugar | Substituir por peso + cor |
| Botão "Saiba mais" | CTA específico ("Pedir primeira conversa", "Avaliar minha cobertura") |
| Reuso de logo sem submark | Sempre passar `subText` quando o contexto pede (CAPITAL, EDUCATION, PLENOMED) |
| WhatsApp como CTA principal | Apenas formulário — WhatsApp foi removido |

## 9. Convenções de copy

- **Tom**: banca privada-discreta. Frases curtas. Verbos diretos ("Estruturamos", "Acompanhamos") em vez de "a mesa" ou "a equipe".
- **Sem "mesa"**: substituído por verbos ativos ("respondemos", "pedimos", "estruturamos").
- **Sem "ligação fria"**: removido. Cold call ativa, não vamos prometer o contrário.
- **Sem em-dashes** (`—`): usar ponto final ou vírgula.
- **Sem overexplaining**: eyebrows que repetem o headline foram removidos. SectionMark = só régua + eyebrow tracked.
- **Asterisco oxblood** (`<span className="asterisk" />`) antes de quotes/aspas para sinalizar abertura editorial.
- **Depoimentos anônimos**: "Médico, 41 anos · São Paulo" — sem fotos, sem nomes reais (LGPD + autenticidade).

## 10. Rotas e scope

| Rota | Tipo | Status |
|---|---|---|
| `/` | Hub Midlej Capital — 8 frentes editoriais | Live |
| `/investimentos` | Deep-dive de investimentos privados | Live |
| `/mentoria` | Índice das 5 LPs de mentoria | Live |
| `/mentoria/{raio-x,ebook,simulador,planilha,alternativos}` | 5 LPs de tráfego pago | Live, paleta brand aplicada |
| `/plenomed` | LP original Pleno Med (crédito médico) | Live, ainda usa CSS legado próprio |

Toda rota brand monta `<main data-brand>` para ativar:
- Background paper no body
- `scroll-padding-top: 80px` no html
- Smooth scroll
- Brand body styles (`body:has([data-brand])`)

## 11. Changelog

- **2026-06-05**: `--color-ink` atualizado de `#062241` (navy escuro) → `#233853` (navy médio). Ajustado `--color-ink-2` de `#2D5871` → `#4a6b8c`. Hover do `.btn-primary` migrado de `oklch(18% 0.06 240)` → `oklch(18% 0.045 245)`. Aplicado em todos os componentes que hardcodaram a cor (Logo, SVG viz, layout themeColor).
- **2026-06-05**: rota `/investimentos` criada como deep-dive da frente "investimentos internacionais" do hub.
- **2026-06-05**: SmoothAnchor introduzido — CTAs com âncora (#contato) agora funcionam N vezes sem alterar URL.
- **2026-06-05**: HubHeader virou tone-aware — detecta `data-tone` e flipa bg+texto+logo entre ink e paper.
