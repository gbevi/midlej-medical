import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "./components/Logo";
import { HubHeader } from "./_hub/HubHeader";
import { HubHero } from "./_hub/HubHero";
import { HubLeadForm } from "./_hub/HubLeadForm";
import { SmoothAnchor } from "./_hub/SmoothAnchor";

import { FullTimeline } from "./_hub/svg/FullTimeline";
import { PocketRing } from "./_hub/svg/PocketRing";
import { SeguroCompare } from "./_hub/svg/SeguroCompare";
import { SaudeMatrix } from "./_hub/svg/SaudeMatrix";

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

/* ================================================================
   Page
   ================================================================ */

export default function HubPage() {
  return (
    <main
      data-brand
      id="main"
      className="brand-body min-h-screen bg-paper text-ink"
    >
      <SmoothAnchor />
      <HubHeader />
      <HubHero />

      <Manifesto />

      <S01_MentoriaFull />
      <S02_MentoriaPocket />
      <S03_Internacionais />
      <S04_Seguro />
      <S05_Alternativos />
      <S06_Saude />
      <S07_Previdencia />
      <S08_Workshops />

      <Contato />
      <ConhecaInvestimentos />
      <HubFooter />
    </main>
  );
}

/* ================================================================
   Backlink editorial pra /investimentos
   ================================================================ */

function ConhecaInvestimentos() {
  return (
    <section data-tone="light" className="bg-bone">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <SectionMark eyebrow="Banca de investimentos" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.04] text-ink max-w-[26ch]">
              Investimentos é uma frente própria. Tem página própria.
            </h2>
            <p className="mt-8 t-lede text-ink-soft text-[1.0625rem] max-w-[48ch]">
              Modelo de fee, geografia de capital, composição em camadas,
              tempo composto, e a primeira conversa. Em mais detalhe.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <Link href="/investimentos" className="btn-primary">
              Conheça os investimentos
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
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

/**
 * Âncora de leitura no topo de cada seção: pequena régua + eyebrow.
 * Sem numeral — a continuidade vem do ritmo de superfícies, não da contagem.
 */
function SectionMark({ eyebrow, dark }: { eyebrow: string; dark: boolean }) {
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

function ProofRow({
  items,
  dark,
}: {
  items: { k: string; v: string }[];
  dark: boolean;
}) {
  const hairline = dark ? "border-line-on-ink" : "border-line";
  const muted = dark ? "text-on-ink-mute" : "text-ink-mute";
  const strong = dark ? "text-on-ink-strong" : "text-ink";
  return (
    <dl className={`grid grid-cols-3 gap-x-6 md:gap-x-10 border-t ${hairline} pt-6`}>
      {items.map((it) => (
        <div key={it.k} className="flex flex-col">
          <dt className={`t-mono text-[0.66rem] tracking-[0.16em] uppercase ${muted}`}>{it.k}</dt>
          <dd className={`t-display-light text-[clamp(1.125rem,1.8vw,1.5rem)] leading-[1] tabular-nums mt-2 ${strong}`}>
            {it.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ================================================================
   Header + Manifesto + Contato + Footer (estruturais)
   ================================================================ */

/* HubHeader vive em ./_hub/HubHeader.tsx (client component que detecta a
   tone da seção sob ele e flipa cor + bg + logo conforme o scroll). */

function Manifesto() {
  return (
    <section id="frentes" data-tone="light" className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-emphasis">
              Manifesto
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="t-quote text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.2] max-w-[36ch] text-ink">
              Quem já tem patrimônio formado não precisa de mais um vendedor.
              Precisa de critério para decidir, contexto para comparar e
              continuidade para sustentar.
            </p>
            <p className="mt-10 t-body text-[1.05rem] leading-[1.7] text-ink-soft max-w-[56ch]">
              A Midlej Capital opera sob fee recorrente do cliente. Zero
              comissão de produto, zero distribuição de marca. Oito frentes
              abaixo, conduzidas no mesmo princípio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contato() {
  return (
    <section id="contato" data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 md:col-span-6">
            <SectionMark eyebrow="Primeira conversa" dark />
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

function HubFooter() {
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

/* ================================================================
   01 — Mentoria full · ink · timeline full-bleed
   composição: topo (mark + h2 + lede) ▸ timeline horizontal larga
   ▸ rodapé com 3 colunas de proof + cta
   ================================================================ */

function S01_MentoriaFull() {
  return (
    <section id="mentoria-full" data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-20 md:pb-28">
        <SectionMark eyebrow="Programa contínuo" dark />
        <div className="mt-10 grid grid-cols-12 gap-8 items-end">
          <h2 className="col-span-12 md:col-span-7 t-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.04] text-on-ink-strong max-w-[18ch]">
            Mentoria completa.<br />
            <span className="text-on-ink-soft">Três frentes em paralelo.</span>
          </h2>
          <p className="col-span-12 md:col-span-5 t-lede text-on-ink-soft text-[1.05rem] max-w-[44ch]">
            Planejamento financeiro privado, conduzido pessoalmente.
            Diagnóstico, arquitetura e sustentação ativos ao mesmo tempo, na
            ordem que o caso pede.
          </p>
        </div>

        {/* Timeline ocupa toda a largura, é o centro da seção */}
        <div className="mt-16 md:mt-20">
          <FullTimeline className="w-full" />
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <ProofRow
              dark
              items={[
                { k: "Sessões iniciais", v: "3 a 5" },
                { k: "Revisão", v: "Trimestral" },
                { k: "Duração", v: "12 meses+" },
              ]}
            />
          </div>
          <div className="col-span-12 md:col-span-5 flex md:justify-end">
            <Link href="#contato" className="btn-primary-inverse">
              Conhecer a mentoria completa
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   02 — Mentoria pocket · paper · ring + copy ao lado
   composição: 6/6 asymmetric. ring centralizado num pátio quadrado,
   copy ao lado num tom mais tipográfico
   ================================================================ */

function S02_MentoriaPocket() {
  return (
    <section id="mentoria-pocket" data-tone="light" className="bg-paper text-ink">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Coluna do ring */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="mx-auto w-full max-w-[420px] aspect-square flex items-center justify-center">
              <PocketRing className="w-full h-full" />
            </div>
          </div>

          {/* Coluna do texto */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <SectionMark eyebrow="Sprint focado" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.04] text-ink max-w-[20ch]">
              Mentoria condensada.
            </h2>
            <p className="mt-8 t-lede text-ink-soft text-[1.05rem] max-w-[40ch]">
              Versão objetiva para uma decisão pontual: uma sucessão, um
              portfólio, uma reorganização tributária.
            </p>
            <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-ink-soft max-w-[48ch]">
              Sai do escopo com plano escrito, recomendações fundamentadas e
              o que decidir caso o cenário mude.
            </p>
            <div className="mt-12">
              <ProofRow
                dark={false}
                items={[
                  { k: "Janela", v: "6 semanas" },
                  { k: "Sessões", v: "4" },
                  { k: "Entrega", v: "Doc. decisório" },
                ]}
              />
            </div>
            <div className="mt-10">
              <Link href="#contato" className="btn-ghost">
                Ver mentoria condensada
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
   03 — Investimentos internacionais · ink · globo domina
   composição: globo grande à direita, copy à esquerda, numeral
   sobreposto no canto superior do globo como marca de página
   ================================================================ */

function S03_Internacionais() {
  return (
    <section id="internacionais" data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Copy esquerda */}
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <SectionMark eyebrow="Onde o capital mora" dark />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.04] text-on-ink-strong max-w-[16ch]">
              Investimentos<br />internacionais.
            </h2>
            <p className="mt-8 t-lede text-on-ink-soft text-[1.05rem] max-w-[36ch]">
              Diversificação fora do CDI, com mecanismo, não promessa.
              Carteira global construída com método.
            </p>
            <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-on-ink-soft max-w-[44ch]">
              Estruturamos exposição em ações globais, renda fixa offshore,
              fundos macro e instrumentos cambiais. Abertura de conta no
              exterior assistida.
            </p>
            <div className="mt-12">
              <ProofRow
                dark
                items={[
                  { k: "Jurisdições", v: "EUA · UK · UE" },
                  { k: "Classes", v: "Ações · RF · Hedge" },
                  { k: "Conta", v: "Assistida" },
                ]}
              />
            </div>
            <div className="mt-10">
              <Link href="#contato" className="btn-ghost-inverse">
                Quero diversificar globalmente
                <Arrow />
              </Link>
            </div>
          </div>

          {/* Globo direita — ocupa o espaço com aspect square */}
          <div className="col-span-12 md:col-span-7 order-1 md:order-2 relative">
            <div className="w-full aspect-square">
              <Globe className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   04 — Seguro de vida · paper · comparison editorial
   composição: headline no topo + bars largas embaixo
   ================================================================ */

function S04_Seguro() {
  return (
    <section id="seguro" data-tone="light" className="bg-paper text-ink">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionMark eyebrow="Proteção patrimonial" dark={false} />

        {/* Bloco editorial em coluna: h2 → sub → lede, com respiração padronizada */}
        <div className="mt-12 max-w-[68ch]">
          <h2 className="t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.04] text-ink max-w-[18ch]">
            Seguro de vida.
          </h2>
          <p className="mt-4 t-display-light text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.15] text-ink-soft max-w-[26ch]">
            Cobertura calibrada, custo otimizado.
          </p>
          <p className="mt-8 t-lede text-ink-soft text-[1.05rem] max-w-[48ch]">
            Análise de necessidade real de capital segurado. Comparação de
            apólices fora do balcão de venda.
          </p>
        </div>

        {/* Bars ocupam toda a largura, em pátio de paper levantado */}
        <div className="mt-16 md:mt-20 bg-bone p-8 md:p-12">
          <SeguroCompare className="w-full" />
        </div>

        <div className="mt-14 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <ProofRow
              dark={false}
              items={[
                { k: "Cobertura média", v: "3,3×" },
                { k: "Custo / mil", v: "−70%" },
                { k: "Modalidades", v: "Vida + DIT" },
              ]}
            />
          </div>
          <div className="col-span-12 md:col-span-5 flex md:justify-end">
            <Link href="#contato" className="btn-primary">
              Avaliar minha cobertura
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   05 — Produtos alternativos · ink · planos com h2 sobreposto
   composição: tipo capa de revista. canvas grande no fundo,
   tipografia gigante sobreposta, copy embaixo
   ================================================================ */

function S05_Alternativos() {
  return (
    <section id="alternativos" data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionMark eyebrow="Fora da prateleira" dark />

        {/* Container relativo: canvas absoluto atrás, copy sobreposta */}
        <div className="mt-10 relative">
          <div className="w-full aspect-[16/10] md:aspect-[16/9] relative">
            <div className="absolute inset-0">
              <AltLayers className="w-full h-full" />
            </div>
            {/* Headline grudada na quina inferior esquerda do canvas */}
            <div className="absolute left-0 bottom-0 max-w-[20ch] p-2 md:p-6">
              <h2 className="t-display text-[clamp(2rem,4.5vw,4rem)] leading-[0.96] text-on-ink-strong">
                Produtos<br />alternativos.
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="col-span-12 md:col-span-6">
            <p className="t-lede text-on-ink-soft text-[1.05rem] max-w-[44ch]">
              O que o private banking acessa e seu gerente nunca te ofereceu
              — porque não está na grade dele.
            </p>
            <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-on-ink-soft max-w-[52ch]">
              Fundos exclusivos, crédito privado estruturado, private equity,
              real estate. Estruturas fora da prateleira de banco.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <ProofRow
              dark
              items={[
                { k: "Ticket mínimo", v: "R$ 100k+" },
                { k: "Classes", v: "PE · RE · CRA" },
                { k: "Lock-up", v: "3 a 7 anos" },
              ]}
            />
            <div className="mt-10">
              <Link href="#contato" className="btn-ghost-inverse">
                Ver alternativos em detalhe
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
   06 — Plano de saúde · bone · matrix domina à direita
   composição: copy magra à esquerda, matrix densa à direita
   ================================================================ */

function S06_Saude() {
  return (
    <section id="saude" data-tone="light" className="bg-bone text-ink">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 md:col-span-4">
            <SectionMark eyebrow="Negociação coletiva" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.05] text-ink max-w-[14ch]">
              Plano de saúde.
            </h2>
            <p className="mt-8 t-lede text-ink-soft text-[1.0625rem] max-w-[34ch]">
              Mesma operadora, mesma rede, condição corporativa via veículo
              coletivo.
            </p>
            <p className="mt-6 t-body text-[0.95rem] leading-[1.65] text-ink-soft max-w-[40ch]">
              Estruturamos a contratação afinada ao seu perfil. Custo
              significativamente menor que a contratação como pessoa física.
            </p>
            <div className="mt-12">
              <ProofRow
                dark={false}
                items={[
                  { k: "Economia média", v: "−35%" },
                  { k: "Operadoras", v: "10+" },
                  { k: "Renovação", v: "Acompanhada" },
                ]}
              />
            </div>
            <div className="mt-10">
              <Link href="#contato" className="btn-primary">
                Quero comparar planos
                <Arrow />
              </Link>
            </div>
          </div>

          {/* Matrix grande à direita */}
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <SaudeMatrix className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   07 — Previdência privada · paper · stack vertical
   composição: stack 5col (portrait), copy 7col com proof inline
   ================================================================ */

function S07_Previdencia() {
  return (
    <section id="previdencia" data-tone="light" className="bg-paper text-ink">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Stack 3D em formato portrait (altura > largura) */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div className="mx-auto w-full max-w-[360px] aspect-[3/4]">
              <PrevidenciaStack className="w-full h-full" />
            </div>
          </div>

          {/* Copy */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <SectionMark eyebrow="Composição temporal" dark={false} />
            <h2 className="mt-10 t-display text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.04] text-ink max-w-[18ch]">
              Previdência privada.<br />
              <span className="text-ink-soft">Estrutura tributária e gestor por mérito.</span>
            </h2>
            <p className="mt-8 t-lede text-ink-soft text-[1.0625rem] max-w-[44ch]">
              Tabela regressiva trabalhada desde o primeiro aporte. Comparação
              anual dos gestores institucionais e troca quando o desempenho
              relativo justifica.
            </p>
            <div className="mt-12">
              <ProofRow
                dark={false}
                items={[
                  { k: "IR mínimo", v: "10%" },
                  { k: "Veículo", v: "PGBL · VGBL" },
                  { k: "Gestores", v: "Selecionados" },
                ]}
              />
            </div>
            <div className="mt-10">
              <Link href="#contato" className="btn-ghost">
                Estruturar previdência
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
   08 — Treinamentos e workshops · ink · room wide
   composição: headline em cima, viz larga 16/9, formatos embaixo
   ================================================================ */

function S08_Workshops() {
  return (
    <section id="workshops" data-tone="dark" className="bg-ink text-on-ink-strong">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <SectionMark eyebrow="Para grupos" dark />
        <div className="mt-10 grid grid-cols-12 gap-8 items-end">
          <h2 className="col-span-12 md:col-span-7 t-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.04] text-on-ink-strong max-w-[18ch]">
            Treinamentos<br />e workshops.
          </h2>
          <p className="col-span-12 md:col-span-5 t-lede text-on-ink-soft text-[1.0625rem] max-w-[40ch]">
            Educação financeira sob medida para times executivos, conselhos,
            sindicatos e instituições.
          </p>
        </div>

        {/* Viz wide */}
        <div className="mt-14 md:mt-20">
          <div className="w-full aspect-[16/8] md:aspect-[16/7]">
            <WorkshopRoom className="w-full h-full" />
          </div>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <ProofRow
              dark
              items={[
                { k: "Formato curto", v: "2h" },
                { k: "Programa", v: "4 sessões" },
                { k: "Modalidade", v: "Presencial · remoto" },
              ]}
            />
          </div>
          <div className="col-span-12 md:col-span-5 flex md:justify-end">
            <Link href="#contato" className="btn-ghost-inverse">
              Conversar sobre um workshop
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
