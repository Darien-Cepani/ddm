"use client";

import { useEffect, useRef } from "react";
import { RiCompass3Line, RiPencilRulerLine, RiCodeBoxLine, RiRocket2Line, RiLineChartLine } from "@remixicon/react";
import { useT } from "@/components/i18n/LocaleProvider";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";

const ICONS = [RiCompass3Line, RiPencilRulerLine, RiCodeBoxLine, RiRocket2Line, RiLineChartLine];

/**
 * Process timeline: small step numbers sit ABOVE a scroll-drawn connector line;
 * the node, icon, title and copy sit below it.
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
          scrollTrigger: { trigger: ".process-track", start: "top 72%", end: "bottom 80%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.from(step, {
          autoAlpha: 0,
          y: 30,
          duration: 0.7,
          ease: EASE.out,
          scrollTrigger: { trigger: step, start: "top 90%", once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className="relative scroll-mt-24 overflow-hidden bg-grass py-24 text-milk sm:py-32">
      <div
        className="pointer-events-none absolute right-0 top-0 h-[40vmax] w-[40vmax] translate-x-1/3 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(192,245,61,0.18), transparent)" }}
      />
      <div className="shell relative">
        <span className="font-sans text-eyebrow uppercase tracking-[0.18em] text-milk/60">{t.process.eyebrow}</span>
        <h2 className="mt-6 max-w-3xl font-display text-h2">{t.process.title}</h2>

        <div className="process-track relative mt-20">
          {/* connector line (desktop) */}
          <div className="absolute left-0 right-0 top-[46px] hidden h-px bg-milk/15 lg:block">
            <div className="process-line h-full w-full origin-left bg-accent" />
          </div>

          <div className="grid gap-12 lg:grid-cols-5 lg:gap-6">
            {t.process.steps.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <div key={s.n} className="process-step relative lg:pt-[84px]">
                  {/* small step number ABOVE the line */}
                  <span className="font-sans text-xs font-medium tabular-nums tracking-[0.2em] text-accent lg:absolute lg:left-0 lg:top-[16px]">
                    {s.n}
                  </span>
                  {/* node on the line */}
                  <span className="hidden h-3.5 w-3.5 rounded-full bg-accent ring-4 ring-grass lg:absolute lg:left-0 lg:top-[40px] lg:block" />

                  {/* content below the line */}
                  <div className="mt-5 lg:mt-0">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl border border-milk/15 bg-grass text-accent">
                      <Icon size={28} />
                    </span>
                    <h3 className="mt-5 font-display text-h3">{s.title}</h3>
                    <p className="mt-2 font-sans text-sm text-milk/60">{s.line}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
