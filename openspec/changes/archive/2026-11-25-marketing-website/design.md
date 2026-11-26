# Design

## Context

See [proposal.md](./proposal.md) for motivation and scope. This is a greenfield repository (`/Users/hagerman/Code/itemized-website`) currently containing only `openspec/` scaffolding. The site promotes Itemized (`https://github.com/itemizedapp/itemized`), a self-hosted Go + embedded React + SQLite household inventory system with a live demo at `https://demo.itemizedapp.com`, built with static-first engineering and visual restraint for static hosting (GitHub Pages, Cloudflare Pages, or Netlify).

Local environment verified: Node `v26.13.0`, npm `11.20.0`.

## Goals / Non-Goals

**Goals:**
- Deliver a fast, zero-bloat static marketing website built with Astro (`output: 'static'`, `trailingSlash: 'always'`) that outputs a portable `dist/` directory.
- Maintain a calm, editorial visual discipline: clean flat surfaces, generous whitespace, Inter typography, `prefers-color-scheme` light/dark support via CSS custom properties, crisp borders instead of heavy shadows, and zero-JS progressive enhancement (`<details>` mobile menu, pure HTML/CSS layout).
- Anchor the color system in Itemized's existing brand identity (`#6366f1` / `#4338ca` indigo from `web/public/favicon.svg`, slate dark surfaces `#0f172a` from `web/public/manifest.json`) while ensuring WCAG AA contrast in both light and dark modes.
- Keep all product facts strictly grounded in `itemizedapp/itemized` (verified from its README, manifest, and source) via centralized typed data modules (`src/lib/site.ts`, `src/lib/features.ts`, `src/lib/config.ts`).
- Ship automated post-build quality gates (`check:links`, `check:seo`, `check:scripts`) and Playwright checks (a11y, widths, no-JS).

**Non-Goals:**
- No Docker/nginx runtime configuration (targeting static hosts only).
- No external release-bundle fetcher; brand icons and screenshots are committed directly in `public/` / `src/assets/` and updated deliberately.
- No blog, multi-language i18n, comparison/switch-from pages, or interactive playground in this initial change.
- No third-party analytics, cookies, or external CDN font loads.

## Decisions

### D1: Astro static site with handwritten CSS tokens (no heavy CSS framework)
- **Decision**: Use Astro (`astro` + `@astrojs/sitemap` + `@astrojs/check`) with a single clean global stylesheet (`src/styles/site.css`) and CSS custom properties.
- **Rationale**: Astro ships zero client-side JavaScript by default, builds to clean `/<route>/index.html` static files ideal for GitHub Pages / Cloudflare Pages / Netlify, and handwritten CSS custom properties keep the bundle tiny, predictable, and easy to organize around semantic layout primitives (`.wrap`, `.section`, `.section-alt`, `.kicker`, `.lede`, `.btn`, `.lp-hero`, `.lp-stage`, `.site-header`, `.site-footer`).
- **Alternatives considered**:
  - *Next.js / Vite SPA*: Unnecessary JS runtime overhead for a static marketing site.
  - *Tailwind CSS*: Good for web applications (and used inside Itemized's app UI), whereas a small marketing site benefits from a minimal CSS footprint with semantic custom properties and component styles.

### D2: Brand token system adapted from Itemized's palette
- **Decision**: Define `--it-*` light/dark CSS custom properties in `src/styles/tokens.css` imported by `src/styles/site.css`, pairing Itemized's indigo accent (`#4f46e5` / `#4338ca` in light mode for AA text contrast; `#818cf8` / `#6366f1` in dark mode) with neutral slate surfaces (`#ffffff` / `#f8fafc` in light; `#0f172a` / `#1e293b` in dark, matching `manifest.json`'s `#0f172a`).
- **Rationale**: Preserves Itemized's visual identity from its favicon and PWA manifest while providing a calm, flat, high-contrast layout with automatic `prefers-color-scheme` theming.
- **Alternatives considered**:
  - *Dark-mode-only site*: Itemized's app defaults to dark mode, but a marketing website serves readers in bright environments and should respect `prefers-color-scheme`.

### D3: Self-hosted fonts and local brand assets
- **Decision**: Bundle brand assets directly in the repo: copy `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, and `docs/screenshot-inventory.jpg` from `itemizedapp/itemized` into `public/` and `src/assets/` (using Astro's `<Image />` optimization for the screenshot to emit WebP/AVIF + responsive `srcset`), and use self-hosted Inter variable font (or `@fontsource-variable/inter`) with clean system-UI fallback—zero Google Fonts requests.
- **Rationale**: Eliminates third-party network requests (preserving privacy and offline/CI determinism) and guarantees fast Largest Contentful Paint.
- **Alternatives considered**:
  - *Hotlinking raw GitHub URLs*: Fragile, slow, and breaks privacy/availability guarantees.

### D4: Zero-JS core with minimal progressive enhancement
- **Decision**: Implement mobile header navigation and mobile footer link groups using native `<details>`/`<summary>`. Add only two tiny progressive-enhancement inline scripts:
  1. Close open `<details.nav-menu>` on Escape or outside click.
  2. Optional "Copy" button enhancement on code blocks (`<pre>`) on `/self-host/` and `/configuration/` (buttons remain hidden or unobtrusive when JS is off via `.no-js` / `.js` class on `<html>`).
- **Rationale**: Ensures the entire site is 100% readable and navigable with JavaScript disabled while giving desktop/mobile users convenient copy-to-clipboard for Docker Compose / `docker run` commands.

### D5: Structured TypeScript data modules for features and configuration
- **Decision**: Centralize site URLs/metadata in `src/lib/site.ts`, feature groups in `src/lib/features.ts`, and environment variables/printing protocols in `src/lib/config.ts`.
- **Rationale**: Prevents copy drift between the Home page, Features page, Self-Host page, Configuration page, and JSON-LD structured data, making future updates as Itemized evolves straightforward.

### D6: Lightweight Node post-build checks + Playwright verification
- **Decision**: Add lightweight Node scripts in `scripts/checks/` (`links.mjs`, `seo.mjs`, `scripts.mjs`) using `node-html-parser`, wired to `npm run check:dist`, plus Playwright specs in `tests/` (`a11y.spec.ts`, `widths.spec.ts`, `no-js.spec.ts`) using `@axe-core/playwright`.
- **Rationale**: Catches broken internal links, missing meta tags, third-party script leaks, WCAG regressions, and mobile overflow before deployment.

### Route & File Map

```
src/
  assets/
    screenshot-inventory.jpg   # Optimized via astro:assets <Image />
  components/
    SiteHeader.astro           # Sticky header + <details> mobile menu
    SiteFooter.astro           # 3-column desktop / <details> mobile footer
    Icon.astro                 # Inline crisp Lucide-style SVG icons
    CodeBlock.astro            # Styled <pre><code> with progressive Copy button
    JsonLd.astro               # Safe JSON-LD script emitter
  layouts/
    Base.astro                 # HTML shell, meta/OG tags, skip link, header/footer
  lib/
    site.ts                    # Canonical URLs, nav links, repo/demo URLs
    features.ts                # Grouped feature catalog for Home & /features/
    config.ts                  # Env vars, OIDC, LLM, and ZPL printing reference data
  pages/
    index.astro                # /
    features.astro             # /features/
    self-host.astro            # /self-host/
    configuration.astro        # /configuration/
    install.astro              # /install/
    about.astro                # /about/
    security.astro             # /security/
    privacy.astro              # /privacy/
    404.astro                  # /404.html
  styles/
    tokens.css                 # Light/dark CSS custom properties (Itemized indigo + slate)
    site.css                   # Flat editorial layout & components
public/
  favicon.svg                  # From itemizedapp/itemized
  apple-touch-icon.png         # From itemizedapp/itemized
  icon-192.png                 # From itemizedapp/itemized
  og-card.png                  # Static 1200x630 Open Graph preview image
  robots.txt                   # Allow all + Sitemap pointer
scripts/
  checks/
    links.mjs                  # Internal href/src/#anchor validator on dist/
    seo.mjs                    # Title, description, canonical, OG, H1 validator on dist/
    scripts.mjs                # Rejects external third-party scripts in dist/
tests/
  a11y.spec.ts                 # Axe WCAG 2.1 AA across all pages
  widths.spec.ts               # No horizontal overflow at 320/768/1280px
  no-js.spec.ts                # Pages & mobile menu work with JS disabled
```

## Risks / Trade-offs

- **[Single screenshot currently in `itemizedapp/itemized`]** → The upstream repo currently ships one high-resolution inventory screenshot (`docs/screenshot-inventory.jpg`). We will showcase it cleanly in the hero stage (rather than fabricating fake UI mockups) and design the stage container so additional screenshots (mobile scan view, shopping list, ZPL label preview) can be added later with zero layout rework.
- **[Upstream feature/config drift]** → Because Itemized does not yet publish a machine-readable website bundle, environment variables and feature descriptions are maintained in `src/lib/`. Centralizing them in typed modules makes syncing with upstream `README.md` fast and auditable.
- **[Static host trailing-slash differences]** → GitHub Pages, Cloudflare Pages, and Netlify all serve `/<route>/index.html` cleanly when `trailingSlash: 'always'` and `build.format: 'directory'` are configured in Astro, and all internal links use trailing slashes (`/features/`, `/self-host/`, etc.).
- **[Playwright browser binaries in CI/local]** → Keeping `npm run check:dist` (Node-only HTML checks) separate from `npm run test:browser` (Playwright) ensures fast verification even in environments without headless Chromium pre-installed.
