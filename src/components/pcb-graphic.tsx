import { cn } from "@/lib/utils";

/**
 * Photorealistic-ish PCB illustration rendered as SVG.
 * - `seed` varies the layout so each board looks distinct
 * - `tone` switches solder-mask colour (green / navy / slate)
 * Placeholder for real product photography: drop images into
 * /public/boards and swap this for <Image/> when ready.
 */
type Tone = "green" | "navy" | "slate";

const tones: Record<
  Tone,
  {
    maskLight: string;
    maskDark: string;
    pour: string;
    trace: string;
    traceGlow: string;
    pad: string;
    padDark: string;
    silk: string;
    body: string;
    bodyLight: string;
  }
> = {
  green: {
    maskLight: "#1a9c4a",
    maskDark: "#0a5e2b",
    pour: "#13803c",
    trace: "#2fbf66",
    traceGlow: "#8af0b0",
    pad: "#f6cf5a",
    padDark: "#c9962a",
    silk: "#eafff2",
    body: "#15151c",
    bodyLight: "#33333f",
  },
  navy: {
    maskLight: "#1d1d44",
    maskDark: "#0a0a22",
    pour: "#16163a",
    trace: "#3ad27a",
    traceGlow: "#7af0aa",
    pad: "#f6cf5a",
    padDark: "#c9962a",
    silk: "#dfe2ff",
    body: "#0c0c14",
    bodyLight: "#2a2a3a",
  },
  slate: {
    maskLight: "#33414f",
    maskDark: "#172029",
    pour: "#2a3744",
    trace: "#43d6a0",
    traceGlow: "#86f0c8",
    pad: "#fbcf54",
    padDark: "#cc9a2c",
    silk: "#eef2f6",
    body: "#10141a",
    bodyLight: "#2c333d",
  },
};

// deterministic PRNG so the same seed → same board
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function PcbGraphic({
  seed = 1,
  tone = "green",
  className,
}: {
  seed?: number;
  tone?: Tone;
  className?: string;
}) {
  const t = tones[tone];
  const rand = rng(seed * 131 + 17);
  const W = 400;
  const H = 300;
  const uid = `pcb-${seed}-${tone}`;

  // wandering copper traces
  const traces = Array.from({ length: 9 }).map(() => {
    const y = 26 + rand() * (H - 52);
    const x1 = 16 + rand() * 70;
    const x2 = W - 16 - rand() * 70;
    const midY = y + (rand() - 0.5) * 50;
    const step = 18 + rand() * 14;
    return {
      d: `M ${x1} ${y} L ${x1 + step} ${y} L ${x1 + step + 16} ${midY} L ${x2 - step} ${midY} L ${x2} ${midY + (rand() - 0.5) * 26}`,
      w: rand() > 0.5 ? 2.6 : 1.6,
    };
  });

  // vias with copper annular rings
  const vias = Array.from({ length: 22 }).map(() => ({
    x: 16 + rand() * (W - 32),
    y: 16 + rand() * (H - 32),
    r: 1.8 + rand() * 1.4,
  }));

  // SMD passives (0402/0805) with reference designators
  const passives = Array.from({ length: 9 }).map((_, i) => {
    const w = 9 + rand() * 12;
    const h = 5 + rand() * 4;
    return {
      x: 26 + rand() * (W - 110),
      y: 26 + rand() * (H - 80),
      w,
      h,
      vertical: rand() > 0.6,
      ref: ["R", "C", "L"][i % 3] + (1 + i),
    };
  });

  const fingers = Array.from({ length: 9 });
  const corners = [
    [22, 22],
    [W - 22, 22],
    [22, H - 22],
    [W - 22, H - 22],
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Printed circuit board"
    >
      <defs>
        <linearGradient id={`${uid}-mask`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.maskLight} />
          <stop offset="0.55" stopColor={t.maskDark} />
          <stop offset="1" stopColor={t.maskLight} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.bodyLight} />
          <stop offset="0.5" stopColor={t.body} />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
        <linearGradient id={`${uid}-pad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1b8" />
          <stop offset="0.5" stopColor={t.pad} />
          <stop offset="1" stopColor={t.padDark} />
        </linearGradient>
        <radialGradient id={`${uid}-gloss`} cx="0.32" cy="0.18" r="0.95">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
        </radialGradient>
        <pattern id={`${uid}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="7" fill="none" />
          <line x1="0" y1="0" x2="0" y2="7" stroke={t.pour} strokeWidth="2.4" />
        </pattern>
        <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="1.6" stdDeviation="1.6" floodColor="#000000" floodOpacity="0.45" />
        </filter>
        <filter id={`${uid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      {/* substrate */}
      <rect x="4" y="4" width={W - 8} height={H - 8} rx="18" fill={`url(#${uid}-mask)`} />

      {/* copper ground pour (hatched) along edges */}
      <rect x="4" y="4" width={W - 8} height={H - 8} rx="18" fill={`url(#${uid}-hatch)`} opacity="0.5" />
      <rect x="26" y="26" width={W - 52} height={H - 52} rx="10" fill={`url(#${uid}-mask)`} />

      {/* board outline highlight */}
      <rect
        x="4"
        y="4"
        width={W - 8}
        height={H - 8}
        rx="18"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />

      {/* trace glow then trace */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((tr, i) => (
          <path key={`g${i}`} d={tr.d} stroke={t.traceGlow} strokeOpacity="0.25" strokeWidth={tr.w + 2.5} filter={`url(#${uid}-soft)`} />
        ))}
        {traces.map((tr, i) => (
          <path key={`t${i}`} d={tr.d} stroke={t.trace} strokeWidth={tr.w} strokeOpacity="0.95" />
        ))}
      </g>

      {/* vias */}
      <g>
        {vias.map((v, i) => (
          <g key={i}>
            <circle cx={v.x} cy={v.y} r={v.r + 1.4} fill={`url(#${uid}-pad)`} />
            <circle cx={v.x} cy={v.y} r={v.r} fill={t.maskDark} />
          </g>
        ))}
      </g>

      {/* SMD passives */}
      <g>
        {passives.map((c, i) => {
          const w = c.vertical ? c.h : c.w;
          const h = c.vertical ? c.w : c.h;
          return (
            <g key={i} filter={`url(#${uid}-shadow)`}>
              <rect x={c.x} y={c.y} width={w} height={h} rx="1" fill={`url(#${uid}-body)`} />
              <rect x={c.x - 2.5} y={c.y} width="3" height={h} rx="0.8" fill={`url(#${uid}-pad)`} />
              <rect x={c.x + w - 0.5} y={c.y} width="3" height={h} rx="0.8" fill={`url(#${uid}-pad)`} />
              <text
                x={c.x + w / 2}
                y={c.y - 3}
                fill={t.silk}
                fillOpacity="0.55"
                fontSize="5.5"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {c.ref}
              </text>
            </g>
          );
        })}
      </g>

      {/* central QFP IC with gull-wing leads + pin-1 dot */}
      <g transform={`translate(${W / 2 - 42}, ${H / 2 - 36})`} filter={`url(#${uid}-shadow)`}>
        {/* leads */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`lt${i}`}>
            <rect x={10 + i * 8} y={-7} width="4.5" height="9" rx="1.2" fill={`url(#${uid}-pad)`} />
            <rect x={10 + i * 8} y={71} width="4.5" height="9" rx="1.2" fill={`url(#${uid}-pad)`} />
          </g>
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`ls${i}`}>
            <rect x={-7} y={8 + i * 8} width="9" height="4.5" rx="1.2" fill={`url(#${uid}-pad)`} />
            <rect x={77} y={8 + i * 8} width="9" height="4.5" rx="1.2" fill={`url(#${uid}-pad)`} />
          </g>
        ))}
        {/* body */}
        <rect width="84" height="72" rx="7" fill={`url(#${uid}-body)`} />
        <rect width="84" height="72" rx="7" fill="none" stroke="#ffffff" strokeOpacity="0.08" />
        <rect x="6" y="6" width="40" height="24" rx="4" fill="#ffffff" opacity="0.05" />
        <circle cx="14" cy="14" r="3.4" fill={t.silk} fillOpacity="0.55" />
        <text x="42" y="44" fill={t.silk} fillOpacity="0.4" fontSize="8" fontFamily="monospace" textAnchor="middle">
          U1
        </text>
      </g>

      {/* corner mounting holes */}
      <g>
        {corners.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="7" fill={`url(#${uid}-pad)`} />
            <circle cx={cx} cy={cy} r="4" fill={t.maskDark} />
          </g>
        ))}
      </g>

      {/* gold edge-connector fingers */}
      <g transform={`translate(${W / 2 - 72}, ${H - 24})`}>
        {fingers.map((_, i) => (
          <g key={i}>
            <rect x={i * 16} y="0" width="11" height="20" rx="2" fill={`url(#${uid}-pad)`} />
            <rect x={i * 16} y="0" width="11" height="4" rx="2" fill="#ffffff" opacity="0.25" />
          </g>
        ))}
      </g>

      {/* gloss / lighting */}
      <rect x="4" y="4" width={W - 8} height={H - 8} rx="18" fill={`url(#${uid}-gloss)`} />
    </svg>
  );
}
