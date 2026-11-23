<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  item: { type: Object, required: true },
})

const { t } = useI18n()
const flipped = ref(false)
const hovered = ref(false)
const focused = ref(false)
const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(hover: none), (pointer: coarse)').matches

// Hover/focus flips on pointer devices; tap toggles on touch screens.
const turned = computed(() => flipped.value || (!isTouch && (hovered.value || focused.value)))
const name = computed(() => t(`traditions.items.${props.item.id}.name`))
const short = computed(() => t(`traditions.items.${props.item.id}.short`))
const detail = computed(() => t(`traditions.items.${props.item.id}.detail`))
</script>

<template>
  <button
    type="button"
    class="flip-card block h-[290px] w-full rounded-2xl text-left sm:h-[310px]"
    :class="{ 'is-flipped': turned }"
    :aria-pressed="flipped"
    :aria-label="`${name} — ${t('a11y.flipCard')}`"
    @click="flipped = !flipped"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focus="focused = true"
    @blur="focused = false"
  >
    <div class="flip-inner">
      <div class="flip-face flip-front card-lift flex flex-col items-center justify-center rounded-2xl px-6 py-8 text-center">
        <div class="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
          <svg v-if="item.id === 'ok_ambok'" viewBox="0 0 48 48" class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
            <path d="M9 24h30c0 10-6 15-15 15S9 34 9 24Z" />
            <path d="M7 24h34M18 13c0 3 3 3 3 6m6-8c0 3 3 3 3 6" stroke-linecap="round" />
          </svg>
          <svg v-else-if="item.id === 'boat_racing'" viewBox="0 0 48 48" class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
            <path d="M6 30h36l-6 8H12l-6-8Z" />
            <path d="M24 28V8l12 16H24Z" />
            <path d="M20 34 14 16" stroke-linecap="round" />
          </svg>
          <svg v-else-if="item.id === 'floating_lanterns'" viewBox="0 0 48 48" class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
            <path d="M16 17h16l3 20H13l3-20Z" />
            <path d="M17 10h14M24 17c3 3 3 6 0 9-3-3-3-6 0-9Z" />
            <path d="M6 42c6-3 10 3 16 0s10 3 16 0" stroke-linecap="round" opacity=".7" />
          </svg>
          <svg v-else viewBox="0 0 48 48" class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
            <path d="M32 8a16 16 0 1 0 8 25A17 17 0 0 1 32 8Z" />
            <path d="M10 40c6-4 10 4 16 0s10 4 16 0" stroke-linecap="round" opacity=".7" />
          </svg>
        </div>
        <h3 class="mt-6 font-display text-2xl text-ivory">{{ name }}</h3>
        <p class="mt-2 text-sm text-gold-light/85">{{ short }}</p>
        <p class="mt-4 text-xs tracking-wide text-muted/80">{{ t('traditions.flipHint') }}</p>
      </div>

      <div class="flip-face flip-back card-lift flex flex-col justify-center rounded-2xl p-7 text-center">
        <p class="eyebrow">{{ t('home.traditions.title') }}</p>
        <h3 class="mt-3 font-display text-2xl text-gold-light">{{ name }}</h3>
        <p class="mt-4 text-sm leading-7 text-ivory/85">{{ detail }}</p>
      </div>
    </div>
  </button>
</template>
