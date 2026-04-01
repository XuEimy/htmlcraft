#!/usr/bin/env python3

import argparse
import json
import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path


COLOR_RE = re.compile(r"#(?:[0-9a-fA-F]{3,8})\b|rgba?\([^)]*\)|hsla?\([^)]*\)")
FONT_RE = re.compile(r"font-family\s*:\s*([^;}{]+)")
RADIUS_RE = re.compile(r"border-radius\s*:\s*([^;}{]+)")
VAR_RE = re.compile(r"var\(--[a-zA-Z0-9-_]+\)")
TOKEN_DEF_RE = re.compile(r"(--[a-zA-Z0-9-_]+)\s*:\s*([^;}{]+)")
GRADIENT_RE = re.compile(r"gradient\s*\(")

CTA_WORDS = {
    "book",
    "demo",
    "start",
    "talk",
    "contact",
    "see",
    "watch",
    "request",
    "get",
    "try",
    "join",
}

SERIF_HINTS = {
    "serif",
    "georgia",
    "times",
    "newsreader",
    "instrument serif",
    "cormorant",
    "playfair",
    "lora",
}

GENERIC_SANS_HINTS = {
    "inter",
    "arial",
    "helvetica",
    "roboto",
    "sans-serif",
    "system-ui",
    "-apple-system",
}

PURPLE_BLUE_HINTS = {
    "#6366f1",
    "#8b5cf6",
    "#7c3aed",
    "#3b82f6",
    "#2563eb",
    "#4f46e5",
}


def normalize_whitespace(value: str) -> str:
    return " ".join(value.split())


class HTMLSummaryParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tag_counts = Counter()
        self.section_ids = []
        self.headings = []
        self.link_hrefs = []
        self.style_blocks = []
        self.inline_styles = []
        self._capture_style = False
        self._current_heading = None
        self._heading_buffer = []
        self.cta_texts = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tag_counts[tag] += 1

        if tag == "section":
            label = attrs.get("id") or attrs.get("class") or f"section-{len(self.section_ids) + 1}"
            self.section_ids.append(label)

        if tag in {"h1", "h2", "h3", "h4"}:
            self._current_heading = tag
            self._heading_buffer = []

        if tag == "style":
            self._capture_style = True

        if tag == "link" and attrs.get("rel") == "stylesheet" and attrs.get("href"):
            self.link_hrefs.append(attrs["href"])

        if "style" in attrs:
            self.inline_styles.append(attrs["style"])

        if tag in {"a", "button"}:
            self._current_cta_tag = tag
            self._cta_buffer = []
        else:
            self._current_cta_tag = getattr(self, "_current_cta_tag", None)

    def handle_endtag(self, tag):
        if tag == "style":
            self._capture_style = False

        if self._current_heading == tag:
            text = normalize_whitespace("".join(self._heading_buffer))
            if text:
                self.headings.append({"level": tag, "text": text})
            self._current_heading = None
            self._heading_buffer = []

        if getattr(self, "_current_cta_tag", None) == tag:
            text = normalize_whitespace("".join(getattr(self, "_cta_buffer", [])))
            if text:
                lowered = text.lower()
                if any(word in lowered for word in CTA_WORDS):
                    self.cta_texts.append(text)
            self._current_cta_tag = None
            self._cta_buffer = []

    def handle_data(self, data):
        if self._capture_style:
            self.style_blocks.append(data)
        if self._current_heading:
            self._heading_buffer.append(data)
        if getattr(self, "_current_cta_tag", None):
            self._cta_buffer.append(data)


def read_local_stylesheets(html_path: Path, hrefs):
    styles = []
    for href in hrefs:
        if re.match(r"^[a-z]+://", href):
            continue
        local = (html_path.parent / href).resolve()
        if local.exists() and local.is_file():
            styles.append(local.read_text(encoding="utf-8"))
    return styles


def extract_tokens(text, regex):
    return [normalize_whitespace(match) for match in regex.findall(text)]


def unique_top(values, limit=12):
    counter = Counter(values)
    return [item for item, _ in counter.most_common(limit)]


def extract_token_map(text):
    token_map = {}
    for name, value in TOKEN_DEF_RE.findall(text):
        token_map[name] = normalize_whitespace(value)
    return token_map


def resolve_values(values, token_map):
    resolved = []
    for value in values:
        match = re.fullmatch(r"var\((--[a-zA-Z0-9-_]+)\)", value)
        if match and match.group(1) in token_map:
            resolved.append(f"{value} -> {token_map[match.group(1)]}")
        else:
            resolved.append(value)
    return resolved


def classify_fonts(fonts):
    families = []
    for font in fonts:
        for family in font.split(","):
            cleaned = family.strip().strip("\"'").lower()
            if cleaned:
                families.append(cleaned)

    serif = any(family in SERIF_HINTS for family in families)
    generic_sans = any(family in GENERIC_SANS_HINTS for family in families)
    return {
        "has_serif_signal": serif,
        "leans_generic_sans": generic_sans and not serif,
    }


def build_summary(html_path: Path):
    parser = HTMLSummaryParser()
    html = html_path.read_text(encoding="utf-8")
    parser.feed(html)

    local_css = read_local_stylesheets(html_path, parser.link_hrefs)
    combined_css = "\n".join(parser.style_blocks + parser.inline_styles + local_css)
    combined_all = "\n".join([html, combined_css])
    token_map = extract_token_map(combined_css)

    colors = resolve_values(unique_top(extract_tokens(combined_all, COLOR_RE)), token_map)
    fonts = resolve_values(unique_top(extract_tokens(combined_all, FONT_RE)), token_map)
    radii = resolve_values(unique_top(extract_tokens(combined_all, RADIUS_RE)), token_map)
    css_vars = unique_top(extract_tokens(combined_all, VAR_RE), limit=20)

    summary = {
        "file": str(html_path),
        "tag_counts": dict(parser.tag_counts),
        "section_count": parser.tag_counts.get("section", 0),
        "sections": parser.section_ids,
        "headings": parser.headings,
        "h1": next((h["text"] for h in parser.headings if h["level"] == "h1"), None),
        "cta_texts": parser.cta_texts,
        "colors": colors,
        "fonts": fonts,
        "border_radii": radii,
        "uses_gradients": bool(GRADIENT_RE.search(combined_all)),
        "uses_css_vars": bool(css_vars),
        "css_vars": css_vars,
        "token_map": token_map,
        "classifications": classify_fonts(fonts),
        "card_like_mentions": len(re.findall(r"card", combined_all, flags=re.IGNORECASE)),
        "proof_mentions": len(re.findall(r"proof|trust|quote|pilot|source", html, flags=re.IGNORECASE)),
    }
    return summary


def heuristics(summary):
    issues = []
    strengths = []

    if summary["classifications"]["leans_generic_sans"]:
      issues.append("Typography leans on generic sans families without a stronger display signal.")

    if summary["uses_gradients"]:
      strengths.append("Uses gradients or layered backgrounds as part of the visual system.")

    purple_blue = [c for c in summary["colors"] if c.lower() in PURPLE_BLUE_HINTS]
    if purple_blue:
      issues.append("Detected common blue or purple accent values associated with generic AI startup styling.")

    if summary["section_count"] < 4:
      issues.append("Low section count may indicate weak page rhythm or missing proof/depth beats.")
    else:
      strengths.append("Page has enough sections to express a full landing-page rhythm.")

    if summary["proof_mentions"] > 0:
      strengths.append("Proof language appears in the page, suggesting early trust-building content.")
    else:
      issues.append("Could not detect strong proof or trust language in the page content.")

    if summary["card_like_mentions"] >= 10:
      issues.append("Heavy card usage may indicate a repetitive SaaS-block structure.")

    if summary["uses_css_vars"]:
      strengths.append("Uses CSS custom properties, which makes the design system more explicit and reusable.")
    else:
      issues.append("No CSS variables detected; the design language may be harder to reuse consistently.")

    if summary["cta_texts"]:
      strengths.append("CTA language is explicit: " + ", ".join(summary["cta_texts"][:3]))
    else:
      issues.append("No strong CTA text detected in links or buttons.")

    if summary["classifications"]["has_serif_signal"]:
      strengths.append("Typography includes serif signals, which usually helps avoid generic UI output.")

    return {"strengths": strengths, "issues": issues}


def summary_to_markdown(summary):
    h = heuristics(summary)
    headings = "\n".join(
        f"- {item['level'].upper()}: {item['text']}"
        for item in summary["headings"][:8]
    ) or "- None detected"
    sections = "\n".join(f"- {section}" for section in summary["sections"]) or "- None detected"
    colors = "\n".join(f"- {color}" for color in summary["colors"][:10]) or "- None detected"
    fonts = "\n".join(f"- {font}" for font in summary["fonts"][:8]) or "- None detected"
    radii = "\n".join(f"- {radius}" for radius in summary["border_radii"][:8]) or "- None detected"
    key_tokens = []
    for key in [
        "--font-display",
        "--font-body",
        "--bg",
        "--surface",
        "--ink",
        "--accent",
        "--container",
        "--section",
    ]:
        if key in summary["token_map"]:
            key_tokens.append(f"- {key}: {summary['token_map'][key]}")
    token_lines = "\n".join(key_tokens) or "- None detected"
    strengths = "\n".join(f"- {item}" for item in h["strengths"]) or "- None"
    issues = "\n".join(f"- {item}" for item in h["issues"]) or "- None"

    return f"""# HTML Design Spec Report

## File

- {summary["file"]}

## Structure

- Sections: {summary["section_count"]}
- H1: {summary["h1"] or "None detected"}
- CTA count: {len(summary["cta_texts"])}
- Uses gradients: {"yes" if summary["uses_gradients"] else "no"}
- Uses CSS vars: {"yes" if summary["uses_css_vars"] else "no"}

### Section map

{sections}

### Headings

{headings}

## Typography signals

{fonts}

## Key design tokens

{token_lines}

## Color signals

{colors}

## Radius and component signals

{radii}

## CTA copy

{chr(10).join(f"- {cta}" for cta in summary["cta_texts"][:8]) or "- None detected"}

## Heuristic strengths

{strengths}

## Heuristic issues

{issues}
"""


def compare_summaries(left, right):
    return f"""# HTML Design Spec Diff

## Files

- A: {left["file"]}
- B: {right["file"]}

## Structure

- Sections: {left["section_count"]} -> {right["section_count"]}
- CTA count: {len(left["cta_texts"])} -> {len(right["cta_texts"])}
- Uses gradients: {left["uses_gradients"]} -> {right["uses_gradients"]}
- Uses CSS vars: {left["uses_css_vars"]} -> {right["uses_css_vars"]}

## H1

- A: {left["h1"] or "None detected"}
- B: {right["h1"] or "None detected"}

## Top fonts

- A: {", ".join(left["fonts"][:4]) or "None"}
- B: {", ".join(right["fonts"][:4]) or "None"}

## Top colors

- A: {", ".join(left["colors"][:6]) or "None"}
- B: {", ".join(right["colors"][:6]) or "None"}

## Top radii

- A: {", ".join(left["border_radii"][:6]) or "None"}
- B: {", ".join(right["border_radii"][:6]) or "None"}

## CTA copy

- A: {", ".join(left["cta_texts"][:5]) or "None"}
- B: {", ".join(right["cta_texts"][:5]) or "None"}
"""


def main():
    parser = argparse.ArgumentParser(description="Extract or audit the design spec embodied by an HTML file.")
    sub = parser.add_subparsers(dest="command", required=True)

    extract_cmd = sub.add_parser("extract", help="Extract the effective design spec from an HTML file.")
    extract_cmd.add_argument("html")
    extract_cmd.add_argument("--json", action="store_true", dest="as_json")

    audit_cmd = sub.add_parser("audit", help="Audit an HTML file against guided-html-design heuristics.")
    audit_cmd.add_argument("html")
    audit_cmd.add_argument("--json", action="store_true", dest="as_json")

    compare_cmd = sub.add_parser("compare", help="Compare the effective specs of two HTML files.")
    compare_cmd.add_argument("left")
    compare_cmd.add_argument("right")
    compare_cmd.add_argument("--json", action="store_true", dest="as_json")

    args = parser.parse_args()

    if args.command == "extract":
        summary = build_summary(Path(args.html).resolve())
        if args.as_json:
            print(json.dumps(summary, indent=2))
        else:
            print(summary_to_markdown(summary))
        return

    if args.command == "audit":
        summary = build_summary(Path(args.html).resolve())
        payload = {"summary": summary, "heuristics": heuristics(summary)}
        if args.as_json:
            print(json.dumps(payload, indent=2))
        else:
            print(summary_to_markdown(summary))
        return

    if args.command == "compare":
        left = build_summary(Path(args.left).resolve())
        right = build_summary(Path(args.right).resolve())
        if args.as_json:
            print(json.dumps({"left": left, "right": right}, indent=2))
        else:
            print(compare_summaries(left, right))
        return

    parser.print_help()
    return 1


if __name__ == "__main__":
    sys.exit(main() or 0)
