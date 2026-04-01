#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [[ $# -lt 2 ]]; then
  echo "Usage: $(basename "$0") <html-file-a> <html-file-b> [--json]" >&2
  exit 1
fi

python3 "$ROOT_DIR/scripts/html_design_report.py" compare "$@"
