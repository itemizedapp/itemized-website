# Itemized Website

Static marketing website for [Itemized](https://github.com/itemizedapp/itemized), built with [Astro](https://astro.build) and deployed as a portable static `dist/` directory.

## Development

```bash
npm install
npm run dev
```

## Build & Verification

```bash
# Type and Astro template checks
npm run check

# Build static output into dist/
npm run build

# Post-build HTML verification (internal links, SEO/OG metadata, script hygiene)
npm run check:dist

# Playwright browser verification (WCAG 2.1 AA, responsive widths, no-JS)
npm run test:browser
```

> If Playwright Chromium is not yet installed locally, run `npx playwright install chromium` before `npm run test:browser`.

## Static Deployment

Running `npm run build` outputs a self-contained static site into `dist/` with directory-based routes (`/<route>/index.html`), `/404.html`, `/robots.txt`, and `/sitemap-index.xml`.

- **Cloudflare Pages / Netlify**: Build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: Publish the `dist/` artifact via `actions/upload-pages-artifact` and `actions/deploy-pages`.

## Security

To report a security vulnerability, please see [SECURITY.md](SECURITY.md).

## License

itemized-website is licensed under the [MIT License](LICENSE).
