interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Data graph with question mark representing ROI uncertainty.
 * Bar chart with a prominent question mark overlay.
 */
export function IconROIUncertainty({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Chart background grid */}
      <path
        d="M8 40V8M8 40H40M8 32H40M8 24H40M8 16H40"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.2"
      />

      {/* Bar chart bars */}
      <rect
        x="12"
        y="28"
        width="5"
        height="12"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <rect
        x="20"
        y="20"
        width="5"
        height="20"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <rect
        x="28"
        y="24"
        width="5"
        height="16"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <rect
        x="36"
        y="16"
        width="5"
        height="24"
        rx="1"
        fill="currentColor"
        fillOpacity="0.2"
        strokeDasharray="3 2"
        stroke="currentColor"
        strokeOpacity="0.4"
      />

      {/* Trend line going up with uncertainty */}
      <path
        d="M14 34L22 26L30 30L38 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 3"
      />

      {/* Question mark circle */}
      <circle
        cx="34"
        cy="12"
        r="8"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Question mark */}
      <path
        d="M31.5 10C31.5 8.5 32.5 7 34 7C35.5 7 36.5 8 36.5 9.5C36.5 10.5 36 11 35 11.5C34.5 11.75 34 12.25 34 13V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="34" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}
