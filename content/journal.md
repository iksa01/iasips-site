---
title: "The Journal"
sub: "TODO: one witty tagline line (v4 form: “Notes from the field”)"
layout: layouts/journal.njk
templateEngineOverride: njk
pagination:
  data: collections.journal
  size: 20
  alias: pageEntries
permalink: "/journal/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
eleventyComputed:
  title: "{% if pagination.pageNumber > 0 %}The Journal, page {{ pagination.pageNumber + 1 }}{% else %}The Journal{% endif %}"
---
