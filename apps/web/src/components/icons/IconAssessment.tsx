interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * AI scanner analyzing icon representing assessment.
 * Shows a document/system being scanned with analysis indicators.
 */
export function IconAssessment({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Document/system background */}
      <rect
        x="8"
        y="4"
        width="24"
        height="32"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Document content lines */}
      <path
        d="M12 12H28M12 18H24M12 24H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />

      {/* Scan line (horizontal) */}
      <path
        d="M6 20H34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Scanner beam effect */}
      <path
        d="M6 18V22M34 18V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* AI analysis module (right side) */}
      <rect
        x="36"
        y="12"
        width="10"
        height="14"
        rx="2"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* AI eye/processor */}
      <circle
        cx="41"
        cy="17"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="41"
        cy="17"
        r="1"
        fill="currentColor"
      />

      {/* Analysis indicators */}
      <path
        d="M38 22H44"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M38 24H42"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />

      {/* Connection from scanner to AI */}
      <path
        d="M32 20H36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 1"
      />

      {/* Checkmarks / findings */}
      <path
        d="M26 30L28 32L32 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data flow dots */}
      <circle cx="8" cy="42" r="2" fill="currentColor" fillOpacity="0.3" />
      <circle cx="16" cy="42" r="2" fill="currentColor" fillOpacity="0.5" />
      <circle cx="24" cy="42" r="2" fill="currentColor" fillOpacity="0.7" />
      <circle cx="32" cy="42" r="2" fill="currentColor" fillOpacity="0.9" />

      {/* Arrow showing flow */}
      <path
        d="M36 42L40 42M38 40L40 42L38 44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
