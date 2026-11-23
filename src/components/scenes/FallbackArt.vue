<script setup>
/**
 * Illustrated Cloudinary fallback. Picks a themed original SVG by category so
 * a gallery, destination or video card still looks complete with no media.
 */
import { useId } from 'vue'
import FloatingLanterns from './FloatingLanterns.vue'
import MoonSalutation from './MoonSalutation.vue'
import OkAmbok from './OkAmbok.vue'

const props = defineProps({
  category: { type: String, default: 'river' },
})

const uid = useId()
const cityWindows = [80, 132, 188, 250, 316, 372, 440, 500, 556, 620, 686, 744, 800]
</script>

<template>
  <div class="scene-art" aria-hidden="true">
    <FloatingLanterns v-if="props.category === 'river'" art />
    <MoonSalutation v-else-if="props.category === 'temple'" art />
    <OkAmbok v-else-if="props.category === 'food'" art />

    <!-- City: festival waterfront skyline and a single ceremonial bridge -->
    <svg v-else-if="props.category === 'city'" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`citysky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#citysky-${uid})`" />
      <circle cx="620" cy="100" r="42" fill="var(--scene-moon)" opacity=".85" />
      <g fill="var(--scene-hill)">
        <path d="M0 320h130V210h70v110h60V170h90v150h80V230h70v90h70V190h80v130h130v78H0Z" />
      </g>
      <g fill="var(--scene-glow)" opacity=".6">
        <rect v-for="(x, index) in cityWindows" :key="x" :x="x" :y="index % 2 ? 250 : 290" width="10" height="14" rx="2" />
      </g>
      <path d="M0 392h800v108H0Z" fill="var(--scene-water-1)" />
      <path d="M60 392q340-96 680 0" fill="none" stroke="var(--scene-gold)" stroke-width="7" />
      <g stroke="var(--scene-gold)" stroke-width="3" opacity=".7">
        <path d="M160 372v52M280 350v74M400 336v88M520 350v74M640 372v52" />
      </g>
      <g fill="none" stroke="var(--scene-glow)" stroke-width="2" opacity=".55" class="scene-anim scene-ripple">
        <path d="M80 450q70-10 140 0t140 0" />
        <path d="M440 476q70-10 140 0t140 0" />
      </g>
    </svg>

    <!-- Nature: golden-hour hills, palms and a small waterway -->
    <svg v-else viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`naturesky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#naturesky-${uid})`" />
      <circle cx="560" cy="130" r="58" fill="var(--scene-glow)" opacity=".75" />
      <path d="M0 300q160-120 300-30t260-20q140-70 240 20v230H0Z" fill="var(--scene-hill)" opacity=".8" />
      <path d="M0 360q180-70 360 0t440-20v160H0Z" fill="var(--scene-water-2)" opacity=".85" />
      <g fill="var(--scene-ink)">
        <path d="M120 320q-14-70 6-120 6 66 12 120Z" />
        <path d="M126 202q-52-24-78 10 48-6 78 4 30-10 78-4-26-34-78-10Z" />
        <path d="M690 330q-12-58 4-96 6 52 10 96Z" />
        <path d="M694 238q-40-18-62 8 38-4 62 4 24-8 62-4-22-26-62-8Z" />
      </g>
      <g fill="none" stroke="var(--scene-glow)" stroke-width="2" opacity=".5" class="scene-anim scene-ripple">
        <path d="M90 420q70-10 140 0t140 0" />
        <path d="M460 452q70-10 140 0t140 0" />
      </g>
    </svg>
  </div>
</template>
