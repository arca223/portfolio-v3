# Review 06 — Contact page (F8)

- **Task:** B5. The developer (Opus) built `src/views/ContactView.vue` and `src/components/contact/{ContactCard,CopyEmailButton}.vue`.
- **Reviewer:** a separate Opus agent, read-only. `vue-tsc` passed.
- **Result:** 0 blockers, 1 major, 4 minor, 3 nits.

## Findings

| ID | Sev. | Problem | Fix | Status |
|----|------|---------|-----|--------|
| C-01 | major | At 768px each `md:grid-cols-3` card is about 229px wide, so `truncate` cuts off the email address. | Use `sm:grid-cols-2 lg:grid-cols-3`, and let the handle wrap (`overflow-wrap:anywhere`) instead of truncating it. | fixed (verified in 07) |
| C-02 | minor | When copying fails, the fallback address shown on screen disappears after 2.5s. | Only reset after a successful copy. | fixed (verified in 07) |
| C-03 | minor | A second copy within 2.5s isn't announced, because the live region text doesn't change. | Clear the text, wait for `nextTick`, then set it again. | fixed (verified in 07) |
| C-04 | minor | The mailto subject is hardcoded in the view, and the CTA and the email card build their mailto links differently. | Export one `mailtoHref` from `data/contact.ts` and use it everywhere. | fixed (verified in 07) |
| C-05 | minor | Some copy isn't backed by the data files ("Working remotely or on-site", "open to freelance missions"). | Move the intro copy into `data/contact.ts` (`contactIntro`) and keep it neutral. | fixed (verified in 07) |
| C-06 | nit | The `!` overrides on LinkButton size the CTA differently from the Copy button next to it. | Add a `size` prop to LinkButton. | fixed (verified in 07) |
| C-07 | nit | CopyEmailButton repeats LinkButton's secondary variant classes. | Share the variant class map. | fixed (verified in 07) |
| C-08 | nit | The card label turns accent on hover but not on keyboard focus. | Add `group-focus-visible:text-accent`. | fixed (verified in 07) |
