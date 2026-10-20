import Image from "next/image";

const NIDO_SHOTS = [
  { src: "/nido/screens/nido-hogar.png", label: "Hogar", alt: "Pantalla Hogar de Nido con el día del grupo y el ánimo de cada miembro." },
  { src: "/nido/screens/nido-yo.png", label: "Yo", alt: "Espacio Yo: check-in de ánimo, objetivos y hábitos personales." },
  { src: "/nido/screens/nido-miembros.png", label: "Miembros", alt: "Ficha de miembro con cumpleaños, signo y eventos." },
  { src: "/nido/screens/nido-medicacion.png", label: "Medicación", alt: "Alta de medicación con dosis, frecuencia y recordatorio." },
  { src: "/nido/screens/nido-gastos.png", label: "Gastos", alt: "Gastos del mes con ingreso y cuotas." },
  { src: "/nido/screens/nido-rutinas.png", label: "Rutinas y compras", alt: "Rutinas del día y listas de compras del hogar." }
] as const;

/** Presenta una captura real con opción de ampliarla en otra pestaña. */
function PhoneShot({ src, label, alt }: { src: string; label: string; alt: string }) {
  return (
    <figure className="phone-frame phone-frame--nido">
      <div className="phone-frame__bezel">
        <div className="phone-frame__notch" aria-hidden="true" />
        <div className="phone-frame__screen phone-frame__screen--photo">
          <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar captura de ${label} (abre otra pestaña)`}>
            <Image src={src} alt={alt} width={780} height={1688} sizes="(max-width: 700px) 45vw, 200px" />
          </a>
        </div>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

/** Galería de pantallas reales de Nido, separada del arte conceptual. */
export function ProductPhoneMockups() {
  return (
    <section id="pantallas" className="container product-block nido-section product-phones" aria-labelledby="nido-screens-title">
      <div className="nido-intro">
        <p className="product-label">La app, por dentro</p>
        <h2 id="nido-screens-title">Así se organiza tu día.</h2>
        <p>Capturas reales de la aplicación en desarrollo. La interfaz puede cambiar antes del lanzamiento. Podés ampliar cada imagen para ver el detalle.</p>
      </div>
      <div className="product-phones__row product-phones__row--gallery">
        {NIDO_SHOTS.map((shot) => <PhoneShot key={shot.src} {...shot} />)}
      </div>
    </section>
  );
}
