import type { Metadata } from "next";
import Link from "next/link";
import { JondreaLogo } from "../../../components/JondreaLogo";
import { firstParam } from "../../../lib/admin";

export const metadata: Metadata = {
  title: "Ingreso"
};

/** Login del panel interno de JondreA. */
export default async function AdminLoginPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const nextPath = firstParam(params?.next) ?? "/admin";
  const hasError = firstParam(params?.error) === "1";

  return (
    <div className="admin-login">
      <div className="admin-aurora" aria-hidden="true">
        <span className="admin-orb admin-orb--a" />
        <span className="admin-orb admin-orb--b" />
      </div>
      <div className="admin-login__card">
        <JondreaLogo size="sm" />
        <p className="admin-kicker">Panel interno</p>
        <h1>Ingreso administrador</h1>
        <p className="admin-login__lead">
          Métricas de uso de CareMe y Nido a partir de las APKs publicadas.
        </p>
        <form method="post" action="/admin/login/submit" className="admin-form">
          <input type="hidden" name="next" value={nextPath} />
          <label>
            Usuario
            <input name="username" autoComplete="username" required />
          </label>
          <label>
            Contraseña
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit" className="btn btn-primary admin-form__submit">
            Entrar
          </button>
          {hasError ? (
            <p className="admin-error">Credenciales inválidas. Vuelva a intentarlo.</p>
          ) : null}
        </form>
        <Link href="/" className="admin-login__back">
          Volver al sitio
        </Link>
      </div>
    </div>
  );
}
