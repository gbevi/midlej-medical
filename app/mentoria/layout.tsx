import type { Metadata } from "next";
import "./mentoria.css";

export const metadata: Metadata = {
  title: "Midlej Capital · Mentoria",
  description:
    "Mentoria de investimentos sem conflito para médicos. Operação Midlej Capital.",
  robots: { index: false, follow: false },
};

export default function MentoriaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="midlej-mentoria">
      <a href="#main" className="cs-skip-link">Pular para o conteúdo</a>
      {children}
    </div>
  );
}
