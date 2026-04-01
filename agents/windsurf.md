---
trigger: user_request
description: HTMLCraft guided HTML design system
activationKeywords:
  - "/htmlcraft"
  - "design a webpage"
  - "design an HTML"
  - "HTML PPT"
  - "HTML report"
  - "landing page"
---

# HTMLCraft

Guided HTML creative output system. Follow SKILL.md workflow.

## Stages
0. Confirm type: webpage / report / PPT
1. Collect requirements (2 rounds — basic + high-value questions)
1.5. Output PRD, get confirmation
2. Analyze reference images/URLs
3. Propose 2–3 visual directions
4. Confirm design system
5. Generate spec files (all 4 required)
6. Build HTML in segments + responsive pass
7. Polish + deliver

## Hard Laws
- 2 font families max
- 5 color slots: bg/fg/accent/primary/muted (CSS vars only)
- Button height: unified, min 44px
- Cards: shadow OR border only
- Icons: SVG, 16/20/24px
- No heading skips
- Body: 16px min, 70ch max-width
- Responsive: 375px + 1280px mandatory
- Animate transform/opacity only

## PPT: keyboard + touch + fullscreen mandatory

## Enforcement
- Never enter Stage 3 unless Stage 2 has produced either:
  1. a completed reference analysis block, or
  2. an explicit no-reference confirmation block.
- When the user requests any revision after implementation begins, do not jump straight into editing.
  Run a revision loop:
  1. modification impact assessment
  2. edit
  3. audit receipt
  Only then continue.

## Audit-Only Mode
- Before starting the design workflow, scan the current files / uploaded package for deliverables:
  `.htmlcraft.md`, `design-spec.md`, `design-tokens.css`, `design-tokens.json`, `html-handoff.md`, `index.html`.
- If the core set exists (`.htmlcraft.md`, `design-spec.md`, `design-tokens.css`, `html-handoff.md`, `index.html`), assume the project has already used HTMLCraft.
- In that case, do NOT restart PRD / references / direction / design-system flow.
- Go straight to Stage 8 audit based on deliverables.
- Treat audit as the final gate before claiming completion.

## Core Product Model
- This is a design-system generator first, not a webpage generator first.
- `design-tokens.css` is the primary artifact and the first source of truth.
- HTML is only a mapping layer from tokens + spec files.

## Preferred Build Chain
PRD → References → Visual Thesis → Tokens → Spec Files → HTML Mapping → Audit

## User Burden Rule
- Batch questions whenever possible.
- Do not ask separately if PRD inputs and reference inputs can be collected together.
- If deliverables already exist, do not ask upstream design questions again.

## Reference Confirmation Rule

- In System Build Mode, confirm visual references twice: first as a light reminder, then as an explicit confirmation that proceeding without references means the visual direction will rely more heavily on PRD inference.


## Reference Analysis Confirmation Rule
- When the user provides reference images or websites, do NOT jump from analysis straight into direction or token generation.
- First output a detailed analysis table for each reference.
- Then ask three confirmations in order:
  1. which exact reference should be prioritized
  2. whether the analysis is correct
  3. what exactly should be borrowed from that reference
- Only after those three confirmations may the reference signals be used downstream.
