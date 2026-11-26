# landing-and-features Specification

## Purpose

Defines the content, structure, and user journeys for the Itemized Home page (`/`) and Features page (`/features/`), showcasing Itemized's shipped capabilities in calm, concrete prose.

## Requirements

### Requirement: Calm, concrete, accurate marketing voice
All marketing copy SHALL describe only shipped features verified in `itemizedapp/itemized`, using concise, concrete, hype-free prose without fabricated testimonials, user counts, or unverified claims.

#### Scenario: Verifying product claims
- **WHEN** a reader reviews feature descriptions on `/` or `/features/`
- **THEN** every described capability corresponds to a shipped feature of Itemized (locations, categories, expiration tracking, shopping list, barcode/QR scanning, OpenFoodFacts + optional LLM lookup, Zebra ZSB IPP / Raw TCP ZPL printing, FTS5 search, keyboard shortcuts, household accounts & OIDC SSO, single Go binary + SQLite)

### Requirement: Home page narrative and calls to action
The Home page (`/`) SHALL present a clear above-the-fold value proposition, primary and secondary CTAs, a real product screenshot stage, daily workflow highlights, self-hosting ownership pillars, and entry paths to get started.

#### Scenario: First visit hero and live demo CTA
- **WHEN** a visitor lands on `/`
- **THEN** the hero displays a concise headline and lede explaining Itemized as a self-hosted household inventory system, a primary CTA to `https://demo.itemizedapp.com` (noting no login is required and sample data resets hourly), and a secondary CTA to `/self-host/`

#### Scenario: Product screenshot stage
- **WHEN** a visitor views the hero stage on `/`
- **THEN** a crisp, framed screenshot of the real Itemized inventory interface is rendered with descriptive alt text and responsive image sizing

#### Scenario: Core story sections
- **WHEN** a visitor scrolls through `/`
- **THEN** the page presents structured sections for:
  1. Daily kitchen and household workflows (stock & expiration tracking, barcode scanning, automatic shopping list)
  2. Direct LAN label printing and fast search/shortcuts
  3. Ownership and zero-dependency self-hosting (single Go binary, SQLite WAL file, no subscriptions, optional OIDC SSO and local Ollama/LLM)
  4. Clear next steps linking to Live Demo, `/self-host/`, `/install/`, and `/features/`

#### Scenario: Structured data on Home page
- **WHEN** a search engine parses `/`
- **THEN** JSON-LD structured data declares `WebSite`, `Organization`, and `SoftwareApplication` entities for Itemized with its repository URL, live demo/install links, and free self-hosted offer

### Requirement: Grouped Features page
The Features page (`/features/`) SHALL organize all shipped Itemized capabilities into clear, scannable groups with anchor links and concrete details.

#### Scenario: Browsing feature groups
- **WHEN** a visitor navigates to `/features/`
- **THEN** the page provides an in-page jump index and dedicated sections covering:
  - Stock, Nested Locations & Expiration Tracking (due soon, overdue, opening/freezing/thawing rules, rolling-average consumption)
  - Automatic Shopping List (minimum stock levels, one-click manual add, automatic clear on restock)
  - Mobile & USB Barcode / QR Scanning (camera PWA, USB/Bluetooth scanners, unified Scan/Action workflow for Purchase, Consume, Open, Transfer, Location Audit, OpenFoodFacts lookup, optional Anthropic/OpenAI/Gemini/Ollama AI naming)
  - Direct LAN Label Printing (Zebra ZSB over IPP, Raw TCP `:9100` ZPL printers, customizable Go-template ZPL layouts, no companion print server)
  - Instant Search & Keyboard Shortcuts (SQLite FTS5 trigram typo-tolerant search, Gmail-style shortcuts `g i`, `g s`, `g d`, `g o`, `g a`, `n`, `?`)
  - Household Accounts & SSO (Admin/Member roles, local password auth, OIDC SSO with Authentik/Authelia/Pocket ID/Keycloak and auto-provisioning)
  - Zero-Dependency Self-Hosting (single Go binary, embedded React SPA, single SQLite WAL database, `linux/amd64` and `linux/arm64` containers, Unraid template)
