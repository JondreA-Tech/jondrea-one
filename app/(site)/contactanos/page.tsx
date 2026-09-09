import type { Metadata } from "next";
import Link from "next/link";
import { CustomWorkCta } from "../../../components/CustomWorkCta";
import { publicRelease } from "../../../lib/release";
import { site } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Contactanos"
};

/** Página de contacto. */
export default function ContactPage() {
  return (
    <>
      <section className="container page-hero page-hero--contact">
        <h1>Contactanos</h1>
        <p className="lead">
          Consultas sobre productos, una propuesta comercial o soporte. CareMe y Nido están en{" "}
          {publicRelease.label} para Android. La APK está próxima a publicarse en cada ficha.{" "}
          {publicRelease.ios}.
        </p>

        <div className="contact-quick">
          <a
            className="contact-quick__item"
            href={`mailto:${site.contact.email}`}
            aria-label={`Email ${site.contact.email}`}
          >
            <span className="contact-quick__icon" aria-hidden="true">
              <svg width="28" height="22" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 2.2C1 1.537 1.537 1 2.2 1h15.6c.663 0 1.2.537 1.2 1.2v11.6c0 .663-.537 1.2-1.2 1.2H2.2A1.2 1.2 0 011 13.8V2.2z" stroke="#22b6ab" strokeWidth="1.4"/>
                <path d="M2 3.2l8 6 8-6" stroke="#22b6ab" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="contact-quick__meta">
              <strong className="contact-primary">{site.contact.email}</strong>
              <span className="contact-sub">Proyectos, productos y soporte.</span>
            </span>
          </a>

          <a
            className="contact-quick__item"
            href={site.contact.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagram ${site.contact.instagramHandle}`}
          >
            <span className="contact-quick__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#22b6ab" strokeWidth="1.4"/>
                <circle cx="12" cy="12" r="3.6" stroke="#22b6ab" strokeWidth="1.4"/>
                <circle cx="17.5" cy="6.5" r="0.7" fill="#22b6ab"/>
              </svg>
            </span>
            <span className="contact-quick__meta">
              <strong className="contact-primary">{site.contact.instagramHandle}</strong>
              <span className="contact-sub">Novedades de JondreA.</span>
            </span>
          </a>

          <a
            className="contact-quick__item"
            href={site.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn JondreA"
          >
            <span className="contact-quick__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="#22b6ab" strokeWidth="1.4"/>
                <path d="M8.5 10.5H6.5v7h2V10.5zM7.5 8.9a1.15 1.15 0 110-2.3 1.15 1.15 0 010 2.3zM11 10.5h1.9v1h.03c.27-.5.95-1.02 1.96-1.02 2.10 0 2.5 1.38 2.5 3.18V17.5h-2v-3.05c0-.73-.01-1.67-1.02-1.67-1.02 0-1.17.79-1.17 1.61V17.5h-2v-7z" fill="#22b6ab"/>
              </svg>
            </span>
            <span className="contact-quick__meta">
              <strong className="contact-primary">LinkedIn</strong>
              <span className="contact-sub">Perfil institucional.</span>
            </span>
          </a>
        </div>
      </section>

      <CustomWorkCta />

      <section className="container section section--cta">
        <div className="cta-band">
          <p className="section-label">Android</p>
          <h2 className="section-title">{publicRelease.label}</h2>
          <p className="section-lead">
            La APK está próxima a publicarse en cada ficha de producto. {publicRelease.ios}.
          </p>
          <div className="hero-actions hero-actions--center">
            <Link href="/productos/careme#descargar" className="btn btn-primary">
              CareMe
            </Link>
            <Link href="/productos/nido#descargar" className="btn btn-ghost">
              Nido
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
