<script setup>
import { useI18n } from 'vue-i18n'
import CloudImage from './CloudImage.vue'
import { inferCategory } from '../scenes/inferCategory'

defineProps({
  items: { type: Array, required: true },
  startIndex: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
})
const emit = defineEmits(['open'])
const { t } = useI18n()

function captionOf(item) {
  if (!item) return ''
  if (item.caption) return item.caption
  return item.captionKey ? t(item.captionKey, item.captionParams || {}) : ''
}
</script>

<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="(item, index) in items" :key="item.id" v-reveal="(index % 3) * 80" class="min-w-0">
      <button
        type="button"
        class="block w-full text-left"
        :aria-label="t('photoViewer.photoOf', { n: startIndex + index + 1, total: total || items.length })"
        @click="emit('open', startIndex + index)"
      >
        <div v-tilt class="tilt">
          <div class="image-zoom card-lift rounded-2xl">
            <CloudImage
              :public-id="item.publicId"
              :alt="captionOf(item)"
              :category="inferCategory(item.publicId, item.category)"
              :variant="index"
              :show-missing-label="true"
              :widths="[240, 480, 720]"
              aspect="4 / 3"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
        <p class="mt-3 px-1 text-sm leading-6 text-muted transition-colors hover:text-gold-light">
          {{ captionOf(item) }}
        </p>
      </button>
    </div>
  </div>
</template>
