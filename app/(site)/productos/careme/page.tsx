import type { Metadata } from "next";
import { ProductDetailPage } from "../../../../components/ProductDetailPage";
import { getCareMeApk } from "../../../../lib/caremeRelease";
import { getProduct } from "../../../../lib/products";

export const metadata: Metadata = {
  title: "CareMe"
};

/** Ficha pública de CareMe. */
export default function CareMeProductPage() {
  const product = getProduct("careme");
  if (!product) {
    return null;
  }
  return <ProductDetailPage product={product} apk={getCareMeApk()} />;
}
