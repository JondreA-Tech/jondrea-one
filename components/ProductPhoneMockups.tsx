import type { ReactNode } from "react";

type ProductPhoneMockupsProps = {
  productId: "careme" | "nido";
};

/** Marco de teléfono para una captura ilustrada. */
function PhoneFrame({
  label,
  theme,
  children
}: {
  label: string;
  theme: "careme" | "nido";
  children: ReactNode;
}) {
  return (
    <figure className={`phone-frame phone-frame--${theme}`}>
      <div className="phone-frame__bezel">
        <div className="phone-frame__notch" aria-hidden />
        <div className="phone-frame__screen">{children}</div>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

/** Tres pantallas ilustradas de CareMe, alineadas a la app. */
function CareMePhones() {
  return (
    <>
      <PhoneFrame theme="careme" label="Hoy">
        <p className="phone-careme__hi">
          Buenos días, Ana <span aria-hidden>👋</span>
        </p>
        <p className="phone-careme__sub">Un paso simple puede cambiar el tono del día.</p>
        <div className="phone-careme__chips">
          <span>
            <strong>2/3</strong> del día
          </span>
          <span>
            <strong>4</strong> días seguidos
          </span>
        </div>
        <p className="phone-careme__title">¿Cómo te sentís hoy?</p>
        <div className="phone-careme__moods" aria-hidden>
          <i>🙂</i>
          <i className="is-on">😌</i>
          <i>😐</i>
          <i>😔</i>
        </div>
        <div className="phone-careme__bubble">
          Desde la calma tomás las mejores decisiones.
        </div>
        <p className="phone-careme__title">Plan de hoy</p>
        <ul className="phone-careme__plan">
          <li>Caminar 20 minutos</li>
          <li>Escribir tres líneas</li>
        </ul>
      </PhoneFrame>
      <PhoneFrame theme="careme" label="Future You">
        <p className="phone-careme__kicker">Future You</p>
        <p className="phone-careme__hero">Una mente más calma y presente</p>
        <p className="phone-careme__sub">Así se siente y se nombra el perfil a futuro.</p>
        <div className="phone-careme__pills">
          <span className="is-on">En paz</span>
          <span>Constante</span>
          <span>Enfocado</span>
        </div>
        <div className="phone-careme__pills">
          <span className="is-on">Salud</span>
          <span>Relaciones</span>
          <span>Energía</span>
        </div>
      </PhoneFrame>
      <PhoneFrame theme="careme" label="Semanal">
        <p className="phone-careme__title">Resumen de la semana</p>
        <p className="phone-careme__sub">5 check-ins · sin juicio, solo continuidad.</p>
        <ul className="phone-careme__week">
          {[
            ["L", 70],
            ["M", 40],
            ["X", 85],
            ["J", 55],
            ["V", 90],
            ["S", 30],
            ["D", 20]
          ].map(([day, height]) => (
            <li key={String(day)}>
              <span style={{ height: `${height}%` }} />
              <em>{day}</em>
            </li>
          ))}
        </ul>
        <p className="phone-careme__note">Los días altos sostienen el rumbo.</p>
      </PhoneFrame>
    </>
  );
}

/** Tres pantallas ilustradas de Nido, alineadas a la app. */
function NidoPhones() {
  return (
    <>
      <PhoneFrame theme="nido" label="Hogar">
        <p className="phone-nido__house">Casa López</p>
        <p className="phone-nido__hi">Hola, familia</p>
        <p className="phone-nido__date">miércoles 16 de septiembre</p>
        <div className="phone-nido__people">
          <span>Juan</span>
          <span>Mia</span>
          <span className="is-pet">Luna</span>
        </div>
        <div className="phone-nido__card">
          <strong>Esta semana</strong>
          <div className="phone-nido__week">
            <i>L</i>
            <i className="is-on">M</i>
            <i>X</i>
            <i>J</i>
            <i>V</i>
          </div>
          <p>Vacuna de Luna · 18:00</p>
        </div>
        <div className="phone-nido__card phone-nido__card--gold">
          <strong>Gastos del mes</strong>
          <p>Restan 2 cuotas de alquiler</p>
        </div>
        <div className="phone-nido__card">
          <strong>Mar del Plata</strong>
          <p>Faltan 5 días · Ver viajes</p>
        </div>
      </PhoneFrame>
      <PhoneFrame theme="nido" label="Miembros">
        <p className="phone-nido__title">Miembros</p>
        <ul className="phone-nido__list">
          <li>
            <b>Juan</b>
            <span>Admin · 34</span>
          </li>
          <li>
            <b>Mia</b>
            <span>Cumple el 3 oct.</span>
          </li>
          <li>
            <b>Luna</b>
            <span>Mascota · próxima vacuna</span>
          </li>
        </ul>
        <p className="phone-nido__invite">Invitar al hogar</p>
      </PhoneFrame>
      <PhoneFrame theme="nido" label="Gastos">
        <p className="phone-nido__title">Gastos</p>
        <div className="phone-nido__card">
          <strong>Ingreso mensual</strong>
          <p className="phone-nido__money">$ 850.000</p>
        </div>
        <ul className="phone-nido__list">
          <li>
            <b>Alquiler</b>
            <span>Restan 2 de 12</span>
          </li>
          <li>
            <b>Luz</b>
            <span>Pagado este mes</span>
          </li>
        </ul>
      </PhoneFrame>
    </>
  );
}

/** Fila de teléfonos ilustrados según el producto. */
export function ProductPhoneMockups({ productId }: ProductPhoneMockupsProps) {
  return (
    <section className="container product-block product-phones" aria-label="Pantallas de la aplicación">
      <p className="product-label">La aplicación</p>
      <h2 className="product-title">Así se ve el uso cotidiano</h2>
      <p className="product-lead">
        Ilustraciones de las pantallas reales, con la identidad de {productId === "careme" ? "CareMe" : "Nido"}.
      </p>
      <div className="product-phones__row">
        {productId === "careme" ? <CareMePhones /> : <NidoPhones />}
      </div>
    </section>
  );
}
