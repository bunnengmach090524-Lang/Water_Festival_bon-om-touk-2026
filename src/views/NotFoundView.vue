<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="site-container flex min-h-[65vh] flex-col items-center justify-center py-24 text-center">
    <p class="font-display text-8xl text-gold/50 sm:text-9xl">{{ t('notFound.code') }}</p>
    <h1 v-reveal class="section-title mt-4">{{ t('notFound.title') }}</h1>
    <p v-reveal="80" class="lead mx-auto mt-6 max-w-xl">{{ t('notFound.body') }}</p>
    <RouterLink to="/" class="btn btn-primary mt-9">{{ t('notFound.cta') }}</RouterLink>
  </section>
</template>
