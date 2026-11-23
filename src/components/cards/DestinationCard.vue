<script setup>
import { useI18n } from 'vue-i18n'
import CloudImage from '../media/CloudImage.vue'
import { inferCategory } from '../scenes/inferCategory'

defineProps({
  destination: { type: Object, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  regionLabel: { type: String, default: '' },
})

const { t } = useI18n()
</script>

<template>
  <div v-tilt class="tilt h-full">
    <RouterLink
      :to="`/destinations/${destination.id}`"
      class="card-lift group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div class="image-zoom">
        <CloudImage
          :public-id="destination.imagePublicId"
          :alt="name"
          :category="inferCategory(destination.imagePublicId, destination.tags)"
          aspect="4 / 3"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          class="rounded-none!"
        />
      </div>
      <div class="flex flex-1 flex-col p-5 sm:p-6">
        <p v-if="regionLabel" class="eyebrow">{{ regionLabel }}</p>
        <h3 class="mt-2 font-display text-2xl leading-tight text-ivory">{{ name }}</h3>
        <p class="mt-3 line-clamp-3 text-sm leading-6 text-muted">{{ description }}</p>
        <span class="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-semibold text-gold-light">
          {{ t('common.learnMore') }}
          <svg viewBox="0 0 20 20" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M4 10h11m-4-4 4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </RouterLink>
  </div>
</template>
