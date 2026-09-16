import type { MetadataRoute } from "next";
import { siteOrigin } from "../lib/site";

/** robots.txt: indexar el sitio, no el panel. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"]
    },
    sitemap: `${siteOrigin()}/sitemap.xml`
  };
}
