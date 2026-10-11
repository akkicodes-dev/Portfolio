import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from '../providers/SmoothScrollContext';
import { siteContent } from '../data/content';
import { BrandLogo } from './BrandLogo';
import { Menu, X, Search, Sparkles, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { soundFX } from '../lib/audio';

export const PillNavbar: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundFX.enabled);
  const [puneTime, setPuneTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
      setPuneTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)));
      }

      const sections = ['hero', 'about', 'skills', 'projects', 'opensource', 'experience', 'achievements', 'contact'];
      const scrollPosition = scrollY + 280;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    soundFX.playClick();
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  const handleToggleSound = () => {
    const newState = soundFX.toggle();
    setSoundEnabled(newState);
  };

  const openCommandPalette = () => {
    soundFX.playClick();
    // Dispatch custom event to open Command Palette
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 w-[96%] max-w-6xl ${
          scrolled ? 'scale-98 shadow-2xl' : 'scale-100'
        }`}
      >
        <nav
          className="relative spatial-glass px-3.5 py-2 sm:px-4 md:px-5 md:py-2.5 flex items-center justify-between rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#efe6dd]/15 overflow-hidden"
          aria-label="Main Navigation"
        >
          {/* Slim Scroll Progress Line at top border */}
          <div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-plaid via-[#efe6dd] to-plaid transition-all duration-150 ease-out z-30"
            style={{ width: `${scrollPercent}%` }}
            aria-hidden="true"
          />

          {/* Logo at Left with Active Room Plaque */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center gap-2 group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def]"
              aria-label="AKKI - Akash Satao Portfolio Home"
            >
              <BrandLogo
                className="w-7 h-7 text-[#efe6dd] group-hover:text-[#ff3b3f] transition-colors"
                showWordmark
              />
            </button>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded border border-[#efe6dd]/15 bg-white/[0.03] font-mono text-xs text-plaid font-semibold tracking-wider">
              {siteContent.navigation.find((n) => n.href.replace('#', '') === activeSection)?.roomNumber || '00'} / {siteContent.navigation.find((n) => n.href.replace('#', '') === activeSection)?.label || 'Entrance'}
            </span>

            {/* Live Pune Local Time (Intl API) */}
            {puneTime && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#efe6dd]/15 bg-white/[0.03] font-mono text-xs text-cream-dim tabular-nums">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Pune, India • {puneTime} IST
              </span>
            )}

            {/* Optional Availability Badge (Only if showAvailability === true in content.ts) */}
            {siteContent.personal.showAvailability && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 font-mono text-xs text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities
              </span>
            )}
          </div>

          {/* Desktop Nav Pills (Inter 500, Active filled cherry, Letter-roll hover) */}
          <div className="hidden lg:flex items-center gap-1">
            {siteContent.navigation.map((item) => {
              const targetId = item.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`group relative px-2.5 xl:px-3 py-1 rounded-full text-xs xl:text-sm font-sans font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def] overflow-hidden ${
                    isActive
                      ? 'bg-[#9a0002] text-[#efe6dd] font-semibold shadow-[0_0_20px_rgba(154,0,2,0.65)]'
                      : 'text-cream-dim hover:text-[#efe6dd] hover:bg-white/[0.08]'
                  }`}
                >
                  <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-full group-hover:translate-y-0 text-[#efe6dd] font-medium"
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Actions: Sound Toggle + Search / Command Palette + Cherry "Hire me" */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio Toggle (OFF by default) */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-full border transition-all text-xs font-mono focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def] ${
                soundEnabled
                  ? 'bg-plaid/20 border-plaid text-plaid shadow-[0_0_12px_rgba(91,141,239,0.3)]'
                  : 'bg-white/[0.04] border-[#efe6dd]/15 text-cream-dim hover:text-cream'
              }`}
              title={soundEnabled ? 'Mute micro-sounds' : 'Enable visionOS micro-sounds'}
              aria-label={soundEnabled ? 'Mute audio feedback' : 'Unmute audio feedback'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Command Palette Trigger (Cmd/Ctrl+K) */}
            <button
              onClick={openCommandPalette}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-[#efe6dd]/15 text-xs font-sans text-cream-dim hover:text-[#efe6dd] hover:border-[#5b8def] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def]"
              title="Command Palette (Cmd/Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-plaid" aria-hidden="true" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-xs text-cream font-mono">⌘K</kbd>
            </button>

            {/* Round "Hire me" Cherry Button */}
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-3.5 py-1.5 rounded-full bg-[#9a0002] text-[#efe6dd] font-sans text-xs sm:text-sm font-medium hover:bg-[#b30003] transition-all duration-200 shadow-[0_0_20px_rgba(154,0,2,0.45)] hover:shadow-[0_0_28px_rgba(255,59,63,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def] flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff3b3f]" />
              <span>Hire me</span>
            </button>

            {/* Mobile menu trigger button */}
            <button
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-cream-dim hover:text-[#efe6dd] hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#ff3b3f]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen visionOS Glass Sheet Mobile Menu (B8 Requirement: No cutoff, 44px touch targets) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 lg:hidden bg-[#0a1020]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-300"
        >
          {/* Top Bar with Brand + Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-[#efe6dd]/15">
            <BrandLogo className="w-8 h-8 text-[#efe6dd]" showWordmark />
            <button
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 text-cream hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def]"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6 text-[#ff3b3f]" />
            </button>
          </div>

          {/* Staggered Navigation Links with >= 44px touch targets */}
          <div className="py-6 flex flex-col gap-2 overflow-y-auto max-h-[60vh]">
            {siteContent.navigation.map((item, index) => {
              const targetId = item.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`w-full min-h-[48px] px-5 py-3.5 rounded-2xl text-left font-sans font-medium text-lg flex items-center justify-between transition-all duration-200 ${
                    isActive
                      ? 'bg-[#9a0002] text-[#efe6dd] shadow-[0_0_24px_rgba(154,0,2,0.5)] font-semibold'
                      : 'text-cream-dim hover:text-[#efe6dd] hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs opacity-60">0{index + 1}</span>
                    <span>{item.label}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          {/* Footer of Mobile Sheet: Quick Contact + Socials */}
          <div className="pt-6 border-t border-[#efe6dd]/15 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => handleNavClick('#contact')}
                className="flex-1 min-h-[44px] px-5 py-3 rounded-full bg-[#9a0002] text-[#efe6dd] font-sans font-medium text-center shadow-lg active:scale-95 transition-transform"
              >
                Get in Touch
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  usePortfolioStore.getState().setTerminalOpen(true);
                }}
                className="min-h-[44px] min-w-[44px] p-3 rounded-full bg-white/10 border border-[#efe6dd]/15 text-cream hover:border-plaid transition-colors flex items-center justify-center font-mono text-xs"
                title="Developer Terminal"
                aria-label="Open developer terminal"
              >
                `
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-cream-dim">
              <span>akashsatao2303@gmail.com</span>
              <span>Pune, IN</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
