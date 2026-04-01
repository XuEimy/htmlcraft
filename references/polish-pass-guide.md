# Polish Pass Guide

Use this guide after the first full implementation exists and before presenting the page as final.

## Core Principle

Polish is a separate phase.
Do not mix it invisibly into first-pass implementation.

The polish pass should improve refinement without changing the approved thesis.

## What A Polish Pass Should Review

### 1. Hierarchy

Check:

- hero title weight and scale
- body contrast against headings
- CTA priority versus secondary actions
- proof prominence

If the page has a homepage hero, also read `references/hero-polish-checklist.md` and tighten:

- headline breaking
- hero anchor strength
- CTA tension
- hero-to-section-2 continuity

### 2. Spacing

Check:

- section spacing consistency
- heading-to-body spacing
- card internal padding consistency
- alignment of left edges and baseline groups

### 3. Component Discipline

Check:

- repeated button logic
- repeated card logic
- input consistency
- icon alignment and sizing

### 4. Visual Restraint

Check:

- no unnecessary decoration was introduced
- gradients remain supportive, not dominant
- backgrounds do not overpower content
- motion remains disciplined

### 5. Responsive Feel

Check:

- mobile hero still feels intentional
- section stack order is sensible
- cards do not become endless vertical repetition
- CTA remains clear and usable

## Recommended Polish Output Format

```md
## Polish Pass

| Category | Before | After | Why |
| --- | --- | --- | --- |
| Hero hierarchy | ... | ... | ... |
| Section spacing | ... | ... | ... |
| CTA emphasis | ... | ... | ... |
```

Then summarize:

- what was tightened
- what remained intentionally unchanged
- any residual risks

## Anti-Pattern

Do not call it polish if it only changes color or shadow.

A real polish pass should usually touch:

- hierarchy
- spacing
- component consistency
- responsiveness

## Final Rule

If the page feels "almost right" but still generic, it probably needs a polish pass rather than a full redesign.
