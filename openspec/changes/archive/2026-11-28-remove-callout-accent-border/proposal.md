# Proposal

## Why

The site's `.callout` and `.callout-warn` components currently combine rounded corners (`border-radius`) with a thick colored accent stripe on only the left edge (`border-left: 3px solid var(--accent)` and `border-left-color: #d97706`). This pattern clashes with itemized's calm, flat editorial design system and creates a generic AI-generated look. Removing one-sided colored accent borders from rounded boxes and codifying this rule in the design spec keeps the site visually cohesive and prevents the pattern from returning.

## What Changes

- Remove the left-edge accent stripe (`border-left` / `border-left-color`) from `.callout` and `.callout-warn` in `src/styles/site.css`, using a clean uniform 1px 4-sided border (`--border-strong` for standard callouts and `--it-warn-border` for warning callouts) paired with their existing subtle surface tint (`--sunken` / `--it-warn-bg`).
- Add a durable design requirement to `site-chrome-and-design` prohibiting rounded boxes with a colored accent border on only one side.

## Capabilities

### New Capabilities

_(None.)_

### Modified Capabilities

- `site-chrome-and-design`: Add a requirement prohibiting rounded boxes with a one-sided colored accent border across callouts, cards, and notice containers.

## Impact

- Stylesheet: `src/styles/site.css` (`.callout` and `.callout-warn` used on `/configuration/`, `/self-host/`, and `/install/`).
- Verification: existing `npm run build`, `npm run check:dist`, and `npm run test:browser` (including WCAG 2.1 AA contrast checks in light and dark mode).
