import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'export');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

const TABS = [
  { id: 'a', label: 'Style A: Apple Pro' },
  { id: 'b', label: 'Style B: Cyber SaaS' },
  { id: 'c', label: 'Style C: Editorial Studio' },
  { id: 'd', label: 'Style D: Bold Contrast' },
  { id: 'promo', label: 'Promo Tiles (440×280)' },
];

const waitForServer = (url, timeoutMs = 30000) =>
  new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      http
        .get(url, (res) => {
          res.resume();
          resolve();
        })
        .on('error', () => {
          if (Date.now() - start > timeoutMs) reject(new Error(`Server not ready: ${url}`));
          else setTimeout(tick, 300);
        });
    };
    tick();
  });

const runCmd = (cmd, args, cwd) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: 'inherit', shell: false });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} failed with code ${code}`));
    });
  });

const waitForImages = async (page) => {
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          }),
      ),
    );
  });
  await new Promise((r) => setTimeout(r, 400));
};

const main = async () => {
  console.log('Building preview app…');
  await runCmd('npm', ['run', 'build'], ROOT);

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(path.join(OUT_DIR, 'screenshots'), { recursive: true });
  await mkdir(path.join(OUT_DIR, 'promo-tiles'), { recursive: true });

  const preview = spawn('npm', ['run', 'preview', '--', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: 'pipe',
    shell: false,
  });

  try {
    await waitForServer(BASE_URL);
    console.log(`Preview server ready at ${BASE_URL}`);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });

    const exported = [];

    for (const tab of TABS) {
      console.log(`Exporting ${tab.label}…`);
      await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      await page.evaluate((label) => {
        const buttons = Array.from(document.querySelectorAll('nav button'));
        const btn = buttons.find((b) => b.textContent?.trim() === label);
        btn?.click();
      }, tab.label);
      await waitForImages(page);

      const targets = await page.$$('[data-export-filename]');
      for (const target of targets) {
        const filename = await target.evaluate((el) => el.getAttribute('data-export-filename'));
        const subdir = filename.startsWith('promo-') ? 'promo-tiles' : 'screenshots';
        const outPath = path.join(OUT_DIR, subdir, filename);
        await target.screenshot({ path: outPath, type: 'png' });
        exported.push(outPath);
        console.log(`  ✓ ${path.join(subdir, filename)}`);
      }
    }

    await browser.close();

    const manifest = {
      generatedAt: new Date().toISOString(),
      total: exported.length,
      exportDir: OUT_DIR,
      files: exported.map((f) => path.relative(OUT_DIR, f)),
    };
    await import('node:fs/promises').then(({ writeFile }) =>
      writeFile(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2)),
    );

    console.log(`\nDone — ${exported.length} PNGs exported to:\n${OUT_DIR}`);
  } finally {
    preview.kill('SIGTERM');
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
