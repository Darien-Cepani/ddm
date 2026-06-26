import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClient, allClientSlugs } from "@/lib/clients";
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
  return {
    title: `${client.name} — ${client.tagline}`,
    description: client.description,
    openGraph: { title: client.name, description: client.description, type: "website" },
  };
}

export default function ShopPage({ params }: { params: Params }) {
  const client = getClient(params.shop);
  if (!client) notFound();

  const Template = TEMPLATES[client.template];
  return <Template data={client} />;
}
