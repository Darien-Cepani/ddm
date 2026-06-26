"use client";

import { useState } from "react";
import { RiMailLine, RiWhatsappLine, RiCheckLine } from "@remixicon/react";
import { SplitReveal } from "@/components/fx/SplitReveal";
import { Reveal } from "@/components/fx/Reveal";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { useT, useLocale } from "@/components/i18n/LocaleProvider";

// Placeholders — replace with the real channels.
const DDM_EMAIL = "contact@ddm.al";
const DDM_WHATSAPP = "355690000000"; // intl format, no '+'

type Channel = "email" | "whatsapp";

export function CTA() {
  const t = useT();
  const { locale } = useLocale();
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", message: "" });
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildText = () => {
    const f = t.offer.form;
    return [
      `${f.name}: ${form.name}`,
      form.business && `${f.business}: ${form.business}`,
      form.email && `${f.email}: ${form.email}`,
      form.phone && `${f.phone}: ${form.phone}`,
      form.message && `— ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const submit = (via: Channel) => {
    if (!form.name.trim() || (!form.email.trim() && !form.phone.trim())) {
      setError(true);
      return;
    }
    setError(false);
    const text = buildText();
    if (via === "whatsapp") {
      window.open(`https://wa.me/${DDM_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
    } else {
      const subject = `${t.offer.form.title} — ${form.name}`;
      window.location.href = `mailto:${DDM_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[50vmax] w-[50vmax] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(var(--accent) / 0.14), transparent)" }}
      />

      <div className="shell relative">
        <span className="eyebrow">{t.offer.eyebrow}</span>
        <SplitReveal key={locale} as="h2" type="words" className="mt-6 max-w-4xl font-display text-hero">
          {t.offer.titleA}
          <span className="text-accent-ink">{t.offer.accent}</span>
          {t.offer.titleB}
        </SplitReveal>
        <p className="mt-6 max-w-xl font-sans text-lead text-muted">{t.offer.lead}</p>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
          {/* tiers */}
          <Reveal stagger className="grid gap-6">
            {t.offer.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  tier.badge ? "border-accent bg-surface" : "border-line"
                }`}
              >
                {tier.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 font-sans text-[0.7rem] uppercase tracking-[0.16em] text-grass">
                    {tier.badge}
                  </span>
                )}
                <h3 className="font-display text-h3">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-none">{tier.price}</span>
                  <span className="font-sans text-sm text-muted">{tier.cadence}</span>
                </div>
                <p className="mt-3 font-sans text-muted">{tier.line}</p>
                <ul className="mt-5 flex flex-col gap-2.5 font-sans text-sm">
                  {tier.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <RiCheckLine size={18} className="mt-0.5 shrink-0 text-accent-ink" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          {/* contact form */}
          <Reveal className="rounded-3xl border border-line bg-surface p-8 sm:p-10">
            <h3 className="font-display text-h3">{t.offer.form.title}</h3>
            <p className="mt-2 font-sans text-sm text-muted">{t.offer.form.lead}</p>

            {sent ? (
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-accent bg-accent/10 p-6">
                <RiCheckLine className="text-accent-ink" />
                <span className="font-sans text-sm">{t.offer.form.privacy}</span>
              </div>
            ) : (
              <form
                className="mt-6 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(channel);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field placeholder={t.offer.form.name} value={form.name} onChange={set("name")} required />
                  <Field placeholder={t.offer.form.business} value={form.business} onChange={set("business")} />
                  <Field placeholder={t.offer.form.email} type="email" value={form.email} onChange={set("email")} />
                  <Field placeholder={t.offer.form.phone} value={form.phone} onChange={set("phone")} />
                </div>
                <textarea
                  placeholder={t.offer.form.message}
                  value={form.message}
                  onChange={set("message")}
                  rows={3}
                  className="w-full rounded-2xl border border-line bg-bg px-4 py-3 font-sans text-sm outline-none transition-colors focus:border-accent"
                />

                {/* channel switch */}
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs text-muted">{t.offer.form.channel}</span>
                  <div className="flex rounded-full border border-line p-0.5">
                    {(["whatsapp", "email"] as Channel[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setChannel(c)}
                        data-cursor="hover"
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs transition-colors ${
                          channel === c ? "bg-accent text-grass" : "text-muted hover:text-ink"
                        }`}
                      >
                        {c === "whatsapp" ? <RiWhatsappLine size={14} /> : <RiMailLine size={14} />}
                        {c === "whatsapp" ? t.offer.form.channelWhatsapp : t.offer.form.channelEmail}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <span className="font-sans text-xs text-red-500">{t.offer.form.missing}</span>}

                <button type="submit" className="btn-primary mt-2 w-full" data-cursor="hover">
                  {t.offer.form.send}
                </button>
                <p className="text-center font-sans text-xs text-muted">{t.offer.form.privacy}</p>
              </form>
            )}
          </Reveal>
        </div>

        {/* closing line */}
        <div className="mt-28 text-center">
          <SplitReveal key={locale} as="p" type="words" className="font-display text-hero">
            {t.offer.closingA}
            <span className="text-accent-ink">{t.offer.closingAccent}</span>
          </SplitReveal>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="#contact" className="btn-primary text-base" strength={0.5}>
              {t.nav.cta}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-2xl border border-line bg-bg px-4 py-3 font-sans text-sm outline-none transition-colors focus:border-accent"
    />
  );
}
