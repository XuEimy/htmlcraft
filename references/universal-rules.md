# Universal Design Rules (Layer 5)

These rules apply to ALL landing page projects. Values expressed as [range] with (recommended).
All values must be traceable to Layers 1–4. If a value contradicts the visual thesis, the
thesis wins and the value must be adjusted within the allowed range.

## Table of Contents
1. Spacing System
2. Typography System
3. Color System
4. Component Consistency Rules
5. Page Architecture Rules
6. Responsive Rules
7. Accessibility Rules
8. Anti-Drift Rules
9. Dark Mode Rules

---

## 1. Spacing System

Base rhythm: **8px**. Micro-adjustments may use **4px** only for tight icon gaps, badges,
and optical alignment.

### Spacing Scale

| Token | Range | Recommended | Usage |
|---|---|---|---|
| `--space-xs` | 4–8px | 4px | Icon gaps, inline elements |
| `--space-sm` | 8–12px | 8px | Tight internal padding |
| `--space-md` | 16–20px | 16px | Standard internal padding |
| `--space-lg` | 24–32px | 24px | Component gaps, card padding |
| `--space-xl` | 40–48px | 40px | Between component groups |
| `--space-2xl` | 56–72px | 64px | Major separations |
| `--space-section` | 80–120px | 96px | Between page sections |

### Rules
- Component internal padding MUST be smaller than gap between components
- Horizontal page margin: 5–10% viewport width (recommend 7%), with max-width container
- Page max-width: 1200–1440px (recommend 1280px)
- Use consistent units throughout: either `rem` or `px`, never mixed arbitrarily
- For "dense" visual thesis: bias toward low end of each range
- For "spacious" visual thesis: bias toward high end of each range
- Default to the recommended value unless the visual thesis clearly calls for a different bias

---

## 2. Typography System

### Typographic Relationships (from Layer 3)

These ratios define how text elements relate. They do NOT change when specific font sizes change.

| Relationship | Ratio | Meaning |
|---|---|---|
| Hero : Body | 3.5x–5x | Hero headline should be 3.5 to 5 times the body font size |
| H1 : Body | 2.5x–3.5x | Main page title relative to body |
| H2 : H3 | ≥ 1.25x | Each heading level must be at least 25% larger than the next |
| Display font weight : Body weight | ≥ +200 | Display must be visibly heavier (e.g., body 400, display 700) |
| Line-height (heading) : Line-height (body) | ~0.7x | Headings are tighter than body text |

### Type Scale

Scale ratio: 1.200–1.333 (recommend 1.250 — Major Third).

| Token | Range | Recommended | Usage |
|---|---|---|---|
| `--text-xs` | 12–13px | 12px | Captions, labels, metadata |
| `--text-sm` | 14–15px | 14px | Secondary text, nav links |
| `--text-base` | 16–18px | 16px | Body text |
| `--text-lg` | 18–22px | 20px | Lead paragraphs, emphasized |
| `--text-xl` | 22–28px | 24px | H4, card titles |
| `--text-2xl` | 28–36px | 30px | H3, section subtitles |
| `--text-3xl` | 36–48px | 40px | H2, section titles |
| `--text-4xl` | 48–64px | 56px | H1, page title |
| `--text-hero` | 56–80px | 64px | Hero headline |

### Font Family Rules
- Maximum 2 font families per project (1 display + 1 body, or 1 for both)
- Specific font stacks are defined per style preset in `references/style-presets.json`
- Display font must have weights 600–800 available
- Body font must have weights 400 and 600 available
- All fonts must be loadable via Google Fonts CDN or system fonts
- Always provide a fallback stack (e.g., `'Instrument Serif', Georgia, serif`)

### Line Height

| Context | Range | Recommended |
|---|---|---|
| Hero headline | 1.0–1.15 | 1.1 |
| Headings (h1–h4) | 1.1–1.3 | 1.2 |
| Body text | 1.5–1.75 | 1.6 |
| Small text / captions | 1.4–1.6 | 1.5 |

### Font Weight

| Context | Range | Recommended |
|---|---|---|
| Body text | 400 | 400 |
| Emphasized body | 500–600 | 500 |
| Subheadings (h3, h4) | 500–600 | 600 |
| Headings (h1, h2) | 600–800 | 700 |
| Hero headline | 700–900 | 800 |

### Rules
- Never skip more than 1 heading level (h1 → h3 without h2 is not allowed)
- Maximum line length for body: 65–75 characters (recommend 70ch, enforce with `max-width`)
- Letter-spacing for hero/display: -0.02em to -0.04em (recommend -0.02em)
- Letter-spacing for body: 0 to 0.01em (recommend 0)

---

## 3. Color System

### Palette Structure

Exactly 5 named color slots per project:

| Token | Purpose |
|---|---|
| `--color-primary` | Brand / main action color |
| `--color-accent` | Secondary emphasis, highlights (used sparingly) |
| `--color-bg` | Page background |
| `--color-fg` | Primary text |
| `--color-muted` | Secondary text, borders, subtle elements |

### Neutral Scale

Minimum 5 steps:

| Token | Light Theme Purpose | Dark Theme Purpose |
|---|---|---|
| `--neutral-50` | Lightest bg (cards, alt sections) | Lightest text (primary fg) |
| `--neutral-100` | Light borders, dividers | Light borders, dividers |
| `--neutral-300` | Disabled text, placeholder | Disabled text, placeholder |
| `--neutral-600` | Secondary text (muted) | Secondary text (muted) |
| `--neutral-900` | Primary text (fg) | Darkest bg (page background) |

### Rules
- Maximum 5 named colors — no more
- One dominant color, others support — never evenly distributed
- Primary = main CTA buttons, key links, active states
- Accent = badges, highlights, secondary actions — sparingly
- Muted = secondary text, borders, icons, metadata
- Never more than 2 colors in a single component (excluding neutral/white/black)
- Alt section background: `--neutral-50` or a 3–5% opacity tint of primary

---

## 4. Component Consistency Rules

**Core rule: same component type = same style parameters everywhere on the page.**

### Button
| Property | Rule |
|---|---|
| Height | One value for all: 36–48px (recommend 40px) |
| Horizontal padding | 16–32px (recommend 24px) |
| Font size | `--text-sm` or `--text-base` — one choice, consistent |
| Font weight | 500–600 (recommend 600) |
| Border radius | 0–24px — project chooses ONCE, then every button uses it |

Variants: primary (filled), secondary (outlined/ghost), text-only.
All share height, padding, font-size, border-radius. Only color/border treatment differs.

### Card
| Property | Rule |
|---|---|
| Border radius | 0–16px — consistent with overall radius system |
| Padding | `--space-lg` to `--space-xl` |
| Background | `--color-bg` or `--neutral-50` |
| Definition | Shadow OR border — not mixed within a page |

If shadow: one shadow value for all cards.
If border: 1px `--neutral-100` for all cards.

### Section Heading
| Property | Rule |
|---|---|
| Title size | `--text-3xl` |
| Subtitle size | `--text-lg` |
| Title weight | 700 |
| Subtitle color | `--color-muted` |
| Alignment | Left or center — project chooses ONCE |
| Space below heading group | `--space-xl` to `--space-2xl` |

### Navigation
| Property | Range | Recommended |
|---|---|---|
| Height | 56–72px | 64px |
| Position | Fixed or static — choose once | Fixed |
| Background | Solid or glass-blur — choose once | Solid |
| Logo | Left-aligned | — |
| CTA button | Right-most nav item | — |
| Mobile | Hamburger, slide-in or dropdown | — |

### Footer
- Full width
- Background: `--neutral-50` (light) or `--neutral-900` (dark) — distinct from body sections
- Minimum: copyright + navigation links
- Link columns: max 4
- Consistent link styling with nav

### Iconography And Imagery

| Property | Rule |
|---|---|
| Icon format | SVG only |
| Icon family | One family only across the page or product |
| Icon style | Outline or solid — choose once, do not mix casually |
| Stroke weight | 1.5–2px for outline icons |
| Corner style | Match the page radius language: sharp, neutral, or soft — choose once |
| Default sizes | 16px, 20px, 24px |
| Alignment | Icons align to text baseline or optical center consistently |

Hard bans:

- No 3D illustrations
- No clay-style artwork
- No glossy isometric cubes, floating 3D objects, or pseudo-product renders as filler
- No emoji used as core iconography
- No raster icon packs when SVG icons can serve the same role

Preferred visual substitutes:

- typography-led hierarchy
- abstract 2D shapes
- diagrams
- screenshots
- product UI crops
- SVG vector icons

If the page needs illustration, default to flat 2D, line-based, or geometric graphics unless the user explicitly requests otherwise.

---

## 5. Page Architecture Rules

### Mandatory Elements (in order)
1. Navigation (top)
2. Hero section
3. At least 1 content section
4. Footer (bottom)

### Hero Requirements
- Primary headline: 1 line preferred, 2 max
- Supporting text: 1–2 sentences max
- Primary CTA button
- Optional: secondary CTA (text link or ghost button), visual element
- First viewport is a POSTER, not a document — one dominant idea only

### Section Priority Hierarchy

| Priority | Section Types |
|---|---|
| Highest | Hero, Value Proposition |
| High | Social Proof (logos, numbers, quotes), Key Features |
| Medium | How It Works, Use Cases, Detailed Features |
| Lower | Testimonials (long form), Integrations, Team |
| Lowest | FAQ, Blog/Resources, Partners |
| End | Final CTA (repeats hero CTA), Footer |

### Rules
- Social proof within the first 3 sections
- CTA minimum 2 appearances: hero + near end
- Maximum 8 content sections (excluding nav/footer)
- Every section: ONE clear purpose (if you can't name it in 3 words, split it)
- Every page over 4 sections MUST have a rhythm BREAK (Layer 2): a section with different
  background, layout, or visual treatment to prevent monotony

See `references/page-templates.md` for detailed templates per page type.

---

## 6. Responsive Rules

### Breakpoints
| Name | Range | Columns |
|---|---|---|
| Mobile | < 640px | 1 |
| Tablet | 640–1024px | 2 |
| Desktop | > 1024px | 3–4 (grid), full-width (hero) |

### Font Size Scaling by Viewport

| Token | Desktop | Mobile | Mobile Minimum |
|---|---|---|---|
| `--text-hero` | 56–80px | 36–48px | 36px |
| `--text-4xl` | 48–64px | 32–40px | 32px |
| `--text-3xl` | 36–48px | 28–32px | 28px |
| `--text-2xl` | 28–36px | 22–28px | 22px |
| `--text-xl` | 22–28px | 18–22px | 18px |
| `--text-base` | 16–18px | 15–16px | 15px |
| `--text-sm` | 14–15px | 13–14px | 13px |
| `--text-xs` | 12–13px | 12px | 12px |

Rule: Use `clamp()` for fluid scaling. Example:
`font-size: clamp(36px, 5vw + 1rem, 72px);`

### Spacing Scaling
| Property | Desktop | Mobile |
|---|---|---|
| Section padding vertical | 80–120px | 48–64px |
| Section padding horizontal | 5–10% vw | 5–7% vw (more margin on small screens) |
| Component gaps | `--space-lg` | `--space-md` |

### Layout
- Grid columns collapse to 1 on mobile
- Navigation collapses to hamburger
- Primary CTA buttons: full-width on mobile
- Images: 100% width on mobile, maintain aspect ratio

### Touch Targets
- Minimum: 44 × 44px
- Minimum gap between targets: 8px

---

## 7. Accessibility Rules

### Color Contrast (WCAG AA)
- Body text on background: ≥ 4.5:1
- Large text (≥ 24px, or ≥ 18px bold) on background: ≥ 3:1
- Interactive element borders: ≥ 3:1 against adjacent colors
- Validate all color combinations when generating tokens

### Focus States
- Every interactive element (button, link, input) MUST have a visible focus indicator
- Focus style: `outline: 2px solid var(--color-primary); outline-offset: 2px;`
- Never use `outline: none` without providing an alternative visible focus style
- Focus indicators must meet ≥ 3:1 contrast against surrounding colors

### Motion
- Wrap all animations in `@media (prefers-reduced-motion: no-preference) { }`
- When reduced motion is preferred: disable transitions, transforms, and keyframe animations
- Essential motion (e.g., loading indicators) may remain but should be simplified
- Default implementation:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

### Semantic HTML
- Page MUST use ARIA landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- Sections within main: use `<section>` with `aria-labelledby` pointing to the section heading
- Only ONE `<h1>` per page (the hero headline)
- Heading order: h1 → h2 → h3, never skip levels
- All images: `alt` attribute required (decorative images: `alt=""` + `aria-hidden="true"`)
- All form inputs: associated `<label>` elements
- CTA buttons: descriptive text (not just "Click here")

### Keyboard Navigation
- All interactive elements reachable via Tab
- Logical tab order (follows visual reading order)
- Skip-to-content link as first focusable element

---

## 8. Anti-Drift Rules

### File Sovereignty
- `design-tokens.css` is the SINGLE SOURCE OF TRUTH for all design values
- Every style in generated code MUST use CSS variables from this file
- Hardcoded values (e.g., `color: #2563eb` instead of `var(--color-primary)`) are VIOLATIONS
- If a value isn't in the token file: add it as a new token first, then use it

### Change Isolation
- When user requests a change: modify ONLY the requested property
- Before any visual change, ask: "Did the user ask for this specific change?"
- If no: don't change it
- After any token change: update ALL THREE spec files (md, json, css) together

### Context Recovery
- New session or agent handoff: re-read `design-tokens.json` before generating code
- If unsure about a value: look it up in the spec, don't guess
- After 10+ conversation turns: re-read the spec before generating new sections

### Agent Collaboration
- Every agent MUST read `design-tokens.json` before generating code
- No agent may introduce new colors, spacing, or font sizes not in the spec
- New values must be proposed as a spec update, not silently added

### Visual Thesis Sovereignty
- The visual thesis (Layer 1) cannot be changed without explicit user request
- If a code change would contradict the visual thesis, flag it before proceeding
- The thesis is documented in `design-spec.md` and must be referenced in ambiguous decisions

---

## 9. Dark Mode Rules

### Token Mapping

When generating a dark theme variant, apply these specific transformations:

| Token | Light Value → | Dark Value |
|---|---|---|
| `--color-bg` | Light (e.g., #ffffff) | Dark (e.g., #0a0a0f) |
| `--color-fg` | Dark (e.g., #111111) | Light (e.g., #e8e8ed) |
| `--color-muted` | Mid-dark (e.g., #6b7280) | Mid-light (e.g., #9ca3af) |
| `--color-primary` | Keep same hue, adjust lightness for contrast on dark bg |
| `--color-accent` | Keep same hue, may increase saturation/lightness slightly |

### Neutral Scale Inversion

| Token | Light Theme | Dark Theme |
|---|---|---|
| `--neutral-50` | #fafafa (lightest bg) | #18181b (surface bg) |
| `--neutral-100` | #f0f0f0 (borders) | #27272a (borders) |
| `--neutral-300` | #cccccc (disabled) | #52525b (disabled) |
| `--neutral-600` | #888888 (muted text) | #a1a1aa (muted text) |
| `--neutral-900` | #111111 (primary text) | #fafafa (primary text) |

### Implementation
- Use `prefers-color-scheme: dark` media query for automatic switching
- OR define a `.dark` class on `<html>` for manual toggle
- All tokens must be redefined in the dark context — no partial overrides
- Re-validate contrast ratios for ALL text/background combinations in dark mode
- Shadows in dark mode: use lighter, more diffuse shadows or luminous borders instead
- Card definition: if using shadow in light mode, consider switching to subtle border
  (`1px solid var(--neutral-100)`) in dark mode for better visibility
