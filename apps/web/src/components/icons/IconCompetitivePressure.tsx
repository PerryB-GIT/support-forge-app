interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Racing rockets icon representing competitive pressure.
 * Two rockets racing upward with motion trails.
 */
export function IconCompetitivePressure({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lead rocket */}
      <path
        d="M30 8L38 24L34 26L36 34L30 30L24 34L26 26L22 24L30 8Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M30 8L38 24L34 26L36 34L30 30L24 34L26 26L22 24L30 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lead rocket flame */}
      <path
        d="M28 34L30 40L32 34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Trailing rocket (smaller, behind) */}
      <path
        d="M14 18L20 30L17 31.5L18.5 37L14 34L9.5 37L11 31.5L8 30L14 18Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M14 18L20 30L17 31.5L18.5 37L14 34L9.5 37L11 31.5L8 30L14 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.7"
      />
      {/* Trailing rocket flame */}
      <path
        d="M12.5 37L14 42L15.5 37"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.7"
      />

      {/* Speed lines */}
      <path
        d="M40 12L44 10M42 18L46 17M40 24L44 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
