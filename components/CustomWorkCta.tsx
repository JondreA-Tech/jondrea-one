import Link from "next/link";
import { customWorkMailto } from "../lib/site";

type CustomWorkCtaProps = {
  id?: string;
  showContact?: boolean;
};

/** Bloque para consultar desarrollo de sitios web y aplicaciones a medida. */
export function CustomWorkCta({ id = "servicios", showContact = true }: CustomWorkCtaProps) {
  return (
    <section className="container section" id={id}>
      <p className="section-label">Servicios</p>
      <h2 className="section-title">Desarrollo de sitios web y aplicaciones a medida.</h2>
      <p className="section-lead">
        Desarrollamos sitios web y aplicaciones a medida. El mismo equipo que construye CareMe y
        Nido se ocupa del diseño, la ingeniería y la publicación.
      </p>
      <div className="hero-actions hero-actions--center">
        <a href={customWorkMailto()} className="btn btn-primary">
          Consultar
        </a>
        {showContact ? (
          <Link href="/contactanos" className="btn btn-ghost">
            Contacto
          </Link>
        ) : null}
      </div>
    </section>
  );
}
