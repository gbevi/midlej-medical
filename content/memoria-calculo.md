# Memória do cálculo — Simulador de independência financeira

---

## Como ler este documento

O simulador devolve um ano. Esse ano não é destino — é ponto de partida. O cálculo é honesto, mas simplificado por desenho: ele isola três variáveis (patrimônio, aporte, meta de renda) e mostra o efeito de uma única alavanca de cada vez. Esta memória descreve **o que entra, o que sai, e o que ficou de fora**.

Carteira não é planilha. Mas planilha é um bom mapa pra começar a conversa.

---

## O que entra

O simulador recebe quatro inputs do médico:

| Variável | O que é | Faixa típica do médico PJ |
|---|---|---|
| Idade hoje | em anos completos | 28 a 60 |
| Patrimônio investido | soma de todos os ativos líquidos: aplicações, fundos, ações, previdência, caixa em corretora | R$ 150 mil a R$ 5 milhões |
| Aporte mensal | quanto entra novo por mês, líquido | R$ 3 mil a R$ 50 mil |
| Renda mensal alvo | quanto você quer manter ao se afastar do trabalho, em valor de hoje | R$ 15 mil a R$ 80 mil |

A renda alvo é o coração do cálculo. É o que define o **capital alvo** — o patrimônio que, uma vez atingido, sustenta essa renda indefinidamente.

---

## Como o capital alvo é calculado

Aplicamos a **regra dos 4%** (Trinity Study, 1998; revisada por Bengen, 2024). Em formato direto:

```
Capital alvo  =  Renda mensal alvo  ×  12  ÷  0,04
```

Equivale a multiplicar a renda anual desejada por 25. Em termos diretos: o capital precisa render, em média, 4% ao ano em **termos reais** (já descontada a inflação) pra que você possa sacar a renda mensal sem corroer o principal.

**Por que 4% e não 6 ou 7?** Porque 4% é o número que sobrevive aos piores períodos da história de mercado quando aplicado a uma carteira diversificada (60% renda variável global / 40% renda fixa de inflação). Períodos como 1929–1939, 1968–1978 e 2000–2010 são testes de sobrevivência reais — e a regra dos 4% atravessa todos eles sem ruína de patrimônio em 30 anos.

**Exemplos:**
- Renda alvo R$ 25.000 → capital alvo R$ 7.500.000
- Renda alvo R$ 40.000 → capital alvo R$ 12.000.000
- Renda alvo R$ 60.000 → capital alvo R$ 18.000.000

---

## Como o ano de independência é calculado

A fórmula do crescimento composto, mês a mês, até atingir o capital alvo:

```
P(t+1)  =  P(t) × (1 + r/12)  +  A
```

Onde:
- `P(t)` = patrimônio no mês t
- `r` = retorno real anual (5% no cenário "alocação eficiente"; 2,5% no "ineficiente")
- `A` = aporte mensal constante

O simulador itera essa equação mês a mês até `P(t) ≥ Capital alvo`. O mês em que isso acontece é convertido em ano.

**Premissas-chave:**
- Retorno **real** (já descontada a inflação) de **5% a.a.** no cenário eficiente
- Retorno **real** de **2,5% a.a.** no cenário ineficiente — esse é o número que carteiras com 3 camadas de taxa, alocação concentrada em CDB de banco grande e gerente vendendo COE devolvem na prática
- Aporte constante em valor real (ou seja, ajustado pela inflação)
- Saída calculada na **taxa segura de 4% a.a.** sobre o capital final

---

## Por que aparecem duas linhas no resultado

A diferença entre "alocação eficiente" e "alocação ineficiente" não é hipótese — é o que separa quem tem um consultor remunerado pelo cliente de quem tem um vendedor remunerado pelo produto.

| Mecanismo | Eficiente | Ineficiente |
|---|---|---|
| Taxa média da carteira | 0,4% a.a. | 2,4% a.a. |
| Diversificação real | 5 classes descorrelacionadas | 1 classe em 5 produtos |
| Rebalanceamento | semestral, baseado em desvio | nenhum |
| Caixa | 105% do CDI | 95% do CDI |
| Resultado de longo prazo | 5% a.a. real | 2,5% a.a. real |

A diferença de 2,5 pontos percentuais ao ano, composta por 25 anos, atrasa a independência em **8 a 14 anos** dependendo da escala — exatamente o GAP que o simulador mostra.

---

## O que o cálculo NÃO considera

O simulador é honesto sobre o que não vê:

1. **Mudanças de renda ao longo do tempo.** Aporte está fixo. Na realidade, médico tende a aumentar capacidade de aporte com escala (mais plantões, sociedade, clínica própria). O número é, portanto, conservador.

2. **Eventos de vida.** Filho, divórcio, herança, doença prolongada, troca de cidade. Cada um desvia o trajeto por meses ou anos. Reserva de emergência e seguro de vida não estão na conta.

3. **Tributação dinâmica.** A regra dos 4% trabalha em termos líquidos. Para o médico, isso significa estruturar onde o patrimônio fica (PGBL, fundo exclusivo, holding patrimonial, previdência) — o que muda significativamente o líquido recebido.

4. **Inflação variável.** Assumimos inflação estável; em períodos de IPCA acima de 7% por dois anos seguidos, o retorno real cai e o ano se afasta.

5. **Custo de oportunidade do imóvel próprio.** Casa própria sai do patrimônio investido. Médico com R$ 2 milhões em imóvel não consegue sacar 4% do imóvel ao mês — o tijolo não rende renda mensal.

---

## Como antecipar a data sem aportar mais

Três alavancas. A ordem importa.

**1. Cortar a taxa total da carteira.**
De 2,4% pra 0,4% ao ano: efeito direto sobre o retorno real. Em uma carteira de R$ 1 milhão, são R$ 20 mil ao ano de diferença entrando no composto. Em 20 anos, mais de R$ 600 mil de patrimônio adicional.

**2. Trocar a alocação ineficiente pela diversificação real.**
Sair de "cinco fundos do mesmo gestor" para uma estrutura com renda fixa global de inflação + renda variável diversificada (Brasil, EUA, emergentes) + ativos alternativos (ouro, dólar, imobiliário). Mesmo aporte, mesmo prazo, retorno real saindo de 2,5% para 5%.

**3. Otimizar o veículo tributário.**
PGBL com benefício pleno (declaração completa) devolve até R$ 8.000 de IR ao ano por contribuição máxima — esse dinheiro pode voltar pro patrimônio. Estruturas pejotizadas como holding patrimonial mudam a base tributária dos rendimentos. Cada R$ 5 mil que não vai pro Leão fica composto na sua carteira.

Combinadas, essas três alavancas costumam antecipar a data em **8 a 12 anos** num médico de 38 anos. Sem aporte adicional. Apenas mudando como o que já existe está organizado.

---

## Próximo passo

A memória do cálculo é o ponto de partida. Para entender quanto a sua carteira de hoje está adicionando de anos ao trajeto, e o que faria sentido mudar primeiro, o caminho é o **diagnóstico**.

Sem proposta, sem produto, sem custo. Você manda os extratos, a gente devolve um laudo. O que fazer com ele é decisão sua.

Falar com a Midlej Capital pelo WhatsApp informado no cadastro.

---

**Midlej Capital · Mentoria**
Material informativo. Não constitui recomendação de investimento. Premissas simplificadas para fins ilustrativos.
