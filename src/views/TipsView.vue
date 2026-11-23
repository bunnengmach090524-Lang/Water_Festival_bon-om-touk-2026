<script setup>
import { useI18n } from 'vue-i18n'
import WaveDivider from '../components/effects/WaveDivider.vue'

const { t, tm } = useI18n()
const sectionIds = ['transport', 'crowds', 'waterSafety', 'etiquette', 'food', 'weatherSafety', 'scams']
</script>

<template>
  <div>
    <header class="relative overflow-hidden border-b border-gold/15 py-20 text-center sm:py-28">
      <div class="page-header-glow pointer-events-none absolute inset-0 opacity-35"></div>
      <div class="site-container relative">
        <p v-reveal class="eyebrow">{{ t('tips.eyebrow') }}</p>
        <h1 v-reveal="80" class="section-title mx-auto mt-5">{{ t('tips.title') }}</h1>
        <p v-reveal="150" class="lead mx-auto mt-6 max-w-3xl">{{ t('tips.subtitle') }}</p>
      </div>
      <WaveDivider class="absolute inset-x-0 bottom-0" />
    </header>

    <section class="section-shell">
      <div class="site-container mx-auto max-w-5xl">
        <div v-reveal class="rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm leading-7 text-ivory/90">
          {{ t('tips.note') }}
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <article
            v-for="(id, index) in sectionIds"
            :key="id"
            v-reveal="(index % 2) * 90"
            class="card-lift rounded-2xl p-6 sm:p-8"
          >
            <div class="flex items-center gap-4">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-lg text-gold-light">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <h2 class="font-display text-2xl text-ivory sm:text-3xl">{{ t(`tips.sections.${id}.title`) }}</h2>
            </div>
            <ul class="mt-6 space-y-3">
              <li v-for="(item, itemIndex) in tm(`tips.sections.${id}.items`)" :key="itemIndex" class="flex gap-3 text-sm leading-7 text-muted">
                <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
