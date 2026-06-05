"use client";

import { useInView, useReducedMotion } from "./useInView";

/**
 * PocketRing — viz da mentoria POCKET.
 *
 * Surface: PAPER. Anel segmentado (6 segmentos, 60° cada, 4° gap)
 * que enche em sequência horária — sugere "6 semanas comprimidas
 * em um sprint". No centro: "06" em display + "semanas" em caps.
 *
 * Choreografia:
 *  - Ao entrar em view, segmentos preenchem clockwise.
 *  - Cada segmento: 320ms ease (cubic-bezier .2,.7,.2,1), stagger 90ms.
 *  - Numeral central sobe de opacity 0 → 1 com leve translateY após
 *    o 3º segmento preencher (sensação de "concretização").
 *
 * Reduced-motion: mostra todos os segmentos preenchidos imediatamente.
 */
export function PocketRing({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const reduced = useReducedMotion();
  const final = reduced;

  const INK = "#233853";
  const OXBLOOD = "#9B3221";

  const CX = 160;
  const CY = 160;
  const R_OUT = 130;
  const R_IN = 110;
  const GAP_DEG = 4;
  const SEG_DEG = 60 - GAP_DEG; // 56°
  const SEGMENTS = 6;

  // Começa em -90° (topo), avança clockwise.
  const startAngle = -90 + GAP_DEG / 2;

  const polar = (cx: number, cy: number, r: number, deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
  };

  const arcPath = (i: number) => {
    const a0 = startAngle + i * 60;
    const a1 = a0 + SEG_DEG;
    const [x0o, y0o] = polar(CX, CY, R_OUT, a0);
    const [x1o, y1o] = polar(CX, CY, R_OUT, a1);
    const [x1i, y1i] = polar(CX, CY, R_IN, a1);
    const [x0i, y0i] = polar(CX, CY, R_IN, a0);
    const largeArc = SEG_DEG > 180 ? 1 : 0;
    return [
      `M ${x0o} ${y0o}`,
      `A ${R_OUT} ${R_OUT} 0 ${largeArc} 1 ${x1o} ${y1o}`,
      `L ${x1i} ${y1i}`,
      `A ${R_IN} ${R_IN} 0 ${largeArc} 0 ${x0i} ${y0i}`,
      "Z",
    ].join(" ");
  };

  // Posição do label "semana N" externo ao segmento i.
  const labelPos = (i: number) => {
    const mid = startAngle + i * 60 + SEG_DEG / 2;
    return polar(CX, CY, R_OUT + 22, mid);
  };

  return (
    <div ref={ref} className={className} data-revealed={inView ? "true" : "false"}>
      <svg
        viewBox="0 0 320 320"
        width="100%"
        height="auto"
        role="img"
        aria-label="Anel segmentado de seis semanas: mentoria pocket."
        style={{ display: "block" }}
      >
        <style>{`
          .pr-seg-ring  { fill: transparent; stroke: ${INK}; stroke-width: 1; opacity: 0.5; }
          .pr-seg-fill  { fill: ${INK}; opacity: 0; }
          .pr-seg-edge  { fill: transparent; stroke: ${OXBLOOD}; stroke-width: 1; opacity: 0; }
          .pr-center-num { fill: ${OXBLOOD}; font-size: 72px; font-weight: 300; letter-spacing: -0.02em; opacity: ${final ? 1 : 0}; }
          .pr-center-cap { fill: ${INK}; opacity: ${final ? 0.7 : 0}; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; }
          .pr-edge-cap   { fill: ${INK}; opacity: 0.55; font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; }

          ${Array.from({ length: SEGMENTS })
            .map(
              (_, i) => `
            [data-revealed="true"] .pr-seg-${i} .pr-seg-fill {
              animation: pr-fade 320ms cubic-bezier(.2,.7,.2,1) ${i * 90}ms forwards;
            }
            [data-revealed="true"] .pr-seg-${i} .pr-seg-edge {
              animation: pr-edge 320ms cubic-bezier(.2,.7,.2,1) ${i * 90 + 120}ms forwards;
            }
          `
            )
            .join("\n")}

          [data-revealed="true"] .pr-center-num {
            animation: pr-center 520ms cubic-bezier(.2,.7,.2,1) 360ms forwards;
          }
          [data-revealed="true"] .pr-center-cap {
            animation: pr-center-cap 520ms cubic-bezier(.2,.7,.2,1) 460ms forwards;
          }

          @keyframes pr-fade { to { opacity: 0.85; } }
          @keyframes pr-edge { to { opacity: 1; } }
          @keyframes pr-center { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes pr-center-cap { 0% { opacity: 0; } 100% { opacity: 0.7; } }

          @media (prefers-reduced-motion: reduce) {
            .pr-seg-fill { opacity: 0.85 !important; animation: none !important; }
            .pr-seg-edge { opacity: 1 !important; animation: none !important; }
            .pr-center-num { opacity: 1 !important; animation: none !important; }
            .pr-center-cap { opacity: 0.7 !important; animation: none !important; }
          }
        `}</style>

        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const d = arcPath(i);
          const [lx, ly] = labelPos(i);
          return (
            <g key={i} className={`pr-seg-${i}`}>
              <path d={d} className="pr-seg-ring" />
              <path d={d} className="pr-seg-fill" />
              <path d={d} className="pr-seg-edge" />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="pr-edge-cap">
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}

        <text x={CX} y={CY + 8} textAnchor="middle" className="pr-center-num">
          06
        </text>
        <text x={CX} y={CY + 38} textAnchor="middle" className="pr-center-cap">
          semanas
        </text>
      </svg>
    </div>
  );
}

export default PocketRing;
