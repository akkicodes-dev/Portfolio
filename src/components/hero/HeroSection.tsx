import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/content';
import { useSmoothScroll } from '../../providers/SmoothScrollContext';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { MagneticButton } from '../MagneticButton';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { soundFX } from '../../lib/audio';
import { TechChip } from '../tech/TechChip';

export const HeroSection: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  // Dynamic role swapping: "Android developer" <-> "Backend engineer"
  const roles = ['Android developer', 'Backend engineer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isRolePaused, setIsRolePaused] = useState(false);
  const [displayedRole, setDisplayedRole] = useState(roles[0]);

  // Pointer tracking for layered parallax (max 6px depth) and specular light border
  const [cursorX, setCursorX] = useState<number | null>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isRolePaused) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isRolePaused, roles.length]);

  // Text-scramble (Poppins/mono, 500ms) only on the role swap (L2.2)
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = roles[roleIndex];
    if (isReduced) {
      setDisplayedRole(target);
      return;
    }

    const chars = '01#$*+?@&%[]_~';
    const duration = 500;
    const startTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * target.length);

      let result = '';
      for (let i = 0; i < target.length; i++) {
        if (i < revealedCount) {
          result += target[i];
        } else if (target[i] === ' ') {
          result += ' ';
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayedRole(result);

      if (progress < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setDisplayedRole(target);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [roleIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setCursorX(x);

    // Layered pointer parallax offsets (max 6px)
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointerOffset({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY)),
    });
  };

  const handleMouseLeave = () => {
    setCursorX(null);
    setPointerOffset({ x: 0, y: 0 });
  };

  // Microcopy synced to scroll shatter progress
  const dynamicMicrocopy =
    scrollProgress > 0.8
      ? 'reassembling figure — convergence complete'
      : scrollProgress > 0.12
      ? 'falling apart — shards drifting into orbit'
      : siteContent.personal.heroMicrocopy;

  const headlineLines = [
    { text: 'I build fast', className: 'font-light text-[#efe6dd]' },
    { text: 'Android apps', className: 'font-bold text-gradient-plaid' },
    { text: 'and the backends', className: 'font-light text-[#efe6dd]' },
    { text: 'behind them.', className: 'font-bold text-[#efe6dd]' },
  ];

  const heroStack = [
    'Kotlin',
    'Java',
    'Spring Boot',
    'Apache Kafka',
    'Jetpack Compose',
    'PostgreSQL',
    'Docker',
  ];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-between select-none pt-4 pb-8"
      aria-label="Exhibition Entrance"
    >
      {/* Specular light edge that follows cursor along glass window border (thin line, not a circle - L2.2) */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none z-30 transition-opacity duration-200"
        style={{
          background:
            cursorX !== null
              ? `linear-gradient(90deg, transparent 0%, transparent ${Math.max(0, cursorX - 16)}%, rgba(91, 141, 239, 0.95) ${cursorX}%, transparent ${Math.min(100, cursorX + 16)}%, transparent 100%)`
              : 'transparent',
          opacity: cursorX !== null ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Giant "AKASH SATAO" Display Text BEHIND Avatar Sculpture with horizontal band reveal and parallax (L2.2) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden will-change-transform transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${(-pointerOffset.x * 6).toFixed(1)}px, ${(-scrollProgress * 80 - pointerOffset.y * 6).toFixed(1)}px, 0px)`,
        }}
        aria-hidden="true"
      >
        {/* Outlined Base Layer (1px cream stroke at 35% opacity, strictly >= 64px) */}
        <span className="font-display font-bold text-[clamp(64px,13.5vw,260px)] uppercase tracking-tighter text-outline-cream-faint leading-none whitespace-nowrap text-center select-none">
          AKASH SATAO
        </span>

        {/* Solid Cream Reveal Layer controlled by horizontal cursor band (no circles) */}
        <span
          className="absolute font-display font-bold text-[clamp(64px,13.5vw,260px)] uppercase tracking-tighter text-[#efe6dd] leading-none whitespace-nowrap text-center select-none transition-[clip-path,opacity] duration-150"
          style={{
            clipPath:
              cursorX !== null
                ? `polygon(${Math.max(0, cursorX - 10)}% 0%, ${Math.min(100, cursorX + 10)}% 0%, ${Math.min(
                    100,
                    cursorX + 10,
                  )}% 100%, ${Math.max(0, cursorX - 10)}% 100%)`
                : 'polygon(46% 0%, 54% 0%, 54% 100%, 46% 100%)',
            opacity: cursorX !== null ? 0.8 : 0.2,
          }}
        >
          AKASH SATAO
        </span>
      </div>

      {/* Top Gallery Header Plaque */}
      <div className="relative z-10 flex items-center justify-between mb-6 pb-3 border-b border-[#efe6dd]/10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-plaid tracking-widest uppercase font-semibold">
            Room 00 / Entrance
          </span>
          <span className="text-[#efe6dd]/30 font-mono text-xs">•</span>
          <span className="font-mono text-xs text-cream-dim tracking-wider uppercase">
            Exhibition: Fall apart. Build again.
          </span>
        </div>

        <span className="hidden sm:inline-block font-mono text-xs text-cream-dim uppercase tracking-wider">
          Pune, IN
        </span>
      </div>

      {/* Asymmetric 12-Column Gallery Layout: Text in Cols 1-7, Figure breathes in Cols 8-12 */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        <div className="lg:col-span-7 xl:col-span-6 space-y-5">
          {/* Small Mono Label above headline with short hairline and subtle parallax (L2.2) */}
          <div
            className="flex items-center gap-2.5 will-change-transform transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${(pointerOffset.x * 2).toFixed(1)}px, ${(pointerOffset.y * 2).toFixed(1)}px, 0px)`,
            }}
          >
            <div className="w-5 h-[1px] bg-plaid shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-plaid font-semibold">
              Software development engineer • Pune, India
            </span>
          </div>

          {/* Monumental 4-Line Poppins Headline with Weight & Fill Contrast and Layered Pointer Parallax (K1 / L2.2) */}
          <h1
            className="font-display text-[clamp(1.9rem,3.8vw,3.6rem)] tracking-[-0.02em] leading-[1.04] will-change-transform transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${(pointerOffset.x * 5).toFixed(1)}px, ${(pointerOffset.y * 5).toFixed(1)}px, 0px)`,
            }}
          >
            {headlineLines.map((line, idx) => (
              <div key={line.text} className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`block whitespace-nowrap ${line.className}`}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Role Line Swapping with Text-Scramble (500ms) only on role swap (L2.2) */}
          <div
            className="flex items-center gap-3 pt-0.5"
            onMouseEnter={() => setIsRolePaused(true)}
            onMouseLeave={() => setIsRolePaused(false)}
            aria-live="polite"
          >
            <div className="w-4 h-[1px] bg-plaid/60 shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs text-cream-dim uppercase tracking-wider">Specialty:</span>
            <div className="relative h-6 flex items-center">
              <span className="font-sans font-medium text-sm sm:text-base text-plaid tracking-wide font-mono sm:font-sans">
                {displayedRole}
              </span>
            </div>
          </div>

          <p className="font-sans text-body text-cream-dim leading-relaxed max-w-[52ch]">
            Specializing in high-velocity Android apps with Jetpack Compose & Clean Architecture, and resilient event-driven distributed backends in Java, Spring Boot, and Kafka.
          </p>

          {/* Core Stack Mini-Row with Official Tech Chips (K3) */}
          <div className="pt-1 space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-cream-dim/80">
              Core Instruments:
            </span>
            <div className="flex flex-wrap gap-2">
              {heroStack.map((tech) => (
                <TechChip key={tech} nameOrSlug={tech} compact showName />
              ))}
            </div>
          </div>

          {/* Plaque: JetBrains Mono 12px uppercase 0.06em tracking plaid */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-[#efe6dd]/15 font-mono text-xs uppercase tracking-[0.06em] text-plaid space-y-1">
            <div className="text-cream font-semibold">Akash Satao • SDE (Android + Backend)</div>
            <div className="text-cream-dim">Medium: Kotlin • Jetpack Compose • Java 21 • Spring Boot • Apache Kafka</div>
          </div>

          {/* Deliberate Single Action Pair */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <MagneticButton strength={0.3}>
              <button
                onClick={() => {
                  soundFX.playClick();
                  scrollTo('#projects');
                }}
                className="btn-primary min-h-[44px]"
                aria-label="View Works in Gallery"
              >
                <span>View Works</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <button
                onClick={() => {
                  soundFX.playClick();
                  scrollTo('#contact');
                }}
                className="btn-secondary min-h-[44px]"
                aria-label="Get in Touch with Akash Satao"
              >
                <span>Get in Touch</span>
                <Mail className="w-4 h-4 text-plaid ml-1" />
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Columns 8-12: Left completely uncrowded for the central shatter sculpture */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Bottom Microcopy Plaque */}
      <div
        className="relative z-10 pt-5 mt-5 border-t border-[#efe6dd]/15 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-cream-dim gap-2 cursor-pointer group"
        onClick={() => scrollTo('#about')}
      >
        <div className="flex items-center gap-2 text-plaid tracking-wider transition-colors">
          <span>{dynamicMicrocopy}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
        <div className="text-xs text-cream-dim tracking-wider font-mono">
          Scroll to navigate rooms
        </div>
      </div>
    </section>
  );
};
