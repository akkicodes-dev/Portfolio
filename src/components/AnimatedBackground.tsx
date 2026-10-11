import React, { useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-[#0b0f1a] via-[#10162a] to-[#1a2340]"
      aria-hidden="true"
    >
      {/* Floating Glowing Orbs */}
      <div className="absolute top-[-10%] left-[15%] w-[550px] h-[550px] rounded-full bg-[#00d9ff]/12 blur-[140px] animate-pulse duration-[8000ms]" />
      <div className="absolute top-[35%] right-[10%] w-[650px] h-[650px] rounded-full bg-[#2c0454]/50 blur-[160px] animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-[5%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#00d9ff]/10 blur-[130px] animate-pulse duration-[12000ms]" />
      <div className="absolute top-[70%] right-[30%] w-[450px] h-[450px] rounded-full bg-[#3b1263]/40 blur-[150px]" />

      {/* SVG Fine Grain / Noise Filter */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.035] mix-blend-overlay">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Spatial Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b0f1a]/40 to-[#0b0f1a]/85 pointer-events-none" />
    </div>
  );
};
