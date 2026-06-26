"use client";

import Image from "next/image";
import Link from "next/link";
import { RiArrowLeftLine, RiArrowRightUpLine, RiExternalLinkLine } from "@remixicon/react";
import { useT, useLocale } from "@/components/i18n/LocaleProvider";
import { TEMPLATES_CATALOG } from "@/lib/templates-catalog";

export function TemplatePreview({ slug }: { slug: string }) {
  const t = useT();
  const { locale } = useLocale();
  const tpl = TEMPLATES_CATALOG.find((x) => x.slug === slug);
  if (!tpl) return null;
  const others = TEMPLATES_CATALOG.filter((x) => x.slug !== slug);
  const hasLive = tpl.href && tpl.href !== "#";

  return (
    <main className="pt-32">
      <div className="shell">
        <Link href="/templates" data-cursor="hover" className="inline-flex items-center gap-2 font-sans text-sm text-muted hover:text-ink">
          <RiArrowLeftLine size={16} /> {t.templatePreview.back}
        </Link>

        <header className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted">{tpl.category[locale]}</span>
            <h1 className="mt-2 font-display text-hero">{tpl.name}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {hasLive && (
              <a href={tpl.href} target="_blank" rel="noreferrer" data-cursor="hover" className="btn-ghost">
                <RiExternalLinkLine size={16} /> {t.templatePreview.live}
              </a>
            )}
            <Link href="/#contact" data-cursor="hover" className="btn-primary">
              {t.templatePreview.use}
            </Link>
          </div>
        </header>
      </div>

      {/* browser-frame preview */}
      <div className="shell mt-12">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-line-strong" />
            <span className="h-3 w-3 rounded-full bg-line-strong" />
            <span className="h-3 w-3 rounded-full bg-line-strong" />
            <span className="ml-3 truncate rounded-md bg-bg px-3 py-1 font-sans text-xs text-muted">
              ddm.al/{tpl.slug}
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full">
            <Image src={tpl.thumb} alt={tpl.name} fill sizes="100vw" className="object-cover object-top" priority />
          </div>
        </div>
        <p className="mt-4 text-center font-sans text-xs text-muted">{t.templatePreview.note}</p>
      </div>

      {/* about + cta */}
      <div className="shell mt-16 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <span className="eyebrow">{t.templatePreview.about}</span>
          <p className="mt-5 font-display text-h3 leading-snug">{tpl.description[locale]}</p>
        </div>
        <div className="flex flex-col items-start justify-center gap-5 rounded-3xl border border-accent bg-accent/10 p-8">
          <p className="font-display text-h3">{t.templatePreview.cta}</p>
          <Link href="/#contact" data-cursor="hover" className="btn-primary">
            {t.nav.cta}
          </Link>
        </div>
      </div>

      {/* other templates */}
      <div className="shell mt-20">
        <span className="eyebrow">{t.templatePreview.other}</span>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/templates/${o.slug}`}
              data-cursor="hover"
              className="group overflow-hidden rounded-2xl border border-line"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={o.thumb} alt={o.name} fill sizes="33vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="font-display text-lg">{o.name}</span>
                <RiArrowRightUpLine size={18} className="text-muted transition-colors group-hover:text-accent-ink" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
