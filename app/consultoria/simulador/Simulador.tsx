"use client";

import { useActionState, useMemo, useState } from "react";
import {
  submitSimulador,
  type ConsultoriaLeadState,
} from "@/lib/consultoriaActions";

/* Cálculo simplificado, em termos reais (inflação descontada).
   F(n) = F0·(1+r)^n + A·((1+r)^n - 1)/r
   Resolve para n (meses) tal que renda mensal sustentada = meta.
   Aproximação razoável; a página deixa claro que é simulação. */
function anoIndependencia({
  idade,
  patrimonio,
  aporte,
  metaMensal,
  retornoRealAA = 0.05,
}: {
  idade: number;
  patrimonio: number;
  aporte: number;
  metaMensal: number;
  retornoRealAA?: number;
}): { ano: number; idadeFinal: number; alvo: number } {
  const r = Math.pow(1 + retornoRealAA, 1 / 12) - 1;
  // Capital necessário: renda perpétua a 4% real anual ≈ renda × 25
  const alvo = metaMensal * 12 / 0.04;
  if (patrimonio >= alvo) {
    return { ano: new Date().getFullYear(), idadeFinal: idade, alvo };
  }
  // Procura o n (em meses) por busca direta — máx 60 anos
  let f = patrimonio;
  for (let n = 1; n <= 12 * 60; n++) {
    f = f * (1 + r) + aporte;
    if (f >= alvo) {
      const anos = n / 12;
      const ano = new Date().getFullYear() + Math.ceil(anos);
      const idadeFinal = Math.round(idade + anos);
      return { ano, idadeFinal, alvo };
    }
  }
  return { ano: new Date().getFullYear() + 60, idadeFinal: idade + 60, alvo };
}

function brl(n: number) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
}

function parseBRL(s: string): number {
  const digits = s.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function fmtBRL(n: number): string {
  if (!n) return "";
  return n.toLocaleString("pt-BR");
}

const initial: ConsultoriaLeadState = { kind: "idle" };

export function Simulador() {
  const [idade, setIdade] = useState(38);
  const [patrim, setPatrim] = useState(450000);
  const [aporte, setAporte] = useState(8000);
  const [meta, setMeta] = useState(25000);

  const calc = useMemo(
    () => anoIndependencia({ idade, patrimonio: patrim, aporte, metaMensal: meta }),
    [idade, patrim, aporte, meta],
  );

  const [state, action, pending] = useActionState(submitSimulador, initial);
  const unlocked = state.kind === "success";

  return (
    <div className="lp-sim-tool-card">
      {/* INPUTS */}
      <div className="lp-sim-inputs">
        <div className="cs-field">
          <label className="cs-field-label">Sua idade hoje</label>
          <div className="lp-sim-slider-row">
            <input
              type="range"
              min={25}
              max={65}
              step={1}
              value={idade}
              onChange={(e) => setIdade(Number(e.target.value))}
              aria-label="Idade"
            />
            <span className="lp-sim-slider-value">
              <span className="cs-num">{idade}</span> anos
            </span>
          </div>
        </div>

        <div className="cs-field">
          <label className="cs-field-label">Patrimônio investido hoje</label>
          <div className="lp-sim-currency">
            <span className="cs-sim-prefix">R$</span>
            <input
              type="text"
              inputMode="numeric"
              value={fmtBRL(patrim)}
              onChange={(e) => setPatrim(parseBRL(e.target.value))}
              aria-label="Patrimônio"
            />
          </div>
        </div>

        <div className="cs-field">
          <label className="cs-field-label">Aporte mensal</label>
          <div className="lp-sim-currency">
            <span className="cs-sim-prefix">R$</span>
            <input
              type="text"
              inputMode="numeric"
              value={fmtBRL(aporte)}
              onChange={(e) => setAporte(parseBRL(e.target.value))}
              aria-label="Aporte mensal"
            />
          </div>
        </div>

        <div className="cs-field">
          <label className="cs-field-label">
            Renda mensal que quer manter (em valor de hoje)
          </label>
          <div className="lp-sim-currency">
            <span className="cs-sim-prefix">R$</span>
            <input
              type="text"
              inputMode="numeric"
              value={fmtBRL(meta)}
              onChange={(e) => setMeta(parseBRL(e.target.value))}
              aria-label="Renda mensal alvo"
            />
          </div>
        </div>

        <p
          style={{
            fontSize: 12.5,
            color: "var(--cs-muted)",
            fontStyle: "italic",
            fontFamily: "var(--cs-font-display)",
            marginTop: 8,
          }}
        >
          Simulação. Considera retorno real (descontada a inflação) de 5% a.a.
          e taxa de retirada segura de 4% a.a. Não é promessa de rentabilidade.
        </p>
      </div>

      {/* OUTPUT */}
      <div className="lp-sim-output">
        <span className="lp-sim-output-label">Seu ano de independência</span>
        <span
          className="lp-sim-output-year"
          aria-live="polite"
        >
          {calc.ano}
        </span>
        <div className="lp-sim-output-detail">
          <span>
            Você teria <em>{calc.idadeFinal} anos</em> nessa data.
          </span>
          <span>
            Capital necessário: <span className="cs-num">R$ {brl(calc.alvo)}</span>.
          </span>
        </div>

        {!unlocked ? (
          <form action={action} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="text" name="website" className="cs-hp" tabIndex={-1} aria-hidden />
            <input type="hidden" name="idade" value={idade} />
            <input type="hidden" name="patrimonio" value={patrim} />
            <input type="hidden" name="aporte" value={aporte} />
            <input type="hidden" name="metaMensal" value={meta} />
            <input type="hidden" name="anoLiberdade" value={calc.ano} />

            <p
              style={{
                fontFamily: "var(--cs-font-display)",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--cs-muted-ink)",
              }}
            >
              Quer receber esse cálculo no e-mail, com a memória completa?
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              <input
                name="name"
                placeholder="Nome"
                className="cs-input"
                aria-label="Nome"
                required
                style={{ background: "var(--cs-ink-deep)", color: "var(--cs-paper)" }}
              />
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                className="cs-input"
                aria-label="E-mail"
                required
                style={{ background: "var(--cs-ink-deep)", color: "var(--cs-paper)" }}
              />
            </div>
            {state.kind === "error" && (
              <span className="cs-field-error">
                {state.message ?? "Verifique nome e e-mail."}
              </span>
            )}
            <button
              type="submit"
              className="cs-btn cs-btn-primary-on-ink"
              disabled={pending}
              style={{ alignSelf: "flex-start", marginTop: 4 }}
            >
              {pending ? "Enviando…" : "Receber o cálculo"}
              <span aria-hidden="true" className="cs-btn-arrow">→</span>
            </button>
          </form>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p
              style={{
                fontFamily: "var(--cs-font-display)",
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--cs-paper)",
              }}
            >
              Pronto. A memória do cálculo já foi para o seu e-mail.
            </p>
            <a
              href="/consultoria/raio-x"
              className="cs-btn cs-btn-primary-on-ink"
              style={{ alignSelf: "flex-start" }}
            >
              Antecipar essa data
              <span aria-hidden="true" className="cs-btn-arrow">→</span>
            </a>
          </div>
        )}

        <div className="lp-sim-output-foot">
          <span>
            Daqui a <span className="cs-num">{calc.idadeFinal - idade}</span> anos
          </span>
          <span>
            Renda de <span className="cs-num">R$ {brl(meta)}</span> /mês
          </span>
        </div>
      </div>
    </div>
  );
}
