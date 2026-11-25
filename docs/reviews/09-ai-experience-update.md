# Review 09 — AI-driven positioning & experience update (D19)

- **Task:** Maxime validated a content proposal on 2026-11-24. A developer (Opus) then applied it on branch `feat/ai-driven-experience-update`.
- **Changes:**
  - new Bedrock content
  - MAX/Bedrock overlap resolved
  - rewritten missions
  - new headline and intro
  - Go skill raised and a new skills category
  - a Featured project section on Home
- **Reviewer:** a separate Opus agent, read-only. It checked `git diff main` against the validated brief. `npm run build` passes.
- **Result:** 0 blockers, 3 major, 6 minor, 4 nits.

## Findings

| ID | Sev. | Problem | Resolution | Status |
|----|------|---------|------------|--------|
| P-01 | major | Caisse d'Épargne: "Built a Go data pipeline with Talend" goes beyond the old source text. | Not changed: Maxime approved this exact wording in the proposal. | accepted (validated) |
| P-02 | major | "with partners" was added to the OAuth2 line. | Not changed: approved wording. | accepted (validated) |
| P-03 | major | Xotelia lost "opened new connections". | Restored. | fixed |
| P-04 | minor | The current-role card and the Featured project, placed right below it, told the same story. | The card shows the summary again, and Featured project moves above "At a glance". | fixed |
| P-05 | minor | Entoria dropped the documentation and UML line (UML is still in the stack). | One line restored. | fixed |
| P-06 | minor | The experiences intro dropped Vue.js front-ends; only the headline was meant to lose it. | Restored. | fixed |
| P-07 | minor | "Service" was assumed, and "improve performance" wasn't in the brief. | "Service" becomes "project". "Improve performance" stays: it's Maxime's own words ("optimize performances"). | fixed / accepted |
| P-08 | minor | The skills category description claimed "safely". | Now "backed by oracles and golden tests". | fixed |
| P-09 | minor | F4 docs out of date. | Updated in `features.md`. | fixed |
| P-10 | minor | D7 not marked as superseded. | Marked "Superseded by D19". | fixed |
| P-11 | nit | HomeServe "dashboards" (plural) and "internal" dropped. | Restored "internal tools and a dashboard". | fixed |
| P-12 | nit | "→" in content text is read as "right arrow" by screen readers. | Changed to "PHP-to-Go". | fixed |
| P-13 | nit | FeaturedProject field names didn't match their roles. | Renamed to `sectionTitle` / `eyebrow`. | fixed |
| P-14 | nit | "Learning Python and AI" removed from the intro and About. | Accepted: the Python skill still shows "Learning". | accepted |
