"use client";

import { useInView, useReducedMotion } from "./useInView";

/**
 * SaudeMatrix — viz da frente "plano de saúde".
 *
 * Surface: PAPER/BONE. Matriz 4×4 de "cards" representando planos.
 * Cada card carrega badge mono, nome em caps e um pequeno bar de
 * custo + selo de desconto oxblood.
 *
 * Choreografia de entrada:
 *  - Stagger row-major: cada card aparece com 50ms * index.
 *  - translateY(8px) → 0 + opacity 0 → 1, 360ms ease-out por card.
 *
 * Hover (via CSS :hover na <g>):
 *  - Card escala 1.05 (transform-origin no centro).
 *  - Borda fica oxblood, opacity 1.
 *  - Tooltip estendido (<g class="sm-tooltip">) aparece logo abaixo.
 *
 * Reduced-motion: render direto sem stagger.
 */
export function SaudeMatrix({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  const reduced = useReducedMotion();
  const revealed = inView || reduced;

  const INK = "#062241";
  const OXBLOOD = "#9B3221";

  const COLS = 4;
  const CARD_W = 144;
  const CARD_H = 108;
  const GAP_X = 24;
  const GAP_Y = 24;
  const PAD_X = 36;
  const PAD_Y = 24;

  const plans = [
    { name: "Bradesco TOP Nacional", net: "Nacional", policy: "Coletivo", cost: 0.92, discount: 38 },
    { name: "Amil S750", net: "Nacional", policy: "Coletivo", cost: 0.68, discount: 32 },
    { name: "SulAmérica Especial", net: "Nacional", policy: "Coletivo", cost: 0.84, discount: 41 },
    { name: "Allianz Plus", net: "Nacional", policy: "Coletivo", cost: 0.76, discount: 29 },
    { name: "Notre Dame Smart 350", net: "Regional", policy: "Coletivo", cost: 0.55, discount: 27 },
    { name: "Hapvida Mix", net: "Regional", policy: "Coletivo", cost: 0.42, discount: 24 },
    { name: "Care Plus Saúde", net: "Nacional", policy: "Coletivo", cost: 0.88, discount: 36 },
    { name: "Omint Premium", net: "Nacional", policy: "Coletivo", cost: 0.96, discount: 44 },
    { name: "Porto Seguro Plus", net: "Nacional", policy: "Coletivo", cost: 0.7, discount: 31 },
    { name: "Mediservice Total", net: "Nacional", policy: "Coletivo", cost: 0.62, discount: 28 },
    { name: "Greenline Saúde", net: "Regional", policy: "Coletivo", cost: 0.48, discount: 22 },
    { name: "Unimed Nacional", net: "Nacional", policy: "Coletivo", cost: 0.81, discount: 33 },
    { name: "Embarq Premier", net: "Nacional", policy: "Coletivo", cost: 0.74, discount: 30 },
    { name: "Pasa Master", net: "Nacional", policy: "Coletivo", cost: 0.66, discount: 26 },
    { name: "Eça Plus", net: "Regional", policy: "Coletivo", cost: 0.58, discount: 25 },
    { name: "Salutar Saúde", net: "Nacional", policy: "Coletivo", cost: 0.72, discount: 34 },
  ];

  return (
    <div ref={ref} className={className} data-revealed={inView ? "true" : "false"}>
      <svg
        viewBox="0 0 720 540"
        width="100%"
        height="auto"
        role="img"
        aria-label="Matriz de planos de saúde coletivos com desconto versus contratação individual."
        style={{ display: "block", overflow: "visible" }}
      >
        <style>{`
          .sm-card { opacity: ${revealed ? 1 : 0}; transform: translateY(${revealed ? 0 : 8}px); transition: opacity 360ms ease-out, transform 360ms ease-out; cursor: default; }
          .sm-rect { fill: transparent; stroke: ${INK}; stroke-width: 1; stroke-opacity: 0.22; transition: stroke 220ms ease-out, stroke-opacity 220ms ease-out; }
          .sm-card:hover .sm-rect { stroke: ${OXBLOOD}; stroke-opacity: 1; }
          .sm-card:hover .sm-inner { transform: scale(1.05); }
          .sm-inner { transform-box: fill-box; transform-origin: center; transition: transform 220ms cubic-bezier(.2,.7,.2,1); }
          .sm-badge { fill: ${INK}; opacity: 0.55; font-size: 9.5px; letter-spacing: 0.14em; font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; }
          .sm-name { fill: ${INK}; opacity: 0.92; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; }
          .sm-cost-bg { stroke: ${INK}; stroke-opacity: 0.18; stroke-width: 1; }
          .sm-cost-fg { stroke: ${INK}; stroke-opacity: 0.6; stroke-width: 1.5; }
          .sm-disc { fill: ${OXBLOOD}; font-size: 9.5px; letter-spacing: 0.08em; font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; }
          .sm-tooltip { opacity: 0; pointer-events: none; transition: opacity 200ms ease-out; }
          .sm-tooltip-bg { fill: ${INK}; opacity: 0.96; }
          .sm-tooltip-text { fill: #F6F2EA; font-size: 9.5px; letter-spacing: 0.06em; }
          .sm-card:hover .sm-tooltip { opacity: 1; }
          ${plans
            .map(
              (_, i) => `
            [data-revealed="true"] .sm-card-${i} { transition-delay: ${i * 50}ms; }
          `
            )
            .join("\n")}
          @media (prefers-reduced-motion: reduce) {
            .sm-card { opacity: 1 !important; transform: translateY(0) !important; transition: none !important; }
          }
        `}</style>

        {plans.map((p, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;
          const x = PAD_X + col * (CARD_W + GAP_X);
          const y = PAD_Y + row * (CARD_H + GAP_Y);
          const idx = String(i + 1).padStart(2, "0");

          // bar de custo: hairline de fundo + fração preenchida.
          const barX = x + 12;
          const barY = y + CARD_H - 22;
          const barW = CARD_W - 24;
          const fillW = barW * p.cost;

          // tooltip aparece logo abaixo do card.
          const tipW = 280;
          const tipH = 34;
          const tipX = Math.min(x, 720 - tipW - 8);
          const tipY = y + CARD_H + 6;

          return (
            <g key={i} className={`sm-card sm-card-${i}`}>
              <g className="sm-inner">
                <rect x={x} y={y} width={CARD_W} height={CARD_H} rx={2} className="sm-rect" />
                <text x={x + 12} y={y + 22} className="sm-badge">{idx}</text>
                <text x={x + 12} y={y + 52} className="sm-name">
                  {p.name.length > 22 ? p.name.slice(0, 21) + "…" : p.name}
                </text>
                <line x1={barX} y1={barY} x2={barX + barW} y2={barY} className="sm-cost-bg" />
                <line x1={barX} y1={barY} x2={barX + fillW} y2={barY} className="sm-cost-fg" />
                <text x={x + 12} y={y + CARD_H - 8} className="sm-disc">−{p.discount}%</text>
              </g>
              <g className="sm-tooltip">
                <rect x={tipX} y={tipY} width={tipW} height={tipH} rx={2} className="sm-tooltip-bg" />
                <text x={tipX + 10} y={tipY + 21} className="sm-tooltip-text">
                  {`${p.name} · Rede ${p.net} · Apólice ${p.policy} · −${p.discount}% vs individual`}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default SaudeMatrix;
