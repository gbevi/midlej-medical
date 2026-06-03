<!-- SEED: components, exact spacing, and signature patterns get refined once code exists. Re-run $impeccable document after implementation to capture the real component layer. -->
---
name: Pleno Med
description: A medical-credit hub by Midlej Capital, designed as private-banking-discreto for the brasileiro plantonista.
colors:
  ink-graphite: "oklch(0.18 0.01 240)"
  ink-graphite-deeper: "oklch(0.12 0.01 240)"
  ink-text: "oklch(0.20 0.01 240)"
  body-warm-off-white: "oklch(0.97 0.005 80)"
  surface-raised: "oklch(0.99 0.004 80)"
  rule-faint: "oklch(0.86 0.005 80)"
  rule-on-ink: "oklch(0.32 0.01 240)"
  text-muted-on-body: "oklch(0.42 0.01 240)"
  text-muted-on-ink: "oklch(0.78 0.01 240)"
  accent-warm-clay: "oklch(0.55 0.12 35)"
  accent-clay-deeper: "oklch(0.48 0.13 30)"
typography:
  display:
    fontFamily: "'Spectral', 'Source Serif 4', Georgia, serif"
    fontSize: "clamp(2.5rem, 7.2vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Spectral', 'Source Serif 4', Georgia, serif"
    fontSize: "clamp(2rem, 4.6vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.012em"
  numerals:
    fontFamily: "'Spectral', 'Source Serif 4', Georgia, serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.005em"
    fontFeature: "'lnum', 'tnum'"
  title:
    fontFamily: "'Manrope', system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.4vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Manrope', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.005em"
  body-on-ink:
    fontFamily: "'Manrope', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "-0.005em"
  label:
    fontFamily: "'Manrope', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "6px"
spacing:
  hairline: "1px"
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
  xxl: "96px"
  section: "clamp(96px, 12vw, 160px)"
components:
  button-primary:
    backgroundColor: "{colors.ink-graphite}"
    textColor: "{colors.body-warm-off-white}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.ink-graphite-deeper}"
  button-primary-on-ink:
    backgroundColor: "{colors.body-warm-off-white}"
    textColor: "{colors.ink-graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "16px 28px"
  input-field:
    backgroundColor: "{colors.body-warm-off-white}"
    textColor: "{colors.ink-text}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
---

# Design System: Pleno Med

## 1. Overview

**Creative North Star: "A nota fiscal numa mesa de mogno."**

The page should feel like sitting across the desk from a discreet private banker in a quiet room — not like a fintech checkout. The aesthetic is *banco privado*, not *banco-tradicional* (gold, navy, marble) and not *fintech-moderno* (teal, chips, gradients). Deep ink graphite carries the hero, §I Duas soluções, the §IV closer, and the institutional footer; a warm off-white carries §II Como funciona and §III Por que. One warm clay accent appears sparingly — on the italic labels of §III claims, on the `<em>` emphasis in display headings, on link / CTA underlines, and on the focus ring. Serif display does the talking on headings; humanist sans handles everything else with calm, ample line-height. No section kickers. No oversized step numerals. No badges. No imagery. Spacing is generous on desktop and disciplined on mobile.

This system explicitly rejects the four anti-references named in PRODUCT.md: the generic fintech teal/cyan family, the stock-photo médico cliché, SaaS-template scaffolding (4-up benefit cards, numbered 01/02/03 cards, "transform your X" prose), and the gold-and-navy traditional-bank look. The page should be unguessable from the category alone: nothing on it should announce "fintech landing page."

**Key Characteristics:**
- Drenched private-banking ink for the hero, §I Duas soluções, the §IV closer, and the institutional footer
- Warm off-white for §II Como funciona, §III Por que, and the form panel
- Serif display + (aspirational) serif numerics — typography is the visual system
- A single warm-clay accent, used as ink, never as decoration
- Generous fluid spacing; one strong rule line where most pages would put a card
- No section scaffolding: no numbered kickers, no oversized step numerals, no eyebrows
- Motion is restrained: the hero entrance, three on-scroll list / quote reveals, and one form-success entrance. Nothing else animates on scroll.

## 2. Colors

The palette is a Committed strategy anchored on ink. One deep surface, one warm body, one accent that only touches numbers.

### Primary
- **Ink Graphite** (`oklch(0.18 0.01 240)`): The hero surface and the final-CTA surface. Carries roughly 40–50% of the visible page. Reads near-black with a barely-cool tilt — anti-warm, anti-fintech-blue. Where the page makes its strongest claims, it makes them on this color.
- **Ink Graphite Deeper** (`oklch(0.12 0.01 240)`): Reserved for hover states on the primary button and as a paired darker stripe inside the ink surface when separation is needed without a card.

### Secondary
- **Warm Clay Accent** (`oklch(0.55 0.12 35)`): The single accent. Touches exactly **one word of text on the entire page** — the italic `<em>capital</em>` in the hero h1. Beyond that one word, clay is reserved for UI accents only: the 1px underline beneath inline links, the bottom-border on the hero CTA and header CTA, the `::selection` background, and the focus ring (at 30–45% alpha). Never used as a background fill. Never used on a button. Never tints headings, claim labels, sub-marks, or footer text. **Aspirational**: when the worked-example surface ships, clay extends to mark every R$ / % / date on it.
- **Clay Deeper** (`oklch(0.48 0.13 30)`): Hover state for inline links.

### Neutral
- **Body Warm Off-White** (`oklch(0.97 0.005 80)`): The off-white surfaces — §II Como funciona, §III Por que, and the form panel. A barely-warm tint, never confused with cream or sand.
- **Surface Raised** (`oklch(0.99 0.004 80)`): Used inside the warm-off-white sections when a subtle inset is genuinely needed (e.g. the form panel). 2-step lift, not card.
- **Ink Text** (`oklch(0.20 0.01 240)`): Body text on warm-off-white. ≥4.5:1 contrast verified.
- **Text Muted on Body** (`oklch(0.42 0.01 240)`): Secondary text on warm-off-white (e.g. form helper text). ≥4.5:1 still required — not light-gray-for-elegance.
- **Text Muted on Ink** (`oklch(0.78 0.01 240)`): Secondary text on ink surface. Generous line-height (+0.05) per impeccable.
- **Rule Faint** (`oklch(0.86 0.005 80)`): The hairline that replaces card borders on body sections.
- **Rule on Ink** (`oklch(0.32 0.01 240)`): The hairline on ink surfaces.

### Named Rules

**The Ink-or-Off-White Rule.** Every section is either ink-graphite OR warm-off-white. No third surface color. No mid-tones. No tinted cards floating on either. Two surfaces, hard cut between them, ruled hairline at the join.

**The One-Word-Of-Clay Rule.** Only one word of body text on the entire page is ever clay: the italic `<em>capital</em>` in the hero h1. That single word is the brand's whole color statement. Every other instance of clay on the page is a UI accent (link underline, CTA underline, focus ring, selection background). No clay on claim labels, sub-headings, italic emphasis elsewhere, footer text, badges, tags, or numerals. The rule isn't "use clay sparingly" — it's "use clay on one word, then never again as text." If you'd reach for clay as text color anywhere else, use ink instead.

**The No-Tinted-Card Rule.** Floating cards with subtle gray-blue backgrounds are forbidden. If a section needs grouping, use rule lines and spacing. If it needs separation, switch surfaces (ink ↔ off-white).

## 3. Typography

**Display Font:** Spectral (Production Type, via Google Fonts), with Source Serif 4 and Georgia as fallback
**Body Font:** Manrope (with system-ui and sans-serif as fallback)
**Numerals Font:** Spectral with `font-feature-settings: 'lnum', 'tnum'` for lining tabular figures on every R$/percentage/date (aspirational — see §8)

**Character:** Spectral is a contemporary humanist serif designed for screen reading. Moderate stroke contrast (warmer and more organic than Bodoni's Didone extremes), rounded terminals, broad humanist letterforms. The italic is a true italic — distinctly cursive, not just a sloped roman — which lets `<em>` emphasis carry real voice. Manrope underneath is calm, humanist, and modern enough to read as 2026, not 1996. The pair has commitment and warmth; it deliberately avoids Fraunces, Cormorant, Playfair, and the rest of the reflex-reject list. Neither family has been hand-waved.

**Why Spectral over Bodoni Moda:** the original pick (Bodoni Moda) carried Didone authority but read as cold and formal — closer to a fashion magazine than a private-banking conversation. Spectral keeps the serifed gravitas while bringing the warmth of a humanist serif. It also handles small sizes (form labels, footer microcopy) better than a Didone, which can look anemic below 14px.

### Hierarchy

- **Display** (Bodoni Moda 500, `clamp(2.75rem, 6vw, 5.25rem)`, line-height 1.02, letter-spacing −0.02em): hero h1 and the final-CTA h2 only. Ceiling is honored: under 6rem. Tracking floor is honored: not tighter than −0.04em.
- **Headline** (Bodoni Moda 500, `clamp(1.75rem, 3.2vw, 2.5rem)`, line-height 1.1, letter-spacing −0.015em): the per-section h2 (Duas soluções, Como funciona, Por que, Capital).
- **Numerals** (Bodoni Moda 500, `clamp(1.875rem, 4vw, 3rem)`, line-height 1, `lnum tnum`) — **aspirational, not shipped**. Reserved for a future worked-example surface where R$ / % / date carry the work. The `.num` utility class is wired in CSS, awaiting copy.
- **Title** (Manrope 600, `clamp(1.125rem, 1.4vw, 1.25rem)`, line-height 1.3): inline subtitles, FAQ questions.
- **Body** (Manrope 400, `1.0625rem` (17px), line-height 1.6, max-width 60–68ch): all running prose on warm-off-white. The 17px floor is deliberate — financial prose loses authority at 15px.
- **Body on Ink** (Manrope 400, `1.0625rem`, line-height 1.7): the same body, +0.1 line-height on ink surfaces per impeccable's light-on-dark rule.
- **Label** (Manrope 500, `0.8125rem`, letter-spacing 0.02em): used on CNPJ + copyright microcopy in the footer and on form helper text. No all-caps except where it labels a single word (e.g. "CRM/UF").

### Named Rules

**The Serif-Is-For-Numbers Rule.** Bodoni earns its place on (1) headings and (2) every numeric value (R$, %, date). Nowhere else. A serif phrase in body copy is forbidden; that's what Manrope is for. Numerics in sans are forbidden; that's what Bodoni is for. The split is the discipline.

**The 17px Body Floor.** Body text never drops below 17px on the page. Financial copy at 14–15px reads as the body of a Terms-and-Conditions document. We are not that.

**The No-All-Caps-Sentence Rule.** Uppercase is reserved for tightly tracked labels of ≤4 words (one-word "CRM", "CET", "LGPD" inline are allowed). No section eyebrows, no all-caps headings, no all-caps badges. The 2023 kicker is on the saturated-AI-grammar list; not here.

## 4. Elevation

Flat by default. Depth comes from surface switches (ink ↔ off-white) and from hairlines, not from shadows. The page should look like one printed sheet of cardstock with one folded section, not like a stack of floating panels.

### Shadow Vocabulary

There is no decorative shadow vocabulary. Two tiny exceptions, each functional:

- **Focus Ring** (`box-shadow: 0 0 0 3px oklch(0.55 0.12 35 / 0.35)`): the warm-clay focus state on inputs and buttons. Replaces both the default browser ring and any decorative border-color flicker. Accessibility, not decoration.
- **Form Lift** (`box-shadow: 0 1px 0 oklch(0.86 0.005 80)`): a single hairline shadow that quietly grounds the form panel against the warm-off-white background. Counts as a rule line, not as a card.

### Named Rules

**The No-Floating-Card Rule.** Soft shadows under cards are forbidden. The original LP's flat surface accidentally got this right; we keep that and harden it as doctrine. Hover effects on cards: do not lift; instead invert the surface (off-white → ink) or shift the rule to clay.

**The Ghost-Card Refusal.** The impeccable codex-specific defect — 1px border + soft wide drop shadow on the same element — is forbidden absolutely. Pick a hairline OR a tiny focus ring; never both as decoration.

## 5. Components

(Seed: form, button, input, nav, and rule patterns are committed. The product-story timeline and FAQ patterns get codified once implemented and we re-run `$impeccable document`.)

### Buttons

- **Shape:** Tight rectangle (4px radius). Not pill. Not 12px+ rounded.
- **Primary (on warm-off-white):** Ink-graphite background, off-white text, Manrope 500, label-size, letter-spacing 0.02em. Padding 16px × 28px. Hover: shift to ink-graphite-deeper. No transform, no lift, no shadow.
- **Primary (on ink):** Inverted — off-white background, ink-graphite text. Same shape, same padding.
- **Focus:** 3px warm-clay outer ring at 35% opacity. Visible on tab.
- **Disabled:** 40% opacity, cursor not-allowed.

### Inputs

- **Style:** Off-white surface raised one step (`surface-raised`), 1px ink-text border at 14% opacity (`oklch(0.20 0.01 240 / 0.14)`), 4px radius. Label above, never floating-label.
- **Typography:** Manrope 400 17px (matches body — financial inputs are not "form fields", they are statements of fact).
- **Focus:** Border shifts to warm-clay; same 3px ring at 35% as buttons. No accent fill.
- **Error:** Border shifts to ink-graphite (not red — red is fintech-vocabulary). Error message in 13px label-size beneath, prefixed with a small inline triangle SVG icon for color-blind accessibility.
- **Helper text:** Manrope 400 13px, `text-muted-on-body`.

### Navigation

- **Shape:** Single sticky top bar, always ink. No nav links — left side: the Midlej icon mark + a hairline divider + the wordmark "PLENOMED" set in Bodoni Moda 500 at 20–22px (uppercase, the only intentional uppercase wordmark on the page). Right side: one anchor CTA ("Quero meu acesso", Manrope 500 label-size, no button styling — a 1px warm-clay underline.). The hit area for the CTA is expanded via pseudo-element to 44px without disturbing the underline.
- **Scroll:** On scroll past 24px the bar condenses (padding + slightly deeper ink). Background and border-color transition only — no layout-property transitions.
- **Mobile:** Same composition, no hamburger needed.

### Rule Lines

- **On body:** 1px solid `rule-faint`, full-width or contained to the content max-width (set per section).
- **On ink:** 1px solid `rule-on-ink`, same.
- **Section rule:** Two-line treatment for major section openings — a 1px rule, 2px gap, another 1px rule. Earns its place at the masthead-style headings only.

### Form Panel

- **Surface:** `surface-raised` on warm-off-white, no shadow, hairline rule top and bottom. Not a card.
- **Title:** No separate panel title — the section heading "A medicina é sua. *O capital, a gente organiza.*" carries it.
- **Layout:** Single column, generous spacing. Labels above fields. No two-column layouts; financial forms are not address forms.
- **Submit button:** Full-width on mobile, content-width on desktop. Label: "Pedir uma proposta".
- **A11y:** On submit failure, focus moves to the first errored field. The honeypot field is offscreen, `aria-hidden`, `tabindex=-1`. Skip-link targets `#capital`.

### §III Claims Block

The Por que Pleno Med section replaces the SaaS 4-up benefit grid PRODUCT.md bans. Structure: section h2 → italic display lede → display-italic pull-quote → two `.claim` articles in a `.claims` list.

- **Pull-quote:** Bodoni Moda 400, `clamp(1.5rem, 3vw, 2.25rem)`, max-width 36ch, no quotation marks; the typography is the quote.
- **Claims:** Each `.claim` is a 2-column grid (label-left / prose-right, collapses to stacked at 880px). The label is an italic Bodoni Moda h3 in warm clay (e.g. *"Mesa dedicada ao plantonista."*). The prose is body Manrope with `text-muted-on-body` weight. Rule lines top and between. No cells, no cards.

### §II Flow Block

The Como funciona section ships as a rule-divided `.flow` list (semantic `<ol>` for sequence, visual numerals suppressed). Each `.flow-step` is a 2-column grid: a sentence-act h3 left (Bodoni 500, e.g. *"O capital cai em 24h."*), supporting prose right. No oversized step numerals — the heading IS the beat.

### Footer (Institutional Ink)

- **Surface:** Ink-graphite (matches §IV closer; the two ink surfaces form the page's closing breath). Substantial padding (`clamp(72px, 9vw, 120px)` top, `clamp(40px, 5vw, 64px)` bottom).
- **Layout:** 2-column grid at >720px (mark left, statement right), single column below. Legal microcopy sits in a full-width row under a hairline `rule-on-ink`.
- **Mark:** MidlejMark at 44px height, in off-white.
- **Statement:** Display Bodoni Moda 400, `clamp(1.5rem, 2.6vw, 2.125rem)`. "Pleno Med é a operação de crédito médico da *Midlej Capital*. Atende exclusivamente profissionais médicos no Brasil." Italic clay on "Midlej Capital" `<em>`.
- **Legal:** Manrope 500 label-size, `text-muted-on-ink`. CNPJ, copyright. No nav grid, no link columns — those are the SaaS footer reflex this is refusing.

### Discreet "novo" Tag

`.tag-novo` replaces the all-caps tracked badge originally specced. It's an italic Bodoni Moda inline mark at 0.55em, warm-clay, no border, no padding. Used once (on the §I "Crédito sobre a sua escala" h3).

## 6. Motion

Restraint is the voice. The page has exactly **four motion moments** plus the existing micro-interactions; nothing else moves on scroll, hover, or click.

### Easing tokens

```css
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);   /* page default */
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
```

No bounce, no elastic, no `cubic-bezier` with overshoot. All entrances ease-out only — the gesture decelerates into rest. Exit transitions, where they exist, run at ~75% of enter duration.

### The four moments

1. **Hero entrance.** `.hero-h1`, `.hero-sub`, `.hero-actions` fade-rise on load, staggered 0 / 90 / 180 ms, 700 ms each, `--ease-out-quint`. The page's signature opening gesture.
2. **§I Duas soluções stagger.** When `.duas-grid` enters the viewport, its two `.produto` articles fade-rise with a 90 ms sibling stagger. Emphasizes the duality (the brand's whole pitch).
3. **§II Como funciona stagger.** When `.flow` enters the viewport, its three `.flow-step` items fade-rise with a 90 ms sibling stagger. Earns its place because the section is literally an ordered sequence.
4. **§III pull-quote solo reveal.** When the `.pull-quote` enters the viewport, it fades up as a single moment (no stagger), 800 ms `--ease-out-quint`. The pull-quote is the centerpiece; the reveal makes it the moment.
5. **Form success entrance.** When `<LeadForm>` swaps to its success state, `.form-success` fades + rises 600 ms; the Bodoni numeral "I" delays 220 ms behind the container. This is the conversion moment; it deserves a careful gesture.

### Micro-interaction layer (unchanged, just documented)

- Header `data-scrolled` toggles background-color + border-color, 240 ms ease. No padding/layout transitions on the sticky bar.
- Hero / header CTAs: color + border-color on hover, 180 ms ease; the arrow translates `+3–4px` on hover.
- Form inputs: border-color + box-shadow on focus, 160 ms ease.
- Buttons: background-color on hover, 180 ms `--ease-out-quint`.

### Implementation pattern (reveal-on-scroll)

- Server renders content **visible** by default. Never gates content visibility on a class that JS must add later.
- An inline script in `<head>` adds `.reveal-ready` to `<html>` only if `IntersectionObserver` is supported.
- CSS only hides pre-reveal state when `.reveal-ready` is present: `.reveal-ready [data-reveal="true"]:not([data-revealed="true"]) > .reveal-item { opacity: 0; transform: translateY(10px); }`.
- `<RevealOnScroll />` (client component) observes every `[data-reveal="true"]` element and sets `data-revealed="true"` when it crosses the viewport at 15% threshold. Each element is unobserved after firing — this is a one-shot entrance, not a scroll-driven re-trigger.
- Sibling stagger uses `--i: 0 | 1 | 2 …` on each child; the transition-delay is `calc(var(--i) * 90ms)`.
- Failure modes: if JS doesn't run / IO isn't supported / hydration stalls, content stays visible. Sections never ship blank.

### Reduced motion

`@media (prefers-reduced-motion: reduce)` collapses every animation + transition to 0.01 ms via the standard `*, *::before, *::after` recipe. Hero entrance specifically sets `animation: none; opacity: 1; transform: none;` so it doesn't snap-flash. Reveal items are visible by default (`.reveal-ready` doesn't add anything to disable the hiding rule, but the transition-duration collapse makes the reveal effectively instant).

### What we do **not** do

- No scroll-progress bars, no parallax, no scroll-jacking.
- No fade-on-scroll for sections, headings, or paragraphs (only the four moments above).
- No hover effects on the `.produto`, `.claim`, or `.flow-step` blocks — they aren't interactive and shouldn't suggest they are.
- No spinner / loading icons. Form submit shows "Enviando…" text + `:disabled` dim; that's the loading affordance.
- No micro-bounces, no scale-on-hover for cards, no card lift. The design system explicitly forbids both.

## 7. Do's and Don'ts

### Do:
- **Do** carry every claim with a name. "A operação é estruturada pela Midlej Capital" is the shape. "Operação regulada" alone is forbidden. Specific noun + concrete fact, not adjective.
- **Do** put the warm clay accent on exactly ONE word of text — the italic `<em>capital</em>` in the hero h1. Everywhere else, clay is a UI accent only (link underline, CTA underline, focus ring, selection background). Italic emphasis elsewhere on the page stays in the parent text color.
- **Do** set every R$ value, percentage, and date in Bodoni Moda with `lnum tnum` features — when the worked-example section ships. Until then, the `.num` class is wired and waiting.
- **Do** keep body text at 17px floor with `text-wrap: pretty` on prose and `text-wrap: balance` on h1/h2/h3.
- **Do** invert surfaces (off-white ↔ ink) to create separation. Two surfaces, hard cut, hairline at the join.
- **Do** ship the form with LGPD consent checkbox + linked privacy policy + terms; never collect WhatsApp without explicit consent base.
- **Do** respect `prefers-reduced-motion`. The single hero entrance and any link/button transition gets a crossfade fallback.

### Don't:
- **Don't** use the **generic fintech teal/cyan** family. PRODUCT.md names this as anti-reference #1. No exceptions, including hover states or microcopy highlights.
- **Don't** use **stock-photo médico clichés**. PRODUCT.md names smiling-doctor-with-stethoscope as anti-reference #2. This seed ships no imagery; if photography lands later, it is real and commissioned, not stock.
- **Don't** build **SaaS-template scaffolding**: 4-up benefit cards, 3-step numbered process cards, badge rows, "transform your X" prose. PRODUCT.md names these as anti-reference #3.
- **Don't** apply the **traditional-bank gold-and-navy aesthetic**. PRODUCT.md names this as anti-reference #4. Gold is forbidden; navy is forbidden; marble textures are forbidden.
- **Don't** put a tiny uppercase tracked eyebrow above section headings. The 01/02/03 numbered card row is also forbidden as section scaffolding.
- **Don't** pair a 1px border with a box-shadow blur ≥16px on the same element (the impeccable "ghost-card" defect).
- **Don't** use border-radius ≥12px on cards, sections, or inputs. The cap is 6px; buttons and inputs sit at 4px.
- **Don't** use border-left or border-right >1px as a colored stripe accent.
- **Don't** use gradient text (`background-clip: text` on a gradient). Emphasis through weight and size.
- **Don't** use Inter, DM Sans, Plus Jakarta Sans, Fraunces, Cormorant, Playfair, Instrument Sans, or any other reflex-reject family. The pick is committed: Bodoni Moda + Manrope.
- **Don't** drop body text below 17px. Financial copy at 14–15px reads as terms-and-conditions, not as authority.
- **Don't** write aphoristic-cadence body copy (the "serious statement, then punchy short rebuttal" rhythm). PRODUCT.md flags this; the rebuild rewrites every instance.
- **Don't** reintroduce numbered section kickers (I./II./III./IV.) or oversized step numerals (01/02/03). The cut from the editorial-magazine reflex is deliberate; that lane is the saturated AI default of 2026 per `brand.md`. Section breaks happen via surface inversion + spacing, not labels.
- **Don't** ship a SaaS-footer link grid (Product / Company / Resources / Legal). The institutional ink footer is a closing breath, not a sitemap.

## 8. Launch scope — what ships, what's aspirational

The system as authored exceeds what the first launch ships. Recording the gap honestly here so future iterations don't lose track:

- **Worked-example surface (`mostrar a conta`):** Specced but not built. PRODUCT.md principle #5 is held back; the page makes claims without showing the math today. When this lands, it ships between §II and §III with one antecipação example + one crédito example (R$ + taxa + CET, real or labeled `exemplo ilustrativo`).
- **Regulator credential block:** Cut from the design system. Decision recorded 2026-06-03: the brand does not surface a CVM nº on the page at launch. If regulatory copy returns later, it lives quietly in the footer legal row, not as a standalone block.
- **§III as 4-up grid:** Cut. Replaced by `.claims` block (pull-quote + two named sub-claims), described above.
- **`.badge-novo` (all-caps tracked):** Cut. Replaced by `.tag-novo` (italic Bodoni Moda inline mark).
- **Roman-numeral kickers (I./II./III./IV.):** Cut. Section structure relies on surface inversion + spacing + heading authority.
- **Oversized step numerals (01/02/03):** Cut. §II ships as `.flow` (rule-divided sentence-act list).
