import type { Metadata } from "next";
import { MentoriaHeader } from "../_components/MentoriaHeader";
import { MentoriaFooter } from "../_components/MentoriaFooter";
import { MentoriaLeadForm } from "../_components/MentoriaLeadForm";

export const metadata: Metadata = {
  title: "A carteira que ninguém te ofereceu · Midlej Capital",
  description:
    "Investimentos alternativos como amortecedor da carteira do médico. Mecanismo, não promessa.",
};

const SCENARIOS = [
  {
    year: "2020",
    month: "Março",
    headline: "Pandemia. Ibovespa cai 30% em três semanas.",
    body:
      "Quem estava 100% em bolsa brasileira viu sumir um terço do patrimônio antes de conseguir reagir.",
    bad: "Carteira só em renda variável e renda fixa local. Tudo se move junto quando o medo bate.",
    good: "Ouro e dólar têm base de preço descorrelacionada da bolsa BR. O gatilho do medo local não é o mesmo gatilho deles.",
  },
  {
    year: "2022",
    month: "Fevereiro",
    headline: "Rússia invade a Ucrânia. Petróleo sobe 35% em 30 dias.",
    body:
      "Energia, fertilizantes, commodities. O mercado descobre que não tinha proteção contra choque geopolítico.",
    bad: "Carteira sem exposição a commodities globais perde poder de compra real conforme inflação dispara.",
    good: "Commodities globais e produtores de energia internacional carregam exposição em moeda forte e contratos físicos. A base de preço é outra.",
  },
  {
    year: "2024",
    month: "Outubro",
    headline: "Tensão no Oriente Médio escala. Brent volta a US$ 90.",
    body:
      "Mais um lembrete: o mundo não acabou em 2020, e a próxima manchete vai pegar quem está só no CDB e DI.",
    bad: "Carteira inteiramente em CDB e fundo DI: o real perde para a inflação importada e ninguém percebe na hora.",
    good: "Reserva em moeda forte tem precificação fora do CDI. Não compete com o mesmo ciclo de juros locais.",
  },
];

export default function AlternativosPage() {
  return (
    <>
      <MentoriaHeader
        ctaLabel="Diversificar minha carteira"
        ctaHref="#diversificar"
      />

      <section className="lp-alt-hero">
        <svg
          className="lp-alt-hero-arc"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 6 14 Q 50 6 94 86"
            fill="none"
            stroke="color-mix(in oklch, var(--cs-paper) 22%, transparent)"
            strokeWidth="0.75"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="6"
            cy="14"
            r="0.9"
            fill="none"
            stroke="color-mix(in oklch, var(--cs-paper) 55%, transparent)"
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="94"
            cy="86"
            r="0.9"
            fill="none"
            stroke="color-mix(in oklch, var(--cs-paper) 55%, transparent)"
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="cs-container">
          <h1>
            Existe uma alocação que o<br />
            seu gerente <em>nunca te ofereceu</em>.
          </h1>
          <p className="cs-lede">
            A carteira de quem tem patrimônio de verdade.
          </p>
        </div>
      </section>

      <section className="lp-alt-pull">
        <div className="cs-container">
          <blockquote className="lp-alt-pullquote" role="doc-pullquote">
            <p>A pergunta não é &ldquo;você previu o evento?&rdquo;.</p>
            <p>
              <em>
                É: &ldquo;sua carteira tem amortecedor para quando você não
                previr?&rdquo;
              </em>
            </p>
            <cite className="lp-alt-pullquote-attr">Midlej Capital</cite>
          </blockquote>
        </div>
      </section>

      <section className="lp-alt-scenarios">
        <div className="cs-container">
          <h2 className="cs-headline">
            O mesmo evento, em <em>duas carteiras diferentes</em>.
          </h2>

          <div className="lp-alt-timeline">
            {SCENARIOS.map((s) => (
              <article className="lp-alt-scenario" key={s.year}>
                <span className="lp-alt-scenario-node" aria-hidden="true" />
                <div className="lp-alt-scenario-headline">
                  <span className="lp-alt-scenario-date">
                    <span className="year">{s.year}</span>
                    <span className="month">{s.month}</span>
                  </span>
                  <h3>{s.headline}</h3>
                  <p>{s.body}</p>
                </div>

                <div className="lp-alt-compare">
                  <div className="lp-alt-compare-side is-bad">
                    <span className="lp-alt-compare-tag">Carteira desprotegida</span>
                    <p className="lp-alt-compare-mech is-bad">{s.bad}</p>
                  </div>
                  <div className="lp-alt-compare-side is-good">
                    <span className="lp-alt-compare-tag">Carteira diversificada</span>
                    <p className="lp-alt-compare-mech">{s.good}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-alt-explainer">
        <div className="cs-container">
          <h2 className="cs-headline">
            O gerente vende o que tem na grade do banco.
          </h2>
          <p className="cs-prose">
            A Midlej Capital opera no outro modelo: fee recorrente do cliente,
            zero comissão de produto. Acessamos estruturas e ativos fora da
            prateleira de banco. Sem interesse em te empurrar nenhum deles.
          </p>
        </div>
      </section>

      <section className="lp-alt-cta" id="diversificar">
        <div className="cs-container">
          <div className="lp-alt-cta-grid">
            <div>
              <h2 className="cs-headline">
                Sua carteira, <em>com amortecedor.</em>
              </h2>
              <p className="cs-lede">
                Montamos uma versão diversificada da sua carteira atual.
                Sem compromisso.
              </p>
            </div>
            <MentoriaLeadForm
              idPrefix="alt"
              submitLabel="Quero ver minha carteira diversificada"
              successTitle="Recebemos."
              successBody="Em até 1 dia útil retornamos com a versão diversificada da sua alocação."
            />
          </div>
        </div>
      </section>

      <MentoriaFooter />
    </>
  );
}
