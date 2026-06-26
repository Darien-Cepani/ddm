import { Nav } from "@/components/shell/Nav";
import { Footer } from "@/components/shell/Footer";
import { Hero } from "@/components/landing/Hero";
import { Manifesto } from "@/components/landing/Manifesto";
import { Problems } from "@/components/landing/Problems";
import { Solutions } from "@/components/landing/Solutions";
import { Services } from "@/components/landing/Services";
import { Trust } from "@/components/landing/Trust";
import { Process } from "@/components/landing/Process";
import { TemplatesShowcase } from "@/components/landing/TemplatesShowcase";
import { CTA } from "@/components/landing/CTA";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DDM — Do Digital Media",
  url: "https://ddm.al",
  slogan: "Stop planning, start doing",
  description:
    "B2B digital agency building premium websites, CRM, ecommerce, marketing, content and design.",
  address: { "@type": "PostalAddress", addressLocality: "Tirana", addressCountry: "AL" },
  email: "contact@ddm.al",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Problems />
        <Solutions />
        <Services />
        <Trust />
        <Process />
        <TemplatesShowcase />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
