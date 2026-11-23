import { createRouter, createWebHashHistory } from 'vue-router'

// Route views are lazy-loaded so the initial bundle stays small.
const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { titleKey: 'home.titleLine1' } },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { titleKey: 'about.title' } },
  { path: '/schedule', name: 'schedule', component: () => import('../views/ScheduleView.vue'), meta: { titleKey: 'schedule.title' } },
  {
    path: '/destinations',
    name: 'destinations',
    component: () => import('../views/DestinationsView.vue'),
    meta: { titleKey: 'destinations.title' },
  },
  {
    path: '/destinations/:id',
    name: 'destination-detail',
    component: () => import('../views/DestinationDetail.vue'),
    meta: { titleKey: 'destinations.title' },
  },
  { path: '/gallery', name: 'gallery', component: () => import('../views/GalleryView.vue'), meta: { titleKey: 'gallery.title' } },
  { path: '/tips', name: 'tips', component: () => import('../views/TipsView.vue'), meta: { titleKey: 'tips.title' } },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { titleKey: 'dashboard.title' },
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { titleKey: 'notFound.title' } },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash && !to.hash.startsWith('#/')) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

const REF_KEY = 'bon-om-touk:ref'

/** Remember a campaign link (?ref=facebook) for the duration of the session. */
export function getCampaignRef() {
  try {
    return sessionStorage.getItem(REF_KEY) || ''
  } catch {
    return ''
  }
}

/**
 * Privacy-friendly GoatCounter analytics. Nothing is loaded or sent when
 * VITE_GOATCOUNTER_CODE is not configured.
 */
export function initAnalytics(appRouter) {
  const code = (import.meta.env.VITE_GOATCOUNTER_CODE || '').trim()
  if (!code) return

  try {
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (ref) sessionStorage.setItem(REF_KEY, ref.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48))
  } catch {
    // Ignore blocked storage; analytics still works without a campaign label.
  }

  let ready = false
  const pending = []

  function send(options) {
    if (ready && typeof window.goatcounter?.count === 'function') {
      window.goatcounter.count(options)
    } else {
      pending.push(options)
    }
  }

  window.goatcounter = window.goatcounter || {}
  window.goatcounter.no_onload = true

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://gc.zgo.at/count.js'
  script.setAttribute('data-goatcounter', `https://${code}.goatcounter.com/count`)
  script.setAttribute('data-goatcounter-settings', JSON.stringify({ no_onload: true }))
  script.onload = () => {
    ready = true
    while (pending.length) send(pending.shift())
    // The settings flag suppresses the automatic pageview; count the first route.
    send({
      path: window.location.pathname + window.location.hash,
      title: document.title,
      referrer: getCampaignRef() || document.referrer || '',
    })
  }
  document.head.appendChild(script)

  appRouter.afterEach((to) => {
    const ref = getCampaignRef()
    const path = to.fullPath
    send({
      path,
      title: ref ? `${document.title} · ref:${ref}` : document.title,
      referrer: ref || document.referrer || '',
    })
  })
}

export default router
