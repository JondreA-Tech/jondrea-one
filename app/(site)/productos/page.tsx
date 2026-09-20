import type { Metadata } from "next";
import Link from "next/link";
import { CustomWorkCta } from "../../../components/CustomWorkCta";
import { ProductSpotlight } from "../../../components/ProductSpotlight";
import { getNidoApk } from "../../../lib/nidoRelease";
import { getProduct } from "../../../lib/products";
import { publicRelease } from "../../../lib/release";

export const metadata: Metadata = {
  title: "Productos",
  description: `Nido: hogar compartido y espacio Yo. ${publicRelease.label} para Android.`
};

/** Índice de productos: cada ficha concentra descarga e instalación. */
export default function ProductsPage() {
  const nido = getProduct("nido");

  return (
    <>
      <section className="container page-hero page-hero--products">
        <h1>
          Nuestros <span className="hero-break">productos.</span>
        </h1>
        <p className="lead">
          Nido, {publicRelease.label} para Android. Instalación y detalle en su ficha.{" "}
          {publicRelease.ios}.
        </p>
        <div className="hero-actions">
          <Link href="/productos/nido" className="btn btn-primary">
            Nido
          </Link>
        </div>
      </section>

      {nido ? <ProductSpotlight product={nido} apk={getNidoApk()} /> : null}

      <CustomWorkCta />
    </>
  );
}
