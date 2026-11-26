<script setup>
import { computed, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CloudImage from '../components/media/CloudImage.vue'
import PhotoViewer from '../components/media/PhotoViewer.vue'
import DestinationCard from '../components/cards/DestinationCard.vue'
import { destinations, destinationNavigation, mapsUrl, relatedDestinations } from '../data/destinations'

const { t, locale } = useI18n()
const route = useRoute()

const place = computed(() => destinations.find((item) => item.id === route.params.id))
const mapLink = computed(() => (place.value ? mapsUrl(place.value) : ''))
const related = computed(() => relatedDestinations(place.value, 3))
const navigation = computed(() => destinationNavigation(place.value))

const photoItems = computed(() => {
  if (!place.value) return []
  const name = t(place.value.nameKey)
  const publicIds = [place.value.imagePublicId, ...(place.value.gallery || []).map((item) => item.publicId)].slice(0, 5)
  return publicIds.map((publicId, index) => ({
    publicId,
    caption: t('destinations.detail.galleryCaption', { name, n: index + 1 }),
    category: place.value.tags,
  }))
})

const videoItem = computed(() => {
  if (!place.value || (!place.value.videoPublicId && !place.value.youtubeId)) return null
  return {
    publicId: place.value.videoPublicId || '',
    videoId: place.value.youtubeId || '',
    caption: t(place.value.nameKey),
    credit: t(place.value.videoCredit),
    category: place.value.tags,
  }
})

const copied = ref(false)
let copiedTimer = null

watch(place, () => {
  copied.value = false
  clearTimeout(copiedTimer)
})

function setMetaDescription(description) {
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', description)
}

function shortDescription(value) {
  const clean = String(value || '').replace(/\s+/g, ' ').trim()
  return clean.length > 155 ? `${clean.slice(0, 152)}…` : clean
}

watchEffect(() => {
  void locale.value
  const current = place.value
  if (!current) {
    document.title = t('meta.title')
    setMetaDescription(t('about.lead'))
    return
  }
  const name = t(current.nameKey)
  document.title = `${name} — ${t('meta.siteName')}`
  setMetaDescription(shortDescription(`${name}: ${t(current.descKey)}`))
})

async function sharePlace() {
  if (!place.value || typeof window === 'undefined') return
  const url = window.location.href
  const title = t(place.value.nameKey)
  const text = t(place.value.descKey)
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return
    } catch (error) {
      if (error?.name === 'AbortError') return
    }
  }
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(url)
      copied.value = true
      clearTimeout(copiedTimer)
      copiedTimer = setTimeout(() => (copied.value = false), 2400)
      return
    } catch {
      window.prompt(t('common.copyLink'), url)
      return
    }
  }
  window.prompt(t('common.copyLink'), url)
}

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<template>
  <div v-if="place">
    <header class="relative isolate min-h-[68vh] overflow-hidden">
      <CloudImage
        fill
        eager
        :public-id="place.imagePublicId"
        :alt="t(place.nameKey)"
        :category="place.tags"
      />
      <div class="absolute inset-0 z-[1] bg-gradient-to-t from-midnight via-midnight/70 to-midnight/10"></div>

      <div class="site-container relative z-[2] flex min-h-[68vh] flex-col justify-end pb-16 pt-28">
        <RouterLink
          to="/destinations"
          class="absolute left-4 top-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/35 bg-[var(--glass-bg)] px-4 text-sm text-gold-light backdrop-blur transition hover:border-gold/70 hover:text-ivory sm:left-8"
        >
          <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M16 10H5m4-4-4 4 4 4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ t('common.backToPlaces') }}
        </RouterLink>

        <p v-reveal class="eyebrow w-fit rounded-full border border-gold/60 bg-[var(--glass-bg)] px-4 py-1 backdrop-blur">
          {{ t(`destinations.provinces.${place.province}`) }}
        </p>
        <h1 v-reveal="80" class="mt-5 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-6xl lg:text-7xl">
          {{ t(place.nameKey) }}
        </h1>
        <p v-reveal="150" class="lead mt-5 max-w-3xl text-ivory/90">{{ t(place.descKey) }}</p>
      </div>
    </header>
    <p v-if="place.imageCredit" class="site-container mt-2 text-right text-xs leading-5 text-muted">
      {{ place.imageCredit }}
    </p>

    <section class="section-shell pt-10 sm:pt-12">
      <div class="site-container mx-auto max-w-6xl">
        <h2 v-reveal class="font-display text-3xl text-gold-light sm:text-4xl">{{ t('destinations.detail.galleryTitle') }}</h2>
        <PhotoViewer
          v-reveal="80"
          :key="place.id"
          class="mt-5"
          :items="photoItems"
          :video="videoItem"
          :label="t('destinations.detail.galleryTitle')"
        />
      </div>
    </section>

    <section class="section-shell">
      <div class="site-container grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
        <div v-reveal>
          <h2 class="font-display text-3xl text-gold-light sm:text-4xl">{{ t('common.highlights') }}</h2>
          <hr class="gold-rule mt-5 max-w-md" />
          <ul class="mt-7 space-y-4">
            <li v-for="(key, index) in place.highlightKeys" :key="key" class="flex gap-4">
              <span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/45 text-xs text-gold-light">{{ index + 1 }}</span>
              <span class="text-base leading-7 text-ivory/90">{{ t(key) }}</span>
            </li>
          </ul>

          <div v-if="place.reportKey" class="mt-10 rounded-2xl border border-gold/20 bg-night/50 p-6">
            <h2 class="eyebrow">{{ t('destinations.detail.reportedTitle') }}</h2>
            <p class="mt-3 text-sm leading-7 text-ivory/90">{{ t(place.reportKey) }}</p>
            <p class="mt-3 text-xs font-semibold text-gold-light">{{ t('common.reportedVerify') }}</p>
          </div>
        </div>

        <div v-reveal="100" class="card-lift h-fit rounded-2xl p-6 sm:p-8">
          <h2 class="eyebrow">{{ t('destinations.detail.region') }}</h2>
          <p class="mt-2 text-lg text-ivory">{{ t(`destinations.provinces.${place.province}`) }}</p>

          <h2 class="eyebrow mt-8">{{ t('common.bestTime') }}</h2>
          <p class="mt-2 leading-7 text-ivory/90">{{ t(place.bestTimeKey) }}</p>

          <h2 class="eyebrow mt-8">{{ t('common.gettingThere') }}</h2>
          <p class="mt-2 leading-7 text-ivory/90">{{ t(place.gettingThereKey) }}</p>

          <div class="mt-8 grid gap-3">
            <a :href="mapLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-full">
              <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M10 18s6-5 6-10a6 6 0 1 0-12 0c0 5 6 10 6 10Z" />
                <circle cx="10" cy="8" r="2" />
              </svg>
              {{ t('destinations.detail.mapLink') }}
            </a>
            <button type="button" class="btn btn-ghost w-full" @click="sharePlace">
              <svg viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <circle cx="15" cy="5" r="2" />
                <circle cx="5" cy="10" r="2" />
                <circle cx="15" cy="15" r="2" />
                <path d="m6.8 9 6.4-3m-6.4 5 6.4 3" />
              </svg>
              {{ copied ? t('common.copied') : t('common.share') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section v-reveal class="section-shell bg-night/30">
      <div class="site-container mx-auto max-w-4xl">
        <h2 class="font-display text-3xl text-gold-light sm:text-4xl">{{ t('destinations.festivalEvents.title') }}</h2>
        <hr class="gold-rule mt-5 max-w-md" />
        <p class="mt-6 text-base leading-7 text-ivory/90">{{ t('destinations.festivalEvents.default') }}</p>

        <div
          v-if="place.festivalEventKey !== 'destinations.festivalEvents.default'"
          class="mt-6 rounded-2xl border border-gold/20 bg-night/50 p-6"
        >
          <p class="text-sm leading-7 text-ivory/90">{{ t(place.festivalEventKey) }}</p>
          <p class="mt-3 text-xs font-semibold text-gold-light">{{ t('common.reportedVerify') }}</p>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="section-shell">
      <div class="site-container">
        <h2 v-reveal class="font-display text-3xl text-gold-light sm:text-4xl">
          {{ t('destinations.detail.moreInProvince', { province: t(`destinations.provinces.${place.province}`) }) }}
        </h2>
        <div class="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(item, index) in related" :key="item.id" v-reveal="(index % 3) * 80">
            <DestinationCard
              :destination="item"
              :name="t(item.nameKey)"
              :description="t(item.descKey)"
              :region-label="t(`destinations.provinces.${item.province}`)"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell bg-night/30">
      <div class="site-container grid gap-4 sm:grid-cols-2">
        <RouterLink
          v-if="navigation.previous"
          v-reveal
          :to="`/destinations/${navigation.previous.id}`"
          class="card-lift flex min-h-16 items-center gap-3 rounded-2xl p-5"
        >
          <svg viewBox="0 0 20 20" class="h-5 w-5 shrink-0 text-gold-light" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M15 10H5m4-4-4 4 4 4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>
            <span class="eyebrow">{{ t('common.previous') }}</span>
            <span class="mt-1 block text-base text-ivory">{{ t(navigation.previous.nameKey) }}</span>
          </span>
        </RouterLink>

        <RouterLink
          v-if="navigation.next"
          v-reveal="80"
          :to="`/destinations/${navigation.next.id}`"
          class="card-lift flex min-h-16 items-center justify-end gap-3 rounded-2xl p-5 text-right"
        >
          <span>
            <span class="eyebrow">{{ t('common.next') }}</span>
            <span class="mt-1 block text-base text-ivory">{{ t(navigation.next.nameKey) }}</span>
          </span>
          <svg viewBox="0 0 20 20" class="h-5 w-5 shrink-0 text-gold-light" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M5 10h10m-4-4 4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </RouterLink>
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
