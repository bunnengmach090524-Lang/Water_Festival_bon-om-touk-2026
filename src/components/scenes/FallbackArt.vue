<script setup>
import { computed, useId } from 'vue'
import { inferCategory } from './inferCategory'

const props = defineProps({
  category: { type: [String, Array], default: 'river' },
  variant: { type: Number, default: 0 },
})

const variants = [
  { scale: 1, x: 0, y: 0, rotate: 0, origin: '50% 50%' },
  { scale: 1.1, x: -2, y: 1, rotate: -2, origin: '30% 40%' },
  { scale: 1.16, x: 2, y: -1, rotate: 2, origin: '70% 45%' },
  { scale: 1.08, x: -1, y: -2, rotate: -3, origin: '40% 60%' },
  { scale: 1.22, x: 1, y: 2, rotate: 3, origin: '65% 60%' },
  { scale: 1.14, x: -3, y: 0, rotate: 1, origin: '35% 50%' },
]

const uid = useId()
const category = computed(() => inferCategory('', props.category))
const variantStyle = computed(() => {
  const index = Math.abs(Number(props.variant) || 0) % variants.length
  const value = variants[index]
  return {
    backgroundColor: 'var(--scene-sky-1)',
    transform: `translate(${value.x}%, ${value.y}%) scale(${value.scale}) rotate(${value.rotate}deg)`,
    transformOrigin: value.origin,
  }
})
</script>

<template>
  <div class="scene-art" :style="variantStyle" aria-hidden="true">
    <svg v-if="category === 'temple'" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`temple-sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#temple-sky-${uid})`" />
      <circle cx="640" cy="92" r="46" fill="var(--scene-moon)" opacity=".9" />
      <g fill="var(--scene-ink)">
        <path d="M40 380V270h92v110Zm8-110 38-92 38 92ZM184 380V220h108v160l-18-24h-72Zm12-160 42-112 42 112ZM338 380V180h124v200l-20-26h-84Zm18-200 44-132 44 132ZM500 380V236h104v144l-16-22h-72Zm10-144 42-100 42 100ZM640 380V282h90v98l-14-18h-62Zm12-98 33-78 33 78Z" />
      </g>
      <g fill="var(--scene-gold)" opacity=".9">
        <path d="M86 158h8v62h-8zm148-52h8v82h-8zm166-32h10v110h-10zm160 46h8v72h-8zm102 36h8v48h-8z" />
        <path d="M82 220q10-16 20 0zm148-74q10-16 20 0zm166-42q12-18 24 0zm160 68q10-16 20 0z" fill="var(--scene-crimson)" />
      </g>
      <path d="M0 386h800v114H0Z" fill="var(--scene-water-1)" />
      <g fill="none" stroke="var(--scene-gold)" stroke-width="3" opacity=".55">
        <path d="M70 420q80-12 160 0t160 0" />
        <path d="M430 454q80-12 160 0t160 0" />
      </g>
    </svg>

    <svg v-else-if="category === 'river'" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`river-sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#river-sky-${uid})`" />
      <circle cx="590" cy="110" r="54" fill="var(--scene-moon)" opacity=".9" />
      <path d="M0 300q170-80 330-18t300-22q90-36 170 10v230H0Z" fill="var(--scene-hill)" opacity=".65" />
      <path d="M0 336h800v164H0Z" fill="var(--scene-water-2)" />
      <g fill="var(--scene-ink)">
        <path d="M150 356q80-28 160 0l-22 42H172Zm330 42q70-24 140 0l-20 38h-100Z" />
        <path d="M218 356v-94m0 12q-46-24-70 4 40-4 70 8 30-12 70-8-24-28-70-4" />
      </g>
      <g fill="var(--scene-glow)">
        <circle cx="92" cy="198" r="9" />
        <circle cx="382" cy="164" r="7" />
        <circle cx="690" cy="212" r="10" />
      </g>
      <g fill="var(--scene-crimson)" opacity=".85">
        <path d="M88 190q8-18 16 0l-8 16Zm378-26q8-18 16 0l-8 16Zm308 48q8-18 16 0l-8 16Z" />
      </g>
      <g fill="none" stroke="var(--scene-gold)" stroke-width="3" opacity=".5">
        <path d="M60 438q80-12 160 0t160 0" />
        <path d="M440 470q80-12 160 0t160 0" />
      </g>
    </svg>

    <svg v-else-if="category === 'city'" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`city-sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#city-sky-${uid})`" />
      <circle cx="650" cy="96" r="38" fill="var(--scene-moon)" opacity=".85" />
      <path d="M0 330h110V224h70v106h62V180h96v150h72V246h84v84h66V198h92v132h148v92H0Z" fill="var(--scene-hill)" />
      <g fill="var(--scene-glow)" opacity=".75">
        <path d="M132 244h12v18h-12zm12 40h12v18h-12zm84-72h14v20h-14zm14 44h14v20h-14zm92-30h14v20h-14zm14 42h14v20h-14zm120 4h14v20h-14zm14-42h14v20h-14zm136-12h14v20h-14zm14 44h14v20h-14z" />
      </g>
      <path d="M0 398h800v102H0Z" fill="var(--scene-water-1)" />
      <path d="M30 398q370-118 740 0" fill="none" stroke="var(--scene-gold)" stroke-width="7" />
      <g stroke="var(--scene-crimson)" stroke-width="3" opacity=".8">
        <path d="M160 368v52m120-80v80m120-104v104m120-80v80m120-52v52" />
      </g>
    </svg>

    <svg v-else-if="category === 'nature'" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`nature-sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#nature-sky-${uid})`" />
      <circle cx="602" cy="114" r="56" fill="var(--scene-glow)" opacity=".8" />
      <path d="M0 342 210 126l146 156 126-118 318 218v118H0Z" fill="var(--scene-hill)" />
      <path d="M0 360q180-58 360 0t440-20v160H0Z" fill="var(--scene-water-2)" />
      <path d="M468 154h60v144l-18 22h-24l-18-22Z" fill="var(--scene-gold)" opacity=".8" />
      <path d="M492 330h16l12 118h-40Z" fill="var(--scene-crimson)" opacity=".7" />
      <g fill="var(--scene-ink)">
        <path d="M112 356q-12-70 8-126 12 74 14 126Zm4-130q-50-22-76 8 46-4 76 6 30-10 76-6-26-30-76-8Z" />
        <path d="M700 350q-10-62 8-112 10 66 12 112Zm4-116q-42-18-64 8 38-4 64 6 26-10 64-6-22-26-64-8Z" />
      </g>
    </svg>

    <svg v-else-if="category === 'beach'" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`beach-sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#beach-sky-${uid})`" />
      <circle cx="614" cy="128" r="58" fill="var(--scene-glow)" />
      <path d="M0 300h800v200H0Z" fill="var(--scene-water-2)" />
      <path d="M0 392q200-60 400 0t400-18v126H0Z" fill="var(--scene-hill)" opacity=".75" />
      <path d="M512 286q92-88 188 4l-94 26Z" fill="var(--scene-ink)" />
      <path d="M0 462q200-40 400 4t400-12v46H0Z" fill="var(--scene-gold)" opacity=".55" />
      <g fill="var(--scene-crimson)" opacity=".8">
        <path d="M120 320q44-48 88 0H120Zm96 34q36-38 72 0h-72Z" />
      </g>
      <g fill="none" stroke="var(--scene-moon)" stroke-width="4" opacity=".7">
        <path d="M60 350q70-12 140 0t140 0" />
        <path d="M470 380q70-12 140 0t140 0" />
      </g>
    </svg>

    <svg v-else-if="category === 'floating'" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`floating-sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#floating-sky-${uid})`" />
      <circle cx="660" cy="100" r="42" fill="var(--scene-moon)" opacity=".9" />
      <path d="M0 330h800v170H0Z" fill="var(--scene-water-2)" />
      <g fill="var(--scene-ink)">
        <path d="M100 310h160v70H100Zm-14-24 94-54 94 54Zm300 58h180v70H386Zm-18-24 108-54 108 54Z" />
        <path d="M126 380v76m42-76v76m66-76v76m72-76v76m42-76v76m66-76v76" stroke="var(--scene-ink)" stroke-width="8" />
      </g>
      <g fill="var(--scene-glow)" opacity=".75">
        <path d="M150 320h22v22h-22zm44 0h22v22h-22zm222 32h26v24h-26zm42 0h26v24h-26z" />
      </g>
      <path d="M280 420q54-20 108 0l-16 28h-76Z" fill="var(--scene-crimson)" />
      <g fill="none" stroke="var(--scene-gold)" stroke-width="3" opacity=".5">
        <path d="M40 462q80-12 160 0t160 0" />
        <path d="M440 470q80-12 160 0t160 0" />
      </g>
    </svg>

    <svg v-else-if="category === 'wildlife'" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`wildlife-sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#wildlife-sky-${uid})`" />
      <circle cx="628" cy="108" r="48" fill="var(--scene-glow)" opacity=".85" />
      <path d="M0 300q160-70 320-18t300-20q90-34 180 10v228H0Z" fill="var(--scene-hill)" opacity=".6" />
      <path d="M0 340h800v160H0Z" fill="var(--scene-water-1)" />
      <g fill="var(--scene-ink)">
        <path d="M156 318q92-86 190-8 34-4 58 10l-46 32q-74 34-150-2Z" />
        <path d="M176 330q-38-22-58 2 34 2 58 18 14-20 40-16-16-20-40-4Z" fill="var(--scene-crimson)" opacity=".85" />
      </g>
      <g fill="var(--scene-moon)" opacity=".9">
        <circle cx="262" cy="302" r="5" />
        <circle cx="602" cy="290" r="4" />
        <circle cx="682" cy="350" r="5" />
      </g>
      <g fill="none" stroke="var(--scene-gold)" stroke-width="4" opacity=".55">
        <path d="M70 414q80-12 160 0t160 0" />
        <path d="M450 452q80-12 160 0t160 0" />
      </g>
    </svg>

    <svg v-else-if="category === 'food'" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <defs>
        <linearGradient :id="`food-sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--scene-sky-2)" />
          <stop offset="1" stop-color="var(--scene-sky-1)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" :fill="`url(#food-sky-${uid})`" />
      <circle cx="610" cy="110" r="46" fill="var(--scene-moon)" opacity=".85" />
      <path d="M140 300q260-100 520 0l-52 132H192Z" fill="var(--scene-water-1)" />
      <path d="M232 282q168-84 336 0-168 72-336 0Z" fill="var(--scene-gold)" />
      <g fill="var(--scene-paper)" opacity=".9">
        <circle cx="320" cy="282" r="10" />
        <circle cx="372" cy="270" r="12" />
        <circle cx="430" cy="278" r="9" />
        <circle cx="484" cy="290" r="11" />
      </g>
      <g fill="var(--scene-crimson)" opacity=".8">
        <path d="M196 334q30-48 60 0Zm348 0q30-48 60 0Z" />
      </g>
      <g fill="none" stroke="var(--scene-gold)" stroke-width="4" opacity=".5">
        <path d="M180 450q110-18 220 0t220 0" />
      </g>
    </svg>

    <svg v-else viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="scene-art">
      <rect width="800" height="500" fill="var(--scene-sky-1)" />
      <circle cx="620" cy="100" r="44" fill="var(--scene-moon)" opacity=".9" />
      <path d="M0 340q180-80 340-20t300-20q90-34 160 10v190H0Z" fill="var(--scene-hill)" />
      <path d="M0 380h800v120H0Z" fill="var(--scene-water-2)" />
      <g fill="none" stroke="var(--scene-gold)" stroke-width="4" opacity=".5">
        <path d="M80 430q80-12 160 0t160 0" />
        <path d="M440 460q80-12 160 0t160 0" />
      </g>
    </svg>
  </div>
</template>
