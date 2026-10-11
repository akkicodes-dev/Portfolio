import React, { useState, useEffect, useRef } from 'react';
import { useSmoothScroll } from '../providers/SmoothScrollContext';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { siteContent } from '../data/content';
import { soundFX } from '../lib/audio';
import {
  Search,
  Terminal,
  Volume2,
  Copy,
  Check,
  ExternalLink,
  X,
  Compass,
  Code2,
  FolderGit2,
  HeartHandshake,
  Briefcase,
  Mail,
} from 'lucide-react';

import { techRegistry } from '../data/tech';
import { TechChip } from './tech/TechChip';
import { socialRegistry } from '../data/socials';

interface PaletteAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  category: 'Navigation' | 'Actions' | 'Social' | 'Instruments';
  perform: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFX.playClick();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const actions: PaletteAction[] = [
    {
      id: 'nav-about',
      title: '01 / Statement',
      subtitle: 'Biography, education, and engineering philosophy',
      icon: <Compass className="w-4 h-4 text-plaid" />,
      category: 'Navigation',
      perform: () => scrollTo('#about'),
    },
    {
      id: 'nav-skills',
      title: '02 / Instruments',
      subtitle: 'Backend (Java/Kafka/Spring), Android, Testing',
      icon: <Code2 className="w-4 h-4 text-plaid" />,
      category: 'Navigation',
      perform: () => scrollTo('#skills'),
    },
    {
      id: 'nav-projects',
      title: '03 / Works',
      subtitle: 'PulseStream (Flagship Backend), NoteFlow, Career Guru',
      icon: <FolderGit2 className="w-4 h-4 text-plaid" />,
      category: 'Navigation',
      perform: () => scrollTo('#projects'),
    },
    {
      id: 'work-pulsestream',
      title: 'PulseStream • Flagship Project',
      subtitle: 'Real-time user activity ingestion & analytics platform',
      icon: <FolderGit2 className="w-4 h-4 text-plaid" />,
      category: 'Navigation',
      perform: () => scrollTo('#projects'),
    },
    {
      id: 'nav-opensource',
      title: '04 / Commons',
      subtitle: 'Verified merged PRs on Scribe-Android',
      icon: <HeartHandshake className="w-4 h-4 text-plaid" />,
      category: 'Navigation',
      perform: () => scrollTo('#opensource'),
    },
    {
      id: 'nav-experience',
      title: '05 / Timeline',
      subtitle: 'MountReach Solutions, CodeLite 2.0 & Unstop',
      icon: <Briefcase className="w-4 h-4 text-plaid" />,
      category: 'Navigation',
      perform: () => scrollTo('#experience'),
    },
    {
      id: 'nav-contact',
      title: '06 / Exit',
      subtitle: 'Direct transmission & collaboration inquiry',
      icon: <Mail className="w-4 h-4 text-plaid" />,
      category: 'Navigation',
      perform: () => scrollTo('#contact'),
    },
    {
      id: 'action-copy-email',
      title: 'Copy Email to Clipboard',
      subtitle: siteContent.personal.email,
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-plaid" />,
      category: 'Actions',
      perform: () => {
        navigator.clipboard.writeText(siteContent.personal.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: 'action-terminal',
      title: 'Open Developer Terminal',
      subtitle: 'Press ` to access interactive CLI',
      icon: <Terminal className="w-4 h-4 text-plaid" />,
      category: 'Actions',
      perform: () => usePortfolioStore.getState().setTerminalOpen(true),
    },
    {
      id: 'action-sound',
      title: 'Toggle Audio Micro-Sounds',
      subtitle: 'Web Audio API generative interaction sounds',
      icon: <Volume2 className="w-4 h-4 text-plaid" />,
      category: 'Actions',
      perform: () => soundFX.toggle(),
    },
    ...socialRegistry.map((item) => ({
      id: `social-${item.id}`,
      title: item.isAction ? `Copy ${item.name}` : `Open ${item.name}`,
      subtitle: item.handle,
      icon: item.isAction ? (
        copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-plaid" />
      ) : (
        <ExternalLink className="w-4 h-4 text-plaid" />
      ),
      category: 'Social' as const,
      perform: () => {
        if (item.isAction) {
          navigator.clipboard.writeText(item.handle);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          window.open(item.url, '_blank', 'noopener,noreferrer');
        }
      },
    })),
    ...techRegistry.map((tech) => ({
      id: `tech-${tech.slug}`,
      title: tech.name,
      subtitle: tech.plaque,
      icon: <TechChip nameOrSlug={tech.name} compact showName={false} />,
      category: 'Instruments' as const,
      perform: () => scrollTo('#skills'),
    })),
  ];

  const filteredActions = actions.filter(
    (action) =>
      action.title.toLowerCase().includes(query.toLowerCase()) ||
      action.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      action.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action: PaletteAction) => {
    soundFX.playClick();
    setIsOpen(false);
    action.perform();
  };

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        handleSelect(filteredActions[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#0a1020]/95 border border-[#efe6dd]/20 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden text-cream animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Search Input Bar */}
        <div className="relative px-5 py-4 border-b border-[#efe6dd]/15 flex items-center gap-3">
          <Search className="w-5 h-5 text-plaid shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or section..."
            className="w-full bg-transparent border-none text-cream placeholder-cream-dim text-base font-sans focus:outline-none"
            aria-label="Command search input"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full text-cream-dim hover:text-cream"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="p-3 max-h-[380px] overflow-y-auto space-y-1">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-cream-dim font-sans text-small">
              No matching commands or destinations found.
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <button
                  key={action.id}
                  onClick={() => handleSelect(action)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors min-h-[44px] ${
                    isSelected
                      ? 'bg-[#9a0002] text-[#efe6dd] shadow-[0_0_20px_rgba(154,0,2,0.4)]'
                      : 'hover:bg-white/[0.05] text-cream'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-white/10 text-white' : 'bg-white/[0.04]'
                      }`}
                    >
                      {action.icon}
                    </div>
                    <div>
                      <div className="font-sans font-medium text-sm leading-tight">
                        {action.title}
                      </div>
                      <div
                        className={`font-sans text-xs ${
                          isSelected ? 'text-white/80' : 'text-cream-dim'
                        }`}
                      >
                        {action.subtitle}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-xs ${
                      isSelected ? 'text-white/80' : 'text-plaid'
                    }`}
                  >
                    {action.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-5 py-3 bg-[#050813] border-t border-[#efe6dd]/10 flex items-center justify-between text-xs font-mono text-cream-dim">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>esc Exit</span>
          </div>
          <span>akash satao os</span>
        </div>
      </div>
    </div>
  );
};
