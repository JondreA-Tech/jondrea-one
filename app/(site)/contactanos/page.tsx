import type { Metadata } from "next";
import { site } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Contactanos"
};

/** Página de contacto con Instagram, LinkedIn y email hardcodeados. */
export default function ContactPage() {
  return (
    <section className="container page-hero">
      <span className="eyebrow">Contacto</span>
      <h1>Contactanos</h1>
      <p className="lead">
        ¿Querés sumarte a una beta, partnerar o hablar de un producto? Escribinos por el canal que
        prefieras. Los datos de abajo son placeholders: completálos cuando tengas las cuentas
        definitivas.
      </p>

      <div className="contact-grid">
        <article className="contact-card">
          <h3>Email</h3>
          <p>Respuesta para negocio y betas.</p>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </article>
        <article className="contact-card">
          <h3>Instagram</h3>
          <p>Novedades y detrás de escena.</p>
          <a href={site.contact.instagram} target="_blank" rel="noreferrer">
            {site.contact.instagram.replace("https://", "")}
          </a>
        </article>
        <article className="contact-card">
          <h3>LinkedIn</h3>
          <p>Perfil profesional de la factory.</p>
          <a href={site.contact.linkedin} target="_blank" rel="noreferrer">
            {site.contact.linkedin.replace("https://", "")}
          </a>
        </article>
      </div>
    </section>
  );
}
