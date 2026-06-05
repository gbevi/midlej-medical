import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "./components/Logo";
import { HubHero } from "./_hub/HubHero";
import { HubLeadForm } from "./_hub/HubLeadForm";

// SVG/CSS viz (paper-side, no JS heavy) — server-friendly client components.
import { FullTimeline } from "./_hub/svg/FullTimeline";
import { PocketRing } from "./_hub/svg/PocketRing";
import { SeguroCompare } from "./_hub/svg/SeguroCompare";
import { SaudeMatrix } from "./_hub/svg/SaudeMatrix";

// three.js scenes lazy-loaded inside a client wrapper (Next 16 disallows
// next/dynamic({ ssr: false }) in Server Components).
import {
  GlobeClient as Globe,
  AltLayersClient as AltLayers,
  PrevidenciaStackClient as PrevidenciaStack,
  WorkshopRoomClient as WorkshopRoom,
} from "./_hub/scenes/clients";

export const metadata: Metadata = {
  title: "Midlej Capital · Hub de soluções financeiras",
  description:
    "Mentoria, investimentos internacionais, seguros, alternativos, previdência, plano de saúde e treinamentos. Uma banca de planejamento financeiro sem conflito.",
};

/* ────────────────────────────────────────────────────────────────
   Page composition
   ──────────────────────────────────────────────────────────────── */

export default function HubPage() {
  return (
    <main
      data-brand
      id="main"
      className="brand-body min-h-screen bg-paper text-ink"
    >
      <HubHeader />
      <HubHero />

      <SectionManifesto />

      <SectionMentoriaFull />
      <SectionMentoriaPocket />
      <SectionInternacionais />
      <SectionSeguro />
      <SectionAlternativos />
      <SectionSaude />
      <SectionPrevidencia />
      <SectionWorkshops />

      <SectionContato />
      <HubFooter />
    </main>
  );
}

/* ────────────────────────────────────────────────────────────────
   Header
   ──────────────────────────────────────────────────────────────── */

function HubHeader() {
  return (
    <header className="absolute top-0 inset-x-0 z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between gap-8">
        <Link href="/" className="inline-flex items-center" aria-label="Midlej Capital, ir ao topo">
          <Logo tone="dark" className="h-9 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#frentes" className="t-mono text-[0.75rem] tracking-[0.18em] uppercase text-on-ink-soft brand-link-underline">
            Frentes
          </Link>
          <Link href="#contato" className="t-mono text-[0.75rem] tracking-[0.18em] uppercase text-on-ink-strong brand-link-underline">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────────
   Manifesto (paper)
   ──────────────────────────────────────────────────────────────── */

function SectionManifesto() {
  return (
    <section id="frentes" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-2">
            <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-emphasis">
              Manifesto
            </p>
          </div>
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            <p className="t-quote text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.2] max-w-[36ch] text-ink">
              Quem já tem patrimônio formado não precisa de mais um vendedor.
              Precisa de critério para decidir, contexto para comparar e
              continuidade para sustentar.
            </p>
            <p className="mt-12 t-body text-[1.05rem] leading-[1.7] text-ink-soft max-w-[56ch]">
              A Midlej Capital opera sob fee recorrente do cliente. Zero
              comissão de produto, zero distribuição de marca. Cada uma das
              oito frentes abaixo é conduzida no mesmo princípio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   Section template — reused shape, alternating surfaces
   ──────────────────────────────────────────────────────────────── */

type SectionProps = {
  id: string;
  tone: "dark" | "light";
  bg: "ink" | "paper" | "bone";
  eyebrow: string;
  numeral: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  proof: { label: string; value: string }[];
  viz: React.ReactNode;
  /** Right column copy below proof. */
  body?: React.ReactNode;
  cta: { label: string; href: string; primary?: boolean };
  /** Whether viz comes BEFORE the headline column (visual left) or after (visual right). */
  vizSide?: "left" | "right";
};

function SectionShell(p: SectionProps) {
  const dark = p.tone === "dark";
  const bgClass = p.bg === "ink" ? "bg-ink" : p.bg === "bone" ? "bg-bone" : "bg-paper";
  const textBase = dark ? "text-on-ink-strong" : "text-ink";
  const muted = dark ? "text-on-ink-mute" : "text-ink-mute";
  const soft = dark ? "text-on-ink-soft" : "text-ink-soft";
  const hairline = dark ? "border-line-on-ink" : "border-line";

  const copyCol = (
    <div className="col-span-12 lg:col-span-6 flex flex-col">
      <p className={`t-mono text-[0.72rem] tracking-[0.18em] uppercase ${dark ? "text-on-ink-mute" : "text-emphasis"} mb-6`}>
        {p.eyebrow}
      </p>
      <div className="flex items-baseline gap-6">
        <span className={`t-display-light text-[clamp(2rem,3.6vw,3.25rem)] leading-none text-emphasis tabular-nums`}>
          {p.numeral}
        </span>
        <h2 className={`t-display text-[clamp(1.625rem,3vw,2.75rem)] leading-[1.05] ${textBase} max-w-[22ch]`}>
          {p.title}
        </h2>
      </div>
      <p className={`mt-8 t-lede text-[1.0625rem] md:text-[1.1875rem] ${soft} max-w-[44ch]`}>
        {p.lede}
      </p>

      {/* Proof strip — small numbers + labels in a single hairline-divided row */}
      {p.proof.length > 0 && (
        <dl className={`mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 border-t ${hairline} pt-6`}>
          {p.proof.map((it) => (
            <div key={it.label} className="flex flex-col">
              <dt className={`t-mono text-[0.68rem] tracking-[0.16em] uppercase ${muted}`}>
                {it.label}
              </dt>
              <dd className={`t-display-light text-[clamp(1.25rem,2vw,1.75rem)] leading-[1] tabular-nums mt-2 ${textBase}`}>
                {it.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {p.body && (
        <p className={`mt-10 t-body text-[0.95rem] leading-[1.65] ${soft} max-w-[52ch]`}>
          {p.body}
        </p>
      )}

      <div className="mt-12">
        {p.cta.primary ? (
          dark ? (
            <Link href={p.cta.href} className="btn-primary-inverse">
              {p.cta.label}
              <Arrow />
            </Link>
          ) : (
            <Link href={p.cta.href} className="btn-primary">
              {p.cta.label}
              <Arrow />
            </Link>
          )
        ) : dark ? (
          <Link href={p.cta.href} className="btn-ghost-inverse">
            {p.cta.label}
          </Link>
        ) : (
          <Link href={p.cta.href} className="btn-ghost">
            {p.cta.label}
          </Link>
        )}
      </div>
    </div>
  );

  const vizCol = (
    <div className="col-span-12 lg:col-span-6 relative">
      <div className="w-full aspect-[5/4] lg:aspect-[4/3] flex items-center justify-center">
        {p.viz}
      </div>
    </div>
  );

  return (
    <section id={p.id} className={`${bgClass} ${textBase}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-36">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16 items-center">
          {p.vizSide === "left" ? (
            <>
              {vizCol}
              {copyCol}
            </>
          ) : (
            <>
              {copyCol}
              {vizCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   I — Mentoria full · ink · SVG timeline
   ──────────────────────────────────────────────────────────────── */

function SectionMentoriaFull() {
  return (
    <SectionShell
      id="mentoria-full"
      tone="dark"
      bg="ink"
      numeral="01"
      eyebrow="Programa contínuo"
      title={<>Mentoria full.</>}
      lede="Planejamento financeiro privado, conduzido pessoalmente. Três frentes ativas ao mesmo tempo, na ordem que o caso pede."
      proof={[
        { label: "Sessões iniciais", value: "3 a 5" },
        { label: "Revisão", value: "Trimestral" },
        { label: "Duração", value: "12 meses+" },
      ]}
      body="Diagnóstico do patrimônio existente, arquitetura caso a caso e sustentação ao longo do tempo. O programa percorre as três frentes na ordem que o caso pede, não em um passo a passo de prateleira."
      viz={<FullTimeline />}
      cta={{ label: "Conhecer a mentoria full", href: "/mentoria", primary: true }}
      vizSide="right"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   II — Mentoria pocket · paper · SVG ring
   ──────────────────────────────────────────────────────────────── */

function SectionMentoriaPocket() {
  return (
    <SectionShell
      id="mentoria-pocket"
      tone="light"
      bg="paper"
      numeral="02"
      eyebrow="Sprint focado"
      title={<>Mentoria pocket.</>}
      lede="Versão objetiva para uma decisão pontual: uma sucessão, um portfólio, uma reorganização tributária."
      proof={[
        { label: "Janela", value: "6 semanas" },
        { label: "Sessões", value: "4" },
        { label: "Entrega", value: "Documento decisório" },
      ]}
      body="Mesmo critério da mentoria full, comprimido para um escopo específico. Sai com plano escrito, recomendações fundamentadas e o que decidir caso o cenário mude."
      viz={<PocketRing />}
      cta={{ label: "Ver pocket", href: "/mentoria" }}
      vizSide="left"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   III — Investimentos internacionais · ink · 3D globe
   ──────────────────────────────────────────────────────────────── */

function SectionInternacionais() {
  return (
    <SectionShell
      id="internacionais"
      tone="dark"
      bg="ink"
      numeral="03"
      eyebrow="Onde o capital mora"
      title={<>Investimentos internacionais.</>}
      lede="Diversificação fora do CDI, com mecanismo, não promessa. Carteira global construída com método."
      proof={[
        { label: "Jurisdições", value: "EUA · UK · UE" },
        { label: "Classes", value: "Ações · RF · Hedge" },
        { label: "Conta", value: "Assistida" },
      ]}
      body="Estruturamos exposição em ações globais, renda fixa offshore, fundos macro e instrumentos cambiais. Abertura de conta no exterior conduzida do início ao fim."
      viz={<Globe />}
      cta={{ label: "Quero diversificar globalmente", href: "#contato" }}
      vizSide="right"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   IV — Seguro de vida · paper · SVG comparison
   ──────────────────────────────────────────────────────────────── */

function SectionSeguro() {
  return (
    <SectionShell
      id="seguro"
      tone="light"
      bg="paper"
      numeral="04"
      eyebrow="Proteção patrimonial"
      title={<>Seguro de vida.</>}
      lede="Análise de necessidade real de capital segurado. Comparação de apólices fora do balcão de venda."
      proof={[
        { label: "Cobertura média", value: "3,3×" },
        { label: "Custo/mil", value: "−70%" },
        { label: "Modalidades", value: "Vida + DIT" },
      ]}
      body="Calculamos qual é o capital segurado adequado ao seu caso e negociamos com seguradoras institucionais. Sem comissão sobre prêmio."
      viz={<SeguroCompare />}
      cta={{ label: "Avaliar minha cobertura", href: "#contato" }}
      vizSide="left"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   V — Produtos alternativos · ink · 3D layers
   ──────────────────────────────────────────────────────────────── */

function SectionAlternativos() {
  return (
    <SectionShell
      id="alternativos"
      tone="dark"
      bg="ink"
      numeral="05"
      eyebrow="Fora da prateleira"
      title={<>Produtos alternativos.</>}
      lede="O que o private banking acessa e seu gerente nunca te ofereceu — porque não está na grade dele."
      proof={[
        { label: "Ticket mínimo", value: "R$ 100k+" },
        { label: "Classes", value: "PE · RE · CRA" },
        { label: "Lock-up", value: "3 a 7 anos" },
      ]}
      body="Fundos exclusivos, crédito privado estruturado, private equity, real estate. Acessamos estruturas fora da prateleira de banco — sem interesse em te empurrar nenhuma."
      viz={<AltLayers />}
      cta={{ label: "Ver alternativos", href: "/mentoria/alternativos" }}
      vizSide="right"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   VI — Plano de saúde · bone · SVG matrix
   ──────────────────────────────────────────────────────────────── */

function SectionSaude() {
  return (
    <SectionShell
      id="saude"
      tone="light"
      bg="bone"
      numeral="06"
      eyebrow="Negociação coletiva"
      title={<>Plano de saúde.</>}
      lede="Mesma operadora, mesma rede, condição corporativa. Acesso via veículos coletivos."
      proof={[
        { label: "Economia média", value: "−35%" },
        { label: "Operadoras", value: "10+" },
        { label: "Renovação", value: "Acompanhada" },
      ]}
      body="Estruturamos a contratação por veículo coletivo afinado ao seu perfil. Mantém a mesma rede que você teria contratando como pessoa física, com custo significativamente menor."
      viz={<SaudeMatrix />}
      cta={{ label: "Quero comparar planos", href: "#contato" }}
      vizSide="left"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   VII — Previdência privada · paper · 3D stack
   ──────────────────────────────────────────────────────────────── */

function SectionPrevidencia() {
  return (
    <SectionShell
      id="previdencia"
      tone="light"
      bg="paper"
      numeral="07"
      eyebrow="Composição temporal"
      title={<>Previdência privada.</>}
      lede="Estrutura tributária inteligente, gestão institucional, revisão periódica do desempenho."
      proof={[
        { label: "IR mínimo", value: "10%" },
        { label: "Veículo", value: "PGBL · VGBL" },
        { label: "Gestores", value: "Selecionados" },
      ]}
      body="Tabela regressiva trabalhada desde o primeiro aporte. Comparação anual dos gestores institucionais e troca quando o desempenho relativo justifica."
      viz={<PrevidenciaStack />}
      cta={{ label: "Estruturar previdência", href: "#contato" }}
      vizSide="right"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   VIII — Treinamentos e workshops · ink · 3D room
   ──────────────────────────────────────────────────────────────── */

function SectionWorkshops() {
  return (
    <SectionShell
      id="workshops"
      tone="dark"
      bg="ink"
      numeral="08"
      eyebrow="Para grupos"
      title={<>Treinamentos e workshops.</>}
      lede="Educação financeira sob medida para times executivos, conselhos, sindicatos e instituições."
      proof={[
        { label: "Formato curto", value: "2h" },
        { label: "Programa", value: "4 sessões" },
        { label: "Modalidade", value: "Presencial · remoto" },
      ]}
      body="Conteúdo desenhado para o público específico — diretoria, médicos, advogados, conselhos de família. Sem material genérico, sem palestra de prateleira."
      viz={<WorkshopRoom />}
      cta={{ label: "Conversar sobre um workshop", href: "#contato" }}
      vizSide="left"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   Contato (CTA final · ink) — form
   ──────────────────────────────────────────────────────────────── */

function SectionContato() {
  return (
    <section id="contato" data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-6">
            <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-on-ink-mute mb-6">
              Primeira conversa
            </p>
            <h2 className="t-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.0] text-on-ink-strong max-w-[18ch]">
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

/* ────────────────────────────────────────────────────────────────
   Footer
   ──────────────────────────────────────────────────────────────── */

function HubFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-on-ink-soft border-t border-line-on-ink">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <Logo tone="dark" className="h-10 w-auto" />
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="t-quote text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.4] text-on-ink-strong max-w-[40ch]">
              Midlej Capital. Hub privado de planejamento financeiro,
              conduzido em Brasília, atende em todo o Brasil.
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
