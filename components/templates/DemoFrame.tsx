"use client";

/**
 * Renders a client demo: the parameterised Bela build served from /public,
 * isolated in a full-viewport iframe so it keeps its own fonts, cursor, map and
 * smooth-scroll without clashing with the DDM marketing shell. The business name
 * is selected via the ?shop=<slug> query.
 */
export function DemoFrame({ slug, name }: { slug: string; name: string }) {
  return (
    <iframe
      className="demo-frame"
      src={`/bela-demo/index.html?shop=${slug}`}
      title={name}
      loading="eager"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100dvh", border: 0, display: "block", zIndex: 30 }}
    />
  );
}
