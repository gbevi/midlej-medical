import Link from "next/link";
import { MentoriaMark } from "@/app/components/MentoriaMark";

/**
 * Header institucional das 5 LPs. Lockup Midlej + sub-label MENTORIA
 * (mesmo vetor que carrega o submark PLENOMED na landing principal).
 *
 * O CTA da direita aponta, por padrão, pra um seletor de âncora na MESMA
 * página. `#abrir`, `#guia`, `#pedir`, etc. Cada LP override esses props
 * com o label e a âncora do próprio formulário.
 */
export function MentoriaHeader({
  ctaHref = "/mentoria/raio-x",
  ctaLabel = "Diagnóstico de carteira",
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <header className="cs-header">
      <div className="cs-header-inner">
        <Link href="/mentoria" className="cs-header-brand" aria-label="Midlej Capital · Mentoria">
          <MentoriaMark height={44} />
        </Link>
        <Link href={ctaHref} className="cs-header-cta">
          {ctaLabel}
          <span aria-hidden="true" className="cs-header-cta-arrow">→</span>
        </Link>
      </div>
    </header>
  );
}
