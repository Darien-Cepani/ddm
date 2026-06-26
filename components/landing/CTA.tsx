"use client";

import { SplitReveal } from "@/components/fx/SplitReveal";
import { Reveal } from "@/components/fx/Reveal";
import { MagneticButton } from "@/components/fx/MagneticButton";

const TIERS = [
  {
    name: "Free Forever",
    price: "€200",
    cadence: "once",
    highlight: true,
    line: "A premium, animated website live on ddm.al/yourname.",
    points: ["Premium design + animations", "Hosting & domain free — forever", "No renewals, no monthly bills"],
  },
  {
    name: "Your Own Domain",
    price: "€200",
    cadence: "+ €100 / year",
    highlight: false,
    line: "The same premium website, on your own custom domain.",
    points: ["Everything in Free Forever", "Your custom domain", "We handle all the setup"],
  },
];

export function CTA() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      {/* glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(var(--accent) / 0.14), transparent)" }}
      />

      <div className="shell relative">
        <span className="eyebrow">(08) — The offer</span>
        <SplitReveal as="h2" type="lines" className="mt-6 max-w-4xl font-display text-hero">
          A premium website. For dirt cheap. No headache.
        </SplitReveal>
        <p className="mt-6 max-w-xl font-sans text-lead text-muted">
          Clean, fast, optimised and animated — built to win you more visibility, revenue and clients.
          No constant payments. Just results.
        </p>

        {/* tiers */}
        <Reveal stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl border p-8 sm:p-10 ${
                t.highlight ? "border-accent bg-surface" : "border-line"
              }`}
            >
              {t.highlight && (
                <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 font-sans text-[0.7rem] uppercase tracking-[0.16em] text-grass">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-h3">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none">{t.price}</span>
                <span className="font-sans text-sm text-muted">{t.cadence}</span>
              </div>
              <p className="mt-4 font-sans text-muted">{t.line}</p>
              <ul className="mt-6 flex flex-col gap-3 font-sans text-sm">
                {t.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {pt}
                  </li>
                ))}
              </ul>
              <MagneticButton
                href="mailto:contact@ddm.al"
                className={`mt-9 ${t.highlight ? "btn-primary" : "btn-ghost"}`}
              >
                Start your site
              </MagneticButton>
            </div>
          ))}
        </Reveal>

        {/* closing line */}
        <div className="mt-28 text-center">
          <SplitReveal as="p" type="words" className="font-display text-hero">
            Stop planning. <span className="text-accent">Start doing.</span>
          </SplitReveal>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="mailto:contact@ddm.al" className="btn-primary text-base" strength={0.5}>
              Start a project →
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
