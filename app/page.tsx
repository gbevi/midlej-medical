import { SiteHeader } from "./components/SiteHeader";
import { LeadForm } from "./components/LeadForm";
import { LeadSimulator } from "./components/LeadSimulator";
import { MidlejMark } from "./components/MidlejMark";
import { RevealOnScroll } from "./components/RevealOnScroll";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main id="top">
      <SiteHeader />
      <RevealOnScroll />

      {/* ─────────────────────────────────────────────────────────
          HERO
          ───────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <h1 className="hero-h1 hero-enter hero-enter-1">
              O <em>capital</em> da sua<br />
              carreira médica.
            </h1>

            <p className="hero-sub hero-enter hero-enter-2">
              A Pleno Med é o hub de crédito feito para médicos. Antecipe os
              plantões já realizados e tenha crédito sob medida com base nos
              plantões que ainda virão.
            </p>

            <div className="hero-actions hero-enter hero-enter-3">
              <a href="#capital" className="hero-cta">
                Quero meu acesso
                <span className="hero-cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <span className="hero-meta">
                Antecipação + crédito · 24h
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULADOR — mostra a conta antes de descer a página */}
      <LeadSimulator />

      {/* DUAS SOLUÇÕES — drenched ink */}
      <section className="section-duas">
        <div className="container">
          <h2>
            Duas soluções,<br />um <em>só hub</em>.
          </h2>

          <p className="lede">
            Os plantões que você já fez. E os que ainda vai fazer.
          </p>

          <p className="intro-prose">
            A Pleno Med olha para a sua escala como um todo. Plantões já
            realizados viram caixa hoje. Plantões da escala dos próximos
            meses viram crédito agora.
          </p>

          <div className="duas-grid" data-reveal="true">
            <article
              className="produto reveal-item"
              style={{ ["--i" as string]: 0 }}
            >
              <h3>Antecipação de recebíveis</h3>
              <p>
                Transforme suas notas fiscais de plantão em dinheiro na conta
                em até 24 horas, sem esperar 30, 60 ou 90 dias pelo hospital
                ou cooperativa.
              </p>
              <ul>
                <li>Análise no mesmo dia útil</li>
                <li>Sem garantias adicionais</li>
                <li>Taxa fechada antes do aceite</li>
              </ul>
            </article>

            <article
              className="produto reveal-item"
              style={{ ["--i" as string]: 1 }}
            >
              <h3>
                Crédito sobre a sua escala
                <span className="tag-novo">novo</span>
              </h3>
              <p>
                Use a previsibilidade da sua agenda para acessar crédito agora,
                financie um curso, equipamento, mudança de cidade ou organize
                suas finanças.
              </p>
              <ul>
                <li>Limite calculado pela sua escala</li>
                <li>Parcelas alinhadas aos recebimentos</li>
                <li>Aprovação 100% online</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA — rule-divided sequence, no numerals */}
      <section className="section-como">
        <div className="container">
          <h2>Como funciona.</h2>

          <p className="lede">Três passos entre você e o seu capital.</p>

          <ol className="flow" data-reveal="true">
            <li
              className="flow-step reveal-item"
              style={{ ["--i" as string]: 0 }}
            >
              <h3>Você conta sua rotina.</h3>
              <p>
                Compartilha os plantões já realizados e a escala dos próximos
                meses. Tudo de forma simples e digital.
              </p>
            </li>
            <li
              className="flow-step reveal-item"
              style={{ ["--i" as string]: 1 }}
            >
              <h3>A mesa monta a proposta.</h3>
              <p>
                Combinamos antecipação e crédito conforme o seu momento, com
                taxa fechada antes do aceite.
              </p>
            </li>
            <li
              className="flow-step reveal-item"
              style={{ ["--i" as string]: 2 }}
            >
              <h3>O capital cai em 24h.</h3>
              <p>
                Aceitou? O dinheiro chega direto na sua conta. Sem fiador,
                sem garantias adicionais, sem fila.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* POR QUE PLENO MED — pull-quote + two named claims */}
      <section className="section-porque">
        <div className="container">
          <h2>Por que Pleno Med.</h2>

          <p className="lede">
            O parceiro financeiro que entende a sua escala.
          </p>

          <p
            className="pull-quote reveal-solo"
            data-reveal="true"
          >
            Médico plantonista tem renda real, mas raramente é tratado
            assim. Aqui, a sua escala é o ativo, passada e futura. A
            operação é estruturada pela Midlej Capital, com taxa fechada
            antes do aceite e mesa dedicada ao plantonista.
          </p>

          <div className="claims">
            <article className="claim">
              <h3>Mesa dedicada ao plantonista.</h3>
              <p>
                A análise sai no mesmo dia útil. A taxa fecha antes do
                aceite, sem renegociação depois. Quem responde do outro lado
                conhece escala, OS e cooperativa, e fala a profissão.
              </p>
            </article>
            <article className="claim">
              <h3>Operação estruturada, não improvisada.</h3>
              <p>
                O crédito vem da Midlej Capital, securitizadora, não de uma
                promessa de marketplace. Cada operação tem instrumento
                próprio, contrato registrado e condições conhecidas antes
                do aceite.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CAPITAL — final CTA + form */}
      <section id="capital" className="section-capital">
        <div className="container">
          <div className="capital-grid">
            <div>
              <h2>
                A medicina é sua.<br />
                <em>O capital, a gente organiza.</em>
              </h2>

              <p className="intro-prose">
                Cadastre-se e receba uma proposta personalizada, antecipação,
                crédito ou os dois, em até 1 dia útil.
              </p>
            </div>

            <LeadForm />
          </div>
        </div>
      </section>

      {/* FOOTER — institutional ink close */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-stack">
            <div className="footer-mark">
              <MidlejMark height={44} />
            </div>

            <p className="footer-statement">
              Pleno Med é a operação de crédito médico da{" "}
              <em>Midlej Capital</em>. Atende exclusivamente profissionais
              médicos no Brasil.
            </p>

            <div className="footer-legal">
              <span className="footer-legal-line">
                Midlej Capital · CNPJ 35.340.252/0001-44
              </span>
              <span className="footer-legal-line">
                © {year} Pleno Med. Todos os direitos reservados.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
