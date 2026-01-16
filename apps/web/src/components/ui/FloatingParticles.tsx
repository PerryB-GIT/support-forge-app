"use client";

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export function FloatingParticles({ count = 12, className = "" }: FloatingParticlesProps) {
  // Generate particles with varied positions and animations
  const particles = Array.from({ length: count }, (_, i) => {
    const animationClass = `animate-particle-${(i % 3) + 1}`;
    const sizeClass = i % 3 === 0 ? "particle-lg" : i % 3 === 1 ? "particle-md" : "particle-sm";

    // Distribute particles across the area
    const left = `${(i * 8.5) % 100}%`;
    const top = `${20 + (i * 7) % 60}%`;
    const delay = `${(i * 0.5) % 4}s`;

    return (
      <div
        key={i}
        className={`particle ${sizeClass} ${animationClass}`}
        style={{
          left,
          top,
          animationDelay: delay,
        }}
      />
    );
  });

  // Generate connection lines between some particles
  const lines = Array.from({ length: Math.floor(count / 3) }, (_, i) => {
    const left = `${10 + (i * 25) % 80}%`;
    const top = `${30 + (i * 15) % 40}%`;
    const width = `${80 + (i * 30) % 100}px`;
    const rotation = `${-20 + (i * 15) % 40}deg`;
    const delay = `${(i * 1.2) % 4}s`;

    return (
      <div
        key={`line-${i}`}
        className="particle-line animate-line-pulse"
        style={{
          left,
          top,
          width,
          transform: `rotate(${rotation})`,
          animationDelay: delay,
        }}
      />
    );
  });

  return (
    <div className={`particles-container ${className}`}>
      {particles}
      {lines}
    </div>
  );
}
