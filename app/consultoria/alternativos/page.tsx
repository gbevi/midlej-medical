import type { Metadata } from "next";
import { ConsultoriaHeader } from "../_components/ConsultoriaHeader";
import { ConsultoriaFooter } from "../_components/ConsultoriaFooter";
import { AlternativosForm } from "./AlternativosForm";

export const metadata: Metadata = {
  title: "A carteira que ninguém te ofereceu · Midlej Capital",
  description:
    "Investimentos alternativos como amortecedor da carteira do médico. Mecanismo, não promessa.",
};

const SCENARIOS = [
  {
    date: "Março · 2020",
    headline: "Pandemia. Ibovespa cai 30% em três semanas.",
    body:
      "Quem estava 100% em bolsa brasileira viu sumir um terço do patrimônio antes de conseguir reagir.",
    bad: "Carteira só em renda variável e renda fixa local — tudo se move junto quando o medo bate.",
    good: "Ouro, dólar e fundos de hedge específicos sobem na semana mais aguda da queda. A carteira diversificada cai metade.",
  },
  {
    date: "Fevereiro · 2022",
    headline: "Rússia invade a Ucrânia. Petróleo sobe 35% em 30 dias.",
    body:
      "Energia, fertilizantes, commodities. O mercado descobre que não tinha proteção contra choque geopolítico.",
    bad: "Carteira sem exposição a commodities globais perde poder de compra real conforme inflação dispara.",
    good: "Fundos de commodities globais e produtores de energia internacional absorvem o choque e protegem o caixa.",
  },
  {
    date: "Outubro · 2024",
    headline: "Tensão no Oriente Médio escala. Brent volta a US$ 90.",
    body:
      "Mais um lembrete: o mundo não acabou em 2020, e a próxima manchete vai pegar quem está só no feijão-com-arroz.",
    bad: "Carteira inteiramente em CDB e fundo DI: o real perde para a inflação importada e ninguém percebe na hora.",
    good: "Dólar, ouro e ativos descorrelacionados seguram o valor real. A carteira não sobe — mas também não derrete.",
  },
];

export default function AlternativosPage() {
  return (
    <>
      <ConsultoriaHeader scope="A carteira que ninguém te ofereceu" />

      <section className="lp-alt-hero">
        <div className="cs-container">
          <span className="cs-eyebrow">Sem produto da prateleira</span>
          <h1 style={{ marginTop: 32 }}>
            Existe uma alocação que o<br />
            seu gerente <em>nunca te ofereceu</em>.
          </h1>
          <p className="cs-lede">
            Não porque ela não existe. Porque não está na prateleira dele — e
            porque a comissão dele é melhor em outra coisa. Aqui é onde mora a
            carteira de quem tem patrimônio de verdade.
          </p>
        </div>
      </section>

      <section className="lp-alt-pull">
        <div className="cs-container">
          <p className="lp-alt-pullquote">
            A pergunta não é &ldquo;você previu o evento?&rdquo;.
            É <em>&ldquo;sua carteira tem amortecedor para quando você não previr?&rdquo;</em>
            <span className="lp-alt-pullquote-attr">Mesa Midlej Capital · 2026</span>
          </p>
        </div>
      </section>

      <section className="lp-alt-scenarios">
        <div className="cs-container">
          <span className="cs-eyebrow">Três cenários, dois fins</span>
          <h2 className="cs-headline" style={{ marginTop: 28 }}>
            O mesmo evento, em <em>duas carteiras diferentes</em>.
          </h2>
          <p className="cs-lede">
            Nenhum número aqui promete retorno. O que mostramos é o
            mecanismo — por que uma carteira apanha e a outra absorve.
          </p>

          {SCENARIOS.map((s) => (
            <article className="lp-alt-scenario" key={s.date}>
              <div className="lp-alt-scenario-headline">
                <span className="lp-alt-scenario-date">{s.date}</span>
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
      </section>

      <section className="lp-alt-explainer">
        <div className="cs-container">
          <span className="cs-eyebrow">Por que o banco não te oferece</span>
          <h2 className="cs-headline" style={{ marginTop: 28 }}>
            Não é o produto da prateleira dele.
          </h2>
          <p className="cs-prose">
            O gerente do banco vende o que está na grade do banco. O incentivo
            dele é a comissão por distribuição. Por isso ele te oferece o fundo
            multimercado da casa, o CDB da casa, o consórcio da casa. <em>Não
            é vilania — é incentivo.</em>
          </p>
          <p className="cs-prose" style={{ marginTop: 20 }}>
            A mesa Midlej Capital opera no outro modelo: fee recorrente do
            cliente, zero comissão de produto. Por isso a gente acessa
            estruturas e ativos que estão fora da prateleira de banco — sem ter
            interesse em te empurrar nenhum deles.
          </p>
        </div>
      </section>

      <section className="lp-alt-cta">
        <div className="cs-container">
          <div className="lp-alt-cta-grid">
            <div>
              <span className="cs-eyebrow">Montar de verdade</span>
              <h2 className="cs-headline" style={{ marginTop: 28 }}>
                Quer ver como ficaria a sua, <em>com amortecedor</em>?
              </h2>
              <p className="cs-lede">
                A mesa monta uma versão diversificada da sua carteira atual e
                manda para você. Sem compromisso. Depois você decide.
              </p>
              <p
                style={{
                  marginTop: 32,
                  fontSize: 13,
                  letterSpacing: 0.02,
                  color: "var(--cs-muted)",
                  fontFamily: "var(--cs-font-display)",
                  fontStyle: "italic",
                  maxWidth: "36ch",
                }}
              >
                Ressalva: rentabilidade passada de classe não é promessa de
                resultado futuro. O comparador usa faixas históricas de retorno
                médio; a alocação real é construída na conversa com a mesa.
              </p>
            </div>
            <AlternativosForm />
          </div>
        </div>
      </section>

      <ConsultoriaFooter />
    </>
  );
}
