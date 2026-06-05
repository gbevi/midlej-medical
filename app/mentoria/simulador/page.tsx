import type { Metadata } from "next";
import { MentoriaHeader } from "../_components/MentoriaHeader";
import { MentoriaFooter } from "../_components/MentoriaFooter";
import { Simulador } from "./Simulador";

export const metadata: Metadata = {
  title: "Simulador de independência financeira · Midlej Capital",
  description:
    "Em que ano o médico para de depender do plantão. Simulador interativo Midlej Capital.",
};

export default function SimuladorPage() {
  return (
    <>
      <MentoriaHeader
        ctaLabel="Abrir simulador"
        ctaHref="#abrir"
      />

      <section className="lp-sim-hero">
        <div className="cs-container">
          <h1 style={{ marginTop: 28 }}>
            Em que ano você <em>para de depender</em> do plantão.
          </h1>
          <p className="cs-lede">
            Quatro números seus, um cálculo honesto. Sem promessa de
            rentabilidade. Só matemática.
          </p>
        </div>
      </section>

      <section className="lp-sim-tool" id="abrir">
        <div className="cs-container">
          <Simulador />
        </div>
      </section>

      <section className="lp-sim-capture">
        <div className="cs-container">
          <div className="lp-sim-capture-grid">
            <div>
              <h2 className="cs-headline">
                O número assusta? <em>Não devia.</em>
              </h2>
            </div>
            <div>
              <p className="cs-prose">
                Uma alocação ineficiente empurra essa data uma década adiante.
                Uma alocação ajustada à sua escala antecipa, sem você ter que
                aportar mais.
              </p>
              <a
                href="#abrir"
                className="cs-link-underline"
                style={{ marginTop: 24, display: "inline-flex" }}
              >
                Voltar ao simulador <span aria-hidden="true">↑</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <MentoriaFooter />
    </>
  );
}
