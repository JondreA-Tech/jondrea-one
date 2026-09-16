export type AdminDayPoint = {
  date: string;
  label: string;
  values: Array<{ key: string; value: number }>;
};

type AdminDaysProps = {
  items: AdminDayPoint[];
  label: string;
  empty: string;
  legend?: Array<{ key: string; label: string }>;
};

/** Formatea YYYY-MM-DD a día/mes corto. */
export function formatDayLabel(isoDate: string) {
  const [, month, day] = isoDate.split("-");
  if (!month || !day) {
    return isoDate;
  }
  return `${Number(day)}/${Number(month)}`;
}

/** Barras diarias compactas para el panel. */
export function AdminDays({ items, label, empty, legend }: AdminDaysProps) {
  const max = Math.max(
    0,
    ...items.flatMap((item) => item.values.map((entry) => entry.value))
  );

  if (items.length === 0) {
    return <p className="admin-muted">{empty}</p>;
  }

  return (
    <section className="admin-days-wrap" aria-label={label}>
      {legend && legend.length > 0 ? (
        <ul className="admin-days__legend">
          {legend.map((entry) => (
            <li key={entry.key}>
              <i className={`admin-days__swatch admin-days__bar--${entry.key}`} />
              {entry.label}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="admin-days">
        {items.map((item) => (
          <article key={item.date} className="admin-days__col">
            <div className="admin-days__stack" aria-hidden>
              {item.values.map((entry) => (
                <span
                  key={entry.key}
                  className={`admin-days__bar admin-days__bar--${entry.key}`}
                  style={{
                    height: `${max > 0 ? Math.max(entry.value > 0 ? 8 : 0, Math.round((entry.value / max) * 100)) : 0}%`
                  }}
                  title={`${entry.key}: ${entry.value}`}
                />
              ))}
            </div>
            <strong>{item.values.reduce((sum, entry) => sum + entry.value, 0)}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
