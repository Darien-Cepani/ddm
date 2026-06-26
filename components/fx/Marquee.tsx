"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

type Props = {
  items: string[];
  className?: string;
  /** seconds per loop */
  speed?: number;
  separator?: string;
};

/**
 * Infinite marquee. CSS animation drives the base loop; scroll velocity nudges
 * the direction/speed for a subtle reactive feel.
 */
export function Marquee({ items, className, speed = 32, separator = "·" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: speed,
      ease: "none",
    });
    tweenRef.current = tween;

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        const target = 1 + Math.min(Math.abs(v) / 1200, 3);
        gsap.to(tween, { timeScale: target * (v < 0 ? -1 : 1), duration: 0.3, overwrite: true });
        gsap.to(tween, { timeScale: v < 0 ? -1 : 1, duration: 0.8, delay: 0.2, overwrite: false });
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, [speed]);

  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          {it}
          <span className="text-accent">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div ref={trackRef} className="flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
