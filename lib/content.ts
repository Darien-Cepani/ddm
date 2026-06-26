/**
 * Landing page copy. PLACEHOLDER but written in-voice — replace freely.
 * Problems and solutions are index-aligned so the pain → fix mapping holds.
 */

export const PROBLEMS = [
  {
    tag: "SPEED",
    title: "Your website looks dated and loads slowly — visitors leave before they ever convert.",
  },
  {
    tag: "LEADS",
    title: "Leads slip through the cracks. There's no system catching them, let alone following up.",
  },
  {
    tag: "ROI",
    title: "Ad budget burns every month and you can't tell what's actually working.",
  },
  {
    tag: "VISIBILITY",
    title: "Your content calendar is empty and the brand feels invisible next to competitors.",
  },
  {
    tag: "SALES",
    title: "Selling online is clunky — a confusing checkout quietly loses you customers.",
  },
  {
    tag: "COST",
    title: "Every tool charges you monthly, nothing talks to each other, and the bills never stop.",
  },
] as const;

export const SOLUTIONS = [
  {
    tag: "SPEED",
    title: "Premium Websites",
    line: "Fast, clean, animated sites engineered to convert — not just to look pretty.",
  },
  {
    tag: "LEADS",
    title: "CRM Systems",
    line: "Every lead captured, tracked and followed up automatically. Nothing falls through.",
  },
  {
    tag: "ROI",
    title: "Ads & Marketing",
    line: "Spend that returns. We measure, cut the waste, and double down on what works.",
  },
  {
    tag: "VISIBILITY",
    title: "Content, UGC & Design",
    line: "A brand people actually see and remember — visuals and content that travel.",
  },
  {
    tag: "SALES",
    title: "Ecommerce",
    line: "Storefronts and checkouts built to sell, with the friction designed out.",
  },
  {
    tag: "COST",
    title: "Free-forever Hosting",
    line: "One partner, one price. Premium hosting and domain with no monthly bleed.",
  },
] as const;

/** Listed, not advertised — a quiet capability index. */
export const SERVICES = [
  "Websites",
  "CRM",
  "Ecommerce",
  "Marketing",
  "Paid Ads",
  "SEO",
  "Content Creation",
  "UGC",
  "Graphic Design",
  "Brand Identity",
  "Social Media",
  "Automation",
] as const;

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const STATS: Stat[] = [
  { value: 120, suffix: "+", label: "Sites shipped" },
  { value: 1, prefix: "<", suffix: "s", label: "Avg load time" },
  { value: 0, prefix: "€", label: "Hosting fees" },
  { value: 100, suffix: "%", label: "Built in-house" },
];

export const PROCESS = [
  { n: "01", title: "Discover", line: "We learn your business, your customers and where the money actually leaks." },
  { n: "02", title: "Design", line: "We design a premium, distinctive identity and experience around your goals." },
  { n: "03", title: "Build", line: "We build it fast, clean and optimised — animations, systems, the lot." },
  { n: "04", title: "Launch", line: "We ship it live on ddm.al — or your own domain — with zero headache." },
  { n: "05", title: "Grow", line: "We stay, manage and optimise: more visibility, more revenue, more clients." },
] as const;

export const PILLARS = [
  { title: "Fixed timelines", line: "You know exactly when you go live. No drift, no excuses." },
  { title: "Transparent pricing", line: "€200 once. Optional €100/yr for your own domain. That's it." },
  { title: "One point of contact", line: "No account-manager maze. One team that owns the result." },
] as const;
