import Image from "next/image";
import type { ProductTheme } from "../lib/products";
import "../styles/product-preview.css";

/** Muestra el arte de cada producto sin confundirlo con una interfaz de la aplicación. */
export function ProductVisual({ productId, compact = false }: { productId: ProductTheme; compact?: boolean }) {
  if (productId === "careme") return null;
  const nido = productId === "nido";
  return (
    <figure className={`project-visual${compact ? " project-visual--compact" : ""}`}>
      <Image
        src={nido ? "/productos/nido/hogar-conceptual.webp" : "/productos/escaparg/el-experimento-portada.webp"}
        alt={nido ? "Ilustración conceptual de Nido: un hogar compartido con espacios para convivir y para uno mismo." : "Arte promocional de El Experimento: la cápsula X-17 en un laboratorio iluminado."}
        width={1440}
        height={810}
        sizes={compact ? "(max-width: 700px) 100vw, 550px" : "(max-width: 900px) 100vw, 1120px"}
      />
      <figcaption>{nido ? "Nido · Arte conceptual" : "El Experimento · Arte promocional original"}</figcaption>
    </figure>
  );
}
