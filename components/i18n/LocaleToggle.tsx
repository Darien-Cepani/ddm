"use client";

import { LOCALES, type Locale } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

export function LocaleToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div
      className={`flex items-center rounded-full border border-line p-0.5 font-sans text-xs ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l: Locale) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          data-cursor="hover"
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors ${
            locale === l ? "bg-accent text-grass" : "text-muted hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
