import type { Metadata } from "next";
import { ProductCard } from "../../../components/ProductCard";
import { products } from "../../../lib/products";

export const metadata: Metadata = {
  title: "Productos"
};

/** Listado de productos Jondrea. */
export default function ProductsPage() {
  return (
    <section className="container page-hero">
      <span className="eyebrow">Portfolio</span>
      <h1>Productos</h1>
      <p className="lead">
        CareMe y Nido están en beta (solo Android, acceso por correo). TurnosPets viene después.
      </p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
