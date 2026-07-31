/**
 * Project rules for AI agents working in the jondrea-one repo.
 * Read this file before making any code change.
 */

# jondrea-one — Agent Rules

## Scope

Sitio corporativo Next.js de Jondrea (landing + `/admin` multi-producto).
La app CareMe (API Nest + mobile Expo) vive en el sibling `jondrea-careme`.

## Non-negotiables

1. **Respect existing architecture**
   - App Router (`app/`), `components/`, `lib/`, `styles/` con tokens.
   - No inventar patrones paralelos (auth admin = cookie + middleware).

2. **Respect UI / design system**
   - Reutilizar `styles/tokens.css`, tipografía y componentes existentes.
   - Preferir motion sutil; evitar ruido decorativo.

3. **Do not break existing logic**
   - Preservar rutas públicas, `/admin` protegido y el fetch server-side a CareMe analytics.
   - Preferir cambios aditivos y localizados.

4. **Method documentation (required)**
   - Toda función/método con descripción breve arriba de la declaración.
   - Sin comentarios dentro del cuerpo del método.
   - Al modificar: agregar descripción si falta; sacar comentarios internos.

## Implementation preferences

- Copy en español hacia el usuario.
- Diffs enfocados a la tarea.
- No commit/push/PR salvo pedido explícito.
- No editar markdown que el usuario no pidió (salvo que la tarea sea ese doc).

## Env (server-only)

- `ADMIN_USER` / `ADMIN_PASSWORD` — login `/admin`
- `CAREME_API_URL` — base Nest (sin `/v1`)
- `CAREME_ADMIN_ANALYTICS_KEY` — debe coincidir con `ADMIN_ANALYTICS_KEY` de CareMe
