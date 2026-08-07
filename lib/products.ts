export type ProductStatus = "beta" | "development";

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
    status: "beta",
    href: "/productos/careme",
    accent: "#6C5CE7",
    logoSrc: "/logo-careme.png"
  },
  {
    id: "nido",
    name: "Nido",
    shortName: "Nido",
    blurb:
      "El hub de tu hogar: miembros, gastos, rutinas y compras compartidos en un solo lugar.",
    status: "beta",
    href: "/productos/nido",
    accent: "#C46B3A",
    logoSrc: "/logo-nido.png"
  },
  {
    id: "turnospets",
    name: "TurnosPets",
    shortName: "TurnosPets",
    blurb: "Turnos y gestión para mascotas. En desarrollo.",
    status: "development",
    href: null,
    accent: "#2A9D8F"
  }
];

/** Devuelve un producto por id o undefined. */
export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
