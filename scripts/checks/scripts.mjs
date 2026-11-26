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

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file);
  const doc = parse(fs.readFileSync(file, 'utf8'));

  for (const script of doc.querySelectorAll('script[src]')) {
    const src = script.getAttribute('src') ?? '';
    if (/^https?:\/\//i.test(src) || src.startsWith('//')) {
      errors.push(`${rel}: external third-party script disallowed (${src})`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Script check failed (${errors.length} errors):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`check:scripts passed (${htmlFiles.length} HTML files, zero external scripts).`);
