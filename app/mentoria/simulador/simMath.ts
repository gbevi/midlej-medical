/* Cálculo simplificado, em termos reais (inflação descontada).
   F(n) = F0·(1+r)^n + A·((1+r)^n - 1)/r
   Aproximação razoável; a página deixa claro que é simulação. */

export type SimInput = {
  idade: number;
  patrimonio: number;
  aporte: number;
  metaMensal: number;
  retornoRealAA?: number;
};

export type SimResult = {
  ano: number;
  idadeFinal: number;
  alvo: number;
};

export function anoIndependencia({
  idade,
  patrimonio,
  aporte,
  metaMensal,
  retornoRealAA = 0.05,
}: SimInput): SimResult {
  const r = Math.pow(1 + retornoRealAA, 1 / 12) - 1;
  // Capital necessário: renda perpétua a 4% real anual ≈ renda × 25
  const alvo = (metaMensal * 12) / 0.04;
  if (patrimonio >= alvo) {
    return { ano: new Date().getFullYear(), idadeFinal: idade, alvo };
  }
  let f = patrimonio;
  for (let n = 1; n <= 12 * 60; n++) {
    f = f * (1 + r) + aporte;
    if (f >= alvo) {
      const anos = n / 12;
      const ano = new Date().getFullYear() + Math.ceil(anos);
      const idadeFinal = Math.round(idade + anos);
      return { ano, idadeFinal, alvo };
    }
  }
  return { ano: new Date().getFullYear() + 60, idadeFinal: idade + 60, alvo };
}
