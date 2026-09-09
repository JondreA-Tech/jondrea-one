import Link from "next/link";
import { CustomWorkCta } from "../../components/CustomWorkCta";
import { JondreaLogo } from "../../components/JondreaLogo";
import { ProductCard } from "../../components/ProductCard";
import { products } from "../../lib/products";
import { publicRelease } from "../../lib/release";
import { site } from "../../lib/site";

/** Home corporativa: marca, productos, método y servicios a medida. */
export default function HomePage() {
  return (
    <>
      <section className="container page-hero page-hero--home">
        <div className="hero-aurora" aria-hidden="true">
          <span className="hero-orb hero-orb--a" />
          <span className="hero-orb hero-orb--b" />
        </div>
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
          <Link href="/#servicios" className="btn btn-ghost">
            Consultar un proyecto
          </Link>
        </div>
      </section>

      <section className="container section">
        <p className="section-label">Productos</p>
        <h2 className="section-title">CareMe y Nido · {publicRelease.label}</h2>
        <p className="section-lead">
          CareMe está orientada al bienestar personal. Nido, a la gestión del hogar. Ambas se
          encuentran en {publicRelease.label} para Android y se descargan desde cada ficha de
          producto. {publicRelease.ios}.
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
          Producto, diseño e ingeniería en el mismo equipo. Definimos el uso cotidiano, construimos
          y publicamos versiones que se pueden instalar y medir.
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
            <span>API, aplicación móvil y panel de seguimiento para uso real en etapa beta.</span>
          </li>
        </ol>
      </section>

      <CustomWorkCta />

      <section className="container section section--cta">
        <div className="cta-band">
          <p className="section-label">Android</p>
          <h2 className="section-title">{publicRelease.label}</h2>
          <p className="section-lead">
            La APK de CareMe y de Nido ya puede descargarse en cada ficha de producto.{" "}
            {publicRelease.ios}.
          </p>
          <div className="hero-actions hero-actions--center">
            <Link href="/productos/careme#descargar" className="btn btn-primary">
              CareMe
            </Link>
            <Link href="/productos/nido#descargar" className="btn btn-ghost">
              Nido
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
