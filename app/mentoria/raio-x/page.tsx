import type { Metadata } from "next";
import { MentoriaHeader } from "../_components/MentoriaHeader";
import { MentoriaFooter } from "../_components/MentoriaFooter";
import { MentoriaLeadForm } from "../_components/MentoriaLeadForm";
import { MentoriaSuccessBody } from "../_components/MentoriaSuccessBody";
import { MIDLEJ_WHATSAPP_HREF } from "@/lib/leadConstants";

const WHATSAPP_HREF = MIDLEJ_WHATSAPP_HREF;

export const metadata: Metadata = {
  title: "Raio-x da sua carteira · Midlej Capital",
  description:
    "Uma análise gratuita da carteira que você já tem hoje. Sem custo, sem proposta.",
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
      "Classes de ativo, prazos, estruturas. Não porque não existem. Porque não estão na prateleira dele, ou porque a comissão é melhor em outra coisa.",
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
      <MentoriaHeader
        ctaLabel="Pedir meu raio-x"
        ctaHref="#pedir"
      />

      <main id="main">
      <section className="lp-raiox-hero">
        <div className="cs-container">
          <div className="lp-raiox-hero-grid">
            <div>
              <h1 style={{ marginTop: 32 }}>
                Você não precisa de uma proposta.<br />
                Precisa de um <em>diagnóstico</em>.
              </h1>
              <p className="lp-raiox-hero-stat">
                9 em cada 10 carteiras que abrimos pagam{" "}
                <em>2 a 4 vezes mais</em> de taxa do que precisariam.
              </p>
            </div>
            <aside className="lp-raiox-hero-meta" aria-label="Laudo facsímile">
              <div className="lp-raiox-laudo">
                <header className="lp-raiox-laudo-head">
                  <span className="lp-raiox-laudo-org">Midlej Capital · Mentoria</span>
                  <span className="lp-raiox-laudo-id">Laudo Nº 0247 / 2026</span>
                </header>
                <p className="lp-raiox-laudo-patient">
                  Paciente · dados anonimizados (amostra)
                </p>
                <dl className="lp-raiox-laudo-findings">
                  <div className="lp-raiox-laudo-row lp-raiox-laudo-row--blur" aria-hidden="true">
                    <dt>I</dt>
                    <dd>Lorem ipsum dolor sit amet consectetur adipiscing.</dd>
                  </div>
                  <div className="lp-raiox-laudo-row lp-raiox-laudo-row--blur" aria-hidden="true">
                    <dt>II</dt>
                    <dd>Donec sed odio dui nulla vitae elit libero.</dd>
                  </div>
                  <div className="lp-raiox-laudo-row lp-raiox-laudo-row--highlight">
                    <dt>III</dt>
                    <dd>
                      Caixa em corretora rendendo <em>95% do CDI</em>. Em três
                      anos, desconto equivalente a uma parcela de carro.
                    </dd>
                  </div>
                  <div className="lp-raiox-laudo-row lp-raiox-laudo-row--blur" aria-hidden="true">
                    <dt>IV</dt>
                    <dd>Curabitur blandit tempus porttitor magna mollis.</dd>
                  </div>
                </dl>
                <footer className="lp-raiox-laudo-foot">
                  <span>Emissão · em até 5 dias úteis</span>
                  <span>Sem custo, sem compromisso</span>
                </footer>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section--paper lp-raiox-revela">
        <div className="cs-container">
          <h2 className="cs-headline">
            Cinco achados, um <em>laudo</em> escrito.
          </h2>

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
                Três passos, <em>sem complicação</em>.
              </h2>
              <ul>
                <li>Você manda seus dados aqui ou pelo WhatsApp.</li>
                <li>Pedimos o extrato de cada conta. Sem login, sem senha.</li>
                <li>Você recebe o laudo. O que fazer com ele é decisão sua.</li>
              </ul>
            </div>

            <div>
              <div className="lp-raiox-wa-promote">
                <a href={WHATSAPP_HREF} className="cs-link-underline">
                  Mais rápido. Fale direto no WhatsApp
                  <span aria-hidden="true">→</span>
                </a>
                <p className="lp-raiox-wa-sub">ou prefere por escrito:</p>
              </div>
              <MentoriaLeadForm
                idPrefix="raiox"
                origin="Mentoria — Raio-X"
                submitLabel="Quero meu raio-x"
                successTitle="Recebemos."
                successBody={
                  <MentoriaSuccessBody
                    followup={
                      <>
                        Respondemos pelo WhatsApp em até{" "}
                        <span className="cs-num">1 dia útil</span> pra combinar
                        o envio dos extratos. O laudo escrito sai em até{" "}
                        <span className="cs-num">5 dias úteis</span>.
                      </>
                    }
                  />
                }
              />
            </div>
          </div>
        </div>
      </section>
      </main>

      <MentoriaFooter />
    </>
  );
}
