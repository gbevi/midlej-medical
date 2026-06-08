"use client";

import { useActionState, useEffect, useState } from "react";
import { BR_UFS, CONSENT_TEXT } from "@/lib/leadConstants";
import { submitLeadForm, type LeadFormState } from "@/lib/actions";
import { ev } from "@/lib/analytics";

/**
 * Formulário canônico das 5 LPs de mentoria.
 *
 * Mesmos 3 campos do form original Pleno Med (name + estado + whatsapp),
 * mesma server action (`submitLeadForm` → /api/pleno-med/leads). Garantia
 * de que toda lead chega ao backend no formato esperado, sem quebras.
 *
 * Cada LP customiza apenas (a) o rótulo do botão de submit e (b) a copy
 * pós-sucesso, via props.
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
  /** Texto do botão de submit (varia por LP). */
  submitLabel: string;
  /** Título da tela de sucesso (varia por LP). */
  successTitle: string;
  /** Parágrafo descritivo da tela de sucesso. */
  successBody?: React.ReactNode;
  /** id prefix para inputs, evita colisão se houver dois forms na mesma página. */
  idPrefix?: string;
  /** Callback disparado na primeira transição para sucesso. */
  onSuccess?: () => void;
};

export function MentoriaLeadForm({
  submitLabel,
  successTitle,
  successBody,
  idPrefix = "cs-lead",
  onSuccess,
}: Props) {
  const [state, action, pending] = useActionState(submitLeadForm, initial);

  useEffect(() => {
    if (state.kind === "success") {
      ev.leadSuccess(idPrefix);
      ev.conversion(idPrefix);
      onSuccess?.();
      return;
    }
    if (state.kind !== "error") return;
    const fields = state.fields ?? {};
    const first = FIELD_ORDER.find((n) => fields[n]?.length);
    if (first) document.getElementById(`${idPrefix}-${first}`)?.focus();
  }, [state, idPrefix, onSuccess]);

  const [wa, setWa] = useState("");

  if (state.kind === "success") {
    return (
      <div className="cs-form-success" role="status" aria-live="polite">
        <span className="cs-form-success-mark">✓</span>
        <h3 className="lp-cs-success-title">{successTitle}</h3>
        {successBody ? (
          <div className="cs-prose">{successBody}</div>
        ) : (
          <p className="cs-prose">
            Respondemos pelo WhatsApp informado em até{" "}
            <span className="cs-num">1 dia útil</span>.
          </p>
        )}
      </div>
    );
  }

  const errors = state.kind === "error" ? state.fields ?? {} : {};
  const values = state.kind === "error" ? state.values ?? emptyVals : emptyVals;

  return (
    <form action={action} noValidate className="cs-form-panel">
      <input
        type="text"
        name="website"
        className="cs-hp"
        tabIndex={-1}
        aria-hidden
        defaultValue=""
      />

      <div className="cs-field">
        <label htmlFor={`${idPrefix}-name`} className="cs-field-label">
          Nome completo
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={values.name}
          className="cs-input"
          aria-invalid={!!errors.name}
        />
        {errors.name?.[0] && (
          <span className="cs-field-error">{errors.name[0]}</span>
        )}
      </div>

      <div className="cs-field">
        <label htmlFor={`${idPrefix}-estado`} className="cs-field-label">
          Estado
        </label>
        <select
          id={`${idPrefix}-estado`}
          name="estado"
          required
          defaultValue={values.estado}
          className="cs-select"
          aria-invalid={!!errors.estado}
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
          <span className="cs-field-error">{errors.estado[0]}</span>
        )}
      </div>

      <div className="cs-field">
        <label htmlFor={`${idPrefix}-whatsapp`} className="cs-field-label">
          Telefone (WhatsApp)
        </label>
        <input
          id={`${idPrefix}-whatsapp`}
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          value={wa || maskWhatsapp(values.whatsapp)}
          onChange={(e) => setWa(maskWhatsapp(e.target.value))}
          maxLength={16}
          placeholder="(11) 91234-5678"
          className="cs-input"
          aria-invalid={!!errors.whatsapp}
        />
        {errors.whatsapp?.[0] && (
          <span className="cs-field-error">{errors.whatsapp[0]}</span>
        )}
      </div>

      {state.kind === "error" && state.message && (
        <p className="cs-field-error">{state.message}</p>
      )}

      <button
        type="submit"
        className="cs-btn cs-btn-primary"
        disabled={pending}
      >
        {pending ? "Enviando…" : submitLabel}
        <span aria-hidden="true" className="cs-btn-arrow">→</span>
      </button>

      <p className="cs-form-consent">{CONSENT_TEXT}</p>
    </form>
  );
}
