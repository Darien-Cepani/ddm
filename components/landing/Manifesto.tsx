"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") gsap.registerPlugin(SplitText);

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(el, { type: "words" });
      gsap.set(split.words, { opacity: 0.18 });
      gsap.to(split.words, {
        opacity: 1,
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "bottom 55%",
          scrub: true,
        },
      });
    }, el);
    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative py-28 sm:py-40">
      <div className="shell">
        <span className="eyebrow">(01) — What we are</span>
        <p
          ref={ref}
          className="mt-8 max-w-5xl font-display text-h2 leading-[1.1]"
        >
          DDM is <span className="text-accent">digital</span>, <span className="text-accent">development</span> and{" "}
          <span className="text-accent">management</span>. We don&apos;t just make things look good — we build the
          systems behind them and stay to run them, until your numbers speak for themselves.
        </p>
      </div>
    </section>
  );
}
