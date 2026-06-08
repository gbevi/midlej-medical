/**
 * Corpo padrão da tela de sucesso pós-submit em todas as LPs de mentoria.
 *
 * Padrão visual e tom unificados (per request do analista — "pós-submit
 * unificado, todos desembocam no fluxo de diagnóstico").
 *
 * - LPs com material instantâneo (ebook/simulador/planilha): passam
 *   `downloadHref` + `downloadLabel`. Lead recebe na hora.
 * - LPs sem material instantâneo (raio-x/alternativos): omitem o
 *   download e mostram só a copy de espera + a bridge pra mentoria.
 */

type Props = {
  /** Caminho do material (PDF/XLSX). Omitir quando não há download. */
  downloadHref?: string;
  /** Rótulo do botão de download. */
  downloadLabel?: string;
  /** Mensagem secundária. Default: copy padrão de bridge. */
  followup?: React.ReactNode;
};

const DEFAULT_FOLLOWUP = (
  <>
    Também enviamos uma cópia pelo WhatsApp informado, junto com um convite
    pra conversar sobre o diagnóstico.
  </>
);

export function MentoriaSuccessBody({
  downloadHref,
  downloadLabel,
  followup = DEFAULT_FOLLOWUP,
}: Props) {
  return (
    <>
      {downloadHref && downloadLabel && (
        <a href={downloadHref} download className="lp-ebook-download-cta">
          <span aria-hidden="true">§</span>
          {downloadLabel}
          <span aria-hidden="true">↓</span>
        </a>
      )}
      <span className="lp-ebook-download-sub">{followup}</span>
    </>
  );
}
