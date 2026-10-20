import Image from "next/image";
import Link from "next/link";
import { productMailto } from "../lib/site";
import { EscapargBrand } from "./EscapargBrand";
import "../styles/escaparg-brand.css";
import "../styles/escaparg-product.css";

const rooms = [
  { number: "01", name: "El Experimento", setting: "LABORATORIO X-17", image: "el-experimento-portada.webp", alt: "Arte promocional de El Experimento: una cápsula iluminada en un laboratorio industrial.", description: "Un incidente de contención deja al equipo atrapado en un laboratorio. Restablezcan sus sistemas e investiguen qué ocurrió con X-17.", tags: ["Observación", "Instrumentos", "Coordinación"] },
  { number: "02", name: "El Contacto", setting: "ESTACIÓN ORIÓN", image: "el-contacto-portada.webp", alt: "Arte promocional de El Contacto: una presencia desconocida en las instalaciones de Estación Orión.", description: "La última transmisión de Estación Orión fue: «Obtuvimos respuesta». Investiguen sus instalaciones y descubran qué ocurrió después.", tags: ["Exploración", "Señales", "Tensión compartida"] },
];

const gallery = [
  { image: "laboratorio-gameplay.webp", title: "Un misterio, varios puntos de vista.", label: "EL EXPERIMENTO · EXPLORACIÓN", alt: "Captura del juego El Experimento con dos personajes junto a los instrumentos del laboratorio.", body: "Recorré el laboratorio, observá sus objetos y compartí lo que descubrís." },
  { image: "contencion-gameplay.webp", title: "Las máquinas también son parte del puzzle.", label: "EL EXPERIMENTO · CONTENCIÓN", alt: "Captura de la máquina de síntesis y sus estaciones físicas en Contención.", body: "Instrumentos y mecanismos convierten las pistas en acciones dentro del escenario." },
  { image: "orion-gameplay.webp", title: "Otro lugar. Nuevas preguntas.", label: "EL CONTACTO · ESTACIÓN ORIÓN", alt: "Captura de las instalaciones de Estación Orión, con un personaje entre sus mecanismos.", body: "Una nueva instalación, ambientes propios y desafíos que necesitan al equipo." },
  { image: "instrumento-ui.webp", title: "Hablar también es una herramienta.", label: "EL CONTACTO · INTERFAZ COOPERATIVA", alt: "Captura de un instrumento de El Contacto con su panel de interacción junto al escenario.", body: "Abrí los instrumentos, compará observaciones y coordiná quién hace cada parte." },
];

const principles = [
  { number: "01", title: "Explorá con atención.", body: "Objetos, documentos e instrumentos forman parte del mundo. La información está ahí para descubrirla." },
  { number: "02", title: "Conectá las pistas.", body: "Observá, relacioná y probá ideas. El desafío está en entender lo que encontrás, no en conocer una respuesta de memoria." },
  { number: "03", title: "Escapen juntos.", body: "Compartí lo que ves y coordiná acciones. Cada integrante puede aportar algo que haga avanzar al equipo." },
];

/** Presenta EscapARG con identidad propia, recursos reales y disponibilidad transparente. */
export function EscapargProductPage() {
  return <article className="escaparg-product">
    <header className="container escaparg-hero">
      <div className="escaparg-hero-copy">
        <Link className="escaparg-back" href="/productos">← Todos los productos</Link>
        <div className="escaparg-lockup"><Image src="/productos/escaparg/logo-escaparg.svg" alt="" width={52} height={52} /><EscapargBrand /></div>
        <p className="section-label">ESCAPE ROOMS COOPERATIVAS ONLINE</p>
        <h1>El misterio se<br />resuelve <em>en equipo.</em></h1>
        <p className="escaparg-lead">Una pista que sólo vos ves. Un mecanismo que necesita dos. Un misterio que exige confiar en tu equipo.</p>
        <p className="escaparg-hero-detail">Explorá, conectá las pistas y encontrá la salida con tus amigos. Directamente desde sus navegadores.</p>
        <div className="hero-actions"><a className="btn btn-primary" href="#salas">Descubrí las salas <span aria-hidden="true">↗</span></a><a className="btn btn-ghost" href="#dentro-del-juego">Ver el juego</a></div>
        <p className="escaparg-availability"><span aria-hidden="true" /> En desarrollo · Pruebas cooperativas</p>
      </div>
      <figure className="escaparg-hero-visual">
        <Image src="/productos/escaparg/el-experimento-portada.webp" alt="Arte promocional de EscapARG: cápsula X-17, pantallas y luces de emergencia en el laboratorio." fill priority sizes="(max-width: 900px) 100vw, 55vw" />
        <div className="escaparg-visual-caption"><span>EL EXPERIMENTO</span><strong>Todo empieza con una pregunta.</strong></div>
        <figcaption>Arte promocional original · El gameplay se muestra más abajo</figcaption>
      </figure>
    </header>

    <div className="container escaparg-facts" aria-label="Datos del producto"><p><strong>2–4</strong><span>jugadores por equipo</span></p><p><strong>Online</strong><span>desde el navegador</span></p><p><strong>Dos salas</strong><span>un misterio conectado</span></p><p><strong>En español</strong><span>para descubrir juntos</span></p></div>

    <section className="container section escaparg-section" aria-labelledby="experience-title">
      <div className="escaparg-section-intro"><p className="section-label">LA EXPERIENCIA</p><h2 id="experience-title" className="section-title">Cada pista cuenta.<br />Cada persona también.</h2><p className="section-lead">La idea es simple: sentir que entrás a una escape room con amigos. La salida se construye observando, conversando y colaborando.</p></div>
      <ol className="escaparg-principles">{principles.map((item) => <li key={item.number}><span className="escaparg-index">{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol>
    </section>

    <section id="salas" className="container section escaparg-section" aria-labelledby="rooms-title">
      <div className="escaparg-section-intro"><p className="section-label">LAS PRIMERAS DOS ESCAPE ROOMS</p><h2 id="rooms-title" className="section-title">Dos lugares.<br />Un misterio que continúa.</h2><p className="section-lead">Del laboratorio X-17 a Estación Orión. Cada sala tiene su ambiente, sus instrumentos y una historia por descubrir.</p></div>
      <div className="escaparg-rooms">{rooms.map((room) => <article className="escaparg-room" key={room.number}>
        <figure><Image src={`/productos/escaparg/${room.image}`} alt={room.alt} width={1200} height={675} sizes="(max-width: 700px) 100vw, 550px" /><span className="escaparg-room-number" aria-hidden="true">{room.number}</span><figcaption>Arte promocional original</figcaption></figure>
        <div className="escaparg-room-body"><p className="section-label">{room.setting}</p><h3>{room.name}</h3><p>{room.description}</p><ul aria-label={`Experiencia de ${room.name}`}>{room.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
      </article>)}</div>
    </section>

    <section id="dentro-del-juego" className="container section escaparg-section" aria-labelledby="gallery-title">
      <div className="escaparg-section-intro"><p className="section-label">DENTRO DEL JUEGO</p><h2 id="gallery-title" className="section-title">Así se ve la experiencia.</h2><p className="section-lead">Capturas reales de versiones en desarrollo: escenarios, mecanismos e interfaces. El arte promocional de las portadas no representa el render del juego.</p></div>
      <div className="escaparg-gallery">{gallery.map((item) => <figure key={item.image}>
        <a href={`/productos/escaparg/${item.image}`} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar imagen: ${item.title} (abre otra pestaña)`}><Image src={`/productos/escaparg/${item.image}`} alt={item.alt} width={1060} height={620} sizes="(max-width: 700px) 100vw, 550px" /><span className="escaparg-enlarge" aria-hidden="true">Ampliar ↗</span></a>
        <figcaption><span className="section-label">{item.label}</span><h3>{item.title}</h3><p>{item.body}</p></figcaption>
      </figure>)}</div>
    </section>

    <section className="container section escaparg-section" aria-labelledby="goals-title">
      <div className="escaparg-goals"><div><p className="section-label">LO QUE QUEREMOS CONSTRUIR</p><h2 id="goals-title" className="section-title">Que escapar sea<br />una historia compartida.</h2></div><ul><li><strong>Cooperación con sentido.</strong><span>Que conversar y coordinar sea parte del desafío, no sólo jugar al lado de alguien.</span></li><li><strong>Misterios que se puedan deducir.</strong><span>Evidencias dentro del escenario y pistas progresivas cuando el equipo las pide.</span></li><li><strong>Un mundo que acompañe.</strong><span>Escenarios, interfaces, música y sonidos al servicio de lo que está pasando.</span></li></ul></div>
    </section>

    <section className="container section escaparg-section" aria-labelledby="status-title"><div className="escaparg-status"><span className="section-label">ESTADO DEL PROYECTO</span><h2 id="status-title">Dos salas en pruebas. Mucho por descubrir.</h2><p>El Experimento y El Contacto están implementadas como candidatas para pruebas cooperativas. Estamos evaluando claridad, dificultad, cooperación y la experiencia audiovisual antes de un lanzamiento público.</p><p className="escaparg-status-note">En desarrollo. Sin fecha de lanzamiento público confirmada.</p></div></section>

    <section className="container section section--cta escaparg-contact"><div className="cta-band"><p className="section-label">UN PRODUCTO DE JONDREA</p><h2 className="section-title">¿Conversamos sobre EscapARG?</h2><p className="section-lead">Si querés saber más sobre el proyecto o acercarnos una consulta, escribinos.</p><div className="hero-actions hero-actions--center"><a className="btn btn-primary" href={productMailto("EscapARG")}>Contactar a JondreA</a><Link className="btn btn-ghost" href="/productos">Volver al catálogo</Link></div></div></section>
  </article>;
}
