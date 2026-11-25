<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FallbackArt from '../scenes/FallbackArt.vue'

const props = defineProps({
  videoId: { type: String, required: true },
  caption: { type: String, default: '' },
  category: { type: [String, Array], default: '' },
  variant: { type: Number, default: 0 },
})

const { t } = useI18n()
const active = ref(false)
const safeId = computed(() => String(props.videoId).replace(/[^a-zA-Z0-9_-]/g, ''))
const embedUrl = computed(() => `https://www.youtube-nocookie.com/embed/${safeId.value}`)
const watchUrl = computed(() => `https://www.youtube.com/watch?v=${safeId.value}`)
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-2xl bg-[var(--color-night)]">
    <div class="relative aspect-video w-full">
      <iframe
        v-if="active && safeId"
        class="absolute inset-0 h-full w-full"
        :src="embedUrl"
        :title="caption || t('destinations.detail.videoTitle')"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>

      <div v-else class="absolute inset-0">
        <FallbackArt :category="category" :variant="variant" />
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--glass-bg)] px-5 text-center">
          <button
            type="button"
            class="btn btn-primary min-h-12"
            :disabled="!safeId"
            :aria-label="caption || t('destinations.detail.playYouTube')"
            @click="active = true"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5Z" />
            </svg>
            {{ t('destinations.detail.playYouTube') }}
          </button>
          <a
            :href="watchUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-semibold text-gold-light underline decoration-gold/50 underline-offset-4 transition hover:text-ivory"
          >
            {{ t('destinations.detail.openYouTube') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
