"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface CountUpProps {
  /** The target value to count up to */
  value: number;
  /** Prefix to display before the number (e.g., "$") */
  prefix?: string;
  /** Suffix to display after the number (e.g., "%", "K", " weeks") */
  suffix?: string;
  /** Duration of the count animation in milliseconds */
  duration?: number;
  /** Intersection Observer threshold (0-1) */
  threshold?: number;
  /** Additional className for styling */
  className?: string;
  /** Decimal places to show */
  decimals?: number;
}

/**
 * Animated count-up component that triggers when scrolling into view.
 * Includes a subtle pulse effect after count completes.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  threshold = 0.3,
  className = "",
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Easing function for smooth animation
  const easeOutQuart = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  }, []);

  // Animate the count
  const animateCount = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    // If reduced motion preferred, show final value immediately
    if (prefersReducedMotion) {
      setCount(value);
      setShowPulse(true);
      return;
    }

    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentCount = Math.floor(easedProgress * value);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
        // Trigger pulse effect after count completes
        setShowPulse(true);
        // Remove pulse after animation
        setTimeout(() => setShowPulse(false), 600);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, duration, hasAnimated, prefersReducedMotion, easeOutQuart]);

  // Intersection Observer to trigger animation when in view
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, animateCount, hasAnimated]);

  // Format the number with decimal places
  const formattedCount = decimals > 0 ? count.toFixed(decimals) : count.toString();

  return (
    <span
      ref={ref}
      className={`
        inline-block transition-transform duration-300
        ${showPulse ? "animate-count-pulse" : ""}
        ${className}
      `}
    >
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
