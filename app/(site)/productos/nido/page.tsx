import type { Metadata } from "next";
import { ProductDetailPage } from "../../../../components/ProductDetailPage";
import { getNidoApk } from "../../../../lib/nidoRelease";
import { getProduct } from "../../../../lib/products";

export const metadata: Metadata = {
  title: "Nido"
};

/** Ficha pública de Nido. */
export default function NidoProductPage() {
  const product = getProduct("nido");
  if (!product) {
    return null;
  }
  return <ProductDetailPage product={product} apk={getNidoApk()} />;
}
