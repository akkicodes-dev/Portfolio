import React from 'react';
import { TechChip } from './TechChip';
import { getTechItem, type TechItem } from '../../data/tech';

interface TechGridProps {
  title: string;
  categoryLabel?: string;
  techs: string[];
  activeTech?: TechItem | null;
  onHoverTech?: (item: TechItem) => void;
  onLeaveTech?: () => void;
  compact?: boolean;
  className?: string;
}

export const TechGrid: React.FC<TechGridProps> = ({
  title,
  categoryLabel,
  techs,
  onHoverTech,
  onLeaveTech,
  compact = false,
  className = '',
}) => {
  return (
    <div className={`space-y-3.5 ${className}`}>
      {/* Category header with mono index and count */}
      <div className="flex items-center justify-between pb-2 border-b border-[#efe6dd]/10">
        <div className="flex items-center gap-2">
          {categoryLabel && (
            <span className="font-mono text-xs text-plaid tracking-wider font-semibold uppercase">
              {categoryLabel}
            </span>
          )}
          <h3 className="font-sans font-semibold text-sm sm:text-base text-[#efe6dd]">
            {title}
          </h3>
        </div>
        <span className="font-mono text-xs text-cream-dim/70">
          {techs.length} {techs.length === 1 ? 'Instrument' : 'Instruments'}
        </span>
      </div>

      {/* Grid of TechChips */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {techs.map((t) => {
          const item = getTechItem(t);
          return (
            <TechChip
              key={t}
              nameOrSlug={t}
              item={item}
              compact={compact}
              onHover={onHoverTech}
              onLeave={onLeaveTech}
            />
          );
        })}
      </div>
    </div>
  );
};
