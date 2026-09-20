type ProductPhoneMockupsProps = {
  productId: "nido";
};

const NIDO_SHOTS = [
  { src: "/nido/screens/nido-hogar.png", label: "Hogar", alt: "Pantalla Hogar de Nido con el día del grupo y el ánimo de cada miembro." },
  { src: "/nido/screens/nido-yo.png", label: "Yo", alt: "Espacio Yo: check-in de ánimo, objetivos y hábitos personales." },
  { src: "/nido/screens/nido-miembros.png", label: "Miembros", alt: "Ficha de miembro con cumpleaños, signo y eventos." },
  { src: "/nido/screens/nido-medicacion.png", label: "Medicación", alt: "Alta de medicación con dosis, frecuencia y recordatorio." },
  { src: "/nido/screens/nido-gastos.png", label: "Gastos", alt: "Gastos del mes con ingreso y cuotas." },
  { src: "/nido/screens/nido-rutinas.png", label: "Rutinas y compras", alt: "Rutinas del día y listas de compras del hogar." }
] as const;

/** Marco de teléfono para una captura de Nido. */
function PhoneShot({
  src,
  label,
  alt
}: {
  src: string;
  label: string;
  alt: string;
}) {
  return (
    <figure className="phone-frame phone-frame--nido">
      <div className="phone-frame__bezel">
        <div className="phone-frame__notch" aria-hidden />
        <div className="phone-frame__screen phone-frame__screen--photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
        </div>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

/** Galería de pantallas de Nido. */
export function ProductPhoneMockups({ productId }: ProductPhoneMockupsProps) {
  void productId;
  return (
    <section className="container product-block product-phones" aria-label="Pantallas de la aplicación">
      <p className="product-label">La aplicación</p>
      <h2 className="product-title">Así se ve Nido</h2>
      <p className="product-lead">
        Hogar para el grupo, Yo para lo personal, y los módulos del día a día.
      </p>
      <div className="product-phones__row product-phones__row--gallery">
        {NIDO_SHOTS.map((shot) => (
          <PhoneShot key={shot.src} src={shot.src} label={shot.label} alt={shot.alt} />
        ))}
      </div>
    </section>
  );
}
