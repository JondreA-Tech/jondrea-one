import type { Metadata } from "next";
import Link from "next/link";
import { CustomWorkCta } from "../../../components/CustomWorkCta";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Somos JondreA Tech, un estudio de diseño y desarrollo de software con productos propios."
};

/** Presenta al equipo y su forma de encarar proyectos. */
export default function AboutPage() {
  return (
    <>
      <section className="container page-hero page-hero--about">
        <h1>Sobre JondreA</h1>
        <p className="lead">
          Somos un estudio familiar de software. El mismo equipo trabaja en las decisiones
          de producto, el diseño y el desarrollo.
        </p>
      </section>
      <section className="container section factory-section" aria-labelledby="trabajo-title">
        <h2 id="trabajo-title">En qué trabajamos</h2>
        <div className="factory-services factory-services--two">
          <article className="feature-card">
            <h3>Proyectos para empresas</h3>
            <p>Trabajamos en sitios web, apps móviles y sistemas a medida. Al empezar, acordamos qué debe resolver la primera versión y cómo vamos a revisar los avances.</p>
            <Link className="inline-link" href="/#servicios">Ver servicios</Link>
          </article>
          <article className="feature-card">
            <h3>Productos propios</h3>
            <p>Diseñamos y desarrollamos Nido, EscapARG y CareMe en JondreA. En el catálogo podés ver cada proyecto y su estado.</p>
            <Link className="inline-link" href="/productos">Ver productos</Link>
          </article>
        </div>
      </section>
      <CustomWorkCta showContact={false} />
    </>
  );
}
