#!/usr/bin/env python3
"""Generate demo raw assets that depict CWS Asset Generator skill capabilities."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "raw"
W, H = 960, 600


def font(size: int, bold: bool = False):
    candidates = [
        f"/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def canvas(bg: tuple[int, int, int] = (18, 18, 24)) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGB", (W, H), bg)
    return img, ImageDraw.Draw(img)


def save(img: Image.Image, name: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / name)
    print(f"  {name}")


def draw_window(d: ImageDraw.ImageDraw, xy: tuple[int, int, int, int], title: str = "") -> None:
    x0, y0, x1, y1 = xy
    d.rounded_rectangle(xy, radius=10, fill=(28, 28, 36), outline=(70, 70, 90))
    d.rectangle((x0, y0, x1, y0 + 28), fill=(40, 40, 52))
    for i, c in enumerate([(220, 70, 70), (220, 180, 70), (70, 180, 100)]):
        d.ellipse((x0 + 10 + i * 18, y0 + 8, x0 + 22 + i * 18, y0 + 20), fill=c)
    if title:
        d.text((x0 + 70, y0 + 6), title, fill=(180, 180, 200), font=font(12))


def img01_raw_to_styled() -> None:
    img, d = canvas()
    draw_window(d, (40, 80, 440, 520), "raw/1.png — input")
    d.text((60, 120), "Unstyled extension", fill=(200, 200, 210), font=font(18, True))
    d.text((60, 150), "screenshot from your repo", fill=(130, 130, 150), font=font(14))
    d.rounded_rectangle((60, 190, 420, 480), fill=(35, 35, 48), outline=(60, 60, 80))
    d.text((80, 220), "Side panel · settings", fill=(150, 150, 170), font=font(13))

    d.text((500, 100), "→", fill=(100, 200, 255), font=font(48, True))
    draw_window(d, (560, 80, 920, 520), "1280×800 output")
    d.text((580, 120), "Styled store screenshot", fill=(200, 200, 210), font=font(18, True))
    d.text((580, 150), "Headline + window frame", fill=(130, 130, 150), font=font(14))
    d.rounded_rectangle((580, 190, 900, 480), fill=(20, 24, 40), outline=(80, 120, 200))
    d.text((600, 220), "Hero · workflow · feature…", fill=(120, 180, 255), font=font(13))
    save(img, "1.png")


def img02_asset_map() -> None:
    img, d = canvas()
    d.text((40, 40), "assets/raw/", fill=(120, 200, 255), font=font(22, True))
    files = [
        "01-hero-main-ui.png",
        "02-highlight-flow.png",
        "07-checklist-a.png + 07-checklist-b.png",
    ]
    y = 100
    for f in files:
        d.text((60, y), f"├── {f}", fill=(200, 200, 210), font=font(15))
        y += 36
    d.rounded_rectangle((40, 260, 920, 540), fill=(24, 28, 38), outline=(60, 80, 120))
    d.text((60, 280), "assetMap.js", fill=(100, 200, 255), font=font(16, True))
    d.text(
        (60, 320),
        '{ slideId: "01", role: "hero", files: ["01-hero…"], layout: "single" }',
        fill=(180, 190, 210),
        font=font(13),
    )
    d.text(
        (60, 360),
        '{ slideId: "07", role: "checklist", layout: "dual", files: […] }',
        fill=(180, 190, 210),
        font=font(13),
    )
    save(img, "2.png")


def img03_copy_variants() -> None:
    img, d = canvas((248, 248, 252))
    d.text((40, 30), "Slide 03 — Copy proposal", fill=(30, 30, 40), font=font(20, True))
    cols = ["", "Variant A", "Variant B", "Variant C"]
    rows = [
        ("Headline", "Store-ready in one run", "Four styles, one copy set", "List faster, look pro"),
        ("Subline", "Raw shots → CWS PNGs", "Agent builds preview app", "Approve copy before design"),
    ]
    x_cols = [40, 220, 420, 620]
    y0 = 90
    for i, c in enumerate(cols):
        d.text((x_cols[i], y0), c, fill=(60, 60, 80), font=font(13, True))
    for ri, row in enumerate(rows):
        y = y0 + 40 + ri * 50
        d.text((x_cols[0], y), row[0], fill=(80, 80, 100), font=font(12, True))
        for ci in range(1, 4):
            d.rounded_rectangle(
                (x_cols[ci] - 4, y - 4, x_cols[ci] + 170, y + 28),
                fill=(255, 255, 255),
                outline=(200, 200, 210),
            )
            d.text((x_cols[ci], y), row[ci][:28], fill=(40, 40, 50), font=font(11))
    save(img, "3.png")


def img04_copy_gate() -> None:
    img, d = canvas()
    d.text((40, 40), "Copy sign-off (Phase 4 gate)", fill=(200, 200, 210), font=font(22, True))
    items = [
        "Slide 01 — hero — approved",
        "Slide 02 — asset intake — approved",
        "Slide 03 — copy variants — approved",
        "Promo tiles 01–03 — approved",
        "User: copy is final",
    ]
    y = 110
    for i, item in enumerate(items):
        color = (80, 200, 120) if i < 4 else (100, 180, 255)
        d.rectangle((50, y, 70, y + 20), outline=color, width=2)
        if i < 4:
            d.line((54, y + 10, 60, y + 16), fill=color, width=2)
            d.line((60, y + 16, 68, y + 6), fill=color, width=2)
        d.text((85, y), item, fill=(210, 210, 220), font=font(15))
        y += 44
    d.text((50, 400), "→ Phase 5 build unlocked", fill=(100, 200, 255), font=font(16, True))
    save(img, "4.png")


def img05_four_styles() -> None:
    img, d = canvas()
    d.text((40, 30), "Four style packages — same copy & assets", fill=(210, 210, 220), font=font(20, True))
    styles = [
        ("A", "Clean Minimal", (10, 10, 18)),
        ("B", "Neon Tech", (3, 7, 18)),
        ("C", "Warm Editorial", (250, 248, 245)),
        ("D", "Bold Contrast", (15, 15, 15)),
    ]
    positions = [(40, 80), (500, 80), (40, 320), (500, 320)]
    for (label, name, bg), (x, y) in zip(styles, positions):
        d.rounded_rectangle((x, y, x + 420, y + 200), fill=bg, outline=(80, 80, 100))
        d.text((x + 16, y + 16), f"Style {label}", fill=(150, 150, 170) if bg[0] > 100 else (200, 200, 210), font=font(14, True))
        d.text((x + 16, y + 44), name, fill=(100, 100, 120) if bg[0] > 100 else (230, 230, 240), font=font(18, True))
        d.rounded_rectangle((x + 16, y + 90, x + 400, y + 180), fill=(bg[0] + 8, bg[1] + 8, bg[2] + 8), outline=(90, 90, 110))
    save(img, "5.png")


def img06_preview_app() -> None:
    img, d = canvas()
    draw_window(d, (30, 50, 930, 550), "localhost:5173 — StoreAssetsPreview")
    tabs = ["Clean Minimal", "Neon Tech", "Warm Editorial", "Bold Contrast", "Promo"]
    x = 50
    for i, tab in enumerate(tabs):
        fill = (60, 100, 200) if i == 0 else (40, 40, 55)
        d.rounded_rectangle((x, 95, x + 120, 125), fill=fill)
        d.text((x + 8, 100), tab[:12], fill=(220, 220, 230), font=font(9))
        x += 128
    d.rounded_rectangle((50, 140, 910, 520), fill=(12, 12, 18), outline=(50, 50, 70))
    d.text((70, 160), "1280 × 800 screenshot card", fill=(180, 180, 200), font=font(16, True))
    d.text((70, 190), "[ Export PNG ]", fill=(80, 200, 120), font=font(14, True))
    save(img, "6.png")


def img07_promo_logo() -> None:
    img, d = canvas((12, 12, 18))
    d.rounded_rectangle((20, 20, 420, 280), fill=(20, 20, 28), outline=(60, 60, 80))
    d.rounded_rectangle((180, 50, 260, 130), fill=(255, 100, 50))
    d.text((120, 145), "CWS Asset Generator", fill=(240, 240, 245), font=font(14, True))
    d.text((70, 175), "Raw screenshots → store graphics", fill=(150, 150, 170), font=font(11))
    d.text((20, 300), "440 × 280 · Logo focus layout", fill=(120, 120, 140), font=font(12))
    save(img, "7.png")


def img08_promo_banner() -> None:
    img, d = canvas((3, 7, 18))
    d.rounded_rectangle((0, 0, 440, 280), fill=(3, 7, 18))
    d.text((20, 40), "CWS Asset", fill=(200, 240, 255), font=font(18, True))
    d.text((20, 70), "Generator", fill=(200, 240, 255), font=font(18, True))
    d.text((20, 110), "4 styles · exact sizes", fill=(120, 160, 200), font=font(11))
    draw_window(d, (200, 20, 430, 300))
    d.text((220, 60), "Preview UI", fill=(150, 180, 220), font=font(12))
    d.text((20, 300), "440 × 280 · UI banner layout", fill=(100, 140, 180), font=font(12))
    save(img, "8.png")


def img09_batch_export() -> None:
    img, d = canvas()
    d.text((40, 40), "export/screenshots/", fill=(120, 200, 255), font=font(20, True))
    files = [
        "style-a-slide-01-1280x800.png",
        "style-b-slide-01-1280x800.png",
        "style-c-slide-01-1280x800.png",
        "style-d-slide-01-1280x800.png",
        "promo-tile-01-440x280.png",
    ]
    y = 100
    for f in files:
        d.text((60, y), f"✓ {f}", fill=(120, 200, 140), font=font(14))
        y += 36
    d.text((40, 340), "npm run export:batch", fill=(100, 180, 255), font=font(16, True))
    d.text((40, 380), "35 PNGs · manifest.json", fill=(150, 150, 170), font=font(14))
    save(img, "9.png")


def img10_revision() -> None:
    img, d = canvas((248, 248, 252))
    d.text((40, 40), "Revision by slide ID", fill=(40, 40, 50), font=font(20, True))
    d.rounded_rectangle((40, 100, 920, 200), fill=(255, 255, 255), outline=(200, 200, 210))
    d.text((60, 120), 'User: "Change style-b-slide-04 headline to …"', fill=(60, 60, 80), font=font(14))
    d.text((60, 150), "Agent: productMeta.js → re-export → export/", fill=(80, 120, 200), font=font(13))
    d.rounded_rectangle((40, 240, 920, 340), fill=(255, 255, 255), outline=(200, 200, 210))
    d.text((60, 260), 'User: "Swap asset to 07-checklist-b.png"', fill=(60, 60, 80), font=font(14))
    d.text((60, 290), "Agent: assetMap.js → re-export affected PNGs", fill=(80, 120, 200), font=font(13))
    save(img, "10.png")


def icon128() -> None:
    img = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((8, 8, 120, 120), radius=24, fill=(255, 100, 50, 255))
    # grid of frames
    for i, (x, y) in enumerate([(24, 28), (68, 28), (24, 72), (68, 72)]):
        d.rounded_rectangle((x, y, x + 32, y + 24), radius=4, fill=(255, 255, 255, 220))
    d.text((36, 98), "CWS", fill=(255, 255, 255, 230), font=font(14, True))
    img.save(OUT.parent.parent / "icon-128.png")
    print("  icon-128.png")


def main() -> None:
    print("Generating skill demo assets…")
    img01_raw_to_styled()
    img02_asset_map()
    img03_copy_variants()
    img04_copy_gate()
    img05_four_styles()
    img06_preview_app()
    img07_promo_logo()
    img08_promo_banner()
    img09_batch_export()
    img10_revision()
    icon128()
    print("Done.")


if __name__ == "__main__":
    main()
