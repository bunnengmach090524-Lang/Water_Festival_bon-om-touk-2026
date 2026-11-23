/** Lightweight pointer-driven 3D tilt for cards (never on touch devices). */
const attached = new WeakMap()

function disabled() {
  return (
    typeof window === 'undefined' ||
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia?.('(hover: none), (pointer: coarse)').matches
  )
}

export const tiltDirective = {
  mounted(el) {
    if (disabled()) return

    const state = { frame: 0 }
    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      if (state.frame) cancelAnimationFrame(state.frame)
      state.frame = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${(px * 8).toFixed(2)}deg`)
      })
    }
    const onLeave = () => {
      if (state.frame) cancelAnimationFrame(state.frame)
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    attached.set(el, { state, onMove, onLeave })
  },
  unmounted(el) {
    const entry = attached.get(el)
    if (!entry) return
    if (entry.state.frame) cancelAnimationFrame(entry.state.frame)
    el.removeEventListener('pointermove', entry.onMove)
    el.removeEventListener('pointerleave', entry.onLeave)
    attached.delete(el)
  },
}

export function useTilt() {
  return tiltDirective
}
