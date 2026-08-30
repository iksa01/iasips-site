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

- body 13px / 22px; paragraphs, list rows and table cells 15px.
- lede (first paragraph of an entry, v4 p.intro): 18px / 26px.
- page title h2: 35px / 29px normal weight (article: 40px), 28px below,
  a 1px rgba(102,102,102,.24) rule 13px above the bottom (v4 underline.png).
- p.sub: 15px uppercase, no tracking, 44px below.
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

## 3. Graph-paper field

Paper colour plus a one-weight CSS lattice every 10.5px at the grid colour
(v4 graph-tile.png: lines at 10, 21, 32, 42, 52). The content panel and
cards sit on it as translucent white.

## 4. Page skeleton (v4 markup, ids kept)

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
    #content-sec floats LEFT, 196px + 25px right padding, right-aligned:
                 p.home-link, portrait (7px #FFFAFA padding, rotated -2°),
                 h3, list with dashed rows. Always present; may be empty.
  h2.ext-dests   "EXTERNAL REFERENCES { VIEW ALL }" — League Gothic 28px,
                 "References" red, links to /external/.
  ul.subnav ×2   rows of the same cards (§5) for external destinations.
  #siteinfo      centred #999 prose, two paragraphs, 60px above.

  - Journal (/journal/): v4 "multiple" shape per entry — h3 title link,
    h4 date, p.blurb (first paragraph), p.meta "Archived in … | Read on,
    there is more →".
  - Archive (/archive/): 18px year headings, then title + 11px italic
    date rows with dashed rules.
  - Home (/): masthead, cards, external references, colophon — nothing else.

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
  Every card has one; current placeholders are Colly's (images/engravings/
  README.md) and must be replaced by Kalyan's own before publishing.
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
- Blockquote: 3px #EEE left rule, 15px padding, 16px #666 text; `<cite>`
  7px below in #666.
- Tables (ours): dashed rules above, below and under the header.
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
    note    slate  #43606f on #FAFBFC — context, definition, where it sits
    tip     moss   #5c6b4a on #FBFCFA — method, how to write it
    key     ochre  #8a6a2f on #FDFBF6 — the thing to remember
    warning red    #ba1820 on #FDFAFA — the mistake, the caution
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
- Meta line gains "· n min read" in #999. Post foot gains v4's p.paginate
  with "← Older" / "Newer →" entry links.
- Print: nav, cards, sidebar and pagination hidden; white ground; external
  link URLs printed after the link text.

## 8. Quote entries (type: quote) — ours

- Body = quote paragraph(s), then `<cite>Name</cite>`, then optionally
  `---` and commentary (permalink only).
- Panel: 3px red left rule, 24px/32px Times text, "— NAME" 12px spaced
  caps; the journal index shows the panel with h4 date and p.meta; the
  permalink adds p.meta and, after a dashed hr, the commentary.

## 9. Images — see §7. loading="lazy" is added by the build.

## 10. Motion and JavaScript

No JavaScript on any page. No transitions beyond the browser defaults; the
only transform is the sidebar portrait's -2° (v4). RSS (/feed.xml) and
sitemap (/sitemap.xml) are built at build time.

## 11. Responsive behavior — v4's two widths

≤989px: canvas 468px, cards two across, sidebar hidden, text column 408px
with a 30px gutter each side, list numerals indented.
≤509px: canvas 306px, cards full width, inner-page engravings hidden,
text column 260px, page title 25px.

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
| animal engravings | Colly's PNGs as PLACEHOLDERS | slots must be judged; replace before publishing |
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
| v4 dashed rows for every list | prose lists get hanging en-dashes, no rules | a bulleted argument is not a table |
| — | §7b: callouts, details, code tabs/line marks, TOC, anchors, kbd/abbr, reading time, older/newer, print | "Colly rebuilt in 2026" |
