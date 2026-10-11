import React, { useState } from 'react';
import type { SocialItem } from '../../data/socials';
import { Mail } from 'lucide-react';
import { soundFX } from '../../lib/audio';

interface SocialSidebarIconProps {
  item: SocialItem;
}

export const SocialSidebarIcon: React.FC<SocialSidebarIconProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const getHoverColor = () => {
    if (item.darkFallback) return item.darkFallback;
    const hex = item.brandHex.toLowerCase();
    if (hex === '#000000' || hex === '#181717' || hex === '#231f20') return '#efe6dd';
    return item.brandHex;
  };

  const hoverColor = getHoverColor();

  const handleClick = (e: React.MouseEvent) => {
    soundFX.playClick();
    if (item.isAction) {
      e.preventDefault();
      navigator.clipboard.writeText(item.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderIcon = () => {
    if (item.source === 'lucide') {
      return (
        <Mail
          className="w-4 h-4 transition-colors duration-200"
          style={{ color: isHovered ? hoverColor : 'rgba(239, 230, 221, 0.8)' }}
          aria-hidden="true"
        />
      );
    }

    if (item.source === 'monogram') {
      return (
        <span
          className="font-mono font-bold text-xs transition-colors duration-200"
          style={{ color: isHovered ? hoverColor : 'rgba(239, 230, 221, 0.85)' }}
        >
          {item.monogram}
        </span>
      );
    }

    return (
      <svg
        viewBox={item.viewBox || '0 0 24 24'}
        aria-hidden="true"
        className="w-4 h-4 transition-colors duration-200 shrink-0"
        style={{ fill: isHovered ? hoverColor : 'rgba(239, 230, 221, 0.8)' }}
      >
        {item.paths?.map((d, idx) => (
          <path key={idx} d={d} />
        ))}
      </svg>
    );
  };

  const content = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative w-9 h-9 rounded-xl border border-[#efe6dd]/15 bg-white/[0.03] flex items-center justify-center transition-all duration-200 cursor-pointer select-none ${
        isHovered ? '-translate-y-0.5 border-[#efe6dd]/40 bg-white/[0.08]' : ''
      }`}
    >
      {renderIcon()}

      {/* Plaque-style tooltip (mono, handle shown) */}
      {isHovered && (
        <div
          role="tooltip"
          className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-[#0a1020]/95 border border-[#efe6dd]/20 shadow-xl backdrop-blur-md whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150 pointer-events-none"
        >
          <div className="font-mono text-xs uppercase tracking-wider text-plaid font-semibold">
            {item.name}
          </div>
          <div className="font-mono text-xs text-cream-dim">
            {copied ? 'Copied to clipboard' : item.handle}
          </div>
        </div>
      )}
    </div>
  );

  if (item.isAction) {
    return (
      <button
        type="button"
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={item.monogram ? `${item.monogram} - Copy ${item.name}` : `Copy ${item.name} (${item.handle})`}
        className="rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def] focus:outline-none"
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={item.monogram ? `${item.monogram} - ${item.name} profile` : `Open ${item.name} profile (opens in new tab)`}
      className="rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def] focus:outline-none"
    >
      {content}
    </a>
  );
};
