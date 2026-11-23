<script setup>
import { useI18n } from 'vue-i18n'
import WaveDivider from '../components/effects/WaveDivider.vue'

const { t, tm } = useI18n()
</script>

<template>
  <div>
    <header class="relative overflow-hidden border-b border-gold/15 py-20 text-center sm:py-28">
      <div class="pointer-events-none absolute inset-0 opacity-40" style="background: radial-gradient(circle at 50% 0%, rgba(212, 165, 72, 0.2), transparent 60%)"></div>
      <div class="site-container relative">
        <p v-reveal class="eyebrow">{{ t('about.eyebrow') }}</p>
        <h1 v-reveal="80" class="section-title mx-auto mt-5 max-w-4xl">{{ t('about.title') }}</h1>
        <p v-reveal="150" class="lead mx-auto mt-7 max-w-3xl">{{ t('about.lead') }}</p>
      </div>
      <WaveDivider class="absolute inset-x-0 bottom-0" />
    </header>

    <section v-reveal class="section-shell">
      <div class="site-container grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <p class="eyebrow">01</p>
          <h2 class="section-title mt-4">{{ t('about.river.title') }}</h2>
        </div>
        <div class="space-y-5">
          <p v-for="(paragraph, index) in tm('about.river.body')" :key="index" class="lead">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <section v-reveal class="section-shell bg-night/30">
      <div class="site-container grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <p class="eyebrow">02</p>
          <h2 class="section-title mt-4">{{ t('about.history.title') }}</h2>
        </div>
        <div class="space-y-5">
          <p v-for="(paragraph, index) in tm('about.history.body')" :key="index" class="lead">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <section v-reveal class="section-shell">
      <div class="site-container grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <p class="eyebrow">03</p>
          <h2 class="section-title mt-4">{{ t('about.traditions.title') }}</h2>
        </div>
        <div class="space-y-5">
          <p v-for="(paragraph, index) in tm('about.traditions.body')" :key="index" class="lead">{{ paragraph }}</p>
          <div class="flex flex-wrap gap-3 pt-4">
            <RouterLink to="/destinations" class="btn btn-primary">{{ t('about.ctaPlaces') }}</RouterLink>
            <RouterLink to="/schedule" class="btn btn-ghost">{{ t('about.ctaSchedule') }}</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
