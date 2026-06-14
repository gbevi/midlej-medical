"use client";

export function HeroViz() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden>
      <style>{`
        @keyframes hviz-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes hviz-bar {
          0%, 100% { transform: scaleY(0.45); }
          50%       { transform: scaleY(1); }
        }
        .hviz-wrap { animation: hviz-float 6s ease-in-out infinite; }
        .hviz-b1 { animation: hviz-bar 4s ease-in-out infinite 0.0s; transform-origin: center 300px; }
        .hviz-b2 { animation: hviz-bar 4s ease-in-out infinite 0.3s; transform-origin: center 300px; }
        .hviz-b3 { animation: hviz-bar 4s ease-in-out infinite 0.6s; transform-origin: center 300px; }
        .hviz-b4 { animation: hviz-bar 4s ease-in-out infinite 0.9s; transform-origin: center 300px; }
        .hviz-b5 { animation: hviz-bar 4s ease-in-out infinite 1.2s; transform-origin: center 300px; }
        .hviz-b6 { animation: hviz-bar 4s ease-in-out infinite 1.5s; transform-origin: center 300px; }
      `}</style>

      <div className="hviz-wrap w-full max-w-[500px]">
        <svg viewBox="0 0 500 400" width="100%" style={{ display: "block" }}>
          {/* Card */}
          <rect x="20" y="16" width="460" height="368" rx="16" fill="white"
            style={{ filter: "drop-shadow(0 8px 32px rgba(74,107,140,0.13))" }} />
          <rect x="20" y="16" width="460" height="368" rx="16" fill="white" stroke="#EDEFF2" strokeWidth="1" />

          {/* Badge */}
          <rect x="40" y="44" width="160" height="22" rx="11" fill="#F5F7FA" />
          <text x="120" y="59" fontFamily="ui-sans-serif,system-ui,sans-serif" fontSize="10"
            fontWeight="600" letterSpacing="0.1em" fill="#4a6b8c" textAnchor="middle">
            RETORNO ACUMULADO
          </text>

          {/* Big number */}
          <text x="40" y="108" fontFamily="ui-sans-serif,system-ui,sans-serif" fontSize="40"
            fontWeight="700" fill="#2E4659">
            +18,4%
          </text>
          <rect x="188" y="84" width="100" height="26" rx="13" fill="#3FAE7A" fillOpacity="0.15" />
          <text x="238" y="102" fontFamily="ui-sans-serif,system-ui,sans-serif" fontSize="11"
            fontWeight="600" fill="#3FAE7A" textAnchor="middle">
            ▲ 12 meses
          </text>

          {/* Baseline */}
          <line x1="40" y1="300" x2="460" y2="300" stroke="#EDEFF2" strokeWidth="1.5" />

          {/* Bars */}
          <rect x="52"  y={300 - 90}  width="50" height="90"  rx="6" fill="#4a6b8c" fillOpacity="0.80" className="hviz-b1" />
          <rect x="126" y={300 - 145} width="50" height="145" rx="6" fill="#4a6b8c" fillOpacity="0.85" className="hviz-b2" />
          <rect x="200" y={300 - 110} width="50" height="110" rx="6" fill="#3FAE7A" fillOpacity="0.80" className="hviz-b3" />
          <rect x="274" y={300 - 170} width="50" height="170" rx="6" fill="#4a6b8c" fillOpacity="0.85" className="hviz-b4" />
          <rect x="348" y={300 - 140} width="50" height="140" rx="6" fill="#3FAE7A" fillOpacity="0.80" className="hviz-b5" />
          <rect x="422" y={300 - 205} width="50" height="205" rx="6" fill="#3FAE7A" fillOpacity="0.90" className="hviz-b6" />

          {/* Trend line */}
          <polyline
            points="77,258 151,212 225,232 299,176 373,198 447,138"
            fill="none" stroke="#3FAE7A" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          />

          {/* Dots on trend */}
          {[[77,258],[151,212],[225,232],[299,176],[373,198],[447,138]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="5" fill="white" stroke="#3FAE7A" strokeWidth="2.5" />
          ))}

          {/* X-axis labels */}
          {["Jan","Mar","Mai","Jul","Set","Nov"].map((label, i) => (
            <text key={label} x={77 + i * 74} y="326"
              fontFamily="ui-sans-serif,system-ui,sans-serif" fontSize="10"
              fill="#B0BEC5" textAnchor="middle">
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
