interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Growing company skyline icon representing mid-market leaders.
 * Shows buildings with upward growth trajectory.
 */
export function IconMidMarketLeaders({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Building 1 - short (left) */}
      <rect
        x="4"
        y="30"
        width="8"
        height="16"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      {/* Windows */}
      <rect x="6" y="33" width="2" height="2" fill="currentColor" fillOpacity="0.4" />
      <rect x="6" y="38" width="2" height="2" fill="currentColor" fillOpacity="0.4" />

      {/* Building 2 - medium (center-left) */}
      <rect
        x="14"
        y="24"
        width="8"
        height="22"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      {/* Windows */}
      <rect x="16" y="27" width="2" height="2" fill="currentColor" fillOpacity="0.5" />
      <rect x="16" y="32" width="2" height="2" fill="currentColor" fillOpacity="0.5" />
      <rect x="16" y="37" width="2" height="2" fill="currentColor" fillOpacity="0.5" />

      {/* Building 3 - tall (center) */}
      <rect
        x="24"
        y="16"
        width="10"
        height="30"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Windows */}
      <rect x="26" y="19" width="2" height="2" fill="currentColor" fillOpacity="0.6" />
      <rect x="30" y="19" width="2" height="2" fill="currentColor" fillOpacity="0.6" />
      <rect x="26" y="24" width="2" height="2" fill="currentColor" fillOpacity="0.6" />
      <rect x="30" y="24" width="2" height="2" fill="currentColor" fillOpacity="0.6" />
      <rect x="26" y="29" width="2" height="2" fill="currentColor" fillOpacity="0.6" />
      <rect x="30" y="29" width="2" height="2" fill="currentColor" fillOpacity="0.6" />
      <rect x="26" y="34" width="2" height="2" fill="currentColor" fillOpacity="0.6" />
      <rect x="30" y="34" width="2" height="2" fill="currentColor" fillOpacity="0.6" />

      {/* Building 4 - medium-tall (right) */}
      <rect
        x="36"
        y="22"
        width="8"
        height="24"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.65"
      />
      {/* Windows */}
      <rect x="38" y="25" width="2" height="2" fill="currentColor" fillOpacity="0.45" />
      <rect x="38" y="30" width="2" height="2" fill="currentColor" fillOpacity="0.45" />
      <rect x="38" y="35" width="2" height="2" fill="currentColor" fillOpacity="0.45" />

      {/* Growth arrow */}
      <path
        d="M6 22L14 16L24 12L40 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 2"
      />

      {/* Arrow head */}
      <path
        d="M36 4L42 6L38 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dollar sign on tallest building */}
      <text
        x="29"
        y="42"
        fontSize="6"
        fill="currentColor"
        textAnchor="middle"
        fontWeight="bold"
      >
        $
      </text>

      {/* Ground line */}
      <line
        x1="2"
        y1="46"
        x2="46"
        y2="46"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
    </svg>
  );
}
