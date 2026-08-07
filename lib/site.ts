/** Datos globales del sitio JondreA (editables a mano). */
export const site = {
  name: "JondreA",
  legalName: "JondreA Tech",
  tagline: "Productos digitales con identidad propia.",
  description:
    "Diseñamos y construimos aplicaciones móviles con foco en experiencia real. CareMe y Nido ya están en beta — por ahora solo en Android.",
  contact: {
    email: "jondreatech@gmail.com",
    instagram: "https://instagram.com/jondrea.tech",
    instagramHandle: "@jondrea.tech",
    linkedin: "https://linkedin.com/company/jondrea"
  },
  copyrightOwner: "JondreA Tech"
} as const;

/** Asunto y cuerpo sugeridos para pedir acceso a una beta. */
export function betaMailto(productName: string) {
  const subject = encodeURIComponent(`${productName} — quiero acceso a la beta`);
  const body = encodeURIComponent(
    `Hola JondreA,\n\nQuiero sumarme a la beta de ${productName} (Android).\n\nNombre:\nDispositivo Android:\n\nGracias.`
  );
  return `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
}
