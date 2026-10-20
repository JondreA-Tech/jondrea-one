import type { Metadata } from "next";
import { DevelopmentProductPage } from "../../../../components/DevelopmentProductPage";

export const metadata: Metadata = {
  title: "EscapARG",
  description: "Escape rooms cooperativas para 2–4 jugadores en el navegador. Conocé El Experimento y El Contacto. En desarrollo y pruebas cooperativas.",
  alternates: { canonical: "/productos/escaparg" },
  openGraph: { title: "EscapARG · JondreA", description: "Escape rooms cooperativas para 2–4 jugadores en el navegador. Conocé El Experimento y El Contacto. En desarrollo y pruebas cooperativas.", url: "/productos/escaparg" },
  twitter: { card: "summary_large_image", title: "EscapARG · JondreA", description: "Escape rooms cooperativas para 2–4 jugadores en el navegador. Conocé El Experimento y El Contacto. En desarrollo y pruebas cooperativas." }
};

/** Presenta EscapARG dentro del sitio corporativo. */
export default function ProductPage() {
  return <DevelopmentProductPage productId="escaparg" />;
}
