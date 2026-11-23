# Architecture

## Stack

| Concern | Choice | Version |
|---|---|---|
| Framework | Vue 3 (`<script setup lang="ts">`) | 3.5.45 |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) | 6.0.3 (pinned, see D13) |
| Type check | vue-tsc | 3.3.14 |
| Build / dev server | Vite + @vitejs/plugin-vue | 8.3.8 / 6.0.11 |
| Routing | Vue Router (web history) | 5.5.1 |
| State | Pinia (theme only) | 4.1.0 |
| Styling | Tailwind CSS through `@tailwindcss/vite` (CSS-first config) | 4.3.5 |
| Font | Inter, self-hosted woff2 (D16) | variable 400–700 |
| Runtime | Node | ≥ 20.19 (`engines`) |

These are the only runtime dependencies. See `decisions.md` D4 for the reasons.

## Scripts
- `npm run dev`: Vite dev server.
- `npm run build`: runs `vue-tsc -b` (type check, fails on any error), then `vite build` to `dist/`.
- `npm run preview`: serves `dist/`.
- `npm run type-check`: runs `vue-tsc -b` on its own.

## Folder structure
```
index.html                 # meta, Inter font, inline pre-paint theme script
public/favicon.ico, public/fonts/   # self-hosted Inter (OFL)
src/
  main.ts                  # createApp + Pinia + router + global v-reveal directive
  App.vue                  # SkipLink, AppHeader, <main> + RouterView/Transition, AppFooter, focus after navigation
  env.d.ts                 # vite/client types
  assets/
    main.css               # Tailwind import, dark variant, theme-aware colour tokens, base styles, animations
    img/profile/           # profile photo
    img/companies/         # company logos (missing logos → monogram fallback)
  types/content.ts         # every content interface (single source of truth)
  data/                    # typed content, no content in templates
    profile.ts experiences.ts skills.ts about.ts contact.ts navigation.ts
  stores/theme.ts          # useThemeStore: dark/light, localStorage, follows OS when unset
  directives/reveal.ts     # v-reveal: IntersectionObserver fade-in, respects reduced motion
  utils/                   # date.ts (formatting, durations, yearsOfExperience), scroll.ts, routeTransition.ts
  router/index.ts          # lazy routes, meta.title → document.title, 404, scrollBehavior
  components/
    layout/                # AppHeader, MobileNav, ThemeToggle, AppFooter, SkipLink
    ui/                    # PageHeader, BaseSection, BaseCard, TagList, LinkButton, CompanyLogo, SocialIcon
    home/ about/ experiences/ skills/ contact/   # page-specific components
  views/                   # HomeView, AboutView, ExperiencesView, SkillsView, ContactView, NotFoundView
docs/                      # this documentation
```

## Configuration & deployment
- `.env.local` (git-ignored) / Actions secret `CONTACT_EMAIL`: the contact email. `vite.config.ts` encodes it into `__CONTACT_EMAIL_ENC__` at build time (D18); see `.env.example`.
- `.github/workflows/deploy.yml`: builds with `--base=${PAGES_BASE}`, copies `index.html` to `404.html` as the SPA fallback, and deploys to GitHub Pages. Vite prefixes the base onto the assets, favicon and font paths, and the router uses `import.meta.env.BASE_URL`.

## Data flow
1. **Content.** `src/data/*.ts` exports constants typed with interfaces from `src/types/content.ts`, so a missing or wrong field is a compile error. Images are imported in data files, so Vite fingerprints them and the data carries resolved URLs.
2. **Views.** Each view imports only the data it needs and passes it down as typed props to its page components (`components/<page>/`), which build on the `ui/` primitives. Data is static, so there are no stores or fetches for content. Derived values (durations, years of experience) are `computed` or pure functions.
3. **Theme.**
   - The inline script in `index.html` reads `localStorage.theme`. If it is unset, it falls back to `prefers-color-scheme` (dark when there is no preference). It sets `<html class="dark">`, `color-scheme` and `theme-color` before the first paint.
   - `useThemeStore` (Pinia) then takes over: `toggle()` updates the class and persists the choice, and the store follows OS changes until the user has picked a theme.
4. **Colours.** CSS variables on `:root` and `.dark` are exposed as Tailwind colours (`bg-canvas`, `bg-surface`, `bg-subtle`, `text-fg`, `text-fg-muted`, `border-line`, `*-accent`, `bg-accent-soft`, `text-on-accent`). Components never need `dark:` pairs. The accent is emerald-700 in light mode and emerald-400 in dark mode; both pass AA contrast.
5. **Navigation.**
   - The header nav comes from `data/navigation.ts`, with `aria-current="page"` on the active link.
   - Route changes fade (`out-in`). After each change, `document.title` comes from `meta.title`, the scroll position resets or is restored (with a header offset for `#hash` targets), and focus moves to the new page's `<h1>` for screen readers.
6. **Motion.** `v-reveal` and the route transition are disabled under `prefers-reduced-motion`.

## Page conventions
- Each view has one root element, because the route `<Transition mode="out-in">` needs a single child.
- Each view has exactly one `<h1>` with `tabindex="-1"`, rendered by `ui/PageHeader`.
  - **Exception:** the Home hero (`components/home/HomeHero.vue`) renders its own `<h1>` with `tabindex="-1"` (review H-10, accepted).
- After a navigation, the router's `scrollBehavior` waits for the new view's `after-enter`, then restores or sets the scroll position and focuses the target. See `utils/routeTransition.ts` and `utils/scroll.ts`.
- Page intros (eyebrow, title, description) live in `src/data/*`, typed as `PageIntro` or `ContactIntro`.
- Dates are formatted only through `src/utils/date.ts` and `ui/PeriodRange.vue`. Never put a duration in `<time datetime>`.
