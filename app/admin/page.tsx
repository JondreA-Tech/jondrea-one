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
  fetchApiHealth,
  firstParam,
  formatAdminRange,
  getNidoSummary,
  isLaunchEmpty,
  publishedApkVersion,
  ratioPercent,
  type SearchParams
} from "../../lib/admin";
import { downloadCountLabel, readDownloadCounts } from "../../lib/downloadCounts";
import { getNidoApk } from "../../lib/nidoRelease";
import { getProduct } from "../../lib/products";

const PERIOD_OPTIONS = [7, 14, 30];

/** Dashboard admin de Nido. */
export default async function AdminPage({
  searchParams
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const selectedDays = firstParam(params?.days) ?? "7";
  const nidoUrl = process.env.NIDO_API_URL ?? "http://localhost:3002";
  const nidoProduct = getProduct("nido");
  const nidoApk = getNidoApk();
  const nidoVersion = publishedApkVersion("nido");

  const [nido, nidoHealth] = await Promise.all([
    getNidoSummary(params),
    fetchApiHealth(nidoUrl, "Nido API")
  ]);

  const range = formatAdminRange(nido.summary.from, nido.summary.to);
  const nidoMembersPerHome =
    nido.summary.households > 0
      ? (nido.summary.activeMemberships / nido.summary.households).toFixed(1)
      : "0";
  const downloads = readDownloadCounts();
  const nidoHouseholdsInRange = nido.summary.householdsInRange ?? 0;
  const nidoInvitesInRange = nido.summary.invitationsInRange ?? nido.summary.invitations;

  return (
    <div className="admin-app admin-app--nido">
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
                  href={`/admin?days=${period}`}
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
          <h1>Uso de Nido</h1>
          <p className="admin-lead">
            Nido: altas y módulos en los últimos {selectedDays} días · {range}. Hogares y miembros
            del encabezado son el total actual.
          </p>
        </section>

        <section className="admin-switch" aria-label="Producto">
          <AdminProductCard
            href={`/admin?days=${selectedDays}`}
            active
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
      </main>
    </div>
  );
}
