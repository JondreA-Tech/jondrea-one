import type { Metadata } from "next";
import Link from "next/link";
import { CustomWorkCta } from "../../../components/CustomWorkCta";
import { ProductSpotlight } from "../../../components/ProductSpotlight";
import { getCareMeApk } from "../../../lib/caremeRelease";
import { getNidoApk } from "../../../lib/nidoRelease";
import { getProduct } from "../../../lib/products";
import { publicRelease } from "../../../lib/release";

export const metadata: Metadata = {
  title: "Productos",
  description: `CareMe y Nido en ${publicRelease.label} para Android. La APK se descarga en cada ficha.`
};

/** Índice de productos: cada ficha concentra descarga e instalación. */
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
          CareMe y Nido, {publicRelease.label} para Android. Instalación y detalle en cada ficha.{" "}
          {publicRelease.ios}.
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
    </>
  );
}
