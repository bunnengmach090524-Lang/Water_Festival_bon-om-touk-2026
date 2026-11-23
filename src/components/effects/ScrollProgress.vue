<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const progress = ref(0)
let frame = 0

function update() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    const doc = document.documentElement
    const max = doc.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
    frame = 0
  })
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })
  update()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    role="progressbar"
    :aria-label="t('a11y.scrollProgress')"
    :aria-valuenow="Math.round(progress)"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      class="h-full bg-gradient-to-r from-gold via-gold-light to-gold shadow-[0_0_12px_color-mix(in_srgb,var(--color-gold-light)_65%,transparent)]"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
