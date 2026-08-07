import type { Metadata } from "next";
import Link from "next/link";
import { betaMailto, site } from "../../../../lib/site";
import "./nido.css";

export const metadata: Metadata = {
  title: "Nido"
};

const features = [
  {
    title: "Hogar",
    body: "El resumen del día: cumpleaños, eventos, gastos, rutinas y compras en un vistazo."
  },
  {
    title: "Miembros",
    body: "Personas y mascotas del hogar, invitados y fechas importantes compartidas."
  },
  {
    title: "Gastos",
    body: "Salario, cuotas y pagos del mes para que nadie se pierda en los números."
  },
  {
    title: "Rutinas",
    body: "Tareas semanales por día, asignadas y visibles para toda la familia."
  },
  {
    title: "Compras",
    body: "Listas compartidas con unidades y peso; menos vueltas al súper."
  },
  {
    title: "Beta Android",
    body: "Por ahora solo en Android. Pedí acceso por correo y te enviamos el APK."
  }
];

/** Landing de producto Nido (identidad visual propia: hogar cálido). */
export default function NidoProductPage() {
  return (
    <div className="theme-nido nido-page">
      <div className="nido-wrap">
        <section className="nido-hero">
          <div className="nido-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-nido.png" alt="" aria-hidden />
            <h1 className="nido-brand__title">Nido</h1>
            <p className="nido-tagline">El hub de tu hogar, en un solo lugar.</p>
          </div>

          <div className="nido-cta-row">
            <a className="nido-btn nido-btn-primary" href={betaMailto("Nido")}>
              Pedir acceso a la beta
            </a>
            <Link className="nido-btn nido-btn-ghost" href="/productos">
              Volver a productos
            </Link>
          </div>

          <div className="nido-pills" aria-label="Disponibilidad">
            <span className="nido-pill">Beta Android</span>
            <span className="nido-pill">Acceso por correo</span>
            <span className="nido-pill">iOS · próximamente</span>
          </div>
        </section>

        <section className="nido-section">
          <h2>Qué es Nido</h2>
          <p>
            Nido es el hub familiar compartido: miembros, gastos, rutinas y compras en una sola app.
            Pensado para organizar el hogar juntos, con claridad y una identidad cálida.
          </p>
        </section>

        <section className="nido-section">
          <h2>Cómo funciona</h2>
          <p>
            Creás tu hogar, invitás a la familia y empezás el día en Hogar: lo importante del día
            reunido. Desde ahí entrás a miembros, gastos, rutinas o compras según lo que necesiten.
          </p>
          <div className="nido-grid">
            {features.map((item) => (
              <article key={item.title} className="nido-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="nido-banner">
          <h2>Sumate a la beta</h2>
          <p>
            Solo Android por ahora. Escribinos a {site.contact.email} y te damos acceso.
          </p>
          <a href={betaMailto("Nido")}>Pedir acceso</a>
        </div>
      </div>
    </div>
  );
}
