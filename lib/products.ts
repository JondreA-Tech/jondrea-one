export type ProductStatus = "apk" | "development";
export type ProductTheme = "nido" | "careme" | "escaparg";

export type ProductCapability = {
  title: string;
  body: string;
  accent?: string;
};

export type Product = {
  id: ProductTheme;
  name: string;
  shortName: string;
  category: string;
  kicker?: string;
  headline: string;
  blurb: string;
  about: string;
  loop: ProductCapability[];
  capabilities: ProductCapability[];
  status: ProductStatus;
  href: string | null;
  accent: string;
  logoSrc?: string;
  cta?: string;
};

/** Catálogo de productos mostrados en la landing. */
export const products: Product[] = [
  {
    id: "nido",
    name: "Nido",
    shortName: "Nido",
    category: "Hogar y bienestar",
    headline: "Organizá tu hogar. Hacé espacio para vos.",
    blurb:
      "Coordiná compras, gastos, rutinas y cuidados con quienes conviven. En Yo, registrá objetivos, hábitos y cómo te sentís.",
    about:
      "Nido es la aplicación para quienes conviven. Se crea un hogar, se invita a las personas y queda una vista común del día: cumpleaños, eventos, medicación, vacunas, viajes y lo que hay que comprar o pagar. Cada cuenta tiene un espacio Yo —ánimo, objetivos y hábitos— que no ven los demás; el emoji de ánimo sí aparece en Hogar, para que el grupo sepa cómo está cada uno. Admite personas y mascotas locales. La persona que administra el hogar gestiona las invitaciones.",
    loop: [
      {
        title: "Creá tu hogar",
        body: "Elegí un nombre y armá el espacio compartido de quienes conviven.",
        accent: "#C46B3A"
      },
      {
        title: "Sumá a quienes conviven",
        body: "Invitá a otras personas y agregá las fichas de personas y mascotas del hogar.",
        accent: "#D4894A"
      },
      {
        title: "Organicen el día",
        body: "Consulten gastos, rutinas, compras, notas y eventos desde una misma app.",
        accent: "#C46B3A"
      },
      {
        title: "Hacé lugar para vos",
        body: "Entrá a Yo desde Hogar para registrar tu ánimo y acompañar tus objetivos y hábitos.",
        accent: "#4F8F6E"
      }
    ],
    capabilities: [
      {
        title: "Hogar",
        body: "Vista del día y agenda de siete días. Desde Hogar también podés entrar a Yo.",
        accent: "#D4894A"
      },
      {
        title: "Yo",
        body: "Objetivos, hábitos y tendencias personales de la semana. El hogar solo ve tu señal actual de ánimo.",
        accent: "#C46B3A"
      },
      {
        title: "Miembros",
        body: "Personas y mascotas del hogar, con sus fichas, cumpleaños e información compartida.",
        accent: "#4F8F6E"
      },
      {
        title: "Eventos",
        body: "Agenda de salud, trabajo, entretenimiento y estudio, con categorías y recordatorios.",
        accent: "#4A7FB5"
      },
      {
        title: "Medicación y vacunas",
        body: "Registrá medicación con varios horarios y recordatorios, y guardá las vacunas de las mascotas.",
        accent: "#C46B3A"
      },
      {
        title: "Viajes",
        body: "Guardá las fechas del viaje y prepará la salida con una lista compartida.",
        accent: "#6B5E52"
      },
      {
        title: "Gastos",
        body: "Ingreso mensual, gastos recurrentes y cuotas. Registrá los pagos para mantener el resumen al día.",
        accent: "#C9A227"
      },
      {
        title: "Rutinas",
        body: "Asigná responsables y registrá lo que ya se hizo en las rutinas de cada día.",
        accent: "#4A7FB5"
      },
      {
        title: "Compras",
        body: "Listas compartidas con categorías y cantidades. Reutilizá artículos y, según el cupo, copiá listas.",
        accent: "#C45C4A"
      },
      {
        title: "Invitaciones",
        body: "Invitaciones para quienes conviven. La persona que administra el hogar gestiona el acceso.",
        accent: "#C46B3A"
      },
      {
        title: "Notas del hogar",
        body: "Compartí avisos cortos. Podés ocultar notas o reportar contenido desde la app.",
        accent: "#6B5E52"
      }
    ],
    status: "development",
    href: "/productos/nido",
    accent: "#C46B3A",
    logoSrc: "/logo-nido.png"
  },
  {
    id: "escaparg",
    name: "EscapARG",
    shortName: "EscapARG",
    category: "Escape cooperativo · 2–4 jugadores",
    headline: "El misterio se resuelve en equipo.",
    blurb: "Explorá escenarios, conectá pistas y resolvé misterios con tus amigos. Una experiencia de escape cooperativa, directamente en tu navegador.",
    about: "Reuní a tus amigos, explorá escenarios y conectá las pistas. Cada descubrimiento los acerca a la salida.",
    loop: [
      { title: "Explorar", body: "Observar espacios, objetos y documentos." },
      { title: "Conectar pistas", body: "Relacionar evidencias y poner a prueba ideas." },
      { title: "Cooperar", body: "Compartir información y coordinar acciones." }
    ],
    capabilities: [
      { title: "El Experimento", body: "Un incidente de contención deja al equipo atrapado en un laboratorio. Restablezcan sus sistemas e investiguen qué ocurrió con X-17." },
      { title: "El Contacto", body: "La última transmisión de Estación Orión fue: «Obtuvimos respuesta». Investiguen sus instalaciones y descubran qué ocurrió después." }
    ],
    status: "development",
    href: "/productos/escaparg",
    accent: "#22b6a8",
    logoSrc: "/productos/escaparg/logo-escaparg.svg",
    cta: "Descubrir EscapARG"
  },
  {
    id: "careme",
    name: "CareMe",
    shortName: "CareMe",
    category: "Desarrollo profesional",
    headline: "Tu próximo paso profesional empieza con un plan.",
    blurb: "Convertí tu objetivo profesional en un plan semanal. Avanzá con pequeñas misiones y practicá entrevistas y conversaciones con IA.",
    about: "CareMe transforma tu objetivo profesional en acciones concretas y te permite practicar entrevistas y conversaciones con IA, con feedback para seguir mejorando.",
    loop: [
      { title: "Definí tu objetivo", body: "Contá hacia dónde querés avanzar y cuánto tiempo tenés." },
      { title: "Construí tu semana", body: "Recibí un plan con pequeñas misiones adaptadas a tu disponibilidad." },
      { title: "Practicá y ajustá", body: "Ensayá situaciones profesionales, revisá el feedback y decidí cómo continuar." }
    ],
    capabilities: [
      { title: "Future You", body: "Una visión concreta de tu objetivo y cómo reconocer tu progreso." },
      { title: "Misiones", body: "Acciones pequeñas para avanzar durante la semana." },
      { title: "Práctica", body: "Presentación profesional, entrevistas conductuales y explicación de proyectos técnicos." },
      { title: "Feedback", body: "Observaciones basadas en la conversación y repetición de un momento para practicarlo." },
      { title: "Progreso", body: "XP, niveles y revisión semanal." }
    ],
    status: "development",
    href: null,
    accent: "#22b6a8",
    cta: "Próximamente"
  }
];

/** Devuelve un producto por id o undefined. */
export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
