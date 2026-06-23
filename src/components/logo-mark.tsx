/**
 * NanoFab "N" monogram — a navy tile with white verticals and a glowing green
 * copper-trace diagonal terminated by PCB via nodes. `uid` must be unique per
 * instance on a page (SVG gradient ids are document-global).
 */
export function LogoMark({
  className,
  uid = "nf",
}: {
  className?: string;
  uid?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="NanoFab"
    >
      <defs>
        <linearGradient id={`${uid}-t`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#15153c" />
          <stop offset="1" stopColor="#090920" />
        </linearGradient>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5ef08a" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      <rect x="2" y="2" width="96" height="96" rx="26" fill={`url(#${uid}-t)`} />
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="26"
        fill="none"
        stroke="#2a2a55"
        strokeWidth="1.5"
      />
      <rect x="10" y="9" width="80" height="34" rx="18" fill="#ffffff" opacity="0.05" />

      <g strokeLinecap="round" fill="none">
        <path d="M32 70 V30" stroke="#f5f7fb" strokeWidth="11" />
        <path d="M68 70 V30" stroke="#f5f7fb" strokeWidth="11" />
        <path
          d="M32 30 L68 70"
          stroke="#22c55e"
          strokeWidth="15"
          strokeOpacity="0.35"
          filter={`url(#${uid}-glow)`}
        />
        <path d="M32 30 L68 70" stroke={`url(#${uid}-g)`} strokeWidth="11" />
      </g>

      <circle cx="32" cy="30" r="6.5" fill={`url(#${uid}-g)`} />
      <circle cx="32" cy="30" r="2.6" fill="#090920" />
      <circle cx="68" cy="70" r="6.5" fill={`url(#${uid}-g)`} />
      <circle cx="68" cy="70" r="2.6" fill="#090920" />
    </svg>
  );
}
