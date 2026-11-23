/**
 * Coordination between the route <Transition> in App.vue and the router's
 * `scrollBehavior`: with `mode="out-in"` the new view only exists once the old
 * one has left, so scrolling (saved position, #hash, top) must wait for the
 * new view to have *entered*.
 *
 *   router.beforeResolve → expectRouteEnter()      (only when the view changes)
 *   <Transition @after-enter> → notifyRouteEnter()
 *   scrollBehavior → await waitForRouteEnter()     (safety timeout)
 *
 *   router.afterEach (navigation failure) → notifyRouteEnter()
 *
 * Works the same under reduced motion (transitions last 0.01ms, after-enter
 * still fires); the timeout covers any path where after-enter never comes and
 * clears the stale pending state so later navigations don't wait for it.
 */

/** Safety net in ms: leave (180ms) + enter (180ms) + margin. */
export const ROUTE_ENTER_TIMEOUT_MS = 600

interface Deferred {
  promise: Promise<void>
  resolve: () => void
}

let pending: Deferred | null = null

/**
 * Declare that a view transition is starting. Idempotent: rapid successive
 * navigations share the same pending promise, resolved by the next after-enter.
 */
export function expectRouteEnter(): void {
  if (pending) return
  let resolve!: () => void
  const promise = new Promise<void>((r) => {
    resolve = r
  })
  pending = { promise, resolve }
}

/** Signal that the new view has entered (call from `<Transition @after-enter>`). */
export function notifyRouteEnter(): void {
  const current = pending
  pending = null
  current?.resolve()
}

/**
 * Resolves once the pending view has entered, after `timeoutMs` at the latest,
 * or immediately when no transition is pending (first load, same view).
 */
export function waitForRouteEnter(timeoutMs: number = ROUTE_ENTER_TIMEOUT_MS): Promise<void> {
  const current = pending
  if (!current) return Promise.resolve()
  return Promise.race([
    current.promise,
    new Promise<void>((resolve) =>
      window.setTimeout(() => {
        // after-enter never came: drop the stale entry (only if still the same one).
        if (pending === current) pending = null
        resolve()
      }, timeoutMs),
    ),
  ])
}
