import { resolveApk, type ApkAvailability } from "./apk";
import { publicRelease } from "./release";

/** Datos de la release sideload de Nido. */
export const nidoRelease = {
  versionName: publicRelease.versionName,
  apkPath: "/downloads/nido.apk",
  changelog: [
    "Espacio Yo: ánimo, objetivos y hábitos personales",
    "El emoji de ánimo se ve en Hogar; el detalle no",
    "Medicación para personas y mascotas",
    "Eventos con icono por categoría; Escuela pasa a Estudio",
    "Ficha de miembro con edad, signo y cumpleaños (dueño e invitados)",
    "Hogar, gastos, rutinas, compras y viajes"
  ]
} as const;

/** Disponibilidad del APK de Nido (env o archivo en public/downloads). */
export function getNidoApk(): ApkAvailability {
  return resolveApk(nidoRelease.apkPath, process.env.NEXT_PUBLIC_NIDO_APK_URL);
}
