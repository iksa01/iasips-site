#!/usr/bin/env python3
"""Prepare a picture for the site: fit to 1400px wide, write .jpg plus .webp and .avif siblings, and record the
dimensions in images/manifest.json so the build can set width/height and serve the modern formats.
Usage: python3 tools/prepare-image.py images/press/my-picture.jpg  (any JPG/PNG; the file is replaced by the fitted JPG)"""
import sys, json, pathlib
from PIL import Image, ImageOps
ROOT = pathlib.Path(__file__).resolve().parent.parent
man = ROOT / "images" / "manifest.json"; data = json.loads(man.read_text()) if man.exists() else {}
for arg in sys.argv[1:]:
    p = pathlib.Path(arg).resolve(); im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
    if im.width > 1400: im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
    jpg = p.with_suffix(".jpg"); im.save(jpg, quality=84, optimize=True, progressive=True)
    if p != jpg: p.unlink()
    im.save(jpg.with_suffix(".webp"), quality=80, method=6)
    try: im.save(jpg.with_suffix(".avif"), quality=60)
    except Exception as e: print("avif skipped:", e)
    key = "/" + str(jpg.relative_to(ROOT)).replace("\\", "/")
    data[key] = {"w": im.width, "h": im.height}
    print(key, im.width, "x", im.height, "→ jpg, webp, avif")
man.write_text(json.dumps(data, indent=1, sort_keys=True) + "\n")
