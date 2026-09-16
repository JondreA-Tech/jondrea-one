import type { Metadata } from "next";
import { CustomWorkCta } from "../../../components/CustomWorkCta";
import { publicRelease } from "../../../lib/release";
import { site } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description: `Cómo JondreA trata los datos del sitio, de CareMe y de Nido en ${publicRelease.label}.`
};

/** Nota breve de privacidad para el sitio y las aplicaciones en beta. */
export default function PrivacyPage() {
  return (
    <>
      <section className="container page-hero">
        <h1>Privacidad</h1>
        <p className="lead">
          JondreA Tech publica CareMe y Nido en {publicRelease.label}. Esta nota describe qué datos
          se usan y para qué, con el alcance de una etapa beta.
        </p>
      </section>

      <section className="container section">
        <div className="about-stack">
          <article className="about-block">
            <h2 className="about-block__title">Sitio</h2>
            <p>
              El sitio corporativo sirve información de producto y las APKs. El correo de contacto
              es {site.contact.email}. No se vende esa información a terceros.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">CareMe</h2>
            <p>
              La aplicación necesita una cuenta para funcionar. Guarda el perfil Future You, los
              check-ins y el seguimiento de hábitos u objetivos, para mostrar el plan del día y el
              resumen semanal. Esos datos no se usan para publicidad.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Nido</h2>
            <p>
              Nido guarda la cuenta, el hogar y lo que el grupo carga: miembros (personas o
              mascotas), invitaciones, gastos, rutinas y listas de compras. El administrador del
              hogar gestiona quién participa. Tampoco se usa para publicidad.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Consultas</h2>
            <p>
              Para pedir una corrección o la eliminación de una cuenta, escriba a{" "}
              <a className="inline-link" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
