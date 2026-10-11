import React, { useState } from 'react';
import type { SocialItem } from '../../data/socials';
import { Mail, ArrowUpRight, Check, Copy } from 'lucide-react';
import { soundFX } from '../../lib/audio';

interface SocialTileProps {
  item: SocialItem;
  onCopySuccess?: (name: string) => void;
}

export const SocialTile: React.FC<SocialTileProps> = ({ item, onCopySuccess }) => {
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
      if (onCopySuccess) onCopySuccess(item.handle);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const renderIcon = () => {
    if (item.source === 'lucide') {
      return (
        <Mail
          className="w-7 h-7 transition-colors duration-200"
          style={{ color: isHovered ? hoverColor : 'rgba(239, 230, 221, 0.8)' }}
          aria-hidden="true"
        />
      );
    }

    if (item.source === 'monogram') {
      return (
        <span
          className="font-mono font-bold text-sm tracking-tight transition-colors duration-200"
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
        className="w-7 h-7 transition-colors duration-200 shrink-0"
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
      className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl spatial-glass border border-[#efe6dd]/15 bg-white/[0.03] transition-all duration-300 min-h-[72px] cursor-pointer select-none ${
        isHovered
          ? '-translate-y-0.5 border-[#efe6dd]/40 bg-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.45)]'
          : ''
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Logo Tile (28px icon inside rounded-square) */}
        <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-[#efe6dd]/10 flex items-center justify-center shrink-0">
          {renderIcon()}
        </div>

        <div className="space-y-0.5 text-left">
          <div className="font-sans font-semibold text-sm sm:text-base text-cream group-hover:text-[#efe6dd] transition-colors">
            {item.name}
          </div>
          <div className="font-mono text-xs text-cream-dim/80 group-hover:text-cream transition-colors">
            {copied ? 'Copied to clipboard' : item.handle}
          </div>
        </div>
      </div>

      <div className="ml-3 shrink-0">
        {item.isAction ? (
          copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-plaid group-hover:scale-110 transition-transform" />
          )
        ) : (
          <ArrowUpRight className="w-4 h-4 text-plaid group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        )}
      </div>
    </div>
  );

  if (item.isAction) {
    return (
      <button
        type="button"
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="w-full text-left rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def] focus:outline-none"
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
      className="block w-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def] focus:outline-none"
    >
      {content}
    </a>
  );
};
