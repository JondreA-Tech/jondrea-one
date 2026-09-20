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
    category: "Gestión del hogar",
    headline: "La organización del hogar, en un solo lugar.",
    blurb:
      "Miembros, gastos, rutinas y compras compartidos. En Hogar está el día del grupo; en Yo, el ánimo, los objetivos y los hábitos personales.",
    about:
      "Nido es una aplicación para hogares compartidos. Permite crear un hogar, invitar a quienes conviven y mantener una vista común de la operación diaria: fechas importantes, viajes, gastos del mes, rutinas y listas de compras. Cada persona tiene un espacio Yo —objetivos, hábitos y estado de ánimo— que no ven los demás; el emoji de ánimo sí se refleja en Hogar. Admite miembros locales —personas y mascotas— con eventos, vacunas y medicación. Quien crea el hogar administra las invitaciones y la configuración del plan.",
    loop: [
      {
        title: "Alta del hogar",
        body: "Se crea el hogar, se define un nombre y se invita a quienes conviven.",
        accent: "#C46B3A"
      },
      {
        title: "Hogar",
        body: "La pantalla central muestra el día: cumpleaños, viajes, gastos, rutinas y compras pendientes.",
        accent: "#D4894A"
      },
      {
        title: "Módulos",
        body: "Desde ahí se accede a miembros, gastos, rutinas o compras, según la tarea.",
        accent: "#4A7FB5"
      },
      {
        title: "Uso compartido",
        body: "Todos los integrantes ven la misma información. El administrador gestiona invitaciones y el plan.",
        accent: "#4F8F6E"
      }
    ],
    capabilities: [
      {
        title: "Hogar",
        body: "Resumen del día. Consulta rápida, sin formularios: si es necesario actuar, se abre el módulo correspondiente.",
        accent: "#D4894A"
      },
      {
        title: "Miembros",
        body: "Personas, mascotas, invitados, cumpleaños, eventos, vacunas y medicación de cada integrante.",
        accent: "#4F8F6E"
      },
      {
        title: "Yo",
        body: "Ánimo del día, objetivos y hábitos personales. Solo vos los ves; el hogar solo ve el emoji.",
        accent: "#C46B3A"
      },
      {
        title: "Invitaciones",
        body: "Se invita a quienes conviven. El administrador gestiona el acceso al hogar.",
        accent: "#C46B3A"
      },
      {
        title: "Viajes",
        body: "Viajes del hogar, con fechas y recordatorios. En Hogar aparece la cuenta regresiva cuando se acerca la salida.",
        accent: "#6B5E52"
      },
      {
        title: "Gastos",
        body: "Ingreso mensual, cuotas (restan X de Y) y registro del pago del mes.",
        accent: "#C9A227"
      },
      {
        title: "Rutinas",
        body: "Tareas que se repiten en la semana, con los días correspondientes.",
        accent: "#4A7FB5"
      },
      {
        title: "Compras",
        body: "Listas compartidas, en unidades o en kilos.",
        accent: "#C45C4A"
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
