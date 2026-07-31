# Jondrea One

Sitio corporativo de **Jondrea** (software factory) + panel admin multi-producto.

## Stack

- Next.js 15 (App Router)
- TypeScript
- CSS con design tokens (`styles/tokens.css`)

## Arranque

```bash
cd C:\JondreA\jondrea-one
cp .env.example .env
pnpm install
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Admin: [http://localhost:3000/admin](http://localhost:3000/admin) → credenciales de `.env`.

Para métricas de CareMe necesitás la API CareMe arriba y que `CAREME_ADMIN_ANALYTICS_KEY` coincida con `ADMIN_ANALYTICS_KEY` de la API.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/sobre-nosotros` | Sobre nosotros |
| `/contactanos` | Contacto (email / IG / LinkedIn) |
| `/productos` | Portfolio |
| `/productos/careme` | Página de producto CareMe |
| `/admin` | Métricas CareMe + placeholder CasaOs |

## Despliegue beta (gratis)

Branch a desplegar: **`develop`**.

### Opción A — Vercel (recomendada para Next.js)

1. [vercel.com](https://vercel.com) → Import GitHub repo `JondreA-Tech/jondrea-one`
2. Framework: Next.js · Branch: `develop`
3. Env vars:

| Key | Valor beta |
|-----|------------|
| `ADMIN_USER` | (elegí uno, no uses `admin` en serio) |
| `ADMIN_PASSWORD` | (password fuerte) |
| `CAREME_API_URL` | `https://careme-api-ftob.onrender.com` |
| `CAREME_ADMIN_ANALYTICS_KEY` | el mismo que `ADMIN_ANALYTICS_KEY` en Render CareMe |

4. Deploy → URL tipo `https://jondrea-one.vercel.app`
5. Admin: `https://…/admin`

### Opción B — Render (mismo stack que la API)

1. [dashboard.render.com](https://dashboard.render.com) → **New → Blueprint**
2. Repo `jondrea-one`, branch **`develop`**, archivo `render.yaml`
3. Completar las mismas env vars de la tabla de arriba
4. Health: `/`

## Personalización rápida

- Marca / tipografía / colores: `styles/tokens.css`
- Contacto: `lib/site.ts`
- Productos: `lib/products.ts`
- Logo tipográfico: `components/JondreaLogo.tsx` (reemplazable)
