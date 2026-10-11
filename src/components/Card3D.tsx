import React, { useRef, useState, useEffect, useCallback } from 'react';
import { soundFX } from '../lib/audio';

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: boolean;
  glowColor?: 'plaid' | 'cherry';
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  maxTilt = 6,
  glow = true,
  glowColor = 'plaid',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [borderPos, setBorderPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  // Physics state for damped tilt (damping lambda ~ 6)
  const targetTilt = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentTilt = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Damped animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const updatePhysics = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Damping lambda ~ 6
      const dampingFactor = 1 - Math.exp(-6 * dt);
      currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * dampingFactor;
      currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * dampingFactor;

      if (cardRef.current) {
        const { x, y } = currentTilt.current;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg) translateZ(0px)`;
      }

      // Keep running if active or animating back to center
      if (
        isHovered ||
        Math.abs(currentTilt.current.x) > 0.01 ||
        Math.abs(currentTilt.current.y) > 0.01
      ) {
        animFrameId.current = requestAnimationFrame(updatePhysics);
      } else {
        if (cardRef.current) {
          cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        }
      }
    };

    if (isHovered) {
      lastTime = performance.now();
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isHovered]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max tilt capped at 6 deg, damped
      targetTilt.current.x = ((y - centerY) / centerY) * -maxTilt;
      targetTilt.current.y = ((x - centerX) / centerX) * maxTilt;

      // Track cursor position percentage along card border
      setBorderPos({
        x: Math.max(0, Math.min(100, (x / rect.width) * 100)),
        y: Math.max(0, Math.min(100, (y / rect.height) * 100)),
      });
    },
    [maxTilt]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundFX.playClick(900, 0.03);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetTilt.current.x = 0;
    targetTilt.current.y = 0;
  };

  const isPlaid = glowColor === 'plaid';
  const highlightColor = isPlaid ? 'rgba(91, 141, 239, 0.85)' : 'rgba(154, 0, 2, 0.85)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        willChange: 'transform',
      }}
      className={`group/card relative spatial-glass overflow-hidden rounded-card transition-shadow duration-300 ${
        isHovered && glow
          ? isPlaid
            ? 'shadow-[0_24px_64px_rgba(0,0,0,0.6),0_0_24px_rgba(91,141,239,0.22)]'
            : 'shadow-[0_24px_64px_rgba(0,0,0,0.6),0_0_24px_rgba(154,0,2,0.25)]'
          : 'shadow-[0_20px_50px_rgba(0,0,0,0.45)]'
      } ${className}`}
      {...props}
    >
      {/* 1. Specular cursor-tracking border highlight:
          A thin 1px linear specular highlight tracked along the perimeter, NOT a circle or blob */}
      <div
        className="pointer-events-none absolute inset-0 rounded-card z-20 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(${
            Math.atan2(borderPos.y - 50, borderPos.x - 50) * (180 / Math.PI) + 90
          }deg, ${highlightColor} 0%, rgba(239, 230, 221, 0.15) 30%, transparent 60%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1.2px',
        }}
        aria-hidden="true"
      />

      {/* 2. Soft linear light sheen sweep across the card surface on hover (linear angle, no circles) */}
      <div
        className="pointer-events-none absolute -inset-[100%] z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.06) 50%, transparent 60%)',
          transform: isHovered ? 'translateX(50%)' : 'translateX(-50%)',
          transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};
