"use client";

import { Reveal } from "@/components/fx/Reveal";
import { useT } from "@/components/i18n/LocaleProvider";

/**
 * Glanceable identity: DDM = three pillars. No wall of text — the meaning lands
 * in one scan. Each letter is oversized; its word + one-line role sits beside it.
 */
export function Manifesto() {
  const t = useT();
  const letters = ["D", "D", "M"];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="shell">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow">{t.manifesto.eyebrow}</span>
          <span className="font-sans text-sm text-muted">— {t.manifesto.lead}</span>
        </div>

        <Reveal stagger className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {t.manifesto.pillars.map((p, i) => (
            <div key={p.k} className="group relative flex flex-col justify-between gap-10 bg-bg p-8 sm:p-10">
              <span className="font-display text-[clamp(4rem,9vw,7rem)] leading-none text-accent transition-transform duration-500 group-hover:-translate-y-1">
                {letters[i]}
              </span>
              <div>
                <h3 className="font-display text-h3">{p.k}</h3>
                <p className="mt-2 font-sans text-muted">{p.d}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
