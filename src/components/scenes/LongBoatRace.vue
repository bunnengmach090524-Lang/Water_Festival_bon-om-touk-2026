<script setup>
/**
 * Original flat folk-art illustration: a Khmer racing boat (tuk ngo) with a
 * synchronized line of rowers gliding over layered river waves.
 * Only transform/opacity are animated; colours come from the theme tokens.
 */
import { useId } from 'vue'

defineProps({
  art: { type: Boolean, default: false },
})

const uid = useId()
const rowers = Array.from({ length: 11 }, (_, index) => ({
  x: 108 + index * 52,
  delay: `${(-index * 0.085).toFixed(3)}s`,
}))
const stars = [
  [90, 70, 2], [180, 122, 1.4], [305, 62, 1.7], [410, 110, 1.2],
  [520, 48, 2.1], [690, 96, 1.5], [810, 58, 1.8], [960, 118, 1.3], [1090, 72, 1.9],
]
</script>

<template>
  <svg
    class="scene-art"
    :viewBox="art ? '0 90 1200 470' : '0 0 1200 600'"
    :preserveAspectRatio="art ? 'xMidYMid meet' : 'xMidYMid slice'"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient :id="`sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--scene-sky-2)" />
        <stop offset="1" stop-color="var(--scene-sky-1)" />
      </linearGradient>
      <linearGradient :id="`water-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--scene-water-1)" />
        <stop offset="1" stop-color="var(--scene-water-2)" />
      </linearGradient>
      <radialGradient :id="`halo-${uid}`">
        <stop offset="0" stop-color="var(--scene-glow)" stop-opacity=".55" />
        <stop offset="1" stop-color="var(--scene-glow)" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- Night / golden-hour sky -->
    <rect x="0" y="0" width="1200" height="600" :fill="`url(#sky-${uid})`" />
    <circle cx="875" cy="112" r="118" :fill="`url(#halo-${uid})`" class="scene-anim scene-twinkle" />
    <circle cx="875" cy="112" r="46" fill="var(--scene-moon)" opacity=".9" />
    <g fill="var(--scene-paper)" class="scene-anim scene-twinkle">
      <circle v-for="([x, y, r], i) in stars" :key="i" :cx="x" :cy="y" :r="r" :style="{ animationDelay: `${-i * 0.7}s` }" />
    </g>

    <!-- Distant bank and temple roof -->
    <path d="M0 296Q130 254 260 286t250-6q140-42 270 12t250-8q90-24 170 10v88H0Z" fill="var(--scene-hill)" opacity=".85" />
    <path d="M520 283h74l-12-24h-50ZM548 259l10-30 10 30Z" fill="var(--scene-ink)" opacity=".8" />

    <!-- River -->
    <rect x="0" y="312" width="1200" height="288" :fill="`url(#water-${uid})`" />
    <path d="M-300 350q75-16 150 0t150 0 150 0 150 0 150 0 150 0 150 0 150 0v260H-300Z" fill="var(--scene-water-2)" opacity=".55" class="scene-anim scene-wave-back" />

    <!-- Racing boat: prow, carved eye, hull and eleven rowers -->
    <g class="scene-anim scene-boat" style="will-change: transform">
      <g transform="translate(0 414)">
        <path d="M70 42q340 62 700 0l-58 46H126Z" fill="var(--scene-crimson)" />
        <path d="M126 88h586l-42 18H166Z" fill="var(--scene-ink)" opacity=".65" />
        <path d="M70 42q340 62 700 0" fill="none" stroke="var(--scene-gold)" stroke-width="5" />
        <path d="M770 42q34-40 62-52-16 32-8 62Z" fill="var(--scene-gold)" />
        <circle cx="786" cy="20" r="6" fill="var(--scene-paper)" />
        <circle cx="788" cy="20" r="2.6" fill="var(--scene-ink)" />
        <path d="M62 44q-24-14-40-34 30 6 52 28Z" fill="var(--scene-gold)" />

        <g v-for="(rower, index) in rowers" :key="index" :transform="`translate(${rower.x} 0)`">
          <!-- Oar pivots in sync, staggered like a real stroke -->
          <g class="scene-anim scene-oar" :style="{ animationDelay: rower.delay }">
            <path d="M6 34 54 96" stroke="var(--scene-gold)" stroke-width="3.4" stroke-linecap="round" />
            <path d="m50 92 12 12-8 6-12-12Z" fill="var(--scene-gold)" opacity=".85" />
          </g>
          <circle cx="0" cy="0" r="9" fill="var(--scene-ink)" />
          <path d="M-10 12q10-6 20 0l6 30h-32Z" fill="var(--scene-crimson)" />
          <path d="M-9 15q-13 8-8 18" fill="none" stroke="var(--scene-ink)" stroke-width="3" stroke-linecap="round" />
        </g>
      </g>
    </g>

    <!-- Foreground ripples -->
    <g class="scene-anim scene-ripple" stroke="var(--scene-glow)" stroke-width="2" fill="none" opacity=".5">
      <path d="M120 500q90-12 180 0t180 0" />
      <path d="M620 536q90-12 180 0t180 0" />
      <path d="M320 566q90-12 180 0t180 0" />
    </g>
  </svg>
</template>
