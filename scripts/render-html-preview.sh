#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $(basename "$0") <html-file> [output-png]" >&2
  exit 1
fi

HTML_FILE="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
OUTPUT_FILE="${2:-${HTML_FILE%.html}.png}"

npx --yes playwright screenshot \
  --browser chromium \
  --channel chrome \
  --device="Desktop Chrome" \
  --full-page \
  "file://${HTML_FILE}" \
  "$OUTPUT_FILE"
