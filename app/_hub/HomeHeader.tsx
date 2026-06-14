"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Soluções",      href: "#solucoes" },
  { label: "Mentoria",      href: "#mentoria" },
  { label: "Investimentos", href: "/investimentos" },
  { label: "Contato",       href: "#contato" },
];

export function HomeHeader() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao navegar por âncora
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [menuOpen]);

  // Trava o scroll do body quando o menu está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-40 bg-white transition-all duration-300"
        style={{
          boxShadow: scrolled ? "0 2px 20px rgba(74,107,140,0.10)" : "none",
          borderBottom: scrolled ? "none" : "1px solid #EDEFF2",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" aria-label="Midlej Capital, ir ao topo" className="inline-flex items-center gap-3 shrink-0">
            <Image
              src="/icon_midlej.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              aria-hidden
            />
            <span style={{ color: "#2E4659", fontFamily: "var(--font-manrope)", fontSize: "1.125rem", fontWeight: 700, letterSpacing: "0.01em" }}>
              Midlej Capital
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-[#2E4659]"
                style={{ color: "#4a6b8c" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA desktop */}
            <Link
              href="#contato"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
            >
              Pedir conversa
            </Link>

            {/* Hambúrguer mobile */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-md"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span
                className="block w-6 h-[2px] transition-all duration-300 origin-center"
                style={{
                  backgroundColor: "#2E4659",
                  transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block w-6 h-[2px] transition-all duration-300"
                style={{
                  backgroundColor: "#2E4659",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-[2px] transition-all duration-300 origin-center"
                style={{
                  backgroundColor: "#2E4659",
                  transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile overlay */}
      <div
        id="mobile-nav"
        className="fixed inset-x-0 bottom-0 z-30 md:hidden bg-white transition-all duration-300 ease-in-out overflow-y-auto"
        style={{
          top: "64px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
        }}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex flex-col px-6 pt-6 pb-10 gap-1"
          aria-label="Navegação mobile"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[1.125rem] font-semibold py-4 border-b border-[#EDEFF2] transition-colors duration-200 hover:text-[#4a6b8c]"
              style={{ color: "#2E4659" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-sm font-semibold text-white bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
          >
            Pedir primeira conversa
          </Link>
        </nav>
      </div>
    </>
  );
}
