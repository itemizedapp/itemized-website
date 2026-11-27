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
The Home page (`/`) SHALL present a clear above-the-fold value proposition anchored in Itemized's mission to reduce household food waste, primary and secondary CTAs, a real product screenshot stage sourced from the fetched docs bundle, a clear step-by-step workflow from purchase to tracking, daily workflow highlights, self-hosting ownership pillars, and entry paths to get started.

#### Scenario: First visit hero and live demo CTA
- **WHEN** a visitor lands on `/`
- **THEN** the hero displays a concise headline and lede explaining Itemized as a self-hosted household inventory system built with a mission to reduce food waste, a primary CTA to `https://demo.itemizedapp.com` (noting no login is required and sample data resets hourly), and a secondary CTA to `/self-host/`

#### Scenario: Product screenshot stage
- **WHEN** a visitor views the hero stage on `/`
- **THEN** a crisp, framed screenshot of the real Itemized inventory interface is rendered from `/docs/assets/inventory.png` with descriptive alt text, explicit intrinsic dimensions, eager high-priority loading, and responsive sizing, with no manually duplicated inventory screenshot committed in `src/assets/`

#### Scenario: Step-by-step purchase-to-tracking workflow
- **WHEN** a visitor reads the workflow overview on `/`
- **THEN** the page presents the end-to-end 5-step workflow clearly in order:
  1. Scan purchases (using a phone camera PWA or USB/Bluetooth barcode scanner)
  2. Look up product information automatically from OpenFoodFacts
  3. Standardize the product name and merge with existing records via the optional LLM integration
  4. Print an individual barcode label if you have a Zebra label printer—or track the item directly using its existing UPC barcode
  5. Track where the item is stored and when it is set to expire

#### Scenario: Core story sections
- **WHEN** a visitor scrolls through `/`
- **THEN** the page presents structured sections for:
  1. The 5-step purchase-to-tracking workflow
  2. Daily kitchen and household workflows (stock & expiration tracking to reduce food waste, barcode scanning, automatic shopping list)
  3. Direct LAN label printing (emphasizing networked Raw TCP `:9100` Zebra ZPL printers with example models, mentioning Zebra ZSB IPP support secondarily, and noting UPC barcodes work without a printer) and fast search/shortcuts
  4. Ownership and zero-dependency self-hosting (single Go binary, SQLite WAL file, no subscriptions, optional OIDC SSO and local Ollama/LLM)
  5. Clear next steps linking to Live Demo, `/self-host/`, `/install/`, and `/features/`

#### Scenario: Structured data on Home page
- **WHEN** a search engine parses `/`
- **THEN** JSON-LD structured data declares `WebSite`, `Organization`, and `SoftwareApplication` entities for Itemized with its repository URL, live demo/install links, and free self-hosted offer

### Requirement: Grouped Features page
The Features page (`/features/`) SHALL organize all shipped Itemized capabilities into clear, scannable groups with anchor links, concrete details, and framed screenshots sourced from `/docs/assets/` for each UI-backed feature group.

#### Scenario: Browsing feature groups
- **WHEN** a visitor navigates to `/features/`
- **THEN** the page provides an in-page jump index and dedicated sections covering:
  - Stock, Nested Locations & Expiration Tracking (due soon, overdue, opening/freezing/thawing rules, rolling-average consumption, helping households use food before it goes to waste)
  - Automatic Shopping List (minimum stock levels, one-click manual add, automatic clear on restock)
  - Mobile & USB Barcode / QR Scanning (camera PWA, USB/Bluetooth scanners, unified Scan/Action workflow for Purchase, Consume, Open, Transfer, Location Audit, OpenFoodFacts product lookup, optional Anthropic/OpenAI/Gemini/Ollama LLM standardization and merging with existing records, and tracking via either printed individual barcodes or existing UPC barcodes)
  - Direct LAN Label Printing (emphasizing networked Raw TCP `:9100` Zebra ZPL printers with example models, mentioning Zebra ZSB over IPP secondarily with a link to `https://www.zebra.com/content/smb/us/en.html`, customizable Go-template ZPL layouts, no companion print server, and a link to `/configuration/#printing` for full printer details)
  - Instant Search & Keyboard Shortcuts (SQLite FTS5 trigram typo-tolerant search, Gmail-style shortcuts `g i`, `g s`, `g d`, `g o`, `g a`, `n`, `?`)
  - Household Accounts & SSO (Admin/Member roles, local password auth, OIDC SSO with Authentik/Authelia/Pocket ID/Keycloak and auto-provisioning)
  - Zero-Dependency Self-Hosting (single Go binary, embedded React SPA, single SQLite WAL database, `linux/amd64` and `linux/arm64` containers, Unraid template)

#### Scenario: Viewing docs-sourced feature screenshots
- **WHEN** a visitor scrolls through the UI-backed feature groups on `/features/`
- **THEN** each visual feature group renders framed, captioned screenshot(s) directly from `/docs/assets/` (`due-soon.png` and `locations.png` for inventory/expiration, `shopping-list.png` for restocking, `scanner.png` for scanning, `settings-printers.png` for label printing, `search.png` for search/shortcuts, and `settings.png` for household/SSO) with descriptive alt text, explicit dimensions, lazy loading, and zero horizontal overflow across mobile, tablet, and desktop widths
