# Review 04 — Experiences page (F6)

- **Task:** B3. The developer (Opus) built `src/views/ExperiencesView.vue` and `src/components/experiences/*`.
- **Reviewer:** a separate Opus agent, read-only. `vue-tsc` passes.
- **Hand checks:**
  - The timeline line and dots line up on mobile and at md+.
  - Durations match LinkedIn.
  - `totalMonths` = 102 months, so "8+ years".
  - MAX, Yook and abbeal 2019 match linked.txt.
- **Result:** 0 blockers, 0 major, 2 minor, 3 nits, plus one cross-page issue.

## Findings

| ID | Sev. | Problem | Fix | Status |
|----|------|---------|-----|--------|
| E-01 | minor | `<time datetime="P2Y3M">` is an invalid HTML duration: years and months aren't allowed. | Render the duration as a plain `<span>` and drop `isoDuration`. | fixed (verified in 07) |
| E-02 | minor | The h2's title and company spans run together for screen readers. | Add an sr-only separator between them. | fixed (verified in 07) |
| E-03 | nit | The timeline line runs on past the last dot. | End it at the last item. | fixed (verified in 07) |
| E-04 | nit | Some information appears twice on a card: "Career break" as title and chip; Yook's "(remote)" in the title and the Remote chip. | Change the data (D15). | fixed (verified in 07) |
| E-05 | nit | At 320px, long titles wrap to 3–4 lines next to a 48px logo. | Use the small logo size below `sm`. | fixed (verified in 07) |
| X-01 | cross-page | Home says "10+ years", Experiences says "8+ years". | One definition, `yearsOfExperience()`, in `src/utils/date.ts` (D14). | fixed (verified in 07) |
