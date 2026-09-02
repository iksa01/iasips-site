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
| `/journal/sample-quote/` | a quote entry |
| `/about/` `/archive/` `/external/` `/contact/` | the rest |
| `/engravings/` | working page: the Gosse card pictures |
| `/modern/` | working page: colour options and printer's marks |

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
- **Card engravings chosen**: Alexandrine (About), Coly (Journal), Emu
  (Archive), Falcon beak (Contact), from Gosse's *Natural History*, public
  domain. The eight external cards use the rest of that pool.
- **Callouts** carry four muted ink hues: slate (note), moss (tip), ochre
  (key), red (warning). The only exception to the one-accent rule.
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
- An **answer skeleton is not code** — it uses `::: plan`, never a code fence.
- The "2026 layout" experiment (margin sidenotes, fluid type) was built and
  then dropped on your instruction. It is recoverable from commit `98efd0d`.

## 4. The decisions waiting for you

1. **Every `TODO:`** in the tree is a fact only you can supply — masthead
   lines, the four card straps, page taglines, the About text, external
   destinations, the colophon, `site.url`, the portrait. About twelve lines.
   Say *"draft them"* and options get put in front of you to approve.
2. **Colly's animals** remain in `images/engravings/` as `PLACEHOLDER-colly-*`.
   No real page references them any more, but they are his artwork and
   should be deleted before publishing.
3. **The sample journal entries** are specimens, not your writing. The essay
   is a UPSC piece on the Basic Structure Doctrine used to exercise every
   element; the quote and note entries are public-domain stand-ins.
4. **Working pages** to delete once decided: `/engravings/` and `/modern/`.
5. Open offers: inline the CSS at build time; Press Start 2P instead of
   VT323 for code; image pipeline (AVIF/WebP/srcset at build time); the
   callouts sit narrower than the tables, which leaves a ragged right edge.
6. Nothing is pushed anywhere. Say the word for a private GitHub repo.

## 5. Writing a post

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

    ::: note Context, definition, where it sits      (slate)
    ::: tip Method, how to write it                   (moss)
    ::: key The thing to remember                     (ochre)
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

All commits are local. The 2026-09-02 post-page work sits on the branch
`agent/post-page-colly` (AGENTS.md §7); to fold it into `main` once you are
happy:

    git checkout main && git merge agent/post-page-colly

Nothing is on GitHub; say the word if you want it pushed to a private repo.

## 8. If you want a backup right now

    cd ~/Sites && tar czf kalyan-site-backup-$(date +%Y%m%d).tgz \
      --exclude=node_modules --exclude=_site kalyan-site
