/**
 * Client registry — maps a slug (ddm.al/<slug>) to the template that renders it
 * plus that client's content. Adding a client = one entry here.
 *
 * Text fields are `Localized`: a plain string (single-language, like a real
 * client's own site) OR an { sq, en } object (used by the bilingual demo).
 */
import { DEFAULT_LOCALE, type Locale } from "./i18n";

export type TemplateName = "aurora";

export type Localized = string | Partial<Record<Locale, string>>;

/** Resolve a Localized value for a locale (falls back to default, then any). */
export function pickLocale(value: Localized | undefined, locale: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value[DEFAULT_LOCALE] ?? Object.values(value)[0] ?? "";
}

export interface ClientData {
  slug: string;
  name: string;
  template: TemplateName;
  tagline: Localized;
  description: Localized;
  accent?: string;
  sector?: Localized;
  contact?: { phone?: string; email?: string; address?: Localized };
  services?: Localized[];
}

export const CLIENTS: Record<string, ClientData> = {
  "aurora-coffee": {
    slug: "aurora-coffee",
    name: "Aurora Coffee",
    template: "aurora",
    tagline: {
      en: "Roasted under the northern sky.",
      sq: "Pjekur nën qiellin verior.",
    },
    description: {
      en: "A specialty roastery serving small-batch coffee with a quiet, cosmic soul. Order online, find us in store, taste the difference.",
      sq: "Një torrefaksion specialiteti me kafe në sasi të vogla dhe një shpirt të qetë, kozmik. Porosit online, na gjej në dyqan, shijo ndryshimin.",
    },
    sector: { en: "Hospitality", sq: "Mikpritje" },
    accent: "#C0F53D",
    contact: { phone: "+355 69 000 0000", email: "hello@auroracoffee.al", address: { en: "Tirana, Albania", sq: "Tiranë, Shqipëri" } },
    services: [
      { en: "Order online", sq: "Porosit online" },
      { en: "Subscriptions", sq: "Abonime" },
      { en: "Wholesale", sq: "Shumicë" },
      { en: "Find a store", sq: "Gjej dyqanin" },
    ],
  },
};

export function getClient(slug: string): ClientData | undefined {
  return CLIENTS[slug];
}

export function allClientSlugs(): string[] {
  return Object.keys(CLIENTS);
}
