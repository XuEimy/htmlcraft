# Imagery Strategy Guide

Use this reference when locking decisions about photographs, illustrations, screenshots,
and visual placeholders. Covers aspect ratios, image-text relationships, placeholder
strategy, and quality rules.

## Image Role Classification

Every image on the page must serve one of these roles:

| Role | Purpose | Example |
| --- | --- | --- |
| Hero anchor | The dominant visual that defines the first viewport | Full-bleed photography, product screenshot |
| Product evidence | Shows the actual product, UI, or output | App screenshots, dashboard previews |
| Atmosphere | Sets mood without showing the product | Abstract photography, texture, environment |
| Social proof | Accompanies testimonials or case studies | Headshots, company logos, client screenshots |
| Decorative | Adds visual interest to a section | Background patterns, subtle gradients |
| Informational | Conveys data or process | Diagrams, charts, flowcharts |

Rule: every image must have an assigned role. If you cannot name the role, the image is
filler and should be removed or replaced.

## Aspect Ratio System

Standardize aspect ratios to create visual consistency. Do not mix arbitrary ratios.

| Token | Ratio | Use Case |
| --- | --- | --- |
| `--ratio-hero` | 16:9 or 3:2 | Hero images, full-width sections |
| `--ratio-feature` | 4:3 or 3:2 | Feature images, product screenshots |
| `--ratio-card` | 4:3 or 1:1 | Card thumbnails, grid items |
| `--ratio-avatar` | 1:1 | Team photos, testimonial headshots |
| `--ratio-logo` | variable | Client logos (contain within fixed height) |

Rules:
- Choose 2–3 ratios for a project and use them consistently
- Hero images: prefer wider ratios (16:9 or 3:2) for full-width contexts
- Card images: prefer squarer ratios (4:3 or 1:1) for grid layouts
- All images should use `object-fit: cover` with defined aspect ratios to prevent
  layout shifts and inconsistent cropping
- Use CSS `aspect-ratio` property for responsive image containers

## Image-Text Overlay Rules

When text appears over an image:

### Contrast Requirements

- Text must meet WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- Use one of these methods to ensure contrast:

| Method | When to Use | Implementation |
| --- | --- | --- |
| Dark overlay | General purpose | `background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))` |
| Light overlay | Light theme hero | `background: linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.85))` |
| Scrim gradient | Text at bottom of image | `background: linear-gradient(transparent 40%, rgba(0,0,0,0.7))` |
| Text shadow | Minimal intervention | `text-shadow: 0 2px 12px rgba(0,0,0,0.5)` |
| Safe zone | Most reliable | Place text on a solid/blurred area of the image |

### Safe Zone Strategy

The most reliable approach: choose or crop images that have a **calm tonal area** where
text can sit. This avoids overlays entirely.

- Left-aligned text: choose images with a calm left third
- Center text: choose images with a calm center band
- Bottom text: choose images with a calm bottom half

If the image does not have a natural safe zone, add an overlay. Never place text directly
on a busy image area without contrast treatment.

## Placeholder Strategy

For pages where final images are not available:

### Tier 1: Structured Placeholder (preferred)

Use solid color blocks with aspect ratios maintained:

```css
.placeholder-image {
  background: var(--neutral-50);
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Add a subtle icon or label:
- Use `--icon-xl` (32px) camera or image icon in `--neutral-300`
- Or use text: "Product Screenshot" in `--text-sm`, `--color-muted`

### Tier 2: Gradient Placeholder

For contexts where a solid block feels too stark:

```css
.placeholder-image {
  background: linear-gradient(135deg, var(--neutral-50), var(--neutral-100));
  aspect-ratio: 16/9;
}
```

### Tier 3: AI-Generated Image

When the model has image generation capability:
- Generate images that match the visual thesis
- Specify style constraints: "editorial photography, not 3D rendered"
- Generate mood boards before final assets
- Never use AI-generated images that contain embedded UI, text, or logos

### What NOT to Use as Placeholders

- Stock photo URLs that may break or change
- Gradient blobs pretending to be content
- Lorem ipsum text in image containers
- Screenshots from other products
- Images with embedded watermarks

## Image Quality Rules

### Resolution

- Hero images: minimum 1920px wide for desktop full-bleed
- Feature images: minimum 800px wide
- Card thumbnails: minimum 400px wide
- All images: provide 2x resolution for retina displays
- Use `srcset` and `sizes` attributes for responsive image loading

### File Format

| Format | Use Case |
| --- | --- |
| WebP | Default for photographs (best compression/quality) |
| AVIF | If browser support allows (better than WebP) |
| SVG | Illustrations, diagrams, icons, logos |
| PNG | Screenshots with UI elements (needs sharp edges) |
| JPEG | Fallback for photographs when WebP not supported |

### Loading Performance

- Hero image: preload with `<link rel="preload">`
- Below-fold images: `loading="lazy"`
- All images: explicit `width` and `height` attributes to prevent layout shift
- Serve responsive sizes: 480w, 768w, 1024w, 1920w

## Image Treatment by Visual Thesis

| Thesis | Preferred Image Style | Avoid |
| --- | --- | --- |
| Minimal | Clean, high-contrast, minimal subjects | Busy compositions, warm filters |
| Tech | Dark environments, screen glow, precise | Natural/organic, warm tones |
| Bold | Saturated, high-energy, graphic | Muted, passive, stock-feel |
| Editorial | Documentary, candid, high-contrast B&W or muted | Glossy, over-processed, neon |
| Warm | Natural light, earth tones, people, texture | Cold, clinical, high-contrast |
| Brutalist | Raw, unprocessed, high-contrast, confrontational | Soft, dreamy, filtered |

## Banned Image Practices

- No 3D illustration filler (clay renders, glossy isometric art, floating objects)
- No generic stock photography that says nothing about the product
- No images with embedded UI frames, split-screen compositions, or card mockups
- No images with embedded text or signage that competes with the page typography
- No collages or multi-image compositions in the hero (use one strong image)
- No decorative gradient backgrounds pretending to be visual content
- No AI-generated images with visible artifacts (hands, text, perspective errors)
- No images used purely because they are beautiful — they must serve a role

## Logo Display Rules

For client logos, partner logos, and integration logos:

| Property | Rule |
| --- | --- |
| Format | SVG preferred, PNG acceptable |
| Color | Monochrome (single neutral color) unless brand requires color |
| Height | Fixed: 24–40px for logo strips, 16–24px for inline |
| Spacing | Equal horizontal spacing between logos |
| Alignment | Optically center-aligned (some logos are visually heavier) |
| Filter | Apply `filter: grayscale(100%) opacity(0.5)` for uniform appearance |
| Hover | Optional: restore color on hover |

Logo strips should use 4–8 logos. More than 8 creates visual noise.
If more exist, rotate or paginate.
