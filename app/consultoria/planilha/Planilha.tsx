"use client";

import { useActionState, useMemo, useState } from "react";
import {
  submitPlanilha,
  type ConsultoriaLeadState,
} from "@/lib/consultoriaActions";

function parseBRL(s: string): number {
  const d = s.replace(/\D/g, "");
  return d ? Number(d) : 0;
}
function fmtBRL(n: number): string {
  return n ? n.toLocaleString("pt-BR") : "";
}
function brl(n: number): string {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
}

const ROWS: Array<{
  key: string;
  label: string;
  hint?: string;
  section?: string;
  sign: 1 | -1;
}> = [
  { key: "sec-renda", section: "Entradas", label: "", sign: 1 },
  { key: "renda", label: "Renda mensal líquida (PJ + plantões)", hint: "soma de tudo que entra na conta, antes de qualquer débito", sign: 1 },
  { key: "sec-fixos", section: "Custos fixos", label: "", sign: -1 },
  { key: "moradia", label: "Moradia", hint: "aluguel, condomínio, IPTU, contas básicas", sign: -1 },
  { key: "carro", label: "Carro", hint: "parcela, seguro, manutenção, combustível", sign: -1 },
  { key: "saude", label: "Saúde, escola, plano", hint: "tudo que vence todo mês independente do que você faça", sign: -1 },
  { key: "sec-var", section: "Variáveis", label: "", sign: -1 },
  { key: "alimentacao", label: "Alimentação e mercado", sign: -1 },
  { key: "lazer", label: "Lazer, viagens, restaurantes", sign: -1 },
  { key: "outros", label: "Outros (assinaturas, presentes, imprevistos)", sign: -1 },
];

const initial: ConsultoriaLeadState = { kind: "idle" };

export function Planilha() {
  const [vals, setVals] = useState<Record<string, number>>({
    renda: 45000,
    moradia: 8000,
    carro: 3500,
    saude: 4500,
    alimentacao: 5000,
    lazer: 6000,
    outros: 4000,
  });

  const sobra = useMemo(() => {
    let s = 0;
    for (const r of ROWS) {
      if (r.section) continue;
      s += r.sign * (vals[r.key] ?? 0);
    }
    return s;
  }, [vals]);

  const renda = vals.renda ?? 0;
  const sobraPct = renda ? Math.round((sobra / renda) * 100) : 0;

  const [state, action, pending] = useActionState(submitPlanilha, initial);
  const unlocked = state.kind === "success";

  return (
    <>
      <div className="lp-planilha-ledger" role="region" aria-label="Planilha de gargalos">
        {ROWS.map((r) => {
          if (r.section) {
            return (
              <div className="lp-planilha-row lp-planilha-row-section" key={r.key}>
                <h3>{r.section}</h3>
                <span />
              </div>
            );
          }
          return (
            <div className="lp-planilha-row" key={r.key}>
              <label className="lp-planilha-label" htmlFor={`pl-${r.key}`}>
                {r.label}
                {r.hint && <span className="cs-hint">{r.hint}</span>}
              </label>
              <div className="lp-planilha-amount">
                <span className="cs-sim-prefix">R$</span>
                <input
                  id={`pl-${r.key}`}
                  type="text"
                  inputMode="numeric"
                  value={fmtBRL(vals[r.key] ?? 0)}
                  onChange={(e) =>
                    setVals((p) => ({ ...p, [r.key]: parseBRL(e.target.value) }))
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="lp-planilha-total">
        <div className="lp-planilha-total-label">
          <span className="cs-eyebrow">No fim do mês, sobra</span>
          <strong>
            {sobraPct >= 25
              ? "Margem saudável — está sobrando capital."
              : sobraPct >= 10
                ? "Margem apertada — esse dinheiro deveria estar rendendo mais."
                : sobraPct >= 0
                  ? "Quase no zero a zero. Algum gargalo está comendo o caixa."
                  : "Você está consumindo patrimônio todo mês. Há um vazamento."}
          </strong>
          <span>
            Equivale a <span className="cs-num">{sobraPct}%</span> da sua renda mensal.
          </span>
        </div>
        <span className="lp-planilha-total-amount cs-num">
          R$ {brl(sobra)}
        </span>
      </div>

      <div style={{ marginTop: 48 }}>
        {!unlocked ? (
          <form
            action={action}
            className="cs-form-panel"
            style={{ maxWidth: 560 }}
          >
            <input type="text" name="website" className="cs-hp" tabIndex={-1} aria-hidden />
            <input type="hidden" name="rendaMensal" value={renda} />
            <input type="hidden" name="fixos" value={(vals.moradia ?? 0) + (vals.carro ?? 0) + (vals.saude ?? 0)} />
            <input type="hidden" name="variaveis" value={(vals.alimentacao ?? 0) + (vals.lazer ?? 0) + (vals.outros ?? 0)} />
            <input type="hidden" name="sobra" value={sobra} />

            <span className="cs-eyebrow">Quer a planilha pronta?</span>
            <h3
              className="cs-headline"
              style={{ fontSize: "1.625rem", lineHeight: 1.15 }}
            >
              Mandamos pra você em Excel, com fórmulas abertas.
            </h3>

            <div className="cs-field">
              <label htmlFor="pl-name" className="cs-field-label">Nome</label>
              <input
                id="pl-name"
                name="name"
                className="cs-input"
                autoComplete="given-name"
                required
              />
            </div>
            <div className="cs-field">
              <label htmlFor="pl-email" className="cs-field-label">E-mail</label>
              <input
                id="pl-email"
                name="email"
                type="email"
                className="cs-input"
                autoComplete="email"
                required
              />
            </div>
            {state.kind === "error" && state.message && (
              <span className="cs-field-error">{state.message}</span>
            )}
            <button
              type="submit"
              className="cs-btn cs-btn-primary"
              disabled={pending}
              style={{ alignSelf: "flex-start" }}
            >
              {pending ? "Enviando…" : "Receber a planilha"}
              <span aria-hidden="true" className="cs-btn-arrow">→</span>
            </button>
          </form>
        ) : (
          <div className="cs-form-success" style={{ maxWidth: 560 }}>
            <span className="cs-form-success-mark">✓</span>
            <h3 className="cs-headline" style={{ fontSize: "1.625rem" }}>
              Foi pro seu e-mail.
            </h3>
            <p className="cs-prose">
              No e-mail tem a planilha em Excel e um resumo do seu cenário —
              quanto está saindo por categoria, e o que costuma estar
              escondido nos custos &ldquo;variáveis&rdquo;.
            </p>
            <a
              href="/consultoria/raio-x"
              className="cs-link-underline"
              style={{ marginTop: 12, alignSelf: "flex-start" }}
            >
              Ver para onde os R$ {brl(sobra)} deveriam estar indo{" "}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
