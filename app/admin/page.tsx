import Link from "next/link";
import {
  careMeEventLabel,
  fetchApiHealth,
  firstParam,
  getCareMeSummary,
  getNidoSummary,
  isLaunchEmpty,
  publishedApkVersion,
  type ProductKey,
  type SearchParams
} from "../../lib/admin";

const PERIOD_OPTIONS = [7, 14, 30];

/** Dashboard admin multi-producto para el lanzamiento de APKs. */
export default async function AdminPage({
  searchParams
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const product = (firstParam(params?.product) as ProductKey | undefined) ?? "careme";
  const selectedDays = firstParam(params?.days) ?? "7";
  const caremeUrl = process.env.CAREME_API_URL ?? "http://localhost:3001";
  const nidoUrl = process.env.NIDO_API_URL ?? "http://localhost:3002";

  const [careme, nido, caremeHealth, nidoHealth] = await Promise.all([
    getCareMeSummary(params),
    getNidoSummary(params),
    fetchApiHealth(caremeUrl, "CareMe API"),
    fetchApiHealth(nidoUrl, "Nido API")
  ]);

  return (
    <div className="admin-shell">
      <div className="admin-top">
        <div>
          <span className="eyebrow">Panel interno</span>
          <h1 className="admin-title">Uso de las apps</h1>
          <p className="admin-lead">
            Métricas de CareMe y Nido cuando la gente instala las APKs. Ventana de {selectedDays}{" "}
            días.
          </p>
        </div>
        <form method="post" action="/admin/logout">
          <button type="submit" className="btn btn-ghost">
            Cerrar sesión
          </button>
        </form>
      </div>

      <section className="admin-overview" aria-label="Resumen de productos">
        <article className="admin-overview__card">
          <div className="admin-overview__head">
            <strong>CareMe</strong>
            <span className={`admin-status ${caremeHealth.ok ? "is-ok" : "is-down"}`}>
              {caremeHealth.ok ? "API ok" : "API caído"}
            </span>
          </div>
          <p className="admin-overview__meta">APK {publishedApkVersion("careme")}</p>
          <p className="admin-overview__stat">
            {careme.summary.registeredUsers} usuarios · {careme.summary.activeUsers} activos
          </p>
        </article>
        <article className="admin-overview__card">
          <div className="admin-overview__head">
            <strong>Nido</strong>
            <span className={`admin-status ${nidoHealth.ok ? "is-ok" : "is-down"}`}>
              {nidoHealth.ok ? "API ok" : "API caído"}
            </span>
          </div>
          <p className="admin-overview__meta">APK {publishedApkVersion("nido")}</p>
          <p className="admin-overview__stat">
            {nido.summary.registeredUsers} usuarios · {nido.summary.households} hogares
          </p>
        </article>
      </section>

      <div className="admin-top admin-top--tabs">
        <div className="admin-tabs">
          <Link
            href={`/admin?product=careme&days=${selectedDays}`}
            className={`admin-tab ${product === "careme" ? "is-active" : ""}`}
          >
            CareMe
          </Link>
          <Link
            href={`/admin?product=nido&days=${selectedDays}`}
            className={`admin-tab ${product === "nido" ? "is-active" : ""}`}
          >
            Nido
          </Link>
        </div>
        <div className="admin-filters">
          {PERIOD_OPTIONS.map((period) => (
            <Link
              key={period}
              href={`/admin?product=${product}&days=${period}`}
              className={`admin-tab ${selectedDays === String(period) ? "is-active" : ""}`}
            >
              Últimos {period} días
            </Link>
          ))}
        </div>
      </div>

      {product === "careme" ? (
        <>
          {!careme.ok ? (
            <div className="admin-empty">
              No se pudo hablar con la API de CareMe. Revisá CAREME_API_URL, que Nest esté arriba y
              que CAREME_ADMIN_ANALYTICS_KEY coincida con ADMIN_ANALYTICS_KEY de la API.
            </div>
          ) : null}

          {isLaunchEmpty(careme.ok, careme.summary.registeredUsers, careme.summary.totalEvents) ? (
            <div className="admin-empty">
              Todavía no hay uso. Cuando la gente instale el APK de CareMe, acá van a aparecer
              registros y el funnel de activación.
            </div>
          ) : null}

          <p className="admin-section-title">
            Ventana: {new Date(careme.summary.from).toLocaleDateString("es-AR")} –{" "}
            {new Date(careme.summary.to).toLocaleDateString("es-AR")} · APK{" "}
            {publishedApkVersion("careme")}
          </p>

          <section className="admin-metrics" aria-label="KPIs CareMe">
            <article className="admin-metric">
              <span>Usuarios registrados</span>
              <strong>{careme.summary.registeredUsers}</strong>
              <small>Cuentas totales en la API.</small>
            </article>
            <article className="admin-metric">
              <span>Usuarios activos</span>
              <strong>{careme.summary.activeUsers}</strong>
              <small>Personas con eventos en la ventana.</small>
            </article>
            <article className="admin-metric">
              <span>Altas en la ventana</span>
              <strong>{careme.summary.registeredUsersInRange}</strong>
              <small>Registros nuevos en estos días.</small>
            </article>
            <article className="admin-metric">
              <span>Eventos</span>
              <strong>{careme.summary.totalEvents}</strong>
              <small>Check-ins, Future You, semanal, etc.</small>
            </article>
          </section>

          <p className="admin-section-title">Funnel de activación</p>
          <section className="admin-metrics" aria-label="Funnel CareMe">
            <article className="admin-metric">
              <span>Altas</span>
              <strong>{careme.summary.funnel.signup}</strong>
              <small>Usuarios nuevos en la ventana.</small>
            </article>
            <article className="admin-metric">
              <span>Future You</span>
              <strong>
                {careme.summary.funnel.futureSelfSaved} (
                {careme.summary.funnel.conversionSignupToFutureSelf}%)
              </strong>
              <small>De alta a perfil Future You.</small>
            </article>
            <article className="admin-metric">
              <span>Primer check-in</span>
              <strong>
                {careme.summary.funnel.firstCheckin} (
                {careme.summary.funnel.conversionFutureSelfToCheckin}%)
              </strong>
              <small>De Future You a check-in.</small>
            </article>
            <article className="admin-metric">
              <span>Resumen semanal</span>
              <strong>
                {careme.summary.funnel.weeklyOpened} (
                {careme.summary.funnel.conversionCheckinToWeekly}%)
              </strong>
              <small>De check-in a mirar la semana.</small>
            </article>
          </section>

          <p className="admin-section-title">Eventos más frecuentes</p>
          <section className="admin-events">
            {careme.summary.eventsByName.length === 0 ? (
              <div className="admin-empty">Aún no hay eventos registrados.</div>
            ) : (
              careme.summary.eventsByName.map((item) => (
                <article key={item.name} className="admin-event">
                  <strong>{careMeEventLabel(item.name)}</strong>
                  <span className="admin-event__count">{item.count}</span>
                </article>
              ))
            )}
          </section>
        </>
      ) : (
        <>
          {!nido.ok ? (
            <div className="admin-empty">
              No se pudo hablar con la API de Nido. Revisá NIDO_API_URL, que Nest esté arriba y que
              NIDO_ADMIN_ANALYTICS_KEY coincida con ADMIN_ANALYTICS_KEY de Nido.
            </div>
          ) : null}

          {isLaunchEmpty(nido.ok, nido.summary.registeredUsers, nido.summary.households) ? (
            <div className="admin-empty">
              Todavía no hay hogares. Cuando la gente instale el APK de Nido, acá van a aparecer
              usuarios, hogares y actividad de los módulos.
            </div>
          ) : null}

          <p className="admin-section-title">
            Ventana: {new Date(nido.summary.from).toLocaleDateString("es-AR")} –{" "}
            {new Date(nido.summary.to).toLocaleDateString("es-AR")} · APK{" "}
            {publishedApkVersion("nido")}
          </p>

          <section className="admin-metrics" aria-label="KPIs Nido">
            <article className="admin-metric">
              <span>Usuarios registrados</span>
              <strong>{nido.summary.registeredUsers}</strong>
              <small>Cuentas totales en la API.</small>
            </article>
            <article className="admin-metric">
              <span>Altas en la ventana</span>
              <strong>{nido.summary.registeredUsersInRange}</strong>
              <small>Registros nuevos en estos días.</small>
            </article>
            <article className="admin-metric">
              <span>Hogares</span>
              <strong>{nido.summary.households}</strong>
              <small>Casas creadas.</small>
            </article>
            <article className="admin-metric">
              <span>Miembros activos</span>
              <strong>{nido.summary.activeMemberships}</strong>
              <small>Personas dentro de un hogar.</small>
            </article>
          </section>

          <p className="admin-section-title">Actividad de módulos</p>
          <section className="admin-metrics" aria-label="Módulos Nido">
            <article className="admin-metric">
              <span>Invitaciones</span>
              <strong>{nido.summary.invitations}</strong>
              <small>Invites creados (todos los estados).</small>
            </article>
            <article className="admin-metric">
              <span>Gastos</span>
              <strong>{nido.summary.expenses}</strong>
              <small>Egresos mensuales cargados.</small>
            </article>
            <article className="admin-metric">
              <span>Rutinas</span>
              <strong>{nido.summary.routines}</strong>
              <small>Tareas semanales.</small>
            </article>
            <article className="admin-metric">
              <span>Listas de compras</span>
              <strong>{nido.summary.shoppingLists}</strong>
              <small>Carritos compartidos.</small>
            </article>
          </section>
        </>
      )}
    </div>
  );
}
