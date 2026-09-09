export type ProductStatus = "apk" | "development";
export type ProductTheme = "careme" | "nido";

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
    id: "careme",
    name: "CareMe",
    shortName: "CareMe",
    category: "Bienestar personal",
    kicker: "Future You",
    headline: "Acompañamiento diario hacia el perfil Future You.",
    blurb:
      "Check-in emocional, hábitos, objetivos y un plan breve alineado al perfil Future You. El producto acompaña el avance diario, sin un enfoque punitivo.",
    about:
      "CareMe es una aplicación de bienestar y crecimiento personal. El recorrido del día comienza con un check-in —ánimo, energía, estrés y foco—, continúa con un plan de pocas acciones y se sostiene con hábitos, objetivos y un resumen semanal. Future You es el perfil de la persona hacia la que se desea avanzar: la aplicación envía mensajes con ese tono. El enfoque no es punitivo ni está orientado a rachas de productividad.",
    loop: [
      {
        title: "Check-in",
        body: "Se registra el estado del día en pocos pasos.",
        accent: "#4DA8FF"
      },
      {
        title: "Plan",
        body: "La aplicación propone entre una y tres acciones, según ese estado.",
        accent: "#6C5CE7"
      },
      {
        title: "Hábitos y objetivos",
        body: "El progreso se marca en el día, sin penalizaciones.",
        accent: "#2DD4BF"
      },
      {
        title: "Resumen semanal",
        body: "Se revisa la continuidad de la semana para ajustar el rumbo.",
        accent: "#FF7EB6"
      }
    ],
    capabilities: [
      {
        title: "Check-in emocional",
        body: "Registro de ánimo, energía, estrés y foco. El resto del día se organiza a partir de ese estado.",
        accent: "#4DA8FF"
      },
      {
        title: "Future You",
        body: "Definición del perfil a futuro. CareMe envía mensajes con ese tono, o con textos configurados por el usuario.",
        accent: "#FF7EB6"
      },
      {
        title: "Plan del día",
        body: "Un conjunto breve de acciones, adaptado al check-in.",
        accent: "#6C5CE7"
      },
      {
        title: "Hábitos y objetivos",
        body: "Seguimiento diario del progreso, sin rankings ni indicadores de fracaso.",
        accent: "#2DD4BF"
      },
      {
        title: "Resumen semanal",
        body: "Una lectura de la continuidad de la semana, para corregir sin juicio.",
        accent: "#A78BFA"
      }
    ],
    status: "apk",
    href: "/productos/careme",
    accent: "#6C5CE7",
    logoSrc: "/logo-careme.png"
  },
  {
    id: "nido",
    name: "Nido",
    shortName: "Nido",
    category: "Gestión del hogar",
    headline: "La organización del hogar, en un solo lugar.",
    blurb:
      "Miembros, gastos, rutinas y compras compartidos. La sección Hogar concentra la información del día para todo el grupo.",
    about:
      "Nido es una aplicación para hogares compartidos. Permite crear un hogar, invitar a quienes conviven y mantener una vista común de la operación diaria: fechas importantes, gastos del mes, rutinas y listas de compras. Admite miembros locales —personas y mascotas— con eventos y vacunas. Quien crea el hogar administra las invitaciones y la configuración del plan.",
    loop: [
      {
        title: "Alta del hogar",
        body: "Se crea el hogar, se define un nombre y se invita a quienes conviven.",
        accent: "#C46B3A"
      },
      {
        title: "Hogar",
        body: "La pantalla central muestra el día: cumpleaños, gastos, rutinas y compras pendientes.",
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
        body: "Personas, mascotas, invitados, cumpleaños y eventos de cada integrante.",
        accent: "#4F8F6E"
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
