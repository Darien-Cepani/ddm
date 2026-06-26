import type { Metadata } from "next";
import { Nav } from "@/components/shell/Nav";
import { Footer } from "@/components/shell/Footer";
import { TemplatesGallery } from "@/components/templates/TemplatesGallery";

export const metadata: Metadata = {
  title: "Modelet — Premium website templates",
  description:
    "Browse DDM's premium website templates — fast, animated and optimised. Pick one and we make it yours for €200.",
};

export default function TemplatesPage() {
  return (
    <>
      <Nav />
      <TemplatesGallery />
      <Footer />
    </>
  );
}
