import Link from "next/link";
import { AdminBars } from "../../components/admin/AdminBars";
import { AdminDays, formatDayLabel } from "../../components/admin/AdminDays";
import { AdminKpis } from "../../components/admin/AdminKpis";
import { AdminNidoWake } from "../../components/admin/AdminNidoWake";
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
  nidoApiBase,
  publishedApkVersion,
  type SearchParams
} from "../../lib/admin";
import { downloadCountLabel, readDownloadCounts } from "../../lib/downloadCounts";
import { getNidoApk } from "../../lib/nidoRelease";
import { getProduct } from "../../lib/products";

const PERIOD_OPTIONS = [7, 14, 30];
const summaryNumber = new Intl.NumberFormat("es-AR");

/** Dashboard admin de Nido. */
export default async function AdminPage({
  searchParams
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const selectedDays = firstParam(params?.days) ?? "7";
  const nidoUrl = nidoApiBase();
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
  const nidoAcceptedInRange = nido.summary.invitationsAcceptedInRange ?? 0;
  const s = nido.summary;
  const dailyActivity = s.byDay ?? [];
  const summaryLinks = [
    { id: "estado", label: "Estado de Nido", detail: nidoHealth.ok ? "API en línea" : "API sin respuesta" },
    ...(nido.ok ? [
      { id: "indicadores", label: "Indicadores", detail: `${summaryNumber.format(s.registeredUsers)} usuarios en total` },
      { id: "altas", label: "Altas e invitaciones", detail: `${summaryNumber.format(s.registeredUsersInRange)} altas en el período` },
      { id: "hogar", label: "Hogar", detail: `${summaryNumber.format(s.households)} hogares en total` },
      { id: "adopcion", label: "Adopción", detail: s.productAdoption ? "Funciones y accesos" : "Datos no disponibles" },
      { id: "yo", label: "Yo", detail: `${summaryNumber.format(s.dailyCheckinsInRange ?? 0)} check-ins en el período` },
      ...(dailyActivity.length > 0 ? [{ id: "uso-diario", label: "Uso por día", detail: "Gráfico de actividad" }] : [])
    ] : [])
  ];

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
            {nido.ok ? <>Período consultado: {range}.</> : "No se pudieron cargar las métricas."}
          </p>
        </section>

        <nav id="resumen" className="admin-summary admin-jump-target" tabIndex={-1} aria-labelledby="admin-summary-title">
          <h2 id="admin-summary-title">Resumen</h2>
          <ul className="admin-summary__grid">
            {summaryLinks.map(({ id, label, detail }) => (
              <li key={id}>
                <a className="admin-summary__link" href={`#${id}`}>
                  <strong>{label}</strong>
                  <span>{detail}</span>
                  <span className="admin-summary__arrow" aria-hidden="true">↓</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="estado" className="admin-switch admin-jump-target" tabIndex={-1} aria-label="Estado de Nido">
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
                : "Métricas no disponibles"
            }
            detail={
              !nido.ok
                ? "No pudimos obtener los datos de uso."
                : nido.summary.households > 0
                  ? `${nidoMembersPerHome} miembros activos por hogar.`
                  : "Sin hogares creados todavía."
            }
          />
          <a className="admin-summary__back" href="#resumen">↑ Volver al resumen</a>
        </section>

        <div className="admin-board admin-board--nido">
          {!nidoHealth.ok ? <AdminNidoWake /> : null}

          {nidoHealth.ok && !nido.ok ? (
            <AdminNotice
              tone="error"
              title="Nido está en línea, pero no se pudieron leer las métricas"
              body="Revisá que NIDO_ADMIN_ANALYTICS_KEY coincida con ADMIN_ANALYTICS_KEY de la API."
            />
          ) : null}

          {isLaunchEmpty(nido.ok, nido.summary.registeredUsers, nido.summary.households) ? (
            <AdminNotice
              tone="empty"
              title="Todavía no hay hogares"
              body="Los indicadores se actualizan cuando las personas crean cuentas, hogares y usan los módulos de Nido."
            />
          ) : null}

          <p className="admin-window">
            {nido.ok ? `${range} · ` : null}
            {apkPublishedLabel(nidoApk.available)} · {nidoVersion}
            {` · ${downloadCountLabel(downloads.nido)}`}
          </p>

          {nido.ok ? (
            <>
              <AdminSection id="indicadores" title="Indicadores" kicker="Totales actuales">
                <AdminKpis
                  label="KPIs Nido"
                  items={[
                    {
                      label: "Usuarios",
                      value: s.registeredUsers,
                      hint: `${s.registeredUsersInRange} altas en el período.`
                    },
                    {
                      label: "Hogares",
                      value: s.households,
                      hint: `${nidoHouseholdsInRange} creados en el período.`
                    },
                    {
                      label: "Cuentas en hogares",
                      value: s.activeMemberships,
                      hint: `${s.localMembers ?? 0} miembros locales (${s.localMembersPet ?? 0} mascotas).`
                    },
                    {
                      label: "Activos en la ventana",
                      value: s.usersWithActivityInRange ?? 0,
                      hint: "Check-in, hábito, rutina o push. No es un login."
                    },
                    {
                      label: "Recurrentes",
                      value: s.returningUsersInRange ?? 0,
                      hint: "Cuentas anteriores a la ventana que volvieron a usarla."
                    },
                    {
                      label: "Ánimo hoy",
                      value: s.usersWithCheckinToday ?? 0,
                      hint: `${s.usersWithCheckinInRange ?? 0} personas con check-in en la ventana.`
                    },
                    {
                      label: "Push",
                      value: s.usersWithPushToken ?? 0,
                      hint: `${s.pushTokens ?? 0} tokens registrados.`
                    },
                    {
                      label: "Clics de APK en la web",
                      value: downloads.nido,
                      hint: "Histórico de clics. Las instalaciones de Play se consultan en Play Console."
                    }
                  ]}
                />
              </AdminSection>

              <AdminSection
                id="altas"
                title="Altas e invitaciones"
                kicker="Actividad del período seleccionado"
              >
                <AdminKpis
                  label="Altas e invitaciones del período"
                  items={[
                    {
                      label: "Altas",
                      value: s.registeredUsersInRange,
                      hint: "Usuarios nuevos en estos días."
                    },
                    {
                      label: "Hogares",
                      value: nidoHouseholdsInRange,
                      hint: "Hogares creados en la misma ventana."
                    },
                    {
                      label: "Invitaciones",
                      value: nidoInvitesInRange,
                      hint: "Invitaciones creadas."
                    },
                    {
                      label: "Aceptadas",
                      value: nidoAcceptedInRange,
                      hint: `${s.invitationsPending ?? 0} pendientes en total.`
                    }
                  ]}
                />
              </AdminSection>

              <AdminSection id="hogar" title="Hogar" kicker="Actividad del período con totales de referencia">
                <AdminBars
                  label="Módulos del hogar"
                  empty="Aún no hay actividad de hogar."
                  items={[
                    {
                      label: "Eventos",
                      value: s.memberEventsInRange ?? 0,
                      hint: `Total: ${s.memberEvents ?? 0}. Estudio: ${s.memberEventsSchoolInRange ?? 0} en ventana.`,
                      accent: "#4F8F6E"
                    },
                    {
                      label: "Medicación",
                      value: s.medicationsInRange ?? 0,
                      hint: `${s.medicationsActive ?? 0} activas · total ${s.medications ?? 0}.`,
                      accent: "#C46B3A"
                    },
                    {
                      label: "Gastos",
                      value: s.expensesInRange ?? s.expenses,
                      hint: `Total: ${s.expenses}.`,
                      accent: "#C9A227"
                    },
                    {
                      label: "Rutinas hechas",
                      value: s.routineCompletionsInRange ?? 0,
                      hint: `${s.routines} rutinas definidas.`,
                      accent: "#4A7FB5"
                    },
                    {
                      label: "Listas de compras",
                      value: s.shoppingListsInRange ?? s.shoppingLists,
                      hint: `Total: ${s.shoppingLists}.`,
                      accent: "#C45C4A"
                    },
                    {
                      label: "Viajes",
                      value: s.tripsInRange ?? s.trips ?? 0,
                      hint: `Total: ${s.trips ?? 0}.`,
                      accent: "#6B5E52"
                    },
                    {
                      label: "Vacunas",
                      value: s.petVaccinationsInRange ?? 0,
                      hint: `Total: ${s.petVaccinations ?? 0}.`,
                      accent: "#E8A0B5"
                    }
                  ]}
                />
              </AdminSection>

              <AdminSection id="adopcion" title="Adopción de Nido 1.0.0" kicker="Estado actual · independiente del filtro de fechas">
                {s.productAdoption ? (
                  <AdminKpis
                    label="Adopción y acceso Premium"
                    items={[
                      { label: "Rutinas asignadas", value: s.productAdoption.assignedRoutines, hint: "Rutinas con responsable activo." },
                      { label: "Productos categorizados", value: s.productAdoption.categorizedShoppingItems, hint: "Artículos guardados con categoría." },
                      { label: "Viajes con preparación", value: s.productAdoption.tripsWithPreparation, hint: "Viajes con al menos un pendiente registrado." },
                      { label: "Hogares con acceso de Play", value: s.productAdoption.householdsWithVerifiedPlayAccess, hint: "Vigencia verificada por el servidor. Las ventas se consultan en Play Console." },
                      { label: "Hogares con Premium otorgado", value: s.productAdoption.householdsWithGrantedAccess, hint: "Acceso asignado. Puede coincidir con un hogar con compra de Play." }
                    ]}
                  />
                ) : (
                  <p>La API todavía no devuelve los indicadores de adopción.</p>
                )}
              </AdminSection>

              <AdminSection id="yo" title="Yo" kicker="Conteos agregados de uso">
                <AdminBars
                  label="Bienestar personal"
                  empty="Nadie usó Yo todavía."
                  items={[
                    {
                      label: "Check-ins",
                      value: s.dailyCheckinsInRange ?? 0,
                      hint: `${s.usersWithCheckinInRange ?? 0} personas · ${s.dailyCheckins ?? 0} en total.`,
                      accent: "#C46B3A"
                    },
                    {
                      label: "Objetivos",
                      value: s.goalsInRange ?? 0,
                      hint: `Total: ${s.goals ?? 0}.`,
                      accent: "#4F8F6E"
                    },
                    {
                      label: "Hábitos",
                      value: s.habitsInRange ?? 0,
                      hint: `Total: ${s.habits ?? 0}.`,
                      accent: "#4A7FB5"
                    },
                    {
                      label: "Hábitos cumplidos",
                      value: s.habitCompletionsInRange ?? 0,
                      hint: `Marcas en la ventana · total ${s.habitCompletions ?? 0}.`,
                      accent: "#D4894A"
                    }
                  ]}
                />
              </AdminSection>

              {dailyActivity.length > 0 ? (
                <AdminSection id="uso-diario" title="Uso por día" kicker="Altas, hogares, ánimo y hábitos">
                  <AdminDays
                    label="Serie diaria Nido"
                    empty="Sin actividad diaria."
                    legend={[
                      { key: "signups", label: "Altas" },
                      { key: "households", label: "Hogares" },
                      { key: "checkins", label: "Ánimo" },
                      { key: "habits", label: "Hábitos" }
                    ]}
                    items={dailyActivity.map((point) => ({
                      date: point.date,
                      label: formatDayLabel(point.date),
                      values: [
                        { key: "signups", value: point.signups },
                        { key: "households", value: point.households },
                        { key: "checkins", value: point.checkins ?? 0 },
                        { key: "habits", value: point.habitCompletions ?? 0 }
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
