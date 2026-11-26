# Spec Delta

## Purpose

Defines the site-wide visual design system, shared navigation chrome, accessibility standards, progressive enhancement, and SEO/discovery metadata for the Itemized marketing website.

## ADDED Requirements

### Requirement: Site-wide visual design and light/dark theme support
The website SHALL present a calm, flat, high-contrast editorial visual design with crisp borders, generous whitespace, Inter typography, Itemized's indigo brand palette (`#6366f1` / `#4338ca` accent), and automatic light and dark color schemes following the visitor's system `prefers-color-scheme` preference.

#### Scenario: Visitor loads any page in light or dark mode
- **WHEN** a visitor opens any page with system color scheme set to light or dark
- **THEN** background, surface, border, body text, muted text, and accent link/button colors adapt automatically via CSS custom properties while maintaining WCAG AA contrast ratios

#### Scenario: Reduced motion preference
- **WHEN** a visitor has `prefers-reduced-motion: reduce` enabled
- **THEN** decorative transitions and animations are suppressed or kept static

### Requirement: Responsive header and footer chrome
Every page SHALL render a consistent top header and site footer with keyboard-accessible navigation that works without JavaScript.

#### Scenario: Desktop header navigation
- **WHEN** a visitor views the site on a desktop viewport
- **THEN** the header displays the Itemized mark and wordmark linking to `/`, primary navigation links (`Features`, `Self-Host`, `Configuration`, `Install`), a GitHub link, and a primary `Try Live Demo` call to action linking to `https://demo.itemizedapp.com`

#### Scenario: Mobile navigation without JavaScript
- **WHEN** a visitor views the site on a narrow mobile viewport with JavaScript disabled
- **THEN** the mobile menu opens and closes using native HTML `<details>`/`<summary>` disclosure controls and exposes all primary navigation links and CTAs

#### Scenario: Footer structure
- **WHEN** a visitor scrolls to the footer on any page
- **THEN** the footer displays the Itemized brand summary, grouped navigation links (`Product`, `Setup`, `Project`), a quiet community/source row (GitHub repository, Releases, Issues, Live Demo), and a copyright/privacy note

### Requirement: Accessibility and semantic structure
Every page SHALL provide a skip-to-content link, a single `<main id="main">` landmark, proper heading hierarchy starting with a single `<h1>`, visible `:focus-visible` outlines, and descriptive `alt` text for meaningful images.

#### Scenario: Keyboard skip navigation
- **WHEN** a keyboard user presses Tab upon landing on any page
- **THEN** a "Skip to content" link receives focus and jumps directly to `#main`

#### Scenario: Automated accessibility audit
- **WHEN** automated accessibility checks run against rendered pages
- **THEN** there are zero serious or critical WCAG 2.1 AA violations and no horizontal overflow at 320px, 768px, or 1280px viewports

### Requirement: SEO metadata, structured data, sitemap, and 404 page
Every public page SHALL emit canonical URLs, unique `<title>` and `<meta name="description">`, Open Graph and Twitter card metadata, and favicon/touch icons; the site SHALL also publish `/sitemap-index.xml`, `/robots.txt`, and a helpful `/404.html` page.

#### Scenario: Social preview and search engine metadata
- **WHEN** a crawler or social unfurler fetches any public page
- **THEN** the HTML `<head>` contains a canonical link rooted at `https://itemizedapp.com`, unique title and description, `og:title`, `og:description`, `og:image`, `og:url`, and `twitter:card` tags

#### Scenario: Unknown route
- **WHEN** a visitor requests a non-existent path
- **THEN** the custom 404 page explains that the page was not found and offers clear links back to Home, Features, and Self-Host
