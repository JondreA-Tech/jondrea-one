import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros"
};

/** Página Sobre nosotros. */
export default function AboutPage() {
  return (
    <section className="container page-hero page-hero--about">
      <h1 className="page-hero__title--left">Sobre <span className="text-accent-apps">nosotros</span></h1>
      <p className="lead">
        Somos una software factory familiar: construimos productos digitales con criterio de
        producto, diseño cuidado y ingeniería práctica.
      </p>

      <div className="about-stack">
        <article className="about-block">
          <h2 className="about-block__title">Quiénes somos</h2>
          <p>
            JondreA nace de la colaboración entre hermanos con background en software. Creamos apps
            propias — hoy CareMe y Nido — y las llevamos a usuarios reales desde la beta.
          </p>
        </article>
        <article className="about-block">
          <h2 className="about-block__title">Qué nos mueve</h2>
          <p>
            Creemos en experiencias humanas: interfaces claras, loops diarios útiles y tecnología
            que no intimida. Cada producto tiene su identidad; la factory aporta método y calidad.
          </p>
        </article>
        <article className="about-block">
          <h2 className="about-block__title">Cómo trabajamos</h2>
          <p>
            Prototipamos rápido, medimos uso real y iteramos. Preferimos betas honestas a demos
            eternas. Por ahora CareMe y Nido se prueban solo en Android, con acceso por correo.
          </p>
        </article>
      </div>
    </section>
  );
}
