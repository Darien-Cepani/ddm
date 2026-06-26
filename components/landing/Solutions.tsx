"use client";

import { useState } from "react";
import { SOLUTIONS } from "@/lib/content";
import { SplitReveal } from "@/components/fx/SplitReveal";

export function Solutions() {
  const [active, setActive] = useState(0);
  const current = SOLUTIONS[active];

  return (
    <section id="solutions" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* bridge line */}
      <div className="shell">
        <p className="max-w-3xl font-display text-h3 text-muted">
          You shouldn&apos;t have to juggle all of this.{" "}
          <span className="text-ink">We take the whole thing off your plate.</span>
        </p>
      </div>

      <div className="shell mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* sticky detail panel */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">(03) — How we fix it</span>
          <SplitReveal as="h2" type="lines" className="mt-6 font-display text-h2">
            One team. The whole stack. Zero headache.
          </SplitReveal>

          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-10">
            <div key={active} className="animate-[fadeIn_0.4s_ease]">
              <span className="font-sans text-sm uppercase tracking-[0.16em] text-accent">{current.tag}</span>
              <h3 className="mt-3 font-display text-h3">{current.title}</h3>
              <p className="mt-4 font-sans text-lead text-muted">{current.line}</p>
            </div>
            <div className="mt-8 flex gap-1.5">
              {SOLUTIONS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i === active ? "bg-accent" : "bg-line"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* interactive list */}
        <ul className="flex flex-col">
          {SOLUTIONS.map((s, i) => (
            <li key={s.tag}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor="hover"
                className={`group flex w-full items-baseline justify-between gap-6 border-b border-line py-7 text-left transition-colors ${
                  i === active ? "text-ink" : "text-ink/55 hover:text-ink"
                }`}
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-sans text-sm tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-h3">{s.title}</span>
                </span>
                <span
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${
                    i === active ? "scale-100 bg-accent" : "scale-0 bg-accent"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
