import Link from "next/link";
import { publicRelease } from "../lib/release";
import type { Product } from "../lib/products";

type ProductCardProps = {
  product: Product;
};

/** Etiqueta de estado visible en la card. */
function statusLabel(status: Product["status"]) {
  if (status === "apk") return publicRelease.label;
  return "En desarrollo";
}

/** Card de producto: con href navega; sin href muestra estado en desarrollo. */
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
          className={`product-card__badge ${product.status === "development" ? "is-dev" : "is-live"}`}
        >
          {statusLabel(product.status)}
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
      <Link href={product.href} className={`product-card product-card--link product-card--${product.id}`}>
        {inner}
      </Link>
    );
  }

  return <article className={`product-card product-card--${product.id}`}>{inner}</article>;
}
