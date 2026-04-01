# Iconography Guide

Use this reference when locking icon decisions. Supplements the hard requirements in
`ui-foundation-spec.md` with library recommendations, optical alignment rules, and
usage patterns.

## Recommended Icon Libraries

All libraries below are SVG-based, open source, and available via CDN or npm.
Choose ONE library per project and use it exclusively.

| Library | Style | Best For | CDN / Source |
| --- | --- | --- | --- |
| Lucide | Outline, 1.5px stroke, rounded caps | General purpose, modern UI | lucide.dev |
| Phosphor | Outline + filled + duotone variants | Versatile, needs multiple weights | phosphoricons.com |
| Heroicons | Outline (1.5px) + solid variants | Tailwind projects, minimal UI | heroicons.com |
| Tabler Icons | Outline, 2px stroke, rounded | Dense UI, dashboard-like contexts | tabler.io/icons |
| Remix Icon | Outline + filled, clean geometry | Chinese/bilingual projects (good CJK context icons) | remixicon.com |
| Font Awesome (outline subset) | Mixed styles | Legacy projects only | fontawesome.com |

### Selection Logic

| Visual Thesis | Recommended Library | Why |
| --- | --- | --- |
| Minimal / Clean | Lucide or Heroicons | Thin, quiet, does not compete with type |
| Tech / Futuristic | Phosphor (light weight) or Lucide | Geometric, precise, scalable |
| Bold / Expressive | Phosphor (bold weight) or Tabler | Heavier stroke matches chunky type |
| Editorial / Magazine | Lucide or Heroicons | Understated, editorial restraint |
| Warm / Friendly | Phosphor (regular) or Remix | Rounded caps, friendly geometry |
| Brutalist / Raw | Tabler or Phosphor (bold) | Thick stroke matches raw aesthetics |

## Icon Sizing System

| Token | Size | Stroke | Usage |
| --- | --- | --- | --- |
| `--icon-xs` | 14px | 1.5px | Inline with small text, metadata |
| `--icon-sm` | 16px | 1.5px | Inline with body text, form hints |
| `--icon-md` | 20px | 1.5–2px | Default UI icon, buttons, nav |
| `--icon-lg` | 24px | 2px | Section accents, feature icons |
| `--icon-xl` | 32px | 2px | Hero decorative, large feature |
| `--icon-2xl` | 48px | 2–2.5px | Statement icon, empty states |

Rules:
- Stroke width should scale with icon size to maintain optical consistency.
- At 14–16px, use 1.5px stroke.
- At 20–24px, use 1.5–2px stroke.
- At 32px+, use 2–2.5px stroke.
- Never use 1px stroke at sizes above 24px — it looks fragile.

## Optical Alignment Rules

Icons and text do not align mathematically. They align optically.

### Icon + Text Inline

```
❌ Mathematical alignment (icons look too high):
[icon center-aligned to text center]

✅ Optical alignment (icons feel centered):
[icon shifted down 1–2px from mathematical center]
```

Implementation:
```css
.icon-inline {
  vertical-align: -0.125em; /* or -2px at 16px font-size */
}
```

### Icon in Button

| Button Size | Icon Size | Icon-to-Text Gap |
| --- | --- | --- |
| Small (32px) | 16px | 6px |
| Medium (40px) | 20px | 8px |
| Large (48px) | 20–24px | 8–10px |

The icon should be optically centered within the button height, not mathematically centered.
For most outline icons, this means shifting down ~1px.

### Icon in Card or Feature Block

When an icon sits above a title:

| Element | Spacing |
| --- | --- |
| Icon size | `--icon-lg` (24px) or `--icon-xl` (32px) |
| Icon → Title | 12–16px |
| Icon container (if used) | 48–56px, with icon centered |

Icon containers (colored circles or rounded squares behind the icon):
- Container size: 2–2.5× the icon size
- Container radius: match the project's card radius or use full circle
- Container color: primary at 8–12% opacity, or neutral-50
- Do not make the container so prominent it competes with the title

### Icon in Navigation

| Context | Size | Gap to Label |
| --- | --- | --- |
| Top nav link | 18–20px | 6–8px |
| Mobile nav item | 20–24px | 10–12px |
| Sidebar nav | 20px | 10px |

## Icon Color Rules

| Context | Color |
| --- | --- |
| Default UI icon | `--color-muted` or `--neutral-600` |
| Active / selected icon | `--color-primary` |
| Icon in primary button | inherit from button text color |
| Decorative feature icon | `--color-primary` at 100% or in a tinted container |
| Disabled icon | `--neutral-300` |
| Error icon | `--color-error` |
| Success icon | `--color-success` |

Rule: icons should never be more prominent than the text they accompany, unless the icon
IS the primary content (e.g., an icon-only button or empty state illustration).

## Icon Usage Patterns

### When to Use Icons

- Navigation items (aids scanning)
- Feature lists (creates rhythm)
- Buttons with ambiguous labels (clarifies action)
- Status indicators (success, error, warning)
- Empty states (provides visual anchor)
- Form field hints (clarifies input type)

### When NOT to Use Icons

- Decorative filler with no informational value
- Every single list item (if the text is clear enough, icons add noise)
- As the sole label for an action (always pair with text, except toolbar-style UI)
- When the icon requires a tooltip to be understood (the icon is not working)
- Mixing metaphors: a "heart" icon for "save" and a "bookmark" icon for "favorite"

## Banned Icon Practices

- No 3D icons or clay-style icons
- No emoji as UI icons (emoji are content, not interface)
- No raster icon images when SVG can be used
- No mixing outline and solid icons casually within the same context
  (choose one style per context: outline for nav, solid for status badges, etc.)
- No icon fonts when inline SVG is available (icon fonts have alignment and
  accessibility disadvantages)
- No custom icon designs unless the project explicitly requires a bespoke icon system

## Accessibility

- All meaningful icons must have `aria-label` or associated text
- Decorative icons: `aria-hidden="true"` and no alt text
- Icon buttons without visible text: require `aria-label` on the button
- Icon color must not be the only indicator of state (pair with text or shape change)
- Focus indicators on icon buttons must meet the same contrast requirements as text buttons
