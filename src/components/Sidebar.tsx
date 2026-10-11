import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from '../providers/SmoothScrollContext';
import { siteContent } from '../data/content';
import { soundFX } from '../lib/audio';
import { socialRegistry } from '../data/socials';
import { SocialSidebarIcon } from './social/SocialSidebarIcon';

export const Sidebar: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'opensource', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 280;

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

  return (
    <aside
      className="fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-1 p-2.5 rounded-2xl spatial-glass border border-[#efe6dd]/15 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
      aria-label="Gallery Floor Plan"
    >
      <div className="px-2 py-1 mb-1 border-b border-[#efe6dd]/10">
        <span className="font-mono text-xs tracking-widest uppercase text-plaid font-semibold block">
          Floor Plan
        </span>
      </div>

      {siteContent.navigation.map((item) => {
        const targetId = item.href.replace('#', '');
        const isActive = activeSection === targetId;

        return (
          <button
            key={item.label}
            onClick={() => {
              soundFX.playClick();
              scrollTo(item.href);
            }}
            className={`group text-left px-2.5 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def] ${
              isActive
                ? 'bg-white/[0.08] text-cream border-l-2 border-plaid'
                : 'text-cream-dim hover:text-cream hover:bg-white/[0.04]'
            }`}
          >
            <span
              className={`font-mono text-xs font-medium ${
                isActive ? 'text-plaid' : 'text-cream-dim opacity-70'
              }`}
            >
              {item.roomNumber}
            </span>
            <span className="font-sans text-xs font-medium tracking-wide">
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Placement 1: Slim vertical dock of icon-only rounded-square tiles (36px) */}
      <div className="pt-2 mt-2 border-t border-[#efe6dd]/10 flex flex-col gap-1.5 items-center">
        {socialRegistry.map((social) => (
          <SocialSidebarIcon key={social.id} item={social} />
        ))}
      </div>
    </aside>
  );
};
