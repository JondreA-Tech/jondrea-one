type EscapargBrandProps = { className?: string };

/** Reproduce la marca tipográfica del selector y su acento ARG. */
export function EscapargBrand({ className = "" }: EscapargBrandProps) {
  return <span className={`escaparg-brand ${className}`} aria-label="EscapARG">ESCAP<span>ARG</span></span>;
}
