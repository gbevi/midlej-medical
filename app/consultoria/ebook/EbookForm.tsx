"use client";

import { useActionState, useEffect } from "react";
import {
  submitEbook,
  type ConsultoriaLeadState,
} from "@/lib/consultoriaActions";

const initial: ConsultoriaLeadState = { kind: "idle" };
const FIELD_ORDER = ["name", "email"] as const;

export function EbookForm() {
  const [state, action, pending] = useActionState(submitEbook, initial);

  useEffect(() => {
    if (state.kind !== "error") return;
    const first = FIELD_ORDER.find((n) => state.fields?.[n]?.length);
    if (first) document.getElementById(`ebook-${first}`)?.focus();
  }, [state]);

  if (state.kind === "success") {
    return (
      <div className="cs-form-success" role="status" aria-live="polite">
        <span className="cs-form-success-mark">✓</span>
        <h3 className="cs-headline" style={{ fontSize: "1.625rem" }}>
          Pronto. O guia foi para o seu e-mail.
        </h3>
        <p className="cs-prose">
          Levou menos de <span className="cs-num">30 segundos</span>. Se não
          aparecer em 5 minutos, dá uma olhada na caixa de promoções. Boa
          leitura — não tem pressa.
        </p>
        <a
          href="/consultoria/raio-x"
          className="cs-link-underline"
          style={{ marginTop: 12, alignSelf: "flex-start" }}
        >
          Já quero olhar minha carteira <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  const errors = state.kind === "error" ? state.fields ?? {} : {};
  const values = state.kind === "error" ? state.values ?? {} : {};

  return (
    <form action={action} noValidate className="lp-ebook-form">
      <input type="text" name="website" className="cs-hp" tabIndex={-1} aria-hidden />
      <div className="lp-ebook-form-row">
        <div className="cs-field">
          <label htmlFor="ebook-name" className="cs-field-label">
            Primeiro nome
          </label>
          <input
            id="ebook-name"
            name="name"
            className="cs-input"
            autoComplete="given-name"
            defaultValue={values.name ?? ""}
            aria-invalid={!!errors.name}
          />
          {errors.name?.[0] && <span className="cs-field-error">{errors.name[0]}</span>}
        </div>
        <div className="cs-field">
          <label htmlFor="ebook-email" className="cs-field-label">
            E-mail
          </label>
          <input
            id="ebook-email"
            name="email"
            type="email"
            className="cs-input"
            autoComplete="email"
            defaultValue={values.email ?? ""}
            aria-invalid={!!errors.email}
          />
          {errors.email?.[0] && <span className="cs-field-error">{errors.email[0]}</span>}
        </div>
      </div>
      <button
        type="submit"
        className="cs-btn cs-btn-primary"
        disabled={pending}
        style={{ alignSelf: "flex-start" }}
      >
        {pending ? "Enviando…" : "Receber o guia"}
        <span aria-hidden="true" className="cs-btn-arrow">→</span>
      </button>
      <p className="cs-form-consent">
        PDF de <span className="cs-num">32</span> páginas, direto no seu e-mail.
        Sem ligação fria. Cancela a qualquer momento com um clique.
      </p>
    </form>
  );
}
