import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targetDir = path.join(root, 'public', 'docs');
const defaultTarballUrl =
  process.env.DOCS_TARBALL_URL ||
  'https://github.com/itemizedapp/itemized/releases/latest/download/itemized-docs.tar.gz';

function copyLocalDocs(srcDir) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(srcDir, targetDir, { recursive: true });
  console.log(`Copied docs bundle from ${srcDir} -> ${targetDir}`);
}

async function downloadReleaseDocs(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to fetch docs tarball from ${url}: HTTP ${res.status}`);
  }
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'itemized-docs-fetch-'));
  const tarPath = path.join(tmpDir, 'itemized-docs.tar.gz');
  try {
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(tarPath, buf);
    fs.rmSync(targetDir, { recursive: true, force: true });
    fs.mkdirSync(targetDir, { recursive: true });
    execFileSync('tar', ['-xzf', tarPath, '-C', targetDir], { stdio: 'inherit' });
    console.log(`Extracted docs bundle from ${url} -> ${targetDir}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

async function main() {
  if (process.env.LOCAL_DOCS_DIR) {
    const src = path.resolve(root, process.env.LOCAL_DOCS_DIR);
    if (!fs.existsSync(path.join(src, 'index.html'))) {
      throw new Error(`LOCAL_DOCS_DIR (${src}) does not contain index.html. Run 'make docs-build' in itemized first.`);
    }
    copyLocalDocs(src);
    return;
  }

  const siblingDocs = path.resolve(root, '../itemized/dist/docs');
  if (!process.env.CI && fs.existsSync(path.join(siblingDocs, 'index.html'))) {
    copyLocalDocs(siblingDocs);
    return;
  }

  await downloadReleaseDocs(defaultTarballUrl);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
