# Typography Precision Guide

Extracted from the Pretext text layout engine. Use this reference when the page
depends on precise text behavior — hero headlines that must fit, labels that must
not wrap, editorial layouts driven by text measurement.

Original library: [chenglou/pretext](https://github.com/chenglou/pretext)

## When This Matters

Most landing pages do not need sub-pixel text precision. This guide matters when:

- a hero headline must fit within a fixed viewport width without wrapping awkwardly
- button or nav labels must stay on one line across breakpoints
- card titles with variable content must maintain consistent card heights
- editorial layouts use multi-column text with pull quotes or text wrapping around images
- the page uses large display type where a single unexpected line break ruins the composition

## Key Principles from Pretext

### 1. Text Width Is Not Predictable by Character Count

Different characters have different widths. A 40-character headline in one font may wrap
at a different point than the same 40 characters in another font. The only reliable way
to predict text width is to measure it — or to design defensively.

Defensive design rules:
- Hero headlines: test at the longest expected content, not the placeholder
- If the headline is dynamic, use `clamp()` for font size so it scales down before wrapping
- Set `max-width` on text containers in `ch` units when possible (e.g., `max-width: 20ch`
  for a headline you want on one line)

### 2. System Fonts Are Unsafe for Precision

On macOS, `system-ui` resolves to different font variants (SF Pro Text vs SF Pro Display)
at different sizes, and the switch points differ between CSS rendering and Canvas measurement.
This causes layout mismatches.

Rule: if text precision matters, use a named font, not `system-ui` or generic family names.

### 3. Line Breaking Is Language-Dependent

Different languages have different line-breaking rules:
- English breaks at spaces and hyphens
- Chinese and Japanese can break between any character (but not before punctuation)
- Arabic and Hebrew have bidirectional text that complicates width calculation
- Thai has no spaces between words — line breaking requires dictionary-based segmentation

For multilingual pages: test line breaking at multiple viewport widths with actual
content in each language. Do not assume English breaking rules apply universally.

### 4. Trailing Spaces and Punctuation Affect Line Breaks

Browsers "hang" trailing spaces and some punctuation (commas, periods) beyond the line
edge rather than forcing a new line. This means a line that appears to fit may actually
extend slightly beyond its container.

Rule: when constraining text to a specific width, add 2–4px of safety margin to account
for trailing punctuation hang.

## Practical Text Fitting Techniques

### Hero Headline Fitting

For headlines that must stay on one or two lines:

```css
.hero-headline {
  font-size: clamp(36px, 5vw + 1rem, 72px);
  max-width: 18ch;
  text-wrap: balance;
}
```

`text-wrap: balance` (supported in modern browsers) redistributes words across lines
so that both lines of a two-line headline are roughly equal width, avoiding the
"one long line + one orphan word" pattern.

### Button Label Safety

For labels that must not wrap:

```css
.button-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
```

Better approach: design the button system so that the longest expected label fits
at the smallest button size. Test with real copy, not "Submit".

### Card Title Consistency

For grids where all cards must have the same height regardless of title length:

```css
.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(2 * 1.3 * 1em);
}
```

### Balanced Text for Section Headings

```css
.section-heading {
  text-wrap: balance;
  max-width: 25ch;
}
```

This prevents the common AI-generated pattern where a heading has one full line
and then a single dangling word on the second line.

## Editorial Layout Patterns

### Multi-Column Text

```css
.editorial-body {
  column-count: 2;
  column-gap: 40px;
  column-rule: 1px solid var(--neutral-100);
}

@media (max-width: 768px) {
  .editorial-body {
    column-count: 1;
  }
}
```

Rules:
- Minimum column width: 280px
- Column gap: 32–48px (must be wider than paragraph spacing)
- Maximum 3 columns on web

### Pull Quotes

```css
.pull-quote {
  float: right;
  width: 45%;
  margin: 0 0 var(--space-lg) var(--space-xl);
  padding-left: var(--space-lg);
  border-left: 3px solid var(--color-primary);
  font-size: var(--text-xl);
  font-style: italic;
}
```

Rules:
- Width: 35–50% of column
- Always float to one side, never center
- Minimum 3 lines of body text must remain beside it

### Drop Caps

```css
.drop-cap::first-letter {
  float: left;
  font-size: 3.5em;
  line-height: 0.8;
  padding-right: 8px;
  padding-top: 4px;
  font-weight: 700;
  color: var(--color-primary);
}
```

Rules:
- Span 2–3 lines of body text
- Only first paragraph of first content section

## Anti-Patterns

- Assuming text will always fit because it fit with placeholder content
- Using `overflow: hidden` without `text-overflow: ellipsis`
- Setting fixed heights on text containers without accounting for variable content
- Using `vw` units for font size without `clamp()`
- Ignoring `text-wrap: balance` when it would prevent orphaned headline words
- Testing only in English when the page will have multilingual content
