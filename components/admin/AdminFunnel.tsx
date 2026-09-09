import { barPercent } from "../../lib/admin";

export type AdminFunnelStep = {
  label: string;
  value: number;
  conversion?: number;
  hint: string;
};

type AdminFunnelProps = {
  steps: AdminFunnelStep[];
  label: string;
};

/** Funnel de activación con barras relativas al primer paso. */
export function AdminFunnel({ steps, label }: AdminFunnelProps) {
  const base = Math.max(steps[0]?.value ?? 0, 1);

  return (
    <section className="admin-funnel" aria-label={label}>
      {steps.map((step, index) => (
        <article key={step.label} className="admin-funnel__step">
          <div className="admin-funnel__top">
            <span className="admin-funnel__index">{index + 1}</span>
            <span className="admin-funnel__label">{step.label}</span>
            {step.conversion != null ? (
              <em className="admin-funnel__conv">{step.conversion}%</em>
            ) : (
              <em className="admin-funnel__conv is-base">Inicio</em>
            )}
          </div>
          <strong className="admin-funnel__value">{step.value}</strong>
          <div className="admin-funnel__track" aria-hidden>
            <span
              className="admin-funnel__fill"
              style={{ width: `${barPercent(step.value, base)}%` }}
            />
          </div>
          <small>{step.hint}</small>
        </article>
      ))}
    </section>
  );
}
