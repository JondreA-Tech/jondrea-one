import type { CSSProperties } from "react";

export type AdminKpi = {
  label: string;
  value: string | number;
  hint: string;
  accent?: string;
};

type AdminKpisProps = {
  items: AdminKpi[];
  label: string;
};

/** Grilla de indicadores para el panel interno. */
export function AdminKpis({ items, label }: AdminKpisProps) {
  return (
    <section className="admin-kpis" aria-label={label}>
      {items.map((item) => (
        <article
          key={item.label}
          className="admin-kpi"
          style={item.accent ? ({ "--admin-kpi-accent": item.accent } as CSSProperties) : undefined}
        >
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <small>{item.hint}</small>
        </article>
      ))}
    </section>
  );
}
