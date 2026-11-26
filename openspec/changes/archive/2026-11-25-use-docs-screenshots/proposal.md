# Proposal

## Why

The website currently embeds a single manually copied screenshot (`src/assets/screenshot-inventory.jpg`) on the Home page, while the upstream `itemized` documentation bundle fetched during build (`public/docs/assets/*.png`) already provides 12 automatically maintained, up-to-date UI screenshots. Switching the marketing pages to consume those docs screenshots removes a stale manual asset and keeps screenshots across the site automatically in sync with each `itemized` release.

## What Changes

- Replace the Home page (`/`) hero screenshot with the automatically maintained `/docs/assets/inventory.png` from the fetched docs bundle, and remove the stale `src/assets/screenshot-inventory.jpg` file.
- Add framed, captioned screenshots from `/docs/assets/` to the corresponding feature sections on `/features/` (covering inventory/due-soon/locations, shopping list, barcode/QR scanner, Zebra label printing settings, instant search, and household/settings).
- Add the mobile PWA screenshot (`/docs/assets/mobile-pwa.png`) to `/install/` alongside the mobile installation guide.
- Serve all screenshots directly from `/docs/assets/*.png` with explicit intrinsic dimensions (`width` and `height`), descriptive `alt` text, appropriate loading priorities (`eager` + `fetchpriority="high"` for the Home hero, `lazy` for below-the-fold figures), and responsive CSS framing so no generated files are written into `src/` and `npm run check:links` validates every screenshot path in `dist/`.

## Capabilities

### New Capabilities

<!-- None: this change extends existing marketing and install page capabilities. -->

### Modified Capabilities

- `landing-and-features`: Home page (`/`) hero stage uses the docs-sourced inventory screenshot (`/docs/assets/inventory.png`), and the Features page (`/features/`) renders matching docs-sourced screenshots for its feature groups.
- `self-hosting-and-setup`: Install page (`/install/`) displays the docs-sourced mobile PWA screenshot (`/docs/assets/mobile-pwa.png`) to illustrate the installed mobile experience.

## Impact

- **Removed**: `src/assets/screenshot-inventory.jpg` (and empty `src/assets/` directory if unused).
- **Modified**: `src/pages/index.astro`, `src/pages/features.astro`, `src/lib/features.ts`, `src/pages/install.astro`, `src/styles/site.css`.
- **Verification**: `npm run check`, `npm run build` (which runs `prebuild` -> `scripts/fetch-docs.mjs`), `npm run check:dist` (`check:links` verifies every `/docs/assets/*.png` reference exists in `dist/`), and `npm run test:browser` (axe-core a11y, 320/768/1280px overflow checks, no-JS checks).
