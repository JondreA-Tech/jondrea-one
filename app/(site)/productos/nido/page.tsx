import type { Metadata } from "next";
import { ProductDetailPage } from "../../../../components/ProductDetailPage";
import { getProduct } from "../../../../lib/products";

export const metadata: Metadata = {
  title: "Nido",
  description:
    "El hub del hogar y un espacio Yo para ánimo, objetivos y hábitos. Próximamente en Play Store."
};

/** Ficha pública de Nido. */
export default function NidoProductPage() {
  const product = getProduct("nido");
  if (!product) {
    return null;
  }
  return (
    <ProductDetailPage product={product} />
  );
}
