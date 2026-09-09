import { resolveApk, type ApkAvailability } from "./apk";
import { publicRelease } from "./release";

/** Datos de la release sideload de Nido. */
export const nidoRelease = {
  versionName: publicRelease.versionName,
  apkPath: "/downloads/nido.apk",
  changelog: [
    "Versión beta para Android",
    "Hogar, miembros, gastos, rutinas y compras",
    "Invitaciones y configuración del plan"
  ]
} as const;

/** Disponibilidad del APK de Nido (env o archivo en public/downloads). */
export function getNidoApk(): ApkAvailability {
  return resolveApk(nidoRelease.apkPath, process.env.NEXT_PUBLIC_NIDO_APK_URL);
}
