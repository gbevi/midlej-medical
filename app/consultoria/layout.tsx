import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./consultoria.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Midlej Capital · Consultoria",
  description:
    "Consultoria de investimentos sem conflito para médicos. Operação Midlej Capital.",
  robots: { index: false, follow: false },
};

export default function ConsultoriaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={`midlej-consultoria ${spectral.variable}`}>{children}</div>;
}
