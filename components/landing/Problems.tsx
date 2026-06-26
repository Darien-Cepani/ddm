"use client";

import { useEffect, useRef } from "react";
import { PROBLEMS } from "@/lib/content";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";

export function Problems() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".problem-card");
      cards.forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 60,
          duration: 0.9,
          ease: EASE.out,
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problems"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-surface py-24 sm:py-32"
    >
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        {/* pinned left column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">(02) — Sound familiar?</span>
          <h2 className="mt-6 font-display text-h2">
            Running a business is full of <span className="text-accent">headaches</span>.
          </h2>
          <p className="mt-6 max-w-sm font-sans text-muted">
            You didn&apos;t start your business to fight your website, chase leads in a spreadsheet, or
            guess where your ad money went. These are the ones we hear every week.
          </p>
        </div>

        {/* problem cards */}
        <div className="flex flex-col gap-5">
          {PROBLEMS.map((p, i) => (
            <article
              key={p.tag}
              className="problem-card group rounded-2xl border border-line bg-bg/40 p-7 sm:p-9"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-sans text-sm tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="rounded-full border border-line px-3 py-1 font-sans text-[0.7rem] uppercase tracking-[0.16em] text-accent">
                  {p.tag}
                </span>
              </div>
              <p className="mt-5 font-display text-h3 leading-snug">{p.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
