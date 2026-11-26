# Tasks

## 1. Shared Screenshot Styles

- [x] 1.1 Add reusable screenshot framing styles in `src/styles/site.css` (`.shot-stage`, `.shot-grid` for 2-up desktop layouts collapsing to 1 column on narrow viewports, and `.shot-mobile` with constrained portrait `max-width` for `/install/`) matching the existing `.lp-stage` border/surface/caption styling, and verify `npm run check` passes with no syntax errors.

## 2. Home Page Hero Screenshot

- [x] 2.1 Update `src/pages/index.astro` to replace the `<Image src={inventoryShot} ...>` hero figure with `<img src="/docs/assets/inventory.png" width="2560" height="1600" loading="eager" fetchpriority="high" decoding="async" ... />`, remove the unused `astro:assets` and `inventoryShot` imports, and delete `src/assets/screenshot-inventory.jpg` (and empty `src/assets/`). Verify `grep -rn "screenshot-inventory" src/` returns no matches and `npm run check` passes.

## 3. Features Page Screenshots

- [x] 3.1 Extend `FeatureGroup` in `src/lib/features.ts` with an optional `screenshots?: FeatureScreenshot[]` field (`src`, `alt`, `caption`, `width`, `height`) and populate the docs screenshot metadata for `inventory-and-expiration` (`due-soon.png`, `locations.png`), `shopping-list` (`shopping-list.png`), `barcode-and-qr-scanning` (`scanner.png`), `label-printing` (`settings-printers.png`), `search-and-shortcuts` (`search.png`), and `accounts-and-sso` (`settings.png`), verifying `npm run check` passes cleanly.
- [x] 3.2 Update `src/pages/features.astro` to render each group's `screenshots` in framed `<figure>` elements (`.shot-grid` when multiple, `.shot-stage` when single) with `loading="lazy"` and `decoding="async"`, and verify all 7 `/docs/assets/*.png` images appear in the built `dist/features/index.html`.

## 4. Install Page Mobile PWA Screenshot

- [x] 4.1 Update `src/pages/install.astro` to add a framed, captioned portrait preview using `/docs/assets/mobile-pwa.png` (`width="780" height="1688"`, `loading="lazy"`, `decoding="async"`) inside `.shot-mobile`, and verify `dist/install/index.html` renders the figure with descriptive alt text.

## 5. End-to-End Build and Browser Verification

- [x] 5.1 Run `npm run check && npm run build && npm run check:dist && npm run test:browser` and verify all type checks, internal image/link checks (`check:links`), SEO/script checks, axe-core WCAG 2.1 AA tests (light & dark), responsive width overflow tests (320/768/1280px), and no-JS tests pass with zero errors.
