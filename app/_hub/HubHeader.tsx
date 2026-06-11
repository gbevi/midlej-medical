"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";

/**
 * Header fixed que muda de tom (ink ↔ paper) conforme a seção embaixo dele.
 *
 * Detecta a seção ativa percorrendo todas as `[data-tone]` em ordem de DOM e
 * mantendo a ÚLTIMA cujo top já cruzou a linha do header (probe = 64px abaixo
 * do topo da viewport). Isso é robusto em bordas de seção e em scroll rápido,
 * diferente de procurar "qual seção contém probe" (que pode falhar quando
 * probe cai exatamente na fronteira entre duas).
 *
 * Cores aplicadas via inline style com CSS vars do brand foundation — evita
 * qualquer dependência de geração de utilitários Tailwind v4 para tokens
 * compostos com opacity.
 */

type Tone = "dark" | "light";

const HEADER_HEIGHT = 64;

const STYLES: Record<
  Tone,
  {
    bg: string;
    border: string;
    textPrimary: string;
    textMuted: string;
    btnBorder: string;
    btnBorderHover: string;
  }
> = {
  dark: {
    bg: "color-mix(in oklch, var(--color-ink) 85%, transparent)",
    border: "var(--color-line-on-ink)",
    textPrimary: "var(--color-on-ink-strong)",
    textMuted: "var(--color-on-ink-soft)",
    btnBorder: "color-mix(in oklch, var(--color-on-ink-strong) 40%, transparent)",
    btnBorderHover: "var(--color-on-ink-strong)",
  },
  light: {
    bg: "color-mix(in oklch, var(--color-paper) 88%, transparent)",
    border: "var(--color-line)",
    textPrimary: "var(--color-ink)",
    textMuted: "var(--color-ink-soft)",
    btnBorder: "color-mix(in oklch, var(--color-ink) 40%, transparent)",
    btnBorderHover: "var(--color-ink)",
  },
};

export function HubHeader() {
  const [tone, setTone] = useState<Tone>("dark");

  useEffect(() => {
    const update = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-tone]");
      let activeTone: Tone = "dark";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Pega a ÚLTIMA seção cujo topo já passou da linha do header.
        if (rect.top - HEADER_HEIGHT <= 0) {
          const t = section.getAttribute("data-tone");
          if (t === "dark" || t === "light") activeTone = t;
        }
      });
      setTone(activeTone);
    };

    update();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const s = STYLES[tone];

  return (
    <header
      style={{
        backgroundColor: s.bg,
        borderBottomColor: s.border,
      }}
      className="fixed top-0 inset-x-0 z-40 backdrop-blur-md border-b transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-4 md:py-5 flex items-center justify-between gap-8">
        <Link
          href="/"
          style={{ color: s.textPrimary }}
          className="inline-flex items-center transition-colors duration-300"
          aria-label="Midlej Capital, ir ao topo"
        >
          <Logo
            tone={tone}
            subText="CAPITAL"
            className="h-14 md:h-16 w-auto"
          />
        </Link>
        <CtaPill
          href="#contato"
          color={s.textPrimary}
          border={s.btnBorder}
          borderHover={s.btnBorderHover}
        />
      </div>
    </header>
  );
}

function CtaPill({
  href,
  color,
  border,
  borderHover,
}: {
  href: string;
  color: string;
  border: string;
  borderHover: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color,
        borderColor: hover ? borderHover : border,
      }}
      className="inline-flex items-center gap-2 t-mono text-[0.72rem] tracking-[0.18em] uppercase px-4 py-2 border transition-colors duration-300"
    >
      Pedir conversa
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
        <path
          d="M1 5h12m0 0L9 1m4 4L9 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
        />
      </svg>
    </Link>
  );
}
