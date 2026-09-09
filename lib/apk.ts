import { existsSync } from "node:fs";
import path from "node:path";

export type ApkAvailability = {
  available: boolean;
  href: string | null;
  download: boolean;
};

export const apkInstallSteps = [
  "Descargar el archivo en el teléfono Android.",
  "Si el sistema lo solicita, permitir la instalación desde esta fuente (Ajustes → Seguridad).",
  "Abrir el APK e instalar la aplicación.",
  "Play Protect puede mostrar un aviso: es habitual fuera de Play Store. Continuar con la instalación si el archivo se descargó desde este sitio."
] as const;

/** Resuelve si el APK está publicado vía URL de entorno o archivo en public/. */
export function resolveApk(publicPath: string, envUrl?: string): ApkAvailability {
  const remote = envUrl?.trim();
  if (remote) {
    return {
      available: true,
      href: remote,
      download: !/^https?:\/\//i.test(remote)
    };
  }
  const relative = publicPath.replace(/^\//, "").replaceAll("\\", "/");
  const diskPath = path.join(process.cwd(), "public", ...relative.split("/"));
  if (existsSync(diskPath)) {
    return { available: true, href: publicPath, download: true };
  }
  return { available: false, href: null, download: false };
}
