<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { theme, toggleTheme } from '../../composables/useTheme'

const { t } = useI18n()
const isDark = computed(() => theme.value === 'dark')
const label = computed(() => (isDark.value ? t('theme.toLight') : t('theme.toDark')))
</script>

<template>
  <button
    type="button"
    class="theme-toggle flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-night/45 text-gold-light shadow-[0_0_14px_color-mix(in_srgb,var(--color-gold)_18%,transparent)] transition duration-300 hover:border-gold-light hover:bg-gold/15"
    :aria-label="label"
    :title="label"
    :aria-pressed="!isDark"
    @click="toggleTheme"
  >
    <!-- Moon: shown in dark mode (click = go to light). -->
    <svg v-if="isDark" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
      <path d="M19.5 15.2A8.2 8.2 0 0 1 8.8 4.5 8.5 8.5 0 1 0 19.5 15.2Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17 3.5v3M15.5 5h3" stroke-linecap="round" />
    </svg>
    <!-- Sun: shown in light mode (click = go to dark). -->
    <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8" stroke-linecap="round" />
    </svg>
  </button>
</template>
