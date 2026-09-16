import Link from "next/link";
import { AdminBars } from "../../components/admin/AdminBars";
import { AdminDays, formatDayLabel } from "../../components/admin/AdminDays";
import { AdminFunnel } from "../../components/admin/AdminFunnel";
import { AdminKpis } from "../../components/admin/AdminKpis";
import { AdminNotice } from "../../components/admin/AdminNotice";
import { AdminProductCard } from "../../components/admin/AdminProductCard";
import { AdminSection } from "../../components/admin/AdminSection";
import { JondreaLogo } from "../../components/JondreaLogo";
import {
  apkPublishedLabel,
  careMeEventLabel,
  fetchApiHealth,
  firstParam,
  formatAdminRange,
  getCareMeSummary,
  getNidoSummary,
  isLaunchEmpty,
  publishedApkVersion,
  ratioPercent,
  resolveCareMeFunnel,
  type ProductKey,
  type SearchParams
} from "../../lib/admin";
import { downloadCountLabel, readDownloadCounts } from "../../lib/downloadCounts";
import { getCareMeApk } from "../../lib/caremeRelease";
import { getNidoApk } from "../../lib/nidoRelease";
import { getProduct } from "../../lib/products";

const PERIOD_OPTIONS = [7, 14, 30];

/** Dashboard admin multi-producto para el seguimiento de CareMe y Nido. */
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
  const caremeProduct = getProduct("careme");
  const nidoProduct = getProduct("nido");
  const caremeApk = getCareMeApk();
  const nidoApk = getNidoApk();
  const caremeVersion = publishedApkVersion("careme");
  const nidoVersion = publishedApkVersion("nido");

  const [careme, nido, caremeHealth, nidoHealth] = await Promise.all([
    getCareMeSummary(params),
    getNidoSummary(params),
    fetchApiHealth(caremeUrl, "CareMe API"),
    fetchApiHealth(nidoUrl, "Nido API")
  ]);

  const range =
    product === "careme"
      ? formatAdminRange(careme.summary.from, careme.summary.to)
      : formatAdminRange(nido.summary.from, nido.summary.to);
  const caremeActiveRate = ratioPercent(careme.summary.activeUsers, careme.summary.registeredUsers);
  const nidoMembersPerHome =
    nido.summary.households > 0
      ? (nido.summary.activeMemberships / nido.summary.households).toFixed(1)
      : "0";
  const caremeFunnel = resolveCareMeFunnel(careme.summary);
  const downloads = readDownloadCounts();
  const nidoHouseholdsInRange = nido.summary.householdsInRange ?? 0;
  const nidoInvitesInRange = nido.summary.invitationsInRange ?? nido.summary.invitations;

  return (
    <div className={`admin-app admin-app--${product}`}>
      <div className="admin-aurora" aria-hidden="true">
        <span className="admin-orb admin-orb--a" />
        <span className="admin-orb admin-orb--b" />
      </div>
      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="admin-header__brand">
            <Link href="/admin" className="admin-header__home">
              <JondreaLogo size="sm" />
            </Link>
            <span className="admin-header__badge">Panel</span>
          </div>
          <div className="admin-header__tools">
            <div className="admin-seg" role="navigation" aria-label="Ventana">
              {PERIOD_OPTIONS.map((period) => (
                <Link
                  key={period}
                  href={`/admin?product=${product}&days=${period}`}
                  className={`admin-seg__item ${selectedDays === String(period) ? "is-active" : ""}`}
                  aria-current={selectedDays === String(period) ? "page" : undefined}
                >
                  {period} días
                </Link>
              ))}
            </div>
            <Link href="/" className="admin-header__link">
              Sitio
            </Link>
            <form method="post" action="/admin/logout">
              <button type="submit" className="btn btn-ghost admin-header__logout">
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-hero">
          <p className="admin-kicker">Panel interno</p>
          <h1>Uso de las aplicaciones</h1>
          <p className="admin-lead">
            {product === "careme"
              ? `CareMe: usuarios, eventos y funnel en los últimos ${selectedDays} días · ${range}.`
              : `Nido: altas y módulos en los últimos ${selectedDays} días · ${range}. Hogares y miembros del encabezado son el total actual.`}
          </p>
        </section>

        <section className="admin-switch" aria-label="Productos">
          <AdminProductCard
            href={`/admin?product=careme&days=${selectedDays}`}
            active={product === "careme"}
            theme="careme"
            name="CareMe"
            category={caremeProduct?.category ?? "Bienestar personal"}
            logoSrc={caremeProduct?.logoSrc}
            apiOk={caremeHealth.ok}
            apkAvailable={caremeApk.available}
            apkVersion={caremeVersion}
            stat={
              careme.ok
                ? `${careme.summary.registeredUsers} usuarios · ${careme.summary.activeUsers} activos`
                : "Sin datos de analytics"
            }
            detail={
              !careme.ok
                ? "No se pudo leer el summary."
                : careme.summary.registeredUsers > 0
                  ? `${caremeActiveRate}% de las cuentas con eventos en la ventana.`
                  : "Sin cuentas registradas todavía."
            }
          />
          <AdminProductCard
            href={`/admin?product=nido&days=${selectedDays}`}
            active={product === "nido"}
            theme="nido"
            name="Nido"
            category={nidoProduct?.category ?? "Gestión del hogar"}
            logoSrc={nidoProduct?.logoSrc}
            apiOk={nidoHealth.ok}
            apkAvailable={nidoApk.available}
            apkVersion={nidoVersion}
            stat={
              nido.ok
                ? `${nido.summary.registeredUsers} usuarios · ${nido.summary.households} hogares`
                : "Sin datos de analytics"
            }
            detail={
              !nido.ok
                ? "No se pudo leer el summary."
                : nido.summary.households > 0
                  ? `${nidoMembersPerHome} miembros activos por hogar.`
                  : "Sin hogares creados todavía."
            }
          />
        </section>

        {product === "careme" ? (
          <div className="admin-board admin-board--careme">
            {!careme.ok ? (
              <AdminNotice
                tone="error"
                title="No se pudo conectar con CareMe"
                body="Verifique CAREME_API_URL, que el servicio esté en ejecución y que CAREME_ADMIN_ANALYTICS_KEY coincida con ADMIN_ANALYTICS_KEY de la API."
              />
            ) : null}

            {isLaunchEmpty(careme.ok, careme.summary.registeredUsers, careme.summary.totalEvents) ? (
              <AdminNotice
                tone="empty"
                title="Todavía no hay actividad"
                body="Cuando se instale la APK de CareMe, aparecerán registros y el funnel de activación."
              />
            ) : null}

            <p className="admin-window">
              {careme.ok ? `${range} · ` : null}
              {apkPublishedLabel(caremeApk.available)} · {caremeVersion}
              {` · ${downloadCountLabel(downloads.careme)}`}
            </p>

            {careme.ok ? (
              <>
                <AdminSection title="Indicadores" kicker="CareMe">
                  <AdminKpis
                    label="KPIs CareMe"
                    items={[
                      {
                        label: "Usuarios registrados",
                        value: careme.summary.registeredUsers,
                        hint: "Cuentas totales en la API."
                      },
                      {
                        label: "Usuarios activos",
                        value: careme.summary.activeUsers,
                        hint: "Personas con eventos en la ventana."
                      },
                      {
                        label: "Altas en la ventana",
                        value: careme.summary.registeredUsersInRange,
                        hint: "Registros nuevos en estos días."
                      },
                      {
                        label: "Eventos",
                        value: careme.summary.totalEvents,
                        hint: "Check-ins, Future You, resumen semanal."
                      },
                      {
                        label: "Descargas del sitio",
                        value: downloads.careme,
                        hint: "Clics de descarga de la APK en este sitio."
                      }
                    ]}
                  />
                </AdminSection>

                <AdminSection
                  title="Funnel de activación"
                  kicker={
                    caremeFunnel.isCohort
                      ? "Cohorte: altas de la ventana y los pasos que completaron después, en orden."
                      : "Personas distintas por evento en la ventana (no es una cohorte)."
                  }
                >
                  <AdminFunnel
                    label="Funnel CareMe"
                    steps={[
                      {
                        label: "Altas",
                        value: caremeFunnel.slice.signup,
                        hint: "Usuarios nuevos en la ventana."
                      },
                      {
                        label: "Future You",
                        value: caremeFunnel.slice.futureSelfSaved,
                        conversion: caremeFunnel.slice.conversionSignupToFutureSelf,
                        hint: caremeFunnel.isCohort
                          ? "De esas altas, quién guardó Future You."
                          : "Quién guardó Future You en la ventana."
                      },
                      {
                        label: "Check-in",
                        value: caremeFunnel.slice.firstCheckin,
                        conversion: caremeFunnel.slice.conversionFutureSelfToCheckin,
                        hint: caremeFunnel.isCohort
                          ? "De quienes tienen Future You, quién hizo un check-in."
                          : "Quién creó un check-in en la ventana."
                      },
                      {
                        label: "Resumen semanal",
                        value: caremeFunnel.slice.weeklyOpened,
                        conversion: caremeFunnel.slice.conversionCheckinToWeekly,
                        hint: caremeFunnel.isCohort
                          ? "De quienes hicieron check-in, quién abrió la semana."
                          : "Quién abrió la semana en la ventana."
                      }
                    ]}
                  />
                </AdminSection>

                {careme.summary.byDay && careme.summary.byDay.length > 0 ? (
                  <AdminSection title="Actividad por día" kicker="Eventos en la ventana">
                    <AdminDays
                      label="Serie diaria CareMe"
                      empty="Sin actividad diaria."
                      legend={[
                        { key: "events", label: "Eventos" },
                        { key: "signups", label: "Altas" }
                      ]}
                      items={careme.summary.byDay.map((point) => ({
                        date: point.date,
                        label: formatDayLabel(point.date),
                        values: [
                          { key: "events", value: point.events },
                          { key: "signups", value: point.signups }
                        ]
                      }))}
                    />
                  </AdminSection>
                ) : null}

                <AdminSection title="Eventos más frecuentes" kicker="Ventana seleccionada">
                  <AdminBars
                    label="Eventos CareMe"
                    empty="Aún no hay eventos registrados en esta ventana."
                    items={careme.summary.eventsByName.map((item) => ({
                      label: careMeEventLabel(item.name),
                      value: item.count
                    }))}
                  />
                </AdminSection>
              </>
            ) : null}
          </div>
        ) : (
          <div className="admin-board admin-board--nido">
            {!nido.ok ? (
              <AdminNotice
                tone="error"
                title="No se pudo conectar con Nido"
                body="Verifique NIDO_API_URL, que el servicio esté en ejecución y que NIDO_ADMIN_ANALYTICS_KEY coincida con ADMIN_ANALYTICS_KEY de Nido."
              />
            ) : null}

            {isLaunchEmpty(nido.ok, nido.summary.registeredUsers, nido.summary.households) ? (
              <AdminNotice
                tone="empty"
                title="Todavía no hay hogares"
                body="Cuando se instale la APK de Nido, aparecerán usuarios, hogares y actividad de los módulos."
              />
            ) : null}

            <p className="admin-window">
              {nido.ok ? `${range} · ` : null}
              {apkPublishedLabel(nidoApk.available)} · {nidoVersion}
              {` · ${downloadCountLabel(downloads.nido)}`}
            </p>

            {nido.ok ? (
              <>
                <AdminSection title="Indicadores" kicker="Nido">
                  <AdminKpis
                    label="KPIs Nido"
                    items={[
                      {
                        label: "Usuarios registrados",
                        value: nido.summary.registeredUsers,
                        hint: "Total actual de cuentas."
                      },
                      {
                        label: "Altas en la ventana",
                        value: nido.summary.registeredUsersInRange,
                        hint: "Registros nuevos en estos días."
                      },
                      {
                        label: "Hogares",
                        value: nido.summary.households,
                        hint:
                          nido.summary.householdsInRange != null
                            ? `Total actual. ${nido.summary.householdsInRange} creados en la ventana.`
                            : "Total actual, sin filtrar por la ventana."
                      },
                      {
                        label: "Miembros activos",
                        value: nido.summary.activeMemberships,
                        hint: "Total actual de personas en un hogar."
                      },
                      {
                        label: "Descargas del sitio",
                        value: downloads.nido,
                        hint: "Clics de descarga de la APK en este sitio."
                      }
                    ]}
                  />
                </AdminSection>

                <AdminSection
                  title="Altas de la ventana"
                  kicker="Conteos de la ventana, no una cohorte secuencial."
                >
                  <AdminFunnel
                    label="Recorrido Nido"
                    steps={[
                      {
                        label: "Altas",
                        value: nido.summary.registeredUsersInRange,
                        hint: "Usuarios nuevos en estos días."
                      },
                      {
                        label: "Hogares",
                        value: nidoHouseholdsInRange,
                        conversion: ratioPercent(
                          nidoHouseholdsInRange,
                          nido.summary.registeredUsersInRange
                        ),
                        hint: "Hogares creados en la misma ventana."
                      },
                      {
                        label: "Invitaciones",
                        value: nidoInvitesInRange,
                        conversion: ratioPercent(nidoInvitesInRange, nidoHouseholdsInRange),
                        hint: "Invitaciones creadas en la ventana."
                      }
                    ]}
                  />
                </AdminSection>

                <AdminSection
                  title="Actividad de módulos"
                  kicker="En la ventana · el total aparece en la pista"
                >
                  <AdminBars
                    label="Módulos Nido"
                    empty="Aún no hay actividad de módulos."
                    items={[
                      {
                        label: "Invitaciones",
                        value: nido.summary.invitationsInRange ?? nido.summary.invitations,
                        hint: `Total: ${nido.summary.invitations}.`,
                        accent: "#4F8F6E"
                      },
                      {
                        label: "Gastos",
                        value: nido.summary.expensesInRange ?? nido.summary.expenses,
                        hint: `Total: ${nido.summary.expenses}.`,
                        accent: "#C9A227"
                      },
                      {
                        label: "Rutinas",
                        value: nido.summary.routinesInRange ?? nido.summary.routines,
                        hint: `Total: ${nido.summary.routines}.`,
                        accent: "#4A7FB5"
                      },
                      {
                        label: "Listas de compras",
                        value: nido.summary.shoppingListsInRange ?? nido.summary.shoppingLists,
                        hint: `Total: ${nido.summary.shoppingLists}.`,
                        accent: "#C45C4A"
                      },
                      {
                        label: "Viajes",
                        value: nido.summary.tripsInRange ?? nido.summary.trips ?? 0,
                        hint: `Total: ${nido.summary.trips ?? 0}.`,
                        accent: "#6B5E52"
                      }
                    ]}
                  />
                </AdminSection>

                {nido.summary.byDay && nido.summary.byDay.length > 0 ? (
                  <AdminSection title="Altas por día" kicker="Cuentas y hogares creados">
                    <AdminDays
                      label="Serie diaria Nido"
                      empty="Sin altas diarias."
                      legend={[
                        { key: "signups", label: "Altas" },
                        { key: "households", label: "Hogares" }
                      ]}
                      items={nido.summary.byDay.map((point) => ({
                        date: point.date,
                        label: formatDayLabel(point.date),
                        values: [
                          { key: "signups", value: point.signups },
                          { key: "households", value: point.households }
                        ]
                      }))}
                    />
                  </AdminSection>
                ) : null}
              </>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
