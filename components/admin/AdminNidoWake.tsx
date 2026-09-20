"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_TRIES = 20;
const RETRY_MS = 4000;

/** Al abrir el panel, despierta la API de Nido (Render free se apaga) y recarga. */
export function AdminNidoWake() {
  const router = useRouter();
  const [attempt, setAttempt] = useState(1);
  const [failed, setFailed] = useState(false);

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
        const data = (await response.json()) as { ok?: boolean };
        if (data.ok) {
          router.refresh();
          return;
        }
      } catch {
        // Render todavía arrancando o red caída.
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
        <p>
          Se intentó despertar la API y no contestó. Si es Render, puede tardar más: recargá el
          panel. Si apunta a localhost, levantá la API de Nido.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-notice admin-notice--waking" role="status">
      <strong>Despertando Nido</strong>
      <p>
        El backend se apaga cuando nadie lo usa. Ya le pegamos a la API (intento {attempt} de{" "}
        {MAX_TRIES}). Cuando arranque, el panel se recarga solo.
      </p>
    </div>
  );
}
