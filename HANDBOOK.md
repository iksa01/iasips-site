# HANDBOOK — what this blog can do, and how a post is made

Read this before writing or editing any post. It is the complete list of
what the site accepts. Anything not here is not a feature; adding one is a
"design change" (AGENTS.md §9).

## 1. The site in five lines

- Live at <https://iasips.in>, built by GitHub Pages from
  <https://github.com/iksa01/iasips-site> on every push to `main`.
- Static HTML, no JavaScript, no comments, no analytics, no embeds.
- Design: Simon Collison's Colly v4, transcribed; DESIGN.md is the law.
- Voice: only Kalyan's words are published. A missing fact is a `TODO:`.
- Publish = commit + `git push`. Live about a minute later. Check with
  `gh run list --workflow=pages.yml`.

## 2. Three kinds of entry

Every entry is one Markdown file in `content/journal/`, named
`YYYY-MM-DD-slug.md`. The date prefix is stripped from the address:
`2026-08-26-central-asia-less-romance.md` → `/journal/central-asia-less-romance/`.
**Never rename a file after it is pushed** — the address is permanent.

### Essay — the default
A titled piece of any length. The index shows its first paragraph and
"Read on"; the page shows the meta line, the body with numbered
paragraphs, and, if asked, a table of contents.

    ---
    title: "Less romance, more realism"
    sub: "One line under the title; also the description search engines show"
    date: 2026-08-26
    updated: 2026-09-01        # optional; shows "Updated …"
    tags: [Press, World]       # category first, subject second (§3)
    dropcap: true              # optional: red-free drop cap on the lede
    toc: true                  # optional: table of contents from ## and ###
    ---
    First paragraph is the lede, set larger.

    ## A section
    Body…

### Note — a thought, shown whole
A paragraph or two. The index prints the whole thing under its title with
one quiet line beneath: date · category · permanent link. No reading time.

    ---
    title: "Eleven, not ten"
    date: 2026-07-20
    tags: [Notes, Polity]
    type: note
    ---
    The Fundamental Duties were ten when…

A **Listening** entry (a talk or podcast) is a note whose first line is the
link: `Watch: [Title](https://…) — channel, 42 min.` No embedded players.

### Quote — a line worth keeping
The index shows the quote on a pale-rose panel (a solid red “ at its left, a small notch pointing down to the name, which sits right under
the panel; design change 2026-09-26) and the quiet line beneath; no title is printed (the title names the page for the head,
the feed and the archive). Optional commentary after `---` shows only on
the entry's own page. A **Books** entry is a quote with commentary.

    ---
    title: "A full man"
    date: 2026-07-12
    tags: [Books]
    type: quote
    ---
    Reading maketh a full man; conference a ready man; and writing an exact man.

    <cite>Francis Bacon, <em>Of Studies</em>, 1625</cite>

    ---

    Commentary, if any.

## 3. Categories

One category per post, by source; a subject may ride along as a second tag.
Each becomes a page at `/journal/category/<name>/` and is listed in the
journal and archive sidebars automatically.

| category | what goes in | kind |
|---|---|---|
| Quotes | a line, with or without a comment | quote |
| Books | an excerpt and what you make of it | quote + commentary |
| Press | a newspaper clipping with analysis | essay with `::: clipping` |
| Listening | a YouTube talk or podcast, with notes | note, link first |
| Notes | your own thoughts | note, or essay when long |

Subjects so far: Polity, World. Add others as needed (Economy, History,
Geography, Environment, Society, Ethics). Renaming a category is a bulk
find-and-replace in front matter, but after going live a rename breaks
the old category address.

## 4. Blocks you can use inside a post

All are plain Markdown or a `:::` fence; close each fence with `:::`.

| write | you get |
|---|---|
| `::: note Title` … `:::` | grey box — context, definition, where it sits |
| `::: tip Title` … `:::` | pale-rose box — method, how to write it |
| `::: key Title` … `:::` | rose box — the thing to remember |
| `::: warning Title` … `:::` | red box — the mistake that costs marks |
| `::: details Summary` … `:::` | a fold-away, click to open |
| `::: plan Title` + bulleted list, items starting `**Label**` | a printed planning grid (answer skeleton). Never a code fence for this. |
| `::: cases` + bulleted list, items starting `**Term**` | term-and-gloss list with spaced-caps sideheads |
| `::: clipping The Paper, date` + image + `>` passage + link | a press cutting in a dashed frame; analysis goes after the closing `:::` |
| `> quoted text` then `<cite>Name</cite>` | blockquote, name set right — also the home for a **long passage** (not a quote) |
| `::: quote` + a short line + `<cite>Name</cite>` + `:::` | a short quote inside an essay or note: the rose panel, name under it |
| `::: casetable slug slug +slug` then `:::` | a Case / Year / What it held table built from the case register; `+` sets a row in bold |
| `| a | b |` table | ledger-ruled table inside the column |
| ```` ```js/2-3 title="file.js" ```` | code with Prism colours, highlighted lines, filename tab. Code only. |
| `---` | hairline rule |
| `***` | ⁂ asterism |
| `[^1]` and `[^1]: note` | footnote with ↑ backlink |
| `[words](/journal/slug/)` | a link to another entry; `/journal/category/press/` to a category |
| `![alt](/images/folder/file.jpg "Caption")` | a picture with caption (see §5) |
| `<kbd>Ctrl</kbd>`, `<abbr title="…">UPSC</abbr>`, `<sup>`, `<cite>` | the only raw HTML allowed |

House typography is automatic: curly quotes, real ellipsis, en dashes.

## 4a. The case register (design change 2026-09-26)

Every court case lives once in `src/_data/cases.json`: slug, name, year,
`match` (the words that identify it in text), `short` (for tables) and
`held` (for the index). From it the build makes: case tables
(`::: casetable`), a "Cases in this entry" list in each entry's sidebar,
and the Case index at /cases/ — every case, its holding, and the entries
that mention it. A new case cited in a post: add it to the register first,
from Kalyan's own words; a holding not yet supplied is a `TODO:`.

## 5. Pictures

1. Put the file in `images/<folder>/` (press, photos, …), named by date and subject.
2. Run once: `python3 tools/prepare-image.py images/press/2026-08-26-clip.jpg`
   — fits it to 1400px, writes .webp and .avif beside it, records its size.
3. Reference it as `![alt](/images/press/2026-08-26-clip.jpg "Caption")`.
   The build serves AVIF/WebP with a JPEG fallback and reserves the space.

No hotlinking; no width or alignment hacks in content. A newspaper page
may be shown whole (Kalyan's decision, 2026-09-04); quote a passage in
text and put the analysis outside the clipping block.

## 6. Not accepted

- Raw HTML beyond the four tags in §4; `<style>`, `<script>`, `<iframe>`,
  embeds of any kind, inline styles.
- New front-matter keys or values. The keys are: title, sub, date, updated,
  tags, type (quote | note), dropcap, toc, permalink, draft.
- Renaming or deleting a published file; changing a date in a filename.
- Invented facts, quotes, biography. A gap is a `TODO:` line.
- Emoji. Sans-serif. Any colour beyond the palette. Client-side anything.
- `npm install`. Edits to `src/css/`, `src/_includes/`, `.eleventy.js`,
  `src/_data/site.json` or this file without "design change" in Kalyan's
  instruction.

## 6a. Drafts, scheduled entries, journal pages (design change 2026-09-26)

- **Draft**: add `draft: true` to the front matter. The entry shows on the
  local preview (`./start.sh`) but never on the live site, the feed, the
  sitemap or a category page. To publish, delete the line and push.
  Kalyan says "Draft quote: …" / "publish the draft".
- **Scheduled**: give the entry a future `date:`. It is held back until
  that day; the Pages workflow rebuilds every morning at 06:05 IST, so it
  goes live then with no push needed. The file is still pushed now.
  (GitHub pauses scheduled runs after 60 days with no pushes; any push
  wakes them.)
- **Journal pages**: 20 entries a page, newest first — /journal/,
  /journal/page/2/, … with "← Newer · Page 1 of N · Older →" at the foot.
  Category pages are not split.

## 6b. Checks the build makes (design change 2026-09-26)

- Every heading has an id: link to a section as `/journal/<slug>/#<heading-words>`.
- A broken link inside the site (a missing page, file or #section) stops
  the build with a list of what is broken — fix it, then publish.

## 7. The publishing routine

**First, tell Kalyan the source** (Kalyan, 2026-09-26): before the push,
one line — source (who; book / film / show / paper / talk; date, page),
category, address. Then publish. If the source is unknown, ask; never
guess an attribution.

    # 1. write or edit the file in content/journal/ (and prepare any picture)
    npx @11ty/eleventy                 # must exit 0; fix anything it reports
    git add -A && git commit -m "…"    # one line: what changed, which files
    git push                           # live in about a minute
    gh run list --workflow=pages.yml --limit 1   # "completed success"
    curl -s -o /dev/null -w "%{http_code}\n" https://iasips.in/journal/<slug>/

Specimens: the entries dated July–September 2026 are stand-ins written to
exercise the design (WORKLOG lists them). Delete them when real entries
exist; Kalyan says when.

## 8. Facts only Kalyan supplies

`site.json` title and description, the licence line, page taglines, the
About and Contact text, books/talks/interviews, the portrait, a 1200×630
preview image, his favourites list. Never fill these with a guess.

## 9. Read next

RESTART.md (how to run and resume), WORKLOG.md (every decision and why),
DESIGN.md (the visual law), AGENTS.md (the rules for an agent).
