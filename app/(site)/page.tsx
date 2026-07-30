import Link from "next/link";
import { products } from "../../lib/products";
import { ProductCard } from "../../components/ProductCard";
import { site } from "../../lib/site";

/** Home corporativa: hero, propuesta de valor y productos. */
export default function HomePage() {
  return (
    <>
      <section className="container page-hero">
        <span className="eyebrow rise">Software factory</span>
        <h1 className="rise rise-delay-1">
          Construimos productos digitales con identidad propia.
        </h1>
        <p className="lead rise rise-delay-2">{site.description}</p>
        <div className="hero-actions rise rise-delay-3">
          <Link href="/productos" className="btn btn-primary">
            Ver productos
          </Link>
          <Link href="/contactanos" className="btn btn-ghost">
            Hablar con nosotros
          </Link>
        </div>
        <div className="stats-grid rise rise-delay-3">
          <article className="stat-card">
            <strong>3</strong>
            <span>Productos en el portfolio</span>
          </article>
          <article className="stat-card">
            <strong>1</strong>
            <span>App en fase beta (CareMe)</span>
          </article>
          <article className="stat-card">
            <strong>Mobile + Web</strong>
            <span>Stack moderno end-to-end</span>
          </article>
        </div>
      </section>

      <section className="container section">
        <h2>Cómo trabajamos</h2>
        <p>
          De discovery a release: producto, diseño y ingeniería en el mismo equipo. Menos slides, más
          software usable.
        </p>
        <div className="feature-grid">
          <article className="feature-card">
            <h3>Producto con foco</h3>
            <p>Definimos el loop diario del usuario antes de sumar features.</p>
          </article>
          <article className="feature-card">
            <h3>Diseño con sistema</h3>
            <p>Tokens, tipografía y motion listos para escalar sin improvisar.</p>
          </article>
          <article className="feature-card">
            <h3>Ingeniería sólida</h3>
            <p>APIs, mobile y despliegues pensados para iterar en beta real.</p>
          </article>
        </div>
      </section>

      <section className="container section">
        <h2>Productos</h2>
        <p>CareMe ya está en beta. CasaOs y TurnosPets están en desarrollo.</p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
