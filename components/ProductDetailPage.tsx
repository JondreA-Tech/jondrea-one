import type { CSSProperties } from "react";
import Link from "next/link";
import type { ApkAvailability } from "../lib/apk";
import { apkInstallSteps, formatApkDate, formatApkSize } from "../lib/apk";
import type { Product } from "../lib/products";
import { publicRelease } from "../lib/release";
import { productMailto, productSupportMailto, site } from "../lib/site";
import { ApkDownloadLink } from "./ApkDownloadLink";
import { CustomWorkCta } from "./CustomWorkCta";
import { ProductPhoneMockups } from "./ProductPhoneMockups";

type ProductDetailPageProps = {
  product: Product;
  apk: ApkAvailability;
  changelog: readonly string[];
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

/** Datos de archivo e integridad del APK, si están en disco. */
function ApkFileFacts({ apk }: { apk: ApkAvailability }) {
  if (!apk.file) {
    return null;
  }
  return (
    <ul className="product-apk-facts">
      <li>
        {formatApkSize(apk.file.sizeBytes)} · actualizado {formatApkDate(apk.file.modifiedAt)}
      </li>
      <li className="product-apk-facts__sha">
        SHA-256 <code>{apk.file.sha256}</code>
      </li>
    </ul>
  );
}

/** Ficha de producto con identidad visual de la aplicación. */
export function ProductDetailPage({ product, apk, changelog }: ProductDetailPageProps) {
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
              productId={product.id}
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

      <ProductPhoneMockups productId={product.id} />

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
              <ApkFileFacts apk={apk} />
              {changelog.length > 0 ? (
                <>
                  <p className="product-cta-kicker">Esta versión</p>
                  <ul className="product-changelog">
                    {changelog.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              <p className="product-cta-kicker">Instalación</p>
              <ol className="product-install-steps">
                {apkInstallSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="product-lead product-cta-note">
                Nota de{" "}
                <Link className="inline-link" href="/privacidad">
                  privacidad
                </Link>
                .
              </p>
              <div className="product-cta-action">
                <ApkDownloadLink
                  apk={apk}
                  productId={product.id}
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
