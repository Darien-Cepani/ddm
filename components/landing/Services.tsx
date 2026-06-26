"use client";

import { RiArrowRightUpLine } from "@remixicon/react";
import { useT } from "@/components/i18n/LocaleProvider";

/**
 * Capability index — services LISTED, not advertised. Each cell shows the
 * service name plus a short line on what it does for the business (always
 * visible, so nothing is obstructed and it works on touch). Hover fills lime.
 */
export function Services() {
  const t = useT();

  return (
    <section id="services" className="relative scroll-mt-24 border-y border-line py-24 sm:py-28">
      <div className="shell">
        <span className="eyebrow">{t.services.eyebrow}</span>
        <h2 className="mt-6 max-w-3xl font-display text-h2">{t.services.title}</h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {t.services.items.map((s) => (
          <div
            key={s.name}
            data-cursor="hover"
            className="group relative flex min-h-[148px] flex-col justify-between gap-6 overflow-hidden bg-bg p-7"
          >
            {/* lime sweep on hover */}
            <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-300 ease-expo group-hover:translate-y-0" />

            <div className="relative z-10 flex items-start justify-between gap-3">
              <h3 className="font-display text-h3 transition-colors group-hover:text-grass">{s.name}</h3>
              <RiArrowRightUpLine
                size={20}
                className="mt-1 shrink-0 text-muted transition-colors group-hover:text-grass"
              />
            </div>
            <p className="relative z-10 max-w-[34ch] font-sans text-sm leading-snug text-muted transition-colors group-hover:text-grass/90">
              {s.tip}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
