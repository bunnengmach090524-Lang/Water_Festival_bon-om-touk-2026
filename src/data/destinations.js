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

const PREFIX = ''
const image = (slug) => `bon-om-touk/places/${slug}`
const video = (slug) => `bon-om-touk/video/${slug}`
const realImage = (publicId) => `${PREFIX}${publicId}`
const defaultEvent = 'destinations.festivalEvents.default'

function place(id, province, coords, imagePublicId, tags, highlightKeys, bestTimeKey, gettingThereKey, options = {}) {
  const prefix = `destinations.items.${id}`
  const galleryPublicIds = Array.isArray(options.galleryPublicIds) ? options.galleryPublicIds.map(realImage) : null
  const galleryCount = galleryPublicIds
    ? Math.min(4, galleryPublicIds.length)
    : Math.max(0, Math.min(4, Number(options.galleryCount ?? 4)))
  const gallery = Array.from({ length: galleryCount }, (_, index) => ({
    publicId: galleryPublicIds ? galleryPublicIds[index] : `bon-om-touk/places/${id}-${String(index + 1).padStart(2, '0')}`,
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
    imageCredit: options.imageCredit || '',
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
  place('pp_riverside', 'phnomPenh', { lat: 11.56, lng: 104.93 }, realImage('phnom-penh-riverfront'), ['river', 'city', 'night'], highlight.river, time.evening, getting.central, { videoPublicId: video('phnom-penh-riverside'), galleryPublicIds: [] }),
  place('pp_royal_palace', 'phnomPenh', { lat: 11.555, lng: 104.931 }, realImage('royal-palace-phnom-penh'), ['temple', 'city'], highlight.heritage, time.morningLate, getting.shortTuk, { galleryPublicIds: [] }),
  place('pp_wat_phnom', 'phnomPenh', { lat: 11.572, lng: 104.926 }, realImage('wat-phnom-01'), ['temple', 'city'], highlight.heritage, time.morningLate, getting.central, { galleryPublicIds: ['wat-phnom-02', 'wat-phnom-03'] }),
  place('pp_independence_monument', 'phnomPenh', { lat: 11.551, lng: 104.925 }, realImage('independence-monument-phnom-penh-01'), ['city', 'night'], highlight.town, time.evening, getting.shortTuk, { galleryPublicIds: ['independence-monument-phnom-penh-02', 'independence-monument-phnom-penh-03', 'independence-monument-phnom-penh-04'] }),
  place('pp_koh_pich', 'phnomPenh', { lat: 11.525, lng: 104.934 }, realImage('koh-pich-diamond-island-01'), ['river', 'city', 'night'], highlight.town, time.sunset, getting.bridge, { galleryPublicIds: ['koh-pich-diamond-island-02', 'koh-pich-diamond-island-03', 'koh-pich-diamond-island-04', 'koh-pich-diamond-island-05'] }),

  place('sr_angkor_wat', 'siemReap', { lat: 13.4125, lng: 103.867 }, realImage('angkor-wat-01'), ['temple', 'night'], highlight.heritage, time.sunrise, getting.roadLocal, { galleryPublicIds: [] }),
  place('sr_pub_street', 'siemReap', { lat: 13.363, lng: 103.858 }, realImage('pub-street-siem-reap-night-01'), ['city', 'night'], highlight.town, time.evening, getting.central, { galleryPublicIds: ['pub-street-siem-reap-night-02', 'pub-street-siem-reap-night-03', 'pub-street-siem-reap-night-04', 'pub-street-siem-reap-night-05'] }),
  place('sr_river', 'siemReap', { lat: 13.364, lng: 103.856 }, realImage('siem-reap-river-01'), ['river', 'city', 'night'], highlight.river, time.evening, getting.central, { galleryPublicIds: ['siem-reap-river-02', 'siem-reap-river-03', 'siem-reap-river-04', 'siem-reap-river-05'] }),
  place('sr_floating_villages', 'siemReap', { lat: 13.25, lng: 103.8 }, realImage('tonle-sap-floating-village-01'), ['floating', 'river', 'night'], ['destinations.highlights.localLife', 'destinations.highlights.boats', 'destinations.highlights.waterfrontWalk'], time.daylight, getting.roadBoat, { galleryPublicIds: ['tonle-sap-floating-village-02', 'tonle-sap-floating-village-03', 'tonle-sap-floating-village-04', 'tonle-sap-floating-village-05'] }),
  place('sr_bayon', 'siemReap', { lat: 13.4436, lng: 103.8677 }, realImage('bayon-temple-01'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal, { galleryPublicIds: ['bayon-temple-02', 'bayon-temple-03', 'bayon-temple-04', 'bayon-temple-05'] }),

  place('kp_riverside', 'kampot', { lat: 10.609, lng: 104.18 }, realImage('kampot-river-01'), ['river', 'night'], highlight.river, time.sunset, getting.central, { videoPublicId: video('kampot-riverside'), galleryPublicIds: [] }),
  place('kp_durian_roundabout', 'kampot', { lat: 10.61, lng: 104.181 }, realImage('durian-roundabout-kampot-01'), ['city'], highlight.town, time.anyDay, getting.central, { galleryPublicIds: ['durian-roundabout-kampot-02', 'durian-roundabout-kampot-03', 'durian-roundabout-kampot-04', 'durian-roundabout-kampot-05'] }),
  place('kp_bokor', 'kampot', { lat: 10.61, lng: 104.02 }, realImage('bokor-mountain-01'), ['temple', 'night'], highlight.nature, time.coolMorning, getting.roadLocal, { galleryPublicIds: ['bokor-mountain-02', 'bokor-mountain-03', 'bokor-mountain-04', 'bokor-mountain-05'] }),
  place('kp_hand_bridge', 'kampot', { lat: 10.605, lng: 104.175 }, realImage('kampot-hand-bridge-01'), ['river', 'night'], highlight.river, time.sunset, getting.shortTuk, { galleryPublicIds: ['kampot-hand-bridge-02', 'kampot-hand-bridge-03', 'kampot-hand-bridge-04'] }),

  place('more_kep', 'kep', { lat: 10.48, lng: 104.18 }, realImage('kep-crab-market-01'), ['beach', 'city'], highlight.coast, time.daylight, getting.road, { galleryPublicIds: ['kep-crab-market-02', 'kep-crab-market-03'] }),
  place('more_battambang', 'battambang', { lat: 13.1, lng: 103.12 }, realImage('battambang-bamboo-train-02'), ['river', 'temple'], highlight.town, time.morningLate, getting.roadFlight, { galleryPublicIds: ['battambang-bamboo-train-03', 'battambang-bamboo-train-01'] }),
  place('more_kampong_cham', 'kampongCham', { lat: 11.99, lng: 105.46 }, realImage('kampong-cham-mekong-01'), ['river'], highlight.river, time.sunset, getting.road, { galleryPublicIds: ['kampong-cham-mekong-02', 'kampong-cham-mekong-03'] }),
  place('more_kratie', 'kratie', { lat: 12.48, lng: 106.02 }, realImage('kratie-mekong-01'), ['wildlife', 'river'], highlight.river, time.morningLate, getting.road, { galleryPublicIds: ['kratie-mekong-03', 'kratie-mekong-04', 'kratie-mekong-05'] }),
  place('more_sihanoukville', 'preahSihanouk', { lat: 10.63, lng: 103.92 }, realImage('sihanoukville-beach-01'), ['beach', 'city'], highlight.coast, time.daylight, getting.roadFlight, { galleryPublicIds: ['sihanoukville-beach-02', 'sihanoukville-beach-03', 'sihanoukville-beach-04', 'sihanoukville-beach-05'] }),

  place('bm_banteay_chhmar', 'banteayMeanchey', { lat: 14.339, lng: 102.984 }, realImage('banteay-chhmar-temple-01'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal, { galleryPublicIds: ['banteay-chhmar-temple-02', 'banteay-chhmar-temple-03', 'banteay-chhmar-temple-04', 'banteay-chhmar-temple-05'], festivalEventKey: 'destinations.festivalEvents.banteayMeanchey' }),
  place('bm_sreisophoan', 'banteayMeanchey', { lat: 13.557, lng: 102.974 }, realImage('sisophon-stream-01'), ['river', 'night'], highlight.river, time.evening, getting.central, { videoPublicId: video('sreisophoan-stream'), galleryPublicIds: ['sisophon-stream-02'], festivalEventKey: 'destinations.festivalEvents.banteayMeanchey' }),
  place('kc_wat_nokor', 'kampongCham', { lat: 11.986, lng: 105.462 }, realImage('wat-nokor-01'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal, { galleryPublicIds: ['wat-nokor-02', 'wat-nokor-03', 'wat-nokor-04', 'wat-nokor-05'] }),
  place('kch_floating_villages', 'kampongChhnang', { lat: 12.262, lng: 104.583 }, realImage('kampong-chhnang-floating-village-01'), ['floating', 'river', 'craft'], highlight.river, time.daylight, getting.roadBoat, { galleryPublicIds: ['kampong-chhnang-floating-village-02', 'kampong-chhnang-floating-village-03'] }),
  place('ksp_kirirom', 'kampongSpeu', { lat: 11.31, lng: 103.075 }, realImage('kirirom-national-park-01'), ['nature'], highlight.nature, time.coolMorning, getting.roadLocal, { galleryPublicIds: ['kirirom-national-park-02', 'kirirom-national-park-03', 'kirirom-national-park-04', 'kirirom-national-park-05'] }),
  place('kt_sambor_prei_kuk', 'kampongThom', { lat: 12.883, lng: 104.863 }, realImage('sambor-prei-kuk-01'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal, { galleryPublicIds: ['sambor-prei-kuk-02', 'sambor-prei-kuk-03', 'sambor-prei-kuk-04'] }),
  place('kandal_oudong', 'kandal', { lat: 11.777, lng: 104.824 }, realImage('oudong-01'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal, { galleryPublicIds: ['oudong-02', 'oudong-03', 'oudong-04'] }),
  place('kk_cardamom', 'kohKong', { lat: 11.55, lng: 103.35 }, realImage('cardamom-mountains-01'), ['nature'], highlight.nature, time.coolMorning, getting.roadLocal, { galleryPublicIds: ['cardamom-mountains-02'] }),
  place('mondulkiri_highlands', 'mondulkiri', { lat: 12.456, lng: 107.197 }, realImage('mondulkiri-highlands-01'), ['nature'], highlight.nature, time.coolMorning, getting.roadLocal, { galleryPublicIds: ['mondulkiri-highlands-02', 'mondulkiri-highlands-03'] }),
  place('om_samraong', 'oddarMeanchey', { lat: 14.535, lng: 103.409 }, realImage('samraong-oddar-meanchey-01'), ['town'], highlight.town, time.morningLate, getting.road, { galleryPublicIds: ['samraong-oddar-meanchey-02'] }),
  place('pailin_gem_town', 'pailin', { lat: 12.855, lng: 102.596 }, realImage('pailin-town-01'), ['town'], highlight.town, time.morningLate, getting.road, { galleryPublicIds: ['pailin-town-02', 'pailin-town-03'] }),
  place('pv_preah_vihear', 'preahVihear', { lat: 14.391, lng: 104.674 }, realImage('preah-vihear-temple-01'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal, { galleryPublicIds: ['preah-vihear-temple-02', 'preah-vihear-temple-03'] }),
  place('pvv_ba_phnom', 'preyVeng', { lat: 11.302, lng: 105.792 }, realImage('ba-phnom-01'), ['temple', 'history'], highlight.heritage, time.morningLate, getting.roadLocal, { galleryPublicIds: ['ba-phnom-02'] }),
  place('pursat_floating_villages', 'pursat', { lat: 12.558, lng: 103.916 }, realImage('pursat-floating-village-01'), ['floating', 'river'], highlight.river, time.daylight, getting.roadBoat, { galleryPublicIds: ['pursat-floating-village-02'] }),
  place('rk_yeak_laom', 'ratanakKiri', { lat: 13.04, lng: 107.34 }, realImage('yeak-laom-lake-01'), ['nature', 'lake'], highlight.nature, time.daylight, getting.roadLocal, { galleryPublicIds: ['yeak-laom-lake-02', 'yeak-laom-lake-03'] }),
  place('st_stung_treng', 'stungTreng', { lat: 13.528, lng: 105.975 }, realImage('stung-treng-mekong-01'), ['river'], highlight.river, time.sunset, getting.road, { galleryPublicIds: ['stung-treng-mekong-02'] }),
  place('svay_svay_rieng', 'svayRieng', { lat: 11.331, lng: 105.811 }, realImage('svay-rieng-town-01'), ['town'], highlight.town, time.morningLate, getting.road, { galleryPublicIds: ['svay-rieng-town-02'] }),
  place('tk_takeo_lake', 'takeo', { lat: 10.58, lng: 104.83 }, realImage('takeo-lake-doun-kaev-01'), ['lake', 'town'], highlight.town, time.sunset, getting.road, { videoPublicId: video('takeo-lake'), galleryPublicIds: ['takeo-lake-doun-kaev-02', 'takeo-lake-doun-kaev-03'], reportKey: 'destinations.items.tk_takeo_lake.report' }),
  place('tb_suong', 'tboungKhmum', { lat: 12.016, lng: 105.814 }, realImage('suong-tboung-khmum-01'), ['town'], highlight.town, time.morningLate, getting.road, { galleryPublicIds: ['suong-tboung-khmum-02', 'suong-tboung-khmum-03', 'suong-tboung-khmum-04', 'suong-tboung-khmum-05'] }),
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
