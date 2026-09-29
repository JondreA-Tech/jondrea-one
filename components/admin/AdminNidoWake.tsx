"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_TRIES = 3;
const RETRY_MS = 4000;

type WakeReason = "unconfigured" | "timeout" | "http" | "network";

/** Texto del fallo según por qué no contestó Nido. */
function wakeFailureBody(reason: WakeReason | null) {
  if (reason === "unconfigured") {
    return "En Vercel falta NIDO_API_URL, o sigue en localhost. Tiene que ser la URL de Render, sin /v1: https://nido-api-9ccn.onrender.com. Después de guardarla, redeploy.";
  }
  if (reason === "timeout") {
    return "Se despertó la API pero Render no alcanzó a responder. El arranque en frío pasa el minuto: recargá el panel.";
  }
  if (reason === "http") {
    return "La API contestó con error. Revisá que NIDO_API_URL no termine en /v1 y que el servicio esté publicado.";
  }
  return "Se intentó despertar la API y no contestó. Si es Render, puede tardar más: recargá el panel. Si apunta a localhost, levantá la API de Nido.";
}

/** Lee el motivo que devuelve /admin/nido-wake. */
function readWakeReason(value: unknown): WakeReason | null {
  if (value === "unconfigured" || value === "timeout" || value === "http" || value === "network") {
    return value;
  }
  return null;
}

/** Al abrir el panel, despierta la API de Nido (Render free se apaga) y recarga. */
export function AdminNidoWake() {
  const router = useRouter();
  const [attempt, setAttempt] = useState(1);
  const [failed, setFailed] = useState(false);
  const [reason, setReason] = useState<WakeReason | null>(null);

  useEffect(() => {
    let cancelled = false;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function ping() {
      tries += 1;
      if (!cancelled) {
        setAttempt(tries);
      }
      try {
        const response = await fetch("/admin/nido-wake", { cache: "no-store" });
        const data = (await response.json()) as { ok?: boolean; reason?: unknown };
        if (data.ok) {
          router.refresh();
          return;
        }
        const nextReason = readWakeReason(data.reason);
        if (!cancelled) {
          setReason(nextReason);
        }
        if (nextReason === "unconfigured") {
          if (!cancelled) {
            setFailed(true);
          }
          return;
        }
      } catch {
        if (!cancelled) {
          setReason("network");
        }
      }
      if (tries >= MAX_TRIES) {
        if (!cancelled) {
          setFailed(true);
        }
        return;
      }
      timer = setTimeout(() => {
        void ping();
      }, RETRY_MS);
    }

    void ping();
    return () => {
      cancelled = true;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router]);

  if (failed) {
    return (
      <div className="admin-notice admin-notice--error" role="alert">
        <strong>Nido no respondió</strong>
        <p>{wakeFailureBody(reason)}</p>
      </div>
    );
  }

  return (
    <div className="admin-notice admin-notice--waking" role="status">
      <strong>Despertando Nido</strong>
      <p>
        El backend se apaga cuando nadie lo usa. El primer arranque puede tardar más de un minuto
        (intento {attempt} de {MAX_TRIES}). Cuando arranque, el panel se recarga solo.
      </p>
    </div>
  );
}
