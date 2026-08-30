---
title: "TODO: sample essay — delete once real entries exist"
sub: "A layout proof using public-domain text; not Kalyan’s writing"
date: 2026-08-30
tags: [Sample]
dropcap: true
toc: true
---
This entry exists only to prove the type. Every sentence below that is not a TODO is quoted from William Strunk Jr., *The Elements of Style* (1918), which is in the public domain[^1] — it stands in for Kalyan’s prose until he supplies his own.

Omit needless words. Vigorous writing is concise. A sentence should contain no unnecessary words, a paragraph no unnecessary sentences, for the same reason that a drawing should have no unnecessary lines and a machine no unnecessary parts. This requires not that the writer make all his sentences short, or that he avoid all detail and treat his subjects only in outline, but that every word tell.

Many expressions in common use violate this principle -- "the question as to whether" for "whether", "there is no doubt but that" for "no doubt", "used for fuel purposes" for "used for fuel"... The house typography turns those straight quotes into curly ones, the three dots into an ellipsis, and a double hyphen into a dash[^2].

## Put statements in positive form

Make definite assertions. Avoid tame, colourless, hesitating, non-committal language. Use the word *not* as a means of denial or in antithesis, never as a means of evasion.

> As a rule, begin each paragraph with a topic sentence; end it in conformity with the beginning.
>
> <cite>Strunk, Rule 9</cite>

### Rules of usage

- Form the possessive singular of nouns by adding ’s.
- In a series of three or more terms with a single conjunction, use a comma after each term except the last.
- Enclose parenthetic expressions between commas.

1. Choose a suitable design and hold to it.
2. Make the paragraph the unit of composition.
3. Use the active voice.

---

Code is set in a fenced block and coloured at build time -- no script ships to the page:

```js/2-3 title=".eleventy.js"
// Wrap the initial capital of each word in its own span (the versal effect).
function versals(label, kern = {}) {
  return label.split(" ").map((word, i) => {
    const cls = kern[i] ? ` class="${kern[i]}"` : "";
    return `<span${cls}>${word[0]}</span>${word.slice(1)}`;
  }).join(" ");
}
```

```css
li.card { width: 207px; padding: 10px; border: 1px solid #DDD; border-radius: 5px; }
li.card.current, li.card:hover { background-color: #fff; opacity: 1; }
```

Inline code such as `dropcap: true` gets the same grey fill. Keys are set as <kbd>⌘</kbd> <kbd>K</kbd>, and an <abbr title="Static site generator">SSG</abbr> carries its expansion on hover.

## Notes, warnings and folded detail

::: note A note in the margin
Callouts take the card treatment: paper fill, hairline border, a rule on the left. This one is a plain note.
:::

::: tip Worth knowing
A tip gets the warmer rule. Text inside is set a size smaller than the running text.
:::

::: warning Mind the lockfile
A warning takes the red rule -- the only red rule besides the quote panel.
:::

::: details What a folded section looks like
This is a native `<details>` element -- no script. It opens on click and prints closed.

Anything can sit inside it: lists, code, another paragraph.
:::

Below the hairline: a table with rules above, below and under the header only.

| Rule | Chapter | Pages |
|---|---|---|
| Omit needless words | II | 24–26 |
| Use the active voice | II | 18–20 |
| Put statements in positive form | II | 20–22 |

***

TODO: an image goes in the markdown as `![alt](/images/name.jpg "Caption text")` — the title becomes the spaced-caps caption under the picture. No image is committed yet.

[^1]: First published 1918 by Strunk privately at Cornell; the 1920 Harcourt edition is on Project Gutenberg.
[^2]: Curly quotes, ellipsis and dashes are set by markdown-it’s typographer, which DESIGN.md §1 makes part of the frozen design.
