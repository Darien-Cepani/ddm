"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** stagger direct children instead of animating the wrapper as one block */
  stagger?: boolean;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Robust fade + rise on scroll-into-view using IntersectionObserver + CSS.
 * Content can NEVER stay hidden: hidden state is applied only via JS (so no-JS
 * shows everything), and a failsafe timer reveals anything still hidden.
 */
export function Reveal({ children, className, stagger = false, delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = (stagger ? (Array.from(el.children) as HTMLElement[]) : [el as HTMLElement]).filter(Boolean);

    if (prefersReducedMotion()) {
      targets.forEach((t) => t.classList.add("reveal-in"));
      return;
    }

    targets.forEach((t, i) => {
      t.classList.add("reveal");
      t.style.transitionDelay = `${delay + (stagger ? i * 0.09 : 0)}s`;
    });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );
    targets.forEach((t) => io.observe(t));

    // failsafe — nothing stays hidden even if the observer never fires
    const fail = window.setTimeout(() => targets.forEach((t) => t.classList.add("reveal-in")), 2600);

    return () => {
      io.disconnect();
      window.clearTimeout(fail);
    };
  }, [stagger, delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
