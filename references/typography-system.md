# Typography System Guide

Use this reference when locking typography decisions. It supplements the type scale and
weight rules in `universal-rules.md` with concrete font recommendations, pairing logic,
and multilingual rules.

## Font Stack Recommendations by Direction

Each direction provides a primary recommendation and one alternative. All fonts must be
available via Google Fonts CDN. Always include system fallbacks.

### Minimal / Clean

| Role | Primary | Alternative | Fallback |
| --- | --- | --- | --- |
| Display | Instrument Serif | Cormorant Garamond | Georgia, serif |
| Body | Instrument Sans | Satoshi | Helvetica Neue, sans-serif |

Pairing logic: serif display + clean sans body creates quiet authority.
If single-family: use Instrument Sans at varying weights.

### Tech / Futuristic

| Role | Primary | Alternative | Fallback |
| --- | --- | --- | --- |
| Display | Space Grotesk | Chakra Petch | Arial Black, sans-serif |
| Body | Inter | Geist | Helvetica Neue, sans-serif |

Pairing logic: geometric display + neutral body. Display carries personality.
If single-family: use Space Grotesk or Geist across everything.

### Bold / Expressive

| Role | Primary | Alternative | Fallback |
| --- | --- | --- | --- |
| Display | Bricolage Grotesque | Clash Display | Impact, sans-serif |
| Body | DM Sans | General Sans | Helvetica Neue, sans-serif |

Pairing logic: high-contrast display + friendly body. Display is chunky and loud.
If single-family: use DM Sans with heavy weights for display.

### Editorial / Magazine

| Role | Primary | Alternative | Fallback |
| --- | --- | --- | --- |
| Display | Playfair Display | Lora | Times New Roman, serif |
| Body | Source Serif 4 | Libre Baskerville | Georgia, serif |

Pairing logic: high-contrast serif display + readable serif body. All-serif system.
If mixing: serif display + sans body (Source Sans 3) also works.

### Warm / Friendly

| Role | Primary | Alternative | Fallback |
| --- | --- | --- | --- |
| Display | Nunito | Quicksand | Verdana, sans-serif |
| Body | Outfit | Lexend | Helvetica Neue, sans-serif |

Pairing logic: rounded display + humanist body. Soft geometry throughout.
If single-family: use Nunito at varying weights.

### Brutalist / Raw

| Role | Primary | Alternative | Fallback |
| --- | --- | --- | --- |
| Display | JetBrains Mono | IBM Plex Mono | Courier New, monospace |
| Body | JetBrains Mono | IBM Plex Mono | Courier New, monospace |

Pairing logic: single monospace family. Weight and size carry all hierarchy.

## Font Pairing Rules

1. Maximum 2 families per project. This is a hard rule.
2. Pair by contrast, not similarity:
   - serif + sans-serif (most reliable)
   - geometric + humanist
   - mono + sans (for tech contexts)
3. Never pair two fonts with similar x-height and weight — they will look like a mistake.
4. The display font carries personality. The body font stays invisible.
5. Display font must have weights 600–800 available.
6. Body font must have 400 and 600 available.
7. Test the pair at hero size (56–72px display) and body size (16px body) simultaneously.
   If they feel disconnected, try the alternative.

## Bilingual Typography Rules (Chinese + English)

When a page uses both Chinese and English, the relationship must be defined explicitly.
Do not let the model guess.

### Strategy A: Chinese Dominant

Use when Chinese is the primary content language and English appears as labels,
tags, or secondary text.

| Property | Chinese | English |
| --- | --- | --- |
| Font family | Noto Serif SC | Use preset display/body fonts |
| Heading scale | 1× (normal) | 0.7×–0.85× relative to Chinese |
| Body scale | 1× | 0.9× |
| Weight offset | +100 heavier than English at same level | baseline |
| Role | Headlines, body copy, CTAs | Labels, eyebrows, metadata, technical terms |

Example:
- Chinese h1: 48px / 700
- English subtitle under it: 18px / 400
- This creates "中文大而粗，英文小而精" — the display contrast drives the entire layout.

### Strategy B: English Dominant

Use when English is the primary content language and Chinese appears as
translations, annotations, or secondary context.

| Property | Chinese | English |
| --- | --- | --- |
| Font family | Noto Sans SC | Use preset display/body fonts |
| Heading scale | 0.9× relative to English | 1× (normal) |
| Body scale | 1× | 1× |
| Weight offset | Same as English | baseline |
| Role | Supporting translations, secondary text | Headlines, body copy, CTAs |

### Strategy C: Equal Bilingual

Use for truly bilingual pages where both languages have equal hierarchy.

| Property | Chinese | English |
| --- | --- | --- |
| Font family | Noto Serif SC or Noto Sans SC (match preset serif/sans choice) | Use preset display/body fonts |
| All scales | 1× | 1× |
| Weight | Same | Same |
| Layout | Stacked (Chinese above English) or parallel columns | — |

### Chinese Font Selection

| Context | Recommended | Alternative |
| --- | --- | --- |
| Serif-leaning design | Noto Serif SC | LXGW WenKai |
| Sans-leaning design | Noto Sans SC | Source Han Sans SC |
| Editorial / print feel | LXGW WenKai | Noto Serif SC |

Rules:
- Chinese fonts are large files. Always load only the weights needed.
- Chinese body text looks best at 16–18px. Below 15px legibility drops.
- Chinese line-height should be 1.7–1.8 (slightly more than Latin text).
- Chinese letter-spacing should stay at 0 or slightly positive (never negative).

## Variable Fonts

When performance matters, prefer variable font versions:

| Static Font | Variable Equivalent |
| --- | --- |
| Inter | Inter Variable |
| Source Serif 4 | Source Serif 4 Variable |
| Instrument Sans | Instrument Sans Variable |
| DM Sans | DM Sans Variable |

Variable fonts reduce HTTP requests and enable fluid weight transitions.
Load via: `&display=swap` on Google Fonts URL for better perceived performance.

## Anti-Patterns

- Using Inter as a default without considering the visual thesis
- Pairing two sans-serif fonts that look almost identical
- Using a decorative display font for body text
- Loading 5+ font weights when 2–3 would suffice
- Setting Chinese text in a Latin-only font (causes system font fallback flash)
- Negative letter-spacing on Chinese characters
- Using the same font size for Chinese and English when one should be subordinate

---

## Artistic Type System（艺术字系统）

Use this section when proposing visual directions. Every direction must include one artistic treatment for the hero display font.

### Artistic Treatment Options

| Treatment | Description | Best For |
|---|---|---|
| 超大字裁切 (Oversized Crop) | Type larger than container, edges clipped, creates visual tension | Dark · Fashion · Experimental |
| 透明镂空字 (Knockout Type) | Text acts as a window — background shows through letterforms | Creative · Art · Luxury |
| 极端 tracking (Extreme Tracking) | Letter-spacing pushed to 0.3em or compressed to -0.04em | Tech · Minimal · Poster |
| 超大 italic 衬线 (Giant Italic Serif) | Oversized italic serif occupying half the screen | Editorial · Magazine · Luxury |
| 中英混排不对称 (Asymmetric CJK Mix) | Chinese text at hero scale, English at caption scale — extreme contrast | Cultural · Exhibition · Brand |
| Variable weight 动画 (Variable Weight Anim) | Font weight changes in real-time with mouse/scroll | Interactive · Tech · Creative |
| 文字作为纹理 (Type as Texture) | Repeated text tiled as background layer | Brand · Magazine · Dark |
| 渐变描边字 (Gradient Outline) | Text rendered as outline only, fill is gradient or transparent | Futuristic · Tech · Dark |

### Font × Direction × Treatment

| Visual Direction | Display Font | Body Font | Artistic Treatment |
|---|---|---|---|
| 未来 / 科技 | Space Grotesk / Chakra Petch | Inter / Geist | 全大写 + tracking -0.03em + 细线框 |
| 编辑 / 杂志 | Cormorant Garamond / Playfair Display | Source Serif 4 / Libre Baskerville | 超大 italic，与正文形成 10:1 尺寸对比 |
| 极简 / 高奢 | Bodoni Moda / DM Serif Display | Instrument Sans / Inter | 粗细极端对比的衬线，给足留白 |
| 活力 / 创意 | Syne / Bricolage Grotesque | DM Sans / General Sans | 不规则字重 + 斜体混用 |
| 暗黑 / 酷 | Bebas Neue / Big Shoulders Display | Inter / Geist | 全大写 + tracking 0.2em + 反白 |
| 温暖 / 亲和 | Nunito / Fraunces | Outfit / Lexend | 圆润字形 + 适度字重对比 |
| 极简 / 工具 | Geist / DM Mono | Inter / JetBrains Mono | 等宽风格 + 轻字重 + 均匀间距 |
| 国潮 / 文化 | Noto Serif SC / LXGW WenKai | Noto Sans SC | 中文超大 + 英文极小，中英混排不对称 |

### CSS Implementation Examples

**超大字裁切 (Oversized Crop):**
```css
.hero-title {
  font-size: clamp(120px, 18vw, 220px);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 0.85;
  overflow: hidden;
  /* Parent must have overflow: hidden */
}
```

**透明镂空字 (Knockout Type):**
```css
.hero-title {
  font-size: clamp(80px, 12vw, 160px);
  font-weight: 800;
  background: url('your-texture.jpg') center / cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**极端 tracking:**
```css
/* Wide version */
.hero-title {
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-weight: 400; /* Light weight + wide spacing = elegant */
}

/* Tight version */
.hero-title {
  letter-spacing: -0.04em;
  font-weight: 800; /* Heavy weight + tight spacing = power */
}
```

**Variable Weight Animation:**
```css
@supports (font-variation-settings: normal) {
  .hero-title {
    font-family: 'Inter Variable', sans-serif;
    font-variation-settings: 'wght' 400;
    transition: font-variation-settings 0.3s ease;
  }
  .hero-title:hover {
    font-variation-settings: 'wght' 800;
  }
}
```

### Rules

- Each project uses exactly ONE artistic treatment. Do not combine.
- Artistic treatment applies only to the hero display font. Body text stays neutral.
- The treatment must be consistent with the visual thesis. Not decorative for its own sake.
- If the treatment requires a specific font (e.g., variable fonts for weight animation), confirm font availability before proposing.
