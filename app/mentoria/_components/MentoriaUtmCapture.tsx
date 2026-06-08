"use client";

import { useEffect } from "react";
import { captureUtms } from "@/lib/analytics";

/**
 * Componente "fantasma" — captura UTMs/click IDs da URL e persiste em
 * sessionStorage assim que a LP monta. Renderiza null.
 *
 * Por que client-side e não server: a URL com UTM costuma ter parâmetros
 * que mudam a cada clique de anúncio (gclid, fbclid). Capturar no client
 * evita SSR cache misses e mantém o componente da página estático.
 */
export function MentoriaUtmCapture() {
  useEffect(() => {
    captureUtms();
  }, []);
  return null;
}
