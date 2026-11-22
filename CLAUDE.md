# Kalyan's personal site

Eleventy 3 static site: a writer's daily blog. Since 2026-11-22 the design is
Seth Godin's rhythm (newest posts in full), Gates Notes' single centred column,
Tim Ferriss's colours (links #007CA7), Georgia throughout. The Colly v4
transcription it replaced (2026-08-30 to 2026-11-22) is kept at git tag
`colly-v4`, branch `backup/colly-v4`, and in
~/Sites/kalyan-site-colly-v4-backup-20261122.tgz. Two files govern everything:

- **DESIGN.md** — the visual spec; §1 lists where each value was measured.
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

## Before publishing any post: say the source (Kalyan, 2026-09-26)

Before every push that publishes or changes a post, tell Kalyan in plain
words: the **source** (who said or wrote it; the book, film, show, paper
or talk; date and page if known), the **category** it is filed under, and
its **address**. He asked for this "so that I will remember". Never guess
an attribution: an unknown source is asked for or written as `TODO:`.
A long passage is not a quote — it goes in a plain `>` blockquote, not
the blue-ruled quote. HANDBOOK §7 has the routine.

## Build

    npx @11ty/eleventy            # → _site/, must exit 0 before any commit
    npx @11ty/eleventy --serve    # local preview

Node 24 (`.nvmrc`). Never `npm install`; the lockfile is frozen.

## Where things live

| thing | file |
|---|---|
| title, description, home intro, footer links, colophon, Amazon tag and note | `src/_data/site.json` |
| books / talks / interviews on the about page | `src/_data/{books,talks,interviews}.json` (append-only) |
| pages | `content/{index,about,journal,archive,external,contact}.md` |
| journal entries | `content/journal/<slug>.md` → `/journal/<slug>/` |
| layouts & partials | `src/_includes/` |
| the stylesheet | `src/css/screen.css` (DESIGN.md) |
| fonts | none: Georgia (Charter on About) and the system monospace |
| start today's post | `./today.sh "The title"` |
| markdown config (typographer, footnotes, figures, asterism) | `.eleventy.js` |
| the old reference | `~/Sites/colly-v4-reference/` (private, on Kalyan's Mac only) — only for restoring the Colly design |

## Every "TODO:" in the tree is a fact only Kalyan can supply

Masthead lines, straps, page taglines, the about text, external
destinations, colophon lines, `site.url`, the portrait image. The stand-in entries were
deleted 2026-10-20; the lorem-ipsum specimen was deleted 2026-11-22. Never replace a TODO with a plausible guess.
