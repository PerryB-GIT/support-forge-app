interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Two heads connecting icon representing discovery/consultation.
 * Shows two profile heads with connection lines between them.
 */
export function IconDiscovery({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left head profile */}
      <path
        d="M6 32C6 32 6 26 10 22C14 18 14 14 12 12C10 10 12 6 16 6C20 6 22 10 20 14C18 18 20 24 20 28"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right head profile (mirrored) */}
      <path
        d="M42 32C42 32 42 26 38 22C34 18 34 14 36 12C38 10 36 6 32 6C28 6 26 10 28 14C30 18 28 24 28 28"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Connection lines between heads */}
      <path
        d="M20 16H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      <path
        d="M20 22H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 28H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />

      {/* Central connection point/spark */}
      <circle
        cx="24"
        cy="22"
        r="3"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <circle
        cx="24"
        cy="22"
        r="1.5"
        fill="currentColor"
      />

      {/* Thought bubbles / ideas */}
      <circle
        cx="14"
        cy="4"
        r="2"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <circle
        cx="34"
        cy="4"
        r="2"
        fill="currentColor"
        fillOpacity="0.4"
      />

      {/* Base line */}
      <path
        d="M8 40H40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />

      {/* Standing figures indication */}
      <path
        d="M12 32V40M36 32V40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
