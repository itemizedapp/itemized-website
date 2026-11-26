# Proposal

## Why

The brand name is styled in lowercase as `itemized` (including in the logo/wordmark), whereas the website currently renders `Itemized` in the header, footer, page titles, Open Graph card, and mid-sentence copy. Standardizing capitalization so `itemized` is always lowercase except at the start of a sentence aligns the marketing site with the intended brand identity.

## What Changes

- Update the brand wordmark and canonical site name (`SITE.name`) from `Itemized` to `itemized` across the header logo, footer logo, footer copyright line, page `<title>` suffixes, `og:site_name`, and JSON-LD structured data.
- Regenerate `public/og-card.png` so the Open Graph card displays `itemized` in lowercase.
- Update mid-sentence, heading, metadata description, and data-module copy across `src/lib/` and `src/pages/` to use lowercase `itemized`, keeping `Itemized` capitalized only when it begins a sentence.
- Add a post-build check (or assertion in `scripts/checks/`) verifying that the wordmark and mid-sentence brand occurrences follow the lowercase rule.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `site-chrome-and-design`: Add a requirement specifying that the brand name is always rendered in lowercase (`itemized`) in the logo/wordmark, metadata, and copy except when it starts a sentence.

## Impact

- `src/lib/site.ts`, `src/lib/features.ts`, `src/lib/config.ts`
- `src/components/SiteFooter.astro`
- `src/pages/*.astro` (Home, Features, Self-Host, Configuration, Install, About, Security, Privacy, 404)
- `public/og-card.png`
- `scripts/checks/seo.mjs` (or a dedicated check in `check:dist`) to guard against regressions
