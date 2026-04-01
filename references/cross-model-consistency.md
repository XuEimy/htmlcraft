# Cross-Model Consistency Guide

Use this reference when the project will be touched by multiple AI models, multiple
tools, multiple agents, or across multiple sessions. This guide ensures that design
decisions survive handoffs.

## The Problem

The same design spec produces different results when:

1. Different models interpret it (Claude vs GPT vs Gemini)
2. Long conversations cause earlier decisions to drift from attention
3. Multiple agents each generate a section without shared state
4. The user iterates many times and intermediate changes accumulate
5. The project moves between tools (Claude Code → Codex → Cursor)

## The Solution: Token File Sovereignty

### Single Source of Truth

`design-tokens.css` is the single source of truth for all design values.

This is not a preference. It is a hard rule:

- Every CSS property that maps to a design decision MUST use a variable from this file
- No hardcoded color values (no `color: #2563eb`, only `color: var(--color-primary)`)
- No hardcoded spacing (no `padding: 24px`, only `padding: var(--space-lg)`)
- No hardcoded font sizes (no `font-size: 16px`, only `font-size: var(--text-base)`)
- No hardcoded radii (no `border-radius: 12px`, only `border-radius: var(--radius-lg)`)

If a value isn't in the token file but is needed: add it as a new token first,
then reference it. Never introduce a hardcoded value.

### Three-File Contract

The design spec exists in three synchronized files:

| File | Format | Audience | Purpose |
| --- | --- | --- | --- |
| `design-spec.md` | Markdown | Humans + AI | Full context: thesis, rhythm, rules, rationale |
| `design-tokens.json` | JSON | Machines | Structured values for parsing and validation |
| `design-tokens.css` | CSS | Code | Directly importable, zero translation needed |

All three files must express identical values. When one changes, all three change together.
If they diverge, `design-tokens.css` wins (it is the one actually imported by code).

## Change Isolation Protocol

When the user requests a change during development:

### Step 1: Identify scope

Ask: "Did the user ask to change THIS specific thing?"

| User Says | Change | Do NOT Change |
| --- | --- | --- |
| "Make the heading bigger" | `--text-hero` or relevant heading token | spacing, colors, other type sizes |
| "I want a darker background" | `--color-bg`, possibly `--color-fg` for contrast | button styles, card styles, spacing |
| "Add more space between sections" | `--space-section` | internal component spacing |
| "Make buttons rounder" | `--radius-*` for buttons only | card radius (unless explicitly asked) |

### Step 2: Update tokens

Modify only the targeted tokens in all three files.

### Step 3: Verify downstream

After changing a token, check what it affects:
- Color change → re-verify contrast ratios
- Spacing change → re-verify component proportions
- Type change → re-verify heading hierarchy ratios
- Radius change → verify visual consistency with other rounded elements

### Step 4: Regenerate the Design Panel

If the environment has a visual companion, update it to reflect the new tokens.

## Context Recovery Protocol

### When to Re-Read the Spec

| Trigger | Action |
| --- | --- |
| New session or conversation | Read `design-tokens.json` before any code generation |
| Agent handoff | Read `design-tokens.json` + `design-spec.md` for full context |
| 10+ conversation turns | Re-read `design-tokens.json` to prevent drift |
| User says "go back to the original" | Re-read the last confirmed version of all three files |
| Generating a new section | Read `design-tokens.css` header comment for active tokens |

### How to Re-Read

Do not rely on conversation history for design values. Conversation history drifts.
The files are canonical. If the file says `--space-section: 96px` and your memory says
`80px`, the file is correct.

## Multi-Agent Protocol

When multiple agents work on the same page:

### Before Starting

Every agent must:

1. Read `design-tokens.json` completely
2. Read `design-spec.md` at minimum the visual thesis and component rules sections
3. Not introduce any value not present in the token files

### During Work

| Rule | Reason |
| --- | --- |
| No new colors | Prevents palette sprawl |
| No new spacing values | Prevents rhythm breakdown |
| No new font sizes | Prevents hierarchy confusion |
| No hardcoded values | Ensures everything maps to tokens |
| No component style invention | All buttons look the same, all cards look the same |

### When a New Value is Needed

If an agent encounters a situation where no existing token fits:

1. Do NOT invent a value silently
2. Propose the new token explicitly: name, value, and reason
3. The token must fit within the existing system (e.g., a new spacing value must be
   a multiple of 8px and fit between existing scale steps)
4. Add it to all three files before using it

## Visual Thesis Sovereignty

The visual thesis (Layer 1) outranks all token values.

If a token change would contradict the visual thesis:
- Flag the contradiction before applying
- Ask the user to either change the thesis or reconsider the token change
- The thesis defines the world; tokens implement it. Implementation cannot override identity.

Example:
- Thesis: "An architect's portfolio: white walls, sharp edges"
- User: "Let's try rounded corners on everything, radius 24px"
- This contradicts "sharp edges"
- Flag it: "This radius would soften the sharp-edge character of the current thesis.
  Should I also update the thesis, or keep the corners sharp?"

## Multi-Environment Installation

This skill works in any environment that can read files.

### Claude Code

```
~/.claude/skills/guided-html-design/
├── SKILL.md
└── references/
    └── (all reference files)
```

Or add to project `.claude/skills/` for per-project installation.

### Cursor

Add to `.cursor/rules/` or reference in project settings:

```
.cursor/
└── rules/
    └── guided-html-design/
        ├── SKILL.md
        └── references/
```

### OpenAI Codex

Install via the skill installer:

```
$skill-installer guided-html-design
```

Or place in the project's skill directory and reference in the agent configuration.

### Generic (Any Model / Tool)

For any environment that reads system prompts or project rules:

1. Include `SKILL.md` content in the system prompt or rules file
2. Include `design-tokens.css` in the project root
3. Include `design-tokens.json` as a reference file
4. Instruct the model: "Read design-tokens.css before generating any frontend code.
   All CSS values must reference variables from this file."

### Design Token File Placement

Regardless of environment, the generated token files should live at:

```
project-root/
├── design-spec.md
├── design-tokens.json
├── design-tokens.css
└── (source code)
```

This ensures any tool or model can find them at a predictable path.

## Anti-Drift Verification Checklist

After every significant code generation step, verify:

| Check | How |
| --- | --- |
| No hardcoded colors | Search generated code for `#` followed by hex — should only appear in token file |
| No hardcoded spacing | Search for raw `px` values in padding/margin — should reference variables |
| No hardcoded fonts | Search for font-family declarations — should reference variables |
| No new unnamed values | Any value not in `design-tokens.css` is a violation |
| Component consistency | All buttons same height/radius, all cards same treatment |
| Visual thesis alignment | First viewport still communicates the thesis |

If any check fails, fix before continuing. Drift compounds — catching it early prevents
a full redesign later.

## Emergency Recovery

If the design has drifted significantly:

1. Stop generating new code
2. Re-read the original `design-tokens.json` and `design-spec.md`
3. Audit the current code against the spec
4. List all deviations
5. Fix deviations one by one, starting with the most visible (hero, colors, typography)
6. Do not attempt to "fix everything at once" — this introduces new drift
