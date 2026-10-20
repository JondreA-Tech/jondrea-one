import Link from "next/link";
import { getProduct } from "../lib/products";
import { productMailto } from "../lib/site";
import { ProductVisual } from "./ProductVisual";
import "../styles/product-preview.css";

const caremeFaqs = [
  ["¿Para quién es?", "Para personas que buscan avanzar profesionalmente y practicar entrevistas y comunicación."],
  ["¿Cuándo estará disponible?", "Está en desarrollo; todavía no hay una fecha confirmada."],
  ["¿En qué plataformas?", "El lanzamiento inicial está previsto para Android."],
  ["¿En qué idiomas?", "Español e inglés."],
  ["¿Garantiza conseguir trabajo?", "No. Ayuda a organizar acciones y practicar; los resultados dependen de múltiples factores."]
];

/** Ficha de los proyectos en desarrollo con contenido y disponibilidad explícitos. */
export function DevelopmentProductPage({ productId }: { productId: "careme" | "escaparg" }) {
  const product = getProduct(productId)!;
  const careme = productId === "careme";
  return (
    <article className="development-product">
      <header className="container page-hero page-hero--products">
        <p className="section-label">{product.name}</p>
        <h1>{product.headline}</h1>
        <p className="lead">{product.about}</p>
        <ul className="product-pills" aria-label="Estado del proyecto">
          <li>En desarrollo · {careme ? "Android primero" : "Pruebas cooperativas"}</li>
          {!careme && <li>Juego web · 2–4 jugadores</li>}
        </ul>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="#como-funciona">{careme ? "Ver cómo funciona" : "Conocer la experiencia"}</Link>
          <Link className="btn btn-ghost" href="/productos">Volver al catálogo</Link>
        </div>
      </header>
      {!careme && <section className="container" aria-label="Captura del juego"><ProductVisual productId={productId} /></section>}
      <section id="como-funciona" className="container section">
        <p className="section-label">{careme ? "Cómo funciona" : "La experiencia"}</p>
        <h2 className="section-title">{careme ? "De tu objetivo a tu semana." : "Cada pista cuenta. Cada persona también."}</h2>
        <ol className="approach-list">
          {product.loop.map((step) => (
            <li key={step.title}><span className="approach-item__title">{step.title}</span><span>{step.body}</span></li>
          ))}
        </ol>
      </section>
      <section className="container section">
        <p className="section-label">{careme ? "MVP previsto" : "Dos experiencias"}</p>
        <h2 className="section-title">{careme ? "Qué estamos construyendo" : "Las primeras dos escape rooms"}</h2>
        {careme && <p className="section-lead">Estas capacidades están previstas para el MVP. El producto sigue en desarrollo.</p>}
        <div className="development-grid">
          {product.capabilities.map((item) => (
            <div className="feature-card" key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>
          ))}
        </div>
      </section>
      {careme ? (
        <>
          <section className="container section">
            <p className="section-label">Vista conceptual</p>
            <h2 className="section-title">Un objetivo, una semana, un próximo paso.</h2>
            <p className="section-lead">Una composición para mostrar la idea de CareMe. El diseño y las funciones pueden cambiar durante el desarrollo.</p>
            <ProductVisual productId={productId} />
          </section>
          <section className="container section">
            <h2 className="section-title">Preguntas frecuentes</h2>
            <div className="product-faq">
              {caremeFaqs.map(([question, answer]) => (
                <details key={question}><summary>{question}</summary><p>{answer}</p></details>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="container section">
          <p className="section-label">Estado del proyecto</p>
          <h2 className="section-title">En desarrollo y pruebas cooperativas.</h2>
          <p className="section-lead">El Experimento y El Contacto están implementadas como candidatas para pruebas cooperativas. Siguen pendientes de aceptación humana y pulido. EscapARG todavía no está lanzado públicamente.</p>
        </section>
      )}
      <section className="container section section--cta">
        <div className="cta-band">
          <h2 className="section-title">Estamos construyendo {product.name}.</h2>
          <p className="section-lead">{careme ? "Todavía no está disponible para descargar. Si querés conversar sobre el proyecto, escribinos." : "Si querés conversar sobre el proyecto, escribinos."}</p>
          <div className="hero-actions hero-actions--center">
            <a className="btn btn-primary" href={productMailto(product.name)}>Contactar a JondreA</a>
            <Link className="btn btn-ghost" href="/productos">Volver al catálogo</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
