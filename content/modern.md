---
title: "What is possible now"
sub: "Colly v4 was built in 2010 and could not do these. Eleventy 3 and 2026 browsers can — all of it still at build time, with no JavaScript on the page. Working page: pick what you want and I will fold it into the design."
layout: layouts/page.njk
permalink: /modern/
bodyClass: modern
eleventyExcludeFromCollections: true
---
## Coloured boxes

They already exist, drawn in v4's own palette — paper fill, hairline, one rule down the left. Grey for a note, warm for a tip, red for a warning.

::: note As it stands today
The only hues in the whole site are ink, three greys and Colly's red. Nothing else, by your spec.
:::

::: tip A tip
The warmer rule is the same red-orange as the subnav straps in v4.
:::

::: warning A warning
Red is reserved: links, versals, the wordmark, footnote markers, the quote rule, and this.
:::

If you want boxes that read as *colour*, that is a design change and it costs the one-hue rule. Below is what a second and third hue would look like, kept desaturated so they still sit on printed paper rather than on a screen.

::: colour A muted ink-blue
Reads as a different voice without shouting. This is the most I would add.
:::

::: colourb A muted moss
A third hue starts to feel like a documentation site rather than a journal.
:::

## Marks instead of icons

Icon fonts and SVG icon sets are forbidden by §12 — and they would look wrong here anyway. The period-correct answer is the **printer's mark**: characters that already exist in the body serif, so they cost nothing and cannot go out of style.

::: mark ☞ The manicule
The pointing hand. A printer's mark for "look here" since the twelfth century, and exactly the register of a printed miscellany.
:::

- ☞ manicule — look here
- ❦ ❧ fleuron — a section break with warmth
- ⁂ asterism — the ornament already in use between sections
- ¶ § pilcrow and section — for cross-references
- † ‡ dagger and double dagger — for asides
- ☙ reversed fleuron — for a closing note

## Real images

This is the biggest thing 2010 could not do. Eleventy's image pipeline can take one photograph you drop in and produce AVIF, WebP and JPEG at several widths, write the `srcset`, set width and height so the page never jumps, and cache the results — all during the build. A phone downloads a quarter of what a laptop does. Nothing changes in how you write a post: still `![alt](/images/thing.jpg "Caption")`.

## Other things now possible, all without JavaScript

- **`:has()`** — the parent selector. Already used here to set the author line inside a quote panel.
- **Container queries** — a card can respond to *its own* width, not the window's. This would let the nav cards behave properly instead of relying on the two v4 breakpoints.
- **Subgrid** — align the strap and label across all four cards on a shared baseline, however long the words.
- **`text-wrap: balance`** — headlines break evenly instead of leaving one orphan word. Free, invisible, better.
- **Native nesting and cascade layers** — a tidier stylesheet with no build step.
- **View transitions** — page-to-page fades. Possible; against §10, and I would not.
- **Fluid type with `clamp()`** — type that scales between breakpoints rather than jumping.

## What I would actually take

Marks (free, in register), the image pipeline (real gain), `text-wrap: balance` and `clamp()` (invisible improvements). I would leave the extra hues and the view transitions alone — they are the parts that would make it stop looking like Colly's shelf and start looking like a docs site.
