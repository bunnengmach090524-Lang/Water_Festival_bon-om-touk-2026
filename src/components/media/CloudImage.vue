<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { hasCloudinary, imageSrcSet, imageUrl } from '../../composables/useCloudinary'

const props = defineProps({
  publicId: { type: String, default: '' },
  alt: { type: String, default: '' },
  widths: { type: Array, default: () => [320, 640, 960, 1280] },
  aspect: { type: String, default: '16 / 9' },
  sizes: { type: String, default: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' },
})

const { t } = useI18n()
const loaded = ref(false)
const failed = ref(false)

const src = computed(() => imageUrl(props.publicId, props.widths[Math.floor(props.widths.length / 2)] || 800))
const srcset = computed(() => imageSrcSet(props.publicId, props.widths))
const unavailable = computed(() => !hasCloudinary || !props.publicId || failed.value)

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
    class="relative w-full overflow-hidden rounded-2xl bg-night"
    :style="{ aspectRatio: aspect }"
  >
    <!-- Elegant gradient placeholder: also the final state with no media. -->
    <div
      v-if="unavailable"
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-night via-midnight to-[#1d2547]"
      aria-hidden="true"
    >
      <div class="absolute inset-0 opacity-40" style="background: radial-gradient(circle at 72% 28%, rgba(240, 207, 122, 0.18), transparent 45%)"></div>
      <svg viewBox="0 0 48 48" class="relative h-12 w-12 text-gold/70" fill="none" stroke="currentColor" stroke-width="1.2">
        <path d="M19 9h10l3 24H16L19 9Z" opacity=".8" />
        <path d="M17 14h14M16 28h16M24 33v5" opacity=".55" />
        <path d="M24 16c2 2 2 4 0 6-2-2-2-4 0-6Z" fill="currentColor" stroke="none" />
        <circle cx="38" cy="8" r="2" opacity=".7" />
        <circle cx="9" cy="15" r="1.2" opacity=".6" />
      </svg>
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
