<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LangSwitcher from './LangSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'

const { t } = useI18n()
const route = useRoute()
const open = ref(false)

const links = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/about', label: t('nav.about') },
  { to: '/schedule', label: t('nav.schedule') },
  { to: '/destinations', label: t('nav.destinations') },
  { to: '/gallery', label: t('nav.gallery') },
  { to: '/tips', label: t('nav.tips') },
])

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

watch(open, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})

function onKeydown(event) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="glass sticky top-0 z-50">
    <div class="site-container flex h-[var(--nav-height)] items-center justify-between gap-2 sm:gap-4">
      <RouterLink
        to="/"
        class="flex min-h-11 min-w-0 items-center gap-2 rounded-lg text-gold-light transition duration-300 hover:text-ivory sm:gap-3"
        :aria-label="t('meta.siteName')"
      >
        <svg viewBox="0 0 44 44" class="h-9 w-9 shrink-0" aria-hidden="true">
          <circle cx="22" cy="22" r="20" fill="currentColor" opacity="0.12" />
          <path
            d="M29 9a13 13 0 1 0 6 19A14 14 0 0 1 29 9Z"
            fill="currentColor"
          />
          <circle cx="10" cy="11" r="1" fill="currentColor" />
          <circle cx="36" cy="13" r="0.8" fill="currentColor" />
        </svg>
        <span class="truncate font-display text-lg leading-none tracking-wide sm:text-2xl">
          {{ t('meta.siteName') }}
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-5 xl:gap-7 lg:flex" :aria-label="t('a11y.mainNav')">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link">
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <LangSwitcher class="hidden sm:flex" />
        <ThemeToggle />
        <button
          type="button"
          class="flex min-h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold-light transition duration-300 hover:bg-gold/15 lg:hidden"
          :aria-label="open ? t('a11y.closeMenu') : t('a11y.openMenu')"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          @click="open = !open"
        >
          <svg v-if="!open" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <nav
        v-if="open"
        id="mobile-nav"
        class="border-t border-gold/20 bg-[var(--page-bg)] px-5 pb-8 pt-4 shadow-2xl lg:hidden"
        :aria-label="t('a11y.mainNav')"
      >
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex min-h-12 items-center border-b border-gold/10 text-base text-ivory/90 transition hover:text-gold-light"
          @click="open = false"
        >
          {{ link.label }}
        </RouterLink>
        <div class="mt-6 flex justify-center sm:hidden">
          <LangSwitcher />
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
