"use client";

import { SERVICES } from "@/lib/content";
import { Marquee } from "@/components/fx/Marquee";

/**
 * Capability index — services LISTED, not advertised. No copy, no pricing,
 * just confident range. Quiet grid + a slow reactive marquee.
 */
export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 border-y border-line py-24 sm:py-28">
      <div className="shell">
        <span className="eyebrow">(04) — Capabilities</span>
        <h2 className="mt-6 max-w-3xl font-display text-h2">
          Everything a modern business needs — under one roof.
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <div
            key={s}
            data-cursor="hover"
            className="group relative flex items-center justify-between overflow-hidden bg-bg px-6 py-7 transition-colors"
          >
            <span className="relative z-10 font-display text-h3 transition-colors group-hover:text-grass">{s}</span>
            <span className="relative z-10 font-sans text-xs text-muted transition-colors group-hover:text-grass">↗</span>
            <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-300 ease-expo group-hover:translate-y-0" />
          </div>
        ))}
      </div>

      <div className="mt-14 font-display text-h3 text-muted">
        <Marquee items={[...SERVICES]} speed={36} />
      </div>
    </section>
  );
}
