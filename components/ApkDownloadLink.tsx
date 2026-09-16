import type { ProductKey } from "../lib/admin";
import type { ApkAvailability } from "../lib/apk";
import { publicRelease } from "../lib/release";

type ApkDownloadLinkProps = {
  apk: ApkAvailability;
  productId: ProductKey;
  className?: string;
  label?: string;
  pendingLabel?: string;
};

/** Link de descarga de APK o estado pendiente si el archivo aún no está publicado. */
export function ApkDownloadLink({
  apk,
  productId,
  className,
  label = "Descargar APK",
  pendingLabel = publicRelease.apkPendingCta
}: ApkDownloadLinkProps) {
  if (!apk.available || !apk.href) {
    const pendingClass = [className, "is-disabled"].filter(Boolean).join(" ");
    return (
      <span className={pendingClass} aria-disabled="true">
        {pendingLabel}
      </span>
    );
  }

  return (
    <a className={className} href={`/descargas/${productId}`}>
      {label}
    </a>
  );
}
