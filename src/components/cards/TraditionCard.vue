<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LongBoatRace from '../scenes/LongBoatRace.vue'
import FloatingLanterns from '../scenes/FloatingLanterns.vue'
import MoonSalutation from '../scenes/MoonSalutation.vue'
import OkAmbok from '../scenes/OkAmbok.vue'

const props = defineProps({
  item: { type: Object, required: true },
})

const { t } = useI18n()
const flipped = ref(false)
const hovered = ref(false)
const focused = ref(false)
const paused = ref(false)
const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(hover: none), (pointer: coarse)').matches

const artwork = {
  ok_ambok: OkAmbok,
  boat_racing: LongBoatRace,
  floating_lanterns: FloatingLanterns,
  moon_salutation: MoonSalutation,
}

// Hover/focus flips on pointer devices; tap toggles on touch screens.
const turned = computed(() => flipped.value || (!isTouch && (hovered.value || focused.value)))
const name = computed(() => t(`traditions.items.${props.item.id}.name`))
const short = computed(() => t(`traditions.items.${props.item.id}.short`))
const detail = computed(() => t(`traditions.items.${props.item.id}.detail`))
const scene = computed(() => artwork[props.item.id] || MoonSalutation)

function onVisibility() {
  paused.value = document.hidden
}
onMounted(() => {
  paused.value = document.hidden
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => document.removeEventListener('visibilitychange', onVisibility))
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
      <div class="flip-face flip-front card-lift flex flex-col items-center rounded-2xl p-4 text-center">
        <div
          class="relative h-32 w-full shrink-0 overflow-hidden rounded-xl border border-gold/25 sm:h-36"
          :class="{ 'scene-paused': paused }"
        >
          <component :is="scene" art />
        </div>
        <h3 class="mt-4 font-display text-2xl text-ivory">{{ name }}</h3>
        <p class="mt-2 text-sm leading-6 text-gold-light/85">{{ short }}</p>
        <p class="mt-auto text-xs tracking-wide text-muted/80">{{ t('traditions.flipHint') }}</p>
      </div>

      <div class="flip-face flip-back card-lift flex flex-col justify-center rounded-2xl p-7 text-center">
        <p class="eyebrow">{{ t('home.traditions.title') }}</p>
        <h3 class="mt-3 font-display text-2xl text-gold-light">{{ name }}</h3>
        <p class="mt-4 text-sm leading-7 text-ivory/85">{{ detail }}</p>
      </div>
    </div>
  </button>
</template>
