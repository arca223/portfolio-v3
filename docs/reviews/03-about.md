# Review 03 — About page (F5)

- **Task:** B2. The developer (Opus) built `src/views/AboutView.vue` and `src/components/about/*`.
- **Reviewer:** a separate Opus agent, read-only. `vue-tsc` passes.
- **Content check:** the story facts were compared against v1's `stories.js` and against `experiences.ts`.
- **Result:** 2 major, 9 minor, 2 nits.

## Findings

| ID | Sev. | Problem | Fix | Status |
|----|------|---------|-----|--------|
| AB-01 | major | "Completed with a good national ranking" misreads v1, which says the institute ranks well. | Reword it so the ranking applies to the institute. | fixed (verified in 07) |
| AB-02 | major | The education `school` fields hold a degree ("DUT in IT") and an employer. | Add `employer?` to `Education` and use the real school or institute name. | fixed (verified in 07) |
| AB-03 | minor | The DUT dates are inferred; no source gives them. | Flag them for Maxime. | fixed (verified in 07) |
| AB-04 | minor | The Year 1 apprenticeship line is clumsy. | Rewrite it. | fixed (completed in 07) |
| AB-05 | minor | English quality in the story: a comma splice, a repeated phrase, "DUT" never explained. | Rewrite in Maxime's voice and remove the sentence with no source. | fixed (verified in 07) |
| AB-06 | minor | "In 2022, I took a sabbatical" doesn't match the data (late 2022 to end of 2023). | Reword it. | fixed (verified in 07) |
| AB-07 | minor | The header description is in the third person while the story is in the first. | Rewrite it in the first person. | fixed (verified in 07) |
| AB-08 | minor | Clicking the same TOC link twice doesn't scroll, and focus doesn't move to the target. | Add a click handler that scrolls and focuses the target heading. | fixed (verified in 07) |
| AB-09 | minor | Deep links land 16px off, because the target is still mid-reveal (translated) when the scroll is measured. | Skip the reveal for the hash target. | fixed (verified in 07) |
| AB-10 | minor | The photo is lazy-loaded although it is above the fold on mobile. | Load it eagerly. | fixed (verified in 07) |
| AB-11 | minor | The aside label is wrong, and the TOC's h2 comes before the story h2s in the DOM. | Fix the label; replace the TOC heading with a `<p>` plus `aria-labelledby`. | fixed (verified in 07) |
| AB-12 | nit | The TOC doesn't list Education. | Add it. | fixed (verified in 07) |
| AB-13 | nit | `formatPeriod` is exported but never used. | Remove it, or use the shared date helpers. | fixed (completed in 07: R-05, R-04) |
