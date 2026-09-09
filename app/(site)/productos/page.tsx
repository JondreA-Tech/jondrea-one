import type { Metadata } from "next";
import Link from "next/link";
import { CustomWorkCta } from "../../../components/CustomWorkCta";
import { ProductSpotlight } from "../../../components/ProductSpotlight";
import { getCareMeApk } from "../../../lib/caremeRelease";
import { getNidoApk } from "../../../lib/nidoRelease";
import { getProduct } from "../../../lib/products";
import { publicRelease } from "../../../lib/release";

export const metadata: Metadata = {
  title: "Productos"
};

/** Listado de productos: misma estructura de secciones que el inicio. */
export default function ProductsPage() {
  const careme = getProduct("careme");
  const nido = getProduct("nido");

  return (
    <>
      <section className="container page-hero page-hero--products">
        <h1>
          Nuestros <span className="hero-break">productos.</span>
        </h1>
        <p className="lead">
          CareMe y Nido se encuentran en {publicRelease.label} para Android. La APK está próxima a
          publicarse en cada ficha. {publicRelease.ios}.
        </p>
        <div className="hero-actions">
          <Link href="/productos/careme" className="btn btn-primary">
            CareMe
          </Link>
          <Link href="/productos/nido" className="btn btn-ghost">
            Nido
          </Link>
        </div>
      </section>

      {careme ? <ProductSpotlight product={careme} apk={getCareMeApk()} /> : null}
      {nido ? <ProductSpotlight product={nido} apk={getNidoApk()} /> : null}

      <CustomWorkCta />

      <section className="container section section--cta">
        <div className="cta-band">
          <p className="section-label">Android</p>
          <h2 className="section-title">{publicRelease.label}</h2>
          <p className="section-lead">
            La versión, la disponibilidad de la APK y las indicaciones de instalación están en la
            ficha de cada producto. La APK está próxima a publicarse. {publicRelease.ios}.
          </p>
          <div className="hero-actions hero-actions--center">
            <Link href="/productos/careme#descargar" className="btn btn-primary">
              CareMe
            </Link>
            <Link href="/productos/nido#descargar" className="btn btn-ghost">
              Nido
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
