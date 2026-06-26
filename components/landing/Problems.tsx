"use client";

import {
  RiTimerLine,
  RiUserUnfollowLine,
  RiMoneyEuroCircleLine,
  RiEyeOffLine,
  RiShoppingCartLine,
  RiRepeatLine,
} from "@remixicon/react";
import { Reveal } from "@/components/fx/Reveal";
import { useT } from "@/components/i18n/LocaleProvider";

const ICONS = [RiTimerLine, RiUserUnfollowLine, RiMoneyEuroCircleLine, RiEyeOffLine, RiShoppingCartLine, RiRepeatLine];

/**
 * Glanceable pain grid — one icon, one tag, one short phrase per problem.
 * Designed to be understood in a single scan (no paragraphs).
 */
export function Problems() {
  const t = useT();

  return (
    <section id="problems" className="relative scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="shell">
        <span className="eyebrow">{t.problems.eyebrow}</span>
        <h2 className="mt-6 max-w-3xl font-display text-h2">
          {t.problems.titleA}
          <span className="text-accent">{t.problems.accent}</span>
          {t.problems.titleB}
        </h2>
        <p className="mt-4 font-sans text-muted">{t.problems.lead}</p>

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.problems.items.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={p.tag}
                className="group flex items-center gap-5 rounded-2xl border border-line bg-bg/50 p-6 transition-colors hover:border-accent"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-grass">
                  <Icon size={24} />
                </span>
                <div>
                  <span className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-muted">{p.tag}</span>
                  <p className="font-display text-xl leading-tight">{p.t}</p>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
