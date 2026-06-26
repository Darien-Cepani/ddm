"use client";

import { RiTimeLine, RiPriceTag3Line, RiUserHeartLine, RiShieldCheckLine } from "@remixicon/react";
import { Reveal } from "@/components/fx/Reveal";
import { useT } from "@/components/i18n/LocaleProvider";

const ICONS = [RiTimeLine, RiPriceTag3Line, RiUserHeartLine];

export function Trust() {
  const t = useT();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="shell">
        <div className="max-w-3xl">
          <span className="eyebrow">{t.trust.eyebrow}</span>
          <h2 className="mt-6 font-display text-h2">{t.trust.title}</h2>
          <p className="mt-6 font-sans text-lead text-muted">{t.trust.lead}</p>
        </div>

        <Reveal stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {t.trust.pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <div key={p.title} className="bg-bg p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={24} />
                </span>
                <h3 className="mt-6 font-display text-h3">{p.title}</h3>
                <p className="mt-3 font-sans text-muted">{p.line}</p>
              </div>
            );
          })}
        </Reveal>

        {/* guarantee band */}
        <Reveal className="mt-6 flex items-center gap-4 rounded-3xl border border-accent bg-accent/10 p-8">
          <RiShieldCheckLine size={28} className="shrink-0 text-accent" />
          <p className="font-display text-h3">{t.trust.guarantee}</p>
        </Reveal>
      </div>
    </section>
  );
}
