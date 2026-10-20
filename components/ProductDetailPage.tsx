import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Product } from "../lib/products";
import { productMailto } from "../lib/site";
import { ProductPhoneMockups } from "./ProductPhoneMockups";

type ProductDetailPageProps = { product: Product };

/** Aplica el acento de cada funcionalidad dentro de la identidad de Nido. */
function featureStyle(accent?: string): CSSProperties {
  return { "--feature-accent": accent ?? "var(--nido-primary)" } as CSSProperties;
}

/** Presenta Nido con su propuesta, funcionalidades actuales y disponibilidad. */
export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const capabilities = product.capabilities.filter((item) => item.title !== "Hogar" && item.title !== "Yo");
  return (
    <article className="product-shell product-shell--nido theme-nido nido-product">
      <header className="container nido-hero">
        <div className="nido-hero-copy">
          <Link href="/productos" className="nido-back">← Todos los productos</Link>
          <div className="nido-lockup">
            <Image src={product.logoSrc ?? "/logo-nido.png"} alt="" width={52} height={52} />
            <span>{product.name}</span>
          </div>
          <p className="product-label">Hogar compartido · Bienestar personal</p>
          <h1>Un hogar en común.<br /><span>Un espacio para vos.</span></h1>
          <p className="nido-hero-lead">
            Menos cosas por recordar, más espacio para vivir. Nido reúne la organización
            del hogar y un lugar personal para tus hábitos, objetivos y ánimo.
          </p>
          <div className="nido-actions">
            <a href="#dos-espacios" className="btn btn-primary">Conocé Nido <span aria-hidden="true">↗</span></a>
            <a href="#pantallas" className="btn btn-ghost">Ver la app</a>
          </div>
          <p className="nido-availability"><span aria-hidden="true" />Play Store · Próximamente</p>
        </div>
        <figure className="nido-hero-art">
          <Image src="/productos/nido/hogar-conceptual.webp"
            alt="Arte conceptual de Nido: un hogar con una mesa compartida y un rincón personal de lectura."
            width={1440} height={810} priority sizes="(max-width: 900px) 100vw, 560px" />
          <div className="nido-art-copy"><span>CONVIVIR, CON MÁS CALMA</span><strong>Lo compartido y lo personal,<br />en su lugar.</strong></div>
          <figcaption>Arte conceptual · Las capturas reales de la app están más abajo</figcaption>
        </figure>
      </header>

      <div className="container nido-facts" aria-label="Los espacios de Nido">
        <p><strong>Hogar</strong><span>Para coordinar lo que comparten.</span></p>
        <p><strong>Yo</strong><span>Para lo que querés cuidar de vos.</span></p>
        <p><strong>Android primero</strong><span>Preparando el lanzamiento en Play Store.</span></p>
      </div>

      <section id="dos-espacios" className="container product-block nido-section" aria-labelledby="nido-spaces-title">
        <div className="nido-intro">
          <p className="product-label">Dos espacios, una misma app</p>
          <h2 id="nido-spaces-title">Convivir también es<br />tener tu propio espacio.</h2>
          <p>La casa necesita organización. Vos también necesitás un lugar para tus cosas. Nido hace espacio para ambas.</p>
        </div>
        <div className="nido-spaces">
          <div className="nido-space nido-space--home">
            <span className="nido-space-tag">Compartido</span>
            <h3>Hogar</h3>
            <p>Una vista del día para saber qué pasa en casa: quiénes están, qué hay que hacer, qué comprar y qué se acerca.</p>
            <ul><li>Miembros, personas y mascotas.</li><li>Gastos, rutinas, compras y notas.</li><li>Eventos, recordatorios y próximos viajes.</li></ul>
          </div>
          <div className="nido-space nido-space--me">
            <span className="nido-space-tag">Personal</span>
            <h3>Yo</h3>
            <p>Tu espacio para registrar cómo te sentís, ordenar objetivos y acompañar tus hábitos, sin mezclar todo con la vida del grupo.</p>
            <ul><li>Check-in de ánimo.</li><li>Objetivos y hábitos personales.</li><li>El hogar puede ver tu emoji de ánimo; el detalle sigue siendo tuyo.</li></ul>
          </div>
        </div>
        <aside className="nido-privacy">
          <strong>Compartir un hogar no es compartirlo todo.</strong>
          <p>Los objetivos, hábitos y check-ins detallados son personales. La organización de la casa tiene su propio espacio compartido.</p>
          <Link href="/privacidad" className="inline-link">Conocé nuestra política de privacidad</Link>
        </aside>
      </section>

      <section className="container product-block nido-section" aria-labelledby="nido-features-title">
        <div className="nido-intro">
          <p className="product-label">Lo cotidiano, en un solo lugar</p>
          <h2 id="nido-features-title">Menos pendientes sueltos.<br />Más claridad para todos.</h2>
          <p>Estas funcionalidades forman parte de la app en desarrollo. Están pensadas para acompañar la vida real de quienes conviven.</p>
        </div>
        <ul className="nido-features">
          {capabilities.map((item, index) => (
            <li key={item.title} style={featureStyle(item.accent)}>
              <span className="nido-feature-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3><p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <ProductPhoneMockups />

      <section className="container product-block nido-section" aria-labelledby="nido-how-title">
        <div className="nido-intro">
          <p className="product-label">Cómo funciona</p>
          <h2 id="nido-how-title">Empezá por tu hogar.<br />Hacé lugar para vos.</h2>
          <p>Una organización compartida que se construye de a poco, a tu ritmo y al de quienes viven con vos.</p>
        </div>
        <ol className="nido-steps">
          {product.loop.map((step, index) => (
            <li key={step.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>
          ))}
        </ol>
      </section>

      <section id="descargar" className="container product-block nido-section" aria-labelledby="nido-status-title">
        <div className="nido-status">
          <div><p className="product-label">Estado del producto</p><h2 id="nido-status-title">Nido está preparando<br />su próximo paso.</h2></div>
          <div><strong>Play Store · Próximamente</strong><p>Estamos trabajando en el lanzamiento para Android. Cuando esté disponible, lo vas a encontrar acá.</p></div>
        </div>
      </section>

      <section id="soporte" className="container product-block nido-section nido-contact" aria-labelledby="nido-contact-title">
        <p className="product-label">Un producto de JondreA</p>
        <h2 id="nido-contact-title">¿Conversamos sobre Nido?</h2>
        <p>Si querés saber más, compartir una sugerencia o hacer una consulta, escribinos.</p>
        <div className="nido-actions">
          <a className="btn btn-primary" href={productMailto(product.name)}>Contactar a JondreA</a>
          <Link className="btn btn-ghost" href="/productos">Volver al catálogo</Link>
        </div>
      </section>
    </article>
  );
}
