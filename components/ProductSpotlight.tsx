import Link from "next/link";
import type { ApkAvailability } from "../lib/apk";
import type { Product } from "../lib/products";
import { publicRelease } from "../lib/release";

type ProductSpotlightProps = {
  product: Product;
  apk: ApkAvailability;
};

/** Sección de producto con el mismo ritmo que el inicio: label, título, lead y lista. */
export function ProductSpotlight({ product, apk }: ProductSpotlightProps) {
  if (!product.href) {
    return null;
  }

  return (
    <section className="container section">
      <p className="section-label">{product.category}</p>
      <div className="product-spotlight__brand">
        {product.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.logoSrc} alt="" className="product-spotlight__logo" />
        ) : null}
        <h2 className="section-title">{product.name}</h2>
      </div>
      <p className="section-lead">{product.headline}</p>
      <p className="section-lead">{product.blurb}</p>
      <ul className="product-pills" aria-label="Disponibilidad">
        <li>{publicRelease.label}</li>
        <li>{apk.available ? "Descarga para Android" : publicRelease.apkPendingCta}</li>
        <li>{publicRelease.ios}</li>
      </ul>
      <ol className="approach-list">
        {product.capabilities.slice(0, 4).map((item) => (
          <li key={item.title}>
            <span className="approach-item__title">{item.title}</span>
            <span>{item.body}</span>
          </li>
        ))}
      </ol>
      <div className="hero-actions hero-actions--center">
        <Link href={product.href} className="btn btn-primary">
          Ver {product.name}
        </Link>
        {apk.available && apk.href ? (
          <a
            href={apk.href}
            className="btn btn-ghost"
            download={apk.download || undefined}
          >
            Descargar {publicRelease.label}
          </a>
        ) : (
          <span className="btn btn-ghost is-disabled">{publicRelease.apkPendingCta}</span>
        )}
      </div>
    </section>
  );
}
