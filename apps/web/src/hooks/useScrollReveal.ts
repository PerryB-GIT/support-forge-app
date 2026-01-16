"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to detect when an element enters the viewport for scroll-triggered animations.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // If reduced motion is preferred, show immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, prefersReducedMotion]);

  return { ref, isVisible, prefersReducedMotion };
}

/**
 * Hook to animate a list of items with staggered timing.
 * Returns an array of visibility states for each item.
 */
export function useScrollRevealList<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: UseScrollRevealOptions & { staggerDelay?: number } = {}
) {
  const { staggerDelay = 100, ...revealOptions } = options;
  const { ref, isVisible, prefersReducedMotion } = useScrollReveal<T>(revealOptions);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(itemCount).fill(false)
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      // Show all items immediately if reduced motion preferred
      setVisibleItems(Array(itemCount).fill(true));
      return;
    }

    if (isVisible) {
      // Stagger reveal each item
      const timeouts: NodeJS.Timeout[] = [];
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * staggerDelay);
        timeouts.push(timeout);
      }
      return () => timeouts.forEach(clearTimeout);
    } else {
      setVisibleItems(Array(itemCount).fill(false));
    }
  }, [isVisible, itemCount, staggerDelay, prefersReducedMotion]);

  return { ref, isVisible, visibleItems, prefersReducedMotion };
}
