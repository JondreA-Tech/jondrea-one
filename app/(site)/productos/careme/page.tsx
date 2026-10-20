import { redirect } from "next/navigation";

/** Mantiene los enlaces anteriores de CareMe dentro del catálogo mientras se desarrolla. */
export default function CareMeProductPage() {
  redirect("/productos");
}
