# Proposal

## Why

The `itemized` application has expanded well beyond Zebra-only ZPL printing and now ships with universal multi-vendor label printing, a Visual Label Designer, native Web Push daily digests, Personal API Tokens with Home Assistant integration, native-camera QR Quick Actions, and everyday UX improvements. The marketing website still describes Zebra ZPL and Go-template ZPL as the sole printing path, omits these shipped capabilities, and carries a stale Unraid template link and outdated contribution wording. Updating the site so these capabilities are presented naturally as standard built-in functionality keeps `itemizedapp.com` accurate and cohesive.

## What Changes

- **Home page (`/`) and site metadata (`src/lib/site.ts`)**:
  - Replace Zebra-only ZPL framing in site tagline, hero, workflow step 4, and hardware highlights with universal label printing and the Visual Label Designer (including Browser Print / PDF with no special hardware required).
  - Incorporate one-tap Quick Consume, native-camera QR Quick Actions, daily Web Push notifications, and Personal API Tokens / Home Assistant integration naturally as standard functionality.
- **Features page (`/features/`) and `src/lib/features.ts`**:
  - Overhaul the Labels group to showcase the Visual Label Designer (3x3 anchor grid, per-field typography/icons, live preview by printer/label size, item/product/location templates), all 6 printer drivers (including single and multi-page batch Browser PDF), label size presets + IPP auto-detect, and product label modes (`none`, `per_item`, `per_product`).
  - Add a **Notifications & Integrations** feature group covering native Web Push (VAPID) daily digests (Expiring/Overdue and Shopping List) with `/docs/assets/settings-notifications.png`, Personal API Tokens (`itm_...`), Home Assistant REST summary (`GET /api/summary`), iOS Shortcuts, and Mealie/Tandoor bridges.
  - Fold shipped everyday capabilities into existing groups: one-tap Quick Consume with Undo, server-side column sorting, math expressions in number inputs, onboarding starter taxonomy, native-camera QR Quick Action screens (`/go/i/:id`, `/go/p/:id`, `/go/l/:id`), QR-ignore during UPC scans, and per-user Light / Dark / System theme preferences.
- **Configuration & Label Printing page (`/configuration/`) and `src/lib/config.ts`**:
  - Replace the Zebra-only printing section and Go-template ZPL copy with a Universal Label Printing & Visual Label Designer reference covering all 6 printer drivers, label sizing options (IPP auto-detect, built-in presets, custom `mm`/`in`, DPI, die-cut/continuous), product label modes, and the 3x3 Visual Label Designer.
- **Self-Host (`/self-host/`) and Install (`/install/`) pages**:
  - Update the Unraid template URL to `https://github.com/itemizedapp/itemized-unraid` and generalize the LAN printer bridge-networking note to cover all supported LAN printer protocols (`:9100` and `:631`).
  - Note on `/install/` that HTTPS and iOS Home Screen installation also enable native Web Push daily digest notifications.
- **Project & Trust pages (`/about/`, `/security/`, `/privacy/`)**:
  - Update `/about/` to reflect universal label printing and align the GitHub contribution policy with `itemized/README.md` (bug reports and feature ideas welcome; external PRs not accepted).
  - Update `/security/` to document SHA-256 hashed Personal API Tokens (working even with `OIDC_FORCE=true`) and HTTPS requirements for Web Push.
  - Update `/privacy/` to reflect optional outbound Web Push delivery and general LAN printers.

## Capabilities

### New Capabilities

_(None. All changes update requirements in existing website capability specs.)_

### Modified Capabilities

- `landing-and-features`: Update Home (`/`) and Features (`/features/`) requirements to reflect universal label printing with the Visual Label Designer, Web Push daily digests, Personal API Tokens / Home Assistant integration, QR Quick Actions, and everyday UX improvements as standard functionality.
- `self-hosting-and-setup`: Update Self-Host (`/self-host/`), Configuration & Label Printing (`/configuration/`), and Install (`/install/`) requirements for the 6 printer drivers, Visual Label Designer, updated `itemized-unraid` repository link, and Web Push PWA prerequisites.
- `project-and-trust-pages`: Update About (`/about/`), Security (`/security/`), and Privacy (`/privacy/`) requirements for universal label printing, the non-PR contribution policy, Personal API Tokens, and optional Web Push / LAN printer data flows.

## Impact

- Website content and data modules: `src/lib/site.ts`, `src/lib/features.ts`, `src/lib/config.ts`, `src/components/Icon.astro` (if a bell/notifications icon is added).
- Website pages: `src/pages/index.astro`, `src/pages/features.astro`, `src/pages/configuration.astro`, `src/pages/self-host.astro`, `src/pages/install.astro`, `src/pages/about.astro`, `src/pages/security.astro`, `src/pages/privacy.astro`.
- Docs bundle assets: `/docs/assets/settings-notifications.png` (already present in `itemized` docs) and `/docs/assets/settings-printers.png` (will reflect the Visual Label Designer once screenshots are regenerated in `itemized` and fetched via `npm run fetch:docs`).
- Verification: existing post-build link, SEO, em-dash, and Playwright accessibility/responsive checks in `npm run check`.
