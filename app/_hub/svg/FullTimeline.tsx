"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useInView";

/**
 * FullTimeline — viz da mentoria FULL, scroll-driven.
 *
 * Surface: INK. O cursor oxblood (linha vertical + diamante) é controlado
 * pelo progresso da seção pela viewport (0..1). Os nós preenchem nos
 * thresholds 0 / 0.5 / 1.0 via clamp() em CSS calc.
 *
 * Implementação: hook local em rAF atualiza a CSS custom property
 * `--ft-p` no container; transforms e opacities são computados em CSS,
 * GPU-friendly, sem re-render React.
 *
 * `prefers-reduced-motion`: pula o tracking de scroll e fixa estado final.
 */
export function FullTimeline({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (typeof window === "undefined" || !el) return;
    if (reduced) {
      el.style.setProperty("--ft-p", "1");
      return;
    }
    let raf = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const elapsed = vh - rect.top;
      const p = Math.max(0, Math.min(1, elapsed / total));
      el.style.setProperty("--ft-p", p.toString());
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  const PAPER = "#F6F2EA";
  const OXBLOOD = "#9B3221";

  // Posições X dos nós principais.
  const x1 = 130;
  const x2 = 450;
  const x3 = 770;
  const x4 = 840; // recuado pra "→ contínuo" caber dentro do viewBox 900
  const Y = 110;
  const DX = x3 - x1; // 640 — trajeto total do cursor

  return (
    <div ref={containerRef} className={className} style={{ ["--ft-p" as string]: 0 }}>
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
          .ft-node-fill { fill: ${PAPER}; }
          .ft-node-future { fill: transparent; stroke: ${PAPER}; stroke-width: 1; opacity: 0.45; }
          .ft-cursor-line { stroke: ${OXBLOOD}; stroke-width: 1.25; }
          .ft-cursor-dot { fill: ${OXBLOOD}; }
          .ft-num { fill: ${OXBLOOD}; font-size: 11px; letter-spacing: 0.16em; }
          .ft-name { fill: ${PAPER}; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; }
          .ft-proof { fill: ${PAPER}; opacity: 0.62; font-size: 11.5px; letter-spacing: 0.02em; }
          .ft-cont { fill: ${PAPER}; opacity: 0.5; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; }

          /* Cursor: traduz X pelo progress; fade-in nos primeiros 5% */
          .ft-cursor {
            transform: translateX(calc(var(--ft-p, 0) * ${DX}px));
            opacity: clamp(0, calc(var(--ft-p, 0) / 0.05), 1);
            transition: none;
          }

          /* Nós preenchem ao passar pelo threshold do cursor */
          .ft-node-1 .ft-node-fill { opacity: clamp(0, calc((var(--ft-p, 0) - 0.05) / 0.05), 1); }
          .ft-node-2 .ft-node-fill { opacity: clamp(0, calc((var(--ft-p, 0) - 0.50) / 0.05), 1); }
          .ft-node-3 .ft-node-fill { opacity: clamp(0, calc((var(--ft-p, 0) - 0.92) / 0.05), 1); }
        `}</style>

        {/* Linha base */}
        <line x1={x1} y1={Y} x2={x3} y2={Y} className="ft-line" />
        <line x1={x3} y1={Y} x2={x4} y2={Y} className="ft-line-dash" />

        {/* Nós */}
        {[
          { x: x1, num: "01", name: "Diagnosticar", proof: "entender o que você precisa", cls: "ft-node-1" },
          { x: x2, num: "02", name: "Arquitetar", proof: "mostrar o seu plano personalizado", cls: "ft-node-2" },
          { x: x3, num: "03", name: "Sustentar", proof: "revisar e atualizar", cls: "ft-node-3" },
        ].map((n) => (
          <g key={n.num} className={n.cls}>
            <text x={n.x} y={Y - 36} textAnchor="middle" className="ft-num">
              {n.num}
            </text>
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

        {/* Nó "contínuo" — diamante + label INLINE à direita, no eixo Y do timeline,
            pra não colidir com o proof de "Sustentar" embaixo */}
        <g>
          <polygon
            points={`${x4},${Y - 8} ${x4 + 8},${Y} ${x4},${Y + 8} ${x4 - 8},${Y}`}
            className="ft-node-future"
          />
          <text x={x4 + 18} y={Y + 4} textAnchor="start" className="ft-cont">
            contínuo
          </text>
        </g>

        {/* Cursor oxblood — ancorado em x1, translatado por --ft-p */}
        <g className="ft-cursor">
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
