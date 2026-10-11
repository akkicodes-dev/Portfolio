import React from 'react';
import { Footer } from './Footer';

interface SpatialPanelProps {
  children: React.ReactNode;
}

export const SpatialPanel: React.FC<SpatialPanelProps> = ({ children }) => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pl-16 xl:pl-48">
      {/* Outer Floating VisionOS Glass Window Frame (32px panel radius) */}
      <div className="relative rounded-panel spatial-panel overflow-hidden transition-all duration-500">
        {/* Top Window Meta Bar (Digital Gallery Architecture) */}
        <div className="px-6 py-3.5 border-b border-[#efe6dd]/15 flex items-center justify-between bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#9a0002]" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#5b8def]/70" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-sm bg-white/30" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-cream-dim hidden sm:inline-block tracking-wider">
              gallery://akash.satao/fall-apart-build-again
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-cream-dim">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-[#5b8def] animate-pulse" aria-hidden="true" />
              <span>EXHIBITION ONLINE</span>
            </span>
            <span className="hidden md:inline-block text-white/30" aria-hidden="true">•</span>
            <span className="hidden md:inline-block text-cream-dim">PUNE, IN</span>
          </div>
        </div>

        {/* Inner Content Area: Rooms separated by calm hairline transitions, 160px desktop gaps */}
        <div className="relative p-6 sm:p-10 md:p-12 lg:p-14 space-y-24 md:space-y-36">
          {children}
          <Footer />
        </div>

        {/* Bottom Window Sub-bar */}
        <div className="px-6 py-4 border-t border-[#efe6dd]/15 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-cream-dim bg-white/[0.03] gap-2">
          <div>
            Digital Gallery • Exhibition: Fall apart. Build again. • Akash Satao
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/akkicodes-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-plaid hover:underline transition-colors"
            >
              GitHub @akkicodes-dev
            </a>
            <span aria-hidden="true">•</span>
            <span>Pune, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};
