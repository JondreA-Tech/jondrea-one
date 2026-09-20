import type { Metadata } from "next";
import Link from "next/link";
import { CustomWorkCta } from "../../../components/CustomWorkCta";
import { publicRelease } from "../../../lib/release";
import { site } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "JondreA Tech es un estudio familiar: producto propio (Nido) y desarrollo a medida."
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
          JondreA Tech es un estudio familiar de software. Producto, diseño e ingeniería están en
          el mismo equipo. Nido es la prueba: se diseñó, se publicó y se mide.
        </p>
      </section>

      <section className="container section">
        <div className="about-stack">
          <article className="about-block">
            <h2 className="about-block__title">Quiénes somos</h2>
            <p>
              Un equipo chico, de extremo a extremo. No separamos “la marca” de “el código”: cada
              aplicación conserva su identidad y sale como un instalable, no como una lámina.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Productos propios</h2>
            <p>
              Nido organiza el hogar compartido. Está en {publicRelease.label} para Android y se
              descarga en este sitio. {publicRelease.ios}.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">A medida</h2>
            <p>
              Tomamos sitios web y aplicaciones con el mismo criterio: un recorrido cotidiano
              claro, identidad propia y una versión que se pueda abrir. El correo es{" "}
              <a className="inline-link" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </p>
          </article>
        </div>
      </section>

      <CustomWorkCta />

      <section className="container section section--cta">
        <div className="cta-band">
          <p className="section-label">Siguiente paso</p>
          <h2 className="section-title">Conocer Nido o escribirnos</h2>
          <p className="section-lead">
            La APK se descarga en su ficha.
          </p>
          <div className="hero-actions hero-actions--center">
            <Link href="/productos/nido" className="btn btn-primary">
              Nido
            </Link>
            <Link href="/contactanos" className="btn btn-ghost">
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
