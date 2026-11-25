export const destinationRegions = ['all', 'phnomPenh', 'siemReap', 'kampot', 'more']

export const provinces = [
  'phnomPenh',
  'banteayMeanchey',
  'battambang',
  'kampongCham',
  'kampongChhnang',
  'kampongSpeu',
  'kampongThom',
  'kampot',
  'kandal',
  'kep',
  'kohKong',
  'kratie',
  'mondulkiri',
  'oddarMeanchey',
  'pailin',
  'preahSihanouk',
  'preahVihear',
  'preyVeng',
  'pursat',
  'ratanakKiri',
  'siemReap',
  'stungTreng',
  'svayRieng',
  'takeo',
  'tboungKhmum',
]

const regionByProvince = {
  phnomPenh: 'phnomPenh',
  banteayMeanchey: 'more',
  battambang: 'more',
  kampongCham: 'more',
  kampongChhnang: 'more',
  kampongSpeu: 'more',
  kampongThom: 'more',
  kampot: 'kampot',
  kandal: 'more',
  kep: 'more',
  kohKong: 'more',
  kratie: 'more',
  mondulkiri: 'more',
  oddarMeanchey: 'more',
  pailin: 'more',
  preahSihanouk: 'more',
  preahVihear: 'more',
  preyVeng: 'more',
  pursat: 'more',
  ratanakKiri: 'more',
  siemReap: 'siemReap',
  stungTreng: 'more',
  svayRieng: 'more',
  takeo: 'more',
  tboungKhmum: 'more',
}

const highlight = {
  river: [
    'destinations.highlights.riverViews',
    'destinations.highlights.boats',
    'destinations.highlights.waterfrontWalk',
  ],
  town: [
    'destinations.highlights.localMarkets',
    'destinations.highlights.localLife',
    'destinations.highlights.eveningLight',
  ],
  heritage: [
    'destinations.highlights.khmerArchitecture',
    'destinations.highlights.carvedDetails',
    'destinations.highlights.historicSetting',
  ],
  nature: [
    'destinations.highlights.wideViews',
    'destinations.highlights.natureTrails',
    'destinations.highlights.highlandAir',
  ],
  coast: [
    'destinations.highlights.coastalViews',
    'destinations.highlights.seafood',
    'destinations.highlights.islandViews',
  ],
}

const time = {
  morningLate: 'destinations.times.morningLate',
  sunrise: 'destinations.times.sunrise',
  daylight: 'destinations.times.daylight',
  evening: 'destinations.times.evening',
  sunset: 'destinations.times.sunset',
  anyDay: 'destinations.times.anyDay',
  coolMorning: 'destinations.times.coolMorning',
}

const getting = {
  road: 'destinations.gettingThere.road',
  roadLocal: 'destinations.gettingThere.roadLocal',
  central: 'destinations.gettingThere.central',
  roadFlight: 'destinations.gettingThere.roadFlight',
  roadBoat: 'destinations.gettingThere.roadBoat',
  bridge: 'destinations.gettingThere.bridge',
  shortTuk: 'destinations.gettingThere.shortTuk',
}

const image = (slug) => `bon-om-touk/places/${slug}`
const video = (slug) => `bon-om-touk/video/${slug}`
const defaultEvent = 'destinations.festivalEvents.default'

function place(id, province, coords, imagePublicId, tags, highlightKeys, bestTimeKey, gettingThereKey, options = {}) {
  const prefix = `destinations.items.${id}`
  const galleryCount = Math.max(0, Math.min(6, Number(options.galleryCount ?? 4)))
  const gallery = Array.from({ length: galleryCount }, (_, index) => ({
    publicId: `bon-om-touk/places/${id}-${String(index + 1).padStart(2, '0')}`,
  }))
  return {
    id,
    province,
    region: regionByProvince[province] || 'more',
    nameKey: `${prefix}.name`,
    descKey: `${prefix}.desc`,
    highlightKeys,
    bestTimeKey,
    gettingThereKey,
    coords,
    imagePublicId,
    gallery,
    videoPublicId: options.videoPublicId || '',
    youtubeId: options.youtubeId || '',
    videoCredit: options.videoCredit || 'destinations.detail.videoCredit',
    festivalEventKey: options.festivalEventKey || defaultEvent,
    reportKey: options.reportKey || '',
    tags,
  }
}

export const destinations = [
  place('pp_riverside', 'phnomPenh', { lat: 11.56, lng: 104.93 }, image('phnom-penh-riverside'), ['river', 'city', 'night'], highlight.river, time.evening, getting.central, { videoPublicId: video('phnom-penh-riverside') }),
  place('pp_royal_palace', 'phnomPenh', { lat: 11.555, lng: 104.931 }, image('royal-palace'), ['temple', 'city'], highlight.heritage, time.morningLate, getting.shortTuk),
  place('pp_wat_phnom', 'phnomPenh', { lat: 11.572, lng: 104.926 }, image('wat-phnom'), ['temple', 'city'], highlight.heritage, time.morningLate, getting.central),
  place('pp_independence_monument', 'phnomPenh', { lat: 11.551, lng: 104.925 }, image('independence-monument'), ['city', 'night'], highlight.town, time.evening, getting.shortTuk),
  place('pp_koh_pich', 'phnomPenh', { lat: 11.525, lng: 104.934 }, image('koh-pich'), ['river', 'city', 'night'], highlight.town, time.sunset, getting.bridge),

  place('sr_angkor_wat', 'siemReap', { lat: 13.4125, lng: 103.867 }, image('angkor-wat'), ['temple', 'night'], highlight.heritage, time.sunrise, getting.roadLocal),
  place('sr_pub_street', 'siemReap', { lat: 13.363, lng: 103.858 }, image('pub-street'), ['city', 'night'], highlight.town, time.evening, getting.central),
  place('sr_river', 'siemReap', { lat: 13.364, lng: 103.856 }, image('siem-reap-river'), ['river', 'city', 'night'], highlight.river, time.evening, getting.central),
  place('sr_floating_villages', 'siemReap', { lat: 13.25, lng: 103.8 }, image('tonle-sap-villages'), ['floating', 'river', 'night'], ['destinations.highlights.localLife', 'destinations.highlights.boats', 'destinations.highlights.waterfrontWalk'], time.daylight, getting.roadBoat),
  place('sr_bayon', 'siemReap', { lat: 13.4436, lng: 103.8677 }, image('bayon'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal),

  place('kp_riverside', 'kampot', { lat: 10.609, lng: 104.18 }, image('kampot-riverside'), ['river', 'night'], highlight.river, time.sunset, getting.central, { videoPublicId: video('kampot-riverside') }),
  place('kp_durian_roundabout', 'kampot', { lat: 10.61, lng: 104.181 }, image('durian-roundabout'), ['city'], highlight.town, time.anyDay, getting.central),
  place('kp_bokor', 'kampot', { lat: 10.61, lng: 104.02 }, image('bokor-mountain'), ['temple', 'night'], highlight.nature, time.coolMorning, getting.roadLocal),
  place('kp_hand_bridge', 'kampot', { lat: 10.605, lng: 104.175 }, image('hand-viewing-bridge'), ['river', 'night'], highlight.river, time.sunset, getting.shortTuk),

  place('more_kep', 'kep', { lat: 10.48, lng: 104.18 }, image('kep'), ['beach', 'city'], highlight.coast, time.daylight, getting.road),
  place('more_battambang', 'battambang', { lat: 13.1, lng: 103.12 }, image('battambang'), ['river', 'temple'], highlight.town, time.morningLate, getting.roadFlight),
  place('more_kampong_cham', 'kampongCham', { lat: 11.99, lng: 105.46 }, image('kampong-cham'), ['river'], highlight.river, time.sunset, getting.road),
  place('more_kratie', 'kratie', { lat: 12.48, lng: 106.02 }, image('kratie'), ['wildlife', 'river'], highlight.river, time.morningLate, getting.road),
  place('more_sihanoukville', 'preahSihanouk', { lat: 10.63, lng: 103.92 }, image('sihanoukville'), ['beach', 'city'], highlight.coast, time.daylight, getting.roadFlight),

  place('bm_banteay_chhmar', 'banteayMeanchey', { lat: 14.339, lng: 102.984 }, image('banteay-chhmar'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal, { festivalEventKey: 'destinations.festivalEvents.banteayMeanchey' }),
  place('bm_sreisophoan', 'banteayMeanchey', { lat: 13.557, lng: 102.974 }, image('sreisophoan-stream'), ['river', 'night'], highlight.river, time.evening, getting.central, { videoPublicId: video('sreisophoan-stream'), festivalEventKey: 'destinations.festivalEvents.banteayMeanchey' }),
  place('kc_wat_nokor', 'kampongCham', { lat: 11.986, lng: 105.462 }, image('wat-nokor'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal),
  place('kch_floating_villages', 'kampongChhnang', { lat: 12.262, lng: 104.583 }, image('kampong-chhnang-villages'), ['floating', 'river', 'craft'], highlight.river, time.daylight, getting.roadBoat),
  place('ksp_kirirom', 'kampongSpeu', { lat: 11.31, lng: 103.075 }, image('kirirom'), ['nature'], highlight.nature, time.coolMorning, getting.roadLocal),
  place('kt_sambor_prei_kuk', 'kampongThom', { lat: 12.883, lng: 104.863 }, image('sambor-prei-kuk'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal),
  place('kandal_oudong', 'kandal', { lat: 11.777, lng: 104.824 }, image('oudong'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal),
  place('kk_cardamom', 'kohKong', { lat: 11.55, lng: 103.35 }, image('cardamom-mountains'), ['nature'], highlight.nature, time.coolMorning, getting.roadLocal),
  place('mondulkiri_highlands', 'mondulkiri', { lat: 12.456, lng: 107.197 }, image('mondulkiri-highlands'), ['nature'], highlight.nature, time.coolMorning, getting.roadLocal),
  place('om_samraong', 'oddarMeanchey', { lat: 14.535, lng: 103.409 }, image('samraong-town'), ['town'], highlight.town, time.morningLate, getting.road),
  place('pailin_gem_town', 'pailin', { lat: 12.855, lng: 102.596 }, image('pailin-town'), ['town'], highlight.town, time.morningLate, getting.road),
  place('pv_preah_vihear', 'preahVihear', { lat: 14.391, lng: 104.674 }, image('preah-vihear-temple'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal),
  place('pvv_ba_phnom', 'preyVeng', { lat: 11.302, lng: 105.792 }, image('ba-phnom'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal),
  place('pursat_floating_villages', 'pursat', { lat: 12.558, lng: 103.916 }, image('pursat-villages'), ['floating', 'river'], highlight.river, time.daylight, getting.roadBoat),
  place('rk_yeak_laom', 'ratanakKiri', { lat: 13.04, lng: 107.34 }, image('yeak-laom-lake'), ['nature', 'lake'], highlight.nature, time.daylight, getting.roadLocal),
  place('st_stung_treng', 'stungTreng', { lat: 13.528, lng: 105.975 }, image('stung-treng-river'), ['river'], highlight.river, time.sunset, getting.road),
  place('svay_svay_rieng', 'svayRieng', { lat: 11.331, lng: 105.811 }, image('svay-rieng-town'), ['town'], highlight.town, time.morningLate, getting.road),
  place('tk_takeo_lake', 'takeo', { lat: 10.58, lng: 104.83 }, image('takeo-lake'), ['lake', 'town'], highlight.town, time.sunset, getting.road, { videoPublicId: video('takeo-lake'), reportKey: 'destinations.items.tk_takeo_lake.report' }),
  place('tb_suong', 'tboungKhmum', { lat: 12.016, lng: 105.814 }, image('suong-town'), ['town'], highlight.town, time.morningLate, getting.road),
]

/** Google Maps search URL — no API key required. */
export function mapsUrl(destination) {
  const query = `${destination.coords.lat},${destination.coords.lng}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function relatedDestinations(destination, limit = 3) {
  if (!destination) return []
  return destinations
    .filter((item) => item.province === destination.province && item.id !== destination.id)
    .slice(0, limit)
}

export function destinationNavigation(destination) {
  const index = destinations.findIndex((item) => item.id === destination?.id)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: destinations[(index - 1 + destinations.length) % destinations.length],
    next: destinations[(index + 1) % destinations.length],
  }
}
