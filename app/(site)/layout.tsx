import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

/** Layout marketing: header + footer corporativos. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell" style={{ fontFamily: "var(--font-body)" }}>
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
