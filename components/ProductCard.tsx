import Link from "next/link";
import type { Product } from "../lib/products";

type ProductCardProps = {
  product: Product;
};

/** Card de producto: CareMe navega; el resto muestra estado en desarrollo. */
export function ProductCard({ product }: ProductCardProps) {
  const inner = (
    <>
      <div className="product-card__top">
        {product.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.logoSrc} alt="" className="product-card__logo" />
        ) : (
          <span
            className="product-card__avatar"
            style={{ background: `linear-gradient(135deg, ${product.accent}, transparent)` }}
            aria-hidden
          >
            {product.shortName.slice(0, 2).toUpperCase()}
          </span>
        )}
        <span
          className={`product-card__badge ${product.status === "live" ? "is-live" : "is-dev"}`}
        >
          {product.status === "live" ? "Disponible" : "En desarrollo"}
        </span>
      </div>
      <h3>{product.name}</h3>
      <p>{product.blurb}</p>
      {product.href ? (
        <span className="product-card__cta">Ver producto →</span>
      ) : (
        <span className="product-card__cta is-disabled">Próximamente</span>
      )}
    </>
  );

  if (product.href) {
    return (
      <Link href={product.href} className="product-card product-card--link">
        {inner}
      </Link>
    );
  }

  return (
    <article className="product-card">
      {inner}
    </article>
  );
}
