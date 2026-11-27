# Design

## Context

`itemized-website` is a static Astro site (`src/pages/`, `src/lib/`, `src/styles/site.css`) with zero client-side JavaScript requirements and automated Playwright checks for accessibility (`tests/a11y.spec.ts`), no-JS rendering (`tests/no-js.spec.ts`), and responsive widths without horizontal overflow (`tests/widths.spec.ts`). See `proposal.md` for motivation and the delta specs for behavioral requirements.

## Goals / Non-Goals

**Goals:**
- Present the 5-step purchase-to-tracking workflow prominently and scannably on `/` using semantic HTML (`<ol>`) and existing design tokens (`src/styles/tokens.css`, `src/styles/site.css`).
- Provide practical, accurate Zebra printer hardware guidance on `/configuration/#printing` (with concise callouts on `/` and `/features/`), linking to Zebra ZSB as the most affordable entry point and listing concrete Raw TCP `:9100` ZPL examples.
- Thread the mission to reduce household food waste consistently across `/` (hero & metadata), `/about/` (dedicated mission section), and `/features/` (inventory/expiration framing), while keeping the site's calm, concrete, hype-free voice.

**Non-Goals:**
- Adding client-side JavaScript, interactive calculators, or affiliate/price-tracking widgets.
- Modifying the upstream docs bundle in `public/docs/`.
- Adding new top-level navigation pages; all updates fit cleanly into existing routes (`/`, `/features/`, `/configuration/`, `/about/`).

## Decisions

### 1. 5-step workflow placement and markup on `/`
- **Decision**: Place a dedicated numbered "How it works" section immediately after the hero stage on `/` (before the daily workflow cards), using a semantic ordered list (`<ol class="workflow-steps">`) styled with numbered step badges that collapse cleanly from a responsive multi-column grid on desktop to a vertical timeline/stack on mobile.
- **Steps**:
  1. **Scan purchases** — Scan retail barcodes with your phone camera (PWA) or a USB/Bluetooth scanner as you unpack groceries.
  2. **Look up product info** — Itemized automatically fetches product details from OpenFoodFacts.
  3. **Standardize & merge with AI** — Optional LLM integration cleans up messy retail titles and merges items with your existing product records.
  4. **Print a label—or keep the UPC** — If you have a Zebra label printer, Itemized prints an individual barcode label; otherwise, track the item directly using its existing UPC barcode.
  5. **Track location & expiration** — Record where it is stored (pantry, fridge, freezer) and when it is set to expire so you use it before it goes to waste.
- **Alternative considered**: Folding all 5 steps into the existing 3-card `dailyWorkflows` grid. Rejected because a 3-card grid obscures the sequential purchase-to-pantry flow.

### 2. Supported Zebra label printers data and link
- **Decision**: Centralize the Zebra Small Business / ZSB URL (`https://www.zebra.com/content/smb/us/en.html`) in `src/lib/site.ts` and structure `PRINTER_PROTOCOLS` in `src/lib/config.ts` so `/configuration/#printing` renders:
  - **Networked Zebra ZPL Printers (Raw TCP `:9100` — Recommended)**: Primary option listing concrete examples of Ethernet/Wi-Fi Zebra printers supporting ZPL over port `9100` — **ZD411**, **ZD421**, **ZD621**, networked **ZD220 / ZD230**, legacy networked **GK420d / GX420d** (widely available on the used market), and industrial **ZT231**, noting that any networked Zebra printer supporting ZPL over TCP port `9100` works without a companion print server.
  - **Zebra ZSB Series (IPP — Discontinued, still supported)**: Secondary option noting that while Zebra has discontinued the ZSB Series (ZSB-DP12 / ZSB-DP14), existing owners can still print directly over IPP (`http://<printer-ip>:631/ipp/print`), with an external link (`rel="noopener noreferrer"`) to `https://www.zebra.com/content/smb/us/en.html`.
  - **No printer required**: Explicitly notes that printing individual barcode labels is optional and users can track stock using existing retail UPC barcodes.
- **Alternative considered**: Leading with Zebra ZSB as the cheapest new option. Rejected because the ZSB Series has been discontinued, so standard networked Zebra ZPL (`:9100`) printers are the primary durable recommendation.

### 3. Food-waste reduction mission framing
- **Decision**:
  - On `/`: Update the hero headline/lede and page meta description to center the mission of reducing household food waste by knowing what is in your pantry, fridge, and freezer and when it expires.
  - On `/about/`: Add a clear "Our mission" section at the top of the page body explaining that Itemized exists to help households cut down on food waste—by making it fast to track what you bought, where you put it, and what needs to be used next—before the existing Design Principles and Open Source sections.
  - On `/features/`: Keep the calm, concrete voice while reinforcing in the Inventory & Expiration and Scanning sections how the workflow prevents forgotten food from spoiling.

## Risks / Trade-offs

- **External link rot (`zebra.com/content/smb/us/en.html`)** → Keep the Zebra SMB/ZSB URL centralized in `src/lib/site.ts` for easy future updates and verify reachability during implementation.
- **Responsive layout overflow on 5-step workflow** → Use CSS Grid with `minmax(0, 1fr)` and test at all widths covered by `tests/widths.spec.ts` (mobile, tablet, desktop) plus `tests/a11y.spec.ts` and `tests/no-js.spec.ts`.
- **Voice drift toward hype** → Keep mission copy concrete and grounded (focusing on practical household habits and shipped features, with no invented food-waste statistics or unverified claims).
