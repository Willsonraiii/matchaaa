export function NepalFlag({ className = "" }: { className?: string }) {
  // Authentic Nepal flag — two crimson pennants with blue border, moon + sun
  return (
    <svg
      viewBox="0 0 246 300"
      className={className}
      aria-label="Flag of Nepal"
      role="img"
    >
      {/* Blue border */}
      <path
        d="M0 0 L223 119 H73 L223 234 L0 234 Z"
        fill="#003893"
      />
      {/* Crimson interior (inset by ~16 units along normals) */}
      <path
        d="M16 27 L196 119 H53 L196 219 L16 219 Z"
        fill="#DC143C"
      />
      {/* Moon (upper pennant) */}
      <g transform="translate(63 60)">
        <circle r="18" fill="#fff" />
        <circle r="14" cx="6" fill="#DC143C" />
      </g>
      {/* Sun (lower pennant) */}
      <g transform="translate(63 168)" fill="#fff">
        <circle r="16" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          const x = Math.cos(a) * 22;
          const y = Math.sin(a) * 22;
          return (
            <circle key={i} cx={x} cy={y} r="4" />
          );
        })}
      </g>
    </svg>
  );
}