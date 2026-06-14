"use client";

import { useState } from "react";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

/* ── helpers ── */
const n4 = (v: number) => parseFloat(v.toFixed(4));

function buildPieArcs(slices: { pct: number; color: string }[]) {
  let cum = -90;
  return slices.map((s) => {
    const start = cum;
    const sweep = (s.pct / 100) * 360;
    cum += sweep;
    const r = 36; const cx = 52; const cy = 52;
    const rad = (d: number) => (d * Math.PI) / 180;
    const x1 = n4(cx + r * Math.cos(rad(start)));
    const y1 = n4(cy + r * Math.sin(rad(start)));
    const x2 = n4(cx + r * Math.cos(rad(start + sweep)));
    const y2 = n4(cy + r * Math.sin(rad(start + sweep)));
    return { ...s, d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2} Z` };
  });
}

/* ── tab: Mapa ── */
function TabMapa() {
  const income  = [9800, 9800, 11200, 9800, 9800, 10500];
  const expense = [6200, 7100, 6800, 8300, 6900, 7400];
  const maxVal  = Math.max(...income, ...expense);
  const H = 54; // px disponíveis para barras dentro do viewBox

  const expenseRows = [
    { label: "Moradia", v: 2800 },
    { label: "Alimentação", v: 1650 },
    { label: "Transporte", v: 980 },
    { label: "Saúde", v: 720 },
    { label: "Lazer", v: 560 },
  ];
  const fmt = (v: number) =>
    v >= 1000 ? `R$${(v / 1000).toFixed(0)}k` : `R$${v}`;

  return (
    <div className="flex flex-col gap-4">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: "Renda anual",  v: "R$ 121k", color: "#2E4659" },
          { k: "Gastos anuais", v: "R$ 88k", color: "#2E4659" },
          { k: "Saldo",        v: "+ R$ 33k", color: "#3FAE7A" },
        ].map((d) => (
          <div key={d.k} className="bg-white rounded-xl p-3 border border-[#EDEFF2]">
            <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-1" style={{ color: "#6B7B8D" }}>{d.k}</p>
            <p className="text-[0.9rem] font-bold tabular-nums" style={{ color: d.color }}>{d.v}</p>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="bg-white rounded-xl border border-[#EDEFF2] px-4 pt-3 pb-2">
        <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-2" style={{ color: "#6B7B8D" }}>Fluxo mensal</p>
        <svg viewBox="0 0 200 76" width="100%" style={{ display: "block" }}>
          <line x1="10" y1="62" x2="195" y2="62" stroke="#EDEFF2" strokeWidth="1" />
          {MONTHS.map((m, i) => {
            const x   = 18 + i * 30;
            const rH  = (income[i] / maxVal) * H;
            const gH  = (expense[i] / maxVal) * H;
            return (
              <g key={i}>
                <rect x={x}      y={62 - rH} width="10" height={rH} rx="2" fill="#4a6b8c" fillOpacity="0.7" />
                <rect x={x + 12} y={62 - gH} width="10" height={gH} rx="2" fill="#c0392b" fillOpacity="0.55" />
                <text x={x + 11} y="72" fontSize="6.5" fill="#9CA3AF" textAnchor="middle">{m}</text>
              </g>
            );
          })}
          <rect x="10" y="2" width="6" height="4" rx="1" fill="#4a6b8c" fillOpacity="0.7" />
          <text x="18" y="6.5" fontSize="5.5" fill="#6B7B8D">Renda</text>
          <rect x="50" y="2" width="6" height="4" rx="1" fill="#c0392b" fillOpacity="0.55" />
          <text x="58" y="6.5" fontSize="5.5" fill="#6B7B8D">Gastos</text>
        </svg>
      </div>

      {/* Despesas */}
      <div className="bg-white rounded-xl border border-[#EDEFF2] overflow-hidden">
        <div className="px-4 py-2 border-b border-[#EDEFF2]">
          <p className="text-[0.55rem] font-semibold tracking-widest uppercase" style={{ color: "#6B7B8D" }}>Maiores despesas · Jun</p>
        </div>
        {expenseRows.map((r, i) => {
          const pct = Math.round((r.v / expense[5]) * 100);
          return (
            <div key={i} className="flex items-center justify-between px-4 py-1.5 border-b border-[#EDEFF2] last:border-0">
              <span className="text-[0.68rem]" style={{ color: "#2E4659" }}>{r.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-14 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#EDEFF2" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#4a6b8c", opacity: 0.7 }} />
                </div>
                <span className="text-[0.65rem] tabular-nums w-8 text-right" style={{ color: "#6B7B8D" }}>{fmt(r.v)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── tab: Evolução ── */
function TabEvolucao() {
  const bars = [
    { r: 47, g: 36 }, { r: 57, g: 45 }, { r: 42, g: 58 },
    { r: 62, g: 39 }, { r: 51, g: 55 }, { r: 62, g: 49 },
  ];
  const pieSlices = [
    { pct: 38, color: "#2E4659" },
    { pct: 25, color: "#4a6b8c" },
    { pct: 20, color: "#3FAE7A" },
    { pct: 17, color: "#A8C0E0" },
  ];
  const pieLabels = ["Renda Fixa", "Multimercado", "Int'l", "Outros"];
  const pieArcs = buildPieArcs(pieSlices);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 border border-[#EDEFF2]">
          <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-1" style={{ color: "#6B7B8D" }}>Patrimônio atual</p>
          <p className="text-[1.15rem] font-bold tabular-nums" style={{ color: "#2E4659" }}>R$ 842k</p>
          <p className="text-[0.6rem] mt-0.5" style={{ color: "#6B7B8D" }}>jun 2026</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#EDEFF2]">
          <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-1" style={{ color: "#6B7B8D" }}>Crescimento total</p>
          <p className="text-[1.15rem] font-bold tabular-nums" style={{ color: "#3FAE7A" }}>+18,4%</p>
          <p className="text-[0.6rem] mt-0.5" style={{ color: "#6B7B8D" }}>desde jan 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 bg-white rounded-xl p-3 border border-[#EDEFF2]">
          <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-2" style={{ color: "#6B7B8D" }}>Evolução mensal</p>
          <svg viewBox="0 0 200 82" width="100%" style={{ display: "block" }}>
            <line x1="10" y1="70" x2="195" y2="70" stroke="#EDEFF2" strokeWidth="1" />
            {bars.map((b, i) => {
              const x = 18 + i * 30;
              return (
                <g key={i}>
                  <rect x={x}      y={70 - b.r} width="10" height={b.r} rx="2" fill="#4a6b8c" fillOpacity="0.7" />
                  <rect x={x + 12} y={70 - b.g} width="10" height={b.g} rx="2" fill="#3FAE7A" fillOpacity="0.75" />
                  <text x={x + 11} y="80" fontSize="6.5" fill="#9CA3AF" textAnchor="middle">{MONTHS[i]}</text>
                </g>
              );
            })}
            <rect x="10" y="2" width="6" height="4" rx="1" fill="#4a6b8c" fillOpacity="0.7" />
            <text x="18" y="6.5" fontSize="5.5" fill="#6B7B8D">Patrimônio</text>
            <rect x="62" y="2" width="6" height="4" rx="1" fill="#3FAE7A" fillOpacity="0.75" />
            <text x="70" y="6.5" fontSize="5.5" fill="#6B7B8D">Aportes</text>
          </svg>
        </div>
        <div className="col-span-5 bg-white rounded-xl p-3 border border-[#EDEFF2]">
          <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-2" style={{ color: "#6B7B8D" }}>Carteira</p>
          <svg viewBox="0 0 104 104" width="60" className="mx-auto block mb-2">
            {pieArcs.map((arc, i) => <path key={i} d={arc.d} fill={arc.color} />)}
            <circle cx="52" cy="52" r="22" fill="white" />
          </svg>
          <div className="flex flex-col gap-1">
            {pieSlices.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-[0.55rem]" style={{ color: "#6B7B8D" }}>{pieLabels[i]}</span>
                <span className="text-[0.55rem] font-semibold tabular-nums ml-auto" style={{ color: "#2E4659" }}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── tab: Portfólio ── */
function TabPortfolio() {
  const pieSlices = [
    { pct: 38, color: "#2E4659" },
    { pct: 25, color: "#4a6b8c" },
    { pct: 20, color: "#3FAE7A" },
    { pct: 17, color: "#A8C0E0" },
  ];
  const pieArcs = buildPieArcs(pieSlices);

  const holdings = [
    { name: "Tesouro IPCA+ 2035",    type: "Renda Fixa",    val: "R$ 168k", pct: "20%" },
    { name: "Tesouro Selic 2027",     type: "Renda Fixa",   val: "R$ 82k",  pct: "10%" },
    { name: "Kinea Prev FIM",         type: "Multimercado", val: "R$ 142k", pct: "17%" },
    { name: "BTG Pactual FIC FIM",    type: "Multimercado", val: "R$ 68k",  pct: "8%"  },
    { name: "Vanguard S&P 500 ETF",   type: "Int'l",        val: "R$ 108k", pct: "13%" },
    { name: "iShares MSCI World",     type: "Int'l",        val: "R$ 61k",  pct: "7%"  },
  ];

  const typeColor: Record<string, string> = {
    "Renda Fixa":    "#2E4659",
    "Multimercado":  "#4a6b8c",
    "Int'l":         "#3FAE7A",
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Total + pizza */}
      <div className="grid grid-cols-12 gap-3 items-center">
        <div className="col-span-5">
          <div className="bg-white rounded-xl p-4 border border-[#EDEFF2] mb-3">
            <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-1" style={{ color: "#6B7B8D" }}>Patrimônio total</p>
            <p className="text-[1.1rem] font-bold tabular-nums" style={{ color: "#2E4659" }}>R$ 842k</p>
          </div>
          <svg viewBox="0 0 104 104" width="72" className="mx-auto block">
            {pieArcs.map((arc, i) => <path key={i} d={arc.d} fill={arc.color} />)}
            <circle cx="52" cy="52" r="22" fill="white" />
            <text x="52" y="50" fontSize="8" fill="#2E4659" textAnchor="middle" fontWeight="600">842k</text>
            <text x="52" y="60" fontSize="6" fill="#6B7B8D" textAnchor="middle">total</text>
          </svg>
        </div>

        {/* Alocação */}
        <div className="col-span-7 bg-white rounded-xl p-3 border border-[#EDEFF2]">
          <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-2.5" style={{ color: "#6B7B8D" }}>Alocação</p>
          {[
            { label: "Renda Fixa",   pct: 38, color: "#2E4659" },
            { label: "Multimercado", pct: 25, color: "#4a6b8c" },
            { label: "Internacional",pct: 20, color: "#3FAE7A" },
            { label: "Outros",       pct: 17, color: "#A8C0E0" },
          ].map((a) => (
            <div key={a.label} className="mb-2">
              <div className="flex justify-between mb-0.5">
                <span className="text-[0.6rem]" style={{ color: "#2E4659" }}>{a.label}</span>
                <span className="text-[0.6rem] tabular-nums font-semibold" style={{ color: "#2E4659" }}>{a.pct}%</span>
              </div>
              <div className="h-1 rounded-full w-full" style={{ backgroundColor: "#EDEFF2" }}>
                <div className="h-full rounded-full" style={{ width: `${a.pct}%`, backgroundColor: a.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-white rounded-xl border border-[#EDEFF2] overflow-hidden">
        <div className="px-4 py-2 border-b border-[#EDEFF2]">
          <p className="text-[0.55rem] font-semibold tracking-widest uppercase" style={{ color: "#6B7B8D" }}>Posições</p>
        </div>
        {holdings.map((h, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-1.5 border-b border-[#EDEFF2] last:border-0">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="shrink-0 text-[0.5rem] font-semibold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: `${typeColor[h.type]}18`, color: typeColor[h.type] }}
              >
                {h.type}
              </span>
              <span className="text-[0.65rem] truncate" style={{ color: "#2E4659" }}>{h.name}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span className="text-[0.65rem] tabular-nums" style={{ color: "#6B7B8D" }}>{h.pct}</span>
              <span className="text-[0.65rem] tabular-nums font-semibold" style={{ color: "#2E4659" }}>{h.val}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── componente principal ── */
const TABS = ["Mapa", "Evolução", "Portfólio"];

export function PortalMock() {
  const [active, setActive] = useState(1); // Evolução por padrão

  return (
    <div
      className="rounded-2xl border border-[#EDEFF2] overflow-hidden select-none"
      style={{ boxShadow: "0 8px 40px rgba(74,107,140,0.10)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-[#EDEFF2]"
        style={{ backgroundColor: "#2E4659" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[0.65rem] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
            Midlej Capital
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span className="text-[0.72rem] font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
            João Henrique
          </span>
        </div>
        <span className="text-[0.6rem] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>Sair</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EDEFF2] bg-white">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className="flex-1 py-2.5 text-xs text-center font-medium transition-colors duration-150"
            style={
              active === i
                ? { color: "#2E4659", borderBottom: "2px solid #2E4659" }
                : { color: "#6B7B8D" }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div style={{ backgroundColor: "#F9FAFB" }} className="px-5 pt-4 pb-5">
        {active === 0 && <TabMapa />}
        {active === 1 && <TabEvolucao />}
        {active === 2 && <TabPortfolio />}
      </div>
    </div>
  );
}
