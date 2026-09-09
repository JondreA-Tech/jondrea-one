import type { ReactNode } from "react";

type AdminSectionProps = {
  title: string;
  kicker?: string;
  children: ReactNode;
};

/** Bloque de contenido del dashboard con título de sección. */
export function AdminSection({ title, kicker, children }: AdminSectionProps) {
  return (
    <section className="admin-section">
      <header className="admin-section__head">
        {kicker ? <p className="admin-kicker">{kicker}</p> : null}
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}
