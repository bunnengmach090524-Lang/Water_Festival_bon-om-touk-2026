<script setup>
/**
 * Original CSS/SVG fireworks over the river. Positions are seeded (stable
 * between renders) but scattered; bursts bloom and fade using opacity and
 * scale only, and stop when the illustration leaves the viewport.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  art: { type: Boolean, default: false },
})

// Tiny seeded PRNG: a different-looking sky in every scene without layout shift.
function randomFactory(seed) {
  let value = seed
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

const random = randomFactory(20261123)
const colors = ['var(--scene-glow)', 'var(--scene-crimson)', 'var(--scene-paper)', 'var(--scene-gold)']
const bursts = Array.from({ length: 8 }, (_, index) => {
  const spokes = 12 + Math.floor(random() * 5)
  return {
    x: 90 + Math.round(random() * 1020),
    y: 55 + Math.round(random() * 210),
    radius: 26 + Math.round(random() * 22),
    color: colors[index % colors.length],
    delay: `${(-random() * 6).toFixed(2)}s`,
    duration: `${(4.5 + random() * 3).toFixed(2)}s`,
    points: Array.from({ length: spokes }, (_, spoke) => spoke * (360 / spokes)),
  }
})

const host = ref(null)
const offscreen = ref(false)
let observer = null

onMounted(() => {
  if (!('IntersectionObserver' in window) || !host.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      offscreen.value = !entry.isIntersecting
    },
    { threshold: 0.01 },
  )
  observer.observe(host.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <svg
    ref="host"
    class="scene-art"
    :class="{ 'scene-paused': offscreen }"
    :viewBox="art ? '0 0 1200 400' : '0 0 1200 600'"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <g v-for="(burst, index) in bursts" :key="index" :transform="`translate(${burst.x} ${burst.y})`">
      <g
        class="scene-anim scene-burst"
        :style="{ '--burst-delay': burst.delay, '--burst-duration': burst.duration }"
      >
        <circle r="7" :fill="burst.color" opacity=".85" />
        <g :stroke="burst.color" stroke-width="3.5" stroke-linecap="round">
          <path
            v-for="angle in burst.points"
            :key="angle"
            :d="`M0 0 0 ${-burst.radius}`"
            :transform="`rotate(${angle})`"
          />
        </g>
        <g :fill="burst.color">
          <circle
            v-for="angle in burst.points"
            :key="`dot-${angle}`"
            :cx="Math.sin((angle * Math.PI) / 180) * burst.radius"
            :cy="-Math.cos((angle * Math.PI) / 180) * burst.radius"
            r="3.5"
          />
        </g>
      </g>
    </g>
  </svg>
</template>
