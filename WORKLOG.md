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
