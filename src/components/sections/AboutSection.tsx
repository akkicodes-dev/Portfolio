import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../data/content';

export const AboutSection: React.FC = () => {
  // Break about text into lede (Inter 500) and continuation (Inter 400)
  const aboutSentences = siteContent.personal.about.split('. ');
  const lede = aboutSentences[0] + '.';
  const continuation = aboutSentences.slice(1).join('. ');

  return (
    <section id="about" className="relative scroll-mt-28 py-16" aria-label="Room 01: Statement">
      {/* Room Header Plaque with mono index and hairline */}
      <div className="flex items-center justify-between pb-4 mb-16 border-b border-[#efe6dd]/15 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-plaid font-semibold tracking-widest uppercase">
            01 / Statement
          </span>
          <span className="text-[#efe6dd]/30">•</span>
          <span className="text-cream-dim uppercase tracking-wider">
            Wall Text
          </span>
        </div>
        <span className="text-cream-dim uppercase tracking-wider">
          Pune, India
        </span>
      </div>

      {/* Asymmetric Gallery Wall: Columns 2-11 with deliberate 35% breathing space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-start-2 lg:col-span-10 space-y-10">
          {/* Monumental Headline: Poppins 700 with ONE word in plaid gradient (K2) */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight leading-[1.08] max-w-[48ch]"
          >
            Engineering scalable mobile{' '}
            <span className="text-gradient-plaid">systems</span> and event-driven architectures.
          </motion.h2>

          {/* Pull Statement: Large quote-style sentence with a single plaid keyword */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="pl-5 border-l-2 border-plaid font-display font-semibold text-[clamp(1.25rem,2.4vw,2rem)] text-cream leading-[1.3] max-w-[50ch]"
          >
            "Resilience begins where{' '}
            <span className="text-plaid">decoupling</span> guarantees that client telemetry is never blocked by downstream computation."
          </motion.blockquote>

          {/* Body Wall Text: Max 56ch, Inter 500 lede + Inter 400 continuation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-base sm:text-lg text-cream leading-[1.75] max-w-[56ch] space-y-3"
          >
            <p className="font-medium text-cream">
              {lede}
            </p>
            <p className="text-cream-dim">
              {continuation}
            </p>
          </motion.div>

          {/* Museum Exhibition Plaque */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-[#efe6dd]/15 font-mono text-xs uppercase tracking-[0.06em] text-plaid space-y-2 max-w-xl"
          >
            <div className="text-cream font-semibold tracking-wider">
              Plaque: Engineering Background & Credentials
            </div>
            <div className="text-cream-dim">
              Medium: Kotlin • Jetpack Compose • Java 21 • Spring Boot • Apache Kafka • PostgreSQL
            </div>
            <div className="text-cream-dim">
              Education: PDEA College of Engineering, Pune (CGPA 8.34/10, 2024–2027) • Govt Polytechnic Malvan
            </div>
            <div className="text-plaid pt-1">
              Role: Software Development Engineer (Android + Backend)
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
