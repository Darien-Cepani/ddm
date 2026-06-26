import Link from "next/link";

/**
 * DDM wordmark — the real logo extracted from the brand guidelines, rendered as
 * a CSS mask so it adopts the current text color (works on light + dark themes).
 * Size is controlled by `height` (px); width follows the logo's aspect ratio.
 *
 * The mask url is set inline (not in CSS) so it can carry the deploy basePath —
 * CSS url() is NOT auto-prefixed, which otherwise 404s the logo on GitHub Pages.
 */
const ASPECT = 1548 / 430; // official logo dimensions
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const MASK = `url("${BASE}/brand/ddm-wordmark.png")`;

export function Wordmark({
  className = "",
  href = "/",
  height = 26,
}: {
  className?: string;
  href?: string;
  height?: number;
}) {
  const mark = (
    <span
      role="img"
      aria-label="DDM — Do Digital Media"
      className={`ddm-wordmark ${className}`}
      style={{ height, width: height * ASPECT, WebkitMaskImage: MASK, maskImage: MASK }}
    />
  );
  if (href) {
    return (
      <Link href={href} data-cursor="hover" className="inline-flex items-center" aria-label="DDM home">
        {mark}
      </Link>
    );
  }
  return mark;
}
