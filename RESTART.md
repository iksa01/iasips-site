# RESTART — how to pick this up again

Everything lives in one folder. Nothing is in the cloud, nothing is pushed.

    ~/Sites/kalyan-site

## 1. See the site

    cd ~/Sites/kalyan-site
    npx @11ty/eleventy --serve

It prints the address — usually <http://localhost:8080/>. Pages:

| page | what it is |
|---|---|
| `/` | home: masthead, four cards, external references, colophon |
| `/journal/` | the journal index — the page you called "beautiful" |
| `/journal/sample-essay/` | the 2026 post body: callouts, code, TOC, footnotes |
| `/journal/sample-quote/` | a quote entry |
| `/about/` `/archive/` `/external/` `/contact/` | the rest |
| `/engravings/` | working page: the Gosse card pictures to choose from |

Stop the server with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

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
- **Tables** reclaim the 110px right gutter; prose lists have hanging
  en-dashes and no rules; leading is 24px; section heads sit 42px clear.
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

Nine commits so far, all local on `main`. Nothing is on GitHub; say the word
if you want it pushed to a private repo.

## 8. If you want a backup right now

    cd ~/Sites && tar czf kalyan-site-backup-$(date +%Y%m%d).tgz \
      --exclude=node_modules --exclude=_site kalyan-site
