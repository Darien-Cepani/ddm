"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

type Props = {
  items: string[];
  className?: string;
  /** pixels travelled per second */
  speed?: number;
  separator?: string;
};

/**
 * Seamless infinite marquee. One "set" of items is measured, then enough copies
 * are rendered to always overflow the container; the track loops by exactly one
 * set width so there is never a visible gap or abrupt reset.
 */
export function Marquee({ items, className, speed = 70, separator = "·" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const set = setRef.current;
    if (!wrap || !track || !set) return;

    const setW = set.offsetWidth;
    if (!setW) return;

    // enough copies that the rendered track always exceeds the viewport + one set
    const needed = Math.max(2, Math.ceil(wrap.offsetWidth / setW) + 2);
    if (needed !== copies) {
      setCopies(needed);
      return; // re-render, effect runs again with the right number of copies
    }

    // identical sets => looping by one set width is visually seamless
    const tween = gsap.fromTo(
      track,
      { x: 0 },
      { x: -setW, duration: setW / speed, ease: "none", repeat: -1 }
    );

    const ro = new ResizeObserver(() => {
      const next = Math.max(2, Math.ceil(wrap.offsetWidth / set.offsetWidth) + 2);
      if (next !== copies) setCopies(next);
    });
    ro.observe(wrap);

    return () => {
      tween.kill();
      ro.disconnect();
    };
  }, [copies, items, speed]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={trackRef} className="flex w-max">
        {Array.from({ length: copies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? setRef : undefined}
            aria-hidden={i === 0 ? undefined : true}
            className="flex shrink-0 items-center gap-10 pr-10"
          >
            {items.map((it, j) => (
              <span key={j} className="flex items-center gap-10 whitespace-nowrap">
                {it}
                <span className="text-accent-ink">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
