import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { ProductKey } from "./admin";

export type DownloadCounts = Record<ProductKey, number>;

const STORE_PATH = path.join(process.cwd(), "data", "apk-downloads.json");

/** Conteos en cero cuando el archivo no existe o no se puede leer. */
function emptyCounts(): DownloadCounts {
  return { nido: 0 };
}

/** Lee las descargas registradas de las APKs en este sitio. */
export function readDownloadCounts(): DownloadCounts {
  try {
    if (!existsSync(STORE_PATH)) {
      return emptyCounts();
    }
    const parsed = JSON.parse(readFileSync(STORE_PATH, "utf8")) as Partial<DownloadCounts>;
    return {
      nido: Number(parsed.nido) || 0
    };
  } catch {
    return emptyCounts();
  }
}

/** Texto de conteo de descargas para el panel. */
export function downloadCountLabel(count: number) {
  return count === 1 ? "1 descarga en el sitio" : `${count} descargas en el sitio`;
}

/** Suma una descarga. Si el disco no es escribible (Vercel), no interrumpe la descarga. */
export function incrementDownloadCount(product: ProductKey): DownloadCounts {
  const next = readDownloadCounts();
  next[product] += 1;
  try {
    mkdirSync(path.dirname(STORE_PATH), { recursive: true });
    writeFileSync(STORE_PATH, `${JSON.stringify(next)}\n`, "utf8");
  } catch {
    return next;
  }
  return next;
}
