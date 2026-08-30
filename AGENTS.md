# AGENTS.md — Rules for AI Maintainers

Audience: any AI CLI operating in this repository (Grok Build, Claude
Code, or successors). These rules are absolute. If a task cannot be
completed within them, stop, explain why, and change nothing.

## 1. Write scope

You may edit ONLY:
- content/**/*.md
- src/_data/talks.json, src/_data/books.json, src/_data/interviews.json
- drafts/**

Everything else is read-only. Explicitly frozen: src/css/**,
src/fonts/**, src/_includes/**, src/_data/site.json, .eleventy.js,
content/*.njk, content/journal/journal.11tydata.js, images/engravings/**,
package.json, package-lock.json, .nvmrc, reference/**, DESIGN.md,
AGENTS.md, CLAUDE.md, _redirects, and any CI configuration.

Frozen files may be touched only when the human instruction in this
session literally contains the phrase "design change". Absent that
phrase, a task that seems to require a frozen file is a task you must
decline and report.

## 2. URLs are permanent

- Never rename, move, or delete a file that exists on main.
- Never change a slug, permalink, or date-in-path of published content.
- Corrections and updates happen inside the existing file at the
  existing URL.
- New slugs: lowercase, hyphen-separated, derived from the title once,
  then never regenerated even if the title later changes. Journal
  entries live at content/journal/<slug>.md and publish at /journal/<slug>/.

## 3. Voice and truth

- Publish only text supplied by Kalyan. Your role is transcription,
  cleanup, and structuring per instruction — not authorship.
- Never invent biography, opinions, quotes, dates, talk details, book
  descriptions, or interview answers. A missing fact becomes a visible
  "TODO:" line and a note in your report, never a plausible guess.
- Default editing mode is reviewer, not rewriter: preserve wording,
  shorthand, and structure; flag rather than replace.
- House typography: curly quotes, real ellipsis, en dashes for ranges.
  No emoji anywhere.

## 4. Markdown limits

- No raw HTML in content except <cite>, <abbr>, <sup>, <kbd>, and the
  footnote markup the build already produces.
- No inline styles, <style>, <script>, <iframe>, or embeds of any kind.
- No image hotlinks; images are committed to /images and referenced
  relatively. Their appearance is the stylesheet's job — no width/align
  hacks in content. A caption is the image's markdown title:
  `![alt](/images/x.jpg "Caption")`.
- Front matter keys are fixed: title, sub (one-line tagline; doubles as
  the index summary), date (YYYY-MM-DD), tags, permalink, dropcap, toc
  (true = table of contents from ## and ### heads), type (only permitted
  value: "quote"; omit for ordinary posts). Introducing
  any new key or value is a design change.
- Quote entries (type: quote): the quote as plain paragraphs, then
  `<cite>Author</cite>` on its own line, then optionally `---` followed
  by commentary. See DESIGN.md §8.
- `---` is the hairline; `***` is the asterism. Footnotes are `[^n]`.
- Callouts: `::: note Title` / `::: tip Title` / `::: key Title` /
  `::: warning Title` … `:::` — slate, moss, ochre, red respectively.
  Collapsible: `::: details Summary line` … `:::`.
- Code fences: ```js/2-3 title="file.js" — language, highlighted lines,
  filename tab; all optional. Keep lines short enough to fit the column;
  a code block must never scroll sideways.
- Term lists: `::: cases` around a bulleted list whose items begin with a
  bold term renders each term as a spaced-caps sidehead above its gloss.

## 5. Data files (talks/books/interviews JSON)

- Append entries; never reorder, re-indent, or reformat existing ones.
- Match the key set and date format (YYYY-MM-DD) of existing entries
  exactly. New keys are a design change.
- After any edit, the file must parse as JSON and the site must build.

## 6. Dependencies and build

- Never run npm install, npm update, npm audit fix, or add any package.
  The lockfile is frozen.
- If tooling reports a vulnerability or deprecation, report it to
  Kalyan; take no action.
- Before every commit: `npx @11ty/eleventy` must exit 0.

## 7. Git protocol

- Work only on branches named agent/<short-task-name>.
- Never push to main, never force-push, never rewrite history, never
  merge your own PRs.
- Before opening a PR, run `git diff --name-only main` and verify every
  listed path is inside your write scope (§1). If any path is outside
  it, abort and reset.
- Commit messages: one line stating what changed and which files.

## 8. Absolute prohibitions

- No CSS, anywhere, in any form — including inline styles and style
  attributes in content.
- No JavaScript, anywhere.
- No analytics, SEO plugins, meta-tag "improvements", redirects, or
  third-party services.
- No redesign suggestions, style tweaks, or "modernization" — not in
  commits, not as drive-by fixes, not as comments in content files.
- No creation of new sections, page types, or templates.

## 9. Design change protocol

When (and only when) the human instruction contains "design change":
1. First edit DESIGN.md to record the new rule or value.
2. Then implement, touching the minimum set of frozen files.
3. Ship both in one PR for Kalyan's review. A design change without a
   DESIGN.md diff in the same PR is invalid.

## 10. When uncertain

Uncertainty is not permission. If a rule's application is ambiguous, do
the smaller thing or do nothing, and state the ambiguity in your report.
