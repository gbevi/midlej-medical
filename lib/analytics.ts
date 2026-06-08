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
 *
 * Todos os eventos enriquecem o payload com os parâmetros UTM correntes
 * (lidos da URL e persistidos no sessionStorage). Isso permite que o
 * Google Ads / GA4 conectem o lead à campanha mesmo quando o usuário
 * navega por várias páginas antes de converter.
 */
export const ev = {
  leadSubmit: (lp: string, extra: Record<string, unknown> = {}) =>
    pushEvent("lead_submit", { lp, surface: lpToSurface(lp), ...readUtms(), ...extra }),

  leadSuccess: (lp: string, extra: Record<string, unknown> = {}) =>
    pushEvent("lead_success", { lp, surface: lpToSurface(lp), ...readUtms(), ...extra }),

  /**
   * Evento de conversão de funil. Dispara JUNTO com leadSuccess mas em
   * um nome distinto pra GTM mapear cada LP em uma tag de conversão
   * separada do Google Ads (lp_conversion_ebook, lp_conversion_raiox, ...).
   */
  conversion: (lp: string, extra: Record<string, unknown> = {}) =>
    pushEvent(`lp_conversion_${lp}`, { lp, surface: lpToSurface(lp), ...readUtms(), ...extra }),

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

/* ─────────────────────────────────────────────────────────
   UTM capture & persistence
   ───────────────────────────────────────────────────────── */

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

const STORAGE_KEY = "midlej:utms";

/**
 * Captura UTMs/click IDs da URL e persiste em sessionStorage. Idempotente:
 * se a URL atual tiver UTM, sobrescreve; senão, mantém o último capturado.
 * Chamar uma vez por LP no client-side (ver MentoriaUtmCapture).
 */
export function captureUtms(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) found[k] = v;
  }
  if (Object.keys(found).length === 0) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    /* sessionStorage indisponível (modo anônimo etc) — silenciar */
  }
}

export function readUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}
