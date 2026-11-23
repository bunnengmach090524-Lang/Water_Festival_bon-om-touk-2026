<script setup>
/**
 * Original illustration: a bowl of pounded rice (ok ambok) with coconut,
 * banana and rising steam, drawn in the same flat Khmer storybook style.
 */
import { useId } from 'vue'

defineProps({
  art: { type: Boolean, default: false },
})

const uid = useId()
const steam = [
  { x: 520, d: '-0.5s' },
  { x: 600, d: '-1.8s' },
  { x: 680, d: '-3.1s' },
]
</script>

<template>
  <svg
    class="scene-art"
    :viewBox="art ? '220 60 760 500' : '0 0 1200 600'"
    :preserveAspectRatio="art ? 'xMidYMid meet' : 'xMidYMid slice'"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient :id="`bg-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--scene-sky-2)" />
        <stop offset="1" stop-color="var(--scene-sky-1)" />
      </linearGradient>
      <linearGradient :id="`bowl-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--scene-gold)" />
        <stop offset="1" stop-color="var(--scene-crimson)" />
      </linearGradient>
    </defs>

    <rect width="1200" height="600" :fill="`url(#bg-${uid})`" />
    <!-- decorative floor mat -->
    <path d="M210 470q390-70 780 0l-60 90H270Z" fill="var(--scene-hill)" opacity=".85" />
    <g stroke="var(--scene-gold)" stroke-width="2" opacity=".35">
      <path d="M300 478 250 552M420 466 386 552M540 458 522 552M660 458 658 552M780 466 794 552M900 478 930 552" />
    </g>

    <!-- Steam: transform + opacity only -->
    <g v-for="( puff, index) in steam" :key="index" :transform="`translate(${puff.x} 250)`">
      <path
        d="M0 0q-26-30 0-58t0-58q22-26 0-52"
        fill="none"
        stroke="var(--scene-paper)"
        stroke-width="7"
        stroke-linecap="round"
        opacity=".45"
        class="scene-anim scene-steam"
        :style="{ animationDelay: puff.d }"
      />
    </g>

    <!-- Bowl and pounded rice -->
    <ellipse cx="600" cy="392" rx="270" ry="66" :fill="`url(#bowl-${uid})`" />
    <path d="M330 392q36 156 270 156t270-156q-52 66-270 66T330 392Z" :fill="`url(#bowl-${uid})`" />
    <path d="M360 420q240 74 480 0" fill="none" stroke="var(--scene-gold)" stroke-width="6" opacity=".7" />
    <path d="M338 382q262-88 524 0-50 52-262 52T338 382Z" fill="var(--scene-paper)" />
    <path d="M400 372q200-58 400 0" fill="none" stroke="var(--scene-glow)" stroke-width="4" opacity=".65" />
    <g fill="var(--scene-glow)" opacity=".55">
      <circle cx="480" cy="372" r="5" />
      <circle cx="560" cy="356" r="4" />
      <circle cx="650" cy="368" r="6" />
      <circle cx="720" cy="378" r="4" />
    </g>

    <!-- Coconut halves and banana beside the bowl -->
    <g transform="translate(272 462)">
      <path d="M-46 0a46 34 0 0 1 92 0Z" fill="var(--scene-paper)" />
      <path d="M-38 0a38 28 0 0 1 76 0Z" fill="var(--scene-hill)" />
      <circle cx="0" cy="-10" r="7" fill="var(--scene-glow)" />
    </g>
    <g transform="translate(930 470) rotate(-12)">
      <path d="M-70 0q34-34 78-22 26 8 46 30-52 26-124-8Z" fill="var(--scene-glow)" />
      <path d="M-58 2q54 18 100-8" fill="none" stroke="var(--scene-paper)" stroke-width="4" opacity=".8" />
    </g>
  </svg>
</template>
