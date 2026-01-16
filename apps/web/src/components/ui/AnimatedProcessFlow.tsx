"use client";

import { useScrollRevealList } from "@/hooks/useScrollReveal";

interface ProcessStep {
  number: number;
  label: string;
  isHighlighted?: boolean;
}

interface AnimatedProcessFlowProps {
  steps: ProcessStep[];
  staggerDelay?: number;
}

/**
 * Animated process flow visualization with scroll-triggered sequential highlighting.
 * Steps reveal one by one as the component enters the viewport.
 */
export function AnimatedProcessFlow({
  steps,
  staggerDelay = 300,
}: AnimatedProcessFlowProps) {
  const { ref, visibleItems, prefersReducedMotion } = useScrollRevealList<HTMLDivElement>(
    steps.length,
    { staggerDelay, threshold: 0.2 }
  );

  // Find the active step (most recently revealed, or highlighted if specified)
  const activeStepIndex = steps.findIndex((step) => step.isHighlighted);
  const lastVisibleIndex = visibleItems.lastIndexOf(true);
  const currentActiveIndex = activeStepIndex >= 0 ? activeStepIndex : lastVisibleIndex;

  return (
    <>
      {/* Desktop horizontal flow */}
      <div
        ref={ref}
        className="hidden md:flex items-center justify-center gap-0"
      >
        {steps.map((step, index) => {
          const isVisible = visibleItems[index] || prefersReducedMotion;
          const isActive = index === currentActiveIndex && isVisible;
          const isPast = index < currentActiveIndex && isVisible;

          return (
            <div key={step.number} className="flex items-center">
              {/* Step node */}
              <div
                className={`
                  process-step relative flex items-center gap-3 px-6 py-3
                  bg-background rounded-xl border transition-all duration-500
                  ${isVisible ? "is-visible" : ""}
                  ${isActive ? "border-accent process-step-active" : "border-border-subtle"}
                  ${isPast ? "border-accent/50" : ""}
                `}
                style={{
                  transitionDelay: prefersReducedMotion ? "0ms" : `${index * 50}ms`,
                }}
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    transition-all duration-300
                    ${isActive ? "bg-accent text-white step-badge-pulse" : ""}
                    ${isPast ? "bg-accent/60 text-white" : ""}
                    ${!isActive && !isPast ? "bg-accent/20 text-accent" : ""}
                  `}
                >
                  {step.number}
                </div>
                <span
                  className={`
                    font-medium transition-colors duration-300
                    ${isActive ? "text-accent" : "text-text-primary"}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connection line and arrow (not after last step) */}
              {index < steps.length - 1 && (
                <div className="flex items-center">
                  <div
                    className={`
                      process-line w-12 h-0.5 transition-opacity duration-500
                      ${visibleItems[index + 1] || prefersReducedMotion ? "opacity-100" : "opacity-30"}
                    `}
                  />
                  <svg
                    className={`
                      process-arrow w-4 h-4 transition-all duration-500
                      ${visibleItems[index + 1] || prefersReducedMotion ? "text-accent is-active" : "text-border-subtle"}
                    `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div
                    className={`
                      process-line w-12 h-0.5 transition-opacity duration-500
                      ${visibleItems[index + 1] || prefersReducedMotion ? "opacity-100" : "opacity-30"}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile vertical flow */}
      <div className="md:hidden flex flex-col items-center gap-4">
        {steps.map((step, index) => {
          const isVisible = visibleItems[index] || prefersReducedMotion;
          const isActive = index === currentActiveIndex && isVisible;
          const isPast = index < currentActiveIndex && isVisible;

          return (
            <div key={step.number} className="flex flex-col items-center">
              {/* Step node */}
              <div
                className={`
                  process-step relative flex items-center gap-3 px-6 py-3
                  bg-background rounded-xl border transition-all duration-500
                  ${isVisible ? "is-visible" : ""}
                  ${isActive ? "border-accent process-step-active" : "border-border-subtle"}
                  ${isPast ? "border-accent/50" : ""}
                `}
                style={{
                  transitionDelay: prefersReducedMotion ? "0ms" : `${index * 50}ms`,
                }}
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    transition-all duration-300
                    ${isActive ? "bg-accent text-white step-badge-pulse" : ""}
                    ${isPast ? "bg-accent/60 text-white" : ""}
                    ${!isActive && !isPast ? "bg-accent/20 text-accent" : ""}
                  `}
                >
                  {step.number}
                </div>
                <span
                  className={`
                    font-medium transition-colors duration-300
                    ${isActive ? "text-accent" : "text-text-primary"}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connection line and arrow (not after last step) */}
              {index < steps.length - 1 && (
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      process-line-vertical w-0.5 h-4 transition-opacity duration-500
                      ${visibleItems[index + 1] || prefersReducedMotion ? "opacity-100" : "opacity-30"}
                    `}
                  />
                  <svg
                    className={`
                      process-arrow w-4 h-4 rotate-90 transition-all duration-500
                      ${visibleItems[index + 1] || prefersReducedMotion ? "text-accent is-active" : "text-border-subtle"}
                    `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div
                    className={`
                      process-line-vertical w-0.5 h-4 transition-opacity duration-500
                      ${visibleItems[index + 1] || prefersReducedMotion ? "opacity-100" : "opacity-30"}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
