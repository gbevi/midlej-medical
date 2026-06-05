import Link from "next/link";
import { ConsultoriaHeader } from "./_components/ConsultoriaHeader";
import { ConsultoriaFooter } from "./_components/ConsultoriaFooter";

const PORTAS = [
  {
    n: "I",
    slug: "raio-x",
    title: "Raio-x de carteira",
    desc: "Para quem desconfia que está mal alocado. Sem custo, sem compromisso.",
  },
  {
    n: "II",
    slug: "ebook",
    title: "Os 5 erros do médico PJ",
    desc: "Guia em PDF. Você lê. Se fizer sentido, a gente conversa.",
  },
  {
    n: "III",
    slug: "simulador",
    title: "Simulador de independência",
    desc: "Em que ano você para de depender do plantão.",
  },
  {
    n: "IV",
    slug: "planilha",
    title: "Onde mora seu dinheiro",
    desc: "Planilha que revela quanto sobra de verdade no fim do mês.",
  },
  {
    n: "V",
    slug: "alternativos",
    title: "A carteira que ninguém te ofereceu",
    desc: "O que o private banking acessa e o seu gerente nunca te contou.",
  },
];

export default function ConsultoriaIndex() {
  return (
    <>
      <ConsultoriaHeader scope="Cinco portas, um corredor" />
      <section className="cs-index-hero">
        <div className="cs-container">
          <span className="cs-eyebrow">Plano de aquisição · médicos</span>
          <h1 style={{ marginTop: 32 }}>
            Cinco entradas para a<br />
            mesma <em>conversa</em>.
          </h1>
          <p className="cs-lede">
            Cada porta atende um momento diferente do médico que pensa na própria
            carteira. Todas levam ao mesmo destino: um diagnóstico gratuito,
            assinado pela mesa.
          </p>
        </div>
      </section>

      <section className="cs-index-portas">
        <div className="cs-container">
          {PORTAS.map((p) => (
            <div className="cs-index-porta" key={p.slug}>
              <span className="cs-index-porta-num">{p.n}</span>
              <div className="cs-index-porta-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
              <Link
                href={`/consultoria/${p.slug}`}
                className="cs-link-underline cs-index-porta-cta"
              >
                Abrir <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <ConsultoriaFooter />
    </>
  );
}
