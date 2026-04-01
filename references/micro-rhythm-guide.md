# Micro Rhythm Guide

Use this reference when refining typographic spacing within sections. This covers the
relationships between headings, paragraphs, lists, and whitespace that make a page feel
intentionally designed rather than auto-generated.

Page-level rhythm (IMPACT → PROOF → DEPTH → BREAK → CLOSE) is defined elsewhere.
This guide covers the spacing INSIDE each section.

## Core Principle: Proximity Creates Grouping

Elements that belong together should be closer to each other than to unrelated elements.
This sounds obvious but is the single most common failure in AI-generated pages.

Bad:
```
[Section Heading]        — 32px gap
[Subtitle]               — 32px gap
[Paragraph 1]            — 32px gap
[Paragraph 2]            — 32px gap
[Next Section Heading]
```
Everything has the same gap. Nothing groups. It reads as a list, not a composition.

Good:
```
[Section Heading]        — 8px gap (tight: heading + subtitle are one unit)
[Subtitle]               — 32px gap (breathing room before content)
[Paragraph 1]            — 16px gap (paragraphs are siblings)
[Paragraph 2]            — 80px gap (large gap signals section change)
[Next Section Heading]
```

## Heading-to-Content Spacing Rules

| Relationship | Spacing Rule | Recommended Value |
| --- | --- | --- |
| Section heading → subtitle | Tight: `--space-sm` to `--space-md` | 8–12px |
| Subtitle → first content element | Medium: `--space-lg` to `--space-xl` | 24–40px |
| Section heading (no subtitle) → first content | Medium: `--space-lg` | 24–32px |
| Last content element → next section heading | Large: `--space-section` | 80–120px |

Key ratio: **the gap after a heading group should be 2–3× the gap within the heading group.**
This creates the perception that heading + subtitle are one object.

## Paragraph Spacing

| Context | Between Paragraphs | Recommended |
| --- | --- | --- |
| Long-form reading (editorial, blog) | `--space-md` to `--space-lg` | 16–20px |
| Marketing copy (landing page) | `--space-lg` | 24px |
| Dense information (specs, docs) | `--space-md` | 16px |

Rules:
- Paragraphs should have consistent spacing — do not vary between paragraphs in the same section.
- The space between paragraphs should be less than the space between a heading and its content.
- Never use `<br><br>` to simulate paragraph spacing. Use `margin-bottom` on `<p>`.

## List Spacing

| Context | Between List Items | Recommended |
| --- | --- | --- |
| Tight list (feature bullets, specs) | `--space-sm` | 8px |
| Medium list (benefit points) | `--space-md` | 12–16px |
| Spaced list (key arguments, steps) | `--space-lg` | 20–24px |

Rules:
- List items should be closer together than paragraphs in the same context.
- If list items contain multi-line text, increase to medium or spaced.
- Nested lists: indent by `--space-lg` (24px), tighten item spacing by one level.

## Card Grid Internal Rhythm

| Element | Spacing | Recommended |
| --- | --- | --- |
| Card padding | `--space-lg` to `--space-xl` | 24–32px |
| Icon/image → title | `--space-md` | 16px |
| Title → description | `--space-sm` | 8px |
| Description → CTA/link | `--space-md` to `--space-lg` | 16–24px |
| Between cards (grid gap) | `--space-lg` to `--space-xl` | 24–32px |

Key ratio: **internal card padding ≥ the gap between card elements.**
This prevents cards from feeling cramped.

## CTA Block Spacing

| Element | Spacing | Recommended |
| --- | --- | --- |
| Preceding content → CTA heading | `--space-xl` to `--space-2xl` | 40–64px |
| CTA heading → supporting text | `--space-sm` | 8px |
| Supporting text → button | `--space-lg` | 24px |
| Button → reassurance text | `--space-sm` | 8–12px |

The CTA block should feel like an isolated island — generous space above and below it
concentrates visual gravity on the button.

## Density Profiles

Different visual theses demand different overall density. These profiles adjust the
baseline spacing.

### Spacious (museum, minimal, warm)

- Section spacing: 104–120px
- Heading → content: 32–40px
- Paragraph gap: 20–24px
- Card gap: 32px
- Overall feel: elements float in space

### Moderate (tech, editorial, default)

- Section spacing: 88–96px
- Heading → content: 24–32px
- Paragraph gap: 16–20px
- Card gap: 24px
- Overall feel: structured but breathing

### Dense (brutalist, editorial-print, data-heavy)

- Section spacing: 72–88px
- Heading → content: 16–24px
- Paragraph gap: 12–16px
- Card gap: 16–20px
- Overall feel: ink-dense, information-saturated

## Vertical Rhythm Alignment

For designs that benefit from strict vertical rhythm (editorial, minimal):

- Establish a baseline grid: typically body line-height × body font-size
  (e.g., 16px × 1.6 = 25.6px, round to 24px)
- All vertical spacing should be multiples of this baseline
- Heading margins should snap to the baseline grid
- This creates a subtle regularity that feels "designed"

For designs that prioritize visual weight over rhythm (bold, brutalist):
- Vertical rhythm can be looser
- Spacing is driven by visual balance rather than mathematical grid

## Common AI-Generated Spacing Failures

1. **Uniform gaps everywhere.** Every element has 24px margin. Nothing groups, nothing separates.
   Fix: vary spacing by relationship (tight within groups, loose between groups).

2. **Heading orphaned from its content.** The heading has more space below it than above it,
   making it look like it belongs to the previous section.
   Fix: heading space-above > heading space-below. Always.

3. **CTA lost in the flow.** The CTA button has the same spacing as everything else.
   Fix: isolate the CTA with extra space above and below.

4. **Cards with more internal space than external.** Cards feel disconnected from each other.
   Fix: card internal padding ≤ grid gap between cards.

5. **Section transitions feel abrupt.** One section ends and another begins with the same gap
   as between paragraphs.
   Fix: section spacing should be 3–5× paragraph spacing.

6. **No density variation across the page.** Every section has the same spacing character.
   Fix: BREAK sections should have noticeably different density (tighter or looser than
   surrounding sections).
