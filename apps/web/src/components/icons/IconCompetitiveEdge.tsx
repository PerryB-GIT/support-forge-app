interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * First place flag icon representing competitive edge.
 * Shows a flag on a podium with #1 indicator.
 */
export function IconCompetitiveEdge({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Podium - first place (center, tallest) */}
      <rect
        x="16"
        y="32"
        width="16"
        height="14"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Podium - second place (left) */}
      <rect
        x="4"
        y="38"
        width="12"
        height="8"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />

      {/* Podium - third place (right) */}
      <rect
        x="32"
        y="40"
        width="12"
        height="6"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />

      {/* Flag pole */}
      <path
        d="M24 32V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Flag */}
      <path
        d="M24 6L40 12L24 18V6Z"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Number 1 on flag */}
      <path
        d="M30 10V14M29 11L30 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Star/sparkle effects */}
      <path
        d="M42 4L43 6L45 5L43 7L44 9L42 7L40 9L41 7L39 5L41 6L42 4Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M8 8L9 10L11 9L9 11L10 13L8 11L6 13L7 11L5 9L7 10L8 8Z"
        fill="currentColor"
        fillOpacity="0.4"
      />

      {/* Podium labels */}
      <text
        x="24"
        y="42"
        fontSize="8"
        fill="currentColor"
        textAnchor="middle"
        fontWeight="bold"
      >
        1
      </text>
      <text
        x="10"
        y="44"
        fontSize="6"
        fill="currentColor"
        textAnchor="middle"
        fillOpacity="0.6"
      >
        2
      </text>
      <text
        x="38"
        y="45"
        fontSize="6"
        fill="currentColor"
        textAnchor="middle"
        fillOpacity="0.6"
      >
        3
      </text>
    </svg>
  );
}
