import type { ReactNode } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** ReactBits-style Magnetic wrapper: element eases toward the cursor on hover. */
export default function Magnetic({ children, className = '', strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.6, ease: 'power3.out' });
  };

  const handleLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
