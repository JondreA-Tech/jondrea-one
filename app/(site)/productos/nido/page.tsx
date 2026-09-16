import type { Metadata } from "next";
import { ProductDetailPage } from "../../../../components/ProductDetailPage";
import { getProduct } from "../../../../lib/products";
import { getNidoApk, nidoRelease } from "../../../../lib/nidoRelease";

export const metadata: Metadata = {
  title: "Nido",
  description:
    "La organización del hogar, en un solo lugar. Beta 0.2.0 para Android, descarga en esta ficha."
};

/** Ficha pública de Nido. */
export default function NidoProductPage() {
  const product = getProduct("nido");
  if (!product) {
    return null;
  }
  return (
    <ProductDetailPage product={product} apk={getNidoApk()} changelog={nidoRelease.changelog} />
  );
}
