# Proposal

## Why

The marketing website currently uses em dashes (`—`, U+2014) across page titles, metadata, feature descriptions, body copy, and configuration table placeholders. Removing all em dashes and enforcing the rule in post-build checks keeps the site's editorial style consistent and prevents regressions.

## What Changes

- Remove every em dash (`—`, U+2014) from all marketing website copy, page `<title>` templates, Open Graph / meta descriptions, and configuration table empty-value placeholders in `src/`.
- Replace the `<title>` brand separator (`${title} — ${SITE.name}`) and homepage title/ogAlt separators with a non-em-dash separator (`|` for titles, `:` or plain prose for alt text).
- Replace em-dash empty-value placeholders in the configuration reference (`src/lib/config.ts`) with `(none)` to match the existing `(disabled)` and `(request host)` convention.
- Rewrite prose sentences that use em dashes into natural punctuation (commas, periods, colons, or parentheses).
- Add an automated post-build check in `scripts/checks/seo.mjs` (run by `npm run check:dist`) that fails if any em dash (`—` or HTML entities `&mdash;`, `&#8212;`, `&#x2014;`) appears in built marketing website HTML (excluding `/docs/`, which is bundled from the separate `itemized` repository).

## Capabilities

### New Capabilities

<!-- None -->

### Modified Capabilities

- `site-chrome-and-design`: Add a site-wide punctuation requirement prohibiting em dashes across all marketing website copy, page titles, metadata, and table placeholders.
- `static-build-and-verification`: Extend automated post-build HTML verification to fail if any em dash appears in built marketing website HTML.

## Impact

- Affected source files in `src/`: `src/layouts/Base.astro`, `src/lib/site.ts`, `src/lib/features.ts`, `src/lib/config.ts`, `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/self-host.astro`, `src/pages/install.astro`, `src/pages/security.astro`, `src/pages/configuration.astro`.
- Affected verification script: `scripts/checks/seo.mjs`.
- Out of scope: `/docs/` (`public/docs/`), which is gitignored and fetched at build time from the upstream `itemized` repository via `scripts/fetch-docs.mjs`.
