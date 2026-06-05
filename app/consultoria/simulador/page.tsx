import type { Metadata } from "next";
import { ConsultoriaHeader } from "../_components/ConsultoriaHeader";
import { ConsultoriaFooter } from "../_components/ConsultoriaFooter";
import { Simulador } from "./Simulador";

export const metadata: Metadata = {
  title: "Simulador de independência financeira · Midlej Capital",
  description:
    "Em que ano o médico para de depender do plantão. Simulador interativo da mesa Midlej Capital.",
};

export default function SimuladorPage() {
  return (
    <>
      <ConsultoriaHeader scope="Simulador de independência" />

      <section className="lp-sim-hero">
        <div className="cs-container">
          <span className="cs-eyebrow">Ferramenta interativa · médicos</span>
          <h1 style={{ marginTop: 28 }}>
            Em que ano você <em>para de depender</em> do plantão.
          </h1>
          <p className="cs-lede">
            Quatro números seus, um cálculo honesto. Sem promessa de
            rentabilidade — só matemática.
          </p>
        </div>
      </section>

      <section className="lp-sim-tool">
        <div className="cs-container">
          <span className="cs-eyebrow">A conta</span>
          <h2 className="cs-headline" style={{ marginTop: 28 }}>
            Mexa nos sliders. <em>O ano se mexe junto.</em>
          </h2>
          <Simulador />
        </div>
      </section>

      <section className="lp-sim-capture">
        <div className="cs-container">
          <div className="lp-sim-capture-grid">
            <div>
              <span className="cs-eyebrow">Depois do número</span>
              <h2 className="cs-headline" style={{ marginTop: 28 }}>
                O número assusta? <em>Não devia.</em>
              </h2>
            </div>
            <div>
              <p className="cs-prose">
                O simulador usa o retorno real médio histórico para uma alocação
                equilibrada. Uma alocação mal feita corta esse retorno em metade
                — e empurra o ano da independência uma década adiante. O
                contrário também vale: uma alocação eficiente, ajustada para a
                sua escala, antecipa essa data sem você ter que aportar mais.
              </p>
              <a
                href="/consultoria/raio-x"
                className="cs-link-underline"
                style={{ marginTop: 24, display: "inline-flex" }}
              >
                Ver como uma alocação eficiente muda esse ano
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ConsultoriaFooter />
    </>
  );
}
