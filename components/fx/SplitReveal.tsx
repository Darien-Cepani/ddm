"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

type Props = {
  children: React.ReactNode;
  className?: string;
  /** "lines" | "words" — granularity of the mask reveal */
  type?: "lines" | "words";
  /** play on mount (hero) vs on scroll-into-view */
  trigger?: "load" | "scroll";
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
};

/** Masked line/word reveal for headlines. Falls back to instant under reduced motion. */
export function SplitReveal({ children, className, type = "lines", trigger = "scroll", delay = 0, as = "h2" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 1 });
      split = new SplitText(el, {
        type,
        linesClass: "line-mask-child",
      });
      const targets = type === "lines" ? split.lines : split.words;
      gsap.set(targets, { yPercent: 110 });
      // wrap lines in overflow-hidden for the mask effect
      targets.forEach((t) => {
        (t as HTMLElement).style.display = "inline-block";
      });
      gsap.to(targets, {
        yPercent: 0,
        duration: 1.1,
        ease: EASE.out,
        stagger: 0.08,
        delay,
        ...(trigger === "scroll"
          ? { scrollTrigger: { trigger: el, start: "top 85%", once: true } }
          : {}),
      });
    }, el);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [type, trigger, delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </Tag>
  );
}
