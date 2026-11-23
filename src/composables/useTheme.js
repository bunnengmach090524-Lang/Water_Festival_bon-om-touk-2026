import { readonly, ref, watch } from 'vue'

/**
 * Shared dark / light theme state.
 * The initial value is validated by the tiny inline script in index.html so
 * the first paint already has the right palette; this composable keeps Vue,
 * localStorage, <html data-theme> and the browser theme colour in sync.
 */
export const THEME_STORAGE_KEY = 'bon-om-touk:theme'
const META_SELECTOR = 'meta[name="theme-color"]'
const THEME_COLORS = { dark: '#0b1026', light: '#fbf7ee' }

function readStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : ''
  } catch {
    // Storage can be blocked (private mode, embedded webviews).
    return ''
  }
}

function preferredTheme() {
  if (typeof window === 'undefined') return 'dark'
  try {
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

const stored = readStoredTheme()
const hasSavedChoice = Boolean(stored)
export const theme = ref(stored || preferredTheme())

function applyTheme(value) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = value
  const meta = document.head.querySelector(META_SELECTOR)
  if (meta) meta.setAttribute('content', THEME_COLORS[value] || THEME_COLORS.dark)
}

export function setTheme(value) {
  if (value !== 'light' && value !== 'dark') return
  theme.value = value
  try {
    localStorage.setItem(THEME_STORAGE_KEY, value)
  } catch {
    // The choice still applies for this visit.
  }
}

export function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

applyTheme(theme.value)
watch(theme, applyTheme)

if (typeof window !== 'undefined' && !hasSavedChoice) {
  // Follow the OS until the visitor makes an explicit choice.
  try {
    const query = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (event) => {
      theme.value = event.matches ? 'light' : 'dark'
    }
    query.addEventListener?.('change', onChange)
  } catch {
    // matchMedia is optional; the fallback theme stays in place.
  }
}

export function useTheme() {
  return {
    theme: readonly(theme),
    setTheme,
    toggleTheme,
  }
}
