/**
 * Client registry — maps a slug (ddm.al/<slug>) to the template that renders it
 * plus that client's content. Adding a client = one entry here.
 *
 * NOTE: visitors never see how this works; it is purely the internal wiring
 * that powers the multi-tenant paths.
 */

export type TemplateName = "aurora";

export interface ClientData {
  slug: string;
  name: string;
  template: TemplateName;
  tagline: string;
  description: string;
  /** Optional per-client accent override (hex). Falls back to DDM lime. */
  accent?: string;
  sector?: string;
  contact?: { phone?: string; email?: string; address?: string };
  services?: string[];
}

/**
 * Demo entries so the /[shop] route renders something real.
 * Replace / extend with real clients over time.
 */
export const CLIENTS: Record<string, ClientData> = {
  "aurora-coffee": {
    slug: "aurora-coffee",
    name: "Aurora Coffee",
    template: "aurora",
    tagline: "Roasted under the northern sky.",
    description:
      "A specialty roastery serving small-batch coffee with a quiet, cosmic soul. Order online, find us in store, taste the difference.",
    sector: "Hospitality",
    accent: "#C0F53D",
    contact: { phone: "+355 69 000 0000", email: "hello@auroracoffee.al", address: "Tirana, Albania" },
    services: ["Order online", "Subscriptions", "Wholesale", "Find a store"],
  },
};

export function getClient(slug: string): ClientData | undefined {
  return CLIENTS[slug];
}

export function allClientSlugs(): string[] {
  return Object.keys(CLIENTS);
}
