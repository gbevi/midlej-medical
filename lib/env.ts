const BACKEND_URL = process.env.BACKEND_API_URL ?? "http://localhost:3002";
const INGEST_KEY = process.env.PLENO_MED_INGEST_KEY ?? "";

if (process.env.NODE_ENV === "production" && !INGEST_KEY) {
  console.error(
    "[env] PLENO_MED_INGEST_KEY ausente em produção — backend vai rejeitar o POST com 401",
  );
}

export const env = {
  /** Server-side only. Base URL for the Ivy/Midlej backend API. */
  BACKEND_API_URL: BACKEND_URL.replace(/\/$/, ""),
  /**
   * Shared secret enviado no header `x-pleno-med-key` em todo POST de lead.
   * Obrigatório em prod (sem ele o backend devolve 401). Em dev é opcional
   * — se vazio, o backend pula a checagem.
   */
  PLENO_MED_INGEST_KEY: INGEST_KEY,
};
