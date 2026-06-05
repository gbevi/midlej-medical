import Link from "next/link";

/**
 * Header institucional das 5 LPs. Wordmark "MIDLEJ CAPITAL · CONSULTORIA"
 * — sem nav. A âncora à direita aponta sempre pro raio-x (o destino).
 */
export function ConsultoriaHeader({
  ctaHref = "/consultoria/raio-x",
  ctaLabel = "Diagnóstico de carteira",
  scope,
}: {
  ctaHref?: string;
  ctaLabel?: string;
  /** Curto rótulo da LP atual, opcional, exibido depois do divisor */
  scope?: string;
}) {
  return (
    <header className="cs-header">
      <div className="cs-header-inner">
        <Link href="/consultoria" className="cs-wordmark" aria-label="Midlej Capital · Consultoria">
          <span className="cs-wordmark-house">MIDLEJ CAPITAL</span>
          <span className="cs-wordmark-dot" aria-hidden="true">·</span>
          <span className="cs-wordmark-unit">CONSULTORIA</span>
          {scope ? (
            <>
              <span className="cs-wordmark-rule" aria-hidden="true" />
              <span className="cs-wordmark-scope">{scope}</span>
            </>
          ) : null}
        </Link>
        <Link href={ctaHref} className="cs-header-cta">
          {ctaLabel}
          <span aria-hidden="true" className="cs-header-cta-arrow">→</span>
        </Link>
      </div>
    </header>
  );
}
