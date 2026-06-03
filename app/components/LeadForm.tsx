"use client";

import { useActionState, useEffect, useState } from "react";
import { BR_UFS, CONSENT_TEXT } from "@/lib/leadConstants";
import { submitLeadForm, type LeadFormState } from "@/lib/actions";

const initialLeadFormState: LeadFormState = { kind: "idle" };

const emptyLeadValues = {
  name: "",
  estado: "",
  whatsapp: "",
};

// Display order of fields — used to move focus to the first one with an error.
const FIELD_ORDER = ["name", "estado", "whatsapp"] as const;

/**
 * Máscara progressiva (XX) XXXXX-XXXX. Aceita 10 (fixo) ou 11 (celular)
 * dígitos. Cap em 11 — qualquer coisa além é ignorada. Backend faz strip
 * de não-dígitos antes de validar, então enviar formatado é OK.
 */
function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(
    submitLeadForm,
    initialLeadFormState,
  );

  useEffect(() => {
    if (state.kind !== "error") return;
    const fields = state.fields ?? {};
    const firstErrored = FIELD_ORDER.find((name) => fields[name]?.length);
    if (firstErrored) {
      document.getElementById(firstErrored)?.focus();
    }
  }, [state]);

  if (state.kind === "success") {
    return (
      <div role="status" aria-live="polite" className="form-success">
        <p className="form-success-numeral">I</p>
        <h3 className="form-success-title">Recebemos.</h3>
        <p className="form-success-body">
          A mesa retorna pelo WhatsApp informado em até{" "}
          <span className="num">1 dia útil</span>.
        </p>
      </div>
    );
  }

  const errors = state.kind === "error" ? state.fields ?? {} : {};
  const values =
    state.kind === "error" ? state.values ?? emptyLeadValues : emptyLeadValues;
  const generalError =
    state.kind === "error" && state.message ? state.message : null;

  const [whatsapp, setWhatsapp] = useState(() => maskWhatsapp(values.whatsapp));

  return (
    <form action={formAction} noValidate className="lead-form">
      {/* Honeypot — hidden from users and assistive tech. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hp-field"
        defaultValue=""
      />

      <div className="field">
        <label htmlFor="name" className="field-label">
          Nome completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={values.name}
          className="field-input"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name?.[0] && (
          <span id="name-error" className="field-error" role="alert">
            <ErrorTriangle />
            {errors.name[0]}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="estado" className="field-label">
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          required
          defaultValue={values.estado}
          className="field-select"
          aria-invalid={!!errors.estado}
          aria-describedby={errors.estado ? "estado-error" : undefined}
        >
          <option value="" disabled>
            Selecione seu estado
          </option>
          {BR_UFS.map((uf) => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </select>
        {errors.estado?.[0] && (
          <span id="estado-error" className="field-error" role="alert">
            <ErrorTriangle />
            {errors.estado[0]}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="whatsapp" className="field-label">
          Telefone (WhatsApp)
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          value={whatsapp}
          onChange={(e) => setWhatsapp(maskWhatsapp(e.target.value))}
          maxLength={16}
          placeholder="(11) 91234-5678"
          className="field-input"
          aria-invalid={!!errors.whatsapp}
          aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
        />
        {errors.whatsapp?.[0] && (
          <span id="whatsapp-error" className="field-error" role="alert">
            <ErrorTriangle />
            {errors.whatsapp[0]}
          </span>
        )}
      </div>

      {generalError && (
        <p role="alert" className="field-error">
          <ErrorTriangle />
          {generalError}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isPending}
      >
        {isPending ? "Enviando…" : "Pedir uma proposta"}
      </button>

      <p className="form-consent">{CONSENT_TEXT}</p>
    </form>
  );
}

function ErrorTriangle() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M7 1.5L12.5 12H1.5L7 1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7 5.5V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="10.4" r="0.7" fill="currentColor" />
    </svg>
  );
}
