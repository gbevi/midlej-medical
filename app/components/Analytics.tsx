import Script from "next/script";

/**
 * Google Tag Manager — exclusivo das LPs de Mentoria.
 *
 * Escopo:
 *   - Renderizado apenas no `app/mentoria/layout.tsx`, então carrega
 *     SOMENTE em /mentoria/* (e no subdomínio education.midlejcapital.com.br
 *     quando ele apontar pra cá). A landing original Pleno Med (`/`) fica
 *     SEM analytics, conforme decisão de negócio.
 *
 * Estratégia:
 *   1. GTM (container Mentoria, GTM-XXXXXXX) carrega aqui via next/script.
 *   2. Google Analytics 4 vive DENTRO do GTM (tag de configuração GA4
 *      apontando pro Measurement ID G-XXXXXXXXXX). Não duplicar o gtag
 *      direto no código — gera double-count.
 *   3. Eventos custom são disparados via `pushEvent()` em lib/analytics.ts.
 *
 * Configuração:
 *   - .env.local (dev) ou Vercel project env (prod):
 *       NEXT_PUBLIC_MENTORIA_GTM_ID=GTM-XXXXXXX
 *
 * Performance:
 *   - `strategy="afterInteractive"` carrega depois da hidratação,
 *     bloqueando zero do First Paint.
 *   - Noscript fallback pra rastrear usuários sem JS (Meta Ads spiders,
 *     alguns leitores de tela, etc).
 */

const GTM_ID = process.env.NEXT_PUBLIC_MENTORIA_GTM_ID;

export function GoogleTagManagerHead() {
  if (!GTM_ID) return null;
  return (
    <Script
      id="gtm-init"
      strategy="afterInteractive"
      // O snippet oficial do GTM, parametrizado pelo container ID.
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }}
    />
  );
}

export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
