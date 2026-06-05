import type { Metadata } from "next";
import { MentoriaHeader } from "../_components/MentoriaHeader";
import { MentoriaFooter } from "../_components/MentoriaFooter";
import { MentoriaLeadForm } from "../_components/MentoriaLeadForm";
import { EbookCover } from "./EbookCover";

export const metadata: Metadata = {
  title: "5 erros que o médico PJ comete na carteira · Midlej Capital",
  description:
    "Guia em PDF gratuito da Midlej Capital Mentoria. Para médicos que querem entender antes de mudar.",
};

const CHAPS = [
  {
    n: "01",
    page: "p. 04",
    title: "Achar que ‘renda fixa’ é uma classe.",
    body:
      "Tesouro IPCA, debênture incentivada, CDB de banco médio e CRA não são a mesma coisa. Carregam risco, liquidez e tributação completamente diferentes. Tratar como um bloco único é a primeira porta para a alocação ineficiente.",
  },
  {
    n: "02",
    page: "p. 09",
    title: "Pagar duas vezes a mesma taxa.",
    body:
      "O fundo cobra administração. O fundo dentro do fundo cobra de novo. O FIC cobra mais uma. Em três camadas, o médico que achava que pagava 0,8% paga 2,4%. Sem perceber, todo mês, indefinidamente.",
  },
  {
    n: "03",
    page: "p. 14",
    title: "Confundir gerente com consultor.",
    body:
      "O gerente é remunerado pela distribuição. O consultor é remunerado pelo cliente. São incentivos opostos. Nenhum dos dois é vilão. Mas confundir os papéis custa caro por décadas seguidas.",
  },
  {
    n: "04",
    page: "p. 19",
    title: "Acreditar que diversificou.",
    body:
      "Cinco fundos ‘diferentes’ podem ter os mesmos vinte ativos por baixo. A diversificação real se mede no ativo, não no produto. Quando o evento aparece, todos andam juntos. E a carteira ‘diversificada’ apanha igual a uma carteira concentrada.",
  },
  {
    n: "05",
    page: "p. 24",
    title: "Deixar o caixa parado em ‘conta investimento’.",
    body:
      "Render 95% do CDI quando você poderia render 105% parece pequeno. Em dez anos, com R$ 200k de caixa rolando, é R$ 50k a menos. Em vinte, é uma volta ao mundo. A diferença mora no detalhe que ninguém te mostrou.",
  },
];

export default function EbookPage() {
  return (
    <>
      <MentoriaHeader
        ctaLabel="Receber o guia"
        ctaHref="#guia"
      />

      <section className="lp-ebook-hero" id="guia">
        <div className="cs-container">
          <div className="lp-ebook-hero-grid">
            <div>
              <h1 style={{ marginTop: 28 }}>
                <em>Um guia curto</em>, para ler antes de mudar de banco.
              </h1>
              <p className="cs-lede">
                Em linguagem de quem fala com médico todo dia.
              </p>
              <MentoriaLeadForm
                idPrefix="ebook"
                submitLabel="Receber o guia"
                successTitle="Pronto."
                successBody="Mandamos o guia pelo WhatsApp informado. Boa leitura."
              />
            </div>

            <EbookCover />
          </div>
        </div>
      </section>

      <section className="lp-ebook-chapters">
        <div className="cs-container">
          <h2 className="lp-ebook-toc-title">
            <em>Sumário</em>
          </h2>

          <ol className="lp-ebook-chapter-list">
            {CHAPS.map((c) => (
              <li className="lp-ebook-chapter" key={c.n}>
                <span className="lp-ebook-ch-num" aria-hidden="true">{c.n}</span>
                <div className="lp-ebook-ch-body-wrap">
                  <div className="lp-ebook-ch-head">
                    <h3 className="lp-ebook-ch-title">{c.title}</h3>
                    <span className="lp-ebook-ch-leader" aria-hidden="true" />
                    <span className="lp-ebook-ch-folio">{c.page}</span>
                  </div>
                  <p className="lp-ebook-ch-body">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lp-ebook-bridge">
        <div className="cs-container">
          <a href="#guia" className="cs-link-underline">
            § Receber o guia <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <MentoriaFooter />
    </>
  );
}
