"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MentoriaLeadForm } from "../_components/MentoriaLeadForm";
import { anoIndependencia } from "./simMath";

function brl(n: number) {
  if (!Number.isFinite(n)) return "-";
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

const APORTE_PRESETS = [5000, 10000, 20000, 50000];

function formatPreset(n: number): string {
  return `${n / 1000}k`;
}

export function Simulador() {
  const [idade, setIdade] = useState(38);
  const [patrim, setPatrim] = useState(450000);
  const [aporte, setAporte] = useState(8000);
  const [meta, setMeta] = useState(25000);
  const calc = useMemo(
    () => anoIndependencia({ idade, patrimonio: patrim, aporte, metaMensal: meta }),
    [idade, patrim, aporte, meta],
  );

  const calcIneficiente = useMemo(
    () =>
      anoIndependencia({
        idade,
        patrimonio: patrim,
        aporte,
        metaMensal: meta,
        retornoRealAA: 0.025,
      }),
    [idade, patrim, aporte, meta],
  );

  // ── Tween of displayed numbers ─────────────────────────────────────
  const [displayAno, setDisplayAno] = useState(calc.ano);
  const [displayIdadeFinal, setDisplayIdadeFinal] = useState(calc.idadeFinal);
  const [displayAlvo, setDisplayAlvo] = useState(calc.alvo);
  const [displayAnoIneficiente, setDisplayAnoIneficiente] = useState(
    calcIneficiente.ano,
  );

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fromAno = displayAno;
    const fromIdade = displayIdadeFinal;
    const fromAlvo = displayAlvo;
    const fromAnoInef = displayAnoIneficiente;

    const toAno = calc.ano;
    const toIdade = calc.idadeFinal;
    const toAlvo = calc.alvo;
    const toAnoInef = calcIneficiente.ano;

    if (reduced) {
      rafRef.current = requestAnimationFrame(() => {
        setDisplayAno(toAno);
        setDisplayIdadeFinal(toIdade);
        setDisplayAlvo(toAlvo);
        setDisplayAnoIneficiente(toAnoInef);
        rafRef.current = null;
      });
      return () => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    }

    const duration = 380;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease-out-expo (1 - (1-p)^4)
      const e = 1 - Math.pow(1 - p, 4);
      setDisplayAno(Math.round(fromAno + (toAno - fromAno) * e));
      setDisplayIdadeFinal(Math.round(fromIdade + (toIdade - fromIdade) * e));
      setDisplayAlvo(Math.round(fromAlvo + (toAlvo - fromAlvo) * e));
      setDisplayAnoIneficiente(
        Math.round(fromAnoInef + (toAnoInef - fromAnoInef) * e),
      );
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc.ano, calc.idadeFinal, calc.alvo, calcIneficiente.ano]);

  const idadePct = ((idade - 25) / 40) * 100;
  const deltaAnos = calcIneficiente.ano - calc.ano;

  return (
    <>
      <div className="lp-sim-tool-card">
        {/* INPUTS */}
        <div className="lp-sim-inputs">
          <div className="cs-field">
            <label className="cs-field-label" htmlFor="lp-sim-idade">
              Sua idade hoje
            </label>
            <div
              className="lp-sim-slider-row"
              style={{ ["--pct" as string]: `${idadePct}%` }}
            >
              <input
                id="lp-sim-idade"
                type="range"
                min={25}
                max={65}
                step={1}
                value={idade}
                onChange={(e) => setIdade(Number(e.target.value))}
                aria-label="Idade"
                aria-valuetext={`${idade} anos`}
              />
              <div className="lp-sim-slider-scale" aria-hidden="true">
                <span>25</span>
                <span>65</span>
              </div>
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
            <div className="lp-sim-preset-row" role="group" aria-label="Aporte sugerido">
              {APORTE_PRESETS.map((v) => (
                <button
                  key={v}
                  type="button"
                  className="lp-sim-preset-chip"
                  aria-pressed={aporte === v}
                  onClick={() => setAporte(v)}
                >
                  {formatPreset(v)}
                </button>
              ))}
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

          <p className="lp-sim-disclaimer lp-sim-disclaimer--desktop">
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
            aria-atomic="true"
          >
            {displayAno}
          </span>
          <p className="lp-sim-output-sentence">
            você teria <span className="cs-num">{displayIdadeFinal}</span> anos.
            capital alvo <span className="cs-num">R$ {brl(displayAlvo)}</span>.
          </p>

          <p className="lp-sim-disclaimer lp-sim-disclaimer--mobile">
            Simulação. Considera retorno real (descontada a inflação) de 5% a.a.
            e taxa de retirada segura de 4% a.a. Não é promessa de rentabilidade.
          </p>

        </div>
      </div>

      {/* BRIDGE COMPARE. Visible always (post-unlock highlights the delta) */}
      <div className="lp-sim-compare" aria-live="polite">
        <div className="lp-sim-compare-grid">
          <div className="lp-sim-compare-col">
            <span className="lp-sim-compare-label">Alocação eficiente</span>
            <span className="lp-sim-compare-year">{displayAno}</span>
          </div>
          <span className="lp-sim-compare-delta">
            +{deltaAnos} {deltaAnos === 1 ? "ano" : "anos"}
          </span>
          <div className="lp-sim-compare-col">
            <span className="lp-sim-compare-label">Alocação ineficiente</span>
            <span className="lp-sim-compare-year lp-sim-compare-year--muted">
              {displayAnoIneficiente}
            </span>
          </div>
        </div>
      </div>

      <div className="lp-sim-lead-panel">
        <p className="lp-sim-lead-prompt">
          Quer receber o cálculo no WhatsApp, com a memória completa?
        </p>
        <MentoriaLeadForm
          idPrefix="sim"
          submitLabel="Receber o cálculo"
          successTitle="Pronto."
          successBody="Em breve mandamos a memória do cálculo pelo WhatsApp informado."
        />
      </div>
    </>
  );
}
