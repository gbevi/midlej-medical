"use client";

import { useEffect, useState } from "react";
import { MidlejMark } from "./MidlejMark";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="site-header"
      data-scrolled={scrolled ? "true" : "false"}
    >
      <div className="container site-header-inner">
        <a
          href="#top"
          className="site-header-brand"
          aria-label="PLENOMED, voltar ao topo"
        >
          <span className="site-header-mark">
            <MidlejMark height={44} />
          </span>
        </a>

        <a href="#capital" className="site-header-cta">
          Quero meu acesso
          <span className="site-header-cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </header>
  );
}
