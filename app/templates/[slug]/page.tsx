import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/shell/Nav";
import { Footer } from "@/components/shell/Footer";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { TEMPLATES_CATALOG } from "@/lib/templates-catalog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return TEMPLATES_CATALOG.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const tpl = TEMPLATES_CATALOG.find((t) => t.slug === params.slug);
  if (!tpl) return { title: "Template" };
  return {
    title: `${tpl.name} — ${tpl.category.en}`,
    description: tpl.description.en,
  };
}

export default function TemplatePreviewPage({ params }: { params: Params }) {
  const exists = TEMPLATES_CATALOG.some((t) => t.slug === params.slug);
  if (!exists) notFound();
  return (
    <>
      <Nav />
      <TemplatePreview slug={params.slug} />
      <Footer />
    </>
  );
}
