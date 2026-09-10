export function TFlareFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,139,0.22),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(179,191,255,0.18),transparent_42%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          aria-hidden="true"
          className="h-[min(72vw,68vh)] w-auto"
          viewBox="-48 -88 514 624"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fallback-crossbar" x1="24.5" y1="52.5" x2="441.5" y2="52.5">
              <stop stopColor="#EDEDED" />
              <stop offset="0.7" stopColor="#EDEDED" />
              <stop offset="1" stopColor="#EDEDED" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="fallback-stem" x1="233" y1="12.5" x2="233" y2="523.5">
              <stop stopColor="#EDEDED" />
              <stop offset="0.35" stopColor="#EDEDED" />
              <stop offset="1" stopColor="#EDEDED" stopOpacity="0.15" />
            </linearGradient>
            <filter id="fallback-glow" x="-50%" y="-30%" width="200%" height="160%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <g opacity="0.6" filter="url(#fallback-glow)">
            <path d="M24.5 12.5H441.5V92.5H24.5V12.5Z" fill="#B3BFFF" />
            <path d="M197.5 12.5H268.5V523.5H197.5V12.5Z" fill="#22C78B" />
          </g>
          <path d="M24.5 12.5H441.5V92.5H24.5V12.5Z" fill="url(#fallback-crossbar)" />
          <path d="M197.5 12.5H268.5V523.5H197.5V12.5Z" fill="url(#fallback-stem)" />
        </svg>
      </div>
    </div>
  );
}
