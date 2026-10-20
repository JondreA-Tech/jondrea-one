import type { Metadata } from "next";
import { CustomWorkCta } from "../../../components/CustomWorkCta";
import { ProductCard } from "../../../components/ProductCard";
import { products } from "../../../lib/products";

export const metadata: Metadata = {
  title: "Productos",
  description: "Conocé Nido, CareMe y EscapARG: los productos digitales que estamos construyendo en JondreA."
};

/** Catálogo público con acceso a las fichas de cada producto. */
export default function ProductsPage() {
  return (
    <>
      <section className="container page-hero page-hero--products">
        <h1>Nuestros <span className="hero-break">productos.</span></h1>
        <p className="lead">Ideas que toman forma. Conocé nuestros proyectos y lo que estamos construyendo.</p>
      </section>
      <section className="container section catalog-section" aria-label="Catálogo de productos">
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <CustomWorkCta />
    </>
  );
}
