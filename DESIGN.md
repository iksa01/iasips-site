# DESIGN.md — Visual Specification

Status: FROZEN 2026-11-23 (Kalyan: "frozen the design … live iasips.in design is
approved"). Built 2026-11-22 on Kalyan's instruction ("back up the colly blog,
then make the complete design changes inspired by seth + gates notes in tim colours").
From now on this file changes only when an instruction contains "design
change", and every design change edits this file in the same commit as the implementation.

Character in one line: a writer's daily blog. Seth Godin's rhythm (seths.blog: the newest
posts in full, one after another), Gates Notes' page (one centred column, wide white
margins), Tim Ferriss's colours (tim.blog), Georgia throughout.

HISTORY. 2026-08-30 to 2026-11-22 the site was a transcription of Simon Collison's v4
(colly.com/v4): graph-paper field, engraved cards, League Gothic wordmark, rose quote
panels. That design and its spec are kept whole at git tag `colly-v4` (branch
`backup/colly-v4` on GitHub) and in ~/Sites/kalyan-site-colly-v4-backup-20261122.tgz.

## 1. Sources (measured 2026-11-22)

| from | what | value |
|---|---|---|
| tim.blog (page CSS) | link colour, the page's most-used colour | #007CA7 |
| tim.blog | foreground (titles) | #001523 |
| tim.blog | rules / wash / yellow / red / grey | #DDDDDD / #F5F5F5 / #FFFAD6 / #DD3333 / #7E878E |
| tim.blog | link underline offset | 3px |
| gatesnotes.com | one centred reading column | 680px (set by eye; their site refused the download) |
| seths.blog | home page = newest posts in full, title + date + text | — |
| Kalyan | "a Georgia kind of font" | Georgia |

Ours, not measured: grey text darkened from #7E878E to #626B72 so small text passes
contrast; link hover #005A7A; the tip box tint #EEF6F9 (the link blue at 7%).

## 2. Type

- Georgia, "Times New Roman", Times, serif — a system font, nothing downloaded. Never a
  sans-serif for text. Old-style figures in running text; lining figures in tables.
- Code: the system monospace (ui-monospace, SF Mono, Menlo, Consolas). No font files are
  shipped (League Gothic and VT323 were removed 2026-11-22; Colly's are at tag colly-v4).
- Body 20px / 1.65 (phones 18px / 1.6). Paragraphs 1.1em apart. Ragged right.
- Page title 40px bold #001523 (phones 31px); stream title 30px (phones 25px); in-body h2
  26px, h3 21px, h4 20px italic.
- Sub (tagline) 21px italic grey. Entry details live in the margin ledger (§6).
- The About page is set in Charter (Kalyan, 2026-11-22, option 2 of four), falling back
  to Bitstream Charter, Sitka Text, Cambria, Georgia. Every other page is Georgia.
- Small labels (box titles, table heads, "In this entry"): 13–14px bold uppercase, 0.08em.

## 3. Colour

| token | value | use |
|---|---|---|
| --ink | #001523 | titles, bold, drop cap |
| --text | #222222 | body |
| --muted | #626B72 | dates, meta, captions, nav |
| --link | #007CA7 | every link; quote rule; tip box |
| --link-hover | #005A7A | hover |
| --rule | #DDDDDD | hairlines |
| --wash | #F5F5F5 | note box, code, contents |
| --tint | #EEF6F9 | tip box |
| --yellow | #FFFAD6 | key box, highlighted code lines |
| --red | #DD3333 | warning box |
| --rule-strong | #D3D8DC | the one firmer line: under table heads, over a plan |

White page (#FFFFFF). Links underlined at 40% of their colour, full colour on hover.
Lines softened 2026-11-22 (Kalyan: "a little bit more muted"): --rule #E6E6E6 (was
tim.blog's #DDDDDD); table heads and the plan's top take one 1–2px --rule-strong line
instead of ink.

**Dark mode** (2026-11-22) follows the reader's device setting — no switch, no script:
page #121416, text #D5D9DC, titles #EEF1F3, grey #9AA3AA, link #4FB3D9 (Tim's blue
lifted), rules #2A2F33; boxes, code and the typeset book cover darkened to match; pictures
at 92% brightness. Every colour in screen.css is a token so both modes stay in step.

## 4. Page skeleton

    header: Kalyan Inampudi (site.title, bold 26px, link home)  ·  Journal Archive About Contact
    ── 1px rule ──
    main: one column, max 680px, centred, 24px gutters (18px on phones)
    ── 1px rule ──
    footer: centred, 14px grey, after Jason Santa Maria's v5 (one line, bullets):
            © 2026 Kalyan Inampudi • Substack • Instagram • X • RSS
            (one line only, 2026-11-22: site.colophon[0], then site.externals' `short`
            labels; on phones the links drop to their own line)

No sidebar on any page. The current nav item is blue and underlined. The head (description,
canonical, Open Graph, JSON-LD, prev/next, inlined stylesheet) is unchanged from before.

## 5. Pages

- **Home** (`/`): one italic line about Kalyan (site.nav[0].home.copy — his words, set in
  2026-09) with "More about me →", then the ten newest entries as a stream (§6), then
  "Older entries →" and "Everything, by month".
- **Journal** (`/journal/`, `/journal/page/N/`): title, sub, the categories in one line,
  the stream, 20 a page, "← Newer · Page 1 of N · Older →".
- **Category** (`/journal/category/<tag>/`): the same, unpaginated.
- **Entry**: the margin ledger (§6) beside the title, sub, optional contents box and the
  text; at the foot, older and newer entries by title.
- **Quote entry**: the ledger beside the quote (§7) and the name; any commentary after a
  short rule. No printed title.
- **Archive** (Model A, 2026-11-22): "By year · By category" on one line; each year as a
  44px ink heading; each month as a 14px spaced-caps grey head over a hairline with its
  count on the right in italic ("9 entries"); then one line per entry — the day (lining,
  tabular), the title, and on the right in 15px grey what it is: "Quote · <the name in its
  cite, up to the first comma>", "Note", or "Essay · N min". On phones the right-hand part
  drops under the title.
- **About**: the portrait (crop A, 170px) floated right beside the opening; Books, Talks,
  Interviews from the JSON files; footnotes last.
- **Contact, External, Cases, 404**: the plain page — title, sub, text.

## 6. The margin ledger and the stream

Model D of four shown to Kalyan on 2026-11-22 ("d"): all of an entry's details in one
place. Every entry — in the stream and on its own page — is a two-column row: a 130px
column at the left, right-aligned, behind a 1px #DDD rule, then 28px, then the words.
The column holds the day (30px ink) and the month and year (13px spaced caps, lining
figures, 18px below) — in the stream the date is itself the permalink — then the
categories, 8px between items, then "N min read" for essays. A second entry of the same
day shows a short grey dash in place of the date (still the permalink), like a diary.
From 760px the column slides into the left margin as far as the window allows, up to its
full 158px (--hang: min(158px, (100vw − 744px) / 2)), so the text keeps as much of the
680px as it can; at 600px and below it folds into one grey line above the entry, the date
always shown: "30 Oct 2026 · Quotes". Rules between entries run the text column's width
only, matching the header and footer rules.

The stream (seths.blog): a **note** in full under its 30px title; a **quote** in full
(§7), no title; an **essay**: title, first paragraph, and "Continue reading →" at the end of that
paragraph, on its last line (kept together, never split; 2026-11-22). Entries are
divided by 1px rules, 44px above and 40px below.

## 7. Quotes

- Quote entries: 24px italic ink (phones 21px), no rule of their own (the ledger's rule
  is beside them); the name 26px under it, RIGHT-aligned, 18px, "— Name, *Source*" with the
  source in grey italic.
- `::: quote` inside an essay: the same type with a 4px #007CA7 rule at the left; the name
  right-aligned under it.
- A long passage (`>`): body size, #444, a 3px #DDD rule at the left; its `<cite>` under
  it, right-aligned, "— Name", 16px grey.

## 8. Blocks

- Callouts: 18px text on a wash, 4px left rule, bold spaced-caps title.
  note = grey wash, grey rule; tip = blue tint, blue rule; key = #FFFAD6, #D8C349 rule;
  warning = #FDF1F1, #DD3333 rule.
- details: 1px rule border, 4px radius, bold summary.
- plan: 1px border, 3px ink top rule; label column 7.5em, dashed row rules; one column on
  phones.
- cases (sidehead list): the term in bold spaced caps above its gloss.
- Tables: full column width, 17px, 2px ink rule under the head, 1px rules between rows.
- Code: wash background, 4px radius, 15px mono, lines wrap (never a sideways scroll);
  filename tab above; highlighted lines yellow.
- Pictures: full column width, centred, 2px radius; upright pictures 62%; caption below,
  centred, italic grey, credit in small spaced caps after a "·".
- Clipping: the picture (linked to its full page) and a plain blockquote; the analysis
  after.
- Cards (video, post, book): 1px rule border, 6px radius, 17px text. Video: the still with
  a round dark play button (blue on hover), "Watch on YouTube", title, channel · length.
  Book: a 110px cover — Kalyan's photo, or a typeset ink cover with white title.
- Footnotes: [n] markers in blue; notes 16px under a rule, each starting with ↑.
- `---` a short centred hairline (30% wide); `***` a centred ⁂.
- Drop cap (`dropcap: true`): 3.6em bold ink, floated.

## 9. Responsive

One column at every width. At 600px and below: body 18px, gutters 18px, the nav drops
under the name, smaller titles, the plan grid and book card stack, the portrait sits above
the text. No page scrolls sideways at 320px (checked 2026-11-22 on every page).

## 9a. Best-practice extras (2026-11-22)

- Skip link: "Skip to the text", hidden until a keyboard user tabs to it; main is #content.
- Page changes cross-fade (`@view-transition`) where the browser supports it; none for
  readers who ask for reduced motion.
- Phones: links outside sentences are at least 24px tall (WCAG 2.2 target size).
- theme-color for both modes, so the phone's browser bar matches the page.
- Amazon links carry rel="sponsored nofollow". Amazon's disclosure appears once for the
  whole site, as the About page's last line (site.affiliateNote, 15px grey italic over a
  hairline): not in the footer, not on every post (Kalyan, 2026-11-22).
- PDF card (§8): a 56×72px page icon with a folded corner and a red "PDF" tab, title 20px
  bold, an italic note, "PDF · N pages · size" in spaced caps, "Open the PDF →"; the whole
  card one link, 1px rule border, 6px radius, blue border on hover.
- Book card: optional "Buy on Amazon →".

## 10. Writing every day

`./today.sh "The title"` makes `content/journal/<today>-<slug>.md` as a note in Notes,
ready to write in. Publishing is unchanged (HANDBOOK §7).

## 11. Permanently forbidden

JavaScript on the page; webfonts; embeds;
analytics; a sidebar; colours outside §3.

## 12. Frozen files covered by this spec

src/css/screen.css, src/_includes/**, src/_data/site.json, .eleventy.js, today.sh.
(The lorem-ipsum design specimen was deleted 2026-11-22 on Kalyan's word; it is in git
history if a test page is ever wanted again.)
