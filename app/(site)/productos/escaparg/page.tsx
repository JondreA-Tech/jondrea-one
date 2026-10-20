import type { Metadata } from "next";
import { EscapargProductPage } from "../../../../components/EscapargProductPage";

export const metadata: Metadata = {
  title: "EscapARG",
  description: "Escape rooms cooperativas online para 2–4 jugadores. La primera versión incluirá El Experimento y El Contacto. Lanzamiento en desarrollo.",
  alternates: { canonical: "/productos/escaparg" },
  openGraph: { title: "EscapARG · JondreA", description: "Escape rooms cooperativas online para 2–4 jugadores. La primera versión incluirá El Experimento y El Contacto. Lanzamiento en desarrollo.", url: "/productos/escaparg", images: [{ url: "/productos/escaparg/el-experimento-portada.webp", width: 1440, height: 810, alt: "Arte promocional de El Experimento · EscapARG" }] },
  twitter: { card: "summary_large_image", images: ["/productos/escaparg/el-experimento-portada.webp"], title: "EscapARG · JondreA", description: "Escape rooms cooperativas online para 2–4 jugadores. La primera versión incluirá El Experimento y El Contacto. Lanzamiento en desarrollo." }
};

/** Presenta EscapARG dentro del sitio corporativo. */
export default function ProductPage() {
  return <EscapargProductPage />;
}
