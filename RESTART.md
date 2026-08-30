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

    cd ~/Sites/kalyan-site
    claude

`CLAUDE.md` loads by itself and points at `WORKLOG.md`, `DESIGN.md`,
`AGENTS.md`. Then open with one line, for example:

> Read WORKLOG.md, DESIGN.md and AGENTS.md, then start the dev server and
> tell me where we left off.

Say **"frozen"** when the design is settled — after that, frozen files only
change when your instruction contains the words **"design change"**.

## 3. The decisions waiting for you

1. **Card pictures.** Which Gosse engraving goes on which of the four cards.
   See `/engravings/`. Proposed: hornbill head / feather / fish / eagle talon.
   Say e.g. *"hornbill for About, feather for Journal, eel for Contact"*.
2. **Colly's animals** are still in `images/engravings/` as `PLACEHOLDER-colly-*`.
   They are his artwork and must go before anything is published.
3. **Every `TODO:`** in the tree is a fact only you can supply — masthead
   lines, the four straps, page taglines, the About text, external
   destinations, colophon, `site.url`, portrait.
4. **Three sample journal entries** are public-domain stand-ins. Delete them
   when your own writing goes in.
5. Open offers: inline the CSS at build time; Press Start 2P instead of
   VT323 for code; image galleries and multi-part series.

## 4. Writing a post

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

    ::: note A note in the margin
    Callout text.
    :::

    ::: tip Worth knowing
    :::

    ::: warning Careful
    :::

    ::: details Fold this away
    Hidden until clicked.
    :::

    ```js/2-3 title="example.js"
    // language / highlighted lines / filename tab — all optional
    ```

    ---

    `---` is the hairline. `***` is the ⁂ ornament.

    ![alt text](/images/photo.jpg "Caption in spaced caps")

    [^1]: The note. It gets an ↑ backlink automatically.

A quote entry instead: front matter `type: quote`, then the quote, then
`<cite>Author</cite>`, then optionally `---` and your commentary.

The URL comes from the filename with the date stripped:
`2026-09-01-some-slug.md` → `/journal/some-slug/`. **Never rename it after
publishing** — the URL is permanent.

## 5. Things not to do

- Never `npm install` — the lockfile is frozen.
- Never edit `src/css/`, `src/_includes/`, `.eleventy.js` without saying
  "design change" (that rule is for the agent, not for you).
- Never delete `reference/colly-v4/` — it is what every number was measured
  against.

## 6. Git

    git log --oneline        # what has happened
    git status               # what is uncommitted
    git diff                 # what changed

Three commits so far, all local on `main`. Nothing is on GitHub; say the word
if you want it pushed to a private repo.

## 7. If you want a backup right now

    cd ~/Sites && tar czf kalyan-site-backup-$(date +%Y%m%d).tgz \
      --exclude=node_modules --exclude=_site kalyan-site
