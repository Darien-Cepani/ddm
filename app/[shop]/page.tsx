import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClient, allClientSlugs, pickLocale } from "@/lib/clients";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { DEMO_SHOPS, DEMO_SLUGS } from "@/lib/demo-shops";
import { TEMPLATES } from "@/templates";
import { DemoFrame } from "@/components/templates/DemoFrame";

type Params = { shop: string };

/** Pre-render every client + demo path at build time. */
export function generateStaticParams(): Params[] {
  return [...allClientSlugs(), ...DEMO_SHOPS.map((s) => s.slug)].map((shop) => ({ shop }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const demo = DEMO_SHOPS.find((s) => s.slug === params.shop);
  if (demo) {
    return {
      title: `${demo.name} — Lule, Buqeta & Kompozime në Tiranë`,
      description: `${demo.name} — dyqan lulesh në Tiranë. Buqeta, trëndafila dhe kompozime me lule natyrale, gati për dërgesë.`,
    };
  }
  const client = getClient(params.shop);
  if (!client) return { title: "Not found" };
  const tagline = pickLocale(client.tagline, DEFAULT_LOCALE);
  const description = pickLocale(client.description, DEFAULT_LOCALE);
  return {
    title: `${client.name} — ${tagline}`,
    description,
    openGraph: { title: client.name, description, type: "website" },
  };
}

export default function ShopPage({ params }: { params: Params }) {
  // Demo flower-shop sites (Bela template, one parameterised build).
  if (DEMO_SLUGS.has(params.shop)) {
    const demo = DEMO_SHOPS.find((s) => s.slug === params.shop)!;
    return <DemoFrame shop={demo} />;
  }

  // Registered native-template clients.
  const client = getClient(params.shop);
  if (!client) notFound();
  const Template = TEMPLATES[client.template];
  return <Template data={client} />;
}
