import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { HubHeader } from "../_hub/HubHeader";
import { HubLeadForm } from "../_hub/HubLeadForm";
import { SmoothAnchor } from "../_hub/SmoothAnchor";
import {
  CurrencyOrbitsClient as CurrencyOrbits,
  AllocationRingsClient as AllocationRings,
  CompoundCurveClient as CompoundCurve,
} from "../_hub/scenes/clients";

export const metadata: Metadata = {
  title: "Investimentos · Midlej Capital",
  description:
    "Banca de investimentos sem conflito para quem já construiu patrimônio. Sem produto da prateleira, sem comissão por venda.",
};

/* ================================================================
   Page
   ================================================================ */

export default function InvestimentosPage() {
  return (
    <main
      data-brand
      id="main"
      className="brand-body min-h-screen bg-paper text-ink"
    >
      <SmoothAnchor />
      <HubHeader />

      <Hero />
      <Marcos />
      <OndeOCapitalVive />
      <Manifesto />
      <Composicao />
      <ComoConduzimos />
      <TempoTrabalhando />
      <ParaQuem />
      <Depoimentos />
      <Contato />
      <FAQSection />
      <OutrasFrentes />
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
   ================================================================ */

function Hero() {
  return (
    <section
      id="top"
      data-tone="dark"
      className="relative bg-ink text-on-ink-strong"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-40 md:pt-48 pb-28 md:pb-36">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9">
            <p className="reveal r-1 t-mono text-[0.72rem] tracking-[0.18em] uppercase text-on-ink-mute mb-6">
              Investimentos · Midlej Capital
            </p>
            <h1 className="reveal r-1 t-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[0.98] text-balance text-on-ink-strong max-w-[20ch]">
              Onde o capital vive,<br />
              <span className="text-on-ink-soft">e como ele cresce.</span>
            </h1>
            <p className="reveal r-2 mt-10 t-lede text-on-ink-soft text-[1.0625rem] md:text-[1.2rem] max-w-[52ch]">
              <span className="asterisk" />Banca privada de investimentos para
              quem já construiu patrimônio. Recomendação sem comissão por
              venda, estruturada caso a caso, acompanhada ao longo do tempo.
            </p>
            <div className="reveal r-3 mt-12 flex flex-wrap items-center gap-6">
              <Link href="#contato" className="btn-primary-inverse">
                Pedir primeira conversa
                <Arrow />
              </Link>
              <Link href="#manifesto" className="btn-ghost-inverse">
                Como pensamos
              </Link>
            </div>
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

/* ================================================================
   02 — Marcos editoriais (paper)
   ================================================================ */

function Marcos() {
  const items = [
    { k: "Atuação", v: "Brasil + internacional", note: "Conta no Brasil e veículo offshore quando faz sentido" },
    { k: "Modelo", v: "Fee recorrente", note: "Remunerados pelo cliente, não pelo produto" },
    { k: "Plataforma", v: "Institucional", note: "Acesso a estruturas fora da prateleira de banco" },
    { k: "Relação", v: "Plurianual", note: "Acompanhamento contínuo, não venda pontual" },
  ];
  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <Mark eyebrow="Como operamos" dark={false} />
        <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-12 border-t border-line pt-10">
          {items.map((m) => (
            <div
              key={m.k}
              className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col"
            >
              <p className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                {m.k}
              </p>
              <p className="mt-4 t-display-light text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.04] text-ink">
                {m.v}
              </p>
              <p className="mt-4 t-body text-[0.95rem] leading-[1.55] text-ink-soft max-w-[34ch]">
                {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   03 — Manifesto (paper, quote dominante)
   ================================================================ */

function Manifesto() {
  return (
    <section id="manifesto" data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <Mark eyebrow="Manifesto" dark={false} />
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="t-quote text-[clamp(1.5rem,3.2vw,2.625rem)] leading-[1.18] max-w-[38ch] text-ink">
              <span className="asterisk" />
              Investir não é comprar um produto. É organizar uma decisão
              dentro de um patrimônio que já existe.
            </p>
            <p className="mt-12 t-body text-[1.0625rem] leading-[1.7] text-ink-soft max-w-[58ch]">
              A maioria dos brasileiros com patrimônio formado é atendida por
              gerentes que vendem o que está na grade do banco. O incentivo é
              a comissão. A consequência prática é uma carteira montada
              produto a produto, sem desenho, sem revisão e sem responsável
              por ela.
            </p>
            <p className="mt-6 t-body text-[1.0625rem] leading-[1.7] text-ink-soft max-w-[58ch]">
              Operamos no modelo oposto. O cliente nos remunera com fee
              recorrente; recebemos zero rebate de fundo, de seguradora ou de
              estrutura. Quando recomendamos um caminho, ele serve à família,
              não à distribuição.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   I — Onde o capital vive (ink, Globe 3D)
   Inserida entre Marcos e Manifesto: depois dos números do "como
   operamos", trazemos o "onde" — geografia de exchanges, jurisdições,
   contas. O globo 3D dá corpo à ideia.
   ================================================================ */

function OndeOCapitalVive() {
  return (
    <section data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-36">
        <div className="grid grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <Mark eyebrow="Geografia do capital" dark />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.04] text-on-ink-strong max-w-[18ch]">
              Onde o capital vive.
            </h2>
            <p className="mt-10 t-lede text-on-ink-soft text-[1.05rem] max-w-[40ch]">
              <span className="asterisk" />
              Carteira global construída com método. Conta no Brasil,
              veículo offshore quando a estrutura pede, exposição ajustada
              caso a caso.
            </p>
            <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-on-ink-soft max-w-[48ch]">
              Trabalhamos em corretoras institucionais e bancos de
              investimentos com balcão internacional. Abertura de conta no
              exterior é assistida do início ao fim, sem terceirizar a
              documentação.
            </p>
            <dl className="mt-12 grid grid-cols-3 gap-x-6 border-t border-line-on-ink pt-6">
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-on-ink-mute">
                  Jurisdições
                </dt>
                <dd className="t-display-light text-[clamp(1rem,1.6vw,1.375rem)] leading-[1.15] tabular-nums mt-2 text-on-ink-strong">
                  EUA · UK · UE
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-on-ink-mute">
                  Moeda
                </dt>
                <dd className="t-display-light text-[clamp(1rem,1.6vw,1.375rem)] leading-[1.15] tabular-nums mt-2 text-on-ink-strong">
                  USD · EUR · GBP
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-on-ink-mute">
                  Conta
                </dt>
                <dd className="t-display-light text-[clamp(1rem,1.6vw,1.375rem)] leading-[1.15] tabular-nums mt-2 text-on-ink-strong">
                  Assistida
                </dd>
              </div>
            </dl>
            <div className="mt-10">
              <Link href="#contato" className="btn-ghost-inverse">
                Quero diversificar globalmente
                <Arrow />
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 order-1 md:order-2">
            <div className="w-full aspect-square">
              <CurrencyOrbits className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   II — Composição (ink, AltLayers 3D)
   Inserida entre Manifesto e Como conduzimos: cada classe de ativo
   entra por uma razão. AltLayers separa as camadas conforme o scroll.
   ================================================================ */

function Composicao() {
  return (
    <section data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-36">
        <Mark eyebrow="Composição" dark />

        <div className="mt-10 relative">
          <div className="w-full aspect-[16/10] md:aspect-[16/9] relative">
            <div className="absolute inset-0">
              <AllocationRings className="w-full h-full" />
            </div>
            <div className="absolute left-0 bottom-0 max-w-[24ch] p-2 md:p-6">
              <h2 className="t-display text-[clamp(2rem,4.5vw,4rem)] leading-[0.96] text-on-ink-strong">
                Cada classe<br />tem um papel.
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="col-span-12 md:col-span-6">
            <p className="t-lede text-on-ink-soft text-[1.05rem] max-w-[44ch]">
              Uma carteira é um sistema de exposições. Cada camada entra
              porque carrega uma função: liquidez, proteção, crescimento,
              prêmio.
            </p>
            <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-on-ink-soft max-w-[52ch]">
              Renda fixa local segura o caixa de curto prazo. Renda variável
              global captura o crescimento. Crédito privado estruturado
              recolhe prêmio sem volatilidade equivalente. Alternativos
              descorrelacionam o conjunto. Cada peso é decisão, não
              recomendação de prateleira.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <ul className="divide-y divide-[var(--color-line-on-ink)] border-t border-line-on-ink">
              <li className="py-5 flex items-baseline justify-between gap-6">
                <div>
                  <p className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-on-ink-mute">
                    Camada 1
                  </p>
                  <p className="mt-1 t-display text-[1.0625rem] leading-[1.2] text-on-ink-strong">
                    Caixa e liquidez
                  </p>
                </div>
                <span className="t-display-light text-[1.5rem] tabular-nums text-emphasis">
                  10–20%
                </span>
              </li>
              <li className="py-5 flex items-baseline justify-between gap-6">
                <div>
                  <p className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-on-ink-mute">
                    Camada 2
                  </p>
                  <p className="mt-1 t-display text-[1.0625rem] leading-[1.2] text-on-ink-strong">
                    Renda fixa estruturada
                  </p>
                </div>
                <span className="t-display-light text-[1.5rem] tabular-nums text-emphasis">
                  25–35%
                </span>
              </li>
              <li className="py-5 flex items-baseline justify-between gap-6">
                <div>
                  <p className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-on-ink-mute">
                    Camada 3
                  </p>
                  <p className="mt-1 t-display text-[1.0625rem] leading-[1.2] text-on-ink-strong">
                    Renda variável global
                  </p>
                </div>
                <span className="t-display-light text-[1.5rem] tabular-nums text-emphasis">
                  20–30%
                </span>
              </li>
              <li className="py-5 flex items-baseline justify-between gap-6 border-b border-line-on-ink">
                <div>
                  <p className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-on-ink-mute">
                    Camada 4
                  </p>
                  <p className="mt-1 t-display text-[1.0625rem] leading-[1.2] text-on-ink-strong">
                    Alternativos
                  </p>
                </div>
                <span className="t-display-light text-[1.5rem] tabular-nums text-emphasis">
                  10–25%
                </span>
              </li>
            </ul>
            <p className="mt-6 t-body text-[0.82rem] leading-[1.55] text-on-ink-mute max-w-[44ch]">
              <span className="asterisk" />
              Faixas ilustrativas, calibradas caso a caso. Não constituem
              recomendação de alocação genérica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   III — O tempo trabalhando (paper, PrevidenciaStack 3D)
   Inserida entre Como conduzimos e Para quem: dá corpo à ideia de que
   a vantagem da banca é continuidade — e ao composto que ela viabiliza.
   ================================================================ */

function TempoTrabalhando() {
  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-36">
        <Mark eyebrow="O ativo principal" dark={false} />
        <div className="mt-10 grid grid-cols-12 gap-8 items-end">
          <h2 className="col-span-12 md:col-span-7 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.04] text-ink max-w-[20ch]">
            O tempo trabalhando.
          </h2>
          <p className="col-span-12 md:col-span-5 t-lede text-ink-soft text-[1.05rem] max-w-[40ch]">
            <span className="asterisk" />
            Aporte estável + retorno reinvestido + horizonte longo. A curva
            que ninguém vê quando começa.
          </p>
        </div>

        {/* Curva ocupa toda a largura — é a coisa que precisa ser desenhada */}
        <div className="mt-14 md:mt-20 w-full aspect-[16/8] md:aspect-[16/7]">
          <CompoundCurve className="w-full h-full" />
        </div>

        <div className="mt-12 grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-6">
            <p className="t-body text-[0.95rem] leading-[1.65] text-ink-soft max-w-[50ch]">
              A diferença entre uma carteira eficiente e uma carteira média
              não aparece no primeiro ano. Aparece no oitavo, no décimo
              quinto, no vigésimo. É por isso que a banca é plurianual: o
              ganho do modelo é função do tempo.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <dl className="mt-12 grid grid-cols-3 gap-x-6 md:gap-x-10 border-t border-line pt-6">
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Em 10 anos
                </dt>
                <dd className="t-display-light text-[clamp(1.25rem,2vw,1.75rem)] leading-[1] tabular-nums mt-2 text-ink">
                  +85%
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Em 20 anos
                </dt>
                <dd className="t-display-light text-[clamp(1.25rem,2vw,1.75rem)] leading-[1] tabular-nums mt-2 text-ink">
                  +260%
                </dd>
              </div>
              <div>
                <dt className="t-mono text-[0.66rem] tracking-[0.16em] uppercase text-ink-mute">
                  Em 30 anos
                </dt>
                <dd className="t-display-light text-[clamp(1.25rem,2vw,1.75rem)] leading-[1] tabular-nums mt-2 text-ink">
                  +570%
                </dd>
              </div>
            </dl>
            <p className="mt-4 t-body text-[0.78rem] leading-[1.5] text-ink-mute max-w-[42ch]">
              <span className="asterisk" />
              Acumulação ilustrativa com retorno real composto de 6% ao ano,
              reinvestimento integral, aporte mensal estável. Não é projeção
              nem promessa de resultado.
            </p>
            <div className="mt-10">
              <Link href="#contato" className="btn-ghost">
                Conversar sobre horizonte
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   04 — Como conduzimos (bone, 4 etapas)
   ================================================================ */

function ComoConduzimos() {
  const steps = [
    {
      n: "I",
      title: "Diagnóstico",
      body: "Mapeamento do patrimônio existente, do fluxo de caixa real e dos riscos invisíveis. Sem questionário genérico — conversa estruturada com leitura de extratos.",
    },
    {
      n: "II",
      title: "Estrutura",
      body: "Desenho de alocação, proteção e sucessão construído caso a caso. Cada decisão fundamentada no que serve à família, não no que rende para o intermediário.",
    },
    {
      n: "III",
      title: "Execução",
      body: "Implementação assistida no ambiente que faz sentido — conta institucional, veículo offshore, previdência, estruturas alternativas — com responsável nomeado.",
    },
    {
      n: "IV",
      title: "Acompanhamento",
      body: "Revisões trimestrais, ajustes nos pontos de inflexão pessoais, fiscais e regulatórios. Plano vivo, não relatório arquivado.",
    },
  ];
  return (
    <section data-tone="light" className="bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-9">
            <Mark eyebrow="Como conduzimos" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.05] text-ink max-w-[20ch]">
              Quatro frentes ativas ao mesmo tempo.
            </h2>
            <p className="mt-8 t-lede text-ink-soft max-w-[54ch]">
              Cada caso entra por uma porta diferente. O programa percorre as
              quatro frentes na ordem que o caso pede.
            </p>
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
      </div>
    </section>
  );
}

/* ================================================================
   05 — Para quem (paper, 4 perfis)
   ================================================================ */

function ParaQuem() {
  const profiles = [
    {
      tag: "Médicos PJ",
      body: "Plantonistas e especialistas que somam renda alta com pouca disponibilidade. Estruturamos previdência, proteção e investimento sem onda comercial.",
    },
    {
      tag: "Empresários e sócios",
      body: "Patrimônio próximo do negócio. Cuidamos da separação caixa pessoal × empresa, sucessão, holding e exposição internacional do lucro retido.",
    },
    {
      tag: "Executivos C-level",
      body: "Stock options, RSU, bônus de longo prazo e mobilidade internacional. Planejamos a tributação e a alocação de quem é remunerado em camadas.",
    },
    {
      tag: "Profissionais liberais",
      body: "Advogados, engenheiros, consultores. Receita estável mas sem coordenação entre conta PJ, reserva de emergência, aposentadoria e exposição global.",
    },
  ];
  return (
    <section data-tone="light" className="bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-9">
            <Mark eyebrow="Para quem" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.05] text-ink max-w-[22ch]">
              Quem chega geralmente já construiu — e quer organizar.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          {profiles.map((p) => (
            <article
              key={p.tag}
              className="col-span-12 md:col-span-6 border-t border-line pt-8"
            >
              <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-emphasis">
                {p.tag}
              </p>
              <p className="mt-6 t-body text-[1.0625rem] leading-[1.65] text-ink-soft max-w-[48ch]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   06 — Depoimentos (ink, 3 quotes anônimas)
   ================================================================ */

function Depoimentos() {
  const quotes = [
    {
      body:
        "Cheguei achando que precisava de um gerente melhor. Saí com um plano que nunca tinha visto colocado no papel, e com clareza de quem responde por cada decisão.",
      who: "Médico, 41 anos",
      city: "São Paulo",
    },
    {
      body:
        "O custo da relação ficou conhecido antes do aceite. Em quatro anos, o que mudou foi a carteira inteira — e nenhuma das mudanças foi sugerida por comissão.",
      who: "Empresária, 53 anos",
      city: "Brasília",
    },
    {
      body:
        "Eu pagava taxa em três lugares sem perceber. A primeira coisa que mudou foi a conta de custódia. A segunda foi a tranquilidade de saber para onde olhar nos relatórios.",
      who: "Executivo, 47 anos",
      city: "Belo Horizonte",
    },
  ];
  return (
    <section data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <Mark eyebrow="Quem já passou por aqui" dark />
        <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.05] text-on-ink-strong max-w-[22ch]">
          Identidades preservadas, contexto real.
        </h2>
        <div className="mt-16 md:mt-20 grid grid-cols-12 gap-x-8 gap-y-12">
          {quotes.map((q, i) => (
            <figure
              key={i}
              className="col-span-12 md:col-span-4 border-t border-line-on-ink pt-8"
            >
              <blockquote className="t-quote text-[1.125rem] leading-[1.4] text-on-ink-strong">
                <span className="asterisk" />
                {q.body}
              </blockquote>
              <figcaption className="mt-8 t-mono text-[0.72rem] tracking-[0.16em] uppercase text-on-ink-mute">
                {q.who} · {q.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   07 — FAQ (paper, accordion HTML nativo)
   ================================================================ */

function FAQSection() {
  const faqs = [
    {
      q: "Qual o valor do fee?",
      a: "O fee é proporcional à complexidade do caso e conhecido antes do aceite. Não é percentual sobre patrimônio investido — é mensalidade ou anuidade fixa, revisada apenas quando o escopo muda.",
    },
    {
      q: "Vocês têm valor mínimo de patrimônio?",
      a: "Não temos piso rígido. O que avaliamos é se o modelo de banca privada faz sentido para o caso. Geralmente conversamos a partir de R$ 300 mil em patrimônio investido, mas o fit não é só monetário.",
    },
    {
      q: "Onde fica o dinheiro investido?",
      a: "Em conta institucional no Brasil (corretora ou banco de investimentos) e em veículo offshore quando a estrutura pede. Nunca passa por conta nossa. Acesso, custódia e movimentação seguem com o cliente.",
    },
    {
      q: "Quanto tempo dura a relação?",
      a: "Plurianual. Os ganhos do modelo aparecem no acompanhamento — quando a carteira é revista trimestralmente, ajustada em pontos de inflexão e auditada por alguém que não vende produto.",
    },
    {
      q: "Vocês operam para mim ou eu opero?",
      a: "Você opera. A Midlej Capital é consultoria, não gestão. Recomendamos, fundamentamos, acompanhamos a execução — mas a custódia e a ordem são suas.",
    },
  ];
  return (
    <section data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 md:col-span-4">
            <Mark eyebrow="Dúvidas frequentes" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.04] text-ink max-w-[16ch]">
              O que vale saber antes da primeira conversa.
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
   Outras frentes — backlink editorial pro hub /
   ================================================================ */

function OutrasFrentes() {
  return (
    <section data-tone="light" className="bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <Mark eyebrow="Hub Midlej Capital" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.04] text-ink max-w-[26ch]">
              Investimentos é uma das oito frentes da banca.
            </h2>
            <p className="mt-8 t-lede text-ink-soft text-[1.0625rem] max-w-[48ch]">
              Mentoria, internacionais, seguros, alternativos, plano de saúde,
              previdência e treinamentos. Operadas sob o mesmo critério,
              num único interlocutor.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <Link href="/" className="btn-primary">
              Ver o hub completo
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   08 — Contato (ink)
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
            <Mark eyebrow="Primeira conversa" dark />
            <h2 className="mt-10 t-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.0] text-on-ink-strong max-w-[18ch]">
              Sem proposta antes da conversa.
            </h2>
            <p className="mt-10 t-lede text-on-ink-soft text-[1.1rem] max-w-[44ch]">
              A primeira conversa é gratuita, sem material comercial, sem
              gravação. Você descreve o caso, ouvimos, e respondemos se a
              banca é o canal certo para você.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HubLeadForm tone="dark" submitLabel="Pedir primeira conversa" />
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
    <footer data-tone="dark" className="bg-ink text-on-ink-soft border-t border-line-on-ink">
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
