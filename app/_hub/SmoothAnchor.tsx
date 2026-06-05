"use client";

import { useEffect } from "react";

/**
 * Intercepta cliques globais em links `<a href="#…">` dentro da rota
 * brand e faz scroll programático suave para o elemento alvo —
 * SEM alterar `location.hash`.
 *
 * Por quê:
 *   - O comportamento nativo do anchor coloca `#xxx` na URL. Se o usuário
 *     clicar de novo no MESMO link, o hash já é o atual, o browser não
 *     dispara scroll de novo, e parece que o CTA "parou de funcionar".
 *   - Aqui interceptamos o evento, `preventDefault()` segura o nav nativo,
 *     `scrollIntoView({behavior:"smooth"})` rola sempre. O CTA funciona
 *     N vezes consecutivas.
 *
 * Acessibilidade preservada:
 *   - O `href="#…"` original continua no DOM, então JS-off (ou crawler)
 *     ainda navega corretamente.
 *   - `scroll-padding-top` do html é respeitado pelo `scrollIntoView`,
 *     garantindo que o destino apareça abaixo do header fixed.
 *
 * Não intercepta:
 *   - Cliques com modifier (ctrl/cmd/shift/meta) — preserva "abrir em
 *     nova aba", "abrir em nova janela", etc.
 *   - Links com `target="_blank"` ou hrefs externas.
 *   - Links sem ID válido no documento (deixa fluxo nativo).
 */
export function SmoothAnchor() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return; // só clique esquerdo
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
