"use client";

import { useEffect, useRef } from "react";
import { PROCESS } from "@/lib/content";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";

export function Process() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // draw the vertical line
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: ".process-track", start: "top 70%", end: "bottom 80%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.from(step, {
          autoAlpha: 0,
          x: -24,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: { trigger: step, start: "top 82%", once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className="relative scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="shell">
        <span className="eyebrow">(06) — How it works</span>
        <h2 className="mt-6 max-w-3xl font-display text-h2">
          Five steps. No mystery. No mess.
        </h2>

        <div className="process-track relative mt-16 pl-8 sm:pl-12">
          {/* track line */}
          <div className="absolute left-[3px] top-2 h-[calc(100%-2rem)] w-px bg-line sm:left-[7px]">
            <div className="process-line h-full w-full origin-top bg-accent" />
          </div>

          <div className="flex flex-col gap-14">
            {PROCESS.map((p) => (
              <div key={p.n} className="process-step relative">
                <span className="absolute -left-8 top-1.5 h-2 w-2 rounded-full bg-accent sm:-left-12 sm:h-3.5 sm:w-3.5" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="font-sans text-sm tabular-nums text-accent">{p.n}</span>
                  <div>
                    <h3 className="font-display text-h3">{p.title}</h3>
                    <p className="mt-2 max-w-xl font-sans text-muted">{p.line}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
