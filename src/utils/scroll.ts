/**
 * Scroll & focus helpers shared by the router and page code.
 * Pure DOM utilities: no Vue, no router.
 */

/** Sticky header height + breathing room, in px (matches `scroll-padding-top: 5rem`). */
export const HEADER_OFFSET = 80

const NATIVELY_FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex], [contenteditable="true"]'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
}

/** `'smooth'` unless the visitor prefers reduced motion. */
export function scrollMotion(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}

/**
 * Element targeted by a URL hash (`'#about'`), or null.
 * Uses getElementById (no CSS escaping issues) and tolerates percent-encoding.
 */
export function findHashTarget(hash: string): HTMLElement | null {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  if (!raw) return null
  let id = raw
  try {
    id = decodeURIComponent(raw)
  } catch {
    // Malformed escape sequence: fall back to the raw value.
  }
  return document.getElementById(id) ?? (id === raw ? null : document.getElementById(raw))
}

/**
 * Move keyboard/screen-reader focus to `el` without scrolling.
 * Non-focusable targets (sections, headings) get `tabindex="-1"` first.
 */
export function focusElement(el: HTMLElement): void {
  if (!el.matches(NATIVELY_FOCUSABLE)) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

/**
 * After a page change: focus the new page's `<h1 tabindex="-1">`, else `<main>`.
 * (The Home hero renders its own h1 and must keep `tabindex="-1"` for this.)
 */
export function focusPageHeading(): void {
  const main = document.getElementById('main')
  const target = main?.querySelector<HTMLElement>('h1[tabindex="-1"]') ?? main
  target?.focus({ preventScroll: true })
}

/**
 * Scroll to the element targeted by `hash` (header offset included, smooth
 * unless reduced motion) and move focus to it. Use it for in-page links that
 * the router ignores, e.g. clicking the same `#hash` link twice.
 *
 * @returns false when no element matches the hash.
 */
export function scrollToHash(hash: string): boolean {
  const target = findHashTarget(hash)
  if (!target) return false
  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: scrollMotion() })
  focusElement(target)
  return true
}
