# DESIGN.md — Visual Specification (FROZEN)

Status: frozen upon Kalyan's approval. This file may only change when an
instruction from Kalyan contains the phrase "design change", and every
design change edits this file in the same PR as the implementation.

Character in one line: Simon Collison's v4 (colly.com/v4) — graph-paper
field, white translucent card panels with engravings, condensed red
wordmark, Times text, dashed hairlines, a white content panel — plus one
addition of ours, quote entries. When in doubt, open reference/colly-v4/
and measure; do not reason from taste.

HISTORY. 2026-08-30 v1 of this file reinterpreted v4 (no fills, no radius,
no shadows, no engravings, Georgia, bordered boxes). Kalyan's side-by-side
verdict: "not even close". v2 (this file) adopts v4 whole: the stylesheet
is a transcription of reference/colly-v4/screen.css with v4's own pixel
values (reference/colly-v4/MEASUREMENTS.md). Departures are listed in §14.

## 1. Type

Text stack (v4): "Times New Roman", Times, Cambria, serif.
Wordmark and crosshead face: League Gothic (SIL OFL), self-hosted as
src/fonts/LeagueGothic-Regular.woff2, standing in for v4's logo.png /
ext-refs.png lettering. Fallback 'Arial Narrow', Impact.
Code face: VT323 (SIL OFL), self-hosted as src/fonts/VT323-Regular.woff2 —
the "8-bit" terminal face Kalyan asked for on 2026-08-30 (design change);
18px/20px in blocks, 17px inline. Fallback Courier New.
These are the only two webfonts. Never a sans-serif for text.

- Entry paragraphs are JUSTIFIED with automatic hyphenation (`hyphens:
  auto`, `lang="en"`), `text-wrap: pretty`; headings `text-wrap: balance`.
  Borrowed from algebrica.org on Kalyan's ask, 2026-09-03 — the even block
  is what makes that site read as a book. Lists, callouts, tables stay
  ragged.
- Paragraph numbers (algebrica.org, 2026-09-03): every direct paragraph of
  a JOURNAL ENTRY (#post; not the About or Contact pages) carries its
  ordinal in the left gutter — 11px tabular #999,
  right-aligned 12px clear of the text, at the paragraph's first baseline.
  The lede counts as 1. Callout, blockquote and list paragraphs are not
  numbered. Hidden on the phone tier, where there is no gutter.
- body 13px / 22px; paragraphs 15px/24px with 15px between them (v4 set
  22px; raised 2026-08-30 on Kalyan's ask — the measure is 516px and needed
  the air). Prose list rows 15px/23px with 9px beneath. Table cells 14px/20px.
- Section heads sit 42px clear of the text above them (v4: 30px).
- lede (first paragraph of an entry, v4 p.intro): 18px / 26px.
- page title h2: 35px / 29px normal weight (article: 40px), 28px below,
  a 1px rgba(102,102,102,.24) rule 13px above the bottom (v4 underline.png).
- p.sub: 15px uppercase, no tracking, 44px below. A front-matter `sub`
  tagline on an entry sits 12px above the meta line.
- Entry meta line (2026-09-03, Kalyan: "can it all be in one line?"): one
  italic 13px #666 line between #DDD rules, v4's index p.meta form —
  "30th August 2026 · Updated 3rd September 2026 · 7 min read · Archived in
  GS2 | Polity", categories as red links to their category pages. The same
  line at every width. (2026-09-02 tried v4's uppercase p.sub date with the
  rest in the sidebar; Kalyan found the sidebar "complicated".)
- journal-index entry title: 25px / 30px red link with a 1px #DDD rule;
  date h4 14px uppercase with a 10px ordinal span; blurb = first
  paragraph, no drop cap; p.meta 13px italic #666 between rules.
- section head h5: 20px normal, title case; qualifier span 11px italic #999.
  h6 14px (#666 capitalised on the about page). In-body h2 20px; h3 14px
  spaced caps.
- spaced caps = uppercase, letter-spacing 1px, 12px: nav labels, sidebar
  h3, footnote heading, quote author line.
- footnotes 11px / 125% #666; backlink 9px.
- Curly quotes, real ellipsis, en dashes — markdown-it typographer, frozen.

## 2. Color (all v4)

paper #F3EFEB (mean of paper-tile.jpg) · text #333 · labels/sidebar h3
#000 · red #ba1820 (links, versal hover, wordmark, drop-cap helper, quote
rule) · visited #d0656a · link hover #999 / #666 in text · secondary #666,
tertiary #999 · rules #DDD, first-row tops #CCC · blockquote rule #EEE ·
image fill #FFFAFA · subnav strap #d24b21 · colophon links #beb2b2, span
#fca0a5 · grid rgba(192,189,183,.135) · card fill rgba(253,251,251,.55) ·
content fill rgba(252,250,250,.69) · shadow 1px 1px 7px rgba(153,153,153,.2).
Links in text: red, underlined. No dark mode.
Contrast (2026-09-03): #999 is kept for MARKERS — list dashes, ol numerals,
the hr, anchors, code punctuation — but where #999 coloured WORDS (card
straps, the h5 qualifier, ledger-row spans, sidebar h3 items, the reading
time, the colophon) the ink is now #6c6c6c, the lightest grey that clears
4.5:1 on the paper. v4's #999 text measured 2.6:1.
Keyboard focus: a 2px #ba1820 outline, 2px off, on :focus-visible only
(v4 switched outlines off).

## 3. Graph-paper field

Paper colour plus a one-weight CSS lattice every 10.5px at the grid colour
(v4 graph-tile.png: lines at 10, 21, 32, 42, 52). The content panel and
cards sit on it as translucent white.

## 4. Page skeleton (v4 markup, ids kept)

Headings (2026-09-03): every page has ONE h1 — the page title on inner
pages (class .page-title carries v4's h2 styling), the wordmark on the
home page. In-body heads are h2/h3. Search engines read the outline.
robots.txt allows everything and names the sitemap.
Landmarks (2026-09-03, invisible): `<header>` wraps masthead and nav,
`<nav aria-label="Site">` wraps ul#nav-primary, `<main>` wraps the page
content, `<footer>` wraps external references and #siteinfo; an entry's
#post is an `<article>`; every date is a `<time datetime>`.
Head: charset, viewport, title, description (the entry's `sub`, else
site.json `description`), author, canonical (`site.url` + page URL),
rel=prev / rel=next on entries (older / newer), color-scheme light, the
stylesheet for ALL media (print rules were dead while it said
`media="screen"`), RSS, a preload for the wordmark font.
Search and answer engines (2026-09-03, Kalyan: "SEO- and GEO-friendly"):
Open Graph title/description/url/type/site_name, og:image when site.json
`ogImage` names a 1200×630 image, twitter:card summary, article
published/modified times, and a JSON-LD block — BlogPosting on entries,
WebSite elsewhere — carrying headline, dates, author, keywords (the tags)
and URL. JSON-LD is DATA in a script element, not code that runs; §10's
no-JavaScript rule stands.
  - Category pages (/journal/category/<slug>/, 2026-09-03): one per tag,
    built from the tags in front matter, in the journal index's shape with
    the title "Archived in <Tag>". Every "Archived in" is a link to them —
    v4 linked its categories the same way.

Canvas div#page 946px wide, margin 20px auto, padding 30px 17px 10px.

  #branding      the logo lockup set in type, one link home, 460px wide:
                 italic 15px line · bold 13px caps line tracked 2px ·
                 the name in League Gothic 56px/52px red (hover #333).
  ul#nav-primary four cards (§5). Home: no content panel below.
  #content-wrap  white translucent panel: 1px #DDD border, 5px radius,
                 shadow, padding 40px 0 70px, margin 0 3px 35px 0.
    #content-pri floats RIGHT, 516px, padding 5px 110px 0 87px, 1px dashed
                 #DDD left rule. Furniture: h2.page-title → p.sub → lede →
                 body; h5/h6 section heads; ol#footnotes last.
                 On an entry: h2.page-title → p.sub tagline (optional) →
                 p.meta line (§1) → lede.
    #content-sec floats LEFT, 196px + 25px right padding, right-aligned:
                 p.home-link, portrait (7px #FFFAFA padding, rotated -2°),
                 h3, list with dashed rows. Always present; may be empty.
                 On an entry (2026-09-03): p.home-link → p.paginate
                 "← OLDER / NEWER →" in 12px spaced caps between dashed
                 rules (v4's Prev/№/Next badge, in type) → h3 "In this
                 entry" + the TOC. Nothing else. Under 989px, where the
                 sidebar hides, the TOC moves inline under the meta line and
                 v4's p.paginate returns at the post foot.
  h2.ext-dests   "EXTERNAL REFERENCES { VIEW ALL }" — League Gothic 28px,
                 "References" red, links to /external/.
  ul.subnav ×1   one row of four cards (§5) for external destinations —
                 Substack, Instagram, X, RSS (Kalyan, 2026-09-03: "I won't
                 be using so many"). v4 had four rows.
  #siteinfo      centred #999 prose, two paragraphs, 60px above.

  - Journal (/journal/): v4 "multiple" shape per entry — h3 title link,
    h4 date, p.blurb (first paragraph), p.meta "Archived in … · Read on,
    there is more →" on ONE line (v4 broke it over two; Kalyan 2026-09-03).
  - Archive (/archive/): 18px year headings, then title + 11px italic
    date rows with dashed rules.
  - Home (/): masthead, cards, external references, colophon. Each home
    card carries v4's COPY under its engraving (missed on 08-30; Kalyan
    spotted it 2026-09-03): the about and contact cards a drop-cap lead
    (`.fl`), a sentence or two and a red "read on →" (`a.dest`); the
    journal card a red § (`.fs`) + the newest entry's title, its opening
    (150 chars) and "More →"; the archive card the five latest titles as
    `a.arch` rows, numbered from the oldest entry = 1 (v4 used entry ids).
    Copy is 13px/18px #333, 12px below the engraving. The two prose blurbs
    live in site.json `nav[].home` — Kalyan's words.
  - Archive (/archive/): v4's shape — entries under "August 2026" month
    headings, title-only rows with dashed rules; the sidebar carries "By
    year" (anchors into the list) and "By category" (the category pages),
    v4's "By animal years" / "By categories". (08-30 grouped by year with
    a date span, and left the sidebar empty.)

## 5. Nav cards (v4 markup)

  <li class="card"><a href="…">
    <span class="strap">Bottled for your pleasure</span>
    <span class="label"><span>P</span>otted <span>A</span>utobiography</span>
    <span class="engraving"><img src="/images/engravings/….png" alt=""></span>
  </a></li>

- 207px wide + 10px padding, 1px #DDD border, 5px radius, shadow, white
  fill; line-height 18px; 10px gaps; four across, wrapping on narrow
  canvases (2 across ≤989px, 1 across ≤509px). Never a hamburger.
- strap: italic, #999 (link colour), hover red.
- label: 12px spaced caps #000; the initial of each word in its own span
  at 15px (`versals` filter); `kern` map adds .kern-a etc.
- engraving: a 200×160 transparent PNG, bottom-anchored in a 105px slot.
  Every card has one, from Gosse's *Natural History* (public domain;
  images/engravings/CREDITS.md). Colly's own animals, kept as placeholders
  until 2026-09-03, are deleted.
  Hidden on inner pages ≤509px, as v4.
- On inner pages non-current cards are at opacity .6, the current card and
  hovered cards at 1 with a solid white fill. On the home and external
  pages, and in the subnav rows, cards are translucent (.55) at opacity 1.

## 6. Drop caps

- The lede gets a floated 57px first letter (line-height 92%, 3px right)
  only where front matter sets `dropcap: true`; journal-index blurbs get
  none (v4's blurb rule never fires — its blurbs nest a <p>). Colour inherits (#333) — v4's intro cap is not
  red; the red 65px `.fl` helper exists for hand-marked openings.

## 7. Rules, lists, footnotes, quotes

- hr: 1px dashed #ccc, 35px above/below (markdown `---`); `***` = "⁂".
- Two list registers (split 2026-08-30):
  **Prose lists**, inside an entry — hanging en-dash marker in #999, 3px
  padding, NO rules. A bulleted argument must not read as a table.
  **Ledger lists** — the archive, the about-page data lists, the sidebar:
  v4's rows, 15px, 5px padding, dashed #DDD below, dashed #CCC above the
  first; `span` inside a row is 11px italic #999.
- Footnotes: `[n]` markers 10px #666; a "FOOTNOTES" spaced-caps heading
  with a #DDD rule 60px above (30px in the journal); ol#footnotes 11px
  #666, #DDD rule below; each note begins with a 9px "↑" backlink.
  Jumps land with context: markers carry `scroll-margin-top: 33vh` and
  notes 30px, so the "↑" puts the sentence, not just the marker, in view
  (v4 did this with a jQuery scrollTo; we ship no script). A note at the
  foot of a short page still cannot reach the top of the screen — the page
  ends — and that is accepted.
- Blockquote: 3px #EEE left rule, 15px padding, 16px #666 text — v4's —
  with the `<cite>` 7px below in #666, RIGHT-aligned (Kalyan, 2026-09-03:
  "push B. R. Ambedkar to the right"). A red opening quotation mark was
  tried twice that day, hanging and then inline, and rejected both times:
  "remove the quotation marks, I think we can understand that."
- Tables (ours; reworked 2026-09-02): a table sits INSIDE the 516px
  measure like everything else — the 2026-08-30 gutter-reclaim was reversed
  on Kalyan's "the table is going out of the scope". 14px/20px, tabular
  numerals, header in 12px spaced caps #666 that wraps rather than
  overflowing, and v4's ledger rules: 1px dashed #CCC above the table and
  under the header, 1px dashed #DDD between and below the rows. 9px cell
  padding, no vertical rules, no zebra.
- Planning grid (`::: plan Title`): an answer skeleton, a structure, a
  schedule. Title in 12px spaced caps over a #CCC rule; each row is a
  hanging label in 12px spaced-caps slate at 116px, gloss beside it at
  15px/22px, dashed #DDD rules between (dashed #CCC above the title). Sits
  inside the measure like a table; the label stacks above the gloss at the
  breakpoints.
  **An answer skeleton is not code and must never be set as code** — that
  was the 2026-08-30 correction. Code styling (§7) is for code only.
- Run-in sidehead list (`::: cases`): term as its own line in 12px spaced
  caps slate, gloss beneath at 15px/24px, dashed #DDD rules between,
  dashed #CCC above the first and dashed #DDD below the last (the ledger
  register). Use where a bullet would collide with an em dash — case
  lists, definitions, any term-plus-explanation.
- Code: v4 pre (20px padding, #EEE fill, 1px #CCC rules above and below)
  set in VT323 18px/20px (v4: Courier New 12px/140%). Fenced blocks are coloured at build time by
  Prism classes (ours) in the palette only: keywords/tags red, strings
  #d24b21, comments #999 italic, numbers #666, names #000. Inline code
  12px Courier on #EEE. No client script.
- Images: 7px #FFFAFA padding, 1px #ddd border, shadow; caption = the
  markdown image title, 12px #666 (v4 cite).

## 7b. The 2026 body (ours — Kalyan, 2026-08-30: "imagine we are
rebuilding Colly in 2026"; the shell stays v4, the post body gains
modern elements drawn in v4's vocabulary)

- Callouts (`::: note|tip|key|warning Title`): the card treatment on a note —
  1px #DDD border, shadow, a 3px left rule, 12px spaced-caps title in the
  rule's colour, 14px/20px text, and a barely-tinted fill. Four muted ink
  hues, added 2026-08-30 on Kalyan's ask for "better colours"; they are the
  ONLY exception to §2's one-accent rule and exist nowhere else:
    note    grey      rule #CCC,    title #6c6c6c on #FBFAF9 — context
    tip     pale rose rule #e3b3b5, title #a94f54 on #FDFAFA — method
    key     rose      rule #d0656a, title #ba1820 on #FDF8F8 — remember
    warning red       rule #ba1820, title #ba1820 on #FDF6F6 — the mistake
  (2026-09-03, Kalyan chose "set D" — one hue in four weights — over the
  slate/moss/ochre inks of 2026-08-30, which "sat oddly on a cream-and-red
  page". With the inks gone, the `::: plan` and `::: cases` labels are
  #6c6c6c, and the site is back to one accent.)
  Lists inside a callout use dotted rules, not dashed.
- Collapsibles (`::: details Summary`): native <details>, dashed rules,
  red marker. No JS.
- Code fences: language, `/2-3` highlighted lines (rgba red .08), and
  `title="file.js"` which adds a filename tab (#E4E4E4, VT323 16px).
- Table of contents (front matter `toc: true`): built from ## and ###
  heads; rendered in the v4 sidebar under "In this entry" (the "Jump
  directly to" pattern) and, on canvases ≤989px where the sidebar hides,
  as a rule-bound block under the meta line. Sidebar form: #CCC rule top
  and bottom, #E4E0DA between; h2 items 13px/17px, h3 items 11px italic
  #999 indented beneath their parent.
- Section anchors: every ## and ### gets an id and a "#" link visible on
  hover (#999, 14px).
- <kbd>: VT323 16px on white, 1px #CCC border, 2px bottom, 3px radius.
  <abbr title>: dotted #999 underline.
- Reading time, updated date and categories sit in the one meta line under
  the title (§1). Older/Newer live in the sidebar p.paginate and fall back
  to the post foot under 989px.
- Touch canvases (≤989px): TOC rows 7px padding, Older/Newer 8px, footnote
  markers and backlinks padded to a fingertip (2026-09-03).
- Print: nav, cards, sidebar and pagination hidden; white ground; external
  link URLs printed after the link text. Paragraph numbers print.
- Front matter `updated: YYYY-MM-DD` (2026-09-03): shown as "Updated …" in
  the meta line; feeds dateModified, article:modified_time and the
  sitemap's lastmod. Optional.

## 8. Quote entries (type: quote) — ours

- Body = quote paragraph(s), then `<cite>Name</cite>`, then optionally
  `---` and commentary (permalink only).
- Panel: 3px red left rule, 24px/32px Times text, "— NAME" 12px spaced
  caps set right; the journal index shows the panel with h4 date and p.meta; the
  permalink adds p.meta and, after a dashed hr, the commentary.

## 9. Images — see §7. loading="lazy" is added by the build.

## 10. Motion and JavaScript

No JavaScript on any page (a JSON-LD data block in the head is not
JavaScript — nothing executes). No transitions beyond the browser defaults; the
only transform is the sidebar portrait's -2° (v4). RSS (/feed.xml) and
sitemap (/sitemap.xml) are built at build time.

## 11. Responsive behavior — v4's two widths

≤989px: canvas 468px, cards two across, sidebar hidden, text column 408px
with a 30px gutter each side, list numerals indented.
≤509px (the phone tier; made fluid 2026-09-02): the canvas fills the
viewport with 10px of paper each side and no canvas padding; cards full
width; inner-page engravings hidden; the text column fills the panel with
an 18px gutter each side; page title 25px; images no wider than the column.
v4 fixed this tier at a 306px canvas / 260px column, which on a 375–430px
phone left 35–62px of graph paper each side — Kalyan, 2026-09-02: "the
middle of the body is getting less space whereas the squares in the
background are eating up a lot of space."

## 12. Permanently forbidden

Sans-serif text; Tailwind or utility frameworks; hamburger or JS
navigation; dark mode; hero/product blocks; emoji; icon fonts/SVG icon
sets; cookie banners; client-side analytics; newsletter modals; skeleton
loaders; hover-lift or scroll effects; any second accent hue.

## 13. Frozen files covered by this spec

src/css/**, src/fonts/**, src/_includes/**, src/_data/site.json,
src/_data/build.js, .eleventy.js, content/*.njk,
content/journal/journal.11tydata.js, images/engravings/**, package.json,
package-lock.json, .nvmrc, reference/**, this file.

## 14. Departures from v4 (each is a decision, reversible by "design change")

| v4 | ours | why |
|---|---|---|
| logo.png, ext-refs.png, home-c.png sprites | the same words set in League Gothic / type | no image assets of Kalyan's yet |
| Colly's animal engravings | Gosse's birds and fishes, public domain | his artwork; placeholders deleted 2026-09-03 |
| paper-tile.jpg texture | flat #F3EFEB | Colly's texture asset |
| deranged.png + underline-flourish.png ornaments | omitted; 60px colophon gap | Colly's artwork |
| contact form, comments | none | no JS, no services |
| journal pagination | single page | small site |
| — | quote entries (§8) | Kalyan's addition |
| — | dashed table rules, in-body h2/h3 sizes | v4 has no tables / in-body heads |
| pre only, Courier | Prism colours at build time; VT323 8-bit face; inline code on #EEE | posts carry code; Kalyan's ask |
| ≤989px: text flush left, numerals hidden | 30px gutter both sides; ol and footnote numerals kept | "not showing fully" — Kalyan 2026-08-30 |
| — | `sub`, `toc` front-matter keys | tagline under titles; table of contents |
| — | four muted callout hues (§7b) | Kalyan, "better colours" |
| 22px leading, 30px above heads | 24px leading, 42px above heads | Kalyan, "line-spacing-wise there is scope" |
| — | tables, `::: plan`, `::: cases` inside the 516px column with v4's dashed ledger rules | 2026-08-30 they reclaimed the gutter; reversed 2026-09-02, "the table is going out of the scope" |
| ≤509px: fixed 306px canvas | fluid phone tier, 10px paper each side | Kalyan 2026-09-02, the paper "eating up a lot of space" |
| jQuery scrollTo for footnotes | `scroll-margin-top` on markers and notes | no script |
| answer skeleton set as a code block | `::: plan` printed grid | Kalyan: "the worst of all the designs" — it was never code |
| v4 dashed rows for every list | prose lists get hanging en-dashes, no rules | a bulleted argument is not a table |
| — | §7b: callouts, details, code tabs/line marks, TOC, anchors, kbd/abbr, reading time, older/newer, print | "Colly rebuilt in 2026" |
| post: title → date → lede; categories and prev/next in the sidebar | the same (restored 2026-09-02; the meta block under the title is gone) | Kalyan: "when I finally post a blog, it should look like his posts" |
| ragged-right paragraphs | justified, hyphenated, numbered in the gutter; `updated` line | algebrica.org, Kalyan 2026-09-03: "adopt best practices from algebrica" |
| sidebar aside ("Superfluous Aside") with categories, read time | one meta line under the title; sidebar = journal link, Older/Newer, TOC | Kalyan 2026-09-03: "we are complicating the sidebar… push it below the title" |
| four callout inks (ours, 08-30) | one hue in four weights (§7b) | Kalyan 2026-09-03: "I like set D" |
| cite under the quote, left | cite right-aligned on blockquotes and the quote panel | Kalyan 2026-09-03: "push the name to the right" |
| h2 page titles, no h1 | h1 page titles, styled as before; h1 wordmark on the home page | one h1 per page, 2026 |
| category pages, hCard | category pages; Open Graph, JSON-LD, sitemap lastmod, image dimensions, font preload | Kalyan 2026-09-03: "lightning-fast, SEO- and GEO-friendly" |
| #999 text, outlines off, `media="screen"`, div soup | #6c6c6c text, focus ring, all-media stylesheet, landmarks, time, description/canonical/prev/next | 2026 practices, Kalyan 2026-09-03 |
