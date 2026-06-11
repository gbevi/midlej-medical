import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { HubHeader } from "../_hub/HubHeader";
import { HubLeadForm } from "../_hub/HubLeadForm";
import { SmoothAnchor } from "../_hub/SmoothAnchor";

export const metadata: Metadata = {
  title: "Proteção em dólar · Midlej Capital",
  description:
    "Americanas, Master, real corroído. Três prejuízos que o brasileiro já conhece — e uma forma simples de tirar parte do seu patrimônio do risco-Brasil.",
};

/* ================================================================
   Page
   ================================================================ */

export default function DolarPage() {
  return (
    <main
      data-brand
      id="main"
      className="brand-body min-h-screen bg-paper text-ink"
    >
      <SmoothAnchor />
      <HubHeader />

      <Hero />
      <Prejuizos />
      <Virada />
      <Objecoes />
      <ComoFunciona />
      <Autoridade />
      <FAQSection />
      <Contato />
      <Footer />
    </main>
  );
}

/* ================================================================
   Shared atoms
   ================================================================ */

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Mark({ eyebrow, dark }: { eyebrow: string; dark: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden
        className={`h-px ${dark ? "bg-[var(--color-line-on-ink)]" : "bg-[var(--color-line)]"}`}
        style={{ width: 48 }}
      />
      <p
        className={`t-mono text-[0.72rem] tracking-[0.18em] uppercase whitespace-nowrap ${
          dark ? "text-on-ink-mute" : "text-ink-mute"
        }`}
      >
        {eyebrow}
      </p>
    </div>
  );
}

/* ================================================================
   01 — Hero (ink)
   Headline carrega o gatilho. Gráfico discreto BRL/USD ao fundo.
   ================================================================ */

function Hero() {
  return (
    <section
      id="top"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-ink text-on-ink-strong"
    >
      <BrlUsdBackdrop />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-40 md:pt-48 pb-28 md:pb-36">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9">
            <p className="reveal r-1 t-mono text-[0.72rem] tracking-[0.18em] uppercase text-on-ink-mute mb-6">
              Proteção em dólar · Midlej Capital
            </p>
            <h1 className="reveal r-1 t-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[0.98] text-balance text-on-ink-strong max-w-[22ch]">
              Americanas. Master.{" "}
              <span className="text-on-ink-soft">
                E o seu dinheiro, parado em real.
              </span>
            </h1>
            <p className="reveal r-2 mt-10 t-lede text-on-ink-soft text-[1.0625rem] md:text-[1.2rem] max-w-[58ch]">
              <span className="asterisk" />
              Três prejuízos que o brasileiro já conhece — e uma forma simples
              de não ser o próximo. Investir parte do seu patrimônio em dólar é
              mais fácil do que parece.
            </p>
            <div className="reveal r-3 mt-12 flex flex-wrap items-center gap-6">
              <Link href="#contato" className="btn-primary-inverse">
                Fazer meu diagnóstico gratuito
                <Arrow />
              </Link>
              <Link href="#prejuizos" className="btn-ghost-inverse">
                Ver os três prejuízos
              </Link>
            </div>
            <p className="reveal r-3 mt-6 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-on-ink-mute">
              Leva 2 minutos · sem compromisso
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="mx-auto max-w-[1400px] border-t border-line-on-ink"
      />
    </section>
  );
}

/**
 * Curva discreta BRL × USD nos últimos 10 anos. Trajetória real real-dólar
 * (2015 ≈ 3,30 → 2025 ≈ 5,40+), simplificada para fundo editorial. Não
 * carrega rótulos — é textura, não dataviz.
 */
function BrlUsdBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]">
      <svg
        viewBox="0 0 1400 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="bul-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id="bul-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        {/* Hairlines de grade — quase invisíveis */}
        {[120, 240, 360, 480].map((y) => (
          <line
            key={y}
            x1="0"
            x2="1400"
            y1={y}
            y2={y}
            stroke="#ffffff"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        ))}
        {/* Trajetória BRL/USD — sobe ao longo do tempo (real perde valor) */}
        <path
          d="M 0 460 C 140 440, 260 420, 380 380 C 500 340, 600 360, 720 320 C 840 280, 940 260, 1060 210 C 1180 160, 1280 130, 1400 100"
          stroke="url(#bul-stroke)"
          strokeWidth="1.8"
          fill="none"
        />
        {/* Sombra leve abaixo da curva */}
        <path
          d="M 0 460 C 140 440, 260 420, 380 380 C 500 340, 600 360, 720 320 C 840 280, 940 260, 1060 210 C 1180 160, 1280 130, 1400 100 L 1400 600 L 0 600 Z"
          fill="url(#bul-fade)"
        />
      </svg>
    </div>
  );
}

/* ================================================================
   02 — Três prejuízos (paper)
   ================================================================ */

function Prejuizos() {
  const items = [
    {
      tag: "Americanas",
      stat: "−99%",
      body: "Sólida, auditada, gigante da bolsa. R$ 25 bilhões de rombo. A ação derreteu de R$ 12 para centavos.",
    },
    {
      tag: "Banco Master",
      stat: "Liquidado",
      body: "CDB 'garantido pelo FGC'. Liquidado pelo Banco Central. Acima de R$ 250 mil? Fila de credores por 10, 15 anos.",
    },
    {
      tag: "O real",
      stat: "−50%",
      body: "Nenhum escândalo. Nenhuma manchete. Mesmo assim, perdeu mais da metade do valor frente ao dólar na última década.",
    },
  ];
  return (
    <section id="prejuizos" data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-36">
        <Mark eyebrow="Três prejuízos recentes" dark={false} />
        <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.04] text-ink max-w-[24ch]">
          O risco-Brasil não bate à porta. Ele já entrou.
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-12">
          {items.map((p) => (
            <article
              key={p.tag}
              className="col-span-12 md:col-span-4 border-t border-line pt-8 flex flex-col"
            >
              <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-emphasis">
                {p.tag}
              </p>
              <p className="mt-6 t-display-light text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[0.95] tabular-nums text-ink">
                {p.stat}
              </p>
              <p className="mt-6 t-body text-[1rem] leading-[1.65] text-ink-soft max-w-[40ch]">
                {p.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 md:mt-24 border-t border-line pt-10">
          <p className="t-quote text-[clamp(1.375rem,2.8vw,2.25rem)] leading-[1.2] text-ink max-w-[44ch]">
            <span className="asterisk" />
            Renda variável quebrou. Renda fixa quebrou. A própria moeda derrete.
            O problema não é o ativo — é estar 100% exposto a um único país.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   03 — A virada (bone)
   ================================================================ */

function Virada() {
  return (
    <section data-tone="light" className="bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <Mark eyebrow="A virada" dark={false} />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="t-display text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.05] text-ink max-w-[22ch]">
              A elite financeira sempre fez isso.{" "}
              <span className="text-ink-soft">Agora você também pode.</span>
            </h2>
            <p className="mt-12 t-body text-[1.0625rem] leading-[1.7] text-ink-soft max-w-[58ch]">
              Bancos, family offices e os mais ricos do Brasil sempre
              mantiveram parte do patrimônio fora — em dólar, fora do alcance
              do risco-Brasil. Não é fuga, não é especulação: é diversificação
              de país e de moeda.
            </p>
            <p className="mt-6 t-body text-[1.0625rem] leading-[1.7] text-ink-soft max-w-[58ch]">
              E hoje isso cabe no seu bolso.
            </p>

            <ViradaDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Diagrama "antes/depois": 100% Brasil → mix Brasil + dólar/internacional.
 * Duas barras horizontais segmentadas, sem dataviz pesado.
 */
function ViradaDiagram() {
  return (
    <div className="mt-16 grid grid-cols-12 gap-8 md:gap-12 items-start">
      <div className="col-span-12 md:col-span-6">
        <p className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
          Antes
        </p>
        <p className="mt-3 t-display text-[1.125rem] leading-[1.3] text-ink">
          Patrimônio 100% Brasil
        </p>
        <div
          aria-hidden
          className="mt-6 h-3 w-full bg-[var(--color-ink)]"
          style={{ opacity: 0.85 }}
        />
        <p className="mt-3 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-ink-mute">
          BRL · CDI · Bolsa BR · Imóvel BR
        </p>
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-emphasis">
          Depois
        </p>
        <p className="mt-3 t-display text-[1.125rem] leading-[1.3] text-ink">
          Diversificado por país e moeda
        </p>
        <div className="mt-6 h-3 w-full flex">
          <span
            aria-hidden
            className="h-3 bg-[var(--color-ink)]"
            style={{ width: "65%", opacity: 0.85 }}
          />
          <span
            aria-hidden
            className="h-3 bg-[var(--color-emphasis)]"
            style={{ width: "35%" }}
          />
        </div>
        <p className="mt-3 t-mono text-[0.72rem] tracking-[0.14em] uppercase text-ink-mute">
          BRL <span className="text-emphasis">· USD · Internacional</span>
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   04 — Quebra de objeção (paper)
   ================================================================ */

function Objecoes() {
  const items = [
    {
      q: "Preciso de muito dinheiro?",
      a: "Não. Começa com pouco — a porta de entrada hoje é muito menor do que era há 10 anos.",
    },
    {
      q: "Preciso entender de mercado?",
      a: "Não. A gente desenha pra você. Você decide o quanto, a gente cuida do como.",
    },
    {
      q: "É arriscado? É golpe?",
      a: "É o oposto: é reduzir a concentração de risco que você já tem. Conta institucional, custódia no exterior, no seu nome.",
    },
  ];
  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-9">
            <Mark eyebrow="Não é nada de outro mundo" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.04] text-ink max-w-[22ch]">
              Você imagina que é complicado.{" "}
              <span className="text-ink-soft">Não é.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 border-t border-line pt-10">
          {items.map((o) => (
            <article
              key={o.q}
              className="col-span-12 md:col-span-4 flex flex-col"
            >
              <p className="t-display text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.25] text-ink max-w-[20ch]">
                {o.q}
              </p>
              <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-ink-soft max-w-[36ch]">
                {o.a}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Como funciona (bone, 3 passos)
   ================================================================ */

function ComoFunciona() {
  const steps = [
    {
      n: "I",
      title: "Diagnóstico",
      body: "A gente entende seu momento, seu patrimônio e seu objetivo. Gratuito, sem compromisso, sem material comercial.",
    },
    {
      n: "II",
      title: "Plano",
      body: "Montamos sua estratégia de proteção em dólar sob medida. Quanto, em que estrutura, com que liquidez.",
    },
    {
      n: "III",
      title: "Execução acompanhada",
      body: "Você investe com orientação. Abertura de conta institucional, operação, revisão. Sem se perder sozinho.",
    },
  ];
  return (
    <section data-tone="light" className="bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-9">
            <Mark eyebrow="Como funciona" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.05] text-ink max-w-[22ch]">
              Três passos. Um responsável por cada um deles.
            </h2>
          </div>
        </div>
        <ol className="border-t border-line">
          {steps.map((s) => (
            <li
              key={s.n}
              className="border-b border-line py-12 md:py-14 grid grid-cols-12 gap-6 items-baseline"
            >
              <div className="col-span-12 md:col-span-2">
                <span className="t-display-light text-[clamp(1.875rem,3vw,2.5rem)] leading-none text-emphasis tabular-nums">
                  {s.n}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="t-display text-[clamp(1.25rem,1.8vw,1.625rem)] leading-[1.15] text-ink">
                  {s.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="t-body text-[0.95rem] leading-[1.6] text-ink-soft max-w-[52ch]">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Link href="#contato" className="btn-primary">
            Começar pelo diagnóstico
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   06 — Autoridade (paper)
   ================================================================ */

function Autoridade() {
  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-5">
            <Mark eyebrow="Midlej Capital" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.05] text-ink max-w-[20ch]">
              Banca privada independente, com tese clara.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7">
            <p className="t-body text-[1.0625rem] leading-[1.7] text-ink-soft max-w-[58ch]">
              A Midlej Capital é consultoria de investimentos com registro na
              CVM. Trabalhamos remunerados pelo cliente — não recebemos rebate
              de fundo, seguradora ou estrutura. Quando recomendamos dólar e
              alocação internacional, é tese, não comissão.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-x-6 md:gap-x-10 border-t border-line pt-8">
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Modelo
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  Fee recorrente
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Registro
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  CVM
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Conflito
                </dt>
                <dd className="t-display-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.1] mt-2 text-ink">
                  Zero rebate
                </dd>
              </div>
            </dl>

            {/* Slots editoriais para depoimentos — preencher quando tiver material */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-10">
              <DepoimentoSlot />
              <DepoimentoSlot />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DepoimentoSlot() {
  return (
    <figure className="col-span-12 md:col-span-6 border-t border-line pt-6">
      <p className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
        Depoimento · em preparação
      </p>
      <blockquote className="mt-4 t-quote text-[1rem] leading-[1.45] text-ink-soft max-w-[40ch]">
        <span className="asterisk" />
        Slot reservado para depoimento de cliente — foto, nome e frase.
      </blockquote>
    </figure>
  );
}

/* ================================================================
   07 — FAQ (paper)
   ================================================================ */

function FAQSection() {
  const faqs = [
    {
      q: "Meu dinheiro fica preso?",
      a: "Não. A liquidez depende do veículo escolhido — há opções com resgate em D+0/D+1 e estruturas com vencimento. O desenho responde ao seu objetivo, não o contrário.",
    },
    {
      q: "Como eu acesso o dinheiro?",
      a: "Conta institucional no seu nome, com login próprio, extrato e movimentação online. Você não nos repassa custódia. Tudo passa por corretora ou banco regulado.",
    },
    {
      q: "Tem imposto?",
      a: "Sim — varia por estrutura. Há veículos com tributação mais eficiente (fundos no exterior, previdência internacional, ETFs). Apresentamos o efeito tributário antes da decisão, não depois.",
    },
    {
      q: "E se o dólar cair?",
      a: "Pode cair, e provavelmente vai oscilar. A ideia não é ganhar com a alta do dólar — é não estar 100% exposto a uma única moeda. Em horizonte plurianual, a moeda forte tende a preservar poder de compra; mas oscilações no caminho são parte do jogo.",
    },
    {
      q: "Quanto custa o serviço?",
      a: "Fee proporcional à complexidade do caso, conhecido antes do aceite. Não cobramos percentual sobre patrimônio investido — é mensalidade ou anuidade fixa, revisada só quando o escopo muda.",
    },
  ];
  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 md:col-span-4">
            <Mark eyebrow="Dúvidas frequentes" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.04] text-ink max-w-[16ch]">
              O que costuma travar a decisão.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <ul className="border-t border-line">
              {faqs.map((f, i) => (
                <li key={i} className="border-b border-line">
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6 py-6 md:py-7">
                      <span className="t-display text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.3] text-ink">
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className="t-mono text-emphasis text-[0.95rem] transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 md:pb-7 t-body text-[0.95rem] leading-[1.65] text-ink-soft max-w-[56ch]">
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   08 — CTA final + form (ink)
   ================================================================ */

function Contato() {
  return (
    <section
      id="contato"
      data-tone="dark"
      className="bg-ink text-on-ink-strong"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-6">
            <Mark eyebrow="Diagnóstico gratuito" dark />
            <h2 className="mt-10 t-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.0] text-on-ink-strong max-w-[22ch]">
              Os próximos Americanas e Master já estão sendo gestados.
            </h2>
            <p className="mt-10 t-lede text-on-ink-soft text-[1.1rem] max-w-[44ch]">
              A pergunta é onde vai estar o seu dinheiro.
            </p>
            <p className="mt-8 t-body text-[0.95rem] leading-[1.65] text-on-ink-soft max-w-[48ch]">
              Preencha em 2 minutos. Retornamos pelo WhatsApp em até 1 dia
              útil, sem material comercial, sem gravação.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HubLeadForm
              tone="dark"
              submitLabel="Quero meu diagnóstico gratuito"
              origin="Proteção em Dólar"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   09 — Footer
   ================================================================ */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-tone="dark"
      className="bg-ink text-on-ink-soft border-t border-line-on-ink"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <Logo tone="dark" subText="CAPITAL" className="h-12 w-auto" />
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="t-quote text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.4] text-on-ink-strong max-w-[40ch]">
              Midlej Capital. Banca privada de planejamento financeiro,
              conduzida em Brasília, atende em todo o Brasil.
            </p>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-line-on-ink flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[0.78rem] tracking-[0.04em] text-on-ink-mute">
          <span>Midlej Capital · CNPJ 35.340.252/0001-44</span>
          <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
