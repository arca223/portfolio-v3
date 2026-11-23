# Review 07 — Verification re-review (all features)

- **Why:** the fixes were significant (router scroll and focus rewrite, shared date utils, Skills radio group, timeline line), so all of reviews 01–06 were checked again.
- **Reviewer:** a fresh Opus agent, read-only, that had written none of the code.
- **Checks:**
  - `npm run build` passes and `npm audit` reports 0 vulnerabilities.
  - No Google Fonts requests remain.
  - There is one h1 per page.
  - No local date helpers remain.
  - There is no `any`.
- **Orchestrator smoke test:** `vite preview` returns 200 for every route, including the 404 fallback, the font and the favicon.

## Status of earlier findings

All 61 finding IDs were checked.
- **Fixed:** all except those listed below.
- **Accepted:** S-08 and H-10. H-10 is now documented in `architecture.md`.
- **Moved to the docs:** A-16, in `features.md` → Open items.
- **Partly fixed:** A-08, AB-04 and AB-13. They are completed below under R-05, R-04 and AB-04.
- **Regression hunt:** the router, scroll and focus rewrite was checked for first load, same-route navigation, NotFound, rapid navigations, reduced motion and encoded hashes; the timeline, the duplicated logo markup and the font preload were checked too. No regressions apart from R-01 and R-02.

## New findings

| ID | Sev. | Problem | Fix | Status |
|----|------|---------|-----|--------|
| R-01 | minor | In MobileNav, clicking the current page's link drops focus to `<body>`. | Return focus to the menu toggle when the route doesn't change. | fixed |
| R-02 | minor | A cancelled navigation leaves a pending wait, so later hash links on the same page pause for the 600ms timeout. | Clear the wait on navigation failure (`afterEach`) and when the timeout fires. | fixed |
| R-03 | nit | Stale "App.vue moves focus" comments. | Update them. | fixed |
| R-04 | nit | Unused `formatPeriod` and `compareYearMonth`; an empty `components/common/` folder. | Delete them. | fixed |
| R-05 | nit | "Apprenticeship" still appears twice, and the DUT location reads "Grenoble · Grenoble". | Adjust the data. | fixed |
| AB-04 | nit | The Year 1 line still reads as if HAL were "the main project" of the thumbnails sentence. | Reword it. | fixed |
| R-06 | nit | The About photo uses `decoding="async"` despite being above the fold. | Remove it. | fixed |
| R-07 | nit | The About and Experiences intros are written in the views, while Skills and Contact keep theirs in data. | Move them to `data/` with a `PageIntro` type. | fixed |
| R-08 | nit | The Skills files use double quotes and semicolons, unlike the rest of the code. | Normalise them. | fixed |
| R-09 | nit | The Home hero h1 exception isn't documented. | Add it to `architecture.md`. | fixed |

**Verdict:** ready to ship after these small fixes. The changes are small, so they get no further re-review. They are verified by a build, an audit and the orchestrator's check.
