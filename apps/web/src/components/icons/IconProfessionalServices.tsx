interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Professional services icon with law gavel and AI elements.
 * Shows a gavel combined with circuit/AI chip patterns.
 */
export function IconProfessionalServices({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gavel head */}
      <rect
        x="4"
        y="10"
        width="20"
        height="10"
        rx="2"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(-30 4 10)"
      />

      {/* Gavel head detailed - top portion */}
      <path
        d="M8 6L28 16"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M8 6L28 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />

      {/* Gavel handle */}
      <path
        d="M20 22L32 40"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M20 22L32 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />

      {/* Sound block / striking surface */}
      <rect
        x="28"
        y="40"
        width="16"
        height="6"
        rx="1"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* AI Chip on the right side */}
      <rect
        x="34"
        y="14"
        width="12"
        height="12"
        rx="2"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Chip inner square */}
      <rect
        x="37"
        y="17"
        width="6"
        height="6"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Chip pins - top */}
      <path d="M37 14V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 14V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M43 14V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Chip pins - bottom */}
      <path d="M37 26V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 26V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M43 26V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Chip pins - left */}
      <path d="M34 17H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 20H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 23H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Chip pins - right */}
      <path d="M46 17H48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M46 20H48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M46 23H48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* AI text in chip */}
      <text
        x="40"
        y="22"
        fontSize="5"
        fill="currentColor"
        textAnchor="middle"
        fontWeight="bold"
        fillOpacity="0.8"
      >
        AI
      </text>

      {/* Connection lines between gavel and AI */}
      <path
        d="M28 16L32 17"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 1"
        strokeOpacity="0.5"
      />
      <path
        d="M26 20L32 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 1"
        strokeOpacity="0.5"
      />

      {/* Data flow dots */}
      <circle cx="30" cy="17" r="1" fill="currentColor" fillOpacity="0.4" />
      <circle cx="29" cy="20" r="1" fill="currentColor" fillOpacity="0.4" />

      {/* Scales of justice hint (small) */}
      <path
        d="M4 36H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <path
        d="M8 36V32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <path
        d="M4 32C4 34 6 34 6 32"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />
      <path
        d="M10 32C10 34 12 34 12 32"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />
    </svg>
  );
}
