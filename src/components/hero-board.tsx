/**
 * Premium animated hero visual — a dark PCB with neon copper traces that
 * pulse with "current", a glowing processor and gold pads. Designed to live
 * inside the dark hero (no bright tile). Pure SVG + CSS/SMIL, no JS.
 */
const traces = [
  "M70 110 H170 L210 150 H250",
  "M540 120 H410 L370 160 H352",
  "M80 360 H190 L235 300 H252",
  "M520 360 H420 L378 300 H348",
  "M300 70 V150",
  "M300 392 V322",
  "M70 230 H160 L200 210 H250",
  "M540 240 H440 L400 250 H350",
];

export function HeroBoard() {
  return (
    <svg
      viewBox="0 0 600 460"
      width="100%"
      height="100%"
      role="img"
      aria-label="Animated printed circuit board"
      className="block"
    >
      <defs>
        <linearGradient id="hb-board" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0e2a1d" />
          <stop offset="0.5" stopColor="#0a1f17" />
          <stop offset="1" stopColor="#071712" />
        </linearGradient>
        <linearGradient id="hb-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#123a28" />
          <stop offset="1" stopColor="#03100b" />
        </linearGradient>
        <linearGradient id="hb-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9a8" />
          <stop offset="1" stopColor="#c9962a" />
        </linearGradient>
        <linearGradient id="hb-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2230" />
          <stop offset="1" stopColor="#070a10" />
        </linearGradient>
        <radialGradient id="hb-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#22c55e" stopOpacity="0.55" />
          <stop offset="1" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
        <filter id="hb-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        <filter id="hb-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* ambient backlight */}
      <ellipse cx="300" cy="230" rx="250" ry="180" fill="url(#hb-glow)" filter="url(#hb-soft)" />

      {/* board with depth */}
      <g className="animate-float-slow" style={{ transformOrigin: "300px 230px" }}>
        <rect x="56" y="74" width="488" height="312" rx="22" fill="#03100b" opacity="0.8" />
        <rect x="52" y="66" width="488" height="312" rx="22" fill="url(#hb-edge)" />
        <rect x="52" y="66" width="488" height="312" rx="22" fill="url(#hb-board)" />
        <rect
          x="52"
          y="66"
          width="488"
          height="312"
          rx="22"
          fill="none"
          stroke="#34d471"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <rect
          x="66"
          y="80"
          width="460"
          height="284"
          rx="16"
          fill="none"
          stroke="#34d471"
          strokeOpacity="0.1"
        />

        {/* trace glow */}
        <g fill="none" stroke="#22c55e" strokeWidth="6" strokeOpacity="0.18" filter="url(#hb-blur)" strokeLinecap="round" strokeLinejoin="round">
          {traces.map((d, i) => (
            <path key={`g${i}`} d={d} />
          ))}
        </g>
        {/* trace base */}
        <g fill="none" stroke="#1f7a45" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {traces.map((d, i) => (
            <path key={`b${i}`} d={d} />
          ))}
        </g>
        {/* flowing current */}
        <g fill="none" stroke="#5ef79b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="hb-flow">
          {traces.map((d, i) => (
            <path key={`f${i}`} d={d} />
          ))}
        </g>

        {/* moving light pulses */}
        {traces.map((d, i) => (
          <circle key={`p${i}`} r="2.6" fill="#aaffcb">
            <animateMotion dur={`${2.6 + (i % 4) * 0.6}s`} repeatCount="indefinite" path={d} begin={`${i * 0.4}s`} />
          </circle>
        ))}

        {/* vias */}
        {[
          [110, 140], [470, 150], [120, 320], [460, 320], [300, 110], [300, 360], [180, 230], [420, 240],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4.5" fill="url(#hb-gold)" />
            <circle cx={cx} cy={cy} r="2" fill="#03100b" />
          </g>
        ))}

        {/* SMD components */}
        {[[150, 150], [430, 160], [160, 300], [300, 130]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 8} y={y - 5} width="16" height="10" rx="1.5" fill="#0a0d12" stroke="#1f2733" />
            <rect x={x - 11} y={y - 4} width="3" height="8" fill="url(#hb-gold)" />
            <rect x={x + 8} y={y - 4} width="3" height="8" fill="url(#hb-gold)" />
          </g>
        ))}

        {/* central processor */}
        <g>
          <rect x="244" y="184" width="112" height="92" rx="12" fill="#22c55e" opacity="0.18" filter="url(#hb-soft)" />
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={i}>
              <rect x={258 + i * 10.5} y="172" width="5" height="13" rx="1.5" fill="url(#hb-gold)" />
              <rect x={258 + i * 10.5} y="275" width="5" height="13" rx="1.5" fill="url(#hb-gold)" />
            </g>
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={`s${i}`}>
              <rect x="232" y={196 + i * 10.5} width="13" height="5" rx="1.5" fill="url(#hb-gold)" />
              <rect x="355" y={196 + i * 10.5} width="13" height="5" rx="1.5" fill="url(#hb-gold)" />
            </g>
          ))}
          <rect x="250" y="190" width="100" height="80" rx="10" fill="url(#hb-chip)" />
          <rect x="250" y="190" width="100" height="80" rx="10" fill="none" stroke="#34d471" strokeOpacity="0.4" />
          <rect x="258" y="198" width="50" height="26" rx="5" fill="#ffffff" opacity="0.04" />
          <circle cx="264" cy="204" r="3.5" fill="#5ef79b" className="hb-pulse" />
          <text x="300" y="236" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#4ade80" fillOpacity="0.85" letterSpacing="2">
            NF-1
          </text>
        </g>

        {/* gold edge connector */}
        <g>
          {Array.from({ length: 13 }).map((_, i) => (
            <rect key={i} x={228 + i * 12} y="366" width="8" height="16" rx="2" fill="url(#hb-gold)" />
          ))}
        </g>
      </g>
    </svg>
  );
}
