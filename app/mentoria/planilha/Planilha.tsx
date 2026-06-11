"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MentoriaLeadForm } from "../_components/MentoriaLeadForm";
import { MentoriaSuccessBody } from "../_components/MentoriaSuccessBody";
import { ev } from "@/lib/analytics";

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
  sign: 1 | -1;
}> = [
  {
    key: "renda",
    label: "Renda mensal líquida",
    hint: "antes de qualquer débito",
    sign: 1,
  },
  {
    key: "fixos",
    label: "Custos fixos",
    hint: "moradia, carro, saúde, escola, planos",
    sign: -1,
  },
  {
    key: "variaveis",
    label: "Variáveis",
    hint: "alimentação, lazer, viagens, imprevistos",
    sign: -1,
  },
];

export function Planilha() {
  const [vals, setVals] = useState<Record<string, number>>({
    renda: 45000,
    fixos: 16000,
    variaveis: 15000,
  });

  const sobra = useMemo(() => {
    let s = 0;
    for (const r of ROWS) {
      s += r.sign * (vals[r.key] ?? 0);
    }
    return s;
  }, [vals]);

  // Dispara "tool_use simulator_complete" UMA vez por sessão, quando o
  // usuário interage com algum campo. Permite medir, junto com leadSuccess,
  // se a fricção está no simulador ou no formulário (analista pediu).
  const interactedRef = useRef(false);
  useEffect(() => {
    if (interactedRef.current) return;
    const initial = { renda: 45000, fixos: 16000, variaveis: 15000 };
    const changed =
      vals.renda !== initial.renda ||
      vals.fixos !== initial.fixos ||
      vals.variaveis !== initial.variaveis;
    if (changed) {
      interactedRef.current = true;
      ev.toolUse("planilha", "simulator_complete");
    }
  }, [vals]);

  const renda = vals.renda ?? 0;
  const sobraPct = renda ? Math.round((sobra / renda) * 100) : 0;

  const verdict =
    sobraPct >= 20
      ? "Sobra real. Está parado em algum lugar."
      : sobraPct >= 5
        ? "Sobra apertada. Há gargalo escondido."
        : "Não está sobrando. Está vazando.";

  return (
    <div className="lp-planilha-shell">
      <div className="lp-planilha-ledger" role="region" aria-label="Planilha de gargalos">
        <table>
          <thead className="cs-sr-only">
            <tr>
              <th scope="col">Categoria</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr className="lp-planilha-row" key={r.key}>
                <th scope="row" className="lp-planilha-label">
                  <label htmlFor={`pl-${r.key}`}>{r.label}</label>
                  {r.hint && <span className="cs-hint">{r.hint}</span>}
                </th>
                <td className="lp-planilha-cell-amount">
                  <div className="lp-planilha-amount">
                    <span className="cs-sim-prefix" aria-hidden="true">R$</span>
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
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="lp-planilha-total-row">
              <th scope="row" className="lp-planilha-total-foot-label">
                No fim do mês, sobra
              </th>
              <td className="lp-planilha-total-amount cs-num" aria-live="polite">
                R$ {brl(sobra)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="lp-planilha-total">
        <span className="cs-eyebrow">Comentário do auditor</span>
        <strong>{verdict}</strong>
        <span className="lp-planilha-total-meta">
          Equivale a <span className="cs-num">{sobraPct}%</span> da sua renda mensal.
        </span>
      </div>

      <div className="lp-planilha-capture">
        <div className="lp-planilha-form-copy">
          <span className="cs-eyebrow">
            Quer entender a estrutura completa dos seus gastos e receber a
            planilha pronta?
          </span>
        </div>
        <MentoriaLeadForm
          idPrefix="pl"
          origin="Mentoria — Planilha"
          submitLabel="Receber a planilha"
          successTitle="Pronto."
          successBody={
            <MentoriaSuccessBody
              downloadHref="/guias/planilha-onde-mora-seu-dinheiro.xlsx"
              downloadLabel="Baixar a planilha em Excel"
            />
          }
        />
      </div>
    </div>
  );
}
