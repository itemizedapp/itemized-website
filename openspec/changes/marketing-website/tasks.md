# Tasks

## 1. Project Scaffold & Brand Assets

- [x] 1.1 Initialize the Astro project (`package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`) configured for static `dist/` output (`site: 'https://itemizedapp.com'`, `trailingSlash: 'always'`, `@astrojs/sitemap`) and verify `npm install` completes cleanly
- [x] 1.2 Download and commit official Itemized brand assets from `itemizedapp/itemized` (`public/favicon.svg`, `public/apple-touch-icon.png`, `public/icon-192.png`, `src/assets/screenshot-inventory.jpg`), create `public/robots.txt` and `public/og-card.png` (1200×630), and verify all asset files exist at their expected paths
- [x] 1.3 Create typed site/product data modules (`src/lib/site.ts`, `src/lib/features.ts`, `src/lib/config.ts`) grounded in `itemizedapp/itemized` and verify `npx astro check` reports zero TypeScript errors

## 2. Design System & Shared Chrome

- [x] 2.1 Author `src/styles/tokens.css` (Itemized indigo + slate light/dark `prefers-color-scheme` CSS custom properties with WCAG AA contrast) and `src/styles/site.css` (flat editorial layout, crisp borders, typography with self-hosted Inter via `@fontsource-variable/inter`, responsive grids, buttons, cards, and reduced-motion rules) and verify stylesheets compile without errors
- [x] 2.2 Build shared components (`src/components/Icon.astro`, `src/components/JsonLd.astro`, `src/components/CodeBlock.astro` with progressive-enhancement Copy button, `src/components/SiteHeader.astro` with zero-JS `<details>` mobile menu, `src/components/SiteFooter.astro` with 3-column desktop / `<details>` mobile groups) and `src/layouts/Base.astro` (skip link, SEO/OG/Twitter tags, canonical URL, favicon, Escape/outside-click menu dismissal)
- [x] 2.3 Implement custom `src/pages/404.astro` and verify `npm run build` produces `dist/404.html` with working header, footer, and recovery links

## 3. Home & Features Pages

- [x] 3.1 Implement `src/pages/index.astro` (hero with Live Demo & Self-Host CTAs, framed responsive `<Image />` inventory screenshot stage, daily workflow highlights, label printing & fast search callouts, ownership/zero-dependency pillars, next-step cards, and `WebSite` + `Organization` + `SoftwareApplication` JSON-LD) and verify `dist/index.html` builds cleanly
- [x] 3.2 Implement `src/pages/features.astro` with in-page anchor index and grouped sections for all shipped Itemized capabilities (stock & expiration tracking, automatic shopping list, barcode/QR scanning & lookup, direct LAN Zebra ZPL printing, FTS5 search & keyboard shortcuts, household accounts & OIDC SSO, single-binary self-hosting) and verify `dist/features/index.html` builds with valid section anchors

## 4. Self-Hosting, Configuration & Install Pages

- [x] 4.1 Implement `src/pages/self-host.astro` covering Docker Compose, Docker Run (`ghcr.io/itemizedapp/itemized:latest`), Unraid Community Apps (`unraid/itemized.xml`, `PUID`/`PGID`), and HTTPS reverse proxy setup (`TRUST_PROXY`, `BASE_URL`) using `CodeBlock.astro`, and verify `dist/self-host/index.html` builds cleanly
- [x] 4.2 Implement `src/pages/configuration.astro` with the complete environment variable reference table (core, OIDC SSO, optional LLM providers, demo mode) and direct LAN Zebra ZSB (IPP) / Raw TCP (`:9100`) ZPL label printing guide, and verify `dist/configuration/index.html` builds cleanly
- [x] 4.3 Implement `src/pages/install.astro` with step-by-step PWA install guides for iOS Safari, Android Chrome, and desktop browsers, USB/Bluetooth scanner notes, and an HTTPS camera prerequisite callout linking to `/self-host/#https`, and verify `dist/install/index.html` builds cleanly

## 5. Project & Trust Pages

- [x] 5.1 Implement `src/pages/about.astro`, `src/pages/security.astro`, and `src/pages/privacy.astro` covering Itemized's mission and single-binary architecture, security controls and vulnerability reporting, and the website's zero-tracking posture vs. self-hosted data flow; verify `dist/about/index.html`, `dist/security/index.html`, and `dist/privacy/index.html` build cleanly

## 6. Post-Build Checks, Browser Tests & Deployment Docs

- [x] 6.1 Implement post-build Node verification scripts (`scripts/checks/links.mjs`, `scripts/checks/seo.mjs`, `scripts/checks/scripts.mjs`) and wire `npm run check:dist` in `package.json`; run `npm run build && npm run check:dist` and verify all checks pass on `dist/`
- [x] 6.2 Add Playwright configuration (`playwright.config.ts`) and browser tests (`tests/a11y.spec.ts`, `tests/widths.spec.ts`, `tests/no-js.spec.ts`) covering WCAG 2.1 AA via `@axe-core/playwright`, zero horizontal overflow at 320/768/1280px, and no-JS navigation across all routes; run `npm run test:browser` and verify all specs pass
- [x] 6.3 Add a concise `README.md` documenting local development (`npm run dev`), static build (`npm run build`), verification (`npm run check`, `npm run check:dist`, `npm run test:browser`), and static deployment (`dist/` on GitHub Pages, Cloudflare Pages, or Netlify), then run a final `npm run check && npm run build && npm run check:dist` to confirm everything passes end to end
