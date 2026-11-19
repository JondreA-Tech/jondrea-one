import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

/** Layout marketing: header + footer corporativos. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell" style={{ fontFamily: "var(--font-body)" }}>
      <a className="site-skip" href="#contenido">Ir al contenido</a>
      <SiteHeader />
      <main id="contenido" className="site-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
