import React, { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const SpatialBackground: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Shifts gently along the deep navy gradient with scroll progress (never goes light)
    const unsubscribe = usePortfolioStore.subscribe((state) => {
      const p = state.scrollProgress;
      if (!bgRef.current) return;

      // Subtle gradient shift: #0a1020 (10, 16, 32) top -> (7, 12, 25), #050813 (5, 8, 19) bottom -> (3, 5, 14)
      const topR = Math.round(10 - p * 3);
      const topG = Math.round(16 - p * 4);
      const topB = Math.round(32 - p * 7);

      const botR = Math.round(5 - p * 2);
      const botG = Math.round(8 - p * 3);
      const botB = Math.round(19 - p * 5);

      bgRef.current.style.background = `linear-gradient(180deg, rgb(${topR}, ${topG}, ${topB}) 0%, rgb(${botR}, ${botG}, ${botB}) 100%)`;
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a1020 0%, #050813 100%)',
      }}
      aria-hidden="true"
    >
      {/* Pure Spatial UI: Clean dark navy depth with subtle film grain (NO decorative circles or blurred blobs) */}
      <div className="film-grain" />
    </div>
  );
};
