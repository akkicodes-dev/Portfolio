import React from 'react';
import { siteContent } from '../../data/content';
import { ExternalLink, GitPullRequest } from 'lucide-react';

export const OpenSourceSection: React.FC = () => {
  return (
    <section id="opensource" className="relative scroll-mt-28 py-16" aria-label="Room 04: Commons">
      {/* Room Header Plaque with mono index and hairline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-12 border-b border-[#efe6dd]/15 font-mono text-xs gap-3">
        <div className="flex items-center gap-3">
          <span className="text-plaid font-semibold tracking-widest uppercase">
            04 / Commons
          </span>
          <span className="text-[#efe6dd]/30">•</span>
          <span className="text-cream-dim uppercase tracking-wider">
            Public Ecosystem Ledger
          </span>
        </div>
        <span className="text-cream-dim uppercase tracking-wider">
          Verified Merged PRs
        </span>
      </div>

      {/* Room Heading: Poppins 700 with ONE word in plaid gradient (K2) */}
      <div className="mb-10 max-w-2xl space-y-3">
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight leading-[1.08]">
          Upstream <span className="text-gradient-plaid">commons</span>.
        </h2>
        <p className="font-sans text-body text-cream-dim leading-relaxed">
          {siteContent.openSource.summary}
        </p>
      </div>

      {/* Clean Gallery Ledger with Hairline Dividers */}
      <div className="rounded-2xl border border-[#efe6dd]/15 bg-white/[0.02] overflow-hidden">
        {/* Ledger Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-white/[0.03] border-b border-[#efe6dd]/10 font-mono text-xs uppercase tracking-wider text-plaid">
          <div className="col-span-3">Repository</div>
          <div className="col-span-6">Contribution / Scope</div>
          <div className="col-span-2">Merged Date</div>
          <div className="col-span-1 text-right">Link</div>
        </div>

        {/* Ledger Rows */}
        <div className="divide-y divide-[#efe6dd]/10">
          {siteContent.openSource.prs.map((pr) => (
            <div
              key={pr.prNumber}
              className="p-6 md:px-6 md:py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-white/[0.03] transition-colors"
            >
              {/* Repository */}
              <div className="md:col-span-3 space-y-1">
                <a
                  href={pr.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-semibold text-cream hover:text-plaid transition-colors flex items-center gap-1.5 link-underline-wipe"
                >
                  <GitPullRequest className="w-3.5 h-3.5 text-plaid shrink-0" />
                  <span>{pr.repo}</span>
                </a>
                <div className="font-mono text-xs text-plaid">
                  PR #{pr.prNumber} • Upstream Main
                </div>
              </div>

              {/* Title / Scope */}
              <div className="md:col-span-6">
                <h3 className="font-sans font-medium text-base text-cream leading-snug">
                  {pr.title}
                </h3>
              </div>

              {/* Date & Badge */}
              <div className="md:col-span-2 font-mono text-xs text-cream-dim flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm bg-[#9a0002]/30 border border-[#ff3b3f]/40 text-cream font-semibold text-xs">
                  Merged
                </span>
                <span>{pr.mergedDate}</span>
              </div>

              {/* Link CTA with animated underline wipe */}
              <div className="md:col-span-1 md:text-right">
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-plaid hover:text-cream transition-colors link-underline-wipe"
                  aria-label={`Review PR #${pr.prNumber} on GitHub`}
                >
                  <span>Review</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Museum Plaque */}
      <div className="mt-8 p-5 rounded-2xl bg-[#050813]/60 border border-[#efe6dd]/15 font-mono text-xs uppercase tracking-[0.06em] text-plaid space-y-1">
        <div className="text-cream font-semibold">Exhibit 04 • Open Source Commons</div>
        <div className="text-cream-dim">Scope: Architectural refactoring, clean language validation, and log hygiene</div>
        <div>Status: Peer-reviewed and merged into production upstream repository</div>
      </div>
    </section>
  );
};
