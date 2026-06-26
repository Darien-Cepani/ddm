import Link from "next/link";

/**
 * DDM wordmark — the real logo extracted from the brand guidelines, rendered as
 * a CSS mask so it adopts the current text color (works on light + dark themes).
 * Size is controlled by `height` (px); width follows the logo's aspect ratio.
 */
const ASPECT = 1548 / 430; // official logo dimensions

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
      style={{ height, width: height * ASPECT }}
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
