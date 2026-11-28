## MODIFIED Requirements

### Requirement: Calm, concrete, accurate marketing voice
All marketing copy SHALL describe only shipped features verified in `itemizedapp/itemized`, presented as standard built-in functionality using concise, concrete, hype-free prose without release-note framing, fabricated testimonials, user counts, or unverified claims.

#### Scenario: Verifying product claims
- **WHEN** a reader reviews feature descriptions on `/` or `/features/`
- **THEN** every described capability corresponds to a shipped feature of itemized (locations, categories, expiration tracking, one-tap quick consume, shopping list, barcode/QR scanning and native-camera QR Quick Actions, OpenFoodFacts + optional LLM lookup, universal multi-vendor label printing and Visual Label Designer, Web Push daily digests, Personal API Tokens and Home Assistant summary endpoint, FTS5 search, keyboard shortcuts, per-user themes, household accounts & OIDC SSO, single Go binary + SQLite)

### Requirement: Home page narrative and calls to action
The Home page (`/`) SHALL present a clear above-the-fold value proposition anchored in itemized's mission to reduce household food waste, primary and secondary CTAs, a real product screenshot stage sourced from the fetched docs bundle, a clear step-by-step workflow from purchase to tracking, daily workflow highlights, hardware and integration highlights, self-hosting ownership pillars, and entry paths to get started.

#### Scenario: First visit hero and live demo CTA
- **WHEN** a visitor lands on `/`
- **THEN** the hero displays a concise headline and lede explaining itemized as a self-hosted household inventory system built with a mission to reduce food waste (including expiration tracking, barcode scanning, shopping list, and universal label printing with a visual label designer), a primary CTA to `https://demo.itemizedapp.com` (noting no login is required and sample data resets hourly), and a secondary CTA to `/self-host/`

#### Scenario: Product screenshot stage
- **WHEN** a visitor views the hero stage on `/`
- **THEN** a crisp, framed screenshot of the real itemized inventory interface is rendered from `/docs/assets/inventory.png` with descriptive alt text, explicit intrinsic dimensions, eager high-priority loading, and responsive sizing, with no manually duplicated inventory screenshot committed in `src/assets/`

#### Scenario: Step-by-step purchase-to-tracking workflow
- **WHEN** a visitor reads the workflow overview on `/`
- **THEN** the page presents the end-to-end 5-step workflow clearly in order:
  1. Scan purchases (using a phone camera PWA or USB/Bluetooth barcode scanner)
  2. Look up product information automatically from OpenFoodFacts
  3. Standardize the product name and merge with existing records via the optional LLM integration
  4. Print custom QR labels to a thermal, AirPrint/CUPS, or local browser PDF printer, or track items directly using their existing UPC barcodes
  5. Track where each item is stored and when it is set to expire, with daily push digests and one-tap updates

#### Scenario: Core story sections
- **WHEN** a visitor scrolls through `/`
- **THEN** the page presents structured sections for:
  1. The 5-step purchase-to-tracking workflow
  2. Daily kitchen and household workflows (stock & expiration tracking with one-tap Quick Consume to reduce food waste, barcode and native-camera QR Quick Action scanning, automatic shopping list)
  3. Hardware, automation, and speed highlights covering:
     - Universal label printing and the Visual Label Designer (3x3 layout grid, live preview, Browser Print / PDF with no special hardware, plus Brother QL, Zebra ZPL/ZSB, Rollo/Munbyn/TSPL, and CUPS/AirPrint)
     - Native Web Push daily digests and Home Assistant / API Token integrations
     - Instant SQLite FTS5 typo-tolerant search and Gmail-style keyboard shortcuts
  4. Ownership and zero-dependency self-hosting (single Go binary, SQLite WAL file, no subscriptions, household accounts & OIDC SSO, optional AI on your terms)
  5. Clear next steps linking to Live Demo, `/self-host/`, `/install/`, and `/features/`

#### Scenario: Structured data on Home page
- **WHEN** a search engine parses `/`
- **THEN** JSON-LD structured data declares `WebSite`, `Organization`, and `SoftwareApplication` entities for itemized with its repository URL, live demo/install links, and free self-hosted offer

### Requirement: Grouped Features page
The Features page (`/features/`) SHALL organize all shipped itemized capabilities into clear, scannable groups with anchor links, concrete details, and framed screenshots sourced from `/docs/assets/` for each UI-backed feature group.

#### Scenario: Browsing feature groups
- **WHEN** a visitor navigates to `/features/`
- **THEN** the page provides an in-page jump index and dedicated sections covering:
  - Stock, Nested Locations & Expiration Tracking (nested locations and categories with onboarding starter taxonomy, due soon and overdue alerts, smart due-date rules for opening/freezing/thawing with rolling-average consumption, one-tap Quick Consume with Undo, server-side sorting across columns, and math expressions in number inputs)
  - Automatic Shopping List (minimum stock levels, one-click manual add, automatic clear on restock)
  - Mobile & USB Barcode / QR Scanning (camera PWA, USB/Bluetooth scanners, unified Scan / Action workflow for Purchase, Consume, Open, Transfer, Location Audit, native-camera QR Quick Action screens for `/go/i/:id`, `/go/p/:id`, and `/go/l/:id`, ignoring manufacturer QR codes during UPC scans, OpenFoodFacts product lookup, and optional Anthropic/OpenAI/Gemini/Ollama LLM standardization and merging)
  - Universal Label Printing & Visual Label Designer (3x3 anchor grid Visual Label Designer with per-field alignment, font size, bold, icons, live preview across printers and label sizes, item/product/location templates; 6 printer drivers including single and multi-page batch Browser Print / PDF, Brother QL, Zebra ZPL `:9100`, Zebra ZSB IPP, TSPL `:9100`, and CUPS/AirPrint IPP PDF; IPP roll-size auto-detect, presets, and custom `mm`/`in` dimensions; product label modes `none`, `per_item`, and `per_product`; and a link to `/configuration/#printing`)
  - Notifications & Integrations (native Web Push VAPID daily digests for Expiring/Overdue and Shopping List with per-user device enrollment and custom send time; long-lived Personal API Tokens stored as SHA-256 hashes; dedicated `GET /api/summary` endpoint for Home Assistant REST sensors without HACS, iOS Shortcuts, Mealie/Tandoor bridges, and scripts)
  - Instant Search & Keyboard Shortcuts (SQLite FTS5 trigram typo-tolerant search, Gmail-style shortcuts `g i`, `g s`, `g d`, `g o`, `g a`, `n`, `?`)
  - Household Accounts, Preferences & SSO (Admin/Member roles, per-user Light/Dark/System appearance themes and Quick Actions preference, local password auth, OIDC SSO with Authentik/Authelia/Pocket ID/Keycloak, PKCE, auto-provisioning, and force-OIDC)
  - Zero-Dependency Self-Hosting (single Go binary, embedded React SPA, single SQLite WAL database, `linux/amd64` and `linux/arm64` containers, Unraid Community Apps template)

#### Scenario: Viewing docs-sourced feature screenshots
- **WHEN** a visitor scrolls through the UI-backed feature groups on `/features/`
- **THEN** each visual feature group renders framed, captioned screenshot(s) directly from `/docs/assets/` (`due-soon.png` and `locations.png` for inventory/expiration, `shopping-list.png` for restocking, `scanner.png` for scanning, `settings-printers.png` for universal label printing and the Visual Label Designer, `settings-notifications.png` for notifications and integrations, `search.png` for search/shortcuts, and `settings.png` for household/SSO) with descriptive alt text, explicit dimensions, lazy loading, and zero horizontal overflow across mobile, tablet, and desktop widths
