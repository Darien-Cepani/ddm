"use client";

import { useT } from "@/components/i18n/LocaleProvider";

/**
 * Capability index — services LISTED, not advertised. The grid stays clean;
 * on hover each service reveals a tooltip explaining what it does FOR the
 * business. (The old marquee was removed as redundant.)
 */
export function Services() {
  const t = useT();

  return (
    <section id="services" className="relative scroll-mt-24 border-y border-line py-24 sm:py-28">
      <div className="shell">
        <span className="eyebrow">{t.services.eyebrow}</span>
        <h2 className="mt-6 max-w-3xl font-display text-h2">{t.services.title}</h2>
        <p className="mt-4 font-sans text-sm text-muted">{t.services.hint}</p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
        {t.services.items.map((s) => (
          <div
            key={s.name}
            data-cursor="hover"
            className="group relative flex items-center justify-between gap-3 overflow-hidden bg-bg px-6 py-7"
          >
            {/* lime sweep on hover */}
            <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-300 ease-expo group-hover:translate-y-0" />

            <span className="relative z-10 font-display text-h3 transition-colors group-hover:text-grass">{s.name}</span>
            <span className="relative z-10 font-sans text-xs text-muted transition-colors group-hover:text-grass">↗</span>

            {/* tooltip */}
            <span
              role="tooltip"
              className="pointer-events-none absolute inset-x-3 bottom-3 z-20 translate-y-2 rounded-xl border border-grass/15 bg-grass px-4 py-3 font-sans text-xs leading-snug text-milk opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            >
              {s.tip}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
