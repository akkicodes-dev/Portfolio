import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const ScrollBackground: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Color stops throughout scroll:
    // 0.00: Cream (#efe6dd)
    // 0.18: Ink (#120405)
    // 0.40: Cream (#efe6dd)
    // 0.62: Ink (#120405)
    // 0.80: Cream (#efe6dd)
    // 1.00: Ink (#120405)
    const colorStops = [
      { p: 0.0, color: '#efe6dd' },
      { p: 0.18, color: '#120405' },
      { p: 0.40, color: '#efe6dd' },
      { p: 0.62, color: '#120405' },
      { p: 0.80, color: '#efe6dd' },
      { p: 1.0, color: '#120405' },
    ];

    const unsubscribe = usePortfolioStore.subscribe((state) => {
      const p = state.scrollProgress;
      if (!bgRef.current) return;

      // Find segment
      let start = colorStops[0];
      let end = colorStops[colorStops.length - 1];

      for (let i = 0; i < colorStops.length - 1; i++) {
        if (p >= colorStops[i].p && p <= colorStops[i + 1].p) {
          start = colorStops[i];
          end = colorStops[i + 1];
          break;
        }
      }

      const segmentT = end.p > start.p ? (p - start.p) / (end.p - start.p) : 0;
      const interpColor = gsap.utils.interpolate(start.color, end.color, segmentT);

      bgRef.current.style.backgroundColor = interpColor;
      usePortfolioStore.getState().setCurrentBgColor(interpColor);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 pointer-events-none z-[-1] transition-colors duration-100 ease-out"
      style={{ backgroundColor: '#efe6dd' }}
      aria-hidden="true"
    />
  );
};
