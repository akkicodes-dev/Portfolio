import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { siteContent } from '../data/content';
import { useSmoothScroll } from '../providers/SmoothScrollContext';
import { soundFX } from '../lib/audio';
import { socialRegistry } from '../data/socials';
import { X, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: string | string[];
}

export const TerminalOverlay: React.FC = () => {
  const { isTerminalOpen, setTerminalOpen } = usePortfolioStore();
  const { scrollTo } = useSmoothScroll();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'system.init',
      output: [
        'Akash Satao OS v2.6.0 [Spatial UI Edition]',
        "Type 'help' to inspect commands. Try typing 'sudo hire akash'.",
      ],
    },
  ]);
  const [celebrating, setCelebrating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        soundFX.playClick();
        setTerminalOpen(!isTerminalOpen);
      } else if (e.key === 'Escape' && isTerminalOpen) {
        setTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isTerminalOpen, history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cmd === 'sudo hire akash') {
      setCelebrating(true);
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [
            '🎉 [AUTH ACCEPTED] Executing immediate onboarding sequence...',
            '✨ Akash Satao selected for SDE team. Transmission channel activated.',
            '🚀 Routing to Contact Terminal in 1.2 seconds...',
          ],
        },
      ]);
      setInputVal('');

      setTimeout(() => {
        setTerminalOpen(false);
        setCelebrating(false);
        scrollTo('#contact');
      }, 1400);
      return;
    }

    if (cmd === 'theme') {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [
            'Palette Specification: Spatial UI / visionOS Glass',
            '• Navy: #0a1020 (top) / #050813 (bottom)',
            '• Cream: #efe6dd (vanilla text & solid cards)',
            '• Plaid Blue: #5b8def (accents, links, metrics)',
            '• Cherry: #9a0002 (solid action fill only)',
          ],
        },
      ]);
      setInputVal('');
      return;
    }

    let output: string | string[];

    if (cmd === 'help') {
      output = [
        'Available exhibition commands:',
        '  about        - View bio, academics & engineering focus',
        '  skills       - List backend & Android engineering instruments',
        '  projects     - View PulseStream, NoteFlow, Career Guru, Crowd3',
        '  pulsestream  - Inspect PulseStream event streaming architecture',
        '  links        - Complete directory of verified social & coding profiles',
        '  contact      - Display coordinates & transmission address',
        '  theme        - Inspect spatial color system',
        '  clear        - Clear terminal buffer',
        '  sudo hire akash - Secret fast-track hiring protocol',
      ];
    } else if (cmd === 'links') {
      output = [
        'Verified Profiles & Transmission Channels:',
        ...socialRegistry.map(
          (s) => `  • ${(s.name + ':').padEnd(15)} ${s.url} [${s.handle}]`
        ),
      ];
    } else if (siteContent.terminal.commands[cmd]) {
      output = siteContent.terminal.commands[cmd];
    } else {
      output = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  if (!isTerminalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Developer Terminal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={() => setTerminalOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#0a1020]/95 text-cream border border-[#efe6dd]/20 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden font-mono text-xs animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Window Bar */}
        <div className="px-4 py-3 bg-[#050813] border-b border-[#efe6dd]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#9a0002]" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-2 text-cream-dim flex items-center gap-1.5 font-mono text-xs">
              <TerminalIcon className="w-3.5 h-3.5 text-plaid" />
              <span>akash@satao-terminal:~$</span>
            </span>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              setTerminalOpen(false);
            }}
            className="p-1 rounded hover:bg-white/10 text-cream-dim hover:text-white transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Area */}
        <div className="p-5 max-h-[380px] overflow-y-auto space-y-3 font-mono text-xs">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-plaid">
                <span>{siteContent.terminal.prompt}</span>
                <span className="text-cream font-medium">{item.command}</span>
              </div>
              <div className="text-cream-dim pl-4 leading-relaxed">
                {Array.isArray(item.output) ? (
                  item.output.map((line, lIdx) => (
                    <div key={lIdx} className="py-0.5">
                      {line}
                    </div>
                  ))
                ) : (
                  <div>{item.output}</div>
                )}
              </div>
            </div>
          ))}

          {celebrating && (
            <div className="p-3 rounded-xl bg-[#9a0002]/30 border border-[#ff3b3f]/50 text-cream flex items-center gap-2 animate-bounce">
              <Sparkles className="w-4 h-4 text-[#ff3b3f]" />
              <span>[SUCCESS] Launching Celebration Protocol...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleCommand}
          className="p-3 bg-[#050813] border-t border-[#efe6dd]/15 flex items-center gap-2"
        >
          <span className="text-plaid pl-2">{siteContent.terminal.prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or 'sudo hire akash'..."
            className="flex-1 bg-transparent border-none text-cream placeholder-cream-dim/50 font-mono text-xs focus:outline-none"
            aria-label="Terminal input"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded-lg bg-white/10 text-cream hover:bg-white/20 text-xs font-mono transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};
