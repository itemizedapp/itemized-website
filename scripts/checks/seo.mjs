import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const distDir = path.resolve(process.argv[2] ?? 'dist');

function walkHtml(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkHtml(full));
    else if (entry.name.endsWith('.html')) results.push(full);
  }
  return results;
}

const htmlFiles = walkHtml(distDir);
const errors = [];
const titles = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file);
  const is404 = rel === '404.html';
  const doc = parse(fs.readFileSync(file, 'utf8'));

  const title = doc.querySelector('title')?.text?.trim() ?? '';
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '';
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href')?.trim() ?? '';
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim() ?? '';
  const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content')?.trim() ?? '';
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content')?.trim() ?? '';
  const ogSiteName = doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content')?.trim() ?? '';
  const h1s = doc.querySelectorAll('h1');

  if (!title) errors.push(`${rel}: missing <title>`);
  if (!desc) errors.push(`${rel}: missing <meta name="description">`);
  if (h1s.length !== 1) errors.push(`${rel}: expected 1 <h1>, found ${h1s.length}`);

  if (ogSiteName !== 'itemized') {
    errors.push(`${rel}: expected og:site_name "itemized", found "${ogSiteName}"`);
  }
  for (const brandSpan of doc.querySelectorAll('.brand span')) {
    const brandText = brandSpan.text.trim();
    if (brandText !== 'itemized') {
      errors.push(`${rel}: expected .brand wordmark "itemized", found "${brandText}"`);
    }
  }
  if (!rel.startsWith('docs/')) {
    for (const el of doc.querySelectorAll('body p, body li, body h1, body h2, body h3, body h4, body td, body th, body figcaption, body summary')) {
      const text = el.text.replace(/\s+/g, ' ').trim();
      const badCasing = text.match(/(?:[a-z0-9,’"”]|©\s*\d+)\s+Itemized\b/g);
      if (badCasing) {
        errors.push(`${rel}: non-sentence-start "Itemized" found (${badCasing.join(', ')})`);
      }
    }
  }

  if (!is404) {
    if (titles.has(title)) {
      errors.push(`${rel}: duplicate <title> "${title}" (also in ${titles.get(title)})`);
    } else if (title) {
      titles.set(title, rel);
    }
    if (!canonical.startsWith('https://itemizedapp.com/')) {
      errors.push(`${rel}: invalid canonical "${canonical}"`);
    }
    if (!ogTitle) errors.push(`${rel}: missing og:title`);
    if (!ogDesc) errors.push(`${rel}: missing og:description`);
    if (!ogImage.startsWith('https://itemizedapp.com/')) {
      errors.push(`${rel}: invalid og:image "${ogImage}"`);
    }
  }
}

for (const required of ['robots.txt', 'sitemap-index.xml', '404.html']) {
  if (!fs.existsSync(path.join(distDir, required))) {
    errors.push(`dist/: missing required file ${required}`);
  }
}

if (errors.length > 0) {
  console.error(`SEO check failed (${errors.length} errors):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`check:seo passed (${htmlFiles.length} HTML files + robots.txt + sitemap-index.xml).`);
