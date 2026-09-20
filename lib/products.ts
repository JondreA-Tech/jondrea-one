export type ProductStatus = "apk" | "development";
export type ProductTheme = "nido";

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
};

/** Catálogo de productos mostrados en la landing. */
export const products: Product[] = [
  {
    id: "nido",
    name: "Nido",
    shortName: "Nido",
    category: "Hogar y bienestar",
    headline: "El hub del hogar, y un espacio solo tuyo.",
    blurb:
      "Hogar comparte el día del grupo: miembros, gastos, rutinas, compras y viajes. Yo guarda ánimo, objetivos y hábitos personales. El resto del hogar solo ve el emoji.",
    about:
      "Nido es la aplicación para quienes conviven. Se crea un hogar, se invita a las personas y queda una vista común del día: cumpleaños, eventos, medicación, vacunas, viajes y lo que hay que comprar o pagar. Cada cuenta tiene un espacio Yo —ánimo, objetivos y hábitos— que no ven los demás; el emoji de ánimo sí aparece en Hogar, para que el grupo sepa cómo está cada uno. Admite personas y mascotas locales. Quien crea el hogar administra invitaciones y el plan.",
    loop: [
      {
        title: "Alta del hogar",
        body: "Se crea el grupo, se elige un nombre y se invita a quienes conviven.",
        accent: "#C46B3A"
      },
      {
        title: "Hogar",
        body: "La pantalla del día: ánimo de cada uno, cumpleaños, agenda, gastos, rutinas y compras.",
        accent: "#D4894A"
      },
      {
        title: "Yo",
        body: "Desde Hogar se entra al espacio personal: check-in de ánimo, objetivos y hábitos. Solo vos los ves.",
        accent: "#C46B3A"
      },
      {
        title: "Miembros",
        body: "Personas, mascotas e invitados. Cada ficha tiene edad, signo, eventos, vacunas y medicación.",
        accent: "#4F8F6E"
      }
    ],
    capabilities: [
      {
        title: "Hogar",
        body: "Resumen del día. El avatar de cada cuenta muestra el emoji de ánimo. Desde ahí se entra a Yo.",
        accent: "#D4894A"
      },
      {
        title: "Yo",
        body: "Ánimo del día, objetivos y hábitos personales. El hogar no ve el detalle: solo el emoji.",
        accent: "#C46B3A"
      },
      {
        title: "Miembros",
        body: "Dueño, invitados, personas y mascotas locales. Cumpleaños, signo, edad y etapa de vida.",
        accent: "#4F8F6E"
      },
      {
        title: "Eventos",
        body: "Salud, trabajo, entretenimiento y estudio, con icono por categoría y recordatorios.",
        accent: "#4A7FB5"
      },
      {
        title: "Medicación",
        body: "Dosis, frecuencia (diaria, semanal o única) y aviso. Para personas y mascotas.",
        accent: "#C46B3A"
      },
      {
        title: "Viajes",
        body: "Fechas y cuenta regresiva en Hogar cuando se acerca la salida.",
        accent: "#6B5E52"
      },
      {
        title: "Gastos",
        body: "Ingreso mensual, cuotas (restan X de Y) y registro del pago del mes.",
        accent: "#C9A227"
      },
      {
        title: "Rutinas",
        body: "Tareas compartidas de la semana, distintas de los hábitos personales de Yo.",
        accent: "#4A7FB5"
      },
      {
        title: "Compras",
        body: "Listas compartidas, en unidades o en kilos.",
        accent: "#C45C4A"
      },
      {
        title: "Invitaciones",
        body: "Se invita a quienes conviven. El administrador gestiona el acceso.",
        accent: "#C46B3A"
      }
    ],
    status: "apk",
    href: "/productos/nido",
    accent: "#C46B3A",
    logoSrc: "/logo-nido.png"
  }
];

/** Devuelve un producto por id o undefined. */
export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
