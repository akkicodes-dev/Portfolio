import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { siteContent } from '../data/content';
import { BrandLogo } from './BrandLogo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [logoFilled, setLogoFilled] = useState(false);
  const logoPathRef = useRef<SVGPathElement>(null);

  const handleFinish = useCallback(() => {
    setIsDone(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  }, [onComplete]);

  useEffect(() => {
    // 1. GSAP Logo stroke draw-on animation then fill with cherry
    if (logoPathRef.current) {
      const length = logoPathRef.current.getTotalLength();
      gsap.set(logoPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(logoPathRef.current, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.out',
        onComplete: () => {
          setLogoFilled(true);
        },
      });
    } else {
      setLogoFilled(true);
    }

    // 2. Numerical counter progress (plaid blue progress line, max ~2.2s)
    const startTime = performance.now();
    const duration = 2100;

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const current = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        handleFinish();
      }
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearInterval(timer);
        setProgress(100);
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFinish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(16px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a1020] text-cream select-none overflow-hidden"
        >
          {/* VisionOS Floating Glass Window Panel (No blurred orbs per locked constraint) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="spatial-panel relative z-10 max-w-md w-[90%] p-8 flex flex-col items-center text-center shadow-2xl border border-[#efe6dd]/15 bg-white/[0.04] backdrop-blur-2xl"
          >
            {/* Window Top Meta Bar */}
            <div className="w-full flex items-center justify-between pb-4 mb-6 border-b border-[#efe6dd]/15 text-xs font-mono text-cream-dim">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#9a0002]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#5b8def]/70" />
                <span className="w-2.5 h-2.5 rounded-sm bg-white/20" />
              </div>
              <span className="tracking-wider uppercase font-mono">Exhibition • Fall apart. Build again.</span>
              <button
                onClick={handleFinish}
                className="hover:text-cream text-cream-dim transition-colors text-xs font-mono underline"
                title="Skip intro"
              >
                Skip [Esc]
              </button>
            </div>

            {/* Logo Draw-on + Cherry Fill Transition */}
            <div
              className={`w-14 h-14 mb-5 flex items-center justify-center transition-colors duration-500 ${
                logoFilled ? 'text-[#9a0002]' : 'text-cream'
              }`}
            >
              <BrandLogo
                className="w-12 h-12"
                animatedPathRef={logoPathRef}
                filled={logoFilled}
              />
            </div>

            {/* Shard Assembling Preview */}
            <div className="relative w-24 h-36 mb-6 rounded-2xl overflow-hidden border border-[#efe6dd]/15 bg-white/[0.03] flex items-center justify-center">
              <img
                src={siteContent.personal.avatarWebp}
                alt={siteContent.personal.name}
                className="w-full h-full object-contain filter contrast-125"
                style={{
                  clipPath: `inset(${100 - progress}% 0 0 0)`,
                  filter: `drop-shadow(0 0 16px rgba(91, 141, 239, ${progress / 100}))`,
                }}
              />
              <div
                className="absolute left-0 right-0 h-[2px] bg-plaid shadow-[0_0_12px_#5b8def]"
                style={{ top: `${100 - progress}%` }}
              />
            </div>

            {/* Title & Role */}
            <h1 className="font-display font-bold text-2xl uppercase tracking-tight text-cream mb-1">
              {siteContent.personal.name}
            </h1>
            <p className="font-mono text-xs text-cream-dim uppercase tracking-wider mb-6">
              {siteContent.personal.role}
            </p>

            {/* Progress Bar & Counter (Plaid Blue progress line) */}
            <div className="w-full space-y-2 mb-2">
              <div className="flex items-center justify-between text-xs font-mono text-cream-dim px-1">
                <span>INITIALIZING SPATIAL SCENE</span>
                <span className="text-plaid font-bold">{progress}%</span>
              </div>
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-plaid via-[#78a6ff] to-cream transition-all duration-75 shadow-[0_0_12px_#5b8def]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Microcopy Prompt */}
            <div className="mt-4 text-xs font-mono text-cream-dim tracking-wider">
              {siteContent.personal.heroMicrocopy}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
