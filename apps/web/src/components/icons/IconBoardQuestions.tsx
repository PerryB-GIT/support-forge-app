interface IconProps {
  size?: 24 | 48;
  className?: string;
}

/**
 * Boardroom/presentation icon representing board questions.
 * Shows a presentation screen with speech bubbles containing question marks.
 */
export function IconBoardQuestions({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Presentation screen */}
      <rect
        x="8"
        y="8"
        width="32"
        height="22"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Screen stand */}
      <path
        d="M24 30V36M18 36H30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Chart/data on screen */}
      <path
        d="M14 24V18M18 24V20M22 24V16M26 24V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />

      {/* AI/chart indicator */}
      <circle cx="32" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="32" cy="16" r="1" fill="currentColor" fillOpacity="0.5" />

      {/* Speech bubble 1 (left) */}
      <path
        d="M4 40C4 38.3431 5.34315 37 7 37H11C12.6569 37 14 38.3431 14 40V43C14 44.6569 12.6569 46 11 46H9L7 48L7 46H7C5.34315 46 4 44.6569 4 43V40Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="9"
        y="43"
        fontSize="7"
        fill="currentColor"
        textAnchor="middle"
        fontWeight="bold"
      >
        ?
      </text>

      {/* Speech bubble 2 (right) */}
      <path
        d="M34 40C34 38.3431 35.3431 37 37 37H41C42.6569 37 44 38.3431 44 40V43C44 44.6569 42.6569 46 41 46H39L37 48L37 46H37C35.3431 46 34 44.6569 34 43V40Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="39"
        y="43"
        fontSize="7"
        fill="currentColor"
        textAnchor="middle"
        fontWeight="bold"
      >
        ?
      </text>

      {/* Speech bubble 3 (center) */}
      <path
        d="M19 38C19 36.3431 20.3431 35 22 35H26C27.6569 35 29 36.3431 29 38V41C29 42.6569 27.6569 44 26 44H25L24 46L23 44H22C20.3431 44 19 42.6569 19 41V38Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="24"
        y="41"
        fontSize="7"
        fill="currentColor"
        textAnchor="middle"
        fontWeight="bold"
      >
        ?
      </text>
    </svg>
  );
}
