interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Rocket launching from blueprint icon representing implementation.
 * Shows a rocket emerging from a blueprint/plan document.
 */
export function IconImplementation({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Blueprint/document base */}
      <rect
        x="4"
        y="24"
        width="28"
        height="20"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Blueprint grid lines */}
      <path
        d="M4 32H32M4 38H32M12 24V44M20 24V44"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.2"
      />

      {/* Blueprint rocket outline (faded) */}
      <path
        d="M22 30L26 36L24 37L22 36L20 37L18 36L22 30Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="2 1"
      />

      {/* Launching rocket */}
      <path
        d="M36 4L44 18L40 20L42 28L36 24L30 28L32 20L28 18L36 4Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rocket window */}
      <circle
        cx="36"
        cy="12"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Rocket flame */}
      <path
        d="M34 28L35 34L36 30L37 34L38 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Launch trail/smoke */}
      <path
        d="M30 34C28 36 26 35 24 38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      <path
        d="M32 38C30 40 28 39 26 42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />

      {/* Progress checkmarks on blueprint */}
      <path
        d="M6 28L7 29L9 27"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 34L7 35L9 33"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 40L7 41L9 39"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Speed/motion lines */}
      <path
        d="M44 8L46 6M46 14L48 13M44 20L46 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
