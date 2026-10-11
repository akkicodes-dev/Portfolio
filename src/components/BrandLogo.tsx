import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  animatedPathRef?: React.RefObject<SVGPathElement | null>;
  filled?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'w-8 h-8',
  showWordmark = false,
  animatedPathRef,
  filled = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span className="font-display font-extrabold tracking-tighter text-xl uppercase leading-none text-current">
        AKKI
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 shrink-0">
      {/* Monogram SVG Matching /public/logo.svg with stroke and fill capability */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} stroke-current shrink-0`}
        onError={() => setHasError(true)}
        aria-label="Akash Satao Monogram"
      >
        <path
          ref={animatedPathRef}
          d="M20 82 L50 18 L80 82"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-500"
          fill={filled ? 'currentColor' : 'none'}
        />
        <path
          d="M32 60 L68 60"
          strokeWidth="9"
          strokeLinecap="round"
          className="transition-colors duration-500"
        />
        {/* Geometric square apex instead of circle */}
        <rect
          x="46"
          y="14"
          width="8"
          height="8"
          rx="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>

      {/* Optional Wordmark in Poppins 800 */}
      {showWordmark && (
        <span className="font-display font-bold tracking-tight text-lg uppercase leading-none text-current">
          AKKI
        </span>
      )}
    </div>
  );
};
