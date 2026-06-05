"use client";

import { useState } from "react";

const EXCERPT =
  "Renda fixa não é uma classe. É uma família com primos que mal se conhecem. Um Tesouro IPCA+ longo é, na prática, um instrumento de duration. Uma debênture incentivada é crédito privado com isenção. Um CDB de banco médio é risco de contraparte fantasiado de poupança. Um CRA é exposição ao agronegócio embalada em recebível. Tratar tudo isso como bloco único é o erro silencioso que aparece na primeira marcação a mercado. Quando o que parecia conservador devolve volatilidade de bolsa. A primeira pergunta nunca é \"quanto rende\". É: o que, exatamente, está dentro?";

export function EbookCover() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lp-ebook-cover-wrap">
      <div className="lp-ebook-cover-stage">
        <button
          type="button"
          className="lp-ebook-cover-button"
          aria-expanded={open}
          aria-label={open ? "Fechar prévia do guia" : "Abrir prévia do guia"}
          onClick={() => setOpen((v) => !v)}
        >
          <article
            className={`lp-ebook-cover${open ? " is-open" : ""}`}
            aria-hidden="true"
          >
            <span className="lp-ebook-cover-spine" aria-hidden="true">
              <span className="lp-ebook-cover-spine-mark">MIDLEJ · 2026</span>
            </span>
            <div className="lp-ebook-cover-face">
              <div className="lp-ebook-cover-head">
                <span className="lp-ebook-cover-eyebrow">
                  Midlej Capital · Mentoria
                </span>
                <h2 className="lp-ebook-cover-title">
                  <em>Cinco erros</em> que o médico PJ comete na carteira.
                </h2>
              </div>
              <div className="lp-ebook-cover-foot">
                <span className="lp-ebook-cover-colophon" aria-hidden="true">
                  Nº 01 · ed. 2026
                </span>
                <div className="lp-ebook-cover-meta">
                  <span>Edição 2026</span>
                  <span className="lp-ebook-cover-stub">guia gratuito</span>
                </div>
              </div>
            </div>
          </article>
        </button>

        <div className="lp-ebook-spread" aria-hidden={!open}>
          <div className="lp-ebook-spread-page lp-ebook-spread-page--left">
            <span className="lp-ebook-spread-chap">Capítulo 01</span>
            <h3 className="lp-ebook-spread-title">
              <em>Achar que &lsquo;renda fixa&rsquo;</em>
              <br />é uma classe.
            </h3>
          </div>
          <div className="lp-ebook-spread-page lp-ebook-spread-page--right">
            <span className="lp-ebook-spread-folio">04</span>
            <p className="lp-ebook-spread-body">{EXCERPT}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
