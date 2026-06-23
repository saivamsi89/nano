# NanoFab — Website

Marketing site + component shop + instant PCB quote tool for **NanoFab**, a
precision PCB fabrication, assembly and component-sourcing company.

Built to look and perform a notch above the reference site (lioncircuits.com),
using the NanoFab brand: deep navy `#0B0B23` + vivid green `#22C55E`.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-based theme in `globals.css`) |
| Cart state | Zustand (persisted to localStorage) |
| Icons | lucide-react |
| Fonts | Sora (display), Inter (body), JetBrains Mono (specs) |

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Pages

| Route | What it is |
|---|---|
| `/` | Home — hero, services, offer, featured boards, capabilities, process, industries, testimonials |
| `/services` | Fabrication / Assembly / Sourcing detail |
| `/capabilities` | Full spec & materials & certs matrix |
| `/industries` | Sectors served |
| `/shop` | Component shop with category filter |
| `/shop/[slug]` | Product detail (8 boards, statically generated) |
| `/cart` | Cart + mock checkout (Zustand) |
| `/quote` | **Instant quote tool** with live mock pricing engine |
| `/about` | Story, values, contact form |
| `/resources` | Guides + downloads |

## What's real vs. mocked (this is a client-verification demo)

**Real & working:** all pages, navigation, responsive design, the component
shop, add-to-cart, cart math (GST + shipping), and the instant-quote
calculator (live price + lead time from `src/lib/quote.ts`).

**Mocked for the demo (Phase 2 work):**
- Checkout → wire to **Razorpay** (UPI/cards/netbanking)
- Auth → **NextAuth/Clerk**
- Persistence → **Prisma + Postgres** (Neon/Supabase)
- Contact/quote forms → **Resend** email + CRM
- Real fabrication pricing → replace coefficients in `src/lib/quote.ts`
- BOM upload parsing

## Board images

The catalog uses **clean, consistent product illustrations** rendered as SVG
(`src/lib/product-art.ts` + `src/components/product-render.tsx`) — flat-with-depth
PCB renders on a near-white surface, the deliberate "parts store" aesthetic
(uniform across every card, unlike inconsistent stock photos).

Each product's look is chosen by its `category` (Dev Board / Module / Sensor /
PCB Kit). To swap in NanoFab's own **studio product photos** later, replace
`<ProductRender .../>` with a `next/image` and a file under `public/boards/`.

The live quote-tool preview (`src/components/pcb-graphic.tsx`) is a separate
dynamic SVG that updates with the selected colour/specs.

### Suggested AI image prompts (Midjourney / DALL·E / Firefly)

> "Professional product photograph of a green printed circuit board with a
> central black microcontroller chip, gold-plated edge connectors, fine copper
> traces and SMD components, top-down 3/4 view, soft studio lighting, clean white
> background, ultra sharp, high detail, no text, no price." — vary the solder-mask
> colour (navy / black) per product.

## Deploy

The app is a full Next.js app (server features ready for Phase 2). Recommended:

- **GitHub repo → Vercel** (auto-deploy, free tier, full stack). Best path.
- Later: AWS / managed Postgres when scaling.

> Note: plain **GitHub Pages can't run** the cart/quote/checkout because it's
> static-only. Use Vercel for a live working demo link.
