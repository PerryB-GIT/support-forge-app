interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Rocket with clock icon representing speed to value.
 * Shows a rocket launching with a clock/timer element.
 */
export function IconSpeedToValue({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rocket body */}
      <path
        d="M28 6C28 6 36 10 36 22C36 28 32 34 28 38L24 36L20 38C16 34 12 28 12 22C12 10 20 6 20 6C20 6 22 8 24 8C26 8 28 6 28 6Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Rocket window */}
      <circle
        cx="24"
        cy="18"
        r="4"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Rocket fins */}
      <path
        d="M12 28L8 32L12 34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 28L40 32L36 34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rocket flame */}
      <path
        d="M20 38L22 44L24 40L26 44L28 38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Clock circle (bottom right) */}
      <circle
        cx="38"
        cy="40"
        r="6"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Clock hands */}
      <path
        d="M38 37V40H41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Speed lines */}
      <path
        d="M4 14L8 16M4 20L10 20M4 26L8 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
