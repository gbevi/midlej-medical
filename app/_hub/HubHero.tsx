"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const HubConstellation = dynamic(() => import("../components/HubConstellation"), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero do hub Midlej Capital.
 *
 * Camada visual: navy drenched + constelação 3D atrás do conteúdo.
 * Camada de conteúdo: overline mono, H1 display tight, lede curta,
 * dois CTAs (WhatsApp primary + âncora pro bloco de soluções).
 *
 * Interatividade: o índice do nó hovered na constelação é exposto
 * via callback pro futuro highlight do card correspondente embaixo
 * (wiring via context ou prop drilling em iteração seguinte).
 */
export function HubHero() {
  // Estado mantido aqui pra futura propagação ao bloco de Soluções —
  // por enquanto só consumimos pra remover o warning de unused.
  const [, setFocused] = useState<number | null>(null);

  return (
    <section
      id="hero"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-ink text-on-ink-strong"
    >
      {/* Canvas 3D ocupando o hero inteiro como camada de fundo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ mask: "radial-gradient(ellipse 70% 60% at 70% 50%, black 30%, transparent 80%)" }}
      >
        <div className="pointer-events-auto absolute inset-0">
          <HubConstellation onNodeFocus={setFocused} />
        </div>
      </div>

      {/* Vinheta de texto sobreposta */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-36 pb-28 md:pt-44 md:pb-36">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <p className="reveal r-1 t-mono text-[0.72rem] tracking-[0.18em] uppercase text-on-ink-mute mb-6">
              Midlej Capital
            </p>
            <h1 className="reveal r-1 t-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[0.96] text-balance text-on-ink-strong max-w-[18ch]">
              Hub de soluções financeiras.
            </h1>
            <div className="reveal r-3 mt-12 flex flex-wrap items-center gap-6">
              <Link href="#contato" className="btn-primary-inverse">
                Pedir primeira conversa
                <ArrowRight />
              </Link>
              <Link href="#solucoes" className="btn-ghost-inverse">
                Ver as oito frentes
              </Link>
            </div>
          </div>

          {/* Coluna direita vazia deliberadamente — o canvas 3D ocupa a
              região visualmente, e a coluna serve como ar tipográfico. */}
          <div className="hidden md:block md:col-span-4 lg:col-span-5" />
        </div>
      </div>

      {/* Hairline inferior — termina o hero como uma página de capa */}
      <div
        aria-hidden
        className="relative z-10 mx-auto max-w-[1400px] border-t border-line-on-ink"
      />
    </section>
  );
}

function ArrowRight() {
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
