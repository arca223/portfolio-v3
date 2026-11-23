import type { Directive } from 'vue'

/**
 * v-reveal — fades/slides an element in the first time it enters the viewport.
 *
 *   <div v-reveal>…</div>
 *   <li v-for="(item, i) in items" v-reveal="i * 80">…</li>   // optional delay in ms
 *
 * No-op (element stays visible) when the visitor prefers reduced motion
 * or IntersectionObserver is unavailable.
 */
type RevealDelay = number | undefined

const observed = new WeakMap<Element, IntersectionObserver>()

function canAnimate(): boolean {
  return (
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

/** Drop reveal styles once shown so the element's own transitions (hover…) apply again. */
function cleanup(el: HTMLElement): void {
  el.classList.remove('reveal', 'is-revealed')
  el.style.transitionDelay = ''
}

export const vReveal: Directive<HTMLElement, RevealDelay> = {
  mounted(el, { value }) {
    if (!canAnimate()) return

    if (typeof value === 'number' && value > 0) {
      el.style.transitionDelay = `${value}ms`
    }
    el.classList.add('reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const onEnd = (event: TransitionEvent): void => {
            if (event.target !== el) return
            el.removeEventListener('transitionend', onEnd)
            cleanup(el)
          }
          el.addEventListener('transitionend', onEnd)
          el.classList.add('is-revealed')
          observer.disconnect()
          observed.delete(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    observer.observe(el)
    observed.set(el, observer)
  },
  unmounted(el) {
    observed.get(el)?.disconnect()
    observed.delete(el)
  },
}
