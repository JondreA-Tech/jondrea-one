import type { Metadata } from "next";
import { ProductCard } from "../../../components/ProductCard";
import { products } from "../../../lib/products";

export const metadata: Metadata = {
  title: "Productos"
};

/** Listado de productos Jondrea. */
export default function ProductsPage() {
  return (
    <section className="container page-hero page-hero--products">
      <h1>Nuestras <span className="text-accent-apps">Apps</span></h1>
      <p className="lead">
        CareMe y Nido están en beta (disponible en android, acceso por correo). TurnosPets proximamente.
      </p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
