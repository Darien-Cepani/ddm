import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClient, allClientSlugs, pickLocale } from "@/lib/clients";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { TEMPLATES } from "@/templates";

type Params = { shop: string };

/** Pre-render every known client path at build time (real SSG/SEO). */
export function generateStaticParams(): Params[] {
  return allClientSlugs().map((shop) => ({ shop }));
}

/** Per-client metadata so each path ranks on its own. */
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
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
  const client = getClient(params.shop);
  if (!client) notFound();

  const Template = TEMPLATES[client.template];
  return <Template data={client} />;
}
