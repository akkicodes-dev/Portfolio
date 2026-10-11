import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/content';
import { Calendar, MapPin, Check } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative scroll-mt-28 py-16" aria-label="Room 05: Timeline">
      {/* Room Header Plaque with mono index and hairline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-14 border-b border-[#efe6dd]/15 font-mono text-xs gap-3">
        <div className="flex items-center gap-3">
          <span className="text-plaid font-semibold tracking-widest uppercase">
            05 / Timeline
          </span>
          <span className="text-[#efe6dd]/30">•</span>
          <span className="text-cream-dim uppercase tracking-wider">
            Chronology of Practice
          </span>
        </div>
        <span className="text-cream-dim uppercase tracking-wider">
          Industry & Community Leadership
        </span>
      </div>

      {/* Room Heading: Poppins 700 with ONE word in plaid gradient (K2) */}
      <div className="mb-14 max-w-2xl space-y-3">
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight leading-[1.08]">
          Chronology of <span className="text-gradient-plaid">practice</span>.
        </h2>
        <p className="font-sans text-body text-cream-dim leading-relaxed">
          From production Android modules at MountReach Solutions to founding national-scale developer hackathons and mentoring engineering communities.
        </p>
      </div>

      {/* Single Vertical Hairline Thread with Generous Gaps */}
      <div className="relative pl-6 sm:pl-10 border-l border-[#efe6dd]/20 space-y-16">
        {siteContent.experience.map((exp, idx) => (
          <motion.div
            key={exp.role + exp.organization}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative space-y-4"
          >
            {/* Square Hairline Marker (NO circles) */}
            <div
              className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-none bg-[#0a1020] border border-plaid flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="w-1.5 h-1.5 bg-plaid" />
            </div>

            {/* Meta Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
              <span className="text-plaid uppercase tracking-wider font-semibold">
                {exp.type === 'internship' ? 'Professional Internship' : 'Community Leadership'}
              </span>

              <div className="flex items-center gap-4 text-cream-dim">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-plaid" />
                  <span>{exp.period}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-plaid" />
                  <span>{exp.location}</span>
                </span>
              </div>
            </div>

            {/* Title & Organization */}
            <div>
              <h3 className="font-sans font-bold text-2xl text-cream">
                {exp.role}
              </h3>
              <div className="font-sans text-base text-cream-dim font-medium mt-0.5">
                {exp.organization}
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-body text-cream-dim leading-relaxed max-w-[62ch]">
              {exp.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 pt-2">
              {exp.highlights.map((h, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2.5 text-sm text-cream">
                  <Check className="w-4 h-4 text-plaid shrink-0 mt-0.5" />
                  <span className="font-sans leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Verified Milestones Ledger: Numbers in Poppins 700 64px+ tabular figures (K2) */}
      <div className="mt-16 pt-12 border-t border-[#efe6dd]/15 space-y-6">
        <div className="font-mono text-xs uppercase tracking-widest text-plaid font-semibold">
          Verified Milestones & Community Reach
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.achievements.map((ach) => (
            <div
              key={ach.title}
              className="p-6 rounded-2xl bg-white/[0.02] border border-[#efe6dd]/10 space-y-2"
            >
              <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-cream tracking-tight tabular-nums leading-none">
                {ach.value}{ach.suffix}
              </div>
              <div className="font-sans font-semibold text-sm sm:text-base text-plaid">
                {ach.title}
              </div>
              <div className="font-mono text-xs text-cream-dim leading-relaxed uppercase tracking-wider">
                {ach.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Plaque */}
      <div className="mt-10 p-5 rounded-2xl bg-[#050813]/60 border border-[#efe6dd]/15 font-mono text-xs uppercase tracking-[0.06em] text-plaid space-y-1">
        <div className="text-cream font-semibold">Exhibit 05 • Record of Timeline</div>
        <div className="text-cream-dim">Scope: Enterprise Android Development • National Hackathon Execution • Mentorship</div>
        <div className="text-plaid">Verification: PDEA COE Pune • MountReach Solutions • Unstop Igniters Club</div>
      </div>
    </section>
  );
};
