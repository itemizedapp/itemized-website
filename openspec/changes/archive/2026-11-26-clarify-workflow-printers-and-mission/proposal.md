# Proposal

## Why

Visitors landing on `itemizedapp.com` currently see individual features (inventory, scanning, label printing) but not a clear, step-by-step picture of how a grocery trip flows through Itemized from scanning a barcode to tracking expiration dates—nor do they see our core mission to reduce household food waste or enough practical guidance on which Zebra label printers to buy. Clarifying the end-to-end workflow, elevating the food-waste reduction mission, and expanding supported printer guidance (emphasizing standard networked Raw TCP `:9100` Zebra ZPL printers and noting continued IPP support for the discontinued Zebra ZSB Series) makes the value proposition immediately understandable for new users.

## What Changes

- **Explicit 5-step workflow**: Present the end-to-end household intake and tracking workflow clearly on the Home page (`/`) and reinforce it on `/features/`:
  1. Scan purchases (phone camera PWA or USB/Bluetooth scanner).
  2. Look up product information automatically from OpenFoodFacts.
  3. Standardize the product name and merge with existing records via the optional LLM integration.
  4. Print an individual barcode label if you have a Zebra label printer—or track the item directly using its existing UPC barcode.
  5. Track where the item is stored and when it is set to expire.
- **Expanded supported label printer guidance**: Add clearer hardware details on `/configuration/#printing` (and concise references on `/` and `/features/`):
  - Emphasize standard networked Zebra printers that support Raw TCP ZPL over port `9100` (such as ZD411, ZD421, ZD621, networked ZD220/ZD230, legacy networked GK420d/GX420d, and ZT231) as the recommended option.
  - Mention the **Zebra ZSB Series** (IPP) secondarily as discontinued by Zebra yet still supported if you already own one, linking to `https://www.zebra.com/content/smb/us/en.html`.
  - Clarify that a label printer is optional and existing UPC barcodes can be used for tracking.
- **Food-waste reduction mission**: Establish reducing household food waste as Itemized's core mission across the Home page (`/`) and About page (`/about/`), connecting inventory visibility, storage location tracking, and expiration alerts directly to using food before it spoils.

## Capabilities

### New Capabilities

None. All changes refine existing website content and specification requirements.

### Modified Capabilities

- `landing-and-features`: Add the explicit 5-step purchase-to-tracking workflow, weave the food-waste reduction mission into the Home page narrative, and clarify optional Zebra label printing vs. UPC tracking plus supported printer examples on `/` and `/features/`.
- `self-hosting-and-setup`: Expand the Zebra label printing section on `/configuration/` to emphasize standard networked Zebra printers supporting ZPL over TCP port `9100`, note continued IPP support for the discontinued Zebra ZSB Series with a link to `https://www.zebra.com/content/smb/us/en.html`, and note that existing UPC barcodes work without a printer.
- `project-and-trust-pages`: Add Itemized's mission to reduce household food waste to the About page (`/about/`).

## Impact

- **Pages & Data Modules**:
  - `src/pages/index.astro` (mission framing in hero/copy, dedicated 5-step "How it works" workflow section, printer/UPC clarity)
  - `src/pages/features.astro` and `src/lib/features.ts` (reinforce LLM standardization/merging, optional Zebra label vs. UPC tracking, and printer examples)
  - `src/pages/configuration.astro` and `src/lib/config.ts` (expanded supported Zebra printers info, ZSB link, Raw TCP `:9100` model examples)
  - `src/pages/about.astro` (explicit food-waste reduction mission statement)
  - `src/lib/site.ts` (tagline/metadata alignment and external Zebra ZSB URL constant)
  - `src/styles/site.css` (responsive styling for the 5-step workflow list/cards if needed)
- **Specs & Tests**:
  - Delta specs under `openspec/changes/clarify-workflow-printers-and-mission/specs/`
  - Existing Playwright tests (`tests/a11y.spec.ts`, `tests/no-js.spec.ts`, `tests/widths.spec.ts`) remain compatible and should be re-run to verify no overflow, accessibility, or no-JS regressions.
