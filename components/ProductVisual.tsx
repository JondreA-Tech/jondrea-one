import Image from "next/image";
import type { ProductTheme } from "../lib/products";
import "../styles/product-preview.css";

/** Visual compartido entre el catálogo y las fichas, con su procedencia visible. */
export function ProductVisual({ productId, compact = false }: { productId: ProductTheme; compact?: boolean }) {
  if (productId === "nido") {
    return <figure className="project-visual project-visual--compact project-visual--nido">
      <Image src="/nido/screens/nido-hogar.png" alt="Pantalla Hogar de Nido con el día del grupo." width={360} height={780} sizes="360px" />
      <figcaption>Nido · Hogar compartido y espacio personal</figcaption>
    </figure>;
  }
  if (productId === "escaparg") {
    return (
      <figure className={`project-visual ${compact ? "project-visual--compact" : ""}`}>
        <Image src="/productos/escaparg/el-experimento.webp"
          alt="Captura real de El Experimento: dos personajes exploran el laboratorio."
          width={1280} height={720} sizes={compact ? "(max-width: 900px) 100vw, 360px" : "(max-width: 900px) 100vw, 1120px"} />
        <figcaption>El Experimento · Captura de una versión en desarrollo</figcaption>
      </figure>
    );
  }
  return (
    <figure className={`project-visual careme-concept ${compact ? "project-visual--compact" : ""}`}>
      <div className="careme-concept__canvas">
        <div className="careme-concept__goal">
          <span className="concept-eyebrow">Mi objetivo profesional</span>
          <strong>Dar mi próximo paso</strong>
          <span className="concept-detail">Un objetivo. Pequeñas acciones.</span>
        </div>
        <div className="careme-concept__mission">
          <span className="concept-eyebrow">Misiones de la semana</span>
          {compact ? <strong>Prepará · Ensayá · Revisá</strong> : <>
            <span><b aria-hidden="true">01</b> Preparar mi presentación</span>
            <span><b aria-hidden="true">02</b> Contar un proyecto</span>
            <span><b aria-hidden="true">03</b> Practicar una entrevista</span>
          </>}
        </div>
        <div className="careme-concept__practice">
          <span className="concept-eyebrow">Práctica con IA</span>
          <strong>{compact ? "Entrevista con IA" : "“Contame sobre vos”"}</strong>
          <span className="concept-wave" aria-hidden="true">▂ ▄ ▆ ▃ ▇ ▅ ▂ ▆ ▄ ▂</span>
          <span className="concept-detail">Ensayá · Revisá · Volvé a intentar</span>
        </div>
      </div>
      <figcaption>Vista conceptual · No representa una interfaz implementada</figcaption>
    </figure>
  );
}
