# Tasks

## 1. Shared Layout, Metadata, and Data Modules

- [x] 1.1 Update `src/layouts/Base.astro` to replace `${title} — ${SITE.name}` with `${title} | ${SITE.name}` and verify no em dashes remain in `src/layouts/` via `grep -rnE "—|&mdash;|&#8212;|&#x2014;" src/layouts/`
- [x] 1.2 Update `src/lib/site.ts` (`tagline`, `ogAlt`) and `src/lib/features.ts` (4 descriptions) to rewrite em-dash constructions using natural punctuation, and replace `defaultValue: '—'` with `'(none)'` in `src/lib/config.ts`, verifying zero matches via `grep -rnE "—|&mdash;|&#8212;|&#x2014;" src/lib/`

## 2. Marketing Pages

- [x] 2.1 Remove all em dashes from `src/pages/index.astro` (bare title using `|`, meta description, hero headline/lede, demo note, workflow step title/copy, and feature card copy) and verify zero matches via `grep -nE "—|&mdash;|&#8212;|&#x2014;" src/pages/index.astro`
- [x] 2.2 Remove all em dashes from `src/pages/about.astro`, `src/pages/self-host.astro`, `src/pages/install.astro`, `src/pages/security.astro`, and `src/pages/configuration.astro` (using natural punctuation and colons for `TRUST_PROXY` / `BASE_URL` list items), verifying zero matches across all of `src/` via `grep -rnE "—|&mdash;|&#8212;|&#x2014;" src/`

## 3. Automated Post-Build Check and End-to-End Verification

- [x] 3.1 Extend `scripts/checks/seo.mjs` inside the `!rel.startsWith('docs/')` block to fail if any built marketing HTML file contains `\u2014`, `&mdash;`, `&#8212;`, or `&#x2014;` (case-insensitive), and verify `npm run check && npm run build && npm run check:dist` passes
- [x] 3.2 Confirm the new check catches regressions by verifying `scripts/checks/seo.mjs` fails when an em dash is present in a non-`docs/` HTML file and passes once removed, and run `npm run test:browser` if Playwright browsers are available
