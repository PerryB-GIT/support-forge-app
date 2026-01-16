interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Shield with AI chip icon representing risk mitigation.
 * Shows a protective shield with an AI/chip element inside.
 */
export function IconRiskMitigation({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield shape */}
      <path
        d="M24 4L6 12V22C6 32 14 40 24 44C34 40 42 32 42 22V12L24 4Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* AI Chip body */}
      <rect
        x="16"
        y="16"
        width="16"
        height="16"
        rx="2"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Chip center brain/AI symbol */}
      <circle
        cx="24"
        cy="24"
        r="4"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Chip center dot */}
      <circle cx="24" cy="24" r="1.5" fill="currentColor" />

      {/* Chip pins - top */}
      <path
        d="M20 16V12M24 16V12M28 16V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Chip pins - bottom */}
      <path
        d="M20 32V36M24 32V36M28 32V36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Chip pins - left */}
      <path
        d="M16 20H12M16 24H12M16 28H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Chip pins - right */}
      <path
        d="M32 20H36M32 24H36M32 28H36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
