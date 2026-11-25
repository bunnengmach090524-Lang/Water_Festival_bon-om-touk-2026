const CATEGORIES = ['temple', 'river', 'city', 'nature', 'beach', 'floating', 'wildlife', 'food']

const RULES = [
  { category: 'food', pattern: /ambok|food|coconut|banana|durian|rice|market/i },
  { category: 'wildlife', pattern: /dolphin|kratie/i },
  { category: 'floating', pattern: /floating|stilt|tonle|villages/i },
  { category: 'beach', pattern: /beach|island|coast|kep|sihanouk/i },
  { category: 'temple', pattern: /temple|wat|pagoda|palace|angkor|bayon|banteay|nokor|prei|oudong|vihear|phnom/i },
  { category: 'nature', pattern: /mountain|waterfall|forest|kirirom|mondulkiri|yeak|cardamom|highland/i },
  { category: 'river', pattern: /river|water|lake|stream|bridge|kampot|cham|mekong|pursat|takeo/i },
  { category: 'city', pattern: /city|street|monument|roundabout|pub|diamond|town|independence|suong|samraong|pailin|rieng/i },
]

const ALIASES = {
  history: 'temple',
  heritage: 'temple',
  night: 'river',
  waterfall: 'nature',
  mountain: 'nature',
  lake: 'nature',
  craft: 'city',
  town: 'city',
  island: 'beach',
  coast: 'beach',
  dolphin: 'wildlife',
}

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

export function inferCategory(publicId = '', hints = []) {
  const list = Array.isArray(hints) ? hints : [hints]
  for (const hint of list) {
    const value = normalize(hint)
    if (CATEGORIES.includes(value)) return value
    if (ALIASES[value]) return ALIASES[value]
  }

  const id = normalize(publicId)
  for (const rule of RULES) {
    if (rule.pattern.test(id)) return rule.category
  }
  return 'river'
}
