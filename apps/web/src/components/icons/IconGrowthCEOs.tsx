interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * CEO launching rocket icon representing growth-focused CEOs.
 * Shows a person silhouette with a launching rocket and growth chart.
 */
export function IconGrowthCEOs({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Person head */}
      <circle
        cx="12"
        cy="32"
        r="5"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Person body (standing, pointing up) */}
      <path
        d="M6 46V42C6 39 9 38 12 38C15 38 18 39 18 42V46"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Arm pointing up at rocket */}
      <path
        d="M16 40L22 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Rocket body */}
      <path
        d="M32 8L38 4L42 10L36 28L28 28L32 8Z"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Rocket nose cone */}
      <path
        d="M38 4L42 2L44 6L42 10L38 4Z"
        fill="currentColor"
        fillOpacity="0.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Rocket window */}
      <circle
        cx="35"
        cy="14"
        r="3"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Rocket fins */}
      <path
        d="M28 28L24 34L28 32"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M36 28L40 34L36 32"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Rocket flame/exhaust */}
      <path
        d="M30 28L32 38L34 32L36 40L38 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.7"
      />
      <path
        d="M32 32L34 44L36 32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.5"
      />

      {/* Speed lines */}
      <path
        d="M26 10L22 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
      <path
        d="M24 16L20 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <path
        d="M22 22L18 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />

      {/* Stars/sparkle */}
      <path
        d="M46 8L47 10L49 9L47 11L48 13L46 11L44 13L45 11L43 9L45 10L46 8Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <circle cx="26" cy="4" r="1" fill="currentColor" fillOpacity="0.4" />
      <circle cx="22" cy="8" r="0.8" fill="currentColor" fillOpacity="0.3" />

      {/* Mini growth chart in corner */}
      <path
        d="M2 24L2 18L8 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
      <path
        d="M2 24L4 22L6 23L8 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}
