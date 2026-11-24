# HANDBOOK — what this blog can do, and how a post is made

Read this before writing or editing any post. It is the complete list of
what the site accepts. Anything not here is not a feature; adding one is a
"design change" (AGENTS.md §9).

## 1. The site in five lines

- Live at <https://iasips.in>, built by GitHub Pages from
  <https://github.com/iksa01/iasips-site> on every push to `main`.
- Static HTML, no JavaScript, no comments, no analytics, no embeds.
- Design (2026-11-22): Seth Godin's stream, Gates Notes' centred column, Tim
  Ferriss's blue links, Georgia; DESIGN.md is the law. Start a post with
  `./today.sh "The title"`.
- Voice: only Kalyan's words are published. A missing fact is a `TODO:`.
- Publish = commit + `git push`. Live about a minute later. Check with
  `gh run list --workflow=pages.yml`.

## 2. Four kinds of entry

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
    date: 2026-08-26 21:40:00     # India time; ./today.sh writes it
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

A **Listening** entry (a talk or podcast) is a note that opens with a
`::: video` card (§4c), then Kalyan's notes. No embedded players.

### Quote — a line worth keeping
The stream shows the quote large and italic, the name under it on the right, and the date,
category and permalink in the margin column at its left (DESIGN §6); no title is printed (the title names the page for the head,
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

### Link — someone else's piece, with your line (design change 2026-11-24)
Kalyan's "E1" (DESIGN §7a). The stream and the page show "LINK · X.COM" (the
domain read from `link:`), the title linking out to the piece with a blue →,
the credit (`sub:`), the passage, then Kalyan's own line. The date in the
ledger stays the permalink. The passage is a plain `>` blockquote, quoted
from the piece; the line under it is Kalyan's, never written for him. When he
sends no line, there is none: the post ends with the passage (Kalyan, 2026-11-24).

    ---
    title: "Superintelligence is Arriving"
    sub: "by Alexandr Wang · X Article · 22 Nov 2026"
    date: 2026-11-24
    tags: [Notes]
    type: link
    link: https://x.com/alexandr_wang/status/2124636606959345776
    ---
    > The passage, quoted from the piece.

    Kalyan's own line.

## 3. Categories

One category per post, by source; a subject may ride along as a second tag.
Each becomes a page at `/journal/category/<name>/` and is listed in the
journal and archive pages automatically.

| category | what goes in | kind |
|---|---|---|
| Quotes | a line, with or without a comment | quote |
| Books | an excerpt and what you make of it | quote + commentary |
| Press | a newspaper clipping with analysis | essay with `::: clipping` |
| Listening | a YouTube talk or podcast, with notes | note, link first |
| Notes | your own thoughts | note, or essay when long |

Subjects in use: AI, Mahabharata. The short list to choose from: AI, Ethics, Polity, Economy,
World, History, Society, Environment, Mahabharata (Kalyan, 2026-11-24: "Mahabharata is
Mahabharata", not Ethics). One subject per entry, rarely two; never a new
one for a single post. **Quotes carry no subject** — a quote is just a quote, filed
under Quotes (Kalyan, 2026-11-24); notes, essays and links take a subject. Each subject gets its own page, as a category does.

## 3a. Search, previews and AI engines (design change 2026-11-24, DESIGN §4a)

Automatic; nothing to write. Each entry's description (what Google and AI answers
show) is made from the entry: a quote's words and name, a link's passage, a note's
first paragraph — or `sub:` where it describes the page. The structured data names
Kalyan as one person across the site, Substack, Instagram and X. A post's first
picture becomes its link preview. /llms.txt lists every entry for AI tools; the
sitemap lists every entry and every category page. Renaming a category is a bulk
find-and-replace in front matter, but after going live a rename breaks
the old category address.

## 4. Blocks you can use inside a post

All are plain Markdown or a `:::` fence; close each fence with `:::`.

| write | you get |
|---|---|
| `::: note Title` … `:::` | grey box — context, definition, where it sits |
| `::: tip Title` … `:::` | pale-blue box — method, how to write it |
| `::: key Title` … `:::` | pale-yellow box — the thing to remember |
| `::: warning Title` … `:::` | red box — the mistake that costs marks |
| `::: details Summary` … `:::` | a fold-away, click to open |
| `::: plan Title` + bulleted list, items starting `**Label**` | a printed planning grid (answer skeleton). Never a code fence for this. |
| `::: cases` + bulleted list, items starting `**Term**` | term-and-gloss list with spaced-caps sideheads |
| `::: clipping The Paper, date` + image + `>` passage + link | a press cutting: framed picture linked to its full page, the paper as its credit; analysis goes after the closing `:::` |
| `> quoted text` then `<cite>Name</cite>` | blockquote, the name set right UNDER it — also the home for a **long passage** (not a quote) |
| `::: quote` + a short line + `<cite>Name</cite>` + `:::` | a short quote inside an essay or note: the blue-ruled quote, name under it |
| `::: casetable slug slug +slug` then `:::` | a Case / Year / What it held table built from the case register; `+` sets a row in bold |
| `| a | b |` table | ledger-ruled table inside the column |
| ```` ```js/2-3 title="file.js" ```` | code with Prism colours, highlighted lines, filename tab. Code only. |
| `---` | hairline rule |
| `***` | ⁂ asterism |
| `[^1]` and `[^1]: note` | footnote with ↑ backlink |
| `[words](/journal/slug/)` | a link to another entry; `/journal/category/press/` to a category |
| `![alt](/images/folder/file.jpg "Caption \| Credit")` | a framed picture, caption in italic, credit in small caps beside it (see §5) |
| `<kbd>Ctrl</kbd>`, `<abbr title="…">UPSC</abbr>`, `<sup>`, `<cite>` | the only raw HTML allowed |

House typography is automatic: curly quotes, real ellipsis, en dashes.

## 4c. Cards for outside material (design change 2026-09-26)

No embeds and no scripts, still: a talk, a post or a book appears as a card
built from this site's own files, and the outside service is reached only
when a reader clicks. Kalyan sends the link; the agent fills the card.

    ::: video https://youtu.be/ID
    title: The video's title
    channel: Channel name
    length: 1 hr 14 min
    still: /images/listening/YYYY-MM-DD-slug.jpg
    :::

The still: `curl -o images/listening/…jpg https://img.youtube.com/vi/ID/maxresdefault.jpg`
then `python3 tools/prepare-image.py` on it. Title and channel from
`https://www.youtube.com/oembed?url=…&format=json`.

    ::: post
    source: X · Ramachandra Guha · @Ram_Guha · 26 September 2026
    title: A short title for the card
    link: https://x.com/…            (X, Instagram, Facebook, LinkedIn — the link label follows the site)
    picture: /images/…jpg            (optional — only Kalyan's own picture, or one he has permission for)
    alt: what the picture shows
    The post's words, copied (markdown allowed; blank line = new paragraph).
    :::

X text: `https://cdn.syndication.twimg.com/tweet-result?id=<id>&token=a`.
Instagram does not show a caption to logged-out readers: ask Kalyan to
paste it. Never copy another account's picture.

    ::: book
    title: Title: Subtitle
    author: Author
    published: Publisher, year
    read: September 2026             (optional)
    cover: /images/books/…jpg        (optional — Kalyan's own photo of the cover; else a typeset cover)
    link: https://amzn.to/…          (optional — Kalyan's Amazon affiliate link → "Buy on Amazon →")
    :::

A document (2026-11-22): put the PDF in `files/<folder>/`, named by date and
subject, then

    ::: pdf /files/2026-11-22-federalism-notes.pdf
    title: Federalism: the full notes
    pages: 12                        (optional)
    note: One line about what is inside   (optional)
    :::

The card shows a page icon, the title, "PDF · 12 pages · 1.4 MB" (the size is
read from the file) and "Open the PDF →".

**Amazon links** (Kalyan is an Amazon Associate, tag `parivarthan-21`, in
site.json as `amazonTag`). Write any Amazon link plainly — the build adds his
tag (2026-11-22). Three ways, all becoming `https://www.amazon.in/dp/<ASIN>?tag=parivarthan-21`:
`https://www.amazon.in/dp/178125981X` (a copied link, tracking and all, is
cleaned), an amazon.com product link (moved to Amazon India, where his
readers are), or the shorthand `amazon:178125981X`. A search link
(`https://www.amazon.in/s?k=Title+Author`) keeps its words and gains the tag.
Use them anywhere — in text, in a book card's `link:`, or on the book title in a
quote's name: `<cite>Viktor E. Frankl, [*Man's Search for Meaning*](https://amzn.to/…)</cite>`.
The build marks every Amazon link `rel="sponsored nofollow"` (what Google
asks of paid links), and Amazon's disclosure is printed once, as the About page's last line
(site.affiliateNote). Only Kalyan's own links: never build one with a
guessed product or tag.

A book review is an essay in Books that opens with `::: book`.

## 4a. The case register (design change 2026-09-26)

Every court case lives once in `src/_data/cases.json`: slug, name, year,
`match` (the words that identify it in text), `short` (for tables) and
`held` (for the index). From it the build makes: case tables
(`::: casetable`), 
and the Case index at /cases/ — every case, its holding, and the entries
that mention it. A new case cited in a post: add it to the register first,
from Kalyan's own words; a holding not yet supplied is a `TODO:`.

## 5. Pictures

1. Put the file in `images/<folder>/` (press, photos, …), named by date and subject.
2. Run once: `python3 tools/prepare-image.py images/press/2026-08-26-clip.jpg`
   — fits it to 1400px, writes .webp and .avif beside it, records its size.
3. Reference it as `![alt](/images/press/2026-08-26-clip.jpg "Caption | Credit")`.
   The words before ` | ` are the caption, after it the credit (photographer,
   place and date, the paper); either may be left out. The build serves
   AVIF/WebP with a JPEG fallback, reserves the space, centres it, and
   sets an upright picture narrower. One picture style only (Kalyan,
   2026-10-20: no frameless wide pictures).

A press cutting: prepare two files, a readable crop (headline, picture,
the passage) and the whole page; show the crop inside `::: clipping` and
end the block with `[See the full page →](/images/press/…-full.jpg)`.

No hotlinking; no width or alignment hacks in content. A newspaper page
may be shown whole (Kalyan's decision, 2026-09-04); quote a passage in
text and put the analysis outside the clipping block.

## 6. Not accepted

- Raw HTML beyond the four tags in §4; `<style>`, `<script>`, `<iframe>`,
  embeds of any kind, inline styles.
- New front-matter keys or values. The keys are: title, sub, date, updated,
  tags, type (quote | note | link), link (only with type: link), dropcap, toc,
  permalink, draft.
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
    rm -rf _site && npx @11ty/eleventy # must exit 0; fix anything it reports
    python3 tools/check.py             # must say 0 errors; read every WARN
    git add -A && git commit -m "…"    # one line: what changed, which files
    git push                           # live in about a minute
    gh run list --workflow=pages.yml --limit 1   # "completed success"
    curl -s -o /dev/null -w "%{http_code}\n" https://iasips.in/journal/<slug>/

**The SOP, every post, every time** (Kalyan, 2026-11-24: "make this sop every time:
check dates, tags, SEO best practices"). `tools/check.py` does the starred items itself.

1. **Source** told to Kalyan: who, which work, date, page; category; address.
2. **Date** \*: `date: YYYY-MM-DD HH:MM:SS`, India time, the day matching the file name
   (`./today.sh` writes both). Same-day entries stand newest first by that time.
3. **Tags** \*: the category first (one of five); quotes nothing more; a note, essay or
   link one subject from §3. A new subject only on Kalyan's word, then added to §3.
4. **Front matter** \*: only the keys in §6; a link entry has `link:`.
5. **Words**: Kalyan's, or approved by him; no `TODO:` left \*; no guessed attribution.
6. **SEO / GEO** \*: a description of its own, ≤ 155 characters (the first paragraph, or
   `sub:` — so the first paragraph should say plainly what the post is about); page title
   under ~60 characters; canonical address; link preview picture; structured data that
   parses. Pictures have alt text that says what is in them \*, and a caption naming people.
   Links: real, outside pages checked to answer; Amazon links plain (the build tags them).
7. **Order** \*: the home page shows the new entry where it belongs (newest first).
8. **After the push**: the run is "completed success", the address answers 200, and the
   entry stands where it should on the live home page.

July–September 2026 were deleted on Kalyan's word, 2026-10-20.

## 8. Facts only Kalyan supplies

`site.json` title and description, the licence line, page taglines, the
About and Contact text, books/talks/interviews, the portrait, a 1200×630
preview image, his favourites list. Never fill these with a guess.

## 9. Read next

RESTART.md (how to run and resume), WORKLOG.md (every decision and why),
DESIGN.md (the visual law), AGENTS.md (the rules for an agent).
