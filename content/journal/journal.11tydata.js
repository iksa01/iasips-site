// Directory data for journal entries (frozen). fileSlug drops a leading
// YYYY-MM-DD- from the filename, so 2026-08-30-x.md publishes at /journal/x/.
//
// Search and previews (design change 2026-11-24, DESIGN §4a): every entry gets its own
// description, made from the entry itself when `sub:` does not describe it, plus the
// facts the head's structured data needs (first picture, a quote's words and speaker,
// a link's author). Nothing here is printed on the page.

const LIMIT = 155;

// Markdown (and any HTML a preprocessor left) → one line of plain text.
const plain = (s) => String(s || "")
  .replace(/<[^>]+>/g, " ")
  .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")          // pictures
  .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")        // [words](link) → words
  .replace(/\[\^[^\]]*\]/g, "")                    // footnote markers
  .replace(/(\*\*|__|\*|_|`)/g, "")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
  .replace(/"([^"]*)"/g, "“$1”").replace(/'/g, "’")
  .replace(/\s+/g, " ").trim();

const cut = (s, n = LIMIT) => {
  if (s.length <= n) return s;
  const t = s.slice(0, n - 1);
  return t.slice(0, t.lastIndexOf(" ")).replace(/[\s,;:.–—-]+$/, "") + "…";
};

// Words in quotation marks, cut to fit n characters with the closing mark kept; words that
// already open with their own quotation marks (a dialogue) are not wrapped again.
const wrap = (w, n) => {
  if (/^[“"]/.test(w)) return cut(w, n);
  return "“" + cut(w, n - 2) + "”";
};

// The body split into blocks; card fences and footnote definitions set aside.
const blocks = (raw) => String(raw || "")
  .replace(/^:::[\s\S]*?^:::\s*$/gm, "")
  .replace(/^\[\^[^\]]+\]:.*$/gm, "")
  .split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

const quoteParts = (raw) => {
  const body = String(raw || "").split(/^\s*---\s*$/m)[0];
  const c = /<cite>([\s\S]*?)<\/cite>/.exec(body);
  const words = plain(c ? body.slice(0, c.index) : body);
  const who = c ? plain(c[1]).split(/,\s/)[0] : "";
  return { words, who };
};

const passage = (raw) => plain(blocks(raw).filter((b) => b.startsWith(">")).join(" ").replace(/^\s*>\s?/gm, ""));
const firstParagraph = (raw) => {
  const b = blocks(raw).find((x) => !/^(#|>|!\[|\||```|<|-\s|\*\s|\d+\.\s|\*\*\*|---)/.test(x));
  return plain(b || "");
};

module.exports = {
  layout: "layouts/entry.njk",
  permalink: (data) => `/journal/${data.page.fileSlug}/`,
  eleventyComputed: {
    linkAuthor: (data) => {
      if (data.type !== "link") return "";
      const m = /^by\s+([^·|,]+)/i.exec(String(data.sub || ""));
      return m ? m[1].trim() : "";
    },
    quoteWords: (data) => (data.type === "quote" ? quoteParts(data.page.rawInput).words : ""),
    quoteBy: (data) => (data.type === "quote" ? quoteParts(data.page.rawInput).who : ""),
    // The entry's first picture, for link previews and the structured data.
    firstImage: (data) => {
      const raw = String(data.page.rawInput || "");
      const m = /!\[([^\]]*)\]\((\/images\/[^)\s]+)/.exec(raw) || /^(?:still|picture|cover):\s*(\/images\/\S+)/m.exec(raw);
      if (!m) return null;
      return m.length === 3 ? { src: m[2], alt: plain(m[1]) } : { src: m[1], alt: "" };
    },
    description: (data) => {
      const raw = data.page.rawInput;
      if (data.type === "quote") {
        const q = quoteParts(raw);
        const tail = q.who ? ` — ${q.who}` : "";
        return wrap(q.words, LIMIT - tail.length) + tail;
      }
      if (data.type === "link") {
        const m = /^by\s+([^·|,]+)/i.exec(String(data.sub || ""));
        const head = `${m ? m[1].trim() + ", " : ""}“${data.title}”: `;
        const p = passage(raw);
        return p ? head + wrap(p, LIMIT - head.length) : cut(head.replace(/: $/, ""));
      }
      if (data.sub) return plain(data.sub);
      return cut(firstParagraph(raw)) || "";
    },
  },
};
