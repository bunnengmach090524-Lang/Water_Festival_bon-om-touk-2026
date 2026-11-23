<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { hasCloudinary, imageSrcSet, imageUrl } from '../../composables/useCloudinary'
import FallbackArt from '../scenes/FallbackArt.vue'
import { inferCategory } from '../scenes/inferCategory'

const props = defineProps({
  publicId: { type: String, default: '' },
  alt: { type: String, default: '' },
  widths: { type: Array, default: () => [320, 640, 960, 1280] },
  aspect: { type: String, default: '16 / 9' },
  sizes: { type: String, default: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' },
  category: { type: [String, Array], default: '' },
})

const { t } = useI18n()
const loaded = ref(false)
const failed = ref(false)

const src = computed(() => imageUrl(props.publicId, props.widths[Math.floor(props.widths.length / 2)] || 800))
const srcset = computed(() => imageSrcSet(props.publicId, props.widths))
const unavailable = computed(() => !hasCloudinary || !props.publicId || failed.value)
const fallbackCategory = computed(() => inferCategory(props.publicId, props.category))

watch(
  () => props.publicId,
  () => {
    loaded.value = false
    failed.value = false
  },
)
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-2xl bg-[var(--color-night)]"
    :style="{ aspectRatio: aspect }"
  >
    <!-- Original illustrated fallback: also the final state with no media. -->
    <div v-if="unavailable" class="absolute inset-0">
      <FallbackArt :category="fallbackCategory" />
      <span class="sr-only">{{ t('media.imageMissing') }}</span>
    </div>

    <template v-else>
      <div v-if="!loaded" class="shimmer absolute inset-0" aria-hidden="true">
        <span class="sr-only">{{ t('media.loading') }}</span>
      </div>
      <img
        :src="src"
        :srcset="srcset"
        :sizes="sizes"
        :alt="alt"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        :class="loaded ? 'opacity-100' : 'opacity-0'"
        @load="loaded = true"
        @error="failed = true"
      />
    </template>
  </div>
</template>
