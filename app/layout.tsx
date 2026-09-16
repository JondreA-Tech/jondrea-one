import type { Metadata } from "next";
import { Inter, Nunito, Poppins } from "next/font/google";
import { site, siteOrigin } from "../lib/site";
import "./globals.css";

const display = Inter({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
  weight: ["500", "600", "700", "800"]
});

const body = Poppins({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const nido = Nunito({
  subsets: ["latin"],
  variable: "--font-nido-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: `${site.name} — Productos digitales`,
    template: `%s · ${site.name}`
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Productos digitales`,
    description: site.description,
    locale: "es_AR",
    type: "website",
    siteName: site.legalName,
    images: [{ url: "/og.png", alt: `${site.legalName}` }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Productos digitales`,
    description: site.description,
    images: ["/og.png"]
  }
};

/** Layout raíz: tipografías y estilos globales. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} ${nido.variable}`}>
        <style>{`
          :root {
            --font-display: var(--font-display-loaded), ${display.style.fontFamily};
            --font-body: var(--font-body-loaded), ${body.style.fontFamily};
            --font-careme: var(--font-body);
            --font-nido: var(--font-nido-loaded), ${nido.style.fontFamily};
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
