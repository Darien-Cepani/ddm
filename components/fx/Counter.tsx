"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
};

/** Rolls a number up from 0 when scrolled into view. */
export function Counter({ value, suffix = "", prefix = "", decimals = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
    if (prefersReducedMotion()) {
      el.textContent = format(value);
      return;
    }
    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = format(obj.n);
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value, suffix, prefix, decimals]);

  return <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>;
}
