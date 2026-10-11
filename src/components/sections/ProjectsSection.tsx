import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent, type Project } from '../../data/content';
import { CaseStudyModal } from '../projects/CaseStudyModal';
import { PulseStreamFlow } from '../projects/PulseStreamFlow';
import { ProjectVisualExhibit } from '../projects/ProjectVisualExhibit';
import { soundFX } from '../../lib/audio';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Layers, ArrowUpRight } from 'lucide-react';
import { TechChip } from '../tech/TechChip';

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const ProjectsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = siteContent.projects;
  const currentProject = projects[currentIndex];

  const handleStep = (direction: 'prev' | 'next') => {
    soundFX.playClick();
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
    } else {
      setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    }
  };

  // Curated stack items with official logos for each project (K3)
  const getProjectTechStack = (projectTitle: string): string[] => {
    switch (projectTitle) {
      case 'PulseStream':
        return [
          'Java',
          'Spring Boot',
          'Apache Kafka',
          'Kafka Streams',
          'PostgreSQL',
          'Flyway',
          'Docker',
          'JUnit 5',
          'Testcontainers',
          'Apache JMeter',
          'OpenAPI / Swagger',
        ];
      case 'NoteFlow':
        return ['Kotlin', 'Jetpack Compose', 'Room Database', 'Retrofit', 'Kotlin Coroutines', 'Material Design'];
      case 'Career Guru':
        return ['Java', 'Android', 'Firebase', 'Material Design'];
      case 'Crowd3':
        return ['Solidity', 'Ethereum', 'Web3.js', 'Android', 'Kotlin'];
      default:
        return currentProject.tags;
    }
  };

  return (
    <section id="projects" className="relative scroll-mt-28 py-16" aria-label="Room 03: Works">
      {/* Room Header Plaque with mono index and hairline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-10 border-b border-[#efe6dd]/15 font-mono text-xs gap-3">
        <div className="flex items-center gap-3">
          <span className="text-plaid font-semibold tracking-widest uppercase">
            03 / Works
          </span>
          <span className="text-[#efe6dd]/30">•</span>
          <span className="text-cream-dim uppercase tracking-wider">
            Main Gallery
          </span>
          <span className="text-[#efe6dd]/30">•</span>
          <span className="text-cream font-semibold tabular-nums">
            Exhibit 0{currentIndex + 1} / 0{projects.length}
          </span>
        </div>

        {/* Stepper Controls & Room Navigation */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5">
            {projects.map((p, idx) => (
              <button
                key={p.title}
                onClick={() => {
                  soundFX.playClick();
                  setCurrentIndex(idx);
                }}
                className={`px-3 py-1 rounded-sm text-xs font-mono transition-all ${
                  currentIndex === idx
                    ? 'bg-plaid/20 border border-plaid text-cream font-semibold'
                    : 'text-cream-dim hover:text-cream border border-transparent'
                }`}
              >
                0{idx + 1} {p.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={() => handleStep('prev')}
              className="p-2 rounded-lg bg-white/[0.04] border border-[#efe6dd]/15 text-cream hover:border-plaid hover:text-plaid transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def]"
              aria-label="Previous Exhibit"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStep('next')}
              className="p-2 rounded-lg bg-white/[0.04] border border-[#efe6dd]/15 text-cream hover:border-plaid hover:text-plaid transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def]"
              aria-label="Next Exhibit"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Room Title: Oversized Poppins 700 with ONE word in plaid gradient (K2) */}
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight leading-[1.08] mb-3">
          Selected <span className="text-gradient-plaid">works</span>.
        </h2>
        <p className="font-sans text-body text-cream-dim leading-relaxed">
          Curated exhibits framed one at a time. Each system represents production-grade architecture, rigorous verification, and zero decorative fluff.
        </p>
      </div>

      {/* Main Single-Exhibit Framed Showcase (Crossfade + Depth shift, 700ms) */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.title}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.985 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 sm:p-12 rounded-3xl spatial-glass border border-[#efe6dd]/20 shadow-[0_30px_90px_rgba(0,0,0,0.6)] space-y-8"
          >
            {/* Exhibit Header with 4px Arrow shift interaction (K2) */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#efe6dd]/15">
              <div className="group">
                <div className="font-mono text-xs uppercase tracking-widest text-plaid font-semibold mb-2">
                  Exhibit 0{currentIndex + 1} • {currentProject.badge || 'Project'}
                </div>
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-cream tracking-tight mb-2 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                  <span>{currentProject.title}</span>
                  <ArrowUpRight className="w-6 h-6 text-plaid opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </h3>
                <p className="font-sans text-lg text-plaid font-medium">
                  {currentProject.subtitle}
                </p>
              </div>

              {currentProject.link ? (
                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-[#efe6dd]/15 text-xs font-mono text-cream hover:border-plaid hover:text-plaid transition-colors shrink-0"
                >
                  <GithubIcon />
                  <span className="link-underline-wipe">GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-plaid" />
                </a>
              ) : (
                <span className="font-mono text-xs text-cream-dim px-3 py-1.5 rounded bg-white/[0.03] border border-[#efe6dd]/10 shrink-0">
                  Private Repository
                </span>
              )}
            </div>

            {/* Visual Exhibit Frame: CSS Device Frame / Browser Frame (L2.1) */}
            <div className="pt-2 pb-2">
              <ProjectVisualExhibit projectTitle={currentProject.title} />
            </div>

            {/* Richest Treatment for PulseStream: Typographic Architecture Flow */}
            {currentProject.title === 'PulseStream' && <PulseStreamFlow />}

            {/* Project Overview */}
            <div className="space-y-4">
              <p className="font-sans text-base sm:text-lg text-cream-dim leading-relaxed max-w-[65ch]">
                {currentProject.description}
              </p>

              {/* Attribution for NoteFlow */}
              {currentProject.attribution && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-[#efe6dd]/15 text-sm font-sans text-cream-dim leading-relaxed flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-plaid shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block mb-0.5">Architecture note:</strong>
                    {currentProject.attribution}
                  </div>
                </div>
              )}
            </div>

            {/* Stack Rendered as TechChip Row with Official Logos (K3) */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs uppercase tracking-wider text-cream-dim block">
                Engineered with:
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {getProjectTechStack(currentProject.title).map((tech) => (
                  <TechChip key={tech} nameOrSlug={tech} compact showName />
                ))}
              </div>
            </div>

            {/* Exhibit Museum Plaque: JetBrains Mono 12px uppercase 0.06em tracking plaid */}
            <div className="p-5 rounded-2xl bg-[#050813]/60 border border-[#efe6dd]/15 font-mono text-xs uppercase tracking-[0.06em] text-plaid space-y-1.5">
              <div className="text-cream font-semibold">Title: {currentProject.title}</div>
              {currentProject.medium && <div className="text-cream-dim">Medium: {currentProject.medium}</div>}
              {currentProject.role && <div>Role: {currentProject.role}</div>}
              {currentProject.link ? (
                <div className="text-plaid">Link: {currentProject.link}</div>
              ) : (
                <div className="text-cream-dim">Link: Private repository / Hackathon entry</div>
              )}
            </div>

            {/* Footer Action */}
            <div className="pt-6 border-t border-[#efe6dd]/15 flex items-center justify-between">
              <span className="font-mono text-xs text-cream-dim">
                Case study available with detailed ADRs
              </span>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setSelectedProject(currentProject);
                }}
                className="btn-primary min-h-[44px] shrink-0"
              >
                <Eye className="w-4 h-4 text-[#efe6dd]" />
                <span>View Full Case Study</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Case Study visionOS Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
