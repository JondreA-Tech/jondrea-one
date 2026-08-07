type JondreaLogoProps = {
  size?: "sm" | "md" | "lg";
  /** Si true, muestra solo el monograma JA. */
  markOnly?: boolean;
  /** Variante de composición: horizontal (header) o stacked (hero). */
  layout?: "horizontal" | "stacked";
};

/** Monograma JA (paths vectoriales de marca). */
function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden>
      <path
        className="jondrea-logo__j"
        d="M28 12h14v38.2c0 9.1-5.4 15.3-14.8 15.3C18.4 65.5 14 61.2 14 55.4c0-3.1 2.3-5.4 5.3-5.4 2.9 0 5.1 2.1 5.1 5 0 1.9 1 3.1 2.8 3.1 3.4 0 5.5-3.1 5.5-7.9V12Z"
      />
      <path className="jondrea-logo__a" d="M40 58 58.5 14H74L53 66H30l10-8Z" />
    </svg>
  );
}

/** Wordmark tipográfico JondreA. */
function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      Jondre<span className="jondrea-logo__accent">A</span>
    </span>
  );
}

/** Logo de marca JondreA en SVG (contraste alto, unificado). */
export function JondreaLogo({
  size = "md",
  markOnly = false,
  layout
}: JondreaLogoProps) {
  const resolvedLayout = layout ?? (size === "lg" ? "stacked" : "horizontal");

  if (markOnly) {
    return (
      <span className={`jondrea-logo jondrea-logo--mark jondrea-logo--${size}`} aria-label="JondreA">
        <Mark className="jondrea-logo__mark" />
      </span>
    );
  }

  return (
    <span
      className={`jondrea-logo jondrea-logo--${resolvedLayout} jondrea-logo--${size}`}
      aria-label="JondreA"
    >
      <Mark className="jondrea-logo__mark" />
      <Wordmark className="jondrea-logo__word" />
    </span>
  );
}
