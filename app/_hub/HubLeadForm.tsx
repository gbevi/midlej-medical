"use client";

import { useActionState, useEffect, useState } from "react";
import { BR_UFS, CONSENT_TEXT } from "@/lib/leadConstants";
import { submitLeadForm, type LeadFormState } from "@/lib/actions";

/**
 * Formulário de lead do hub Midlej Capital.
 *
 * Mesmos 3 campos do form canônico (name + estado + whatsapp) e mesma
 * server action (`submitLeadForm` → /api/pleno-med/leads). Visualmente
 * usa o sistema de marca: tipografia Bricolage via classes .t-*, inputs
 * de aresta viva, hairlines, asterisco oxblood, sem nada arredondado.
 *
 * Renderiza tanto em superfície paper quanto ink — passa `tone` pra
 * inverter os tokens de texto. Default = "light" (paper).
 */

const initial: LeadFormState = { kind: "idle" };
const emptyVals = { name: "", estado: "", whatsapp: "" };
const FIELD_ORDER = ["name", "estado", "whatsapp"] as const;

function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Props = {
  /** "dark" = sobre superfície ink; "light" = sobre paper. */
  tone?: "light" | "dark";
  submitLabel?: string;
  /** Identificação da LP de origem — aparece no email de notificação. */
  origin?: string;
};

export function HubLeadForm({
  tone = "light",
  submitLabel = "Pedir a primeira conversa",
  origin,
}: Props) {
  const [state, action, pending] = useActionState(submitLeadForm, initial);

  useEffect(() => {
    if (state.kind !== "error") return;
    const first = FIELD_ORDER.find((n) => state.fields?.[n]?.length);
    if (first) document.getElementById(`hub-${first}`)?.focus();
  }, [state]);

  const [wa, setWa] = useState("");

  if (state.kind === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={tone === "dark" ? "text-on-ink-strong" : "text-ink"}
      >
        <p className="t-mono text-[0.72rem] tracking-[0.18em] uppercase text-emphasis mb-4">
          Recebemos
        </p>
        <p className="t-display text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.1] max-w-[24ch]">
          Em até <span className="t-mono text-[0.95em]">1 dia útil</span>{" "}
          retornamos pelo WhatsApp informado.
        </p>
      </div>
    );
  }

  const errors = state.kind === "error" ? state.fields ?? {} : {};
  const values = state.kind === "error" ? state.values ?? emptyVals : emptyVals;

  const isDark = tone === "dark";
  const labelClass = isDark
    ? "t-mono text-[0.72rem] tracking-[0.14em] uppercase text-on-ink-mute"
    : "t-mono text-[0.72rem] tracking-[0.14em] uppercase text-ink-mute";
  const inputBase = isDark
    ? "border-line-on-ink bg-transparent text-on-ink-strong placeholder:text-on-ink-mute"
    : "border-line bg-paper text-ink placeholder:text-ink-mute";
  const inputClass = `w-full t-body text-[1.0625rem] py-3 border-b ${inputBase} focus:outline-none focus:border-current transition-colors duration-200`;
  const errorClass = "block mt-2 t-mono text-[0.72rem] tracking-[0.06em] uppercase text-emphasis";

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden
        autoComplete="off"
        defaultValue=""
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />
      {origin && <input type="hidden" name="origin" value={origin} />}

      <div>
        <label htmlFor="hub-name" className={labelClass}>
          Nome completo
        </label>
        <input
          id="hub-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={values.name}
          className={inputClass}
          aria-invalid={!!errors.name}
        />
        {errors.name?.[0] && <span className={errorClass}>{errors.name[0]}</span>}
      </div>

      <div>
        <label htmlFor="hub-estado" className={labelClass}>
          Estado
        </label>
        <select
          id="hub-estado"
          name="estado"
          required
          defaultValue={values.estado}
          className={`${inputClass} appearance-none`}
          aria-invalid={!!errors.estado}
        >
          <option value="" disabled>
            Selecione
          </option>
          {BR_UFS.map((uf) => (
            <option key={uf} value={uf} className="text-ink">
              {uf}
            </option>
          ))}
        </select>
        {errors.estado?.[0] && <span className={errorClass}>{errors.estado[0]}</span>}
      </div>

      <div>
        <label htmlFor="hub-whatsapp" className={labelClass}>
          Telefone (WhatsApp)
        </label>
        <input
          id="hub-whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          value={wa || maskWhatsapp(values.whatsapp)}
          onChange={(e) => setWa(maskWhatsapp(e.target.value))}
          maxLength={16}
          placeholder="(11) 91234-5678"
          className={inputClass}
          aria-invalid={!!errors.whatsapp}
        />
        {errors.whatsapp?.[0] && (
          <span className={errorClass}>{errors.whatsapp[0]}</span>
        )}
      </div>

      {state.kind === "error" && state.message && (
        <p className={errorClass}>{state.message}</p>
      )}

      <button
        type="submit"
        className={isDark ? "btn-primary-inverse mt-2 self-start" : "btn-primary mt-2 self-start"}
        disabled={pending}
      >
        {pending ? "Enviando…" : submitLabel}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
          <path
            d="M1 5h12m0 0L9 1m4 4L9 9"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
          />
        </svg>
      </button>

      <p
        className={`t-body text-[0.78rem] leading-[1.55] mt-2 max-w-[44ch] ${
          isDark ? "text-on-ink-mute" : "text-ink-mute"
        }`}
      >
        <span className="asterisk" />
        {CONSENT_TEXT}
      </p>
    </form>
  );
}
