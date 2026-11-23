import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'
import { expectRouteEnter, notifyRouteEnter, waitForRouteEnter } from '@/utils/routeTransition'
import {
  HEADER_OFFSET,
  findHashTarget,
  focusElement,
  focusPageHeading,
  scrollMotion,
} from '@/utils/scroll'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const SITE_NAME = 'Maxime Cocquempot'
const HOME_TITLE = `${SITE_NAME} — Freelance Software Engineer`

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: HOME_TITLE },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/experiences',
    name: 'experiences',
    component: () => import('@/views/ExperiencesView.vue'),
    meta: { title: 'Experiences' },
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('@/views/SkillsView.vue'),
    meta: { title: 'Skills' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contact' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page not found' },
  },
]

/**
 * True when App.vue's route <Transition> will swap views (and fire after-enter):
 * not on first load (no `appear`), not when the same record re-renders.
 */
function changesView(to: RouteLocationNormalized, from: RouteLocationNormalized): boolean {
  return from.matched.length > 0 && to.matched.at(-1) !== from.matched.at(-1)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  /**
   * Runs after the new view has entered (see utils/routeTransition), so the
   * target exists and the out-in transition doesn't fight the scroll.
   * Saved position (back/forward) → restore instantly; #hash → scroll to it
   * with the header offset and focus it; otherwise → top + focus the page h1.
   */
  async scrollBehavior(to, from, savedPosition) {
    const firstLoad = from.matched.length === 0
    const samePath = !firstLoad && to.path === from.path
    if (!savedPosition && samePath && !to.hash) return false

    await waitForRouteEnter()

    if (savedPosition) {
      if (!firstLoad && !samePath) focusPageHeading()
      return { ...savedPosition, behavior: 'instant' }
    }

    const target = to.hash ? findHashTarget(to.hash) : null
    if (target) {
      focusElement(target)
      return { el: target, top: HEADER_OFFSET, behavior: samePath ? scrollMotion() : 'instant' }
    }

    if (!firstLoad) focusPageHeading()
    return { top: 0, left: 0, behavior: 'instant' }
  },
})

// Must run before the view swaps so scrollBehavior has something to wait for.
router.beforeResolve((to, from) => {
  if (changesView(to, from)) expectRouteEnter()
})

// A navigation cancelled/redirected after beforeResolve never swaps the view:
// release the pending wait so later same-view navigations don't hit the timeout.
router.afterEach((_to, _from, failure) => {
  if (failure) notifyRouteEnter()
})

router.afterEach((to) => {
  document.title = to.name === 'home' ? HOME_TITLE : `${to.meta.title} · ${SITE_NAME}`
})

export default router
