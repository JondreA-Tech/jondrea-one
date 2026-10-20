import Link from "next/link";
import Image from "next/image";
import { ProductVisual } from "./ProductVisual";
import type { Product } from "../lib/products";

type ProductCardProps = {
  product: Product;
};

/** Card de producto: con href navega; sin href muestra estado en desarrollo. */
export function ProductCard({ product }: ProductCardProps) {
  const inner = (
    <>
      <div className="product-card__top">
        {product.id !== "careme" && (product.logoSrc ? (
          <Image src={product.logoSrc} alt="" width={56} height={56} className="product-card__logo" />
        ) : (
          <span
            className="product-card__avatar"
            style={{ background: `linear-gradient(135deg, ${product.accent}, transparent)` }}
            aria-hidden
          >
            {product.shortName.slice(0, 2).toUpperCase()}
          </span>
        ))}
        <span
          className={`product-card__badge ${product.status === "development" ? "is-dev" : "is-live"}`}
        >
          {product.id === "nido" ? "Play Store · Próximamente" : "En desarrollo"}
        </span>
      </div>
      {product.id !== "careme" && <ProductVisual productId={product.id} compact />}
      <h3>{product.name}</h3>
      <p>{product.blurb}</p>
      {product.href ? (
        <span className="product-card__cta">{product.cta ?? "Conocer Nido"} →</span>
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
