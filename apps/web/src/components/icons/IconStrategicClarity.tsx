interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Brain with clarity beam icon representing strategic clarity.
 * Shows a brain with radiating light/clarity beams.
 */
export function IconStrategicClarity({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Brain outline - left hemisphere */}
      <path
        d="M12 24C12 18 15 12 20 10C18 14 19 18 22 20C20 22 20 26 22 28C19 28 16 30 16 34C12 32 12 28 12 24Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Brain outline - right hemisphere */}
      <path
        d="M36 24C36 18 33 12 28 10C30 14 29 18 26 20C28 22 28 26 26 28C29 28 32 30 32 34C36 32 36 28 36 24Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Brain center connection */}
      <path
        d="M22 20H26M22 28H26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Clarity beam - top */}
      <path
        d="M24 6V2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 6L22 4M24 6L26 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />

      {/* Clarity beam - top right */}
      <path
        d="M38 10L42 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Clarity beam - top left */}
      <path
        d="M10 10L6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Clarity beam - sides */}
      <path
        d="M42 24H46M2 24H6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Inner glow/light point */}
      <circle
        cx="24"
        cy="24"
        r="3"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <circle
        cx="24"
        cy="24"
        r="1.5"
        fill="currentColor"
      />

      {/* Bottom subtle rays */}
      <path
        d="M18 40L16 44M24 40V44M30 40L32 44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
    </svg>
  );
}
