import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Datos personales, privacidad del hogar y eliminación de cuenta en Nido, de JondreA Tech."
};

/** Explica el tratamiento de datos del sitio y Nido y permite iniciar solicitudes de privacidad. */
export default function PrivacyPage() {
  return (
    <>
      <section className="container page-hero">
        <h1>Privacidad</h1>
        <p className="lead">
          Esta página explica qué datos usa Nido, de JondreA Tech, para organizar el hogar,
          qué información es privada y cómo ejercer tus derechos sobre tus datos.
        </p>
      </section>

      <section className="container section">
        <div className="about-stack">
          <article className="about-block">
            <h2 className="about-block__title">Sitio</h2>
            <p>
              El sitio corporativo sirve información de producto y la APK. El correo de contacto
              es {site.contact.email}. No se vende esa información a terceros.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Nido</h2>
            <p>
              Nido guarda la cuenta, el hogar y lo que el grupo carga: miembros (personas o
              mascotas), invitaciones, eventos, medicación, gastos, rutinas, viajes y listas de
              compras. Objetivos, hábitos y el detalle del ánimo son solo de cada usuario; el hogar
              ve el emoji del día. El administrador gestiona quién participa. No se usa para
              publicidad.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Datos y finalidad</h2>
            <p>
              Tratamos el email y los datos de perfil para identificar la cuenta y prestar soporte;
              los datos del hogar, miembros y mascotas para coordinar a quienes conviven; y eventos,
              medicación, vacunas, gastos, compras y rutinas para las funciones que elegís usar.
              Los registros personales pueden incluir información de salud y bienestar. Cargá
              únicamente información que tengas derecho a compartir. Nido no ofrece diagnósticos
              ni sustituye la atención médica.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Quién puede ver la información</h2>
            <p>
              La información compartida es accesible a los miembros autorizados del hogar.
              Los objetivos, hábitos y detalles de check-in son privados; el estado de ánimo
              actual se muestra al hogar. La medicación personal pertenece a su usuario y
              deja de ser visible para el hogar anterior cuando esa persona sale.
            </p>
            <p>
              Los reportes se envían a revisión privada. El equipo autorizado puede ver la
              descripción que enviaste y las referencias necesarias para revisar el caso.
              Los otros miembros del hogar no pueden consultar tu reporte.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Proveedores y permisos</h2>
            <p>
              Usamos Supabase para autenticación y base de datos, Render para la API, Vercel
              para este sitio y tecnología Expo para la aplicación. Los servicios de notificaciones
              pueden tratar un identificador del dispositivo para entregar los avisos habilitados.
              Podés desactivar notificaciones en la app o en los ajustes del teléfono. Los proveedores
              pueden procesar datos en infraestructura fuera de tu país; no se usan tus registros
              del hogar para publicidad ni se venden a terceros.
            </p>
            <p>
              Si contratás Premium cuando esté disponible, Google Play procesa el cobro.
              Nido verifica la compra con Google Play y guarda referencias, estado y vigencia
              para aplicar los beneficios al hogar. Nido no recibe los datos de tu tarjeta.
            </p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Conservación y eliminación</h2>
            <p>
              Conservamos los datos necesarios mientras usás Nido. Eliminar la cuenta borra
              su perfil, registros privados y medicación personal. Si el hogar continúa, su historia
              compartida permanece: notas, gastos, rutinas, compras, viajes y datos de miembros
              locales y mascotas. Las atribuciones personales previstas se eliminan; una nota
              conservada aparece como “Usuario eliminado”.
            </p>
            <p>
              Para impedir que una cuenta eliminada se reactive accidentalmente, conservamos
              los identificadores técnicos mínimos de las identidades eliminadas. Las copias de
              seguridad y registros operativos tienen su propio ciclo de conservación y acceso
              restringido; podés consultar su alcance al solicitar la eliminación.
            </p>
            <p><Link className="inline-link" href="/productos/nido/eliminar-cuenta">Solicitar eliminación de cuenta y datos de Nido</Link></p>
          </article>
          <article className="about-block">
            <h2 className="about-block__title">Consultas</h2>
            <p>
              Para pedir acceso a tus datos, corregirlos o solicitar su eliminación, escribí a{" "}
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
