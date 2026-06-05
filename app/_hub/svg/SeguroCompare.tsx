"use client";

import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "./useInView";

/**
 * SeguroCompare — viz da frente "seguro de vida".
 *
 * Surface: PAPER. Dois bars horizontais comparando "Apólice padrão"
 * (R$ 500 mil, ~220px) com "Estruturada Midlej" (R$ 1,8 mi, ~720px).
 *
 * Choreografia:
 *  - Bar1 cresce de 0 → 220 em 1.4s ease-out.
 *  - Bar2 cresce de 0 → 720 em 1.6s ease-out (200ms a mais depois de
 *    bar1 se assentar — desnivela a leitura, faz a desigualdade
 *    parecer "ganha", não pré-fabricada).
 *  - Numerais (R$) animam via requestAnimationFrame sincronizado, do
 *    valor inicial 0 até o valor final, mesmo duration.
 *  - Seta oxblood + label "3,3× cobertura, 70% menos custo por unidade"
 *    aparece com fade após bar2 assentar.
 *
 * Reduced-motion: tudo no estado final.
 */
export function SeguroCompare({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const reduced = useReducedMotion();
  const active = inView || reduced;

  const INK = "#062241";
  const OXBLOOD = "#9B3221";

  const BAR_Y_1 = 110;
  const BAR_Y_2 = 220;
  const BAR_H = 30;
  const BAR_X = 40;
  const FINAL_1 = 220;
  const FINAL_2 = 720;
  const FINAL_VAL_1 = 500; // R$ 500 mil
  const FINAL_VAL_2 = 1800; // R$ 1800 mil

  const DUR_1 = 1400;
  const DUR_2 = 1600;
  const DELAY_2 = 200;

  const [val1, setVal1] = useState(reduced ? FINAL_VAL_1 : 0);
  const [val2, setVal2] = useState(reduced ? FINAL_VAL_2 : 0);

  useEffect(() => {
    if (!active || reduced) return;
    const t0 = performance.now();
    let raf = 0;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const elapsed = now - t0;
      const p1 = Math.min(1, elapsed / DUR_1);
      const p2 = Math.min(1, Math.max(0, (elapsed - DELAY_2) / DUR_2));
      setVal1(Math.round(easeOut(p1) * FINAL_VAL_1));
      setVal2(Math.round(easeOut(p2) * FINAL_VAL_2));
      if (p1 < 1 || p2 < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced]);

  const fmt = (mil: number) => {
    // mil em "milhares de R$": 500 → "R$ 500 mil"; 1800 → "R$ 1.800 mil".
    const s = mil.toLocaleString("pt-BR");
    return `R$ ${s} mil`;
  };

  return (
    <div ref={ref} className={className} data-revealed={inView ? "true" : "false"}>
      <svg
        viewBox="0 0 900 360"
        width="100%"
        height="auto"
        role="img"
        aria-label="Comparação: apólice padrão R$ 500 mil versus estruturada Midlej R$ 1,8 milhão."
        style={{ display: "block" }}
      >
        <style>{`
          .sc-label { fill: ${INK}; opacity: 0.7; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; }
          .sc-num { fill: ${INK}; font-weight: 300; font-size: 28px; letter-spacing: -0.01em; }
          .sc-num-strong { fill: ${INK}; }
          .sc-bar-bg { fill: ${INK}; opacity: 0.08; }
          .sc-bar-1 { fill: ${INK}; opacity: 0.78; }
          .sc-bar-2 { fill: ${INK}; opacity: 0.92; }
          .sc-mono { fill: ${INK}; opacity: 0.62; font-size: 11px; letter-spacing: 0.06em; font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; }
          .sc-mono-strong { fill: ${OXBLOOD}; opacity: 1; }
          .sc-arrow { stroke: ${OXBLOOD}; stroke-width: 1.5; fill: none; opacity: 0; }
          .sc-arrow-head { fill: ${OXBLOOD}; opacity: 0; }
          .sc-arrow-label { fill: ${OXBLOOD}; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0; }
          .sc-bar-1-rect { transform-origin: ${BAR_X}px ${BAR_Y_1}px; transform: scaleX(${reduced ? 1 : 0}); transition: transform ${DUR_1}ms cubic-bezier(.16,.84,.32,1); }
          .sc-bar-2-rect { transform-origin: ${BAR_X}px ${BAR_Y_2}px; transform: scaleX(${reduced ? 1 : 0}); transition: transform ${DUR_2}ms cubic-bezier(.16,.84,.32,1) ${DELAY_2}ms; }
          [data-revealed="true"] .sc-bar-1-rect { transform: scaleX(1); }
          [data-revealed="true"] .sc-bar-2-rect { transform: scaleX(1); }
          [data-revealed="true"] .sc-arrow, [data-revealed="true"] .sc-arrow-head, [data-revealed="true"] .sc-arrow-label {
            animation: sc-fade 480ms ease-out ${DELAY_2 + DUR_2 - 200}ms forwards;
          }
          @keyframes sc-fade { to { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) {
            .sc-bar-1-rect, .sc-bar-2-rect { transform: scaleX(1) !important; transition: none !important; }
            .sc-arrow, .sc-arrow-head, .sc-arrow-label { opacity: 1 !important; animation: none !important; }
          }
        `}</style>

        {/* Linha 1 — Apólice padrão */}
        <text x={BAR_X} y={70} className="sc-label">Apólice padrão</text>
        <text x={BAR_X} y={102} className="sc-num">{fmt(val1)}</text>
        <rect x={BAR_X} y={BAR_Y_1} width={FINAL_1} height={BAR_H} className="sc-bar-bg" />
        <rect x={BAR_X} y={BAR_Y_1} width={FINAL_1} height={BAR_H} className="sc-bar-1 sc-bar-1-rect" />
        <text x={BAR_X} y={BAR_Y_1 + BAR_H + 18} className="sc-mono">R$ 3,8 / mil</text>

        {/* Linha 2 — Estruturada Midlej */}
        <text x={BAR_X} y={180} className="sc-label">Estruturada Midlej</text>
        <text x={BAR_X} y={212} className="sc-num sc-num-strong">{fmt(val2)}</text>
        <rect x={BAR_X} y={BAR_Y_2} width={FINAL_2} height={BAR_H} className="sc-bar-bg" />
        <rect x={BAR_X} y={BAR_Y_2} width={FINAL_2} height={BAR_H} className="sc-bar-2 sc-bar-2-rect" />
        <text x={BAR_X} y={BAR_Y_2 + BAR_H + 18} className="sc-mono sc-mono-strong">R$ 1,1 / mil</text>

        {/* Seta oxblood + label acima do bar2 */}
        <g>
          <line x1={BAR_X + 8} y1={195} x2={BAR_X + FINAL_2 - 14} y2={195} className="sc-arrow" />
          <polygon
            points={`${BAR_X + FINAL_2 - 14},189 ${BAR_X + FINAL_2 - 4},195 ${BAR_X + FINAL_2 - 14},201`}
            className="sc-arrow-head"
          />
          <text x={BAR_X + 14} y={185} className="sc-arrow-label">
            3,3× cobertura · 70% menos custo por unidade
          </text>
        </g>
      </svg>
    </div>
  );
}

export default SeguroCompare;
