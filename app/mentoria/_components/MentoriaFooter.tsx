import { MidlejMark } from "@/app/components/MidlejMark";

export function MentoriaFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="cs-footer">
      <div className="cs-container">
        <div className="cs-footer-grid">
          <div className="cs-footer-mark">
            <MidlejMark height={44} />
          </div>
          <p className="cs-footer-statement">
            A mentoria da <em>Midlej Capital</em> atende exclusivamente
            profissionais médicos no Brasil. Modelo de fee recorrente, sem
            comissão por produto.
          </p>
        </div>
        <div className="cs-footer-rule" />
        <div className="cs-footer-legal">
          <span>Midlej Capital · CNPJ 35.340.252/0001-44</span>
          <span>© {year} Midlej Capital Mentoria. Uso interno e institucional.</span>
        </div>
      </div>
    </footer>
  );
}
