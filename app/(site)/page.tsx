import Link from "next/link";
import { CustomWorkCta } from "../../components/CustomWorkCta";
import { ProductCard } from "../../components/ProductCard";
import { products } from "../../lib/products";

const services = [
  { title: "Software a medida", text: "Plataformas, portales y herramientas internas que se integran con los sistemas que tu equipo ya usa." },
  { title: "Sitios web", text: "Sitios corporativos y comerciales, con contenido fácil de encontrar y una experiencia cuidada en cada pantalla." },
  { title: "Apps móviles", text: "Aplicaciones para iOS y Android. Diseñamos los flujos y preparamos la app para publicarla." }
];

const process = [
  { title: "Definimos el alcance", text: "Revisamos quién va a usar el producto, qué necesita resolver y qué conviene incluir en la primera versión." },
  { title: "Diseñamos y desarrollamos", text: "Probamos los recorridos principales y construimos por etapas que tu equipo puede revisar." },
  { title: "Preparamos el lanzamiento", text: "Probamos el producto, dejamos el entorno listo y acordamos cómo seguir después de publicar." }
];

/** Presenta los servicios de JondreA, su forma de trabajo y el catálogo propio. */
export default function HomePage() {
  return (
    <>
      <section className="container page-hero page-hero--home factory-hero">
        <p className="factory-eyebrow">Diseño e ingeniería de software</p>
        <h1>Software a medida para tu empresa</h1>
        <p className="lead">
          Diseñamos y desarrollamos productos digitales, sitios web y apps móviles.
          Trabajamos desde la primera versión y dejamos una base que tu equipo pueda ampliar.
        </p>
        <div className="hero-actions">
          <Link href="/contactanos" className="btn btn-primary">Contanos tu proyecto</Link>
          <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
        </div>
      </section>

      <section id="servicios" className="container section factory-section" aria-labelledby="servicios-title">
        <h2 id="servicios-title">Qué desarrollamos</h2>
        <div className="factory-services">
          {services.map((service) => (
            <article className="feature-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section factory-section" aria-labelledby="metodo-title">
        <h2 id="metodo-title">Cómo trabajamos</h2>
        <ol className="approach-list">
          {process.map((step) => (
            <li key={step.title}>
              <span className="approach-item__title">{step.title}</span>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section factory-section" aria-labelledby="catalogo-title">
        <h2 id="catalogo-title">Productos propios</h2>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <CustomWorkCta id="proyecto" showContact={false} />
    </>
  );
}
