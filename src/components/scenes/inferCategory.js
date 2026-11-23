/** Pick one of the five hand-drawn fallback illustrations for a media item. */
const CATEGORIES = ['river', 'temple', 'city', 'nature', 'food']

const RULES = [
  { category: 'food', pattern: /ambok|food|coconut|banana|durian|rice|market/i },
  { category: 'nature', pattern: /mountain|island|beach|nature|hill|sunset|kep/i },
  { category: 'temple', pattern: /temple|wat|pagoda|palace|angkor/i },
  { category: 'river', pattern: /river|water|koh|tonle|mekong|bridge|kampot|kratie|cham|village|boat|lantern/i },
  { category: 'city', pattern: /city|street|monument|roundabout|pub|diamond|sihanoukville|battambang/i },
]

export function inferCategory(publicId = '', hints = []) {
  const id = String(publicId || '').toLowerCase()
  for (const rule of RULES) {
    if (rule.pattern.test(id)) return rule.category
  }
  const list = Array.isArray(hints) ? hints : [hints]
  for (const hint of list) {
    const value = String(hint || '').toLowerCase()
    if (CATEGORIES.includes(value)) return value
    if (value === 'temples') return 'temple'
    if (value === 'night') return 'river'
  }
  return 'river'
}
