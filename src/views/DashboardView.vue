<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import WaveDivider from '../components/effects/WaveDivider.vue'

const { t, tm } = useI18n()
const code = (import.meta.env.VITE_GOATCOUNTER_CODE || '').trim()
const configured = Boolean(code)
const statsUrl = computed(() => `https://${code}.goatcounter.com`)
const channels = ['facebook', 'telegram', 'tiktok', 'line', 'other']
const copyStatus = ref('')
let statusTimer = 0

const baseUrl = computed(() => `${window.location.origin}${window.location.pathname}`)

function trackingLink(channel) {
  return `${baseUrl.value}?ref=${channel}`
}

function showStatus(message) {
  copyStatus.value = message
  window.clearTimeout(statusTimer)
  statusTimer = window.setTimeout(() => {
    copyStatus.value = ''
  }, 2400)
}

async function copyLink(channel) {
  const text = trackingLink(channel)
  try {
    await navigator.clipboard.writeText(text)
    showStatus(t('dashboard.copy.copied'))
  } catch {
    // Fallback for non-secure contexts / older browsers.
    const field = document.createElement('textarea')
    field.value = text
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const success = document.execCommand('copy')
    field.remove()
    showStatus(success ? t('dashboard.copy.copied') : t('dashboard.copy.failed'))
  }
}
</script>

<template>
  <div>
    <header class="relative overflow-hidden border-b border-gold/15 py-20 text-center sm:py-28">
      <div class="page-header-glow pointer-events-none absolute inset-0 opacity-35"></div>
      <div class="site-container relative">
        <p v-reveal class="eyebrow">{{ t('dashboard.eyebrow') }}</p>
        <h1 v-reveal="80" class="section-title mx-auto mt-5">{{ t('dashboard.title') }}</h1>
        <p v-reveal="150" class="lead mx-auto mt-6 max-w-3xl">{{ t('dashboard.subtitle') }}</p>
      </div>
      <WaveDivider class="absolute inset-x-0 bottom-0" />
    </header>

    <section v-if="!configured" class="section-shell">
      <div class="site-container mx-auto max-w-2xl">
        <div v-reveal class="card-lift rounded-2xl p-8 text-center sm:p-12">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
            <svg viewBox="0 0 32 32" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M6 24V14m7 10V8m7 16v-7m7 7V5" stroke-linecap="round" />
            </svg>
          </div>
          <h2 class="mt-6 font-display text-3xl text-ivory">{{ t('dashboard.notConfigured.title') }}</h2>
          <p class="lead mt-4">{{ t('dashboard.notConfigured.body') }}</p>
        </div>
      </div>
    </section>

    <template v-else>
      <section class="section-shell">
        <div class="site-container mx-auto max-w-5xl">
          <div v-reveal class="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 class="font-display text-3xl text-gold-light sm:text-4xl">{{ t('dashboard.privacy.title') }}</h2>
              <ul class="mt-6 space-y-4">
                <li v-for="(item, index) in tm('dashboard.privacy.items')" :key="index" class="flex gap-3 leading-7 text-ivory/90">
                  <span class="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div class="card-lift rounded-2xl p-6 sm:p-8">
              <p class="text-sm leading-7 text-ivory/85">{{ t('dashboard.publicNote') }}</p>
              <p class="mt-4 text-sm leading-7 text-muted">{{ t('dashboard.unlistedNote') }}</p>
              <a :href="statsUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary mt-7 w-full">
                <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                  <path d="M11 4h5v5M16 4l-7 7M15 12v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ t('dashboard.openStats') }}
              </a>
            </div>
          </div>

          <div v-reveal class="mt-14">
            <h2 class="font-display text-3xl text-gold-light sm:text-4xl">{{ t('dashboard.statsTitle') }}</h2>
            <div class="mt-6 overflow-hidden rounded-2xl border border-gold/20 bg-night/60">
              <iframe
                :src="statsUrl"
                :title="t('dashboard.statsIframeTitle')"
                class="h-[540px] w-full border-0 bg-ivory"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p class="mt-3 text-sm leading-7 text-muted">{{ t('dashboard.embedBlocked') }}</p>
          </div>
        </div>
      </section>

      <section class="section-shell bg-night/30">
        <div class="site-container mx-auto max-w-5xl">
          <div v-reveal class="max-w-2xl">
            <h2 class="font-display text-3xl text-gold-light sm:text-4xl">{{ t('dashboard.copy.title') }}</h2>
            <p class="lead mt-4">{{ t('dashboard.copy.subtitle') }}</p>
            <p class="mt-2 min-h-6 text-sm text-gold-light" aria-live="polite">{{ copyStatus }}</p>
          </div>
          <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="channel in channels" :key="channel" v-reveal class="card-lift rounded-2xl p-5">
              <p class="eyebrow">{{ t(`dashboard.copy.${channel}`) }}</p>
              <p class="mt-3 break-all text-xs leading-6 text-muted">{{ trackingLink(channel) }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <a :href="trackingLink(channel)" target="_blank" rel="noopener noreferrer" class="btn btn-ghost min-h-11 px-4 py-2 text-xs">
                  {{ t(`dashboard.copy.${channel}`) }} ↗
                </a>
                <button type="button" class="btn btn-primary min-h-11 px-4 py-2 text-xs" @click="copyLink(channel)">
                  {{ t('dashboard.copy.button') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <section class="section-shell">
      <div class="site-container mx-auto max-w-4xl">
        <div v-reveal>
          <h2 class="font-display text-3xl text-gold-light sm:text-4xl">{{ t('dashboard.setup.title') }}</h2>
          <ol class="mt-8 space-y-5">
            <li v-for="(step, index) in tm('dashboard.setup.steps')" :key="index" class="flex gap-4">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/45 text-sm text-gold-light">{{ index + 1 }}</span>
              <p class="leading-7 text-ivory/90">{{ step }}</p>
            </li>
          </ol>
          <p class="mt-8 text-sm leading-7 text-muted">{{ t('dashboard.publicNote') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
