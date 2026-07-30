import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { site } from "../lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Software factory`,
    template: `%s · ${site.name}`
  },
  description: site.description
};

/** Layout raíz: tipografías y estilos globales. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${sora.variable} ${manrope.variable}`}>
        <style>{`
          :root {
            --font-display: var(--font-display-loaded), ${sora.style.fontFamily};
            --font-body: var(--font-body-loaded), ${manrope.style.fontFamily};
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
