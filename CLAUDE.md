# Kalyan's personal site

Eleventy 3 static site that reproduces Simon Collison's v4 (colly.com/v4)
whole — Kalyan's verdict on 2026-08-30 was that a reinterpretation was
"not even close"; the stylesheet is now a transcription of v4's. Two files
govern everything:

- **DESIGN.md** — the visual spec. Every CSS value traces to a measurement
  in `reference/colly-v4/MEASUREMENTS.md`. Nothing is invented.
- **AGENTS.md** — what an agent may touch (content/**/*.md, three JSON
  data files, drafts/**) and the git protocol. Everything else is frozen.

**Freeze status: NOT YET FROZEN.** This is the first session's build,
awaiting Kalyan's read. Until Kalyan says "frozen", CSS/layout edits are
allowed on his instruction. After that, DESIGN.md is law and frozen files
change only when his instruction contains "design change" (AGENTS.md §9).

## Where we are

The site is LIVE at https://iasips.in, published by GitHub Pages from the
public repository github.com/iksa01/iasips-site on every push to main.
Commit + `git push` = publish.

Read **HANDBOOK.md** before writing or editing any post — it is the
complete list of what the blog accepts: the three entry kinds (essay,
note, quote), the five categories, every block, pictures, the publishing
routine, and what is not allowed. Then `RESTART.md` (how to run and
resume), `WORKLOG.md` (the round-by-round history and why), DESIGN.md
(§7b is the 2026 body), AGENTS.md (the rules).

## Build

    npx @11ty/eleventy            # → _site/, must exit 0 before any commit
    npx @11ty/eleventy --serve    # local preview

Node 24 (`.nvmrc`). Never `npm install`; the lockfile is frozen.

## Where things live

| thing | file |
|---|---|
| masthead lines, nav straps/labels, external cards, colophon | `src/_data/site.json` (frozen — voice content, set once) |
| books / talks / interviews on the about page | `src/_data/{books,talks,interviews}.json` (append-only) |
| pages | `content/{index,about,journal,archive,external,contact}.md` |
| journal entries | `content/journal/<slug>.md` → `/journal/<slug>/` |
| layouts & partials | `src/_includes/` |
| the stylesheet | `src/css/screen.css` (transcribed from `reference/colly-v4/screen.css`) |
| wordmark font | `src/fonts/LeagueGothic-Regular.woff2` (OFL) |
| code font | `src/fonts/VT323-Regular.woff2` (OFL, 8-bit terminal face) |
| card engravings | `images/engravings/gosse/` — public-domain Gosse cuts (CREDITS.md) |
| markdown config (typographer, footnotes, figures, asterism) | `.eleventy.js` |
| the reference | `reference/colly-v4/` (snapshot of colly.com/v4, 2026-08-30) |

## Every "TODO:" in the tree is a fact only Kalyan can supply

Masthead lines, straps, page taglines, the about text, external
destinations, colophon lines, `site.url`, the portrait image, and the
three sample journal entries (public-domain stand-ins, delete when real
entries exist). Never replace a TODO with a plausible guess.
