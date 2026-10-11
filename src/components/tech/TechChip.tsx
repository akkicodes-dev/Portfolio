import React, { useState } from 'react';
import { getTechItem, type TechItem } from '../../data/tech';

interface TechChipProps {
  nameOrSlug: string;
  item?: TechItem;
  compact?: boolean;
  showName?: boolean;
  onHover?: (item: TechItem) => void;
  onLeave?: () => void;
  className?: string;
}

export const TechChip: React.FC<TechChipProps> = ({
  nameOrSlug,
  item: propItem,
  compact = false,
  showName = true,
  onHover,
  onLeave,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const item = propItem || getTechItem(nameOrSlug);

  const displayName = item ? item.name : nameOrSlug;
  const isMonogram = !item || item.source === 'monogram';

  // Determine hover color, falling back to cream if brand is near-black for dark navy legibility
  const getHoverColor = () => {
    if (!item) return '#5b8def';
    if (item.darkFallback) return item.darkFallback;
    const hex = item.brandHex.toLowerCase();
    if (hex === '#000000' || hex === '#181717' || hex === '#231f20' || hex === '#363636' || hex === '#3c3c3d') {
      return '#efe6dd';
    }
    return item.brandHex;
  };

  const hoverColor = getHoverColor();

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item && onHover) onHover(item);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onLeave) onLeave();
  };

  const handleFocus = () => {
    setIsHovered(true);
    if (item && onHover) onHover(item);
  };

  const handleBlur = () => {
    setIsHovered(false);
    if (onLeave) onLeave();
  };

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={`${displayName} technology`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`inline-flex items-center gap-2.5 transition-all duration-200 select-none cursor-default group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5b8def] ${
        isHovered ? '-translate-y-0.5' : ''
      } ${className}`}
    >
      {/* 40x40 (or 32x32 compact) Rounded-Square Tile (radius 12px, NOT a circle) */}
      <div
        className={`relative flex items-center justify-center rounded-xl border border-[#efe6dd]/15 bg-white/[0.03] transition-all duration-300 backdrop-blur-md shadow-sm shrink-0 ${
          compact ? 'w-8 h-8 rounded-lg' : 'w-10 h-10'
        } ${isHovered ? 'border-[#efe6dd]/40 bg-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.3)]' : ''}`}
      >
        {isMonogram ? (
          <span
            className={`font-mono font-bold tracking-tight transition-colors duration-200 ${
              compact ? 'text-xs' : 'text-xs'
            }`}
            style={{ color: isHovered ? hoverColor : '#efe6ddcc' }}
          >
            {item?.monogram || displayName.slice(0, 2).toUpperCase()}
          </span>
        ) : (
          <svg
            viewBox={item.viewBox || '0 0 24 24'}
            aria-hidden="true"
            className={`transition-colors duration-200 shrink-0 ${compact ? 'w-4 h-4' : 'w-5 h-5'}`}
            style={{
              fill: isHovered ? hoverColor : 'rgba(239, 230, 221, 0.8)',
            }}
          >
            {item.paths?.map((d, idx) => (
              <path key={idx} d={d} />
            ))}
          </svg>
        )}
      </div>

      {/* Tech Name Label beside tile */}
      {showName && (
        <span
          className={`font-sans font-medium transition-colors duration-200 ${
            compact ? 'text-xs' : 'text-sm'
          } ${isHovered ? 'text-[#efe6dd]' : 'text-cream-dim'}`}
        >
          {displayName}
        </span>
      )}
    </div>
  );
};
