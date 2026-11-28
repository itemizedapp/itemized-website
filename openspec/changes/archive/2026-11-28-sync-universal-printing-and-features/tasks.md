# Tasks

## 1. Shared Site Metadata, Icons, and Docs Asset Sync

- [x] 1.1 Sync the local docs bundle via `npm run fetch:docs` so `public/docs/assets/settings-notifications.png` and updated docs assets are present, and verify the expected screenshot files exist in `public/docs/assets/`
- [x] 1.2 Update `src/lib/site.ts` (`SITE.tagline` for universal label printing and visual label designer, and `SITE.unraidTemplate` pointing to `https://github.com/itemizedapp/itemized-unraid`) and add a `bell` icon path to `src/components/Icon.astro`; verify TypeScript compilation via `npx astro check`

## 2. Home and Features Pages

- [x] 2.1 Update `src/pages/index.astro` (meta description, hero lede, workflow steps 4 and 5, daily workflows with Quick Consume and native-camera QR Quick Actions, and the 3-column hardware/automation/speed section covering universal label printing + Visual Label Designer, Web Push daily digests + Home Assistant API, and FTS5 search/shortcuts) and verify clean build output with `npm run build`
- [x] 2.2 Update `src/lib/features.ts` and `src/pages/features.astro` to overhaul the `label-printing` group (Visual Label Designer 3x3 grid, live preview, 6 drivers incl. batch Browser PDF, label sizes, product label modes), add the `notifications-and-integrations` group with `/docs/assets/settings-notifications.png` (Web Push daily digests, Personal API Tokens, Home Assistant REST summary, iOS Shortcuts, Mealie/Tandoor bridges), and integrate Quick Consume, sorting, math expressions, starter taxonomy, QR Quick Actions, QR-ignore in UPC mode, and per-user themes into existing groups; verify `/features/` builds cleanly with zero em dashes and correct lowercase `itemized` capitalization

## 3. Configuration, Self-Host, and Install Pages

- [x] 3.1 Update `src/lib/config.ts` and `src/pages/configuration.astro` to replace the Zebra-only printing section and Go-template ZPL copy with all 6 supported printer drivers (Browser Print / PDF, Zebra ZPL `:9100`, Brother QL `:9100`, TSPL `:9100`, CUPS / AirPrint IPP PDF, and Zebra ZSB IPP), label size auto-detect/presets/custom dimensions, Visual Label Designer overview, and product label modes; verify `/configuration/` renders all 6 drivers cleanly in `npm run build`
- [x] 3.2 Update `src/pages/self-host.astro` (point Unraid link to `itemizedapp/itemized-unraid`, generalize bridge-networking LAN printer ports to `:9100` and `:631`, and note HTTPS is required for both camera scanning and Web Push) and `src/pages/install.astro` (add HTTPS and iOS Home Screen prerequisites for Web Push daily digests); verify both pages build without broken anchors

## 4. About, Security, and Privacy Pages

- [x] 4.1 Update `src/pages/about.astro` (universal label printing, daily push digests, AGPL-3.0 open-source framing, and GitHub policy welcoming bug reports and feature ideas while noting external PRs are not accepted), `src/pages/security.astro` (SHA-256 hashed Personal API Tokens and HTTPS for Web Push), and `src/pages/privacy.astro` (optional outbound Web Push delivery and general LAN printers); verify all three pages build cleanly

## 5. End-to-End Verification

- [x] 5.1 Run full build and verification suite (`npm run build && npm run check`) and confirm all internal link, SEO/metadata, em-dash, no-JS, responsive overflow, and axe-core WCAG 2.1 AA checks pass with zero failures
