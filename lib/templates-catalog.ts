/**
 * Catalog of DDM website templates shown on the homepage showcase and the
 * /templates gallery. Screenshots live in /public/templates/<slug>.png.
 *
 * `descriptions` are localized (sq/en). `href` points to a live demo path when
 * available (the template deployed under ddm.al/<slug>); "#" until deployed.
 */
import type { Locale } from "./i18n";

export interface TemplateItem {
  slug: string;
  name: string;
  accent: string;
  thumb: string;
  href: string;
  category: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const TEMPLATES_CATALOG: TemplateItem[] = [
  {
    slug: "diagonal",
    name: "Diagonal",
    accent: "#160AFF",
    thumb: "/templates/diagonal.png",
    href: "#",
    category: { sq: "Arkitekturë & Ndërtim", en: "Architecture & Construction" },
    description: {
      sq: "Studio ndërtimi dhe zhvillimi — e fortë, moderne, me 3D dhe animacione.",
      en: "Construction & development studio — bold, modern, with 3D and motion.",
    },
  },
  {
    slug: "jardin",
    name: "Jardin Boutique",
    accent: "#D4AF37",
    thumb: "/templates/jardin.png",
    href: "#",
    category: { sq: "Luks & Boutique", en: "Luxury & Boutique" },
    description: {
      sq: "Boutique luksi për modë, parfume e lule — editoriale dhe elegante.",
      en: "Luxury boutique for fashion, perfume and flowers — editorial and elegant.",
    },
  },
  {
    slug: "anja-flowers",
    name: "Anja Flowers",
    accent: "#C56B5A",
    thumb: "/templates/anja-flowers.png",
    href: "#",
    category: { sq: "Lulishte & Evente", en: "Florist & Events" },
    description: {
      sq: "Lulishte romantike për buqeta, dasma dhe evente — e ngrohtë dhe e butë.",
      en: "Romantic florist for bouquets, weddings and events — warm and soft.",
    },
  },
  {
    slug: "bela-flower-shop",
    name: "Bela Flower Shop",
    accent: "#D98BA6",
    thumb: "/templates/bela-flower-shop.png",
    href: "#",
    category: { sq: "Lulishte & Evente", en: "Florist & Events" },
    description: {
      sq: "Dyqan lulesh me paletë blush — delikate, romantike, e qetë.",
      en: "Flower shop with a blush palette — delicate, romantic, calm.",
    },
  },
];
