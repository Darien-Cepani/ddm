"use client";

import { Reveal } from "@/components/fx/Reveal";
import { LogoGlyph } from "@/components/brand/LogoGlyph";
import { useT } from "@/components/i18n/LocaleProvider";

/**
 * "Who we are" — the DDM wordmark, decoded. Each real logo glyph (D · D · M)
 * stands above its meaning, so the brand mark itself explains the offering.
 */
export function Manifesto() {
  const t = useT();

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="eyebrow">{t.manifesto.eyebrow}</span>
          <span className="font-sans text-sm text-muted">— {t.manifesto.lead}</span>
        </div>

        <Reveal
          stagger
          className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line md:grid-cols-3"
        >
          {t.manifesto.pillars.map((p, i) => (
            <div
              key={p.k}
              className="group relative flex flex-col gap-8 bg-bg p-8 transition-colors duration-500 hover:bg-surface sm:p-10"
            >
              {/* big lime brand glyph */}
              <div className="text-accent-ink transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                <LogoGlyph index={i as 0 | 1 | 2} height={88} />
              </div>

              <div className="mt-auto">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-muted">0{i + 1}</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-4 font-display text-h3">{p.k}</h3>
                <p className="mt-2 font-sans text-muted">{p.d}</p>
              </div>

              {/* hover glow */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(60% 100% at 20% 0%, rgb(var(--accent) / 0.14), transparent)" }}
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
