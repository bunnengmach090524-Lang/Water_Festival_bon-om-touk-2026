<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavBar from './components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'
import ScrollProgress from './components/effects/ScrollProgress.vue'
import BackdropScene from './components/scenes/BackdropScene.vue'
import MusicPlayer from './components/media/MusicPlayer.vue'
import { applyLangAttributes } from './i18n'

const route = useRoute()
const { locale, t } = useI18n()

watch(
  [locale, () => route.meta.titleKey],
  () => {
    applyLangAttributes(locale.value)
    const key = route.meta.titleKey
    document.title = key && route.name !== 'home' ? `${t(key)} · ${t('meta.siteName')}` : t('meta.title')
  },
  { immediate: true },
)

function focusMain() {
  document.getElementById('main-content')?.focus()
}
</script>

<template>
  <a href="#main-content" class="skip-link" @click.prevent="focusMain">
    {{ t('a11y.skipToContent') }}
  </a>

  <BackdropScene />
  <ScrollProgress />
  <NavBar />

  <main id="main-content" class="relative z-10 min-h-[60vh] outline-none" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </main>

  <Footer />
  <MusicPlayer />
</template>
