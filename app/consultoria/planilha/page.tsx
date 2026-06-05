import type { Metadata } from "next";
import { ConsultoriaHeader } from "../_components/ConsultoriaHeader";
import { ConsultoriaFooter } from "../_components/ConsultoriaFooter";
import { Planilha } from "./Planilha";

export const metadata: Metadata = {
  title: "Onde mora seu dinheiro · Planilha para médico PJ · Midlej Capital",
  description:
    "Mapa interativo dos vazamentos do fluxo de caixa do médico PJ. Veja em 2 minutos quanto realmente sobra no fim do mês.",
};

export default function PlanilhaPage() {
  return (
    <>
      <ConsultoriaHeader scope="Onde mora seu dinheiro" />

      <section className="lp-planilha-hero">
        <div className="cs-container">
          <span className="cs-eyebrow">Planilha interativa · médicos PJ</span>
          <h1 style={{ marginTop: 28 }}>
            Você ganha bem.<br />
            <em>O dinheiro vai pra onde?</em>
          </h1>
          <p className="cs-lede">
            Preencha as caixas abaixo. O total muda em tempo real. Em dois
            minutos você vê quanto sobra de verdade — e, mais importante,
            quanto deveria estar sobrando.
          </p>
        </div>
      </section>

      <section className="lp-planilha-tool">
        <div className="cs-container">
          <span className="cs-eyebrow">A planilha</span>
          <h2 className="cs-headline" style={{ marginTop: 28 }}>
            Sete linhas. Um resultado <em>desconfortável</em> — quase sempre.
          </h2>
          <Planilha />
        </div>
      </section>

      <section className="lp-planilha-bridge">
        <div className="cs-container">
          <span className="cs-eyebrow">Depois do número</span>
          <h2 className="cs-headline" style={{ marginTop: 28 }}>
            O que sobra deveria estar <em>trabalhando por você</em>.
          </h2>
          <p
            className="cs-prose"
            style={{ marginTop: 24, maxWidth: "52ch" }}
          >
            A maior parte dos médicos que abrem essa planilha descobre que tem
            sobra — só que a sobra dorme em conta corrente, em poupança, ou em
            um CDB de bancão a 95% do CDI. Cada um desses tem nome próprio. E
            cada um tem alternativa. O raio-x mostra qual.
          </p>
          <a
            href="/consultoria/raio-x"
            className="cs-link-underline"
            style={{ marginTop: 32 }}
          >
            Pedir o raio-x da minha carteira <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <ConsultoriaFooter />
    </>
  );
}
