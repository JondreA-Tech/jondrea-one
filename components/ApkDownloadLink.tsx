import type { ApkAvailability } from "../lib/apk";
import { publicRelease } from "../lib/release";

type ApkDownloadLinkProps = {
  apk: ApkAvailability;
  className?: string;
  label?: string;
  pendingLabel?: string;
};

/** Link de descarga de APK o estado pendiente si el archivo aún no está publicado. */
export function ApkDownloadLink({
  apk,
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
    <a className={className} href={apk.href} download={apk.download || undefined}>
      {label}
    </a>
  );
}
