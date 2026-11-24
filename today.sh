#!/bin/bash
# Start today's post, Seth Godin style.   Usage:  ./today.sh "The title"
# Makes content/journal/YYYY-MM-DD-the-title.md as a note in Notes, ready to write in; date: carries the time (DESIGN §10).
# Change `type: note` to nothing for a long essay, or `type: quote` for a quote (HANDBOOK §2).
cd "$(dirname "$0")" || exit 1
title="$*"
if [ -z "$title" ]; then echo 'Usage: ./today.sh "The title"'; exit 1; fi
day=$(date +%Y-%m-%d); now=$(date "+%Y-%m-%d %H:%M:%S")
slug=$(printf '%s' "$title" | tr '[:upper:]' '[:lower:]' | sed -E "s/[’']//g; s/[^a-z0-9]+/-/g; s/^-+|-+$//g")
file="content/journal/$day-$slug.md"
if [ -e "$file" ]; then echo "Already there: $file"; exit 1; fi
cat > "$file" <<POST
---
title: "$title"
date: $now
tags: [Notes]
type: note
---
POST
echo "Written: $file"
echo "Address: /journal/$slug/"
