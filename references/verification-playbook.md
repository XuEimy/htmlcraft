# Verification Playbook

Use this guide whenever the assistant has generated HTML, revised a page, or claims that a front-end pass is complete.

## Core Principle

A page is not done because it exists.
A page is only ready when it has passed structure, consistency, responsiveness, and anti-slop checks.

## Verification Layers

### 1. Structural Verification

Check:

- section order matches the approved plan
- proof appears where intended
- CTA appears where intended
- no unplanned sections were introduced

If the page has a homepage hero, also read `references/hero-verification-checklist.md` and verify:

- the hero still matches the named archetype
- the hero did not silently regress into a generic split layout
- the hero-to-section-2 transition still matches the approved flow

### 2. Token Verification

Check:

- spacing values come from tokens or a clearly defined scale
- radii come from the locked radius system
- color values follow the approved roles
- typography uses the locked families and scale

### 3. Component Verification

Check:

- repeated component types are consistent
- button heights and radii match
- cards do not quietly mutate across sections
- icons follow the SVG rule
- there are no 3D illustrations or clay-style filler

### 4. State Verification

Check where relevant:

- hover
- focus
- active
- disabled
- loading
- error

If interactive elements exist and states are not defined or visible, the work is incomplete.

### 5. Responsive Verification

Check:

- content does not break at mobile widths
- hierarchy still works when stacked
- CTA remains visible and usable
- tap targets remain large enough

### 6. Anti-Slop Verification

Check:

- the page did not fall back to a centered generic startup hero
- gradients are not doing all the design work
- typography still has personality
- card repetition has not overtaken rhythm
- color has not drifted to generic blue-purple startup defaults

## Verification Output Format

When reporting verification in chat, prefer:

```md
**验证结果**
- [x] 结构符合已锁定 section plan
- [x] tokens 被实际使用
- [ ] hover / focus 还需要补一轮
- [x] 未出现 3D 插画或非 SVG 图标

| 检查项 | 结果 | 备注 |
| --- | --- | --- |
| Hero 层级 | 通过 | 标题、正文、CTA 对比清晰 |
| Card 一致性 | 警告 | 第二组卡片圆角漂到 20px |
```

## Final Rule

If verification finds a problem, do not present the page as complete.
State the problem, revise, then verify again.
