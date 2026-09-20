# JondreA One

Sitio corporativo de **JondreA Tech** (software factory) y panel admin de **Nido**.

Un solo producto propio: Nido (hub del hogar + espacio Yo). CareMe se retiró; sus hábitos, objetivos y ánimo viven en Nido.

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

Para métricas de Nido la API tiene que estar arriba y `NIDO_ADMIN_ANALYTICS_KEY` tiene que coincidir con `ADMIN_ANALYTICS_KEY` de la API. En Render free, al abrir el panel se pega a `/v1/health` para despertar el servicio.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/sobre-nosotros` | Sobre nosotros |
| `/contactanos` | Contacto (email / IG / LinkedIn) |
| `/productos` | Portfolio |
| `/productos/nido` | Ficha de Nido (APK, changelog de la beta) |
| `/privacidad` | Nota de privacidad |
| `/admin` | Métricas de Nido (Hogar + Yo) |

## Contenido

| Archivo | Qué editar |
|---------|------------|
| `lib/site.ts` | Marca, mail, redes |
| `lib/products.ts` | Copy de Nido |
| `lib/nidoRelease.ts` | Versión beta y changelog de ficha |
| `public/nido/screens/` | Capturas de la app en la ficha |
| `styles/tokens.css` | Color y tipografía |

## Despliegue (Vercel)

Branch: **`develop`**.

1. [vercel.com](https://vercel.com) → Import GitHub `JondreA-Tech/jondrea-one`
2. Framework: Next.js · Branch: `develop`
3. Env vars:

| Key | Valor |
|-----|--------|
| `ADMIN_USER` | usuario del panel |
| `ADMIN_PASSWORD` | password fuerte |
| `NIDO_API_URL` | `https://nido-api-9ccn.onrender.com` (sin `/v1`) |
| `NIDO_ADMIN_ANALYTICS_KEY` | el mismo que `ADMIN_ANALYTICS_KEY` en Render |

4. Deploy → admin en `https://…/admin`

El panel muestra altas, hogares, invitaciones aceptadas, módulos de Hogar (eventos, medicación, gastos, rutinas, compras, viajes) y Yo (check-ins, objetivos, hábitos).
