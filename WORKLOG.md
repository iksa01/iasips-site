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
