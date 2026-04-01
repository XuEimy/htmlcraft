#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [[ $# -lt 1 ]]; then
  echo "Usage: $(basename "$0") <html-file> [--json]" >&2
  exit 1
fi

python3 "$ROOT_DIR/scripts/html_design_report.py" extract "$@"
