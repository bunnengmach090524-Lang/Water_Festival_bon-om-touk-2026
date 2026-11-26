<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CloudImage from './CloudImage.vue'
import CloudVideo from './CloudVideo.vue'
import YouTubeVideo from './YouTubeVideo.vue'
import Lightbox from './Lightbox.vue'
import FallbackArt from '../scenes/FallbackArt.vue'
import { limitedImageUrl } from '../../composables/useCloudinary'
import { inferCategory } from '../scenes/inferCategory'

const props = defineProps({
  items: { type: Array, default: () => [] },
  video: { type: Object, default: null },
  label: { type: String, default: '' },
})

const { t } = useI18n()
const selected = ref(0)
const lightboxIndex = ref(-1)
const direction = ref(1)
let touchStartX = 0
let idleHandle = null

const hasVideo = computed(() => !!props.video && (!!props.video.publicId || !!props.video.videoId))
const videoIndex = computed(() => props.items.length)
const isVideoSelected = computed(() => hasVideo.value && selected.value >= videoIndex.value)
const selectedPhotoIndex = computed(() => Math.max(0, Math.min(selected.value, videoIndex.value - 1)))
const currentPhoto = computed(() => (isVideoSelected.value ? null : props.items[selectedPhotoIndex.value] || null))
const canNavigate = computed(() => !isVideoSelected.value && props.items.length > 1)

const mediaKey = computed(() => {
  if (isVideoSelected.value) return `video-${props.video?.publicId || props.video?.videoId || 'missing'}`
  if (currentPhoto.value) return `photo-${selectedPhotoIndex.value}-${currentPhoto.value.publicId || ''}`
  return 'empty'
})

const videoCaption = computed(() => {
  if (!props.video) return ''
  if (props.video.caption) return props.video.caption
  return props.video.captionKey ? t(props.video.captionKey, props.video.captionParams || {}) : ''
})

function captionOf(item) {
  if (!item) return ''
  if (item.caption) return item.caption
  return item.captionKey ? t(item.captionKey, item.captionParams || {}) : ''
}

function select(index) {
  direction.value = index < selected.value ? -1 : 1
  selected.value = index
}

function previous() {
  if (!props.items.length) return
  direction.value = -1
  selected.value = (selected.value - 1 + props.items.length) % props.items.length
}

function next() {
  if (!props.items.length) return
  direction.value = 1
  selected.value = (selected.value + 1) % props.items.length
}

function openLightbox() {
  if (currentPhoto.value && !isVideoSelected.value) lightboxIndex.value = selectedPhotoIndex.value
}

function onKeydown(event) {
  if (isVideoSelected.value) return
  const target = event.target
  const tag = target?.tagName
  if (['VIDEO', 'IFRAME', 'INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || target?.isContentEditable) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previous()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  }
}

function onTouchStart(event) {
  if (!canNavigate.value) return
  touchStartX = event.changedTouches[0].clientX
}

function onTouchEnd(event) {
  if (!canNavigate.value) return
  const distance = event.changedTouches[0].clientX - touchStartX
  if (Math.abs(distance) > 50) distance < 0 ? next() : previous()
}

function cancelIdlePreload() {
  if (idleHandle === null || typeof window === 'undefined') return
  if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleHandle)
  else window.clearTimeout(idleHandle)
  idleHandle = null
}

function preloadNext() {
  cancelIdlePreload()
  if (!props.items.length || typeof window === 'undefined') return
  const upcoming = props.items[(selectedPhotoIndex.value + 1) % props.items.length]
  const url = limitedImageUrl(upcoming.publicId)
  if (!url) return
  const load = () => {
    const image = new Image()
    image.src = url
    idleHandle = null
  }
  if ('requestIdleCallback' in window) idleHandle = window.requestIdleCallback(load, { timeout: 1500 })
  else idleHandle = window.setTimeout(load, 800)
}

watch(selected, preloadNext, { immediate: true })
watch([() => props.items.length, hasVideo], () => {
  if (selected.value > props.items.length || (!hasVideo.value && selected.value >= props.items.length)) {
    selected.value = 0
  }
})
onBeforeUnmount(cancelIdlePreload)
</script>

<template>
  <div
    class="photo-viewer min-w-0"
    tabindex="0"
    role="group"
    :aria-label="label || t('photoViewer.title')"
    @keydown="onKeydown"
  >
    <div class="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gold/20 bg-night">
      <Transition :name="direction > 0 ? 'photo-next' : 'photo-prev'">
        <div
          v-if="currentPhoto"
          :key="mediaKey"
          class="photo-stage absolute inset-0 cursor-zoom-in"
          role="button"
          tabindex="0"
          :aria-label="t('photoViewer.open', { n: selectedPhotoIndex + 1, total: props.items.length })"
          @click="openLightbox"
          @keydown.enter.prevent="openLightbox"
          @keydown.space.prevent="openLightbox"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
          <CloudImage
            no-upscale
            :public-id="currentPhoto.publicId"
            :alt="captionOf(currentPhoto)"
            :category="currentPhoto.category || props.video?.category"
            :variant="selectedPhotoIndex"
            :show-missing-label="true"
            :widths="[640, 960, 1280, 1600]"
            aspect="16 / 10"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
            class="photo-main-image"
          />
        </div>

        <div v-else-if="isVideoSelected" :key="mediaKey" class="photo-stage absolute inset-0">
          <CloudVideo
            v-if="props.video?.publicId"
            :public-id="props.video.publicId"
            :caption="videoCaption"
            :category="props.video.category"
            :variant="props.items.length"
            aspect="16 / 10"
          />
          <YouTubeVideo
            v-else-if="props.video?.videoId"
            :video-id="props.video.videoId"
            :caption="videoCaption"
            :category="props.video.category"
            :variant="props.items.length"
          />
          <FallbackArt v-else :category="props.video?.category" :variant="props.items.length" class="absolute inset-0" />
        </div>

        <div v-else :key="mediaKey" class="photo-stage absolute inset-0">
          <FallbackArt :category="props.video?.category" :variant="props.items.length" class="absolute inset-0" />
        </div>
      </Transition>

      <button
        v-if="canNavigate"
        type="button"
        class="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-[var(--glass-bg)] text-gold-light backdrop-blur transition hover:border-gold/70 hover:bg-gold/15"
        :aria-label="t('photoViewer.previous')"
        @click.stop="previous"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="m14 6-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <button
        v-if="canNavigate"
        type="button"
        class="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-[var(--glass-bg)] text-gold-light backdrop-blur transition hover:border-gold/70 hover:bg-gold/15"
        :aria-label="t('photoViewer.next')"
        @click.stop="next"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="m10 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <div class="mt-3 flex flex-wrap items-start justify-between gap-x-5 gap-y-1">
      <p class="min-w-0 flex-1 text-sm leading-6 text-ivory/90">
        {{ isVideoSelected ? videoCaption || t('photoViewer.video') : captionOf(currentPhoto) }}
      </p>
      <p class="shrink-0 text-xs font-semibold tracking-wide text-gold-light" aria-live="polite">
        {{ isVideoSelected ? t('photoViewer.video') : t('photoViewer.counter', { n: selectedPhotoIndex + 1, total: props.items.length }) }}
      </p>
    </div>

    <p v-if="isVideoSelected && props.video?.credit" class="mt-2 text-xs leading-6 text-muted">
      {{ props.video.credit }}
    </p>

    <div
      v-if="props.items.length || hasVideo"
      class="photo-viewer-strip mt-4 flex max-w-full snap-x snap-mandatory gap-2 overflow-x-auto pb-2 sm:flex-nowrap"
      role="group"
      :aria-label="label || t('photoViewer.title')"
    >
      <button
        v-for="(item, index) in props.items"
        :key="item.publicId || index"
        type="button"
        class="relative aspect-[4/3] w-[72px] shrink-0 snap-start overflow-hidden rounded-lg border transition sm:w-[88px] lg:w-[110px]"
        :class="!isVideoSelected && index === selected ? 'border-gold opacity-100 ring-2 ring-gold/60' : 'border-gold/20 opacity-70 hover:border-gold/50 hover:opacity-100'"
        :aria-label="t('photoViewer.photoOf', { n: index + 1, total: props.items.length })"
        :aria-current="!isVideoSelected && index === selected ? 'true' : undefined"
        @click="select(index)"
      >
        <CloudImage
          :public-id="item.publicId"
          :alt="captionOf(item)"
          :category="item.category || props.video?.category"
          :variant="index"
          :show-missing-label="true"
          :widths="[80, 160, 240]"
          aspect="4 / 3"
          sizes="96px"
        />
      </button>

      <button
        v-if="hasVideo"
        type="button"
        class="relative aspect-[4/3] w-[72px] shrink-0 snap-start overflow-hidden rounded-lg border transition sm:w-[88px] lg:w-[110px]"
        :class="isVideoSelected ? 'border-gold opacity-100 ring-2 ring-gold/60' : 'border-gold/20 opacity-70 hover:border-gold/50 hover:opacity-100'"
        :aria-label="t('photoViewer.play')"
        :aria-current="isVideoSelected ? 'true' : undefined"
        @click="select(videoIndex)"
      >
        <FallbackArt :category="props.video?.category || props.items[0]?.category" :variant="props.items.length" />
        <span class="absolute inset-0 grid place-items-center bg-midnight/30">
          <span class="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 bg-[var(--glass-bg)] text-gold-light">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5Z" />
            </svg>
          </span>
        </span>
        <span class="absolute bottom-1 left-1 rounded bg-midnight/75 px-1.5 py-0.5 text-[10px] text-ivory">
          {{ t('photoViewer.video') }}
        </span>
      </button>
    </div>

    <Lightbox
      :items="props.items"
      :index="lightboxIndex"
      @close="lightboxIndex = -1"
      @update:index="lightboxIndex = $event"
    />
  </div>
</template>
