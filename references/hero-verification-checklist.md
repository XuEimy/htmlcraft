# Hero Verification Checklist

Use this checklist whenever a homepage, landing page, portfolio homepage, product homepage,
or campaign hero already exists in HTML, mockup, or implementation form.

## Core Principle

Do not verify the hero only as "the first section."

Verify it as the page's primary structural decision.

## Required Checks

### 1. Archetype Integrity

Check:

- the implemented hero still matches the named hero archetype
- the layout did not silently collapse into a generic split hero
- the hero posture is still type-led, image-led, proof-led, docked, poster-led, or scroll-led as intended

### 2. Hero Skeleton

Check:

- nav posture matches the plan
- headline position matches the plan
- media position matches the plan
- CTA position matches the plan
- proof position matches the plan
- vertical height matches the intended posture

If more than two of these drift, the hero skeleton has changed and must be reviewed as a structural regression.

### 3. Visual Anchor

Check:

- the hero has one obvious focal anchor
- the focal anchor is not diluted by secondary cards, floating labels, or decorative filler
- the eye lands where the concept intended

### 4. CTA And Proof Logic

Check:

- CTA emphasis matches the page goal
- CTA does not fight the visual anchor
- proof appears in the intended part of the hero or immediately after it
- proof does not feel bolted on as a generic strip

### 5. Hero To Section 2 Transition

Check:

- section 2 is the intended type of follow-up block
- the transition feels deliberate rather than accidental
- the first scroll expands the story instead of resetting the page

Typical failure:

- strong hero followed by a generic 3-card feature grid with no relation to the hero posture

### 6. Anti-Reuse Check

If this project is one of multiple homepage concepts or multiple generated sites in the same
session, check:

- the hero archetype is not the same as the previous output unless explicitly justified
- at least four structural dimensions differ from the previous hero if reuse was not intended

Those dimensions are:

- copy position
- media position
- CTA position
- proof position
- headline line-break style
- nav posture
- hero height
- hero to section 2 transition

## Verification Output Shape

Prefer this format in chat or in a review artifact:

```md
## Hero Verification

- [x] Archetype still matches `Manifesto Stack`
- [x] No silent regression to split hero
- [ ] Hero -> section 2 transition still feels too generic

| Check | Result | Notes |
| --- | --- | --- |
| Hero anchor | Pass | Headline remains dominant focal point |
| CTA logic | Pass | Primary CTA supports trust goal |
| Transition to section 2 | Warning | Drops into generic feature cards |
```

## Final Rule

If the hero no longer matches the named archetype, do not describe the page as merely
"polished" or "refined."

That is a structural regression and should be corrected before final handoff.
