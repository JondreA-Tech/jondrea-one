import type { MetadataRoute } from "next";
import { siteOrigin } from "../lib/site";

/** Sitemap de las rutas públicas. */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  const paths = [
    "/",
    "/productos",
    "/productos/careme",
    "/productos/nido",
    "/sobre-nosotros",
    "/contactanos",
    "/privacidad"
  ];
  return paths.map((path) => ({
    url: `${origin}${path}`,
    lastModified: new Date()
  }));
}
