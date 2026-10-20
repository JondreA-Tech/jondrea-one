import Link from "next/link";
import Image from "next/image";
import { EscapargBrand } from "./EscapargBrand";
import { ProductVisual } from "./ProductVisual";
import type { Product } from "../lib/products";
import "../styles/escaparg-brand.css";

type ProductCardProps = { product: Product };

/** Presenta cada producto con una jerarquía común y navegación solo si está habilitada. */
export function ProductCard({ product }: ProductCardProps) {
  const href = product.id === "careme" ? null : product.href;
  const className = `product-card product-card--${product.id}${href ? " product-card--link" : ""}`;
  const content = (
    <>
      <div className="product-card__heading">
        <div className="product-card__brand">
          {product.id !== "careme" && product.logoSrc ? (
            <Image src={product.logoSrc} alt="" width={44} height={44} className="product-card__logo" />
          ) : null}
          <h3>{product.id === "escaparg" ? <EscapargBrand /> : product.name}</h3>
        </div>
        <span className="product-card__badge is-dev">
          {product.id === "nido" ? "Play Store · Próximamente" : "En desarrollo"}
        </span>
      </div>
      {product.id !== "careme" && <ProductVisual productId={product.id} compact />}
      <p>{product.blurb}</p>
      <span className={`product-card__cta${href ? "" : " is-disabled"}`}>
        {href ? <>{product.cta ?? `Conocer ${product.name}`} <span aria-hidden="true">↗</span></> : "Próximamente"}
      </span>
    </>
  );
  return href ? <Link href={href} className={className}>{content}</Link> : <article className={className}>{content}</article>;
}
