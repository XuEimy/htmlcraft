# UI Foundation Spec

Use this reference when the user wants a handoff-ready interface baseline rather than only a landing-page mood.

This document defines a practical default UI system for web work:

- detailed enough to implement
- restrained enough to reuse
- specific enough for tokens, specs, and HTML/CSS output

When this document is used as a deliverable, prefer a chosen default over an open range.
Ranges are allowed only to show safe variation. The artifact should still mark one explicit
default that implementation should follow.

If a project's visual thesis conflicts with a value here, keep the structure but bias the value while staying inside the same logic.

## Table of Contents

1. Core Principles
2. Base Grid And Sizing
3. Radius System
4. Typography
5. Color Roles
6. Layout
7. Button Spec
8. Input And Form Spec
9. Card And Panel Spec
10. Iconography
11. Shadow, Border, And Surface
12. Motion
13. State System
14. Accessibility Baseline
15. Handoff Checklist
16. Default Starter Token Block

## 1. Core Principles

1. Prefer systems over one-off styling.
2. Use a small, named token set before ad hoc values.
3. Let typography, spacing, and contrast carry most of the interface.
4. Do not use 3D illustration filler.
5. If icons are needed, use SVG vector icons only.

## 2. Base Grid And Sizing

### Unit System

- Base micro unit: `4px`
- Default layout rhythm: `8px`
- Large section rhythm: `16px`, `24px`, `32px`, `48px`, `64px`, `96px`

Rule:

- use `4px` increments for small adjustments
- use `8px` increments for most UI spacing
- use `16px+` increments for layout and section rhythm

### Recommended Spacing Scale

| Token | Value | Typical usage |
| --- | --- | --- |
| `--space-1` | `4px` | icon nudges, tiny gaps |
| `--space-2` | `8px` | icon-text gap, tight inline spacing |
| `--space-3` | `12px` | compact control padding |
| `--space-4` | `16px` | default control padding, stack gap |
| `--space-5` | `24px` | card padding, medium gaps |
| `--space-6` | `32px` | block grouping |
| `--space-7` | `48px` | large grouping |
| `--space-8` | `64px` | section spacing |
| `--space-9` | `96px` | large desktop sections |

## 3. Radius System

Use a small radius set and map every component to it.

| Token | Value | Typical usage |
| --- | --- | --- |
| `--radius-none` | `0px` | tables, strict editorial layouts |
| `--radius-sm` | `6px` | tiny badges, compact chips |
| `--radius-md` | `8px` | inputs, small buttons |
| `--radius-lg` | `12px` | default buttons, dropdowns, small cards |
| `--radius-xl` | `16px` | standard cards, panels |
| `--radius-2xl` | `24px` | large panels, modals, hero containers |
| `--radius-pill` | `999px` | pills, search bars, capsule buttons |

### Radius Mapping Rules

- Small button: `8px`
- Default button: `10px–12px`
- Input and select: `8px–12px`
- Small card: `12px`
- Standard card: `16px`
- Large modal or hero container: `20px–24px`
- Pill element: `999px`

Avoid:

- using more than 4 different visible radii on one page
- making every component extra rounded by default

## 4. Typography

### Font Family Rule

- Maximum 2 font families:
  - 1 display family
  - 1 body family

If the design is very system-oriented, a single family may be used across everything.

### Type Scale

| Token | Value | Usage |
| --- | --- | --- |
| `--text-xs` | `12px` | labels, captions |
| `--text-sm` | `14px` | nav, helper text |
| `--text-base` | `16px` | default body |
| `--text-lg` | `18px` | lead text |
| `--text-xl` | `20px` | dense card titles |
| `--text-2xl` | `24px` | small section titles |
| `--text-3xl` | `32px` | section titles |
| `--text-4xl` | `40px` | page titles |
| `--text-hero` | `56px` | hero titles |

### Line Height

| Context | Value |
| --- | --- |
| Hero / display | `0.95–1.05` |
| Headings | `1.1–1.2` |
| Body | `1.55–1.7` |
| Small text | `1.4–1.5` |

### Weight

| Context | Value |
| --- | --- |
| Body | `400` |
| Emphasis | `500` |
| Subhead | `600` |
| Headings | `700` |
| Strong display | `700–800` |

### Typography Rules

- Body text should usually not exceed `70ch`
- Hero letter-spacing can tighten to `-0.02em` to `-0.05em`
- Body letter-spacing should stay near `0`
- Do not rely on size alone; use weight and spacing hierarchy too

## 5. Color Roles

Define color by role, not only by hex values.

### Required Roles

| Token | Purpose |
| --- | --- |
| `--color-bg` | page background |
| `--color-surface` | cards, elevated areas |
| `--color-surface-strong` | emphasized containers |
| `--color-text` | primary text |
| `--color-text-muted` | secondary text |
| `--color-border` | default borders |
| `--color-primary` | primary CTA, active emphasis |
| `--color-accent` | secondary emphasis |
| `--color-success` | success states |
| `--color-warning` | warning states |
| `--color-error` | error states |

### Palette Rules

- 1 dominant brand/action color
- 1 secondary accent at most
- neutrals should cover most of the interface
- do not distribute accent colors evenly across every block
- do not default to purple-blue startup gradients unless explicitly desired

## 6. Layout

### Containers

| Token | Value |
| --- | --- |
| `--container-sm` | `720px` |
| `--container-md` | `960px` |
| `--container-lg` | `1200px` |
| `--container-xl` | `1440px` |

### Page Gutters

| Breakpoint | Value |
| --- | --- |
| Mobile | `16px` |
| Tablet | `24px` |
| Desktop | `32px` |
| Wide desktop | `40px` |

### Grid

- Desktop: `12 columns`
- Tablet: `8 columns`
- Mobile: `4 columns`
- Standard gutter: `16px–24px`

## 7. Button Spec

### Sizes

| Size | Height | Horizontal padding | Radius | Font |
| --- | --- | --- | --- | --- |
| Small | `32px` | `12px` | `8px` | `14px / 500` |
| Medium | `40px` | `16px` | `10px–12px` | `14px–16px / 600` |
| Large | `48px` | `20px` | `12px` | `16px / 600` |
| Pill CTA | `44px–48px` | `18px–24px` | `999px` | `14px–16px / 600` |

### Button States

Every button should define:

- default
- hover
- active
- focus
- disabled
- loading

### Button Rules

- One page should usually use one primary button height
- Secondary and ghost variants must keep the same height and radius as primary
- Focus must be visible with a dedicated ring or outline

## 8. Input And Form Spec

### Sizes

| Control | Height | Padding X | Radius |
| --- | --- | --- | --- |
| Text input | `44px` | `14px–16px` | `8px–12px` |
| Textarea | min `96px` | `14px–16px` | `12px` |
| Select | `44px` | `14px–16px` | `8px–12px` |
| Search | `44px–48px` | `16px` | `999px` or `12px` |

### Required States

- default
- hover
- focus
- filled
- error
- disabled

### Form Rules

- Labels must remain visible; do not rely on placeholder as label
- Error state needs text plus color, not color alone
- Form helper text should use `12px–14px`

## 8.1 Selection Controls

| Component | Size | Radius | Notes |
| --- | --- | --- | --- |
| Checkbox | `16px–18px` | `4px` | border `1.5px`, checkmark centered |
| Radio | `16px–18px` | `999px` | dot should stay optically centered |
| Switch | `44px x 28px` | `999px` | thumb `20px`, internal offset `4px` |
| Segmented control | `36px–40px` height | `10px–12px` | active item should not change total height |

Rules:

- selected state must be visible without animation
- disabled state must reduce affordance but remain legible
- focus ring must remain visible for keyboard navigation

## 9. Card And Panel Spec

### Card Defaults

| Type | Padding | Radius | Border / Shadow |
| --- | --- | --- | --- |
| Compact card | `16px` | `12px` | `1px border` |
| Standard card | `20px–24px` | `16px` | border or shadow, not random mixing |
| Large panel | `24px–32px` | `20px–24px` | light border + restrained shadow |

### Card Rules

- Do not turn every section into the same card block
- Use either border-led or shadow-led separation as the default system
- If more than 5 repeated cards exist, introduce rhythm or hierarchy changes

## 9.1 Overlay And Shell Components

| Component | Default size | Radius | Notes |
| --- | --- | --- | --- |
| Tooltip | auto | `8px` | padding `8px 10px`, short text only |
| Popover | `280px–360px` width | `12px` | padding `12px–16px` |
| Dropdown menu | min `220px` width | `12px` | item height `36px–40px` |
| Modal / dialog | `480px / 640px / 960px` widths | `20px–24px` | outer padding `24px–32px` |
| Side drawer | `320px / 400px / 480px` widths | `0px` or `24px` inner panels | choose once per product |
| Toast | min height `48px` | `12px` | horizontal layout, icon + text + action |

Rules:

- overlays should use the same border/shadow logic as the rest of the system
- dropdown items must align to the same horizontal padding
- modal header, body, and footer spacing must be explicit
- drawers should define header height and internal section spacing before implementation

## 9.2 Navigation And Tabs

| Component | Height | Radius | Notes |
| --- | --- | --- | --- |
| Top nav | `64px` | none on shell | links align vertically to CTA |
| Secondary tab bar | `40px–44px` | `10px` container or underline style | choose once |
| Chip / filter pill | `28px–32px` | `999px` | horizontal padding `10px–14px` |
| Badge | `20px–24px` | `999px` or `6px` | keep type at `12px–13px` |

Rules:

- tab systems should define active indicator thickness: `2px`
- active and inactive labels should not shift layout
- chips and badges must share one capitalization rule

## 9.3 Table And List Density

| Element | Value |
| --- | --- |
| Compact row height | `40px` |
| Default row height | `48px` |
| Relaxed row height | `56px` |
| Cell padding X | `12px–16px` |
| Header font | `12px–14px`, `600` |
| Row divider | `1px` |

Rules:

- action cells must reserve enough width for icons and menus
- sortable headers must keep icon alignment consistent
- zebra striping is optional; use only if contrast remains subtle

## 10. Iconography

### Hard Requirements

- Icons must be SVG
- Use one icon family only
- Do not mix outline and solid casually
- Do not use emoji as core interface iconography
- Do not use raster icon packs if SVG can serve the job

### Recommended Defaults

| Property | Value |
| --- | --- |
| Small icon | `16px` |
| Default icon | `20px` |
| Large icon | `24px` |
| Heavy icon | `32px` |
| Outline stroke | `1.5px–2px` |
| Gap to text | `8px` |

### Visual Ban

- No 3D illustrations
- No clay icons
- No glossy isometric filler
- No pseudo-3D object clusters as generic tech decoration

Preferred substitutes:

- SVG icons
- 2D geometry
- diagrams
- UI screenshots
- typographic emphasis

## 11. Shadow, Border, And Surface

### Border

- Default border: `1px`
- Strong border: `1.5px–2px`
- Dividers should usually stay lighter than card borders

### Shadow Levels

| Token | Suggested value |
| --- | --- |
| `--shadow-sm` | `0 4px 12px rgba(0,0,0,0.06)` |
| `--shadow-md` | `0 10px 24px rgba(0,0,0,0.10)` |
| `--shadow-lg` | `0 16px 40px rgba(0,0,0,0.14)` |
| `--shadow-xl` | `0 24px 64px rgba(0,0,0,0.18)` |

Rules:

- use restrained shadows on light themes
- on dark themes, rely more on border and contrast than heavy shadow

## 11.1 Focus Ring

| Property | Default |
| --- | --- |
| Ring width | `2px` |
| Ring offset | `2px` |
| Ring radius | match component radius or be `+2px` |
| Ring color | primary color at `40%–70%` visible strength |

Rules:

- focus ring must not be removed
- if border changes on focus, the ring should still remain distinguishable
- on dark backgrounds, focus contrast should be brighter, not merely thicker

## 11.2 Z-Index Scale

| Layer | Value |
| --- | --- |
| Base content | `0` |
| Sticky UI | `10` |
| Floating controls | `100` |
| Dropdown / popover | `400` |
| Modal / drawer | `800` |
| Toast / blocking alert | `1000` |

Rule:

- use named z-index tokens rather than arbitrary integers during implementation

## 12. Motion

### Timing

| Use case | Duration |
| --- | --- |
| hover | `120ms–180ms` |
| component open / close | `180ms–240ms` |
| modal / drawer | `240ms–320ms` |
| page section reveal | `320ms–480ms` |

### Easing

- Default: `ease-out`
- Emphasized motion: `cubic-bezier(0.22, 1, 0.36, 1)`

### Motion Rules

- Motion must support hierarchy or feedback
- Do not animate everything
- Avoid decorative floating or orbiting object motion as filler
- Keep entrance motion consistent across sibling components
- Prefer opacity, translate, scale, and clip-based motion over novelty transforms

## 13. State System

Each interactive component should consider:

- default
- hover
- active
- focus
- disabled
- loading
- error
- success

Complex components may also require:

- selected
- checked
- expanded
- empty

## 14. Accessibility Baseline

### Minimum Rules

- Minimum body size: `14px`, preferred `16px`
- Minimum target size: `44px x 44px`
- Visible keyboard focus is required
- State should not rely on color alone
- Body contrast should meet practical AA readability

### Content Rules

- Buttons should use clear verbs
- Error copy should say what happened and what to do next
- Empty states should say what is missing and the next action

## 14.1 Empty, Loading, And Feedback States

### Empty State

- Title: `16px–20px`, `600`
- Description: `14px–16px`
- One primary next action
- Optional secondary help link

### Loading State

- Skeleton corners should match target component radius
- Skeleton pulse: `1.2s–1.6s`
- Do not replace the whole screen if only one block is loading

### Toast / Inline Feedback

- Success, warning, and error should each have icon + label + optional action
- Auto-dismiss only for low-risk notifications
- Destructive outcomes should not rely on toast alone

## 15. Handoff Checklist

Before calling the UI foundation complete, confirm:

- token names are present
- radii are mapped to components
- button sizes are explicit
- form sizes are explicit
- icon rules are explicit
- 3D illustration ban is explicit
- motion durations are explicit
- focus and disabled states are defined

## 16. Default Starter Token Block

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  --radius-none: 0px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-pill: 999px;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 40px;
  --text-hero: 56px;
}
```
