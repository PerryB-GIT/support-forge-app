interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Executive with efficiency flows icon representing operational executives.
 * Shows a person silhouette with process/efficiency flow lines.
 */
export function IconOperationalExecutives({ size = 24, className = "" }: IconProps) {
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
        cx="16"
        cy="12"
        r="6"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Person body */}
      <path
        d="M8 44V32C8 28 12 26 16 26C20 26 24 28 24 32V44"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Arm pointing to flows */}
      <path
        d="M20 32L28 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Efficiency flow line 1 - horizontal process */}
      <path
        d="M30 14H44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 10L44 14L40 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Flow node 1 */}
      <circle
        cx="32"
        cy="14"
        r="3"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Efficiency flow line 2 - curved process */}
      <path
        d="M30 26C36 26 38 30 44 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 2"
      />

      {/* Flow node 2 */}
      <rect
        x="29"
        y="23"
        width="6"
        height="6"
        rx="1"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Efficiency flow line 3 */}
      <path
        d="M30 40H44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 36L44 40L40 44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Flow node 3 */}
      <circle
        cx="32"
        cy="40"
        r="3"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Gear/cog element indicating automation */}
      <circle
        cx="38"
        cy="26"
        r="4"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="38"
        cy="26"
        r="1.5"
        fill="currentColor"
        fillOpacity="0.5"
      />
      {/* Gear teeth */}
      <path
        d="M38 21V22M38 30V31M33 26H34M42 26H43M34.5 22.5L35.2 23.2M40.8 28.8L41.5 29.5M34.5 29.5L35.2 28.8M40.8 23.2L41.5 22.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Efficiency indicator - checkmarks */}
      <path
        d="M44 12L45 13L47 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
      />
      <path
        d="M44 38L45 39L47 37"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}
