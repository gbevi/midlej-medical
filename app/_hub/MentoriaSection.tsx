"use client";

import Link from "next/link";
import { useState } from "react";

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

const STEPS = [
  { n: "01", title: "Diagnosticar", desc: "Entender o que você tem, o que precisa e onde está hoje." },
  { n: "02", title: "Arquitetar",   desc: "Construir um plano financeiro personalizado e estruturado." },
  { n: "03", title: "Sustentar",    desc: "Revisar, atualizar e acompanhar ao longo do tempo." },
];

const TOPICS = ["Organização", "Proteção", "Sucessão", "Internacional", "Crédito", "Patrimônio"];

function TabCompleta() {
  return (
    <div>
      <p className="text-[1.0rem] leading-[1.65] mb-8 max-w-[52ch]" style={{ color: "#6B7B8D" }}>
        Planejamento financeiro privado, conduzido pessoalmente. Diagnóstico,
        arquitetura e sustentação ativos ao mesmo tempo, na ordem que o caso pede.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {STEPS.map((step) => (
          <div key={step.n} className="bg-white rounded-xl p-6 border border-[#EDEFF2] shadow-sm">
            <span className="text-[2rem] font-bold block mb-3" style={{ color: "#4a6b8c" }}>{step.n}</span>
            <h4 className="font-semibold text-[1.0625rem] mb-2" style={{ color: "#2E4659" }}>{step.title}</h4>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7B8D" }}>{step.desc}</p>
          </div>
        ))}
      </div>

      <ProofRow items={[
        { k: "Sessões iniciais", v: "2 a 4" },
        { k: "Revisão",          v: "Sob demanda" },
        { k: "Duração",          v: "30 a 60 dias" },
      ]} />

      <div className="mt-8">
        <Link
          href="#contato"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
        >
          Conhecer a mentoria completa <Arrow />
        </Link>
      </div>
    </div>
  );
}

function TabCondensada() {
  return (
    <div className="grid grid-cols-12 gap-10 md:gap-12 items-start">
      <div className="col-span-12 md:col-span-6">
        <p className="text-[1.0rem] leading-[1.65] mb-4" style={{ color: "#6B7B8D" }}>
          Nosso método traz clareza para as principais decisões da sua vida financeira
          em um sprint objetivo de 30 a 60 dias.
        </p>
        <p className="text-[0.95rem] leading-[1.65] mb-8" style={{ color: "#6B7B8D" }}>
          Abordamos organização, proteção, sucessão, internacionalização e crédito,
          mostrando na prática como fortalecer sua estrutura patrimonial.
        </p>

        <ProofRow items={[
          { k: "Janela",  v: "30 a 60 dias" },
          { k: "Sessões", v: "2 a 4" },
          { k: "Entrega", v: "Plano customizado" },
        ]} />

        <div className="mt-8">
          <Link
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
          >
            Ver mentoria condensada <Arrow />
          </Link>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 grid grid-cols-3 gap-3">
        {TOPICS.map((topic) => (
          <div key={topic} className="rounded-xl p-4 text-center border border-[#EDEFF2]" style={{ backgroundColor: "#F5F7FA" }}>
            <p className="text-xs font-semibold" style={{ color: "#4a6b8c" }}>{topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { id: "completa",   label: "Mentoria completa" },
  { id: "condensada", label: "Sprint condensado" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function MentoriaSection() {
  const [active, setActive] = useState<TabId>("completa");

  return (
    <section id="mentoria" className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-10">
          <SectionTag label="Programa de mentoria" />
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-6">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight tracking-tight" style={{ color: "#2E4659" }}>
              Mentoria financeira privada.
            </h2>
          </div>

          {/* Tabs */}
          <div className="inline-flex gap-1 p-1 rounded-lg" style={{ backgroundColor: "#EDEFF2" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
                style={
                  active === tab.id
                    ? { backgroundColor: "#4a6b8c", color: "#ffffff" }
                    : { backgroundColor: "transparent", color: "#6B7B8D" }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div key={active}>
          {active === "completa" ? <TabCompleta /> : <TabCondensada />}
        </div>
      </div>
    </section>
  );
}
