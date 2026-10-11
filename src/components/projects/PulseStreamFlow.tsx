import React, { useEffect, useState } from 'react';

export const PulseStreamFlow: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const stages = [
    { id: 'client', name: 'Client', note: 'HTTP / Webhook' },
    { id: 'api', name: 'Ingestion API', note: 'POST /api/v1/events • 202' },
    { id: 'kafka', name: 'Apache Kafka', note: 'Keyed by userId • DLT' },
    { id: 'streams', name: 'Kafka Streams', note: 'Session Aggregation' },
    { id: 'db', name: 'PostgreSQL 16', note: 'Idempotent • Flyway' },
    { id: 'analytics', name: 'Analytics API', note: 'REST Time-Series' },
  ];

  return (
    <div
      className="p-6 sm:p-8 rounded-2xl bg-[#050813]/70 border border-[#efe6dd]/15 space-y-6 select-none"
      aria-label="PulseStream Typographic Architecture Flow"
    >
      <div className="flex items-center justify-between border-b border-[#efe6dd]/10 pb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-plaid font-semibold">
          Architecture • Event Pipeline
        </span>
        <span className="font-mono text-xs text-cream-dim">Client → Ingestion API → Kafka → Streams + Consumer → PostgreSQL → Analytics API</span>
      </div>

      {/* Typographic Flow Diagram */}
      <div className="relative">
        {/* Animated Dashed Connector Line */}
        <div className="hidden lg:block absolute top-6 left-6 right-6 h-[1px] bg-[#efe6dd]/15 z-0" />
        <svg
          className="hidden lg:block absolute top-5 left-6 right-6 w-full h-3 pointer-events-none z-10 overflow-visible"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="5"
            x2="100%"
            y2="5"
            stroke="#5b8def"
            strokeWidth="1.5"
            strokeDasharray="6 12"
            className={prefersReducedMotion ? '' : 'animate-stream-flow'}
          />
        </svg>

        {/* Stages Grid */}
        <div className="relative z-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((stage, idx) => (
            <div
              key={stage.id}
              className="p-3 sm:p-3.5 rounded-xl bg-[#0a1020]/90 border border-[#efe6dd]/15 space-y-1"
            >
              <div className="flex items-center justify-between font-mono text-xs text-plaid">
                <span>0{idx + 1}</span>
                {/* Square marker (NO circles) */}
                <span className="w-1.5 h-1.5 bg-plaid/60" />
              </div>
              <div className="font-sans font-semibold text-sm text-cream leading-tight">
                {stage.name}
              </div>
              <div className="font-mono text-xs text-cream-dim leading-snug">
                {stage.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Verified Production Highlights */}
      <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-cream-dim">
        <div className="p-3 rounded-lg bg-white/[0.02] border border-[#efe6dd]/10 flex items-start gap-2">
          <span className="text-plaid font-bold">•</span>
          <span>
            <strong className="text-cream">202 Accepted Ingestion:</strong> API decouples via Kafka; never blocked by analytics persistence.
          </span>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-[#efe6dd]/10 flex items-start gap-2">
          <span className="text-plaid font-bold">•</span>
          <span>
            <strong className="text-cream">Per-User Ordering:</strong> Events keyed by userId; malformed payloads safely isolated in dead-letter topic.
          </span>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-[#efe6dd]/10 flex items-start gap-2">
          <span className="text-plaid font-bold">•</span>
          <span>
            <strong className="text-cream">Stream Aggregation:</strong> Kafka Streams aggregates events into user sessions with configurable timeout.
          </span>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-[#efe6dd]/10 flex items-start gap-2">
          <span className="text-plaid font-bold">•</span>
          <span>
            <strong className="text-cream">Flyway Schema:</strong> Automated versioned migrations with analytics-optimized time-series indexing.
          </span>
        </div>
      </div>
    </div>
  );
};
