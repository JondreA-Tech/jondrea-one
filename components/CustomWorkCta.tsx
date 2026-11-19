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
      <h2 className="section-title">Hablemos de tu proyecto</h2>
      <p className="section-lead">
        Contanos qué querés construir, quién lo va a usar y en qué etapa estás.
      </p>
      <div className="hero-actions hero-actions--center">
        <a href={customWorkMailto()} className="btn btn-primary">
          Escribirnos
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
