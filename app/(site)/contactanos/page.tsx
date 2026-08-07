import type { Metadata } from "next";
import { site, betaMailto } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Contactanos"
};

/** Página de contacto con email, Instagram y LinkedIn. */
export default function ContactPage() {
  return (
    <section className="container page-hero">
      <span className="eyebrow">Contacto</span>
      <h1>Contactanos</h1>
      <p className="lead">
        ¿Querés sumarte a una beta, partnerar o hablar de un producto? Escribinos. Las betas de
        CareMe y Nido son solo Android por ahora y se solicitan por correo.
      </p>

      <div className="contact-grid">
        <article className="contact-card">
          <h3>Email</h3>
          <p>Negocio y acceso a betas Android.</p>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </article>
        <article className="contact-card">
          <h3>Instagram</h3>
          <p>Novedades y detrás de escena.</p>
          <a href={site.contact.instagram} target="_blank" rel="noreferrer">
            {site.contact.instagramHandle}
          </a>
        </article>
        <article className="contact-card">
          <h3>LinkedIn</h3>
          <p>Perfil profesional de la factory.</p>
          <a href={site.contact.linkedin} target="_blank" rel="noreferrer">
            linkedin.com/company/jondrea
          </a>
        </article>
      </div>

      <div className="hero-actions">
        <a href={betaMailto("CareMe")} className="btn btn-primary">
          Beta CareMe
        </a>
        <a href={betaMailto("Nido")} className="btn btn-ghost">
          Beta Nido
        </a>
      </div>
    </section>
  );
}
