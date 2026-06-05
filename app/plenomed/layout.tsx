import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pleno Med · Capital sob a sua escala de plantões",
  description:
    "A Pleno Med é o hub de crédito para médicos. Antecipe plantões já realizados e tenha crédito sob medida com base na sua escala futura.",
  openGraph: {
    title: "Pleno Med · Capital sob a sua escala de plantões",
    description:
      "Antecipação de recebíveis e crédito sobre a escala. Operação estruturada pela Midlej Capital.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function PlenomedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
