import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros"
};

// Texto editable en el JSX de abajo.

/** Página Sobre nosotros (texto editable a mano). */
export default function AboutPage() {
  return (
    <section className="container page-hero">
      <span className="eyebrow">Jondrea</span>
      <h1>Sobre nosotros</h1>
      <p className="lead">
        Somos una software factory familiar: construimos productos digitales con criterio de
        producto, diseño cuidado y ingeniería práctica.
      </p>

      <div className="about-stack">
        <article className="about-block">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
            Quiénes somos
          </h2>
          <p>
            Jondrea nace de la colaboración entre hermanos con background en software. Creamos apps
            y plataformas propias, y acompañamos ideas hasta convertirlas en productos reales.
          </p>
        </article>
        <article className="about-block">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
            Qué nos mueve
          </h2>
          <p>
            Creemos en experiencias humanas: interfaces claras, loops diarios útiles y tecnología
            que no intimida. Cada producto tiene su identidad; la fábrica aporta método y calidad.
          </p>
        </article>
        <article className="about-block">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
            Cómo trabajamos
          </h2>
          <p>
            Prototipamos rápido, medimos uso real y iteramos. Preferimos betas honestas a demos
            eternas. Este texto es un placeholder: reemplazalo cuando quieras con la historia final
            de Jondrea.
          </p>
        </article>
      </div>
    </section>
  );
}
