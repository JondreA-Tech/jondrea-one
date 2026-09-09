import type { CSSProperties } from "react";
import Link from "next/link";
import type { ApkAvailability } from "../lib/apk";
import { apkInstallSteps } from "../lib/apk";
import type { Product } from "../lib/products";
import { publicRelease } from "../lib/release";
import { productMailto, site } from "../lib/site";
import { ApkDownloadLink } from "./ApkDownloadLink";
import { CustomWorkCta } from "./CustomWorkCta";

type ProductDetailPageProps = {
  product: Product;
  apk: ApkAvailability;
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
  if (product.id === "careme") {
    return (
      <h1 className="product-brand-title rise">
        <span className="product-brand-title__care">Care</span>
        <span className="product-brand-title__me">Me</span>
      </h1>
    );
  }
  return <h1 className="product-brand-title rise">{product.name}</h1>;
}

/** Ficha de producto con identidad visual de la aplicación. */
export function ProductDetailPage({ product, apk }: ProductDetailPageProps) {
  return (
    <div className={`product-shell product-shell--${product.id} theme-${product.id}`}>
      <div className="product-aurora" aria-hidden="true">
        <span className="product-aurora__orb product-aurora__orb--a" />
        <span className="product-aurora__orb product-aurora__orb--b" />
        <span className="product-aurora__orb product-aurora__orb--c" />
      </div>

      <section className="container product-hero">
        {product.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.logoSrc} alt="" className="product-hero-logo" />
        ) : null}
        <ProductBrandTitle product={product} />
        {product.kicker ? <p className="product-kicker rise rise-delay-1">{product.kicker}</p> : null}
        <p className="product-lead rise rise-delay-2">{product.headline}</p>
        {apk.available ? (
          <div className="product-actions rise rise-delay-3">
            <ApkDownloadLink
              apk={apk}
              className="btn btn-primary"
              label={`Descargar ${publicRelease.label}`}
            />
          </div>
        ) : null}
        <ul className="product-pills rise rise-delay-3" aria-label="Disponibilidad">
          <li>{product.category}</li>
          <li>{publicRelease.label}</li>
          <li>{apk.available ? "Descarga para Android" : publicRelease.apkPendingCta}</li>
          <li>{publicRelease.ios}</li>
        </ul>
        <p className="product-hero-nav rise rise-delay-3">
          <Link href="/productos" className="inline-link">
            Volver a productos
          </Link>
        </p>
      </section>

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
          <p className="product-label">Android</p>
          <h2 className="product-title">{publicRelease.label}</h2>
          <p className="product-lead">
            {apk.available
              ? `La versión ${publicRelease.label} para Android ya puede descargarse.`
              : publicRelease.apkUpcoming}{" "}
            {publicRelease.ios}.
          </p>
          {apk.available ? (
            <>
              <ol className="product-install-steps">
                {apkInstallSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="product-cta-action">
                <ApkDownloadLink
                  apk={apk}
                  className="btn btn-primary"
                  label={`Descargar ${publicRelease.label}`}
                />
              </div>
            </>
          ) : (
            <p className="product-lead">
              Para consultas:{" "}
              <a className="inline-link" href={productMailto(product.name)}>
                {site.contact.email}
              </a>
              .
            </p>
          )}
        </div>
      </section>

      <CustomWorkCta showContact={false} />
    </div>
  );
}
