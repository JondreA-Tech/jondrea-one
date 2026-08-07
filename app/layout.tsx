import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { site } from "../lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
  weight: ["500", "600", "700", "800"]
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Productos digitales`,
    template: `%s · ${site.name}`
  },
  description: site.description
};

/** Layout raíz: tipografías y estilos globales. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable}`}>
        <style>{`
          :root {
            --font-display: var(--font-display-loaded), ${display.style.fontFamily};
            --font-body: var(--font-body-loaded), ${body.style.fontFamily};
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
