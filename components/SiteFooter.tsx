import Link from "next/link";
import { site } from "../lib/site";
import { JondreaLogo } from "./JondreaLogo";

/** Footer corporativo con navegación, productos, servicios y redes. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <JondreaLogo size="sm" />
          <p>{site.tagline}</p>
          <div className="site-footer__social">
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <div className="site-footer__social-icons">
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="site-footer__social-icon"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={site.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="site-footer__social-icon"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                  <path d="M8 10.2v6.3M8 7.6v.1M11.2 16.5v-3.4c0-1.4.9-2.1 2-2.1 1.1 0 2 .7 2 2.1v3.4M11.2 10.2v-1.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="site-footer__cols">
          <div>
            <p className="site-footer__label">Navegar</p>
            <Link href="/">Inicio</Link>
            <Link href="/sobre-nosotros">Sobre nosotros</Link>
            <Link href="/productos">Productos</Link>
            <Link href="/contactanos">Contactanos</Link>
            <Link href="/#servicios">Servicios a medida</Link>
          </div>
          <div>
            <p className="site-footer__label">Productos</p>
            <Link href="/productos/careme">CareMe</Link>
            <Link href="/productos/nido">Nido</Link>
            <Link href="/productos/careme#descargar">Descargar CareMe</Link>
            <Link href="/productos/nido#descargar">Descargar Nido</Link>
          </div>
        </div>
      </div>
      <div className="site-footer__legal">
        <p>
          © {year} {site.copyrightOwner}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
