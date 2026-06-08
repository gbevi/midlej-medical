import type { Metadata } from "next";
import { MentoriaHeader } from "../_components/MentoriaHeader";
import { MentoriaFooter } from "../_components/MentoriaFooter";
import { Planilha } from "./Planilha";

export const metadata: Metadata = {
  title: "Onde mora seu dinheiro · Planilha de gastos · Midlej Capital",
  description:
    "Mapa interativo dos vazamentos do seu fluxo de caixa. Veja em 2 minutos quanto realmente sobra no fim do mês.",
};

export default function PlanilhaPage() {
  return (
    <>
      <MentoriaHeader
        ctaLabel="Abrir planilha"
        ctaHref="#abrir"
      />

      <section className="lp-planilha-hero">
        <div className="cs-container">
          <h1 style={{ marginTop: 28 }}>
            Você ganha bem.<br />
            <em>O dinheiro vai pra onde?</em>
          </h1>
          <p className="cs-lede">
            Preencha as caixas. O total se move junto.
          </p>
        </div>
      </section>

      <section className="lp-planilha-tool" id="abrir">
        <div className="cs-container">
          <Planilha />
        </div>
      </section>

      <section className="lp-planilha-bridge">
        <div className="cs-container">
          <h2 className="cs-headline">
            O que sobra deveria estar <em>trabalhando por você</em>.
          </h2>
          <a
            href="#abrir"
            className="cs-link-underline"
            style={{ marginTop: 32 }}
          >
            Abrir a planilha <span aria-hidden="true">↑</span>
          </a>
        </div>
      </section>

      <MentoriaFooter />
    </>
  );
}
