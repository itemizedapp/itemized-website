# Tasks

## 1. Shared Data & Mission Copy

- [x] 1.1 Update `src/lib/site.ts` to add the Zebra Small Business / ZSB URL (`https://www.zebra.com/content/smb/us/en.html`) and align `SITE.tagline` with Itemized's mission to reduce household food waste; verify TypeScript compilation via `npm run build`.
- [x] 1.2 Expand `src/lib/config.ts` printer metadata (`PRINTER_PROTOCOLS`) to lead with networked Raw TCP `:9100` Zebra ZPL printers (`Recommended`, listing ZD411, ZD421, ZD621, networked ZD220/ZD230, legacy networked GK420d/GX420d, ZT231), list the Zebra ZSB Series (`ZSB-DP12` / `ZSB-DP14`) secondarily as discontinued yet still supported over IPP with the `https://www.zebra.com/content/smb/us/en.html` link, and note that UPC barcode tracking works without a printer; verify build output succeeds.

## 2. Home Page Workflow, Mission & Styling

- [x] 2.1 Add responsive CSS for the numbered 5-step workflow list (`.workflow-steps`) in `src/styles/site.css` using existing design tokens and `minmax(0, 1fr)` grid tracks so it displays cleanly across mobile, tablet, and desktop widths without horizontal overflow.
- [x] 2.2 Update `src/pages/index.astro` to frame the hero headline/lede around reducing household food waste, add the dedicated 5-step "How it works" workflow section (1. Scan purchases, 2. OpenFoodFacts product lookup, 3. LLM product name standardization and merging with existing records, 4. Optional Zebra individual barcode label printing or tracking via existing UPC barcode, 5. Track storage location and expiration date), and update the label printing card to emphasize networked Raw TCP `:9100` Zebra ZPL printers (mentioning Zebra ZSB IPP support secondarily); verify `npm run build` renders the updated Home page cleanly.

## 3. Features, Configuration & About Pages

- [x] 3.1 Update `src/lib/features.ts` and `src/pages/features.astro` to reinforce the food-waste reduction framing in Inventory & Expiration, clarify LLM standardization/merging and UPC-vs-printed-label tracking in Scanning, and emphasize networked Raw TCP `:9100` Zebra ZPL printers with example models alongside secondary Zebra ZSB (IPP) support and links to `/configuration/#printing` and `https://www.zebra.com/content/smb/us/en.html` in Direct LAN Label Printing; verify `npm run build` succeeds.
- [x] 3.2 Update `src/pages/configuration.astro` (`#printing` section) to render the expanded supported Zebra printers guidance—leading with networked Raw TCP `:9100` Zebra ZPL models (`Recommended`), noting any networked ZPL `:9100` Zebra printer works, mentioning the discontinued Zebra ZSB Series secondarily as still supported over IPP with an external link (`rel="noopener noreferrer"`) to `https://www.zebra.com/content/smb/us/en.html`, and clarifying that label printing is optional because existing UPC barcodes can be used for tracking; verify the rendered HTML in `dist/configuration/index.html`.
- [x] 3.3 Update `src/pages/about.astro` to add an explicit "Our mission" section articulating Itemized's mission to reduce household food waste alongside its self-hosted, single-binary principles; verify the rendered HTML in `dist/about/index.html`.

## 4. End-to-End Verification

- [x] 4.1 Run `npm run build`, `npm run check`, `npm run check:dist`, and the full Playwright verification suite (`npm run test:browser` covering `tests/a11y.spec.ts`, `tests/no-js.spec.ts`, and `tests/widths.spec.ts`) across all pages, confirming zero build/SEO/link errors, zero accessibility violations, zero horizontal overflow, and full no-JS rendering.
