<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { hasCloudinary, videoPosterUrl, videoUrl } from '../../composables/useCloudinary'

const props = defineProps({
  publicId: { type: String, default: '' },
  caption: { type: String, default: '' },
  aspect: { type: String, default: '16 / 9' },
})

const { t } = useI18n()
const host = ref(null)
const shouldLoad = ref(false)
const failed = ref(false)
let observer = null

const unavailable = computed(() => !hasCloudinary || !props.publicId || failed.value)
const src = computed(() => videoUrl(props.publicId))
const poster = computed(() => videoPosterUrl(props.publicId))

watch(
  () => props.publicId,
  () => {
    failed.value = false
  },
)

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    shouldLoad.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      shouldLoad.value = true
      observer.disconnect()
    },
    { rootMargin: '200px' },
  )
  if (host.value) observer.observe(host.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="host" class="relative w-full overflow-hidden rounded-2xl bg-night" :style="{ aspectRatio: aspect }">
    <div
      v-if="unavailable"
      class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-night via-midnight to-[#1d2547] px-6 text-center"
    >
      <svg viewBox="0 0 48 48" class="h-12 w-12 text-gold/70" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
        <rect x="7" y="12" width="34" height="24" rx="4" />
        <path d="m20 18 10 6-10 6V18Z" fill="currentColor" stroke="none" opacity=".8" />
      </svg>
      <span class="text-sm text-muted">{{ t('media.videoMissing') }}</span>
    </div>
    <template v-else-if="shouldLoad">
      <video
        class="absolute inset-0 h-full w-full bg-midnight object-cover"
        :src="src"
        :poster="poster || undefined"
        :aria-label="caption || undefined"
        preload="metadata"
        playsinline
        controls
        @error="failed = true"
      ></video>
    </template>
    <div v-else class="shimmer absolute inset-0" aria-hidden="true"></div>
  </div>
</template>
