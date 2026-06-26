import Link from "next/link";
import { Wordmark } from "@/components/shell/Wordmark";

export default function ShopNotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="starfield-fallback absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(var(--accent) / 0.16), transparent)" }}
      />
      <div className="relative">
        <Wordmark className="text-4xl" />
        <h1 className="mt-10 font-display text-hero">Lost in space.</h1>
        <p className="mx-auto mt-5 max-w-md font-sans text-lead text-muted">
          This page hasn&apos;t landed yet. Let&apos;s get you back to solid ground.
        </p>
        <Link href="/" className="btn-primary mt-9" data-cursor="hover">
          Back to DDM
        </Link>
      </div>
    </main>
  );
}
