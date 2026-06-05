import type { Metadata } from "next";
import { ConsultoriaHeader } from "../_components/ConsultoriaHeader";
import { ConsultoriaFooter } from "../_components/ConsultoriaFooter";
import { EbookForm } from "./EbookForm";

export const metadata: Metadata = {
  title: "5 erros que o médico PJ comete na carteira · Midlej Capital",
  description:
    "Guia em PDF gratuito, escrito pela mesa de consultoria da Midlej Capital. Para médicos que querem entender antes de mudar.",
};

const CHAPS = [
  {
    n: "01",
    title: "Achar que ‘renda fixa’ é uma classe.",
    body:
      "Tesouro IPCA, debênture incentivada, CDB de banco médio e CRA não são a mesma coisa. Carregam risco, liquidez e tributação completamente diferentes. Tratar como um bloco único é a primeira porta para a alocação ineficiente.",
  },
  {
    n: "02",
    title: "Pagar duas vezes a mesma taxa.",
    body:
      "O fundo cobra administração. O fundo dentro do fundo cobra de novo. O FIC cobra mais uma. Em três camadas, o médico que achava que pagava 0,8% paga 2,4% — sem perceber, todo mês, indefinidamente.",
  },
  {
    n: "03",
    title: "Confundir gerente com consultor.",
    body:
      "O gerente é remunerado pela distribuição. O consultor é remunerado pelo cliente. São incentivos opostos. Nenhum dos dois é vilão — mas confundir os papéis custa caro por décadas seguidas.",
  },
  {
    n: "04",
    title: "Acreditar que diversificou.",
    body:
      "Cinco fundos ‘diferentes’ podem ter os mesmos vinte ativos por baixo. A diversificação real se mede no ativo, não no produto. Quando o evento aparece, todos andam juntos — e a carteira ‘diversificada’ apanha igual a uma carteira concentrada.",
  },
  {
    n: "05",
    title: "Deixar o caixa parado em ‘conta investimento’.",
    body:
      "Render 95% do CDI quando você poderia render 105% parece pequeno. Em dez anos, com R$ 200k de caixa rolando, é R$ 50k a menos. Em vinte, é uma volta ao mundo. A diferença mora no detalhe que ninguém te mostrou.",
  },
];

export default function EbookPage() {
  return (
    <>
      <ConsultoriaHeader scope="Guia para o médico PJ" />

      <section className="lp-ebook-hero">
        <div className="cs-container">
          <div className="lp-ebook-hero-grid">
            <div>
              <span className="cs-eyebrow">Guia em PDF · gratuito</span>
              <h1 style={{ marginTop: 28 }}>
                <em>Cinco erros</em> que o médico PJ comete na carteira — e como reconhecer cada um.
              </h1>
              <p className="cs-lede">
                Escrito pela mesa de consultoria da Midlej Capital, em
                linguagem de quem fala com médico todo dia. Sem jargão de
                planilha.
              </p>
              <EbookForm />
            </div>

            <div className="lp-ebook-cover-wrap">
              <article className="lp-ebook-cover" aria-hidden="true">
                <div>
                  <span className="lp-ebook-cover-eyebrow">Midlej Capital · Consultoria</span>
                  <h2 className="lp-ebook-cover-title">
                    <em>Cinco erros</em><br />que o<br />médico PJ comete<br />na carteira.
                  </h2>
                </div>
                <div className="lp-ebook-cover-meta">
                  <span>Edição 2026</span>
                  <span className="lp-ebook-cover-stub">guia gratuito</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-ebook-chapters">
        <div className="cs-container">
          <span className="cs-eyebrow">O que tem dentro</span>
          <h2 className="cs-headline" style={{ marginTop: 28 }}>
            Cinco capítulos curtos. <em>Direto ao osso.</em>
          </h2>

          <ol className="lp-ebook-chapter-list">
            {CHAPS.map((c) => (
              <li className="lp-ebook-chapter" key={c.n}>
                <span className="lp-ebook-ch-num">{c.n}</span>
                <div>
                  <h3 className="lp-ebook-ch-title">{c.title}</h3>
                  <p className="lp-ebook-ch-body">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lp-ebook-bridge">
        <div className="cs-container">
          <span className="cs-eyebrow" style={{ color: "var(--cs-muted-ink)" }}>
            Depois do guia
          </span>
          <h2 className="cs-headline" style={{ marginTop: 28 }}>
            Se algum capítulo soou <em>familiar demais</em>, a mesa olha sua carteira.
          </h2>
          <p>
            O raio-x é gratuito também. A diferença é que sai assinado, com
            número e mecanismo. Você decide o que fazer com ele.
          </p>
          <a href="/consultoria/raio-x" className="cs-link-underline">
            Pedir o raio-x <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <ConsultoriaFooter />
    </>
  );
}
