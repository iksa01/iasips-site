# RESTART — how to pick this up again

Everything lives in one folder. Nothing is in the cloud, nothing is pushed.

    ~/Sites/kalyan-site

## 0. The whole thing in three steps

**Step 1 — start the site.** In a terminal:

    cd ~/Sites/kalyan-site && ./start.sh

It builds, serves on <http://localhost:8080/>, opens your browser, and
rebuilds every time you save a file. Leave that terminal running.
Stop it with Ctrl+C.

**Step 2 — open Claude.** In a *second* terminal:

    cd ~/Sites/kalyan-site && claude

**Step 3 — paste this as your first message** (it is saved in `PROMPT.txt`,
so you can also just say: *read PROMPT.txt and follow it*):

> Read RESTART.md, WORKLOG.md, DESIGN.md and AGENTS.md in this repo before
> doing anything.
>
> Context in one line: this is my personal site — Simon Collison's Colly v4
> design (colly.com/v4), transcribed whole, built with Eleventy 3, zero
> JavaScript on the page. DESIGN.md is the visual law and WORKLOG.md is the
> history of every decision and why.
>
> Rules: do not invent my words — every "TODO:" is a fact only I can supply.
> Never run npm install. Do not change src/css/, src/_includes/ or
> .eleventy.js unless my instruction contains the phrase "design change".
>
> The dev server is already running at http://localhost:8080/ — do not start
> another one.
>
> Tell me where we left off and what is waiting on me.

That is everything. The rest of this file is detail.

## 1. See the site

    cd ~/Sites/kalyan-site && ./start.sh

Serves on <http://localhost:8080/>. Pages:

| page | what it is |
|---|---|
| `/` | home: masthead, four cards, external references, colophon |
| `/journal/` | the journal index — the page you called "beautiful" |
| `/journal/sample-essay/` | the specimen: callouts, tables, plan grid, TOC, footnotes |
| `/journal/sample-note/` | the notes specimen: a one-page structured note |
| `/journal/sample-quote/` | a quote entry |
| `/about/` `/archive/` `/external/` `/contact/` | the rest |

Stop the server with Ctrl+C.

## 2. Restart the work with Claude

Two ways, and they are not the same:

**A fresh session in the repo — the normal way.**

    cd ~/Sites/kalyan-site
    claude

`CLAUDE.md` loads by itself and points at `WORKLOG.md`, `DESIGN.md`,
`AGENTS.md`. Open with one line:

> Read WORKLOG.md, DESIGN.md and AGENTS.md, then start the dev server and
> tell me where we left off.

Everything decided so far is written down in those files, so a brand-new
session (or a different AI entirely) can pick up without you re-explaining.

**Continue the actual conversation.** The transcript is stored per working
directory, and this project was built from the Obsidian vault, so:

    cd ~/Obsidian/Mains\ Vault
    claude --continue          # resumes the most recent session there
    claude --resume            # pick from a list

Note: Claude's own persistent memory is scoped to the directory it ran in
(the vault), so it does **not** follow you into `~/Sites/kalyan-site`. That
is why the repo carries its own documentation — treat these five files as
the memory:

| file | what it holds |
|---|---|
| `RESTART.md` | this — how to run, resume, write |
| `WORKLOG.md` | the round-by-round history and every lesson learned |
| `DESIGN.md` | the visual law, with an appendix of every deliberate departure |
| `AGENTS.md` | what an agent may touch, and the git protocol |
| `CLAUDE.md` | the short pointer that loads automatically |

Say **"frozen"** when the design is settled — after that, frozen files only
change when your instruction contains the words **"design change"**.

## 3. Where the design stands (2026-09-02)

Settled and not to be relitigated:

- The shell is Simon Collison's v4, transcribed from `reference/colly-v4/`.
  A reinterpretation was tried and rejected ("not even close by 1000 miles").
- **Card engravings FINAL (2026-09-03)**: Old Book Illustrations tailpieces —
  lamp (About), stationery (Journal), books and candle (Archive), man reading
  his mail (Contact), wreath and pen (Substack), Meyers camera (Instagram),
  Edison's electric pen (X), 1683 post rider (RSS). CREDITS.md has sources.
  The Gosse birds stay in gosse/ as a pool.
- **Callouts** carry one red in four weights: grey (note), pale rose (tip),
  rose (key), red (warning) — "set D", chosen 2026-09-03. One accent only.
- **Blockquotes** are Colly's, plus a hanging red quotation mark in the
  gutter (2026-09-03).
- **Tables** sit inside the 516px column with v4's dashed ledger rules
  (2026-09-02; they briefly reclaimed the gutter); prose lists have hanging
  en-dashes and no rules; leading is 24px; section heads sit 42px clear.
- **A post opens like Colly's**: title, date, lede. Categories, reading
  time and Older/Newer live in the sidebar; on a phone they collapse to one
  italic line. The phone tier is fluid, not v4's fixed 306px.
- **2026-09-03**: entry paragraphs are justified, hyphenated and numbered
  in the gutter (from algebrica.org); `updated:` front matter shows an
  "Updated" line; landmarks, focus ring, description/canonical/prev/next,
  darker grey text for contrast. Sidebar stays left, as Colly's.
- **2026-09-03 (b)**: the sidebar aside is gone; one meta line under the
  title carries date, updated, reading time and linked categories.
  Category pages at `/journal/category/<tag>/`. Open Graph and JSON-LD in
  the head, sitemap last-modified dates, font preload, image dimensions.
- An **answer skeleton is not code** — it uses `::: plan`, never a code fence.
- The "2026 layout" experiment (margin sidenotes, fluid type) was built and
  then dropped on your instruction. It is recoverable from commit `98efd0d`.

## 4. The decisions waiting for you

1. **Every `TODO:`** in the tree is a fact only you can supply — page
   taglines, the About text, the licence line, external
   destinations, the colophon, `site.url`, `description` and `ogImage`
   (a 1200×630 picture for link previews) in site.json, the portrait.
   Say *"draft them"* and options get put in front of you to approve.
   The masthead lines, card straps and colophon credit were DRAFTED on
   2026-09-03 for your eye (WORKLOG 2026-09-03 e) — say the word to change
   any of them.
2. ~~Colly's animals~~ — deleted 2026-09-03 on your word.
3. **The sample journal entries** are specimens, not your writing. The essay
   is a UPSC piece on the Basic Structure Doctrine used to exercise every
   element; the quote and note entries are public-domain stand-ins.
4. ~~Working pages~~ `/engravings/` and `/modern/` — deleted 2026-09-03.
5. Open offers: inline the CSS at build time; Press Start 2P instead of
   VT323 for code; image pipeline (AVIF/WebP/srcset at build time); the
   callouts sit narrower than the tables, which leaves a ragged right edge.
6. Nothing is pushed anywhere. Say the word for a private GitHub repo.

## 5. Categories and how the journal is used (settled 2026-09-03)

Five categories, by SOURCE, one per post; a subject (Polity, Economy…) may
ride along as a second tag. Rename in bulk any time before going live;
after that a rename needs a redirect.

| category | what goes in it | entry kind |
|---|---|---|
| Quotes | a line worth keeping, with or without a comment | `type: quote` |
| Books | an excerpt and what you make of it | `type: quote` + commentary |
| Press | a newspaper clipping with your analysis | essay with a clipping block (to build) |
| Listening | a YouTube talk or podcast, with notes | `type: note`, link on the first line |
| Notes | your own thoughts | `type: note`, or an essay when long |

Rhythm: quotes and notes as they come; a clipping when the paper gives
you one; an excerpt when a chapter ends; a talk when one is worth keeping.

## 5a. Writing a post

Create `content/journal/YYYY-MM-DD-some-slug.md`:

    ---
    title: "The title"
    sub: "One line, shows under the title and in the index"
    date: 2026-09-01
    tags: [Notes]
    dropcap: true
    toc: true
    ---
    First paragraph is the lede — larger, and it carries the drop cap.

    ## A section heading

    Ordinary text. A footnote looks like this[^1].

    ::: note Context, definition, where it sits      (grey)
    ::: tip Method, how to write it                   (pale rose)
    ::: key The thing to remember                     (rose)
    ::: warning The mistake that costs marks          (red)
    ::: details Fold this away                        (click to open)

    Each is closed with a bare ::: on its own line.

    ::: cases
    - **Shankari Prasad, 1951** The gloss. The bold term becomes a
      spaced-caps sidehead above its explanation.
    :::

    ::: plan Answer skeleton — 15 marks
    - **Intro** One line. The bold label hangs in the left column.
    - **Origin** Keep labels to one word or they wrap.
    :::

    ```js/2-3 title="example.js"
    // language / highlighted lines / filename tab — all optional.
    // Keep lines short: a code block must never scroll sideways.
    // Only for actual code. Skeletons and structures use ::: plan.
    ```

    | A table | reclaims the right gutter |
    |---|---|
    | Years | line up: tabular numerals |

    ---

    `---` is the hairline. `***` is the ⁂ ornament.

    ![alt text](/images/photo.jpg "Caption in spaced caps")

A picture: put the file in `images/<folder>/`, then run once

    python3 tools/prepare-image.py images/press/my-picture.jpg

which fits it to 1400px, makes the small modern versions beside it, and
records its size; then reference it as above. A press cutting:

    ::: clipping The Indian Express, 26 August 2026
    ![headline](/images/press/2026-08-26-clip.jpg "caption")
    > The passage you are quoting — a passage, never the whole piece.
    [Read the column →](https://epaper.example/...)
    :::
    Your analysis follows here, in ordinary paragraphs.

    [^1]: The note. It gets an ↑ backlink automatically.

A quote entry instead: front matter `type: quote`, then the quote, then
`<cite>Author</cite>`, then optionally `---` and your commentary.

The URL comes from the filename with the date stripped:
`2026-09-01-some-slug.md` → `/journal/some-slug/`. **Never rename it after
publishing** — the URL is permanent.

## 6. Things not to do

- Never `npm install` — the lockfile is frozen.
- Never edit `src/css/`, `src/_includes/`, `.eleventy.js` without saying
  "design change" (that rule is for the agent, not for you).
- Never delete `reference/colly-v4/` — it is what every number was measured
  against.

## 7. Git

    git log --oneline        # what has happened
    git status               # what is uncommitted
    git diff                 # what changed

Everything is on GitHub, in a PUBLIC repository (made public 2026-09-06 on
Kalyan's "go"): <https://github.com/iksa01/iasips-site>, account iksa01.
GitHub Pages builds and publishes the site on every push to `main`
(.github/workflows/pages.yml, Eleventy on Node 24 from the frozen
lockfile). So: commit, `git push`, and about a minute later it is live.
Check a build with `gh run list --workflow=pages.yml`.

The site answers at <https://iksa01.github.io/iasips-site/> (GitHub's
address) and at <https://iasips.in/> once the registrar's DNS points there:
four A records for the apex → 185.199.108.153, 185.199.109.153,
185.199.110.153, 185.199.111.153, and a CNAME `www` → `iksa01.github.io`.
After DNS resolves, enforce HTTPS: `gh api -X PUT repos/iksa01/iasips-site/pages -F https_enforced=true`.

## 8. If you want a backup right now

    cd ~/Sites && tar czf kalyan-site-backup-$(date +%Y%m%d).tgz \
      --exclude=node_modules --exclude=_site kalyan-site
