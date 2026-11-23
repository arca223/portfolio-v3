# Review 05 — Skills page (F7)

- **Task:** B4. The developer (Opus) built `src/views/SkillsView.vue` and `src/components/skills/*`.
- **Reviewer:** a separate Opus agent, read-only. `vue-tsc` passes.
- **Data check:** all 22 skill levels carried over from v1 match the source.
- **Result:** 1 major, 4 minor, 4 nits.

## Findings

| ID | Sev. | Problem | Fix | Status |
|----|------|---------|-----|--------|
| S-01 | major | Spoken languages are rated on the technical skill scale, so English reads "Expert (5 of 5)" while being C1. | Add `scale: 'language'` to `SkillCategory`. For language categories, show the note ("Native", "C1") instead of the level and leave them out of the filter. | fixed (verified in 07) |
| S-02 | minor | v1's Semantic UI and Font Awesome are missing, and two v1 notes were reworded. | Drop both on purpose (D9: obsolete in a Tailwind stack) and record it; keep the notes close to v1. | fixed (verified in 07) |
| S-03 | minor | Empty bar segments (`bg-line`) are almost invisible: about 1.3:1. | Add a stronger `track` token. | fixed (verified in 07) |
| S-04 | minor | At 768px, meters wrap under the skill names in the two-column grid. | Switch to two columns at `lg`. | fixed (verified in 07) |
| S-05 | minor | The skill name is read twice: once as visible text, once as the meter's label. | Label the meter with `aria-labelledby` and the name's id. | fixed (verified in 07) |
| S-06 | nit | The status message always says "skills" and reads "Expert level or above". | Handle the singular and say "Expert level". | fixed (verified in 07) |
| S-07 | nit | The `aria-pressed` toggles behave as a single-choice group. | Use a radiogroup. | fixed (verified in 07) |
| S-08 | nit | When the filter changes, only re-added cards fade in. | Accepted. | accepted |
| S-09 | nit | With `sm:grid-cols-2`, the fifth legend item sits alone on its own row. | Use `sm:grid-cols-3`. | fixed (verified in 07) |
