# Spec Delta

## Purpose

Defines the static build output requirements for hosting on GitHub Pages, Cloudflare Pages, or Netlify, and the automated verification checks that keep the built site valid, accessible, and free of regressions.

## ADDED Requirements

### Requirement: Portable static build output
The project SHALL build to a self-contained static `dist/` directory that can be deployed directly to GitHub Pages, Cloudflare Pages, or Netlify without a custom server runtime.

#### Scenario: Building for static hosting
- **WHEN** `npm run build` is executed
- **THEN** `dist/` contains clean directory-based HTML pages (`/<route>/index.html`), `/404.html`, `/robots.txt`, `/sitemap-index.xml`, self-hosted assets (favicon, icons, screenshots, stylesheets), and zero server-side runtime dependencies

### Requirement: Automated post-build HTML, link, and SEO verification
The project SHALL provide automated check scripts that inspect the built `dist/` output and fail on broken internal links, missing SEO metadata, or unexpected third-party scripts.

#### Scenario: Internal link integrity check
- **WHEN** the post-build link check runs against `dist/`
- **THEN** every internal `href`, `src`, and `#fragment` anchor resolves to an existing file or element ID in `dist/`, failing with a clear report if any link is broken

#### Scenario: SEO and metadata check
- **WHEN** the post-build SEO check runs against `dist/`
- **THEN** every public HTML page (excluding `404.html`) has a unique `<title>`, a non-empty `<meta name="description">`, a canonical URL, Open Graph tags, and a single `<h1>`

#### Scenario: Script hygiene check
- **WHEN** the post-build script check runs against `dist/`
- **THEN** no external third-party `<script src="http...">` tags exist in the built HTML

### Requirement: Responsive and no-JS browser verification
The project SHALL include automated verification confirming pages render without horizontal overflow across mobile/tablet/desktop widths, remain navigable with JavaScript disabled, and pass automated accessibility checks.

#### Scenario: Running automated browser checks
- **WHEN** browser verification tests execute against the built `dist/` site
- **THEN** all core routes pass axe-core WCAG 2.1 AA checks, show zero horizontal overflow at 320px/768px/1280px, and keep navigation and copy-code/disclosure controls usable with JavaScript disabled
