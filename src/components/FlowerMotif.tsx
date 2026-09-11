interface FlowerMotifProps {
  className?: string;
  size?: number;
  petalColor?: string;
  centerColor?: string;
  opacity?: number;
}

export default function FlowerMotif({
  className = '',
  size = 120,
  petalColor = '#F1A7C1',
  centerColor = '#7A1B2E',
  opacity = 1,
}: FlowerMotifProps) {
  // 8 symmetrical elliptical petals radiating from the center
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none transition-transform duration-700 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="flowerPetalGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={petalColor} stopOpacity="1" />
          <stop offset="100%" stopColor={petalColor} stopOpacity="0.85" />
        </radialGradient>
      </defs>

      <g transform="translate(100, 100)">
        {petals.map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-55"
            rx="24"
            ry="46"
            fill="url(#flowerPetalGrad)"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Subtle center ring and core */}
        <circle cx="0" cy="0" r="16" fill={centerColor} />
        <circle cx="0" cy="0" r="8" fill={petalColor} />
      </g>
    </svg>
  );
}
