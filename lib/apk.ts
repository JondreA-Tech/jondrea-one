import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export type ApkFileMeta = {
  sizeBytes: number;
  sha256: string;
  modifiedAt: string;
};

export type ApkAvailability = {
  available: boolean;
  href: string | null;
  download: boolean;
  file?: ApkFileMeta;
};

const apkMetaCache = new Map<string, { stamp: string; file: ApkFileMeta }>();

export const apkInstallSteps = [
  "Descargar el archivo en el teléfono Android.",
  "Si el sistema lo solicita, permitir la instalación desde esta fuente (Ajustes → Seguridad).",
  "Abrir el APK e instalar la aplicación.",
  "Play Protect puede mostrar un aviso: es habitual fuera de Play Store. Continuar con la instalación si el archivo se descargó desde este sitio."
] as const;

/** Ruta absoluta de un archivo público. */
function publicDiskPath(publicPath: string) {
  const relative = publicPath.replace(/^\//, "").replaceAll("\\", "/");
  return path.join(process.cwd(), "public", ...relative.split("/"));
}

/** Peso, fecha y SHA-256 de un APK en disco, con caché por tamaño y mtime. */
function readApkFileMeta(diskPath: string): ApkFileMeta {
  const info = statSync(diskPath);
  const stamp = `${info.size}:${info.mtimeMs}`;
  const cached = apkMetaCache.get(diskPath);
  if (cached && cached.stamp === stamp) {
    return cached.file;
  }
  const sha256 = createHash("sha256").update(readFileSync(diskPath)).digest("hex");
  const file = {
    sizeBytes: info.size,
    sha256,
    modifiedAt: info.mtime.toISOString()
  };
  apkMetaCache.set(diskPath, { stamp, file });
  return file;
}

/** Formatea el peso del APK para la ficha. */
export function formatApkSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Fecha de archivo en español (Argentina). */
export function formatApkDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR");
}

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
  const diskPath = publicDiskPath(publicPath);
  if (existsSync(diskPath)) {
    return {
      available: true,
      href: publicPath,
      download: true,
      file: readApkFileMeta(diskPath)
    };
  }
  return { available: false, href: null, download: false };
}
