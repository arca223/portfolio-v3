# Review 01 — Foundation (F1 tooling, F2 content data, F3 shell & design system)

- **Tasks:**
  - A1, tooling (Sonnet).
  - A2, types and data (Sonnet).
  - A3, shell and design system (Opus).
- **Reviewer:** a separate Opus agent, read-only.
- **Checks:** `vue-tsc` passes, `npm run build` passes, `npm audit` reports 0 vulnerabilities.
- **Contrast:** every colour-token pair passes WCAG AA in both themes. The lowest is `text-accent` on `bg-subtle` in light mode, at 4.9:1.

## Findings

| ID | Sev. | Problem | Fix | Status |
|----|------|---------|-----|--------|
| A-01 | major | The profile photo is a 2.1 MB, 1500px PNG. | Resize it to about 800px and convert it with `sips`, so no new dependency is needed. | fixed (verified in 07) |
| A-02 | minor | Inter comes from Google Fonts: a third-party stylesheet that blocks rendering and has GDPR implications. | Self-host the Inter variable woff2 with `@font-face`. | fixed (verified in 07) |
| A-03 | minor | With reduced motion on, hash links to another page don't scroll, because the old view is still in the DOM. | Resolve scrolling after the new view has finished entering. | fixed (verified in 07) |
| A-04 | minor | Back/forward restores the scroll position on a fixed timer that can fire before the new view is inserted. | Same fix as A-03. | fixed (verified in 07) |
| A-05 | minor | MobileNav doesn't close when the current page's link is clicked, or when focus tabs out of it. | Close it on link click and on focusout. | fixed (verified in 07) |
| A-06 | minor | The DUT dates and school label are invented, and the "good national ranking" line misreads v1. | Reword the entry and flag the dates for Maxime. | fixed (verified in 07) |
| A-07 | minor | One About sentence has no source. | Remove it. | fixed (verified in 07) |
| A-08 | minor | The CCSD/CNRS education entry repeats "(apprenticeship)", and a description clause sits next to the wrong noun. | Reword it. | fixed (completed in 07: R-05, R-04) |
| A-09 | nit | Wording problems in experiences.ts: mixed British and American spelling; "(remote)" repeated in Yook's title; Sopra Steria ends 2020-12 when LinkedIn's "11mo" means 2020-11; the stack of MAX's Bedrock mission has no source. | Fix each. | fixed (verified in 07) |
| A-10 | nit | Skill category names "Languages & frameworks" and "Languages" are confusing; "Agility methods" is wrong. | Use "Back-end", "Spoken languages" and "Agile methodologies". | fixed (verified in 07) |
| A-11 | nit | CompanyLogo's alt text repeats the company name shown next to it. | Add a `decorative` prop. | fixed (verified in 07) |
| A-12 | nit | LinkButton renders a link with no `href` when given neither `to` nor `href`. | Warn in development and fall back safely. | fixed (verified in 07) |
| A-13 | nit | The theme doesn't sync across browser tabs. | Listen to the `storage` event. | fixed (verified in 07) |
| A-14 | nit | Focus doesn't move when navigating to a `#hash`. | Focus the hash target. | fixed (verified in 07) |
| A-15 | nit | `types/content.ts` starts with a stray blank line. | Remove it. | fixed (verified in 07) |
| A-16 | nit | History-mode routing needs an SPA fallback on the host. | Document it. | docs (features.md → Open items) |
