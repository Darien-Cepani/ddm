"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** stagger direct children instead of animating the wrapper as one block */
  stagger?: boolean;
  y?: number;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Fade + rise on scroll-into-view. Honors reduced motion (renders instantly).
 */
export function Reveal({ children, className, stagger = false, y = 28, delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.set(targets, { autoAlpha: 0, y });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay,
        ease: EASE.out,
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, y, delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </Tag>
  );
}
