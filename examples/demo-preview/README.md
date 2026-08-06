# Demo preview — CWS Asset Generator

Local browser preview of the skill workflow demo (8 slides × 4 styles + 3 promo tiles).

## Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

## Commands

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server — tabbed style switcher + per-card Export PNG |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run export:batch` | Puppeteer batch export → `export/` |

## Regenerate demo assets

Workflow mockup PNGs in `public/assets/raw/`:

```bash
python3 scripts/generate-demo-assets.py
```

Requires Python 3 + Pillow (`pip install pillow` if missing).

## Customize

- **Copy:** `src/productMeta.js`
- **Themes:** `src/themes/index.js`
- **Layouts:** `src/components/SlideRenderer.jsx`

## Export output

After `npm run export:batch`:

```
export/
├── screenshots/   # style-{a,b,c,d}-slide-{01..08}-1280x800.png
├── promo-tiles/   # promo-tile-{01,02,03}-440x280.png
└── manifest.json
```

Parent repo: [boteam-ai/chrome-web-store-asset-generator](https://github.com/boteam-ai/chrome-web-store-asset-generator)
