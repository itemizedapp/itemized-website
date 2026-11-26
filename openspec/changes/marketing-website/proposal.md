# Proposal

## Why

Itemized (`https://github.com/itemizedapp/itemized`) is a self-hosted household inventory management system with a live demo at `https://demo.itemizedapp.com`, but it currently has no dedicated marketing website at `https://itemizedapp.com`. Prospective users and self-hosters need a fast, calm, well-structured static website to understand what Itemized does, try the live demo, and deploy it on their own hardware.

## What Changes

- Create a static Astro marketing website for Itemized (`https://itemizedapp.com`) that builds to a portable `dist/` directory ready for static hosts (GitHub Pages, Cloudflare Pages, or Netlify).
- Establish a flat, high-contrast editorial visual design system adapted to Itemized's brand identity (indigo `#6366f1`/`#4338ca` accent, Inter typography, crisp borders, generous whitespace, automatic light/dark `prefers-color-scheme` support, and calm, concrete, hype-free copy).
- Implement the core marketing pages:
  - Home (`/`) with hero, live demo CTA, product screenshot stage, daily workflow highlights, ownership/self-hosting pillars, and quick entry paths.
  - Features (`/features/`) organized by capability group (stock & expiration tracking, automatic shopping list, barcode/QR scanning & lookup, direct LAN Zebra ZPL label printing, instant search & keyboard shortcuts, household accounts & OIDC SSO, and single-binary architecture).
  - Self-Host / Quick Start (`/self-host/`) covering Docker Compose, Docker Run, Unraid Community Apps, and HTTPS reverse proxy setup.
  - Configuration & Printing (`/configuration/`) documenting all environment variables, OIDC SSO, optional AI/LLM UPC normalization, and direct LAN Zebra ZSB (IPP) / Raw TCP (`:9100`) ZPL printing.
  - Mobile PWA / Install (`/install/`) guiding iOS, Android, and desktop PWA installation and explaining the HTTPS requirement for mobile camera barcode scanning.
  - Project & trust pages: About (`/about/`), Security (`/security/`), Privacy (`/privacy/`), and a custom 404 page (`/404.html`).
- Add static-site SEO and syndication foundations: canonical URLs, Open Graph / Twitter metadata, JSON-LD structured data (`WebSite`, `Organization`, `SoftwareApplication`), XML sitemap, and `robots.txt`.
- Add automated build-time and browser verification checks (type/Astro checks, internal link validation, SEO metadata validation, and accessibility/no-JS checks).

## Capabilities

### New Capabilities
- `site-chrome-and-design`: Global design tokens, responsive header/footer navigation, light/dark theme support, accessibility, zero-JS progressive enhancement, SEO metadata, sitemap, `robots.txt`, and 404 handling.
- `landing-and-features`: Home landing page (`/`) and grouped features showcase (`/features/`) accurately presenting Itemized's shipped features, product visuals, and live demo / GitHub calls to action.
- `self-hosting-and-setup`: Self-hosting quick start (`/self-host/`), environment & label-printing configuration reference (`/configuration/`), and mobile/desktop PWA installation guide (`/install/`).
- `project-and-trust-pages`: About (`/about/`), Security (`/security/`), and Privacy (`/privacy/`) pages covering project ownership, self-hosted data privacy, zero third-party tracking, and security reporting.
- `static-build-and-verification`: Portable static `dist/` build output for static hosting platforms (GitHub Pages, Cloudflare Pages, Netlify) and automated post-build verification checks (links, SEO, scripts, and accessibility).

### Modified Capabilities
<!-- None; this is a greenfield website repository. -->

## Impact

- New Astro project scaffold in `/Users/hagerman/Code/itemized-website` (`package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `public/`, `scripts/`, `tests/`).
- No backend services, databases, or runtime server infrastructure required; deploys purely as static files from `dist/`.
- No third-party analytics, ad trackers, or external font CDNs loaded at runtime (privacy-first and fast by default).
- Brand assets (favicon SVG, icons, and product screenshot) sourced from `https://github.com/itemizedapp/itemized`.
