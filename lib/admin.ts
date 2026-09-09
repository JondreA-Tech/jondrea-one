import { publicRelease } from "./release";

export type SearchParams = Record<string, string | string[] | undefined>;

export type ProductKey = "careme" | "nido";

export type CareMeSummary = {
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

export type NidoSummary = {
  days: number;
  from: string;
  to: string;
  registeredUsers: number;
  registeredUsersInRange: number;
  households: number;
  activeMemberships: number;
  invitations: number;
  expenses: number;
  routines: number;
  shoppingLists: number;
};

export type ApiHealth = {
  ok: boolean;
  label: string;
};

const CAREME_EVENT_LABELS: Record<string, string> = {
  future_self_saved: "Future You guardado",
  checkin_created: "Check-in creado",
  weekly_screen_opened: "Resumen semanal abierto"
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

/** Summary CareMe vacío cuando la API no responde. */
export function emptyCareMeSummary(searchParams?: SearchParams): CareMeSummary {
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

/** Summary Nido vacío cuando la API no responde. */
export function emptyNidoSummary(searchParams?: SearchParams): NidoSummary {
  const base = emptyCareMeSummary(searchParams);
  return {
    days: base.days,
    from: base.from,
    to: base.to,
    registeredUsers: 0,
    registeredUsersInRange: 0,
    households: 0,
    activeMemberships: 0,
    invitations: 0,
    expenses: 0,
    routines: 0,
    shoppingLists: 0
  };
}

/** Etiqueta en español de un evento de CareMe. */
export function careMeEventLabel(name: string) {
  return CAREME_EVENT_LABELS[name] ?? name.replaceAll("_", " ");
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

/** Obtiene el summary de analytics de CareMe (server-side + admin key). */
export async function getCareMeSummary(searchParams?: SearchParams) {
  const apiBase = process.env.CAREME_API_URL ?? "http://localhost:3001";
  const adminKey = process.env.CAREME_ADMIN_ANALYTICS_KEY ?? "";
  const query = buildSummaryQuery(searchParams);
  try {
    const response = await fetch(`${apiBase}/v1/analytics/events/summary?${query}`, {
      cache: "no-store",
      headers: adminKey ? { "x-admin-key": adminKey } : {}
    });
    if (!response.ok) {
      return { summary: emptyCareMeSummary(searchParams), ok: false as const };
    }
    return { summary: (await response.json()) as CareMeSummary, ok: true as const };
  } catch {
    return { summary: emptyCareMeSummary(searchParams), ok: false as const };
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
