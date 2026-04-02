# HTMLCraft

**一套让 AI 在生成前端时遵守设计规范的指令系统。**

---

## 基于什么现象

Vibe Coding：用自然语言让 AI 生成前端代码的开发方式。

AI 能写出能跑的前端代码，但产出的页面在设计层面高度不稳定。具体表现为五个可观察、可复现的现象：

**跨模型漂移**
同一句需求给不同模型，出来的页面完全不一样。Claude 做的和 GPT 做的风格对不上。

**上下文蒸发**
同一个模型在长对话中，前面定好的设计方向会被后面的内容冲掉。第 5 轮还好，第 20 轮就开始跑偏。

**Agent 碰撞**
多个 AI agent 各做一个 section，拼在一起不像同一个页面。Hero 是极简风，Feature 变成了 SaaS 模板，Footer 又是另一种风格。

**迭代意外修改**
用户说"把标题改大一点"，模型改了标题，顺手把间距、配色、按钮样式也改了——用户没要求这些改动。

**模糊需求随机产出**
用户说"高端一点""科技感"，每次出来的结果都不一样，因为这些词没有确定性的设计映射。

---

## 根因是什么

AI 能执行设计（写 CSS、排布局），但在执行之前没有经过设计决策。它没有一个独立于对话上下文的、跨模型通用的设计规则文件来约束它。

**代码能力够了，设计约束缺失了。**

---

## 谁最需要这个

**非设计师**
开发者、PM、学生、独立创业者。有产品想法但没有设计训练，只能用模糊的词描述审美，AI 没有标准去解读。

**跨工具协作的团队**
一个人用 Claude Code，另一个人用 Cursor，同一个项目在不同工具之间来回切换，设计一致性无法保持。

**做长期项目的人**
持续迭代、多 session、多轮修改。session 越长，漂移越严重。

---

## 解决什么问题

不是"让 AI 生成更好的代码"——代码能力已经够了。

而是在代码生成之前插入一层设计决策系统，把设计规则从模型的"理解"中抽离出来，变成一套独立的、可被任何执行者读取的文件。然后让这套文件在整个项目生命周期中充当锚点——

不管换模型、换工具、换 session、换 agent，规则始终在那里。

---

## 为什么是 Skill

Skill 的本质是：**一份在 AI 开始工作之前就被注入上下文的规则文件。**

其他方案为什么不行：

- 做一个独立网站给用户找灵感？用户不会在 vibe coding 流程中跳出去开另一个页面
- 写一份设计文档发给团队？人可以读，但 AI 不会主动读一份放在别处的文档
- 做一个 Figma 插件？Figma 不在 vibe coding 的工作流里
- 做一个 CSS 框架（类似 Tailwind）？框架约束的是实现层，不是决策层。它能保证按钮都是 8px 圆角，但不能保证页面该用什么节奏、什么字体关系、什么视觉重力

Skill 的特殊性在于：**AI 不是"看到了参考"，而是"必须遵守"。** 它直接进入模型的工作上下文，成为模型决策过程的一部分。而且它跟着项目走——不管你换 Claude 还是 GPT，只要那个工具支持 skill/rules 机制，同一份文件就能被加载。

---

## 技术构成

**规则文件体系**
SKILL.md + references 目录里的 20 多个 Markdown/JSON 文件。它们定义了设计决策的五层结构、通用规则、风格预设、组件规范、验证清单。任何 AI 模型读了这些文件，就知道该怎么做设计决策、怎么生成代码。这是 prompt engineering 的工程化形态。

**跨平台 agent 配置**
agents 目录里的 YAML/MDC 文件，把同一套规则适配到不同 IDE 的接入格式。Claude 用 YAML，Cursor 用 MDC，OpenAI 用 YAML，Gemini 用 YAML。规则是一套，入口是多个。

**实时审计 Dashboard**
Node.js + WebSocket 的本地服务，监听项目文件变化，自动运行 Python 审计脚本，把结果推到浏览器。

---

## 核心交付物

每个项目生成 5 个文件：

| 文件 | 作用 |
|---|---|
| `design-tokens.css` | 第一真值。所有颜色、间距、字体变量。HTML 只能引用变量，不能硬编码 |
| `design-tokens.json` | 机器可读镜像，供工具链消费 |
| `design-spec.md` | 完整设计规格，人读版本 |
| `html-handoff.md` | 实现交接文档，约束 HTML 映射方式 |
| `.htmlcraft.md` | 项目上下文入口。新会话、新模型读这一个文件就能接手，不用重走设计流程 |

**`design-tokens.css` 是单一真值来源。** 任何模型、任何 agent、任何轮次的修改，都必须先读这个文件，改变量而不是改 HTML。

---

## 支持的输出类型

- **网页**：landing page、产品页、作品集
- **HTML 报告**：调研报告、白皮书、分析文档（图文并茂，支持打印）
- **HTML PPT**：演示幻灯片（全屏翻页、键盘/触摸控制）

---

## 文件结构

```
htmlcraft/
├── SKILL.md                    # 主规则文件（AI agent 读取入口）
├── references/
│   ├── universal-rules.md       # 通用设计基本法（底层规则）
│   ├── philosophy-guide.md      # 视觉论点生成指南
│   ├── homepage-layout-library.md   # Hero 原型库
│   ├── typography-system.md     # 字体系统规范
│   ├── cross-model-consistency.md   # 跨模型一致性协议
│   ├── verification-playbook.md     # 构建后验证清单
│   └── ...                     # 其他专项参考文件
├── scripts/
│   ├── audit-html.sh            # HTML 审计脚本
│   └── html_design_report.py    # 设计报告生成
├── dashboard/                   # 可视化审计面板
└── agents/                      # 各 AI 工具的 agent 配置
    ├── claude.yaml
    ├── cursor.mdc
    ├── openai.yaml
    └── ...
```

---

## 使用方式

在支持 OpenClaw 的环境中，直接调用：

```
/htmlcraft
```

HTMLCraft 会引导你完成：PRD 确认 → 参考依据 → 视觉论点锁定 → 设计系统确认 → 规格文件生成 → HTML 构建 → 审计交付。

---

## 设计律令（不可协商的硬规则）

```
字体家族       最多 2 个
颜色命名槽     恰好 5 个：primary / accent / bg / fg / muted
按钮高度       全页统一，最小 44px
卡片定义       shadow 或 border，二选一，不能混用
图标           SVG only，一个 family，尺寸只用 16/20/24px
正文行长       最多 70ch
正文最小字号   16px
间距基数       8px
对比度         正文 ≥ 4.5:1（WCAG AA）
```

完整律令见 `SKILL.md`。

---

## 参考来源

本项目的规则体系参考了以下 Skill 和设计规范：

- [Anthropic frontend-design](https://clawhub.ai/skills/frontend-design) — 设计质量标准与前端构建原则
- [UI/UX Pro Max](https://clawhub.ai/xobi667/ui-ux-pro-max) — UI/UX 设计系统生成与色彩规范
- [Vercel Web Design Guidelines](https://vercel.com/design) — 间距、排版、动效与交互标准
- [Impeccable](https://clawhub.ai/skills/impeccable) — 排版细节与可访问性规范
- [Pretext](https://chenglou.me/pretext/) — 文本测量与布局算法（@chenglou/pretext）

---

## License

MIT
