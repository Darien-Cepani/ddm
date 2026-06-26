"use client";

import type { DemoShop } from "@/lib/demo-shops";

/**
 * Renders a client demo: the parameterised Bela build served from /public,
 * isolated in a full-viewport iframe so it keeps its own fonts, cursor, map and
 * smooth-scroll without clashing with the DDM marketing shell.
 *
 * The name + accent are passed as query params from lib/demo-shops.ts (the single
 * source of truth), so editing a name there + redeploying is enough — no Bela
 * rebuild required. `?shop=<slug>` stays as a fallback for direct access.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function DemoFrame({ shop }: { shop: DemoShop }) {
  const params = new URLSearchParams({
    shop: shop.slug,
    n: shop.name,
    p: shop.primary,
    s: shop.secondary,
    a: String(shop.accent),
  });
  return (
    <iframe
      className="demo-frame"
      src={`${BASE}/bela-demo/index.html?${params.toString()}`}
      title={shop.name}
      loading="eager"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100dvh", border: 0, display: "block", zIndex: 30 }}
    />
  );
}
