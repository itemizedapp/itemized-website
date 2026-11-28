# Tasks

## 1. Remove One-Sided Accent Borders on Callouts

- [x] 1.1 Remove `border-left: 3px solid var(--accent);` from `.callout` and `border-left-color: #d97706;` from `.callout-warn` in `src/styles/site.css`, and audit `src/styles/` for any other rounded boxes with a one-sided colored border; verify with `grep` that none remain
- [x] 1.2 Run `npm run check && npm run build && npm run check:dist && npm run test:browser` to verify clean static build, link/SEO/em-dash checks, and WCAG 2.1 AA contrast in light and dark mode across all routes
