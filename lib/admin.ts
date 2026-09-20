import { publicRelease } from "./release";

export type SearchParams = Record<string, string | string[] | undefined>;

export type ProductKey = "nido";

export type NidoDayPoint = {
  date: string;
  signups: number;
  households: number;
  checkins?: number;
  habitCompletions?: number;
};

export type NidoSummary = {
  days: number;
  from: string;
  to: string;
  registeredUsers: number;
  registeredUsersInRange: number;
  households: number;
  householdsInRange?: number;
  activeMemberships: number;
  localMembers?: number;
  localMembersPerson?: number;
  localMembersPet?: number;
  localMembersInRange?: number;
  invitations: number;
  invitationsInRange?: number;
  invitationsAccepted?: number;
  invitationsAcceptedInRange?: number;
  invitationsPending?: number;
  expenses: number;
  expensesInRange?: number;
  routines: number;
  routinesInRange?: number;
  routineCompletions?: number;
  routineCompletionsInRange?: number;
  shoppingLists: number;
  shoppingListsInRange?: number;
  trips?: number;
  tripsInRange?: number;
  memberEvents?: number;
  memberEventsInRange?: number;
  memberEventsSchool?: number;
  memberEventsSchoolInRange?: number;
  petVaccinations?: number;
  petVaccinationsInRange?: number;
  medications?: number;
  medicationsInRange?: number;
  medicationsActive?: number;
  goals?: number;
  goalsInRange?: number;
  habits?: number;
  habitsInRange?: number;
  habitCompletions?: number;
  habitCompletionsInRange?: number;
  dailyCheckins?: number;
  dailyCheckinsInRange?: number;
  usersWithCheckinInRange?: number;
  usersWithCheckinToday?: number;
  usersWithActivityInRange?: number;
  returningUsersInRange?: number;
  pushTokens?: number;
  usersWithPushToken?: number;
  byDay?: NidoDayPoint[];
};

export type ApiHealth = {
  ok: boolean;
  label: string;
};

/** Primer valor de un search param. */
export function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/** Query string de ventana (days o from/to). */
export function buildSummaryQuery(searchParams?: SearchParams) {
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

/** Ventana de fechas por defecto a partir de days. */
function defaultWindow(searchParams?: SearchParams) {
  const days = Number(firstParam(searchParams?.days) ?? 7);
  const now = new Date();
  const from = new Date(now);
  from.setDate(from.getDate() - Math.max(1, Number.isNaN(days) ? 7 : days));
  from.setHours(0, 0, 0, 0);
  now.setHours(23, 59, 59, 999);
  return {
    days: Number.isNaN(days) ? 7 : days,
    from: from.toISOString(),
    to: now.toISOString()
  };
}

/** Summary Nido vacío cuando la API no responde. */
export function emptyNidoSummary(searchParams?: SearchParams): NidoSummary {
  const window = defaultWindow(searchParams);
  return {
    days: window.days,
    from: window.from,
    to: window.to,
    registeredUsers: 0,
    registeredUsersInRange: 0,
    households: 0,
    householdsInRange: 0,
    activeMemberships: 0,
    localMembers: 0,
    localMembersPerson: 0,
    localMembersPet: 0,
    localMembersInRange: 0,
    invitations: 0,
    invitationsInRange: 0,
    invitationsAccepted: 0,
    invitationsAcceptedInRange: 0,
    invitationsPending: 0,
    expenses: 0,
    expensesInRange: 0,
    routines: 0,
    routinesInRange: 0,
    routineCompletions: 0,
    routineCompletionsInRange: 0,
    shoppingLists: 0,
    shoppingListsInRange: 0,
    trips: 0,
    tripsInRange: 0,
    memberEvents: 0,
    memberEventsInRange: 0,
    memberEventsSchool: 0,
    memberEventsSchoolInRange: 0,
    petVaccinations: 0,
    petVaccinationsInRange: 0,
    medications: 0,
    medicationsInRange: 0,
    medicationsActive: 0,
    goals: 0,
    goalsInRange: 0,
    habits: 0,
    habitsInRange: 0,
    habitCompletions: 0,
    habitCompletionsInRange: 0,
    dailyCheckins: 0,
    dailyCheckinsInRange: 0,
    usersWithCheckinInRange: 0,
    usersWithCheckinToday: 0,
    usersWithActivityInRange: 0,
    returningUsersInRange: 0,
    pushTokens: 0,
    usersWithPushToken: 0,
    byDay: []
  };
}

/** Versión de APK publicada en el sitio, por producto. */
export function publishedApkVersion(_product: ProductKey) {
  void _product;
  return publicRelease.label;
}

/** Health GET /v1/health de una API Nest. */
export async function fetchApiHealth(apiBase: string, label: string): Promise<ApiHealth> {
  try {
    const response = await fetch(`${apiBase}/v1/health`, { cache: "no-store" });
    return { ok: response.ok, label };
  } catch {
    return { ok: false, label };
  }
}

/** Obtiene el summary operativo de Nido (server-side + admin key). */
export async function getNidoSummary(searchParams?: SearchParams) {
  const apiBase = process.env.NIDO_API_URL ?? "http://localhost:3002";
  const adminKey = process.env.NIDO_ADMIN_ANALYTICS_KEY ?? "";
  const query = buildSummaryQuery(searchParams);
  try {
    const response = await fetch(`${apiBase}/v1/analytics/summary?${query}`, {
      cache: "no-store",
      headers: adminKey ? { "x-admin-key": adminKey } : {}
    });
    if (!response.ok) {
      return { summary: emptyNidoSummary(searchParams), ok: false as const };
    }
    return { summary: (await response.json()) as NidoSummary, ok: true as const };
  } catch {
    return { summary: emptyNidoSummary(searchParams), ok: false as const };
  }
}

/** True si no hay uso todavía (lanzamiento / APK recién publicada). */
export function isLaunchEmpty(ok: boolean, registeredUsers: number, activity: number) {
  return ok && registeredUsers === 0 && activity === 0;
}

/** Rango de fechas en español (Argentina). */
export function formatAdminRange(from: string, to: string) {
  const start = new Date(from).toLocaleDateString("es-AR");
  const end = new Date(to).toLocaleDateString("es-AR");
  return `${start} – ${end}`;
}

/** Ancho de barra 0–100 relativo a un total. */
export function barPercent(value: number, total: number) {
  if (total <= 0) {
    return 0;
  }
  return Math.max(value > 0 ? 6 : 0, Math.min(100, Math.round((value / total) * 100)));
}

/** Porcentaje entero 0–100. */
export function ratioPercent(part: number, total: number) {
  if (total <= 0) {
    return 0;
  }
  return Math.round((part / total) * 100);
}

/** Etiqueta de publicación del APK en el panel. */
export function apkPublishedLabel(available: boolean) {
  return available ? "APK publicada" : "APK pendiente";
}
