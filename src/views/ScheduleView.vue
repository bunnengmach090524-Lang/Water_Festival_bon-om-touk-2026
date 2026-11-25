<script setup>
import { useI18n } from 'vue-i18n'
import WaveDivider from '../components/effects/WaveDivider.vue'
import { festivalNights } from '../data/schedule'

const { t, tm } = useI18n()
</script>

<template>
  <div>
    <header class="relative overflow-hidden border-b border-gold/15 py-20 text-center sm:py-28">
      <div class="page-header-glow pointer-events-none absolute inset-0 opacity-35"></div>
      <div class="site-container relative">
        <p v-reveal class="eyebrow">{{ t('schedule.eyebrow') }}</p>
        <h1 v-reveal="80" class="section-title mx-auto mt-5">{{ t('schedule.title') }}</h1>
        <p v-reveal="150" class="lead mx-auto mt-6 max-w-3xl">{{ t('schedule.subtitle') }}</p>
      </div>
      <WaveDivider class="absolute inset-x-0 bottom-0" />
    </header>

    <section class="section-shell">
      <div class="site-container mx-auto max-w-4xl">
        <div v-reveal class="rounded-2xl border border-gold/35 bg-gold/10 px-5 py-4 text-sm leading-7 text-ivory/90 sm:px-7">
          <strong class="font-semibold text-gold-light">{{ t('common.verify') }}</strong>
          <span class="mt-1 block text-muted">{{ t('common.reportedVerify') }}</span>
        </div>

        <div v-reveal="80" class="mt-5 grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-gold/20 bg-night/60 p-5">
            <p class="text-sm leading-7 text-ivory/85">{{ t('schedule.phnomPenhNotice') }}</p>
            <p class="mt-3 text-xs font-semibold text-gold-light">{{ t('common.reportedVerify') }}</p>
          </div>
          <div class="rounded-2xl border border-gold/20 bg-night/60 p-5">
            <p class="text-sm leading-7 text-ivory/85">{{ t('schedule.fullMoonNote') }}</p>
          </div>
          <div class="rounded-2xl border border-gold/20 bg-night/60 p-5">
            <p class="text-sm leading-7 text-ivory/85">{{ t('schedule.royalSpan') }}</p>
          </div>
          <div class="rounded-2xl border border-gold/20 bg-night/60 p-5">
            <p class="text-sm leading-7 text-ivory/85">{{ t('schedule.holidayNote') }}</p>
          </div>
        </div>

        <ol class="relative mt-14 space-y-10 border-l border-gold/25 pl-7 sm:pl-10">
          <li v-for="(night, index) in festivalNights" :key="night.id" v-reveal="index * 100" class="relative">
            <span class="absolute -left-[2.15rem] top-2 h-3.5 w-3.5 rounded-full border-2 border-gold bg-midnight shadow-[0_0_14px_color-mix(in_srgb,var(--color-gold)_70%,transparent)] sm:-left-[3.15rem]"></span>
            <article class="card-lift rounded-2xl p-6 sm:p-8">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h2 class="font-display text-3xl text-gold-light sm:text-4xl">{{ t(`${night.key}.label`) }}</h2>
                <p class="text-sm text-muted">{{ t(`${night.key}.date`) }}</p>
              </div>
              <p class="mt-3 text-base leading-7 text-ivory/85">{{ t(`${night.key}.summary`) }}</p>

              <ul class="mt-6 space-y-4 border-t border-gold/15 pt-5">
                <li v-for="(event, eventIndex) in tm(`${night.key}.events`)" :key="eventIndex" class="grid gap-1 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-5">
                  <span class="text-xs font-semibold uppercase tracking-wider text-gold-light">{{ event.time }}</span>
                  <div>
                    <p class="font-semibold text-ivory">{{ event.title }}</p>
                    <p class="mt-1 text-sm leading-7 text-muted">{{ event.desc }}</p>
                  </div>
                </li>
              </ul>
            </article>
          </li>
        </ol>

        <p v-reveal class="mt-10 text-center text-sm text-muted">{{ t('common.verify') }}</p>
      </div>
    </section>
  </div>
</template>
