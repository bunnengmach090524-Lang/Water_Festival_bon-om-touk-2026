<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  page: { type: Number, required: true },
  total: { type: Number, required: true },
  perPage: { type: Number, default: 9 },
})
const emit = defineEmits(['update:page'])
const { t } = useI18n()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))
const pages = computed(() => Array.from({ length: pageCount.value }, (_, index) => index + 1))

function go(target) {
  if (target < 1 || target > pageCount.value || target === props.page) return
  emit('update:page', target)
}
</script>

<template>
  <nav
    v-if="pageCount > 1"
    class="pagination mt-8 flex flex-wrap items-center justify-center gap-2"
    :aria-label="t('pagination.label')"
  >
    <button
      type="button"
      class="pagination-button min-h-11 rounded-full border border-gold/30 bg-[var(--glass-bg)] px-4 text-sm font-medium text-ivory/90 transition-colors duration-300"
      :class="page === 1 ? 'cursor-not-allowed opacity-40' : 'hover:border-gold/70 hover:text-gold-light'"
      :disabled="page === 1"
      :aria-disabled="page === 1"
      @click="go(page - 1)"
    >
      {{ t('pagination.previous') }}
    </button>

    <button
      v-for="number in pages"
      :key="number"
      type="button"
      class="pagination-button min-h-11 min-w-11 rounded-full border px-3 text-sm font-semibold transition-colors duration-300"
      :class="number === page ? 'border-gold bg-gold/20 text-gold-light' : 'border-gold/25 bg-[var(--glass-bg)] text-ivory/75 hover:border-gold/60 hover:text-gold-light'"
      :aria-current="number === page ? 'page' : undefined"
      @click="go(number)"
    >
      {{ number }}
    </button>

    <button
      type="button"
      class="pagination-button min-h-11 rounded-full border border-gold/30 bg-[var(--glass-bg)] px-4 text-sm font-medium text-ivory/90 transition-colors duration-300"
      :class="page === pageCount ? 'cursor-not-allowed opacity-40' : 'hover:border-gold/70 hover:text-gold-light'"
      :disabled="page === pageCount"
      :aria-disabled="page === pageCount"
      @click="go(page + 1)"
    >
      {{ t('pagination.next') }}
    </button>

    <p class="w-full text-center text-xs text-muted" aria-live="polite">
      {{ t('pagination.page', { current: page, total: pageCount }) }}
    </p>
  </nav>
</template>
