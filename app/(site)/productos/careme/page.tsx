import type { Metadata } from "next";
import { DevelopmentProductPage } from "../../../../components/DevelopmentProductPage";

export const metadata: Metadata = {
  title: "CareMe",
  description: "Convertí tu objetivo profesional en un plan semanal y practicá entrevistas con IA. CareMe está en desarrollo; Android primero.",
  alternates: { canonical: "/productos/careme" },
  openGraph: { title: "CareMe · JondreA", description: "Convertí tu objetivo profesional en un plan semanal y practicá entrevistas con IA. CareMe está en desarrollo; Android primero.", url: "/productos/careme" },
  twitter: { card: "summary_large_image", title: "CareMe · JondreA", description: "Convertí tu objetivo profesional en un plan semanal y practicá entrevistas con IA. CareMe está en desarrollo; Android primero." }
};

/** Presenta CareMe dentro del sitio corporativo. */
export default function ProductPage() {
  return <DevelopmentProductPage productId="careme" />;
}
