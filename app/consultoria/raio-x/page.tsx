import type { Metadata } from "next";
import { ConsultoriaHeader } from "../_components/ConsultoriaHeader";
import { ConsultoriaFooter } from "../_components/ConsultoriaFooter";
import { RaioXForm } from "./RaioXForm";

export const metadata: Metadata = {
  title: "Raio-x da sua carteira · Midlej Capital",
  description:
    "Uma análise gratuita da carteira que você já tem hoje. Sem custo, sem proposta. Para médicos.",
};

const FINDINGS = [
  {
    n: "I",
    title: "O quanto você paga em taxa hoje.",
    detail:
      "A nota de corretagem só conta um lado. A taxa de administração some no rendimento, a custódia some na conta, a iniciativa de saída some no resgate. Somamos tudo num único número.",
  },
  {
    n: "II",
    title: "Onde sua carteira está concentrada de verdade.",
    detail:
      "Cinco fundos diferentes podem carregar os mesmos cinco ativos. Mostramos o que está embaixo da casca, no nível do ativo, não do produto.",
  },
  {
    n: "III",
    title: "O custo de oportunidade do que está parado.",
    detail:
      "Caixa em corretora rendendo 95% do CDI parece bom. Não é. Em três anos, esse desconto vira parcela de carro.",
  },
  {
    n: "IV",
    title: "O que o seu gerente não te ofereceu.",
    detail:
      "Classes de ativo, prazos, estruturas. Não porque não existem — porque não estão na prateleira dele, ou porque a comissão é melhor em outra coisa.",
  },
  {
    n: "V",
    title: "O que faria sentido para o seu momento.",
    detail:
      "Idade, renda, escala, dependentes, horizonte. Uma carteira de 38 anos não é a mesma de 52. A análise termina no mapa do que poderia ser.",
  },
];

export default function RaioXPage() {
  return (
    <>
      <ConsultoriaHeader scope="Raio-x de carteira" ctaLabel="WhatsApp da mesa" ctaHref="https://wa.me/5511999999999" />

      <section className="lp-raiox-hero">
        <div className="cs-container">
          <div className="lp-raiox-hero-grid">
            <div>
              <span className="cs-eyebrow">Análise gratuita · médicos</span>
              <h1 style={{ marginTop: 32 }}>
                Antes de mudar nada,<br />
                veja <em>o que você tem</em>.
              </h1>
            </div>
            <aside className="lp-raiox-hero-meta">
              <span>Diagnóstico · sem custo</span>
              <dl>
                <dt>Prazo</dt>
                <dd>
                  <span className="cs-num">3 a 5</span> dias úteis
                </dd>
                <dt>Entregue por</dt>
                <dd>Mesa Midlej Capital</dd>
                <dt>Compromisso</dt>
                <dd>nenhum</dd>
              </dl>
            </aside>
          </div>

          <div className="lp-raiox-pitch">
            <span className="cs-eyebrow">Por que existe</span>
            <p>
              Nove a cada dez médicos que abrem a carteira para a gente descobrem
              que pagam <em>entre 2 e 4 vezes mais</em> de taxa do que precisam.
              Ninguém vai te contar isso enquanto o produto continuar na sua
              conta. A gente conta — e sem cobrar pelo recado.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section--paper lp-raiox-revela">
        <div className="cs-container">
          <span className="cs-eyebrow">O que o raio-x revela</span>
          <h2 className="cs-headline" style={{ marginTop: 28 }}>
            Cinco achados, um <em>laudo</em> escrito.
          </h2>
          <p className="cs-lede" style={{ marginTop: 28 }}>
            Sem gráfico de pizza colorido. Frase curta, número claro, decisão na
            sua mão.
          </p>

          <ul className="lp-raiox-findings">
            {FINDINGS.map((f) => (
              <li key={f.n}>
                <span className="lp-raiox-find-num">{f.n}</span>
                <h3 className="lp-raiox-find-title">{f.title}</h3>
                <p className="lp-raiox-find-detail">{f.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cs-section lp-raiox-form-section" id="pedir">
        <div className="cs-container">
          <div className="lp-raiox-form-grid">
            <div className="lp-raiox-form-aside">
              <span className="cs-eyebrow">Como funciona</span>
              <h2 className="cs-headline" style={{ marginTop: 28 }}>
                Três passos, <em>sem onda</em>.
              </h2>
              <ul>
                <li>Você manda seus dados aqui ou no WhatsApp da mesa.</li>
                <li>A mesa pede o extrato de cada conta. Sem login, sem senha.</li>
                <li>Você recebe o laudo. O que fazer com ele é decisão sua.</li>
              </ul>
              <p className="cs-prose" style={{ marginTop: 32 }}>
                Não vendemos consultoria nesta conversa. A mesa entrega o laudo,
                explica os achados, e fica à disposição. Se você quiser, falamos
                em assinatura mensal depois. Se não, fica o laudo na sua mão.
              </p>
            </div>

            <div>
              <RaioXForm />
              <div className="lp-raiox-form-or">ou</div>
              <a
                href="https://wa.me/5511999999999"
                className="cs-btn cs-btn-ghost"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Falar agora no WhatsApp
                <span aria-hidden="true" className="cs-btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ConsultoriaFooter />
    </>
  );
}
