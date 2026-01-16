"use client";

import { ReactNode } from "react";
import { useScrollReveal, useScrollRevealList } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-up";
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Wrapper component that reveals content when scrolled into view.
 */
export function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  const { ref, isVisible, prefersReducedMotion } = useScrollReveal<HTMLDivElement>({
    threshold,
    triggerOnce,
  });

  const animationClasses = {
    "fade-up": "translate-y-5 opacity-0",
    "fade-in": "opacity-0",
    "slide-up": "translate-y-8 opacity-0",
  };

  const visibleClasses = "translate-y-0 opacity-100";

  // If reduced motion preferred, render without animation styles
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${className} ${
        isVisible ? visibleClasses : animationClasses[animation]
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

interface ScrollRevealListProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  animation?: "fade-up" | "fade-in" | "slide-up";
  staggerDelay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Wrapper component that reveals a list of items with staggered timing.
 */
export function ScrollRevealList({
  children,
  className = "",
  itemClassName = "",
  animation = "fade-up",
  staggerDelay = 100,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealListProps) {
  const { ref, visibleItems, prefersReducedMotion } = useScrollRevealList<HTMLDivElement>(
    children.length,
    { threshold, triggerOnce, staggerDelay }
  );

  const animationClasses = {
    "fade-up": "translate-y-5 opacity-0",
    "fade-in": "opacity-0",
    "slide-up": "translate-y-8 opacity-0",
  };

  const visibleClasses = "translate-y-0 opacity-100";

  // If reduced motion preferred, render without animation styles
  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {children.map((child, index) => (
          <div key={index} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ease-out ${itemClassName} ${
            visibleItems[index] ? visibleClasses : animationClasses[animation]
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
