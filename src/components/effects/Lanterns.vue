<script setup>
/**
 * CSS-only lanterns, always present (including when WebGL is skipped).
 * They float on the right half of the hero, stay small and dim, and half of
 * them are hidden below 768px. Reduced motion shows a calm static arrangement.
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const lanterns = [
  { x: '64%', delay: '-2s', duration: '19s', scale: 0.55 },
  { x: '56%', delay: '-11s', duration: '23s', scale: 0.48 },
  { x: '76%', delay: '-6s', duration: '17s', scale: 0.62 },
  { x: '70%', delay: '-15s', duration: '25s', scale: 0.5 },
  { x: '88%', delay: '-9s', duration: '21s', scale: 0.58 },
  { x: '82%', delay: '-3s', duration: '18s', scale: 0.46 },
  { x: '96%', delay: '-13s', duration: '24s', scale: 0.54 },
  { x: '94%', delay: '-7s', duration: '20s', scale: 0.44 },
]

const paused = ref(false)
const isMobile = ref(false)
const reduced = ref(false)
const visibleLanterns = computed(() =>
  isMobile.value ? lanterns.filter((_, index) => index % 2 === 0) : lanterns,
)

let mediaQuery = null
let motionQuery = null

function onVisibility() {
  paused.value = document.hidden
}

function onMediaChange(event) {
  isMobile.value = event.matches
}

function onMotionChange(event) {
  reduced.value = event.matches
}

onMounted(() => {
  paused.value = document.hidden

  mediaQuery = window.matchMedia?.('(max-width: 767px)') || null
  isMobile.value = mediaQuery?.matches ?? false
  mediaQuery?.addEventListener?.('change', onMediaChange)

  motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)') || null
  reduced.value = motionQuery?.matches ?? false
  motionQuery?.addEventListener?.('change', onMotionChange)

  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener?.('change', onMediaChange)
  motionQuery?.removeEventListener?.('change', onMotionChange)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div
    class="hero-lanterns pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
    :class="{ 'scene-paused': paused, 'scene-static': reduced }"
    aria-hidden="true"
  >
    <div
      v-for="lantern in visibleLanterns"
      :key="lantern.x"
      class="lantern-float absolute bottom-0"
      :style="{
        left: lantern.x,
        '--delay': lantern.delay,
        '--duration': lantern.duration,
        '--scale': lantern.scale,
      }"
    >
      <div class="lantern-glow"></div>
      <div class="lantern-body">
        <div class="lantern-flame"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-lanterns {
  -webkit-mask-image: radial-gradient(ellipse 72% 74% at 72% 52%, #000 45%, transparent 100%);
  mask-image: radial-gradient(ellipse 72% 74% at 72% 52%, #000 45%, transparent 100%);
}

.lantern-float {
  opacity: 0.55;
  animation: hero-lantern-rise var(--duration) linear var(--delay) infinite;
  will-change: transform, opacity;
}

.scene-paused .lantern-float {
  animation-play-state: paused;
}

.scene-static .lantern-float {
  bottom: 32%;
  opacity: 0.42;
  animation: none;
}

.lantern-glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--scene-glow) 28%, transparent),
    color-mix(in srgb, var(--scene-gold) 10%, transparent) 48%,
    transparent 72%
  );
  filter: blur(3px);
}

.lantern-body {
  position: relative;
  width: 16px;
  height: 20px;
  border: 1px solid color-mix(in srgb, var(--scene-glow) 70%, transparent);
  border-radius: 50% 50% 46% 46%;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--scene-moon) 82%, transparent),
    color-mix(in srgb, var(--scene-gold) 55%, transparent)
  );
  box-shadow:
    0 0 14px 3px color-mix(in srgb, var(--scene-glow) 42%, transparent),
    inset 0 0 6px color-mix(in srgb, var(--scene-glow) 32%, transparent);
  transform: scale(var(--scale));
}

.lantern-body::before {
  content: "";
  position: absolute;
  left: 3px;
  right: 3px;
  top: 3px;
  height: 1px;
  background: color-mix(in srgb, var(--scene-ink) 28%, transparent);
}

.lantern-flame {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4px;
  height: 6px;
  margin: -3px 0 0 -2px;
  border-radius: 50%;
  background: var(--scene-moon);
  box-shadow: 0 0 8px 2px color-mix(in srgb, var(--scene-glow) 75%, transparent);
}

@keyframes hero-lantern-rise {
  0% {
    transform: translate3d(0, 14vh, 0) scale(0.8);
    opacity: 0;
  }
  15% {
    opacity: 0.55;
  }
  80% {
    opacity: 0.45;
  }
  100% {
    transform: translate3d(-1.25rem, -78vh, 0) scale(1);
    opacity: 0;
  }
}
</style>
