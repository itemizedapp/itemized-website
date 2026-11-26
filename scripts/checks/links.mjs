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
const parsedCache = new Map();
const idCache = new Map();

function getDoc(filePath) {
  if (!parsedCache.has(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    parsedCache.set(filePath, parse(html));
  }
  return parsedCache.get(filePath);
}

function getIds(filePath) {
  if (!idCache.has(filePath)) {
    const doc = getDoc(filePath);
    const ids = new Set();
    for (const el of doc.querySelectorAll('[id]')) {
      const id = el.getAttribute('id');
      if (id) ids.add(id);
    }
    idCache.set(filePath, ids);
  }
  return idCache.get(filePath);
}

function resolveTarget(rawHref, fromFile) {
  const [urlPart, hash] = rawHref.split('#');
  if (!urlPart) {
    return { targetFile: fromFile, hash };
  }
  const cleanUrl = decodeURIComponent(urlPart.split('?')[0]);
  const base = cleanUrl.startsWith('/')
    ? path.join(distDir, cleanUrl)
    : path.resolve(path.dirname(fromFile), cleanUrl);

  if (!base.startsWith(distDir)) return { targetFile: null, hash };

  if (fs.existsSync(base) && fs.statSync(base).isFile()) {
    return { targetFile: base, hash };
  }
  const idx = path.join(base, 'index.html');
  if (fs.existsSync(idx) && fs.statSync(idx).isFile()) {
    return { targetFile: idx, hash };
  }
  return { targetFile: null, hash };
}

const errors = [];

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file);
  const doc = getDoc(file);

  for (const el of doc.querySelectorAll('a[href], link[href], img[src], script[src]')) {
    const attr = el.hasAttribute('href') ? 'href' : 'src';
    const val = el.getAttribute(attr);
    if (!val) continue;
    if (
      val.startsWith('http://') ||
      val.startsWith('https://') ||
      val.startsWith('mailto:') ||
      val.startsWith('tel:') ||
      val.startsWith('data:')
    ) {
      continue;
    }

    const { targetFile, hash } = resolveTarget(val, file);
    if (!targetFile) {
      errors.push(`${rel}: broken ${attr}="${val}"`);
      continue;
    }
    if (hash && targetFile.endsWith('.html')) {
      const ids = getIds(targetFile);
      if (!ids.has(hash)) {
        errors.push(`${rel}: broken fragment ${attr}="${val}" (missing #${hash} in ${path.relative(distDir, targetFile)})`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`Link check failed (${errors.length} errors):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`check:links passed (${htmlFiles.length} HTML files checked).`);
