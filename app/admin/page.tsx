import Link from "next/link";
import { AdminBars } from "../../components/admin/AdminBars";
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
  type ProductKey,
  type SearchParams
} from "../../lib/admin";
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
            Indicadores de CareMe y Nido a partir de las APKs publicadas. Ventana de{" "}
            {selectedDays} días · {range}.
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
            stat={`${careme.summary.registeredUsers} usuarios · ${careme.summary.activeUsers} activos`}
            detail={
              careme.summary.registeredUsers > 0
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
            stat={`${nido.summary.registeredUsers} usuarios · ${nido.summary.households} hogares`}
            detail={
              nido.summary.households > 0
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
              {range} · {apkPublishedLabel(caremeApk.available)} · {caremeVersion}
            </p>

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
                  }
                ]}
              />
            </AdminSection>

            <AdminSection title="Funnel de activación" kicker="Del alta al resumen semanal">
              <AdminFunnel
                label="Funnel CareMe"
                steps={[
                  {
                    label: "Altas",
                    value: careme.summary.funnel.signup,
                    hint: "Usuarios nuevos en la ventana."
                  },
                  {
                    label: "Future You",
                    value: careme.summary.funnel.futureSelfSaved,
                    conversion: careme.summary.funnel.conversionSignupToFutureSelf,
                    hint: "De alta a perfil Future You."
                  },
                  {
                    label: "Primer check-in",
                    value: careme.summary.funnel.firstCheckin,
                    conversion: careme.summary.funnel.conversionFutureSelfToCheckin,
                    hint: "De Future You a check-in."
                  },
                  {
                    label: "Resumen semanal",
                    value: careme.summary.funnel.weeklyOpened,
                    conversion: careme.summary.funnel.conversionCheckinToWeekly,
                    hint: "De check-in a mirar la semana."
                  }
                ]}
              />
            </AdminSection>

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
              {range} · {apkPublishedLabel(nidoApk.available)} · {nidoVersion}
            </p>

            <AdminSection title="Indicadores" kicker="Nido">
              <AdminKpis
                label="KPIs Nido"
                items={[
                  {
                    label: "Usuarios registrados",
                    value: nido.summary.registeredUsers,
                    hint: "Cuentas totales en la API."
                  },
                  {
                    label: "Altas en la ventana",
                    value: nido.summary.registeredUsersInRange,
                    hint: "Registros nuevos en estos días."
                  },
                  {
                    label: "Hogares",
                    value: nido.summary.households,
                    hint: "Casas creadas."
                  },
                  {
                    label: "Miembros activos",
                    value: nido.summary.activeMemberships,
                    hint: "Personas dentro de un hogar."
                  }
                ]}
              />
            </AdminSection>

            <AdminSection title="Actividad de módulos" kicker="Operación del hogar">
              <AdminBars
                label="Módulos Nido"
                empty="Aún no hay actividad de módulos."
                items={[
                  {
                    label: "Invitaciones",
                    value: nido.summary.invitations,
                    hint: "Invites creados (todos los estados).",
                    accent: "#4F8F6E"
                  },
                  {
                    label: "Gastos",
                    value: nido.summary.expenses,
                    hint: "Egresos mensuales cargados.",
                    accent: "#C9A227"
                  },
                  {
                    label: "Rutinas",
                    value: nido.summary.routines,
                    hint: "Tareas semanales.",
                    accent: "#4A7FB5"
                  },
                  {
                    label: "Listas de compras",
                    value: nido.summary.shoppingLists,
                    hint: "Carritos compartidos.",
                    accent: "#C45C4A"
                  }
                ]}
              />
            </AdminSection>
          </div>
        )}
      </main>
    </div>
  );
}
