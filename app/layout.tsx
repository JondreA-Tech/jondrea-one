import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/nunito";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import { site, siteOrigin } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: `${site.name} — Desarrollo de software a medida`,
    template: `%s · ${site.name}`
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Desarrollo de software a medida`,
    description: site.description,
    locale: "es_AR",
    type: "website",
    siteName: site.legalName,
    images: [{ url: "/og.png", alt: `${site.legalName}` }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Desarrollo de software a medida`,
    description: site.description,
    images: ["/og.png"]
  }
};

/** Layout raíz: tipografías y estilos globales. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>
        {children}
      </body>
    </html>
  );
}
