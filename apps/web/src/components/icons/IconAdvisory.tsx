interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Ongoing support/partnership icon representing advisory services.
 * Shows interlocking hands/partnership with continuous support symbolism.
 */
export function IconAdvisory({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular ongoing/continuous ring */}
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 4"
        strokeOpacity="0.3"
      />

      {/* Left hand/support */}
      <path
        d="M10 28C10 28 12 24 16 24C18 24 20 26 20 28C20 30 18 32 16 32C14 32 12 30 12 28"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right hand/support */}
      <path
        d="M38 28C38 28 36 24 32 24C30 24 28 26 28 28C28 30 30 32 32 32C34 32 36 30 36 28"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Handshake center connection */}
      <path
        d="M20 28H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Partnership heart/center */}
      <path
        d="M24 24C22 22 20 22 20 24C20 26 24 30 24 30C24 30 28 26 28 24C28 22 26 22 24 24Z"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Communication/support waves - left */}
      <path
        d="M8 18C6 20 6 24 8 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
      <path
        d="M4 16C1 20 1 26 4 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />

      {/* Communication/support waves - right */}
      <path
        d="M40 18C42 20 42 24 40 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
      <path
        d="M44 16C47 20 47 26 44 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />

      {/* Top guidance beacon */}
      <circle
        cx="24"
        cy="8"
        r="3"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="24"
        cy="8"
        r="1"
        fill="currentColor"
      />

      {/* Bottom foundation */}
      <path
        d="M16 40H32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 44H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />

      {/* Upward arrow (growth) */}
      <path
        d="M24 12V16M22 14L24 12L26 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
}
