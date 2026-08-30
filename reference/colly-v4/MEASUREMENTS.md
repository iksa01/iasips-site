# Measurements taken from colly.com/v4 — 2026-08-30

Base: `div#content_pri p { font-size:15px }`, `body { line-height:22px }`.
All em values below are relative to that 15px paragraph size.

## Colour (screen.css + pixel reads of the tiles)
| thing | measured | where |
|---|---|---|
| paper | `#F3F3EE` CSS fallback; paper-tile.jpg mean **#F3EFEB** (range 239–248) | html background |
| ink | `#333` body/paragraph; `#000` nav labels, sidebar h3 | body, span.label |
| red | **`#BA1820`** (visited `#D0656A`, hover `#999`) | links, drop caps, versals |
| secondary greys | `#666` meta/notes/footnotes, `#999` tertiary/siteinfo | p.meta, ol#footnotes |
| rules | `#DDD` (solid + dashed), `#CCC` (first-child top rules, hr) | borders |
| page-title rule | underline.png = 1px of rgb(102,102,102) at alpha 62/255 ≈ **rgba(102,102,102,.24)**, sitting 13px above the h2's padding box bottom | h2 |
| grid | graph-tile.png 53×43: lines at x 10,21,32,42,52 / y 10,20,31,42 → **one lattice, ≈10.5px pitch**, no minor/major distinction; line colour rgb(197,194,188) @ alpha 34/255 and rgb(187,184,177) @ 36/255 → **rgba(192,189,183,.135)** | body background |
| card fill | card.png rgba(253,251,251,.55); content.png rgba(252,250,250,.69) — panels (DESIGN.md §3 removes these) | li, #content_wrapper |

## Type
| thing | measured | em @15 |
|---|---|---|
| body stack | "Times New Roman", Times, Cambria, serif | — |
| paragraph | 15px / 22px | 1em / 1.467 |
| p.intro | 18px / 26px | 1.2em / 1.444 |
| p.sub | 15px uppercase, no tracking, margin 0 0 44px | 1em |
| page title h2 | 35px / 29px normal weight (article h2 35/40); padding-bottom 28px with rule 13px above bottom | 2.333em |
| journal-index h3 link | 25px / 30px red, 1px #DDD rule below | 1.667em |
| archive year heading li.date-heading | 18px | 1.2em |
| h5 section head | 20px normal, title-case; `h5 span` 11px italic #999 | 1.333em / .733em |
| h6 (biography) | 14px normal #666 | .933em |
| spaced caps (label, sidebar h3, p#footnote, p.paginate) | 12px uppercase, letter-spacing 1px | .8em / .083em |
| nav label versal `span.label span` | 15px | 1.25× label |
| nav strap | inherits li 13px italic; line-height 18px | .867em / 1.2 |
| date h4 | 14px uppercase; ordinal `span` 10px | .933em / .667em |
| p.meta | 13px italic #666 / 19px; 1px #DDD rules above+below; padding 6px 0; margin 0 0 45px | .867em |
| list rows (books etc.) | 15px; padding 5px 0; 1px dashed #DDD below; `li span` 11px italic #999 | 1em / .733em |
| drop cap p.intro:first-letter | 57px, line-height 92%, margin 0 3px 0 0, inherits colour (#333) | 3.17× the 18px intro |
| drop cap .fl/.fs helper | 65px, line-height 62%, red, margin 7px 4px 0 0 | 4.33em |
| footnote marker | sup 10px #666, bracketed `[1]` | .667em |
| ol#footnotes | 11px / 125% #666; backlink `a.scrollto` 9px; 1px #DDD rule below | .733em |
| blockquote | border-left 3px #EEE; padding-left 15px; p 16px #666 / 150% | 1.067em |
| sidebar h3 | 12px uppercase 1px tracking #000 right-aligned | .8em |
| sidebar p | 14px italic #666 right-aligned, dashed #CCC top rule | .933em |
| sidebar li | 13px, dashed #CCC rows | .867em |
| siteinfo | body size, #999, centred, padding-top 125px (space for deranged.png ornament) | — |

## Layout
| thing | measured |
|---|---|
| page | width 946px + padding 30px 17px 10px, margin 20px auto → 980px outer (≈65em) |
| branding | margin 0 0 18px; padding 8px 0 20px; logo 460×86 centred: italic line / tracked caps line / 48px condensed name in red, hover → ink |
| nav cards | 4 × (207px + 10px padding + 1px border) with 10px gaps = 946px; line-height 18px; radius 5px, shadow, card.png fill (all removed by DESIGN.md §5) |
| nav margins | margin 12px 0 30px; padding-bottom 28px |
| content wrapper | padding 40px 0 70px; margin 0 3px 35px 0 |
| content_pri | 516px wide, padding 5px 110px 0 87px, dashed 1px #DDD left border |
| content_sec | 196px wide + 25px right padding, sits LEFT, text right-aligned |
| subnav | four `ul#subnav-a..d` each a row of four cards, same card box; margin-bottom 10px (d: 50px) |
| ext-dests crosshead | image 940×40 centred: "EXTERNAL" ink + "REFERENCES" red + "{ VIEW ALL }" small; margin 20px 0 32px; hover underlines |
| hr | 1px dashed #ccc, margin 35px 0 |
| images | 1px #ddd border, 7px padding, #FFFAFA fill, shadow (padding/fill/shadow removed by DESIGN.md §9) |
| breakpoints | 989px → 468px page; 509px → 306px page; sidebar hidden |
