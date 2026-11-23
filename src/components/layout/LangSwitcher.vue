<script setup>
import { useLang } from '../../composables/useLang'

const { locale, locales, setLocale, t } = useLang()

const options = locales.map((code) => ({ code, label: () => t(`lang.${code}`) }))
</script>

<template>
  <div
    class="flex items-center gap-0.5 rounded-full border border-gold/25 bg-[var(--glass-bg)] p-1"
    role="group"
    :aria-label="t('lang.label')"
  >
    <span class="sr-only">{{ t('lang.label') }}</span>
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="lang-option min-h-11 min-w-11 rounded-full px-2.5 text-xs font-semibold transition duration-300 sm:px-3"
      :class="
        locale === option.code
          ? 'bg-gold-light text-on-gold shadow-gold'
          : 'text-ivory/75 hover:bg-gold/15 hover:text-gold-light'
      "
      :lang="option.code"
      :aria-pressed="locale === option.code"
      @click="setLocale(option.code)"
    >
      {{ option.label() }}
    </button>
  </div>
</template>

<style scoped>
/* Each label keeps its own script font, regardless of the active site language. */
.lang-option {
  font-family: var(--font-body);
}
.lang-option[lang="km"] {
  font-family: "Noto Sans Khmer", "Moul", "Khmer OS", sans-serif;
  font-feature-settings: "kern";
}
.lang-option[lang="zh"] {
  font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.lang-option[lang="en"],
.lang-option[lang="fr"] {
  font-family: "Inter", system-ui, sans-serif;
}
</style>
