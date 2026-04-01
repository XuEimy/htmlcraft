Current priorities:

1. Keep the canaries honest

- Mixed app text still has the extractor-sensitive `710px` soft-hyphen miss.
- Chinese is still the clearest active CJK canary: Safari anchors are clean, while Chrome keeps a broader narrow-width positive field with real font sensitivity.
- Myanmar and Urdu remain useful shaping/context canaries, but they are not the active tuning target right now.

2. Next engine work

- Broaden canaries only when the source text is clean.
- Expand the sampled font matrix only where a canary still looks genuinely imperfect.
- Keep the hot `layout()` path simple and allocation-light while the rich path absorbs more userland layout needs.

3. Demo work

- Push the dynamic-layout demo toward richer editorial layouts.
- Try an “Old Man and the Sea” resize / reflow demo.
- Revisit a synced multi-view demo only if it earns its complexity again.

Not worth doing right now:

- Do not chase universal exactness as the product claim.
- Do not put measurement back in `layout()`.
- Do not resurrect dirty corpora just to cover another language.
- Do not overfit one-line misses in one browser/corpus without broader evidence.
- Do not explode the public API with cache or engine knobs.

Still-open design questions:

- Whether line-fit tolerance should stay as a browser shim or move toward runtime calibration.
- Whether `{ whiteSpace: 'pre-wrap' }` should grow beyond spaces / tabs / `\n`.
- Whether strong real-world demand for `system-ui` would justify a narrow prepare-time DOM fallback.
- Whether server canvas support should become an explicit supported backend.
- Whether automatic hyphenation beyond manual soft hyphen is in scope.
- Whether intrinsic sizing / logical width APIs are needed beyond fixed-width height prediction.
- Whether bidi rendering concerns like selection and copy/paste belong here or stay out of scope.
