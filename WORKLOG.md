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
