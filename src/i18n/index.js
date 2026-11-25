 import { createI18n } from 'vue-i18n'
import km from './locales/km.json'
import en from './locales/en.json'
import fr from './locales/fr.json'
import zh from './locales/zh.json'

export const SUPPORTED_LOCALES = ['km', 'en', 'fr', 'zh']

const STORAGE_KEY = 'bon-om-touk:lang'

/** Stored choice first, then browser language, then Khmer (the default). */
export function detectLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED_LOCALES.includes(stored)) return stored
  } catch {
    // Storage can be blocked (private mode, embedded webviews) — ignore.
  }

  const browser = (typeof navigator !== 'undefined' && navigator.language ? navigator.language : '').toLowerCase()
  if (browser.startsWith('zh')) return 'zh'
  const base = browser.split('-')[0]
  return SUPPORTED_LOCALES.includes(base) ? base : 'km'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'km',
  messages: { km, en, fr, zh },
  // All locale files share one key structure; silence noisy dev-only notices.
  missingWarn: false,
  fallbackWarn: false,
})

/** Keep <html lang>, the font class and the document title in sync. */
export function applyLangAttributes(locale) {
  if (typeof document === 'undefined') return
  const html = document.documentElement
  SUPPORTED_LOCALES.forEach((code) => html.classList.remove(`lang-${code}`))
  html.classList.add(`lang-${locale}`)
  html.lang = locale === 'zh' ? 'zh-CN' : locale
  document.title = i18n.global.t('meta.title')
}

export { STORAGE_KEY }
export default i18n
