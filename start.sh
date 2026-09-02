#!/bin/bash
# Start the site. Usage:  ./start.sh
cd "$(dirname "$0")" || exit 1
PORT=8080
echo "Building and serving on http://localhost:$PORT/"
echo "Press Ctrl+C to stop."
echo
sleep 1 && open "http://localhost:$PORT/" &
exec npx @11ty/eleventy --serve --port "$PORT"
