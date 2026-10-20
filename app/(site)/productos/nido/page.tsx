import type { Metadata } from "next";
import { ProductDetailPage } from "../../../../components/ProductDetailPage";
import { getProduct } from "../../../../lib/products";

export const metadata: Metadata = {
  title: "Nido",
  description:
    "Organizá gastos, rutinas, compras y notas del hogar. Cuidá tus hábitos, objetivos y ánimo en tu espacio Yo. Nido, próximamente en Play Store.",
  alternates: { canonical: "/productos/nido" },
  openGraph: {
    title: "Nido · Tu hogar y tu espacio personal",
    description: "Un hogar en común. Un espacio para vos. Conocé Nido, la app de organización del hogar y bienestar personal.",
    url: "/productos/nido",
    images: [{ url: "/productos/nido/hogar-conceptual.webp", width: 1440, height: 810, alt: "Arte conceptual de Nido: un hogar compartido y un espacio personal." }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nido · Tu hogar y tu espacio personal",
    description: "Organización compartida y un lugar para vos. Próximamente en Play Store.",
    images: ["/productos/nido/hogar-conceptual.webp"]
  }
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
