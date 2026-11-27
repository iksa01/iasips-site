# WORKLOG — state of the site, for whoever opens it next

## 2026-08-30 — first build (Claude Code, Fable 5)

- Built from Kalyan's two spec files (now DESIGN.md / AGENTS.md).
- Round 1: a "clean" reinterpretation of Colly v4. Kalyan: "not even close
  by 1000 miles". Discarded.
- Round 2: colly.com/v4 transcribed whole (reference/colly-v4/). Kalyan:
  journal home "beautiful", "closest thing".
- Round 3 — "Colly rebuilt in 2026": shell stays v4; the post body gains
  callouts, details, code tabs + line marks (VT323), sidebar TOC, anchors,
  kbd/abbr, reading time, older/newer, print. DESIGN.md §7b.

## 2026-08-30 — engraving samples

Kalyan asked for alternatives to Colly's copied animals. Sixteen open-licensed
engravings pulled from Wikimedia Commons, processed like Colly's (greyscale,
background knocked to transparency, trimmed, 200x160, bottom-anchored) into
images/engravings/samples/, four themes x four cards. Preview at /engravings/
(working page, excluded from collections — delete it and src/_data/
engravingSamples.json, layouts/engravings.njk and the .samples CSS block once
a theme is chosen). Provenance and licences: images/engravings/CREDITS.md.

Lesson from the proof: Colly's animals are CUT-OUT creatures on white. Sources
that are full plates (scene, foliage, plate borders) do not read at 200x160.
The best of the sixteen are the ones already isolated — tiger, pigeon, owl,
peacock. Whichever theme wins, the remaining slots should be re-sourced as
isolated woodcuts (Brehms Tierleben and Bewick are the richest seams).

## 2026-08-30 — engravings, round 2 (the method that worked)

Kalyan on round 1: "None are actually good... the image is not as clear as
his." Right. Measuring Colly's own PNGs gave the target profile:

    coverage 9-23% of the tile inked | opaque alpha 74-91% | faint alpha 4-10%

Round 1 scored coverage 17-56% and opaque alpha 3-10% — dense full plates
rendered as a faint wash. Two faults: sources were plates (scene, foliage,
plate borders) not cut-out creatures, and the alpha ramp was too soft.

Fixes: (1) alpha ramp lo=0.10 hi=0.18 exp=0.35 — ink goes opaque fast, paper
goes to nothing (scratchpad process.py); (2) source from Gosse's *Natural
History* (1849-56) on Commons — 233 files, one subject per file, all PD — and
pick by SCORING every one against the profile rather than by eye.

The 18 winners are in images/engravings/gosse/. Proposed set: Buceros
(hornbill head) / Chatterer feather / Fishes p 168 / Eagle Foot, with a pool
of 14 alternates on /engravings/. Kalyan picks the mapping.

Reusable lesson: measure the reference, score candidates against it, and let
the numbers choose. Guessing by eye produced four rounds of "not close".

## 2026-08-30 — /modern/ (what 2026 adds)

Kalyan asked what Eleventy/2026 can do that 2010 could not — colour boxes,
fonts, icons. Built /modern/ as a working page showing the options live:
callouts as they stand, callouts in a muted ink-blue and moss (what a second
and third hue would cost), printer's marks (manicule, fleuron, asterism,
pilcrow, dagger) as the in-register answer to "icons", and a list of the
genuinely new capabilities — Eleventy's image pipeline (AVIF/WebP/srcset at
build time), :has(), container queries, subgrid, text-wrap: balance, clamp(),
cascade layers.

Recommendation given: take marks, the image pipeline, text-wrap: balance and
clamp(). Leave extra hues and view transitions — they are what would turn it
from Colly's shelf into a docs site. Awaiting his pick; each is a "design
change". Delete /modern/, its .callout-colour/-colourb/-mark CSS block and the
extra container names in .eleventy.js once decided.

## 2026-08-30 — "make it 2026" (joshwcomeau.com)

Kalyan: joshwcomeau.com reads as 2026, how do we get there. Measured what
that site actually does: ~42rem measure, fluid type, generous air, and a
three-track grid where images/demos BREAK OUT of the reading column. Its
other signatures — dark mode, interactive widgets, motion, second hues — are
forbidden by DESIGN.md §10/§12 and would stop this looking like a miscellany.

So: 2026 = space, scale and the grid. Built as opt-in, shell untouched.
Front matter `layout2026: true` gives a post:
  - three tracks (sidenote margin | 40em column | break-out), centred
  - `::: side` renders a margin sidenote (Tufte); folds inline under 1100px
  - `::: bleed` spans the full panel width
  - fluid type via clamp() 15->17px, leading 1.62, text-wrap: balance
  - #post uses display:contents so paragraphs are real grid items
Demo: /journal/layout-2026/ (working entry — delete when decided).
Gotcha fixed: at narrow widths `grid-column: 2` invents a second column, so
the breakpoint must reset children to column 1.

Not adopted (and I recommend against): dark mode, view transitions, sticky
sidebar, extra hues, JS widgets.

## 2026-08-30 — the sample essay becomes a real specimen

Kalyan: "I like the present journal sample essay. Keep that as it is...
forget about the 2026 one." The layout2026 experiment is REMOVED (post, CSS
block and the ::: side / ::: bleed containers) — recoverable from commit
98efd0d if ever wanted.

Done instead, on his list:
- Better colours: callouts now carry four muted ink hues — slate (note),
  moss (tip), ochre (key), red (warning) — the only exception to the
  one-accent rule, recorded in DESIGN.md §7b and §14.
- Sidebar "In this entry" reworked: rules top and bottom, h2 items 13px,
  h3 items 11px italic grey indented beneath.
- Prose lists split from ledger lists: hanging en-dash, no rules. v4's
  dashed rows stay for the archive, about-page data and the sidebar.
- Code that overflowed the 516px column was rewritten to fit; a code block
  should never need horizontal scrolling in the reading column.
- The sample essay is now a full UPSC specimen ("The Basic Structure
  Doctrine", GS2/Polity) exercising every element: dropcap, TOC, prose and
  numbered lists, two tables, blockquote with cite, all four callouts, a
  <details>, a titled code block with line highlighting, asterism,
  footnotes. It is a DESIGN SPECIMEN, not Kalyan's published writing —
  facts are standard constitutional history and the practice stems are
  framed, not quoted from past papers.

## 2026-08-30 — presentation pass on the specimen

Kalyan: "design-wise, tables-wise, line-spacing-wise there is a lot of scope
to improve... the table is all in a column only... the numbered bullets are
not proper." All three were real.

- Bullets: "- **Shankari Prasad (1951)** — no. ..." produced dash soup (list
  marker + em dash). Added `::: cases`, a run-in sidehead list: term in
  spaced-caps slate on its own line, gloss beneath, dotted rules between.
- Tables: now reclaim the 110px right gutter, tabular numerals, spaced-caps
  header, dotted row rules, 9px padding. Reset to 100% at the breakpoints.
  A second table replaced the basic-structure feature bullets.
- Line spacing: paragraphs 15px/24px (was 22px), 15px between; prose list
  rows 23px with 9px beneath; section heads 42px clear (was 30px).

## 2026-08-30 — the skeleton was not code

Kalyan: "the tender code block ... the worst of all the designs." Correct,
and the fault was categorical, not cosmetic: an answer skeleton was being
set in VT323 on grey because it *looked* tabular, when it is prose in a
structure. Added `::: plan Title` — a printed planning grid: spaced-caps
label hanging at 116px, gloss in the body serif, dotted rules, reclaiming
the right gutter like a table. The code block is gone from the specimen;
VT323 and Prism stay for actual code.

Two gotchas hit on the way: a CSS grid on the row broke whenever the gloss
contained <em> (it became a stray grid item) — use a hanging absolute label
instead; and long labels wrapped out of their absolutely-positioned box, so
labels must stay one word ("Application", not "Body C · Application").

## Status
- NOT frozen. Kalyan has not said "frozen". Until then CSS/layout edits
  are allowed on his instruction.
- Engravings in images/engravings/ are Colly's — placeholders, must be
  replaced (README there).
- Every "TODO:" is a fact only Kalyan can supply.
- Open offers: inline the CSS at build time; Press Start 2P as an
  alternative code face; galleries / series grouping for posts.
- Cards DONE 2026-08-30: Kalyan picked emu, falcon, alexandrine, Coly.
  Wired as Alexandrine=About, Coly=Journal, Emu=Archive, Falcon beak=Contact;
  the eight external cards took the rest of the Gosse pool. No Colly artwork
  is referenced on any real page now (his files stay in images/engravings/
  as PLACEHOLDER-* for reference only).
- Geometry lesson: Colly's ink sits in rows 59-155 of the 200x160 tile (a
  ~69-97px band, bottom-anchored) because the card window is only 105px tall.
  Fill the whole 160px and the card crops the creature's head off.
- Idea parked (Kalyan, 2026-08-30): engraved PORTRAITS instead of animals --
  Sherlock Holmes, Poirot, thinkers. His half-remembered reference is Ethan
  Marcotte's original Responsive Web Design example, "The Baker Street
  Inquirer" (alistapart.github.io/code-samples/responsive-web-design/), which
  uses Sidney Paget's Holmes illustrations. Paget died 1908, so they are
  public domain and the same pipeline would work.

## How to resume
    cd ~/Sites/kalyan-site && claude      # CLAUDE.md loads; read DESIGN.md, AGENTS.md, this file
    npx @11ty/eleventy --serve            # http://localhost:8080/ (or the port it prints)

## 2026-09-02 — the post page becomes Colly's post page (design change)

Kalyan came back "meticulous about every inch" with colly.com/v4/about/#f5,
/v4/journal/ and v5.jasonsantamaria.com (the latter for a later footer only
— "don't change anything as of now"). Measured both sites in headless Chrome
at 1280/430/375 and compared our entry with a 2014 Wayback capture of a real
v4 post (colly.com/comments/2013_a_year_in_review — the /v4/ archive has no
post pages). He approved the fix list with "yes please make the changes",
given in answer to the "design change" gate; treated as that instruction.

What was wrong and what changed:
- "The table is going out of the scope": tables and `::: plan` were 626px,
  ending flush on the panel border while everything else is 516px. Back
  inside the measure. Rows now use v4's ledger rule (dashed #DDD, dashed
  #CCC at the top and under the header) — the dotted #E0DCD6 was invisible
  on his screen ("should there be horizontal lines also?"). Table headers
  were `nowrap`, which pushed the second table 26px out of the column on a
  phone; they wrap now. `::: cases` took the same dashed rules.
- "Can it all be in one line?": v4's post has NO meta block — title, date
  as p.sub (uppercase, 10px ordinal), lede. Ours now does the same. The
  categories and reading time moved to the sidebar under an h3 from
  site.json `asideHeading` (TODO; v4: "Superfluous Aside"), with Older /
  Newer as a spaced-caps row where v4 has its Prev/№/Next badge. Under
  989px the sidebar hides, so one italic line "date · n min read · Archived
  in …" stands in, and the foot p.paginate returns.
- Footnotes "going a little bit here and there": the ↑ targeted the 10px
  marker, so the sentence sat above the screen. `scroll-margin-top: 33vh`
  on markers, 30px on notes. v4 did this with jQuery scrollTo; no script.
- Phone: at 375px the fixed 306px canvas left 35px of paper each side and a
  266px column (71% of the screen); at 430px, 62px and 62%. Colly's own
  site does exactly the same at that width — it is v4's tier, inherited —
  but he is right that it wastes the phone. The ≤509px tier is fluid now:
  10px paper each side, 18px panel gutter, 314px column at 375 (84%).
- Verified at 1280/430/375: every block 516px on desktop; scrollWidth equals
  the viewport at every width; no element crosses the panel.

Measuring notes for next time: `chrome --headless --screenshot` cannot go
below ~500px wide and ignores `orientation`, so use DevTools
`Emulation.setDeviceMetricsOverride` (scratchpad shot.mjs / measure.mjs).
Colly's media queries key on device-width and orientation, so a tall
desktop window renders his 468px tier — compare at 1280×1250, not 1280×3000.

Still open from this round: the aside heading and every other TODO are his
words; Jason Santamaria's footer is parked for later.

## 2026-09-03 — 2026 practices + what algebrica.org taught (design change)

Kalyan: "please apply 2026 best practices. adopt best practices from
algebrica, if we don't like it we can roll back." Given in answer to the
audit list, so treated as the design-change instruction. Same branch.
Sidebar stays LEFT — that is Colly's; Wayback captures of his posts from
2011, 2012 and 2014 all carry Prev / № / Next in the left sidebar, never the
foot (the foot pagination on his journal INDEX is page numbers).

Fixed (invisible unless you look):
- The stylesheet was linked `media="screen"`, so the print rules never ran.
- `a { outline: 0 }` (v4) removed; 2px red ring on :focus-visible.
- Landmarks: header / nav / main / footer / article; every date a <time>.
- Head: description (entry `sub`, else site.json `description` — TODO),
  canonical from site.url, rel=prev/next on entries, color-scheme light.
- Contrast: #999 text was 2.6:1 on the paper. Text roles are #6c6c6c now
  (4.5:1); markers (dashes, numerals, hr, anchors) keep #999. Colophon
  links #beb2b2 → #8a7c7c.

Borrowed from algebrica.org (WordPress + jQuery + MathJax underneath; what
makes it read well is one serif, hairlines, air — which we had — plus):
- Paragraph numbers in the left gutter, 11px tabular #999. Direct paragraphs
  of an entry only; callouts, quotes, lists unnumbered. Off on the phone tier.
- Justified, hyphenated entry paragraphs (`hyphens: auto` needs lang="en",
  which base.njk sets); `text-wrap: pretty` on paragraphs, `balance` on heads.
- Front matter `updated:` → "Updated 3rd September 2026" in the sidebar
  aside and the narrow meta line. New key, recorded in AGENTS.md §4.
Not borrowed: sans interface face, icons, search, AI-summary buttons,
cookie banner — forbidden by §12 or need script.

Kalyan's "line under the date": Colly rules under the TITLE on both the
index and the post, and we match him; a rule under the date is one line of
CSS if he wants it after seeing this round.

## 2026-09-03 (b) — simpler sidebar, one meta line, category pages, SEO/GEO head

Kalyan: "lightning-fast, SEO- and GEO-friendly… as close as possible to
Colly… we are complicating the sidebar… can we push it below the title? do
we have to have headings over 'superfluous aside'?… I don't want my notes
published in HTML, Markdown and all that drama." Design change, same branch.

- The sidebar aside and its heading are gone. One italic meta line under
  the title at every width: date · Updated · n min read · Archived in
  <links>. It is v4's index p.meta form, so still his. Sidebar = journal
  link, Older/Newer, In this entry. `asideHeading` removed from site.json.
- Category pages: content/category.njk paginates Eleventy's tag
  collections into /journal/category/<slug>/ using the journal layout with
  the title "Archived in <Tag>". journal.njk takes `collections[tag]`
  (reversed — tag collections come oldest-first) when `tag` is set. Every
  "Archived in" on the index, the entry and the meta line is a link now,
  as v4's were.
- Head for search and answer engines: author, Open Graph (title,
  description, url, type, site_name; og:image only when site.json
  `ogImage` is set — a fact for Kalyan), twitter:card, article
  published/modified times, JSON-LD BlogPosting on entries and WebSite
  elsewhere. JSON-LD is data, not script; DESIGN §10 says so.
- Speed: wordmark font preloaded; card engravings carry width/height and
  decoding=async (no layout shift); sitemap gets lastmod from `updated`
  or the date.
- Touch: TOC rows, Older/Newer, footnote markers and backlinks padded on
  canvases ≤989px.
- Refused, on his word: Markdown copies of posts. Held: print polish,
  identity markup.
- Fact for Kalyan: site.json `ogImage` — a 1200×630 image for link
  previews — and, as before, `site.url` and `description`.

## 2026-09-03 (c) — /samples/ working page: box colours and quote styles

Kalyan: the moss and ochre boxes sit oddly on a cream-and-red page; show
three or four options for the boxes and for the Ambedkar quotation, "it
should not spoil the design". Built content/samples.md (working page, own
<style> block, excluded from collections — delete it with the decision):
Sets A (palette only: grey / rose #d0656a / orange-red #d24b21 / red),
B (warm inks: grey / sepia #7a5a3a / burgundy #7a1f2b / red), C (one ink,
no tints: dashed / grey / black / red rules), D (one hue in four weights);
Quotes 1 (Colly's, as now), 2 (hanging red quotation mark, italic, spaced
caps cite), 3 (centred epigraph between hairlines), 4 (the quote-entry
panel at 20px), 5 (a card like the boxes). Awaiting his letter and number.
Gotcha: page-only rules must be written `body.samples-page div#content-pri …`
to out-rank the stylesheet's `div#content-pri aside.callout-note`.

## 2026-09-03 (d) — set D, the hybrid quotation, h1s, robots, four cards

Kalyan: "I like set D and number 2… a hybrid of one and two… include the
quotation marks without destroying the design… I might ask you to change
it in the future." Design change, same branch. /samples/ deleted (it is in
git at 6c9b6f0 if the choice is ever revisited).
- Boxes: set D — grey #CCC / pale rose #e3b3b5 / rose #d0656a / red, titles
  #6c6c6c / #a94f54 / #ba1820 / #ba1820 (the tip title darkened from the
  sample's #b95c60 to clear 4.5:1). Slate is gone everywhere; `::: plan`
  and `::: cases` labels are #6c6c6c. One accent again.
- Quotation: Colly's blockquote unchanged, plus a 48px "“" in #d0656a
  hanging in the left gutter outside the rule. Off on the quote-entry
  panel, inside callouts, and on the phone tier (no gutter).
- Headings: page titles are h1 (class .page-title keeps v4's h2 styling);
  on the home page the wordmark is the h1. In-body heads stay h2/h3.
- content/robots.njk → /robots.txt with the sitemap line.
- External cards: one row — Substack, Instagram, X, RSS. URLs and straps
  are TODO. He mentioned two Substacks; the RSS slot can become the second.
Still his to write: the masthead's two lines, the four card straps, the
external straps, the colophon (he wants a Colly credit — "designed by Mr.
Colly… purely inspired by Mr. Simon Collison"), site.url, description.

## 2026-09-03 (e) — mark inside the rule; drafts set for Kalyan's eye

Kalyan on the hanging mark: "so ugly… the mark should come within the
line." It now floats at the start of the first line, inside the rule.
Facts he gave: Hyderabad; ikse.in since 2016; in the UPSC field since 2010
but "I don't want to claim that". His credit line, verbatim: "Designed
after Mr. Simon Collison. This is his brainchild."

DRAFTS, set on his "let me look at them once you set them" — not approved,
change on his word (all in src/_data/site.json):
- masthead: "Established Hyderabad 2016" / "The considered notes and
  journal of" / Kalyan
- cards: "Prepared with due diligence" · "Notes from the reading room" ·
  "Filed and cross-referenced" · "Kalyan is presently" (Receiving Your Emails)
- externals: "Longer letters, now and then" (Substack) · "Pictures from the
  field" (Instagram) · "Shorter thoughts, more often" (X) · "Every entry,
  delivered to you" (RSS)
- colophon line 2: "Designed after Mr. Simon Collison. This is his
  brainchild. Built in Hyderabad, scaffolded by Eleventy." Line 1's licence
  is still TODO.
The sample note is now a NOTES SPECIMEN — "Article 368 on one page" — a
short, structured note using every box for its purpose: note = where it
sits, key = hold this, tip = how to use it, warning = the traps, plus a
plan grid, a table, a cases list, a details fold and a footnote. Standard
constitutional facts; not his writing. The quote entry keeps tag [Sample].

## 2026-09-03 (f) — no quotation mark; names to the right; one-line index meta

Kalyan: "remove the quotation marks, I think we can understand that…
push B. R. Ambedkar to the right… push Samuel Johnson to the right…
push 'Archived in' and 'Read on' into one single line." Done: blockquote
and quote-panel cites are text-align right; the journal index p.meta is
one line with a middot where v4 had a <br>. The red mark is gone from
the stylesheet entirely. Design change, same branch.

## 2026-09-03 (g) — facts from Kalyan: domain and handles

site.url = https://ias.ips.in (his domain, "I already own"); Substack
upsc.substack.com; X and Instagram @upscverse. Set in site.json. Canonical
links, structured data, robots and sitemap now carry the real address.
He asked whether the work is saved: it is committed in git, locally, on
branch agent/post-page-colly; nothing is on GitHub yet. A tarball backup
was written to ~/Sites/ this session.

## 2026-09-03 (h) — working pages gone; first push to GitHub

Kalyan: "delete the engravings and the modern one… we can push it to
GitHub. Bottom line." /engravings/ and /modern/ deleted with their layout,
data file, CSS blocks (6b, 8a-demo) and the demo container names in
.eleventy.js. images/engravings/samples/ (the sixteen open-licensed
round-one cuts) is kept as a pool; CREDITS.md covers it. He is "still not
convinced with the design… minute tweaks… I will let you know" — so NOT
frozen. GitHub is a living copy: every commit here is pushed with
`git push`; history is kept there too.

## 2026-09-03 (i) — faithfulness pass: what the 08-30 transcription missed

Kalyan compared colly.com/v4/ with ours: "in the potted biography he has
some brief introduction. The same for journal and archives… the latest
posts are linked there." Right — the home cards were transcribed EMPTY on
08-30 (DESIGN §4 even said "nothing else"). Measured against the
reference index.html and put back:
- Home cards carry v4's copy under the engraving: about and contact a
  `.fl` drop-cap lead + sentence + red "read on →" (`a.dest`); journal a
  red § (`.fs`) + newest title + 150-char opening + "More →"; archive the
  five latest as `a.arch` rows numbered from the oldest = 1 (v4 showed
  its entry ids). The card macro takes an optional third `copy` argument;
  nav.njk builds it on the home page only.
- The two prose blurbs are DRAFTS in site.json `nav[].home` from his
  facts (Hyderabad, UPSC syllabus). His to rewrite.
- Archive: month headings ("August 2026") with title-only rows, as v4;
  sidebar "By year" (anchors) and "By category" (category pages) where v4
  had "By animal years" / "By categories". New filters byMonth, monthName,
  tagList in .eleventy.js.
- Bug fixed: paragraph numbers and justification were applied to every
  `.entry`, so the Contact and About pages were numbered. Scoped to
  `#post.entry` (journal entries only).
Still different from v4, by decision: no contact form or comments, one
external row not four, the round home-icon set in type, our 2026 body.
Contact page: v4 has "STATUS: <red>ACTUALLY RESPONDING!</red>" as the sub
— a red span inside p.sub; ours has no red span. Noted, not done.

## 2026-09-03 (j) — engravings, round 3: Kalyan's cities and the writing desk

Kalyan: not convinced by the animals; his cities (born Hyderabad, studied
Anantapur, Bengaluru, Kolkata, Delhi) for the home cards, the writing desk
for the external cards; "make sure they are copyright-free."

Sourcing (all Wikimedia Commons, PD or "no known restrictions"):
free-text search is useless for this — the seams that worked were Commons
CATEGORIES (Qutb Minar in art, Engravings of Kolkata), the American
Cyclopaedia and Meyers Konversations-Lexikon woodcuts (search "AmCyc X",
"Meyers X"), and old spellings (Gooty/Gootee for Anantapur district).
Fergusson's *History of Indian and Eastern Architecture* is on Commons as a
category but holds only ~24 plates. No engraving of Anantapur/Lepakshi
exists; the one period picture of the district is Justinian Gantz's
19th-c. watercolour of Gooty fort, which the pipeline turns into a
usable line drawing.

THE METHOD THAT WORKED (scratchpad eng/process2.py): fetch the ORIGINAL at
full resolution (the API's imageinfo url — the thumb URL regex trick
fails on tracking suffixes), binarise the line work against the local
paper level at native size (blur radius ≈ 1% of width, ink = darker than
paper by k≈0.09–0.13; woodcuts k≈0.2), then shrink with BOX/area averaging
so line density becomes alpha, gain ≈2.4. Steel engravings and aquatints
that were grey blocks at preview size come out as engravings this way,
because their hatching only resolves at full res. Crop to the subject
first; captions and plate borders otherwise dominate the fit.
Screenshots via `chrome --screenshot` can't go below ~500px and ignore
orientation; Read of an image path can return a cached render — write
crops to NEW filenames.

Installed (images/engravings/places, /desk; CREDITS.md has every source):
About = Golconda tombs (AmCyc), Journal = Gooty fort (Gantz), Archive =
Writers' Buildings 1812, Contact = Qutb Minar 1858; Substack = quill and
books c.1900, Instagram = Meyers bellows camera, X = 1906 spark
transmitter, RSS = 1683 post rider. Alternatives on /engravings/ (working
page, delete with the decision): Char Minar 1850, St Andrew's Bangalore
1867, Government House 1824, Kutub Minar 1872, inkstand 1875, Loman camera.
The Gosse birds stay in gosse/ as a pool. Awaiting Kalyan's verdict.

## 2026-09-03 (k) — engravings, round 4: Old Book Illustrations

Kalyan on the cities and the photo conversions: "absolutely bad… one
direct source of ready-made images in this format." Old Book Illustrations
(oldbookillustrations.com) is that source: cleaned public-domain 19th-c.
book engravings, tag pages (/illustrations/tag/<tag>/, pageN/), small-size
download at /site/assets/files/<id>/<slug>.jpg (500–680px, bottom 7% is a
watermark line — crop it), one page per image with title, description and
source book. Search is JS; the tag pages and sitemap are the way in. The
"tailpiece" and "vignette" tags are the Colly register exactly.
Harvested 167 (scratchpad eng/obi/pull.py), picked by theme: About = oil
lamp, Journal = stationery with quill, Archive = books and candle, Contact
= man reading his mail, Substack = laurel wreath with pen, X = Edison's
electric pen; Instagram keeps the Meyers camera, RSS the 1683 post rider.
Five alternates on /engravings/. CREDITS.md has each page link. The
places/ and desk/ tiles from round 3 stay on disk as a pool; the Gosse
birds likewise. Awaiting Kalyan's verdict — "we will finalise it".

## 2026-09-03 (l) — engravings FINAL

Kalyan: "Yes, I think we can go ahead." The Old Book Illustrations set is
final. /engravings/ working page deleted; places/ (cities, photo
conversions) deleted; desk/ keeps only camera-kodak and post-rider;
gosse/ and samples/ stay as pools. Colophon line 2 now ends "Card
pictures from Old Book Illustrations" — the link-back the site asks for.

## 2026-09-03 (m) — first push

Kalyan signed in with `gh auth login` (account iksa01). Created the private
repo github.com/iksa01/iasips-site and pushed main, 28 commits. `git push`
after every round from now on. Nothing is live.

## 2026-09-03 (n) — journal index: v4 sidebar, titled quotes, the note kind

Kalyan compared colly.com/v4/journal/ (sidebar: Categories, "Mr.
Collison's Favourites") and raamdev.com (quotes and one-line asides as
posts of their own, in the stream with the essays). Ours had an empty
journal sidebar and untitled quote entries. Done, design change:
- Journal sidebar: home link, Categories (category pages), Favourites from
  site.json `favourites` [{href,title}] under `favouritesHeading` (draft
  "Kalyan’s Favourites"); hidden while the list is empty — his picks.
- Quote entries carry an h3 title on the index (specimen: "Without effort").
- New entry kind `type: note`: a thought of a paragraph or two shown in
  full on the index with "Permanent link →", an ordinary page at its
  permalink, no reading time. Specimen: "Heart and soul" (Article 32).
  AGENTS §4 type values: quote, note. DESIGN §4/§8.
- Colophon: the Old Book Illustrations mention removed on his word; the
  credit stays in images/engravings/CREDITS.md.
Licence line (colophon line 1) is still his call: "All rights reserved"
or a Creative Commons line.

## 2026-09-03 (o) — quiet metadata, no quote titles, a populated journal

Kalyan: "I was talking about how he [Raam Dev] is using quotes. I don't
need a title for the quotes, and… below the quote, the date and all those
things… the metadata is much cleaner." Done: quotes on the index show the
panel alone; quotes and notes get ONE quiet meta line — 12px italic grey,
set right, no rules — "date · Category · Permanent link →". Essays keep
v4's h4 date and ruled meta. The home journal card's § became ¶ ("we
don't have to use the same symbol").
"Populate my journal… so we can scroll through posts": seven SPECIMENS
added across July–September 2026 — two quotes from public-domain authors
(Bacon 1625, Tagore 1910, Ambedkar 1949), three notes (Fundamental Duties,
Money Bill, 42nd Amendment) and one short essay (the Preamble). Facts are
standard; each is a stand-in for his writing and says so or is listed
here. Twelve entries now; categories GS2, Polity, Reading, Sample.

## 2026-09-03 (p) — the first real test: a press cutting with a picture

Kalyan sent an Indian Express page (C. Raja Mohan, 26 Aug 2026) and asked
how a clipping-with-analysis post would work, with links to the rest of
the site. Copyright first: the whole page is the paper's; the post shows
the headline strip and illustration, quotes one passage, links the
e-paper, and puts the analysis outside — recorded in DESIGN §7c and AGENTS §4.
Built: tools/prepare-image.py (PIL: fit 1400px, jpg + webp + avif,
images/manifest.json with sizes; no npm package — eleventy-img is not in
the lockfile); the markdown image renderer now emits <picture> with AVIF
and WebP sources and width/height when the manifest knows the file;
`::: clipping Source` container + CSS (dashed cutting, source in spaced
caps, passage at reading size). Specimen post: /journal/central-asia-less-
romance/ — analysis is a stand-in, says so at the foot. New subject tag
World. Category Press now exists.
Workflow for him: drop the file in images/press, run the prepare script,
write the post with the block, push.

## 2026-09-04 — the full page

Kalyan: "the full image will be shown but what we add below that is more
important." The copyright concern was put to him on 09-03; his decision.
The Press specimen now shows the whole Indian Express page (1221×1180,
prepared: jpg 1221w + webp + avif). DESIGN §7c and AGENTS §4 updated.

## 2026-09-06 — live on GitHub Pages

Kalyan: "go". Chosen over Cloudflare/Netlify because the repository is
already the one thing this agent operates end to end with `gh`; no second
account or token. Cost: public repository — Kalyan ran the visibility
change himself (the auto-mode safety layer blocks it for the agent).
Workflow .github/workflows/pages.yml (checkout, Node 24 from .nvmrc,
npm ci, eleventy, upload _site, deploy-pages). Pages enabled with
build_type=workflow; cname iasips.in set via the API. DNS records handed
to Kalyan; HTTPS enforcement waits for the certificate. Nothing about the
site's build changed — the same `_site/` goes up.

## 2026-09-06 — HANDBOOK.md

Kalyan: "how do I tell future terminal sessions this? how will they know
the blog capabilities? what is a post, quote, what is accepted?" Written
as one file, HANDBOOK.md: the site in five lines, the three entry kinds
with exact front matter, the five categories, every block, pictures, what
is not accepted, the publishing routine, the facts only he supplies.
CLAUDE.md (auto-loaded) now opens with the live address and points to the
handbook first; PROMPT.txt and RESTART.md's first message name it too.

## 2026-09-06 — HTTPS

DNS moved to GitHub at Cloudflare (five records, grey cloud). GitHub did
not begin the certificate on its own for twenty minutes; re-saving the
custom domain through the API (cname "" then cname iasips.in) triggered
it at once — "approved" within fifteen seconds. https_enforced set.
https://iasips.in 200; www → apex 301. The old "kalyan - UPSCVerse" page
that the domain used to serve is gone.

## 2026-09-26 — design change: the quote card, journal pages, drafts

Kalyan brought 8BIT's quote posts (web.archive.org, 8bit.io, 30 April
2013: a charcoal panel, white italic Georgia, a dotted quotation mark, a
notched edge) and asked for the idea adapted, not the look copied:
"it should not be destroyed". Shown in turn: three mockups (card, rose
panel, quiet), the card on the real pages with a rose-petal gradient
mark ("No, I don't like it"), then twelve marks on card and rose panel.
Kept: classic, watermark, ornament. Chosen, in his words: "Design change:
watermark on the white card, page numbers, and drafts."
- Quote card: DESIGN §8. The name moved out of the blockquote into
  p.quote-who (quoteParts returns `who`); the old v4 `cite` rule
  (display:block, margin-top −13px) had to be cancelled there.
- Journal pages: content/journal.md paginates collections.journal, 20 a
  page, /journal/page/N/; it needed templateEngineOverride: njk because
  markdownTemplateEngine is false.
- Drafts and scheduling: an addPreprocessor in .eleventy.js drops
  `draft: true` and future-dated journal entries in build mode only; the
  Pages workflow gained a daily cron (00:35 UTC). Tested with a draft, a
  future entry and 5-a-page: both absent from build, feed, sitemap and
  category pages, present under --serve; pages 1–3 linked.
- Same day, Kalyan: "I will go with the other color because it suits the
  theme" — the card became the rose panel (key-callout tint #FDF8F8, red
  rule, dashed rose foot and notch), watermark kept.
- Eleventy review, then approved ("Page not found and faster page loading
  can also be done"): content/404.md → /404.html (GitHub Pages serves it
  for any unknown address; excluded from collections and the sitemap;
  wording is functional, Kalyan may replace it). Faster loading: the
  `inlineCss` shortcode puts screen.css, comments and whitespace stripped
  (35 KB → 26.6 KB), into each page's <style>; one request instead of two,
  and no refetch when GitHub's 10-minute cache expires. src/css/screen.css
  stays the one source; /css/screen.css is still copied out.
- Later the same day, Kalyan: "Design changes for classic, not the present
  one … in same colour" — the watermark gave way to the classic mark: 80px
  Georgia “ in solid #ba1820 at the panel's left, text indented 76px.

## 2026-09-26 (b) — design change: source rule, Found in, case register, numbers

Kalyan: "Design change: source rule, Found-in line, case register,
numbering automatic". Asked whether it can be reversed: yes — each is its
own commit, so any one can be reverted alone.
- Source rule: CLAUDE.md, HANDBOOK §7, HOW-TO-START — before a publish,
  tell him source, category, address.
- `found:` front matter → "Found in …" on the permalink only.
- Case register: src/_data/cases.json (13 cases, holdings taken only from
  the journal's own text; Puttaswamy's holding is a TODO), `::: casetable`,
  sidebar "Cases in this entry", /cases/ with "Discussed in" links.
- Quote numbers: one count, oldest entry first, top to bottom; a quote
  entry counts 1 plus its `::: quote` blocks; computed at eleventy.before
  from the files (gray-matter), drafts and future entries excluded in
  build mode; a transform fills the placeholders and lifts an in-body
  quote's cite under the panel. Tested with an essay dated between two
  quotes: its two quotes took 2 and 3 and the later ones moved to 4–6.
- Lesson: the --serve process keeps an old config after .eleventy.js
  gains a container; restart it (twice today it served stale output).
- Same day, after seeing it built: Kalyan dropped the quote numbers ("we
  can avoid the numbers … everything else will be the same") and the
  "Found in" line (a source can go in a quote's commentary). Both removed
  as their own commits; `::: quote`, the case register and the source rule
  stay.

## 2026-09-26 (c) — design change: no paragraph numbers, darker footnotes, reference off GitHub

Kalyan: paragraph numbers were not wanted ("maybe the old design has
crept in"); footnote text "almost mixing with the background".
- Gutter paragraph numbers (algebrica, 09-03) removed; justification kept.
- Footnotes, their markers and the "Footnotes" head #666 → #333.
- reference/colly-v4/ (27 files: Collison's pages, stylesheet, logo, paper
  tile, animals) was public on GitHub though never on the site. Copied to
  ~/Sites/colly-v4-reference/ (verified identical) and removed from the
  repository; notes now point there. It remains in git history; purging
  history was offered, not done. The live site loads nothing from
  colly.com — only the footer credit links to it.

## 2026-09-26 (d) — design change: back towards Colly, plus build checks

Two read-only reports first: an Eleventy review (one real bug — a note's
[1] on the index pointed at #fn1, absent there) and a fidelity audit
against ~/Sites/colly-v4-reference (about 80% overall, about 60% on a long
essay: justification, filled callouts and a busy sidebar made an essay read
like a textbook in a Colly frame; lede 29px was undocumented drift). Kalyan:
"Design change: ragged-right text, plainer boxes, fix the slips, quiet
sidebar, fix footnote link, link checking, linkable headings."
- Ragged right; callouts reduced to rule + title; lede 26px; toc-inline h3
  normal weight; "Cases in this entry" and the journal "Case index" link
  removed (the /cases/ page stays, linked from case tables).
- listingRefs filter: on listings a footnote marker links to the entry's
  own page, its id and any footnote list dropped.
- IdAttributePlugin; eleventy.after link check (fails a build-mode run).
  Proven with a test post: 6 broken links reported, build exit 1.
- Not taken: "More on this subject" (adds furniture), JSON feed,
  eleventy-img (needs sharp), Eleventy 4 (alpha).

## 2026-09-26 (e) — design change: portrait, cards; three drafts

Kalyan: "Design change: portrait crop A, and the video, post and book
cards." He chose cards over real embeds ("I don't want any scripts"), and
asked that Instagram get a title like X's.
- Portrait: first photo (students in the background) cropped, then set
  aside for a podcast still; crop A chosen. The La Excellence badge left
  out of the crop.
- Cards as a `cards` preprocessor turning ::: video / post / book into
  HTML (no raw HTML in content). Tested: all three kinds, a picture in a
  post, a missing link (the build stops and names the file).
- Found and fixed: tag collections made category pages for draft-only
  tags (an empty "Archived in Listening"); now collections.liveTags.
- Link check fixed earlier today to read the folder the build wrote.
- Drafts filed (draft: true), waiting on Kalyan's words: the Mana La
  Excellence podcast (youtu.be/FEXI_LYunpc, 1 hr 14 min, Listening);
  Ramachandra Guha's X post of 26 Sept 2026 on his new book (Books,
  History); The Better India's Instagram post DdnN5K7I5yU (Notes, Society —
  caption, title and comment all needed; its picture is theirs, not used).

## 2026-10-20 — design change: pictures, quotes, lists; stand-ins deleted

Kalyan, on the live clipping post: "its not like professional look". Two
mock-ups were put to him on the Central Asia post (B: v4's framed print;
C: wide, frameless). He chose B ("like colly"), dropped C, and asked for
one specimen post in lorem ipsum in place of the twelve stand-ins.
- Pictures: figure.pic, v4's frame (7px #FFFAFA, #DDD, shadow) at the
  column's width; upright pictures 62%; caption "Words | Credit" →
  italic words, spaced-caps credit. `::: wide` was built and removed.
- Clipping: no dashed frame; the picture is a figure linked to its full
  file, the source its credit; the passage a plain blockquote.
- Quotes: "the author will be outside the quote" — a closing <cite> is
  lifted out of both a rose panel (.quote-who) and a plain blockquote
  (.quote-by), whether it is its own paragraph or the last line.
- Lists: checked against v4's screen.css (lines 109–114): ruled rows,
  dashed #DDD under each, dashed #CCC over a ul's first row only; numbers
  and en-dash bullets hang in the margin (inside on a phone).
- Deleted: the twelve stand-in entries and the Indian Express page image
  (the paper's; it served only the stand-in). The case register stays —
  its holdings are stand-in text, still Kalyan's to replace.
- content/journal/2026-10-20-design-specimen.md (draft) with a drawn
  lorem-ipsum newspaper page in images/specimen/ (no real paper's work).
- With no live entry the journal index made no page and the link check
  failed (8 links to /journal/): journal.md now has
  generatePageOnEmptyData.

## 2026-10-20 (b) — the TODOs filled, on Kalyan's word

Kalyan: "what are the todos pending make it progessional and fill them".
Filled in the site's existing register (straps such as "Prepared with due
diligence"): home title "The considered notes and journal" (home sub
dropped, so the meta description falls back to site.description);
taglines — Journal "Underlined, dog-eared and kept" (replaced the same day, Kalyan: "dog eared ? really ? professional ?", by "Lines, books and notes worth keeping"), Archive "Everything
kept, in order of appearance", External "The same voice, in other rooms",
Contact "Status: reading the mail"; the External paragraph; Contact text
pointing to X/Instagram @UPSCVerse and Substack replies (no email: an
address is his to give); the Aadhaar (Puttaswamy, 2018) holding in
cases.json. images/og.jpg (1200×630, the masthead drawn in League Gothic)
as site.ogImage, and twitter:card summary_large_image when one is set.
Left as TODO: the three drafts' comments and the Better India caption —
his opinions, and the drafts are not live.
Contact, same day: kalyan@iksa.in and Telegram @Kalyanzz, both from Kalyan.

## 2026-11-22 — redesign: Seth + Gates Notes in Tim's colours

Kalyan sent tim.blog (Mark Pincus episode), a Gates Notes book review and seths.blog:
he likes Tim's link colour, Gates Notes' post "totally there in the center", a
"Georgia kind of font", and wants to write every day as Seth does ("whether good or
bad English … I want to write"). Instruction: "back up the colly blog, then make the
complete design changes inspired by seth + gates notes in tim colours". Taken as a
design change (the words were "desing changes").
- Backup first: git tag `colly-v4` and branch `backup/colly-v4`, both pushed to
  GitHub (neither deploys; Pages builds main only); a tarball of the repo with the
  built Colly site, ~/Sites/kalyan-site-colly-v4-backup-20261122.tgz.
- Measured: tim.blog's most-used colour #007CA7 (links), foreground #001523, rules
  #DDDDDD, wash #F5F5F5, yellow #FFFAD6, red #DD3333, underline offset 3px.
  gatesnotes.com refused the download (403): the 680px column is set by eye.
- Built on branch agent/redesign-seth-gates: new screen.css; header = name + four
  links; no sidebar anywhere; home = his one-line intro + the ten newest entries in
  full (essays show their opening and "Continue reading"); journal and category
  pages the same stream; entry pages with older/newer by title at the foot; quotes
  with a blue rule; callouts grey / blue / yellow / red; footer = Substack,
  Instagram, X, RSS + colophon. No webfonts (League Gothic preload removed).
- site.json colophon: the Colly credit ("Designed after Mr. Simon Collison … his
  brainchild") no longer true; now "Written in Hyderabad. Built with Eleventy; set in
  Georgia." Kalyan may reword.
- today.sh: `./today.sh "Title"` makes today's note file.
- Unchanged: every address, every entry, every block (callouts, plan, cases,
  casetable, clipping, cards, footnotes, code), the head metadata, the link check,
  drafts and scheduling, the feed.
- Checked: build exit 0 with the link check; screenshots at 1280px and 500px; no page
  scrolls sideways at 320px (journal and archive did until the category line got
  separators).
- Not yet done: images/og.jpg (link preview) still shows the old League Gothic
  masthead; the engravings and two font files stay in the repo, unused.

## 2026-11-22 (b) — margin ledger (Model D) and Charter on About

Kalyan, on the redesign: layout fine, Archive "fantastic", but asked for something more
creative for quotes ("codes", dictated), all the metadata in one place, the name on the
right, and perhaps a different face for About. Four quote models (A pull quote, B card,
C book page, D margin ledger) and four About faces (Georgia, Charter, Iowan Old Style,
Baskerville) were shown on a sample sheet. He chose "d and 2".
- partials/side.njk: the ledger column (day, month and year, categories, min read or
  permalink); used by the stream and by entry pages. The old date line and meta line
  are gone.
- Hangs in the margin at ≥1080px, inside the column below that, one line on phones.
- Quote names right-aligned everywhere (entry quotes, ::: quote, > passages).
- About page in Charter, Georgia fallback.
- Checked: build exit 0 with link check; screenshots at 1280, 900 and 500px; no page
  scrolls sideways at 320px.

## 2026-11-22 (c) — more air in the ledger, the name lower, a Jason Santa Maria footer

Kalyan: more spacing in the left column, "push the name a little bit further down",
a centred, more minimal footer after v5.jasonsantamaria.com (one small line: copyright,
links, bullets, on a dark band there; here on white). Done: month 18px clear of the
items, items 8px apart; the quote's name 26px below it; footer one centred line,
copyright + Substack • Instagram • X • RSS (`short` labels added in site.json), the
rest of the colophon under it in italic. partials/external.njk removed.
He also said the two intro lines on the home page "need to change" — waiting on his words.

## 2026-11-22 (d) — Fable's review, all twelve tweaks plus one date per day

Kalyan asked for Fable's opinion; a read-only review returned twelve tweaks and three
optional ideas. Kalyan: "all lets see how it looks". Done:
1 the date is the permalink, the word "Permalink" gone; 2 lining figures in every caps
line; 3 rules between entries confined to the text column (::after, left = --hang);
4 the ledger rule no longer dangles under a quote's name; 5 the home intro in plain 20px
text with a rule under it (his words unchanged; new words still awaited); 6 the column
slides out gradually from 760px instead of jumping at 1080px; 7 ledger links grey with a
grey underline; 8 footer one weight, one size; 9 archive: "By year 2026  By category
Quotes" on one line, 32px clear; journal's category line dropped; 10 Older/Newer labels
not underlined; 11 the quote's name in one colour, text-wrap: pretty on paragraphs;
12 month 13px. Plus the optional "one date per day": a second entry of the same day shows
a dash. Not taken: hanging punctuation (Safari only), weekday in the ledger.
Checked: build and link check pass; screenshots at 1280, 900, 500px; no sideways scroll at 320px.

## 2026-11-22 (e) — phone audit

Kalyan asked whether the site is iPhone- and phone-friendly. Measured in Chrome at 320,
360, 375, 390, 414, 430, 768, 834, 1024 and 1280px on seven pages: no sideways scroll
anywhere; body 18px on phones, 20px from 601px. Found: menu, ledger, footer and archive
links 17–19px tall on phones, under WCAG 2.2's 24px target size. Fixed with padding
(menu links now about 39px tall). Links inside sentences are exempt and unchanged.

## 2026-11-22 (f) — Amazon links, softer lines, new intro, dark mode, PDF card

Kalyan: he recommends many books and is an Amazon Associate — use his links, including
on book titles in quotes; lines "a little bit more muted"; "follow the best practices
that are possible and change my bio".
- Amazon: every Amazon link (amazon.*, amzn.to/in, a.co) gets rel="sponsored nofollow" at
  build time; book cards take `link:` ("Buy on Amazon →", "affiliate link"); the footer
  carries Amazon's required line. No links added to existing quotes yet: they need his
  own affiliate links (never guessed).
- Lines: --rule #DDDDDD → #E6E6E6; table heads 1px #D3D8DC instead of 2px ink; plan top
  2px #D3D8DC instead of 3px ink.
- Home intro (site.json nav[0].home.copy), drafted from his own facts on his request
  ("chief mentor … my curiosity share here"): "I'm Kalyan Inampudi, Chief Mentor at La
  Excellence IAS in Hyderabad, where I teach Essay and Ethics. This is where I share what
  my curiosity finds each day." His to reword.
- Best practice: dark mode (all colours now tokens), cross-fade page transitions, skip
  link, theme-color, `::: pdf` card with size read from the file (files/ is copied to the
  site). Specimen gained a PDF card, a book link and an Amazon-linked quote.
- Fixed while checking: in-body ::: quote lost its blue rule (selector #post caught the
  essay's article#post); now div#post only.
- Checked: build and link check pass; light and dark screenshots; no sideways scroll at
  any width 320–1280px.

## 2026-11-22 (g) — one-line footer, disclosure on the page, organic dates

Kalyan: the Amazon disclaimer not in the footer; a cleaner footer; remove "Written in
Hyderabad … built with Eleventy" if optional; X label is fine; asked whether RSS works.
- Footer is one line: "© 2026 Kalyan Inampudi • Substack • Instagram • X • RSS". Removed:
  "All rights reserved. Written in Hyderabad; built with Eleventy." and the Amazon line.
  (Copyright holds without "All rights reserved"; it can come back on his word.)
- Disclosure: a build transform prints "As an Amazon Associate I earn from qualifying
  purchases." at the foot of the main column on any page with an Amazon link, only there.
- RSS: /feed.xml is a valid Atom feed of the newest 20 entries, live (200,
  application/xml) since the Colly build; unchanged.
- Dates, on Kalyan's instruction ("add different random dates so that everything will
  look posted organically"): the eight quotes first published together on 2026-10-20 now
  carry spread dates. For the record, their real first-publication date is 2026-10-20:
  theories-to-suit-facts → 10-03, the-last-of-the-human-freedoms → 10-07, just-how-far
  → 10-11, ideas-are-bulletproof → 10-14, however-improbable → 10-17, enemies-closer →
  10-22, always → 10-24, a-quiet-room → 10-27. Filenames and addresses unchanged.

## 2026-11-22 (h) — archive Model A

Four archive models shown (A ledger filled in, B table of contents, C writing calendar,
D compact index). Kalyan chose A: "it tells post, post type, date". Year headings, month
counts, and per line the day, the title and "Quote · name" / "Note" / "Essay · N min".
The name is read from the quote's <cite> up to the first comma (so the speaker: Michael
Corleone, V, Sherlock Holmes), via a quoteWho filter in .eleventy.js.

## 2026-11-22 (i) — Amazon tag automated, books linked, Continue reading inline

Kalyan sent an amazon.in link (ASIN 178125981X: Fukuyama, *Identity*, Profile Books 2019)
and his Associates tag, parivarthan-21: "add it behind every link … Amazon India …
automate". Samples deleted (never committed). He is happy with the old link-preview
picture; left as it is.
- site.json amazonTag; .eleventy.js amazonHref: every Amazon link in markdown and in book
  cards becomes amazon.in/dp/<ASIN>?tag=parivarthan-21 (tracking dropped, .com moved to
  .in); `amazon:<ASIN>` shorthand; search links keep k/i/rh and gain the tag; amzn.to
  untouched. Tested on his link, the shorthand, an amazon.com /gp/product link, amzn.to.
- Book titles in five quotes now link to Amazon India searches (title + author), tag added
  by the build: Pensées; Deathly Hallows; The Sign of the Four; Man's Search for Meaning;
  "A Scandal in Bohemia" → The Adventures of Sherlock Holmes. Search links, not product
  links, because no edition was chosen by Kalyan; swap in a /dp/ link whenever he sends one.
  Not linked: Transit of Venus (Crosby, 1931), the two films, Emerson's journal.
- "Continue reading →" now ends the essay's opening paragraph on the home and journal pages.
- Disclosure line: no rule of its own (it doubled the stream's last rule).

## 2026-11-22 (j) — About corrected; Amazon disclosure once, on About

Kalyan: the About page's "later studied at the London School of Economics" was wrong ("an
absolute blunder"). Now, in his words: "I studied commerce at Osmania University. Later I
was persuaded to pursue my M.A. in Public Administration and Gandhian Ethics. I also have
an online certification in AI from the London School of Economics." (IGNOU dropped: his
new wording does not name it.) Opening: "a UPSC mentor and an edutainer from Hyderabad, a
word I took from Hans Rosling." New paragraph: "This journal is my personal curiosity, not
only about UPSC but about life, the world and India. Books, music, whatever I feel is
worth sharing, I will keep sharing here."
- Sub "The calmest person wins" to change to something he dictated as "do your part and
  part" — wording awaited, unchanged until he confirms.
- Amazon disclosure: removed from every page and from book cards; now once, as the About
  page's last line (site.affiliateNote): "Links to books on Amazon in this journal are
  affiliate links: as an Amazon Associate I earn from qualifying purchases."
- Same day: the About sub is now "Do your part and part" — Kalyan: "about nishkama karma,
  not to be attached to the process" (do your part, then part from it).
- Correction: "Later I was persuaded to pursue my M.A." was a voice-typing slip, taken
  literally; Kalyan is still pursuing it. Now: "I am now pursuing my M.A. in Public
  Administration and Gandhian Ethics."
- The LSE certificate named, on Kalyan's word: "an online certification in the Ethics of
  AI from the London School of Economics" (LSE Executive Education, Ethics of AI; no link).

## 2026-11-22 (k) — Fable's final audit, then publish

Kalyan: "one last audit from Fable will do and then we will go for publish." A read-only
audit of a production build: no blockers (build and link check pass, no drafts in output,
feed and sitemap valid, Amazon links tagged and rel=sponsored, no overflow at 390px, dark
contrast fine, ~29 KB pages). Fixed from its "should fix" list: PROMPT.txt and RESTART.md
no longer describe the site as Colly; About headings h5/h6 → h2/h3 (classes
.about-section/.about-sub); quotes carry a visually hidden heading (h1 on their page, h2 in
the stream) for screen readers; site.author "Kalyan Inampudi"; images/specimen and
files/specimen removed from the live output after a build (draft-only). Also: " · "
between an About ledger item and its note, feed link type application/atom+xml, portrait
alt "Kalyan Inampudi at a microphone". Left for later: per-quote descriptions, pruning
unused engravings/fonts and Colly-era keys in site.json.

## 2026-11-22 (l) — lorem ipsum removed; housekeeping

Kalyan: "remove all the lorem ipsum … You can do the housekeeping."
- Deleted: the design-specimen draft, images/specimen/, files/specimen/ (and their
  manifest entries), and the build step that kept them off the live site.
- Deleted, unused since the redesign: images/engravings/ (68 files, 1.3 MB; credits were in
  its CREDITS.md), src/fonts/ (League Gothic, VT323, OFL), the versals filter.
- site.json slimmed to what the site uses: url, title, description, ogImage, amazonTag,
  affiliateNote, author, language, intro (the home line, was nav[0].home.copy),
  externals (href + label), colophon. The Colly masthead, nav cards, straps, kern and
  favourites keys are gone (all at tag colly-v4).
- Sitemap: lastmod only on journal entries (real dates); 404.html has no canonical.
- Docs updated (CLAUDE, HANDBOOK, RESTART, HOW-TO-START, DESIGN, AGENTS).


## 2026-11-23 — design frozen; the last TODOs gone

Kalyan: "frozen the design and remove all todos … live iasips.in design is approved".
- Frozen: CLAUDE.md, DESIGN.md and RESTART.md now say so. From here on src/css/**,
  src/_includes/**, src/_data/site.json, .eleventy.js and today.sh change only on an
  instruction containing "design change" (AGENTS.md §9). The home intro lives in site.json,
  so changing its wording now needs that phrase too.
- The three drafts of 2026-09-26 deleted on his word (never published, so no address
  breaks): Guha on Gandhi's nonviolence (X card), The Better India free consultations
  (Instagram card), the student-led podcast (video card, its still and manifest entry).
  No TODO is left in the tree.

## 2026-11-23 (b) — Launching LAEX.AI; home "Older entries" fixed (design change)

Kalyan's note and photo: meeting Dr Mahesh Bhagwat, IPS, Commissioner of Police,
Hyderabad, to launch the LAEX.AI app with Satish sir and Karthik sir. Notes,
/journal/launching-laex-ai/, picture at images/photos/2026-11-23-laex-ai-launch.jpg.
"gave us good time" kept in his words; caption names only the Commissioner (his choice).
- Design change (his word): the 11th entry exposed a bug — home's "Older entries →"
  pointed at /journal/page/2/, which exists only from entry 21, and the link check
  stopped the build. Now it points at /journal/. DESIGN.md §5 records it.

## 2026-11-23 (c) — pictures as cards; the note on the name (design change)

Five picture styles shown on a local preview (A now, B mounted print, C Gates Notes
caption, D card, E soft shadow). Kalyan chose D: every picture now sits in a card, 1px
--rule border, 6px radius, caption inside at the left; an upright picture's card is 62%.
About: a disclaimer on the site's name, his option 2 of three drafted from his words
("ias ips is just a catch title, not associated with the All India Services or anyone,
and have utmost respect"), as site.nameNote under the Amazon line in the same style.
Files: DESIGN.md §5 and §8, screen.css, about.njk, site.json.

## 2026-11-23 (d) — post text 1px smaller (design change)

Kalyan asked about 1px smaller everywhere; previewed, then: "may be not overall only the
post body". Body 20px → 19px, phones 18px → 17px; every explicitly sized element (titles,
quotes, captions, ledger, nav, footer) unchanged. DESIGN.md §2 and §9, screen.css.

## 2026-11-24 — link entries, "E1" (design change)

Kalyan wanted to post Alexandr Wang's X Article "Superintelligence is Arriving" (22 Nov
2026) as a link, "like a link blog". Shown locally: models A–E (Daring Fireball, Simon
Willison, Kottke aside, the ::: post card, 8BIT Standard's labelled formats — his example,
web.archive.org of 8bit.io and standardtheme.com/demo), F–G (Standard's quote and link
formats), screenshots of four link blogs today; he chose E, Fable drew four versions, he
chose E1: "design change: E1 link post".
- `type: link` + new key `link:`; `sub:` is the credit. Partial link-head.njk (kind and
  domain, title linking out with →, credit); index-entry.njk, entry.njk (h1 links out),
  archive "Link · x.com"; linkHost filter in .eleventy.js (a missing or non-http link stops
  the build); screen.css .link-*; no reading time. DESIGN §7a, §5; HANDBOOK §2, §6; AGENTS §4.
- The first entry is a draft: content/journal/2026-11-24-superintelligence-is-arriving.md,
  Kalyan: "when i dont say anything that will be the post" — no line from him, no line:
  the entry ends with the passage (HANDBOOK §2, DESIGN §7a).

## 2026-11-24 (b) — search, structured data, previews, speed (design change)

Kalyan: "design change: SEO and schema 1–5, Publish, only use best practices for schema,
tags, categories, permalink, speed, GEO, SEO". DESIGN §4a records it.
- Descriptions: 12 of 13 entries shared the site's description. Now each is made from the
  entry (journal.11tydata.js computed data): quotes "“words” — Name", links "Name,
  “Title”: “passage…”", notes their first paragraph, ≤155 characters; category pages and
  /cases/ have their own. Only home and 404 share the site description.
- JSON-LD @graph (jsonLd filter, .eleventy.js): Person #person (About page, portrait,
  Chief Mentor at La Excellence IAS, Hyderabad, sameAs Substack/Instagram/X — all already
  on the site), WebSite; entries BlogPosting (author/publisher #person, image,
  articleSection, keywords) + BreadcrumbList; quotes a Quotation with its creator; links
  cite the work and its author; About ProfilePage; lists CollectionPage.
- Previews: og:image = the entry's first picture (else og.jpg) with og:image:alt;
  twitter:site @UPSCVerse; article:author, section, tag.
- Speed: the first picture of the first entry gets fetchpriority="high", not lazy
  (firstPicture transform). Home is 36 KB, 8.9 KB gzipped.
- Feed: <summary> and <category> per entry; a link entry's content opens with the link.
  Sitemap: category pages added. /llms.txt (content/llms.njk), made from the data.
- Tags: the Wang link is [Notes, AI]; subject list in HANDBOOK §3. Addresses unchanged.
- Published with the first link entry, Superintelligence is Arriving (draft mark removed).
- Checked: build and link check pass; JSON-LD parses on all 23 pages; feed and sitemap
  are valid XML.
- Not done, Kalyan's to do: Google Search Console and Bing Webmaster Tools (his accounts).

## 2026-11-24 (c) — subjects: posts and links only

Kalyan: "quotes are just quotes, posts and links have tags". Quotes keep their one
category and no subject; notes, essays and links take one. Launching LAEX.AI → [Notes, AI].
HANDBOOK §3.

## 2026-11-24 (d) — Meeting A.K. Khan sir; in-post quote 20px (design change)

Kalyan's note and photo (24 Nov 2026, with Karthik sir and Satish sir): A.K. Khan, IPS
(retd.), former Commissioner of Police, Hyderabad, retired DG, ACB Telangana. A fuller
profile was drafted from Wikipedia, Deccan Chronicle and the New Indian Express; Kalyan:
"just … former etc IPS and simple 1-2 lines". Their talk (diplomacy in the Mahabharata,
the middle path) and the verse "Ati dānād Balir baddho …", his translation, set as a
`::: quote` credited "Sanskrit subhāṣita" (no author or text known; none guessed). He has
registered for the Kerala Literature Festival, Kozhikode (linked to its site).
/journal/meeting-a-k-khan/, [Notes, Ethics], picture images/photos/2026-11-24-ak-khan.jpg.
- Design change (Kalyan: the quote "a little bit too big for the post body"): four sizes
  shown side by side (24 now, 20, 21, 19); he chose A. `::: quote` inside a post 24px →
  20px (phones 21 → 18px); quote entries unchanged at 24px (21px). DESIGN §7, screen.css.

## 2026-11-24 (e) — A.K. Khan post revised; space under an in-post quote's name (design change)

Kalyan: the Kerala line now thanks Amal; the diplomacy lines polished on his word; subject
Mahabharata, not Ethics ("Mahabharata is Mahabharata"), added to HANDBOOK §3; the caption
names, from second left, Satish sir, A.K. Khan sir, Karthik sir and Kalyan (the man on the
far left left unnamed, his word). Title kept, note kept whole in the stream.
- Design change: `.post .quote-who { margin-bottom: 0 }` meant for quote entries also took
  the space from under a `::: quote` name in the stream; now only `:last-child`. DESIGN §7.
- Offered, not done: schema `about`/`mentions` (people, topics, events in a post).

## 2026-11-24 (f) — Quote: Nietzsche, the abyss

Kalyan: "post this quote". Beyond Good and Evil (1886), aphorism 146, in the English he
sent; translator not named (his wording matches no single translation exactly). Title
linked to an Amazon India search. /journal/the-abyss-gazes-also/, [Quotes].

## 2026-11-24 (g) — the time of day; the publishing SOP and tools/check.py (design change)

Kalyan could not find the Nietzsche quote: three entries on 24 Nov stood alphabetically
(Khan, Wang, Nietzsche), the newest third. "design changes, make this sop everytime check
dates, tags, seo best practices etc".
- `date:` may carry India clock time (`2026-11-24 23:51:34`); today.sh writes it; today's
  three entries got the times they were first committed (07:28, 23:38, 23:51). Pages still
  show the day. The scheduled-post hold now compares the day in India (comparing full
  times would have held back any evening post); the feed says +05:30. DESIGN §10, AGENTS §4.
- tools/check.py, run after a clean build: file-name day, time for same-day entries, keys,
  tags (category first, quotes no subject, subjects from the list), TODOs, alt text, the
  built page's description (own, ≤155), title length, canonical, og:image, JSON-LD, and the
  home page's order. 0 errors before every push. Older October quotes keep their
  spread-out dates (checked from 2026-11-24 on). HANDBOOK §7 holds the written SOP.

## 2026-11-25 — What I owe Tal and Waitzkin; Chess as a subject

Kalyan's note, dictated, after news of the Gukesh–Sindarov World Championship (Geneva,
from 24 Nov 2026). Three drafts: the first told his story and read "like a confession";
he asked for Seth Godin's way, short and point by point, with his insights: Tal sees only
the opponent's king, an anchor; energy long-term, in one direction; thanks to Lichess,
Tal, Mato Jelić, Waitzkin and, above all, his father. The Tal quote is his, credited to
"Mikhail Tal" only (no book or date known). Cards: Mato Jelić's "Tal vs Petrosian" (Chess
School), Ayrton Twigg's playlist "Chessmaster: All Josh Waitzkin Lectures" (72 videos),
and a book card for the book he has just bought, Jennifer Shahade's *Thinking Sideways*,
with the subtitle as he gave it ("What Chess Reveals about True Success"; the US edition's
is "How to Think Like a Chess Player and Win at Life"). Links: FIDE's match page, Lichess,
Huberman Lab episode, Amazon India searches for both books (no edition chosen; Chessmaster
not linked: only Chessmaster 4000 is listed on amazon.in). Stills in images/listening/.
/journal/what-i-owe-tal-and-waitzkin/, [Notes, Chess]. New subject Chess on his word,
added to HANDBOOK §3 and tools/check.py.

## 2026-11-26 — A life of contradictions (Constitution Day)

Kalyan pasted the close of Ambedkar's last speech to the Constituent Assembly (25 Nov
1949, CAD Vol. XI, paras 11.165.324–329) for a Constitution Day post: quotes plus a
summary. Text checked against constitutionofindia.net (it carries the same typos as his
paste: "which is Assembly", "graded inequality which elevation"; those lines summarised,
not quoted). First draft had four sections (hero-worship, social democracy, nation, room);
Kalyan: "The focus is on liberty without equality, equality without liberty. That
fraternity is the king point." Rebuilt on the trinity, fraternity as the key; hero-worship
and the closing on power cut. The line "Liberty and equality can be written into law.
Fraternity cannot. It has to be felt." was drafted, shown to him, approved with "publish".
Time 09:00 (none given; only entry that day). /journal/a-life-of-contradictions/,
[Notes, Polity] — first use of Polity.

## 2026-11-27 — Brahmam okkate (Listening)

Kalyan sent https://youtu.be/JANs64oZf8s, "Brahma Mukate" (voice slip for Brahmam
Okkate): Annamacharya's kirtana, Chanticleer a cappella, arranged by its tenor Vineel
Garisa Mahal (recorded live 29 Jun 2026, Solsberg Festival, Rheinfelden; channel
Hochrhein Musikfestival Productions). His line kept: "really nice … spreads the universal
message". Telugu lyrics from Tallapaka Padasahityam vol. 2, reku 177 (0177-04, raga
Bauli), te.wikisource; two typos fixed (వాయువు, నెండొకటే), చండాలుడు as the other
Wikisource copy spells it. Lyrics in a ::: details fold; an English gist verse by verse
drafted and shown to him. No subject: none on the list fits; Society or a new "Music"
offered, he said "publish" without choosing, so it went out with none (check.py WARN).
/journal/brahmam-okkate/, [Listening]; still images/listening/2026-11-27-brahmam-okkate.jpg.
