# How to start — Kalyan's note

    MY BLOG  —  iasips.in
    Source folder on this Mac:  ~/Sites/kalyan-site
    On GitHub:                  github.com/iksa01/iasips-site
    Live site:                  https://iasips.in

    TO START WORKING (any new Terminal window):
      cd ~/Sites/kalyan-site
      claude
      then type:   Read PROMPT.txt and follow it.

    Claude reads the folder's notes by itself and reports where we left
    off. It knows the rules, the design, and how to publish.

    TO POST SOMETHING, say it plainly:
      "New quote for the journal:"  + the quote and who said it
      "New note:"                   + a paragraph of your own thought
      "Press post:"                 + the clipping file, the paper and date,
                                      and your analysis
      "Listening post:"             + the link to the talk or podcast + notes
      "Book excerpt:"               + the passage, the book, and your comment
      "New essay:"                  + title and text
    Claude files it, builds, checks, and pushes. Live in about a minute.

    TO SEE IT BEFORE IT GOES LIVE (optional):
      second Terminal:  cd ~/Sites/kalyan-site && ./start.sh
      opens http://localhost:8080 — tell Claude "the dev server is running".

    TO CHANGE THE LOOK: put the words "design change" in the instruction.

    OTHER ASKS: "Where are we?"  "What is waiting on me?"
      "Delete the specimens."  "Show me the last build."  "Push."
      "Frozen." (locks the design)

    RULES CLAUDE FOLLOWS: only your words get published; blanks become
    TODO; no scripts, no embeds, no renaming a published post.
    The full list of what the blog accepts is HANDBOOK.md.

## On a Windows machine

One-time: install Git, Node 24, Python 3, GitHub CLI (`gh`) and Claude
Code; `gh auth login`; `gh repo clone iksa01/iasips-site`; inside the
folder run `npm ci` once (installs exactly what the lockfile records — not
the forbidden `npm install`); `pip install pillow` for pictures.

Then the same three lines, with your folder path:

    cd C:\path\to\iasips-site
    claude
    Read PROMPT.txt and follow it.

Differences: preview with `npx @11ty/eleventy --serve` (start.sh is a Mac
script); `python` instead of `python3`. Or install WSL and work inside it
with no differences at all.

Two machines: begin every session with `git pull`, end it with `git push`,
so the copies never drift. Claude does both when asked.
