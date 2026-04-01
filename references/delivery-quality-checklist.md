# Delivery Quality Checklist

Use this checklist silently before presenting any spec, token file, HTML handoff, or UI baseline to the user.

The goal is not to add more words.
The goal is to prevent shallow deliverables.

## Fail Conditions

If any of these are true, the artifact is not ready:

- it uses vague adjectives without locking concrete values
- it names a component but does not specify how it behaves
- it describes a page section without purpose, spacing, or treatment
- it says "modern", "clean", "premium", or "high-end" without translating that into rules
- it omits icon or imagery policy
- it omits states for interactive controls
- it leaves major choices as ranges without selecting a default

## 1. Design Spec Review

Check:

- visual thesis is explicit
- audience and primary CTA are explicit
- section order is explicit
- each section has a purpose
- each section has a layout or rhythm note
- proof placement is explicit
- final CTA structure is explicit
- imagery policy is explicit
- icon policy is explicit
- banned patterns are explicit

## 2. UI Foundation Review

Check:

- spacing scale has named values
- radius scale has named values
- type scale has named values
- container widths are explicit
- button sizes are explicit
- input sizes are explicit
- card padding and radius are explicit
- icon size and stroke rules are explicit
- motion timings are explicit
- accessibility minimums are explicit

## 3. Component Detail Review

For every component mentioned, confirm at least 4 of these are present:

- size
- padding
- radius
- typography
- border or shadow logic
- icon treatment
- state behavior
- responsive behavior

If fewer than 4 are present, the component spec is too shallow.

## 3.1 Implementation Review

If HTML or code is about to be delivered, confirm:

- a build order exists
- the section plan is explicit
- shared components are identified
- major chunks have been verified
- the page has had a polish pass or the lack of one is explicitly stated

## 4. State Review

For interactive components, confirm these are covered where relevant:

- default
- hover
- active
- focus
- disabled
- loading
- error
- success

If the spec only covers default appearance, it is incomplete.

## 5. Visual Restraint Review

Confirm:

- no 3D illustration filler
- no clay render language
- no pseudo-futuristic floating cubes
- no raster icon fallback unless truly necessary
- no over-rounded system by default

## 6. Language Review

Replace weak wording like:

- "适当圆角"
- "较大留白"
- "高级一点"
- "更有设计感"
- "更精致"

With specific wording like:

- "standard cards use 16px radius"
- "section spacing defaults to 96px on desktop"
- "primary buttons use 40px height and 12px radius"

## 7. Presentation Review

Before sending in chat, confirm:

- comparisons use tables
- progress uses checklists
- revisions use before / after tables
- deliverables use artifact tables
- long structured content is not sent as prose walls

## 8. Final Readiness Gate

Before calling the work ready, ask:

1. Could a designer implement this without guessing?
2. Could a frontend engineer build this without inventing missing values?
3. Would two different people reading this produce similar UI?
4. If code exists, has it been verified and polished rather than merely generated?

If any answer is "no", revise before presenting.
