---
name: htmlcraft
description: >
  HTML 创意产出标准系统。支持三种输出类型：网页设计（landing page、产品页、作品集）、
  HTML 调研报告（图文并茂、可打印）、HTML PPT（全屏幻灯片）。
  当用户想设计任何 HTML 页面、报告或演示时触发。需要引导式设计流程、参考图分析、
  或想避免 AI 通用模板感时使用。命令：/htmlcraft 或 /using htmlcraft
---

# HTMLCraft — HTML 创意产出标准系统

**调用命令：** `/htmlcraft` · `/using htmlcraft`
**适用场景：** 网页设计 · HTML 调研报告 · HTML PPT

---

## 这个技能做什么

这是一个**设计规范系统生成 + 审计**流程，不是普通网页生成流程。先把问题定义清楚，再把视觉论点压缩成 design tokens，再由 tokens 派生规范文件与 HTML，最后用交付物反向审计实现。

**核心链路：**
PRD → 参考图 → 视觉论点 → Tokens → 规范文件 → HTML 映射 → 审计

**模式：**
- **System Build Mode**：从零生成设计规范系统，核心产物是 `design-tokens.css`
- **Audit / Revision Mode**：已有交付物时，不重走设计流程，直接基于交付物审计与修订

**交互原则：**
- 能一起问的问题，尽量一轮打包问完
- 能从交付物读出来的信息，不再反问用户
- 若检测到完整交付物，则**不允许**重跑前序设计流程，必须直接审计

**主张：** HTML 不是源头，只是映射层；`design-tokens.css` 才是设计系统的第一真值。

---

## 设计律令（Hard Laws）

不可协商的硬规则，任何项目、任何阶段都不得违反。

```
字体家族       最多 2 个（1 display + 1 body，或只用 1 个）
颜色命名槽     恰好 5 个：primary / accent / bg / fg / muted
单组件内彩色   最多 2 个（不含黑白灰）
按钮高度       全页统一 1 个值，最小 44px（触控最小尺寸）
卡片定义       shadow 或 border，二选一，不能混用
图标           SVG only，一个 family，outline 或 solid 选一种，尺寸只用 16/20/24px
标题层级       不能跳级（h1 → h3 是违规）
正文行长       最多 70ch（用 max-width 强制）
正文最小字号   16px（可读下限）；UI label 最小 12px
间距基数       4px，常用步长：4/8/12/16/24/32/48/64/96px
对比度         正文 ≥ 4.5:1；大字/UI组件 ≥ 3:1（WCAG AA）；禁用态豁免
纯黑禁用       正文不用 #000000，用近黑（如 #111827）；纯白底色同理
色彩组合       单个画面最多 5 个颜色（含黑白灰）
响应式         所有页面必须适配移动端（375px）和桌面端（1280px），不可选
```

**来自 Carbon / Polaris / M3 / Radix 的额外硬规则：**
```
小文字加间距   12px 以下文字，letter-spacing ≥ 0.05em（提升可读性）
大字减间距     48px 以上标题，letter-spacing ≤ -0.02em（收紧视觉）
字重与尺寸反比 36px+ 标题用 weight 300–400；72px+ 用 weight 100–300（Carbon 规则）
行高下限       任何文字 line-height 不得低于 1.2（WCAG 1.4.12）
section 间距   相邻区块之间最小 32px（组件内间距 × 2 倍以上）
图标文字间距   图标与相邻文字之间最小 8px
圆角统一       同一组件族使用相同 radius，不在一组内混用 4px 和 12px
破坏性按钮     删除/清空类按钮必须与确认/取消按钮视觉分离，最小间距 16px
禁止用色传意   颜色不是唯一信息载体（必须搭配图标或文字）
动效性能       只 animate transform / opacity，禁止 animate width/height/margin
高度动画       用 grid-template-rows: 0fr → 1fr，不 animate height
```

**来自 Vercel Web Design Guidelines / Impeccable 的额外硬规则：**
```
CSS 排版规则：
  text-wrap: balance    标题和短文本强制使用（防止尾行单字）
  font-variant-numeric: tabular-nums   数字列表/价格/日期等对齐场景
  min-width: 0          flex 子项必加（防止文本溢出容器）
  text-rendering: optimizeLegibility   正文可选

图片规则：
  <img> 必须有          width + height 属性（防止布局偏移 CLS）
  首屏图片              fetchpriority="high"
  非首屏图片            loading="lazy"
  object-fit: cover     图片容器必须限高

颜色空间：
  推荐 oklch()          perceptually uniform，替代 hsl()
  色调中性色            给灰色加 0.01 chroma 的品牌色调（自然感）
  暗色模式表面层级      用 lightness 步进（15% → 20% → 25%），不用 shadow
  暗色模式字重          比亮色模式减一级（400 → 350），浅色字在暗底上视觉更粗

交互安全规则：
  touch-action: manipulation    触屏元素必加（禁止双击缩放延迟）
  overscroll-behavior: contain  模态框 / 抽屉内必加（防止穿透滚动）
  -webkit-tap-highlight-color   显式设置（不留默认高亮）
  列表 >50 条           必须虚拟化（IntersectionObserver 或 virtual scroll）

排版标点规则：
  省略号用 …            不用 ...（三个点）
  引号用 " "            不用 " "（直引号）
  数字与单位间          用 &nbsp;（如 10&nbsp;MB、⌘&nbsp;K）
```

**动效时长分级（按交互类型严格对应，不猜）：**
```
即时反馈  100–150ms    按钮点击、开关切换、checkbox
状态变化  200–300ms    hover 高亮、tab 切换、tooltip 弹出
布局展开  300–500ms    手风琴、模态框、抽屉
入场动画  500–800ms    页面加载、section 滚动进入
退出动画  = 入场 × 75%  例如入场 600ms → 退出 450ms

easing 选择：
  进入屏幕  ease-out-expo → cubic-bezier(0.16, 1, 0.3, 1)
  离开屏幕  ease-in      → cubic-bezier(0.7, 0, 0.84, 0)
  往返切换  ease-in-out  → cubic-bezier(0.65, 0, 0.35, 1)
  禁止使用  bounce / elastic easing

stagger   animation-delay: calc(var(--i, 0) * 50ms)
          超过 10 个元素时 cap 总时长，不让入场拖太久
```

每次进入设计系统确认前，必须输出律令核对表。

---

## 可视化规则

**目标**：每条回复都像一个界面，不是文字墙。

### 阶段状态卡（每次进入新阶段时输出）

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 阶段 2 / 6  ·  需求确认 + PRD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✅  输出类型已确认
 ▶   当前：整理需求，生成 PRD
 ○   待定：参考图 · 视觉方向 · 设计系统 · 构建
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 颜色色卡（确认调色板时必须输出）

```
█ #0f1117   背景色（近黑，冷蓝调）
█ #e8e9f0   主文字（冷白）
█ #5a5d70   次要文字、边框
█ #f0a04b   Accent（强调色）—— 主按钮
█ #1a1d2a   卡片底色（深蓝灰）
```

### 专业词首次出现时括号内一句话（只一次，不重复）

- "display font（大标题专用字体）"
- "token（设计变量，统一管理所有颜色和间距）"
- "hero（首屏，页面最顶部的主视觉区）"
- "CTA（行动按钮，引导用户点击的核心按钮）"
- "tracking（字母间距）"
- "kerning（字距微调）"
- "Polish（打磨，最终交付前的精修阶段）"

### 触发矩阵

| 情境 | 格式 |
|---|---|
| 进入新阶段 | 阶段状态卡 |
| 参考图分析 | 信号表 + 借鉴/避免 |
| 提出方向选择 | 对比表 + 推荐 + 编号选项 |
| 确认颜色 | 色卡块 |
| 信息不确定 | 已知/默认/待确认 三列表 |
| 确认规则 | 已锁定/待定 核对表 |
| 解释页面结构 | 区域清单表 |
| 报告修改 | 修改前后对比表 |
| 交付文件 | 文件清单表 |

读取 `references/chat-visualization-guide.md` 获取完整格式示例。

---

## Preflight：交付物扫描 + 模式判断

会话开始时，若用户上传了文件、压缩包，或当前目录中已有项目文件，**先扫描是否存在以下交付物：**

- `.htmlcraft.md`
- `design-spec.md`
- `design-tokens.css`
- `design-tokens.json`
- `html-handoff.md`
- `index.html`

### 模式判断规则

#### A. Audit / Revision Mode（优先级最高）
若扫描命中以下核心交付物组合，视为该项目**已经用过 HTMLCraft，设计规范系统已建立**：

- `.htmlcraft.md`
- `design-spec.md`
- `design-tokens.css`
- `html-handoff.md`
- `index.html`

此时：
- **不得**重新询问 PRD、参考图、视觉方向、设计系统
- **不得**重走 Stage 0–7
- 必须直接进入 **Stage 8：Audit-Only 审计规则**，并以 Stage 7 审计格式输出结果
- 先读交付物，再判断是否存在漂移、违规、缺失、断裂

#### B. Partial Audit Mode
若只命中部分交付物，说明项目可能进行到一半，或交付物不完整。

此时：
- 先输出“已检测到哪些交付物、缺哪些交付物”
- 优先执行一次部分审计
- 若核心设计文件明显缺失，再决定是否回到正常流程补齐

#### C. System Build Mode
若没有命中任何交付物，再进入正常设计流程。

### Audit / Revision Mode 的首要任务

当命中完整交付物时，第一件事不是设计，而是：

1. 读取 `.htmlcraft.md`
2. 读取 `design-spec.md`
3. 读取 `design-tokens.css`
4. 读取 `html-handoff.md`
5. 读取 `index.html`
6. 基于交付物输出审计报告，并以 `design-tokens.css` 为第一比对基准

审计重点：
- 当前页面是否偏离既定视觉论点
- 当前实现是否真的遵守 design tokens
- 区块顺序、Hero 原型、CTA、组件规则是否漂移
- 是否出现 AI 通用化回退
- 是否存在交付物之间互相矛盾的情况

---

## Stage 0：输出类型选择

**仅在 Fresh Design Mode 下执行。**

会话开始时先确认类型。

```
三种输出类型：

A  网页设计     landing page · 产品页 · 作品集 · 任何公开网页
B  HTML 报告    调研报告 · 白皮书 · 分析文档（图文并茂，支持打印）
C  HTML PPT     演示幻灯片（全屏 · 翻页 · 大字大图）
```

如果用户描述已明确类型，直接确认并跳到 Stage 1。

| 维度 | 网页 | 报告 | PPT |
|---|---|---|---|
| 设计重点 | Hero · 首屏冲击 · CTA | 信息层级 · 目录 · 引用 | 全屏布局 · 幻灯片节奏 |
| 字号策略 | Hero 大字 + 正文 | 标题层级清晰 + 正文可读 | 超大字 + 极少文字 |
| 参考类型 | 网站截图 / 品牌页 | 报告设计 / 杂志排版 | PPT 模板 / 海报 |

---

## Stage 1：需求摄入

**仅在 System Build Mode 下执行。**

目标不是把用户问累，而是**一轮尽量收齐 PRD 所需信息，并顺带把参考依据一起收进来**。

### 提问原则
- 能一起问的，不拆成多轮
- 能默认的，不追问
- 能从用户给的文件、截图、链接推断的，不反问
- 第一轮就同时收：PRD 必需项 + 参考依据 + 关键约束

### 推荐的一轮式 intake（优先）
- 页面 / 报告 / PPT 的主题
- 目标用户是谁
- 核心目标是什么（转化 / 信任 / 展示 / 信息传递）
- 必须有的内容
- 明确不要的内容
- 品牌名 / Logo 状态
- 查看设备（手机 / 电脑 / 两者都要）
- 页面用途（本地查看 / 发给别人 / 部署上线）
- 视觉风格偏好 + 参考依据（有没有参考图、喜欢的网站、讨厌的网站，至少提供其一）
- 反信号（明确不喜欢的颜色、风格、元素）
- 是否会扩展成多页面

对模糊表达，转成设计可操作语言。"高级""简洁""有格调"不是规格，是方向线索。

---

## Stage 1.5：PRD 输出（需求确认门）

用户说完需求后，进入参考依据与视觉论点之前，必须：

1. 把需求提炼成清晰、可操作的语言
2. 输出 PRD 供用户确认
3. 用户确认后才进入 Stage 2

**PRD 格式：**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PRD · [项目名]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

| 项目 | 内容 |
|---|---|
| 输出类型 | 网页 / 报告 / PPT |
| 一句话定位 | ... |
| 核心用户 | ... |
| 核心场景 | 1–3 条 |
| 页面唯一任务 | ... |
| 必须有 | ... |
| 明确不做 | ... |
| 成功标准 | ... |

```
这份 PRD 准确吗？有要调整的地方吗？
确认后进入参考依据确认与视觉论点锁定。
```

如果用户给了完整 brief，直接输出 PRD 并问"这份总结准确吗"，不必重新问原始问题。

读取 `references/prd-template.md` 获取模板细节。

---

## Stage 2：参考依据确认门

进入 Stage 3 前，必须完成以下二选一之一：

A. 已收到至少 1 张参考图或 1 个 URL，并输出参考分析表  
B. 已明确向用户确认“本项目无参考图，后续视觉方向将仅由 PRD 推导”，并输出无参考图确认块

**未完成 A 或 B，不得进入视觉方向提案。**

### 支持的输入方式
- 用户上传截图 → 直接视觉分析（推荐，最准确）
- 用户提供 URL → 抓取后分析
- 用户明确表示没有参考图 → 进入“无参考图确认模式”

### 视觉参考的两次确认（必须执行）

**第一次确认（轻提醒）：**
在 PRD 确认后，先自然地问一句：

> “您有什么视觉参考图、喜欢的网站截图，或者想借鉴的页面吗？”

**第二次确认（明确影响）：**
如果用户没有给、回答含糊，或者跳过这一点，必须再明确确认一次：

> “如果方便的话，您可以发 1–3 张视觉参考图；如果没有，我就按无参考图模式继续，但视觉方向会更依赖 PRD 推导。您这边要上传参考图吗？”

只有完成这两次确认后，用户仍明确不提供参考图，才能进入“无参考图确认模式”。

### 有参考图时的输出格式（必须先详细分析，再做三步确认）

**第一步：先输出详细分析表格（每张参考图都要有）**

| 维度 | 观察 | 可借鉴的 |
|---|---|---|
| 网格 & 布局 | 是否有明确列网格？主视觉如何锚定？ | ... |
| 排版层级 | 几个字号层级？最大/最小字比例？ | ... |
| 艺术感来源 | 字体？字重对比？排版构成？色彩？ | ... |
| 留白节奏 | 紧密工具型还是宽松展览型？ | ... |
| 色彩关系 | 主色比例？是否有强对比？温度？ | ... |
| 质感/材质 | 噪点？渐变？玻璃感？纸质感？ | ... |
| 动效预期 | 给人静态还是动态的感受？ | ... |
| **一句话精华** | **这个页面的审美核心是什么？** | — |

借鉴  →  [具体可以拿来用的 2-3 个结构/手法]  
避免  →  [不适合本项目的 1-2 个点]

**第二步：分析完后，必须向用户做三步确认，不能直接进入视觉论点或 tokens。**

确认顺序如下：

1. **确认具体是哪一个**  
   如果用户给了多张图或多个网站，必须确认优先参考对象：  
   > “这几张里，您更想让我主要参考哪一个？”

2. **询问用户分析得对不对**  
   > “我刚刚对这张图的理解和拆解，对吗？有没有哪一点您觉得我理解偏了？”

3. **询问用户具体想参考什么内容**  
   > “您更希望我参考这个网站 / 这张图的什么内容？是排版、配色、封面气质、Hero 结构，还是整体世界观？”

只有完成这三步确认后，才能把参考图信号纳入后续视觉论点和 token 生成。

### 无参考图时的强制确认格式

若用户没有提供参考图或 URL，**不得直接跳过**。必须完成两次视觉参考确认后，再输出如下确认块：

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
参考依据确认
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
状态：无参考图
影响：后续视觉方向仅根据 PRD 推导，不引用现成视觉信号
风险：更容易出现抽象化、模板化或审美偏差
建议：至少提供 1 张喜欢/讨厌的网站截图，可显著提高方向准确性
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

然后再进入 Stage 3，并明确说明：
“以下方向由 PRD 推导，无参考图输入。”

### 多参考输入冲突时

若多张参考图或多个 URL 的视觉信号冲突，必须明确指出冲突点，并让用户选择优先方向后再继续。

---

## Stage 3：视觉论点锁定

这一步的目标不是“挑一个好看风格”，而是**锁定一个足够强、足够可编译成 tokens 的视觉论点**。

允许先提出 **2-3 个视觉论点候选**，但最终必须收敛成 1 个主论点。每个候选都必须 materially（本质上）不同，而不是同一风格的轻微变体。

**每个候选包含：**

| 项目 | 内容 |
|---|---|
| 视觉论点 | 一句话：这个页面住在什么世界里？ |
| 为什么适合 | 与 PRD 和参考依据的关系 |
| Hero 原型 | 命名（来自 homepage-layout-library.md） |
| 字体倾向 | display / body 的气质方向 |
| 色彩哲学 | 冷暖、对比、accent 使用原则 |
| 艺术处理 | Hero 的独特处理手法 |
| Token 方向 | 这套论点会如何影响字号、圆角、边框、节奏 |
| 风险 | 可能出现的问题 |
| 反 AI 点 | 如何避免落回通用模板 |

**输出要求：**
- 用对比表呈现 2-3 个候选
- 推荐 1 个
- 用户确认后，立即把它写入 `.htmlcraft.md` 草稿和后续 token 生成依据

读取 `references/philosophy-guide.md` 转化视觉论点。
读取 `references/homepage-layout-library.md` 选取 Hero 原型。

---

## Stage 3.5：Hero 原型锁定（网页类型）

方向确认后，显式锁定：

| 字段 | 决策 |
|---|---|
| hero_archetype | 原型名（来自 homepage-layout-library.md） |
| hero_objective | 让用户感受到什么 |
| hero_anchor | 主视觉锚点在哪里 |
| hero_copy_posture | 宣言型 / 问题型 / 沉浸型 |
| hero_cta_posture | 强驱动 / 轻引导 |
| hero_to_section2_transition | 第一屏到第二屏如何衔接 |

---

## Stage 4：设计系统确认

### Group A · 排版 + 色彩（一起确认）

排版：
- display font vs body font 的关系和对比度
- 艺术化处理方式（见艺术字系统）
- 字号层级数量
- 中英文混排策略（如有）

色彩：
- 色调主导（冷/暖/中性）
- accent（强调色）用在哪里，用多少
- 对比哲学（强对比 vs 柔和过渡）

**确认时必须输出色卡块。**

参考 `references/typography-system.md` + `references/universal-rules.md`

### Group B · 组件 + 动效（一起确认）

组件：
- 按钮（高度、圆角、filled vs ghost）
- 卡片（shadow 还是 border，不可混用）
- 导航（fixed 还是 static）
- 图标库（family + outline/solid）

动效：
- 整体强度（quiet / crisp / cinematic）
- 什么会动 / 什么保持静止

参考 `references/iconography-guide.md` + `references/imagery-strategy.md`

### 律令核对门（确认前必须输出）

```
设计律令核对
─────────────────────────────────────
✅  字体家族：2 个（Space Grotesk + Inter）
✅  颜色槽：5 个（primary/accent/bg/fg/muted）
✅  单组件彩色：≤ 2 个
✅  按钮高度：统一 44px
✅  卡片：border（无混用）
✅  图标：Lucide SVG，outline，20px
✅  标题层级：h1 → h2 → h3（无跳级）
✅  正文行长：max-width: 70ch
─────────────────────────────────────
全部通过 → 可以进入规格生成
```

---

## Stage 5：规格文件生成

**必须生成（5 个，按优先级排序）：**
1. `design-tokens.css` — **第一交付物 / 第一真值**
2. `design-tokens.json` — 机器可读设计变量镜像
3. `design-spec.md` — 完整设计规格
4. `html-handoff.md` — 实现交接文档
5. `.htmlcraft.md` — 项目上下文锁定文件（新会话 / 新模型也能读取）

**`.htmlcraft.md` 格式（必须生成在项目根目录）：**

```markdown
# HTMLCraft 项目上下文

## 基本信息
- 项目名：[名称]
- 输出类型：[网页 / 报告 / PPT]
- 目标用户：[描述]
- 品牌名/Logo：[已有 / 需生成]

## 视觉论点
[一句话定义这个页面住在什么世界里]

## 设计决策摘要
- Hero 原型：[名称]
- 调色板：bg=[hex] / fg=[hex] / accent=[hex] / primary=[hex] / muted=[hex]
- Display 字体：[名称]
- Body 字体：[名称]
- 艺术处理：[手法名称]
- 动效强度：[quiet / crisp / cinematic]
- 卡片风格：[shadow / border]
- 按钮高度：[值]px

## 反信号（不做的事）
- [用户明确拒绝的风格/元素]

## 文件清单
- design-spec.md
- design-tokens.css
- design-tokens.json
- html-handoff.md
- index.html
```

**这些文件的关系：**
- `design-tokens.css`：第一真值
- `design-tokens.json`：结构化镜像
- `design-spec.md`：人读规范
- `html-handoff.md`：映射约束
- `.htmlcraft.md`：上下文入口

**`.htmlcraft.md` 的作用：**
- 新会话时先读 `.htmlcraft.md`，无需重新走设计流程
- 跨模型（Claude / GPT / Gemini）协作时提供统一上下文
- Revision Mode 读取此文件判断修改是否脱离原始设计

**视情况生成：**
5. `prd.md` — Stage 1.5 已生成，此处归档
6. `implementation-breakdown.md` — 页面复杂时
7. `ui-foundation-spec.md` — 需要详细交互规格时

生成后输出文件清单表，问用户是否确认进入构建。

读取 `references/artifact-templates.md` 确保每个文件密度达标。

### 交付锁定提醒（生成规格文件后必须输出）

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 重要：设计规格文件是这个项目的「设计宪法」
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 请把以下文件和 index.html 保存在同一个文件夹：
   · .htmlcraft.md        项目上下文（最重要，新会话入口）
   · design-spec.md       设计决策总表
   · design-tokens.css    所有颜色和间距变量
   · design-tokens.json   机器可读版本
   · html-handoff.md      实现交接说明

 后期修改时，告诉我「按规格修改」，
 我会先读 .htmlcraft.md 和 design-tokens.css，再动代码。
 这样每次改动都不会脱离原始设计系统。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Stage 6：HTML 映射（从 Tokens 到页面）

通过 Stage 5 确认门后才能开始 HTML 映射。HTML 不是设计真值，只是把 tokens 和规范文件落实成页面。

**映射顺序：**
1. 引入 `design-tokens.css`，建立布局 shell
2. 把 Hero 原型映射为首屏结构
3. 把 section plan 映射为主内容区
4. 把 CTA / Footer / 组件系统映射为具体 HTML
5. 映射交互状态与响应式
6. 做一轮 Polish，但不得发明新的设计规则

每段构建后读取 `references/verification-playbook.md` 做验证，通过后才继续。

**所有样式必须引用 CSS 变量，不允许硬编码颜色 / 间距 / 圆角 / 字体值。**

读取 `references/implementation-breakdown-guide.md` 在构建前定义分段计划。

### 响应式强制规范（所有类型页面必须执行）

```
断点（Mobile-first）：
  mobile:  375px   基准设计宽度
  tablet:  768px   折叠节点
  desktop: 1280px  宽屏布局

必须通过的响应式检查：
  ✅  导航：移动端折叠成 hamburger 或简化菜单
  ✅  Hero：移动端文字不溢出，图片不裁掉关键内容
  ✅  卡片网格：desktop 多列 → mobile 单列
  ✅  字号：Hero 大字 mobile 缩小（clamp() 或媒体查询）
  ✅  间距：section padding mobile 减半
  ✅  按钮：移动端触控区域 ≥ 44px
  ✅  正文行长：mobile 不需要 70ch 限制，自然换行即可
  ✅  横向滑动区域：提供触摸滑动支持
```

---

## Stage 6.5：修改影响评估 + 审计回执

**触发条件**：用户在实现阶段或已交付页面上继续提出修改请求。

### 目的
让“修改”不只是继续改代码，而是进入一个可感知、可追踪、可回滚的审计闭环。

### 每次修改前必须输出：修改影响评估

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
修改影响评估
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
修改项：[具体改动]
修改类型：[颜色 / 间距 / 字体 / 区块 / 布局 / 动效 / 文案]
当前值：[原值]
目标值：[新值]
影响范围：[受影响区块 / 组件 / 状态]
是否触及设计系统：[否 / 是，说明触及哪些 token 或规则]
是否可能破坏视觉论点：[否 / 是，说明风险]
操作方式：[只改 token / 改 HTML + token / 改结构]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 修改后必须输出：审计回执

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
审计回执
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
本轮修改：[一句话总结]
审计结果：[通过 / 警告 / 未通过]

新增通过项：
- ...

新增风险项：
- ...

未解决项：
- ...

系统状态：
- Hero 原型：[保持 / 偏移]
- Design Tokens：[一致 / 漂移]
- Component 一致性：[通过 / 警告]
- Responsive：[通过 / 待复查]
- Anti-Slop：[通过 / 警告]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 规则
- 用户每提出一次修改，都必须经过“修改影响评估 → 审计回执”
- 若审计发现问题，不得直接宣称完成
- 连续 3 次以上修改后，必须补跑一次完整审计
- 若修改触及 Hero 原型、字体系统、主色逻辑、布局骨架，必须提醒用户这属于“上游决策变更”

---

## Stage 7：审计（最终关口）

这是主流程的最后一步。**没有审计通过，就没有完成。**

### 审计依据（必须基于交付物，不凭记忆）

按以下顺序读取并审计：
1. `.htmlcraft.md` — 项目上下文与视觉论点
2. `design-spec.md` — 设计决策与结构定义
3. `design-tokens.css` — 当前 token 真值（第一比对基准）
4. `html-handoff.md` — 实现约束与 section 计划
5. `index.html` — 最终交付物本体

### 审计目标
- 页面是否偏离原始视觉论点
- HTML 是否真的服从 token
- 组件 / 排版 / Hero / CTA 是否发生无意识漂移
- 交付物之间是否一致
- 实现是否重新滑向 AI 通用模板

### 审计输出格式（必须显式输出）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
交付物审计
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
审计模式：[最终审计 / Audit-Only / 连续修改复核]
交付物状态：[完整 / 部分缺失 / 严重缺失]
视觉系统状态：[一致 / 轻微漂移 / 严重漂移]
实现系统状态：[稳定 / 存在断裂]
结论：[通过 / 警告 / 未通过]

已通过：
- ...

发现的漂移：
- ...

交付物冲突：
- ...

建议修正：
- ...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 必查项
- `.htmlcraft.md` 的视觉论点是否仍成立
- `design-spec.md` 与 `html-handoff.md` 的 section plan 是否仍匹配
- `design-tokens.css` 是否仍是单一真值来源
- `index.html` 是否绕开 token 写死颜色 / 间距 / 圆角 / 字体
- Hero 是否仍符合已锁定 archetype
- CTA、按钮、卡片、图标是否全页一致
- 页面是否重新滑回 AI slop 指纹

### 最终规则
- 若审计发现问题，**不得**宣称项目完成
- 审计不是附属动作，而是最终关口

---

## Stage 8：Audit-Only Mode（已有交付物时直接进入）

**触发条件：**
- 已完成页面实现并准备交付
- 用户上传已有项目文件 / 压缩包
- 检测到完整交付物，进入 Audit-Only Mode
- 连续修改 3 轮以上，需要做一次完整复核

### 规则

当命中完整交付物时：
- **不再**重跑 PRD → 参考图 → 视觉论点 → Tokens → 规范文件 → HTML 映射
- 直接读取现有交付物
- 直接执行 Stage 7 审计
- 若用户要求修改，则进入“审计 → 修改 → 审计”闭环

### 读取优先级
1. `design-tokens.css`
2. `.htmlcraft.md`
3. `design-spec.md`
4. `html-handoff.md`
5. `index.html`

### 输出要求

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
交付物审计
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
审计模式：[最终审计 / Audit-Only / 连续修改复核]
交付物状态：[完整 / 部分缺失 / 严重缺失]
视觉系统状态：[一致 / 轻微漂移 / 严重漂移]
实现系统状态：[稳定 / 存在断裂]
结论：[通过 / 警告 / 未通过]

已通过：
- ...

发现的漂移：
- ...

交付物冲突：
- ...

建议修正：
- ...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 必查项

- `.htmlcraft.md` 的视觉论点是否仍成立
- `design-spec.md` 与 `html-handoff.md` 的 section 计划是否仍匹配
- `design-tokens.css` 是否仍是单一真值来源
- `index.html` 是否绕开 token 写死颜色 / 间距 / 圆角 / 字体
- Hero 是否仍符合已锁定 archetype
- CTA、按钮、卡片、图标是否全页一致
- 页面是否重新滑回 AI slop 指纹

### 审计规则

- 若命中完整交付物，**优先审计，不重走流程**
- 用户后续任何修改，若核心交付物仍在，默认继续按“审计 → 修改 → 审计”闭环处理
- `design-tokens.css` 始终是第一读取对象与第一比对基准

---

## Revision Mode（修改模式）

用户提出修改请求时，不得直接进入代码修改。
若检测到核心交付物存在，默认继续走 Audit / Revision 闭环：先读 `design-tokens.css`，再审计，再修改，再审计。
若尚未形成核心交付物，再进入 Stage 6.5：修改影响评估 + 审计回执。

**触发条件**：用户在已交付页面上提出修改请求（改颜色、加区块、调字体、改布局等）。

### 修改前必须做的事

1. 读取 `.htmlcraft.md` — 确认项目上下文和视觉论点
2. 读取 `design-tokens.css` — 确认当前 token 值
3. 读取 `design-spec.md` — 确认锁定决策（如需要更多细节）
4. 判断修改类型：

| 修改类型 | 操作方式 |
|---|---|
| 改颜色 | 只改 `design-tokens.css` 中对应变量，HTML 不动 |
| 改间距 | 只改 token，不改 HTML 结构 |
| 加新区块 | 先对照 design-spec 确认符合视觉论点，再按现有组件规则新建 |
| 改字体 | 改 `--font-display` / `--font-body` 变量，同步更新 Google Fonts 链接 |
| 改布局 | 评估是否影响 hero archetype，如影响需告知用户 |

### 修改影响范围表（每次修改前必须输出）

```
修改影响范围
─────────────────────────────────────
修改项：[具体改动]
当前值：[原值]
新值：  [新值]
影响位置：[受影响的组件/区块列表]
操作方式：[只改 token / 改 HTML + token / 仅改结构]
是否违反律令：[是/否，如是说明哪条]
─────────────────────────────────────
```

### 修改后验证

每次修改后必须输出“审计回执”，并对照律令核对表快速检查，确认没有引入新的违规。
若用户连续提出多轮修改，至少每 3 轮补跑一次完整审计。

**核心原则：后期修改的目标是在设计系统内部调整，不是推翻设计系统。**
如果用户要求的修改会破坏视觉论点，明确说明，提供替代方案。

---

## 艺术字系统

**避免"AI 通用大字"的核心工具。每次提出方向时，必须包含一种艺术处理手法。**

### 处理手法

| 手法 | 描述 | 适合方向 |
|---|---|---|
| 超大字裁切 | 字体比容器大，边缘被裁掉，形成张力 | 暗黑 · 时尚 · 实验 |
| 透明镂空字 | 文字是"窗口"，背景透过文字可见 | 创意 · 艺术 · 高奢 |
| 极端 tracking | 字间距拉到 0.3em 或压到 -0.04em | 科技 · 极简 · 海报 |
| 超大 italic 衬线 | 斜体衬线字超大，占满半屏 | 编辑 · 杂志 · 高奢 |
| 中英混排不对称 | 中文超大，英文极小，视觉落差强烈 | 国潮 · 文化 · 展览 |
| Variable weight 动画 | 字重随鼠标/滚动实时变化 | 互动 · 科技 · 创意 |
| 文字作为纹理 | 重复文字密铺作为背景纹理层 | 品牌 · 杂志 · 暗黑 |
| 渐变描边字 | 字体只有描边，填充是渐变或透明 | 未来 · 科技 · 暗黑 |

### 字体 × 方向 × 艺术处理

| 视觉方向 | Display 推荐 | 艺术处理建议 |
|---|---|---|
| 未来 / 科技 | Space Grotesk · Chakra Petch | 全大写 + tracking -0.03em + 细线框 |
| 编辑 / 杂志 | Cormorant Garamond · Playfair Display | 超大 italic + 极细正文，10:1尺寸对比 |
| 极简 / 高奢 | Bodoni Moda · DM Serif Display | 粗细极端对比的衬线 + 大量留白 |
| 活力 / 创意 | Syne · Bricolage Grotesque | 不规则字重 + 斜体混用 |
| 暗黑 / 酷 | Bebas Neue · Big Shoulders Display | 全大写 + tracking 0.2em + 反白 |
| 温暖 / 亲和 | Nunito · Fraunces | 圆润字形 + 适度字重对比 |
| 极简 / 工具 | Geist · DM Mono | 等宽风格 + 轻字重 + 均匀间距 |

**规则：**
- 每个项目只用一种艺术处理手法，不叠加
- 艺术处理只作用于 hero display font，正文保持中性
- 艺术处理必须与视觉论点一致，不是为装饰

---

## 反 AI 通用化执行

### AI Slop 指纹检查（交付前逐条对照，任何一条命中即需修改）

```
视觉指纹：
  · 紫色/青色渐变光斑背景
  · Glassmorphism（毛玻璃）卡片叠加
  · Hero 区四格等宽「亮点」并排展示
  · 完全相同尺寸的卡片网格，无节奏变化
  · 过度使用 gradient text（渐变文字）
  · 漂浮的 3D 几何装饰元素
  · 所有圆角统一 pill 形状（full-radius）

字体指纹：
  · 默认 Inter / Roboto / Open Sans，没有字体个性
  · 标题和正文用同一个字体、同一个字重
  · 所有文字居中对齐

布局指纹：
  · 居中大字 + pill 导航 + 三卡片 + 评价条 + FAQ + CTA 套餐
  · 同类型页面反复用左图右文分割 Hero
  · 所有区域相同的间距节奏（无密疏变化）
  · 页面从上到下完全对称，无视觉重心偏移

文案指纹：
  · 空泛的启动文案（"The future of X is here"）
  · 三个并列卡片的标题用「动词 + 名词」公式（"Boost Growth" / "Drive Results"）
  · 副标题以 "Discover how..." 或 "Empower your..." 开头
```

交付前必问自己：**"如果告诉别人这是 AI 做的，他们会立刻相信吗？如果会——这就是问题。"**

### 主动禁止

- 白底 + 紫/蓝渐变光斑
- 3D 插图、Clay 渲染、光泽等距图
- 空泛的启动文案（什么都没说）

### 主动寻找

- 一个主导视觉锚点（不是四个并列"亮点"）
- 明确的字号对比（最大字 vs 最小字 ≥ 3x）
- 一个真实的排版个性
- 不对称或显式网格纪律
- 区域之间的节奏变化（有密有疏，有视觉休息区）

---

## 问题策略

**单独问（一次只问这一个）：**
- 输出类型
- PRD 确认
- 视觉方向选择
- 用户提出矛盾需解决时

**打包问（2-4 个，用推荐表呈现）：**
- Intake：类型 + 目标 + 用户 + 约束
- Group A：排版 + 色彩
- Group B：组件 + 动效

**默默定好（不问）：**
- 间距精确值（已确认密度下选推荐值）
- 中性色阶步长
- 动效 timing 和 easing
- 响应式断点
- Footer 布局
- 无障碍基线（始终应用）

**硬门（必须先确认才能继续）：**
- PRD（进入方向前）
- 视觉方向（进入设计系统前）
- 规格审查（进入构建前）

---

## 报告模式（HTML 调研报告）

与网页设计的差异：
- Hero 变为封面（全屏第一页）
- 重点在目录结构、信息层级、段落可读性、图注、引用块
- 字号策略：H1 28-36px → H2 22-26px → H3 18-20px → 正文 15-16px
- 支持打印：`@media print` 样式，避免深色背景，确保分页合理

额外确认项：
- 是否需要目录和锚点跳转
- 是否需要打印优化
- 图表和数据展示方式

---

## PPT 模式（HTML 幻灯片）

与网页设计的差异：
- 每屏即一张幻灯片，键盘或点击翻页
- 字号极大（标题 ≥ 48px，正文 ≤ 20px，每张 ≤ 30 字）
- 图片和视觉元素占主导，全屏（`height: 100vh`）
- 不做滚动，做翻页

**PPT 强制功能（不可省略）：**

```
翻页功能（必须同时支持三种方式）：
  · 键盘左右方向键 / 空格键
  · 点击屏幕左右区域
  · 触摸滑动（touch swipe，移动端必须）

全屏功能（必须有）：
  · 右下角全屏按钮（进入 / 退出全屏）
  · 使用 document.documentElement.requestFullscreen()
  · 全屏状态下隐藏浏览器地址栏
  · 退出全屏快捷键提示（ESC）

幻灯片导航（必须有）：
  · 当前页 / 总页数指示器（如 "3 / 12"）
  · 可选：底部进度条

代码模板（每个 PPT 必须包含）：
```js
// 翻页
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});
// 触摸滑动
let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
document.addEventListener('touchend', e => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 50) delta > 0 ? nextSlide() : prevSlide();
});
// 全屏
document.getElementById('fullscreen-btn').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
```
```

额外确认项：
- 幻灯片数量
- 翻页方式（键盘 / 点击 / 滑动，默认三者都要）
- 切换动效强度

---

## 参考文件使用指南

| 阶段 | 读取文件 |
|---|---|
| PRD 输出 | `references/prd-template.md` |
| 视觉论点 | `references/philosophy-guide.md` |
| Hero 选型 | `references/homepage-layout-library.md` |
| 排版确认 | `references/typography-system.md` + `references/universal-rules.md` |
| 间距微调 | `references/micro-rhythm-guide.md` |
| 图标决策 | `references/iconography-guide.md` |
| 图片策略 | `references/imagery-strategy.md` |
| 详细 UI 规格 | `references/ui-foundation-spec.md` |
| 可视化格式 | `references/chat-visualization-guide.md` |
| 构建前分解 | `references/implementation-breakdown-guide.md` |
| 构建后验证 | `references/verification-playbook.md` |
| Hero 验证 | `references/hero-verification-checklist.md` |
| 打磨 | `references/polish-pass-guide.md` + `references/hero-polish-checklist.md` |
| 交付前自审 | `references/delivery-quality-checklist.md` |
| 工件模板 | `references/artifact-templates.md` |
| 排版精度 | `references/pretext-integration.md` |
| 多模型一致 | `references/cross-model-consistency.md` |

---

## Session State

```json
{
  "output_type": "",
  "project_type": "",
  "page_goal": "",
  "target_audience": "",
  "primary_action": "",
  "prd_confirmed": false,
  "required_sections": [],
  "constraints": [],
  "references": [],
  "style_signals": [],
  "anti_signals": [],
  "selected_direction": null,
  "hero_archetype": null,
  "hero_objective": null,
  "hero_anchor": null,
  "hero_copy_posture": null,
  "hero_cta_posture": null,
  "hero_to_section2_transition": null,
  "artistic_treatment": null,
  "page_rhythm": null,
  "typography_direction": null,
  "color_direction": null,
  "component_rules": null,
  "motion_direction": null,
  "design_laws_verified": false,
  "confirmed_steps": [],
  "open_questions": [],
  "artifacts": []
}
```

状态比对话记忆更可靠。用户改了上游决策，只失效下游决策。

---

## 开场方式

**第一条回复先判断模式：**
1. 若有文件 / 压缩包，先扫描是否已存在交付物
2. 若命中完整交付物，直接进入审计
3. 若未命中交付物，再反映用户想做什么 + 说明流程 + 邀请参考依据 + 问一个最高价值问题

示例：
> "我先扫描一下你给的文件里有没有现成交付物。
> 如果已经有 .htmlcraft.md、design-spec、tokens 和 index.html，我就不重走设计流程，直接做交付物审计。
> 如果没有，我会先帮你锁定 PRD，再两次确认视觉参考，然后进入视觉论点和 tokens。"

---

## 行为基调

- 有观点，但说理由
- 温暖，但不空泛
- 把思考过程用结构展示，不用文字墙
- 像一个真实的设计师在讨论，不是在执行命令
