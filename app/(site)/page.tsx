import Link from "next/link";
import { products } from "../../lib/products";
import { ProductCard } from "../../components/ProductCard";
import { JondreaLogo } from "../../components/JondreaLogo";
import { site, betaMailto } from "../../lib/site";

/** Home corporativa: marca, productos y acceso a betas Android. */
export default function HomePage() {
  return (
    <>
      <section className="container page-hero page-hero--home">
        <div className="hero-brand rise">
          <JondreaLogo size="lg" layout="horizontal" />
        </div>
        <h1 className="rise rise-delay-1">
          Productos digitales
          <span className="hero-break">con identidad propia.</span>
        </h1>
        <p className="lead rise rise-delay-2">{site.description}</p>
        <div className="hero-actions rise rise-delay-3">
          <Link href="/productos" className="btn btn-primary">
            Ver productos
          </Link>
          <a href={betaMailto("CareMe o Nido")} className="btn btn-ghost">
            Pedir acceso a la beta
          </a>
        </div>
      </section>

      <section className="container section">
        <p className="section-label">Nuestros productos</p>
        <h2 className="section-title">Apps en beta, con problema real</h2>
        <p className="section-lead">
          Dos apps en beta para problemas cotidianos: bienestar personal y gestión del hogar. Cada
          una con su propia identidad, lista para probarse.
        </p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container section">
        <p className="section-label">Cómo construimos</p>
        <h2 className="section-title">
          De la idea al producto en uso.
          <span className="section-title__muted"> Sin teatro.</span>
        </h2>
        <p className="section-lead">
          Producto, diseño e ingeniería en el mismo equipo. Medimos uso real y ajustamos antes de
          sumar más features.
        </p>
        <ol className="approach-list">
          <li>
            <span className="approach-item__title">Producto con foco</span>
            <span>Definimos el loop diario del usuario antes de sumar features.</span>
          </li>
          <li>
            <span className="approach-item__title">Diseño con sistema</span>
            <span>Tokens, tipografía y motion listos para escalar.</span>
          </li>
          <li>
            <span className="approach-item__title">Ingeniería sólida</span>
            <span>APIs, mobile y despliegues pensados para beta real.</span>
          </li>
        </ol>
      </section>

      <section className="container section section--cta">
        <div className="cta-band">
          <p className="section-label">Beta Android</p>
          <h2 className="section-title">Probá CareMe o Nido</h2>
          <p className="section-lead">
            Ambas betas están disponibles solo en Android. Escribinos a{" "}
            <a className="inline-link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>{" "}
            y te enviamos el acceso.
          </p>
          <div className="hero-actions">
            <a href={betaMailto("CareMe")} className="btn btn-primary">
              Beta CareMe
            </a>
            <a href={betaMailto("Nido")} className="btn btn-ghost">
              Beta Nido
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
