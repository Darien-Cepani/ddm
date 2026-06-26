"use client";

import Link from "next/link";
import { Reveal } from "@/components/fx/Reveal";

/**
 * Live work grid. Visitors just see beautiful examples — nothing about how the
 * paths work. Real entries link to their ddm.al/<slug> site.
 */
const WORK = [
  { name: "Aurora Coffee", sector: "Hospitality", href: "/aurora-coffee", hue: "from-[#1A2209] to-[#0A0D04]" },
  { name: "Northwind Studio", sector: "Architecture", href: "#", hue: "from-[#26331a] to-[#0A0D04]" },
  { name: "Verde Market", sector: "Ecommerce", href: "#", hue: "from-[#0A0D04] to-[#1A2209]" },
  { name: "Kinetic Fitness", sector: "Wellness", href: "#", hue: "from-[#1A2209] to-[#10140a]" },
];

export function Showcase() {
  return (
    <section id="showcase" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">(07) — Live work</span>
            <h2 className="mt-6 font-display text-h2">Sites we&apos;ve shipped.</h2>
          </div>
          <p className="max-w-sm font-sans text-muted">
            Real businesses, live and fast. Premium design, animation and systems — without the headache
            or the monthly bills.
          </p>
        </div>

        <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2">
          {WORK.map((w) => (
            <Link
              key={w.name}
              href={w.href}
              data-cursor="hover"
              className="group relative aspect-[16/11] overflow-hidden rounded-3xl border border-line"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${w.hue} transition-transform duration-700 group-hover:scale-105`} />
              {/* star specks */}
              <div className="starfield-fallback absolute inset-0 opacity-70" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(60% 50% at 50% 50%, rgb(var(--accent) / 0.18), transparent)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-h3 text-milk">{w.name}</h3>
                    <p className="mt-1 font-sans text-sm text-milk/60">{w.sector}</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-milk/30 text-milk transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-grass">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
