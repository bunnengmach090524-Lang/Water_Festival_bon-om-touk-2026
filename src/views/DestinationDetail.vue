<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CloudImage from '../components/media/CloudImage.vue'
import WaveDivider from '../components/effects/WaveDivider.vue'
import { destinations, mapsUrl } from '../data/destinations'

const { t } = useI18n()
const route = useRoute()
const place = computed(() => destinations.find((item) => item.id === route.params.id))
const mapLink = computed(() => (place.value ? mapsUrl(place.value) : ''))
</script>

<template>
  <div v-if="place">
    <header class="relative overflow-hidden border-b border-gold/15 pb-20 pt-10 sm:pb-24">
      <div class="site-container">
        <RouterLink to="/destinations" class="inline-flex min-h-11 items-center gap-2 text-sm text-gold-light transition hover:text-ivory">
          <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M16 10H5m4-4-4 4 4 4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ t('common.backToPlaces') }}
        </RouterLink>
        <p v-reveal class="eyebrow mt-8">{{ t(`destinations.filters.${place.province}`) }}</p>
        <h1 v-reveal="80" class="section-title mt-4 max-w-4xl">{{ t(place.nameKey) }}</h1>
        <p v-reveal="150" class="lead mt-6 max-w-3xl">{{ t(place.descKey) }}</p>
      </div>
      <WaveDivider class="absolute inset-x-0 bottom-0" />
    </header>

    <section class="section-shell pt-8 sm:pt-10">
      <div class="site-container">
        <div v-reveal class="image-zoom overflow-hidden rounded-2xl border border-gold/20">
          <CloudImage
            :public-id="place.imagePublicId"
            :alt="t(place.nameKey)"
            aspect="21 / 9"
            sizes="100vw"
          />
        </div>

        <div class="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-14">
          <div v-reveal>
            <h2 class="font-display text-3xl text-gold-light sm:text-4xl">{{ t('common.highlights') }}</h2>
            <hr class="gold-rule mt-5 max-w-md" />
            <ul class="mt-7 space-y-4">
              <li v-for="(key, index) in place.highlightKeys" :key="key" class="flex gap-4">
                <span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/45 text-xs text-gold-light">{{ index + 1 }}</span>
                <span class="text-base leading-7 text-ivory/90">{{ t(key) }}</span>
              </li>
            </ul>
          </div>

          <div v-reveal="100" class="card-lift h-fit rounded-2xl p-6 sm:p-8">
            <h2 class="eyebrow">{{ t('destinations.detail.region') }}</h2>
            <p class="mt-2 text-lg text-ivory">{{ t(`destinations.filters.${place.province}`) }}</p>

            <h2 class="eyebrow mt-8">{{ t('common.bestTime') }}</h2>
            <p class="mt-2 leading-7 text-ivory/90">{{ t(place.bestTimeKey) }}</p>

            <h2 class="eyebrow mt-8">{{ t('common.gettingThere') }}</h2>
            <p class="mt-2 leading-7 text-ivory/90">{{ t(place.gettingThereKey) }}</p>

            <a
              :href="mapLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary mt-8 w-full"
            >
              <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M10 18s6-5 6-10a6 6 0 1 0-12 0c0 5 6 10 6 10Z" />
                <circle cx="10" cy="8" r="2" />
              </svg>
              {{ t('destinations.detail.mapLink') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="site-container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
    <p class="eyebrow">{{ t('notFound.code') }}</p>
    <h1 class="section-title mt-4">{{ t('destinations.detail.notFoundTitle') }}</h1>
    <p class="lead mt-5">{{ t('destinations.detail.notFoundBody') }}</p>
    <RouterLink to="/destinations" class="btn btn-primary mt-8">{{ t('common.backToPlaces') }}</RouterLink>
  </div>
</template>
