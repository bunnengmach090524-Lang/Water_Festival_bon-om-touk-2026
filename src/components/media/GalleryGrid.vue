<script setup>
import { useI18n } from 'vue-i18n'
import CloudImage from './CloudImage.vue'
import { inferCategory } from '../scenes/inferCategory'

defineProps({
  items: { type: Array, required: true },
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
  <div class="columns-1 gap-5 sm:columns-2 lg:columns-3">
    <div v-for="(item, index) in items" :key="item.id" v-reveal="(index % 3) * 80" class="mb-5 break-inside-avoid">
      <button
        type="button"
        class="block w-full text-left"
        :aria-label="t('photoViewer.photoOf', { n: index + 1, total: items.length })"
        @click="emit('open', index)"
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
