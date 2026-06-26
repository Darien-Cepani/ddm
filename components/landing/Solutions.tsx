"use client";

import { useState } from "react";
import {
  RiGlobalLine,
  RiContactsLine,
  RiMegaphoneLine,
  RiPaletteLine,
  RiShoppingBagLine,
  RiCloudLine,
  RiArrowRightUpLine,
} from "@remixicon/react";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { useT } from "@/components/i18n/LocaleProvider";

const ICONS = [RiGlobalLine, RiContactsLine, RiMegaphoneLine, RiPaletteLine, RiShoppingBagLine, RiCloudLine];

export function Solutions() {
  const t = useT();
  const [active, setActive] = useState(0);
  const items = t.solutions.items;
  const current = items[active];
  const ActiveIcon = ICONS[active];

  return (
    <section id="solutions" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <p className="max-w-3xl font-display text-h3 text-muted">
          {t.solutions.bridgeA}
          <span className="text-ink">{t.solutions.bridgeAccent}</span>
        </p>
      </div>

      <div className="shell mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* sticky detail panel */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">{t.solutions.eyebrow}</span>
          <SplitReveal as="h2" type="lines" className="mt-6 font-display text-h2">
            {t.solutions.title}
          </SplitReveal>

          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-10">
            <div key={active} className="animate-[fadeIn_0.4s_ease]">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-grass">
                <ActiveIcon size={26} />
              </span>
              <span className="mt-6 block font-sans text-sm uppercase tracking-[0.16em] text-accent">{current.tag}</span>
              <h3 className="mt-2 font-display text-h3">{current.title}</h3>
              <p className="mt-4 font-sans text-lead text-muted">{current.line}</p>
            </div>
            <div className="mt-8 flex gap-1.5">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i === active ? "bg-accent" : "bg-line-strong"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* interactive list */}
        <ul className="flex flex-col">
          {items.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <li key={s.tag}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                  className={`group flex w-full items-center justify-between gap-6 border-b border-line py-7 text-left transition-colors ${
                    i === active ? "text-ink" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-5">
                    <Icon size={22} className={i === active ? "text-accent" : "text-muted"} />
                    <span className="font-display text-h3">{s.title}</span>
                  </span>
                  <RiArrowRightUpLine
                    size={22}
                    className={`shrink-0 transition-all duration-300 ${
                      i === active ? "translate-x-0 text-accent opacity-100" : "-translate-x-2 opacity-0"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
