import { resolveApk, type ApkAvailability } from "./apk";
import { publicRelease } from "./release";

/** Datos de la release sideload de CareMe. */
export const caremeRelease = {
  versionName: publicRelease.versionName,
  apkPath: "/downloads/careme.apk",
  changelog: [
    "Versión beta para Android",
    "Aviso de actualización en la aplicación",
    "Recuperación de contraseña por correo electrónico"
  ]
} as const;

/** Disponibilidad del APK de CareMe (env o archivo en public/downloads). */
export function getCareMeApk(): ApkAvailability {
  return resolveApk(caremeRelease.apkPath, process.env.NEXT_PUBLIC_CAREME_APK_URL);
}
