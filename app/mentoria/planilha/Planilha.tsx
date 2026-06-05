"use client";

import { useMemo, useState } from "react";
import { MentoriaLeadForm } from "../_components/MentoriaLeadForm";

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
  { key: "renda", label: "Renda mensal líquida", hint: "PJ + plantões, antes de qualquer débito", sign: 1 },
  { key: "sec-fixos", section: "Custos fixos", label: "", sign: -1 },
  { key: "moradia", label: "Moradia", hint: "aluguel, condomínio, IPTU, contas", sign: -1 },
  { key: "carro", label: "Carro", hint: "parcela, seguro, manutenção, combustível", sign: -1 },
  { key: "saude", label: "Saúde, escola, plano", sign: -1 },
  { key: "sec-var", section: "Variáveis", label: "", sign: -1 },
  { key: "alimentacao", label: "Alimentação e mercado", sign: -1 },
  { key: "lazer", label: "Lazer, viagens, restaurantes", sign: -1 },
  { key: "outros", label: "Outros e imprevistos", sign: -1 },
];

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
            {ROWS.map((r) => {
              if (r.section) {
                return (
                  <tr className="lp-planilha-row-section" key={r.key}>
                    <td colSpan={2}>
                      <span className="lp-planilha-section-mark" aria-hidden="true">§</span>
                      <h3>{r.section}</h3>
                    </td>
                  </tr>
                );
              }
              return (
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
              );
            })}
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
          <span className="cs-eyebrow">Quer a planilha pronta?</span>
        </div>
        <MentoriaLeadForm
          idPrefix="pl"
          submitLabel="Receber a planilha"
          successTitle="Vai chegar pelo WhatsApp."
          successBody="A planilha em Excel + um resumo do seu cenário. Quanto está saindo por categoria, e o que costuma estar escondido nos custos variáveis."
        />
      </div>
    </div>
  );
}
