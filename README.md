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

Admin: [http://localhost:3000/admin](http://localhost:3000/admin) → `admin` / `admin`.

Para métricas de CareMe necesitás la API CareMe arriba (`pnpm --filter @careme/api dev` en el monorepo CareMe) y que `CAREME_ADMIN_ANALYTICS_KEY` coincida con `ADMIN_ANALYTICS_KEY` de la API.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/sobre-nosotros` | Sobre nosotros |
| `/contactanos` | Contacto (email / IG / LinkedIn) |
| `/productos` | Portfolio |
| `/productos/careme` | Página de producto CareMe |
| `/admin` | Métricas CareMe + placeholder CasaOs |

## Personalización rápida

- Marca / tipografía / colores: `styles/tokens.css`
- Contacto: `lib/site.ts`
- Productos: `lib/products.ts`
- Logo tipográfico: `components/JondreaLogo.tsx` (reemplazable)
