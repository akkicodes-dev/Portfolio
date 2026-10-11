import React from 'react';
import { TechChip } from '../tech/TechChip';

interface ProjectVisualExhibitProps {
  projectTitle: string;
}

export const ProjectVisualExhibit: React.FC<ProjectVisualExhibitProps> = ({ projectTitle }) => {
  const getExhibitData = (title: string) => {
    switch (title) {
      case 'PulseStream':
        return {
          slug: 'pulsestream',
          name: 'PulseStream',
          verifiedLine:
            'Modular monolith for real-time event ingestion returning 202, partitioned by userId with dead-letter topic, and Kafka Streams session aggregation.',
          stack: [
            'Java',
            'Spring Boot',
            'Apache Kafka',
            'Kafka Streams',
            'PostgreSQL',
            'Docker',
            'Flyway',
            'JUnit 5',
          ],
        };
      case 'NoteFlow':
        return {
          slug: 'noteflow',
          name: 'NoteFlow',
          verifiedLine:
            'Offline-first note-taking app built with Jetpack Compose, MVVM + Clean Architecture, Room, and Coroutines.',
          stack: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Kotlin Coroutines', 'Material Design'],
        };
      case 'Career Guru':
        return {
          slug: 'career-guru',
          name: 'Career Guru',
          verifiedLine:
            'Android career exploration application engineered with Java, XML layouts, Firebase Authentication, and Material 3.',
          stack: ['Java', 'Android', 'Firebase', 'Material Design'],
        };
      case 'Crowd3':
        return {
          slug: 'crowd3',
          name: 'Crowd3',
          verifiedLine:
            'Trustless crowdfunding DApp on Ethereum, gas-optimized smart contracts, transparent on-chain fund tracking, Top 10 nationwide at the VIT Web3 Hackathon.',
          stack: ['Solidity', 'Ethereum', 'Web3.js', 'Android'],
        };
      default:
        return {
          slug: 'project',
          name: title,
          verifiedLine: 'Production-grade software engineering project.',
          stack: [],
        };
    }
  };

  const data = getExhibitData(projectTitle);

  return (
    <div
      className="w-full rounded-2xl bg-[#050813]/60 border border-[#efe6dd]/15 p-6 sm:p-8 space-y-4"
      aria-label={`${data.name} Visual Exhibit`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#efe6dd]/10 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-none bg-plaid/70 shrink-0" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-plaid font-semibold">
            Exhibit Record • {data.name}
          </span>
        </div>
        <span className="font-mono text-xs text-cream-dim/80 uppercase tracking-wider">
          Screenshot coming soon
        </span>
      </div>

      {/* Verified Summary Line */}
      <p className="font-sans text-sm sm:text-base text-cream leading-relaxed max-w-[65ch]">
        {data.verifiedLine}
      </p>

      {/* Stack Chips */}
      <div className="pt-2 flex flex-wrap gap-2">
        {data.stack.map((tech) => (
          <TechChip key={tech} nameOrSlug={tech} compact showName />
        ))}
      </div>
    </div>
  );
};
