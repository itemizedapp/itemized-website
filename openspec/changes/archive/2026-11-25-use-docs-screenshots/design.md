# Design

## Context

See `proposal.md` for motivation. Currently, `scripts/fetch-docs.mjs` runs via `npm run prebuild` and populates `public/docs/` (gitignored) from either a sibling `../itemized/dist/docs` checkout or the latest GitHub release tarball (`itemized-docs.tar.gz`). That bundle includes 12 automatically generated PNG screenshots under `public/docs/assets/`:

- Desktop (`2560 × 1600`): `inventory.png`, `due-soon.png`, `locations.png`, `categories.png`, `product-detail.png`, `product-form.png`, `shopping-list.png`, `scanner.png`, `search.png`, `settings.png`, `settings-printers.png`
- Mobile (`780 × 1688`): `mobile-pwa.png`

Meanwhile, `.github/workflows/checks.yml` runs `npm run check` (`astro check`) *before* `npm run build` (`prebuild` + `astro build`), followed by `npm run check:dist` (`check:links`, `check:seo`, `check:scripts`) and `npm run test:browser` (Playwright axe-core, responsive overflow at 320/768/1280px, and no-JS checks).

## Goals / Non-Goals

**Goals:**
- Single source of truth for UI screenshots: consume `/docs/assets/*.png` directly from the fetched docs bundle with zero manually committed screenshot copies in `src/assets/`.
- Clean, consistent screenshot framing across `/`, `/features/`, and `/install/` (supporting wide single screenshots, 2-up paired screenshots, and a constrained portrait mobile frame).
- Keep `npm run check` working cleanly on a fresh checkout (before `fetch:docs` runs) while guaranteeing `npm run check:links` fails the build if any referenced `/docs/assets/*.png` file is renamed or missing upstream.

**Non-Goals:**
- Re-encoding or staging docs screenshots into `src/assets/` for Astro's `<Image>` pipeline.
- Modifying `scripts/fetch-docs.mjs` or the upstream `itemized` docs build pipeline.
- Adding screenshots to non-UI pages (`/self-host/`, `/configuration/`, `/about/`, `/security/`, `/privacy/`).

## Decisions

### 1. Serve screenshots directly via `<img src="/docs/assets/<name>.png">`
- **Decision**: Reference `/docs/assets/*.png` with standard `<img>` elements carrying explicit `width`, `height`, `alt`, `decoding="async"`, and appropriate `loading` (`eager` + `fetchpriority="high"` on the `/` hero, `lazy` on below-the-fold screenshots).
- **Rationale**:
  - `public/docs/` is gitignored and populated during `prebuild`. Direct `/docs/assets/...` URLs let `astro check` succeed on a fresh checkout without generating files into `src/` or reordering CI steps.
  - `scripts/checks/links.mjs` already checks every `img[src]` in `dist/` and fails with a clear error if any `/docs/assets/*.png` is missing.
  - No duplicate image bytes in `dist/` (`public/docs/assets/*.png` is already shipped in `dist/docs/assets/`).
- **Alternatives considered**: Staging fetched PNGs into a gitignored `src/assets/docs/` directory and importing them via `astro:assets` `<Image>` for WebP/srcset generation. Rejected because it requires running `fetch:docs` before `astro check`, adds gitignored generated source files, and duplicates assets in `dist/_astro/` alongside `dist/docs/assets/`.

### 2. Data-driven screenshot metadata for `/features/`
- **Decision**: Extend `FeatureGroup` in `src/lib/features.ts` with an optional `screenshots?: FeatureScreenshot[]` array (`src`, `alt`, `caption`, `width`, `height`) and render a shared `.shot-stage` / `.shot-grid` block in `src/pages/features.astro`.
- **Mapping**:
  - `inventory-and-expiration`: `due-soon.png` + `locations.png` (2-up `.shot-grid`, since `/` already features `inventory.png`)
  - `shopping-list`: `shopping-list.png`
  - `barcode-and-qr-scanning`: `scanner.png`
  - `label-printing`: `settings-printers.png`
  - `search-and-shortcuts`: `search.png`
  - `accounts-and-sso`: `settings.png`
  - `self-hosting`: omitted (architecture/deployment section without a dedicated UI screen)
- **Rationale**: Keeps feature copy and screenshot metadata co-located, avoids ad-hoc markup per section, and reuses the existing `.lp-stage` border/surface/caption aesthetic.

### 3. Constrained portrait framing for `/install/`
- **Decision**: Display `/docs/assets/mobile-pwa.png` (`780 × 1688`) in a dedicated portrait frame (`.shot-mobile` with `max-width: 20rem` / `320px`, `margin-inline: auto`, rounded border, and caption) alongside or beneath the mobile install introduction.
- **Rationale**: Rendering a `780 × 1688` portrait image at full container width (`1104px`) would produce an oversized ~2400px-tall image on desktop. Constraining max-width preserves crisp retina density (`780px` source rendered at `≤ 320px` CSS width) and keeps page rhythm balanced across 320px, 768px, and 1280px viewports.

### 4. Remove stale manual screenshot asset
- **Decision**: Delete `src/assets/screenshot-inventory.jpg` (and remove the unused `Image` import in `src/pages/index.astro`).
- **Rationale**: Eliminates the stale manual copy so there is only one maintained source for screenshots.

## Risks / Trade-offs

- **[Upstream docs asset rename/removal]** → `npm run check:links` inspects every `img[src]` in `dist/` during CI and fails immediately if an upstream docs release renames or drops a referenced PNG.
- **[Larger raw PNG transfer vs. WebP srcset]** → The desktop PNGs are ~177–413 KB each (`mobile-pwa.png` is 147 KB). Using `loading="lazy"` and `decoding="async"` on all below-the-fold screenshots on `/features/` and `/install/` avoids blocking initial paint while keeping the Home hero (`inventory.png`, 413 KB) eager with `fetchpriority="high"`.
- **[Missing local docs during `astro dev`]** → On a fresh clone before `npm run build` or `npm run fetch:docs`, `public/docs/` does not exist yet. Running `npm run fetch:docs` (already documented in `package.json`) populates it from `../itemized/dist/docs` or the latest GitHub release.
