<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { hasCloudinary, imageSrcSet, imageUrl, limitedImageUrl } from '../../composables/useCloudinary'
import FallbackArt from '../scenes/FallbackArt.vue'
import { inferCategory } from '../scenes/inferCategory'

const props = defineProps({
  publicId: { type: String, default: '' },
  alt: { type: String, default: '' },
  widths: { type: Array, default: () => [320, 640, 960, 1280] },
  aspect: { type: String, default: '16 / 9' },
  sizes: { type: String, default: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' },
  category: { type: [String, Array], default: '' },
  variant: { type: Number, default: 0 },
  showMissingLabel: { type: Boolean, default: false },
  fill: { type: Boolean, default: false },
  eager: { type: Boolean, default: false },
  noUpscale: { type: Boolean, default: false },
})

const emit = defineEmits(['load', 'error'])
const { t } = useI18n()
const loaded = ref(false)
const failed = ref(false)
const naturalWidth = ref(0)

const src = computed(() =>
  props.noUpscale ? limitedImageUrl(props.publicId) : imageUrl(props.publicId, props.widths[Math.floor(props.widths.length / 2)] || 800),
)
const srcset = computed(() => (props.noUpscale ? '' : imageSrcSet(props.publicId, props.widths)))
const capped = computed(() => props.noUpscale && loaded.value && naturalWidth.value > 0 && naturalWidth.value < 1000)
const cappedStyle = computed(() =>
  capped.value ? { width: `${naturalWidth.value}px`, maxWidth: '100%', height: 'auto', maxHeight: '100%' } : undefined,
)
const unavailable = computed(() => !hasCloudinary || !props.publicId || failed.value)
const fallbackCategory = computed(() => inferCategory(props.publicId, props.category))

watch(
  () => props.publicId,
  () => {
    loaded.value = false
    failed.value = false
    naturalWidth.value = 0
  },
)

function onLoad(event) {
  naturalWidth.value = event.target?.naturalWidth || 0
  loaded.value = true
  emit('load', props.publicId)
}

function onError() {
  failed.value = true
  emit('error', props.publicId)
}
</script>

<template>
  <div
    class="w-full overflow-hidden bg-[var(--color-night)]"
    :class="fill ? 'absolute inset-0 h-full rounded-none!' : 'relative rounded-2xl'"
    :style="fill ? undefined : { aspectRatio: aspect }"
  >
    <div v-if="unavailable" class="absolute inset-0">
      <FallbackArt :category="fallbackCategory" :variant="variant" />
      <span
        v-if="showMissingLabel"
        class="absolute bottom-1 left-1 rounded bg-[var(--glass-bg)] px-1.5 py-0.5 text-[10px] font-medium text-ivory/90 backdrop-blur"
      >
        {{ t('photoViewer.comingSoon') }}
      </span>
      <span class="sr-only">{{ t('media.imageMissing') }}</span>
    </div>

    <template v-else>
      <div v-if="!loaded" class="shimmer absolute inset-0" aria-hidden="true">
        <span class="sr-only">{{ t('media.loading') }}</span>
      </div>
      <img
        v-if="capped"
        :src="src"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 h-full w-full object-cover"
        :style="{ filter: 'blur(24px) brightness(0.45)', transform: 'scale(1.1)' }"
      />
      <img
        :src="src"
        :srcset="srcset"
        :sizes="sizes"
        :alt="alt"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        class="absolute transition-opacity duration-700"
        :class="[
          loaded ? 'opacity-100' : 'opacity-0',
          capped ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain' : 'inset-0 h-full w-full object-cover',
        ]"
        :style="cappedStyle"
        @load="onLoad"
        @error="onError"
      />
    </template>
  </div>
</template>
