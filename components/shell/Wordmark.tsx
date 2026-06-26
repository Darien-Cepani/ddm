import Link from "next/link";

/**
 * DDM wordmark. Rendered as styled text for now; isolated here so an SVG asset
 * can drop in later without touching consumers.
 */
export function Wordmark({ className = "", href = "/" }: { className?: string; href?: string }) {
  const mark = (
    <span
      className={`font-sans font-black tracking-[-0.06em] leading-none select-none ${className}`}
      aria-label="DDM — Do Digital Media"
    >
      DD<span className="text-accent">M</span>
    </span>
  );
  if (href) {
    return (
      <Link href={href} data-cursor="hover" className="inline-block">
        {mark}
      </Link>
    );
  }
  return mark;
}
