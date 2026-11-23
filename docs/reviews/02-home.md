# Review 02 — Home page (F4)

- **Task:** B1. The developer (Opus) built `src/views/HomeView.vue` and `src/components/home/*`.
- **Reviewer:** a separate Opus agent, read-only. `vue-tsc` passes.
- **Stats checked against the data on 2026-11-19:** 10+ years, 5 companies, 12 missions.
- **Result:** 1 major, 5 minor, 4 nits.

## Findings

| ID | Sev. | Problem | Fix | Status |
|----|------|---------|-----|--------|
| H-01 | major | Date helpers are duplicated in `home/dates.ts` and `experiences/date.ts`, with different names (`toDateTime` vs `toDatetime`). | Move them into one shared `src/utils/date.ts`. | fixed (verified in 07) |
| H-02 | minor | In CurrentRoleCard, the `<time>` wraps the whole range but its `datetime` only holds the start date, and screen readers hear no "to". | Reuse the shared PeriodRange component. | fixed (verified in 07) |
| H-03 | minor | The current role is picked as `experiences[0]`, and `profile.currentRole` duplicates it. | Derive it with a `find` on `end === null`, and drop `Profile.currentRole`. | fixed (verified in 07) |
| H-04 | minor | `sizes` is set without a `srcset`, and `decoding="async"` slows the LCP image. | Remove both; use the optimised photo instead. | fixed (verified in 07) |
| H-05 | minor | `v-reveal` animates the intro, which is above the fold on desktop. | Remove `v-reveal` from the intro. | fixed (verified in 07) |
| H-06 | minor | "Present" is styled differently from the Experiences page. | Same fix as H-02. | fixed (verified in 07) |
| H-07 | nit | The "Key skills" label is announced twice (h3 and the list's `aria-label`). | Point the list at the h3 with `aria-labelledby`. | fixed (verified in 07) |
| H-08 | nit | Stat labels are cramped between 400 and 639px wide. | Start three columns at `sm:`. | fixed (verified in 07) |
| H-09 | nit | The photo's alt text hardcodes the name. | Build it from `profile.fullName`. | fixed (verified in 07) |
| H-10 | nit | The hero renders its own `<h1>` instead of using `PageHeader`. | Accepted: a hero is a valid exception. Recorded in the docs. | accepted |
