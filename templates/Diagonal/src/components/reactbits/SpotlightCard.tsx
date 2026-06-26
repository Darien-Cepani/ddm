import type { ReactNode } from 'react';
import { useRef } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * ReactBits-style Spotlight Card: a soft radial highlight follows the cursor.
 * Pairs with the `.card-arch .spotlight .corner-ticks` utilities.
 */
export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`reveal card-arch spotlight corner-ticks ${className}`}
    >
      {children}
    </div>
  );
}
