import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const plaqueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable completely on touch devices
    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (hasTouch) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    let mouseX = -100;
    let mouseY = -100;
    let plaqueX = -100;
    let plaqueY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        gsap.set(dotRef.current, {
          x: mouseX,
          y: mouseY,
        });
      }

      // Check context labels on hovered element or parents
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorDataEl = target.closest('[data-cursor]') as HTMLElement | null;
        if (cursorDataEl) {
          const customLabel = cursorDataEl.getAttribute('data-cursor');
          setHoverLabel(customLabel);
        } else if (target.closest('a')) {
          const link = target.closest('a');
          if (link?.target === '_blank') {
            setHoverLabel('OPEN');
          } else {
            setHoverLabel(null);
          }
        } else {
          setHoverLabel(null);
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const tickerUpdate = () => {
      plaqueX += (mouseX - plaqueX) * 0.25;
      plaqueY += (mouseY - plaqueY) * 0.25;

      if (plaqueRef.current) {
        gsap.set(plaqueRef.current, {
          x: plaqueX + 14,
          y: plaqueY + 14,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    gsap.ticker.add(tickerUpdate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      gsap.ticker.remove(tickerUpdate);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Functional pointer dot (NO rings or circles) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-sm bg-plaid pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Plaque-style mono label tag (Rectangular glass plaque, NO ring) */}
      <div
        ref={plaqueRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-150 ${
          isVisible && hoverLabel ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {hoverLabel && (
          <div className="px-2 py-0.5 rounded-sm bg-[#0a1020]/90 border border-plaid/40 text-cream font-mono text-xs font-semibold tracking-wider select-none shadow-md backdrop-blur-sm">
            {hoverLabel}
          </div>
        )}
      </div>
    </>
  );
};
