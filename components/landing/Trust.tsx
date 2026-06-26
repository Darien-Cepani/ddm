"use client";

import { STATS, PILLARS } from "@/lib/content";
import { Counter } from "@/components/fx/Counter";
import { Marquee } from "@/components/fx/Marquee";
import { Reveal } from "@/components/fx/Reveal";

const LOGOS = ["NORTHWIND", "LUMEN", "OBSIDIAN", "VERDE", "ATLAS", "KINETIC", "HALCYON", "MERIDIAN"];

export function Trust() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="shell">
        <span className="eyebrow">(05) — Why teams trust us</span>

        {/* stats */}
        <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-bg p-8">
              <div className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none">
                <Counter value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
              </div>
              <p className="mt-3 font-sans text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* testimonial */}
        <Reveal className="mt-20 max-w-4xl">
          <blockquote className="font-display text-h2 leading-tight">
            &ldquo;They took our whole digital mess off our hands. New site, leads in one place, ads that
            finally pay back. We just <span className="text-accent">show up and grow</span>.&rdquo;
          </blockquote>
          <figcaption className="mt-6 font-sans text-sm text-muted">
            Placeholder Client — Founder, A Real Business
          </figcaption>
        </Reveal>
      </div>

      {/* logo marquee */}
      <div className="mt-20 border-y border-line py-8 font-sans text-sm uppercase tracking-[0.2em] text-muted">
        <Marquee items={LOGOS} speed={28} separator="—" />
      </div>

      {/* pillars */}
      <div className="shell mt-20">
        <Reveal stagger className="grid gap-px border border-line bg-line md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="bg-bg p-8">
              <h3 className="font-display text-h3">{p.title}</h3>
              <p className="mt-3 font-sans text-muted">{p.line}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
