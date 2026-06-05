import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "./components/Logo";
import { HubHero } from "./_hub/HubHero";

export const metadata: Metadata = {
  title: "Midlej Capital · Hub de soluções financeiras",
  description:
    "Mentoria, investimentos internacionais, seguros, alternativos, previdência, plano de saúde e treinamentos. Uma banca de planejamento financeiro sem conflito.",
};

/* ─────────────────────────────────────────────────────────
   8 frentes do hub
   ───────────────────────────────────────────────────────── */

type Vertical = {
  index: number;
  slug: string;
  title: string;
  lede: string;
  body: string;
  /** Rota interna se houver deep-dive; ancora "#" se for só seção. */
  href: string;
};

const VERTICALS: Vertical[] = [
  {
    index: 1,
    slug: "mentoria-full",
    title: "Mentoria full",
    lede: "Planejamento financeiro privado, conduzido pessoalmente.",
    body: "Programa contínuo de planejamento para quem já construiu patrimônio. Diagnóstico, arquitetura e sustentação ao longo do tempo.",
    href: "/mentoria",
  },
  {
    index: 2,
    slug: "mentoria-pocket",
    title: "Mentoria pocket",
    lede: "Versão objetiva da mentoria, para casos focados.",
    body: "Sprint de planejamento para questões pontuais: uma decisão de portfólio, uma sucessão, uma reorganização tributária.",
    href: "/mentoria",
  },
  {
    index: 3,
    slug: "internacionais",
    title: "Investimentos internacionais",
    lede: "Patrimônio fora do CDI, com mecanismo, não promessa.",
    body: "Estruturação de carteira global: ações, renda fixa offshore, fundos hedge, exposição cambial. Conta no exterior assistida.",
    href: "#contato",
  },
  {
    index: 4,
    slug: "seguros",
    title: "Seguro de vida",
    lede: "Proteção patrimonial, não venda de prêmio.",
    body: "Análise da necessidade real de capital segurado, comparação entre apólices e estruturação considerando sucessão e dependentes.",
    href: "#contato",
  },
  {
    index: 5,
    slug: "alternativos",
    title: "Produtos alternativos",
    lede: "O que o private banking acessa e seu gerente nunca te ofereceu.",
    body: "Fundos exclusivos, crédito privado estruturado, private equity, real estate. Acesso a estruturas fora da prateleira de banco.",
    href: "/mentoria/alternativos",
  },
  {
    index: 6,
    slug: "saude",
    title: "Plano de saúde",
    lede: "Negociação corporativa para o titular individual.",
    body: "Acesso a apólices corporativas via veículos coletivos. Mesma operadora, mesmo hospital, custo significativamente menor.",
    href: "#contato",
  },
  {
    index: 7,
    slug: "previdencia",
    title: "Previdência privada",
    lede: "Estrutura tributária inteligente, gestão sem comissão.",
    body: "PGBL e VGBL com tabela regressiva, escolha de gestores institucionais e revisão periódica do desempenho.",
    href: "#contato",
  },
  {
    index: 8,
    slug: "workshops",
    title: "Treinamentos e workshops",
    lede: "Para grupos, empresas e instituições.",
    body: "Educação financeira sob medida para times executivos, conselhos, sindicatos médicos e instituições de ensino.",
    href: "#contato",
  },
];

const WHATSAPP =
  "https://wa.me/556183015739?text=Ol%C3%A1%2C%20gostaria%20de%20conhecer%20as%20solu%C3%A7%C3%B5es%20da%20Midlej%20Capital.";

/* ─────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────── */

export default function HubPage() {
  return (
    <main
      data-brand
      id="main"
      className="brand-body min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]"
    >
      <HubHeader />
      <HubHero />

      <Manifesto />
      <SolucoesSection />
      <ComoFuncionamos />
      <QuemSomos />
      <CTAFinal />
      <HubFooter />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────
   Header (ink, sticky)
   ───────────────────────────────────────────────────────── */

function HubHeader() {
  return (
    <header className="absolute top-0 inset-x-0 z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between gap-8">
        <Link href="/" className="inline-flex items-center" aria-label="Midlej Capital, ir ao topo">
          <Logo tone="dark" className="h-9 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#solucoes"
            className="t-mono text-[0.75rem] tracking-[0.18em] uppercase text-[var(--color-on-ink-soft)] brand-link-underline"
          >
            Soluções
          </Link>
          <Link
            href="#como"
            className="t-mono text-[0.75rem] tracking-[0.18em] uppercase text-[var(--color-on-ink-soft)] brand-link-underline"
          >
            Como funcionamos
          </Link>
          <Link
            href="#contato"
            className="t-mono text-[0.75rem] tracking-[0.18em] uppercase text-[var(--color-on-ink-strong)] brand-link-underline"
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────
   Manifesto (paper, citação editorial)
   ───────────────────────────────────────────────────────── */

function Manifesto() {
  return (
    <section className="bg-[var(--color-paper)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-2">
            <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-[var(--color-emphasis)]">
              Manifesto
            </p>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            <p className="t-quote text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.2] max-w-[36ch] text-[var(--color-ink)]">
              Quem já tem patrimônio formado não precisa de mais um vendedor.
              Precisa de critério para decidir, contexto para comparar e
              continuidade para sustentar.
            </p>
            <p className="mt-12 t-body text-[1.05rem] leading-[1.7] text-[var(--color-ink-soft)] max-w-[56ch]">
              A Midlej Capital opera sob fee recorrente do cliente. Zero
              comissão de produto, zero distribuição de marca. Cada uma das
              oito frentes é conduzida no mesmo princípio: o que serve à
              família, não o que rende para o intermediário.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   8 verticais — grid editorial com numerais oxblood
   ───────────────────────────────────────────────────────── */

function SolucoesSection() {
  return (
    <section id="solucoes" className="bg-[var(--color-bone)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8 mb-20 md:mb-28">
          <div className="col-span-12 md:col-span-9">
            <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-[var(--color-emphasis)] mb-6">
              Oito frentes
            </p>
            <h2 className="t-display text-[clamp(1.875rem,4vw,3.25rem)] leading-[1.05] max-w-[22ch] text-[var(--color-ink)]">
              Cada vertical sob o mesmo critério.
            </h2>
            <p className="mt-8 t-lede text-[var(--color-ink-soft)] max-w-[52ch]">
              Não somos especialistas em produto. Somos um único interlocutor
              para o patrimônio todo, organizando frentes que normalmente
              vivem em silos.
            </p>
          </div>
        </div>

        <ol className="border-t hairline">
          {VERTICALS.map((v) => (
            <li
              key={v.slug}
              className="border-b hairline group"
            >
              <Link
                href={v.href}
                className="grid grid-cols-12 gap-6 py-10 md:py-14 items-baseline transition-colors duration-300 group-hover:bg-[var(--color-bone-2)]"
              >
                <div className="col-span-2 md:col-span-1">
                  <span
                    className="t-display-light text-[clamp(1.5rem,2.4vw,2rem)] text-[var(--color-emphasis)] tabular-nums"
                    aria-hidden
                  >
                    {String(v.index).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-5">
                  <h3 className="t-display text-[clamp(1.25rem,1.8vw,1.625rem)] leading-[1.15] text-[var(--color-ink)]">
                    {v.title}
                  </h3>
                  <p className="mt-2 t-quote text-[1rem] leading-[1.35] text-[var(--color-ink)] max-w-[32ch]">
                    {v.lede}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 lg:col-span-5">
                  <p className="t-body text-[0.95rem] leading-[1.6] text-[var(--color-ink-soft)] max-w-[48ch]">
                    {v.body}
                  </p>
                </div>
                <div className="hidden md:block md:col-span-1 text-right">
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-[var(--color-ink)]"
                  >
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Como funcionamos — modelo de fee, sem comissão
   ───────────────────────────────────────────────────────── */

function ComoFuncionamos() {
  return (
    <section id="como" className="bg-[var(--color-paper)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-[var(--color-emphasis)] mb-6">
              Como funcionamos
            </p>
            <h2 className="t-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.05] text-[var(--color-ink)] max-w-[18ch]">
              Fee recorrente. Zero comissão por produto.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="t-body text-[1.0625rem] leading-[1.7] text-[var(--color-ink-soft)] max-w-[58ch]">
              O modelo de remuneração elimina o incentivo central que
              distorce a maior parte da indústria. Não recebemos rebate de
              fundo, não recebemos taxa de distribuição, não somos premiados
              por colocar você num produto específico.
            </p>
            <p className="mt-6 t-body text-[1.0625rem] leading-[1.7] text-[var(--color-ink-soft)] max-w-[58ch]">
              A consequência é prática: as recomendações mudam quando o caso
              muda. A carteira é desmontada quando a evidência sugere. O
              cliente é orientado a sair de um produto, inclusive nosso, se
              outro servir melhor.
            </p>
            <p className="mt-10 t-body text-sm text-[var(--color-ink-mute)] max-w-[60ch]">
              <span className="asterisk" />
              O fee é proporcional à complexidade do caso, conhecido antes do
              aceite e estável durante a vigência do programa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Quem somos — autoridade discreta
   ───────────────────────────────────────────────────────── */

function QuemSomos() {
  return (
    <section id="quem" className="bg-[var(--color-bone)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-9">
            <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-[var(--color-emphasis)] mb-6">
              Quem somos
            </p>
            <h2 className="t-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.05] text-[var(--color-ink)] max-w-[24ch]">
              Uma banca privada, conduzida por nome.
            </h2>
            <p className="mt-10 t-lede text-[var(--color-ink-soft)] max-w-[56ch]">
              Cada frente do hub é responsabilidade de um interlocutor
              específico, com histórico verificável, sem CPF coletivo. O
              cliente sabe com quem fala em cada decisão.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   CTA final — ink, simples
   ───────────────────────────────────────────────────────── */

function CTAFinal() {
  return (
    <section
      id="contato"
      data-tone="dark"
      className="bg-[var(--color-ink)] text-[var(--color-on-ink-strong)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-[var(--color-on-ink-mute)] mb-6">
              Primeira conversa
            </p>
            <h2 className="t-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.0] text-[var(--color-on-ink-strong)] max-w-[18ch]">
              Sem proposta antes da conversa.
            </h2>
            <p className="mt-10 t-lede text-[var(--color-on-ink-soft)] text-[1.1rem] max-w-[48ch]">
              A primeira conversa é gratuita, sem material comercial, sem
              gravação. Você descreve o caso, ouvimos, e respondemos se a
              banca é o canal certo para você.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-9">
            <div className="flex flex-col items-start gap-6">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="btn-primary-inverse"
              >
                Falar agora pelo WhatsApp
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                  <path
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
              <Link href="/mentoria" className="btn-ghost-inverse">
                Ver Mentoria em detalhe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Footer institucional
   ───────────────────────────────────────────────────────── */

function HubFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-on-ink-soft)] border-t border-[var(--color-line-on-ink)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <Logo tone="dark" className="h-10 w-auto" />
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="t-quote text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.4] text-[var(--color-on-ink-strong)] max-w-[40ch]">
              Midlej Capital. Hub privado de planejamento financeiro,
              conduzido em Brasília, atende em todo o Brasil.
            </p>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-[var(--color-line-on-ink)] flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[0.78rem] tracking-[0.04em] text-[var(--color-on-ink-mute)]">
          <span>Midlej Capital · CNPJ 35.340.252/0001-44</span>
          <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
