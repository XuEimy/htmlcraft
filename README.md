# HTMLCraft

**解决 AI 生成前端时的五个结构性问题：跨模型漂移、上下文蒸发、Agent 碰撞、迭代意外修改、模糊需求随机产出。**

不管你用什么 AI 工具，都能稳定产出设计质量一致的前端页面。

---

## 为什么需要这个

用 AI 做前端，你大概遇到过这些：

- 换个模型，同一份需求出来的页面完全不一样
- 对话太长，前面定好的字体、颜色、间距，后面悄悄跑偏了
- 多个 Agent 各做一块，拼在一起风格对不上
- 说"把按钮改大一点"，模型改了按钮，顺手把别的间距也动了
- 需求描述模糊，每次生成都是随机结果

这些不是模型的问题，是**没有设计约束文件**的问题。

---

## 解决方案：两层规则文件

HTMLCraft 的核心是一套规则文件，分两层：

### 底层：通用设计基本法

不管做什么页面，这些规则始终生效：

- 间距体系怎么定（基于 8px 网格的完整 scale）
- 字体层级怎么排（Hero : Body 比例、标题层级关系）
- 组件之间怎么保持一致（按钮、卡片、图标的统一规范）
- 一个 landing page 的 section 该怎么组织

这是"前端设计的基本法"，不随项目变化。

### 上层：项目专属规范

当你说"我要做一个 AI 工具官网，偏极简"，HTMLCraft 基于通用规则，生成这个项目的具体数值：

- 用什么色（5 个颜色槽：primary / accent / bg / fg / muted）
- 用什么字体（display + body 的具体选择）
- 间距取范围内的哪个值
- 页面用哪种架构模板

这份规范生成后，就跟着这个项目走。你在 Claude Code 里改也好，拿去 Codex 也好，规则不变。

---

## 规则文件是一个不会被上下文冲掉的锚点

同一个模型在以下情况也会漂移：

- **上下文太长**：前面定的风格规则被"挤出"注意力范围，后面生成的部分开始跑偏
- **Agent team 模式**：A 做了 hero，B 做 feature section，两个 agent 之间没有共享的设计约束，拼在一起就不统一
- **多轮迭代**：用户说"把这个按钮改大一点"，模型改了按钮但顺手把其他地方的间距也改了，因为它没有一个"什么不该动"的参照

规则文件解决的正是这个：**不管 session 多长、agent 有几个、迭代了多少轮，这份文件始终在那里，任何时候都可以重新读取。**

这就要求规则文件满足一个硬性条件：**短到任何 agent 都能在上下文里放得下，同时完整到不需要额外解释。**

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

- **网页**：landing page、产品页、作品集、任何公开网页
- **HTML 报告**：调研报告、白皮书、分析文档（图文并茂，支持打印）
- **HTML PPT**：演示幻灯片（全屏、翻页、键盘/触摸控制）

---

## 文件结构

```
htmlcraft/
├── SKILL.md                    # 主规则文件（AI agent 读取入口）
├── references/
│   ├── universal-rules.md      # 通用设计基本法（底层规则）
│   ├── philosophy-guide.md     # 视觉论点生成指南
│   ├── homepage-layout-library.md  # Hero 原型库
│   ├── typography-system.md    # 字体系统规范
│   ├── cross-model-consistency.md  # 跨模型一致性协议
│   ├── verification-playbook.md    # 构建后验证清单
│   ├── delivery-quality-checklist.md  # 交付前自审清单
│   └── ...                     # 其他专项参考文件
├── scripts/
│   ├── audit-html.sh           # HTML 审计脚本
│   ├── extract-html-spec.sh    # 从 HTML 提取规格
│   └── html_design_report.py   # 设计报告生成
├── dashboard/                  # 可视化审计面板
└── agents/                     # 各 AI 工具的 agent 配置
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

或：

```
/using htmlcraft
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

## License

MIT
