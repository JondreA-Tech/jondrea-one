export type ProductStatus = "live" | "development";

export type Product = {
  id: string;
  name: string;
  shortName: string;
  blurb: string;
  status: ProductStatus;
  href: string | null;
  accent: string;
  logoSrc?: string;
};

/** Catálogo de productos mostrados en la landing. */
export const products: Product[] = [
  {
    id: "careme",
    name: "CareMe",
    shortName: "CareMe",
    blurb:
      "Bienestar personal con continuidad diaria: emoción, hábitos, objetivos y tu Future You.",
    status: "live",
    href: "/productos/careme",
    accent: "#6C5CE7",
    logoSrc: "/logo-careme.png"
  },
  {
    id: "casaos",
    name: "CasaOs",
    shortName: "CasaOs",
    blurb: "Sistema operativo para el hogar digital. En desarrollo.",
    status: "development",
    href: null,
    accent: "#2EC4B6"
  },
  {
    id: "turnospets",
    name: "TurnosPets",
    shortName: "TurnosPets",
    blurb: "Turnos y gestión para mascotas. En desarrollo (WordPress).",
    status: "development",
    href: null,
    accent: "#F4A261"
  }
];

/** Devuelve un producto por id o undefined. */
export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
