"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Observa um elemento e dispara `inView=true` uma única vez quando
 * cruza o threshold informado (default 15%). Após disparar, desconecta
 * o observer — animações de entrada não devem se repetir em scroll
 * reverso porque isso é "chamariz" e quebra a leitura sóbria do hub.
 */
export function useInView<T extends Element = HTMLDivElement>(
  threshold = 0.15
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // SSR/jsdom fallback: agendar fora do efeito evita cascata sincrônica
      // de renders (regra react-hooks/set-state-in-effect).
      const id = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(id);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/**
 * Hook utilitário: respeita `prefers-reduced-motion: reduce`. Lê o
 * estado uma vez no mount (lazy) e ouve mudanças para responder a
 * preferências do sistema em tempo real.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}
