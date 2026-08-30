// Directory data for journal entries (frozen). fileSlug drops a leading
// YYYY-MM-DD- from the filename, so 2026-08-30-x.md publishes at /journal/x/.
module.exports = {
  layout: "layouts/entry.njk",
  permalink: (data) => `/journal/${data.page.fileSlug}/`,
};
