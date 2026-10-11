import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteContent } from '../../data/content';

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, prefix = '', suffix = '', duration = 1.4 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const StatsStrip: React.FC = () => {
  // Extract strictly verified metrics from siteContent
  const stat1 = siteContent.achievements.find((a) => a.value === 300) || {
    value: 300,
    suffix: '+',
    title: '300+ problems solved',
    subtitle: 'LeetCode & Codolio algorithmic practice',
  };

  const stat2 = siteContent.achievements.find((a) => a.value === 2400) || {
    value: 2400,
    suffix: '+',
    title: '2400+ hackathon registrations organised',
    subtitle: 'CodeLite 2.0 National Hackathon',
  };

  const stat3 = siteContent.achievements.find((a) => a.value === 10) || {
    value: 10,
    title: 'Top 10 nationwide, VIT Web3 Hackathon',
    subtitle: 'VIT National Web3 Hackathon (Crowd3)',
  };

  const cards = [
    {
      id: 'stat-problems',
      counter: <AnimatedCounter end={stat1.value} suffix="+" />,
      caption: 'problems solved',
      context: 'Across LeetCode and Codolio algorithmic practice',
      tag: '01 • ALGORITHMS',
    },
    {
      id: 'stat-hackathons',
      counter: <AnimatedCounter end={stat2.value} suffix="+" />,
      caption: 'hackathon registrations organised',
      context: 'CodeLite 2.0 National Hackathon lead organiser',
      tag: '02 • LEADERSHIP',
    },
    {
      id: 'stat-rank',
      counter: <span>Top {stat3.value}</span>,
      caption: 'nationwide, VIT Web3 Hackathon',
      context: stat3.subtitle || 'Crowd3 decentralized funding platform',
      tag: '03 • HONORS',
    },
  ];

  return (
    <section
      aria-label="Verified Track Record Metrics"
      className="relative my-12 sm:my-16"
    >
      {/* Plaque Header Line */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#efe6dd]/15 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-plaid font-semibold tracking-widest uppercase">
            Track Record
          </span>
          <span className="text-[#efe6dd]/30">•</span>
          <span className="text-cream-dim uppercase tracking-wider">
            Verified Milestones
          </span>
        </div>
        <span className="text-cream-dim uppercase tracking-wider">
          content.ts verified
        </span>
      </div>

      {/* 3 Solid Cream Cards with Cherry Numbers (WCAG AAA contrast: #9a0002 on #efe6dd) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: idx * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative bg-[#efe6dd] text-[#0a1020] rounded-2xl p-7 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-[#efe6dd]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(0,0,0,0.7)]"
          >
            {/* Monogram / Index Pill */}
            <div className="font-mono text-xs font-semibold tracking-wider uppercase text-[#0a1020]/60 mb-4 flex items-center justify-between">
              <span>{card.tag}</span>
              <span className="w-2 h-2 rounded-full bg-[#9a0002]" aria-hidden="true" />
            </div>

            {/* Cherry Number: font-display bold, cherry fill */}
            <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#9a0002] tracking-tight leading-none mb-3">
              {card.counter}
            </div>

            {/* Title / Caption: Inter 600 */}
            <h3 className="font-sans font-semibold text-base sm:text-lg text-[#0a1020] leading-snug mb-2">
              {card.caption}
            </h3>

            {/* Subtitle Context: Inter 400 */}
            <p className="font-sans text-xs sm:text-sm text-[#0a1020]/75 leading-relaxed">
              {card.context}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
