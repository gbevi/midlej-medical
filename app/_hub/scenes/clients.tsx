"use client";

import dynamic from "next/dynamic";

/**
 * Client wrappers para as cenas three.js do hub.
 *
 * Next 16 não aceita `next/dynamic({ ssr: false })` em Server Components.
 * Esta camada client carrega cada cena pesada com SSR desativado e
 * loading transparente; a page.tsx (server) só importa estas.
 */

export const GlobeClient = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => null,
});

export const AltLayersClient = dynamic(() => import("./AltLayers"), {
  ssr: false,
  loading: () => null,
});

export const PrevidenciaStackClient = dynamic(() => import("./PrevidenciaStack"), {
  ssr: false,
  loading: () => null,
});

export const WorkshopRoomClient = dynamic(() => import("./WorkshopRoom"), {
  ssr: false,
  loading: () => null,
});
