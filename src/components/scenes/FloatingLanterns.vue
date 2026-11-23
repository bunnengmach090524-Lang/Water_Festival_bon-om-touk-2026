<script setup>
/**
 * Original illustration: banana-leaf and paper lantern boats (bondet pradip)
 * drifting down the river with candlelight and reflections.
 */
import { useId } from 'vue'

defineProps({
  art: { type: Boolean, default: false },
})

const uid = useId()
const lanterns = [
  { x: 110, y: 430, s: 1.05, d: '-1s', dur: '14s' },
  { x: 260, y: 500, s: 0.78, d: '-7s', dur: '17s' },
  { x: 400, y: 385, s: 0.9, d: '-4s', dur: '15s' },
  { x: 545, y: 470, s: 1.15, d: '-11s', dur: '19s' },
  { x: 710, y: 415, s: 0.72, d: '-3s', dur: '13s' },
  { x: 850, y: 520, s: 1, d: '-9s', dur: '18s' },
  { x: 1010, y: 445, s: 0.85, d: '-6s', dur: '16s' },
]
</script>

<template>
  <svg
    class="scene-art"
    :viewBox="art ? '0 110 1200 460' : '0 0 1200 600'"
    :preserveAspectRatio="art ? 'xMidYMid meet' : 'xMidYMid slice'"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient :id="`sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--scene-sky-2)" />
        <stop offset="1" stop-color="var(--scene-sky-1)" />
      </linearGradient>
      <linearGradient :id="`river-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--scene-water-1)" />
        <stop offset="1" stop-color="var(--scene-water-2)" />
      </linearGradient>
      <radialGradient :id="`candle-${uid}`">
        <stop offset="0" stop-color="var(--scene-glow)" stop-opacity=".75" />
        <stop offset="1" stop-color="var(--scene-glow)" stop-opacity="0" />
      </radialGradient>
    </defs>

    <rect width="1200" height="600" :fill="`url(#sky-${uid})`" />
    <circle cx="260" cy="120" r="34" fill="var(--scene-moon)" opacity=".82" />
    <circle cx="260" cy="120" r="96" :fill="`url(#candle-${uid})`" class="scene-anim scene-twinkle" />
    <path d="M0 276q150-46 300-8t290-10q150-40 300 14t310-12v66H0Z" fill="var(--scene-hill)" opacity=".9" />

    <!-- River with two slowly shifting wave bands -->
    <rect y="310" width="1200" height="290" :fill="`url(#river-${uid})`" />
    <path d="M-300 356q75-14 150 0t150 0 150 0 150 0 150 0 150 0 150 0 150 0v260H-300Z" fill="var(--scene-water-2)" opacity=".5" class="scene-anim scene-wave-back" />
    <g fill="none" stroke="var(--scene-glow)" stroke-width="2" opacity=".4" class="scene-anim scene-ripple">
      <path d="M60 470q80-10 160 0t160 0" />
      <path d="M690 398q80-10 160 0t160 0" />
      <path d="M380 550q80-10 160 0t160 0" />
    </g>

    <!-- One reusable hand-made lantern boat, positioned seven times -->
    <g v-for="(boat, index) in lanterns" :key="index" :transform="`translate(${boat.x} ${boat.y}) scale(${boat.s})`">
      <g class="scene-anim scene-lantern" :style="{ animationDelay: boat.d, animationDuration: boat.dur }">
        <ellipse cx="0" cy="30" rx="52" ry="18" :fill="`url(#candle-${uid})`" opacity=".85" />
        <!-- banana-leaf hull with folded paper cup -->
        <path d="M-56 8q56 30 112 0-14 34-56 34T-56 8Z" fill="var(--scene-gold)" />
        <path d="M-44 10q44 20 88 0" fill="none" stroke="var(--scene-paper)" stroke-width="2.5" opacity=".8" />
        <path d="M-24 10h48l-7-26H-17Z" fill="var(--scene-paper)" opacity=".92" />
        <path d="M-24 10h48" stroke="var(--scene-crimson)" stroke-width="3" />
        <path d="M-17-16h34" stroke="var(--scene-crimson)" stroke-width="2.5" />
        <path d="M0 9q-9-12 0-18 9 6 0 18Z" fill="var(--scene-glow)" class="scene-anim scene-flame" :style="{ animationDelay: `${-index * 0.4}s` }" />
        <circle cx="0" cy="-4" r="16" :fill="`url(#candle-${uid})`" opacity=".7" />
      </g>
    </g>
  </svg>
</template>
