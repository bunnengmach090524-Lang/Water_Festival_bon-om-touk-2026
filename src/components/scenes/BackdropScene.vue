<script setup>
/**
 * Fixed, low-opacity illustration layer behind all page content.
 * Scene selection follows the route, crossfades on navigation, drifts subtly
 * on scroll, pauses when the tab is hidden and is static for reduced motion.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LongBoatRace from './LongBoatRace.vue'
import FloatingLanterns from './FloatingLanterns.vue'
import MoonSalutation from './MoonSalutation.vue'
import OkAmbok from './OkAmbok.vue'
import Fireworks from './Fireworks.vue'

const route = useRoute()

const sceneSets = {
  home: [
    { key: 'moon', component: MoonSalutation, box: 'sky' },
    { key: 'fireworks', component: Fireworks, box: 'sky' },
    { key: 'boat', component: LongBoatRace, box: 'river' },
  ],
  about: [
    { key: 'moon', component: MoonSalutation, box: 'sky' },
    { key: 'river', component: FloatingLanterns, box: 'river' },
  ],
  schedule: [{ key: 'fireworks', component: Fireworks, box: 'full' }],
  destinations: [{ key: 'lanterns', component: FloatingLanterns, box: 'river' }],
  'destination-detail': [{ key: 'lanterns', component: FloatingLanterns, box: 'river' }],
  gallery: [{ key: 'lanterns', component: FloatingLanterns, box: 'river' }],
  tips: [
    { key: 'ambok', component: OkAmbok, box: 'mid' },
    { key: 'lanterns', component: FloatingLanterns, box: 'river' },
  ],
  dashboard: [{ key: 'fireworks', component: Fireworks, box: 'sky' }],
}

const BOX = {
  sky: { top: '0%', bottom: 'auto', height: '64%' },
  mid: { top: '6%', bottom: 'auto', height: '78%' },
  river: { top: '30%', bottom: 'auto', height: '70%' },
  full: { top: '0%', bottom: 'auto', height: '100%' },
}

const layers = computed(() => sceneSets[route.name] || sceneSets.destinations)
const sceneKey = computed(() => route.name || 'fallback')

const paused = ref(false)
const reduced = ref(false)
const parallax = ref(0)
let frame = 0
let motionQuery = null

function onVisibility() {
  paused.value = document.hidden
}

function onScroll() {
  if (frame || reduced.value) return
  frame = requestAnimationFrame(() => {
    parallax.value = Math.min(46, window.scrollY * 0.045)
    frame = 0
  })
}

function onMotionChange(event) {
  reduced.value = event.matches
  if (event.matches) parallax.value = 0
}

watch(reduced, (value) => {
  if (!value) onScroll()
})

onMounted(() => {
  paused.value = document.hidden
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('scroll', onScroll, { passive: true })
  try {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = motionQuery.matches
    motionQuery.addEventListener?.('change', onMotionChange)
  } catch {
    // Without matchMedia the CSS media query still stops the animations.
  }
  onScroll()
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('scroll', onScroll)
  motionQuery?.removeEventListener?.('change', onMotionChange)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div
    class="scene-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden"
    :class="{ 'scene-paused': paused, 'scene-static': reduced }"
    aria-hidden="true"
  >
    <div class="absolute inset-0" :style="{ transform: `translate3d(0, ${parallax}px, 0)` }">
      <Transition name="scene-crossfade">
        <div :key="sceneKey" class="absolute inset-0">
          <div v-for="layer in layers" :key="layer.key" class="scene-layer" :style="BOX[layer.box]">
            <component :is="layer.component" class="scene-root" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.scene-crossfade-enter-active,
.scene-crossfade-leave-active {
  transition: opacity 0.65s ease;
}
.scene-crossfade-enter-from,
.scene-crossfade-leave-to {
  opacity: 0;
}
</style>
