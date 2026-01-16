interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Broken gear reassembling icon representing failed experiments.
 * Shows a cracked gear with pieces coming back together.
 */
export function IconFailedExperiments({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main gear body (cracked) */}
      <path
        d="M24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14Z"
        fill="currentColor"
        fillOpacity="0.1"
      />

      {/* Gear teeth */}
      <path
        d="M22 8H26V12H22V8ZM22 36H26V40H22V36ZM36 22V26H40V22H36ZM8 22V26H12V22H8Z"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M32.5 11.5L35.5 14.5L32.5 17.5L29.5 14.5L32.5 11.5ZM15.5 30.5L18.5 33.5L15.5 36.5L12.5 33.5L15.5 30.5ZM32.5 30.5L35.5 33.5L32.5 36.5L29.5 33.5L32.5 30.5ZM15.5 11.5L18.5 14.5L15.5 17.5L12.5 14.5L15.5 11.5Z"
        fill="currentColor"
        fillOpacity="0.3"
      />

      {/* Gear outline */}
      <circle
        cx="24"
        cy="24"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 2"
      />

      {/* Center hole */}
      <circle
        cx="24"
        cy="24"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Crack lines */}
      <path
        d="M24 14L26 20L24 24L22 20L24 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
      />
      <path
        d="M34 24L28 22L24 24L28 26L34 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
      />

      {/* Floating piece (top-right) */}
      <g transform="translate(2, -2)">
        <path
          d="M32 10L36 14L34 18L30 14L32 10Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>

      {/* Floating piece (bottom-left) */}
      <g transform="translate(-2, 2)">
        <path
          d="M10 30L14 34L12 38L8 34L10 30Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>

      {/* Reassembly arrows (curved) */}
      <path
        d="M38 12L36 16M36 16L40 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
      <path
        d="M8 36L12 34M12 34L10 38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
