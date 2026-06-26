"use client";

import { useEffect, useRef } from "react";
import { Starfield } from "@/components/fx/Starfield";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      if (subRef.current) gsap.set(subRef.current.children, { autoAlpha: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      // intro for the sub-content (headline handled by SplitReveal)
      gsap.set(subRef.current!.children, { autoAlpha: 0, y: 24 });
      gsap.to(subRef.current!.children, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: EASE.out,
        stagger: 0.12,
        delay: 0.7,
      });
      // parallax content out on scroll
      gsap.to(".hero-content", {
        yPercent: -18,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* WebGL backdrop */}
      <div className="absolute inset-0">
        <Starfield />
      </div>
      {/* lime glow + grain + readability scrim */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/3 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgb(var(--accent) / 0.16), transparent)" }}
        />
        <div className="grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 80% at 50% 60%, transparent 40%, rgb(var(--bg) / 0.6) 100%)" }}
        />
      </div>

      <div className="hero-content shell relative z-10 pt-24">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="eyebrow">Do Digital Media</span>
        </div>

        <SplitReveal as="h1" type="lines" trigger="load" delay={0.2} className="mt-6 max-w-5xl text-hero font-display">
          We build brands that <span className="italic text-accent">dominate</span> the market.
        </SplitReveal>

        <div ref={subRef} className="mt-8 max-w-xl">
          <p className="text-lead text-muted">
            Premium websites, systems and campaigns — clean, fast, animated. We don&apos;t launch and
            disappear. We stay, manage and optimise until the numbers speak for themselves.
          </p>
          <p className="mt-4 font-sans text-sm uppercase tracking-[0.18em] text-ink/70">
            Stop planning &mdash; start doing.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="#problems" className="btn-primary">
              See how we fix it
            </MagneticButton>
            <a href="#services" className="btn-ghost" data-cursor="hover">
              Our services
            </a>
          </div>
        </div>
      </div>

      {/* bottom row: scroll cue + micro stats */}
      <div className="absolute bottom-7 left-0 z-10 w-full">
        <div className="shell flex items-end justify-between">
          <div className="flex items-center gap-3 text-muted">
            <span className="block h-8 w-px animate-scroll-cue bg-accent" />
            <span className="font-sans text-xs uppercase tracking-[0.18em]">Scroll</span>
          </div>
          <div className="hidden gap-8 font-sans text-xs text-muted sm:flex">
            <span>120+ sites shipped</span>
            <span>avg load &lt;1s</span>
            <span>€0 hosting fees</span>
          </div>
        </div>
      </div>
    </section>
  );
}
