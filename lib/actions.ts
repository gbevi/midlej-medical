"use server";

import { headers } from "next/headers";
import { LeadSchema, CONSENT_TEXT } from "./leadSchema";
import { env } from "./env";

export type LeadFormState =
  | { kind: "idle" }
  | { kind: "success" }
  | {
      kind: "error";
      message?: string;
      fields?: Partial<Record<string, string[]>>;
      values?: {
        name: string;
        estado: string;
        whatsapp: string;
      };
    };

function readValues(formData: FormData) {
  return {
    name: (formData.get("name") ?? "").toString(),
    estado: (formData.get("estado") ?? "").toString(),
    whatsapp: (formData.get("whatsapp") ?? "").toString(),
  };
}

function readOrigin(formData: FormData): string | undefined {
  const raw = (formData.get("origin") ?? "").toString().trim();
  return raw ? raw.slice(0, 120) : undefined;
}

export async function submitLeadForm(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // Honeypot: hidden field. Bots fill it; users never see it.
  const honeypot = (formData.get("website") ?? "").toString();
  if (honeypot.length > 0) {
    return { kind: "success" }; // silent accept
  }

  const values = readValues(formData);

  const parsed = LeadSchema.safeParse(values);

  if (!parsed.success) {
    return {
      kind: "error",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    };
  }

  const hdrs = await headers();

  try {
    const requestHeaders: Record<string, string> = {
      "content-type": "application/json",
      "x-forwarded-for":
        hdrs.get("x-forwarded-for") ?? hdrs.get("x-real-ip") ?? "",
      "user-agent": hdrs.get("user-agent") ?? "",
      referer: hdrs.get("referer") ?? "",
    };
    // Em prod a LP envia o shared secret; em dev (chave vazia) o header
    // é omitido e o backend pula a checagem.
    if (env.PLENO_MED_INGEST_KEY) {
      requestHeaders["x-pleno-med-key"] = env.PLENO_MED_INGEST_KEY;
    }

    const res = await fetch(`${env.BACKEND_API_URL}/api/pleno-med/leads`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({
        name: parsed.data.name,
        estado: parsed.data.estado,
        whatsapp: parsed.data.whatsapp,
        consentText: CONSENT_TEXT,
        origin: readOrigin(formData),
      }),
      cache: "no-store",
    });

    if (res.status === 201) {
      return { kind: "success" };
    }

    if (res.status === 400) {
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        fields?: Record<string, string[]>;
      };
      return {
        kind: "error",
        fields: data.fields,
        message: "Verifique os campos e tente novamente.",
        values,
      };
    }

    return {
      kind: "error",
      message: "Algo deu errado. Tente novamente em instantes.",
      values,
    };
  } catch (err) {
    console.error("[submitLeadForm] backend unreachable:", err);
    return {
      kind: "error",
      message: "Não conseguimos enviar agora. Tente novamente em instantes.",
      values,
    };
  }
}

