// .eleventy.js — FROZEN once Kalyan says "frozen" (DESIGN.md §13). The
// markdown-it configuration below is part of the design (DESIGN.md §1, §7).
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownItContainer = require("markdown-it-container");
const { IdAttributePlugin } = require("@11ty/eleventy");
const prismHighlight = require("@11ty/eleventy-plugin-syntaxhighlight/src/markdownSyntaxHighlightOptions")({ preAttributes: { tabindex: 0 } });

module.exports = function (eleventyConfig) {
  /* ---------- Markdown ---------- */
  // typographer: curly quotes, real ellipsis, en/em dashes (DESIGN.md §1).
  const md = markdownIt({ html: true, typographer: true, quotes: "“”‘’" })
    .use(markdownItFootnote);

  // Footnotes (DESIGN.md §7, measured v4 pattern): [n] markers in <sup>,
  // notes in ol#footnotes, each note BEGINS with an "↑" backlink.
  md.renderer.rules.footnote_ref = (tokens, idx, options, env, self) => {
    const id = self.rules.footnote_anchor_name(tokens, idx, options, env, self);
    const caption = self.rules.footnote_caption(tokens, idx, options, env, self);
    let refid = id;
    if (tokens[idx].meta.subId > 0) refid += ":" + tokens[idx].meta.subId;
    return `<sup class="footnote-ref"><a href="#fn${id}" id="fnref${refid}">${caption}</a></sup>`;
  };
  md.renderer.rules.footnote_block_open = () => '<ol id="footnotes">\n';
  md.renderer.rules.footnote_block_close = () => "</ol>\n";
  md.renderer.rules.footnote_open = (tokens, idx, options, env, self) => {
    let id = self.rules.footnote_anchor_name(tokens, idx, options, env, self);
    if (tokens[idx].meta.subId > 0) id += ":" + tokens[idx].meta.subId;
    return `<li id="fn${id}"><a href="#fnref${id}" class="scrollto">↑</a> `;
  };
  md.renderer.rules.footnote_close = () => "</li>\n";
  md.renderer.rules.footnote_anchor = () => "";

  // hr: "---" is the 8em hairline; "***" is the asterism ornament (DESIGN.md §7).
  md.renderer.rules.hr = (tokens, idx) =>
    tokens[idx].markup.startsWith("*") ? '<hr class="asterism">\n' : "<hr>\n";

  // Images (DESIGN.md §9): a paragraph holding only an image becomes a
  // <figure>; the image's title text becomes the <figcaption>.
  md.core.ruler.push("figure", (state) => {
    const t = state.tokens;
    for (let i = 0; i + 2 < t.length; i++) {
      if (t[i].type === "paragraph_open" && t[i + 2].type === "paragraph_close" &&
          t[i + 1].type === "inline" && t[i + 1].children &&
          t[i + 1].children.length === 1 && t[i + 1].children[0].type === "image") {
        t[i].tag = "figure";
        t[i + 2].tag = "figure";
      }
    }
  });
  // Pictures prepared with tools/prepare-image.py have .webp/.avif siblings and an entry in
  // images/manifest.json; those get a <picture> with modern sources and width/height (no layout shift).
  const fs = require("fs");
  const manifestPath = require("path").join(__dirname, "images", "manifest.json");
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
  const defaultImage = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const title = token.attrGet("title");
    if (title) token.attrSet("title", "");
    const attrs = token.attrs.filter(([k]) => k !== "title");
    const saved = token.attrs; token.attrs = attrs;
    if (!token.attrGet("loading")) token.attrSet("loading", "lazy");
    token.attrSet("decoding", "async");
    const src = token.attrGet("src") || "";
    const dims = manifest[src];
    if (dims) { token.attrSet("width", String(dims.w)); token.attrSet("height", String(dims.h)); }
    let img = defaultImage(tokens, idx, options, env, self);
    token.attrs = saved;
    if (dims && /\.jpe?g$/i.test(src)) {
      const base = src.replace(/\.jpe?g$/i, "");
      img = `<picture><source type="image/avif" srcset="${base}.avif"><source type="image/webp" srcset="${base}.webp">${img}</picture>`;
    }
    return title ? `${img}<figcaption>${md.utils.escapeHtml(title)}</figcaption>` : img;
  };
  // Fenced code (DESIGN.md §7): Prism classes at build time, no client JS.
  // Fence info: ```js/2-3 title="file.js"``` → language, highlighted lines, filename tab.
  const esc = md.utils.escapeHtml;
  md.renderer.rules.fence = (tokens, idx) => {
    const t = tokens[idx];
    const info = t.info.trim();
    const [langSpec = "", ...rest] = info.split(/\s+/);
    const attrs = rest.join(" ");
    const title = (/title="([^"]+)"/.exec(attrs) || [])[1];
    let html;
    if (langSpec) {
      html = prismHighlight(t.content, langSpec);
    } else {
      html = `<pre class="language-text" tabindex="0"><code class="language-text">${esc(t.content)}</code></pre>`;
    }
    return title ? `<figure class="code"><figcaption>${esc(title)}</figcaption>${html}</figure>\n` : html + "\n";
  };

  // Callouts and collapsibles (DESIGN.md §7): ::: note|tip|warning [Title] … :::
  // and ::: details Summary … :::  — markdown syntax, no raw HTML in content.
  for (const kind of ["note", "tip", "warning", "key"]) {
    md.use(markdownItContainer, kind, {
      render(tokens, i) {
        const tk = tokens[i];
        if (tk.nesting === 1) {
          const title = tk.info.trim().slice(kind.length).trim() || kind;
          return `<aside class="callout callout-${kind}"><p class="callout-title">${esc(title)}</p>\n`;
        }
        return "</aside>\n";
      },
    });
  }
  // ::: clipping Source line  — a press cutting: the picture and the quoted passage inside, the source in
  // spaced caps above; the analysis follows outside the block (DESIGN.md §7c, 2026-09-03).
  md.use(markdownItContainer, "clipping", {
    render(tokens, i) {
      const tk = tokens[i];
      if (tk.nesting === 1) {
        const source = tk.info.trim().slice("clipping".length).trim();
        return `<div class="clipping">${source ? `<p class="clipping-source">${esc(source)}</p>` : ""}\n`;
      }
      return "</div>\n";
    },
  });
  // ::: plan Title  — a printed planning grid (answer skeletons, structures).
  // A bulleted list inside becomes rows: bold lead-in = the stage label.
  md.use(markdownItContainer, "plan", {
    render(tokens, i) {
      const tk = tokens[i];
      if (tk.nesting === 1) {
        const title = tk.info.trim().slice("plan".length).trim();
        return `<div class="plan">${title ? `<p class="plan-title">${esc(title)}</p>` : ""}\n`;
      }
      return "</div>\n";
    },
  });

  // A run-in sidehead list: the term in spaced caps, the gloss beside it.
  // ::: cases  — for case lists, definitions, anything term-plus-explanation.
  md.use(markdownItContainer, "cases", {
    render(tokens, i) {
      return tokens[i].nesting === 1 ? '<div class="sidehead-list">\n' : "</div>\n";
    },
  });

  // The case register (design change 2026-09-26): src/_data/cases.json holds each case once —
  // name, year, a short holding for tables, the full holding for /cases/. `::: casetable a b +c`
  // prints a Case | Year | What it held table from it; `+slug` sets that row in bold.
  const CASES = require("./src/_data/cases.json").slice().sort((a, b) => a.year - b.year);
  const CASE = Object.fromEntries(CASES.map((c) => [c.slug, c]));
  md.use(markdownItContainer, "casetable", {
    render(tokens, i) {
      const tk = tokens[i];
      if (tk.nesting !== 1) return "";
      const rows = tk.info.trim().split(/\s+/).slice(1).map((s) => {
        const bold = s.startsWith("+"), c = CASE[s.replace(/^\+/, "")];
        if (!c) throw new Error(`casetable: "${s}" is not in src/_data/cases.json`);
        const cell = (x) => (bold ? `<strong>${x}</strong>` : x);
        return `<tr><td>${cell(`<a href="/cases/#${c.slug}">${esc(c.name)}</a>`)}</td><td>${cell(c.year)}</td><td>${cell(md.renderInline(c.short))}</td></tr>`;
      });
      return `<table class="casetable"><thead><tr><th>Case</th><th>Year</th><th>What it held</th></tr></thead><tbody>\n${rows.join("\n")}\n</tbody></table>\n`;
    },
  });

  // ::: quote  — a short quote inside an essay or note (design change 2026-09-26): the rose panel; `<cite>Name</cite>` as its last line moves under the panel.
  // A long passage is not a quote: it stays a plain `>` blockquote, unnumbered.
  md.use(markdownItContainer, "quote", {
    validate: (params) => params.trim() === "quote",
    render(tokens, i) {
      if (tokens[i].nesting !== 1) return "</blockquote>\n";
      return '<blockquote class="quote-panel">\n';
    },
  });

  md.use(markdownItContainer, "details", {
    render(tokens, i) {
      const tk = tokens[i];
      if (tk.nesting === 1) {
        const summary = tk.info.trim().slice("details".length).trim() || "Details";
        return `<details><summary>${esc(summary)}</summary>\n`;
      }
      return "</details>\n";
    },
  });

  // Section ids + anchors on h2/h3 (feeds the table of contents).
  const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  md.core.ruler.push("heading_ids", (state) => {
    const seen = {};
    const t = state.tokens;
    for (let i = 0; i < t.length; i++) {
      if (t[i].type === "heading_open" && (t[i].tag === "h2" || t[i].tag === "h3") && t[i + 1] && t[i + 1].type === "inline") {
        let id = slugify(t[i + 1].content) || "section";
        if (seen[id]) id += "-" + (++seen[id]); else seen[id] = 1;
        t[i].attrSet("id", id);
        // find the matching close and remember the id on it
        for (let j = i + 1; j < t.length; j++) { if (t[j].type === "heading_close") { t[j].meta = { id }; break; } }
      }
    }
  });
  const defaultHeadingClose = md.renderer.rules.heading_close || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
  md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
    const id = tokens[idx].meta && tokens[idx].meta.id;
    const anchor = id ? `<a class="anchor" href="#${id}" aria-label="Link to this section">#</a>` : "";
    return anchor + defaultHeadingClose(tokens, idx, options, env, self);
  };

  eleventyConfig.setLibrary("md", md);

  /* ---------- Plugins / passthrough ---------- */
  eleventyConfig.addPlugin(pluginRss);
  // Every heading gets an id, so any section can be linked to (built into Eleventy 3; design change 2026-09-26).
  // Ids the markdown already set are kept.
  eleventyConfig.addPlugin(IdAttributePlugin);

  /* ---------- Link check (design change 2026-09-26) ----------
     After every build, each link and picture inside the site (/…, #…, https://iasips.in/…) must
     point at a page or file that exists, and a #fragment at an id on that page. A live build
     (the one GitHub runs) stops with the list of broken links, so a broken site is never
     published; the local preview only warns. Outside links are not checked. */
  eleventyConfig.on("eleventy.after", ({ results, runMode }) => {
    const fs = require("fs"), path = require("path");
    // the folder this build actually wrote to, taken from the home page's output path (works with --output)
    const home = results.find((r) => r.url === "/");
    const outDir = home ? path.dirname(path.resolve(home.outputPath)) : "_site";
    const urls = new Set(results.map((r) => r.url));
    const pages = new Map();
    for (const r of results) if (r.url && /\.html$/.test(r.outputPath || ""))
      pages.set(r.url, new Set([...r.content.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
    const exists = (p) => urls.has(p) || fs.existsSync(path.join(outDir, decodeURI(p)))
      || fs.existsSync(path.join(outDir, decodeURI(p), "index.html"));
    const broken = [];
    for (const r of results) {
      if (!/\.html$/.test(r.outputPath || "")) continue;
      for (const [, raw] of r.content.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
        let link = raw.replace(/&amp;/g, "&").replace(/^https:\/\/iasips\.in(?=\/|$)/, "") || "/";
        if (!(link.startsWith("/") || link.startsWith("#")) || link.startsWith("//")) continue;
        const [p, frag] = link.split("#");
        const target = p || r.url;
        if (!exists(target)) { broken.push(`${r.url} → ${raw} (no such page)`); continue; }
        if (frag && pages.has(target) && !pages.get(target).has(decodeURIComponent(frag)))
          broken.push(`${r.url} → ${raw} (no #${frag} on that page)`);
      }
    }
    if (!broken.length) return;
    const msg = `Link check: ${broken.length} broken link(s):\n  ` + broken.join("\n  ");
    if (runMode === "build") throw new Error(msg);
    console.warn(msg);
  });
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/fonts": "fonts", "images": "images" });
  eleventyConfig.setServerOptions({ showAllHosts: false });

  /* ---------- Drafts and scheduled entries (design change 2026-09-26) ----------
     `draft: true` keeps an entry off the live site; a date in the future holds
     it back until that day (the Pages workflow rebuilds every morning). Both
     still show on the local preview (npx @11ty/eleventy --serve). */
  eleventyConfig.addPreprocessor("drafts", "md", (data) => {
    if (process.env.ELEVENTY_RUN_MODE !== "build") return;
    if (data.draft) return false;
    if (data.page && data.page.inputPath.includes("/journal/") && data.date && new Date(data.date) > new Date()) return false;
  });

  /* ---------- The stylesheet, inlined (design change 2026-09-26) ----------
     Each page carries screen.css in its own <style>, minified, so it arrives
     in one piece: no second request, no wait on GitHub's 10-minute cache.
     src/css/screen.css stays the one source; /css/screen.css is still copied. */
  const cssPath = require("path").join(__dirname, "src", "css", "screen.css");
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addShortcode("inlineCss", () =>
    require("fs").readFileSync(cssPath, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{};,>])\s*/g, "$1")
      .replace(/;}/g, "}")
      .trim());

  eleventyConfig.addTransform("quotes", function (html) {
    const out = this.page.outputPath || "";
    if (!out.endsWith(".html")) return html;
    // a `::: quote` ends with <p><cite>…</cite></p>: lift it out to sit under the panel, as a quote entry's does
    html = html.replace(/(<blockquote class="quote-panel">(?:(?!<\/blockquote>)[\s\S])*?)<p><cite>((?:(?!<\/blockquote>)[\s\S])*?)<\/cite><\/p>\s*<\/blockquote>/g,
      '$1</blockquote>\n<p class="quote-who"><cite>$2</cite></p>');
    return html;
  });

  /* ---------- Collections ---------- */
  eleventyConfig.addCollection("journal", (api) =>
    api.getFilteredByGlob("content/journal/**/*.md").sort((a, b) => b.date - a.date));

  /* ---------- Filters ---------- */
  const MONTHS = ["January","February","March","April","May","June","July",
                  "August","September","October","November","December"];
  const ordinal = (d) => {
    if (d % 100 >= 11 && d % 100 <= 13) return "th";
    return ["th","st","nd","rd"][d % 10 > 3 ? 0 : d % 10];
  };
  // "17<span class="ord">th</span> June 2013" — v4 h4 date pattern.
  eleventyConfig.addFilter("dateLong", (date) => {
    const d = new Date(date);
    return `${d.getUTCDate()}<span class="ord">${ordinal(d.getUTCDate())}</span> ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("dateISO", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("year", (date) => new Date(date).getUTCFullYear());
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
  // Cases a piece of HTML mentions, in date order, matched by the register's `match` names.
  eleventyConfig.addFilter("casesIn", (html) => {
    const text = String(html || "").replace(/<[^>]+>/g, " ");
    return CASES.filter((c) => c.match.some((m) => text.includes(m)));
  });
  eleventyConfig.addFilter("citing", (posts, slug) =>
    posts.filter((p) => CASE[slug].match.some((m) => String(p.templateContent || "").replace(/<[^>]+>/g, " ").includes(m))));
  eleventyConfig.addGlobalData("casesByYear", CASES);
  // One line of markdown, e.g. a case's holding on /cases/.
  eleventyConfig.addFilter("mdInline", (s) => md.renderInline(String(s || "")));

  // Nav-card versals (DESIGN.md §5): wrap the initial capital of each word in
  // its own span. `kern` is an optional {wordIndex: className} map, e.g.
  // {"0": "kern-a"} for letters needing optical correction.
  eleventyConfig.addFilter("versals", (label, kern) => {
    const k = kern || {};
    return String(label).split(" ").map((w, i) => {
      if (!w) return w;
      const cls = k[i] ? ` class="${k[i]}"` : "";
      return `<span${cls}>${md.utils.escapeHtml(w[0])}</span>${md.utils.escapeHtml(w.slice(1))}`;
    }).join(" ");
  });

  // Table of contents from rendered HTML: [{id, text, level, children}] for h2/h3.
  eleventyConfig.addFilter("toc", (html) => {
    const out = [];
    const re = /<h([23]) id="([^"]+)">([\s\S]*?)<a class="anchor"/g;
    let m;
    while ((m = re.exec(html || ""))) {
      const item = { level: +m[1], id: m[2], text: m[3].replace(/<[^>]+>/g, "").trim(), children: [] };
      if (item.level === 2 || !out.length) out.push(item); else out[out.length - 1].children.push(item);
    }
    return out;
  });
  // Reading time in whole minutes at 200 wpm.
  eleventyConfig.addFilter("readingTime", (html) => {
    const words = (html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  // Journal index blurb (v4 p.blurb): the entry's first paragraph.
  // On the journal index and category pages an entry is shown without its footnotes: send each [n]
  // marker to the note on the entry's own page, drop the marker's id and any footnote list (design change 2026-09-26).
  eleventyConfig.addFilter("listingRefs", (html, url) => String(html || "")
    .replace(/<ol id="footnotes">[\s\S]*?<\/ol>\s*/g, "")
    .replace(/<a href="#(fn[^"]*)" id="fnref[^"]*">/g, `<a href="${url}#$1">`));
  eleventyConfig.addFilter("firstParagraph", (html) => {
    const m = /<p>([\s\S]*?)<\/p>/.exec(html || "");
    return m ? m[1] : "";
  });

  // Quote entries (DESIGN.md §8): everything before the first <hr> is the
  // quote; anything after it is permalink-only commentary.
  // The closing <p><cite>…</cite></p> is lifted out as `who`, so the name can
  // sit under the card (design change 2026-09-26).
  eleventyConfig.addFilter("quoteParts", (html) => {
    const m = /<hr[^>]*>/.exec(html || "");
    let quote = m ? html.slice(0, m.index) : (html || "");
    const commentary = m ? html.slice(m.index + m[0].length) : "";
    let who = "";
    const c = /<p>\s*(<cite>[\s\S]*?<\/cite>)\s*<\/p>\s*$/.exec(quote);
    if (c) { who = c[1]; quote = quote.slice(0, c.index); }
    return { quote, who, commentary };
  });

  // About page: lift ol#footnotes out of the body so it can follow the
  // data-driven sections (v4 puts the notes last).
  eleventyConfig.addFilter("splitFootnotes", (html) => {
    const i = (html || "").indexOf('<ol id="footnotes">');
    if (i < 0) return { body: html || "", notes: "" };
    return { body: html.slice(0, i), notes: html.slice(i) };
  });

  // Archive: [{year, items}] newest first.
  eleventyConfig.addFilter("monthName", (date) => MONTHS[new Date(date).getUTCMonth()]);
  // v4 archive: entries grouped under "December 2014"-style headings.
  eleventyConfig.addFilter("byMonth", (items) => {
    const out = [];
    for (const it of items) {
      const d = new Date(it.date), key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
      let g = out.find((x) => x.key === key);
      if (!g) { g = { key, year: d.getUTCFullYear(), month: MONTHS[d.getUTCMonth()], items: [] }; out.push(g); }
      g.items.push(it);
    }
    return out;
  });
  // Every tag in use, alphabetical, for the archive sidebar.
  eleventyConfig.addFilter("tagList", (items) => {
    const s = new Set();
    for (const it of items) for (const t of it.data.tags || []) s.add(t);
    return [...s].sort((a, b) => a.localeCompare(b));
  });
  eleventyConfig.addFilter("byYear", (items) => {
    const out = [];
    for (const it of items) {
      const y = new Date(it.date).getUTCFullYear();
      let g = out.find((x) => x.year === y);
      if (!g) { g = { year: y, items: [] }; out.push(g); }
      g.items.push(it);
    }
    return out;
  });

  return {
    dir: { input: "content", includes: "../src/_includes", data: "../src/_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"],
  };
};
