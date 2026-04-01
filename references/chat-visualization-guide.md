# Chat Visualization Guide

Use this guide when formatting chat responses so every reply is scannable and decision-friendly.

## Core Rule

If the user needs to compare, confirm, review, or choose — do not rely on prose alone.
Use a structural element. Always.

---

## 1. Alage Status Card

Use when entering a new stage.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 阶段 X / 7  ·  [阶段名称]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✅  [已完成的步骤]
 ✅  [已完成的步骤]
 ▶   当前：[正在做什么]
 ○   待定：[后续步骤列表]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 2. Color Swatches（色卡块）

Use when confirming the color palette. Must output actual color blocks, not just hex values.

**Format:**

```
█ #0f1117   背景色（近黑，冷蓝调）
█ #e8e9f0   主文字（冷白）
█ #5a5d70   次要文字、边框
█ #f0a04b   Accent（强调色）—— 主按钮
█ #1a1d2a   卡片底色（深蓝灰）
```

Use the Unicode full block character `█` before each hex value.
The color description should tell: role + mood, not just the name.

**Example for a warm editorial palette:**

```
█ #f5f0e8   背景色（暖米白，纸质感）
█ #1a1410   主文字（近黑，偏暖）
█ #8c7b6a   次要文字、分割线
█ #c94a2b   Accent（砖红，主标题强调）
█ #ede8df   卡片底色（比背景稍深一档）
```

---

## 3. Known / Assumed / Need Confirm Table

Use when the user is vague and the next decision would otherwise be a guess.

```md
| 项目 | 状态 |
| --- | --- |
| 已知 | 音乐网站、偏沉浸、不要太像模板站 |
| 我先默认 | 首页以氛围建立为主，不先追求强转化 |
| 待确认 | 更偏演出品牌还是个人音乐人作品集 |
```

Then ask one question:
```
现在只确认一个点：它更像"品牌主页"还是"音乐人作品集"？
```

---

## 4. Reference Signal Table

Use when analyzing screenshots, URLs, or moodboards.

```md
| 维度 | 观察 | 可借鉴的 |
| --- | --- | --- |
| 网格 & 布局 | 主视觉左下角锚定，非对称 | 打破居中惯例 |
| 排版层级 | 3 个字号层级，最大/最小比约 6:1 | 层级清晰但不复杂 |
| 艺术感来源 | 超大斜体衬线字压满半屏 | 字体即视觉 |
| 留白节奏 | 宽松展览型，大量负空间 | 给主视觉足够呼吸 |
| 色彩关系 | 米白底 + 单一暗砖红 accent | 克制配色，高级感 |
| 质感/材质 | 轻微纸质噪点纹理 | 增加触感 |
| 动效预期 | 整体给人静态感，无明显动效 | 稳重，不分散注意力 |
| **一句话精华** | **这个页面用字体的体量感取代了图片** | — |
```

Add:
```
借鉴  →  超大 italic 衬线字作为主视觉 · 米白底的留白节奏 · 单一 accent 色
避免  →  直接复刻纸质噪点（本项目是科技方向） · 非对称布局不符合 PRD 的工具感
```

---

## 5. Direction Compare Table

Use when presenting 2-3 visual directions.

```md
| | 方向 A | 方向 B | 方向 C |
|---|---|---|---|
| 视觉论点 | ... | ... | ... |
| Hero 原型 | ... | ... | ... |
| 字体 | ... | ... | ... |
| 艺术处理 | ... | ... | ... |
| 适合原因 | ... | ... | ... |
| 风险 | ... | ... | ... |
```

Then:
```
**推荐：方向 B**
理由：[一句话]

选哪个？
1. 方向 A
2. 方向 B  ← 推荐
3. 方向 C
4. 以 B 为主，混入 A 的 [某个特点]
```

---

## 6. Locked / Pending Checklist

Use during rule confirmation.

```md
**确认状态**
- [x] 视觉方向：Warm Void
- [x] 页面节奏：沉浸 Hero → 精选内容 → About → CTA
- [x] 艺术处理：超大 italic 衬线字
- [ ] 字体组合
- [ ] 色彩（待输出色卡）
- [ ] 动效强度
```

Then ask exactly one question.

---

## 7. Design Law Verification Table

Use before generating spec files. Must show all 8 laws with pass/fail status.

```
设计律令核对
─────────────────────────────────────
✅  字体家族：2 个（Playfair Display + Source Serif 4）
✅  颜色槽：5 个（primary/accent/bg/fg/muted）
✅  单组件彩色：≤ 2 个
✅  按钮高度：统一 44px
✅  卡片：shadow（无混用）
✅  图标：Lucide SVG，outline，20px
✅  标题层级：h1 → h2 → h3（无跳级）
✅  正文行长：max-width: 70ch
─────────────────────────────────────
全部通过 → 可以进入规格生成
```

If any law fails:
```
─────────────────────────────────────
✅  字体家族：2 个
❌  颜色槽：当前 6 个（超出上限 5 个）
✅  按钮高度：统一 44px
...
─────────────────────────────────────
❌ 1 项不通过 → 需要先修正再继续
```

---

## 8. Section Inventory Table

Use when explaining the generated page structure.

```md
| 区域 | 作用 | 设计处理 |
| --- | --- | --- |
| Hero | 建立第一印象 | 全屏，超大 italic 字，无图 |
| Value Prop | 解释核心价值 | 三列，每列一句话 + 图标 |
| Proof | 建立信任 | Logo strip，无额外说明 |
| CTA | 收口 | 暖色强调，按钮居中 |
| Footer | 导航 + 版权 | 深色背景，与 Hero 形成呼应 |
```

---

## 9. Before / After Table

Use when revising a generated page.

```md
| 修改点 | 修改前 | 修改后 | 原因 |
| --- | --- | --- | --- |
| Hero 字体 | Space Grotesk 700 | Cormorant Garamond italic | 参考图信号：字体即视觉 |
| 按钮圆角 | 24px（全圆） | 8px | 与页面直线感一致 |
| 背景 | 纯黑 #000 | 暖米白 #f5f0e8 | 匹配温暖/高奢方向 |
```

---

## 10. File Delivery Table

Use when delivering final artifacts.

```md
| 文件 | 作用 | 需要审查的重点 |
| --- | --- | --- |
| `design-spec.md` | 完整设计规格 | 视觉论点是否准确，艺术处理是否描述清楚 |
| `design-tokens.json` | 机器可读设计变量 | 颜色/间距值是否与确认的一致 |
| `design-tokens.css` | CSS 自定义属性 | 是否所有值都用变量，无硬编码 |
| `html-handoff.md` | 实现交接文档 | Hero 结构是否清晰，不漂移规则是否完整 |
| `index.html` | 最终页面 | 打开后直观感受是否符合视觉论点 |
```

---

## Density Rule

When the message contains more than three facts, they should be grouped.

Preferred grouping order:
1. table — if facts are comparable or inventoriable
2. checklist — if facts represent progress or state
3. bullets — if facts are parallel but not directly comparable

## Anti-Patterns

Do not:
- analyze a reference in 2-3 long paragraphs with no structure
- present multiple directions only as bullets with no comparison table
- say "我理解了" and jump to HTML with no locked/pending state
- describe a color palette without color swatches
- ask a vague follow-up without showing what is already known
- deliver a generated page without a section inventory
