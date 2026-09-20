import { resolveApk, type ApkAvailability } from "./apk";
import { publicRelease } from "./release";

/** Datos de la release sideload de Nido. */
export const nidoRelease = {
  versionName: publicRelease.versionName,
  apkPath: "/downloads/nido.apk",
  /** APK QA 0.2.0 (commit 98e17f2). EAS la retira el 4 oct 2026; hay copia en public/downloads. */
  publishedApkUrl:
    "https://expo.dev/artifacts/eas/Ck3tTA4LLFdNDUJm5Ghj4MEB27nGSvfFcXmISDl-B2s.apk",
  changelog: [
    "Espacio Yo: ánimo, objetivos y hábitos personales",
    "El emoji de ánimo se ve en Hogar; el detalle no",
    "Medicación para personas y mascotas",
    "Eventos con icono por categoría; Escuela pasa a Estudio",
    "Ficha de miembro con edad, signo y cumpleaños (dueño e invitados)",
    "Hogar, gastos, rutinas, compras y viajes",
    "Widget Hogar con el día del grupo",
    "Días de rutina en una línea y tabs redondas"
  ]
} as const;

/** Disponibilidad del APK de Nido (env, URL publicada o archivo en public/downloads). */
export function getNidoApk(): ApkAvailability {
  return resolveApk(
    nidoRelease.apkPath,
    process.env.NEXT_PUBLIC_NIDO_APK_URL ?? nidoRelease.publishedApkUrl
  );
}
