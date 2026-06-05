"use client";

/**
 * Helper para disparar eventos custom no GTM dataLayer.
 *
 * Uso:
 *   pushEvent("lead_submit", { lp: "raio-x", form: "lead" });
 *   pushEvent("simulator_unlock", { lp: "simulador", year: 2048 });
 *
 * Convenções:
 *   - `event` é o nome do trigger custom no GTM (snake_case).
 *   - Sempre incluir `lp` indicando qual LP originou o evento (raio-x,
 *     ebook, simulador, planilha, alternativos, plenomed).
 *   - Sempre incluir `surface` (mentoria | plenomed) pra facilitar
 *     segmentação nos relatórios GA4 quando o subdomínio mudar.
 */

type DataLayerWindow = Window & { dataLayer?: Array<Record<string, unknown>> };

export function pushEvent(
  event: string,
  payload: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...payload });
}

/**
 * Atalhos de eventos canônicos do funil — use estes em vez de strings
 * livres pra evitar typos que viram eventos órfãos no GA4.
 */
export const ev = {
  leadSubmit: (lp: string, extra: Record<string, unknown> = {}) =>
    pushEvent("lead_submit", { lp, surface: lpToSurface(lp), ...extra }),

  leadSuccess: (lp: string, extra: Record<string, unknown> = {}) =>
    pushEvent("lead_success", { lp, surface: lpToSurface(lp), ...extra }),

  toolUse: (lp: string, action: string, extra: Record<string, unknown> = {}) =>
    pushEvent("tool_use", { lp, surface: lpToSurface(lp), action, ...extra }),

  ctaClick: (lp: string, target: string) =>
    pushEvent("cta_click", { lp, surface: lpToSurface(lp), target }),

  whatsappClick: (lp: string) =>
    pushEvent("whatsapp_click", { lp, surface: lpToSurface(lp) }),
};

function lpToSurface(lp: string): "mentoria" | "plenomed" {
  return lp === "plenomed" ? "plenomed" : "mentoria";
}
