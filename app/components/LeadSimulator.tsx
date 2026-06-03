"use client";

import { useMemo, useState } from "react";

/**
 * Simulador de antecipação — mostra ao vivo quanto o médico receberia
 * hoje, dado um valor a receber e um prazo até o vencimento.
 *
 * Cálculo linear (desconto = valor × taxa × meses), porque é como a mesa
 * comunica e é mais fácil de entender que composto. Taxa fixada em 7% a.m.
 * como exemplo ilustrativo; a real sai da análise. Se mudar a taxa de
 * comunicação, é só ajustar a constante TAXA_AO_MES.
 */
const TAXA_AO_MES = 0.07;
const PRAZOS = [30, 60, 90] as const;
const VALOR_MAX = 500_000;

const fmt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const fmtNumber = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
});

function parseValor(raw: string): number {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return 0;
  return Math.min(VALOR_MAX, Number(digits));
}

export function LeadSimulator() {
  const [valor, setValor] = useState(15000);
  const [prazo, setPrazo] = useState<(typeof PRAZOS)[number]>(60);

  const recebe = useMemo(() => {
    const meses = prazo / 30;
    return Math.max(0, valor - valor * TAXA_AO_MES * meses);
  }, [valor, prazo]);

  return (
    <section className="section-simulador" aria-labelledby="sim-title">
      <div className="container">
        <h2 id="sim-title">Veja a conta na hora.</h2>
        <p className="lede">Sete por cento ao mês, sem letra miúda.</p>

        <div className="sim-grid">
          <div className="sim-inputs">
            <div className="field">
              <label htmlFor="sim-valor" className="field-label">
                Valor a receber
              </label>
              <div className="sim-currency-wrap">
                <span className="sim-currency-prefix" aria-hidden="true">
                  R$
                </span>
                <input
                  id="sim-valor"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={valor === 0 ? "" : fmtNumber.format(valor)}
                  onChange={(e) => setValor(parseValor(e.target.value))}
                  placeholder="0"
                  className="sim-currency-input"
                />
              </div>
              <span className="field-help">
                Máximo R$ {fmtNumber.format(VALOR_MAX)} nesta simulação.
              </span>
            </div>

            <div className="field">
              <span className="field-label">Prazo até o vencimento</span>
              <div className="sim-pills" role="radiogroup" aria-label="Prazo">
                {PRAZOS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={prazo === p}
                    className={`sim-pill ${
                      prazo === p ? "is-active" : ""
                    }`}
                    onClick={() => setPrazo(p)}
                  >
                    {p} dias
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sim-output" aria-live="polite">
            <p className="sim-output-label">Você recebe hoje</p>
            <p className="sim-output-value num">{fmt.format(recebe)}</p>
          </div>
        </div>

        <p className="sim-disclaimer">
          Exemplo ilustrativo. A taxa real é fechada pela mesa após análise
          dos plantões e cooperativa.
        </p>
      </div>
    </section>
  );
}
