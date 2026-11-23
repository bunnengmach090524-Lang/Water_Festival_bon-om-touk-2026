<script setup>
/**
 * Floating music control. The track list is deliberately empty for now, so
 * this renders a soft "coming soon" button. Add a publicId to `music` in
 * src/data/media.js and the full player (no autoplay) becomes active.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { music } from '../../data/media'
import { audioUrl, hasCloudinary } from '../../composables/useCloudinary'

const { t } = useI18n()
const STORAGE_KEY = 'bon-om-touk:music'
const track = computed(() => music[0] || null)
const src = computed(() => (track.value ? audioUrl(track.value.publicId) : ''))
const available = computed(() => Boolean(track.value && hasCloudinary && src.value))

const audio = ref(null)
const playing = ref(false)
const muted = ref(false)
const volume = ref(0.7)
let fadeFrame = 0
let pauseTimer = 0

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  if (typeof saved.volume === 'number') volume.value = Math.min(1, Math.max(0, saved.volume))
  if (typeof saved.muted === 'boolean') muted.value = saved.muted
} catch {
  // Storage may be blocked; defaults still work.
}

watch([volume, muted], () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ volume: volume.value, muted: muted.value }))
  } catch {
    // Ignore blocked storage.
  }
  if (audio.value && playing.value) fadeTo(muted.value ? 0 : volume.value, 220)
})

function fadeTo(target, duration = 400) {
  cancelAnimationFrame(fadeFrame)
  const element = audio.value
  if (!element) return
  const from = element.volume
  const started = performance.now()
  function step(now) {
    const progress = Math.min(1, (now - started) / duration)
    element.volume = Math.min(1, Math.max(0, from + (target - from) * progress))
    if (progress < 1) fadeFrame = requestAnimationFrame(step)
  }
  fadeFrame = requestAnimationFrame(step)
}

async function play() {
  const element = audio.value
  if (!element) return
  clearTimeout(pauseTimer)
  element.volume = 0
  try {
    await element.play()
    playing.value = true
    fadeTo(muted.value ? 0 : volume.value, 520)
  } catch {
    playing.value = false
  }
}

function pause() {
  if (!audio.value) return
  fadeTo(0, 320)
  clearTimeout(pauseTimer)
  pauseTimer = window.setTimeout(() => {
    audio.value?.pause()
    playing.value = false
  }, 330)
}

function toggle() {
  if (!available.value) return
  if (playing.value) pause()
  else play()
}

function toggleMute() {
  muted.value = !muted.value
}

function onVisibility() {
  if (document.hidden && playing.value) pause()
}

const buttonLabel = computed(() => {
  if (!available.value) return t('music.comingSoon')
  return playing.value ? t('music.pause') : t('music.play')
})
const tooltip = computed(() => {
  if (!available.value) return t('music.comingSoon')
  const title = track.value?.titleKey ? t(track.value.titleKey) : t('music.nowPlaying')
  return `${title} · ${buttonLabel.value}`
})

onMounted(() => document.addEventListener('visibilitychange', onVisibility))
onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', onVisibility)
  cancelAnimationFrame(fadeFrame)
  clearTimeout(pauseTimer)
  audio.value?.pause()
})
</script>

<template>
  <div
    class="music-player fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[calc(1rem+env(safe-area-inset-left))] z-40 flex items-center gap-2"
  >
    <div
      class="music-dock flex items-center gap-1.5 rounded-full border border-gold/35 bg-[var(--glass-bg)] p-1.5 shadow-[0_6px_24px_color-mix(in_srgb,var(--color-gold)_22%,transparent)] backdrop-blur-md"
    >
      <audio
        v-if="available"
        ref="audio"
        :src="src"
        loop
        preload="none"
        :aria-label="track?.titleKey ? t(track.titleKey) : undefined"
      ></audio>

      <button
        type="button"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/45 text-gold-light transition duration-300"
        :class="
          available
            ? 'bg-gold/15 shadow-[0_0_18px_color-mix(in_srgb,var(--color-gold)_35%,transparent)] hover:bg-gold/25'
            : 'cursor-not-allowed bg-[var(--glass-bg)] text-gold-light/55'
        "
        :disabled="!available"
        :aria-disabled="!available"
        :aria-label="buttonLabel"
        :title="tooltip"
        @click="toggle"
      >
        <!-- Equalizer bars animate only while a track is playing. -->
        <span v-if="playing" class="eq-bars flex h-5 items-end gap-[3px]" aria-hidden="true">
          <span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span>
        </span>
        <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
          <path d="M9 18V6l10-2v12" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
        </svg>
      </button>

      <template v-if="available">
        <button
          type="button"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gold-light transition hover:bg-gold/15"
          :aria-label="muted ? t('music.unmute') : t('music.mute')"
          :title="muted ? t('music.unmute') : t('music.mute')"
          @click="toggleMute"
        >
          <svg v-if="muted" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <path d="M4 9h4l5-4v14l-5-4H4V9Z" stroke-linejoin="round" />
            <path d="m17 9 4 6m0-6-4 6" stroke-linecap="round" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <path d="M4 9h4l5-4v14l-5-4H4V9Z" stroke-linejoin="round" />
            <path d="M16 9a4 4 0 0 1 0 6m2.5-8.5a7 7 0 0 1 0 11" stroke-linecap="round" />
          </svg>
        </button>
        <input
          v-model.number="volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          class="h-9 w-20 cursor-pointer accent-[var(--color-gold-light)] sm:w-24"
          :aria-label="t('music.volume')"
          :title="t('music.volume')"
        />
      </template>

      <span class="sr-only" aria-live="polite">{{ available && playing ? t('music.nowPlaying') : '' }}</span>
    </div>
  </div>
</template>

<style scoped>
.eq-bar {
  width: 3px;
  height: 100%;
  border-radius: 2px;
  background: currentColor;
  transform-origin: 50% 100%;
  animation: eq-bounce 0.85s ease-in-out infinite;
}
.eq-bar:nth-child(2) {
  animation-delay: -0.3s;
}
.eq-bar:nth-child(3) {
  animation-delay: -0.55s;
}
@keyframes eq-bounce {
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
}
@media (prefers-reduced-motion: reduce) {
  .eq-bar { animation: none; transform: scaleY(0.7); }
}
</style>
