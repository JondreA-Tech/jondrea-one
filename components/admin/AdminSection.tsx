import type { ReactNode } from "react";

type AdminSectionProps = {
  id: string;
  title: string;
  kicker?: string;
  children: ReactNode;
};

/** Bloque de contenido del dashboard con título de sección. */
export function AdminSection({ id, title, kicker, children }: AdminSectionProps) {
  return (
    <section id={id} className="admin-section admin-jump-target" tabIndex={-1} aria-labelledby={`${id}-titulo`}>
      <header className="admin-section__head">
        {kicker ? <p className="admin-kicker">{kicker}</p> : null}
        <h2 id={`${id}-titulo`}>{title}</h2>
      </header>
      {children}
      <a className="admin-summary__back" href="#resumen">↑ Volver al resumen</a>
    </section>
  );
}
