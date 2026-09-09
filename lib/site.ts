/** Datos globales del sitio JondreA (editables a mano). */
export const site = {
  name: "JondreA",
  legalName: "JondreA Tech",
  tagline: "Productos digitales y desarrollo a medida.",
  description:
    "JondreA desarrolla productos digitales propios y soluciones a medida. CareMe y Nido se encuentran en beta para Android; la APK está próxima a publicarse en cada ficha de producto.",
  contact: {
    email: "jondreatech@gmail.com",
    instagram: "https://instagram.com/jondrea.tech",
    instagramHandle: "@jondrea.tech",
    linkedin: "https://linkedin.com/company/jondrea"
  },
  copyrightOwner: "JondreA Tech"
} as const;

/** Asunto y cuerpo para consultar un trabajo a medida. */
export function customWorkMailto() {
  const subject = encodeURIComponent("Consulta — desarrollo a medida");
  const body = encodeURIComponent(
    `Hola JondreA,\n\nDeseo consultar por el desarrollo de una página web o una aplicación.\n\nDescripción del proyecto:\n\nSaludos.`
  );
  return `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
}

/** Asunto y cuerpo para consultas sobre un producto publicado. */
export function productMailto(productName: string) {
  const subject = encodeURIComponent(`Consulta — ${productName}`);
  const body = encodeURIComponent(
    `Hola JondreA,\n\nConsulta sobre ${productName}.\n\nNombre:\nDispositivo:\n\nSaludos.`
  );
  return `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
}
