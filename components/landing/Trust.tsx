"use client";

import { RiTimeLine, RiPriceTag3Line, RiUserHeartLine, RiShieldCheckLine } from "@remixicon/react";
import { Reveal } from "@/components/fx/Reveal";
import { useT } from "@/components/i18n/LocaleProvider";

const ICONS = [RiTimeLine, RiPriceTag3Line, RiUserHeartLine];

export function Trust() {
  const t = useT();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* intro + promise */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">{t.trust.eyebrow}</span>
          <h2 className="mt-6 font-display text-h2">{t.trust.title}</h2>
          <p className="mt-6 font-sans text-lead text-muted">{t.trust.lead}</p>

          <div className="mt-10 rounded-3xl border border-accent bg-accent/10 p-7">
            <div className="flex items-center gap-3">
              <RiShieldCheckLine size={22} className="text-accent" />
              <span className="font-sans text-eyebrow uppercase tracking-[0.16em] text-muted">{t.trust.promiseLabel}</span>
            </div>
            <p className="mt-4 font-display text-h3 leading-snug">{t.trust.guarantee}</p>
            <p className="mt-4 font-sans text-sm text-muted">{t.trust.signature}</p>
          </div>
        </div>

        {/* pillars */}
        <Reveal stagger className="flex flex-col gap-5">
          {t.trust.pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={p.title}
                className="group flex items-start gap-6 rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-accent sm:p-8"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-grass">
                  <Icon size={26} />
                </span>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans text-sm tabular-nums text-accent">0{i + 1}</span>
                    <h3 className="font-display text-h3">{p.title}</h3>
                  </div>
                  <p className="mt-2 font-sans text-muted">{p.line}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
