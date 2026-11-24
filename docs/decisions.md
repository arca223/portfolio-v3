# Decisions

Each entry gives the context, the choice, why it was made, and the alternatives that were rejected.

---

## D1 — Project location
- **Context:** The brief names `~/Projects/vue/vue-portfolio-v3-ai`. A near-identical scaffold also exists at `~/Projects/ai/portfolio-vuejs`, and its npm vulnerabilities had already been fixed.
- **Choice:** Build in `~/Projects/ai/portfolio-vuejs`, as confirmed by Maxime.
- **Rejected:** The path named in the brief.

## D2 — Tailwind 4 through the official Vite plugin
- **Context:** The scaffold used Tailwind 3 with PostCSS and autoprefixer. The brief asks for Tailwind 4.
- **Choice:** Use `tailwindcss@4` with `@tailwindcss/vite`. Theme config is CSS-first (`@theme` in `src/assets/main.css`). `tailwind.config.js`, `postcss.config.js`, `postcss` and `autoprefixer` are removed.
- **Why:** This is the officially recommended setup for Vite. It is faster and needs no config files. Lightning CSS, built into Tailwind 4, already adds vendor prefixes.
- **Rejected:** `@tailwindcss/postcss`, which adds a layer for no benefit with Vite.

## D3 — TypeScript tooling
- **Context:** The scaffold had `.ts` files but no tsconfig or type checker.
- **Choice:** Add `typescript`, `vue-tsc`, `@vue/tsconfig` and `@types/node`, with tsconfig files in the create-vue layout. The build script is `vue-tsc -b && vite build`, so a type error fails the build. `strict` and `noUncheckedIndexedAccess` are on.
- **Why:** The "no TS errors" requirement needs a real type check, and Vite alone does not check types. These four packages are part of the requested stack, not extra libraries.

## D4 — No third-party runtime libraries
- **Choice:** The only runtime dependencies are Vue, Vue Router and Pinia.
  - **Dark mode:** a small Pinia store (`stores/theme.ts`), plus an inline script in `index.html` that sets the theme before the first paint.
  - **Scroll reveal:** a custom `v-reveal` directive using IntersectionObserver. It turns off when the visitor prefers reduced motion.
  - **Inter font:** first loaded with a Google Fonts `<link>`, later self-hosted (D16).
- **Why:** The brief says "no other libraries without asking", and each of these features is about 30 lines of code.
- **Rejected:** `@vueuse/core` (`useDark`, used in v2), `@fontsource/inter`, and animation libraries.

## D5 — Design direction
- **Choice (Maxime):** Minimal design. Dark by default with a light/dark toggle that is remembered and falls back to the OS setting when nothing is saved. Emerald accent, Inter font, subtle animations.
- **Rejected:** v1's look (Semantic UI greys and gold, now dated) and a dark-only theme.

## D6 — Contact method
- **Choice (Maxime):** A `mailto:` link only, with no form service. The page also shows email, GitHub (`arca223`) and LinkedIn.
- **Open item:** The email address is a placeholder (`CONTACT_EMAIL` in `src/data/contact.ts`) that Maxime will fill in.
- **Rejected:** Formspree or Web3Forms (third-party, needs an account) and v1's Express + MongoDB backend (it never actually sent mail).

## D7 — Content sources and conflicts
- **Rule (from the brief):** `linked.txt` wins for experiences and dates. v1 wins for descriptions and skill details.
- **Applied:**
  - Mister Auto, SmartTraffiK, Xotelia and LDLC take their dates from linked.txt and their bullet points from v1's descriptions.
  - The Bedrock (freelance) and MAX Digital Services entries overlap in time. They are kept exactly as on LinkedIn (Maxime's choice). *Superseded by D19.*
  - The month ranges of the abbeal 2019–2021 missions have no years. Years are inferred from the reverse-chronological order inside the Feb 2019 – Jun 2021 entry.
  - The CCSD/CNRS apprenticeship (2013–2016) is missing from linked.txt. It is shown under **Education** on About, using v1's description.
- **Data shape:** Content lives in typed data files (`src/data/*.ts`, types in `src/types/content.ts`), never in templates.

## D8 — Experiences: single timeline
- **Choice:** One responsive vertical timeline. Entries can hold nested missions (abbeal, MAX), durations are computed from the dates, and ongoing roles show "Present".
- **Rejected:** v1's three-view switcher (blocks, carousel, timeline). It is more code, the carousel was poor on mobile, and three views of the same data add little.

## D9 — Skills presentation
- **Choice:** Keep v1's categories and 1–5 levels. Add the technologies found in linked.txt (Laravel, Go, Python, React, Stencil, PHPStan, PHPUnit, Behat, RabbitMQ, Grafana, Shopify/Shopware…). Show levels as accessible bars (`role="meter"`).
- **Open item:** The levels for the newly added skills are estimates for Maxime to adjust.
- **Dropped:**
  - Flag images (the countryflags.io service no longer exists).
  - The hobbies section (it was a WIP placeholder in v1).
  - Star icons, which are harder to make accessible.

## D10 — About content
- **Choice (Maxime):** A rewrite in v1's personal, first-person voice, updated to today: education, consulting years, Japan, sabbatical, freelancing.
- **Open item:** Maxime proofreads the wording.

## D11 — Routing
- **Choice:**
  - Lazy-loaded route components.
  - `meta.title` sets `document.title`.
  - A catch-all route to `NotFoundView`.
  - `scrollBehavior`: restore the saved position, otherwise scroll to the top, or to the hash target.
- **Why:** Smaller initial bundle, correct tab titles, and a graceful response to bad URLs.

## D12 — Agent workflow
- **Choice:** Opus orchestrates and writes the docs. Developer subagents write all code: Opus by default, Sonnet for config and content data. A separate Opus reviewer checks every feature it did not write. Tasks that touch the same files run in sequence.

## D13 — TypeScript pinned to 6.0.x
- **Context:** TypeScript 7.0.2 is the latest release, but `vue-tsc` 3.3.14 (also the latest) crashes with it: `ERR_PACKAGE_PATH_NOT_EXPORTED: './lib/tsc'`.
- **Choice:** Pin `typescript: ~6.0.3`, the newest line `vue-tsc` supports.
- **Revisit:** Bump once `vue-tsc` supports TS 7.
- **Also:** `tsconfig.node.json` sets its options by hand instead of extending `@tsconfig/node22`, to avoid an extra package.

## D14 — One definition of "years of experience"
- **Context:** Home showed "10+", counted from the first job in Oct 2016. Experiences showed "8+", counting merged months with overlaps counted once and gaps and the career break left out.
- **Choice:** Use the merged-months figure everywhere: `yearsOfExperience()` in `src/utils/date.ts`. `profile.intro` no longer hardcodes a number.
- **Why:** It is the figure a reader can check against the timeline. "10+" includes a 16-month sabbatical, which reads as inflated.
- **Rejected:** "Years since first role", which is easy to misread as years of work.
- **Open item:** Maxime may want the CCSD/CNRS apprenticeship (2013–2016) counted too.

## D15 — Removing duplicated information from experience cards
- Yook's title is now "Software Engineer". The "Remote" work-mode chip already says what linked.txt's "(remote)" said.
- The career break card no longer repeats "Career break" as both its title and its chip.

## D16 — Self-hosted Inter, optimised photo
- **Context:** The foundation review (A-01, A-02) found that Google Fonts is a render-blocking third-party request that sends visitors' IP addresses to Google (a GDPR concern), and that the profile photo was 2.1 MB.
- **Choice:**
  - Inter is now a variable woff2 file in `public/fonts`, declared with `@font-face` and `font-display: swap` and preloaded.
  - The photo is resized to 800px and recompressed with macOS `sips`.
- **Why:** No new dependency, better privacy, faster loading.
- **Rejected:** `@fontsource/inter` (an extra package).

## D17 — Spoken languages use their own scale
- Language categories have `scale: 'language'`. They show their CEFR-style note ("Native", "C1") instead of a 1–5 skill meter, and the level filter ignores them.
- v1's Semantic UI and Font Awesome skills are dropped on purpose: they no longer apply to a Tailwind stack.

## D18 — Contact email kept out of the repo and out of the built site
- **Context:** Maxime doesn't want his email address in the public GitHub repo, or easy for spam bots to harvest from the live site.
- **Choice:**
  - **Not in the repo:** the address lives in the non-`VITE_` variable `CONTACT_EMAIL`. Locally it goes in the git-ignored `.env.local`; on GitHub it is the Actions secret `CONTACT_EMAIL`. `.env.example` documents the variable name only.
  - **Not in plain text in the build:** `vite.config.ts` reverses and base64-encodes the address at build time and exposes only `__CONTACT_EMAIL_ENC__` through `define`. Building with a dummy address and searching `dist/` for it finds nothing.
  - **Revealed on click:** the Contact page shows a "Show email address" button. Clicking it decodes the address in the browser, then shows it with "Email me" (a mailto with a prefilled subject) and "Copy email". The footer's email icon links to `/contact`.
  - **Missing secret:** if `CONTACT_EMAIL` is unset, the build prints a warning. In production nothing is shown for email; in development a "not configured" hint appears.
- **Why:** This is the strongest protection a static site allows. Any address a browser can open is ultimately readable by a determined person, but this stops bulk scrapers and keeps the address out of git history.
- **Rejected:**
  - A `VITE_` variable, which Vite inlines as plain text.
  - Real encryption, which is pointless because the key would ship with the site.
  - A form service, which the user turned down in D6.

## D19 — AI-driven positioning and experience cleanup (validated by Maxime, 2026-11-24)
- **Context:** Maxime's current Bedrock mission moved a 280k-line PHP codebase to Go with AI. The Go code runs in production, and the project has since moved to fully agentic development: Claude Code, Codex and Fable develop, Astra reviews, and GitHub PRs and issues are the discussion channel. He also contributed to a 100% AI-built service that consolidates layout data outside the request runtime.
- **Choices:**
  - **Headline:** "PHP · Go · AI-driven engineering" (Vue.js removed from the headline).
  - **Wording:** the AI work is described as "actively contributing to and pushing" the projects, never "leading" them (Maxime's wording).
  - **Skills:** Go goes from 2 to 4, and a new "AI-driven engineering" category is added.
  - **Home:** the current-role card shows the migration, and a new Featured project section presents it as a short case study.
  - **Bedrock/MAX overlap resolved** (this replaces the earlier "mirror LinkedIn" choice in D7):
    - MAX runs Jan 2024 – Apr 2025 and ends by joining Bedrock's BFF team (Sep 2024). That mission is no longer listed separately.
    - The freelance Bedrock role starts in May 2025.
  - **Older entries tightened:** Yook, Entoria, HomeServe ("call centre", since PureCloud is Genesys' contact-centre platform), Alptis, HeyTeam, Mister Auto and Xotelia now describe what he did, with the strongest point first.
- **Why:** The site now presents his most distinctive, current work, and the timeline no longer double-counts a mission.
