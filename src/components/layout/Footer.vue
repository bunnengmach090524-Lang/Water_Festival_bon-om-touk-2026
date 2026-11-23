<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const exploreLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/destinations', label: 'nav.destinations' },
  { to: '/gallery', label: 'nav.gallery' },
]
const infoLinks = [
  { to: '/about', label: 'nav.about' },
  { to: '/schedule', label: 'nav.schedule' },
  { to: '/tips', label: 'nav.tips' },
]
</script>

<template>
  <footer class="relative z-10 mt-10 border-t border-gold/20 bg-[color-mix(in_srgb,var(--color-midnight)_70%,var(--page-bg))] transition-colors duration-300">
    <div class="site-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="font-display text-2xl text-gold-light">{{ t('meta.siteName') }}</p>
        <p class="mt-4 max-w-xs text-sm leading-7 text-muted">{{ t('footer.tagline') }}</p>
      </div>

      <div>
        <h2 class="eyebrow">{{ t('footer.explore') }}</h2>
        <ul class="mt-5 space-y-1">
          <li v-for="link in exploreLinks" :key="link.to">
            <RouterLink :to="link.to" class="inline-flex min-h-11 items-center text-sm text-ivory/80 transition hover:text-gold-light">
              {{ t(link.label) }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="eyebrow">{{ t('footer.information') }}</h2>
        <ul class="mt-5 space-y-1">
          <li v-for="link in infoLinks" :key="link.to">
            <RouterLink :to="link.to" class="inline-flex min-h-11 items-center text-sm text-ivory/80 transition hover:text-gold-light">
              {{ t(link.label) }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="text-sm leading-7 text-muted">
        <p>{{ t('footer.mediaNote') }}</p>
        <p class="mt-2">{{ t('footer.musicCredit') }}</p>
        <p class="mt-2">{{ t('footer.officialNote') }}</p>
        <RouterLink to="/dashboard" class="mt-3 inline-flex min-h-11 items-center text-xs text-muted/80 underline decoration-gold/40 underline-offset-4 transition hover:text-gold-light">
          {{ t('footer.dashboard') }}
        </RouterLink>
      </div>
    </div>

    <div class="site-container flex flex-col gap-2 border-t border-gold/10 py-6 text-xs text-muted/80 sm:flex-row sm:items-center sm:justify-between">
      <span>{{ t('footer.rights') }}</span>
      <span>{{ t('meta.fullName') }}</span>
    </div>
  </footer>
</template>
