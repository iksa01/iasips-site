# WORKLOG — state of the site, for whoever opens it next

## 2026-08-30 — first build (Claude Code, Fable 5)

- Built from Kalyan's two spec files (now DESIGN.md / AGENTS.md).
- Round 1: a "clean" reinterpretation of Colly v4. Kalyan: "not even close
  by 1000 miles". Discarded.
- Round 2: colly.com/v4 transcribed whole (reference/colly-v4/). Kalyan:
  journal home "beautiful", "closest thing".
- Round 3 — "Colly rebuilt in 2026": shell stays v4; the post body gains
  callouts, details, code tabs + line marks (VT323), sidebar TOC, anchors,
  kbd/abbr, reading time, older/newer, print. DESIGN.md §7b.

## Status
- NOT frozen. Kalyan has not said "frozen". Until then CSS/layout edits
  are allowed on his instruction.
- Engravings in images/engravings/ are Colly's — placeholders, must be
  replaced (README there).
- Every "TODO:" is a fact only Kalyan can supply.
- Open offers: inline the CSS at build time; Press Start 2P as an
  alternative code face; galleries / series grouping for posts.

## How to resume
    cd ~/Sites/kalyan-site && claude      # CLAUDE.md loads; read DESIGN.md, AGENTS.md, this file
    npx @11ty/eleventy --serve            # http://localhost:8080/ (or the port it prints)
