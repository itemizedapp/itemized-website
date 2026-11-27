# Design

## Context

See `proposal.md` for motivation. Across `src/`, em dashes (`—`, U+2014) currently appear in 10 files across four distinct roles:
1. Page `<title>` and social metadata separators (`src/layouts/Base.astro`, `src/pages/index.astro`, `src/lib/site.ts`).
2. Empty-value placeholders in the environment variable table (`src/lib/config.ts`).
3. List item key/value separators (`src/pages/self-host.astro`).
4. Editorial prose and feature/page descriptions (`src/lib/site.ts`, `src/lib/features.ts`, `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/self-host.astro`, `src/pages/install.astro`, `src/pages/security.astro`, `src/pages/configuration.astro`).

Meanwhile, `scripts/checks/seo.mjs` already enforces marketing-site copy rules (such as lowercase `itemized` capitalization) on all built HTML files outside `docs/`.

## Goals / Non-Goals

**Goals:**
- Replace every em dash in `src/` with clear, idiomatic punctuation or labels that match existing site conventions.
- Enforce zero em dashes in built marketing website HTML via `scripts/checks/seo.mjs` so `npm run check:dist` catches regressions automatically.

**Non-Goals:**
- Modifying `/docs/` (`public/docs/`), which is generated from the separate `itemized` repository and fetched at build time via `scripts/fetch-docs.mjs`.
- Restricting standard ASCII hyphens (`-`) used in compound words, CLI flags, URLs, or code blocks.

## Decisions

### 1. Title separator: pipe (`|`) instead of em dash
- **Decision**: Change `Base.astro`'s default title format from `${title} — ${SITE.name}` to `${title} | ${SITE.name}`, and update the bare homepage title in `src/pages/index.astro` to `itemized | Self-hosted household inventory to reduce food waste`. Update `SITE.ogAlt` in `src/lib/site.ts` to `'itemized: self-hosted household inventory management interface'`.
- **Rationale**: A pipe (`|`) is a standard, clean SEO title separator that is visually distinct from hyphens in compound words (such as `Self-Host`).
- **Alternatives considered**: Hyphen (`-`) was considered, but `Self-Host - itemized` looks noisier next to hyphenated page titles.

### 2. Configuration table empty defaults: `(none)` instead of `—`
- **Decision**: Replace `defaultValue: '—'` in `src/lib/config.ts` (for `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, `LLM_MODEL`, `LLM_BASE_URL`, `LLM_API_KEY`) with `'(none)'`.
- **Rationale**: `src/lib/config.ts` already uses parenthetical labels (`'(request host)'`, `'(disabled)'`) for non-literal defaults, so `'(none)'` is consistent and accessible to screen readers.
- **Alternatives considered**: ASCII `-` is ambiguous alongside CLI/env syntax and less clear for screen readers.

### 3. Prose and list separators: natural punctuation
- **Decision**: Rewrite em-dash prose constructions using commas, periods, colons, or parentheses as fits each sentence, and use colons (`:`) for `TRUST_PROXY=true:` / `BASE_URL=...:` list descriptions in `src/pages/self-host.astro`.
- **Rationale**: Preserves readability and tone without mechanically substituting hyphens (` - `), which read awkwardly in prose.

### 4. Automated verification: extend `scripts/checks/seo.mjs`
- **Decision**: Add an em-dash check inside the existing `!rel.startsWith('docs/')` block in `scripts/checks/seo.mjs` that inspects the raw HTML (or parsed `<title>`, `<meta>`, and body text) of every non-`docs/` HTML file in `dist/` for `/\u2014|&mdash;|&#8212;|&#x2014;/i`.
- **Rationale**: `scripts/checks/seo.mjs` already runs as part of `npm run check:dist` and already implements the site's other editorial check (brand capitalization) with the same `!rel.startsWith('docs/')` boundary. Checking raw HTML catches em dashes in `<title>`, `<meta>`, `alt` attributes, JSON-LD, and visible body copy in one pass.
- **Alternatives considered**: Adding a separate `scripts/checks/typography.mjs` script was considered, but keeping editorial/metadata HTML checks together in `seo.mjs` avoids extra npm script wiring while staying concise.

## Risks / Trade-offs

- [Bundled `/docs/` pages still contain em dashes from the `itemized` repo] → Explicitly exclude `docs/` in `scripts/checks/seo.mjs` (matching the existing brand-capitalization check) and document that `/docs/` copy is owned by the upstream `itemized` repository.
- [Overly broad raw-HTML check could match a future legitimate code snippet] → None of the marketing site's code snippets (Docker Compose, Docker Run, ZPL endpoints) use U+2014; if a future snippet ever needed one, the check can be narrowed to text/meta nodes, though U+2014 is never valid syntax in YAML, shell, or ZPL.
