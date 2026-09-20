import type { ReactNode } from "react";

type ProductPhoneMockupsProps = {
  productId: "nido";
};

/** Marco de teléfono para una captura ilustrada. */
function PhoneFrame({
  label,
  theme,
  children
}: {
  label: string;
  theme: "nido";
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
  void productId;
  return (
    <section className="container product-block product-phones" aria-label="Pantallas de la aplicación">
      <p className="product-label">La aplicación</p>
      <h2 className="product-title">Así se ve el uso cotidiano</h2>
      <p className="product-lead">
        Ilustraciones de las pantallas reales, con la identidad de Nido.
      </p>
      <div className="product-phones__row">
        <NidoPhones />
      </div>
    </section>
  );
}
