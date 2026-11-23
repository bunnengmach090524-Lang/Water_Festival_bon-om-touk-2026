<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import WaveDivider from '../components/effects/WaveDivider.vue'
import DestinationCard from '../components/cards/DestinationCard.vue'
import { destinationRegions, destinations } from '../data/destinations'

const { t } = useI18n()
const activeRegion = ref('all')
const query = ref('')

const filters = destinationRegions.map((region) => ({ id: region, label: () => t(`destinations.filters.${region}`) }))

const filtered = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase()
  return destinations.filter((place) => {
    const regionMatches = activeRegion.value === 'all' || place.province === activeRegion.value
    const textMatches = !needle || t(place.nameKey).toLocaleLowerCase().includes(needle)
    return regionMatches && textMatches
  })
})
</script>

<template>
  <div>
    <header class="relative overflow-hidden border-b border-gold/15 py-20 text-center sm:py-28">
      <div class="pointer-events-none absolute inset-0 opacity-35" style="background: radial-gradient(circle at 50% 0%, rgba(212, 165, 72, 0.22), transparent 60%)"></div>
      <div class="site-container relative">
        <p v-reveal class="eyebrow">{{ t('destinations.eyebrow') }}</p>
        <h1 v-reveal="80" class="section-title mx-auto mt-5">{{ t('destinations.title') }}</h1>
        <p v-reveal="150" class="lead mx-auto mt-6 max-w-3xl">{{ t('destinations.subtitle') }}</p>
      </div>
      <WaveDivider class="absolute inset-x-0 bottom-0" />
    </header>

    <section class="section-shell">
      <div class="site-container">
        <div v-reveal class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap gap-2" role="group" :aria-label="t('destinations.filtersLabel')">
            <button
              v-for="filter in filters"
              :key="filter.id"
              type="button"
              class="min-h-11 rounded-full border px-4 text-sm font-medium transition duration-300"
              :class="
                activeRegion === filter.id
                  ? 'border-gold bg-gold/20 text-gold-light'
                  : 'border-gold/25 bg-night/40 text-ivory/75 hover:border-gold/60 hover:text-gold-light'
              "
              :aria-pressed="activeRegion === filter.id"
              @click="activeRegion = filter.id"
            >
              {{ filter.label() }}
            </button>
          </div>

          <label class="relative block w-full lg:max-w-xs">
            <span class="sr-only">{{ t('destinations.searchPlaceholder') }}</span>
            <svg viewBox="0 0 20 20" class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <circle cx="9" cy="9" r="5.5" />
              <path d="m13.5 13.5 3 3" stroke-linecap="round" />
            </svg>
            <input
              v-model="query"
              type="search"
              :placeholder="t('destinations.searchPlaceholder')"
              class="min-h-11 w-full rounded-full border border-gold/25 bg-night/60 py-2 pl-11 pr-4 text-sm text-ivory placeholder:text-muted/70 focus:border-gold-light"
            />
          </label>
        </div>

        <p v-reveal class="mt-6 text-sm text-muted">{{ t('destinations.count', { count: filtered.length }) }}</p>

        <div v-if="filtered.length" class="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(place, index) in filtered" :key="place.id" v-reveal="(index % 3) * 80">
            <DestinationCard
              :destination="place"
              :name="t(place.nameKey)"
              :description="t(place.descKey)"
              :region-label="t(`destinations.filters.${place.province}`)"
            />
          </div>
        </div>
        <p v-else class="mt-12 rounded-2xl border border-gold/20 bg-night/50 p-8 text-center text-muted">
          {{ t('destinations.empty') }}
        </p>
      </div>
    </section>
  </div>
</template>
