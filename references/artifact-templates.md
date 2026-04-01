# Artifact Templates

Use these templates to keep deliverables concrete, dense, and implementation-ready.

## 1. `design-spec.md`

Minimum structure:

```md
# [Project Name] Design Spec

## Project Summary
| Item | Decision |
| --- | --- |
| Page type | ... |
| Audience | ... |
| Primary CTA | ... |
| Visual thesis | ... |
| Hero archetype | ... |
| Hero objective | ... |
| Hero -> section 2 transition | ... |

## Decision Ledger
| Layer | Locked decision | Reason |
| --- | --- | --- |
| Rhythm | ... | ... |
| Typography | ... | ... |
| Color | ... | ... |
| Components | ... | ... |
| Motion | ... | ... |

## Page Rhythm
| Section | Purpose | Layout treatment | Spacing note |
| --- | --- | --- | --- |
| Hero | ... | ... | ... |
| Proof | ... | ... | ... |

## Hero Architecture
| Item | Decision |
| --- | --- |
| Hero archetype | ... |
| Hero anchor | ... |
| Copy posture | ... |
| Media mode | ... |
| CTA posture | ... |
| Proof position | ... |
| Hero height mode | ... |
| Hero -> section 2 transition | ... |

## Typography Rules
| Item | Value |
| --- | --- |
| Display font | ... |
| Body font | ... |
| Hero size | ... |
| Body size | ... |
| Heading line-height | ... |

## Color Rules
| Role | Value | Usage |
| --- | --- | --- |
| Primary | ... | ... |
| Accent | ... | ... |
| Background | ... | ... |

## Component Rules
| Component | Size / radius / padding / state notes |
| --- | --- |
| Button | ... |
| Card | ... |
| Input | ... |

## Motion Rules
| Interaction | Motion |
| --- | --- |
| Hover | ... |
| Modal | ... |

## Imagery And Icon Policy
- ...

## Explicit Bans
- ...

## Anti-Drift Rules
- ...

## HTML Implementation Notes
- ...
```

## 2. `ui-foundation-spec.md`

Minimum structure:

```md
# UI Foundation Spec

## Token System
| Token group | Values |
| --- | --- |
| Spacing | ... |
| Radius | ... |
| Type scale | ... |

## Layout
| Item | Value |
| --- | --- |
| Container | ... |
| Gutter | ... |
| Grid | ... |

## Controls
| Component | Height | Radius | Padding | Notes |
| --- | --- | --- | --- | --- |
| Button / M | ... | ... | ... | ... |
| Input | ... | ... | ... | ... |
| Select | ... | ... | ... | ... |

## Surfaces
| Surface | Radius | Border / shadow | Padding |
| --- | --- | --- | --- |
| Card | ... | ... | ... |
| Modal | ... | ... | ... |

## Iconography
| Item | Rule |
| --- | --- |
| Format | SVG only |
| Stroke | ... |
| Sizes | ... |

## Motion
| Type | Duration | Easing |
| --- | --- | --- |
| Hover | ... | ... |
| Drawer | ... | ... |

## Accessibility Minimums
| Rule | Value |
| --- | --- |
| Min target | ... |
| Focus | ... |
```

## 3. `html-handoff.md`

Minimum structure:

```md
# HTML Handoff

## Hero Architecture
| Item | Value |
| --- | --- |
| Archetype | ... |
| DOM structure | ... |
| Anchor | ... |
| CTA logic | ... |
| Proof logic | ... |
| Section 2 transition | ... |

## Section Inventory
| Section | Goal | Key content | Visual treatment |
| --- | --- | --- | --- |
| Hero | ... | ... | ... |

## Component Inventory
| Component | Variants | Notes |
| --- | --- | --- |
| Button | primary / secondary | ... |

## Token Usage Rules
- ...

## Interaction Notes
- ...

## Imagery And Icon Notes
- ...

## Do Not Drift
- ...
```

## 4. Required Density Rule

Do not collapse these templates into three paragraphs.

If the user asked for a deliverable, the artifact should read like an internal design document, not a chat summary.

## 5. `implementation-breakdown.md`

Minimum structure:

```md
# Implementation Breakdown

## Build Order
1. ...
2. ...

## Hero Contract
| Item | Value |
| --- | --- |
| Archetype | ... |
| Anchor | ... |
| CTA posture | ... |
| Proof position | ... |
| Section 2 transition | ... |

## Section Plan
| Section | Goal | Components | Verification focus |
| --- | --- | --- | --- |
| Hero | ... | ... | ... |

## Shared Components
| Component | Locked values | Notes |
| --- | --- | --- |
| Button | ... | ... |

## Chunk Risks
| Chunk | Risk | Mitigation |
| --- | --- | --- |
| Hero | ... | ... |
```

## 6. `polish-review.md`

Minimum structure:

```md
# Polish Review

| Category | Before | After | Why |
| --- | --- | --- | --- |
| Hierarchy | ... | ... | ... |
| Spacing | ... | ... | ... |
| CTA emphasis | ... | ... | ... |
| Hero archetype clarity | ... | ... | ... |

## Intentionally Unchanged
- ...

## Residual Risks
- ...
```
