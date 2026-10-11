import React, { useEffect } from 'react';
import { type Project } from '../../data/content';
import { X, ExternalLink, Layers, Cpu, CheckCircle } from 'lucide-react';
import { soundFX } from '../../lib/audio';
import { PulseStreamFlow } from './PulseStreamFlow';
import { TechChip } from '../tech/TechChip';

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playClick();
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a1020]/95 border border-[#efe6dd]/20 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-6 sm:p-10 text-cream animate-in zoom-in-95 duration-200 space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#efe6dd]/15">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-plaid font-semibold tracking-widest uppercase">
              Works Exhibition • Case Study
            </span>
            <span className="text-[#efe6dd]/30 font-mono text-xs">•</span>
            <span className="font-mono text-xs text-cream-dim uppercase tracking-wider">
              {project.badge || 'Verified Specification'}
            </span>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-cream hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def]"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Title & Subtitle */}
        <div>
          <h2 id="case-study-title" className="font-display font-semibold text-3xl sm:text-4xl text-cream mb-2">
            {project.title}
          </h2>
          <p className="font-sans text-lg text-plaid font-medium">
            {project.subtitle}
          </p>
        </div>

        {/* Museum Plaque Structure */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-[#efe6dd]/15 font-mono text-xs uppercase tracking-[0.06em] text-plaid space-y-1.5">
          <div className="text-cream font-semibold">Title: {project.title}</div>
          {project.medium && <div className="text-cream-dim">Medium: {project.medium}</div>}
          {project.role && <div>Role: {project.role}</div>}
          {project.link ? (
            <div className="text-plaid">Link: {project.link}</div>
          ) : (
            <div className="text-cream-dim">Link: Private repository / Hackathon entry</div>
          )}
        </div>

        {/* If PulseStream, render Architecture Flow */}
        {project.title === 'PulseStream' && <PulseStreamFlow />}

        {/* Architectural Overview */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cream">
            <Cpu className="w-4 h-4 text-plaid" />
            <span>Architecture & Implementation Overview</span>
          </h3>
          <p className="font-sans text-body text-cream-dim leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Honest Attribution Note (NoteFlow built on EasyNotes) */}
        {project.attribution && (
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#efe6dd]/15 text-small font-sans text-cream-dim leading-relaxed flex items-start gap-3">
            <Layers className="w-5 h-5 text-plaid shrink-0 mt-0.5" />
            <div>
              <strong className="text-cream block mb-1">Architecture & Provenance:</strong>
              {project.attribution}
            </div>
          </div>
        )}

        {/* Verified Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-plaid font-semibold">
              Verified Technical Deliverables
            </h3>
            <div className="space-y-2">
              {project.highlights.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-[#efe6dd]/10 flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-plaid shrink-0 mt-0.5" />
                  <span className="font-sans text-small text-cream leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Chips with Official Logos */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cream-dim">
            Verified Stack & Architectural Instruments
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <TechChip key={tag} nameOrSlug={tag} compact showName />
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-6 border-t border-[#efe6dd]/15 flex flex-wrap items-center justify-between gap-4">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary min-h-[44px]"
            >
              <GithubIcon />
              <span>Inspect Source on GitHub</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          ) : (
            <span className="font-mono text-xs text-cream-dim">
              Private / Hackathon submission
            </span>
          )}

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="btn-secondary min-h-[44px]"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    </div>
  );
};
