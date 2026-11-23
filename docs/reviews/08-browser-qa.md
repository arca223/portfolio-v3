# Review 08 — Browser QA (all features)

- **How:** the orchestrator, using Claude in Chrome, ran the Vite dev server in Maxime's Chrome on 2026-11-19.
- **Widths tested:** desktop at 1568px, and the narrowest the window would go (606px), which shows the mobile layout with the hamburger menu.
- **Phone width (375px):** tested in a second pass after Maxime set the window to 375px. All 6 routes fit with no element overflowing (checked through the DOM). The mobile menu's solid panel, focus on its first link, and Escape returning focus to the toggle all work.

## Checked and working
- **Pages:** all 5 pages and the 404 page render, with correct `document.title`s.
- **Theme toggle:** dark ↔ light, and the choice persists across full page loads.
- **Skills filter:** "Expert" correctly shows "Showing 7 of 32 skills, Expert level" and hides the spoken-languages card.
- **Mobile menu:** opens and closes. Selecting a link navigates, closes the menu, scrolls to the top and focuses the page `<h1>`.
- **Deep links:** `/about#today` lands just below the sticky header, with focus on the section.
- **Back navigation:** back/forward restores the previous scroll position (Experiences at y=1000).
- **Layout at mobile width:** no horizontal overflow.
- **Contact:** all 3 cards fade in. Reading the DOM right after the animation confirms them all at opacity 1.
- **Console:** no errors or warnings across all the navigation; only Vite's debug messages.

## Findings

| ID | Sev. | Problem | Fix | Status |
|----|------|---------|-----|--------|
| Q-01 | nit | Skills grid: cards in the same row stretch to the same height, so "Quality & testing" shows a large empty area. | Add `items-start` to the grid. | fixed (re-checked in browser) |
| Q-02 | nit | About: on viewports around 750px tall, the sticky photo-and-TOC column is taller than the screen, so its top scrolls under the header. | Only the TOC is sticky (`lg:contents` wrapper); the photo scrolls normally at 256px. The first attempt (`lg:h-full`) stretched the photo, so it was replaced. | fixed (re-checked in browser) |
| Q-03 | nit | Awkward copy in the career-break summary ("Travelling, and self-learning…"). | Reword it. | fixed (re-checked in browser) |
| Q-04 | nit | Skills filter at 375px: the "Minimum level" label was floated left, so the radio pills wrapped onto an awkwardly indented second line. | Below `sm`, the label sits on its own line with the pills in a row underneath. | fixed (re-checked in browser) |
