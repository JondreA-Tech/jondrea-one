import Link from "next/link";

type AdminProductCardProps = {
  href: string;
  active: boolean;
  theme: "careme" | "nido";
  name: string;
  category: string;
  logoSrc?: string;
  apiOk: boolean;
  apkAvailable: boolean;
  apkVersion: string;
  stat: string;
  detail: string;
};

/** Tarjeta de producto para cambiar el tab del dashboard. */
export function AdminProductCard({
  href,
  active,
  theme,
  name,
  category,
  logoSrc,
  apiOk,
  apkAvailable,
  apkVersion,
  stat,
  detail
}: AdminProductCardProps) {
  return (
    <Link
      href={href}
      className={`admin-product admin-product--${theme} ${active ? "is-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      <div className="admin-product__head">
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} alt="" className="admin-product__logo" />
        ) : null}
        <div>
          <p className="admin-kicker">{category}</p>
          <h2>{name}</h2>
        </div>
      </div>
      <div className="admin-product__badges">
        <span className={`admin-status ${apiOk ? "is-ok" : "is-down"}`}>
          <i aria-hidden />
          {apiOk ? "API en línea" : "API sin respuesta"}
        </span>
        <span className={`admin-status ${apkAvailable ? "is-ok" : "is-wait"}`}>
          {apkAvailable ? apkVersion : "APK pendiente"}
        </span>
      </div>
      <p className="admin-product__stat">{stat}</p>
      <p className="admin-product__detail">{detail}</p>
    </Link>
  );
}
