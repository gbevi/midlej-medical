"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 bg-white transition-all duration-300"
      style={{
        boxShadow: scrolled ? "0 2px 20px rgba(74,107,140,0.10)" : "none",
        borderBottom: scrolled ? "none" : "1px solid #EDEFF2",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between gap-8">
        <Link href="/" aria-label="Midlej Capital, ir ao topo" className="inline-flex items-center gap-3">
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

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Soluções", href: "#solucoes" },
            { label: "Mentoria", href: "#mentoria" },
            { label: "Investimentos", href: "/investimentos" },
            { label: "Contato", href: "#contato" },
          ].map((item) => (
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

        <Link
          href="#contato"
          style={{ color: "#ffffff" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#4a6b8c] hover:bg-[#2E4659] transition-colors duration-200"
        >
          Pedir conversa
        </Link>
      </div>
    </header>
  );
}
