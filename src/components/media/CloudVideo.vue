<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { hasCloudinary, videoPosterUrl, videoUrl } from '../../composables/useCloudinary'
import FallbackArt from '../scenes/FallbackArt.vue'
import { inferCategory } from '../scenes/inferCategory'

const props = defineProps({
  publicId: { type: String, default: '' },
  caption: { type: String, default: '' },
  aspect: { type: String, default: '16 / 9' },
  category: { type: String, default: '' },
})

const { t } = useI18n()
const host = ref(null)
const shouldLoad = ref(false)
const failed = ref(false)
let observer = null

const unavailable = computed(() => !hasCloudinary || !props.publicId || failed.value)
const src = computed(() => videoUrl(props.publicId))
const poster = computed(() => videoPosterUrl(props.publicId))
const fallbackCategory = computed(() => inferCategory(props.publicId, props.category))

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
  <div ref="host" class="relative w-full overflow-hidden rounded-2xl bg-[var(--color-night)]" :style="{ aspectRatio: aspect }">
    <div v-if="unavailable" class="absolute inset-0">
      <FallbackArt :category="fallbackCategory" />
      <span class="sr-only">{{ t('media.videoMissing') }}</span>
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
