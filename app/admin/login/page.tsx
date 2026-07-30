type SearchParams = Record<string, string | string[] | undefined>;

/** Devuelve el primer valor de un search param. */
function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/** Login del panel admin Jondrea. */
export default async function AdminLoginPage({
  searchParams
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const nextPath = firstParam(params?.next) ?? "/admin";
  const hasError = firstParam(params?.error) === "1";

  return (
    <div className="admin-shell">
      <div className="admin-card">
        <span className="eyebrow">Panel interno</span>
        <h1>Ingreso administrador</h1>
        <p>Accedé a métricas de CareMe y CasaOs.</p>
        <form method="post" action="/admin/login/submit" className="admin-form">
          <input type="hidden" name="next" value={nextPath} />
          <label>
            Usuario
            <input name="username" autoComplete="username" required defaultValue="admin" />
          </label>
          <label>
            Contraseña
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              defaultValue="admin"
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
          {hasError ? <p className="admin-error">Credenciales inválidas. Probá de nuevo.</p> : null}
        </form>
      </div>
    </div>
  );
}
