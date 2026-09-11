import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if touch device
    if (typeof window !== 'undefined') {
      try {
        if (typeof window.matchMedia === 'function') {
          const finePointer = window.matchMedia('(pointer: fine)').matches;
          setIsTouch(!finePointer);
          if (!finePointer) return;
        }
      } catch {
        // fallback to non-touch
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      try {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);

        const target = e.target instanceof Element ? e.target : null;
        if (target) {
          const isClickable =
            target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            (typeof target.closest === 'function' && Boolean(target.closest('button, a, [role="button"]'))) ||
            target.getAttribute?.('role') === 'button';
          setIsHovered(Boolean(isClickable));
        } else {
          setIsHovered(false);
        }
      } catch {
        // Guard against any event listener failure
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer subtle glow ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 border border-[#7A1B2E]/40 dark:border-[#F1A7C1]/50"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.6 : 1})`,
          width: '32px',
          height: '32px',
          backgroundColor: isHovered ? 'rgba(241, 167, 193, 0.15)' : 'transparent',
        }}
      />
      {/* Center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full -translate-x-1/2 -translate-y-1/2 bg-[#7A1B2E] dark:bg-[#F1A7C1] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 0.6 : 1})`,
          width: '6px',
          height: '6px',
        }}
      />
    </>
  );
}
