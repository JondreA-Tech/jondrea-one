type JondreaLogoProps = {
  size?: "sm" | "md";
};

/** Logo tipográfico placeholder de Jondrea (reemplazable por SVG/PNG). */
export function JondreaLogo({ size = "md" }: JondreaLogoProps) {
  const height = size === "sm" ? 28 : 34;
  return (
    <span className={`jondrea-logo jondrea-logo--${size}`} style={{ height }} aria-label="Jondrea">
      <span className="jondrea-logo__mark" aria-hidden />
      <span className="jondrea-logo__word">Jondre<span>A</span></span>
    </span>
  );
}
