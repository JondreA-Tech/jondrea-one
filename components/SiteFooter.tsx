import Link from "next/link";
import { site } from "../lib/site";
import { JondreaLogo } from "./JondreaLogo";

/** Footer corporativo con navegación, redes y copyright. */
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
            <a href={site.contact.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="site-footer__cols">
          <div>
            <p className="site-footer__label">Navegar</p>
            <Link href="/">Inicio</Link>
            <Link href="/sobre-nosotros">Sobre nosotros</Link>
            <Link href="/productos">Productos</Link>
            <Link href="/contactanos">Contactanos</Link>
          </div>
          <div>
            <p className="site-footer__label">Productos</p>
            <Link href="/productos/careme">CareMe</Link>
            <Link href="/productos/nido">Nido</Link>
            <span className="site-footer__muted">TurnosPets · pronto</span>
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
