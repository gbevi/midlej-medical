# Product

## Register

brand

## Users

Médicos plantonistas brasileiros — profissionais com vínculo em hospital, OS, cooperativa ou pessoa jurídica própria, com escala recorrente de plantões e recebíveis que vencem entre 30 e 90 dias. Renda real e previsível, mas com fluxo de caixa descasado da rotina de gastos. Visitam a página em momentos práticos: precisando antecipar um plantão para cobrir uma despesa imediata, ou planejando uma compra/curso/equipamento e avaliando crédito antes de comprometer poupança. Contexto típico: pelo celular, entre plantões, com pouco tempo e desconfiança alta de fintechs genéricas. Decisão financeira não-trivial — exige sentir confiança real, não persuasão.

## Product Purpose

Pleno Med é a marca consumidora da Midlej Capital (securitizadora) para o nicho médico. Oferece dois produtos numa única jornada: (1) antecipação de recebíveis de plantões já realizados, com liquidação em até 24h; (2) crédito calibrado sobre a escala futura de plantões, com parcelas alinhadas aos recebimentos. A página existe para converter um visitante qualificado em lead com dados suficientes para a mesa montar uma proposta personalizada — sem prometer o que não pode entregar e sem esconder o que pode ser dito. Sucesso = lead qualificado entra (médico real, CRM, volume mensal estimado, WhatsApp, consentimento LGPD) e sai sentindo que falou com gente séria.

## Brand Personality

Sóbrio, preciso, próximo. Voz de banco-privado-discreto traduzido para o português do plantonista — frases curtas, números concretos, vocabulário da profissão (plantão, escala, cooperativa, OS, CRM), zero marketing-speak. Tom: a calma de quem já viu muito caixa passar e sabe que confiança se constrói com fatos, não com adjetivos. Emoção alvo: alívio e respeito. O visitante sai pensando "esses entendem como eu trabalho", não "que site bonito".

## Anti-references

- **Fintech-teal default.** Qualquer paleta ciano/turquesa sobre branco. Inclui o Lovable original que estamos substituindo, e o lane Nubank/Stone/QI Tech em geral.
- **Stock-photo médico clichê.** Médico-sorrindo-com-estetoscópio, mão-no-ombro-do-paciente, jaleco-impecável-em-fundo-branco. Toda a estética de banco-de-imagens hospitalar.
- **SaaS-template scaffolding.** Grades de 4 cards de benefício, processo numerado 01/02/03 em cards, fileira de badges com stats, copy "transforme seu fluxo de caixa".
- **Bank/cartão tradicional.** Dourado, azul-marinho-com-detalhe-dourado, "private wealth" clichê. Lane Caixa/Itaú/BB padrão.
- **A LP atual em midlej-recebiveis.lovable.app.** Referência negativa explícita: não replicar nem polir; reconceber.

## Design Principles

1. **Cada afirmação ancora num fato.** "Operação regulada" sem regulador é decoração; "Midlej Capital — securitizadora autorizada CVM nº xxx" é confiança. Toda métrica, prazo ou claim chega acompanhada do nome, número ou fonte que a sustenta. É a disciplina central da página.

2. **Falar a profissão, não a categoria.** Plantão, escala, cooperativa, OS, CRM, CRM/UF, nota fiscal de plantão são o vocabulário. Nunca "hub", "destrave", "transforme", "sob medida" como muleta. A página soa como um especialista que conhece a rotina, não como um pitch genérico.

3. **Quietude como voz.** Private-banking-discreto = a página commite a menos. Menos seções, menos palavras, sem decoração que não justifique presença. Restrição é o tell de confiança; ornamento é o tell de insegurança.

4. **Uma oferta, contada duas vezes.** Plantões passados viram caixa hoje. Plantões futuros viram crédito hoje. Toda seção sustenta ou repete um desses dois fios. Nada que não puxe um deles entra.

5. **Mostrar a conta.** Onde houver taxa, prazo ou valor implícito, aparece pelo menos um exemplo numérico real (R$ 2.500 com vencimento em 60 dias = R$ 2.380 hoje, taxa 1,9% a.m., CET 2,3%). Esconder preço é tell fintech; mostrar um exemplo é honestidade de banco-privado.

## Accessibility & Inclusion

WCAG 2.2 AA como piso, não como teto. Página principal em pt-BR (`<html lang="pt-BR">`). Formulário é a superfície de conversão: labels visíveis, foco navegável por teclado com indicador alto-contraste, mensagens de erro vinculadas via `aria-describedby`, ordem lógica de tabulação. Corpo de texto ≥4.5:1 sobre o fundo; em superfícies escuras (hero deep-ink), altura de linha +0.05–0.1 para compensar a leitura mais "magra" do texto claro. `prefers-reduced-motion` respeitado em toda revelação ou transição (fallback: crossfade ou estático). Alvos de toque ≥44×44px em mobile. Texto não dependente de cor para transmitir significado (nada de "campo vermelho = erro" sem ícone ou texto). Imagens, quando houver, com `alt` que descreve a cena, não rotula a categoria.
