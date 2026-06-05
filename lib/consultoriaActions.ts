"use server";

import { headers } from "next/headers";
import { env } from "./env";

/**
 * Consultoria leads (Midlej Capital · Consultoria) — separate vertical
 * from Pleno Med. All 5 LPs funnel into the same diagnóstico, but each
 * LP carries its own `source` tag so the team can compare iscas.
 *
 * Backend wiring intentionally optional: when BACKEND_API_URL is set
 * we POST to /api/midlej/consultoria-leads; otherwise the lead is
 * logged server-side and the form returns success. Lets the marketing
 * team launch the LPs before the ingest endpoint exists.
 */
export type ConsultoriaSource =
  | "raio-x"
  | "ebook"
  | "simulador"
  | "planilha"
  | "alternativos";

export type ConsultoriaLeadState =
  | { kind: "idle" }
  | { kind: "success"; payload?: Record<string, string | number> }
  | {
      kind: "error";
      message?: string;
      fields?: Partial<Record<string, string[]>>;
      values?: Record<string, string>;
    };

function required(value: string, label: string): string | null {
  if (!value.trim()) return `${label} é obrigatório.`;
  return null;
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function digits(value: string): string {
  return value.replace(/\D/g, "");
}

function validWhatsapp(value: string): boolean {
  const d = digits(value);
  return d.length === 10 || d.length === 11;
}

async function shipLead(source: ConsultoriaSource, payload: Record<string, unknown>) {
  const hdrs = await headers();
  const meta = {
    source: `consultoria:${source}`,
    ip: hdrs.get("x-forwarded-for") ?? hdrs.get("x-real-ip") ?? "",
    ua: hdrs.get("user-agent") ?? "",
    referer: hdrs.get("referer") ?? "",
    receivedAt: new Date().toISOString(),
  };

  if (!env.BACKEND_API_URL) {
    console.log("[consultoria lead]", { ...meta, ...payload });
    return { ok: true as const };
  }

  try {
    const requestHeaders: Record<string, string> = {
      "content-type": "application/json",
      "x-forwarded-for": meta.ip,
      "user-agent": meta.ua,
      referer: meta.referer,
    };
    if (env.PLENO_MED_INGEST_KEY) {
      requestHeaders["x-pleno-med-key"] = env.PLENO_MED_INGEST_KEY;
    }

    const res = await fetch(
      `${env.BACKEND_API_URL}/api/midlej/consultoria-leads`,
      {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ ...meta, ...payload }),
        cache: "no-store",
      },
    );
    return { ok: res.status >= 200 && res.status < 300 } as const;
  } catch (err) {
    console.error("[consultoria lead] backend unreachable:", err);
    return { ok: false as const };
  }
}

/* ─────────────────────────────────────────────────────────
   LP1 · Raio-x — nome + WhatsApp + especialidade
   ───────────────────────────────────────────────────────── */
export async function submitRaioX(
  _prev: ConsultoriaLeadState,
  formData: FormData,
): Promise<ConsultoriaLeadState> {
  if ((formData.get("website") ?? "").toString()) return { kind: "success" };

  const values = {
    name: (formData.get("name") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
    especialidade: (formData.get("especialidade") ?? "").toString(),
    patrimonioFaixa: (formData.get("patrimonioFaixa") ?? "").toString(),
  };

  const fields: Record<string, string[]> = {};
  const nameErr = required(values.name, "Nome");
  if (nameErr) fields.name = [nameErr];
  if (!validWhatsapp(values.whatsapp)) fields.whatsapp = ["Informe um WhatsApp válido."];
  const espErr = required(values.especialidade, "Especialidade");
  if (espErr) fields.especialidade = [espErr];

  if (Object.keys(fields).length) {
    return { kind: "error", fields, values };
  }

  const r = await shipLead("raio-x", values);
  if (!r.ok) {
    return {
      kind: "error",
      message: "Não conseguimos enviar agora. Tente novamente em instantes.",
      values,
    };
  }
  return { kind: "success" };
}

/* ─────────────────────────────────────────────────────────
   LP2 · Ebook — nome + e-mail
   ───────────────────────────────────────────────────────── */
export async function submitEbook(
  _prev: ConsultoriaLeadState,
  formData: FormData,
): Promise<ConsultoriaLeadState> {
  if ((formData.get("website") ?? "").toString()) return { kind: "success" };

  const values = {
    name: (formData.get("name") ?? "").toString(),
    email: (formData.get("email") ?? "").toString(),
  };

  const fields: Record<string, string[]> = {};
  const nameErr = required(values.name, "Nome");
  if (nameErr) fields.name = [nameErr];
  if (!validEmail(values.email)) fields.email = ["Informe um e-mail válido."];

  if (Object.keys(fields).length) return { kind: "error", fields, values };

  const r = await shipLead("ebook", values);
  if (!r.ok) {
    return {
      kind: "error",
      message: "Não conseguimos enviar agora.",
      values,
    };
  }
  return { kind: "success" };
}

/* ─────────────────────────────────────────────────────────
   LP3 · Simulador — entrega do resultado em troca do contato
   ───────────────────────────────────────────────────────── */
export async function submitSimulador(
  _prev: ConsultoriaLeadState,
  formData: FormData,
): Promise<ConsultoriaLeadState> {
  if ((formData.get("website") ?? "").toString()) return { kind: "success" };

  const values = {
    name: (formData.get("name") ?? "").toString(),
    email: (formData.get("email") ?? "").toString(),
    idade: (formData.get("idade") ?? "").toString(),
    patrimonio: (formData.get("patrimonio") ?? "").toString(),
    aporte: (formData.get("aporte") ?? "").toString(),
    metaMensal: (formData.get("metaMensal") ?? "").toString(),
    anoLiberdade: (formData.get("anoLiberdade") ?? "").toString(),
  };

  const fields: Record<string, string[]> = {};
  if (!validEmail(values.email)) fields.email = ["Informe um e-mail válido."];
  const nameErr = required(values.name, "Nome");
  if (nameErr) fields.name = [nameErr];

  if (Object.keys(fields).length) return { kind: "error", fields, values };

  const r = await shipLead("simulador", values);
  if (!r.ok) {
    return {
      kind: "error",
      message: "Não conseguimos enviar agora.",
      values,
    };
  }
  return {
    kind: "success",
    payload: {
      anoLiberdade: Number(values.anoLiberdade) || 0,
      metaMensal: Number(values.metaMensal) || 0,
    },
  };
}

/* ─────────────────────────────────────────────────────────
   LP4 · Planilha — entrega da planilha em troca do contato
   ───────────────────────────────────────────────────────── */
export async function submitPlanilha(
  _prev: ConsultoriaLeadState,
  formData: FormData,
): Promise<ConsultoriaLeadState> {
  if ((formData.get("website") ?? "").toString()) return { kind: "success" };

  const values = {
    name: (formData.get("name") ?? "").toString(),
    email: (formData.get("email") ?? "").toString(),
    rendaMensal: (formData.get("rendaMensal") ?? "").toString(),
    fixos: (formData.get("fixos") ?? "").toString(),
    variaveis: (formData.get("variaveis") ?? "").toString(),
    sobra: (formData.get("sobra") ?? "").toString(),
  };

  const fields: Record<string, string[]> = {};
  if (!validEmail(values.email)) fields.email = ["Informe um e-mail válido."];
  const nameErr = required(values.name, "Nome");
  if (nameErr) fields.name = [nameErr];

  if (Object.keys(fields).length) return { kind: "error", fields, values };

  const r = await shipLead("planilha", values);
  if (!r.ok) {
    return {
      kind: "error",
      message: "Não conseguimos enviar agora.",
      values,
    };
  }
  return {
    kind: "success",
    payload: { sobra: Number(values.sobra) || 0 },
  };
}

/* ─────────────────────────────────────────────────────────
   LP5 · Alternativos — nome + WhatsApp (intenção média)
   ───────────────────────────────────────────────────────── */
export async function submitAlternativos(
  _prev: ConsultoriaLeadState,
  formData: FormData,
): Promise<ConsultoriaLeadState> {
  if ((formData.get("website") ?? "").toString()) return { kind: "success" };

  const values = {
    name: (formData.get("name") ?? "").toString(),
    email: (formData.get("email") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
    patrimonioFaixa: (formData.get("patrimonioFaixa") ?? "").toString(),
  };

  const fields: Record<string, string[]> = {};
  const nameErr = required(values.name, "Nome");
  if (nameErr) fields.name = [nameErr];
  if (!validEmail(values.email)) fields.email = ["Informe um e-mail válido."];
  if (values.whatsapp && !validWhatsapp(values.whatsapp)) {
    fields.whatsapp = ["WhatsApp inválido."];
  }

  if (Object.keys(fields).length) return { kind: "error", fields, values };

  const r = await shipLead("alternativos", values);
  if (!r.ok) {
    return {
      kind: "error",
      message: "Não conseguimos enviar agora.",
      values,
    };
  }
  return { kind: "success" };
}
