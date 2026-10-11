import React, { useState } from 'react';
import { TechGrid } from '../tech/TechGrid';
import type { TechItem } from '../../data/tech';

export const SkillsSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<TechItem | null>(null);

  const backendTechs = [
    'Java',
    'Spring Boot',
    'Apache Kafka',
    'Kafka Streams',
    'PostgreSQL',
    'Flyway',
    'Docker',
    'Maven',
    'OpenAPI / Swagger',
  ];

  const androidTechs = [
    'Kotlin',
    'Jetpack Compose',
    'Firebase',
    'Room Database',
    'Retrofit',
    'Kotlin Coroutines',
    'Material Design',
    'Android Studio',
  ];

  const testingTechs = [
    'JUnit 5',
    'Mockito',
    'Testcontainers',
    'Apache JMeter',
  ];

  const languageTechs = [
    'Python',
    'C++',
    'TypeScript',
    'JavaScript',
    'SQL',
    'Solidity',
  ];

  const toolsTechs = [
    'Git',
    'GitHub',
    'Linux',
    'Bazel',
    'Google Cloud',
    'AWS',
    'Ethereum',
    'Web3.js',
  ];

  const handleHover = (item: TechItem) => {
    setActiveItem(item);
  };

  const handleLeave = () => {
    setActiveItem(null);
  };

  return (
    <section id="skills" className="relative scroll-mt-28 py-16" aria-label="Room 02: Instruments">
      {/* Room Header Plaque with mono index and hairline */}
      <div className="flex items-center justify-between pb-4 mb-16 border-b border-[#efe6dd]/15 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-plaid font-semibold tracking-widest uppercase">
            02 / Instruments
          </span>
          <span className="text-[#efe6dd]/30">•</span>
          <span className="text-cream-dim uppercase tracking-wider">
            Typographic Tech Index
          </span>
        </div>
        <span className="text-cream-dim uppercase tracking-wider">
          Verified Stack
        </span>
      </div>

      {/* Intro Heading: Poppins 700 with ONE word in plaid gradient (K2) */}
      <div className="mb-14 max-w-2xl space-y-3">
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight leading-[1.08]">
          Instruments of{' '}
          <span className="text-gradient-plaid">craft</span>.
        </h2>
        <p className="font-sans text-body text-cream-dim leading-relaxed">
          The engineering toolkit is organized around two balanced pillars: backend distributed systems and native Android architecture. Hover or focus any instrument tile to inspect its implementation pedigree.
        </p>
      </div>

      {/* Two Equal Monumental Pillars: Backend & Android (K3) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 pb-14 border-b border-[#efe6dd]/10">
        <TechGrid
          title="Backend Systems & Distributed Streams"
          categoryLabel="02.1 • Primary"
          techs={backendTechs}
          activeTech={activeItem}
          onHoverTech={handleHover}
          onLeaveTech={handleLeave}
        />

        <TechGrid
          title="Android Engineering & Mobile Architecture"
          categoryLabel="02.2 • Primary"
          techs={androidTechs}
          activeTech={activeItem}
          onHoverTech={handleHover}
          onLeaveTech={handleLeave}
        />
      </div>

      {/* Secondary Disciplines: Testing, Languages, Tools & Cloud */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-[#efe6dd]/10">
        <TechGrid
          title="Testing & Performance"
          categoryLabel="02.3 • Quality"
          techs={testingTechs}
          activeTech={activeItem}
          onHoverTech={handleHover}
          onLeaveTech={handleLeave}
          compact
        />

        <TechGrid
          title="Core Languages"
          categoryLabel="02.4 • Polyglot"
          techs={languageTechs}
          activeTech={activeItem}
          onHoverTech={handleHover}
          onLeaveTech={handleLeave}
          compact
        />

        <TechGrid
          title="Tools, Cloud & Web3"
          categoryLabel="02.5 • Ecosystem"
          techs={toolsTechs}
          activeTech={activeItem}
          onHoverTech={handleHover}
          onLeaveTech={handleLeave}
          compact
        />
      </div>

      {/* Live Plaque Under Exhibits (JetBrains Mono 12px uppercase) */}
      <div className="mt-10 p-5 rounded-2xl bg-white/[0.02] border border-[#efe6dd]/15 font-mono text-xs uppercase tracking-[0.06em] transition-all duration-300">
        {activeItem ? (
          <div className="space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <span className="text-plaid font-bold">{activeItem.name}</span>
              <span className="text-[#efe6dd]/30">•</span>
              <span className="text-cream font-medium">Category: {activeItem.category}</span>
              <span className="text-[#efe6dd]/30">•</span>
              <span className="text-cream-dim">Source: {activeItem.source}</span>
            </div>
            <div className="text-cream-dim font-normal tracking-wide normal-case font-sans text-sm">
              {activeItem.plaque}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-cream-dim/70">
            <span>
              EXHIBIT 02 • SYSTEM INSTRUMENTS • 37 TOTAL VERIFIED TECHNOLOGIES
            </span>
            <span className="hidden sm:inline-block text-plaid">
              HOVER / FOCUS ANY CHIP TO READ ARCHITECTURAL SPECIFICATION
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
