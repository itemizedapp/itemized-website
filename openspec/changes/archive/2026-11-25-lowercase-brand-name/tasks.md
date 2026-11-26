# Tasks

## 1. Brand Wordmark, Metadata & Open Graph Card

- [x] 1.1 Update `SITE.name` to `'itemized'` and `SITE.ogAlt` to lowercase `itemized` in `src/lib/site.ts`, update the footer copyright line in `src/components/SiteFooter.astro` to `© {year} itemized contributors`, and update the Home page `<title>` in `src/pages/index.astro` to `itemized — Self-hosted household inventory management`; verify `npm run check` passes
- [x] 1.2 Regenerate `public/og-card.png` (1200×630) so the Open Graph card wordmark renders `itemized` in lowercase, and verify `public/og-card.png` exists and is valid PNG

## 2. Copy Audit Across Data Modules & Pages

- [x] 2.1 Update all non-sentence-start occurrences of `Itemized` to `itemized` across `src/lib/features.ts`, `src/lib/config.ts`, and `src/pages/*.astro` (`index.astro`, `features.astro`, `self-host.astro`, `configuration.astro`, `install.astro`, `about.astro`, `security.astro`, `privacy.astro`, `404.astro`), preserving `Itemized` only when it begins a sentence; verify with `grep -rn "Itemized" src/` that every remaining match is at the start of a sentence

## 3. Automated Regression Check & Full Verification

- [x] 3.1 Add a brand-casing check in `scripts/checks/seo.mjs` (verifying `.brand` wordmark text is `itemized`, `og:site_name` is `itemized`, and no non-sentence-start `Itemized` appears in built HTML visible text) and run `npm run check && npm run build && npm run check:dist && npm run test:browser` to verify all checks pass
