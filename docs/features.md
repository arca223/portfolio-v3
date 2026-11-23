# Features

Status values: `planned` → `in progress` → `in review` → `done`.

| # | Feature | Status | Reviews |
|---|---------|--------|---------|
| F1 | Tooling (TS, Tailwind 4, build) | done | [01](reviews/01-foundation.md), [07](reviews/07-verification.md), [08](reviews/08-browser-qa.md) |
| F2 | Content types & data | done | [01](reviews/01-foundation.md), [07](reviews/07-verification.md), [08](reviews/08-browser-qa.md) |
| F3 | App shell & design system | done | [01](reviews/01-foundation.md), [07](reviews/07-verification.md), [08](reviews/08-browser-qa.md) |
| F4 | Home page | done | [02](reviews/02-home.md), [07](reviews/07-verification.md), [08](reviews/08-browser-qa.md) |
| F5 | About page | done | [03](reviews/03-about.md), [07](reviews/07-verification.md), [08](reviews/08-browser-qa.md) |
| F6 | Experiences page | done | [04](reviews/04-experiences.md), [07](reviews/07-verification.md), [08](reviews/08-browser-qa.md) |
| F7 | Skills page | done | [05](reviews/05-skills.md), [07](reviews/07-verification.md), [08](reviews/08-browser-qa.md) |
| F8 | Contact page | done | [06](reviews/06-contact.md), [07](reviews/07-verification.md), [08](reviews/08-browser-qa.md) |

---

## F1 — Tooling
- **What:** Vite 8 with Vue, Tailwind 4 (through `@tailwindcss/vite`) and TypeScript in strict mode. `npm run build` type-checks with `vue-tsc -b` before bundling, so a type error fails the build.
- **Files:** `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `src/env.d.ts`, `.gitignore`.
- **Notes:**
  - TypeScript is pinned to 6.0.x (D13).
  - `.gitignore` excludes `node_modules`, `dist`, `linked.txt`, `.env*` and `.DS_Store`.

## F2 — Content types & data
- **What:** All content lives in typed data files, never in templates.
  - `linked.txt` was cleaned and deduplicated into `experiences.ts`. Conflicts were resolved under rule D7: LinkedIn for dates, v1 for descriptions.
  - About was rewritten in Maxime's voice (D10).
  - Skills come from v1 plus the stack found in LinkedIn (D9, D17).
- **Files:**
  - `src/types/content.ts`
  - `src/data/profile.ts`, `experiences.ts`, `about.ts`, `skills.ts`, `contact.ts`, `navigation.ts`
  - `src/assets/img/`
  - `public/favicon.ico`
- **Open items for Maxime:** see "Open items" at the end of this file.

## F3 — App shell & design system
- **What:**
  - **Layout:** sticky header with the desktop nav, a mobile menu that discloses on tap and a theme toggle; footer with social links; skip link.
  - **Theme:** dark by default, light on request. The choice is remembered, follows the OS when unset, and syncs across tabs.
  - **Look:** theme-aware colour tokens with an emerald accent, and Inter self-hosted.
  - **Motion:** a `v-reveal` scroll animation and route fades, both respecting reduced motion.
  - **Routing:** lazy routes, page titles, a 404 page, and scroll and focus handled after each transition.
- **Files:**
  - `index.html`, `src/main.ts`, `src/App.vue`, `src/assets/main.css`, `public/fonts/`
  - `src/stores/theme.ts`, `src/directives/reveal.ts`, `src/router/index.ts`
  - `src/utils/{date,scroll,routeTransition}.ts`
  - `src/components/layout/*` (AppHeader, MobileNav, ThemeToggle, AppFooter, SkipLink)
  - `src/components/ui/*` (PageHeader, BaseSection, BaseCard, TagList, LinkButton + buttonClasses, CompanyLogo, PeriodRange, SocialIcon)
  - `src/views/NotFoundView.vue`

## F4 — Home (`/`)
- **What:**
  - **Hero:** the page's `<h1>` with the name, title and headline; a "Currently {title} at {company}" pill derived from the ongoing experience; the portrait; CTAs to Experiences and Contact.
  - **Below the hero:** the intro, key-skill chips, an "At a glance" block (years of experience, companies and client missions, all computed from the data), and a card for the current role.
- **Files:** `src/views/HomeView.vue`, `src/components/home/{HomeHero,HomeIntro,HomeStats,CurrentRoleCard}.vue`.

## F5 — About (`/about`)
- **What:** Four first-person story sections. On large screens a sticky side column holds the portrait and a table of contents, with deep links like `/about#today`. Below them, an Education list (degree, school, employer for the apprenticeship, period, details).
- **Files:** `src/views/AboutView.vue`, `src/components/about/{AboutPhoto,AboutToc,AboutStory,AboutStorySection,EducationList}.vue`.

## F6 — Experiences (`/experiences`)
- **What:** A vertical timeline (`<ol>`) of 7 experiences, newest first.
  - **Layout:** one column on mobile; from md up, a date column and the cards.
  - **Each card:** logo or monogram, title and company, employment type and work mode chips, summary, highlights and stack.
  - **Missions:** client missions sit in a collapsible `<details>` block.
  - **Dates:** durations are LinkedIn-style; ongoing roles show "Present" and a "Current" badge; the header's years of experience come from `yearsOfExperience()` (D14).
- **Files:** `src/views/ExperiencesView.vue`, `src/components/experiences/{ExperienceItem,MissionList}.vue`, `src/utils/date.ts`.

## F7 — Skills (`/skills`)
- **What:**
  - **Intro and legend:** the intro text and a legend for the 1–5 scale (Basic → Expert).
  - **Filter:** a minimum-level filter built as a native radio group, with a live status message.
  - **Category cards:** each skill has a 5-segment meter (`role="meter"` with readable value text).
  - **Spoken languages:** shown with their CEFR-style note instead of a meter (D17).
- **Files:** `src/views/SkillsView.vue`, `src/components/skills/{SkillCategoryCard,SkillLevelMeter,SkillLevelBar,SkillLevelLegend,SkillLevelFilter}.vue`, `skillLevels.ts`.

## F8 — Contact (`/contact`)
- **What:**
  - **Email:** a "Show email address" button that decodes the build-time-encoded address (D18), then shows it with an "Email me" mailto (prefilled subject) and "Copy email" (Clipboard API with a fallback, announced in a live region).
  - **Cards:** one each for GitHub (`arca223`) and LinkedIn. Each card is a single link.
  - **Location:** a location line.
  - **No form** (D6).
- **Files:** `src/views/ContactView.vue`, `src/components/contact/{ContactCard,CopyEmailButton,EmailReveal}.vue`, `src/data/contact.ts`.

---

## Open items for Maxime
1. **Email** (D18): put `CONTACT_EMAIL=you@…` in `.env.local` (git-ignored) and restart `npm run dev`. On GitHub, add the repo secret `CONTACT_EMAIL`.
2. **Skill levels:** levels marked `// estimated` in `src/data/skills.ts` need confirming.
3. **About copy:** proofread `src/data/about.ts`.
4. **Education** (`TODO(Maxime)` in `about.ts`):
   - the engineering school's name
   - "IUT 2, Grenoble"
   - the DUT dates (2011–2013 are inferred)
5. **Experiences:**
   - the HomeServe wording ("phone district")
   - the stack of MAX's Bedrock mission (empty: no source)
   - the Bedrock freelance entry's summary (sparse: LinkedIn has no description)
6. **Years of experience:** currently computed without the 2013–2016 apprenticeship (D14). Decide whether to include it.
7. **Deploying:** `.github/workflows/deploy.yml` deploys to GitHub Pages on every push to `main`. Set **Settings → Pages → Source → GitHub Actions**, the secret `CONTACT_EMAIL`, and the repo variable `PAGES_BASE` (`/` for an `arca223.github.io` repo, `/portfolio-v3/` for a project repo). The workflow copies `index.html` to `404.html`, so links straight to a page like `/about` still work. On other hosts, set up an SPA fallback.
