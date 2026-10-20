import type { Metadata } from "next";
import { EscapargProductPage } from "../../../../components/EscapargProductPage";

export const metadata: Metadata = {
  title: "EscapARG",
  description: "Escape rooms cooperativas para 2–4 jugadores en el navegador. Conocé El Experimento y El Contacto. En desarrollo y pruebas cooperativas.",
  alternates: { canonical: "/productos/escaparg" },
  openGraph: { title: "EscapARG · JondreA", description: "Escape rooms cooperativas para 2–4 jugadores en el navegador. Conocé El Experimento y El Contacto. En desarrollo y pruebas cooperativas.", url: "/productos/escaparg", images: [{ url: "/productos/escaparg/el-experimento-portada.webp", width: 1440, height: 810, alt: "Arte promocional de El Experimento · EscapARG" }] },
  twitter: { card: "summary_large_image", images: ["/productos/escaparg/el-experimento-portada.webp"], title: "EscapARG · JondreA", description: "Escape rooms cooperativas para 2–4 jugadores en el navegador. Conocé El Experimento y El Contacto. En desarrollo y pruebas cooperativas." }
};

/** Presenta EscapARG dentro del sitio corporativo. */
export default function ProductPage() {
  return <EscapargProductPage />;
}
