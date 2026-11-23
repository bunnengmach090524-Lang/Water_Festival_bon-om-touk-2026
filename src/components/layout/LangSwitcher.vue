<script setup>
import { useLang } from '../../composables/useLang'

const { locale, locales, setLocale, t } = useLang()

const options = locales.map((code) => ({ code, label: () => t(`lang.${code}`) }))
</script>

<template>
  <div
    class="flex items-center gap-0.5 rounded-full border border-gold/25 bg-night/50 p-1"
    role="group"
    :aria-label="t('lang.label')"
  >
    <span class="sr-only">{{ t('lang.label') }}</span>
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="min-h-11 min-w-11 rounded-full px-2.5 text-xs font-semibold transition duration-300 sm:px-3"
      :class="
        locale === option.code
          ? 'bg-gold text-midnight shadow-gold'
          : 'text-ivory/75 hover:bg-gold/15 hover:text-gold-light'
      "
      :aria-pressed="locale === option.code"
      @click="setLocale(option.code)"
    >
      {{ option.label() }}
    </button>
  </div>
</template>
