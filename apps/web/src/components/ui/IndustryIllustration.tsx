interface IndustryIllustrationProps {
  industry:
    | "manufacturing"
    | "professional-services"
    | "healthcare"
    | "financial-services"
    | "technology"
    | "retail";
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Industry illustration placeholder with themed gradient backgrounds.
 * Maintains 4:3 aspect ratio (400x300) and includes industry name as fallback.
 */
export function IndustryIllustration({
  industry,
  className = "",
  size = "lg",
}: IndustryIllustrationProps) {
  const sizeClasses = {
    sm: "max-h-40",
    md: "max-h-56",
    lg: "",
  };

  const iconSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };
  const industryConfig = {
    manufacturing: {
      label: "Manufacturing",
      gradient: "from-slate-600 via-slate-700 to-slate-800",
      accentColor: "text-orange-400",
      icon: (
        <svg
          className="w-16 h-16 opacity-30"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Factory building */}
          <rect
            x="8"
            y="28"
            width="20"
            height="28"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <rect
            x="36"
            y="20"
            width="20"
            height="36"
            fill="currentColor"
            fillOpacity="0.5"
          />
          {/* Smokestacks */}
          <rect x="12" y="16" width="6" height="12" fill="currentColor" fillOpacity="0.3" />
          <rect x="22" y="12" width="6" height="16" fill="currentColor" fillOpacity="0.3" />
          {/* Smoke */}
          <circle cx="15" cy="10" r="4" fill="currentColor" fillOpacity="0.2" />
          <circle cx="25" cy="6" r="5" fill="currentColor" fillOpacity="0.15" />
          {/* Gear */}
          <circle cx="46" cy="36" r="8" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <circle cx="46" cy="36" r="3" fill="currentColor" fillOpacity="0.3" />
        </svg>
      ),
    },
    "professional-services": {
      label: "Professional Services",
      gradient: "from-indigo-600 via-indigo-700 to-indigo-900",
      accentColor: "text-indigo-300",
      icon: (
        <svg
          className="w-16 h-16 opacity-30"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Briefcase */}
          <rect
            x="12"
            y="22"
            width="40"
            height="28"
            rx="3"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <rect x="24" y="16" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
          {/* Handle */}
          <path
            d="M24 22V18C24 16.9 24.9 16 26 16H38C39.1 16 40 16.9 40 18V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
          {/* Divider */}
          <line x1="32" y1="28" x2="32" y2="44" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
        </svg>
      ),
    },
    healthcare: {
      label: "Healthcare",
      gradient: "from-teal-500 via-teal-600 to-teal-800",
      accentColor: "text-teal-200",
      icon: (
        <svg
          className="w-16 h-16 opacity-30"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Heart with cross */}
          <path
            d="M32 52C32 52 12 38 12 24C12 16 18 10 26 10C30 10 32 14 32 14C32 14 34 10 38 10C46 10 52 16 52 24C52 38 32 52 32 52Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          {/* Cross */}
          <rect x="28" y="22" width="8" height="20" rx="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="22" y="28" width="20" height="8" rx="1" fill="currentColor" fillOpacity="0.6" />
        </svg>
      ),
    },
    "financial-services": {
      label: "Financial Services",
      gradient: "from-emerald-600 via-emerald-700 to-emerald-900",
      accentColor: "text-emerald-300",
      icon: (
        <svg
          className="w-16 h-16 opacity-30"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chart bars */}
          <rect x="10" y="36" width="10" height="20" fill="currentColor" fillOpacity="0.3" />
          <rect x="24" y="28" width="10" height="28" fill="currentColor" fillOpacity="0.4" />
          <rect x="38" y="20" width="10" height="36" fill="currentColor" fillOpacity="0.5" />
          {/* Trend line */}
          <path
            d="M10 40L24 32L38 24L54 14"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          {/* Arrow */}
          <path
            d="M48 12L54 14L52 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.5"
          />
        </svg>
      ),
    },
    technology: {
      label: "Technology",
      gradient: "from-violet-600 via-purple-700 to-purple-900",
      accentColor: "text-violet-300",
      icon: (
        <svg
          className="w-16 h-16 opacity-30"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circuit board / chip */}
          <rect
            x="18"
            y="18"
            width="28"
            height="28"
            rx="4"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <rect x="24" y="24" width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.3" />
          {/* Pins */}
          <line x1="24" y1="18" x2="24" y2="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="32" y1="18" x2="32" y2="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="40" y1="18" x2="40" y2="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="24" y1="46" x2="24" y2="54" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="32" y1="46" x2="32" y2="54" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="40" y1="46" x2="40" y2="54" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="18" y1="26" x2="10" y2="26" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="18" y1="38" x2="10" y2="38" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="46" y1="26" x2="54" y2="26" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="46" y1="38" x2="54" y2="38" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
        </svg>
      ),
    },
    retail: {
      label: "Retail",
      gradient: "from-rose-500 via-rose-600 to-rose-800",
      accentColor: "text-rose-200",
      icon: (
        <svg
          className="w-16 h-16 opacity-30"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shopping bag */}
          <path
            d="M14 22H50L46 54H18L14 22Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          {/* Handle */}
          <path
            d="M24 22V16C24 11.6 27.6 8 32 8C36.4 8 40 11.6 40 16V22"
            stroke="currentColor"
            strokeWidth="3"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          {/* Tag/price indicator */}
          <circle cx="32" cy="36" r="6" fill="currentColor" fillOpacity="0.3" />
          <text
            x="32"
            y="39"
            textAnchor="middle"
            fontSize="8"
            fill="currentColor"
            fillOpacity="0.6"
          >
            $
          </text>
        </svg>
      ),
    },
  };

  const config = industryConfig[industry];

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${config.gradient} ${sizeClasses[size]} ${className}`}
      style={{ aspectRatio: "4/3" }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Decorative glow */}
      <div
        className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Icon */}
      <div className={`absolute inset-0 flex items-center justify-center text-white ${size === "sm" ? "[&>svg]:w-10 [&>svg]:h-10" : size === "md" ? "[&>svg]:w-12 [&>svg]:h-12" : ""}`}>
        {config.icon}
      </div>

      {/* Industry label overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <span className={`text-sm font-medium ${config.accentColor}`}>
          {config.label}
        </span>
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
