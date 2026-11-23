import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { applyLangAttributes, STORAGE_KEY, SUPPORTED_LOCALES } from '../i18n'

/**
 * Single place for language switching: updates vue-i18n, localStorage,
 * <html lang>, the font class and the document title.
 */
export function useLang() {
  const { locale, t } = useI18n()

  function setLocale(next) {
    if (!SUPPORTED_LOCALES.includes(next) || next === locale.value) {
      applyLangAttributes(locale.value)
      return
    }
    locale.value = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage may be unavailable; the choice still applies for this visit.
    }
    applyLangAttributes(next)
  }

  return {
    locale: computed(() => locale.value),
    locales: SUPPORTED_LOCALES,
    setLocale,
    t,
  }
}
