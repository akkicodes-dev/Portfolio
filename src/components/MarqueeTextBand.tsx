import React, { useEffect, useRef, useState } from 'react';

export const MarqueeTextBand: React.FC = () => {
  const phrase = 'Android • Backend • Open source • Kafka • Kotlin • Java • ';
  const repeated = Array(6).fill(phrase).join(' ');

  const [skew, setSkew] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    let targetSkew = 0;
    let targetSpeed = 1;

    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const dt = Math.max(now - lastTime.current, 10);
      const dy = currentScrollY - lastScrollY.current;

      const velocity = Math.abs(dy) / dt; // pixels per ms
      const direction = dy >= 0 ? -1 : 1;

      // Max 4deg skew
      targetSkew = Math.max(-4, Math.min(4, direction * velocity * 2.5));
      // Speed multiplier accelerates up to 3x with scroll velocity
      targetSpeed = 1 + Math.min(2.5, velocity * 1.8);

      lastScrollY.current = currentScrollY;
      lastTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth physics return to 0 skew and 1x speed
    const tick = () => {
      setSkew((prev) => {
        const diff = targetSkew - prev;
        const next = Math.abs(diff) < 0.05 ? targetSkew : prev + diff * 0.12;
        // Decay targetSkew towards 0
        targetSkew *= 0.92;
        return next;
      });

      setSpeedMultiplier((prev) => {
        const diff = targetSpeed - prev;
        const next = Math.abs(diff) < 0.05 ? targetSpeed : prev + diff * 0.12;
        targetSpeed = 1 + (targetSpeed - 1) * 0.92;
        return next;
      });

      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden py-8 sm:py-10 select-none pointer-events-auto border-y border-[#efe6dd]/10 bg-white/[0.01]"
      aria-hidden="true"
    >
      <div
        className="animate-marquee whitespace-nowrap will-change-transform transition-transform duration-75"
        style={{
          transform: `skewX(${skew.toFixed(2)}deg)`,
          animationDuration: `${(28 / speedMultiplier).toFixed(1)}s`,
        }}
      >
        <span className="font-display font-bold text-[clamp(64px,5.5vw,72px)] uppercase tracking-wider text-outline-cream-faint pr-8">
          {repeated}
        </span>
        <span className="font-display font-bold text-[clamp(64px,5.5vw,72px)] uppercase tracking-wider text-outline-cream-faint pr-8">
          {repeated}
        </span>
      </div>
    </div>
  );
};
