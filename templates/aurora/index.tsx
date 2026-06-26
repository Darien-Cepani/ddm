import type { ClientData } from "@/lib/clients";

/**
 * "Aurora" — starter client template.
 *
 * This is the structural skeleton every client path can be built from. It is a
 * server component (real SEO per client). Per-client content comes from the
 * registry (lib/clients.ts). Style is intentionally minimal here — the focus of
 * this build is the DDM landing page; templates get fleshed out later.
 *
 * IMPORTANT: nothing here references DDM's routing/path mechanics to the visitor.
 * The only DDM touch is a small, tasteful "built by" credit in the footer.
 */
export function AuroraTemplate({ data }: { data: ClientData }) {
  const accent = data.accent ?? "#C0F53D";

  return (
    <div
      className="min-h-screen bg-grass text-milk"
      style={{ ["--client-accent" as string]: accent }}
    >
      {/* nav */}
      <header className="mx-auto flex max-w-shell items-center justify-between px-6 py-6 sm:px-8">
        <span className="font-display text-2xl font-semibold">{data.name}</span>
        <nav className="hidden gap-8 font-sans text-sm text-milk/70 sm:flex">
          {(data.services ?? ["Home", "About", "Contact"]).slice(0, 4).map((s) => (
            <a key={s} href="#" className="hover:text-milk">
              {s}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${data.contact?.email ?? "hello@example.com"}`}
          className="rounded-full px-5 py-2.5 font-sans text-sm font-medium text-grass"
          style={{ background: accent }}
        >
          Get in touch
        </a>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[40vmax] w-[40vmax] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }}
        />
        <div className="relative mx-auto max-w-shell px-6 py-28 sm:px-8 sm:py-40">
          {data.sector && (
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-milk/60">{data.sector}</span>
          )}
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,7vw,6rem)] leading-[1.0]">
            {data.tagline}
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg text-milk/70">{data.description}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#"
              className="rounded-full px-7 py-3.5 font-sans text-sm font-medium text-grass"
              style={{ background: accent }}
            >
              Explore
            </a>
            <a href="#" className="rounded-full border border-milk/25 px-7 py-3.5 font-sans text-sm font-medium">
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* services strip */}
      {data.services && (
        <section className="border-y border-milk/10">
          <div className="mx-auto grid max-w-shell grid-cols-2 gap-px bg-milk/10 sm:grid-cols-4">
            {data.services.map((s) => (
              <div key={s} className="bg-grass px-6 py-10 font-display text-xl">
                {s}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* contact */}
      <section className="mx-auto max-w-shell px-6 py-28 sm:px-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)]">Come say hello.</h2>
        <div className="mt-8 flex flex-col gap-2 font-sans text-milk/70">
          {data.contact?.email && <span>{data.contact.email}</span>}
          {data.contact?.phone && <span>{data.contact.phone}</span>}
          {data.contact?.address && <span>{data.contact.address}</span>}
        </div>
      </section>

      {/* footer with tasteful DDM credit */}
      <footer className="border-t border-milk/10 py-10">
        <div className="mx-auto flex max-w-shell items-center justify-center px-6">
          <span className="font-sans text-sm text-milk/50">
            © {new Date().getFullYear()} {data.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
