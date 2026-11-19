import type { Metadata } from "next";
import { ProductDetailPage } from "../../../../components/ProductDetailPage";
import { getProduct } from "../../../../lib/products";

export const metadata: Metadata = {
  title: "Nido",
  description:
    "Organizá compras, gastos, rutinas y cuidados con las personas de tu hogar. Nido 1.0.0 para Android, próximamente en Google Play.",
  alternates: { canonical: "/productos/nido" },
  openGraph: {
    title: "Nido · Tu hogar y tu espacio personal",
    description: "Un hogar en común. Un espacio para vos. Conocé Nido, la app de organización del hogar y bienestar personal.",
    url: "/productos/nido",
    images: [{ url: "/productos/nido/nido-1.0.0.png", width: 1024, height: 500, alt: "Nido: compras, gastos y rutinas en un solo lugar." }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nido · Tu hogar y tu espacio personal",
    description: "Organización compartida y un lugar para vos. Próximamente en Play Store.",
    images: ["/productos/nido/nido-1.0.0.png"]
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
