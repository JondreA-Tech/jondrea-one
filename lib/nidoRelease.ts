import { resolveApk, type ApkAvailability } from "./apk";
import { publicRelease } from "./release";

/** Datos de la release sideload de Nido. */
export const nidoRelease = {
  versionName: publicRelease.versionName,
  apkPath: "/downloads/nido-1.0.0.apk",
  changelog: [
    "Agenda de siete días y preparación compartida de viajes",
    "Listas de compras reutilizables y artículos por categoría",
    "Rutinas con responsables y medicación con varios horarios",
    "Tendencias personales de ánimo y hábitos en Yo",
    "Reportes, controles de convivencia y eliminación de cuenta",
    "Nido Premium por hogar, previsto para Google Play"
  ]
} as const;

/** Habilita solo el artefacto aprobado para la versión actual; no reutiliza descargas anteriores. */
export function getNidoApk(): ApkAvailability {
  if (process.env.NIDO_PUBLISHED_VERSION !== publicRelease.versionName) {
    return { available: false, href: null, download: false };
  }
  return resolveApk(
    nidoRelease.apkPath,
    process.env.NEXT_PUBLIC_NIDO_APK_URL
  );
}
