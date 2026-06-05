"use client";

import { useActionState, useEffect, useState } from "react";
import {
  submitAlternativos,
  type ConsultoriaLeadState,
} from "@/lib/consultoriaActions";

function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const initial: ConsultoriaLeadState = { kind: "idle" };

export function AlternativosForm() {
  const [state, action, pending] = useActionState(submitAlternativos, initial);
  const [wa, setWa] = useState("");

  useEffect(() => {
    if (state.kind === "success") {
      window.scrollTo({ top: window.scrollY, behavior: "instant" });
    }
  }, [state]);

  if (state.kind === "success") {
    return (
      <div className="cs-form-success">
        <span className="cs-form-success-mark">I</span>
        <h3 className="cs-headline" style={{ fontSize: "1.625rem" }}>
          Em até <span className="cs-num">1 dia útil</span>, a mesa retorna.
        </h3>
        <p className="cs-prose">
          Vamos montar, junto com você, a versão diversificada da sua carteira
          atual. Sem custo na primeira conversa.
        </p>
      </div>
    );
  }

  const errors = state.kind === "error" ? state.fields ?? {} : {};
  const values = state.kind === "error" ? state.values ?? {} : {};

  return (
    <form action={action} className="cs-form-panel" noValidate>
      <input type="text" name="website" className="cs-hp" tabIndex={-1} aria-hidden />

      <div className="cs-field">
        <label htmlFor="alt-name" className="cs-field-label">Nome</label>
        <input
          id="alt-name"
          name="name"
          className="cs-input"
          required
          autoComplete="name"
          defaultValue={values.name ?? ""}
          aria-invalid={!!errors.name}
        />
        {errors.name?.[0] && <span className="cs-field-error">{errors.name[0]}</span>}
      </div>

      <div className="cs-field">
        <label htmlFor="alt-email" className="cs-field-label">E-mail</label>
        <input
          id="alt-email"
          name="email"
          type="email"
          className="cs-input"
          required
          autoComplete="email"
          defaultValue={values.email ?? ""}
          aria-invalid={!!errors.email}
        />
        {errors.email?.[0] && <span className="cs-field-error">{errors.email[0]}</span>}
      </div>

      <div className="cs-field">
        <label htmlFor="alt-wa" className="cs-field-label">WhatsApp (opcional)</label>
        <input
          id="alt-wa"
          name="whatsapp"
          className="cs-input"
          type="tel"
          inputMode="tel"
          placeholder="(11) 91234-5678"
          value={wa}
          onChange={(e) => setWa(maskWhatsapp(e.target.value))}
          maxLength={16}
        />
        {errors.whatsapp?.[0] && <span className="cs-field-error">{errors.whatsapp[0]}</span>}
      </div>

      <div className="cs-field">
        <label htmlFor="alt-pat" className="cs-field-label">Patrimônio investido</label>
        <select
          id="alt-pat"
          name="patrimonioFaixa"
          className="cs-select"
          defaultValue={values.patrimonioFaixa ?? ""}
        >
          <option value="">Prefiro não dizer</option>
          <option value="300-700">R$ 300k – 700k</option>
          <option value="700-1500">R$ 700k – 1,5M</option>
          <option value="1500-3000">R$ 1,5M – 3M</option>
          <option value="3000+">Acima de R$ 3M</option>
        </select>
      </div>

      <button
        type="submit"
        className="cs-btn cs-btn-primary"
        disabled={pending}
        style={{ alignSelf: "flex-start", marginTop: 8 }}
      >
        {pending ? "Enviando…" : "Quero ver minha carteira diversificada"}
        <span aria-hidden="true" className="cs-btn-arrow">→</span>
      </button>
      <p className="cs-form-consent">
        Modelo de fee recorrente, sem comissão por produto. Você decide o que
        fazer com a proposta.
      </p>
    </form>
  );
}
