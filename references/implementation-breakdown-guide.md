# Implementation Breakdown Guide

Use this guide after the design direction, UI foundation, and main rules are confirmed.

The purpose is to stop the assistant from jumping directly from spec to a full page dump.

## Core Rule

Implementation should be decomposed before code generation.

The assistant should define:

- build order
- section order
- component dependencies
- what must be verified after each chunk

## Required Implementation Breakdown

Before generating major HTML output, create a compact implementation plan using this shape:

```md
## Build Order
1. Hero
2. Proof
3. Core content section
4. CTA
5. Footer / support sections

## Hero Contract
| Item | Locked decision |
| --- | --- |
| Archetype | ... |
| Anchor | ... |
| CTA posture | ... |
| Proof position | ... |
| Hero -> section 2 transition | ... |

## Section Plan
| Section | Goal | Components | Special constraints |
| --- | --- | --- | --- |
| Hero | ... | ... | ... |
| Proof | ... | ... | ... |

## Shared Components
| Component | Variants | Locked values |
| --- | --- | --- |
| Button | primary / secondary | 40px height, 12px radius |
| Card | standard | 16px radius, 24px padding |
```

## Build Order Logic

Preferred order:

1. global tokens
2. shell layout
3. hero
4. proof
5. primary content sections
6. CTA
7. footer
8. states and motion
9. responsive pass
10. polish pass

## Per-Chunk Rules

Each chunk should answer:

- what user-facing purpose it serves
- which components it introduces
- which tokens it depends on
- what should be checked before moving on

For homepage work, the hero chunk must also answer:

- does it still match the named archetype
- does the first scroll still lead into the intended section 2
- did the hero accidentally regress into a split template

Do not add a new section before the current section is structurally sound.

## Mini Definition Of Done

For each section, verify:

- hierarchy is clear
- spacing follows tokens
- components match locked rules
- the section does not drift from the visual thesis
- mobile collapse is plausible

If a section fails this check, revise before adding more complexity.

## Anti-Pattern

Do not say:

- "I’ll now generate the whole page"

when the page has not been decomposed.

Instead say:

- "I’ve locked the build order and section plan. Next I’ll implement the hero and proof first, then verify them before continuing."
