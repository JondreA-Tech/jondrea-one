import type { CSSProperties } from "react";
import { barPercent } from "../../lib/admin";

export type AdminBarItem = {
  label: string;
  value: number;
  hint?: string;
  accent?: string;
};

type AdminBarsProps = {
  items: AdminBarItem[];
  label: string;
  empty: string;
};

/** Lista de barras horizontales relativas al valor máximo. */
export function AdminBars({ items, label, empty }: AdminBarsProps) {
  const max = Math.max(...items.map((item) => item.value), 0);

  if (items.length === 0) {
    return <p className="admin-muted">{empty}</p>;
  }

  return (
    <section className="admin-bars" aria-label={label}>
      {items.map((item) => (
        <article
          key={item.label}
          className="admin-bar"
          style={item.accent ? ({ "--admin-bar-accent": item.accent } as CSSProperties) : undefined}
        >
          <div className="admin-bar__row">
            <strong>{item.label}</strong>
            <span>{item.value}</span>
          </div>
          <div className="admin-bar__track" aria-hidden>
            <span
              className="admin-bar__fill"
              style={{ width: `${barPercent(item.value, max)}%` }}
            />
          </div>
          {item.hint ? <small>{item.hint}</small> : null}
        </article>
      ))}
    </section>
  );
}
