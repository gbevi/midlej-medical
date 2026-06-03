import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pleno Med · Capital sob a sua escala de plantões",
  description:
    "Antecipação de recebíveis de plantão em 24h e crédito calibrado sobre a sua escala. Pleno Med é a operação de crédito médico da Midlej Capital.",
  metadataBase: new URL("https://plenomed.com.br"),
  openGraph: {
    title: "Pleno Med · Capital sob a sua escala de plantões",
    description:
      "Antecipação em 24h e crédito sobre a escala. Operação Midlej Capital.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>
        <a href="#capital" className="skip-link">
          Pular para o formulário
        </a>
        {children}
      </body>
    </html>
  );
}
