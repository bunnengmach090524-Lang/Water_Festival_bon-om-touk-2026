<script setup>
/**
 * Lazy-loaded, lightweight three.js lantern scene.
 * The canvas fills its hero host, is transparent, and is clipped by a soft
 * radial mask so it never shows a rectangular edge. Lanterns stay on the
 * right, far from the camera and small; colours follow the active theme.
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { theme } from '../../composables/useTheme'

const host = ref(null)

const MAX_COUNT = 32
const MOBILE_DIVISOR = 2
const MAX_APPARENT_SIZE = 0.052

let disposed = false
let running = false
let visible = true
let frameId = 0
let clock = null
let cleanup = () => {}
let intersectionObserver = null
let resizeObserver = null
let motionQuery = null
let THREElib = null
let sceneState = null
let activeCount = MAX_COUNT
let spawnBounds = { min: 0, max: 0 }

function cssColor(name) {
  if (typeof document === 'undefined') return '#ffffff'
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return /^#[0-9a-f]{3,8}$/i.test(value) ? value : '#ffffff'
}

function toRgb(hex) {
  const raw = String(hex).replace('#', '')
  const full = raw.length === 3 ? raw.split('').map((char) => char + char).join('') : raw.slice(0, 6)
  const value = parseInt(full, 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function rgba(hex, alpha) {
  const [r, g, b] = toRgb(hex)
  return `rgba(${r},${g},${b},${alpha})`
}

function intColor(hex) {
  const [r, g, b] = toRgb(hex)
  return (r << 16) | (g << 8) | b
}

let palette = {}
function refreshPalette() {
  palette = {
    glow: cssColor('--scene-glow'),
    gold: cssColor('--scene-gold'),
    moon: cssColor('--scene-moon'),
    water: cssColor('--scene-water-2'),
  }
}
refreshPalette()

function drawGlow(context) {
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, rgba(palette.moon, 0.9))
  gradient.addColorStop(0.2, rgba(palette.glow, 0.5))
  gradient.addColorStop(1, rgba(palette.gold, 0))
  context.clearRect(0, 0, 64, 64)
  context.fillStyle = gradient
  context.fillRect(0, 0, 64, 64)
}

function applyPaletteToScene(state) {
  if (!state || !THREElib) return
  const light = theme.value === 'light'
  state.glowMaterial.color.set(intColor(palette.glow))
  state.glowMaterial.blending = light ? THREElib.NormalBlending : THREElib.AdditiveBlending
  state.glowMaterial.opacity = light ? 0.34 : 0.55
  state.glowMaterial.needsUpdate = true
  state.bodyMaterial.color.set(intColor(palette.moon))
  state.bodyMaterial.opacity = light ? 0.34 : 0.5
  state.waterMaterial.color.set(intColor(palette.water))
  state.waterMaterial.opacity = light ? 0.38 : 0.66
  state.reflectionMaterial.color.set(intColor(palette.gold))
  state.reflectionMaterial.opacity = light ? 0.22 : 0.12
  drawGlow(state.context)
  state.glowTexture.needsUpdate = true
}

watch(theme, () => {
  refreshPalette()
  applyPaletteToScene(sceneState)
})

function prefersReducedMotion() {
  return typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
}

function canStart() {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

function updateSpawnBounds() {
  if (!sceneState) return
  const { camera } = sceneState
  // Representative far plane (z = -3.5) keeps the whole spawn range on-screen.
  const distance = camera.position.z + 3.5
  const halfWidth = Math.tan((camera.fov * Math.PI) / 360) * distance * camera.aspect
  const narrow = (host.value?.clientWidth || window.innerWidth) < 768
  const minFactor = narrow ? 0.34 : 0.16
  spawnBounds = {
    min: halfWidth * minFactor,
    max: halfWidth * 0.94,
  }
}

function placeLantern(lantern, y = -3.2 + Math.random() * 6.4) {
  const span = Math.max(0.1, spawnBounds.max - spawnBounds.min)
  lantern.x = spawnBounds.min + Math.random() * span
  lantern.y = y
  lantern.z = -5 + Math.random() * 3
  // Farther lanterns may be slightly larger while apparent size stays capped.
  const distance = 9 - lantern.z
  const apparent = 0.034 + Math.random() * 0.018
  lantern.scale = Math.min(0.68, apparent * distance)
  lantern.speed = 0.1 + Math.random() * 0.16
  lantern.phase = Math.random() * Math.PI * 2
}

function tick() {
  if (!running || disposed) return
  frameId = requestAnimationFrame(tick)

  const { scene, renderer, camera, lanterns, positions, glowGeometry, bodies, dummy } = sceneState
  const dt = Math.min(clock.getDelta(), 0.05)
  const time = clock.elapsedTime

  for (let index = 0; index < activeCount; index += 1) {
    const lantern = lanterns[index]
    lantern.y += lantern.speed * dt
    if (lantern.y > 3.4) placeLantern(lantern, -3.3)

    const x = lantern.x + Math.sin(time * 0.4 + lantern.phase) * 0.07
    positions[index * 3] = x
    positions[index * 3 + 1] = lantern.y
    positions[index * 3 + 2] = lantern.z

    const distance = camera.position.z - lantern.z
    const size = Math.min(lantern.scale, MAX_APPARENT_SIZE * distance)
    dummy.position.set(x, lantern.y, lantern.z)
    dummy.rotation.set(0, time * 0.3 + lantern.phase, 0)
    dummy.scale.set(size, size * 1.18, size)
    dummy.updateMatrix()
    bodies.setMatrixAt(index, dummy.matrix)
  }

  glowGeometry.attributes.position.needsUpdate = true
  bodies.instanceMatrix.needsUpdate = true
  renderer.render(scene, camera)
}

function updateRunning() {
  const shouldRun = visible && !document.hidden && !disposed && !!sceneState && !prefersReducedMotion()
  if (shouldRun && !running) {
    running = true
    clock?.getDelta()
    tick()
  } else if (!shouldRun && running) {
    running = false
    cancelAnimationFrame(frameId)
  }
}

function onVisibilityChange() {
  updateRunning()
}

function onMotionChange() {
  updateRunning()
}

async function start() {
  if (!canStart() || !host.value) return
  let THREE
  try {
    THREE = await import('three')
  } catch {
    return // Offline or unsupported: the CSS scene remains.
  }
  if (disposed || !host.value || prefersReducedMotion()) return
  THREElib = THREE
  refreshPalette()

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
  camera.position.set(0, 0.4, 9)
  camera.lookAt(0, 0.2, 0)

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.style.cssText =
    'display:block;position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none;'
  host.value.appendChild(renderer.domElement)

  // One shared radial-gradient sprite for all soft, glowing points.
  const textureCanvas = document.createElement('canvas')
  textureCanvas.width = 64
  textureCanvas.height = 64
  const context = textureCanvas.getContext('2d')
  drawGlow(context)
  const glowTexture = new THREE.CanvasTexture(textureCanvas)

  const positions = new Float32Array(MAX_COUNT * 3)
  const lanterns = Array.from({ length: MAX_COUNT }, () => ({
    x: 0,
    y: 0,
    z: -3,
    speed: 0,
    phase: 0,
    scale: 0,
  }))

  const glowGeometry = new THREE.BufferGeometry()
  glowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const glowMaterial = new THREE.PointsMaterial({
    map: glowTexture,
    size: 0.7,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    sizeAttenuation: true,
  })
  scene.add(new THREE.Points(glowGeometry, glowMaterial))

  // Higher-segment, slightly oval bodies look like lanterns, not grey blocks.
  const bodyGeometry = new THREE.SphereGeometry(0.1, 16, 12)
  const bodyMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, depthWrite: false })
  const bodies = new THREE.InstancedMesh(bodyGeometry, bodyMaterial, MAX_COUNT)
  bodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  scene.add(bodies)
  const dummy = new THREE.Object3D()

  // River plane and faint gold reflection lines (one extra draw call).
  const waterGeometry = new THREE.PlaneGeometry(34, 14)
  const waterMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.66 })
  const water = new THREE.Mesh(waterGeometry, waterMaterial)
  water.rotation.x = -Math.PI / 2
  water.position.set(0, -3, -2)
  scene.add(water)

  const reflectionPositions = []
  for (let i = 0; i < 14; i += 1) {
    const x = 0.5 + Math.random() * 6
    const z = -1.5 + Math.random() * 5
    const length = 0.4 + Math.random() * 1.9
    reflectionPositions.push(x - length / 2, -2.97, z, x + length / 2, -2.97, z)
  }
  const reflectionGeometry = new THREE.BufferGeometry()
  reflectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(reflectionPositions, 3))
  const reflectionMaterial = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.12 })
  scene.add(new THREE.LineSegments(reflectionGeometry, reflectionMaterial))

  sceneState = {
    scene, camera, renderer, lanterns, positions, glowGeometry, bodies, dummy,
    context, glowTexture, glowMaterial, bodyMaterial, waterMaterial, reflectionMaterial,
  }

  function resize() {
    if (!host.value || !sceneState) return
    const width = Math.max(1, host.value.clientWidth)
    const height = Math.max(1, host.value.clientHeight)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)

    updateSpawnBounds()
    activeCount = width < 768 ? Math.round(MAX_COUNT / MOBILE_DIVISOR) : MAX_COUNT
    glowGeometry.setDrawRange(0, activeCount)
    bodies.count = activeCount

    lanterns.forEach((lantern, index) => {
      if (index >= activeCount) return
      if (!lantern.scale || lantern.x < spawnBounds.min || lantern.x > spawnBounds.max) {
        placeLantern(lantern)
      }
    })
  }
  resize()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host.value)

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      updateRunning()
    },
    { threshold: 0.01 },
  )
  intersectionObserver.observe(host.value)

  document.addEventListener('visibilitychange', onVisibilityChange)
  motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)') || null
  motionQuery?.addEventListener?.('change', onMotionChange)

  applyPaletteToScene(sceneState)
  clock = new THREE.Clock()
  updateRunning()

  cleanup = () => {
    running = false
    cancelAnimationFrame(frameId)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    motionQuery?.removeEventListener?.('change', onMotionChange)
    intersectionObserver?.disconnect()
    resizeObserver?.disconnect()
    renderer.domElement.remove()
    glowGeometry.dispose()
    glowMaterial.dispose()
    glowTexture.dispose()
    bodyGeometry.dispose()
    bodyMaterial.dispose()
    waterGeometry.dispose()
    waterMaterial.dispose()
    reflectionGeometry.dispose()
    reflectionMaterial.dispose()
    renderer.dispose()
    sceneState = null
    clock = null
    motionQuery = null
    activeCount = MAX_COUNT
    spawnBounds = { min: 0, max: 0 }
  }
}

onMounted(start)

onBeforeUnmount(() => {
  disposed = true
  cleanup()
})
</script>

<template>
  <div
    ref="host"
    class="hero-canvas-host pointer-events-none absolute inset-0 z-0 h-full w-full"
    aria-hidden="true"
  ></div>
</template>

<style scoped>
/* Transparent WebGL + soft radial clip: no rectangular hero edge. */
.hero-canvas-host {
  -webkit-mask-image: radial-gradient(ellipse 82% 78% at 62% 52%, #000 40%, transparent 100%);
  mask-image: radial-gradient(ellipse 82% 78% at 62% 52%, #000 40%, transparent 100%);
}
</style>
