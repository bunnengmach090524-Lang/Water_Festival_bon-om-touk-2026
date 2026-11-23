/** Shared IntersectionObserver that fades/slides elements into view once. */
const observers = new WeakMap()

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function reveal(el) {
  el.classList.add('is-visible')
}

export const revealDirective = {
  mounted(el, binding) {
    el.classList.add('reveal')
    const delay = Number(binding.value) || 0
    el.style.setProperty('--reveal-delay', `${delay}ms`)

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      reveal(el)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          reveal(entry.target)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}

export function useReveal() {
  return revealDirective
}
