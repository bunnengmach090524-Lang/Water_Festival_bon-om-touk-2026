<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import WaveDivider from '../components/effects/WaveDivider.vue'
import GalleryGrid from '../components/media/GalleryGrid.vue'
import Lightbox from '../components/media/Lightbox.vue'
import CloudVideo from '../components/media/CloudVideo.vue'
import Pagination from '../components/ui/Pagination.vue'
import { galleryCategories, galleryImages, galleryVideos } from '../data/media'
import { inferCategory } from '../components/scenes/inferCategory'

const { t } = useI18n()
const activeCategory = ref('all')
const activeIndex = ref(-1)
const page = ref(1)
const gridEl = ref(null)
const pageSize = 9

const categories = galleryCategories.map((id) => ({ id, label: () => t(`gallery.categories.${id}`) }))
const visibleImages = computed(() =>
  activeCategory.value === 'all'
    ? galleryImages
    : galleryImages.filter((item) => item.category === activeCategory.value),
)
const pageImages = computed(() => visibleImages.value.slice((page.value - 1) * pageSize, page.value * pageSize))

watch(activeCategory, () => {
  activeIndex.value = -1
  page.value = 1
})
watch(page, () => {
  if (typeof window === 'undefined' || !gridEl.value) return
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  gridEl.value.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
})
</script>

<template>
  <div>
    <!-- Compact header: title and filters sit directly below the sticky nav. -->
    <header class="relative overflow-hidden border-b border-gold/15 pb-10 pt-6 text-center sm:pb-14 sm:pt-10">
      <div class="page-header-glow pointer-events-none absolute inset-0 opacity-35"></div>
      <div class="site-container relative">
        <p v-reveal class="eyebrow">{{ t('gallery.eyebrow') }}</p>
        <h1 v-reveal="80" class="section-title mx-auto mt-5">{{ t('gallery.title') }}</h1>
        <p v-reveal="150" class="lead mx-auto mt-6 max-w-3xl">{{ t('gallery.subtitle') }}</p>
      </div>
      <WaveDivider class="absolute inset-x-0 bottom-0" />
    </header>

    <section class="section-shell pt-7 sm:pt-9">
      <div class="site-container">
        <div v-reveal class="flex flex-wrap gap-2" role="group" :aria-label="t('gallery.title')">
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            class="min-h-11 rounded-full border px-4 text-sm font-medium transition duration-300"
            :class="
              activeCategory === category.id
                ? 'border-gold bg-gold/20 text-gold-light'
                : 'border-gold/25 bg-[var(--glass-bg)] text-ivory/75 hover:border-gold/60 hover:text-gold-light'
            "
            :aria-pressed="activeCategory === category.id"
            @click="activeCategory = category.id"
          >
            {{ category.label() }}
          </button>
        </div>

        <div v-if="visibleImages.length" ref="gridEl" class="mt-10">
          <GalleryGrid
            :items="pageImages"
            :start-index="(page - 1) * pageSize"
            :total="visibleImages.length"
            @open="activeIndex = $event"
          />
          <Pagination v-model:page="page" :total="visibleImages.length" :per-page="pageSize" />
        </div>
        <p v-else class="mt-12 rounded-2xl border border-gold/20 bg-night/50 p-8 text-center text-muted">
          {{ t('gallery.empty') }}
        </p>
      </div>
    </section>

    <section class="section-shell bg-night/30">
      <div class="site-container">
        <div v-reveal class="max-w-2xl">
          <p class="eyebrow">{{ t('gallery.eyebrow') }}</p>
          <h2 class="section-title mt-4">{{ t('gallery.videoTitle') }}</h2>
          <p class="lead mt-5">{{ t('gallery.videoSubtitle') }}</p>
        </div>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <div v-for="(video, index) in galleryVideos" :key="video.id" v-reveal="index * 100">
            <CloudVideo
              :public-id="video.publicId"
              :caption="t(video.captionKey)"
              :category="inferCategory(video.publicId, video.category)"
            />
            <p class="mt-3 text-sm text-muted">{{ t(video.captionKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <Lightbox v-model:index="activeIndex" :items="visibleImages" @close="activeIndex = -1" />
  </div>
</template>
