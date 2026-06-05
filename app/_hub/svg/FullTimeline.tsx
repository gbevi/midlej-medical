"use client";

import { useInView, useReducedMotion } from "./useInView";

/**
 * FullTimeline — viz da mentoria FULL.
 *
 * Surface: INK (navy). Estética: hairline paper, marcadores ink-on-paper,
 * cursor oxblood. Três fases finitas + nó "contínuo" tracejado à direita.
 *
 * Choreografia:
 *  - Linha horizontal paper aparece logo no reveal (instante).
 *  - Cursor oxblood (linha vertical + diamante) traça da fase 1 → 3 em
 *    2.4s com cubic-bezier(.2,.7,.2,1).
 *  - Cada nó "preenche" (de ring vazio para paper sólido) no instante
 *    em que o cursor passa por ele — sincronizado por `animation-delay`.
 *  - O cursor para em x=770 (fase 3). A região tracejada até x=900
 *    permanece como promessa de continuidade.
 *
 * `prefers-reduced-motion`: pula a animação e renderiza o estado final.
 */
export function FullTimeline({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const reduced = useReducedMotion();
  const finalState = reduced; // se reduced, mostra tudo final desde o início.

  const PAPER = "#F6F2EA";
  const OXBLOOD = "#9B3221";

  // Posições X dos nós principais.
  const x1 = 130;
  const x2 = 450;
  const x3 = 770;
  const x4 = 870;
  const Y = 110;

  return (
    <div ref={ref} className={className} data-revealed={inView ? "true" : "false"}>
      <svg
        viewBox="0 0 900 220"
        width="100%"
        height="auto"
        role="img"
        aria-label="Linha do tempo da mentoria FULL: diagnosticar, arquitetar, sustentar."
        style={{ display: "block" }}
      >
        <style>{`
          .ft-line { stroke: ${PAPER}; stroke-width: 1; opacity: 0.55; }
          .ft-line-dash { stroke: ${PAPER}; stroke-width: 1; opacity: 0.4; stroke-dasharray: 4 6; }
          .ft-node-ring { fill: transparent; stroke: ${PAPER}; stroke-width: 1.25; }
          .ft-node-fill {
            fill: ${PAPER};
            opacity: ${finalState ? 1 : 0};
            transform-origin: center;
            transform-box: fill-box;
          }
          .ft-node-future {
            fill: transparent;
            stroke: ${PAPER};
            stroke-width: 1;
            opacity: 0.45;
          }
          .ft-cursor {
            opacity: ${finalState ? 1 : 0};
            transform: translateX(0px);
          }
          .ft-cursor-line { stroke: ${OXBLOOD}; stroke-width: 1.25; }
          .ft-cursor-dot { fill: ${OXBLOOD}; }
          .ft-num { fill: ${OXBLOOD}; font-size: 11px; letter-spacing: 0.16em; }
          .ft-name { fill: ${PAPER}; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; }
          .ft-proof { fill: ${PAPER}; opacity: 0.62; font-size: 11.5px; letter-spacing: 0.02em; }
          .ft-cont { fill: ${PAPER}; opacity: 0.5; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; }

          [data-revealed="true"] .ft-cursor {
            animation: ft-cursor-move 2400ms cubic-bezier(.2,.7,.2,1) forwards;
          }
          [data-revealed="true"] .ft-node-1 .ft-node-fill {
            animation: ft-node-pop 280ms cubic-bezier(.2,.7,.2,1) 240ms forwards;
          }
          [data-revealed="true"] .ft-node-2 .ft-node-fill {
            animation: ft-node-pop 280ms cubic-bezier(.2,.7,.2,1) 1200ms forwards;
          }
          [data-revealed="true"] .ft-node-3 .ft-node-fill {
            animation: ft-node-pop 280ms cubic-bezier(.2,.7,.2,1) 2280ms forwards;
          }

          @keyframes ft-cursor-move {
            0%   { transform: translateX(0px); opacity: 0; }
            8%   { opacity: 1; }
            100% { transform: translateX(${x3 - x1}px); opacity: 1; }
          }
          @keyframes ft-node-pop {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }

          @media (prefers-reduced-motion: reduce) {
            .ft-cursor { transform: translateX(${x3 - x1}px) !important; opacity: 1 !important; animation: none !important; }
            .ft-node-fill { opacity: 1 !important; animation: none !important; }
          }
        `}</style>

        {/* Linha base */}
        <line x1={x1} y1={Y} x2={x3} y2={Y} className="ft-line" />
        {/* Trecho tracejado para "contínuo" */}
        <line x1={x3} y1={Y} x2={x4} y2={Y} className="ft-line-dash" />

        {/* Nós */}
        {[
          { x: x1, num: "01", name: "Diagnosticar", proof: "uma sessão estruturada", cls: "ft-node-1" },
          { x: x2, num: "02", name: "Arquitetar", proof: "proposta documentada", cls: "ft-node-2" },
          { x: x3, num: "03", name: "Sustentar", proof: "revisões trimestrais", cls: "ft-node-3" },
        ].map((n) => (
          <g key={n.num} className={n.cls}>
            <text x={n.x} y={Y - 36} textAnchor="middle" className="ft-num">
              {n.num}
            </text>
            {/* diamante (octahedron 2D) */}
            <polygon
              points={`${n.x},${Y - 14} ${n.x + 14},${Y} ${n.x},${Y + 14} ${n.x - 14},${Y}`}
              className="ft-node-ring"
            />
            <polygon
              points={`${n.x},${Y - 14} ${n.x + 14},${Y} ${n.x},${Y + 14} ${n.x - 14},${Y}`}
              className="ft-node-fill"
            />
            <text x={n.x} y={Y + 38} textAnchor="middle" className="ft-name">
              {n.name}
            </text>
            <text x={n.x} y={Y + 58} textAnchor="middle" className="ft-proof">
              {n.num} · {n.name} — {n.proof}
            </text>
          </g>
        ))}

        {/* Nó "contínuo" à direita: menor, fade, sem fill */}
        <g>
          <polygon
            points={`${x4},${Y - 8} ${x4 + 8},${Y} ${x4},${Y + 8} ${x4 - 8},${Y}`}
            className="ft-node-future"
          />
          <text x={x4} y={Y + 38} textAnchor="middle" className="ft-cont">
            → contínuo
          </text>
        </g>

        {/* Cursor oxblood */}
        <g className="ft-cursor" style={{ transform: `translateX(${finalState ? x3 - x1 : 0}px)` }}>
          <line x1={x1} y1={80} x2={x1} y2={140} className="ft-cursor-line" />
          <polygon
            points={`${x1},${Y - 6} ${x1 + 6},${Y} ${x1},${Y + 6} ${x1 - 6},${Y}`}
            className="ft-cursor-dot"
          />
        </g>
      </svg>
    </div>
  );
}

export default FullTimeline;
