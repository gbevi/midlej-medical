import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HubLeadForm } from "./_hub/HubLeadForm";
import { SmoothAnchor } from "./_hub/SmoothAnchor";
import { HomeHeader } from "./_hub/HomeHeader";
import { HeroViz } from "./_hub/HeroViz";
import { SeguroCompare } from "./_hub/svg/SeguroCompare";
import { PrevidenciaStackClient as PrevidenciaStack } from "./_hub/scenes/clients";
import { PortalMock } from "./_hub/PortalMock";
import { MentoriaSection } from "./_hub/MentoriaSection";

export const metadata: Metadata = {
  title: "Midlej Capital · Hub de soluções financeiras",
  description:
    "Mentoria, investimentos internacionais, câmbio, seguros, alternativos, previdência e treinamentos. Uma banca de planejamento financeiro sem conflito.",
};

const SERVICES = [
  { n: "01", name: "Mentoria",       desc: "Diagnóstico, arquitetura e sustentação do patrimônio em paralelo.",    href: "#mentoria" },
  { n: "02", name: "Internacionais", desc: "Patrimônio em dólar, contas offshore, trusts e veículos globais.",     href: "#internacionais" },
  { n: "03", name: "Câmbio",         desc: "Compra e envio assistido de dólares americanos para o exterior.",      href: "#cambio" },
  { n: "04", name: "Seguros",        desc: "Cobertura calibrada e custo otimizado fora do balcão de venda.",       href: "#seguro" },
  { n: "05", name: "Alternativos",   desc: "Fundos exclusivos, crédito privado estruturado e private equity.",     href: "#alternativos" },
  { n: "06", name: "Previdência",    desc: "Tabela regressiva e gestor institucional trocado por mérito.",         href: "#previdencia" },
  { n: "07", name: "Workshops",      desc: "Treinamentos estratégicos para executivos, gestores e conselhos.",     href: "#workshops" },
  { n: "08", name: "Investimentos",  desc: "Plataforma de investimentos privados com arquitetura por camadas.",    href: "/investimentos" },
];

const STATS = [
  { value: "R$ 120M+",  label: "em patrimônio acompanhado" },
  { value: "85+",       label: "famílias atendidas" },
  { value: "8 anos",    label: "de experiência" },
  { value: "8 frentes", label: "de atuação" },
];

export default function HubPage() {
  return (
    <main
      data-brand
      id="main"
      style={{ fontFamily: "var(--font-brand), ui-sans-serif, system-ui, sans-serif" }}
      className="min-h-screen bg-white text-[#2E4659]"
    >
      <SmoothAnchor />
      <HomeHeader />
      <HomeHero />
      <HomeStats />
      <HomeServices />
      <PortalCliente />
      <MentoriaSection />
      <S03_Internacionais />
      <S04_Cambio />
      <S05_Seguro />
      <S06_Alternativos />
      <S07_Previdencia />
      <S08_Workshops />
      <ConhecaInvestimentos />
      <HomeClosing />
    </main>
  );
}

/* ================================================================
   Shared atoms
   ================================================================ */

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SectionTag({ label }: { label: string }) {
  return (
    <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-3" style={{ color: "#4a6b8c" }}>
      {label}
    </p>
  );
}

function ProofRow({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="grid grid-cols-3 gap-x-6 border-t border-[#EDEFF2] pt-6 mt-8">
      {items.map((it) => (
        <div key={it.k} className="flex flex-col gap-1">
          <dt className="text-[0.65rem] font-semibold tracking-widest uppercase" style={{ color: "#6B7B8D" }}>
            {it.k}
          </dt>
          <dd className="text-[clamp(1.125rem,1.8vw,1.5rem)] font-bold tabular-nums leading-none" style={{ color: "#2E4659" }}>
            {it.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ================================================================
   Hero
   ================================================================ */

function HomeHero() {
  return (
    <section className="bg-white pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <span className="inline-block text-[0.7rem] font-semibold tracking-widest uppercase mb-6" style={{ color: "#4a6b8c" }}>
              Midlej Capital
            </span>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.06] tracking-tight mb-6" style={{ color: "#2E4659" }}>
              Hub de soluções financeiras.
            </h1>
            <p className="text-[1.0625rem] leading-[1.65] mb-10 max-w-[44ch]" style={{ color: "#6B7B8D" }}>
              Planejamento financeiro privado sem conflito de interesse.
              Mentoria, investimentos, câmbio, seguros, alternativos,
              previdência e treinamentos em uma única banca.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
                Pedir primeira conversa <Arrow />
              </Link>
              <Link href="#solucoes" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
                Ver as soluções
              </Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-7 h-[300px] md:h-[400px]">
            <HeroViz />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Stats
   ================================================================ */

function HomeStats() {
  return (
    <section style={{ backgroundColor: "#4a6b8c" }} className="py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tabular-nums leading-none mb-2 text-white">
                {s.value}
              </p>
              <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.70)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Services grid
   ================================================================ */

function HomeServices() {
  return (
    <section id="solucoes" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12 md:mb-16">
          <SectionTag label="Nossas soluções" />
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight max-w-[22ch]" style={{ color: "#2E4659" }}>
            Oito frentes de planejamento financeiro.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <Link key={s.n} href={s.href}
              className="group block bg-white rounded-xl p-6 border border-[#EDEFF2] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <span className="inline-block text-[0.65rem] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md mb-4" style={{ backgroundColor: "#F5F7FA", color: "#4a6b8c" }}>
                {s.n}
              </span>
              <h3 className="text-[1rem] font-semibold leading-snug mb-2" style={{ color: "#2E4659" }}>{s.name}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7B8D" }}>{s.desc}</p>
              <span className="text-xs font-semibold group-hover:text-[#2E4659] transition-colors duration-200" style={{ color: "#4a6b8c" }}>
                {s.n === "08" ? "Ver página →" : "Saiba mais →"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   03 — Internacionais
   ================================================================ */

function S03_Internacionais() {
  return (
    <section id="internacionais" style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-4">
            <SectionTag label="Onde o capital mora" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
              Patrimônio<br />em dólar.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="text-[1.0rem] leading-[1.65] mb-5" style={{ color: "#6B7B8D" }}>
              O dólar é a moeda de reserva global e a base dos maiores mercados financeiros do mundo.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-4" style={{ color: "#6B7B8D" }}>
              Conectamos seu patrimônio a estruturas internacionais por meio de contas offshore,
              trusts e veículos globais, com acesso às principais gestoras e instituições financeiras
              do mercado internacional.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-8" style={{ color: "#6B7B8D" }}>
              Diversificação geográfica, proteção cambial e exposição a oportunidades globais,
              sempre através de parceiros especializados e regulados. Abertura de conta
              internacional assistida.
            </p>
            <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
              Quero diversificar globalmente <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   04 — Câmbio
   ================================================================ */

function S04_Cambio() {
  return (
    <section id="cambio" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-4">
            <SectionTag label="Operação cambial" />
            <h2 className="text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
              Câmbio.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="text-[1.0rem] leading-[1.65] mb-5" style={{ color: "#6B7B8D" }}>
              Compra e envio de dólares americanos para contas no exterior,
              com execução assistida do início ao fim da operação.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-4" style={{ color: "#6B7B8D" }}>
              Trabalhamos com parceiros regulados pelo Banco Central, garantindo
              segurança jurídica, spread competitivo e conformidade fiscal em cada
              remessa — da documentação ao SISBACEN.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-8" style={{ color: "#6B7B8D" }}>
              Ideal para aportes ao exterior, manutenção de contas offshore
              e diversificação cambial planejada.
            </p>
            <ProofRow items={[
              { k: "Parceiros",  v: "Regulados BCB" },
              { k: "Moedas",     v: "USD · EUR" },
              { k: "Destinos",   v: "EUA · Europa · Ilhas" },
            ]} />
            <div className="mt-8">
              <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
                Operar câmbio <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Seguros
   ================================================================ */

function S05_Seguro() {
  return (
    <section id="seguro" style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-12 md:col-span-5">
            <SectionTag label="Proteção patrimonial" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-tight tracking-tight mb-3" style={{ color: "#2E4659" }}>
              Seguros.
            </h2>
            <p className="text-[1.125rem] font-medium mb-6" style={{ color: "#4a6b8c" }}>
              Cobertura calibrada, custo otimizado.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-3" style={{ color: "#6B7B8D" }}>
              Análise de necessidade real de capital segurado. Comparação de apólices
              fora do balcão de venda.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-8" style={{ color: "#6B7B8D" }}>
              Principais produtos: seguro de vida, doenças graves e seguro empresarial
              de responsabilidade civil.
            </p>
            <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
              Avaliar minha cobertura <Arrow />
            </Link>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <SeguroCompare className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   06 — Alternativos
   ================================================================ */

function S06_Alternativos() {
  return (
    <section id="alternativos" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-4">
            <SectionTag label="Fora da prateleira" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
              Produtos<br />alternativos.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="text-[1.0rem] leading-[1.65] mb-5" style={{ color: "#6B7B8D" }}>
              O que o private banking acessa e seu gerente nunca te ofereceu,
              porque não está na grade dele.
            </p>
            <p className="text-[0.95rem] leading-[1.65] mb-8" style={{ color: "#6B7B8D" }}>
              Fundos exclusivos, crédito privado estruturado, private equity, real estate.
              Estruturas fora da prateleira de banco.
            </p>
            <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
              Ver alternativos em detalhe <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   07 — Previdência
   ================================================================ */

function S07_Previdencia() {
  return (
    <section id="previdencia" style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-12 md:col-span-4">
            <div className="mx-auto w-full max-w-[260px] aspect-[3/4]">
              <PrevidenciaStack className="w-full h-full" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 lg:col-start-6">
            <SectionTag label="Composição temporal" />
            <h2 className="text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-tight tracking-tight mb-6" style={{ color: "#2E4659" }}>
              Previdência privada.<br />
              <span style={{ color: "#6B7B8D" }}>Estrutura tributária e gestor por mérito.</span>
            </h2>
            <p className="text-[0.95rem] leading-[1.65]" style={{ color: "#6B7B8D" }}>
              Tabela regressiva trabalhada desde o primeiro aporte. Comparação anual
              dos gestores institucionais e troca quando o desempenho relativo justifica.
            </p>
            <ProofRow items={[
              { k: "IR mínimo",    v: "10%" },
              { k: "Veículos",     v: "PGBL · VGBL" },
              { k: "Diferencial",  v: "Sem come-cotas" },
            ]} />
            <div className="mt-8">
              <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
                Estruturar previdência <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   08 — Workshops
   ================================================================ */

function S08_Workshops() {
  return (
    <section id="workshops" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-4">
            <SectionTag label="Para grupos" />
            <h2 className="text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
              Treinamentos<br />e workshops.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="text-[1.0rem] leading-[1.65] mb-8" style={{ color: "#6B7B8D" }}>
              Conteúdo financeiro estratégico, desenvolvido para atender às necessidades
              específicas de executivos, gestores, conselhos, sindicatos e equipes corporativas.
            </p>
            <ProofRow items={[
              { k: "Formato curto", v: "1 a 3h" },
              { k: "Programa",      v: "1 a 2 sessões" },
              { k: "Modalidade",    v: "Presencial · remoto" },
            ]} />
            <div className="mt-8">
              <Link href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
                Conversar sobre um workshop <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Closing — contato + footer fundidos
   ================================================================ */

const FOOTER_LINKS = [
  { label: "Mentoria",      href: "#mentoria" },
  { label: "Investimentos", href: "/investimentos" },
  { label: "Câmbio",        href: "#cambio" },
  { label: "Seguros",       href: "#seguro" },
  { label: "Alternativos",  href: "#alternativos" },
  { label: "Previdência",   href: "#previdencia" },
  { label: "Workshops",     href: "#workshops" },
];

function HomeClosing() {
  const year = new Date().getFullYear();
  return (
    <section id="contato" style={{ backgroundColor: "#4a6b8c" }} className="pt-24 md:pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── CTA principal ── */}
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start pb-20 md:pb-24">
          <div className="col-span-12 md:col-span-5">
            <p className="text-[0.7rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              Primeira conversa
            </p>
            <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white mb-6">
              Sem proposta antes da conversa.
            </h2>
            <p className="text-[1.0625rem] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
              A primeira conversa é gratuita, confidencial e sem compromisso.
            </p>
            <p className="text-[0.9375rem] leading-relaxed max-w-[44ch]" style={{ color: "rgba(255,255,255,0.60)" }}>
              Você apresenta seu contexto, seus objetivos e desafios. Nós ouvimos,
              fazemos as perguntas certas e avaliamos como agregar valor ao seu caso.
              Somente depois disso discutimos caminhos e soluções.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HubLeadForm tone="dark" submitLabel="Pedir primeira conversa" origin="Hub Midlej Capital" />
          </div>
        </div>

        {/* ── Divisor ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }} className="mb-12 md:mb-14" />

        {/* ── Footer info ── */}
        <div className="grid grid-cols-12 gap-8 items-start mb-10">

          {/* Logo + tagline */}
          <div className="col-span-12 md:col-span-4">
            <Image
              src="/midlej_capital.png"
              alt="Midlej Capital"
              width={320}
              height={130}
              className="h-12 w-auto mb-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm leading-relaxed max-w-[32ch]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Sem conflito de interesse. Sem produto da prateleira.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-6 md:col-span-3 md:col-start-6">
            <p className="text-[0.6rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Soluções
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors duration-200" style={{ color: "rgba(255,255,255,0.60)" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-6 md:col-span-4">
            <p className="text-[0.6rem] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              Contato
            </p>
            <a
              href="mailto:contato@midlejcapital.com.br"
              className="text-sm hover:text-white transition-colors duration-200 block"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              contato@midlejcapital.com.br
            </a>
          </div>

        </div>

        {/* ── Barra legal ── */}
        <div className="border-t pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.35)" }}>
          <span>CNPJ 35.340.252/0001-44</span>
          <span>© {year} Midlej Capital. Todos os direitos reservados.</span>
        </div>

      </div>
    </section>
  );
}

/* ================================================================
   Portal do Cliente
   ================================================================ */

function PortalCliente() {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }} className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Copy */}
          <div className="col-span-12 md:col-span-4 md:sticky md:top-24">
            <SectionTag label="Para clientes" />
            <h2 className="text-[clamp(1.625rem,2.8vw,2.25rem)] font-bold leading-tight tracking-tight mb-5" style={{ color: "#2E4659" }}>
              Acompanhe seu patrimônio online.
            </h2>
            <p className="text-[0.9375rem] leading-[1.7] mb-3" style={{ color: "#6B7B8D" }}>
              Clientes têm acesso a um portal privado com três visões do planejamento:
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                "Mapa de gastos — renda e despesas mês a mês",
                "Evolução patrimonial — histórico, aportes e projeção",
                "Carteira — composição e alocação por ativo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#6B7B8D" }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-[#3FAE7A]" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://planejamento.midlejcapital.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-[#2E4659]"
              style={{ color: "#4a6b8c" }}
            >
              Acessar portal <Arrow />
            </a>
          </div>

          {/* Mock UI */}
          <div className="col-span-12 md:col-span-8">
            <PortalMock />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Conheca Investimentos
   ================================================================ */

function ConhecaInvestimentos() {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }} className="py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <SectionTag label="Banca de investimentos" />
            <h2 className="text-[clamp(1.625rem,3vw,2.5rem)] font-bold leading-tight tracking-tight mb-4" style={{ color: "#2E4659" }}>
              Investimentos é uma frente própria. Tem página própria.
            </h2>
            <p className="text-[1.0rem] leading-[1.65] max-w-[52ch]" style={{ color: "#6B7B8D" }}>
              Modelo de fee, geografia de capital, composição em camadas,
              tempo composto, e a primeira conversa. Em mais detalhe.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <Link href="/investimentos" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200">
              Conheça os investimentos <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

