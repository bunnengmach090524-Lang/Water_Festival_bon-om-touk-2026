<script setup>
/**
 * Original illustration: the full moon over the river, a pagoda roof and
 * small silhouettes saluting the moon on the bank.
 */
import { useId } from 'vue'

defineProps({
  art: { type: Boolean, default: false },
})

const uid = useId()
const people = [
  { x: 765, s: 1.05 },
  { x: 822, s: 0.9 },
  { x: 872, s: 1 },
]
const stars = [[95, 80, 2], [220, 145, 1.5], [340, 70, 1.8], [470, 132, 1.3], [1010, 92, 1.7], [1120, 160, 1.4]]
</script>

<template>
  <svg
    class="scene-art"
    :viewBox="art ? '0 70 1200 500' : '0 0 1200 600'"
    :preserveAspectRatio="art ? 'xMidYMid meet' : 'xMidYMid slice'"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient :id="`sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--scene-sky-2)" />
        <stop offset="1" stop-color="var(--scene-sky-1)" />
      </linearGradient>
      <radialGradient :id="`moon-${uid}`">
        <stop offset="0" stop-color="var(--scene-moon)" />
        <stop offset=".72" stop-color="var(--scene-moon)" />
        <stop offset="1" stop-color="var(--scene-glow)" />
      </radialGradient>
      <radialGradient :id="`halo-${uid}`">
        <stop offset="0" stop-color="var(--scene-glow)" stop-opacity=".52" />
        <stop offset="1" stop-color="var(--scene-glow)" stop-opacity="0" />
      </radialGradient>
      <linearGradient :id="`river-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--scene-water-1)" />
        <stop offset="1" stop-color="var(--scene-water-2)" />
      </linearGradient>
    </defs>

    <rect width="1200" height="600" :fill="`url(#sky-${uid})`" />
    <g fill="var(--scene-paper)" class="scene-anim scene-twinkle">
      <circle v-for="([x, y, r], i) in stars" :key="i" :cx="x" :cy="y" :r="r" :style="{ animationDelay: `${-i * 0.9}s` }" />
    </g>

    <!-- Full moon with layered halo -->
    <g class="scene-anim scene-moon-float">
      <circle cx="660" cy="180" r="230" :fill="`url(#halo-${uid})`" />
      <circle cx="660" cy="180" r="112" :fill="`url(#moon-${uid})`" />
      <g fill="var(--scene-glow)" opacity=".22">
        <circle cx="622" cy="148" r="17" />
        <circle cx="700" cy="205" r="24" />
        <circle cx="650" cy="232" r="11" />
      </g>
    </g>

    <!-- Pagoda roof silhouette on the left bank -->
    <g fill="var(--scene-ink)">
      <path d="M40 350q80-26 160 0l-18 12H58Z" />
      <path d="M62 338q58-30 116 0l-16-14q-42-16-84 0Z" />
      <path d="M96 310q24-42 48 0Z" />
      <path d="M118 282h4v-28h-4z" />
      <rect x="94" y="348" width="52" height="74" />
      <path d="M84 422h72v8H84Z" />
    </g>

    <!-- Riverbank -->
    <path d="M0 444q150-30 300-6t280-4q160-30 320 10t300-8v164H0Z" fill="var(--scene-hill)" />
    <rect y="452" width="1200" height="148" :fill="`url(#river-${uid})`" opacity=".9" />
    <ellipse cx="660" cy="482" rx="70" ry="9" fill="var(--scene-glow)" opacity=".45" class="scene-anim scene-ripple" />
    <ellipse cx="660" cy="520" rx="105" ry="6" fill="var(--scene-glow)" opacity=".25" class="scene-anim scene-ripple" style="animation-delay: -2s" />

    <!-- respectful salutations: hands together, heads bowed toward the moon -->
    <g v-for="(person, index) in people" :key="index" :transform="`translate(${person.x} 420) scale(${person.s})`">
      <path d="M0 0c-6 0-10 5-10 11s4 10 10 10 10-4 10-10S6 0 0 0Z" fill="var(--scene-ink)" />
      <path d="M-12 24q12-8 24 0l7 32h-38Z" fill="var(--scene-ink)" />
      <path d="M9 31q10-7 13-20l5 3q-3 17-14 25Z" fill="var(--scene-ink)" />
      <path d="M-6 34q-6 12-2 22M3 34q6 12 2 22" fill="none" stroke="var(--scene-ink)" stroke-width="4" stroke-linecap="round" />
    </g>
  </svg>
</template>
