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
        Tres líneas de producto. Hoy CareMe está en beta; CasaOs y TurnosPets se muestran como
        próximas apuestas.
      </p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
