#!/usr/bin/env python3
"""Pre-publish check (HANDBOOK §7, Kalyan 2026-11-24: "make this sop every time: check dates, tags, SEO").
Run after a clean build:   rm -rf _site && npx @11ty/eleventy && python3 tools/check.py
Checks every journal entry and its built page. ERROR stops the publish (exit 1); WARN is for Kalyan's eye.
Drafts are skipped. The rules are HANDBOOK §2, §3, §3a, §6 and DESIGN §4a, §10."""
import datetime, html, json, pathlib, re, sys
import yaml

ROOT = pathlib.Path(__file__).resolve().parent.parent
JOURNAL, SITE = ROOT / "content" / "journal", ROOT / "_site"
CATEGORIES = ["Quotes", "Books", "Press", "Listening", "Notes"]
SUBJECTS = ["AI", "Ethics", "Polity", "Economy", "World", "History", "Society", "Environment", "Mahabharata", "Chess"]
KEYS = {"title", "sub", "date", "updated", "tags", "type", "link", "dropcap", "toc", "permalink", "draft"}
TYPES = {None, "quote", "note", "link"}
errors, warns = [], []
def err(f, m): errors.append(f"{f}: {m}")
def warn(f, m): warns.append(f"{f}: {m}")

def meta(page, name, attr="name"):
    m = re.search(rf'<meta {attr}="{re.escape(name)}" content="([^"]*)"', page)
    return html.unescape(m.group(1)) if m else None

today = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=330)).date()
SOP_FROM = datetime.date(2026, 11, 24)   # entries before this kept their spread-out dates (WORKLOG 2026-11-22 g)
entries, descriptions = [], {}
for f in sorted(JOURNAL.glob("*.md")):
    text = f.read_text()
    m = re.match(r"---\n(.*?)\n---\n(.*)", text, re.S)
    if not m: err(f.name, "no front matter"); continue
    fm, body = yaml.safe_load(m.group(1)) or {}, m.group(2)
    if fm.get("draft"): continue
    n = f.name
    # Keys and kind
    for k in set(fm) - KEYS: err(n, f"front-matter key not allowed: {k}")
    kind = fm.get("type")
    if kind not in TYPES: err(n, f"type not allowed: {kind}")
    if kind == "link" and not str(fm.get("link", "")).startswith("http"): err(n, "a link entry needs link: https://…")
    if not fm.get("title"): err(n, "no title")
    # Date: the file name's day, a time of day, not in the future
    fm_date = fm.get("date")
    fn = re.match(r"(\d{4}-\d{2}-\d{2})-([a-z0-9-]+)\.md$", n)
    if not fn: err(n, "file name must be YYYY-MM-DD-slug.md (lowercase, hyphens)"); continue
    if isinstance(fm_date, datetime.datetime): day, has_time = fm_date.date(), True
    elif isinstance(fm_date, datetime.date): day, has_time = fm_date, False
    else: err(n, "date: missing or not a date"); continue
    if str(day) != fn.group(1) and day >= SOP_FROM: err(n, f"date: {day} does not match the file name's {fn.group(1)}")
    if day > today: warn(n, f"dated {day}: scheduled, held back until that morning")
    # Tags: category first; quotes carry no subject; notes, essays and links take one
    tags = fm.get("tags") or []
    if not tags or tags[0] not in CATEGORIES: err(n, f"first tag must be a category {CATEGORIES}, got {tags}")
    subj = tags[1:]
    if kind == "quote" and tags[:1] == ["Quotes"] and subj: err(n, f"a quote carries no subject, got {subj}")
    if kind != "quote" and not subj: warn(n, "no subject tag (HANDBOOK §3)")
    if len(subj) > 2: warn(n, f"{len(subj)} subjects; one, rarely two")
    for s in subj:
        if s not in SUBJECTS: warn(n, f"subject '{s}' is not on HANDBOOK §3's list — new subjects only on Kalyan's word")
    # Content: no TODO, pictures with alt text
    if "TODO" in body: err(n, "TODO: still in the text")
    for alt, src in re.findall(r"!\[([^\]]*)\]\((/images/[^ )]+)", body):
        if not alt.strip(): err(n, f"picture without alt text: {src}")
        if not (ROOT / src.lstrip("/")).exists(): err(n, f"picture missing: {src}")
    entries.append((fm_date if has_time else datetime.datetime.combine(day, datetime.time()), has_time, fn.group(2), n))
    # The built page: description, title, canonical, structured data
    page_f = SITE / "journal" / fn.group(2) / "index.html"
    if day > today: continue
    if not page_f.exists(): err(n, f"not built: {page_f.relative_to(ROOT)} (run a clean build first)"); continue
    page = page_f.read_text()
    d = meta(page, "description")
    if not d: err(n, "no meta description")
    else:
        if len(d) > 160: warn(n, f"description {len(d)} characters (aim ≤ 155)")
        if d in descriptions: err(n, f"description shared with {descriptions[d]}")
        descriptions[d] = n
    t = re.search(r"<title>(.*?)</title>", page, re.S)
    if t and len(html.unescape(t.group(1))) > 70: warn(n, f"page title {len(html.unescape(t.group(1)))} characters (Google shows ~60)")
    if f'rel="canonical" href="https://iasips.in/journal/{fn.group(2)}/"' not in page: err(n, "canonical address missing or wrong")
    if not meta(page, "og:image", "property"): err(n, "no og:image (link preview)")
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S):
        try:
            g = json.loads(block)
            if not any(x.get("@type") == "BlogPosting" for x in g.get("@graph", [])): err(n, "JSON-LD has no BlogPosting")
        except json.JSONDecodeError as e: err(n, f"JSON-LD does not parse: {e}")

# Same-day order: every entry on a shared day needs its time, and no two the same
by_day = {}
for when, has_time, slug, n in entries: by_day.setdefault(when.date(), []).append((when, has_time, n))
for day, group in by_day.items():
    if len(group) > 1:
        for when, has_time, n in group:
            if not has_time: err(n, f"{len(group)} entries on {day}: give each date: a time (YYYY-MM-DD HH:MM:SS) so they stand in order")
        if len({w for w, _, _ in group}) < len(group): err(str(day), "two entries share the same date and time")

# Home page order = newest first
home = SITE / "index.html"
if home.exists():
    shown = re.findall(r'<a href="/journal/([a-z0-9-]+)/"', home.read_text())
    newest = [s for _, _, s, _ in sorted(entries, key=lambda e: e[0], reverse=True) if s in shown]
    order = list(dict.fromkeys(s for s in shown if s in newest))
    if order != newest[:len(order)]: err("home page", f"order {order[:4]} is not newest first {newest[:4]}")

for w in warns: print("WARN ", w)
for e in errors: print("ERROR", e)
print(f"{len(entries)} entries checked: {len(errors)} errors, {len(warns)} warnings")
sys.exit(1 if errors else 0)
