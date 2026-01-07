"use client";

import { ReactNode } from "react";

// Animated Target Icon for Excellence
export const ExcellenceIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <defs>
      <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    {/* Outer pulsing ring */}
    <circle cx="24" cy="24" r="20" fill="none" stroke="url(#targetGrad)" strokeWidth="2" opacity="0.3">
      <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
    </circle>
    {/* Middle ring */}
    <circle cx="24" cy="24" r="14" fill="none" stroke="url(#targetGrad)" strokeWidth="2" opacity="0.5">
      <animate attributeName="r" values="12;15;12" dur="2s" repeatCount="indefinite" begin="0.3s" />
      <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" begin="0.3s" />
    </circle>
    {/* Inner ring */}
    <circle cx="24" cy="24" r="8" fill="none" stroke="url(#targetGrad)" strokeWidth="2" />
    {/* Bullseye */}
    <circle cx="24" cy="24" r="3" fill="#8B5CF6">
      <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

// Animated Handshake Icon for Integrity
export const IntegrityIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <defs>
      <filter id="integrityGlow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#integrityGlow)">
      {/* Left hand */}
      <path
        d="M8 28 L14 24 L20 28 L24 24"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate attributeName="stroke" values="#8B5CF6;#A78BFA;#8B5CF6" dur="2s" repeatCount="indefinite" />
      </path>
      {/* Right hand */}
      <path
        d="M24 24 L28 28 L34 24 L40 28"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate attributeName="stroke" values="#8B5CF6;#A78BFA;#8B5CF6" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </path>
      {/* Connection pulse */}
      <circle cx="24" cy="26" r="3" fill="#A78BFA">
        <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

// Animated Lightbulb Icon for Innovation
export const InnovationIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <defs>
      <radialGradient id="bulbGlow" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </radialGradient>
    </defs>
    {/* Sparks */}
    <g>
      <circle cx="12" cy="12" r="2" fill="#A78BFA">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="14;10;14" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="36" cy="14" r="1.5" fill="#8B5CF6">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="cy" values="16;12;16" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="24" cy="6" r="1.5" fill="#A78BFA">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.25s" />
        <animate attributeName="cy" values="8;4;8" dur="1.5s" repeatCount="indefinite" begin="0.25s" />
      </circle>
    </g>
    {/* Bulb */}
    <path
      d="M24 8 C16 8 12 14 12 20 C12 24 14 27 17 29 L17 34 L31 34 L31 29 C34 27 36 24 36 20 C36 14 32 8 24 8 Z"
      fill="url(#bulbGlow)"
      stroke="#8B5CF6"
      strokeWidth="1"
    >
      <animate attributeName="fill-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
    </path>
    {/* Base */}
    <rect x="18" y="35" width="12" height="3" rx="1" fill="#6B7280" />
    <rect x="19" y="39" width="10" height="2" rx="1" fill="#6B7280" />
    {/* Filament glow */}
    <path d="M21 22 L24 18 L27 22" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
    </path>
  </svg>
);

// Animated Collaboration Icon
export const CollaborationIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <defs>
      <linearGradient id="personGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    {/* Connection lines with animation */}
    <line x1="16" y1="24" x2="32" y2="24" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 2">
      <animate attributeName="stroke-dashoffset" values="0;12;0" dur="3s" repeatCount="indefinite" />
    </line>
    <line x1="24" y1="14" x2="24" y2="34" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 2">
      <animate attributeName="stroke-dashoffset" values="0;12;0" dur="3s" repeatCount="indefinite" begin="0.5s" />
    </line>
    {/* People */}
    <g>
      {/* Left person */}
      <circle cx="12" cy="20" r="4" fill="url(#personGrad)">
        <animate attributeName="r" values="4;4.5;4" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M6 32 C6 28 9 26 12 26 C15 26 18 28 18 32" fill="url(#personGrad)" />
    </g>
    <g>
      {/* Right person */}
      <circle cx="36" cy="20" r="4" fill="url(#personGrad)">
        <animate attributeName="r" values="4;4.5;4" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <path d="M30 32 C30 28 33 26 36 26 C39 26 42 28 42 32" fill="url(#personGrad)" />
    </g>
    {/* Center connection node */}
    <circle cx="24" cy="24" r="3" fill="#8B5CF6">
      <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

// Animated Checkmark Icon with draw effect
export const AnimatedCheck = ({ delay = 0 }: { delay?: number }) => (
  <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="24"
      strokeDashoffset="24"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="24"
        to="0"
        dur="0.5s"
        fill="freeze"
        begin={`${delay}s`}
      />
    </path>
  </svg>
);

// Value card component with hover animation
interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export const ValueCard = ({ icon, title, description, index }: ValueCardProps) => (
  <div
    className="group bg-background border border-border-subtle rounded-xl p-6 text-center hover:border-accent hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 hover:-translate-y-1"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="mb-4 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
    <p className="text-text-muted text-sm">{description}</p>
  </div>
);

// Milestone stat card with entrance animation
interface MilestoneCardProps {
  stat: string;
  description: string;
  index: number;
}

export const MilestoneCard = ({ stat, description, index }: MilestoneCardProps) => (
  <div
    className="bg-background border border-border-subtle rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300"
    style={{
      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
    }}
  >
    <div className="text-3xl font-bold text-accent mb-2">
      {stat}
    </div>
    <div className="text-sm text-text-muted">{description}</div>
    <style jsx>{`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  </div>
);

// Check item with animated icon
interface CheckItemProps {
  title: string;
  description: string;
  delay: number;
}

export const CheckItem = ({ title, description, delay }: CheckItemProps) => (
  <div className="flex items-start gap-4 group">
    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
      <AnimatedCheck delay={delay} />
    </div>
    <div>
      <h4 className="font-semibold text-text-primary">{title}</h4>
      <p className="text-text-muted">{description}</p>
    </div>
  </div>
);
