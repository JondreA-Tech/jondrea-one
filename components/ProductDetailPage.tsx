import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import type { Product } from "../lib/products";
import { productMailto, productSupportMailto, site } from "../lib/site";
import { CustomWorkCta } from "./CustomWorkCta";
import { ProductPhoneMockups } from "./ProductPhoneMockups";

type ProductDetailPageProps = {
  product: Product;
};

/** Aplica el acento de módulo o funcionalidad como variable CSS. */
function featureStyle(accent?: string): CSSProperties | undefined {
  if (!accent) {
    return undefined;
  }
  return { "--feature-accent": accent } as CSSProperties;
}

/** Wordmark alineado a la identidad de cada aplicación. */
function ProductBrandTitle({ product }: { product: Product }) {
  return <h1 className="product-brand-title rise">{product.name}</h1>;
}

/** Ficha de producto con identidad visual de la aplicación. */
export function ProductDetailPage({ product }: ProductDetailPageProps) {
  return (
    <div className={`product-shell product-shell--${product.id} theme-${product.id}`}>
      <div className="product-aurora" aria-hidden="true">
        <span className="product-aurora__orb product-aurora__orb--a" />
        <span className="product-aurora__orb product-aurora__orb--b" />
        <span className="product-aurora__orb product-aurora__orb--c" />
      </div>

      <section className="container product-hero">
        {product.logoSrc ? (
          <Image src={product.logoSrc} alt="" width={168} height={168} className="product-hero-logo" />
        ) : null}
        <ProductBrandTitle product={product} />
        {product.kicker ? <p className="product-kicker rise rise-delay-1">{product.kicker}</p> : null}
        <p className="product-lead rise rise-delay-2">{product.headline}</p>
        <ul className="product-pills rise rise-delay-3" aria-label="Disponibilidad">
          <li>Play Store · Próximamente</li>
        </ul>
        <p className="product-hero-nav rise rise-delay-3">
          <Link href="/productos" className="inline-link">
            Volver a productos
          </Link>
        </p>
      </section>

      <ProductPhoneMockups productId="nido" />

      <section className="container product-block">
        <p className="product-label">El producto</p>
        <h2 className="product-title">Qué es {product.name}</h2>
        <p className="product-lead">{product.about}</p>
      </section>

      <section className="container product-block">
        <p className="product-label">Funcionalidades</p>
        <h2 className="product-title">Qué incluye</h2>
        <p className="product-lead">{product.blurb}</p>
        <ul className="product-feature-grid">
          {product.capabilities.map((item) => (
            <li key={item.title} className="product-feature-card" style={featureStyle(item.accent)}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container product-block">
        <p className="product-label">Uso</p>
        <h2 className="product-title">Cómo funciona</h2>
        <p className="product-lead">
          El recorrido está pensado para el uso cotidiano, con pocos pasos en cada momento.
        </p>
        <ol className="approach-list">
          {product.loop.map((step) => (
            <li key={step.title} className="product-loop-item" style={featureStyle(step.accent)}>
              <span className="approach-item__title">{step.title}</span>
              <span>{step.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="container product-block" id="descargar">
        <div className="product-cta">
          <p className="product-label">Play Store</p>
          <h2 className="product-title">Próximamente</h2>
          <p className="product-lead">
            Para consultas:{" "}
            <a className="inline-link" href={productMailto(product.name)}>{site.contact.email}</a>.
          </p>
        </div>
      </section>

      <section className="container product-block" id="soporte">
        <p className="product-label">Soporte</p>
        <h2 className="product-title">Errores y sugerencias</h2>
        <p className="product-lead">
          Si encontró un error o desea recomendar un cambio en {product.name}, puede escribir a{" "}
          <a className="inline-link" href={productSupportMailto(product.name)}>
            {site.contact.email}
          </a>
          . Conviene indicar versión, dispositivo y una breve descripción.
        </p>
        <div className="product-cta-action">
          <a className="btn btn-ghost" href={productSupportMailto(product.name)}>
            Enviar correo
          </a>
        </div>
      </section>

      <CustomWorkCta showContact={false} />
    </div>
  );
}
