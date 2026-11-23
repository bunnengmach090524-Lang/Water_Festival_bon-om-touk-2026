<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MoonGlow from '../components/effects/MoonGlow.vue'
import Lanterns from '../components/effects/Lanterns.vue'
import Hero3D from '../components/effects/Hero3D.vue'
import WaveDivider from '../components/effects/WaveDivider.vue'
import TraditionCard from '../components/cards/TraditionCard.vue'
import DestinationCard from '../components/cards/DestinationCard.vue'
import CloudImage from '../components/media/CloudImage.vue'
import { destinations } from '../data/destinations'
import { traditions } from '../data/traditions'
import { galleryImages } from '../data/media'
import { inferCategory } from '../components/scenes/inferCategory'

const { t, tm } = useI18n()

/* --- Festival clock, calculated in Asia/Phnom_Penh (UTC+7, no DST) --------- */
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Phnom_Penh',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

function cambodiaParts(date) {
  const parts = formatter.formatToParts(date)
  const result = {}
  parts.forEach(({ type, value }) => {
    if (type !== 'literal') result[type] = Number(value)
  })
  return result
}

// Derive the fixed UTC offset from a sample date near the festival.
const sample = new Date('2026-11-24T12:00:00Z')
const sampleParts = cambodiaParts(sample)
const offsetMs =
  Date.UTC(sampleParts.year, sampleParts.month - 1, sampleParts.day, sampleParts.hour, sampleParts.minute, sampleParts.second) -
  sample.getTime()
const startMs = Date.UTC(2026, 10, 23, 0, 0, 0) - offsetMs
const endMs = Date.UTC(2026, 10, 26, 0, 0, 0) - offsetMs

const clock = ref({ mode: 'before', days: 0, hours: 0, minutes: 0, seconds: 0, night: 1 })

function updateClock() {
  const now = Date.now()
  if (now < startMs) {
    const remaining = startMs - now
    clock.value = {
      mode: 'before',
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining / 3600000) % 24),
      minutes: Math.floor((remaining / 60000) % 60),
      seconds: Math.floor((remaining / 1000) % 60),
      night: 1,
    }
  } else if (now < endMs) {
    const day = cambodiaParts(new Date(now)).day
    clock.value = { ...clock.value, mode: 'now', night: day >= 25 ? 3 : day === 24 ? 2 : 1 }
  } else {
    clock.value = { ...clock.value, mode: 'after' }
  }
}

let timer = 0
onMounted(() => {
  updateClock()
  timer = window.setInterval(updateClock, 1000)
})
onBeforeUnmount(() => window.clearInterval(timer))

/* --- Curated home selections --------------------------------------------- */
const featured = computed(() =>
  ['pp_riverside', 'sr_angkor_wat', 'kp_riverside']
    .map((id) => destinations.find((item) => item.id === id))
    .filter(Boolean),
)
const teaserImages = galleryImages.slice(0, 3)
</script>

<template>
  <div>
    <!-- HERO --------------------------------------------------------------- -->
    <section class="relative isolate flex min-h-[min(900px,100svh)] items-center overflow-hidden pb-28 pt-20 sm:pb-32">
      <!-- All decorative layers stay below the readability scrim and hero copy. -->
      <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <MoonGlow />
        <Lanterns />
        <Hero3D />
      </div>
      <!-- Readability scrim: keeps hero text well above WCAG AA over the moon glow. -->
      <div class="hero-scrim pointer-events-none absolute inset-0 z-[1]"></div>
      <div class="hero-fade pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-56"></div>

      <div class="site-container relative z-10 text-center">
        <p v-reveal class="eyebrow">{{ t('home.eyebrow') }}</p>
        <h1 v-reveal="80" class="mt-5 font-display text-5xl leading-[0.95] text-ivory sm:text-7xl lg:text-8xl">
          <span class="block">{{ t('home.titleLine1') }}</span>
          <span class="mt-2 block text-gold-light sm:mt-4">{{ t('home.titleLine2') }}</span>
        </h1>
        <p v-reveal="160" class="mt-6 font-display text-base text-gold-light sm:text-xl">
          {{ t('meta.fullName') }}
        </p>
        <p v-reveal="220" class="lead mx-auto mt-6 max-w-2xl">
          {{ t('home.subtitle') }}
        </p>

        <div v-reveal="280" class="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          <RouterLink to="/destinations" class="btn btn-primary">{{ t('home.ctaExplore') }}</RouterLink>
          <RouterLink to="/schedule" class="btn btn-ghost">{{ t('home.ctaSchedule') }}</RouterLink>
        </div>

        <div
          v-reveal="340"
          class="mx-auto mt-10 inline-flex min-h-12 flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-full border border-gold/25 bg-[var(--glass-bg)] px-5 py-2 text-xs text-ivory/85 backdrop-blur sm:text-sm"
          aria-live="polite"
        >
          <template v-if="clock.mode === 'before'">
            <span class="font-semibold text-gold-light">{{ t('home.countdown.before') }}</span>
            <span class="tabular-nums">
              {{ clock.days }}{{ t('home.countdown.days') }} · {{ clock.hours }}{{ t('home.countdown.hours') }} ·
              {{ clock.minutes }}{{ t('home.countdown.minutes') }} · {{ clock.seconds }}{{ t('home.countdown.seconds') }}
            </span>
          </template>
          <template v-else-if="clock.mode === 'now'">
            <span class="h-2 w-2 animate-pulse rounded-full bg-crimson shadow-[0_0_10px_color-mix(in_srgb,var(--color-crimson)_90%,transparent)]"></span>
            <span class="font-semibold text-gold-light">{{ t('home.countdown.now') }}</span>
            <span>{{ t('home.countdown.night', { n: clock.night }) }}</span>
          </template>
          <template v-else>
            <span>{{ t('home.countdown.after') }}</span>
          </template>
        </div>
      </div>

      <WaveDivider class="absolute inset-x-0 bottom-0" />
    </section>

    <!-- INTRO -------------------------------------------------------------- -->
    <section class="section-shell">
      <div class="site-container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div v-reveal>
          <p class="eyebrow">{{ t('home.intro.eyebrow') }}</p>
          <h2 class="section-title mt-4">{{ t('home.intro.title') }}</h2>
          <hr class="gold-rule mt-8 max-w-sm" />
        </div>
        <div v-reveal="120" class="space-y-5">
          <p v-for="(paragraph, index) in tm('home.intro.body')" :key="index" class="lead">
            {{ paragraph }}
          </p>
          <RouterLink to="/about" class="btn btn-ghost mt-2">{{ t('common.learnMore') }}</RouterLink>
        </div>
      </div>
    </section>

    <!-- TRADITIONS --------------------------------------------------------- -->
    <section class="section-shell bg-night/30">
      <div class="site-container">
        <div v-reveal class="max-w-2xl">
          <p class="eyebrow">{{ t('home.traditions.eyebrow') }}</p>
          <h2 class="section-title mt-4">{{ t('home.traditions.title') }}</h2>
          <p class="lead mt-5">{{ t('home.traditions.subtitle') }}</p>
          <p class="mt-3 text-xs tracking-wide text-muted/80">{{ t('home.traditions.hint') }}</p>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(item, index) in traditions" :key="item.id" v-reveal="index * 90">
            <TraditionCard :item="item" />
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED DESTINATIONS ---------------------------------------------- -->
    <section class="section-shell">
      <div class="site-container">
        <div v-reveal class="flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-2xl">
            <p class="eyebrow">{{ t('home.destinations.eyebrow') }}</p>
            <h2 class="section-title mt-4">{{ t('home.destinations.title') }}</h2>
            <p class="lead mt-5">{{ t('home.destinations.subtitle') }}</p>
          </div>
          <RouterLink to="/destinations" class="btn btn-ghost">{{ t('home.destinations.cta') }}</RouterLink>
        </div>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(place, index) in featured" :key="place.id" v-reveal="index * 100">
            <DestinationCard
              :destination="place"
              :name="t(place.nameKey)"
              :description="t(place.descKey)"
              :region-label="t(`destinations.filters.${place.province}`)"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY TEASER ------------------------------------------------------ -->
    <section class="section-shell bg-night/30">
      <div class="site-container">
        <div v-reveal class="flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-2xl">
            <p class="eyebrow">{{ t('home.gallery.eyebrow') }}</p>
            <h2 class="section-title mt-4">{{ t('home.gallery.title') }}</h2>
            <p class="lead mt-5">{{ t('home.gallery.subtitle') }}</p>
          </div>
          <RouterLink to="/gallery" class="btn btn-ghost">{{ t('home.gallery.cta') }}</RouterLink>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-3">
          <div v-for="(item, index) in teaserImages" :key="item.id" v-reveal="index * 100">
            <RouterLink to="/gallery" class="image-zoom group block rounded-2xl">
              <CloudImage
                :public-id="item.publicId"
                :alt="t(item.captionKey)"
                :category="inferCategory(item.publicId, item.category)"
                aspect="4 / 3"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <p class="mt-3 text-sm leading-6 text-muted transition-colors group-hover:text-gold-light">
                {{ t(item.captionKey) }}
              </p>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
