import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../../../../../lib/site";

export const metadata: Metadata = {
  title: "Eliminar cuenta de Nido",
  description: "Solicitá la eliminación de tu cuenta y datos de Nido, de JondreA Tech, desde la app o por correo."
};

/** Ofrece la solicitud externa de eliminación sin exigir instalar o abrir Nido. */
export default function DeleteNidoAccountPage() {
  const emailLink = `mailto:${site.contact.email}?subject=${encodeURIComponent("Eliminar mi cuenta de Nido")}`;
  return (
    <>
      <section className="container page-hero legal-hero">
        <h1>Eliminar tu cuenta de Nido</h1>
        <p className="lead">Podés solicitar a JondreA Tech que elimine tu cuenta y sus datos aunque ya no tengas instalada la aplicación.</p>
      </section>
      <section className="container section legal-content">
        <div className="about-stack">
          <article className="about-block">
            <h2 className="about-block__title">Desde la aplicación</h2>
            <p>Abrí Ajustes y elegí Eliminar cuenta. Confirmá tu identidad y seguí las indicaciones. Si administrás un hogar con otras personas, primero transferí la administración; si estás solo, disolvé el hogar explícitamente.</p>
            <p>Si pagás Premium, gestioná la cancelación de la renovación en Google Play. Eliminar tu cuenta de Nido no cancela la suscripción en la tienda.</p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Por correo, sin la aplicación</h2>
            <p>Escribí a <a className="inline-link" href={emailLink}>{site.contact.email}</a> con el asunto “Eliminar mi cuenta de Nido”. Si todavía tenés acceso al email asociado, usalo para contactarnos. Si lo perdiste, indicalo al iniciar la solicitud. No envíes contraseñas, códigos de acceso ni información médica.</p>
            <p>Verificaremos que la cuenta te pertenece antes de ejecutar la eliminación. Si administrás un hogar, coordinaremos los pasos de transferencia o disolución para proteger a sus demás miembros. Te informaremos el resultado y cualquier dato que deba conservarse.</p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Qué se elimina y qué permanece</h2>
            <p>Se eliminan perfil, membresías, objetivos, hábitos, check-ins, eventos personales, medicación personal y tokens de notificación. Si el hogar sigue existiendo, se conserva la información compartida del hogar y de sus personas locales y mascotas; las atribuciones personales previstas se eliminan.</p>
            <p>Se conservan identificadores técnicos mínimos para impedir la reactivación de identidades eliminadas. Las copias de seguridad y registros operativos se gestionan con acceso restringido y su ciclo de conservación correspondiente.</p>
            <p>Si el hogar continúa, Nido puede conservar el estado y la vigencia de su suscripción. Al borrar tu cuenta se quita su vínculo directo con la compra en Nido. Google Play gestiona las compras y renovaciones de la tienda por separado.</p>
            <p><Link className="inline-link" href="/privacidad">Leer la política de privacidad</Link></p>
          </article>
        </div>
      </section>
    </>
  );
}
