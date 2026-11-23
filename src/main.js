import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import i18n, { applyLangAttributes } from './i18n'
import router, { initAnalytics } from './router'
import { revealDirective } from './composables/useReveal'
import { tiltDirective } from './composables/useTilt'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.directive('reveal', revealDirective)
app.directive('tilt', tiltDirective)

applyLangAttributes(i18n.global.locale.value)
initAnalytics(router)

app.mount('#app')
