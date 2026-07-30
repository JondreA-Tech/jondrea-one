import Link from "next/link";

type SearchParams = Record<string, string | string[] | undefined>;

type Summary = {
  days: number;
  from: string;
  to: string;
  registeredUsers: number;
  registeredUsersInRange: number;
  totalEvents: number;
  activeUsers: number;
  eventsByName: Array<{ name: string; count: number }>;
  funnel: {
    signup: number;
    futureSelfSaved: number;
    firstCheckin: number;
    weeklyOpened: number;
    conversionSignupToFutureSelf: number;
    conversionFutureSelfToCheckin: number;
    conversionCheckinToWeekly: number;
  };
};

type ProductKey = "careme" | "casaos";

/** Primer valor de search param. */
function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/** Query string para el summary de CareMe. */
function buildSummaryQuery(searchParams?: SearchParams) {
  const params = new URLSearchParams();
  const days = firstParam(searchParams?.days) ?? "7";
  const from = firstParam(searchParams?.from);
  const to = firstParam(searchParams?.to);
  if (from && to) {
    params.set("from", from);
    params.set("to", to);
    return params.toString();
  }
  params.set("days", days);
  return params.toString();
}

/** Summary vacío cuando la API no responde. */
function emptySummary(searchParams?: SearchParams): Summary {
  const days = Number(firstParam(searchParams?.days) ?? 7);
  const now = new Date();
  const from = new Date(now);
  from.setDate(from.getDate() - Math.max(1, Number.isNaN(days) ? 7 : days));
  from.setHours(0, 0, 0, 0);
  now.setHours(23, 59, 59, 999);
  return {
    days: Number.isNaN(days) ? 7 : days,
    from: from.toISOString(),
    to: now.toISOString(),
    registeredUsers: 0,
    registeredUsersInRange: 0,
    totalEvents: 0,
    activeUsers: 0,
    eventsByName: [],
    funnel: {
      signup: 0,
      futureSelfSaved: 0,
      firstCheckin: 0,
      weeklyOpened: 0,
      conversionSignupToFutureSelf: 0,
      conversionFutureSelfToCheckin: 0,
      conversionCheckinToWeekly: 0
    }
  };
}

/** Obtiene el summary de analytics de CareMe (server-side + admin key). */
async function getCareMeSummary(searchParams?: SearchParams) {
  const apiBase = process.env.CAREME_API_URL ?? "http://localhost:3001";
  const adminKey = process.env.CAREME_ADMIN_ANALYTICS_KEY ?? "";
  const query = buildSummaryQuery(searchParams);
  try {
    const response = await fetch(`${apiBase}/v1/analytics/events/summary?${query}`, {
      cache: "no-store",
      headers: adminKey ? { "x-admin-key": adminKey } : {}
    });
    if (!response.ok) {
      return { summary: emptySummary(searchParams), ok: false as const };
    }
    return { summary: (await response.json()) as Summary, ok: true as const };
  } catch {
    return { summary: emptySummary(searchParams), ok: false as const };
  }
}

const PERIOD_OPTIONS = [7, 14, 30];

/** Dashboard admin multi-producto (CareMe activo, CasaOs placeholder). */
export default async function AdminPage({
  searchParams
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const product = (firstParam(params?.product) as ProductKey | undefined) ?? "careme";
  const selectedDays = firstParam(params?.days) ?? "7";
  const careme = product === "careme" ? await getCareMeSummary(params) : null;

  return (
    <div className="admin-shell">
      <div className="admin-top">
        <div>
          <span className="eyebrow">Panel interno</span>
          <h1 style={{ margin: "0.5rem 0 0.35rem", fontFamily: "var(--font-display)" }}>
            Métricas Jondrea
          </h1>
          <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
            CareMe + CasaOs. TurnosPets queda fuera (WordPress).
          </p>
        </div>
        <form method="post" action="/admin/logout">
          <button type="submit" className="btn btn-ghost">
            Cerrar sesión
          </button>
        </form>
      </div>

      <div className="admin-top" style={{ marginTop: 0 }}>
        <div className="admin-tabs">
          <Link
            href={`/admin?product=careme&days=${selectedDays}`}
            className={`admin-tab ${product === "careme" ? "is-active" : ""}`}
          >
            CareMe
          </Link>
          <Link
            href={`/admin?product=casaos&days=${selectedDays}`}
            className={`admin-tab ${product === "casaos" ? "is-active" : ""}`}
          >
            CasaOs
          </Link>
        </div>
        {product === "careme" ? (
          <div className="admin-filters">
            {PERIOD_OPTIONS.map((period) => (
              <Link
                key={period}
                href={`/admin?product=careme&days=${period}`}
                className={`admin-tab ${selectedDays === String(period) ? "is-active" : ""}`}
              >
                Últimos {period} días
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {product === "casaos" ? (
        <div className="admin-empty">
          CasaOs todavía no tiene API de analytics. Cuando el producto exista, este tab mostrará
          métricas equivalentes.
        </div>
      ) : null}

      {product === "careme" && careme ? (
        <>
          {!careme.ok ? (
            <div className="admin-empty">
              No se pudo hablar con la API de CareMe. Revisá `CAREME_API_URL`, que Nest esté arriba
              y que `CAREME_ADMIN_ANALYTICS_KEY` coincida con `ADMIN_ANALYTICS_KEY` de la API.
            </div>
          ) : null}

          <p className="admin-section-title">
            Ventana: {new Date(careme.summary.from).toLocaleDateString("es-AR")} –{" "}
            {new Date(careme.summary.to).toLocaleDateString("es-AR")}
          </p>

          <section className="admin-metrics" aria-label="KPIs CareMe">
            <article className="admin-metric">
              <span>Usuarios registrados</span>
              <strong>{careme.summary.registeredUsers}</strong>
            </article>
            <article className="admin-metric">
              <span>Usuarios activos</span>
              <strong>{careme.summary.activeUsers}</strong>
            </article>
            <article className="admin-metric">
              <span>Registros en ventana</span>
              <strong>{careme.summary.registeredUsersInRange}</strong>
            </article>
            <article className="admin-metric">
              <span>Eventos totales</span>
              <strong>{careme.summary.totalEvents}</strong>
            </article>
          </section>

          <p className="admin-section-title">Funnel de activación</p>
          <section className="admin-metrics" aria-label="Funnel CareMe">
            <article className="admin-metric">
              <span>Signup</span>
              <strong>{careme.summary.funnel.signup}</strong>
            </article>
            <article className="admin-metric">
              <span>Future Self</span>
              <strong>
                {careme.summary.funnel.futureSelfSaved} (
                {careme.summary.funnel.conversionSignupToFutureSelf}%)
              </strong>
            </article>
            <article className="admin-metric">
              <span>Primer check-in</span>
              <strong>
                {careme.summary.funnel.firstCheckin} (
                {careme.summary.funnel.conversionFutureSelfToCheckin}%)
              </strong>
            </article>
            <article className="admin-metric">
              <span>Weekly opened</span>
              <strong>
                {careme.summary.funnel.weeklyOpened} (
                {careme.summary.funnel.conversionCheckinToWeekly}%)
              </strong>
            </article>
          </section>

          <p className="admin-section-title">Eventos más frecuentes</p>
          <section className="admin-events">
            {careme.summary.eventsByName.length === 0 ? (
              <div className="admin-empty">Aún no hay eventos registrados.</div>
            ) : (
              careme.summary.eventsByName.map((item) => (
                <article key={item.name} className="admin-event">
                  <strong>{item.name}</strong>
                  <span style={{ color: "var(--color-text-muted)", marginLeft: 8 }}>
                    {item.count}
                  </span>
                </article>
              ))
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
