import React, { useState } from 'react';
import { useSmoothScroll } from '../providers/SmoothScrollContext';
import { siteContent } from '../data/content';
import { BrandLogo } from './BrandLogo';
import { soundFX } from '../lib/audio';
import { socialRegistry } from '../data/socials';
import { ArrowUp, Copy, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(siteContent.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleBackToTop = () => {
    soundFX.playClick();
    scrollTo('#hero');
  };

  return (
    <footer className="mt-16 pt-12 pb-8 border-t border-[#efe6dd]/15 font-sans" aria-label="Site Footer">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Brand & Bio Col */}
        <div className="md:col-span-5 space-y-4">
          <BrandLogo className="w-8 h-8 text-cream" showWordmark />
          <p className="font-sans text-small text-cream-dim leading-relaxed max-w-sm">
            {siteContent.personal.headline}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#efe6dd]/15 text-xs font-mono text-cream hover:border-plaid hover:text-plaid transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-400">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-plaid" aria-hidden="true" />
                  <span>{siteContent.personal.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="md:col-span-4 space-y-3">
          <div className="font-mono text-xs text-plaid uppercase tracking-wider font-semibold">
            Navigation Index
          </div>
          <div className="grid grid-cols-2 gap-2 text-small">
            {siteContent.navigation.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  soundFX.playClick();
                  scrollTo(item.href);
                }}
                className="text-left text-cream-dim hover:text-cream transition-colors py-1"
              >
                <span className="font-mono text-xs text-plaid mr-1.5">{item.roomNumber}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Shortcuts & Social */}
        <div className="md:col-span-3 space-y-3">
          <div className="font-mono text-xs text-plaid uppercase tracking-wider font-semibold">
            Keyboard Controls
          </div>
          <div className="space-y-2 text-xs font-mono text-cream-dim">
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-[#efe6dd]/10">
              <span>Command Palette</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-cream">⌘K / Ctrl+K</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-[#efe6dd]/10">
              <span>Developer CLI</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-cream">`</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Text Row of Verified Social Links (Placement 3) */}
      <div className="pt-6 pb-6 border-t border-[#efe6dd]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-cream-dim">
          {socialRegistry.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target={item.isAction ? undefined : '_blank'}
              rel={item.isAction ? undefined : 'noopener noreferrer'}
              onClick={(e) => {
                if (item.isAction) {
                  e.preventDefault();
                  handleCopyEmail();
                }
              }}
              className="hover:text-cream transition-colors link-underline-wipe"
              aria-label={
                item.isAction
                  ? `Copy ${item.name} address`
                  : `Open ${item.name} profile (opens in new tab)`
              }
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="text-cream-dim tabular-nums">
          Pune, India • {new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())} IST
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="pt-6 border-t border-[#efe6dd]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cream-dim">
        <div className="flex items-center gap-2">
          <span>© 2026 Akash Satao (akkicodes-dev)</span>
          <span>•</span>
          <span>Awwwards Spatial UI Digital Gallery</span>
        </div>

        <button
          onClick={handleBackToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#efe6dd]/15 text-cream hover:border-plaid hover:text-plaid transition-colors"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-plaid" />
        </button>
      </div>
    </footer>
  );
};
