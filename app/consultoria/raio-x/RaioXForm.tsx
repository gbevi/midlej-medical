"use client";

import { useActionState, useEffect, useState } from "react";
import {
  submitRaioX,
  type ConsultoriaLeadState,
} from "@/lib/consultoriaActions";

const initial: ConsultoriaLeadState = { kind: "idle" };

function maskWhatsapp(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const FIELD_ORDER = ["name", "whatsapp", "especialidade"] as const;

export function RaioXForm() {
  const [state, action, pending] = useActionState(submitRaioX, initial);
  const [wa, setWa] = useState("");

  useEffect(() => {
    if (state.kind !== "error") return;
    const first = FIELD_ORDER.find((n) => state.fields?.[n]?.length);
    if (first) document.getElementById(`raiox-${first}`)?.focus();
  }, [state]);

  if (state.kind === "success") {
    return (
      <div className="cs-form-success" role="status" aria-live="polite">
        <span className="cs-form-success-mark">I</span>
        <h3 className="cs-headline" style={{ fontSize: "1.75rem" }}>
          Recebemos.
        </h3>
        <p className="cs-prose">
          A mesa retorna pelo WhatsApp informado em até{" "}
          <span className="cs-num">1 dia útil</span>. Você não vai receber
          ligação fria nem proposta antes do raio-x.
        </p>
      </div>
    );
  }

  const errors = state.kind === "error" ? state.fields ?? {} : {};
  const values = state.kind === "error" ? state.values ?? {} : {};

  return (
    <form action={action} noValidate className="cs-form-panel">
      <input type="text" name="website" className="cs-hp" tabIndex={-1} aria-hidden />

      <div className="cs-field">
        <label htmlFor="raiox-name" className="cs-field-label">
          Nome completo
        </label>
        <input
          id="raiox-name"
          name="name"
          className="cs-input"
          autoComplete="name"
          defaultValue={values.name ?? ""}
          aria-invalid={!!errors.name}
        />
        {errors.name?.[0] && <span className="cs-field-error">{errors.name[0]}</span>}
      </div>

      <div className="cs-field">
        <label htmlFor="raiox-whatsapp" className="cs-field-label">
          WhatsApp
        </label>
        <input
          id="raiox-whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          className="cs-input"
          value={wa || (values.whatsapp ?? "")}
          onChange={(e) => setWa(maskWhatsapp(e.target.value))}
          maxLength={16}
          placeholder="(11) 91234-5678"
          aria-invalid={!!errors.whatsapp}
        />
        {errors.whatsapp?.[0] && (
          <span className="cs-field-error">{errors.whatsapp[0]}</span>
        )}
      </div>

      <div className="cs-field">
        <label htmlFor="raiox-especialidade" className="cs-field-label">
          Especialidade
        </label>
        <input
          id="raiox-especialidade"
          name="especialidade"
          className="cs-input"
          placeholder="Cardiologia, anestesiologia, …"
          defaultValue={values.especialidade ?? ""}
          aria-invalid={!!errors.especialidade}
        />
        {errors.especialidade?.[0] && (
          <span className="cs-field-error">{errors.especialidade[0]}</span>
        )}
      </div>

      <div className="cs-field">
        <label htmlFor="raiox-patrim" className="cs-field-label">
          Patrimônio investido (opcional)
        </label>
        <select
          id="raiox-patrim"
          name="patrimonioFaixa"
          className="cs-select"
          defaultValue={values.patrimonioFaixa ?? ""}
        >
          <option value="">Prefiro não dizer</option>
          <option value="ate-100">Até R$ 100k</option>
          <option value="100-300">R$ 100k – 300k</option>
          <option value="300-700">R$ 300k – 700k</option>
          <option value="700-1500">R$ 700k – 1,5M</option>
          <option value="1500+">Acima de R$ 1,5M</option>
        </select>
      </div>

      {state.kind === "error" && state.message && (
        <p className="cs-field-error">{state.message}</p>
      )}

      <button
        type="submit"
        className="cs-btn cs-btn-primary"
        disabled={pending}
        style={{ marginTop: 4 }}
      >
        {pending ? "Enviando…" : "Quero meu raio-x"}
        <span aria-hidden="true" className="cs-btn-arrow">→</span>
      </button>

      <p className="cs-form-consent">
        Ao enviar, você concorda em ser contatado pela mesa de consultoria da
        Midlej Capital exclusivamente sobre esta análise. Sem custo e sem
        compromisso. <a href="#" style={{ borderBottom: "1px solid var(--cs-clay)" }}>Privacidade</a>.
      </p>
    </form>
  );
}
