// .eleventy.js — FROZEN once Kalyan says "frozen" (DESIGN.md §13). The
// markdown-it configuration below is part of the design (DESIGN.md §1, §7).
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownItContainer = require("markdown-it-container");
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
  const defaultImage = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const title = token.attrGet("title");
    if (title) token.attrSet("title", "");
    const attrs = token.attrs.filter(([k]) => k !== "title");
    const saved = token.attrs; token.attrs = attrs;
    if (!token.attrGet("loading")) token.attrSet("loading", "lazy");
    const img = defaultImage(tokens, idx, options, env, self);
    token.attrs = saved;
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
  for (const kind of ["note", "tip", "warning", "key", "colour", "colourb", "mark"]) {
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
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/fonts": "fonts", "images": "images" });
  eleventyConfig.setServerOptions({ showAllHosts: false });

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
  eleventyConfig.addFilter("firstParagraph", (html) => {
    const m = /<p>([\s\S]*?)<\/p>/.exec(html || "");
    return m ? m[1] : "";
  });

  // Quote entries (DESIGN.md §8): everything before the first <hr> is the
  // quote; anything after it is permalink-only commentary.
  eleventyConfig.addFilter("quoteParts", (html) => {
    const m = /<hr[^>]*>/.exec(html || "");
    if (!m) return { quote: html || "", commentary: "" };
    return { quote: html.slice(0, m.index), commentary: html.slice(m.index + m[0].length) };
  });

  // About page: lift ol#footnotes out of the body so it can follow the
  // data-driven sections (v4 puts the notes last).
  eleventyConfig.addFilter("splitFootnotes", (html) => {
    const i = (html || "").indexOf('<ol id="footnotes">');
    if (i < 0) return { body: html || "", notes: "" };
    return { body: html.slice(0, i), notes: html.slice(i) };
  });

  // Archive: [{year, items}] newest first.
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
