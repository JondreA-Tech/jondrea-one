import type { Metadata } from "next";
import Link from "next/link";
import { CustomWorkCta } from "../../../components/CustomWorkCta";
import { publicRelease } from "../../../lib/release";
import { site } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Sobre nosotros"
};

/** Página Sobre nosotros. */
export default function AboutPage() {
  return (
    <>
      <section className="container page-hero page-hero--about">
        <h1>
          Sobre <span className="hero-break">nosotros.</span>
        </h1>
        <p className="lead">
          JondreA es un estudio de software. Desarrollamos productos propios —CareMe y Nido— y
          proyectos a medida para terceros.
        </p>
      </section>

      <section className="container section">
        <div className="about-stack">
          <article className="about-block">
            <h2 className="about-block__title">Quiénes somos</h2>
            <p>
              Somos un equipo familiar de desarrollo. Producto, diseño e ingeniería trabajan
              juntos. CareMe y Nido fueron construidos de extremo a extremo por JondreA.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Qué buscamos</h2>
            <p>
              Interfaces claras y productos de uso cotidiano. Si una pantalla no se comprende, no
              se publica.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Cómo trabajamos</h2>
            <p>
              Prototipamos, validamos y corregimos. Priorizamos una versión instalable frente a
              presentaciones extensas. {publicRelease.ios}.
            </p>
          </article>
        </div>
      </section>

      <section className="container section">
        <p className="section-label">Cómo trabajamos</p>
        <h2 className="section-title">
          El mismo equipo, de extremo a extremo.
        </h2>
        <p className="section-lead">
          Para un desarrollo a medida, el proceso es el de CareMe y Nido: se define el uso, se
          diseña y se publica.
        </p>
        <ol className="approach-list">
          <li>
            <span className="approach-item__title">Definición de producto</span>
            <span>El recorrido diario del usuario determina el alcance, no una lista abierta de funciones.</span>
          </li>
          <li>
            <span className="approach-item__title">Identidad y sistema</span>
            <span>Cada producto conserva su identidad. El sistema de diseño ordena el crecimiento.</span>
          </li>
          <li>
            <span className="approach-item__title">Ingeniería y publicación</span>
            <span>Entregamos algo que se puede abrir en el teléfono o en el navegador, y medimos el uso real.</span>
          </li>
        </ol>
      </section>

      <CustomWorkCta />

      <section className="container section section--cta">
        <div className="cta-band">
          <p className="section-label">Siguiente paso</p>
          <h2 className="section-title">Conocer los productos o escribirnos</h2>
          <p className="section-lead">
            La APK de cada aplicación está próxima a publicarse en su ficha. Para un proyecto a
            medida, el correo es{" "}
            <a className="inline-link" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
            .
          </p>
          <div className="hero-actions hero-actions--center">
            <Link href="/productos" className="btn btn-primary">
              Ver productos
            </Link>
            <Link href="/contactanos" className="btn btn-ghost">
              Contactanos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
