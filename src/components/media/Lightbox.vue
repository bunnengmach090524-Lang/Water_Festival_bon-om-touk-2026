<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CloudImage from './CloudImage.vue'
import { inferCategory } from '../scenes/inferCategory'

const props = defineProps({
  items: { type: Array, default: () => [] },
  index: { type: Number, default: -1 },
})
const emit = defineEmits(['close', 'update:index'])

const { t } = useI18n()
const closeButton = ref(null)
const isOpen = computed(() => props.index >= 0 && !!props.items[props.index])
const current = computed(() => props.items[props.index] || null)

function close() {
  emit('close')
}
function next() {
  if (props.items.length) emit('update:index', (props.index + 1) % props.items.length)
}
function previous() {
  if (props.items.length) emit('update:index', (props.index - 1 + props.items.length) % props.items.length)
}

function onKeydown(event) {
  if (!isOpen.value) return
  if (event.key === 'Escape') close()
  else if (event.key === 'ArrowRight') next()
  else if (event.key === 'ArrowLeft') previous()
}

let touchStartX = 0
function onTouchStart(event) {
  touchStartX = event.changedTouches[0].clientX
}
function onTouchEnd(event) {
  const distance = event.changedTouches[0].clientX - touchStartX
  if (Math.abs(distance) > 50) distance < 0 ? next() : previous()
}

watch(isOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    await nextTick()
    closeButton.value?.focus()
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen && current"
        class="fixed inset-0 z-[80] flex flex-col bg-[color-mix(in_srgb,var(--color-midnight)_96%,transparent)] backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        :aria-label="t('a11y.lightbox')"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div class="flex justify-end p-4">
          <button
            ref="closeButton"
            type="button"
            class="flex min-h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-light transition hover:bg-gold/15"
            :aria-label="t('gallery.lightbox.close')"
            @click="close"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div class="relative flex flex-1 items-center justify-center px-3 pb-4 sm:px-16">
          <button
            type="button"
            class="absolute left-2 z-10 flex min-h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-[var(--glass-bg)] text-gold-light transition hover:bg-gold/15 sm:left-5"
            :aria-label="t('gallery.lightbox.previous')"
            @click="previous"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="m14 6-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <CloudImage
            :public-id="current.publicId"
            :alt="t(current.captionKey)"
            :category="inferCategory(current.publicId, current.category)"
            aspect="16 / 9"
            sizes="90vw"
            class="max-w-5xl"
          />

          <button
            type="button"
            class="absolute right-2 z-10 flex min-h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-[var(--glass-bg)] text-gold-light transition hover:bg-gold/15 sm:right-5"
            :aria-label="t('gallery.lightbox.next')"
            @click="next"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="m10 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <p class="px-5 pb-1 text-center text-sm text-ivory/90">{{ t(current.captionKey) }}</p>
        <p class="px-5 pb-5 text-center text-xs text-muted">{{ t('gallery.lightbox.swipeHint') }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
