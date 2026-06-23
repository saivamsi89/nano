/**
 * Premium hero visual — a studio-lit PCB "product shot": subtle 3D tilt, board
 * thickness, glossy solder mask, symmetric engineered trace routing with
 * flowing current, a glowing processor, gold contacts, contact shadow, bokeh
 * and vignette. Pure SVG + CSS animation; lives inside the dark hero.
 */
const traces = [
  "M250 205 H180 L150 175 H92",
  "M250 245 H180 L150 275 H92",
  "M350 205 H420 L450 175 H508",
  "M350 245 H420 L450 275 H508",
  "M285 190 V120 L255 96 H150",
  "M315 190 V120 L345 96 H450",
  "M285 260 V330 L255 356 H150",
  "M315 260 V330 L345 356 H450",
];

const vias = [
  [92, 175], [92, 275], [508, 175], [508, 275],
  [150, 96], [450, 96], [150, 356], [450, 356],
];

const smd = [
  [170, 150], [430, 150], [170, 300], [430, 300], [300, 120], [300, 330],
];

function buildSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 460" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Precision printed circuit board">
  <defs>
    <radialGradient id="hb-amb" cx="0.5" cy="0.46" r="0.6">
      <stop offset="0" stop-color="#1bd86a" stop-opacity="0.5"/>
      <stop offset="0.6" stop-color="#0e9c4a" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#0e9c4a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hb-mask" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0" stop-color="#1c6b40"/>
      <stop offset="0.45" stop-color="#0c3422"/>
      <stop offset="1" stop-color="#072018"/>
    </linearGradient>
    <linearGradient id="hb-edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a2c1c"/>
      <stop offset="0.5" stop-color="#caa26a"/>
      <stop offset="0.55" stop-color="#8a6a3e"/>
      <stop offset="1" stop-color="#041610"/>
    </linearGradient>
    <linearGradient id="hb-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff0c2"/>
      <stop offset="0.45" stop-color="#f0cf78"/>
      <stop offset="1" stop-color="#bd8f30"/>
    </linearGradient>
    <linearGradient id="hb-trace" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6bf3a0"/>
      <stop offset="1" stop-color="#15a04c"/>
    </linearGradient>
    <linearGradient id="hb-chip" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#2b303c"/>
      <stop offset="0.5" stop-color="#161922"/>
      <stop offset="1" stop-color="#05070c"/>
    </linearGradient>
    <linearGradient id="hb-gloss" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="0.35" stop-color="#ffffff" stop-opacity="0.02"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="hb-vig" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.6" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.55"/>
    </radialGradient>
    <filter id="hb-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="hb-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3"/></filter>
    <pattern id="hb-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#13864a" stroke-width="1.4" stroke-opacity="0.5"/>
    </pattern>
  </defs>

  <rect width="600" height="460" fill="#070a12"/>
  <ellipse cx="300" cy="215" rx="300" ry="210" fill="url(#hb-amb)" filter="url(#hb-soft)"/>
  ${[[70,90,9],[540,110,7],[110,400,10],[520,380,8],[300,40,5],[470,250,4]]
    .map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#46e08a" opacity="0.12" filter="url(#hb-blur)"/>`).join("")}

  <g class="animate-float-slow">
   <g transform="rotate(-3 300 220)">
    <ellipse cx="300" cy="392" rx="210" ry="26" fill="#000000" opacity="0.45" filter="url(#hb-soft)"/>
    <rect x="78" y="86" width="444" height="300" rx="24" fill="url(#hb-edge)"/>
    <rect x="78" y="78" width="444" height="300" rx="24" fill="#06201a"/>
    <rect x="78" y="78" width="444" height="300" rx="24" fill="url(#hb-mask)"/>
    <rect x="78" y="78" width="444" height="300" rx="24" fill="url(#hb-hatch)" opacity="0.25"/>
    <rect x="78" y="78" width="444" height="300" rx="24" fill="none" stroke="#5ef0a0" stroke-opacity="0.28" stroke-width="1.4"/>
    <rect x="92" y="92" width="416" height="272" rx="16" fill="none" stroke="#5ef0a0" stroke-opacity="0.12"/>

    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      ${traces.map(d=>`<path d="${d}" stroke="#46e08a" stroke-width="6" stroke-opacity="0.18" filter="url(#hb-blur)"/>`).join("")}
      ${traces.map(d=>`<path d="${d}" stroke="#1c7a48" stroke-width="2.4"/>`).join("")}
      ${traces.map(d=>`<path class="hb-flow" d="${d}" stroke="url(#hb-trace)" stroke-width="2.4"/>`).join("")}
    </g>

    ${vias.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.5" fill="url(#hb-gold)"/><circle cx="${x}" cy="${y}" r="2" fill="#06201a"/>`).join("")}

    ${smd.map(([x,y])=>`
      <rect x="${x-9}" y="${y-5}" width="18" height="10" rx="2" fill="#0c1018"/>
      <rect x="${x-12}" y="${y-4}" width="3.5" height="8" rx="1" fill="url(#hb-gold)"/>
      <rect x="${x+8.5}" y="${y-4}" width="3.5" height="8" rx="1" fill="url(#hb-gold)"/>
      <rect x="${x-7}" y="${y-4}" width="14" height="2.4" rx="1" fill="#ffffff" opacity="0.10"/>`).join("")}

    <rect x="244" y="178" width="112" height="94" rx="16" fill="#1bd86a" opacity="0.22" filter="url(#hb-soft)"/>
    ${Array.from({length:9}).map((_,i)=>`
      <rect x="${256+i*10.5}" y="170" width="5" height="13" rx="1.5" fill="url(#hb-gold)"/>
      <rect x="${256+i*10.5}" y="277" width="5" height="13" rx="1.5" fill="url(#hb-gold)"/>`).join("")}
    ${Array.from({length:7}).map((_,i)=>`
      <rect x="232" y="${196+i*10.5}" width="13" height="5" rx="1.5" fill="url(#hb-gold)"/>
      <rect x="355" y="${196+i*10.5}" width="13" height="5" rx="1.5" fill="url(#hb-gold)"/>`).join("")}
    <rect x="250" y="190" width="100" height="80" rx="12" fill="url(#hb-chip)"/>
    <rect x="250" y="190" width="100" height="80" rx="12" fill="none" stroke="#4adf86" stroke-opacity="0.5"/>
    <rect x="258" y="197" width="64" height="30" rx="8" fill="#ffffff" opacity="0.06"/>
    <circle class="hb-pulse" cx="266" cy="206" r="3.4" fill="#5ef79b"/>
    <text x="300" y="238" text-anchor="middle" font-family="monospace" font-size="13" letter-spacing="3" fill="#54e08f" fill-opacity="0.9">NF-1</text>

    ${Array.from({length:13}).map((_,i)=>`<rect x="${228+i*12}" y="366" width="8" height="18" rx="2" fill="url(#hb-gold)"/><rect x="${228+i*12}" y="366" width="8" height="4" rx="2" fill="#ffffff" opacity="0.3"/>`).join("")}

    <rect x="78" y="78" width="444" height="300" rx="24" fill="url(#hb-gloss)"/>
   </g>
  </g>

  <rect width="600" height="460" fill="url(#hb-vig)"/>
</svg>`;
}

export function HeroBoard() {
  return (
    <div
      className="h-full w-full"
      dangerouslySetInnerHTML={{ __html: buildSvg() }}
    />
  );
}
