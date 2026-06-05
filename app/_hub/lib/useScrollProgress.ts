"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Hook que entrega `scrollProgress` (0..1) de um elemento ao passar
 * pela viewport, via `useRef` — não causa re-render. Ideal para alimentar
 * `useFrame` (R3F) ou animações imperativas (rAF / requestAnimationFrame).
 *
 * Modelo:
 *   - progress = 0 quando o TOPO do elemento toca o FUNDO da viewport
 *   - progress = 1 quando o FUNDO do elemento toca o TOPO da viewport
 *
 * Isto dá uma janela de scroll equivalente à altura(elemento) + altura(viewport),
 * cobrindo o trajeto inteiro do elemento atravessando a tela. Bom default para
 * cenas que querem "responder ao scroll" de forma contínua.
 *
 * O valor é gravado em `progressRef.current` e atualizado em rAF a cada scroll
 * ou resize. Consumidores leem o ref dentro de loops (useFrame, etc).
 */
export function useScrollProgress(
  containerRef: RefObject<HTMLElement | null>,
): RefObject<number> {
  const progressRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (typeof window === "undefined" || !el) return;

    let raf = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const elapsed = vh - rect.top;
      const p = Math.max(0, Math.min(1, elapsed / total));
      progressRef.current = p;
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
  }, [containerRef]);

  return progressRef;
}
