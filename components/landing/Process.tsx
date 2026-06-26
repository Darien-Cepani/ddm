"use client";

import { useEffect, useRef } from "react";
import { RiCompass3Line, RiPencilRulerLine, RiCodeBoxLine, RiRocket2Line, RiLineChartLine } from "@remixicon/react";
import { useT } from "@/components/i18n/LocaleProvider";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";

const ICONS = [RiCompass3Line, RiPencilRulerLine, RiCodeBoxLine, RiRocket2Line, RiLineChartLine];

/**
 * Attention-grabbing process: oversized numbers, icon medallions, a scroll-drawn
 * connector line, and cards that lift as they enter.
 */
export function Process() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left",
          scrollTrigger: { trigger: ".process-track", start: "top 75%", end: "bottom 85%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.from(step, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: { trigger: step, start: "top 88%", once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className="relative scroll-mt-24 overflow-hidden bg-grass py-24 text-milk sm:py-32">
      {/* spacey accent glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[40vmax] w-[40vmax] translate-x-1/3 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(192,245,61,0.18), transparent)" }}
      />
      <div className="shell relative">
        <span className="font-sans text-eyebrow uppercase tracking-[0.18em] text-milk/60">{t.process.eyebrow}</span>
        <h2 className="mt-6 max-w-3xl font-display text-h2">{t.process.title}</h2>

        <div className="process-track relative mt-16">
          {/* horizontal connector on large screens */}
          <div className="absolute left-0 top-[44px] hidden h-px w-full bg-milk/15 lg:block">
            <div className="process-line h-full w-full origin-left bg-accent" />
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {t.process.steps.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <div key={s.n} className="process-step relative">
                  <div className="flex items-center justify-between">
                    <span className="grid h-[88px] w-[88px] place-items-center rounded-2xl border border-milk/15 bg-grass text-accent">
                      <Icon size={34} />
                    </span>
                    <span className="font-display text-5xl text-milk/15">{s.n}</span>
                  </div>
                  <h3 className="mt-6 font-display text-h3">{s.title}</h3>
                  <p className="mt-2 font-sans text-sm text-milk/60">{s.line}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
