import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

/**
 * Bricolage Grotesque — fonte oficial da marca Midlej Capital.
 *
 * Variable font com eixos `opsz` (optical size) e `wdth` (width). Toda a
 * hierarquia tipográfica do site (display / lede / body / mono / caps)
 * é construída sobre essas duas axes, definidas em globals.css nas
 * classes .t-*.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-brand",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

/**
 * Manrope segue carregada porque a LP original do Pleno Med (em /plenomed)
 * usa --font-manrope em globals.css. Quando o Pleno Med for migrado pra
 * Bricolage também, removemos esta importação.
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://midlejcapital.com.br"),
  title: {
    default: "Midlej Capital · Hub de soluções financeiras",
    template: "%s · Midlej Capital",
  },
  description:
    "Mentoria, investimentos, seguros, alternativos, previdência e treinamentos. Uma banca de planejamento financeiro sem conflito.",
  openGraph: {
    title: "Midlej Capital",
    description:
      "Hub de soluções financeiras. Sem produto da prateleira, sem comissão por venda.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F2EA" },
    { media: "(prefers-color-scheme: dark)", color: "#233853" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
