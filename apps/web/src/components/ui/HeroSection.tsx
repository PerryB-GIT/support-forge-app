"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  gradient?: boolean;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  gradient = true,
  children,
  size = "md",
  align = "center",
}: HeroSectionProps) {
  const sizeClasses = {
    sm: "py-16 md:py-20",
    md: "py-20 md:py-28",
    lg: "py-28 md:py-36",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
  };

  return (
    <section
      className={`relative overflow-hidden ${sizeClasses[size]} ${
        gradient && !backgroundImage ? "hero-gradient hero-spotlight-right" : ""
      }`}
    >
      {/* Background Image with responsive sizing */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 800px, (max-width: 1200px) 1200px, 1920px"
            className="object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      )}

      {/* Purple spotlight effect (applied even with image) */}
      {gradient && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.1)_0%,transparent_40%)]" />
        </div>
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none noise-texture" />

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 md:px-6 ${alignClasses[align]}`}>
        <div className={`${align === "center" ? "max-w-3xl mx-auto" : "max-w-2xl"}`}>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary animate-fade-up"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-4 md:mt-6 text-lg md:text-xl text-text-secondary animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {subtitle}
            </p>
          )}
          {children && (
            <div
              className="mt-6 md:mt-8 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Decorative glow orbs */}
      {gradient && (
        <>
          <div className="glow-orb glow-orb-large -top-32 -left-32 opacity-30" />
          <div className="glow-orb glow-orb-medium -bottom-20 -right-20 opacity-20" />
        </>
      )}
    </section>
  );
}
