# Design

## Context

See `proposal.md` for motivation and scope. `itemized-website` is a static Astro site whose content is structured across typed data modules (`src/lib/site.ts`, `src/lib/features.ts`, `src/lib/config.ts`) and page templates (`src/pages/*.astro`), with all product screenshots served from `/docs/assets/` via `scripts/fetch-docs.mjs`.

Two existing site-wide invariants govern all copy edits:
- Brand capitalization: lowercase `itemized` everywhere except when `Itemized` begins a sentence (`site-chrome-and-design`).
- Zero em dashes (`—`, `&mdash;`, `&#8212;`, `&#x2014;`) anywhere in rendered marketing HTML, enforced by post-build checks (`static-build-and-verification`).

## Goals / Non-Goals

**Goals:**
- Present universal label printing, the Visual Label Designer, Web Push daily digests, Personal API Tokens / Home Assistant, QR Quick Actions, and recent UX upgrades seamlessly as standard built-in capabilities.
- Keep `src/lib/features.ts` and `src/lib/config.ts` as the single structured data sources for `/features/` and `/configuration/`.
- Keep all screenshots sourced from `/docs/assets/` with zero duplicated images committed in `src/assets/`.

**Non-Goals:**
- Changing the visual design system, typography, color palette, or top-level navigation routes.
- Adding interactive widgets or client-side JavaScript beyond existing progressive enhancements.
- Regenerating screenshots inside the separate `itemized` repository (handled separately in `itemized` and synced via `npm run fetch:docs`).

## Decisions

### 1. Home page (`/`) hardware & automation section layout
- **Decision**: Expand the "Built for real hardware" section (`craftHighlights`) from a 2-column grid (`grid-2`) to a 3-column grid (`grid-3`, matching `dailyWorkflows`) covering:
  1. **Universal label printing & visual label designer** (linking to `/configuration/#printing`)
  2. **Daily push digests & Home Assistant API** (linking to `/features/#notifications-and-integrations`)
  3. **Instant search & keyboard shortcuts** (linking to `/features/#search-and-shortcuts`)
- **Rationale**: Keeps the Home page concise without adding an extra band while giving Web Push and Home Assistant / API Tokens first-class visibility alongside label printing and search.
- **Alternative considered**: Adding a separate Home section for notifications/integrations; rejected to preserve the compact 6-section vertical rhythm.

### 2. Features page (`/features/`) grouping & icon support
- **Decision**:
  - Overhaul `label-printing` in `FEATURE_GROUPS` to focus on the Visual Label Designer, all 6 printer drivers (including single/batch Browser PDF), and label sizing/modes, referencing `/docs/assets/settings-printers.png`.
  - Add a new `notifications-and-integrations` group in `FEATURE_GROUPS` (placed between `label-printing` and `search-and-shortcuts`) covering Web Push daily digests, Personal API Tokens, and Home Assistant / iOS Shortcuts / recipe-app bridges, referencing `/docs/assets/settings-notifications.png`.
  - Add a lightweight `bell` SVG path to `src/components/Icon.astro` for the new group and Home card.
  - Fold Quick Consume, column sorting, math expressions, starter taxonomy, QR Quick Actions, and Light/Dark/System themes into the existing `inventory-and-expiration`, `barcode-and-qr-scanning`, and `accounts-and-sso` groups.
- **Rationale**: Keeps `FEATURE_GROUPS` scannable (8 groups total, each with 2-3 balanced cards) and avoids scattering notifications and API integrations into unrelated sections.

### 3. Configuration page (`/configuration/#printing`) printer driver presentation
- **Decision**: Replace the 2-entry `PRINTER_PROTOCOLS` array in `src/lib/config.ts` with all 6 supported printer drivers rendered in a `grid-3` (2 rows of 3 cards), leading with **Browser Print / PDF (Local Printer)** and **Zebra / ZPL Compatible (Raw TCP :9100)**, followed by **Brother QL**, **Rollo / Munbyn / TSC / iDPRT (TSPL)**, **CUPS / AirPrint / IPP Everywhere**, and **Zebra ZSB Series (IPP ZPL)**. Follow the grid with concise prose subsections for **Label sizes & auto-detection**, **Visual Label Designer**, **Product label modes**, and the existing `BASE_URL` callout.
- **Rationale**: Matches `docs/configure/label-printing.md` in `itemized` 1:1 while using the existing `.grid-3` and `.card` primitives without introducing custom CSS layouts.

### 4. Docs asset sync dependency (`settings-printers.png` and `settings-notifications.png`)
- **Decision**: Run `npm run fetch:docs` during implementation (pulling from sibling `../itemized/dist/docs` locally or the latest release tarball in CI) so `/docs/assets/settings-notifications.png` is present for build/link verification, and keep referencing `/docs/assets/settings-printers.png` with updated alt text and caption for the Visual Label Designer.
- **Rationale**: Once screenshots are regenerated in `itemized`, the next `fetch:docs` sync automatically displays the updated Visual Label Designer screenshot without any further markup changes.

## Risks / Trade-offs

- **[Link check fails if `public/docs/assets/settings-notifications.png` is missing]** -> Run `npm run fetch:docs` before `npm run build` and `npm run check` so the updated local docs bundle (which already contains `settings-notifications.png`) is synced into `public/docs/`.
- **[Temporary screenshot mismatch on `settings-printers.png` until `itemized` screenshots are regenerated]** -> Accepted; the user confirmed they will regenerate screenshots in `itemized` shortly, and the alt text/caption will already match the Visual Label Designer.
- **[Accidental em dash or brand capitalization regression in rewritten copy]** -> Mitigated by running the existing `npm run check` suite (including the automated em-dash check and Playwright checks) after edits.
