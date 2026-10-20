import Link from "next/link";
import { CustomWorkCta } from "../../components/CustomWorkCta";
import { ProductCard } from "../../components/ProductCard";
import { products } from "../../lib/products";

/** Home corporativa: marca, productos, método y servicios a medida. */
export default function HomePage() {
  return (
    <>
      <section className="container page-hero page-hero--home">
        <p className="section-label rise">Software factory · Productos propios</p>
        <h1 className="rise rise-delay-1">
          De una idea a un producto
          <span className="hero-break">que funciona.</span>
        </h1>
        <p className="lead rise rise-delay-2">
          Diseñamos y desarrollamos sitios web, aplicaciones y productos digitales.
          Unimos producto, diseño e ingeniería para resolver necesidades reales.
        </p>
        <div className="hero-actions rise rise-delay-3">
          <Link href="/contactanos" className="btn btn-primary">
            Conversemos
          </Link>
          <Link href="/productos" className="btn btn-ghost">
            Explorar productos
          </Link>
        </div>
      </section>

      <section className="container section">
        <p className="section-label">Productos</p>
        <h2 className="section-title">Ideas que toman forma.</h2>
        <p className="section-lead">
          Hogar, desarrollo profesional y misterios en equipo. Conocé lo que estamos construyendo.
        </p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container section">
        <p className="section-label">Cómo trabajamos</p>
        <h2 className="section-title">
          Del diseño a la publicación.
        </h2>
        <p className="section-lead">
          Definimos el problema, diseñamos la experiencia y construimos el producto.
          Acompañamos cada etapa con un alcance claro y una base técnica que pueda crecer.
        </p>
        <ol className="approach-list">
          <li>
            <span className="approach-item__title">Definición de producto</span>
            <span>Establecemos el recorrido diario del usuario antes de ampliar funcionalidades.</span>
          </li>
          <li>
            <span className="approach-item__title">Identidad y sistema</span>
            <span>Cada aplicación conserva su identidad visual; el sistema de diseño permite escalar con consistencia.</span>
          </li>
          <li>
            <span className="approach-item__title">Ingeniería y publicación</span>
            <span>Construimos aplicaciones, experiencias web y herramientas de seguimiento para nuestros productos.</span>
          </li>
        </ol>
      </section>

      <CustomWorkCta />
    </>
  );
}
