interface AuroraProps {
  className?: string;
  /** 'light' for paper sections, 'dark' for ink sections */
  variant?: 'light' | 'dark';
}

/** ReactBits-style Aurora: soft drifting color blobs used as a subtle backdrop. */
export default function Aurora({ className = '', variant = 'light' }: AuroraProps) {
  const blue = variant === 'dark' ? 'rgba(70,86,255,0.45)' : 'rgba(22,10,255,0.12)';
  const bronze = variant === 'dark' ? 'rgba(184,159,125,0.28)' : 'rgba(184,159,125,0.16)';
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="aurora-blob"
        style={{ width: '46vw', height: '46vw', top: '-14vw', left: '-8vw', background: blue }}
      />
      <div
        className="aurora-blob"
        style={{ width: '38vw', height: '38vw', bottom: '-16vw', right: '-6vw', background: bronze, animationDelay: '-6s' }}
      />
    </div>
  );
}
