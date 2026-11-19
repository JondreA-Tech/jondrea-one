import Image from "next/image";

const NIDO_SHOTS = [
  { src: "/nido/screens/nido-hogar.png", label: "Hogar", alt: "Resumen del hogar con acceso a Mi espacio, próximo viaje y agenda de siete días." },
  { src: "/nido/screens/nido-yo.png", label: "Yo", alt: "Tendencias privadas de ánimo y hábitos por día de la semana." },
  { src: "/nido/screens/nido-miembros.png", label: "Miembros", alt: "Personas y mascotas registradas en el hogar." },
  { src: "/nido/screens/nido-medicacion.png", label: "Medicación", alt: "Formulario de medicación con dos horarios y la opción de agregar otro." },
  { src: "/nido/screens/nido-gastos.png", label: "Gastos", alt: "Saldo del hogar, un gasto fijo y otro en cuotas, con el ingreso oculto." },
  { src: "/nido/screens/nido-rutinas.png", label: "Rutinas", alt: "Rutinas semanales con una tarea asignada y otra completada." },
  { src: "/nido/screens/nido-compras.png", label: "Compras", alt: "Lista de compras con artículos por categoría, cantidades y la opción de reutilizarlos." },
  { src: "/nido/screens/nido-preparacion-viaje.png", label: "Preparación del viaje", alt: "Lista compartida de preparación de un viaje con tareas hechas y pendientes." }
] as const;

/** Presenta una captura real con opción de ampliarla en otra pestaña. */
function PhoneShot({ src, label, alt }: { src: string; label: string; alt: string }) {
  const captureSrc = `${src}?v=1.0.0-android`;
  return (
    <figure className="phone-frame phone-frame--nido">
      <div className="phone-frame__bezel">
        <div className="phone-frame__notch" aria-hidden="true" />
        <div className="phone-frame__screen phone-frame__screen--photo">
          <a href={captureSrc} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar captura de ${label} (abre otra pestaña)`}>
            <Image src={captureSrc} alt={alt} width={1080} height={2400} sizes="(max-width: 460px) 42vw, 182px" />
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
        <p>Capturas de Nido 1.0.0 para Android con datos ficticios. Podés ampliar cada imagen para ver el detalle.</p>
      </div>
      <div className="product-phones__row product-phones__row--gallery">
        {NIDO_SHOTS.map((shot) => <PhoneShot key={shot.src} {...shot} />)}
      </div>
    </section>
  );
}
