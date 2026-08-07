import type { Metadata } from "next";
import Link from "next/link";
import { betaMailto, site } from "../../../../lib/site";
import "./careme.css";

export const metadata: Metadata = {
  title: "CareMe"
};

const features = [
  {
    title: "Check-in emocional",
    body: "Registrá cómo te sentís en segundos y personalizá el tono del día."
  },
  {
    title: "Future You",
    body: "Definí tu yo futuro y recibí mensajes alineados a tu emoción o mensajes propios."
  },
  {
    title: "Plan del día",
    body: "Micro-acciones claras según tu ánimo, hábitos y objetivos."
  },
  {
    title: "Hábitos y objetivos",
    body: "Seguimiento diario sin culpa: progreso visible, pasos pequeños."
  },
  {
    title: "Resumen semanal",
    body: "Mirada amable de continuidad para sostener el avance."
  },
  {
    title: "Beta Android",
    body: "Por ahora solo en Android. Pedí acceso por correo y te enviamos el APK."
  }
];

/** Landing de producto CareMe (identidad visual propia). */
export default function CareMeProductPage() {
  return (
    <div className="theme-careme careme-page">
      <div className="careme-wrap">
        <section className="careme-hero">
          <div className="careme-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-careme.png" alt="" aria-hidden />
            <h1 className="careme-brand__title">
              <span className="careme-brand__care">Care</span>
              <span className="careme-brand__me">Me</span>
            </h1>
            <p className="careme-tagline">
              No estás organizando tareas. Estás construyendo a tu futuro yo.
            </p>
          </div>

          <div className="careme-cta-row">
            <a className="careme-btn careme-btn-primary" href={betaMailto("CareMe")}>
              Pedir acceso a la beta
            </a>
            <Link className="careme-btn careme-btn-ghost" href="/productos">
              Volver a productos
            </Link>
          </div>

          <div className="careme-pills" aria-label="Disponibilidad">
            <span className="careme-pill">Beta Android</span>
            <span className="careme-pill">Acceso por correo</span>
            <span className="careme-pill">iOS · próximamente</span>
          </div>
        </section>

        <section className="careme-section">
          <h2>Qué es CareMe</h2>
          <p>
            CareMe es una app de bienestar y crecimiento personal. Combinás emoción del día, hábitos,
            objetivos y un perfil de Future You para avanzar con constancia — sin juicio ni
            productividad punitiva.
          </p>
        </section>

        <section className="careme-section">
          <h2>Cómo funciona</h2>
          <p>
            Elegís áreas de foco, construís tu Future You, registrás cómo estás y recibís un plan
            breve. El resumen semanal te muestra continuidad, no perfección.
          </p>
          <div className="careme-grid">
            {features.map((item) => (
              <article key={item.title} className="careme-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="careme-banner">
          <h2>Sumate a la beta</h2>
          <p>
            Solo Android por ahora. Escribinos a {site.contact.email} y te damos acceso.
          </p>
          <a href={betaMailto("CareMe")}>Pedir acceso</a>
        </div>
      </div>
    </div>
  );
}
