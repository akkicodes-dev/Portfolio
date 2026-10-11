import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteContent, type Achievement } from '../../data/content';
import { Trophy, Award, CheckCircle2, TrendingUp } from 'lucide-react';

interface CounterCardProps {
  achievement: Achievement;
  delay: number;
}

const SolidCreamCounterCard: React.FC<CounterCardProps> = ({ achievement, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = achievement.value;
    const duration = 2000;
    const incrementTime = 25;
    const steps = duration / incrementTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, achievement.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      {/* Solid Cream Card with Cherry Numbers (#efe6dd bg, #9a0002 numbers and text) */}
      <div className="card-cream-solid p-8 flex flex-col justify-between h-full shadow-2xl hover:scale-[1.02] transition-transform duration-300">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="p-2 rounded-full bg-[#9a0002]/10 border border-[#9a0002]/20 text-[#9a0002]">
              <TrendingUp className="w-4 h-4" />
            </div>
            {/* Verified Metric Chip (12px minimum) */}
            <span className="px-3 py-1 rounded-full border border-[#9a0002]/30 text-xs font-mono text-[#9a0002] uppercase font-semibold">
              Verified • Metric
            </span>
          </div>

          <div className="font-display font-bold text-5xl sm:text-6xl text-[#9a0002] tracking-tighter mb-2">
            <span>{count}</span>
            <span className="text-[#9a0002] text-4xl ml-0.5">{achievement.suffix}</span>
          </div>

          <h3 className="font-sans font-semibold text-h3 text-[#9a0002] mb-1">
            {achievement.title}
          </h3>
          <p className="font-sans text-small text-[#9a0002] font-medium leading-relaxed">
            {achievement.subtitle}
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-[#9a0002]/20 flex items-center gap-1.5 font-mono text-xs text-[#9a0002] font-semibold">
          <CheckCircle2 className="w-4 h-4 text-[#9a0002]" />
          <span>Verified Achievement</span>
        </div>
      </div>
    </motion.div>
  );
};

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="relative scroll-mt-28" aria-label="Achievements & Metrics">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-[#efe6dd]/15">
        <div>
          <div className="tag-chip text-cream font-medium mb-3">
            <Trophy className="w-3.5 h-3.5 text-plaid" />
            <span>05B / Milestones & Impact</span>
          </div>
          <h2 className="font-display font-bold text-h2 uppercase tracking-tight text-cream">
            Achievements & Metrics
          </h2>
        </div>
        <span className="font-mono text-xs text-cream-dim uppercase tracking-wider">
          Competitive & Community Impact
        </span>
      </div>

      {/* Solid Cream Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {siteContent.achievements.map((item, idx) => (
          <SolidCreamCounterCard key={item.title} achievement={item} delay={idx * 0.1} />
        ))}
      </div>

      {/* Verified Certifications in Spatial Glass */}
      <div className="spatial-glass p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-5 h-5 text-plaid" />
          <h3 className="font-sans font-semibold text-h3 text-cream tracking-tight">
            Industry Certifications
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {siteContent.certifications.map((cert) => (
            <div
              key={cert.title}
              className="p-5 rounded-2xl bg-white/[0.04] border border-[#efe6dd]/15 hover:border-plaid/50 transition-colors"
            >
              <div className="font-mono text-xs text-plaid font-semibold mb-1">
                {cert.issuer}
              </div>
              <div className="font-sans font-semibold text-base text-cream">
                {cert.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
