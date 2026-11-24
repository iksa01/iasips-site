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
- Body 19px / 1.65 (phones 17px / 1.6); was 20px / 18px until the design change of
  2026-11-23 (Kalyan: the post text 1px smaller, nothing else). Paragraphs 1.1em apart. Ragged right.
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

No sidebar on any page. The current nav item is blue and underlined.

## 4a. The head: search, previews, AI answer engines (design change 2026-11-24)

Kalyan: "design change: SEO and schema 1–5 … only use best practices for schema, tags,
categories, permalink, speed, GEO, SEO". Nothing visible on the page changes.

- **Description**, one per page, never shared: `sub:` where it describes the page; else
  made from the entry itself (journal.11tydata.js) — a quote: "“the words…” — Name"; a link:
  "Name, “Title”: “the passage…”"; a note or essay: its first paragraph; at most 155
  characters, cut at a word with "…". Category pages: "Every entry filed under <tag> …".
- **Structured data** (JSON-LD, one @graph): a Person (#person: name, the About page,
  sameAs = the Substack, Instagram and X in site.externals, Chief Mentor at La Excellence
  IAS, Hyderabad, the portrait) and the WebSite on every page. An entry adds a BlogPosting
  (author and publisher = #person, image, articleSection = its category, keywords = its
  tags) and a BreadcrumbList (Home › Journal › category › entry); a quote entry adds the
  Quotation and its creator, a link entry cites the linked work and its author. About is a
  ProfilePage; the stream, journal, category and archive pages are CollectionPages.
- **Previews**: og:image is the entry's first picture, else site.ogImage, with its alt;
  twitter:site from the X link; article:section and article:tag.
- **Speed**: the first picture of a page's first entry loads at once with
  fetchpriority="high" (the largest thing in view); every other picture stays lazy.
- **Feed**: each entry has a summary (the description); a link entry's content opens with
  the link.
- **/llms.txt**: a plain-text map of the site for AI tools (llmstxt.org): who, what, the
  pages, every entry with its description.
- **Tags**: the first tag is the category (one of five); a second is the subject, from a
  short list (AI, Ethics, Polity, World, …), and gets its own page. Addresses stay
  /journal/<slug>/, never changed.

## 5. Pages

- **Home** (`/`): one italic line about Kalyan (site.nav[0].home.copy — his words, set in
  2026-09) with "More about me →", then the ten newest entries as a stream (§6), then
  "Older entries →" (to /journal/, which holds entries 1–20; design change 2026-11-23: it
  pointed at /journal/page/2/, which does not exist until entry 21) and "Everything, by month".
- **Journal** (`/journal/`, `/journal/page/N/`): title, sub, the categories in one line,
  the stream, 20 a page, "← Newer · Page 1 of N · Older →".
- **Category** (`/journal/category/<tag>/`): the same, unpaginated.
- **Entry**: the margin ledger (§6) beside the title, sub, optional contents box and the
  text; at the foot, older and newer entries by title.
- **Quote entry**: the ledger beside the quote (§7) and the name; any commentary after a
  short rule. No printed title.
- **Link entry**: the ledger beside the kind, the outgoing title, the credit, the passage and
  Kalyan's line (§7a).
- **Archive** (Model A, 2026-11-22): "By year · By category" on one line; each year as a
  44px ink heading; each month as a 14px spaced-caps grey head over a hairline with its
  count on the right in italic ("9 entries"); then one line per entry — the day (lining,
  tabular), the title, and on the right in 15px grey what it is: "Quote · <the name in its
  cite, up to the first comma>", "Note", "Link · <domain>" (2026-11-24) or "Essay · N min". On phones the right-hand part
  drops under the title.
- **About**: the portrait (crop A, 170px) floated right beside the opening; Books, Talks,
  Interviews from the JSON files; footnotes; then the Amazon line and, under it in the
  same 15px grey italic, the note on the name (site.nameNote, design change 2026-11-23,
  Kalyan's option 2 of three).
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
- `::: quote` inside an essay or note: italic ink, 20px (phones 18px), with a 4px #007CA7
  rule at the left; the name right-aligned under it. Design change 2026-11-24 (Kalyan, "A"
  of 24/20/21/19 shown side by side): it was 24px, the quote entry's size, and stood too
  large against the 19px text; quote entries keep 24px (phones 21px). Its name keeps 1.6em
  below it before the next paragraph; only a name that ends its block (a quote entry) sits
  flush (design change 2026-11-24: in the stream the next paragraph touched the name).
- A long passage (`>`): body size, #444, a 3px #DDD rule at the left; its `<cite>` under
  it, right-aligned, "— Name", 16px grey.

## 7a. Link entries (design change 2026-11-24)

Kalyan chose "E1" of four (Fable's variants of model E, after 8BIT's Standard theme, 2012,
and today's link blogs: Simon Willison, Daring Fireball, Justin Miller). Front matter
`type: link` and `link: <url>`; `sub:` is the credit line. Shown the same in the stream and
on the entry's own page, top to bottom:

- the kind: "LINK · X.COM" — 12px spaced caps (.12em), --muted, 6px below; the domain is
  read from `link:` (www. dropped);
- the title, linking OUT to `link:` (the ledger date stays the permalink): 24px/1.25 bold
  --ink, a --link "→" after it (aria-hidden), all --link-hover on hover; phones 21px;
- the credit (`sub:`), "by Alexandr Wang · X Article · 22 Nov 2026": 15px italic --muted,
  4px above, 18px below;
- the passage, a plain `>` blockquote: 18px/1.6 roman --text behind a 2px --rule-strong
  rule, 20px in (phones 17px, 14px in);
- Kalyan's own line(s), if any: ordinary paragraphs. Without one the entry ends with the passage.

No reading time. Archive line: "Link · x.com".

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
- Pictures (design change 2026-11-23, Kalyan chose "D" of five shown): a card — the
  picture and its caption inside one 1px --rule border, 6px radius, square-cornered picture
  at the top, caption below it at the left in 12px/18px padding, italic grey, credit in
  small spaced caps after a "·". Full column width; an upright picture's card is 62% wide,
  centred. (Before: a bare picture, 2px radius, caption centred under it.)
- Clipping: the picture (linked to its full page) and a plain blockquote; the analysis
  after.
- Cards (video, post, book): 1px rule border, 6px radius, 17px text. Video: the still with
  a round dark play button (blue on hover), "Watch on YouTube", title, channel · length.
  Book: a 110px cover — Kalyan's photo, or a typeset ink cover with white title.
- Footnotes: [n] markers in blue; notes 16px under a rule, each starting with ↑.
- `---` a short centred hairline (30% wide); `***` a centred ⁂.
- Drop cap (`dropcap: true`): 3.6em bold ink, floated.

## 9. Responsive

One column at every width. At 600px and below: body 17px, gutters 18px, the nav drops
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

**The time of day** (design change 2026-11-24; Kalyan: three entries on one day stood in
alphabetical order, the newest third). `date:` may carry the time, India time as on the
clock: `date: 2026-11-24 23:51:00`. today.sh writes it. Only the order uses it: same-day
entries stand newest first; every page still shows the day alone. The build reads the time
as written (no zone), so all day logic stays on the date in the file name; a post is held
back as scheduled only when its DAY is after today in India; the feed gives the time with
+05:30. `python3 tools/check.py` after every build checks dates, tags, descriptions and the
order (HANDBOOK §7).

## 11. Permanently forbidden

JavaScript on the page; webfonts; embeds;
analytics; a sidebar; colours outside §3.

## 12. Frozen files covered by this spec

src/css/screen.css, src/_includes/**, src/_data/site.json, .eleventy.js, today.sh.
(The lorem-ipsum design specimen was deleted 2026-11-22 on Kalyan's word; it is in git
history if a test page is ever wanted again.)
