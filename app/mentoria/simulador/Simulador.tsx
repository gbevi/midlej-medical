"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MentoriaLeadForm } from "../_components/MentoriaLeadForm";
import { MentoriaSuccessBody } from "../_components/MentoriaSuccessBody";
import { ev } from "@/lib/analytics";
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

/** Splits "2047" → ["204","7"] so we can mask only the last digit. */
function splitYear(n: number): [string, string] {
  const s = String(n);
  if (s.length < 1) return [s, ""];
  return [s.slice(0, -1), s.slice(-1)];
}

export function Simulador() {
  const [idade, setIdade] = useState(38);
  const [patrim, setPatrim] = useState(450000);
  const [aporte, setAporte] = useState(8000);
  const [meta, setMeta] = useState(25000);
  const [unlocked, setUnlocked] = useState(false);

  // tool_use "simulator_complete" — dispara uma vez quando o lead muda
  // qualquer input padrão. Mede engajamento com a ferramenta separado da
  // conversão do form.
  const interactedRef = useRef(false);
  useEffect(() => {
    if (interactedRef.current) return;
    const changed = idade !== 38 || patrim !== 450000 || aporte !== 8000 || meta !== 25000;
    if (changed) {
      interactedRef.current = true;
      ev.toolUse("simulador", "simulator_complete");
    }
  }, [idade, patrim, aporte, meta]);
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
        <div className={`lp-sim-output${unlocked ? "" : " is-locked"}`}>
          <span className="lp-sim-output-label">Seu ano de independência</span>
          <span
            className="lp-sim-output-year"
            aria-live="polite"
            aria-atomic="true"
          >
            {unlocked ? (
              displayAno
            ) : (
              <>
                {splitYear(displayAno)[0]}
                <span className="lp-sim-year-mask" aria-hidden="true">
                  {splitYear(displayAno)[1]}
                </span>
              </>
            )}
          </span>
          <p className="lp-sim-output-sentence" aria-hidden={!unlocked}>
            você teria <span className="cs-num">{displayIdadeFinal}</span> anos.
            capital alvo <span className="cs-num">R$ {brl(displayAlvo)}</span>.
          </p>
          {!unlocked && (
            <a href="#sim-lead" className="lp-sim-output-unlock">
              <span className="lp-sim-output-unlock-mark" aria-hidden="true">§</span>
              <span>Liberar ano exato e memória do cálculo</span>
              <span aria-hidden="true">↓</span>
            </a>
          )}

          <p className="lp-sim-disclaimer lp-sim-disclaimer--mobile">
            Simulação. Considera retorno real (descontada a inflação) de 5% a.a.
            e taxa de retirada segura de 4% a.a. Não é promessa de rentabilidade.
          </p>

        </div>
      </div>

      {/* BRIDGE COMPARE — mostra o GAP (prova de que o cálculo funcionou).
          Os anos ficam borrados enquanto travado; o delta fica sempre visível. */}
      <div
        className={`lp-sim-compare${unlocked ? "" : " is-locked"}`}
        aria-live="polite"
      >
        <div className="lp-sim-compare-grid">
          <div className="lp-sim-compare-col">
            <span className="lp-sim-compare-label">Alocação eficiente</span>
            <span className="lp-sim-compare-year">
              {unlocked ? (
                displayAno
              ) : (
                <>
                  {splitYear(displayAno)[0]}
                  <span className="lp-sim-year-mask" aria-hidden="true">
                    {splitYear(displayAno)[1]}
                  </span>
                </>
              )}
            </span>
          </div>
          <span className="lp-sim-compare-delta">
            +{deltaAnos} {deltaAnos === 1 ? "ano" : "anos"}
          </span>
          <div className="lp-sim-compare-col">
            <span className="lp-sim-compare-label">Alocação ineficiente</span>
            <span className="lp-sim-compare-year lp-sim-compare-year--muted">
              {unlocked ? (
                displayAnoIneficiente
              ) : (
                <>
                  {splitYear(displayAnoIneficiente)[0]}
                  <span className="lp-sim-year-mask" aria-hidden="true">
                    {splitYear(displayAnoIneficiente)[1]}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
        {!unlocked && (
          <p className="lp-sim-compare-hint">
            Alocação ineficiente adiciona{" "}
            <span className="cs-num">
              {deltaAnos} {deltaAnos === 1 ? "ano" : "anos"}
            </span>{" "}
            à sua data de independência. O ano exato vai pelo WhatsApp.
          </p>
        )}
      </div>

      <div className="lp-sim-lead-panel" id="sim-lead">
        <p className="lp-sim-lead-prompt">
          {unlocked
            ? "Memória completa a caminho do seu WhatsApp."
            : "Receba o ano exato + a memória completa do cálculo no WhatsApp."}
        </p>
        <MentoriaLeadForm
          idPrefix="sim"
          submitLabel="Liberar resultado e receber memória"
          successTitle="Liberado."
          successBody={
            <MentoriaSuccessBody
              downloadHref="/guias/memoria-calculo.pdf"
              downloadLabel="Baixar a memória do cálculo"
            />
          }
          onSuccess={() => setUnlocked(true)}
        />
      </div>
    </>
  );
}
